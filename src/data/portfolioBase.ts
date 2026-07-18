export interface ProjectBase {
  uniqueId: string;
  img?: string;
  techs: string[];
  live?: string;
  source?: string;
  demo?: string;
  confidential?: boolean;
}

export interface ExperienceBase {
  id: number;
  company: string;
  companyUrl?: string;
  location: string;
  type: "onsite" | "remote" | "hybrid";
}

export interface SkillCategoryBase {
  id: number;
  icon: string;
  skills: string[];
}

export const sideProjectsBase: ProjectBase[] = [
  {
    uniqueId: "fullstack_prcjt",
    img: "/assets/projects/homely-mockup.webp",
    techs: ["React", "SASS", "Ruby on Rails", "PostgreSQL"],
    live: "https://homelyheaven.netlify.app/",
    source: "https://github.com/Wahaj-Ali/homely-frontend",
  },
  {
    uniqueId: "prcjt6",
    img: "/assets/projects/capstone1-mockup.webp",
    techs: ["HTML5", "CSS3", "JavaScript"],
    live: "https://wahaj-ali.github.io/Capstone-1/index.html",
    source: "https://github.com/Wahaj-Ali/Capstone-1",
  },
  {
    uniqueId: "prcjt3",
    img: "/assets/projects/tvhub-mockup.webp",
    techs: ["HTML5", "JavaScript", "CSS3", "Webpack"],
    live: "https://wahaj-ali.github.io/tv-hub/dist/",
    source: "https://github.com/Wahaj-Ali/tv-hub",
  },
  {
    uniqueId: "prcjt2",
    img: "/assets/projects/metrics-mockup.webp",
    techs: ["JSX", "React", "CSS3", "Redux"],
    live: "https://populaton-index-by-wahaj.netlify.app/",
    source: "https://github.com/Wahaj-Ali/metrics-webapp",
  },
  {
    uniqueId: "prcjt4",
    img: "/assets/projects/bookstore-mockup.webp",
    techs: ["React", "Redux", "CSS3", "JSX"],
    live: "https://wahaj-bookstore.netlify.app/",
    source: "https://github.com/Wahaj-Ali/bookstore",
  },
  {
    uniqueId: "everypenny",
    img: "/assets/projects/everypenny.webp",
    techs: ["Ruby", "CSS3", "Ruby on Rails", "PostgreSQL"],
    live: "https://budget-app-eydq.onrender.com/",
    source: "https://github.com/Wahaj-Ali/every-penny",
  },
];

export const professionalProjectsBase: ProjectBase[] = [
  {
    uniqueId: "cascadeStucco",
    techs: ["React", "Node.js", "Twilio", "OpenAI", "PostgreSQL", "AWS"],
    live: "http://cascade-pm.neuralogicgroup.com/",
  },
  {
    uniqueId: "cilaAi",
    img: "/assets/projects/cilaai.webp",
    techs: ["Next.js", "Node.js", "OpenAI", "FFmpeg", "YouTube API", "TikTok API", "Stripe"],
    demo: "https://www.loom.com/share/1470225e1e43478c95070d5e8a2a8b97",
  },
  {
    uniqueId: "drawingAnnotation",
    techs: ["React", "TypeScript", "React Konva", "Computer Vision", "PDF.js", "GitHub Packages"],
    confidential: true,
  },
];

export const freelanceProjectsBase: ProjectBase[] = [
  {
    uniqueId: "fullyConstructed",
    img: "/assets/projects/fully-constructed.webp",
    techs: ["React", "CSS", "JSX"],
    live: "https://www.fullyconstructed.com/",
  },
  {
    uniqueId: "instantlyInsured",
    img: "/assets/projects/instantly-insured.webp",
    techs: ["React", "CSS", "Framer Motion", "Swiper JS"],
    live: "https://www.instantlyinsured.com",
  },
  {
    uniqueId: "instantlyScaled",
    img: "/assets/projects/instantly-scaled.webp",
    techs: ["React", "CSS", "Framer Motion", "Swiper JS"],
    live: "https://www.instantlyscaled.com",
  },
];

export const skillCategoriesBase: SkillCategoryBase[] = [
  {
    id: 1,
    icon: "layout",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "Material UI",
      "Framer Motion",
      "GSAP",
      "React Konva",
    ],
  },
  {
    id: 2,
    icon: "server",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "Ruby on Rails",
      "REST APIs",
      "Auth & RBAC",
      "Webhooks",
      "Background jobs",
    ],
  },
  {
    id: 3,
    icon: "database",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Supabase", "Firebase Firestore"],
  },
  {
    id: 4,
    icon: "sparkles",
    skills: [
      "OpenAI",
      "LLM integrations",
      "Prompt engineering",
      "AI SaaS",
      "Workflow automation",
      "Computer vision tools",
    ],
  },
  {
    id: 5,
    icon: "cloud",
    skills: ["AWS EC2", "AWS S3", "Docker", "GitHub Actions", "Vercel", "Netlify", "Render"],
  },
  {
    id: 6,
    icon: "puzzle",
    skills: [
      "Stripe",
      "Twilio",
      "Vapi",
      "Google Maps",
      "Sanity",
      "Strapi",
      "Payload CMS",
      "Mailchimp",
    ],
  },
];

export const experienceBase: ExperienceBase[] = [
  {
    id: 1,
    company: "CCRIPT",
    companyUrl: "https://www.linkedin.com/company/ccript",
    location: "Remote",
    type: "remote",
  },
  {
    id: 2,
    company: "SQA Agency",
    companyUrl: "https://www.linkedin.com/company/sqaagency/",
    location: "Islamabad, PK",
    type: "onsite",
  },
  {
    id: 3,
    company: "Seven Koncepts",
    companyUrl: "https://www.linkedin.com/company/seven-koncepts",
    location: "Rawalpindi, PK",
    type: "onsite",
  },
  {
    id: 4,
    company: "Freelance Full-Stack Engineer",
    location: "Remote",
    type: "remote",
  },
  {
    id: 5,
    company: "Apex Games",
    companyUrl: "https://www.linkedin.com/company/apexvideogames/",
    location: "St Paul, Minnesota, US",
    type: "remote",
  },
];
