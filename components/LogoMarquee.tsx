const COMPANIES = [
  '삼성생명', '교보생명', '한화생명', 'DB생명', '흥국생명',
  '신한라이프', '메트라이프', '푸본현대생명', '처브라이프', '미래에셋생명',
  'AIA생명', 'KB생명', '동양생명', '농협생명', 'DGB생명',
]

export default function LogoMarquee() {
  const doubled = [...COMPANIES, ...COMPANIES]

  return (
    <section className="py-10 bg-white border-y border-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-5">
        <p className="text-xs font-bold tracking-widest text-ink-2/50 uppercase text-center">
          제휴 보험사
        </p>
      </div>

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-2 bg-surface border border-border rounded-xl px-5 py-2.5 text-sm font-semibold text-ink-2 hover:border-violet-DEFAULT/30 hover:text-ink transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-DEFAULT to-pink-brand flex-shrink-0" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
