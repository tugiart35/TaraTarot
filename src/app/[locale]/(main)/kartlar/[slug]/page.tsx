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
  // Turkish routes only
  const cards = [
    // Turkish Major Arcana
    { locale: 'tr', slug: 'joker' },
    { locale: 'tr', slug: 'yuksek-rahibe' },
    { locale: 'tr', slug: 'buyucu' },
    { locale: 'tr', slug: 'imparatorice' },
    { locale: 'tr', slug: 'imparator' },
    { locale: 'tr', slug: 'basrahip' },
    { locale: 'tr', slug: 'asiklar' },
    { locale: 'tr', slug: 'savas-arabasi' },
    { locale: 'tr', slug: 'guc' },
    { locale: 'tr', slug: 'ermis' },
    { locale: 'tr', slug: 'kader-carki' },
    { locale: 'tr', slug: 'adalet' },
    { locale: 'tr', slug: 'asili-adam' },
    { locale: 'tr', slug: 'olum' },
    { locale: 'tr', slug: 'olcululuk' },
    { locale: 'tr', slug: 'seytan' },
    { locale: 'tr', slug: 'kule' },
    { locale: 'tr', slug: 'yildiz' },
    { locale: 'tr', slug: 'ay' },
    { locale: 'tr', slug: 'gunes' },
    { locale: 'tr', slug: 'yargi' },
    { locale: 'tr', slug: 'dunya' },

    // Cups suit - Turkish
    { locale: 'tr', slug: 'kupalar-asi' },
    { locale: 'tr', slug: 'kupalar-ikili' },
    { locale: 'tr', slug: 'kupalar-uclu' },
    { locale: 'tr', slug: 'kupalar-dortlu' },
    { locale: 'tr', slug: 'kupalar-besli' },
    { locale: 'tr', slug: 'kupalar-altili' },
    { locale: 'tr', slug: 'kupalar-yedili' },
    { locale: 'tr', slug: 'kupalar-sekizli' },
    { locale: 'tr', slug: 'kupalar-dokuzlu' },
    { locale: 'tr', slug: 'kupalar-onlu' },
    { locale: 'tr', slug: 'kupalar-prensi' },
    { locale: 'tr', slug: 'kupalar-sovalyesi' },
    { locale: 'tr', slug: 'kupalar-kralicesi' },
    { locale: 'tr', slug: 'kupalar-krali' },

    // Swords suit - Turkish
    { locale: 'tr', slug: 'kiliclar-asi' },
    { locale: 'tr', slug: 'kiliclar-ikili' },
    { locale: 'tr', slug: 'kiliclar-uclu' },
    { locale: 'tr', slug: 'kiliclar-dortlu' },
    { locale: 'tr', slug: 'kiliclar-besli' },
    { locale: 'tr', slug: 'kiliclar-altili' },
    { locale: 'tr', slug: 'kiliclar-yedili' },
    { locale: 'tr', slug: 'kiliclar-sekizli' },
    { locale: 'tr', slug: 'kiliclar-dokuzlu' },
    { locale: 'tr', slug: 'kiliclar-onlu' },
    { locale: 'tr', slug: 'kiliclar-prensi' },
    { locale: 'tr', slug: 'kiliclar-sovalyesi' },
    { locale: 'tr', slug: 'kiliclar-kralicesi' },
    { locale: 'tr', slug: 'kiliclar-krali' },

    // Wands suit - Turkish
    { locale: 'tr', slug: 'asalar-asi' },
    { locale: 'tr', slug: 'asalar-ikili' },
    { locale: 'tr', slug: 'asalar-uclu' },
    { locale: 'tr', slug: 'asalar-dortlu' },
    { locale: 'tr', slug: 'asalar-besli' },
    { locale: 'tr', slug: 'asalar-altili' },
    { locale: 'tr', slug: 'asalar-yedili' },
    { locale: 'tr', slug: 'asalar-sekizli' },
    { locale: 'tr', slug: 'asalar-dokuzlu' },
    { locale: 'tr', slug: 'asalar-onlu' },
    { locale: 'tr', slug: 'asalar-prensi' },
    { locale: 'tr', slug: 'asalar-sovalyesi' },
    { locale: 'tr', slug: 'asalar-kralicesi' },
    { locale: 'tr', slug: 'asalar-krali' },

    // Pentacles suit - Turkish
    { locale: 'tr', slug: 'yildizlar-asi' },
    { locale: 'tr', slug: 'yildizlar-ikili' },
    { locale: 'tr', slug: 'yildizlar-uclu' },
    { locale: 'tr', slug: 'yildizlar-dortlu' },
    { locale: 'tr', slug: 'yildizlar-besli' },
    { locale: 'tr', slug: 'yildizlar-altili' },
    { locale: 'tr', slug: 'yildizlar-yedili' },
    { locale: 'tr', slug: 'yildizlar-sekizli' },
    { locale: 'tr', slug: 'yildizlar-dokuzlu' },
    { locale: 'tr', slug: 'yildizlar-onlu' },
    { locale: 'tr', slug: 'yildizlar-prensi' },
    { locale: 'tr', slug: 'yildizlar-sovalyesi' },
    { locale: 'tr', slug: 'yildizlar-kralicesi' },
    { locale: 'tr', slug: 'yildizlar-krali' },
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
    logger.error('Error generating metadata for kartlar route', error);
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
    logger.error('Error loading card from kartlar route', error);
    notFound();
  }
}
