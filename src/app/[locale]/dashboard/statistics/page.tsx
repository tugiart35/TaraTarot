/*
 * DOSYA BİLGİSİ:
 * 
 * Bağlı Dosyalar: 
 * - useAuth hook (kullanıcı kimlik doğrulama)
 * - Supabase client (veritabanı bağlantısı)
 * - reading-credits constants (kredi yapılandırması)
 * 
 * Dosya Amacı:
 * Kullanıcı istatistikleri ve numeroloji analizi sayfası
 * - Tarot okuma istatistikleri (toplam, aylık, favori dizilim)
 * - Kredi harcama analizi
 * - Numeroloji hesaplamaları (yaşam yolu, kişisel yıl)
 * - Günlük/aylık rehberlik
 * 
 * Supabase Değişkenleri:
 * - tarot_readings tablosu (okuma geçmişi)
 * - profiles tablosu (doğum tarihi)
 * 
 * Geliştirme Önerileri:
 * - Desen analizi sekmesi henüz tamamlanmamış
 * - Grafik görselleştirme eklenebilir
 * - Export özelliği eklenebilir
 * 
 * Tespit Edilen Hatalar:
 * - ✅ Loading state düzeltildi (setLoading(false) eklendi)
 * - ✅ Performans optimizasyonu: Tek sorguda tüm veriler alınıyor
 * - ✅ Gereksiz veritabanı sorguları kaldırıldı
 * - ✅ Doğum tarihi olmayan kullanıcılar için uyarı eklendi
 * - ✅ Boş veri durumu için varsayılan değerler eklendi
 * 
 * Kullanım Durumu:
 * - ✅ Aktif ve çalışır durumda
 * - ✅ Hata yönetimi mevcut
 * - ✅ Responsive tasarım
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Star, Hash, Calendar, TrendingUp, BarChart3, PieChart, Activity, Target, Zap, Moon, Sun, Heart } from 'lucide-react';
import { READING_CREDIT_CONFIGS } from '@/lib/constants/reading-credits';

interface UserStats {
  totalReadings: number;
  thisMonth: number;
  favoriteSpread: string;
  mostActiveDay: string;
  averagePerMonth: number;
  totalCreditsSpent: number;
  thisMonthSpent: number;
  averagePerReading: number;
  mostExpensiveReading: number;
}

interface NumerologyInsights {
  lifePath: number;
  personalYear: number;
  currentMonth: number;
  dailyNumber: number;
  lifePathMeaning: string;
  personalYearMeaning: string;
  monthlyGuidance: string;
  dailyGuidance: string;
}

export default function StatisticsPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [numerologyInsights, setNumerologyInsights] = useState<NumerologyInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'numerology' | 'patterns'>('overview');

  // Auth kontrolü
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.replace('/tr/auth');
        return;
      }
      fetchUserStats();
      fetchNumerologyInsights();
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchUserStats = async () => {
    if (!user) return;
    
    try {
      // Tek sorguda tüm verileri al - performans için
      const { data: allReadings, error } = await supabase
        .from('tarot_readings')
        .select('reading_type, cost_credits, created_at')
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
          favoriteSpread: 'Henüz yok',
          mostActiveDay: 'Henüz yok',
          averagePerMonth: 0,
          totalCreditsSpent: 0,
          thisMonthSpent: 0,
          averagePerReading: 0,
          mostExpensiveReading: 0
        });
        return;
      }

      // Bu ayın başlangıcı
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      // Toplam okuma sayısı
      const totalReadings = allReadings.length;

      // Bu ayki okuma sayısı
      const thisMonth = allReadings.filter(reading => 
        new Date(reading.created_at) >= startOfMonth
      ).length;

      // Kredi hesaplama fonksiyonu
      const getCreditCost = (readingType: string, costCredits?: number): number => {
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

      // En çok kullanılan dizilim
      const spreadCounts: Record<string, number> = {};
      allReadings.forEach(reading => {
        const spreadName = reading.reading_type || 'Bilinmeyen';
        spreadCounts[spreadName] = (spreadCounts[spreadName] || 0) + 1;
      });

      const favoriteSpread = Object.entries(spreadCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Henüz yok';

      // En aktif gün
      const dayCounts: Record<string, number> = {};
      allReadings.forEach(reading => {
        const day = new Date(reading.created_at).toLocaleDateString('tr-TR', { weekday: 'long' });
        dayCounts[day] = (dayCounts[day] || 0) + 1;
      });

      const mostActiveDay = Object.entries(dayCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Henüz yok';

      // Kredi hesaplamaları
      const totalCreditsSpent = allReadings.reduce((sum, reading) => 
        sum + getCreditCost(reading.reading_type, reading.cost_credits), 0);

      const thisMonthSpent = allReadings
        .filter(reading => new Date(reading.created_at) >= startOfMonth)
        .reduce((sum, reading) => sum + getCreditCost(reading.reading_type, reading.cost_credits), 0);

      const averagePerReading = totalReadings ? totalCreditsSpent / totalReadings : 0;
      const mostExpensiveReading = allReadings.reduce((max, reading) => 
        Math.max(max, getCreditCost(reading.reading_type, reading.cost_credits)), 0);

      setUserStats({
        totalReadings: totalReadings || 0,
        thisMonth: thisMonth || 0,
        favoriteSpread,
        mostActiveDay,
        averagePerMonth: totalReadings ? totalReadings / 12 : 0,
        totalCreditsSpent,
        thisMonthSpent,
        averagePerReading,
        mostExpensiveReading
      });

    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNumerologyInsights = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's birth date from profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('birth_date')
        .eq('id', user.id)
        .single();

      if (profile?.birth_date) {
        const birthDate = new Date(profile.birth_date);
        const lifePath = calculateLifePath(birthDate);
        const personalYear = calculatePersonalYear(birthDate);
        const currentMonth = calculateCurrentMonth(birthDate);
        const dailyNumber = calculateDailyNumber();

        setNumerologyInsights({
          lifePath,
          personalYear,
          currentMonth,
          dailyNumber,
          lifePathMeaning: getLifePathMeaning(lifePath),
          personalYearMeaning: getPersonalYearMeaning(personalYear),
          monthlyGuidance: getMonthlyGuidance(currentMonth),
          dailyGuidance: getDailyGuidance(dailyNumber)
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

  const calculateLifePath = (birthDate: Date): number => {
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();
    
    return reduceToSingleDigit(day + month + year);
  };

  const calculatePersonalYear = (birthDate: Date): number => {
    const currentYear = new Date().getFullYear();
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    
    return reduceToSingleDigit(day + month + currentYear);
  };

  const calculateCurrentMonth = (birthDate: Date): number => {
    const currentDate = new Date();
    const day = birthDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    return reduceToSingleDigit(day + currentMonth + currentYear);
  };

  const calculateDailyNumber = (): number => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    return reduceToSingleDigit(day + month + year);
  };

  const reduceToSingleDigit = (num: number): number => {
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const getLifePathMeaning = (number: number): string => {
    const meanings: Record<number, string> = {
      1: 'Liderlik ve bağımsızlık. Yaratıcı ve özgün olma zamanı.',
      2: 'İşbirliği ve denge. Uyum ve ortaklık önemli.',
      3: 'Yaratıcılık ve iletişim. Sanat ve ifade özgürlüğü.',
      4: 'Stabilite ve güven. Disiplin ve çalışma ile başarı.',
      5: 'Değişim ve macera. Özgürlük ve deneyim arayışı.',
      6: 'Sorumluluk ve sevgi. Aile ve hizmet odaklı.',
      7: 'Spiritüellik ve analiz. İç dünya ve araştırma.',
      8: 'Güç ve başarı. Maddi başarı ve otorite.',
      9: 'Tamamlanma ve evrensel sevgi. İnsanlığa hizmet.'
    };
    return meanings[number] || 'Bu sayı hakkında bilgi bulunamadı.';
  };

  const getPersonalYearMeaning = (number: number): string => {
    const meanings: Record<number, string> = {
      1: 'Yeni başlangıçlar yılı. Cesaret ve liderlik gerekli.',
      2: 'İşbirliği yılı. Sabır ve uyum önemli.',
      3: 'Yaratıcılık yılı. Sanat ve sosyal aktiviteler.',
      4: 'Çalışma yılı. Disiplin ve organizasyon.',
      5: 'Değişim yılı. Macera ve yeni deneyimler.',
      6: 'Sorumluluk yılı. Aile ve ilişkiler önemli.',
      7: 'Spiritüellik yılı. İç dünya ve gelişim.',
      8: 'Başarı yılı. Maddi kazanç ve güç.',
      9: 'Tamamlanma yılı. Bırakma ve yeni döngü.'
    };
    return meanings[number] || 'Bu yıl hakkında bilgi bulunamadı.';
  };

  const getMonthlyGuidance = (number: number): string => {
    const guidance: Record<number, string> = {
      1: 'Bu ay yeni projeler başlatın. Liderlik pozisyonları alın.',
      2: 'İşbirliği ve ortaklık arayın. Sabırlı olun.',
      3: 'Yaratıcı projeler geliştirin. Sosyal aktivitelere katılın.',
      4: 'Detaylara odaklanın. Organizasyon ve planlama yapın.',
      5: 'Değişiklikleri kucaklayın. Yeni deneyimler arayın.',
      6: 'Aile ve ilişkilere zaman ayırın. Hizmet edin.',
      7: 'İç dünyanızı keşfedin. Meditasyon ve araştırma yapın.',
      8: 'Kariyer ve finansal hedeflere odaklanın.',
      9: 'Eski projeleri tamamlayın. Yeni döngüye hazırlanın.'
    };
    return guidance[number] || 'Bu ay için özel rehberlik bulunamadı.';
  };

  const getDailyGuidance = (number: number): string => {
    const guidance: Record<number, string> = {
      1: 'Bugün liderlik pozisyonları alın. Yaratıcı olun.',
      2: 'İşbirliği yapın. Denge ve uyum arayın.',
      3: 'Yaratıcılığınızı ifade edin. İletişim kurun.',
      4: 'Detaylara dikkat edin. Organize olun.',
      5: 'Değişiklikleri kucaklayın. Macera arayın.',
      6: 'Ailenize ve sevdiklerinize zaman ayırın.',
      7: 'İç dünyanızı keşfedin. Analiz yapın.',
      8: 'Hedeflerinize odaklanın. Başarı için çalışın.',
      9: 'Tamamlanma ve bırakma üzerine düşünün.'
    };
    return guidance[number] || 'Bugün için özel rehberlik bulunamadı.';
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center">
        <div className="text-gold text-xl">🔮 İstatistikler hesaplanıyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night text-white">
      {/* Header */}
      <header className="border-b border-lavender/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-gold" />
            <span className="text-xl font-bold">İstatistikler & İçgörüler</span>
          </div>
          <a href="/dashboard" className="text-lavender hover:text-gold transition-colors">
            ← Dashboard'a Dön
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">İstatistikler & İçgörüler</h1>
          <p className="text-lavender">
            Mistik yolculuğunuzda ilerlemenizi takip edin ve numerolojik rehberliği keşfedin
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-lavender/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-gold text-night'
                  : 'text-lavender hover:text-gold'
              }`}
            >
              Genel Bakış
            </button>
            <button
              onClick={() => setActiveTab('numerology')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'numerology'
                  ? 'bg-gold text-night'
                  : 'text-lavender hover:text-gold'
              }`}
            >
              Numeroloji
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'patterns'
                  ? 'bg-gold text-night'
                  : 'text-lavender hover:text-gold'
              }`}
            >
              Desenler
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && userStats && (
          <div className="space-y-8">
            {/* Key Statistics */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20 text-center">
                <div className="text-3xl font-bold text-gold mb-2">{userStats.totalReadings}</div>
                <div className="text-sm text-lavender">Toplam Okuma</div>
                <div className="text-xs text-gold mt-1">Bu ay: {userStats.thisMonth}</div>
              </div>
              
              <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20 text-center">
                <div className="text-3xl font-bold text-gold mb-2">{userStats.totalCreditsSpent}</div>
                <div className="text-sm text-lavender">Toplam Harcanan Kredi</div>
                <div className="text-xs text-gold mt-1">Bu ay: {userStats.thisMonthSpent}</div>
              </div>
              
              <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20 text-center">
                <div className="text-3xl font-bold text-gold mb-2">{userStats.averagePerMonth.toFixed(1)}</div>
                <div className="text-sm text-lavender">Aylık Ortalama</div>
                <div className="text-xs text-gold mt-1">Okuma sayısı</div>
              </div>
              
              <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20 text-center">
                <div className="text-3xl font-bold text-gold mb-2">{userStats.averagePerReading.toFixed(1)}</div>
                <div className="text-sm text-lavender">Okuma Başına Ortalama</div>
                <div className="text-xs text-gold mt-1">Kredi maliyeti</div>
              </div>
            </div>

            {/* Detailed Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Star className="h-6 w-6 text-gold mr-2" />
                  Okuma Alışkanlıkları
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lavender">En Çok Kullanılan Dizilim:</span>
                    <span className="text-white font-medium">{userStats.favoriteSpread}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lavender">En Aktif Gün:</span>
                    <span className="text-white font-medium">{userStats.mostActiveDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lavender">En Pahalı Okuma:</span>
                    <span className="text-white font-medium">{userStats.mostExpensiveReading} kredi</span>
                  </div>
                </div>
              </div>

              <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="h-6 w-6 text-gold mr-2" />
                  Trend Analizi
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lavender">Bu Ay vs Geçen Ay:</span>
                    <span className={`font-medium ${userStats.thisMonth > userStats.averagePerMonth ? 'text-green-400' : 'text-orange-400'}`}>
                      {userStats.thisMonth > userStats.averagePerMonth ? '📈 Artış' : '📉 Azalış'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lavender">Kredi Verimliliği:</span>
                    <span className="text-white font-medium">
                      {userStats.averagePerReading <= 5 ? '🟢 Yüksek' : userStats.averagePerReading <= 8 ? '🟡 Orta' : '🔴 Düşük'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Numerology Tab */}
        {activeTab === 'numerology' && (
          <div className="space-y-8">
            {numerologyInsights ? (
              <>
                {/* Life Path Number */}
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl p-8 border border-lavender/20">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Hash className="h-8 w-8 text-gold mr-3" />
                    Yaşam Yolu Sayısı: {numerologyInsights.lifePath}
                  </h3>
                  <p className="text-lavender text-lg leading-relaxed">
                    {numerologyInsights.lifePathMeaning}
                  </p>
                </div>

            {/* Personal Year & Month */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Calendar className="h-6 w-6 text-gold mr-2" />
                  Kişisel Yıl: {numerologyInsights.personalYear}
                </h4>
                <p className="text-lavender leading-relaxed">
                  {numerologyInsights.personalYearMeaning}
                </p>
              </div>

              <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-6 border border-lavender/20">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Moon className="h-6 w-6 text-gold mr-2" />
                  Bu Ay: {numerologyInsights.currentMonth}
                </h4>
                <p className="text-lavender leading-relaxed">
                  {numerologyInsights.monthlyGuidance}
                </p>
              </div>
            </div>

                {/* Daily Guidance */}
                <div className="bg-gradient-to-r from-gold/10 to-yellow-500/10 backdrop-blur-sm rounded-xl p-6 border border-gold/20">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Sun className="h-6 w-6 text-gold mr-2" />
                    Bugünün Sayısı: {numerologyInsights.dailyNumber}
                  </h4>
                  <p className="text-lavender leading-relaxed text-lg">
                    {numerologyInsights.dailyGuidance}
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-8 border border-lavender/20 text-center">
                <Hash className="h-16 w-16 text-lavender/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Numeroloji Analizi</h3>
                <p className="text-lavender mb-4">
                  Numeroloji analizi için doğum tarihinizi profilinizde belirtmeniz gerekiyor.
                </p>
                <a
                  href="/dashboard/settings"
                  className="bg-gold hover:bg-gold/80 text-night font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Profil Ayarlarına Git
                </a>
              </div>
            )}
          </div>
        )}

        {/* Patterns Tab */}
        {activeTab === 'patterns' && (
          <div className="space-y-8">
            <div className="bg-lavender/10 backdrop-blur-sm rounded-xl p-8 border border-lavender/20 text-center">
              <Activity className="h-16 w-16 text-lavender/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Desen Analizi</h3>
              <p className="text-lavender">
                Bu özellik yakında eklenecek. Okuma desenlerinizi analiz edip size özel içgörüler sunacağız.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 text-center">
          <a
            href="/dashboard"
            className="bg-gold hover:bg-gold/80 text-night font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Dashboard'a Dön
          </a>
        </div>
      </main>
    </div>
  );
}
