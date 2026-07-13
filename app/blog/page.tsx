import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: '보험 이야기',
  description: '보장 분석, 보험 상식, 노후 준비에 관한 실용적인 정보를 전달합니다.',
}

const CATEGORIES = ['전체', '보장분석', '보험상식', '노후준비']

export default function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const all = getAllPosts()
  const selected = searchParams.category ?? '전체'
  const posts = selected === '전체' ? all : all.filter((p) => p.category === selected)

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-[13px] font-bold tracking-widest text-orange-brand uppercase mb-2">BLOG</p>
        <h1 className="text-[32px] font-extrabold text-ink">보험 이야기</h1>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={cat === '전체' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
            className={`px-4 py-2 rounded-full text-[14px] font-semibold border-2 transition-all ${
              selected === cat
                ? 'bg-ink text-white border-ink'
                : 'bg-white text-ink-2 border-border hover:border-ink'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="text-ink-2 text-[16px]">글이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-3xl p-6 border border-border hover:shadow-card-hover transition-shadow"
            >
              <span className="text-[12px] font-bold text-orange-brand bg-orange-light px-2.5 py-0.5 rounded-full">
                {post.category}
              </span>
              <h2 className="text-[17px] font-bold text-ink mt-3 mb-2 leading-snug group-hover:text-orange-brand transition-colors text-balance">
                {post.title}
              </h2>
              <p className="text-[14px] text-ink-2 leading-relaxed line-clamp-2">{post.description}</p>
              <p className="text-[12px] text-ink-2/50 mt-4">{post.date}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
