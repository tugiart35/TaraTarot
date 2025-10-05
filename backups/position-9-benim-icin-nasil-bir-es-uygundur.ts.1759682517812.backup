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
- position9Meanings: gerekli
- getposition9Meaning: gerekli
*/

import { MarriagePositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position9Meanings: MarriagePositionMeaning[] = [
  // ========== MAJÖR ARKANA (22) ==========
  // EVLİLİK AÇILIMI – SORU 9: "Benim için nasıl bir eş uygundur?"
  // MAJÖR ARKANA – 22 Kart

  {
    id: 'the_fool_ma_pos9',
    card: 'The Fool',
    position: 9,
    upright:
      'Deli, senin için uygun eşin hayatı hafiflik ve neşeyle karşılayan biridir. Meraklı, cesur ve yeni deneyimlere açık olması bağınızı taze tutar.',
    reversed:
      'Ters Deli, düşüncesizce hareket eden, sorumluluk almakta zorlanan bir eşin senin için uygun olmadığını anlatır. Dengeyi kaybettiren acelecilikten uzak durulmalı.',
    keywords: ['özgürlük', 'heves', 'merak', 'cesaret'],
    context:
      'İdeal eş, hayatı hafiflikle kucaklayan, sorumlulukta da dengeli olandır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos9',
    card: 'The Magician',
    position: 9,
    upright:
      'Büyücü, senin için uygun eşin iletişim gücü yüksek, yaratıcı ve kararlı biridir. Sözüyle eylemi uyumlu olan kişi sana güven verir.',
    reversed:
      'Ters Büyücü, manipülatif, sözüne güvenilmeyen ya da maskelerle yaşayan bir eşin sana uygun olmadığını gösterir. Gerçek niyetini saklayan kişilerden uzak dur.',
    keywords: ['iletişim', 'yaratıcılık', 'kararlılık', 'güven'],
    context: 'İdeal eş, sözü ile eylemi uyumlu, dürüst ve kararlı kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos9',
    card: 'The High Priestess',
    position: 9,
    upright:
      'Başrahibe, senin için uygun eşin sezgili, derin düşünen ve sır saklamayı bilen biridir. İçsel bilgelik uyumlu bir bağ kurar.',
    reversed:
      'Ters Başrahibe, aşırı gizemli, duygularını saklayan ya da iletişimden kaçan bir eşin senin için uygun olmadığını gösterir.',
    keywords: ['sezgi', 'bilgelik', 'derinlik', 'uyum'],
    context:
      'İdeal eş, sezgili, derin ve güvenilir paylaşımlarla bağ kuran kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos9',
    card: 'The Empress',
    position: 9,
    upright:
      'İmparatoriçe, senin için uygun eşin şefkatli, besleyici ve üretken biridir. Sevgi dolu yaklaşımı sana huzur verir.',
    reversed:
      'Ters İmparatoriçe, aşırı bağımlı, kıskanç ya da kendi ihtiyaçlarını ihmal eden biri senin için uygun değildir.',
    keywords: ['şefkat', 'besleme', 'bolluk', 'dişil enerji'],
    context: 'İdeal eş, sevgi dolu ve paylaşmayı bilen kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos9',
    card: 'The Emperor',
    position: 9,
    upright:
      'İmparator, senin için uygun eşin düzenli, koruyucu ve güven veren biridir. Sorumluluk alabilmesi ilişkine istikrar katar.',
    reversed:
      'Ters İmparator, katı kuralları olan, kontrolcü ya da esnek olmayan biri sana uygun değildir.',
    keywords: ['güven', 'istikrar', 'koruma', 'sorumluluk'],
    context: 'İdeal eş, düzenli, güven veren ve sorumluluk sahibi kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos9',
    card: 'The Hierophant',
    position: 9,
    upright:
      'Aziz, senin için uygun eşin değerleri güçlü, sadık ve geleneklere saygılı biridir. Ortak inanç ve değerler uyumu güçlendirir.',
    reversed:
      'Ters Aziz, körü körüne kurallara bağlı ya da tam tersi her şeye başkaldıran kişi senin için uygun değildir.',
    keywords: ['değer', 'sadakat', 'inanç', 'gelenek'],
    context: 'İdeal eş, değerlerine bağlı ve güvenilir kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos9',
    card: 'The Lovers',
    position: 9,
    upright:
      'Aşıklar, senin için uygun eşin değer uyumunu önemseyen, kalpten seçimler yapan biridir. Ortak kararlarla bağ güçlenir.',
    reversed:
      'Ters Aşıklar, kararsız, çelişkili ya da değerlerde uyumsuz biri senin için uygun değildir.',
    keywords: ['uyum', 'seçim', 'değer', 'aşk'],
    context: 'İdeal eş, ortak değerleri paylaşan ve net seçimler yapandır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos9',
    card: 'The Chariot',
    position: 9,
    upright:
      'Savaş Arabası, senin için uygun eşin kararlı, hırslı ve hedef odaklı biridir. Hayata yön verme isteği sana ilham olur.',
    reversed:
      'Ters Savaş Arabası, yönsüz, savruk ya da aşırı baskıcı kişi senin için uygun değildir.',
    keywords: ['karar', 'hedef', 'irade', 'kontrol'],
    context: 'İdeal eş, kararlı ve hedeflerine sadık kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos9',
    card: 'Strength',
    position: 9,
    upright:
      'Güç, senin için uygun eşin sabırlı, nazik ve şefkatli biridir. Nazik cesaretiyle güven verir.',
    reversed:
      'Ters Güç, sabırsız, kıskanç ya da güç gösterisine yatkın kişi senin için uygun değildir.',
    keywords: ['sabır', 'şefkat', 'cesaret', 'güven'],
    context: 'İdeal eş, sabırlı ve nazik cesaret gösteren kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos9',
    card: 'The Hermit',
    position: 9,
    upright:
      'Ermiş, senin için uygun eşin içsel derinliği olan, bilge ve rehberlik edebilen biridir. Sessizlikte bile güven verebilir.',
    reversed:
      'Ters Ermiş, aşırı içine kapanık, soğuk ya da uzak duran kişi senin için uygun değildir.',
    keywords: ['bilgelik', 'derinlik', 'rehberlik', 'güven'],
    context: 'İdeal eş, derinlik ve bilgelikle destek veren kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos9',
    card: 'The Wheel of Fortune',
    position: 9,
    upright:
      'Kader Çarkı, senin için uygun eşin değişime açık, esnek ve fırsatları değerlendirebilen biridir. Hayat döngülerinde yanında olur.',
    reversed:
      'Ters Kader Çarkı, değişime direnen, sıkışmış ya da şansa bağımlı kişi senin için uygun değildir.',
    keywords: ['değişim', 'esneklik', 'fırsat', 'akış'],
    context: 'İdeal eş, akışa uyum sağlayan kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos9',
    card: 'Justice',
    position: 9,
    upright:
      'Adalet, senin için uygun eşin adil, dengeli ve dürüst biridir. Açık sözlülüğü bağda güven yaratır.',
    reversed:
      'Ters Adalet, adaletsiz, dürüst olmayan ya da çifte standartlı kişi senin için uygun değildir.',
    keywords: ['adalet', 'denge', 'dürüstlük', 'güven'],
    context: 'İdeal eş, adil ve dürüst kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos9',
    card: 'The Hanged Man',
    position: 9,
    upright:
      'Asılan Adam, senin için uygun eşin fedakarlık yapabilen, farklı bakış açılarına açık kişidir. Esnekliği uyumu büyütür.',
    reversed:
      'Ters Asılan Adam, pasif, kurban bilincinde yaşayan ya da değişime kapalı kişi senin için uygun değildir.',
    keywords: ['fedakarlık', 'esneklik', 'bakış açısı', 'uyum'],
    context: 'İdeal eş, esnek bakış açısıyla denge sağlayandır.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos9',
    card: 'Death',
    position: 9,
    upright:
      'Ölüm, senin için uygun eşin dönüşüme açık, eskiyi bırakıp yeniyi kucaklayan biridir. Yenilenme gücü ilişkiye canlılık katar.',
    reversed:
      'Ters Ölüm, geçmişe takılı kalan, değişime direnen kişi senin için uygun değildir.',
    keywords: ['dönüşüm', 'yenilenme', 'bitiş', 'başlangıç'],
    context: 'İdeal eş, dönüşümden korkmayan kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos9',
    card: 'Temperance',
    position: 9,
    upright:
      'Denge, senin için uygun eşin ölçülü, sabırlı ve uyumlu biridir. Orta yolu bulabilmesi güven verir.',
    reversed:
      'Ters Denge, aşırılıklara kayan, sabırsız ya da uyumsuz kişi senin için uygun değildir.',
    keywords: ['denge', 'sabır', 'uyum', 'ölçü'],
    context: 'İdeal eş, uyum ve sabırla orta yolu bulabilendir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos9',
    card: 'The Devil',
    position: 9,
    upright:
      'Şeytan, senin için uygun eşin güçlü tutkulara sahip, çekim yaratan ama özgür iradeyi onurlandıran biridir. Bağ tutkuyla beslenir.',
    reversed:
      'Ters Şeytan, bağımlı, kıskanç, manipülatif ya da özgürlük kısıtlayan kişi senin için uygun değildir.',
    keywords: ['tutku', 'çekim', 'özgürlük', 'denge'],
    context: 'İdeal eş, tutku ile özgürlüğü dengeleyebilen kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos9',
    card: 'The Tower',
    position: 9,
    upright:
      'Kule, senin için uygun eşin ani farkındalıklar yaratabilen, gerçeklerle yüzleşmekten korkmayan biridir. Dürüstlük bağda temeli sağlamlaştırır.',
    reversed:
      'Ters Kule, sürekli kriz çıkaran, yıkıcı veya gerçeği saklayan kişi senin için uygun değildir.',
    keywords: ['gerçek', 'farkındalık', 'dürüstlük', 'değişim'],
    context: 'İdeal eş, gerçeği korkmadan paylaşan kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos9',
    card: 'The Star',
    position: 9,
    upright:
      'Yıldız, senin için uygun eşin umut veren, ilham kaynağı olan ve şeffaf kişidir. Işığıyla geleceğe dair güven yaratır.',
    reversed:
      'Ters Yıldız, umutsuz, karamsar ya da sahte umut veren kişi senin için uygun değildir.',
    keywords: ['umut', 'ilham', 'şeffaflık', 'gelecek'],
    context: 'İdeal eş, umut ve şeffaflık getiren kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos9',
    card: 'The Moon',
    position: 9,
    upright:
      'Ay, senin için uygun eşin sezgileri güçlü, empatik ve duygularıyla bağ kurabilen biridir. Duygusal hassasiyet uyum sağlar.',
    reversed:
      'Ters Ay, belirsizlik yaratan, manipülatif ya da korkularına teslim olan kişi senin için uygun değildir.',
    keywords: ['sezgi', 'empati', 'duygu', 'uyum'],
    context: 'İdeal eş, sezgileriyle güven veren kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos9',
    card: 'The Sun',
    position: 9,
    upright:
      'Güneş, senin için uygun eşin neşeli, samimi ve açık yürekli biridir. Sıcak enerjisi uyumu güçlendirir.',
    reversed:
      'Ters Güneş, yapmacık neşe sergileyen ya da içtenliği olmayan kişi senin için uygun değildir.',
    keywords: ['neşe', 'samimiyet', 'açıklık', 'enerji'],
    context: 'İdeal eş, içtenliğiyle neşe getiren kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos9',
    card: 'Judgement',
    position: 9,
    upright:
      'Mahkeme, senin için uygun eşin geçmişiyle yüzleşmiş, affediciliği öğrenmiş ve kendini dönüştürmüş biridir. Yenilenmiş bakış açısı güven verir.',
    reversed:
      'Ters Mahkeme, geçmiş yüklerini bırakamayan ya da sürekli yargılayan kişi senin için uygun değildir.',
    keywords: ['yenilenme', 'affediş', 'farkındalık', 'özgürleşme'],
    context: 'İdeal eş, geçmişten ders çıkaran ve yenilenmiş kişidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos9',
    card: 'The World',
    position: 9,
    upright:
      'Dünya, senin için uygun eşin bütünlük hissi veren, olgun ve tamamlanmış biridir. Birlikte döngüyü tamamlamaya hazırdır.',
    reversed:
      'Ters Dünya, eksik, yarım kalmışlık hissi veren ya da döngüsünü kapatamamış kişi senin için uygun değildir.',
    keywords: ['bütünlük', 'tamamlanma', 'olgunluk', 'birlik'],
    context: 'İdeal eş, bütünlük ve olgunluk getiren kişidir.',
    group: 'Majör Arkana',
  },
  // KUPALAR – 14 Kart //
  // KUPALAR
  {
    id: 'ace_of_cups_cu_pos9',
    card: 'Ace of Cups',
    position: 9,
    upright:
      'Kupaların Ası, kalbi açık, duygularını şeffafça ifade eden biri senin için uygundur. Sevgi dolu ve ruhunu besleyen bir eş yanında huzur getirir.',
    reversed:
      'Ters Kupaların Ası, duygularını saklayan veya bağ kurmakta zorlanan biri seni yorar. Duygusal açıklık eksikliği eşleşmeyi zorlaştırır.',
    keywords: ['sevgi', 'açıklık', 'samimiyet', 'besleyici'],
    context: 'Kalbini açan ve sevgiyi cömertçe paylaşan eş sana uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cu_pos9',
    card: 'Two of Cups',
    position: 9,
    upright:
      'Kupaların İkilisi, ruh eşi uyumunu taşıyan, eşit paylaşım ve dengede duran biri senin için uygundur. Kalp kalbe bağlanan ilişkiler seni besler.',
    reversed:
      'Ters Kupaların İkilisi, dengesiz bağlar ya da tek taraflı çabalar senin için uygun değildir. Karşılıklı saygı ve paylaşım temel olmalıdır.',
    keywords: ['ruh eşi', 'uyum', 'denge', 'paylaşım'],
    context: 'Kalbine eşlik eden ve eşit bağ kuran kişi uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cu_pos9',
    card: 'Three of Cups',
    position: 9,
    upright:
      'Kupaların Üçlüsü, hayatı kutlamayı bilen, arkadaşlığı güçlü, çevresiyle uyumlu biri sana uygun bir eştir. Neşeyi paylaşmak bağı güçlendirir.',
    reversed:
      'Ters Kupaların Üçlüsü, yüzeysel bağlar ya da sosyal dengesizlikler ilişkini yorabilir. Samimi ve derinlikli biri yanında daha doğru olur.',
    keywords: ['neşe', 'arkadaşlık', 'kutlama', 'paylaşım'],
    context: 'Hayatı paylaşmayı bilen, neşeli ruh sana uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cu_pos9',
    card: 'Four of Cups',
    position: 9,
    upright:
      'Kupaların Dörtlüsü, içsel derinliği olan, ama aynı zamanda fırsatları fark eden bir eş senin için uygundur. Duygularını görmezden gelmeyen biri güven verir.',
    reversed:
      'Ters Kupaların Dörtlüsü, sürekli tatminsizlik içinde kalan ya da hiçbir şeyden memnun olmayan biri senin için uygun değildir.',
    keywords: ['farkındalık', 'içe dönüş', 'tatmin', 'denge'],
    context: 'Farkındalıklı ve duygularına saygılı biri uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cu_pos9',
    card: 'Five of Cups',
    position: 9,
    upright:
      'Kupaların Beşlisi, kayıplardan öğrenmiş, şefkatle bakmayı bilen biri senin için uygundur. Yasını dönüştürmüş eş, ilişkide derinlik sağlar.',
    reversed:
      'Ters Kupaların Beşlisi, geçmişe aşırı takılı kalan ya da sürekli olumsuzluk gören biri sana uygun değildir. İleriye bakan eş güven verir.',
    keywords: ['şefkat', 'öğrenme', 'kabullenme', 'umut'],
    context: 'Geçmişten ders çıkaran, ileriye bakan eş uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cu_pos9',
    card: 'Six of Cups',
    position: 9,
    upright:
      'Kupaların Altılısı, iç çocukla teması güçlü, nostaljik ve sıcak kalpli biri sana uygundur. Masumiyetiyle bağını güçlendirir.',
    reversed:
      'Ters Kupaların Altılısı, geçmişe saplanıp kalan ya da yetişkin sorumluluğunu taşımayan biri sana uygun değildir.',
    keywords: ['nostalji', 'masumiyet', 'sıcaklık', 'şefkat'],
    context: 'Masum kalpli ve sıcak biri uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cu_pos9',
    card: 'Seven of Cups',
    position: 9,
    upright:
      'Kupaların Yedilisi, hayal gücü zengin, ama gerçeklikten kopmayan bir eş sana uygundur. Vizyon sahibi ve dengeli yaklaşım uyum getirir.',
    reversed:
      'Ters Kupaların Yedilisi, sürekli hayal peşinde koşan ama somut adım atmayan biri senin için uygun değildir.',
    keywords: ['hayal', 'vizyon', 'denge', 'seçim'],
    context: 'Hayal gücü olan ama ayakları yere basan biri uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cu_pos9',
    card: 'Eight of Cups',
    position: 9,
    upright:
      'Kupaların Sekizlisi, anlam arayan, derinlikli ve ruhunu besleyecek bir yolculuğa açık bir eş sana uygundur. İçsel arayışı ilişkine derinlik katar.',
    reversed:
      'Ters Kupaların Sekizlisi, sürekli kaçmaya çalışan ya da sorumluluk almaktan uzak duran biri senin için uygun değildir.',
    keywords: ['anlam', 'derinlik', 'arayış', 'cesaret'],
    context: 'Ruhsal derinliği olan kişi uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cu_pos9',
    card: 'Nine of Cups',
    position: 9,
    upright:
      'Kupaların Dokuzlusu, kendisiyle barışık, tatmin olmuş ve paylaşmaya hazır biri sana uygundur. Kendi mutluluğunu seninle büyüten eş güven verir.',
    reversed:
      'Ters Kupaların Dokuzlusu, sürekli doyumsuz olan ya da dışsal hazlara bağımlı kişi senin için uygun değildir.',
    keywords: ['tatmin', 'mutluluk', 'öz değer', 'paylaşım'],
    context: 'Kendi mutluluğunu paylaşan eş uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cu_pos9',
    card: 'Ten of Cups',
    position: 9,
    upright:
      'Kupaların Onlusu, aile sıcaklığı kurabilen, huzuru paylaşan biri senin için uygundur. Birlik duygusunu önemseyen eş yanında güven verir.',
    reversed:
      'Ters Kupaların Onlusu, aile kavramına uzak duran ya da huzuru sürekli bozan biri sana uygun değildir.',
    keywords: ['aile', 'huzur', 'birlik', 'sevgi'],
    context: 'Aileyi önemseyen, huzuru paylaşan eş uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cu_pos9',
    card: 'Page of Cups',
    position: 9,
    upright:
      'Kupaların Prensi, yaratıcı, hassas ve içten duygularını ifade eden biri sana uygundur. Saf kalbiyle bağını besler.',
    reversed:
      'Ters Kupaların Prensi, aşırı hayalperest ya da olgunlaşmamış duygular taşıyan biri sana uygun değildir.',
    keywords: ['yaratıcılık', 'hassasiyet', 'masumiyet', 'ifade'],
    context: 'Saf kalpli ve yaratıcı biri uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cu_pos9',
    card: 'Knight of Cups',
    position: 9,
    upright:
      'Kupaların Şövalyesi, romantik, vizyon sahibi ve kalbini cesurca açan biri senin için uygundur. Zarif yaklaşımı seni besler.',
    reversed:
      'Ters Kupaların Şövalyesi, tutarsız vaatlerle gelen ya da aşırı hayalci biri sana uygun değildir.',
    keywords: ['romantizm', 'vizyon', 'cesaret', 'duygu'],
    context: 'Romantik ve kalbini açan eş uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cu_pos9',
    card: 'Queen of Cups',
    position: 9,
    upright:
      'Kupaların Kraliçesi, empati yeteneği yüksek, şefkatli ve güven veren bir eştir. İçsel sezgileri güçlüdür.',
    reversed:
      'Ters Kupaların Kraliçesi, sınırlarını kaybeden ya da duygusal olarak manipülatif biri sana uygun değildir.',
    keywords: ['empati', 'şefkat', 'sezgi', 'güven'],
    context: 'Şefkatli ve sezgisel eş uygundur.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cu_pos9',
    card: 'King of Cups',
    position: 9,
    upright:
      'Kupaların Kralı, olgun, duygularını dengeli yöneten ve sakin bir eş sana uygundur. Zor zamanlarda merkezde kalabilen biri güven verir.',
    reversed:
      'Ters Kupaların Kralı, duygularını bastıran ya da pasif-agresif tutum sergileyen biri sana uygun değildir.',
    keywords: ['olgunluk', 'denge', 'sakinlik', 'güven'],
    context: 'Duygusal olgunluğa sahip eş uygundur.',
    group: 'Kupalar',
  },

  // ==== SWORDS (Kılıçlar) ====
  {
    id: 'ace_of_swords_sw_pos9',
    card: 'Ace of Swords',
    position: 9,
    upright:
      'Kılıçların Ası, net ve dürüst iletişim kuran biri sana uygundur. Gerçekleri açıkça dile getiren eş, güvende hissettirir.',
    reversed:
      'Ters Kılıçların Ası, gerçeği saklayan veya manipüle eden biri senin için uygun değildir. İletişimde bulanıklık bağı zorlaştırır.',
    keywords: ['dürüstlük', 'netlik', 'iletişim', 'hakikat'],
    context: 'Açık ve dürüst iletişim kuran eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sw_pos9',
    card: 'Two of Swords',
    position: 9,
    upright:
      'Kılıçların İkilisi, denge kuran, kararlarında adaletli davranan biri senin için uygundur. Fikir ayrılıklarını sakinlikle yöneten eş huzur getirir.',
    reversed:
      'Ters Kılıçların İkilisi, sürekli kararsız kalan ya da yüzleşmekten kaçan biri sana uygun değildir.',
    keywords: ['denge', 'karar', 'adalet', 'uyum'],
    context: 'Adil ve dengeli karar veren eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sw_pos9',
    card: 'Three of Swords',
    position: 9,
    upright:
      'Kılıçların Üçlüsü, kalp kırıklıklarından ders almış, empati yapabilen biri senin için uygundur. Acıdan olgunluk çıkaran eş güven verir.',
    reversed:
      'Ters Kılıçların Üçlüsü, geçmiş acılarından kurtulamayan ya da sürekli kırgınlık yaşayan biri sana uygun değildir.',
    keywords: ['empati', 'ders', 'olgunluk', 'şifa'],
    context: 'Geçmişten öğrenmiş olgun biri uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sw_pos9',
    card: 'Four of Swords',
    position: 9,
    upright:
      'Kılıçların Dörtlüsü, dinginliğiyle huzur veren, sakin bir eş sana uygundur. Krizlerde mola vermeyi bilen biri uyum getirir.',
    reversed:
      'Ters Kılıçların Dörtlüsü, huzur vermeyen, sürekli kaos çıkaran biri sana uygun değildir.',
    keywords: ['dinginlik', 'mola', 'huzur', 'denge'],
    context: 'Sakinlik taşıyan eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sw_pos9',
    card: 'Five of Swords',
    position: 9,
    upright:
      'Kılıçların Beşlisi, kazanmaktan çok bağını önemseyen, esnek biri sana uygundur. Haklı çıkmaya değil, çözüm bulmaya odaklanan eş huzur verir.',
    reversed:
      'Ters Kılıçların Beşlisi, sürekli kavgacı ve haklı çıkma derdinde olan biri sana uygun değildir.',
    keywords: ['çözüm', 'esneklik', 'bağ', 'uzlaşma'],
    context: 'Çözüm odaklı ve uyumlu eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sw_pos9',
    card: 'Six of Swords',
    position: 9,
    upright:
      'Kılıçların Altılısı, zor zamanlarda yanında duran ve birlikte geçişi kolaylaştıran biri sana uygundur.',
    reversed:
      'Ters Kılıçların Altılısı, geçmişe takılı kalan ve ilerlemekte zorlanan biri senin için uygun değildir.',
    keywords: ['geçiş', 'destek', 'ilerleme', 'uyum'],
    context: 'İlerlemeni kolaylaştıran eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sw_pos9',
    card: 'Seven of Swords',
    position: 9,
    upright:
      'Kılıçların Yedilisi, stratejik ama dürüst kalan, güveni sarsmayan biri sana uygundur.',
    reversed:
      'Ters Kılıçların Yedilisi, gizli saklı iş çeviren, dürüst olmayan kişi senin için uygun değildir.',
    keywords: ['dürüstlük', 'güven', 'strateji', 'açıklık'],
    context: 'Dürüst ve güvenilir eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sw_pos9',
    card: 'Eight of Swords',
    position: 9,
    upright:
      'Kılıçların Sekizlisi, sınırlamalarını fark etmiş ve onları aşabilen eş senin için uygundur.',
    reversed:
      'Ters Kılıçların Sekizlisi, kendi korkularına saplanıp kalan biri sana uygun değildir.',
    keywords: ['özgürleşme', 'cesaret', 'farkındalık', 'denge'],
    context: 'Sınırlarını aşmayı bilen eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sw_pos9',
    card: 'Nine of Swords',
    position: 9,
    upright:
      'Kılıçların Dokuzlusu, kaygılarını yönetebilen, karanlıkta bile umut taşıyan eş sana uygundur.',
    reversed:
      'Ters Kılıçların Dokuzlusu, sürekli kaygı yayan ve umutsuzlukla yaşayan biri sana uygun değildir.',
    keywords: ['umut', 'denge', 'kaygı', 'dayanıklılık'],
    context: 'Kaygılarını aşabilen eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sw_pos9',
    card: 'Ten of Swords',
    position: 9,
    upright:
      'Kılıçların Onlusu, yeniden doğma gücüne sahip, bitişleri onurlandırıp yeniye açılan biri sana uygundur.',
    reversed:
      'Ters Kılıçların Onlusu, sürekli mağdur rolünde kalan ya da yeniye direnç gösteren biri sana uygun değildir.',
    keywords: ['yeniden doğuş', 'bitiş', 'güç', 'dönüşüm'],
    context: 'Yenilenmeye açık eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sw_pos9',
    card: 'Page of Swords',
    position: 9,
    upright:
      'Kılıçların Prensi, meraklı, öğrenmeye açık ve dürüst iletişim kuran eş senin için uygundur.',
    reversed:
      'Ters Kılıçların Prensi, dedikoducu ya da aceleci yargılar veren biri sana uygun değildir.',
    keywords: ['merak', 'öğrenme', 'iletişim', 'dürüstlük'],
    context: 'Meraklı ve dürüst eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sw_pos9',
    card: 'Knight of Swords',
    position: 9,
    upright:
      'Kılıçların Şövalyesi, cesurca iletişim kuran, kararlı ve hızlı düşünen bir eş sana uygundur.',
    reversed:
      'Ters Kılıçların Şövalyesi, aceleci ve saldırgan iletişim tarzı olan biri sana uygun değildir.',
    keywords: ['cesaret', 'kararlılık', 'iletişim', 'netlik'],
    context: 'Cesur ve kararlı iletişim kuran eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sw_pos9',
    card: 'Queen of Swords',
    position: 9,
    upright:
      'Kılıçların Kraliçesi, bağımsız, zeki ve açık sözlü biri sana uygundur. Mantıkla sevgiyi dengeleyen eş uyum getirir.',
    reversed:
      'Ters Kılıçların Kraliçesi, aşırı eleştirel ya da mesafeli biri sana uygun değildir.',
    keywords: ['zeka', 'bağımsızlık', 'netlik', 'mantık'],
    context: 'Zeki ve net eş uygundur.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sw_pos9',
    card: 'King of Swords',
    position: 9,
    upright:
      'Kılıçların Kralı, adil, mantıklı ve stratejik düşünen bir eş sana uygundur.',
    reversed:
      'Ters Kılıçların Kralı, katı ve duygusuz davranan biri sana uygun değildir.',
    keywords: ['adalet', 'mantık', 'strateji', 'denge'],
    context: 'Adil ve stratejik eş uygundur.',
    group: 'Kılıçlar',
  },

  // TILSIMLAR
  {
    id: 'ace_of_pentacles_pe_pos9',
    card: 'Ace of Pentacles',
    position: 9,
    upright:
      'Tılsımların Ası, güvenli ve sağlam temeller kuran eş sana uygundur. Somut adımlar atan biri huzur getirir.',
    reversed:
      'Ters Tılsımların Ası, istikrarsız ve güvensiz davranışlar sergileyen biri sana uygun değildir.',
    keywords: ['güven', 'temel', 'istikrar', 'büyüme'],
    context: 'Güvenli temeller kuran eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pe_pos9',
    card: 'Two of Pentacles',
    position: 9,
    upright:
      'Tılsımların İkilisi, esnek, denge kurabilen ve uyum sağlayan eş sana uygundur.',
    reversed:
      'Ters Tılsımların İkilisi, sürekli dengesiz ve kararsız olan biri sana uygun değildir.',
    keywords: ['denge', 'esneklik', 'uyum', 'pratiklik'],
    context: 'Dengeli ve uyumlu eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pe_pos9',
    card: 'Three of Pentacles',
    position: 9,
    upright:
      'Tılsımların Üçlüsü, işbirliğine açık, birlikte inşa etmeyi seven eş sana uygundur.',
    reversed:
      'Ters Tılsımların Üçlüsü, işbirliğinden uzak ve bencil biri sana uygun değildir.',
    keywords: ['işbirliği', 'uyum', 'inşa', 'paylaşım'],
    context: 'İşbirliğine açık eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pe_pos9',
    card: 'Four of Pentacles',
    position: 9,
    upright:
      'Tılsımların Dörtlüsü, güveni önemseyen, sadık bir eş senin için uygundur.',
    reversed:
      'Ters Tılsımların Dörtlüsü, aşırı tutucu ya da paylaşım yapmayan biri sana uygun değildir.',
    keywords: ['sadakat', 'güven', 'istikrar', 'paylaşım'],
    context: 'Sadık ve güvenilir eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pe_pos9',
    card: 'Five of Pentacles',
    position: 9,
    upright:
      'Tılsımların Beşlisi, zor zamanlarda yanında duran ve desteğini esirgemeyen eş sana uygundur.',
    reversed:
      'Ters Tılsımların Beşlisi, krizlerde yalnız bırakan biri sana uygun değildir.',
    keywords: ['destek', 'sadakat', 'dayanışma', 'sabır'],
    context: 'Zor zamanlarda yanında olan eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pe_pos9',
    card: 'Six of Pentacles',
    position: 9,
    upright:
      'Tılsımların Altılısı, adil paylaşan, cömert ve dengeli eş sana uygundur.',
    reversed:
      'Ters Tılsımların Altılısı, gücü paylaşmayan veya adaletsiz biri sana uygun değildir.',
    keywords: ['adalet', 'paylaşım', 'denge', 'cömertlik'],
    context: 'Adil ve cömert eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pe_pos9',
    card: 'Seven of Pentacles',
    position: 9,
    upright:
      'Tılsımların Yedilisi, sabırlı, emek veren ve geleceğe yatırım yapan eş sana uygundur.',
    reversed:
      'Ters Tılsımların Yedilisi, sabırsız ve kısa vadeli düşünen biri sana uygun değildir.',
    keywords: ['sabır', 'emek', 'yatırım', 'istikrar'],
    context: 'Sabırlı ve emek veren eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pe_pos9',
    card: 'Eight of Pentacles',
    position: 9,
    upright:
      'Tılsımların Sekizlisi, çalışkan, disiplinli ve işini seven bir eş sana uygundur.',
    reversed:
      'Ters Tılsımların Sekizlisi, sorumsuz ve özensiz biri sana uygun değildir.',
    keywords: ['çalışkanlık', 'disiplin', 'sorumluluk', 'özen'],
    context: 'Çalışkan ve sorumlu eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pe_pos9',
    card: 'Nine of Pentacles',
    position: 9,
    upright:
      'Tılsımların Dokuzlusu, bağımsız, özgüveni yüksek ve öz değerine sahip eş sana uygundur.',
    reversed:
      'Ters Tılsımların Dokuzlusu, bağımlı veya sorumluluk almayan eş sana uygun değildir.',
    keywords: ['özgüven', 'bağımsızlık', 'öz değer', 'istikrar'],
    context: 'Öz değerini bilen eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pe_pos9',
    card: 'Ten of Pentacles',
    position: 9,
    upright:
      'Tılsımların Onlusu, aile bağlarını önemseyen, kalıcı yapı kurabilen eş sana uygundur.',
    reversed:
      'Ters Tılsımların Onlusu, aile sorumluluklarını taşımayan ya da istikrarsız biri sana uygun değildir.',
    keywords: ['aile', 'istikrar', 'kalıcılık', 'sorumluluk'],
    context: 'Aileye önem veren eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pe_pos9',
    card: 'Page of Pentacles',
    position: 9,
    upright:
      'Tılsımların Prensi, öğrenmeye açık, gelişim odaklı eş sana uygundur.',
    reversed:
      'Ters Tılsımların Prensi, hedefsiz ve sorumsuz davranan biri sana uygun değildir.',
    keywords: ['öğrenme', 'gelişim', 'hedef', 'sorumluluk'],
    context: 'Öğrenmeye açık eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pe_pos9',
    card: 'Knight of Pentacles',
    position: 9,
    upright:
      'Tılsımların Şövalyesi, istikrarlı, güvenilir ve yavaş ama emin adımlar atan eş sana uygundur.',
    reversed:
      'Ters Tılsımların Şövalyesi, durağan ve aşırı inatçı biri sana uygun değildir.',
    keywords: ['istikrar', 'güven', 'sabır', 'sorumluluk'],
    context: 'Güvenilir ve sabırlı eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pe_pos9',
    card: 'Queen of Pentacles',
    position: 9,
    upright:
      'Tılsımların Kraliçesi, şefkatli, pratik ve kaynaklarını dengeli kullanan eş sana uygundur.',
    reversed:
      'Ters Tılsımların Kraliçesi, öz bakımını ihmal eden veya aşırı yük alan biri sana uygun değildir.',
    keywords: ['şefkat', 'pratiklik', 'denge', 'kaynak'],
    context: 'Şefkatli ve pratik eş uygundur.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pe_pos9',
    card: 'King of Pentacles',
    position: 9,
    upright:
      'Tılsımların Kralı, sorumluluk sahibi, güven veren ve maddi manevi destek olan eş sana uygundur.',
    reversed:
      'Ters Tılsımların Kralı, aşırı kontrolcü ya da cimri biri sana uygun değildir.',
    keywords: ['sorumluluk', 'güven', 'istikrar', 'destek'],
    context: 'Sorumlu ve destekleyici eş uygundur.',
    group: 'Tılsımlar',
  },

  // ASALAR
  {
    id: 'ace_of_wands_wa_pos9',
    card: 'Ace of Wands',
    position: 9,
    upright:
      'Asaların Ası, tutkulu, yaratıcı ve girişimci eş sana uygundur. İlişkiye heyecan katar.',
    reversed:
      'Ters Asaların Ası, motivasyonsuz ve isteksiz biri sana uygun değildir.',
    keywords: ['tutku', 'yaratıcılık', 'girişim', 'heyecan'],
    context: 'Tutkulu ve yaratıcı eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_wa_pos9',
    card: 'Two of Wands',
    position: 9,
    upright:
      'Asaların İkilisi, vizyon sahibi, geleceğe dair plan yapan eş sana uygundur.',
    reversed:
      'Ters Asaların İkilisi, kararsız ve hedefsiz biri sana uygun değildir.',
    keywords: ['vizyon', 'plan', 'gelecek', 'cesaret'],
    context: 'Geleceği planlayan eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_wa_pos9',
    card: 'Three of Wands',
    position: 9,
    upright:
      'Asaların Üçlüsü, ufkunu genişletmeyi seven, yeni fırsatlara açık eş sana uygundur.',
    reversed:
      'Ters Asaların Üçlüsü, kapalı ve fırsatları görmeyen biri sana uygun değildir.',
    keywords: ['fırsat', 'vizyon', 'ilerleme', 'ufuk'],
    context: 'Ufku geniş eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_wa_pos9',
    card: 'Four of Wands',
    position: 9,
    upright:
      'Asaların Dörtlüsü, birlik duygusunu önemseyen, kutlama ve huzuru paylaşan eş sana uygundur.',
    reversed:
      'Ters Asaların Dörtlüsü, uyumdan uzak veya huzursuz biri sana uygun değildir.',
    keywords: ['birlik', 'kutlama', 'huzur', 'dayanışma'],
    context: 'Birlik duygusu taşıyan eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_wa_pos9',
    card: 'Five of Wands',
    position: 9,
    upright:
      'Asaların Beşlisi, yapıcı rekabeti olan, farklılıkları kabul eden eş sana uygundur.',
    reversed:
      'Ters Asaların Beşlisi, sürekli kavga çıkaran veya uyumsuz biri sana uygun değildir.',
    keywords: ['rekabet', 'farklılık', 'uyum', 'yapıcılık'],
    context: 'Farklılıkları yapıcı kullanan eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_wa_pos9',
    card: 'Six of Wands',
    position: 9,
    upright:
      'Asaların Altılısı, başarılarını paylaşan, yanında gururla duran eş sana uygundur.',
    reversed:
      'Ters Asaların Altılısı, kıskanç ve desteklemeyen biri sana uygun değildir.',
    keywords: ['başarı', 'gurur', 'destek', 'paylaşım'],
    context: 'Başarını paylaşan eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_wa_pos9',
    card: 'Seven of Wands',
    position: 9,
    upright:
      'Asaların Yedilisi, değerlerini koruyan ve yanında duran eş sana uygundur.',
    reversed:
      'Ters Asaların Yedilisi, sürekli savunmada ya da tehditkar biri sana uygun değildir.',
    keywords: ['değer', 'koruma', 'sadakat', 'güç'],
    context: 'Değerlerini koruyan eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_wa_pos9',
    card: 'Eight of Wands',
    position: 9,
    upright:
      'Asaların Sekizlisi, hızlı, açık iletişim kuran ve harekete geçen eş sana uygundur.',
    reversed:
      'Ters Asaların Sekizlisi, iletişimsiz ve ertelemeci biri sana uygun değildir.',
    keywords: ['iletişim', 'hareket', 'hız', 'netlik'],
    context: 'Hızlı ve açık iletişim kuran eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_wa_pos9',
    card: 'Nine of Wands',
    position: 9,
    upright:
      'Asaların Dokuzlusu, sabırlı, dirençli ve mücadele gücü olan eş sana uygundur.',
    reversed:
      'Ters Asaların Dokuzlusu, sürekli yorgun ve pes eden biri sana uygun değildir.',
    keywords: ['sabır', 'direnç', 'güç', 'dayanıklılık'],
    context: 'Mücadele gücü olan eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_wa_pos9',
    card: 'Ten of Wands',
    position: 9,
    upright:
      'Asaların Onlusu, sorumluluklarını paylaşan ve yükleri hafifleten eş sana uygundur.',
    reversed:
      'Ters Asaların Onlusu, sorumluluklarını başkasına yıkan biri sana uygun değildir.',
    keywords: ['sorumluluk', 'dayanışma', 'emek', 'paylaşım'],
    context: 'Sorumluluk alan eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_wa_pos9',
    card: 'Page of Wands',
    position: 9,
    upright:
      'Asaların Prensi, heyecanlı, keşfe açık ve girişken bir eş sana uygundur.',
    reversed:
      'Ters Asaların Prensi, hedefsiz ve dağınık biri sana uygun değildir.',
    keywords: ['heyecan', 'keşif', 'girişim', 'enerji'],
    context: 'Heyecanı olan eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_wa_pos9',
    card: 'Knight of Wands',
    position: 9,
    upright:
      'Asaların Şövalyesi, tutkulu, cesur ve hareketli eş sana uygundur.',
    reversed:
      'Ters Asaların Şövalyesi, dengesiz veya aşırı aceleci biri sana uygun değildir.',
    keywords: ['tutku', 'cesaret', 'hareket', 'enerji'],
    context: 'Tutkulu ve cesur eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_wa_pos9',
    card: 'Queen of Wands',
    position: 9,
    upright:
      'Asaların Kraliçesi, özgüvenli, neşeli ve hayat dolu eş sana uygundur.',
    reversed:
      'Ters Asaların Kraliçesi, aşırı baskıcı veya kıskanç biri sana uygun değildir.',
    keywords: ['özgüven', 'neşe', 'enerji', 'liderlik'],
    context: 'Özgüvenli ve neşeli eş uygundur.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_wa_pos9',
    card: 'King of Wands',
    position: 9,
    upright:
      'Asaların Kralı, vizyoner, ilham veren ve güçlü bir eş sana uygundur.',
    reversed:
      'Ters Asaların Kralı, baskıcı veya yönsüz biri sana uygun değildir.',
    keywords: ['vizyon', 'liderlik', 'güç', 'ilham'],
    context: 'Vizyoner ve güçlü eş uygundur.',
    group: 'Asalar',
  },
];

// Kart adına göre pozisyon 9 anlamını bulma fonksiyonu
export const getposition9Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return position9Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getmarriageposition9Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return getposition9Meaning(cardName);
};

// Kart adına göre pozisyon 9 anlamını bulma fonksiyonu (ana index için)
export const getmarriageposition9MeaningByCardName = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  const meaning = getposition9Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 9 anlamlarını alma fonksiyonu
export const getAllposition9Meanings = (): MarriagePositionMeaning[] => {
  return position9Meanings;
};

// pozisyon 9 anlamlarını filtreleme fonksiyonu
export const getposition9MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return position9Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 9 anlamlarını arama
export const searchposition9MeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
  return position9Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position9Meanings,
  getposition9Meaning,
  getAllposition9Meanings,
  getposition9MeaningsByGroup,
  searchposition9MeaningsByKeyword,
};
