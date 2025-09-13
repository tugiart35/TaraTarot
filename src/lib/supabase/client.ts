/*
info:
Bağlantılı dosyalar:
- lib/services/question-service.ts: Soru kaydetme servisi (gerekli)
- lib/services/reading-service.ts: Okuma kaydetme servisi (gerekli)
- hooks/useAuth.ts: Kimlik doğrulama hook'u (gerekli)

Dosyanın amacı:
- Supabase bağlantısını yapılandırmak.
- Client instance'ını export etmek.
- Environment variables'ları kullanmak.
- Yeni optimize edilmiş şema için TypeScript tip tanımları sağlamak.

Supabase değişkenleri ve tabloları:
- profiles: Kullanıcı profilleri tablosu (users yerine)
- readings: Tarot okumaları tablosu (readings_new yerine)
- transactions: Kredi işlemleri tablosu (transactions_new yerine)
- packages: Kredi paketleri tablosu
- spreads: Tarot açılımları tablosu
- admin_logs: Admin işlem logları tablosu

Geliştirme önerileri:
- Tüm tablo isimleri yeni şemaya uygun
- TypeScript tip güvenliği sağlanmış
- JSONB alanları (cards, questions, metadata) destekleniyor

Tespit edilen hatalar:
- ✅ Eski tablo isimleri güncellendi (users → profiles, readings_new → readings, transactions_new → transactions)

Kullanım durumu:
- ✅ Gerekli: Tüm Supabase işlemleri için temel client
- ✅ Production-ready: Yeni şemaya uygun
*/

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types için tip tanımları - Yeni optimize edilmiş şema
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          avatar_url?: string;
          credit_balance: number;
          is_premium: boolean;
          is_admin: boolean;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          display_name?: string;
          avatar_url?: string;
          credit_balance?: number;
          is_premium?: boolean;
          is_admin?: boolean;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string;
          avatar_url?: string;
          credit_balance?: number;
          is_premium?: boolean;
          is_admin?: boolean;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      readings: {
        Row: {
          id: string;
          user_id: string;
          reading_type: 'tarot' | 'numerology' | 'love' | 'career' | 'general';
          spread_name: string;
          title: string;
          interpretation: string;
          cards?: any;
          questions?: any;
          cost_credits: number;
          status: 'pending' | 'completed' | 'failed';
          metadata?: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          reading_type: 'tarot' | 'numerology' | 'love' | 'career' | 'general';
          spread_name: string;
          title: string;
          interpretation: string;
          cards?: any;
          questions?: any;
          cost_credits?: number;
          status?: 'pending' | 'completed' | 'failed';
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          reading_type?: 'tarot' | 'numerology' | 'love' | 'career' | 'general';
          spread_name?: string;
          title?: string;
          interpretation?: string;
          cards?: any;
          questions?: any;
          cost_credits?: number;
          status?: 'pending' | 'completed' | 'failed';
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: 'purchase' | 'refund' | 'bonus' | 'deduction' | 'reading';
          amount: number;
          description?: string;
          reference_type?: string;
          reference_id?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'purchase' | 'refund' | 'bonus' | 'deduction' | 'reading';
          amount: number;
          description?: string;
          reference_type?: string;
          reference_id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'purchase' | 'refund' | 'bonus' | 'deduction' | 'reading';
          amount?: number;
          description?: string;
          reference_type?: string;
          reference_id?: string;
          created_at?: string;
        };
      };
      packages: {
        Row: {
          id: number;
          name: string;
          description?: string;
          credits: number;
          price_eur: number;
          price_try: number;
          active: boolean;
          shopier_product_id?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string;
          credits: number;
          price_eur: number;
          price_try: number;
          active?: boolean;
          shopier_product_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string;
          credits?: number;
          price_eur?: number;
          price_try?: number;
          active?: boolean;
          shopier_product_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      spreads: {
        Row: {
          id: number;
          name_tr: string;
          name_en: string;
          name_sr: string;
          description_tr?: string;
          description_en?: string;
          description_sr?: string;
          positions: any;
          card_count: number;
          cost_credits: number;
          category: 'general' | 'love' | 'career' | 'spiritual' | 'health';
          difficulty_level: 'beginner' | 'intermediate' | 'advanced';
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name_tr: string;
          name_en: string;
          name_sr: string;
          description_tr?: string;
          description_en?: string;
          description_sr?: string;
          positions: any;
          card_count?: number;
          cost_credits?: number;
          category?: 'general' | 'love' | 'career' | 'spiritual' | 'health';
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name_tr?: string;
          name_en?: string;
          name_sr?: string;
          description_tr?: string;
          description_en?: string;
          description_sr?: string;
          positions?: any;
          card_count?: number;
          cost_credits?: number;
          category?: 'general' | 'love' | 'career' | 'spiritual' | 'health';
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced';
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_logs: {
        Row: {
          id: string;
          admin_id: string;
          action: string;
          target_type?: string;
          target_id?: string;
          details: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          action: string;
          target_type?: string;
          target_id?: string;
          details?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string;
          action?: string;
          target_type?: string;
          target_id?: string;
          details?: any;
          created_at?: string;
        };
      };
    };
  };
}
