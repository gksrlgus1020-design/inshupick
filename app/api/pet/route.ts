import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendTelegramNotification, formatPetMessage } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, phone,
      pet_type, pet_breed, pet_age, pet_medical_history,
      utm_source, utm_medium, utm_campaign, utm_content,
    } = body

    if (!name || !phone || !pet_type || !pet_age || !pet_medical_history) {
      return NextResponse.json({ error: '필수 항목 누락' }, { status: 400 })
    }

    const phoneClean = phone.replace(/\D/g, '')
    if (phoneClean.length < 10 || phoneClean.length > 11) {
      return NextResponse.json({ error: '연락처를 확인해주세요.' }, { status: 400 })
    }

    const petInfo = [
      `종류: ${pet_type}`,
      pet_breed ? `품종: ${pet_breed}` : null,
      `나이: ${pet_age}`,
      `병력: ${pet_medical_history}`,
    ].filter(Boolean).join(' | ')

    const supabase = createServiceClient()

    const { error } = await supabase.from('consultations').insert({
      name: name.trim(),
      phone: phone.trim(),
      interest: `펫보험 (${pet_type})`,
      preferred_time: '상담 후 결정',
      message: petInfo,
      status: '신규',
      source: 'pet',
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
      formatPetMessage({
        name, phone, pet_type, pet_breed, pet_age,
        pet_medical_history, utm_source, utm_campaign,
      })
    )

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
