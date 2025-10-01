/**
 * Screen Reader Announcements Component
 * Provides accessible announcements for dynamic content changes
 */

'use client';

import { createContext, useContext, useCallback, ReactNode } from 'react';

interface ScreenReaderContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  announceError: (message: string) => void;
  announceSuccess: (message: string) => void;
  announceInfo: (message: string) => void;
}

const ScreenReaderContext = createContext<ScreenReaderContextType | null>(null);

interface ScreenReaderProviderProps {
  children: ReactNode;
}

export const ScreenReaderProvider = ({ children }: ScreenReaderProviderProps) => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    // Remove any existing announcements
    const existingAnnouncements = document.querySelectorAll('[aria-live]');
    existingAnnouncements.forEach(el => el.remove());

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }, []);

  const announceError = useCallback((message: string) => {
    announce(`Hata: ${message}`, 'assertive');
  }, [announce]);

  const announceSuccess = useCallback((message: string) => {
    announce(`Başarılı: ${message}`, 'polite');
  }, [announce]);

  const announceInfo = useCallback((message: string) => {
    announce(`Bilgi: ${message}`, 'polite');
  }, [announce]);

  return (
    <ScreenReaderContext.Provider value={{ 
      announce, 
      announceError, 
      announceSuccess, 
      announceInfo 
    }}>
      {children}
    </ScreenReaderContext.Provider>
  );
};

export const useScreenReader = () => {
  const context = useContext(ScreenReaderContext);
  if (!context) {
    throw new Error('useScreenReader must be used within ScreenReaderProvider');
  }
  return context;
};

// Utility component for automatic announcements
interface AutoAnnounceProps {
  message: string;
  priority?: 'polite' | 'assertive';
  trigger?: boolean;
}

export const AutoAnnounce = ({ message, priority = 'polite', trigger }: AutoAnnounceProps) => {
  const { announce } = useScreenReader();

  useEffect(() => {
    if (trigger && message) {
      announce(message, priority);
    }
  }, [trigger, message, priority, announce]);

  return null;
};

// Specialized announcement components
export const ErrorAnnouncement = ({ error }: { error: string | null }) => {
  const { announceError } = useScreenReader();

  useEffect(() => {
    if (error) {
      announceError(error);
    }
  }, [error, announceError]);

  return null;
};

export const SuccessAnnouncement = ({ message }: { message: string | null }) => {
  const { announceSuccess } = useScreenReader();

  useEffect(() => {
    if (message) {
      announceSuccess(message);
    }
  }, [message, announceSuccess]);

  return null;
};

export const LoadingAnnouncement = ({ isLoading }: { isLoading: boolean }) => {
  const { announce } = useScreenReader();

  useEffect(() => {
    if (isLoading) {
      announce('Yükleniyor...', 'polite');
    }
  }, [isLoading, announce]);

  return null;
};

// Form validation announcements
export const FormValidationAnnouncement = ({ 
  errors, 
  isValidating 
}: { 
  errors: Record<string, string>;
  isValidating: boolean;
}) => {
  const { announceError, announceSuccess } = useScreenReader();

  useEffect(() => {
    if (isValidating) return;

    const errorCount = Object.keys(errors).length;
    if (errorCount > 0) {
      announceError(`${errorCount} form hatası bulundu`);
    } else {
      announceSuccess('Form geçerli');
    }
  }, [errors, isValidating, announceError, announceSuccess]);

  return null;
};

// Navigation announcements
export const NavigationAnnouncement = ({ 
  currentPage, 
  totalPages 
}: { 
  currentPage: number;
  totalPages: number;
}) => {
  const { announce } = useScreenReader();

  useEffect(() => {
    announce(`Sayfa ${currentPage} / ${totalPages}`, 'polite');
  }, [currentPage, totalPages, announce]);

  return null;
};
