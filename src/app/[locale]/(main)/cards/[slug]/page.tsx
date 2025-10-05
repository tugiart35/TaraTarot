import { notFound } from 'next/navigation';
import CardPage from '@/features/tarot-cards/components/CardPage';
import { CardData } from '@/features/tarot-cards/lib/card-data';
import { CardSEO } from '@/features/tarot-cards/lib/card-seo';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // All Major Arcana cards with proper URL structure
  const cards = [
    // Turkish routes
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

    // English routes
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

    // Serbian routes
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
      <CardPage card={cardData} locale={locale as 'tr' | 'en' | 'sr'} />
    );
  } catch (error) {
    console.error('Error loading card:', error);
    notFound();
  }
}
