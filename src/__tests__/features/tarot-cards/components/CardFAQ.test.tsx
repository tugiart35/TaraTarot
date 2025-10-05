import { render, screen } from '@testing-library/react';
import { CardFAQ } from '@/features/tarot-cards/components/CardFAQ';
import { CardSEO } from '@/types/tarot-cards';

describe('CardFAQ', () => {
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
      {
        question: 'Joker kartı ters geldiğinde ne anlama gelir?',
        answer:
          'Ters Joker kartı düşüncesizlik, yön eksikliği ve kaçırılan fırsatları işaret eder.',
      },
      {
        question: 'Joker kartı aşk okumalarında nasıl yorumlanır?',
        answer:
          'Aşk okumalarında Joker kartı yeni bir ilişkinin başlangıcını veya mevcut ilişkide yeni bir dönem başlangıcını gösterebilir.',
      },
    ],
    structuredData: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('renders section header with correct title for Turkish locale', () => {
    render(<CardFAQ seo={mockSEO} locale='tr' />);

    expect(screen.getByText('Sıkça Sorulan Sorular')).toBeInTheDocument();
    expect(
      screen.getByText(/Bu kart hakkında merak edilenler/)
    ).toBeInTheDocument();
  });

  it('renders section header with correct title for English locale', () => {
    render(<CardFAQ seo={mockSEO} locale='en' />);

    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(
      screen.getByText(/Common questions about this card/)
    ).toBeInTheDocument();
  });

  it('renders section header with correct title for Serbian locale', () => {
    render(<CardFAQ seo={mockSEO} locale='sr' />);

    expect(screen.getByText('Često Postavljana Pitanja')).toBeInTheDocument();
    expect(screen.getByText(/Česta pitanja o ovoj karti/)).toBeInTheDocument();
  });

  it('renders all FAQ questions and answers', () => {
    render(<CardFAQ seo={mockSEO} locale='tr' />);

    expect(
      screen.getByText('Joker kartı ne anlama gelir?')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Joker kartı ters geldiğinde ne anlama gelir?')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Joker kartı aşk okumalarında nasıl yorumlanır?')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Joker kartı yeni başlangıçları, masumiyeti ve sonsuz potansiyeli temsil eder/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Ters Joker kartı düşüncesizlik, yön eksikliği ve kaçırılan fırsatları işaret eder/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Aşk okumalarında Joker kartı yeni bir ilişkinin başlangıcını veya mevcut ilişkide yeni bir dönem başlangıcını gösterebilir/
      )
    ).toBeInTheDocument();
  });

  it('renders additional help section with correct title for Turkish locale', () => {
    render(<CardFAQ seo={mockSEO} locale='tr' />);

    expect(screen.getByText('Başka Sorularınız mı Var?')).toBeInTheDocument();
    expect(
      screen.getByText(/Tarot okuması yaparak daha fazla bilgi edinebilirsiniz/)
    ).toBeInTheDocument();
    expect(screen.getByText('Tarot Okuması Yap')).toBeInTheDocument();
  });

  it('renders additional help section with correct title for English locale', () => {
    render(<CardFAQ seo={mockSEO} locale='en' />);

    expect(screen.getByText('Have More Questions?')).toBeInTheDocument();
    expect(
      screen.getByText(/You can get more information by doing a tarot reading/)
    ).toBeInTheDocument();
    expect(screen.getByText('Do Tarot Reading')).toBeInTheDocument();
  });

  it('renders additional help section with correct title for Serbian locale', () => {
    render(<CardFAQ seo={mockSEO} locale='sr' />);

    expect(screen.getByText('Imate Još Pitanja?')).toBeInTheDocument();
    expect(
      screen.getByText(/Možete dobiti više informacija radeći tarot čitanje/)
    ).toBeInTheDocument();
    expect(screen.getByText('Napravi Tarot Čitanje')).toBeInTheDocument();
  });

  it('renders correct link for tarot reading', () => {
    render(<CardFAQ seo={mockSEO} locale='tr' />);

    const tarotReadingLink = screen.getByRole('link', {
      name: /Tarot Okuması Yap/,
    });
    expect(tarotReadingLink).toHaveAttribute('href', '/tr/tarot-okumasi');
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<CardFAQ seo={mockSEO} locale='tr' />);

    expect(container.querySelector('.bg-gray-50')).toBeInTheDocument();
    expect(container.querySelector('.bg-white')).toBeInTheDocument();
    expect(container.querySelector('.rounded-lg')).toBeInTheDocument();
    expect(container.querySelector('.shadow-md')).toBeInTheDocument();
    expect(container.querySelector('.shadow-lg')).toBeInTheDocument();
  });

  it('renders FAQ items as details elements', () => {
    const { container } = render(<CardFAQ seo={mockSEO} locale='tr' />);

    const detailsElements = container.querySelectorAll('details');
    expect(detailsElements).toHaveLength(mockSEO.faq.length);
  });

  it('renders FAQ items with hover effects', () => {
    const { container } = render(<CardFAQ seo={mockSEO} locale='tr' />);

    const hoverElements = container.querySelectorAll('.hover\\:bg-gray-50');
    expect(hoverElements).toHaveLength(mockSEO.faq.length);
  });

  it('displays correct icon for additional help section', () => {
    render(<CardFAQ seo={mockSEO} locale='tr' />);

    expect(screen.getByText('❓')).toBeInTheDocument();
  });

  it('renders FAQ items with proper structure', () => {
    const { container } = render(<CardFAQ seo={mockSEO} locale='tr' />);

    const summaryElements = container.querySelectorAll('summary');
    expect(summaryElements).toHaveLength(mockSEO.faq.length);

    const answerElements = container.querySelectorAll('.text-gray-700');
    expect(answerElements).toHaveLength(mockSEO.faq.length);
  });

  it('renders chevron icons for FAQ items', () => {
    const { container } = render(<CardFAQ seo={mockSEO} locale='tr' />);

    const chevronIcons = container.querySelectorAll('.group-open\\:rotate-180');
    expect(chevronIcons).toHaveLength(mockSEO.faq.length);
  });

  it('applies correct transition effects', () => {
    const { container } = render(<CardFAQ seo={mockSEO} locale='tr' />);

    const transitionElements = container.querySelectorAll(
      '.transition-colors, .transition-transform'
    );
    expect(transitionElements.length).toBeGreaterThan(0);
  });

  it('renders FAQ items in a space-y layout', () => {
    const { container } = render(<CardFAQ seo={mockSEO} locale='tr' />);

    const spaceYContainer = container.querySelector('.space-y-4');
    expect(spaceYContainer).toBeInTheDocument();
  });
});
