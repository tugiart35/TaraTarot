// Bu dosya, Karadağ PDPL uyumlu güncel Gizlilik Politikası sayfasını oluşturur.
// Kullanıcıların kişisel verilerinin işlenmesi, hakları ve güvenliği hakkında detaylı bilgi sunar.
// Mobil öncelikli, sade ve modern bir arayüz sağlar.

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          📘 Gizlilik Politikası
        </h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          Karadağ PDPL Uyumlu
        </p>
        <p className='text-center text-xs text-gray-400'>
          Son Güncelleme: 8 Temmuz 2025
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>1. Giriş</h2>
        <p>
          Bu politikada geçen “Platform”, Tarot ve Numeroloji hizmetlerini sunan{' '}
          <b>www.tarotnumeroloji.com</b> olarak anılmaktadır. Bu gizlilik
          politikası, Karadağ’daki Law on Personal Data Protection (PDPL)
          hükümlerine uygun şekilde kişisel veri işleme uygulamalarımızı
          açıklar.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>2. Uygulama Kapsamı</h2>
        <p>
          PDPL, Karadağ’da faaliyet gösteren tüm yerli ve yabancı kuruluşlara,
          elektronik ya da manuel veri işleme sistemleriyle veri toplayan
          şirketlere uygulanır.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          3. Toplanan Veriler & Hassas Kategoriler
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            <b>Kişisel veriler:</b> Ad, soyad, e‑posta, IP adresi, çerez
            verileri vb.
          </li>
          <li>
            <b>Hassas veriler:</b> Doğum tarihi, sağlık durumu gibi özel
            kategoriler. Bu kategorilerin işlenmesi ancak açık rıza veya yasal
            istisnalarla mümkündür.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>4. İşleme Koşulları</h2>
        <p>Veri işleme faaliyetlerimiz şunlara dayanmaktadır:</p>
        <ol className='list-decimal pl-5 space-y-1'>
          <li>Aydınlatılmış açık rıza,</li>
          <li>Sözleşme veya yasal yükümlülüklerin yerine getirilmesi,</li>
          <li>
            Hayati çıkarlar gibi yasal amacı dışında bir nedene dayanmadan
            gerçekleştirilir.
          </li>
        </ol>
        <p className='mt-2'>
          Ayrıca, veri minimizasyonu, amaç sınırlaması, veri doğruluğu ve
          saklama süresi sınırlaması ilkelerine sıkı şekilde uyuyoruz.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          5. Veri Sorumlusu Kaydı & DPO
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Platform, Karadağ Veri Koruma Ajansı (AZLP) nezdinde veri sorumlusu
            olarak kayıtlıdır; veri tabanlarımız için ayrı başvurular
            yapılmıştır.
          </li>
          <li>
            Çalışan sayımız 10 ve üzeri olduğunda DPO (Veri Koruma Görevlisi)
            atanacaktır. Mevcut durumda yükümlülüklerimize uygun atama
            planlanmıştır.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          6. Teknik ve Organizasyonel Güvenlik
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Şifreleme, erişim kontrolü ve sistem loglaması,</li>
          <li>Çalışan eğitimleri ve gizlilik politikaları,</li>
          <li>Düzenli iç denetimler uygulanmaktadır.</li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          7. Veri İhlali (Breach) Bildirim Prosedürü
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Herhangi bir veri ihlali durumunda, 72 saat içinde AZLP’ye bildirimi
            gerçekleştiriyoruz.
          </li>
          <li>
            Eğer ihlal, kullanıcı verilerinin haklarını etkiliyorsa, ilgili
            kullanıcılar da derhal bilgilendirilecektir.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>8. Kullanıcı Hakları</h2>
        <p>Karadağ PDPL kapsamında, kullanıcılar aşağıdaki haklara sahiptir:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Kişisel verilere erişim, düzeltme, silme, işleme itiraz,</li>
          <li>İşleme sınırlaması talebi,</li>
          <li>Otomatik karar süreçlerine itiraz,</li>
          <li>Verilerin taşınabilirliğini talep etme.</li>
        </ul>
        <p className='mt-2'>
          Başvurularınızı{' '}
          <a
            href='mailto:info@tarotnumeroloji.com'
            className='text-blue-600 underline'
          >
            info@tarotnumeroloji.com
          </a>{' '}
          adresine kimlik doğrulama belgeleriyle iletebilirsiniz.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          9. Uluslararası Veri Transferleri
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Karadağ dışına veri transferi öncesinde AZLP onayı alınmaktadır.
          </li>
          <li>
            İstisnalar: AB/AEA ülkeleri, AB tarafından yeterli kabul edilen
            üçüncü ülkeler, kullanıcının açık yazılı rızası.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          10. Veri Saklama Süresi ve İmha
        </h2>
        <p>
          Kişisel veriler, yalnızca işleme amaçlarının gerektirdiği süre boyunca
          saklanır; süre bitince anonimleştirilir veya güvenli şekilde imha
          edilir.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          11. Çerezler ve Doğrudan Pazarlama
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Kullanıcıların çerez tercihleri dikkate alınır.</li>
          <li>
            Çerez kullanımı hakkında net bilgi sağlanır ve itiraz hakkı sunulur.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>12. Değişiklikler</h2>
        <p>
          Bu politika, düzenleyici ya da işleyişsel gereksinimler doğrultusunda
          periyodik olarak güncellenir. En güncel versiyon her zaman{' '}
          <a
            href='https://www.tarotnumeroloji.com'
            className='text-blue-600 underline'
          >
            www.tarotnumeroloji.com
          </a>{' '}
          adresinde yayınlanacaktır.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>13. İletişim Bilgileri</h2>
        <div className='bg-gray-100 rounded-lg p-4'>
          <p className='mb-1'>
            <b>E‑posta:</b>{' '}
            <a
              href='mailto:info@tarotnumeroloji.com'
              className='text-blue-600 underline'
            >
              info@tarotnumeroloji.com
            </a>
          </p>
          <p className='mb-1'>
            <b>Adres:</b> Podgorica, Karadağ
          </p>
          <p className='mb-1'>
            <b>Veri Sorumlusu:</b> Tarot-Numeroloji Platformu, Kaydı: AZLP
          </p>
        </div>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
