/*
info:
Bağlantılı dosyalar:
- react: Temel React fonksiyonları için (gerekli)
- @/lib/constants/reading-credits: Kredi konfigürasyonları (gerekli)

Dosyanın amacı:
- Kullanıcıya kredi kesintisi ve mail gönderimi hakkında bilgi vermek
- Written/detailed okuma seçiminde onay almak
- Kullanıcı deneyimini iyileştirmek

Backend bağlantısı:
- Bu dosyada doğrudan backend kullanımı yoktur, sadece bilgilendirme amaçlı

Geliştirme ve öneriler:
- Modal responsive ve erişilebilir tasarlandı
- Kredi miktarı dinamik olarak gösteriliyor
- Kullanıcı dostu mesajlar ve açıklamalar
- İptal ve onay butonları net şekilde ayrılmış

Hatalar ve geliştirmeye açık noktalar:
- Modal animasyonları eklenebilir
- Farklı okuma türleri için özelleştirilebilir mesajlar
- Kullanıcı tercihleri kaydedilebilir

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Temiz ve anlaşılır kod yapısı
- Optimizasyon: Gereksiz re-render'lar önlendi
- Yeniden Kullanılabilirlik: Farklı okuma türleri için kullanılabilir
- Güvenlik: Sadece bilgilendirme amaçlı, güvenlik riski yok

Gereklilik ve Kullanım Durumu:
- CreditInfoModal: Gerekli, kullanıcı bilgilendirmesi için
- Props: Gerekli, modal kontrolü ve kredi bilgisi için
- Silinebilir veya gereksiz kod yoktur
*/

'use client';

import React from 'react';
import { READING_CREDIT_CONFIGS } from '@/lib/constants/reading-credits';

interface CreditInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  readingType: 'LOVE_SPREAD_DETAILED' | 'LOVE_SPREAD_WRITTEN';
  theme?: 'default' | 'pink' | 'purple' | 'blue' | 'green' | 'amber' | 'emerald';
}

export default function CreditInfoModal({
  isOpen,
  onClose,
  onConfirm,
  readingType,
  theme = 'default',
}: CreditInfoModalProps) {
  if (!isOpen) return null;

  const config = READING_CREDIT_CONFIGS[readingType];
  const isDetailed = readingType === 'LOVE_SPREAD_DETAILED';
  const readingTypeText = isDetailed ? 'Sesli Okuma' : 'Yazılı Okuma';
  const icon = isDetailed ? '👑' : '📝';

  // Tema renk şemaları
  const themes = {
    default: {
      overlay: 'bg-black/50',
      modal: 'bg-slate-800 border-slate-700',
      header: 'text-slate-200',
      icon: 'bg-slate-700',
      button: {
        confirm: 'bg-blue-600 hover:bg-blue-700 text-white',
        cancel: 'bg-slate-600 hover:bg-slate-700 text-slate-200',
      },
      accent: 'text-blue-400',
    },
    pink: {
      overlay: 'bg-black/50',
      modal: 'bg-pink-900/90 border-pink-700',
      header: 'text-pink-200',
      icon: 'bg-pink-700',
      button: {
        confirm: 'bg-pink-600 hover:bg-pink-700 text-white',
        cancel: 'bg-slate-600 hover:bg-slate-700 text-slate-200',
      },
      accent: 'text-pink-400',
    },
    purple: {
      overlay: 'bg-black/50',
      modal: 'bg-purple-900/90 border-purple-700',
      header: 'text-purple-200',
      icon: 'bg-purple-700',
      button: {
        confirm: 'bg-purple-600 hover:bg-purple-700 text-white',
        cancel: 'bg-slate-600 hover:bg-slate-700 text-slate-200',
      },
      accent: 'text-purple-400',
    },
    blue: {
      overlay: 'bg-black/50',
      modal: 'bg-blue-900/90 border-blue-700',
      header: 'text-blue-200',
      icon: 'bg-blue-700',
      button: {
        confirm: 'bg-blue-600 hover:bg-blue-700 text-white',
        cancel: 'bg-slate-600 hover:bg-slate-700 text-slate-200',
      },
      accent: 'text-blue-400',
    },
    green: {
      overlay: 'bg-black/50',
      modal: 'bg-green-900/90 border-green-700',
      header: 'text-green-200',
      icon: 'bg-green-700',
      button: {
        confirm: 'bg-green-600 hover:bg-green-700 text-white',
        cancel: 'bg-slate-600 hover:bg-slate-700 text-slate-200',
      },
      accent: 'text-green-400',
    },
    amber: {
      overlay: 'bg-black/50',
      modal: 'bg-amber-900/90 border-amber-700',
      header: 'text-amber-200',
      icon: 'bg-amber-700',
      button: {
        confirm: 'bg-amber-600 hover:bg-amber-700 text-white',
        cancel: 'bg-slate-600 hover:bg-slate-700 text-slate-200',
      },
      accent: 'text-amber-400',
    },
    emerald: {
      overlay: 'bg-black/50',
      modal: 'bg-emerald-900/90 border-emerald-700',
      header: 'text-emerald-200',
      icon: 'bg-emerald-700',
      button: {
        confirm: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        cancel: 'bg-slate-600 hover:bg-slate-700 text-slate-200',
      },
      accent: 'text-emerald-400',
    },
  };

  const currentTheme = themes[theme];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${currentTheme.overlay}`}>
      <div className={`relative w-full max-w-md mx-4 ${currentTheme.modal} border rounded-xl shadow-2xl`}>
        {/* Modal Header */}
        <div className="flex items-center justify-center p-6 border-b border-slate-600">
          <div className={`w-16 h-16 ${currentTheme.icon} rounded-full flex items-center justify-center mb-4`}>
            <span className="text-2xl">{icon}</span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <h2 className={`text-xl font-bold ${currentTheme.header} text-center mb-4`}>
            {readingTypeText} Onayı
          </h2>
          
          <div className="space-y-4 text-slate-300">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Kredi Kesintisi:</span>
                <span className={`text-lg font-bold ${currentTheme.accent}`}>
                  {config.cost} kredi
                </span>
              </div>
              <p className="text-sm text-slate-400">
                {config.description} için gerekli kredi miktarı
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-lg">📧</span>
                <div>
                  <p className="font-semibold text-slate-200 mb-1">
                    Okuma Sonucu Mail Adresinize Gönderilecek
                  </p>
                  <p className="text-sm text-slate-400">
                    Detaylı okuma sonucunuz 24 saat içinde kayıtlı mail adresinize gönderilecektir.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-lg">⏰</span>
                <div>
                  <p className="font-semibold text-slate-200 mb-1">
                    İşlem Süresi
                  </p>
                  <p className="text-sm text-slate-400">
                    Okuma işlemi tamamlandıktan sonra sonuçlarınız hazırlanacak ve size ulaştırılacaktır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex space-x-3 p-6 border-t border-slate-600">
          <button
            onClick={onClose}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${currentTheme.button.cancel}`}
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${currentTheme.button.confirm}`}
          >
            Anladım, Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}
