'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { InsuranceProduct, CATEGORY_LABELS } from '@/types'

interface Props {
  products: InsuranceProduct[]
}

const BADGE_COLORS = {
  BEST: 'bg-[#0A2540] text-white',
  HOT: 'bg-[#E8600A] text-white',
  NEW: 'bg-emerald-600 text-white',
}

export default function HeroSlider({ products }: Props) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setIdx((i) => (i + 1) % products.length), [products.length])
  const prev = () => setIdx((i) => (i - 1 + products.length) % products.length)

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [next, paused])

  const p = products[idx]

  return (
    <section
      className="relative bg-gradient-to-br from-[#061828] via-[#0A2540] to-[#103060] text-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8600A] opacity-5 rounded-full translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 opacity-5 rounded-full -translate-x-16 translate-y-16" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* 텍스트 영역 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-widest text-[#E8600A] uppercase">
                {CATEGORY_LABELS[p.category]}
              </span>
              {p.badge && (
                <span className={`text-xs font-black px-2 py-0.5 rounded ${BADGE_COLORS[p.badge]}`}>
                  {p.badge}
                </span>
              )}
            </div>

            <p className="text-sm text-blue-200 mb-1">{p.company}</p>
            <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3 text-balance">
              {p.name}
            </h1>
            <p className="text-blue-100 text-sm md:text-base mb-6 leading-relaxed">{p.tagline}</p>

            {/* 안내 배지 */}
            <div className="flex gap-3 mb-8">
              <span className="bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold px-4 py-2 rounded-full">
                📋 무료 맞춤 설계
              </span>
              <span className="bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold px-4 py-2 rounded-full">
                ✓ 24시간 내 연락
              </span>
            </div>

            {/* 주요 특징 */}
            <ul className="space-y-2 mb-8">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                  <span className="text-[#E8600A] font-bold">✓</span> {f}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 flex-wrap">
              <Link
                href={`/insurance/${p.category}/${p.slug}`}
                className="bg-[#E8600A] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#C04E08] transition-colors text-sm"
              >
                자세히 보기 →
              </Link>
              <Link
                href="/consult"
                className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors text-sm"
              >
                무료 상담 신청
              </Link>
            </div>
          </div>

          {/* 미니 카드 (데스크탑) */}
          <div className="hidden md:block w-64 bg-white/8 border border-white/10 rounded-2xl p-5 flex-shrink-0 backdrop-blur-sm">
            <p className="text-xs text-blue-300 font-semibold mb-4 uppercase tracking-wide">슬라이드 목록</p>
            {products.map((prod, i) => (
              <button
                key={prod.slug}
                onClick={() => setIdx(i)}
                className={`w-full text-left px-3 py-2.5 rounded-lg mb-1.5 text-sm transition-all ${
                  i === idx
                    ? 'bg-[#E8600A] text-white font-bold'
                    : 'text-blue-200 hover:bg-white/10'
                }`}
              >
                <span className="block font-semibold truncate">{prod.company}</span>
                <span className="block text-xs opacity-70 truncate">{prod.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 모바일 페이지네이션 */}
        <div className="flex items-center justify-center gap-4 mt-8 md:hidden">
          <button onClick={prev} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10">
            ‹
          </button>
          <div className="flex gap-1.5">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all ${i === idx ? 'w-5 h-2 bg-[#E8600A]' : 'w-2 h-2 bg-white/30'}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10">
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
