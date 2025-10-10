import { CardContent } from '@/types/tarot-cards';

interface CardStoryProps {
  content: CardContent;
  locale: 'tr' | 'en' | 'sr';
}

export function CardStory({ content, locale }: CardStoryProps) {
  // Don't render if story data is missing
  if (!content.story?.title) {
    return null;
  }

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
              {content.story.title}
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
              <p className='text-gray-800 leading-relaxed text-lg mb-4'>
                {content.story.description}
              </p>
              <p className='text-gray-700 leading-relaxed'>
                {content.story.history}
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
                  {content.story.historytitle}
                </h4>
              </div>
              <p className='text-gray-700'>
                {content.story.history_message}
              </p>
            </div>

            <div className='bg-indigo-50 rounded-lg p-6'>
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3'>
                  <span className='text-white font-bold'>🔮</span>
                </div>
                <h4 className='text-xl font-bold text-gray-900'>
                  {content.story.mystic_title}
                </h4>
              </div>
              <p className='text-gray-700'>
                {content.story.mystic_message}
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
                {content.story.cultural_title}
              </h4>
            </div>
            <p className='text-gray-700'>
              {content.story.cultural_message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
