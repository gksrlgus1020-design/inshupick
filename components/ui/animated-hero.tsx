'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function AnimatedHero() {
  const [idx, setIdx] = useState(0)
  const words = useMemo(() => ['안전한', '든든한', '합리적인', '맞춤형', '믿을 수 있는'], [])

  useEffect(() => {
    const t = setTimeout(() => setIdx((i) => (i + 1) % words.length), 2400)
    return () => clearTimeout(t)
  }, [idx, words])

  return (
    <section className="bg-white pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* 태그 */}
        <div className="inline-flex items-center gap-2 bg-surface text-navy-mid text-sm font-semibold px-4 py-2 rounded-full mb-10 border border-border">
          <span className="w-2 h-2 rounded-full bg-orange-brand inline-block" />
          GA 소속 전문 설계사 · 비교 상담 무료
        </div>

        {/* 헤드라인 */}
        <h1 className="text-[42px] md:text-[68px] font-extrabold leading-[1.15] tracking-tight text-balance text-ink mb-6">
          나에게 꼭 맞는
          <span className="block relative h-[1.2em] mt-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[idx]}
                className="absolute inset-0 text-orange-brand"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {words[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
          보험을 찾아드립니다
        </h1>

        {/* 서브카피 */}
        <p className="text-lg md:text-xl text-ink-2 leading-relaxed max-w-xl mx-auto mb-10">
          종신·연금·암·실손·치아보험까지<br />
          수십 개 상품을 비교해 최적의 플랜을 설계해드립니다
        </p>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link
            href="/consult"
            className="bg-orange-brand text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-cta hover:bg-orange-hover transition-colors duration-200"
          >
            무료 상담 신청하기
          </Link>
          <Link
            href="/#products"
            className="bg-surface text-ink font-bold text-lg px-8 py-4 rounded-2xl border border-border hover:border-navy-mid transition-colors duration-200"
          >
            추천 상품 보기
          </Link>
        </div>

        {/* 신뢰 지표 */}
        <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
          {[
            { num: '1,200+', label: '상담 완료' },
            { num: '15개사', label: '제휴 보험사' },
            { num: '98%', label: '상담 만족도' },
            { num: '24h', label: '이내 연락 보장' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl md:text-3xl font-extrabold text-ink tabular-nums">{s.num}</p>
              <p className="text-sm text-ink-2 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
