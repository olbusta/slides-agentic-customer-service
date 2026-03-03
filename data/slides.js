/**
 * Slides Data
 *
 * Add, remove, or reorder entries to change the presentation.
 * The slide counter in the navigation is automatically calculated from this array.
 *
 * TEMPLATES
 * ---------
 * "title-team"   – Hero slide with title, subtitle, and person cards
 * "grid"         – Label + title + 2- or 3-column card grid
 * "format-card"  – Label + title + featured card + footnote card
 * "philosophy"   – Centered icon + title + pull quote + 2-up grid
 * "tracks"       – Label + title + 3-column skill-level grid
 * "timeline"     – Dark background milestone timeline
 * "big-picture"  – Dark background 3-column icon grid + closing quote
 * "closing"      – Question / closing slide with team pills + summary box
 *
 * ICON NAMES (for `icon` fields)
 * --------------------------------
 * check, x, warning, lightning, bulb, wrench, people, link, file,
 * globe, repeat, question, sun, calendar, layerfile, arrows-repeat
 */
window.SLIDES_DATA = [
  // ─── SLIDE 1 ─────────────────────────────────────────────────────────────
  {
    template: "title-team",
    background: "dark",
    title: "AI Workshop Playbook",
    subtitle: "DXD AI Jam · Feb 2026",
    people: [
      { initial: "J", name: "Jesús",    location: "Spain"       },
      { initial: "L", name: "Leo",      location: "Netherlands"  },
      { initial: "O", name: "Olof",     location: "Sweden"       },
      { initial: "X", name: "Xiaoying", location: "Netherlands"  },
      { initial: "Y", name: "You?",     location: "Join us", ghost: true },
    ],
  },

  // ─── SLIDE 2 ─────────────────────────────────────────────────────────────
  {
    template: "grid",
    background: "light",
    label: "The problem",
    title: "The Designer's Bottleneck",
    columns: 2,
    footnote: "Ask: \"How many of you have tried VS Code or Cursor?\"",
    items: [
      {
        icon: "x",
        accentColor: "#c44",
        title: "The handoff trap",
        body: "Great idea in Figma, hand off to engineering, wait weeks for feedback. Momentum lost, iteration too slow.",
      },
      {
        icon: "warning",
        accentColor: "#d4930a",
        title: "The AI gap",
        body: "Most designers use AI at prompt level. The VS Code hill hasn't been climbed yet. That's where the real leverage is.",
      },
      {
        icon: "check",
        accentColor: "#0a8a50",
        title: "What we're building",
        body: "A workshop where designers build, deploy, and get feedback on their own. From idea to live URL in one session.",
      },
      {
        icon: "lightning",
        accentColor: "#111",
        title: "Why now",
        body: "Code and AI will be part of every design workflow. We future-proof our craft by starting today.",
      },
    ],
  },

  // ─── SLIDE 3 ─────────────────────────────────────────────────────────────
  {
    template: "grid",
    background: "light",
    label: "Last 2 weeks",
    title: "What We've Been Working On",
    columns: 2,
    items: [
      {
        icon: "check",
        accentColor: "#0a8a50",
        style: "done",
        title: "Workshop structure aligned",
        body: "Four steps confirmed: Ideate (30 min), Build (2 h), Share (1 h), Wrap Up (10 min). In-person groups of 3, remote groups of 2. Format validated from Team Days.",
      },
      {
        icon: "check",
        accentColor: "#0a8a50",
        style: "done",
        title: "Two formats defined",
        body: "<strong>Hands-on Studio</strong> (primary): VS Code + Copilot + Vercel, 4 hours, full build-to-deploy. <strong>Designer Cafe</strong> (future): lighter Figma Make session for team bonding.",
      },
      {
        icon: "sun",
        accentColor: "#d4930a",
        style: "accent",
        title: "Slide deck and content",
        body: "21-slide MVP deck in progress. WHO/WHAT/HOW/LOOK brief formula, adaptive track guidance, facilitator notes on every slide. Leo + Olof drafting this week.",
      },
      {
        icon: "file",
        accentColor: "#d4930a",
        style: "accent",
        title: "Facilitation guide + challenge backlog",
        body: "Jesus drafting the facilitator guide (timing, support tips, troubleshooting). Olof building a curated challenge backlog with ready-to-go project ideas for teams.",
      },
    ],
  },

  // ─── SLIDE 4 ─────────────────────────────────────────────────────────────
  {
    template: "format-card",
    background: "light",
    label: "Our starting point",
    title: "The Hands-on Studio",
    card: {
      meta: "Primary format",
      icon: "wrench",
      title: "Full Build Session (4 hours)",
      details: [
        { label: "Stack",  value: "VS Code + GitHub Copilot + Vercel" },
        { label: "For",    value: "Designers ready to go beyond Figma" },
        { label: "Output", value: "Working prototype, deployed to a live URL" },
      ],
      body: "Groups of three to four ideate from a personal brief, build with AI pair programming, and deploy. All in one session, using the same format that worked at Team Days in December.",
    },
    note: {
      label: "What about beginners?",
      body: `We're keeping a lighter “Designer Cafe” format (based on Figma Make) as a future option. For now, we focus on nailing the Hands-on Studio first.`,
    },
  },

  // ─── SLIDE 5 ─────────────────────────────────────────────────────────────
  {
    template: "philosophy",
    background: "light",
    icon: "bulb",
    label: "The core idea",
    title: "The Spark Principle",
    quote: `“The most important ingredient is motivation. If you don't care about what you're building, the AI won't save you.”`,
    items: [
      {
        title: "Start personal, build together",
        body: "Each participant brings their own idea, then forms a group of three to four to build together. A tool they wish existed. A problem in their daily work.",
      },
      {
        title: "Own it as a group",
        body: "Not a preassigned brief. Shared ownership within the group drives 4 hours of iteration. Motivation beats skill level, every time.",
      },
    ],
  },

  // ─── SLIDE 6 ─────────────────────────────────────────────────────────────
  {
    template: "tracks",
    background: "light",
    label: "How we handle skill diversity",
    title: "Adaptive Tracks",
    description: "Same session, different entry points. Everyone moves at their level.",
    footnote: "Pairing advanced with beginners is encouraged. Learning across levels is part of the format.",
    tracks: [
      {
        level: "Beginner",
        color: "#ccc",
        body: "No prior coding. Use My AI Portal. Guided prompts with Figma Make fallback.",
      },
      {
        level: "Intermediate",
        color: "#767676",
        body: "Some VS Code exposure. AI assisted with Copilot. Follow the guided demo then branch out.",
      },
      {
        level: "Advanced",
        color: "#111",
        body: "Comfortable in editor. Full stack build + SKAPA integration option. Deploy + iterate.",
      },
    ],
  },

  // ─── SLIDE 7 ─────────────────────────────────────────────────────────────
  {
    template: "timeline",
    background: "dark",
    label: "What's coming",
    title: "Next 4 Weeks",
    milestones: [
      {
        status: "done",
        date: "Completed",
        title: "Goals, strategy, and slide plan defined",
        description: "Aligned on approach and format. 21 slide structure planned.",
      },
      {
        status: "now",
        date: "This week",
        title: "MVP Draft and facilitator materials in progress",
        description: "Drafting examples, challenge templates, and initial facilitator guide. Work split across the team.",
      },
      {
        status: "next",
        date: "Mar 5",
        title: "Team review round",
        description: "Share materials with the team for feedback",
      },
      {
        status: "next",
        date: "Week of Mar 9",
        title: "Trial run with Olof's team, 2 to 3 designers",
        description: "First real run. Focus: flow, timing, toolchain readiness",
      },
      {
        status: "next",
        date: "Late March",
        title: "Iterate and plan wider rollout",
        description: "Incorporate trial learnings, wider sessions, scalable calendar",
      },
    ],
  },

  // ─── SLIDE 8 ─────────────────────────────────────────────────────────────
  {
    template: "grid",
    background: "light",
    label: "We need you",
    title: "How AI Jammers Can Help",
    columns: 2,
    items: [
      {
        icon: "people",
        title: "Volunteer your team",
        body: "If your team could be a trial group (week of Mar 9), talk to us. Small group of two to four designers, around 2 hours.",
      },
      {
        icon: "warning",
        style: "accent",
        title: "Challenge ideas",
        body: `We're building a “challenge backlog” with project ideas groups can use if stuck. What would you build? Share with us.`,
      },
      {
        icon: "link",
        title: "Connections",
        body: "Know teams across IKEA (Retail, Supply, etc.) who would benefit from this workshop? Intro us.",
      },
      {
        icon: "file",
        title: "Review the deck",
        body: "We'll share the MVP v0.1 slides by Mar 5 for feedback. 10 min of your time makes the session better for everyone.",
      },
    ],
  },

  // ─── SLIDE 9 ─────────────────────────────────────────────────────────────
  {
    template: "big-picture",
    background: "dark",
    label: "Where we're headed",
    title: "The Bigger Picture",
    intro: "This isn't just about one workshop.",
    closingQuote: `“An IKEA designer who finished a workshop yesterday should be able to run one for their team next week.”`,
    items: [
      {
        icon: "layerfile",
        title: "Playbook",
        body: "Any team in IKEA can run this. Facilitator guide + slides + challenge backlog. Self-service by design.",
      },
      {
        icon: "arrows-repeat",
        title: "Repeatable",
        body: "Monthly cadence. Different teams. A growing community of designers who know how to ship.",
      },
      {
        icon: "globe",
        title: "Scalable",
        body: "Amsterdam, Stockholm, Malmö, Madrid. The playbook scales across locations and teams.",
      },
    ],
  },

  // ─── SLIDE 10 ────────────────────────────────────────────────────────────
  {
    template: "closing",
    background: "light",
    icon: "question",
    title: "Questions?",
    body: "Everything we're building is in the open. Talk to us.",
    pills: ["Jesús", "Leo", "Olof", "Xiaoying"],
    summaryBox: [
      { label: "Next milestone", value: "Materials review · Mar 5" },
      { label: "First trial",    value: "Olof's team · Week of Mar 9" },
      { label: "Wider rollout",  value: "Late March" },
    ],
  },
];
