// Bu dosya, yasal gerekliliklere uygun Çocuk Gizliliği Politikası sayfasını oluşturur.
// 13 yaş altı kullanıcıların gizliliği ve ebeveyn haklarını açıklar.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function ChildPrivacy() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          🧒 Çocuk Gizliliği Politikası
        </h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          13 yaş altı kullanıcıların gizliliği
        </p>
      </section>
      <section className='mb-6'>
        <p>
          Tarot-Numeroloji platformu, 13 yaş altı çocuklardan bilerek kişisel
          veri toplamaz. 13 yaş altı kullanıcıların hizmetlerimizi
          kullanabilmesi için ebeveyn izni gereklidir. Ebeveynler, çocuklarının
          verilerinin silinmesini talep edebilir.
        </p>
        <p className='mt-2'>
          Eğer bir çocuğun izinsiz olarak kişisel verisi toplandığını
          düşünüyorsanız, lütfen{' '}
          <a
            href='mailto:info@tarotnumeroloji.com'
            className='text-blue-600 underline'
          >
            info@tarotnumeroloji.com
          </a>{' '}
          adresine başvurun. Gerekli inceleme sonrası veri silinecektir.
        </p>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
