import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendTelegramNotification, formatConsultMessage } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, interest, preferred_time, message } = body

    if (!name || !phone || !interest || !preferred_time) {
      return NextResponse.json({ error: '필수 항목 누락' }, { status: 400 })
    }

    // 전화번호 기본 검증
    const phoneClean = phone.replace(/\D/g, '')
    if (phoneClean.length < 10 || phoneClean.length > 11) {
      return NextResponse.json({ error: '연락처를 확인해주세요.' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { error } = await supabase.from('consultations').insert({
      name: name.trim(),
      phone: phone.trim(),
      interest,
      preferred_time,
      message: message?.trim() || null,
      status: '신규',
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'DB 저장 실패' }, { status: 500 })
    }

    // 텔레그램 알림 (실패해도 응답에 영향 없음)
    await sendTelegramNotification(formatConsultMessage({ name, phone, interest, preferred_time, message }))

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
