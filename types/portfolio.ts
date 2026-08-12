export type Project = {
  slug: string;
  index: string;
  name: string;
  eyebrow: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  accent: string;
  className: string;
  image?: string;
  imageAlt?: string;
  status: string;
  caseNote: string;
  liveUrl?: string;
  liveUrlExternal?: boolean;
  liveUrlLabel?: string;
};

export type Service = {
  index: string;
  title: string;
  description: string;
  tag: string;
  className: string;
};

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export type SocialLink = {
  label: string;
  href: string;
  placeholder?: boolean;
};
