import { notFound } from 'next/navigation';
import CardPage from '@/features/tarot-cards/components/CardPage';
import { CardData } from '@/features/tarot-cards/lib/card-data';
import { CardSEO } from '@/features/tarot-cards/lib/card-seo';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';
import Footer from '@/features/shared/layout/Footer';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Serbian routes only
  const cards = [
    // Serbian Major Arcana
    { locale: 'sr', slug: 'joker' },
    { locale: 'sr', slug: 'visoka-svestenica' },
    { locale: 'sr', slug: 'carobnjak' },
    { locale: 'sr', slug: 'carica' },
    { locale: 'sr', slug: 'car' },
    { locale: 'sr', slug: 'prvosveštenica' },
    { locale: 'sr', slug: 'ljubavnici' },
    { locale: 'sr', slug: 'ratna-kolica' },
    { locale: 'sr', slug: 'snaga' },
    { locale: 'sr', slug: 'pustinjak' },
    { locale: 'sr', slug: 'kolo-srece' },
    { locale: 'sr', slug: 'pravda' },
    { locale: 'sr', slug: 'obeseni' },
    { locale: 'sr', slug: 'smrt' },
    { locale: 'sr', slug: 'umerenost' },
    { locale: 'sr', slug: 'djavol' },
    { locale: 'sr', slug: 'kula' },
    { locale: 'sr', slug: 'zvezda' },
    { locale: 'sr', slug: 'mesec' },
    { locale: 'sr', slug: 'sunce' },
    { locale: 'sr', slug: 'sud' },
    { locale: 'sr', slug: 'svet' },

    // Cups suit - Serbian
    { locale: 'sr', slug: 'kupa-as' },
    { locale: 'sr', slug: 'kupa-dvojka' },
    { locale: 'sr', slug: 'kupa-trojka' },
    { locale: 'sr', slug: 'kupa-cetvorka' },
    { locale: 'sr', slug: 'kupa-petica' },
    { locale: 'sr', slug: 'kupa-sestica' },
    { locale: 'sr', slug: 'kupa-sedmica' },
    { locale: 'sr', slug: 'kupa-osmica' },
    { locale: 'sr', slug: 'kupa-devetka' },
    { locale: 'sr', slug: 'kupa-desetka' },
    { locale: 'sr', slug: 'kupa-paz' },
    { locale: 'sr', slug: 'kupa-vitez' },
    { locale: 'sr', slug: 'kupa-kraljica' },
    { locale: 'sr', slug: 'kupa-kralj' },

    // Swords suit - Serbian
    { locale: 'sr', slug: 'mace-as' },
    { locale: 'sr', slug: 'mace-dvojka' },
    { locale: 'sr', slug: 'mace-trojka' },
    { locale: 'sr', slug: 'mace-cetvorka' },
    { locale: 'sr', slug: 'mace-petica' },
    { locale: 'sr', slug: 'mace-sestica' },
    { locale: 'sr', slug: 'mace-sedmica' },
    { locale: 'sr', slug: 'mace-osmica' },
    { locale: 'sr', slug: 'mace-devetka' },
    { locale: 'sr', slug: 'mace-desetka' },
    { locale: 'sr', slug: 'mace-paz' },
    { locale: 'sr', slug: 'mace-vitez' },
    { locale: 'sr', slug: 'mace-kraljica' },
    { locale: 'sr', slug: 'mace-kralj' },

    // Wands suit - Serbian
    { locale: 'sr', slug: 'stap-as' },
    { locale: 'sr', slug: 'stap-dvojka' },
    { locale: 'sr', slug: 'stap-trojka' },
    { locale: 'sr', slug: 'stap-cetvorka' },
    { locale: 'sr', slug: 'stap-petica' },
    { locale: 'sr', slug: 'stap-sestica' },
    { locale: 'sr', slug: 'stap-sedmica' },
    { locale: 'sr', slug: 'stap-osmica' },
    { locale: 'sr', slug: 'stap-devetka' },
    { locale: 'sr', slug: 'stap-desetka' },
    { locale: 'sr', slug: 'stap-paz' },
    { locale: 'sr', slug: 'stap-vitez' },
    { locale: 'sr', slug: 'stap-kraljica' },
    { locale: 'sr', slug: 'stap-kralj' },

    // Pentacles suit - Serbian
    { locale: 'sr', slug: 'novcic-as' },
    { locale: 'sr', slug: 'novcic-dvojka' },
    { locale: 'sr', slug: 'novcic-trojka' },
    { locale: 'sr', slug: 'novcic-cetvorka' },
    { locale: 'sr', slug: 'novcic-petica' },
    { locale: 'sr', slug: 'novcic-sestica' },
    { locale: 'sr', slug: 'novcic-sedmica' },
    { locale: 'sr', slug: 'novcic-osmica' },
    { locale: 'sr', slug: 'novcic-devetka' },
    { locale: 'sr', slug: 'novcic-desetka' },
    { locale: 'sr', slug: 'novcic-paz' },
    { locale: 'sr', slug: 'novcic-vitez' },
    { locale: 'sr', slug: 'novcic-kraljica' },
    { locale: 'sr', slug: 'novcic-kralj' },
  ];

  return cards;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;

  try {
    const cardData = await CardData.getCardBySlug(
      slug,
      locale as 'tr' | 'en' | 'sr'
    );
    if (!cardData) {
      return {
        title: 'Kart Bulunamadı',
        description: 'Aradığınız tarot kartı bulunamadı.',
      };
    }

    return CardSEO.generateMetadata(
      cardData.card,
      cardData.seo,
      locale as 'tr' | 'en' | 'sr'
    );
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Kart Bulunamadı',
      description: 'Aradığınız tarot kartı bulunamadı.',
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
    console.error('Error loading card:', error);
    notFound();
  }
}
