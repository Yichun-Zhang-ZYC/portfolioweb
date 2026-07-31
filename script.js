const projects = [
  {
    title: "Project One",
    label: "Featured build",
    status: "Live concept",
    description:
      "A first highlighted project slot for one of your strongest works. This copy is intentionally easy to replace once we pull from GitHub and Drive.",
    tags: ["UI/UX", "Storytelling", "Build"],
    url: "https://github.com/",
  },
  {
    title: "Project Two",
    label: "Experimental",
    status: "In progress",
    description:
      "A space for a more playful or vibe-coded experiment. This layout is made for projects that are visual, interactive, or still evolving.",
    tags: ["Motion", "Prototype", "Web"],
    url: "https://github.com/",
  },
  {
    title: "Project Three",
    label: "Research + Product",
    status: "Case study",
    description:
      "A slot for work that mixes product thinking, research synthesis, or something more strategic than purely technical shipping.",
    tags: ["Product", "Research", "System"],
    url: "https://github.com/",
  },
  {
    title: "Project Four",
    label: "Future drop",
    status: "Coming next",
    description:
      "Reserved for the next strong addition so the site already feels alive before every project has been fully documented.",
    tags: ["Next", "Archive", "Update"],
    url: "https://github.com/",
  },
];

const track = document.querySelector("#projects-track");
const template = document.querySelector("#project-card-template");
const cursorGlow = document.querySelector(".cursor-glow");
const scrollTriggers = document.querySelectorAll("[data-scroll-target]");

function renderProjects() {
  projects.forEach((project, index) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.index = String(index);
    card.querySelector(".project-card__index").textContent = String(index + 1).padStart(2, "0");
    card.querySelector(".project-card__status").textContent = project.status;
    card.querySelector(".project-card__label").textContent = project.label;
    card.querySelector(".project-card__title").textContent = project.title;
    card.querySelector(".project-card__description").textContent = project.description;

    const tagList = card.querySelector(".tag-list");
    project.tags.forEach((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      tagList.appendChild(item);
    });

    const link = card.querySelector(".project-card__link");
    link.href = project.url;

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

function setupActiveCard() {
  const cards = [...document.querySelectorAll(".project-card")];

  function updateActiveCard() {
    const pageWidth = track.clientWidth;
    const activePage = Math.round(track.scrollLeft / pageWidth);
    const activeIndex = activePage * 2;

    cards.forEach((card, index) => {
      card.classList.toggle("is-active", index === activeIndex || index === activeIndex + 1);
    });
  }

  track.addEventListener("scroll", updateActiveCard, { passive: true });
  window.addEventListener("resize", updateActiveCard);
  updateActiveCard();
}

renderProjects();
setupScrollButtons();
setupCursorGlow();
setupReveal();
setupActiveCard();
