'use client';

import { useState, useEffect } from 'react';
import { TestTube, Play, Pause, BarChart3, Users, Eye, Plus, Target } from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  traffic_split: number; // Percentage for variant B
  start_date: string | null;
  end_date: string | null;
  variant_a: {
    name: string;
    description: string;
    config: Record<string, unknown>;
  };
  variant_b: {
    name: string;
    description: string;
    config: Record<string, unknown>;
  };
  metrics: {
    total_users: number;
    variant_a_users: number;
    variant_b_users: number;
    variant_a_conversions: number;
    variant_b_conversions: number;
    confidence_level: number;
  };
  created_at: string;
}

interface TestResult {
  variant: 'A' | 'B';
  users: number;
  conversions: number;
  conversion_rate: number;
  improvement: number;
}

export default function ABTestManager() {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = () => {
    // Mock data - in production this would come from database
    const mockTests: ABTest[] = [
      {
        id: '1',
        name: 'Ana Sayfa Hero Bölümü',
        description: 'Farklı call-to-action buton renkleri test ediliyor',
        status: 'running',
        traffic_split: 50,
        start_date: '2024-01-10T00:00:00Z',
        end_date: '2024-01-24T23:59:59Z',
        variant_a: {
          name: 'Mevcut (Altın)',
          description: 'Altın renkli buton',
          config: { button_color: '#FFD700', button_text: 'Hemen Başla' }
        },
        variant_b: {
          name: 'Yeşil Buton',
          description: 'Yeşil renkli buton',
          config: { button_color: '#10B981', button_text: 'Ücretsiz Dene' }
        },
        metrics: {
          total_users: 1250,
          variant_a_users: 625,
          variant_b_users: 625,
          variant_a_conversions: 87,
          variant_b_conversions: 105,
          confidence_level: 92.5
        },
        created_at: '2024-01-10T00:00:00Z'
      },
      {
        id: '2',
        name: 'Fiyat Sayfası Layout',
        description: 'Dikey vs horizontal paket gösterimi',
        status: 'completed',
        traffic_split: 30,
        start_date: '2024-01-01T00:00:00Z',
        end_date: '2024-01-09T23:59:59Z',
        variant_a: {
          name: 'Dikey Kartlar',
          description: 'Geleneksel dikey kart layout',
          config: { layout: 'vertical', cards_per_row: 3 }
        },
        variant_b: {
          name: 'Horizontal Liste',
          description: 'Yatay liste formatı',
          config: { layout: 'horizontal', show_comparison: true }
        },
        metrics: {
          total_users: 890,
          variant_a_users: 623,
          variant_b_users: 267,
          variant_a_conversions: 34,
          variant_b_conversions: 21,
          confidence_level: 85.2
        },
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '3',
        name: 'Kayıt Formu Optimizasyonu',
        description: 'Form alanı sayısının etkisi',
        status: 'draft',
        traffic_split: 50,
        start_date: null,
        end_date: null,
        variant_a: {
          name: 'Minimal Form',
          description: 'Sadece email ve şifre',
          config: { fields: ['email', 'password'] }
        },
        variant_b: {
          name: 'Detaylı Form',
          description: 'Email, şifre, isim ve telefon',
          config: { fields: ['email', 'password', 'name', 'phone'] }
        },
        metrics: {
          total_users: 0,
          variant_a_users: 0,
          variant_b_users: 0,
          variant_a_conversions: 0,
          variant_b_conversions: 0,
          confidence_level: 0
        },
        created_at: '2024-01-15T00:00:00Z'
      }
    ];
    setTests(mockTests);
  };

  const calculateResults = (test: ABTest): { variantA: TestResult; variantB: TestResult } => {
    const variantA: TestResult = {
      variant: 'A',
      users: test.metrics.variant_a_users,
      conversions: test.metrics.variant_a_conversions,
      conversion_rate: test.metrics.variant_a_users > 0 ? 
        (test.metrics.variant_a_conversions / test.metrics.variant_a_users) * 100 : 0,
      improvement: 0
    };

    const variantB: TestResult = {
      variant: 'B',
      users: test.metrics.variant_b_users,
      conversions: test.metrics.variant_b_conversions,
      conversion_rate: test.metrics.variant_b_users > 0 ? 
        (test.metrics.variant_b_conversions / test.metrics.variant_b_users) * 100 : 0,
      improvement: 0
    };

    // Calculate improvement
    if (variantA.conversion_rate > 0) {
      variantB.improvement = ((variantB.conversion_rate - variantA.conversion_rate) / variantA.conversion_rate) * 100;
    }

    return { variantA, variantB };
  };

  const toggleTestStatus = async (testId: string) => {
    setLoading(true);
    try {
      setTests(prev => prev.map(test => {
        if (test.id === testId) {
          let newStatus = test.status;
          if (test.status === 'draft') newStatus = 'running';
          else if (test.status === 'running') newStatus = 'paused';
          else if (test.status === 'paused') newStatus = 'running';
          
          return {
            ...test,
            status: newStatus,
            start_date: newStatus === 'running' && !test.start_date ? new Date().toISOString() : test.start_date
          };
        }
        return test;
      }));
    } catch (error) {
      console.error('Error toggling test status:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeTest = async (testId: string) => {
    setTests(prev => prev.map(test => 
      test.id === testId 
        ? { ...test, status: 'completed', end_date: new Date().toISOString() } 
        : test
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/20';
      case 'draft': return 'text-lavender bg-lavender/20';
      default: return 'text-lavender bg-lavender/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return 'Çalışıyor';
      case 'paused': return 'Duraklatıldı';
      case 'completed': return 'Tamamlandı';
      case 'draft': return 'Taslak';
      default: return status;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Belirlenmedi';
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TestTube className="h-6 w-6 text-gold" />
          <h3 className="text-lg font-semibold text-gold">A/B Test Yönetimi</h3>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-gold hover:bg-gold/90 text-night rounded font-medium flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Test
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-lavender">Aktif Testler</p>
              <p className="text-2xl font-bold text-green-400">
                {tests.filter(t => t.status === 'running').length}
              </p>
            </div>
            <Play className="h-8 w-8 text-green-400/50" />
          </div>
        </div>

        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-lavender">Tamamlanan</p>
              <p className="text-2xl font-bold text-blue-400">
                {tests.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-400/50" />
          </div>
        </div>

        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-lavender">Toplam Katılımcı</p>
              <p className="text-2xl font-bold text-gold">
                {tests.reduce((sum, test) => sum + test.metrics.total_users, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-gold/50" />
          </div>
        </div>

        <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-lavender">Ortalama Güven</p>
              <p className="text-2xl font-bold text-white">
                {(tests.filter(t => t.status === 'completed')
                  .reduce((sum, test) => sum + test.metrics.confidence_level, 0) / 
                  Math.max(tests.filter(t => t.status === 'completed').length, 1)).toFixed(1)}%
              </p>
            </div>
            <Target className="h-8 w-8 text-white/50" />
          </div>
        </div>
      </div>

      {/* Tests List */}
      <div className="space-y-4">
        {tests.map((test) => {
          const results = calculateResults(test);
          return (
            <div key={test.id} className="bg-lavender/5 rounded-lg p-6 border border-lavender/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-white">{test.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(test.status)}`}>
                      {getStatusText(test.status)}
                    </span>
                  </div>
                  <p className="text-sm text-lavender">{test.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {test.status === 'draft' && (
                    <button
                      onClick={() => toggleTestStatus(test.id)}
                      disabled={loading}
                      className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded"
                      title="Testi Başlat"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  
                  {test.status === 'running' && (
                    <>
                      <button
                        onClick={() => toggleTestStatus(test.id)}
                        disabled={loading}
                        className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded"
                        title="Testi Duraklat"
                      >
                        <Pause className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => completeTest(test.id)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded"
                        title="Testi Tamamla"
                      >
                        <Target className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  
                  {test.status === 'paused' && (
                    <button
                      onClick={() => toggleTestStatus(test.id)}
                      disabled={loading}
                      className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded"
                      title="Testi Devam Ettir"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedTest(test)}
                    className="p-2 bg-lavender/20 hover:bg-lavender/30 text-lavender rounded"
                    title="Detayları Görüntüle"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Test Info */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-lavender">Trafik Bölümü:</span>
                  <span className="text-white ml-2">{test.traffic_split}% Variant B</span>
                </div>
                <div>
                  <span className="text-lavender">Başlangıç:</span>
                  <span className="text-white ml-2">{formatDate(test.start_date)}</span>
                </div>
                <div>
                  <span className="text-lavender">Bitiş:</span>
                  <span className="text-white ml-2">{formatDate(test.end_date)}</span>
                </div>
                <div>
                  <span className="text-lavender">Toplam Kullanıcı:</span>
                  <span className="text-white ml-2">{test.metrics.total_users}</span>
                </div>
              </div>

              {/* Results */}
              {test.metrics.total_users > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Variant A */}
                  <div className="bg-night/30 rounded p-4">
                    <h5 className="font-medium text-white mb-2">
                      {test.variant_a.name} (Kontrol)
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-lavender">Kullanıcılar:</span>
                        <span className="text-white">{results.variantA.users}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-lavender">Dönüşümler:</span>
                        <span className="text-white">{results.variantA.conversions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-lavender">Dönüşüm Oranı:</span>
                        <span className="text-white">{results.variantA.conversion_rate.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Variant B */}
                  <div className="bg-night/30 rounded p-4">
                    <h5 className="font-medium text-white mb-2">
                      {test.variant_b.name} (Varyant)
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-lavender">Kullanıcılar:</span>
                        <span className="text-white">{results.variantB.users}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-lavender">Dönüşümler:</span>
                        <span className="text-white">{results.variantB.conversions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-lavender">Dönüşüm Oranı:</span>
                        <span className="text-white">{results.variantB.conversion_rate.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-lavender">İyileştirme:</span>
                        <span className={`font-medium ${
                          results.variantB.improvement > 0 ? 'text-green-400' : 
                          results.variantB.improvement < 0 ? 'text-red-400' : 'text-white'
                        }`}>
                          {results.variantB.improvement > 0 ? '+' : ''}{results.variantB.improvement.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Confidence Level */}
              {test.metrics.confidence_level > 0 && (
                <div className="mt-4 p-3 bg-gold/10 rounded border border-gold/20">
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-medium">İstatistiksel Güven Düzeyi</span>
                    <span className="text-gold font-bold">{test.metrics.confidence_level}%</span>
                  </div>
                  <div className="w-full bg-night rounded-full h-2 mt-2">
                    <div 
                      className="bg-gold h-2 rounded-full transition-all duration-300"
                      style={{ width: `${test.metrics.confidence_level}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Test Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-night border border-gold/30 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gold">Yeni A/B Test</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-lavender hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="text-center py-8">
              <TestTube className="h-16 w-16 text-lavender/50 mx-auto mb-4" />
              <p className="text-lavender">A/B Test oluşturma arayüzü yakında eklenecek</p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-lavender/10 hover:bg-lavender/20 text-lavender rounded"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Detail Modal */}
      {selectedTest && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-night border border-gold/30 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gold">{selectedTest.name}</h3>
              <button
                onClick={() => setSelectedTest(null)}
                className="text-lavender hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="text-center py-8">
              <BarChart3 className="h-16 w-16 text-lavender/50 mx-auto mb-4" />
              <p className="text-lavender">Detaylı test analizi arayüzü yakında eklenecek</p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedTest(null)}
                className="px-4 py-2 bg-lavender/10 hover:bg-lavender/20 text-lavender rounded"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
