import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProductBySlug, products } from '@/data/products'
import { CATEGORY_LABELS } from '@/types'
import ConsultForm from '@/components/ConsultForm'

interface Props {
  params: { category: string; slug: string }
}

export async function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProductBySlug(params.slug)
  if (!p) return {}
  return {
    title: `${p.company} ${CATEGORY_LABELS[p.category]} 상담`,
    description: `${p.tagline} 전문 설계사에게 맞춤 상담 받아보세요. 상담비 무료, 24시간 이내 연락.`,
  }
}

const BADGE_STYLES: Record<string, string> = {
  BEST: 'bg-[#0A2540] text-white',
  HOT: 'bg-[#E8600A] text-white',
  NEW: 'bg-emerald-600 text-white',
}

export default function ProductDetailPage({ params }: Props) {
  const p = getProductBySlug(params.slug)
  if (!p || p.category !== params.category) notFound()

  return (
    <div className="bg-[#F4F7FF] min-h-screen">
      {/* 브레드크럼 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#0A2540]">홈</Link>
          <span>›</span>
          <Link href="/#products" className="hover:text-[#0A2540]">{CATEGORY_LABELS[p.category]}</Link>
          <span>›</span>
          <span className="text-gray-600">{p.company} {CATEGORY_LABELS[p.category]}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 좌: 상품 상세 */}
          <div className="lg:col-span-2 space-y-5">
            {/* 헤더 카드 */}
            <div className="bg-gradient-to-br from-[#0A2540] to-[#103060] text-white rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#E8600A] uppercase tracking-wider">{CATEGORY_LABELS[p.category]}</span>
                {p.badge && (
                  <span className={`text-xs font-black px-2 py-0.5 rounded ${BADGE_STYLES[p.badge]}`}>{p.badge}</span>
                )}
              </div>
              <p className="text-blue-300 text-sm mb-1">{p.company}</p>
              <h1 className="text-xl md:text-3xl font-black mb-3 leading-tight">{p.name}</h1>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">{p.tagline}</p>

              <div className="flex gap-3 flex-wrap">
                <span className="bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold px-4 py-2 rounded-full">
                  📋 무료 맞춤 설계
                </span>
                <span className="bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold px-4 py-2 rounded-full">
                  ✓ 24시간 내 연락
                </span>
                <span className="bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold px-4 py-2 rounded-full">
                  💰 상담비 무료
                </span>
              </div>
            </div>

            {/* 주요 특징 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100">
              <h2 className="text-base font-black text-[#0A2540] mb-4">주요 특징</h2>
              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[#E8600A] rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-gray-700 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 보장 항목 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100">
              <h2 className="text-base font-black text-[#0A2540] mb-1">주요 보장 항목</h2>
              <p className="text-xs text-gray-400 mb-4">실제 보장 금액은 가입 조건에 따라 다르며, 상담을 통해 안내드립니다.</p>
              <div className="space-y-2">
                {p.coverages.map((c) => (
                  <div key={c.label} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-600">{c.label}</span>
                    <span className="text-sm font-semibold text-gray-500">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 유의사항 */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <h2 className="text-sm font-black text-amber-800 mb-3">⚠️ 유의사항</h2>
              <ul className="space-y-1.5">
                {p.cautions.map((c) => (
                  <li key={c} className="text-xs text-amber-700 leading-relaxed flex gap-1.5">
                    <span className="flex-shrink-0">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 우: 상담 신청 폼 (스티키) */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm">
              <h2 className="text-base font-black text-[#0A2540] mb-1">무료 상담 신청</h2>
              <p className="text-xs text-gray-400 mb-5">24시간 이내 연락 드립니다</p>
              <ConsultForm compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
