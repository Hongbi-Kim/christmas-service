// src/components/AdBanner.tsx
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  slot: string;          // AdSense data-ad-slot
  className?: string;
}

export default function AdBanner({ slot, className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      // 이미 로드된 ins에 중복 push 방지용 방어코드
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      ref={adRef as any}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-8152691600181853"   // 본인 client ID
      data-ad-slot={slot}                        // 광고 단위 ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}