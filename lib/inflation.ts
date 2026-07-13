// 통계청 소비자물가지수 기반 장기 평균 근사치
// config에서 조정 가능
export const INFLATION_RATE = 0.025
export const CURRENT_YEAR = new Date().getFullYear()

export interface DiagnosisResult {
  originalAmount: number
  currentValue: number
  futureValue: number
  elapsedYears: number
  lossRate: number // 현재 기준 실질 손실 비율 (%)
}

/**
 * 가입 당시 보험금의 현재·미래 실질가치 계산
 * 출처: 통계청 소비자물가지수 장기 평균 근사치 (연 2.5%)
 */
export function calculate(amount: number, joinYear: number): DiagnosisResult {
  const elapsed = CURRENT_YEAR - joinYear
  const currentValue = Math.round(amount / Math.pow(1 + INFLATION_RATE, elapsed))
  const futureValue = Math.round(amount / Math.pow(1 + INFLATION_RATE, elapsed + 20))
  const lossRate = Math.round((1 - currentValue / amount) * 100)

  return {
    originalAmount: amount,
    currentValue,
    futureValue,
    elapsedYears: elapsed,
    lossRate,
  }
}

export function formatKRW(n: number): string {
  if (n >= 100_000_000) {
    const uk = n / 100_000_000
    const man = (n % 100_000_000) / 10_000
    if (man === 0) return `${uk}억 원`
    return `${uk}억 ${man.toLocaleString('ko-KR')}만 원`
  }
  if (n >= 10_000) {
    return `약 ${Math.round(n / 10_000).toLocaleString('ko-KR')}만 원`
  }
  return `${n.toLocaleString('ko-KR')} 원`
}
