import Link from 'next/link'
import { InsuranceProduct, CATEGORY_LABELS } from '@/types'

interface Props {
  product: InsuranceProduct
}

const BADGE_STYLES = {
  BEST: 'bg-[#0A2540] text-white',
  HOT: 'bg-[#E8600A] text-white',
  NEW: 'bg-emerald-600 text-white',
}

export default function ProductCard({ product: p }: Props) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {p.badge && (
        <span className={`absolute top-4 right-4 text-xs font-black px-2 py-0.5 rounded ${BADGE_STYLES[p.badge]}`}>
          {p.badge}
        </span>
      )}

      <div className="p-5 flex-1">
        <p className="text-xs text-gray-400 font-semibold mb-1">{p.company}</p>
        <p className="text-xs text-[#E8600A] font-bold mb-1">{CATEGORY_LABELS[p.category]}</p>
        <h3 className="text-base font-black text-[#0A2540] leading-tight mb-3 pr-8">{p.name}</h3>

        {/* 상담 안내 */}
        <div className="bg-[#F4F7FF] rounded-xl p-3 mb-4 flex items-center gap-2">
          <span className="text-[#E8600A] text-sm">📋</span>
          <p className="text-xs text-gray-500 leading-relaxed">
            보험료 및 보장 내용은 나이·건강 상태에 따라 다릅니다.<br />
            <span className="font-bold text-[#0A2540]">무료 상담으로 맞춤 안내</span> 받아보세요.
          </p>
        </div>

        {/* 특징 */}
        <ul className="space-y-1.5 mb-4">
          {p.features.map((f) => (
            <li key={f} className="flex items-start gap-1.5 text-xs text-gray-600">
              <span className="text-[#E8600A] font-bold mt-0.5 flex-shrink-0">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 pt-0 flex gap-2">
        <Link
          href={`/insurance/${p.category}/${p.slug}`}
          className="flex-1 text-center bg-[#0A2540] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#103060] transition-colors"
        >
          자세히 보기
        </Link>
        <Link
          href="/consult"
          className="flex-1 text-center border border-[#E8600A] text-[#E8600A] py-2.5 rounded-lg text-sm font-bold hover:bg-orange-50 transition-colors"
        >
          상담 신청
        </Link>
      </div>
    </div>
  )
}
