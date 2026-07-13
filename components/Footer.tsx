import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/50 pt-14 pb-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 mb-12">

          <div className="flex-shrink-0">
            <div className="text-white font-extrabold text-2xl mb-3">
              인슈<span className="text-orange-brand">픽</span>
            </div>
            <p className="text-[15px] text-white/40 max-w-[200px] leading-relaxed">
              내 보험을 숫자로 진단하는 곳
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-[15px]">
            <div>
              <p className="text-white font-semibold mb-4">서비스</p>
              <ul className="space-y-3">
                <li><Link href="/jindan" className="hover:text-white transition-colors">보장가치 진단</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">블로그</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">설계사 소개</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-4">정보</p>
              <ul className="space-y-3">
                <li><Link href="/blog?category=보장분석" className="hover:text-white transition-colors">보장분석</Link></li>
                <li><Link href="/blog?category=보험상식" className="hover:text-white transition-colors">보험상식</Link></li>
                <li><Link href="/blog?category=노후준비" className="hover:text-white transition-colors">노후준비</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-4">고객 지원</p>
              <ul className="space-y-3">
                <li>
                  <a href="https://pf.kakao.com/_jYxaPX/chat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    카카오톡 상담
                  </a>
                </li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 space-y-3 text-[13px] text-white/30">
          <p className="leading-relaxed text-white/50">
            본 사이트는 특정 보험상품의 광고가 아니며, 제공되는 계산 결과는 통계청 소비자물가지수 기반 참고용 정보입니다.
            보험상품의 세부 내용은 상담 시 상품설명서 및 가입설계서를 통해 확인하시기 바랍니다.
          </p>
          <p>
            한기현 &nbsp;|&nbsp; 우수인증 설계사/대리점 · 인증번호 2026-26071
          </p>
          <p>© 2026 인슈픽. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
