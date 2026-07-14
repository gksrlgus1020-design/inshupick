'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/jindan', label: '보장 진단' },
  { href: '/pet', label: '펫보험' },
  { href: '/blog', label: '블로그' },
  { href: '/about', label: '설계사 소개' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[68px]">

        <Link href="/" className="font-extrabold text-2xl tracking-tight text-ink">
          인슈<span className="text-orange-brand">픽</span>
        </Link>

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
          <Link
            href="/jindan"
            className="bg-orange-brand text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-orange-hover transition-colors shadow-btn"
          >
            무료 진단하기
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-ink-2 rounded-lg hover:bg-surface transition-colors"
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

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-5 flex flex-col gap-1">
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
            href="/jindan"
            className="mt-4 bg-orange-brand text-white text-center py-4 rounded-2xl font-bold text-[17px] shadow-cta"
            onClick={() => setMenuOpen(false)}
          >
            무료 진단하기
          </Link>
        </div>
      )}
    </header>
  )
}
