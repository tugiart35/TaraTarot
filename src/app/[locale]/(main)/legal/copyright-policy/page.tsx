// Bu dosya, yasal gerekliliklere uygun Telif Hakkı Politikası sayfasını oluşturur.
// Platformdaki içeriklerin telif hakları ve ihlal durumunda izlenecek yolu açıklar.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function CopyrightPolicy() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          ©️ Telif Hakkı Politikası
        </h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          Tüm içeriklerin telif hakları korunmaktadır.
        </p>
      </section>
      <section className='mb-6'>
        <p>
          Platformda yer alan tüm metin, görsel, grafik, yazılım ve diğer
          içeriklerin telif hakları Tarot-Numeroloji’ye veya ilgili hak
          sahiplerine aittir. İzinsiz kopyalama, çoğaltma, dağıtma veya kullanma
          yasaktır.
        </p>
      </section>
      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          Telif Hakkı İhlali Bildirimi
        </h2>
        <p>
          Herhangi bir telif hakkı ihlali tespit ederseniz, lütfen{' '}
          <a
            href='mailto:info@tarotnumeroloji.com'
            className='text-blue-600 underline'
          >
            info@tarotnumeroloji.com
          </a>{' '}
          adresine gerekli kanıtlarla birlikte bildirimde bulunun. Gerekli
          inceleme sonrası ihlal tespit edilirse içerik kaldırılacaktır.
        </p>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
