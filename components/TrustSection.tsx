const TRUST_ITEMS = [
  {
    icon: '🛡️',
    title: '안전한 보장 분석',
    desc: '불필요한 특약 없이 꼭 필요한 보장만 설계해드립니다. 기존 보험 검토도 무료로 진행합니다.',
  },
  {
    icon: '💰',
    title: '합리적인 보험료',
    desc: '여러 보험사 상품을 동시에 비교해 같은 보장을 더 저렴하게 가입할 수 있도록 도와드립니다.',
  },
  {
    icon: '👤',
    title: '전문 설계사 직접 상담',
    desc: '콜센터가 아닌 담당 설계사가 처음부터 끝까지 직접 책임지고 상담해드립니다.',
  },
]

export default function TrustSection() {
  return (
    <section id="why" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-[#E8600A] uppercase mb-2">WHY INSHUPICK</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A2540]">왜 인슈픽인가요?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="bg-[#F4F7FF] rounded-2xl p-6 border border-blue-50 hover:border-blue-200 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-black text-[#0A2540] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 통계 바 */}
        <div className="mt-12 grid grid-cols-3 gap-4 bg-[#0A2540] rounded-2xl p-6 text-center">
          {[
            { num: '500+', label: '상담 완료 건수' },
            { num: '30분', label: '평균 상담 시간' },
            { num: '24h', label: '이내 연락 보장' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-[#E8600A] text-2xl md:text-3xl font-black tabular-nums">{s.num}</p>
              <p className="text-blue-300 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
