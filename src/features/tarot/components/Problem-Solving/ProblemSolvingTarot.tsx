/*
info:
---
Dosya Amacı:
- Problem Çözme tarot açılımı ana bileşeni
- 10 kartlık özel düzen ile problem analizi
- Kullanıcı kart seçer, pozisyonları yönetir, yorum alır

Bağlı Dosyalar:
- problem-solving-config.ts (konfigürasyon)
- position-meanings-index.ts (pozisyon anlamları)
- messages/tr.json (çeviriler)

Üretime Hazır mı?:
- Evet, temel yapı hazır, detaylı özellikler eklenebilir
---

*/

'use client';

import { getProblemSolvingMeaningByCardAndPosition } from '@/features/tarot/lib/problem-solving/position-meanings-index';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  PROBLEM_SOLVING_POSITIONS_INFO,
  PROBLEM_SOLVING_POSITIONS_LAYOUT,
  PROBLEM_SOLVING_CARD_COUNT,
} from './problem-solving-config';

// Okuma tipleri
import { READING_TYPES, ReadingType, TarotCard } from '@/types/tarot';

// Ana bileşenin props'ları
interface ProblemSolvingReadingProps {
  onComplete?: (_cards: TarotCard[], _interpretation: string) => void;
  onPositionChange?: (_title: string) => void;
}

// Ana Problem Çözme Açılımı bileşeni
export default function ProblemSolvingReading({
  onComplete: _onComplete,
  onPositionChange: _onPositionChange,
}: ProblemSolvingReadingProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const { user } = useAuth();
  const problemSolvingSpread = findSpreadById('problem-solving-spread');

  // Kredi yönetimi
  const detailedCredits = useReadingCredits('PROBLEM_SOLVING_DETAILED');
  const writtenCredits = useReadingCredits('PROBLEM_SOLVING_WRITTEN');

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
      cardCount: PROBLEM_SOLVING_CARD_COUNT,
      positionsInfo: PROBLEM_SOLVING_POSITIONS_INFO as any,
    },
    onComplete: (_cards, _interpretation) => {
      // Problem çözme açılımı tamamlandı
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
            t('problemSolving.validation.formUnsavedWarning')
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
      errors.name = t('problemSolving.validation.nameMinLength');
      hasError = true;
    }
    if (
      !personalInfo.surname.trim() ||
      personalInfo.surname.trim().length < 3
    ) {
      errors.surname = t('problemSolving.validation.surnameMinLength');
      hasError = true;
    }
    if (!personalInfo.birthDate) {
      errors.birthDate = t('problemSolving.validation.birthDateRequired');
      hasError = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      errors.email = t('problemSolving.validation.emailInvalid');
      hasError = true;
    }
    if (!questions.concern.trim() || questions.concern.trim().length < 10) {
      errors.concern = t('problemSolving.validation.concernMinLength');
      hasError = true;
    }
    if (
      !questions.understanding.trim() ||
      questions.understanding.trim().length < 10
    ) {
      errors.understanding = t('problemSolving.validation.understandingMinLength');
      hasError = true;
    }
    if (!questions.emotional.trim() || questions.emotional.trim().length < 10) {
      errors.emotional = t('problemSolving.validation.emotionalMinLength');
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
      showToast(t('problemSolving.messages.loginRequired'), 'error');
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

  if (!problemSolvingSpread) {
    return (
      <div className='text-red-500'>
        {t('problemSolving.messages.configurationNotFound')}
      </div>
    );
  }

  // Pozisyona özel kart anlamını al
  const getProblemSolvingCardMeaning = (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ): string => {
    if (!card) {
      return '';
    }
    const meaning = getProblemSolvingMeaningByCardAndPosition(card, position, isReversed);
    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }
    return isReversed ? meaning.reversed : meaning.upright;
  };

  // Context bilgilerini al
  const getCardMeaning = (card: TarotCard) => {
    const position = selectedCards.findIndex(c => c?.id === card.id) + 1;
    if (position === 0) return null;
    
    // Pozisyona özel kart anlamını al
    const meaning = getProblemSolvingMeaningByCardAndPosition(card, position, false);
    if (!meaning) return null;

    return {
      card: card.name,
      name: card.nameTr,
      context: meaning.context, // Kartın pozisyonuna özel context bilgisini kullan
      keywords: meaning.keywords,
    };
  };

  // Basit yorum oluştur
  const generateBasicInterpretation = (): string => {
    const cards = selectedCards as TarotCard[];
    if (
      selectedCards.length !== PROBLEM_SOLVING_CARD_COUNT ||
      selectedCards.some(c => !c)
    ) {
      return t('problemSolving.messages.allCardsRequired');
    }
    let interpretation = `🔍 **${t('problemSolving.data.interpretationTitle')}**\n\n`;
    if (userQuestion.trim()) {
      interpretation += `**${t('problemSolving.data.dearClient')}** problem analizi "${userQuestion}" için özel hazırlanmış analiz:\n\n`;
    }
    PROBLEM_SOLVING_POSITIONS_INFO.forEach((posInfo, index) => {
      const card = cards[index];
      const reversed = !!isReversed[index];
      if (card) {
        interpretation += `**${posInfo.id}. ${posInfo.title}: ${card.nameTr}** (${reversed ? t('problemSolving.data.reversed') : t('problemSolving.data.upright')})\n*${posInfo.desc}*\n${getProblemSolvingCardMeaning(card, posInfo.id, reversed)}\n\n`;
      }
    });
    interpretation += `💫 **${t('tarotPage.problemSolvingSpread.summary')}:**\n"${t('tarotPage.problemSolvingSpread.summaryText')}"`;
    return interpretation;
  };

  // Okuma tipi seçildiğinde çalışacak fonksiyon
  const handleReadingTypeSelect = async (type: ReadingType | string) => {
    if (type === READING_TYPES.DETAILED || type === READING_TYPES.WRITTEN) {
      setSelectedReadingType(type as ReadingType);
      setShowInfoModal(true); // Bilgilendirme modal'ını göster
      return;
    }
    setSelectedReadingType(type as ReadingType);
  };

  // Okumayı kaydetme fonksiyonu
  const handleSaveReading = async () => {
    setIsSavingReading(true);
    try {
      // Basit okuma için sadece sayaç kaydı
      if (selectedReadingType === READING_TYPES.SIMPLE) {
        // Basit okuma sayacı için minimal kayıt
        const simpleReadingData = {
          userId: 'anonymous-user',
          readingType: 'simple',
          cards: { selectedCards: [] }, // Boş kart listesi
          interpretation: t('problemSolving.data.simpleReadingCounter'),
          question: { type: 'simple' },
          status: 'completed',
          title: 'Basit Okuma',
          cost_credits: 0, // Ücretsiz
          admin_notes: 'Simple reading counter',
        };

        // Database'e kaydet
        const saveResult = await saveReadingToSupabase(simpleReadingData);
        if (saveResult.success) {
          console.log('Basit okuma sayacı kaydedildi:', saveResult.id);
        }

        showToast(t('problemSolving.messages.simpleReadingCompleted'), 'success');
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
          readingType: 'problem-solving',
          status: 'completed',
          title: t('problemSolving.data.detailedReadingTitle'),
          interpretation: generateBasicInterpretation(),
          cards: {
            selectedCards: selectedCards.map(card => ({
              id: card?.id,
              name: card?.name,
              nameTr: card?.nameTr,
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
          console.log('Problem çözme okuması kaydedildi:', saveResult.id);
          
          // Başarı toast'ını hemen göster
          showToast(t('problemSolving.messages.readingSavedSuccessfully'), 'success');
          
          // Başarı modal'ını göster
          setShowSuccessModal(true);

          // Email gönderimi arka planda (asenkron)
          fetch('/api/send-reading-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              readingId: saveResult.id,
            }),
          }).then(response => {
            if (response.ok) {
              console.log('✅ Email gönderimi başarılı');
            } else {
              console.error('❌ Email gönderimi başarısız');
            }
          }).catch(error => {
            console.error('❌ Email gönderimi hatası:', error);
          });

          // Kısa süre sonra ana sayfaya yönlendir
          setTimeout(() => {
            setShowSuccessModal(false);
            router.push('/');
          }, 1500); // 3 saniyeden 1.5 saniyeye düşürüldü
        } else {
          console.error('Okuma kaydetme hatası:', saveResult.error);
          showToast(t('problemSolving.messages.readingSaveError'), 'error');
        }
        return;
      }
    } catch (error) {
      console.error('Okuma kaydetme hatası:', error);
      showToast(t('problemSolving.messages.readingSaveError'), 'error');
    } finally {
      setIsSavingReading(false);
    }
  };

  // Supabase'e okuma kaydetme fonksiyonu
  const saveReadingToSupabase = async (readingData: any) => {
    try {
      // Sadece giriş yapmış kullanıcılar için veri sakla
      if (!user?.id) {
        console.log('Guest kullanıcı - veri saklanmayacak');
        return {
          success: true,
          id: 'guest-session',
          userId: 'guest',
          message: 'Guest kullanıcı için veri saklanmadı',
        };
      }

      console.log('Okuma verileri Supabase e kaydediliyor:', {
        userId: user.id,
        readingType: readingData.readingType,
        cardsCount: readingData.cards.selectedCards.length,
        hasQuestions: !!readingData.questions,
      });

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
          p_spread_name: t('problemSolving.data.spreadName'),
          p_title: readingData.title || t('problemSolving.data.defaultTitle'),
          p_interpretation: readingData.interpretation,
          p_cards: readingData.cards.selectedCards,
          p_questions: readingData.questions,
          p_cost_credits: costCredits,
          p_metadata: {
            duration: readingData.metadata.duration,
            platform: readingData.metadata.platform,
            readingFormat: readingData.metadata.readingFormat,
            readingFormatTr: readingData.metadata.readingFormatTr,
          },
          p_idempotency_key: `reading_${user.id}_${readingData.timestamp}`,
        }
      );

      if (rpcError) {
        console.error('RPC okuma kayıt hatası:', rpcError);
        return { success: false, error: rpcError };
      }

      console.log('Okuma başarıyla kaydedildi:', rpcResult?.id);
      return { success: true, id: rpcResult?.id };
    } catch (error) {
      console.error('Okuma kaydetme hatası:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      };
    }
  };

  // ANA UI RENDER
  return (
    <div className='w-full space-y-6 md:space-y-8'>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      
      {/* PROBLEM ÇÖZME AÇILIMI ANA SAHNESI */}
      <div className='w-full relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-900/90 via-slate-900/80 to-indigo-800/80 border border-purple-700/60'>
        {/* KARTLAR KİLİTLİ OVERLAY */}
        {selectedReadingType === null && (
          <div className='absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl'>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 flex items-center justify-center bg-purple-800/70 rounded-full mb-2 shadow-lg'>
                <span className='text-2xl'>🔍</span>
              </div>
              <div className='text-purple-200 text-base font-semibold mb-1'>
                {t('reading.messages.cardsLocked')}
              </div>
              <div className='text-purple-400 text-sm text-center max-w-xs'>
                {t('reading.messages.selectReadingTypeFirst')}
              </div>
            </div>
          </div>
        )}

        {/* KARTLAR KİLİTLİ OVERLAY - Form kaydedilene kadar göster */}
        {(selectedReadingType === READING_TYPES.DETAILED ||
          selectedReadingType === READING_TYPES.WRITTEN) &&
          !detailedFormSaved && (
            <div className='absolute inset-0 z-20 bg-black/40 rounded-2xl' />
          )}

        <div className='absolute inset-0 rounded-2xl overflow-hidden'>
          <div
            className='absolute inset-0 bg-gradient-to-br from-purple-900/10 via-slate-900/60 to-indigo-900/20 backdrop-blur-[2px]'
            style={{ zIndex: 1 }}
          />
          <img
            src='/images/bg-3card-tarot.jpg'
            alt='Problem Solving Tarot Reading background'
            className='absolute inset-0 w-full h-full object-cover object-center opacity-60'
            loading='lazy'
            style={{ zIndex: 0 }}
          />
          <div
            className='absolute inset-0 bg-gradient-to-br from-purple-900/80 via-slate-900/10 to-indigo-900/80'
            style={{ zIndex: 2 }}
          />
        </div>

        <div
          className='absolute inset-0 bg-black/30 backdrop-blur-[1.5px] rounded-2xl'
          style={{ zIndex: 4 }}
        />

        <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
          <div className='relative w-full h-full min-h-[400px] xs:min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] xl:min-h-[650px]'>
            {PROBLEM_SOLVING_POSITIONS_LAYOUT.map((position, idx) => (
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
                  PROBLEM_SOLVING_POSITIONS_INFO[idx] ?? {
                    title: `Pozisyon ${position.id}`,
                    desc: 'Kart pozisyonu',
                  }
                }
                renderCard={(card, props) => (
                  <BaseCardRenderer card={card} theme='purple' {...props} />
                )}
                colorScheme='purple'
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
            onCreditInfoClick={() => router.push('/dashboard/credits')}
            readingTypes={READING_TYPES}
            readingType='PROBLEM_SOLVING_DETAILED'
            theme='purple'
            disabled={isSaving}
          />
        </div>
      )}

      {selectedReadingType &&
        currentPosition &&
        currentPosition <= PROBLEM_SOLVING_CARD_COUNT && (
          <div className='flex justify-center mb-4'>
            <div className='bg-gradient-to-r from-purple-600/20 via-slate-500/30 to-indigo-500/20 border border-purple-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse'>
              <div className='flex items-center space-x-3'>
                <div className='w-6 h-6 bg-purple-400/20 rounded-full flex items-center justify-center'>
                  <span className='text-purple-300 text-sm'>🔍</span>
                </div>
                <div className='text-center'>
                  <div className='text-purple-200 font-bold text-lg'>
                    {PROBLEM_SOLVING_POSITIONS_INFO[currentPosition - 1]?.title ?? ''}
                  </div>
                  <div className='text-gray-300 text-xs'>
                    {PROBLEM_SOLVING_POSITIONS_INFO[currentPosition - 1]?.desc ?? ''}
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
                showToast(t('problemSolving.messages.selectReadingTypeFirst'), 'info');
              }
        }
        onShuffleDeck={shuffleDeck}
        canSelectCards={
          selectedReadingType === READING_TYPES.SIMPLE ||
          ((selectedReadingType === READING_TYPES.DETAILED ||
            selectedReadingType === READING_TYPES.WRITTEN) &&
            detailedFormSaved)
        }
        theme='purple'
        renderCard={(card, isUsed, canSelect) => (
          <BaseCardRenderer
            card={card}
            isUsed={isUsed}
            canSelect={canSelect}
            mode='gallery'
            theme='purple'
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
            className='px-8 py-3 bg-gradient-to-r from-purple-500/30 to-indigo-500/20 border border-purple-500/50 rounded-2xl text-purple-400 hover:bg-purple-500/40 hover:border-purple-500/70 transition-all duration-300 font-semibold shadow-md shadow-purple-500/10'
          >
            {t('problemSolving.form.clearAll')}
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
          spreadType='problem-solving'
          positionInfo={(() => {
            const idx = selectedCards.findIndex(
              (c: TarotCard | null) => c && c.id === showCardDetails.id
            );
            const p = PROBLEM_SOLVING_POSITIONS_INFO[idx];
            return p
              ? { title: p.title, desc: p.desc }
              : { title: `Pozisyon ${idx + 1}`, desc: 'Kart pozisyonu' };
          })()}
        />
      )}

      {selectedCards.filter(c => c !== null).length === PROBLEM_SOLVING_CARD_COUNT &&
        selectedReadingType && (
          <div ref={interpretationRef} className='space-y-6'>
            <BaseInterpretation
              cards={selectedCards}
              isReversed={isReversed}
              theme='purple'
              title={t('problemSolving.data.interpretationTitle')}
              icon='🔍'
              badgeText='PROBLEM ÇÖZME'
              badgeColor='bg-purple-500/20 text-purple-400'
              positionsInfo={PROBLEM_SOLVING_POSITIONS_INFO}
              getCardMeaning={getCardMeaning}
              getPositionSpecificInterpretation={(card, position, isReversed) =>
                getProblemSolvingCardMeaning(card, position, isReversed)
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
                  className='px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg'
                >
                  {isSavingReading
                    ? t('problemSolving.messages.savingReading')
                    : t('problemSolving.modals.saveReading')}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Başarı Modal'ı */}
        {showSuccessModal && (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-gradient-to-br from-purple-900/95 to-indigo-900/95 border border-purple-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center'>
              {/* Başarı İkonu */}
              <div className='w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
                <span className='text-3xl'>✅</span>
              </div>

              {/* Başlık */}
              <h2 className='text-2xl font-bold text-green-400 mb-4'>
                {t('problemSolving.modals.successTitle')}
              </h2>

              {/* Mesaj */}
              <p className='text-purple-200 mb-6 leading-relaxed'>
                {t('problemSolving.modals.successMessage')}
              </p>

              {/* Bilgi */}
              <div className='bg-purple-800/30 border border-purple-500/20 rounded-xl p-4 mb-6'>
                <p className='text-purple-300 text-sm'>
                  {t('problemSolving.modals.redirecting')}
                </p>
              </div>

              {/* Progress Bar */}
              <div className='w-full bg-purple-800/30 rounded-full h-2 mb-4'>
                <div className='bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full animate-pulse'></div>
              </div>
              
              {/* Hızlı yönlendirme bilgisi */}
              <p className='text-purple-300 text-xs'>
                {t('problemSolving.messages.redirectingToHome')}
              </p>
            </div>
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
            <div className='bg-slate-900/95 border border-purple-500/30 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col'>
              {/* Modal Header */}
              <div className='flex items-center justify-between p-6 border-b border-purple-500/20 flex-shrink-0'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 flex items-center justify-center bg-purple-800/70 rounded-full mr-3 shadow-lg'>
                    <span className='text-xl text-purple-200'>🔍</span>
                  </div>
                  <h2 className='text-purple-200 text-lg font-semibold'>
                    {t('problemSolving.modals.infoTitle')}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    setSelectedReadingType(null);
                  }}
                  className='text-gray-400 hover:text-purple-300 transition-colors p-2 rounded-lg hover:bg-purple-500/10'
                  title={t('problemSolving.form.close')}
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
                  <div className='bg-purple-800/20 border border-purple-500/30 rounded-xl p-4'>
                    <h3 className='text-purple-200 font-semibold mb-2'>
                      {t('problemSolving.modals.aboutSpread')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {t('problemSolving.modals.aboutSpreadText')}
                    </p>
                  </div>

                  {/* Kart Sayısı */}
                  <div className='bg-indigo-800/20 border border-indigo-500/30 rounded-xl p-4'>
                    <h3 className='text-indigo-200 font-semibold mb-2'>
                      {t('problemSolving.modals.cardCount')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {t('problemSolving.modals.cardCountText')}
                    </p>
                  </div>

                  {/* Okuma Türü */}
                  <div className='bg-purple-800/20 border border-purple-500/30 rounded-xl p-4'>
                    <h3 className='text-purple-200 font-semibold mb-2'>
                      {selectedReadingType === READING_TYPES.DETAILED 
                        ? t('problemSolving.modals.detailedReading')
                        : t('problemSolving.modals.writtenReading')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {selectedReadingType === READING_TYPES.DETAILED 
                        ? t('problemSolving.modals.detailedReadingText')
                        : t('problemSolving.modals.writtenReadingText')}
                    </p>
                  </div>

                  {/* Süreç */}
                  <div className='bg-indigo-800/20 border border-indigo-500/30 rounded-xl p-4'>
                    <h3 className='text-indigo-200 font-semibold mb-2'>
                      {t('problemSolving.modals.process')}
                    </h3>
                    <div className='space-y-2'>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>1</span>
                        {t('problemSolving.modals.step1')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>2</span>
                        {t('problemSolving.modals.step2')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>3</span>
                        {t('problemSolving.modals.step3')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>4</span>
                        {t('problemSolving.modals.step4')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className='border-t border-purple-500/20 p-6 flex-shrink-0'>
                <div className='flex gap-3'>
                  <button
                    onClick={() => {
                      setShowInfoModal(false);
                      setSelectedReadingType(null);
                    }}
                    className='flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800'
                  >
                    {t('problemSolving.modals.cancel')}
                  </button>
                  <button
                    onClick={() => setShowInfoModal(false)}
                    className='flex-1 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg'
                  >
                    {t('problemSolving.modals.continue')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DETAILED/WRITTEN SEÇİLDİYSE KİŞİSEL BİLGİ + 3 SORU FORMU - MOBİL RESPONSIVE */}
        {(selectedReadingType === READING_TYPES.DETAILED ||
          selectedReadingType === READING_TYPES.WRITTEN) &&
          !detailedFormSaved && !showInfoModal && (
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
                      t('problemSolving.validation.formUnsavedWarning')
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
              <div className='bg-slate-900/95 border border-purple-500/30 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col'>
                {/* Modal Header */}
                <div className='flex items-center justify-between p-6 border-b border-purple-500/20 flex-shrink-0'>
                  <div className='flex items-center'>
                    <div className='w-12 h-12 flex items-center justify-center bg-purple-800/70 rounded-full mr-3 shadow-lg'>
                      <span className='text-xl text-purple-200'>🔍</span>
                    </div>
                    <h2 className='text-purple-200 text-lg font-semibold'>
                      {t('problemSolving.form.personalInfo')}
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
                          t('problemSolving.validation.formUnsavedWarning')
                        );
                        if (shouldClose) {
                          setSelectedReadingType(null);
                        }
                      } else {
                        setSelectedReadingType(null);
                      }
                    }}
                    className='text-gray-400 hover:text-purple-300 transition-colors p-2 rounded-lg hover:bg-purple-500/10'
                    title={t('problemSolving.form.closeForm')}
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
                        <label className='block text-sm font-medium text-purple-200 mb-2'>
                          {t('problemSolving.form.firstName')} *
                        </label>
                        <input
                          type='text'
                          value={personalInfo.name}
                          onChange={e =>
                            updatePersonalInfo('name', e.target.value)
                          }
                          placeholder={t('problemSolving.form.placeholders.firstName')}
                          className={`w-full px-4 py-3 bg-slate-800/80 border ${
                            formErrors.name
                              ? 'border-red-500'
                              : 'border-purple-400/50'
                          } rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-base`}
                          autoComplete='given-name'
                        />
                        {formErrors.name && (
                          <p className='text-red-400 text-sm mt-1'>{formErrors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-purple-200 mb-2'>
                          {t('problemSolving.form.lastName')} *
                        </label>
                        <input
                          type='text'
                          value={personalInfo.surname}
                          onChange={e =>
                            updatePersonalInfo('surname', e.target.value)
                          }
                          placeholder={t('problemSolving.form.placeholders.lastName')}
                          className={`w-full px-4 py-3 bg-slate-800/80 border ${
                            formErrors.surname
                              ? 'border-red-500'
                              : 'border-purple-400/50'
                          } rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-base`}
                          autoComplete='family-name'
                        />
                        {formErrors.surname && (
                          <p className='text-red-400 text-sm mt-1'>{formErrors.surname}</p>
                        )}
                      </div>
                    </div>

                    {/* Doğum Tarihi */}
                    <div>
                      <label className='block text-sm font-medium text-purple-200 mb-2'>
                        {t('problemSolving.form.birthDate')} *
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
                            : 'border-purple-400/50'
                        } rounded-xl text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-base`}
                      />
                      {formErrors.birthDate && (
                        <p className='text-red-400 text-sm mt-1'>{formErrors.birthDate}</p>
                      )}
                    </div>

                    {/* E-posta */}
                    <div>
                      <label className='block text-sm font-medium text-purple-200 mb-2'>
                        {t('problemSolving.form.email')} *
                      </label>
                      <input
                        type='email'
                        value={personalInfo.email}
                        onChange={e =>
                          updatePersonalInfo('email', e.target.value)
                        }
                        placeholder={t('problemSolving.form.placeholders.email')}
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.email
                            ? 'border-red-500'
                            : 'border-purple-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-base`}
                        autoComplete='email'
                      />
                      {formErrors.email && (
                        <p className='text-red-400 text-sm mt-1'>{formErrors.email}</p>
                      )}
                    </div>

                    {/* Sorular Bölümü */}
                    <div className='border-t border-purple-500/20 pt-4'>
                      <h3 className='text-purple-200 text-lg font-semibold mb-4'>
                        {t('problemSolving.form.questions')}
                      </h3>

                      {/* Soru 1 */}
                      <div className='mb-4'>
                        <label className='block text-sm font-medium text-purple-200 mb-2'>
                          {t('problemSolving.form.concernQuestion')} *
                        </label>
                        <textarea
                          value={questions.concern}
                          onChange={e =>
                            updateQuestion('concern', e.target.value)
                          }
                          placeholder={t('problemSolving.form.placeholders.concernQuestion')}
                          rows={3}
                          className={`w-full px-4 py-3 bg-slate-800/80 border ${
                            formErrors.concern
                              ? 'border-red-500'
                              : 'border-purple-400/50'
                          } rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-base resize-none`}
                        />
                        {formErrors.concern && (
                          <p className='text-red-400 text-sm mt-1'>{formErrors.concern}</p>
                        )}
                      </div>

                      {/* Soru 2 */}
                      <div className='mb-4'>
                        <label className='block text-sm font-medium text-purple-200 mb-2'>
                          {t('problemSolving.form.understandingQuestion')} *
                        </label>
                        <textarea
                          value={questions.understanding}
                          onChange={e =>
                            updateQuestion('understanding', e.target.value)
                          }
                          placeholder={t('problemSolving.form.placeholders.understandingQuestion')}
                          rows={3}
                          className={`w-full px-4 py-3 bg-slate-800/80 border ${
                            formErrors.understanding
                              ? 'border-red-500'
                              : 'border-purple-400/50'
                          } rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-base resize-none`}
                        />
                        {formErrors.understanding && (
                          <p className='text-red-400 text-sm mt-1'>{formErrors.understanding}</p>
                        )}
                      </div>

                      {/* Soru 3 */}
                      <div className='mb-4'>
                        <label className='block text-sm font-medium text-purple-200 mb-2'>
                          {t('problemSolving.form.emotionalQuestion')} *
                        </label>
                        <textarea
                          value={questions.emotional}
                          onChange={e =>
                            updateQuestion('emotional', e.target.value)
                          }
                          placeholder={t('problemSolving.form.placeholders.emotionalQuestion')}
                          rows={3}
                          className={`w-full px-4 py-3 bg-slate-800/80 border ${
                            formErrors.emotional
                              ? 'border-red-500'
                              : 'border-purple-400/50'
                          } rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-base resize-none`}
                        />
                        {formErrors.emotional && (
                          <p className='text-red-400 text-sm mt-1'>{formErrors.emotional}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className='border-t border-purple-500/20 p-6 flex-shrink-0'>
                  <button
                    onClick={handleSaveDetailedFormClick}
                    disabled={isSaving}
                    className='w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg'
                  >
                    {isSaving
                      ? t('problemSolving.form.saving')
                      : t('problemSolving.form.saveAndOpen')}
                  </button>
                </div>
              </div>
            </div>
          )}

        {/* Kredi Onay Modalı */}
        {showCreditConfirm && (
          <div className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'>
            <div className='bg-slate-900 border border-purple-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4'>
              <h2 className='text-xl font-bold text-purple-400 mb-4 text-center'>
                {t('problemSolving.modals.creditConfirm')}
              </h2>
              <p className='text-gray-200 text-center mb-6'>
                {t('problemSolving.modals.creditConfirmMessage')}
              </p>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={saveDetailedForm}
                  disabled={isSaving}
                  className='bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60'
                >
                  {isSaving
                    ? t('problemSolving.modals.processing')
                    : t('problemSolving.modals.confirm')}
                </button>
                <button
                  onClick={() => setShowCreditConfirm(false)}
                  disabled={isSaving}
                  className='bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60'
                >
                  {t('problemSolving.modals.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
