import { render, screen } from '@testing-library/react';
import { CardMeanings } from '@/features/tarot-cards/components/CardMeanings';
import { CardContent } from '@/types/tarot-cards';

describe('CardMeanings', () => {
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
    render(<CardMeanings content={mockContent} locale='tr' />);

    expect(screen.getByText('Kart Anlamları')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Bu kartın farklı yaşam alanlarındaki anlamlarını keşfedin/
      )
    ).toBeInTheDocument();
  });

  it('renders section header with correct title for English locale', () => {
    render(<CardMeanings content={mockContent} locale='en' />);

    expect(screen.getByText('Card Meanings')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Discover the meanings of this card in different areas of life/
      )
    ).toBeInTheDocument();
  });

  it('renders section header with correct title for Serbian locale', () => {
    render(<CardMeanings content={mockContent} locale='sr' />);

    expect(screen.getByText('Značenja Karte')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Otkrijte značenja ove karte u različitim oblastima života/
      )
    ).toBeInTheDocument();
  });

  it('displays upright and reversed meanings', () => {
    render(<CardMeanings content={mockContent} locale='tr' />);

    expect(screen.getByText('Düz Pozisyon')).toBeInTheDocument();
    expect(screen.getByText('Ters Pozisyon')).toBeInTheDocument();
    expect(screen.getByText(mockContent.uprightMeaning)).toBeInTheDocument();
    expect(screen.getByText(mockContent.reversedMeaning)).toBeInTheDocument();
  });

  it('displays life area interpretations with correct icons and titles', () => {
    render(<CardMeanings content={mockContent} locale='tr' />);

    expect(screen.getByText('Aşk')).toBeInTheDocument();
    expect(screen.getByText('Kariyer')).toBeInTheDocument();
    expect(screen.getByText('Para')).toBeInTheDocument();
    expect(screen.getByText('Ruhsal')).toBeInTheDocument();

    expect(
      screen.getByText(mockContent.loveInterpretation)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockContent.careerInterpretation)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockContent.moneyInterpretation)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockContent.spiritualInterpretation)
    ).toBeInTheDocument();
  });

  it('renders correct titles for English locale', () => {
    render(<CardMeanings content={mockContent} locale='en' />);

    expect(screen.getByText('Love')).toBeInTheDocument();
    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('Money')).toBeInTheDocument();
    expect(screen.getByText('Spiritual')).toBeInTheDocument();
    expect(screen.getByText('Upright Position')).toBeInTheDocument();
    expect(screen.getByText('Reversed Position')).toBeInTheDocument();
  });

  it('renders correct titles for Serbian locale', () => {
    render(<CardMeanings content={mockContent} locale='sr' />);

    expect(screen.getByText('Ljubav')).toBeInTheDocument();
    expect(screen.getByText('Karijera')).toBeInTheDocument();
    expect(screen.getByText('Novac')).toBeInTheDocument();
    expect(screen.getByText('Duhovno')).toBeInTheDocument();
    expect(screen.getByText('Uspravna Pozicija')).toBeInTheDocument();
    expect(screen.getByText('Obrnuta Pozicija')).toBeInTheDocument();
  });

  it('displays story section with correct title for Turkish locale', () => {
    render(<CardMeanings content={mockContent} locale='tr' />);

    expect(screen.getByText('Kart Hakkında')).toBeInTheDocument();
    expect(screen.getByText(mockContent.story)).toBeInTheDocument();
  });

  it('displays story section with correct title for English locale', () => {
    render(<CardMeanings content={mockContent} locale='en' />);

    expect(screen.getByText('About This Card')).toBeInTheDocument();
  });

  it('displays story section with correct title for Serbian locale', () => {
    render(<CardMeanings content={mockContent} locale='sr' />);

    expect(screen.getByText('O Ovoj Karti')).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(
      <CardMeanings content={mockContent} locale='tr' />
    );

    expect(container.querySelector('.bg-gray-50')).toBeInTheDocument();
    expect(container.querySelector('.border-green-500')).toBeInTheDocument();
    expect(container.querySelector('.border-red-500')).toBeInTheDocument();
    expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
  });

  it('renders interpretation cards with hover effects', () => {
    const { container } = render(
      <CardMeanings content={mockContent} locale='tr' />
    );

    const interpretationCards =
      container.querySelectorAll('.hover\\:shadow-xl');
    expect(interpretationCards).toHaveLength(4);
  });

  it('displays correct emoji icons for life areas', () => {
    render(<CardMeanings content={mockContent} locale='tr' />);

    expect(screen.getByText('💕')).toBeInTheDocument();
    expect(screen.getByText('💼')).toBeInTheDocument();
    expect(screen.getByText('💰')).toBeInTheDocument();
    expect(screen.getByText('🕊️')).toBeInTheDocument();
  });

  it('displays correct emoji icons for upright and reversed positions', () => {
    render(<CardMeanings content={mockContent} locale='tr' />);

    expect(screen.getByText('☀️')).toBeInTheDocument();
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });
});
