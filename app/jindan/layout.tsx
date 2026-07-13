import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '보장가치 진단',
  description: '내 사망보험금의 실질 가치를 30초 만에 확인해보세요. 통계청 소비자물가지수 기준 무료 진단.',
}

export default function JindanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-2xl mx-auto px-6 flex items-center h-[60px]">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-ink">
            인슈<span className="text-orange-brand">픽</span>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}
