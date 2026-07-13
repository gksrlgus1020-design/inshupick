import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllSlugs } from '@/lib/blog'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: '한기현' },
    publisher: { '@type': 'Organization', name: '인슈픽' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-2xl mx-auto px-6 py-14">
        {/* 헤더 */}
        <div className="mb-10">
          <Link href="/blog" className="inline-flex items-center gap-1 text-[14px] text-ink-2 hover:text-ink transition-colors mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            블로그 목록
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[12px] font-bold text-orange-brand bg-orange-light px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-[13px] text-ink-2/60">{post.date}</span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] font-extrabold text-ink leading-tight text-balance mb-4">
            {post.title}
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed">{post.description}</p>
        </div>

        <div className="h-px bg-border mb-10" />

        {/* 본문 */}
        <div className="prose prose-slate max-w-none
          prose-headings:font-extrabold prose-headings:text-ink
          prose-h2:text-[22px] prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-[18px] prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-[16px] prose-p:text-ink-2 prose-p:leading-[1.85]
          prose-strong:text-ink prose-strong:font-bold
          prose-a:text-orange-brand prose-a:no-underline hover:prose-a:underline
          prose-hr:border-border prose-hr:my-8
          prose-ul:text-ink-2 prose-li:text-[16px] prose-li:leading-relaxed
          prose-blockquote:border-orange-brand prose-blockquote:text-ink-2">
          <MDXRemote source={post.content} />
        </div>

        {/* 하단 CTA 배너 */}
        <div className="mt-14 bg-surface rounded-3xl p-7 text-center border border-border">
          <p className="text-[15px] text-ink-2 mb-1">읽는 것보다 확인이 빠릅니다</p>
          <p className="text-[20px] font-extrabold text-ink mb-5">내 보험의 실질 가치, 30초 진단하기</p>
          <Link
            href="/jindan"
            className="inline-block bg-orange-brand text-white px-8 py-3.5 rounded-2xl font-bold text-[16px] shadow-cta hover:bg-orange-hover transition-colors"
          >
            무료 진단하기 →
          </Link>
        </div>
      </article>
    </>
  )
}
