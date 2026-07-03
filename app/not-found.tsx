import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F7FF] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl font-black text-[#0A2540] opacity-10 mb-4">404</div>
        <h1 className="text-xl font-black text-[#0A2540] mb-2">페이지를 찾을 수 없어요</h1>
        <p className="text-gray-500 text-sm mb-6">주소를 확인하거나 홈으로 돌아가주세요.</p>
        <Link href="/" className="bg-[#E8600A] text-white px-6 py-3 rounded-xl font-bold text-sm">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
