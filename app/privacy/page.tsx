// 법률 자문을 대체하지 않습니다. 실제 서비스 운영 시 법률 전문가 검토를 받으시기 바랍니다.
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '인슈픽 개인정보 수집·이용·보관에 관한 처리방침입니다.',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <Link href="/" className="inline-flex items-center gap-1 text-[14px] text-ink-2 hover:text-ink transition-colors mb-8">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        홈으로
      </Link>

      <h1 className="text-[28px] font-extrabold text-ink mb-2">개인정보처리방침</h1>
      <p className="text-[14px] text-ink-2 mb-10">최종 업데이트: 2026년 7월</p>

      <div className="space-y-10 text-[15px] text-ink-2 leading-[1.85]">

        <section>
          <h2 className="text-[17px] font-extrabold text-ink mb-3">1. 수집하는 개인정보 항목</h2>
          <p className="mb-3">인슈픽은 보험 상담 서비스 제공을 위해 아래 항목을 수집합니다.</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-ink">필수:</strong> 이름, 연락처(전화번호)</li>
            <li><strong className="text-ink">선택:</strong> 통화 가능 시간, 진단 입력값(보험 가입 연도·사망보장 금액)</li>
            <li><strong className="text-ink">자동 수집:</strong> 접속 기록, 쿠키, 광고 식별 정보(메타 픽셀을 통한 광고 성과 측정용)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[17px] font-extrabold text-ink mb-3">2. 개인정보 수집·이용 목적</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>보험 상담 신청 접수 및 연락</li>
            <li>맞춤 보험 정보 안내</li>
            <li>광고 성과 측정 (메타 픽셀 — PageView, ViewContent, Lead 이벤트)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[17px] font-extrabold text-ink mb-3">3. 개인정보 보유·이용 기간</h2>
          <p>상담 완료 후 <strong className="text-ink">1년</strong> 또는 동의 철회 시까지 보관 후 파기합니다.
            관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.</p>
        </section>

        <section>
          <h2 className="text-[17px] font-extrabold text-ink mb-3">4. 개인정보 처리 위탁</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[14px] border-collapse">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left px-4 py-3 font-bold text-ink border border-border">수탁업체</th>
                  <th className="text-left px-4 py-3 font-bold text-ink border border-border">위탁 업무</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border border-border">Supabase Inc.</td>
                  <td className="px-4 py-3 border border-border">상담 신청 데이터 저장 및 관리</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border border-border">Meta Platforms, Inc.</td>
                  <td className="px-4 py-3 border border-border">광고 성과 측정 (메타 픽셀·쿠키 사용)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-[17px] font-extrabold text-ink mb-3">5. 정보주체의 권리</h2>
          <p>이용자는 아래 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>개인정보 열람, 수정, 삭제 요청</li>
            <li>개인정보 처리 정지 요청</li>
            <li>동의 철회 요청</li>
          </ul>
          <p className="mt-3">요청은 아래 개인정보 보호책임자에게 연락하시면 됩니다.</p>
        </section>

        <section>
          <h2 className="text-[17px] font-extrabold text-ink mb-3">6. 개인정보 보호책임자</h2>
          <div className="bg-surface rounded-2xl p-5">
            <p><strong className="text-ink">성명:</strong> 한기현</p>
            <p><strong className="text-ink">인증:</strong> 우수인증 설계사/대리점 · 인증번호 2026-26071</p>
            <p className="mt-2"><strong className="text-ink">연락처:</strong>{' '}
              <Link href="/jindan" className="text-orange-brand hover:underline">상담 신청 페이지</Link>를 통해 문의해주세요. (placeholder — 실제 연락처로 교체 필요)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[17px] font-extrabold text-ink mb-3">7. 쿠키·광고 식별 정보</h2>
          <p>
            본 사이트는 메타 픽셀(Meta Pixel)을 사용하여 광고 성과를 측정합니다.
            픽셀은 페이지 방문(PageView), 진단 결과 조회(ViewContent), 상담 신청 완료(Lead) 시점에 이벤트를 전송합니다.
            수집된 정보는 광고 효율 측정 목적으로만 사용됩니다.
          </p>
        </section>

        <div className="border-t border-border pt-6 text-[13px] text-ink-2/60">
          <p>본 방침은 법령 또는 내부 정책 변경에 따라 수정될 수 있으며, 변경 시 사이트를 통해 공지합니다.</p>
        </div>
      </div>
    </div>
  )
}
