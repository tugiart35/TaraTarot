import { CardContent } from '@/types/tarot-cards';

interface CardAffirmationsProps {
  content: CardContent;
  locale: 'tr' | 'en' | 'sr';
}

export function CardAffirmations({ content, locale }: CardAffirmationsProps) {
  const { affirmations } = content;

  if (!affirmations || !affirmations.affirmation_list.length) return null;

  return (
    <section className='py-16 px-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl lg:text-4xl font-bold text-center mb-12'>
          {affirmations.title}
        </h2>
        
        <div className='space-y-6'>
          {affirmations.affirmation_list.map((affirmation, index) => (
            <div 
              key={index}
              className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors duration-300'
            >
              <div className='flex items-start gap-4'>
                <div className='w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1'>
                  ✨
                </div>
                <p className='text-lg leading-relaxed flex-1'>
                  "{affirmation}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

