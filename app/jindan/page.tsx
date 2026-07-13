'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { calculate, formatKRW, CURRENT_YEAR } from '@/lib/inflation'
import { TIME_OPTIONS } from '@/types'

// 비교 기능 — 준법 확인 전 OFF
const SHOW_COMPARISON = false

type Step = 1 | 2 | 3 | 4

const AMOUNT_OPTIONS = [
  { label: '5천만 원', value: 50_000_000 },
  { label: '1억 원', value: 100_000_000 },
  { label: '2억 원', value: 200_000_000 },
  { label: '3억 원', value: 300_000_000 },
]

const YEARS = Array.from({ length: CURRENT_YEAR - 1989 }, (_, i) => CURRENT_YEAR - i - 1)

export default function JindanPage() {
  const [step, setStep] = useState<Step>(1)
  const [joinYear, setJoinYear] = useState<number>(2010)
  const [amount, setAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [useCustom, setUseCustom] = useState(false)

  // 폼 상태
  const [form, setForm] = useState({ name: '', phone: '', preferred_time: '' })
  const [privacy, setPrivacy] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')

  // UTM — 진입 시 sessionStorage에 보관
  const utmRef = useRef<Record<string, string>>({})
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utm: Record<string, string> = {}
    ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((k) => {
      const v = params.get(k)
      if (v) utm[k] = v
    })
    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem('inshupick_utm', JSON.stringify(utm))
    }
    try {
      const stored = sessionStorage.getItem('inshupick_utm')
      if (stored) utmRef.current = JSON.parse(stored)
    } catch {}
  }, [])

  const finalAmount = useCustom
    ? (parseInt(customAmount.replace(/[^0-9]/g, ''), 10) || 0) * 10_000
    : (amount ?? 0)

  const result = finalAmount > 0 && step >= 3 ? calculate(finalAmount, joinYear) : null

  // 메타 픽셀 이벤트 (ViewContent)
  useEffect(() => {
    if (step === 3 && typeof window !== 'undefined' && (window as any).fbq) {
      ;(window as any).fbq('track', 'ViewContent', { content_name: '진단결과' })
    }
  }, [step])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.preferred_time) {
      setFormError('이름, 연락처, 통화 가능 시간을 모두 입력해주세요.')
      return
    }
    if (!privacy) {
      setFormError('개인정보 수집·이용에 동의해주세요.')
      return
    }
    const phoneClean = form.phone.replace(/\D/g, '')
    if (phoneClean.length < 10 || phoneClean.length > 11) {
      setFormError('연락처를 확인해주세요.')
      return
    }
    setFormError('')
    setFormStatus('loading')

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          interest: '보장가치 진단',
          preferred_time: form.preferred_time,
          source: 'jindan',
          diagnosis_year: joinYear,
          diagnosis_amount: finalAmount,
          current_value: result?.currentValue,
          future_value: result?.futureValue,
          ...utmRef.current,
        }),
      })
      if (!res.ok) throw new Error()
      setFormStatus('success')
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'Lead')
      }
    } catch {
      setFormStatus('error')
    }
  }

  // SVG 하락 곡선
  function InflationChart() {
    if (!result) return null
    const pts = Array.from({ length: 21 }, (_, i) => {
      const val = Math.round(finalAmount / Math.pow(1.025, result.elapsedYears + i))
      return val
    })
    const max = finalAmount
    const min = pts[pts.length - 1]
    const W = 320
    const H = 120
    const pad = { t: 16, b: 32, l: 8, r: 8 }
    const iw = W - pad.l - pad.r
    const ih = H - pad.t - pad.b
    const points = pts
      .map((v, i) => {
        const x = pad.l + (i / 20) * iw
        const y = pad.t + ((max - v) / (max - min)) * ih
        return `${x},${y}`
      })
      .join(' ')

    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[340px] mx-auto mt-4" aria-hidden>
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8600A" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#E8600A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* 면적 */}
        <polygon
          points={`${pad.l},${pad.t} ${points} ${pad.l + iw},${pad.t + ih} ${pad.l},${pad.t + ih}`}
          fill="url(#grad)"
        />
        {/* 선 */}
        <polyline points={points} fill="none" stroke="#E8600A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* 시작점 */}
        <circle cx={pad.l} cy={pad.t} r="4" fill="#E8600A" />
        {/* 현재 */}
        <circle cx={pad.l + iw * 0} cy={pad.t} r="0" />
        {/* 축 레이블 */}
        <text x={pad.l} y={H - 6} fontSize="10" fill="#94a3b8">현재</text>
        <text x={pad.l + iw - 14} y={H - 6} fontSize="10" fill="#94a3b8">+20년</text>
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-6 py-10 pb-20">

        {/* ── STEP 1: 훅 ── */}
        {step === 1 && (
          <div className="flex flex-col items-center text-center pt-8">
            <span className="inline-block bg-orange-light text-orange-brand text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-wide">
              무료 보장가치 진단
            </span>
            <h1 className="text-[28px] sm:text-[34px] font-extrabold text-ink leading-tight mb-4 text-balance">
              2010년에 가입한 사망보장 1억,<br />
              <span className="text-orange-brand">지금 가치로 얼마일까요?</span>
            </h1>
            <p className="text-[16px] text-ink-2 leading-relaxed mb-10">
              물가가 오르는 동안 보험금은 그대로였습니다.<br />
              30초면 내 보장의 진짜 가치를 확인할 수 있습니다.
            </p>
            <button
              onClick={() => setStep(2)}
              className="w-full max-w-xs bg-orange-brand text-white py-4 rounded-2xl font-bold text-[18px] shadow-cta hover:bg-orange-hover transition-colors"
            >
              30초 진단 시작
            </button>
            <p className="mt-5 text-[13px] text-ink-2/60">무료 · 개인정보 없이 확인</p>
          </div>
        )}

        {/* ── STEP 2: 입력 ── */}
        {step === 2 && (
          <div className="pt-4">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-[14px] text-ink-2 mb-8 hover:text-ink transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              처음으로
            </button>

            <h2 className="text-[24px] font-extrabold text-ink mb-1">언제 가입하셨나요?</h2>
            <p className="text-[15px] text-ink-2 mb-6">가입 연도와 사망보장 금액을 선택해주세요.</p>

            <div className="mb-8">
              <label className="block text-[15px] font-semibold text-ink mb-3">가입 연도</label>
              <select
                value={joinYear}
                onChange={(e) => setJoinYear(Number(e.target.value))}
                className="w-full px-4 py-3.5 border border-border rounded-2xl text-[16px] text-ink focus:outline-none focus:ring-2 focus:ring-orange-brand/30 focus:border-orange-brand transition-all bg-white"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}년</option>
                ))}
              </select>
            </div>

            <div className="mb-10">
              <label className="block text-[15px] font-semibold text-ink mb-3">사망보장 금액</label>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {AMOUNT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => { setAmount(opt.value); setUseCustom(false) }}
                    className={`py-3 rounded-2xl text-[15px] font-semibold border-2 transition-all ${
                      !useCustom && amount === opt.value
                        ? 'bg-orange-brand text-white border-orange-brand'
                        : 'bg-white text-ink-2 border-border hover:border-orange-brand'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div
                onClick={() => setUseCustom(true)}
                className={`flex items-center gap-3 border-2 rounded-2xl px-4 py-3 cursor-text transition-all ${
                  useCustom ? 'border-orange-brand' : 'border-border'
                }`}
              >
                <span className="text-[14px] text-ink-2 whitespace-nowrap">직접 입력</span>
                <input
                  type="number"
                  placeholder="금액 (만원 단위)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  onFocus={() => setUseCustom(true)}
                  className="flex-1 text-[16px] text-ink focus:outline-none bg-transparent"
                />
                <span className="text-[14px] text-ink-2">만원</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!useCustom && !amount) return
                if (useCustom && !customAmount) return
                setStep(3)
              }}
              disabled={useCustom ? !customAmount : !amount}
              className="w-full bg-ink text-white py-4 rounded-2xl font-bold text-[17px] hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              진단 결과 보기
            </button>
          </div>
        )}

        {/* ── STEP 3: 결과 ── */}
        {step === 3 && result && (
          <div className="pt-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1 text-[14px] text-ink-2 mb-8 hover:text-ink transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              수정하기
            </button>

            <div className="bg-surface rounded-3xl p-6 mb-6">
              <p className="text-[14px] text-ink-2 mb-2">{joinYear}년에 가입한 {formatKRW(finalAmount)}</p>
              <div className="mb-1">
                <p className="text-[13px] text-ink-2/70 mb-0.5">오늘의 실질 가치</p>
                <p className="text-[36px] font-extrabold text-orange-brand leading-tight">
                  {formatKRW(result.currentValue)}
                </p>
              </div>
              <p className="text-[14px] text-ink-2 mt-3">
                20년 뒤에는 <strong className="text-ink">{formatKRW(result.futureValue)}</strong>
              </p>
              {result.lossRate > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-[13px] font-semibold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                  실질 구매력 {result.lossRate}% 감소
                </div>
              )}
            </div>

            <InflationChart />

            <p className="text-[15px] text-ink-2 leading-relaxed mt-6 mb-6">
              보장금액은 그대로인데, 그 가치는 매년 줄어들고 있습니다.
            </p>

            <div className="bg-orange-light rounded-2xl p-5 mb-8">
              <p className="text-[14px] text-ink leading-relaxed">
                이 문제 때문에 시간이 지날수록 보장금액이 커지는 <strong>'체증형'</strong> 구조가 존재합니다.
                내 상황에 맞는지는 현재 보험 점검과 함께 확인이 필요합니다.
              </p>
            </div>

            <button
              onClick={() => setStep(4)}
              className="w-full bg-orange-brand text-white py-4 rounded-2xl font-bold text-[17px] shadow-cta hover:bg-orange-hover transition-colors"
            >
              내 보험도 점검받기
            </button>

            <p className="text-[12px] text-ink-2/50 text-center mt-4 leading-relaxed">
              통계청 소비자물가지수 기반 참고용 계산 (연 2.5% 기준)<br />
              실제 수령 금액과 다를 수 있습니다.
            </p>
          </div>
        )}

        {/* ── STEP 4: 상담 신청 ── */}
        {step === 4 && (
          <div className="pt-4">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1 text-[14px] text-ink-2 mb-8 hover:text-ink transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              결과 다시보기
            </button>

            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-[22px] font-extrabold text-ink mb-3">신청 완료!</h3>
                <p className="text-[16px] text-ink-2 leading-relaxed mb-2">
                  {form.name}님, 24시간 내에 연락드립니다.
                </p>
                <p className="text-[15px] text-ink-2">연락처: <strong className="text-ink">{form.phone}</strong></p>

                <div className="mt-10 p-5 bg-surface rounded-2xl text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center flex-shrink-0">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-ink text-[15px]">한기현 설계사</p>
                      <p className="text-[13px] text-ink-2">우수인증 설계사/대리점 · 인증번호 2026-26071</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-[24px] font-extrabold text-ink mb-2">내 보험도 이런 상태인지 점검받기</h2>
                <p className="text-[15px] text-ink-2 mb-8">현재 가입 현황을 함께 보면 더 정확하게 진단해드릴 수 있습니다.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[15px] font-semibold text-ink mb-2">이름 <span className="text-orange-brand">*</span></label>
                    <input
                      type="text"
                      placeholder="이름"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3.5 text-[16px] border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-all placeholder:text-ink-2/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[15px] font-semibold text-ink mb-2">연락처 <span className="text-orange-brand">*</span></label>
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-3.5 text-[16px] border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-all placeholder:text-ink-2/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[15px] font-semibold text-ink mb-3">통화 가능 시간 <span className="text-orange-brand">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {TIME_OPTIONS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, preferred_time: t }))}
                          className={`px-4 py-2.5 rounded-xl text-[15px] font-semibold border-2 transition-all ${
                            form.preferred_time === t
                              ? 'bg-ink text-white border-ink'
                              : 'bg-white text-ink-2 border-border hover:border-ink'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 개인정보 동의 */}
                  <div className="flex items-start gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setPrivacy((p) => !p)}
                      className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                        privacy ? 'bg-ink border-ink' : 'bg-white border-border'
                      }`}
                    >
                      {privacy && (
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                          <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <label className="text-[14px] text-ink-2 leading-relaxed cursor-pointer" onClick={() => setPrivacy((p) => !p)}>
                      <span className="text-orange-brand font-bold">[필수]</span>{' '}
                      개인정보 수집·이용에 동의합니다.{' '}
                      <Link href="/privacy" target="_blank" className="text-ink underline font-semibold hover:no-underline">
                        처리방침 보기
                      </Link>
                    </label>
                  </div>

                  {formError && (
                    <div className="text-[14px] text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-2xl">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full bg-orange-brand text-white py-4 rounded-2xl font-bold text-[17px] hover:bg-orange-hover transition-colors disabled:opacity-60 shadow-cta"
                  >
                    {formStatus === 'loading' ? '신청 중...' : '무료 점검 신청하기'}
                  </button>

                  {formStatus === 'error' && (
                    <p className="text-[14px] text-red-600 text-center">오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
                  )}
                </form>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
