import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [bebasNeue, spaceGrotesk] = await Promise.all([
    fetch('https://fonts.gstatic.com/s/bebasneue/v16/JTUSjIg69CK48gW7PXooxW4.ttf')
      .then((res) => res.arrayBuffer())
      .catch(() => null),
    fetch(
      'https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsj.ttf',
    )
      .then((res) => res.arrayBuffer())
      .catch(() => null),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: '#1b1b1b',
        padding: '80px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontSize: 96,
            fontFamily: bebasNeue ? 'Bebas Neue' : 'sans-serif',
            color: '#ededed',
            lineHeight: 1,
          }}
        >
          {siteConfig.name}
        </span>
        <span
          style={{
            fontSize: 32,
            fontFamily: spaceGrotesk ? 'Space Grotesk' : 'sans-serif',
            color: '#ffff9a',
            lineHeight: 1.3,
          }}
        >
          {siteConfig.jobTitle}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: '80px',
          left: '80px',
          fontSize: 20,
          fontFamily: spaceGrotesk ? 'Space Grotesk' : 'sans-serif',
          color: '#ededed',
          opacity: 0.5,
        }}
      >
        {siteConfig.url.replace('https://', '')}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        ...(bebasNeue ? [{ name: 'Bebas Neue', data: bebasNeue, style: 'normal' as const }] : []),
        ...(spaceGrotesk
          ? [
              {
                name: 'Space Grotesk',
                data: spaceGrotesk,
                style: 'normal' as const,
              },
            ]
          : []),
      ],
    },
  );
}
