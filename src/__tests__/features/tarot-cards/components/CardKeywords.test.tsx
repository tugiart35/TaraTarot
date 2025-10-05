import { render, screen } from '@testing-library/react';
import { CardKeywords } from '@/features/tarot-cards/components/CardKeywords';
import { CardContent } from '@/types/tarot-cards';

describe('CardKeywords', () => {
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

  it('renders section header with correct title for Turkish locale', () => {
    render(<CardKeywords content={mockContent} locale='tr' />);

    expect(screen.getByText('Anahtar Kelimeler')).toBeInTheDocument();
    expect(
      screen.getByText(/Bu kartla ilişkili temel kavramlar ve enerjiler/)
    ).toBeInTheDocument();
  });

  it('renders section header with correct title for English locale', () => {
    render(<CardKeywords content={mockContent} locale='en' />);

    expect(screen.getByText('Keywords')).toBeInTheDocument();
    expect(
      screen.getByText(/Core concepts and energies associated with this card/)
    ).toBeInTheDocument();
  });

  it('renders section header with correct title for Serbian locale', () => {
    render(<CardKeywords content={mockContent} locale='sr' />);

    expect(screen.getByText('Ključne Reči')).toBeInTheDocument();
    expect(
      screen.getByText(/Osnovni koncepti i energije povezane sa ovom kartom/)
    ).toBeInTheDocument();
  });

  it('displays all keywords as badges', () => {
    render(<CardKeywords content={mockContent} locale='tr' />);

    expect(screen.getByText('yeni başlangıçlar')).toBeInTheDocument();
    expect(screen.getByText('masumiyet')).toBeInTheDocument();
    expect(screen.getByText('spontanlık')).toBeInTheDocument();
    expect(screen.getByText('potansiyel')).toBeInTheDocument();
    expect(screen.getByText('özgürlük')).toBeInTheDocument();
  });

  it('renders keyword categories with correct titles for Turkish locale', () => {
    render(<CardKeywords content={mockContent} locale='tr' />);

    expect(screen.getByText('Pozitif Enerjiler')).toBeInTheDocument();
    expect(screen.getByText('Denge')).toBeInTheDocument();
    expect(screen.getByText('Ruhsal Yön')).toBeInTheDocument();
  });

  it('renders keyword categories with correct titles for English locale', () => {
    render(<CardKeywords content={mockContent} locale='en' />);

    expect(screen.getByText('Positive Energies')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('Spiritual Aspect')).toBeInTheDocument();
  });

  it('renders keyword categories with correct titles for Serbian locale', () => {
    render(<CardKeywords content={mockContent} locale='sr' />);

    expect(screen.getByText('Pozitivne Energije')).toBeInTheDocument();
    expect(screen.getByText('Ravnoteža')).toBeInTheDocument();
    expect(screen.getByText('Duhovni Aspekt')).toBeInTheDocument();
  });

  it('displays category descriptions for Turkish locale', () => {
    render(<CardKeywords content={mockContent} locale='tr' />);

    expect(
      screen.getByText(/Kartın olumlu yönlerini temsil eden kelimeler/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Kartın denge ve uyum yönlerini gösteren kelimeler/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Kartın ruhsal ve mistik yönlerini ifade eden kelimeler/)
    ).toBeInTheDocument();
  });

  it('displays category descriptions for English locale', () => {
    render(<CardKeywords content={mockContent} locale='en' />);

    expect(
      screen.getByText(/Words representing the positive aspects of the card/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Words showing the balance and harmony aspects of the card/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Words expressing the spiritual and mystical aspects of the card/
      )
    ).toBeInTheDocument();
  });

  it('displays category descriptions for Serbian locale', () => {
    render(<CardKeywords content={mockContent} locale='sr' />);

    expect(
      screen.getByText(/Reči koje predstavljaju pozitivne aspekte karte/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Reči koje pokazuju aspekte ravnoteže i harmonije karte/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Reči koje izražavaju duhovne i mistične aspekte karte/)
    ).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(
      <CardKeywords content={mockContent} locale='tr' />
    );

    expect(container.querySelector('.bg-white')).toBeInTheDocument();
    expect(container.querySelector('.bg-gradient-to-r')).toBeInTheDocument();
    expect(container.querySelector('.from-purple-500')).toBeInTheDocument();
    expect(container.querySelector('.to-blue-500')).toBeInTheDocument();
    expect(container.querySelector('.bg-purple-50')).toBeInTheDocument();
    expect(container.querySelector('.bg-blue-50')).toBeInTheDocument();
    expect(container.querySelector('.bg-indigo-50')).toBeInTheDocument();
  });

  it('renders keyword badges with hover effects', () => {
    const { container } = render(
      <CardKeywords content={mockContent} locale='tr' />
    );

    const keywordBadges = container.querySelectorAll('.hover\\:scale-105');
    expect(keywordBadges).toHaveLength(mockContent.keywords.length);
  });

  it('displays correct icons for categories', () => {
    render(<CardKeywords content={mockContent} locale='tr' />);

    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('⚖️')).toBeInTheDocument();
    expect(screen.getByText('🔮')).toBeInTheDocument();
  });

  it('renders keywords in a flex wrap layout', () => {
    const { container } = render(
      <CardKeywords content={mockContent} locale='tr' />
    );

    const keywordsContainer = container.querySelector(
      '.flex.flex-wrap.justify-center'
    );
    expect(keywordsContainer).toBeInTheDocument();
  });

  it('renders category grid with correct layout', () => {
    const { container } = render(
      <CardKeywords content={mockContent} locale='tr' />
    );

    const categoryGrid = container.querySelector(
      '.grid.grid-cols-1.md\\:grid-cols-3'
    );
    expect(categoryGrid).toBeInTheDocument();
  });
});
