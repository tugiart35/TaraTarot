// Bu dosya, yasal gerekliliklere uygun Hakkımızda sayfasını oluşturur.
// Platformun amacı, vizyonu ve temel bilgilerini içerir.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function About() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>ℹ️ Hakkımızda</h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          Tarot ve numeroloji alanında uzmanlaşmış, güvenilir ve profesyonel
          hizmet sunan platform.
        </p>
      </section>
      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>Misyonumuz</h2>
        <p>
          Tarot-Numeroloji olarak, kullanıcılarımıza en doğru, güvenilir ve etik
          tarot ile numeroloji analizlerini sunmayı amaçlıyoruz. Kişisel gelişim
          ve farkındalık yolculuğunuzda yanınızdayız.
        </p>
      </section>
      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>Vizyonumuz</h2>
        <p>
          Modern teknolojiyi kullanarak, spiritüel danışmanlık ve kişisel analiz
          hizmetlerini herkes için erişilebilir ve anlaşılır kılmak.
        </p>
      </section>
      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>Temel Bilgiler</h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            <b>Platform:</b> Tarot-Numeroloji
          </li>
          <li>
            <b>Kuruluş Yeri:</b> Podgorica, Karadağ
          </li>
          <li>
            <b>İletişim:</b> info@tarotnumeroloji.com
          </li>
        </ul>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
