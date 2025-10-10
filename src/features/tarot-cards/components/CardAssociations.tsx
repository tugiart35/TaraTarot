import { CardContent } from '@/types/tarot-cards';

interface CardAssociationsProps {
  content: CardContent;
  locale: 'tr' | 'en' | 'sr';
}

export function CardAssociations({ content, locale }: CardAssociationsProps) {
  const { associations } = content;

  if (!associations) return null;

  const iconMap = {
    astrology: '✨',
    numerology: '🔢',
    element: '🌟',
    chakra: '🧘'
  };

  const labelMap = {
    astrology: locale === 'tr' ? 'Astroloji' : locale === 'en' ? 'Astrology' : 'Astrologija',
    numerology: locale === 'tr' ? 'Numeroloji' : locale === 'en' ? 'Numerology' : 'Numerologija',
    element: locale === 'tr' ? 'Element' : locale === 'en' ? 'Element' : 'Element',
    chakra: locale === 'tr' ? 'Çakra' : locale === 'en' ? 'Chakra' : 'Čakra'
  };

  return (
    <section className='py-16 px-4 bg-gradient-to-br from-indigo-50 to-purple-50'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-800'>
          {associations.title}
        </h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {Object.entries(iconMap).map(([key, icon]) => {
            const value = associations[key as keyof typeof iconMap];
            const label = labelMap[key as keyof typeof labelMap];
            
            return (
              <div 
                key={key}
                className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100'
              >
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-2xl'>
                    {icon}
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1'>
                      {label}
                    </h3>
                    <p className='text-lg font-medium text-gray-800'>
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

