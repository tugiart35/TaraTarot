import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TarotCardPage } from '@/features/tarot/components/TarotCardPage';
import {
  getCardBySlug,
  getCardHreflangUrls,
} from '@/features/tarot/lib/card-loader';
import { SUPPORTED_LOCALES, isLocale } from '@/types/tarot-seo';

type Props = {
  params: Promise<{
    locale: string;
    category: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  try {
    const card = await getCardBySlug(slug, locale);

    if (!card) {
      notFound();
    }

    const hreflangUrls = getCardHreflangUrls(card.id, card.names, card.slugs);

    return {
      title: card.seo[locale].title,
      description: card.seo[locale].description,
      keywords: card.seo[locale].keywords,
      alternates: {
        canonical: hreflangUrls[locale],
        languages: hreflangUrls,
      },
      openGraph: {
        title: card.seo[locale].title,
        description: card.seo[locale].description,
        type: 'article',
        url: hreflangUrls[locale],
        images: [
          {
            url: `/images/tarot-cards/${card.id}.jpg`,
            width: 400,
            height: 700,
            alt: card.names[locale],
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: card.seo[locale].title,
        description: card.seo[locale].description,
        images: [`/images/tarot-cards/${card.id}.jpg`],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  const { getAllCards } = await import('@/features/tarot/lib/card-loader');

  try {
    const allCards = await getAllCards();
    const params: Array<{ locale: string; category: string; slug: string }> =
      [];

    // Get localized category paths
    const categoryPaths = {
      tr: {
        'major-arcana': 'buyuk-arkana',
        'minor-arcana': 'kucuk-arkana',
        swords: 'kiliclar',
        cups: 'kupalar',
        wands: 'asalar',
        pentacles: 'tilsimlar',
      },
      en: {
        'major-arcana': 'major-arcana',
        'minor-arcana': 'minor-arcana',
        swords: 'swords',
        cups: 'cups',
        wands: 'wands',
        pentacles: 'pentacles',
      },
      sr: {
        'major-arcana': 'velika-arkana',
        'minor-arcana': 'mala-arkana',
        swords: 'mačevi',
        cups: 'čaše',
        wands: 'štapovi',
        pentacles: 'zlatnici',
      },
    };

    for (const card of allCards) {
      for (const locale of SUPPORTED_LOCALES) {
        // Determine category based on card ID
        let category = 'major-arcana';
        if (card.category === 'minor_arcana') {
          if (card.id.includes('swords')) category = 'swords';
          else if (card.id.includes('cups')) category = 'cups';
          else if (card.id.includes('wands')) category = 'wands';
          else if (card.id.includes('pentacles')) category = 'pentacles';
          else category = 'minor-arcana';
        }

        // Get localized category path
        const localizedCategory = (categoryPaths[locale] as any)[category] || category;

        params.push({
          locale,
          category: localizedCategory,
          slug: card.slugs[locale],
        });
      }
    }

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function CardDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  try {
    const card = await getCardBySlug(slug, locale);

    if (!card) {
      notFound();
    }

    return <TarotCardPage card={card} locale={locale} />;
  } catch (error) {
    console.error('Error loading card:', error);
    notFound();
  }
}
