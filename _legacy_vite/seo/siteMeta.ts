export const SITE_URL = 'https://arinjoshi.vercel.app';

export const SITE_META = {
  title: 'Arin Joshi | Software Engineer & React Developer',
  description:
    'Arin Kumar Joshi is a Software Engineer with 3+ years of experience building high-performance web applications using React, TypeScript, and the MERN stack.',
  keywords:
    'Arin Joshi, Arin Kumar Joshi, Software Engineer, React Developer, MERN Stack Developer, TypeScript, Frontend Developer, Web Developer Ahmedabad, JavaScript Developer, Node.js, MongoDB, Portfolio',
  author: 'Arin Kumar Joshi',
  locale: 'en_US',
  language: 'English',
  ogImage: `${SITE_URL}/ArinJoshiBackgroundImg.webp`,
  ogImageAlt: 'Arin Joshi - Software Engineer and React Developer portfolio hero',
  profileImage: `${SITE_URL}/profile.webp`,
  twitterSite: '@ArinJoshi',
  twitterCreator: '@ArinJoshi',
  geo: {
    region: 'IN-GJ',
    placename: 'Ahmedabad, Gujarat, India',
    position: '23.0225;72.5714',
  },
  sameAs: [
    'https://www.linkedin.com/in/arinjoshi/',
    'https://github.com/Arin-joshi',
    'https://www.youtube.com/@ArinJoshi',
    'https://www.instagram.com/click_by_arin/',
  ],
  sections: [
    { id: 'about', name: 'About' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
    { id: 'skills', name: 'Skills' },
    { id: 'education', name: 'Education' },
    { id: 'contact', name: 'Contact' },
  ],
} as const;
