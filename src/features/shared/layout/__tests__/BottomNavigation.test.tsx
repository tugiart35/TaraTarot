import { render, screen } from '@/test-utils/test-utils';
import BottomNavigation from '../BottomNavigation';

// Mock useNavigation hook
jest.mock('@/hooks/useNavigation', () => ({
  useNavigation: () => ({
    navigationItems: [
      {
        name: 'Tarot',
        href: '/tr/tarot-okuma',
        icon: '⭐',
        activeIcon: '⭐',
      },
      {
        name: 'Numeroloji',
        href: '/tr/numeroloji',
        icon: '🔢',
        activeIcon: '🔢',
      },
      {
        name: 'Ana Sayfa',
        href: '/tr/anasayfa',
        icon: '💛',
        activeIcon: '💛',
      },
      {
        name: 'Giriş Yap',
        href: '/tr/giris',
        icon: '🔑',
        activeIcon: '🔑',
      },
    ],
    currentLocale: 'tr',
    isLanguageMenuOpen: false,
    setIsLanguageMenuOpen: jest.fn(),
    handleLanguageChange: jest.fn(),
  }),
}));

describe('BottomNavigation', () => {
  it('renders navigation items correctly', () => {
    render(<BottomNavigation />);

    expect(screen.getByText('Tarot')).toBeInTheDocument();
    expect(screen.getByText('Numeroloji')).toBeInTheDocument();
    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('Giriş Yap')).toBeInTheDocument();
  });

  it('has correct href attributes for SEO-friendly URLs', () => {
    render(<BottomNavigation />);

    const tarotLink = screen.getByRole('link', { name: /tarot/i });
    const numerologyLink = screen.getByRole('link', { name: /numeroloji/i });
    const homeLink = screen.getByRole('link', { name: /ana sayfa/i });
    const loginLink = screen.getByRole('link', { name: /giriş yap/i });

    expect(tarotLink).toHaveAttribute('href', '/tr/tarot-okuma');
    expect(numerologyLink).toHaveAttribute('href', '/tr/numeroloji');
    expect(homeLink).toHaveAttribute('href', '/tr/anasayfa');
    expect(loginLink).toHaveAttribute('href', '/tr/giris');
  });

  it('has proper accessibility attributes', () => {
    render(<BottomNavigation />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Ana navigasyon menüsü');

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('role', 'menuitem');
    });
  });
});
