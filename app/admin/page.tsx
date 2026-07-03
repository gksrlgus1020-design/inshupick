'use client'

import { useState, useEffect, useCallback } from 'react'
import { Consultation, STATUS_OPTIONS, ConsultStatus } from '@/types'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [data, setData] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<ConsultStatus | 'all'>('all')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/consultations', {
        headers: { 'x-admin-password': password },
      })
      if (!res.ok) throw new Error()
      const json = await res.json()
      setData(json.data)
    } catch {
      setAuthed(false)
    } finally {
      setLoading(false)
    }
  }, [password])

  useEffect(() => {
    if (authed) fetchData()
  }, [authed, fetchData])

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    setAuthError(false)
    const res = await fetch('/api/admin/consultations', {
      headers: { 'x-admin-password': password },
    })
    if (res.ok) {
      setAuthed(true)
    } else {
      setAuthError(true)
    }
  }

  async function updateStatus(id: string, status: ConsultStatus) {
    await fetch('/api/admin/consultations', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ id, status }),
    })
    setData((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)))
  }

  const STATUS_COLORS: Record<ConsultStatus, string> = {
    '신규': 'bg-blue-100 text-blue-700',
    '연락완료': 'bg-yellow-100 text-yellow-700',
    '계약': 'bg-green-100 text-green-700',
    '종료': 'bg-gray-100 text-gray-500',
  }

  const filtered = filter === 'all' ? data : data.filter((c) => c.status === filter)

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F4F7FF] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
          <h1 className="text-xl font-black text-[#0A2540] mb-6 text-center">관리자 로그인</h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0A2540]"
            />
            {authError && <p className="text-red-500 text-sm text-center">비밀번호가 틀렸습니다.</p>}
            <button type="submit" className="w-full bg-[#0A2540] text-white py-3 rounded-xl font-bold text-sm">
              로그인
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#F4F7FF] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-black text-[#0A2540]">상담 신청 관리</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">총 {data.length}건</span>
            <button onClick={fetchData} className="text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50">
              새로고침
            </button>
          </div>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {(['all', ...STATUS_OPTIONS] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                filter === s ? 'bg-[#0A2540] text-white' : 'bg-white text-gray-500 border border-gray-200'
              }`}
            >
              {s === 'all' ? '전체' : s}
              {s !== 'all' && (
                <span className="ml-1.5 text-xs opacity-70">
                  {data.filter((c) => c.status === s).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">불러오는 중...</div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* 데스크탑 테이블 */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F4F7FF] border-b border-gray-100">
                  <tr>
                    {['신청 시간', '이름', '연락처', '관심 분야', '상담 시간대', '문의', '상태'].map((h) => (
                      <th key={h} className="py-3 px-4 text-left font-bold text-gray-600 text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-gray-400 tabular-nums whitespace-nowrap">
                        {new Date(c.created_at).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#0A2540]">{c.name}</td>
                      <td className="py-3 px-4">
                        <a href={`tel:${c.phone}`} className="text-[#E8600A] font-semibold hover:underline">{c.phone}</a>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{c.interest}</td>
                      <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{c.preferred_time}</td>
                      <td className="py-3 px-4 text-gray-500 max-w-xs truncate">{c.message || '—'}</td>
                      <td className="py-3 px-4">
                        <select
                          value={c.status}
                          onChange={(e) => updateStatus(c.id, e.target.value as ConsultStatus)}
                          className={`text-xs font-bold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[c.status]}`}
                        >
                          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 모바일 카드 뷰 */}
            <div className="md:hidden divide-y divide-gray-50">
              {filtered.map((c) => (
                <div key={c.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-black text-[#0A2540]">{c.name}</span>
                      <span className="text-gray-400 text-xs ml-2">
                        {new Date(c.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                  <a href={`tel:${c.phone}`} className="text-[#E8600A] font-semibold text-sm">{c.phone}</a>
                  <p className="text-xs text-gray-500 mt-1">{c.interest} · {c.preferred_time}</p>
                  {c.message && <p className="text-xs text-gray-400 mt-1 truncate">{c.message}</p>}
                  <div className="mt-2 flex gap-1.5">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(c.id, s)}
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${
                          c.status === s ? STATUS_COLORS[s] : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">신청 내역이 없습니다.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
