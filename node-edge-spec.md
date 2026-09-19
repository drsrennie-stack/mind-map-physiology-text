# Node and Edge Specification

Mind-Mapped Medical Sciences
Version 1.0, September 19, 2026
Dr. Sharilyn Rennie

This document is the rule set every map in the project obeys. It exists so that map 400 reads the same way as map 4. If a map cannot be built without breaking a rule here, the rule gets revised on purpose and every affected map gets rebuilt. Rules do not get bent quietly for one map.

---

## 1. Scope

The project covers anatomy, physiology, pathophysiology, and clinical medicine as a single connected body of maps. Every map belongs to exactly one of two diagram classes.

**Class A, Hierarchical Tree.** The default. Used for structure, classification, breakdown, and any content that answers "what is this made of" or "what are the kinds of this" or "what does this do."

**Class B, Loop Diagram.** The exception. Used only for content that genuinely cycles: negative feedback axes, positive feedback, and homeostatic set-point control. A loop cannot be drawn as a tree, so it is not forced into one.

No radial maps. No free-form concept webs. Those two classes are the entire visual vocabulary.

---

## 2. Why the tree is the default

A hierarchical tree is a single-parent, acyclic structure. That constraint is the reason it works:

- It breaks cleanly across pages and columns, so print stays possible.
- It maps one to one onto a nested HTML list, so screen readers and keyboards get it correctly with no parallel text version.
- It has an unambiguous reading direction, so two students never trace it differently.
- It collapses and expands by depth, which gives progressive disclosure for free.

Everything below protects those four properties.

---

## 3. Level definitions

Maximum depth is five levels. Level meaning is fixed across the whole project.

| Level | Name | What belongs here |
|-------|------|-------------------|
| L1 | Map root | The subject of the map. One per map. |
| L2 | Domain | The major divisions of the subject. Aim for 3 to 7. |
| L3 | Component | The named parts, players, or stages inside a domain. |
| L4 | Detail | The specific facts, mechanisms, values, or actions. |
| L5 | Clinical link | Where the detail shows up in patient care. Terminal only. |

Three hard rules follow from the table:

1. **If a branch wants a sixth level, it is not a branch. It is its own map.** Promote it, give it an L1 root, and leave a reference chip behind.
2. **A clinical node is always terminal.** It never has children. If the clinical material needs its own breakdown, it becomes a pathophysiology map of its own.
3. **A clinical node attaches to the detail it belongs to, which is not always at L4.** Where a branch runs shallower, the clinical link lands at L4 rather than L5. The rule is that a clinical node is the last node on its branch, not that it always sits at level five. Padding a branch with filler nodes to push a clinical link down to L5 is worse than the shallower branch, so it is not done.

---

## 4. Node types

Every node carries a type. Type is shown three ways at once so that color is never the only carrier of meaning: a text tag, a border treatment, and position in the tree.

| Type | Tag shown | Meaning | Card treatment |
|------|-----------|---------|----------------|
| `structure` | STRUCTURE | A physical thing. Organ, tissue, cell, molecule. | White card |
| `process` | PROCESS | Something happening. Synthesis, transport, secretion, action. | White card |
| `control` | CONTROL | Regulation. Stimulus, feedback, rhythm, set point. | White card |
| `clinical` | CLINICAL | Patient-facing consequence. Always terminal. | Navy-tint `#EDF1F3` fill |
| `reference` | SEE | A pointer to a node that lives somewhere else. Never has children. | Dashed border |

**Type is carried by the tag, not by color.** Color is spent on branch identity instead, which is what makes a map scannable. A reader who cannot resolve any color still gets the type from the word in small capitals on every card.

The locked / unlocked / completed state colors used elsewhere in the teaching stack are reserved for progression interfaces. They are not used here, and node typing is not used to show progress. The two systems stay separate.

### Branch color

Each level two branch takes a color, and that color runs down its whole subtree: the card's left edge, the spine, and the connector stubs. This is what makes a branch readable as one thing at a glance.

The palette supplies four usable accent values, so the colors cycle:

| Position | Color |
|----------|-------|
| 1st branch | Navy `#1E3D4C` |
| 2nd branch | Terra cotta `#C2734D` |
| 3rd branch | Brushed gold `#B8924A` |
| 4th branch | Terra-dark `#A0522D` |
| 5th branch onward | Repeats from the start |

A map with more than four top-level branches therefore repeats a color, though never on adjacent branches. Several maps in the endocrine subject area have five to seven branches and do repeat. Adding one more accent value to the palette would raise the ceiling; that is a palette decision, not a spec decision, and no value is invented here to work around it.

Branch color is never the only thing distinguishing two branches. Physical position in the tree already separates them completely, so the color is an aid to scanning rather than a carrier of information.

### Coloring by type instead

The app also offers a second coloring, where the accent follows the node type rather than the branch: structure navy, process terra cotta, control brushed gold, clinical terra-dark. Three accents cover every case, so nothing repeats and the four-color cycle does not apply in this mode.

This exists because the type grouping is often what a reader wants to see. Fourteen of the nineteen maps already run their level two branches in type order, structure first, then process, then control, and coloring by type makes that visible without adding a level. The remaining five interleave types because the teaching sequence requires it, and the teaching sequence wins: branches are never reordered to tidy up the colors.

Wrapping the branches in type boxes was considered and rejected. It adds a level, and nine of the nineteen maps would then exceed the five level cap. The type tag on every card already says what each one is, so a wrapper box would spend a whole level restating what is printed on the cards.

---

## 5. Edge types

In a tree the line already means "parent to child." The edge type says what kind of parent-child relationship it is. Every edge carries one, shown as a short label on the connector.

| Edge | Reads as | Example |
|------|----------|---------|
| `contains` | is made of, includes | Thyroid gland contains follicles |
| `type-of` | kinds of, classified as | Hormones classified as peptide, amine, steroid |
| `produces` | makes, secretes, releases | Beta cells produce insulin |
| `acts-on` | targets, binds | Insulin acts on skeletal muscle |
| `causes` | leads to, results in | GLUT4 insertion causes glucose uptake |
| `requires` | depends on, needs | T3 synthesis requires iodide |
| `regulated-by` | controlled by, responds to | Aldosterone release regulated by angiotensin II |
| `seen-as` | shows up in patients as | Excess growth hormone seen as acromegaly |
| `see` | defined in full elsewhere | Reference chip only |

`seen-as` is reserved for edges leading into L5 clinical nodes, and clinical nodes take no other edge type. That makes every clinical link greppable in the data.

Edge labels are written from parent to child and read aloud as a sentence: parent + edge + child. If the sentence is not true when read that way, the edge is wrong or the nodes are in the wrong order. That is the test.

---

## 6. The single canonical parent rule

This is the load-bearing rule of the project.

**Every concept has exactly one canonical home in exactly one map.** That is where it is written out in full.

Anywhere else the concept is needed, it appears as a `reference` node that points to the canonical node by ID. A reference node shows the concept name and a SEE tag, is clickable through to the canonical location, and has no children of its own.

The rule exists because duplicated branches are how a project like this rots. Two copies of the calcium branch written eight months apart will disagree, and neither one will be flagged as wrong. One canonical copy plus pointers cannot disagree with itself.

Practical consequences:

- Node IDs are globally unique across the entire project, not per map.
- Before writing a branch, search the ID index for the concept. If it exists, write a reference chip instead.
- When a concept clearly belongs in two places equally, the canonical home goes where the concept is **produced or defined**, and the other location gets the pointer. Insulin's canonical home is the pancreas map, not the glucose regulation map.

---

## 7. Convergence and cycles

Two things a tree structurally cannot do, and the fixed handling for each.

**Convergence, meaning one node with several parents.** Four different stimuli shift the oxyhemoglobin curve. A tree gives that node one parent. Handling: the node lives under its canonical parent, and each of the other parents gets a reference chip pointing to it. Do not duplicate the node.

**Cycles, meaning feedback.** A tree cannot close a loop. Handling: the cycle leaves the tree entirely and becomes a Class B loop diagram. The tree node that would have closed the loop becomes a `control` node whose child is a reference chip pointing at the loop diagram.

The result is that trees stay strictly acyclic and single-parent with no exceptions, and everything that does not fit is explicitly somewhere else rather than quietly bending the structure.

---

## 8. Loop diagram rules

Loop diagrams are deliberately small. A loop diagram that needs more than eight nodes is really two loops.

- Every edge carries a sign: `+` for stimulates or increases, `-` for inhibits or decreases.
- Signs are shown as text characters, not by color or arrowhead shape alone.
- The stimulus that opens the loop is named on the diagram.
- Every loop diagram states in one line whether it is negative or positive feedback.
- Loop diagrams carry a text description of the full path, so the loop is readable without seeing it.

---

## 9. Writing rules for node labels

- Node labels are noun phrases, short, no trailing punctuation. "Iodide trapping by NIS" not "The thyroid traps iodide."
- Labels use correct terminology. The `note` field, not the label, is where the plain-language explanation goes.
- Notes are one or two sentences, written to a student, explaining why the node matters or how to think about it. Notes are optional. An empty note is better than filler.
- Difficult terms are wrapped for the glossary rather than defined inline, so the map stays scannable.
- Temperatures are given in Celsius with Fahrenheit in parentheses.
- Numbers that vary by source are written as ranges with the reason for the variation stated, not as a single false-precision figure.
- No content in a map that cannot be sourced. If it is uncertain, it says so or it is left out.

---

## 10. Data schema

Maps are authored as data. The renderer draws them. Nobody positions a box by hand.

```js
{
  meta: { subject, version, date, author },

  trees: [{
    id: "unique-map-id",
    title: "Map title",
    summary: "One line on what this map covers.",
    root: {
      id: "globally-unique-node-id",
      label: "Node label",
      type: "structure | process | control | clinical | reference",
      edge: "contains | type-of | produces | acts-on | causes | requires | regulated-by | see",
      note: "Optional teaching line.",
      ref: "target-node-id",   // reference nodes only
      children: [ ... ]        // omitted on leaves, forbidden on clinical and reference
    }
  }],

  loops: [{
    id, title, summary, feedback: "negative | positive",
    stimulus: "What opens the loop",
    nodes: [{ id, label, x, y }],
    edges: [{ from, to, sign: "+" | "-", label }],
    path: "The loop written out as prose."
  }],

  glossary: { "term": "definition" }
}
```

The `edge` field sits on the child and describes the relationship from its parent. The root node of a map has no edge.

---

## 11. Accessibility requirements

These are requirements, not goals. A map that fails any of them does not ship.

- Tree markup is `role="tree"`, `role="treeitem"`, `role="group"`, with `aria-expanded` on every node that has children and `aria-level` on every item.
- Keyboard navigation follows the standard tree pattern: Up and Down move through visible nodes, Right expands then descends, Left collapses then ascends, Home and End jump to the ends, typing a letter jumps to the next node starting with it. A single roving tab stop, so the tree is one stop in the page tab order.
- Every meaningful distinction is carried by text as well as by color.
- Focus indicators are visible and meet 3:1 against their background.
- Glossary terms open on click, not on hover alone, so touch and keyboard users reach them and so the content is dismissible and persistent.
- `prefers-reduced-motion` removes all transitions.
- Contrast floor is WCAG 2.2 AA, with AAA met wherever the palette allows. Terra cotta and brushed gold do not meet AA as text colors on white or off-white and are therefore used for borders and non-text accents only, never for text.

---

## 12. File and ID conventions

- Map IDs: kebab case, subject first. `thyroid-synthesis`, `adrenal-cortex`.
- Node IDs: kebab case, globally unique, stable forever. Once a node ID ships it is never reused for a different concept, because reference chips point at it.
- Data files: one file per subject area. `endocrine-data.js`, `renal-data.js`.
- Every subject area ships with its own `compliance-notes.md`.

---

## 13. The build step

Maps are data, so the data is checked by a program rather than by reading.

```
node tools/build.js
```

It loads every file in `maps/`, validates all of it against this document, and refuses to write anything if a rule is broken. Run it before every push. What it enforces:

- Every required field is present on subjects, maps, loops, and nodes
- Node, map, and loop IDs are kebab case and **unique across every subject area**, which is what makes the single canonical parent rule real rather than aspirational
- No node deeper than level five
- Clinical nodes are terminal and use `seen-as`; reference nodes are terminal, carry a `ref`, and use `see`; neither edge is used anywhere else
- Every reference chip resolves, including across subject files, and no chip points at another chip or at itself
- Loop nodes fit inside their own viewBox, loop edges connect real nodes, and every edge carries a valid sign
- Every `{{term}}` marked in a note is defined in some subject's glossary
- No em dash anywhere. Every string in the file is swept rather than a fixed list of fields, so a field added later is covered without anyone remembering to add a check for it. The error names the exact path, for example `glossary.natriuresis`.
- American spelling. British spellings are rejected the same way, across the map data and across `index.html`, `app.js`, `styles.css`, and the project's own markdown. For a file the error gives a line number; for map data it gives the path. The word list sits at the top of `tools/build.js` with instructions for adding to it, and it covers the categories that actually turn up in this material: the -our and -re endings, the -ise and -yse verb endings including the depolarize family, and the medical ae, oe, haem, and sulph families. Words that are correct in American English either way, such as exercise, analysis, and concentration, are deliberately absent and are covered by a false-positive test. Note that a document describing this rule cannot quote the rejected spellings, because the check reads its own documentation too.

It warns, without blocking, when the same label appears on more than one concept-bearing node, which usually means a branch was written twice instead of pointed at.

On success it writes two things:

- `build/subject-index.js`, which the app loads at startup. It maps every node and loop ID to the subject area that owns it, so a reference chip can point anywhere and the app knows which file to fetch. Subject data files are then loaded on demand rather than all at once.
- `build/ID-INDEX.md`, which is for authors. Every node ID with its label, type, level, map, and subject, plus a table of every cross-subject link. **Search this before writing a new branch.** If the concept is already there, write a reference chip.

Neither generated file is edited by hand.

---

## 14. What this specification does not cover yet

Written down so it is not mistaken for settled:

- Print pagination for trees deeper than four levels on a single page.
- Whether clinical links carry a difficulty or year level, so the same map can serve a first-year and a fourth-year student.
- Whether the four-color branch cycle is enough, or whether the palette should gain a fifth accent. Several endocrine maps have more than four top-level branches and repeat a color.
- Search across loop diagrams. It currently covers hierarchical maps only.
- Whether the ID index stays a single file once the project is past a few thousand nodes.
