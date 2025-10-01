/*
 * Color Contrast Utilities
 * WCAG 2.1 AA compliance için color contrast kontrolü
 */

/**
 * RGB değerlerini hex'den çıkarır
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1] || '0', 16),
        g: parseInt(result[2] || '0', 16),
        b: parseInt(result[3] || '0', 16),
      }
    : null;
}

/**
 * Relative luminance hesaplar (WCAG 2.1)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * (rs || 0) + 0.7152 * (gs || 0) + 0.0722 * (bs || 0);
}

/**
 * İki renk arasındaki contrast ratio'yu hesaplar
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return 0;
  }

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * WCAG 2.1 AA compliance kontrolü
 */
export function isAccessibleContrast(
  foreground: string,
  background: string
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= 4.5; // WCAG 2.1 AA standard
}

/**
 * WCAG 2.1 AAA compliance kontrolü
 */
export function isHighContrast(
  foreground: string,
  background: string
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= 7; // WCAG 2.1 AAA standard
}

/**
 * Tema renklerinin accessibility kontrolü
 */
export function validateThemeAccessibility(theme: {
  foreground: string;
  background: string;
  accent: string;
}): {
  isAccessible: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  let isAccessible = true;

  // Ana metin kontrastı
  if (!isAccessibleContrast(theme.foreground, theme.background)) {
    issues.push('Ana metin kontrastı WCAG 2.1 AA standardını karşılamıyor');
    isAccessible = false;
  }

  // Accent renk kontrastı
  if (!isAccessibleContrast(theme.accent, theme.background)) {
    issues.push('Accent renk kontrastı WCAG 2.1 AA standardını karşılamıyor');
    isAccessible = false;
  }

  return { isAccessible, issues };
}
