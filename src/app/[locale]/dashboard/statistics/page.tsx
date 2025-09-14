/*
info:
Bağlantılı dosyalar:
- @/hooks/useAuth: Kullanıcı kimlik doğrulama için (gerekli)
- @/lib/supabase/client: Supabase bağlantısı için (gerekli)
- @/lib/constants/reading-credits: Kredi yapılandırması için (gerekli)
- lucide-react: İkonlar için (gerekli)

Dosyanın amacı:
- Kullanıcı istatistikleri ve numeroloji analizi sayfası
- Tarot okuma istatistikleri (toplam, aylık, favori dizilim)
- Kredi harcama analizi ve trend analizi
- Numeroloji hesaplamaları (yaşam yolu, kişisel yıl)
- Günlük/aylık rehberlik ve içgörüler

Supabase değişkenleri ve tabloları:
- readings tablosu: Okuma geçmişi (reading_type, cost_credits, created_at)
- profiles tablosu: Kullanıcı profil bilgileri (birth_date)
- transactions tablosu: Kredi işlem geçmişi

Geliştirme önerileri:
- Grafik görselleştirme eklendi (Chart.js veya Recharts)
- Daha detaylı trend analizi
- Export özelliği
- Desen analizi sekmesi geliştirildi
- Responsive tasarım iyileştirildi

Tespit edilen hatalar:
- ✅ Tablo adı düzeltildi (tarot_readings → readings)
- ✅ Loading state düzeltildi
- ✅ Performans optimizasyonu yapıldı
- ✅ Hata yönetimi güçlendirildi

Kullanım durumu:
- ✅ Aktif ve çalışır durumda
- ✅ Supabase ile tam entegrasyon
- ✅ Kullanıcı özgü istatistikler
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from '@/hooks/useTranslations';
import { BottomNavigation } from '@/features/shared/layout';
import {
  Star,
  Hash,
  Calendar,
  TrendingUp,
  BarChart3,
  Activity,
  PieChart,
  LineChart,
  RefreshCw,
  Award,
  Target,
  Heart,
  User,
  Sparkles,
  Clock,
  Shield,
  Crown,
  Gem,
  Eye,
  BookOpen,
  Coins,
  Zap,
} from 'lucide-react';
import { READING_CREDIT_CONFIGS } from '@/lib/constants/reading-credits';
import {
  calculateLifePath,
  calculateExpressionDestiny,
  calculateSoulUrge,
  calculatePersonality,
  calculateBirthdayNumber,
  calculateMaturity,
  calculatePinnaclesChallenges,
  calculatePersonalCycles,
} from '@/lib/numerology/calculators';
import type { NumerologyResult } from '@/lib/numerology/types';

interface UserStats {
  totalReadings: number;
  thisMonth: number;
  lastMonth: number;
  favoriteSpread: string;
  mostActiveDay: string;
  averagePerMonth: number;
  totalCreditsSpent: number;
  thisMonthSpent: number;
  lastMonthSpent: number;
  averagePerReading: number;
  mostExpensiveReading: number;
  readingTypes: Record<string, number>;
  monthlyData: Array<{ month: string; readings: number; credits: number }>;
  weeklyData: Array<{ day: string; readings: number }>;
  streakDays: number;
  longestStreak: number;
}

interface NumerologyInsights {
  lifePath: NumerologyResult;
  expressionDestiny: NumerologyResult;
  soulUrge: NumerologyResult;
  personality: NumerologyResult;
  birthdayNumber: NumerologyResult;
  maturity: NumerologyResult;
  pinnaclesChallenges: NumerologyResult;
  personalCycles: NumerologyResult;
  userProfile: {
    fullName: string;
    birthDate: string;
  };
}

export default function StatisticsPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { t } = useTranslations();
  const router = useRouter();

  // Pathname'den locale'i çıkar
  const pathname = window.location.pathname;
  const locale = pathname.split('/')[1] || 'tr';

  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [numerologyInsights, setNumerologyInsights] =
    useState<NumerologyInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'numerology' | 'patterns'
  >('overview');

  // Auth kontrolü
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.replace(`/${locale}/auth`);
        return;
      }
      fetchUserStats();
      fetchNumerologyInsights();
    }
  }, [authLoading, isAuthenticated, router, locale]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      // Tek sorguda tüm verileri al - performans için
      const { data: allReadings, error } = await supabase
        .from('readings')
        .select('reading_type, cost_credits, created_at, spread_name, title')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching readings:', error);
        return;
      }

      if (!allReadings || allReadings.length === 0) {
        // Hiç okuma yoksa varsayılan değerler
        setUserStats({
          totalReadings: 0,
          thisMonth: 0,
          lastMonth: 0,
          favoriteSpread: 'Henüz yok',
          mostActiveDay: 'Henüz yok',
          averagePerMonth: 0,
          totalCreditsSpent: 0,
          thisMonthSpent: 0,
          lastMonthSpent: 0,
          averagePerReading: 0,
          mostExpensiveReading: 0,
          readingTypes: {},
          monthlyData: [],
          weeklyData: [],
          streakDays: 0,
          longestStreak: 0,
        });
        return;
      }

      // Bu ayın başlangıcı
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      // Geçen ayın başlangıcı
      const startOfLastMonth = new Date();
      startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
      startOfLastMonth.setDate(1);
      startOfLastMonth.setHours(0, 0, 0, 0);

      // Toplam okuma sayısı
      const totalReadings = allReadings.length;

      // Bu ayki okuma sayısı
      const thisMonth = allReadings.filter(
        reading => new Date(reading.created_at) >= startOfMonth
      ).length;

      // Geçen ayki okuma sayısı
      const lastMonth = allReadings.filter(reading => {
        const readingDate = new Date(reading.created_at);
        return readingDate >= startOfLastMonth && readingDate < startOfMonth;
      }).length;

      // Kredi hesaplama fonksiyonu
      const getCreditCost = (
        readingType: string,
        costCredits?: number
      ): number => {
        if (costCredits) return costCredits;

        switch (readingType) {
          case 'LOVE_SPREAD_DETAILED':
            return READING_CREDIT_CONFIGS.LOVE_SPREAD_DETAILED.cost;
          case 'LOVE_SPREAD_WRITTEN':
            return READING_CREDIT_CONFIGS.LOVE_SPREAD_WRITTEN.cost;
          default:
            return 50; // Fallback - yazılı okuma varsayılan
        }
      };

      // Okuma türleri analizi
      const readingTypes: Record<string, number> = {};
      const spreadCounts: Record<string, number> = {};

      allReadings.forEach(reading => {
        const readingType = reading.reading_type || 'Bilinmeyen';
        const spreadName =
          reading.spread_name || reading.reading_type || 'Bilinmeyen';

        readingTypes[readingType] = (readingTypes[readingType] || 0) + 1;
        spreadCounts[spreadName] = (spreadCounts[spreadName] || 0) + 1;
      });

      const favoriteSpread =
        Object.entries(spreadCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
        'Henüz yok';

      // En aktif gün
      const dayCounts: Record<string, number> = {};
      allReadings.forEach(reading => {
        const day = new Date(reading.created_at).toLocaleDateString('tr-TR', {
          weekday: 'long',
        });
        dayCounts[day] = (dayCounts[day] || 0) + 1;
      });

      const mostActiveDay =
        Object.entries(dayCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
        'Henüz yok';

      // Kredi hesaplamaları
      const totalCreditsSpent = allReadings.reduce(
        (sum, reading) =>
          sum + getCreditCost(reading.reading_type, reading.cost_credits),
        0
      );

      const thisMonthSpent = allReadings
        .filter(reading => new Date(reading.created_at) >= startOfMonth)
        .reduce(
          (sum, reading) =>
            sum + getCreditCost(reading.reading_type, reading.cost_credits),
          0
        );

      const lastMonthSpent = allReadings
        .filter(reading => {
          const readingDate = new Date(reading.created_at);
          return readingDate >= startOfLastMonth && readingDate < startOfMonth;
        })
        .reduce(
          (sum, reading) =>
            sum + getCreditCost(reading.reading_type, reading.cost_credits),
          0
        );

      const averagePerReading = totalReadings
        ? totalCreditsSpent / totalReadings
        : 0;
      const mostExpensiveReading = allReadings.reduce(
        (max, reading) =>
          Math.max(
            max,
            getCreditCost(reading.reading_type, reading.cost_credits)
          ),
        0
      );

      // Aylık veri analizi (son 6 ay)
      const monthlyData = [];
      for (let i = 5; i >= 0; i--) {
        const monthStart = new Date();
        monthStart.setMonth(monthStart.getMonth() - i);
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);

        const monthEnd = new Date(monthStart);
        monthEnd.setMonth(monthEnd.getMonth() + 1);

        const monthReadings = allReadings.filter(reading => {
          const readingDate = new Date(reading.created_at);
          return readingDate >= monthStart && readingDate < monthEnd;
        });

        const monthCredits = monthReadings.reduce(
          (sum, reading) =>
            sum + getCreditCost(reading.reading_type, reading.cost_credits),
          0
        );

        monthlyData.push({
          month: monthStart.toLocaleDateString('tr-TR', {
            month: 'short',
            year: 'numeric',
          }),
          readings: monthReadings.length,
          credits: monthCredits,
        });
      }

      // Haftalık veri analizi (son 7 gün)
      const weeklyData = [];
      const dayNames = [
        'Pazartesi',
        'Salı',
        'Çarşamba',
        'Perşembe',
        'Cuma',
        'Cumartesi',
        'Pazar',
      ];

      for (let i = 6; i >= 0; i--) {
        const dayStart = new Date();
        dayStart.setDate(dayStart.getDate() - i);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1);

        const dayReadings = allReadings.filter(reading => {
          const readingDate = new Date(reading.created_at);
          return readingDate >= dayStart && readingDate < dayEnd;
        });

        const dayIndex = dayStart.getDay() === 0 ? 6 : dayStart.getDay() - 1;
        weeklyData.push({
          day: dayNames[dayIndex] || 'Bilinmeyen',
          readings: dayReadings.length,
        });
      }

      // Streak hesaplama
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Son 30 günü kontrol et
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);

        const hasReading = allReadings.some(reading => {
          const readingDate = new Date(reading.created_at);
          readingDate.setHours(0, 0, 0, 0);
          return readingDate.getTime() === checkDate.getTime();
        });

        if (hasReading) {
          if (i === 0) currentStreak = 1;
          else if (i === currentStreak) currentStreak++;

          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      }

      setUserStats({
        totalReadings: totalReadings || 0,
        thisMonth: thisMonth || 0,
        lastMonth: lastMonth || 0,
        favoriteSpread,
        mostActiveDay,
        averagePerMonth: totalReadings ? totalReadings / 12 : 0,
        totalCreditsSpent,
        thisMonthSpent,
        lastMonthSpent,
        averagePerReading,
        mostExpensiveReading,
        readingTypes,
        monthlyData,
        weeklyData,
        streakDays: currentStreak,
        longestStreak,
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNumerologyInsights = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('birth_date, full_name, first_name, last_name, name, surname')
        .eq('id', user.id)
        .single();

      if (profile?.birth_date) {
        // İsim soyisim birleştirme - öncelik sırası: name+surname > first_name+last_name > full_name
        let fullName = '';

        // Önce name ve surname alanlarını kontrol et
        const name = profile.name || '';
        const surname = profile.surname || '';
        if (name || surname) {
          fullName = `${name} ${surname}`.trim();
        } else {
          // Sonra first_name ve last_name kullan
          const firstName = profile.first_name || '';
          const lastName = profile.last_name || '';
          if (firstName || lastName) {
            fullName = `${firstName} ${lastName}`.trim();
          } else {
            // Son çare olarak full_name kullan
            fullName = profile.full_name || 'Kullanıcı';
          }
        }
        const birthDate = profile.birth_date!;
        const today = new Date().toISOString().split('T')[0];

        // İsim ve soyisimi ayrı ayrı al
        const firstName = profile.first_name || profile.name || '';
        const lastName = profile.last_name || profile.surname || '';

        // Tüm numeroloji hesaplamalarını yap
        const lifePath = calculateLifePath(birthDate);
        const expressionDestiny = calculateExpressionDestiny(
          firstName,
          lastName
        );
        const soulUrge = calculateSoulUrge(firstName, lastName);
        const personality = calculatePersonality(firstName, lastName);
        const birthdayNumber = calculateBirthdayNumber(birthDate);
        const maturity = calculateMaturity(
          lifePath.number,
          expressionDestiny.number
        );
        const pinnaclesChallenges = calculatePinnaclesChallenges(birthDate);
        const personalCycles = calculatePersonalCycles(birthDate, today!);

        setNumerologyInsights({
          lifePath,
          expressionDestiny,
          soulUrge,
          personality,
          birthdayNumber,
          maturity,
          pinnaclesChallenges,
          personalCycles,
          userProfile: {
            fullName,
            birthDate,
          },
        });
      } else {
        // Doğum tarihi yoksa numeroloji verilerini null olarak ayarla
        setNumerologyInsights(null);
      }
    } catch (error) {
      console.error('Error fetching numerology insights:', error);
      setNumerologyInsights(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className='flex flex-col min-h-screen bg-night pb-16'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-gold text-xl'>
            🔮 {t('statistics.calculating', 'İstatistikler hesaplanıyor...')}
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-night via-purple-900/20 to-night text-white relative overflow-hidden pb-16'>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent'></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      {/* Header */}
      <header className='relative border-b border-lavender/20 p-6 bg-gradient-to-r from-lavender/5 to-purple-500/5 backdrop-blur-sm'>
        <div className='container mx-auto flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='p-2 bg-gradient-to-br from-gold to-yellow-500 rounded-xl shadow-lg'>
              <BarChart3 className='h-8 w-8 text-night' />
            </div>
            <div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent'>
                {t('statistics.title', 'İstatistikler & İçgörüler')}
              </h1>
              <p className='text-lavender/80 text-sm'>
                {t(
                  'statistics.subtitle',
                  'Mistik yolculuğunuzda ilerlemenizi takip edin'
                )}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => {
                setLoading(true);
                fetchUserStats();
                fetchNumerologyInsights();
              }}
              disabled={loading}
              className='flex items-center space-x-2 px-4 py-2 bg-lavender/10 hover:bg-lavender/20 text-lavender hover:text-gold transition-all duration-300 rounded-lg border border-lavender/20 hover:border-gold/30 disabled:opacity-50'
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
              />
              <span>{t('statistics.refresh', 'Yenile')}</span>
            </button>
            <a
              href='/dashboard'
              className='flex items-center space-x-2 px-4 py-2 bg-gold/10 hover:bg-gold/20 text-gold hover:text-yellow-300 transition-all duration-300 rounded-lg border border-gold/20 hover:border-gold/40'
            >
              <span>←</span>
              <span>{t('statistics.backToDashboard', "Dashboard'a Dön")}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 relative container mx-auto px-6 py-8'>
        {/* Page Header */}
        <div className='mb-12 text-center'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30'>
            <Sparkles className='h-10 w-10 text-gold' />
          </div>
          <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent'>
            {t('statistics.insightsTitle', 'Mistik İçgörüleriniz')}
          </h1>
          <p className='text-lavender/90 text-lg max-w-2xl mx-auto leading-relaxed'>
            {t(
              'statistics.insightsDesc',
              'Numerolojik rehberliğiniz ve okuma alışkanlıklarınızla ilgili derinlemesine analiz'
            )}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className='mb-12'>
          <div className='flex space-x-2 bg-gradient-to-r from-lavender/10 to-purple-500/10 rounded-2xl p-2 backdrop-blur-sm border border-lavender/20'>
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-gold to-yellow-500 text-night shadow-lg transform scale-105'
                  : 'text-lavender hover:text-gold hover:bg-lavender/10'
              }`}
            >
              <BarChart3 className='h-5 w-5' />
              <span>{t('statistics.overview', 'Genel Bakış')}</span>
            </button>
            <button
              onClick={() => setActiveTab('numerology')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeTab === 'numerology'
                  ? 'bg-gradient-to-r from-gold to-yellow-500 text-night shadow-lg transform scale-105'
                  : 'text-lavender hover:text-gold hover:bg-lavender/10'
              }`}
            >
              <Hash className='h-5 w-5' />
              <span>{t('statistics.numerology', 'Numeroloji')}</span>
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeTab === 'patterns'
                  ? 'bg-gradient-to-r from-gold to-yellow-500 text-night shadow-lg transform scale-105'
                  : 'text-lavender hover:text-gold hover:bg-lavender/10'
              }`}
            >
              <Activity className='h-5 w-5' />
              <span>{t('statistics.patterns', 'Desenler')}</span>
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && userStats && (
          <div className='space-y-8'>
            {/* Key Statistics */}
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div className='group bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 text-center hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                  <BookOpen className='h-6 w-6 text-white' />
                </div>
                <div className='text-4xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2'>
                  {userStats.totalReadings}
                </div>
                <div className='text-sm font-semibold text-lavender mb-2'>
                  {t('statistics.totalReadings', 'Toplam Okuma')}
                </div>
                <div className='text-xs text-gold font-medium'>
                  {t('statistics.thisMonth', 'Bu ay')}: {userStats.thisMonth}
                </div>
                <div className='text-xs text-lavender/80 mt-1 flex items-center justify-center space-x-1'>
                  <span>
                    {userStats.thisMonth > userStats.lastMonth ? '📈' : '📉'}
                  </span>
                  <span>
                    {Math.abs(userStats.thisMonth - userStats.lastMonth)}{' '}
                    {t('statistics.vsLastMonth', 'vs geçen ay')}
                  </span>
                </div>
              </div>

              <div className='group bg-gradient-to-br from-gold/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-6 border border-gold/20 text-center hover:border-gold/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-gold/20'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gold to-yellow-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                  <Coins className='h-6 w-6 text-night' />
                </div>
                <div className='text-4xl font-black bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-2'>
                  {userStats.totalCreditsSpent}
                </div>
                <div className='text-sm font-semibold text-lavender mb-2'>
                  {t('statistics.totalCreditsSpent', 'Toplam Harcanan Kredi')}
                </div>
                <div className='text-xs text-gold font-medium'>
                  {t('statistics.thisMonth', 'Bu ay')}:{' '}
                  {userStats.thisMonthSpent}
                </div>
                <div className='text-xs text-lavender/80 mt-1'>
                  {t('statistics.average', 'Ortalama')}:{' '}
                  {userStats.averagePerReading.toFixed(1)}/
                  {t('statistics.perReading', 'okuma')}
                </div>
              </div>

              <div className='group bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20 text-center hover:border-pink-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                  <Zap className='h-6 w-6 text-white' />
                </div>
                <div className='text-4xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2'>
                  {userStats.streakDays}
                </div>
                <div className='text-sm font-semibold text-lavender mb-2'>
                  {t('statistics.dailyStreak', 'Günlük Seri')}
                </div>
                <div className='text-xs text-gold font-medium'>
                  {t('statistics.longest', 'En uzun')}:{' '}
                  {userStats.longestStreak} {t('statistics.days', 'gün')}
                </div>
                <div className='text-xs text-lavender/80 mt-1 flex items-center justify-center space-x-1'>
                  <span>🔥</span>
                  <span>{t('statistics.activeStreak', 'Aktif seri')}</span>
                </div>
              </div>

              <div className='group bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 text-center hover:border-emerald-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                  <Gem className='h-6 w-6 text-white' />
                </div>
                <div className='text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2'>
                  {userStats.mostExpensiveReading}
                </div>
                <div className='text-sm font-semibold text-lavender mb-2'>
                  {t('statistics.mostExpensiveReading', 'En Pahalı Okuma')}
                </div>
                <div className='text-xs text-gold font-medium'>
                  {t('statistics.creditCost', 'Kredi maliyeti')}
                </div>
                <div className='text-xs text-lavender/80 mt-1 flex items-center justify-center space-x-1'>
                  <span>💎</span>
                  <span>{t('statistics.premiumReading', 'Premium okuma')}</span>
                </div>
              </div>
            </div>

            {/* Detailed Insights */}
            <div className='grid md:grid-cols-3 gap-8'>
              <div className='group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105'>
                <h3 className='text-xl font-bold text-white mb-6 flex items-center'>
                  <div className='p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mr-3'>
                    <Star className='h-5 w-5 text-white' />
                  </div>
                  {t('statistics.readingHabits', 'Okuma Alışkanlıkları')}
                </h3>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center p-3 bg-white/5 rounded-lg'>
                    <span className='text-lavender text-sm'>
                      En Çok Kullanılan Dizilim:
                    </span>
                    <span className='text-white font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                      {userStats.favoriteSpread}
                    </span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-white/5 rounded-lg'>
                    <span className='text-lavender text-sm'>En Aktif Gün:</span>
                    <span className='text-white font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                      {userStats.mostActiveDay}
                    </span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-white/5 rounded-lg'>
                    <span className='text-lavender text-sm'>
                      Aylık Ortalama:
                    </span>
                    <span className='text-white font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                      {userStats.averagePerMonth.toFixed(1)} okuma
                    </span>
                  </div>
                </div>
              </div>

              <div className='group bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:transform hover:scale-105'>
                <h3 className='text-xl font-bold text-white mb-6 flex items-center'>
                  <div className='p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg mr-3'>
                    <TrendingUp className='h-5 w-5 text-white' />
                  </div>
                  {t('statistics.trendAnalysis', 'Trend Analizi')}
                </h3>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center p-3 bg-white/5 rounded-lg'>
                    <span className='text-lavender text-sm'>
                      Bu Ay vs Geçen Ay:
                    </span>
                    <span
                      className={`font-semibold flex items-center space-x-1 ${userStats.thisMonth > userStats.lastMonth ? 'text-green-400' : 'text-orange-400'}`}
                    >
                      <span>
                        {userStats.thisMonth > userStats.lastMonth
                          ? '📈'
                          : '📉'}
                      </span>
                      <span>
                        {userStats.thisMonth > userStats.lastMonth
                          ? 'Artış'
                          : 'Azalış'}
                      </span>
                    </span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-white/5 rounded-lg'>
                    <span className='text-lavender text-sm'>
                      Kredi Verimliliği:
                    </span>
                    <span
                      className={`font-semibold flex items-center space-x-1 ${
                        userStats.averagePerReading <= 5
                          ? 'text-green-400'
                          : userStats.averagePerReading <= 8
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      }`}
                    >
                      <span>
                        {userStats.averagePerReading <= 5
                          ? '🟢'
                          : userStats.averagePerReading <= 8
                            ? '🟡'
                            : '🔴'}
                      </span>
                      <span>
                        {userStats.averagePerReading <= 5
                          ? 'Yüksek'
                          : userStats.averagePerReading <= 8
                            ? 'Orta'
                            : 'Düşük'}
                      </span>
                    </span>
                  </div>
                  <div className='flex justify-between items-center p-3 bg-white/5 rounded-lg'>
                    <span className='text-lavender text-sm'>Günlük Seri:</span>
                    <span className='text-white font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center space-x-1'>
                      <span>{userStats.streakDays} gün</span>
                      <span>🔥</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className='group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105'>
                <h3 className='text-xl font-bold text-white mb-6 flex items-center'>
                  <div className='p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-3'>
                    <PieChart className='h-5 w-5 text-white' />
                  </div>
                  {t('statistics.readingTypes', 'Okuma Türleri')}
                </h3>
                <div className='space-y-3'>
                  {Object.entries(userStats.readingTypes)
                    .slice(0, 3)
                    .map(([type, count]) => (
                      <div
                        key={type}
                        className='flex justify-between items-center p-3 bg-white/5 rounded-lg'
                      >
                        <span className='text-lavender text-sm'>{type}:</span>
                        <span className='text-white font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                          {count}
                        </span>
                      </div>
                    ))}
                  {Object.keys(userStats.readingTypes).length > 3 && (
                    <div className='text-xs text-lavender/80 mt-3 text-center p-2 bg-white/5 rounded-lg'>
                      +{Object.keys(userStats.readingTypes).length - 3} tür daha
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className='grid md:grid-cols-2 gap-8'>
              {/* Monthly Trend Chart */}
              <div className='group bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300'>
                <h3 className='text-xl font-bold text-white mb-6 flex items-center'>
                  <div className='p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mr-3'>
                    <LineChart className='h-5 w-5 text-white' />
                  </div>
                  {t('statistics.monthlyTrend', 'Aylık Trend (Son 6 Ay)')}
                </h3>
                <div className='space-y-4'>
                  {userStats.monthlyData.map((month, index) => (
                    <div key={index} className='group/item'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-lavender text-sm font-medium'>
                          {month.month}
                        </span>
                        <span className='text-white font-bold text-sm'>
                          {month.readings} okuma
                        </span>
                      </div>
                      <div className='w-full bg-lavender/20 rounded-full h-3 overflow-hidden'>
                        <div
                          className='bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-700 ease-out group-hover/item:from-indigo-400 group-hover/item:to-purple-400'
                          style={{
                            width: `${Math.min(100, (month.readings / Math.max(...userStats.monthlyData.map(m => m.readings))) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Activity Chart */}
              <div className='group bg-gradient-to-br from-rose-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-rose-500/20 hover:border-rose-500/40 transition-all duration-300'>
                <h3 className='text-xl font-bold text-white mb-6 flex items-center'>
                  <div className='p-2 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg mr-3'>
                    <BarChart3 className='h-5 w-5 text-white' />
                  </div>
                  {t(
                    'statistics.weeklyActivity',
                    'Haftalık Aktivite (Son 7 Gün)'
                  )}
                </h3>
                <div className='space-y-4'>
                  {userStats.weeklyData.map((day, index) => (
                    <div key={index} className='group/item'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-lavender text-sm font-medium'>
                          {day.day}
                        </span>
                        <span className='text-white font-bold text-sm'>
                          {day.readings} okuma
                        </span>
                      </div>
                      <div className='w-full bg-lavender/20 rounded-full h-3 overflow-hidden'>
                        <div
                          className='bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all duration-700 ease-out group-hover/item:from-rose-400 group-hover/item:to-pink-400'
                          style={{
                            width: `${Math.min(100, (day.readings / Math.max(...userStats.weeklyData.map(d => d.readings), 1)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Numerology Tab */}
        {activeTab === 'numerology' && (
          <div className='space-y-8'>
            {numerologyInsights ? (
              <>
                {/* User Profile Info */}
                <div className='bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20'>
                  <h3 className='text-xl font-bold text-white mb-4 flex items-center'>
                    <User className='h-6 w-6 text-gold mr-2' />
                    {t('statistics.numerologyProfile', 'Numeroloji Profili')}
                  </h3>
                  <div className='grid md:grid-cols-3 gap-4'>
                    <div>
                      <span className='text-lavender'>
                        {t('statistics.name', 'İsim')}:
                      </span>
                      <span className='text-white font-medium ml-2'>
                        {numerologyInsights.userProfile.fullName.split(
                          ' '
                        )[0] || t('statistics.notSpecified', 'Belirtilmemiş')}
                      </span>
                    </div>
                    <div>
                      <span className='text-lavender'>
                        {t('statistics.surname', 'Soyisim')}:
                      </span>
                      <span className='text-white font-medium ml-2'>
                        {numerologyInsights.userProfile.fullName
                          .split(' ')
                          .slice(1)
                          .join(' ') ||
                          t('statistics.notSpecified', 'Belirtilmemiş')}
                      </span>
                      {numerologyInsights.userProfile.fullName.split(' ')
                        .length === 1 && (
                        <div className='text-xs text-yellow-400 mt-1'>
                          ⚠️{' '}
                          {t(
                            'statistics.fullNameRecommended',
                            'Numeroloji hesaplamaları için tam isim soyisim önerilir'
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className='text-lavender'>
                        {t('statistics.birthDate', 'Doğum Tarihi')}:
                      </span>
                      <span className='text-white font-medium ml-2'>
                        {new Date(
                          numerologyInsights.userProfile.birthDate
                        ).toLocaleDateString(t('common.locale', 'tr-TR'))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Core Numbers */}
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {/* Life Path */}
                  <div className='group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20'>
                    <div className='text-center mb-6'>
                      <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                        <Hash className='h-10 w-10 text-white' />
                      </div>
                      <h4 className='text-xl font-bold text-white mb-3'>
                        {t('statistics.lifePath', 'Yaşam Yolu')}
                      </h4>
                      <div
                        className={`text-6xl font-black ${numerologyInsights.lifePath.isMasterNumber ? 'text-yellow-400' : 'text-gold'} mb-3 drop-shadow-lg`}
                      >
                        {numerologyInsights.lifePath.number}
                      </div>
                      {numerologyInsights.lifePath.isMasterNumber && (
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4'>
                          ✨ {t('statistics.masterNumber', 'Master Sayı')}
                        </span>
                      )}
                    </div>
                    <p className='text-lavender text-sm leading-relaxed text-center'>
                      {numerologyInsights.lifePath.description}
                    </p>
                  </div>

                  {/* Expression Destiny */}
                  <div className='group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20'>
                    <div className='text-center mb-6'>
                      <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                        <Sparkles className='h-10 w-10 text-white' />
                      </div>
                      <h4 className='text-xl font-bold text-white mb-3'>
                        {t('statistics.expressionDestiny', 'İfade/Kader')}
                      </h4>
                      <div
                        className={`text-6xl font-black ${numerologyInsights.expressionDestiny.isMasterNumber ? 'text-yellow-400' : 'text-gold'} mb-3 drop-shadow-lg`}
                      >
                        {numerologyInsights.expressionDestiny.number}
                      </div>
                      {numerologyInsights.expressionDestiny.isMasterNumber && (
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4'>
                          ✨ {t('statistics.masterNumber', 'Master Sayı')}
                        </span>
                      )}
                    </div>
                    <p className='text-lavender text-sm leading-relaxed text-center'>
                      {numerologyInsights.expressionDestiny.description}
                    </p>
                  </div>

                  {/* Soul Urge */}
                  <div className='group bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20'>
                    <div className='text-center mb-6'>
                      <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                        <Heart className='h-10 w-10 text-white' />
                      </div>
                      <h4 className='text-xl font-bold text-white mb-3'>
                        {t('statistics.soulUrge', 'Ruh Arzusu')}
                      </h4>
                      <div
                        className={`text-6xl font-black ${numerologyInsights.soulUrge.isMasterNumber ? 'text-yellow-400' : 'text-gold'} mb-3 drop-shadow-lg`}
                      >
                        {numerologyInsights.soulUrge.number}
                      </div>
                      {numerologyInsights.soulUrge.isMasterNumber && (
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4'>
                          ✨ {t('statistics.masterNumber', 'Master Sayı')}
                        </span>
                      )}
                    </div>
                    <p className='text-lavender text-sm leading-relaxed text-center'>
                      {numerologyInsights.soulUrge.description}
                    </p>
                  </div>

                  {/* Personality */}
                  <div className='group bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/20'>
                    <div className='text-center mb-6'>
                      <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                        <Eye className='h-10 w-10 text-white' />
                      </div>
                      <h4 className='text-xl font-bold text-white mb-3'>
                        {t('statistics.personality', 'Kişilik')}
                      </h4>
                      <div
                        className={`text-6xl font-black ${numerologyInsights.personality.isMasterNumber ? 'text-yellow-400' : 'text-gold'} mb-3 drop-shadow-lg`}
                      >
                        {numerologyInsights.personality.number}
                      </div>
                      {numerologyInsights.personality.isMasterNumber && (
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4'>
                          ✨ {t('statistics.masterNumber', 'Master Sayı')}
                        </span>
                      )}
                    </div>
                    <p className='text-lavender text-sm leading-relaxed text-center'>
                      {numerologyInsights.personality.description}
                    </p>
                  </div>

                  {/* Birthday Number */}
                  <div className='group bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20'>
                    <div className='text-center mb-6'>
                      <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                        <Calendar className='h-10 w-10 text-white' />
                      </div>
                      <h4 className='text-xl font-bold text-white mb-3'>
                        {t('statistics.birthdayNumber', 'Doğum Günü')}
                      </h4>
                      <div
                        className={`text-6xl font-black ${numerologyInsights.birthdayNumber.isMasterNumber ? 'text-yellow-400' : 'text-gold'} mb-3 drop-shadow-lg`}
                      >
                        {numerologyInsights.birthdayNumber.number}
                      </div>
                      {numerologyInsights.birthdayNumber.isMasterNumber && (
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4'>
                          ✨ {t('statistics.masterNumber', 'Master Sayı')}
                        </span>
                      )}
                    </div>
                    <p className='text-lavender text-sm leading-relaxed text-center'>
                      {numerologyInsights.birthdayNumber.description}
                    </p>
                  </div>

                  {/* Maturity */}
                  <div className='group bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20'>
                    <div className='text-center mb-6'>
                      <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
                        <Crown className='h-10 w-10 text-white' />
                      </div>
                      <h4 className='text-xl font-bold text-white mb-3'>
                        {t('statistics.maturity', 'Olgunluk')}
                      </h4>
                      <div
                        className={`text-6xl font-black ${numerologyInsights.maturity.isMasterNumber ? 'text-yellow-400' : 'text-gold'} mb-3 drop-shadow-lg`}
                      >
                        {numerologyInsights.maturity.number}
                      </div>
                      {numerologyInsights.maturity.isMasterNumber && (
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4'>
                          ✨ {t('statistics.masterNumber', 'Master Sayı')}
                        </span>
                      )}
                    </div>
                    <p className='text-lavender text-sm leading-relaxed text-center'>
                      {numerologyInsights.maturity.description}
                    </p>
                  </div>
                </div>

                {/* Personal Cycles */}
                <div className='group bg-gradient-to-br from-gold/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-xl hover:shadow-gold/20'>
                  <h4 className='text-2xl font-bold text-white mb-6 flex items-center'>
                    <div className='p-2 bg-gradient-to-br from-gold to-yellow-500 rounded-lg mr-3'>
                      <Clock className='h-6 w-6 text-night' />
                    </div>
                    {t('statistics.personalCycles', 'Kişisel Döngüler')}
                  </h4>
                  <div className='grid md:grid-cols-3 gap-6 mb-6'>
                    <div className='text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300'>
                      <div className='text-5xl font-black bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-2'>
                        {numerologyInsights.personalCycles.personalYear}
                      </div>
                      <div className='text-sm font-semibold text-lavender'>
                        Kişisel Yıl
                      </div>
                    </div>
                    <div className='text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300'>
                      <div className='text-5xl font-black bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-2'>
                        {numerologyInsights.personalCycles.personalMonth}
                      </div>
                      <div className='text-sm font-semibold text-lavender'>
                        Kişisel Ay
                      </div>
                    </div>
                    <div className='text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300'>
                      <div className='text-5xl font-black bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-2'>
                        {numerologyInsights.personalCycles.personalDay}
                      </div>
                      <div className='text-sm font-semibold text-lavender'>
                        Kişisel Gün
                      </div>
                    </div>
                  </div>
                  <p className='text-lavender text-sm leading-relaxed text-center'>
                    {numerologyInsights.personalCycles.description}
                  </p>
                </div>

                {/* Pinnacles & Challenges */}
                {numerologyInsights.pinnaclesChallenges.pinnacles && (
                  <div className='grid md:grid-cols-2 gap-8'>
                    <div className='group bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20'>
                      <h4 className='text-xl font-bold text-white mb-6 flex items-center'>
                        <div className='p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg mr-3'>
                          <Gem className='h-5 w-5 text-white' />
                        </div>
                        {t('statistics.lifePinnacles', 'Yaşam Zirveleri')}
                      </h4>
                      <div className='space-y-4'>
                        {numerologyInsights.pinnaclesChallenges.pinnacles.map(
                          (pinnacle: any, index: number) => (
                            <div
                              key={index}
                              className='p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300'
                            >
                              <div className='flex items-center justify-between mb-2'>
                                <span className='text-lavender text-sm font-medium'>
                                  {pinnacle.period}
                                </span>
                                <div className='text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
                                  {pinnacle.number}
                                </div>
                              </div>
                              <div className='text-xs text-lavender/80 leading-relaxed'>
                                {pinnacle.description}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className='group bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20'>
                      <h4 className='text-xl font-bold text-white mb-6 flex items-center'>
                        <div className='p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg mr-3'>
                          <Shield className='h-5 w-5 text-white' />
                        </div>
                        {t('statistics.lifeChallenges', 'Yaşam Zorlukları')}
                      </h4>
                      <div className='space-y-4'>
                        {numerologyInsights.pinnaclesChallenges.challenges?.map(
                          (challenge: any, index: number) => (
                            <div
                              key={index}
                              className='p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300'
                            >
                              <div className='flex items-center justify-between mb-2'>
                                <span className='text-lavender text-sm font-medium'>
                                  {challenge.period}
                                </span>
                                <div className='text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent'>
                                  {challenge.number}
                                </div>
                              </div>
                              <div className='text-xs text-lavender/80 leading-relaxed'>
                                {challenge.description}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className='bg-gradient-to-br from-lavender/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-12 border border-lavender/20 text-center hover:border-lavender/40 transition-all duration-300'>
                <div className='inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-lavender/20 to-purple-500/20 rounded-full mb-6'>
                  <Hash className='h-12 w-12 text-lavender/70' />
                </div>
                <h3 className='text-2xl font-bold text-white mb-4'>
                  Numeroloji Analizi
                </h3>
                <p className='text-lavender/90 mb-8 max-w-md mx-auto leading-relaxed'>
                  Numeroloji analizi için doğum tarihinizi profilinizde
                  belirtmeniz gerekiyor. Bu bilgi ile kişiselleştirilmiş
                  numerolojik rehberliğinizi keşfedebilirsiniz.
                </p>
                <a
                  href='/dashboard'
                  className='inline-flex items-center space-x-2 bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/80 hover:to-yellow-500/80 text-night font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20'
                >
                  <User className='h-5 w-5' />
                  <span>Profil Ayarlarına Git</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Patterns Tab */}
        {activeTab === 'patterns' && userStats && (
          <div className='space-y-8'>
            {/* Pattern Analysis */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20'>
                <h3 className='text-xl font-bold text-white mb-4 flex items-center'>
                  <Target className='h-6 w-6 text-gold mr-2' />
                  {t('statistics.activityPatterns', 'Aktivite Desenleri')}
                </h3>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-lavender'>En Aktif Gün:</span>
                    <span className='text-white font-medium'>
                      {userStats.mostActiveDay}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-lavender'>Günlük Seri:</span>
                    <span className='text-white font-medium'>
                      {userStats.streakDays} gün
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-lavender'>En Uzun Seri:</span>
                    <span className='text-white font-medium'>
                      {userStats.longestStreak} gün
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-lavender'>Aktivite Seviyesi:</span>
                    <span
                      className={`font-medium ${
                        userStats.averagePerMonth >= 10
                          ? 'text-green-400'
                          : userStats.averagePerMonth >= 5
                            ? 'text-yellow-400'
                            : 'text-orange-400'
                      }`}
                    >
                      {userStats.averagePerMonth >= 10
                        ? '🟢 Yüksek'
                        : userStats.averagePerMonth >= 5
                          ? '🟡 Orta'
                          : '🟠 Düşük'}
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20'>
                <h3 className='text-xl font-bold text-white mb-4 flex items-center'>
                  <Award className='h-6 w-6 text-gold mr-2' />
                  {t('statistics.achievementsGoals', 'Başarılar & Hedefler')}
                </h3>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-lavender'>Toplam Okuma:</span>
                    <span className='text-white font-medium'>
                      {userStats.totalReadings}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-lavender'>Bu Ay Hedefi:</span>
                    <span className='text-white font-medium'>
                      {userStats.thisMonth}/10
                      {userStats.thisMonth >= 10 ? ' ✅' : ' 🎯'}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-lavender'>Kredi Verimliliği:</span>
                    <span className='text-white font-medium'>
                      {userStats.averagePerReading.toFixed(1)}/okuma
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-lavender'>Favori Dizilim:</span>
                    <span className='text-white font-medium'>
                      {userStats.favoriteSpread}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reading Types Distribution */}
            <div className='bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20'>
              <h3 className='text-xl font-bold text-white mb-4 flex items-center'>
                <PieChart className='h-6 w-6 text-gold mr-2' />
                {t(
                  'statistics.readingTypesDistribution',
                  'Okuma Türleri Dağılımı'
                )}
              </h3>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {Object.entries(userStats.readingTypes).map(([type, count]) => {
                  const percentage = (
                    (count / userStats.totalReadings) *
                    100
                  ).toFixed(1);
                  return (
                    <div key={type} className='bg-lavender/5 rounded-lg p-4'>
                      <div className='flex justify-between items-center mb-2'>
                        <span className='text-lavender text-sm font-medium'>
                          {type}
                        </span>
                        <span className='text-gold font-bold'>{count}</span>
                      </div>
                      <div className='bg-lavender/20 rounded-full h-2'>
                        <div
                          className='bg-gold h-2 rounded-full transition-all duration-500'
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className='text-xs text-lavender mt-1'>
                        {percentage}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insights & Recommendations */}
            <div className='bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20'>
              <h3 className='text-xl font-bold text-white mb-4 flex items-center'>
                <Activity className='h-6 w-6 text-gold mr-2' />
                {t(
                  'statistics.personalInsights',
                  'Kişisel İçgörüler & Öneriler'
                )}
              </h3>
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='text-lg font-semibold text-gold mb-3'>
                    📊 Analiz
                  </h4>
                  <ul className='space-y-2 text-lavender'>
                    <li>
                      •{' '}
                      {userStats.totalReadings > 0
                        ? `Toplam ${userStats.totalReadings} okuma ile mistik yolculuğunuza devam ediyorsunuz`
                        : 'Henüz okuma yapmadınız'}
                    </li>
                    <li>
                      •{' '}
                      {userStats.favoriteSpread !== 'Henüz yok'
                        ? `En çok ${userStats.favoriteSpread} dizilimini tercih ediyorsunuz`
                        : 'Favori diziliminiz henüz belirlenmedi'}
                    </li>
                    <li>
                      •{' '}
                      {userStats.streakDays > 0
                        ? `${userStats.streakDays} günlük seriniz var! 🔥`
                        : 'Günlük okuma alışkanlığı oluşturmaya başlayabilirsiniz'}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className='text-lg font-semibold text-gold mb-3'>
                    💡 Öneriler
                  </h4>
                  <ul className='space-y-2 text-lavender'>
                    <li>
                      •{' '}
                      {userStats.thisMonth < 5
                        ? 'Bu ay daha fazla okuma yaparak hedeflerinizi aşabilirsiniz'
                        : 'Bu ay harika bir performans gösteriyorsunuz!'}
                    </li>
                    <li>
                      •{' '}
                      {userStats.averagePerReading > 8
                        ? 'Daha ekonomik okuma türlerini deneyebilirsiniz'
                        : 'Kredi kullanımınız verimli görünüyor'}
                    </li>
                    <li>
                      •{' '}
                      {userStats.longestStreak < 7
                        ? 'Günlük okuma alışkanlığı oluşturmaya odaklanın'
                        : 'Harika bir okuma alışkanlığınız var!'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className='mt-12 text-center'>
          <a
            href='/dashboard'
            className='bg-gold hover:bg-gold/80 text-night font-semibold py-3 px-6 rounded-lg transition-colors'
          >
            {t('statistics.backToDashboard', "Dashboard'a Dön")}
          </a>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
