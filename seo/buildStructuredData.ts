import {
  PERSONAL_INFO,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  EDUCATION,
  CERTIFICATIONS,
} from '../constants';
import { SITE_META, SITE_URL } from './siteMeta';

const LAST_MODIFIED = '2026-09-09';

export function buildStructuredData() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${SITE_URL}/#webpage`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': webpageId,
        url: `${SITE_URL}/`,
        name: 'Arin Joshi - Software Engineer Portfolio',
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: SITE_META.ogImage,
        },
        inLanguage: 'en-US',
        datePublished: '2023-05-28',
        dateModified: LAST_MODIFIED,
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: SITE_URL,
        name: 'Arin Joshi - Software Engineer Portfolio',
        description: SITE_META.description,
        inLanguage: 'en-US',
        publisher: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Arin Kumar Joshi',
        alternateName: PERSONAL_INFO.name,
        givenName: 'Arin',
        familyName: 'Joshi',
        jobTitle: PERSONAL_INFO.role,
        url: `${SITE_URL}/`,
        image: {
          '@type': 'ImageObject',
          url: SITE_META.profileImage,
          width: 800,
          height: 800,
        },
        email: PERSONAL_INFO.email,
        telephone: PERSONAL_INFO.phone,
        description: PERSONAL_INFO.summary,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
        alumniOf: EDUCATION.slice(0, 1).map((edu) => ({
          '@type': 'EducationalOrganization',
          name: edu.institution,
        })),
        worksFor: EXPERIENCE.slice(0, 1).map((exp) => ({
          '@type': 'Organization',
          name: exp.company,
        })),
        hasCredential: CERTIFICATIONS.map((cert) => ({
          '@type': 'EducationalOccupationalCredential',
          name: cert.name,
          credentialCategory: cert.issuer,
        })),
        sameAs: SITE_META.sameAs,
        knowsLanguage: ['English', 'Hindi', 'Gujarati'],
        knowsAbout: SKILLS.map((skill) => skill.name),
      },
      ...EXPERIENCE.map((exp) => {
        const [startLabel, endLabel] = exp.period.split(' - ');
        const role: Record<string, unknown> = {
          '@type': 'OrganizationRole',
          '@id': `${SITE_URL}/#experience-${exp.id}`,
          roleName: exp.role,
          description: exp.description.join(' '),
          worksFor: {
            '@type': 'Organization',
            name: exp.company,
          },
          location: {
            '@type': 'Place',
            name: exp.location,
          },
        };
        if (startLabel) role.datePublished = startLabel.trim();
        if (endLabel && !endLabel.includes('Present')) role.dateModified = endLabel.trim();
        return role;
      }),
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#projects`,
        name: 'Featured Software Projects',
        itemListElement: PROJECTS.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: project.title,
            applicationCategory: project.category,
            description: project.description.join(' '),
            image: `${SITE_URL}${decodeURIComponent(project.imageUrl)}`,
            url: project.liveUrl || `${SITE_URL}/#projects`,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          ...SITE_META.sections.map((section, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: section.name,
            item: `${SITE_URL}/#${section.id}`,
          })),
        ],
      },
    ],
  };
}
