// All site content lives here. To add a project, add one object to PROJECTS or RESEARCH.

const GITHUB = "https://github.com/yichun-zhang-zyc";
const PAGES = "https://yichun-zhang-zyc.github.io";

const PROJECT_GROUPS = [
  { id: "ai", label: "AI & NLP" },
  { id: "mlops", label: "MLOps" },
  { id: "web", label: "Web apps" },
];

const PROJECTS = [
  {
    id: "plant",
    title: "Plant Disease Classifier",
    short: "38-class leaf disease classifier running fully in the browser",
    desc:
      "SqueezeNet 1.1 fine-tuned on PlantVillage to classify 38 disease and healthy-leaf categories across 14 species. Exported to ONNX and served client-side with ONNX Runtime Web, so the image never leaves your device. It grew out of an earlier research version that compared ViT and ResNet backbones with SAM-based segmentation.",
    highlights: ["98.13% weighted test accuracy", "Runs fully client-side (ONNX Runtime Web)", "Drag-and-drop inference"],
    tags: ["PyTorch", "Computer vision", "ONNX"],
    group: "ai",
    featured: true,
    live: `${PAGES}/plant-disease-classifier/`,
    repo: `${GITHUB}/plant-disease-classifier`,
    extraRepo: { label: "Research version (ViT + SAM)", url: `${GITHUB}/Plant_disease_AI_detection` },
    icon: "leaf",
  },
  {
    id: "ai-news",
    title: "AI in the News",
    short: "How 200K news articles talk about AI's impact on business",
    desc:
      "An end-to-end NLP pipeline that turns ~200K news articles into a structured view of how media covers AI's impact on business: BERTopic topic modeling, named-entity extraction, and a fine-tuned DistilBERT sentiment model, surfaced in an interactive dashboard.",
    highlights: ["~200K articles", "BERTopic + NER + fine-tuned DistilBERT", "Interactive topic and sentiment dashboard"],
    tags: ["NLP", "Transformers", "Dashboard"],
    group: "ai",
    featured: true,
    live: `${PAGES}/ai-news-sentiment-pipeline/`,
    repo: `${GITHUB}/ai-news-sentiment-pipeline`,
    icon: "news",
  },
  {
    id: "course-advisor",
    title: "AI Course Advisor",
    short: "An AI assistant that helps UChicago students pick courses",
    desc:
      "A conversational course advisor for University of Chicago students: ask about interests, requirements or workload and get course suggestions grounded in the course catalog.",
    highlights: ["LLM-powered recommendations", "Built for UChicago students"],
    tags: ["LLM", "RAG", "Web"],
    group: "ai",
    featured: true,
    live: `${PAGES}/course_advisor_simple/`,
    repo: `${GITHUB}/course_advisor_simple_version`,
    icon: "cap",
  },
  {
    id: "nl2sql",
    title: "NLP-to-SQL Chatbot",
    short: "Ask a database questions in plain English",
    desc:
      "A chatbot that translates natural-language questions into SQL queries, runs them, and returns the answer, so non-technical users can explore a database without writing SQL.",
    highlights: ["Natural language to SQL", "Runs in the browser"],
    tags: ["NLP", "SQL", "JavaScript"],
    group: "ai",
    featured: true,
    live: `${PAGES}/chatbot_db11/`,
    repo: `${GITHUB}/chatbot_db11`,
    icon: "chat",
  },
  {
    id: "street",
    title: "Street-Level Imagery Metrics",
    short: "Estimating real-world sizes of objects from street photos",
    desc:
      "Estimates the real-world dimensions of physical features (signs, poles, sidewalks and more) from street-level imagery, combining Mapillary images with 3D reconstruction.",
    highlights: ["Mapillary street-level imagery", "3D reconstruction", "Metric estimation"],
    tags: ["Computer vision", "3D", "Geospatial"],
    group: "ai",
    featured: true,
    repo: `${GITHUB}/Real-World-Dimension-and-Metric-Estimation-of-Physical-Features-from-Street-Level-Imagery-`,
    icon: "street",
  },
  {
    id: "sentiment-tool",
    title: "Sentiment Analysis Tool",
    short: "Upload a file, get its sentiment",
    desc: "A web tool where people upload a text file and get a sentiment analysis of its contents.",
    highlights: ["File upload", "Sentiment scoring"],
    tags: ["NLP", "Python", "Web"],
    group: "ai",
    repo: `${GITHUB}/Sentiment-Analysis-TOOL-WEB`,
    icon: "smile",
  },
  {
    id: "mlops-final",
    title: "Credit Default MLOps",
    short: "Full MLOps lifecycle for a credit-card default model",
    desc:
      "An end-to-end, notebook-first MLOps project predicting credit-card default: MLflow experiment tracking, FLAML AutoML model selection, FastAPI serving, Docker and docker-compose for local deployment, Kubernetes manifests, and GitHub Actions CI/CD.",
    highlights: ["MLflow + FLAML AutoML", "FastAPI + Docker + Kubernetes", "GitHub Actions CI/CD"],
    tags: ["MLOps", "MLflow", "Kubernetes"],
    group: "mlops",
    featured: true,
    repo: `${GITHUB}/MLOps-final`,
    icon: "pipeline",
  },
  {
    id: "mlops-cicd",
    title: "ML CI/CD Demo",
    short: "Train, gate, test, ship: a CI/CD pipeline for models",
    desc:
      "A compact CI/CD pipeline for ML models: train the model, evaluate it against a quality gate, run tests, and build a Docker image only when it passes.",
    highlights: ["Quality gate on model metrics", "Automated Docker build"],
    tags: ["CI/CD", "Docker", "Python"],
    group: "mlops",
    repo: `${GITHUB}/MLOps-cicd-demo`,
    icon: "check",
  },
  {
    id: "fastapi-k8s",
    title: "FastAPI → Kubernetes Template",
    short: "From a FastAPI app to a Kubernetes deployment",
    desc: "A complete template for deploying a FastAPI application to Kubernetes via Docker, written as a hands-on way to learn DevOps fundamentals.",
    highlights: ["FastAPI", "Dockerfile", "Kubernetes manifests"],
    tags: ["FastAPI", "Docker", "Kubernetes"],
    group: "mlops",
    repo: `${GITHUB}/fastapi-k8s-template`,
    icon: "box",
  },
  {
    id: "ds-blog",
    title: "Data Science Blog + DevOps",
    short: "A 13-topic data science learning site, shipped with a DevOps workflow",
    desc:
      "A static learning site with 13 data science topics (linear algebra, Python for data analysis, probability and statistics, and more). The real focus is the workflow around it: Git, GitHub Actions, GitHub Pages, Docker and Kubernetes.",
    highlights: ["13 topic pages", "GitHub Actions + Pages", "Docker + Kubernetes"],
    tags: ["DevOps", "GitHub Actions", "Static site"],
    group: "mlops",
    live: `${PAGES}/data-science-blog-with-devops/`,
    repo: `${GITHUB}/data-science-blog-with-devops`,
    icon: "book",
  },
  {
    id: "room-to-grow",
    title: "Room to Grow",
    short: "Finish real-life tasks, earn coins, build your room",
    desc:
      "A minimalist personal growth app where completing real-life todos earns coins to build and decorate a room you actually care about: habit streaks and a local-first room economy, without dense dashboards. It's also the idea behind this site.",
    highlights: ["Local-first", "Habit streaks", "Room-building economy"],
    tags: ["JavaScript", "Product design", "Local-first"],
    group: "web",
    featured: true,
    live: `${PAGES}/room-to-grow/`,
    repo: `${GITHUB}/room-to-grow`,
    icon: "home",
  },
  {
    id: "job-finder",
    title: "Daily Job Finder",
    short: "A zero-backend job search tool that keeps your resume local",
    desc:
      "A single-file static tool that pulls from several daily-updated public job lists on GitHub and filters them by role type, graduation date and more. No backend and no data collection: requests go straight from your browser to GitHub, and your resume is parsed locally.",
    highlights: ["No backend", "Resume parsed locally", "Daily-updated sources"],
    tags: ["JavaScript", "Static site", "Privacy"],
    group: "web",
    live: `${PAGES}/job-finder/`,
    repo: `${GITHUB}/job-finder`,
    icon: "search",
  },
  {
    id: "todo",
    title: "TODO List Web",
    short: "A simple time management and to-do website",
    desc: "A simple, useful time management and to-do list website.",
    highlights: ["Task lists", "Time management"],
    tags: ["JavaScript", "Web"],
    group: "web",
    repo: `${GITHUB}/TODOList-Web`,
    icon: "list",
  },
];

const RESEARCH_SHELVES = [
  { id: "econ", label: "Economics" },
  { id: "stats", label: "Statistical modeling" },
  { id: "analysis", label: "Data analysis" },
];

const RESEARCH = [
  {
    id: "edu-wages",
    title: "Education and Wages",
    short: "The causal effect of schooling on monthly earnings",
    desc:
      "Analyzes the causal relationship between years of education and monthly earnings using 1980 cross-sectional data, and how the effect varies across demographic groups.",
    tags: ["Econometrics", "Causal inference", "Stata"],
    shelf: "econ",
    featured: true,
    repo: `${GITHUB}/Econometrics---Education-and-wages`,
  },
  {
    id: "gender-recession",
    title: "Gender Economics in Recessions",
    short: "How the COVID recession changed parents' time use",
    desc:
      "Uses the American Time Use Survey (ATUS) to study how economic downturns, especially the COVID-19 recession, shifted how mothers and fathers in the U.S. spend their time.",
    tags: ["Labor economics", "ATUS", "Regression"],
    shelf: "econ",
    featured: true,
    repo: `${GITHUB}/GenderEconomics_during_recessions`,
  },
  {
    id: "norway",
    title: "Norway's Income Transparency",
    short: "What happens when everyone's income is public",
    desc: "A study of Norway's public tax-record policy and its effects, analyzed in R.",
    tags: ["Public policy", "R"],
    shelf: "econ",
    repo: `${GITHUB}/Norway-s-Income-Transparency-Study`,
  },
  {
    id: "tanzania",
    title: "Tanzania Education Analysis",
    short: "Education and income outcomes in Tanzania",
    desc: "An analysis of education and income data from Tanzania, written in R.",
    tags: ["Development economics", "R"],
    shelf: "econ",
    repo: `${GITHUB}/Tanzania-Education-Analysis-with-R`,
  },
  {
    id: "toronto-ratings",
    title: "Toronto Apartment Ratings",
    short: "What drives the evaluation scores of Toronto apartments",
    desc:
      "Studies the factors behind Toronto apartment evaluation scores using 2021 data from Open Data Toronto, written up as a reproducible paper.",
    tags: ["Regression", "Open data", "R"],
    shelf: "stats",
    featured: true,
    repo: `${GITHUB}/A-Study-of-Toronto-s-Apartment-Ratings`,
  },
  {
    id: "toronto-safety",
    title: "Toronto Apartment Safety",
    short: "Regression modeling of apartment safety",
    desc: "A regression modeling project on the safety of Toronto apartment buildings.",
    tags: ["Regression", "R"],
    shelf: "stats",
    repo: `${GITHUB}/Toronto-s-Apartment-Safety---302`,
  },
  {
    id: "life-satisfaction",
    title: "What Shapes Life Satisfaction",
    short: "Life satisfaction in the 2017 Canadian GSS",
    desc:
      "Uses the 2017 Canadian General Social Survey to identify factors that influence life satisfaction, with multiple linear regression and hypothesis testing.",
    tags: ["Survey data", "Regression", "Hypothesis testing"],
    shelf: "stats",
    repo: `${GITHUB}/Influencers-of-Life-Satistifaction`,
  },
  {
    id: "nyc-flights",
    title: "NYC Flights Inference",
    short: "Statistical inference on New York flight data",
    desc: "Final project for a statistical inference course, applying estimation and hypothesis testing to New York flight data.",
    tags: ["Statistical inference", "R"],
    shelf: "stats",
    repo: `${GITHUB}/NYU-Flights-Statistical-inference`,
  },
  {
    id: "chicago",
    title: "Chicago Living Analysis",
    short: "A data look at living in Chicago",
    desc: "A data analysis project on living in Chicago.",
    tags: ["Data analysis"],
    shelf: "analysis",
    repo: `${GITHUB}/Chicago_Living_Data_Analysis`,
  },
  {
    id: "fitness",
    title: "Fitness Data Report",
    short: "An analysis report on fitness data",
    desc: "A data analysis report on fitness data.",
    tags: ["Data analysis", "Visualization"],
    shelf: "analysis",
    repo: `${GITHUB}/Data-Analysis-Report-for-fitness`,
  },
];

const ABOUT = {
  intro:
    "I'm Kely, a data scientist and ML engineer. I like taking a model all the way from notebook to something people can click on, and I came to data through economics and statistics, so I care as much about why a number moves as about predicting it.",
  timeline: [
    { when: "Undergrad", where: "University of Toronto", what: "Statistics, economics and computer science. Regression, inference and econometrics papers." },
    { when: "Graduate", where: "University of Chicago", what: "Machine learning, NLP and MLOps. Building and shipping ML products." },
    { when: "Now", where: "Looking for my next role", what: "Data science, ML engineering and applied AI." },
  ],
  skills: ["Python", "PyTorch", "Transformers", "SQL", "R", "Stata", "MLflow", "FastAPI", "Docker", "Kubernetes", "GitHub Actions", "JavaScript"],
};

// Empty values are hidden on the site. Fill in email and LinkedIn when ready.
const CONTACT = [
  { label: "GitHub", value: "yichun-zhang-zyc", url: GITHUB },
  { label: "Email", value: "", url: "" },
  { label: "LinkedIn", value: "", url: "" },
  { label: "Resume", value: "", url: "" },
];

const NOW = [
  "Building DS Prep, an interview-prep site for my study group with SQL, stats, ML and LLM exercises that run in the browser.",
  "Writing learning notes on CI/CD artifact scanning and upload automation (Jenkins, Jira, Artifactory).",
  "Redesigning this room, one object at a time.",
];
