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

export interface ProblemSolvingPosition5Meaning {
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
export interface I18nProblemSolvingPosition5Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position5Meanings: ProblemSolvingPosition5Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ps_pos5',
    card: 'The Fool',
    position: 5,
    upright:
      'Joker, yakın geçmişte hayatına yeni bir başlangıç, risk alma ya da özgürleşme enerjisi girmiş olabilir. Cesur bir adım atmış, bilinmeze doğru ilerlemiş olabilirsin.',
    reversed:
      'Ters Joker, yakın geçmişte dikkatsizce davranmış, acele kararlar vermiş veya riskleri görmezden gelmiş olabilirsin.',
    keywords: ['başlangıç', 'risk', 'özgürlük', 'cesaret', 'deneyim'],
    context:
      'Yakın geçmişin, özgürce ama belki de dikkatsizce attığın adımlarla şekillenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ps_pos5',
    card: 'The Magician',
    position: 5,
    upright:
      'Büyücü, yakın geçmişte becerilerini sergileme, niyetlerini eyleme dökme ve güçlü bir başlangıç yapma enerjisi yaşamış olabilirsin.',
    reversed:
      'Ters Büyücü, yakın geçmişte manipülasyon, dağınıklık ya da potansiyelini doğru yönlendirememe deneyimlerin olmuş olabilir.',
    keywords: ['yaratıcılık', 'güç', 'niyet', 'beceri', 'başlangıç'],
    context:
      'Yakın geçmişin, potansiyelini kullanma veya kullanamama üzerine deneyimlerle dolu olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ps_pos5',
    card: 'The High Priestess',
    position: 5,
    upright:
      'Başrahibe, yakın geçmişte sezgilerini dinlemiş, derin bilgilere yönelmiş veya saklı gerçekleri fark etmiş olabilirsin.',
    reversed:
      'Ters Başrahibe, yakın geçmişte içsel sesini görmezden gelmiş ya da yanıltıcı bilgilere kapılmış olabilirsin.',
    keywords: ['sezgi', 'bilgelik', 'sırlar', 'içsel rehberlik', 'farkındalık'],
    context:
      'Yakın geçmişin, sezgilerini dinlemek ya da reddetmek üzerinden gelişmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ps_pos5',
    card: 'The Empress',
    position: 5,
    upright:
      'İmparatoriçe, yakın geçmişte üretkenlik, yaratıcılık ve ilişkilerde şefkat enerjisi yoğun olmuş olabilir. Bolluk kapılarını açmış olabilirsin.',
    reversed:
      'Ters İmparatoriçe, yakın geçmişte yaratıcılık tıkanıklığı, bağımlı ilişkiler veya kendine bakmayı ihmal etmiş olabilirsin.',
    keywords: ['yaratıcılık', 'bolluk', 'ilişkiler', 'şefkat', 'üretkenlik'],
    context:
      'Yakın geçmişin, bolluk ve üretkenlik ya da tıkanıklıklarla şekillenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ps_pos5',
    card: 'The Emperor',
    position: 5,
    upright:
      'İmparator, yakın geçmişte düzen kurmak, otoriteyi hissetmek ya da güçlü bir yapı inşa etmek enerjisi yaşamış olabilirsin.',
    reversed:
      'Ters İmparator, yakın geçmişte kontrolü kaybetmiş, baskıcı bir figürle karşılaşmış veya kuralsızlık deneyimi yaşamış olabilirsin.',
    keywords: ['otorite', 'düzen', 'kontrol', 'güven', 'yapı'],
    context:
      'Yakın geçmişin, düzen arayışları ya da otorite ile çatışmalarla belirlenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ps_pos5',
    card: 'The Hierophant',
    position: 5,
    upright:
      'Aziz, yakın geçmişte bir öğretiden faydalanmış, manevi destek bulmuş ya da toplumun kurallarına uyum sağlamış olabilirsin.',
    reversed:
      'Ters Aziz, yakın geçmişte geleneklere başkaldırmış, kuralları reddetmiş veya rehberlikten uzak kalmış olabilirsin.',
    keywords: ['öğreti', 'gelenek', 'maneviyat', 'otorite', 'uyum'],
    context:
      'Yakın geçmişin, otoriteye uyum sağlamak ya da ona karşı çıkmak üzerinden gelişmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos5',
    card: 'The Lovers',
    position: 5,
    upright:
      'Aşıklar, yakın geçmişte önemli bir seçim yapmış, kalbinle uyumlu bir ilişkiye adım atmış ya da değerlerini netleştirmiş olabilirsin.',
    reversed:
      'Ters Aşıklar, yakın geçmişte yanlış seçimler, uyumsuz ilişkiler ya da kararsızlıklar yaşamış olabilirsin.',
    keywords: ['seçim', 'ilişki', 'uyum', 'karar', 'değerler'],
    context:
      'Yakın geçmişin, seçimler ve ilişkiler etrafında şekillenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ps_pos5',
    card: 'The Chariot',
    position: 5,
    upright:
      'Savaş Arabası, yakın geçmişte iradeni güçlendirmiş, hedeflerine odaklanmış ve kararlılıkla yol almış olabilirsin.',
    reversed:
      'Ters Savaş Arabası, yakın geçmişte yönsüzlük, kontrol kaybı ya da dağınık enerji yaşamış olabilirsin.',
    keywords: ['irade', 'hedef', 'kararlılık', 'kontrol', 'ilerleyiş'],
    context:
      'Yakın geçmişin, odaklanma ya da odaksızlık üzerinden gelişmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ps_pos5',
    card: 'Strength',
    position: 5,
    upright:
      'Güç, yakın geçmişte cesaretini göstermiş, sabırla ilerlemiş ve içsel dengeyi bulmuş olabilirsin.',
    reversed:
      'Ters Güç, yakın geçmişte güvensizlik, öfke kontrolü kaybı veya cesaretsizlik yaşamış olabilirsin.',
    keywords: ['cesaret', 'denge', 'sabır', 'güven', 'irade'],
    context:
      'Yakın geçmişin, cesaret ya da güvensizlik deneyimleriyle belirlenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ps_pos5',
    card: 'The Hermit',
    position: 5,
    upright:
      'Ermiş, yakın geçmişte içsel bir yolculuğa çıkmış, yalnız kalmış ya da bilgelik arayışıyla inzivaya yönelmiş olabilirsin.',
    reversed:
      'Ters Ermiş, yakın geçmişte aşırı izolasyon, rehbersizlik ya da yalnızlıktan doğan sıkışmışlık yaşamış olabilirsin.',
    keywords: ['bilgelik', 'yalnızlık', 'rehberlik', 'içsel arayış', 'inziva'],
    context:
      'Yakın geçmişin, içsel yolculuklar ya da yalnızlık deneyimleriyle şekillenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ps_pos5',
    card: 'Wheel of Fortune',
    position: 5,
    upright:
      'Kader Çarkı, yakın geçmişte yaşamında ani değişimler, kaderin döngüleri veya fırsatların açığa çıkması söz konusu olmuş olabilir.',
    reversed:
      'Ters Kader Çarkı, yakın geçmişte şanssızlık, yanlış zamanlama ya da tekrarlayan döngüler yaşamış olabilirsin.',
    keywords: ['kader', 'fırsat', 'değişim', 'zamanlama', 'döngü'],
    context:
      'Yakın geçmişin, şanslı ya da şanssız döngüler üzerinden gelişmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ps_pos5',
    card: 'Justice',
    position: 5,
    upright:
      'Adalet, yakın geçmişte adil bir karar vermiş, gerçeği ortaya çıkarmış veya dengeyi sağlamış olabilirsin.',
    reversed:
      'Ters Adalet, yakın geçmişte haksızlığa uğramış, yanılgı yaşamış ya da dürüstlükten sapmış olabilirsin.',
    keywords: ['adalet', 'denge', 'karar', 'dürüstlük', 'gerçek'],
    context:
      'Yakın geçmişin, adaletli ya da adaletsiz durumlarla belirlenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ps_pos5',
    card: 'The Hanged Man',
    position: 5,
    upright:
      'Asılan Adam, yakın geçmişte bakış açını değiştirmiş, fedakârlık yapmış veya yeni bir anlayış kazanmış olabilirsin.',
    reversed:
      'Ters Asılan Adam, yakın geçmişte inatçılık, direnç ya da teslimiyetsizlik yaşamış olabilirsin.',
    keywords: ['bakış açısı', 'teslimiyet', 'fedakârlık', 'kabul', 'öğrenme'],
    context:
      'Yakın geçmişin, bakış açısı değişiklikleri ya da dirençlerle şekillenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ps_pos5',
    card: 'Death',
    position: 5,
    upright:
      'Ölüm, yakın geçmişte bir dönemi kapatmış, köklü bir dönüşüm yaşamış veya eskiyi geride bırakmış olabilirsin.',
    reversed:
      'Ters Ölüm, yakın geçmişte değişim korkusu, bitişleri reddetme ya da kapanmamış süreçler yaşamış olabilirsin.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'cesaret', 'kapanış'],
    context:
      'Yakın geçmişin, dönüşüm ya da dönüşüm korkuları ile belirlenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ps_pos5',
    card: 'Temperance',
    position: 5,
    upright:
      'Denge, yakın geçmişte uyum aramış, sabır göstermiş veya ölçülülükle ilerlemiş olabilirsin.',
    reversed:
      'Ters Denge, yakın geçmişte aşırılıklar, dengesizlik ya da sabırsızlık yaşamış olabilirsin.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'dengeleyici'],
    context:
      'Yakın geçmişin, uyum ya da uyumsuzluk deneyimleriyle şekillenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ps_pos5',
    card: 'The Devil',
    position: 5,
    upright:
      'Şeytan, yakın geçmişte bağımlılıkların, korkuların ya da kısıtlayıcı durumların etkisi altında kalmış olabilirsin.',
    reversed:
      'Ters Şeytan, yakın geçmişte zincirlerinden kurtulmuş, özgürlüğünü kazanmış veya bağımlılıklardan sıyrılmış olabilirsin.',
    keywords: ['bağımlılık', 'korku', 'özgürlük', 'kısıtlama', 'farkındalık'],
    context:
      'Yakın geçmişin, bağımlılıklar ya da özgürleşmeler üzerinden gelişmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ps_pos5',
    card: 'The Tower',
    position: 5,
    upright:
      'Kule, yakın geçmişte ani bir kriz, yıkım veya beklenmedik bir değişim yaşamış olabilirsin. Bu, seni yeni bir yön arayışına itmiş olabilir.',
    reversed:
      'Ters Kule, yakın geçmişte krizlerden kaçınmış, yıkımı ertelemiş ya da değişimi reddetmiş olabilirsin.',
    keywords: ['kriz', 'yıkım', 'değişim', 'dönüşüm', 'şok'],
    context:
      'Yakın geçmişin, krizlerle ya da krizden kaçışlarla şekillenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ps_pos5',
    card: 'The Star',
    position: 5,
    upright:
      'Yıldız, yakın geçmişte umutlarını tazelemiş, ilham bulmuş veya ruhsal bir yenilenme yaşamış olabilirsin.',
    reversed:
      'Ters Yıldız, yakın geçmişte umutsuzluk, güvensizlik ya da ilham kaybı yaşamış olabilirsin.',
    keywords: ['umut', 'ilham', 'yenilenme', 'ruh', 'güven'],
    context:
      'Yakın geçmişin, umut ya da umutsuzluk üzerinden belirlenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ps_pos5',
    card: 'The Moon',
    position: 5,
    upright:
      'Ay, yakın geçmişte belirsizlik, korkular veya yanıltıcı durumlar yaşamış olabilirsin.',
    reversed:
      'Ters Ay, yakın geçmişte yanlış anlamalar, aldatılma ya da yanılsamalarla yüzleşmiş olabilirsin.',
    keywords: ['belirsizlik', 'korku', 'yanılsama', 'sezgi', 'karışıklık'],
    context:
      'Yakın geçmişin, belirsizlikler ve yanılsamalarla şekillenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos5',
    card: 'The Sun',
    position: 5,
    upright:
      'Güneş, yakın geçmişte mutluluk, başarı ve aydınlanma enerjisi yaşamış olabilirsin.',
    reversed:
      'Ters Güneş, yakın geçmişte karamsarlık, başarıların engellenmesi veya özgüven eksikliği yaşamış olabilirsin.',
    keywords: ['mutluluk', 'başarı', 'özgüven', 'aydınlanma', 'neşe'],
    context:
      'Yakın geçmişin, mutluluk ya da karamsarlıkla belirlenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos5',
    card: 'Judgement',
    position: 5,
    upright:
      'Mahkeme, yakın geçmişte önemli bir farkındalık yaşamış, geçmişle yüzleşmiş veya güçlü bir karar almış olabilirsin.',
    reversed:
      'Ters Mahkeme, yakın geçmişte sorumluluktan kaçmış, geçmişi inkâr etmiş veya fırsatları görmezden gelmiş olabilirsin.',
    keywords: ['farkındalık', 'karar', 'yüzleşme', 'geçmiş', 'yenilenme'],
    context:
      'Yakın geçmişin, farkındalıklar ya da kaçışlarla şekillenmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos5',
    card: 'The World',
    position: 5,
    upright:
      'Dünya, yakın geçmişte bir döngüyü tamamlamış, başarı elde etmiş ya da bütünlük hissi yaşamış olabilirsin.',
    reversed:
      'Ters Dünya, yakın geçmişte yarım kalan işler, kapanmamış süreçler ya da eksiklikler yaşamış olabilirsin.',
    keywords: ['tamamlanma', 'başarı', 'bütünlük', 'döngü', 'kapanış'],
    context:
      'Yakın geçmişin, tamamlanmalar ya da yarım kalmışlıklarla belirlenmiş olabilir.',
    group: 'Majör Arkana',
  },
  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_ps_pos5',
    card: 'Ace of Cups',
    position: 5,
    upright:
      'Kupa Ası, yakın geçmişte kalbini açtığın, duygusal bir başlangıç yaşadığın ya da ilhamla dolduğun bir dönemden geçtiğini gösterir.',
    reversed:
      'Ters Kupa Ası, yakın geçmişte duygusal bir hayal kırıklığı, kalp kapanması ya da sevgiyi tam ifade edememe yaşamış olabilirsin.',
    keywords: ['başlangıç', 'duygu', 'ilham', 'sevgi', 'açılma'],
    context:
      'Yakın geçmişin, duygusal açılımlar ya da kapanmalarla şekillenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ps_pos5',
    card: 'Two of Cups',
    position: 5,
    upright:
      'İki Kupa, yakın geçmişte bir ortaklık, dostluk veya romantik bağ güçlenmiş olabilir.',
    reversed:
      'Ters İki Kupa, yakın geçmişte uyumsuzluk, anlaşmazlık veya bağların kopması söz konusu olmuş olabilir.',
    keywords: ['ilişki', 'ortaklık', 'bağ', 'uyum', 'dostluk'],
    context:
      'Yakın geçmişin, ilişkilerde bağların kurulması ya da kopması üzerinden gelişmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ps_pos5',
    card: 'Three of Cups',
    position: 5,
    upright:
      'Üç Kupa, yakın geçmişte bir kutlama, dostlarla buluşma ya da sosyal destek ağı içinde keyifli anlar yaşamış olabilirsin.',
    reversed:
      'Ters Üç Kupa, yakın geçmişte sosyal çevreden uzaklaşma, yanlış anlaşılmalar ya da yalnızlık hissi yaşamış olabilirsin.',
    keywords: ['kutlama', 'topluluk', 'destek', 'sosyal', 'keyif'],
    context:
      'Yakın geçmişin, sosyal bağların güçlenmesi ya da zayıflamasıyla şekillenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ps_pos5',
    card: 'Four of Cups',
    position: 5,
    upright:
      'Dört Kupa, yakın geçmişte ilgisizlik, tatminsizlik ya da fark edilmeyen fırsatlar içinde bulunmuş olabilirsin.',
    reversed:
      'Ters Dört Kupa, yakın geçmişte yeni fırsatlara açılmış, ilgini tazelemiş ya da dikkatini yeniden kazanmış olabilirsin.',
    keywords: ['tatminsizlik', 'fırsat', 'ilgisizlik', 'uyanış', 'dikkat'],
    context:
      'Yakın geçmişin, fırsatlara kapalı ya da açık olma hali üzerinden belirlenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ps_pos5',
    card: 'Five of Cups',
    position: 5,
    upright:
      'Beş Kupa, yakın geçmişte bir kayıp, pişmanlık ya da hüzün yaşamış olabilirsin.',
    reversed:
      'Ters Beş Kupa, yakın geçmişte yas sürecini geride bırakmaya başlamış, kalan güzellikleri fark etmiş olabilirsin.',
    keywords: ['kayıp', 'pişmanlık', 'yas', 'farkındalık', 'şifa'],
    context:
      'Yakın geçmişin, kayıplar ya da yeniden şifalanma süreçleriyle şekillenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ps_pos5',
    card: 'Six of Cups',
    position: 5,
    upright:
      'Altı Kupa, yakın geçmişte geçmiş anılara dönmüş, nostalji yaşamış ya da çocukluk bağların gündeme gelmiş olabilir.',
    reversed:
      'Ters Altı Kupa, yakın geçmişte geçmişte sıkışıp kalmak, ileriye bakamamak ya da eski bağlardan kopamamak söz konusu olmuş olabilir.',
    keywords: ['geçmiş', 'nostalji', 'anı', 'çocukluk', 'bağ'],
    context:
      'Yakın geçmişin, geçmiş anılar ya da onlardan kopamamak üzerinden belirlenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ps_pos5',
    card: 'Seven of Cups',
    position: 5,
    upright:
      'Yedi Kupa, yakın geçmişte birçok seçenek arasında kalmış, hayallerle uğraşmış ya da kafa karışıklığı yaşamış olabilirsin.',
    reversed:
      'Ters Yedi Kupa, yakın geçmişte seçeneklerini netleştirmiş, hayallerden gerçekçi hedeflere yönelmiş olabilirsin.',
    keywords: ['seçenek', 'hayal', 'karışıklık', 'vizyon', 'netlik'],
    context:
      'Yakın geçmişin, kafa karışıklığı ya da netleşme üzerinden şekillenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ps_pos5',
    card: 'Eight of Cups',
    position: 5,
    upright:
      'Sekiz Kupa, yakın geçmişte seni tatmin etmeyen bir durumu bırakmış, yeni bir arayışa çıkmış olabilirsin.',
    reversed:
      'Ters Sekiz Kupa, yakın geçmişte kopmakta zorlanmış, eski alışkanlıklara dönmüş ya da bırakmakta kararsız kalmış olabilirsin.',
    keywords: ['bırakış', 'arayış', 'tatminsizlik', 'karar', 'yeni yol'],
    context:
      'Yakın geçmişin, bir şeyleri bırakma ya da bırakamama haliyle belirlenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ps_pos5',
    card: 'Nine of Cups',
    position: 5,
    upright:
      'Dokuz Kupa, yakın geçmişte dileklerinin gerçekleşmesi, tatmin veya kişisel mutluluk yaşamış olabilirsin.',
    reversed:
      'Ters Dokuz Kupa, yakın geçmişte yüzeysel tatminler, aşırı beklentiler ya da doyumsuzluk deneyimlemiş olabilirsin.',
    keywords: ['tatmin', 'dilek', 'mutluluk', 'beklenti', 'doyum'],
    context:
      'Yakın geçmişin, tatmin ya da doyumsuzluk deneyimleriyle şekillenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ps_pos5',
    card: 'Ten of Cups',
    position: 5,
    upright:
      'On Kupa, yakın geçmişte aile, dostluk ya da ilişkilerde huzurlu bir uyum yaşamış olabilirsin.',
    reversed:
      'Ters On Kupa, yakın geçmişte ailevi huzursuzluk, uyumsuzluk veya ilişkilerde hayal kırıklığı yaşamış olabilirsin.',
    keywords: ['aile', 'uyum', 'mutluluk', 'ilişki', 'huzur'],
    context:
      'Yakın geçmişin, uyum ya da uyumsuzluk deneyimleriyle belirlenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ps_pos5',
    card: 'Page of Cups',
    position: 5,
    upright:
      'Kupa Prensi, yakın geçmişte yeni bir duygu, yaratıcı ilham ya da samimi bir his deneyimlemiş olabilirsin.',
    reversed:
      'Ters Kupa Prensi, yakın geçmişte hayalcilik, duygusal olgunluk eksikliği ya da dikkatsizlik yaşamış olabilirsin.',
    keywords: ['yaratıcılık', 'his', 'ilham', 'hayalcilik', 'samimiyet'],
    context:
      'Yakın geçmişin, samimi ilhamlar ya da hayalcilikle belirlenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ps_pos5',
    card: 'Knight of Cups',
    position: 5,
    upright:
      'Kupa Şövalyesi, yakın geçmişte romantik bir teklif, hayalci bir girişim ya da idealist bir adım atmış olabilirsin.',
    reversed:
      'Ters Kupa Şövalyesi, yakın geçmişte gerçek dışı beklentiler, tutarsızlık ya da yanıltıcı tekliflerle karşılaşmış olabilirsin.',
    keywords: ['romantizm', 'teklif', 'idealizm', 'hayal', 'adım'],
    context:
      'Yakın geçmişin, romantik girişimler ya da yanıltıcı adımlarla belirlenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ps_pos5',
    card: 'Queen of Cups',
    position: 5,
    upright:
      'Kupa Kraliçesi, yakın geçmişte empati, şefkat ya da duygusal destek enerjisi yaşamış olabilirsin.',
    reversed:
      'Ters Kupa Kraliçesi, yakın geçmişte aşırı hassasiyet, bağımlılık ya da duygusal dengesizlik deneyimlemiş olabilirsin.',
    keywords: ['empati', 'şefkat', 'destek', 'hassasiyet', 'denge'],
    context:
      'Yakın geçmişin, şefkat ya da duygusal dalgalanmalarla belirlenmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ps_pos5',
    card: 'King of Cups',
    position: 5,
    upright:
      'Kupa Kralı, yakın geçmişte duygusal olgunluk, sakinlik ya da bilgece rehberlik yaşamış olabilirsin.',
    reversed:
      'Ters Kupa Kralı, yakın geçmişte duygusal kontrolsüzlük, bastırılmış öfke ya da güvensizlik yaşamış olabilirsin.',
    keywords: ['olgunluk', 'sükunet', 'denge', 'rehberlik', 'duygu'],
    context:
      'Yakın geçmişin, duygusal olgunluk ya da dengesizliklerle şekillenmiş olabilir.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_ps_pos5',
    card: 'Ace of Swords',
    position: 5,
    upright:
      'Kılıç Ası, yakın geçmişte zihinsel bir aydınlanma, netlik ya da güçlü bir karar vermiş olabileceğini gösterir.',
    reversed:
      'Ters Kılıç Ası, yakın geçmişte kafa karışıklığı, yanlış iletişim ya da netlik eksikliği yaşamış olabilirsin.',
    keywords: ['netlik', 'karar', 'iletişim', 'aydınlanma', 'zihin'],
    context:
      'Yakın geçmişin, zihinsel netlik ya da kafa karışıklıklarıyla şekillenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ps_pos5',
    card: 'Two of Swords',
    position: 5,
    upright:
      'İki Kılıç, yakın geçmişte bir ikilem yaşamış, karar vermekte zorlanmış ya da gözlerini gerçeklerden kapamış olabilirsin.',
    reversed:
      'Ters İki Kılıç, yakın geçmişte zor bir kararı ertelemiş, kararsızlıkta sıkışmış ya da aceleyle yanlış seçim yapmış olabilirsin.',
    keywords: ['kararsızlık', 'ikilem', 'seçim', 'denge', 'görmezden gelmek'],
    context:
      'Yakın geçmişin, karar alma ya da erteleme süreçleriyle belirlenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ps_pos5',
    card: 'Three of Swords',
    position: 5,
    upright:
      'Üç Kılıç, yakın geçmişte bir kalp kırıklığı, ihanet ya da duygusal acı yaşamış olabileceğini gösterir.',
    reversed:
      'Ters Üç Kılıç, yakın geçmişte eski acıları geride bırakmaya çalışmış, affediş ya da toparlanma sürecine girmiş olabilirsin.',
    keywords: ['kalp kırıklığı', 'ihanet', 'acı', 'affediş', 'yaralar'],
    context:
      'Yakın geçmişin, acı verici deneyimler ya da şifalanma süreçleriyle şekillenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ps_pos5',
    card: 'Four of Swords',
    position: 5,
    upright:
      'Dört Kılıç, yakın geçmişte dinlenme, inziva ya da zihinsel toparlanma süreci yaşamış olabilirsin.',
    reversed:
      'Ters Dört Kılıç, yakın geçmişte aşırı yorgunluk, tükenmişlik ya da toparlanmayı ihmal etmiş olabilirsin.',
    keywords: ['dinlenme', 'toparlanma', 'zihin', 'iyileşme', 'inziva'],
    context:
      'Yakın geçmişin, dinlenme ya da tükenmişlik süreçleriyle şekillenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ps_pos5',
    card: 'Five of Swords',
    position: 5,
    upright:
      'Beş Kılıç, yakın geçmişte bir tartışma, çatışma ya da gurur savaşları yaşamış olabileceğini gösterir.',
    reversed:
      'Ters Beş Kılıç, yakın geçmişte uzlaşma arayışı, affetme ya da çatışmaları geride bırakma çabası olmuş olabilir.',
    keywords: ['çatışma', 'gurur', 'kayıp', 'uzlaşma', 'gerilim'],
    context:
      'Yakın geçmişin, çatışmalar ya da barış arayışlarıyla belirlenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ps_pos5',
    card: 'Six of Swords',
    position: 5,
    upright:
      'Altı Kılıç, yakın geçmişte bir yolculuk, taşınma ya da geçmişten uzaklaşma çabası yaşamış olabilirsin.',
    reversed:
      'Ters Altı Kılıç, yakın geçmişte geçmişe bağlı kalma, ilerleyememe ya da geçiş sürecinde tıkanma yaşamış olabilirsin.',
    keywords: ['geçiş', 'yolculuk', 'ilerleme', 'kaçış', 'geçmiş'],
    context:
      'Yakın geçmişin, ilerleyiş ya da geçmişe bağlılık üzerinden şekillenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ps_pos5',
    card: 'Seven of Swords',
    position: 5,
    upright:
      'Yedi Kılıç, yakın geçmişte gizlilik, saklı planlar ya da aldatıcı davranışlarla yüzleşmiş olabileceğini gösterir.',
    reversed:
      'Ters Yedi Kılıç, yakın geçmişte sırların açığa çıkması, dürüstlük ya da hesaplaşma süreci yaşamış olabilirsin.',
    keywords: ['gizlilik', 'hile', 'sırlar', 'strateji', 'güven'],
    context:
      'Yakın geçmişin, gizli durumlar ya da dürüstleşme süreçleriyle belirlenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ps_pos5',
    card: 'Eight of Swords',
    position: 5,
    upright:
      'Sekiz Kılıç, yakın geçmişte kendini sınırlanmış, çaresiz ya da baskı altında hissetmiş olabilirsin.',
    reversed:
      'Ters Sekiz Kılıç, yakın geçmişte zihinsel zincirlerinden kurtulmaya başlamış ya da özgürlüğünü geri kazanmış olabilirsin.',
    keywords: ['sınırlama', 'çaresizlik', 'özgürlük', 'zihin', 'korku'],
    context:
      'Yakın geçmişin, çaresizlik ya da özgürleşme süreçleriyle şekillenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ps_pos5',
    card: 'Nine of Swords',
    position: 5,
    upright:
      'Dokuz Kılıç, yakın geçmişte yoğun kaygılar, uykusuz geceler ya da suçluluk duyguları yaşamış olabilirsin.',
    reversed:
      'Ters Dokuz Kılıç, yakın geçmişte kaygılarla yüzleşmiş, kabusları geride bırakmaya başlamış ya da destek aramış olabilirsin.',
    keywords: ['kaygı', 'stres', 'kabus', 'suçluluk', 'yüzleşme'],
    context:
      'Yakın geçmişin, kaygı ya da yüzleşme deneyimleriyle şekillenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ps_pos5',
    card: 'Ten of Swords',
    position: 5,
    upright:
      'On Kılıç, yakın geçmişte bir bitiş, ihanet ya da yıkıcı bir deneyim yaşamış olabileceğini gösterir.',
    reversed:
      'Ters On Kılıç, yakın geçmişte toparlanmaya başlamış, travmaları geride bırakma ya da yeniden doğma sürecine girmiş olabilirsin.',
    keywords: ['bitiş', 'ihanet', 'yeniden doğuş', 'kayıp', 'travma'],
    context:
      'Yakın geçmişin, bitişler ya da yeniden doğuş süreçleriyle şekillenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ps_pos5',
    card: 'Page of Swords',
    position: 5,
    upright:
      'Kılıç Prensi, yakın geçmişte merak, öğrenme isteği ya da yeni bir fikri araştırma enerjisi yaşamış olabilirsin.',
    reversed:
      'Ters Kılıç Prensi, yakın geçmişte dedikodular, yanlış bilgi ya da dikkatsizlik yaşamış olabilirsin.',
    keywords: ['merak', 'öğrenme', 'iletişim', 'zeka', 'dikkat'],
    context:
      'Yakın geçmişin, öğrenme ya da dikkatsizlik deneyimleriyle belirlenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ps_pos5',
    card: 'Knight of Swords',
    position: 5,
    upright:
      'Kılıç Şövalyesi, yakın geçmişte aceleci davranmış, hızlı kararlar almış ya da cesur adımlar atmış olabilirsin.',
    reversed:
      'Ters Kılıç Şövalyesi, yakın geçmişte yönsüzlük, dikkatsizlik ya da sabırsızlık yaşamış olabilirsin.',
    keywords: ['acelecilik', 'cesaret', 'hareket', 'sabırsızlık', 'hedef'],
    context:
      'Yakın geçmişin, acelecilik ya da yönsüzlükle belirlenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ps_pos5',
    card: 'Queen of Swords',
    position: 5,
    upright:
      'Kılıç Kraliçesi, yakın geçmişte objektif davranmış, mantığını ön planda tutmuş ya da bağımsız bir tavır sergilemiş olabilirsin.',
    reversed:
      'Ters Kılıç Kraliçesi, yakın geçmişte soğukluk, eleştirellik ya da anlayışsızlık deneyimi yaşamış olabilirsin.',
    keywords: ['mantık', 'bağımsızlık', 'objektiflik', 'soğukluk', 'eleştiri'],
    context:
      'Yakın geçmişin, objektiflik ya da duygusal mesafeyle şekillenmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ps_pos5',
    card: 'King of Swords',
    position: 5,
    upright:
      'Kılıç Kralı, yakın geçmişte mantıklı kararlar almış, adaletli davranmış ya da otorite sergilemiş olabilirsin.',
    reversed:
      'Ters Kılıç Kralı, yakın geçmişte baskıcı davranışlar, soğukluk ya da adaletsizlik yaşamış olabilirsin.',
    keywords: ['otorite', 'adalet', 'karar', 'mantık', 'soğukluk'],
    context:
      'Yakın geçmişin, adaletli ya da adaletsiz otoriteyle belirlenmiş olabilir.',
    group: 'Kılıçlar',
  },
  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_ps_pos5',
    card: 'Ace of Pentacles',
    position: 5,
    upright:
      'Tılsım Ası, yakın geçmişte yeni bir fırsat, iş ya da maddi bir başlangıç gündeme gelmiş olabilir. Güçlü temeller atma enerjisi taşırsın.',
    reversed:
      'Ters Tılsım Ası, yakın geçmişte kaçırılan bir fırsat, yanlış yatırım ya da istikrar sağlayamama yaşamış olabilirsin.',
    keywords: ['fırsat', 'başlangıç', 'bolluk', 'yatırım', 'istikrar'],
    context:
      'Yakın geçmişin, maddi fırsatları değerlendirmek ya da kaçırmakla şekillenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ps_pos5',
    card: 'Two of Pentacles',
    position: 5,
    upright:
      'İki Tılsım, yakın geçmişte birden fazla işi, sorumluluğu veya süreci dengelemeye çalışmış olabilirsin.',
    reversed:
      'Ters İki Tılsım, yakın geçmişte sorumlulukların arasında sıkışmış, dengesizlik yaşamış ya da öncelikleri karıştırmış olabilirsin.',
    keywords: ['denge', 'sorumluluk', 'esneklik', 'öncelik', 'yoğunluk'],
    context:
      'Yakın geçmişin, dengeyi sağlamak ya da sağlayamamak üzerinden şekillenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ps_pos5',
    card: 'Three of Pentacles',
    position: 5,
    upright:
      'Üç Tılsım, yakın geçmişte işbirliği, ekip çalışması ya da ortak projelerde başarı deneyimlemiş olabilirsin.',
    reversed:
      'Ters Üç Tılsım, yakın geçmişte uyumsuzluk, ekip içi anlaşmazlık ya da destek görememe söz konusu olmuş olabilir.',
    keywords: ['işbirliği', 'uyum', 'başarı', 'ekip', 'ortaklık'],
    context:
      'Yakın geçmişin, işbirliği ya da uyumsuzluk deneyimleriyle şekillenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ps_pos5',
    card: 'Four of Pentacles',
    position: 5,
    upright:
      'Dört Tılsım, yakın geçmişte sahip olduklarını koruma, güvence arayışı ya da kontrollü hareket etme eğiliminde olmuş olabilirsin.',
    reversed:
      'Ters Dört Tılsım, yakın geçmişte aşırı tutuculuk, cimrilik ya da kaybetme korkusu yaşamış olabilirsin.',
    keywords: ['güvence', 'kontrol', 'tutuculuk', 'korku', 'koruma'],
    context:
      'Yakın geçmişin, güvence arayışları ya da aşırı kontrollülükle belirlenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ps_pos5',
    card: 'Five of Pentacles',
    position: 5,
    upright:
      'Beş Tılsım, yakın geçmişte maddi zorluk, yalnızlık ya da desteğin eksikliği yaşamış olabilirsin.',
    reversed:
      'Ters Beş Tılsım, yakın geçmişte destek almış, maddi sıkıntılardan çıkış yolu bulmuş ya da güvenini tazelemiş olabilirsin.',
    keywords: ['zorluk', 'yalnızlık', 'maddi sıkıntı', 'destek', 'güven'],
    context:
      'Yakın geçmişin, zorluklardan çıkmak ya da destek bulmakla şekillenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ps_pos5',
    card: 'Six of Pentacles',
    position: 5,
    upright:
      'Altı Tılsım, yakın geçmişte yardım almak ya da başkalarına destek olmak, alma-verme dengesini deneyimlemek söz konusu olmuş olabilir.',
    reversed:
      'Ters Altı Tılsım, yakın geçmişte eşitsiz bir ilişki, tek taraflı bir destek ya da sömürü hissi yaşamış olabilirsin.',
    keywords: ['yardım', 'denge', 'paylaşım', 'eşitlik', 'alma-verme'],
    context:
      'Yakın geçmişin, yardımlaşma ya da dengesizliklerle belirlenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ps_pos5',
    card: 'Seven of Pentacles',
    position: 5,
    upright:
      'Yedi Tılsım, yakın geçmişte sabırla bir süreci gözlemlemiş, emek vermiş ya da uzun vadeli planlara yönelmiş olabilirsin.',
    reversed:
      'Ters Yedi Tılsım, yakın geçmişte sabırsızlık, boşuna harcanan emek ya da tatminsizlik yaşamış olabilirsin.',
    keywords: ['sabır', 'emek', 'bekleyiş', 'yatırım', 'plan'],
    context:
      'Yakın geçmişin, sabır ya da sabırsızlık deneyimleriyle şekillenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ps_pos5',
    card: 'Eight of Pentacles',
    position: 5,
    upright:
      'Sekiz Tılsım, yakın geçmişte çalışkanlık, yeni bir beceri öğrenmek ya da ustalaşma yolunda ilerlemek söz konusu olmuş olabilir.',
    reversed:
      'Ters Sekiz Tılsım, yakın geçmişte özensizlik, motivasyon kaybı ya da aynı hataları tekrar etme yaşamış olabilirsin.',
    keywords: ['çalışma', 'öğrenme', 'ustalık', 'motivasyon', 'beceri'],
    context:
      'Yakın geçmişin, çalışkanlık ya da özensizlikle belirlenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ps_pos5',
    card: 'Nine of Pentacles',
    position: 5,
    upright:
      'Dokuz Tılsım, yakın geçmişte bağımsızlık kazanmış, kendi emeğinin meyvesini tatmış ya da öz güvenini pekiştirmiş olabilirsin.',
    reversed:
      'Ters Dokuz Tılsım, yakın geçmişte bağımlılık, yalnızlık korkusu ya da aşırı lüks arayışı yaşamış olabilirsin.',
    keywords: ['bağımsızlık', 'özgüven', 'başarı', 'tatmin', 'bolluk'],
    context:
      'Yakın geçmişin, bağımsızlık ya da bağımlılık deneyimleriyle şekillenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ps_pos5',
    card: 'Ten of Pentacles',
    position: 5,
    upright:
      'On Tılsım, yakın geçmişte ailevi huzur, maddi istikrar ya da uzun vadeli güvence yaşamış olabilirsin.',
    reversed:
      'Ters On Tılsım, yakın geçmişte aile içi huzursuzluk, miras sorunları ya da kalıcı istikrarı sağlayamama yaşamış olabilirsin.',
    keywords: ['aile', 'istikrar', 'bolluk', 'miras', 'güvence'],
    context:
      'Yakın geçmişin, kalıcı istikrar ya da huzursuzluklarla belirlenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ps_pos5',
    card: 'Page of Pentacles',
    position: 5,
    upright:
      'Tılsım Prensi, yakın geçmişte yeni bir eğitim, iş fırsatı ya da planlama süreci başlamış olabilir.',
    reversed:
      'Ters Tılsım Prensi, yakın geçmişte dikkatsizlik, motivasyon kaybı ya da yarım kalmış projeler yaşamış olabilirsin.',
    keywords: ['öğrenme', 'plan', 'başlangıç', 'fırsat', 'motivasyon'],
    context:
      'Yakın geçmişin, planlama ya da dikkatsizlikle şekillenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ps_pos5',
    card: 'Knight of Pentacles',
    position: 5,
    upright:
      'Tılsım Şövalyesi, yakın geçmişte azim, sabır ve disiplinle istikrarlı bir ilerleme sağlamış olabilirsin.',
    reversed:
      'Ters Tılsım Şövalyesi, yakın geçmişte durağanlık, motivasyon kaybı ya da işlerde aşırı yavaşlık yaşamış olabilirsin.',
    keywords: ['sabır', 'azim', 'istikrar', 'çalışkanlık', 'disiplin'],
    context:
      'Yakın geçmişin, azim ya da durağanlıkla belirlenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ps_pos5',
    card: 'Queen of Pentacles',
    position: 5,
    upright:
      'Tılsım Kraliçesi, yakın geçmişte üretkenlik, şefkat ya da ailevi sorumluluklar ön plana çıkmış olabilir.',
    reversed:
      'Ters Tılsım Kraliçesi, yakın geçmişte savurganlık, öz bakım eksikliği ya da kaynak yönetiminde zorluk yaşamış olabilirsin.',
    keywords: ['üretkenlik', 'şefkat', 'kaynak yönetimi', 'aile', 'sorumluluk'],
    context:
      'Yakın geçmişin, üretkenlik ya da öz bakım eksikliğiyle şekillenmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ps_pos5',
    card: 'King of Pentacles',
    position: 5,
    upright:
      'Tılsım Kralı, yakın geçmişte maddi başarı, güçlü bir düzen ya da liderlik sergilemiş olabilirsin.',
    reversed:
      'Ters Tılsım Kralı, yakın geçmişte hırs, otoriterlik ya da doyumsuzluk yaşamış olabilirsin.',
    keywords: ['başarı', 'düzen', 'bolluk', 'liderlik', 'hırs'],
    context:
      'Yakın geçmişin, başarı ya da doyumsuzluk deneyimleriyle şekillenmiş olabilir.',
    group: 'Tılsımlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_ps_pos5',
    card: 'Ace of Wands',
    position: 5,
    upright:
      'Değnek Ası, yakın geçmişte yeni bir ilham, yaratıcı bir kıvılcım veya güçlü bir başlangıç enerjisi yaşamış olabilirsin.',
    reversed:
      'Ters Değnek Ası, yakın geçmişte ilham eksikliği, ertelenen başlangıçlar veya enerjide bir durgunluk yaşamış olabilirsin.',
    keywords: ['başlangıç', 'ilham', 'yaratıcılık', 'tutku', 'kıvılcım'],
    context:
      'Yakın geçmişin, yaratıcı bir kıvılcım ya da ilham eksikliğiyle şekillenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ps_pos5',
    card: 'Two of Wands',
    position: 5,
    upright:
      'İki Değnek, yakın geçmişte geleceğe dair planlar yapmış, yeni yollar düşünmüş veya ufkunu genişletmiş olabilirsin.',
    reversed:
      'Ters İki Değnek, yakın geçmişte karar verememe, risk alamama veya dar bir perspektifte sıkışma yaşamış olabilirsin.',
    keywords: ['plan', 'vizyon', 'gelecek', 'karar', 'ufuk'],
    context:
      'Yakın geçmişin, planlar ya da kararsızlıklarla belirlenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ps_pos5',
    card: 'Three of Wands',
    position: 5,
    upright:
      'Üç Değnek, yakın geçmişte attığın adımların sonuçlarını görmeye başlamış, yeni fırsatlara açılmış olabilirsin.',
    reversed:
      'Ters Üç Değnek, yakın geçmişte engeller, gecikmeler veya vizyon kaybı yaşamış olabilirsin.',
    keywords: ['fırsat', 'ilerleme', 'vizyon', 'keşif', 'bekleyiş'],
    context:
      'Yakın geçmişin, fırsatların gelişmesi ya da gecikmelerle şekillenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ps_pos5',
    card: 'Four of Wands',
    position: 5,
    upright:
      'Dört Değnek, yakın geçmişte bir kutlama, ev ya da iş yaşamında denge ve uyum deneyimlemiş olabilirsin.',
    reversed:
      'Ters Dört Değnek, yakın geçmişte huzursuzluk, uyumsuzluk veya tamamlanmamış bir süreç yaşamış olabilirsin.',
    keywords: ['kutlama', 'uyum', 'denge', 'huzur', 'tamamlanma'],
    context:
      'Yakın geçmişin, uyum ya da huzursuzluk deneyimleriyle şekillenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ps_pos5',
    card: 'Five of Wands',
    position: 5,
    upright:
      'Beş Değnek, yakın geçmişte rekabet, anlaşmazlık veya fikir ayrılıkları yaşamış olabilirsin.',
    reversed:
      'Ters Beş Değnek, yakın geçmişte bir çatışmayı çözmüş, rekabeti azaltmış ya da işbirliğine yönelmiş olabilirsin.',
    keywords: ['rekabet', 'çatışma', 'mücadele', 'işbirliği', 'gerilim'],
    context:
      'Yakın geçmişin, mücadele ya da işbirliği süreçleriyle belirlenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ps_pos5',
    card: 'Six of Wands',
    position: 5,
    upright:
      'Altı Değnek, yakın geçmişte bir zafer, başarı ya da takdir edilme yaşamış olabilirsin.',
    reversed:
      'Ters Altı Değnek, yakın geçmişte hak ettiğin değeri görememiş, başarısızlık korkusu ya da özgüven eksikliği yaşamış olabilirsin.',
    keywords: ['zafer', 'başarı', 'takdir', 'özgüven', 'güven'],
    context:
      'Yakın geçmişin, başarı ya da özgüven eksikliğiyle şekillenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ps_pos5',
    card: 'Seven of Wands',
    position: 5,
    upright:
      'Yedi Değnek, yakın geçmişte kendini savunmuş, duruşunu korumuş veya rekabet içinde direnmiş olabilirsin.',
    reversed:
      'Ters Yedi Değnek, yakın geçmişte savunmasız kalmış, mücadeleden yorulmuş ya da geri çekilmiş olabilirsin.',
    keywords: ['savunma', 'mücadele', 'kararlılık', 'direniş', 'cesaret'],
    context:
      'Yakın geçmişin, kararlılık ya da geri çekilme ile şekillenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ps_pos5',
    card: 'Eight of Wands',
    position: 5,
    upright:
      'Sekiz Değnek, yakın geçmişte hızlı gelişmeler, haberler veya ani değişimler yaşamış olabilirsin.',
    reversed:
      'Ters Sekiz Değnek, yakın geçmişte gecikmeler, iletişim sorunları ya da ilerleyememe yaşamış olabilirsin.',
    keywords: ['hız', 'haber', 'iletişim', 'değişim', 'ilerleme'],
    context:
      'Yakın geçmişin, hızlı gelişmeler ya da gecikmeler üzerinden belirlenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ps_pos5',
    card: 'Nine of Wands',
    position: 5,
    upright:
      'Dokuz Değnek, yakın geçmişte zorluklara karşı direnmiş, sabırla mücadele etmiş ya da sınırlarını korumuş olabilirsin.',
    reversed:
      'Ters Dokuz Değnek, yakın geçmişte yorgunluk, savunmayı bırakma ya da direnmekte zorlanma yaşamış olabilirsin.',
    keywords: ['dayanıklılık', 'mücadele', 'sabır', 'savunma', 'koruma'],
    context:
      'Yakın geçmişin, sabırla direnmek ya da yorgunlukla şekillenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ps_pos5',
    card: 'Ten of Wands',
    position: 5,
    upright:
      'On Değnek, yakın geçmişte ağır sorumluluklar, yükler ya da fazla görev üstlenmiş olabilirsin.',
    reversed:
      'Ters On Değnek, yakın geçmişte sorumluluklarını azaltmış, yüklerinden kurtulmuş ya da aşırı yük altında ezilmiş olabilirsin.',
    keywords: ['yük', 'sorumluluk', 'görev', 'ağırlık', 'mücadele'],
    context:
      'Yakın geçmişin, fazla sorumluluk ya da yüklerden kurtuluşla şekillenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ps_pos5',
    card: 'Page of Wands',
    position: 5,
    upright:
      'Değnek Prensi, yakın geçmişte yeni bir fikir, keşif ya da ilhamla harekete geçmiş olabilirsin.',
    reversed:
      'Ters Değnek Prensi, yakın geçmişte acelecilik, dikkatsizlik ya da motivasyon kaybı yaşamış olabilirsin.',
    keywords: ['ilham', 'keşif', 'başlangıç', 'deneyim', 'öğrenme'],
    context:
      'Yakın geçmişin, yeni fikirler ya da motivasyon kaybıyla şekillenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ps_pos5',
    card: 'Knight of Wands',
    position: 5,
    upright:
      'Değnek Şövalyesi, yakın geçmişte cesaretle harekete geçmiş, maceralara atılmış ya da tutkulu bir girişim yaşamış olabilirsin.',
    reversed:
      'Ters Değnek Şövalyesi, yakın geçmişte sabırsızlık, yönsüzlük ya da dikkatsiz davranışlar yaşamış olabilirsin.',
    keywords: ['cesaret', 'hareket', 'macera', 'tutku', 'enerji'],
    context:
      'Yakın geçmişin, cesaret ya da dikkatsizlikle şekillenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ps_pos5',
    card: 'Queen of Wands',
    position: 5,
    upright:
      'Değnek Kraliçesi, yakın geçmişte özgüvenini ortaya koymuş, çekiciliğini sergilemiş ya da ilham verici bir figür olmuş olabilirsin.',
    reversed:
      'Ters Değnek Kraliçesi, yakın geçmişte güvensizlik, kıskançlık ya da enerjide bir düşüş yaşamış olabilirsin.',
    keywords: ['özgüven', 'çekim', 'ilham', 'liderlik', 'enerji'],
    context:
      'Yakın geçmişin, özgüven ya da güvensizlik deneyimleriyle şekillenmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ps_pos5',
    card: 'King of Wands',
    position: 5,
    upright:
      'Değnek Kralı, yakın geçmişte liderlik sergilemiş, vizyonunu ortaya koymuş ya da çevrene ilham vermiş olabilirsin.',
    reversed:
      'Ters Değnek Kralı, yakın geçmişte aşırı baskıcılık, kontrol etme isteği ya da vizyon eksikliği yaşamış olabilirsin.',
    keywords: ['liderlik', 'vizyon', 'ilham', 'kontrol', 'karizma'],
    context:
      'Yakın geçmişin, liderlik ya da kontrol saplantısıyla belirlenmiş olabilir.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition5Meaning(
  card: TarotCard
): ProblemSolvingPosition5Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position5Meanings.find(m => 
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
  meaning = position5Meanings.find(m => m.card === englishName);
  
  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition5MeaningByCardName(
  cardName: string
): ProblemSolvingPosition5Meaning | null {
  return position5Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllProblemSolvingPosition5Meanings(): ProblemSolvingPosition5Meaning[] {
  return position5Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getProblemSolvingPosition5MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): ProblemSolvingPosition5Meaning[] {
  return position5Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition5Meanings = (): I18nProblemSolvingPosition5Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position5Meanings.map(meaning => {
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
      export const getI18nPosition5Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nProblemSolvingPosition5Meaning | null => {
  const originalMeaning = position5Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `problem-solving.meanings.${cardKey}.position5.upright`
  );
  const i18nReversed = t(
    `problem-solving.meanings.${cardKey}.position5.reversed`
  );
  const i18nKeywords = t(
    `problem-solving.meanings.${cardKey}.position5.keywords`
  );
  const i18nContext = t(
    `problem-solving.meanings.${cardKey}.position5.context`
  );
  const i18nGroup = t(
    `problem-solving.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
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
const problemSolvingPosition5Exports = {
  position5Meanings,
  getProblemSolvingPosition5Meaning,
  getProblemSolvingPosition5MeaningByCardName,
  getAllProblemSolvingPosition5Meanings,
  getProblemSolvingPosition5MeaningsByGroup,
  getI18nPosition5Meaning,
};

export default problemSolvingPosition5Exports;
