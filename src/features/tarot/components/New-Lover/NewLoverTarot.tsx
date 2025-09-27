/*
info:
---
Dosya Amacı:
- Yeni Bir Sevgili tarot açılımı ana bileşeni
- 6 kartlık özel düzen ile aşk analizi
- Kullanıcı kart seçer, pozisyonları yönetir, yorum alır

Bağlı Dosyalar:
- new-lover-config.ts (konfigürasyon)
- position-meanings-index.ts (pozisyon anlamları)
- messages/tr.json (çeviriler)

Düzeltilen Hatalar:
- getNewLoverCardMeaning fonksiyonundaki sonsuz döngü hatası çözüldü
- Pozisyon anlamları doğru şekilde import ediliyor

Eklenen Özellikler:
- Form validasyon fonksiyonları eklendi
- Bilgilendirme modal'ı eklendi
- DETAILED/WRITTEN form modal'ı eklendi
- Kredi onay modal'ı eklendi
- ESC tuşu ile modal kapatma eklendi
- Email gönderimi fonksiyonu eklendi
- Form kaydetme ve kredi onay akışı tamamlandı

Üretime Hazır mı?:
- Evet, tüm özellikler tamamlandı, LoveTarot.tsx ve ProblemSolvingTarot.tsx ile uyumlu
---

*/

'use client';

import newLoverExports from '@/features/tarot/lib/new-lover/position-meanings-index';
const { getNewLoverCardMeaning, getNewLoverMeaningByCardAndPosition } = newLoverExports;
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
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/hooks/useToast';
import { useReadingCredits } from '@/hooks/useReadingCredits';
import { findSpreadById } from '@/lib/constants/tarotSpreads';
// import { useBaseTarotComponent } from '@/features/tarot/components/shared/BaseTarotComponent';
import {
  NEW_LOVER_POSITIONS_INFO,
  NEW_LOVER_POSITIONS_LAYOUT,
  NEW_LOVER_CARD_COUNT,
} from './new-lover-config';

// Okuma tipleri
import { READING_TYPES, ReadingType, TarotCard } from '@/types/tarot';

// Ana bileşenin props'ları
interface NewLoverReadingProps {
  onComplete?: (_cards: TarotCard[], _interpretation: string) => void;
  onPositionChange?: (_title: string) => void;
  onReadingTypeSelected?: () => void;
}

// Ana Yeni Bir Sevgili Açılımı bileşeni
export default function NewLoverReading({
  onComplete: _onComplete,
  onPositionChange: _onPositionChange,
  onReadingTypeSelected,
}: NewLoverReadingProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const { user } = useAuth();
  const newLoverSpread = findSpreadById('new-lover-spread');

  // Kredi yönetimi
  const detailedCredits = useReadingCredits('NEW_LOVER_DETAILED');
  const writtenCredits = useReadingCredits('NEW_LOVER_WRITTEN');

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
      cardCount: NEW_LOVER_CARD_COUNT,
      positionsInfo: NEW_LOVER_POSITIONS_INFO,
    },
    onComplete: (_cards, _interpretation) => {
      // Yeni Bir Sevgili açılımı tamamlandı
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
  //   spreadId: 'new-lover',
  //   cardCount: NEW_LOVER_CARD_COUNT,
  //   positionsInfo: NEW_LOVER_POSITIONS_INFO,
  //   positionsLayout: NEW_LOVER_POSITIONS_LAYOUT,
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

  if (!newLoverSpread) {
    return (
      <div className='text-red-500'>
        Yeni Bir Sevgili Açılımı konfigürasyonu bulunamadı. Lütfen tarotSpreads.ts dosyasını
        kontrol edin.
      </div>
    );
  }


  // Basit yorum oluştur
  const generateBasicInterpretation = (): string => {
    const cards = selectedCards as TarotCard[];
    if (
      selectedCards.length !== NEW_LOVER_CARD_COUNT ||
      selectedCards.some(c => !c)
    ) {
      return 'Tüm kartları seçmeden yorum oluşturulamaz.';
    }
    let interpretation = `💕 **Yeni Bir Sevgili Açılımı**\n\n`;
    if (userQuestion.trim()) {
      interpretation += `**Sevgili danışan,** aşk sorunuz "${userQuestion}" için özel hazırlanmış analiz:\n\n`;
    }
    NEW_LOVER_POSITIONS_INFO.forEach((posInfo, index) => {
      const card = cards[index];
      const reversed = !!isReversed[index];
      if (card) {
        interpretation += `**${posInfo.id}. ${posInfo.title}: ${card.nameTr}** (${reversed ? 'Ters' : 'Düz'})\n*${posInfo.desc}*\n${getNewLoverCardMeaning(card, posInfo.id, reversed)}\n\n`;
      }
    });
    interpretation += `💫 **${t('tarotPage.newLoverSpread.summary')}:**\n"${t('tarotPage.newLoverSpread.summaryText')}"`;
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

  // Okumayı kaydetme fonksiyonu
  const handleSaveReading = async () => {
    setIsSavingReading(true);
    try {
      // Basit okuma için sadece sayaç kaydı
      if (selectedReadingType === READING_TYPES.SIMPLE) {
        const simpleReadingData = {
          userId: 'anonymous-user',
          readingType: 'simple',
          cards: { selectedCards: [] },
          interpretation: 'Basit okuma - sadece sayaç',
          question: { type: 'simple' },
          status: 'completed',
          title: 'Basit Okuma',
          cost_credits: 0,
          admin_notes: 'Simple reading counter',
        };

        const saveResult = await saveReadingToSupabase(simpleReadingData);
        if (saveResult.success) {
          console.log('Basit okuma sayacı kaydedildi:', saveResult.id);
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

        const readingData = {
          userId: user?.id || 'anonymous-user',
          readingType: 'new-lover',
          status: 'completed',
          title: 'Yeni Bir Sevgili Açılımı - Detaylı Kişisel Okuma',
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

        const saveResult = await saveReadingToSupabase(readingData);
        if (saveResult.success) {
          console.log('Yeni Bir Sevgili okuması kaydedildi:', saveResult.id);
          
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
              console.log('✅ Email gönderimi başarılı');
            } else {
              console.error('❌ Email gönderimi başarısız');
            }
          } catch (error) {
            console.error('❌ Email gönderimi hatası:', error);
          }
          
          showToast('Okumanız başarıyla kaydedildi!', 'success');
        } else {
          console.error('Okuma kaydetme hatası:', saveResult.error);
          showToast('Okuma kaydedilirken bir hata oluştu.', 'error');
        }

        setShowSuccessModal(true);

        setTimeout(() => {
          setShowSuccessModal(false);
          router.push('/');
        }, 3000);
        return;
      }
    } catch (error) {
      console.error('Okuma kaydetme hatası:', error);
      showToast('Okuma kaydedilirken bir hata oluştu.', 'error');
    } finally {
      setIsSavingReading(false);
    }
  };

  // Supabase'e okuma kaydetme fonksiyonu
  const saveReadingToSupabase = async (readingData: any) => {
    try {
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
          p_spread_name: 'Yeni Bir Sevgili Yayılımı',
          p_title: readingData.title || 'Yeni Bir Sevgili Açılımı',
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
      
      {/* YENİ BİR SEVGİLİ AÇILIMI ANA SAHNESI */}
      <div className='w-full relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-pink-900/90 via-rose-900/80 to-red-800/80 border border-pink-700/60'>
        {/* KARTLAR KİLİTLİ OVERLAY */}
        {selectedReadingType === null && (
          <div className='absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl'>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 flex items-center justify-center bg-pink-800/70 rounded-full mb-2 shadow-lg'>
                <span className='text-2xl'>💕</span>
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
                    <span className='text-xl text-pink-200'>💝</span>
                  </div>
                  <h2 className='text-pink-200 text-lg font-semibold'>
                    {t('newLover.modals.infoTitle')}
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
                      {t('newLover.modals.aboutSpread')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {t('newLover.modals.aboutSpreadText')}
                    </p>
                  </div>

                  {/* Kart Sayısı */}
                  <div className='bg-red-800/20 border border-red-500/30 rounded-xl p-4'>
                    <h3 className='text-red-200 font-semibold mb-2'>
                      {t('newLover.modals.cardCount')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {t('newLover.modals.cardCountText')}
                    </p>
                  </div>

                  {/* Okuma Türü */}
                  <div className='bg-pink-800/20 border border-pink-500/30 rounded-xl p-4'>
                    <h3 className='text-pink-200 font-semibold mb-2'>
                      {selectedReadingType === READING_TYPES.DETAILED 
                        ? t('newLover.modals.detailedReading')
                        : t('newLover.modals.writtenReading')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {selectedReadingType === READING_TYPES.DETAILED 
                        ? t('newLover.modals.detailedReadingText')
                        : t('newLover.modals.writtenReadingText')}
                    </p>
                  </div>

                  {/* Süreç */}
                  <div className='bg-red-800/20 border border-red-500/30 rounded-xl p-4'>
                    <h3 className='text-red-200 font-semibold mb-2'>
                      {t('newLover.modals.process')}
                    </h3>
                    <div className='space-y-2'>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>1</span>
                        {t('newLover.modals.step1')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>2</span>
                        {t('newLover.modals.step2')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>3</span>
                        {t('newLover.modals.step3')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>4</span>
                        {t('newLover.modals.step4')}
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
                    {t('newLover.modals.cancel')}
                  </button>
                  <button
                    onClick={() => setShowInfoModal(false)}
                    className='flex-1 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg'
                  >
                    {t('newLover.modals.continue')}
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
                      <span className='text-xl text-pink-200'>💕</span>
                    </div>
                    <h2 className='text-pink-200 text-lg font-semibold'>
                      {t('newLover.form.personalInfo')}
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
                          {t('newLover.form.firstName')} *
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
                          {t('newLover.form.lastName')} *
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
                        {t('newLover.form.birthDate')} *
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
                        {t('newLover.form.email')} *
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
                        {t('newLover.form.questions')}
                      </h3>

                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-pink-200 mb-2'>
                            {t('newLover.form.concernQuestion')}
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
                            {t('newLover.form.understandingQuestion')}
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
                            {t('newLover.form.emotionalQuestion')}
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
                        {t('newLover.form.saving')}
                      </div>
                    ) : (
                      t('newLover.form.saveAndOpen')
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
                {t('newLover.modals.creditConfirm')}
              </h2>
              <p className='text-gray-200 text-center mb-6'>
                {t('newLover.modals.creditConfirmMessage')}
              </p>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={saveDetailedForm}
                  disabled={isSaving}
                  className='bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60'
                >
                  {isSaving
                    ? t('newLover.modals.processing')
                    : t('newLover.modals.confirm')}
                </button>
                <button
                  onClick={() => setShowCreditConfirm(false)}
                  disabled={isSaving}
                  className='bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60'
                >
                  {t('newLover.modals.cancel')}
                </button>
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
            className='absolute inset-0 bg-gradient-to-br from-pink-900/10 via-rose-900/60 to-red-900/20 backdrop-blur-[2px]'
            style={{ zIndex: 1 }}
          />
          <img
            src='/images/bg-love-tarot.jpg'
            alt='New Lover Tarot Reading background'
            className='absolute inset-0 w-full h-full object-cover object-center opacity-60'
            loading='lazy'
            style={{ zIndex: 0 }}
          />
          <div
            className='absolute inset-0 bg-gradient-to-br from-pink-900/80 via-rose-900/10 to-red-900/80'
            style={{ zIndex: 2 }}
          />
        </div>

        <div
          className='absolute inset-0 bg-black/30 backdrop-blur-[1.5px] rounded-2xl'
          style={{ zIndex: 4 }}
        />

        <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
          <div className='relative w-full h-full min-h-[400px] xs:min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] xl:min-h-[650px]'>
            {NEW_LOVER_POSITIONS_LAYOUT.map((position, idx) => (
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
                  NEW_LOVER_POSITIONS_INFO[idx] ?? {
                    title: `Pozisyon ${position.id}`,
                    desc: 'Kart pozisyonu',
                  }
                }
                renderCard={(card, props) => (
                  <BaseCardRenderer card={card} theme='pink' {...props} />
                )}
                colorScheme='pink'
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
            readingType='NEW_LOVER_DETAILED'
            theme='pink'
            disabled={isSaving}
          />
        </div>
      )}

      {selectedReadingType &&
        currentPosition &&
        currentPosition <= NEW_LOVER_CARD_COUNT && (
          <div className='flex justify-center mb-4'>
            <div className='bg-gradient-to-r from-pink-600/20 via-rose-500/30 to-red-500/20 border border-pink-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse'>
              <div className='flex items-center space-x-3'>
                <div className='w-6 h-6 bg-pink-400/20 rounded-full flex items-center justify-center'>
                  <span className='text-pink-300 text-sm'>💕</span>
                </div>
                <div className='text-center'>
                  <div className='text-pink-200 font-bold text-lg'>
                    {NEW_LOVER_POSITIONS_INFO[currentPosition - 1]?.title ?? ''}
                  </div>
                  <div className='text-gray-300 text-xs'>
                    {NEW_LOVER_POSITIONS_INFO[currentPosition - 1]?.desc ?? ''}
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

      {selectedCards.filter(c => c !== null).length > 0 && (
        <div className='flex justify-center'>
          <button
            onClick={handleClearAll}
            className='px-8 py-3 bg-gradient-to-r from-pink-500/30 to-rose-500/20 border border-pink-500/50 rounded-2xl text-pink-400 hover:bg-pink-500/40 hover:border-pink-500/70 transition-all duration-300 font-semibold shadow-md shadow-pink-500/10'
          >
            {t('newLover.form.clearAll')}
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
          spreadType='new-lover'
          positionInfo={(() => {
            const idx = selectedCards.findIndex(
              (c: TarotCard | null) => c && c.id === showCardDetails.id
            );
            const p = NEW_LOVER_POSITIONS_INFO[idx];
            return p
              ? { title: p.title, desc: p.desc }
              : { title: `Pozisyon ${idx + 1}`, desc: 'Kart pozisyonu' };
          })()}
          // BaseInterpretation.tsx'deki gibi getCardMeaning prop'unu ekle
          getCardMeaning={(card) => {
            const position = selectedCards.findIndex(c => c?.id === card.id) + 1;
            const cardIsReversed = isReversed[position - 1] || false;
            const meaning = getNewLoverMeaningByCardAndPosition(card, position, cardIsReversed);
            return meaning ? {
              context: meaning.context,
              keywords: meaning.keywords,
              upright: meaning.upright,
              reversed: meaning.reversed,
              // New-lover açılımı için özel alan ekle (BaseInterpretation.tsx'deki gibi)
              newLoverMeaning: {
                upright: meaning.upright,
                reversed: meaning.reversed
              }
            } : null;
          }}
          getPositionSpecificInterpretation={(card, position, isReversed) =>
            getNewLoverCardMeaning(card, position, isReversed)
          }
          showContext={true}
        />
      )}

      {selectedCards.filter(c => c !== null).length === NEW_LOVER_CARD_COUNT &&
        selectedReadingType && (
          <div ref={interpretationRef} className='space-y-6'>
            <BaseInterpretation
              cards={selectedCards}
              isReversed={isReversed}
              theme='pink'
              title='Yeni Bir Sevgili Açılımı Yorumu'
              icon='💕'
              badgeText='YENİ BİR SEVGİLİ'
              badgeColor='bg-pink-500/20 text-pink-400'
              positionsInfo={NEW_LOVER_POSITIONS_INFO}
              getCardMeaning={(card) => {
                const position = selectedCards.findIndex(c => c?.id === card.id) + 1;
                const cardIsReversed = isReversed[position - 1] || false;
                const meaning = getNewLoverMeaningByCardAndPosition(card, position, cardIsReversed);
                return meaning ? {
                  context: meaning.context,
                  keywords: meaning.keywords,
                  upright: meaning.upright,
                  reversed: meaning.reversed,
                  // New-lover açılımı için özel alan ekle
                  newLoverMeaning: {
                    upright: meaning.upright,
                    reversed: meaning.reversed
                  }
                } : null;
              }}
              getPositionSpecificInterpretation={(card, position, isReversed) =>
                getNewLoverCardMeaning(card, position, isReversed)
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
                    ? t('newLover.modals.savingReading')
                    : t('newLover.modals.saveReading')}
                </button>
              </div>
            )}
          </div>
        )}

      {/* Başarı Modal'ı */}
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-gradient-to-br from-pink-900/95 to-rose-900/95 border border-pink-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center'>
            <div className='w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
              <span className='text-3xl'>✅</span>
            </div>
            <h2 className='text-2xl font-bold text-green-400 mb-4'>
              {t('newLover.modals.successTitle')}
            </h2>
            <p className='text-pink-200 mb-6 leading-relaxed'>
              {t('newLover.modals.successMessage')}
            </p>
            <div className='bg-pink-800/30 border border-pink-500/20 rounded-xl p-4 mb-6'>
              <p className='text-pink-300 text-sm'>
                {t('newLover.modals.redirecting')}
              </p>
            </div>
            <div className='w-full bg-pink-800/30 rounded-full h-2 mb-4'>
              <div className='bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full animate-pulse'></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
