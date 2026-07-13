-- 마이그레이션: 진단 퍼널 필드 추가
-- Supabase 대시보드 > SQL Editor에서 실행하세요
-- 기존 데이터·컬럼은 그대로 유지됩니다

ALTER TABLE public.consultations
  ADD COLUMN IF NOT EXISTS source           text,
  ADD COLUMN IF NOT EXISTS diagnosis_year   integer,
  ADD COLUMN IF NOT EXISTS diagnosis_amount bigint,
  ADD COLUMN IF NOT EXISTS current_value    bigint,
  ADD COLUMN IF NOT EXISTS future_value     bigint,
  ADD COLUMN IF NOT EXISTS utm_source       text,
  ADD COLUMN IF NOT EXISTS utm_medium       text,
  ADD COLUMN IF NOT EXISTS utm_campaign     text,
  ADD COLUMN IF NOT EXISTS utm_content      text;
