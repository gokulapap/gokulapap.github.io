import type { MetadataRoute } from 'next';

// Single-page portfolio — sitemap just points at the root. Anchor sections
// (#about, #projects, …) aren't crawled as separate URLs by convention.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://gokulapap.github.io/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
