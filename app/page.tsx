import { AnimatedHero } from '@/components/ui/animated-hero'
import ProductCard from '@/components/ProductCard'
import TrustSection from '@/components/TrustSection'
import CTASection from '@/components/CTASection'
import { FadeIn } from '@/components/ui/fade-in'
import { getFeaturedProducts } from '@/data/products'

export default function HomePage() {
  const products = getFeaturedProducts()

  return (
    <>
      <AnimatedHero />

      {/* 구분선 */}
      <div className="h-px bg-border" />

      {/* 추천 상품 */}
      <section id="products" className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="mb-12">
              <p className="text-sm font-bold tracking-widest text-violet-DEFAULT uppercase mb-3">FEATURED</p>
              <div className="flex items-end justify-between">
                <h2 className="text-3xl md:text-4xl font-extrabold text-ink">이달의 추천 상품</h2>
                <p className="text-[15px] text-ink-2 hidden sm:block">전문 설계사가 직접 선별했습니다</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 80}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />
      <CTASection />
    </>
  )
}
