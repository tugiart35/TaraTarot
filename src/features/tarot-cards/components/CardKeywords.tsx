import { CardContent } from '@/types/tarot-cards';

interface CardKeywordsProps {
  content: CardContent;
  locale: 'tr' | 'en' | 'sr';
}

export function CardKeywords({ content, locale }: CardKeywordsProps) {
  return (
    <section className='py-12 px-4 bg-white'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h3 className='text-2xl font-bold text-gray-900 mb-4'>
            {locale === 'tr'
              ? 'Anahtar Kelimeler'
              : locale === 'en'
                ? 'Keywords'
                : 'Ključne Reči'}
          </h3>
          <p className='text-gray-600'>
            {locale === 'tr'
              ? 'Bu kartla ilişkili temel kavramlar ve enerjiler'
              : locale === 'en'
                ? 'Core concepts and energies associated with this card'
                : 'Osnovni koncepti i energije povezane sa ovom kartom'}
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-3'>
          {content.keywords.map((keyword, index) => (
            <span
              key={index}
              className='bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105'
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Keyword Categories */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='text-center p-4 bg-purple-50 rounded-lg'>
            <div className='w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-white font-bold'>+</span>
            </div>
            <h4 className='font-semibold text-gray-900 mb-2'>
              {locale === 'tr'
                ? 'Pozitif Enerjiler'
                : locale === 'en'
                  ? 'Positive Energies'
                  : 'Pozitivne Energije'}
            </h4>
            <p className='text-sm text-gray-600'>
              {locale === 'tr'
                ? 'Kartın olumlu yönlerini temsil eden kelimeler'
                : locale === 'en'
                  ? 'Words representing the positive aspects of the card'
                  : 'Reči koje predstavljaju pozitivne aspekte karte'}
            </p>
          </div>

          <div className='text-center p-4 bg-blue-50 rounded-lg'>
            <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-white font-bold'>⚖️</span>
            </div>
            <h4 className='font-semibold text-gray-900 mb-2'>
              {locale === 'tr'
                ? 'Denge'
                : locale === 'en'
                  ? 'Balance'
                  : 'Ravnoteža'}
            </h4>
            <p className='text-sm text-gray-600'>
              {locale === 'tr'
                ? 'Kartın denge ve uyum yönlerini gösteren kelimeler'
                : locale === 'en'
                  ? 'Words showing the balance and harmony aspects of the card'
                  : 'Reči koje pokazuju aspekte ravnoteže i harmonije karte'}
            </p>
          </div>

          <div className='text-center p-4 bg-indigo-50 rounded-lg'>
            <div className='w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-white font-bold'>🔮</span>
            </div>
            <h4 className='font-semibold text-gray-900 mb-2'>
              {locale === 'tr'
                ? 'Ruhsal Yön'
                : locale === 'en'
                  ? 'Spiritual Aspect'
                  : 'Duhovni Aspekt'}
            </h4>
            <p className='text-sm text-gray-600'>
              {locale === 'tr'
                ? 'Kartın ruhsal ve mistik yönlerini ifade eden kelimeler'
                : locale === 'en'
                  ? 'Words expressing the spiritual and mystical aspects of the card'
                  : 'Reči koje izražavaju duhovne i mistične aspekte karte'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
