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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-[#0A2540] font-black text-xl tracking-tight">
          인슈<span className="text-[#E8600A]">픽</span>
        </Link>

        {/* 데스크탑 nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-600 font-medium hover:text-[#0A2540] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://pf.kakao.com/_jYxaPX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FEE500] text-[#3C1E1E] px-4 py-2 rounded-md text-sm font-bold hover:bg-yellow-300 transition-colors"
          >
            💬 카카오 상담
          </a>
          <Link
            href="/consult"
            className="bg-[#0A2540] text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-[#103060] transition-colors"
          >
            무료상담
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-base text-gray-700 font-medium py-2 border-b border-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/consult"
            className="mt-2 bg-[#E8600A] text-white text-center py-3 rounded-lg font-bold text-base"
            onClick={() => setMenuOpen(false)}
          >
            무료 상담 신청하기
          </Link>
        </div>
      )}
    </header>
  )
}
