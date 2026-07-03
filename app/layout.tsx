import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://inshupick.kr'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '인슈픽 | 보험 비교·상담 전문',
    template: '%s | 인슈픽',
  },
  description: '생명·건강·자동차·연금·암보험 전문 설계사가 1:1로 무료 상담해드립니다. 여러 보험사 상품을 한 번에 비교하세요.',
  keywords: ['보험 상담', '보험 비교', '생명보험', '건강보험', '암보험', '연금보험', '자동차보험', '보험설계사', '무료상담'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '인슈픽',
    title: '인슈픽 | 보험 비교·상담 전문',
    description: 'GA 소속 전문 설계사가 1:1로 무료 보험 상담을 도와드립니다.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '인슈픽' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '인슈픽 | 보험 비교·상담 전문',
    description: 'GA 소속 전문 설계사가 1:1로 무료 보험 상담을 도와드립니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  )
}
