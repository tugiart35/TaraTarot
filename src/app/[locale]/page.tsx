/*
 * Ana Sayfa - Tarot Uygulaması
 * Kullanıcıları tarot sayfasına yönlendiren landing page
 * Auth durumuna göre giriş butonu veya kullanıcı menüsü gösterir
 */

import { HomePageClient } from './HomePageClient';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return <HomePageClient locale={locale} />;
}
