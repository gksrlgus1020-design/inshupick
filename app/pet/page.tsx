'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type PetType = '강아지' | '고양이' | null
type PetAge = '1살 미만' | '1~3살' | '4~6살' | '7살 이상' | null
type Medical = '없음' | '있음' | null

const AGE_OPTIONS: PetAge[] = ['1살 미만', '1~3살', '4~6살', '7살 이상']

function formatPhone(v: string) {
  const n = v.replace(/\D/g, '').slice(0, 11)
  if (n.length <= 3) return n
  if (n.length <= 7) return `${n.slice(0, 3)}-${n.slice(3)}`
  return `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7)}`
}

export default function PetPage() {
  const formRef = useRef<HTMLDivElement>(null)

  const [petType, setPetType] = useState<PetType>(null)
  const [petBreed, setPetBreed] = useState('')
  const [petAge, setPetAge] = useState<PetAge>(null)
  const [medical, setMedical] = useState<Medical>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [utms, setUtms] = useState<Record<string, string>>({})

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
    const obj: Record<string, string> = {}
    keys.forEach((k) => { if (p.get(k)) obj[k] = p.get(k)! })
    setUtms(obj)
  }, [])

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!petType) { setErrorMsg('반려동물 종류를 선택해주세요.'); return }
    if (!petAge) { setErrorMsg('나이를 선택해주세요.'); return }
    if (!medical) { setErrorMsg('병력 여부를 선택해주세요.'); return }
    if (!name.trim()) { setErrorMsg('보호자 이름을 입력해주세요.'); return }
    if (phone.replace(/\D/g, '').length < 10) { setErrorMsg('연락처를 확인해주세요.'); return }
    if (!agreed) { setErrorMsg('개인정보 수집·이용에 동의해주세요.'); return }

    setSubmitting(true)
    try {
      const res = await fetch('/api/pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          pet_type: petType,
          pet_breed: petBreed.trim() || null,
          pet_age: petAge,
          pet_medical_history: medical,
          ...utms,
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        setErrorMsg(d.error || '오류가 발생했습니다. 다시 시도해주세요.')
        return
      }
      setSubmitted(true)
      if (typeof window !== 'undefined' && (window as any).fbq) {
        ;(window as any).fbq('track', 'Lead')
      }
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased">

      {/* ── 미니멀 헤더 ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto px-5 flex items-center h-[56px]">
          <Link href="/" className="font-extrabold text-[20px] tracking-tight text-ink">
            인슈<span className="text-orange-brand">픽</span>
          </Link>
        </div>
      </header>

      {/* ── 히어로 ── */}
      <section className="bg-ink px-5 pt-14 pb-16">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-[28px] mb-4">🐾</p>
          <h1 className="text-[28px] sm:text-[34px] font-extrabold text-white leading-tight mb-4 text-balance">
            반려동물 치료비가<br />
            수백만 원이 될 수 있습니다
          </h1>
          <p className="text-[16px] text-white/65 leading-relaxed mb-8">
            강아지·고양이 펫보험, 건강할 때만 준비할 수 있습니다.<br />
            지금 무료로 상담받아 보세요.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-block bg-orange-brand text-white px-8 py-4 rounded-2xl font-bold text-[17px] shadow-cta hover:bg-orange-hover transition-colors w-full sm:w-auto"
          >
            무료 상담 신청하기 →
          </button>
        </div>
      </section>

      {/* ── 통계 바 ── */}
      <section className="bg-surface border-y border-border px-5 py-6">
        <div className="max-w-lg mx-auto grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-[22px] font-extrabold text-orange-brand">3.2%</p>
            <p className="text-[13px] text-ink-2 mt-0.5 leading-snug">국내 펫보험 가입률<br /><span className="text-[11px] text-ink-2/60">(보험연구원, 2025년 말 기준)</span></p>
          </div>
          <div>
            <p className="text-[22px] font-extrabold text-orange-brand">+61%</p>
            <p className="text-[13px] text-ink-2 mt-0.5 leading-snug">원수보험료 전년 대비 성장<br /><span className="text-[11px] text-ink-2/60">(보험연구원, 2025년)</span></p>
          </div>
        </div>
      </section>

      {/* ── 치료비 현실 ── */}
      <section className="px-5 py-14 bg-white">
        <div className="max-w-lg mx-auto">
          <p className="text-[13px] font-bold tracking-widest text-orange-brand uppercase mb-2">REALITY</p>
          <h2 className="text-[22px] font-extrabold text-ink mb-2 text-balance">
            중증 치료, 생각보다 큰 비용입니다
          </h2>
          <p className="text-[15px] text-ink-2 mb-8 leading-relaxed">
            검사, 입원, 약제, 수술이 복합되면 고액의 치료비가 발생할 수 있습니다.
          </p>

          <div className="space-y-4">
            {[
              { icon: '❤️', title: '심장질환', desc: '심장사상충, 심근병증 등 만성 심장질환은 정기 검사와 약제 비용이 지속 발생할 수 있습니다.' },
              { icon: '🔬', title: '종양·암', desc: '조직 검사, 항암 치료, 수술이 병행될 경우 단기간에 큰 비용이 집중될 수 있습니다.' },
              { icon: '🦴', title: '골절·수술', desc: '슬개골 탈구, 십자인대 파열 등 외과적 수술은 입원비를 포함해 고액이 될 수 있습니다.' },
            ].map((c) => (
              <div key={c.title} className="bg-surface rounded-2xl p-5 flex gap-4 items-start">
                <span className="text-[24px] mt-0.5">{c.icon}</span>
                <div>
                  <p className="font-bold text-ink text-[15px] mb-1">{c.title}</p>
                  <p className="text-[14px] text-ink-2 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 건강할 때만 ── */}
      <section className="px-5 py-14 bg-ink">
        <div className="max-w-lg mx-auto">
          <p className="text-[13px] font-bold tracking-widest text-orange-brand uppercase mb-2">TIMING</p>
          <h2 className="text-[22px] font-extrabold text-white mb-6 text-balance">
            가입은 건강할 때만 가능합니다
          </h2>
          <div className="space-y-4">
            {[
              { point: '병력이 생기면 가입이 거절될 수 있습니다', detail: '진단받은 질병이 있으면 해당 담보의 보장이 제한되거나 가입 자체가 거절될 수 있습니다.' },
              { point: '나이가 들수록 보험료가 올라갑니다', detail: '대부분의 펫보험은 연령에 따라 보험료가 증가하며, 가입 가능 연령에 제한이 있습니다.' },
              { point: '새 면책기간이 적용될 수 있습니다', detail: '가입 후 일정 기간 동안은 보장이 적용되지 않을 수 있으므로, 미리 준비하는 것이 중요합니다.' },
            ].map((item) => (
              <div key={item.point} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-orange-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-orange-brand" />
                </div>
                <div>
                  <p className="font-bold text-white text-[15px] mb-0.5">{item.point}</p>
                  <p className="text-[13px] text-white/50 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 신청 폼 ── */}
      <section ref={formRef} className="px-5 py-14 bg-white">
        <div className="max-w-lg mx-auto">
          <p className="text-[13px] font-bold tracking-widest text-orange-brand uppercase mb-2">CONSULT</p>
          <h2 className="text-[22px] font-extrabold text-ink mb-1">무료 상담 신청</h2>
          <p className="text-[14px] text-ink-2 mb-8">필수 정보만 입력하시면 담당 설계사가 직접 연락드립니다.</p>

          {submitted ? (
            <div className="text-center py-12">
              <p className="text-[40px] mb-4">🐾</p>
              <h3 className="text-[22px] font-extrabold text-ink mb-2">신청이 완료됐습니다!</h3>
              <p className="text-[15px] text-ink-2 leading-relaxed">
                빠른 시일 내에 설계사가 직접 연락드리겠습니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7" noValidate>

              {/* 반려동물 종류 */}
              <div>
                <label className="block text-[15px] font-bold text-ink mb-3">
                  반려동물 종류 <span className="text-orange-brand">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['강아지', '고양이'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPetType(t)}
                      className={`py-4 rounded-2xl font-bold text-[16px] border-2 transition-all ${
                        petType === t
                          ? 'bg-ink text-white border-ink'
                          : 'bg-white text-ink border-border hover:border-ink/30'
                      }`}
                    >
                      {t === '강아지' ? '🐕 강아지' : '🐈 고양이'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 품종 */}
              <div>
                <label className="block text-[15px] font-bold text-ink mb-2">
                  품종 <span className="text-[13px] text-ink-2 font-normal">(선택사항)</span>
                </label>
                <input
                  type="text"
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                  placeholder="예: 말티즈, 페르시안"
                  className="w-full px-4 py-3.5 text-[16px] border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-all placeholder:text-ink-2/40"
                />
              </div>

              {/* 나이 */}
              <div>
                <label className="block text-[15px] font-bold text-ink mb-3">
                  나이 <span className="text-orange-brand">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {AGE_OPTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setPetAge(a)}
                      className={`py-3.5 rounded-2xl font-semibold text-[15px] border-2 transition-all ${
                        petAge === a
                          ? 'bg-ink text-white border-ink'
                          : 'bg-white text-ink-2 border-border hover:border-ink/30'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* 병력 */}
              <div>
                <label className="block text-[15px] font-bold text-ink mb-2">
                  진단받은 병력 여부 <span className="text-orange-brand">*</span>
                </label>
                <p className="text-[13px] text-ink-2 mb-3">상담 우선순위 파악을 위한 질문입니다.</p>
                <div className="grid grid-cols-2 gap-3">
                  {(['없음', '있음'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMedical(m)}
                      className={`py-3.5 rounded-2xl font-semibold text-[15px] border-2 transition-all ${
                        medical === m
                          ? 'bg-ink text-white border-ink'
                          : 'bg-white text-ink-2 border-border hover:border-ink/30'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* 보호자 이름 */}
              <div>
                <label className="block text-[15px] font-bold text-ink mb-2">
                  보호자 이름 <span className="text-orange-brand">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                  className="w-full px-4 py-3.5 text-[16px] border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-all placeholder:text-ink-2/40"
                />
              </div>

              {/* 연락처 */}
              <div>
                <label className="block text-[15px] font-bold text-ink mb-2">
                  연락처 <span className="text-orange-brand">*</span>
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3.5 text-[16px] border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-all placeholder:text-ink-2/40"
                />
              </div>

              {/* 동의 */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    agreed ? 'bg-ink border-ink' : 'bg-white border-border'
                  }`}
                  onClick={() => setAgreed(!agreed)}
                >
                  {agreed && (
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <p className="text-[14px] text-ink-2 leading-relaxed">
                  <span className="text-orange-brand font-bold">[필수]</span>{' '}
                  개인정보(이름, 연락처) 수집·이용에 동의합니다. 수집 목적: 보험 상담 신청 접수 및 연락.
                  보유 기간: 상담 완료 후 1년.
                </p>
              </label>

              {errorMsg && (
                <p className="text-[14px] text-red-500 bg-red-50 px-4 py-3 rounded-xl">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-brand text-white py-4.5 rounded-2xl font-bold text-[17px] shadow-cta hover:bg-orange-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ paddingTop: '18px', paddingBottom: '18px' }}
              >
                {submitting ? '신청 중...' : '상담 신청하기'}
              </button>

            </form>
          )}
        </div>
      </section>

      {/* ── 하단 고지 ── */}
      <section className="px-5 py-10 bg-surface border-t border-border">
        <div className="max-w-lg mx-auto space-y-3 text-[12px] text-ink-2/60 leading-relaxed">
          <p>
            본 페이지는 보험 상담 신청 접수를 위한 것이며, 특정 보험사의 상품 판매 페이지가 아닙니다.
            상담 과정에서 상세 내용을 안내드립니다.
          </p>
          <p>
            생명·손해보험협회 등록번호 : 202111-1710-1032 &nbsp;|&nbsp; 영진에셋 보험대리점 등록번호 : 2005058036
          </p>
          <p>
            보험계약자가 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서 질병이력, 연령증가 등으로
            가입 가능한 담보와 가입금액, 보험료는 달라질 수 있습니다. 가입 상품에 따라 새로운 면책기간 적용 및
            보장 제한 등 기타 불이익이 발생할 수 있습니다. 내부 심사기준에 따라 가입이 거절될 수 있습니다.
          </p>
          <p>
            상기 내용은 모집종사자 개인의 의견이며, 계약 체결에 따른 이익 또는 손실은 보험 계약자 등에게 귀속됩니다.
            보다 자세한 내용은 보험약관 및 상품설명서를 반드시 확인하시기 바랍니다.
          </p>
          <p>
            한기현 &nbsp;|&nbsp; 영진에셋 보험대리점 &nbsp;|&nbsp; ☎ 010-9870-9138
          </p>
          <p>
            <Link href="/privacy" className="underline hover:text-ink-2 transition-colors">
              개인정보처리방침
            </Link>
          </p>
        </div>
      </section>

    </div>
  )
}
