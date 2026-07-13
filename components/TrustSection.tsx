import { FadeIn } from '@/components/ui/fade-in'

const TRUST_ITEMS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: '안전한 보장 분석',
    desc: '불필요한 특약 없이 꼭 필요한 보장만 설계해드립니다. 기존 보험 검토도 무료로 진행합니다.',
    gradient: 'from-violet-DEFAULT to-violet-mid',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: '합리적인 보험료',
    desc: '여러 보험사 상품을 동시에 비교해 같은 보장을 더 저렴하게 가입할 수 있도록 도와드립니다.',
    gradient: 'from-pink-brand to-orange-brand',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: '전문 설계사 직접 상담',
    desc: '콜센터가 아닌 담당 설계사가 처음부터 끝까지 직접 책임지고 상담해드립니다.',
    gradient: 'from-blue-500 to-violet-DEFAULT',
  },
]

const STATS = [
  { num: '500+', label: '상담 완료 건수' },
  { num: '30분', label: '평균 상담 시간' },
  { num: '24h', label: '이내 연락 보장' },
]

export default function TrustSection() {
  return (
    <section id="why" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <FadeIn>
          <div className="mb-14">
            <p className="text-sm font-bold tracking-widest text-orange-brand uppercase mb-3">WHY INSHUPICK</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink text-balance">왜 인슈픽인가요?</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {TRUST_ITEMS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 80}>
              <div className="bg-surface rounded-3xl p-8 border border-border h-full hover:border-navy-mid/20 transition-colors">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-ink shadow-card mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-[16px] text-ink-2 leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 통계 */}
        <FadeIn delay={240}>
          <div className="grid grid-cols-3 divide-x divide-border bg-surface rounded-3xl border border-border p-8 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="px-4">
                <p className="text-3xl md:text-4xl font-extrabold text-ink tabular-nums">{s.num}</p>
                <p className="text-sm text-ink-2 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
