import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import MetaPixel from '@/components/MetaPixel'
import { SITE_URL } from '@/lib/site-config'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '인슈픽 | 내 보험을 숫자로 진단하는 곳',
    template: '%s | 인슈픽',
  },
  description: '2010년의 1억과 지금의 1억은 다릅니다. 내 사망보장의 진짜 가치, 30초면 확인됩니다.',
  keywords: ['보장가치 진단', '보험 진단', '사망보험금', '체증형 보험', '보험 상담', '실질가치'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '인슈픽',
    title: '인슈픽 | 내 보험을 숫자로 진단하는 곳',
    description: '내 사망보장의 진짜 가치, 30초면 확인됩니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '인슈픽 | 내 보험을 숫자로 진단하는 곳',
    description: '내 사망보장의 진짜 가치, 30초면 확인됩니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    'naver-site-verification': '4a87b9289e7b30914ec5c1af5e2023f9ca9646b9',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white font-sans antialiased">
        <MetaPixel />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  )
}
