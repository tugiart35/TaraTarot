import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

// Mock translations
const mockMessages = {
  'navigation.home': 'Ana Sayfa',
  'navigation.tarot': 'Tarot',
  'navigation.numerology': 'Numeroloji',
  'navigation.login': 'Giriş Yap',
  'navigation.profile': 'Profil',
  'footer.quickAccess.tarotReading': 'Tarot Açılımı',
  'footer.quickAccess.numerology': 'Numeroloji Analizi',
};

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <NextIntlClientProvider locale='tr' messages={mockMessages}>
      {children}
    </NextIntlClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
