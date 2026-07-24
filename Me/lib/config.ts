export const siteConfig = {
  name: "Eng Nour H. pindhe",
  shortName: "Eng pindhe",
  title: "Software Engineer · Full Stack Developer · UI/UX Designer",
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Mobile App Developer",
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
  bio: "Full Stack Developer with a background in Biotechnology and Artificial Intelligence. I build smart, scalable web and mobile solutions that blend clean engineering with real-world impact.",
  heroImage: "/bgimage.jpeg",
  profileImage: "/image.jpeg",
  stats: [
    { label: "Years Experience", value: 4, suffix: "+" },
    { label: "Projects Done", value: 30, suffix: "+" },
    { label: "Client Satisfaction", value: 100, suffix: "%" },
    { label: "Fast Response", value: 24, suffix: "h" },
  ],
};

export const skills = {
  frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Bootstrap"],
  backend: ["Python", "Django", "FastAPI", "Laravel", "PHP", "Node.js", "Express"],
  database: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "SQL Server"],
  mobile: ["Flutter", "React Native"],
  tools: ["Git", "GitHub", "Figma", "VS Code", "Docker", "Firebase", "Vercel", "Render", "Linux"],
  cloud: ["AWS", "Azure", "Google Cloud"],
  soft: ["Leadership", "Communication", "Problem Solving", "Teamwork", "Time Management", "Critical Thinking"],
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
  stars: number;
  updated: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Qaahira Dental Clinic",
    repo: "Qaahira_Dental_clini",
    category: "web",
    language: "TypeScript",
    tech: ["TypeScript", "FastAPI", "Python", "Tailwind CSS"],
    description: "Full-stack dental clinic system with appointment scheduling, patient records, and treatment management.",
    features: ["Appointments", "Patient records", "FastAPI backend"],
    github: "https://github.com/pindhe/Qaahira_Dental_clini",
    stars: 44,
    updated: "Jun 2026",
  },
  {
    title: "Automatic English College",
    repo: "Automatic-English-College",
    category: "web",
    language: "PHP",
    tech: ["PHP", "MySQL", "HTML", "CSS"],
    description: "College management platform for English language institution with student enrollment and course tracking.",
    features: ["Student portal", "Course management", "Admin dashboard"],
    github: "https://github.com/pindhe/Automatic-English-College",
    stars: 52,
    updated: "May 2026",
  },
  {
    title: "Iqra College",
    repo: "Iqra-College",
    category: "web",
    language: "PHP",
    tech: ["PHP", "MySQL", "Bootstrap"],
    description: "Educational institution website and management system built for Iqra College operations.",
    features: ["College portal", "Student records", "Responsive design"],
    github: "https://github.com/pindhe/Iqra-College",
    stars: 44,
    updated: "Jun 2026",
  },
  {
    title: "Water Billing System",
    repo: "Water-Billing-system",
    category: "backend",
    language: "JavaScript",
    tech: ["Node.js", "Express", "MySQL"],
    description: "Utility billing system for water consumption tracking, invoicing, and payment management.",
    features: ["Billing automation", "Customer accounts", "Usage reports"],
    github: "https://github.com/pindhe/Water-Billing-system",
    stars: 43,
    updated: "Apr 2026",
  },
  {
    title: "Pharmacy Management System",
    repo: "Pharmacy-Management-system",
    category: "desktop",
    language: "C#",
    tech: ["C#", ".NET", "MySQL"],
    description: "Desktop pharmacy application for inventory control, prescriptions, and sales management.",
    features: ["Stock management", "Prescriptions", "Sales tracking"],
    github: "https://github.com/pindhe/Pharmacy-Management-system",
    stars: 43,
    updated: "Apr 2026",
  },
  {
    title: "School Management System",
    repo: "School_management",
    category: "web",
    language: "Java",
    tech: ["Angular", "TypeScript", "Spring Boot", "MySQL"],
    description: "Enterprise school platform with JWT auth — Angular frontend and Java Spring Boot backend.",
    features: ["JWT authentication", "Student management", "Tailwind UI"],
    github: "https://github.com/pindhe/School_management",
    stars: 9,
    updated: "Jun 2026",
  },
  {
    title: "ATU Events",
    repo: "ATU-EVENTS",
    category: "mobile",
    language: "Dart",
    tech: ["Flutter", "FastAPI", "Python", "Tailwind CSS"],
    description: "University events app — Flutter mobile client with FastAPI backend for Abaarso Tech University.",
    features: ["Event listings", "Mobile app", "REST API"],
    github: "https://github.com/pindhe/ATU-EVENTS",
    stars: 20,
    updated: "Jun 2026",
  },
  {
    title: "Fitness App",
    repo: "Fitness",
    category: "mobile",
    language: "Dart",
    tech: ["Flutter", "Firebase", "Tailwind CSS"],
    description: "Cross-platform fitness tracking mobile app with Firebase backend and modern UI.",
    features: ["Workout tracking", "Firebase auth", "Cross-platform"],
    github: "https://github.com/pindhe/Fitness",
    stars: 19,
    updated: "May 2026",
  },
  {
    title: "Somaliland Innovation Zone",
    repo: "Somaliland-Innovation-Zone",
    category: "web",
    language: "Python",
    tech: ["Python", "Django", "PostgreSQL"],
    description: "Student registration system for Somaliland Innovation Zone training programs.",
    features: ["Student registration", "Admin panel", "Data management"],
    github: "https://github.com/pindhe/Somaliland-Innovation-Zone",
    stars: 1,
    updated: "Jul 2026",
  },
  {
    title: "Job Portal & Recruitment",
    repo: "Job-Portal-Recruitment-System",
    category: "web",
    language: "HTML",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    description: "Online job portal connecting employers and candidates with application tracking.",
    features: ["Job listings", "Applications", "Employer dashboard"],
    github: "https://github.com/pindhe/Job-Portal-Recruitment-System",
    stars: 1,
    updated: "Jun 2026",
  },
  {
    title: "Teletronic eCommerce",
    repo: "Teletronic_eCommerce",
    category: "web",
    language: "HTML",
    tech: ["HTML", "CSS", "JavaScript"],
    description: "Modern eCommerce storefront for electronics products with cart and product catalog.",
    features: ["Product catalog", "Shopping cart", "Responsive store"],
    github: "https://github.com/pindhe/Teletronic_eCommerce",
    stars: 1,
    updated: "Jul 2026",
  },
  {
    title: "AI Quiz Application",
    repo: "Ai-Quize-application",
    category: "ai",
    language: "TypeScript",
    tech: ["TypeScript", "Firebase", "React"],
    description: "Interactive AI-powered quiz application with Firebase backend and real-time scoring.",
    features: ["AI quizzes", "Firebase", "Score tracking"],
    github: "https://github.com/pindhe/Ai-Quize-application",
    stars: 17,
    updated: "May 2026",
  },
  {
    title: "AI Birth Date",
    repo: "Ai-Birth-date",
    category: "ai",
    language: "PHP",
    tech: ["PHP", "Tailwind CSS", "JavaScript"],
    description: "AI-assisted birth date and age calculation tool with a clean Tailwind CSS interface.",
    features: ["AI integration", "Tailwind UI", "Age calculator"],
    github: "https://github.com/pindhe/Ai-Birth-date",
    stars: 14,
    updated: "Jun 2026",
  },
  {
    title: "Hargeisa Village",
    repo: "Hargeisa-Village",
    category: "web",
    language: "PHP",
    tech: ["PHP", "MySQL", "CSS"],
    description: "Community village management web platform for local administration in Hargeisa.",
    features: ["Community portal", "Records", "Local admin"],
    github: "https://github.com/pindhe/Hargeisa-Village",
    stars: 6,
    updated: "Jun 2026",
  },
  {
    title: "Irshaad School",
    repo: "Irshaad_school",
    category: "web",
    language: "JavaScript",
    tech: ["JavaScript", "Tailwind CSS", "HTML"],
    description: "School website and management interface built with vanilla JavaScript and Tailwind CSS.",
    features: ["School portal", "Tailwind design", "Student info"],
    github: "https://github.com/pindhe/Irshaad_school",
    stars: 11,
    updated: "Jun 2026",
  },
  {
    title: "Zaad Payment",
    repo: "Zaad-payment",
    category: "web",
    language: "HTML",
    tech: ["HTML", "Tailwind CSS", "JavaScript"],
    description: "Payment integration interface for Zaad mobile money service in Somaliland.",
    features: ["Payment UI", "Zaad integration", "Responsive"],
    github: "https://github.com/pindhe/Zaad-payment",
    stars: 19,
    updated: "May 2026",
  },
  {
    title: "Eng pindhe Portfolio",
    repo: "pindhe",
    category: "ui",
    language: "HTML",
    tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    description: "Personal developer portfolio and about page — my original GitHub profile repository.",
    features: ["About me", "Project links", "GitHub Pages"],
    github: "https://github.com/pindhe/pindhe",
    stars: 48,
    updated: "Jul 2026",
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
    id: "freelance",
    company: "Freelance / Independent",
    role: "Full Stack Developer & UI/UX Designer",
    period: "2022 — Present",
    location: "Hargeisa, Somaliland",
    type: "work",
    description:
      "Delivering end-to-end web, mobile, and AI solutions for clients — from dental clinics and colleges to billing systems and eCommerce platforms.",
    achievements: [
      "27+ public GitHub repositories",
      "Healthcare, education & fintech projects",
      "PHP, Python, Node.js, Flutter stack",
      "133+ GitHub followers",
    ],
    link: "https://github.com/pindhe",
  },
  {
    id: "siz",
    company: "Somaliland Innovation Zone",
    role: "Full Stack Development Trainee",
    period: "2025 — 2026",
    location: "Hargeisa, Somaliland",
    type: "training",
    description:
      "Advanced full-stack training program building production apps including the SIZ Student Registration system.",
    achievements: [
      "Student registration platform (Python)",
      "Modern React & Node.js stack",
      "Startup technology workshops",
      "Team-based project delivery",
    ],
    link: "https://github.com/pindhe/Somaliland-Innovation-Zone",
  },
  {
    id: "codealphans",
    company: "CodeAlphan",
    role: "Software Engineering Intern",
    period: "2025 — 2026",
    location: "Remote / Hargeisa",
    type: "internship",
    description:
      "Internship focused on Python development, testing workflows, and real-world software engineering practices.",
    achievements: [
      "Python application development",
      "Testing & QA workflows",
      "Agile team collaboration",
      "Production code standards",
    ],
    link: "https://github.com/pindhe/CodeAlphan_1-3Test",
  },
  {
    id: "atu",
    company: "Abaarso Tech University",
    role: "Software Engineering Student & Developer",
    period: "2023 — 2024",
    location: "Abaarso, Somaliland",
    type: "work",
    description:
      "Built university-facing apps including ATU Events (Flutter + FastAPI) while completing Software Engineering certification.",
    achievements: [
      "ATU Events mobile app (20★)",
      "Hackathon recognition 2024",
      "Event management system",
      "Flutter & FastAPI integration",
    ],
    link: "https://github.com/pindhe/ATU-EVENTS",
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
    id: "siz-fs",
    degree: "Full Stack Development",
    school: "Somaliland Innovation Zone",
    location: "Hargeisa, Somaliland",
    period: "2025 — 2026",
    status: "In Progress",
    field: "Software Engineering & Startup Tech",
    description:
      "Intensive full-stack program covering modern web development, databases, deployment, and startup technology.",
    highlights: [
      "React, Node.js & Python stack",
      "SIZ Student Registration system",
      "Team projects & mentorship",
      "Startup innovation workshops",
    ],
    projectLink: "https://github.com/pindhe/Somaliland-Innovation-Zone",
  },
  {
    id: "tanaad-ict",
    degree: "Diploma in ICT",
    school: "Tanaad Computer Science College",
    location: "Hargeisa, Somaliland",
    period: "2024",
    status: "Completed",
    field: "Information & Communication Technology",
    description:
      "Comprehensive ICT diploma covering computer fundamentals, networking, programming, and system administration.",
    highlights: [
      "Programming fundamentals",
      "Network & system admin",
      "Database management",
      "Graduated 2024",
    ],
  },
  {
    id: "atu-se",
    degree: "Software Engineering",
    school: "Abaarso Tech University",
    location: "Abaarso, Somaliland",
    period: "2023 — 2024",
    status: "Completed",
    field: "Computer Science & Engineering",
    description:
      "Professional software engineering program with focus on full-stack development, system design, and mobile applications.",
    highlights: [
      "ATU Events app (Flutter + FastAPI)",
      "Hackathon recognition 2024",
      "Software architecture & design",
      "Mobile & backend integration",
    ],
    projectLink: "https://github.com/pindhe/ATU-EVENTS",
  },
  {
    id: "iqra-english",
    degree: "English Language Proficiency",
    school: "IQRA College",
    location: "Hargeisa, Somaliland",
    period: "2022",
    status: "Completed",
    field: "English Language — Grade A-",
    description:
      "Advanced English certification demonstrating professional communication, technical writing, and presentation skills.",
    highlights: [
      "Grade: A-",
      "Professional communication",
      "Technical documentation",
      "Completed 2022",
    ],
  },
];

export type CertificateEntry = {
  title: string;
  org: string;
  year: string;
  category: CertificateCategory;
  description: string;
  credentialId: string;
  verified: boolean;
  grade?: string;
  link?: string;
};

export const certificates: CertificateEntry[] = [
  {
    title: "Diploma in ICT",
    org: "Tanaad Computer Science College",
    year: "2024",
    category: "programming",
    description:
      "Official ICT diploma — programming, networking, databases, and computer systems. Foundation for all subsequent software work.",
    credentialId: "TAN-ICT-2024",
    verified: true,
    grade: "Completed",
  },
  {
    title: "Software Engineering",
    org: "Abaarso Tech University",
    year: "2024",
    category: "engineering",
    description:
      "Certified Software Engineering program covering full-stack development, mobile apps, APIs, and software architecture.",
    credentialId: "ATU-SE-2024",
    verified: true,
    grade: "Completed",
    link: "https://github.com/pindhe/ATU-EVENTS",
  },
  {
    title: "English Proficiency A-",
    org: "IQRA College",
    year: "2022",
    category: "leadership",
    description:
      "English language certification at A- grade — enables professional client communication and technical documentation.",
    credentialId: "IQRA-ENG-A-2022",
    verified: true,
    grade: "A-",
    link: "https://github.com/pindhe/Iqra-College",
  },
  {
    title: "Hackathon Recognition",
    org: "Abaarso Tech University & Soltelco",
    year: "2024",
    category: "awards",
    description:
      "Awarded for outstanding innovation and performance at the Abaarso Tech & Soltelco collaborative hackathon.",
    credentialId: "HACK-ATU-SOLTELCO-2024",
    verified: true,
  },
  {
    title: "Full Stack Development",
    org: "Somaliland Innovation Zone",
    year: "2025",
    category: "web",
    description:
      "Advanced full-stack certification in progress — React, Node.js, Python, databases, and cloud deployment.",
    credentialId: "SIZ-FS-2025",
    verified: true,
    grade: "In Progress",
    link: "https://github.com/pindhe/Somaliland-Innovation-Zone",
  },
  {
    title: "GitHub Starstruck",
    org: "GitHub Achievements",
    year: "2025",
    category: "awards",
    description:
      "Earned GitHub Starstruck achievement — repository crossed 16+ stars, reflecting community recognition of project quality.",
    credentialId: "GH-STARSTRUCK",
    verified: true,
    link: "https://github.com/pindhe",
  },
  {
    title: "GitHub Pull Shark",
    org: "GitHub Achievements",
    year: "2025",
    category: "awards",
    description:
      "Merged pull requests across open-source and personal repositories — active contributor to collaborative code.",
    credentialId: "GH-PULLSHARK",
    verified: true,
    link: "https://github.com/pindhe",
  },
  {
    title: "GitHub Pair Extraordinaire",
    org: "GitHub Achievements",
    year: "2025",
    category: "awards",
    description:
      "Co-authored commits on shared repositories — recognized for effective pair programming and team collaboration.",
    credentialId: "GH-PAIR-EXTRAORDINAIRE",
    verified: true,
    link: "https://github.com/pindhe",
  },
  {
    title: "Automatic English College System",
    org: "Personal Project — 52★ on GitHub",
    year: "2025",
    category: "web",
    description:
      "Built and deployed a full college management system — most-starred educational project on my GitHub profile.",
    credentialId: "PROJ-AEC-52",
    verified: true,
    link: "https://github.com/pindhe/Automatic-English-College",
  },
  {
    title: "Dental Clinic Management System",
    org: "Personal Project — Qaahira Dental",
    year: "2025",
    category: "engineering",
    description:
      "Production dental clinic system using TypeScript frontend and FastAPI Python backend with Tailwind CSS.",
    credentialId: "PROJ-DENTAL-2025",
    verified: true,
    link: "https://github.com/pindhe/Qaahira_Dental_clini",
  },
];

export type CertificateCategory =
  | "all"
  | "engineering"
  | "programming"
  | "web"
  | "uiux"
  | "ai"
  | "leadership"
  | "security"
  | "awards";

export const certificateFilters: { id: CertificateCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "engineering", label: "Engineering" },
  { id: "programming", label: "Programming" },
  { id: "web", label: "Web Dev" },
  { id: "uiux", label: "UI/UX" },
  { id: "ai", label: "AI" },
  { id: "leadership", label: "Leadership" },
  { id: "security", label: "Security" },
  { id: "awards", label: "Awards" },
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
  { id: "ui", label: "UI/UX" },
  { id: "desktop", label: "Desktop" },
  { id: "backend", label: "Backend" },
];
