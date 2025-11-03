import { ImageResponse } from 'next/og';
import site from '@/content/site.json';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 56,
          color: '#142848',
          background: 'linear-gradient(135deg, #F7F8FA 0%, #C8D9F4 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '100px',
        }}
      >
        <span style={{ fontSize: 24, textTransform: 'uppercase', letterSpacing: 6, color: '#20A37F' }}>
          {site.tagline}
        </span>
        <strong style={{ fontSize: 72, marginTop: 24 }}>{site.name}</strong>
        <span style={{ fontSize: 30, marginTop: 24 }}>Neighbors helping neighbors since 1986</span>
      </div>
    ),
    size
  );
}
