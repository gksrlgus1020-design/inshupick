import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-ink">

      {/* 그라디언트 메쉬 블롭 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-60px] left-[-60px] w-[400px] h-[400px] rounded-full bg-violet-DEFAULT opacity-20 blur-[100px]" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[400px] h-[400px] rounded-full bg-pink-brand opacity-15 blur-[100px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-orange-brand opacity-10 blur-[80px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-sm font-bold tracking-widest text-violet-mid uppercase mb-5">FREE CONSULTATION</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 text-balance leading-tight">
            지금 무료 상담 신청하고<br />최적의 보험을 찾아보세요
          </h2>
          <p className="text-lg text-white/60 mb-10 leading-relaxed">
            24시간 이내 담당 설계사가 직접 연락드립니다.<br />
            상담비 0원 · 가입 강요 없습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/consult"
              className="bg-orange-brand text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-hover transition-all duration-200 hover:scale-[1.02] shadow-cta"
            >
              무료 상담 신청하기
            </Link>
            <a
              href="https://pf.kakao.com/_jYxaPX/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FEE500] text-[#3C1E1E] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-colors"
            >
              카카오톡 상담
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
