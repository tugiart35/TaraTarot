// Bu dosya, yasal gerekliliklere uygun İletişim sayfasını oluşturur.
// Kullanıcıların platform ile iletişime geçebileceği bilgileri ve formu içerir.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function Contact() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>📞 İletişim</h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          Her türlü soru, öneri ve talepleriniz için bize ulaşabilirsiniz.
        </p>
      </section>
      <section className='mb-6'>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            <b>E‑posta:</b> info@tarotnumeroloji.com
          </li>
          <li>
            <b>Telefon:</b> +90 (…) xxx xx xx
          </li>
          <li>
            <b>Adres:</b> Podgorica, Karadağ
          </li>
        </ul>
      </section>
      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>İletişim Formu</h2>
        {/* Burada backend'e bağlanılacak iletişim formu olacak */}
        <form className='space-y-4'>
          <input
            type='text'
            placeholder='Adınız Soyadınız'
            className='w-full border rounded p-2'
            disabled
          />
          <input
            type='email'
            placeholder='E‑posta Adresiniz'
            className='w-full border rounded p-2'
            disabled
          />
          <textarea
            placeholder='Mesajınız'
            className='w-full border rounded p-2'
            rows={4}
            disabled
          />
          <button
            type='submit'
            className='w-full bg-gray-400 text-white rounded p-2 cursor-not-allowed'
            disabled
          >
            Gönder (Pasif)
          </button>
        </form>
        <p className='text-xs text-gray-500 mt-2'>
          * İletişim formu ileride aktif hale getirilecektir.
        </p>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
