import { InsuranceProduct } from '@/types'

export const products: InsuranceProduct[] = [
  {
    slug: 'samsung-life-whole',
    category: 'life',
    company: '삼성생명',
    name: '삼성생명 종신보험',
    tagline: '가족을 지키는 평생 보장, 사망부터 후유장해까지',
    badge: 'BEST',
    refundRate: '상담 후 안내',
    monthlyPremium: '개인별 상이',
    features: [
      '사망 및 고도후유장해 보장',
      '3대 질병 진단 시 납입 면제',
      '평생 보장 구조로 설계 가능',
    ],
    refundTable: [],
    coverages: [
      { label: '사망보험금', value: '가입금액 기준' },
      { label: '고도후유장해', value: '가입금액 기준' },
      { label: '재해사망 추가보장', value: '약관 기준' },
    ],
    cautions: [
      '이 보험은 예금자보호법에 따라 보호됩니다.',
      '보험계약 전 상품설명서 및 약관을 반드시 확인하세요.',
      '보험료는 나이·성별·납입기간에 따라 달라집니다.',
      '중도해지 시 환급금이 납입보험료보다 적을 수 있습니다.',
    ],
    order: 1,
  },
  {
    slug: 'kyobo-cancer',
    category: 'cancer',
    company: '교보생명',
    name: '교보생명 암보험',
    tagline: '일반암부터 소액암까지 폭넓은 진단비 보장',
    badge: 'HOT',
    refundRate: '상담 후 안내',
    monthlyPremium: '개인별 상이',
    features: [
      '일반암·소액암 진단비 보장',
      '암 수술 및 입원 치료비 지원',
      '암 진단 후 납입 면제 가능',
    ],
    refundTable: [],
    coverages: [
      { label: '일반암 진단비', value: '약관 기준' },
      { label: '소액암 진단비', value: '약관 기준' },
      { label: '암 수술비', value: '약관 기준' },
      { label: '암 입원일당', value: '약관 기준' },
    ],
    cautions: [
      '이 보험은 예금자보호법에 따라 보호됩니다.',
      '암 진단 확정일 기준으로 보험금 청구 기간이 정해집니다.',
      '기존 암 병력이 있는 경우 가입이 제한될 수 있습니다.',
      '보험료는 나이·성별·납입기간에 따라 달라집니다.',
    ],
    order: 2,
  },
  {
    slug: 'hanwha-annuity',
    category: 'annuity',
    company: '한화생명',
    name: '한화생명 연금보험',
    tagline: '노후 걱정 없는 평생 연금, 지금 시작하세요',
    badge: 'NEW',
    refundRate: '상담 후 안내',
    monthlyPremium: '개인별 상이',
    features: [
      '은퇴 후 평생 연금 수령 가능',
      '납입 보험료 기준 환급 설계 가능',
      '사망 시 적립금 유족 지급',
    ],
    refundTable: [],
    coverages: [
      { label: '연금 수령 시작', value: '계약 시 지정' },
      { label: '연금 지급 기간', value: '평생 또는 확정기간' },
      { label: '사망 시 환급', value: '약관 기준' },
    ],
    cautions: [
      '이 보험은 예금자보호법에 따라 보호됩니다.',
      '연금 개시 전 해지 시 환급금이 납입보험료보다 적을 수 있습니다.',
      '연금 개시 나이 및 수령 방법은 계약 시 지정합니다.',
      '세제 혜택은 세법에 따라 변경될 수 있습니다.',
    ],
    order: 3,
  },
]

export function getProductBySlug(slug: string): InsuranceProduct | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): InsuranceProduct[] {
  return products.filter((p) => p.category === category).sort((a, b) => a.order - b.order)
}

export function getFeaturedProducts(): InsuranceProduct[] {
  return [...products].sort((a, b) => a.order - b.order)
}
