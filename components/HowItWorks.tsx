import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'

const STEPS = [
  {
    num: '01',
    title: '상담 신청',
    desc: '이름과 연락처만 입력하면 끝. 30초면 충분합니다.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    gradient: 'from-violet-DEFAULT to-violet-mid',
    bg: 'bg-violet-light',
  },
  {
    num: '02',
    title: '맞춤 설계',
    desc: '담당 설계사가 24시간 내 연락해 나이·건강·예산에 맞는 최적 플랜을 비교 설계합니다.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    gradient: 'from-pink-brand to-orange-brand',
    bg: 'bg-pink-light',
  },
  {
    num: '03',
    title: '가입 완료',
    desc: '마음에 드는 상품 선택 후 간편하게 가입. 가입 강요는 절대 없습니다.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    gradient: 'from-blue-500 to-violet-DEFAULT',
    bg: 'bg-blue-50',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-bold tracking-widest text-violet-DEFAULT uppercase mb-3">HOW IT WORKS</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink">상담부터 가입까지 3단계</h2>
            <p className="text-ink-2 mt-4 text-lg">복잡한 보험, 인슈픽이 쉽게 해드립니다</p>
          </div>
        </FadeIn>

        <div className="relative grid md:grid-cols-3 gap-6">

          {/* 연결선 (데스크탑) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-violet-DEFAULT/30 via-pink-brand/30 to-blue-500/30" />

          {STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 120}>
              <div className="relative bg-white rounded-3xl border border-border p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group text-center">

                {/* 번호 배지 */}
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-xs font-black shadow-sm`}>
                  {i + 1}
                </div>

                <div className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 mt-2 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${step.gradient} bg-clip-text`} style={{ color: 'transparent', display: 'flex' }}>
                    <div className={`text-gradient bg-gradient-to-br ${step.gradient}`} style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {step.icon}
                    </div>
                  </div>
                </div>

                <p className="text-xs font-black tracking-widest text-ink-2/40 mb-2">{step.num}</p>
                <h3 className="text-xl font-extrabold text-ink mb-3">{step.title}</h3>
                <p className="text-[15px] text-ink-2 leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={360}>
          <div className="text-center mt-12">
            <Link
              href="/consult"
              className="inline-flex items-center gap-2 bg-orange-brand text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-hover transition-all duration-200 hover:scale-[1.02] shadow-cta"
            >
              지금 바로 시작하기
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
