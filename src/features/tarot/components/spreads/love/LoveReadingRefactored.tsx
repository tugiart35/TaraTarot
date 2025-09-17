/*
info:
---
Dosya Amacı:
- Aşk açılımı için refactor edilmiş ana bileşen
- Yeniden kullanılabilir shared bileşenleri kullanır
- Modüler yapı ve temiz kod

Bağlantılı Dosyalar:
- @/features/tarot/components/shared: Ortak bileşenler (gerekli)
- @/hooks/useTarotReading: Tarot okuma hook'u (gerekli)
- @/hooks/useTranslations: i18n desteği (gerekli)
- @/hooks/useAuth: Kullanıcı bilgileri (gerekli)
- @/hooks/useReadingCredits: Kredi yönetimi (gerekli)

Geliştirme ve Öneriler:
- Shared bileşenleri kullanarak kod tekrarını önler
- Tema sistemi ile özelleştirilebilir
- Modüler yapı ve kolay bakım
- Tip güvenliği ve hata yönetimi

Kullanım Durumu:
- LoveReadingRefactored: Gerekli, aşk açılımı için
- Shared bileşenler: Gerekli, kod tekrarını önler
- Tema sistemi: Gerekli, görsel tutarlılık için
*/

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/useAuth';
import { useTarotReading } from '@/hooks/useTarotReading';
import { useToast } from '@/hooks/useToast';
import { findSpreadById } from '@/lib/constants/tarotSpreads';
import {
  LOVE_POSITIONS_INFO,
  LOVE_POSITIONS_LAYOUT,
} from '../../Love-Spread/love-config';
import { READING_TYPES, ReadingType, TarotCard } from '@/types/tarot';
import { READING_CREDIT_CONFIGS } from '@/lib/constants/reading-credits';
import {
  BaseCardPosition,
  BaseCardGallery,
  BaseReadingTypeSelector,
  CardDetails,
  Toast,
} from '@/features/shared/ui';
import {
  TarotFormModal,
  CreditConfirmModal,
  SuccessModal,
  TarotReadingLayout,
  TarotReadingSaver,
  type PersonalInfo,
  type UserQuestions,
  type FormTheme,
  type ModalTheme,
  type SuccessModalTheme,
  type LayoutTheme,
} from '@/features/tarot/components/shared';
import LoveCardRenderer from '../../Love-Spread/LoveCardRenderer';
import LoveInterpretation from '../../Love-Spread/LoveInterpretation';

// Tema konfigürasyonları
const loveFormTheme: FormTheme = {
  primary: 'pink',
  secondary: 'purple',
  accent: 'red',
  background: 'slate-900/95',
  border: 'pink-500/30',
  text: 'pink-200',
  icon: '💕',
};

const loveModalTheme: ModalTheme = {
  primary: 'pink',
  secondary: 'purple',
  accent: 'red',
  background: 'slate-900',
  border: 'pink-500/40',
  text: 'pink-400',
};

const loveSuccessTheme: SuccessModalTheme = {
  primary: 'pink',
  secondary: 'purple',
  accent: 'red',
  background: 'pink-900/95',
  border: 'pink-500/30',
  text: 'pink-200',
  success: 'green',
};

const loveLayoutTheme: LayoutTheme = {
  primary: 'red',
  secondary: 'pink',
  accent: 'purple',
  background: 'red-900/90',
  border: 'pink-700/60',
  text: 'red-200',
  overlay: 'black/60',
};

// Ana bileşen props'ları
interface LoveReadingRefactoredProps {
  onComplete?: (_cards: TarotCard[], _interpretation: string) => void;
  onPositionChange?: (_title: string) => void;
}

export default function LoveReadingRefactored({
  onComplete: _onComplete,
  onPositionChange: _onPositionChange,
}: LoveReadingRefactoredProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const { user } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const loveSpread = findSpreadById('love-spread');

  // Kredi yönetimi
  // const detailedCredits = useReadingCredits('LOVE_SPREAD_DETAILED');

  // useTarotReading hook'unu kullan
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
    selectedReadingType,
    setSelectedReadingType,
  } = useTarotReading({
    config: {
      cardCount: 4,
      positionsInfo: LOVE_POSITIONS_INFO,
    },
    onComplete: (_cards, _interpretation) => {
      // Aşk açılımı tamamlandı
    },
    onPositionChange: _title => {
      // Pozisyon değişti
    },
  });

  // State'ler
  // const [error, setError] = useState<string | null>(null);
  const [startTime] = useState<number>(Date.now());
  const [isSaving, setIsSaving] = useState(false);
  const [showCreditConfirm, setShowCreditConfirm] = useState(false);
  const [detailedFormSaved, setDetailedFormSaved] = useState(false);
  const [isSavingReading, setIsSavingReading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form modal state'leri
  const [showFormModal, setShowFormModal] = useState(false);

  // ESC tuşu ile modal kapatma
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' &&
        (selectedReadingType === READING_TYPES.DETAILED ||
          selectedReadingType === READING_TYPES.WRITTEN) &&
        !detailedFormSaved
      ) {
        setSelectedReadingType(null);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [selectedReadingType, detailedFormSaved, setSelectedReadingType]);

  // Form kaydetme
  const handleFormSave = async (
    _personalInfo: PersonalInfo,
    _questions: UserQuestions
  ) => {
    if (!user) {
      showToast('Okuma için giriş yapmalısınız.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      // Kredi ön kesinti kaldırıldı. Kredi yeterliliği UI'da kontrol ediliyor,
      // asıl kesinti RPC çağrısı ile kaydetme anında yapılacak.
      console.log(
        '✅ LoveReadingRefactored - Form kaydedildi, detailedFormSaved true yapılıyor'
      );
      setDetailedFormSaved(true);
      setShowFormModal(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Seçilen okuma tipine göre kredi miktarını hesapla
  const getCreditAmount = () => {
    if (!selectedReadingType) return 0;

    const readingTypeKey =
      selectedReadingType === READING_TYPES.DETAILED
        ? 'LOVE_SPREAD_DETAILED'
        : selectedReadingType === READING_TYPES.WRITTEN
          ? 'LOVE_SPREAD_WRITTEN'
          : 'LOVE_SPREAD_DETAILED'; // fallback

    const config = READING_CREDIT_CONFIGS[readingTypeKey];
    console.log(
      '🎯 getCreditAmount - selectedReadingType:',
      selectedReadingType,
      'readingTypeKey:',
      readingTypeKey,
      'config:',
      config
    );

    return config?.cost || 0;
  };

  // Kredi onayı
  const handleCreditConfirm = async () => {
    setShowCreditConfirm(false);
    setShowFormModal(true);
  };

  // Okumayı kaydetme
  const handleSaveReading = async () => {
    setIsSavingReading(true);
    try {
      // Basit okuma için
      if (selectedReadingType === READING_TYPES.SIMPLE) {
        const saveResult = await TarotReadingSaver.saveSimpleReadingCounter();
        if (saveResult.success) {
          showToast('Basit okuma tamamlandı!', 'success');
          router.push('/');
        }
        return;
      }

      // Detaylı okuma için
      if (
        selectedReadingType === READING_TYPES.DETAILED ||
        selectedReadingType === READING_TYPES.WRITTEN
      ) {
        const saveResult = await TarotReadingSaver.saveReading({
          selectedCards,
          isReversed,
          interpretation: generateBasicInterpretation(),
          personalInfo: {
            name: '',
            surname: '',
            birthDate: '',
            email: '',
          },
          questions: {
            concern: '',
            understanding: '',
            emotional: '',
          },
          positionsInfo: LOVE_POSITIONS_INFO,
          readingType: 'love',
          startTime,
          user,
          costCredits: getCreditAmount(),
          spreadName: 'Aşk Yayılımı',
        });

        if (saveResult.success) {
          showToast('Okumanız başarıyla kaydedildi!', 'success');
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            router.push('/');
          }, 3000);
        } else {
          showToast('Okuma kaydedilirken bir hata oluştu.', 'error');
        }
      }
    } catch (error) {
      showToast('Okuma kaydedilirken bir hata oluştu.', 'error');
    } finally {
      setIsSavingReading(false);
    }
  };

  // Basit yorum oluştur
  const generateBasicInterpretation = (): string => {
    const cards = selectedCards as TarotCard[];
    if (selectedCards.length !== 4 || selectedCards.some(c => !c)) {
      return 'Tüm kartları seçmeden yorum oluşturulamaz.';
    }
    let interpretation = `❤️ **Aşk Açılımı**\n\n`;
    if (userQuestion.trim()) {
      interpretation += `**Sevgili danışan,** aşk sorunuz "${userQuestion}" için özel hazırlanmış analiz:\n\n`;
    }
    LOVE_POSITIONS_INFO.forEach((posInfo, index) => {
      const card = cards[index];
      const reversed = isReversed[index];
      if (card) {
        interpretation += `**${posInfo.id}. ${posInfo.title}: ${card.nameTr}** (${reversed ? 'Ters' : 'Düz'})\n*${posInfo.desc}*\n${card.meaningTr[reversed ? 'reversed' : 'upright']}\n\n`;
      }
    });
    interpretation += `💫 **${t('tarotPage.loveSpread.summary')}:**\n"${t('tarotPage.loveSpread.summaryText')}"`;
    return interpretation;
  };

  // Okuma tipi seçildiğinde
  const handleReadingTypeSelect = async (type: ReadingType | string) => {
    console.log('🎯 handleReadingTypeSelect çağrıldı:', type);
    if (type === READING_TYPES.DETAILED || type === READING_TYPES.WRITTEN) {
      console.log(
        '💳 DETAILED/WRITTEN seçildi, selectedReadingType set ediliyor:',
        type
      );
      setSelectedReadingType(type as ReadingType); // Önce tip set et
      setShowCreditConfirm(true);
      return;
    }
    console.log('✨ SIMPLE seçildi, selectedReadingType set ediliyor:', type);
    setSelectedReadingType(type as ReadingType);
  };

  if (!loveSpread) {
    return (
      <div className='text-red-500'>
        Aşk Açılımı konfigürasyonu bulunamadı. Lütfen tarotSpreads.ts dosyasını
        kontrol edin.
      </div>
    );
  }

  return (
    <div className='w-full space-y-6 md:space-y-8'>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <TarotReadingLayout
        theme={loveLayoutTheme}
        backgroundImage='/images/bg-love-tarot.jpg'
        showOverlay={selectedReadingType === null}
        overlayContent={
          <div className='flex flex-col items-center'>
            <div className='w-16 h-16 flex items-center justify-center bg-red-800/70 rounded-full mb-2 shadow-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-10 w-10 text-red-300'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
            </div>
            <div className='text-red-200 text-base font-semibold mb-1'>
              {t('reading.messages.cardsLocked')}
            </div>
            <div className='text-red-400 text-sm text-center max-w-xs'>
              {t('reading.messages.selectReadingTypeFirst')}
            </div>
          </div>
        }
      >
        {LOVE_POSITIONS_LAYOUT.map((position, idx) => (
          <BaseCardPosition
            key={position.id}
            position={position}
            card={selectedCards[position.id - 1] ?? null}
            isOpen={!!cardStates[position.id - 1]}
            isReversed={!!isReversed[position.id - 1]}
            isNextPosition={currentPosition === position.id}
            onToggleCard={() => toggleCardState(position.id)}
            onCardDetails={handleCardDetails}
            positionInfo={
              LOVE_POSITIONS_INFO[idx]
                ? {
                    title: LOVE_POSITIONS_INFO[idx].title,
                    desc: LOVE_POSITIONS_INFO[idx].desc,
                  }
                : { title: `Pozisyon ${position.id}`, desc: 'Kart pozisyonu' }
            }
            renderCard={(card, props) => (
              <LoveCardRenderer card={card} {...props} />
            )}
            colorScheme='pink'
          />
        ))}
      </TarotReadingLayout>

      {selectedReadingType === null && (
        <div className='flex justify-center'>
          <BaseReadingTypeSelector
            selectedType={selectedReadingType}
            onTypeSelect={handleReadingTypeSelect}
            onCreditInfoClick={() => router.push('/dashboard/credits')}
            readingTypes={READING_TYPES}
            readingType='LOVE_SPREAD'
            theme='pink'
            disabled={isSaving}
          />
        </div>
      )}

      {selectedReadingType && currentPosition && currentPosition <= 4 && (
        <div className='flex justify-center mb-4'>
          <div className='bg-gradient-to-r from-pink-600/20 via-red-500/30 to-purple-500/20 border border-pink-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse'>
            <div className='flex items-center space-x-3'>
              <div className='w-6 h-6 bg-red-400/20 rounded-full flex items-center justify-center'>
                <span className='text-red-300 text-sm'>❤️</span>
              </div>
              <div className='text-center'>
                <div className='text-red-200 font-bold text-lg'>
                  {LOVE_POSITIONS_INFO[currentPosition - 1]?.title ?? ''}
                </div>
                <div className='text-gray-300 text-xs'>
                  {LOVE_POSITIONS_INFO[currentPosition - 1]?.desc ?? ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BaseCardGallery
        deck={deck}
        usedCardIds={new Set(usedCardIds)}
        nextPosition={selectedReadingType ? currentPosition : null}
        onCardSelect={
          selectedReadingType
            ? handleCardSelect
            : () => {
                showToast('Lütfen önce bir okuma tipi seçin.', 'info');
              }
        }
        onShuffleDeck={shuffleDeck}
        canSelectCards={(() => {
          const canSelect =
            selectedReadingType === READING_TYPES.SIMPLE ||
            ((selectedReadingType === READING_TYPES.DETAILED ||
              selectedReadingType === READING_TYPES.WRITTEN) &&
              detailedFormSaved);
          console.log(
            '🔓 LoveReadingRefactored canSelectCards:',
            canSelect,
            'selectedReadingType:',
            selectedReadingType,
            'detailedFormSaved:',
            detailedFormSaved
          );
          return canSelect;
        })()}
        renderCard={(card, isUsed, canSelect) => (
          <LoveCardRenderer
            card={card}
            isUsed={isUsed}
            canSelect={canSelect}
            mode='gallery'
          />
        )}
        translations={{
          nextPosition: t('gallery.nextPosition'),
          allPositionsFull: t('gallery.allPositionsFull'),
          shuffle: t('gallery.shuffle'),
          scrollToSeeAll: t('gallery.scrollToSeeAll'),
          emptyDeck: t('gallery.emptyDeck'),
        }}
      />

      {selectedCards.filter(c => c !== null).length > 0 && (
        <div className='flex justify-center'>
          <button
            onClick={handleClearAll}
            className='px-8 py-3 bg-gradient-to-r from-pink-500/30 to-purple-500/20 border border-pink-500/50 rounded-2xl text-pink-400 hover:bg-pink-500/40 hover:border-pink-500/70 transition-all duration-300 font-semibold shadow-md shadow-pink-500/10'
          >
            {t('love.form.clearAll')}
          </button>
        </div>
      )}

      {showCardDetails && (
        <CardDetails
          card={showCardDetails}
          isReversed={(() => {
            const idx = selectedCards.findIndex(
              (c: TarotCard | null) => c && c.id === showCardDetails.id
            );
            return !!isReversed[idx >= 0 ? idx : 0];
          })()}
          position={(() => {
            const idx = selectedCards.findIndex(
              (c: TarotCard | null) => c && c.id === showCardDetails.id
            );
            return (idx >= 0 ? idx : 0) + 1;
          })()}
          onClose={() => setShowCardDetails(null)}
          spreadType='love'
          positionInfo={(() => {
            const idx = selectedCards.findIndex(
              (c: TarotCard | null) => c && c.id === showCardDetails.id
            );
            const p = LOVE_POSITIONS_INFO[idx];
            return p
              ? { title: p.title, desc: p.desc }
              : { title: `Pozisyon ${idx + 1}`, desc: 'Kart pozisyonu' };
          })()}
        />
      )}

      {selectedCards.filter(c => c !== null).length === 4 &&
        selectedReadingType && (
          <div ref={interpretationRef} className='space-y-6'>
            <LoveInterpretation cards={selectedCards} isReversed={isReversed} />

            {(selectedReadingType === READING_TYPES.DETAILED ||
              selectedReadingType === READING_TYPES.WRITTEN) && (
              <div className='flex justify-center mt-8'>
                <button
                  onClick={handleSaveReading}
                  disabled={isSavingReading}
                  className='px-8 py-4 bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg'
                >
                  {isSavingReading
                    ? t('love.modals.savingReading')
                    : t('love.modals.saveReading')}
                </button>
              </div>
            )}
          </div>
        )}

      {/* Form Modal */}
      <TarotFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSave={handleFormSave}
        theme={loveFormTheme}
        isLoading={isSaving}
        title={t('love.form.personalInfo')}
        icon='💕'
        userId={user?.id || ''}
        readingType={selectedReadingType || 'LOVE_SPREAD_DETAILED'}
      />

      {/* Kredi Onay Modal */}
      <CreditConfirmModal
        isOpen={showCreditConfirm}
        onClose={() => {
          console.log(
            "🚫 Kredi onay modalı vazgeç ile kapatıldı, state'ler sıfırlanıyor"
          );
          setShowCreditConfirm(false);
          setSelectedReadingType(null);
          setDetailedFormSaved(false);
        }}
        onConfirm={handleCreditConfirm}
        theme={loveModalTheme}
        isLoading={isSaving}
        creditAmount={getCreditAmount()}
        title={t('love.modals.creditConfirm')}
        message={t('love.modals.creditConfirmMessage')}
      />

      {/* Başarı Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        theme={loveSuccessTheme}
        title={t('love.modals.successTitle')}
        message={t('love.modals.successMessage')}
        info={t('love.modals.redirecting')}
        redirectDelay={3000}
        showProgress={true}
        icon='✅'
      />
    </div>
  );
}
