'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { 
  Plus, 
  Edit, 
  Trash, 
  Check, 
  X, 
  Euro, 
  Coins,
  Package,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Eye,
  ToggleLeft,
  ToggleRight,
  Sparkles
} from 'lucide-react';

interface Package {
  id: number;
  name: string;
  credits: number;
  price_eur: number;
  price_try: number;
  active: boolean;
  created_at: string;
  description?: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    credits: 0,
    price_eur: 0,
    price_try: 0,
    active: true
  });
  const [currency, setCurrency] = useState<'EUR' | 'TRY'>('EUR');

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        setPackages([]);
        return;
      }
      
      // Format packages safely
      const formattedPackages = (data || []).map(pkg => ({
        id: pkg.id || Date.now(),
        name: pkg.name || 'Unnamed Package',
        description: pkg.description || '',
        credits: pkg.credits || 0,
        price_eur: pkg.price_eur || 0,
        price_try: pkg.price_try || 0,
        active: pkg.active !== false,
        created_at: pkg.created_at || new Date().toISOString()
      }));
      
      setPackages(formattedPackages);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePackage = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .insert({
          name: formData.name,
          description: formData.description,
          credits: formData.credits,
          price_eur: formData.price_eur,
          price_try: formData.price_try,
          active: formData.active
        })
        .select();
      
      if (error) throw error;
      
      setPackages([...packages, data[0]]);
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  const handleUpdatePackage = async () => {
    if (!selectedPackage) return;
    
    try {
      const { error } = await supabase
        .from('packages')
        .update({
          name: formData.name,
          description: formData.description,
          credits: formData.credits,
          price_eur: formData.price_eur,
          price_try: formData.price_try,
          active: formData.active
        })
        .eq('id', selectedPackage.id);
      
      if (error) throw error;
      
      fetchPackages();
      setShowEditModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleDeletePackage = async () => {
    if (!selectedPackage) return;
    
    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', selectedPackage.id);
      
      if (error) throw error;
      
      setPackages(packages.filter(pkg => pkg.id !== selectedPackage.id));
      setShowDeleteModal(false);
      setSelectedPackage(null);
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleToggleStatus = async (packageId: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('packages')
        .update({ active: !currentStatus })
        .eq('id', packageId);
      
      if (error) throw error;
      fetchPackages();
    } catch (error) {
      console.error('Error toggling package status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      credits: 0,
      price_eur: 0,
      price_try: 0,
      active: true
    });
    setSelectedPackage(null);
  };

  const openEditModal = (pkg: Package) => {
    setSelectedPackage(pkg);
    setFormData({
      name: pkg.name,
      description: pkg.description || '',
      credits: pkg.credits,
      price_eur: pkg.price_eur,
      price_try: pkg.price_try,
      active: pkg.active
    });
    setShowEditModal(true);
  };

  const getPackagePopularity = (credits: number) => {
    if (credits >= 1000) return { label: 'Premium', color: 'purple', icon: '👑' };
    if (credits >= 500) return { label: 'Popüler', color: 'blue', icon: '⭐' };
    if (credits >= 100) return { label: 'Standart', color: 'green', icon: '✨' };
    return { label: 'Başlangıç', color: 'gray', icon: '🌟' };
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="admin-card rounded-2xl p-8 text-center">
          <div className="admin-pulse mb-4">
            <Package className="h-12 w-12 text-orange-500 mx-auto" />
          </div>
          <div className="admin-text-shimmer text-xl font-semibold">Paketler yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="admin-card rounded-2xl mobile-compact admin-hover-lift">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="admin-gradient-warning p-3 rounded-xl flex-shrink-0">
                <Package className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-white truncate">Paket Yönetimi</h1>
                <p className="text-slate-400 text-sm md:text-base hidden sm:block">Kredi paketlerini oluştur ve düzenle</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowCreateModal(true)}
              className="admin-btn-primary p-3 md:px-4 md:py-2 rounded-lg flex items-center space-x-2 touch-target flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Yeni Paket</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="admin-glass rounded-lg px-3 py-2 text-center">
              <div className="text-xs text-slate-400">Toplam</div>
              <div className="text-lg font-bold text-white">{packages.length}</div>
            </div>
            <div className="admin-glass rounded-lg px-3 py-2 text-center">
              <div className="text-xs text-slate-400">Aktif</div>
              <div className="text-lg font-bold text-green-400">{packages.filter(p => p.active).length}</div>
            </div>
            <div className="admin-glass rounded-lg px-3 py-2 text-center sm:block">
              <div className="text-xs text-slate-400">Pasif</div>
              <div className="text-lg font-bold text-red-400">{packages.filter(p => !p.active).length}</div>
            </div>
          </div>
        </div>

        {/* Currency Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <span className="text-slate-400 text-sm">Fiyat Görünümü:</span>
          <div className="admin-glass rounded-lg p-1 flex">
            <button
              onClick={() => setCurrency('EUR')}
              className={`flex-1 sm:flex-initial px-3 py-2 rounded text-sm font-medium transition-all touch-target ${
                currency === 'EUR' 
                  ? 'admin-gradient-primary text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              💶 EUR
            </button>
            <button
              onClick={() => setCurrency('TRY')}
              className={`flex-1 sm:flex-initial px-3 py-2 rounded text-sm font-medium transition-all touch-target ${
                currency === 'TRY' 
                  ? 'admin-gradient-primary text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              💸 TRY
            </button>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {packages.map((pkg, index) => {
          const popularity = getPackagePopularity(pkg.credits);
          return (
            <div 
              key={pkg.id}
              className={`admin-card rounded-2xl mobile-compact-sm md:p-6 admin-hover-lift admin-hover-scale relative overflow-hidden ${
                !pkg.active ? 'opacity-60' : ''
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => handleToggleStatus(pkg.id, pkg.active)}
                  className={`p-1 rounded-lg admin-hover-scale ${
                    pkg.active 
                      ? 'text-green-400 bg-green-500/20' 
                      : 'text-red-400 bg-red-500/20'
                  }`}
                >
                  {pkg.active ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                </button>
              </div>

              {/* Popularity Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium mb-4 ${
                popularity.color === 'purple' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                popularity.color === 'blue' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                popularity.color === 'green' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                'bg-gray-500/20 text-gray-300 border border-gray-500/30'
              }`}>
                <span className="mr-1">{popularity.icon}</span>
                {popularity.label}
              </div>

              {/* Package Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                {pkg.description && (
                  <p className="text-slate-400 text-sm mb-4">{pkg.description}</p>
                )}
                
                {/* Credits Display */}
                <div className="admin-gradient-warning rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Coins className="h-6 w-6 text-white" />
                    <span className="text-2xl font-bold text-white">{pkg.credits.toLocaleString()}</span>
                    <span className="text-white">Kredi</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="admin-glass rounded-xl p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {currency === 'EUR' ? formatPrice(pkg.price_eur, 'EUR') : formatPrice(pkg.price_try, 'TRY')}
                    </div>
                    <div className="text-sm text-slate-400">
                      {currency === 'EUR' 
                        ? `≈ ${formatPrice(pkg.price_try, 'TRY')}` 
                        : `≈ ${formatPrice(pkg.price_eur, 'EUR')}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="admin-glass rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1">Kredi/€</div>
                  <div className="text-sm font-bold text-blue-400">
                    {(pkg.credits / pkg.price_eur).toFixed(0)}
                  </div>
                </div>
                <div className="admin-glass rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1">Durum</div>
                  <div className={`text-xs font-medium ${pkg.active ? 'text-green-400' : 'text-red-400'}`}>
                    {pkg.active ? '🟢 Aktif' : '🔴 Pasif'}
                  </div>
                </div>
              </div>

              {/* Package Meta */}
              <div className="admin-glass rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Oluşturulma</span>
                  <span className="text-white">
                    {new Date(pkg.created_at).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-1 md:space-x-2">
                <button
                  onClick={() => openEditModal(pkg)}
                  className="flex-1 admin-glass hover:bg-slate-700/50 text-white p-2 rounded-lg admin-hover-scale transition-colors flex items-center justify-center space-x-1 touch-target"
                >
                  <Edit className="h-4 w-4" />
                  <span className="text-xs md:text-sm hidden sm:inline">Düzenle</span>
                </button>
                
                <button
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setShowDeleteModal(true);
                  }}
                  className="admin-gradient-danger text-white p-2 rounded-lg admin-hover-scale transition-all touch-target flex-shrink-0"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {packages.length === 0 && !loading && (
        <div className="admin-card rounded-2xl p-12 text-center">
          <Package className="h-20 w-20 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Henüz Paket Yok</h3>
          <p className="text-slate-400 mb-6">İlk kredi paketinizi oluşturun</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="admin-btn-primary px-6 py-2 rounded-lg"
          >
            İlk Paketinizi Oluşturun
          </button>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="admin-card rounded-2xl p-6 w-full max-w-2xl admin-hover-scale">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="admin-gradient-success p-2 rounded-lg mr-3">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                Yeni Paket Oluştur
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 admin-glass rounded-lg admin-hover-scale"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Paket Adı</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="örn: Başlangıç Paketi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Paket açıklaması..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Kredi Miktarı</label>
                  <input
                    type="number"
                    value={formData.credits}
                    onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value) || 0})}
                    className="w-full p-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Fiyat (EUR)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price_eur}
                    onChange={(e) => setFormData({...formData, price_eur: parseFloat(e.target.value) || 0})}
                    className="w-full p-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Fiyat (TRY)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price_try}
                    onChange={(e) => setFormData({...formData, price_try: parseFloat(e.target.value) || 0})}
                    className="w-full p-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({...formData, active: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="active" className="text-sm text-slate-300">Paketi aktif olarak oluştur</label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 admin-glass hover:bg-slate-700/50 text-slate-300 p-3 rounded-lg admin-hover-scale transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleCreatePackage}
                className="flex-1 admin-btn-primary p-3 rounded-lg"
              >
                Paketi Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="admin-card rounded-2xl p-6 w-full max-w-2xl admin-hover-scale">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="admin-gradient-accent p-2 rounded-lg mr-3">
                  <Edit className="h-5 w-5 text-white" />
                </div>
                Paket Düzenle
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 admin-glass rounded-lg admin-hover-scale"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Paket Adı</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Kredi Miktarı</label>
                  <input
                    type="number"
                    value={formData.credits}
                    onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value) || 0})}
                    className="w-full p-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Fiyat (EUR)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price_eur}
                    onChange={(e) => setFormData({...formData, price_eur: parseFloat(e.target.value) || 0})}
                    className="w-full p-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Fiyat (TRY)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price_try}
                    onChange={(e) => setFormData({...formData, price_try: parseFloat(e.target.value) || 0})}
                    className="w-full p-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="edit-active"
                  checked={formData.active}
                  onChange={(e) => setFormData({...formData, active: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="edit-active" className="text-sm text-slate-300">Paket aktif</label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 admin-glass hover:bg-slate-700/50 text-slate-300 p-3 rounded-lg admin-hover-scale transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleUpdatePackage}
                className="flex-1 admin-btn-primary p-3 rounded-lg"
              >
                Güncelle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="admin-card rounded-2xl p-6 w-full max-w-md admin-hover-scale">
            <div className="text-center">
              <div className="admin-gradient-danger p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trash className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Paketi Sil</h3>
              <p className="text-slate-400 mb-6">
                <strong>{selectedPackage.name}</strong> paketini silmek istediğinizden emin misiniz? 
                Bu işlem geri alınamaz.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 admin-glass hover:bg-slate-700/50 text-slate-300 p-3 rounded-lg admin-hover-scale transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleDeletePackage}
                  className="flex-1 admin-gradient-danger p-3 rounded-lg text-white admin-hover-scale"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}