import { notFound } from 'next/navigation';
import CardPage from '@/features/tarot-cards/components/CardPage';
import { CardData } from '@/features/tarot-cards/lib/card-data';
import { CardSEO } from '@/features/tarot-cards/lib/card-seo';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';
import Footer from '@/features/shared/layout/Footer';
import { getTranslations } from 'next-intl/server';
import { logger } from '@/lib/logger';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // English routes only
  const cards = [
    // English Major Arcana
    { locale: 'en', slug: 'the-fool' },
    { locale: 'en', slug: 'the-high-priestess' },
    { locale: 'en', slug: 'the-magician' },
    { locale: 'en', slug: 'the-empress' },
    { locale: 'en', slug: 'the-emperor' },
    { locale: 'en', slug: 'the-hierophant' },
    { locale: 'en', slug: 'the-lovers' },
    { locale: 'en', slug: 'the-chariot' },
    { locale: 'en', slug: 'strength' },
    { locale: 'en', slug: 'the-hermit' },
    { locale: 'en', slug: 'wheel-of-fortune' },
    { locale: 'en', slug: 'justice' },
    { locale: 'en', slug: 'the-hanged-man' },
    { locale: 'en', slug: 'death' },
    { locale: 'en', slug: 'temperance' },
    { locale: 'en', slug: 'the-devil' },
    { locale: 'en', slug: 'the-tower' },
    { locale: 'en', slug: 'the-star' },
    { locale: 'en', slug: 'the-moon' },
    { locale: 'en', slug: 'the-sun' },
    { locale: 'en', slug: 'judgement' },
    { locale: 'en', slug: 'the-world' },

    // Cups suit - English
    { locale: 'en', slug: 'ace-of-cups' },
    { locale: 'en', slug: 'two-of-cups' },
    { locale: 'en', slug: 'three-of-cups' },
    { locale: 'en', slug: 'four-of-cups' },
    { locale: 'en', slug: 'five-of-cups' },
    { locale: 'en', slug: 'six-of-cups' },
    { locale: 'en', slug: 'seven-of-cups' },
    { locale: 'en', slug: 'eight-of-cups' },
    { locale: 'en', slug: 'nine-of-cups' },
    { locale: 'en', slug: 'ten-of-cups' },
    { locale: 'en', slug: 'page-of-cups' },
    { locale: 'en', slug: 'knight-of-cups' },
    { locale: 'en', slug: 'queen-of-cups' },
    { locale: 'en', slug: 'king-of-cups' },

    // Swords suit - English
    { locale: 'en', slug: 'ace-of-swords' },
    { locale: 'en', slug: 'two-of-swords' },
    { locale: 'en', slug: 'three-of-swords' },
    { locale: 'en', slug: 'four-of-swords' },
    { locale: 'en', slug: 'five-of-swords' },
    { locale: 'en', slug: 'six-of-swords' },
    { locale: 'en', slug: 'seven-of-swords' },
    { locale: 'en', slug: 'eight-of-swords' },
    { locale: 'en', slug: 'nine-of-swords' },
    { locale: 'en', slug: 'ten-of-swords' },
    { locale: 'en', slug: 'page-of-swords' },
    { locale: 'en', slug: 'knight-of-swords' },
    { locale: 'en', slug: 'queen-of-swords' },
    { locale: 'en', slug: 'king-of-swords' },

    // Wands suit - English
    { locale: 'en', slug: 'ace-of-wands' },
    { locale: 'en', slug: 'two-of-wands' },
    { locale: 'en', slug: 'three-of-wands' },
    { locale: 'en', slug: 'four-of-wands' },
    { locale: 'en', slug: 'five-of-wands' },
    { locale: 'en', slug: 'six-of-wands' },
    { locale: 'en', slug: 'seven-of-wands' },
    { locale: 'en', slug: 'eight-of-wands' },
    { locale: 'en', slug: 'nine-of-wands' },
    { locale: 'en', slug: 'ten-of-wands' },
    { locale: 'en', slug: 'page-of-wands' },
    { locale: 'en', slug: 'knight-of-wands' },
    { locale: 'en', slug: 'queen-of-wands' },
    { locale: 'en', slug: 'king-of-wands' },

    // Pentacles suit - English
    { locale: 'en', slug: 'ace-of-pentacles' },
    { locale: 'en', slug: 'two-of-pentacles' },
    { locale: 'en', slug: 'three-of-pentacles' },
    { locale: 'en', slug: 'four-of-pentacles' },
    { locale: 'en', slug: 'five-of-pentacles' },
    { locale: 'en', slug: 'six-of-pentacles' },
    { locale: 'en', slug: 'seven-of-pentacles' },
    { locale: 'en', slug: 'eight-of-pentacles' },
    { locale: 'en', slug: 'nine-of-pentacles' },
    { locale: 'en', slug: 'ten-of-pentacles' },
    { locale: 'en', slug: 'page-of-pentacles' },
    { locale: 'en', slug: 'knight-of-pentacles' },
    { locale: 'en', slug: 'queen-of-pentacles' },
    { locale: 'en', slug: 'king-of-pentacles' },
  ];

  return cards;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'cards.errors' });

  try {
    const cardData = await CardData.getCardBySlug(
      slug,
      locale as 'tr' | 'en' | 'sr'
    );
    if (!cardData) {
      return {
        title: t('notFound'),
        description: t('notFoundDescription'),
      };
    }

    return CardSEO.generateMetadata(
      cardData.card,
      cardData.seo,
      locale as 'tr' | 'en' | 'sr'
    );
  } catch (error) {
    logger.error('Error generating metadata for cards route', error);
    return {
      title: t('notFound'),
      description: t('notFoundDescription'),
    };
  }
}

export default async function CardPageRoute({ params }: PageProps) {
  const { locale, slug } = await params;

  try {
    const cardData = await CardData.getCardBySlug(
      slug,
      locale as 'tr' | 'en' | 'sr'
    );

    if (!cardData) {
      notFound();
    }

    return (
      <>
        <CardPage card={cardData} locale={locale as 'tr' | 'en' | 'sr'} />
        <BottomNavigation />
        <Footer />
      </>
    );
  } catch (error) {
    logger.error('Error loading card from cards route', error);
    notFound();
  }
}
