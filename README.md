# Mind-Mapped Medical Sciences

Hierarchical concept maps for anatomy, physiology, pathophysiology, and clinical medicine, built as data and rendered by one app.

Dr. Sharilyn Rennie

---

## What is here

| Path | What it is |
|------|-----------|
| `index.html` | The reference app. This is what students open. |
| `app.js` | The renderer. Reads the index, loads subject files on demand. |
| `styles.css` | All styling, both tree layouts. |
| `maps/` | One file per subject area. This is where content is authored. |
| `build/` | Generated. Never edited by hand. |
| `tools/build.js` | Validates every map and generates `build/`. |
| `node-edge-spec.md` | The rule set every map obeys. Read this before authoring. |
| `compliance-notes.md` | Accessibility audit. Required before anything ships. |

Current content: endocrine physiology, renal transport, and the membranes and action potentials unit. 556 nodes across 19 hierarchical maps and 7 loop diagrams.

---

## Running it

It is plain HTML, CSS, and JavaScript with no build dependencies and no package manager. Open `index.html` in a browser, or serve the folder. It works on GitHub Pages as is.

After editing anything in `maps/`, run:

```
node tools/build.js
```

This validates every map against the specification and regenerates `build/`. If it reports errors it writes nothing, so a broken map cannot reach the app.

It also enforces two writing rules: no em dashes, and American spelling. Both are checked in the map data and in the app files, and both stop the build rather than warning. The spelling word list is at the top of `tools/build.js` if you want to add to it.

---

## Adding a map to an existing subject

1. Open `build/ID-INDEX.md` and search for the concepts you are about to write. If one is already there, you will write a reference chip rather than a second copy. This is the single canonical parent rule, and it is the thing that keeps the project from contradicting itself as it grows.
2. Add the map to the `trees` array in the relevant file under `maps/`.
3. Run `node tools/build.js`.
4. Open `index.html` and check it.

---

## Adding a new subject area

1. Copy an existing file in `maps/` as a starting point, for example `maps/renal.js`.
2. Set `id`, `title`, `version`, `date`, and `author`. The file name must match the `id`.
3. Prefix every node ID with something short and unique to the subject, the way renal uses `rn-`. IDs are unique across the whole project, so a prefix prevents collisions and makes the data greppable.
4. Author the maps to `node-edge-spec.md`.
5. Run `node tools/build.js`. The new subject appears in the app's subject selector automatically.
6. Write a `compliance-notes.md` entry before it goes in front of students.

---

## Pointing at something in another subject area

Write a reference chip. The target ID is all that is needed; the build step works out which file it lives in.

```js
{ id: "rn-ref-aldosterone",
  label: "See aldosterone, in Endocrine Physiology",
  type: "reference", edge: "see", ref: "aldosterone" }
```

To point at a loop diagram, prefix with `loop:`:

```js
{ id: "ref-raas-endo",
  label: "See the renin-angiotensin-aldosterone loop, in Renal Transport",
  type: "reference", edge: "see", ref: "loop:raas-loop" }
```

The app loads the other subject file when the student follows the pointer, switches the subject selector, opens the branch, and moves focus to the target. Nothing needs registering anywhere.

---

## The two views

**Mind map** is the default. The root sits on the left and branches fan out to the right, one color per branch, with explanations hidden. This is the view for working through a map and testing recall.

**Outline** stacks everything vertically with explanations shown. This is the view for reading.

## Color by branch or by type

Branch coloring gives each top-level branch its own color, running down its whole subtree. Type coloring gives every structure card navy, every process card terra cotta, every control card gold, wherever it sits, so the types group visually without any change to the maps.

Wrapping the branches in type boxes would add a level and push nine of the nineteen maps past the five level cap, which is why this is a color mode rather than a structural change.

## One branch at a time

On by default. Opening a card closes the others at that level, so you always see a single level of options side by side instead of scrolling past every branch you already opened. A trail above the map shows the path you have taken, and clicking any step in it takes you back to that level.

Turn it off to leave several branches open at once. "Open everything" turns it off automatically, since the two do opposite things.

Narrow screens always use the vertical layout, because a horizontal mind map on a phone is a scroll maze. Printing always uses the vertical layout, for the same reason on paper.

---

## Embedding

The app sends its height to the parent frame on load, on resize, and whenever content changes, so it works in a Kajabi iframe without a fixed height. Pass a frame id in the query string if a page embeds more than one:

```
index.html?id=endocrine-maps
```

---

## Before pushing

```
node tools/build.js
```

Zero errors, or nothing ships. The GitHub Action in `.github/workflows/validate.yml` runs the same command on every push, so a broken map is caught even if the local run is skipped.
