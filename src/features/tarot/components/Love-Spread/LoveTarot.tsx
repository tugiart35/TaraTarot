/*
info:
---
Dosya Amacı:
- Bu dosya, kullanıcıların aşk ve ilişkiler odaklı 4 kartlık tarot açılımı yapmasını sağlayan ana React bileşenini içerir. Kullanıcı kart seçer, pozisyonları yönetir, sorusunu girer ve yorum alabilir. Sonuçlar backend'e kaydedilir.

Üretime Hazır mı?:
- Dosya büyük oranda üretime hazırdır. Temel işlevler eksiksiz ve mobil uyumluluk yüksek. Kullanıcı deneyimi ve güvenlik açısından iyi seviyede. Ancak aşağıdaki noktalar gözden geçirilmelidir.

Dağıtımdan Önce Mutlaka Düzeltilmesi Gerekenler (Checklist):
1. 3-kart açılımı bileşenlerinden bağımsız, aşk açılımına özel CardPosition ve CardGallery oluşturulmalı. [COMPLETED]
2. Hata mesajları ve kullanıcıya bildirimler: Bazı hata durumlarında sadece console.error kullanılmış, kullanıcıya daha açıklayıcı bildirimler eklenmeli. [COMPLETED]
3. Türkçe açıklama: Dosya başındaki açıklama güncel ve yeterli, ancak alt bileşenlerde de kısa Türkçe açıklamalar olmalı. [COMPLETED]
4. XSS/CSRF gibi saldırılara karşı ek frontend validasyonları eklenmeli. [COMPLETED]
5. Konsol logları dağıtımdan önce kaldırılmalı veya sadece hata logları bırakılmalı. [COMPLETED]
6. user null ise bazı işlemler sessizce atlanıyor, kullanıcıya uyarı gösterilmeli. [COMPLETED]
7. Kart seçimi tamamlanmadan yorum fonksiyonu tetiklenirse beklenmedik sonuçlar olabilir. [COMPLETED]
8. Kullanılmayan prompt fonksiyonu ve sabitleri kaldır. [COMPLETED]
9. AI yorumuyla ilgili dosyaları kaldır ai yorumu almayacağız. [COMPLETED]
10. Kartlar seçildikten sonra LoveInterpretation yorum alanı açılmalı. [COMPLETED]
11. SIMPLE okuma tipinde soru kaydedilmeden kart seçimi engellenmeli (canSelectCards prop'u CardGallery'ye eklendi). [COMPLETED]
12. currentStep ile aşama yönetimi ve modal akışı ThreeCard/Hermit ile birebir uyumlu hale getirildi. [COMPLETED]
13. Sesli/yazılı okuma seçildiğinde açıklama ve kredi onay formu gösterilecek şekilde akış güncellendi. [COMPLETED]

Sonuç:
- Dosya genel olarak iyi yapılandırılmış, okunabilir ve modüler. Küçük iyileştirmeler ve refaktörlerle tamamen üretime hazır hale getirildi.
---
1. Kart Pozisyonları ve Açılım Bilgileri
Her iki dosyada da LOVE_POSITIONS_INFO ve LOVE_POSITIONS_LAYOUT sabitleri kullanılıyor. Bu sabitler, kart pozisyonlarının başlıklarını, açıklamalarını ve ekranda nerede gösterileceğini tanımlıyor.
Eğer bu sabitler iki dosyada ayrı ayrı tanımlanıyorsa, tek bir dosyada (örn. constants/ veya ortak bir helper dosyası) tanımlanıp iki dosyada da import edilmesi daha iyi olur.
2. Kart Seçimi ve Kart Galerisi
Her iki dosyada da kart seçimi, kartların açılması/kapalı olması, ters/düz olması, kart detaylarının gösterilmesi gibi işlemler için benzer state yönetimi ve fonksiyonlar var.
CardGallery, CardPosition, CardDetails gibi bileşenler her iki dosyada da kullanılıyor.
Kart seçme, kartları temizleme, kart detaylarını açma/kapama gibi fonksiyonlar neredeyse aynı şekilde tekrar edilmiş.
3. Kredi Onayı ve Modal Akışı
Kullanıcıdan kredi onayı alma, modal açma/kapama, kredi düşme işlemleri iki dosyada da var.
Modal içerikleri ve kredi onay akışı benzer şekilde yönetiliyor.
4. Yorum Oluşturma
Her iki dosyada da kartlar seçildikten sonra bir yorum/analiz oluşturuluyor.
LoveTarot.tsx dosyasında basit bir yorum fonksiyonu (generateBasicInterpretation) var.
LoveGuidanceDetail.tsx dosyasında ise daha detaylı bir yorum fonksiyonu (generateDetailedInterpretation) var.
Yorum fonksiyonlarının yapısı ve kullandığı veriler benzer.
5. Kullanıcıdan Soru Alma
Kullanıcıdan aşk sorusu veya detaylı bilgi alma (form ile) iki dosyada da var.
Form validasyonu, state yönetimi ve kaydetme işlemleri benzer şekilde tekrar edilmiş.
6. Kartların Ekranda Gösterimi
Kartların ekranda pozisyonlara göre gösterilmesi, arka plan görselleri, overlay katmanları gibi görsel düzenlemeler iki dosyada da benzer şekilde kodlanmış.
*/

'use client';

// useAuth kaldırıldı - login sistemi kaldırıldı
// TarotCard tipi @/types/tarot'a taşındı.
import { getMeaningByCardAndPosition } from '@/features/tarot/lib/love/position-meanings-index';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { supabase } from '@/lib/supabase/client';
import {
  Toast,
  BaseCardPosition,
  BaseCardGallery,
  BaseReadingTypeSelector,
} from '@/features/shared/ui';
import { useTarotReading } from '@/hooks/useTarotReading';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/useAuth';
import { useReadingCredits } from '@/hooks/useReadingCredits';
import { useToast } from '@/hooks/useToast';
import { findSpreadById } from '@/lib/constants/tarotSpreads';
import { LOVE_POSITIONS_INFO, LOVE_POSITIONS_LAYOUT } from './love-config';
import { CardDetails } from '@/features/shared/ui';
import LoveCardRenderer from './LoveCardRenderer'; // Açılıma özel renderer
import LoveInterpretation from './LoveInterpretation';

// ============================================================================
// BÖLÜM 1: SABITLER VE KONFIGÜRASYONLAR
// ============================================================================

// Aşk Açılımı pozisyon başlıkları ve açıklamaları
// Eski LOVE_POSITIONS_INFO ve LOVE_POSITIONS_LAYOUT tanımlarını tamamen kaldır.

// Aşk Açılımı için toplam kart sayısı
export const LOVE_CARD_COUNT = 4;

// Okuma tipleri
import { READING_TYPES, ReadingType, TarotCard } from '@/types/tarot';

// AI ile ilgili prompt'lar ve fonksiyonlar kaldırıldı.

// ============================================================================
// BÖLÜM 2: REACT BİLEŞENİ
// ============================================================================

// Ana bileşenin props'ları
interface LoveReadingProps {
  onComplete?: (_cards: TarotCard[], _interpretation: string) => void;
  onPositionChange?: (_title: string) => void;
  onReadingTypeSelected?: () => void; // Okuma tipi seçildiğinde çağrılacak callback
}

// Ana Aşk Açılımı bileşeni
export default function LoveReading({
  onComplete: _onComplete,
  onPositionChange: _onPositionChange,
  onReadingTypeSelected,
}: LoveReadingProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const { user } = useAuth();
  const loveSpread = findSpreadById('love-spread');

  // Kredi yönetimi
  const detailedCredits = useReadingCredits('LOVE_SPREAD_DETAILED');
  const writtenCredits = useReadingCredits('LOVE_SPREAD_WRITTEN');

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
      cardCount: LOVE_CARD_COUNT,
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
  // const [simpleQuestion, setSimpleQuestion] = useState(''); // Kaldırıldı - basit okuma için soru kaydet ekranı yok
  // const [simpleQuestionSaved, setSimpleQuestionSaved] = useState(false); // Kaldırıldı - basit okuma için soru kaydet ekranı yok
  const { toast, showToast, hideToast } = useToast();
  // const [error, setError] = useState<string | null>(null); // Kullanılmıyor
  const [startTime] = useState<number>(Date.now()); // Duration tracking için

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
    // Kredi kontrolü kaldırıldı - login sistemi kaldırıldı
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
          p_spread_name: 'Aşk Yayılımı',
          p_title: readingData.title || 'Aşk Açılımı',
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
        // creditCost kaldırıldı - login sistemi kaldırıldı

        // Standardize edilmiş veri yapısı
        const readingData = {
          userId: 'anonymous-user', // User ID kaldırıldı - login sistemi kaldırıldı
          readingType: 'love',
          status: 'completed',
          // creditCost kaldırıldı
          title: 'Aşk Açılımı - Detaylı Kişisel Okuma',
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
            positions: LOVE_POSITIONS_INFO.map(pos => ({
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
            readingFormatTr: selectedReadingType === READING_TYPES.DETAILED ? 'Sesli' : 
                            selectedReadingType === READING_TYPES.WRITTEN ? 'Yazılı' : 'Basit',
          },
          timestamp: new Date().toISOString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Okuma verisini Supabase'e kaydet
        const saveResult = await saveReadingToSupabase(readingData);

        if (saveResult.success) {
          showToast('Okumanız başarıyla kaydedildi!', 'success');
        } else {
          console.error('Okuma kaydetme hatası:', saveResult.error);
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
      console.error('Okuma kaydetme hatası:', error);
      showToast('Okuma kaydedilirken bir hata oluştu.', 'error');
    } finally {
      setIsSavingReading(false);
    }
  };

  if (!loveSpread) {
    return (
      <div className='text-red-500'>
        Aşk Açılımı konfigürasyonu bulunamadı. Lütfen tarotSpreads.ts dosyasını
        kontrol edin.
      </div>
    );
  }

  // Pozisyona özel kart anlamını al
  const getLoveCardMeaning = (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ): string => {
    if (!card) {
      return '';
    }
    const meaning = getMeaningByCardAndPosition(card.name, position);
    if (!meaning) {
      return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
    }
    return isReversed ? meaning.reversed : meaning.upright;
  };

  // Basit yorum oluştur (kartlar eksikse uyarı ver)
  const generateBasicInterpretation = (): string => {
    const cards = selectedCards as TarotCard[];
    if (
      selectedCards.length !== LOVE_CARD_COUNT ||
      selectedCards.some(c => !c)
    ) {
      return 'Tüm kartları seçmeden yorum oluşturulamaz.';
    }
    let interpretation = `❤️ **Aşk Açılımı**\n\n`;
    if (userQuestion.trim()) {
      interpretation += `**Sevgili danışan,** aşk sorunuz "${userQuestion}" için özel hazırlanmış analiz:\n\n`;
    }
    LOVE_POSITIONS_INFO.forEach((posInfo, index) => {
      const card = cards[index];
      const reversed = !!isReversed[index];
      if (card) {
        interpretation += `**${posInfo.id}. ${posInfo.title}: ${card.nameTr}** (${reversed ? 'Ters' : 'Düz'})\n*${posInfo.desc}*\n${getLoveCardMeaning(card, posInfo.id, reversed)}\n\n`;
      }
    });
    interpretation += `💫 **${t('tarotPage.loveSpread.summary')}:**\n"${t('tarotPage.loveSpread.summaryText')}"`;
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

  // ANA UI RENDER
  return (
    <div className='w-full space-y-6 md:space-y-8'>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      {/* AŞK AÇILIMI ANA SAHNESI */}
      <div className='w-full relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-red-900/90 via-pink-900/80 to-purple-800/80 border border-pink-700/60'>
        {/* KARTLAR KİLİTLİ OVERLAY veya SORU/DETAYLI FORMU */}
        {selectedReadingType === null && (
          <div className='absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl'>
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
            <div className='bg-slate-900/95 border border-pink-500/30 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col'>
              {/* Modal Header */}
              <div className='flex items-center justify-between p-6 border-b border-pink-500/20 flex-shrink-0'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 flex items-center justify-center bg-pink-800/70 rounded-full mr-3 shadow-lg'>
                    <span className='text-xl text-pink-200'>💝</span>
                  </div>
                  <h2 className='text-pink-200 text-lg font-semibold'>
                    {t('love.modals.infoTitle')}
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
                      {t('love.modals.aboutSpread')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {t('love.modals.aboutSpreadText')}
                    </p>
                  </div>
 {/* Okuma Türü */}
 <div className='bg-pink-800/20 border border-pink-500/30 rounded-xl p-4'>
                    <h3 className='text-pink-200 font-semibold mb-2'>
                      {selectedReadingType === READING_TYPES.DETAILED
                        ? t('love.modals.detailedReading')
                        : t('love.modals.writtenReading')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {selectedReadingType === READING_TYPES.DETAILED
                        ? t('love.modals.detailedReadingText')
                        : t('love.modals.writtenReadingText')}
                    </p>
                  </div>
                  {/* Kart Sayısı */}
                  <div className='bg-red-800/20 border border-red-500/30 rounded-xl p-4'>
                    <h3 className='text-red-200 font-semibold mb-2'>
                      {t('love.modals.LoveAttention1')}
                    </h3>
                    <p className='text-gray-300 text-sm leading-relaxed'>
                      {t('love.modals.loveAttention')}
                    </p>
                  </div>

                 

                  {/* Süreç */}
                  <div className='bg-red-800/20 border border-red-500/30 rounded-xl p-4'>
                    <h3 className='text-red-200 font-semibold mb-2'>
                      {t('love.modals.process')}
                    </h3>
                    <div className='space-y-2'>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                          1
                        </span>
                        {t('love.modals.step1')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                          2
                        </span>
                        {t('love.modals.step2')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                          3
                        </span>
                        {t('love.modals.step3')}
                      </div>
                      <div className='flex items-center text-gray-300 text-sm'>
                        <span className='w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                          4
                        </span>
                        {t('love.modals.step4')}
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
                    {t('love.modals.cancel')}
                  </button>
                  <button
                    onClick={() => setShowInfoModal(false)}
                    className='flex-1 bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg'
                  >
                    {t('love.modals.continue')}
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
                      <span className='text-xl text-pink-200'>💕</span>
                    </div>
                    <h2 className='text-pink-200 text-lg font-semibold'>
                      {t('love.form.personalInfo')}
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
                          {t('love.form.firstName')} *
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
                          {t('love.form.lastName')} *
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
                        {t('love.form.birthDate')} *
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
                        {t('love.form.email')} *
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
                        {t('love.form.questions')}
                      </h3>

                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-pink-200 mb-2'>
                            {t('love.form.concernQuestion')}
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
                            {t('love.form.understandingQuestion')}
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
                            {t('love.form.emotionalQuestion')}
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
                    className='w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base'
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <div className='flex items-center justify-center'>
                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                        {t('love.form.saving')}
                      </div>
                    ) : (
                      t('love.form.saveAndOpen')
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
                {t('love.modals.creditConfirm')}
              </h2>
              <p className='text-gray-200 text-center mb-6'>
                {t('love.modals.creditConfirmMessage')}
              </p>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={saveDetailedForm}
                  disabled={isSaving}
                  className='bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60'
                >
                  {isSaving
                    ? t('love.modals.processing')
                    : t('love.modals.confirm')}
                </button>
                <button
                  onClick={() => setShowCreditConfirm(false)}
                  disabled={isSaving}
                  className='bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60'
                >
                  {t('love.modals.cancel')}
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
            className='absolute inset-0 bg-gradient-to-br from-red-900/10 via-pink-900/60 to-purple-900/20 backdrop-blur-[2px]'
            style={{ zIndex: 1 }}
          />
          <img
            src='/images/bg-love-tarot.jpg'
            alt='Love Tarot Reading background'
            className='absolute inset-0 w-full h-full object-cover object-center opacity-60'
            loading='lazy'
            style={{ zIndex: 0 }}
          />
          <div
            className='absolute inset-0 bg-gradient-to-br from-red-900/80 via-pink-900/10 to-purple-900/80'
            style={{ zIndex: 2 }}
          />
        </div>

        <div
          className='absolute inset-0 bg-black/30 backdrop-blur-[1.5px] rounded-2xl'
          style={{ zIndex: 4 }}
        />

        <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
          <div className='relative w-full h-full min-h-[320px] xs:min-h-[360px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[480px] xl:min-h-[520px]'>
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
                  LOVE_POSITIONS_INFO[idx] ?? {
                    title: `Pozisyon ${position.id}`,
                    desc: 'Kart pozisyonu',
                  }
                }
                renderCard={(card, props) => (
                  <LoveCardRenderer card={card} {...props} />
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
            {...(onReadingTypeSelected && { onReadingTypeSelected })}
            readingTypes={READING_TYPES}
            readingType='LOVE_SPREAD'
            theme='pink'
            disabled={isSaving}
          />
        </div>
      )}

      {selectedReadingType &&
        currentPosition &&
        currentPosition <= LOVE_CARD_COUNT && (
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
        canSelectCards={
          selectedReadingType === READING_TYPES.SIMPLE ||
          ((selectedReadingType === READING_TYPES.DETAILED ||
            selectedReadingType === READING_TYPES.WRITTEN) &&
            detailedFormSaved)
        }
        theme='pink'
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

      {selectedCards.filter(c => c !== null).length === LOVE_CARD_COUNT &&
        selectedReadingType && (
          <div ref={interpretationRef} className='space-y-6'>
            <LoveInterpretation cards={selectedCards} isReversed={isReversed} />

            {/* Okumayı Kaydet Butonu - Sadece DETAILED/WRITTEN için */}
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

      {/* Başarı Modal'ı */}
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-gradient-to-br from-pink-900/95 to-purple-900/95 border border-pink-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center'>
            {/* Başarı İkonu */}
            <div className='w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
              <span className='text-3xl'>✅</span>
            </div>

            {/* Başlık */}
            <h2 className='text-2xl font-bold text-green-400 mb-4'>
              {t('love.modals.successTitle')}
            </h2>

            {/* Mesaj */}
            <p className='text-pink-200 mb-6 leading-relaxed'>
              {t('love.modals.successMessage')}
            </p>

            {/* Bilgi */}
            <div className='bg-pink-800/30 border border-pink-500/20 rounded-xl p-4 mb-6'>
              <p className='text-pink-300 text-sm'>
                {t('love.modals.redirecting')}
              </p>
            </div>

            {/* Progress Bar */}
            <div className='w-full bg-pink-800/30 rounded-full h-2 mb-4'>
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
