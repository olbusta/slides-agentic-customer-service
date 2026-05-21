/**
 * Presentation Settings
 *
 * These are defaults. When a slides.yaml file is loaded, its `meta` block
 * will override `title` and `badge` automatically.
 *
 * Edit this file to change keyboard nav or set a fallback title.
 */
window.PRESENTATION_SETTINGS = {
  /** Fallback title shown in the top-left header (overridden by YAML meta.title) */
  title: "Presentation",

  /** Fallback badge text (overridden by YAML meta.audience) */
  badge: "",

  /** Author name shown in the top-right header */
  author: "Olof Bustamante",

  /**
   * Active data file.
   * Point this at any YAML file in data/ — index.html reads it.
   */
  dataFile: "data/slides.yaml",

  /**
   * Theme name (future use).
   * Available: "default"
   */
  theme: "default",

  /**
   * Keyboard navigation:
   * ArrowRight / Space → next slide
   * ArrowLeft          → previous slide
   */
  keyboardNav: true,
};

