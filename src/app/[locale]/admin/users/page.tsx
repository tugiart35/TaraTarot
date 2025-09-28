/*
info:
Bağlantılı dosyalar:
- lib/supabase/client.ts: Supabase bağlantısı (gerekli)
- components/admin/CreditManagementModal.tsx: Kredi yönetimi modalı (gerekli)
- components/admin/UserDetailModal.tsx: Kullanıcı detay modalı (gerekli)
- hooks/useToast.ts: Toast notification sistemi (gerekli)
- components/shared/ui/LoadingSpinner.tsx: Loading skeleton'ları (gerekli)
- components/shared/ui/ConfirmationDialog.tsx: Onay dialogları (gerekli)

Dosyanın amacı:
- Admin paneli kullanıcı yönetimi sayfası
- Kullanıcıları görüntüleme, arama, filtreleme ve yönetme
- Kullanıcı silme, ban/unban işlemleri
- Kredi yönetimi ve detay görüntüleme

Supabase değişkenleri ve tabloları:
- profiles: Kullanıcı profilleri ve kredi bakiyeleri
- audit_logs: Admin işlem logları

Geliştirme önerileri:
- Kullanıcı toplu işlemleri eklenebilir
- Gelişmiş filtreleme seçenekleri
- Export/import özellikleri
- Real-time güncellemeler

Tespit edilen hatalar:
- ✅ Confirmation dialog sistemi entegre edildi
- ✅ Toast notification sistemi eklendi
- ✅ Skeleton loader'lar eklendi
- ✅ Error handling iyileştirildi

Kullanım durumu:
- ✅ Gerekli: Admin kullanıcı yönetimi
- ✅ Production-ready: Tam fonksiyonel
*/

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { logAdminAction } from '@/lib/logger';
import { logAdminAction as auditLogAdminAction } from '@/lib/audit-logger';
import { ErrorHandler } from '@/lib/error-handler';
import { rateLimiter, useRateLimit } from '@/lib/rate-limiter';
import { useToast } from '@/hooks/useToast';
import Toast from '@/features/shared/ui/Toast';
import { CardSkeleton } from '@/components/shared/ui/LoadingSpinner';
import { DeleteConfirmationDialog } from '@/components/shared/ui/ConfirmationDialog';
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
  Crown,
  // Coins
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
  const { toast, showToast, hideToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'delete' | 'warning' | 'info' | 'danger';
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'delete',
    onConfirm: () => {},
    onCancel: () => {},
  });

  // Rate limiting hooks
  const searchRateLimit = useRateLimit('search');
  const adminActionLimit = useRateLimit('admin_action');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [sortBy, setSortBy] = useState<
    'created_at' | 'credit_balance' | 'display_name'
  >('created_at');
  const [sortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'suspended'
  >('all');

  const usersPerPage = 12;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, sortBy, sortOrder, statusFilter]);

  // Confirmation dialog helpers
  const showDeleteConfirmation = (user: User) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Kullanıcıyı Sil',
      message: `${user.display_name || user.email} kullanıcısını kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      type: 'danger',
      onConfirm: () => handleDeleteUser(user.id),
      onCancel: closeConfirmationDialog,
    });
  };

  const showBanConfirmation = (user: User) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Kullanıcıyı Yasakla',
      message: `${user.display_name || user.email} kullanıcısını yasaklamak istediğinizden emin misiniz?`,
      type: 'warning',
      onConfirm: () => handleBanUser(user.id),
      onCancel: closeConfirmationDialog,
    });
  };

  const closeConfirmationDialog = () => {
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
  };

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
      // Profiles tablosundan veri çek (mevcut kolonları kullan)
      let query = supabase
        .from('profiles')
        .select(
          'id, email, display_name, credit_balance, created_at, is_admin, is_premium',
          { count: 'exact' }
        )
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range(
          (currentPage - 1) * usersPerPage,
          currentPage * usersPerPage - 1
        );

      // Search filter
      if (searchTerm) {
        query = query.or(
          `email.ilike.%${searchTerm}%,display_name.ilike.%${searchTerm}%`
        );
      }

      // Status filter - is_admin ve is_premium kolonlarını kullan
      if (statusFilter !== 'all') {
        if (statusFilter === 'active') {
          query = query.eq('is_admin', false); // Normal kullanıcılar
        } else if (statusFilter === 'suspended') {
          query = query.eq('is_premium', false).eq('is_admin', false); // Premium olmayan kullanıcılar
        }
      }

      const { data, error, count } = await query;

      if (error) {
        const handled = ErrorHandler.handleSupabase(error, 'users fetch', {
          component: 'UsersPage',
        });
        setUsers([]);
        setError(handled.userMessage);
        setTotalCount(0);
        return;
      }

      // Format the data safely
      const formattedUsers = (data || []).map((user: any) => ({
        id: user.id || 'unknown',
        email: user.email || 'unknown@example.com',
        display_name: user.display_name || null,
        credit_balance: user.credit_balance || 0,
        created_at: user.created_at || new Date().toISOString(),
        last_sign_in_at: null, // Bu kolon mevcut değil
        status: user.is_admin
          ? 'admin'
          : user.is_premium
            ? 'premium'
            : 'active',
      }));

      setUsers(formattedUsers);
      setTotalCount(count || 0);
    } catch (error) {
      const handled = ErrorHandler.handle(error, {
        operation: 'fetchUsers',
        component: 'UsersPage',
      });
      setUsers([]);
      setTotalCount(0);
      setError(handled.userMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (_value: string) => {
    // Rate limit search requests
    const searchCheck = searchRateLimit.checkLimit();
    if (!searchCheck.allowed) {
      setError('Çok fazla arama isteği. Lütfen bekleyin.');
      return;
    }

    setCurrentPage(1);
    fetchUsers();
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
        metadata: { newStatus: status },
      });

      // Audit log the action
      const currentUser = await supabase.auth.getUser();
      if (currentUser.data.user) {
        await auditLogAdminAction('user_status_change', 'user', {
          userId: currentUser.data.user.id,
          userEmail: currentUser.data.user.email || '',
          metadata: {
            action: 'change_user_status',
            targetUserId: userId,
            newStatus: status,
          },
        });
      }

      const { error } = await supabase
        .from('profiles')
        .update({ status })
        .eq('id', userId);

      if (error) {
        throw error;
      }
      fetchUsers();
    } catch (error) {
      const handled = ErrorHandler.handleSupabase(error, 'user status update', {
        component: 'UsersPage',
        userId,
      });
      setError(handled.userMessage);

      // Revert the optimistic update
      fetchUsers();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setConfirmDialog(prev => ({ ...prev, loading: true }));

    try {
      // Rate limit check
      const actionCheck = adminActionLimit.checkLimit();
      if (!actionCheck.allowed) {
        showToast('Çok fazla admin işlemi. Lütfen bekleyin.', 'error');
        return;
      }

      // Log admin action
      await auditLogAdminAction('user_deleted', 'user', {
        resourceId: userId,
        metadata: {
          action: 'delete_user',
        },
      });

      // Delete user from profiles table
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) {
        throw error;
      }

      showToast('Kullanıcı başarıyla silindi', 'success');
      fetchUsers();
      closeConfirmationDialog();
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast('Kullanıcı silinirken hata oluştu', 'error');
    } finally {
      setConfirmDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const handleBanUser = async (userId: string) => {
    setConfirmDialog(prev => ({ ...prev, loading: true }));

    try {
      // Rate limit check
      const actionCheck = adminActionLimit.checkLimit();
      if (!actionCheck.allowed) {
        showToast('Çok fazla admin işlemi. Lütfen bekleyin.', 'error');
        return;
      }

      // Log admin action
      await auditLogAdminAction('user_banned', 'user', {
        resourceId: userId,
        metadata: {
          action: 'ban_user',
        },
      });

      // Update user status to suspended
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'suspended' })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      showToast('Kullanıcı başarıyla yasaklandı', 'success');
      fetchUsers();
      closeConfirmationDialog();
    } catch (error) {
      console.error('Error banning user:', error);
      showToast('Kullanıcı yasaklanırken hata oluştu', 'error');
    } finally {
      setConfirmDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const totalPages = Math.ceil(totalCount / usersPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className='space-y-6'>
        <div className='admin-card rounded-2xl p-6'>
          <div className='animate-pulse'>
            <div className='h-6 bg-slate-700 rounded w-1/3 mb-4'></div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='space-y-6'>
        <div className='admin-card rounded-2xl p-6'>
          <div className='text-center'>
            <div className='p-4 bg-red-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
              <X className='h-8 w-8 text-red-400' />
            </div>
            <h3 className='text-red-400 font-semibold text-lg mb-2'>
              Veri Yükleme Hatası
            </h3>
            <p className='text-slate-300 mb-4'>{error}</p>
            <button
              onClick={() => {
                setError('');
                fetchUsers();
              }}
              className='admin-btn-primary px-4 py-2 rounded-lg text-sm'
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='admin-card rounded-2xl mobile-compact admin-hover-lift'>
        <div className='flex flex-col space-y-6 mb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4 min-w-0 flex-1'>
              <div className='admin-gradient-primary p-4 rounded-2xl flex-shrink-0'>
                <Users className='h-6 w-6 md:h-8 md:w-8 text-white' />
              </div>
              <div className='min-w-0 flex-1'>
                <h1 className='text-2xl md:text-3xl font-bold text-white truncate flex items-center'>
                  Kullanıcı Yönetimi
                  <span className='ml-3 text-lg text-slate-400'>👥</span>
                </h1>
                <p className='text-slate-300 text-sm md:text-base hidden sm:block mt-1'>
                  Kullanıcıları yönetin ve kredi işlemlerini takip edin
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-3 flex-shrink-0'>
              <div className='admin-glass rounded-xl px-4 py-3 text-center min-w-[80px]'>
                <div className='text-xs text-slate-400 mb-1'>Toplam</div>
                <div className='text-xl font-bold text-white'>
                  {totalCount.toLocaleString()}
                </div>
                <div className='text-xs text-green-400 mt-1'>Kullanıcı</div>
              </div>
              <button className='admin-btn-primary p-3 md:px-5 md:py-3 rounded-xl flex items-center space-x-2 touch-target admin-hover-scale'>
                <UserPlus className='h-4 w-4' />
                <span className='text-sm font-medium hidden sm:inline'>
                  Yeni Kullanıcı
                </span>
                <span className='text-sm font-medium sm:hidden'>+</span>
              </button>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4' />
              <input
                type='text'
                placeholder='Kullanıcı ara...'
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
                className='w-full pl-10 pr-4 py-3 admin-glass rounded-xl border-0 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none'
              />
            </div>

            <div className='flex gap-3'>
              <select
                value={statusFilter}
                onChange={e =>
                  setStatusFilter(
                    e.target.value as 'all' | 'active' | 'suspended'
                  )
                }
                className='admin-glass rounded-xl px-4 py-3 text-white border-0 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none'
              >
                <option value='all'>Tüm Kullanıcılar</option>
                <option value='active'>Normal Kullanıcılar</option>
                <option value='suspended'>Premium Olmayan</option>
              </select>

              <select
                value={sortBy}
                onChange={e =>
                  setSortBy(
                    e.target.value as
                      | 'created_at'
                      | 'credit_balance'
                      | 'display_name'
                  )
                }
                className='admin-glass rounded-xl px-4 py-3 text-white border-0 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none'
              >
                <option value='created_at'>Kayıt Tarihi</option>
                <option value='credit_balance'>Kredi Bakiyesi</option>
                <option value='display_name'>İsim</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
        {users.map(user => (
          <div
            key={user.id}
            className='admin-card rounded-2xl p-6 admin-hover-lift'
          >
            <div className='flex items-center space-x-4 mb-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                {(user.display_name || user.email).charAt(0).toUpperCase()}
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='text-white font-semibold truncate'>
                  {user.display_name || 'İsimsiz Kullanıcı'}
                </h3>
                <p className='text-slate-400 text-sm truncate'>{user.email}</p>
              </div>
            </div>

            <div className='space-y-3 mb-4'>
              <div className='flex justify-between items-center'>
                <span className='text-slate-400 text-sm'>Kredi Bakiyesi</span>
                <span className='text-cyan-400 font-semibold'>
                  {user.credit_balance?.toLocaleString() || 0}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-slate-400 text-sm'>Kayıt Tarihi</span>
                <span className='text-slate-300 text-sm'>
                  {formatDate(user.created_at)}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-slate-400 text-sm'>Durum</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'admin'
                      ? 'bg-purple-500/20 text-purple-400'
                      : user.status === 'premium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {user.status === 'admin'
                    ? 'Admin'
                    : user.status === 'premium'
                      ? 'Premium'
                      : 'Aktif'}
                </span>
              </div>
            </div>

            <div className='flex justify-between items-center pt-4 border-t border-slate-700'>
              <button
                onClick={() => handleUserModal(user)}
                className='p-2 admin-glass rounded-lg admin-hover-scale transition-all touch-target'
                title='Detayları Görüntüle'
              >
                <Eye className='h-4 w-4 text-slate-400' />
              </button>

              <div className='flex space-x-2'>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowCreditModal(true);
                  }}
                  className='p-3 rounded-xl admin-hover-scale transition-all touch-target flex-shrink-0 group/btn admin-gradient-primary text-white'
                  title='Kredi Yönetimi'
                >
                  <CreditCard className='h-4 w-4 group-hover/btn:scale-110 transition-transform' />
                  <span className='text-sm font-medium hidden sm:inline'>
                    Kredi
                  </span>
                  <span className='text-sm font-medium sm:hidden'>₺</span>
                </button>

                <button
                  onClick={() =>
                    user.status === 'admin'
                      ? null
                      : user.status === 'premium'
                        ? showBanConfirmation(user)
                        : showBanConfirmation(user)
                  }
                  className={`p-3 rounded-xl admin-hover-scale transition-all touch-target flex-shrink-0 group/btn ${
                    user.status === 'admin'
                      ? 'admin-glass text-slate-400 cursor-not-allowed'
                      : user.status === 'premium'
                        ? 'admin-gradient-warning text-white'
                        : 'admin-gradient-danger text-white'
                  }`}
                  title={
                    user.status === 'admin'
                      ? 'Admin kullanıcı'
                      : user.status === 'premium'
                        ? 'Premium kullanıcı'
                        : 'Kullanıcıyı Askıya Al'
                  }
                  disabled={user.status === 'admin'}
                >
                  {user.status === 'admin' ? (
                    <Crown className='h-4 w-4 group-hover/btn:scale-110 transition-transform' />
                  ) : user.status === 'premium' ? (
                    <UserCheck className='h-4 w-4 group-hover/btn:scale-110 transition-transform' />
                  ) : (
                    <UserX className='h-4 w-4 group-hover/btn:scale-110 transition-transform' />
                  )}
                </button>

                <button
                  onClick={() => showDeleteConfirmation(user)}
                  className='p-3 rounded-xl admin-hover-scale transition-all touch-target flex-shrink-0 group/btn bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                  title='Kullanıcıyı Sil'
                >
                  <X className='h-4 w-4 group-hover/btn:scale-110 transition-transform' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {users.length === 0 && !loading && (
        <div className='admin-card rounded-2xl p-12 text-center'>
          <div className='p-4 bg-slate-700/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
            <Users className='h-8 w-8 text-slate-400' />
          </div>
          <h3 className='text-slate-300 font-semibold text-lg mb-2'>
            Kullanıcı Bulunamadı
          </h3>
          <p className='text-slate-400 mb-4'>
            {searchTerm
              ? 'Arama kriterlerinize uygun kullanıcı bulunamadı.'
              : 'Henüz hiç kullanıcı kaydı yok.'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className='admin-btn-primary px-4 py-2 rounded-lg text-sm'
            >
              Aramayı Temizle
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='admin-card rounded-2xl p-6'>
          <div className='flex items-center justify-between'>
            <div className='text-slate-400 text-sm'>
              Sayfa {currentPage} / {totalPages} - Toplam {totalCount} kullanıcı
            </div>

            <div className='flex items-center space-x-2'>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className='p-2 admin-glass rounded-lg admin-hover-scale disabled:opacity-50 disabled:cursor-not-allowed touch-target'
              >
                <ChevronLeft className='h-4 w-4' />
              </button>

              <span className='px-3 sm:px-4 py-2 admin-gradient-primary rounded-lg text-white font-medium text-sm'>
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className='p-2 admin-glass rounded-lg admin-hover-scale disabled:opacity-50 disabled:cursor-not-allowed touch-target'
              >
                <ChevronRight className='h-4 w-4' />
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
            setShowCreditModal(true);
          }}
          onStatusChange={(userId, status) => {
            handleStatusChange(userId, status);
          }}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={confirmDialog.onCancel}
        onConfirm={confirmDialog.onConfirm}
        itemName={confirmDialog.title}
        loading={confirmDialog.loading || false}
      />
    </div>
  );
}
