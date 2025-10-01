/*
info:
Bağlantılı dosyalar:
- lib/supabase/client.ts: Supabase bağlantısı (gerekli)
- lib/audit-logger.ts: Audit logging (gerekli)
- auth.users: Supabase auth tablosu (gerekli)

Dosyanın amacı:
- Admin user yönetimi için CRUD işlemleri
- Role-based access control
- Yetki verme/alma sistemi
- Admin user listesi ve detayları

Supabase değişkenleri ve tabloları:
- admin_users: Admin user verileri
- auth.users: Kullanıcı auth bilgileri
- admin_audit_logs: Audit logları

Geliştirme önerileri:
- Bulk operations eklenebilir
- Permission templates
- Admin activity tracking
- Email notifications

Tespit edilen hatalar:
- ✅ Role validation eklendi
- ✅ Permission system entegre edildi
- ✅ Audit logging eklendi
- ✅ Error handling geliştirildi

Kullanım durumu:
- ✅ Gerekli: Admin user yönetimi
- ✅ Production-ready: Güvenli ve test edilmiş
*/

import { supabase } from '@/lib/supabase/client';
import { logAdminAction } from '@/lib/audit-logger';

export interface AdminUser {
  user_id: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: Record<string, boolean>;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Auth user bilgileri (join ile gelecek)
  email?: string;
  display_name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
}

export interface CreateAdminUserData {
  user_id: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions?: Record<string, boolean>;
}

export interface UpdateAdminUserData {
  role?: 'super_admin' | 'admin' | 'moderator';
  permissions?: Record<string, boolean>;
}

// Admin User CRUD Operations
export class AdminUserManager {
  // Tüm admin user'ları getir (auth.users ile join)
  static async getAllAdminUsers(): Promise<AdminUser[]> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select(
          `
          *,
          auth_user:user_id (
            email,
            user_metadata
          )
        `
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin users:', error);
        throw error;
      }

      // Auth user bilgilerini admin user'a ekle
      const adminUsers = (data || []).map((adminUser: any) => ({
        ...adminUser,
        email: adminUser.auth_user?.email || 'Bilinmeyen',
        display_name:
          adminUser.auth_user?.user_metadata?.display_name ||
          adminUser.auth_user?.user_metadata?.full_name ||
          'Bilinmeyen Kullanıcı',
        full_name: adminUser.auth_user?.user_metadata?.full_name,
        first_name: adminUser.auth_user?.user_metadata?.first_name,
        last_name: adminUser.auth_user?.user_metadata?.last_name,
      }));

      return adminUsers;
    } catch (error) {
      console.error('AdminUserManager.getAllAdminUsers error:', error);
      throw error;
    }
  }

  // Tek admin user getir
  static async getAdminUserById(userId: string): Promise<AdminUser | null> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select(
          `
          *,
          auth_user:user_id (
            email,
            user_metadata
          )
        `
        )
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching admin user:', error);
        return null;
      }

      return {
        ...data,
        email: data.auth_user?.email || 'Bilinmeyen',
        display_name:
          data.auth_user?.user_metadata?.display_name ||
          data.auth_user?.user_metadata?.full_name ||
          'Bilinmeyen Kullanıcı',
        full_name: data.auth_user?.user_metadata?.full_name,
        first_name: data.auth_user?.user_metadata?.first_name,
        last_name: data.auth_user?.user_metadata?.last_name,
      };
    } catch (error) {
      console.error('AdminUserManager.getAdminUserById error:', error);
      return null;
    }
  }

  // Yeni admin user oluştur
  static async createAdminUser(
    userData: CreateAdminUserData
  ): Promise<AdminUser | null> {
    try {
      // Mevcut kullanıcıyı al
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Kullanıcının super_admin olup olmadığını kontrol et
      const currentAdmin = await this.getAdminUserById(user.id);
      if (!currentAdmin || currentAdmin.role !== 'super_admin') {
        throw new Error('Only super admins can create admin users');
      }

      // Varsayılan permissions
      const defaultPermissions = this.getDefaultPermissions(userData.role);
      const permissions = userData.permissions || defaultPermissions;

      const { data, error } = await supabase
        .from('admin_users')
        .insert({
          user_id: userData.user_id,
          role: userData.role,
          permissions: permissions,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating admin user:', error);
        throw error;
      }

      // Audit log
      await logAdminAction('admin_user_created', 'admin_users', {
        resourceId: userData.user_id,
        newValues: {
          role: userData.role,
          permissions: permissions,
        },
        metadata: {
          targetUserId: userData.user_id,
        },
      });

      return data;
    } catch (error) {
      console.error('AdminUserManager.createAdminUser error:', error);
      throw error;
    }
  }

  // Admin user güncelle
  static async updateAdminUser(
    userId: string,
    updateData: UpdateAdminUserData
  ): Promise<AdminUser | null> {
    try {
      // Mevcut kullanıcıyı al
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Kullanıcının super_admin olup olmadığını kontrol et
      const currentAdmin = await this.getAdminUserById(user.id);
      if (!currentAdmin || currentAdmin.role !== 'super_admin') {
        throw new Error('Only super admins can update admin users');
      }

      // Kendi kendini düzenlemeye izin verme
      if (userId === user.id) {
        throw new Error('Cannot update your own admin status');
      }

      const updatePayload: any = {
        updated_at: new Date().toISOString(),
      };

      // Sadece sağlanan alanları güncelle
      if (updateData.role !== undefined) {
        updatePayload.role = updateData.role;
        // Role değişirse permissions'ı da güncelle
        updatePayload.permissions = this.getDefaultPermissions(updateData.role);
      }

      if (updateData.permissions !== undefined) {
        updatePayload.permissions = updateData.permissions;
      }

      const { data, error } = await supabase
        .from('admin_users')
        .update(updatePayload)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating admin user:', error);
        throw error;
      }

      // Audit log
      await logAdminAction('admin_user_updated', 'admin_users', {
        resourceId: userId,
        newValues: updateData,
        metadata: {
          targetUserId: userId,
          updatedFields: Object.keys(updateData),
        },
      });

      return data;
    } catch (error) {
      console.error('AdminUserManager.updateAdminUser error:', error);
      throw error;
    }
  }

  // Admin user sil
  static async deleteAdminUser(userId: string): Promise<boolean> {
    try {
      // Mevcut kullanıcıyı al
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Kullanıcının super_admin olup olmadığını kontrol et
      const currentAdmin = await this.getAdminUserById(user.id);
      if (!currentAdmin || currentAdmin.role !== 'super_admin') {
        throw new Error('Only super admins can delete admin users');
      }

      // Kendi kendini silmeye izin verme
      if (userId === user.id) {
        throw new Error('Cannot delete your own admin status');
      }

      // Silmeden önce user bilgilerini al (audit log için)
      const userData = await this.getAdminUserById(userId);
      if (!userData) {
        throw new Error('Admin user not found');
      }

      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting admin user:', error);
        throw error;
      }

      // Audit log
      await logAdminAction('admin_user_deleted', 'admin_users', {
        resourceId: userId,
        oldValues: {
          email: userData.email,
          role: userData.role,
        },
        metadata: {
          targetUserId: userId,
          targetUserEmail: userData.email,
          targetUserRole: userData.role,
        },
      });

      return true;
    } catch (error) {
      console.error('AdminUserManager.deleteAdminUser error:', error);
      throw error;
    }
  }

  // Kullanıcı arama (email ile)
  static async searchUsersByEmail(email: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(
          'user_id, email, display_name, full_name, first_name, last_name'
        )
        .ilike('email', `%${email}%`)
        .limit(10);

      if (error) {
        console.error('Error searching users:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('AdminUserManager.searchUsersByEmail error:', error);
      throw error;
    }
  }

  // Role'a göre varsayılan permissions
  private static getDefaultPermissions(role: string): Record<string, boolean> {
    const permissions: Record<string, boolean> = {};

    switch (role) {
      case 'super_admin':
        permissions['manage_admins'] = true;
        permissions['manage_api_keys'] = true;
        permissions['manage_settings'] = true;
        permissions['view_analytics'] = true;
        permissions['manage_users'] = true;
        permissions['manage_packages'] = true;
        permissions['view_orders'] = true;
        permissions['manage_content'] = true;
        break;

      case 'admin':
        permissions['manage_api_keys'] = true;
        permissions['view_analytics'] = true;
        permissions['manage_users'] = true;
        permissions['manage_packages'] = true;
        permissions['view_orders'] = true;
        permissions['manage_content'] = true;
        break;

      case 'moderator':
        permissions['view_analytics'] = true;
        permissions['manage_users'] = true;
        permissions['view_orders'] = true;
        break;
    }

    return permissions;
  }

  // Permission kontrolü
  static async hasPermission(permission: string): Promise<boolean> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return false;
      }

      const adminUser = await this.getAdminUserById(user.id);
      if (!adminUser) {
        return false;
      }

      return adminUser.permissions[permission] === true;
    } catch (error) {
      console.error('AdminUserManager.hasPermission error:', error);
      return false;
    }
  }

  // Role kontrolü
  static async hasRole(role: string): Promise<boolean> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return false;
      }

      const adminUser = await this.getAdminUserById(user.id);
      if (!adminUser) {
        return false;
      }

      return adminUser.role === role;
    } catch (error) {
      console.error('AdminUserManager.hasRole error:', error);
      return false;
    }
  }

  // Mevcut kullanıcının admin bilgilerini getir
  static async getCurrentAdminUser(): Promise<AdminUser | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return null;
      }

      return await this.getAdminUserById(user.id);
    } catch (error) {
      console.error('AdminUserManager.getCurrentAdminUser error:', error);
      return null;
    }
  }
}
