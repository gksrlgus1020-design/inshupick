import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '개인정보 처리방침',
  description: '인슈픽 개인정보 수집·이용·보관에 관한 처리방침입니다.',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <div className="bg-[#F4F7FF] min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-[#0A2540] mb-6 inline-block">← 홈으로</Link>

          <h1 className="text-2xl font-black text-[#0A2540] mb-2">개인정보 처리방침</h1>
          <p className="text-sm text-gray-400 mb-8">최종 업데이트: 2025년 7월</p>

          <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-base font-black text-[#0A2540] mb-3">1. 수집하는 개인정보 항목</h2>
              <p>인슈픽은 보험 상담 서비스 제공을 위해 아래 항목을 수집합니다.</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                <li>필수: 이름, 연락처(전화번호)</li>
                <li>선택: 관심 보험 분야, 선호 상담 시간, 문의 내용</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-black text-[#0A2540] mb-3">2. 개인정보 수집·이용 목적</h2>
              <ul className="space-y-1 list-disc list-inside text-gray-600">
                <li>보험 상담 신청 접수 및 담당 설계사 배정</li>
                <li>상담 일정 안내 및 연락</li>
                <li>보험 상품 안내 및 맞춤 설계 서비스 제공</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-black text-[#0A2540] mb-3">3. 개인정보 보유·이용 기간</h2>
              <p>상담 완료 후 <strong>1년</strong>간 보관 후 파기합니다. 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.</p>
            </section>

            <section>
              <h2 className="text-base font-black text-[#0A2540] mb-3">4. 개인정보 제3자 제공</h2>
              <p>수집한 개인정보는 원칙적으로 제3자에게 제공하지 않습니다. 다만, 담당 설계사에게 상담 목적으로만 전달됩니다.</p>
            </section>

            <section>
              <h2 className="text-base font-black text-[#0A2540] mb-3">5. 개인정보 파기 방법</h2>
              <p>전자적 형태로 저장된 개인정보는 기록을 재생할 수 없도록 안전하게 삭제합니다.</p>
            </section>

            <section>
              <h2 className="text-base font-black text-[#0A2540] mb-3">6. 정보 주체의 권리</h2>
              <p>이용자는 언제든지 아래 권리를 행사할 수 있습니다.</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-600">
                <li>개인정보 열람 요청</li>
                <li>개인정보 수정·삭제 요청</li>
                <li>개인정보 처리 정지 요청</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-black text-[#0A2540] mb-3">7. 개인정보 보호 책임자</h2>
              <div className="bg-[#F4F7FF] rounded-xl p-4 text-gray-600">
                {/* 실제 정보로 교체 필요 */}
                <p>책임자: 담당 설계사 (교체 필요)</p>
                <p>연락처: 상담 신청 페이지를 통해 문의해주세요.</p>
              </div>
            </section>

            <section className="border-t border-gray-100 pt-6">
              <p className="text-xs text-gray-400">
                본 방침은 법령 또는 내부 정책 변경에 따라 수정될 수 있으며, 변경 시 사이트를 통해 공지합니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
