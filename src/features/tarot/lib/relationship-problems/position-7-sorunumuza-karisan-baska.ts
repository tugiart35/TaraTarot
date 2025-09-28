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
- position7Meanings: gerekli
- getposition7Meaning: gerekli
*/

// import { getRelationshipProblemsMeaningByCardAndPositionMeaning } from './position-meanings-index';
import { RelationshipProblemsPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position7Meanings: RelationshipProblemsPositionMeaning[] = [
  // MAJÖR ARKANA
  // RELATIONSHIP CONFLICT — Pozisyon 7: 'Sorunumuza karışan başka insanlar var mı?'
  // MAJOR ARCANA (22)
  {
    id: 'the_fool_rc_pos7',
    card: 'The Fool',
    position: 7,
    upright:
      'Joker, arkadaş çevresi veya spontane etkilerin ilişkinize karıştığını söyler. İyi niyetli ama düşüncesiz yönlendirmeler sınırlarınızı bulanıklaştırabilir.',
    reversed:
      'Ters Joker, pervasız üçüncü kişilerin körüklediği riskli davranışları ve gereksiz cesaretlendirmeyi vurgular. Başkalarının “boş ver” tavrı sizi karşı karşıya getirmiş olabilir.',
    keywords: [
      'arkadaş etkisi',
      'spontane',
      'sınır',
      'düşüncesizlik',
      'yönlendirme',
    ],
    context:
      'Dışarıdan gelen “hadi yap” enerjisi kararlarınızı etkiliyor. Sınırları netleştirip çift olarak ortak tutum belirleyin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_rc_pos7',
    card: 'The Magician',
    position: 7,
    upright:
      'Büyücü, karizmatik bir kişinin fikirleriyle ilişki dinamiğine yön verdiğini söyler. İyi anlatan, ikna eden biri gündemi şekillendiriyor olabilir.',
    reversed:
      'Ters Büyücü, manipülatif tavsiyeler, çarpıtılmış anlatılar ve gaz aydınlatması riski taşır. Üçüncü kişi kendi çıkarı için algıyı bükebilir.',
    keywords: ['karizma', 'ikna', 'anlatı', 'manipülasyon', 'etki'],
    context:
      'Bir “söz ustası” aranıza giriyor. Kaynak doğrulaması ve çift olarak ortak anlatı şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_rc_pos7',
    card: 'The High Priestess',
    position: 7,
    upright:
      'Başrahibe, gizli etkiler, sırdaş bir figür veya görünmeyen bağlantılar olduğunu söyler. Sessiz tavsiye kanalları kararları etkiliyor olabilir.',
    reversed:
      'Ters Başrahibe, saklanan mesajlar, gizli görüşmeler ve şüpheyi besleyen imaları gösterir. Bilinmeyen üçüncü kişi güveni aşındırır.',
    keywords: ['gizli etki', 'sır', 'sezgi', 'arka kanal', 'güven'],
    context:
      'Görünmeyen bir danışma hattı var. Şeffaflaşma ve açık iletişimle sis dağıtılmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_rc_pos7',
    card: 'The Empress',
    position: 7,
    upright:
      'İmparatoriçe, özellikle anne/anne figürü ya da besleyici bir yakın çevrenin iyi niyetli ama baskın etkisini anlatır. Koruyucu tavsiyeler fazlaca yön veriyor olabilir.',
    reversed:
      'Ters İmparatoriçe, boğucu sahiplenme, kıskançlık veya müdahaleci akrabalara işaret eder. “Sizin için en iyisi” söylemi otoriteye dönüşebilir.',
    keywords: ['aile', 'anne figürü', 'korumacılık', 'müdahale', 'sahiplenme'],
    context:
      'Bakım verenlerin sesi güçlü. Çift sınırı çizip karar alanını korumak gerek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_rc_pos7',
    card: 'The Emperor',
    position: 7,
    upright:
      'İmparator, baba/boss/otorite figürlerinin ilişkiye kurallar ve beklentiler dayadığını söyler. Düzen adına dış yönlendirme artmış olabilir.',
    reversed:
      'Ters İmparator, katı müdahale, mikro yönetim ve onay baskısına işaret eder. Güçlü bir dış ses kararlarınızı gölgeliyor.',
    keywords: ['otorite', 'baba figürü', 'kural', 'onay', 'baskı'],
    context:
      'Hiyerarşik bir etki alanı var. Kendi oyununuzun kurallarını birlikte yazın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_rc_pos7',
    card: 'The Hierophant',
    position: 7,
    upright:
      'Aziz, aile, gelenek, toplum veya inanç çevresinin standartlarının ilişkinize karıştığını söyler. “Doğrusu budur” sesi güçlüdür.',
    reversed:
      'Ters Aziz, dogma ve utandırmanın dışarıdan geldiğini gösterir. Normlar, özgün ilişkinizi kuşatabilir.',
    keywords: ['gelenek', 'toplum', 'norm', 'inanç', 'onay baskısı'],
    context:
      'Dış değerler içeri sızıyor. Değer diyaloğu yapıp özgün anlaşmanızı belirleyin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_rc_pos7',
    card: 'The Lovers',
    position: 7,
    upright:
      'Aşıklar, üçüncü kişi/ikilem teması taşır. Eski partner, yakın bir arkadaş ya da aile bireyi kararları etkileyen bir seçim yaratıyor olabilir.',
    reversed:
      'Ters Aşıklar, üçgenler, sadakat sınavı ve taraf tutmaların ilişkide yarık açtığını anlatır. Dışarıdan gelen ikilik uyumu bozar.',
    keywords: ['üçüncü kişi', 'seçim', 'sadakat', 'ikilem', 'uyum'],
    context:
      'Bir “taraf” olgusu belirgin. Net sınır ve şeffaflıkla ikili ittifakı güçlendirin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_rc_pos7',
    card: 'The Chariot',
    position: 7,
    upright:
      'Savaş Arabası, rekabetçi çevre, iş baskısı veya aile hedeflerinin ilişkiye yön verdiğini söyler. Dış tempo sizi zorluyor.',
    reversed:
      'Ters Savaş Arabası, başarı/itibar için dış baskının direksiyonu ele aldığını gösterir. Başkalarının hızıyla savrulmayın.',
    keywords: ['rekabet', 'aile hedefi', 'iş baskısı', 'tempo', 'yön'],
    context:
      'Dış hedefler iç ritmi bozuyor. Ortak hız ve koruyucu sınır belirleyin.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_rc_pos7',
    card: 'Strength',
    position: 7,
    upright:
      'Güç, olgun bir dost/akıl hocasının yatıştırıcı etkisini gösterir. Doğru kişi araya girdiğinde denge kurulur.',
    reversed:
      'Ters Güç, kıskanç birinin “iyilik” adıyla dizginlediğini ve duyguları kışkırtabileceğini söyler. Nazik güç yerini gizli kontrole bırakabilir.',
    keywords: [
      'arabulucu',
      'olgun dost',
      'kıskançlık',
      'yatıştırma',
      'kontrol',
    ],
    context:
      'Kimin araya girdiği önemli. Yetkili kişiler yerine güvenli arabulucu seçin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_rc_pos7',
    card: 'The Hermit',
    position: 7,
    upright:
      'Ermiş, kalabalığın sesinden çekilip kendi doğrularınızı bulmanız gerektiğini söyler. Aşırı yorum ilişkiyi yoruyor.',
    reversed:
      'Ters Ermiş, dış yargılardan kaçmak için aşırı izolasyon ve “kimse karışmasın” sertliğine işaret eder. Bu da köprüleri koparabilir.',
    keywords: ['yalıtım', 'kalabalık', 'yargı', 'iç ses', 'denge'],
    context:
      'Dış gürültü yüksek, iç bilgelik kısık. Seçici mesafe ve güvenli danışmanlık kurun.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_rc_pos7',
    card: 'The Wheel of Fortune',
    position: 7,
    upright:
      'Kader Çarkı, dönem dönem aynı kişilerin tekrar sahneye girdiğini söyler. Aile döngüsü, iş çevrimi veya eski dostlar gündemi döndürüyor.',
    reversed:
      'Ters Kader Çarkı, “kader böyle” diyerek dış etkiyi normalleştirip müdahaleyi kanıksama riskine işaret eder.',
    keywords: [
      'döngü',
      'tekrar eden kişiler',
      'alışkanlık',
      'zamanlama',
      'kabul',
    ],
    context:
      'Hep aynı aktörler devrede. Farkındalıkla döngüyü kırıp yeni kural koyun.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_rc_pos7',
    card: 'Justice',
    position: 7,
    upright:
      'Adalet, hukuki/kurumsal aktörlerin (HR, arabulucu, aile büyükleri) devreye girebileceğini söyler. Tarafsız bir göz denge kurabilir.',
    reversed:
      'Ters Adalet, çifte standartlı aile baskısı, haksız yargı ve seçici hafızaya işaret eder. Taraflı hakem ilişkiyi yaralar.',
    keywords: ['tarafsızlık', 'hakem', 'kurum', 'çifte standart', 'denge'],
    context:
      'Tarafsız bir mekanizma arayın. Akraba-hâkimliği yerine şeffaf kurallar seçin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_rc_pos7',
    card: 'The Hanged Man',
    position: 7,
    upright:
      'Asılan Adam, dış beklentiler uğruna beklemeye alındığınızı söyler. Başkalarının “biraz daha sabredin” çağrısı sizi askıda bırakıyor olabilir.',
    reversed:
      'Ters Asılan Adam, kurban anlatılarıyla manipüle eden bir üçüncü kişiye işaret eder. Empatiniz koz yapılabilir.',
    keywords: ['bekleme', 'empati', 'beklenti', 'askıda kalma', 'manipülasyon'],
    context:
      'Dış sesler “bekle” diyor. Süre ve koşulları siz belirleyin, açık sınır koyun.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_rc_pos7',
    card: 'Death',
    position: 7,
    upright:
      'Ölüm, bir ilişkinin/bağın bitişiyle alakalı üçüncü kişilerin (eski partner, aile bağı) gündemde olduğunu söyler. Sağlıklı kapanış dış etkiyi azaltır.',
    reversed:
      'Ters Ölüm, bitmemiş ilişkiler, yarım kalmış vedalar ve kopmamış bağların hâlâ aranıza girdiğini gösterir.',
    keywords: ['bitiş', 'kapanış', 'eski bağ', 'vedalaşma', 'yapışma'],
    context: 'Geçmiş dosyalar açık. Temiz kapanış ve sınır dış etkiyi keser.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_rc_pos7',
    card: 'Temperance',
    position: 7,
    upright:
      'Denge, uzlaştırıcı bir üçüncü kişinin sağaltıcı olabileceğini söyler. Profesyonel destek/ortak dost köprü kurabilir.',
    reversed:
      'Ters Denge, “herkes konuşsun” kaosuna, taraf toplama ve ölçüsüz arabuluculuğa işaret eder.',
    keywords: ['arabulucu', 'uzlaşma', 'ölçü', 'taraf toplama', 'şifa'],
    context:
      'Az ve nitelikli ses iyileştirir. Rol ve sınırları net bir arabulucu seçin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_rc_pos7',
    card: 'The Devil',
    position: 7,
    upright:
      'Şeytan, kıskanç, kontrolcü veya bağımlılık yaratan üçüncü kişileri vurgular. Triangülasyon ve takıntılı takip riski vardır.',
    reversed:
      'Ters Şeytan, toksik bağdan özgürleşme ihtiyacını söyler. Zincirleri görmezden geldikçe dış etki normalleşir.',
    keywords: [
      'kıskançlık',
      'kontrol',
      'triangülasyon',
      'takıntı',
      'özgürleşme',
    ],
    context:
      'Toksik bir aktör etkide. Katı sınır ve tekrarsız iletişim protokolü kurun.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_rc_pos7',
    card: 'The Tower',
    position: 7,
    upright:
      'Kule, üçüncü kişilerden gelen bir ifşa, dedikodu veya ani olayın dengeyi sarstığını söyler. Beklenmedik bir müdahale tabloyu değiştirir.',
    reversed:
      'Ters Kule, küçük çatlakların kulaktan kulağa büyütülmesine işaret eder. Onarılmamış söylenti yıkımı büyütür.',
    keywords: ['ifşa', 'dedikodu', 'kriz', 'sarsıntı', 'onarım'],
    context:
      'Söylenti ve şok etkisi var. Radikal netlik ve hızlı onarım planı şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_rc_pos7',
    card: 'The Star',
    position: 7,
    upright:
      'Yıldız, iyileştirici bir destek ağı, iyi niyetli dostlar ve umut veren figürleri anlatır. Doğru çevre nefes aldırır.',
    reversed:
      'Ters Yıldız, boş vaat ve pembe tablo çizen dış seslere işaret eder. Gerçekçi olmayan telkinler sizi savurabilir.',
    keywords: ['destek ağı', 'umut', 'şifa', 'telkin', 'gerçekçilik'],
    context: 'Nitelikli destek bulun. İyileştirici ama gerçekçi çevre seçin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_rc_pos7',
    card: 'The Moon',
    position: 7,
    upright:
      'Ay, kulis, ima ve belirsiz dış sinyallere dikkat çeker. Gossip sis yaratır ve güvensizlik doğurur.',
    reversed:
      'Ters Ay, gaslighting, anonim mesajlar ve sosyal medya gölgelerine işaret eder. Kanıtsız yorumlardan kaçının.',
    keywords: ['belirsizlik', 'gossip', 'ima', 'paranoya', 'netlik'],
    context:
      'Sisli dış sinyaller yoğun. Sadece doğrulanmış bilgiyle karar verin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_rc_pos7',
    card: 'The Sun',
    position: 7,
    upright:
      'Güneş, açık seçik görünürlük ve çevreye şeffaf yaklaşımın müdahale riskini azalttığını söyler. Net paylaşım güven yaratır.',
    reversed:
      'Ters Güneş, sosyal medya performansı ve “mutlu görünme” baskısıyla dış kıyasın arttığını gösterir.',
    keywords: [
      'şeffaflık',
      'görünürlük',
      'kıyas',
      'sosyal medya',
      'otantiklik',
    ],
    context:
      'Vitrin değil hakikat işe yarar. Dış gözlere değil iç uyuma odaklanın.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_rc_pos7',
    card: 'Judgement',
    position: 7,
    upright:
      'Mahkeme, aile meclisi, arkadaş grubu veya danışmanla yapılan açık yüzleşmenin dış etkiyi hizaya sokabileceğini söyler.',
    reversed:
      'Ters Mahkeme, linç kültürü, toplu yargı ve tek taraflı anlatıyla karar vermeye işaret eder.',
    keywords: ['yüzleşme', 'danışma', 'topluluk', 'yargı', 'telafi'],
    context:
      'Toplu konuşma gerekebilir; kurallı ve adil kurgulayın. Taraflı kalabalıktan kaçının.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_rc_pos7',
    card: 'The World',
    position: 7,
    upright:
      'Dünya, uzak mesafe, farklı kültürler veya geniş sosyal ağların etkisini gösterir. Global bağlar gündemi şekillendiriyor olabilir.',
    reversed:
      'Ters Dünya, bitmemiş işler, eski çevrelerle kopmamış bağlar ve kapanmamış döngülere işaret eder.',
    keywords: ['ağlar', 'uzaklık', 'kültür', 'eski çevre', 'kapanış'],
    context:
      'Geniş ağlar artı/eksi etki yaratıyor. Eski bağları kapatıp çekirdek alanı koruyun.',
    group: 'Majör Arkana',
  },

  // CUPS (14)
  {
    id: 'ace_of_cups_rc_pos7',
    card: 'Ace of Cups',
    position: 7,
    upright:
      'Kupa Ası, duygusal destek veren bir çevrenin varlığını söyler. Yeni tanışıklıklar aranıza sıcak ama etkili bir ses katmış olabilir.',
    reversed:
      'Ters Kupa Ası, kırgın bir dostun veya eski bir ilişkinin duygusal sızıntılarla sizi etkilemesini gösterir.',
    keywords: ['duygusal destek', 'yeni bağ', 'eski aşk', 'kırgınlık', 'etki'],
    context:
      'Duygu merkezli dış sesler aktif. Sınır ve paylaşım dozunu birlikte ayarlayın.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_rc_pos7',
    card: 'Two of Cups',
    position: 7,
    upright:
      'İki Kupa, sizi destekleyen bir çift/dost ikilisini anlatır. Köprü görevi gören güvenli kişiler var.',
    reversed:
      'Ters İki Kupa, taraf tutan yakınların karşılıklılığı bozmasına işaret eder. “Biz ve onlar” dili derinleşir.',
    keywords: ['karşılıklılık', 'dost çift', 'taraf', 'köprü', 'ittifak'],
    context:
      'Destek ittifakı mümkün; fakat taraflı dostlar çatlağı büyütebilir. Dengeli aracılar seçin.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_rc_pos7',
    card: 'Three of Cups',
    position: 7,
    upright:
      'Üç Kupa, arkadaş grubunun moral ve kutlama enerjisini getirir. Doğru çevre bağınızı güçlendirir.',
    reversed:
      'Ters Üç Kupa, aşırı sosyal ortam, dedikodu veya üçüncü kişilerin flörtöz davranışlarıyla karışıklığa işaret eder.',
    keywords: [
      'arkadaş çevresi',
      'kutlama',
      'dedikodu',
      'üçüncü kişi',
      'mahremiyet',
    ],
    context:
      'Kalabalık iyi geliyorsa açın, gelmiyorsa azaltın. Mahrem alanı koruyun.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_rc_pos7',
    card: 'Four of Cups',
    position: 7,
    upright:
      'Dört Kupa, ilgisiz dostlar ya da “boş ver” diyen çevrenin mesafeyi artırdığını söyler. Dış apati iç soğumaya dönebilir.',
    reversed:
      'Ters Dört Kupa, fırsatları görmenizi engelleyen olumsuz telkinler ve isteksizlik yayılımına işaret eder.',
    keywords: ['ilgisizlik', 'telkin', 'soğuma', 'fırsat', 'motivasyon'],
    context: 'Moral düşüren sesleri kısın. Size iyi gelen küçük çevreyi seçin.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_rc_pos7',
    card: 'Five of Cups',
    position: 7,
    upright:
      'Beş Kupa, geçmiş kayıpları hatırlatan kişilerin duygusal ağırlık taşıdığını söyler. Yas anlatıları ilişkiye sızıyor.',
    reversed:
      'Ters Beş Kupa, sürekli geçmişi açan dış seslerin toparlanmayı geciktirdiğini gösterir.',
    keywords: ['yas', 'geçmiş', 'kayıp', 'hatırlatıcı', 'toparlanma'],
    context:
      'Geçmişe odaklı çevre sarmal yaratıyor. İyileştirici ve geleceğe bakan sesleri yakın tutun.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_rc_pos7',
    card: 'Six of Cups',
    position: 7,
    upright:
      'Altı Kupa, çocukluk arkadaşları/aile dostları gibi nostaljik çevrenin etkisini anlatır. Masum paylaşım iyi gelebilir.',
    reversed:
      'Ters Altı Kupa, “eski günler” baskısıyla bugünü gölgeleyen müdahalelere işaret eder.',
    keywords: ['nostalji', 'çocukluk çevresi', 'aile dostu', 'baskı', 'şimdi'],
    context:
      'Geçmiş tatlıdır ama ölçülü olsun. Bugünün ihtiyaçlarını önceleyin.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_rc_pos7',
    card: 'Seven of Cups',
    position: 7,
    upright:
      'Yedi Kupa, çevreden gelen çok seçenekli, muğlak tavsiyeleri gösterir. Her kafadan bir ses çıkıyor.',
    reversed:
      'Ters Yedi Kupa, hayal satan, belirsiz vaatlerle oyalayan kişilere işaret eder.',
    keywords: [
      'seçenek',
      'muğlak tavsiye',
      'vaat',
      'kafa karışıklığı',
      'netlik',
    ],
    context: 'Tavsiye diyetine gidin. Kısa liste ve net kriter belirleyin.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_rc_pos7',
    card: 'Eight of Cups',
    position: 7,
    upright:
      'Sekiz Kupa, uzaklaşmayı telkin eden dış sesleri gösterir. Bazı kişiler “bırak gitsin” kolaycılığı yapıyor olabilir.',
    reversed:
      'Ters Sekiz Kupa, kal–git sarkacını körükleyen çevreye işaret eder. Belirsizlik beslenir.',
    keywords: ['uzaklaşma', 'telkin', 'ikilem', 'belirsizlik', 'yön'],
    context:
      'Yol gösteren değil, netleştiren çevreye ihtiyaç var. Kendi yönünüzü siz seçin.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_rc_pos7',
    card: 'Nine of Cups',
    position: 7,
    upright:
      'Dokuz Kupa, iyi niyetli destekçilerin moral ve keyif alanları sunduğunu söyler. Ortak dostlar sevindirir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel mutluluk telkiniyle derin meseleleri geçiştiren dış sese işaret eder.',
    keywords: ['moral', 'keyif', 'yüzeysellik', 'derin mesele', 'tatmin'],
    context:
      'Moral güzel ama meseleleri de çalışın. Hem keyif hem gerçek kurulsun.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_rc_pos7',
    card: 'Ten of Cups',
    position: 7,
    upright:
      'On Kupa, aile ittifakı ve destekleyen akrabaları gösterir. Birlik duygusu size iyi gelir.',
    reversed:
      'Ters On Kupa, aile içi gerilim, taraf tutma ve vitrin mutluluğu baskısına işaret eder.',
    keywords: ['aile', 'ittifak', 'taraf', 'vitrin', 'uyum'],
    context:
      'Aile desteği güçtür ama sınırı olmalı. Çekirdek karar alanını koruyun.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_rc_pos7',
    card: 'Page of Cups',
    position: 7,
    upright:
      'Kupa Prensi, duygusal ama naif bir dostun iyi niyetli mesajlarını anlatır. Masum arabuluculuk olabilir.',
    reversed:
      'Ters Kupa Prensi, trip, sitem ve pasif agresif dış yorumların hassasiyeti artırdığını gösterir.',
    keywords: [
      'naif dost',
      'arabuluculuk',
      'sitem',
      'pasif agresif',
      'hassasiyet',
    ],
    context:
      'Tatlı sesler iyi ama olgun dil seçin. Duygusal taşmaları filtreleyin.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_rc_pos7',
    card: 'Knight of Cups',
    position: 7,
    upright:
      'Kupa Şövalyesi, romantik bakışlı birinin sizi barıştırma hevesini gösterir. Jest odaklı dış öneriler gelebilir.',
    reversed:
      'Ters Kupa Şövalyesi, hayal satıp ortadan kaybolan aracıların yarattığı karmaşaya işaret eder.',
    keywords: ['romantizm', 'jest', 'aracı', 'tutarlılık', 'karmaşa'],
    context: 'Tutarlı aracı seçin. Jestten çok süreklilik kıymetli.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_rc_pos7',
    card: 'Queen of Cups',
    position: 7,
    upright:
      'Kupa Kraliçesi, empatik bir kadın figürünün (anne/abla/dost) yatıştırıcı etkisini gösterir. Güvenli duygusal alan sağlar.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal manipülasyon ve suçluluk baskısı yapan dış sese işaret eder.',
    keywords: [
      'empati',
      'kadın figürü',
      'yatıştırma',
      'manipülasyon',
      'suçluluk',
    ],
    context:
      'Şefkatli destek iyidir; duygusal borçlandırmaya dikkat. Sınır net olsun.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_rc_pos7',
    card: 'King of Cups',
    position: 7,
    upright:
      'Kupa Kralı, olgun bir danışmanın (terapist/yaşça büyük dost) sükunet verdiğini söyler.',
    reversed:
      'Ters Kupa Kralı, pasif agresif telkinler ve “sakin ol” diye bastıran dış sese işaret eder.',
    keywords: ['olgun danışman', 'terapi', 'sükunet', 'pasif agresif', 'baskı'],
    context: 'Profesyonel/olgun destek faydalı. Bastırıcı sakinlikten kaçının.',
    group: 'Kupalar',
  },

  // SWORDS (14)
  {
    id: 'ace_of_swords_rc_pos7',
    card: 'Ace of Swords',
    position: 7,
    upright:
      'Kılıç Ası, net konuşan bir üçüncü kişinin sisleri dağıtabileceğini söyler. Doğru bilgi dış etkileri hizaya sokar.',
    reversed:
      'Ters Kılıç Ası, çarpıtılmış bilgi, dedikodu ve sivri yorumların karışmaya başladığını gösterir.',
    keywords: ['netlik', 'bilgi', 'dedikodu', 'çarpıtma', 'söz'],
    context: 'Kaynak doğrulayın. Net sözlü, veriye dayalı destek alın.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_rc_pos7',
    card: 'Two of Swords',
    position: 7,
    upright:
      'İki Kılıç, iki dış ses arasında kaldığınızı söyler. Tarafsız kalma çabası kararınızı erteliyor.',
    reversed:
      'Ters İki Kılıç, gizli ittifaklar ve pasif baskıyla kararınızın şekillendirildiğini gösterir.',
    keywords: ['ikilem', 'tarafsızlık', 'ittifak', 'baskı', 'erteleme'],
    context: 'Kimin sesi önemli, seçin. Kararı siz verin, süre koyun.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_rc_pos7',
    card: 'Three of Swords',
    position: 7,
    upright:
      'Üç Kılıç, kırıcı yorumlar ve keskin üçüncü kişi dilinin kalp kırdığını söyler.',
    reversed:
      'Ters Üç Kılıç, eski acıların dışarıdan kaşınmasına ve yaraların yeniden açılmasına işaret eder.',
    keywords: ['kırgınlık', 'sert söz', 'yaralar', 'kaşıma', 'acı'],
    context:
      'Yarası olan konuşmaya ara verin. Koruyucu iletişim çerçevesi kurun.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_rc_pos7',
    card: 'Four of Swords',
    position: 7,
    upright:
      'Dört Kılıç, dış gürültüyü azaltıp mola vermeniz gerektiğini söyler. Sessiz alan dış etkiyi kısar.',
    reversed:
      'Ters Dört Kılıç, molayı sabote eden, yeniden ateşleyen dış mesajlara işaret eder.',
    keywords: ['mola', 'sessizlik', 'gürültü', 'yenilenme', 'sabotaj'],
    context: 'Dış kanallara sınır koyun. Mola protokolü belirleyin.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_rc_pos7',
    card: 'Five of Swords',
    position: 7,
    upright:
      'Beş Kılıç, alaycı/rekabetçi dış kişilerin “haklı çık” dilini körüklediğini söyler.',
    reversed:
      'Ters Beş Kılıç, linç/tribün baskısı ve kazan-kaybet çerçevesinin ilişkiye sızdığını gösterir.',
    keywords: ['rekabet', 'alay', 'tribün', 'kazanan', 'kaybeden'],
    context: 'Tribün susturulmalı. Kazanmak değil anlaşmak hedefi konulsun.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_rc_pos7',
    card: 'Six of Swords',
    position: 7,
    upright:
      'Altı Kılıç, profesyonel rehberlik veya tarafsız bir köprünün sizi daha sakin sulara taşıyabileceğini söyler.',
    reversed:
      'Ters Altı Kılıç, eski çevreye geri çeken, ilerlemenizi sabote eden dış seslere işaret eder.',
    keywords: ['geçiş', 'rehber', 'tarafsız', 'sabotaj', 'ilerleme'],
    context:
      'Tarafsız köprü bulun. Eski kıyıya çekenleri kibarca uzaklaştırın.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_rc_pos7',
    card: 'Seven of Swords',
    position: 7,
    upright:
      'Yedi Kılıç, gizli mesajlar, ekran arkası konuşmalar ve eksik bilgiyle müdahaleye işaret eder.',
    reversed:
      'Ters Yedi Kılıç, parça parça itiraf/yarım doğrularla algı yönetimi yapan bir üçüncü kişiyi gösterir.',
    keywords: ['gizli', 'arka kanal', 'eksik bilgi', 'algı', 'itiraf'],
    context: 'Kapalı devreleri kapatın. Tüm paylaşımlar görünür olsun.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_rc_pos7',
    card: 'Eight of Swords',
    position: 7,
    upright:
      'Sekiz Kılıç, korku yayıcı dış seslerin sizi çaresiz hissettirdiğini söyler. Panik dili hareketi kısar.',
    reversed:
      'Ters Sekiz Kılıç, yardım yerine korku yayan çevreyi filtrelemediğinizde sıkışmışlık kalıcı olur.',
    keywords: ['korku', 'çaresizlik', 'panik dili', 'filtre', 'özgürleşme'],
    context: 'Korku pompalarını kapatın. Kanıt ve destek odaklı çevre kurun.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_rc_pos7',
    card: 'Nine of Swords',
    position: 7,
    upright:
      'Dokuz Kılıç, gece mesajları/gossip ve anksiyeteyi besleyen dış içeriklerin uykunuzu kaçırdığını söyler.',
    reversed:
      'Ters Dokuz Kılıç, felaket tellallığını normalleştiren çevreyi kesmeniz gerektiğini gösterir.',
    keywords: [
      'anksiyete',
      'gece mesajı',
      'gossip',
      'felaket anlatısı',
      'uyku',
    ],
    context: 'Bildirim diyetine gidin. Güvenli saatler ve kanal belirleyin.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_rc_pos7',
    card: 'Ten of Swords',
    position: 7,
    upright:
      'On Kılıç, “bitti” diyen dış seslerin dramatik etki yarattığını söyler. Aşırı keskin tavsiyeler ilişkide kapanış baskısı oluşturur.',
    reversed:
      'Ters On Kılıç, trajediyi abartan ve onarımı görmezden gelen çevreye işaret eder.',
    keywords: ['drama', 'kapanış baskısı', 'trajedi', 'onarım', 'keskinlik'],
    context: 'Dramayı kısmak gerekir. Onarım ihtimallerini siz tartın.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_rc_pos7',
    card: 'Page of Swords',
    position: 7,
    upright:
      'Kılıç Prensi, meraklı ama dedikoducu birinin bilgi topladığını gösterir. Sorular masum görünse de sınır ihlaline kayabilir.',
    reversed:
      'Ters Kılıç Prensi, sosyal medya gözetlemesi ve kanıtsız suçlamalara işaret eder.',
    keywords: ['merak', 'dedikodu', 'gözetleme', 'sınır', 'kanıt'],
    context: 'Soru hakkını sınırlayın. Kanıtsız iddiaları kapatın.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_rc_pos7',
    card: 'Knight of Swords',
    position: 7,
    upright:
      'Kılıç Şövalyesi, hızlı, keskin bir dış sesin ültimatom dilini körüklediğini söyler.',
    reversed:
      'Ters Kılıç Şövalyesi, saldırgan yorumlar ve tartışmayı tırmandıran aracılara işaret eder.',
    keywords: ['hız', 'ültimatom', 'saldırganlık', 'tırmanma', 'ton'],
    context:
      'Hızlı/sert aracılardan uzak durun. Yavaş ve kurallı diyalog seçin.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_rc_pos7',
    card: 'Queen of Swords',
    position: 7,
    upright:
      'Kılıç Kraliçesi, net ve zeki bir dış danışmanın gerçekleri duru anlatabileceğini söyler.',
    reversed:
      'Ters Kılıç Kraliçesi, sarkastik, küçümseyici ve yargılayıcı dış sese işaret eder.',
    keywords: ['netlik', 'zeka', 'danışman', 'sarkazm', 'yargı'],
    context: 'Netlik iyi, yargı kötü. Üslubu şefkatli uzmanları seçin.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_rc_pos7',
    card: 'King of Swords',
    position: 7,
    upright:
      'Kılıç Kralı, hukuk/uzman görüşü gibi rasyonel otoritenin denge getirebileceğini söyler.',
    reversed:
      'Ters Kılıç Kralı, kural sopasıyla baskı kuran, gri alanı yok sayan dış otoriteye işaret eder.',
    keywords: ['uzman', 'rasyonel', 'kural', 'otorite', 'gri alan'],
    context: 'Kural kadar merhamet de gerekli. Esnek ve adil uzman bulun.',
    group: 'Kılıçlar',
  },

  // WANDS (14)
  {
    id: 'ace_of_wands_rc_pos7',
    card: 'Ace of Wands',
    position: 7,
    upright:
      'Değnek Ası, yeni proje/arkadaş çevresi gibi dış kıvılcımların ilişki enerjisini etkilediğini söyler.',
    reversed:
      'Ters Değnek Ası, heves körükleyen ama sorumluluk taşımayan çevrenin sizi savurduğunu gösterir.',
    keywords: ['kıvılcım', 'yeni çevre', 'heves', 'savrulma', 'sorumluluk'],
    context:
      'Hevesi güzel, etkisini ölçün. Çifte zarar veren kıvılcımları kısın.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_rc_pos7',
    card: 'Two of Wands',
    position: 7,
    upright:
      'İki Değnek, plan ve ufuk konuşmalarına dış katılımcıları gösterir. Birileri yol haritanıza yön veriyor.',
    reversed:
      'Ters İki Değnek, tek taraflı plan yapan ve oldu-bitti yaratan dış etkene işaret eder.',
    keywords: ['plan', 'ufuk', 'katılım', 'oldu-bitti', 'yön'],
    context: 'Plan masasına kimi alacağınızı seçin. Yetkiyi dışarı vermeyin.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_rc_pos7',
    card: 'Three of Wands',
    position: 7,
    upright:
      'Üç Değnek, geniş ağlar, uzak dostlar ve ortaklar etkisini anlatır. Dış fırsatlar ritmi değiştirir.',
    reversed:
      'Ters Üç Değnek, gecikme ve beklenti baskısını artıran dış koordinasyona işaret eder.',
    keywords: ['ağ', 'uzak dost', 'fırsat', 'beklenti', 'koordinasyon'],
    context: 'Ağlarınızı bilinçli kullanın. Beklenti yönetimi yapın.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_rc_pos7',
    card: 'Four of Wands',
    position: 7,
    upright:
      'Dört Değnek, aile/arkadaş kutlamalarının ilişkiye iyi geldiğini söyler. Destekleyici topluluk var.',
    reversed:
      'Ters Dört Değnek, tören/etiket baskısı ve “ne zaman?” sorularıyla dış müdahaleye işaret eder.',
    keywords: ['kutlama', 'topluluk', 'tören', 'etiket', 'baskı'],
    context: 'Kutlayın ama sırayı siz belirleyin. Ritmi dışarıya bırakmayın.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_rc_pos7',
    card: 'Five of Wands',
    position: 7,
    upright:
      'Beş Değnek, fikir çarpışan kalabalığı gösterir. Herkesin önerisi var, düzen yok.',
    reversed:
      'Ters Beş Değnek, kavgayı büyüten, kural dışı tartışma ortamlarına işaret eder.',
    keywords: ['tartışma', 'kalabalık', 'kural', 'gürültü', 'çatışma'],
    context: 'Diyalog kuralları koyun. Fasilitasyonsuz kalabalığı kapatın.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_rc_pos7',
    card: 'Six of Wands',
    position: 7,
    upright:
      'Altı Değnek, alkış ve görünürlüğün dış motivasyon sağladığını söyler. Topluluk desteği moral verir.',
    reversed:
      'Ters Altı Değnek, takdir tekelciliği ve “imaj” baskısına işaret eder.',
    keywords: ['alkış', 'görünürlük', 'imaj', 'takdir', 'moral'],
    context:
      'Takdir güzel ama adil olsun. İmaj için değil, siz olduğunuz için.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_rc_pos7',
    card: 'Seven of Wands',
    position: 7,
    upright:
      'Yedi Değnek, dış baskılara karşı ortak savunmayı anlatır. Çevreye karşı bir duruş gerekir.',
    reversed:
      'Ters Yedi Değnek, sürekli savunma halinde kalmayı kışkırtan çevreye işaret eder.',
    keywords: ['savunma', 'baskı', 'duruş', 'sınır', 'direnç'],
    context: 'Birlikte tek ses olun. Savunmayı stratejik kullanın.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_rc_pos7',
    card: 'Eight of Wands',
    position: 7,
    upright:
      'Sekiz Değnek, hızlı mesaj/DM yağmuru ve hızla yayılan haberleri gösterir.',
    reversed:
      'Ters Sekiz Değnek, bilinçli geciktirme veya mesaj seliyle gündemi rehin alan dış kanallara işaret eder.',
    keywords: ['mesaj', 'hız', 'yayılım', 'gecikme', 'gündem'],
    context: 'Tek kanal seçin, hız kuralı belirleyin. Bildirimleri sınırlayın.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_rc_pos7',
    card: 'Nine of Wands',
    position: 7,
    upright:
      'Dokuz Değnek, geçmişteki dış saldırılar nedeniyle tetikte olduğunuzu söyler. Kalabalık tetikleyebilir.',
    reversed:
      'Ters Dokuz Değnek, her eleştiriyi tehdit sanmaya yol açan sert çevreye işaret eder.',
    keywords: ['tetik', 'savunma', 'eleştiri', 'tehdit algısı', 'mola'],
    context: 'Tetik yönetimi yapın. Güvenli alan ve mola planı kurun.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_rc_pos7',
    card: 'Ten of Wands',
    position: 7,
    upright:
      'On Değnek, dış taleplerin yükünü sırtlandığınızı söyler. Herkes sizden bir şey istiyor.',
    reversed:
      'Ters On Değnek, taşımanız gerekmeyen yükleri çevrenin dayattığını gösterir.',
    keywords: ['yük', 'talep', 'dayatma', 'sadelik', 'delege'],
    context: 'Yük haritası çıkarın. “Hayır” demeyi birlikte öğrenin.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_rc_pos7',
    card: 'Page of Wands',
    position: 7,
    upright:
      'Değnek Prensi, maceracı bir dostun yeni fikirlerle araya girdiğini söyler. İlham var ama odak da gerek.',
    reversed:
      'Ters Değnek Prensi, düşünmeden dürten, sonra kaybolan dış aktöre işaret eder.',
    keywords: ['ilham', 'dürtü', 'odak', 'tutarlılık', 'heves'],
    context:
      'İlhamı alın, hızını filtreleyin. Teslim sorumluluğu sizde kalsın.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_rc_pos7',
    card: 'Knight of Wands',
    position: 7,
    upright:
      'Değnek Şövalyesi, atılgan birinin sizi hızlandırdığını söyler. Enerji iyi ama denge şart.',
    reversed:
      'Ters Değnek Şövalyesi, “gaz verip” ortadan kaybolan kışkırtıcıya işaret eder.',
    keywords: ['atak', 'gaz', 'denge', 'kışkırtma', 'süreklilik'],
    context: 'Tempo sözleşmesi yapın. Dış gazı ölçün.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_rc_pos7',
    card: 'Queen of Wands',
    position: 7,
    upright:
      'Değnek Kraliçesi, ilham veren karizmatik bir kadının destek etkisini gösterir.',
    reversed:
      'Ters Değnek Kraliçesi, kıyas ve görünürlük baskısıyla rekabet yaratan dış figüre işaret eder.',
    keywords: ['karizma', 'ilham', 'kıyas', 'görünürlük', 'rekabet'],
    context: 'İlhamı paylaşın, kıyası kapatın. Sahneyi ortaklaştırın.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_rc_pos7',
    card: 'King of Wands',
    position: 7,
    upright:
      'Değnek Kralı, vizyoner bir lider/dostun yol gösterici etkisini söyler.',
    reversed:
      'Ters Değnek Kralı, egosantrik, hükmedici bir dış sesin kararlarınızı domine ettiğini gösterir.',
    keywords: ['vizyon', 'lider', 'ego', 'dominasyon', 'yön'],
    context: 'Liderlik iyi, tahakküm kötü. Yetkiyi dışarı vermeyin.',
    group: 'Asalar',
  },

  // PENTACLES (14)
  {
    id: 'ace_of_pentacles_rc_pos7',
    card: 'Ace of Pentacles',
    position: 7,
    upright:
      'Tılsım Ası, iş/para fırsatları sunan bir dış kaynağı gösterir. Somut destek ilişkiyi rahatlatarak etkiler.',
    reversed:
      'Ters Tılsım Ası, koşullu maddi destek ve çıkar beklentili yardıma işaret eder.',
    keywords: ['fırsat', 'maddi destek', 'koşul', 'çıkar', 'somutluk'],
    context: 'Destek harika ama şeffaf olsun. Koşullu yardıma sınır koyun.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_rc_pos7',
    card: 'Two of Pentacles',
    position: 7,
    upright:
      'İki Tılsım, aile/iş programlarının dış taleplerle dengenizi zorladığını söyler.',
    reversed:
      'Ters İki Tılsım, çevrenin son dakika değişiklikleriyle sizi koşturduğunu gösterir.',
    keywords: ['denge', 'program', 'talep', 'esneklik', 'koşturma'],
    context: 'Ajandanızı siz yönetin. Kapasite sınırı ilan edin.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_rc_pos7',
    card: 'Three of Pentacles',
    position: 7,
    upright:
      'Üç Tılsım, işbirliği yapan aile/dost ekibinin faydasını gösterir. Rol netliği dış müdahaleyi verimli kılar.',
    reversed:
      'Ters Üç Tılsım, görünmez emeği sahiplenen, rol karıştıran dış kişilere işaret eder.',
    keywords: [
      'işbirliği',
      'rol',
      'kalite',
      'emeğin görünmesi',
      'koordinasyon',
    ],
    context: 'Rol sözleşmesi yazın. Takdir ve sınır görünür olsun.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_rc_pos7',
    card: 'Four of Pentacles',
    position: 7,
    upright:
      'Dört Tılsım, mal-mülk/para üzerinden kontrol kuran bir dış aktöre işaret eder. Erişim kısıtları baskı yaratır.',
    reversed:
      'Ters Dört Tılsım, cimrilik veya finansal şeffaflık eksikliğiyle müdahaleye işaret eder.',
    keywords: ['kontrol', 'mülkiyet', 'erişim', 'cimrilik', 'baskı'],
    context:
      'Mülkiyet dili yerine şeffaf plan. Ortak finans sınırları belirleyin.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_rc_pos7',
    card: 'Five of Pentacles',
    position: 7,
    upright:
      'Beş Tılsım, zor dönemde kapı çalacağınız birinin olduğunu söyler. Dayanışma dışarıdan gelebilir.',
    reversed:
      'Ters Beş Tılsım, yardım/kapı kapama, utandırma ve dışlanma baskısı yapan çevreye işaret eder.',
    keywords: ['dayanışma', 'yardım', 'dışlanma', 'utanç', 'kapı'],
    context: 'Destek ağı seçici olsun. Utandıran kapıları kapatın.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_rc_pos7',
    card: 'Six of Pentacles',
    position: 7,
    upright:
      'Altı Tılsım, adil paylaşan aile/dost desteğine işaret eder. Paylaşım dengesi dış etkileri olumlu kılar.',
    reversed:
      'Ters Altı Tılsım, koşullu yardım/borçlandırma ve güç asimetrisini vurgular.',
    keywords: ['paylaşım', 'adalet', 'koşul', 'borçlandırma', 'güç'],
    context:
      'Koşulsuz ve şeffaf destek talep edin. Borçlandıran yardımı reddedin.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_rc_pos7',
    card: 'Seven of Pentacles',
    position: 7,
    upright:
      'Yedi Tılsım, sabır telkin eden deneyimli bir dış sesin olduğunu söyler. Ölç-me değerlendirme önerileri gelebilir.',
    reversed:
      'Ters Yedi Tılsım, “bekleyin” diye oyalayan ve verimsiz döngüyü sürdüren çevreye işaret eder.',
    keywords: ['sabır', 'değerlendirme', 'oyalama', 'verim', 'hasat'],
    context: 'Veriyle bekleyin, belirsizlikle değil. Metrik ve tarih koyun.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_rc_pos7',
    card: 'Eight of Pentacles',
    position: 7,
    upright:
      'Sekiz Tılsım, pratik öneriler veren birinin süreci iyileştirebileceğini söyler.',
    reversed:
      'Ters Sekiz Tılsım, özensiz dış müdahalelerin işi size tekrar yaptırdığına işaret eder.',
    keywords: ['pratik', 'ustalık', 'özen', 'tekrar iş', 'iyileştirme'],
    context: 'Kaliteli öneri alın, acele çözümleri eleyin. Standart koyun.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_rc_pos7',
    card: 'Nine of Pentacles',
    position: 7,
    upright:
      'Dokuz Tılsım, bağımsız ve güvende bir destekçinin alan tanıdığını söyler.',
    reversed:
      'Ters Dokuz Tılsım, lüks/konfor baskısı yapan ve kıyasla huzuru bozan dış sese işaret eder.',
    keywords: ['bağımsız destek', 'alan', 'konfor', 'kıyas', 'huzur'],
    context: 'Alan veren çevreyi seçin. Kıyas ve gösterişli baskıyı kapatın.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_rc_pos7',
    card: 'Ten of Pentacles',
    position: 7,
    upright:
      'On Tılsım, aile sistemi, miras ve ev düzeni gibi yapısal dış etkileri gösterir.',
    reversed:
      'Ters On Tılsım, miras/ev/para üzerinden kararlarınıza müdahaleye işaret eder.',
    keywords: ['aile sistemi', 'miras', 'ev', 'para', 'yapı'],
    context:
      'Sistemle sınır koyun. Varlık konuları şeffaf ve çift kararıyla yürüsün.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_rc_pos7',
    card: 'Page of Pentacles',
    position: 7,
    upright:
      'Tılsım Prensi, öğrenme odaklı genç birinin somut fikirler getirdiğini söyler.',
    reversed:
      'Ters Tılsım Prensi, oyalanan, küçük çıkar için araya giren fırsatçı tavra işaret eder.',
    keywords: [
      'öğrenme',
      'somut fikir',
      'oyalanma',
      'fırsatçılık',
      'küçük adım',
    ],
    context: 'Uygulanabilir öneri alın. Oyalayanı kibarca dışarıda bırakın.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_rc_pos7',
    card: 'Knight of Pentacles',
    position: 7,
    upright:
      'Tılsım Şövalyesi, istikrarlı bir dış destekçinin süreçleri düzenleyebileceğini söyler.',
    reversed:
      'Ters Tılsım Şövalyesi, durağan ve yeniliğe kapalı bir çevrenin sizi frenlediğini gösterir.',
    keywords: ['istikrar', 'düzen', 'rutin', 'durağanlık', 'fren'],
    context:
      'Düzen faydalı, atalete dönüşmesin. Mikro iyileştirme şartı koyun.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_rc_pos7',
    card: 'Queen of Pentacles',
    position: 7,
    upright:
      'Tılsım Kraliçesi, pratik bakım ve görünmez emekle destek olan bir kadın figürünü gösterir.',
    reversed:
      'Ters Tılsım Kraliçesi, bakım emeğini borçlandırma ve kontrol aracına çeviren dış sese işaret eder.',
    keywords: [
      'bakım',
      'pratiklik',
      'görünmez emek',
      'borçlandırma',
      'kontrol',
    ],
    context:
      'Bakımı takdir edin ama koz olmasına izin vermeyin. İş bölümü yazın.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_rc_pos7',
    card: 'King of Pentacles',
    position: 7,
    upright:
      'Tılsım Kralı, finansal/mesleki güçlü birinin akıl ve kaynakla destek verdiğini söyler.',
    reversed:
      'Ters Tılsım Kralı, para ve statü sopasıyla kararlarınıza hükmeden bir dış otoriteye işaret eder.',
    keywords: ['kaynak', 'meslek', 'statü', 'hükmetme', 'şeffaflık'],
    context:
      'Kaynak güzel, şartlar şeffaf olsun. İmza ve karar çift olarak sizde kalsın.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 7 anlamını bulma fonksiyonu
export const getposition7Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return position7Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipProblemsposition7Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return getposition7Meaning(cardName);
};

// Kart adına göre pozisyon 7 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipProblemsposition7MeaningByCardName = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  const meaning = getposition7Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 7 anlamlarını alma fonksiyonu
export const getAllposition7Meanings =
  (): RelationshipProblemsPositionMeaning[] => {
    return position7Meanings;
  };

// pozisyon 7 anlamlarını filtreleme fonksiyonu
export const getposition7MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return position7Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 7 anlamlarını arama
export const searchposition7MeaningsByKeyword = (
  keyword: string
): RelationshipProblemsPositionMeaning[] => {
  return position7Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position7Meanings,
  getposition7Meaning,
  getAllposition7Meanings,
  getposition7MeaningsByGroup,
  searchposition7MeaningsByKeyword,
};
