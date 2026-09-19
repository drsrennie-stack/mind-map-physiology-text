/* ============================================================
   Membranes, Membrane Potential, and Action Potentials
   Mind-Mapped Medical Sciences
   Dr. Sharilyn Rennie

   Authored to node-edge-spec.md v1.1.

   Scope. The membrane dynamics and neuronal signaling unit:
   how things cross a membrane, how that produces a resting
   potential, how a graded potential becomes an action potential,
   how it travels, and how it crosses a synapse. Topic order
   follows the usual Silverthorn sequence. Chapter numbers are
   deliberately not cited, because they move between editions.

   Node IDs are prefixed np- so a grep separates this subject
   area from the others at a glance.

   Run `node tools/build.js` after editing this file.
   ============================================================ */

(function(){
"use strict";

var SUBJECT = {

  id: "neurophysiology",
  title: "Membranes, Membrane Potential, and Action Potentials",
  version: "1.0",
  date: "September 19, 2026",
  author: "Dr. Sharilyn Rennie",

  trees: [

    /* ===== 1. MEMBRANE TRANSPORT ===== */
    {
      id: "membrane-transport",
      title: "Membrane Transport",
      summary: "What can cross a membrane on its own, what needs help, and what that help costs.",
      root: {
        id: "np-transport", label: "Membrane Transport", type: "process",
        note: "Everything else in this unit rests on one fact: the membrane lets some things through and not others. Decide what a molecule is, and you can predict how it gets across.",
        children: [

          { id: "np-barrier", label: "Why the membrane is selective", type: "structure", edge: "contains",
            children: [
              { id: "np-bilayer", label: "The phospholipid bilayer has an oily core", type: "structure", edge: "causes",
                note: "The middle of the membrane is hydrophobic. Anything that dissolves in oil passes easily, and anything that carries a charge does not.",
                children: [
                  { id: "np-crosses", label: "Small lipophilic molecules cross on their own: oxygen, carbon dioxide, steroids", type: "process", edge: "causes" },
                  { id: "np-blocked", label: "Ions, glucose, and amino acids need a protein to get through", type: "process", edge: "causes",
                    note: "This is why so much of cell physiology is really the study of membrane proteins." }
                ] }
            ] },

          { id: "np-passive", label: "Passive transport, no ATP spent", type: "process", edge: "contains",
            note: "Passive means the molecule moves down its own gradient. The cell is not paying for the movement, though it may have paid earlier to build the gradient.",
            children: [
              { id: "np-simple", label: "Simple diffusion", type: "process", edge: "type-of",
                children: [
                  { id: "np-simple-how", label: "Straight through the bilayer, down the concentration gradient", type: "process", edge: "causes" },
                  { id: "np-simple-rate", label: "Rate rises with the gradient, with temperature, and with lipid solubility", type: "process", edge: "causes" },
                  { id: "np-simple-nosat", label: "It cannot be saturated, because no protein is involved", type: "process", edge: "causes",
                    note: "This is the cleanest way to tell simple from facilitated diffusion on a graph. Simple diffusion climbs in a straight line. Facilitated diffusion levels off." }
                ] },
              { id: "np-facilitated", label: "Facilitated diffusion", type: "process", edge: "type-of",
                note: "Still down the gradient and still free, but a protein does the carrying.",
                children: [
                  { id: "np-channels", label: "Channels form a water-filled pore and are selective by size and charge", type: "structure", edge: "type-of",
                    note: "Fast, because the ion simply passes through an opening." },
                  { id: "np-carriers", label: "Carriers bind the solute and change shape around it", type: "structure", edge: "type-of",
                    note: "Slower than a channel, and saturable, because there are only so many carriers and each one takes time to cycle." },
                  { id: "np-glut", label: "GLUT transporters move glucose this way", type: "structure", edge: "type-of" }
                ] },
              { id: "np-gating", label: "Channels are not always open", type: "control", edge: "regulated-by",
                children: [
                  { id: "np-leak-ch", label: "Leak channels stay open most of the time", type: "structure", edge: "type-of" },
                  { id: "np-voltage-ch", label: "Voltage-gated channels open in response to a change in membrane potential", type: "structure", edge: "type-of" },
                  { id: "np-ligand-ch", label: "Ligand-gated channels open when a chemical binds them", type: "structure", edge: "type-of" },
                  { id: "np-mech-ch", label: "Mechanically gated channels open when the membrane is stretched or deformed", type: "structure", edge: "type-of" }
                ] }
            ] },

          { id: "np-active", label: "Active transport, against the gradient", type: "process", edge: "contains",
            children: [
              { id: "np-primary", label: "Primary active transport spends ATP directly", type: "process", edge: "type-of",
                children: [
                  { id: "np-nakatpase", label: "The sodium-potassium ATPase moves three sodium out for every two potassium in", type: "structure", edge: "type-of",
                    note: "One ATP per cycle. It runs constantly in every cell, and in a neuron it is a large share of the cell's entire energy budget." },
                  { id: "np-nak-why", label: "It builds and maintains the gradients the rest of this unit depends on", type: "process", edge: "causes",
                    note: "Nothing later in this unit works without it. The resting potential, the action potential, and secondary active transport all borrow from the gradients this pump created.",
                    children: [
                      { id: "np-cl-digoxin", label: "Digoxin blocks this pump in cardiac muscle", type: "clinical", edge: "seen-as",
                        note: "Blocking it leaves more sodium inside, which weakens the sodium-calcium exchanger, which leaves more calcium inside, which strengthens contraction. A chain of three steps, and each one follows from the one before it." }
                    ] },
                  { id: "np-other-pumps", label: "Other examples: the calcium ATPase and the proton-potassium ATPase", type: "structure", edge: "type-of" }
                ] },
              { id: "np-secondary", label: "Secondary active transport borrows a gradient the pump already made", type: "process", edge: "type-of",
                children: [
                  { id: "np-symport", label: "{{Symport}} carries both solutes in the same direction, as sodium and glucose together", type: "process", edge: "type-of",
                    children: [
                      { id: "np-ref-sglt", label: "See sodium-glucose cotransport in the proximal tubule, in Renal Transport", type: "reference", edge: "see", ref: "rn-sglt" }
                    ] },
                  { id: "np-antiport", label: "{{Antiport}} carries them in opposite directions, as the sodium-calcium exchanger does", type: "process", edge: "type-of" },
                  { id: "np-secondary-atp", label: "No ATP is spent at this step, though the pump spent it earlier", type: "process", edge: "causes",
                    note: "This is the point students most often miss. Secondary active transport is called active because one solute moves against its gradient, not because this particular protein uses ATP." }
                ] }
            ] },

          { id: "np-vesicular", label: "Vesicular transport for anything too large", type: "process", edge: "contains",
            children: [
              { id: "np-endocytosis", label: "Endocytosis brings material into the cell", type: "process", edge: "type-of",
                children: [
                  { id: "np-receptor-med", label: "Receptor-mediated endocytosis selects specific molecules", type: "process", edge: "type-of" },
                  { id: "np-phago", label: "Phagocytosis engulfs whole particles and is limited to certain cells", type: "process", edge: "type-of" }
                ] },
              { id: "np-exocytosis-nm", label: "Exocytosis releases material out of the cell", type: "process", edge: "type-of",
                children: [
                  { id: "np-ref-exo", label: "See calcium-triggered exocytosis in the beta cell, in Endocrine Physiology", type: "reference", edge: "see", ref: "exocytosis" }
                ] },
              { id: "np-transcytosis", label: "Transcytosis carries material in one side of a cell and out the other", type: "process", edge: "type-of" }
            ] }
        ]
      }
    },

    /* ===== 2. OSMOSIS AND TONICITY ===== */
    {
      id: "osmosis-tonicity",
      title: "Osmosis and Tonicity",
      summary: "Two words that sound interchangeable, describe different things, and are the usual source of confusion in this unit.",
      root: {
        id: "np-osmosis", label: "Osmosis and Tonicity", type: "process",
        note: "One word describes a solution sitting in a bottle. The other describes what happens to a cell you drop into it. Keeping them apart is most of the work here.",
        children: [

          { id: "np-osmolarity", label: "Osmolarity describes the solution", type: "process", edge: "contains",
            children: [
              { id: "np-osmolarity-def", label: "The number of osmoles of solute per liter of solution", type: "process", edge: "causes",
                children: [
                  { id: "np-osmolarity-counts", label: "Every dissolved particle counts, whether or not it can cross a membrane", type: "process", edge: "causes",
                    note: "You can measure it without a cell anywhere in sight, which is the clue that it is a property of the solution alone." },
                  { id: "np-osmolarity-units", label: "It has units, usually milliosmoles per liter", type: "process", edge: "causes" }
                ] }
            ] },

          { id: "np-tonicity", label: "Tonicity describes what a solution does to a cell", type: "control", edge: "contains",
            children: [
              { id: "np-tonicity-def", label: "It depends only on solutes that cannot cross the membrane", type: "control", edge: "causes",
                note: "A solute that crosses freely ends up on both sides, so it cannot hold water anywhere. Only the solutes that stay put pull water.",
                children: [
                  { id: "np-tonicity-nounits", label: "It has no units, and it is always stated relative to a particular cell", type: "process", edge: "causes" }
                ] },
              { id: "np-hypo", label: "Hypotonic: water moves in and the cell swells", type: "process", edge: "type-of" },
              { id: "np-hyper", label: "Hypertonic: water moves out and the cell shrinks", type: "process", edge: "type-of" },
              { id: "np-iso", label: "Isotonic: cell volume does not change", type: "process", edge: "type-of" }
            ] },

          { id: "np-not-same", label: "The two are not the same thing", type: "control", edge: "contains",
            children: [
              { id: "np-urea-example", label: "A urea solution can be hyperosmotic and hypotonic at the same time", type: "process", edge: "causes",
                note: "Measured in the bottle it is more concentrated than the cell. Dropped onto a cell, it still makes the cell swell.",
                children: [
                  { id: "np-urea-why", label: "Urea crosses the membrane, so it cannot hold water outside the cell", type: "process", edge: "causes" },
                  { id: "np-cl-fluids", label: "This is why the choice of intravenous fluid matters", type: "clinical", edge: "seen-as",
                    note: "Two fluids with the same measured concentration can do opposite things to cell volume, depending on whether their solutes stay in the extracellular space." }
                ] }
            ] },

          { id: "np-water-link", label: "Where this shows up downstream", type: "control", edge: "contains",
            children: [
              { id: "np-ref-renal-water", label: "See water handling and urine concentration, in Renal Transport", type: "reference", edge: "see", ref: "rn-water" }
            ] }
        ]
      }
    },

    /* ===== 3. RESTING MEMBRANE POTENTIAL ===== */
    {
      id: "resting-potential",
      title: "The Resting Membrane Potential",
      summary: "Where the resting voltage comes from, and why it sits where it does rather than somewhere else.",
      root: {
        id: "np-rmp", label: "The Resting Membrane Potential", type: "process",
        note: "Two ingredients produce it: gradients, and permeability. Change either one and the voltage moves. Every later part of this unit is an application of that sentence.",
        children: [

          { id: "np-rmp-what", label: "What the resting potential is", type: "process", edge: "contains",
            children: [
              { id: "np-rmp-value", label: "A typical neuron sits near -70 millivolts, inside negative relative to outside", type: "process", edge: "causes",
                children: [
                  { id: "np-rmp-thin", label: "The separated charge sits in a thin layer against the membrane", type: "process", edge: "causes" },
                  { id: "np-rmp-few-ions", label: "Very few ions have to move to produce it", type: "process", edge: "causes",
                    note: "The bulk solution on either side stays essentially neutral. This is worth holding onto, because it explains why firing repeatedly does not run the gradients down." }
                ] }
            ] },

          { id: "np-rmp-ingredients", label: "The two things that set it", type: "control", edge: "contains",
            children: [
              { id: "np-gradients", label: "Concentration gradients, maintained by the sodium-potassium pump", type: "control", edge: "requires",
                children: [
                  { id: "np-k-in", label: "Potassium is concentrated inside the cell", type: "process", edge: "causes" },
                  { id: "np-na-out", label: "Sodium is concentrated outside the cell", type: "process", edge: "causes" },
                  { id: "np-ref-pump", label: "See the sodium-potassium ATPase in Membrane Transport", type: "reference", edge: "see", ref: "np-nakatpase" }
                ] },
              { id: "np-permeability", label: "Membrane permeability, which at rest is far higher for potassium", type: "control", edge: "requires",
                children: [
                  { id: "np-leak", label: "Potassium leak channels are open at rest, and few sodium channels are", type: "structure", edge: "causes",
                    note: "This single asymmetry is what pins the resting potential near potassium rather than somewhere in between." }
                ] }
            ] },

          { id: "np-nernst", label: "Equilibrium potentials and the Nernst equation", type: "process", edge: "contains",
            children: [
              { id: "np-nernst-def", label: "The Nernst equation gives the voltage at which one ion would be at {{equilibrium}}", type: "process", edge: "causes",
                note: "At that voltage the electrical pull and the concentration push exactly cancel, so there is no net movement of that ion.",
                children: [
                  { id: "np-nernst-values", label: "At 37 C (98.6 F), potassium sits near -90 mV and sodium near +60 mV", type: "process", edge: "causes",
                    note: "Reported values vary a little between sources because they depend on the concentrations assumed, so treat them as approximate." }
                ] },
              { id: "np-why-negative", label: "The resting potential sits close to the potassium equilibrium potential", type: "process", edge: "causes",
                children: [
                  { id: "np-why-not-equal", label: "It is not exactly there, because the membrane is slightly permeable to sodium too", type: "process", edge: "causes",
                    note: "That small sodium leak pulls the resting potential a little away from -90 mV toward zero, which is why a neuron rests near -70 mV rather than at the potassium equilibrium potential." }
                ] }
            ] },

          { id: "np-ghk", label: "The Goldman-Hodgkin-Katz equation", type: "process", edge: "contains",
            children: [
              { id: "np-ghk-def", label: "Accounts for several ions at once, each weighted by how permeable the membrane is to it", type: "process", edge: "causes",
                children: [
                  { id: "np-ghk-point", label: "Raise the permeability to an ion and the membrane potential moves toward that ion's equilibrium potential", type: "process", edge: "causes",
                    note: "This one sentence predicts the entire action potential before you have learned any of it. Open sodium channels and the voltage heads for +60 mV. Open potassium channels and it heads back toward -90 mV." }
                ] }
            ] },

          { id: "np-pump-contribution", label: "How much the pump contributes directly", type: "control", edge: "contains",
            children: [
              { id: "np-electrogenic", label: "The pump is {{electrogenic}}, moving three positive charges out for every two in", type: "process", edge: "causes",
                children: [
                  { id: "np-small-direct", label: "Its direct contribution is only a few millivolts", type: "process", edge: "causes",
                    note: "Almost all of the resting potential comes from the gradients the pump maintains rather than from the charge it moves on any given cycle. Both statements are true at once, and mixing them up is a common error." }
                ] }
            ] }
        ]
      }
    },

    /* ===== 4. GRADED POTENTIALS ===== */
    {
      id: "graded-potentials",
      title: "Graded Potentials",
      summary: "The small local signals that decide whether an action potential happens at all.",
      root: {
        id: "np-graded", label: "Graded Potentials", type: "process",
        note: "These are the input side of a neuron. They are small, they fade, and they add up, and the last of those three is what makes a neuron able to make a decision.",
        children: [

          { id: "np-graded-props", label: "What makes them graded", type: "process", edge: "contains",
            children: [
              { id: "np-graded-size", label: "Amplitude varies with the strength of the stimulus", type: "process", edge: "causes",
                note: "A bigger stimulus makes a bigger signal. That is the whole meaning of the word graded." },
              { id: "np-graded-decay", label: "They lose strength with distance from where they started", type: "process", edge: "causes",
                children: [
                  { id: "np-decay-why", label: "Current leaks back out through the membrane as it spreads", type: "process", edge: "causes",
                    note: "Nothing regenerates the signal along the way, so it simply runs out. This is exactly what an action potential does not do." }
                ] },
              { id: "np-graded-where", label: "They occur in the dendrites and the cell body", type: "structure", edge: "causes" }
            ] },

          { id: "np-graded-direction", label: "Two directions they can go", type: "process", edge: "contains",
            children: [
              { id: "np-epsp", label: "Depolarizing, moving the membrane toward threshold", type: "process", edge: "type-of",
                note: "Usually produced by sodium or calcium entering the cell." },
              { id: "np-ipsp", label: "Hyperpolarizing, moving the membrane away from threshold", type: "process", edge: "type-of",
                note: "Usually produced by chloride entering or potassium leaving." }
            ] },

          { id: "np-summation", label: "Summation", type: "control", edge: "contains",
            note: "A single graded potential almost never reaches threshold on its own. Adding them is how a neuron weighs what it is being told.",
            children: [
              { id: "np-temporal", label: "Temporal summation: signals arriving close together in time add up", type: "process", edge: "type-of",
                note: "The second arrives before the first has faded." },
              { id: "np-spatial", label: "Spatial summation: signals arriving at the same moment from different places add up", type: "process", edge: "type-of" },
              { id: "np-mixed-sum", label: "Excitatory and inhibitory inputs are added together, not counted separately", type: "process", edge: "causes",
                note: "An inhibitory input does not veto. It subtracts." }
            ] },

          { id: "np-trigger", label: "The trigger zone decides", type: "control", edge: "contains",
            children: [
              { id: "np-trigger-where", label: "The axon hillock and initial segment are packed with voltage-gated sodium channels", type: "structure", edge: "causes",
                note: "Nowhere else on the dendrites or cell body has enough of them to start an action potential, which is why the decision happens here and only here." },
              { id: "np-trigger-rule", label: "If the summed signal arriving there reaches {{threshold}}, an action potential fires", type: "control", edge: "causes",
                children: [
                  { id: "np-trigger-all", label: "If it does not, nothing happens, however large the original stimulus was", type: "process", edge: "causes" }
                ] }
            ] }
        ]
      }
    },

    /* ===== 5. THE ACTION POTENTIAL ===== */
    {
      id: "action-potential",
      title: "The Action Potential",
      summary: "What the channels do, in what order, and why the sequence can only run one way.",
      root: {
        id: "np-ap", label: "The Action Potential", type: "process",
        note: "Almost all of this follows from one structural fact: the sodium channel has two gates that move at different speeds. Hold onto that and the phases assemble themselves.",
        children: [

          { id: "np-ap-props", label: "How it differs from a graded potential", type: "process", edge: "contains",
            children: [
              { id: "np-ap-allornone", label: "All or none: it fires at full size or not at all", type: "process", edge: "causes" },
              { id: "np-ap-nodecay", label: "It does not fade, because it is regenerated as it travels", type: "process", edge: "causes" },
              { id: "np-ap-coding", label: "Stimulus strength is coded by how often it fires, not by how big it is", type: "process", edge: "causes",
                note: "A stronger stimulus does not make a taller action potential. It makes more of them per second. This is the answer to how an all-or-none signal can carry graded information." }
            ] },

          { id: "np-ap-gates", label: "The channels that do the work", type: "structure", edge: "contains",
            children: [
              { id: "np-na-gates", label: "The voltage-gated sodium channel has two gates", type: "structure", edge: "contains",
                children: [
                  { id: "np-activation", label: "The activation gate is fast and opens at threshold", type: "structure", edge: "causes" },
                  { id: "np-inactivation", label: "The inactivation gate is slower and closes shortly afterward", type: "structure", edge: "causes",
                    note: "Both gates respond to the same depolarization. They just move at different speeds, which is what makes the channel open briefly and then shut itself." }
                ] },
              { id: "np-k-gate", label: "The voltage-gated potassium channel has one slow gate", type: "structure", edge: "contains",
                note: "It opens late and closes late, and both of those delays matter." }
            ] },

          { id: "np-ap-phases", label: "The phases in order", type: "process", edge: "contains",
            children: [
              { id: "np-depol", label: "Depolarization: sodium rushes in and the membrane shoots toward +30 mV", type: "process", edge: "type-of",
                children: [
                  { id: "np-ref-ap-loop", label: "See the positive feedback cycle that drives this phase", type: "reference", edge: "see", ref: "loop:ap-loop" }
                ] },
              { id: "np-repol", label: "Repolarization: sodium inactivation gates close and potassium leaves", type: "process", edge: "type-of",
                note: "Two things happen at once here, and both push the same way. Sodium entry stops, and potassium exit speeds up." },
              { id: "np-hyperpol", label: "After-hyperpolarization: the membrane briefly dips below its resting value", type: "process", edge: "type-of",
                children: [
                  { id: "np-hyperpol-why", label: "The slow potassium gates are still open after the membrane has returned to rest", type: "process", edge: "causes" }
                ] },
              { id: "np-reset", label: "Reset: the gates return to their starting positions", type: "process", edge: "type-of",
                note: "The pump is not what ends the action potential. It restores the gradients quietly in the background over a much longer timescale." }
            ] },

          { id: "np-refractory", label: "Refractory periods", type: "control", edge: "contains",
            children: [
              { id: "np-absolute", label: "Absolute: no stimulus of any size can trigger another action potential", type: "control", edge: "type-of",
                children: [
                  { id: "np-absolute-why", label: "The sodium inactivation gates are shut and cannot reopen until the membrane repolarizes", type: "process", edge: "causes" }
                ] },
              { id: "np-relative", label: "Relative: a stronger than usual stimulus can trigger one", type: "control", edge: "type-of",
                children: [
                  { id: "np-relative-why", label: "Some sodium gates have reset, but potassium is still leaving and working against you", type: "process", edge: "causes" }
                ] },
              { id: "np-refractory-purpose", label: "What the {{refractory period}} accomplishes", type: "control", edge: "contains",
                children: [
                  { id: "np-one-way", label: "It keeps the action potential travelling in one direction", type: "process", edge: "causes",
                    note: "The membrane behind the signal cannot fire again yet, so the only direction left is forward." },
                  { id: "np-max-rate", label: "It sets an upper limit on how fast a neuron can fire", type: "process", edge: "causes" }
                ] }
            ] }
        ]
      }
    },

    /* ===== 6. CONDUCTION ===== */
    {
      id: "axon-conduction",
      title: "Conduction Along the Axon",
      summary: "How the signal moves down the axon, what makes it fast, and what happens when the insulation fails.",
      root: {
        id: "np-conduction", label: "Conduction Along the Axon", type: "process",
        note: "Nothing physically travels down the axon. Each patch of membrane sets off the patch in front of it, and what moves is the event, not a substance.",
        children: [

          { id: "np-how-travels", label: "How it moves", type: "process", edge: "contains",
            children: [
              { id: "np-local-current", label: "Current from the active region depolarizes the membrane just ahead of it", type: "process", edge: "causes",
                children: [
                  { id: "np-regenerate", label: "That region reaches threshold and fires its own action potential", type: "process", edge: "causes" }
                ] },
              { id: "np-no-backward", label: "It cannot travel backward, because the membrane behind it is refractory", type: "process", edge: "causes",
                children: [
                  { id: "np-ref-refractory", label: "See refractory periods, in The Action Potential", type: "reference", edge: "see", ref: "np-refractory-purpose" }
                ] }
            ] },

          { id: "np-speed", label: "What sets the speed", type: "control", edge: "contains",
            children: [
              { id: "np-diameter", label: "Axon diameter: a wider axon offers less internal resistance and conducts faster", type: "control", edge: "causes",
                note: "Same reason a wide pipe carries water more easily than a narrow one." },
              { id: "np-myelin", label: "{{Myelin}}, the insulating wrap around the axon", type: "structure", edge: "causes",
                children: [
                  { id: "np-schwann", label: "Schwann cells myelinate axons in the peripheral nervous system", type: "structure", edge: "type-of" },
                  { id: "np-oligo", label: "Oligodendrocytes myelinate axons in the central nervous system", type: "structure", edge: "type-of" },
                  { id: "np-nodes", label: "The gaps between wraps, the nodes of Ranvier, are dense with voltage-gated sodium channels", type: "structure", edge: "contains",
                    note: "Myelin stops current leaking out between the nodes, and the channels are concentrated where the signal needs to be rebuilt." }
                ] }
            ] },

          { id: "np-saltatory", label: "Saltatory conduction", type: "process", edge: "contains",
            children: [
              { id: "np-jumps", label: "The action potential is regenerated only at the nodes, so it appears to jump", type: "process", edge: "causes",
                children: [
                  { id: "np-faster", label: "Much faster than regenerating at every point, and it costs less energy", type: "process", edge: "causes",
                    note: "Fewer patches of membrane fire, so fewer ions cross, so the pump has less to undo afterward." },
                  { id: "np-cl-demyelination", label: "Losing myelin slows conduction, and losing enough of it blocks the signal", type: "clinical", edge: "seen-as",
                    note: "The axon itself may be intact. Without insulation the current leaks away before it reaches the next node, so it never rebuilds. This is the mechanism behind the deficits in demyelinating disease." }
                ] }
            ] }
        ]
      }
    },

    /* ===== 7. THE SYNAPSE ===== */
    {
      id: "synapse",
      title: "The Synapse",
      summary: "How the signal crosses from one cell to the next, and every place a drug or a disease can interrupt it.",
      root: {
        id: "np-synapse", label: "The Synapse", type: "structure",
        note: "An electrical signal becomes a chemical one and then an electrical one again. Every step in that handover is a place something can go wrong, which is why so much pharmacology lives here.",
        children: [

          { id: "np-electrical", label: "Electrical synapses", type: "structure", edge: "type-of",
            children: [
              { id: "np-gap-junctions", label: "Gap junctions connect the cytoplasm of the two cells directly", type: "structure", edge: "causes",
                children: [
                  { id: "np-electrical-props", label: "Very fast, often bidirectional, and common in cardiac and smooth muscle", type: "process", edge: "causes",
                    note: "Useful where a sheet of cells has to contract as one unit rather than pass along a decision." }
                ] }
            ] },

          { id: "np-chemical", label: "Chemical synapses", type: "structure", edge: "type-of",
            children: [
              { id: "np-chem-sequence", label: "The sequence from arrival to response", type: "process", edge: "contains",
                children: [
                  { id: "np-ca-entry", label: "The action potential opens voltage-gated calcium channels in the terminal", type: "process", edge: "causes" },
                  { id: "np-vesicle-fusion", label: "Calcium entry makes vesicles fuse and release neurotransmitter", type: "process", edge: "causes",
                    note: "Calcium is the link between the electrical signal and the chemical one. The same trick appears wherever a cell secretes on demand." },
                  { id: "np-receptor-binding", label: "Neurotransmitter crosses the cleft and binds receptors on the next cell", type: "process", edge: "causes" }
                ] },
              { id: "np-receptor-types", label: "Two kinds of receptor", type: "structure", edge: "contains",
                children: [
                  { id: "np-ionotropic", label: "{{Ionotropic}} receptors are ion channels themselves, so the response is fast and brief", type: "structure", edge: "type-of" },
                  { id: "np-metabotropic", label: "{{Metabotropic}} receptors work through G proteins, so the response is slower and lasts longer", type: "structure", edge: "type-of" },
                  { id: "np-ref-signaling", label: "See receptor location and signaling pathways, in Endocrine Physiology", type: "reference", edge: "see", ref: "receptor-signaling" }
                ] },
              { id: "np-removal", label: "How the signal is ended", type: "process", edge: "contains",
                note: "A transmitter that stayed in the cleft would keep firing the next cell, so removal is as important as release.",
                children: [
                  { id: "np-reuptake", label: "Reuptake back into the terminal or into nearby glia", type: "process", edge: "type-of" },
                  { id: "np-enzyme", label: "Enzymatic breakdown in the cleft, as acetylcholinesterase does", type: "process", edge: "type-of" },
                  { id: "np-diffusion-away", label: "Simple diffusion out of the cleft", type: "process", edge: "type-of" }
                ] }
            ] },

          { id: "np-transmitters", label: "The main neurotransmitters", type: "structure", edge: "contains",
            children: [
              { id: "np-ach", label: "Acetylcholine, at the neuromuscular junction and throughout the autonomic nervous system", type: "structure", edge: "type-of",
                children: [
                  { id: "np-cl-mg", label: "Myasthenia gravis: weakness that worsens with use and improves with rest", type: "clinical", edge: "seen-as",
                    note: "In the most common form, antibodies target the acetylcholine receptor at the neuromuscular junction, so fewer receptors are available and repeated use outpaces what is left." }
                ] },
              { id: "np-catecholamine-nt", label: "Norepinephrine and dopamine", type: "structure", edge: "type-of",
                children: [
                  { id: "np-ref-catecholamines", label: "See catecholamines from the adrenal medulla, in Endocrine Physiology", type: "reference", edge: "see", ref: "catecholamines" }
                ] },
              { id: "np-glutamate", label: "Glutamate, the main excitatory transmitter in the central nervous system", type: "structure", edge: "type-of" },
              { id: "np-gaba", label: "GABA and glycine, the main inhibitory transmitters", type: "structure", edge: "type-of",
                note: "GABA dominates in the brain and glycine in the spinal cord." }
            ] },

          { id: "np-integration", label: "Putting it together at the receiving cell", type: "control", edge: "contains",
            children: [
              { id: "np-sum-again", label: "The cell adds every excitatory and inhibitory input arriving at once", type: "control", edge: "causes",
                children: [
                  { id: "np-ref-summation", label: "See summation, in Graded Potentials", type: "reference", edge: "see", ref: "np-summation" }
                ] },
              { id: "np-convergence", label: "Convergence: many neurons feed into one", type: "structure", edge: "type-of" },
              { id: "np-divergence", label: "Divergence: one neuron feeds many", type: "structure", edge: "type-of" }
            ] }
        ]
      }
    }
  ],

  loops: [
    {
      id: "ap-loop",
      title: "The Depolarization Cycle",
      summary: "The rare case of positive feedback in this unit, and the gate that stops it running away.",
      feedback: "positive",
      stimulus: "A graded potential reaching threshold at the trigger zone.",
      viewBox: "0 0 1120 480",
      nodes: [
        { id: "ap-thresh", label: "Membrane reaches threshold",       x: 130, y: 240, w: 210 },
        { id: "ap-open",   label: "Voltage-gated sodium gates open",  x: 420, y: 70,  w: 280 },
        { id: "ap-influx", label: "Sodium enters the cell",           x: 700, y: 240, w: 230 },
        { id: "ap-depol",  label: "Membrane depolarizes further",     x: 420, y: 400, w: 280 },
        { id: "ap-inact",  label: "Inactivation gates close",         x: 960, y: 400, w: 230 }
      ],
      edges: [
        { from: "ap-thresh", to: "ap-open",   sign: "+", label: "triggers" },
        { from: "ap-open",   to: "ap-influx", sign: "+", label: "lets in" },
        { from: "ap-influx", to: "ap-depol",  sign: "+", label: "raises" },
        { from: "ap-depol",  to: "ap-open",   sign: "+", label: "opens more" },
        { from: "ap-depol",  to: "ap-inact",  sign: "+", label: "also closes" },
        { from: "ap-inact",  to: "ap-open",   sign: "-", label: "ends the cycle", cp: [1250, 60] }
      ],
      path: "A graded potential brings the membrane to threshold, which opens voltage-gated sodium gates. Sodium enters, the membrane depolarizes further, and that further depolarization opens still more sodium gates. That is the positive feedback: each step makes the next one larger, which is why the rising phase is so fast and so steep. The same depolarization also closes the slower inactivation gates on those channels, and once they shut the cycle ends and repolarization begins. Positive feedback always needs something to stop it, and here the stopping mechanism is built into the same channel that drives it."
    },

    {
      id: "reflex-loop",
      title: "The Homeostatic Reflex Pathway",
      summary: "The general shape every control pathway in physiology follows, with the nervous system supplying the middle steps.",
      feedback: "negative",
      stimulus: "Any change that moves a regulated variable away from its set point.",
      viewBox: "0 0 1150 440",
      nodes: [
        { id: "rf-stim",     label: "Stimulus moves the variable",        x: 150, y: 60,  w: 250 },
        { id: "rf-sensor",   label: "Sensor detects the change",          x: 450, y: 60,  w: 230 },
        { id: "rf-afferent", label: "Afferent pathway",                   x: 740, y: 60,  w: 210 },
        { id: "rf-center",   label: "Integrating center",                 x: 740, y: 220, w: 210 },
        { id: "rf-efferent", label: "Efferent pathway",                   x: 450, y: 220, w: 210 },
        { id: "rf-target",   label: "Target carries out the response",    x: 150, y: 220, w: 250 },
        { id: "rf-back",     label: "Variable returns toward its set point", x: 450, y: 370, w: 290 }
      ],
      edges: [
        { from: "rf-stim",     to: "rf-sensor",   sign: "+", label: "detected by" },
        { from: "rf-sensor",   to: "rf-afferent", sign: "+", label: "signals along" },
        { from: "rf-afferent", to: "rf-center",   sign: "+", label: "reaches" },
        { from: "rf-center",   to: "rf-efferent", sign: "+", label: "sends out" },
        { from: "rf-efferent", to: "rf-target",   sign: "+", label: "reaches" },
        { from: "rf-target",   to: "rf-back",     sign: "+", label: "produces" },
        { from: "rf-back",     to: "rf-sensor",   sign: "-", label: "removes the signal", cp: [1250, 215] }
      ],
      path: "Something moves a regulated variable away from its set point. A sensor detects the change and signals along an afferent pathway to an integrating center, which compares the input against the set point and sends instructions out along an efferent pathway. The target carries out a response, the variable moves back toward the set point, and as it does the original signal at the sensor weakens. That weakening is the negative feedback, and it is what stops the response before it overshoots. Every reflex in the course fits this shape, so identifying the six parts is usually more useful than memorizing the pathway."
    }
  ],

  glossary: {
    "symport": "A carrier that moves two solutes across the membrane in the same direction. Sodium-glucose cotransport is the standard example.",
    "antiport": "A carrier that moves two solutes across the membrane in opposite directions. The sodium-calcium exchanger is the standard example.",
    "equilibrium": "For one ion, the membrane potential at which the electrical pull and the concentration push exactly cancel, so there is no net movement of that ion.",
    "electrogenic": "Describes a transporter that moves unequal amounts of charge in each direction, so it makes a small direct contribution to the membrane potential.",
    "threshold": "The membrane potential at which enough voltage-gated sodium channels open to start the self-reinforcing depolarization of an action potential.",
    "refractory period": "The interval after an action potential during which another one cannot be triggered at all, or can only be triggered by a stronger than usual stimulus.",
    "myelin": "The insulating wrap of membrane around an axon. It stops current leaking out between the nodes of Ranvier, which is what makes saltatory conduction possible.",
    "ionotropic": "A receptor that is itself an ion channel, so binding a transmitter opens it directly. The response is fast and short-lived.",
    "metabotropic": "A receptor that acts through a G protein and a second messenger rather than being a channel itself. The response is slower and lasts longer.",
    "depolarization": "A shift in membrane potential toward zero and beyond, making the inside less negative than it was at rest.",
    "hyperpolarization": "A shift in membrane potential away from zero, making the inside more negative than it was at rest.",
    "saltatory conduction": "Conduction along a myelinated axon in which the action potential is regenerated only at the nodes of Ranvier, so it appears to jump from node to node.",
    "trigger zone": "The axon hillock and initial segment, where voltage-gated sodium channels are concentrated and where the decision to fire an action potential is made.",
    "set point": "The value a control system defends. Deviation in either direction triggers a correction back toward it."
  }
};

if (typeof window !== "undefined"){
  window.MMS = window.MMS || {};
  window.MMS.subjects = window.MMS.subjects || {};
  window.MMS.subjects[SUBJECT.id] = SUBJECT;
  if (typeof window.MMS.onSubjectLoaded === "function") window.MMS.onSubjectLoaded(SUBJECT.id);
}
if (typeof module !== "undefined" && module.exports){ module.exports = SUBJECT; }

})();
