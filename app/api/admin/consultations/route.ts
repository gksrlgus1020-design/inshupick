import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

function checkAuth(req: NextRequest): boolean {
  const pw = req.headers.get('x-admin-password')
  return pw === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: 'DB 오류' }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, status } = await req.json()
  if (!id || !status) return NextResponse.json({ error: '필수 항목 누락' }, { status: 400 })

  const supabase = createServiceClient()
  const { error } = await supabase.from('consultations').update({ status }).eq('id', id)

  if (error) return NextResponse.json({ error: 'DB 오류' }, { status: 500 })
  return NextResponse.json({ success: true })
}
