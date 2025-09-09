// Bu dosya, Karadağ uyumlu Çerez Politikası sayfasını oluşturur.
// Kullanıcıların çerezler hakkında bilgilendirilmesi ve haklarının korunması için hazırlanmıştır.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function CookiePolicy() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          🍪 Çerez Politikası
        </h1>
        <p className='text-center text-sm text-gray-500 mb-1'>Karadağ Uyumlu</p>
        <p className='text-center text-xs text-gray-400'>
          Son Güncelleme: 8 Temmuz 2025
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>1. Çerezler Nelerdir?</h2>
        <p>
          Çerezler, ziyaret ettiğiniz web sayfalarının cihazınıza yerleştirdiği
          küçük metin dosyalarıdır. Teknik ihtiyaçların karşılanması,
          tercihlerinizin hatırlanması, güvenlik sağlanması ve analiz gibi
          amaçlarla kullanılır.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>2. Yasal Dayanak</h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Çerezler veri oluşturur ve PDPL ile Elektronik Haberleşme Kanunu
            kapsamındadır.
          </li>
          <li>
            PDPL, çerezlerin kişisel verileri içermesi durumunda toplanması ve
            işlenmesi için aydınlatılmış açık rıza gerektirir.
          </li>
          <li>
            Elektronik Haberleşme Kanunu, çerezlerin kullanımında önceden
            bilgilendirme ve açık rıza şartı öngörür; aksi halde kullanım
            yasaktır.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>3. Çerez Kategorileri</h2>
        <div className='space-y-3'>
          <div>
            <h3 className='font-semibold'>1. Zorunlu (Strictly Necessary)</h3>
            <ul className='list-disc pl-5 text-sm'>
              <li>Oturum yönetimi, güvenlik, navigasyon amaçlı.</li>
              <li>
                Kullanıcı izni olmaksızın kullanılabilir; ancak bu çerezlerin
                amacı kullanıcıya açık olarak bildirilmeli.
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold'>
              2. Analiz & İstatistik (Performance)
            </h3>
            <ul className='list-disc pl-5 text-sm'>
              <li>Site kullanım analizleri için.</li>
              <li>Kullanıcı rızası gerekir.</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold'>
              3. Pazarlama ve Reklam (Marketing)
            </h3>
            <ul className='list-disc pl-5 text-sm'>
              <li>Kişiselleştirilmiş reklamlar ve yeniden hedefleme için.</li>
              <li>Kesinlikle kullanıcı onayı gereklidir.</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold'>4. Fonksiyonel (Preferences)</h3>
            <ul className='list-disc pl-5 text-sm'>
              <li>Dil tercihi, tema gibi özelleştirmeler.</li>
              <li>
                Açık rıza ile kullanılır; teknik olmayan işlevsel çerezler ise
                analiz gerekebilir.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>4. Rıza Yönetimi</h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Çerezler, ziyaretçiler siteye ilk girdiğinde gösterilen bir çerez
            banner’ı ile sunulur.
          </li>
          <li>
            Banner şunları içerir: çerez kategorilerinin açıklaması, “Kabul Et”
            ve “Reddet” seçenekleri, detaylı Çerez Politikası’na bağlantı,
            rızanın geri alınma yöntemi.
          </li>
          <li>“Kabul Et” ve “Reddet” butonları eşit görünürlükte olmalı.</li>
          <li>
            Rıza “önceden işaretli kutular” veya banner’ın gizlenmesi ile olmaz;
            açık eylem gereklidir.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          5. Çerez Listesi ve Açıklama (Örnek)
        </h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm border border-gray-200 rounded-lg'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='p-2 border'>Çerez Adı</th>
                <th className='p-2 border'>Kategori</th>
                <th className='p-2 border'>Amaç</th>
                <th className='p-2 border'>Saklama Süresi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2 border'>PHPSESSID</td>
                <td className='p-2 border'>Zorunlu</td>
                <td className='p-2 border'>Kullanıcı oturumunu yönetir</td>
                <td className='p-2 border'>Oturum süresince</td>
              </tr>
              <tr>
                <td className='p-2 border'>_ga, _gid</td>
                <td className='p-2 border'>Analiz</td>
                <td className='p-2 border'>
                  Google Analytics ile web trafiği incelenir
                </td>
                <td className='p-2 border'>2 yıl / 24 saat</td>
              </tr>
              <tr>
                <td className='p-2 border'>_fbp</td>
                <td className='p-2 border'>Pazarlama</td>
                <td className='p-2 border'>
                  Facebook reklamları için kullanıcı ataması
                </td>
                <td className='p-2 border'>3 ay</td>
              </tr>
              <tr>
                <td className='p-2 border'>lang</td>
                <td className='p-2 border'>Fonksiyonel</td>
                <td className='p-2 border'>Dil tercihini hatırlama</td>
                <td className='p-2 border'>1 yıl</td>
              </tr>
            </tbody>
          </table>
          <p className='text-xs text-gray-500 mt-2'>
            Gerçek kullanılan çerezlere göre güncellenmelidir.
          </p>
        </div>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>6. Rıza ve Red Beyanı</h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Kullanıcı, banner üzerinden rızasını verebilir veya reddedebilir.
          </li>
          <li>
            Rıza durumu tarayıcıda saklanır (çerezle ile) ve banner yeniden
            görünmez.
          </li>
          <li>
            Kullanıcı rızayı istediği zaman çerez ayarları sayfasından geri
            çekebilir.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>7. Çerez İptali</h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Tarayıcı ayarlarıyla da çerez reddi mümkündür.</li>
          <li>
            Bazı çerezler devre dışı bırakılırsa site çalışmasında sınırlama
            olabilir.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          8. Çerezler Hakkında Bilgi
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Çerezlerle ilgili güncel bilgiler, kullanılan üçüncü taraf
            hizmetlerin gizlilik sayfalarında bulunabilir (örneğin Google
            Analytics, Facebook).
          </li>
          <li>
            Kullanıcıların çerez tercihlerini ve bu çerezlerin işlevlerini
            bunlardan takip edebilir.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          9. Politika Güncellemeleri
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Bu çerez politikası yasal değişiklik ve teknik gereksinimler
            nedeniyle güncellenebilir.
          </li>
          <li>Güncel sürüm her zaman web sitesinde yer alacaktır.</li>
        </ul>
      </section>
    </main>
  );
}
// Bu dosyada kullanıcı rıza durumu sadece çerez ile saklanıyor. Firebase entegrasyonu gerekmedi.
