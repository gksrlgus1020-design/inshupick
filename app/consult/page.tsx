import type { Metadata } from 'next'
import ConsultForm from '@/components/ConsultForm'

export const metadata: Metadata = {
  title: '무료 상담 신청',
  description: '보험 전문 설계사에게 무료로 상담 신청하세요. 24시간 이내 연락 드립니다.',
}

export default function ConsultPage() {
  return (
    <div className="bg-[#F4F7FF] min-h-screen py-12">
      <div className="max-w-xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-widest text-[#E8600A] uppercase mb-2">FREE CONSULTATION</p>
          <h1 className="text-2xl md:text-3xl font-black text-[#0A2540] mb-3">무료 보험 상담 신청</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            신청 후 <strong>24시간 이내</strong> 담당 설계사가 직접 연락드립니다.<br />
            상담비 0원 · 가입 강요 없음 · 비교 설계 무료
          </p>
        </div>

        {/* 폼 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <ConsultForm />
        </div>

        {/* 안심 배지 */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: '🔒', text: '개인정보 안전 보호' },
            { icon: '📵', text: '스팸 연락 없음' },
            { icon: '💯', text: '상담비 완전 무료' },
          ].map((b) => (
            <div key={b.text} className="bg-white rounded-xl p-3 text-center border border-gray-100">
              <div className="text-lg mb-1">{b.icon}</div>
              <p className="text-xs text-gray-500 font-semibold leading-tight">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
