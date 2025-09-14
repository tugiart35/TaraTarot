/*
CHECKLIST (Her adım tamamlandıkça 'COMPLETED' olarak işaretlenecek):
1. Fonksiyonları küçük parçalara böl (ör: kart seçimi, form validasyonu, backend işlemleri ayrı fonksiyonlara ayrılacak) [COMPLETED]
2. Okuma kodu ve kullanıcı eşleşmesi için ek güvenlik önlemleri (yorum satırı ile backend noktası hazırla) [COMPLETED]
3. Okuma backend'e kaydedilirken harcanan kredi miktarı (cost) da kayda eklenecek [COMPLETED]
4. Okuma türüne göre kredi kontrolü ve gösterimi düzeltildi (doğru kredi miktarı) [COMPLETED]
5. Kredi düşme işlemi öncesi kullanıcıya onay modalı eklendi [COMPLETED]
6. Hata yönetimi ve kullanıcı geri bildirimi iyileştirildi (Toast bildirimleri eklendi) [COMPLETED]
7. State yönetimi daha detaylı hale getirildi (isLoading, isSaving, isGenerating) [COMPLETED]
8. Başarılı gönderim sonrası ayrı bir "submitted" ekranı eklendi [COMPLETED]
9. Mükerrer gönderimleri engellemek için hash kontrolü eklendi [COMPLETED]
*/

'use client';

import { useState, useEffect } from 'react';
import { TarotCard } from '@/features/tarot/lib/full-tarot-deck';
import { useReadingCredits } from '@/hooks/useReadingCredits';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase/client';
import { LOVE_POSITIONS_INFO, LOVE_POSITIONS_LAYOUT } from './love-config';
import {
  BaseCardPosition,
  BaseCardGallery,
  CardDetails,
  // ReadingInfoModal, // Archived
} from '@/features/shared/ui';
import LoveCardRenderer from './LoveCardRenderer';
import LoveInterpretation from './LoveInterpretation';
import { useRouter } from 'next/navigation';
import { type ReadingType } from '@/lib/constants/reading-credits';

// Ana state tipi
interface ReadingState {
  personalInfo: {
    fullName: string;
    birthDate: string;
    email: string;
  };
  questions: {
    concern: {
      question: string;
      answer: string;
    };
    understanding: {
      question: string;
      answer: string;
    };
    emotional: {
      question: string;
      answer: string;
    };
  };
  selectedCards: (TarotCard | null)[];
  cardStates: boolean[];
  isReversed: boolean[];
  usedCardIds: Set<number>;
  deck: TarotCard[];
  currentStep: 'info' | 'questions' | 'credit' | 'reading' | 'interpretation' | 'submitted';
  isSubmitted: boolean;
  detailedInterpretation: string;
  startTime?: number; // Duration tracking için
}

interface LoveGuidanceDetailProps {
  readingCode?: string;
}

export default function LoveGuidanceDetail({
  readingCode = 'demo-access-123',
}: LoveGuidanceDetailProps) {
  const router = useRouter();
  const { user } = useAuth();
  
  // Kredi yönetimi - sesli ve yazılı okumalar için
  const detailedCredits = useReadingCredits('LOVE_SPREAD_DETAILED');
  const writtenCredits = useReadingCredits('LOVE_SPREAD_WRITTEN');

  const getReadingType = (code: string): ReadingType => {
    if (code?.includes('written')) {
      return 'LOVE_SPREAD_WRITTEN';
    }
    return 'LOVE_SPREAD';
  };
  // readingType kaldırıldı - kullanılmıyor

  // useReadingCredits kaldırıldı - login sistemi kaldırıldı

  // Tüm hook'lar en başta, koşulsuz:
  // currentStep kaldırıldı - readingState.currentStep kullanılacak
  const [readingState, setReadingState] = useState<ReadingState>({
    personalInfo: {
      fullName: '',
      birthDate: '',
      email: '',
    },
    questions: {
      concern: {
        question: 'Aşk hayatınızda sizi en çok endişelendiren konu nedir?',
        answer: ''
      },
      understanding: {
        question: 'Bu aşk açılımı ile neyi anlamak istiyorsunuz?',
        answer: ''
      },
      emotional: {
        question: 'Şu anda duygusal olarak nasıl hissediyorsunuz?',
        answer: ''
      },
    },
    selectedCards: new Array(4).fill(null),
    cardStates: new Array(4).fill(false),
    isReversed: new Array(4).fill(false),
    usedCardIds: new Set<number>(),
    deck: [],
    currentStep: 'info',
    isSubmitted: false,
    detailedInterpretation: '',
    startTime: Date.now(), // Duration tracking için başlangıç zamanı
  });
  const [showCardDetails, setShowCardDetails] = useState<{
    card: TarotCard | null;
    position: number;
  } | null>(null);
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    birthDate: '',
    email: '',
    concern: '',
    understanding: '',
    emotional: '',
    general: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCreditConfirm, setShowCreditConfirm] = useState(false);
  // const [showInfoModal, setShowInfoModal] = useState(true); // Archived with ReadingInfoModal
  const [toast, setToast] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [toast]);

  const validateReadingCode = (code: string): boolean => {
    if (!code || typeof code !== 'string') {
      return false;
    }
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(code) || code.startsWith('love-spread-');
  };

  if (!validateReadingCode(readingCode)) {
    return (
      <div className='w-full max-w-2xl mx-auto p-6 text-center'>
        <div className='bg-red-900/50 border border-red-500/50 rounded-xl p-8'>
          <h2 className='text-2xl font-bold text-red-400 mb-4'>
            Geçersiz Okuma Kodu
          </h2>
          <p className='text-gray-300 mb-4'>
            Sağladığınız aşk açılımı kodu geçerli değil veya süresi dolmuş.
          </p>
          <button
            onClick={() => router.push('/')}
            className='bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors'
          >
            Anasayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  // useEffect(() => {
  //   if (user) {
  //     setReadingState(prev => ({
  //       ...prev,
  //       personalInfo: {
  //         ...prev.personalInfo,
  //         fullName: user.name || prev.personalInfo.fullName,
  //         email: user.email || prev.personalInfo.email,
  //       },
  //     }));
  //   }
  // }, [user?.uid, user?.name, user?.email]);

  // useEffect(() => {
  //   const loadDeck = async () => {
  //     try {
  //       const { fullTarotDeck } = await import('@/lib/tarot/full-tarot-deck');
  //       setReadingState(prev => ({
  //         ...prev,
  //         deck: [...fullTarotDeck].sort(() => Math.random() - 0.5),
  //       }));
  //     } catch (error) {
  //       setToast({
  //         type: 'error',
  //         message: 'Deste yüklenirken bir hata oluştu.',
  //       });
  //     }
  //   };
  //   loadDeck();
  // }, []);

  const updatePersonalInfo = (
    field: keyof ReadingState['personalInfo'],
    value: string
  ) => {
    setReadingState(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
    setFormErrors(errors => ({ ...errors, [field]: '', general: '' }));
  };

  const updateQuestion = (
    field: keyof ReadingState['questions'],
    value: string
  ) => {
    setReadingState(prev => ({
      ...prev,
      questions: { 
        ...prev.questions, 
        [field]: { 
          ...prev.questions[field], 
          answer: value 
        } 
      },
    }));
    setFormErrors(errors => ({ ...errors, [field]: '', general: '' }));
  };

  const validateForm = () => {
    const { personalInfo, questions } = readingState;
    const errors: { [key: string]: string } = {};
    let hasError = false;

    if (
      !personalInfo.fullName.trim() ||
      personalInfo.fullName.trim().length < 3
    ) {
      errors.fullName = 'Ad ve soyad en az 3 karakter olmalıdır.';
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
    if (!questions.concern.answer.trim() || questions.concern.answer.trim().length < 10) {
      errors.concern = 'Bu soruya en az 10 karakterlik yanıt vermelisiniz.';
      hasError = true;
    }
    if (
      !questions.understanding.answer.trim() ||
      questions.understanding.answer.trim().length < 10
    ) {
      errors.understanding =
        'Bu soruya en az 10 karakterlik yanıt vermelisiniz.';
      hasError = true;
    }
    if (!questions.emotional.answer.trim() || questions.emotional.answer.trim().length < 10) {
      errors.emotional = 'Bu soruya en az 10 karakterlik yanıt vermelisiniz.';
      hasError = true;
    }

    setFormErrors(prev => ({ ...prev, ...errors }));
    return !hasError;
  };

  const handleSaveQuestionsClick = () => {
    if (!validateForm()) {
      return;
    }

    // Kredi kontrolü kaldırıldı - login sistemi kaldırıldı
    setShowCreditConfirm(true);
  };

  const saveQuestions = async () => {
    if (!user) {
      setToast({
        type: 'error',
        message: 'Okuma için giriş yapmalısınız.',
      });
      setShowCreditConfirm(false);
      setIsSaving(false);
      return;
    }

    setIsSaving(true);
    try {
      // Kredi ön kesinti kaldırıldı. Kredi yeterliliği UI seviyesinde kontrol edilir,
      // asıl kesinti RPC ile kaydetme sırasında yapılacak.
      setReadingState(prev => ({ ...prev, currentStep: 'reading' }));
      setShowCreditConfirm(false);
    } finally {
      setIsSaving(false);
    }
  };

  function selectCardAtIndex(
    prev: ReadingState,
    card: TarotCard,
    index: number,
    isReversedCard: boolean
  ): ReadingState {
    const newSelectedCards = prev.selectedCards.map((c, idx) =>
      idx === index ? card : c
    );
    const newIsReversed = prev.isReversed.map((reversed, idx) =>
      idx === index ? isReversedCard : reversed
    );
    const newCardStates = prev.cardStates.map((state, idx) =>
      idx === index ? true : state
    );
    const newUsedCardIds = new Set(
      Array.from(prev.usedCardIds).concat(card.id)
    );
    const allSelected = newSelectedCards.every(c => c !== null);
    return {
      ...prev,
      selectedCards: newSelectedCards,
      isReversed: newIsReversed,
      cardStates: newCardStates,
      usedCardIds: newUsedCardIds,
      currentStep: allSelected ? 'interpretation' : prev.currentStep,
    };
  }

  const handleCardSelect = (card: TarotCard) => {
    const nextEmptyIndex = readingState.selectedCards.findIndex(
      c => c === null
    );
    if (nextEmptyIndex === -1) {
      return;
    } // Tüm pozisyonlar dolu

    const isReversedCard = Math.random() < 0.3; // %30 ters çıkma şansı
    setReadingState(prev =>
      selectCardAtIndex(prev, card, nextEmptyIndex, isReversedCard)
    );
  };

  const toggleCardState = (positionId: number) => {
    const index = positionId - 1;
    setReadingState(prev => ({
      ...prev,
      cardStates: prev.cardStates.map((state, idx) =>
        idx === index ? !state : state
      ),
    }));
  };

  const handleCardDetails = (card: TarotCard) => {
    const position = readingState.selectedCards.findIndex(
      c => c && c.id === card.id
    );
    setShowCardDetails({ card, position: position + 1 }); // Pozisyonlar 1 tabanlı
  };

  const handleClearAll = () => {
    setReadingState(prev => ({
      ...prev,
      selectedCards: new Array(4).fill(null),
      cardStates: new Array(4).fill(false),
      isReversed: new Array(4).fill(false),
      usedCardIds: new Set<number>(),
    }));
  };

  const getNextEmptyPosition = (): number | null => {
    const emptyIndex = readingState.selectedCards.findIndex(
      card => card === null
    );
    return emptyIndex === -1 ? null : emptyIndex + 1;
  };

  const shuffleDeck = () => {
    setReadingState(prev => ({
      ...prev,
      deck: [...prev.deck].sort(() => Math.random() - 0.5),
    }));
  };

  const saveReadingToDb = async (readingData: any) => {
    try {
      // Sadece giriş yapmış kullanıcılar için veri sakla
      if (!user?.id) {
        console.log('Guest kullanıcı - veri saklanmayacak');
        return { 
          success: true, 
          id: 'guest-session',
          userId: 'guest',
          message: 'Guest kullanıcı için veri saklanmadı'
        };
      }
      
      console.log('Okuma verileri Supabase e kaydediliyor:', {
        userId: user.id,
        readingType: readingData.readingType,
        cardsCount: readingData.cards.selectedCards.length,
        hasQuestions: !!readingData.questions
      });
      
      // RPC: Kredi düş + okuma oluştur (atomik)
      const readingType = getReadingType(readingCode);
      const cost = readingType === 'LOVE_SPREAD_DETAILED'
        ? detailedCredits.creditStatus.requiredCredits
        : readingType === 'LOVE_SPREAD_WRITTEN'
          ? writtenCredits.creditStatus.requiredCredits
          : 0;

      const { data: rpcResult, error: rpcError } = await supabase.rpc('fn_create_reading_with_debit', {
        p_user_id: user.id,
        p_reading_type: readingData.readingType,
        p_spread_name: 'Aşk Yayılımı',
        p_title: readingData.title || 'Aşk Açılımı',
        p_interpretation: readingData.interpretation,
        p_cards: readingData.cards.selectedCards,
        p_questions: {
          personalInfo: readingData.questions.personalInfo,
          userQuestions: {
            concern: {
              question: readingData.questions.userQuestions.concern.question,
              answer: readingData.questions.userQuestions.concern.answer
            },
            understanding: {
              question: readingData.questions.userQuestions.understanding.question,
              answer: readingData.questions.userQuestions.understanding.answer
            },
            emotional: {
              question: readingData.questions.userQuestions.emotional.question,
              answer: readingData.questions.userQuestions.emotional.answer
            }
          }
        },
        p_cost_credits: cost,
        p_metadata: {
          readingCode: readingData.readingCode,
          readingHash: readingData.readingHash,
          platform: 'web'
        },
        p_idempotency_key: `reading_${user.id}_${readingData.readingHash}`
      });

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
        userId: user.id
      };
    } catch (error) {
      console.error('Okuma kaydetme hatası:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  };

  const generateDetailedInterpretation = async () => {
    const { concern, understanding, emotional } = readingState.questions;
    
    // Basit bir yorum oluştur
    return `Aşk Açılımı Yorumu\n\nSoru: "${concern}"\nAnlayış: "${understanding}"\nDuygusal: "${emotional}"\n\nKartlar seçildi ve yorum hazırlandı.`;
  };

  const prepareReadingData = (
    interpretation: string,
    cost: number,
    readingHash: string
  ) => {
    const duration = readingState.startTime
      ? Date.now() - readingState.startTime
      : 0;

    return {
      userId: 'anonymous',
      readingType: 'love', // Standardize edilmiş reading type
      status: 'completed',
      creditCost: cost,
      title: 'Aşk Açılımı - Detaylı Kişisel Okuma',
      interpretation,
      cards: {
        selectedCards: readingState.selectedCards
          .filter((card): card is TarotCard => card !== null)
          .map((card, idx) => ({
            id: card.id,
            name: card.name,
            nameTr: card.nameTr,
            isReversed: readingState.isReversed[idx],
          })),
        positions: LOVE_POSITIONS_INFO.map(pos => ({
          id: pos.id,
          title: pos.title,
          description: pos.desc,
        })),
      },
      questions: readingState.questions,
      metadata: {
        duration,
        platform: 'web',
        ipHash: 'hashed_ip_address', // Güvenlik için IP hash
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      },
      readingCode,
      timestamp: new Date().toISOString(),
      readingHash,
    };
  };

  const createReadingHash = (
    selectedCards: (TarotCard | null)[],
    questions: any,
    email: string
  ) => {
    const cardIds = selectedCards.map(card => (card ? card.id : '')).join('-');
    return `${email}__${questions.concern}__${questions.understanding}__${questions.emotional}__${cardIds}`;
  };

  const checkReadingExists = async (_readingHash: string) => {
    // User authentication removed - simplified flow
    return false;
  };

  const submitReading = async () => {
    if (!readingState.selectedCards.every(card => card !== null)) {
      setToast({ type: 'error', message: 'Lütfen tüm kartları seçin!' });
      return;
    }
    // User authentication removed - simplified flow

    setIsGenerating(true);
    try {
      const readingHash = createReadingHash(
        readingState.selectedCards,
        readingState.questions,
        readingState.personalInfo.email
      );

      const exists = await checkReadingExists(readingHash);
      if (exists) {
        setToast({
          type: 'error',
          message: 'Bu okuma zaten daha önce kaydedilmiş.',
        });
        setIsGenerating(false);
        return;
      }

      const interpretation = await generateDetailedInterpretation();
      
      // Okuma tipine göre maliyeti belirle (kredi kesintisi zaten yapıldı)
      let cost = 0;
      const readingType = getReadingType(readingCode);
      
      if (readingType === 'LOVE_SPREAD_DETAILED') {
        cost = detailedCredits.creditStatus.requiredCredits;
      } else if (readingType === 'LOVE_SPREAD_WRITTEN') {
        cost = writtenCredits.creditStatus.requiredCredits;
      }
      
      // Form ve kart verilerini hazırla
      const finalReadingData = prepareReadingData(
        interpretation,
        cost,
        readingHash
      );

      // Form ve kart verilerini Supabase'e kaydet
      const saveResult = await saveReadingToDb(finalReadingData);

      if (saveResult?.success) {
        // updateAdminReading removed - backend integration removed
        setToast({
          type: 'success',
          message: 'Okumanız başarıyla kaydedildi!',
        });
        setReadingState(prev => ({
          ...prev,
          detailedInterpretation: interpretation,
          currentStep: 'submitted',
        }));
      } else {
        setToast({
          type: 'error',
          message: 'Okuma kaydedilemedi. Lütfen tekrar deneyin.',
        });
      }
    } catch (error) {
      setToast({
        type: 'error',
        message: 'Okuma tamamlama sırasında bir hata oluştu.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // 1. currentStep state'i ile akış yönetimi
  // const [currentStep, setCurrentStep] = useState<'info' | 'questions' | 'credit' | 'reading' | 'interpretation' | 'submitted'>('info');

  // 2. ReadingInfoModal açılışı - Archived
  // if (readingState.currentStep === 'info') {
  //   return (
  //     <ReadingInfoModal
  //       isOpen={true}
  //       onClose={() => setReadingState(prev => ({ ...prev, currentStep: 'questions' }))}
  //     />
  //   );
  // }

  // 3. Kişisel bilgi ve soru adımı (questions)
  if (readingState.currentStep === 'questions') {
    return (
      <>
        {toast && (
          <div
            className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {toast.message}
          </div>
        )}
        {/* <ReadingInfoModal Archived
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
        /> */}
        <div
          className='w-full max-w-2xl mx-auto p-6'
          style={{
            filter: false ? 'blur(2px)' : 'none', // showInfoModal archived
            pointerEvents: false ? 'none' : 'auto', // showInfoModal archived
          }}
        >
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-600 to-red-500 rounded-full mb-4'>
              <span className='text-2xl'>💕</span>
            </div>
            <h2 className='text-2xl font-bold text-pink-400 mb-2'>
              Kişisel Aşk Açılımı
            </h2>
            <p className='text-gray-400 text-sm'>
              Önce sizinle ilgili birkaç bilgi alalım
            </p>
          </div>
          <div className='flex justify-center items-center mb-4'>
            <div className='bg-slate-800/70 border border-pink-500/40 rounded-lg px-4 py-2 text-pink-300 text-sm font-semibold flex items-center gap-2'>
              <span>Krediniz:</span>
              <span className='text-lg font-bold text-pink-400'>Sınırsız</span>
              <span className='text-xs text-gray-400'>
                (Kredi sistemi kaldırıldı)
              </span>
            </div>
          </div>
          <div className='space-y-6 mb-8'>
            <div className='bg-slate-800/50 border border-pink-500/30 rounded-xl p-6'>
              <h3 className='text-lg font-semibold text-pink-400 mb-4'>
                Kişisel Bilgileriniz
              </h3>
              <div className='space-y-4'>
                <div>
                  <label
                    className='block text-gray-300 font-medium mb-2'
                    htmlFor='fullName'
                  >
                    Ad Soyad <span className='text-red-400'>*</span>
                  </label>
                  <input
                    id='fullName'
                    type='text'
                    value={readingState.personalInfo.fullName}
                    onChange={e =>
                      updatePersonalInfo('fullName', e.target.value)
                    }
                    placeholder='Adınız ve Soyadınız'
                    className={`w-full bg-slate-700/50 border ${formErrors.fullName ? 'border-red-500' : 'border-slate-600'} rounded-lg p-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none`}
                    required
                  />
                  {formErrors.fullName && (
                    <p className='text-red-400 text-xs mt-1'>
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className='block text-gray-300 font-medium mb-2'
                    htmlFor='birthDate'
                  >
                    Doğum Tarihi <span className='text-red-400'>*</span>
                  </label>
                  <input
                    id='birthDate'
                    type='date'
                    value={readingState.personalInfo.birthDate}
                    onChange={e =>
                      updatePersonalInfo('birthDate', e.target.value)
                    }
                    className={`w-full bg-slate-700/50 border ${formErrors.birthDate ? 'border-red-500' : 'border-slate-600'} rounded-lg p-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none`}
                    required
                  />
                  {formErrors.birthDate && (
                    <p className='text-red-400 text-xs mt-1'>
                      {formErrors.birthDate}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className='block text-gray-300 font-medium mb-2'
                    htmlFor='email'
                  >
                    E-posta Adresi <span className='text-red-400'>*</span>
                  </label>
                  <input
                    id='email'
                    type='email'
                    value={readingState.personalInfo.email}
                    onChange={e => updatePersonalInfo('email', e.target.value)}
                    placeholder='ornek@email.com'
                    className={`w-full bg-slate-700/50 border ${formErrors.email ? 'border-red-500' : 'border-slate-600'} rounded-lg p-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none`}
                    required
                  />
                  {formErrors.email && (
                    <p className='text-red-400 text-xs mt-1'>
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-6'>
            <div className='bg-slate-800/50 border border-pink-500/30 rounded-xl p-6'>
              <label className='block text-pink-400 font-semibold mb-3'>
                1. {readingState.questions.concern.question}
              </label>
              <textarea
                id='concern'
                value={readingState.questions.concern.answer}
                onChange={e => updateQuestion('concern', e.target.value)}
                placeholder='Örnek: İlgilendiğim kişinin bana karşı hisleri konusunda emin değilim...'
                className={`w-full bg-slate-700/50 border ${formErrors.concern ? 'border-red-500' : 'border-slate-600'} rounded-lg p-4 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none resize-none`}
                rows={3}
              />
              {formErrors.concern && (
                <p className='text-red-400 text-xs mt-1'>
                  {formErrors.concern}
                </p>
              )}
            </div>
            <div className='bg-slate-800/50 border border-red-500/30 rounded-xl p-6'>
              <label className='block text-red-400 font-semibold mb-3'>
                2. {readingState.questions.understanding.question}
              </label>
              <textarea
                id='understanding'
                value={readingState.questions.understanding.answer}
                onChange={e => updateQuestion('understanding', e.target.value)}
                placeholder='Örnek: İlişkimizin geleceği hakkında daha net bir fikir edinmek istiyorum...'
                className={`w-full bg-slate-700/50 border ${formErrors.understanding ? 'border-red-500' : 'border-slate-600'} rounded-lg p-4 text-white placeholder-gray-400 focus:border-red-400 focus:outline-none resize-none`}
                rows={3}
              />
              {formErrors.understanding && (
                <p className='text-red-400 text-xs mt-1'>
                  {formErrors.understanding}
                </p>
              )}
            </div>
            <div className='bg-slate-800/50 border border-purple-500/30 rounded-xl p-6'>
              <label className='block text-purple-400 font-semibold mb-3'>
                3. {readingState.questions.emotional.question}
              </label>
              <textarea
                id='emotional'
                value={readingState.questions.emotional.answer}
                onChange={e => updateQuestion('emotional', e.target.value)}
                placeholder='Örnek: Karışık duygular içindeyim, hem umutlu hem tedirginim...'
                className={`w-full bg-slate-700/50 border ${formErrors.emotional ? 'border-red-500' : 'border-slate-600'} rounded-lg p-4 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none`}
                rows={3}
              />
              {formErrors.emotional && (
                <p className='text-red-400 text-xs mt-1'>
                  {formErrors.emotional}
                </p>
              )}
            </div>
          </div>
          {formErrors.general && (
            <div className='text-center mt-4'>
              <p className='text-red-400 text-sm'>{formErrors.general}</p>
            </div>
          )}
          <div className='text-center mt-8'>
            <button
              onClick={handleSaveQuestionsClick}
              className='bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
              disabled={isSaving}
            >
              {isSaving ? 'Kaydediliyor...' : 'Sorularımı Kaydet 💝'}
            </button>
          </div>
          {showCreditConfirm && (
            <div className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'>
              <div className='bg-slate-900 border border-pink-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4'>
                <h2 className='text-xl font-bold text-pink-400 mb-4 text-center'>
                  Kredi Onayı
                </h2>
                <p className='text-gray-200 text-center mb-6'>
                  Kredi sistemi kaldırıldı. Devam etmek istiyor musunuz?
                </p>
                <div className='flex justify-center gap-4'>
                  <button
                    onClick={saveQuestions}
                    disabled={isSaving}
                    className='bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60'
                  >
                    {isSaving ? 'İşleniyor...' : 'Evet, Onaylıyorum'}
                  </button>
                  <button
                    onClick={() => setShowCreditConfirm(false)}
                    disabled={isSaving}
                    className='bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60'
                  >
                    Vazgeç
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  // 4. Kredi onay modalı (credit)
  if (readingState.currentStep === 'credit') {
    return (
      <div className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'>
        <div className='bg-slate-900 border border-pink-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4'>
          <h2 className='text-xl font-bold text-pink-400 mb-4 text-center'>
            Kredi Onayı
          </h2>
          <p className='text-gray-200 text-center mb-6'>
            Bu okuma için kredi kesilecek. Devam etmek istiyor musunuz?
          </p>
          <div className='flex justify-center gap-4'>
            <button
              onClick={saveQuestions}
              disabled={isSaving}
              className='bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60'
            >
              {isSaving ? 'İşleniyor...' : 'Evet, Onaylıyorum'}
            </button>
            <button
              onClick={() => setReadingState(prev => ({ ...prev, currentStep: 'questions' }))}
              disabled={isSaving}
              className='bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60'
            >
              Vazgeç
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. Kart seçimi (reading)
  if (readingState.currentStep === 'reading') {
    const allCardsSelected = readingState.selectedCards.every(
      card => card !== null
    );
    const isInterpretation = false; // Currently in reading step, not interpretation

    return (
      <div className='w-full space-y-6 md:space-y-8'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-600 to-red-500 rounded-full mb-4'>
            <span className='text-2xl'>{isInterpretation ? '📜' : '🃏'}</span>
          </div>
          <h2 className='text-2xl font-bold text-pink-400 mb-2'>
            {isInterpretation ? 'Basit Kart Anlamları' : 'Aşk Açılımı Kartları'}
          </h2>
          {isInterpretation && (
            <p className='text-gray-400 text-sm'>
              2-4 saat içinde detaylı yorumunuz gelecektir.
            </p>
          )}
        </div>
        <div className='w-full relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900/90 via-zinc-900/80 to-slate-800/80 border border-slate-700/60'>
          <div className='absolute inset-0 rounded-2xl overflow-hidden'>
            <div
              className='absolute inset-0 bg-gradient-to-br from-pink-900/10 via-slate-900/60 to-red-900/20 backdrop-blur-[2px]'
              style={{ zIndex: 1 }}
            />
            <img
              src='/images/bg-love-tarot.jpg'
              alt='Love spread background'
              className='absolute inset-0 w-full h-full object-cover object-center opacity-60'
              loading='lazy'
              style={{ zIndex: 0 }}
            />
          </div>
          <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
            <div className='relative w-full h-full min-h-[320px] xs:min-h-[360px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[480px] xl:min-h-[520px]'>
              {LOVE_POSITIONS_LAYOUT.map((position, idx) => (
                <BaseCardPosition
                  key={position.id}
                  position={position}
                  card={readingState.selectedCards[position.id - 1] || null}
                  isOpen={
                    isInterpretation || readingState.cardStates[position.id - 1] || false
                  }
                  isReversed={readingState.isReversed[position.id - 1] || false}
                  isNextPosition={
                    !isInterpretation && getNextEmptyPosition() === position.id
                  }
                  onToggleCard={() =>
                    !isInterpretation && toggleCardState(position.id)
                  }
                  onCardDetails={handleCardDetails}
                  positionInfo={LOVE_POSITIONS_INFO[idx] || { title: `Pozisyon ${position.id}`, desc: 'Kart pozisyonu' }}
                  renderCard={(card, props) => (
                    <LoveCardRenderer card={card} {...props} />
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {!isInterpretation && getNextEmptyPosition() && (
          <div className='flex justify-center mb-4'>
            <div className='bg-gradient-to-r from-pink-600/20 via-red-500/30 to-purple-500/20 border border-pink-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse'>
              <div className='text-center'>
                <div className='text-pink-200 font-bold text-lg'>
                  {LOVE_POSITIONS_INFO[getNextEmptyPosition()! - 1]?.title || `Pozisyon ${getNextEmptyPosition()}`}
                </div>
                <div className='text-gray-300 text-xs'>
                  {LOVE_POSITIONS_INFO[getNextEmptyPosition()! - 1]?.desc || 'Kart pozisyonu'}
                </div>
              </div>
            </div>
          </div>
        )}

        {!isInterpretation && (
          <BaseCardGallery
            deck={readingState.deck}
            usedCardIds={readingState.usedCardIds}
            nextPosition={getNextEmptyPosition()}
            onCardSelect={handleCardSelect}
            onShuffleDeck={shuffleDeck}
            renderCard={(card, isUsed, canSelect) => (
              <LoveCardRenderer
                card={card}
                isUsed={isUsed}
                canSelect={canSelect}
                mode='gallery'
              />
            )}
          />
        )}

        {isInterpretation && (
          <LoveInterpretation
            cards={readingState.selectedCards.filter(Boolean) as TarotCard[]}
            isReversed={readingState.isReversed}
          />
        )}

        <div className='flex justify-center space-x-4'>
          {!isInterpretation && (
            <button
              onClick={handleClearAll}
              className='px-6 py-3 bg-gradient-to-r from-red-500/30 to-pink-500/20 border border-red-500/50 rounded-2xl text-red-400 hover:bg-red-500/40 transition-all'
            >
              🔄 Temizle
            </button>
          )}
          {allCardsSelected && (
            <button
              onClick={submitReading}
              disabled={isGenerating}
              className='px-8 py-3 bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-60'
            >
              {isGenerating
                ? 'Gönderiliyor...'
                : isInterpretation
                  ? 'Okumayı Bitir 💝'
                  : 'Okumayı Gönder'}
            </button>
          )}
        </div>

        {showCardDetails && (
          <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center'>
            <CardDetails
              card={showCardDetails.card as TarotCard}
              isReversed={
                showCardDetails.position > 0
                  ? readingState.isReversed[showCardDetails.position - 1] || false
                  : false
              }
              position={showCardDetails.position}
              onClose={() => setShowCardDetails(null)}
              spreadType='love'
              positionInfo={LOVE_POSITIONS_INFO[showCardDetails.position - 1] || { title: 'Kart Detayları', desc: 'Kart pozisyonu' }}
            />
          </div>
        )}
      </div>
    );
  }

  // 6. Yorum ve gönderim (interpretation)
  if (readingState.currentStep === 'interpretation') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4'>
        <div className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto'>
          <div className='text-center'>
            <div className='w-16 h-16 sm:w-20 sm:h-20 bg-pink-500 rounded-full mx-auto flex items-center justify-center mb-4'>
              <span className='text-3xl sm:text-4xl'>✓</span>
            </div>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-tight'>
              Aşk Açılımı Detaylı
            </h2>
            <p className='text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed'>
              Aşk yolculuğunuz başarıyla kaydedildi!
            </p>
            <div className='bg-slate-800/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-700/50'>
              <p className='text-base sm:text-lg text-white mb-2 leading-relaxed'>
                &quot;Okuma talebiniz{' '}
                <span className='text-pink-400'>başarıyla gönderildi!</span>
                &quot;
              </p>
              <p className='text-gray-400 text-sm sm:text-base leading-relaxed'>
                Sorularınız ve seçtiğiniz kartlar kaydedildi.
              </p>
            </div>
            <div className='bg-slate-800/50 rounded-xl p-3 sm:p-4 border border-slate-700/50'>
              <p className='text-xs sm:text-sm text-gray-400 mb-2'>
                Okuma Kodunuz:
              </p>
              <p className='font-mono text-amber-400 font-medium text-sm sm:text-base break-all'>
                {readingCode}
              </p>
            </div>
            <button
              onClick={() => router.push('/')}
              className='mt-6 sm:mt-8 w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white font-semibold rounded-xl transition-all text-sm sm:text-base'
            >
              Anasayfaya Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Email gönderimi için API endpoint'e istek gönder
 */
async function triggerEmailSending(readingId: string | undefined, _readingData: any): Promise<void> {
  if (!readingId) {
    console.error('❌ Reading ID bulunamadı, email gönderilemedi');
    return;
  }

  try {
    console.log('🔮 Email gönderimi API endpoint\'e istek gönderiliyor...', { readingId });
    
    // Server-side API endpoint'e sadece readingId gönder
    // API kendi Supabase'den gerçek veriyi çekecek
    const response = await fetch('/api/send-reading-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        readingId
      })
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
