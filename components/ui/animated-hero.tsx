'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveRight, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ['안전한', '든든한', '믿을 수 있는', '맞춤형', '합리적인'],
    [],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((n) => (n === titles.length - 1 ? 0 : n + 1))
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <section className="relative bg-gradient-to-br from-[#061828] via-[#0A2540] to-[#103060] text-white overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8600A] opacity-5 rounded-full translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 opacity-5 rounded-full -translate-x-16 translate-y-16" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex gap-6 py-16 lg:py-24 items-center justify-center flex-col">

          {/* 상단 배지 */}
          <div>
            <Button variant="secondary" size="sm" className="gap-2 text-xs font-semibold tracking-wide">
              전문 설계사 1:1 맞춤 상담 <MoveRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* 헤드라인 */}
          <div className="flex gap-3 flex-col items-center">
            <h1 className="text-4xl md:text-6xl max-w-3xl tracking-tight text-center font-black leading-tight">
              <span className="text-blue-100">나에게 꼭 맞는</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 h-[1.2em]">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute text-[#E8600A]"
                    initial={{ opacity: 0, y: -60 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -80 : 80, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span className="text-white">보험을 찾아드립니다</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-blue-200 max-w-2xl text-center mt-2">
              종신·연금·암·실손·치아보험까지, 수십 개 상품을 비교하고
              <br className="hidden md:block" />
              전문 설계사가 내 상황에 맞는 최적의 플랜을 직접 설계해드립니다.
            </p>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-row gap-3 flex-wrap justify-center">
            <Button size="lg" variant="outline" className="gap-2 font-bold" asChild>
              <Link href="/consult">
                <PhoneCall className="w-4 h-4" /> 무료 상담 신청
              </Link>
            </Button>
            <Button size="lg" variant="gold" className="gap-2 font-bold" asChild>
              <Link href="/#products">
                추천 상품 보기 <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* 신뢰 지표 */}
          <div className="flex gap-6 md:gap-10 mt-2 flex-wrap justify-center">
            {[
              { label: '상담 건수', value: '1,200+' },
              { label: '제휴 보험사', value: '15개사' },
              { label: '상담 만족도', value: '98%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl md:text-2xl font-black text-[#E8600A]">{stat.value}</p>
                <p className="text-xs text-blue-300 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
