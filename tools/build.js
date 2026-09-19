#!/usr/bin/env node
/* ============================================================
   Mind-Mapped Medical Sciences, build and validate

   Run from the repository root:

     node tools/build.js

   What it does, in order:

     1. Loads every subject file in maps/
     2. Validates each one against node-edge-spec.md
     3. Checks node, loop, and map IDs for collisions ACROSS subjects,
        which is the check that makes the single canonical parent rule
        enforceable rather than aspirational
     4. Resolves every reference chip, including cross-subject ones
     5. Writes build/subject-index.js   (loaded by the app at runtime)
     6. Writes build/ID-INDEX.md        (what an author greps before
                                         writing a new branch)

   Exits 1 if anything is wrong, so it can gate a commit or a push.
   ============================================================ */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MAPS_DIR = path.join(ROOT, "maps");
const BUILD_DIR = path.join(ROOT, "build");

/* ---------- the specification, as data ---------- */
const MAX_LEVEL = 5;
const NODE_TYPES = ["structure", "process", "control", "clinical", "reference"];
const EDGE_TYPES = [
  "contains", "type-of", "produces", "acts-on", "causes",
  "requires", "regulated-by", "seen-as", "see"
];
const LEVEL_NAMES = {
  1: "Map root", 2: "Domain", 3: "Component", 4: "Detail", 5: "Clinical link"
};


/* ---------- house spelling ----------
   American spelling is the house style. British spellings drift in easily,
   especially inside a data file where nobody is proofreading prose.

   To add a word, put it in the list below. Left side is the spelling to
   reject, right side is the replacement. `prefixOk` allows a compound to
   match, so "metre" also catches "millimetre" and "centimetre".
   Common suffixes (s, es, ed, ing, al, ation, ic, ous, less, ful, er) are
   matched automatically, so list the base word only. */
const SPELLING = [];
function brit(list, fix, opts){
  opts = opts || {};
  list.forEach(w => SPELLING.push({
    brit: w,
    amer: typeof fix === "function" ? fix(w) : fix,
    prefixOk: !!opts.prefixOk,
    suffix: opts.suffix
  }));
}

/* -our to -or */
brit(["behaviour","colour","favour","flavour","honour","humour","labour",
      "neighbour","odour","rumour","tumour","vapour","vigour","endeavour","harbour"],
     w => w.replace(/our$/, "or"), { prefixOk: true });

/* -re to -er. metre and litre take a prefix so the compounds are caught. */
brit(["centre","fibre","calibre","titre","theatre","spectre","lustre","sombre"],
     w => w.replace(/re$/, "er"), { prefixOk: true });
brit(["metre","litre"], w => w.replace(/re$/, "er"), { prefixOk: true });
brit(["manoeuvre"], "maneuver");

/* -ise to -ize, only the words where American spelling actually differs.
   Words like exercise, promise, and compromise are correct either way and
   are deliberately absent. */
brit(["organise","recognise","memorise","minimise","maximise","utilise",
      "characterise","polarise","depolarise","repolarise","hyperpolarise",
      "oxidise","metabolise","normalise","specialise","summarise","stabilise",
      "visualise","categorise","prioritise","emphasise","synthesise","localise",
      "generalise","neutralise","sterilise","immunise","mobilise","ionise",
      "equalise","standardise"],
     w => w.replace(/ise$/, "ize"));

/* -yse to -yze. The suffix list excludes "is", so analysis and dialysis,
   which are correct in both, are not flagged. */
brit(["analyse","catalyse","hydrolyse","paralyse","dialyse"],
     w => w.replace(/yse$/, "yze"));

/* medical ae and oe */
brit(["anaemia","anaemic","anaesthesia","anaesthetic","paediatric","gynaecology",
      "orthopaedic","caesarean","faeces","faecal","leukaemia","ischaemia","ischaemic"],
     w => w.replace(/ae/, "e"));
brit(["oedema","oesophagus","oesophageal","oestrogen","oestradiol","foetal","foetus",
      "coeliac","diarrhoea","gonorrhoea"],
     w => w.replace(/^(f)?oe/, (m, f) => (f || "") + "e"));

/* haem to hem, as a prefix so the whole family is covered */
brit(["haemoglobin","haemorrhage","haematocrit","haemostasis","haemolysis",
      "haematology","haemodynamic","haematoma"],
     w => w.replace(/^haem/, "hem"));

/* sulph to sulf */
brit(["sulphur","sulphate","sulphide","sulphonamide"],
     w => w.replace(/^sulph/, "sulf"));

/* one-off words */
brit(["practise"], "practice");
brit(["licence"], "license");
brit(["defence"], "defense");
brit(["offence"], "offense");
brit(["ageing"], "aging");
brit(["grey"], "gray", { prefixOk: true });
/* programmed and programming are correct American spellings, so only the
   bare word and its plural are rejected */
brit(["programme"], "program", { suffix: "(?:e|es)" });

/* A word ending in a silent e drops it before -ed and -ing, so the stem is
   matched without that e. The suffix group is deliberately narrow for the
   compound-prone words: allowing -ation there would make "concentration"
   match the rule for "centre". */
SPELLING.forEach(r => {
  const endsInE = /e$/.test(r.brit);
  const stem = endsInE ? r.brit.slice(0, -1) : r.brit;
  let suffix = r.suffix;
  if (!suffix){
    if (r.prefixOk){
      suffix = endsInE ? "(?:e|es|ed|ing)" : "(?:s|ed|ing|less|ful|ous)?";
    } else {
      suffix = endsInE ? "(?:e|es|ed|ing|ation|ations|er|ers)"
                       : "(?:s|es|ed|ing|al|ally|ation|ations|ic|ics|ous|less|ful|er|ers)?";
    }
  }
  r.re = new RegExp("\\b" + (r.prefixOk ? "[a-z]*" : "") + stem + suffix + "\\b", "gi");
});

function findBritish(text){
  const hits = [];
  SPELLING.forEach(r => {
    r.re.lastIndex = 0;
    let m;
    while ((m = r.re.exec(text)) !== null){
      hits.push({ found: m[0], brit: r.brit, amer: r.amer });
    }
  });
  return hits;
}

/* sweep every string in a subject, the same way em dashes are swept */
function checkSpellingDeep(value, trail, where){
  if (typeof value === "string"){
    findBritish(value).forEach(h => {
      err(where + " > " + trail.join("."),
          'British spelling "' + h.found + '"; the house style is American, so use "' +
          h.amer + '" (' + h.brit + ' to ' + h.amer + ')');
    });
    return;
  }
  if (Array.isArray(value)){
    value.forEach((v, i) => checkSpellingDeep(v, trail.concat([String(i)]), where));
    return;
  }
  if (value && typeof value === "object"){
    Object.keys(value).forEach(k => checkSpellingDeep(value[k], trail.concat([k]), where));
  }
}

/* and the files around the data, which is where drift usually starts */
const PROSE_FILES = ["index.html", "app.js", "styles.css", "README.md",
                     "node-edge-spec.md", "compliance-notes.md"];
function checkSpellingFiles(){
  PROSE_FILES.forEach(f => {
    const full = path.join(ROOT, f);
    if (!fs.existsSync(full)) return;
    fs.readFileSync(full, "utf8").split("\n").forEach((line, i) => {
      /* the word list itself is full of the spellings it rejects */
      if (full === path.join(ROOT, "tools", "build.js")) return;
      findBritish(line).forEach(h => {
        err(f + ":" + (i + 1),
            'British spelling "' + h.found + '"; use "' + h.amer + '"');
      });
    });
  });
}

/* ---------- reporting ---------- */
const errors = [];
const warnings = [];
function err(where, msg){ errors.push(where + ": " + msg); }
function warn(where, msg){ warnings.push(where + ": " + msg); }

/* ---------- load subjects ---------- */
function loadSubjects(){
  if (!fs.existsSync(MAPS_DIR)){
    err("maps/", "the maps directory does not exist");
    return [];
  }
  const files = fs.readdirSync(MAPS_DIR).filter(f => f.endsWith(".js")).sort();
  if (files.length === 0) err("maps/", "no subject files found");

  return files.map(file => {
    const full = path.join(MAPS_DIR, file);
    let subject = null;
    try {
      delete require.cache[require.resolve(full)];
      subject = require(full);
    } catch (e) {
      err("maps/" + file, "could not be loaded: " + e.message);
      return null;
    }
    if (!subject || typeof subject !== "object"){
      err("maps/" + file, "does not export a subject object");
      return null;
    }
    return { file: "maps/" + file, subject: subject };
  }).filter(Boolean);
}

/* ---------- per subject validation ---------- */
function validateSubject(entry, registry){
  const s = entry.subject;
  const where = entry.file;

  ["id", "title", "version", "date", "author"].forEach(f => {
    if (!s[f]) err(where, 'missing required field "' + f + '"');
  });
  if (s.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.id)){
    err(where, 'subject id "' + s.id + '" is not kebab case');
  }
  if (s.id && path.basename(entry.file, ".js") !== s.id){
    err(where, 'file name does not match subject id "' + s.id + '"');
  }
  if (!Array.isArray(s.trees) || s.trees.length === 0) err(where, "has no trees");
  if (!Array.isArray(s.loops)) err(where, "loops must be an array, even if empty");
  if (!s.glossary || typeof s.glossary !== "object") err(where, "glossary must be an object");

  (s.trees || []).forEach(tree => {
    const treeWhere = where + " > " + (tree.id || "tree with no id");
    if (!tree.id) err(treeWhere, "map has no id");
    if (!tree.title) err(treeWhere, "map has no title");
    if (!tree.summary) err(treeWhere, "map has no summary");
    if (!tree.root) { err(treeWhere, "map has no root node"); return; }

    if (tree.id){
      if (registry.maps[tree.id]){
        err(treeWhere, 'map id collides with the same id in ' + registry.maps[tree.id]);
      } else {
        registry.maps[tree.id] = s.id;
      }
    }

    walk(tree.root, 1, treeWhere, tree, s, registry, true);
  });

  (s.loops || []).forEach(loop => validateLoop(loop, where, s, registry));

  /* glossary usage */
  const used = new Set();
  (s.trees || []).forEach(tree => {
    (function collect(n){
      if (n.note){
        const re = /\{\{([^}]+)\}\}/g; let m;
        while ((m = re.exec(n.note)) !== null) used.add(m[1].toLowerCase());
      }
      (n.children || []).forEach(collect);
    })(tree.root);
  });
  used.forEach(term => {
    if (!registry.glossaryTerms.has(term)){
      err(where, 'note uses the glossary term "' + term + '" but no subject defines it');
    }
  });
  Object.keys(s.glossary || {}).forEach(term => {
    if (!registry.glossaryUsed.has(term.toLowerCase())) registry.glossaryUnused.add(term);
  });
}

function walk(node, level, where, tree, subject, registry, isRoot){
  const at = where + " > " + (node.id || "node with no id");

  if (!node.id) { err(at, "node has no id"); return; }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(node.id)) err(at, "node id is not kebab case");
  if (!node.label) err(at, "node has no label");
  if (node.label && /[.!?]$/.test(node.label.trim())){
    warn(at, "node label ends with punctuation; labels are noun phrases");
  }

  if (registry.nodes[node.id]){
    err(at, 'node id already used in ' + registry.nodes[node.id].file +
            ' (node ids are unique across the whole project, because reference chips point at them)');
  } else {
    registry.nodes[node.id] = {
      subject: subject.id, file: where.split(" > ")[0], map: tree.id,
      mapTitle: tree.title, level: level, label: node.label, type: node.type
    };
  }

  if (NODE_TYPES.indexOf(node.type) === -1) err(at, 'unknown node type "' + node.type + '"');

  if (isRoot){
    if (node.edge) err(at, "a map root carries no edge, because it has no parent");
    if (level !== 1) err(at, "a map root must be at level 1");
  } else {
    if (!node.edge) err(at, "node has no edge; every non-root node states its relationship to its parent");
    else if (EDGE_TYPES.indexOf(node.edge) === -1) err(at, 'unknown edge type "' + node.edge + '"');
  }

  if (level > MAX_LEVEL){
    err(at, "sits at level " + level + "; the cap is " + MAX_LEVEL +
            ". A branch that wants another level is its own map.");
  }

  const kids = node.children || [];

  if (node.type === "clinical"){
    if (kids.length) err(at, "a clinical node is terminal and cannot have children");
    if (node.edge !== "seen-as") err(at, 'a clinical node uses the "seen-as" edge');
    if (node.ref) err(at, "a clinical node does not carry a ref");
  } else if (node.edge === "seen-as"){
    err(at, 'the "seen-as" edge is reserved for clinical nodes');
  }

  if (node.type === "reference"){
    if (kids.length) err(at, "a reference node is terminal and cannot have children");
    if (node.edge !== "see") err(at, 'a reference node uses the "see" edge');
    if (!node.ref) err(at, "a reference node must carry a ref");
    else registry.pendingRefs.push({ at: at, ref: node.ref, from: node.id, subject: subject.id });
    if (node.note) warn(at, "a reference node's note is not shown; the pointer carries the text");
  } else if (node.ref){
    err(at, "only a reference node carries a ref");
  } else if (node.edge === "see"){
    err(at, 'the "see" edge is reserved for reference nodes');
  }

  if (node.note){
    const re = /\{\{([^}]+)\}\}/g; let m;
    while ((m = re.exec(node.note)) !== null) registry.glossaryUsed.add(m[1].toLowerCase());
  }

  kids.forEach(child => walk(child, level + 1, where, tree, subject, registry, false));
}

function validateLoop(loop, where, subject, registry){
  const at = where + " > loop " + (loop.id || "with no id");
  if (!loop.id) { err(at, "loop has no id"); return; }

  if (registry.loops[loop.id]){
    err(at, "loop id already used in " + registry.loops[loop.id].file);
  } else {
    registry.loops[loop.id] = { subject: subject.id, file: where, title: loop.title };
  }

  ["title", "summary", "stimulus", "path", "viewBox"].forEach(f => {
    if (!loop[f]) err(at, 'missing required field "' + f + '"');
  });
  if (["negative", "positive"].indexOf(loop.feedback) === -1){
    err(at, 'feedback must be "negative" or "positive"');
  }
  if (!Array.isArray(loop.nodes) || !loop.nodes.length) { err(at, "loop has no nodes"); return; }
  if (loop.nodes.length > 8){
    warn(at, "has " + loop.nodes.length + " nodes; a loop past eight is usually two loops");
  }

  const vb = String(loop.viewBox || "").split(/\s+/).map(Number);
  const ids = new Set();
  loop.nodes.forEach(n => {
    if (!n.id) err(at, "a loop node has no id");
    if (ids.has(n.id)) err(at, 'duplicate loop node id "' + n.id + '"');
    ids.add(n.id);
    if (!n.label) err(at, 'loop node "' + n.id + '" has no label');
    if (typeof n.x !== "number" || typeof n.y !== "number" || typeof n.w !== "number"){
      err(at, 'loop node "' + n.id + '" needs numeric x, y, and w');
    } else if (vb.length === 4){
      if (n.x - n.w / 2 < vb[0] || n.x + n.w / 2 > vb[2]){
        err(at, 'loop node "' + n.id + '" sits outside the viewBox horizontally');
      }
      if (n.y < vb[1] + 20 || n.y > vb[3] - 20){
        err(at, 'loop node "' + n.id + '" sits outside the viewBox vertically');
      }
    }
  });

  (loop.edges || []).forEach(e => {
    if (!ids.has(e.from)) err(at, 'edge starts at unknown node "' + e.from + '"');
    if (!ids.has(e.to)) err(at, 'edge ends at unknown node "' + e.to + '"');
    if (e.sign !== "+" && e.sign !== "-") err(at, 'edge sign must be "+" or "-"');
  });

  const hasNegative = (loop.edges || []).some(e => e.sign === "-");
  if (loop.feedback === "negative" && !hasNegative){
    warn(at, "is marked negative feedback but carries no inhibitory edge");
  }
}

/* ---------- em dashes, everywhere ----------
   Checked by sweeping every string in the subject object rather than field
   by field, so a new field added later is covered without anyone
   remembering to add a check for it. */
function checkEmDashes(value, trail, where){
  if (typeof value === "string"){
    if (value.indexOf("\u2014") !== -1){
      err(where + " > " + trail.join("."),
          "contains an em dash; use a comma, a period, parentheses, or rewrite");
    }
    return;
  }
  if (Array.isArray(value)){
    value.forEach((v, i) => checkEmDashes(v, trail.concat([String(i)]), where));
    return;
  }
  if (value && typeof value === "object"){
    Object.keys(value).forEach(k => checkEmDashes(value[k], trail.concat([k]), where));
  }
}

/* ---------- cross-subject reference resolution ---------- */
function resolveRefs(registry){
  registry.pendingRefs.forEach(r => {
    if (r.ref.indexOf("loop:") === 0){
      const loopId = r.ref.slice(5);
      if (!registry.loops[loopId]){
        err(r.at, 'points at loop "' + loopId + '", which does not exist in any subject');
      } else {
        registry.crossLinks.push({
          from: r.subject, to: registry.loops[loopId].subject, kind: "loop", target: loopId
        });
      }
      return;
    }
    const target = registry.nodes[r.ref];
    if (!target){
      err(r.at, 'points at node "' + r.ref + '", which does not exist in any subject');
      return;
    }
    if (target.type === "reference"){
      err(r.at, 'points at another reference node; a pointer must point at the canonical node');
    }
    if (r.ref === r.from){
      err(r.at, "points at itself");
    }
    registry.crossLinks.push({
      from: r.subject, to: target.subject, kind: "node", target: r.ref
    });
  });
}

/* ---------- duplicate label heuristic ---------- */
function checkDuplicateLabels(registry){
  /* Only concept-bearing node types are checked. Structural headings such as
     "The control loop" legitimately repeat across maps and are not concepts. */
  const CONCEPT_TYPES = ["structure", "process", "clinical"];
  const byLabel = {};
  Object.keys(registry.nodes).forEach(id => {
    const n = registry.nodes[id];
    if (CONCEPT_TYPES.indexOf(n.type) === -1) return;
    const key = n.label.toLowerCase().trim();
    (byLabel[key] = byLabel[key] || []).push(id);
  });
  Object.keys(byLabel).forEach(key => {
    if (byLabel[key].length > 1){
      warn("canonical parent check",
        '"' + registry.nodes[byLabel[key][0]].label + '" appears on ' + byLabel[key].length +
        " nodes (" + byLabel[key].join(", ") + "). One of them should probably be a reference chip.");
    }
  });
}

/* ---------- output ---------- */
function writeRuntimeIndex(entries, registry){
  const nodes = {};
  Object.keys(registry.nodes).forEach(id => { nodes[id] = registry.nodes[id].subject; });
  const loops = {};
  Object.keys(registry.loops).forEach(id => { loops[id] = registry.loops[id].subject; });
  const maps = {};
  Object.keys(registry.maps).forEach(id => { maps[id] = registry.maps[id]; });

  const subjects = entries.map(e => ({
    id: e.subject.id,
    title: e.subject.title,
    file: e.file,
    version: e.subject.version,
    trees: (e.subject.trees || []).length,
    loops: (e.subject.loops || []).length,
    nodes: Object.keys(registry.nodes).filter(id => registry.nodes[id].subject === e.subject.id).length
  }));

  const out =
    "/* Generated by tools/build.js. Do not edit by hand.\n" +
    "   Generated " + new Date().toISOString() + " */\n" +
    "window.MMS = window.MMS || {};\n" +
    "window.MMS.index = " + JSON.stringify({
      generated: new Date().toISOString(),
      subjects: subjects,
      nodes: nodes,
      loops: loops,
      maps: maps
    }, null, 1) + ";\n";

  fs.mkdirSync(BUILD_DIR, { recursive: true });
  fs.writeFileSync(path.join(BUILD_DIR, "subject-index.js"), out, "utf8");
  return subjects;
}

function writeAuthoringIndex(registry, subjects){
  const ids = Object.keys(registry.nodes).sort();
  const lines = [];
  lines.push("# Node ID Index");
  lines.push("");
  lines.push("Generated by `tools/build.js`. Do not edit by hand.");
  lines.push("");
  lines.push("Search this file before writing a new branch. If the concept is already here,");
  lines.push("write a reference chip pointing at the existing node instead of a second copy.");
  lines.push("That is the single canonical parent rule, and this index is what makes it");
  lines.push("practical once the project is past a few hundred nodes.");
  lines.push("");
  lines.push("Totals: " + ids.length + " nodes, " + Object.keys(registry.loops).length +
             " loop diagrams, " + Object.keys(registry.maps).length + " maps, across " +
             subjects.length + " subject " + (subjects.length === 1 ? "area" : "areas") + ".");
  lines.push("");
  lines.push("| Node ID | Label | Type | Level | Map | Subject |");
  lines.push("|---------|-------|------|-------|-----|---------|");
  ids.forEach(id => {
    const n = registry.nodes[id];
    lines.push("| `" + id + "` | " + n.label.replace(/\|/g, "\\|") + " | " + n.type +
               " | " + n.level + " | " + n.mapTitle + " | " + n.subject + " |");
  });
  lines.push("");
  lines.push("## Loop diagrams");
  lines.push("");
  lines.push("| Loop ID | Title | Subject |");
  lines.push("|---------|-------|---------|");
  Object.keys(registry.loops).sort().forEach(id => {
    lines.push("| `loop:" + id + "` | " + registry.loops[id].title + " | " + registry.loops[id].subject + " |");
  });
  lines.push("");
  lines.push("## Cross-subject links");
  lines.push("");
  const cross = registry.crossLinks.filter(l => l.from !== l.to);
  if (!cross.length){
    lines.push("None yet. Every reference chip currently points inside its own subject area.");
  } else {
    lines.push("| From subject | To subject | Target |");
    lines.push("|--------------|-----------|--------|");
    cross.forEach(l => {
      lines.push("| " + l.from + " | " + l.to + " | " +
                 (l.kind === "loop" ? "`loop:" + l.target + "`" : "`" + l.target + "`") + " |");
    });
  }
  lines.push("");

  fs.writeFileSync(path.join(BUILD_DIR, "ID-INDEX.md"), lines.join("\n"), "utf8");
  return cross.length;
}

/* ---------- run ---------- */
function main(){
  const entries = loadSubjects();

  const registry = {
    nodes: {}, loops: {}, maps: {},
    pendingRefs: [], crossLinks: [],
    glossaryTerms: new Set(), glossaryUsed: new Set(), glossaryUnused: new Set()
  };

  entries.forEach(e => {
    Object.keys(e.subject.glossary || {}).forEach(t => registry.glossaryTerms.add(t.toLowerCase()));
  });

  entries.forEach(e => validateSubject(e, registry));
  entries.forEach(e => checkEmDashes(e.subject, [], e.file));
  entries.forEach(e => checkSpellingDeep(e.subject, [], e.file));
  checkSpellingFiles();
  resolveRefs(registry);
  checkDuplicateLabels(registry);

  /* Glossary terms are useful in the glossary panel whether or not they are
     also marked inline, so an unmarked term is reported as one summary line
     rather than as a warning per term. */
  const unmarked = [...registry.glossaryUnused].filter(t => !registry.glossaryUsed.has(t.toLowerCase()));
  if (unmarked.length){
    warn("glossary", unmarked.length + " of " + registry.glossaryTerms.size +
      " terms are defined but never marked inline with {{ }}. They still appear in the " +
      "glossary panel. Marking one inside a note links it from the branch where it matters: " +
      unmarked.slice(0, 4).join(", ") + (unmarked.length > 4 ? ", and others" : ""));
  }

  console.log("Mind-Mapped Medical Sciences, build and validate");
  console.log("=".repeat(56));
  entries.forEach(e => {
    const count = Object.keys(registry.nodes).filter(id => registry.nodes[id].subject === e.subject.id).length;
    console.log("  " + e.file.padEnd(24) + count + " nodes, " +
                (e.subject.trees || []).length + " maps, " +
                (e.subject.loops || []).length + " loops");
  });
  console.log("");

  if (warnings.length){
    console.log("Warnings (" + warnings.length + "), nothing is blocked:");
    warnings.forEach(w => console.log("  - " + w));
    console.log("");
  }

  if (errors.length){
    console.log("Errors (" + errors.length + "):");
    errors.forEach(e => console.log("  - " + e));
    console.log("");
    console.log("Nothing was written. Fix the errors above and run again.");
    process.exit(1);
  }

  const subjects = writeRuntimeIndex(entries, registry);
  const crossCount = writeAuthoringIndex(registry, subjects);

  console.log("Wrote build/subject-index.js and build/ID-INDEX.md");
  console.log("  " + Object.keys(registry.nodes).length + " nodes indexed across " +
              subjects.length + " subject " + (subjects.length === 1 ? "area" : "areas"));
  console.log("  " + registry.pendingRefs.length + " reference chips resolved, " +
              crossCount + " of them crossing subject areas");
  console.log("");
  console.log("Everything checks out against node-edge-spec.md.");
}

main();
