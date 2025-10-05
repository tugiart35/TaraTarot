import { render, screen } from '@testing-library/react';
import { CardStory } from '@/features/tarot-cards/components/CardStory';
import { CardContent } from '@/types/tarot-cards';

describe('CardStory', () => {
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
    story:
      'Joker kartı, masumiyet ve yeni başlangıçların sembolüdür. Bu kart, ruhsal yolculuğun başlangıcını temsil eder ve sonsuz potansiyeli ifade eder.',
    readingTime: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('renders section header with correct title for Turkish locale', () => {
    render(<CardStory content={mockContent} locale='tr' />);

    expect(screen.getByText('Kartın Hikayesi')).toBeInTheDocument();
    expect(
      screen.getByText(/Bu kartın kökeni, mitolojisi ve tarihsel anlamı/)
    ).toBeInTheDocument();
  });

  it('renders section header with correct title for English locale', () => {
    render(<CardStory content={mockContent} locale='en' />);

    expect(screen.getByText('Card Story')).toBeInTheDocument();
    expect(
      screen.getByText(
        /The origin, mythology and historical meaning of this card/
      )
    ).toBeInTheDocument();
  });

  it('renders section header with correct title for Serbian locale', () => {
    render(<CardStory content={mockContent} locale='sr' />);

    expect(screen.getByText('Priča Karte')).toBeInTheDocument();
    expect(
      screen.getByText(/Poreklo, mitologija i istorijsko značenje ove karte/)
    ).toBeInTheDocument();
  });

  it('displays the story content', () => {
    render(<CardStory content={mockContent} locale='tr' />);

    expect(screen.getByText(mockContent.story)).toBeInTheDocument();
  });

  it('renders historical context section with correct titles for Turkish locale', () => {
    render(<CardStory content={mockContent} locale='tr' />);

    expect(screen.getByText('Tarihsel Köken')).toBeInTheDocument();
    expect(screen.getByText('Mistik Anlam')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Bu kartın tarihsel gelişimi ve kökeni hakkında bilgiler/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Kartın mistik ve ruhsal boyutları/)
    ).toBeInTheDocument();
  });

  it('renders historical context section with correct titles for English locale', () => {
    render(<CardStory content={mockContent} locale='en' />);

    expect(screen.getByText('Historical Origin')).toBeInTheDocument();
    expect(screen.getByText('Mystical Meaning')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Information about the historical development and origin of this card/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The mystical and spiritual dimensions of the card/)
    ).toBeInTheDocument();
  });

  it('renders historical context section with correct titles for Serbian locale', () => {
    render(<CardStory content={mockContent} locale='sr' />);

    expect(screen.getByText('Istorijsko Poreklo')).toBeInTheDocument();
    expect(screen.getByText('Mističko Značenje')).toBeInTheDocument();
    expect(
      screen.getByText(/Informacije o istorijskom razvoju i poreklu ove karte/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Mističke i duhovne dimenzije karte/)
    ).toBeInTheDocument();
  });

  it('renders cultural significance section with correct title for Turkish locale', () => {
    render(<CardStory content={mockContent} locale='tr' />);

    expect(screen.getByText('Kültürel Önem')).toBeInTheDocument();
    expect(
      screen.getByText(/Bu kartın farklı kültürlerdeki yeri ve önemi/)
    ).toBeInTheDocument();
  });

  it('renders cultural significance section with correct title for English locale', () => {
    render(<CardStory content={mockContent} locale='en' />);

    expect(screen.getByText('Cultural Significance')).toBeInTheDocument();
    expect(
      screen.getByText(
        /The place and importance of this card in different cultures/
      )
    ).toBeInTheDocument();
  });

  it('renders cultural significance section with correct title for Serbian locale', () => {
    render(<CardStory content={mockContent} locale='sr' />);

    expect(screen.getByText('Kulturni Značaj')).toBeInTheDocument();
    expect(
      screen.getByText(/Mesto i važnost ove karte u različitim kulturama/)
    ).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(
      <CardStory content={mockContent} locale='tr' />
    );

    expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
    expect(container.querySelector('.from-indigo-50')).toBeInTheDocument();
    expect(container.querySelector('.to-purple-50')).toBeInTheDocument();
    expect(container.querySelector('.bg-white')).toBeInTheDocument();
    expect(container.querySelector('.rounded-2xl')).toBeInTheDocument();
    expect(container.querySelector('.shadow-xl')).toBeInTheDocument();
  });

  it('displays correct icons for sections', () => {
    render(<CardStory content={mockContent} locale='tr' />);

    expect(screen.getByText('📖')).toBeInTheDocument();
    expect(screen.getByText('🏛️')).toBeInTheDocument();
    expect(screen.getByText('🔮')).toBeInTheDocument();
    expect(screen.getByText('🌍')).toBeInTheDocument();
  });

  it('renders story content in a gradient background', () => {
    const { container } = render(
      <CardStory content={mockContent} locale='tr' />
    );

    const storyContent = container.querySelector(
      '.bg-gradient-to-r.from-purple-100.to-indigo-100'
    );
    expect(storyContent).toBeInTheDocument();
  });

  it('renders historical context in a grid layout', () => {
    const { container } = render(
      <CardStory content={mockContent} locale='tr' />
    );

    const historicalGrid = container.querySelector(
      '.grid.grid-cols-1.md\\:grid-cols-2'
    );
    expect(historicalGrid).toBeInTheDocument();
  });

  it('applies correct background colors for different sections', () => {
    const { container } = render(
      <CardStory content={mockContent} locale='tr' />
    );

    expect(container.querySelector('.bg-purple-50')).toBeInTheDocument();
    expect(container.querySelector('.bg-indigo-50')).toBeInTheDocument();
    expect(
      container.querySelector('.bg-gradient-to-r.from-yellow-50.to-orange-50')
    ).toBeInTheDocument();
  });

  it('renders prose styling for story content', () => {
    const { container } = render(
      <CardStory content={mockContent} locale='tr' />
    );

    const proseElement = container.querySelector('.prose.prose-lg.prose-gray');
    expect(proseElement).toBeInTheDocument();
  });
});
