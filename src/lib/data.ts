import type {
  Achievement,
  EducationItem,
  ExperienceItem,
  Project,
  SkillNode,
  SocialLink,
  TimelineScene,
} from "@/types";
import { siteConfig } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/*  ABOUT — TIMELINE JOURNEY                                                   */
/* -------------------------------------------------------------------------- */
export const timeline: TimelineScene[] = [
  {
    id: "student",
    year: "2022",
    title: "Software Engineering Student",
    subtitle: "Indus University — Karachi",
    description:
      "Began a BS in Software Engineering with a 3.6+ CGPA, falling in love with systems thinking, algorithms and the architecture behind intelligent software.",
    accent: "#C9A961",
  },
  {
    id: "leader",
    year: "2023",
    title: "Tech Community Leader",
    subtitle: "Team Leader & PR Manager",
    description:
      "Led the university tech community — organizing tech talks, FinTech events and developer workshops while managing PR and a team of organizers.",
    accent: "#C9A961",
  },
  {
    id: "m3",
    year: "2025",
    title: "AI Engineer at M3 Technologies",
    subtitle: "Production AI backends",
    description:
      "Built AI-powered backend systems in Node.js and Python, integrated OpenAI and Gemini into production workflows, and containerized services with Docker, MySQL and Redis.",
    accent: "#C9A961",
  },
  {
    id: "dg",
    year: "2026",
    title: "AI Developer at Digital Graphiks",
    subtitle: "AI-powered learning workflows",
    description:
      "Architecting scalable AI pipelines and Schoology LMS automations, wiring OpenAI and Claude into backend services that power digital learning platforms.",
    accent: "#C9A961",
  },
  {
    id: "agentic",
    year: "Now",
    title: "Building Agentic AI Systems",
    subtitle: "Autonomous, multi-agent futures",
    description:
      "Designing autonomous agents, AI orchestration and RAG systems — intelligent workflows that think, plan and act. Building the future, one agent at a time.",
    accent: "#C9A961",
  },
];

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE                                                                 */
/* -------------------------------------------------------------------------- */
export const experiences: ExperienceItem[] = [
  {
    id: "digital-graphiks",
    company: "Digital Graphiks",
    role: "AI Developer",
    period: "Mar 2026 — Present",
    location: "Karachi, Pakistan",
    summary:
      "Architecting AI-powered educational workflows and scalable AI pipelines for digital learning platforms.",
    responsibilities: [
      "Design AI workflows and automations across the learning stack",
      "Integrate OpenAI & Claude into backend services",
      "Automate Schoology LMS via REST APIs",
      "Build scalable, observable AI pipelines",
      "Backend development in Node.js & Python",
    ],
    stack: ["OpenAI", "Claude", "Node.js", "Python", "Schoology LMS", "REST APIs"],
    accent: "#C9A961",
  },
  {
    id: "m3-technologies",
    company: "M3 Technologies Pakistan",
    role: "AI Engineer",
    period: "Aug 2025 — Mar 2026",
    location: "Karachi, Pakistan",
    summary:
      "Developed AI-powered backend systems and integrated LLM APIs into production workflows.",
    responsibilities: [
      "Build AI-powered backend systems",
      "Integrate OpenAI & Gemini APIs into production",
      "Implement REST APIs with MySQL & Redis",
      "Containerize applications with Docker",
    ],
    stack: ["OpenAI", "Gemini", "Node.js", "Python", "Docker", "Redis", "MySQL"],
    accent: "#C9A961",
  },
  {
    id: "freelance",
    company: "Freelance",
    role: "AI Developer & Content Writer",
    period: "2023 — Present",
    location: "Remote",
    summary:
      "LoRA fine-tuning, AI content creation, branding assets, storytelling and AI-generated media.",
    responsibilities: [
      "LoRA fine-tuning of generative models",
      "AI content & branding asset creation",
      "Storytelling and AI-generated media",
    ],
    stack: ["LoRA", "Midjourney", "ElevenLabs", "Runway ML", "Leonardo AI"],
    accent: "#C9A961",
  },
];

/* -------------------------------------------------------------------------- */
/*  PROJECTS — THE 3D CITY                                                     */
/* -------------------------------------------------------------------------- */
export const projects: Project[] = [
  {
    id: "adcraft-ai",
    name: "AdCraft AI",
    tagline: "Generative ad-creative engine",
    description:
      "An AI system that generates on-brand ad creatives, copy and variations at scale — combining LLM prompting with image generation pipelines and brand guardrails.",
    category: "Generative AI",
    tags: ["OpenAI", "Image Gen", "Prompt Engineering", "Next.js"],
    metrics: [
      { label: "Faster creative cycles", value: "10x" },
      { label: "Brand variants / run", value: "50+" },
      { label: "Manual effort cut", value: "80%" },
    ],
    highlights: [
      "Multi-step generation pipeline with brand guardrails",
      "LLM-driven copy + visual variant matrix",
      "Human-in-the-loop review workflow",
    ],
    status: "Live",
    accent: "#C9A961",
    height: 3.2,
  },
  {
    id: "agent-builder",
    name: "Agent Builder",
    tagline: "Visual agentic workflow studio",
    description:
      "A platform to compose autonomous AI agents — tools, memory, planning and multi-agent orchestration — without writing glue code. Drag, connect, deploy.",
    category: "Agentic AI",
    tags: ["Agentic AI", "Multi-Agent", "RAG", "FastAPI"],
    metrics: [
      { label: "Agent templates", value: "20+" },
      { label: "Tool integrations", value: "30+" },
      { label: "Avg setup time", value: "<5 min" },
    ],
    highlights: [
      "Composable tools, memory & planning loops",
      "Multi-agent orchestration with handoffs",
      "RAG-backed knowledge for grounded answers",
    ],
    status: "In Development",
    accent: "#C9A961",
    height: 4.2,
  },
  {
    id: "ai-chatbots",
    name: "AI Chatbots",
    tagline: "Grounded conversational assistants",
    description:
      "Production conversational assistants for support and sales — retrieval-augmented, multi-LLM (OpenAI / Claude / Gemini), with analytics and guardrails.",
    category: "Conversational AI",
    tags: ["Claude", "Gemini", "RAG", "Node.js"],
    metrics: [
      { label: "Query resolution", value: "92%" },
      { label: "Response time", value: "<1.2s" },
      { label: "LLM providers", value: "3" },
    ],
    highlights: [
      "Retrieval-augmented grounding over private docs",
      "Provider-agnostic LLM routing & fallback",
      "Conversation analytics dashboard",
    ],
    status: "Live",
    accent: "#C9A961",
    height: 2.6,
  },
  {
    id: "ai-content-automation",
    name: "AI Content Automation",
    tagline: "End-to-end content pipelines",
    description:
      "Automated content pipelines that research, draft, edit and publish — orchestrating LLMs, media generation and CMS APIs into a single hands-off workflow.",
    category: "Automation",
    tags: ["Workflow Automation", "OpenAI", "Python", "APIs"],
    metrics: [
      { label: "Pipeline stages", value: "6" },
      { label: "Throughput", value: "100s/day" },
      { label: "Hands-off", value: "End-to-end" },
    ],
    highlights: [
      "Research → draft → edit → media → publish",
      "Quality gates & tone-of-voice enforcement",
      "CMS + social API integrations",
    ],
    status: "Live",
    accent: "#C9A961",
    height: 3.6,
  },
  {
    id: "crm-saas",
    name: "Enterprise CRM SaaS",
    tagline: "Multi-tenant business operating system",
    description:
      "A multi-tenant CRM SaaS platform covering Leads, Clients, Projects, Invoices, Estimates, Payments and Reports — with role-based access control across every module.",
    category: "SaaS Platform",
    tags: ["Laravel", "MySQL", "Multi-tenant", "RBAC"],
    metrics: [
      { label: "Core modules", value: "8+" },
      { label: "Access control", value: "RBAC" },
      { label: "Tenancy", value: "Multi" },
    ],
    highlights: [
      "Leads → Clients → Projects pipeline",
      "Invoices, estimates & payment tracking",
      "Role-based permissions on every module",
    ],
    status: "Live",
    accent: "#C9A961",
    height: 3.8,
  },
  {
    id: "cms-system",
    name: "Enterprise CMS",
    tagline: "Dynamic content management",
    description:
      "A dynamic content management system with a visual page builder, built-in SEO tools and full media management — built for non-technical teams to ship fast.",
    category: "SaaS Platform",
    tags: ["Laravel", "Page Builder", "SEO", "MySQL"],
    metrics: [
      { label: "Page builder", value: "Visual" },
      { label: "SEO toolkit", value: "Built-in" },
      { label: "Media library", value: "Full" },
    ],
    highlights: [
      "Drag-and-drop page composition",
      "SEO metadata & sitemap tooling",
      "Centralized media management",
    ],
    status: "Live",
    accent: "#C9A961",
    height: 3.0,
  },
  {
    id: "lms-automation",
    name: "AI LMS Automation",
    tagline: "Automated educational content",
    description:
      "An AI-powered LMS automation platform that generates and delivers educational content end-to-end through Schoology LMS integrations.",
    category: "AI Automation",
    tags: ["OpenAI", "Claude", "Schoology", "Node.js"],
    metrics: [
      { label: "Content pipeline", value: "End-to-end" },
      { label: "LMS", value: "Schoology" },
      { label: "Delivery", value: "Automated" },
    ],
    highlights: [
      "AI-generated educational content",
      "Schoology API integration & delivery",
      "Hands-off generation → publish flow",
    ],
    status: "Live",
    accent: "#C9A961",
    height: 3.4,
  },
  {
    id: "multi-agent-workflow",
    name: "Multi-Agent AI Workflows",
    tagline: "Agents that plan, remember and act",
    description:
      "An autonomous multi-agent system where AI agents carry memory, plan multi-step work and execute tools — coordinating with each other to finish real tasks.",
    category: "Agentic AI",
    tags: ["Agentic AI", "Memory", "Planning", "Tool Use"],
    metrics: [
      { label: "Agent memory", value: "Persistent" },
      { label: "Execution", value: "Autonomous" },
      { label: "Coordination", value: "Multi-agent" },
    ],
    highlights: [
      "Planning loops with tool execution",
      "Persistent memory across runs",
      "Agent-to-agent task handoffs",
    ],
    status: "Live",
    accent: "#C9A961",
    height: 4.0,
  },
  {
    id: "ai-calling-agent",
    name: "AI Calling Agent",
    tagline: "Voice agents that qualify and support",
    description:
      "A voice-agent platform combining LLMs with speech technologies — AI callers that hold natural conversations for lead qualification and customer support.",
    category: "Voice AI",
    tags: ["LLMs", "Speech-to-Text", "TTS", "Telephony"],
    metrics: [
      { label: "Channel", value: "Voice" },
      { label: "Use cases", value: "Sales + Support" },
      { label: "Conversation", value: "Natural" },
    ],
    highlights: [
      "LLM-driven real-time conversations",
      "Speech recognition & synthesis pipeline",
      "Lead qualification & support flows",
    ],
    status: "In Development",
    accent: "#C9A961",
    height: 2.8,
  },
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    tagline: "This cinematic experience",
    description:
      "The very site you're exploring — a Three.js + Next.js cinematic portfolio with an AI assistant, a 3D project city and a neural-network skill graph. Built for impact.",
    category: "Creative Engineering",
    tags: ["Next.js", "Three.js", "R3F", "Framer Motion"],
    metrics: [
      { label: "Lighthouse target", value: "90+" },
      { label: "3D scenes", value: "4" },
      { label: "Frame budget", value: "60fps" },
    ],
    highlights: [
      "Real-time WebGL hero & project city",
      "ZIA AI in-page assistant",
      "GSAP + Lenis scroll choreography",
    ],
    status: "Live",
    accent: "#C9A961",
    height: 3.0,
  },
];

/* -------------------------------------------------------------------------- */
/*  SKILLS — NEURAL NETWORK                                                    */
/* -------------------------------------------------------------------------- */
export const skills: SkillNode[] = [
  // AI
  { id: "openai", label: "OpenAI", level: 95, category: "AI", description: "GPT models, function calling, structured outputs & assistants." },
  { id: "claude", label: "Claude", level: 93, category: "AI", description: "Anthropic models, tool use & agentic workflows." },
  { id: "gemini", label: "Gemini", level: 88, category: "AI", description: "Google multimodal models in production pipelines." },
  { id: "ollama", label: "Ollama", level: 82, category: "AI", description: "Local LLM inference & private deployments." },
  { id: "agentic", label: "Agentic AI", level: 92, category: "AI", description: "Autonomous, multi-agent systems that plan and act." },
  { id: "prompt", label: "Prompt Engineering", level: 94, category: "AI", description: "Reliable, evaluable prompting & orchestration." },
  { id: "rag", label: "RAG", level: 90, category: "AI", description: "Retrieval-augmented generation over private data." },

  // Backend
  { id: "laravel", label: "PHP Laravel", level: 88, category: "Backend", description: "Robust APIs & web apps with Laravel." },
  { id: "node", label: "Node.js", level: 92, category: "Backend", description: "Scalable services, REST APIs & AI backends." },
  { id: "python", label: "Python", level: 90, category: "Backend", description: "AI pipelines, automation & data tooling." },
  { id: "fastapi", label: "FastAPI", level: 86, category: "Backend", description: "High-performance async Python APIs." },

  // Frontend
  { id: "react", label: "React.js", level: 85, category: "Frontend", description: "Component-driven UIs & interactive frontends." },
  { id: "javascript", label: "JavaScript", level: 88, category: "Frontend", description: "Modern ES, async patterns & browser APIs." },
  { id: "html-css", label: "HTML5 / CSS3", level: 90, category: "Frontend", description: "Semantic markup & responsive styling." },

  // Database
  { id: "mysql", label: "MySQL", level: 88, category: "Database", description: "Relational schemas & performant queries." },
  { id: "redis", label: "Redis", level: 84, category: "Database", description: "Caching, queues & real-time data." },
  { id: "supabase", label: "Supabase", level: 82, category: "Database", description: "Postgres, auth & realtime backends." },
  { id: "firebase", label: "Firebase", level: 80, category: "Database", description: "Realtime DB, auth & serverless." },

  // DevOps
  { id: "docker", label: "Docker", level: 86, category: "DevOps", description: "Containerized, reproducible deployments." },
  { id: "git", label: "Git", level: 90, category: "DevOps", description: "Version control & collaborative workflows." },
  { id: "github", label: "GitHub", level: 90, category: "DevOps", description: "CI, reviews & open collaboration." },

  // AI platforms & tooling
  { id: "claude-code", label: "Claude Code", level: 92, category: "Platforms", description: "Agentic coding with Claude in the terminal & IDE." },
  { id: "codex", label: "Codex", level: 86, category: "Platforms", description: "AI pair-programming & code generation workflows." },
  { id: "antigravity", label: "Antigravity", level: 84, category: "Platforms", description: "Agent-first AI development environment." },
  { id: "bolt", label: "Bolt", level: 82, category: "Platforms", description: "AI-driven full-stack app prototyping." },
  { id: "lovable", label: "Lovable", level: 82, category: "Platforms", description: "AI app building & rapid product iteration." },
];

export const skillCategories = [
  { key: "AI", label: "Artificial Intelligence", color: "#C9A961" },
  { key: "Backend", label: "Backend Engineering", color: "#C9A961" },
  { key: "Frontend", label: "Frontend", color: "#C9A961" },
  { key: "Database", label: "Databases", color: "#C9A961" },
  { key: "DevOps", label: "DevOps", color: "#C9A961" },
  { key: "Platforms", label: "AI Platforms", color: "#C9A961" },
] as const;

/* -------------------------------------------------------------------------- */
/*  LEADERSHIP                                                                 */
/* -------------------------------------------------------------------------- */
export const leadership = {
  role: "Team Leader & PR Manager",
  org: "Tech Community — Indus University",
  blurb:
    "Led a student tech community as Team Leader and PR Manager — organizing events, rallying speakers and building a culture of learning around emerging technology.",
  stats: [
    { label: "Tech Talks", value: 12, suffix: "+" },
    { label: "FinTech Events", value: 5, suffix: "" },
    { label: "Workshops", value: 8, suffix: "+" },
    { label: "Members Reached", value: 600, suffix: "+" },
  ],
  activities: [
    "Conducted workshops on Agentic AI & emerging technologies",
    "Organized Tech Talks with industry speakers",
    "Hosted FinTech events & panels",
    "Drove community growth & PR outreach",
  ],
};

/* -------------------------------------------------------------------------- */
/*  EDUCATION                                                                  */
/* -------------------------------------------------------------------------- */
export const education: EducationItem[] = [
  {
    id: "bs-software-engineering",
    degree: "BS Software Engineering",
    institution: "Indus University",
    period: "2022 — 2026",
    location: "Karachi, Pakistan",
    grade: "CGPA 3.6+",
    description:
      "A four-year engineering foundation in systems thinking, algorithms and software architecture — the discipline underneath every AI system I ship.",
    highlights: [
      "Software architecture & system design",
      "Algorithms & data structures",
      "Led the university tech community alongside studies",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  ACHIEVEMENTS                                                               */
/* -------------------------------------------------------------------------- */
export const achievements: Achievement[] = [
  {
    id: "ai-workshops",
    title: "AI Workshops Conducted",
    description:
      "Led hands-on AI workshops introducing developers to LLMs, prompting and agentic systems.",
    icon: "brain",
    accent: "#C9A961",
  },
  {
    id: "game-dev",
    title: "Game Development Seminars",
    description:
      "Delivered seminars on game development fundamentals, engines and interactive design.",
    icon: "gamepad",
    accent: "#C9A961",
  },
  {
    id: "team-leadership",
    title: "Team Leadership Certifications",
    description:
      "Certified in team leadership — guiding cross-functional teams and community initiatives.",
    icon: "users",
    accent: "#C9A961",
  },
  {
    id: "project-management",
    title: "Project Management Certifications",
    description:
      "Project management credentials covering planning, delivery and stakeholder management.",
    icon: "target",
    accent: "#C9A961",
  },
];

/* -------------------------------------------------------------------------- */
/*  CONTACT                                                                    */
/* -------------------------------------------------------------------------- */
export const socials: SocialLink[] = [
  { id: "whatsapp", label: "WhatsApp", href: siteConfig.social.whatsapp, handle: siteConfig.phoneDisplay, color: "#25D366" },
  { id: "phone", label: "Phone", href: siteConfig.social.phone, handle: siteConfig.phoneDisplay, color: "#C9A961" },
  { id: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin, handle: "muhammad-zarrar-zia", color: "#0A66C2" },
  { id: "email", label: "Email", href: siteConfig.social.email, handle: siteConfig.email, color: "#C9A961" },
  { id: "instagram", label: "Instagram", href: siteConfig.social.instagram, handle: "@zarrar", color: "#E1306C" },
  { id: "portfolio", label: "Portfolio", href: siteConfig.social.portfolio, handle: "zarrarzia-portfolio", color: "#C9A961" },
];
