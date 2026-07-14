import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '펫보험 무료 상담 | 인슈픽',
  description: '강아지·고양이 펫보험, 건강할 때 준비해야 합니다. 지금 무료 상담 신청하세요.',
  robots: { index: false },
}

export default function PetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
