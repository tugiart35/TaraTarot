import { CardSEO } from '@/types/tarot-cards';

interface CardFAQProps {
  seo: CardSEO;
  locale: 'tr' | 'en' | 'sr';
}

export function CardFAQ({ seo, locale }: CardFAQProps) {
  return (
    <section className='py-16 px-4 bg-gray-50'>
      <div className='max-w-4xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h3 className='text-3xl font-bold text-gray-900 mb-4'>
            {locale === 'tr'
              ? 'Sıkça Sorulan Sorular'
              : locale === 'en'
                ? 'Frequently Asked Questions'
                : 'Često Postavljana Pitanja'}
          </h3>
          <p className='text-lg text-gray-600'>
            {locale === 'tr'
              ? 'Bu kart hakkında merak edilenler'
              : locale === 'en'
                ? 'Common questions about this card'
                : 'Česta pitanja o ovoj karti'}
          </p>
        </div>

        {/* FAQ Items */}
        <div className='space-y-4'>
          {Array.isArray(seo.faq) &&
            seo.faq.map((item, index) => {
              // Handle both object and string formats
              const question =
                typeof item === 'string' ? item : item?.question || '';
              const answer =
                typeof item === 'string'
                  ? `Answer for ${item}`
                  : item?.answer || '';

              return (
                <div
                  key={index}
                  className='bg-white rounded-lg shadow-md overflow-hidden'
                >
                  <details className='group'>
                    <summary className='flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200'>
                      <h4 className='text-lg font-semibold text-gray-900 pr-4'>
                        {question}
                      </h4>
                      <div className='flex-shrink-0'>
                        <svg
                          className='w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-200'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 9l-7 7-7-7'
                          />
                        </svg>
                      </div>
                    </summary>
                    <div className='px-6 pb-6'>
                      <div className='border-t border-gray-200 pt-4'>
                        <p className='text-gray-700 leading-relaxed'>
                          {answer}
                        </p>
                      </div>
                    </div>
                  </details>
                </div>
              );
            })}
        </div>

        {/* Additional Help */}
        <div className='mt-12 text-center'>
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <div className='w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-3xl'>❓</span>
            </div>
            <h4 className='text-xl font-bold text-gray-900 mb-4'>
              {locale === 'tr'
                ? 'Başka Sorularınız mı Var?'
                : locale === 'en'
                  ? 'Have More Questions?'
                  : 'Imate Još Pitanja?'}
            </h4>
            <p className='text-gray-600 mb-6'>
              {locale === 'tr'
                ? 'Tarot okuması yaparak daha fazla bilgi edinebilirsiniz'
                : locale === 'en'
                  ? 'You can get more information by doing a tarot reading'
                  : 'Možete dobiti više informacija radeći tarot čitanje'}
            </p>
            <a
              href={`/${locale}/tarot-okumasi`}
              className='inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl'
            >
              {locale === 'tr'
                ? 'Tarot Okuması Yap'
                : locale === 'en'
                  ? 'Do Tarot Reading'
                  : 'Napravi Tarot Čitanje'}
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
      </div>
    </section>
  );
}
