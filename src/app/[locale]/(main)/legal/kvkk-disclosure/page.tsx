// Bu dosya, Türkiye hizmetlerine uyumlu KVKK Aydınlatma Metni sayfasını oluşturur.
// Kullanıcıların kişisel verilerinin işlenmesi, hakları ve başvuru yolları hakkında bilgi verir.
// Mobil öncelikli, sade ve modern bir arayüz sunar.

import React from 'react';

export default function KvkkDisclosure() {
  return (
    <main className='max-w-xl mx-auto px-4 py-8 text-gray-800'>
      <section className='mb-8'>
        <h1 className='text-2xl font-bold mb-2 text-center'>
          📄 KVKK Aydınlatma Metni
        </h1>
        <p className='text-center text-sm text-gray-500 mb-1'>
          Türkiye Hizmetlerine Uyumlu
        </p>
        <p className='text-center text-xs text-gray-400'>
          Son Güncelleme: 8 Temmuz 2025
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          1. Veri Sorumlusunun Kimliği
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            <b>Veri Sorumlusu:</b> Tarot-Numeroloji Platformu
          </li>
          <li>
            <b>Adres:</b> Podgorica, Karadağ
          </li>
          <li>
            <b>E‑posta:</b> info@tarotnumeroloji.com
          </li>
          <li>
            <b>Telefon:</b>{' '}
            {process.env.NEXT_PUBLIC_CONTACT_PHONE || '+90 (…) xxx xx xx'}
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          2. Kişisel Verilerin Toplanma Yöntemi
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            <b>Doğrudan:</b> Kayıt formu, tarot/numeroloji analizi talebi,
            e‑posta talepleri vs.
          </li>
          <li>
            <b>Dolaylı:</b> Site kullanımı sırasında toplanan IP, çerez
            verileri, kullanım analizleri.
          </li>
        </ul>
        <p className='mt-2'>
          Hukuki dayanaklar: KVKK madde 5/6, “açık rıza”, “sözleşmenin ifası”,
          “meşru menfaat” gibi gerekçelerdir.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          3. İşlenen Kişisel Veriler & Amaçlar
        </h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm border border-gray-200 rounded-lg'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='p-2 border'>Kategori</th>
                <th className='p-2 border'>İşlenen Veriler</th>
                <th className='p-2 border'>İşleme Amaçları</th>
                <th className='p-2 border'>Hukuki Sebep</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2 border'>Kimlik & iletişim</td>
                <td className='p-2 border'>Ad, soyad, e‑posta, telefon</td>
                <td className='p-2 border'>Hizmet sunumu, iletişim</td>
                <td className='p-2 border'>Sözleşme / meşru menfaat</td>
              </tr>
              <tr>
                <td className='p-2 border'>Doğum/burç bilgisi</td>
                <td className='p-2 border'>Doğum tarihi, yeri</td>
                <td className='p-2 border'>Numeroloji analizleri</td>
                <td className='p-2 border'>Açık rıza</td>
              </tr>
              <tr>
                <td className='p-2 border'>Site kullanım verisi</td>
                <td className='p-2 border'>IP, çerez, analiz verileri</td>
                <td className='p-2 border'>Site işleyişi, güvenlik</td>
                <td className='p-2 border'>Meşru menfaat</td>
              </tr>
              <tr>
                <td className='p-2 border'>Pazarlama tercihleri</td>
                <td className='p-2 border'>E‑posta onay bilgisi</td>
                <td className='p-2 border'>Reklam/duyuru gönderimi</td>
                <td className='p-2 border'>Açık rıza</td>
              </tr>
            </tbody>
          </table>
          <p className='text-xs text-gray-500 mt-2'>
            Pazarlama amaçlı e‑posta gönderimi için öncelikle açık rıza
            alınmaktadır.
          </p>
        </div>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          4. Kişisel Verilerin Aktarımı
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Hizmet sağlayıcı firmalar (ör. hosting, analitik araçlar, ödeme
            sistemleri)
          </li>
          <li>Yasal yükümlülük: resmi kurumlar, mahkemeler</li>
          <li>Açık rızanız doğrultusunda pazarlama/analiz ortakları</li>
          <li>
            Yurt dışı transferi: Karadağ–Türkiye ve gerektiğinde diğer
            ülkelerde, KVKK’nın 9. maddesine uygun şekilde
            gerçekleştirilmektedir.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>5. Saklama Süresi</h2>
        <p>
          İşlenen tüm kişisel veriler, işlem amaçları devam ettiği sürece
          saklanacak, amaç sona erdikten sonra silinecek, yok edilecek veya
          anonimleştirilecektir.
          <br />
          (E‑posta listesi için örneğin 2 yıl gibi süreler uygulanabilir.)
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>6. İlgili Kişi Hakları</h2>
        <p>KVKK 11. madde uyarınca şöyle haklarınız bulunmaktadır:</p>
        <ol className='list-decimal pl-5 space-y-1'>
          <li>Verilerinizin işlenip işlenmediğini öğrenme,</li>
          <li>İşlenen veriler hakkında bilgi alma,</li>
          <li>İşleme amacı ve bu amaca uygun kullanımın sorgulanması,</li>
          <li>
            Yurt içinde veya dışında aktarılan kişilere ilişkin bilgilendirme,
          </li>
          <li>
            Verilerinizin eksik ya da yanlış işlenmiş olması durumunda düzeltme
            isteme,
          </li>
          <li>İşleme sınırlandırma,</li>
          <li>Evrensel silinme isteği,</li>
          <li>Otomatik karar/analiz süreçlerine karşı itiraz,</li>
          <li>Zarara uğramanız halinde tazmin talebi.</li>
        </ol>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          7. Hak Talep Kanalı ve Süre
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>E‑posta: info@tarotnumeroloji.com</li>
          <li>Adres: Podgorica, Karadağ</li>
          <li>Telefon: +90 (…) xxx xx xx</li>
        </ul>
        <p className='mt-2'>
          Başvurularınız en geç 30 gün içinde ücretsiz olarak
          sonuçlandırılacaktır.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>8. Rıza ve Açık İzin</h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Kişisel veri toplama ve pazarlama için açık, bilgilendirilmiş rıza
            alınmaktadır.
          </li>
          <li>
            Rızanızı dilediğiniz zaman geri çekebilirsiniz, bu durum hizmet
            alımınızı etkilemez fakat pazarlama iletilerini durdurur.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          9. Güvenlik ve Çerez Politikası
        </h2>
        <ul className='list-disc pl-5 space-y-1'>
          <li>
            Verileriniz, teknik ve idari tedbirlerle korunur (şifreleme, erişim
            kontrolü, loglama vs.).
          </li>
          <li>
            Çerezler hakkında detaylı bilgiye ve tercihlerinizi yönetme imkânına
            Çerez Politikası bölümünden ulaşabilirsiniz.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='font-semibold text-lg mb-2'>
          10. Politika Değişiklikleri
        </h2>
        <p>
          Bu metin, KVKK’da meydana gelen değişiklikler doğrultusunda
          güncellenebilir. Güncel metin her zaman web sitemizde yayımlanacaktır.
        </p>
      </section>
    </main>
  );
}
// Burada backend'e bağlanılacak alanlar için ileride entegrasyon notu eklenebilir.
