import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] text-gray-400 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-shrink-0">
            <div className="text-white font-black text-xl mb-2">
              인슈<span className="text-[#E8600A]">픽</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              GA 소속 보험 전문 설계사<br />
              생명·건강·자동차·종합보험 전문
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-white font-semibold mb-3">바로가기</p>
              <ul className="space-y-2">
                <li><Link href="/#products" className="hover:text-white transition-colors">상품 안내</Link></li>
                <li><Link href="/consult" className="hover:text-white transition-colors">무료 상담</Link></li>
                <li><Link href="/#why" className="hover:text-white transition-colors">이용 안내</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">상품 분류</p>
              <ul className="space-y-2">
                <li><Link href="/insurance/life/samsung-life-whole" className="hover:text-white transition-colors">생명보험</Link></li>
                <li><Link href="/insurance/cancer/kyobo-cancer" className="hover:text-white transition-colors">암보험</Link></li>
                <li><Link href="/insurance/annuity/hanwha-annuity" className="hover:text-white transition-colors">연금보험</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">고객 지원</p>
              <ul className="space-y-2">
                <li>
                  <a href="https://pf.kakao.com/_jYxaPX/chat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    카카오톡 상담
                  </a>
                </li>
                <li><Link href="/consult" className="hover:text-white transition-colors">상담 신청</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a3a5c] pt-6 space-y-3 text-xs text-gray-500">
          {/* 보험 광고 필수 문구 - 실제 정보로 교체 필요 */}
          <p className="leading-relaxed">
            <strong className="text-gray-400">[보험 광고 관련 안내]</strong>&nbsp;
            본 사이트는 보험 상담 및 상품 안내를 목적으로 운영됩니다.
            보험계약 체결 전에 상품설명서 및 약관을 반드시 읽어보시기 바랍니다.
            이 보험 상품은 예금자보호법에 따라 보호받을 수 있습니다.
          </p>
          <p className="leading-relaxed">
            <strong className="text-gray-400">[대리점 정보 - 교체 필요]</strong>&nbsp;
            상호: (주)OO보험대리점 &nbsp;|&nbsp;
            사업자번호: 000-00-00000 &nbsp;|&nbsp;
            GA 등록번호: 제0000-000호 &nbsp;|&nbsp;
            설계사 등록번호: 제00-000-000000호
          </p>
          <p>© 2025 인슈픽. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
