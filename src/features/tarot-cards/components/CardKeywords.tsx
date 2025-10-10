import { CardContent } from '@/types/tarot-cards';

interface CardKeywordsProps {
  content: CardContent;
  locale: 'tr' | 'en' | 'sr';
}

export function CardKeywords({ content, locale }: CardKeywordsProps) {
  // Don't render if keywords data is missing
  if (!content.keywords?.keywords_title) {
    return null;
  }

  return (
    <section className='py-12 px-4 bg-white'>
        {/* Keyword Categories */}
        <div className='mt-2 grid grid-cols-1 md:grid-cols-3 gap-1'>
          <div className='text-center p-4 bg-purple-50 rounded-lg'>
            <div className='w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-white font-bold'>+</span>
            </div>
            <h4 className='font-semibold text-gray-900 mb-2'>
              {content.keywords.positive_title}
            </h4>
            <p className='text-sm text-gray-600'>
              {content.keywords.positive_message}
            </p>
          </div>

          <div className='text-center p-4 bg-blue-50 rounded-lg'>
            <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-white font-bold'>⚖️</span>
            </div>
            <h4 className='font-semibold text-gray-900 mb-2'>
              {content.keywords.balance_title}
            </h4>
            <p className='text-sm text-gray-600'>
              {content.keywords.balance_message}
            </p>
          </div>

          <div className='text-center p-4 bg-indigo-50 rounded-lg'>
            <div className='w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3'>
              <span className='text-white font-bold'>🔮</span>
            </div>
            <h4 className='font-semibold text-gray-900 mb-2'>
              {content.keywords.soul_title}
            </h4>
            <p className='text-sm text-gray-600'>
              {content.keywords.soul_message}
            </p>
          </div>
        </div>
      
    </section>
  );
}
