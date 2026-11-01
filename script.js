const PALETTE = ["#a9877a", "#8fa38a", "#9aaab8", "#c4a573", "#b48f9a", "#7f9696", "#a3917b"];
const NOTE_COLORS = ["#ecdca8", "#dcbcae", "#bfd0c6", "#d4cbe0"];

// Label position is a percentage of the room (viewBox 1200 x 700); the tag's arrow points at (x, y).
const HOTSPOTS = [
  { key: "about", label: "About me", sub: "look out the window", x: 50, y: 15 },
  { key: "research", label: "Research", sub: `${RESEARCH.length} papers on the shelf`, x: 16.7, y: 20 },
  { key: "contact", label: "Contact", sub: "grab a sticky note", x: 81.5, y: 14.3 },
  { key: "projects", label: "Projects", sub: `${PROJECTS.length} apps on the computer`, x: 53.3, y: 33.6 },
  { key: "lamp", label: "Lights", sub: "day / night", x: 35.8, y: 39.7, minor: true },
  { key: "now", label: "Now", sub: "what I'm up to", x: 67.5, y: 47, minor: true },
  { key: "plant", label: "Try the AI", sub: "diagnose a leaf", x: 87.5, y: 46 },
];

const $ = (sel, root = document) => root.querySelector(sel);

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false) return;
    if (key === "text") node.textContent = value;
    else if (key === "style") node.style.cssText = value;
    else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value === true ? "" : value);
  });
  [].concat(children).forEach((child) => child && node.append(child));
  return node;
}

function colorFor(index) {
  return PALETTE[index % PALETTE.length];
}

function initials(title) {
  return title.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("");
}

/* Room */

function drawRoomBooks() {
  const group = $("#room-books");
  const shelfBottoms = { econ: 286, stats: 416, analysis: 546 };
  const ns = "http://www.w3.org/2000/svg";
  RESEARCH_SHELVES.forEach((shelf) => {
    let x = 100;
    RESEARCH.filter((r) => r.shelf === shelf.id).forEach((paper, i) => {
      const w = 22 + ((i * 7) % 10);
      const h = 78 + ((i * 13) % 30);
      const rect = document.createElementNS(ns, "rect");
      rect.setAttribute("class", "book");
      rect.setAttribute("x", x);
      rect.setAttribute("y", shelfBottoms[shelf.id] - h);
      rect.setAttribute("width", w);
      rect.setAttribute("height", h);
      rect.setAttribute("rx", 2);
      rect.setAttribute("fill", colorFor(i + shelf.id.length));
      group.append(rect);
      x += w + 4;
    });
  });
}

function setHover(key, on) {
  document.querySelectorAll(`[data-hot="${key}"], .tag[data-key="${key}"]`).forEach((node) => {
    node.classList.toggle("is-hover", on);
  });
}

function activate(key) {
  if (key === "lamp") toggleTheme();
  else openPanel(key);
}

function renderTags() {
  const wrap = $("#room-tags");
  HOTSPOTS.forEach((spot, i) => {
    const tag = el(
      "button",
      {
        type: "button",
        class: `tag${spot.minor ? " tag--minor" : ""}`,
        "data-key": spot.key,
        style: `--x:${spot.x}%;--y:${spot.y}%;--d:${300 + i * 90}ms`,
        onclick: () => activate(spot.key),
        onmouseenter: () => setHover(spot.key, true),
        onmouseleave: () => setHover(spot.key, false),
      },
      [
        el("span", { class: "pulse", "aria-hidden": "true" }),
        el("span", { class: "tag__text" }, [
          el("span", { class: "tag__label", text: spot.label }),
          el("span", { class: "tag__sub", text: spot.sub }),
        ]),
        el("span", { class: "tag__arrow", "aria-hidden": "true", text: "↗" }),
      ]
    );
    wrap.append(tag);
  });

  document.querySelectorAll(".hot").forEach((group) => {
    const key = group.dataset.hot;
    group.addEventListener("click", () => activate(key));
    group.addEventListener("mouseenter", () => setHover(key, true));
    group.addEventListener("mouseleave", () => setHover(key, false));
  });
}

/* Theme */

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
}

/* Panel */

const panel = $("#panel");
const panelBody = $("#panel-body");
const panelTitle = $("#panel-title");
const panelBack = $("#panel-back");
let viewStack = [];

function showView(view) {
  panelTitle.textContent = view.title;
  panelBody.replaceChildren(view.render());
  panelBody.scrollTop = 0;
  panelBack.hidden = viewStack.length < 2;
}

function pushView(view) {
  viewStack.push(view);
  showView(view);
}

function openPanel(key) {
  const views = {
    projects: projectsView,
    research: researchView,
    about: aboutView,
    contact: contactView,
    now: nowView,
    plant: () => detailView(PROJECTS.find((p) => p.id === "plant"), "project"),
  };
  viewStack = [];
  pushView(views[key]());
  if (!panel.open) panel.showModal();
}

function openDetail(item, kind) {
  viewStack = [];
  pushView(detailView(item, kind));
  if (!panel.open) panel.showModal();
}

panelBack.addEventListener("click", () => {
  viewStack.pop();
  showView(viewStack[viewStack.length - 1]);
});

$("#panel-close").addEventListener("click", () => panel.close());
panel.addEventListener("click", (event) => {
  if (event.target === panel) panel.close();
});
panel.addEventListener("close", () => {
  // The close event is queued, so the panel may already be reopened by the time it fires.
  if (panel.open) return;
  panelBody.replaceChildren();
  viewStack = [];
});

function projectsView(group = "all") {
  return {
    title: "~/projects",
    render() {
      const frag = document.createDocumentFragment();
      frag.append(el("p", { class: "panel__lead", text: "Click an app to open it. Apps marked LIVE can be tried right here." }));

      const tabs = el("div", { class: "tabs", role: "group", "aria-label": "Filter projects" });
      [{ id: "all", label: "All" }, ...PROJECT_GROUPS].forEach((g) => {
        tabs.append(
          el("button", {
            type: "button",
            class: "chip",
            "aria-pressed": String(g.id === group),
            text: g.label,
            onclick: () => {
              viewStack[viewStack.length - 1] = projectsView(g.id);
              showView(viewStack[viewStack.length - 1]);
            },
          })
        );
      });
      frag.append(tabs);

      const apps = el("div", { class: "apps" });
      PROJECTS.forEach((project, i) => {
        if (group !== "all" && project.group !== group) return;
        apps.append(
          el("button", { type: "button", class: "app", onclick: () => pushView(detailView(project, "project")) }, [
            el("span", { class: "app__icon", style: `--c:${colorFor(i)}` }, [
              initials(project.title),
              project.live ? el("span", { class: "app__badge", text: "LIVE" }) : null,
            ]),
            el("span", { class: "app__name", text: project.title }),
          ])
        );
      });
      frag.append(apps);
      return frag;
    },
  };
}

function researchView() {
  return {
    title: "Bookshelf · research",
    render() {
      const frag = document.createDocumentFragment();
      frag.append(el("p", { class: "panel__lead", text: "Pull a book off the shelf to read about it. ★ marks my favorites." }));
      RESEARCH_SHELVES.forEach((shelf) => {
        const row = el("div", { class: "shelf__row" });
        RESEARCH.filter((r) => r.shelf === shelf.id).forEach((paper, i) => {
          row.append(
            el(
              "button",
              {
                type: "button",
                class: "spine",
                style: `--c:${colorFor(i + shelf.id.length)};--h:${170 + ((i * 17) % 40)}px`,
                "aria-label": paper.title,
                onclick: () => pushView(detailView(paper, "research")),
              },
              [paper.title, paper.featured ? el("span", { class: "spine__star", text: "★" }) : null]
            )
          );
        });
        frag.append(el("div", { class: "shelf" }, [el("p", { class: "shelf__label", text: shelf.label }), row]));
      });
      return frag;
    },
  };
}

function detailView(item, kind) {
  const groupLabel =
    kind === "project"
      ? PROJECT_GROUPS.find((g) => g.id === item.group)?.label
      : RESEARCH_SHELVES.find((s) => s.id === item.shelf)?.label;
  return {
    title: `${kind === "project" ? "Project" : "Research"} · ${item.title}`,
    render() {
      const actions = el("div", { class: "actions" }, [
        item.live ? el("a", { class: "btn btn--solid", href: item.live, target: "_blank", rel: "noreferrer", text: "Open live demo ↗" }) : null,
        item.repo ? el("a", { class: "btn", href: item.repo, target: "_blank", rel: "noreferrer", text: "View on GitHub ↗" }) : null,
        item.extraRepo ? el("a", { class: "btn", href: item.extraRepo.url, target: "_blank", rel: "noreferrer", text: `${item.extraRepo.label} ↗` }) : null,
      ]);

      const embed = item.live
        ? el("div", { class: "embed" }, [
            el("div", { class: "embed__bar", text: `Try it here · ${item.live.replace(/^https?:\/\//, "")}` }),
            el("iframe", {
              src: item.live,
              title: `${item.title} live demo`,
              loading: "lazy",
              sandbox: "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox",
            }),
          ])
        : null;

      return el("article", { class: "detail" }, [
        el("div", { class: "detail__head" }, [
          el("p", { class: "section-label", text: groupLabel }),
          el("h3", { text: item.title }),
          el("p", { class: "detail__short", text: item.short }),
        ]),
        el("div", { class: "tagline" }, item.tags.map((t) => el("span", { class: "pill", text: t }))),
        el("p", { class: "detail__desc", text: item.desc }),
        item.highlights ? el("ul", { class: "highlights" }, item.highlights.map((h) => el("li", { text: h }))) : null,
        actions,
        embed,
      ]);
    },
  };
}

function aboutView() {
  return {
    title: "The view from my window",
    render() {
      return el("div", {}, [
        el("p", { class: "about__intro", text: ABOUT.intro }),
        el("p", { class: "about__status" }, [el("span", { class: "pulse", "aria-hidden": "true" }), ABOUT.status]),
        el("p", { class: "section-label", text: "So far" }),
        el(
          "ol",
          { class: "timeline" },
          ABOUT.timeline.map((t) =>
            el("li", {}, [
              el("div", { class: "timeline__when", text: t.when }),
              el("p", { class: "timeline__where", text: t.where }),
              t.role ? el("p", { class: "timeline__role", text: t.role }) : null,
              el("p", { class: "timeline__what", text: t.what }),
            ])
          )
        ),
        el("p", { class: "section-label", text: "Toolbox" }),
        el("div", { class: "tagline" }, ABOUT.skills.map((s) => el("span", { class: "pill", text: s }))),
      ]);
    },
  };
}

function contactView() {
  return {
    title: "Sticky notes · contact",
    render() {
      const notes = el("div", { class: "notes" });
      CONTACT.filter((c) => c.value).forEach((c, i) => {
        const isEmail = c.label === "Email";
        const attrs = {
          class: "note",
          style: `--c:${NOTE_COLORS[i % NOTE_COLORS.length]};--r:${i % 2 ? 2 : -2}deg`,
        };
        const children = [
          el("span", { class: "note__label", text: c.label }),
          el("span", { class: "note__value", text: c.value }),
          el("span", { class: "note__hint", text: isEmail ? "Click to copy" : "Open ↗" }),
        ];
        if (isEmail) {
          notes.append(el("button", { ...attrs, type: "button", onclick: () => copyText(c.value) }, children));
        } else {
          notes.append(el("a", { ...attrs, href: c.url, target: "_blank", rel: "noreferrer" }, children));
        }
      });
      return el("div", {}, [el("p", { class: "panel__lead", text: "Grab a note. I'm happy to chat about roles, projects or ideas." }), notes]);
    },
  };
}

function nowView() {
  return {
    title: "Now · what I'm up to",
    render() {
      return el("ul", { class: "now-list" }, NOW.map((n) => el("li", { text: n })));
    },
  };
}

/* Browse everything */

function renderWork(filter = "all") {
  const items = [
    ...PROJECTS.map((p) => ({ ...p, kind: "project", cat: p.group })),
    ...RESEARCH.map((r) => ({ ...r, kind: "research", cat: "research" })),
  ].filter((item) => filter === "all" || item.cat === filter);
  if (filter === "all") items.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  const filters = $("#work-filters");
  filters.replaceChildren(
    ...[{ id: "all", label: "All" }, ...PROJECT_GROUPS, { id: "research", label: "Research" }].map((f) =>
      el("button", { type: "button", class: "chip", "aria-pressed": String(f.id === filter), text: f.label, onclick: () => renderWork(f.id) })
    )
  );

  $("#work-grid").replaceChildren(
    ...items.map((item) => {
      const catLabel =
        item.kind === "project" ? PROJECT_GROUPS.find((g) => g.id === item.group).label : "Research";
      return el("button", { type: "button", class: "card", onclick: () => openDetail(item, item.kind) }, [
        el("span", { class: "card__top" }, [
          el("span", { text: catLabel }),
          item.live ? el("span", { class: "card__live", text: "● Live demo" }) : null,
        ]),
        el("h3", { class: "card__title", text: item.title }),
        el("p", { class: "card__short", text: item.short }),
        el("span", { class: "tagline" }, item.tags.slice(0, 3).map((t) => el("span", { class: "pill", text: t }))),
      ]);
    })
  );
}

/* Misc */

function copyText(text) {
  navigator.clipboard?.writeText(text).then(() => toast("Copied"), () => toast(text));
}

let toastTimer;
function toast(message) {
  let node = $(".toast");
  if (!node) {
    node = el("div", { class: "toast", role: "status" });
    document.body.append(node);
  }
  node.textContent = message;
  node.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("is-on"), 1600);
}

document.querySelectorAll("[data-open]").forEach((btn) => btn.addEventListener("click", () => openPanel(btn.dataset.open)));
document.querySelectorAll('[data-action="theme"]').forEach((btn) => btn.addEventListener("click", toggleTheme));
$("#year").textContent = new Date().getFullYear();

drawRoomBooks();
renderTags();
renderWork();
