/* ============================================================
   Endocrine Physiology, map data
   Mind-Mapped Medical Sciences
   Dr. Sharilyn Rennie

   Authored to node-edge-spec.md v1.1.

   Node IDs are globally unique across every subject area and are
   permanent, because reference chips in other subject files point
   at them. Search build/ID-INDEX.md before adding a branch.

   {{term}} inside a note is rendered as a glossary button.
   Run `node tools/build.js` after editing this file.
   ============================================================ */

(function(){
"use strict";

var SUBJECT = {

  id: "endocrine",
  title: "Endocrine Physiology",
  version: "1.1",
  date: "September 19, 2026",
  author: "Dr. Sharilyn Rennie",

  /* ---------------------------------------------------------
     TREES
     --------------------------------------------------------- */
  trees: [

    /* ===== 1. HORMONE CLASSES AND SIGNALING ===== */
    {
      id: "hormone-classes",
      title: "Hormone Classes and Signaling",
      summary: "What hormones are made of, how they travel, and how they get a message into a target cell.",
      topic: "Endocrine",
      book: { "silverthorn-9": [8], "silverthorn-8": [7] },
      root: {
        id: "hormone-signaling", label: "Hormone Classes and Signaling", type: "process",
        note: "Almost everything else in endocrine physiology follows from two questions: is this hormone water soluble or lipid soluble, and where is its receptor.",
        children: [

          /* ---- STRUCTURE ---- */
          { id: "chem-classes", label: "Structure", type: "structure", edge: "contains",
            note: "What hormones are made of. Three chemical families, and the family predicts storage, transport, receptor location, and speed.",
            children: [

              { id: "peptide-hormones", label: "Peptide hormones", type: "structure", edge: "type-of",
                note: "Chains of amino acids, and much the largest group.",
                children: [
                  { id: "peptide-solubility", label: "Water soluble, stored ready", type: "process", edge: "causes",
                    note: "They dissolve in plasma, so the cell can make them ahead of time and hold them in vesicles. That is why peptide responses are fast." },
                  { id: "peptide-receptor", label: "Surface receptors", type: "process", edge: "causes",
                    note: "A water soluble hormone cannot cross the lipid membrane, so it hands the message off at the surface and a second messenger carries it on." },
                  { id: "peptide-kinetics", label: "Fast on, short half life", type: "process", edge: "causes",
                    note: "Minutes." },
                  { id: "peptide-examples", label: "Insulin, glucagon, PTH, ADH, GH, ACTH, TSH", type: "structure", edge: "type-of",
                    note: "Also oxytocin, FSH, LH, prolactin, calcitonin, and ANP.",
                    children: [
                      { id: "cl-insulin-injected", label: "Insulin has to be injected", type: "clinical", edge: "seen-as",
                        note: "Digestive enzymes break peptides into amino acids, so an oral tablet would be digested like any other protein before it reached the blood." }
                    ] }
                ] },

              { id: "amine-hormones", label: "Amine hormones", type: "structure", edge: "type-of",
                note: "Built from a single amino acid. Worth watching, because the members do not all behave the same way.",
                children: [
                  { id: "amine-tyrosine", label: "Made from tyrosine", type: "process", edge: "requires",
                    note: "Thyroid hormones and catecholamines both. Melatonin comes from tryptophan instead." },
                  { id: "amine-catecholamine-behavior", label: "Catecholamines act like peptides", type: "process", edge: "causes",
                    note: "Water soluble, stored in vesicles, surface receptors, fast and brief." },
                  { id: "amine-thyroid-behavior", label: "Thyroid hormones act like steroids", type: "process", edge: "causes",
                    note: "Lipid soluble, carried on plasma proteins, nuclear receptors, slow and long lasting. Same chemical family as catecholamines, opposite behavior." }
                ] },

              { id: "steroid-hormones", label: "Steroid hormones", type: "structure", edge: "type-of",
                note: "All built on the same four-ring cholesterol backbone.",
                children: [
                  { id: "steroid-source", label: "Made from cholesterol", type: "process", edge: "requires" },
                  { id: "steroid-ondemand", label: "Made on demand, not stored", type: "process", edge: "causes",
                    note: "A lipid soluble molecule would diffuse straight out of a storage vesicle, so output is controlled at the synthesis step instead." },
                  { id: "steroid-receptor", label: "Nuclear receptors, change transcription", type: "process", edge: "causes",
                    note: "The hormone crosses the membrane, binds an intracellular receptor, and the complex binds DNA. New protein has to be made before anything happens." },
                  { id: "steroid-kinetics", label: "Slow on, long half life", type: "process", edge: "causes",
                    note: "Hours to days.",
                    children: [
                      { id: "cl-steroid-onset", label: "Steroids do not fix an acute attack alone", type: "clinical", edge: "seen-as",
                        note: "In an acute asthma attack a bronchodilator opens the airway in minutes while the steroid works on inflammation over hours. Both are given, and they are not interchangeable." }
                    ] },
                  { id: "steroid-examples", label: "Cortisol, aldosterone, testosterone, estrogen, progesterone", type: "structure", edge: "type-of" }
                ] }
            ] },

          /* ---- PROCESS ---- */
          { id: "hormone-process", label: "Process", type: "process", edge: "contains",
            note: "What happens between the gland and the target: how the hormone travels, and how it delivers its message.",
            children: [

              { id: "hormone-transport", label: "Transport in the blood", type: "process", edge: "contains",
                note: "A problem only for the lipid soluble hormones, because plasma is water.",
                children: [
                  { id: "transport-free", label: "Water soluble travel free", type: "process", edge: "causes",
                    children: [
                      { id: "transport-clearance", label: "Cleared quickly", type: "process", edge: "causes",
                        note: "By kidney and liver." }
                    ] },
                  { id: "transport-bound", label: "Lipid soluble travel bound to carriers", type: "process", edge: "causes",
                    children: [
                      { id: "transport-tbg", label: "TBG carries thyroid hormone", type: "structure", edge: "type-of" },
                      { id: "transport-cbg", label: "CBG carries cortisol", type: "structure", edge: "type-of" },
                      { id: "transport-shbg", label: "SHBG carries sex steroids", type: "structure", edge: "type-of" },
                      { id: "transport-albumin", label: "Albumin carries many, non-specifically", type: "structure", edge: "type-of" }
                    ] },
                  { id: "transport-free-fraction", label: "Only the free fraction is active", type: "control", edge: "causes",
                    note: "Bound hormone cannot enter a cell, but it is protected from clearance, which is why lipid soluble hormones last so much longer.",
                    children: [
                      { id: "cl-tbg-pregnancy", label: "Pregnancy raises total T4, not free T4", type: "clinical", edge: "seen-as",
                        note: "Estrogen raises {{thyroxine binding globulin}}, so more hormone is carried and the total rises. The free fraction, which is what tissues see, stays normal. This is why free T4 is the more useful measurement." }
                    ] }
                ] },

              { id: "receptor-signaling", label: "Receptors and signaling", type: "process", edge: "contains",
                note: "Where the hormone stops and the cell's own machinery takes over.",
                children: [
                  { id: "gpcr-camp", label: "G protein, cAMP", type: "process", edge: "type-of",
                    children: [
                      { id: "gs-pathway", label: "Gs raises cAMP, activates PKA", type: "process", edge: "causes",
                        note: "Through adenylyl cyclase. Gi lowers cAMP instead." },
                      { id: "camp-users", label: "Glucagon, ACTH, TSH, PTH, beta receptors", type: "structure", edge: "acts-on" }
                    ] },
                  { id: "gpcr-ip3", label: "G protein, IP3 and calcium", type: "process", edge: "type-of",
                    children: [
                      { id: "gq-pathway", label: "Gq makes IP3 and DAG, releases calcium", type: "process", edge: "causes",
                        note: "Through phospholipase C." },
                      { id: "ip3-users", label: "ADH at V1, TRH, GnRH, oxytocin, angiotensin II", type: "structure", edge: "acts-on" }
                    ] },
                  { id: "rtk", label: "Receptor tyrosine kinase", type: "process", edge: "type-of",
                    children: [
                      { id: "rtk-mechanism", label: "Self-phosphorylates, signals through IRS and PI3K", type: "process", edge: "causes" },
                      { id: "rtk-users", label: "Insulin, IGF-1", type: "structure", edge: "acts-on" }
                    ] },
                  { id: "jak-stat", label: "JAK-STAT", type: "process", edge: "type-of",
                    children: [
                      { id: "jak-mechanism", label: "JAK phosphorylates STAT, STAT enters nucleus", type: "process", edge: "causes" },
                      { id: "jak-users", label: "Growth hormone, prolactin, leptin, erythropoietin", type: "structure", edge: "acts-on" }
                    ] },
                  { id: "nuclear-receptors", label: "Nuclear receptors", type: "process", edge: "type-of",
                    children: [
                      { id: "nuclear-mechanism", label: "Complex binds DNA, changes transcription", type: "process", edge: "causes" },
                      { id: "nuclear-users", label: "Steroids, thyroid hormone, calcitriol", type: "structure", edge: "acts-on" }
                    ] },
                  { id: "cgmp", label: "Guanylyl cyclase, cGMP", type: "process", edge: "type-of",
                    children: [
                      { id: "cgmp-users", label: "Atrial natriuretic peptide", type: "structure", edge: "acts-on" }
                    ] }
                ] }
            ] },

          /* ---- CONTROL ---- */
          { id: "hormone-control", label: "Control", type: "control", edge: "contains",
            note: "Why the same blood level of a hormone produces different effects in different people, and how hormones change each other's effects.",
            children: [

              { id: "receptor-number", label: "Number of receptors", type: "control", edge: "type-of",
                children: [
                  { id: "upregulation", label: "Up-regulation when hormone is low", type: "process", edge: "causes",
                    note: "The cell adds receptors." },
                  { id: "downregulation", label: "Down-regulation when hormone stays high", type: "process", edge: "causes",
                    note: "The cell removes receptors.",
                    children: [
                      { id: "cl-insulin-resistance", label: "A contributor to insulin resistance", type: "clinical", edge: "seen-as",
                        note: "Receptor down-regulation is one of several contributors, not the whole story. Post-receptor signaling defects and ectopic fat also matter, so do not present this as the single cause." }
                    ] }
                ] },

              { id: "receptor-affinity", label: "Receptor affinity", type: "control", edge: "type-of",
                note: "How tightly the receptor binds its hormone." },

              { id: "permissiveness", label: "Permissiveness", type: "control", edge: "type-of",
                note: "One hormone has to be present for another to work at all.",
                children: [
                  { id: "perm-thyroid", label: "Thyroid hormone for catecholamines", type: "process", edge: "causes",
                    note: "Thyroid hormone increases the number of beta adrenergic receptors. Without it, the same epinephrine does much less." }
                ] },

              { id: "synergism", label: "Synergism", type: "control", edge: "type-of",
                note: "Two hormones together do more than the sum of each alone.",
                children: [
                  { id: "syn-glucose", label: "Glucagon, cortisol, epinephrine on glucose", type: "process", edge: "causes" }
                ] },

              { id: "antagonism", label: "Antagonism", type: "control", edge: "type-of",
                note: "One hormone opposes another.",
                children: [
                  { id: "ant-insulin-glucagon", label: "Insulin against glucagon", type: "process", edge: "causes" }
                ] }
            ] }
        ]
      }
    },

    /* ===== 2. CONTROL OF HORMONE RELEASE ===== */
    {
      id: "hormone-release-control",
      title: "Control of Hormone Release",
      summary: "What turns hormone secretion on, what turns it off, and why the timing of release matters as much as the amount.",
      topic: "Endocrine",
      book: { "silverthorn-9": [6, 8], "silverthorn-8": [6, 7] },
      root: {
        id: "release-control", label: "Control of Hormone Release", type: "control",
        note: "Endocrine glands do not secrete at a steady rate. Release is triggered, then shut off, and often patterned across the day.",
        children: [

          { id: "release-stimuli", label: "The three kinds of stimulus", type: "control", edge: "type-of",
            children: [
              { id: "humoral-stimulus", label: "Humoral: a change in blood levels of an ion or nutrient", type: "control", edge: "type-of",
                note: "The gland is monitoring the blood directly. No nerve and no other hormone is involved.",
                children: [
                  { id: "humoral-calcium", label: "Falling blood calcium triggers PTH release", type: "process", edge: "causes" },
                  { id: "humoral-glucose", label: "Rising blood glucose triggers insulin release", type: "process", edge: "causes" }
                ] },
              { id: "neural-stimulus", label: "Neural: nerve fibers trigger release directly", type: "control", edge: "type-of",
                children: [
                  { id: "neural-medulla", label: "Sympathetic preganglionic fibers trigger the adrenal medulla", type: "process", edge: "causes",
                    note: "This is the fastest endocrine response in the body, because it bypasses the pituitary entirely.",
                    children: [
                      { id: "ref-synapse-endo", label: "See how that signal crosses the synapse, in Membranes and Action Potentials", type: "reference", edge: "see", ref: "np-chem-sequence" }
                    ] }
                ] },
              { id: "hormonal-stimulus", label: "Hormonal: one hormone triggers the release of another", type: "control", edge: "type-of",
                children: [
                  { id: "hormonal-hypothalamic", label: "A hypothalamic releasing hormone triggers a pituitary tropic hormone", type: "process", edge: "causes" },
                  { id: "hormonal-tropic", label: "A pituitary tropic hormone triggers a target gland hormone", type: "process", edge: "causes",
                    note: "Three glands in a chain is the standard endocrine axis pattern. It looks like extra steps, but each step is a place where the signal can be amplified and regulated." }
                ] }
            ] },

          { id: "feedback-control", label: "Feedback control", type: "control", edge: "contains",
            children: [
              { id: "negative-feedback", label: "Negative feedback, the dominant pattern", type: "control", edge: "type-of",
                note: "The output of the system shuts down the steps that produced it. This is what holds a variable near a set point.",
                children: [
                  { id: "neg-fb-example", label: "The output hormone inhibits both the hypothalamus and the pituitary", type: "process", edge: "causes" },
                  { id: "ref-hpa-1", label: "See the hypothalamic-pituitary-adrenal loop", type: "reference", edge: "see", ref: "loop:hpa-loop" }
                ] },
              { id: "positive-feedback", label: "Positive feedback, rare and always self-limiting", type: "control", edge: "type-of",
                note: "The output increases its own production. It has to end in an event that breaks the cycle, or it would run away.",
                children: [
                  { id: "pos-fb-oxytocin", label: "Oxytocin during labor increases contraction, which increases oxytocin", type: "process", edge: "causes",
                    note: "Delivery of the infant removes the stretch stimulus and ends the cycle." },
                  { id: "pos-fb-lh", label: "Rising estrogen before ovulation triggers the LH surge", type: "process", edge: "causes",
                    note: "Estrogen normally inhibits LH. Above a threshold, held for long enough, the same signal flips to stimulation. It is the clearest example in physiology of feedback sign depending on concentration and duration." }
                ] }
            ] },

          { id: "release-timing", label: "Rhythm and timing", type: "control", edge: "contains",
            children: [
              { id: "circadian", label: "Circadian rhythm, a daily pattern", type: "control", edge: "type-of",
                children: [
                  { id: "circ-cortisol", label: "Cortisol peaks in the early morning and troughs near midnight", type: "process", edge: "causes",
                    children: [
                      { id: "cl-cortisol-timing", label: "Cortisol testing has to be timed", type: "clinical", edge: "seen-as",
                        note: "A random cortisol level is hard to interpret, because the normal range depends on the hour. Morning levels, late night levels, and suppression testing each answer a different question." }
                    ] },
                  { id: "circ-gh", label: "Growth hormone pulses are largest during slow wave sleep", type: "process", edge: "causes" },
                  { id: "circ-melatonin", label: "Melatonin rises in darkness", type: "process", edge: "causes" }
                ] },
              { id: "pulsatile", label: "Pulsatile release, where the pattern carries the signal", type: "control", edge: "type-of",
                children: [
                  { id: "pulse-gnrh", label: "GnRH has to arrive in pulses; continuous GnRH shuts the axis down", type: "process", edge: "causes",
                    note: "The pituitary reads the gaps as well as the peaks. Constant exposure down-regulates the receptor and the response disappears.",
                    children: [
                      { id: "cl-gnrh-agonist", label: "Continuous GnRH agonists are used on purpose to suppress sex hormone production", type: "clinical", edge: "seen-as",
                        note: "This is a rare case where a drug works by deliberately exhausting a receptor rather than by blocking it." }
                    ] }
                ] }
            ] }
        ]
      }
    },

    /* ===== 3. HYPOTHALAMUS AND PITUITARY ===== */
    {
      id: "hypothalamus-pituitary",
      title: "Hypothalamus and Pituitary",
      summary: "Two different glands sharing one stalk, connected to the hypothalamus in two completely different ways.",
      topic: "Endocrine",
      book: { "silverthorn-9": [8], "silverthorn-8": [7] },
      root: {
        id: "hypothal-pit", label: "Hypothalamus and Pituitary", type: "structure",
        note: "The single most useful thing to hold onto here: the posterior pituitary is nervous tissue and the anterior pituitary is glandular tissue. Every other difference follows from that.",
        children: [

          { id: "posterior-pituitary", label: "Posterior pituitary (neurohypophysis)", type: "structure", edge: "contains",
            children: [
              { id: "post-pit-nature", label: "Not a gland: it is the axon terminals of hypothalamic neurons", type: "structure", edge: "type-of",
                children: [
                  { id: "post-pit-nuclei", label: "The cell bodies sit in the supraoptic and paraventricular nuclei", type: "structure", edge: "contains" },
                  { id: "post-pit-tract", label: "Hormones travel down the hypothalamo-hypophyseal tract and are stored in the terminals", type: "process", edge: "causes",
                    note: "The posterior pituitary makes nothing. It stores and releases what the hypothalamus made." }
                ] },
              { id: "adh", label: "Antidiuretic hormone (vasopressin)", type: "structure", edge: "produces",
                children: [
                  { id: "adh-stimulus", label: "Released when plasma osmolality rises or blood volume falls", type: "control", edge: "regulated-by",
                    note: "{{Osmolality}} is the more sensitive trigger day to day. A large fall in volume overrides it, because keeping pressure up matters more than keeping concentration right." },
                  { id: "adh-v2", label: "V2 receptors in the collecting duct insert aquaporin-2 channels, reabsorbing water", type: "process", edge: "acts-on",
                    note: "ADH conserves water, not salt. That is why too much ADH dilutes the blood rather than expanding it with normal sodium.",
                    children: [
                      { id: "cl-di", label: "Diabetes insipidus: large volumes of dilute urine and constant thirst", type: "clinical", edge: "seen-as",
                        note: "Central diabetes insipidus means not enough ADH is made. Nephrogenic means the kidney cannot respond to it. Same picture, opposite fix." },
                      { id: "cl-siadh", label: "SIADH: too much ADH, giving water retention and dilutional hyponatremia", type: "clinical", edge: "seen-as",
                        note: "Sodium looks low because the water compartment it sits in has been expanded, not because sodium was lost." },
                      { id: "ref-cd-water", label: "See how the collecting duct responds, in Renal Transport", type: "reference", edge: "see", ref: "rn-cd-water" }
                    ] },
                  { id: "adh-v1", label: "V1 receptors on vascular smooth muscle cause vasoconstriction at high concentrations", type: "process", edge: "acts-on",
                    note: "This is where the name vasopressin comes from, though the water-conserving effect dominates at normal levels." }
                ] },
              { id: "oxytocin", label: "Oxytocin", type: "structure", edge: "produces",
                children: [
                  { id: "oxy-uterus", label: "Contracts uterine smooth muscle during labor", type: "process", edge: "acts-on" },
                  { id: "oxy-milk", label: "Contracts myoepithelial cells around the alveoli for milk ejection", type: "process", edge: "acts-on",
                    note: "Oxytocin ejects milk that is already there. Prolactin is what produced it. Two hormones, two different jobs, often confused." }
                ] }
            ] },

          { id: "anterior-pituitary", label: "Anterior pituitary (adenohypophysis)", type: "structure", edge: "contains",
            children: [
              { id: "ant-pit-portal", label: "Connected to the hypothalamus by a portal blood supply, not by nerves", type: "structure", edge: "type-of",
                children: [
                  { id: "portal-system", label: "The hypophyseal portal system carries hypothalamic hormones straight to the anterior pituitary", type: "process", edge: "causes",
                    note: "A portal system is one capillary bed draining into a second capillary bed instead of back to the heart. It delivers a concentrated signal to a small target without diluting it in the whole circulation." }
                ] },
              { id: "hypothalamic-factors", label: "Hypothalamic releasing and inhibiting hormones", type: "control", edge: "contains",
                children: [
                  { id: "releasing-hormones", label: "TRH, CRH, GnRH, and GHRH stimulate release", type: "control", edge: "type-of" },
                  { id: "somatostatin", label: "Somatostatin inhibits growth hormone", type: "control", edge: "type-of" },
                  { id: "dopamine-pih", label: "Dopamine inhibits prolactin", type: "control", edge: "type-of" }
                ] },
              { id: "tsh", label: "Thyroid stimulating hormone", type: "structure", edge: "produces",
                children: [
                  { id: "ref-thyroid-1", label: "See the thyroid gland map", type: "reference", edge: "see", ref: "thyroid" }
                ] },
              { id: "acth", label: "Adrenocorticotropic hormone", type: "structure", edge: "produces",
                children: [
                  { id: "ref-adrenal-1", label: "See the adrenal gland map", type: "reference", edge: "see", ref: "zona-fasciculata" }
                ] },
              { id: "gh", label: "Growth hormone", type: "structure", edge: "produces",
                children: [
                  { id: "gh-direct", label: "Direct effects: fat breakdown, reduced glucose uptake, increased hepatic glucose output", type: "process", edge: "acts-on",
                    note: "These effects raise blood glucose, which is why growth hormone is described as diabetogenic." },
                  { id: "gh-indirect", label: "Indirect effects through liver IGF-1: bone growth, cartilage growth, protein synthesis", type: "process", edge: "acts-on",
                    note: "Most of the growth-promoting effect is IGF-1 doing the work. Growth hormone is largely a signal to the liver.",
                    children: [
                      { id: "cl-acromegaly", label: "Excess growth hormone: gigantism before the growth plates close, acromegaly after", type: "clinical", edge: "seen-as",
                        note: "Same hormone excess, two different pictures, decided entirely by whether the epiphyseal plates are still open." }
                    ] }
                ] },
              { id: "prolactin", label: "Prolactin", type: "structure", edge: "produces",
                children: [
                  { id: "prl-action", label: "Drives milk production in the mammary gland", type: "process", edge: "acts-on" },
                  { id: "prl-default", label: "Unique among pituitary hormones: the default state is inhibition", type: "control", edge: "regulated-by",
                    note: "Every other anterior pituitary hormone waits for a releasing signal. Prolactin is held down by dopamine and released when that brake comes off.",
                    children: [
                      { id: "cl-hyperprolactinemia", label: "Drugs that block dopamine raise prolactin", type: "clinical", edge: "seen-as",
                        note: "Cutting the stalk has the same effect, for the same reason: dopamine can no longer reach the gland. Prolactin is the one pituitary hormone that goes up, not down, when the stalk is interrupted." }
                    ] }
                ] },
              { id: "gonadotropins", label: "FSH and LH", type: "structure", edge: "produces",
                children: [
                  { id: "gonadotropin-targets", label: "Act on the ovary and the testis", type: "process", edge: "acts-on" },
                  { id: "ref-gonads-1", label: "See the gonads in other endocrine tissues", type: "reference", edge: "see", ref: "gonads" }
                ] }
            ] }
        ]
      }
    },

    /* ===== 4. THYROID GLAND ===== */
    {
      id: "thyroid-gland",
      title: "Thyroid Gland",
      summary: "How thyroid hormone is built, stored, released, activated, and what it does once it arrives.",
      topic: "Endocrine",
      book: { "silverthorn-9": [24], "silverthorn-8": [23] },
      root: {
        id: "thyroid", label: "Thyroid Gland", type: "structure",
        note: "Thyroid hormone does not run any one process. It sets the pace for almost all of them, which is why the symptoms of thyroid disease touch every system.",
        children: [

          { id: "thyroid-structure", label: "Structure", type: "structure", edge: "contains",
            children: [
              { id: "follicles", label: "Follicles: spheres of follicular cells surrounding a colloid core", type: "structure", edge: "contains",
                children: [
                  { id: "colloid", label: "Colloid stores thyroglobulin, the protein scaffold hormone is built on", type: "structure", edge: "contains" },
                  { id: "thyroid-storage", label: "The only endocrine gland that stores large amounts of hormone outside the cell", type: "process", edge: "causes",
                    note: "The stored supply is large enough to last weeks, which is why thyroid disease develops slowly and why treatment takes weeks to show its full effect." }
                ] },
              { id: "c-cells", label: "Parafollicular (C) cells sit between the follicles", type: "structure", edge: "contains",
                children: [
                  { id: "ref-calcitonin-1", label: "See calcitonin in calcium regulation", type: "reference", edge: "see", ref: "calcitonin" }
                ] }
            ] },

          { id: "thyroid-synthesis", label: "Hormone synthesis", type: "process", edge: "contains",
            children: [
              { id: "iodide-trapping", label: "Iodide trapping", type: "process", edge: "type-of",
                children: [
                  { id: "nis", label: "The sodium-iodide symporter pumps iodide into the follicular cell against its gradient", type: "process", edge: "causes",
                    note: "Concentrating iodide takes energy, because there is very little of it in blood compared with what the gland needs." },
                  { id: "iodine-requirement", label: "Depends entirely on dietary iodine", type: "control", edge: "requires",
                    children: [
                      { id: "cl-iodine-goiter", label: "Iodine deficiency is still a leading cause of goiter worldwide", type: "clinical", edge: "seen-as",
                        note: "Without iodine the gland cannot make hormone, so negative feedback fails, TSH stays high, and the gland enlarges under constant stimulation. The goiter is the result of the drive, not of the hormone." }
                    ] }
                ] },
              { id: "organification", label: "Oxidation and organification", type: "process", edge: "type-of",
                children: [
                  { id: "tpo", label: "Thyroid peroxidase oxidizes iodide and attaches it to tyrosine residues on thyroglobulin", type: "process", edge: "causes" },
                  { id: "mit-dit", label: "One iodine gives MIT, two iodines give DIT", type: "structure", edge: "causes" }
                ] },
              { id: "coupling", label: "Coupling", type: "process", edge: "type-of",
                children: [
                  { id: "coupling-products", label: "DIT plus DIT gives T4; MIT plus DIT gives T3", type: "process", edge: "causes",
                    note: "The number in the name is simply the number of iodine atoms. Counting them makes the chemistry easy to reconstruct." }
                ] },
              { id: "thyroid-release", label: "Storage and release", type: "process", edge: "type-of",
                children: [
                  { id: "thyroglobulin-breakdown", label: "Thyroglobulin is taken back into the cell and broken down to free the hormone", type: "process", edge: "causes" },
                  { id: "t4-dominant", label: "About 90 percent of what is released is T4", type: "process", edge: "causes" }
                ] }
            ] },

          { id: "thyroid-transport", label: "Transport and activation", type: "process", edge: "contains",
            children: [
              { id: "thyroid-carriers", label: "Carried bound to thyroxine binding globulin, transthyretin, and albumin", type: "process", edge: "causes" },
              { id: "deiodinase", label: "T4 is a prohormone; deiodinase converts it to the more active T3 in target tissues", type: "process", edge: "causes",
                note: "The gland releases mostly the less active form and lets each tissue decide how much to activate. That puts a second layer of control outside the gland entirely.",
                children: [
                  { id: "reverse-t3", label: "The alternative product, reverse T3, is inactive", type: "structure", edge: "causes" }
                ] }
            ] },

          { id: "thyroid-actions", label: "Actions", type: "process", edge: "contains",
            children: [
              { id: "bmr", label: "Raises basal metabolic rate", type: "process", edge: "causes",
                children: [
                  { id: "na-k-atpase", label: "Increases Na+/K+ ATPase activity, which consumes ATP and produces heat", type: "process", edge: "causes",
                    note: "Running the pump harder is metabolically expensive, and the waste heat is what raises body temperature.",
                    children: [
                      { id: "cl-thyroid-storm", label: "Thyroid storm: fever above 40 C (104 F), tachycardia, and agitation", type: "clinical", edge: "seen-as",
                        note: "An extreme hypermetabolic state. It is a medical emergency, and the picture is the normal actions of thyroid hormone pushed past what the body can compensate for." }
                    ] }
                ] },
              { id: "thyroid-permissive", label: "Permissive for catecholamines", type: "control", edge: "causes",
                children: [
                  { id: "beta-receptor-expression", label: "Increases expression of beta adrenergic receptors", type: "process", edge: "causes",
                    children: [
                      { id: "cl-hyperthyroid-adrenergic", label: "Hyperthyroidism looks adrenergic: tachycardia, tremor, heat intolerance, anxiety", type: "clinical", edge: "seen-as",
                        note: "Catecholamine levels are not actually elevated. The tissues have simply become more sensitive to normal levels, which is why beta blockers help with the symptoms while the thyroid itself is being treated." }
                    ] }
                ] },
              { id: "thyroid-development", label: "Required for normal growth and nervous system development", type: "process", edge: "causes",
                children: [
                  { id: "cl-congenital-hypothyroid", label: "Untreated congenital hypothyroidism causes irreversible developmental impairment", type: "clinical", edge: "seen-as",
                    note: "The window for normal brain development cannot be reopened later. That is the reason newborn screening exists and the reason treatment starts immediately rather than after confirmation." }
                ] }
            ] },

          { id: "thyroid-control", label: "Control", type: "control", edge: "contains",
            children: [
              { id: "hpt-axis-node", label: "The hypothalamic-pituitary-thyroid axis", type: "control", edge: "regulated-by",
                children: [
                  { id: "ref-hpt-1", label: "See the hypothalamic-pituitary-thyroid loop", type: "reference", edge: "see", ref: "loop:hpt-loop" }
                ] }
            ] }
        ]
      }
    },

    /* ===== 5. CALCIUM REGULATION ===== */
    {
      id: "calcium-regulation",
      title: "Calcium Regulation",
      summary: "Three hormones, three target organs, and one of the most tightly defended variables in the body.",
      topic: "Endocrine",
      book: { "silverthorn-9": [24], "silverthorn-8": [23] },
      root: {
        id: "calcium-control", label: "Calcium Regulation", type: "process",
        note: "Calcium is controlled more tightly than glucose. Small changes in ionized calcium change how easily nerves and muscle fire, so the margin for error is narrow.",
        children: [

          { id: "why-calcium", label: "Why calcium is defended so tightly", type: "process", edge: "contains",
            children: [
              { id: "ionized-calcium", label: "Ionized calcium sets the threshold for nerve and muscle excitability", type: "process", edge: "causes",
                note: "Only the {{ionized}} fraction matters physiologically. Calcium bound to albumin is inactive, which is why a low albumin lowers total calcium without causing any symptoms.",
                children: [
                  { id: "low-calcium-effect", label: "Low ionized calcium makes membranes more excitable, producing tetany", type: "process", edge: "causes",
                    note: "This surprises students, because low sounds like it should mean less activity. Calcium normally sits on the membrane and raises the threshold, so removing it makes firing easier.",
                    children: [
                      { id: "cl-hypocalcemia", label: "Hypocalcemia: perioral tingling, carpopedal spasm, Chvostek and Trousseau signs", type: "clinical", edge: "seen-as" }
                    ] },
                  { id: "high-calcium-effect", label: "High ionized calcium depresses excitability", type: "process", edge: "causes",
                    children: [
                      { id: "cl-hypercalcemia", label: "Hypercalcemia: fatigue, confusion, constipation, muscle weakness", type: "clinical", edge: "seen-as" }
                    ] }
                ] }
            ] },

          { id: "pth", label: "Parathyroid hormone", type: "structure", edge: "contains",
            note: "The main minute-to-minute regulator. If calcium falls, PTH is the response.",
            children: [
              { id: "chief-cells", label: "Made by chief cells of the parathyroid glands", type: "structure", edge: "produces",
                children: [
                  { id: "casr", label: "Released when the calcium sensing receptor detects falling ionized calcium", type: "control", edge: "regulated-by" }
                ] },
              { id: "pth-bone", label: "Action on bone", type: "process", edge: "acts-on",
                children: [
                  { id: "rankl", label: "PTH stimulates osteoblasts to produce RANKL, which activates osteoclasts", type: "process", edge: "causes",
                    note: "PTH does not act on osteoclasts directly. It works through the osteoblast, which is worth knowing because several bone drugs target that same pathway." },
                  { id: "bone-release", label: "Resorption releases both calcium and phosphate into blood", type: "process", edge: "causes" }
                ] },
              { id: "pth-kidney", label: "Action on kidney", type: "process", edge: "acts-on",
                children: [
                  { id: "kidney-calcium", label: "Increases calcium reabsorption in the distal tubule", type: "process", edge: "causes" },
                  { id: "kidney-phosphate", label: "Decreases phosphate reabsorption in the proximal tubule, so phosphate is lost in urine", type: "process", edge: "causes",
                    note: "This is the step that separates calcium from phosphate. Bone resorption released both, and the kidney then dumps the phosphate." },
                  { id: "one-alpha", label: "Activates 1-alpha-hydroxylase, the final step in making calcitriol", type: "process", edge: "causes" }
                ] },
              { id: "pth-net", label: "Net effect: serum calcium rises, serum phosphate falls", type: "process", edge: "causes",
                children: [
                  { id: "cl-hyperpara", label: "Primary hyperparathyroidism: high calcium with low phosphate, plus stones, bone pain, and constipation", type: "clinical", edge: "seen-as",
                    note: "The opposite pattern, high calcium with high phosphate, points away from PTH and toward something else raising calcium, because PTH always pushes phosphate down." }
                ] }
            ] },

          { id: "calcitriol", label: "Calcitriol, the active form of vitamin D", type: "structure", edge: "contains",
            children: [
              { id: "vitd-activation", label: "A three-organ activation pathway", type: "process", edge: "contains",
                note: "Vitamin D has to be modified twice before it works, in two different organs. That is why liver disease and kidney disease both affect calcium.",
                children: [
                  { id: "vitd-skin", label: "Skin: UVB converts 7-dehydrocholesterol to cholecalciferol", type: "process", edge: "causes" },
                  { id: "vitd-liver", label: "Liver: 25-hydroxylase makes 25-hydroxyvitamin D, the storage form measured in blood", type: "process", edge: "causes",
                    note: "This is the form a vitamin D level test reports, because it reflects total body stores rather than moment-to-moment regulation." },
                  { id: "vitd-kidney", label: "Kidney: 1-alpha-hydroxylase makes calcitriol, the active form", type: "process", edge: "causes",
                    note: "This step is the regulated one, controlled by PTH. The first two steps run largely on substrate availability." }
                ] },
              { id: "calcitriol-gut", label: "Action on intestine: absorbs both calcium and phosphate", type: "process", edge: "acts-on",
                note: "Calcitriol raises both, unlike PTH which raises calcium and lowers phosphate.",
                children: [
                  { id: "cl-ckd-calcium", label: "Chronic kidney disease impairs the final activation step, so calcium absorption falls", type: "clinical", edge: "seen-as",
                    note: "Falling calcium plus retained phosphate drives PTH up persistently, which is called secondary hyperparathyroidism." }
                ] }
            ] },

          { id: "calcitonin", label: "Calcitonin", type: "structure", edge: "contains",
            children: [
              { id: "calcitonin-source", label: "Made by parafollicular C cells of the thyroid", type: "structure", edge: "produces",
                children: [
                  { id: "calcitonin-stimulus", label: "Released when calcium is high", type: "control", edge: "regulated-by" }
                ] },
              { id: "calcitonin-action", label: "Inhibits osteoclasts, lowering calcium", type: "process", edge: "acts-on",
                children: [
                  { id: "calcitonin-minor", label: "Its role in normal adult human physiology appears limited", type: "process", edge: "causes",
                    note: "People whose thyroid has been removed maintain normal calcium without calcitonin replacement. It is presented as PTH's opposite for symmetry, but the evidence for a major everyday role in adults is weak." }
                ] }
            ] },

          { id: "calcium-loop-link", label: "The control loop", type: "control", edge: "contains",
            children: [
              { id: "ref-calcium-loop", label: "See the calcium homeostasis loop", type: "reference", edge: "see", ref: "loop:calcium-loop" }
            ] }
        ]
      }
    },

    /* ===== 6. ADRENAL GLAND ===== */
    {
      id: "adrenal-gland",
      title: "Adrenal Gland",
      summary: "Two embryologically different organs inside one capsule, producing four functionally distinct hormone groups.",
      topic: "Endocrine",
      book: { "silverthorn-9": [24], "silverthorn-8": [23] },
      root: {
        id: "adrenal", label: "Adrenal Gland", type: "structure",
        note: "The cortex and medulla are not variations on a theme. They come from different embryonic tissue, make different classes of molecule, and answer to different controllers.",
        children: [

          { id: "adrenal-two-organs", label: "Two organs in one capsule", type: "structure", edge: "contains",
            children: [
              { id: "cortex-origin", label: "Cortex develops from mesoderm and makes steroids", type: "structure", edge: "type-of" },
              { id: "medulla-origin", label: "Medulla develops from neural crest and makes catecholamines", type: "structure", edge: "type-of",
                children: [
                  { id: "chromaffin", label: "Chromaffin cells are modified sympathetic postganglionic neurons", type: "structure", edge: "contains",
                    note: "The medulla is essentially a sympathetic ganglion that secretes into blood instead of onto a target tissue." }
                ] }
            ] },

          { id: "zona-glomerulosa", label: "Zona glomerulosa, the outer cortical zone", type: "structure", edge: "contains",
            children: [
              { id: "aldosterone", label: "Produces aldosterone, a mineralocorticoid", type: "structure", edge: "produces",
                children: [
                  { id: "aldo-target", label: "Acts on principal cells of the collecting duct", type: "process", edge: "acts-on",
                    children: [
                      { id: "ref-principal-cell", label: "See the principal cell, in Renal Transport", type: "reference", edge: "see", ref: "rn-principal-cell" }
                    ] },
                  { id: "aldo-sodium", label: "Increases sodium channels and Na+/K+ ATPase, reabsorbing sodium and water", type: "process", edge: "causes" },
                  { id: "aldo-potassium", label: "Drives potassium and hydrogen ion secretion into urine", type: "process", edge: "causes",
                    note: "Sodium is retained in exchange for potassium and acid. That trade is what links aldosterone to both potassium level and blood pH." }
                ] },
              { id: "aldo-control", label: "Controlled by angiotensin II and plasma potassium, not mainly by ACTH", type: "control", edge: "regulated-by",
                note: "This is the exception worth memorizing. ACTH drives the other two cortical zones, but the glomerulosa answers to volume status and potassium.",
                children: [
                  { id: "cl-conn", label: "Primary hyperaldosteronism: hypertension with low potassium and metabolic alkalosis", type: "clinical", edge: "seen-as" },
                  { id: "ref-kidney-renin", label: "See renin release in other endocrine tissues", type: "reference", edge: "see", ref: "renin" },
                  { id: "ref-raas-endo", label: "See the renin-angiotensin-aldosterone loop, in Renal Transport", type: "reference", edge: "see", ref: "loop:raas-loop" }
                ] }
            ] },

          { id: "zona-fasciculata", label: "Zona fasciculata, the middle and widest zone", type: "structure", edge: "contains",
            children: [
              { id: "cortisol", label: "Produces cortisol, a glucocorticoid", type: "structure", edge: "produces",
                children: [
                  { id: "cortisol-glucose", label: "Raises blood glucose through gluconeogenesis, protein breakdown, and fat breakdown", type: "process", edge: "causes",
                    note: "Cortisol mobilizes fuel for a sustained demand, which is the opposite of what insulin does." },
                  { id: "cortisol-permissive", label: "Permissive for catecholamines, which maintains vascular tone", type: "control", edge: "causes",
                    note: "Without cortisol, the same amount of norepinephrine produces much less vasoconstriction. This is why adrenal failure can present as shock that does not respond well to pressors alone." },
                  { id: "cortisol-immune", label: "Suppresses inflammation and immune function at high levels", type: "process", edge: "causes" },
                  { id: "cortisol-rhythm", label: "Follows a circadian rhythm, peaking in the early morning", type: "control", edge: "regulated-by" }
                ] },
              { id: "cortisol-control", label: "Controlled by ACTH from the anterior pituitary", type: "control", edge: "regulated-by",
                children: [
                  { id: "ref-hpa-2", label: "See the hypothalamic-pituitary-adrenal loop", type: "reference", edge: "see", ref: "loop:hpa-loop" },
                  { id: "cl-cushing", label: "Cushing syndrome: cortisol excess, with central weight gain, thin skin, high glucose, and hypertension", type: "clinical", edge: "seen-as" },
                  { id: "cl-addison", label: "Addison disease: primary adrenal failure, with low cortisol and low aldosterone together", type: "clinical", edge: "seen-as",
                    note: "Because the gland itself has failed, both zones are lost. Secondary adrenal insufficiency from a pituitary problem spares aldosterone, because aldosterone was never ACTH-driven." },
                  { id: "cl-steroid-taper", label: "Long-term steroid therapy has to be tapered, not stopped", type: "clinical", edge: "seen-as",
                    note: "Sustained negative feedback suppresses CRH and ACTH, and the adrenal cortex atrophies. Stopping abruptly leaves the patient with no cortisol until the axis recovers, which takes time." }
                ] }
            ] },

          { id: "zona-reticularis", label: "Zona reticularis, the inner cortical zone", type: "structure", edge: "contains",
            children: [
              { id: "adrenal-androgens", label: "Produces adrenal androgens, mainly DHEA and androstenedione", type: "structure", edge: "produces",
                children: [
                  { id: "androgen-significance", label: "A minor androgen source in men, a significant one in women", type: "process", edge: "causes" },
                  { id: "cl-cah", label: "Congenital adrenal hyperplasia: blocked cortisol synthesis shunts precursors into androgens", type: "clinical", edge: "seen-as",
                    note: "Low cortisol removes negative feedback, so ACTH rises, the gland is driven hard, and everything upstream of the block accumulates and is pushed down the androgen route." }
                ] }
            ] },

          { id: "adrenal-medulla", label: "Adrenal medulla", type: "structure", edge: "contains",
            children: [
              { id: "catecholamines", label: "Produces epinephrine and norepinephrine", type: "structure", edge: "produces",
                children: [
                  { id: "epi-proportion", label: "Epinephrine is roughly 80 percent of the output", type: "process", edge: "causes" },
                  { id: "medulla-trigger", label: "Preganglionic sympathetic fibers release acetylcholine onto nicotinic receptors to trigger release", type: "control", edge: "regulated-by",
                    note: "There is no postganglionic neuron. The gland itself is the postganglionic element, which is why the response is so fast." },
                  { id: "pnmt", label: "Cortisol draining from the cortex induces the enzyme that converts norepinephrine to epinephrine", type: "process", edge: "requires",
                    note: "Blood drains from cortex to medulla, so the medulla sits in unusually high cortisol. This is one of the few places where the two halves of the gland clearly interact." },
                  { id: "cl-pheo", label: "Pheochromocytoma: episodic catecholamine release causing spells of headache, sweating, and palpitations with hypertension", type: "clinical", edge: "seen-as",
                    note: "Blood pressure between spells can be completely normal, which is why the history matters more than any single reading." }
                ] }
            ] }
        ]
      }
    },

    /* ===== 7. PANCREATIC ISLETS AND GLUCOSE ===== */
    {
      id: "pancreatic-islets",
      title: "Pancreatic Islets and Glucose Regulation",
      summary: "How the beta cell measures glucose, what insulin and glucagon each do, and why the gut has a say.",
      topic: "Endocrine",
      book: { "silverthorn-9": [23], "silverthorn-8": [22] },
      root: {
        id: "islets", label: "Pancreatic Islets and Glucose Regulation", type: "structure",
        note: "The islets are less than two percent of pancreatic mass. Everything else in the organ is exocrine tissue making digestive enzymes.",
        children: [

          { id: "islet-cells", label: "Islet cell types", type: "structure", edge: "contains",
            note: "Reported percentages vary a good deal between sources, partly because human islets differ from rodent islets and partly because counting methods differ. Treat the proportions as approximate.",
            children: [
              { id: "beta-cells", label: "Beta cells produce insulin and amylin", type: "structure", edge: "produces",
                children: [
                  { id: "beta-proportion", label: "The most numerous islet cell, roughly half to two thirds of the islet", type: "process", edge: "causes" }
                ] },
              { id: "alpha-cells", label: "Alpha cells produce glucagon", type: "structure", edge: "produces",
                children: [
                  { id: "alpha-proportion", label: "A larger share of the human islet than of the rodent islet", type: "process", edge: "causes",
                    note: "Worth flagging, because a lot of textbook figures come from rodent work and do not transfer cleanly to humans." }
                ] },
              { id: "delta-cells", label: "Delta cells produce somatostatin", type: "structure", edge: "produces",
                children: [
                  { id: "delta-action", label: "Damps the release of both insulin and glucagon locally", type: "process", edge: "acts-on" }
                ] },
              { id: "pp-cells", label: "PP cells produce pancreatic polypeptide", type: "structure", edge: "produces" }
            ] },

          { id: "glucose-sensing", label: "How the beta cell senses glucose", type: "process", edge: "contains",
            note: "This is one of the most satisfying mechanisms in physiology, because every step follows logically from the one before it.",
            children: [
              { id: "glut2-glucokinase", label: "Glucose enters through GLUT2 and is phosphorylated by glucokinase", type: "process", edge: "causes",
                children: [
                  { id: "glucokinase-sensor", label: "Glucokinase is the rate-limiting step, which makes it the glucose sensor", type: "process", edge: "causes",
                    note: "Glucokinase has a low affinity for glucose, so its activity tracks the glucose concentration across the normal physiological range instead of saturating." }
                ] },
              { id: "katp-closure", label: "Metabolism raises ATP, which closes the ATP sensitive potassium channel", type: "process", edge: "causes",
                children: [
                  { id: "depolarization", label: "The cell depolarizes, voltage gated calcium channels open, and calcium enters", type: "process", edge: "causes" },
                  { id: "exocytosis", label: "Calcium triggers exocytosis of stored insulin granules", type: "process", edge: "causes" },
                  { id: "cl-sulfonylurea", label: "Sulfonylureas close that same potassium channel directly", type: "clinical", edge: "seen-as",
                    note: "Because they bypass the glucose-sensing step, they can push insulin out when glucose is already low. That is why hypoglycemia is a real risk with this drug class and not with drugs that only act when glucose is high." }
                ] },
              { id: "c-peptide", label: "C-peptide is released in equal amounts with insulin", type: "process", edge: "causes",
                children: [
                  { id: "c-peptide-use", label: "It marks insulin the body made, since injected insulin contains no C-peptide", type: "process", edge: "causes" }
                ] }
            ] },

          { id: "insulin-actions", label: "Insulin actions", type: "process", edge: "contains",
            note: "One way to hold all of this together: insulin is the signal that fuel has arrived, so store it and stop making more.",
            children: [
              { id: "insulin-uptake", label: "Moves glucose into skeletal muscle and fat", type: "process", edge: "acts-on",
                children: [
                  { id: "glut4", label: "Insulin triggers GLUT4 transporters to move to the cell surface", type: "process", edge: "causes" },
                  { id: "glut4-independent", label: "Brain, liver, and red blood cells do not depend on GLUT4", type: "process", edge: "causes",
                    note: "This is why the brain keeps taking up glucose during insulin deficiency, and why hypoglycemia produces neurological symptoms so quickly." }
                ] },
              { id: "insulin-storage", label: "Stores fuel", type: "process", edge: "causes",
                children: [
                  { id: "glycogenesis", label: "Glycogen synthesis in liver and muscle", type: "process", edge: "type-of" },
                  { id: "lipogenesis", label: "Fat synthesis and storage in adipose tissue", type: "process", edge: "type-of" },
                  { id: "protein-synthesis", label: "Protein synthesis", type: "process", edge: "type-of" }
                ] },
              { id: "insulin-inhibits", label: "Switches off fuel release", type: "process", edge: "causes",
                children: [
                  { id: "insulin-blocks", label: "Blocks gluconeogenesis, glycogen breakdown, fat breakdown, and ketone production", type: "process", edge: "causes" },
                  { id: "cl-dka", label: "Without insulin, unopposed fat breakdown produces ketoacids", type: "clinical", edge: "seen-as",
                    note: "This is the basis of diabetic ketoacidosis. It explains why DKA is typical of absolute insulin deficiency, while the hyperosmolar state seen with residual insulin usually lacks significant ketosis." }
                ] },
              { id: "insulin-potassium", label: "Drives potassium into cells", type: "process", edge: "causes",
                children: [
                  { id: "cl-hyperkalemia", label: "Insulin with glucose is used to lower dangerously high blood potassium", type: "clinical", edge: "seen-as",
                    note: "It moves potassium into cells rather than removing it from the body, so the effect is temporary and something else has to follow." }
                ] }
            ] },

          { id: "glucagon-actions", label: "Glucagon actions", type: "process", edge: "contains",
            children: [
              { id: "glucagon-liver", label: "Acts mainly on the liver", type: "process", edge: "acts-on",
                children: [
                  { id: "glycogenolysis", label: "Breaks down glycogen and makes new glucose", type: "process", edge: "causes" },
                  { id: "ketogenesis", label: "Promotes fat breakdown and ketone production", type: "process", edge: "causes" }
                ] },
              { id: "glucagon-stimulus", label: "Released when glucose falls, and after a protein-rich meal", type: "control", edge: "regulated-by",
                note: "The protein response prevents the insulin released alongside it from dropping glucose too far." }
            ] },

          { id: "incretin", label: "The incretin effect", type: "control", edge: "contains",
            children: [
              { id: "glp1-gip", label: "GLP-1 and GIP are released from the gut when food arrives", type: "structure", edge: "produces",
                children: [
                  { id: "incretin-amplify", label: "They amplify insulin release only when glucose is already elevated", type: "process", edge: "causes",
                    note: "Because the effect is glucose-dependent, incretin-based drugs carry a much lower hypoglycemia risk than sulfonylureas." },
                  { id: "oral-vs-iv", label: "Oral glucose produces more insulin than the same glucose given intravenously", type: "process", edge: "causes",
                    note: "This difference is the evidence the incretin effect exists. The gut tells the pancreas food is coming before the glucose even arrives." }
                ] }
            ] },

          { id: "glucose-loop-link", label: "The control loop", type: "control", edge: "contains",
            children: [
              { id: "ref-glucose-loop", label: "See the glucose homeostasis loops", type: "reference", edge: "see", ref: "loop:glucose-loop" }
            ] }
        ]
      }
    },

    /* ===== 8. OTHER ENDOCRINE TISSUES ===== */
    {
      id: "other-tissues",
      title: "Other Endocrine Tissues",
      summary: "Organs with a day job that also release hormones, plus the glands that do not fit the pituitary axes.",
      topic: "Endocrine",
      book: { "silverthorn-9": [8], "silverthorn-8": [7] },
      root: {
        id: "other-endocrine", label: "Other Endocrine Tissues", type: "structure",
        note: "Endocrine function is not limited to the classic glands. Several organs with an obvious primary role also secrete hormones, and those are easy to overlook.",
        children: [

          { id: "gonads", label: "Gonads", type: "structure", edge: "contains",
            children: [
              { id: "ovary", label: "Ovary produces estrogen and progesterone", type: "structure", edge: "produces" },
              { id: "testis", label: "Testis produces testosterone from Leydig cells", type: "structure", edge: "produces" },
              { id: "gonad-control", label: "Both are driven by FSH and LH from the anterior pituitary", type: "control", edge: "regulated-by",
                children: [
                  { id: "ref-gonadotropins-1", label: "See FSH and LH in the pituitary map", type: "reference", edge: "see", ref: "gonadotropins" }
                ] }
            ] },

          { id: "pineal", label: "Pineal gland", type: "structure", edge: "contains",
            children: [
              { id: "melatonin", label: "Produces melatonin on a light-dark cycle", type: "structure", edge: "produces",
                children: [
                  { id: "melatonin-light", label: "Light reaching the retina suppresses melatonin release", type: "control", edge: "regulated-by" }
                ] }
            ] },

          { id: "heart-endocrine", label: "Heart", type: "structure", edge: "contains",
            children: [
              { id: "anp", label: "Atrial myocytes release atrial natriuretic peptide when stretched", type: "structure", edge: "produces",
                children: [
                  { id: "anp-action", label: "Promotes sodium and water loss and opposes the renin-angiotensin-aldosterone system", type: "process", edge: "acts-on",
                    note: "Stretch means the atrium is overfilled, so the appropriate response is to offload volume. The stimulus and the action fit together directly." }
                ] }
            ] },

          { id: "kidney-endocrine", label: "Kidney", type: "structure", edge: "contains",
            children: [
              { id: "renin", label: "Releases renin when perfusion falls", type: "structure", edge: "produces",
                children: [
                  { id: "renin-cascade", label: "Starts the cascade that ends in angiotensin II and aldosterone", type: "process", edge: "causes",
                    children: [
                      { id: "ref-raas-tissues", label: "See the full cascade, in Renal Transport", type: "reference", edge: "see", ref: "loop:raas-loop" }
                    ] },
                  { id: "ref-aldo-1", label: "See aldosterone in the adrenal map", type: "reference", edge: "see", ref: "aldosterone" }
                ] },
              { id: "epo", label: "Releases erythropoietin when oxygen delivery falls", type: "structure", edge: "produces",
                children: [
                  { id: "epo-action", label: "Stimulates red blood cell production in bone marrow", type: "process", edge: "acts-on" },
                  { id: "cl-ckd-anemia", label: "Chronic kidney disease causes anemia partly through lost erythropoietin", type: "clinical", edge: "seen-as" }
                ] },
              { id: "kidney-calcitriol", label: "Completes the activation of vitamin D", type: "process", edge: "causes",
                children: [
                  { id: "ref-calcitriol-1", label: "See calcitriol in calcium regulation", type: "reference", edge: "see", ref: "calcitriol" }
                ] }
            ] },

          { id: "adipose-endocrine", label: "Adipose tissue", type: "structure", edge: "contains",
            children: [
              { id: "leptin", label: "Releases leptin in proportion to fat stores", type: "structure", edge: "produces",
                children: [
                  { id: "leptin-action", label: "Signals long-term energy status to the hypothalamus", type: "process", edge: "acts-on",
                    note: "Leptin reports how much is stored, not how recently someone ate. That is a different question from the one the gut hormones answer." }
                ] }
            ] },

          { id: "gi-endocrine", label: "Gastrointestinal tract", type: "structure", edge: "contains",
            children: [
              { id: "gi-hormones", label: "Releases gastrin, secretin, cholecystokinin, GLP-1, GIP, and ghrelin", type: "structure", edge: "produces",
                children: [
                  { id: "ref-incretin-1", label: "See the incretin effect in the pancreas map", type: "reference", edge: "see", ref: "incretin" }
                ] }
            ] },

          { id: "thymus-endocrine", label: "Thymus", type: "structure", edge: "contains",
            children: [
              { id: "thymosin", label: "Produces thymosin, which supports T lymphocyte development", type: "structure", edge: "produces" }
            ] }
        ]
      }
    }
  ],

  /* ---------------------------------------------------------
     LOOP DIAGRAMS
     Content that cycles and therefore cannot be a tree.
     --------------------------------------------------------- */
  loops: [

    {
      id: "hpa-loop",
      title: "Hypothalamic-Pituitary-Adrenal Axis",
      summary: "The standard three-gland axis, with the output hormone shutting down both steps above it.",
      topic: "Endocrine",
      book: { "silverthorn-9": [8], "silverthorn-8": [7] },
      feedback: "negative",
      stimulus: "Physical or psychological stress, and the early morning phase of the circadian rhythm.",
      viewBox: "0 0 760 400",
      nodes: [
        { id: "hpa-stress",    label: "Stress and circadian signal", x: 110, y: 60,  w: 180 },
        { id: "hpa-hypo",      label: "Hypothalamus",                x: 380, y: 60,  w: 180 },
        { id: "hpa-pit",       label: "Anterior pituitary",          x: 380, y: 190, w: 180 },
        { id: "hpa-adrenal",   label: "Adrenal zona fasciculata",    x: 380, y: 320, w: 180 },
        { id: "hpa-cortisol",  label: "Cortisol",                    x: 640, y: 190, w: 140 }
      ],
      edges: [
        { from: "hpa-stress",   to: "hpa-hypo",     sign: "+", label: "triggers" },
        { from: "hpa-hypo",     to: "hpa-pit",      sign: "+", label: "CRH" },
        { from: "hpa-pit",      to: "hpa-adrenal",  sign: "+", label: "ACTH" },
        { from: "hpa-adrenal",  to: "hpa-cortisol", sign: "+", label: "secretes" },
        { from: "hpa-cortisol", to: "hpa-pit",      sign: "-", label: "inhibits" },
        { from: "hpa-cortisol", to: "hpa-hypo",     sign: "-", label: "inhibits" }
      ],
      path: "Stress and the circadian clock stimulate the hypothalamus to release CRH. CRH travels through the portal system and stimulates the anterior pituitary to release ACTH. ACTH reaches the zona fasciculata of the adrenal cortex and stimulates cortisol secretion. Cortisol then inhibits both the anterior pituitary and the hypothalamus, which reduces ACTH and CRH and brings cortisol back down. Because the inhibition acts on two levels, sustained external steroid suppresses the whole axis and the adrenal cortex atrophies."
    },

    {
      id: "hpt-loop",
      title: "Hypothalamic-Pituitary-Thyroid Axis",
      summary: "The same three-gland pattern as the adrenal axis, which is why TSH is so useful as a single test.",
      topic: "Endocrine",
      book: { "silverthorn-9": [24], "silverthorn-8": [23] },
      feedback: "negative",
      stimulus: "Falling circulating thyroid hormone, and cold exposure in the newborn.",
      viewBox: "0 0 760 400",
      nodes: [
        { id: "hpt-hypo",   label: "Hypothalamus",             x: 300, y: 60,  w: 190 },
        { id: "hpt-pit",    label: "Anterior pituitary",       x: 300, y: 190, w: 190 },
        { id: "hpt-thy",    label: "Thyroid follicular cells", x: 300, y: 320, w: 220 },
        { id: "hpt-hormone",label: "T4 and T3",                x: 600, y: 190, w: 150 }
      ],
      edges: [
        { from: "hpt-hypo",    to: "hpt-pit",     sign: "+", label: "TRH" },
        { from: "hpt-pit",     to: "hpt-thy",     sign: "+", label: "TSH" },
        { from: "hpt-thy",     to: "hpt-hormone", sign: "+", label: "secretes" },
        { from: "hpt-hormone", to: "hpt-pit",     sign: "-", label: "inhibits" },
        { from: "hpt-hormone", to: "hpt-hypo",    sign: "-", label: "inhibits" }
      ],
      path: "The hypothalamus releases TRH, which stimulates the anterior pituitary to release TSH. TSH stimulates the thyroid follicular cells to make and release T4 and a smaller amount of T3. Circulating thyroid hormone inhibits both the pituitary and the hypothalamus. Because the pituitary is very sensitive to this feedback, TSH moves early and in the opposite direction to the thyroid hormone level, which is what makes a TSH level such a good first test of thyroid function."
    },

    {
      id: "calcium-loop",
      title: "Calcium Homeostasis",
      summary: "One hormone acting on three organs, with all three routes converging on the same result.",
      topic: "Endocrine",
      book: { "silverthorn-9": [24], "silverthorn-8": [23] },
      feedback: "negative",
      stimulus: "A fall in ionized calcium, detected by the calcium sensing receptor on parathyroid chief cells.",
      viewBox: "0 0 940 460",
      nodes: [
        { id: "ca-low",    label: "Ionized calcium falls",           x: 230, y: 60,  w: 230 },
        { id: "ca-pth",    label: "Chief cells release PTH",         x: 560, y: 60,  w: 230 },
        { id: "ca-bone",   label: "Bone: osteoclast resorption",     x: 200, y: 215, w: 200 },
        { id: "ca-kidney", label: "Kidney: calcium reabsorbed",      x: 430, y: 215, w: 200 },
        { id: "ca-gut",    label: "Gut: calcitriol absorbs calcium", x: 660, y: 215, w: 220 },
        { id: "ca-rise",   label: "Ionized calcium rises",           x: 430, y: 375, w: 220 }
      ],
      edges: [
        { from: "ca-low",    to: "ca-pth",    sign: "+", label: "triggers" },
        { from: "ca-pth",    to: "ca-bone",   sign: "+", label: "stimulates" },
        { from: "ca-pth",    to: "ca-kidney", sign: "+", label: "stimulates" },
        { from: "ca-pth",    to: "ca-gut",    sign: "+", label: "via calcitriol" },
        { from: "ca-bone",   to: "ca-rise",   sign: "+", label: "releases" },
        { from: "ca-kidney", to: "ca-rise",   sign: "+", label: "conserves" },
        { from: "ca-gut",    to: "ca-rise",   sign: "+", label: "absorbs" },
        { from: "ca-rise",   to: "ca-pth",    sign: "-", label: "shuts off", cp: [1150, 215] }
      ],
      path: "A fall in ionized calcium is detected by the calcium sensing receptor on parathyroid chief cells, which release PTH. PTH acts on bone to free calcium through osteoclast resorption, on the kidney to reabsorb calcium and activate calcitriol, and through calcitriol on the intestine to absorb more calcium from food. All three routes raise ionized calcium, and the rise shuts off PTH release. The bone and kidney effects are fast, while the intestinal effect through calcitriol takes longer because it requires new protein synthesis."
    },

    {
      id: "glucose-loop",
      title: "Glucose Homeostasis",
      summary: "Two opposing negative feedback loops sharing one variable, which is why glucose is held in such a narrow range.",
      topic: "Endocrine",
      book: { "silverthorn-9": [23], "silverthorn-8": [22] },
      feedback: "negative",
      stimulus: "Blood glucose moving away from its set point in either direction.",
      viewBox: "0 0 1000 320",
      nodes: [
        { id: "gl-high",    label: "Blood glucose above set point", x: 250, y: 60,  w: 250 },
        { id: "gl-beta",    label: "Beta cells release insulin",    x: 125, y: 240, w: 200 },
        { id: "gl-uptake",  label: "Tissues take up and store glucose", x: 390, y: 240, w: 220 },
        { id: "gl-low",     label: "Blood glucose below set point", x: 750, y: 60,  w: 250 },
        { id: "gl-alpha",   label: "Alpha cells release glucagon",  x: 620, y: 240, w: 200 },
        { id: "gl-release", label: "Liver releases glucose",        x: 880, y: 240, w: 200 }
      ],
      edges: [
        { from: "gl-high",    to: "gl-beta",    sign: "+", label: "triggers" },
        { from: "gl-beta",    to: "gl-uptake",  sign: "+", label: "insulin" },
        { from: "gl-uptake",  to: "gl-high",    sign: "-", label: "corrects" },
        { from: "gl-low",     to: "gl-alpha",   sign: "+", label: "triggers" },
        { from: "gl-alpha",   to: "gl-release", sign: "+", label: "glucagon" },
        { from: "gl-release", to: "gl-low",     sign: "-", label: "corrects" }
      ],
      path: "When blood glucose rises above the set point, beta cells release insulin, tissues take up and store glucose, and the rise is corrected. When blood glucose falls below the set point, alpha cells release glucagon, the liver breaks down glycogen and makes new glucose, and the fall is corrected. Each loop is negative feedback on its own, and because the two act in opposite directions on the same variable, glucose is held within a narrow range rather than simply being pushed back from one side."
    }
  ],

  /* ---------------------------------------------------------
     GLOSSARY
     --------------------------------------------------------- */
  glossary: {
    "thyroxine binding globulin": "The main plasma protein that carries thyroid hormone. Hormone bound to it is inactive but protected from clearance, so it acts as a reservoir.",
    "osmolality": "How concentrated the dissolved particles in a fluid are. Rising plasma osmolality means water is relatively short, which is the main trigger for ADH release.",
    "ionized": "The free, unbound form of calcium in blood. Only this fraction affects nerve and muscle excitability, which is why total calcium can be misleading when albumin is abnormal.",
    "tropic hormone": "A hormone whose target is another endocrine gland rather than a non-endocrine tissue. TSH, ACTH, FSH, and LH are the pituitary tropic hormones.",
    "permissive": "Describes a hormone that must be present for another hormone to produce its full effect, even though the permissive hormone does not produce that effect itself.",
    "second messenger": "A molecule made inside the cell in response to a hormone binding at the surface. It carries the signal onward, since the hormone itself never enters.",
    "prohormone": "A hormone that has to be chemically changed before it becomes fully active. T4 is the clearest example, since target tissues convert it to T3.",
    "negative feedback": "A control pattern in which the output of a system reduces the activity that produced it, holding a variable near a set point.",
    "set point": "The value a control system defends. Deviation in either direction triggers a correction back toward it.",
    "portal system": "Two capillary beds connected in series, so blood from the first reaches the second before returning to the heart. It delivers a concentrated signal to a specific target.",
    "gluconeogenesis": "Making new glucose from non-carbohydrate sources such as amino acids and glycerol. Mainly a liver process.",
    "glycogenolysis": "Breaking stored glycogen back down into glucose.",
    "lipolysis": "Breaking stored triglyceride down into fatty acids and glycerol for use as fuel.",
    "resorption": "Breakdown of bone by osteoclasts, releasing calcium and phosphate into the blood. Not the same word as reabsorption, which describes the kidney recovering a substance from filtrate.",
    "incretin": "A gut hormone released when food arrives that amplifies insulin release, but only when blood glucose is already elevated.",
    "chromaffin cell": "The hormone-secreting cell of the adrenal medulla. Functionally a sympathetic postganglionic neuron that secretes into the blood instead of onto a tissue.",
    "epiphyseal plate": "The growth plate in a long bone. Once it closes, length can no longer increase, which is why excess growth hormone produces different results before and after closure.",
    "tetany": "Sustained involuntary muscle contraction caused by increased membrane excitability, classically from low ionized calcium."
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
