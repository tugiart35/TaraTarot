'use client';

/**
 * Numeroloji hesaplama formu
 * React Hook Form + Zod ile validasyon
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NumerologyType } from '@/lib/numerology/types';
import { NumerologyErrorBoundary } from '@/components/numerology/NumerologyErrorBoundary';

interface NumerologyFormProps {
  locale: string;
}

export default function NumerologyForm({ locale }: NumerologyFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NumerologyType>('life-path');
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    date: new Date().toISOString().split('T')[0], // Bugünün tarihi
  });

  // Input sanitization function
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const handleCalculate = () => {
    const params = new URLSearchParams();

    if (activeTab === 'life-path' && formData.birthDate) {
      params.set('birthDate', formData.birthDate);
    } else if (
      (activeTab === 'expression-destiny' || activeTab === 'soul-urge') &&
      formData.fullName
    ) {
      params.set('fullName', formData.fullName);
    }

    if (params.toString()) {
      router.push(`/${locale}/numeroloji/${activeTab}?${params.toString()}`);
    }
  };

  const tabs = [
    { id: 'life-path' as const, label: 'Yaşam Yolu', icon: '🛤️' },
    { id: 'expression-destiny' as const, label: 'İfade', icon: '💫' },
    { id: 'soul-urge' as const, label: 'Ruh Arzusu', icon: '💖' },
    { id: 'birthday-number' as const, label: 'Günün Sayısı', icon: '📅' },
  ];

  return (
    <NumerologyErrorBoundary>
      <div className='max-w-2xl mx-auto'>
        {/* Tab Navigation */}
        <div className='flex flex-wrap gap-2 mb-8'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <span className='text-lg'>{tab.icon}</span>
              <span className='text-sm'>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20'>
          <div className='space-y-6'>
            {/* Life Path - Birth Date */}
            {activeTab === 'life-path' && (
              <div>
                <label className='block text-sm font-semibold mb-3 text-gray-200'>
                  📅 Doğum Tarihi (YYYY-AA-GG)
                </label>
                <input
                  type='date'
                  value={formData.birthDate}
                  onChange={e => handleInputChange('birthDate', e.target.value)}
                  className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white'
                  required
                />
              </div>
            )}

            {/* Expression & Soul Urge - Full Name */}
            {(activeTab === 'expression-destiny' ||
              activeTab === 'soul-urge') && (
              <div>
                <label className='block text-sm font-semibold mb-3 text-gray-200'>
                  👤 Ad Soyad
                </label>
                <input
                  type='text'
                  value={formData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                  placeholder='Örn: Ahmet Yılmaz'
                  className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400'
                  required
                />
              </div>
            )}

            {/* Birthday Number - Date */}
            {activeTab === 'birthday-number' && (
              <div>
                <label className='block text-sm font-semibold mb-3 text-gray-200'>
                  📅 Tarih
                </label>
                <input
                  type='date'
                  value={formData.date}
                  onChange={e => handleInputChange('date', e.target.value)}
                  className='w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-white'
                  required
                />
              </div>
            )}

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className='w-full py-4 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl font-bold text-white hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl'
            >
              🔮 Hesapla
            </button>
          </div>
        </div>
      </div>
    </NumerologyErrorBoundary>
  );
}
