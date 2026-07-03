import { MetadataRoute } from 'next'
import { products } from '@/data/products'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://inshupick.kr'

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages = products.map((p) => ({
    url: `${BASE_URL}/insurance/${p.category}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/consult`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...productPages,
  ]
}
