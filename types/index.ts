export type InsuranceCategory =
  | 'life'       // 생명보험
  | 'health'     // 건강보험
  | 'car'        // 자동차보험
  | 'annuity'    // 연금보험
  | 'cancer'     // 암보험
  | 'combined'   // 종합보험

export interface InsuranceFeature {
  label: string
  value: string
}

export interface RefundRate {
  year: number
  rate: string
}

export interface InsuranceProduct {
  slug: string
  category: InsuranceCategory
  company: string          // 보험사명
  name: string             // 상품명
  tagline: string          // 한 줄 설명
  badge?: 'NEW' | 'BEST' | 'HOT'
  refundRate: string       // 대표 환급률 (예: "최대 105%")
  monthlyPremium: string   // 월 보험료 예시 (예: "월 2만원대~")
  features: string[]       // 주요 특징 3개
  refundTable: RefundRate[] // 환급률 표
  coverages: InsuranceFeature[]  // 보장 항목
  cautions: string[]       // 유의사항
  order: number            // 정렬 순서
}

export interface Consultation {
  id: string
  name: string
  phone: string
  interest: ConsultInterest
  preferred_time: string
  message: string | null
  status: ConsultStatus
  created_at: string
}

export type ConsultInterest = '연금보험' | '종신보험' | '암보험' | '실손보험' | '기타'
export type ConsultStatus = '신규' | '연락완료' | '계약' | '종료'

export const INTEREST_OPTIONS: ConsultInterest[] = ['연금보험', '종신보험', '암보험', '실손보험', '기타']
export const TIME_OPTIONS = ['오전 9-12시', '오후 12-3시', '오후 3-6시', '오후 6-9시', '언제든 가능']
export const STATUS_OPTIONS: ConsultStatus[] = ['신규', '연락완료', '계약', '종료']

export const CATEGORY_LABELS: Record<InsuranceCategory, string> = {
  life: '생명보험',
  health: '건강보험',
  car: '자동차보험',
  annuity: '연금보험',
  cancer: '암보험',
  combined: '종합보험',
}
