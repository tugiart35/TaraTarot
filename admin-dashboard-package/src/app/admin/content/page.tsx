'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { 
  Plus, 
  Edit, 
  Trash, 
  Eye, 
  Save,
  X,
  FileText,
  Wand2,
  Languages,
  Settings,
  Sparkles,
  BookOpen,
  Brain
} from 'lucide-react';
import SpreadEditor from '@/components/admin/SpreadEditor';

interface Spread {
  id: number;
  name_tr: string;
  name_en: string;
  name_sr: string;
  positions: Array<{
    name: string;
    description: string;
  }>;
  cost_credits: number;
  active: boolean;
  created_at: string;
}

interface NumerologyTemplate {
  id: number;
  type: string;
  content_tr: string;
  content_en: string;
  content_sr: string;
  active: boolean;
  created_at: string;
}

interface AIPrompt {
  id: number;
  type: 'tarot' | 'numerology';
  name: string;
  prompt: string;
  active: boolean;
  created_at: string;
}

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<'spreads' | 'numerology' | 'ai'>('spreads');
  const [loading, setLoading] = useState(true);
  const [spreads, setSpreads] = useState<Spread[]>([]);
  const [numerologyTemplates, setNumerologyTemplates] = useState<NumerologyTemplate[]>([]);
  const [aiPrompts, setAiPrompts] = useState<AIPrompt[]>([]);
  const [showSpreadEditor, setShowSpreadEditor] = useState(false);
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);

  const tabs = [
    { 
      id: 'spreads', 
      name: 'Tarot Dizilimleri', 
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-600',
      description: 'Tarot kart dizilimleri ve pozisyonları'
    },
    { 
      id: 'numerology', 
      name: 'Numeroloji', 
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-600', 
      description: 'Numeroloji hesaplama şablonları'
    },
    { 
      id: 'ai', 
      name: 'AI Promptları', 
      icon: Brain,
      gradient: 'from-green-500 to-emerald-600',
      description: 'AI yorumlama prompt&apos;ları'
    }
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'spreads') {
        // Mock data for spreads
        setSpreads([
          {
            id: 1,
            name_tr: 'Üç Kart Açılımı',
            name_en: 'Three Card Spread',
            name_sr: 'Распоред од три карте',
            positions: [
              { name: 'Geçmiş', description: 'Geçmişinizi etkileyen faktörler' },
              { name: 'Şimdi', description: 'Mevcut durumunuz' },
              { name: 'Gelecek', description: 'Olası gelecek durumlar' }
            ],
            cost_credits: 10,
            active: true,
            created_at: new Date().toISOString()
          }
        ]);
      } else if (activeTab === 'numerology') {
        // Mock data for numerology
        setNumerologyTemplates([
          {
            id: 1,
            type: 'life_path',
            content_tr: 'Yaşam yolu sayınız {number} ...',
            content_en: 'Your life path number {number} ...',
            content_sr: 'Ваш број животног пута {number} ...',
            active: true,
            created_at: new Date().toISOString()
          }
        ]);
      } else if (activeTab === 'ai') {
        // Mock data for AI prompts
        setAiPrompts([
          {
            id: 1,
            type: 'tarot',
            name: 'Genel Tarot Yorumu',
            prompt: 'Bu tarot kartı için detaylı bir yorum yap...',
            active: true,
            created_at: new Date().toISOString()
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="admin-card rounded-2xl p-8 text-center">
          <div className="admin-pulse mb-4">
            <FileText className="h-12 w-12 text-indigo-500 mx-auto" />
          </div>
          <div className="admin-text-shimmer text-xl font-semibold">İçerik yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="admin-card rounded-2xl p-6 admin-hover-lift">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="admin-gradient-accent p-3 rounded-xl">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">İçerik Yönetimi</h1>
              <p className="text-slate-400">Tarot dizilimleri, numeroloji şablonları ve AI promptları</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="admin-glass rounded-lg px-4 py-2">
              <div className="text-sm text-slate-400">Toplam İçerik</div>
              <div className="text-xl font-bold text-white">
                {spreads.length + numerologyTemplates.length + aiPrompts.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="admin-card rounded-2xl p-2">
        <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'spreads' | 'numerology' | 'ai')}
              className={`flex-1 flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-medium transition-all admin-hover-scale touch-target ${
                activeTab === tab.id
                  ? `admin-gradient-${tab.id === 'spreads' ? 'accent' : tab.id === 'numerology' ? 'primary' : 'success'} text-white`
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <div className={`p-2 rounded-lg flex-shrink-0 ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-700/30'}`}>
                <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="font-semibold text-sm sm:text-base truncate">{tab.name}</div>
                <div className="text-xs opacity-80 hidden sm:block">{tab.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="admin-card rounded-2xl p-6 admin-hover-lift">
        {activeTab === 'spreads' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="admin-gradient-accent p-2 rounded-lg mr-3">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                Tarot Dizilimleri
              </h3>
              <button
                onClick={() => setShowSpreadEditor(true)}
                className="admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Yeni Dizilim</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {spreads.map((spread, index) => (
                <div 
                  key={spread.id}
                  className="admin-glass rounded-xl mobile-compact-sm md:p-6 admin-hover-lift admin-hover-scale"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="admin-gradient-accent p-2 rounded-lg">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      spread.active 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {spread.active ? '🟢 Aktif' : '🔴 Pasif'}
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-2">{spread.name_tr}</h4>
                  <p className="text-sm text-slate-400 mb-4">{spread.name_en}</p>

                  <div className="space-y-3 mb-4">
                    <div className="admin-glass rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">Pozisyon Sayısı</span>
                        <span className="text-white font-medium">{spread.positions.length}</span>
                      </div>
                    </div>
                    <div className="admin-glass rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">Kredi Maliyeti</span>
                        <span className="text-amber-400 font-medium">{spread.cost_credits}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedSpread(spread);
                        setShowSpreadEditor(true);
                      }}
                      className="flex-1 admin-glass hover:bg-slate-700/50 text-white p-2 rounded-lg admin-hover-scale transition-colors flex items-center justify-center space-x-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="text-sm">Düzenle</span>
                    </button>
                    <button className="admin-gradient-danger text-white p-2 rounded-lg admin-hover-scale transition-all">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {spreads.length === 0 && (
              <div className="text-center py-12">
                <Sparkles className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Henüz Dizilim Yok</h3>
                <p className="text-slate-400 mb-6">İlk tarot diziliminizi oluşturun</p>
                <button 
                  onClick={() => setShowSpreadEditor(true)}
                  className="admin-btn-primary px-6 py-2 rounded-lg"
                >
                  İlk Diziliminizi Oluşturun
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'numerology' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="admin-gradient-primary p-2 rounded-lg mr-3">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                Numeroloji Şablonları
              </h3>
              <button className="admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Yeni Şablon</span>
              </button>
            </div>

            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Yakında Gelecek</h3>
              <p className="text-slate-400">Numeroloji şablon editörü yakında eklenecek</p>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="admin-gradient-success p-2 rounded-lg mr-3">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                AI Prompt Yönetimi
              </h3>
              <button className="admin-btn-primary px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Yeni Prompt</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiPrompts.map((prompt, index) => (
                <div 
                  key={prompt.id}
                  className="admin-glass rounded-xl p-6 admin-hover-lift"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`admin-gradient-${prompt.type === 'tarot' ? 'accent' : 'primary'} p-2 rounded-lg`}>
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      prompt.active 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {prompt.active ? '🟢 Aktif' : '🔴 Pasif'}
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-2">{prompt.name}</h4>
                  <div className={`inline-block px-2 py-1 rounded text-xs mb-4 ${
                    prompt.type === 'tarot' 
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {prompt.type === 'tarot' ? '🔮 Tarot' : '🔢 Numeroloji'}
                  </div>

                  <div className="admin-glass rounded-lg p-3 mb-4">
                    <div className="text-sm text-slate-400 mb-2">Prompt İçeriği</div>
                    <div className="text-white text-sm line-clamp-3">
                      {prompt.prompt.length > 100 
                        ? prompt.prompt.substring(0, 100) + '...'
                        : prompt.prompt}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 admin-glass hover:bg-slate-700/50 text-white p-2 rounded-lg admin-hover-scale transition-colors flex items-center justify-center space-x-1">
                      <Edit className="h-4 w-4" />
                      <span className="text-sm">Düzenle</span>
                    </button>
                    <button className="admin-gradient-danger text-white p-2 rounded-lg admin-hover-scale">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {aiPrompts.length === 0 && (
              <div className="text-center py-12">
                <Brain className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Henüz AI Prompt Yok</h3>
                <p className="text-slate-400 mb-6">İlk AI prompt&apos;unuzu oluşturun</p>
                <button className="admin-btn-primary px-6 py-2 rounded-lg">
                  İlk Prompt&apos;unuzu Oluşturun
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Spread Editor Modal */}
      {showSpreadEditor && (
        <SpreadEditor
          spread={selectedSpread || undefined}
          onClose={() => {
            setShowSpreadEditor(false);
            setSelectedSpread(null);
          }}
          onSave={(spread) => {
            // Handle save logic
            setShowSpreadEditor(false);
            setSelectedSpread(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}