export const siteConfig = {
  name: "Eng Nour H. pindhe",
  shortName: "Eng pindhe",
  title: "Software Engineer · Full Stack Developer · Mobile Developer",
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "Mobile Developer",
    "UI/UX Designer",
    "AI Enthusiast",
  ],
  email: "kharash420@gmail.com",
  phone: "+252 63 6249555",
  location: "Hargeisa, Somaliland",
  url: "https://eng-pindhe.vercel.app",
  github: "https://github.com/pindhe",
  linkedin: "https://www.linkedin.com/in/nour-pindhe-44b711312",
  whatsapp: "https://wa.me/252636249555",
  facebook: "",
  twitter: "",
  instagram: "",
  bio: "Full Stack Developer, Software Engineer, and Mobile Developer with a background in Biotechnology and Artificial Intelligence. I build smart, scalable, high-performance web, mobile, and software solutions.",
  heroImage: "/bgimage.jpeg",
  profileImage: "/profile.jpeg",
  cvPath: "/resumepindhe.pdf",
  hero: {
    greeting: "Hello, I'm",
    availability: "Available for hire",
    speaker: "SOLTELCO Hackathon Speaker",
    focus: "Web · Mobile · AI",
    stack: ["Next.js", "React", "TypeScript", "Flutter", "FastAPI", "Python", "Laravel", "Figma"],
  },
  stats: [
    { label: "Years Experience", value: 4, suffix: "+" },
    { label: "Projects Done", value: 30, suffix: "+" },
    { label: "Client Satisfaction", value: 100, suffix: "%" },
    { label: "Fast Response", value: 24, suffix: "h" },
  ],
  about: {
    headline: "Turning Ideas Into Digital Reality",
    subtitle:
      "Software Engineer & AI — building smart, scalable products for education, healthcare, business, and public services.",
    story: [
      "Full Stack Developer | Software Engineer | Mobile Developer with a background in Biotechnology and Artificial Intelligence. Passionate about building smart, scalable, and high-performance web, mobile, and software solutions that deliver exceptional user experiences.",
      "I work across software engineering, UI/UX, graphic design, and IT support — from Hargeisa Web Hosting and Hage Reading Club to Soltelco, Abaarso Tech University, and CodeAlpha.",
    ],
    domains: ["AI", "Full Stack", "Mobile", "UI/UX", "IT Support"],
    languages: ["English", "Somali"],
    mission:
      "Continuously expand my expertise in Artificial Intelligence, Machine Learning, and Software Engineering — and build innovative, scalable, user-centered technology that addresses real-world challenges.",
    vision:
      "To become a globally recognized Artificial Intelligence Engineer and technology leader, driving ethical AI and software that transforms education, healthcare, business, and public services — and to contribute to the digital transformation of Somaliland as a hub for technological innovation in Africa.",
    journey: [
      { year: "2021", title: "Diploma of Computer", place: "Iqra College" },
      { year: "2022", title: "Diploma of ICT", place: "Tanaad College" },
      { year: "2023", title: "Bachelor of Software Engineering", place: "Abaarso Tech University" },
      { year: "2025", title: "AI & online courses", place: "SIZ · Coursera · Alison" },
      { year: "Now", title: "Full Stack & Multimedia", place: "Somaliland Innovation Zone" },
    ],
  },
};

export const skills = {
  engineering: [
    "Software Engineering",
    "Full Stack Development",
    "Web Development",
    "Artificial Intelligence",
    "API Development & Integration",
  ],
  frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "UI/UX Design"],
  backend: ["Python", "Django", "FastAPI", "Laravel", "PHP", "Node.js", "Database Management"],
  mobile: ["Mobile App Development", "Flutter", "React Native"],
  design: ["Graphic Design", "Video Editing", "Content Creation", "Digital Marketing", "Media Management"],
  systems: [
    "IT Support & Troubleshooting",
    "Network Administration",
    "CCTV Camera Systems",
    "Fingerprint & Biometric Systems",
    "Git & GitHub",
    "Microsoft Excel",
  ],
  soft: [
    "Communication Skills",
    "Teamwork & Collaboration",
    "Leadership & Interpersonal Skills",
    "Project Management",
    "Report Writing",
    "Economics & Management",
  ],
};

export const githubProfile = "https://github.com/pindhe";
export const githubReposUrl = "https://github.com/pindhe?tab=repositories";

export type ProjectCategory = "all" | "web" | "mobile" | "ai" | "ui" | "desktop" | "backend";
export type ProjectItemCategory = Exclude<ProjectCategory, "all">;

export type Project = {
  title: string;
  repo: string;
  category: ProjectItemCategory;
  tech: string[];
  language: string;
  description: string;
  features: string[];
  github: string;
  liveUrl?: string;
  stars: number;
  updated: string;
  image?: string;
};

const ghShot = (repo: string, file: string) =>
  `https://raw.githubusercontent.com/pindhe/${repo}/HEAD/${file.replace(/ /g, "%20")}`;

export const projects: Project[] = [
  {
    title: "ilmaCader",
    repo: "ilmaCader",
    category: "web",
    language: "TypeScript",
    tech: ["React", "Vite", "Django", "PostgreSQL"],
    description:
      "One Family. One Platform. One Future. Full-stack family hub for members, a relationship tree, documents, events, tasks, and finance.",
    features: ["Family tree", "Documents & finance", "JWT roles"],
    github: "https://github.com/pindhe/ilmaCader",
    liveUrl: "https://ilmacader.vercel.app/",
    stars: 1,
    updated: "Sep 2026",
    image: ghShot("ilmaCader", "frontend/public/images/login-bg.jpg"),
  },
  {
    title: "HRC Management",
    repo: "HRC-management",
    category: "web",
    language: "TypeScript",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description:
      "Hage Reading Club — Somali-first club platform to read, learn, share, and grow, with live member sign-in.",
    features: ["Member sign-in", "Somali-first UI", "Club branding"],
    github: "https://github.com/pindhe/HRC-management",
    liveUrl: "https://hagerc.vercel.app",
    stars: 0,
    updated: "Sep 2026",
    image: ghShot("HRC-management", "public/club-bg.jpg"),
  },
  {
    title: "Tanaad College",
    repo: "Tanaad-College",
    category: "web",
    language: "TypeScript",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Auth.js"],
    description:
      "Official Tanaad College site in Hargeisa — ICT diploma and professional courses, admissions, gallery, and an admin CMS.",
    features: ["Online applications", "Admin CMS", "EN / SO / AR"],
    github: "https://github.com/pindhe/Tanaad-College",
    liveUrl: "https://tanaadcollege.vercel.app",
    stars: 0,
    updated: "Sep 2026",
    image: ghShot("Tanaad-College", "public/images/imgs/1.jpg"),
  },
  {
    title: "AI Birth Date",
    repo: "Ai-Birth-date",
    category: "ai",
    language: "PHP",
    tech: ["PHP", "JavaScript", "Tailwind CSS"],
    description: "AI-assisted birth date and identity generator with age calculation and a glassmorphism UI.",
    features: ["AI date generation", "Age calculator", "Responsive UI"],
    github: "https://github.com/pindhe/Ai-Birth-date",
    liveUrl: "https://ai-birth.kesug.com/",
    stars: 14,
    updated: "Jun 2026",
    image: ghShot("Ai-Birth-date", "Screenshot 2026-06-25 174758.png"),
  },
  {
    title: "AI Quiz Application",
    repo: "Ai-Quize-application",
    category: "ai",
    language: "TypeScript",
    tech: ["React", "TypeScript", "Gemini", "Firebase"],
    description: "Pindhe AI — Somali-first brain quiz with Gemini questions, XP, categories, and timed rounds.",
    features: ["Gemini live questions", "Somali UI", "XP & leaderboard"],
    github: "https://github.com/pindhe/Ai-Quize-application",
    liveUrl: "https://aiquize.onrender.com/",
    stars: 17,
    updated: "Aug 2026",
    image: ghShot("Ai-Quize-application", "Screenshot 2026-05-17 132752.png"),
  },
  {
    title: "ATU Events",
    repo: "ATU-EVENTS",
    category: "mobile",
    language: "Dart",
    tech: ["Flutter", "FastAPI", "Python", "PostgreSQL"],
    description: "Event management for Abaarso Tech University — Flutter app, admin dashboard, and FastAPI backend.",
    features: ["Student & teacher roles", "Class events", "JWT auth"],
    github: "https://github.com/pindhe/ATU-EVENTS",
    stars: 20,
    updated: "Jun 2026",
    image: ghShot("ATU-EVENTS", "Screenshot 2026-05-07 205752.png"),
  },
  {
    title: "Qaahira Dental Clinic",
    repo: "Qaahira_Dental_clini",
    category: "web",
    language: "PHP",
    tech: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    description: "Multilingual dental clinic platform with appointments, patient records, and an admin dashboard.",
    features: ["Online booking", "Admin CMS", "English & Arabic"],
    github: "https://github.com/pindhe/Qaahira_Dental_clini",
    liveUrl: "https://qaahira-dental-clini.vercel.app",
    stars: 44,
    updated: "Jul 2026",
    image: ghShot("Qaahira_Dental_clini", "Qaahira-image.png"),
  },
  {
    title: "ilacaawi",
    repo: "ilacaawi",
    category: "web",
    language: "TypeScript",
    tech: ["React", "Django", "PostgreSQL", "Stripe"],
    description: "East Africa crowdfunding platform — campaigns, donations, Stripe payments, and admin moderation.",
    features: ["Campaigns", "Secure donations", "Admin panel"],
    github: "https://github.com/pindhe/ilacaawi",
    stars: 1,
    updated: "Aug 2026",
    image: ghShot("ilacaawi", "Screenshot 2026-08-05 145841.png"),
  },
];

export const services = [
  { title: "UI/UX Design", icon: "Palette", description: "Beautiful, user-centered interfaces with Figma prototypes and design systems.", features: ["Wireframes", "Prototypes", "Design systems"] },
  { title: "Website Development", icon: "Globe", description: "Fast, responsive, SEO-optimized web applications built with modern frameworks.", features: ["Next.js / React", "Responsive", "SEO ready"] },
  { title: "Mobile App Development", icon: "Smartphone", description: "Cross-platform apps with Flutter and React Native for iOS and Android.", features: ["Flutter", "React Native", "App Store ready"] },
  { title: "Backend Development", icon: "Server", description: "Scalable APIs and server-side logic with Node.js, Python, and PHP.", features: ["REST APIs", "Authentication", "Microservices"] },
  { title: "AI Solutions", icon: "Brain", description: "Intelligent features powered by modern AI tools and automation workflows.", features: ["Chatbots", "AI integration", "Automation"] },
  { title: "Cloud Deployment", icon: "Cloud", description: "Deploy and scale applications on Vercel, AWS, Azure, and Google Cloud.", features: ["CI/CD", "Docker", "Monitoring"] },
  { title: "API Integration", icon: "Plug", description: "Connect third-party services, payment gateways, and external platforms seamlessly.", features: ["REST / GraphQL", "Webhooks", "OAuth"] },
  { title: "Database Design", icon: "Database", description: "Efficient database architecture with MySQL, PostgreSQL, and MongoDB.", features: ["Schema design", "Optimization", "Migrations"] },
  { title: "Consultation", icon: "MessageSquare", description: "Technical guidance, code reviews, and architecture planning for your projects.", features: ["Code review", "Planning", "Mentoring"] },
];

export const blogPosts = [
  {
    title: "Building Scalable APIs with FastAPI",
    category: "Programming",
    excerpt: "Learn how to structure FastAPI projects for production with async patterns and clean architecture.",
    date: "Jun 2026",
    readTime: "6 min read",
  },
  {
    title: "UI/UX Principles for Developers",
    category: "UI/UX",
    excerpt: "Essential design principles every developer should know to create interfaces users love.",
    date: "May 2026",
    readTime: "5 min read",
  },
  {
    title: "Getting Started with AI Integration",
    category: "AI",
    excerpt: "A practical guide to adding AI features to your web applications using modern APIs.",
    date: "Apr 2026",
    readTime: "8 min read",
  },
  {
    title: "Career Tips for Junior Developers",
    category: "Career",
    excerpt: "Actionable advice for breaking into software engineering and growing your skills fast.",
    date: "Mar 2026",
    readTime: "4 min read",
  },
];

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: "work" | "internship" | "training";
  description: string;
  achievements: string[];
  link?: string;
};

export const experience: ExperienceEntry[] = [
  {
    id: "hwhd",
    company: "Hargeisa Web Hosting & Domain",
    role: "Software Developer",
    period: "Dec 2025 — Feb 2026",
    location: "Hargeisa, Somaliland",
    type: "work",
    description:
      "Software development and technical support for a Hargeisa hosting and domain company — keeping sites, domains, and client systems running.",
    achievements: [
      "Web hosting & domain management",
      "Software development & technical support",
    ],
  },
  {
    id: "employee-portal",
    company: "Soltelco and Abaarso Tech University",
    role: "Employee Portal Management",
    period: "Nov 2025",
    location: "Hargeisa, Somaliland",
    type: "work",
    description:
      "Built a full-stack employee portal with the Soltelco and Abaarso Tech University team.",
    achievements: [
      "Building a full-stack program",
      "Teamwork",
      "Problem solving",
    ],
  },
  {
    id: "hrc",
    company: "Hage Reading Club",
    role: "Designer & Video Editor",
    period: "Apr 2025 — Present",
    location: "Hargeisa, Somaliland",
    type: "work",
    description:
      "Designer, video editor, and developer for Hage Reading Club — member contributing visual and product work.",
    achievements: ["Designer and video editor", "Member", "Development"],
    link: "https://hagerc.vercel.app",
  },
  {
    id: "codealpha",
    company: "CodeAlpha",
    role: "Internship Program",
    period: "2026",
    location: "Remote",
    type: "internship",
    description: "Remote internship focused on full-stack development and mobile apps.",
    achievements: ["Full stack development", "Mobile app developer"],
  },
  {
    id: "iqra",
    company: "Iqra College",
    role: "Assistant Secretary & Office Manager",
    period: "Jun 2023 — Sep 2023",
    location: "Hargeisa, Somaliland",
    type: "work",
    description:
      "Supported daily administrative and office operations, and kept student records, files, and official documentation in order.",
    achievements: [
      "Daily administrative and office operations",
      "Student records, files, and official documentation",
    ],
  },
];

export type EducationEntry = {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  status: "Completed" | "In Progress";
  field: string;
  description: string;
  highlights: string[];
  projectLink?: string;
};

export const education: EducationEntry[] = [
  {
    id: "atu-bse",
    degree: "Bachelor of Software Engineering",
    school: "Abaarso Tech University",
    location: "Abaarso, Somaliland",
    period: "2023 — 2026",
    status: "In Progress",
    field: "Software Engineering",
    description:
      "Bachelor's program in software engineering at Abaarso Tech University.",
    highlights: [],
    projectLink: "https://github.com/pindhe/ATU-EVENTS",
  },
  {
    id: "siz-fs",
    degree: "Diploma of Full Stack Development",
    school: "Somaliland Innovation Zone",
    location: "Hargeisa, Somaliland",
    period: "Mar 2026 — Present",
    status: "In Progress",
    field: "Full Stack",
    description:
      "Full-stack development diploma at Somaliland Innovation Zone.",
    highlights: [],
    projectLink: "https://github.com/pindhe/Somaliland-Innovation-Zone",
  },
  {
    id: "online-courses",
    degree: "Online Courses",
    school: "Coursera & Alison",
    location: "Online",
    period: "2025 — Present",
    status: "In Progress",
    field: "Online Learning",
    description: "Ongoing professional courses on Coursera and Alison.",
    highlights: [],
  },
  {
    id: "tanaad-ict",
    degree: "Diploma of ICT",
    school: "Tanaad College",
    location: "Hargeisa, Somaliland",
    period: "2022 — 2023",
    status: "Completed",
    field: "ICT",
    description: "Diploma of Information and Communication Technology at Tanaad College.",
    highlights: [],
  },
  {
    id: "siz-multimedia",
    degree: "Multimedia and Graphic Design",
    school: "Somaliland Innovation Zone",
    location: "Hargeisa, Somaliland",
    period: "2026 — Present",
    status: "In Progress",
    field: "Design",
    description: "Multimedia and graphic design program at Somaliland Innovation Zone.",
    highlights: [],
  },
  {
    id: "siz-ai",
    degree: "Artificial Intelligence",
    school: "Somaliland Innovation Zone",
    location: "Hargeisa, Somaliland",
    period: "2025 — 2026",
    status: "Completed",
    field: "AI",
    description: "Artificial Intelligence program at Somaliland Innovation Zone.",
    highlights: [],
  },
  {
    id: "siz-troubleshooting",
    degree: "Troubleshooting",
    school: "Somaliland Innovation Zone",
    location: "Hargeisa, Somaliland",
    period: "Mar 2026 — Apr 2026",
    status: "Completed",
    field: "IT Support",
    description: "Troubleshooting training at Somaliland Innovation Zone.",
    highlights: [],
  },
  {
    id: "iqra-computer",
    degree: "Diploma of Computer",
    school: "Iqra College",
    location: "Hargeisa, Somaliland",
    period: "2021 — 2022",
    status: "Completed",
    field: "Computer Studies",
    description: "Computer diploma at Iqra College.",
    highlights: [],
  },
  {
    id: "interpersonal",
    degree: "Interpersonal Skills",
    school: "Training",
    location: "Hargeisa, Somaliland",
    period: "May 2026",
    status: "Completed",
    field: "Soft Skills",
    description: "Interpersonal skills training.",
    highlights: [],
  },
];

export const navLinks = [
  { href: "#home", label: "Home", icon: "Home" },
  { href: "#about", label: "About", icon: "User" },
  { href: "#skills", label: "Skills", icon: "Code2" },
  { href: "#projects", label: "Projects", icon: "FolderKanban" },
  { href: "#services", label: "Services", icon: "Layers" },
  { href: "#experience", label: "Experience", icon: "Briefcase" },
  { href: "#contact", label: "Contact", icon: "Mail" },
];

export const projectFilters: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
];
