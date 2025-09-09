// Bu dosya, yasal gerekliliklere uygun Ödeme Şartları sayfasını oluşturur.
// Dijital hizmetlerde ödeme yöntemleri, süreç ve kullanıcı yükümlülüklerini açıklar.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function PaymentTerms() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          💳 Ödeme Şartları
        </h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          Dijital hizmetlerde ödeme koşulları
        </p>
      </section>
      <section className='mb-6'>
        <p>
          Platformda sunulan tüm dijital hizmetler için ödeme, sipariş sırasında
          kredi kartı, banka kartı veya entegre ödeme sistemleri (ör. Shopier,
          Stripe vb.) üzerinden alınır. Ödeme tamamlanmadan hizmet sunulmaz.
        </p>
        <p className='mt-2'>
          Kullanıcı, ödeme sırasında doğru ve güncel bilgiler vermekle
          yükümlüdür. Ödeme işlemi sırasında oluşabilecek teknik sorunlarda
          destek ekibimizle iletişime geçebilirsiniz.
        </p>
      </section>
      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>Fatura ve Bilgilendirme</h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Her ödeme sonrası dijital fatura e‑posta ile iletilir.</li>
          <li>Ödeme işlemleri güvenli altyapı ile korunur.</li>
        </ul>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
