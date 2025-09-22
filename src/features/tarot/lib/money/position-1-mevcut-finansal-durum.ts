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

export interface MoneyPosition1Meaning {
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
export interface I18nMoneyPosition1Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position1Meanings: MoneyPosition1Meaning[] = [
  // --- Majör Arkana Kartları ---
    {
      id: "the_fool_ma_pos1",
      card: "The Fool",
      position: 1,
      upright: "Deli, finansal kaygılarının bilinmezlikten doğduğunu gösterir. Gelecek belirsiz göründüğünde risk almak zorlaşır ve özgürce hareket etmekten çekinebilirsin.",
      reversed: "Ters Deli, dikkatsizlik ve plansızlık kaygının kaynağıdır. Gereksiz harcamalar ya da ölçüsüz riskler seni güvensiz hissettirebilir.",
      keywords: ["belirsizlik", "risk", "özgürlük", "kaygı", "kontrol"],
      context: "Kaygıların bilinmezlikten ve kontrolsüzlükten besleniyor. Planlı adımlar güven hissini artırır.",
      group: "Majör Arkana"
    },
    {
      id: "the_magician_ma_pos1",
      card: "The Magician",
      position: 1,
      upright: "Büyücü, kaynaklarını yanlış kullanma ve fırsatları kaçırma korkusunu işaret eder. Maddi potansiyelini tam değerlendiremediğini düşündüğünde kaygı yükselir.",
      reversed: "Ters Büyücü, kandırılma ve yanıltılma endişesini açığa çıkarır. Maddi alanda manipülasyon korkusu güvenini zedeler.",
      keywords: ["kaynak", "fırsat", "güvensizlik", "korku", "manipülasyon"],
      context: "Kaygı, fırsatların boşa gitmesinden veya aldatılmaktan doğuyor. Şeffaflık ve netlik seni korur.",
      group: "Majör Arkana"
    },
    {
      id: "the_high_priestess_ma_pos1",
      card: "The High Priestess",
      position: 1,
      upright: "Başrahibe, maddi belirsizliklerin ve gizli bilgilerin kaygı yarattığını gösterir. İçsel sezgine güvenmediğinde karar almak zorlaşır.",
      reversed: "Ters Başrahibe, kendi iç sesini bastırmanın finansal endişe yarattığını anlatır. Dış seslere kulak vermek, içsel gücünü gölgeleyebilir.",
      keywords: ["bilinmezlik", "sezgi", "gizlilik", "kaygı", "güvensizlik"],
      context: "Kaygı, iç sesini bastırmandan ve şeffaflık eksikliğinden doğuyor. Sezgine güvenmek huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "the_empress_ma_pos1",
      card: "The Empress",
      position: 1,
      upright: "İmparatoriçe, bolluğu kaybetme ve yetersizlik korkusunu işaret eder. Maddi güvenliğin zedelenmesi kaygılarını artırabilir.",
      reversed: "Ters İmparatoriçe, bağımlılık ve üretkenlik kaygısını açığa çıkarır. Kendine yetememe ya da bolluğu sürdürememe endişesi öne çıkar.",
      keywords: ["bolluk", "yetersizlik", "bağımlılık", "kaygı", "güvenlik"],
      context: "Kaygı, bolluğu kaybetme ya da bağımlı kalma korkusundan doğuyor. Öz değerini hatırlamak güven verir.",
      group: "Majör Arkana"
    },
    {
      id: "the_emperor_ma_pos1",
      card: "The Emperor",
      position: 1,
      upright: "İmparator, kontrol kaybı ve düzen eksikliği kaygısını gösterir. Maddi güvenliği sağlayacak yapı olmayınca huzursuzluk doğar.",
      reversed: "Ters İmparator, otorite eksikliği veya aşırı baskının yarattığı kaygıyı işaret eder. Finansal sorumluluklar seni bunaltıyor olabilir.",
      keywords: ["kontrol", "düzen", "güvenlik", "sorumluluk", "otorite"],
      context: "Kaygı, kontrol ve düzen eksikliğinden doğuyor. Sağlam planlama huzur verir.",
      group: "Majör Arkana"
    },
    {
      id: "the_hierophant_ma_pos1",
      card: "The Hierophant",
      position: 1,
      upright: "Aziz, para konusunda geleneklere ve toplumsal beklentilere uyamama kaygısını açığa çıkarır. Maddi güvenliği toplum onayıyla bağdaştırabilirsin.",
      reversed: "Ters Aziz, kuralları reddetmenin ya da alışılmış yollardan sapmanın kaygısını anlatır. Maddi düzenin dışında kalmak huzursuzluk verebilir.",
      keywords: ["gelenek", "beklenti", "uyum", "kaygı", "toplum"],
      context: "Kaygı, toplumsal beklentilerle uyumsuzluktan doğuyor. Kendi değerlerine göre hareket etmek güven getirir.",
      group: "Majör Arkana"
    },
    {
      id: "the_lovers_ma_pos1",
      card: "The Lovers",
      position: 1,
      upright: "Aşıklar, maddi alanda yanlış seçim yapma kaygısını işaret eder. Finansal kararların ilişkilerini etkileme ihtimali endişe yaratır.",
      reversed: "Ters Aşıklar, çıkar çatışması ve uyumsuzluk kaygısını gösterir. Parayla ilgili anlaşmazlıklar güvenini zayıflatabilir.",
      keywords: ["seçim", "uyum", "çatışma", "kaygı", "karar"],
      context: "Kaygı, yanlış seçim yapmaktan veya uyumsuzluktan kaynaklanıyor. Net değerler belirlemek huzur verir.",
      group: "Majör Arkana"
    },
    {
      id: "the_chariot_ma_pos1",
      card: "The Chariot",
      position: 1,
      upright: "Savaş Arabası, maddi kontrolü kaybetme kaygısını açığa çıkarır. Yönünü kaybetmek veya hedeflere ulaşamamak endişe doğurur.",
      reversed: "Ters Savaş Arabası, savrulma ve yönsüzlük kaygısını işaret eder. Parasal çabaların sonuçsuz kalacağından korkabilirsin.",
      keywords: ["yön", "kontrol", "disiplin", "kaygı", "hedef"],
      context: "Kaygı, yönsüzlük ve kontrol eksikliğinden doğuyor. Net rota belirlemek güven verir.",
      group: "Majör Arkana"
    },
    {
      id: "strength_ma_pos1",
      card: "Strength",
      position: 1,
      upright: "Güç, maddi alanda yetersiz kalma kaygısını işaret eder. Zorluklarla başa çıkamamak korkusu endişelerini artırır.",
      reversed: "Ters Güç, sabırsızlık ve öz güvensizlik kaygısını açığa çıkarır. Finansal mücadelelerde kendini çaresiz hissedebilirsin.",
      keywords: ["cesaret", "güç", "kaygı", "öz güven", "sabır"],
      context: "Kaygı, öz güven ve sabır eksikliğinden doğuyor. İçsel güce odaklanmak huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "the_hermit_ma_pos1",
      card: "The Hermit",
      position: 1,
      upright: "Ermiş, yalnız kalma ve maddi destekten yoksun olma kaygısını açığa çıkarır. İçsel sorgulamalar finansal huzursuzluk yaratabilir.",
      reversed: "Ters Ermiş, aşırı izolasyonun kaygısını işaret eder. Yardım istemekten çekinmek, maddi endişeleri büyütebilir.",
      keywords: ["yalnızlık", "destek", "içe dönüş", "kaygı", "arayış"],
      context: "Kaygı, yalnız kalmaktan ve destek bulamamaktan doğuyor. Açık iletişimle destek almak güven verir.",
      group: "Majör Arkana"
    },
    {
      id: "wheel_of_fortune_ma_pos1",
      card: "Wheel of Fortune",
      position: 1,
      upright: "Kader Çarkı, finansal dalgalanmalara karşı duyulan kaygıyı gösterir. Talihin değişkenliği seni huzursuz hissettirebilir.",
      reversed: "Ters Çark, kontrol edilemeyen kayıplar ve tekrar eden döngüler endişe kaynağıdır. Sürekli aynı hatalara düşmekten korkabilirsin.",
      keywords: ["döngü", "değişim", "talih", "kaygı", "belirsizlik"],
      context: "Kaygı, değişken talihin etkisinden geliyor. Döngüleri anlamak huzur verir.",
      group: "Majör Arkana"
    },
    {
      id: "justice_ma_pos1",
      card: "Justice",
      position: 1,
      upright: "Adalet, haksızlığa uğrama ve adil olmayan koşullar kaygısını gösterir. Maddi alanda eşitlik arayışı seni zorlayabilir.",
      reversed: "Ters Adalet, yanılgı ve yanlış anlaşılma kaygısını işaret eder. Yanlış hesapların ya da haksız durumların korkusu endişe yaratır.",
      keywords: ["adalet", "eşitlik", "haksızlık", "kaygı", "denge"],
      context: "Kaygı, haksızlığa uğrama korkusundan doğuyor. Şeffaflık ve doğruluk huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "the_hanged_man_ma_pos1",
      card: "The Hanged Man",
      position: 1,
      upright: "Asılan Adam, bekleyişin ve hareketsizliğin kaygısını açığa çıkarır. Maddi konularda durağanlık huzursuzluk yaratabilir.",
      reversed: "Ters Asılan Adam, fedakarlığın karşılıksız kalma korkusunu işaret eder. Çabaların sonuçsuz kalacağından endişelenebilirsin.",
      keywords: ["bekleyiş", "durağanlık", "fedakarlık", "kaygı", "teslimiyet"],
      context: "Kaygı, durağanlık ve karşılıksız kalma korkusundan doğuyor. Perspektif değişimi huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "death_ma_pos1",
      card: "Death",
      position: 1,
      upright: "Ölüm, kayıp ve bitiş korkusunu işaret eder. Maddi düzende ani değişimler kaygı yaratabilir.",
      reversed: "Ters Ölüm, değişime direnç ve belirsizlik kaygısını açığa çıkarır. Eskiye tutunmak huzursuzluk verir.",
      keywords: ["değişim", "bitiş", "kaygı", "direnç", "yenilenme"],
      context: "Kaygı, değişime dirençten doğuyor. Bitişleri kabul etmek huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "temperance_ma_pos1",
      card: "Temperance",
      position: 1,
      upright: "Denge, aşırılıklardan duyulan kaygıyı işaret eder. Maddi konularda aşırı harcama ya da aşırı tutum huzursuzluk yaratır.",
      reversed: "Ters Denge, uyumsuzluk ve ölçüsüzlük kaygısını açığa çıkarır. Dengeyi bulamamak endişeyi büyütür.",
      keywords: ["denge", "uyum", "ölçü", "kaygı", "sabır"],
      context: "Kaygı, denge eksikliğinden doğuyor. Orta yolu bulmak huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "the_devil_ma_pos1",
      card: "The Devil",
      position: 1,
      upright: "Şeytan, bağımlılıklar ve maddi bağımlılık kaygısını işaret eder. Borç ya da aşırı tüketim seni endişelendirebilir.",
      reversed: "Ters Şeytan, zincirlenmiş hissetmenin kaygısını açığa çıkarır. Maddi özgürlüğünü kısıtlayan koşullar seni bunaltır.",
      keywords: ["bağımlılık", "borç", "kaygı", "özgürlük", "kısıtlama"],
      context: "Kaygı, bağımlılıklar ve kısıtlamalardan doğuyor. Kontrolü geri almak huzur verir.",
      group: "Majör Arkana"
    },
    {
      id: "the_tower_ma_pos1",
      card: "The Tower",
      position: 1,
      upright: "Kule, ani kayıp ve çöküş korkusunu işaret eder. Maddi temellerin sarsılması seni huzursuz edebilir.",
      reversed: "Ters Kule, beklenmeyen değişimlerin kaygısını açığa çıkarır. Küçük sarsıntılar bile büyük korkular yaratabilir.",
      keywords: ["çöküş", "değişim", "kayıp", "kaygı", "temel"],
      context: "Kaygı, ani değişim ve kayıplardan doğuyor. Sağlam zemin kurmak huzur verir.",
      group: "Majör Arkana"
    },
    {
      id: "the_star_ma_pos1",
      card: "The Star",
      position: 1,
      upright: "Yıldız, umudu kaybetme kaygısını işaret eder. Gelecekteki bolluğun belirsizliği huzursuzluk yaratabilir.",
      reversed: "Ters Yıldız, tükenmişlik ve umutsuzluk kaygısını açığa çıkarır. Maddi refahın asla gelmeyeceğinden korkabilirsin.",
      keywords: ["umut", "yenilenme", "kaygı", "inanç", "gelecek"],
      context: "Kaygı, umudu kaybetmekten doğuyor. İnancını korumak huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "the_moon_ma_pos1",
      card: "The Moon",
      position: 1,
      upright: "Ay, belirsizlik ve yanılsama kaygısını işaret eder. Maddi gerçeklerin sisli görünmesi endişe doğurur.",
      reversed: "Ters Ay, yanlış anlaşılma ve aldatılma kaygısını açığa çıkarır. Maddi gerçeklerin gizlenmesi korku yaratır.",
      keywords: ["belirsizlik", "yanılsama", "aldatma", "kaygı", "güvensizlik"],
      context: "Kaygı, belirsizlik ve yanılsamalardan doğuyor. Netlik aramak huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "the_sun_ma_pos1",
      card: "The Sun",
      position: 1,
      upright: "Güneş, mutluluğu kaybetme ve bolluğu sürdürememe kaygısını işaret eder. Gelecekteki refahın eksileceğinden korkabilirsin.",
      reversed: "Ters Güneş, sahte mutluluk ve yüzeysel bolluk kaygısını açığa çıkarır. Gerçeğin görünmemesi seni huzursuz edebilir.",
      keywords: ["bolluk", "mutluluk", "kaygı", "güvenlik", "aydınlık"],
      context: "Kaygı, bolluğu kaybetme korkusundan doğuyor. Gerçeği görmek huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "judgement_ma_pos1",
      card: "Judgement",
      position: 1,
      upright: "Mahkeme, geçmiş kararların yükünden kaynaklı kaygıyı işaret eder. Eski hataların maddi geleceği etkileyeceğinden korkabilirsin.",
      reversed: "Ters Mahkeme, aşırı öz eleştiri ve suçluluk kaygısını açığa çıkarır. Geçmişi affedememek endişeyi büyütür.",
      keywords: ["geçmiş", "hesaplaşma", "kaygı", "yargı", "öz eleştiri"],
      context: "Kaygı, geçmiş kararların yükünden doğuyor. Affediş ve telafi huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "the_world_ma_pos1",
      card: "The World",
      position: 1,
      upright: "Dünya, tamamlanamama ve eksiklik kaygısını işaret eder. Maddi döngünün kapanmaması huzursuzluk yaratır.",
      reversed: "Ters Dünya, yarım kalmışlık ve entegrasyon eksikliği kaygısını açığa çıkarır. Başarıya ulaşamamak korkusu endişe verir.",
      keywords: ["tamamlanma", "bütünlük", "kaygı", "eksiklik", "hedef"],
      context: "Kaygı, eksik kalma ve bitirememe korkusundan doğuyor. Döngüyü kapatmak huzur getirir.",
      group: "Majör Arkana"
    },
    {
      id: "ace_of_cups_cu_pos1",
      card: "Ace of Cups",
      position: 1,
      upright: "Kupa Ası, duygularını özgürce ifade edememe ve maddi kayıpların kalbini kısıtlayacağı kaygısını gösterir. Para eksikliği, mutluluğu engelleyecekmiş gibi hissedebilirsin.",
      reversed: "Ters Kupa Ası, duygusal tıkanıklık ve sevgiyi paylaşamama korkusunu işaret eder. Finansal sorunların seni içsel olarak kapatmasından endişelenirsin.",
      keywords: ["duygu", "bolluk", "kaygı", "ifade", "paylaşım"],
      context: "Kaygı, bolluğun eksikliği ve duygularını ifade edememekten doğuyor.",
      group: "Kupalar"
    },
    {
      id: "two_of_cups_cu_pos1",
      card: "Two of Cups",
      position: 1,
      upright: "İki Kupa, maddi uyumsuzlukların ilişkilerini bozacağından kaygılandığını gösterir. Paylaşımda eşitlik olmaması seni huzursuz edebilir.",
      reversed: "Ters İki Kupa, dengesizlik ve karşılıklılığın olmaması korkusunu işaret eder. Maddi sorunların birlikteliğini zedelemesinden endişelenirsin.",
      keywords: ["uyum", "eşitlik", "paylaşım", "kaygı", "ilişki"],
      context: "Kaygı, maddi eşitsizliklerin ilişkilerine yansımasından doğuyor.",
      group: "Kupalar"
    },
    {
      id: "three_of_cups_cu_pos1",
      card: "Three of Cups",
      position: 1,
      upright: "Üç Kupa, sosyal harcamalar ve fazlalığın kaygısını gösterir. Eğlence ve kutlamaların mali baskı yaratacağından korkabilirsin.",
      reversed: "Ters Üç Kupa, aşırıya kaçan harcamaların huzursuzluk kaynağı olduğunu anlatır. Fazla sosyal giderler kaygını artırabilir.",
      keywords: ["kutlama", "sosyal", "fazlalık", "kaygı", "harcama"],
      context: "Kaygı, sosyal harcamaların seni zorlamasından doğuyor.",
      group: "Kupalar"
    },
    {
      id: "four_of_cups_cu_pos1",
      card: "Four of Cups",
      position: 1,
      upright: "Dört Kupa, fırsatları görmemek ve tatminsizlik kaygısını işaret eder. Maddi şansların kaçtığını düşünmek seni huzursuz eder.",
      reversed: "Ters Dört Kupa, geçmişteki fırsatların kaçması ve bundan ders alamama korkusunu açığa çıkarır. Bu kaygı seni bloke edebilir.",
      keywords: ["tatminsizlik", "fırsat", "kaygı", "dikkatsizlik", "şans"],
      context: "Kaygı, fırsatları görememek ve tatminsizlikten besleniyor.",
      group: "Kupalar"
    },
    {
      id: "five_of_cups_cu_pos1",
      card: "Five of Cups",
      position: 1,
      upright: "Beş Kupa, kayıp ve hayal kırıklığı kaygısını işaret eder. Maddi başarısızlıkların sürekli seni bulacağından korkabilirsin.",
      reversed: "Ters Beş Kupa, toparlanamamak ve geçmiş kayıplara tutunmak kaygısını açığa çıkarır. Maddi yas sürecini tamamlayamamak seni huzursuz eder.",
      keywords: ["kayıp", "hayal kırıklığı", "kaygı", "üzüntü", "maddi başarısızlık"],
      context: "Kaygı, geçmiş maddi kayıplardan ve hayal kırıklıklarından doğuyor.",
      group: "Kupalar"
    },
    {
      id: "six_of_cups_cu_pos1",
      card: "Six of Cups",
      position: 1,
      upright: "Altı Kupa, geçmişteki finansal alışkanlıkların kaygısını işaret eder. Eski hataların tekrar etmesinden endişelenirsin.",
      reversed: "Ters Altı Kupa, geçmişe aşırı tutunmanın kaygısını açığa çıkarır. Eski borçlar veya eski düzenler huzurunu bozabilir.",
      keywords: ["geçmiş", "alışkanlık", "kaygı", "nostalji", "tekrar"],
      context: "Kaygı, geçmişten gelen finansal hataların tekrarlanmasından doğuyor.",
      group: "Kupalar"
    },
    {
      id: "seven_of_cups_cu_pos1",
      card: "Seven of Cups",
      position: 1,
      upright: "Yedi Kupa, seçenek fazlalığı ve kararsızlık kaygısını işaret eder. Maddi alanda doğru seçimi yapamamaktan korkabilirsin.",
      reversed: "Ters Yedi Kupa, hayallerin dağınıklığı ve yanlış seçim kaygısını açığa çıkarır. Gerçekçi olmayan hedefler huzursuzluk yaratır.",
      keywords: ["kararsızlık", "seçenek", "hayal", "kaygı", "yanlış seçim"],
      context: "Kaygı, maddi konularda doğru kararı verememekten doğuyor.",
      group: "Kupalar"
    },
    {
      id: "eight_of_cups_cu_pos1",
      card: "Eight of Cups",
      position: 1,
      upright: "Sekiz Kupa, terk etme ve geride bırakma kaygısını işaret eder. Maddi düzenini bozmak zorunda kalmaktan korkabilirsin.",
      reversed: "Ters Sekiz Kupa, bırakamama ve aynı döngüde sıkışma kaygısını açığa çıkarır. Maddi ilerleyememek huzursuzluk verir.",
      keywords: ["bırakma", "kaygı", "terk", "döngü", "maddi düzen"],
      context: "Kaygı, eski maddi düzeni bırakma ya da bırakamamaktan doğuyor.",
      group: "Kupalar"
    },
    {
      id: "nine_of_cups_cu_pos1",
      card: "Nine of Cups",
      position: 1,
      upright: "Dokuz Kupa, mutluluğu kaybetme kaygısını işaret eder. Maddi tatminin geçici olacağından endişe edebilirsin.",
      reversed: "Ters Dokuz Kupa, sahte doyum ve aşırı tüketim kaygısını açığa çıkarır. Bolluğun sürdürülememesi seni huzursuz eder.",
      keywords: ["tatmin", "bolluk", "kaygı", "sahte mutluluk", "doyum"],
      context: "Kaygı, bolluğun sürdürülememesi veya sahte tatminden doğuyor.",
      group: "Kupalar"
    },
    {
      id: "ten_of_cups_cu_pos1",
      card: "Ten of Cups",
      position: 1,
      upright: "On Kupa, aile huzurunu maddi eksikliklerin bozacağı kaygısını gösterir. Mutluluğun parayla gölgelenmesinden korkabilirsin.",
      reversed: "Ters On Kupa, maddi uyumsuzlukların aile bağlarını zedeleyeceği endişesini işaret eder. İdeal mutluluk resmine ulaşamamak huzursuzluk yaratır.",
      keywords: ["aile", "mutluluk", "kaygı", "huzur", "maddi eksiklik"],
      context: "Kaygı, maddi sorunların aile huzurunu etkilemesinden doğuyor.",
      group: "Kupalar"
    },
    {
      id: "page_of_cups_cu_pos1",
      card: "Page of Cups",
      position: 1,
      upright: "Kupa Prensi, finansal tecrübesizliğin kaygısını işaret eder. Maddi dünyada saf ve hazırlıksız hissetmek huzursuzluk yaratabilir.",
      reversed: "Ters Kupa Prensi, hayalcilik ve sorumsuzluk kaygısını açığa çıkarır. Maddi dünyada ciddiyet eksikliği endişeye yol açar.",
      keywords: ["tecrübesizlik", "hayalcilik", "kaygı", "duygusallık", "saflık"],
      context: "Kaygı, maddi konularda deneyimsizlikten doğuyor.",
      group: "Kupalar"
    },
    {
      id: "knight_of_cups_cu_pos1",
      card: "Knight of Cups",
      position: 1,
      upright: "Kupa Şövalyesi, maddi sorumluluklardan kaçma kaygısını işaret eder. Romantik hayallerin finansal gerçeklerle çelişmesinden endişelenebilirsin.",
      reversed: "Ters Kupa Şövalyesi, tutarsızlık ve boş vaat kaygısını açığa çıkarır. Maddi taahhütlerin yerine getirilememesi huzursuzluk yaratır.",
      keywords: ["sorumluluk", "tutarsızlık", "kaygı", "hayal", "maddi gerçek"],
      context: "Kaygı, maddi gerçeklerle hayallerin çatışmasından doğuyor.",
      group: "Kupalar"
    },
    {
      id: "queen_of_cups_cu_pos1",
      card: "Queen of Cups",
      position: 1,
      upright: "Kupa Kraliçesi, maddi sınırların belirsizleşmesi kaygısını işaret eder. Aşırı fedakarlık finansal dengesizlik yaratabilir.",
      reversed: "Ters Kupa Kraliçesi, duygusal taşkınlık ve kontrolsüzlük kaygısını açığa çıkarır. Maddi kararlarda duyguların fazla ağır basması endişe verir.",
      keywords: ["fedakarlık", "sınır", "kaygı", "duygusallık", "denge"],
      context: "Kaygı, aşırı duygusallık ve maddi sınır eksikliğinden doğuyor.",
      group: "Kupalar"
    },
    {
      id: "king_of_cups_cu_pos1",
      card: "King of Cups",
      position: 1,
      upright: "Kupa Kralı, maddi kararların duygusal yük oluşturacağından kaygılandığını gösterir. Sorumluluklar duygusal dengeyi bozabilir.",
      reversed: "Ters Kupa Kralı, duyguları bastırmanın ve pasif-agresif tavırların finansal kaygı doğurduğunu işaret eder. Maddi kararları ertelemek huzursuzluk verir.",
      keywords: ["sorumluluk", "duygu", "kaygı", "denge", "kontrol"],
      context: "Kaygı, duyguların finansal sorumluluklarla çatışmasından doğuyor.",
      group: "Kupalar"
    },

  // --- Kılıçlar Serisi ---
    {
      id: "ace_of_swords_sw_pos1",
      card: "Ace of Swords",
      position: 1,
      upright: "Kılıç Ası, maddi konularda gerçeği görmekten ve net kararlar almaktan korktuğunu gösterir. Finansal gerçeklerin keskinliği seni kaygılandırabilir.",
      reversed: "Ters Kılıç Ası, kafa karışıklığı ve yanlış karar verme kaygısını işaret eder. Yanlış bir adımın ağır sonuçlar getirmesinden korkabilirsin.",
      keywords: ["gerçek", "netlik", "kaygı", "karar", "zihin"],
      context: "Kaygı, keskin gerçekleri görmek ve doğru kararı almaktan doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "two_of_swords_sw_pos1",
      card: "Two of Swords",
      position: 1,
      upright: "İki Kılıç, karar verememek ve seçenekler arasında sıkışmak kaygısını işaret eder. Maddi tercihlerin sonucundan endişe duyabilirsin.",
      reversed: "Ters İki Kılıç, kaçınılan kararların daha büyük kaygı yarattığını gösterir. Ertelemenin maddi sorunları büyütmesinden korkabilirsin.",
      keywords: ["kararsızlık", "seçenek", "kaygı", "denge", "erteleme"],
      context: "Kaygı, karar verememek ve ertelemeden doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "three_of_swords_sw_pos1",
      card: "Three of Swords",
      position: 1,
      upright: "Üç Kılıç, finansal kayıpların duygusal kırgınlık yaratacağı kaygısını işaret eder. Paranın ilişkilerini zedelemesinden korkabilirsin.",
      reversed: "Ters Üç Kılıç, geçmiş kayıplardan iyileşememe kaygısını gösterir. Maddi acının tekrar yaşanması huzursuzluk yaratır.",
      keywords: ["kayıp", "kırgınlık", "kaygı", "acı", "maddi yara"],
      context: "Kaygı, finansal kayıpların yarattığı acıdan doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "four_of_swords_sw_pos1",
      card: "Four of Swords",
      position: 1,
      upright: "Dört Kılıç, dinlenmeye ve mola vermeye izin vermemek kaygısını işaret eder. Maddi sorunlar yüzünden rahat edememekten korkabilirsin.",
      reversed: "Ters Dört Kılıç, tükenmişlik ve sürekli stres kaygısını açığa çıkarır. Maddi konularda hiç rahatlayamamak huzursuzluk verir.",
      keywords: ["dinlenme", "tükenmişlik", "kaygı", "zihin", "stres"],
      context: "Kaygı, dinlenememek ve sürekli stres altında olmaktan doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "five_of_swords_sw_pos1",
      card: "Five of Swords",
      position: 1,
      upright: "Beş Kılıç, rekabet ve kaybetme korkusunu işaret eder. Maddi dünyada başkalarının üstün gelmesinden kaygılanabilirsin.",
      reversed: "Ters Beş Kılıç, tartışmaların ve yanlış anlaşmaların finansal kaygı doğurduğunu gösterir. Kaynaklar yüzünden çatışmadan endişe edersin.",
      keywords: ["rekabet", "kaybetme", "kaygı", "çatışma", "ego"],
      context: "Kaygı, maddi konularda rekabet ve çatışmadan doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "six_of_swords_sw_pos1",
      card: "Six of Swords",
      position: 1,
      upright: "Altı Kılıç, maddi sıkıntılardan çıkış yolunu bulamama kaygısını işaret eder. Güvenli limana ulaşamamak endişesi seni yorabilir.",
      reversed: "Ters Altı Kılıç, geçmiş sorunlardan kopamama kaygısını açığa çıkarır. Sürekli aynı döngüde kalmaktan korkabilirsin.",
      keywords: ["geçiş", "çıkış", "kaygı", "yolculuk", "sıkışma"],
      context: "Kaygı, maddi sıkıntılardan çıkış yolunu bulamamaktan doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "seven_of_swords_sw_pos1",
      card: "Seven of Swords",
      position: 1,
      upright: "Yedi Kılıç, aldatılma ve kaynağın çalınması kaygısını işaret eder. Maddi güvenliğini başkalarına emanet etmekten korkabilirsin.",
      reversed: "Ters Yedi Kılıç, kendini kandırma ve yanlış strateji kaygısını gösterir. Maddi kararlarında dürüst olamamaktan endişe edersin.",
      keywords: ["aldatma", "kaygı", "strateji", "kandırılma", "güvensizlik"],
      context: "Kaygı, maddi konularda aldatılmak veya yanlış strateji seçmekten doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "eight_of_swords_sw_pos1",
      card: "Eight of Swords",
      position: 1,
      upright: "Sekiz Kılıç, çaresizlik ve sıkışmışlık kaygısını işaret eder. Maddi sorunların seni özgür bırakmayacağından korkabilirsin.",
      reversed: "Ters Sekiz Kılıç, kurtulma isteğine rağmen hala tutsak hissetme kaygısını açığa çıkarır. Çözümsüzlük algısı seni huzursuz eder.",
      keywords: ["sıkışma", "çaresizlik", "kaygı", "özgürlük", "maddi tuzak"],
      context: "Kaygı, maddi sorunların seni çaresiz bırakmasından doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "nine_of_swords_sw_pos1",
      card: "Nine of Swords",
      position: 1,
      upright: "Dokuz Kılıç, uykusuz geceler ve yoğun kaygıyı işaret eder. Finansal stresin zihnini sürekli meşgul etmesinden korkabilirsin.",
      reversed: "Ters Dokuz Kılıç, kaygılardan kurtulamama ve kabus döngüsünden çıkamama korkusunu gösterir. Maddi yükün zihinsel baskısını taşımakta zorlanabilirsin.",
      keywords: ["uykusuzluk", "stres", "kaygı", "endişe", "karanlık düşünce"],
      context: "Kaygı, finansal stresin zihinsel baskısından doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "ten_of_swords_sw_pos1",
      card: "Ten of Swords",
      position: 1,
      upright: "On Kılıç, maddi bir döngünün tamamen çökmesi kaygısını işaret eder. Her şeyin son bulacağı ve toparlanamayacağın korkusu seni yorabilir.",
      reversed: "Ters On Kılıç, yeniden başlama ihtimalinin bile kaygı vermesini işaret eder. Maddi bitişlerin ardından ayağa kalkamamak endişesi olabilir.",
      keywords: ["bitiş", "çöküş", "kaygı", "yeniden doğuş", "yıkım"],
      context: "Kaygı, maddi çöküş ve yeniden başlama korkusundan doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "page_of_swords_sw_pos1",
      card: "Page of Swords",
      position: 1,
      upright: "Kılıç Prensi, finansal tecrübesizlik ve sürekli gözlem kaygısını işaret eder. Sürekli araştırma yapmak ama güvenememek seni yorabilir.",
      reversed: "Ters Kılıç Prensi, yanlış bilgi ve dedikodularla kaygının artacağını gösterir. Maddi kararlarını sağlam bilgiye dayandıramamaktan korkabilirsin.",
      keywords: ["merak", "bilgi", "kaygı", "tecrübesizlik", "yanlış bilgi"],
      context: "Kaygı, yanlış bilgi ve deneyimsizlikten doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "knight_of_swords_sw_pos1",
      card: "Knight of Swords",
      position: 1,
      upright: "Kılıç Şövalyesi, acele kararlar ve ani hareketlerin kaygısını işaret eder. Maddi konularda hızlı adım atma baskısı seni yorabilir.",
      reversed: "Ters Kılıç Şövalyesi, aceleciliğin kaos yaratacağı kaygısını açığa çıkarır. Yanlış hamlelerin büyük zarara yol açmasından korkabilirsin.",
      keywords: ["acele", "karar", "kaygı", "hız", "kaos"],
      context: "Kaygı, acele kararlar ve hızlı hareket etme baskısından doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "queen_of_swords_sw_pos1",
      card: "Queen of Swords",
      position: 1,
      upright: "Kılıç Kraliçesi, soğukkanlı olamama ve netlik kaygısını işaret eder. Duyguların maddi kararlarına gölge düşürmesinden korkabilirsin.",
      reversed: "Ters Kılıç Kraliçesi, aşırı eleştirel yaklaşımın kaygısını açığa çıkarır. Hem kendine hem çevrene fazla baskı yapmaktan endişelenirsin.",
      keywords: ["soğukkanlılık", "netlik", "kaygı", "eleştiri", "denge"],
      context: "Kaygı, soğukkanlı kalamamak ve aşırı eleştirel olmaktan doğuyor.",
      group: "Kılıçlar"
    },
    {
      id: "king_of_swords_sw_pos1",
      card: "King of Swords",
      position: 1,
      upright: "Kılıç Kralı, mantıklı kalamama ve kontrolü kaybetme kaygısını işaret eder. Finansal dünyada adil ve stratejik olamamaktan korkabilirsin.",
      reversed: "Ters Kılıç Kralı, otoritenin suistimal edilmesi veya kontrolün tamamen kaybedilmesi kaygısını gösterir. Maddi kararların baskı yaratmasından endişelenirsin.",
      keywords: ["mantık", "kontrol", "kaygı", "otorite", "adalet"],
      context: "Kaygı, mantıklı ve adil karar verememekten doğuyor.",
      group: "Kılıçlar"
    },  

  // --- Asalar Serisi ---
    {
      id: "ace_of_wands_wa_pos1",
      card: "Ace of Wands",
      position: 1,
      upright: "Değnek Ası, yeni girişimlere adım atamama ve fırsatları kaçırma kaygısını işaret eder. Yaratıcılığını kullanamamak seni endişelendirebilir.",
      reversed: "Ters Değnek Ası, ilham eksikliği ve yanlış başlangıç kaygısını açığa çıkarır. Doğru adımı bulamamaktan korkabilirsin.",
      keywords: ["başlangıç", "ilham", "kaygı", "fırsat", "girişim"],
      context: "Kaygı, fırsatları değerlendirememe ve yanlış başlangıç yapmaktan doğuyor.",
      group: "Asalar"
    },
    {
      id: "two_of_wands_wa_pos1",
      card: "Two of Wands",
      position: 1,
      upright: "İki Değnek, gelecek planlarını yanlış kurma kaygısını işaret eder. Risk almakta tereddüt edebilirsin.",
      reversed: "Ters İki Değnek, vizyonsuzluk ve yanlış seçim kaygısını açığa çıkarır. Yanlış yöne yönelmekten korkabilirsin.",
      keywords: ["plan", "vizyon", "kaygı", "risk", "seçim"],
      context: "Kaygı, geleceği yanlış planlamaktan doğuyor.",
      group: "Asalar"
    },
    {
      id: "three_of_wands_wa_pos1",
      card: "Three of Wands",
      position: 1,
      upright: "Üç Değnek, genişleme ve büyüme fırsatlarını kaçırma kaygısını işaret eder. Ufuklarını geliştirememekten korkabilirsin.",
      reversed: "Ters Üç Değnek, gecikme ve başarısız işbirliği kaygısını gösterir. Beklentilerinin boşa çıkmasından endişe duyabilirsin.",
      keywords: ["genişleme", "fırsat", "kaygı", "büyüme", "vizyon"],
      context: "Kaygı, büyüme fırsatlarını kaçırmaktan doğuyor.",
      group: "Asalar"
    },
    {
      id: "four_of_wands_wa_pos1",
      card: "Four of Wands",
      position: 1,
      upright: "Dört Değnek, istikrarı ve kutlamayı kaybetme kaygısını işaret eder. Güvende hissetmemek endişe yaratabilir.",
      reversed: "Ters Dört Değnek, temelin sağlam olmaması kaygısını açığa çıkarır. Emeklerinin boşa gitmesinden korkabilirsin.",
      keywords: ["istikrar", "kutlama", "kaygı", "temel", "güven"],
      context: "Kaygı, istikrarsızlık ve güvensizlikten doğuyor.",
      group: "Asalar"
    },
    {
      id: "five_of_wands_wa_pos1",
      card: "Five of Wands",
      position: 1,
      upright: "Beş Değnek, rekabet ve çatışma kaygısını işaret eder. Maddi dünyada öne çıkamamaktan korkabilirsin.",
      reversed: "Ters Beş Değnek, bastırılmış gerilim ve gereksiz mücadele kaygısını açığa çıkarır. Çatışmaların seni tüketmesinden endişelenebilirsin.",
      keywords: ["rekabet", "çatışma", "kaygı", "mücadele", "ego"],
      context: "Kaygı, maddi dünyada rekabet ve çatışmadan doğuyor.",
      group: "Asalar"
    },
    {
      id: "six_of_wands_wa_pos1",
      card: "Six of Wands",
      position: 1,
      upright: "Altı Değnek, başarıyı sürdürememe kaygısını işaret eder. Tanınmayı kaybetmekten korkabilirsin.",
      reversed: "Ters Altı Değnek, başarısızlık ve değersizlik kaygısını açığa çıkarır. Hak ettiğin takdiri görememekten endişe duyabilirsin.",
      keywords: ["başarı", "tanınma", "kaygı", "zafer", "motivasyon"],
      context: "Kaygı, başarıyı sürdürememek ve tanınmamaktan doğuyor.",
      group: "Asalar"
    },
    {
      id: "seven_of_wands_wa_pos1",
      card: "Seven of Wands",
      position: 1,
      upright: "Yedi Değnek, pozisyonunu savunamama kaygısını işaret eder. Haklarını koruyamamaktan korkabilirsin.",
      reversed: "Ters Yedi Değnek, tükenmişlik ve savunmasızlık kaygısını açığa çıkarır. Gücünü kaybetmekten endişe duyabilirsin.",
      keywords: ["savunma", "kaygı", "haklar", "direnç", "koruma"],
      context: "Kaygı, pozisyonunu savunamamak ve güçsüz kalmaktan doğuyor.",
      group: "Asalar"
    },
    {
      id: "eight_of_wands_wa_pos1",
      card: "Eight of Wands",
      position: 1,
      upright: "Sekiz Değnek, fırsatların çok hızlı gelişmesi kaygısını işaret eder. Hızla değişen koşullara ayak uyduramamaktan korkabilirsin.",
      reversed: "Ters Sekiz Değnek, gecikmeler ve tıkanıklık kaygısını gösterir. İlerleyememek endişesi seni yorabilir.",
      keywords: ["hız", "fırsat", "kaygı", "ilerleme", "akış"],
      context: "Kaygı, hızlı değişimlere ayak uyduramamak veya tıkanmaktan doğuyor.",
      group: "Asalar"
    },
    {
      id: "nine_of_wands_wa_pos1",
      card: "Nine of Wands",
      position: 1,
      upright: "Dokuz Değnek, yılgınlık ve dayanıklılığı kaybetme kaygısını işaret eder. Uzun mücadelelerden yorulmuş olabilirsin.",
      reversed: "Ters Dokuz Değnek, pes etme ve dayanacak gücü bulamama kaygısını açığa çıkarır. Sürekli mücadelede olmak seni endişelendirebilir.",
      keywords: ["dayanıklılık", "yorgunluk", "kaygı", "mücadele", "direnç"],
      context: "Kaygı, uzun süreli mücadelelerden ve dayanıklılığın tükenmesinden doğuyor.",
      group: "Asalar"
    },
    {
      id: "ten_of_wands_wa_pos1",
      card: "Ten of Wands",
      position: 1,
      upright: "On Değnek, aşırı yük ve sorumluluk kaygısını işaret eder. Maddi yüklerin seni ezmesinden korkabilirsin.",
      reversed: "Ters On Değnek, yüklerini bırakamama ve aşırı sorumluluk kaygısını gösterir. Fazla yük taşımanın seni tüketmesinden endişe duyabilirsin.",
      keywords: ["yük", "sorumluluk", "kaygı", "ağırlık", "maddi baskı"],
      context: "Kaygı, aşırı yük ve sorumluluk taşımaktan doğuyor.",
      group: "Asalar"
    },
    {
      id: "page_of_wands_wa_pos1",
      card: "Page of Wands",
      position: 1,
      upright: "Değnek Prensi, yeni fikirlere adım atmama ve hevesini kaybetme kaygısını işaret eder. Cesaretini yitirmekten korkabilirsin.",
      reversed: "Ters Değnek Prensi, dikkatsizlik ve dağınıklık kaygısını açığa çıkarır. İstediğin gibi ilerleyememekten endişe duyabilirsin.",
      keywords: ["cesaret", "heves", "kaygı", "fikir", "deneme"],
      context: "Kaygı, cesaretini kaybetmekten ve dağınıklıktan doğuyor.",
      group: "Asalar"
    },
    {
      id: "knight_of_wands_wa_pos1",
      card: "Knight of Wands",
      position: 1,
      upright: "Değnek Şövalyesi, aceleci girişimler ve savruk hareketler kaygısını işaret eder. Kontrolsüz adımlar atmaktan korkabilirsin.",
      reversed: "Ters Değnek Şövalyesi, dengesizlik ve yarıda bırakma kaygısını açığa çıkarır. Sürdürememek seni endişelendirebilir.",
      keywords: ["acele", "girişim", "kaygı", "kontrolsüzlük", "dengesizlik"],
      context: "Kaygı, aceleci girişimlerden ve sürdürememekten doğuyor.",
      group: "Asalar"
    },
    {
      id: "queen_of_wands_wa_pos1",
      card: "Queen of Wands",
      position: 1,
      upright: "Değnek Kraliçesi, güveni kaybetme ve karizmayı yitirme kaygısını işaret eder. Çekiciliğini koruyamamaktan korkabilirsin.",
      reversed: "Ters Değnek Kraliçesi, kıskançlık ve güvensizlik kaygısını açığa çıkarır. Kendi gücünü küçümsemekten endişe duyabilirsin.",
      keywords: ["güven", "karizma", "kaygı", "çekicilik", "özgüven"],
      context: "Kaygı, güveni ve çekiciliğini kaybetmekten doğuyor.",
      group: "Asalar"
    },
    {
      id: "king_of_wands_wa_pos1",
      card: "King of Wands",
      position: 1,
      upright: "Değnek Kralı, liderliği kaybetme ve kontrolü yitirme kaygısını işaret eder. Maddi vizyonunu koruyamamaktan korkabilirsin.",
      reversed: "Ters Değnek Kralı, otoritenin zayıflaması ve güven kaygısını açığa çıkarır. Stratejilerini sürdürememekten endişe duyabilirsin.",
      keywords: ["liderlik", "vizyon", "kaygı", "otorite", "kontrol"],
      context: "Kaygı, liderlik ve vizyonunu kaybetmekten doğuyor.",
      group: "Asalar"
    },

    
      {
        id: "ace_of_pentacles_pe_pos1",
        card: "Ace of Pentacles",
        position: 1,
        upright: "Tılsım Ası, yeni bir fırsatı kaçırma veya değerlendirememe kaygısını işaret eder. Maddi şansı elden kaçırmaktan korkabilirsin.",
        reversed: "Ters Tılsım Ası, istikrarsızlık ve kaynakların boşa gitmesi kaygısını gösterir. Yeni başlangıçların tutmamasından endişe duyabilirsin.",
        keywords: ["fırsat", "kaygı", "istikrar", "başlangıç", "güven"],
        context: "Kaygı, fırsatları değerlendirememe ve istikrarsızlıktan doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "two_of_pentacles_pe_pos1",
        card: "Two of Pentacles",
        position: 1,
        upright: "İki Tılsım, mali dengeyi kuramama ve çoklu sorumluluk kaygısını işaret eder. Kaynaklarını yönetmekte zorlanmaktan korkabilirsin.",
        reversed: "Ters İki Tılsım, dağınıklık ve kontrolü kaybetme kaygısını açığa çıkarır. Para yönetiminde hata yapmaktan endişe edebilirsin.",
        keywords: ["denge", "kaygı", "kontrol", "mali yönetim", "sorumluluk"],
        context: "Kaygı, denge kuramamak ve sorumlulukların ağırlığından doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "three_of_pentacles_pe_pos1",
        card: "Three of Pentacles",
        position: 1,
        upright: "Üç Tılsım, işbirliği yapamamak veya yeterince değer görmemek kaygısını işaret eder. Emeklerinin karşılığını alamamaktan korkabilirsin.",
        reversed: "Ters Üç Tılsım, uyumsuz ekip çalışması ve başarısız işbirliği kaygısını gösterir. Maddi emeğinin boşa gitmesinden endişe duyabilirsin.",
        keywords: ["işbirliği", "kaygı", "emeğin karşılığı", "değer", "uyum"],
        context: "Kaygı, işbirliği ve emeğinin karşılık bulmamasından doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "four_of_pentacles_pe_pos1",
        card: "Four of Pentacles",
        position: 1,
        upright: "Dört Tılsım, sahip olduklarını kaybetme ve güvende olamama kaygısını işaret eder. Parayı kaybetmekten korkabilirsin.",
        reversed: "Ters Dört Tılsım, aşırı tutma veya aşırı harcama kaygısını gösterir. Dengeli davranamamaktan endişe edebilirsin.",
        keywords: ["güvenlik", "kaygı", "kayıp", "koruma", "denge"],
        context: "Kaygı, sahip olduklarını kaybetmekten ve güveni yitirmekten doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "five_of_pentacles_pe_pos1",
        card: "Five of Pentacles",
        position: 1,
        upright: "Beş Tılsım, yoksunluk ve dışlanma kaygısını işaret eder. Maddi olarak yalnız kalmaktan korkabilirsin.",
        reversed: "Ters Beş Tılsım, toparlanamamak ve yardımsız kalmak kaygısını gösterir. Gelecekte desteği bulamamaktan endişelenebilirsin.",
        keywords: ["yoksunluk", "kaygı", "destek", "yalnızlık", "maddi sıkıntı"],
        context: "Kaygı, yoksunluk ve destek görememekten doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "six_of_pentacles_pe_pos1",
        card: "Six of Pentacles",
        position: 1,
        upright: "Altı Tılsım, adil paylaşım görememe kaygısını işaret eder. Kaynakların eşitsiz dağılmasından korkabilirsin.",
        reversed: "Ters Altı Tılsım, bağımlı hale gelmek veya sömürülmek kaygısını açığa çıkarır. Maddi ilişkilerde adaletsizlikten endişe duyabilirsin.",
        keywords: ["paylaşım", "kaygı", "adalet", "eşitsizlik", "güven"],
        context: "Kaygı, eşitsiz paylaşım ve sömürülme korkusundan doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "seven_of_pentacles_pe_pos1",
        card: "Seven of Pentacles",
        position: 1,
        upright: "Yedi Tılsım, emeklerinin karşılığını alamama kaygısını işaret eder. Beklediğin maddi kazancın gelmemesinden korkabilirsin.",
        reversed: "Ters Yedi Tılsım, yanlış yatırımlar ve zaman kaybı kaygısını gösterir. Çabanın boşa gitmesinden endişe duyabilirsin.",
        keywords: ["emek", "kaygı", "yatırım", "beklenti", "zaman"],
        context: "Kaygı, emeğinin karşılığını alamamaktan doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "eight_of_pentacles_pe_pos1",
        card: "Eight of Pentacles",
        position: 1,
        upright: "Sekiz Tılsım, yetkin olamama ve hatalı çalışma kaygısını işaret eder. Emeklerinin değer bulmamasından korkabilirsin.",
        reversed: "Ters Sekiz Tılsım, özensizlik ve dikkatsizlik kaygısını gösterir. Yeterli beceri geliştirememekten endişe duyabilirsin.",
        keywords: ["ustalık", "kaygı", "beceri", "hata", "çaba"],
        context: "Kaygı, yeterince ustalaşamamaktan ve yanlış yapmaktan doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "nine_of_pentacles_pe_pos1",
        card: "Nine of Pentacles",
        position: 1,
        upright: "Dokuz Tılsım, bağımsız kalamama ve özgürlüğünü kaybetme kaygısını işaret eder. Kendi ayakların üzerinde duramamaktan korkabilirsin.",
        reversed: "Ters Dokuz Tılsım, bağımlılık ve aşırı savurganlık kaygısını gösterir. Maddi özerkliğini kaybetmekten endişe edebilirsin.",
        keywords: ["bağımsızlık", "kaygı", "özgürlük", "özerklik", "savurganlık"],
        context: "Kaygı, özgürlüğünü ve bağımsızlığını kaybetmekten doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "ten_of_pentacles_pe_pos1",
        card: "Ten of Pentacles",
        position: 1,
        upright: "On Tılsım, gelecek nesillere bırakacak istikrarı kuramama kaygısını işaret eder. Maddi miras oluşturamamaktan korkabilirsin.",
        reversed: "Ters On Tılsım, aile içi maddi çatışma ve kayıp kaygısını gösterir. Ortak servetin dağılmasından endişe duyabilirsin.",
        keywords: ["miras", "kaygı", "istikrar", "aile", "gelecek"],
        context: "Kaygı, miras ve uzun vadeli istikrar kuramamaktan doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "page_of_pentacles_pe_pos1",
        card: "Page of Pentacles",
        position: 1,
        upright: "Tılsım Prensi, öğrenememe ve yeni beceri kazanamama kaygısını işaret eder. Maddi fırsatları değerlendirecek yeterliliğe sahip olmamaktan korkabilirsin.",
        reversed: "Ters Tılsım Prensi, dikkatsizlik ve odaksızlık kaygısını açığa çıkarır. Çabalarının dağılmasından endişe edebilirsin.",
        keywords: ["öğrenme", "kaygı", "beceri", "odak", "fırsat"],
        context: "Kaygı, öğrenme ve odaklanma eksikliğinden doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "knight_of_pentacles_pe_pos1",
        card: "Knight of Pentacles",
        position: 1,
        upright: "Tılsım Şövalyesi, yavaş ilerleme ve sabırsızlık kaygısını işaret eder. İstediğin hızda yol alamamaktan korkabilirsin.",
        reversed: "Ters Tılsım Şövalyesi, durağanlık ve sıkışma kaygısını gösterir. Maddi süreçlerin ilerlememesinden endişe duyabilirsin.",
        keywords: ["istikrar", "kaygı", "sabır", "yavaşlık", "durağanlık"],
        context: "Kaygı, yavaş ilerleme ve durağanlıktan doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "queen_of_pentacles_pe_pos1",
        card: "Queen of Pentacles",
        position: 1,
        upright: "Tılsım Kraliçesi, kaynakları iyi yönetememe ve destek sağlayamama kaygısını işaret eder. Hem kendine hem başkalarına bakamamaktan korkabilirsin.",
        reversed: "Ters Tılsım Kraliçesi, aşırı yüklenme ve öz-bakım eksikliği kaygısını açığa çıkarır. Kaynaklarını tüketmekten endişelenebilirsin.",
        keywords: ["kaynak", "kaygı", "öz-bakım", "yük", "denge"],
        context: "Kaygı, kaynaklarını dengeli yönetememekten doğuyor.",
        group: "Tılsımlar"
      },
      {
        id: "king_of_pentacles_pe_pos1",
        card: "King of Pentacles",
        position: 1,
        upright: "Tılsım Kralı, gücü ve başarıyı koruyamama kaygısını işaret eder. Maddi istikrarını sürdürememekten korkabilirsin.",
        reversed: "Ters Tılsım Kralı, kontrolü kaybetme ve statüyü yitirme kaygısını açığa çıkarır. Elde ettiklerini koruyamamaktan endişe duyabilirsin.",
        keywords: ["güç", "kaygı", "istatkar", "kontrol", "başarı"],
        context: "Kaygı, başarıyı ve gücü koruyamamaktan doğuyor.",
        group: "Tılsımlar"
      },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
  export function getMoneyPosition1Meaning(
  card: TarotCard
): MoneyPosition1Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position1Meanings.find(m => 
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
  meaning = position1Meanings.find(m => m.card === englishName);
  
  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyPosition1MeaningByCardName(
  cardName: string
): MoneyPosition1Meaning | null {
  return position1Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllMoneyPosition1Meanings(): MoneyPosition1Meaning[] {
  return position1Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getMoneyPosition1MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MoneyPosition1Meaning[] {
  return position1Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nPosition1Meanings = (): I18nMoneyPosition1Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position1Meanings.map(meaning => {
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
export const getI18nPosition1Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nMoneyPosition1Meaning | null => {
  const originalMeaning = position1Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `money.meanings.${cardKey}.position1.upright`
  );
  const i18nReversed = t(
    `money.meanings.${cardKey}.position1.reversed`
  );
  const i18nKeywords = t(
    `money.meanings.${cardKey}.position1.keywords`
  );
  const i18nContext = t(
    `money.meanings.${cardKey}.position1.context`
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
const moneyPosition1Exports = {
  position1Meanings,
  getMoneyPosition1Meaning,
  getMoneyPosition1MeaningByCardName,
  getAllMoneyPosition1Meanings,
  getMoneyPosition1MeaningsByGroup,
  getI18nPosition1Meaning,
};

export default moneyPosition1Exports;
