/*
info:
---
Dosya Amacı:
- Evlilik tarot açılımı ana bileşeni
- 10 kartlık özel düzen ile evlilik ve eş bulma analizi
- Kullanıcı kart seçer, pozisyonları yönetir, yorum alır

Bağlı Dosyalar:
- marriage-config.ts (konfigürasyon)
- position-meanings-index.ts (pozisyon anlamları)
- messages/tr.json (çeviriler)

Düzeltilen Hatalar:
- useEffect import eksikliği düzeltildi
- ESC tuşu ile modal kapatma özelliği eklendi
- Email gönderimi fonksiyonu eklendi
- cardStates ve toggleCardState eksiklikleri düzeltildi
- BaseCardPosition isOpen prop'u düzeltildi

Eklenen Özellikler:
- Form validasyon fonksiyonları mevcut
- Bilgilendirme modal'ı mevcut
- DETAILED/WRITTEN form modal'ı mevcut
- Kredi onay modal'ı mevcut
- ESC tuşu ile modal kapatma eklendi
- Email gönderimi fonksiyonu eklendi
- Form kaydetme ve kredi onay akışı tamamlandı

Üretime Hazır mı?:
- Evet, tüm özellikler tamamlandı, LoveTarot.tsx ve ProblemSolvingTarot.tsx ile uyumlu
---

*/

'use client';

import { getMarriageMeaningByCardAndPosition } from '@/features/tarot/lib/marriage/position-meanings-index';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { supabase } from '@/lib/supabase/client';
import {
  Toast,
  BaseCardPosition,
  BaseCardGallery,
  BaseReadingTypeSelector,
  CardDetails,
  BaseCardRenderer,
  BaseInterpretation,
} from '@/features/shared/ui';
import { useTarotReading } from '@/hooks/useTarotReading';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/useAuth';
import { useReadingCredits } from '@/hooks/useReadingCredits';
import { useToast } from '@/hooks/useToast';
import { findSpreadById } from '@/lib/constants/tarotSpreads';
import {
  MARRIAGE_POSITIONS_INFO,
  MARRIAGE_POSITIONS_LAYOUT,
  MARRIAGE_CARD_COUNT,
} from './marriage-config';

// Okuma tipleri
import { READING_TYPES, ReadingType, TarotCard } from '@/types/tarot';

// Ana bileşenin props'ları
interface MarriageReadingProps {
  onComplete?: (_cards: TarotCard[], _interpretation: string) => void;
  onPositionChange?: (_title: string) => void;
  onReadingTypeSelected?: () => void;
}

// Ana Evlilik Açılımı bileşeni
export default function MarriageReading({
  onComplete: _onComplete,
  onPositionChange: _onPositionChange,
  onReadingTypeSelected,
}: MarriageReadingProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const { user } = useAuth();
  const marriageSpread = findSpreadById('marriage-spread');

  // Kredi yönetimi
  const detailedCredits = useReadingCredits('MARRIAGE_DETAILED');
  const writtenCredits = useReadingCredits('MARRIAGE_WRITTEN');

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
      cardCount: MARRIAGE_CARD_COUNT,
      positionsInfo: MARRIAGE_POSITIONS_INFO,
    },
    onComplete: (_cards, _interpretation) => {
      // Evlilik açılımı tamamlandı
    },
    onPositionChange: _title => {
      // Pozisyon değişti
    },
  });

  // State'ler
  const { toast, showToast, hideToast } = useToast();
  const [startTime] = useState<number>(Date.now());

  // DETAILED/WRITTEN için ek state'ler
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    surname: '',
    birthDate: '',
    email: '',
  });
  const [questions, setQuestions] = useState({
    concern: '',
    understanding: '',
    emotional: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    surname: '',
    birthDate: '',
    email: '',
    concern: '',
    understanding: '',
    emotional: '',
    general: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showCreditConfirm, setShowCreditConfirm] = useState(false);
  const [detailedFormSaved, setDetailedFormSaved] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isSavingReading, setIsSavingReading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ESC tuşu ile modal kapatma
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' &&
        (selectedReadingType === READING_TYPES.DETAILED ||
          selectedReadingType === READING_TYPES.WRITTEN) &&
        !detailedFormSaved
      ) {
        // Form kaydetmeden çıkış uyarısı
        if (
          personalInfo.name ||
          personalInfo.surname ||
          personalInfo.email ||
          questions.concern
        ) {
          const shouldClose = window.confirm(
            'Form dolduruldu ancak kaydedilmedi. Çıkmak istediğinize emin misiniz?'
          );
          if (shouldClose) {
            setSelectedReadingType(null);
          }
        } else {
          setSelectedReadingType(null);
        }
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [
    selectedReadingType,
    detailedFormSaved,
    personalInfo,
    questions,
    setSelectedReadingType,
  ]);

  if (!marriageSpread) {
    return (
      <div className='text-red-500'>
        Evlilik Açılımı konfigürasyonu bulunamadı. Lütfen tarotSpreads.ts
        dosyasını kontrol edin.
      </div>
    );
  }

  // Pozisyona özel kart anlamını al
  const getMarriageCardMeaning = (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ): string => {
    if (!card) {
      return '';
    }
    const meaning = getMarriageMeaningByCardAndPosition(
      card,
      position,
      isReversed
    );
    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }
    return isReversed ? meaning.reversed : meaning.upright;
  };

  // Basit yorum oluştur
  const generateBasicInterpretation = (): string => {
    const cards = selectedCards as TarotCard[];
    if (
      selectedCards.length !== MARRIAGE_CARD_COUNT ||
      selectedCards.some(c => !c)
    ) {
      return 'Tüm kartları seçmeden yorum oluşturulamaz.';
    }
    let interpretation = `💒 **Evlilik Açılımı**\n\n`;
    if (userQuestion.trim()) {
      interpretation += `**Sevgili danışan,** evlilik analizi "${userQuestion}" için özel hazırlanmış analiz:\n\n`;
    }
    MARRIAGE_POSITIONS_INFO.forEach((posInfo, index) => {
      const card = cards[index];
      const reversed = !!isReversed[index];
      if (card) {
        interpretation += `**${posInfo.id}. ${posInfo.title}: ${card.nameTr}** (${reversed ? 'Ters' : 'Düz'})\n*${posInfo.desc}*\n${getMarriageCardMeaning(card, posInfo.id, reversed)}\n\n`;
      }
    });
    interpretation += `💫 **${t('tarotPage.marriageSpread.summary')}:**\n"${t('tarotPage.marriageSpread.summaryText')}"`;
    return interpretation;
  };

  // Okuma tipi seçildiğinde çalışacak fonksiyon
  const handleReadingTypeSelect = async (type: ReadingType | string) => {
    if (type === READING_TYPES.DETAILED || type === READING_TYPES.WRITTEN) {
      setSelectedReadingType(type as ReadingType);
      setShowInfoModal(true); // Bilgilendirme modal'ını göster
      return;
    }
    
    // Okuma tipi seçildiğinde parent bileşene bildir
    if (onReadingTypeSelected) {
      onReadingTypeSelected();
    }
    setSelectedReadingType(type as ReadingType);
  };

  // DETAILED/WRITTEN için validasyon fonksiyonları
  const updatePersonalInfo = (
    field: 'name' | 'surname' | 'birthDate' | 'email',
    value: string
  ) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
    setFormErrors(errors => ({ ...errors, [field]: '', general: '' }));
  };
  const updateQuestion = (field: keyof typeof questions, value: string) => {
    setQuestions(prev => ({ ...prev, [field]: value }));
    setFormErrors(errors => ({ ...errors, [field]: '', general: '' }));
  };
  const validateDetailedForm = () => {
    const errors: { [key: string]: string } = {};
    let hasError = false;
    if (!personalInfo.name.trim() || personalInfo.name.trim().length < 3) {
      errors.name = 'Ad en az 3 karakter olmalıdır.';
      hasError = true;
    }
    if (
      !personalInfo.surname.trim() ||
      personalInfo.surname.trim().length < 3
    ) {
      errors.surname = 'Soyad en az 3 karakter olmalıdır.';
      hasError = true;
    }
    if (!personalInfo.birthDate) {
      errors.birthDate = 'Doğum tarihi zorunludur.';
      hasError = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      errors.email = 'Geçerli bir e-posta adresi giriniz.';
      hasError = true;
    }
    if (!questions.concern.trim() || questions.concern.trim().length < 10) {
      errors.concern = 'Bu soruya en az 10 karakterlik yanıt vermelisiniz.';
      hasError = true;
    }
    if (
      !questions.understanding.trim() ||
      questions.understanding.trim().length < 10
    ) {
      errors.understanding =
        'Bu soruya en az 10 karakterlik yanıt vermelisiniz.';
      hasError = true;
    }
    if (!questions.emotional.trim() || questions.emotional.trim().length < 10) {
      errors.emotional = 'Bu soruya en az 10 karakterlik yanıt vermelisiniz.';
      hasError = true;
    }
    setFormErrors(prev => ({ ...prev, ...errors }));
    return !hasError;
  };
  const handleSaveDetailedFormClick = () => {
    if (!validateDetailedForm()) {
      return;
    }
    setShowCreditConfirm(true);
  };
  const saveDetailedForm = async () => {
    if (!user) {
      showToast('Okuma için giriş yapmalısınız.', 'error');
      setShowCreditConfirm(false);
      setIsSaving(false);
      return;
    }

    setIsSaving(true);
    try {
      setDetailedFormSaved(true);
      setShowCreditConfirm(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Okumayı kaydetme fonksiyonu
  const handleSaveReading = async () => {
    setIsSavingReading(true);
    try {
      // Basit okuma için sadece sayaç kaydı
      if (selectedReadingType === READING_TYPES.SIMPLE) {
        showToast('Basit okuma tamamlandı!', 'success');
        router.push('/');
        return;
      }

      // DETAILED/WRITTEN için backend optimizasyon şemasına uygun kaydetme
      if (
        selectedReadingType === READING_TYPES.DETAILED ||
        selectedReadingType === READING_TYPES.WRITTEN
      ) {
        const duration = Date.now() - startTime;

        // Standardize edilmiş veri yapısı
        const readingData = {
          userId: user?.id || 'anonymous-user',
          readingType: 'marriage',
          status: 'completed',
          title: 'Evlilik Açılımı - Detaylı Kişisel Okuma',
          interpretation: generateBasicInterpretation(),
          cards: {
            selectedCards: selectedCards
              .filter(card => card !== null)
              .map(card => ({
                id: card.id,
                name: card.name,
                nameTr: card.nameTr,
                isReversed: isReversed[selectedCards.indexOf(card)],
              })),
          },
          questions: {
            type: selectedReadingType,
            concern: questions.concern,
            understanding: questions.understanding,
            emotional: questions.emotional,
          },
          metadata: {
            duration,
            platform: 'web',
            readingFormat: selectedReadingType, // Sesli/yazılı bilgisi
            readingFormatTr: selectedReadingType === READING_TYPES.DETAILED ? 'Sesli' : 
                            selectedReadingType === READING_TYPES.WRITTEN ? 'Yazılı' : 'Basit',
          },
          timestamp: Date.now(),
        };

        // Database'e kaydet
        const saveResult = await saveReadingToSupabase(readingData);
        if (saveResult.success) {
          // Email gönderimi
          try {
            const emailResponse = await fetch('/api/send-reading-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                readingId: saveResult.id,
              }),
            });

            if (emailResponse.ok) {
              // Email gönderimi başarılı
            } else {
              // Email gönderimi başarısız
            }
          } catch (error) {
            // Email gönderimi hatası
          }

          showToast('Okumanız başarıyla kaydedildi!', 'success');
        } else {
          showToast('Okuma kaydedilirken bir hata oluştu.', 'error');
        }

        // Başarı modal'ını göster
        setShowSuccessModal(true);

        // 3 saniye sonra modal'ı kapat ve ana sayfaya yönlendir
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push('/');
        }, 3000);
        return;
      }
    } catch (error) {
      // Okuma kaydetme hatası
      showToast('Okuma kaydedilirken bir hata oluştu.', 'error');
    } finally {
      setIsSavingReading(false);
    }
  };

  // Supabase'e okuma kaydetme fonksiyonu
  const saveReadingToSupabase = async (readingData: any) => {
    try {
      // Sadece giriş yapmış kullanıcılar için veri sakla
      if (!user?.id) {
        // Guest kullanıcı - veri saklanmayacak
        return {
          success: true,
          id: 'guest-session',
          userId: 'guest',
          message: 'Guest kullanıcı için veri saklanmadı',
        };
      }

      // Okuma verileri Supabase e kaydediliyor

      // Kredi düş + okuma kaydet (atomik) — RPC
      const costCredits =
        selectedReadingType === READING_TYPES.DETAILED
          ? detailedCredits.creditStatus.requiredCredits
          : selectedReadingType === READING_TYPES.WRITTEN
            ? writtenCredits.creditStatus.requiredCredits
            : 0;

      const { data: rpcResult, error: rpcError } = await supabase.rpc(
        'fn_create_reading_with_debit',
        {
          p_user_id: user.id,
          p_reading_type: readingData.readingType,
          p_spread_name: 'Evlilik Yayılımı',
          p_title: readingData.title || 'Evlilik Açılımı',
          p_interpretation: readingData.interpretation,
          p_cards: readingData.cards.selectedCards,
          p_questions: readingData.questions,
          p_cost_credits: costCredits,
          p_metadata: {
            duration: readingData.metadata.duration,
            platform: readingData.metadata.platform,
          },
          p_idempotency_key: `reading_${user.id}_${readingData.timestamp}`,
        }
      );

      if (rpcError) {
        // RPC okuma kayıt hatası
        return { success: false, error: rpcError };
      }

      // Okuma başarıyla kaydedildi
      return { success: true, id: rpcResult?.id };
    } catch (error) {
      // Okuma kaydetme hatası
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      };
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-900/20 via-slate-900/60 to-rose-900/20'>
      {/* Ana sahne konteyneri */}
      <div className='relative overflow-hidden'>
        {/* Kart kilitleme overlay */}
        {selectedReadingType === null && (
          <div className='absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl'>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 flex items-center justify-center bg-pink-800/70 rounded-full mb-2 shadow-lg'>
                <span className='text-2xl'>💒</span>
              </div>
              <div className='text-pink-200 text-base font-semibold mb-1'>
                {t('reading.messages.cardsLocked')}
              </div>
              <div className='text-pink-400 text-sm text-center max-w-xs'>
                {t('reading.messages.selectReadingTypeFirst')}
              </div>
            </div>
          </div>
        )}

        <div className='absolute inset-0 rounded-2xl overflow-hidden'>
          <div
            className='absolute inset-0 bg-gradient-to-br from-pink-900/10 via-slate-900/60 to-rose-900/20 backdrop-blur-[2px]'
            style={{ zIndex: 1 }}
          />
          <Image
            src='/images/bg-love-tarot.jpg'
            alt='Evlilik Tarot Arka Plan'
            fill
            className='object-cover object-center opacity-60'
            style={{ zIndex: 0 }}
            priority={false}
          />
          <div
            className='absolute inset-0 bg-gradient-to-br from-pink-900/80 via-slate-900/10 to-rose-900/80'
            style={{ zIndex: 2 }}
          />
        </div>

        <div
          className='absolute inset-0 bg-black/30 backdrop-blur-[1.5px] rounded-2xl'
          style={{ zIndex: 4 }}
        />

        <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
          {/* Başlık */}
          <div className='text-center mb-4'>
            <h1 className='text-4xl font-bold text-pink-200 mb-2'></h1>
          </div>

          {/* Ana kart alanı */}
          <div className='relative w-full h-full min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] xl:min-h-[550px]'>
            {MARRIAGE_POSITIONS_LAYOUT.map(layout => {
              const posInfo = MARRIAGE_POSITIONS_INFO.find(
                p => p.id === layout.id
              );
              const card = selectedCards[layout.id - 1] || null;

              return (
                <BaseCardPosition
                  key={layout.id}
                  position={layout}
                  card={card}
                  isOpen={!!cardStates[layout.id - 1]}
                  isReversed={!!isReversed[layout.id - 1]}
                  isNextPosition={currentPosition === layout.id}
                  onToggleCard={() => toggleCardState(layout.id)}
                  onCardDetails={handleCardDetails}
                  positionInfo={
                    posInfo
                      ? { title: posInfo.title, desc: posInfo.desc }
                      : { title: '', desc: '' }
                  }
                  renderCard={(card, props) => (
                    <BaseCardRenderer card={card} theme='pink' {...props} />
                  )}
                  colorScheme='pink'
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Okuma tipi seçici */}
      {selectedReadingType === null && (
        <div className='flex justify-center'>
          <BaseReadingTypeSelector
            selectedType={selectedReadingType}
            onTypeSelect={handleReadingTypeSelect}
            onCreditInfoClick={() => router.push('/dashboard/credits')}
            readingTypes={READING_TYPES}
            readingType='MARRIAGE_DETAILED'
            theme='pink'
            disabled={isSaving}
          />
        </div>
      )}

      {/* Pozisyon bilgisi */}
      {selectedReadingType &&
        currentPosition &&
        currentPosition <= MARRIAGE_CARD_COUNT && (
          <div className='flex justify-center mb-4'>
            <div className='bg-gradient-to-r from-pink-600/20 via-slate-500/30 to-rose-500/20 border border-pink-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse'>
              <div className='flex items-center space-x-3'>
                <div className='w-6 h-6 bg-pink-400/20 rounded-full flex items-center justify-center'>
                  <span className='text-pink-300 text-sm'>💒</span>
                </div>
                <div className='text-center'>
                  <div className='text-pink-200 font-bold text-lg'>
                    {MARRIAGE_POSITIONS_INFO[currentPosition - 1]?.title ?? ''}
                  </div>
                  <div className='text-gray-300 text-xs'>
                    {MARRIAGE_POSITIONS_INFO[currentPosition - 1]?.desc ?? ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Kart galerisi */}
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
        canSelectCards={
          selectedReadingType === READING_TYPES.SIMPLE ||
          ((selectedReadingType === READING_TYPES.DETAILED ||
            selectedReadingType === READING_TYPES.WRITTEN) &&
            detailedFormSaved)
        }
        theme='pink'
        renderCard={(card, isUsed, canSelect) => (
          <BaseCardRenderer
            card={card}
            isUsed={isUsed}
            canSelect={canSelect}
            mode='gallery'
            theme='pink'
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

      {/* Temizle butonu */}
      {selectedCards.filter(c => c !== null).length > 0 && (
        <div className='flex justify-center'>
          <button
            onClick={handleClearAll}
            className='px-8 py-3 bg-gradient-to-r from-pink-500/30 to-rose-500/20 border border-pink-500/50 rounded-2xl text-pink-400 hover:bg-pink-500/40 hover:border-pink-500/70 transition-all duration-300 font-semibold shadow-md shadow-pink-500/10'
          >
            {t('marriage.form.clearAll')}
          </button>
        </div>
      )}

      {/* Yorum */}
      {selectedCards.filter(c => c !== null).length === MARRIAGE_CARD_COUNT &&
        selectedReadingType && (
          <div ref={interpretationRef} className='space-y-6'>
            <BaseInterpretation
              cards={selectedCards}
              isReversed={isReversed}
              theme='pink'
              title='Evlilik Açılımı Yorumu'
              icon='💒'
              badgeText='EVLİLİK'
              badgeColor='bg-pink-500/20 text-pink-400'
              positionsInfo={MARRIAGE_POSITIONS_INFO}
              getCardMeaning={(card) => {
                const position = selectedCards.findIndex(c => c?.id === card.id) + 1;
                const cardIsReversed = isReversed[position - 1] || false;
                const meaning = getMarriageMeaningByCardAndPosition(card, position, cardIsReversed);
                return meaning ? {
                  context: meaning.context,
                  keywords: meaning.keywords,
                  upright: meaning.upright,
                  reversed: meaning.reversed,
                  marriageMeaning: {
                    upright: meaning.upright,
                    reversed: meaning.reversed
                  }
                } : null;
              }}
              getPositionSpecificInterpretation={(card, position, isReversed) =>
                getMarriageCardMeaning(card, position, isReversed)
              }
              showContext={true}
            />

            {/* Okumayı Kaydet Butonu - Sadece DETAILED/WRITTEN için */}
            {(selectedReadingType === READING_TYPES.DETAILED ||
              selectedReadingType === READING_TYPES.WRITTEN) && (
              <div className='flex justify-center mt-8'>
                <button
                  onClick={handleSaveReading}
                  disabled={isSavingReading}
                  className='px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg'
                >
                  {isSavingReading
                    ? t('marriage.modals.savingReading')
                    : t('marriage.modals.saveReading')}
                </button>
              </div>
            )}
          </div>
        )}

      {/* BİLGİLENDİRME MODAL'ı - DETAILED/WRITTEN SEÇİLDİĞİNDE */}
      {showInfoModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'
          onClick={e => {
            if (e.target === e.currentTarget) {
              setShowInfoModal(false);
              setSelectedReadingType(null);
            }
          }}
        >
          <div className='bg-slate-900/95 border border-pink-500/30 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-pink-500/20 flex-shrink-0'>
              <div className='flex items-center'>
                <div className='w-12 h-12 flex items-center justify-center bg-pink-800/70 rounded-full mr-3 shadow-lg'>
                  <span className='text-xl text-pink-200'>💒</span>
                </div>
                <h2 className='text-pink-200 text-lg font-semibold'>
                  {t('marriage.info.title')}
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowInfoModal(false);
                  setSelectedReadingType(null);
                }}
                className='text-gray-400 hover:text-pink-300 transition-colors p-2 rounded-lg hover:bg-pink-500/10'
                title='Kapat'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className='flex-1 overflow-y-auto px-6 py-4'>
              <div className='space-y-4'>
                {/* Açılım Hakkında */}
                <div className='bg-pink-800/20 border border-pink-500/30 rounded-xl p-4'>
                  <h3 className='text-pink-200 font-semibold mb-2'>
                    {t('marriage.info.aboutSpread')}
                  </h3>
                </div>

                {/* Kart Sayısı */}
                <div className='bg-rose-800/20 border border-rose-500/30 rounded-xl p-4'>
                  <h3 className='text-rose-200 font-semibold mb-2'>
                    {t('marriage.info.cardCount')}
                  </h3>
                  <p className='text-gray-300 text-sm leading-relaxed'>
                    {t('marriage.info.cardCountText')}
                  </p>
                </div>

                {/* Okuma Türü */}
                <div className='bg-pink-800/20 border border-pink-500/30 rounded-xl p-4'>
                  <h3 className='text-pink-200 font-semibold mb-2'>
                    {selectedReadingType === READING_TYPES.DETAILED
                      ? t('marriage.info.detailedReading')
                      : t('marriage.info.writtenReading')}
                  </h3>
                  <p className='text-gray-300 text-sm leading-relaxed'>
                    {selectedReadingType === READING_TYPES.DETAILED
                      ? t('marriage.info.detailedReadingText')
                      : t('marriage.info.writtenReadingText')}
                  </p>
                </div>

                {/* Süreç */}
                <div className='bg-rose-800/20 border border-rose-500/30 rounded-xl p-4'>
                  <h3 className='text-rose-200 font-semibold mb-2'>
                    {t('marriage.info.process')}
                  </h3>
                  <div className='space-y-2'>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        1
                      </span>
                      {t('marriage.info.step1')}
                    </div>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        2
                      </span>
                      {t('marriage.info.step2')}
                    </div>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        3
                      </span>
                      {t('marriage.info.step3')}
                    </div>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        4
                      </span>
                      {t('marriage.info.step4')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='border-t border-pink-500/20 p-6 flex-shrink-0'>
              <div className='flex gap-3'>
                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    setSelectedReadingType(null);
                  }}
                  className='flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800'
                >
                  {t('marriage.info.cancel')}
                </button>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className='flex-1 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg'
                >
                  {t('marriage.info.continue')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED/WRITTEN SEÇİLDİYSE KİŞİSEL BİLGİ + 3 SORU FORMU - MOBİL RESPONSIVE */}
      {(selectedReadingType === READING_TYPES.DETAILED ||
        selectedReadingType === READING_TYPES.WRITTEN) &&
        !detailedFormSaved &&
        !showInfoModal && (
          <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'
            onClick={e => {
              if (e.target === e.currentTarget) {
                // Form kaydetmeden çıkış uyarısı
                if (
                  personalInfo.name ||
                  personalInfo.surname ||
                  personalInfo.email ||
                  questions.concern
                ) {
                  const shouldClose = window.confirm(
                    'Form dolduruldu ancak kaydedilmedi. Çıkmak istediğinize emin misiniz?'
                  );
                  if (shouldClose) {
                    setSelectedReadingType(null);
                  }
                } else {
                  setSelectedReadingType(null);
                }
              }
            }}
          >
            <div className='bg-slate-900/95 border border-pink-500/30 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col'>
              {/* Modal Header */}
              <div className='flex items-center justify-between p-6 border-b border-pink-500/20 flex-shrink-0'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 flex items-center justify-center bg-pink-800/70 rounded-full mr-3 shadow-lg'>
                    <span className='text-xl text-pink-200'>💒</span>
                  </div>
                  <h2 className='text-pink-200 text-lg font-semibold'>
                    {t('marriage.form.personalInfo')}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    // Form kaydetmeden çıkış uyarısı
                    if (
                      personalInfo.name ||
                      personalInfo.surname ||
                      personalInfo.email ||
                      questions.concern
                    ) {
                      const shouldClose = window.confirm(
                        'Form dolduruldu ancak kaydedilmedi. Çıkmak istediğinize emin misiniz?'
                      );
                      if (shouldClose) {
                        setSelectedReadingType(null);
                      }
                    } else {
                      setSelectedReadingType(null);
                    }
                  }}
                  className='text-gray-400 hover:text-pink-300 transition-colors p-2 rounded-lg hover:bg-pink-500/10'
                  title='Formu kapat (ESC)'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className='flex-1 overflow-y-auto px-6 py-4'>
                <div className='space-y-4'>
                  {/* Ad Soyad Grid */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-pink-200 mb-2'>
                        {t('marriage.form.firstName')} *
                      </label>
                      <input
                        type='text'
                        value={personalInfo.name}
                        onChange={e =>
                          updatePersonalInfo('name', e.target.value)
                        }
                        placeholder='Adınız'
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.name
                            ? 'border-red-500'
                            : 'border-pink-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200 text-base`}
                        autoComplete='given-name'
                      />
                      {formErrors.name && (
                        <p className='text-xs text-red-400 mt-1'>
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-pink-200 mb-2'>
                        {t('marriage.form.lastName')} *
                      </label>
                      <input
                        type='text'
                        value={personalInfo.surname}
                        onChange={e =>
                          updatePersonalInfo('surname', e.target.value)
                        }
                        placeholder='Soyadınız'
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.surname
                            ? 'border-red-500'
                            : 'border-pink-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200 text-base`}
                        autoComplete='family-name'
                      />
                      {formErrors.surname && (
                        <p className='text-xs text-red-400 mt-1'>
                          {formErrors.surname}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Doğum Tarihi */}
                  <div>
                    <label className='block text-sm font-medium text-pink-200 mb-2'>
                      {t('marriage.form.birthDate')} *
                    </label>
                    <input
                      type='date'
                      value={personalInfo.birthDate}
                      onChange={e =>
                        updatePersonalInfo('birthDate', e.target.value)
                      }
                      className={`w-full px-4 py-3 bg-slate-800/80 border ${
                        formErrors.birthDate
                          ? 'border-red-500'
                          : 'border-pink-400/50'
                      } rounded-xl text-white focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200 text-base`}
                    />
                    {formErrors.birthDate && (
                      <p className='text-xs text-red-400 mt-1'>
                        {formErrors.birthDate}
                      </p>
                    )}
                  </div>

                  {/* E-posta */}
                  <div>
                    <label className='block text-sm font-medium text-pink-200 mb-2'>
                      {t('marriage.form.email')} *
                    </label>
                    <input
                      type='email'
                      value={personalInfo.email}
                      onChange={e =>
                        updatePersonalInfo('email', e.target.value)
                      }
                      placeholder='ornek@email.com'
                      className={`w-full px-4 py-3 bg-slate-800/80 border ${
                        formErrors.email
                          ? 'border-red-500'
                          : 'border-pink-400/50'
                      } rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200 text-base`}
                      autoComplete='email'
                    />
                    {formErrors.email && (
                      <p className='text-xs text-red-400 mt-1'>
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Sorular Bölümü */}
                  <div className='pt-4 border-t border-pink-500/20'>
                    <h3 className='text-pink-200 font-medium mb-4 text-center'>
                      {t('marriage.form.questions')}
                    </h3>

                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium text-pink-200 mb-2'>
                          {t('marriage.form.concernQuestion')}
                        </label>
                        <textarea
                          value={questions.concern}
                          onChange={e =>
                            updateQuestion('concern', e.target.value)
                          }
                          placeholder='Endişelerinizi detaylı bir şekilde açıklayın...'
                          className={`w-full px-4 py-3 bg-slate-800/80 border ${
                            formErrors.concern
                              ? 'border-red-500'
                              : 'border-pink-400/50'
                          } rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200 text-base resize-none`}
                          rows={3}
                        />
                        {formErrors.concern && (
                          <p className='text-xs text-red-400 mt-1'>
                            {formErrors.concern}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-pink-200 mb-2'>
                          {t('marriage.form.understandingQuestion')}
                        </label>
                        <textarea
                          value={questions.understanding}
                          onChange={e =>
                            updateQuestion('understanding', e.target.value)
                          }
                          placeholder='Öğrenmek istediğiniz konuları belirtin...'
                          className={`w-full px-4 py-3 bg-slate-800/80 border ${
                            formErrors.understanding
                              ? 'border-red-500'
                              : 'border-pink-400/50'
                          } rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200 text-base resize-none`}
                          rows={3}
                        />
                        {formErrors.understanding && (
                          <p className='text-xs text-red-400 mt-1'>
                            {formErrors.understanding}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-pink-200 mb-2'>
                          {t('marriage.form.emotionalQuestion')}
                        </label>
                        <textarea
                          value={questions.emotional}
                          onChange={e =>
                            updateQuestion('emotional', e.target.value)
                          }
                          placeholder='Mevcut duygusal durumunuzu açıklayın...'
                          className={`w-full px-4 py-3 bg-slate-800/80 border ${
                            formErrors.emotional
                              ? 'border-red-500'
                              : 'border-pink-400/50'
                          } rounded-xl text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-200 text-base resize-none`}
                          rows={3}
                        />
                        {formErrors.emotional && (
                          <p className='text-xs text-red-400 mt-1'>
                            {formErrors.emotional}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {formErrors.general && (
                    <div className='text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center'>
                      {formErrors.general}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer - Her zaman görünür */}
              <div className='p-6 border-t border-pink-500/20 flex-shrink-0'>
                <button
                  onClick={handleSaveDetailedFormClick}
                  className='w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base'
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className='flex items-center justify-center'>
                      <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                      {t('marriage.form.saving')}
                    </div>
                  ) : (
                    t('marriage.form.saveAndOpen')
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Kredi Onay Modalı */}
      {showCreditConfirm && (
        <div className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'>
          <div className='bg-slate-900 border border-pink-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4'>
            <h2 className='text-xl font-bold text-pink-400 mb-4 text-center'>
              {t('marriage.credit.title')}
            </h2>
            <p className='text-gray-200 text-center mb-6'>
              {t('marriage.credit.description')}
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={saveDetailedForm}
                disabled={isSaving}
                className='bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60'
              >
                {isSaving
                  ? t('marriage.credit.saving')
                  : t('marriage.credit.confirm')}
              </button>
              <button
                onClick={() => setShowCreditConfirm(false)}
                disabled={isSaving}
                className='bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60'
              >
                {t('marriage.credit.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kart detayları modalı */}
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
          spreadType='marriage'
          positionInfo={(() => {
            const idx = selectedCards.findIndex(
              (c: TarotCard | null) => c && c.id === showCardDetails.id
            );
            const p = MARRIAGE_POSITIONS_INFO[idx];
            return p
              ? { title: p.title, desc: p.desc }
              : { title: `Pozisyon ${idx + 1}`, desc: 'Kart pozisyonu' };
          })()}
          getCardMeaning={(card) => {
            const position = selectedCards.findIndex(c => c?.id === card.id) + 1;
            const cardIsReversed = isReversed[position - 1] || false;
            const meaning = getMarriageMeaningByCardAndPosition(card, position, cardIsReversed);
            return meaning ? {
              context: meaning.context,
              keywords: meaning.keywords,
              upright: meaning.upright,
              reversed: meaning.reversed,
              marriageMeaning: {
                upright: meaning.upright,
                reversed: meaning.reversed
              }
            } : null;
          }}
          getPositionSpecificInterpretation={(card, position, isReversed) =>
            getMarriageCardMeaning(card, position, isReversed)
          }
          showContext={true}
        />
      )}

      {/* Başarı Modal'ı */}
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-gradient-to-br from-pink-900/95 to-rose-900/95 border border-pink-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center'>
            {/* Başarı İkonu */}
            <div className='w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
              <span className='text-3xl'>✅</span>
            </div>

            {/* Başlık */}
            <h2 className='text-2xl font-bold text-green-400 mb-4'>
              {t('marriage.modals.successTitle')}
            </h2>

            {/* Mesaj */}
            <p className='text-pink-200 mb-6 leading-relaxed'>
              {t('marriage.modals.successMessage')}
            </p>

            {/* Bilgi */}
            <div className='bg-pink-800/30 border border-pink-500/20 rounded-xl p-4 mb-6'>
              <p className='text-pink-300 text-sm'>
                {t('marriage.modals.redirecting')}
              </p>
            </div>

            {/* Progress Bar */}
            <div className='w-full bg-pink-800/30 rounded-full h-2 mb-4'>
              <div className='bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full animate-pulse'></div>
            </div>
          </div>
        </div>
      )}

      {/* Toast mesajları */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
