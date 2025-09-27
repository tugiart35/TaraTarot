/*
info:
---
Dosya Amacı:
- İlişki Analizi tarot açılımı ana bileşeni
- 7 kartlık özel düzen ile ilişki analizi
- Kullanıcı kart seçer, pozisyonları yönetir, yorum alır

Bağlı Dosyalar:
- relationship-analysis-config.ts (konfigürasyon)
- position-meanings-index.ts (pozisyon anlamları)
- messages/tr.json (çeviriler)

Düzeltilen Hatalar:
- useEffect import eksikliği düzeltildi
- ESC tuşu ile modal kapatma özelliği eklendi
- Form validasyon fonksiyonları eklendi
- canSelectCards prop'u düzeltildi
- Form input'ları düzeltildi (updatePersonalInfo, updateQuestion kullanımı)
- Form footer ve kredi onay butonları düzeltildi

Eklenen Özellikler:
- Form validasyon fonksiyonları eklendi
- Bilgilendirme modal'ı mevcut
- DETAILED/WRITTEN form modal'ı mevcut
- Kredi onay modal'ı mevcut
- ESC tuşu ile modal kapatma eklendi
- Email gönderimi fonksiyonu mevcut
- Form kaydetme ve kredi onay akışı tamamlandı

Üretime Hazır mı?:
- Evet, tüm özellikler tamamlandı, LoveTarot.tsx ve ProblemSolvingTarot.tsx ile uyumlu
---

*/

'use client';

import { getRelationshipAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/relationship-analysis/position-meanings-index';
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
// import { useBaseTarotComponent } from '@/features/tarot/components/shared/BaseTarotComponent';
import { useTarotReading } from '@/hooks/useTarotReading';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/auth/useAuth';
import { useReadingCredits } from '@/hooks/useReadingCredits';
import { useToast } from '@/hooks/useToast';
import { findSpreadById } from '@/lib/constants/tarotSpreads';
import {
  RELATIONSHIP_ANALYSIS_POSITIONS_INFO,
  RELATIONSHIP_ANALYSIS_POSITIONS_LAYOUT,
  RELATIONSHIP_ANALYSIS_CARD_COUNT,
} from './relationship-analysis-config';

// Okuma tipleri
import { READING_TYPES, ReadingType, TarotCard } from '@/types/tarot';

// Ana bileşenin props'ları
interface RelationshipAnalysisReadingProps {
  onComplete?: (_cards: TarotCard[], _interpretation: string) => void;
  onPositionChange?: (_title: string) => void;
  onReadingTypeSelected?: () => void;
}

// Ana İlişki Analizi Açılımı bileşeni
export default function RelationshipAnalysisReading({
  onComplete: _onComplete,
  onPositionChange: _onPositionChange,
  onReadingTypeSelected,
}: RelationshipAnalysisReadingProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const { user } = useAuth();
  const relationshipAnalysisSpread = findSpreadById(
    'relationship-analysis-spread'
  );

  // Kredi yönetimi
  const detailedCredits = useReadingCredits('RELATIONSHIP_ANALYSIS_DETAILED');
  const writtenCredits = useReadingCredits('RELATIONSHIP_ANALYSIS_WRITTEN');

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
      cardCount: RELATIONSHIP_ANALYSIS_CARD_COUNT,
      positionsInfo: RELATIONSHIP_ANALYSIS_POSITIONS_INFO,
    },
    onComplete: (_cards, _interpretation) => {
      // İlişki analizi açılımı tamamlandı
    },
    onPositionChange: _title => {
      // Pozisyon değişti
    },
  });

  // Base tarot component hook'u kullan - şimdilik comment out
  // const {
  //   selectedCards,
  //   currentStep,
  //   readingType,
  //   isModalOpen,
  //   isCreditModalOpen,
  //   formData,
  //   handleCardSelect,
  //   handleCardRemove,
  //   updatePersonalInfo,
  //   updateQuestion,
  //   goToNextStep,
  //   goToPreviousStep,
  //   handleCreditDeduction,
  //   handleReadingComplete,
  //   openModal,
  //   closeModal,
  //   openCreditModal,
  //   closeCreditModal,
  //   setSelectedCards,
  //   setCurrentStep,
  //   setReadingType,
  //   setFormData
  // } = useBaseTarotComponent({
  //   spreadId: 'relationship-analysis',
  //   cardCount: RELATIONSHIP_ANALYSIS_CARD_COUNT,
  //   positionsInfo: RELATIONSHIP_ANALYSIS_POSITIONS_INFO,
  //   positionsLayout: RELATIONSHIP_ANALYSIS_POSITIONS_LAYOUT,
  //   onReadingComplete: (reading) => {
  //     _onComplete?.(selectedCards, reading.interpretation);
  //   }
  // });

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

  if (!relationshipAnalysisSpread) {
    return (
      <div className='text-red-500'>
        İlişki Analizi Açılımı konfigürasyonu bulunamadı. Lütfen tarotSpreads.ts
        dosyasını kontrol edin.
      </div>
    );
  }

  // Pozisyona özel kart anlamını al
  const getRelationshipAnalysisCardMeaning = (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ): string => {
    if (!card) {
      return '';
    }
    const meaning = getRelationshipAnalysisMeaningByCardAndPosition(
      card,
      position,
      isReversed
    );
    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }
    return isReversed ? meaning.reversed : meaning.upright;
  };

  // Basit yorum oluştur - performans optimizasyonu
  const generateBasicInterpretation = (): string => {
    const cards = selectedCards as TarotCard[];
    if (
      selectedCards.length !== RELATIONSHIP_ANALYSIS_CARD_COUNT ||
      selectedCards.some(c => !c)
    ) {
      return 'Tüm kartları seçmeden yorum oluşturulamaz.';
    }
    
    // Performans optimizasyonu: string concatenation yerine array join kullan
    const interpretationParts = [
      `💕 **İlişki Analizi Açılımı**\n\n`
    ];
    
    if (userQuestion.trim()) {
      interpretationParts.push(`**Sevgili danışan,** ilişki analizi "${userQuestion}" için özel hazırlanmış analiz:\n\n`);
    }
    
    RELATIONSHIP_ANALYSIS_POSITIONS_INFO.forEach((posInfo, index) => {
      const card = cards[index];
      const reversed = !!isReversed[index];
      if (card) {
        interpretationParts.push(`**${posInfo.id}. ${posInfo.title}: ${card.nameTr}** (${reversed ? 'Ters' : 'Düz'})\n*${posInfo.desc}*\n${getRelationshipAnalysisCardMeaning(card, posInfo.id, reversed)}\n\n`);
      }
    });
    
    interpretationParts.push(`💫 **${t('tarotPage.relationshipAnalysisSpread.summary')}:**\n"${t('tarotPage.relationshipAnalysisSpread.summaryText')}"`);
    
    return interpretationParts.join('');
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
        // Basit okuma sayacı için minimal kayıt
        const simpleReadingData = {
          userId: 'anonymous-user',
          readingType: 'simple',
          cards: { selectedCards: [] }, // Boş kart listesi
          interpretation: 'Basit okuma - sadece sayaç',
          question: { type: 'simple' },
          status: 'completed',
          title: 'Basit Okuma',
          cost_credits: 0, // Ücretsiz
          admin_notes: 'Simple reading counter',
        };

        // Database'e kaydet
        const saveResult = await saveReadingToSupabase(simpleReadingData);
        if (saveResult.success) {
          // Basit okuma sayacı kaydedildi
        }

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
          readingType: 'relationship-analysis',
          status: 'completed',
          title: 'İlişki Analizi Açılımı - Detaylı Kişisel Okuma',
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
          // İlişki analizi okuması kaydedildi
          showToast('Okumanız başarıyla kaydedildi!', 'success');

          // Email gönderimini asenkron olarak başlat (kullanıcıyı bekletmez)
          triggerAsyncEmailSending(saveResult.id);
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
      showToast('Okuma kaydedilirken bir hata oluştu.', 'error');
    } finally {
      setIsSavingReading(false);
    }
  };

  // Asenkron email gönderimi fonksiyonu
  const triggerAsyncEmailSending = (readingId: string) => {
    // Email gönderimini arka planda başlat, kullanıcıyı bekletmez
    fetch('/api/send-reading-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ readingId }),
    })
      .then(response => {
        if (response.ok) {
          console.log('✅ Email arka planda başarıyla gönderildi');
        } else {
          console.warn('⚠️ Email gönderimi başarısız, ancak okuma kaydedildi');
        }
      })
      .catch(error => {
        console.warn('⚠️ Email gönderimi hatası:', error);
      });
  };

  // Supabase'e okuma kaydetme fonksiyonu
  const saveReadingToSupabase = async (readingData: any) => {
    try {
      // Sadece giriş yapmış kullanıcılar için veri sakla
      if (!user?.id) {
        return {
          success: true,
          id: 'guest-session',
          userId: 'guest',
          message: 'Guest kullanıcı için veri saklanmadı',
        };
      }

      // Kredi düş + okuma kaydet (atomik) — RPC
      const costCredits =
        selectedReadingType === READING_TYPES.DETAILED
          ? detailedCredits.creditStatus.requiredCredits
          : selectedReadingType === READING_TYPES.WRITTEN
            ? writtenCredits.creditStatus.requiredCredits
            : 0;

      // Performans optimizasyonu: timeout ekle
      const { data: rpcResult, error: rpcError } = await Promise.race([
        supabase.rpc('fn_create_reading_with_debit', {
          p_user_id: user.id,
          p_reading_type: readingData.readingType,
          p_spread_name: 'İlişki Analizi Yayılımı',
          p_title: readingData.title || 'İlişki Analizi Açılımı',
          p_interpretation: readingData.interpretation,
          p_cards: readingData.cards.selectedCards,
          p_questions: readingData.questions,
          p_cost_credits: costCredits,
          p_metadata: {
            duration: readingData.metadata.duration,
            platform: readingData.metadata.platform,
          },
          p_idempotency_key: `reading_${user.id}_${readingData.timestamp}`,
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database timeout')), 10000)
        )
      ]);

      if (rpcError) {
        return { success: false, error: rpcError };
      }

      return { success: true, id: rpcResult?.id };
    } catch (error) {
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

      {/* İLİŞKİ ANALİZİ AÇILIMI ANA SAHNESI */}
      <div className='w-full relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-900/90 via-slate-900/80 to-cyan-800/80 border border-blue-700/60'>
        {/* KARTLAR KİLİTLİ OVERLAY */}
        {selectedReadingType === null && (
          <div className='absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl'>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 flex items-center justify-center bg-blue-800/70 rounded-full mb-2 shadow-lg'>
                <span className='text-2xl'>💕</span>
              </div>
              <div className='text-blue-200 text-base font-semibold mb-1'>
                {t('reading.messages.cardsLocked')}
              </div>
              <div className='text-blue-400 text-sm text-center max-w-xs'>
                {t('reading.messages.selectReadingTypeFirst')}
              </div>
            </div>
          </div>
        )}

        <div className='absolute inset-0 rounded-2xl overflow-hidden'>
          <div
            className='absolute inset-0 bg-gradient-to-br from-blue-900/10 via-slate-900/60 to-cyan-900/20 backdrop-blur-[2px]'
            style={{ zIndex: 1 }}
          />
          <Image
            src='/images/bg-3card-tarot.jpg'
            alt='Relationship Analysis Tarot Reading background'
            fill
            className='object-cover object-center opacity-60'
            style={{ zIndex: 0 }}
            priority={false}
          />
          <div
            className='absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/10 to-cyan-900/80'
            style={{ zIndex: 2 }}
          />
        </div>

        <div
          className='absolute inset-0 bg-black/30 backdrop-blur-[1.5px] rounded-2xl'
          style={{ zIndex: 4 }}
        />

        <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
          <div className='relative w-full h-full min-h-[400px] xs:min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] xl:min-h-[650px]'>
            {RELATIONSHIP_ANALYSIS_POSITIONS_LAYOUT.map((position, idx) => (
              <BaseCardPosition
                key={position.id}
                position={{
                  id: idx + 1,
                  className: position.className,
                }}
                card={selectedCards[idx] ?? null}
                isOpen={!!cardStates[idx]}
                isReversed={!!isReversed[idx]}
                isNextPosition={currentPosition === idx + 1}
                onToggleCard={() => toggleCardState(idx + 1)}
                onCardDetails={handleCardDetails}
                positionInfo={
                  RELATIONSHIP_ANALYSIS_POSITIONS_INFO[idx] ?? {
                    title: `Pozisyon ${idx + 1}`,
                    desc: 'Kart pozisyonu',
                  }
                }
                renderCard={(card, props) => (
                  <BaseCardRenderer card={card} theme='blue' {...props} />
                )}
                colorScheme='blue'
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
            readingType='RELATIONSHIP_ANALYSIS_DETAILED'
            theme='blue'
            disabled={isSaving}
          />
        </div>
      )}

      {selectedReadingType &&
        currentPosition &&
        currentPosition <= RELATIONSHIP_ANALYSIS_CARD_COUNT && (
          <div className='flex justify-center mb-4'>
            <div className='bg-gradient-to-r from-blue-600/20 via-slate-500/30 to-cyan-500/20 border border-blue-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse'>
              <div className='flex items-center space-x-3'>
                <div className='w-6 h-6 bg-blue-400/20 rounded-full flex items-center justify-center'>
                  <span className='text-blue-300 text-sm'>💕</span>
                </div>
                <div className='text-center'>
                  <div className='text-blue-200 font-bold text-lg'>
                    {RELATIONSHIP_ANALYSIS_POSITIONS_INFO[currentPosition - 1]
                      ?.title ?? ''}
                  </div>
                  <div className='text-gray-300 text-xs'>
                    {RELATIONSHIP_ANALYSIS_POSITIONS_INFO[currentPosition - 1]
                      ?.desc ?? ''}
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
        canSelectCards={
          selectedReadingType === READING_TYPES.SIMPLE ||
          ((selectedReadingType === READING_TYPES.DETAILED ||
            selectedReadingType === READING_TYPES.WRITTEN) &&
            detailedFormSaved)
        }
        theme='blue'
        renderCard={(card, isUsed, canSelect) => (
          <BaseCardRenderer
            card={card}
            isUsed={isUsed}
            canSelect={canSelect}
            mode='gallery'
            theme='blue'
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
            className='px-8 py-3 bg-gradient-to-r from-blue-500/30 to-cyan-500/20 border border-blue-500/50 rounded-2xl text-blue-400 hover:bg-blue-500/40 hover:border-blue-500/70 transition-all duration-300 font-semibold shadow-md shadow-blue-500/10'
          >
            {t('relationshipAnalysis.form.clearAll')}
          </button>
        </div>
      )}

      {/* Yorum */}
      {selectedCards.filter(c => c !== null).length ===
        RELATIONSHIP_ANALYSIS_CARD_COUNT &&
        selectedReadingType && (
          <div ref={interpretationRef} className='space-y-6'>
            <BaseInterpretation
              cards={selectedCards}
              isReversed={isReversed}
              theme='blue'
              title='İlişki Analizi Açılımı Yorumu'
              icon='💕'
              badgeText='İLİŞKİ ANALİZİ'
              badgeColor='bg-blue-500/20 text-blue-400'
              positionsInfo={RELATIONSHIP_ANALYSIS_POSITIONS_INFO.map(
                (pos, idx) => ({
                  id: idx,
                  title: pos.title,
                  desc: pos.desc,
                })
              )}
              getCardMeaning={(card) => {
                const position = selectedCards.findIndex(c => c?.id === card.id) + 1;
                const cardIsReversed = isReversed[position - 1] || false;
                const meaning = getRelationshipAnalysisMeaningByCardAndPosition(card, position, cardIsReversed);
                return meaning ? {
                  relationshipAnalysisMeaning: {
                    upright: meaning.upright,
                    reversed: meaning.reversed
                  },
                  keywords: meaning.keywords,
                  context: meaning.context
                } : null;
              }}
              getPositionSpecificInterpretation={(card, position, isReversed) =>
                getRelationshipAnalysisCardMeaning(card, position, isReversed)
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
                  className='px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg flex items-center gap-2'
                >
                  {isSavingReading ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      {t('relationshipAnalysis.modals.savingReading')}
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      {t('relationshipAnalysis.modals.saveReading')}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

      {/* Başarı Modal'ı */}
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-gradient-to-br from-blue-900/95 to-cyan-900/95 border border-blue-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center'>
            {/* Başarı İkonu */}
            <div className='w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
              <span className='text-3xl'>✅</span>
            </div>

            {/* Başlık */}
            <h2 className='text-2xl font-bold text-green-400 mb-4'>
              {t('relationshipAnalysis.modals.successTitle')}
            </h2>

            {/* Mesaj */}
            <p className='text-blue-200 mb-6 leading-relaxed'>
              {t('relationshipAnalysis.modals.successMessage')}
            </p>

            {/* Email Bilgisi */}
            <div className='bg-blue-800/30 border border-blue-500/20 rounded-xl p-4 mb-6'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-green-400'>📧</span>
                <p className='text-blue-300 text-sm font-medium'>
                  Email Gönderimi
                </p>
              </div>
              <p className='text-blue-300 text-sm'>
                Detaylı okumanız email adresinize gönderiliyor. Bu işlem arka planda devam ediyor.
              </p>
            </div>

            {/* Bilgi */}
            <div className='bg-blue-800/30 border border-blue-500/20 rounded-xl p-4 mb-6'>
              <p className='text-blue-300 text-sm'>
                {t('relationshipAnalysis.modals.redirecting')}
              </p>
            </div>

            {/* Progress Bar */}
            <div className='w-full bg-blue-800/30 rounded-full h-2 mb-4'>
              <div className='bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full animate-pulse'></div>
            </div>
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
          <div className='bg-slate-900/95 border border-blue-500/30 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-blue-500/20 flex-shrink-0'>
              <div className='flex items-center'>
                <div className='w-12 h-12 flex items-center justify-center bg-blue-800/70 rounded-full mr-3 shadow-lg'>
                  <span className='text-xl text-blue-200'>💕</span>
                </div>
                <h2 className='text-blue-200 text-lg font-semibold'>
                  {t('relationshipAnalysis.modals.infoTitle')}
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowInfoModal(false);
                  setSelectedReadingType(null);
                }}
                className='text-gray-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-500/10'
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
                <div className='bg-blue-800/20 border border-blue-500/30 rounded-xl p-4'>
                  <h3 className='text-blue-200 font-semibold mb-2'>
                    {t('relationshipAnalysis.modals.aboutSpread')}
                  </h3>
                  <p className='text-gray-300 text-sm leading-relaxed'>
                    {t('relationshipAnalysis.modals.aboutSpreadText')}
                  </p>
                </div>

                {/* Kart Sayısı */}
                <div className='bg-cyan-800/20 border border-cyan-500/30 rounded-xl p-4'>
                  <h3 className='text-cyan-200 font-semibold mb-2'>
                    {t('relationshipAnalysis.modals.cardCount')}
                  </h3>
                  <p className='text-gray-300 text-sm leading-relaxed'>
                    {t('relationshipAnalysis.modals.cardCountText')}
                  </p>
                </div>

                {/* Okuma Türü */}
                <div className='bg-blue-800/20 border border-blue-500/30 rounded-xl p-4'>
                  <h3 className='text-blue-200 font-semibold mb-2'>
                    {selectedReadingType === READING_TYPES.DETAILED
                      ? t('relationshipAnalysis.modals.detailedReading')
                      : t('relationshipAnalysis.modals.writtenReading')}
                  </h3>
                  <p className='text-gray-300 text-sm leading-relaxed'>
                    {selectedReadingType === READING_TYPES.DETAILED
                      ? t('relationshipAnalysis.modals.detailedReadingText')
                      : t('relationshipAnalysis.modals.writtenReadingText')}
                  </p>
                </div>

                {/* Süreç */}
                <div className='bg-cyan-800/20 border border-cyan-500/30 rounded-xl p-4'>
                  <h3 className='text-cyan-200 font-semibold mb-2'>
                    {t('relationshipAnalysis.modals.process')}
                  </h3>
                  <div className='space-y-2'>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        1
                      </span>
                      {t('relationshipAnalysis.modals.step1')}
                    </div>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        2
                      </span>
                      {t('relationshipAnalysis.modals.step2')}
                    </div>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        3
                      </span>
                      {t('relationshipAnalysis.modals.step3')}
                    </div>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        4
                      </span>
                      {t('relationshipAnalysis.modals.step4')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='border-t border-blue-500/20 p-6 flex-shrink-0'>
              <div className='flex gap-3'>
                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    setSelectedReadingType(null);
                  }}
                  className='flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800'
                >
                  {t('relationshipAnalysis.modals.cancel')}
                </button>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className='flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg'
                >
                  {t('relationshipAnalysis.modals.continue')}
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
            <div className='bg-slate-900/95 border border-blue-500/30 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col'>
              {/* Modal Header */}
              <div className='flex items-center justify-between p-6 border-b border-blue-500/20 flex-shrink-0'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 flex items-center justify-center bg-blue-800/70 rounded-full mr-3 shadow-lg'>
                    <span className='text-xl text-blue-200'>💕</span>
                  </div>
                  <h2 className='text-blue-200 text-lg font-semibold'>
                    {t('relationshipAnalysis.form.personalInfo')}
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
                  className='text-gray-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-500/10'
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
                      <label className='block text-sm font-medium text-blue-200 mb-2'>
                        {t('relationshipAnalysis.form.firstName')} *
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
                            : 'border-blue-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base`}
                        autoComplete='given-name'
                      />
                      {formErrors.name && (
                        <p className='text-red-400 text-sm mt-1'>
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-blue-200 mb-2'>
                        {t('relationshipAnalysis.form.lastName')} *
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
                            : 'border-blue-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base`}
                        autoComplete='family-name'
                      />
                      {formErrors.surname && (
                        <p className='text-red-400 text-sm mt-1'>
                          {formErrors.surname}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Doğum Tarihi */}
                  <div>
                    <label className='block text-sm font-medium text-blue-200 mb-2'>
                      {t('relationshipAnalysis.form.birthDate')} *
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
                          : 'border-blue-400/50'
                      } rounded-xl text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base`}
                    />
                    {formErrors.birthDate && (
                      <p className='text-red-400 text-sm mt-1'>
                        {formErrors.birthDate}
                      </p>
                    )}
                  </div>

                  {/* E-posta */}
                  <div>
                    <label className='block text-sm font-medium text-blue-200 mb-2'>
                      {t('relationshipAnalysis.form.email')} *
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
                          : 'border-blue-400/50'
                      } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base`}
                      autoComplete='email'
                    />
                    {formErrors.email && (
                      <p className='text-red-400 text-sm mt-1'>
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Sorular Bölümü */}
                  <div className='border-t border-blue-500/20 pt-4'>
                    <h3 className='text-blue-200 text-lg font-semibold mb-4'>
                      {t('relationshipAnalysis.form.questions')}
                    </h3>

                    {/* Soru 1 */}
                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-blue-200 mb-2'>
                        {t('relationshipAnalysis.form.concernQuestion')} *
                      </label>
                      <textarea
                        value={questions.concern}
                        onChange={e =>
                          updateQuestion('concern', e.target.value)
                        }
                        placeholder='Hangi ilişki durumunu analiz etmek istiyorsunuz?'
                        rows={3}
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.concern
                            ? 'border-red-500'
                            : 'border-blue-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base resize-none`}
                      />
                      {formErrors.concern && (
                        <p className='text-red-400 text-sm mt-1'>
                          {formErrors.concern}
                        </p>
                      )}
                    </div>

                    {/* Soru 2 */}
                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-blue-200 mb-2'>
                        {t('relationshipAnalysis.form.understandingQuestion')} *
                      </label>
                      <textarea
                        value={questions.understanding}
                        onChange={e =>
                          updateQuestion('understanding', e.target.value)
                        }
                        placeholder='Bu ilişki analizi ile neyi anlamak istiyorsunuz?'
                        rows={3}
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.understanding
                            ? 'border-red-500'
                            : 'border-blue-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base resize-none`}
                      />
                      {formErrors.understanding && (
                        <p className='text-red-400 text-sm mt-1'>
                          {formErrors.understanding}
                        </p>
                      )}
                    </div>

                    {/* Soru 3 */}
                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-blue-200 mb-2'>
                        {t('relationshipAnalysis.form.emotionalQuestion')} *
                      </label>
                      <textarea
                        value={questions.emotional}
                        onChange={e =>
                          updateQuestion('emotional', e.target.value)
                        }
                        placeholder='Bu ilişki karşısında şu anda nasıl hissediyorsunuz?'
                        rows={3}
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.emotional
                            ? 'border-red-500'
                            : 'border-blue-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base resize-none`}
                      />
                      {formErrors.emotional && (
                        <p className='text-red-400 text-sm mt-1'>
                          {formErrors.emotional}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className='border-t border-blue-500/20 p-6 flex-shrink-0'>
                <button
                  onClick={handleSaveDetailedFormClick}
                  disabled={isSaving}
                  className='w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg'
                >
                  {isSaving
                    ? t('relationshipAnalysis.form.saving')
                    : t('relationshipAnalysis.form.saveAndOpen')}
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Kredi Onay Modal'ı */}
      {showCreditConfirm && (
        <div className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'>
          <div className='bg-slate-900 border border-blue-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4'>
            <h2 className='text-xl font-bold text-blue-400 mb-4 text-center'>
              {t('relationshipAnalysis.modals.creditConfirm')}
            </h2>
            <p className='text-gray-200 text-center mb-6'>
              {t('relationshipAnalysis.modals.creditConfirmMessage')}
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={saveDetailedForm}
                disabled={isSaving}
                className='bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60'
              >
                {isSaving
                  ? t('relationshipAnalysis.modals.processing')
                  : t('relationshipAnalysis.modals.confirm')}
              </button>
              <button
                onClick={() => setShowCreditConfirm(false)}
                disabled={isSaving}
                className='bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60'
              >
                {t('relationshipAnalysis.modals.cancel')}
              </button>
            </div>
          </div>
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
          spreadType='relationship-analysis'
          positionInfo={(() => {
            const idx = selectedCards.findIndex(
              (c: TarotCard | null) => c && c.id === showCardDetails.id
            );
            const p = RELATIONSHIP_ANALYSIS_POSITIONS_INFO[idx];
            return p
              ? { title: p.title, desc: p.desc }
              : { title: `Pozisyon ${idx + 1}`, desc: 'Kart pozisyonu' };
          })()}
        />
      )}
    </div>
  );
}
