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

    const baseRow = {
      name: name.trim(),
      phone: phone.trim(),
      interest: `펫보험 (${pet_type})`,
      preferred_time: '상담 후 결정',
      message: petInfo,
      status: '신규',
    }

    // 전체 컬럼 시도 → 실패 시 기본 컬럼만 재시도 (마이그레이션 미적용 환경 대비)
    const { error: e1 } = await supabase.from('consultations').insert({
      ...baseRow,
      source: 'pet',
      utm_source: utm_source ?? null,
      utm_medium: utm_medium ?? null,
      utm_campaign: utm_campaign ?? null,
      utm_content: utm_content ?? null,
    })
    if (e1) {
      console.warn('Full insert failed, retrying with base columns:', e1.message)
      const { error: e2 } = await supabase.from('consultations').insert(baseRow)
      if (e2) console.error('Base insert also failed:', e2.message)
    }

    // 텔레그램은 DB와 무관하게 항상 시도
    await sendTelegramNotification(
      formatPetMessage({
        name, phone, pet_type, pet_breed, pet_age,
        pet_medical_history, utm_source, utm_campaign,
      })
    )

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    // 서버 오류도 클라이언트엔 성공으로 반환 (텔레그램이 이미 발송됐을 수 있음)
    return NextResponse.json({ success: true })
  }
}
