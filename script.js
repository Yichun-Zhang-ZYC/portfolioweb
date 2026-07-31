const projects = [
  {
    title: "Plant Disease Classifier",
    description:
      "A SqueezeNet 1.1 model fine-tuned on the PlantVillage dataset to classify 38 plant disease and healthy-leaf categories across 14 species — 98.13% weighted test accuracy, running entirely client-side in the browser.",
    url: "https://yichun-zhang-zyc.github.io/plant-disease-classifier/",
  },
  {
    title: "AI in the News",
    description:
      "An end-to-end NLP pipeline that turns ~200K news articles into a structured view of how media covers AI's impact on business — topic modeling, entity extraction, and sentiment scoring, surfaced in an interactive dashboard.",
    url: "https://yichun-zhang-zyc.github.io/ai-news-sentiment-pipeline/",
  },
  {
    title: "Room to Grow",
    description:
      "A minimalist personal growth app where completing real-life todos earns coins to build and decorate a room you actually care about — habit streaks, a local-first room economy, no dense dashboards.",
    url: "https://yichun-zhang-zyc.github.io/room-to-grow/",
  },
];

const track = document.querySelector("#projects-track");
const scrollEl = document.querySelector("#projects-scroll");
const template = document.querySelector("#project-card-template");
const cursorGlow = document.querySelector(".cursor-glow");
const scrollTriggers = document.querySelectorAll("[data-scroll-target]");

function renderProjects() {
  projects.forEach((project, index) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.index = String(index);
    card.querySelector(".project-card__title").textContent = project.title;
    card.querySelector(".project-card__description").textContent = project.description;

    const displayUrl = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const chrome = card.querySelector(".embed-chrome");
    chrome.href = project.url;
    card.querySelector(".embed-url").textContent = displayUrl;

    const iframe = card.querySelector(".embed-iframe");
    iframe.src = project.url;
    iframe.title = `${project.title} live preview`;

    track.appendChild(card);
  });
}

function setupScrollButtons() {
  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.dataset.scrollTarget;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function setupCursorGlow() {
  window.addEventListener("pointermove", (event) => {
    const x = `${(event.clientX / window.innerWidth) * 100}%`;
    const y = `${(event.clientY / window.innerHeight) * 100}%`;
    cursorGlow.style.setProperty("--glow-x", x);
    cursorGlow.style.setProperty("--glow-y", y);
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.22 }
  );

  document.querySelectorAll(".project-card").forEach((card) => observer.observe(card));
}

function closestCardIndex() {
  const cards = [...document.querySelectorAll(".project-card")];
  const viewportRect = scrollEl.getBoundingClientRect();
  const viewportCenter = viewportRect.left + viewportRect.width / 2;

  let closest = 0;
  let minDist = Infinity;
  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const dist = Math.abs(cardCenter - viewportCenter);
    if (dist < minDist) {
      minDist = dist;
      closest = index;
    }
  });
  return closest;
}

function setupActiveCard() {
  function updateActiveCard() {
    const cards = [...document.querySelectorAll(".project-card")];
    const activeIndex = closestCardIndex();
    cards.forEach((card, index) => card.classList.toggle("is-active", index === activeIndex));
  }

  scrollEl.addEventListener("scroll", updateActiveCard, { passive: true });
  window.addEventListener("resize", updateActiveCard);
  updateActiveCard();
}

function setupProgressRail() {
  const rail = document.querySelector("#progress-rail");
  const fill = document.querySelector("#progress-fill");
  const dot = document.querySelector("#progress-dot");
  const counter = document.querySelector("#progress-counter");
  if (!rail) return;

  const maxScroll = () => Math.max(scrollEl.scrollWidth - scrollEl.clientWidth, 1);
  const ratioFromClientX = (clientX) => {
    const rect = rail.getBoundingClientRect();
    return Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
  };

  function render() {
    const ratio = scrollEl.scrollLeft / maxScroll();
    const pct = `${Math.min(Math.max(ratio, 0), 1) * 100}%`;
    fill.style.width = pct;
    dot.style.left = pct;

    const total = projects.length;
    const activeIndex = closestCardIndex();
    counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  }

  function goToCard(index) {
    const cards = [...document.querySelectorAll(".project-card")];
    const clamped = Math.max(0, Math.min(index, cards.length - 1));
    cards[clamped]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  let dragging = false;

  dot.addEventListener("pointerdown", (event) => {
    dragging = true;
    scrollEl.style.scrollSnapType = "none";
    dot.setPointerCapture(event.pointerId);
    rail.classList.add("is-dragging");
  });

  dot.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    scrollEl.scrollLeft = ratioFromClientX(event.clientX) * maxScroll();
    render();
  });

  function stopDragging() {
    if (!dragging) return;
    dragging = false;
    rail.classList.remove("is-dragging");
    scrollEl.style.scrollSnapType = "";
    const ratio = scrollEl.scrollLeft / maxScroll();
    goToCard(Math.round(ratio * (projects.length - 1)));
  }

  dot.addEventListener("pointerup", stopDragging);
  dot.addEventListener("pointercancel", stopDragging);

  rail.addEventListener("pointerdown", (event) => {
    if (event.target === dot) return;
    const ratio = ratioFromClientX(event.clientX);
    goToCard(Math.round(ratio * (projects.length - 1)));
  });

  scrollEl.addEventListener("scroll", render, { passive: true });
  window.addEventListener("resize", render);
  render();
}

renderProjects();
setupScrollButtons();
setupCursorGlow();
setupReveal();
setupActiveCard();
setupProgressRail();
