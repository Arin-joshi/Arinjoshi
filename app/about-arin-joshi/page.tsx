import type { Metadata } from "next";
import Link from "next/link";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PERSONAL_INFO,
  PROJECTS,
  SKILL_GROUPS,
} from "@/constants";
import { ArrowRight, Code2, ExternalLink, Github, Linkedin, Mail, MapPin } from "lucide-react";

const PAGE_URL = "https://arinjoshi.vercel.app/about-arin-joshi";

export const metadata: Metadata = {
  title:
    "Who is Arin Joshi? — Software Engineer, Forward Deployed Engineer & Full-Stack Architect",
  description:
    "Complete engineering profile of Arin Joshi (Arin Kumar Joshi): Software Development Engineer & Forward Deployed Engineer with 3+ years of production experience across React 19, Next.js, TypeScript, Node.js, WebSockets (<100ms), AI/LLM workflows, and enterprise SaaS scaling to 3,500+ schools. Creator of Paassly, Laavo, and GyaniAstro.",
  keywords: [
    "Arin Joshi",
    "Arin Kumar Joshi",
    "Who is Arin Joshi",
    "Arin Joshi portfolio",
    "Arin Joshi Software Engineer",
    "Arin Joshi Forward Deployed Engineer",
    "Arin Joshi Software Development Engineer",
    "Arin Joshi Ahmedabad",
    "Arin Joshi Aipxperts",
    "Arin Joshi NKB PlayTech",
    "Arin Joshi Paassly",
    "Arin Joshi Laavo",
    "Arin Joshi GyaniAstro",
    "Arin Joshi LeetCode",
    "Arin Joshi GitHub",
    "Forward Deployed Engineer",
    "Forward Deployed Software Engineer",
    "Forward Deployed Engineer India",
    "Software Development Engineer India",
    "Full Stack Engineer React Next.js TypeScript",
    "Frontend Systems Architect",
    "Real-Time WebSocket Engineer",
    "AI Software Engineer LLMs Claude Cursor",
    "Distributed Systems Engineer",
    "Next.js 16 React 19 Developer",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Who is Arin Joshi? — Software Engineer & Forward Deployed Engineer",
    description:
      "Arin Joshi is a Software Development Engineer and Forward Deployed Engineer with 3+ years scaling enterprise platforms (3,500+ schools), <100ms WebSocket systems, and consumer products Paassly, Laavo & GyaniAstro.",
    url: PAGE_URL,
    type: "profile",
    siteName: "Arin Joshi Portfolio",
  },
};

const FAQS = [
  {
    q: "Who is Arin Joshi?",
    a: "Arin Joshi (also known as Arin Kumar Joshi) is a Software Development Engineer and Forward Deployed Engineer based in Ahmedabad, India, with 3+ years of production experience. He specializes in high-scale React/Next.js frontends, TypeScript architectures, Node.js distributed backends, sub-100ms WebSocket real-time systems, and applied AI/LLM engineering.",
  },
  {
    q: "What experience does Arin Joshi have as a Software Engineer & Forward Deployed Engineer?",
    a: "Arin served as a Software Engineer at Aipxperts (Feb 2026 – Sep 2026), scaling Education Walkthrough across 3,500+ K-12 schools, modularizing the Legiit freelance marketplace, and optimizing MySQL query latency by 40%. Previously at NKB PlayTech (Nov 2023 – Jan 2026), he built 8+ real-time multiplayer WebSocket gaming engines running at <100ms sync latency. He also completed a React.js Production Specialist internship at Celebal Technologies.",
  },
  {
    q: "What products and platforms has Arin Joshi built?",
    a: "Arin is the creator and lead engineer of Paassly (hyperlocal street vendor discovery PWA), Laavo (QR-driven walk-in loyalty platform), and GyaniAstro (computational Vedic astrology & 36-guna Kundali matching platform), alongside developer tools including a JSX to TSX AST Converter, Spine 2D WebGL Animation Viewer, ATS Resume Architect Pro, and QR Matrix Generator.",
  },
  {
    q: "What is Arin Joshi's core technical stack?",
    a: "His production stack spans React 18/19, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, Node.js, Express, WebSockets/Socket.io, Python, Java, PHP/Laravel, PostgreSQL, Supabase, MySQL, MongoDB, AWS, and agentic AI workflows with Claude, Cursor IDE, Google Antigravity, and Gemini API.",
  },
  {
    q: "Is Arin Joshi available for Software Engineer or Forward Deployed Engineer roles?",
    a: "Yes. Arin Joshi is immediately available (Immediate Joiner) for full-time Software Development Engineer (SDE), Forward Deployed Engineer (FDE), Full-Stack Engineer, and Product Engineering roles across India, remote global teams, and relocation opportunities.",
  },
];

const TRENDING_TOPICS = [
  "Arin Joshi",
  "Arin Kumar Joshi",
  "Software Engineer",
  "Software Development Engineer (SDE)",
  "Forward Deployed Engineer (FDE)",
  "Forward Deployed Software Engineer",
  "Full-Stack Systems Engineer",
  "Frontend Architect",
  "Product Engineer",
  "AI & LLM Application Engineer",
  "React 19 & Next.js Expert",
  "TypeScript & AST Tooling",
  "Real-Time WebSocket Systems (<100ms)",
  "Enterprise SaaS (3,500+ Schools)",
  "Distributed Backend Architecture",
  "PostgreSQL · Supabase · MySQL · MongoDB",
  "Paassly Founder",
  "Laavo Founder",
  "GyaniAstro Architect",
  "Ahmedabad · Remote Global",
];

const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": PAGE_URL,
      url: PAGE_URL,
      name: "Who is Arin Joshi? — Software Engineer & Forward Deployed Engineer",
      isPartOf: {
        "@type": "WebSite",
        name: "Arin Joshi Portfolio",
        url: "https://arinjoshi.vercel.app/",
      },
      mainEntity: {
        "@id": "https://arinjoshi.vercel.app/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://arinjoshi.vercel.app/#person",
      name: "Arin Joshi",
      alternateName: ["Arin Kumar Joshi", "ArinJoshi07"],
      url: "https://arinjoshi.vercel.app/",
      image: "https://arinjoshi.vercel.app/profile.png",
      email: PERSONAL_INFO.email,
      telephone: PERSONAL_INFO.phone,
      jobTitle: [
        "Software Development Engineer",
        "Software Engineer",
        "Forward Deployed Engineer",
        "Full-Stack Engineer",
      ],
      description: PERSONAL_INFO.summary,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      sameAs: [
        PERSONAL_INFO.socials.github,
        PERSONAL_INFO.socials.linkedin,
        PERSONAL_INFO.socials.leetcode,
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Global Institute of Technology, Jaipur",
      },
      knowsAbout: [
        "Software Engineering",
        "Forward Deployed Engineering",
        "Distributed Systems",
        "React.js",
        "Next.js",
        "TypeScript",
        "Node.js",
        "WebSockets",
        "Real-Time Systems",
        "AI Engineering",
        "Large Language Models",
        "PostgreSQL",
        "Supabase",
        "MySQL",
        "MongoDB",
        "AWS",
        "System Design",
        "Data Structures and Algorithms",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export default function AboutArinJoshiPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 py-10 sm:py-16 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      <article className="max-w-4xl mx-auto space-y-10">
        {/* Top Portfolio Navigation Banner */}
        <div className="rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 p-5 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-mono-code font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Engineering Biography &amp; Full Index
            </p>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
              Arin Joshi — Software Engineer &amp; Forward Deployed Engineer
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>{PERSONAL_INFO.location} · Open to Global Remote &amp; Relocation</span>
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs sm:text-sm font-semibold transition-colors shrink-0"
          >
            <span>Open Full Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Who is Arin Joshi */}
        <section className="rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 p-5 sm:p-7 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
            Who is Arin Joshi?
          </h2>
          <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <p>
              <strong>Arin Joshi</strong> (Arin Kumar Joshi) is a{" "}
              <strong>Software Development Engineer (SDE)</strong>,{" "}
              <strong>Software Engineer</strong>, and{" "}
              <strong>Forward Deployed Engineer (FDE)</strong> with{" "}
              <strong>3+ years of production engineering experience</strong> building resilient,
              customer-facing web platforms, real-time multiplayer engines, and end-to-end SaaS
              products.
            </p>
            {PERSONAL_INFO.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Direct Links */}
          <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-medium">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50"
            >
              <span>Interactive Portfolio</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PERSONAL_INFO.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>LeetCode</span>
            </a>
            <a
              href={PERSONAL_INFO.socials.email}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
          </div>
        </section>

        {/* Production Experience */}
        <section className="rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 p-5 sm:p-7 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
            Software Engineering &amp; Forward Deployed Experience
          </h2>
          <div className="space-y-6">
            {EXPERIENCE.map((exp) => (
              <div
                key={exp.id}
                className="pb-5 last:pb-0 border-b last:border-b-0 border-zinc-100 dark:border-zinc-800/80 space-y-2"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                    {exp.role} — {exp.company}
                  </h3>
                  <span className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
                    {exp.period} · {exp.location}
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {exp.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Shipped Products & Projects */}
        <section className="rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 p-5 sm:p-7 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
            Products, Platforms &amp; Case Studies ({PROJECTS.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/70 dark:border-zinc-800 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                    {proj.title}
                  </h3>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
                    >
                      Live ↗
                    </a>
                  )}
                </div>
                {proj.tagline && (
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {proj.tagline}
                  </p>
                )}
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {proj.solution || proj.description[0]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & AI Engineering */}
        <section className="rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 p-5 sm:p-7 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
            Technical Stack &amp; Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILL_GROUPS.map((group) => (
              <div key={group.category} className="space-y-1.5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {group.category}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {group.skills.map((s) => s.name).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 p-5 sm:p-7 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
            Education &amp; Certifications
          </h2>
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            {EDUCATION.map((edu) => (
              <p key={edu.id}>
                <strong className="text-zinc-950 dark:text-white">{edu.degree}</strong> —{" "}
                {edu.institution} ({edu.period}, {edu.score})
              </p>
            ))}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
            Certifications: {CERTIFICATIONS.map((c) => `${c.name} (${c.issuer})`).join(" · ")}
          </p>
        </section>

        {/* Frequently Asked Questions (FAQ Schema Match) */}
        <section className="rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 p-5 sm:p-7 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((item) => (
              <div key={item.q} className="space-y-1">
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">{item.q}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Specialties & Role Focus Tags */}
        <section className="rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800 p-5 sm:p-7 space-y-3">
          <h2 className="text-sm font-bold text-zinc-950 dark:text-white">
            Core Roles &amp; Engineering Focus
          </h2>
          <div className="flex flex-wrap gap-2">
            {TRENDING_TOPICS.map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-xs font-mono-code text-zinc-700 dark:text-zinc-300"
              >
                {topic}
              </span>
            ))}
          </div>
          <div className="pt-3 flex items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Main interactive portfolio &amp; live case studies:
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>arinjoshi.vercel.app</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

