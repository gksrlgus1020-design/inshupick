'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/ui/fade-in'

const FAQS = [
  {
    q: '상담은 정말 무료인가요?',
    a: '네, 100% 무료입니다. 상담부터 설계까지 비용이 전혀 없으며 가입을 강요하지 않습니다. 설계사 수수료는 보험사에서 지급되므로 고객님 부담이 없습니다.',
  },
  {
    q: '어떤 보험사 상품을 비교해드리나요?',
    a: '삼성생명, 교보생명, 한화생명, DB생명, 신한라이프 등 국내 15개 주요 보험사의 상품을 비교합니다. GA(법인보험대리점) 소속으로 특정 보험사에 종속되지 않고 객관적으로 비교해드립니다.',
  },
  {
    q: '기존에 가입한 보험도 검토해주나요?',
    a: '물론입니다. 기존 보험 약관을 분석해 중복 보장이나 불필요한 특약을 찾아드립니다. 보험료를 낮추거나 보장을 강화할 수 있는 방법도 함께 안내해드립니다.',
  },
  {
    q: '상담 후 가입을 안 해도 되나요?',
    a: '당연히 가입하지 않으셔도 됩니다. 설계 내용만 받아보시고 결정하지 않으셔도 아무런 불이익이 없습니다. 부담 없이 보험료와 보장 내용을 비교해보세요.',
  },
  {
    q: '상담은 어떻게 진행되나요?',
    a: '신청 후 24시간 이내에 담당 설계사가 전화 또는 카카오톡으로 연락드립니다. 전화나 비대면으로 진행되며, 원하시면 대면 상담도 가능합니다.',
  },
  {
    q: '어떤 보험부터 가입해야 하나요?',
    a: '일반적으로 실손보험 → 암보험 → 종신/정기보험 순서로 우선순위를 두지만, 나이·건강 상태·예산에 따라 다릅니다. 상담을 통해 현재 상황에 맞는 우선순위를 함께 결정해드립니다.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">

        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-sm font-bold tracking-widest text-violet-DEFAULT uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink">자주 묻는 질문</h2>
          </div>
        </FadeIn>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  open === i
                    ? 'border-violet-DEFAULT/30 shadow-btn bg-white'
                    : 'border-border bg-white hover:border-violet-DEFAULT/20'
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-ink pr-4 text-[16px]">{faq.q}</span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      open === i
                        ? 'bg-gradient-to-br from-violet-DEFAULT to-violet-mid text-white rotate-45'
                        : 'bg-surface text-ink-2'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-[15px] text-ink-2 leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
