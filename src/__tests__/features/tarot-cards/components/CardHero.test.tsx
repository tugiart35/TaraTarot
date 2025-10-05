import { render, screen } from '@testing-library/react';
import { CardHero } from '@/features/tarot-cards/components/CardHero';
import { TarotCard, CardContent } from '@/types/tarot-cards';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
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
    getCardUrlForLocale: jest.fn((card) => {
      return `/kartlar/${card.slug}`;
    }),
  },
}));

describe('CardHero', () => {
  const mockCard: TarotCard = {
    id: 'the-fool',
    englishName: 'The Fool',
    turkishName: 'Joker',
    serbianName: 'Budala',
    arcanaType: 'major',
    number: 0,
    imageUrl: '/cards/rws/TheFool.jpg',
    slug: {
      tr: 'joker',
      en: 'the-fool',
      sr: 'budala'
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockContent: CardContent = {
    id: 'the-fool-content',
    cardId: 'the-fool',
    locale: 'tr',
    uprightMeaning:
      'Yeni başlangıçlar, spontanlık, masumiyet ve sonsuz potansiyel sizi bekliyor.',
    reversedMeaning: 'Düşüncesizlik, yön eksikliği ve kaçırılan fırsatlar.',
    loveInterpretation: 'Aşk hayatınızda yeni bir başlangıç yapma zamanı.',
    careerInterpretation: 'Kariyerinizde yeni fırsatlar ve yollar açılacak.',
    moneyInterpretation: 'Finansal konularda dikkatli olun, yeni yatırımlar yapabilirsiniz.',
    spiritualInterpretation: 'Ruhsal yolculuğunuzda yeni bir dönem başlıyor.',
    keywords: [
      'yeni başlangıçlar',
      'masumiyet',
      'spontanlık',
      'potansiyel',
      'özgürlük',
    ],
    story: 'Joker kartı, masumiyet ve yeni başlangıçların sembolüdür.',
    readingTime: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('renders card hero with correct title and description', () => {
    render(<CardHero card={mockCard} content={mockContent} locale='tr' />);

    expect(screen.getByText('The Fool')).toBeInTheDocument();
    expect(screen.getByText('Major Arcana')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Yeni başlangıçlar, spontanlık, masumiyet ve sonsuz potansiyel/
      )
    ).toBeInTheDocument();
  });

  it('renders card image with correct alt text', () => {
    render(<CardHero card={mockCard} content={mockContent} locale='tr' />);

    const image = screen.getByAltText('The Fool');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/cards/rws/TheFool.jpg');
  });

  it('displays card number badge for major arcana', () => {
    render(<CardHero card={mockCard} content={mockContent} locale='tr' />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders keywords as badges', () => {
    render(<CardHero card={mockCard} content={mockContent} locale='tr' />);

    expect(screen.getByText('yeni başlangıçlar')).toBeInTheDocument();
    expect(screen.getByText('masumiyet')).toBeInTheDocument();
    expect(screen.getByText('spontanlık')).toBeInTheDocument();
  });

  it('displays reading time with correct locale', () => {
    render(<CardHero card={mockCard} content={mockContent} locale='tr' />);

    expect(screen.getByText('5 dakika okuma')).toBeInTheDocument();
  });

  it('renders CTA button with correct text for Turkish locale', () => {
    render(<CardHero card={mockCard} content={mockContent} locale='tr' />);

    expect(screen.getByText('Detaylı Anlamları Gör')).toBeInTheDocument();
  });

  it('renders CTA button with correct text for English locale', () => {
    render(<CardHero card={mockCard} content={mockContent} locale='en' />);

    expect(screen.getByText('View Detailed Meanings')).toBeInTheDocument();
  });

  it('renders CTA button with correct text for Serbian locale', () => {
    render(<CardHero card={mockCard} content={mockContent} locale='sr' />);

    expect(screen.getByText('Pogledaj Detaljna Značenja')).toBeInTheDocument();
  });

  it('displays minor arcana badge for minor arcana cards', () => {
    const minorCard = {
      ...mockCard,
      arcanaType: 'minor' as const,
      suit: 'cups' as const,
      number: 1,
    };

    render(<CardHero card={minorCard} content={mockContent} locale='tr' />);

    expect(screen.getByText('CUPS 1')).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(
      <CardHero card={mockCard} content={mockContent} locale='tr' />
    );

    expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
    expect(container.querySelector('.from-purple-900')).toBeInTheDocument();
    expect(container.querySelector('.text-white')).toBeInTheDocument();
  });

  it('renders background decoration elements', () => {
    const { container } = render(
      <CardHero card={mockCard} content={mockContent} locale='tr' />
    );

    const decorationElements = container.querySelectorAll(
      '.absolute.overflow-hidden.pointer-events-none'
    );
    expect(decorationElements).toHaveLength(1);
  });
});
