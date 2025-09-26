/*
info:
Layout bileşenleri için type definitions.
Navigation, footer, header ve diğer layout bileşenlerinin type safety'sini sağlar.

Bağlantılı dosyalar:
- @/hooks/useNavigation: Navigation hook types
- @/features/shared/layout: Layout component types

Dosyanın amacı:
- Layout bileşenleri için interface tanımları
- Navigation item types
- Footer link types
- Header component types
- Error boundary types

Backend bağlantısı:
- Bu dosya sadece frontend type definitions içerir
- Backend ile doğrudan bağlantısı yoktur

Geliştirme ve öneriler:
- Tüm layout bileşenleri için type safety
- Interface inheritance kullanımı
- Generic types for reusability
- Strict type checking
*/

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  activeIcon: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

// Footer Types
export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

// Header Types
export interface HeaderProps {
  className?: string;
  showNavigation?: boolean;
  showLanguageSelector?: boolean;
}

// Layout Types
export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
  showNavigation?: boolean;
}

// Error Boundary Types
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Navigation Hook Types
export interface UseNavigationReturn {
  navigationItems: NavigationItem[];
  currentLocale: string;
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  handleLanguageChange: (locale: string) => void;
  handleNavigationClick: (item: NavigationItem) => void;
  router: any; // Next.js router type
}

// Layout Component Props
export interface BottomNavigationProps {
  className?: string;
  onItemClick?: (item: NavigationItem) => void;
}

export interface LanguageSelectorProps {
  currentLocale: string;
  onLanguageChange: (locale: string) => void;
  className?: string;
}

// Footer Component Props
export interface FooterProps {
  className?: string;
  showLegalLinks?: boolean;
  showSocialLinks?: boolean;
}

// Head Tags Props
export interface HeadTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

// Root Layout Props
export interface RootLayoutProps {
  children: React.ReactNode;
  locale?: string;
}

// Navigation State
export interface NavigationState {
  isOpen: boolean;
  activeItem: string | null;
  isLoading: boolean;
}

// Language State
export interface LanguageState {
  currentLocale: string;
  availableLocales: string[];
  isChanging: boolean;
}

// Layout Error Types
export interface LayoutError {
  message: string;
  code: string;
  component: string;
  timestamp: Date;
}

// Navigation Event Types
export interface NavigationEvent {
  type: 'click' | 'hover' | 'focus';
  item: NavigationItem;
  timestamp: Date;
}

// Layout Performance Types
export interface LayoutPerformance {
  renderTime: number;
  navigationLoadTime: number;
  footerLoadTime: number;
  totalLayoutTime: number;
}

// Accessibility Types
export interface AccessibilityProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
  tabIndex?: number;
}

// Navigation Analytics Types
export interface NavigationAnalytics {
  item: string;
  action: string;
  timestamp: Date;
  userAgent?: string;
  locale: string;
}
