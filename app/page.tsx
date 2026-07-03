import HeroSlider from '@/components/HeroSlider'
import ProductCard from '@/components/ProductCard'
import TrustSection from '@/components/TrustSection'
import CTASection from '@/components/CTASection'
import { getFeaturedProducts } from '@/data/products'

export default function HomePage() {
  const products = getFeaturedProducts()

  return (
    <>
      {/* 히어로 슬라이더 */}
      <HeroSlider products={products} />

      {/* 이달의 추천 상품 */}
      <section id="products" className="py-14 bg-[#F4F7FF]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest text-[#E8600A] uppercase mb-1">FEATURED</p>
              <h2 className="text-2xl md:text-3xl font-black text-[#0A2540]">이달의 추천 상품</h2>
            </div>
            <p className="text-sm text-gray-400 hidden sm:block">전문 설계사가 직접 선별했습니다</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 신뢰 섹션 */}
      <TrustSection />

      {/* CTA */}
      <CTASection />
    </>
  )
}
