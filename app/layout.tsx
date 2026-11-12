import type { Metadata, Viewport } from "next";
import "@fontsource/plus-jakarta-sans/latin-400.css";
import "@fontsource/plus-jakarta-sans/latin-500.css";
import "@fontsource/plus-jakarta-sans/latin-600.css";
import "@fontsource/plus-jakarta-sans/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://arinjoshi.dev"),
  title: "Arin Joshi — Software Engineer",
  description:
    "Software Development Engineer with 3+ years of production experience building high-scale web platforms (Education Walkthrough: 3,500+ schools, Legiit freelance marketplace, real-time gaming engines with <100ms latency).",
  keywords: [
    "Arin Joshi",
    "Software Development Engineer",
    "Frontend Engineer",
    "Full-Stack Developer",
    "React.js",
    "Next.js",
    "TypeScript",
    "System Design",
    "WebSockets",
    "Ahmedabad",
    "Portfolio"
  ],
  authors: [{ name: "Arin Joshi", url: "https://github.com/ArinJoshi07" }],
  creator: "Arin Joshi",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Arin Joshi — Software Development Engineer",
    description: "Architecting high-scale distributed web applications, sub-100ms real-time systems, and craft-driven interfaces.",
    url: "https://arinjoshi.dev",
    siteName: "Arin Joshi Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1024,
        height: 1024,
        alt: "Arin Joshi - Software Development Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arin Joshi",
  jobTitle: "Software Development Engineer",
  url: "https://arinjoshi.dev",
  sameAs: [
    "https://github.com/ArinJoshi07",
    "https://www.linkedin.com/in/arin-joshi-7a1367200/"
  ],
  worksFor: {
    "@type": "Organization",
    name: "Aipxperts"
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "India"
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Global Institute of Technology, Jaipur"
  },
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "WebSockets",
    "System Design",
    "MySQL",
    "Distributed Systems"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}

              // Permanently purge any lingering Service Workers or CacheStorage
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  for (let r of regs) r.unregister();
                });
              }
              if (typeof window !== 'undefined' && 'caches' in window) {
                caches.keys().then(function(names) {
                  for (let n of names) caches.delete(n);
                });
              }
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 antialiased"
      >
        {children}
      </body>
    </html>
  );
}
