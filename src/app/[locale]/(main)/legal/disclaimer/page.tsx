// Bu dosya, yasal gerekliliklere uygun Sorumluluk Reddi (Disclaimer) sayfasını oluşturur.
// Platformun yasal sorumluluk sınırlarını ve kullanıcıya yönelik uyarıları içerir.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function Disclaimer() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          ⚠️ Sorumluluk Reddi
        </h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          Yasal Uyarı ve Sorumluluk Sınırları
        </p>
      </section>
      <section className='mb-6'>
        <p>
          Bu platformda sunulan tarot ve numeroloji analizleri, bilgi ve eğlence
          amaçlıdır. Hiçbir içerik tıbbi, hukuki veya finansal tavsiye yerine
          geçmez. Kullanıcılar, platformdaki içeriklere dayanarak aldıkları
          kararlardan tamamen kendileri sorumludur.
        </p>
        <p className='mt-2'>
          Platform, içeriklerin doğruluğu ve güncelliği konusunda azami özen
          gösterse de, oluşabilecek doğrudan veya dolaylı zararlardan sorumlu
          tutulamaz.
        </p>
      </section>
      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          Profesyonel Danışmanlık Yerine Geçmez
        </h2>
        <p>
          Sunulan hizmetler, profesyonel bir danışmanlık, terapi veya tedavi
          yerine geçmez. Gerekli durumlarda uzman bir danışmana başvurmanız
          önerilir.
        </p>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
