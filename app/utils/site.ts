// Single source of truth for personal/social links, reused across the
// landing hero, footer and contact page.
export const SOCIALS = {
  github: "https://github.com/makoeta",
  linkedin: "https://www.linkedin.com/in/maximilian-k%C3%B6nig-407732223/",
  email: "mailto:makoeta@gmx.de",
} as const;

export interface SocialLink {
  label: string;
  icon: string;
  to: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", icon: "i-simple-icons-github", to: SOCIALS.github },
  { label: "LinkedIn", icon: "i-simple-icons-linkedin", to: SOCIALS.linkedin },
  { label: "Email", icon: "i-lucide-mail", to: SOCIALS.email },
];
