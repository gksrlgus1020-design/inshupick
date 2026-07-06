'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/#products', label: '상품안내' },
  { href: '/#why', label: '이용안내' },
  { href: '/consult', label: '상담신청' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-violet-DEFAULT/10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[68px]">

        <Link href="/" className="font-extrabold text-2xl tracking-tight text-ink">
          인슈<span className="bg-gradient-to-r from-violet-DEFAULT to-pink-brand bg-clip-text text-transparent">픽</span>
        </Link>

        {/* 데스크탑 nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] text-ink-2 font-medium hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://pf.kakao.com/_jYxaPX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FEE500] text-[#3C1E1E] px-4 py-2 rounded-xl text-sm font-bold hover:bg-yellow-300 transition-colors"
          >
            카카오 상담
          </a>
          <Link
            href="/consult"
            className="bg-gradient-to-r from-violet-DEFAULT to-violet-mid text-white px-5 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-btn"
          >
            무료상담
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 text-ink-2 rounded-lg hover:bg-violet-light transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-border px-6 py-5 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[17px] text-ink font-medium py-3 border-b border-border last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/consult"
            className="mt-4 bg-gradient-to-r from-violet-DEFAULT to-violet-mid text-white text-center py-4 rounded-2xl font-bold text-[17px]"
            onClick={() => setMenuOpen(false)}
          >
            무료 상담 신청하기
          </Link>
        </div>
      )}
    </header>
  )
}
