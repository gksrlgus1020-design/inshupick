'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import FloatingButtons from './FloatingButtons'

const BARE_ROUTES = ['/pet']

export default function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const bare = BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'))

  if (bare) return <>{children}</>

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
