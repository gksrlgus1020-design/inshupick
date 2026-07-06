import { FadeIn } from '@/components/ui/fade-in'

const REVIEWS = [
  {
    name: '김민준',
    age: '34세',
    tag: '종신보험',
    text: '다른 설계사분들은 비싼 상품만 권유했는데 인슈픽에서는 제 예산에 딱 맞는 플랜을 설계해줬어요. 보장 내용도 꼼꼼히 설명해주셔서 믿고 가입했습니다.',
    stars: 5,
    gradient: 'from-violet-DEFAULT to-violet-mid',
  },
  {
    name: '이수연',
    age: '41세',
    tag: '암보험',
    text: '암 가족력이 있어서 오래 고민했는데, 여러 보험사 상품을 비교해서 제일 합리적인 걸로 골라주셨어요. 상담도 강요 없이 편하게 진행됐어요.',
    stars: 5,
    gradient: 'from-pink-brand to-orange-brand',
  },
  {
    name: '박성호',
    age: '52세',
    tag: '연금보험',
    text: '노후 준비를 어디서 시작해야 할지 막막했는데, 지금 상황에서 가장 효율적인 연금 설계를 해주셨어요. 세금 혜택까지 챙겨주셔서 만족합니다.',
    stars: 5,
    gradient: 'from-blue-500 to-violet-DEFAULT',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F97316" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 mesh-bg-subtle">
      <div className="max-w-6xl mx-auto px-6">

        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-bold tracking-widest text-violet-DEFAULT uppercase mb-3">REVIEWS</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink">실제 상담 후기</h2>
            <p className="text-ink-2 mt-4 text-lg">인슈픽과 함께 보험을 정리한 분들의 이야기</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <FadeIn key={r.name} delay={i * 100}>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white shadow-card hover:shadow-card-hover transition-all duration-300 p-7 flex flex-col gap-5">

                {/* 상단 */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0`}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-ink">{r.name} <span className="text-ink-2 font-normal text-sm">· {r.age}</span></p>
                    <span className="text-xs font-semibold text-violet-DEFAULT bg-violet-light px-2.5 py-1 rounded-lg">{r.tag}</span>
                  </div>
                </div>

                <Stars count={r.stars} />

                <p className="text-[15px] text-ink-2 leading-relaxed flex-1">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 요약 통계 */}
        <FadeIn delay={300}>
          <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-3xl border border-white shadow-card p-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-violet-DEFAULT to-pink-brand bg-clip-text text-transparent">4.9 / 5.0</p>
              <p className="text-sm text-ink-2 mt-1">평균 만족도</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-pink-brand to-orange-brand bg-clip-text text-transparent">500+</p>
              <p className="text-sm text-ink-2 mt-1">누적 상담 건수</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border" />
            <div>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-orange-brand to-violet-DEFAULT bg-clip-text text-transparent">98%</p>
              <p className="text-sm text-ink-2 mt-1">재추천 의향</p>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
