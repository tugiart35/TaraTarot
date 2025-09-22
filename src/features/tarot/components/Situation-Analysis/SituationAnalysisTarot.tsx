/*
info:
---
Dosya Amacı:
- Durum Analizi tarot açılımı ana bileşeni
- 7 kartlık özel düzen ile durum analizi
- Kullanıcı kart seçer, pozisyonları yönetir, yorum alır

Bağlı Dosyalar:
- situation-analysis-config.ts (konfigürasyon)
- position-meanings-index.ts (pozisyon anlamları)
- messages/tr.json (çeviriler)

Üretime Hazır mı?:
- Evet, temel yapı hazır, detaylı özellikler eklenebilir
---

*/

'use client';

import { getSituationAnalysisMeaningByCardAndPosition } from '@/features/tarot/lib/situation-analysis/position-meanings-index';
import { useState } from 'react';
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
  SITUATION_ANALYSIS_POSITIONS_INFO,
  SITUATION_ANALYSIS_POSITIONS_LAYOUT,
  SITUATION_ANALYSIS_CARD_COUNT,
} from './situation-analysis-config';

// Okuma tipleri
import { READING_TYPES, ReadingType, TarotCard } from '@/types/tarot';

// Ana bileşenin props'ları
interface SituationAnalysisReadingProps {
  onComplete?: (_cards: TarotCard[], _interpretation: string) => void;
  onPositionChange?: (_title: string) => void;
}

// Ana Durum Analizi Açılımı bileşeni
export default function SituationAnalysisReading({
  onComplete: _onComplete,
  onPositionChange: _onPositionChange,
}: SituationAnalysisReadingProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const { user } = useAuth();
  const situationAnalysisSpread = findSpreadById('situation-analysis-spread');
  
  console.log('🔍 SituationAnalysisReading component loaded:', {
    spread: situationAnalysisSpread,
    user: user?.id,
    translations: !!t
  });

  // Kredi yönetimi
  const detailedCredits = useReadingCredits('SITUATION_ANALYSIS_DETAILED');
  const writtenCredits = useReadingCredits('SITUATION_ANALYSIS_WRITTEN');

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
      cardCount: SITUATION_ANALYSIS_CARD_COUNT,
      positionsInfo: SITUATION_ANALYSIS_POSITIONS_INFO,
    },
    onComplete: (_cards, _interpretation) => {
      // Durum analizi açılımı tamamlandı
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
  const [formErrors] = useState({
    name: '',
    surname: '',
    birthDate: '',
    email: '',
    concern: '',
    understanding: '',
    emotional: '',
    general: '',
  });
  const [isSaving] = useState(false);
  const [showCreditConfirm, setShowCreditConfirm] = useState(false);
  const [detailedFormSaved, setDetailedFormSaved] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isSavingReading, setIsSavingReading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

    if (!situationAnalysisSpread) {
      return (
        <div className='text-red-500'>
          {t('situationAnalysis.errors.configNotFound')}
        </div>
      );
    }

  // Pozisyona özel kart anlamını al
  const getSituationAnalysisCardMeaning = (
    card: TarotCard | null,
    position: number,
    isReversed: boolean
  ): string => {
    if (!card) {
      return '';
    }
    const meaning = getSituationAnalysisMeaningByCardAndPosition(
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
      selectedCards.length !== SITUATION_ANALYSIS_CARD_COUNT ||
      selectedCards.some(c => !c)
    ) {
      return t('situationAnalysis.errors.allCardsRequired');
    }
    let interpretation = `🔍 **${t('situationAnalysis.interpretation.title')}**\n\n`;
    if (userQuestion.trim()) {
      interpretation += `**${t('situationAnalysis.interpretation.dearClient')}** ${t('situationAnalysis.interpretation.personalAnalysis').replace('{question}', userQuestion)}\n\n`;
    }
    SITUATION_ANALYSIS_POSITIONS_INFO.forEach((posInfo, index) => {
      const card = cards[index];
      const reversed = !!isReversed[index];
      if (card) {
        interpretation += `**${posInfo.id}. ${posInfo.title}: ${card.nameTr}** (${reversed ? t('common.reversed') : t('common.upright')})\n*${posInfo.desc}*\n${getSituationAnalysisCardMeaning(card, posInfo.id, reversed)}\n\n`;
      }
    });
    interpretation += `💫 **${t('tarotPage.situationAnalysisSpread.summary')}:**\n"${t('tarotPage.situationAnalysisSpread.summaryText')}"`;
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

        showToast(t('situationAnalysis.messages.simpleReadingCompleted'), 'success');
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
          readingType: 'situation-analysis',
          status: 'completed',
          title: t('situationAnalysis.data.detailedReadingTitle'),
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
          console.log('Durum analizi okuması kaydedildi:', saveResult.id);
          
          // Başarı toast'ını hemen göster
          showToast(t('situationAnalysis.messages.readingSavedSuccessfully'), 'success');
          
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
          showToast(t('situationAnalysis.messages.readingSaveError'), 'error');
        }
        return;
      }
    } catch (error) {
      showToast(t('situationAnalysis.messages.readingSaveError'), 'error');
    } finally {
      setIsSavingReading(false);
    }
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

      const { data: rpcResult, error: rpcError } = await supabase.rpc(
        'fn_create_reading_with_debit',
        {
          p_user_id: user.id,
          p_reading_type: readingData.readingType,
          p_spread_name: t('situationAnalysis.data.spreadName'),
          p_title: readingData.title || t('situationAnalysis.data.defaultTitle'),
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
      
      {/* DURUM ANALİZİ AÇILIMI ANA SAHNESI */}
      <div className='w-full relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-green-900/90 via-slate-900/80 to-emerald-800/80 border border-green-700/60'>
        {/* KARTLAR KİLİTLİ OVERLAY */}
        {selectedReadingType === null && (
          <div className='absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl'>
            <div className='flex flex-col items-center'>
              <div className='w-16 h-16 flex items-center justify-center bg-green-800/70 rounded-full mb-2 shadow-lg'>
                <span className='text-2xl'>🔍</span>
              </div>
              <div className='text-green-200 text-base font-semibold mb-1'>
                {t('reading.messages.cardsLocked')}
              </div>
              <div className='text-green-400 text-sm text-center max-w-xs'>
                {t('reading.messages.selectReadingTypeFirst')}
              </div>
            </div>
          </div>
        )}

        <div className='absolute inset-0 rounded-2xl overflow-hidden'>
          <div
            className='absolute inset-0 bg-gradient-to-br from-green-900/10 via-slate-900/60 to-emerald-900/20 backdrop-blur-[2px]'
            style={{ zIndex: 1 }}
          />
          <Image
            src='/images/bg-3card-tarot.jpg'
            alt='Situation Analysis Tarot Reading background'
            fill
            className='object-cover object-center opacity-60'
            style={{ zIndex: 0 }}
            priority={false}
          />
          <div
            className='absolute inset-0 bg-gradient-to-br from-green-900/80 via-slate-900/10 to-emerald-900/80'
            style={{ zIndex: 2 }}
          />
        </div>

        <div
          className='absolute inset-0 bg-black/30 backdrop-blur-[1.5px] rounded-2xl'
          style={{ zIndex: 4 }}
        />

        <div className='relative z-10 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8'>
          <div className='relative w-full h-full min-h-[400px] xs:min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] xl:min-h-[650px]'>
            {SITUATION_ANALYSIS_POSITIONS_LAYOUT.map((position, idx) => (
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
                  SITUATION_ANALYSIS_POSITIONS_INFO[idx] ?? {
                    title: `Pozisyon ${idx + 1}`,
                    desc: 'Kart pozisyonu',
                  }
                }
                renderCard={(card, props) => (
                  <BaseCardRenderer
                    card={card}
                    theme='green'
                    {...props}
                  />
                )}
                colorScheme='green'
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
            readingType='SITUATION_ANALYSIS_DETAILED'
            theme='green'
            disabled={isSaving}
          />
        </div>
      )}

      {selectedReadingType &&
        currentPosition &&
        currentPosition <= SITUATION_ANALYSIS_CARD_COUNT && (
          <div className='flex justify-center mb-4'>
            <div className='bg-gradient-to-r from-green-600/20 via-slate-500/30 to-emerald-500/20 border border-green-500/50 rounded-2xl px-6 py-3 shadow-lg animate-pulse'>
              <div className='flex items-center space-x-3'>
                <div className='w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center'>
                  <span className='text-green-300 text-sm'>🔍</span>
                </div>
                <div className='text-center'>
                  <div className='text-green-200 font-bold text-lg'>
                    {SITUATION_ANALYSIS_POSITIONS_INFO[currentPosition - 1]?.title ?? ''}
                  </div>
                  <div className='text-gray-300 text-xs'>
                    {SITUATION_ANALYSIS_POSITIONS_INFO[currentPosition - 1]?.desc ?? ''}
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
                showToast(t('situationAnalysis.messages.selectReadingTypeFirst'), 'info');
              }
        }
        onShuffleDeck={shuffleDeck}
        canSelectCards={!!selectedReadingType}
        theme='green'
        renderCard={(card, isUsed, canSelect) => (
          <BaseCardRenderer
            card={card}
            isUsed={isUsed}
            canSelect={canSelect}
            mode='gallery'
            theme='green'
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
            className='px-8 py-3 bg-gradient-to-r from-green-500/30 to-emerald-500/20 border border-green-500/50 rounded-2xl text-green-400 hover:bg-green-500/40 hover:border-green-500/70 transition-all duration-300 font-semibold shadow-md shadow-green-500/10'
          >
            {t('situationAnalysis.form.clearAll')}
          </button>
        </div>
      )}

      {/* Yorum */}
      {selectedCards.filter(c => c !== null).length === SITUATION_ANALYSIS_CARD_COUNT &&
        selectedReadingType && (
          <div ref={interpretationRef} className='space-y-6'>
            <BaseInterpretation
              cards={selectedCards}
              isReversed={isReversed}
              theme='green'
              title={t('situationAnalysis.data.interpretationTitle')}
              icon='🔍'
              badgeText={t('situationAnalysis.data.badgeText')}
              badgeColor='bg-green-500/20 text-green-400'
              positionsInfo={SITUATION_ANALYSIS_POSITIONS_INFO.map((pos, idx) => ({
                id: idx,
                title: pos.title,
                desc: pos.desc,
              }))}
              getPositionSpecificInterpretation={(card, position, isReversed) =>
                getSituationAnalysisCardMeaning(card, position, isReversed)
              }
              getCardMeaning={(card) => {
                const position = selectedCards.findIndex(c => c?.id === card.id) + 1;
                const cardIsReversed = isReversed[position - 1] || false;
                const meaning = getSituationAnalysisMeaningByCardAndPosition(card, position, cardIsReversed);
                return meaning ? {
                  context: meaning.context,
                  keywords: meaning.keywords,
                  upright: meaning.upright,
                  reversed: meaning.reversed
                } : null;
              }}
              showContext={true}
            />

            {/* Okumayı Kaydet Butonu - Sadece DETAILED/WRITTEN için */}
            {(selectedReadingType === READING_TYPES.DETAILED ||
              selectedReadingType === READING_TYPES.WRITTEN) && (
              <div className='flex justify-center mt-8'>
                <button
                  onClick={handleSaveReading}
                  disabled={isSavingReading}
                  className='px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg'
                >
                  {isSavingReading
                    ? t('situationAnalysis.messages.savingReading')
                    : t('situationAnalysis.modals.saveReading')}
                </button>
              </div>
            )}
          </div>
        )}

      {/* Başarı Modal'ı */}
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-gradient-to-br from-green-900/95 to-emerald-900/95 border border-green-500/30 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center'>
            {/* Başarı İkonu */}
            <div className='w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
              <span className='text-3xl'>✅</span>
            </div>

            {/* Başlık */}
            <h2 className='text-2xl font-bold text-green-400 mb-4'>
              {t('situationAnalysis.modals.successTitle')}
            </h2>

            {/* Mesaj */}
            <p className='text-green-200 mb-6 leading-relaxed'>
              {t('situationAnalysis.modals.successMessage')}
            </p>

            {/* Bilgi */}
            <div className='bg-green-800/30 border border-green-500/20 rounded-xl p-4 mb-6'>
              <p className='text-green-300 text-sm'>
                {t('situationAnalysis.modals.redirecting')}
              </p>
            </div>

            {/* Progress Bar */}
            <div className='w-full bg-green-800/30 rounded-full h-2 mb-4'>
              <div className='bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full animate-pulse'></div>
            </div>
            {/* Hızlı yönlendirme bilgisi */}
            <p className='text-green-300 text-xs'>
              {t('situationAnalysis.messages.redirectingToHome')}
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
          <div className='bg-slate-900/95 border border-green-500/30 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-green-500/20 flex-shrink-0'>
              <div className='flex items-center'>
                <div className='w-12 h-12 flex items-center justify-center bg-green-800/70 rounded-full mr-3 shadow-lg'>
                  <span className='text-xl text-green-200'>🔍</span>
                </div>
                <h2 className='text-green-200 text-lg font-semibold'>
                  {t('situationAnalysis.modals.infoTitle')}
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowInfoModal(false);
                  setSelectedReadingType(null);
                }}
                className='text-gray-400 hover:text-green-300 transition-colors p-2 rounded-lg hover:bg-green-500/10'
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
                <div className='bg-green-800/20 border border-green-500/30 rounded-xl p-4'>
                  <h3 className='text-green-200 font-semibold mb-2'>
                    {t('situationAnalysis.modals.aboutSpread')}
                  </h3>
                  <p className='text-gray-300 text-sm leading-relaxed'>
                    {t('situationAnalysis.modals.aboutSpreadText')}
                  </p>
                </div>

                {/* Kart Sayısı */}
                <div className='bg-emerald-800/20 border border-emerald-500/30 rounded-xl p-4'>
                  <h3 className='text-emerald-200 font-semibold mb-2'>
                    {t('situationAnalysis.modals.cardCount')}
                  </h3>
                  <p className='text-gray-300 text-sm leading-relaxed'>
                    {t('situationAnalysis.modals.cardCountText')}
                  </p>
                </div>

                {/* Okuma Türü */}
                <div className='bg-green-800/20 border border-green-500/30 rounded-xl p-4'>
                  <h3 className='text-green-200 font-semibold mb-2'>
                    {selectedReadingType === READING_TYPES.DETAILED
                      ? t('situationAnalysis.modals.detailedReading')
                      : t('situationAnalysis.modals.writtenReading')}
                  </h3>
                  <p className='text-gray-300 text-sm leading-relaxed'>
                    {selectedReadingType === READING_TYPES.DETAILED
                      ? t('situationAnalysis.modals.detailedReadingText')
                      : t('situationAnalysis.modals.writtenReadingText')}
                  </p>
                </div>

                {/* Süreç */}
                <div className='bg-emerald-800/20 border border-emerald-500/30 rounded-xl p-4'>
                  <h3 className='text-emerald-200 font-semibold mb-2'>
                    {t('situationAnalysis.modals.process')}
                  </h3>
                  <div className='space-y-2'>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        1
                      </span>
                      {t('situationAnalysis.modals.step1')}
                    </div>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        2
                      </span>
                      {t('situationAnalysis.modals.step2')}
                    </div>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        3
                      </span>
                      {t('situationAnalysis.modals.step3')}
                    </div>
                    <div className='flex items-center text-gray-300 text-sm'>
                      <span className='w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3'>
                        4
                      </span>
                      {t('situationAnalysis.modals.step4')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='border-t border-green-500/20 p-6 flex-shrink-0'>
              <div className='flex gap-3'>
                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    setSelectedReadingType(null);
                  }}
                  className='flex-1 bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-slate-800'
                >
                  {t('situationAnalysis.modals.cancel')}
                </button>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className='flex-1 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg'
                >
                  {t('situationAnalysis.modals.continue')}
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
                    t('situationAnalysis.messages.formNotSavedConfirm')
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
            <div className='bg-slate-900/95 border border-green-500/30 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col'>
              {/* Modal Header */}
              <div className='flex items-center justify-between p-6 border-b border-green-500/20 flex-shrink-0'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 flex items-center justify-center bg-green-800/70 rounded-full mr-3 shadow-lg'>
                    <span className='text-xl text-green-200'>🔍</span>
                  </div>
                  <h2 className='text-green-200 text-lg font-semibold'>
                    {t('situationAnalysis.form.personalInfo')}
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
                        t('situationAnalysis.messages.formNotSavedConfirm')
                      );
                      if (shouldClose) {
                        setSelectedReadingType(null);
                      }
                    } else {
                      setSelectedReadingType(null);
                    }
                  }}
                  className='text-gray-400 hover:text-green-300 transition-colors p-2 rounded-lg hover:bg-green-500/10'
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
                      <label className='block text-sm font-medium text-green-200 mb-2'>
                        {t('situationAnalysis.form.firstName')} *
                      </label>
                      <input
                        type='text'
                        value={personalInfo.name}
                        onChange={e =>
                          setPersonalInfo(prev => ({ ...prev, name: e.target.value }))
                        }
                        placeholder={t('situationAnalysis.form.firstName')}
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.name
                            ? 'border-red-500'
                            : 'border-green-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-200 text-base`}
                        autoComplete='given-name'
                      />
                      {formErrors.name && (
                        <p className='text-red-400 text-sm mt-1'>{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-green-200 mb-2'>
                        {t('situationAnalysis.form.lastName')} *
                      </label>
                      <input
                        type='text'
                        value={personalInfo.surname}
                        onChange={e =>
                          setPersonalInfo(prev => ({ ...prev, surname: e.target.value }))
                        }
                        placeholder={t('situationAnalysis.form.lastName')}
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.surname
                            ? 'border-red-500'
                            : 'border-green-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-200 text-base`}
                        autoComplete='family-name'
                      />
                      {formErrors.surname && (
                        <p className='text-red-400 text-sm mt-1'>{formErrors.surname}</p>
                      )}
                    </div>
                  </div>

                  {/* Doğum Tarihi */}
                  <div>
                    <label className='block text-sm font-medium text-green-200 mb-2'>
                      {t('situationAnalysis.form.birthDate')} *
                    </label>
                    <input
                      type='date'
                      value={personalInfo.birthDate}
                      onChange={e =>
                        setPersonalInfo(prev => ({ ...prev, birthDate: e.target.value }))
                      }
                      className={`w-full px-4 py-3 bg-slate-800/80 border ${
                        formErrors.birthDate
                          ? 'border-red-500'
                          : 'border-green-400/50'
                      } rounded-xl text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-200 text-base`}
                    />
                    {formErrors.birthDate && (
                      <p className='text-red-400 text-sm mt-1'>{formErrors.birthDate}</p>
                    )}
                  </div>

                  {/* E-posta */}
                  <div>
                    <label className='block text-sm font-medium text-green-200 mb-2'>
                      {t('situationAnalysis.form.email')} *
                    </label>
                    <input
                      type='email'
                      value={personalInfo.email}
                      onChange={e =>
                        setPersonalInfo(prev => ({ ...prev, email: e.target.value }))
                      }
                      placeholder={t('situationAnalysis.form.email')}
                      className={`w-full px-4 py-3 bg-slate-800/80 border ${
                        formErrors.email
                          ? 'border-red-500'
                          : 'border-green-400/50'
                      } rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-200 text-base`}
                      autoComplete='email'
                    />
                    {formErrors.email && (
                      <p className='text-red-400 text-sm mt-1'>{formErrors.email}</p>
                    )}
                  </div>

                  {/* Sorular Bölümü */}
                  <div className='border-t border-green-500/20 pt-4'>
                    <h3 className='text-green-200 text-lg font-semibold mb-4'>
                      {t('situationAnalysis.form.questions')}
                    </h3>

                    {/* Soru 1 */}
                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-green-200 mb-2'>
                        {t('situationAnalysis.form.concernQuestion')} *
                      </label>
                      <textarea
                        value={questions.concern}
                        onChange={e =>
                          setQuestions(prev => ({ ...prev, concern: e.target.value }))
                        }
                        placeholder={t('situationAnalysis.form.concernQuestion')}
                        rows={3}
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.concern
                            ? 'border-red-500'
                            : 'border-green-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-200 text-base resize-none`}
                      />
                      {formErrors.concern && (
                        <p className='text-red-400 text-sm mt-1'>{formErrors.concern}</p>
                      )}
                    </div>

                    {/* Soru 2 */}
                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-green-200 mb-2'>
                        {t('situationAnalysis.form.understandingQuestion')} *
                      </label>
                      <textarea
                        value={questions.understanding}
                        onChange={e =>
                          setQuestions(prev => ({ ...prev, understanding: e.target.value }))
                        }
                        placeholder={t('situationAnalysis.form.understandingQuestion')}
                        rows={3}
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.understanding
                            ? 'border-red-500'
                            : 'border-green-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-200 text-base resize-none`}
                      />
                      {formErrors.understanding && (
                        <p className='text-red-400 text-sm mt-1'>{formErrors.understanding}</p>
                      )}
                    </div>

                    {/* Soru 3 */}
                    <div className='mb-4'>
                      <label className='block text-sm font-medium text-green-200 mb-2'>
                        {t('situationAnalysis.form.emotionalQuestion')} *
                      </label>
                      <textarea
                        value={questions.emotional}
                        onChange={e =>
                          setQuestions(prev => ({ ...prev, emotional: e.target.value }))
                        }
                        placeholder={t('situationAnalysis.form.emotionalQuestion')}
                        rows={3}
                        className={`w-full px-4 py-3 bg-slate-800/80 border ${
                          formErrors.emotional
                            ? 'border-red-500'
                            : 'border-green-400/50'
                        } rounded-xl text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-200 text-base resize-none`}
                      />
                      {formErrors.emotional && (
                        <p className='text-red-400 text-sm mt-1'>{formErrors.emotional}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className='border-t border-green-500/20 p-6 flex-shrink-0'>
                <button
                  onClick={() => setShowCreditConfirm(true)}
                  disabled={isSaving}
                  className='w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg'
                >
                  {isSaving
                    ? t('situationAnalysis.form.saving')
                    : t('situationAnalysis.form.saveAndOpen')}
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Kredi Onay Modal'ı */}
      {showCreditConfirm && (
        <div className='fixed inset-0 z-50 bg-black/60 flex items-center justify-center'>
          <div className='bg-slate-900 border border-green-500/40 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4'>
            <h2 className='text-xl font-bold text-green-400 mb-4 text-center'>
              {t('situationAnalysis.modals.creditConfirm')}
            </h2>
            <p className='text-gray-200 text-center mb-6'>
              {t('situationAnalysis.modals.creditConfirmMessage')}
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={() => {
                  // Form kaydetme işlemi burada yapılacak
                  setDetailedFormSaved(true);
                  setShowCreditConfirm(false);
                }}
                disabled={isSaving}
                className='bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60'
              >
                {isSaving
                  ? t('situationAnalysis.modals.processing')
                  : t('situationAnalysis.modals.confirm')}
              </button>
              <button
                onClick={() => setShowCreditConfirm(false)}
                disabled={isSaving}
                className='bg-slate-700 border border-slate-600 text-gray-300 font-semibold py-2 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-60'
              >
                {t('situationAnalysis.modals.cancel')}
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
          spreadType='situation-analysis'
          positionInfo={(() => {
            const idx = selectedCards.findIndex(
              (c: TarotCard | null) => c && c.id === showCardDetails.id
            );
            const p = SITUATION_ANALYSIS_POSITIONS_INFO[idx];
            return p
              ? { title: p.title, desc: p.desc }
              : { title: `Pozisyon ${idx + 1}`, desc: 'Kart pozisyonu' };
          })()}
        />
      )}
    </div>
  );
}