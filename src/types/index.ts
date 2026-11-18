import type { IconType } from "react-icons";

export interface NavItem {
  label: string;
  href: string;
}

export interface TimelineScene {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
  stack: string[];
  accent: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  status: "Live" | "In Development" | "Prototype";
  accent: string;
  height: number; // relative skyscraper height for the 3D city
}

export interface SkillNode {
  id: string;
  label: string;
  level: number; // 0-100
  category: SkillCategory;
  description: string;
}

export type SkillCategory = "AI" | "Backend" | "Frontend" | "Database" | "DevOps" | "Platforms";

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade: string;
  description: string;
  highlights: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  handle: string;
  color: string;
}

export interface ZiaMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface ZiaSuggestion {
  label: string;
  query: string;
}

export type Icon = IconType;
