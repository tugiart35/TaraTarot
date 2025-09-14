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
import { useAuth } from '@/hooks/useAuth';
import { useReadingCredits } from '@/hooks/useReadingCredits';
// import CreditInfoModal from './CreditInfoModal'; // Archived

interface BaseReadingTypeSelectorProps {
  selectedType: string | null;
  onTypeSelect: (_type: string) => void;
  onCreditInfoClick?: () => void; // Kredi yetersizken tıklama eylemi
  readingTypes: {
    SIMPLE: string;
    DETAILED: string;
    WRITTEN: string;
  };
  creditStatus?: CreditStatus; // Prop olarak dışarıdan al
  theme?:
    | 'default'
    | 'amber'
    | 'pink'
    | 'purple'
    | 'blue'
    | 'green'
    | 'emerald';
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
  readingType: 'LOVE_SPREAD' | 'LOVE_SPREAD_DETAILED' | 'LOVE_SPREAD_WRITTEN';
}

export default function BaseReadingTypeSelector({
  selectedType,
  onTypeSelect,
  onCreditInfoClick: _onCreditInfoClick,
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
  readingType: _readingType,
}: BaseReadingTypeSelectorProps) {
  const { t } = useTranslations();
  const { isAuthenticated } = useAuth(); // Kullanıcı giriş durumunu kontrol et

  // Kredi kontrolü - sesli ve yazılı okumalar için
  const detailedCredits = useReadingCredits('LOVE_SPREAD_DETAILED');
  const writtenCredits = useReadingCredits('LOVE_SPREAD_WRITTEN');

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

      // Kredi yeterli - bilgilendirme modalını aç
      // setPendingReadingType(type); // Archived with CreditInfoModal
      // setShowCreditInfoModal(true); // Archived with CreditInfoModal
    } else {
      // Basit okuma için direkt seç
      onTypeSelect(type);
    }
  };

  // ReadingInfoModal fonksiyonları kaldırıldı - basit yazılı sesli butonlar için

  // Tema renk şemalarını tanımla
  const themes = {
    default: {
      container: 'bg-slate-800/80 border-slate-700',
      simpleButton: {
        selected: 'bg-blue-500/80 text-white shadow-md',
        unselected: 'bg-slate-700/60 text-blue-200 hover:bg-blue-500/30',
        focus: 'focus:ring-blue-400',
      },
      detailedButton: {
        selected: 'bg-purple-500/80 text-white shadow-md',
        unselected: 'bg-slate-700/60 text-purple-200 hover:bg-purple-500/30',
        focus: 'focus:ring-purple-400',
        disabled: 'bg-slate-800/60 text-gray-400',
      },
      messages: {
        simple: 'text-blue-400',
        detailed: 'text-purple-400',
        adminRequired: 'text-amber-400',
        noSelection: 'text-gray-400',
      },
    },
    amber: {
      container: 'bg-amber-800/80 border-amber-700',
      simpleButton: {
        selected: 'bg-amber-500/80 text-white shadow-md',
        unselected: 'bg-amber-700/60 text-amber-200 hover:bg-amber-500/30',
        focus: 'focus:ring-amber-400',
      },
      detailedButton: {
        selected: 'bg-purple-500/80 text-white shadow-md',
        unselected: 'bg-amber-700/60 text-purple-200 hover:bg-purple-500/30',
        focus: 'focus:ring-purple-400',
        disabled: 'bg-amber-800/60 text-gray-400',
      },
      messages: {
        simple: 'text-amber-400',
        detailed: 'text-purple-400',
        adminRequired: 'text-amber-400',
        noSelection: 'text-gray-400',
      },
    },
    pink: {
      container: 'bg-pink-800/80 border-pink-700',
      simpleButton: {
        selected: 'bg-pink-500/80 text-white shadow-md',
        unselected: 'bg-pink-700/60 text-pink-200 hover:bg-pink-500/30',
        focus: 'focus:ring-pink-400',
      },
      detailedButton: {
        selected: 'bg-purple-500/80 text-white shadow-md',
        unselected: 'bg-pink-700/60 text-purple-200 hover:bg-purple-500/30',
        focus: 'focus:ring-purple-400',
        disabled: 'bg-pink-800/60 text-gray-400',
      },
      messages: {
        simple: 'text-pink-400',
        detailed: 'text-purple-400',
        adminRequired: 'text-amber-400',
        noSelection: 'text-gray-400',
      },
    },
    purple: {
      container: 'bg-purple-800/80 border-purple-700',
      simpleButton: {
        selected: 'bg-purple-500/80 text-white shadow-md',
        unselected: 'bg-purple-700/60 text-purple-200 hover:bg-purple-500/30',
        focus: 'focus:ring-purple-400',
      },
      detailedButton: {
        selected: 'bg-indigo-500/80 text-white shadow-md',
        unselected: 'bg-purple-700/60 text-indigo-200 hover:bg-indigo-500/30',
        focus: 'focus:ring-indigo-400',
        disabled: 'bg-purple-800/60 text-gray-400',
      },
      messages: {
        simple: 'text-purple-400',
        detailed: 'text-indigo-400',
        adminRequired: 'text-amber-400',
        noSelection: 'text-gray-400',
      },
    },
    blue: {
      container: 'bg-blue-800/80 border-blue-700',
      simpleButton: {
        selected: 'bg-blue-500/80 text-white shadow-md',
        unselected: 'bg-blue-700/60 text-blue-200 hover:bg-blue-500/30',
        focus: 'focus:ring-blue-400',
      },
      detailedButton: {
        selected: 'bg-purple-500/80 text-white shadow-md',
        unselected: 'bg-blue-700/60 text-purple-200 hover:bg-purple-500/30',
        focus: 'focus:ring-purple-400',
        disabled: 'bg-blue-800/60 text-gray-400',
      },
      messages: {
        simple: 'text-blue-400',
        detailed: 'text-purple-400',
        adminRequired: 'text-amber-400',
        noSelection: 'text-gray-400',
      },
    },
    green: {
      container: 'bg-green-800/80 border-green-700',
      simpleButton: {
        selected: 'bg-green-500/80 text-white shadow-md',
        unselected: 'bg-green-700/60 text-green-200 hover:bg-green-500/30',
        focus: 'focus:ring-green-400',
      },
      detailedButton: {
        selected: 'bg-purple-500/80 text-white shadow-md',
        unselected: 'bg-green-700/60 text-purple-200 hover:bg-purple-500/30',
        focus: 'focus:ring-purple-400',
        disabled: 'bg-green-800/60 text-gray-400',
      },
      messages: {
        simple: 'text-green-400',
        detailed: 'text-purple-400',
        adminRequired: 'text-amber-400',
        noSelection: 'text-gray-400',
      },
    },
    emerald: {
      container: 'bg-emerald-800/80 border-emerald-700',
      simpleButton: {
        selected: 'bg-emerald-500/80 text-white shadow-md',
        unselected:
          'bg-emerald-700/60 text-emerald-200 hover:bg-emerald-500/30',
        focus: 'focus:ring-emerald-400',
      },
      detailedButton: {
        selected: 'bg-purple-500/80 text-white shadow-md',
        unselected: 'bg-emerald-700/60 text-purple-200 hover:bg-purple-500/30',
        focus: 'focus:ring-purple-400',
        disabled: 'bg-emerald-800/60 text-gray-400',
      },
      messages: {
        simple: 'text-emerald-400',
        detailed: 'text-purple-400',
        adminRequired: 'text-amber-400',
        noSelection: 'text-gray-400',
      },
    },
  };

  const currentTheme = themes[theme];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`flex flex-wrap justify-center gap-2 sm:gap-3 sm:space-x-0 ${currentTheme.container} border rounded-xl px-2 sm:px-4 py-2 shadow-sm`}
      >
        {/* Basit Okuma - Her zaman açık */}
        <button
          onClick={() => onTypeSelect(readingTypes.SIMPLE)}
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
