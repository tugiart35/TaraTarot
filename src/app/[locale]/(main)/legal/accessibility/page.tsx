// Bu dosya, yasal gerekliliklere uygun Erişilebilirlik Politikası sayfasını oluşturur.
// Platformun engelli kullanıcılar için erişilebilirlik taahhüdünü ve uygulamalarını açıklar.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function Accessibility() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          ♿ Erişilebilirlik Politikası
        </h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          Engelli kullanıcılar için erişilebilirlik taahhüdü
        </p>
      </section>
      <section className='mb-6'>
        <p>
          Tarot-Numeroloji platformu, tüm kullanıcıların eşit şekilde hizmet
          alabilmesi için erişilebilirlik standartlarına uymayı taahhüt eder.
          Web sitemiz, ekran okuyucu uyumluluğu, yüksek kontrast ve klavye ile
          gezinme gibi özelliklerle desteklenmektedir.
        </p>
        <p className='mt-2'>
          Erişilebilirlik ile ilgili öneri ve şikayetlerinizi{' '}
          <a
            href='mailto:info@tarotnumeroloji.com'
            className='text-blue-600 underline'
          >
            info@tarotnumeroloji.com
          </a>{' '}
          adresine iletebilirsiniz.
        </p>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
