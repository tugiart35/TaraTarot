/*
info:
---
Dosya Amacı:
- Tarot açılımları için ortak yorum bileşeni (BaseInterpretation)
- Tüm açılım türleri için tek bir bileşen kullanarak kod tekrarını önler
- Pozisyon bazlı özel yorumları, anahtar kelimeleri ve context bilgilerini gösterir

Bağlı Dosyalar:
- LoveInterpretation.tsx (aşk açılımı için wrapper)
- CareerTarot.tsx (kariyer açılımı)
- RelationshipAnalysisTarot.tsx (ilişki analizi açılımı)

Önemli Özellikler:
- Pozisyon özel yorum fonksiyonu desteği (getPositionSpecificInterpretation)
- İlişki analizi, kariyer ve genel anlam desteği
- Context gösterimi (problem çözme açılımı için)
- Tema sistemi (7 farklı tema)

Anlam Seçimi Öncelik Sırası:
1. getPositionSpecificInterpretation (en yüksek öncelik)
2. getMeaningText fonksiyonu
3. relationshipAnalysisMeaning (ilişki analizi)
4. careerMeaning (kariyer açılımı)
5. moneyMeaning (para açılımı)
6. newLoverMeaning (yeni sevgili açılımı)
7. marriageMeaning (evlilik açılımı)
8. Genel kart anlamı (fallback)

Üretime Hazır mı?:
- Evet, tüm açılım türleri için test edilmiş ve çalışır durumda
- İlişki analizi açılımı düzeltildi ve doğru çıktılar sağlıyor
---
*/

'use client';

import { forwardRef } from 'react';
import type { TarotCard } from '@/types/tarot';
import type { Theme, PositionInfo, CardMeaningData } from '@/types/ui';
// useAuth kaldırıldı - login sistemi kaldırıldı
// import { saveTarotReading } from '@/lib/services/reading-service'; // Service kaldırıldı

// Ana props interface
export interface BaseInterpretationProps {
  cards: (TarotCard | null)[];
  isReversed: boolean[];

  // Tema ve görsel özelleştirme
  theme?: Theme;
  title?: string;
  icon?: string;
  badgeText?: string;
  badgeColor?: string;

  // Pozisyon ve anlam verileri
  positionsInfo: readonly PositionInfo[];
  getCardMeaning?: (_card: TarotCard) => CardMeaningData | null;
  getMeaningText?: (
    _meaning: CardMeaningData | null,
    _card: TarotCard,
    _isReversed: boolean
  ) => string;
  getKeywords?: (
    _meaning: CardMeaningData | null,
    _card: TarotCard
  ) => string[];

  // POZİSYON ÖZEL YORUM FONKSİYONU
  getPositionSpecificInterpretation?: (
    _card: TarotCard,
    _position: number,
    _isReversed: boolean
  ) =>
    | string
    | { interpretation: string; context?: string; keywords?: string[] };

  // CONTEXT BİLGİSİ FONKSİYONU (lib/ dosyalarındaki context bilgileri için)
  getPositionContext?: (
    _card: TarotCard,
    _position: number
  ) => string | undefined;

  // CONTEXT GÖSTERİMİ İÇİN (Problem çözme açılımı için)
  showContext?: boolean;
}

// Tema renklerini döndüren yardımcı fonksiyon
const getThemeColors = (theme: Theme) => {
  const themes = {
    default: {
      bg: 'bg-slate-900/90',
      border: 'border-blue-500/60',
      cardBg: 'bg-slate-800/80',
      cardBorder: 'border-blue-400/20',
      iconBg: 'bg-blue-500/30',
      iconText: 'text-blue-400',
      titleText: 'text-blue-400',
      cardText: 'text-blue-300',
      tagBg: 'bg-blue-500/30',
      tagText: 'text-blue-200',
      keywordBg: 'bg-blue-500/20',
      keywordText: 'text-blue-300',
      contextBg: 'bg-blue-500/10',
      contextBorder: 'border-blue-500/20',
      contextText: 'text-blue-200',
      divider: 'border-blue-500/30',
      inputBg: 'bg-slate-800/80',
      inputBorder: 'border-slate-600',
      inputFocus: 'focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20',
      buttonGradient:
        'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
      resultBg: 'bg-blue-900/20',
      resultBorder: 'border-blue-500/30',
      resultText: 'text-blue-400',
    },
    blue: {
      bg: 'bg-slate-900/90',
      border: 'border-blue-500/60',
      cardBg: 'bg-slate-800/80',
      cardBorder: 'border-blue-400/20',
      iconBg: 'bg-blue-500/30',
      iconText: 'text-blue-400',
      titleText: 'text-blue-400',
      cardText: 'text-blue-300',
      tagBg: 'bg-blue-500/30',
      tagText: 'text-blue-200',
      keywordBg: 'bg-blue-500/20',
      keywordText: 'text-blue-300',
      contextBg: 'bg-blue-500/10',
      contextBorder: 'border-blue-500/20',
      contextText: 'text-blue-200',
      divider: 'border-blue-500/30',
      inputBg: 'bg-slate-800/80',
      inputBorder: 'border-slate-600',
      inputFocus: 'focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20',
      buttonGradient:
        'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
      resultBg: 'bg-blue-900/20',
      resultBorder: 'border-blue-500/30',
      resultText: 'text-blue-400',
    },
    pink: {
      bg: 'bg-pink-900/90',
      border: 'border-pink-500/60',
      cardBg: 'bg-pink-800/80',
      cardBorder: 'border-pink-400/20',
      iconBg: 'bg-pink-500/30',
      iconText: 'text-pink-400',
      titleText: 'text-pink-400',
      cardText: 'text-pink-300',
      tagBg: 'bg-pink-500/30',
      tagText: 'text-pink-200',
      keywordBg: 'bg-pink-500/20',
      keywordText: 'text-pink-300',
      contextBg: 'bg-pink-500/10',
      contextBorder: 'border-pink-500/20',
      contextText: 'text-pink-200',
      divider: 'border-pink-500/30',
      inputBg: 'bg-pink-800/80',
      inputBorder: 'border-pink-600',
      inputFocus: 'focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20',
      buttonGradient:
        'from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700',
      resultBg: 'bg-pink-900/20',
      resultBorder: 'border-pink-500/30',
      resultText: 'text-pink-400',
    },
    amber: {
      bg: 'bg-slate-900/90',
      border: 'border-amber-500/60',
      cardBg: 'bg-slate-800/80',
      cardBorder: 'border-amber-400/20',
      iconBg: 'bg-amber-500/30',
      iconText: 'text-amber-400',
      titleText: 'text-amber-400',
      cardText: 'text-amber-300',
      tagBg: 'bg-amber-500/30',
      tagText: 'text-amber-200',
      keywordBg: 'bg-amber-500/20',
      keywordText: 'text-amber-300',
      contextBg: 'bg-amber-500/10',
      contextBorder: 'border-amber-500/20',
      contextText: 'text-amber-200',
      divider: 'border-amber-500/30',
      inputBg: 'bg-slate-800/80',
      inputBorder: 'border-slate-600',
      inputFocus: 'focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20',
      buttonGradient:
        'from-purple-600/80 to-pink-600/80 hover:from-purple-500/90 hover:to-pink-500/90',
      resultBg: 'bg-purple-900/20',
      resultBorder: 'border-purple-500/30',
      resultText: 'text-purple-400',
    },
    purple: {
      bg: 'bg-slate-900/90',
      border: 'border-purple-500/60',
      cardBg: 'bg-slate-800/80',
      cardBorder: 'border-purple-400/20',
      iconBg: 'bg-purple-500/30',
      iconText: 'text-purple-400',
      titleText: 'text-purple-400',
      cardText: 'text-purple-300',
      tagBg: 'bg-purple-500/30',
      tagText: 'text-purple-200',
      keywordBg: 'bg-purple-500/20',
      keywordText: 'text-purple-300',
      contextBg: 'bg-purple-500/10',
      contextBorder: 'border-purple-500/20',
      contextText: 'text-purple-200',
      divider: 'border-purple-500/30',
      inputBg: 'bg-slate-800/80',
      inputBorder: 'border-slate-600',
      inputFocus:
        'focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20',
      buttonGradient:
        'from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
      resultBg: 'bg-purple-900/20',
      resultBorder: 'border-purple-500/30',
      resultText: 'text-purple-400',
    },
    green: {
      bg: 'bg-slate-900/90',
      border: 'border-green-500/60',
      cardBg: 'bg-slate-800/80',
      cardBorder: 'border-green-400/20',
      iconBg: 'bg-green-500/30',
      iconText: 'text-green-400',
      titleText: 'text-green-400',
      cardText: 'text-green-300',
      tagBg: 'bg-green-500/30',
      tagText: 'text-green-200',
      keywordBg: 'bg-green-500/20',
      keywordText: 'text-green-300',
      contextBg: 'bg-green-500/10',
      contextBorder: 'border-green-500/20',
      contextText: 'text-green-200',
      divider: 'border-green-500/30',
      inputBg: 'bg-slate-800/80',
      inputBorder: 'border-slate-600',
      inputFocus: 'focus:border-green-400 focus:ring-2 focus:ring-green-400/20',
      buttonGradient:
        'from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700',
      resultBg: 'bg-green-900/20',
      resultBorder: 'border-green-500/30',
      resultText: 'text-green-400',
    },
    emerald: {
      bg: 'bg-slate-900/90',
      border: 'border-emerald-500/60',
      cardBg: 'bg-slate-800/80',
      cardBorder: 'border-emerald-400/20',
      iconBg: 'bg-emerald-500/30',
      iconText: 'text-emerald-400',
      titleText: 'text-emerald-400',
      cardText: 'text-emerald-300',
      tagBg: 'bg-emerald-500/30',
      tagText: 'text-emerald-200',
      keywordBg: 'bg-emerald-500/20',
      keywordText: 'text-emerald-300',
      contextBg: 'bg-emerald-500/10',
      contextBorder: 'border-emerald-500/20',
      contextText: 'text-emerald-200',
      divider: 'border-emerald-500/30',
      inputBg: 'bg-slate-800/80',
      inputBorder: 'border-slate-600',
      inputFocus:
        'focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20',
      buttonGradient:
        'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
      resultBg: 'bg-emerald-900/20',
      resultBorder: 'border-emerald-500/30',
      resultText: 'text-emerald-400',
    },
  };

  return themes[theme] || themes.default;
};

const BaseInterpretation = forwardRef<HTMLDivElement, BaseInterpretationProps>(
  (
    {
      cards,
      isReversed,
      theme = 'default',
      title,
      icon = '📜',
      badgeText,
      badgeColor = 'bg-blue-500/20 text-blue-400',
      positionsInfo,
      getCardMeaning,
      getMeaningText,
      getKeywords,
      getPositionSpecificInterpretation,
      getPositionContext,
    },
    ref
  ) => {
    const colors = getThemeColors(theme);
    // useAuth kaldırıldı - login sistemi kaldırıldı

    // Varsayılan değerleri i18n'den al
    const defaultTitle = title || 'Tarot Yorumu';
    const defaultBadgeText = badgeText || 'TAROT';

    // Varsayılan fonksiyonlar kaldırıldı - kullanılmıyor

    return (
      <div
        ref={ref}
        className={`${colors.bg} ${colors.border} rounded-2xl border p-6 backdrop-blur-sm`}
      >
        {/* Başlık */}
        <div className='flex items-center space-x-3 mb-6'>
          <div
            className={`w-10 h-10 ${colors.iconBg} rounded-full flex items-center justify-center`}
          >
            <span className={`${colors.iconText} text-xl`}>{icon}</span>
          </div>
          <div>
            <h3 className={`${colors.titleText} font-bold text-xl`}>
              {defaultTitle}
            </h3>
            <span className={`text-xs ${badgeColor} px-2 py-1 rounded`}>
              {defaultBadgeText}
            </span>
          </div>
        </div>

        {/* Kart Yorumları */}
        <div className='space-y-4 mb-6'>
          {/*
            info:
            Aşağıda idx ile positionsInfo'ya erişmeden önce hem card hem de positionsInfo[idx] var mı kontrolü eklenmiştir.
            Böylece undefined hatası alınmaz.
          */}
          {cards.map((card, idx) => {
            if (!card || !positionsInfo[idx]) {
              return null;
            }

            const positionInfo = positionsInfo[idx];
            const cardMeaning: CardMeaningData | null = getCardMeaning
              ? getCardMeaning(card)
              : null;
            // CardDetails.tsx'deki mantığı kullan - pozisyon özel yorum fonksiyonu öncelikli
            let positionInterpretation = '';

            // 1. Önce props'tan gelen getPositionSpecificInterpretation fonksiyonunu kullan
            let positionContext = '';
            let positionKeywords: string[] = [];

            if (getPositionSpecificInterpretation) {
              const result = getPositionSpecificInterpretation(
                card,
                idx + 1,
                isReversed[idx] || false
              );

              if (typeof result === 'string') {
                positionInterpretation = result;
              } else if (result && typeof result === 'object') {
                positionInterpretation = result.interpretation || '';
                positionContext = result.context || '';
                positionKeywords = result.keywords || [];
              }
            }

            // 2. Eğer positionInterpretation boşsa, getMeaningText fonksiyonunu dene
            if (!positionInterpretation && getMeaningText) {
              positionInterpretation = getMeaningText(
                cardMeaning,
                card,
                isReversed[idx] || false
              );
            }

            // 3. Hala boşsa, CardMeaningData'dan anlamı al
            if (!positionInterpretation && cardMeaning) {
              if (cardMeaning.relationshipAnalysisMeaning) {
                positionInterpretation =
                  isReversed[idx] || false
                    ? cardMeaning.relationshipAnalysisMeaning.reversed
                    : cardMeaning.relationshipAnalysisMeaning.upright;
              } else if (cardMeaning.careerMeaning) {
                positionInterpretation =
                  isReversed[idx] || false
                    ? cardMeaning.careerMeaning.reversed
                    : cardMeaning.careerMeaning.upright;
              } else if (cardMeaning.moneyMeaning) {
                positionInterpretation =
                  isReversed[idx] || false
                    ? cardMeaning.moneyMeaning.reversed
                    : cardMeaning.moneyMeaning.upright;
              } else if (cardMeaning.newLoverMeaning) {
                positionInterpretation =
                  isReversed[idx] || false
                    ? cardMeaning.newLoverMeaning.reversed
                    : cardMeaning.newLoverMeaning.upright;
              } else if (cardMeaning.marriageMeaning) {
                positionInterpretation =
                  isReversed[idx] || false
                    ? cardMeaning.marriageMeaning.reversed
                    : cardMeaning.marriageMeaning.upright;
              } else if (cardMeaning.upright || cardMeaning.reversed) {
                positionInterpretation =
                  isReversed[idx] || false
                    ? cardMeaning.reversed || cardMeaning.upright || ''
                    : cardMeaning.upright || '';
              }
            }

            // 4. Son fallback: Kartın genel anlamını kullan
            if (!positionInterpretation) {
              positionInterpretation =
                isReversed[idx] || false
                  ? card.meaningTr.reversed
                  : card.meaningTr.upright;
            }

            // Anahtar kelimeleri al - önce position'dan, sonra getKeywords'dan
            const keywords =
              positionKeywords.length > 0
                ? positionKeywords
                : getKeywords
                  ? getKeywords(cardMeaning, card)
                  : [];

            // Context'i al - önce position'dan, sonra lib/ dosyalarından, sonra problem çözme için
            const finalContext =
              positionContext ||
              (getPositionContext ? getPositionContext(card, idx + 1) : '') ||
              cardMeaning?.context ||
              '';

            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-4 p-4 ${colors.cardBg} rounded-xl border ${colors.cardBorder} shadow-md transition-all duration-500 animate-slide-in-up`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Kart Görseli */}
                <div className='flex-shrink-0'>
                  <img
                    src={card.image || '/cards/CardBack.webp'}
                    alt={card.nameTr}
                    className={`
                      w-22 h-40 object-cover rounded-lg border-2 ${colors.cardBorder} shadow 
                      ${isReversed[idx] ? 'rotate-180' : ''}
                    `}
                    loading='lazy'
                  />
                </div>

                {/* Kart Bilgileri */}
                <div className='flex-1'>
                  {/* Pozisyon ve Durum */}
                  <div className='flex items-center gap-2 mb-1'>
                    <span
                      className={`text-xs ${colors.tagBg} ${colors.tagText} px-2 py-1 rounded font-bold`}
                    >
                      {positionInfo?.title || `position ${idx + 1}`}
                    </span>
                    <span className='text-xs text-gray-400'>
                      ({isReversed[idx] ? 'Ters' : 'Düz'})
                    </span>
                  </div>

                  {/* Kart Adı */}
                  <div
                    className={`text-lg font-semibold ${colors.cardText} mb-1`}
                  >
                    {card.nameTr}
                  </div>

                  {/* Anlam Başlığı */}
                  <div
                    className={`text-sm ${isReversed[idx] ? 'text-red-400' : 'text-green-400'} font-medium mb-1`}
                  >
                    {isReversed[idx] ? 'Ters Anlam:' : 'Düz Anlam:'}
                  </div>

                  {/* Kart Anlamı */}
                  <div className='text-gray-200 text-sm leading-relaxed mb-3'>
                    {positionInterpretation}
                  </div>

                  {/* Kart Context Bilgisi - lib/ dosyalarından */}
                  {finalContext && (
                    <div className='mt-2 p-2 bg-gray-800/40 rounded-lg border border-gray-700'>
                      <div className='flex items-center gap-1 mb-1'>
                        <span className={`${colors.iconText} text-xs`}>💡</span>
                        <span
                          className={`text-xs ${colors.contextText} font-medium`}
                        >
                          Bağlam:
                        </span>
                      </div>
                      <div className='text-gray-300 text-xs leading-relaxed pl-4'>
                        {finalContext}
                      </div>
                    </div>
                  )}

                  {/* Anahtar Kelimeler */}
                  {keywords.length > 0 && (
                    <div className='mt-2 flex flex-wrap gap-1'>
                      {keywords.map((keyword, keyIdx) => (
                        <span
                          key={keyIdx}
                          className={`text-xs ${colors.keywordBg} ${colors.keywordText} px-2 py-1 rounded-full`}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

BaseInterpretation.displayName = 'BaseInterpretation';

export default BaseInterpretation;
