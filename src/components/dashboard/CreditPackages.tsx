// Dashboard kredi paketleri bileşeni

import { Package } from '@/types/dashboard.types';
import { getPackageStyle } from '@/utils/dashboard-utils';
import { Star } from 'lucide-react';

interface CreditPackagesProps {
  packages: Package[];
  handlePackagePurchase: (pkg: Package) => Promise<void>;
  paymentLoading: boolean;
  translate: (key: string, fallback?: string) => string;
}

// Kredi paketleri bileşeni
export default function CreditPackages({
  packages,
  handlePackagePurchase,
  paymentLoading,
  translate
}: CreditPackagesProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-heading-2 text-gold">{translate('dashboard.creditPackages')}</h2>
        {/* Tüm paketleri gör linki */}
        <a 
          href="/dashboard/packages" 
          className="text-gold hover:text-gold/80 transition-colors text-sm flex items-center space-x-1"
        >
          <span>Tümünü Gör</span>
          <span>→</span>
        </a>
      </div>
      
      {/* Kredi paketleri grid'i */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const style = getPackageStyle(pkg.credits); // Paket stilini al
          const IconComponent = style.icon; // İkon bileşenini al

          return (
            <div 
              key={pkg.id}
              className={`card hover-lift p-6 relative ${style.isPopular ? 'ring-2 ring-gold/50' : ''}`} // Popüler paket için özel ring
            >
              {/* Popüler etiketi - sadece popüler paketlerde göster */}
              {style.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gold text-cosmic-black px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>Popüler</span>
                  </div>
                </div>
              )}
              
              <div className="text-center">
                {/* Paket ikonu */}
                <div className={`inline-flex p-3 ${style.bgColor} border ${style.borderColor} rounded-lg mb-4`}>
                  <IconComponent className={`h-6 w-6 ${style.iconColor}`} />
                </div>
                {/* Paket adı */}
                <h3 className="text-lg font-bold text-text-celestial mb-2">{pkg.name}</h3>
                
                {/* Kredi miktarı ve bonus bilgisi */}
                <div className="mb-4">
                  <div className={`text-3xl font-bold ${style.creditColor} mb-1`}>
                    {pkg.credits.toLocaleString()}
                  </div>
               
                </div>
                
                {/* Fiyat bilgisi */}
                <div className="mb-6">
                  <div className="text-2xl font-bold text-text-celestial">
                    {pkg.price_try.toFixed(2)} TRY
                  </div>
                </div>
                
                {/* Satın alma butonu */}
                <button 
                  onClick={() => handlePackagePurchase(pkg)} // Paket satın alma işlemi
                  disabled={paymentLoading} // Ödeme yüklenirken devre dışı
                  className={`w-full ${style.buttonClass} text-center block ${paymentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {paymentLoading ? 'Yönlendiriliyor...' : 'Satın Al'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
