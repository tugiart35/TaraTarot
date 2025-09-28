/*
info:
Bağlantılı dosyalar:
- './position-meanings-index': Ana pozisyon anlamları index dosyası
- '@/types/tarot': Tarot kartı tipi tanımları

Dosyanın amacı:
- Durum Analizi açılımında 1. pozisyon (Geçmiş ya da Sebepler) için 78 tarot kartının özel anlamlarını içerir
- Her kart için upright ve reversed anlamları, anahtar kelimeler ve bağlam bilgileri sağlar
- Pozisyon bazlı kart anlamları yönetimi

Supabase değişkenleri ve tablolar:
- Bu dosya sadece frontend tarafında kullanılır, doğrudan Supabase bağlantısı yok

Geliştirme önerileri:
- i18n desteği genişletilebilir
- Diğer pozisyonlar için benzer dosyalar oluşturulabilir

Tespit edilen hatalar:
- Yok

Kullanım durumları:
- position5Meanings: gerekli
- getposition5Meaning: gerekli
*/

import { MarriagePositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position5Meanings: MarriagePositionMeaning[] = [
  // ========== MAJÖR ARKANA (22) ==========
  {
    id: 'the_fool_ma_pos5',
    card: 'The Fool',
    position: 5,
    upright:
      'Saf, taze bir ruhla dünyaya bakma benzerliği güçlü. İkiniz de spontanlığı ve keşfi seviyorsunuz; birlikte öğrenmek size iyi gelir.',
    reversed:
      'Biri özgürlüğe, diğeri güvenliğe daha çok ihtiyaç duyabilir. Plansızlık–ihtiyat dengesi kurulmazsa ortak ritim zorlanır.',
    keywords: ['başlangıç', 'özgürlük', 'merak', 'oyun', 'naiflik'],
    context:
      'Keşif sevgisi ortak alan. Tempo ve güvenlik ihtiyacı farklılaşabilir. Denge kurulduğunda uyum artar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos5',
    card: 'The Magician',
    position: 5,
    upright:
      'Niyet koyma ve sözü eyleme bağlama konusunda benzer enerjiler var. İletişim gücünüz birbirini parlatır.',
    reversed:
      'İfade tarzınızdan biri büyülü, diğeri kuşkulu kalabilir. Abartı ya da suskunluk ortak zemini kaydırır.',
    keywords: ['niyet', 'ifade', 'yaratım', 'tutarlılık', 'iletişim'],
    context:
      'İcraya dönük, iletişim temelli benzerlik yüksek. Şeffaflık korunursa uyum derinleşir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos5',
    card: 'The High Priestess',
    position: 5,
    upright:
      'Sezgi, iç dünya ve mahremiyette benzer frekans. Sessiz anlarınızda bile birbirinizi anlarsınız.',
    reversed:
      'Biriniz açılırken diğeri sır saklayabilir. Kapalı ajanda güven duygusunu inceltir.',
    keywords: ['sezgi', 'giz', 'mahremiyet', 'içgörü', 'sükunet'],
    context:
      'Derinlik ve sezgide ortaklık. Giz saklama eğilimi ayrışırsa açıklık gerek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos5',
    card: 'The Empress',
    position: 5,
    upright:
      'Bakım verme, üretkenlik ve estetikte benzer zevkler. Sıcak, besleyici bir ortak alan oluşur.',
    reversed:
      'Aşırı sahiplenme/ihmal algısı ritmi bozabilir. Öz bakım dengesi kurulmazsa doyum düşer.',
    keywords: ['şefkat', 'bereket', 'bakım', 'estetik', 'beden'],
    context:
      'Besleyici, duyusal benzerlikler kuvvetli. Sahiplenme dozuna dikkat.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos5',
    card: 'The Emperor',
    position: 5,
    upright:
      'Yapı, düzen ve sorumluluk alma değerleriniz benzer. Kurallar ve sınırlar huzur verir.',
    reversed:
      'Katılık düzeyiniz farklı olabilir. Kontrol dilinin dozu yakınlığı etkiler.',
    keywords: ['düzen', 'sınır', 'güven', 'oturmuşluk', 'sorumluluk'],
    context: 'Yapı ve güven arayışı ortak. Esneklik payı açıldıkça uyum artar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos5',
    card: 'The Hierophant',
    position: 5,
    upright:
      'Değer, etik ve ritüelde benzer kökler. Aile/gelenek alanında uzlaşma kolaydır.',
    reversed:
      'Biri geleneksel, biri özgürlükçü kalabilir. Kör kural ya da kör başkaldırı çatışma yaratır.',
    keywords: ['değer', 'inanç', 'ritüel', 'onay', 'uyum'],
    context: 'Değer temelli benzerlik var. Esneklik alanı konuşulmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos5',
    card: 'The Lovers',
    position: 5,
    upright:
      'Temel değerler, seçimler ve yaşam hedeflerinde güçlü hizalanma. Kalbiniz aynı “evet”e bakıyor.',
    reversed:
      'Kararsızlık veya öncelik çakışmaları hizayı bozabilir. Net seçim yapılmadıkça benzerlik hissi zayıflar.',
    keywords: ['değer', 'seçim', 'hizalanma', 'aşk', 'ittifak'],
    context: 'Değer uyumu yüksek. Karar netliği benzerliği kalıcı kılar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos5',
    card: 'The Chariot',
    position: 5,
    upright:
      'İlerleme, hedef ve disiplin odağında benzersiniz. Ortak rota sizi aynı hıza çağırır.',
    reversed:
      'Hız ve yöntem farklılığı ipi gerer. Direksiyon kavgası uyumu dağıtır.',
    keywords: ['yön', 'ivme', 'disiplin', 'hedef', 'kararlılık'],
    context: 'Hedef odaklı benzerlik var. Hız/tempo eşlemesi şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos5',
    card: 'Strength',
    position: 5,
    upright:
      'Nazik cesaret, sabır ve şefkat dilinde ortak titreşim. Yumuşak güçle birbirinizi büyütürsünüz.',
    reversed:
      'Kıskançlık ya da gurur tetikleri farklı çalışabilir. Sabır eşiği uyumlanmazsa gerilim artar.',
    keywords: ['sabır', 'şefkat', 'cesaret', 'öz-düzen', 'güven'],
    context: 'Şefkat temelli benzerlik güçlü. Tetiklerde nazik ayar gerek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos5',
    card: 'The Hermit',
    position: 5,
    upright:
      'İçe dönüş, derin düşünme ve kaliteli yalnızlıkta benzersiniz. Paylaşılan sessizlik bile yakınlık kurar.',
    reversed:
      'Biriniz yalnızlığı severken diğeri yakınlık isterse ritim şaşar. Aşırı izolasyon mesafe yaratır.',
    keywords: ['içe dönüş', 'bilgelik', 'alan', 'rehberlik', 'sükunet'],
    context: 'Derinlik ve alan ihtiyacı ortak. Doz ayarı uyumu korur.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos5',
    card: 'The Wheel of Fortune',
    position: 5,
    upright:
      'Değişime uyum ve fırsatı okuma beceriniz benzer. Döngülerle birlikte akabilirsiniz.',
    reversed:
      'Biri değişim severken diğeri sabit kalmak isteyebilir. Zamanlama okumaları çatışırsa uyum düşer.',
    keywords: ['döngü', 'zamanlama', 'esneklik', 'şans', 'akış'],
    context: 'Değişime açıklık ortak. Zaman okuması konuşulmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos5',
    card: 'Justice',
    position: 5,
    upright:
      'Adalet, şeffaflık ve eşitlikte buluşursunuz. Hesap verilebilir dil ikinizi de rahatlatır.',
    reversed:
      'Çifte standart algısı kolay tetiklenebilir. Telafi ve netlik kurulmazsa benzerlik hissi kaybolur.',
    keywords: ['adalet', 'denge', 'şeffaflık', 'sorumluluk', 'ölçü'],
    context: 'Adil paylaşım ortak değer. Şeffaflık sürmeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos5',
    card: 'The Hanged Man',
    position: 5,
    upright:
      'Perspektif değiştirme ve bekleyişte anlam bulma benzer. Askıda kalsanız da birbirinizi anlarsınız.',
    reversed:
      'Kurban anlatısı/erteleme alışkanlığı sizde farklı çalışabilir. Gönülsüz fedakârlık uyumu bozar.',
    keywords: ['perspektif', 'teslimiyet', 'feda', 'bekleyiş', 'anlam'],
    context: 'Bakış açısı esnekliği ortak. Ertelemeyi bilinçle ayarlayın.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos5',
    card: 'Death',
    position: 5,
    upright:
      'Bırakma ve dönüşümde benzer cesaret. Eski kabukları atıp yeniyi birlikte çağırabilirsiniz.',
    reversed:
      'Değişime direnç düzeyiniz farklı olabilir. Kapanış yapılmazsa ortak zemin daralır.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'bırakma', 'eşik'],
    context: 'Dönüşümle barışık ortaklık. Direnç görülürse ritüel faydalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos5',
    card: 'Temperance',
    position: 5,
    upright:
      'Ölçü, sentez ve orta yolu seviyorsunuz. Doz ayarı yapmak sizin ortak zekânız.',
    reversed:
      'Uçlara savrulma eğiliminiz farklılaşırsa karışım bozulur. Sabırsızlık uyumu zedeler.',
    keywords: ['denge', 'sentez', 'ölçü', 'sabır', 'uyum'],
    context: 'Orta yol ortak değer. Tempo birlikte kalibre edilmeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos5',
    card: 'The Devil',
    position: 5,
    upright:
      'Tutku ve çekimde güçlü benzerlik. Sınırlar konuşulursa güç, sevgiyle dengelenir.',
    reversed:
      'Kıskançlık/bağımlılık tetikleri farklı çalışabilir. Gölgeyle yüzleşme düzeyi uyumu belirler.',
    keywords: ['tutku', 'gölge', 'sınır', 'çekim', 'özgürlük'],
    context: 'Yüksek çekim ortak alan. Sınır ve şeffaflık şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos5',
    card: 'The Tower',
    position: 5,
    upright:
      'Gerçekle yüzleşme cesaretiniz benzer; kriz sizi arındırır. Yeniden inşa iradesi ortaktır.',
    reversed:
      'Sarsıntıyı ertelemeye meyilleriniz farklı olabilir. Yüzeysel tamir uyumu zayıflatır.',
    keywords: ['hakikat', 'yıkım', 'arınma', 'yapı', 'yeniden-kurulum'],
    context: 'Gerçeğe sadakat ortak. Ertelemeyin, onarın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos5',
    card: 'The Star',
    position: 5,
    upright:
      'Umut, şifa ve sadelikte buluşursunuz. Aynı göğe bakıp aynı nefesi paylaşırsınız.',
    reversed:
      'Umutsuzluk dili birinizde daha baskın olabilir. Sadelik yerine kaçış uyumu düşürür.',
    keywords: ['umut', 'şifa', 'sadelik', 'ilham', 'yenilenme'],
    context: 'Şifalı umut ortak değer. Umutsuzluk döneminde ritüel kurun.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos5',
    card: 'The Moon',
    position: 5,
    upright:
      'Hayal gücü ve sezgide benzersiniz. Korkular konuşulursa derin bağ kurulur.',
    reversed:
      'Varsayım ve şüphe toleransınız farklı olabilir. Netlik gelmezse benzerlik algısı bulanır.',
    keywords: ['sezgi', 'belirsizlik', 'korku', 'hayal', 'netlik'],
    context: 'Sezgisel yakınlık ortak. Gerçeklik testi şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos5',
    card: 'The Sun',
    position: 5,
    upright:
      'Neşe, otantiklik ve görünürlükte uyum. Birbirinizi parlatmayı seversiniz.',
    reversed:
      'Sahicilikten sapma veya kıyas gölgesi düşebilir. Yapay pozitiflik benzerliği örter.',
    keywords: ['sevinç', 'otantiklik', 'görünürlük', 'netlik', 'paylaşım'],
    context: 'Neşeli, sahici ortak zemin. Neşe gerçek kalsın.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos5',
    card: 'Judgement',
    position: 5,
    upright:
      'Yüzleşme ve yeniden doğuş çağrısında benzer cesaret. Geçmişi adilce kapatmayı bilirsiniz.',
    reversed:
      'Aşırı öz-yargı/hiç sorumluluk almama uçlarınız farklı olabilir. Affediş düzeyi uyumu etkiler.',
    keywords: ['yüzleşme', 'yenilenme', 'affediş', 'çağrı', 'hesap'],
    context: 'Adil muhasebe ortak değer. Merhamet dengeyi sağlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos5',
    card: 'The World',
    position: 5,
    upright:
      'Tamamlama, entegrasyon ve büyük resimde aynı bakış. Döngüleri birlikte kapatmaya yatkınsınız.',
    reversed:
      'Yarım bırakma eğilimleriniz farklı olabilir. Eksik uçlar kapanmazsa bütünlük duygusu sarsılır.',
    keywords: ['bütünlük', 'tamamlama', 'entegrasyon', 'eşik', 'sistem'],
    context: 'Büyük resimde uyum var. Tamamlanmamış işlere odak faydalı.',
    group: 'Majör Arkana',
  },

  // ========== KUPALAR (14) ==========
  {
    id: 'ace_of_cups_ma_pos5',
    card: 'Ace of Cups',
    position: 5,
    upright:
      'Kalp açıklığı ve duyguyu safça akıtma benzer. Şefkat dili ortak bağınızı büyütür.',
    reversed:
      'Duyguyu ifade eşiğiniz farklı olabilir. Utangaç paylaşım benzerliği gölgeler.',
    keywords: ['kalp', 'açılım', 'şefkat', 'yakınlık', 'akış'],
    context: 'Duygusal akış ortak alan. İfade eşiği uyumlanmalı.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ma_pos5',
    card: 'Two of Cups',
    position: 5,
    upright:
      'Karşılıklılık, nezaket ve eşit alışverişte eşleşme. Birbirinizin dilini kolay yakalarsınız.',
    reversed:
      'Veren–alan dengesinde dönemsel sapmalar olabilir. Küçük telafiler benzerliği korur.',
    keywords: ['karşılıklılık', 'uyum', 'eşitlik', 'bağ', 'naziklik'],
    context: 'Al–ver dengesi ortak değer. Telafi ritmi önemli.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ma_pos5',
    card: 'Three of Cups',
    position: 5,
    upright:
      'Sosyallik, dostluk ve kutlama kültürünüz benzer. Kalabalıkta da birlikte parlıyorsunuz.',
    reversed:
      'Sosyal enerji dozunuz farklı olabilir. Yüzeysellikten kaçınmak uyumu korur.',
    keywords: ['kutlama', 'dostluk', 'paylaşım', 'ritüel', 'neşe'],
    context: 'Sosyal ritimde benzerlik. Doz ve mahremiyet konuşulsun.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ma_pos5',
    card: 'Four of Cups',
    position: 5,
    upright:
      'İç gözlem ve sade mutlulukta benzer bakış. Şükran pratiği ortak alanı güçlendirir.',
    reversed:
      'Biri yeniye açılırken diğeri isteksiz kalabilir. Fırsatı görmek için zihin filtresi temizlenmeli.',
    keywords: ['iç gözlem', 'tatmin', 'şükran', 'farkındalık', 'sadelik'],
    context:
      'Sakin tatmin anlayışı ortak. Fırsatı görme eşiği farklılaşabilir.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ma_pos5',
    card: 'Five of Cups',
    position: 5,
    upright:
      'Yasla onurlu ilişki ve kayıpta dayanışma benzer. Kalanı görme beceriniz ortak.',
    reversed:
      'Geçmişe tutunma düzeyleriniz farklı olabilir. Affediş zamanı eşleştirilmeli.',
    keywords: ['yas', 'kayıp', 'kabul', 'teselli', 'umut'],
    context: 'Yas etiğinde benzerlik. Bırakma hızları farklı olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ma_pos5',
    card: 'Six of Cups',
    position: 5,
    upright:
      'Nostalji ve iç çocukla bağ kurma benzer. Sıcak anılar ortak diliniz olur.',
    reversed:
      'Geçmişte kalma eğilimi birinizde fazla olabilir. Şimdiyle köprü kurulmalı.',
    keywords: ['nostalji', 'masumiyet', 'hatıra', 'şefkat', 'sadelik'],
    context: 'İç çocuğa şefkat ortak. Şimdide buluşmak önemli.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ma_pos5',
    card: 'Seven of Cups',
    position: 5,
    upright:
      'Hayal gücü ve seçeneklere açık bakış benzer. Net kriter belirlediğinizde uyum parlak olur.',
    reversed: 'Bulanıklık eşiği farklı. Karar ertelenirse benzerlik dağılır.',
    keywords: ['hayal', 'seçenek', 'netlik', 'vizyon', 'tercih'],
    context: 'Yaratıcı vizyon ortak. Kriter yazımı şart.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ma_pos5',
    card: 'Eight of Cups',
    position: 5,
    upright:
      'Anlam arayışı ve derinlik ihtiyacında benzerlik. Yüzeyden ayrılıp hakikate yürümeyi seversiniz.',
    reversed:
      'Kal–git eşiği farklı olabilir. Kapanış ritüeli olmadan uyum zorlanır.',
    keywords: ['anlam', 'ayrılış', 'yol', 'olgunluk', 'kapanış'],
    context: 'Derinlik ortak değer. Geçişler şefkatle yapılmalı.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ma_pos5',
    card: 'Nine of Cups',
    position: 5,
    upright:
      'Kişisel tatmin ve minnet odağınız benzer. Küçük mutlulukları birlikte çoğaltırsınız.',
    reversed:
      'Yüzeysel haz–derin doyum teraziniz farklılaşabilir. Değerle hizalama gerekir.',
    keywords: ['tatmin', 'minnet', 'doyum', 'konfor', 'sevinç'],
    context: 'Basit sevinçlerde uyum. Değer hizası korunmalı.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ma_pos5',
    card: 'Ten of Cups',
    position: 5,
    upright:
      'Aile, birlik ve huzur idealiniz benzer. Paylaşılan ev hayali sizi aynı çatıya toplar.',
    reversed:
      'İdeal–gerçekçilik arası eşiğiniz farklı olabilir. Sahici diyalog tabloyu dengeler.',
    keywords: ['aile', 'uyum', 'huzur', 'birlik', 'ideal'],
    context: 'Aile ideali ortak. Gerçekçi düzen konuşulsun.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ma_pos5',
    card: 'Page of Cups',
    position: 5,
    upright:
      'Masum merak, yaratıcılık ve duygusal oyunbazlıkta benzer titreşim. Küçük jestleriniz kalbi büyütür.',
    reversed:
      'Aşırı alınganlık/kaçış eğilimi birinizde baskın olabilir. Duyguyu eyleme bağlamak gerekir.',
    keywords: ['ilham', 'merak', 'hassasiyet', 'oyun', 'ifade'],
    context: 'Yaratıcı kalp ortak. Olgun ifade pratiği önemli.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ma_pos5',
    card: 'Knight of Cups',
    position: 5,
    upright:
      'Romantik idealler ve zarafet dilinde benzerlik. Jestlerinizle köprü kurarsınız.',
    reversed:
      'Söz–eylem uyumu birinizde zorlanabilir. Tutarlılık sağlanmazsa uyum aşınır.',
    keywords: ['romantizm', 'ideal', 'jest', 'tutarlılık', 'zarafet'],
    context: 'Romantik ton ortak. Sürdürülebilirlik şart.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ma_pos5',
    card: 'Queen of Cups',
    position: 5,
    upright:
      'Empati, sezgisel bakım ve güvenli duygusal alan kurmada benzerlik. Şefkatli liderlik paylaşırsınız.',
    reversed:
      'Sınır erimesi birinizde görülebilir. Öz-düzenleme dengesini kurmak gerekir.',
    keywords: ['empati', 'şefkat', 'sınır', 'sezgi', 'şifa'],
    context: 'Şefkat dilinde uyum. Sınır gözetimi önemli.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ma_pos5',
    card: 'King of Cups',
    position: 5,
    upright:
      'Duygu yönetiminde olgunluk ve sükûnette benzerlik. Fırtınada merkezde kalmayı bilirsiniz.',
    reversed:
      'Pasif–agresif dalgalar birinizde belirgin olabilir. Açık ifade uyumu korur.',
    keywords: ['olgunluk', 'sükunet', 'duygu', 'liderlik', 'güven'],
    context: 'Olgun duygu dili ortak. İfade kanalı açık tutulmalı.',
    group: 'Kupalar',
  },

  // ========== KILIÇLAR (14) ==========
  {
    id: 'ace_of_swords_ma_pos5',
    card: 'Ace of Swords',
    position: 5,
    upright:
      'Netlik, hakikat ve açık konuşmada benzer cesaret. Doğru cümle sizi aynı sayfada toplar.',
    reversed:
      'Muğlaklık toleransınız farklı olabilir. Yarım doğrular uyumu bozar.',
    keywords: ['netlik', 'hakikat', 'keskinlik', 'tanım', 'karar'],
    context: 'Açık söz ortak değer. Flu kalma riski yönetilmeli.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ma_pos5',
    card: 'Two of Swords',
    position: 5,
    upright:
      'Dengeli karar alma ve sakin tartıda benzerlik. His–akıl köprüsünü birlikte kurarsınız.',
    reversed:
      'Kaçınma/karar felci eşiğiniz farklı olabilir. Kör noktalar konuşulmalı.',
    keywords: ['karar', 'denge', 'yüzleşme', 'ikilem', 'sükunet'],
    context: 'Sakin tartı ortak. Kaçınma dili azaltılmalı.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ma_pos5',
    card: 'Three of Swords',
    position: 5,
    upright:
      'Acıyla dürüst temas ve onarım niyetinde benzerlik. Kırılgan gerçekler konuşulabilir.',
    reversed:
      'Acıyı bastırma eğilimi birinizde fazla olabilir. Şefkatli yüzleşme gerek.',
    keywords: ['kırgınlık', 'gerçek', 'onarım', 'şefkat', 'ifade'],
    context: 'Acıyla olgun temas ortak. Bastırmaya alan verilmesin.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ma_pos5',
    card: 'Four of Swords',
    position: 5,
    upright:
      'Sükunet, dinlenme ve zihni toplama kültürünüz benzer. Mola dili çatışmayı yumuşatır.',
    reversed:
      'Aşırı suskunluk mesafe yaratabilir. Geri çekilmenin süresi uzamamalı.',
    keywords: ['dinlenme', 'sükunet', 'toparlanma', 'ritim', 'alan'],
    context: 'Mola kültürü ortak. Süre/niyet net olmalı.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ma_pos5',
    card: 'Five of Swords',
    position: 5,
    upright:
      'Haklılık yerine ilişkiyi koruma değerinde buluşursunuz. Sert dile karşı hassasiyetiniz benzer.',
    reversed:
      'Alay/sarkazm eşiğiniz farklı olabilir. Yüz kurtarma oyunlarından kaçınılmalı.',
    keywords: ['ego', 'haklılık', 'saygı', 'onarım', 'dil'],
    context: 'Saygı temelli benzerlik. Üslup titizliği önemli.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ma_pos5',
    card: 'Six of Swords',
    position: 5,
    upright:
      'Sakin sulara geçişte planlı, kademeli yaklaşımınız benzer. Krizden öğretici çıkarsınız.',
    reversed:
      'Eskiye dönme eğilimi birinizde baskın kalabilir. Geçiş planı netleşmeli.',
    keywords: ['geçiş', 'plan', 'sükunet', 'uyum', 'ilerleme'],
    context: 'Planlı iyileşme ortak. Eskiye takılma azaltılmalı.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ma_pos5',
    card: 'Seven of Swords',
    position: 5,
    upright:
      'Strateji ve mahremiyet sınırlarında benzer ölçü. Niyet temizse minimal gizlilik korunur.',
    reversed:
      'Yarım gerçek toleransı farklı olabilir. Şeffaflık standardı belirlenmeli.',
    keywords: ['strateji', 'gizlilik', 'etik', 'açıklık', 'güven'],
    context: 'Etik strateji ortak. Şeffaflık çıtası konuşulsun.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ma_pos5',
    card: 'Eight of Swords',
    position: 5,
    upright:
      'Korkuyu kanıtla çözme yaklaşımınız benzer. Birbirinizi prangalardan nazikçe çıkarırsınız.',
    reversed:
      'Öz-kısıt anlatısı birinizde daha inatçı olabilir. Destek isteme pratikleşmeli.',
    keywords: ['kısıt', 'korku', 'özgürleşme', 'kanıt', 'destek'],
    context: 'Kanıt temelli rahatlatma ortak. Yardım çağrısı güçlendirilmeli.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ma_pos5',
    card: 'Nine of Swords',
    position: 5,
    upright:
      'Kaygı dili benzer biçimde çalışır; birbirinizi regüle etmeyi öğrenirsiniz. Sabah netliği kıymetlidir.',
    reversed:
      'Felaketleştirme eşikleriniz farklı olabilir. Gerçeklik testi ortak alışkanlık olmalı.',
    keywords: ['kaygı', 'uyku', 'gerçeklik', 'regülasyon', 'şefkat'],
    context: 'Kaygıda empati ortak. Test ve ritüel destekler.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ma_pos5',
    card: 'Ten of Swords',
    position: 5,
    upright:
      'Biten döngüleri kabul etme ve yeni sayfa açmada benzer cesaret. Kapanış ritüeli ortaklaşır.',
    reversed:
      'Yarımdan dönme eğilimi birinizde kalabilir. Tam kapanış yapılmalı.',
    keywords: ['bitiş', 'kapanış', 'yeniden doğuş', 'kabul', 'şifa'],
    context: 'Kapanış etiği ortak. Yarım bırakmadan tamamlayın.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ma_pos5',
    card: 'Page of Swords',
    position: 5,
    upright:
      'Merak, öğrenme ve doğrulama kültürünüz benzer. Soru sormayı seversiniz.',
    reversed:
      'Dedikodu/acele yargı eşiğiniz farklı olabilir. Kaynak kontrolü şart.',
    keywords: ['merak', 'öğrenme', 'doğrulama', 'iletişim', 'etik'],
    context: 'Öğrenme merakı ortak. Doğrulama disiplini korunsun.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ma_pos5',
    card: 'Knight of Swords',
    position: 5,
    upright:
      'Hızlı düşünme ve net savunu tarzınız benzer. Doğru yerde cesurca konuşursunuz.',
    reversed:
      'Acele/sert üslup eşiğiniz farklı. Nefes–dur–konuş ritmi uyumu korur.',
    keywords: ['hız', 'cesaret', 'strateji', 'ifade', 'ritim'],
    context: 'Atik akıl ortak. Hız dozunu eşitleyin.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ma_pos5',
    card: 'Queen of Swords',
    position: 5,
    upright:
      'Nesnellik ve sınır dilinde benzerlik. Net, adil çerçeveler rahatlatır.',
    reversed:
      'Aşırı eleştiri/soğukluk algısı birinizde tetikleyici olabilir. Nazik üslup şart.',
    keywords: ['netlik', 'sınır', 'adalet', 'nesnellik', 'üslup'],
    context: 'Serin akıl ortak. Şefkatle yumuşatın.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ma_pos5',
    card: 'King of Swords',
    position: 5,
    upright: 'İlke ve stratejide benzer duruş. Etik mantık ortak zemindir.',
    reversed: 'Dogma/katılık eşiği farklı olabilir. Empatiyle denge şart.',
    keywords: ['ilke', 'strateji', 'etik', 'mantık', 'empati'],
    context: 'İlkeli akıl ortak. Esneklik öğesi eklenmeli.',
    group: 'Kılıçlar',
  },

  // ========== TILSIMLAR (14) ==========
  {
    id: 'ace_of_pentacles_ma_pos5',
    card: 'Ace of Pentacles',
    position: 5,
    upright:
      'Somut başlangıç, güvence ve temel kurmada benzer istek. Küçük adımlarınızı birlikte büyütürsünüz.',
    reversed:
      'Kıtlık zihniyeti eşiğiniz farklı olabilir. Somut plan yoksa benzerlik sönükleşir.',
    keywords: ['temel', 'fırsat', 'güvence', 'tohum', 'somutluk'],
    context: 'Güvenli temel ortak. Plan görünür kalsın.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ma_pos5',
    card: 'Two of Pentacles',
    position: 5,
    upright:
      'Esnek denge, zaman–enerji yönetiminde benzer zeka. Jonglörü birlikte yaparsınız.',
    reversed:
      'Dağınıklık ve erteleme eşiği farklı olabilir. Öncelik matrisi uyumu korur.',
    keywords: ['denge', 'esneklik', 'ritim', 'öncelik', 'akış'],
    context: 'Esnek ritim ortak. Öncelik netliği şart.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ma_pos5',
    card: 'Three of Pentacles',
    position: 5,
    upright:
      'İşbirliği, rol netliği ve ustalık paylaşımında benzer yaklaşım. Takdir kültürü ortaktır.',
    reversed:
      'Görünmeyen emek kırılganlık yaratabilir. Sorumluluk haritası güncellenmeli.',
    keywords: ['işbirliği', 'rol', 'standart', 'takdir', 'süreç'],
    context: 'Ekip ruhu ortak. Görünür emek şart.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ma_pos5',
    card: 'Four of Pentacles',
    position: 5,
    upright:
      'Güvenlik ve kaynak korumada benzer temkin. Paylaşım sınırları rahatlatır.',
    reversed:
      'Aşırı tutma/harcama uçlarınız farklı olabilir. Esnek bütçe dili geliştirilmeli.',
    keywords: ['güvenlik', 'kontrol', 'paylaşım', 'tasarruf', 'esneklik'],
    context: 'Temkinli güven ortak. Esneme payı açılmalı.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ma_pos5',
    card: 'Five of Pentacles',
    position: 5,
    upright:
      'Zor günde omuz omuza durma değeriniz benzer. Yardım istemeyi birlikte öğrenirsiniz.',
    reversed:
      'Yalnız başa çıkma inadı birinizde güçlü olabilir. Destek ağı görünür kılınmalı.',
    keywords: ['kıtlık', 'destek', 'dayanışma', 'moral', 'toparlanma'],
    context: 'Dayanışma ortak. Yardım çağrısı normalleşsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ma_pos5',
    card: 'Six of Pentacles',
    position: 5,
    upright:
      'Adil paylaşım ve şeffaf koşulda benzer hassasiyet. Karşılıklılık güveni büyütür.',
    reversed:
      'Koşullu verme ya da skor tutma eşiğiniz farklı olabilir. Anlaşma saydam olmalı.',
    keywords: ['adalet', 'paylaşım', 'karşılıklılık', 'güven', 'şeffaflık'],
    context: 'Adil değiş tokuş ortak. Şeffaf kontrat korur.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ma_pos5',
    card: 'Seven of Pentacles',
    position: 5,
    upright:
      'Değerlendirme ve sabırda benzer olgunluk. Küçük iyileştirme sevginiz ortaktır.',
    reversed:
      'Sabırsızlık/batık maliyet inadı birinizde baskın olabilir. Kriterle pivot edin.',
    keywords: ['sabır', 'verim', 'değerlendirme', 'hasat', 'pivot'],
    context: 'Olgun bekleyiş ortak. Kriter seti güncel kalsın.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ma_pos5',
    card: 'Eight of Pentacles',
    position: 5,
    upright:
      'Zanaat disiplini ve alışkanlık kurmada benzer ısrar. Kalite standardı yakınlaştırır.',
    reversed:
      'Özensizlik/otomatiklik eşiği farklı olabilir. Bilinçli pratik yenilenmeli.',
    keywords: ['ustalık', 'pratik', 'kalite', 'disiplin', 'odak'],
    context: 'Emek kültürü ortak. Standart canlı kalsın.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ma_pos5',
    card: 'Nine of Pentacles',
    position: 5,
    upright:
      'Zarif bağımsızlık ve özdeğerde benzer duruş. Birlikteyken de birey kalmayı bilirsiniz.',
    reversed:
      'Aşırı bağımsızlık/bağımlılık uçlarınız farklı olabilir. Sınır–yakınlık dengesi kurulmalı.',
    keywords: ['özdeğer', 'bağımsızlık', 'konfor', 'sınır', 'zarafet'],
    context: 'Olgun bireysellik ortak. Denge korunmalı.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ma_pos5',
    card: 'Ten of Pentacles',
    position: 5,
    upright:
      'Uzun vade, aile ve sistem kurmada benzer vizyon. Kalıcı yapı isteğiniz aynı.',
    reversed:
      'Aile/varlık kural setleriniz çatışabilir. Prosedür ve rol netliği gerek.',
    keywords: ['aile', 'sistem', 'güvence', 'mülkiyet', 'rol'],
    context: 'Kalıcı düzen ortak. Kurallar şeffaflaşsın.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ma_pos5',
    card: 'Page of Pentacles',
    position: 5,
    upright:
      'Öğrenme ve somut hedef koymada benzer heves. Küçük adımlarınız çarpan etkisi yaratır.',
    reversed:
      'Erteleme/dağınık odak birinizde baskın olabilir. Mini hedefler şart.',
    keywords: ['öğrenme', 'hedef', 'başlangıç', 'pratik', 'somut'],
    context: 'Hedef odak ortak. Mikro adımlar işlesin.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ma_pos5',
    card: 'Knight of Pentacles',
    position: 5,
    upright:
      'Tutarlılık ve istikrarlı ilerlemede benzer huzur. Yavaş ama emin adımınız uyumlu.',
    reversed:
      'Monotonluk toleransı farklı olabilir. Küçük yenilikler eklenmeli.',
    keywords: ['istikrar', 'tutarlılık', 'rutin', 'güven', 'sabır'],
    context: 'Güvenilir ritim ortak. Tazeleme dozları gerek.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ma_pos5',
    card: 'Queen of Pentacles',
    position: 5,
    upright:
      'Besleyen pratiklik ve öz-bakıma değer verme benzer. Ev sıcaklığını birlikte kurarsınız.',
    reversed:
      'Aşırı yüklenme/ihmal eğilimi birinizde görülebilir. Destek isteme normalleşmeli.',
    keywords: ['bakım', 'pratik', 'öz bakım', 'kaynak', 'denge'],
    context: 'Besleyen düzen ortak. Yük paylaşımı önemli.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ma_pos5',
    card: 'King of Pentacles',
    position: 5,
    upright:
      'Sağlamlık, cömertlik ve uzun vade vizyonunda benzerlik. Paylaşılan sistem huzur verir.',
    reversed:
      'Statü/otorite gölgesi birinizde baskın olabilir. Gücü paylaşmak uyumu korur.',
    keywords: ['sağlamlık', 'liderlik', 'cömertlik', 'vizyon', 'sistem'],
    context: 'Kalıcı vizyon ortak. Yetki paylaşımı şart.',
    group: 'Tılsımlar',
  },

  // ========== ASALAR (14) ==========
  {
    id: 'ace_of_wands_ma_pos5',
    card: 'Ace of Wands',
    position: 5,
    upright:
      'Heves, kıvılcım ve girişkenlikte benzer ateş. İlk adımı birlikte seviyorsunuz.',
    reversed:
      'Süreklilik eşiğiniz farklı olabilir. Heves ritme çevrilmezse uyum düşer.',
    keywords: ['kıvılcım', 'heves', 'başlangıç', 'cesaret', 'ivme'],
    context: 'Ateş benzer. Sürdürülebilirlik kurulsun.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ma_pos5',
    card: 'Two of Wands',
    position: 5,
    upright:
      'Ufuk ve vizyonda ortak bakış. Risk iştahı dengeliyse genişleme kolay.',
    reversed:
      'Konfor alanı eşiğiniz farklı olabilir. İlk somut adım gecikmemeli.',
    keywords: ['vizyon', 'plan', 'ufuk', 'risk', 'karar'],
    context: 'Ortak ufuk var. Somut adım şart.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ma_pos5',
    card: 'Three of Wands',
    position: 5,
    upright:
      'Genişleme ve koordinasyon beceriniz benzer. Ufka birlikte bakmak bağ kurar.',
    reversed:
      'Zamanlama senkronu kaçarsa motivasyon düşer. Plan revizesi uyumu toplar.',
    keywords: ['genişleme', 'senkron', 'hazırlık', 'ufuk', 'zaman'],
    context: 'Koordinasyon ortak. Senkron tazelensin.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ma_pos5',
    card: 'Four of Wands',
    position: 5,
    upright:
      'Aidiyet, kutlama ve eşikte buluşma isteğiniz benzer. Temel sağlamsa tören doğal gelir.',
    reversed:
      'Eşik sıralaması algınız farklı olabilir. Yarım hazırlık hayal kırıklığı yaratır.',
    keywords: ['eşik', 'kutlama', 'temel', 'aidiyet', 'ev'],
    context: 'Eşik ritüeli ortak. Sıralama korunmalı.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ma_pos5',
    card: 'Five of Wands',
    position: 5,
    upright:
      'Canlı tartışma ve oyunlu rekabette benzersiniz. Kural koyarsanız enerji yaratıcı akar.',
    reversed:
      'Kuralsız çekişme yorabilir. Fasilitasyon olmadan benzerlik çatışmaya döner.',
    keywords: ['çekişme', 'oyun', 'rekabet', 'kural', 'enerji'],
    context: 'Oyun alanı ortak. Kural net olsun.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ma_pos5',
    card: 'Six of Wands',
    position: 5,
    upright:
      'Takdir ve görünür başarıyı paylaşmada benzer yürek. Zaferi birlikte kutlarsınız.',
    reversed:
      'Görünmeyen emek kırgınlık yaratabilir. Şeffaf takdir sistemi kurun.',
    keywords: ['takdir', 'zafer', 'görünürlük', 'motivasyon', 'destek'],
    context: 'Ortak sevinç güçlü. Emek görünür kalsın.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ma_pos5',
    card: 'Seven of Wands',
    position: 5,
    upright:
      'Sınır koruma ve duruşta benzer kararlılık. Tutarlılık güven verir.',
    reversed: 'Aşırı savunuculuk yalnızlaştırabilir. Esneklik payı açılmalı.',
    keywords: ['sınır', 'savunma', 'tutarlılık', 'direnç', 'esneklik'],
    context: 'Duruş ortak. Esneklikle yumuşatın.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ma_pos5',
    card: 'Eight of Wands',
    position: 5,
    upright:
      'Hızlı iletişim ve net sinyal diliniz benzer. Zamanında mesajla akış yakalanır.',
    reversed: 'Kanal karmaşası eşiğiniz farklı olabilir. Sıralama sadeleşmeli.',
    keywords: ['hız', 'sinyal', 'akış', 'senkron', 'iletişim'],
    context: 'Hızlı akış ortak. Sıralama düzeni gerek.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ma_pos5',
    card: 'Nine of Wands',
    position: 5,
    upright:
      'Dayanıklılık ve son viraj psikolojisinde benzerlik. Küçük molalarla güç korunur.',
    reversed:
      'Aşırı tetik ve yorgunluk eşiğiniz farklı olabilir. Destek ağı kurun.',
    keywords: ['dayanıklılık', 'tetikte', 'mola', 'koruma', 'süreklilik'],
    context: 'Direnç ortak. Dinlenme kültürü şart.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ma_pos5',
    card: 'Ten of Wands',
    position: 5,
    upright:
      'Sorumluluk alma iştahınız benzer; yük paylaşılırsa güç artar. Tamamlama sevgisi ortaktır.',
    reversed:
      'Yükü tek omuzda toplama eğilimi birinizde fazla olabilir. Delege etmeyi öğrenin.',
    keywords: ['yük', 'sorumluluk', 'tamamlama', 'delege', 'sadelik'],
    context: 'Yük kültürü ortak. Paylaşım görünür olmalı.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ma_pos5',
    card: 'Page of Wands',
    position: 5,
    upright:
      'Keşif ve deneme hevesinde benzer kıvılcım. Öğrenme yolculuğunu oyuna çevirirsiniz.',
    reversed:
      'Dikkat dağınıklığı eşiğiniz farklı olabilir. Mikro hedefler odaklar.',
    keywords: ['keşif', 'heves', 'deney', 'odak', 'öğrenme'],
    context: 'Keşif ortak. Odak çerçevesi kurulsun.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ma_pos5',
    card: 'Knight of Wands',
    position: 5,
    upright:
      'Atılganlık ve tutkulu hamlede benzer ateş. Stratejiyle birleşince uyum parlar.',
    reversed:
      'Savruk ivme/yarım bırakma birinizde belirgin olabilir. Taahhüt mimarisi gerekir.',
    keywords: ['atılganlık', 'tutku', 'ivme', 'strateji', 'taahhüt'],
    context: 'Ateş ortak. Yapı eklendiğinde kalıcı olur.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ma_pos5',
    card: 'Queen of Wands',
    position: 5,
    upright:
      'Karizma ve görünürlükte birbirinizi parlatırsınız. Sahici özgüven benzerliğinizdir.',
    reversed:
      'Kıyas/güvensizlik gölgesi birinizde tetiklenebilir. Özdeğerle hizalanın.',
    keywords: ['karizma', 'özgüven', 'görünürlük', 'ilham', 'paylaşım'],
    context: 'Parlatan enerji ortak. Kıyas dili bırakılmalı.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ma_pos5',
    card: 'King of Wands',
    position: 5,
    upright:
      'Vizyoner liderlikte benzer cesaret. Yetkiyi paylaşan ilhamınız ortak hedefi büyütür.',
    reversed: 'Ego/otorite çatışması riski var. Dinleme kası eşitlenmeli.',
    keywords: ['vizyon', 'liderlik', 'ilham', 'katılım', 'yön'],
    context: 'Vizyon ortak. Katılımcı liderlik uyumu korur.',
    group: 'Asalar',
  },
];

// Kart adına göre pozisyon 5 anlamını bulma fonksiyonu
export const getposition5Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return position5Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getmarriageposition5Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return getposition5Meaning(cardName);
};

// Kart adına göre pozisyon 5 anlamını bulma fonksiyonu (ana index için)
export const getmarriageposition5MeaningByCardName = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  const meaning = getposition5Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 5 anlamlarını alma fonksiyonu
export const getAllposition5Meanings = (): MarriagePositionMeaning[] => {
  return position5Meanings;
};

// pozisyon 5 anlamlarını filtreleme fonksiyonu
export const getposition5MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return position5Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 5 anlamlarını arama
export const searchposition5MeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
  return position5Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position5Meanings,
  getposition5Meaning,
  getAllposition5Meanings,
  getposition5MeaningsByGroup,
  searchposition5MeaningsByKeyword,
};
