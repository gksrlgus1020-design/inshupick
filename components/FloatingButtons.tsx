'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function FloatingButtons() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <>
          {/* 전화 */}
          <a
            href="tel:010-0000-0000"
            className="flex items-center gap-2 bg-white text-[#0A2540] px-4 py-2.5 rounded-full shadow-lg text-sm font-bold border border-gray-100 hover:bg-gray-50 transition-all animate-fade-in"
          >
            📞 전화 상담
          </a>
          {/* 카카오 */}
          <a
            href="https://pf.kakao.com/_jYxaPX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] px-4 py-2.5 rounded-full shadow-lg text-sm font-bold hover:bg-yellow-300 transition-all animate-fade-in"
          >
            💬 카카오 상담
          </a>
          {/* 상담 신청 */}
          <Link
            href="/consult"
            className="flex items-center gap-2 bg-[#0A2540] text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-bold hover:bg-[#103060] transition-all animate-fade-in"
          >
            📋 상담 신청
          </Link>
        </>
      )}

      {/* 메인 FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#E8600A] text-white rounded-full shadow-xl flex items-center justify-center text-2xl hover:bg-[#C04E08] transition-all active:scale-95"
        aria-label="상담하기"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
