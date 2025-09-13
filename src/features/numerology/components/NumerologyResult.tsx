'use client';

/**
 * Numeroloji sonuç kartı
 * Hesaplanan sayıyı ve detayları gösterir
 */

import type { NumerologyResult } from '@/lib/numerology/types';

interface NumerologyResultProps {
  result: NumerologyResult;
}

export default function NumerologyResult({ result }: NumerologyResultProps) {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'life-path': return 'Yaşam Yolu';
      case 'expression': return 'İfade';
      case 'soul-urge': return 'Ruh Arzusu';
      case 'daily-number': return 'Günün Sayısı';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'life-path': return '🛤️';
      case 'expression': return '💫';
      case 'soul-urge': return '💖';
      case 'daily-number': return '📅';
      default: return '🔢';
    }
  };

  const getNumberColor = (number: number, isMaster: boolean) => {
    if (isMaster) {
      return 'text-yellow-400';
    }
    
    const colors = [
      'text-red-400',    // 1
      'text-orange-400', // 2
      'text-yellow-400', // 3
      'text-green-400',  // 4
      'text-blue-400',   // 5
      'text-indigo-400', // 6
      'text-purple-400', // 7
      'text-pink-400',   // 8
      'text-rose-400'    // 9
    ];
    
    return colors[(number - 1) % 9] || 'text-gray-400';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 shadow-xl">
            <span className="text-3xl">{getTypeIcon(result.type)}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            {getTypeLabel(result.type)}
          </h2>
          
          <p className="text-gray-300 text-sm">
            {result.description}
          </p>
        </div>

        {/* Number Display */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            {result.isMasterNumber && (
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-lg animate-pulse"></div>
            )}
            <div className={`relative text-8xl font-black ${getNumberColor(result.number, result.isMasterNumber)} drop-shadow-2xl`}>
              {result.number}
            </div>
          </div>
          
          {result.isMasterNumber && (
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
                ✨ Master Sayı
              </span>
            </div>
          )}
        </div>

        {/* Breakdown - Removed as breakdown property doesn't exist */}

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-white mb-2">Bu Sayı Ne Anlama Geliyor?</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {result.isMasterNumber 
                  ? 'Master sayılar özel güç ve potansiyel taşır. Bu sayılar daha yüksek bir bilinç seviyesini ve ruhsal gelişimi temsil eder.'
                  : 'Bu sayı kişiliğinizin ve yaşam yolunuzun önemli bir parçasıdır. Numeroloji rehberliği ile bu sayının anlamını daha derinlemesine keşfedebilirsiniz.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
