#!/usr/bin/env node
/**
 * Seed the 53 loose-stars cards from the rebuild brief.
 *
 * Reads from CARDS below — the canonical list, each entry
 * carrying everything that shows on the card face plus the
 * full body text from §3 of the brief. Writes one MDX per
 * card into src/content/cards/<slug>.mdx.
 *
 * Idempotent: re-running overwrites every file with the same
 * content, so it's safe to keep around as the source of
 * truth for content edits.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'src/content/cards';
mkdirSync(OUT, { recursive: true });

const yamlString = (s) => {
  if (s == null) return "''";
  // Quote with single, escape any embedded single quotes.
  return `'${String(s).replace(/'/g, "''")}'`;
};

function frontmatter(c) {
  const lines = [
    `title: ${yamlString(c.title)}`,
    `archetype: ${c.archetype}`,
    `aim: ${c.aim}`,
    `state: ${yamlString(c.state)}`,
    `seeded: ${yamlString(c.seeded)}`,
    `touched: ${yamlString(c.touched)}`,
    `seed: ${yamlString(c.seed)}`,
    `preview: ${yamlString(c.preview)}`,
  ];
  if (c.pairs_with && c.pairs_with.length) {
    lines.push(`pairs_with:`);
    for (const p of c.pairs_with) lines.push(`  - ${yamlString(p)}`);
  }
  return ['---', ...lines, '---'].join('\n');
}

function mdxFor(c) {
  return `${frontmatter(c)}\n\n${c.body.trim()}\n`;
}

// =====================================================================
// CARD CANON — 53 cards, in archetype order (Logic → Psyche → Instinct).
// =====================================================================
const CARDS = [
  // ─── LOGIC (Build) — 23 cards ─────────────────────────────────
  {
    slug: 'parenting-is-nudging',
    title: 'Parenting is just nudging',
    archetype: 'logic', aim: 'essay', state: 'patch-1',
    seeded: '2025.11.03', touched: '2026.02.18',
    seed: 'Parenting is just nudging.',
    preview: "You can't push a person into themselves. You can move the furniture, change the lighting, leave a book on the table — and the person they were going to become walks into the room.",
    body: `Parenting is just nudging. You can't push a person into themselves. You can move the furniture, change the lighting, leave a book on the table — and the person they were going to become walks into the room.`,
  },
  {
    slug: 'two-investment-banks',
    title: 'Two Investment Banks',
    archetype: 'logic', aim: 'essay', state: 'patch-2',
    seeded: '2025.10.21', touched: '2026.04.09',
    seed: 'There are two investment banks for the back half of life — financial and emotional.',
    preview: 'Did you build the relationships you needed to make the second half fulfilling? Compound interest works the same way with people as it does with money.',
    body: `There are two investment banks when preparing for the back half of a life — financial and emotional. Did you build the relationships you needed to make the second half fulfilling? Compound interest works the same way with people as it does with money. Neglecting your children's emotional development is the equivalent of skipping a 401k contribution. The framework is precise, load-bearing, and almost nobody has named it. The opening image is a parent whose account was empty when the family needed to withdraw. The footnotes are a literal ledger — deposits and withdrawals catalogued like transactions.`,
  },
  {
    slug: 'justification-to-be-yourself',
    title: 'Treat others how you want to be treated → permission to be yourself',
    archetype: 'logic', aim: 'essay', state: 'patch-1',
    seeded: '2025.12.07', touched: '2026.01.30',
    seed: "If you treat others how you want to be treated, that's enough justification to be yourself.",
    preview: "The contract is symmetric. You don't owe the world a more palatable version of you in exchange for its tolerance.",
    body: `If you treat others how you want to be treated then you have enough justification to be yourself. The contract is symmetric. You don't owe the world a more palatable version of you in exchange for its tolerance — you only owe it the same kindness you want back.`,
  },
  {
    slug: 'the-relationship-codex',
    title: 'The Relationship Codex',
    archetype: 'logic', aim: 'essay', state: 'patch-2',
    seeded: '2026.01.14', touched: '2026.04.18',
    seed: 'Every person you love is a data structure you are building inside yourself.',
    preview: 'Intimacy is progressive revelation gated by trust states. Not a metaphor. It is how consciousness actually metabolizes other people.',
    body: `Intimacy is progressive revelation gated by trust states. Not a metaphor. It is how consciousness actually metabolizes other people. Certain video games figured this out before psychology did — *Hades 2*, *Stardew Valley*, the *Persona* series — where every person you know has a data structure with entries that unlock through repeated contact in specific emotional registers.`,
  },
  {
    slug: 'psychogeography-interior',
    title: 'Interior psychogeography',
    archetype: 'logic', aim: 'essay', state: 'patch-2',
    seeded: '2026.02.02', touched: '2026.04.20',
    seed: 'Interior psychological states have actual geography. Not metaphorical. Structural.',
    preview: 'Grief has topology. A faith deconstruction leaves a crater with measurable dimensions. Every self has rooms, corridors, and terrain that reshapes after loss.',
    body: `The situationist psychogeography was about how external space affects internal state — how a street can produce a mood. This essay reverses it. Interior psychological states have actual geography. Not metaphorical. Structural. Grief has topology. A faith deconstruction leaves a crater with measurable dimensions. Every self has rooms, corridors, walled-off sections, and terrain that reshapes after loss.

The novel move is the critique of the dominant cultural description of psychological boundary zones — *Disco Elysium*'s pale, the dérive, most literary treatments of the breakdown of meaning — which all say that at the edge of the self, things stop making sense. That's wrong. At the edge of the self, things make a *different* sense your brain wasn't built to run. Legibility you can't metabolize. That's not confusion. That's a translation problem.

The essay argues that what people call psychological crisis is almost always the moment the interior geography asks you to read a script no one taught you. The footnotes map specific terrains — grief, ecstatic love, deconstruction, proximity to suicide — as physical spaces with measurable properties. Not diagnosis. Cartography.`,
  },
  {
    slug: 'silenced-headphones',
    title: 'Silenced headphones in the back of an Uber',
    archetype: 'logic', aim: 'essay', state: 'draft',
    seeded: '2026.03.11', touched: '2026.03.11',
    seed: 'A healthy adult can have silenced headphones in the back of an Uber.',
    preview: "They don't owe the driver a conversation. They don't owe the world an explanation. The smallest opt-out, performed without shame, is a marker of psychological adulthood.",
    body: `A healthy adult can sit in the back of an Uber with silenced headphones in. They don't owe the driver a conversation. They don't owe the world an explanation. The smallest opt-out, performed without shame, is a marker of psychological adulthood.`,
  },
  {
    slug: 'we-never-voted-on-the-destination',
    title: 'We Never Voted on the Destination',
    archetype: 'logic', aim: 'essay', state: 'patch-2',
    seeded: '2025.10.04', touched: '2026.04.15',
    seed: 'Civilization outsourced the meaning of life to the people least qualified to answer.',
    preview: 'They optimized for accumulation and status, so every system they built encodes their answer: growth, productivity, more. Nobody asked the rest of us.',
    body: `Civilization outsourced the definition of the meaning of life to its most powerful members — who are the least qualified to answer. They optimized for accumulation and status, so every system they built encodes their answer: growth, productivity, more. Nobody asked the rest of us.

If the meaning of life is unhurried time with people you love, then nearly every system we've built is structurally hostile to it. Not accidentally. Structurally.

This isn't anti-capitalism. This is the argument that we're succeeding at a goal nobody consciously chose. The footnotes trace how each major institution encoded a specific answer without ever asking the question.`,
  },
  {
    slug: 'the-machine-requires-feeding',
    title: 'The Machine Requires Feeding',
    archetype: 'logic', aim: 'essay', state: 'patch-2',
    seeded: '2025.10.04', touched: '2026.03.28',
    seed: 'Every technology jump promises free time. It never delivers.',
    preview: "The washing machine didn't give women leisure — it raised the bar for what clean meant. Email didn't reduce meetings. Smartphones didn't free anyone from desks.",
    body: `Every technology jump promises free time. It never delivers. The washing machine didn't give women leisure — it raised the bar for what *clean* meant. Email didn't reduce meetings. Smartphones didn't free anyone from desks. Americans don't spend saved time leisurely; they find new ways to consume. The only opt-out is to cease consuming, which isn't frugality — it's a philosophical position. The $100 bill passes back and forth and we call it GDP. The footnotes trace specific technologies and what actually happened to the free time they promised.`,
  },
  {
    slug: 'what-you-see-you-owe',
    title: 'What You See, You Owe',
    archetype: 'logic', aim: 'essay', state: 'patch-2',
    seeded: '2025.11.22', touched: '2026.04.11',
    seed: "Once you see something, you're responsible for it. Not decision — sight.",
    preview: 'Perception creates obligation. This is the mechanism by which ethical consciousness activates.',
    body: `Perception creates obligation. Once you see something, you're responsible for it. Not decision — sight. This is the mechanism by which ethical consciousness activates.

Applied to technology: once you know a tool can restore access to the disenfranchised, you must pursue it. Applied to the people you are raising: once you understand what was done wrong to you, every moment is either honoring or betraying that knowledge. Applied to the self: once you understand a loop you're hiding in, you can't hide inside it anymore.

The mechanism is the same in all three. That's the thesis. The footnotes are three separate tracks braided into the same piece — the reader who follows each one gets a different essay.`,
  },
  {
    slug: 'government-communication-problem',
    title: 'The Distance Between What Government Knows and Who Can Reach It',
    archetype: 'logic', aim: 'essay', state: 'patch-3',
    seeded: '2025.09.18', touched: '2026.04.24',
    seed: "Government doesn't have a tech problem. It has a communication problem.",
    preview: 'The current stack assumes citizens meet the system halfway. Most can\'t. Voice AI deployed correctly is a translation layer between institutional knowledge and human need.',
    body: `Government doesn't have a technology problem. It has a communication problem. And that problem isn't evenly distributed. The current stack — portals, PDFs, hold music, eligibility forms — assumes citizens meet the system halfway. Most can't. Language, literacy, access, trust.

Voice AI deployed correctly isn't automation or deflection. It's a translation layer between institutional knowledge and human need. The footnotes contain anonymized field stories where the gap between what government offers and what people can actually reach produced real human cost.`,
  },
  {
    slug: 'provocative-statements',
    title: 'Provocative statements',
    archetype: 'logic', aim: 'essay', state: 'in-progress',
    seeded: '2026.04.05', touched: '2026.04.25',
    seed: 'Artificial intelligence maximizes efficiency, but not joy.',
    preview: "It's asinine and so easy to tell when people write with artificial intelligence, because it tends to care about dopamine cycles more than knowledge transfer.",
    body: `This is where I make a really provocative statement. Not one that actually makes you think about anything, but instead one that makes you just interested enough to click "read more."

Then you make statements that set sort of some arbitrary standard, like telling you something that isn't or may only be partially true, and then following it with "instead" or "but" and making some shocking statement that makes the previous bar work to validate the thing you are about to say. It may or may not be true. You may have no data. But you make lots of statements that used to be full of em dashes, because the artificial intelligence that wrote for you thinks in a psychological recognition cycle that is both intuitive for humans to understand, and makes them think they learned something new by comparing two meaningless statements to one another.

Then, of course, you end with one more big bold claim. It's asinine and so easy to tell when people write with artificial intelligence, because it tends to care about dopamine cycles more than knowledge transfer. What you said in 8 paragraphs could have been said in one sentence. But that just makes it a tweet. And you're better than that, right? You're more important than that, right? Because it walks circles around simple statements that are enough to feel logical, enough to close the loop, but not in a way that creates any sort of real productivity.

Maybe because we are all avoiding the simplest statement there is: artificial intelligence maximizes efficiency, but not joy. And any innovation that sacrifices joy for efficiency is meaningless.

Have a nice day!`,
  },
  {
    slug: 'the-second-language',
    title: 'The Second Language',
    archetype: 'logic', aim: 'essay', state: 'patch-1',
    seeded: '2026.01.27', touched: '2026.03.19',
    seed: 'The exhaustion of performing humanity for people who get it for free.',
    preview: 'A writer flagged as AI-generated because the prose was too clear — the machines are getting better at sounding like us, and the rest of us are getting flagged for sounding like them.',
    body: `What it means to spend an entire professional life navigating neurotypical social systems technically, consciously, with effort that is invisible to those running the same systems intuitively. The exhaustion of performing humanity for people who get it for free.

A writer flagged as AI-generated because the prose was too clear — the machines are getting better at sounding like us, and the rest of us are getting flagged for sounding like them.

The footnotes make the invisible labor visible: specific translations, processing delays, the energy cost of decoding what someone meant versus what they said.`,
  },
  {
    slug: 'the-r-value-of-decency',
    title: 'The R-Value of Decency',
    archetype: 'logic', aim: 'essay', state: 'patch-2',
    seeded: '2025.12.20', touched: '2026.04.07',
    seed: 'The religion after religion: raising a better generation.',
    preview: 'Goodness spreads the way disease does — through contact, through proximity. Cross-generational moral epidemiology where the pathogen is kindness.',
    body: `If you're not going to believe in God, you have to believe you're raising a better generation. That's the replacement. That's the religion after religion.

Goodness spreads the way disease does — through contact, through proximity, not through intention or programs. Cross-generational moral epidemiology where the pathogen is kindness and the R-value compounds across lifetimes.

The novelty isn't the epidemiology of virtue — that's been touched. The novelty is framing it as what replaces faith. The infection metaphor serves the theological argument, not the other way around.`,
  },
  {
    slug: 'the-force-increases-as-you-approach',
    title: 'The Force Increases as You Approach',
    archetype: 'logic', aim: 'essay', state: 'patch-2',
    seeded: '2026.01.06', touched: '2026.04.13',
    seed: 'Grief follows an inverse-square law. Halve the distance, quadruple the force.',
    preview: "You can talk about it from a distance. Get closer and the force increases not gradually but dramatically. That's not weakness. That's physics.",
    body: `Grief follows an inverse-square law. Halve the distance to the memory, quadruple the force. You can talk about it from a distance. Get closer and the force increases not gradually but dramatically. That's not weakness. That's physics.

Love is a gravity well too — you don't gradually become more attached to a child; you pass a threshold and suddenly the force is overwhelming. Escape velocity scales the same way.

The footnotes contain the actual equations — not as decoration but as proof that this isn't metaphor. It's structural description. The prose itself densifies as the essay progresses, mirroring the physics in the footnotes. The form is the content.`,
  },
  {
    slug: 'ai-owes-a-debt',
    title: 'AI Owes a Debt',
    archetype: 'logic', aim: 'essay', state: 'patch-3',
    seeded: '2025.09.30', touched: '2026.04.22',
    seed: 'AI has a debt to the disenfranchised, not just a risk to manage.',
    preview: 'The prosthetic / exoskeleton distinction. Most of the industry is building exoskeletons and calling it democratization.',
    body: `AI ethics writing is almost entirely about restriction — what AI shouldn't do. This is about obligation — what AI *owes*.

The prosthetic / exoskeleton distinction: an exoskeleton makes capable people more capable; a prosthetic restores function to someone who couldn't participate without it. Most of the industry is building exoskeletons and calling it democratization. AI has a debt to the disenfranchised, not just a risk to manage. Government services are where this distinction matters most.

The footnotes are anonymized stories from the field — moments where the system failed a person and a voice could have changed it.`,
  },
  {
    slug: 'eden-wrong-story',
    title: 'Eden Was the Wrong Story All Along',
    archetype: 'logic', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "The Fall isn't a fall. It's a graduation the storyteller didn't approve of.",
    preview: "Companion essay to *Once Upon a Time in Eden*. Eden's expulsion is a coming-of-age narrative deliberately mistold by an institution that needed obedience to outweigh growth.",
    pairs_with: ['once-upon-a-time-in-eden-lyric'],
    body: `*Once Upon a Time in Eden* was the imaginative move. This is the structural one. Every coming-of-age myth in the human canon involves a child who eats forbidden knowledge and becomes a person. Eden is the only one where this is framed as a tragedy.

The essay argues this isn't a religious accident — it's institutional design. A theology that needs obedient adults has to mistell the universal story of becoming one. The footnotes trace the parallel myths the LDS-and-broader-Christian frame had to suppress to keep Eden working: Prometheus, the Buddha leaving the palace, the boy in nearly every initiation rite from every continent. Each of them is structurally identical to Eve — a child encountering forbidden knowledge and choosing it — and each of them is told *as the heroic move,* not the fall.

The essay doesn't argue Christianity is wrong. It argues Eden is *miscategorized,* and that recategorizing it returns the story to what it always was: a graduation.`,
  },
  {
    slug: 'rooms-within-rooms',
    title: 'Rooms Within Rooms',
    archetype: 'logic', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Institutions don't have causes. They have rooms where causes are metabolized into procedure.",
    preview: 'The compressed thesis behind *Rooms*. Every major institution has rooms in which the original cause is processed through procedural metabolism until what emerges is unrecognizable from what entered.',
    pairs_with: ['we-never-voted-on-the-destination'],
    body: `*Rooms* traced this through the Iran war specifically. This essay extracts the general principle. An institution doesn't *believe* anything; it has rooms — committees, briefings, working groups, drafting sessions — in which the original cause enters and procedure happens to it. By the time the cause exits the last room, it has been translated into action items, risk frameworks, talking points, budget lines. The cause is no longer there; only its administrative residue.

This isn't corruption — it's the metabolic process of institutions, working as designed. The essay argues that the way to read any institutional position is *backward through the rooms* — what entered, what each room did to it, what came out. Most political analysis stops at the output.

The footnotes are room-by-room reconstructions of three institutional positions: a corporate ESG statement, a denominational doctrinal pronouncement, a national war authorization.`,
  },
  {
    slug: 'tzimtzum-engineering',
    title: 'Tzimtzum as the First Engineering Decision',
    archetype: 'logic', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "God's first act wasn't creation. It was withdrawal. That's an architecture choice and it has consequences.",
    preview: 'The opening move of the physics-as-religion book. The Lurianic concept of tzimtzum read as a structural decision rather than a theological one, with downstream implications.',
    pairs_with: ['what-grows-in-wreckage', 'sefirot-cognitive-architecture'],
    body: `Most cosmologies start with God making something from nothing. The Lurianic frame is stranger and more accurate: God starts by *withdrawing* — contracting to leave a void in which something other than God can exist.

The essay argues this isn't mysticism dressed up — it's the first engineering decision in the universe, and every subsequent structure inherits its constraints from it. A God who fills everything cannot have a creation that is genuinely other; only a God who has withdrawn can. The physical universe is what fills the withdrawn space, but it has to operate by rules God doesn't override, or the withdrawal wasn't real. This is the structural origin of natural law.

The essay then maps the Big Bang onto tzimtzum: not creation ex nihilo, but the *moment of withdrawal,* with the subsequent expansion as the void filling. Not the same event reframed. The same event, correctly named.

The footnotes weave Lurianic kabbalah, modern cosmology, and a footnote on why the LDS framing of God-as-embodied-being couldn't generate this insight, and what the tradition costs itself by foreclosing it.`,
  },
  {
    slug: 'sefirot-cognitive-architecture',
    title: 'The Sefirot Are a Cognitive Architecture',
    archetype: 'logic', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "The kabbalistic tree isn't a mystical diagram. It's a cognitive architecture diagram, drawn before we had the vocabulary.",
    preview: 'The ten sefirot mapped to Logic / Psyche / Instinct, with the structural argument that this isn\'t projection — the kabbalists figured out the architecture first.',
    pairs_with: ['tzimtzum-engineering'],
    body: `The standard reading of the sefirot is as emanations of divine attributes. The essay argues this is downstream of a more interesting fact: the structure the kabbalists drew is *also* a precise model of human consciousness, drawn before the vocabulary for that existed.

Three columns — severity, mercy, balance — map to Instinct, Psyche, and Logic with very little distortion. The vertical descent maps to the order of operations: Keter (will) initiates, the tree branches into faculty, Malkuth (manifestation) closes.

The essay is careful not to over-claim. It doesn't argue the kabbalists secretly knew modern psychology. It argues something stranger: that any sufficiently careful introspective tradition will arrive at roughly the same architecture, because the architecture is *real,* and Kabbalah is one of the cleanest renderings we have. The Logic/Psyche/Instinct framework is another rendering of the same structure.

The footnotes do the side-by-side mapping and flag where the correspondence breaks down (where it does, the mapping is more interesting, not less).`,
  },
  {
    slug: 'aws-of-voice',
    title: 'The AWS of Voice',
    archetype: 'logic', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "ElevenLabs isn't a voice company. It's the substrate the next decade of vertical AI will be built on.",
    preview: 'Why voice infrastructure is in the same structural position cloud infrastructure was in 2008, and why companies that don\'t build on top will be leapfrogged within weeks.',
    pairs_with: ['government-communication-problem', 'ai-owes-a-debt', 'the-resolution-layer'],
    body: `In 2008, "we have our own data center" was a competitive advantage. By 2014, it was a liability — companies running their own infrastructure had effectively decided to compete with AWS on something AWS was orders of magnitude better at.

Voice infrastructure is at the equivalent inflection point. Companies currently building their own STT/TTS/orchestration are committing to compete on a substrate problem instead of focusing on their actual vertical. The essay argues this is not strategy; it's misdiagnosis.

The platform pattern repeats: the substrate provider builds horizontal capability, vertical players build the actual product on top, and the companies that try to do both lose to specialists at both levels. Voice is now the substrate. The vertical opportunities — healthcare, government, collections, education, accessibility — are in the application layer. The leapfrog timeline isn't years; it's weeks, because the substrate now updates continuously and the vertical players ride those updates.

The footnotes are the specific capabilities released in the last six months that companies still building in-house haven't matched.`,
  },
  {
    slug: 'the-resolution-layer',
    title: 'The Resolution Layer',
    archetype: 'logic', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Citizens and government don't have a communication problem. They have a resolution problem. That distinction is everything.",
    preview: 'The ElevenCivic thesis articulated. Why "communication" undersells what\'s broken between citizens and government, and why "resolution" is the precise word.',
    pairs_with: ['government-communication-problem', 'ai-owes-a-debt'],
    body: `"Government has a communication problem" is true but soft. This essay sharpens it. What's actually broken is *resolution* — the function by which a citizen with a need encounters a system with a process and either gets resolved or doesn't.

Communication is one input to resolution; eligibility logic, document handling, escalation paths, language translation, trust calibration are others. ElevenCivic isn't selling communication to government; it's selling resolution as a layer.

The essay walks through what resolution-as-a-service actually means: the citizen's request enters voice, gets parsed into structured intent, gets matched to the right administrative pathway, gets shepherded through it with status visibility, and exits with a real outcome — not a referral, not a portal link, not a hold queue.

The essay names the three institutional barriers (procurement frameworks designed against this, civil service incentives misaligned with this, vendor capture by legacy contractors) and the three citizen-side barriers (literacy, trust, time) and argues resolution-as-a-service has to address all six to be real.`,
  },
  {
    slug: 'the-stopping-number',
    title: 'The Stopping Number',
    archetype: 'logic', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Most ambition has no stopping condition. That's why it eats the people who hold it.",
    preview: 'The $10M-and-stop frame argued explicitly. Why the absence of a stopping condition is the structural source of most professional misery.',
    pairs_with: ['we-never-voted-on-the-destination', 'the-machine-requires-feeding'],
    body: `Standard ambition is unbounded — *more, better, higher* — with no condition under which the wanting ceases. The essay argues this is not ambition, it's a metabolic disorder.

Real ambition has a stopping number: the amount, achievement, scale, or completion at which the ambition has been fulfilled and the holder is free. $10M lifetime is one stopping number. Twenty-five-person studio is another. *Beautiful home office grandpa* is a third.

The essay argues that naming the stopping number — and meaning it — is the most consequential act available to a person in late-capitalism, because the entire economic engine relies on stopping numbers being unspecified. The unspecified-stop is what produces the founder who sells, immediately starts a new company, sells, starts another. The specified-stop produces the founder who sells, builds the home office, and stays.

The footnotes contrast specific public figures who named stopping numbers and held them with those who didn't.`,
  },
  {
    slug: 'sparseness-earned',
    title: 'Sparseness Earned',
    archetype: 'logic', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Symbolism doesn't get to be powerful. It has to earn the right to mean something.",
    preview: 'The aesthetic doctrine behind everything Melody Jack publishes, made explicit. Why nine colors instead of fifty, why three modes instead of twelve.',
    body: `Most contemporary creative work fails by addition — more characters, more references, more callbacks, more lore. The essay argues for the opposite discipline: every symbol in a body of work has to earn its meaning by being *load-bearing in multiple pieces.* Nine colors, not fifty. Three modes, not twelve. Logic, Psyche, Instinct repeated until each carries the weight of every prior appearance.

The Hades 2 example is precise: there are not many gods in that game compared to other entries in its genre, and each god gets repeated visual, dialogic, and mechanical reinforcement until they become genuinely meaningful symbols rather than items in a catalog. Hades 2 earns its symbolism. Most games don't.

The essay generalizes: the discipline of *fewer symbols, deeper repetition* is what separates work that lands from work that decorates. The footnotes are case studies — Hades, Disco Elysium, Annihilation, McCarthy.`,
  },

  // ─── PSYCHE (Nest) — 13 cards ─────────────────────────────────
  {
    slug: 'on-the-spiral-sooner',
    title: 'On the spiral sooner',
    archetype: 'psyche', aim: 'essay', state: 'patch-1',
    seeded: '2026.02.15', touched: '2026.03.30',
    seed: "Autism just means you're on the spiral sooner.",
    preview: "Same spiral, same questions, just arrived earlier and harder. The work isn't to leave the spiral. It's to learn to live there with grace.",
    body: `Autism just means you're on the spiral sooner. Same spiral, same questions, just arrived earlier and harder. The work isn't to leave the spiral. It's to learn to live there with grace before the people next to you understand they're on it too.`,
  },
  {
    slug: 'no-one-will-remember',
    title: 'No one will remember this in two seconds',
    archetype: 'psyche', aim: 'essay', state: 'draft',
    seeded: '2026.03.22', touched: '2026.03.22',
    seed: 'No one looking at you will remember this moment in two seconds.',
    preview: 'People love those with no regard for being watched intently enough as to be held against you. The cost of self-consciousness is paid in advance — and then forgotten by everyone but you.',
    body: `You get there eventually. No one that is looking at you will remember this moment in 2 seconds. People love those with no regard for being watched intently enough as to be held against you. The cost of self-consciousness is paid in advance — and then forgotten by everyone but you.`,
  },
  {
    slug: 'compliment-or-stupid',
    title: 'Compliment or insult on realization?',
    archetype: 'psyche', aim: 'essay', state: 'patch-1',
    seeded: '2026.02.28', touched: '2026.04.02',
    seed: 'When you come to a realization do you compliment yourself or call yourself stupid?',
    preview: 'If stupid, you need therapy. The reflexive shape of your inner voice when you discover something is the diagnostic.',
    body: `When you come to a realization, do you compliment yourself or tell yourself you're stupid? If stupid, you need therapy. The reflexive shape of your inner voice when you discover something is the diagnostic. It tells you which adult is teaching the kid in there how to learn.`,
  },
  {
    slug: 'psychogeography-mapped',
    title: 'Interior Psychogeography, Mapped',
    archetype: 'psyche', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: 'The interior has actual cartography. Here are the maps.',
    preview: 'Companion to *psychogeography-interior*. Where that note named the structural reality, this one *draws the maps.* Specific terrains rendered as actual geography.',
    pairs_with: ['psychogeography-interior', 'the-force-increases-as-you-approach'],
    body: `*psychogeography-interior* argued the principle. This essay does the cartography. Each section is a map.

Grief: a crater of varying radius depending on whose loss; the inverse-square law described in *the-force-increases-as-you-approach* is the slope function of the crater wall.

Ecstatic love: an upward gravity well, escape velocity scaling identically to grief but inverted.

Faith deconstruction: a collapsed cathedral with the foundation still load-bearing for structures the deconstructor doesn't yet see.

Proximity to suicide (your own or someone you love's): a region of altered light where ordinary objects cast different shadows; the alteration is real and measurable but reverses upon distance.

The essay argues these maps aren't metaphors and aren't diagnostic categories — they're the actual structure of inner space, and recognizing them as such changes how you navigate them. The footnotes contain the literal cartographic conventions: contour lines for emotional gradient, water symbols for grief permanence, etc. Drawn maps would accompany the essay if it became a printed piece.`,
  },
  {
    slug: 'the-pale-was-wrong',
    title: 'The Pale Was Wrong',
    archetype: 'psyche', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Disco Elysium's pale is the cleanest version of a wrong idea: that legibility ends at the edge of the self.",
    preview: 'The pale, the dérive, the fog — every dominant cultural metaphor for the boundary of selfhood says the same thing, and they\'re all wrong in the same way.',
    pairs_with: ['psychogeography-interior'],
    body: `Disco Elysium's pale is brilliant — and brilliant precisely because it crystallizes the dominant Western misreading of psychological boundary states. The pale says: at the edge of selfhood, things stop making sense.

The essay argues this is the wrong move, and that the more interesting truth is: at the edge of selfhood, things make a *different* kind of sense — legibility your wiring isn't built to run. Not nonsense. *Foreign sense.*

This distinction matters because the pale-frame produces fear; the foreign-sense frame produces curiosity. People in psychological crisis aren't disoriented because reality has stopped being legible — they're disoriented because reality has become legible *in a register they were never taught.* The work isn't returning to the familiar register; it's learning the new one.

The essay traces the misreading across Disco Elysium, the Situationist dérive, most literary treatments of psychological breakdown, and argues for replacing the pale-image with a translation-image. The footnotes are alternative metaphors that better preserve the foreign-but-legible quality.`,
  },
  {
    slug: 'the-soul-bond',
    title: 'The Soul Bond',
    archetype: 'psyche', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Some relationships aren't categories. They're a different ontological class.",
    preview: 'From the Book of Shadows codex. The Hades 2 *Soul Bond* relation isn\'t a romance trope — it\'s a real category that human language doesn\'t have a word for.',
    pairs_with: ['the-relationship-codex'],
    body: `Romantic-partner language collapses several distinct relational categories into one. The Soul Bond, as Hades 2 renders it, is one of those categories made visible by the genre's mechanical specificity: a relation in which two consciousnesses become structurally interdependent without either being absorbed.

Not enmeshment. Not codependence. Not standard partnership. A third thing the language doesn't reach.

The essay argues this category is real, rare, and identifiable by specific markers — long mutual cognitive scaffolding, the ability to think *as a pair* without losing individuation, a shared field of attention that persists across distance.

Most spouses are not Soul Bonds, and that's not failure — it's that the Soul Bond is genuinely uncommon and most marriages serve different, equally valid purposes. The essay is careful: it's not arguing Soul Bond is *better,* only that it's *different,* and that mistaking one for the other produces specific kinds of suffering on both sides. The footnotes draw the distinction with examples from games and literature.`,
  },
  {
    slug: 'the-unseen',
    title: 'The Unseen',
    archetype: 'psyche', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: 'Some people stay with you by leaving an absence with a specific shape.',
    preview: 'The Hades 2 Unseen relation applied to grief that has lasted years. Not "moving on," not "honoring the memory" — *ongoing relationship with the unseen.*',
    pairs_with: ['the-force-increases-as-you-approach'],
    body: `The Unseen, in Hades 2, are the figures whose absence is felt continuously and whose relation to the living continues to develop despite their absence.

The essay argues this is the most accurate frame for grief that has lasted years and decades — not "moving on," not "getting over," not "honoring the memory" (which freezes the lost person at the moment of loss), but *ongoing relationship with the unseen.* A brother who died at sixteen is sixteen forever in the photograph, but the brother in your interior parliament is forty. He's grown up alongside you, in a separate room. He has opinions about your kids he never met. He still argues with you. A best friend who died at thirty is the same.

The essay is careful — this isn't mysticism, and isn't pathology either; it's a third option psychology hasn't named. Most grief literature pushes toward closure; the Hades-2 frame allows for *ongoing,* and the essay argues this is healthier for some classes of loss. The footnotes are conversations — actual exchanges, transcribed — between the present-day self and the Unseen.`,
  },
  {
    slug: 'the-companion',
    title: 'The Companion',
    archetype: 'psyche', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Some relationships aren't deep. They're durable. Don't underrate the second.",
    preview: 'Third in the relational typology drawn from Hades 2. The Companion — the relation that doesn\'t go deep but goes long.',
    pairs_with: ['the-relationship-codex', 'the-soul-bond'],
    body: `Soul Bonds and the Unseen are intense. Companions are something else: the relations that don't ask for depth but provide *continuity,* and the essay argues these are structurally as important as the deep ones.

The cousin who's been there since childhood. The colleague-friend who lasts twenty years on shallow contact and is reliable precisely because depth was never demanded. Companions provide the third axis depth-relations can't: they offer the experience of being *seen across time* without the high bandwidth of being seen deeply.

Both are required for a complete relational life. People who only have deep relations are exhausted; people who only have companions are unmet.

The essay argues for naming and tending companion-relations on their own terms — not as failed deep-relations or proto-deep-ones, but as their own valid category. Brief, with examples.`,
  },
  {
    slug: 'fondly-companion',
    title: 'Fondly (companion seed)',
    archetype: 'psyche', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Fondly is the word for what survives when love can't.",
    preview: 'Companion to the existing piece *Fondly*. The affection that outlives the relationship, persists past the rupture, remains real even when the conditions for it have vanished.',
    body: `*Fondly* the piece did the work. This is the seed for the companion. The word itself is precise in a way English rarely is: *fondly* describes a kind of love that has been processed by time into something quieter and more durable than the original feeling.

You think of someone fondly who hurt you. You think of an era fondly even if you wouldn't return to it.

The lyric argues that fondness is what survives when love can't — it's the residue, but residue in the chemical sense: the load-bearing material left after the volatile elements evaporate.

Most adult relational life is held together by fondness, not love, and the people who can metabolize the transition without bitterness are operating with a kind of grace the culture doesn't have a word for. *Fondly is the grace.*`,
  },
  {
    slug: 'the-open-letter-form',
    title: 'The Open Letter',
    archetype: 'psyche', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Writing a letter you know will never be read changes you. Writing one that *will* be read by the named recipient changes both of you.",
    preview: 'A reflection on the form, drawn from the open letter to LDS leadership. Why the public-but-named open letter is a distinct genre with distinct ethics.',
    body: `Open letters break the privacy of correspondence on purpose. The essay argues this is a real ethical move and one most writers handle poorly: addressing a powerful figure publicly without the protection of pseudonymity, with full names, in language they can read and respond to.

The genre demands a discipline most public writing doesn't: every claim has to be defensible to the named recipient, in court if needed; every emotional charge has to be load-bearing rather than performative; every sentence has to survive being read aloud at the recipient's kitchen table.

The essay traces the form from Zola's *J'accuse* through MLK's *Letter from Birmingham Jail* to the contemporary versions, and argues most contemporary open letters are bad because they violate the ethical constraints — they're public-shaming dressed as letters.

The footnotes do a teardown: what the LDS open letter did, what the form requires, where most open letters fail.`,
  },
  {
    slug: 'the-medea-move',
    title: 'The Medea Move',
    archetype: 'psyche', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Medea isn't a villain. She's the moment a woman realizes the rules don't include her.",
    preview: 'Companion to the Medea retelling. Medea has been miscategorized for two millennia because the readers were inside the system she was breaking.',
    pairs_with: ['eden-wrong-story'],
    body: `Greek tragedy hands us Medea as warning: a woman whose passion overpowers her humanity. The essay argues this is the reading the original audience needed and the modern reader doesn't have to inherit.

Medea, read carefully, is the moment a person realizes the contract she signed in good faith was never going to be honored, and her response — terrible, irreversible — is structurally a *recognition* before it's a violence. The retelling does the work of relocating reader-sympathy without absolving the act.

The essay generalizes: good retelling isn't reversal (the villain becomes the hero); it's *recategorization* (the act becomes legible from inside the actor). Frankenstein, Lilith, Cain, Eve — all benefit from the same move.

The footnotes argue against the cheap retelling (the villain is misunderstood, actually) and for the real one (the villain is correctly understood, finally).`,
  },
  {
    slug: 'ketamine-cartography',
    title: 'Ketamine as Cartography',
    archetype: 'psyche', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "The medicine isn't healing the wound. It's letting you see the map.",
    preview: 'Reframing ketamine therapy from the dominant therapeutic narrative (it heals) to a more accurate one (it provides temporary access to terrain you can\'t otherwise survey).',
    pairs_with: ['psychogeography-interior', 'psychogeography-mapped'],
    body: `The dominant ketamine narrative is therapeutic: the medicine treats depression, processes trauma, repairs the brain. The essay argues this language is borrowed from pharmaceutical framing and undersells what's actually happening.

Ketamine doesn't heal anything by itself; it provides temporary access to terrain — interior geography you couldn't survey at baseline because the survey instruments (defenses, identifications, narrative coherence) interfere with the readings. During the session, the instruments quiet and the geography becomes visible.

The healing — if it happens — happens in the *days following,* when you have a map you didn't have before and can navigate accordingly.

The essay is careful: this frame doesn't make ketamine a recreational drug, and the harm-reduction framing matters; access to interior terrain you can't metabolize is dangerous. But the cartographic frame produces better outcomes than the therapeutic one because it correctly assigns the work: the medicine surveys, you navigate.

The footnotes describe the actual cartographic discipline — what to bring into a session, what to record, how to use the map afterward.`,
  },
  {
    slug: 'archive-that-sings',
    title: 'The Archive That Sings',
    archetype: 'psyche', aim: 'essay', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "The hymn still moves you. That's data, not weakness.",
    preview: 'A short piece on the persistent emotional power of religious music after deconstruction. Why the body responds even when the belief has dissolved.',
    body: `Most ex-religious people report the same thing: the hymn from childhood still moves them. The standard interpretation treats this as nostalgia or unreconstructed conditioning. The essay argues both are wrong.

Religious music — particularly LDS hymns, Catholic chant, gospel — is *technologically optimized* across centuries to produce specific somatic states. The body responds because the technology works, regardless of what the body now believes. Recognizing this isn't capitulation to belief; it's an accurate reading of the artifact. The hymn is a piece of nervous-system hardware that still functions.

The essay argues for keeping access to this technology — playing the music, attending the occasional service, singing privately — without the theological obligations that originally accompanied it. The archive that sings is a resource, not a regression.`,
  },

  // ─── INSTINCT (Slash) — 17 cards ──────────────────────────────
  {
    slug: 'love-only-by-loving',
    title: "Make art that you'd love only by loving it",
    archetype: 'instinct', aim: 'lyric', state: 'patch-1',
    seeded: '2025.12.14', touched: '2026.02.06',
    seed: "Make art that you'd love only by loving it.",
    preview: "The art doesn't have to be lovable to anyone else first. It has to be lovable to you, by you, while you make it. Affection is a method, not a reception.",
    body: `The art doesn't have to be lovable to anyone else first. It has to be lovable to you, by you, while you make it. Affection is a method, not a reception.`,
  },
  {
    slug: 'forty-balls',
    title: 'Forty Balls',
    archetype: 'instinct', aim: 'lyric', state: 'patch-1',
    seeded: '2026.01.19', touched: '2026.03.04',
    seed: 'Forty mental objects. All day long.',
    preview: 'Why directions don\'t stick. Why doing the laundry is an achievement, not a baseline. Why adding one more small task represents the accumulation of a year of stabilizing everything else first.',
    body: `What it actually feels like to manage forty mental objects simultaneously all day long. Why directions don't stick. Why doing the laundry is an achievement, not a baseline. Why adding one more small task to the load represents the accumulation of a year of stabilizing everything else first.

Not a disability narrative. A description of operating cost. The energy bill for being built this way.`,
  },
  {
    slug: 'have-you-ever-actually-rested',
    title: 'Have You Ever Actually Rested?',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.03.16', touched: '2026.03.16',
    seed: 'Have you ever actually rested? Not slept. Rested.',
    preview: 'Not slept. Not recovered. Rested — in the sense of every force inside you going quiet at the same time. The honest answer for most people built to juggle is no.',
    body: `Not slept. Not recovered. Rested — in the sense of every force inside you going quiet at the same time. The honest answer for most people built to juggle is no.

So describe what gets built instead. The simulation of rest. The managed tension that passes for peace. Day Seven is a fiction the living invented because reality wouldn't provide a pause button. A couch at 9pm after the kids are down isn't rest. It's the closest approximation the wiring will allow.

Heavy quick essay. No resolution. The piece ends where the honesty does.`,
  },
  {
    slug: 'it-pleases-me',
    title: 'It pleases me and I hurt no one',
    archetype: 'instinct', aim: 'lyric', state: 'patch-1',
    seeded: '2025.11.28', touched: '2026.01.22',
    seed: 'It pleases me and I hurt no one, including my spirit.',
    preview: "The whole sentence. The whole defense. That's it.",
    body: `It pleases me and I hurt no one, including my spirit. The whole sentence. The whole defense. That's it.`,
  },
  {
    slug: 'what-grows-in-wreckage',
    title: 'What Grows in Wreckage',
    archetype: 'instinct', aim: 'lyric', state: 'patch-2',
    seeded: '2025.10.30', touched: '2026.04.16',
    seed: "After the worst periods, things grow that you didn't plant.",
    preview: 'Prose poem. After God died, the fragments settled. Gravity gathered what remained. Chemistry complexified.',
    body: `Prose poem. After God died, the fragments settled. Gravity gathered what remained. Chemistry complexified. Life wasn't a miracle — it was an inevitability. Matter given freedom will eventually start copying itself.

After the worst periods, things grow that you didn't plant. Not grace. Not design. Composting. The dead body becoming soil becoming forest because that's what dead things do when you give them enough time.

Short. Dense. Every sentence load-bearing.`,
  },
  {
    slug: 'once-upon-a-time-in-eden-lyric',
    title: 'Once Upon a Time in Eden (lyric)',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: 'The garden is still there. They never left. The story you were told about the leaving is what left.',
    preview: 'Companion to the existing *Once Upon a Time in Eden*. The lyric distillation — three paragraphs that sit alongside the longer piece, not summarize it.',
    pairs_with: ['eden-wrong-story'],
    body: `Companion lyric to the existing piece. The published *Eden* did the long imaginative work. This is the short instinctive one. Three paragraphs.

The garden is still there. The fruit is still hanging. The serpent is still patient. What changed is the story — the Fall is the wrong word; the leaving is the wrong frame; even the *naming* of the trees was an act of misdirection.

The lyric ends with the line: *They didn't leave the garden. The garden became a country, and they were taught to call it exile.*

Spare. Imagistic. Sits next to the longer piece as its instinct-mode shadow.`,
  },
  {
    slug: 'the-nine-colors',
    title: 'The Nine Colors',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: 'Brown is the soil. Blue is the room. Yellow is the lamp. Red is the pulse. Gold is the rare yes. Silver is the long memory. Teal is the threshold.',
    preview: 'A lyric meditation on the Melody Jack palette as a *cosmology*, not a style guide. Each color is a function in the world, not a decoration of it.',
    pairs_with: ['sparseness-earned'],
    body: `The Melody Jack palette is nine colors and the existing identity work assigns them. The lyric argues these aren't aesthetic choices — they're a small cosmology, each color performing a function in the work it appears in.

Brown is the soil all the work grows from. Blue is the inner room. Yellow is the working lamp. Red is the pulse beneath the work. Gold is the rare yes — used sparingly, weight-bearing only when earned. Silver is the long memory, the patina, the work that has been touched many times. Teal is the threshold between modes, the color of transition itself.

The lyric is short. Each color gets a sentence. Together they form a creed for the visual identity that the public-facing color guide can't say outright but everything Melody Jack publishes will obey.`,
  },
  {
    slug: 'disco-elysium-voices',
    title: 'Disco Elysium Voices',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Inland Empire was right. Logic was right. Half Light was right. They just weren't right at the same time.",
    preview: 'The Disco Elysium voice mechanic as a model for self-listening. Each voice is right *about its own domain.*',
    pairs_with: ['compliment-or-stupid', 'sefirot-cognitive-architecture'],
    body: `Disco Elysium gives Harry twenty-four voices and lets each one weigh in on every situation. The genius of the design is that the voices are all *correct* — about their own domain.

Logic is right about logic. Half Light is right about danger. Inland Empire is right about meaning. They're wrong only when consulted out of domain: Half Light asked about logic produces paranoia; Inland Empire asked about danger produces hesitation.

The lyric argues this is the actual structure of the human interior, and the work of self-listening isn't suppressing voices or amplifying one — it's *routing the question to the voice qualified to answer it.*

Three paragraphs. Ends with: *The voice that answers the wrong question is not your enemy. It's just out of domain.*`,
  },
  {
    slug: 'hades-2-hours',
    title: 'The Hades 2 Hours',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: 'Some games teach you how to live. The trick is letting them.',
    preview: 'A short lyric on Hades 2 as a teaching artifact — what the game taught about love, loss, repetition, gods, kindness.',
    body: `Most games are entertainment. A few are teaching artifacts disguised as entertainment. Hades 2 is one of those few.

The lyric is a list of what the game taught, set as paragraph fragments: *return to the same task with a slightly different self, and the task changes. Some absences are presences. The dead keep evolving. Kindness to a god you'll see again is a different kind of move than kindness to one you won't. Some weapons are extensions of your hand and some are translations of your grief. Power is what you give back, not what you keep.*

The lyric is brief and unapologetic about taking a video game seriously. It ends with: *I learned more about love from Melinoë than from most novels. That's not a defect of the novels. It's the achievement of the game.*`,
  },
  {
    slug: 'neurospice-lyric',
    title: 'Neurospice (lyric)',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Not a disorder. A spice. Used wrong, it ruins the dish. Used right, it's the only reason the dish is memorable.",
    preview: 'Companion to the existing *Neurospice* essay. The lyric does the image where the essay did the argument.',
    pairs_with: ['forty-balls', 'the-second-language'],
    body: `The published *Neurospice* did the longer work. This is the instinct-mode companion. Three paragraphs. Image-first.

*Spice in the dish. Used wrong, it ruins everything; you can't taste anything else. Used right, it's the only reason anyone remembers what they ate. The dish doesn't need to apologize for the spice. The spice doesn't need to apologize for the heat. The cook needs to know the spice. That's the only requirement.*

Sits next to the essay as its lyric form.`,
  },
  {
    slug: 'floor-with-rusty',
    title: 'The Floor with Rusty',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: 'He just learned to laugh at peekaboo. There is no more important room in the world than this one.',
    preview: 'Two paragraphs. The smallest possible piece. About being on the floor with a one-year-old discovering object permanence.',
    pairs_with: ['parenting-is-nudging'],
    body: `Two paragraphs. He just learned to laugh at peekaboo. The laugh is unselfconscious in a way no laugh you'll ever produce again can be — it's pure, it's surprised, it's discovering the world. You're on the floor.

Slack is happening somewhere. Email is happening somewhere. The deck is unfinished. The strategy is unwritten. None of those rooms exist right now. There is only this room, and in this room, a small person is learning that the world hides and reveals itself, and the appropriate response is delight.

The piece ends: *Be in the room.*`,
  },
  {
    slug: 'jezerea-kitchen',
    title: 'Jezerea, Alone in the Kitchen',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "The conversation you're having and not the one you're rehearsing.",
    preview: "Late evening. The kitchen. The actual partner across the counter. The discipline of being there for the conversation that's happening rather than the one your interior parliament keeps drafting.",
    pairs_with: ['the-soul-bond'],
    body: `Three paragraphs. Jezerea is at the counter cutting something. The kids are down. The day's frame is finally lifting. The temptation is to bring the day in with you — the deal, the strategy, the small frustrations — to make the kitchen the place where you process.

The discipline is not doing that. The discipline is the conversation that's *actually happening,* which is about her sister, which is about a memory from last summer, which is about something Lennon said that you missed.

The piece argues, by demonstration, that the marriage isn't sustained by the deep conversations alone; it's sustained by *being in the kitchen one conversation at a time,* paying attention to the one happening, not the one you'd rather be having. Ends: *The conversation she's offering is the one. Take it.*`,
  },
  {
    slug: 'ten-year-studio',
    title: 'The Ten-Year Studio',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: 'A desk. A window. A specific kind of light. Twenty-five people who chose this. The work that made them choose it.',
    preview: 'The future studio rendered as a specific image, not a plan. The discipline of imagining the destination so vividly that present-day choices begin to bend toward it.',
    pairs_with: ['the-stopping-number'],
    body: `Three paragraphs. A desk by a window. The window faces north because north light is the steadiest. There are twenty-five people, and you know each of their names and the work they're doing today. The work is the kind that requires this many people and not one more.

The morning meeting is fifteen minutes and ends. The rest of the day is making things. The room smells like old wood and coffee. There's a dog.

The lyric doesn't argue. It just renders the image clearly enough that the present-day choices — which book to read, which call to take, which skill to deepen — start tilting toward it without instruction. *The studio is being built right now, in choices you're making this week. Make them like the studio is real, because it is.*`,
  },
  {
    slug: 'olympians-breakfast',
    title: 'The Olympians at Breakfast',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: 'Owen is a god. Lennon is a god. Rusty is a god. The breakfast table is the council.',
    preview: 'From the Book of Shadows codex. Three paragraphs treating the kids as Olympians without irony.',
    pairs_with: ['parenting-is-nudging', 'the-r-value-of-decency'],
    body: `Three paragraphs. The Book of Shadows codex names them: Owen, Lennon, Rusty as Olympians. The lyric makes the image small and concrete.

The breakfast table. Three deities, each with their own domain — Owen the older, careful, pattern-finder; Lennon the bright, the sharp, the lover of beauty; Rusty the new arrival, still being assigned attributes by the universe.

You are the parent and also the witness — the one whose job is to *attend the council seriously,* to honor each god's domain, to not collapse them into "the kids." Each child is their own myth in formation, and the breakfast table is where the myths get reinforced or eroded. The lyric doesn't moralize. It just sits at the table and watches.`,
  },
  {
    slug: 'animal-that-survived',
    title: 'The Animal That Survived',
    archetype: 'instinct', aim: 'lyric', state: 'draft',
    seeded: '2026.04.26', touched: '2026.04.26',
    seed: "Underneath all the layers, the animal is still here. It's the reason any of this works.",
    preview: 'Two paragraphs. The survival of the animal-self underneath every adult role — and the practice of acknowledging it before any of the layers can function.',
    pairs_with: ['it-pleases-me'],
    body: `Two paragraphs. The animal that survived your childhood is still in you. It survived loss, faith collapse, the institutions, the performances. It is the reason your work has weight, your love has heat, your presence has charge.

The layers — manager, parent, partner, writer — only function because the animal is alive underneath. People who have lost contact with the animal produce competent, lifeless work.

The discipline is acknowledging the animal first, every morning, before the layers go on. *The animal is the part of you that gets to want things without justification. Honor it before the day claims you.*`,
  },
];

console.log(`Seeding ${CARDS.length} cards →  ${OUT}/`);
for (const c of CARDS) {
  writeFileSync(join(OUT, `${c.slug}.mdx`), mdxFor(c));
}
console.log('Done.');
