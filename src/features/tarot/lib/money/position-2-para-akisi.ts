/*
info:
---
Dosya Amacı:
- Problem Çözme açılımında 1. pozisyon (Mevcut Durum) için özel kart anlamları
- Her kartın bu pozisyonda nasıl yorumlanacağını belirler
- Pozisyon özel anlamlar + genel kart anlamlarını birleştirir

Bağlı Dosyalar:
- position-meanings-index.ts (ana index dosyası)
- ProblemSolvingTarot.tsx (ana bileşen)

Üretime Hazır mı?:
- Evet, detaylı anlamlar mevcut
---

*/

import { TarotCard } from '@/types/tarot';

export interface Moneyposition2Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar';
}

// i18n destekli interface
export interface I18nMoneyposition2Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position2Meanings: Moneyposition2Meaning[] = [
  // --- Majör Arkana Kartları --- // 
    {
      id: "the_fool_ma_pos2",
      card: "The Fool",
      position: 2,
      upright: "Deli, risk alma cesaretiyle yeni finansal adımlar atma arzusunu gösterir. Maddi güvenliği, akışa güvenerek ve yeni fırsatlara açık kalarak ararsın.",
      reversed: "Ters Deli, maddi maceralarda dikkatsizlik kaygısı yaratır. Güvenlik arzusu, risk almaktan kaçınarak durağanlığa hapsolabilir.",
      keywords: ["risk", "özgürlük", "güvenlik", "başlangıç", "fırsat"],
      context: "Finansal güvenliği, cesur adımlar ve özgür seçimlerle arıyorsun.",
      group: "Majör Arkana"
    },
    {
      id: "the_magician_ma_pos2",
      card: "The Magician",
      position: 2,
      upright: "Büyücü, yeteneklerini ve kaynaklarını kullanarak finansal güvenlik arzusunu vurgular. Güç sende ve güvenliği aktif eylemle kurabilirsin.",
      reversed: "Ters Büyücü, manipülasyon ya da kaynakları yanlış kullanma korkusunu gösterir. Güvenlik arzusu, güvensizlik ve yanlış stratejilerle zayıflayabilir.",
      keywords: ["yaratma", "beceri", "kaynak", "güvenlik", "vizyon"],
      context: "Güvenliği becerilerini kullanarak ve kaynaklarını yönlendirerek kurabilirsin.",
      group: "Majör Arkana"
    },
    {
      id: "the_high_priestess_ma_pos2",
      card: "The High Priestess",
      position: 2,
      upright: "Başrahibe, finansal güvenlik arzusunun sezgi ve iç bilgelikten beslendiğini gösterir. İç rehberine güvenmek seni korur.",
      reversed: "Ters Başrahibe, belirsizlik ve gizlilik kaygısını işaret eder. Güvenlik arayışında açık bilgiye erişememek seni zorlayabilir.",
      keywords: ["sezgi", "bilgelik", "güvenlik", "giz", "denge"],
      context: "Güvenliği içsel rehberliğine ve bilgece seçimlere bağlarsın.",
      group: "Majör Arkana"
    },
    {
      id: "the_empress_ma_pos2",
      card: "The Empress",
      position: 2,
      upright: "İmparatoriçe, bolluk, üretkenlik ve bereketle güvenlik arzusunu besler. Maddi dünyada sağlam bir köklenme isteği öne çıkar.",
      reversed: "Ters İmparatoriçe, aşırı harcama veya bağımlılık kaygısını gösterir. Güvenlik arzusu, kontrolsüzlükle gölgelenebilir.",
      keywords: ["bolluk", "bereket", "güvenlik", "üretim", "köklenme"],
      context: "Güvenliği bereket yaratmak ve kök salmakla kurarsın.",
      group: "Majör Arkana"
    },

    {
      id: "the_emperor_ma_pos2",
      card: "The Emperor",
      position: 2,
      upright: "İmparator, düzen, yapı ve otorite ile güvenlik arzusunu simgeler. Net planlar ve sağlam stratejiler seni korur.",
      reversed: "Ters İmparator, otoriteye bağımlı kalma ya da aşırı kontrol kaygısını işaret eder. Güvenlik arzusu, katılıkla daralabilir.",
      keywords: ["düzen", "otorite", "plan", "güvenlik", "stabilite"],
      context: "Güvenliği düzenli yapı ve stratejik adımlarla arıyorsun.",
      group: "Majör Arkana"
    },
    {
      id: "the_hierophant_ma_pos2",
      card: "The Hierophant",
      position: 2,
      upright: "Aziz, geleneksel sistemlere ve destek yapısına güvenlik arzunu bağlar. Kurumsal düzenler içinde kendini daha güvende hissedersin.",
      reversed: "Ters Aziz, kurallara körü körüne bağlı kalma kaygısını işaret eder. Güvenlik arzusu, esnekliğini yitirebilir.",
      keywords: ["gelenek", "kurum", "güvenlik", "destek", "düzen"],
      context: "Güvenliği geleneksel yapılar ve destek mekanizmalarıyla kuruyorsun.",
      group: "Majör Arkana"
    },
    {
      id: "the_lovers_ma_pos2",
      card: "The Lovers",
      position: 2,
      upright: "Aşıklar, finansal güvenliği uyumlu ortaklık ve doğru seçimlerle aradığını gösterir. Birlikte karar almak güvenini artırır.",
      reversed: "Ters Aşıklar, yanlış seçim ya da uyumsuz ortaklık kaygısını işaret eder. Güvenlik arzusu, belirsiz seçimlerde zayıflar.",
      keywords: ["seçim", "ortaklık", "güvenlik", "uyum", "değerler"],
      context: "Güvenliği uyumlu seçimler ve ortaklıklarla bulursun.",
      group: "Majör Arkana"
    },
    {
      id: "the_chariot_ma_pos2",
      card: "The Chariot",
      position: 2,
      upright: "Savaş Arabası, güvenliği kararlı ilerleme ve hedeflere ulaşma yoluyla aradığını gösterir. Kontrol sende olduğunda güven hissedersin.",
      reversed: "Ters Savaş Arabası, savrulma ve yön kaybı kaygısını işaret eder. Güvenlik arzusu, kontrolü yitirme korkusuyla sarsılabilir.",
      keywords: ["kontrol", "yön", "güvenlik", "hedef", "irade"],
      context: "Güvenliği yönünü korumak ve kararlı ilerlemekle bulursun.",
      group: "Majör Arkana"
    },
    {
      id: "strength_ma_pos2",
      card: "Strength",
      position: 2,
      upright: "Güç, güvenliği sabır, özdenetim ve içsel kuvvetle aradığını gösterir. Nazik ama güçlü duruşun güven hissini pekiştirir.",
      reversed: "Ters Güç, içsel güvensizlik ve sabırsızlık kaygısını işaret eder. Güvenlik arzusu, kendine olan inanç azaldığında zayıflar.",
      keywords: ["güç", "sabır", "güvenlik", "özdenetim", "cesaret"],
      context: "Güvenliği içsel güç ve sabırla arıyorsun.",
      group: "Majör Arkana"
    },
    {
      id: "the_hermit_ma_pos2",
      card: "The Hermit",
      position: 2,
      upright: "Ermiş, güvenliği içsel bilgelik ve yalnız değerlendirmelerle aradığını gösterir. Kendi iç ışığına güvenmek seni korur.",
      reversed: "Ters Ermiş, aşırı yalnızlık ve izole kalma kaygısını işaret eder. Güvenlik arzusu, dış bağlantılardan uzaklaştığında azalır.",
      keywords: ["bilgelik", "içe dönüş", "güvenlik", "rehberlik", "alan"],
      context: "Güvenliği içsel bilgelikle ve sade seçimlerle bulursun.",
      group: "Majör Arkana"
    },
    {
      id: "wheel_of_fortune_ma_pos2",
      card: "Wheel of Fortune",
      position: 2,
      upright: "Kader Çarkı, güvenliği değişim döngülerini kabul ederek aradığını gösterir. Şans ve fırsatlarla desteklenirsin.",
      reversed: "Ters Çark, kontrol kaybı ve talihsizlik kaygısını işaret eder. Güvenlik arzusu, beklenmedik değişimlerle sarsılabilir.",
      keywords: ["döngü", "şans", "güvenlik", "fırsat", "zamanlama"],
      context: "Güvenliği değişim döngülerine uyum sağlayarak buluyorsun.",
      group: "Majör Arkana"
    },
    {
      id: "justice_ma_pos2",
      card: "Justice",
      position: 2,
      upright: "Adalet, güvenliği adil seçimler ve şeffaflıkla aradığını gösterir. Doğru kararlara güvenmek seni korur.",
      reversed: "Ters Adalet, adaletsizlik ve haksızlık kaygısını işaret eder. Güvenlik arzusu, çifte standartlarla zayıflayabilir.",
      keywords: ["adalet", "denge", "güvenlik", "sorumluluk", "netlik"],
      context: "Güvenliği adil seçimler ve şeffaflıkla kuruyorsun.",
      group: "Majör Arkana"
    },
    {
      id: "the_hanged_man_ma_pos2",
      card: "The Hanged Man",
      position: 2,
      upright: "Asılan Adam, güvenliği sabır ve farklı bakış açılarıyla aradığını gösterir. Beklemeyi kabul etmek huzur verir.",
      reversed: "Ters Asılan Adam, kurban olma ve durağanlık kaygısını işaret eder. Güvenlik arzusu, pasiflikte kaybolabilir.",
      keywords: ["perspektif", "sabır", "güvenlik", "bekleme", "teslimiyet"],
      context: "Güvenliği farklı bakış açıları ve sabırla bulursun.",
      group: "Majör Arkana"

    },
    {
      id: "death_ma_pos2",
      card: "Death",
      position: 2,
      upright: "Ölüm, güvenliği eskiyi bırakıp dönüşümle aradığını gösterir. Yenilenme senin için huzur getirir.",
      reversed: "Ters Ölüm, değişime direnç ve kayıp kaygısını işaret eder. Güvenlik arzusu, geçmişi bırakamamakla gölgelenir.",
      keywords: ["dönüşüm", "bırakma", "güvenlik", "yenilenme", "kapanış"],
      context: "Güvenliği dönüşüm ve yenilenmeyle kuruyorsun.",
      group: "Majör Arkana"
    },
    {
      id: "temperance_ma_pos2",
      card: "Temperance",
      position: 2,
      upright: "Denge, güvenliği ölçülülük ve uyumla aradığını gösterir. Orta yol sana huzur verir.",
      reversed: "Ters Denge, aşırılıklar ve uyumsuzluk kaygısını işaret eder. Güvenlik arzusu, uçlarda kaybolabilir.",
      keywords: ["denge", "uyum", "güvenlik", "sabır", "ölçü"],
      context: "Güvenliği ölçülülük ve uyumla bulursun.",
      group: "Majör Arkana"
    },
    {
      id: "the_devil_ma_pos2",
      card: "The Devil",
      position: 2,
      upright: "Şeytan, güvenliği kontrol ve bağımlılıklar üzerinden arama eğilimini gösterir. Maddi bağlar güvenlik isteğini baskılayabilir.",
      reversed: "Ters Şeytan, bağımlılık ve kayıplar kaygısını işaret eder. Güvenlik arzusu, özgürlüğünü kaybetme korkusuyla gölgelenebilir.",
      keywords: ["bağımlılık", "kontrol", "güvenlik", "gölge", "sınır"],
      context: "Güvenliği kontrol ve bağlarla arıyorsun, fakat özgürlük de önemli.",
      group: "Majör Arkana"
    },
    {
      id: "the_tower_ma_pos2",
      card: "The Tower",
      position: 2,
      upright: "Kule, güvenliği yıkım sonrası yeniden inşa ile aradığını gösterir. Gerçek yüzleşme kalıcı güvenlik sağlar.",
      reversed: "Ters Kule, çöküş ve kayıp kaygısını işaret eder. Güvenlik arzusu, krizlerden korkarak sarsılabilir.",
      keywords: ["yıkım", "yeniden inşa", "güvenlik", "hakikat", "temel"],
      context: "Güvenliği yıkımdan sonra sağlam temellerle kurabilirsin.",
      group: "Majör Arkana"
    },
    {
      id: "the_star_ma_pos2",
      card: "The Star",
      position: 2,
      upright: "Yıldız, güvenliği umut, ilham ve şeffaflıkla aradığını gösterir. İçsel huzur sana destek olur.",
      reversed: "Ters Yıldız, umutsuzluk ve tükenmişlik kaygısını işaret eder. Güvenlik arzusu, ışığını kaybettiğinde zayıflar.",
      keywords: ["umut", "ilham", "güvenlik", "şifa", "netlik"],
      context: "Güvenliği umut ve şeffaflıkla bulursun.",
      group: "Majör Arkana"
    },
    {
      id: "the_moon_ma_pos2",
      card: "The Moon",
      position: 2,
      upright: "Ay, güvenliği sezgiyle ama belirsizlik içinde aradığını gösterir. İç sesin rehber olabilir.",
      reversed: "Ters Ay, aldatılma ve yanılma kaygısını işaret eder. Güvenlik arzusu, sisin içinde kaybolabilir.",
      keywords: ["belirsizlik", "sezgi", "güvenlik", "korku", "aydınlanma"],
      context: "Güvenliği sezgine güvenerek bulabilirsin.",
      group: "Majör Arkana"
    },
    {
      id: "the_sun_ma_pos2",
      card: "The Sun",
      position: 2,
      upright: "Güneş, güvenliği açıklık, neşe ve başarıyla aradığını gösterir. Bolluk ve sevinç güven hissini pekiştirir.",
      reversed: "Ters Güneş, sahte sevinç ve belirsizlik kaygısını işaret eder. Güvenlik arzusu, gerçeklikten uzaklaşınca zayıflar.",
      keywords: ["sevinç", "başarı", "güvenlik", "açıklık", "bolluk"],
      context: "Güvenliği açıklık ve neşeyle kuruyorsun.",
      group: "Majör Arkana"
    },
    {
      id: "judgement_ma_pos2",
      card: "Judgement",
      position: 2,
      upright: "Mahkeme, güvenliği geçmişten ders alarak ve yeniden doğuşla aradığını gösterir. Hesaplaşma sonrası netlik güven sağlar.",
      reversed: "Ters Mahkeme, geçmiş hataların gölgesinde kalma kaygısını işaret eder. Güvenlik arzusu, affedememekle zayıflayabilir.",
      keywords: ["yeniden doğuş", "hesaplaşma", "güvenlik", "özgürleşme", "farkındalık"],
      context: "Güvenliği geçmişi şefkatle kapatarak bulabilirsin.",
      group: "Majör Arkana"
    },
    {
      id: "the_world_ma_pos2",
      card: "The World",
      position: 2,
      upright: "Dünya, güvenliği tamamlanma ve bütünlükle aradığını gösterir. Döngüyü tamamlamak huzur verir.",
      reversed: "Ters Dünya, yarım kalmışlık kaygısını işaret eder. Güvenlik arzusu, tamamlanmayan süreçlerle zayıflar.",
      keywords: ["tamamlanma", "bütünlük", "güvenlik", "başarı", "denge"],
      context: "Güvenliği döngüyü tamamlayarak ve bütünlükle bulursun.",
      group: "Majör Arkana"
    },
    {
      id: "ace_of_cups_cu_pos2",
      card: "Ace of Cups",
      position: 2,
      upright: "Kupa Ası, güvenliği kalpten gelen doyum ve duygusal tatminle aradığını gösterir. Bolluk hissini sevgiyle birleştiğinde bulursun.",
      reversed: "Ters Kupa Ası, duygusal boşluk ve tatminsizlik kaygısını açığa çıkarır. Güvenlik arzusu, içsel huzuru bulamayınca eksik kalır.",
      keywords: ["bolluk", "duygu", "tatmin", "güvenlik", "akış"],
      context: "Finansal güvenliği duygusal tatmin ve bolluk hissiyle bağlarsın.",
      group: "Kupalar"
    },
    {
      id: "two_of_cups_cu_pos2",
      card: "Two of Cups",
      position: 2,
      upright: "Kupa İkilisi, güvenliği uyumlu ortaklık ve paylaşılan değerlerle aradığını gösterir. Maddi destek, sevgiyle birleşir.",
      reversed: "Ters Kupa İkilisi, uyumsuzluk ve dengesiz bağ kaygısını işaret eder. Güvenlik arzusu, eşit olmayan ilişkilerde zayıflar.",
      keywords: ["ortaklık", "uyum", "değerler", "güvenlik", "paylaşım"],
      context: "Güvenliği ortaklık ve uyumlu ilişkiler içinde bulursun.",
      group: "Kupalar"
    },
    {
      id: "three_of_cups_cu_pos2",
      card: "Three of Cups",
      position: 2,
      upright: "Kupa Üçlüsü, güvenliği dostluk, topluluk ve destek ağında aradığını gösterir. Paylaşım güven hissini pekiştirir.",
      reversed: "Ters Kupa Üçlüsü, yüzeysellik ya da yalnız kalma kaygısını işaret eder. Güvenlik arzusu, sahte bağlarda kırılır.",
      keywords: ["destek", "topluluk", "paylaşım", "güvenlik", "neşe"],
      context: "Güvenliği güçlü bağlar ve topluluk desteğiyle bulursun.",
      group: "Kupalar"
    },
    {
      id: "four_of_cups_cu_pos2",
      card: "Four of Cups",
      position: 2,
      upright: "Kupa Dörtlüsü, güvenliği mevcut kaynakları fark ederek aradığını gösterir. Şükran, huzuru çağırır.",
      reversed: "Ters Kupa Dörtlüsü, fırsatları görmeme ve tatminsizlik kaygısını işaret eder. Güvenlik arzusu, dikkatsizlikle zayıflar.",
      keywords: ["tatmin", "şükran", "fırsat", "güvenlik", "uyanış"],
      context: "Güvenliği farkındalık ve şükranla kurarsın.",
      group: "Kupalar"
    },
    {
      id: "five_of_cups_cu_pos2",
      card: "Five of Cups",
      position: 2,
      upright: "Kupa Beşlisi, güvenliği kayıplardan öğrenerek ve elde kalanlara odaklanarak aradığını gösterir. Umutla güven yeniden doğar.",
      reversed: "Ters Kupa Beşlisi, geçmişe takılı kalma kaygısını işaret eder. Güvenlik arzusu, yasla boğulduğunda sarsılır.",
      keywords: ["kayıp", "umut", "şifa", "güvenlik", "dönüşüm"],
      context: "Güvenliği kayıpları kabullenip yeni umutlarla bulursun.",
      group: "Kupalar"
    },
    {
      id: "six_of_cups_cu_pos2",
      card: "Six of Cups",
      position: 2,
      upright: "Kupa Altılısı, güvenliği nostalji ve geçmişten gelen değerlerle aradığını gösterir. Tanıdıklık güven hissini pekiştirir.",
      reversed: "Ters Kupa Altılısı, geçmişe saplanıp kalma kaygısını işaret eder. Güvenlik arzusu, eski kalıplarla sınırlanabilir.",
      keywords: ["geçmiş", "nostalji", "değer", "güvenlik", "anı"],
      context: "Güvenliği tanıdık ve köklü değerlerle kurarsın.",
      group: "Kupalar"
    },
    {
      id: "seven_of_cups_cu_pos2",
      card: "Seven of Cups",
      position: 2,
      upright: "Kupa Yedilisi, güvenliği net seçimler yaparak aradığını gösterir. Belirsizlik dağıldığında huzur doğar.",
      reversed: "Ters Kupa Yedilisi, hayal ve aldanma kaygısını işaret eder. Güvenlik arzusu, gerçeklikten kopunca kaybolur.",
      keywords: ["seçim", "netlik", "güvenlik", "vizyon", "öncelik"],
      context: "Güvenliği gerçekçi seçimlerle bulursun.",
      group: "Kupalar"
    },
    {
      id: "eight_of_cups_cu_pos2",
      card: "Eight of Cups",
      position: 2,
      upright: "Kupa Sekizlisi, güvenliği anlamlı yolları seçerek aradığını gösterir. Eskiyi bırakmak huzuru getirir.",
      reversed: "Ters Kupa Sekizlisi, ayrılıktan korkma ve durağanlık kaygısını işaret eder. Güvenlik arzusu, ilerleyememekle gölgelenir.",
      keywords: ["bırakış", "anlam", "güvenlik", "yolculuk", "yenilenme"],
      context: "Güvenliği anlamlı seçimler ve yeni yollarla bulursun.",
      group: "Kupalar"
    },
    {
      id: "nine_of_cups_cu_pos2",
      card: "Nine of Cups",
      position: 2,
      upright: "Kupa Dokuzlusu, güvenliği tatmin ve kişisel başarıyla aradığını gösterir. Doyum, huzuru getirir.",
      reversed: "Ters Kupa Dokuzlusu, aşırı tatminsizlik ya da yüzeysel haz kaygısını işaret eder. Güvenlik arzusu, derin değerlerden uzaklaşınca kaybolur.",
      keywords: ["tatmin", "başarı", "güvenlik", "bolluk", "doyum"],
      context: "Güvenliği içsel tatmin ve başarıyla bulursun.",
      group: "Kupalar"
    },
    {
      id: "ten_of_cups_cu_pos2",
      card: "Ten of Cups",
      position: 2,
      upright: "Kupa Onlusu, güvenliği aile, uyum ve birlik içinde aradığını gösterir. Ortak mutluluk güven hissini güçlendirir.",
      reversed: "Ters Kupa Onlusu, uyumsuzluk ve aile içi çatışma kaygısını işaret eder. Güvenlik arzusu, idealden uzaklaşınca kırılganlaşır.",
      keywords: ["aile", "uyum", "birlik", "güvenlik", "mutluluk"],
      context: "Güvenliği aile bağları ve birlik duygusuyla bulursun.",
      group: "Kupalar"
    },
    {
      id: "page_of_cups_cu_pos2",
      card: "Page of Cups",
      position: 2,
      upright: "Kupa Prensi, güvenliği yaratıcı hayaller ve sezgiyle aradığını gösterir. Masumiyet huzur getirir.",
      reversed: "Ters Kupa Prensi, hayal kırıklığı ve duygusal hassasiyet kaygısını işaret eder. Güvenlik arzusu, aşırı kırılganlıkla zorlanır.",
      keywords: ["yaratıcılık", "sezgi", "güvenlik", "masumiyet", "ilham"],
      context: "Güvenliği yaratıcılık ve masum sezgilerle bulursun.",
      group: "Kupalar"
    },
    {
      id: "knight_of_cups_cu_pos2",
      card: "Knight of Cups",
      position: 2,
      upright: "Kupa Şövalyesi, güvenliği idealler ve kalpten gelen hareketlerle aradığını gösterir. Romantik vizyon huzur verir.",
      reversed: "Ters Kupa Şövalyesi, tutarsızlık ve aşırı hayalperestlik kaygısını işaret eder. Güvenlik arzusu, dengesiz vaatlerle kırılır.",
      keywords: ["idealizm", "hareket", "güvenlik", "vizyon", "duygu"],
      context: "Güvenliği kalpten gelen idealist adımlarla bulursun.",
      group: "Kupalar"
    },
    {
      id: "queen_of_cups_cu_pos2",
      card: "Queen of Cups",
      position: 2,
      upright: "Kupa Kraliçesi, güvenliği empati, sezgi ve şefkatle aradığını gösterir. Duygusal alan huzuru sağlar.",
      reversed: "Ters Kupa Kraliçesi, duygusal taşkınlık ve sınır kaybı kaygısını işaret eder. Güvenlik arzusu, içsel düzen kaybolduğunda zayıflar.",
      keywords: ["empati", "şefkat", "güvenlik", "sezgi", "denge"],
      context: "Güvenliği şefkat ve duygusal dengeyle bulursun.",
      group: "Kupalar"
    },
    {
      id: "king_of_cups_cu_pos2",
      card: "King of Cups",
      position: 2,
      upright: "Kupa Kralı, güvenliği duygusal olgunluk ve bilgece yaklaşımda aradığını gösterir. Sakinlik güven verir.",
      reversed: "Ters Kupa Kralı, duygusal bastırma veya pasif agresyon kaygısını işaret eder. Güvenlik arzusu, açık ifade olmadığında zayıflar.",
      keywords: ["olgunluk", "bilgelik", "güvenlik", "denge", "liderlik"],
      context: "Güvenliği olgun ve dengeli duygusal yaklaşımda bulursun.",
      group: "Kupalar"
    },
    {
      id: "ace_of_swords_sw_pos2",
      card: "Ace of Swords",
      position: 2,
      upright: "Kılıç Ası, güvenliği net kararlar ve berrak düşünceyle aradığını gösterir. Mantıklı çözümler huzur getirir.",
      reversed: "Ters Kılıç Ası, kafa karışıklığı ve yanlış karar kaygısını işaret eder. Güvenlik arzusu, bulanıklıkla gölgelenebilir.",
      keywords: ["netlik", "karar", "güvenlik", "hakikat", "zihin"],
      context: "Güvenliği net düşünce ve doğru kararlarla bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "two_of_swords_sw_pos2",
      card: "Two of Swords",
      position: 2,
      upright: "Kılıç İkilisi, güvenliği denge ve dikkatli seçimlerle aradığını gösterir. Karar almak huzur verir.",
      reversed: "Ters Kılıç İkilisi, kararsızlık ve kaçınma kaygısını işaret eder. Güvenlik arzusu, ertelenen seçimlerde zayıflar.",
      keywords: ["denge", "karar", "ikilem", "güvenlik", "seçim"],
      context: "Güvenliği dengeli seçimlerle bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "three_of_swords_sw_pos2",
      card: "Three of Swords",
      position: 2,
      upright: "Kılıç Üçlüsü, güvenliği kalp kırıklıklarını onararak aradığını gösterir. Zorluklardan öğrenmek güç verir.",
      reversed: "Ters Kılıç Üçlüsü, eski acıları bırakma kaygısını işaret eder. Güvenlik arzusu, yaralara tutunmakla gölgelenir.",
      keywords: ["acı", "kırılma", "güvenlik", "şifa", "hakikat"],
      context: "Güvenliği geçmiş acıları iyileştirerek kurarsın.",
      group: "Kılıçlar"
    },
    {
      id: "four_of_swords_sw_pos2",
      card: "Four of Swords",
      position: 2,
      upright: "Kılıç Dörtlüsü, güvenliği dinlenme ve toparlanma yoluyla aradığını gösterir. Sessizlik huzur getirir.",
      reversed: "Ters Kılıç Dörtlüsü, huzur bulamama ve tükenmişlik kaygısını işaret eder. Güvenlik arzusu, molasızlıktan zarar görebilir.",
      keywords: ["dinlenme", "toparlanma", "güvenlik", "sessizlik", "yenilenme"],
      context: "Güvenliği dinlenme ve yenilenmeyle bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "five_of_swords_sw_pos2",
      card: "Five of Swords",
      position: 2,
      upright: "Kılıç Beşlisi, güvenliği çatışmalardan uzak durarak aradığını gösterir. Haklılık yerine huzur güven verir.",
      reversed: "Ters Kılıç Beşlisi, kaybetme korkusu ve onarılamayan anlaşmazlık kaygısını işaret eder. Güvenlik arzusu, ego savaşlarında kaybolur.",
      keywords: ["çatışma", "ego", "güvenlik", "uzlaşma", "hakikat"],
      context: "Güvenliği çatışmadan çekilerek ve uzlaşmayla bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "six_of_swords_sw_pos2",
      card: "Six of Swords",
      position: 2,
      upright: "Kılıç Altılısı, güvenliği zor durumlardan uzaklaşarak aradığını gösterir. Geçiş ve iyileşme huzur getirir.",
      reversed: "Ters Kılıç Altılısı, geçmişten kopamama kaygısını işaret eder. Güvenlik arzusu, eski yüklerle zayıflar.",
      keywords: ["geçiş", "iyileşme", "güvenlik", "yolculuk", "sükunet"],
      context: "Güvenliği geçmişi bırakıp yeniye geçerek bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "seven_of_swords_sw_pos2",
      card: "Seven of Swords",
      position: 2,
      upright: "Kılıç Yedilisi, güvenliği strateji ve dikkatle aradığını gösterir. Akıllı plan huzur sağlar.",
      reversed: "Ters Kılıç Yedilisi, ihanet ya da aldatılma kaygısını işaret eder. Güvenlik arzusu, dürüstlük eksikliğiyle zayıflar.",
      keywords: ["strateji", "plan", "güvenlik", "dürüstlük", "zihin"],
      context: "Güvenliği akıllıca planlama ve dürüstlükle bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "eight_of_swords_sw_pos2",
      card: "Eight of Swords",
      position: 2,
      upright: "Kılıç Sekizlisi, güvenliği zihinsel sınırları aşarak aradığını gösterir. İnançları kırmak huzur verir.",
      reversed: "Ters Kılıç Sekizlisi, özgürlüğünü elde edememe kaygısını işaret eder. Güvenlik arzusu, kısıtlı inançlarla daralır.",
      keywords: ["özgürlük", "sınır", "güvenlik", "korku", "inanç"],
      context: "Güvenliği zihinsel zincirleri kırarak bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "nine_of_swords_sw_pos2",
      card: "Nine of Swords",
      position: 2,
      upright: "Kılıç Dokuzlusu, güvenliği kaygıları yatıştırarak aradığını gösterir. Gerçeklerle yüzleşmek huzur verir.",
      reversed: "Ters Kılıç Dokuzlusu, kabus ve aşırı korku kaygısını işaret eder. Güvenlik arzusu, zihinsel huzursuzlukla kırılır.",
      keywords: ["kaygı", "korku", "güvenlik", "gerçek", "zihin"],
      context: "Güvenliği kaygıları dengeleyerek bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "ten_of_swords_sw_pos2",
      card: "Ten of Swords",
      position: 2,
      upright: "Kılıç Onlusu, güvenliği sonları kabullenerek aradığını gösterir. Bitişler huzuru çağırır.",
      reversed: "Ters Kılıç Onlusu, toparlanma sürecinde yeniden kaybetme kaygısını işaret eder. Güvenlik arzusu, kapanıştan korkunca sarsılır.",
      keywords: ["bitiş", "yeniden doğuş", "güvenlik", "kabullenme", "dönüşüm"],
      context: "Güvenliği sonları kabullenip yeniden doğarak bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "page_of_swords_sw_pos2",
      card: "Page of Swords",
      position: 2,
      upright: "Kılıç Prensi, güvenliği merak ve bilgiyle aradığını gösterir. Öğrenme huzur getirir.",
      reversed: "Ters Kılıç Prensi, yanlış bilgi ya da dedikodu kaygısını işaret eder. Güvenlik arzusu, doğruluk kaybolduğunda zayıflar.",
      keywords: ["merak", "öğrenme", "güvenlik", "bilgi", "iletişim"],
      context: "Güvenliği öğrenmek ve doğrulukla bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "knight_of_swords_sw_pos2",
      card: "Knight of Swords",
      position: 2,
      upright: "Kılıç Şövalyesi, güvenliği hızlı karar ve cesaretle aradığını gösterir. Kararlılık huzur verir.",
      reversed: "Ters Kılıç Şövalyesi, acelecilik ve sertlik kaygısını işaret eder. Güvenlik arzusu, düşünmeden hareketle zayıflar.",
      keywords: ["cesaret", "hız", "güvenlik", "karar", "zihin"],
      context: "Güvenliği hızlı ama bilinçli adımlarla bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "queen_of_swords_sw_pos2",
      card: "Queen of Swords",
      position: 2,
      upright: "Kılıç Kraliçesi, güvenliği netlik, dürüstlük ve keskin bakış açısıyla aradığını gösterir. Gerçekler huzur verir.",
      reversed: "Ters Kılıç Kraliçesi, soğukluk ve aşırı eleştiri kaygısını işaret eder. Güvenlik arzusu, şefkat eksikliğinde kırılır.",
      keywords: ["netlik", "dürüstlük", "güvenlik", "gerçek", "iletişim"],
      context: "Güvenliği dürüstlük ve netlikte bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "king_of_swords_sw_pos2",
      card: "King of Swords",
      position: 2,
      upright: "Kılıç Kralı, güvenliği stratejik düşünce ve bilgelikle aradığını gösterir. Mantıklı liderlik güven verir.",
      reversed: "Ters Kılıç Kralı, otoriterlik ve sertlik kaygısını işaret eder. Güvenlik arzusu, empati eksikliğinde zayıflar.",
      keywords: ["strateji", "bilgelik", "güvenlik", "mantık", "otorite"],
      context: "Güvenliği bilgece strateji ve mantıkla bulursun.",
      group: "Kılıçlar"
    },
    {
      id: "ace_of_pentacles_pe_pos2",
      card: "Ace of Pentacles",
      position: 2,
      upright: "Tılsım Ası, güvenliği yeni fırsatlar ve sağlam başlangıçlarla aradığını gösterir. Maddi istikrar umut verici olabilir.",
      reversed: "Ters Tılsım Ası, kaçırılan fırsatlar veya güvensizlik kaygısını işaret eder. Güvenlik arzusu, temelsizlikle sarsılır.",
      keywords: ["fırsat", "başlangıç", "güvenlik", "maddi temel", "istikrar"],
      context: "Güvenliği yeni ve sağlam maddi adımlarla bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "two_of_pentacles_pe_pos2",
      card: "Two of Pentacles",
      position: 2,
      upright: "Tılsım İkilisi, güvenliği denge ve esneklikle aradığını gösterir. İyi bir dengeleme huzur sağlar.",
      reversed: "Ters Tılsım İkilisi, dağınıklık ve dengesizlik kaygısını işaret eder. Güvenlik arzusu, öncelik eksikliğiyle zayıflar.",
      keywords: ["denge", "esneklik", "güvenlik", "öncelik", "zaman"],
      context: "Güvenliği dengeli yönetim ve esneklikle bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "three_of_pentacles_pe_pos2",
      card: "Three of Pentacles",
      position: 2,
      upright: "Tılsım Üçlüsü, güvenliği işbirliği ve becerilerin paylaşımıyla aradığını gösterir. Takım çalışması huzur verir.",
      reversed: "Ters Tılsım Üçlüsü, işbirliği eksikliği kaygısını işaret eder. Güvenlik arzusu, dağınık çabayla zayıflar.",
      keywords: ["işbirliği", "beceri", "güvenlik", "uyum", "çalışma"],
      context: "Güvenliği ortak çalışmayla bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "four_of_pentacles_pe_pos2",
      card: "Four of Pentacles",
      position: 2,
      upright: "Tılsım Dörtlüsü, güvenliği sahip olduklarını koruyarak aradığını gösterir. İstikrar huzur verir.",
      reversed: "Ters Tılsım Dörtlüsü, aşırı tutma ya da kaybetme kaygısını işaret eder. Güvenlik arzusu, esneklikten uzaklaşır.",
      keywords: ["koruma", "istikrar", "güvenlik", "kontrol", "maddi"],
      context: "Güvenliği koruma ve istikrarla bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "five_of_pentacles_pe_pos2",
      card: "Five of Pentacles",
      position: 2,
      upright: "Tılsım Beşlisi, güvenliği yoksunlukla yüzleşip destek arayarak bulmaya çalıştığını gösterir. Yardım kapıları güven verir.",
      reversed: "Ters Tılsım Beşlisi, toparlanma sürecinde yeniden kaybetme kaygısını işaret eder. Güvenlik arzusu, yalnızlıkla sarsılır.",
      keywords: ["yoksunluk", "destek", "güvenlik", "yardım", "toparlanma"],
      context: "Güvenliği destek arayarak bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "six_of_pentacles_pe_pos2",
      card: "Six of Pentacles",
      position: 2,
      upright: "Tılsım Altılısı, güvenliği adil paylaşım ve dengeyle aradığını gösterir. Verme-alma huzur getirir.",
      reversed: "Ters Tılsım Altılısı, dengesiz alışveriş kaygısını işaret eder. Güvenlik arzusu, adalet eksikliğiyle zayıflar.",
      keywords: ["paylaşım", "denge", "güvenlik", "adalet", "yardım"],
      context: "Güvenliği adil paylaşımda bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "seven_of_pentacles_pe_pos2",
      card: "Seven of Pentacles",
      position: 2,
      upright: "Tılsım Yedilisi, güvenliği sabır ve uzun vadeli planla aradığını gösterir. Beklemek huzur getirir.",
      reversed: "Ters Tılsım Yedilisi, sabırsızlık ve zaman kaybı kaygısını işaret eder. Güvenlik arzusu, acelecilikle sarsılır.",
      keywords: ["sabır", "plan", "güvenlik", "bekleme", "yatırım"],
      context: "Güvenliği sabır ve uzun vadeli planla bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "eight_of_pentacles_pe_pos2",
      card: "Eight of Pentacles",
      position: 2,
      upright: "Tılsım Sekizlisi, güvenliği çalışmak ve beceri geliştirmekle aradığını gösterir. Emek huzur sağlar.",
      reversed: "Ters Tılsım Sekizlisi, özensizlik ve isteksizlik kaygısını işaret eder. Güvenlik arzusu, disiplinsizlikle zayıflar.",
      keywords: ["çalışma", "beceri", "güvenlik", "öğrenme", "emek"],
      context: "Güvenliği çalışkanlık ve emekle bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "nine_of_pentacles_pe_pos2",
      card: "Nine of Pentacles",
      position: 2,
      upright: "Tılsım Dokuzlusu, güvenliği bağımsızlık ve kendi emeğinle aradığını gösterir. Özgüven huzur verir.",
      reversed: "Ters Tılsım Dokuzlusu, bağımlılık ve savurganlık kaygısını işaret eder. Güvenlik arzusu, öz-değer eksikliğinde sarsılır.",
      keywords: ["bağımsızlık", "özgüven", "güvenlik", "konfor", "refah"],
      context: "Güvenliği bağımsız emek ve öz-değerle bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "ten_of_pentacles_pe_pos2",
      card: "Ten of Pentacles",
      position: 2,
      upright: "Tılsım Onlusu, güvenliği aile, miras ve uzun vadeli yapı ile aradığını gösterir. Kalıcı temel huzur getirir.",
      reversed: "Ters Tılsım Onlusu, ailevi ya da maddi belirsizlik kaygısını işaret eder. Güvenlik arzusu, kalıcılık eksikliğinde zayıflar.",
      keywords: ["aile", "kalıcılık", "güvenlik", "miras", "istikrar"],
      context: "Güvenliği uzun vadeli ailevi temel ve istikrarla bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "page_of_pentacles_pe_pos2",
      card: "Page of Pentacles",
      position: 2,
      upright: "Tılsım Prensi, güvenliği öğrenme ve yeni fırsatlarla aradığını gösterir. Araştırma huzur verir.",
      reversed: "Ters Tılsım Prensi, dağınıklık ve motivasyon eksikliği kaygısını işaret eder. Güvenlik arzusu, hedef kaybıyla zayıflar.",
      keywords: ["öğrenme", "başlangıç", "güvenlik", "hedef", "pratik"],
      context: "Güvenliği öğrenme ve yeni fırsatlarla bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "knight_of_pentacles_pe_pos2",
      card: "Knight of Pentacles",
      position: 2,
      upright: "Tılsım Şövalyesi, güvenliği istikrarlı çalışma ve sabırla aradığını gösterir. Yavaş ama emin adım huzur getirir.",
      reversed: "Ters Tılsım Şövalyesi, durağanlık ve isteksizlik kaygısını işaret eder. Güvenlik arzusu, hareket eksikliğiyle zayıflar.",
      keywords: ["istikrar", "sabır", "güvenlik", "çalışma", "emek"],
      context: "Güvenliği sabır ve istikrarla bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "queen_of_pentacles_pe_pos2",
      card: "Queen of Pentacles",
      position: 2,
      upright: "Tılsım Kraliçesi, güvenliği şefkat, pratiklik ve kaynak yönetimiyle aradığını gösterir. Rahatlık huzur getirir.",
      reversed: "Ters Tılsım Kraliçesi, aşırı yüklenme ya da ihmal kaygısını işaret eder. Güvenlik arzusu, denge kaybıyla zayıflar.",
      keywords: ["pratiklik", "kaynak", "güvenlik", "şefkat", "denge"],
      context: "Güvenliği kaynakları dengeli yöneterek bulursun.",
      group: "Tılsımlar"
    },
    {
      id: "king_of_pentacles_pe_pos2",
      card: "King of Pentacles",
      position: 2,
      upright: "Tılsım Kralı, güvenliği güçlü liderlik ve sağlam sistemle aradığını gösterir. Maddi güvence huzur getirir.",
      reversed: "Ters Tılsım Kralı, aşırı kontrol ya da maddi bağımlılık kaygısını işaret eder. Güvenlik arzusu, esnekliğin kaybıyla zayıflar.",
      keywords: ["liderlik", "sağlamlık", "güvenlik", "sistem", "istikrar"],
      context: "Güvenliği sağlam liderlik ve sistemle bulursun.",
      group: "Tılsımlar"
    },

  // --- Asalar Serisi ---
    {
      id: "ace_of_wands_wa_pos2",
      card: "Ace of Wands",
      position: 2,
      upright: "Değnek Ası, güvenliği yeni girişimler ve yaratıcı başlangıçlarla aradığını gösterir. Cesaret, sana yeni kapılar açar.",
      reversed: "Ters Değnek Ası, motivasyon eksikliği veya fırsatların ertelenmesini işaret eder. Güvenlik arzusu, kararsızlıkla zayıflar.",
      keywords: ["başlangıç", "yaratıcılık", "cesaret", "güvenlik", "fırsat"],
      context: "Güvenliği yeni girişim ve ilhamla bulursun.",
      group: "Asalar"
    },
    {
      id: "two_of_wands_wa_pos2",
      card: "Two of Wands",
      position: 2,
      upright: "Değnek İkilisi, güvenliği planlama ve vizyonla aradığını gösterir. Ufkunu genişletmek sana huzur verir.",
      reversed: "Ters Değnek İkilisi, tereddüt ve küçük düşünme kaygısını işaret eder. Güvenlik arzusu, riskten kaçışla sarsılır.",
      keywords: ["vizyon", "plan", "güvenlik", "genişleme", "karar"],
      context: "Güvenliği planlı genişleme ve vizyonla bulursun.",
      group: "Asalar"
    },
    {
      id: "three_of_wands_wa_pos2",
      card: "Three of Wands",
      position: 2,
      upright: "Değnek Üçlüsü, güvenliği ufku genişletmek ve işbirliğiyle aradığını gösterir. Yeni fırsatlar seni büyütür.",
      reversed: "Ters Değnek Üçlüsü, dar görüşlülük ve erteleme kaygısını işaret eder. Güvenlik arzusu, sabırsızlıkla zayıflar.",
      keywords: ["genişleme", "işbirliği", "güvenlik", "ufuk", "fırsat"],
      context: "Güvenliği ufuk açan işbirlikleriyle bulursun.",
      group: "Asalar"
    },
    {
      id: "four_of_wands_wa_pos2",
      card: "Four of Wands",
      position: 2,
      upright: "Değnek Dörtlüsü, güvenliği kutlama, birlik ve istikrarda aradığını gösterir. Sağlam temel huzur getirir.",
      reversed: "Ters Değnek Dörtlüsü, düzensizlik veya aidiyet kaygısını işaret eder. Güvenlik arzusu, geçici boşlukla sarsılır.",
      keywords: ["istikrar", "birlik", "güvenlik", "kutlama", "temel"],
      context: "Güvenliği birlik ve kutlama anlarında bulursun.",
      group: "Asalar"
    },
    {
      id: "five_of_wands_wa_pos2",
      card: "Five of Wands",
      position: 2,
      upright: "Değnek Beşlisi, güvenliği mücadele ve rekabetle aradığını gösterir. Çaban sana güç verir.",
      reversed: "Ters Değnek Beşlisi, gizli çatışmalar veya motivasyon kaygısını işaret eder. Güvenlik arzusu, gerginlikle zayıflar.",
      keywords: ["mücadele", "rekabet", "güvenlik", "çaba", "motivasyon"],
      context: "Güvenliği mücadele gücüyle bulursun.",
      group: "Asalar"
    },
    {
      id: "six_of_wands_wa_pos2",
      card: "Six of Wands",
      position: 2,
      upright: "Değnek Altılısı, güvenliği başarı ve takdirle aradığını gösterir. Görünürlük sana huzur getirir.",
      reversed: "Ters Değnek Altılısı, takdir eksikliği kaygısını işaret eder. Güvenlik arzusu, değersizlikle zayıflar.",
      keywords: ["başarı", "takdir", "güvenlik", "zafer", "motivasyon"],
      context: "Güvenliği başarı ve tanınmayla bulursun.",
      group: "Asalar"
    },
    {
      id: "seven_of_wands_wa_pos2",
      card: "Seven of Wands",
      position: 2,
      upright: "Değnek Yedilisi, güvenliği sınırlarını koruyarak aradığını gösterir. Kararlılık sana huzur verir.",
      reversed: "Ters Değnek Yedilisi, yorgunluk ve direnç kaygısını işaret eder. Güvenlik arzusu, savunma eksikliğiyle zayıflar.",
      keywords: ["savunma", "kararlılık", "güvenlik", "sınır", "direnç"],
      context: "Güvenliği kararlı savunmayla bulursun.",
      group: "Asalar"
    },
    {
      id: "eight_of_wands_wa_pos2",
      card: "Eight of Wands",
      position: 2,
      upright: "Değnek Sekizlisi, güvenliği hız ve akışla aradığını gösterir. Zamanında gelen fırsatlar sana huzur verir.",
      reversed: "Ters Değnek Sekizlisi, gecikme veya kaos kaygısını işaret eder. Güvenlik arzusu, karışıklıkla sarsılır.",
      keywords: ["hız", "akış", "güvenlik", "ivme", "fırsat"],
      context: "Güvenliği hızlı ve uyumlu akışta bulursun.",
      group: "Asalar"
    },
    {
      id: "nine_of_wands_wa_pos2",
      card: "Nine of Wands",
      position: 2,
      upright: "Değnek Dokuzlusu, güvenliği direnç ve sabırla aradığını gösterir. Güçlü kalmak sana huzur verir.",
      reversed: "Ters Değnek Dokuzlusu, tükenmişlik ve aşırı tetikte olma kaygısını işaret eder. Güvenlik arzusu, yorgunlukla zayıflar.",
      keywords: ["direnç", "sabır", "güvenlik", "koruma", "dayanıklılık"],
      context: "Güvenliği sabır ve direnişle bulursun.",
      group: "Asalar"
    },
    {
      id: "ten_of_wands_wa_pos2",
      card: "Ten of Wands",
      position: 2,
      upright: "Değnek Onlusu, güvenliği sorumluluk alarak aradığını gösterir. Yükleri taşımak huzur sağlar.",
      reversed: "Ters Değnek Onlusu, aşırı yüklenme kaygısını işaret eder. Güvenlik arzusu, paylaşım eksikliğiyle zayıflar.",
      keywords: ["sorumluluk", "yük", "güvenlik", "çaba", "istikrar"],
      context: "Güvenliği sorumluluk bilinciyle bulursun.",
      group: "Asalar"
    },
    {
      id: "page_of_wands_wa_pos2",
      card: "Page of Wands",
      position: 2,
      upright: "Değnek Prensi, güvenliği keşif ve öğrenmeyle aradığını gösterir. Yeni deneyimler sana huzur verir.",
      reversed: "Ters Değnek Prensi, dağınık ilgi ya da kararsızlık kaygısını işaret eder. Güvenlik arzusu, yönsüzlükle zayıflar.",
      keywords: ["keşif", "öğrenme", "güvenlik", "deneyim", "ilham"],
      context: "Güvenliği keşif ve yeni deneyimlerle bulursun.",
      group: "Asalar"
    },
    {
      id: "knight_of_wands_wa_pos2",
      card: "Knight of Wands",
      position: 2,
      upright: "Değnek Şövalyesi, güvenliği cesur adımlar ve tutkuyla aradığını gösterir. Atılganlık sana huzur getirir.",
      reversed: "Ters Değnek Şövalyesi, savrukluk ve yarıda bırakma kaygısını işaret eder. Güvenlik arzusu, kararsızlıkla sarsılır.",
      keywords: ["cesaret", "tutku", "güvenlik", "hareket", "macera"],
      context: "Güvenliği cesur adımlar ve tutkuyla bulursun.",
      group: "Asalar"
    },
    {
      id: "queen_of_wands_wa_pos2",
      card: "Queen of Wands",
      position: 2,
      upright: "Değnek Kraliçesi, güvenliği özgüven ve sıcak liderlikle aradığını gösterir. Karizma sana huzur verir.",
      reversed: "Ters Değnek Kraliçesi, kıskançlık veya güvensizlik kaygısını işaret eder. Güvenlik arzusu, öz-değer eksikliğiyle zayıflar.",
      keywords: ["özgüven", "liderlik", "güvenlik", "karizma", "enerji"],
      context: "Güvenliği özgüvenli liderlik ve sıcaklıkla bulursun.",
      group: "Asalar"
    },
    {
      id: "king_of_wands_wa_pos2",
      card: "King of Wands",
      position: 2,
      upright: "Değnek Kralı, güvenliği vizyoner liderlik ve stratejiyle aradığını gösterir. Cesur bakış huzur verir.",
      reversed: "Ters Değnek Kralı, otoriterlik ya da ego kaygısını işaret eder. Güvenlik arzusu, uyum eksikliğinde zayıflar.",
      keywords: ["vizyon", "liderlik", "güvenlik", "strateji", "cesaret"],
      context: "Güvenliği vizyon ve stratejik bakışla bulursun.",
      group: "Asalar"
    },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
  export function getMoneyposition2Meaning(
  card: TarotCard
): Moneyposition2Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position2Meanings.find(m => 
    m.card === card.name || 
    m.card === card.nameTr ||
    card.name === m.card ||
    card.nameTr === m.card
  );
  
  if (meaning) {
    return meaning;
  }
  
  // Kart ismi mapping'i kullanarak eşleştirme yap
  const cardNameMapping: { [key: string]: string } = {
    // Major Arcana - Türkçe
    'Deli': 'The Fool',
    'Büyücü': 'The Magician',
    'Yüksek Rahibe': 'The High Priestess',
    'İmparatoriçe': 'The Empress',
    'İmparator': 'The Emperor',
    'Hierophant': 'The Hierophant',
    'Aziz': 'The Hierophant',
    'Aşıklar': 'The Lovers',
    'Savaş Arabası': 'The Chariot',
    'Güç': 'Strength',
    'Ermiş': 'The Hermit',
    'Münzevi': 'The Hermit',
    'Kader Çarkı': 'The Wheel of Fortune',
    'Adalet': 'Justice',
    'Asılı Adam': 'The Hanged Man',
    'Ölüm': 'Death',
    'Ölçü': 'Temperance',
    'Ölçülülük': 'Temperance',
    'Şeytan': 'The Devil',
    'Kule': 'The Tower',
    'Yıldız': 'The Star',
    'Ay': 'The Moon',
    'Güneş': 'The Sun',
    'Yargı': 'Judgement',
    'Mahkeme': 'Judgement',
    'Dünya': 'The World',
  };
  
  // Türkçe ismi İngilizce'ye çevir
  const englishName = cardNameMapping[card.nameTr] || card.nameTr;
  
  // İngilizce isimle tekrar ara
  meaning = position2Meanings.find(m => m.card === englishName);
  
  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyposition2MeaningByCardName(
  cardName: string
): Moneyposition2Meaning | null {
  return position2Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllMoneyposition2Meanings(): Moneyposition2Meaning[] {
  return position2Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getMoneyposition2MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): Moneyposition2Meaning[] {
  return position2Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition2Meanings = (): I18nMoneyposition2Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position2Meanings.map(meaning => {
    // i18n'den çevirileri al
    const i18nUpright = getCardMeaning(meaning.card, 1, 'upright');
    const i18nReversed = getCardMeaning(meaning.card, 1, 'reversed');
    const i18nKeywords = getCardKeywords(meaning.card, 1);
    const i18nContext = getCardContext(meaning.card, 1);
    const i18nGroup = getCardGroup(meaning.group);

    return {
      id: meaning.id,
      card: meaning.card,
      position: meaning.position,
      upright: i18nUpright || meaning.upright, // Fallback olarak orijinal metni kullan
      reversed: i18nReversed || meaning.reversed,
      keywords: i18nKeywords.length > 0 ? i18nKeywords : meaning.keywords,
      context: i18nContext || meaning.context,
      group: i18nGroup || meaning.group,
    };
  });
};
*/

// Belirli bir kart için i18n destekli anlam al (hook kullanmadan)
export const getI18nposition2Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nMoneyposition2Meaning | null => {
  const originalMeaning = position2Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `money.meanings.${cardKey}.position2.upright`
  );
  const i18nReversed = t(
    `money.meanings.${cardKey}.position2.reversed`
  );
  const i18nKeywords = t(
    `money.meanings.${cardKey}.position2.keywords`
  );
  const i18nContext = t(
    `money.meanings.${cardKey}.position2.context`
  );
  const i18nGroup = t(
    `money.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
  );

  return {
    id: originalMeaning.id,
    card: originalMeaning.card,
    position: originalMeaning.position,
    upright: i18nUpright || originalMeaning.upright,
    reversed: i18nReversed || originalMeaning.reversed,
    keywords: i18nKeywords
      ? JSON.parse(i18nKeywords)
      : originalMeaning.keywords,
    context: i18nContext || originalMeaning.context,
    group: i18nGroup || originalMeaning.group,
  };
};

// Varsayılan export
const moneyposition2Exports = {
  position2Meanings,
  getMoneyposition2Meaning,
  getMoneyposition2MeaningByCardName,
  getAllMoneyposition2Meanings,
  getMoneyposition2MeaningsByGroup,
  getI18nposition2Meaning,
};

export default moneyposition2Exports;
