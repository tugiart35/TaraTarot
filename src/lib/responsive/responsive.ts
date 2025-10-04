import { useState, useEffect } from 'react';

export interface Breakpoint {
  name: string;
  min: number;
  max?: number;
}

export const breakpoints: Breakpoint[] = [
  { name: 'mobile', min: 0, max: 767 },
  { name: 'tablet', min: 768, max: 1023 },
  { name: 'desktop', min: 1024, max: 1439 },
  { name: 'large', min: 1440 },
];

export const useBreakpoint = (): string => {
  const [breakpoint, setBreakpoint] = useState('mobile');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const currentBreakpoint = breakpoints.find(
        bp => width >= bp.min && (!bp.max || width <= bp.max)
      );
      setBreakpoint(currentBreakpoint?.name || 'mobile');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

export const useIsMobile = (): boolean => {
  const breakpoint = useBreakpoint();
  return breakpoint === 'mobile';
};

export const useIsTablet = (): boolean => {
  const breakpoint = useBreakpoint();
  return breakpoint === 'tablet';
};

export const useIsDesktop = (): boolean => {
  const breakpoint = useBreakpoint();
  return breakpoint === 'desktop' || breakpoint === 'large';
};

export const getResponsiveClasses = (
  baseClasses: string,
  mobileClasses?: string,
  desktopClasses?: string
): string => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;

  if (isMobile && mobileClasses) {
    return mobileClasses;
  }

  if (!isMobile && desktopClasses) {
    return desktopClasses;
  }

  return baseClasses;
};

export const getMobileOptimizedProps = (props: any, isMobile: boolean) => {
  if (!isMobile) {
    return props;
  }

  return {
    ...props,
    className: `${props.className || ''} mobile-optimized`,
    style: {
      ...props.style,
      fontSize: '0.875rem',
      lineHeight: '1.6',
      padding: '1rem',
    },
  };
};

export const getTouchTargetProps = (props: any) => ({
  ...props,
  className: `${props.className || ''} touch-target`,
  style: {
    ...props.style,
    minHeight: '44px',
    minWidth: '44px',
  },
});

export const getMobileTypographyClasses = (
  size: 'sm' | 'base' | 'lg' | 'xl'
): string => {
  const baseClasses = 'leading-relaxed';

  switch (size) {
    case 'sm':
      return `text-xs sm:text-sm ${baseClasses}`;
    case 'base':
      return `text-sm sm:text-base ${baseClasses}`;
    case 'lg':
      return `text-base sm:text-lg ${baseClasses}`;
    case 'xl':
      return `text-lg sm:text-xl ${baseClasses}`;
    default:
      return `text-sm sm:text-base ${baseClasses}`;
  }
};

export const getMobileSpacingClasses = (size: 'sm' | 'md' | 'lg'): string => {
  switch (size) {
    case 'sm':
      return 'p-2 sm:p-3 lg:p-4';
    case 'md':
      return 'p-3 sm:p-4 lg:p-6';
    case 'lg':
      return 'p-4 sm:p-6 lg:p-8';
    default:
      return 'p-3 sm:p-4 lg:p-6';
  }
};

export const getMobileGridClasses = (cols: {
  mobile: number;
  tablet: number;
  desktop: number;
}): string => {
  const { mobile, tablet, desktop } = cols;

  return `grid grid-cols-${mobile} sm:grid-cols-${tablet} lg:grid-cols-${desktop} gap-4 sm:gap-6 lg:gap-8`;
};

export const getMobileFlexClasses = (
  direction: 'row' | 'col' | 'responsive'
): string => {
  switch (direction) {
    case 'row':
      return 'flex flex-row items-center gap-2 sm:gap-4';
    case 'col':
      return 'flex flex-col gap-2 sm:gap-4';
    case 'responsive':
      return 'flex flex-col sm:flex-row items-center gap-2 sm:gap-4';
    default:
      return 'flex flex-col sm:flex-row items-center gap-2 sm:gap-4';
  }
};
