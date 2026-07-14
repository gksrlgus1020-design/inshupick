import { formatKRW } from './inflation'

export function formatPetMessage(data: {
  name: string
  phone: string
  pet_type: string
  pet_breed?: string | null
  pet_age: string
  pet_medical_history: string
  utm_source?: string | null
  utm_campaign?: string | null
}): string {
  const time = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const icon = data.pet_type === '강아지' ? '🐕' : '🐈'
  const breedLine = data.pet_breed ? ` (${data.pet_breed})` : ''
  const utmLine =
    data.utm_source || data.utm_campaign
      ? `\n📣 utm: ${[data.utm_source, data.utm_campaign].filter(Boolean).join(' / ')}`
      : ''

  return `🐾 <b>[펫보험] 새 상담 신청</b>

👤 보호자: ${data.name}
📞 연락처: ${data.phone}
${icon} 반려동물: ${data.pet_type}${breedLine}
📅 나이: ${data.pet_age}
🏥 병력: ${data.pet_medical_history}${utmLine}

🕐 신청 시간: ${time}`
}

export async function sendTelegramNotification(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
  } catch {
    // 텔레그램 실패는 조용히 처리
  }
}

export function formatConsultMessage(data: {
  name: string
  phone: string
  interest?: string
  preferred_time: string
  message?: string
  source?: string
  diagnosis_year?: number
  diagnosis_amount?: number
  current_value?: number
  utm_source?: string
  utm_campaign?: string
}): string {
  const time = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const sourceLabel = data.source === 'jindan' ? '진단 유입' : '직접 신청'

  let diagLine = ''
  if (data.diagnosis_year && data.diagnosis_amount) {
    diagLine = `\n💰 진단: ${data.diagnosis_year}년 가입 / ${formatKRW(data.diagnosis_amount)}`
    if (data.current_value) diagLine += ` / 현재가치 ${formatKRW(data.current_value)}`
  }

  let utmLine = ''
  if (data.utm_source || data.utm_campaign) {
    utmLine = `\n📣 utm: ${[data.utm_source, data.utm_campaign].filter(Boolean).join(' / ')}`
  }

  return `📋 <b>새 상담 신청</b> [${sourceLabel}]

👤 이름: ${data.name}
📞 연락처: ${data.phone}
⏰ 통화 가능: ${data.preferred_time}
🔖 관심: ${data.interest ?? '보장가치 진단'}${diagLine}${utmLine}
💬 메모: ${data.message || '없음'}

🕐 신청 시간: ${time}`
}
