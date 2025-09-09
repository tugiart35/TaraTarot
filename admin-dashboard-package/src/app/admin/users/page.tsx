'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { logError, logSupabaseError, logAdminAction } from '@/lib/logger';
import { logAdminAction as auditLogAdminAction } from '@/lib/audit-logger';
import { ErrorHandler, handleAsyncError } from '@/lib/error-handler';
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
  Filter,
  SortAsc,
  SortDesc,
  UserPlus,
  Coins,
  Calendar,
  Mail,
  Crown
} from 'lucide-react';
import CreditManagementModal from '@/components/admin/CreditManagementModal';
import TransactionHistory from '@/components/admin/TransactionHistory';
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
      // Simple profiles query - email should be stored in profiles table
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order(sortBy, { ascending: sortOrder === 'asc' });
      
      // Apply search filter
      if (searchTerm) {
        query = query.or(`email.ilike.%${searchTerm}%,display_name.ilike.%${searchTerm}%`);
      }
      
      // Apply status filter
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
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
        email: user.email || 'No email',
        display_name: user.display_name || null,
        credit_balance: user.credit_balance || 0,
        status: user.status || 'active',
        created_at: user.created_at || new Date().toISOString(),
        last_sign_in_at: user.last_sign_in_at || null
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

  const handleSort = (field: 'created_at' | 'credit_balance' | 'display_name') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
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
      <div className="flex items-center justify-center h-96">
        <div className="admin-card rounded-2xl p-8 text-center">
          <div className="admin-pulse mb-4">
            <Users className="h-12 w-12 text-blue-500 mx-auto" />
          </div>
          <div className="admin-text-shimmer text-xl font-semibold">Kullanıcılar yükleniyor...</div>
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
              <div className="admin-gradient-primary p-3 rounded-xl flex-shrink-0">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-white truncate">Kullanıcı Yönetimi</h1>
                <p className="text-slate-400 text-sm md:text-base hidden sm:block">Tüm kullanıcıları görüntüle ve yönet</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="admin-glass rounded-lg px-3 py-2 text-center">
                <div className="text-xs text-slate-400">Toplam</div>
                <div className="text-lg font-bold text-white">{totalCount}</div>
              </div>
              <button className="admin-btn-primary p-3 md:px-4 md:py-2 rounded-lg flex items-center space-x-2 touch-target">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Yeni Kullanıcı</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-4 md:gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Email veya isim ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 admin-glass rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mobile-text-sm"
              />
            </form>
          </div>

          {/* Mobile: Two columns for filters */}
          <div className="grid grid-cols-2 gap-3 md:contents">
            {/* Status Filter */}
            <div className="md:col-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'suspended')}
                className="w-full px-3 md:px-4 py-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mobile-text-sm"
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
                className="w-full px-3 md:px-4 py-3 admin-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mobile-text-sm"
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
            className="admin-card rounded-xl mobile-compact-sm md:p-6 admin-hover-lift admin-hover-scale"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            {/* User Header */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                <div className="admin-gradient-accent p-2 md:p-3 rounded-lg flex-shrink-0">
                  <span className="text-white font-bold text-sm md:text-lg">
                    {user.display_name?.[0] || user.email[0].toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white text-sm md:text-base truncate">
                    {user.display_name || 'İsimsiz Kullanıcı'}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 flex items-center truncate">
                    <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">
                      {user.email.length > 15 ? user.email.substring(0, 15) + '...' : user.email}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className={`px-2 py-1 rounded-lg text-xs font-medium flex-shrink-0 ${
                user.status === 'suspended' 
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                  : 'bg-green-500/20 text-green-300 border border-green-500/30'
              }`}>
                {user.status === 'suspended' ? '🔴' : '🟢'}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="admin-glass rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Coins className="h-4 w-4 text-amber-400 mr-1" />
                  <span className="text-xs text-slate-400">Kredi</span>
                </div>
                <div className="text-lg font-bold text-amber-400">{user.credit_balance}</div>
              </div>
              
              <div className="admin-glass rounded-lg p-3 text-center">
                <div className="flex items-center justify-center mb-1">
                  <Calendar className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-xs text-slate-400">Kayıt</span>
                </div>
                <div className="text-xs font-medium text-blue-400">
                  {formatDate(user.created_at)}
                </div>
              </div>
            </div>

            {/* Last Sign In */}
            <div className="admin-glass rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Son Giriş</span>
                <span className="text-xs text-white">
                  {user.last_sign_in_at 
                    ? formatDate(user.last_sign_in_at)
                    : 'Hiç giriş yapmadı'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-1 md:space-x-2">
              <button
                onClick={() => handleUserModal(user)}
                className="flex-1 admin-glass hover:bg-slate-700/50 text-white p-2 rounded-lg admin-hover-scale transition-colors flex items-center justify-center space-x-1 touch-target"
              >
                <Eye className="h-4 w-4" />
                <span className="text-xs md:text-sm hidden sm:inline">Detay</span>
              </button>
              
              <button
                onClick={() => handleCreditModal(user)}
                className="flex-1 admin-gradient-warning text-white p-2 rounded-lg admin-hover-scale transition-all flex items-center justify-center space-x-1 touch-target"
              >
                <CreditCard className="h-4 w-4" />
                <span className="text-xs md:text-sm hidden sm:inline">Kredi</span>
              </button>
              
              <button
                onClick={() => handleStatusChange(user.id, user.status === 'suspended' ? 'active' : 'suspended')}
                className={`p-2 rounded-lg admin-hover-scale transition-all touch-target flex-shrink-0 ${
                  user.status === 'suspended'
                    ? 'admin-gradient-success text-white'
                    : 'admin-gradient-danger text-white'
                }`}
              >
                {user.status === 'suspended' ? <UserCheck className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
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
        />
      )}
    </div>
  );
}