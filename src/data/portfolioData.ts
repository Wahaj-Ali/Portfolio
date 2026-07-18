export interface Project {
  id: number;
  uniqueId: string;
  title: string;
  description: string;
  img: string;
  techs: string[];
  btnText: string;
  live: string;
  source?: string;
}

export interface SkillCategory {
  id: number;
  title: string;
  icon: string;
  skills: string[];
}

export interface ExperienceItem {
  id: number;
  company: string;
  companyUrl?: string;
  role: string;
  duration: string;
  location: string;
  type: "Onsite" | "Remote" | "Hybrid";
  bullets: string[];
}

export const sideProjects: Project[] = [
  {
    id: 0,
    uniqueId: 'fullstack_prcjt',
    title: 'Homely - Full-Stack App',
    description: 'This Full-stack app caters to individuals seeking to purchase residential properties & offers a user-friendly interface where users can register and conveniently schedule appointments to visit their selected houses of interest.',
    img: '/assets/projects/homely-mockup.webp',
    techs: ['React', 'SASS', 'Ruby on Rails', 'PostgreSQL'],
    btnText: 'See Project',
    live: 'https://homelyheaven.netlify.app/',
    source: 'https://github.com/Wahaj-Ali/homely-frontend',
  },
  {
    id: 1,
    uniqueId: 'prcjt6',
    title: 'PAK ORTHOCON',
    description: 'It is a website for an event happening in my locality. It consists of two working pages i.e., Home page and About Page.',
    img: '/assets/projects/capstone1-mockup.webp',
    techs: ['HTML5', 'CSS3', 'JavaScript'],
    btnText: 'See Project',
    live: 'https://wahaj-ali.github.io/Capstone-1/index.html',
    source: 'https://github.com/Wahaj-Ali/Capstone-1',
  },
  {
    id: 2,
    uniqueId: 'prcjt3',
    title: 'TV Hub',
    description: 'This JavaScript project is a web app based on an external API(TVmaze DB). User can search for a show, like it, and comment on any of your favorite shows.',
    img: '/assets/projects/tvhub-mockup.webp',
    techs: ['HTML5', 'JavaScript', 'CSS3', 'Webpack'],
    btnText: 'See Project',
    live: 'https://wahaj-ali.github.io/tv-hub/dist/',
    source: 'https://github.com/Wahaj-Ali/tv-hub',
  },
  {
    id: 3,
    uniqueId: 'prcjt2',
    title: 'Population Index',
    description: "This 'Metrics webapp' is a React SPA that shows the countries of the world along with their population count. It uses API to fetch the data & redux to store the data.",
    img: '/assets/projects/metrics-mockup.webp',
    techs: ['JSX', 'React', 'CSS3', 'Redux'],
    btnText: 'See Project',
    live: 'https://populaton-index-by-wahaj.netlify.app/',
    source: 'https://github.com/Wahaj-Ali/metrics-webapp',
  },
  {
    id: 4,
    uniqueId: 'prcjt4',
    title: 'Bookstore',
    description: "The 'Bookstore' is a React SPA that uses Redux as state-management tool. It shows a list of books and a form to add new books.",
    img: '/assets/projects/bookstore-mockup.webp',
    techs: ['React', 'Redux', 'CSS3', 'JSX'],
    btnText: 'See Project',
    live: 'https://wahaj-bookstore.netlify.app/',
    source: 'https://github.com/Wahaj-Ali/bookstore',
  },
  {
    id: 5,
    uniqueId: 'everypenny',
    title: 'Every Penny',
    description: 'This project is created as part of the rails capstone at Microverse. This app is a mobile web application where a user manage its budget: have a list of transactions associated with a category, so that the user can see how much money it spent and on what.',
    img: '/assets/projects/everypenny.webp',
    techs: ['Ruby', 'CSS3', 'Ruby on Rails', 'PostgreSQL'],
    btnText: 'See Project',
    live: 'https://budget-app-eydq.onrender.com/',
    source: 'https://github.com/Wahaj-Ali/every-penny',
  },
];

export const freelanceProjects: Project[] = [
  {
    id: 0,
    uniqueId: 'fullyConstructed',
    title: 'Fully Constructed',
    description: 'Designed and developed a responsive website for a leading construction company using React. Showcasing my creative prowess and proficiency in web development. Leveraging my skills, I implemented a user-centric design, ensuring a seamless and engaging experience for visitors.',
    img: '/assets/projects/fully-constructed.webp',
    techs: ['React', 'CSS', 'JSX'],
    btnText: 'See Project',
    live: 'https://www.fullyconstructed.com/',
  },
  {
    id: 1,
    uniqueId: 'instantlyInsured',
    title: 'Instantly Insured',
    description: "A professional and responsive insurance company website using React, featuring seamless form integration and robust validation functionalities. Ensure an optimal user experience through a sleek and intuitive design, reflecting the company's commitment to efficiency and reliability.",
    img: '/assets/projects/instantly-insured.webp',
    techs: ['React', 'CSS', 'Framer Motion', 'Swiper JS'],
    btnText: 'See Project',
    live: 'https://www.instantlyinsured.com',
  },
  {
    id: 2,
    uniqueId: 'instantlyScaled',
    title: 'Instantly Scaled',
    description: "A responsive website using React for a forward-thinking company specializing in digital solutions. Having an aesthetically pleasing and user-centric design to showcase the company's innovative approach, with a focus on seamless responsiveness across various devices.",
    img: '/assets/projects/instantly-scaled.webp',
    techs: ['React', 'CSS', 'Framer Motion', 'Swiper JS'],
    btnText: 'See Project',
    live: 'https://www.instantlyscaled.com',
  },
];

export const skillCards: SkillCategory[] = [
  {
    id: 1,
    title: 'Frontend',
    icon: 'layout',
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Redux Toolkit',
      'Tailwind CSS',
      'Material UI',
      'Framer Motion',
      'GSAP',
      'React Konva',
    ],
  },
  {
    id: 2,
    title: 'Backend',
    icon: 'server',
    skills: [
      'Node.js',
      'Express.js',
      'FastAPI',
      'Ruby on Rails',
      'REST APIs',
      'Auth & RBAC',
      'Webhooks',
      'Background jobs',
    ],
  },
  {
    id: 3,
    title: 'Databases',
    icon: 'database',
    skills: ['PostgreSQL', 'MongoDB', 'Prisma', 'Supabase', 'Firebase Firestore'],
  },
  {
    id: 4,
    title: 'AI & Automation',
    icon: 'sparkles',
    skills: [
      'OpenAI',
      'LLM integrations',
      'Prompt engineering',
      'AI SaaS',
      'Workflow automation',
      'Computer vision tools',
    ],
  },
  {
    id: 5,
    title: 'Cloud & DevOps',
    icon: 'cloud',
    skills: ['AWS EC2', 'AWS S3', 'Docker', 'GitHub Actions', 'Vercel', 'Netlify', 'Render'],
  },
  {
    id: 6,
    title: 'Integrations',
    icon: 'puzzle',
    skills: [
      'Stripe',
      'Twilio',
      'Vapi',
      'Google Maps',
      'Sanity',
      'Strapi',
      'Payload CMS',
      'Mailchimp',
    ],
  },
];

export const focusAreas: string[] = [
  'Responsive frontend applications',
  'Scalable backend APIs',
  'Database architecture',
  'AI integrations',
  'Business automation',
  'Cloud deployment',
  'Third-party integrations',
  'Performance optimization',
];

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    company: 'CCRIPT',
    companyUrl: 'https://www.linkedin.com/company/ccript',
    role: 'Full-Stack Engineer',
    duration: 'Dec 2024 - Present',
    location: 'Remote',
    type: 'Remote',
    bullets: [
      'Developed and delivered 10+ full-stack web applications using MERN, Next.js, FastAPI, Supabase, Firebase, and headless CMS platforms.',
      'Built 10+ AI-powered Next.js (TypeScript) applications by integrating AI pipeline APIs for PDF ingestion, real-time processing status tracking, and secure AWS-signed document retrieval.',
      'Collaborated directly with clients across 10+ projects, establishing structured feedback processes that reduced revision cycles by 35%.',
      'Automated Dockerized deployments on AWS EC2 with CI/CD pipelines, cutting average deployment time from 1 hour to 10 minutes and improving application uptime by 30%.',
    ],
  },
  {
    id: 2,
    company: 'SQA Agency',
    companyUrl: 'https://www.linkedin.com/company/sqaagency/',
    role: 'MERN Stack Developer',
    duration: 'Sept 2024 - Dec 2024',
    location: 'Islamabad, PK',
    type: 'Onsite',
    bullets: [
      'Developed robust web applications, Shopify apps, and admin dashboards using the MERN stack and Next.js.',
      'Shipped AI-assisted features, business automation workflows, and third-party integrations for client products.',
    ],
  },  {
    id: 3,
    company: 'Seven Koncepts',
    companyUrl: 'https://www.linkedin.com/company/seven-koncepts',
    role: 'Frontend Developer',
    duration: 'Dec 2023 - Sept 2024',
    location: 'Rawalpindi, PK',
    type: 'Onsite',
    bullets: [
      'Developed and refined 10+ user interfaces with React and Next.js across marketing and product surfaces.',
      'Collaborated with engineering and design to integrate external APIs into web pages and 10+ applications.',
      'Documented technical specifications and dependencies for maintainable handoff and long-term ownership.',
    ],
  },
  {
    id: 4,
    company: 'Freelance Full-Stack Engineer',
    role: 'Full-Stack & AI Engineer',
    duration: '2022 - Present',
    location: 'Remote',
    type: 'Remote',
    bullets: [
      'Delivered SaaS platforms, dashboards, e-commerce, and marketing sites for clients across construction, insurance, marketing, and AI.',
      'Built construction workflow automation with SMS/AI voice outreach, admin visibility, and escalation flows.',
      'Developed AI video generation SaaS with automated publishing to YouTube, TikTok, and Instagram, plus CV annotation tools for human-in-the-loop review.',
    ],
  },
  {
    id: 5,
    company: 'Apex Games',
    companyUrl: 'https://www.linkedin.com/company/apexvideogames/',
    role: 'Junior Web Developer',
    duration: 'Jun 2023 - Nov 2023',
    location: 'St Paul, Minnesota, US',
    type: 'Remote',
    bullets: [
      'Built and refined key website pages and sections in React and custom CSS for a smoother product experience.',
      'Collaborated remotely across time zones with Git-based workflows and biweekly team syncs.',
    ],
  },
];
