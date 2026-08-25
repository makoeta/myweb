// Single source of truth for the research/thesis list, shared between the
// landing page's preview section and the full /research page.
import type { BadgeProps } from "@nuxt/ui";

export type ResearchStatus = "done" | "ongoing" | "planned";

export interface Paper {
  kind: string;
  title: string;
  status: ResearchStatus;
  description: string;
  to?: string;
  cta?: string;
}

export const PAPERS: Paper[] = [
  {
    kind: "Bachelor Thesis",
    title: "Web Application Frameworks",
    status: "done",
    description:
      "A study of modern web application frameworks. Completed — reach out if you'd like to know more.",
    to: "/contact",
    cta: "contact me for more information",
  },
  {
    kind: "Research Paper",
    title: "In-Context Reinforcement Learning Experts",
    status: "ongoing",
    description:
      "An ongoing research paper on in-context reinforcement learning, built around the FastICLE project.",
    to: "/projects/student/fasticle",
    cta: "see the FastICLE project",
  },
  {
    kind: "Master Thesis",
    title: "Master Thesis",
    status: "planned",
    description:
      "Planned to build on top of my in-context reinforcement learning research paper.",
  },
];

export const RESEARCH_STATUS_META: Record<
  ResearchStatus,
  { label: string; color: BadgeProps["color"] }
> = {
  done: { label: "done", color: "success" },
  ongoing: { label: "ongoing", color: "info" },
  planned: { label: "planned", color: "neutral" },
};
