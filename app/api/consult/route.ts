import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendTelegramNotification, formatConsultMessage } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, phone, interest, preferred_time, message,
      source, diagnosis_year, diagnosis_amount, current_value, future_value,
      utm_source, utm_medium, utm_campaign, utm_content,
    } = body

    if (!name || !phone || !preferred_time) {
      return NextResponse.json({ error: '필수 항목 누락' }, { status: 400 })
    }

    const phoneClean = phone.replace(/\D/g, '')
    if (phoneClean.length < 10 || phoneClean.length > 11) {
      return NextResponse.json({ error: '연락처를 확인해주세요.' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { error } = await supabase.from('consultations').insert({
      name: name.trim(),
      phone: phone.trim(),
      interest: interest ?? '보장가치 진단',
      preferred_time,
      message: message?.trim() || null,
      status: '신규',
      source: source ?? null,
      diagnosis_year: diagnosis_year ?? null,
      diagnosis_amount: diagnosis_amount ?? null,
      current_value: current_value ?? null,
      future_value: future_value ?? null,
      utm_source: utm_source ?? null,
      utm_medium: utm_medium ?? null,
      utm_campaign: utm_campaign ?? null,
      utm_content: utm_content ?? null,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'DB 저장 실패' }, { status: 500 })
    }

    await sendTelegramNotification(
      formatConsultMessage({ name, phone, interest, preferred_time, message,
        source, diagnosis_year, diagnosis_amount, current_value, utm_source, utm_campaign })
    )

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
