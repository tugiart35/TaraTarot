// Bu dosya, yasal gerekliliklere uygun Güvenlik Politikası sayfasını oluşturur.
// Platformun teknik ve idari güvenlik önlemlerini açıklar.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function SecurityPolicy() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          🔒 Güvenlik Politikası
        </h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          Kişisel veriler ve ödemeler için güvenlik önlemleri
        </p>
      </section>
      <section className='mb-6'>
        <p>
          Tarot-Numeroloji platformu, kullanıcı verilerinin gizliliği ve
          güvenliği için teknik ve idari tedbirler uygular. Tüm veri iletimi
          SSL/TLS ile şifrelenir, ödeme işlemleri güvenli altyapı ile
          gerçekleştirilir.
        </p>
        <p className='mt-2'>
          Kullanıcı hesapları için güçlü parola politikası, erişim kontrolü ve
          düzenli güvenlik güncellemeleri uygulanır. Sunucu ve veri tabanları
          düzenli olarak yedeklenir ve izinsiz erişime karşı korunur.
        </p>
      </section>
      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>Kullanıcı Sorumluluğu</h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Parolanızı kimseyle paylaşmayınız.</li>
          <li>
            Şüpheli bir durum fark ederseniz hemen destek ekibimize bildiriniz.
          </li>
        </ul>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
