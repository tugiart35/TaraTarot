import { CardContent } from '@/types/tarot-cards';

interface CardCTAProps {
  content: CardContent;
  locale: 'tr' | 'en' | 'sr';
}

export function CardCTA({ content, locale }: CardCTAProps) {
  const { cta } = content;

  // Default CTA metinleri - eğer JSON'da yoksa
  const defaultCTA = {
    main: locale === 'tr' 
      ? 'Kartınızı Çekin ve Keşfedin'
      : locale === 'en'
      ? 'Draw Your Card and Discover'
      : 'Izvuci Svoju Kartu i Otkrij',
    micro: locale === 'tr'
      ? 'Ücretsiz tarot okuması ile kendi kartlarınızı çekin ve geleceğinizi keşfedin'
      : locale === 'en'
      ? 'Draw your own cards with a free tarot reading and discover your future'
      : 'Izvuci svoje karte besplatnim tarot čitanjem i otkrij svoju budućnost'
  };

  const ctaMain = cta?.main || defaultCTA.main;
  const ctaMicro = cta?.micro || defaultCTA.micro;

  return (
    <section className='py-16 px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white'>
      <div className='max-w-4xl mx-auto text-center'>
        {/* CTA Header - Karttan gelen özel CTA metinleri veya default */}
        <div className='mb-8'>
          <h3 className='text-3xl lg:text-4xl font-bold mb-4'>
            {ctaMain}
          </h3>
          <p className='text-xl text-purple-200 max-w-2xl mx-auto'>
            {ctaMicro}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          {/* Free Reading Button */}
          <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
            <div className='w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-3xl'>🔮</span>
            </div>
            <h4 className='text-xl font-bold mb-3'>
              {locale === 'tr'
                ? 'Ücretsiz Tarot Okuması'
                : locale === 'en'
                  ? 'Free Tarot Reading'
                  : 'Besplatno Tarot Čitanje'}
            </h4>
            <p className='text-purple-200 mb-4'>
              {locale === 'tr'
                ? '3 kart açılımı ile geleceğinizi keşfedin'
                : locale === 'en'
                  ? 'Discover your future with a 3-card spread'
                  : 'Otkrij svoju budućnost sa 3-kartnim rasporedom'}
            </p>
            <a
              href={`/${locale}/tarot-okumasi`}
              className='inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl'
            >
              {locale === 'tr'
                ? 'Hemen Başla'
                : locale === 'en'
                  ? 'Start Now'
                  : 'Počni Sada'}
              <svg
                className='w-5 h-5 ml-2'
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
            </a>
          </div>

          {/* Love Reading Button */}
          <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
            <div className='w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-3xl'>💕</span>
            </div>
            <h4 className='text-xl font-bold mb-3'>
              {locale === 'tr'
                ? 'Aşk Tarot Okuması'
                : locale === 'en'
                  ? 'Love Tarot Reading'
                  : 'Ljubavno Tarot Čitanje'}
            </h4>
            <p className='text-purple-200 mb-4'>
              {locale === 'tr'
                ? 'Aşk hayatınız hakkında özel yorumlar'
                : locale === 'en'
                  ? 'Special insights about your love life'
                  : 'Posebni uvid u vaš ljubavni život'}
            </p>
            <a
              href={`/${locale}/ask-tarot-okumasi`}
              className='inline-flex items-center px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl'
            >
              {locale === 'tr'
                ? 'Aşk Okuması'
                : locale === 'en'
                  ? 'Love Reading'
                  : 'Ljubavno Čitanje'}
              <svg
                className='w-5 h-5 ml-2'
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
            </a>
          </div>
        </div>

        {/* Additional Features */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='text-center'>
            <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-2xl'>✓</span>
            </div>
            <h5 className='font-semibold mb-2'>
              {locale === 'tr'
                ? 'Ücretsiz'
                : locale === 'en'
                  ? 'Free'
                  : 'Besplatno'}
            </h5>
            <p className='text-sm text-purple-200'>
              {locale === 'tr'
                ? 'Hiçbir ücret yok'
                : locale === 'en'
                  ? 'No cost'
                  : 'Bez troškova'}
            </p>
          </div>

          <div className='text-center'>
            <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-2xl'>⚡</span>
            </div>
            <h5 className='font-semibold mb-2'>
              {locale === 'tr' ? 'Hızlı' : locale === 'en' ? 'Fast' : 'Brzo'}
            </h5>
            <p className='text-sm text-purple-200'>
              {locale === 'tr'
                ? 'Anında sonuç'
                : locale === 'en'
                  ? 'Instant results'
                  : 'Trenutni rezultati'}
            </p>
          </div>

          <div className='text-center'>
            <div className='w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-2xl'>🔒</span>
            </div>
            <h5 className='font-semibold mb-2'>
              {locale === 'tr'
                ? 'Gizli'
                : locale === 'en'
                  ? 'Private'
                  : 'Privatno'}
            </h5>
            <p className='text-sm text-purple-200'>
              {locale === 'tr'
                ? 'Kişisel gizlilik'
                : locale === 'en'
                  ? 'Personal privacy'
                  : 'Lična privatnost'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
