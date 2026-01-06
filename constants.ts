import { Experience, Project, Education, Certification, Skill } from './types';

export const PERSONAL_INFO = {
  name: "Arin Joshi",
  role: "React.js & MERN Developer",
  email: "thakararinjoshi@gmail.com",
  phone: "+91 8290279001",
  location: "Ahmedabad, Gujarat",
  summary: "To secure a challenging position in a reputable organization to expand my learnings, knowledge, and skills. Secure a responsible career opportunity to fully utilize my training and skills, while making a significant contribution to the success of the company."
};

export const EXPERIENCE: Experience[] = [
  {
    id: "exp-3",
    role: "Jr. React Developer",
    company: "NKB PlayTech Pvt. Ltd.",
    period: "March 2025 - Present",
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
    period: "Sept. 2024 - Feb. 2025",
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
      "Real-time multiplayer game using React.js, WebSockets, and APIs.",
      "Two play modes: Multiply & Instant.",
      "Betting system with cashout and win/loss tracking."
    ]
  },
  {
    id: "proj-2",
    title: "More or Less Game",
    category: "Game",
    imageUrl: "/MORE-OR-LESS.png",
    description: [
      "Number prediction game with difficulty levels.",
      "Interactive UI with instant updates.",
      "Animations and sound effects for engagement."
    ]
  },
  {
    id: "proj-3",
    title: "Triple Game",
    category: "Game",
    imageUrl: "/1755781092430_Triple 1.webp",
    description: [
      "Tile-matching game with real-time updates.",
      "Multiplier and scoring logic.",
      "Smooth transitions and optimized performance."
    ]
  },
  {
    id: "proj-4",
    title: "Company Website",
    category: "Web",
    imageUrl: "https://picsum.photos/id/3/800/600",
    description: [
      "Fully responsive MERN stack website.",
      "Frontend routing and API integration.",
      "Cloud deployment with high uptime."
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