// Dashboard profil yönetimi bileşeni

import { User, Settings, Coins, Clock } from 'lucide-react';

interface ProfileManagementProps {
  openProfileModal: () => Promise<void>;
}

// Profil yönetimi bileşeni
export default function ProfileManagement({ openProfileModal }: ProfileManagementProps) {
  return (
    <div className="mb-8">
      <h2 className="text-heading-2 text-gold mb-4">Profil Yönetimi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Profil bilgileri kartı */}
        <button 
          onClick={openProfileModal} // Profil modal'ını aç
          className="card hover-lift p-6 group text-left w-full"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gold/20 rounded-lg group-hover:bg-gold/30 transition-colors">
              <User className="h-6 w-6 text-gold" />
            </div>
            <span className="text-sm font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
              Ücretsiz
            </span>
          </div>
          <h3 className="font-semibold text-text-celestial mb-2">Profil Bilgileri</h3>
          <p className="text-text-muted text-sm mb-4">Kişisel bilgilerinizi güncelleyin</p>
          <div className="flex items-center text-sm text-text-dim">
            <Clock className="h-4 w-4 mr-2" />
            Hemen erişim
          </div>
        </button>

        {/* Hesap ayarları kartı */}
        <a href="/dashboard/settings" className="card hover-lift p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-success/20 rounded-lg group-hover:bg-success/30 transition-colors">
              <Settings className="h-6 w-6 text-success" />
            </div>
            <span className="text-sm font-medium text-success bg-success/10 px-3 py-1 rounded-full">
              Ücretsiz
            </span>
          </div>
          <h3 className="font-semibold text-text-celestial mb-2">Hesap Ayarları</h3>
          <p className="text-text-muted text-sm mb-4">Güvenlik ve gizlilik ayarları</p>
          <div className="flex items-center text-sm text-text-dim">
            <Clock className="h-4 w-4 mr-2" />
            Hemen erişim
          </div>
        </a>

        {/* Kredi geçmişi kartı */}
        <a href="/dashboard/credits" className="card hover-lift p-6 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-warning/20 rounded-lg group-hover:bg-warning/30 transition-colors">
              <Coins className="h-6 w-6 text-warning" />
            </div>
            <span className="text-sm font-medium text-warning bg-warning/10 px-3 py-1 rounded-full">
              Ücretsiz
            </span>
          </div>
          <h3 className="font-semibold text-text-celestial mb-2">Kredi Geçmişi</h3>
          <p className="text-text-muted text-sm mb-4">Tüm işlem geçmişinizi görün</p>
          <div className="flex items-center text-sm text-text-dim">
            <Clock className="h-4 w-4 mr-2" />
            Hemen erişim
          </div>
        </a>
      </div>
    </div>
  );
}
