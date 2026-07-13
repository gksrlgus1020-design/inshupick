'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function FloatingButtons() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col items-end gap-2 mb-1">
          <a
            href="tel:010-0000-0000"
            className="flex items-center gap-2.5 bg-white text-ink px-5 py-3 rounded-2xl shadow-card-hover text-[15px] font-semibold border border-border hover:border-navy-mid transition-all duration-200 animate-fade-in"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            전화 상담
          </a>
          <a
            href="https://pf.kakao.com/_jYxaPX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#FEE500] text-[#3C1E1E] px-5 py-3 rounded-2xl shadow-card-hover text-[15px] font-semibold hover:bg-yellow-300 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.92 2 11.7c0 2.9 1.63 5.46 4.1 7.07l-1.03 3.84a.5.5 0 00.76.54L9.94 20.7A11.7 11.7 0 0012 21c5.52 0 10-3.92 10-8.3C22 6.92 17.52 3 12 3z" />
            </svg>
            카카오 상담
          </a>
          <Link
            href="/consult"
            className="flex items-center gap-2.5 bg-ink text-white px-5 py-3 rounded-2xl shadow-btn text-[15px] font-semibold hover:bg-navy-light transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
            </svg>
            상담 신청
          </Link>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-orange-brand text-white rounded-full shadow-cta flex items-center justify-center hover:bg-orange-hover transition-all duration-200 active:scale-95"
        aria-label="상담하기"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>
    </div>
  )
}
