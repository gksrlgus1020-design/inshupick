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
    // 텔레그램 실패는 조용히 처리 (상담 신청 자체는 성공)
  }
}

export function formatConsultMessage(data: {
  name: string
  phone: string
  interest: string
  preferred_time: string
  message?: string
}): string {
  const time = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  return `📋 <b>새 상담 신청</b>

👤 이름: ${data.name}
📞 연락처: ${data.phone}
🔖 관심 분야: ${data.interest}
⏰ 선호 시간: ${data.preferred_time}
💬 문의: ${data.message || '없음'}

🕐 신청 시간: ${time}`
}
