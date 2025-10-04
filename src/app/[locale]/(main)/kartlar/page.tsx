import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TarotCardsPage } from '@/features/tarot/components/TarotCardsPage';
import { Locale } from '@/types/tarot-seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;
  const t = await getTranslations({
    locale: awaitedParams.locale,
    namespace: 'tarot',
  });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    keywords: ['tarot', 'kartlar', 'cards', 'kartice'],
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      type: 'website',
    },
  };
}

export default async function CardsPage({ params }: Props) {
  const awaitedParams = await params;
  return <TarotCardsPage locale={awaitedParams.locale as Locale} />;
}
