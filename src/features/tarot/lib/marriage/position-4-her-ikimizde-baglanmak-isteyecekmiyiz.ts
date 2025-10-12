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
- position4Meanings: gerekli
- getposition4Meaning: gerekli
*/

import { MarriagePositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position4Meanings: MarriagePositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_ma_pos4',
    card: 'The Fool',
    position: 4,
    upright:
      'Deli, bağlanma konusunda taze bir başlangıç ve özgür bir ruhu simgeler. Bu, ilişkinin korkusuzca denenebileceğini, kalpten evet dendiğinde bağın keyifli bir yolculuğa dönüşeceğini gösterir.',
    reversed:
      'Ters Deli, bağlanma konusunda kararsızlık ve hazır olmama halini işaret eder. Taraflardan biri sorumluluk almaktan çekiniyorsa, bağlanma süreci ertelenebilir ya da yüzeyde kalabilir.',
    keywords: ['özgürlük', 'başlangıç', 'cesaret', 'sorumluluk'],
    context:
      'Bağ kurma isteği cesaretle doğar, fakat sorumluluk bilinciyle dengelenmeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos4',
    card: 'The Magician',
    position: 4,
    upright:
      'Büyücü, tarafların birbirine bağlanmak için irade ve niyetlerini güçlü şekilde ortaya koyabileceğini gösterir. Doğru iletişim ve kararlılık, evliliğe dair güçlü bir başlangıç yaratır.',
    reversed:
      'Ters Büyücü, bağlanma isteğinin sözde kalabileceğini ve niyetlerin samimi olmayabileceğini işaret eder. Söylenenle yapılan arasında fark varsa bağlanma güven vermez.',
    keywords: ['niyet', 'ifade', 'kararlılık', 'iletişim'],
    context: 'Net niyet ve tutarlı adımlar bağlanmayı güçlendirir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos4',
    card: 'The High Priestess',
    position: 4,
    upright:
      'Başrahibe, bağlanma isteğinin içsel bir bilgelikle destekleneceğini gösterir. Tarafların kalplerini dinleyerek, derin bir sezgiyle evet diyebileceğini anlatır.',
    reversed:
      'Ters Başrahibe, bağlanma isteğinde gizlilik ve net olmayan duyguların varlığını işaret eder. Açık konuşulmazsa bağın zemini zayıflar.',
    keywords: ['sezgi', 'bilgelik', 'gizlilik', 'içsel yön'],
    context: 'Bağlanma kalbin sesini duyarak netleşir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos4',
    card: 'The Empress',
    position: 4,
    upright:
      'İmparatoriçe, bağlanmanın sevgi, şefkat ve üretkenlik temeliyle atılacağını gösterir. Taraflar birbirine huzur ve güven ortamı sunmaya isteklidir.',
    reversed:
      'Ters İmparatoriçe, bağlanma isteğinde aşırı sahiplenme veya karşı tarafı boğma riski yaratır. Bu dengesizlik, kalıcı bir bağ kurmayı zorlaştırabilir.',
    keywords: ['şefkat', 'güven', 'huzur', 'bereket'],
    context: 'Sağlıklı bağlanma, özgürlük ve şefkat dengesinde büyür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos4',
    card: 'The Emperor',
    position: 4,
    upright:
      'İmparator, bağlanmanın disiplin, istikrar ve güçlü temeller üzerinde yükselebileceğini işaret eder. Ciddi bir sorumluluk duygusu ile evet gelmektedir.',
    reversed:
      'Ters İmparator, bağlanma isteğinin aşırı kontrolcü ya da katı yaklaşımlarla gölgelenebileceğini gösterir. Taraflardan biri baskı altında hissedebilir.',
    keywords: ['istikrar', 'otorite', 'sorumluluk', 'güven'],
    context: 'Sağlam bağlanma, adil bir dengeyle kalıcı olur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos4',
    card: 'The Hierophant',
    position: 4,
    upright:
      'Aziz, bağlanmanın geleneksel yollar ve değerlerle destekleneceğini gösterir. Aile onayı ve manevi bağlar bu evet kararını güçlendirir.',
    reversed:
      'Ters Aziz, bağlanma konusunda değer çatışmaları ya da farklı inançlar sorun yaratabilir. Uyum sağlanmadıkça bağ zayıf kalır.',
    keywords: ['değerler', 'inanç', 'onay', 'bağ'],
    context: 'Bağlanma ortak değerlerle desteklenirse kalıcı olur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos4',
    card: 'The Lovers',
    position: 4,
    upright:
      'Aşıklar, iki tarafın da kalpten bağlanmaya istekli olduğunu gösterir. Bu bağ, ortak değerler ve seçimlerle daha da güçlenecektir.',
    reversed:
      'Ters Aşıklar, bağlanma isteğinde kararsızlık ya da farklı yolların çekimi olabilir. Net bir seçim yapılmazsa bağ askıda kalır.',
    keywords: ['seçim', 'bağ', 'uyum', 'aşk'],
    context: 'Bağlanma, net seçimlerle güçlenir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos4',
    card: 'The Chariot',
    position: 4,
    upright:
      'Savaş Arabası, iki tarafın da aynı hedef için irade göstermesi halinde güçlü bir bağ kurulabileceğini gösterir. Ortak yön ve disiplinle evlilik yolunda ilerlenir.',
    reversed:
      'Ters Savaş Arabası, bağlanma isteğinde farklı yönlere çekilme ya da kontrol çatışması riski vardır. Uyum sağlanmazsa yol zorlaşır.',
    keywords: ['irade', 'hedef', 'disiplin', 'uyum'],
    context: 'Ortak yön belirlemek bağlanmayı kolaylaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos4',
    card: 'Strength',
    position: 4,
    upright:
      'Güç, bağlanma isteğinin sevgi, sabır ve anlayışla besleneceğini işaret eder. Taraflar birbirini kabullenmeye hazırdır.',
    reversed:
      'Ters Güç, bağlanmada sabırsızlık, gurur ya da öfke kontrolsüzlüğü sorun yaratabilir. İçsel denge sağlanmadan bağlanma güçleşir.',
    keywords: ['sabır', 'sevgi', 'anlayış', 'kararlılık'],
    context: 'Bağ, şefkat ve sabırla sağlamlaşır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos4',
    card: 'The Hermit',
    position: 4,
    upright:
      'Ermiş, bağlanma isteğinin içsel bir olgunluk ve kendini tanımayla geleceğini gösterir. İç dünyasını bilen kişi evet demeye hazırdır.',
    reversed:
      'Ters Ermiş, bağlanmada aşırı içe kapanma ya da yalnızlık arzusu engel olabilir. Taraflardan biri bağ kurmaya kapalı hissedebilir.',
    keywords: ['olgunluk', 'içe dönüş', 'hazırlık', 'bilgelik'],
    context: 'Olgunluk ve içsel hazır oluş bağlanmayı mümkün kılar.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos4',
    card: 'The Wheel of Fortune',
    position: 4,
    upright:
      'Kader Çarkı, bağlanma isteğinin dönemin koşullarına göre şekilleneceğini işaret eder. Uyum ve doğru zamanlama ile bağ, kendiliğinden güçlenir.',
    reversed:
      'Ters Çark, bağlanma isteğinin belirsizlik ya da kontrolsüz değişimlerle zorlanabileceğini gösterir. Taraflardan biri zamana güvenmekte zorlanabilir.',
    keywords: ['dönüşüm', 'zamanlama', 'uyum', 'kader'],
    context:
      'Bağlanma, doğru zaman ve koşullar bir araya geldiğinde gerçekleşir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos4',
    card: 'Justice',
    position: 4,
    upright:
      'Adalet, bağlanmanın dürüstlük, eşitlik ve karşılıklı sorumlulukla kurulacağını gösterir. Taraflar açık ve şeffaf olduklarında bağ güçlenir.',
    reversed:
      'Ters Adalet, bağlanma isteğinde adaletsizlik, gizlenmiş gerçekler ya da dürüstlük eksikliği olabilir. Bu durum bağın güvenini zedeler.',
    keywords: ['adalet', 'dürüstlük', 'eşitlik', 'denge'],
    context: 'Şeffaflık ve adil paylaşım bağlanmanın temelidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos4',
    card: 'The Hanged Man',
    position: 4,
    upright:
      'Asılan Adam, bağlanma sürecinde sabır ve yeni bakış açıları gerektiğini işaret eder. Zamanla olgunlaşan bağ daha sağlam olur.',
    reversed:
      'Ters Asılan Adam, bağlanma isteğinde isteksizlik ya da kurban psikolojisi etkili olabilir. Fedakarlık yerine kaçış tercih edilebilir.',
    keywords: ['bekleyiş', 'bakış açısı', 'teslimiyet', 'fedakarlık'],
    context: 'Bağlanma, zaman ve anlayışla olgunlaşır.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos4',
    card: 'Death',
    position: 4,
    upright:
      'Ölüm, bağlanmanın eski alışkanlıkları bırakmak ve yeni bir başlangıç yapmakla mümkün olacağını gösterir. Dönüşüm, evet kararını kolaylaştırır.',
    reversed:
      'Ters Ölüm, bağlanma isteğinde eski bağlardan kopamama veya değişime direnç olabilir. Bu durum yeni bağın kurulmasını zorlaştırır.',
    keywords: ['dönüşüm', 'bırakış', 'yenilenme', 'başlangıç'],
    context: 'Bağlanma, eskiyi bırakıp yeniyi kucaklamakla güçlenir.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos4',
    card: 'Temperance',
    position: 4,
    upright:
      'Denge, bağlanmanın uyum ve sabırla kurulacağını işaret eder. Taraflar birbirine alan tanıyıp ortak noktada buluştukça bağ güçlenir.',
    reversed:
      'Ters Denge, bağlanma sürecinde aşırılıklar ve uyumsuzluk sorun yaratabilir. Taraflardan biri dengeyi bulmakta zorlanabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'orta yol'],
    context: 'Bağlanma sabır ve uyumla güç kazanır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos4',
    card: 'The Devil',
    position: 4,
    upright:
      'Şeytan, bağlanma isteğinin tutku, bağımlılık ya da güçlü çekimle beslendiğini gösterebilir. Ancak sağlıklı sınırlar kurulursa bağ kalıcı olur.',
    reversed:
      'Ters Şeytan, bağlanmada özgürlük kısıtlamaları ve bağımlılıklar sorun yaratabilir. Taraflardan biri bu baskıdan kaçınmak isteyebilir.',
    keywords: ['tutku', 'bağımlılık', 'çekim', 'sınırlar'],
    context: 'Sağlıklı bağlanma, özgürlük ve sınır bilinciyle mümkündür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos4',
    card: 'The Tower',
    position: 4,
    upright:
      'Kule, bağlanma sürecinde ani bir yüzleşme veya kırılma yaşanabileceğini işaret eder. Bu yıkım, daha sağlam bir bağ kurma fırsatı doğurur.',
    reversed:
      'Ters Kule, bağlanmada ani krizlerden kaçış veya ertelenmiş patlamalar olabilir. Taraflar açıkça konuşmazsa bağ zayıflar.',
    keywords: ['kriz', 'gerçek', 'yıkım', 'yeniden yapılanma'],
    context: 'Bağlanma, krizden sonra yeniden inşa edilerek güçlenir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos4',
    card: 'The Star',
    position: 4,
    upright:
      'Yıldız, bağlanmanın umut, şeffaflık ve ilhamla kurulacağını gösterir. Taraflar birbirine inandığında bağ şifa getirir.',
    reversed:
      'Ters Yıldız, bağlanma isteğinde umutsuzluk veya inançsızlık olabilir. Bu durumda taraflar güven duygusunu yitirebilir.',
    keywords: ['umut', 'ilham', 'şeffaflık', 'şifa'],
    context: 'Umuda dayalı bağlanma kalıcı olur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos4',
    card: 'The Moon',
    position: 4,
    upright:
      'Ay, bağlanma sürecinde belirsizlikler ve duygusal dalgalanmalar olabileceğini işaret eder. Ancak sezgiyle hareket edilirse bağ güçlenir.',
    reversed:
      'Ters Ay, bağlanma isteğinde yanlış anlamalar veya yanılsamalar olabilir. Gerçekler netleşmeden bağ tam olarak kurulamaz.',
    keywords: ['belirsizlik', 'sezgi', 'yanılsama', 'duygu'],
    context: 'Bağlanma için netlik ve dürüstlük şarttır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos4',
    card: 'The Sun',
    position: 4,
    upright:
      'Güneş, bağlanma isteğinin açık, neşeli ve samimi bir şekilde gerçekleşeceğini gösterir. İki taraf da kalpten evet demeye hazırdır.',
    reversed:
      'Ters Güneş, bağlanma sürecinde yüzeysel mutluluk veya aşırı iyimserlik olabilir. Gerçekçi olunmazsa bağ kırılganlaşır.',
    keywords: ['neşe', 'samimiyet', 'açıklık', 'güven'],
    context: 'İçtenlik ve mutluluk bağlanmanın temelidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos4',
    card: 'Judgement',
    position: 4,
    upright:
      'Mahkeme, bağlanmanın geçmişle yüzleşip yeni bir sayfa açmakla güçleneceğini gösterir. Taraflar geçmiş deneyimlerinden ders çıkararak evet diyebilir.',
    reversed:
      'Ters Mahkeme, bağlanma isteğinde aşırı yargılama ya da geçmişe takılı kalma olabilir. Bu, bağın ilerlemesini engeller.',
    keywords: ['yüzleşme', 'yenilenme', 'karar', 'özgürleşme'],
    context: 'Geçmişi geride bırakmak bağlanmayı kolaylaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos4',
    card: 'The World',
    position: 4,
    upright:
      'Dünya, bağlanmanın tamamlanma ve bütünlük duygusuyla kurulacağını gösterir. İki taraf da evliliğe kalpten evet diyebilir.',
    reversed:
      'Ters Dünya, bağlanma sürecinde eksik kapanmamış döngüler ya da yarım kalmışlık olabilir. Bu tamamlanmadan bağ tam kurulamaz.',
    keywords: ['tamamlanma', 'bütünlük', 'entegrasyon', 'kutlama'],
    context: 'Bağlanma, tamamlanmış bir döngüyle kalıcı olur.',
    group: 'Majör Arkana',
  },
  // =========================
  // CUPS — KUPALAR (14)
  // =========================
  {
    id: 'ace_of_cups_ma_pos4',
    card: 'Ace of Cups',
    position: 4,
    upright:
      'Yeni bir duygusal başlangıç, kalplerin açılması ve birbirine bağlanma isteği güçlüdür. İlişkiyi saf bir sevgi ve duygusal akış besler. Bağlanma için uygun zemin doğuyor.',
    reversed:
      'Duygular bastırıldığında ya da korkular öne çıktığında bağlanma gecikebilir. Taraflardan biri hislerini saklarsa, bağ derinleşmeden yüzeyde kalır.',
    keywords: ['açılım', 'sevgi', 'bağ', 'duygu', 'yeni başlangıç'],
    context:
      'Bağlanma arzusu taze ve güçlü, ama duyguların saklanmaması gerekiyor.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ma_pos4',
    card: 'Two of Cups',
    position: 4,
    upright:
      'Karşılıklı sevgi ve denge öne çıkar. İki tarafın da bağlanmaya gönüllü olması, ilişkiye güçlü bir ortaklık enerjisi katar.',
    reversed:
      'Taraflardan biri mesafe koyabilir ya da beklentilerde uyumsuzluk oluşabilir. Bu durumda bağlanma niyeti olsa da eşleşme dengesiz kalır.',
    keywords: ['karşılıklılık', 'uyum', 'ilişki', 'bağ', 'denge'],
    context:
      'Bağlanma isteği karşılıklı olabilir, ama uyumu sürekli korumak şarttır.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ma_pos4',
    card: 'Three of Cups',
    position: 4,
    upright:
      'Paylaşım ve kutlama enerjisi bağlanmaya alan açar. Sosyal destek ve dostça ortam, ilişkinin bağını güçlendirir.',
    reversed:
      'Dış etkiler ya da üçüncü kişilerin müdahalesi bağlanmayı zorlaştırabilir. Tarafların kendi bağına odaklanması gerekir.',
    keywords: ['kutlama', 'paylaşım', 'topluluk', 'bağ', 'neşe'],
    context:
      'Bağlanma isteği neşeyle besleniyor, ama üçüncü kişilere dikkat edilmeli.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ma_pos4',
    card: 'Four of Cups',
    position: 4,
    upright:
      'Biri duygusal olarak kapalı ya da ilgisiz görünebilir. Bağlanma isteği olsa da fark edilmesi gereken bir fırsat vardır.',
    reversed:
      'Kapanma hali çözülürse, yeni bir duygusal uyanış bağlanmaya zemin hazırlar. İçsel tatminsizlikten çıkış önemlidir.',
    keywords: ['ilgisizlik', 'tatminsizlik', 'içe dönüş', 'bağlanma', 'uyanış'],
    context: 'Bağlanma arzusu görünmez olabilir, farkındalıkla güçlenebilir.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ma_pos4',
    card: 'Five of Cups',
    position: 4,
    upright:
      'Geçmiş kayıplar ve hayal kırıklıkları bağlanmaya gölge düşürebilir. Ancak elde olan bağa odaklanmak dengeyi getirir.',
    reversed:
      'Yas süreci geride bırakıldığında bağlanma için umut yeniden doğar. Olumsuz duygulardan iyileşme önemlidir.',
    keywords: ['kayıp', 'üzüntü', 'bağlanma', 'şifa', 'umut'],
    context: 'Bağlanma isteği geçmiş yaraları onarmakla güçlenebilir.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ma_pos4',
    card: 'Six of Cups',
    position: 4,
    upright:
      'Saf, çocukça bir samimiyetle bağlanma mümkündür. Geçmişten gelen güven duygusu bağı besler.',
    reversed:
      'Geçmişe aşırı tutunma bağlanmayı engelleyebilir. İlişkinin bugüne odaklanması gerekir.',
    keywords: ['nostalji', 'samimiyet', 'güven', 'çocukluk', 'bağ'],
    context: 'Bağlanma isteği saf ve samimi, ama geçmişte kalmamak gerekir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ma_pos4',
    card: 'Seven of Cups',
    position: 4,
    upright:
      'Hayaller ve seçenekler bağlanmayı zorlaştırabilir. Karar netleşirse bağ güçlenir.',
    reversed:
      'Netlik sağlandığında, bağlanma isteği dağılmadan somut hale gelir. Hayalden gerçeğe geçiş önemlidir.',
    keywords: ['seçenek', 'hayal', 'belirsizlik', 'bağlanma', 'karar'],
    context: 'Bağlanma için netlik ve gerçekçilik şarttır.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ma_pos4',
    card: 'Eight of Cups',
    position: 4,
    upright:
      'Taraflardan biri mevcut duygusal tatminsizlik nedeniyle bağlanmaktan uzaklaşabilir. Daha derin bir anlam arayışı öne çıkar.',
    reversed:
      'Gitme eğilimi yerini kalma isteğine bırakabilir. Bağlanma için yeni bir sebep bulunabilir.',
    keywords: ['ayrılış', 'tatminsizlik', 'anlam arayışı', 'kalma', 'bağ'],
    context: 'Bağlanma arzusu sorgulanabilir, ama yeniden şekillenebilir.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ma_pos4',
    card: 'Nine of Cups',
    position: 4,
    upright:
      'Duygusal tatmin ve mutluluk bağlanmaya güç verir. İki taraf da kendini hazır hissedebilir.',
    reversed:
      'Aşırı beklenti ya da bencillik bağlanmayı zorlaştırır. Paylaşımcı bir tavır gerekir.',
    keywords: ['tatmin', 'mutluluk', 'haz', 'paylaşım', 'bağ'],
    context: 'Bağlanma isteği yüksek, ama bencillikten kaçınmak önemli.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ma_pos4',
    card: 'Ten of Cups',
    position: 4,
    upright:
      'Aile, birlik ve kalıcı mutluluk öne çıkar. Karşılıklı bağlanma isteği en güçlü seviyededir.',
    reversed:
      'Hayal edilen uyum ile gerçekler arasında fark olabilir. İdeal beklentiler bağlanmayı zorlayabilir.',
    keywords: ['aile', 'mutluluk', 'uyum', 'bağ', 'huzur'],
    context: 'Bağlanma isteği yüksek, ama gerçekçi olmak gerekiyor.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ma_pos4',
    card: 'Page of Cups',
    position: 4,
    upright:
      'Saf bir merak ve romantik yaklaşım bağlanmaya kapı aralar. Küçük jestler ilişkiyi tatlılaştırır.',
    reversed:
      'Aşırı duygusallık ya da olgunlaşmamış tavırlar bağlanmayı zorlaştırabilir. Denge şarttır.',
    keywords: ['romantizm', 'merak', 'duygu', 'hayal', 'bağ'],
    context: 'Bağlanma arzusu saf ve samimi, ama olgunluk gerekir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ma_pos4',
    card: 'Knight of Cups',
    position: 4,
    upright:
      'Romantik teklifler ve duygusal açıklık bağlanmayı kolaylaştırır. İlişkiye zarafet ve samimiyet hakim olur.',
    reversed:
      'Tutarsızlık ya da aşırı idealizm bağlanmayı zayıflatır. Süreklilik sağlanmalıdır.',
    keywords: ['romantizm', 'teklif', 'samimiyet', 'idealler', 'bağ'],
    context: 'Bağlanma arzusu romantizmle güçleniyor, ama tutarlılık gerekir.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ma_pos4',
    card: 'Queen of Cups',
    position: 4,
    upright:
      'Empati, şefkat ve duygusal güven bağlanma isteğini güçlendirir. İlişki sıcak bir yuvaya dönüşür.',
    reversed:
      'Aşırı duygusal bağımlılık bağlanmayı zorlaştırabilir. Duygusal denge şarttır.',
    keywords: ['empati', 'şefkat', 'güven', 'duygu', 'bağ'],
    context: 'Bağlanma arzusu güçlü, ama bağımlılıktan kaçınılmalı.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ma_pos4',
    card: 'King of Cups',
    position: 4,
    upright:
      'Olgun bir duygusal denge, bağlanma isteğini destekler. Taraflar güven ve huzur içinde hareket edebilir.',
    reversed:
      'Bastırılmış duygular ya da pasif agresif tavırlar bağlanmayı gölgeleyebilir.',
    keywords: ['olgunluk', 'denge', 'huzur', 'güven', 'bağ'],
    context: 'Bağlanma arzusu olgunlukla güçleniyor, ama açıklık şarttır.',
    group: 'Kupalar',
  },

  // =========================
  // SWORDS — KILIÇLAR (14)
  // =========================
  {
    id: 'ace_of_swords_ma_pos4',
    card: 'Ace of Swords',
    position: 4,
    upright:
      'Netlik ve dürüstlükle bağlanma sağlanabilir. İki tarafın da açık ve doğrudan iletişim kurması bağın temelini güçlendirir.',
    reversed:
      'Yanlış anlamalar veya saklanan gerçekler bağlanma sürecini zorlaştırabilir. İletişim eksikliği mesafe yaratır.',
    keywords: ['netlik', 'hakikat', 'iletişim', 'doğruluk', 'bağ'],
    context:
      'Bağlanma isteği açık sözlülükle güçlenir, ama iletişim koparsa zayıflar.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ma_pos4',
    card: 'Two of Swords',
    position: 4,
    upright:
      'Kararsızlık bağlanmayı erteleyebilir. Taraflardan biri hislerini dengelemekte zorlanıyorsa, net bir adım atmak gecikebilir.',
    reversed:
      'Görmezden gelinen gerçekler açığa çıkar ve seçim yapılır. Bu noktada bağlanma ya güçlenir ya da kopar.',
    keywords: ['kararsızlık', 'seçim', 'denge', 'çatışma', 'bağ'],
    context: 'Bağlanma arzusu var ama karar gecikebilir, açıklık önemlidir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ma_pos4',
    card: 'Three of Swords',
    position: 4,
    upright:
      'Kalp kırıklıkları ve geçmiş acılar bağlanmayı zorlaştırabilir. Üçüncü kişiler ya da güven sorunları bağın önünde engel olabilir.',
    reversed:
      'Acılar geride bırakıldığında bağlanma için şifa doğar. Affetme süreci ilişkiye alan açar.',
    keywords: ['kalp kırıklığı', 'acı', 'engeller', 'şifa', 'bağ'],
    context: 'Bağlanma için geçmiş yaraların onarılması gerekir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ma_pos4',
    card: 'Four of Swords',
    position: 4,
    upright:
      'Dinlenme, mesafe ve sakinleşme ihtiyacı bağlanmayı yavaşlatabilir. Taraflardan biri geri çekilip düşünmek isteyebilir.',
    reversed:
      'Uzun süren suskunluk bağın kopmasına yol açabilir. Yeniden harekete geçmek gerekir.',
    keywords: ['dinlenme', 'mesafe', 'sükunet', 'geri çekilme', 'bağ'],
    context:
      'Bağlanma isteği vardır ama zamanlama dinlenme ihtiyacına bağlıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ma_pos4',
    card: 'Five of Swords',
    position: 4,
    upright:
      'Kazanma hırsı ve egolar bağlanmayı zorlaştırır. Kavgalar ve tartışmalar bağ isteğini gölgeleyebilir.',
    reversed:
      'Çatışmadan sonra barışma isteği doğabilir. Ego bırakılırsa bağ güçlenebilir.',
    keywords: ['çatışma', 'ego', 'kazanma', 'barışma', 'bağ'],
    context: 'Bağlanma isteği vardır ama çatışmalar dengelenmelidir.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ma_pos4',
    card: 'Six of Swords',
    position: 4,
    upright:
      'Geçmiş sorunlardan uzaklaşmak için bağlanma sakin bir şekilde inşa edilebilir. İlişki daha huzurlu bir döneme girebilir.',
    reversed:
      'Geçmiş yükler bırakılmadığında bağlanma gecikir. İleriye bakmak yerine eskiye takılı kalınabilir.',
    keywords: ['geçiş', 'huzur', 'ilerleme', 'bırakma', 'bağ'],
    context: 'Bağlanma isteği var, geçmişi geride bırakmak şart.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ma_pos4',
    card: 'Seven of Swords',
    position: 4,
    upright:
      'Gizlilik veya dürüst olmayan tavırlar bağlanmayı zorlaştırır. Taraflardan biri gerçeği saklıyorsa bağ güvene oturmaz.',
    reversed:
      'Açıklık sağlandığında bağ güvenle güçlenebilir. Gizli saklı durumlar biterse bağlanma mümkündür.',
    keywords: ['gizlilik', 'dürüstlük', 'strateji', 'güven', 'bağ'],
    context: 'Bağlanma isteği güvenin kurulmasına bağlıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ma_pos4',
    card: 'Eight of Swords',
    position: 4,
    upright:
      'Taraflardan biri kendi korkuları ve sınırlamaları nedeniyle bağlanmaktan çekinebilir. Zihinsel engeller bağ isteğini baskılar.',
    reversed:
      'Korkuların çözülmesiyle bağlanma yolu açılır. Özgürleşme, bağ kurmayı mümkün kılar.',
    keywords: ['kısıtlama', 'korku', 'özgürlük', 'engel', 'bağ'],
    context: 'Bağlanma isteği vardır, ama korkular aşılmalıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ma_pos4',
    card: 'Nine of Swords',
    position: 4,
    upright:
      'Kaygı, uykusuzluk ve endişeler bağlanmayı zorlaştırabilir. Taraflardan biri geleceğe dair korkular taşıyabilir.',
    reversed:
      'Kaygıların azalmasıyla bağlanma kolaylaşır. Kötü senaryoların yerini umut alabilir.',
    keywords: ['kaygı', 'endişe', 'korku', 'umut', 'bağ'],
    context: 'Bağlanma isteği vardır, ama kaygılar çözülmelidir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ma_pos4',
    card: 'Ten of Swords',
    position: 4,
    upright:
      'Biten bir döngü bağlanmayı zorlaştırabilir. İhanet ya da ağır bir bitişten sonra yeni bir bağ kurmak zaman alır.',
    reversed:
      'Acıların ardından toparlanma süreci başlar. Bu durumda bağlanma yeniden doğabilir.',
    keywords: ['bitiş', 'ihanet', 'acı', 'yeniden doğuş', 'bağ'],
    context: 'Bağlanma isteği vardır ama geçmiş yaralar kapanmalıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ma_pos4',
    card: 'Page of Swords',
    position: 4,
    upright:
      'Merak ve gözlem bağlanmayı artırabilir. Taraflardan biri öğrenmeye ve anlamaya çalışıyorsa bağ kuvvetlenir.',
    reversed:
      'Aşırı sorgulama ya da dedikodu bağlanmayı zayıflatır. Şüphe güveni sarsabilir.',
    keywords: ['merak', 'öğrenme', 'sorgu', 'güven', 'bağ'],
    context: 'Bağlanma isteği vardır, ama aşırı sorgu engel olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ma_pos4',
    card: 'Knight of Swords',
    position: 4,
    upright:
      'Hızlı ve kararlı adımlar bağlanmayı destekler. Cesaretle atılan adımlar ilişkiye yön verir.',
    reversed:
      'Aceleci davranışlar ya da öfke bağlanmayı gölgeleyebilir. Daha sakin ilerlemek gerekir.',
    keywords: ['hız', 'karar', 'cesaret', 'acelecilik', 'bağ'],
    context: 'Bağlanma isteği vardır ama hız dengelenmelidir.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ma_pos4',
    card: 'Queen of Swords',
    position: 4,
    upright:
      'Mantık ve objektiflik bağlanmayı güçlendirebilir. Açık ve adil bir tutum güven verir.',
    reversed:
      'Soğukluk ya da aşırı eleştirellik bağ isteğini zayıflatır. Duygulara alan açmak gerekir.',
    keywords: ['mantık', 'adalet', 'soğukluk', 'netlik', 'bağ'],
    context: 'Bağlanma isteği vardır ama duygusuzluk gölge olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ma_pos4',
    card: 'King of Swords',
    position: 4,
    upright:
      'Düşünülmüş kararlar ve mantıklı bir yaklaşım bağlanmayı güçlendirir. Otoriter ama adil bir tavır güven yaratır.',
    reversed:
      'Katı kurallar veya duygu eksikliği bağlanmayı engelleyebilir. Empati önemlidir.',
    keywords: ['otorite', 'mantık', 'adalet', 'soğukluk', 'bağ'],
    context: 'Bağlanma isteği vardır ama katılıktan kaçınmak gerekir.',
    group: 'Kılıçlar',
  },

  // =========================
  // PENTACLES — TILSIMLAR (14)
  // =========================
  {
    id: 'ace_of_pentacles_ma_pos4',
    card: 'Ace of Pentacles',
    position: 4,
    upright:
      'Somut bir başlangıç, güven ve istikrar arzusu bağlanmayı güçlendirir. İki taraf da ortak bir temele yatırım koymaya istekli olduğunda ilişki kök salar.',
    reversed:
      'Maddi endişeler veya güvence eksikliği bağlanmayı erteleyebilir. Somut planlar netleşmeden kalpler “evet” demekte çekingen kalır.',
    keywords: ['başlangıç', 'güvence', 'somutluk', 'yatırım', 'istikrar'],
    context:
      'Bağlanma, somut adımlar ve güvenceyle kolaylaşır; belirsizlik geciktirebilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ma_pos4',
    card: 'Two of Pentacles',
    position: 4,
    upright:
      'Zaman, enerji ve kaynakları dengelemek bağlanmayı mümkün kılar. Esnek bir ritim kurulduğunda ilişki yük olmadan ilerler.',
    reversed:
      'Aşırı koşturma ve öncelik karmaşası bağlanma kararını zorlaştırabilir. Programlar uyumlanmadıkça gönüller aynı anda “evet” diyemez.',
    keywords: ['denge', 'esneklik', 'zamanlama', 'uyum', 'öncelik'],
    context:
      'Bağlanma için ritim ve öncelikler uyumlanmalı; dağınıklık engel olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ma_pos4',
    card: 'Three of Pentacles',
    position: 4,
    upright:
      'İşbirliği, rol netliği ve ortak emeğin görünür olması bağlanmayı güçlendirir. “Bir ekip” gibi hareket etmek uzun vadeli söze zemin hazırlar.',
    reversed:
      'Rol belirsizliği ve görünmeyen emek kırgınlık yaratır. Takdir ve görev paylaşımı netleşmeden bağlanma askıda kalabilir.',
    keywords: ['işbirliği', 'rol', 'takdir', 'süreç', 'kalite'],
    context:
      'Bağlanma, net görevler ve adil takdirle büyür; belirsizlik yıpratır.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ma_pos4',
    card: 'Four of Pentacles',
    position: 4,
    upright:
      'Güvenliği koruma ihtiyacı yüksektir ve bu, bağlanmayı temkinli ama sağlam kılar. Paylaşım dengeli olduğunda bağ uzun ömürlü olur.',
    reversed:
      'Aşırı tutma, kıskançlık veya kontrol eğilimi yakınlığı kısıtlayabilir. Esnemeden bağ kurmak zorlaşır.',
    keywords: ['güvenlik', 'kontrol', 'paylaşım', 'tutma', 'sınır'],
    context: 'Bağlanma için güvenlik duygusu şart; aşırı kontrol akışı keser.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ma_pos4',
    card: 'Five of Pentacles',
    position: 4,
    upright:
      'Yoksunluk hissi veya dışlanmışlık, “evet” demeyi zorlaştırabilir. Ancak birlikte dayanışma gösterildiğinde bağ derinleşir.',
    reversed:
      'Toparlanma kapısı aralanır; destek istendiğinde yalnızlık azalır. İyileşme boyunca şeffaf kalmak bağlanmayı mümkün kılar.',
    keywords: ['yoksunluk', 'destek', 'yalnızlık', 'şifa', 'dayanışma'],
    context: 'Bağlanma, zor günlerde omuz omuza verildiğinde güçlenir.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ma_pos4',
    card: 'Six of Pentacles',
    position: 4,
    upright:
      'Adil verme–alma dengesi bağlanma isteğini artırır. Şeffaf koşullar ve karşılıklılık güven inşa eder.',
    reversed:
      'Koşullu yardım, borçluluk hissi veya güç asimetrisi bağı zedeler. Eşitlik hissi kurulmadan kalıcı söz zorlaşır.',
    keywords: ['adalet', 'paylaşım', 'eşitlik', 'güven', 'karşılıklılık'],
    context: 'Bağlanma, adil değiş tokuşla yeşerir; güç dengesizliği engeldir.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ma_pos4',
    card: 'Seven of Pentacles',
    position: 4,
    upright:
      'Sabır ve değerlendirme dönemi, “evet”in olgunlaşmasını sağlar. Küçük iyileştirmelerle bağın verimi artar.',
    reversed:
      'Batık maliyet inadı ya da sabırsızlık, yanlış kararlara itebilir. Kriterler netleşmeden bağlanma aceleye gelmemelidir.',
    keywords: ['sabır', 'değerlendirme', 'verim', 'zamanlama', 'ölçüm'],
    context: 'Bağlanma, olgunlaşmış karar ve sabırla kalıcı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ma_pos4',
    card: 'Eight of Pentacles',
    position: 4,
    upright:
      'Düzenli emek, öğrenme ve kalite standardı bağlanmayı destekler. Alışkanlıklar uyumlandıkça güven artar.',
    reversed:
      'Özensizlik, yüzeysellik veya “hemen olsun” isteği bağı gevşetir. Disiplin olmadan kalıcı söz zorlanır.',
    keywords: ['emek', 'disiplin', 'öğrenme', 'kalite', 'alışkanlık'],
    context: 'Bağlanma, düzenli emek ve kaliteyle sağlamlaşır.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ma_pos4',
    card: 'Nine of Pentacles',
    position: 4,
    upright:
      'Sağlıklı bağımsızlık ve özdeğer, yetişkin bir “evet” için zemin hazırlar. Kendi ayakları üzerinde duran iki kişi daha dengeli bağ kurar.',
    reversed:
      'Aşırı bağımsızlık ya da konfora düşkünlük ortak hayatı zorlaştırabilir. “Biz” alanını küçültmek bağlanmayı geciktirir.',
    keywords: ['özdeğer', 'bağımsızlık', 'konfor', 'olgunluk', 'sınır'],
    context: 'Bağlanma, sağlıklı bireysellikten doğan “biz” ile güçlenir.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ma_pos4',
    card: 'Ten of Pentacles',
    position: 4,
    upright:
      'Aile, miras ve uzun vadeli güvence temaları bağlanmayı güçleştirir. Ortak sistem ve düzen kurma niyeti yüksektir.',
    reversed:
      'Aile baskısı, mal–mülk tartışmaları veya sistem çatışması bağlanmayı zorlayabilir. Kurallar netleşmeden kalıcı söz kırılgan kalır.',
    keywords: ['aile', 'güvence', 'sistem', 'uzun vade', 'düzen'],
    context: 'Bağlanma, ortak düzen ve aile entegrasyonuyla kalıcı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ma_pos4',
    card: 'Page of Pentacles',
    position: 4,
    upright:
      'Somut bir hedefe odaklanma ve öğrenme iştahı, bağlanmaya hazırlık getirir. Küçük adımlar ileride büyük bir sözün temeli olur.',
    reversed:
      'Erteleme, dağınık odak veya motivasyon düşüklüğü süreci uzatır. Taahhüt için disiplinli plan gerekir.',
    keywords: ['hedef', 'öğrenme', 'başlangıç', 'pratik', 'somut adım'],
    context: 'Bağlanma, küçük ama kararlı adımlarla yaklaşır.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ma_pos4',
    card: 'Knight of Pentacles',
    position: 4,
    upright:
      'Yavaş ama tutarlı ilerleyiş güven verir. Rutin ve istikrar, bağlanma kararını doğal biçimde olgunlaştırır.',
    reversed:
      'Aşırı durağanlık veya esneklik eksikliği ilişkiyi monotonlaştırabilir. Küçük yenilikler olmadan “evet” isteği sönük kalır.',
    keywords: ['istikrar', 'tutarlılık', 'rutin', 'güven', 'sabır'],
    context:
      'Bağlanma, emin adımlarla ve istikrarla büyür; durağanlıkta zorlanır.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ma_pos4',
    card: 'Queen of Pentacles',
    position: 4,
    upright:
      'Besleyen pratiklik, ev kurma enerjisi ve kaynak yönetimi bağlanmayı güçlendirir. Güvenli, sıcak bir zemin oluşur.',
    reversed:
      'Aşırı yüklenme ve özbakım eksikliği ilişkiyi yorar. Paylaşılmayan yükler “evet” demeyi erteletebilir.',
    keywords: ['bakım', 'pratiklik', 'ev', 'kaynak', 'güven'],
    context: 'Bağlanma, besleyen düzen ve özbakımla kalıcılaşır.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ma_pos4',
    card: 'King of Pentacles',
    position: 4,
    upright:
      'Stratejik sağlamlık, cömertlik ve uzun vade vizyonu bağlanmayı destekler. Koruyucu ama paylaşan bir tutum “evet”i kolaylaştırır.',
    reversed:
      'Aşırı kontrol, statü odağı veya katı kurallar yakınlığı soğutabilir. Gücün paylaşılmadığı yerde kalıcı söz zorlaşır.',
    keywords: ['sağlamlık', 'vizyon', 'paylaşım', 'koruma', 'güvence'],
    context: 'Bağlanma, paylaşılan güç ve uzun vade vizyonuyla güçlenir.',
    group: 'Tılsımlar',
  },

  // =========================
  // WANDS — ASALAR (14)
  // =========================
  {
    id: 'ace_of_wands_ma_pos4',
    card: 'Ace of Wands',
    position: 4,
    upright:
      'Değnek Ası, bağlanma isteğinde tutkulu bir başlangıç ve yaratıcı enerjiyi gösterir. Heyecan ve ilham, iki tarafın da kalpten evet demesini kolaylaştırır.',
    reversed:
      'Ters Değnek Ası, bağlanmada motivasyon eksikliği veya enerji düşüklüğü olabilir. İlham kaybı, adım atmayı geciktirir.',
    keywords: ['tutku', 'yaratıcılık', 'başlangıç', 'ilham', 'enerji'],
    context:
      'Bağlanma, tutkulu bir başlangıçla güçlenir; enerji eksikliği geciktirir.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ma_pos4',
    card: 'Two of Wands',
    position: 4,
    upright:
      'İki Değnek, bağlanmada ortak vizyon ve geleceğe birlikte bakma isteğini işaret eder. Plan yapma ve hedef belirleme bağı güçlendirir.',
    reversed:
      'Ters İki Değnek, bağlanma isteğinde kararsızlık ve geleceğe dair belirsizlik olabilir. Farklı yönlere çekilme, evet demeyi zorlaştırır.',
    keywords: ['vizyon', 'plan', 'gelecek', 'hedef', 'karar'],
    context: 'Bağlanma, ortak vizyon ve planlarla güçlenir.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ma_pos4',
    card: 'Three of Wands',
    position: 4,
    upright:
      'Üç Değnek, bağlanmada genişleme ve yeni fırsatlara açıklığı gösterir. Ufukların açılması, birlikte büyüme isteğini artırır.',
    reversed:
      'Ters Üç Değnek, bağlanmada dar görüşlülük veya fırsatları görememe olabilir. Sınırlı perspektif, bağı zayıflatır.',
    keywords: ['genişleme', 'fırsat', 'ufuk', 'ilerleme', 'vizyon'],
    context: 'Bağlanma, geniş ufuklar ve fırsatlarla gelişir.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ma_pos4',
    card: 'Four of Wands',
    position: 4,
    upright:
      'Dört Değnek, bağlanmada kutlama, huzur ve sağlam temelleri işaret eder. Birlik duygusu ve istikrar, evet demeyi kolaylaştırır.',
    reversed:
      'Ters Dört Değnek, bağlanmada geçici huzursuzluk veya temel eksikliği olabilir. Uyumsuzluk, sözü zorlaştırır.',
    keywords: ['kutlama', 'birlik', 'huzur', 'istikrar', 'temel'],
    context: 'Bağlanma, huzur ve sağlam temellerle güçlenir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ma_pos4',
    card: 'Five of Wands',
    position: 4,
    upright:
      'Beş Değnek, bağlanmada farklılıkları kabul etme ve yapıcı tartışmaları gösterir. Rekabet yerine işbirliği öne çıkarsa bağ güçlenir.',
    reversed:
      'Ters Beş Değnek, bağlanmada sürekli çatışma veya uyumsuzluk riski vardır. Kavgalar, evet demeyi zorlaştırır.',
    keywords: ['farklılık', 'rekabet', 'uyum', 'yapıcılık', 'çatışma'],
    context:
      'Bağlanma, farklılıkları yapıcı kullanmakla güçlenir; çatışma zayıflatır.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ma_pos4',
    card: 'Six of Wands',
    position: 4,
    upright:
      'Altı Değnek, bağlanmada başarı, takdir ve gururu gösterir. Taraflar birbirlerinin başarılarını paylaştığında bağ derinleşir.',
    reversed:
      'Ters Altı Değnek, bağlanmada takdir eksikliği veya kıskançlık olabilir. Desteklenmeme, bağı zayıflatır.',
    keywords: ['başarı', 'takdir', 'paylaşım', 'gurur', 'destek'],
    context: 'Bağlanma, başarıyı paylaşmakla güçlenir.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ma_pos4',
    card: 'Seven of Wands',
    position: 4,
    upright:
      'Yedi Değnek, bağlanmada değerleri koruma ve birbirine sadakat gösterir. Güçlü duruş, bağı sağlamlaştırır.',
    reversed:
      'Ters Yedi Değnek, bağlanmada aşırı savunmacılık veya tehdit algısı olabilir. Korku, yakınlaşmayı engeller.',
    keywords: ['değer', 'koruma', 'sadakat', 'savunma', 'güç'],
    context: 'Bağlanma, değerleri korumakla güçlenir.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ma_pos4',
    card: 'Eight of Wands',
    position: 4,
    upright:
      'Sekiz Değnek, bağlanmada hızlı ilerleme ve açık iletişimi gösterir. Hız ve netlik, evet demeyi kolaylaştırır.',
    reversed:
      'Ters Sekiz Değnek, bağlanmada gecikmeler veya iletişim eksikliği olabilir. Yavaşlık, bağı zorlaştırır.',
    keywords: ['hız', 'iletişim', 'ilerleme', 'netlik', 'hareket'],
    context: 'Bağlanma, hızlı iletişim ve netlikle güçlenir.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ma_pos4',
    card: 'Nine of Wands',
    position: 4,
    upright:
      'Dokuz Değnek, bağlanmada direnç, sabır ve mücadele gücünü gösterir. Zorluklara rağmen evet demek, bağı sağlamlaştırır.',
    reversed:
      'Ters Dokuz Değnek, bağlanmada yorgunluk veya pes etme riski vardır. Tükenmişlik, adım atmayı geciktirir.',
    keywords: ['direnç', 'sabır', 'mücadele', 'güç', 'dayanıklılık'],
    context: 'Bağlanma, sabır ve dirençle güçlenir.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ma_pos4',
    card: 'Ten of Wands',
    position: 4,
    upright:
      'On Değnek, bağlanmada sorumluluk paylaşma ve yükleri hafifletme isteğini gösterir. Ortak taşıma, bağı güçlendirir.',
    reversed:
      'Ters On Değnek, bağlanmada aşırı yüklenme veya sorumluluktan kaçma olabilir. Dengesiz yük, bağı zorlaştırır.',
    keywords: ['sorumluluk', 'paylaşım', 'yük', 'emek', 'dayanışma'],
    context: 'Bağlanma, sorumluluk paylaşımıyla güçlenir.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ma_pos4',
    card: 'Page of Wands',
    position: 4,
    upright:
      'Değnek Prensi, bağlanmada heyecan, keşif ve yenilik isteğini gösterir. Girişkenlik, evet demeyi kolaylaştırır.',
    reversed:
      'Ters Değnek Prensi, bağlanmada hedefsizlik veya dağınıklık olabilir. Tutarsızlık, bağı zayıflatır.',
    keywords: ['heyecan', 'keşif', 'girişim', 'yenilik', 'enerji'],
    context: 'Bağlanma, heyecan ve keşifle güçlenir.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ma_pos4',
    card: 'Knight of Wands',
    position: 4,
    upright:
      'Değnek Şövalyesi, bağlanmada tutku, cesaret ve hızlı hareket etmeyi gösterir. Atılganlık, evet demeyi kolaylaştırır.',
    reversed:
      'Ters Değnek Şövalyesi, bağlanmada acelecilik veya dengesizlik riski vardır. Aşırı hız, bağı zorlaştırır.',
    keywords: ['tutku', 'cesaret', 'hız', 'hareket', 'atılganlık'],
    context: 'Bağlanma, cesaret ve tutkuyla güçlenir.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ma_pos4',
    card: 'Queen of Wands',
    position: 4,
    upright:
      'Değnek Kraliçesi, bağlanmada özgüven, neşe ve hayat doluluğu gösterir. Karizma ve enerji, evet demeyi kolaylaştırır.',
    reversed:
      'Ters Değnek Kraliçesi, bağlanmada baskıcılık veya kıskançlık olabilir. Güvensizlik, bağı zayıflatır.',
    keywords: ['özgüven', 'neşe', 'enerji', 'karizma', 'liderlik'],
    context: 'Bağlanma, özgüven ve neşeyle güçlenir.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ma_pos4',
    card: 'King of Wands',
    position: 4,
    upright:
      'Değnek Kralı, bağlanmada vizyon, liderlik ve ilham vermeyi gösterir. Güçlü enerji, evet demeyi kolaylaştırır.',
    reversed:
      'Ters Değnek Kralı, bağlanmada baskıcılık veya yönsüzlük olabilir. Otoriter tavır, bağı zorlaştırır.',
    keywords: ['vizyon', 'liderlik', 'ilham', 'güç', 'enerji'],
    context: 'Bağlanma, vizyon ve liderlikle güçlenir.',
    group: 'Asalar',
  },
];

// Kart adına göre pozisyon 4 anlamını bulma fonksiyonu
export const getposition4Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return position4Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getmarriageposition4Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return getposition4Meaning(cardName);
};

// Kart adına göre pozisyon 4 anlamını bulma fonksiyonu (ana index için)
export const getmarriageposition4MeaningByCardName = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  const meaning = getposition4Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 4 anlamlarını alma fonksiyonu
export const getAllposition4Meanings = (): MarriagePositionMeaning[] => {
  return position4Meanings;
};

// pozisyon 4 anlamlarını filtreleme fonksiyonu
export const getposition4MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return position4Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 4 anlamlarını arama
export const searchposition4MeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
  return position4Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position4Meanings,
  getposition4Meaning,
  getAllposition4Meanings,
  getposition4MeaningsByGroup,
  searchposition4MeaningsByKeyword,
};
