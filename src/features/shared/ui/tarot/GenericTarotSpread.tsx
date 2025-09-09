/*
 * Generic Tarot Spread Component
 * Bu bileşen, herhangi bir tarot spread konfigürasyonuyla çalışabilen generic bir wrapper'dır
 * Mevcut TarotSpread.tsx bileşeninin modüler versiyonudur
 */

'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';
import { useReadingCredits } from '@/hooks/useReadingCredits';
// import { useRouter } from 'next/navigation'; // Kullanılmıyor - kaldırıldı
// Backend servisleri kaldırıldı
import { useTarotReading } from '@/hooks/useTarotReading';
import {
  BaseCardPosition,
  BaseCardGallery,
  BaseReadingTypeSelector,
  CardDetails,
} from '@/features/shared/ui';
// ReadingInfoModal kullanılmıyor - kaldırıldı
import {
  READING_TYPES,
  ReadingType,
  TarotCard,
  type TarotSpreadConfig,
} from '@/types/tarot';
// loadSpreadConfig import'u kaldırıldı - spread-loader.ts silindi

// Dinamik import'lar için
import {
  LoveCardRenderer,
  LoveInterpretation,
} from '@/features/tarot/components';

type ReadingTypeKey = 'LOVE_SPREAD';

interface GenericTarotSpreadProps {
  spreadId: string;
  config?: TarotSpreadConfig; // Opsiyonel: dışarıdan config verilebilir
}

function getReadingTypeKey(spreadId: string): ReadingTypeKey {
  switch (spreadId) {
    case 'love-spread':
      return 'LOVE_SPREAD';
    default:
      throw new Error(`Unknown spreadId: ${spreadId}`);
  }
}

export default function GenericTarotSpread({
  spreadId,
  config: externalConfig,
}: GenericTarotSpreadProps) {
  const { showToast } = useToast();
  const { user } = useAuth();
  
  // Kredi yönetimi - sesli ve yazılı okumalar için
  const detailedCredits = useReadingCredits('DETAILED');
  const writtenCredits = useReadingCredits('WRITTEN');
  const [spreadConfig, setSpreadConfig] = useState<TarotSpreadConfig | null>(
    externalConfig || null
  );
  const [loading, setLoading] = useState(!externalConfig);

  // Config'i yükle (eğer dışarıdan verilmemişse)
  useEffect(() => {
    if (!externalConfig) {
      // loadSpreadConfig fonksiyonu kaldırıldı - spread-loader.ts silindi
      // TODO: Bu fonksiyon yeniden implement edilmeli veya kaldırılmalı
      Promise.resolve(null).then(config => {
        setSpreadConfig(config);
        setLoading(false);
      });
    }
  }, [spreadId, externalConfig]);

  const {
    selectedCards,
    usedCardIds,
    showCardDetails,
    cardStates,
    isReversed,
    deck,
    currentPosition,
    handleCardSelect,
    handleCardDetails,
    setShowCardDetails,
    toggleCardState,
    handleClearAll,
    shuffleDeck,
    interpretationRef,
    userQuestion,
    // setUserQuestion, // Kullanılmıyor - kaldırıldı
    selectedReadingType,
    setSelectedReadingType,
  } = useTarotReading({
    config: {
      cardCount: 4,
      positionsInfo: [],
    },
    onComplete: (cards, interpretation) => {
      // Tarot açılımı tamamlandı - backend'e kaydet
    },
    onPositionChange: title => {
      // Pozisyon değişti
    },
  });

  // const [simpleQuestion, setSimpleQuestion] = useState(''); // Kaldırıldı - basit okuma için soru kaydet ekranı yok
  // const [simpleQuestionSaved, setSimpleQuestionSaved] = useState(false); // Kaldırıldı - basit okuma için soru kaydet ekranı yok
  const { showToast } = useToast();
  const [error, setError] = useState<string | null>(null);

  // Basit okuma için soru kaydetme fonksiyonu kaldırıldı - artık soru kaydet ekranı yok

  // Loading state
  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='text-white'>Açılım yükleniyor...</div>
      </div>
    );
  }

  // Config bulunamadı
  if (!spreadConfig) {
    return (
      <div className='text-red-500'>
        Açılım konfigürasyonu bulunamadı. Lütfen sistem yöneticisine başvurun.
      </div>
    );
  }

  const generateBasicInterpretation = (): string => {
    const cards = selectedCards as TarotCard[];
    if (
      selectedCards.length !== spreadConfig.cardCount ||
      selectedCards.some(c => !c)
    ) {
      return 'Tüm kartları seçmeden yorum oluşturulamaz.';
    }
    let interpretation = `**${spreadConfig.name}**\\n\\n`;
    if (userQuestion.trim()) {
      interpretation += `**Sevgili danışan,** sorunuz \"${userQuestion}\" için özel hazırlanmış analiz:\\n\\n`;
    }
    spreadConfig.positionsInfo.forEach((posInfo, index) => {
      const card = cards[index];
      const reversed = isReversed[index];
      if (card) {
        const meaning = reversed
          ? card.meaningTr.reversed
          : card.meaningTr.upright;
        interpretation += `**${posInfo.id}. ${posInfo.title}: ${card.nameTr}** (${reversed ? 'Ters' : 'Düz'})\\n*${posInfo.desc}*\\n${meaning}\\n\\n`;
      }
    });

    // Spread'e özel summary fonksiyonu varsa kullan
    if (spreadConfig.interpretationSummary) {
      interpretation += spreadConfig.interpretationSummary(cards);
    }

    return interpretation;
  };

  const handleReadingTypeSelect = (type: ReadingType | string) => {
    if (!user) {
      showToast('Okuma kaydı için giriş yapmalısınız.', 'error');
      return;
    }

    if (type === READING_TYPES.DETAILED || type === READING_TYPES.WRITTEN) {
      // Kredi kontrolü (kesintisi "Kaydet ve Kartları Aç" butonunda yapılacak)
      if (type === READING_TYPES.DETAILED && !detailedCredits.creditStatus.hasEnoughCredits) {
        showToast('Yetersiz kredi. Sesli okuma için yeterli krediniz yok.', 'error');
        return;
      }
      
      if (type === READING_TYPES.WRITTEN && !writtenCredits.creditStatus.hasEnoughCredits) {
        showToast('Yetersiz kredi. Yazılı okuma için yeterli krediniz yok.', 'error');
        return;
      }
      
      // Kredi yeterli - okuma tipini seç
      setSelectedReadingType(type as ReadingType);
      showToast('Okuma tipi seçildi. Kartları seçmeye başlayabilirsiniz.', 'success');
    } else {
      setSelectedReadingType(type as ReadingType);
    }
  };

  // Card renderer - şu anda Love için hardcoded ama gelecekte dinamik olacak
  const renderCard = (card: any, props: any) => {
    // Gelecekte bu dinamik olacak
    return <LoveCardRenderer card={card} {...props} />;
  };

  // Interpretation component - şu anda Love için hardcoded ama gelecekte dinamik olacak
  const renderInterpretation = () => {
    // Gelecekte bu dinamik olacak
    return (
      <LoveInterpretation
        cards={selectedCards}
        isReversed={isReversed}
        _userQuestion={userQuestion}
        _interpretation={generateBasicInterpretation()}
        _onSetUserQuestion={() => {}}
      />
    );
  };

  return (
    <div className='w-full space-y-6 md:space-y-8'>
      <div className='w-full relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60'>
        {selectedReadingType === null && (
          <div className='absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl'>
            <div className='text-white text-center'>
              Kartları seçmek için önce bir okuma tipi seçmelisiniz.
            </div>
          </div>
        )}
        {/* BASİT OKUMA SEÇİLDİYSE SORU FORMU KALDIRILDI - Direkt kart seçimi */}

        <div className='absolute inset-0 rounded-2xl overflow-hidden'>
          <img
            src={spreadConfig.backgroundImage}
            alt={`${spreadConfig.name} background`}
            className='absolute inset-0 w-full h-full object-cover object-center opacity-60'
            loading='lazy'
          />
          <div className='absolute inset-0 bg-gradient-to-br from-black/50 to-black/80' />
        </div>

        <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
          <div className='relative w-full h-full min-h-[320px] xs:min-h-[360px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[480px] xl:min-h-[520px]'>
            {spreadConfig.positionsLayout.map((position, idx) => (
              <BaseCardPosition
                key={position.id}
                position={position}
                card={selectedCards[position.id - 1]}
                isOpen={cardStates[position.id - 1]}
                isReversed={isReversed[position.id - 1]}
                isNextPosition={currentPosition === position.id}
                onToggleCard={() => toggleCardState(position.id)}
                onCardDetails={handleCardDetails}
                positionInfo={spreadConfig.positionsInfo[idx]}
                renderCard={renderCard}
                colorScheme={spreadConfig.theme as any}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedReadingType === null && (
        <div className='flex justify-center'>
          <BaseReadingTypeSelector
            selectedType={selectedReadingType}
            onTypeSelect={handleReadingTypeSelect}
            readingTypes={READING_TYPES}
            readingType={getReadingTypeKey(spreadId)}
            theme={spreadConfig.theme as any}
            disabled={false}
            className=''
          />
        </div>
      )}

      {selectedReadingType &&
        currentPosition &&
        currentPosition <= spreadConfig.cardCount && (
          <div className='flex justify-center mb-4'>
            <div className='bg-slate-800/70 border border-slate-600 rounded-2xl px-6 py-3 shadow-lg animate-pulse'>
              <div className='text-center'>
                <div className='text-white font-bold text-lg'>
                  {spreadConfig.positionsInfo[currentPosition - 1].title}
                </div>
                <div className='text-gray-300 text-xs'>
                  {spreadConfig.positionsInfo[currentPosition - 1].desc}
                </div>
              </div>
            </div>
          </div>
        )}

      <BaseCardGallery
        deck={deck}
        usedCardIds={usedCardIds}
        nextPosition={selectedReadingType ? currentPosition : null}
        onCardSelect={
          selectedReadingType
            ? handleCardSelect
            : () => {
                showToast('Lütfen önce bir okuma tipi seçin.', 'info');
              }
        }
        onShuffleDeck={shuffleDeck}
        canSelectCards={selectedReadingType !== null}
        renderCard={(card, isUsed, canSelect) =>
          renderCard(card, { isUsed, canSelect, mode: 'gallery' })
        }
      />

      {selectedCards.filter(c => c !== null).length > 0 && (
        <div className='flex justify-center'>
          <button
            onClick={handleClearAll}
            className='px-8 py-3 bg-slate-700/50 border border-slate-600 rounded-2xl text-gray-300 hover:bg-slate-700 transition-all'
          >
            🔄 Tümünü Temizle
          </button>
        </div>
      )}

      {showCardDetails && (
        <CardDetails
          card={showCardDetails}
          isReversed={
            isReversed[
              selectedCards.findIndex(
                (c: TarotCard | null) => c && c.id === showCardDetails.id
              )
            ]
          }
          position={
            selectedCards.findIndex(
              (c: TarotCard | null) => c && c.id === showCardDetails.id
            ) + 1
          }
          onClose={() => setShowCardDetails(null)}
          spreadType={spreadId.split('-')[0] as 'love'}
          positionInfo={
            spreadConfig.positionsInfo[
              selectedCards.findIndex(
                (c: TarotCard | null) => c && c.id === showCardDetails.id
              )
            ]
          }
        />
      )}

      {selectedCards.filter(c => c !== null).length ===
        spreadConfig.cardCount &&
        selectedReadingType && (
          <div ref={interpretationRef} className='space-y-6'>
            {renderInterpretation()}
          </div>
        )}
    </div>
  );
}
