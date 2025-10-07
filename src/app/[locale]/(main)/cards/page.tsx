import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import BottomNavigation from '@/features/shared/layout/BottomNavigation';
import Footer from '@/features/shared/layout/Footer';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    tr: 'Tarot Kartları - Tüm Major ve Minor Arcana Kartları | Büsbüşkimki',
    en: 'Tarot Cards - All Major and Minor Arcana Cards | Büsbüşkimki',
    sr: 'Tarot Karte - Sve Major i Minor Arcana Karte | Büsbüşkimki',
  };

  const descriptions = {
    tr: 'Tüm 78 tarot kartının detaylı anlamları ve yorumları. Major Arcana (22 kart) ve Minor Arcana (56 kart) kartlarını keşfedin. Aşk, kariyer, para ve ruhsal rehberlik için tarot kartları.',
    en: 'Detailed meanings and interpretations of all 78 tarot cards. Discover Major Arcana (22 cards) and Minor Arcana (56 cards). Tarot cards for love, career, money and spiritual guidance.',
    sr: 'Detaljna značenja i tumačenja svih 78 tarot karata. Otkrijte Major Arcana (22 karte) i Minor Arcana (56 karata). Tarot karte za ljubav, karijeru, novac i duhovno vođstvo.',
  };

  const keywords = {
    tr: 'tarot kartları, major arcana, minor arcana, tarot anlamları, tarot yorumları, aşk tarot, kariyer tarot, para tarot, ruhsal rehberlik',
    en: 'tarot cards, major arcana, minor arcana, tarot meanings, tarot interpretations, love tarot, career tarot, money tarot, spiritual guidance',
    sr: 'tarot karte, major arcana, minor arcana, tarot značenja, tarot tumačenja, ljubav tarot, karijera tarot, novac tarot, duhovno vođstvo',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description:
      descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: keywords[locale as keyof typeof keywords] || keywords.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'sr_RS',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.en,
    },
    alternates: {
      canonical: `https://busbuskimki.com/${locale}/cards`,
      languages: {
        tr: 'https://busbuskimki.com/tr/kartlar',
        en: 'https://busbuskimki.com/en/cards',
        sr: 'https://busbuskimki.com/sr/kartice',
      },
    },
  };
}

export default async function CardsPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = locale as 'tr' | 'en' | 'sr';

  // Major Arcana kartları (22 kart)
  const majorArcanaCards = [
    { key: 'the-fool', number: 0 },
    { key: 'the-magician', number: 1 },
    { key: 'the-high-priestess', number: 2 },
    { key: 'the-empress', number: 3 },
    { key: 'the-emperor', number: 4 },
    { key: 'the-hierophant', number: 5 },
    { key: 'the-lovers', number: 6 },
    { key: 'the-chariot', number: 7 },
    { key: 'strength', number: 8 },
    { key: 'the-hermit', number: 9 },
    { key: 'wheel-of-fortune', number: 10 },
    { key: 'justice', number: 11 },
    { key: 'the-hanged-man', number: 12 },
    { key: 'death', number: 13 },
    { key: 'temperance', number: 14 },
    { key: 'the-devil', number: 15 },
    { key: 'the-tower', number: 16 },
    { key: 'the-star', number: 17 },
    { key: 'the-moon', number: 18 },
    { key: 'the-sun', number: 19 },
    { key: 'judgement', number: 20 },
    { key: 'the-world', number: 21 },
  ];

  // Minor Arcana kartları (56 kart)
  const suits = ['Cups', 'Pentacles', 'Swords', 'Wands'];
  const minorArcanaCards: Array<{ key: string; suit: string; number: string }> =
    [];

  for (const suit of suits) {
    for (let number = 1; number <= 14; number++) {
      if (number === 11) {
        continue;
      } // 11 yok, Page var
      if (number === 12) {
        continue;
      } // 12 yok, Knight var
      if (number === 13) {
        continue;
      } // 13 yok, Queen var
      if (number === 14) {
        continue;
      } // 14 yok, King var

      minorArcanaCards.push({
        key: `${
          number === 1
            ? 'ace'
            : number === 2
              ? 'two'
              : number === 3
                ? 'three'
                : number === 4
                  ? 'four'
                  : number === 5
                    ? 'five'
                    : number === 6
                      ? 'six'
                      : number === 7
                        ? 'seven'
                        : number === 8
                          ? 'eight'
                          : number === 9
                            ? 'nine'
                            : number === 10
                              ? 'ten'
                              : 'page'
        }-of-${suit.toLowerCase()}`,
        suit,
        number:
          number === 1
            ? 'Ace'
            : number === 2
              ? 'Two'
              : number === 3
                ? 'Three'
                : number === 4
                  ? 'Four'
                  : number === 5
                    ? 'Five'
                    : number === 6
                      ? 'Six'
                      : number === 7
                        ? 'Seven'
                        : number === 8
                          ? 'Eight'
                          : number === 9
                            ? 'Nine'
                            : number === 10
                              ? 'Ten'
                              : 'Page',
      });
    }

    // Court cards
    minorArcanaCards.push(
      { key: `knight-of-${suit.toLowerCase()}`, suit, number: 'Knight' },
      { key: `queen-of-${suit.toLowerCase()}`, suit, number: 'Queen' },
      { key: `king-of-${suit.toLowerCase()}`, suit, number: 'King' }
    );
  }

  const getCardUrl = (cardKey: string) => {
    // Major Arcana için doğru slug'ları kullan
    const majorArcanaSlugs: {
      [key: string]: { tr: string; en: string; sr: string };
    } = {
      'the-fool': { tr: 'joker', en: 'the-fool', sr: 'joker' },
      'the-magician': { tr: 'buyucu', en: 'the-magician', sr: 'carobnjak' },
      'the-high-priestess': {
        tr: 'yuksek-rahibe',
        en: 'the-high-priestess',
        sr: 'visoka-svestenica',
      },
      'the-empress': { tr: 'imparatorice', en: 'the-empress', sr: 'carica' },
      'the-emperor': { tr: 'imparator', en: 'the-emperor', sr: 'car' },
      'the-hierophant': {
        tr: 'basrahip',
        en: 'the-hierophant',
        sr: 'visoki-svestenik',
      },
      'the-lovers': { tr: 'asiklar', en: 'the-lovers', sr: 'ljubavnici' },
      'the-chariot': { tr: 'savas-arabasi', en: 'the-chariot', sr: 'kola' },
      strength: { tr: 'guc', en: 'strength', sr: 'snaga' },
      'the-hermit': { tr: 'ermis', en: 'the-hermit', sr: 'pustinjak' },
      'wheel-of-fortune': {
        tr: 'kader-carki',
        en: 'wheel-of-fortune',
        sr: 'kolo-srece',
      },
      justice: { tr: 'adalet', en: 'justice', sr: 'pravda' },
      'the-hanged-man': {
        tr: 'asili-adam',
        en: 'the-hanged-man',
        sr: 'obeseni-covek',
      },
      death: { tr: 'olum', en: 'death', sr: 'smrt' },
      temperance: { tr: 'olcululuk', en: 'temperance', sr: 'umerenost' },
      'the-devil': { tr: 'seytan', en: 'the-devil', sr: 'davo' },
      'the-tower': { tr: 'kule', en: 'the-tower', sr: 'kula' },
      'the-star': { tr: 'yildiz', en: 'the-star', sr: 'zvezda' },
      'the-moon': { tr: 'ay', en: 'the-moon', sr: 'mesec' },
      'the-sun': { tr: 'gunes', en: 'the-sun', sr: 'sunce' },
      judgement: { tr: 'yargi', en: 'judgement', sr: 'sud' },
      'the-world': { tr: 'dunya', en: 'the-world', sr: 'svet' },
    };

    // Minor Arcana için slug'ları oluştur
    const getMinorArcanaSlug = (
      cardKey: string,
      locale: 'tr' | 'en' | 'sr'
    ) => {
      const suit = cardKey.includes('cups')
        ? 'cups'
        : cardKey.includes('pentacles')
          ? 'pentacles'
          : cardKey.includes('swords')
            ? 'swords'
            : 'wands';

      const number = cardKey.includes('ace')
        ? 'ace'
        : cardKey.includes('two')
          ? 'two'
          : cardKey.includes('three')
            ? 'three'
            : cardKey.includes('four')
              ? 'four'
              : cardKey.includes('five')
                ? 'five'
                : cardKey.includes('six')
                  ? 'six'
                  : cardKey.includes('seven')
                    ? 'seven'
                    : cardKey.includes('eight')
                      ? 'eight'
                      : cardKey.includes('nine')
                        ? 'nine'
                        : cardKey.includes('ten')
                          ? 'ten'
                          : cardKey.includes('page')
                            ? 'page'
                            : cardKey.includes('knight')
                              ? 'knight'
                              : cardKey.includes('queen')
                                ? 'queen'
                                : 'king';

      if (locale === 'tr') {
        // Test scriptindeki format: kupalar-asi, kiliclar-krali
        const suitNames = {
          cups: 'kupalar',
          pentacles: 'yildizlar',
          swords: 'kiliclar',
          wands: 'asalar',
        };
        const numberNames = {
          ace: 'asi',
          two: '2',
          three: '3',
          four: '4',
          five: '5',
          six: '6',
          seven: '7',
          eight: '8',
          nine: '9',
          ten: '10',
          page: 'ucak',
          knight: 'sovalye',
          queen: 'kiz',
          king: 'krali',
        };
        return `${suitNames[suit]}-${numberNames[number]}`;
      } else if (locale === 'sr') {
        // Test scriptindeki format: kupa-as, mace-kralj
        const suitNames = {
          cups: 'kupa',
          pentacles: 'novcic',
          swords: 'mace',
          wands: 'stap',
        };
        const numberNames = {
          ace: 'as',
          two: '2',
          three: '3',
          four: '4',
          five: '5',
          six: '6',
          seven: '7',
          eight: '8',
          nine: '9',
          ten: '10',
          page: 'ucak',
          knight: 'vitez',
          queen: 'kraljica',
          king: 'kralj',
        };
        return `${suitNames[suit]}-${numberNames[number]}`;
      } else {
        // English için test scriptindeki format: ace-of-cups, king-of-swords
        return cardKey;
      }
    };

    let slug: string;
    if (majorArcanaSlugs[cardKey]) {
      slug = majorArcanaSlugs[cardKey][currentLocale];
    } else {
      slug = getMinorArcanaSlug(cardKey, currentLocale);
    }

    const basePath =
      currentLocale === 'tr'
        ? '/kartlar'
        : currentLocale === 'en'
          ? '/cards'
          : '/kartice';
    return `/${currentLocale}${basePath}/${slug}`;
  };

  const getCardName = (cardKey: string) => {
    // Basit bir fallback - gerçek implementasyon için CardMapping'e method eklenebilir
    return cardKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getCardImage = (cardKey: string) => {
    // Major Arcana için - gerçek dosya isimlerini kullan
    const majorArcanaMapping: { [key: string]: string } = {
      'the-fool': '0-Fool',
      'the-magician': 'I-Magician',
      'the-high-priestess': 'II-HighPriestess',
      'the-empress': 'III-Empress',
      'the-emperor': 'IV-Emperor',
      'the-hierophant': 'V-Hierophant',
      'the-lovers': 'VI-Lovers',
      'the-chariot': 'VII-Chariot',
      strength: 'VIII-Strength',
      'the-hermit': 'IX-Hermit',
      'wheel-of-fortune': 'X-WheelOfFortune',
      justice: 'XI-Justice',
      'the-hanged-man': 'XII-HangedMan',
      death: 'XIII-Death',
      temperance: 'XIV-Temperance',
      'the-devil': 'XV-Devil',
      'the-tower': 'XVI-Tower',
      'the-star': 'XVII-Star',
      'the-moon': 'XVIII-Moon',
      'the-sun': 'XIX-Sun',
      judgement: 'XX-Judgement',
      'the-world': 'XXI-World',
    };

    if (majorArcanaMapping[cardKey]) {
      return `/cards/rws/${majorArcanaMapping[cardKey]}.webp`;
    }

    // Minor Arcana için
    const suit = cardKey.includes('cups')
      ? 'Cups'
      : cardKey.includes('pentacles')
        ? 'Pentacles'
        : cardKey.includes('swords')
          ? 'Swords'
          : 'Wands';

    let cardName = '';
    if (cardKey.includes('ace')) {
      cardName = 'Ace';
    } else if (cardKey.includes('two')) {
      cardName = 'II';
    } else if (cardKey.includes('three')) {
      cardName = 'III';
    } else if (cardKey.includes('four')) {
      cardName = 'IV';
    } else if (cardKey.includes('five')) {
      cardName = 'V';
    } else if (cardKey.includes('six')) {
      cardName = 'VI';
    } else if (cardKey.includes('seven')) {
      cardName = 'VII';
    } else if (cardKey.includes('eight')) {
      cardName = 'VIII';
    } else if (cardKey.includes('nine')) {
      cardName = 'IX';
    } else if (cardKey.includes('ten')) {
      cardName = 'X';
    } else if (cardKey.includes('page')) {
      cardName = 'Page';
    } else if (cardKey.includes('knight')) {
      cardName = 'Knight';
    } else if (cardKey.includes('queen')) {
      cardName = 'Queen';
    } else if (cardKey.includes('king')) {
      cardName = 'King';
    }

    return `/cards/rws/${cardName}-${suit}.webp`;
  };

  const translations = {
    tr: {
      title: 'Tarot Kartları',
      subtitle: 'Tüm 78 tarot kartının detaylı anlamları ve yorumları',
      majorArcana: 'Major Arcana (22 Kart)',
      minorArcana: 'Minor Arcana (56 Kart)',
      viewCard: 'Kartı Görüntüle',
      totalCards: 'Toplam 78 Kart',
    },
    en: {
      title: 'Tarot Cards',
      subtitle: 'Detailed meanings and interpretations of all 78 tarot cards',
      majorArcana: 'Major Arcana (22 Cards)',
      minorArcana: 'Minor Arcana (56 Cards)',
      viewCard: 'View Card',
      totalCards: 'Total 78 Cards',
    },
    sr: {
      title: 'Tarot Karte',
      subtitle: 'Detaljna značenja i tumačenja svih 78 tarot karata',
      majorArcana: 'Major Arcana (22 Karte)',
      minorArcana: 'Minor Arcana (56 Karata)',
      viewCard: 'Pogledaj Kartu',
      totalCards: 'Ukupno 78 Karata',
    },
  };

  const t = translations[currentLocale];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-black/30'></div>
        </div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6'>
              <span className='text-white/90 text-sm font-medium'>
                ✨ 78 Tarot Cards
              </span>
            </div>
            <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent'>
              {t.title}
            </h1>
            <p className='text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed'>
              {t.subtitle}
            </p>
            <div className='flex flex-wrap justify-center gap-3 text-sm'>
              <div className='bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20'>
                <span className='text-white font-medium'>{t.totalCards}</span>
              </div>
              <div className='bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20'>
                <span className='text-white font-medium'>Major Arcana: 22</span>
              </div>
              <div className='bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20'>
                <span className='text-white font-medium'>Minor Arcana: 56</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Major Arcana Section */}
        <section className='mb-20'>
          <div className='text-center mb-16'>
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-6'>
              <span className='text-purple-700 text-sm font-semibold'>
                🔮 Major Arcana
              </span>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              {t.majorArcana}
            </h2>
            <p className='text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
              {currentLocale === 'tr'
                ? 'Ruhsal yolculuğunuzu temsil eden 22 ana kart'
                : currentLocale === 'en'
                  ? '22 main cards representing your spiritual journey'
                  : '22 glavne karte koje predstavljaju vaše duhovno putovanje'}
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
            {majorArcanaCards.map(card => (
              <Link
                key={card.key}
                href={getCardUrl(card.key)}
                className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-300 transform hover:-translate-y-2 hover:scale-105'
              >
                <div className='relative aspect-[2/3] overflow-hidden'>
                  <Image
                    src={getCardImage(card.key)}
                    alt={getCardName(card.key)}
                    fill
                    className='object-cover group-hover:scale-110 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='absolute top-3 left-3'>
                    <span className='bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg'>
                      {card.number}
                    </span>
                  </div>
                  <div className='absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='bg-white/90 backdrop-blur-sm rounded-lg p-2'>
                      <p className='text-xs text-gray-800 font-medium text-center'>
                        {t.viewCard}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='p-4'>
                  <h3 className='font-bold text-gray-900 text-sm group-hover:text-purple-600 transition-colors duration-300 line-clamp-2'>
                    {getCardName(card.key)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Minor Arcana Section */}
        <section>
          <div className='text-center mb-16'>
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 mb-6'>
              <span className='text-blue-700 text-sm font-semibold'>
                🃏 Minor Arcana
              </span>
            </div>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              {t.minorArcana}
            </h2>
            <p className='text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
              {currentLocale === 'tr'
                ? 'Günlük yaşamınızı temsil eden 56 kart'
                : currentLocale === 'en'
                  ? '56 cards representing your daily life'
                  : '56 karata koje predstavljaju vaš svakodnevni život'}
            </p>
          </div>

          {/* Suits */}
          {['Cups', 'Pentacles', 'Swords', 'Wands'].map(suit => {
            const suitCards = minorArcanaCards.filter(
              card => card.suit === suit
            );
            const suitNames = {
              tr: {
                Cups: 'Kupalar',
                Pentacles: 'Tılsımlar',
                Swords: 'Kılıçlar',
                Wands: 'Asalar',
              },
              en: {
                Cups: 'Cups',
                Pentacles: 'Pentacles',
                Swords: 'Swords',
                Wands: 'Wands',
              },
              sr: {
                Cups: 'Kupovi',
                Pentacles: 'Pentakli',
                Swords: 'Mačevi',
                Wands: 'Štapovi',
              },
            };

            const suitColors = {
              Cups: 'from-pink-500 to-rose-500',
              Pentacles: 'from-yellow-500 to-amber-500',
              Swords: 'from-blue-500 to-indigo-500',
              Wands: 'from-red-500 to-orange-500',
            };

            return (
              <div key={suit} className='mb-16'>
                <div className='text-center mb-8'>
                  <div className='inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 mb-4'>
                    <span className={`text-2xl mr-3`}>
                      {suit === 'Cups'
                        ? '💧'
                        : suit === 'Pentacles'
                          ? '💰'
                          : suit === 'Swords'
                            ? '⚔️'
                            : '🔥'}
                    </span>
                    <h3 className='text-2xl font-bold text-gray-900'>
                      {
                        suitNames[currentLocale][
                          suit as keyof typeof suitNames.tr
                        ]
                      }
                    </h3>
                  </div>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4'>
                  {suitCards.map(card => (
                    <Link
                      key={card.key}
                      href={getCardUrl(card.key)}
                      className='group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-400 overflow-hidden border border-gray-100 hover:border-blue-300 transform hover:-translate-y-1 hover:scale-105'
                    >
                      <div className='relative aspect-[2/3] overflow-hidden'>
                        <Image
                          src={getCardImage(card.key)}
                          alt={getCardName(card.key)}
                          fill
                          className='object-cover group-hover:scale-110 transition-transform duration-500'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        <div className='absolute top-2 left-2'>
                          <span
                            className={`bg-gradient-to-r ${suitColors[suit as keyof typeof suitColors]} text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-md`}
                          >
                            {card.number}
                          </span>
                        </div>
                        <div className='absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <div className='bg-white/90 backdrop-blur-sm rounded-lg p-2'>
                            <p className='text-xs text-gray-800 font-medium text-center'>
                              {t.viewCard}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='p-3'>
                        <h3 className='font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors duration-300 line-clamp-2'>
                          {getCardName(card.key)}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA Section */}
        <section className='mt-20 relative overflow-hidden'>
          <div className='bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-12 text-white text-center relative'>
            <div className='absolute inset-0 bg-black/20 rounded-3xl'></div>
            <div className='absolute top-0 left-0 w-full h-full'>
              <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-black/30 rounded-3xl'></div>
            </div>
            <div className='relative z-10'>
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6'>
                <span className='text-white/90 text-sm font-medium'>
                  ✨ Free Tarot Reading
                </span>
              </div>
              <h3 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent'>
                {currentLocale === 'tr'
                  ? 'Kartlarınızı Çekin ve Keşfedin'
                  : currentLocale === 'en'
                    ? 'Draw Your Cards and Discover'
                    : 'Izvucite Vaše Karte i Otkrijte'}
              </h3>
              <p className='text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed'>
                {currentLocale === 'tr'
                  ? 'Ücretsiz tarot okuması ile kendi kartlarınızı çekin'
                  : currentLocale === 'en'
                    ? 'Draw your own cards with free tarot reading'
                    : 'Izvucite svoje karte besplatnim tarot čitanjem'}
              </p>
              <Link
                href={`/${currentLocale}/tarotokumasi`}
                className='inline-flex items-center px-10 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 text-lg'
              >
                {currentLocale === 'tr'
                  ? 'Tarot Okuması Yap'
                  : currentLocale === 'en'
                    ? 'Get Tarot Reading'
                    : 'Uradi Tarot Čitanje'}
                <svg
                  className='w-6 h-6 ml-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 7l5 5m0 0l-5 5m5-5H6'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <BottomNavigation />
      <Footer />
    </div>
  );
}
