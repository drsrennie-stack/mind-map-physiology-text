/* ============================================================
   Mind-Mapped Medical Sciences, renderer
   Dr. Sharilyn Rennie

   Reads build/subject-index.js, which tools/build.js generates.
   Subject data files are loaded on demand, so opening the app
   costs one small index rather than every subject area. A
   reference chip pointing into a subject that is not loaded yet
   loads it first, then navigates.
   ============================================================ */

(function(){
"use strict";

window.MMS = window.MMS || {};
var MMS = window.MMS;
MMS.subjects = MMS.subjects || {};

var INDEX = MMS.index;
var MAX_LEVEL = 5;
var BRANCH_CLASSES = ["b0", "b1", "b2", "b3"];

var TAGS = {
  structure:"Structure", process:"Process", control:"Control",
  clinical:"Clinical", reference:"See"
};
var EDGE_WORDS = {
  contains:"contains", "type-of":"kinds of", produces:"produces",
  "acts-on":"acts on", causes:"causes", requires:"requires",
  "regulated-by":"regulated by", "seen-as":"seen as", see:"see"
};

var el = {};
["subjectSelect","treeList","loopList","mapTitle","mapSummary","mapBody","search","depth",
 "expandAll","collapseAll","printBtn","status","glossaryList","viewMap","viewOutline",
 "notesBtn","branchSwatches","focusBtn","trail"].forEach(function(k){ el[k] = document.getElementById(k); });

var state = {
  subjectId: null,
  map: null,            /* {kind:"tree"|"loop", id:""} */
  view: "map",          /* "map" | "outline" */
  notes: false,
  focus: true           /* one branch at a time */
};

/* ---------- loading subjects on demand ---------- */
var loadCallbacks = {};
MMS.onSubjectLoaded = function(id){
  var cbs = loadCallbacks[id] || [];
  delete loadCallbacks[id];
  cbs.forEach(function(cb){ cb(); });
};

function subjectMeta(id){
  return (INDEX.subjects || []).filter(function(s){ return s.id === id; })[0];
}

function ensureSubject(id, done){
  if (MMS.subjects[id]) { done(); return; }
  var meta = subjectMeta(id);
  if (!meta){ say("That subject area is not in the index. Run node tools/build.js."); return; }
  (loadCallbacks[id] = loadCallbacks[id] || []).push(done);
  if (loadCallbacks[id].length > 1) return;   /* already in flight */
  say("Loading " + meta.title + ".");
  var s = document.createElement("script");
  s.src = meta.file;
  s.onerror = function(){
    delete loadCallbacks[id];
    say("Could not load " + meta.file + ".");
  };
  document.head.appendChild(s);
}

function subject(){ return MMS.subjects[state.subjectId]; }

/* ---------- helpers ---------- */
function esc(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];
  });
}
function say(msg){ if (el.status) el.status.textContent = msg; }
var uid = 0;
function nextId(){ uid += 1; return "gen" + uid; }

function glossaryLookup(word){
  var key = word.toLowerCase();
  var ids = Object.keys(MMS.subjects);
  for (var i = 0; i < ids.length; i++){
    var g = MMS.subjects[ids[i]].glossary || {};
    if (g[key]) return g[key];
    if (g[word]) return g[word];
  }
  return null;
}

function renderNote(text){
  if (!text) return "";
  var out = "", defs = [], last = 0, re = /\{\{([^}]+)\}\}/g, m;
  while ((m = re.exec(text)) !== null){
    out += esc(text.slice(last, m.index));
    var word = m[1];
    var def = glossaryLookup(word);
    if (def){
      var id = nextId();
      out += '<button type="button" class="term" aria-expanded="false" aria-controls="' + id +
             '" data-def="' + id + '">' + esc(word) + '</button>';
      defs.push('<span class="term-def" id="' + id + '" hidden><span class="term-word">' +
                esc(word) + ':</span> ' + esc(def) + '</span>');
    } else {
      out += esc(word);
    }
    last = re.lastIndex;
  }
  out += esc(text.slice(last));
  return '<p class="node-note">' + out + defs.join("") + '</p>';
}

/* ---------- tree rendering ---------- */
function renderTree(tree){
  state.map = { kind:"tree", id: tree.id };
  el.mapTitle.textContent = tree.title;
  el.mapSummary.textContent = tree.summary;

  var ul = document.createElement("ul");
  ul.className = "tree";
  ul.setAttribute("role", "tree");
  ul.setAttribute("aria-label", tree.title + ", " + subject().title);
  ul.appendChild(buildNode(tree.root, 1, null));

  el.mapBody.innerHTML = "";
  el.mapBody.appendChild(ul);

  applyDepth(parseInt(el.depth.value, 10));
  setRovingStart();
  renderBranchSwatches(tree);
  revealRoot();
}

function buildNode(node, level, branchClass){
  var li = document.createElement("li");
  li.className = "node t-" + node.type;
  if (branchClass) li.classList.add(branchClass);
  li.setAttribute("role", "treeitem");
  li.setAttribute("aria-level", String(level));
  li.setAttribute("tabindex", "-1");
  li.dataset.nodeId = node.id;
  li.dataset.type = node.type;

  var kids = node.children || [];
  var hasKids = kids.length > 0;
  if (hasKids) li.classList.add("has-kids");

  var labelId = "lbl-" + node.id;
  li.setAttribute("aria-labelledby", labelId);

  var card = document.createElement("div");
  card.className = "node-card";

  var top = document.createElement("div");
  top.className = "node-top";

  if (hasKids){
    var tw = document.createElement("button");
    tw.type = "button";
    tw.className = "twisty";
    tw.textContent = "−";
    tw.setAttribute("aria-label", "Collapse " + node.label);
    tw.addEventListener("click", function(e){ e.stopPropagation(); toggle(li); });
    top.appendChild(tw);
  } else {
    var sp = document.createElement("span");
    sp.className = "twisty-spacer";
    sp.setAttribute("aria-hidden", "true");
    top.appendChild(sp);
  }

  var tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = TAGS[node.type] || node.type;
  top.appendChild(tag);

  if (node.edge && EDGE_WORDS[node.edge] && node.type !== "reference"){
    var ed = document.createElement("span");
    ed.className = "edge-label";
    ed.textContent = EDGE_WORDS[node.edge];
    top.appendChild(ed);
  }

  var lab = document.createElement("span");
  lab.className = "node-label";
  lab.id = labelId;
  lab.textContent = node.label;
  top.appendChild(lab);

  if (hasKids){
    var cc = document.createElement("span");
    cc.className = "child-count";
    cc.textContent = kids.length === 1 ? "1 branch" : kids.length + " branches";
    top.appendChild(cc);
  }

  card.appendChild(top);

  if (node.type === "reference" && node.ref){
    var target = resolveRef(node.ref);
    var go = document.createElement("button");
    go.type = "button";
    go.className = "ref-link";
    go.textContent = target && target.subjectId !== state.subjectId
      ? "Open it in " + (subjectMeta(target.subjectId) || {}).title
      : "Go to where this is written out in full";
    go.addEventListener("click", function(e){ e.stopPropagation(); followRef(node.ref); });
    var p = document.createElement("p");
    p.className = "node-note";
    p.appendChild(go);
    card.appendChild(p);
  } else if (node.note){
    var holder = document.createElement("div");
    holder.innerHTML = renderNote(node.note);
    while (holder.firstChild) card.appendChild(holder.firstChild);
  }

  /* clicking the card toggles it; the twisty button is the accessible
     equivalent, and Enter or Space does the same from the keyboard */
  if (hasKids){
    card.addEventListener("click", function(e){
      if (e.target.closest(".term") || e.target.closest(".ref-link") || e.target.closest(".twisty")) return;
      toggle(li);
      focusItem(li);
    });
  }

  li.appendChild(card);

  if (hasKids){
    li.setAttribute("aria-expanded", "true");
    var group = document.createElement("ul");
    group.className = "group";
    group.setAttribute("role", "group");
    kids.forEach(function(child, i){
      /* level two starts a branch and its color runs down the whole subtree */
      var cls = level === 1 ? BRANCH_CLASSES[i % BRANCH_CLASSES.length] : branchClass;
      group.appendChild(buildNode(child, level + 1, cls));
    });
    li.appendChild(group);
  }

  return li;
}

function renderBranchSwatches(tree){
  if (!el.branchSwatches) return;
  el.branchSwatches.innerHTML = "";
  (tree.root.children || []).forEach(function(child, i){
    var d = document.createElement("div");
    d.className = "swatch " + BRANCH_CLASSES[i % BRANCH_CLASSES.length];
    d.textContent = child.label;
    el.branchSwatches.appendChild(d);
  });
}

function toggle(li, force, skipFocus){
  if (li.getAttribute("aria-expanded") === null) return;
  var open = force !== undefined ? force : li.getAttribute("aria-expanded") !== "true";

  /* One branch at a time: opening a card closes its siblings, so the level
     you are looking at stays together instead of being pushed apart by
     everything you opened before it. */
  if (open && state.focus && !skipFocus){
    var parent = li.parentElement;
    if (parent){
      Array.prototype.slice.call(parent.children).forEach(function(sib){
        if (sib !== li && sib.getAttribute && sib.getAttribute("role") === "treeitem"){
          closeSubtree(sib);
        }
      });
    }
  }

  li.setAttribute("aria-expanded", open ? "true" : "false");
  var group = li.querySelector(":scope > ul.group");
  if (group) group.hidden = !open;
  var tw = li.querySelector(":scope > .node-card .twisty");
  if (tw){
    tw.textContent = open ? "−" : "+";
    var name = li.querySelector(":scope > .node-card .node-label").textContent;
    tw.setAttribute("aria-label", (open ? "Collapse " : "Expand ") + name);
  }
  if (!skipFocus) renderTrail();
}

/* Close a node and everything under it, so reopening it later starts clean. */
function closeSubtree(li){
  if (li.getAttribute("aria-expanded") !== null) toggle(li, false, true);
  li.querySelectorAll('li[role="treeitem"][aria-expanded]').forEach(function(n){
    toggle(n, false, true);
  });
}

function allItems(){
  return Array.prototype.slice.call(el.mapBody.querySelectorAll('li[role="treeitem"]'));
}

function applyDepth(maxLevel){
  if (state.focus){
    /* open a single path down to the requested level rather than every
       branch, which is the whole point of one branch at a time */
    allItems().forEach(function(li){ toggle(li, false, true); });
    var node = el.mapBody.querySelector('ul.tree > li.node');
    var lvl = 1;
    while (node && lvl < maxLevel){
      if (node.getAttribute("aria-expanded") === null) break;
      toggle(node, true, true);
      node = node.querySelector(':scope > ul.group > li[role="treeitem"]');
      lvl += 1;
    }
  } else {
    allItems().forEach(function(li){
      var lvl = parseInt(li.getAttribute("aria-level"), 10);
      if (li.getAttribute("aria-expanded") !== null) toggle(li, lvl < maxLevel, true);
    });
  }
  renderTrail();
}

/* In the mind map view a parent is centred against its whole subtree, so
   opening a deep map pushes the centre of the map far down the page.
   Bring it back into view whenever the shape of the tree changes. */
function revealRoot(){
  var root = el.mapBody.querySelector('ul.tree > li.node > .node-card');
  if (!root) return;
  el.mapBody.scrollLeft = 0;
  root.scrollIntoView({ block:"center", inline:"start" });
}

/* ---------- the trail showing where you are ---------- */
function openPath(){
  /* the chain of open cards from the root down. In one-branch-at-a-time
     mode this is a single path, which is exactly what the trail shows. */
  var path = [], node = el.mapBody.querySelector('ul.tree > li.node');
  while (node){
    path.push(node);
    if (node.getAttribute("aria-expanded") !== "true") break;
    var kids = node.querySelectorAll(':scope > ul.group > li[role="treeitem"]');
    var next = null;
    for (var i = 0; i < kids.length; i++){
      if (kids[i].getAttribute("aria-expanded") === "true"){ next = kids[i]; break; }
    }
    node = next;
  }
  return path;
}

function renderTrail(){
  if (!el.trail) return;
  if (!state.focus || !state.map || state.map.kind !== "tree"){
    el.trail.hidden = true;
    el.trail.innerHTML = "";
    return;
  }
  var path = openPath();
  el.trail.innerHTML = "";
  var lbl = document.createElement("span");
  lbl.className = "trail-label";
  lbl.textContent = "You are here";
  el.trail.appendChild(lbl);

  path.forEach(function(li, i){
    if (i > 0){
      var sep = document.createElement("span");
      sep.className = "crumb-sep";
      sep.setAttribute("aria-hidden", "true");
      sep.textContent = "\u203A";
      el.trail.appendChild(sep);
    }
    var b = document.createElement("button");
    b.type = "button";
    b.className = "crumb";
    b.textContent = li.querySelector(".node-label").textContent;
    var last = i === path.length - 1;
    b.setAttribute("aria-current", last ? "true" : "false");
    if (!last) b.addEventListener("click", function(){ drillTo(li); });
    el.trail.appendChild(b);
  });
  el.trail.hidden = path.length < 2;
}

/* Go back to a card in the trail: close everything under it, open it,
   and put focus on it. */
function drillTo(li){
  li.querySelectorAll('li[role="treeitem"][aria-expanded]').forEach(function(n){
    toggle(n, false, true);
  });
  toggle(li, true, true);
  renderTrail();
  setRovingStart();
  focusItem(li);
  li.scrollIntoView({ block:"center", inline:"start" });
  say("Back to " + li.querySelector(".node-label").textContent + ".");
}

/* ---------- keyboard, ARIA tree pattern ---------- */
function visibleItems(){
  return allItems().filter(function(li){
    if (li.classList.contains("filtered-out")) return false;
    var p = li.parentElement;
    while (p && p !== el.mapBody){
      if (p.tagName === "UL" && p.hidden) return false;
      if (p.classList && p.classList.contains("filtered-out")) return false;
      p = p.parentElement;
    }
    return true;
  });
}

function setRovingStart(){
  allItems().forEach(function(li){ li.setAttribute("tabindex", "-1"); });
  var first = visibleItems()[0];
  if (first) first.setAttribute("tabindex", "0");
}

function focusItem(li){
  if (!li) return;
  allItems().forEach(function(n){ n.setAttribute("tabindex", "-1"); n.classList.remove("is-focused"); });
  li.setAttribute("tabindex", "0");
  li.classList.add("is-focused");
  li.focus();
}

function parentItem(li){
  var p = li.parentElement;
  while (p && p !== el.mapBody){
    if (p.tagName === "LI" && p.getAttribute("role") === "treeitem") return p;
    p = p.parentElement;
  }
  return null;
}

var typeBuffer = "", typeTimer = null;

el.mapBody.addEventListener("keydown", function(e){
  var li = e.target.closest ? e.target.closest('li[role="treeitem"]') : null;
  if (!li) return;
  var onControl = e.target.classList && (e.target.classList.contains("term") ||
    e.target.classList.contains("twisty") || e.target.classList.contains("ref-link"));
  if (onControl && ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.key) === -1) return;

  var items = visibleItems();
  var i = items.indexOf(li);
  var handled = true;

  switch (e.key){
    case "ArrowDown": focusItem(items[Math.min(i + 1, items.length - 1)]); break;
    case "ArrowUp":   focusItem(items[Math.max(i - 1, 0)]); break;
    case "Home":      focusItem(items[0]); break;
    case "End":       focusItem(items[items.length - 1]); break;
    case "ArrowRight":
      if (li.getAttribute("aria-expanded") === "false") toggle(li, true);
      else if (li.getAttribute("aria-expanded") === "true"){
        var kid = li.querySelector(':scope > ul.group > li[role="treeitem"]');
        if (kid) focusItem(kid);
      } else handled = false;
      break;
    case "ArrowLeft":
      if (li.getAttribute("aria-expanded") === "true") toggle(li, false);
      else focusItem(parentItem(li));
      break;
    case "Enter":
    case " ":
      if (li.getAttribute("aria-expanded") !== null) toggle(li);
      else handled = false;
      break;
    case "*":
      li.querySelectorAll('li[role="treeitem"][aria-expanded]').forEach(function(n){ toggle(n, true); });
      break;
    default:
      if (e.key.length === 1 && /\S/.test(e.key)){
        typeBuffer += e.key.toLowerCase();
        clearTimeout(typeTimer);
        typeTimer = setTimeout(function(){ typeBuffer = ""; }, 700);
        var start = i + (typeBuffer.length > 1 ? 0 : 1);
        for (var k = 0; k < items.length; k++){
          var cand = items[(start + k) % items.length];
          if (cand.querySelector(".node-label").textContent.toLowerCase().indexOf(typeBuffer) === 0){
            focusItem(cand); break;
          }
        }
      } else handled = false;
  }
  if (handled){ e.preventDefault(); e.stopPropagation(); }
});

el.mapBody.addEventListener("focusin", function(e){
  var li = e.target.closest ? e.target.closest('li[role="treeitem"]') : null;
  if (li && e.target === li){
    allItems().forEach(function(n){ n.classList.remove("is-focused"); });
    li.classList.add("is-focused");
  }
});

/* ---------- glossary terms ---------- */
document.addEventListener("click", function(e){
  var btn = e.target.closest ? e.target.closest(".term") : null;
  if (!btn) return;
  e.stopPropagation();
  var panel = document.getElementById(btn.dataset.def);
  if (!panel) return;
  var open = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", open ? "false" : "true");
  panel.hidden = open;
});

document.addEventListener("keydown", function(e){
  if (e.key !== "Escape") return;
  document.querySelectorAll('.term[aria-expanded="true"]').forEach(function(btn){
    btn.setAttribute("aria-expanded", "false");
    var panel = document.getElementById(btn.dataset.def);
    if (panel) panel.hidden = true;
  });
});

/* ---------- references, including across subject areas ---------- */
function resolveRef(ref){
  if (ref.indexOf("loop:") === 0){
    var lid = ref.slice(5);
    return INDEX.loops[lid] ? { kind:"loop", id: lid, subjectId: INDEX.loops[lid] } : null;
  }
  return INDEX.nodes[ref] ? { kind:"node", id: ref, subjectId: INDEX.nodes[ref] } : null;
}

function followRef(ref){
  var target = resolveRef(ref);
  if (!target){ say("That pointer has no target in the index. Run node tools/build.js."); return; }

  ensureSubject(target.subjectId, function(){
    var crossed = target.subjectId !== state.subjectId;
    state.subjectId = target.subjectId;
    if (el.subjectSelect) el.subjectSelect.value = target.subjectId;
    buildMapLists();

    if (target.kind === "loop"){
      selectMap("loop", target.id);
      say((crossed ? "Moved to " + subject().title + ". " : "") +
          "Showing the loop diagram: " + el.mapTitle.textContent + ".");
      return;
    }

    var subj = subject();
    var owner = null, ancestors = [];
    subj.trees.forEach(function(tree){
      (function walk(n, path){
        if (n.id === target.id){ owner = tree; ancestors = path.slice(); }
        (n.children || []).forEach(function(c){ walk(c, path.concat([n.id])); });
      })(tree.root, []);
    });
    if (!owner){ say("Could not find that node in the loaded subject area."); return; }

    selectMap("tree", owner.id);
    ancestors.forEach(function(aid){
      var anc = el.mapBody.querySelector('li[data-node-id="' + CSS.escape(aid) + '"]');
      if (anc) toggle(anc, true);
    });
    var node = el.mapBody.querySelector('li[data-node-id="' + CSS.escape(target.id) + '"]');
    if (node){
      focusItem(node);
      node.scrollIntoView({ block:"center", inline:"center" });
      say((crossed ? "Moved to " + subj.title + ". " : "") + "Jumped to " +
          node.querySelector(".node-label").textContent + " in " + el.mapTitle.textContent + ".");
    }
  });
}

/* ---------- loop diagrams ---------- */
function wrapLabel(text, width){
  var perLine = Math.max(10, Math.floor((width - 22) / 7.6));
  var words = text.split(" "), lines = [], line = "";
  words.forEach(function(w){
    if ((line + " " + w).trim().length > perLine && line){ lines.push(line); line = w; }
    else line = (line ? line + " " : "") + w;
  });
  if (line) lines.push(line);
  return lines;
}

function boxExit(node, towardX, towardY){
  var dx = towardX - node.x, dy = towardY - node.y;
  if (dx === 0 && dy === 0) return { x:node.x, y:node.y };
  var hw = node.w / 2 + 4, hh = node.h / 2 + 4;
  var tx = dx === 0 ? Infinity : hw / Math.abs(dx);
  var ty = dy === 0 ? Infinity : hh / Math.abs(dy);
  var t = Math.min(tx, ty);
  return { x: node.x + dx * t, y: node.y + dy * t };
}

function renderLoop(loop){
  state.map = { kind:"loop", id: loop.id };
  el.mapTitle.textContent = loop.title;
  el.mapSummary.textContent = loop.summary;
  if (el.branchSwatches) el.branchSwatches.innerHTML = "";

  var vb = (loop.viewBox || "0 0 1000 500").split(/\s+/).map(Number);
  var byId = {};
  loop.nodes.forEach(function(n){
    n.lines = wrapLabel(n.label, n.w);
    n.h = 18 + n.lines.length * 19;
    byId[n.id] = n;
  });

  var svg = [];
  svg.push('<svg class="loop-svg" viewBox="' + loop.viewBox + '" role="img" aria-labelledby="ld-' + loop.id + '">');
  svg.push('<title id="ld-' + loop.id + '">' + esc(loop.title) + ". " + esc(loop.path) + '</title>');
  svg.push('<defs>' +
    '<marker id="arrow-pos" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M0,0 L10,5 L0,10 z" fill="#1E3D4C"/></marker>' +
    '<marker id="arrow-neg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M0,0 L10,5 L0,10 z" fill="#A0522D"/></marker></defs>');

  loop.edges.forEach(function(ed){
    var a = byId[ed.from], b = byId[ed.to];
    if (!a || !b) return;
    var neg = ed.sign === "-";
    var p1, p2, midX, midY, d;
    if (ed.cp){
      var cx = ed.cp[0], cy = ed.cp[1];
      p1 = boxExit(a, cx, cy); p2 = boxExit(b, cx, cy);
      d = "M" + p1.x + "," + p1.y + " Q" + cx + "," + cy + " " + p2.x + "," + p2.y;
      midX = 0.25 * p1.x + 0.5 * cx + 0.25 * p2.x;
      midY = 0.25 * p1.y + 0.5 * cy + 0.25 * p2.y;
    } else {
      p1 = boxExit(a, b.x, b.y); p2 = boxExit(b, a.x, a.y);
      d = "M" + p1.x + "," + p1.y + " L" + p2.x + "," + p2.y;
      midX = (p1.x + p2.x) / 2; midY = (p1.y + p2.y) / 2;
    }
    svg.push('<path class="loop-edge' + (neg ? " neg" : "") + '" d="' + d +
             '" marker-end="url(#' + (neg ? "arrow-neg" : "arrow-pos") + ')"/>');
    svg.push('<g class="sign-badge' + (neg ? " neg" : "") + '">' +
      '<circle cx="' + midX + '" cy="' + midY + '" r="12"/>' +
      '<text x="' + midX + '" y="' + (midY + 5) + '" text-anchor="middle">' + ed.sign + '</text></g>');
    if (ed.label){
      /* Push the caption perpendicular to the edge so it never sits on the
         line, far enough out to clear the sign badge given how wide the text
         is, then keep it inside the viewBox. If clamping pushes it back onto
         the badge, put it on the other side instead. */
      var vx = p2.x - p1.x, vy = p2.y - p1.y;
      var len = Math.sqrt(vx * vx + vy * vy) || 1;
      var halfText = ed.label.length * 2.9;
      var reach = 20 + halfText;
      var px = -vy / len, py = vx / len;
      var cxp = midX + px * reach, cyp = midY + py * reach;
      var lo = vb[0] + halfText + 4, hi = vb[0] + vb[2] - halfText - 4;
      var clamped = Math.min(Math.max(cxp, lo), hi);
      if (Math.abs(clamped - midX) < 18 && Math.abs(cyp - midY) < 18){
        cxp = midX - px * reach; cyp = midY - py * reach;
        clamped = Math.min(Math.max(cxp, lo), hi);
      }
      svg.push('<text class="edge-caption" x="' + clamped.toFixed(1) +
               '" y="' + Math.min(Math.max(cyp, vb[1] + 10), vb[1] + vb[3] - 6).toFixed(1) +
               '" text-anchor="middle" dominant-baseline="middle">' + esc(ed.label) + '</text>');
    }
  });

  loop.nodes.forEach(function(n){
    svg.push('<g class="loop-node"><rect x="' + (n.x - n.w / 2) + '" y="' + (n.y - n.h / 2) +
             '" width="' + n.w + '" height="' + n.h + '" rx="8"/>');
    var startY = n.y - n.h / 2 + 22;
    n.lines.forEach(function(ln, i){
      svg.push('<text x="' + n.x + '" y="' + (startY + i * 19) + '" text-anchor="middle">' + esc(ln) + '</text>');
    });
    svg.push('</g>');
  });
  svg.push("</svg>");

  el.mapBody.innerHTML = svg.join("") +
    '<dl class="loop-meta">' +
    '<dt>Feedback type</dt><dd>' + esc(loop.feedback === "negative" ? "Negative feedback" : "Positive feedback") + '</dd>' +
    '<dt>What opens the loop</dt><dd>' + esc(loop.stimulus) + '</dd>' +
    '<dt>The loop in words</dt><dd>' + esc(loop.path) + '</dd>' +
    '<dt>Reading the signs</dt><dd>A plus means the step increases or stimulates what it points to. ' +
    'A minus, shown on a dashed line, means it decreases or inhibits.</dd></dl>';
}

/* ---------- search ---------- */
function runSearch(q){
  if (!state.map || state.map.kind !== "tree"){
    say(q ? "Search works on the hierarchical maps. Pick one on the left." : "");
    return;
  }
  var items = allItems();
  if (!q){
    items.forEach(function(li){
      li.classList.remove("filtered-out");
      var lab = li.querySelector(".node-label");
      lab.innerHTML = esc(lab.textContent);
    });
    applyDepth(parseInt(el.depth.value, 10));
    setRovingStart();
    say("");
    return;
  }
  var needle = q.toLowerCase(), hits = 0, keep = new Set();
  items.forEach(function(li){
    if (li.querySelector(".node-card").textContent.toLowerCase().indexOf(needle) !== -1){
      hits += 1; keep.add(li);
      var p = parentItem(li);
      while (p){ keep.add(p); p = parentItem(p); }
    }
  });
  items.forEach(function(li){
    var lab = li.querySelector(".node-label");
    var raw = lab.textContent;
    if (keep.has(li)){
      li.classList.remove("filtered-out");
      if (li.getAttribute("aria-expanded") !== null) toggle(li, true);
      var idx = raw.toLowerCase().indexOf(needle);
      lab.innerHTML = idx === -1 ? esc(raw)
        : esc(raw.slice(0, idx)) + "<mark>" + esc(raw.slice(idx, idx + q.length)) + "</mark>" +
          esc(raw.slice(idx + q.length));
    } else {
      li.classList.add("filtered-out");
      lab.innerHTML = esc(raw);
    }
  });
  setRovingStart();
  say(hits === 0 ? "No nodes in this map match " + q + "."
                 : hits + (hits === 1 ? " node matches " : " nodes match ") + q + ".");
}

/* ---------- map selection and navigation ---------- */
function selectMap(kind, id){
  document.querySelectorAll(".map-btn").forEach(function(b){
    b.setAttribute("aria-current", (b.dataset.kind === kind && b.dataset.id === id) ? "true" : "false");
  });
  el.search.value = "";
  var subj = subject();
  if (kind === "tree") renderTree(subj.trees.filter(function(t){ return t.id === id; })[0]);
  else renderLoop(subj.loops.filter(function(l){ return l.id === id; })[0]);
}

function buildMapLists(){
  var subj = subject();
  el.treeList.innerHTML = "";
  el.loopList.innerHTML = "";
  subj.trees.forEach(function(t){ el.treeList.appendChild(mapButton("tree", t.id, t.title)); });
  subj.loops.forEach(function(l){ el.loopList.appendChild(mapButton("loop", l.id, l.title)); });
}

function mapButton(kind, id, title){
  var li = document.createElement("li");
  var b = document.createElement("button");
  b.type = "button"; b.className = "map-btn";
  b.dataset.kind = kind; b.dataset.id = id;
  b.textContent = title;
  b.setAttribute("aria-current", "false");
  b.addEventListener("click", function(){ selectMap(kind, id); });
  li.appendChild(b);
  return li;
}

function buildSubjectSelect(){
  (INDEX.subjects || []).forEach(function(s){
    var o = document.createElement("option");
    o.value = s.id;
    o.textContent = s.title + " (" + s.nodes + " nodes)";
    el.subjectSelect.appendChild(o);
  });
  el.subjectSelect.addEventListener("change", function(){
    var id = el.subjectSelect.value;
    ensureSubject(id, function(){
      state.subjectId = id;
      buildMapLists();
      selectMap("tree", subject().trees[0].id);
      buildGlossary();
      say("Showing " + subject().title + ".");
    });
  });
}

function buildGlossary(){
  if (!el.glossaryList) return;
  el.glossaryList.innerHTML = "";
  var g = subject().glossary || {};
  Object.keys(g).sort().forEach(function(term){
    var box = document.createElement("div");
    var dt = document.createElement("dt");
    dt.textContent = term.charAt(0).toUpperCase() + term.slice(1);
    var dd = document.createElement("dd");
    dd.textContent = g[term];
    box.appendChild(dt); box.appendChild(dd);
    el.glossaryList.appendChild(box);
  });
}

/* ---------- view and notes ---------- */
function setView(view){
  state.view = view;
  el.mapBody.classList.toggle("view-map", view === "map");
  el.mapBody.classList.toggle("view-outline", view === "outline");
  el.viewMap.setAttribute("aria-pressed", view === "map" ? "true" : "false");
  el.viewOutline.setAttribute("aria-pressed", view === "outline" ? "true" : "false");
  setNotes(view === "outline");
  renderTrail();
  say(view === "map"
    ? "Mind map view. Branches fan out to the right, one color per branch."
    : "Outline view. Branches stack vertically, explanations shown.");
}

function setFocus(on){
  state.focus = on;
  el.focusBtn.setAttribute("aria-pressed", on ? "true" : "false");
  if (on){
    applyDepth(parseInt(el.depth.value, 10));
    setRovingStart();
    revealRoot();
    say("One branch at a time. Opening a card now closes the others at that level.");
  } else {
    renderTrail();
    say("Branches now stay open independently. Open as many as you like.");
  }
}

function setNotes(on){
  state.notes = on;
  el.mapBody.classList.toggle("notes-off", !on);
  el.notesBtn.setAttribute("aria-pressed", on ? "true" : "false");
  el.notesBtn.textContent = on ? "Hide explanations" : "Show explanations";
}

/* ---------- wiring ---------- */
var searchTimer = null;
el.search.addEventListener("input", function(){
  clearTimeout(searchTimer);
  var v = el.search.value.trim();
  searchTimer = setTimeout(function(){ runSearch(v); }, 180);
});
el.depth.addEventListener("change", function(){
  if (state.map && state.map.kind === "tree"){
    applyDepth(parseInt(el.depth.value, 10));
    setRovingStart();
    revealRoot();
    say("Showing levels 1 to " + el.depth.value + ".");
  }
});
el.expandAll.addEventListener("click", function(){
  if (state.map && state.map.kind !== "tree") return;
  /* opening everything is the opposite of one branch at a time, so that
     mode switches itself off rather than silently fighting the button */
  var wasFocus = state.focus;
  state.focus = false;
  el.focusBtn.setAttribute("aria-pressed", "false");
  el.depth.value = String(MAX_LEVEL);
  applyDepth(MAX_LEVEL);
  setRovingStart();
  revealRoot();
  say(wasFocus
    ? "Every branch is open, so one branch at a time has switched off."
    : "Every branch is open. The centre of the map is back in view.");
});
el.focusBtn.addEventListener("click", function(){ setFocus(!state.focus); });
el.collapseAll.addEventListener("click", function(){
  if (state.map && state.map.kind !== "tree") return;
  el.depth.value = "1";
  applyDepth(1);
  setRovingStart();
  revealRoot();
  say("Closed back to the centre of the map.");
});
el.printBtn.addEventListener("click", function(){
  if (state.map && state.map.kind === "tree") applyDepth(MAX_LEVEL);
  window.print();
});
el.viewMap.addEventListener("click", function(){ setView("map"); });
el.viewOutline.addEventListener("click", function(){ setView("outline"); });
el.notesBtn.addEventListener("click", function(){ setNotes(!state.notes); });

/* ---------- start ---------- */
function start(){
  if (!INDEX){
    el.mapTitle.textContent = "Index not found";
    el.mapSummary.textContent =
      "build/subject-index.js is missing. Run node tools/build.js from the repository root.";
    return;
  }
  buildSubjectSelect();
  var first = (INDEX.subjects || [])[0];
  if (!first) return;
  el.subjectSelect.value = first.id;
  ensureSubject(first.id, function(){
    state.subjectId = first.id;
    buildMapLists();
    setView("map");
    selectMap("tree", subject().trees[0].id);
    buildGlossary();
    say("");
  });
}

start();

})();
