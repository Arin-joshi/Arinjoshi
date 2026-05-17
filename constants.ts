import { Experience, Project, Education, Certification, Skill } from './types';

export const PERSONAL_INFO = {
  name: "Arin Joshi",
  role: "Software Engineer",
  email: "thakararinjoshi@gmail.com",
  phone: "+91 8290279001",
  location: "Ahmedabad, Gujarat",
  summary: "Software Engineer with 3+ years of experience building scalable web applications using React.js, TypeScript, JavaScript, and the MERN stack. Skilled in real-time systems, high-performance frontend architecture, REST APIs, and accessible UI development. Strong in DSA, System Design, and modern Agile workflows, with a focus on delivering fast, production-grade applications for startups and MNCs."
};

export const EXPERIENCE: Experience[] = [
  {
    id: "exp-3",
    role: "Jr. React Developer",
    company: "NKB PlayTech Pvt. Ltd.",
    period: "May 2025 - March 2026",
    description: [
      "Developing real-time game applications using WebSockets and REST APIs.",
      "Handling complex game logic including multiplayer state syncing and instant updates.",
      "Building dynamic UI components that react instantly to live server data.",
      "Implementing game animations, sound effects, and interactive gameplay elements.",
      "Collaborating with backend developers to ensure smooth API and socket integration.",
      "Debugging and optimizing performance for high concurrency environments."
    ]
  },
  {
    id: "exp-2",
    role: "Mern Developer",
    company: "Kotibox Global Technologies",
    period: "Sept. 2023 - Feb. 2025",
    description: [
      "Designed and deployed the company's first complete website using the MERN stack (React.js, html/css).",
      "Implemented frontend routing with React Router for seamless navigation.",
      "Built responsive, cross-browser-compatible layouts using Tailwind CSS.",
      "Integrated REST APIs for dynamic data fetching and CRUD operations.",
      "Managed deployment and hosting using cloud services (Vercel/Netlify & Render).",
      "Improved website performance through code splitting and optimization."
    ]
  },
  {
    id: "exp-1",
    role: "React.js Developer Internship",
    company: "Celebal Technologies",
    period: "May 2023 - July 2023",
    description: [
      "Learned the fundamentals of React.js including hooks (useState, useEffect), props, and state management.",
      "Gained experience in component-based architecture and clean project structure.",
      "Built small-scale UI components and integrated them into larger applications.",
      "Practiced responsive design principles using CSS and media queries.",
      "Collaborated with the team to debug issues and improve code quality."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "CoinFlip Game",
    category: "Game",
    imageUrl: "/Coinflip.webp",
    description: [
      "Real-time multiplayer coin betting game built with React.js and WebSockets.",
      "Two play modes: Multiply Mode & Instant Mode.",
      "Dynamic betting system with cashout feature and real-time win/loss tracking."
    ]
  },
  {
    id: "proj-2",
    title: "More or Less Game",
    category: "Game",
    imageUrl: "/MORE-OR-LESS.png",
    description: [
      "Interactive number prediction game with multiple difficulty levels.",
      "Real-time result calculation with instant UI updates.",
      "Engaging animations and sound effects for enhanced user experience."
    ]
  },
  {
    id: "proj-3",
    title: "Triple Game",
    category: "Game",
    imageUrl: "/1755781092430_Triple 1.webp",
    description: [
      "Fast-paced tile matching game with real-time scoring logic.",
      "Multiplier-based reward system for higher engagement.",
      "Optimized performance with smooth animations and transitions."
    ]
  },
  {
    id: "proj-4",
    title: "Company Website",
    category: "Web",
    imageUrl: "https://picsum.photos/id/3/800/600",
    liveUrl: "https://kotiboxglobaltech.com/",
    description: [
      "Fully responsive corporate website built using the MERN stack.",
      "SEO-friendly architecture with dynamic routing and API integration.",
      "Deployed on cloud infrastructure ensuring high performance and uptime."
    ]
  },
  {
    id: "proj-5",
    title: "QR Generator App",
    category: "Web",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRga_81_yes26w0xhPbMdioLGZBOe7indIx8g&s",
    liveUrl: "https://arin-qr.netlify.app/",
    description: [
      "Web-based QR code generator built with React.js.",
      "Generate QR codes instantly for URLs, text, and custom inputs.",
      "Downloadable QR images with responsive and clean UI design."
    ]
  },
  {
    id: "proj-6",
    title: "Astrology App",
    category: "Web",
    imageUrl: "https://i.ibb.co/M5pr8RVT/Screenshot-2026-02-22-182356.png",
    liveUrl: "https://nkjoshi.netlify.app/",
    description: [
      "Modern astrology web application with dynamic horoscope features.",
      "User-friendly interface with categorized zodiac insights.",
      "API-based data rendering with responsive and optimized design."
    ]
  },
  {
    id: "proj-7",
    title: "Resume Maker",
    category: "Web",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStBLRtAcfURzwJzkeWUt-oPHhKJ29h-Dc88w&s",
    liveUrl: "https://arinresumemaker.netlify.app/",
    description: [
      "Interactive resume builder with customizable templates.",
      "Real-time preview and dynamic form-based input system.",
      "Download resumes in structured and professional formats."
    ]
  },
  {
    id: "proj-8",
    title: "JSX & TSX Converter",
    category: "Web",
    imageUrl: "https://miro.medium.com/1*A-rgbVaUSwF8xrwJfUSBEQ.png",
    liveUrl: "https://arinjsxconverter.netlify.app/",
    description: [
      "Developer utility tool to convert JSX code to TSX format.",
      "Automatic type-safe transformation for React components.",
      "Clean UI with instant code conversion and copy functionality."
    ]
  },
  {
    id: "proj-9",
    title: "Spine Animation Viewer",
    category: "Web",
    imageUrl: "https://esotericsoftware.com/img/skeleton-viewer.jpg",
    liveUrl: "https://spine-viewer-arin.netlify.app/",
    description: [
      "Web-based Spine animation preview tool.",
      "Upload and render Spine JSON and atlas files in real-time.",
      "Smooth animation playback controls with optimized rendering."
    ]
  },
  {
    id: "proj-10",
    title: "Legiit Course Service Provider App",
    category: "App",
    imageUrl: "/legiit-course.webp",
    liveUrl: "https://legiit.com/sign-in",
    description: [
      "Authentication and account flows for the Legiit marketplace platform.",
      "Course and service discovery with a focus on seller–buyer engagement.",
      "Responsive UI patterns for dashboards, listings, and secure sign-in experiences."
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: "React.js", category: "Frontend" },
  { name: "JavaScript", category: "Core" },
  { name: "TypeScript", category: "Core" },
  { name: "Socket.io", category: "Backend" },
  { name: "HTML/CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "DBMS (SQL)", category: "Database" },
  { name: "Data Structure & Algo", category: "Core" },
  { name: "JAVA", category: "Core" },
  { name: "CI/CD Pipeline", category: "Core" }
];

export const EDUCATION: Education[] = [
  {
    id: "edu-1",
    degree: "B.Tech. (Computer Science)",
    institution: "Global Institute of Technology, Jaipur",
    period: "June 2020 - June 2024",
    score: "7.53 CGPA"
  },
  {
    id: "edu-2",
    degree: "Class 12",
    institution: "Vidhya Valley Sr. Sec. School, Jodhpur",
    period: "June 2019 - June 2020",
    score: "67.17 %"
  },
   {
    id: "edu-3",
    degree: "Class 10",
    institution: "KPS School Raniwara",
    period: "June 2017 - June 2028",
    score: "68.40 %"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { id: "cert-1", name: "Salesforce Admin", issuer: "Global Institute of Technology, Jaipur" },
  { id: "cert-2", name: "React.js", issuer: "Celebal Technologies" },
  { id: "cert-3", name: "Into to Database", issuer: "Linkedin Learning" },
  { id: "cert-4", name: "Java (Basic)", issuer: "Hacker Rank" },
  { id: "cert-5", name: "Introduction to C++", issuer: "Coding Ninjas" },
  { id: "cert-6", name: "Advance Computational and Technical Skills", issuer: "Tishitu Research Center" },
];