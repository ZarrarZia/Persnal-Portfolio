/**
 * Central site configuration. Edit contact handles, URLs and the
 * Instagram placeholder here — everything else reads from this file.
 */
export const siteConfig = {
  name: "Muhammad Zarrar Zia",
  shortName: "Zarrar Zia",
  role: "AI Developer & Agentic AI Engineer",
  titles: ["AI Developer", "AI Engineer", "Agentic AI Builder"],
  tagline: "I build the future.",
  description:
    "Muhammad Zarrar Zia builds AI that ships — agentic systems, LLM integrations (OpenAI, Claude, Gemini) and automation pipelines. AI Developer based in Karachi.",
  // Full, self-contained bio for AI engines, llms.txt, JSON-LD and the no-JS
  // fallback (not shown verbatim on the page — see bioShort for that).
  bio:
    "Muhammad Zarrar Zia is an AI Developer and Agentic AI Engineer based in Karachi, Pakistan. He builds intelligent systems — autonomous agents, LLM integrations and AI automation pipelines — using OpenAI, Anthropic Claude and Google Gemini, with backends in Node.js, Python, FastAPI and PHP Laravel. He is currently an AI Developer at Digital Graphiks, architecting AI-powered learning workflows and Schoology LMS automations, and previously built production AI backends at M3 Technologies. His work spans multi-agent orchestration, retrieval-augmented generation (RAG), enterprise CRM and CMS SaaS platforms, and voice AI calling agents. A BS Software Engineering graduate of Indus University (CGPA 3.6+), he also led the university tech community as Team Leader and PR Manager. He is available for AI development roles, agentic AI builds and automation projects.",
  // Short, on-page version shown in the About section.
  bioShort:
    "An AI Developer & Agentic AI Engineer in Karachi — building autonomous agents, LLM integrations and automation pipelines with OpenAI, Claude and Gemini. Currently at Digital Graphiks.",
  location: "Karachi, Pakistan",
  // Canonical live host (Netlify). Drives canonical, OG, sitemap, robots, JSON-LD.
  url: "https://zarrarzia.netlify.app",
  // Points at the dynamically generated OG image (src/app/opengraph-image.tsx).
  ogImage: "/opengraph-image",
  email: "mzarrar03@gmail.com",
  phone: "+923101168305",
  phoneDisplay: "+92 310 1168305",

  social: {
    whatsapp: "https://wa.me/923101168305",
    phone: "tel:+923101168305",
    linkedin: "https://linkedin.com/in/muhammad-zarrar-zia-677788293",
    portfolio: "https://zarrarzia.netlify.app",
    email: "mailto:mzarrar03@gmail.com",
    instagram: "https://www.instagram.com/zarrar.zia/",
  },
} as const;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];
