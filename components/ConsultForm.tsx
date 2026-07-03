'use client'

import { useState } from 'react'
import Link from 'next/link'
import { INTEREST_OPTIONS, TIME_OPTIONS, ConsultInterest } from '@/types'

interface Props {
  compact?: boolean  // 상품 상세 페이지용 간소화 폼
}

export default function ConsultForm({ compact = false }: Props) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    interest: '' as ConsultInterest | '',
    preferred_time: '',
    message: '',
    privacy: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (key: string, val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone || !form.interest || !form.preferred_time) {
      setErrorMsg('이름, 연락처, 관심 분야, 상담 가능 시간을 모두 입력해주세요.')
      return
    }
    if (!form.privacy) {
      setErrorMsg('개인정보 수집·이용에 동의해주세요.')
      return
    }
    setErrorMsg('')
    setStatus('loading')

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-black text-[#0A2540] mb-2">상담 신청 완료!</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {form.name}님, 24시간 이내에 연락드리겠습니다.<br />
          연락처: <strong>{form.phone}</strong>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="홍길동"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0A2540] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="010-0000-0000"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0A2540] transition-colors"
            />
          </div>
        </div>
      )}

      {compact && (
        <>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">이름 <span className="text-red-500">*</span></label>
            <input type="text" placeholder="홍길동" value={form.name} onChange={(e) => set('name', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0A2540]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">연락처 <span className="text-red-500">*</span></label>
            <input type="tel" placeholder="010-0000-0000" value={form.phone} onChange={(e) => set('phone', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0A2540]" />
          </div>
        </>
      )}

      {/* 관심 분야 */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          관심 분야 <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => set('interest', opt)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                form.interest === opt
                  ? 'bg-[#0A2540] text-white border-[#0A2540]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#0A2540]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 상담 가능 시간 */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          상담 가능 시간 <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => set('preferred_time', opt)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                form.preferred_time === opt
                  ? 'bg-[#E8600A] text-white border-[#E8600A]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#E8600A]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 문의 내용 (선택) */}
      {!compact && (
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">
            문의 내용 <span className="text-gray-400 font-normal">(선택)</span>
          </label>
          <textarea
            rows={3}
            placeholder="궁금하신 내용을 자유롭게 작성해주세요."
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0A2540] resize-none transition-colors"
          />
        </div>
      )}

      {/* 개인정보 동의 */}
      <div className="flex items-start gap-2 pt-1">
        <input
          type="checkbox"
          id="privacy"
          checked={form.privacy}
          onChange={(e) => set('privacy', e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#0A2540]"
        />
        <label htmlFor="privacy" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
          <span className="text-red-500 font-bold">[필수]</span>{' '}
          개인정보 수집·이용에 동의합니다.{' '}
          <Link
            href="/privacy"
            target="_blank"
            className="text-[#0A2540] underline font-semibold"
          >
            처리방침 보기
          </Link>
        </label>
      </div>

      {errorMsg && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#E8600A] text-white py-3.5 rounded-xl font-black text-base hover:bg-[#C04E08] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? '신청 중...' : '무료 상담 신청하기 →'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-500 text-center">오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      )}

    </form>
  )
}
