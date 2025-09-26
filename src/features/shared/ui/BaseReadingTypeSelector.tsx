/*
info:
Bağlantılı dosyalar:
- react: Temel React fonksiyonları için (gerekli)
- @/hooks/useAuth: Kullanıcı oturum ve yetki kontrolü için (gerekli) - YENİ EKLENDİ
- @/hooks/useReadingCredits: Okuma tipi için kredi kontrolü ve yönetimi (gerekli)
- @/constants/reading-credits: Okuma tipine göre kredi miktarları (gerekli)
- components/specific/tarot/3cardtarot/ThreeReadingTypeSelector.tsx: 3 kart açılımı için özelleştirilmiş okuma tipi seçici (gerekli, BaseReadingTypeSelector'ı özelleştirerek kullanır)
- components/specific/tarot/hermit/ReadingTypeSelector.tsx: Hermit açılımı için özelleştirilmiş okuma tipi seçici (gerekli, BaseReadingTypeSelector'ı özelleştirerek kullanır)
- components/specific/tarot/Love-Spread/LoveReadingTypeSelector.tsx: Aşk açılımı için özelleştirilmiş okuma tipi seçici (gerekli, BaseReadingTypeSelector'ı özelleştirerek kullanır)
- components/specific/tarot/CareerTarot/CareerReadingTypeSelector.tsx: Kariyer açılımı için özelleştirilmiş okuma tipi seçici (gerekli, BaseReadingTypeSelector'ı özelleştirerek kullanır)

Dosyanın amacı:
- Tüm tarot açılımları için ortak, mobil uyumlu, temalı ve yeniden kullanılabilir bir okuma tipi (basit/detaylı/yazılı) seçici bileşeni sunmak. Kullanıcı giriş kontrolü, tema ve metin özelleştirmesi ile farklı açılımlarda tekrar eden kodu ortadan kaldırır.

Backend bağlantısı:
- Bu dosyada doğrudan backend kullanımı yoktur. useAuth hook'u üzerinden kullanıcı giriş durumu kontrol edilir. Kredi kontrolü kaldırılmıştır.

Geliştirme ve öneriler:
- Tema sistemi sade ve genişletilebilir, yeni tema eklemek kolay.
- Kullanıcı giriş kontrolü ve mesajlar kullanıcıya net şekilde gösteriliyor.
- Butonlar erişilebilir ve mobil öncelikli tasarlanmış.
- Okuma tipleri, ikonlar ve mesajlar üst bileşenden özelleştirilebiliyor.
- ARIA ve erişilebilirlik için ek özellikler (ör. role, aria-label) eklenebilir.
- Kullanıcı giriş yapmamışsa detailed/written butonları devre dışı oluyor, UX açısından doğru.

Hatalar / Geliştirmeye Açık Noktalar:
- Erişilebilirlik için ek ARIA özellikleri ve klavye ile erişim desteği eklenmeli.
- Butonlar için loading durumu veya async feedback eklenebilir.
- Kodda gereksiz tekrar veya karmaşık yapı yok, fonksiyonlar sade ve amacına uygun.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Kod blokları ve prop isimleri açık, fonksiyonel bileşen yapısı sade.
- Optimizasyon: Tema ve mesajlar nesne olarak tanımlanmış, tekrar yok.
- Yeniden Kullanılabilirlik: Farklı açılım türleri ve okuma tipleri için kolayca kullanılabilir, üst bileşenler tema ve metin ile özelleştirebilir.
- Güvenlik: Sadece görsel arayüz, dışarıdan gelen fonksiyonlar ve veriler üst bileşenlerden gelmeli. useAuth hook'u güvenli şekilde kullanıcı durumunu kontrol eder.

Gereklilik ve Kullanım Durumu:
- BaseReadingTypeSelector: Gerekli, tüm tarot açılımlarında ortak okuma tipi seçici altyapısı olarak kullanılmalı.
- Tema ve mesaj sistemleri: Gerekli, özelleştirilebilirlik ve tekrarın önlenmesi için önemli.
- Kullanıcı giriş kontrolü: Gerekli, detailed/written okumalar için güvenlik sağlar.
- Silinebilir veya gereksiz kod yoktur, sade ve amacına uygun bir altyapı bileşenidir.

Yapılan değişiklikler:
- useAuth hook'u eklendi
- Detailed ve written butonları kullanıcı giriş durumuna göre aktif/pasif yapıldı
- Kullanıcı giriş yapmamışsa uyarı mesajı eklendi
- Buton tooltip'leri giriş durumuna göre güncellendi
*/

'use client';

import React from 'react';
import { CreditStatus } from '@/lib/constants/reading-credits';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuth } from '@/hooks/auth/useAuth';
import { useReadingCredits } from '@/hooks/useReadingCredits';
import { getTheme, type Theme } from '@/lib/theme/theme-config';
// import CreditInfoModal from './CreditInfoModal'; // Archived

interface BaseReadingTypeSelectorProps {
  selectedType: string | null;
  onTypeSelect: (_type: string) => void;
  onCreditInfoClick?: () => void; // Kredi yetersizken tıklama eylemi
  onReadingTypeSelected?: () => void; // Okuma tipi seçildiğinde çağrılacak callback
  readingTypes: {
    SIMPLE: string;
    DETAILED: string;
    WRITTEN: string;
  };
  creditStatus?: CreditStatus; // Prop olarak dışarıdan al
  theme?: Theme;
  disabled?: boolean;
  className?: string;
  simpleText?: string;
  detailedText?: string;
  writtenText?: string;
  simpleIcon?: string;
  detailedIcon?: string;
  writtenIcon?: string;
  noSelectionMessage?: string;
  simpleSelectedMessage?: string;
  detailedSelectedMessage?: string;
  writtenSelectedMessage?: string;
  adminRequiredMessage?: string;
  writtenRequiredMessage?: string;
  readingType: 'LOVE_SPREAD' | 'LOVE_SPREAD_DETAILED' | 'LOVE_SPREAD_WRITTEN' | 'CAREER_SPREAD_DETAILED' | 'CAREER_SPREAD_WRITTEN' | 'PROBLEM_SOLVING_DETAILED' | 'PROBLEM_SOLVING_WRITTEN' | 'SITUATION_ANALYSIS_DETAILED' | 'SITUATION_ANALYSIS_WRITTEN' | 'RELATIONSHIP_ANALYSIS_DETAILED' | 'RELATIONSHIP_ANALYSIS_WRITTEN' | 'RELATIONSHIP_PROBLEMS_DETAILED' | 'RELATIONSHIP_PROBLEMS_WRITTEN' | 'MARRIAGE_DETAILED' | 'MARRIAGE_WRITTEN' | 'NEW_LOVER_DETAILED' | 'NEW_LOVER_WRITTEN' | 'MONEY_SPREAD' | 'MONEY_SPREAD_DETAILED' | 'MONEY_SPREAD_WRITTEN';
}

export default function BaseReadingTypeSelector({
  selectedType,
  onTypeSelect,
  onCreditInfoClick: _onCreditInfoClick,
  onReadingTypeSelected,
  readingTypes,
  creditStatus: _creditStatus, // Prop olarak kullan
  theme = 'default',
  disabled = false,
  className = '',
  simpleText,
  detailedText,
  writtenText,
  simpleIcon = '✨',
  detailedIcon = '👑',
  writtenIcon = '📝',
  noSelectionMessage,
  simpleSelectedMessage,
  detailedSelectedMessage,
  writtenSelectedMessage,
  adminRequiredMessage: _adminRequiredMessage,
  writtenRequiredMessage: _writtenRequiredMessage,
  readingType,
}: BaseReadingTypeSelectorProps) {
  const { t } = useTranslations();
  const { isAuthenticated } = useAuth(); // Kullanıcı giriş durumunu kontrol et

  // Kredi kontrolü - sesli ve yazılı okumalar için
  const detailedReadingType = readingType === 'PROBLEM_SOLVING_DETAILED' 
    ? 'PROBLEM_SOLVING_DETAILED' 
    : readingType === 'CAREER_SPREAD_DETAILED'
    ? 'CAREER_SPREAD_DETAILED'
    : readingType === 'SITUATION_ANALYSIS_DETAILED'
    ? 'SITUATION_ANALYSIS_DETAILED'
    : readingType === 'RELATIONSHIP_ANALYSIS_DETAILED'
    ? 'RELATIONSHIP_ANALYSIS_DETAILED'
    : readingType === 'RELATIONSHIP_PROBLEMS_DETAILED'
    ? 'RELATIONSHIP_PROBLEMS_DETAILED'
    : readingType === 'MARRIAGE_DETAILED'
    ? 'MARRIAGE_DETAILED'
    : readingType === 'NEW_LOVER_DETAILED'
    ? 'NEW_LOVER_DETAILED'
    : readingType === 'MONEY_SPREAD' || readingType === 'MONEY_SPREAD_DETAILED'
    ? 'MONEY_SPREAD_DETAILED'
    : 'LOVE_SPREAD_DETAILED';
    
  const writtenReadingType = readingType === 'PROBLEM_SOLVING_DETAILED' 
    ? 'PROBLEM_SOLVING_WRITTEN' 
    : readingType === 'CAREER_SPREAD_DETAILED'
    ? 'CAREER_SPREAD_WRITTEN'
    : readingType === 'SITUATION_ANALYSIS_DETAILED'
    ? 'SITUATION_ANALYSIS_WRITTEN'
    : readingType === 'RELATIONSHIP_ANALYSIS_DETAILED'
    ? 'RELATIONSHIP_ANALYSIS_WRITTEN'
    : readingType === 'RELATIONSHIP_PROBLEMS_DETAILED'
    ? 'RELATIONSHIP_PROBLEMS_WRITTEN'
    : readingType === 'MARRIAGE_DETAILED'
    ? 'MARRIAGE_WRITTEN'
    : readingType === 'NEW_LOVER_DETAILED'
    ? 'NEW_LOVER_WRITTEN'
    : readingType === 'MONEY_SPREAD' || readingType === 'MONEY_SPREAD_WRITTEN'
    ? 'MONEY_SPREAD_WRITTEN'
    : 'LOVE_SPREAD_WRITTEN';


  const detailedCredits = useReadingCredits(detailedReadingType);
  const writtenCredits = useReadingCredits(writtenReadingType);

  // Modal state'leri
  // const [showCreditInfoModal, setShowCreditInfoModal] = useState(false); // Archived with CreditInfoModal
  // const [pendingReadingType, setPendingReadingType] = useState<string | null>(null); // Archived with CreditInfoModal

  // Varsayılan değerleri i18n'den al
  const defaultSimpleText = simpleText || t('reading.types.simple');
  const defaultDetailedText = detailedText || t('reading.types.detailed');
  const defaultWrittenText = writtenText || t('reading.types.written');
  const defaultNoSelectionMessage =
    noSelectionMessage || t('reading.messages.noSelection');
  const defaultSimpleSelectedMessage =
    simpleSelectedMessage || t('reading.messages.simpleSelected');
  const defaultDetailedSelectedMessage =
    detailedSelectedMessage || t('reading.messages.detailedSelected');
  const defaultWrittenSelectedMessage =
    writtenSelectedMessage || t('reading.messages.writtenSelected');
  // ReadingInfoModal için state'ler - şimdilik kullanılmıyor
  // const [showReadingInfoModal, setShowReadingInfoModal] = useState(false);
  // const [pendingReadingType, setPendingReadingType] = useState<string | null>(null);

  // Kredi kontrolü kaldırıldı - basit yazılı sesli butonlar için

  // Modal onay fonksiyonu
  // const handleModalConfirm = () => { // Archived with CreditInfoModal
  //   setShowCreditInfoModal(false);
  //   if (pendingReadingType) {
  //     onTypeSelect(pendingReadingType);
  //     setPendingReadingType(null);
  //   }
  // };

  // // Modal iptal fonksiyonu
  // const handleModalCancel = () => { // Archived with CreditInfoModal
  //   setShowCreditInfoModal(false);
  //   setPendingReadingType(null);
  // };

  // Sesli/yazılı okuma seçildiğinde çağrılacak fonksiyon
  const handleReadingTypeClick = (type: string) => {
    if (type === readingTypes.DETAILED || type === readingTypes.WRITTEN) {
      // Kullanıcı giriş yapmamışsa butonları devre dışı bırak
      if (!isAuthenticated) {
        return;
      }

      // Kredi kontrolü - sesli ve yazılı okumalar için
      if (
        type === readingTypes.DETAILED &&
        !detailedCredits.creditStatus.hasEnoughCredits
      ) {
        // Kredi yetersiz - kredi bilgi modalını aç
        if (_onCreditInfoClick) {
          _onCreditInfoClick();
        }
        return;
      }

      if (
        type === readingTypes.WRITTEN &&
        !writtenCredits.creditStatus.hasEnoughCredits
      ) {
        // Kredi yetersiz - kredi bilgi modalını aç
        if (_onCreditInfoClick) {
          _onCreditInfoClick();
        }
        return;
      }

      // Kredi yeterli - okuma türünü seç ve akışa devam et
      onTypeSelect(type);
      // Okuma tipi seçildiğinde parent bileşene bildir
      if (onReadingTypeSelected) {
        onReadingTypeSelected();
      }
    } else {
      // Basit okuma için direkt seç
      onTypeSelect(type);
      // Okuma tipi seçildiğinde parent bileşene bildir
      if (onReadingTypeSelected) {
        onReadingTypeSelected();
      }
    }
  };

  // ReadingInfoModal fonksiyonları kaldırıldı - basit yazılı sesli butonlar için

  const currentTheme = getTheme(theme);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`flex flex-wrap justify-center gap-2 sm:gap-3 sm:space-x-0 ${currentTheme.container} border rounded-xl px-2 sm:px-4 py-2 shadow-sm`}
      >
        {/* Basit Okuma - Her zaman açık */}
        <button
          onClick={() => {
            onTypeSelect(readingTypes.SIMPLE);
            // Okuma tipi seçildiğinde parent bileşene bildir
            if (onReadingTypeSelected) {
              onReadingTypeSelected();
            }
          }}
          disabled={disabled}
          className={`px-2 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-150 focus:outline-none focus:ring-2 ${currentTheme.simpleButton.focus} disabled:opacity-50 disabled:cursor-not-allowed
            ${
              selectedType === readingTypes.SIMPLE
                ? currentTheme.simpleButton.selected
                : currentTheme.simpleButton.unselected
            }`}
        >
          <span className='flex items-center space-x-1'>
            <span className='text-sm sm:text-base'>{simpleIcon}</span>
            <span className='hidden sm:inline'>{defaultSimpleText}</span>
            <span className='sm:hidden'>{t('reading.types.simpleShort')}</span>
          </span>
        </button>

        {/* Sesli Okuma - Kullanıcı giriş yapmışsa ve kredi yeterliyse aktif */}
        <button
          onClick={() => handleReadingTypeClick(readingTypes.DETAILED)}
          disabled={
            disabled ||
            !isAuthenticated ||
            !detailedCredits.creditStatus.hasEnoughCredits
          }
          className={`px-2 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-150 focus:outline-none focus:ring-2 ${currentTheme.detailedButton.focus} disabled:opacity-50 disabled:cursor-not-allowed
            ${
              selectedType === readingTypes.DETAILED
                ? currentTheme.detailedButton.selected
                : !isAuthenticated ||
                    !detailedCredits.creditStatus.hasEnoughCredits
                  ? currentTheme.detailedButton.disabled
                  : currentTheme.detailedButton.unselected
            }`}
          title={
            !isAuthenticated
              ? 'Giriş yapın'
              : !detailedCredits.creditStatus.hasEnoughCredits
                ? `Yetersiz kredi (${detailedCredits.creditStatus.requiredCredits} kredi gerekli)`
                : `${defaultDetailedText} - ${t('reading.messages.detailedDescription')} (${detailedCredits.creditStatus.requiredCredits} kredi)`
          }
        >
          <span className='flex items-center space-x-1'>
            <span className='text-sm sm:text-base'>{detailedIcon}</span>
            <span className='hidden sm:inline'>{defaultDetailedText}</span>
            <span className='sm:hidden'>
              {t('reading.types.detailedShort')}
            </span>
            {isAuthenticated && (
              <span className='text-xs opacity-75 ml-1'>
                ({detailedCredits.creditStatus.requiredCredits})
              </span>
            )}
          </span>
        </button>

        {/* Yazılı Okuma - Kullanıcı giriş yapmışsa ve kredi yeterliyse aktif */}
        <button
          onClick={() => handleReadingTypeClick(readingTypes.WRITTEN)}
          disabled={
            disabled ||
            !isAuthenticated ||
            !writtenCredits.creditStatus.hasEnoughCredits
          }
          className={`px-2 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-150 focus:outline-none focus:ring-2 ${currentTheme.detailedButton.focus} disabled:opacity-50 disabled:cursor-not-allowed
            ${
              selectedType === readingTypes.WRITTEN
                ? currentTheme.detailedButton.selected
                : !isAuthenticated ||
                    !writtenCredits.creditStatus.hasEnoughCredits
                  ? currentTheme.detailedButton.disabled
                  : currentTheme.detailedButton.unselected
            }`}
          title={
            !isAuthenticated
              ? 'Giriş yapın'
              : !writtenCredits.creditStatus.hasEnoughCredits
                ? `Yetersiz kredi (${writtenCredits.creditStatus.requiredCredits} kredi gerekli)`
                : `${defaultWrittenText} - ${t('reading.messages.writtenDescription')} (${writtenCredits.creditStatus.requiredCredits} kredi)`
          }
        >
          <span className='flex items-center space-x-1'>
            <span className='text-sm sm:text-base'>{writtenIcon}</span>
            <span className='hidden sm:inline'>{defaultWrittenText}</span>
            <span className='sm:hidden'>{t('reading.types.writtenShort')}</span>
            {isAuthenticated && (
              <span className='text-xs opacity-75 ml-1'>
                ({writtenCredits.creditStatus.requiredCredits})
              </span>
            )}
          </span>
        </button>
      </div>

      <div className='text-center mt-2'>
        {!selectedType && (
          <span className={`text-xs ${currentTheme.messages.noSelection}`}>
            {defaultNoSelectionMessage}
          </span>
        )}
        {selectedType === readingTypes.SIMPLE && (
          <span className={`text-xs ${currentTheme.messages.simple}`}>
            {simpleIcon} {defaultSimpleSelectedMessage}
          </span>
        )}
        {selectedType === readingTypes.DETAILED && (
          <span className={`text-xs ${currentTheme.messages.detailed}`}>
            {detailedIcon} {defaultDetailedSelectedMessage}
          </span>
        )}
        {selectedType === readingTypes.WRITTEN && (
          <span className={`text-xs ${currentTheme.messages.detailed}`}>
            {writtenIcon} {defaultWrittenSelectedMessage}
          </span>
        )}
        {!isAuthenticated && (
          <span className={`text-xs ${currentTheme.messages.adminRequired}`}>
            🔒 Sesli ve yazılı okumalar için giriş yapın
          </span>
        )}
        {isAuthenticated &&
          (!detailedCredits.creditStatus.hasEnoughCredits ||
            !writtenCredits.creditStatus.hasEnoughCredits) && (
            <span className={`text-xs ${currentTheme.messages.adminRequired}`}>
              💳 Sesli okuma: {detailedCredits.creditStatus.requiredCredits}{' '}
              kredi | Yazılı okuma:{' '}
              {writtenCredits.creditStatus.requiredCredits} kredi
            </span>
          )}
      </div>

      {/* CreditInfoModal - kredi bilgilendirmesi için - Archived */}
      {/* {showCreditInfoModal && pendingReadingType && (
        <CreditInfoModal
          isOpen={showCreditInfoModal}
          onClose={handleModalCancel}
          onConfirm={handleModalConfirm}
          readingType={
            pendingReadingType === readingTypes.DETAILED
              ? 'LOVE_SPREAD_DETAILED'
              : 'LOVE_SPREAD_WRITTEN'
          }
          theme={theme}
        />
      )} */}
    </div>
  );
}
