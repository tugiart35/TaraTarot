'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { X, Plus, Trash, Save, Eye } from 'lucide-react';
// import type { SpreadConfig } from '../../types/spread';

interface SpreadPosition {
  id: number;
  name_tr: string;
  name_en: string;
  name_sr: string;
  x: number;
  y: number;
  description_tr?: string;
  description_en?: string;
  description_sr?: string;
}

interface Spread {
  id?: number;
  name_tr: string;
  name_en: string;
  name_sr: string;
  positions: SpreadPosition[];
  cost_credits: number;
  active: boolean;
  created_at?: string;
}

// SpreadFormData type removed as it was unused

interface SpreadEditorProps {
  spread?: Spread;
  onClose: () => void;
  onSave: (spread: Spread) => void;
  isEdit?: boolean;
}

export default function SpreadEditor({ spread, onClose, onSave, isEdit = false }: SpreadEditorProps) {
  const [formData, setFormData] = useState<Spread>({
    name_tr: '',
    name_en: '',
    name_sr: '',
    positions: [],
    cost_credits: 9,
    active: true
  });
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (spread) {
      setFormData(spread);
    }
  }, [spread]);

  const handleSave = async () => {
    if (!formData.name_tr.trim() || !formData.name_en.trim() || !formData.name_sr.trim()) {
      alert('Lütfen tüm dillerde isim girin');
      return;
    }

    if (formData.positions.length === 0) {
      alert('En az bir pozisyon eklemelisiniz');
      return;
    }

    setLoading(true);
    try {
      if (isEdit && spread?.id) {
        // Update existing spread
        const { error } = await supabase
          .from('spreads')
          .update({
            name_tr: formData.name_tr,
            name_en: formData.name_en,
            name_sr: formData.name_sr,
            positions: formData.positions,
            cost_credits: formData.cost_credits,
            active: formData.active
          })
          .eq('id', spread.id);
        
        if (error) throw error;
      } else {
        // Create new spread
        const { data, error } = await supabase
          .from('spreads')
          .insert({
            name_tr: formData.name_tr,
            name_en: formData.name_en,
            name_sr: formData.name_sr,
            positions: formData.positions,
            cost_credits: formData.cost_credits,
            active: formData.active
          })
          .select()
          .single();
        
        if (error) throw error;
        formData.id = data.id;
      }
      
      onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving spread:', error);
      alert('Dizilim kaydedilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const addPosition = () => {
    const newPosition: SpreadPosition = {
      id: Date.now(),
      name_tr: `Pozisyon ${formData.positions.length + 1}`,
      name_en: `Position ${formData.positions.length + 1}`,
      name_sr: `Pozicija ${formData.positions.length + 1}`,
      x: 50,
      y: 50 + (formData.positions.length * 10), // Slight offset for each new position
      description_tr: '',
      description_en: '',
      description_sr: ''
    };
    
    setFormData({
      ...formData,
      positions: [...formData.positions, newPosition]
    });
  };

  const updatePosition = (index: number, field: string, value: string | number) => {
    const updatedPositions = [...formData.positions];
    const currentPosition = updatedPositions[index];
    if (currentPosition) {
      updatedPositions[index] = { ...currentPosition, [field]: value };
      setFormData({ ...formData, positions: updatedPositions });
    }
  };

  const removePosition = (index: number) => {
    const updatedPositions = formData.positions.filter((_, i) => i !== index);
    setFormData({ ...formData, positions: updatedPositions });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-night border border-gold/30 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gold">
            {isEdit ? 'Dizilim Düzenle' : 'Yeni Dizilim Oluştur'}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-3 py-1 bg-lavender/20 hover:bg-lavender/30 text-lavender rounded flex items-center"
            >
              <Eye className="h-4 w-4 mr-1" />
              {previewMode ? 'Düzenle' : 'Önizleme'}
            </button>
            <button
              onClick={onClose}
              className="text-lavender hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {!previewMode ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Form Section */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h4 className="text-lg font-medium text-gold mb-4">Temel Bilgiler</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-lavender mb-1">
                        İsim (Türkçe)
                      </label>
                      <input
                        type="text"
                        value={formData.name_tr}
                        onChange={(e) => setFormData({...formData, name_tr: e.target.value})}
                        placeholder="Örn: Geçmiş Şimdi Gelecek"
                        className="w-full p-3 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-lavender mb-1">
                        Name (English)
                      </label>
                      <input
                        type="text"
                        value={formData.name_en}
                        onChange={(e) => setFormData({...formData, name_en: e.target.value})}
                        placeholder="e.g. Past Present Future"
                        className="w-full p-3 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-lavender mb-1">
                        Ime (Srpski)
                      </label>
                      <input
                        type="text"
                        value={formData.name_sr}
                        onChange={(e) => setFormData({...formData, name_sr: e.target.value})}
                        placeholder="npr. Prošlost Sadašnjost Budućnost"
                        className="w-full p-3 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-lavender mb-1">
                          Kredi Maliyeti
                        </label>
                        <input
                          type="number"
                          value={formData.cost_credits}
                          onChange={(e) => setFormData({...formData, cost_credits: parseInt(e.target.value) || 0})}
                          min="1"
                          className="w-full p-3 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label className="flex items-center mt-6">
                          <input
                            type="checkbox"
                            checked={formData.active}
                            onChange={(e) => setFormData({...formData, active: e.target.checked})}
                            className="rounded border-lavender/30 text-gold focus:ring-gold/50 bg-night/50"
                          />
                          <span className="ml-2 text-lavender">Aktif</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Positions */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-gold">Pozisyonlar</h4>
                    <button
                      onClick={addPosition}
                      className="px-3 py-1 bg-gold hover:bg-gold/90 text-night rounded flex items-center text-sm"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Pozisyon Ekle
                    </button>
                  </div>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {formData.positions.map((position, index) => (
                      <div key={position.id} className="bg-lavender/5 p-3 rounded border border-lavender/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">Pozisyon {index + 1}</span>
                          <button
                            onClick={() => removePosition(index)}
                            className="text-red-400 hover:text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <input
                            type="text"
                            value={position.name_tr}
                            onChange={(e) => updatePosition(index, 'name_tr', e.target.value)}
                            placeholder="Türkçe isim"
                            className="p-2 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none text-sm"
                          />
                          <input
                            type="text"
                            value={position.name_en}
                            onChange={(e) => updatePosition(index, 'name_en', e.target.value)}
                            placeholder="English name"
                            className="p-2 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none text-sm"
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={position.name_sr}
                            onChange={(e) => updatePosition(index, 'name_sr', e.target.value)}
                            placeholder="Srpski ime"
                            className="p-2 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none text-sm"
                          />
                          <input
                            type="number"
                            value={position.x}
                            onChange={(e) => updatePosition(index, 'x', parseInt(e.target.value) || 0)}
                            placeholder="X %"
                            min="0"
                            max="100"
                            className="p-2 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none text-sm"
                          />
                          <input
                            type="number"
                            value={position.y}
                            onChange={(e) => updatePosition(index, 'y', parseInt(e.target.value) || 0)}
                            placeholder="Y %"
                            min="0"
                            max="100"
                            className="p-2 rounded bg-night/50 border border-lavender/30 text-white placeholder-lavender/70 focus:border-gold focus:outline-none text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div>
                <h4 className="text-lg font-medium text-gold mb-4">Pozisyon Önizlemesi</h4>
                <div className="bg-lavender/5 rounded-lg p-4 border border-lavender/10 relative h-96">
                  {formData.positions.map((position, index) => (
                    <div
                      key={position.id}
                      className="absolute bg-gold text-night px-2 py-1 rounded text-xs font-medium cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`
                      }}
                      title={`${position.name_tr} (${position.x}%, ${position.y}%)`}
                    >
                      {index + 1}
                    </div>
                  ))}
                  
                  {formData.positions.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-lavender/50">Pozisyon ekleyin</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Preview Mode */
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gold mb-2">{formData.name_tr}</h2>
              <p className="text-lavender mb-4">{formData.cost_credits} kredi</p>
              
              <div className="bg-lavender/5 rounded-lg p-8 border border-lavender/10 relative h-96 mx-auto max-w-2xl">
                {formData.positions.map((position, index) => (
                  <div
                    key={position.id}
                    className="absolute bg-gold text-night px-3 py-2 rounded font-medium cursor-pointer transform -translate-x-1/2 -translate-y-1/2 min-w-12 text-center"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`
                    }}
                  >
                    <div className="text-xs">{index + 1}</div>
                    <div className="text-xs mt-1">{position.name_tr}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-lavender/20 pt-4 mt-6">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-lavender/30 text-lavender rounded hover:bg-lavender/10"
            >
              İptal
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-gold hover:bg-gold/90 text-night rounded font-medium disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-night mr-2"></div>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEdit ? 'Güncelle' : 'Oluştur'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
