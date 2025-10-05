import { CardContent } from '@/types/tarot-cards';

interface CardStoryProps {
  content: CardContent;
  locale: 'tr' | 'en' | 'sr';
}

export function CardStory({ content, locale }: CardStoryProps) {
  return (
    <section className='py-16 px-4 bg-gradient-to-br from-indigo-50 to-purple-50'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8 lg:p-12'>
          {/* Section Header */}
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-3xl'>📖</span>
            </div>
            <h3 className='text-3xl font-bold text-gray-900 mb-4'>
              {locale === 'tr'
                ? 'Kartın Hikayesi'
                : locale === 'en'
                  ? 'Card Story'
                  : 'Priča Karte'}
            </h3>
            <p className='text-lg text-gray-600'>
              {locale === 'tr'
                ? 'Bu kartın kökeni, mitolojisi ve tarihsel anlamı'
                : locale === 'en'
                  ? 'The origin, mythology and historical meaning of this card'
                  : 'Poreklo, mitologija i istorijsko značenje ove karte'}
            </p>
          </div>

          {/* Story Content */}
          <div className='prose prose-lg prose-gray max-w-none'>
            <div className='bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-6 mb-6'>
              <p className='text-gray-800 leading-relaxed text-lg'>
                {content.story}
              </p>
            </div>
          </div>

          {/* Historical Context */}
          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-purple-50 rounded-lg p-6'>
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3'>
                  <span className='text-white font-bold'>🏛️</span>
                </div>
                <h4 className='text-xl font-bold text-gray-900'>
                  {locale === 'tr'
                    ? 'Tarihsel Köken'
                    : locale === 'en'
                      ? 'Historical Origin'
                      : 'Istorijsko Poreklo'}
                </h4>
              </div>
              <p className='text-gray-700'>
                {locale === 'tr'
                  ? 'Bu kartın tarihsel gelişimi ve kökeni hakkında bilgiler'
                  : locale === 'en'
                    ? 'Information about the historical development and origin of this card'
                    : 'Informacije o istorijskom razvoju i poreklu ove karte'}
              </p>
            </div>

            <div className='bg-indigo-50 rounded-lg p-6'>
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3'>
                  <span className='text-white font-bold'>🔮</span>
                </div>
                <h4 className='text-xl font-bold text-gray-900'>
                  {locale === 'tr'
                    ? 'Mistik Anlam'
                    : locale === 'en'
                      ? 'Mystical Meaning'
                      : 'Mističko Značenje'}
                </h4>
              </div>
              <p className='text-gray-700'>
                {locale === 'tr'
                  ? 'Kartın mistik ve ruhsal boyutları'
                  : locale === 'en'
                    ? 'The mystical and spiritual dimensions of the card'
                    : 'Mističke i duhovne dimenzije karte'}
              </p>
            </div>
          </div>

          {/* Cultural Significance */}
          <div className='mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6'>
            <div className='flex items-center mb-4'>
              <div className='w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3'>
                <span className='text-white font-bold'>🌍</span>
              </div>
              <h4 className='text-xl font-bold text-gray-900'>
                {locale === 'tr'
                  ? 'Kültürel Önem'
                  : locale === 'en'
                    ? 'Cultural Significance'
                    : 'Kulturni Značaj'}
              </h4>
            </div>
            <p className='text-gray-700'>
              {locale === 'tr'
                ? 'Bu kartın farklı kültürlerdeki yeri ve önemi'
                : locale === 'en'
                  ? 'The place and importance of this card in different cultures'
                  : 'Mesto i važnost ove karte u različitim kulturama'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
