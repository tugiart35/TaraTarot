import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { NextIntlClientProvider } from 'next-intl';

// Mock messages for testing
const mockMessages = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
  },
  dashboard: {
    title: 'Dashboard',
    credits: 'Credits',
    readings: 'Readings',
  },
};

// Custom render function with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <NextIntlClientProvider locale="en" messages={mockMessages}>
      {children}
    </NextIntlClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Mock Supabase client
export const mockSupabaseClient = {
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn(() => ({
          data: null,
          error: null,
        })),
        limit: jest.fn(() => ({
          data: [],
          error: null,
        })),
      })),
      gte: jest.fn(() => ({
        order: jest.fn(() => ({
          limit: jest.fn(() => ({
            data: [],
            error: null,
          })),
        })),
      })),
    })),
    insert: jest.fn(() => ({
      data: null,
      error: null,
    })),
    update: jest.fn(() => ({
      eq: jest.fn(() => ({
        data: null,
        error: null,
      })),
    })),
    delete: jest.fn(() => ({
      eq: jest.fn(() => ({
        data: null,
        error: null,
      })),
    })),
  })),
  auth: {
    getUser: jest.fn(() => Promise.resolve({ data: { user: null }, error: null })),
    signIn: jest.fn(() => Promise.resolve({ data: { user: null }, error: null })),
    signOut: jest.fn(() => Promise.resolve({ error: null })),
  },
  channel: jest.fn(() => ({
    on: jest.fn(() => ({
      subscribe: jest.fn(),
    })),
  })),
};

// Mock useAuth hook
export const mockUseAuth = {
  user: null,
  isAuthenticated: false,
  loading: false,
  isAdmin: false,
  signIn: jest.fn(),
  signOut: jest.fn(),
  refreshUser: jest.fn(),
};

// Mock useRouter hook
export const mockUseRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

// Mock usePathname hook
export const mockUsePathname = jest.fn(() => '/tr/dashboard');

// Mock useTranslations hook
export const mockUseTranslations = jest.fn((key: string) => {
  const keys = key.split('.');
  let value: any = mockMessages;
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
});

// Mock useShopier hook
export const mockUseShopier = {
  initiatePayment: jest.fn(),
  loading: false,
  error: null,
  success: null,
  paymentUrl: null,
};

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  ...overrides,
});

export const createMockProfile = (overrides = {}) => ({
  id: 'test-user-id',
  display_name: 'Test User',
  credit_balance: 100,
  created_at: '2024-01-01T00:00:00Z',
  ...overrides,
});

export const createMockReading = (overrides = {}) => ({
  id: 'test-reading-id',
  user_id: 'test-user-id',
  reading_type: 'love',
  cards: ['The Fool', 'The Lovers'],
  interpretation: 'Test interpretation',
  created_at: '2024-01-01T00:00:00Z',
  ...overrides,
});

export const createMockPackage = (overrides = {}) => ({
  id: 'test-package-id',
  name: 'Test Package',
  description: 'Test package description',
  credits: 50,
  price_eur: 10,
  price_try: 300,
  active: true,
  ...overrides,
});

// Utility functions for testing
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

export const createMockError = (message = 'Test error') => new Error(message);

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
