import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/blog'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://inshupick.kr'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs()
  const blogPages = slugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/jindan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...blogPages,
  ]
}
