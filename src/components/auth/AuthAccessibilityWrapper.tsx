/*
 * Auth Accessibility Wrapper
 * 
 * Bu component auth form'ları için accessibility özelliklerini sağlar.
 * WCAG 2.1 AA compliance için gerekli özellikler.
 */

'use client';

import React, { useEffect, useRef } from 'react';

interface AuthAccessibilityWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function AuthAccessibilityWrapper({ 
  children, 
  title, 
  description 
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
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-night focus:rounded focus:font-semibold"
        onKeyDown={handleSkipLink}
        aria-label="Ana içeriğe geç"
      >
        Ana içeriğe geç
      </a>

      {/* Main content area */}
      <main
        ref={mainRef}
        id="main-content"
        role="main"
        aria-labelledby="auth-title"
        aria-describedby={description ? "auth-description" : undefined}
        tabIndex={-1}
        className="min-h-screen bg-night flex items-center justify-center p-4 pb-20"
      >
        <div className="max-w-md w-full bg-lavender/10 backdrop-blur-sm rounded-lg p-8 border border-lavender/20">
          {/* Page heading */}
          <header className="text-center mb-8">
            <h1
              ref={headingRef}
              id="auth-title"
              className="text-2xl font-bold text-white mb-4"
              tabIndex={-1}
            >
              {title}
            </h1>
            {description && (
              <p
                id="auth-description"
                className="text-lavender/80 text-sm"
              >
                {description}
              </p>
            )}
          </header>

          {/* Form content */}
          <div role="region" aria-labelledby="auth-title">
            {children}
          </div>
        </div>
      </main>
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
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

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
