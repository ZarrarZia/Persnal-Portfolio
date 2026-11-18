import type { ZiaSuggestion } from "@/types";
import { experiences, projects, skills } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export const ziaSuggestions: ZiaSuggestion[] = [
  { label: "Who is Zarrar?", query: "who is zarrar" },
  { label: "What projects has he built?", query: "what projects has he built" },
  { label: "What technologies does he use?", query: "what technologies does he use" },
  { label: "How can I hire him?", query: "how can i hire him" },
  { label: "Show AI Projects", query: "show ai projects" },
];

export interface ZiaResponse {
  text: string;
  /** Optional anchor the UI can scroll to after answering. */
  scrollTo?: string;
}

const greeting =
  "Hi — I'm Crafty, Zarrar's assistant. Ask me who he is, what he's built, his stack, or how to reach him.";

/**
 * A lightweight, fully offline intent matcher. No API keys, no network — it
 * answers from the portfolio data so the assistant always works.
 */
export function askZia(raw: string): ZiaResponse {
  const q = raw.toLowerCase().trim();

  if (!q) return { text: greeting };

  // Greetings
  if (/(^|\b)(hi|hello|hey|salam|yo|sup)\b/.test(q)) {
    return { text: `Hello 👋 ${greeting}` };
  }

  // Who is Zarrar
  if (/(who|about|tell me about|background|story)/.test(q)) {
    return {
      text: `${siteConfig.name} is an ${siteConfig.role} based in ${siteConfig.location}. He specializes in Agentic AI, LLM integrations (OpenAI, Claude, Gemini, Ollama), backend engineering and intelligent automation. Currently he's an AI Developer at Digital Graphiks, building AI-powered learning workflows and scalable pipelines.`,
      scrollTo: "#about",
    };
  }

  // Hire / contact
  if (/(hire|contact|reach|email|whatsapp|call|phone|available|work with|freelance|talk)/.test(q)) {
    return {
      text: `You can reach Zarrar directly:\n• WhatsApp: ${siteConfig.phoneDisplay}\n• Email: ${siteConfig.email}\n• LinkedIn: muhammad-zarrar-zia\nHe's open to AI engineering roles, agentic AI builds and intelligent automation projects. Jump to the contact hub below 👇`,
      scrollTo: "#contact",
    };
  }

  // AI projects specifically
  if (/(ai project|show ai|agentic|chatbot|automation)/.test(q)) {
    const aiProjects = projects
      .filter((p) => /AI|Agentic|Automation|Conversational/.test(p.category))
      .map((p) => `• ${p.name} — ${p.tagline}`)
      .join("\n");
    return {
      text: `Here are Zarrar's AI projects:\n${aiProjects}\nClick any skyscraper in the project city to fly in and explore the details.`,
      scrollTo: "#projects",
    };
  }

  // Projects (general)
  if (/(project|portfolio|built|build|made|work)/.test(q)) {
    const list = projects.map((p) => `• ${p.name} — ${p.tagline}`).join("\n");
    return {
      text: `Zarrar has built ${projects.length} flagship projects:\n${list}\nExplore them as a 3D city in the Projects section.`,
      scrollTo: "#projects",
    };
  }

  // Technologies / skills
  if (/(tech|stack|skill|tool|language|framework|know|use)/.test(q)) {
    const ai = skills.filter((s) => s.category === "AI").map((s) => s.label).join(", ");
    const backend = skills.filter((s) => s.category === "Backend").map((s) => s.label).join(", ");
    const data = skills.filter((s) => s.category === "Database").map((s) => s.label).join(", ");
    const devops = skills.filter((s) => s.category === "DevOps").map((s) => s.label).join(", ");
    return {
      text: `Zarrar's stack:\n• AI: ${ai}\n• Backend: ${backend}\n• Databases: ${data}\n• DevOps: ${devops}\nSee them connected as a neural network in the Skills section.`,
      scrollTo: "#skills",
    };
  }

  // Experience
  if (/(experience|job|company|career|m3|digital graphiks|where.*work)/.test(q)) {
    const list = experiences
      .map((e) => `• ${e.role} @ ${e.company} (${e.period})`)
      .join("\n");
    return {
      text: `Zarrar's experience:\n${list}\nHover the cards in the Experience command center for the full breakdown.`,
      scrollTo: "#experience",
    };
  }

  // Education
  if (/(education|study|university|degree|cgpa|student)/.test(q)) {
    return {
      text: "Zarrar is completing a BS in Software Engineering at Indus University (2022–2026) with a 3.6+ CGPA.",
      scrollTo: "#about",
    };
  }

  // Fallback
  return {
    text: "I can tell you about Zarrar, his projects, his tech stack, his experience, or how to hire him. Try one of the suggested questions below — or ask me anything about his AI work.",
  };
}

export const ziaGreeting = greeting;
