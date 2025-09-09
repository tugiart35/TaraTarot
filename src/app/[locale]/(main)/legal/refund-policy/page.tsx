// Bu dosya, yasal gerekliliklere uygun Geri Ödeme Politikası sayfasını oluşturur.
// Dijital hizmetlerde geri ödeme koşulları ve müşteri haklarını açıklar.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function RefundPolicy() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          💸 Geri Ödeme Politikası
        </h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          Dijital hizmetlerde iade koşulları
        </p>
      </section>
      <section className='mb-6'>
        <p>
          Tarot-Numeroloji platformunda sunulan dijital hizmetler (analiz,
          danışmanlık, kredi vb.) anında ifa edilen ve kişiye özel içeriklerdir.
          Bu nedenle, hizmet sunulduktan sonra geri ödeme yapılmaz.
        </p>
        <p className='mt-2'>
          Ancak, teknik bir hata, hizmetin hiç sunulamaması veya yanlışlıkla
          ödeme gibi durumlarda,{' '}
          <a
            href='mailto:info@tarotnumeroloji.com'
            className='text-blue-600 underline'
          >
            info@tarotnumeroloji.com
          </a>{' '}
          adresine başvurarak iade talebinde bulunabilirsiniz. Her talep
          bireysel olarak incelenir ve uygun görülen iadeler 7 iş günü içinde
          gerçekleştirilir.
        </p>
      </section>
      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>İstisnalar</h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Kullanıcı hatası veya memnuniyetsizlik nedeniyle iade yapılmaz.
          </li>
          <li>
            Hizmetin hiç sunulamaması veya teknik arıza durumunda iade
            mümkündür.
          </li>
        </ul>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
