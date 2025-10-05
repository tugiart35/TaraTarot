import { render, screen } from '@testing-library/react';
import { RelatedCards } from '@/features/tarot-cards/components/RelatedCards';
import { TarotCard } from '@/types/tarot-cards';

// Mock Next.js components
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock CardMapping
jest.mock('@/features/tarot-cards/lib/card-mapping', () => ({
  CardMapping: {
    getCardNameForLocale: jest.fn((card, locale) => {
      if (locale === 'tr') {
        return card.name;
      }
      if (locale === 'en') {
        return card.nameEn || card.name;
      }
      if (locale === 'sr') {
        return card.nameSr || card.name;
      }
      return card.name;
    }),
    getCardUrlForLocale: jest.fn((card, locale) => {
      return `/kartlar/${card.slug}`;
    }),
  },
}));

describe('RelatedCards', () => {
  const mockCards: TarotCard[] = [
    {
      id: 'the-magician',
      name: 'Büyücü',
      nameEn: 'The Magician',
      nameSr: 'Mađioničar',
      slug: 'buyucu',
      slugEn: 'the-magician',
      slugSr: 'madionicar',
      imageUrl: '/cards/rws/TheMagician.jpg',
      arcanaType: 'major',
      number: 1,
      suit: null,
      element: 'Air',
      planet: 'Mercury',
      zodiac: 'Gemini',
      keywords: ['willpower', 'manifestation', 'skill'],
      description: 'The Magician represents willpower and manifestation.',
      uprightMeaning: 'You have the power to manifest your desires.',
      reversedMeaning: 'Lack of focus and scattered energy.',
      keywords: ['willpower', 'manifestation', 'skill', 'focus'],
      relatedCards: ['the-fool', 'the-high-priestess'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'the-high-priestess',
      name: 'Yüksek Rahibe',
      nameEn: 'The High Priestess',
      nameSr: 'Visoka Svestenica',
      slug: 'yuksek-rahibe',
      slugEn: 'the-high-priestess',
      slugSr: 'visoka-svestenica',
      imageUrl: '/cards/rws/TheHighPriestess.jpg',
      arcanaType: 'major',
      number: 2,
      suit: null,
      element: 'Water',
      planet: 'Moon',
      zodiac: 'Cancer',
      keywords: ['intuition', 'mystery', 'subconscious'],
      description: 'The High Priestess represents intuition and mystery.',
      uprightMeaning: 'Trust your intuition and inner wisdom.',
      reversedMeaning: 'Ignoring your inner voice.',
      keywords: ['intuition', 'mystery', 'subconscious', 'wisdom'],
      relatedCards: ['the-magician', 'the-empress'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  it('renders section header with correct title for Turkish locale', () => {
    render(<RelatedCards cards={mockCards} locale='tr' />);

    expect(screen.getByText('İlgili Kartlar')).toBeInTheDocument();
    expect(
      screen.getByText(/Bu kartla benzer enerjilere sahip diğer kartlar/)
    ).toBeInTheDocument();
  });

  it('renders section header with correct title for English locale', () => {
    render(<RelatedCards cards={mockCards} locale='en' />);

    expect(screen.getByText('Related Cards')).toBeInTheDocument();
    expect(
      screen.getByText(/Other cards with similar energies to this one/)
    ).toBeInTheDocument();
  });

  it('renders section header with correct title for Serbian locale', () => {
    render(<RelatedCards cards={mockCards} locale='sr' />);

    expect(screen.getByText('Povezane Karte')).toBeInTheDocument();
    expect(
      screen.getByText(/Druge karte sa sličnim energijama kao ova/)
    ).toBeInTheDocument();
  });

  it('renders all related cards with correct names', () => {
    render(<RelatedCards cards={mockCards} locale='tr' />);

    expect(screen.getByText('Büyücü')).toBeInTheDocument();
    expect(screen.getByText('Yüksek Rahibe')).toBeInTheDocument();
  });

  it('renders card images with correct alt text', () => {
    render(<RelatedCards cards={mockCards} locale='tr' />);

    expect(screen.getByAltText('Büyücü')).toBeInTheDocument();
    expect(screen.getByAltText('Yüksek Rahibe')).toBeInTheDocument();
  });

  it('displays major arcana badges for major arcana cards', () => {
    render(<RelatedCards cards={mockCards} locale='tr' />);

    expect(screen.getAllByText('Major')).toHaveLength(2);
  });

  it('displays card number badges for major arcana cards', () => {
    render(<RelatedCards cards={mockCards} locale='tr' />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders card descriptions with correct text for Turkish locale', () => {
    render(<RelatedCards cards={mockCards} locale='tr' />);

    expect(screen.getAllByText(/Detaylı anlamları için tıklayın/)).toHaveLength(
      2
    );
  });

  it('renders card descriptions with correct text for English locale', () => {
    render(<RelatedCards cards={mockCards} locale='en' />);

    expect(screen.getAllByText(/Click for detailed meanings/)).toHaveLength(2);
  });

  it('renders card descriptions with correct text for Serbian locale', () => {
    render(<RelatedCards cards={mockCards} locale='sr' />);

    expect(screen.getAllByText(/Kliknite za detaljna značenja/)).toHaveLength(
      2
    );
  });

  it('renders view all cards link with correct text for Turkish locale', () => {
    render(<RelatedCards cards={mockCards} locale='tr' />);

    expect(screen.getByText('Tüm Kartları Gör')).toBeInTheDocument();
  });

  it('renders view all cards link with correct text for English locale', () => {
    render(<RelatedCards cards={mockCards} locale='en' />);

    expect(screen.getByText('View All Cards')).toBeInTheDocument();
  });

  it('renders view all cards link with correct text for Serbian locale', () => {
    render(<RelatedCards cards={mockCards} locale='sr' />);

    expect(screen.getByText('Pogledaj Sve Karte')).toBeInTheDocument();
  });

  it('renders correct links for view all cards', () => {
    render(<RelatedCards cards={mockCards} locale='tr' />);

    const viewAllLink = screen.getByRole('link', { name: /Tüm Kartları Gör/ });
    expect(viewAllLink).toHaveAttribute('href', '/tr/kartlar');
  });

  it('renders correct links for individual cards', () => {
    render(<RelatedCards cards={mockCards} locale='tr' />);

    const cardLinks = screen.getAllByRole('link');
    expect(cardLinks[0]).toHaveAttribute('href', '/kartlar/buyucu');
    expect(cardLinks[1]).toHaveAttribute('href', '/kartlar/yuksek-rahibe');
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(
      <RelatedCards cards={mockCards} locale='tr' />
    );

    expect(container.querySelector('.bg-white')).toBeInTheDocument();
    expect(
      container.querySelector(
        '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4'
      )
    ).toBeInTheDocument();
    expect(container.querySelector('.group')).toBeInTheDocument();
    expect(container.querySelector('.hover\\:shadow-xl')).toBeInTheDocument();
  });

  it('renders cards with hover effects', () => {
    const { container } = render(
      <RelatedCards cards={mockCards} locale='tr' />
    );

    const hoverElements = container.querySelectorAll(
      '.group-hover\\:scale-105, .group-hover\\:text-purple-600'
    );
    expect(hoverElements.length).toBeGreaterThan(0);
  });

  it('displays major arcana keywords', () => {
    render(<RelatedCards cards={mockCards} locale='tr' />);

    expect(screen.getAllByText('Major Arcana')).toHaveLength(2);
  });

  it('renders cards in a responsive grid layout', () => {
    const { container } = render(
      <RelatedCards cards={mockCards} locale='tr' />
    );

    const gridContainer = container.querySelector(
      '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4'
    );
    expect(gridContainer).toBeInTheDocument();
  });

  it('returns null when no cards are provided', () => {
    const { container } = render(<RelatedCards cards={[]} locale='tr' />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when cards is undefined', () => {
    const { container } = render(
      <RelatedCards cards={undefined as any} locale='tr' />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders cards with proper aspect ratio', () => {
    const { container } = render(
      <RelatedCards cards={mockCards} locale='tr' />
    );

    const aspectElements = container.querySelectorAll('.aspect-\\[2\\/3\\]');
    expect(aspectElements).toHaveLength(mockCards.length);
  });

  it('renders cards with transition effects', () => {
    const { container } = render(
      <RelatedCards cards={mockCards} locale='tr' />
    );

    const transitionElements = container.querySelectorAll(
      '.transition-all, .transition-transform, .transition-colors'
    );
    expect(transitionElements.length).toBeGreaterThan(0);
  });
});
