// Dashboard sayfası için TypeScript tip tanımlamaları

// Kullanıcı profil verilerini tanımlayan TypeScript interface'i
export interface UserProfile {
  id: string; // Kullanıcı benzersiz ID'si
  email: string; // E-posta adresi
  display_name: string | null; // Görünen isim
  full_name?: string | null; // Tam isim (opsiyonel)
  first_name?: string | null; // Ad (opsiyonel)
  last_name?: string | null; // Soyad (opsiyonel)
  birth_date?: string | null; // Doğum tarihi (opsiyonel)
  credit_balance: number; // Kredi bakiyesi
  created_at: string; // Hesap oluşturulma tarihi
  updated_at: string; // Son güncelleme tarihi
  avatar_url?: string; // Profil fotoğrafı URL'i (opsiyonel)
  bio?: string; // Kullanıcı hakkında kısa bilgi (opsiyonel)
  timezone?: string; // Zaman dilimi (opsiyonel)
  username?: string; // Kullanıcı adı (opsiyonel)
  gender?: string; // Cinsiyet (opsiyonel)
  website?: string; // Website URL'i (opsiyonel)
  preferences?: any; // Kullanıcı tercihleri (opsiyonel)
  last_login?: string; // Son giriş tarihi (opsiyonel)
  total_readings?: number; // Toplam okuma sayısı (opsiyonel)
  is_premium?: boolean; // Premium üyelik durumu (opsiyonel)
}

// Tarot okuma verilerini tanımlayan TypeScript interface'i
export interface Reading {
  id: string; // Okuma benzersiz ID'si
  user_id: string; // Okuma yapan kullanıcının ID'si
  reading_type: string; // Okuma türü (love, general, career vs.)
  cards: string; // Çekilen kartlar
  interpretation: string; // Okuma yorumu
  questions: any; // JSONB - yeni veri yapısı - kullanıcının soruları
  status: 'pending' | 'reviewed' | 'completed'; // Okuma durumu
  created_at: string; // Okuma oluşturulma tarihi
  updated_at?: string; // Son güncelleme tarihi (opsiyonel)
  admin_notes?: string; // Admin notları (opsiyonel)
  title?: string; // Okuma başlığı (opsiyonel)
  cost_credits?: number; // Okuma maliyeti (opsiyonel)
  spread_name?: string; // Kart yayılımı adı (opsiyonel)
  format?: 'audio' | 'written' | 'simple'; // Okuma formatı (opsiyonel)
  formatInfo?: { // Format bilgileri (opsiyonel)
    label: string;
    icon: string;
    color: string;
    iconComponent: string;
  };
  metadata?: any; // Okuma metadata'sı (opsiyonel)
  // Eski uyumluluk için - geriye dönük uyumluluk
  type?: 'tarot' | 'numerology' | 'love' | 'simple' | 'general' | 'career' | 'relationshipAnalysis' | 'money' | 'relationshipProblems' | 'situationAnalysis' | 'newLover' | 'problemSolving' | 'marriage';
  summary?: string; // Okuma özeti (opsiyonel)
}

// Kredi paketi verilerini tanımlayan TypeScript interface'i
export interface Package {
  id: number; // Paket benzersiz ID'si
  name: string; // Paket adı
  credits: number; // Paket içindeki kredi miktarı
  price_eur: number; // Euro cinsinden fiyat
  price_try: number; // Türk Lirası cinsinden fiyat
  active: boolean; // Paketin aktif olup olmadığı
  created_at: string; // Paket oluşturulma tarihi
  description?: string; // Paket açıklaması (opsiyonel)
  shopier_product_id?: string | undefined; // Shopier ürün ID'si (opsiyonel)
}

// Dashboard state interface'i
export interface DashboardState {
  profile: UserProfile | null;
  recentReadings: Reading[];
  packages: Package[];
  loading: boolean;
  isAdmin: boolean;
  sidebarOpen: boolean;
  profileModalOpen: boolean;
  editing: boolean;
  editForm: Partial<UserProfile>;
  saving: boolean;
  selectedReading: Reading | null;
}

// Dashboard actions interface'i
export interface DashboardActions {
  refreshCreditBalance: () => Promise<void>;
  downloadReading: (reading: Reading) => void;
  handlePackagePurchase: (pkg: Package) => Promise<void>;
  handleLogout: () => Promise<void>;
  openProfileModal: () => Promise<void>;
  handleSaveProfile: () => Promise<void>;
  setSidebarOpen: (open: boolean) => void;
  setProfileModalOpen: (open: boolean) => void;
  setEditing: (editing: boolean) => void;
  setEditForm: (form: Partial<UserProfile>) => void;
  setSelectedReading: (reading: Reading | null) => void;
}
