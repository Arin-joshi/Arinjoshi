import type { Plugin } from 'vite';
import { buildStructuredData } from './buildStructuredData';

export function viteSeoPlugin(): Plugin {
  return {
    name: 'vite-seo-inject',
    transformIndexHtml(html) {
      const jsonLd = JSON.stringify(buildStructuredData(), null, 2);
      return html.replace(
        '<!-- STRUCTURED_DATA -->',
        `<script type="application/ld+json">\n${jsonLd}\n  </script>`
      );
    },
  };
}
