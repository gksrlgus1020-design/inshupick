import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '설계사 소개 | 인슈픽',
  description: '인슈픽 홍길동 설계사의 상담 철학과 프로세스를 소개합니다.',
}

const STEPS = [
  {
    title: '진단',
    desc: '현재 가입된 보험의 보장 내용과 실질 가치를 함께 확인합니다. 과잉 보장과 공백 모두 파악합니다.',
  },
  {
    title: '분석',
    desc: '고객의 연령, 가족 구성, 부채, 소득 등 실제 상황을 기반으로 필요한 보장 수준을 산출합니다.',
  },
  {
    title: '비교',
    desc: '목적에 맞는 보장 카테고리를 설명하고, 어떤 선택지가 있는지 중립적으로 안내드립니다.',
  },
  {
    title: '결정',
    desc: '선택은 고객님이 합니다. 서두르지 않습니다. 충분히 이해한 뒤 결정하실 수 있도록 돕습니다.',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">

      {/* 프로필 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-14">
        <div className="w-20 h-20 rounded-full bg-surface border border-border flex items-center justify-center flex-shrink-0">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <div>
          <h1 className="text-[28px] font-extrabold text-ink">홍길동</h1>
          <p className="text-[15px] text-ink-2 mt-1">등록번호 제2024-서울-000000호</p>
          <p className="text-[15px] text-ink-2">인슈픽파트너스</p>
        </div>
      </div>

      {/* 철학 */}
      <div className="mb-14">
        <h2 className="text-[22px] font-extrabold text-ink mb-4">상담 철학</h2>
        <div className="bg-surface rounded-3xl p-6">
          <p className="text-[18px] font-bold text-ink mb-3">
            &ldquo;상품이 아니라 문제에서 시작합니다.&rdquo;
          </p>
          <p className="text-[15px] text-ink-2 leading-relaxed">
            보험 상담은 상품을 파는 것이 아니라 고객의 상황을 이해하는 것에서 출발합니다.
            어떤 보험이 필요한지 판단하려면 현재 보험이 무엇인지, 실제로 어떤 위험을 감당해야 하는지를
            먼저 파악해야 합니다. 그래서 첫 상담은 항상 진단에서 시작합니다.
          </p>
        </div>
      </div>

      <div className="mb-14">
        <p className="text-[15px] font-bold text-orange-brand mb-2 tracking-wide">중립성</p>
        <p className="text-[16px] text-ink-2 leading-relaxed">
          특정 보험사에 소속되지 않았습니다. GA(법인보험대리점) 소속 설계사로서 여러 보험사의
          상품을 취급할 수 있습니다. 특정 보험사 상품을 권할 구조적 이유가 없습니다.
          추천의 기준은 고객의 상황에 맞는가 하나입니다.
        </p>
      </div>

      {/* 4단계 프로세스 */}
      <div className="mb-14">
        <h2 className="text-[22px] font-extrabold text-ink mb-6">상담 프로세스</h2>
        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex gap-5 items-start">
              <div className="w-9 h-9 rounded-full bg-orange-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[13px] font-extrabold text-orange-brand">0{i + 1}</span>
              </div>
              <div>
                <p className="font-bold text-ink text-[16px] mb-1">{s.title}</p>
                <p className="text-[15px] text-ink-2 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/jindan"
          className="inline-block bg-orange-brand text-white px-10 py-4 rounded-2xl font-bold text-[17px] shadow-cta hover:bg-orange-hover transition-colors"
        >
          30초 진단 시작하기
        </Link>
      </div>
    </div>
  )
}
