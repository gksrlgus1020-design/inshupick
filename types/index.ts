export interface Consultation {
  id: string
  name: string
  phone: string
  interest: string
  preferred_time: string
  message: string | null
  status: ConsultStatus
  created_at: string
  source?: string | null
  diagnosis_year?: number | null
  diagnosis_amount?: number | null
  current_value?: number | null
  future_value?: number | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
}

export type ConsultStatus = '신규' | '연락완료' | '계약' | '종료'
export const STATUS_OPTIONS: ConsultStatus[] = ['신규', '연락완료', '계약', '종료']

export const TIME_OPTIONS = ['오전 (9-12시)', '오후 (12-6시)', '저녁 (6시 이후)']
