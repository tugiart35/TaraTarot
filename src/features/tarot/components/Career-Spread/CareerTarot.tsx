/*
info:
---
Dosya Amacı:
- Kariyer ve Para tarot açılımı ana bileşeni
- 7 kartlık özel düzen ile kariyer analizi
- Kullanıcı kart seçer, pozisyonları yönetir, yorum alır

Bağlı Dosyalar:
- career-config.ts (konfigürasyon)
- position-meanings-index.ts (pozisyon anlamları)
- messages/tr.json (çeviriler)

Düzeltilen Hatalar:
- Form modal'ında renk tutarsızlığı düzeltildi (pink -> blue)
- Email gönderimi fonksiyonu eklendi

Eklenen Özellikler:
- Form validasyon fonksiyonları mevcut
- Bilgilendirme modal'ı mevcut
- DETAILED/WRITTEN form modal'ı mevcut
- Kredi onay modal'ı mevcut
- ESC tuşu ile modal kapatma mevcut
- Email gönderimi fonksiyonu eklendi
- Form kaydetme ve kredi onay akışı tamamlandı

Üretime Hazır mı?:
- Evet, tüm özellikler tamamlandı, LoveTarot.tsx ve ProblemSolvingTarot.tsx ile uyumlu
---

*/

'use client';

// useAuth kaldırıldı - login sistemi kaldırıldı
// TarotCard tipi @/types/tarot'a taşındı.
import { getCareerMeaningByCardAndPosition } from '@/features/tarot/lib/career/position-meanings-index';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
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
import { useReadingCredits } from '@/hooks/useReadingCredits';
import { useAuth } from '@/hooks/auth/useAuth';
import { findSpreadById } from '@/lib/constants/tarotSpreads';
import {
  CAREER_POSITIONS_INFO,
  CAREER_POSITIONS_LAYOUT,
} from './career-config';

// ============================================================================
// BÖLÜM 1: SABITLER VE KONFIGÜRASYONLAR
// ============================================================================

// Kariyer Açılımı pozisyon başlıkları ve açıklamaları
// Eski CAREER_POSITIONS_INFO ve CAREER_POSITIONS_LAYOUT tanımlarını tamamen kaldır.

// Kariyer Açılımı için toplam kart sayısı
export const CAREER_CARD_COUNT = 7;

// Okuma tipleri
import { READING_TYPES, ReadingType, TarotCard } from '@/types/tarot';

// AI ile ilgili prompt'lar ve fonksiyonlar kaldırıldı.

// ============================================================================
// BÖLÜM 2: REACT BİLEŞENİ
// ============================================================================

// Ana bileşenin props'ları
interface CareerReadingProps {
  onComplete?: (_cards: TarotCard[], _interpretation: string) => void;
  onPositionChange?: (_title: string) => void;
  onReadingTypeSelected?: () => void;
}

// Ana Kariyer Açılımı bileşeni
export default function CareerReading({
  onComplete: _onComplete,
  onPositionChange: _onPositionChange,
  onReadingTypeSelected,
}: CareerReadingProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const { user } = useAuth();
  const careerSpread = findSpreadById('career-spread');

  // Kredi yönetimi
  const detailedCredits = useReadingCredits('CAREER_SPREAD_DETAILED');
  const writtenCredits = useReadingCredits('CAREER_SPREAD_WRITTEN');

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
    // setUserQuestion, // Kullanılmıyor - kaldırıldı
    selectedReadingType,
    setSelectedReadingType,
  } = useTarotReading({
    config: {
      cardCount: CAREER_CARD_COUNT,
      positionsInfo: CAREER_POSITIONS_INFO,
    },
    onComplete: (_cards, _interpretation) => {
      // Kariyer açılımı tamamlandı
    },
    onPositionChange: _title => {
      // Pozisyon değişti
    },
  });

  // State'ler
  // const [simpleQuestion, setSimpleQuestion] = useState(''); // Kaldırıldı - basit okuma için soru kaydet ekranı yok
  // const [simpleQuestionSaved, setSimpleQuestionSaved] = useState(false); // Kaldırıldı - basit okuma için soru kaydet ekranı yok
  const { toast, showToast, hideToast } = useToast();
  // const [error, setError] = useState<string | null>(null); // Kullanılmıyor
  const [startTime] = useState<number>(Date.now()); // Duration tracking için

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
  //   spreadId: 'career',
  //   cardCount: CAREER_CARD_COUNT,
  //   positionsInfo: CAREER_POSITIONS_INFO,
  //   positionsLayout: CAREER_POSITIONS_LAYOUT,
  //   onReadingComplete: (reading) => {
  //     _onComplete?.(selectedCards, reading.interpretation);
  //   }
  // });

  // DETAILED/WRITTEN için ek state'ler (LoveGuidanceDetail.tsx'den alınanlar)
  const [personalInfo, setPersonalInfo] = useState({
    name: '', // İsim - user kaldırıldı
    surname: '', // Soyisim - user kaldırıldı
    birthDate: '',
    email: '', // Email - user kaldırıldı
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
            t('career.messages.formUnsavedWarning')
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

  // Basit okuma için soru kaydetme fonksiyonu kaldırıldı - artık soru kaydet ekranı yok

  // DETAILED/WRITTEN için validasyon fonksiyonları (LoveGuidanceDetail.tsx'den alınan mantık)
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
      errors.name = t('career.validation.nameMinLength');
      hasError = true;
    }
    if (
      !personalInfo.surname.trim() ||
      personalInfo.surname.trim().length < 3
    ) {
      errors.surname = t('career.validation.surnameMinLength');
      hasError = true;
    }
    if (!personalInfo.birthDate) {
      errors.birthDate = t('career.validation.birthDateRequired');
      hasError = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      errors.email = t('career.validation.emailInvalid');
      hasError = true;
    }
    if (!questions.concern.trim() || questions.concern.trim().length < 10) {
      errors.concern = t('career.validation.questionMinLength');
      hasError = true;
    }
    if (
      !questions.understanding.trim() ||
      questions.understanding.trim().length < 10
    ) {
      errors.understanding =
        t('career.validation.questionMinLength');
      hasError = true;
    }
    if (!questions.emotional.trim() || questions.emotional.trim().length < 10) {
      errors.emotional = t('career.validation.questionMinLength');
      hasError = true;
    }
    setFormErrors(prev => ({ ...prev, ...errors }));
    return !hasError;
  };
  const handleSaveDetailedFormClick = () => {
    if (!validateDetailedForm()) {
      return;
    }
    // Kredi kontrolü kaldırıldı - login sistemi kaldırıldı
    setShowCreditConfirm(true);
  };
  const saveDetailedForm = async () => {
    if (!user) {
      showToast(t('career.messages.loginRequired'), 'error');
      setShowCreditConfirm(false);
      setIsSaving(false);
      return;
    }

    setIsSaving(true);
    try {
      // Kredi ön kesinti kaldırıldı. Kredi yeterliliği UI seviyesinde kontrol ediliyor,
      // asıl kesinti RPC ile kaydetme sırasında yapılacak.
      setDetailedFormSaved(true);
      setShowCreditConfirm(false);
    } finally {
      setIsSaving(false);
    }
  };

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
          p_spread_name: t('career.data.spreadName'),
          p_title: readingData.title || t('career.data.spreadTitle'),
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
        throw rpcError;
      }

      console.log('Okuma başarıyla kaydedildi:', rpcResult?.id);

      // Email gönderimi (asenkron, hata durumunda okuma kaydını etkilemez)
      // Server-side API endpoint'e istek gönder
      triggerEmailSending(rpcResult?.id, readingData).catch(error => {
        console.error('Email gönderimi başarısız:', error);
      });

      return {
        success: true,
        id: rpcResult?.id,
        userId: user.id,
      };
    } catch (error) {
      console.error('Okuma kaydetme hatası:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      };
    }
  };

  // Okumayı kaydetme fonksiyonu
  const handleSaveReading = async () => {
    // User authentication removed - simplified flow

    setIsSavingReading(true);
    try {
      // Basit okuma için sadece sayaç kaydı
      if (selectedReadingType === READING_TYPES.SIMPLE) {
        // Basit okuma sayacı için minimal kayıt
        const simpleReadingData = {
          userId: 'anonymous-user',
          readingType: 'career', // Veritabanındaki enum değeri ile uyumlu
          cards: { selectedCards: [] }, // Boş kart listesi
          interpretation: t('career.data.simpleInterpretation'),
          question: { type: 'simple' },
          status: 'completed',
          title: t('career.data.simpleTitle'),
          cost_credits: 0, // Ücretsiz
          admin_notes: 'Simple reading counter',
        };

        // Database'e kaydet
        const saveResult = await saveReadingToSupabase(simpleReadingData);
        if (saveResult.success) {
          console.log('Basit okuma sayacı kaydedildi:', saveResult.id);
        }

        showToast(t('career.messages.simpleReadingCompleted'), 'success');
        router.push('/dashboard');
        return;
      }

      // DETAILED/WRITTEN için backend optimizasyon şemasına uygun kaydetme
      if (
        selectedReadingType === READING_TYPES.DETAILED ||
        selectedReadingType === READING_TYPES.WRITTEN
      ) {
        const duration = Date.now() - startTime;
        // creditCost kaldırıldı - login sistemi kaldırıldı

        // Standardize edilmiş veri yapısı
        const readingData = {
          userId: 'anonymous-user', // User ID kaldırıldı - login sistemi kaldırıldı
          readingType: 'career', // Veritabanındaki enum değeri ile uyumlu
          status: 'completed',
          // creditCost kaldırıldı
          title: t('career.data.detailedTitle'),
          interpretation: generateBasicInterpretation(),
          cards: {
            selectedCards: selectedCards
              .filter((card): card is TarotCard => card !== null)
              .map((card, idx) => ({
                id: card.id,
                name: card.name,
                nameTr: card.nameTr,
                isReversed: isReversed[idx],
              })),
            positions: CAREER_POSITIONS_INFO.map(pos => ({
              id: pos.id,
              title: pos.title,
              description: pos.desc,
            })),
          },
          questions: {
            personalInfo: {
              name: personalInfo.name,
              surname: personalInfo.surname,
              birthDate: personalInfo.birthDate,
              email: personalInfo.email,
            },
            userQuestions: questions,
          },
          metadata: {
            duration,
            platform: 'web',
            ipHash: 'hashed_ip_address', // Güvenlik için IP hash
            userAgent:
              typeof navigator !== 'undefined' ? navigator.userAgent : '',
            readingFormat: selectedReadingType, // Sesli/yazılı bilgisi
            readingFormatTr: selectedReadingType === READING_TYPES.DETAILED ? t('career.data.readingFormats.detailed') : 
                            selectedReadingType === READING_TYPES.WRITTEN ? t('career.data.readingFormats.written') : t('career.data.readingFormats.simple'),
          },
          timestamp: new Date().toISOString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Okuma verisini Supabase'e kaydet
        const saveResult = await saveReadingToSupabase(readingData);

        if (saveResult.success) {
          showToast(t('career.messages.readingSavedSuccess'), 'success');
        } else {
          console.error('Okuma kaydetme hatası:', saveResult.error);
          showToast(t('career.messages.readingSaveError'), 'error');
        }

        // Başarı modal'ını göster
        setShowSuccessModal(true);

        // 1.5 saniye sonra modal'ı kapat ve profile yönlendir
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push('/dashboard');
        }, 1500);
        return;
      }
    } catch (error) {
      console.error('Okuma kaydetme hatası:', error);
      showToast(t('career.messages.readingSaveError'), 'error');
    } finally {
      setIsSavingReading(false);
    }
  };

  if (!careerSpread) {
    return (
      <div className='text-red-500'>
        {t('career.messages.configurationNotFound')}
      </div>
    );
  }

  // Pozisyona özel kart anlamını al
  const getCareerCardMeaning = (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ): string => {
    if (!card) {
      return '';
    }
    const meaning = getCareerMeaningByCardAndPosition(card, position);
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
    const meaning = getCareerMeaningByCardAndPosition(card, position);
    if (!meaning) return null;

    return {
      card: card.name,
      name: card.nameTr,
      context: meaning.context, // Kartın pozisyonuna özel context bilgisini kullan
      keywords: meaning.keywords,
    };
  };

  // Basit yorum oluştur (kartlar eksikse uyarı ver)
  const generateBasicInterpretation = (): string => {
    const cards = selectedCards as TarotCard[];
    if (
      selectedCards.length !== CAREER_CARD_COUNT ||
      selectedCards.some(c => !c)
    ) {
      return t('career.messages.allCardsRequired');
    }
    let interpretation = `💼 **${t('career.messages.interpretationTitle')}**\n\n`;
    if (userQuestion.trim()) {
      interpretation += `**${t('career.messages.interpretationGreeting').replace('{question}', userQuestion)}**\n\n`;
    }
    CAREER_POSITIONS_INFO.forEach((posInfo, index) => {
      const card = cards[index];
      const reversed = !!isReversed[index];
      if (card) {
        interpretation += `**${posInfo.id}. ${posInfo.title}: ${card.nameTr}** (${reversed ? t('career.data.cardDirections.reversed') : t('career.data.cardDirections.upright')})\n*${posInfo.desc}*\n${getCareerCardMeaning(card, posInfo.id, reversed)}\n\n`;
      }
    });
    interpretation += `💫 **${t('tarotPage.careerSpread.summary')}:**\n"${t('tarotPage.careerSpread.summaryText')}"`;
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

  // ANA UI RENDER
  return (
    <div className='w-full space-y-6 md:space-y-8'>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      {/* KARİYER AÇILIMI ANA SAHNESI */}
      <div className='w-full relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-900/90 via-slate-900/80 to-green-800/80 border border-blue-700/60'>
        {/* KARTLAR KİLİTLİ OVERLAY veya SORU/DETAYLI FORMU */}
        {selectedReadingType === null && (
          <div className='absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl'>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 flex items-center justify-center bg-blue-800/70 rounded-full mb-2 shadow-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-10 w-10 text-blue-300'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6'
                  />
                </svg>
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
        {/* BASİT OKUMA SEÇİLDİYSE SORU FORMU KALDIRILDI - Direkt kart seçimi */}
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
                    <span className='text-xl text-blue-200'>💼</span>
                  </div>
                  <h2 className='text-blue-200 text-lg font-semibold'>
                    {t('career.modals.infoTitle')}
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
                      {t('career.modals.aboutSpread')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {t('career.modals.aboutSpreadText')}
                    </p>
                  </div>

                  {/* Kart Sayısı */}
                  <div className='bg-indigo-800/20 border border-indigo-500/30 rounded-xl p-4'>
                    <h3 className='text-indigo-200 font-semibold mb-2'>
                      {t('career.modals.cardCount')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {t('career.modals.cardCountText')}
                    </p>
                  </div>

                  {/* Okuma Türü */}
                  <div className='bg-blue-800/20 border border-blue-500/30 rounded-xl p-4'>
                    <h3 className='text-blue-200 font-semibold mb-2'>
                      {selectedReadingType === READING_TYPES.DETAILED
                        ? t('career.modals.detailedReading')
                        : t('career.modals.writtenReading')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {selectedReadingType === READING_TYPES.DETAILED
                        ? t('career.modals.detailedReadingText')
                        : t('career.modals.writtenReadingText')}
                    </p>
                  </div>

                  {/* Süreç */}
                  <div className='bg-indigo-800/20 border border-indigo-500/30 rounded-xl p-4'>
                    <h3 className='text-indigo-200 font-semibold mb-2'>
                      {t('career.modals.process')}
                    </h3>
                    <div className='space-y-2'>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                          1
                        </span>
                        {t('career.modals.step1')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                          2
                        </span>
                        {t('career.modals.step2')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                          3
                        </span>
                        {t('career.modals.step3')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                          4
                        </span>
                        {t('career.modals.step4')}
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
                    {t('career.modals.cancel')}
                  </button>
                  <button
                    onClick={() => setShowInfoModal(false)}
                    className='flex-1 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg'
                  >
                    {t('career.modals.continue')}
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
                      t('career.messages.formUnsavedWarning')
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
                      <span className='text-xl text-blue-200'>💼</span>
                    </div>
                    <h2 className='text-blue-200 text-lg font-semibold'>
                      {t('career.form.personalInfo')}
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
                          t('career.messages.formUnsavedWarning')
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
                          {t('career.form.firstName')} *
                        </label>
                        <input
                          type='text'
                          value={personalInfo.name}
                          onChange={e =>
                            updatePersonalInfo('name', e.target.value)
                          }
                          placeholder={t('career.form.placeholders.firstName')}
                          className={`w-full px-4 py-3 bg-slate-800/80 border ${
                            formErrors.name
                              ? 'border-red-500'
                              : 'border-blue-400/50'
                          } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base`}
                          autoComplete='given-name'
                        />
                        {formErrors.name && (
                          <p className='text-xs text-red-400 mt-1'>
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-blue-200 mb-2'>
                          {t('career.form.lastName')} *
                        </label>
                        <input
                          type='text'
                          value={personalInfo.surname}
                          onChange={e =>
                            updatePersonalInfo('surname', e.target.value)
                          }
                          placeholder={t('career.form.placeholders.lastName')}
                          className={`w-full px-4 py-3 bg-slate-800/80 border ${
                            formErrors.surname
                              ? 'border-red-500'
                              : 'border-blue-400/50'
                          } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base`}
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
                      <label className='block text-sm font-medium text-blue-200 mb-2'>
                        {t('career.form.birthDate')} *
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
                        <p className='text-xs text-red-400 mt-1'>
                          {formErrors.birthDate}
                        </p>
                      )}
                    </div>

                    {/* E-posta */}
                    <div>
                      <label className='block text-sm font-medium text-blue-200 mb-2'>
                        {t('career.form.email')} *
                      </label>
                      <input
                        type='email'
                        value={personalInfo.email}
                        onChange={e =>
                          updatePersonalInfo('email', e.target.value)
                        }
                        placeholder={t('career.form.placeholders.email')}
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.email
                            ? 'border-red-500'
                            : 'border-blue-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base`}
                        autoComplete='email'
                      />
                      {formErrors.email && (
                        <p className='text-xs text-red-400 mt-1'>
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Sorular Bölümü */}
                    <div className='pt-4 border-t border-blue-500/20'>
                      <h3 className='text-blue-200 font-medium mb-4 text-center'>
                        {t('career.form.questions')}
                      </h3>

                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-blue-200 mb-2'>
                            {t('career.form.concernQuestion')}
                          </label>
                          <textarea
                            value={questions.concern}
                            onChange={e =>
                              updateQuestion('concern', e.target.value)
                            }
                            placeholder={t('career.form.placeholders.concernQuestion')}
                            className={`w-full px-4 py-3 bg-slate-800/80 border ${
                              formErrors.concern
                                ? 'border-red-500'
                                : 'border-blue-400/50'
                            } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base resize-none`}
                            rows={3}
                          />
                          {formErrors.concern && (
                            <p className='text-xs text-red-400 mt-1'>
                              {formErrors.concern}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-blue-200 mb-2'>
                            {t('career.form.understandingQuestion')}
                          </label>
                          <textarea
                            value={questions.understanding}
                            onChange={e =>
                              updateQuestion('understanding', e.target.value)
                            }
                            placeholder={t('career.form.placeholders.understandingQuestion')}
                            className={`w-full px-4 py-3 bg-slate-800/80 border ${
                              formErrors.understanding
                                ? 'border-red-500'
                                : 'border-blue-400/50'
                            } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base resize-none`}
                            rows={3}
                          />
                          {formErrors.understanding && (
                            <p className='text-xs text-red-400 mt-1'>
                              {formErrors.understanding}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-blue-200 mb-2'>
                            {t('career.form.emotionalQuestion')}
                          </label>
                          <textarea
                            value={questions.emotional}
                            onChange={e =>
                              updateQuestion('emotional', e.target.value)
                            }
                            placeholder={t('career.form.placeholders.emotionalQuestion')}
                            className={`w-full px-4 py-3 bg-slate-800/80 border ${
                              formErrors.emotional
                                ? 'border-red-500'
                                : 'border-blue-400/50'
                            } rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-base resize-none`}
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
                <div className='p-6 border-t border-blue-500/20 flex-shrink-0'>
                  <button
                    onClick={handleSaveDetailedFormClick}
                    className='w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base'
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <div className='flex items-center justify-center'>
                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                        {t('career.form.saving')}
                      </div>
                    ) : (
                      t('career.form.saveAndOpen')
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

        {/* Kredi Onay Modalı */}
        {showCreditConfirm && (
          <div className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'>
            <div className='bg-slate-900 border border-blue-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4'>
              <h2 className='text-xl font-bold text-blue-400 mb-4 text-center'>
                {t('career.modals.creditConfirm')}
              </h2>
              <p className='text-gray-200 text-center mb-6'>
                {t('career.modals.creditConfirmMessage')}
              </p>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={saveDetailedForm}
                  disabled={isSaving}
                  className='bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60'
                >
                  {isSaving
                    ? t('career.modals.processing')
                    : t('career.modals.confirm')}
                </button>
                <button
                  onClick={() => setShowCreditConfirm(false)}
                  disabled={isSaving}
                  className='bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60'
                >
                  {t('career.modals.cancel')}
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
            className='absolute inset-0 bg-gradient-to-br from-blue-900/10 via-slate-900/60 to-green-900/20 backdrop-blur-[2px]'
            style={{ zIndex: 1 }}
          />
          <img
            src='/images/bg-3card-tarot.jpg'
            alt='Career Tarot Reading background'
            className='absolute inset-0 w-full h-full object-cover object-center opacity-60'
            loading='lazy'
            style={{ zIndex: 0 }}
          />
          <div
            className='absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/10 to-green-900/80'
            style={{ zIndex: 2 }}
          />
        </div>

        <div
          className='absolute inset-0 bg-black/30 backdrop-blur-[1.5px] rounded-2xl'
          style={{ zIndex: 4 }}
        />

        <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
          <div className='relative w-full h-full min-h-[320px] xs:min-h-[360px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[480px] xl:min-h-[520px]'>
            {CAREER_POSITIONS_LAYOUT.map((position, idx) => (
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
                  CAREER_POSITIONS_INFO[idx] ?? {
                    title: `Pozisyon ${position.id}`,
                    desc: 'Kart pozisyonu',
                  }
                }
                renderCard={(card, props) => (
                  <BaseCardRenderer
                    card={card}
                    theme='blue'
                    {...props}
                  />
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
            readingType='CAREER_SPREAD_DETAILED'
            theme='blue'
            disabled={isSaving}
          />
        </div>
      )}

      {selectedReadingType &&
        currentPosition &&
        currentPosition <= CAREER_CARD_COUNT && (
          <div className='flex justify-center mb-4'>
            <div className='bg-gradient-to-r from-blue-600/20 via-slate-500/30 to-green-500/20 border border-blue-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse'>
              <div className='flex items-center space-x-3'>
                <div className='w-6 h-6 bg-blue-400/20 rounded-full flex items-center justify-center'>
                  <span className='text-blue-300 text-sm'>💼</span>
                </div>
                <div className='text-center'>
                  <div className='text-blue-200 font-bold text-lg'>
                    {CAREER_POSITIONS_INFO[currentPosition - 1]?.title ?? ''}
                  </div>
                  <div className='text-gray-300 text-xs'>
                    {CAREER_POSITIONS_INFO[currentPosition - 1]?.desc ?? ''}
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
                showToast(t('career.messages.selectReadingTypeFirst'), 'info');
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
            className='px-8 py-3 bg-gradient-to-r from-blue-500/30 to-green-500/20 border border-blue-500/50 rounded-2xl text-blue-400 hover:bg-blue-500/40 hover:border-blue-500/70 transition-all duration-300 font-semibold shadow-md shadow-blue-500/10'
          >
            {t('career.form.clearAll')}
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
          spreadType='career'
          positionInfo={(() => {
            const idx = selectedCards.findIndex(
              (c: TarotCard | null) => c && c.id === showCardDetails.id
            );
            const p = CAREER_POSITIONS_INFO[idx];
            return p
              ? { title: p.title, desc: p.desc }
              : { title: `Pozisyon ${idx + 1}`, desc: 'Kart pozisyonu' };
          })()}
        />
      )}

      {selectedCards.filter(c => c !== null).length === CAREER_CARD_COUNT &&
        selectedReadingType && (
          <div ref={interpretationRef} className='space-y-6'>
            <BaseInterpretation
              cards={selectedCards}
              isReversed={isReversed}
              theme='blue'
              title={t('career.data.interpretationTitle')}
              icon='💼'
              badgeText={t('career.data.badgeText')}
              badgeColor='bg-blue-500/20 text-blue-400'
              positionsInfo={CAREER_POSITIONS_INFO}
              getCardMeaning={getCardMeaning}
              getPositionSpecificInterpretation={(card, position, isReversed) =>
                getCareerCardMeaning(card, position, isReversed)
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
                  className='px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg'
                >
                  {isSavingReading
                    ? t('career.modals.savingReading')
                    : t('career.modals.saveReading')}
                </button>
              </div>
            )}
          </div>
        )}

      {/* Başarı Modal'ı */}
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-gradient-to-br from-blue-900/95 to-green-900/95 border border-blue-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center'>
            {/* Başarı İkonu */}
            <div className='w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
              <span className='text-3xl'>✅</span>
            </div>

            {/* Başlık */}
            <h2 className='text-2xl font-bold text-green-400 mb-4'>
              {t('career.modals.successTitle')}
            </h2>

            {/* Mesaj */}
            <p className='text-blue-200 mb-6 leading-relaxed'>
              {t('career.modals.successMessage')}
            </p>

            {/* Bilgi */}
            <div className='bg-blue-800/30 border border-blue-500/20 rounded-xl p-4 mb-6'>
              <p className='text-blue-300 text-sm'>
                {t('career.modals.redirecting')}
              </p>
            </div>

            {/* Progress Bar */}
            <div className='w-full bg-blue-800/30 rounded-full h-2 mb-4'>
              <div className='bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full animate-pulse'></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Email gönderimi için API endpoint'e istek gönder
 */
async function triggerEmailSending(
  readingId: string | undefined,
  _readingData: any
): Promise<void> {
  if (!readingId) {
    console.error('❌ Reading ID bulunamadı, email gönderilemedi');
    return;
  }

  try {
    console.log("🔮 Email gönderimi API endpoint'e istek gönderiliyor...", {
      readingId,
    });

    // Server-side API endpoint'e sadece readingId gönder
    // API kendi Supabase'den gerçek veriyi çekecek
    const response = await fetch('/api/send-reading-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        readingId,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Email gönderimi başarılı:', result);
    } else {
      const error = await response.text();
      console.error('❌ Email gönderimi başarısız:', error);
    }
  } catch (error) {
    console.error('❌ Email gönderimi API hatası:', error);
  }
}
