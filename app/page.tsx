import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { FadeIn } from '@/components/ui/fade-in'
import { AGENT } from '@/lib/site-config'

export const metadata: Metadata = {
  title: { absolute: '인슈픽 | 내 보험을 숫자로 진단하는 곳' },
  description: '2010년의 1억과 지금의 1억은 다릅니다. 내 사망보장의 진짜 가치, 30초면 확인됩니다.',
}

const STEPS = [
  { num: '01', title: '30초 진단', desc: '가입 연도와 보험금만 입력하면 현재 실질가치를 바로 확인할 수 있습니다.' },
  { num: '02', title: '현재 보험 분석', desc: '지금 가입된 보험이 어떤 구조인지, 어떤 보장이 있는지 함께 살펴봅니다.' },
  { num: '03', title: '카테고리별 비교', desc: '같은 목적의 보장을 어떤 방식으로 준비할 수 있는지 선택지를 설명합니다.' },
  { num: '04', title: '선택은 고객이', desc: '어떤 상품도 강요하지 않습니다. 정보를 드리고, 결정은 고객님이 합니다.' },
]

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* ── 히어로 ── */}
      <section className="bg-white pt-16 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block bg-orange-light text-orange-brand text-[13px] font-bold px-3 py-1 rounded-full mb-6 tracking-wide">
              보장가치 무료 진단
            </span>
            <h1 className="text-[32px] sm:text-[42px] font-extrabold text-ink leading-tight mb-5 text-balance">
              2010년의 1억과<br />
              지금의 1억은 다릅니다
            </h1>
            <p className="text-[17px] text-ink-2 leading-relaxed mb-10">
              내 사망보장의 진짜 가치, 30초면 확인됩니다
            </p>
            <Link
              href="/jindan"
              className="inline-block bg-orange-brand text-white px-10 py-4 rounded-2xl font-bold text-[18px] shadow-cta hover:bg-orange-hover transition-colors"
            >
              무료로 진단하기
            </Link>
          </FadeIn>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── 신뢰 섹션 — 4단계 프로세스 ── */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-[13px] font-bold tracking-widest text-orange-brand uppercase mb-3">HOW IT WORKS</p>
            <h2 className="text-[28px] sm:text-[34px] font-extrabold text-ink mb-12 text-balance">
              상담 프로세스 4단계
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STEPS.map((s, i) => (
              <FadeIn key={s.num} delay={i * 80}>
                <div className="bg-surface rounded-3xl p-6">
                  <span className="text-[13px] font-bold text-orange-brand/70 block mb-3">{s.num}</span>
                  <h3 className="text-[18px] font-extrabold text-ink mb-2">{s.title}</h3>
                  <p className="text-[15px] text-ink-2 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* 설계사 프로필 */}
          <FadeIn delay={320}>
            <div className="mt-12 bg-white border border-border rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-extrabold text-ink text-[17px]">{AGENT.name}</p>
                <p className="text-[14px] text-ink-2 mt-0.5">{AGENT.certLine}</p>
                <p className="text-[14px] text-ink-2 mt-3 leading-relaxed">
                  특정 보험사에 소속되지 않아, 특정 상품을 권할 이유가 없습니다.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── 최신 블로그 글 ── */}
      {posts.length > 0 && (
        <section className="py-20 bg-surface px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-[13px] font-bold tracking-widest text-orange-brand uppercase mb-2">BLOG</p>
                  <h2 className="text-[28px] font-extrabold text-ink">보험 이야기</h2>
                </div>
                <Link href="/blog" className="text-[15px] text-ink-2 hover:text-ink transition-colors font-semibold">
                  전체 보기 →
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 80}>
                  <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-3xl p-6 hover:shadow-card-hover transition-shadow border border-border/60">
                    <span className="text-[12px] font-bold text-orange-brand bg-orange-light px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="text-[16px] font-bold text-ink mt-3 mb-2 leading-snug group-hover:text-orange-brand transition-colors line-clamp-2 text-balance">
                      {post.title}
                    </h3>
                    <p className="text-[13px] text-ink-2 line-clamp-2 leading-relaxed">{post.description}</p>
                    <p className="text-[12px] text-ink-2/50 mt-4">{post.date}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
