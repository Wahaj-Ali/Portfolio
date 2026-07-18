export interface ProjectTranslation {
  title: string;
  description: string;
}

export interface ExperienceTranslation {
  role: string;
  duration: string;
  bullets: string[];
}

export interface SkillCategoryTranslation {
  title: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    work: string;
    about: string;
    journey: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    close: string;
    tagline: string;
    language: string;
  };
  hero: {
    role: string;
    name: string;
    bio: string;
    viewWork: string;
    getInTouch: string;
    imageAlt: string;
  };
  projects: {
    label: string;
    title: string;
    side: string;
    freelance: string;
    live: string;
    code: string;
    items: Record<string, ProjectTranslation>;
  };
  about: {
    label: string;
    title: string;
    lead: string;
    paragraph1: string;
    paragraph2: string;
    whatIDo: string;
    highlight: string;
    highlightP1: string;
    highlightP2: string;
    focusAreas: string[];
  };
  journey: {
    label: string;
    title: string;
    subtitle: string;
    workTypes: {
      onsite: string;
      remote: string;
      hybrid: string;
    };
    items: Record<number, ExperienceTranslation>;
  };
  skills: {
    label: string;
    title: string;
    subtitle: string;
    categories: Record<number, SkillCategoryTranslation>;
  };
  contact: {
    label: string;
    title: string;
    subtitle: string;
    email: string;
    name: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
  };
  notFound: {
    message: string;
    backHome: string;
  };
}
