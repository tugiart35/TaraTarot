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

// Database types için tip tanımları
export interface Database {
  public: {
    Tables: {
      user_questions: {
        Row: {
          id: string;
          user_id: string;
          question: string;
          reading_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question: string;
          reading_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          question?: string;
          reading_type?: string;
          created_at?: string;
        };
      };
      detailed_questions: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          birth_date: string;
          email: string;
          concern: string;
          understanding: string;
          emotional: string;
          reading_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name: string;
          birth_date: string;
          email: string;
          concern: string;
          understanding: string;
          emotional: string;
          reading_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string;
          birth_date?: string;
          email?: string;
          concern?: string;
          understanding?: string;
          emotional?: string;
          reading_type?: string;
          created_at?: string;
        };
      };
      tarot_readings: {
        Row: {
          id: string;
          user_id: string;
          reading_type: string;
          cards: string[];
          interpretation: string;
          question?: string;
          admin_notes?: string;
          status: 'pending' | 'reviewed' | 'completed';
          created_at: string;
          updated_at?: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          reading_type: string;
          cards: string[];
          interpretation: string;
          question?: string;
          admin_notes?: string;
          status?: 'pending' | 'reviewed' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          reading_type?: string;
          cards?: string[];
          interpretation?: string;
          question?: string;
          admin_notes?: string;
          status?: 'pending' | 'reviewed' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
