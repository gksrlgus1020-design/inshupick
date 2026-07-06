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
    <section className="relative mesh-bg pt-20 pb-28 md:pt-32 md:pb-36 overflow-hidden">

      {/* 배경 블러 블롭 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full bg-violet-DEFAULT opacity-[0.12] blur-[100px]" />
        <div className="absolute top-[60px] right-[-60px] w-[400px] h-[400px] rounded-full bg-orange-brand opacity-[0.10] blur-[90px]" />
        <div className="absolute bottom-[-40px] left-[40%] w-[350px] h-[350px] rounded-full bg-pink-brand opacity-[0.09] blur-[80px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">

        {/* 태그 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-violet-DEFAULT text-sm font-semibold px-5 py-2.5 rounded-full mb-10 border border-violet-DEFAULT/20 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-violet-DEFAULT inline-block animate-pulse" />
          GA 소속 전문 설계사 · 비교 상담 무료
        </motion.div>

        {/* 헤드라인 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[42px] md:text-[68px] font-extrabold leading-[1.15] tracking-tight text-balance text-ink mb-6"
        >
          나에게 꼭 맞는
          <span className="block relative h-[1.2em] mt-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[idx]}
                className="absolute inset-0 bg-gradient-to-r from-violet-DEFAULT to-pink-brand bg-clip-text text-transparent"
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
        </motion.h1>

        {/* 서브카피 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-ink-2 leading-relaxed max-w-xl mx-auto mb-10"
        >
          종신·연금·암·실손·치아보험까지<br />
          수십 개 상품을 비교해 최적의 플랜을 설계해드립니다
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
        >
          <Link
            href="/consult"
            className="bg-orange-brand text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-cta hover:bg-orange-hover transition-all duration-200 hover:scale-[1.02]"
          >
            무료 상담 신청하기
          </Link>
          <Link
            href="/#products"
            className="bg-white/80 backdrop-blur-sm text-ink font-bold text-lg px-8 py-4 rounded-2xl border border-border hover:border-violet-DEFAULT/50 hover:bg-white transition-all duration-200"
          >
            추천 상품 보기
          </Link>
        </motion.div>

        {/* 신뢰 지표 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-8 md:gap-14 flex-wrap"
        >
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
        </motion.div>

      </div>
    </section>
  )
}
