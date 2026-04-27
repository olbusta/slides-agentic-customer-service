/**
 * Presentation Renderer
 * Call window.initPresentation(settings, slides) after loading data.
 * Also auto-initializes from window.PRESENTATION_SETTINGS + window.SLIDES_DATA
 * if those globals exist (legacy JS data path).
 */
(function () {
  "use strict";

  // ── Icon Registry ──────────────────────────────────────────────────────────
  function icon(name, color) {
    color = color || "#111";
    var icons = {
      check: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      x: `<svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/></svg>`,
      warning: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`,
      lightning: `<svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      sun: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`,
      calendar: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="${color}" stroke-width="2"/><path d="M7 8h10M7 12h10M7 16h6" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/></svg>`,
      file: `<svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      wrench: `<svg viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      people: `<svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4" stroke="${color}" stroke-width="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      link: `<svg viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      bulb: `<svg viewBox="0 0 56 56" fill="none"><path d="M28 8c-7.7 0-14 6.3-14 14 0 5.2 2.8 9.7 7 12.1V38a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3.9c4.2-2.4 7-6.9 7-12.1 0-7.7-6.3-14-14-14z" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 44h10M25 48h6" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/><path d="M28 4v-1M44 12l1-1M48 28h1M12 12l-1-1M8 28H7" stroke="rgba(0,0,0,0.35)" stroke-width="2" stroke-linecap="round"/></svg>`,
      question: `<svg viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="24" stroke="${color}" stroke-width="2.5"/><path d="M28 28a8 8 0 0 1 15.1 3.6c0 5.3-8 5.3-8 8" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="36" cy="48" r="1.5" fill="${color}"/></svg>`,
      globe: `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="12" stroke="${color}" stroke-width="2"/><path d="M8 20h24M20 8c-4.4 4-7 8-7 12s2.6 8 7 12c4.4-4 7-8 7-12s-2.6-8-7-12z" stroke="${color}" stroke-width="2"/></svg>`,
      layerfile: `<svg viewBox="0 0 40 40" fill="none"><path d="M7 30V10a2 2 0 0 1 2-2h14l8 8v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" stroke="${color}" stroke-width="2"/><path d="M23 8v8h8" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 20h14M13 25h10" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/></svg>`,
      "arrows-repeat": `<svg viewBox="0 0 40 40" fill="none"><path d="M27 13a7 7 0 1 1-10.6 5.3" stroke="${color}" stroke-width="2" stroke-linecap="round"/><path d="M22 8l5 5-5 5" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 27a7 7 0 1 1 10.6-5.3" stroke="${color}" stroke-width="2" stroke-linecap="round"/><path d="M18 32l-5-5 5-5" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      // ── YAML data icons
      layers: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      "user-slash": `<svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4" stroke="${color}" stroke-width="2"/><path d="M18 8l4 4m0-4l-4 4" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`,
      database: `<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="${color}" stroke-width="2"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" stroke="${color}" stroke-width="2"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="${color}" stroke-width="2"/></svg>`,
      "chart-line": `<svg viewBox="0 0 24 24" fill="none"><path d="M3 17l4-8 4 4 4-6 4 4" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 20h18" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`,
      rocket: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2s4 2 4 9v1l2 3h-4v3l-2 2-2-2v-3H6l2-3v-1c0-7 4-9 4-9z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 17c0 1.5.5 3 3 4 2.5-1 3-2.5 3-4" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`,
      "dynamic-feed": `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="5" rx="1" stroke="${color}" stroke-width="2"/><rect x="3" y="11" width="8" height="5" rx="1" stroke="${color}" stroke-width="2"/><rect x="13" y="3" width="8" height="13" rx="1" stroke="${color}" stroke-width="2"/><path d="M3 19h18" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`,
      "auto-awesome": `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/><path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14zM5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5L5 17z" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
      loop: `<svg viewBox="0 0 24 24" fill="none"><path d="M17 2l4 4-4 4" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 11V9a4 4 0 0 1 4-4h14" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 22l-4-4 4-4" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 13v2a4 4 0 0 1-4 4H3" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    };
    return icons[name] || icons["warning"];
  }

  function iconSpan(name, color, size) {
    var cls = size === "lg" ? "icon icon--lg" : size === "xl" ? "icon icon--xl" : "icon";
    return `<span class="${cls}">${icon(name, color)}</span>`;
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  function esc(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  // Replace literal \n in YAML strings with <br>
  function nl(str) { return esc(str || "").replace(/\\n|\n/g, "<br>"); }
  function isDark(layout) { return layout === "dark" || layout === "teal"; }

  // ── YAML Template Renderers ───────────────────────────────────────────────

  /** type: title */
  function renderYamlTitle(slide) {
    var videoBg = slide.video ? `
      <video autoplay muted playsinline
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;pointer-events:none">
        <source src="${esc(slide.video)}">
      </video>
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.65);z-index:1"></div>` : "";
    var content = `
      <p class="step-label" style="color:rgba(255,255,255,0.5);letter-spacing:0.12em">${esc(slide.eyebrow)}</p>
      <h1 style="font-size:3rem;line-height:1.1;margin-top:0.5rem">${nl(slide.title)}</h1>
      <div class="divider divider--white" style="margin-top:1rem"></div>
      <p style="color:rgba(255,255,255,0.75);font-size:1.25rem;margin-top:1rem">${nl(slide.body)}</p>`;
    return slide.video
      ? videoBg + `<div style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center">${content}</div>`
      : content;
  }

  /** type: content — cards */
  function renderCards(slide) {
    var dark = isDark(slide.layout);
    var cards = (slide.cards || []).map(function (c) {
      return `
        <div class="box${dark ? " box--dark" : ""}">
          <h3 style="${dark ? "color:#fff;" : ""}display:flex;align-items:center;gap:0.5rem">
            ${esc(c.title)}
          </h3>
          <p style="${dark ? "color:rgba(255,255,255,0.65);" : ""}text-align:left;font-size:0.92rem">${esc(c.body)}</p>
        </div>`;
    }).join("");
    return `
      <p class="step-label"${dark ? " style=\"color:rgba(255,255,255,0.5)\"" : ""}>${esc(slide.section)}</p>
      <h2${dark ? " style=\"color:#fff\"" : ""}>${esc(slide.title)}</h2>
      <div class="divider${dark ? " divider--white" : ""}"></div>
      <p style="${dark ? "color:rgba(255,255,255,0.7);" : ""}margin-bottom:1rem">${esc(slide.subtitle)}</p>
      <div class="${(slide.cards || []).length === 4 ? 'grid grid--2' : 'grid grid--3'}" style="margin-top:0.5rem;max-width:960px">${cards}</div>`;
  }

  /** type: content — comparison */
  function renderComparison(slide) {
    var comp = slide.comparison || {};
    var before = comp.before || {}, after = comp.after || {};
    function col(side, accentColor, bgColor) {
      var items = (side.items || []).map(function (item) {
        return `<li style="padding:0.45rem 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:0.95rem;color:rgba(255,255,255,0.8)">${esc(item)}</li>`;
      }).join("");
      return `<div style="background:${bgColor};border-radius:12px;padding:1.5rem 1.75rem;flex:1"><div style="font-size:0.75rem;font-weight:700;letter-spacing:0.1em;color:${accentColor};margin-bottom:1rem">${esc(side.label)}</div><ul style="list-style:none;padding:0;margin:0">${items}</ul></div>`;
    }
    return `
      <p class="step-label" style="color:rgba(255,255,255,0.5)">${esc(slide.section)}</p>
      <h2 style="color:#fff">${esc(slide.title)}</h2>
      <div class="divider divider--white"></div>
      <p style="color:rgba(255,255,255,0.65);margin-bottom:1.5rem">${esc(slide.subtitle)}</p>
      <div style="display:flex;gap:1.25rem;max-width:860px;width:100%">
        ${col(before, "rgba(255,255,255,0.4)", "rgba(255,255,255,0.07)")}
        ${col(after,  "#7dd3b8",               "rgba(125,211,184,0.12)")}
      </div>`;
  }

  /** type: content — steps */
  function renderSteps(slide) {
    var dark = isDark(slide.layout);
    var steps = (slide.steps || []).map(function (s) {
      return `
        <div class="box${dark ? " box--dark" : ""}" style="padding-top:1.5rem">
          <div style="font-size:0.72rem;font-weight:800;letter-spacing:0.1em;color:${dark ? "rgba(255,255,255,0.3)" : "#bbb"};margin-bottom:0.4rem">${esc(s.number)}</div>
          <h3 style="${dark ? "color:#fff;" : ""}display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem">
            ${esc(s.title)}
          </h3>
          <p style="${dark ? "color:rgba(255,255,255,0.65);" : ""}text-align:left;font-size:0.92rem">${esc(s.body)}</p>
        </div>`;
    }).join("");
    return `
      <p class="step-label"${dark ? " style=\"color:rgba(255,255,255,0.5)\"" : ""}>${esc(slide.section)}</p>
      <h2${dark ? " style=\"color:#fff\"" : ""}>${esc(slide.title)}</h2>
      <div class="divider${dark ? " divider--white" : ""}"></div>
      <p style="${dark ? "color:rgba(255,255,255,0.65);" : ""}margin-bottom:1.25rem">${esc(slide.subtitle)}</p>
      <div class="grid grid--3" style="max-width:960px">${steps}</div>`;
  }

  /** type: content — points (icon grid + quote) */
  function renderPoints(slide) {
    var dark = isDark(slide.layout);
    var points = (slide.points || []).map(function (p) {
      return `
        <div class="box${dark ? " box--dark" : ""}">
          <h3 style="${dark ? "color:#fff;" : ""}text-align:left;display:flex;align-items:center;gap:0.5rem">
            ${esc(p.title)}
          </h3>
          <p style="${dark ? "color:rgba(255,255,255,0.65);" : ""}text-align:left;font-size:0.92rem">${esc(p.body)}</p>
        </div>`;
    }).join("");
    var quoteHtml = slide.quote
      ? `<p class="quote" style="${dark ? "color:rgba(255,255,255,0.6);" : ""}margin:1rem auto 1.5rem;font-size:1.1rem">${esc(slide.quote)}</p>`
      : "";
    return `
      <p class="step-label"${dark ? " style=\"color:rgba(255,255,255,0.5)\"" : ""}>${esc(slide.section)}</p>
      <h2 style="${dark ? "color:#fff;" : ""}text-align:center">${nl(slide.title)}</h2>
      <div class="divider${dark ? " divider--white" : ""}"></div>
      ${quoteHtml}
      <div class="${(slide.points || []).length === 4 ? 'grid grid--2' : 'grid grid--3'}" style="max-width:960px">${points}</div>`;
  }

  /** type: closing */
  function renderYamlClosing(slide) {
    var actions = (slide.actions || []).map(function (a) {
      return `
        <div style="display:flex;align-items:flex-start;gap:1.25rem;padding:1rem 0;border-bottom:1px solid rgba(255,255,255,0.1)">
          <div style="width:36px;height:36px;border-radius:50%;border:2px solid rgba(255,255,255,0.4);display:flex;align-items:center;justify-content:center;font-size:0.9rem;font-weight:800;color:#fff;flex-shrink:0">${a.number}</div>
          <p style="text-align:left;color:rgba(255,255,255,0.85);font-size:1rem;padding-top:0.4rem">${esc(a.text)}</p>
        </div>`;
    }).join("");
    return `
      <p class="step-label" style="color:rgba(255,255,255,0.45);letter-spacing:0.12em">${esc(slide.eyebrow)}</p>
      <h1 style="font-size:2.6rem;margin-top:0.5rem;margin-bottom:1.5rem">${nl(slide.title)}</h1>
      <div style="width:fit-content;min-width:320px">${actions}</div>`;
  }

  // ── Legacy JS-data Template Renderers ─────────────────────────────────────

  function renderTitleTeam(slide) {
    var people = (slide.people || []).map(function (p) {
      var ghostClass = p.ghost ? " person--ghost" : "";
      return `
        <div class="person${ghostClass}">
          <div class="avatar">${esc(p.initial)}</div>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.location)}</p>
        </div>`;
    }).join("");
    return `
      <h1 style="font-size:2.4rem;margin-bottom:0.5rem">${esc(slide.title)}</h1>
      <div class="divider divider--white" style="margin-bottom:1rem"></div>
      <p style="color:rgba(255,255,255,0.7);font-size:1rem;margin-bottom:1.75rem">${esc(slide.subtitle)}</p>
      <div class="people" style="gap:0.75rem;max-width:700px">${people}</div>`;
  }

  function renderGrid(slide) {
    var colClass = slide.columns === 3 ? " grid--3" : "";
    var items = (slide.items || []).map(function (item) {
      var accentColor = item.accentColor || "#111";
      var boxClass = "box";
      if (item.style === "done") boxClass += " box--done";
      else if (item.style === "accent") boxClass += " box--accent";
      var borderStyle = (!item.style) ? `style="border-left:4px solid ${accentColor}"` : "";
      return `
        <div class="${boxClass}" ${borderStyle}>
          <h3>${esc(item.title)}</h3>
          <p>${item.body}</p>
        </div>`;
    }).join("");
    var footnoteHtml = slide.footnote
      ? `<p style="margin-top:0.9rem;font-style:italic;max-width:680px;font-size:0.85rem;opacity:0.7">${esc(slide.footnote)}</p>`
      : "";
    return `
      <p class="step-label">${esc(slide.label)}</p>
      <h2>${esc(slide.title)}</h2>
      <div class="divider"></div>
      <div class="grid${colClass}" style="margin-top:1rem">${items}</div>
      ${footnoteHtml}`;
  }

  function renderFormatCard(slide) {
    var card = slide.card || {}, note = slide.note || {};
    var detailsHtml = (card.details || []).map(function (d) {
      return `<strong>${esc(d.label)}:</strong> ${esc(d.value)}<br/>`;
    }).join("");
    return `
      <p class="step-label">${esc(slide.label)}</p>
      <h2>${esc(slide.title)}</h2>
      <div class="divider"></div>
      <div style="max-width:780px;margin:1rem auto;width:100%">
        <div class="format-card">
          <div class="card-meta">${esc(card.meta)}</div>
          <h3>${esc(card.title)}</h3>
          <div class="card-details">${detailsHtml}</div>
          <p class="card-body">${esc(card.body)}</p>
        </div>
        <div class="format-note">
          <p><strong>${esc(note.label)}</strong> ${esc(note.body)}</p>
        </div>
      </div>`;
  }

  function renderPhilosophy(slide) {
    var items = (slide.items || []).map(function (item) {
      return `<div class="box"><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></div>`;
    }).join("");
    return `
      <div class="icon--xl breathe" style="margin-bottom:1rem">${icon(slide.icon || "bulb", "#111")}</div>
      <p class="step-label">${esc(slide.label)}</p>
      <h1 style="font-size:2.4rem">${esc(slide.title)}</h1>
      <div class="divider"></div>
      <p class="quote" style="margin:1.25rem auto">${esc(slide.quote)}</p>
      <div style="max-width:720px;width:100%;margin-top:1.5rem"><div class="grid" style="gap:1rem">${items}</div></div>`;
  }

  function renderTracks(slide) {
    var tracks = (slide.tracks || []).map(function (t) {
      return `
        <div class="track-card" style="border-top:4px solid ${t.color}">
          <div class="track-dot" style="background:${t.color}"></div>
          <h3>${esc(t.level)}</h3>
          <p style="font-size:0.9rem;text-align:left">${esc(t.body)}</p>
        </div>`;
    }).join("");
    var footnoteHtml = slide.footnote
      ? `<p style="margin-top:1rem;font-size:0.9rem;font-style:italic">${esc(slide.footnote)}</p>`
      : "";
    return `
      <p class="step-label">${esc(slide.label)}</p>
      <h2>${esc(slide.title)}</h2>
      <div class="divider"></div>
      <p style="margin-bottom:1rem">${esc(slide.description)}</p>
      <div class="grid grid--3" style="margin-top:0.5rem">${tracks}</div>
      ${footnoteHtml}`;
  }

  function renderTimeline(slide) {
    var milestones = (slide.milestones || []).map(function (m) {
      var cls = "milestone milestone--" + m.status;
      return `
        <div class="${cls}"><div class="milestone-dot"></div>
          <div>
            <div class="milestone-date">${esc(m.date)}</div>
            <div class="milestone-title">${esc(m.title)}</div>
            <div class="milestone-desc">${esc(m.description)}</div>
          </div>
        </div>`;
    }).join("");
    return `
      <p class="step-label">${esc(slide.label)}</p>
      <h2>${esc(slide.title)}</h2>
      <div class="divider divider--white"></div>
      <div class="milestones" style="margin-top:1rem">${milestones}</div>`;
  }

  function renderBigPicture(slide) {
    var items = (slide.items || []).map(function (item) {
      return `
        <div class="box box--dark">
          <h3 style="color:#fff">${esc(item.title)}</h3>
          <p style="font-size:0.88rem">${esc(item.body)}</p>
        </div>`;
    }).join("");
    return `
      <p class="step-label">${esc(slide.label)}</p>
      <h2>${esc(slide.title)}</h2>
      <div class="divider divider--white"></div>
      <p style="font-size:1.1rem;margin-bottom:1.5rem;opacity:0.9">${esc(slide.intro)}</p>
      <div class="grid grid--3" style="max-width:900px">${items}</div>
      <p style="margin-top:1.5rem;font-size:1rem;color:rgba(255,255,255,0.6);font-style:italic">${esc(slide.closingQuote)}</p>`;
  }

  function renderLegacyClosing(slide) {
    var pills = (slide.pills || []).map(function (name) {
      return `<span class="pill">${esc(name)}</span>`;
    }).join("");
    var summaryRows = (slide.summaryBox || []).map(function (row) {
      return `${esc(row.label)}: <strong>${esc(row.value)}</strong><br/>`;
    }).join("");
    return `
      <div class="icon--hero breathe">${icon(slide.icon || "question", "#111")}</div>
      <h1 style="font-size:2.6rem">${esc(slide.title)}</h1>
      <div class="divider"></div>
      <p style="font-size:1.1rem;margin-bottom:1.5rem">${esc(slide.body)}</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">${pills}</div>
      <div class="summary-box"><p>${summaryRows}</p></div>`;
  }

  // ── Template dispatch ─────────────────────────────────────────────────────
  function renderSlide(slide) {
    // YAML-based types
    if (slide.type === "title")   return renderYamlTitle(slide);
    if (slide.type === "closing") return renderYamlClosing(slide);
    if (slide.type === "content") {
      if (slide.cards)      return renderCards(slide);
      if (slide.comparison) return renderComparison(slide);
      if (slide.steps)      return renderSteps(slide);
      if (slide.points)     return renderPoints(slide);
      return renderCards(slide); // fallback
    }
    // Legacy JS-data templates
    switch (slide.template) {
      case "title-team":  return renderTitleTeam(slide);
      case "grid":        return renderGrid(slide);
      case "format-card": return renderFormatCard(slide);
      case "philosophy":  return renderPhilosophy(slide);
      case "tracks":      return renderTracks(slide);
      case "timeline":    return renderTimeline(slide);
      case "big-picture": return renderBigPicture(slide);
      case "closing":     return renderLegacyClosing(slide);
      default:
        return `<p>Unknown slide type: ${esc(slide.type || slide.template)}</p>`;
    }
  }

  // ── DOM Builder ───────────────────────────────────────────────────────────
  function buildPresentation(settings, slidesArr) {
    var header = document.getElementById("global-header");
    if (header) {
      header.innerHTML =
        `<div class="header-title">${esc(settings.title || "Presentation")}</div>` +
        (settings.badge ? `<div class="header-badge">${esc(settings.badge)}</div>` : "");
    }

    var container = document.getElementById("presentation-container");
    container.innerHTML = ""; // clear any previous render

    slidesArr.forEach(function (slideData) {
      var div = document.createElement("div");
      div.className = "slide" + (isDark(slideData.layout || slideData.background) ? " slide--dark" : "");
      div.innerHTML = renderSlide(slideData);
      container.appendChild(div);
    });

    var slides  = container.querySelectorAll(".slide");
    var total   = slides.length;
    var current = 0;
    var prevBtn    = document.getElementById("prev-btn");
    var nextBtn    = document.getElementById("next-btn");
    var currentNum = document.getElementById("current-slide");
    var totalNum   = document.getElementById("total-slides");

    totalNum.textContent = total;

    function show(index) {
      slides.forEach(function (s, i) {
        s.classList.remove("active", "prev");
        if (i === index)    s.classList.add("active");
        else if (i < index) s.classList.add("prev");
      });
      currentNum.textContent = index + 1;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === total - 1;
    }

    function next() { if (current < total - 1) show(++current); }
    function prev() { if (current > 0) show(--current); }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    if (settings.keyboardNav !== false) {
      window.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      });
    }

    show(0);
    window.focus();
  }

  // Public API — called by index.html after async YAML parse
  window.initPresentation = function (settings, slides) {
    buildPresentation(settings, slides);
  };

  // Legacy auto-init (data/slides.js globals)
  document.addEventListener("DOMContentLoaded", function () {
    if (window.SLIDES_DATA && window.SLIDES_DATA.length) {
      buildPresentation(window.PRESENTATION_SETTINGS || {}, window.SLIDES_DATA);
    }
  });
})();
