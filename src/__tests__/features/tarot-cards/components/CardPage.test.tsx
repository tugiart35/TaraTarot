import { render, screen } from '@testing-library/react';
import { CardPage } from '@/features/tarot-cards/components/CardPage';
import {
  CardPageData,
  TarotCard,
  CardContent,
  CardSEO,
} from '@/types/tarot-cards';

// Mock child components
jest.mock('@/features/tarot-cards/components/CardHero', () => ({
  CardHero: ({ card, content, locale }: any) => (
    <div data-testid='card-hero'>
      <h1>
        {card.name} - {content.title}
      </h1>
      <span data-locale={locale}>Hero Component</span>
    </div>
  ),
}));

jest.mock('@/features/tarot-cards/components/CardMeanings', () => ({
  CardMeanings: ({ content, locale }: any) => (
    <div data-testid='card-meanings'>
      <h2>Meanings</h2>
      <span data-locale={locale}>Meanings Component</span>
    </div>
  ),
}));

jest.mock('@/features/tarot-cards/components/CardKeywords', () => ({
  CardKeywords: ({ content, locale }: any) => (
    <div data-testid='card-keywords'>
      <h2>Keywords</h2>
      <span data-locale={locale}>Keywords Component</span>
    </div>
  ),
}));

jest.mock('@/features/tarot-cards/components/CardStory', () => ({
  CardStory: ({ content, locale }: any) => (
    <div data-testid='card-story'>
      <h2>Story</h2>
      <span data-locale={locale}>Story Component</span>
    </div>
  ),
}));

jest.mock('@/features/tarot-cards/components/CardCTA', () => ({
  CardCTA: ({ card, locale }: any) => (
    <div data-testid='card-cta'>
      <h2>CTA</h2>
      <span data-locale={locale}>CTA Component</span>
    </div>
  ),
}));

jest.mock('@/features/tarot-cards/components/CardFAQ', () => ({
  CardFAQ: ({ seo, locale }: any) => (
    <div data-testid='card-faq'>
      <h2>FAQ</h2>
      <span data-locale={locale}>FAQ Component</span>
    </div>
  ),
}));

jest.mock('@/features/tarot-cards/components/RelatedCards', () => ({
  RelatedCards: ({ cards, locale }: any) => (
    <div data-testid='related-cards'>
      <h2>Related Cards</h2>
      <span data-locale={locale}>Related Cards Component</span>
    </div>
  ),
}));

// Mock CardSEO
jest.mock('@/features/tarot-cards/lib/card-seo', () => ({
  CardSEO: {
    generateStructuredData: jest.fn(() => ({ '@type': 'Article' })),
    generateFAQStructuredData: jest.fn(() => ({ '@type': 'FAQPage' })),
    generateBreadcrumbStructuredData: jest.fn(() => ({
      '@type': 'BreadcrumbList',
    })),
  },
}));

describe('CardPage', () => {
  const mockCard: TarotCard = {
    id: 'the-fool',
    name: 'Joker',
    nameEn: 'The Fool',
    nameSr: 'Budala',
    slug: 'joker',
    slugEn: 'the-fool',
    slugSr: 'budala',
    imageUrl: '/cards/rws/TheFool.jpg',
    arcanaType: 'major',
    number: 0,
    suit: null,
    element: 'Air',
    planet: 'Uranus',
    zodiac: 'Aquarius',
    keywords: ['new beginnings', 'innocence', 'spontaneity'],
    description: 'The Fool represents new beginnings and infinite potential.',
    uprightMeaning:
      'New beginnings, spontaneity, innocence, and infinite potential await you.',
    reversedMeaning:
      'Recklessness, lack of direction, and missed opportunities.',
    keywords: [
      'new beginnings',
      'innocence',
      'spontaneity',
      'potential',
      'freedom',
    ],
    relatedCards: ['the-magician', 'the-world'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockContent: CardContent = {
    id: 'the-fool-content',
    cardId: 'the-fool',
    locale: 'tr',
    title: 'Joker Kartı',
    description:
      'Joker kartı yeni başlangıçları ve sonsuz potansiyeli temsil eder.',
    uprightMeaning:
      'Yeni başlangıçlar, spontanlık, masumiyet ve sonsuz potansiyel sizi bekliyor.',
    reversedMeaning: 'Düşüncesizlik, yön eksikliği ve kaçırılan fırsatlar.',
    keywords: [
      'yeni başlangıçlar',
      'masumiyet',
      'spontanlık',
      'potansiyel',
      'özgürlük',
    ],
    loveInterpretation: 'Aşk hayatınızda yeni bir başlangıç yapma zamanı.',
    careerInterpretation: 'Kariyerinizde yeni fırsatlar ve yollar açılacak.',
    moneyInterpretation:
      'Finansal konularda dikkatli olun, yeni yatırımlar yapabilirsiniz.',
    spiritualInterpretation: 'Ruhsal yolculuğunuzda yeni bir dönem başlıyor.',
    story: 'Joker kartı, masumiyet ve yeni başlangıçların sembolüdür.',
    readingTime: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSEO: CardSEO = {
    id: 'the-fool-seo',
    cardId: 'the-fool',
    locale: 'tr',
    metaTitle: 'Joker Kartı - Tarot Anlamları ve Yorumları',
    metaDescription:
      'Joker kartının anlamları, yorumları ve tarot okumalarında nasıl yorumlanacağı hakkında detaylı bilgiler.',
    keywords: ['joker kartı', 'tarot', 'anlamlar', 'yorumlar'],
    faq: [
      {
        question: 'Joker kartı ne anlama gelir?',
        answer:
          'Joker kartı yeni başlangıçları, masumiyeti ve sonsuz potansiyeli temsil eder.',
      },
    ],
    structuredData: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRelatedCards: TarotCard[] = [
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
  ];

  const mockCardPageData: CardPageData = {
    card: mockCard,
    content: mockContent,
    seo: mockSEO,
    relatedCards: mockRelatedCards,
  };

  it('renders all child components', () => {
    render(<CardPage card={mockCardPageData} locale='tr' />);

    expect(screen.getByTestId('card-hero')).toBeInTheDocument();
    expect(screen.getByTestId('card-meanings')).toBeInTheDocument();
    expect(screen.getByTestId('card-keywords')).toBeInTheDocument();
    expect(screen.getByTestId('card-story')).toBeInTheDocument();
    expect(screen.getByTestId('card-faq')).toBeInTheDocument();
    expect(screen.getByTestId('card-cta')).toBeInTheDocument();
    expect(screen.getByTestId('related-cards')).toBeInTheDocument();
  });

  it('passes correct props to CardHero component', () => {
    render(<CardPage card={mockCardPageData} locale='tr' />);

    const heroComponent = screen.getByTestId('card-hero');
    expect(heroComponent).toHaveTextContent('Joker - Joker Kartı');
    expect(
      heroComponent.querySelector('[data-locale="tr"]')
    ).toBeInTheDocument();
  });

  it('passes correct props to CardMeanings component', () => {
    render(<CardPage card={mockCardPageData} locale='tr' />);

    const meaningsComponent = screen.getByTestId('card-meanings');
    expect(
      meaningsComponent.querySelector('[data-locale="tr"]')
    ).toBeInTheDocument();
  });

  it('passes correct props to CardKeywords component', () => {
    render(<CardPage card={mockCardPageData} locale='tr' />);

    const keywordsComponent = screen.getByTestId('card-keywords');
    expect(
      keywordsComponent.querySelector('[data-locale="tr"]')
    ).toBeInTheDocument();
  });

  it('passes correct props to CardStory component', () => {
    render(<CardPage card={mockCardPageData} locale='tr' />);

    const storyComponent = screen.getByTestId('card-story');
    expect(
      storyComponent.querySelector('[data-locale="tr"]')
    ).toBeInTheDocument();
  });

  it('passes correct props to CardFAQ component', () => {
    render(<CardPage card={mockCardPageData} locale='tr' />);

    const faqComponent = screen.getByTestId('card-faq');
    expect(
      faqComponent.querySelector('[data-locale="tr"]')
    ).toBeInTheDocument();
  });

  it('passes correct props to CardCTA component', () => {
    render(<CardPage card={mockCardPageData} locale='tr' />);

    const ctaComponent = screen.getByTestId('card-cta');
    expect(
      ctaComponent.querySelector('[data-locale="tr"]')
    ).toBeInTheDocument();
  });

  it('passes correct props to RelatedCards component', () => {
    render(<CardPage card={mockCardPageData} locale='tr' />);

    const relatedCardsComponent = screen.getByTestId('related-cards');
    expect(
      relatedCardsComponent.querySelector('[data-locale="tr"]')
    ).toBeInTheDocument();
  });

  it('renders structured data scripts', () => {
    const { container } = render(
      <CardPage card={mockCardPageData} locale='tr' />
    );

    const structuredDataScripts = container.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(structuredDataScripts).toHaveLength(3);
  });

  it('applies correct CSS classes for layout', () => {
    const { container } = render(
      <CardPage card={mockCardPageData} locale='tr' />
    );

    expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
    expect(container.querySelector('.bg-white')).toBeInTheDocument();
  });

  it('renders components in correct order', () => {
    render(<CardPage card={mockCardPageData} locale='tr' />);

    const components = screen.getAllByTestId(/card-/);
    expect(components[0]).toHaveAttribute('data-testid', 'card-hero');
    expect(components[1]).toHaveAttribute('data-testid', 'card-meanings');
    expect(components[2]).toHaveAttribute('data-testid', 'card-keywords');
    expect(components[3]).toHaveAttribute('data-testid', 'card-story');
    expect(components[4]).toHaveAttribute('data-testid', 'card-faq');
    expect(components[5]).toHaveAttribute('data-testid', 'card-cta');
    expect(components[6]).toHaveAttribute('data-testid', 'related-cards');
  });

  it('handles different locales correctly', () => {
    render(<CardPage card={mockCardPageData} locale='en' />);

    const heroComponent = screen.getByTestId('card-hero');
    expect(
      heroComponent.querySelector('[data-locale="en"]')
    ).toBeInTheDocument();
  });

  it('handles Serbian locale correctly', () => {
    render(<CardPage card={mockCardPageData} locale='sr' />);

    const heroComponent = screen.getByTestId('card-hero');
    expect(
      heroComponent.querySelector('[data-locale="sr"]')
    ).toBeInTheDocument();
  });

  it('renders structured data with correct content', () => {
    const { container } = render(
      <CardPage card={mockCardPageData} locale='tr' />
    );

    const structuredDataScripts = container.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    // Check that structured data scripts contain JSON
    structuredDataScripts.forEach(script => {
      expect(script.textContent).toBeTruthy();
    });
  });

  it('passes all required data to child components', () => {
    render(<CardPage card={mockCardPageData} locale='tr' />);

    // Verify that all components are rendered with data
    expect(screen.getByText('Joker - Joker Kartı')).toBeInTheDocument();
    expect(screen.getByText('Meanings')).toBeInTheDocument();
    expect(screen.getByText('Keywords')).toBeInTheDocument();
    expect(screen.getByText('Story')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('CTA')).toBeInTheDocument();
    expect(screen.getByText('Related Cards')).toBeInTheDocument();
  });
});
