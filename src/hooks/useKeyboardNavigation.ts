/**
 * Enhanced Keyboard Navigation Hook
 * Provides comprehensive keyboard navigation support for accessibility
 */

'use client';

import { useEffect, useCallback } from 'react';

interface KeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onSpace?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: () => void;
  enabled?: boolean;
}

export const useKeyboardNavigation = (options: KeyboardNavigationOptions = {}) => {
  const {
    onEscape,
    onEnter,
    onSpace,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    enabled = true,
  } = options;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;

    switch (e.key) {
      case 'Escape':
        onEscape?.();
        break;
      case 'Enter':
        onEnter?.();
        break;
      case ' ':
        e.preventDefault(); // Prevent page scroll
        onSpace?.();
        break;
      case 'ArrowUp':
        e.preventDefault();
        onArrowUp?.();
        break;
      case 'ArrowDown':
        e.preventDefault();
        onArrowDown?.();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        onArrowLeft?.();
        break;
      case 'ArrowRight':
        e.preventDefault();
        onArrowRight?.();
        break;
      case 'Tab':
        onTab?.();
        break;
    }
  }, [enabled, onEscape, onEnter, onSpace, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);

  return { handleKeyDown };
};

// Focus trap utility for modals and dropdowns
export const useFocusTrap = (isActive: boolean = true) => {
  useEffect(() => {
    if (!isActive) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

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
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isActive]);
};

// Arrow key navigation for menus and lists
export const useArrowNavigation = (
  items: HTMLElement[],
  orientation: 'horizontal' | 'vertical' = 'vertical'
) => {
  const handleArrowKeys = useCallback((e: KeyboardEvent) => {
    if (!items.length) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    if (orientation === 'vertical') {
      if (e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + items.length) % items.length;
      }
    } else {
      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % items.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + items.length) % items.length;
      }
    }

    if (nextIndex !== currentIndex) {
      e.preventDefault();
      items[nextIndex]?.focus();
    }
  }, [items, orientation]);

  return { handleArrowKeys };
};

// Skip link functionality
export const useSkipLink = (targetId: string) => {
  const handleSkip = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [targetId]);

  return { handleSkip };
};

// Keyboard shortcuts
export const useKeyboardShortcuts = (shortcuts: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const modifier = e.ctrlKey || e.metaKey;
      
      // Handle modifier + key combinations
      if (modifier) {
        const shortcutKey = `ctrl+${key}`;
        if (shortcuts[shortcutKey]) {
          e.preventDefault();
          shortcuts[shortcutKey]();
        }
      } else {
        // Handle single key shortcuts
        if (shortcuts[key]) {
          e.preventDefault();
          shortcuts[key]();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
