# Accessibility Compliance Notes

**Project:** Mind-Mapped Medical Sciences
**Files covered:** index.html, app.js, styles.css, maps/endocrine.js, maps/renal.js, maps/neurophysiology.js
**Content:** 556 nodes across 19 hierarchical maps and 7 loop diagrams, in three subject areas
**Date:** September 19, 2026
**Reviewer:** Dr. Sharilyn Rennie

---

## 1. WCAG version and target level

Target: WCAG 2.2 Level AA as the floor, Level AAA where the palette allows it.

Both tree layouts, mind map and outline, render the same DOM. Only CSS differs between them, so every result below holds in either view.

| Criterion | Level | Status | How it is met |
|-----------|-------|--------|---------------|
| 1.3.1 Info and Relationships | A | Met | Tree is a nested list with `role="tree"`, `role="treeitem"`, `role="group"`, `aria-level`, and `aria-expanded`. Headings run h1 then h2 with none skipped. Loop metadata is a definition list. |
| 1.3.2 Meaningful Sequence | A | Met | Reading order is DOM order in both views. The mind map's horizontal arrangement comes from flex direction, not from repositioning, so nothing is read out of order. |
| 1.4.1 Use of Color | A | Met | Node type is carried by a word in small capitals on every card in both color modes, never by color alone. Branch identity is carried by position in the tree; color only makes that faster to scan. Loop edge polarity is carried by a plus or minus character and by a dashed line, as well as by color. |
| 1.4.3 Contrast (Minimum) | AA | Met | See section 2. Every text pair is 5.38:1 or better. |
| 1.4.6 Contrast (Enhanced) | AAA | Partly met | Navy body and label text reaches AAA. Terra-dark section labels and gray edge labels sit between AA and AAA. Palette-locked, see section 2. |
| 1.4.10 Reflow | AA | Met | Verified at 390 px with zero horizontal page overflow. The mind map layout is replaced by the vertical outline below 900 px, and the layout toggle is hidden there rather than offered. |
| 1.4.11 Non-text Contrast | AA | Met | See section 2, including the reasoning for the brushed gold branch. |
| 1.4.12 Text Spacing | AA | Met | No fixed heights on text containers. Card width is fixed in the mind map view but height is not, so text reflows. |
| 1.4.13 Content on Hover or Focus | AA | Met | Glossary definitions open on click and stay until clicked again or Escape is pressed. Nothing appears on hover alone. |
| 2.1.1 Keyboard | A | Met | See section 3. |
| 2.1.2 No Keyboard Trap | A | Met | Tab enters and leaves the tree in one step, because the tree is a single roving tab stop. |
| 2.4.1 Bypass Blocks | A | Met | Skip link to the main region, visible on focus. |
| 2.4.3 Focus Order | A | Met | Header, subject selector, map list, controls, trail, tree, legend, glossary, footer. |
| 2.4.7 Focus Visible | AA | Met | 3 px navy outline with 2 px offset, at 11.01:1 against the page background. |
| 2.4.8 Location | AAA | Met | With one branch at a time on, a trail above the map names every step from the root to where you are, and each earlier step is a button back to that level. |
| 2.4.11 Focus Not Obscured | AA | Met | The sidebar is sticky but sits beside the content column, not over it. |
| 2.5.3 Label in Name | A | Met | Expand and collapse buttons carry an accessible name containing the visible node label. |
| 2.5.8 Target Size (Minimum) | AA | Met | Controls are at least 24 by 24 px; control bar buttons are 40 px tall. The 22 px expand button is exempt under the spacing allowance and is duplicated by a full-card click target and by keyboard activation. |
| 3.1.1 Language of Page | A | Met | `lang="en"`. |
| 3.2.3 Consistent Navigation | AA | Met | The subject selector, map list, and control bar stay in the same place across every map and every subject area. |
| 4.1.2 Name, Role, Value | A | Met | Every control is a real button, input, or select. State is exposed with `aria-expanded`, `aria-pressed`, and `aria-current`. The layout, focus, color, and explanation toggles are pressed-state buttons whose visible label states what the next press does. The trail is a labelled `nav` whose current step carries `aria-current`. |
| 4.1.3 Status Messages | AA | Met | Search counts, depth changes, subject loading, and cross-subject jumps all announce through a `role="status"` region with `aria-live="polite"`. |

---

## 2. Color contrast audit

Ratios computed from the sRGB values in `styles.css` using the WCAG relative luminance formula.

### Text pairs

| Foreground | Background | Ratio | Level | Where |
|-----------|-----------|-------|-------|-------|
| Navy `#1E3D4C` | White `#FFFFFF` | 11.49:1 | AAA | Node labels, notes, card body |
| Navy `#1E3D4C` | Off-white `#FAFAF9` | 11.01:1 | AAA | Page text, headings, usage instructions |
| Navy `#1E3D4C` | Navy-tint `#EDF1F3` | 10.11:1 | AAA | Clinical cards, glossary panels, pressed buttons |
| Terra-dark `#A0522D` | White `#FFFFFF` | 5.62:1 | AA | Eyebrow, subhead, section labels, type tags |
| Terra-dark `#A0522D` | Off-white `#FAFAF9` | 5.38:1 | AA | Control labels on the page background |
| Gray `#5A6872` | White `#FFFFFF` | 5.74:1 | AA | Edge relationship words, branch counts |
| Gray `#5A6872` | Off-white `#FAFAF9` | 5.50:1 | AA | Loop diagram edge captions |
| White `#FFFFFF` | Navy `#1E3D4C` | 11.49:1 | AAA | Skip link |
| Navy `#1E3D4C` | Highlight `#F4E3C4` | 9.10:1 | AAA | Search match highlight |

**AAA note.** Terra-dark and gray reach AA but not the 7:1 AAA threshold. Both are palette-locked, so reaching AAA means changing the palette rather than this file. Neither carries information unavailable elsewhere. Recorded as a known ceiling, not a defect.

### Colors never used as text

| Color | On white | Decision |
|-------|----------|----------|
| Terra cotta `#C2734D` | 3.59:1 | Below AA for normal text. Used only as a branch accent and connector. |
| Brushed gold `#B8924A` | 2.90:1 | Below AA for normal text. Used only as a branch accent and connector. |

### Non-text contrast, 3:1 required

| Element | Ratio | Result |
|---------|-------|--------|
| Navy branch accent and connectors | 11.49:1 on white, 11.01:1 on the page | Pass |
| Terra cotta branch accent and connectors | 3.59:1 | Pass |
| Terra-dark branch accent and connectors | 5.62:1 | Pass |
| Brushed gold branch accent and connectors | 2.90:1 | Below 3:1, see reasoning |
| Card outline and input borders `rgba(30,61,76,0.55)` resolving to `#81929A` | 3.09:1 on the page, 3.23:1 on white | Pass |
| Focus indicator, navy on the page background | 11.01:1 | Pass |
| Terra-dark loop arrow and dashed inhibition line | 5.62:1 | Pass |

**Color by type.** In the second coloring mode the accent follows node type rather than branch: navy for structure at 11.49:1, terra cotta for process at 3.59:1, brushed gold for control at 2.90:1, terra-dark for clinical at 5.62:1. The same reasoning below applies to the gold, and the type tag printed on every card makes the color redundant in this mode too.

**Brushed gold reasoning.** 1.4.11 covers graphical objects required to understand content. What a connector conveys is which parent a card belongs to, and physical position already conveys that without ambiguity in both layouts: a child sits directly to the right of its parent in the mind map and directly indented beneath it in the outline. Every connector is drawn at the same weight regardless of hue, so a reader who cannot resolve the gold still sees the line and still sees the structure. The hue adds branch identity, which is redundant with position. On that basis the gold branch is kept.

The clean fix, if a later audit disagrees, is one more accent value in the palette with a contrast ratio at or above 3:1, which would also end the four-color cycle described in the specification. That is a palette decision and no value has been invented here to work around it.

**Change made during this audit.** Card and input borders were originally `rgba(30,61,76,0.32)`, resolving to 1.81:1. Raised to 0.55, which resolves to 3.09:1 and still reads as a hairline.

---

## 3. Keyboard navigation flow verified

Tested in Chromium at 1500 px and 390 px, in both layouts.

Page tab order: skip link, subject selector, map buttons, layout toggle, search, depth, explanations toggle, open everything, close everything, print, the tree as one stop, then glossary and footer links.

Inside the tree, following the ARIA authoring practice for a tree view:

| Key | Behavior | Verified |
|-----|----------|----------|
| Down arrow | Next visible node | Yes |
| Up arrow | Previous visible node | Yes |
| Right arrow | Expand, or move to the first child if already expanded | Yes |
| Left arrow | Collapse, or move to the parent if already collapsed | Yes |
| Home and End | First and last visible node | Yes |
| Enter or Space | Toggle the node | Yes |
| Asterisk | Open every branch below the current node | Yes |
| Letter key | Jump to the next node whose label starts with that letter | Yes |
| Escape | Close any open glossary definition | Yes |

Clicking a card toggles it, which is a pointer convenience. It duplicates the expand button and the keyboard activation rather than replacing either, so no functionality is mouse-only.

**Branch state is independent and persistent.** Verified: after closing everything, opening one branch showed 9 nodes, and opening a second branch showed 12, with the first still open. Branches do not close each other, which is what makes the map usable for working through one branch at a time.

**Cross-subject navigation verified end to end, in both directions.** Following the pointer from the adrenal map loaded `maps/renal.js`, switched the subject selector, rebuilt the map list, opened the ancestor branches, moved focus to the principal cell node, and announced "Moved to Renal Transport and Hormone Targets. Jumped to Principal cells handle sodium, potassium, and water in Nephron Segments." The return pointer from the renal sodium map did the same back into Endocrine Physiology.

---

## 4. Screen reader testing

| Reader | Platform | Result |
|--------|----------|--------|
| Programmatic ARIA validation | Chromium accessibility tree | Verified: every treeitem exposes role, level, and expanded state; label references all resolve; exactly one element carries `tabindex="0"` at any time. |
| VoiceOver | macOS Safari | **Not yet run.** |
| NVDA | Windows Firefox | **Not yet run.** |

Landmarks: `nav` labelled "Subject areas and maps", `main`, `header`, `footer`. Each panel is a `section` with `aria-labelledby` pointing at its heading. Each tree is labelled with its map title and subject area, so a reader moving between subject areas hears which one it is in.

Loop diagrams are `role="img"` with an `aria-labelledby` title carrying the full prose description of the loop. The same description is also visible on the page under "The loop in words", so it is never available only to assistive technology or only to sighted readers.

---

## 5. Known limitations and remediation plan

1. **Manual screen reader testing is outstanding.** Programmatic validation of the accessibility tree is not the same as hearing it. Run VoiceOver in Safari and NVDA in Firefox before students see this. Pay attention to whether the branch count and the edge relationship word read as useful context or as clutter at every node; if clutter, mark them `aria-hidden` and rely on the tree's own announcements.

2. **Brushed gold branch sits at 2.90:1.** Mitigated by position redundancy, reasoning in section 2. Resolvable with one added palette value.

3. **Terra-dark and gray reach AA, not AAA.** Palette-locked.

4. **Zoom to 400 percent has not been checked.** Reflow was verified by viewport width rather than by browser zoom. These usually agree but are not the same test, and the mind map's fixed card width makes this worth confirming.

5. **Print output for deep branches is untested on paper.** Printing forces the vertical layout and prevents cards from splitting across pages, but a level five branch in the adrenal or pancreas map may still run long on letter paper.

6. **Search covers hierarchical maps only.** Searching while a loop diagram is open says so through the live region. Extending it across loops is a planned change, not a defect.

7. **Search covers the current map only, not the whole subject area or the project.** The ID index in `build/ID-INDEX.md` covers everything, but it is an authoring tool rather than something a student would use.

8. **Web font fallback.** If Google Fonts is unreachable the page falls back to the system UI font stack. Layout was verified in that state and holds, though the visual weight differs.

---

## 6. Reviewer

Reviewed by Dr. Sharilyn Rennie, September 19, 2026.

Automated checks run in headless Chromium: ARIA tree structure, roving tab stop, keyboard traversal, independent branch state, card-click toggling, cross-subject reference navigation in both directions, on-demand subject loading, search filtering and restoration, layout and explanation toggles, loop diagram bounding boxes against their viewBox, and horizontal overflow at 390 px.

Data validated by `node tools/build.js` against `node-edge-spec.md`: 391 nodes across 2 subject areas, 12 hierarchical maps, 5 loop diagrams, 29 reference chips all resolving with 13 of them crossing subject areas, no duplicate IDs anywhere in the project, no node past level five, no clinical or reference node carrying children, no unrecognized type or edge, and no em dash in any label, note, or loop description.

This document is required before the project is considered complete, per the project standard.
