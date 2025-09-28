/*
 * Auth Accessibility Wrapper
 *
 * Bu component auth form'ları için accessibility özelliklerini sağlar.
 * WCAG 2.1 AA compliance için gerekli özellikler.
 */

'use client';

import React, { useEffect, useRef } from 'react';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';

interface AuthAccessibilityWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function AuthAccessibilityWrapper({
  children,
  title,
  description,
}: AuthAccessibilityWrapperProps) {
  const mainRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Focus management on mount
  useEffect(() => {
    // Focus the main heading for screen readers
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  // Skip link functionality
  const handleSkipLink = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (mainRef.current) {
        mainRef.current.focus();
      }
    }
  };

  return (
    <>
      {/* Skip to main content link */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-night focus:rounded focus:font-semibold'
        onKeyDown={handleSkipLink}
        aria-label='Ana içeriğe geç'
      >
        Ana içeriğe geç
      </a>

      {/* Main content area */}
      <main
        ref={mainRef}
        id='main-content'
        role='main'
        aria-labelledby='auth-title'
        aria-describedby={description ? 'auth-description' : undefined}
        tabIndex={-1}
        className='min-h-screen bg-night flex items-center justify-center p-4 pb-20 overflow-x-hidden auth-page relative'
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(75, 0, 130, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #16213e 100%)
          `,
        }}
      >
        {/* Mystical constellation background */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          {/* Stars */}
          <div className='absolute top-1/4 left-1/4 w-1 h-1 bg-gold rounded-full animate-pulse'></div>
          <div className='absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-lavender rounded-full animate-pulse delay-1000'></div>
          <div className='absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-2000'></div>
          <div className='absolute bottom-1/4 right-1/4 w-0.5 h-0.5 bg-gold rounded-full animate-pulse delay-3000'></div>
          <div className='absolute top-1/2 left-1/6 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse delay-4000'></div>
          <div className='absolute top-2/3 right-1/6 w-1 h-1 bg-lavender rounded-full animate-pulse delay-5000'></div>

          {/* Mystical orbs */}
          <div className='absolute top-1/5 right-1/5 w-3 h-3 bg-gradient-to-r from-gold/20 to-transparent rounded-full animate-pulse delay-700'></div>
          <div className='absolute bottom-1/5 left-1/5 w-2 h-2 bg-gradient-to-r from-lavender/20 to-transparent rounded-full animate-pulse delay-1500'></div>

          {/* Floating particles */}
          <div className='absolute top-1/6 left-1/2 w-1 h-1 bg-gold/40 rounded-full animate-bounce delay-2000'></div>
          <div className='absolute bottom-1/6 right-1/2 w-1 h-1 bg-lavender/40 rounded-full animate-bounce delay-3500'></div>
        </div>

        {/* Main mystical container */}
        <div className='max-w-md w-full relative z-10'>
          {/* Outer mystical ring */}
          <div className='absolute -inset-4 bg-gradient-to-r from-gold/10 via-lavender/10 to-purple-400/10 rounded-3xl blur-sm animate-pulse'></div>

          {/* Inner container */}
          <div className='relative bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-slate-800/90 backdrop-blur-xl rounded-2xl p-8 border border-lavender/20 shadow-2xl'>
            {/* Mystical border glow */}
            <div className='absolute inset-0 bg-gradient-to-r from-gold/5 via-lavender/5 to-purple-400/5 rounded-2xl'></div>
            {/* Page heading */}
            <header className='text-center mb-8'>
              <div className='relative mb-6'>
                {/* Mystical symbol above title */}
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-gold/30 rounded-full animate-spin-slow'></div>
                <div className='absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border border-lavender/40 rounded-full animate-pulse'></div>

                <h1
                  ref={headingRef}
                  id='auth-title'
                  className='text-4xl font-bold bg-gradient-to-r from-gold via-lavender to-purple-400 bg-clip-text text-transparent mb-2 animate-fadeIn relative z-10'
                  tabIndex={-1}
                >
                  🔮 {title} 🔮
                </h1>

                {/* Mystical underline */}
                <div className='w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2'></div>
              </div>
              {description && (
                <p
                  id='auth-description'
                  className='text-lavender/90 text-sm font-medium'
                >
                  {description}
                </p>
              )}
            </header>

            {/* Form content */}
            <div role='region' aria-labelledby='auth-title'>
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </>
  );
}

// Accessibility utilities
export const AccessibilityUtils = {
  // Announce messages to screen readers
  announceToScreenReader: (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Focus trap for modals
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  // High contrast mode detection
  isHighContrastMode: () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Reduced motion detection
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Keyboard navigation helper
  handleKeyboardNavigation: (
    e: React.KeyboardEvent,
    onEnter?: () => void,
    onEscape?: () => void,
    onArrowUp?: () => void,
    onArrowDown?: () => void
  ) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        onEnter?.();
        break;
      case 'Escape':
        onEscape?.();
        break;
      case 'ArrowUp':
        onArrowUp?.();
        break;
      case 'ArrowDown':
        onArrowDown?.();
        break;
    }
  },
};
