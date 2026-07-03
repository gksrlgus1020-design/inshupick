-- Supabase 테이블 생성 SQL
-- Supabase 대시보드 > SQL Editor에서 실행하세요

create table if not exists public.consultations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  interest text not null,
  preferred_time text not null,
  message text,
  status text not null default '신규'
    check (status in ('신규', '연락완료', '계약', '종료')),
  created_at timestamptz default now() not null
);

-- Row Level Security 활성화
alter table public.consultations enable row level security;

-- 익명 사용자는 INSERT만 가능 (상담 신청)
create policy "allow_insert" on public.consultations
  for insert to anon with check (true);

-- 서비스 롤은 전체 권한 (관리자 API에서 사용)
create policy "allow_service_all" on public.consultations
  for all to service_role using (true) with check (true);

-- 인덱스 (관리자 목록 조회 성능)
create index if not exists consultations_created_at_idx
  on public.consultations (created_at desc);

create index if not exists consultations_status_idx
  on public.consultations (status);
