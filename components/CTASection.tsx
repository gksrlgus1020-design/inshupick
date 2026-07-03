import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#E8600A] to-[#C04E08] text-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <p className="text-sm font-bold tracking-widest uppercase opacity-80 mb-3">FREE CONSULTATION</p>
        <h2 className="text-2xl md:text-4xl font-black mb-4 text-balance leading-tight">
          지금 무료 상담 신청하고<br />최적의 보험을 찾아보세요
        </h2>
        <p className="text-white/80 mb-8 text-sm md:text-base leading-relaxed">
          24시간 이내 담당 설계사가 직접 연락드립니다.<br />
          상담비 0원, 가입 강요 없습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/consult"
            className="bg-white text-[#E8600A] px-8 py-4 rounded-xl font-black text-base hover:bg-orange-50 transition-colors shadow-lg"
          >
            📋 무료 상담 신청하기
          </Link>
          <a
            href="https://pf.kakao.com/_jYxaPX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FEE500] text-[#3C1E1E] px-8 py-4 rounded-xl font-black text-base hover:bg-yellow-300 transition-colors"
          >
            💬 카카오톡 상담
          </a>
        </div>
      </div>
    </section>
  )
}
