import { CardContent } from '@/types/tarot-cards';

interface CardMeaningsProps {
  content: CardContent;
  locale: 'tr' | 'en' | 'sr';
}

export function CardMeanings({ content, locale }: CardMeaningsProps) {
  // Don't render if meanings data is missing
  if (!content.meanings?.upright?.general) {
    return null;
  }

  const interpretations = [
    {
      title: locale === 'tr' ? 'Aşk' : locale === 'en' ? 'Love' : 'Ljubav',
      content: content.meanings.upright.love,
      icon: '💕',
    },
    {
      title:
        locale === 'tr' ? 'Kariyer' : locale === 'en' ? 'Career' : 'Karijera',
      content: content.meanings.upright.career,
      icon: '💼',
    },
    {
      title: locale === 'tr' ? 'Para' : locale === 'en' ? 'Money' : 'Novac',
      content: content.meanings.upright.money,
      icon: '💰',
    },
    {
      title:
        locale === 'tr' ? 'Ruhsal' : locale === 'en' ? 'Spiritual' : 'Duhovno',
      content: content.meanings.upright.spiritual,
      icon: '🕊️',
    },
  ];

  return (
    <section id='meanings' className='py-16 px-4 bg-gray-50'>
      <div className='max-w-6xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>
            {locale === 'tr'
              ? 'Kart Anlamları'
              : locale === 'en'
                ? 'Card Meanings'
                : 'Značenja Karte'}
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            {locale === 'tr'
              ? 'Bu kartın farklı yaşam alanlarındaki anlamlarını keşfedin'
              : locale === 'en'
                ? 'Discover the meanings of this card in different areas of life'
                : 'Otkrijte značenja ove karte u različitim oblastima života'}
          </p>
        </div>

        {/* Upright and Reversed Meanings */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
          {/* Upright Meaning */}
          <div className='bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-500'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4'>
                <span className='text-2xl'>☀️</span>
              </div>
              <h3 className='text-2xl font-bold text-gray-900'>
                {locale === 'tr'
                  ? 'Düz Pozisyon'
                  : locale === 'en'
                    ? 'Upright Position'
                    : 'Uspravna Pozicija'}
              </h3>
            </div>
            <p className='text-gray-700 leading-relaxed'>
              {content.meanings.upright.general}
            </p>
          </div>

          {/* Reversed Meaning */}
          <div className='bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-500'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4'>
                <span className='text-2xl'>🌙</span>
              </div>
              <h3 className='text-2xl font-bold text-gray-900'>
                {locale === 'tr'
                  ? 'Ters Pozisyon'
                  : locale === 'en'
                    ? 'Reversed Position'
                    : 'Obrnuta Pozicija'}
              </h3>
            </div>
            <p className='text-gray-700 leading-relaxed'>
              {content.meanings.reversed.general}
            </p>
          </div>
        </div>

        {/* Life Area Interpretations */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {interpretations.map((interpretation, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'
            >
              <div className='text-center mb-4'>
                <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-3xl'>{interpretation.icon}</span>
                </div>
                <h4 className='text-xl font-bold text-gray-900'>
                  {interpretation.title}
                </h4>
              </div>
              <p className='text-gray-700 leading-relaxed'>
                {interpretation.content}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className='mt-12 text-center'>
          <div className='bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              {locale === 'tr'
                ? 'Kart Hakkında'
                : locale === 'en'
                  ? 'About This Card'
                  : 'O Ovoj Karti'}
            </h3>
            <p className='text-gray-700 leading-relaxed text-lg'>
              {content.context.mythology}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
