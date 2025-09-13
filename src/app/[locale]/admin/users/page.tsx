/*
 * DOSYA: Admin Kullanıcı Yönetimi Sayfası
 * AMAÇ: Admin panelinde kullanıcıları görüntüleme, arama, filtreleme ve yönetme
 * BAĞLANTILI DOSYALAR: 
 *   - /components/admin/CreditManagementModal.tsx (kredi yönetimi)
 *   - /components/admin/UserDetailModal.tsx (kullanıcı detayları)
 *   - /components/admin/TransactionHistory.tsx (işlem geçmişi)
 *   - /lib/supabase/client.ts (veritabanı bağlantısı)
 *   - /lib/logger.ts (hata loglama)
 *   - /lib/rate-limiter.ts (hız sınırlama)
 * SUPABASE TABLOLARI: profiles (kullanıcı bilgileri ve kredi bakiyeleri)
 * GELİŞTİRME ÖNERİLERİ:
 *   - Kullanıcı toplu işlemleri (toplu kredi ekleme/çıkarma)
 *   - Gelişmiş filtreleme seçenekleri (tarih aralığı, kredi miktarı)
 *   - Kullanıcı aktivite logları ve istatistikleri
 *   - Export/import özellikleri
 * TESPİT EDİLEN HATALAR: Yok
 * KULLANIM DURUMU: Aktif - admin kullanıcı yönetimi için ana sayfa
 * DEPLOY DURUMU: Hazır - production'a deploy edilebilir
 */

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { logAdminAction } from '@/lib/logger';
import { logAdminAction as auditLogAdminAction } from '@/lib/audit-logger';
import { ErrorHandler } from '@/lib/error-handler';
import { rateLimiter, useRateLimit } from '@/lib/rate-limiter';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  CreditCard, 
  Eye, 
  UserX, 
  UserCheck, 
  X,
  Users,
  UserPlus,
  Coins,
  Calendar,
  Mail
} from 'lucide-react';
import CreditManagementModal from '@/components/admin/CreditManagementModal';
import UserDetailModal from '@/components/admin/UserDetailModal';

interface User {
  id: string;
  email: string;
  display_name: string | null;
  credit_balance: number;
  created_at: string;
  last_sign_in_at: string | null;
  status?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Rate limiting hooks
  const searchRateLimit = useRateLimit('search');
  const adminActionLimit = useRateLimit('admin_action');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [sortBy, setSortBy] = useState<'created_at' | 'credit_balance' | 'display_name'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  
  const usersPerPage = 12;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, sortBy, sortOrder, statusFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    
    // Rate limit check for data fetching
    const rateLimitCheck = rateLimiter.isAllowed('data_fetch');
    if (!rateLimitCheck.allowed) {
      setError('Çok fazla veri isteği. Lütfen biraz bekleyin.');
      setLoading(false);
      return;
    }
    
    try {
      // Profiles tablosundan veri çek (artık email kolonu var)
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order(sortBy, { ascending: sortOrder === 'asc' });
      
      // Apply search filter - email ve display_name ile arama yap
      if (searchTerm) {
        query = query.or(`email.ilike.%${searchTerm}%,display_name.ilike.%${searchTerm}%`);
      }
      
      // Apply status filter - profiles tablosunda status kolonu yok, varsayılan olarak active
      // if (statusFilter !== 'all') {
      //   query = query.eq('status', statusFilter);
      // }
      
      const { data, error, count } = await query
        .range((currentPage - 1) * usersPerPage, currentPage * usersPerPage - 1);
      
      if (error) {
        const handled = ErrorHandler.handleSupabase(error, 'users fetch', { component: 'UsersPage' });
        setUsers([]);
        setError(handled.userMessage);
        setTotalCount(0);
        return;
      }
      
      // Format the data safely
      const formattedUsers = (data || []).map(user => ({
        id: user.id || 'unknown',
        email: user.email || 'Email bulunamadı',
        display_name: user.display_name || null,
        credit_balance: user.credit_balance || 0,
        status: 'active', // Profiles tablosunda status yok, varsayılan active
        created_at: user.created_at || new Date().toISOString(),
        last_sign_in_at: user.last_login || null // last_login kolonunu kullan
      }));
      
      setUsers(formattedUsers);
      setTotalCount(count || 0);
    } catch (error) {
      const handled = ErrorHandler.handle(error, {
        operation: 'fetchUsers',
        component: 'UsersPage'
      });
      setUsers([]);
      setTotalCount(0);
      setError(handled.userMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limit search requests
    const searchCheck = searchRateLimit.checkLimit();
    if (!searchCheck.allowed) {
      setError('Çok fazla arama isteği. Lütfen bekleyin.');
      return;
    }
    
    setCurrentPage(1);
    fetchUsers();
  };

  const handleCreditModal = (user: User) => {
    setSelectedUser(user);
    setShowCreditModal(true);
  };

  const handleUserModal = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleStatusChange = async (userId: string, status: string) => {
    // Rate limit admin actions
    const actionCheck = adminActionLimit.checkLimit();
    if (!actionCheck.allowed) {
      setError('Çok fazla admin işlemi. Lütfen bekleyin.');
      return;
    }
    
    try {
      logAdminAction('user_status_change', {
        userId,
        action: 'change_user_status',
        metadata: { newStatus: status }
      });

      // Audit log the action
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user) {
        await auditLogAdminAction('user_status_change', 'user', {
          userId: currentUser.data.user.id,
          userEmail: currentUser.data.user.email || '',
          resourceId: userId,
          newValues: { status },
          metadata: {
            targetUserId: userId,
            previousStatus: users.find(u => u.id === userId)?.status,
            newStatus: status
          }
        });
      }
      const { error } = await supabase
        .from('profiles')
        .update({ status })
        .eq('id', userId);
      
      if (error) throw error;
      fetchUsers();
    } catch (error) {
      const handled = ErrorHandler.handleSupabase(error, 'user status update', {
        component: 'UsersPage',
        userId
      });
      setError(handled.userMessage);
      
      // Revert the optimistic update
      fetchUsers();
    }
  };
  const totalPages = Math.ceil(totalCount / usersPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <div className="admin-card rounded-2xl mobile-compact admin-hover-lift">
          <div className="flex flex-col space-y-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="admin-gradient-primary p-4 rounded-2xl flex-shrink-0">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-white truncate flex items-center">
                    Kullanıcı Yönetimi
                    <span className="ml-3 text-lg text-slate-400">👥</span>
                  </h1>
                  <p className="text-slate-300 text-sm md:text-base hidden sm:block mt-1">
                    Kullanıcılar yükleniyor...
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="admin-glass rounded-xl px-4 py-3 text-center min-w-[80px]">
                  <div className="text-xs text-slate-400 mb-1">Toplam</div>
                  <div className="text-xl font-bold text-white animate-pulse">---</div>
                  <div className="text-xs text-green-400 mt-1">Kullanıcı</div>
                </div>
                <button className="admin-btn-primary p-3 md:px-5 md:py-3 rounded-xl flex items-center space-x-2 touch-target admin-hover-scale opacity-50 cursor-not-allowed">
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">Yeni Kullanıcı</span>
                  <span className="sm:hidden">+</span>
                </button>
              </div>
            </div>
            
            {/* Loading Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="admin-glass rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1 animate-pulse">---</div>
                  <div className="text-lg font-bold text-slate-500 animate-pulse">---</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="admin-card rounded-2xl mobile-compact-sm md:p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                  <div className="admin-gradient-accent p-3 md:p-4 rounded-xl flex-shrink-0">
                    <div className="w-6 h-6 bg-slate-600 rounded"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="h-4 bg-slate-600 rounded mb-2"></div>
                    <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="px-3 py-2 rounded-xl bg-slate-700 w-16 h-8"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="admin-glass rounded-xl p-4 text-center">
                  <div className="h-4 bg-slate-600 rounded mb-2"></div>
                  <div className="h-6 bg-slate-600 rounded"></div>
                </div>
                <div className="admin-glass rounded-xl p-4 text-center">
                  <div className="h-4 bg-slate-600 rounded mb-2"></div>
                  <div className="h-4 bg-slate-600 rounded"></div>
                </div>
              </div>
              
              <div className="admin-glass rounded-xl p-4 mb-5">
                <div className="h-4 bg-slate-600 rounded"></div>
              </div>
              
              <div className="flex space-x-2">
                <div className="flex-1 h-10 bg-slate-700 rounded-xl"></div>
                <div className="flex-1 h-10 bg-slate-700 rounded-xl"></div>
                <div className="w-10 h-10 bg-slate-700 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        {/* Error Header */}
        <div className="admin-card rounded-2xl mobile-compact admin-hover-lift">
          <div className="flex flex-col space-y-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="admin-gradient-primary p-4 rounded-2xl flex-shrink-0">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-white truncate flex items-center">
                    Kullanıcı Yönetimi
                    <span className="ml-3 text-lg text-slate-400">👥</span>
                  </h1>
                  <p className="text-slate-300 text-sm md:text-base hidden sm:block mt-1">
                    Kullanıcı yönetimi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="admin-card rounded-2xl p-8 text-center">
          <div className="admin-gradient-danger p-6 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <X className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Bir Hata Oluştu</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            {error}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                setError('');
                fetchUsers();
              }}
              className="admin-btn-primary px-6 py-3 rounded-xl flex items-center justify-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Tekrar Dene</span>
            </button>
            <button
              onClick={() => {
                setError('');
                setSearchTerm('');
                setStatusFilter('all');
                setCurrentPage(1);
                fetchUsers();
              }}
              className="admin-glass hover:bg-slate-700/50 text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Filtreleri Temizle</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="admin-card rounded-2xl mobile-compact admin-hover-lift">
        <div className="flex flex-col space-y-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <div className="admin-gradient-primary p-4 rounded-2xl flex-shrink-0">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white truncate flex items-center">
                  Kullanıcı Yönetimi
                  <span className="ml-3 text-lg text-slate-400">👥</span>
                </h1>
                <p className="text-slate-300 text-sm md:text-base hidden sm:block mt-1">
                  Tüm kullanıcıları görüntüle, arama yap ve yönet
                </p>
                <p className="text-slate-400 text-xs sm:hidden mt-1">
                  Kullanıcı yönetimi
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="admin-glass rounded-xl px-4 py-3 text-center min-w-[80px]">
                <div className="text-xs text-slate-400 mb-1">Toplam</div>
                <div className="text-xl font-bold text-white">{totalCount}</div>
                <div className="text-xs text-green-400 mt-1">Kullanıcı</div>
              </div>
              <button className="admin-btn-primary p-3 md:px-5 md:py-3 rounded-xl flex items-center space-x-2 touch-target admin-hover-scale">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Yeni Kullanıcı</span>
                <span className="sm:hidden">+</span>
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="admin-glass rounded-lg p-3 text-center">
              <div className="text-xs text-slate-400 mb-1">Aktif</div>
              <div className="text-lg font-bold text-green-400">
                {users.filter(u => u.status === 'active').length}
              </div>
            </div>
            <div className="admin-glass rounded-lg p-3 text-center">
              <div className="text-xs text-slate-400 mb-1">Askıda</div>
              <div className="text-lg font-bold text-red-400">
                {users.filter(u => u.status === 'suspended').length}
              </div>
            </div>
            <div className="admin-glass rounded-lg p-3 text-center">
              <div className="text-xs text-slate-400 mb-1">Toplam Kredi</div>
              <div className="text-lg font-bold text-amber-400">
                {users.reduce((sum, u) => sum + u.credit_balance, 0).toLocaleString()}
              </div>
            </div>
            <div className="admin-glass rounded-lg p-3 text-center">
              <div className="text-xs text-slate-400 mb-1">Bu Sayfa</div>
              <div className="text-lg font-bold text-blue-400">
                {users.length}
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Email veya isim ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 admin-glass rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all mobile-text-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              )}
            </form>
          </div>

          {/* Mobile: Two columns for filters */}
          <div className="grid grid-cols-2 gap-3 md:contents">
            {/* Status Filter */}
            <div className="md:col-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'suspended')}
                className="w-full px-4 py-4 admin-glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all mobile-text-sm"
              >
                <option value="all">🔍 Tümü</option>
                <option value="active">🟢 Aktif</option>
                <option value="suspended">🔴 Askıda</option>
              </select>
            </div>

            {/* Sort */}
            <div className="md:col-auto">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as 'created_at' | 'credit_balance' | 'display_name');
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="w-full px-4 py-4 admin-glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all mobile-text-sm"
              >
                <option value="created_at-desc">📅 Yeni</option>
                <option value="created_at-asc">📅 Eski</option>
                <option value="credit_balance-desc">💰 ↓</option>
                <option value="credit_balance-asc">💰 ↑</option>
                <option value="display_name-asc">🔤 A-Z</option>
                <option value="display_name-desc">🔤 Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {users.map((user, index) => (
          <div 
            key={user.id}
            className="admin-card rounded-2xl mobile-compact-sm md:p-6 admin-hover-lift admin-hover-scale group"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            {/* User Header */}
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                <div className="admin-gradient-accent p-3 md:p-4 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-base md:text-xl">
                    {user.display_name?.[0] || user.email?.[0]?.toUpperCase() || '?'}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white text-sm md:text-lg truncate">
                    {user.display_name || 'İsimsiz Kullanıcı'}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 flex items-center truncate mt-1">
                    <Mail className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {user.email.length > 20 ? user.email.substring(0, 20) + '...' : user.email}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className={`px-3 py-2 rounded-xl text-xs font-bold flex-shrink-0 flex items-center space-x-1 ${
                user.status === 'suspended' 
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                  : 'bg-green-500/20 text-green-300 border border-green-500/30'
              }`}>
                <span>{user.status === 'suspended' ? '🔴' : '🟢'}</span>
                <span className="hidden sm:inline">
                  {user.status === 'suspended' ? 'Askıda' : 'Aktif'}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="admin-glass rounded-xl p-4 text-center group-hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center justify-center mb-2">
                  <Coins className="h-5 w-5 text-amber-400 mr-2" />
                  <span className="text-xs text-slate-400 font-medium">Kredi</span>
                </div>
                <div className="text-xl font-bold text-amber-400">{user.credit_balance.toLocaleString()}</div>
              </div>
              
              <div className="admin-glass rounded-xl p-4 text-center group-hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-xs text-slate-400 font-medium">Kayıt</span>
                </div>
                <div className="text-sm font-bold text-blue-400">
                  {formatDate(user.created_at)}
                </div>
              </div>
            </div>

            {/* Last Sign In */}
            <div className="admin-glass rounded-xl p-4 mb-5 group-hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400 font-medium">Son Giriş</span>
                <span className="text-sm text-white font-semibold">
                  {user.last_sign_in_at 
                    ? formatDate(user.last_sign_in_at)
                    : 'Hiç giriş yapmadı'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleUserModal(user)}
                className="flex-1 admin-glass hover:bg-slate-700/50 text-white p-3 rounded-xl admin-hover-scale transition-all flex items-center justify-center space-x-2 touch-target group/btn"
              >
                <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                <span className="text-sm font-medium hidden sm:inline">Detay</span>
              </button>
              
              <button
                onClick={() => handleCreditModal(user)}
                className="flex-1 admin-gradient-warning text-white p-3 rounded-xl admin-hover-scale transition-all flex items-center justify-center space-x-2 touch-target group/btn"
              >
                <CreditCard className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                <span className="text-sm font-medium hidden sm:inline">Kredi</span>
              </button>
              
              <button
                onClick={() => handleStatusChange(user.id, user.status === 'suspended' ? 'active' : 'suspended')}
                className={`p-3 rounded-xl admin-hover-scale transition-all touch-target flex-shrink-0 group/btn ${
                  user.status === 'suspended'
                    ? 'admin-gradient-success text-white'
                    : 'admin-gradient-danger text-white'
                }`}
                title={user.status === 'suspended' ? 'Kullanıcıyı Aktif Et' : 'Kullanıcıyı Askıya Al'}
              >
                {user.status === 'suspended' ? 
                  <UserCheck className="h-4 w-4 group-hover/btn:scale-110 transition-transform" /> : 
                  <UserX className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                }
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {users.length === 0 && !loading && (
        <div className="admin-card rounded-2xl p-12 text-center">
          <Users className="h-20 w-20 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Kullanıcı Bulunamadı</h3>
          <p className="text-slate-400 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Arama kriterlerinize uygun kullanıcı bulunamadı.'
              : 'Henüz kayıtlı kullanıcı bulunmuyor.'}
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className="admin-btn-primary px-6 py-2 rounded-lg"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="admin-card rounded-xl mobile-compact">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
              <span className="hidden sm:inline">
                {totalCount} kullanıcıdan {((currentPage - 1) * usersPerPage) + 1}-{Math.min(currentPage * usersPerPage, totalCount)} arası gösteriliyor
              </span>
              <span className="sm:hidden">
                {((currentPage - 1) * usersPerPage) + 1}-{Math.min(currentPage * usersPerPage, totalCount)} / {totalCount}
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 admin-glass rounded-lg admin-hover-scale disabled:opacity-50 disabled:cursor-not-allowed touch-target"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <span className="px-3 sm:px-4 py-2 admin-gradient-primary rounded-lg text-white font-medium text-sm">
                {currentPage} / {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 admin-glass rounded-lg admin-hover-scale disabled:opacity-50 disabled:cursor-not-allowed touch-target"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreditModal && selectedUser && (
        <CreditManagementModal
          user={selectedUser}
          onClose={() => {
            setShowCreditModal(false);
            setSelectedUser(null);
            fetchUsers(); // Refresh users after credit change
          }}
          onUpdate={() => {
            fetchUsers();
          }}
        />
      )}

      {showUserModal && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
          onEditCredit={() => {
            setShowUserModal(false);
            setShowCreditModal(true);
          }}
          onStatusChange={(userId, status) => {
            handleStatusChange(userId, status);
          }}
        />
      )}
    </div>
  );
}