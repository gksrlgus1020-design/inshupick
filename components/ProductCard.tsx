import Link from 'next/link'
import { InsuranceProduct, CATEGORY_LABELS } from '@/types'

interface Props {
  product: InsuranceProduct
}

const BADGE_STYLES = {
  BEST: 'bg-violet-DEFAULT text-white',
  HOT: 'bg-orange-brand text-white',
  NEW: 'bg-pink-brand text-white',
}

const CATEGORY_COLORS: Record<string, string> = {
  life: 'text-blue-600 bg-blue-50',
  cancer: 'text-rose-600 bg-rose-50',
  annuity: 'text-violet-DEFAULT bg-violet-light',
}

export default function ProductCard({ product: p }: Props) {
  return (
    <div className="group relative bg-white rounded-3xl border border-border shadow-card hover:shadow-card-hover hover:border-violet-DEFAULT/30 transition-all duration-300 flex flex-col overflow-hidden">

      {/* 상단 그라디언트 라인 */}
      <div className="h-1 w-full bg-gradient-to-r from-violet-DEFAULT via-pink-brand to-orange-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {p.badge && (
        <span className={`absolute top-5 right-5 text-xs font-bold px-2.5 py-1 rounded-lg ${BADGE_STYLES[p.badge]}`}>
          {p.badge}
        </span>
      )}

      <div className="p-7 flex-1">
        <div className="flex items-center gap-2 mb-5">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${CATEGORY_COLORS[p.category] ?? 'text-gray-600 bg-gray-50'}`}>
            {CATEGORY_LABELS[p.category]}
          </span>
          <span className="text-sm text-ink-2">{p.company}</span>
        </div>

        <h3 className="text-xl font-bold text-ink leading-snug mb-3 pr-10">{p.name}</h3>
        <p className="text-[15px] text-ink-2 leading-relaxed mb-6">{p.tagline}</p>

        {/* 안내 칩 */}
        <div className="bg-violet-light rounded-2xl px-4 py-3 mb-6 flex items-start gap-2.5">
          <span className="text-violet-DEFAULT text-base mt-0.5 flex-shrink-0">✓</span>
          <p className="text-[14px] text-ink-2 leading-relaxed">
            보험료·보장 내용은 나이·건강 상태마다 달라요.<br />
            <span className="font-semibold text-ink">무료 상담으로 맞춤 설계</span> 받아보세요.
          </p>
        </div>

        {/* 특징 */}
        <ul className="space-y-2.5">
          {p.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[15px] text-ink-2">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-DEFAULT to-violet-mid flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-7 pt-0 flex gap-3">
        <Link
          href={`/insurance/${p.category}/${p.slug}`}
          className="flex-1 text-center bg-gradient-to-r from-violet-DEFAULT to-violet-mid text-white py-3.5 rounded-2xl text-[15px] font-bold hover:opacity-90 transition-opacity"
        >
          자세히 보기
        </Link>
        <Link
          href="/consult"
          className="flex-1 text-center border-2 border-orange-brand text-orange-brand py-3.5 rounded-2xl text-[15px] font-bold hover:bg-orange-light transition-colors"
        >
          상담 신청
        </Link>
      </div>
    </div>
  )
}
