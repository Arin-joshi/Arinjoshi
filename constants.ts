import { Experience, Project, Education, Certification, SkillGroup, Skill } from './types';

export const PERSONAL_INFO = {
  name: "Arin Joshi",
  role: "Software Development Engineer",
  summary: "Software Development Engineer with 3+ years of production experience building high-scale distributed web applications, sub-100ms real-time systems, and craft-driven interfaces.",
  headline: "Software Development Engineer",
  subheadline: "Full-Stack Systems & Real-Time Specialist",
  tagline: "Architecting high-scale distributed web applications, sub-100ms real-time systems, and craft-driven interfaces.",
  email: "thakararinjoshi@gmail.com",
  phone: "+91 8290279001",
  location: "Ahmedabad, Gujarat, India",
  timezone: "Asia/Kolkata (IST)",
  experienceYears: "3+",
  availability: "Immediately Available for SDE Roles (Immediate Joiner)",
  statusBadge: "Available Immediately • Ex-Aipxperts",
  bio: [
    "Software Development Engineer with 3+ years of production experience building high-concurrency, resilient web platforms using React.js, Next.js, TypeScript, Node.js, and distributed backend services.",
    "Proven track record of scaling enterprise education platforms to 3,500+ schools, engineering real-time WebSocket state engines with sub-100ms latency across 8+ multiplayer games, and building proprietary products (Paassly, Laavo, GyaniAstro).",
    "Strong foundation in Data Structures & Algorithms, System Design, REST/WebSocket protocols, and performance profiling. Ended tenure at Aipxperts in September 2026 and currently actively interviewing for high-impact full-time SDE roles."
  ],
  stats: [
    { label: "Production Experience", value: "3+ Years", detail: "Ex-Aipxperts & NKB PlayTech" },
    { label: "Schools Scaled", value: "3,500+", detail: "via Education Walkthrough SaaS" },
    { label: "Real-time State Latency", value: "<100ms", detail: "8+ Multiplayer Game Engines" },
    { label: "Proprietary Products", value: "3 Shipped", detail: "Paassly, Laavo & GyaniAstro" }
  ],
  socials: {
    github: "https://github.com/ArinJoshi07",
    linkedin: "https://www.linkedin.com/in/arin-joshi-7a1367200/",
    leetcode: "https://leetcode.com/u/arinjoshi/",
    email: "mailto:thakararinjoshi@gmail.com",
    whatsapp: "https://wa.me/918290279001?text=Hi%20Arin,%20I%20reviewed%20your%20portfolio%20and%20products",
    phone: "tel:+918290279001",
    resume: "/ArinJoshi.pdf"
  },
  profileImage: "/profile.png"
};

export const EXPERIENCE: Experience[] = [
  {
    id: "exp-aipxperts",
    role: "Software Engineer",
    company: "Aipxperts",
    period: "Feb 2026 - Sep 2026",
    location: "Ahmedabad, Gujarat",
    type: "Full-time • Product Engineering (Completed)",
    description: [
      "Engineered and scaled core production modules for Education Walkthrough (classroom observation & coaching software utilized by instructional leaders across 3,500+ schools).",
      "Maintained and enhanced mission-critical features for Legiit, a high-volume U.S. freelance service marketplace, migrating legacy monolithic pages into high-performance, modular React.js micro-frontends.",
      "Optimized complex MySQL relational queries yielding a +40% query performance improvement and sub-second page loads on high-traffic reporting dashboards.",
      "Integrated 12+ third-party APIs (payment gateways, authentication providers, and AI endpoints) into resilient, fault-tolerant backend workflows."
    ],
    skills: ["React.js", "Next.js", "TypeScript", "Node.js", "MySQL", "REST APIs", "Micro-frontends", "Performance Profiling"],
    metrics: ["3,500+ Schools", "40% Query Speedup", "12+ Enterprise APIs"]
  },
  {
    id: "exp-nkb",
    role: "Frontend Engineer / Full-Stack",
    company: "NKB PlayTech Pvt. Ltd",
    period: "Sep 2023 - Jan 2026",
    location: "Jaipur, Rajasthan",
    type: "Full-time • High-Concurrency Gaming Platform",
    description: [
      "Built and maintained a production-scale real-time gaming platform with 8+ interactive games handling high-concurrency active sessions using React.js, Node.js, TypeScript, Java, MongoDB, and Supabase.",
      "Engineered real-time WebSocket state synchronization pipelines with sub-100ms response times for dynamic betting systems, multiplayer state broadcast, and instant cashouts.",
      "Optimized frontend rendering bottlenecks using React.memo, useCallback, code-splitting, and memoized virtualized lists to achieve consistent 60fps interaction during peak traffic.",
      "Collaborated in Agile/Scrum sprints via Jira, driving sprint retrospectives, automated testing, and CI/CD deployment automation."
    ],
    skills: ["React.js", "WebSockets", "Socket.io", "TypeScript", "Java", "Node.js", "MongoDB", "Supabase", "State Sync"],
    metrics: ["8+ Live Games", "<100ms Real-time Latency", "60 FPS Renders"]
  },
  {
    id: "exp-celebal",
    role: "React.js Developer Intern",
    company: "Celebal Technologies",
    period: "May 2023 - Jul 2023",
    location: "Jaipur, Rajasthan",
    type: "Internship • Enterprise Web Solutions",
    description: [
      "Engineered 10+ reusable, accessible React.js functional components adhering strictly to clean code, DRY, and SOLID software principles.",
      "Developed responsive, cross-browser fluid layouts using CSS Grid and modern Flexbox architectures with zero visual regressions across mobile and desktop breakpoints.",
      "Participated in senior code reviews, Git branching strategies, and CI/CD automated test validation."
    ],
    skills: ["React.js", "JavaScript (ES6+)", "CSS Grid", "Responsive Design", "Git", "Clean Architecture"],
    metrics: ["10+ Reusable UI Systems", "100% Cross-Browser Parity"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-paassly",
    title: "Paassly",
    tagline: "Hyperlocal Street Commerce & Local Vendor Discovery Platform",
    category: "Enterprise & Platform",
    imageUrl: "/projects/paassly-v2.png",
    logoUrl: "/logos/paassly-logo.png",
    liveUrl: "https://paassly.vercel.app",
    featured: true,
    metrics: [
      { label: "Product Focus", value: "Hyperlocal Commerce" },
      { label: "Routing Latency", value: "<50ms Fast" },
      { label: "App Installs", value: "Zero (PWA)" }
    ],
    problem: "Millions of street vendors, food stalls, chai kiosks, and hyper-local micro-services across India remain invisible on conventional map applications, making them difficult to discover.",
    solution: "Engineered Paassly: a mobile-optimized progressive web app providing live geolocation vendor discovery, dynamic directional routing, and instant vendor exploration without any native app download.",
    architecture: ["Next.js", "React 19", "TypeScript", "Geolocation API", "Tailwind CSS", "Vercel Edge"],
    description: [
      "Built and launched Paassly: an all-in-one hyperlocal discovery engine for street merchants, chai stalls, and local services across India.",
      "Engineered live geolocation tracking with browser GPS integration and automated nearby vendor radius filtering.",
      "Designed an app-like mobile experience with sub-second page transitions, fast search indexing, and instant directions."
    ]
  },
  {
    id: "proj-laavo",
    title: "Laavo",
    tagline: "QR Customer Loyalty & Walk-in Retention Platform",
    category: "Enterprise & Platform",
    imageUrl: "/projects/laavo-v2.png",
    logoUrl: "/logos/laavo-logo.png",
    liveUrl: "https://laavo.vercel.app",
    featured: true,
    metrics: [
      { label: "Onboarding", value: "Instant Scan" },
      { label: "Friction", value: "Zero App Download" },
      { label: "Retention Impact", value: "3x Repeat Visits" }
    ],
    problem: "Local merchants and cafes suffer from high customer acquisition costs and lose 80%+ of walk-ins because traditional loyalty schemes demand intrusive app downloads.",
    solution: "Developed Laavo: a frictionless QR loyalty platform where customers simply scan at the counter to instantly join loyalty programs, track digital stamp cards in their browser, and redeem rewards.",
    architecture: ["Next.js", "TypeScript", "QR Matrix Engine", "Tailwind CSS", "Vercel Serverless"],
    description: [
      "Architected and deployed Laavo: a QR-driven loyalty and customer retention platform purpose-built for offline retail and restaurants.",
      "Eliminated app-install barriers by implementing browser-native digital loyalty wallets and instant scan-to-stamp rewards.",
      "Engineered merchant analytics dashboards tracking repeat customer visit frequencies, reward redemption rates, and revenue impact."
    ]
  },
  {
    id: "proj-gyaniastro",
    title: "GyaniAstro",
    tagline: "Computational Vedic Astrology & Algorithmic Numerology Platform",
    category: "Enterprise & Platform",
    imageUrl: "/projects/gyaniastro-v2.png",
    logoUrl: "/logos/gyaniastro-logo.png",
    liveUrl: "https://gyaniastro.arinstechnology.in",
    featured: true,
    metrics: [
      { label: "Computation", value: "Vedic Ephemeris" },
      { label: "Algorithm", value: "36-Guna Milan" },
      { label: "Languages", value: "EN / HI / Hinglish" }
    ],
    problem: "Most astrological web tools rely on static cached tables, inaccurate mathematical coordinate conversions, or cluttered ad-heavy interfaces with poor performance.",
    solution: "Engineered GyaniAstro under Arin's Technology: a modern algorithmic Vedic calculation engine that computes planetary degrees in real-time, generates printable Janam Kundali charts, and runs 36-guna marriage matching algorithms.",
    architecture: ["React.js", "Node.js", "Mathematical Ephemeris", "REST APIs", "Tailwind CSS"],
    description: [
      "Engineered high-accuracy Vedic astrology suite featuring automated Janam Kundali generation, Hindu Panchang, Shubh Muhurat, and complete Numerology calculations.",
      "Built the 36-guna Kundali Milan algorithmic engine with automated Ashtakoot matching and comprehensive dosha analysis.",
      "Integrated 1-to-1 Jyotishi expert consultation workflows with multilingual support across English, Hindi, and Hinglish."
    ]
  },
  {
    id: "proj-education-walkthrough",
    title: "Education Walkthrough",
    tagline: "Enterprise Classroom Observation & Instructional Coaching Platform",
    category: "Enterprise & Platform",
    imageUrl: "/projects/education-walkthrough.webp",
    liveUrl: "https://educationwalkthrough.com/",
    featured: true,
    metrics: [
      { label: "Schools Using Platform", value: "3,500+" },
      { label: "User Feedback Loop", value: "Real-time" },
      { label: "Dashboard Latency", value: "<1.2s" }
    ],
    problem: "K-12 school districts and instructional coaches relied on disparate paper rubrics and slow review cycles, delaying actionable teacher feedback by weeks.",
    solution: "Architected a unified digital walkthrough system with customizable observation rubrics, instant feedback push notifications, and automated longitudinal performance analytics.",
    architecture: ["React.js", "TypeScript", "Node.js", "MySQL", "REST APIs", "Tailwind CSS"],
    description: [
      "Engineered core modules for Education Walkthrough, empowering instructional leaders in 3,500+ schools with seamless classroom observations.",
      "Built customizable evaluation rubric engines and automated PDF reporting pipelines for district administrative reviews.",
      "Optimized data querying across thousands of school records, reducing heavy metric reporting load times by 40%."
    ]
  },
  {
    id: "proj-legiit",
    title: "Legiit Freelance Marketplace",
    tagline: "U.S. Multi-Sided Freelance Commerce & Service Ecosystem",
    category: "Enterprise & Platform",
    imageUrl: "/projects/legiit.webp",
    liveUrl: "https://legiit.com/sign-in",
    featured: true,
    metrics: [
      { label: "Architecture", value: "Modular React" },
      { label: "Market Focus", value: "U.S. Services" },
      { label: "API Integrations", value: "12+ Providers" }
    ],
    problem: "Legacy monolithic frontend pages caused sluggish interaction times, high bounce rates in seller checkout flows, and cumbersome maintenance.",
    solution: "Led component modularization into high-performance React functional architectures with lazy loading, unified design tokens, and robust error boundaries.",
    architecture: ["React.js", "TypeScript", "Node.js", "MySQL", "Stripe API", "Micro-components"],
    description: [
      "Engineered seller–buyer engagement, checkout, and profile management workflows for a major U.S. freelance marketplace.",
      "Refactored legacy monolith rendering into reusable, typed React components with enhanced responsive mobile UX.",
      "Connected 12+ third-party service endpoints and payment mechanisms into streamlined transaction channels."
    ]
  },
  {
    id: "proj-realtime-games",
    title: "NKB Real-Time Gaming Engine",
    tagline: "Multiplayer WebSocket Gaming Suite: CoinFlip, More or Less, Triple Game",
    category: "Real-Time & Gaming",
    imageUrl: "/projects/coinflip.webp",
    featured: true,
    metrics: [
      { label: "State Sync Latency", value: "<100ms" },
      { label: "Active Game Modes", value: "8+ Engines" },
      { label: "Frame Rate", value: "60 FPS Locked" }
    ],
    problem: "Real-time wagering and multiplier games required guaranteed sub-100ms state synchronization to prevent desynchronization between player clicks and backend results.",
    solution: "Engineered a persistent WebSocket communication layer with client-side optimistic UI updates, automated reconnect queues, and mathematical multiplier state trees.",
    architecture: ["React.js", "TypeScript", "WebSockets", "Socket.io", "Node.js", "MongoDB", "Tailwind CSS"],
    description: [
      "Built CoinFlip: real-time multiplayer coin betting game featuring Multiply Mode & Instant Cashout modes.",
      "Developed More or Less: predictive algorithmic number game with instant probability calculation and dynamic animation feedback.",
      "Engineered Triple Game: fast-paced tile matching game with continuous multiplier score logic and sub-100ms win/loss resolution."
    ]
  },
  {
    id: "proj-jsx-to-tsx",
    title: "JSX to TSX AST Converter",
    tagline: "Developer Productivity Tool for Instant TypeScript Migrations",
    category: "Dev Tools & Products",
    imageUrl: "/projects/jsx-to-tsx.webp",
    liveUrl: "https://arinjsxconverter.netlify.app/",
    metrics: [
      { label: "Transformation", value: "AST Parsing" },
      { label: "Client Latency", value: "Zero-Server" }
    ],
    problem: "Manually adding TypeScript types, interfaces, and prop definitions to large legacy JSX component trees is slow and error-prone.",
    solution: "Built a browser-based syntax tree conversion utility that automatically infers component props and outputs clean, strongly typed TSX.",
    architecture: ["React.js", "TypeScript", "Babel Parser / AST", "Tailwind CSS"],
    description: [
      "High-speed developer utility tool to convert raw JSX code to type-safe TSX format in real-time.",
      "Automatic prop-type deduction and interface generation with copy-to-clipboard functionality.",
      "100% client-side privacy-first execution with zero server transmission."
    ]
  },
  {
    id: "proj-spine-viewer",
    title: "Spine 2D Animation Viewer",
    tagline: "High-Performance WebGL Spine Skeletal Animation Previewer",
    category: "Dev Tools & Products",
    imageUrl: "/projects/spine-viewer.webp",
    liveUrl: "https://spine-viewer-arin.netlify.app/",
    metrics: [
      { label: "Renderer", value: "WebGL / Canvas" },
      { label: "Format Support", value: "JSON & Atlas" }
    ],
    problem: "Game artists and developers lack quick browser tools to test Spine skeletal exports without opening heavy game engine software.",
    solution: "Developed an in-browser WebGL runtime viewer that parses Spine JSON skeleton files, atlas textures, and exposes full playback speed controls.",
    architecture: ["React.js", "Spine WebGL Runtime", "HTML5 Canvas", "Tailwind CSS"],
    description: [
      "Web-based 2D Spine skeletal animation inspection and preview tool.",
      "Drag-and-drop file upload for Spine JSON and atlas asset packs with instant runtime compilation.",
      "Custom timeline playback, skin swap controls, and smooth 60fps WebGL animation canvas."
    ]
  },
  {
    id: "proj-resume-maker",
    title: "ATS Resume Architect Pro",
    tagline: "Real-Time ATS-Optimized Technical Resume Generator",
    category: "Dev Tools & Products",
    imageUrl: "/projects/resume-maker.webp",
    liveUrl: "https://arinresumemaker.netlify.app/",
    metrics: [
      { label: "Export Format", value: "Clean PDF" },
      { label: "ATS Pass Rate", value: "98%+" }
    ],
    problem: "Engineering resumes frequently get rejected by ATS parsers due to non-standard columns, floating text boxes, and unreadable formats.",
    solution: "Engineered an interactive builder enforcing single-column ATS typography, structured technical bullet points, and live PDF rendering.",
    architecture: ["React.js", "TypeScript", "Tailwind CSS", "PDF Generation Engine"],
    description: [
      "Interactive resume builder featuring recruiter-approved, ATS-compliant single and dual-column layouts.",
      "Dynamic form validation with instantaneous live visual preview updates.",
      "Clean, unbloated PDF export formatted for high ATS parsing accuracy."
    ]
  },
  {
    id: "proj-company-website",
    title: "Kotibox Global Tech Corporate Portal",
    tagline: "High-Performance Corporate Web Platform with Dynamic CMS",
    category: "Web & Apps",
    imageUrl: "/projects/company-website.webp",
    liveUrl: "https://kotiboxglobaltech.com/",
    metrics: [
      { label: "Stack", value: "MERN Stack" },
      { label: "SEO Score", value: "100 / 100" }
    ],
    problem: "Corporate agency required a high-converting digital presence capable of showcasing service portfolios and handling inbound lead capture.",
    solution: "Built a modern MERN stack portal with dynamic routing, structured JSON-LD SEO, and cloud deployment on high-availability infrastructure.",
    architecture: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    description: [
      "Fully responsive corporate enterprise website engineered on modern JavaScript architecture.",
      "SEO-optimized structure with dynamic routing and high-performance server communication.",
      "Deployed on resilient cloud infrastructure delivering 99.9% uptime and fast global asset delivery."
    ]
  },
  {
    id: "proj-qr-matrix",
    title: "QR Matrix Generator",
    tagline: "Client-Side Custom QR Code Engine with Instant Vector Export",
    category: "Dev Tools & Products",
    imageUrl: "/projects/qr-generator.webp",
    liveUrl: "https://arin-qr.netlify.app/",
    metrics: [
      { label: "Render Time", value: "<15ms" },
      { label: "Format", value: "SVG & PNG" }
    ],
    problem: "Most online QR generators require signups, show intrusive advertisements, or throttle image resolutions.",
    solution: "Built a lightweight, zero-ad browser utility that generates high-density QR matrices with custom color controls and vector download.",
    architecture: ["React.js", "TypeScript", "Canvas QR Engine", "Tailwind CSS"],
    description: [
      "Lightweight, real-time QR generation tool supporting URLs, plain text, and custom vCard payloads.",
      "High-resolution downloadable PNG and SVG vector outputs with instant client-side generation."
    ]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend & Architecture",
    description: "Building resilient, pixel-precise, accessible user interfaces with optimal bundle footprints.",
    skills: [
      { name: "React.js (18 / 19)", level: "Production Specialist", context: "3+ Years in Production" },
      { name: "Next.js (App Router)", level: "Advanced", context: "SSR, SSG, Server Actions" },
      { name: "TypeScript", level: "Production Specialist", context: "Strict Typing, Generics, AST" },
      { name: "JavaScript (ES6+)", level: "Mastered", context: "Async, Event Loop, Closures" },
      { name: "Tailwind CSS (v3 / v4)", level: "Mastered", context: "Custom Themes, Fluid Layouts" },
      { name: "Framer Motion", level: "Advanced", context: "Spring Physics, Gesture UI" },
      { name: "HTML5 / Semantic Web", level: "Mastered", context: "WCAG 2.1 AA Accessibility" }
    ]
  },
  {
    category: "Backend & Real-Time Protocols",
    description: "Designing low-latency APIs, event-driven architectures, and high-concurrency socket pipelines.",
    skills: [
      { name: "Node.js & Express", level: "Production Specialist", context: "RESTful Services, Event Loop, Microservices" },
      { name: "WebSockets & Socket.io", level: "Production Specialist", context: "Sub-100ms Multiplayer State Sync" },
      { name: "Webhooks & Event Streams", level: "Advanced", context: "Event-Driven Ingestion, Signature Verification" },
      { name: "Python", level: "Advanced", context: "FastAPI, Flask, Async Data Processing" },
      { name: "Java", level: "Proficient", context: "Core Java, OOP, Multi-threading, Algorithms" },
      { name: "PHP & Laravel", level: "Proficient", context: "MVC Architecture, Eloquent ORM, REST APIs" }
    ]
  },
  {
    category: "AI Engineering, LLMs & Tooling",
    description: "Leveraging agentic AI workflows, optimized token budgeting, and disciplined production engineering.",
    skills: [
      { name: "Claude (Anthropic)", level: "Production Specialist", context: "Prompt Architecture, Sub-Token Budgeting & Context Windows" },
      { name: "Cursor IDE", level: "Production Specialist", context: "Agentic Multi-File Workflows & System Rules (.cursorrules)" },
      { name: "Google Antigravity", level: "Specialist", context: "Autonomous Agent Orchestration, MCP Tools & Custom Skills" },
      { name: "Google AI Studio & Gemini API", level: "Advanced", context: "Structured JSON Schema, Multimodal & High-Context Pipelines" },
      { name: "GitHub Copilot", level: "Advanced", context: "Context-Aware Autocompletion & Production Velocity" },
      { name: "LLMs & Model Fine-Tuning", level: "Advanced", context: "Zero/Few-Shot Tuning, Token Efficiency & Production Verification" }
    ]
  },
  {
    category: "Databases & Cloud Infrastructure",
    description: "Designing normalized relational schemas, realtime document stores, and cloud infrastructure.",
    skills: [
      { name: "PostgreSQL", level: "Advanced", context: "ACID Transactions, Relational Modeling & Indexing" },
      { name: "Supabase", level: "Production Specialist", context: "Realtime Subscriptions, Postgres Auth & Row-Level Security" },
      { name: "MongoDB", level: "Advanced", context: "Aggregation Pipelines & Gaming Session Logs" },
      { name: "MySQL / Relational DBMS", level: "Production Specialist", context: "+40% Query Optimization at Aipxperts" },
      { name: "AWS (Amazon Web Services)", level: "Competent", context: "EC2, S3, Lambda, CloudFront & Resilient Deployments" }
    ]
  },
  {
    category: "System Design & Engineering Rigor",
    description: "Foundational algorithmic rigor, system design, and disciplined engineering practices.",
    skills: [
      { name: "Data Structures & Algorithms", level: "Strong", context: "Space/Time Complexity, Algorithmic Optimization" },
      { name: "Distributed System Design", level: "Advanced", context: "Low-Latency, High-Concurrency Client-Server Arch" },
      { name: "RESTful API Architecture", level: "Mastered", context: "Contract-First OpenAPI, Idempotency & Security" },
      { name: "Git & GitHub Workflow", level: "Mastered", context: "Trunk-Based Development, PR Reviews, Git Flow" },
      { name: "CI/CD & Cloud Pipelines", level: "Advanced", context: "Vercel, Netlify & Automated Test Deployments" },
      { name: "Agile / Scrum (Jira)", level: "Experienced", context: "Sprint Planning, Velocity Tracking, Backlog Grooming" }
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu-btech",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Global Institute of Technology, Jaipur",
    period: "2020 - 2024",
    score: "7.53 CGPA",
    highlights: [
      "Focused on Data Structures, Algorithms, Distributed Database Systems, and Object-Oriented Software Engineering.",
      "Led technical project teams in developing scalable full-stack web platforms."
    ]
  },
  {
    id: "edu-12",
    degree: "Higher Secondary Certificate (Class XII - Science/Maths)",
    institution: "Vidhya Valley Senior Secondary School, Jodhpur",
    period: "2019 - 2020",
    score: "67.17%"
  },
  {
    id: "edu-10",
    degree: "Secondary School Certificate (Class X)",
    institution: "KPS School, Raniwara",
    period: "2017 - 2018",
    score: "68.40%"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { id: "cert-react", name: "React.js Production Specialist", issuer: "Celebal Technologies", year: "2023" },
  { id: "cert-salesforce", name: "Salesforce Administrator", issuer: "Global Institute of Technology", year: "2023" },
  { id: "cert-db", name: "Introduction to Relational Databases", issuer: "LinkedIn Learning", year: "2023" },
  { id: "cert-java", name: "Java Programming (Basic)", issuer: "HackerRank", year: "2023" },
  { id: "cert-cpp", name: "Introduction to C++ & Algorithms", issuer: "Coding Ninjas", year: "2022" },
  { id: "cert-tishitu", name: "Advanced Computational and Technical Skills", issuer: "Tishitu Research Center", year: "2022" }
];

export const SKILLS: Skill[] = [
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Core" },
  { name: "JavaScript", category: "Core" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "Java", category: "Core" },
  { name: "PHP & Laravel", category: "Backend" },
  { name: "WebSockets & Socket.io", category: "Backend" },
  { name: "Webhooks", category: "Backend" },
  { name: "Claude (Anthropic)", category: "AI & Tools" },
  { name: "Cursor IDE", category: "AI & Tools" },
  { name: "Google Antigravity", category: "AI & Tools" },
  { name: "Google AI Studio", category: "AI & Tools" },
  { name: "GitHub Copilot", category: "AI & Tools" },
  { name: "LLMs & Model Tuning", category: "AI & Tools" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Supabase", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "AWS Cloud", category: "Cloud" },
  { name: "Data Structures & Algorithms", category: "Core" },
  { name: "System Design", category: "Architecture" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" }
];
