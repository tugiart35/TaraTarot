'use client';

/**
 * Numeroloji sayı anlamı bileşeni
 * Hesaplanan sayının detaylı açılımını gösterir
 */

import { NumberMeaning } from '@/lib/numerology/meanings';

interface NumberMeaningProps {
  meaning: NumberMeaning;
}

export default function NumberMeaning({ meaning }: NumberMeaningProps) {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      'Kırmızı': 'from-red-500 to-red-600',
      'Turuncu': 'from-orange-500 to-orange-600',
      'Sarı': 'from-yellow-500 to-yellow-600',
      'Yeşil': 'from-green-500 to-green-600',
      'Mavi': 'from-blue-500 to-blue-600',
      'İndigo': 'from-indigo-500 to-indigo-600',
      'Mor': 'from-purple-500 to-purple-600',
      'Pembe': 'from-pink-500 to-pink-600',
      'Altın': 'from-yellow-400 to-yellow-500',
      'Gümüş': 'from-gray-400 to-gray-500',
      'Platin': 'from-gray-300 to-gray-400',
      'Kristal': 'from-blue-200 to-purple-200'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className={`absolute inset-0 bg-gradient-to-r ${getColorClasses(meaning.color)} rounded-full blur-lg opacity-50`}></div>
            <div className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${getColorClasses(meaning.color)} rounded-full shadow-xl`}>
              <span className="text-3xl font-bold text-white">{meaning.number}</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            {meaning.title}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {meaning.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 rounded-full text-sm text-gray-200"
              >
                {keyword}
              </span>
            ))}
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            {meaning.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Positive Traits */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
              <span className="mr-2">✨</span>
              Güçlü Yönleriniz
            </h3>
            <ul className="space-y-2">
              {meaning.positiveTraits.map((trait, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="text-green-400 mt-1">•</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/20">
            <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center">
              <span className="mr-2">⚠️</span>
              Dikkat Edilmesi Gerekenler
            </h3>
            <ul className="space-y-2">
              {meaning.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Guidance Sections */}
        <div className="mt-8 space-y-6">
          {/* Life Guidance */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center">
              <span className="mr-2">🛤️</span>
              Yaşam Rehberliği
            </h3>
            <p className="text-gray-300 leading-relaxed">{meaning.lifeGuidance}</p>
          </div>

          {/* Career Advice */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
            <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center">
              <span className="mr-2">💼</span>
              Kariyer Önerileri
            </h3>
            <p className="text-gray-300 leading-relaxed">{meaning.careerAdvice}</p>
          </div>

          {/* Relationship Advice */}
          <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-2xl p-6 border border-pink-500/20">
            <h3 className="text-xl font-bold text-pink-400 mb-3 flex items-center">
              <span className="mr-2">💖</span>
              İlişki Önerileri
            </h3>
            <p className="text-gray-300 leading-relaxed">{meaning.relationshipAdvice}</p>
          </div>

          {/* Spiritual Message */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20">
            <h3 className="text-xl font-bold text-indigo-400 mb-3 flex items-center">
              <span className="mr-2">🔮</span>
              Ruhsal Mesaj
            </h3>
            <p className="text-gray-300 leading-relaxed">{meaning.spiritualMessage}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Renk</div>
            <div className="font-semibold text-white">{meaning.color}</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Element</div>
            <div className="font-semibold text-white">{meaning.element}</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Gezegen</div>
            <div className="font-semibold text-white">{meaning.planet}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
