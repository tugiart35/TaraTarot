/**
 * Background Image Component with Accessibility Support
 * Provides proper alt text and screen reader support for background images
 */

'use client';

import { ReactNode } from 'react';

interface BackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
  children?: ReactNode;
  role?: string;
  'aria-label'?: string;
}

export default function BackgroundImage({
  src,
  alt,
  className = '',
  children,
  role = 'img',
  'aria-label': ariaLabel,
}: BackgroundImageProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      role={role}
      aria-label={ariaLabel || alt}
    >
      {/* Screen reader only text */}
      <span className="sr-only">{alt}</span>
      
      {/* Content overlay */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

// Specialized background components
export function MysticalBackground({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <BackgroundImage
      src="/images/mystical-background.jpg"
      alt="Mistik tarot kartları ve sayılar arka plan resmi"
      className={`min-h-screen ${className}`}
      role="presentation"
    >
      {children}
    </BackgroundImage>
  );
}

export function TarotBackground({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <BackgroundImage
      src="/images/tarot-background.jpg"
      alt="Tarot kartları açılımı arka plan resmi"
      className={`min-h-screen ${className}`}
      role="presentation"
    >
      {children}
    </BackgroundImage>
  );
}

export function NumerologyBackground({
  children,
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <BackgroundImage
      src="/images/numerology-background.jpg"
      alt="Numeroloji sayıları ve semboller arka plan resmi"
      className={`min-h-screen ${className}`}
      role="presentation"
    >
      {children}
    </BackgroundImage>
  );
}
