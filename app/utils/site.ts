// Single source of truth for personal/social links, reused across the
// landing hero, footer and contact page.
//
// The contact e-mail is deliberately NOT here — it lives Base64-encoded in the
// env and is rendered via <MailButton>, which decodes it only on click, so no
// harvestable address ships in the static HTML. See app/components/MailButton.vue.
export const SOCIALS = {
  github: "https://github.com/makoeta",
  linkedin: "https://www.linkedin.com/in/maximilian-k%C3%B6nig-407732223/",
} as const;

export interface SocialLink {
  label: string;
  icon: string;
  to: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", icon: "i-simple-icons-github", to: SOCIALS.github },
  { label: "LinkedIn", icon: "i-simple-icons-linkedin", to: SOCIALS.linkedin },
];
