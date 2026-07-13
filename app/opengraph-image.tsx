import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '인슈픽 | 내 보험을 숫자로 진단하는 곳'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0E1D35',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-2px',
          }}
        >
          {'인슈'}
          <span style={{ color: '#E8600A' }}>픽</span>
        </div>
        <div
          style={{
            fontSize: 38,
            color: 'rgba(255,255,255,0.65)',
            marginTop: 28,
          }}
        >
          내 보험을 숫자로 진단하는 곳
        </div>
      </div>
    ),
    { ...size }
  )
}
