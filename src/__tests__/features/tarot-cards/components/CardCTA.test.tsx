import { render, screen } from '@testing-library/react';
import { CardCTA } from '@/features/tarot-cards/components/CardCTA';
import { TarotCard } from '@/types/tarot-cards';

describe('CardCTA', () => {
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

  it('renders CTA header with correct title for Turkish locale', () => {
    render(<CardCTA card={mockCard} locale='tr' />);

    expect(screen.getByText('Kartınızı Çekin ve Keşfedin')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Ücretsiz tarot okuması ile kendi kartlarınızı çekin ve geleceğinizi keşfedin/
      )
    ).toBeInTheDocument();
  });

  it('renders CTA header with correct title for English locale', () => {
    render(<CardCTA card={mockCard} locale='en' />);

    expect(screen.getByText('Draw Your Card and Discover')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Draw your own cards with a free tarot reading and discover your future/
      )
    ).toBeInTheDocument();
  });

  it('renders CTA header with correct title for Serbian locale', () => {
    render(<CardCTA card={mockCard} locale='sr' />);

    expect(screen.getByText('Izvuci Svoju Kartu i Otkrij')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Izvuci svoje karte besplatnim tarot čitanjem i otkrij svoju budućnost/
      )
    ).toBeInTheDocument();
  });

  it('renders free tarot reading section with correct content for Turkish locale', () => {
    render(<CardCTA card={mockCard} locale='tr' />);

    expect(screen.getByText('Ücretsiz Tarot Okuması')).toBeInTheDocument();
    expect(
      screen.getByText(/3 kart açılımı ile geleceğinizi keşfedin/)
    ).toBeInTheDocument();
    expect(screen.getByText('Hemen Başla')).toBeInTheDocument();
  });

  it('renders free tarot reading section with correct content for English locale', () => {
    render(<CardCTA card={mockCard} locale='en' />);

    expect(screen.getByText('Free Tarot Reading')).toBeInTheDocument();
    expect(
      screen.getByText(/Discover your future with a 3-card spread/)
    ).toBeInTheDocument();
    expect(screen.getByText('Start Now')).toBeInTheDocument();
  });

  it('renders free tarot reading section with correct content for Serbian locale', () => {
    render(<CardCTA card={mockCard} locale='sr' />);

    expect(screen.getByText('Besplatno Tarot Čitanje')).toBeInTheDocument();
    expect(
      screen.getByText(/Otkrij svoju budućnost sa 3-kartnim rasporedom/)
    ).toBeInTheDocument();
    expect(screen.getByText('Počni Sada')).toBeInTheDocument();
  });

  it('renders love tarot reading section with correct content for Turkish locale', () => {
    render(<CardCTA card={mockCard} locale='tr' />);

    expect(screen.getByText('Aşk Tarot Okuması')).toBeInTheDocument();
    expect(
      screen.getByText(/Aşk hayatınız hakkında özel yorumlar/)
    ).toBeInTheDocument();
    expect(screen.getByText('Aşk Okuması')).toBeInTheDocument();
  });

  it('renders love tarot reading section with correct content for English locale', () => {
    render(<CardCTA card={mockCard} locale='en' />);

    expect(screen.getByText('Love Tarot Reading')).toBeInTheDocument();
    expect(
      screen.getByText(/Special insights about your love life/)
    ).toBeInTheDocument();
    expect(screen.getByText('Love Reading')).toBeInTheDocument();
  });

  it('renders love tarot reading section with correct content for Serbian locale', () => {
    render(<CardCTA card={mockCard} locale='sr' />);

    expect(screen.getByText('Ljubavno Tarot Čitanje')).toBeInTheDocument();
    expect(
      screen.getByText(/Posebni uvid u vaš ljubavni život/)
    ).toBeInTheDocument();
    expect(screen.getByText('Ljubavno Čitanje')).toBeInTheDocument();
  });

  it('renders additional features with correct titles for Turkish locale', () => {
    render(<CardCTA card={mockCard} locale='tr' />);

    expect(screen.getByText('Ücretsiz')).toBeInTheDocument();
    expect(screen.getByText('Hızlı')).toBeInTheDocument();
    expect(screen.getByText('Gizli')).toBeInTheDocument();
    expect(screen.getByText(/Hiçbir ücret yok/)).toBeInTheDocument();
    expect(screen.getByText(/Anında sonuç/)).toBeInTheDocument();
    expect(screen.getByText(/Kişisel gizlilik/)).toBeInTheDocument();
  });

  it('renders additional features with correct titles for English locale', () => {
    render(<CardCTA card={mockCard} locale='en' />);

    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('Private')).toBeInTheDocument();
    expect(screen.getByText(/No cost/)).toBeInTheDocument();
    expect(screen.getByText(/Instant results/)).toBeInTheDocument();
    expect(screen.getByText(/Personal privacy/)).toBeInTheDocument();
  });

  it('renders additional features with correct titles for Serbian locale', () => {
    render(<CardCTA card={mockCard} locale='sr' />);

    expect(screen.getByText('Besplatno')).toBeInTheDocument();
    expect(screen.getByText('Brzo')).toBeInTheDocument();
    expect(screen.getByText('Privatno')).toBeInTheDocument();
    expect(screen.getByText(/Bez troškova/)).toBeInTheDocument();
    expect(screen.getByText(/Trenutni rezultati/)).toBeInTheDocument();
    expect(screen.getByText(/Lična privatnost/)).toBeInTheDocument();
  });

  it('renders correct links for free tarot reading', () => {
    render(<CardCTA card={mockCard} locale='tr' />);

    const freeReadingLink = screen.getByRole('link', { name: /Hemen Başla/ });
    expect(freeReadingLink).toHaveAttribute('href', '/tr/tarot-okumasi');
  });

  it('renders correct links for love tarot reading', () => {
    render(<CardCTA card={mockCard} locale='tr' />);

    const loveReadingLink = screen.getByRole('link', { name: /Aşk Okuması/ });
    expect(loveReadingLink).toHaveAttribute('href', '/tr/ask-tarot-okumasi');
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<CardCTA card={mockCard} locale='tr' />);

    expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
    expect(container.querySelector('.from-purple-900')).toBeInTheDocument();
    expect(container.querySelector('.via-blue-900')).toBeInTheDocument();
    expect(container.querySelector('.to-indigo-900')).toBeInTheDocument();
    expect(container.querySelector('.text-white')).toBeInTheDocument();
    expect(container.querySelector('.bg-white\\/10')).toBeInTheDocument();
    expect(container.querySelector('.backdrop-blur-sm')).toBeInTheDocument();
  });

  it('displays correct icons for sections', () => {
    render(<CardCTA card={mockCard} locale='tr' />);

    expect(screen.getByText('🔮')).toBeInTheDocument();
    expect(screen.getByText('💕')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument();
    expect(screen.getByText('🔒')).toBeInTheDocument();
  });

  it('renders CTA buttons with hover effects', () => {
    const { container } = render(<CardCTA card={mockCard} locale='tr' />);

    const ctaButtons = container.querySelectorAll(
      '.hover\\:bg-yellow-600, .hover\\:bg-pink-600'
    );
    expect(ctaButtons).toHaveLength(2);
  });

  it('renders grid layout for CTA buttons', () => {
    const { container } = render(<CardCTA card={mockCard} locale='tr' />);

    const ctaGrid = container.querySelector(
      '.grid.grid-cols-1.md\\:grid-cols-2'
    );
    expect(ctaGrid).toBeInTheDocument();
  });

  it('renders grid layout for additional features', () => {
    const { container } = render(<CardCTA card={mockCard} locale='tr' />);

    const featuresGrid = container.querySelector(
      '.grid.grid-cols-1.md\\:grid-cols-3'
    );
    expect(featuresGrid).toBeInTheDocument();
  });
});
