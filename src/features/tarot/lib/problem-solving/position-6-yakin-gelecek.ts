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

export interface ProblemSolvingPosition6Meaning {
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
export interface I18nProblemSolvingPosition6Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position6Meanings: ProblemSolvingPosition6Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ps_pos6',
    card: 'The Fool',
    position: 6,
    upright:
      'Joker, yakın gelecekte yeni bir macera, bilinmezliklere adım atma ve özgürce risk alma enerjisi seni bekliyor olabilir.',
    reversed:
      'Ters Joker, yakın gelecekte dikkatsizlik, acele kararlar ya da hazırlıksızlık nedeniyle sorunlar yaşayabilirsin.',
    keywords: ['başlangıç', 'özgürlük', 'risk', 'macera', 'heyecan'],
    context:
      'Yakın geleceğin, cesur bir başlangıç ya da dikkatsizlikle şekillenebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ps_pos6',
    card: 'The Magician',
    position: 6,
    upright:
      'Büyücü, yakın gelecekte yeteneklerini sergileme, fırsatları değerlendirme ve güçlü başlangıçlar yapma şansı bulabilirsin.',
    reversed:
      'Ters Büyücü, yakın gelecekte manipülasyon, yanlış yönlendirme ya da potansiyelini yeterince kullanamama riskin var.',
    keywords: ['yetenek', 'başlangıç', 'fırsat', 'yaratıcılık', 'güç'],
    context:
      'Yakın geleceğin, yeteneklerini kullanman ya da kullanamamanla şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ps_pos6',
    card: 'The High Priestess',
    position: 6,
    upright:
      'Başrahibe, yakın gelecekte sezgilerini daha güçlü hissedecek, içsel bilgeliğe yönelme fırsatı bulacaksın.',
    reversed:
      'Ters Başrahibe, yakın gelecekte içsel sesini dinlememek, sırların saklanması veya yanıltıcı bilgilerle karşılaşmak söz konusu olabilir.',
    keywords: ['sezgi', 'bilgelik', 'gizli bilgi', 'içsel rehberlik', 'farkındalık'],
    context:
      'Yakın geleceğin, sezgilerini dinleyip dinlememekle şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ps_pos6',
    card: 'The Empress',
    position: 6,
    upright:
      'İmparatoriçe, yakın gelecekte yaratıcılık, bolluk ve şefkat enerjisiyle çevrili olacaksın.',
    reversed:
      'Ters İmparatoriçe, yakın gelecekte üretkenlik tıkanıklığı, bağımlılık ya da öz bakımı ihmal etme riski var.',
    keywords: ['bolluk', 'yaratıcılık', 'şefkat', 'ilişkiler', 'üretkenlik'],
    context:
      'Yakın geleceğin, bolluk ya da tıkanıklıkla belirlenebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ps_pos6',
    card: 'The Emperor',
    position: 6,
    upright:
      'İmparator, yakın gelecekte düzen kurma, güçlü bir yapı inşa etme ve otorite sahibi olma fırsatın olacak.',
    reversed:
      'Ters İmparator, yakın gelecekte aşırı baskı, kontrol kaybı ya da otoriteyle çatışma yaşayabilirsin.',
    keywords: ['düzen', 'otorite', 'kontrol', 'istikrar', 'güven'],
    context:
      'Yakın geleceğin, düzen kurma ya da düzenle çatışma üzerinden şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ps_pos6',
    card: 'The Hierophant',
    position: 6,
    upright:
      'Aziz, yakın gelecekte öğretici bir figürden destek alabilir, geleneksel değerlerden faydalanabilir ya da manevi rehberlik bulabilirsin.',
    reversed:
      'Ters Aziz, yakın gelecekte kuralları reddetme, geleneklere başkaldırma veya rehberlikten uzak kalma söz konusu olabilir.',
    keywords: ['öğreti', 'rehberlik', 'gelenek', 'maneviyat', 'otorite'],
    context:
      'Yakın geleceğin, otoriteye uyum ya da karşı çıkışla şekillenebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos6',
    card: 'The Lovers',
    position: 6,
    upright:
      'Aşıklar, yakın gelecekte önemli bir seçim yapacak, değerlerini netleştirecek ya da bir ilişki alanında derinleşeceksin.',
    reversed:
      'Ters Aşıklar, yakın gelecekte uyumsuz ilişkiler, yanlış kararlar ya da kararsızlıkla yüzleşebilirsin.',
    keywords: ['ilişki', 'seçim', 'uyum', 'karar', 'değerler'],
    context:
      'Yakın geleceğin, ilişkiler ya da seçimlerle şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ps_pos6',
    card: 'The Chariot',
    position: 6,
    upright:
      'Savaş Arabası, yakın gelecekte iradeni güçlendirecek, hedeflerine odaklanacak ve kararlılıkla yol alacaksın.',
    reversed:
      'Ters Savaş Arabası, yakın gelecekte kontrol kaybı, yönsüzlük ya da dağınık enerji yaşayabilirsin.',
    keywords: ['irade', 'kararlılık', 'hedef', 'kontrol', 'ilerleme'],
    context:
      'Yakın geleceğin, irade ve kontrol dengesine bağlı olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ps_pos6',
    card: 'Strength',
    position: 6,
    upright:
      'Güç, yakın gelecekte cesaretini gösterecek, sabırla ilerleyecek ve içsel dengenle çevreni etkileyeceksin.',
    reversed:
      'Ters Güç, yakın gelecekte güvensizlik, öfke patlamaları ya da sabır eksikliği yaşayabilirsin.',
    keywords: ['cesaret', 'denge', 'sabır', 'güven', 'irade'],
    context:
      'Yakın geleceğin, cesaret ve sabırla ya da güvensizlikle belirlenebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ps_pos6',
    card: 'The Hermit',
    position: 6,
    upright:
      'Ermiş, yakın gelecekte içsel bir yolculuğa çıkabilir, yalnız kalıp bilgelik arayabilir ya da kendi ışığını bulabilirsin.',
    reversed:
      'Ters Ermiş, yakın gelecekte aşırı yalnızlık, rehbersizlik ya da izolasyon yaşayabilirsin.',
    keywords: ['bilgelik', 'içsel arayış', 'yalnızlık', 'rehberlik', 'farkındalık'],
    context:
      'Yakın geleceğin, içsel yolculuk ya da yalnızlıkla şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ps_pos6',
    card: 'Wheel of Fortune',
    position: 6,
    upright:
      'Kader Çarkı, yakın gelecekte ani değişimler, kaderin dönmesi ya da şanslı fırsatlar seni bekliyor olabilir.',
    reversed:
      'Ters Kader Çarkı, yakın gelecekte şanssızlık, yanlış zamanlama ya da tekrarlayan döngüler yaşayabilirsin.',
    keywords: ['kader', 'şans', 'döngü', 'fırsat', 'değişim'],
    context:
      'Yakın geleceğin, döngülerin olumlu ya da olumsuz yönleriyle belirlenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ps_pos6',
    card: 'Justice',
    position: 6,
    upright:
      'Adalet, yakın gelecekte adil bir karar verilecek, denge sağlanacak ya da gerçeği öğrenme fırsatı doğacak.',
    reversed:
      'Ters Adalet, yakın gelecekte yanlış anlaşılmalar, adaletsizlik ya da dengesizlik yaşayabilirsin.',
    keywords: ['adalet', 'denge', 'gerçek', 'karar', 'dürüstlük'],
    context:
      'Yakın geleceğin, adil ya da adaletsiz kararlarla şekillenebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ps_pos6',
    card: 'The Hanged Man',
    position: 6,
    upright:
      'Asılan Adam, yakın gelecekte farklı bir bakış açısı kazanacak, fedakarlık yapacak ya da yeni bir anlayış geliştireceksin.',
    reversed:
      'Ters Asılan Adam, yakın gelecekte inatçılık, direnç ya da teslimiyetsizlik yaşayabilirsin.',
    keywords: ['bakış açısı', 'teslimiyet', 'fedakarlık', 'farkındalık', 'öğrenme'],
    context:
      'Yakın geleceğin, yeni bakış açıları ya da dirençlerle şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ps_pos6',
    card: 'Death',
    position: 6,
    upright:
      'Ölüm, yakın gelecekte bir dönemi kapatacak, köklü bir dönüşüm yaşayacak ya da eskiyi geride bırakacaksın.',
    reversed:
      'Ters Ölüm, yakın gelecekte değişime direnç, kapanmamış süreçler ya da bırakmakta zorlanma yaşayabilirsin.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'kapanış', 'cesaret'],
    context:
      'Yakın geleceğin, dönüşüm ya da dönüşüme dirençle belirlenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ps_pos6',
    card: 'Temperance',
    position: 6,
    upright:
      'Denge, yakın gelecekte uyum bulacak, sabırla ilerleyecek ve farklı unsurları dengelemeyi başaracaksın.',
    reversed:
      'Ters Denge, yakın gelecekte sabırsızlık, aşırılıklar ya da uyumsuzluk yaşayabilirsin.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'dengeleyici'],
    context:
      'Yakın geleceğin, uyum ya da dengesizlikle şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ps_pos6',
    card: 'The Devil',
    position: 6,
    upright:
      'Şeytan, yakın gelecekte bağımlılıklar, korkular ya da kısıtlayıcı durumlarla yüzleşmek durumunda kalabilirsin.',
    reversed:
      'Ters Şeytan, yakın gelecekte zincirlerinden kurtulma, özgürleşme ve korkularını aşma fırsatı bulabilirsin.',
    keywords: ['bağımlılık', 'kısıtlama', 'özgürlük', 'korku', 'gölge'],
    context:
      'Yakın geleceğin, bağımlılıklar ya da özgürleşmeyle şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ps_pos6',
    card: 'The Tower',
    position: 6,
    upright:
      'Kule, yakın gelecekte ani bir değişim, kriz ya da sarsıcı bir olay gündeme gelebilir.',
    reversed:
      'Ters Kule, yakın gelecekte ertelediğin bir krizin patlaması ya da değişimden kaçma eğilimi olabilir.',
    keywords: ['kriz', 'yıkım', 'değişim', 'dönüşüm', 'şok'],
    context:
      'Yakın geleceğin, kriz ya da krizden kaçışla şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ps_pos6',
    card: 'The Star',
    position: 6,
    upright:
      'Yıldız, yakın gelecekte umut, ilham ve ruhsal yenilenme seni bekliyor olacak.',
    reversed:
      'Ters Yıldız, yakın gelecekte umutsuzluk, ilham kaybı ya da güvensizlik yaşayabilirsin.',
    keywords: ['umut', 'ilham', 'yenilenme', 'ruh', 'güven'],
    context:
      'Yakın geleceğin, umut ya da umutsuzlukla şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ps_pos6',
    card: 'The Moon',
    position: 6,
    upright:
      'Ay, yakın gelecekte belirsizlik, yanılsamalar ya da gizli korkularla karşılaşabilirsin.',
    reversed:
      'Ters Ay, yakın gelecekte sırların açığa çıkması, netlik kazanma ya da yanılsamalardan kurtulma yaşayabilirsin.',
    keywords: ['belirsizlik', 'yanılsama', 'sezgi', 'korku', 'gizli'],
    context:
      'Yakın geleceğin, belirsizlik ya da netlik kazanma süreçleriyle belirlenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos6',
    card: 'The Sun',
    position: 6,
    upright:
      'Güneş, yakın gelecekte mutluluk, başarı ve içsel aydınlanma seni bekliyor olacak.',
    reversed:
      'Ters Güneş, yakın gelecekte karamsarlık, özgüven eksikliği ya da başarıların engellenmesi söz konusu olabilir.',
    keywords: ['mutluluk', 'başarı', 'özgüven', 'aydınlanma', 'neşe'],
    context:
      'Yakın geleceğin, mutluluk ya da karamsarlıkla şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos6',
    card: 'Judgement',
    position: 6,
    upright:
      'Mahkeme, yakın gelecekte önemli bir farkındalık, geçmişle yüzleşme ya da güçlü bir karar gündeme gelecek.',
    reversed:
      'Ters Mahkeme, yakın gelecekte sorumluluktan kaçma, geçmişi reddetme ya da fırsatları görmezden gelme olabilir.',
    keywords: ['farkındalık', 'karar', 'yüzleşme', 'yenilenme', 'çağrı'],
    context:
      'Yakın geleceğin, farkındalık ya da kaçışla şekillenecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos6',
    card: 'The World',
    position: 6,
    upright:
      'Dünya, yakın gelecekte bir döngüyü tamamlayacak, başarıya ulaşacak ya da bütünlük hissi yaşayacaksın.',
    reversed:
      'Ters Dünya, yakın gelecekte yarım kalmış işler, eksik kapanışlar ya da tatminsizlik gündeme gelebilir.',
    keywords: ['tamamlanma', 'başarı', 'döngü', 'bütünlük', 'kapanış'],
    context:
      'Yakın geleceğin, tamamlanma ya da eksik kapanışlarla şekillenecek.',
    group: 'Majör Arkana',
  },
  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_ps_pos6',
    card: 'Ace of Cups',
    position: 6,
    upright:
      'Kupa Ası, yakın gelecekte kalbini açacağın, yeni bir duygusal başlangıç ya da ilham verici bir deneyim yaşayabileceğini gösterir.',
    reversed:
      'Ters Kupa Ası, yakın gelecekte duygularını ifade etmekte zorlanabilir, hayal kırıklığı ya da kapanmış bir kalp deneyimleyebilirsin.',
    keywords: ['yeni aşk', 'ilham', 'duygular', 'başlangıç', 'şefkat'],
    context:
      'Yakın geleceğin, duygusal açılımlar ya da hayal kırıklıklarıyla şekillenebilir.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ps_pos6',
    card: 'Two of Cups',
    position: 6,
    upright:
      'İki Kupa, yakın gelecekte uyumlu bir ortaklık, yeni bir ilişki ya da mevcut bağın güçlenmesi seni bekliyor olabilir.',
    reversed:
      'Ters İki Kupa, yakın gelecekte anlaşmazlık, iletişim sorunları ya da bağların zayıflaması söz konusu olabilir.',
    keywords: ['ilişki', 'ortaklık', 'uyum', 'sevgi', 'bağ'],
    context:
      'Yakın geleceğin, uyumlu bağlar ya da uyumsuzluklarla şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ps_pos6',
    card: 'Three of Cups',
    position: 6,
    upright:
      'Üç Kupa, yakın gelecekte kutlamalar, dostlarla buluşma ya da topluluk içinde keyifli zamanlar yaşayabilirsin.',
    reversed:
      'Ters Üç Kupa, yakın gelecekte sosyal çevreden uzaklaşma, yanlış anlaşılma ya da samimiyet eksikliği olabilir.',
    keywords: ['kutlama', 'dostluk', 'topluluk', 'mutluluk', 'destek'],
    context:
      'Yakın geleceğin, sosyal bağların güçlenmesi ya da zayıflamasıyla belirlenecek.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ps_pos6',
    card: 'Four of Cups',
    position: 6,
    upright:
      'Dört Kupa, yakın gelecekte ilgisizlik, tatminsizlik ya da içsel arayış ön plana çıkabilir.',
    reversed:
      'Ters Dört Kupa, yakın gelecekte fırsatlara açılma, farkındalık kazanma ve yeni bir ilgi alanı bulma yaşayabilirsin.',
    keywords: ['tatminsizlik', 'fırsat', 'ilgisizlik', 'uyanış', 'arama'],
    context:
      'Yakın geleceğin, tatminsizlik ya da farkındalıkla şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ps_pos6',
    card: 'Five of Cups',
    position: 6,
    upright:
      'Beş Kupa, yakın gelecekte bir kayıp, pişmanlık ya da duygusal bir üzüntü gündeme gelebilir.',
    reversed:
      'Ters Beş Kupa, yakın gelecekte iyileşme, geride kalan güzelliklere odaklanma ve şifalanma yaşayabilirsin.',
    keywords: ['kayıp', 'pişmanlık', 'üzüntü', 'şifa', 'farkındalık'],
    context:
      'Yakın geleceğin, yas ya da şifalanma süreçleriyle şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ps_pos6',
    card: 'Six of Cups',
    position: 6,
    upright:
      'Altı Kupa, yakın gelecekte geçmişten gelen bir kişiyle karşılaşabilir, nostalji yaşayabilir ya da çocukluk anılarını gündeme getirebilirsin.',
    reversed:
      'Ters Altı Kupa, yakın gelecekte geçmişte takılı kalmak, ileriye bakamamak ya da eski bağların yükünü taşımak olabilir.',
    keywords: ['geçmiş', 'anı', 'nostalji', 'çocukluk', 'bağ'],
    context:
      'Yakın geleceğin, geçmiş bağlar ya da geleceğe ilerleyememekle şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ps_pos6',
    card: 'Seven of Cups',
    position: 6,
    upright:
      'Yedi Kupa, yakın gelecekte birçok seçenekle karşılaşabilir, hayaller ve gerçekler arasında karar vermek zorunda kalabilirsin.',
    reversed:
      'Ters Yedi Kupa, yakın gelecekte kafa karışıklığının sona ermesi, netlik kazanma ve somut adımlar atma olabilir.',
    keywords: ['seçenek', 'hayal', 'karar', 'vizyon', 'netlik'],
    context:
      'Yakın geleceğin, kafa karışıklığı ya da netlik kazanma süreçleriyle şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ps_pos6',
    card: 'Eight of Cups',
    position: 6,
    upright:
      'Sekiz Kupa, yakın gelecekte tatmin etmeyen bir şeyi bırakıp yeni bir yolculuğa çıkabilirsin.',
    reversed:
      'Ters Sekiz Kupa, yakın gelecekte ayrılmakta zorlanma, geçmişe geri dönme ya da kararsızlık yaşayabilirsin.',
    keywords: ['bırakış', 'arayış', 'tatminsizlik', 'karar', 'kaçış'],
    context:
      'Yakın geleceğin, bırakmak ya da geri dönmekle şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ps_pos6',
    card: 'Nine of Cups',
    position: 6,
    upright:
      'Dokuz Kupa, yakın gelecekte dileklerinin gerçekleşmesi, kişisel tatmin ve mutluluk yaşayabilirsin.',
    reversed:
      'Ters Dokuz Kupa, yakın gelecekte beklentilerin karşılanmaması, yüzeysel tatmin ya da doyumsuzluk yaşayabilirsin.',
    keywords: ['dilek', 'tatmin', 'mutluluk', 'doyum', 'beklenti'],
    context:
      'Yakın geleceğin, tatmin ya da beklentiyle şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ps_pos6',
    card: 'Ten of Cups',
    position: 6,
    upright:
      'On Kupa, yakın gelecekte aile, dostluk ya da ilişkilerde huzurlu ve mutlu bir dönem seni bekliyor.',
    reversed:
      'Ters On Kupa, yakın gelecekte aile içi huzursuzluk, uyumsuzluk ya da hayal kırıklığı yaşayabilirsin.',
    keywords: ['aile', 'mutluluk', 'huzur', 'ilişki', 'uyum'],
    context:
      'Yakın geleceğin, uyum ya da uyumsuzluk deneyimleriyle şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ps_pos6',
    card: 'Page of Cups',
    position: 6,
    upright:
      'Kupa Prensi, yakın gelecekte yaratıcı bir ilham, romantik bir jest ya da yeni bir duygusal açılım yaşayabilirsin.',
    reversed:
      'Ters Kupa Prensi, yakın gelecekte hayalcilik, duygusal olgunluk eksikliği ya da samimiyet sorunları olabilir.',
    keywords: ['ilham', 'romantizm', 'yaratıcılık', 'hayal', 'samimiyet'],
    context:
      'Yakın geleceğin, ilham ya da hayalcilikle şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ps_pos6',
    card: 'Knight of Cups',
    position: 6,
    upright:
      'Kupa Şövalyesi, yakın gelecekte romantik bir teklif, yaratıcı bir girişim ya da ilham verici bir yolculuk seni bekleyebilir.',
    reversed:
      'Ters Kupa Şövalyesi, yakın gelecekte tutarsızlık, boş vaatler ya da gerçek dışı beklentiler yaşayabilirsin.',
    keywords: ['romantizm', 'teklif', 'ilham', 'hayal', 'adım'],
    context:
      'Yakın geleceğin, romantizm ya da tutarsızlıkla şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ps_pos6',
    card: 'Queen of Cups',
    position: 6,
    upright:
      'Kupa Kraliçesi, yakın gelecekte şefkat, empati ve duygusal bilgelik seni yönlendirecek.',
    reversed:
      'Ters Kupa Kraliçesi, yakın gelecekte aşırı hassasiyet, bağımlılık ya da duygusal dengesizlik yaşayabilirsin.',
    keywords: ['şefkat', 'empati', 'bilgelik', 'hassasiyet', 'denge'],
    context:
      'Yakın geleceğin, şefkat ya da dengesizlikle şekillenecek.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ps_pos6',
    card: 'King of Cups',
    position: 6,
    upright:
      'Kupa Kralı, yakın gelecekte duygusal olgunluk, bilgece rehberlik ve sakinlik enerjisi seni yönlendirecek.',
    reversed:
      'Ters Kupa Kralı, yakın gelecekte duygusal kontrol kaybı, bastırılmış öfke ya da güvensizlik yaşayabilirsin.',
    keywords: ['olgunluk', 'denge', 'sakinlik', 'rehberlik', 'bilgelik'],
    context:
      'Yakın geleceğin, olgunluk ya da dengesizlikle şekillenecek.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_ps_pos6',
    card: 'Ace of Swords',
    position: 6,
    upright:
      'Kılıç Ası, yakın gelecekte zihinsel netlik, güçlü bir karar ve yeni bir başlangıç enerjisi seni bekliyor.',
    reversed:
      'Ters Kılıç Ası, yakın gelecekte kafa karışıklığı, yanlış anlaşılmalar ya da netlik eksikliği yaşayabilirsin.',
    keywords: ['netlik', 'karar', 'iletişim', 'başlangıç', 'zihin'],
    context:
      'Yakın geleceğin, zihinsel netlik ya da kafa karışıklıklarıyla şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ps_pos6',
    card: 'Two of Swords',
    position: 6,
    upright:
      'İki Kılıç, yakın gelecekte zor bir seçimle karşılaşabilir, kararsızlık yaşayabilirsin.',
    reversed:
      'Ters İki Kılıç, yakın gelecekte karar vermekten kaçmak ya da yanlış seçim yapma ihtimalin olabilir.',
    keywords: ['kararsızlık', 'seçim', 'denge', 'ikilem', 'yol ayrımı'],
    context:
      'Yakın geleceğin, karar alma süreçleriyle şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ps_pos6',
    card: 'Three of Swords',
    position: 6,
    upright:
      'Üç Kılıç, yakın gelecekte duygusal bir kırılma, ayrılık ya da hayal kırıklığı yaşayabilirsin.',
    reversed:
      'Ters Üç Kılıç, yakın gelecekte şifalanma, affediş ya da eski yaraları onarma fırsatı doğabilir.',
    keywords: ['kalp kırıklığı', 'ayrılık', 'acı', 'şifa', 'affediş'],
    context:
      'Yakın geleceğin, kırılma ya da şifalanmayla şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ps_pos6',
    card: 'Four of Swords',
    position: 6,
    upright:
      'Dört Kılıç, yakın gelecekte dinlenme, toparlanma ve zihinsel yenilenme süreci seni bekliyor.',
    reversed:
      'Ters Dört Kılıç, yakın gelecekte tükenmişlik, dinlenme eksikliği ya da toparlanmayı erteleme olabilir.',
    keywords: ['dinlenme', 'toparlanma', 'zihin', 'yenilenme', 'huzur'],
    context:
      'Yakın geleceğin, dinlenme ya da tükenmişlikle şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ps_pos6',
    card: 'Five of Swords',
    position: 6,
    upright:
      'Beş Kılıç, yakın gelecekte bir tartışma, çatışma ya da gurur mücadelesi gündeme gelebilir.',
    reversed:
      'Ters Beş Kılıç, yakın gelecekte barışma, uzlaşma ya da çatışmaları geride bırakma fırsatı bulabilirsin.',
    keywords: ['çatışma', 'gurur', 'kayıp', 'uzlaşma', 'gerilim'],
    context:
      'Yakın geleceğin, çatışma ya da barış arayışıyla şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ps_pos6',
    card: 'Six of Swords',
    position: 6,
    upright:
      'Altı Kılıç, yakın gelecekte bir yolculuk, geçiş süreci ya da geçmişten uzaklaşma yaşayabilirsin.',
    reversed:
      'Ters Altı Kılıç, yakın gelecekte ilerleyememe, geçmişe bağlı kalma ya da geçişi zorlaştırma olabilir.',
    keywords: ['geçiş', 'yolculuk', 'ilerleme', 'kaçış', 'geçmiş'],
    context:
      'Yakın geleceğin, ilerleyiş ya da geçmişe bağlılıkla şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ps_pos6',
    card: 'Seven of Swords',
    position: 6,
    upright:
      'Yedi Kılıç, yakın gelecekte gizlilik, strateji ya da saklı planlar gündeme gelebilir.',
    reversed:
      'Ters Yedi Kılıç, yakın gelecekte sırların açığa çıkması, dürüstleşme ya da yakalanma ihtimali olabilir.',
    keywords: ['gizlilik', 'hile', 'strateji', 'sırlar', 'hesap'],
    context:
      'Yakın geleceğin, gizlilik ya da dürüstlükle şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ps_pos6',
    card: 'Eight of Swords',
    position: 6,
    upright:
      'Sekiz Kılıç, yakın gelecekte kendini sınırlanmış, çaresiz ya da zihinsel engeller altında hissedebilirsin.',
    reversed:
      'Ters Sekiz Kılıç, yakın gelecekte özgürleşme, kısıtlamalardan kurtulma ya da zihinsel zincirlerini kırma yaşayabilirsin.',
    keywords: ['sınırlama', 'çaresizlik', 'özgürlük', 'zihin', 'engeller'],
    context:
      'Yakın geleceğin, kısıtlanma ya da özgürleşmeyle şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ps_pos6',
    card: 'Nine of Swords',
    position: 6,
    upright:
      'Dokuz Kılıç, yakın gelecekte yoğun kaygı, stres ya da uykusuzluk gündeme gelebilir.',
    reversed:
      'Ters Dokuz Kılıç, yakın gelecekte kaygılardan arınma, rahatlama ya da destek bulma fırsatı doğabilir.',
    keywords: ['kaygı', 'stres', 'kabus', 'endişe', 'destek'],
    context:
      'Yakın geleceğin, kaygılar ya da şifalanmayla şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ps_pos6',
    card: 'Ten of Swords',
    position: 6,
    upright:
      'On Kılıç, yakın gelecekte bir bitiş, ihanet ya da acı verici bir kapanış gündeme gelebilir.',
    reversed:
      'Ters On Kılıç, yakın gelecekte toparlanma, yeniden doğuş ya da travmaları geride bırakma fırsatı doğabilir.',
    keywords: ['bitiş', 'ihanet', 'yeniden doğuş', 'kayıp', 'acı'],
    context:
      'Yakın geleceğin, bitiş ya da yeniden doğuşla şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ps_pos6',
    card: 'Page of Swords',
    position: 6,
    upright:
      'Kılıç Prensi, yakın gelecekte yeni bir fikir, merak ya da araştırma enerjisiyle hareket edebilirsin.',
    reversed:
      'Ters Kılıç Prensi, yakın gelecekte dedikodular, yanlış bilgi ya da dikkatsizlik gündeme gelebilir.',
    keywords: ['merak', 'iletişim', 'zeka', 'öğrenme', 'dikkat'],
    context:
      'Yakın geleceğin, öğrenme ya da dikkatsizlikle şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ps_pos6',
    card: 'Knight of Swords',
    position: 6,
    upright:
      'Kılıç Şövalyesi, yakın gelecekte cesur bir girişim, hızlı hareket ya da net bir karar seni bekliyor olabilir.',
    reversed:
      'Ters Kılıç Şövalyesi, yakın gelecekte acelecilik, dikkatsizlik ya da yönsüzlük yaşayabilirsin.',
    keywords: ['cesaret', 'hız', 'karar', 'hedef', 'acele'],
    context:
      'Yakın geleceğin, cesaret ya da acelecilikle şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ps_pos6',
    card: 'Queen of Swords',
    position: 6,
    upright:
      'Kılıç Kraliçesi, yakın gelecekte mantığını ön planda tutacak, objektif kararlar alacak ya da bağımsız bir duruş sergileyeceksin.',
    reversed:
      'Ters Kılıç Kraliçesi, yakın gelecekte soğukluk, eleştirellik ya da anlayışsızlık olabilir.',
    keywords: ['mantık', 'bağımsızlık', 'objektiflik', 'soğukluk', 'eleştiri'],
    context:
      'Yakın geleceğin, objektiflik ya da duygusal mesafeyle şekillenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ps_pos6',
    card: 'King of Swords',
    position: 6,
    upright:
      'Kılıç Kralı, yakın gelecekte mantıklı kararlar alacak, adaletli davranacak ve bilgeliğinle yönlendireceksin.',
    reversed:
      'Ters Kılıç Kralı, yakın gelecekte baskıcılık, soğukluk ya da adaletsiz kararlar söz konusu olabilir.',
    keywords: ['otorite', 'adalet', 'mantık', 'bilgelik', 'karar'],
    context:
      'Yakın geleceğin, bilgece kararlar ya da adaletsizliklerle şekillenecek.',
    group: 'Kılıçlar',
  },
  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_ps_pos6',
    card: 'Ace of Pentacles',
    position: 6,
    upright:
      'Tılsım Ası, yakın gelecekte yeni bir maddi fırsat, iş başlangıcı veya güçlü bir temel oluşturma enerjisi gündeme gelebilir.',
    reversed:
      'Ters Tılsım Ası, yakın gelecekte fırsatları kaçırma, yanlış yatırım ya da istikrar sağlayamama söz konusu olabilir.',
    keywords: ['fırsat', 'başlangıç', 'bolluk', 'yatırım', 'temel'],
    context:
      'Yakın geleceğin, sağlam temeller kurmak ya da fırsatları kaçırmakla şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ps_pos6',
    card: 'Two of Pentacles',
    position: 6,
    upright:
      'İki Tılsım, yakın gelecekte sorumluluklarını dengeleme, önceliklerini netleştirme ve esneklik kazanma süreci yaşayabilirsin.',
    reversed:
      'Ters İki Tılsım, yakın gelecekte dengesizlik, fazla yüklenme ya da karar verememe olabilir.',
    keywords: ['denge', 'sorumluluk', 'öncelik', 'esneklik', 'yoğunluk'],
    context:
      'Yakın geleceğin, denge ya da dengesizlikle şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ps_pos6',
    card: 'Three of Pentacles',
    position: 6,
    upright:
      'Üç Tılsım, yakın gelecekte işbirliği, ekip çalışması veya ortak projelerde başarı gündeme gelebilir.',
    reversed:
      'Ters Üç Tılsım, yakın gelecekte uyumsuzluk, ekip içinde anlaşmazlık ya da destek eksikliği olabilir.',
    keywords: ['işbirliği', 'ekip', 'başarı', 'paylaşım', 'uyum'],
    context:
      'Yakın geleceğin, işbirliği ya da uyumsuzlukla şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ps_pos6',
    card: 'Four of Pentacles',
    position: 6,
    upright:
      'Dört Tılsım, yakın gelecekte güvenlik arayışı, sahip olduklarını koruma ve maddi istikrar sağlama ön planda olacak.',
    reversed:
      'Ters Dört Tılsım, yakın gelecekte cimrilik, kaybetme korkusu ya da aşırı kontrol gündeme gelebilir.',
    keywords: ['güvenlik', 'istikrar', 'kontrol', 'koruma', 'kaybetme korkusu'],
    context:
      'Yakın geleceğin, güvence ya da aşırı tutuculukla şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ps_pos6',
    card: 'Five of Pentacles',
    position: 6,
    upright:
      'Beş Tılsım, yakın gelecekte maddi zorluk, yalnızlık ya da desteğin eksikliği gündeme gelebilir.',
    reversed:
      'Ters Beş Tılsım, yakın gelecekte yardımlaşma, destek bulma ve zorlukları aşma fırsatı doğabilir.',
    keywords: ['zorluk', 'yalnızlık', 'destek', 'maddi sıkıntı', 'dayanıklılık'],
    context:
      'Yakın geleceğin, zorluk ya da destekle şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ps_pos6',
    card: 'Six of Pentacles',
    position: 6,
    upright:
      'Altı Tılsım, yakın gelecekte adil paylaşım, yardımlaşma ve alma-verme dengesini kurma fırsatı bulabilirsin.',
    reversed:
      'Ters Altı Tılsım, yakın gelecekte eşitsiz ilişkiler, dengesizlik ya da tek taraflı destek olabilir.',
    keywords: ['yardım', 'paylaşım', 'adalet', 'denge', 'destek'],
    context:
      'Yakın geleceğin, denge ya da dengesizlikle şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ps_pos6',
    card: 'Seven of Pentacles',
    position: 6,
    upright:
      'Yedi Tılsım, yakın gelecekte sabırla beklemek, emeklerinin karşılığını görmek ya da uzun vadeli kazançlara odaklanmak söz konusu olabilir.',
    reversed:
      'Ters Yedi Tılsım, yakın gelecekte sabırsızlık, boşuna emek ya da tatminsizlik gündeme gelebilir.',
    keywords: ['sabır', 'emek', 'yatırım', 'bekleyiş', 'kazanç'],
    context:
      'Yakın geleceğin, sabır ya da sabırsızlıkla şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ps_pos6',
    card: 'Eight of Pentacles',
    position: 6,
    upright:
      'Sekiz Tılsım, yakın gelecekte becerilerini geliştirme, disiplinli çalışma ve ustalaşma süreci gündeme gelebilir.',
    reversed:
      'Ters Sekiz Tılsım, yakın gelecekte özensizlik, motivasyon eksikliği ya da aynı hataları tekrarlama olabilir.',
    keywords: ['çalışma', 'ustalık', 'öğrenme', 'disiplin', 'emek'],
    context:
      'Yakın geleceğin, çalışkanlık ya da özensizlikle şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ps_pos6',
    card: 'Nine of Pentacles',
    position: 6,
    upright:
      'Dokuz Tılsım, yakın gelecekte bağımsızlık, öz değerini hissetmek ve emeğinin karşılığını almak seni bekliyor.',
    reversed:
      'Ters Dokuz Tılsım, yakın gelecekte yalnızlık korkusu, bağımlılık ya da maddi aşırılıklar olabilir.',
    keywords: ['bağımsızlık', 'özgüven', 'tatmin', 'başarı', 'bolluk'],
    context:
      'Yakın geleceğin, bağımsızlık ya da bağımlılıkla şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ps_pos6',
    card: 'Ten of Pentacles',
    position: 6,
    upright:
      'On Tılsım, yakın gelecekte aile bağları, kalıcı istikrar ve maddi güvence ön planda olacak.',
    reversed:
      'Ters On Tılsım, yakın gelecekte ailevi sorunlar, kalıcı istikrarsızlık ya da miras anlaşmazlıkları olabilir.',
    keywords: ['aile', 'istikrar', 'güvence', 'bolluk', 'miras'],
    context:
      'Yakın geleceğin, istikrar ya da huzursuzlukla şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ps_pos6',
    card: 'Page of Pentacles',
    position: 6,
    upright:
      'Tılsım Prensi, yakın gelecekte öğrenmeye açık olacak, yeni fırsatları araştıracak ya da planlarını hayata geçireceksin.',
    reversed:
      'Ters Tılsım Prensi, yakın gelecekte motivasyon kaybı, dikkatsizlik ya da yarım kalan projeler gündeme gelebilir.',
    keywords: ['öğrenme', 'fırsat', 'plan', 'araştırma', 'başlangıç'],
    context:
      'Yakın geleceğin, öğrenme ya da dikkatsizlikle şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ps_pos6',
    card: 'Knight of Pentacles',
    position: 6,
    upright:
      'Tılsım Şövalyesi, yakın gelecekte sabır, disiplin ve kararlılıkla hedeflerine doğru ilerleyeceksin.',
    reversed:
      'Ters Tılsım Şövalyesi, yakın gelecekte durağanlık, tembellik ya da fazla yavaş ilerleme olabilir.',
    keywords: ['sabır', 'istikrar', 'çalışma', 'disiplin', 'azim'],
    context:
      'Yakın geleceğin, disiplin ya da durağanlıkla şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ps_pos6',
    card: 'Queen of Pentacles',
    position: 6,
    upright:
      'Tılsım Kraliçesi, yakın gelecekte bolluk, şefkat ve kaynaklarını verimli yönetme enerjisi seni yönlendirecek.',
    reversed:
      'Ters Tılsım Kraliçesi, yakın gelecekte öz bakım eksikliği, savurganlık ya da dengesiz kaynak kullanımı olabilir.',
    keywords: ['bolluk', 'şefkat', 'kaynak yönetimi', 'denge', 'üretkenlik'],
    context:
      'Yakın geleceğin, bolluk ya da savurganlıkla şekillenecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ps_pos6',
    card: 'King of Pentacles',
    position: 6,
    upright:
      'Tılsım Kralı, yakın gelecekte güçlü bir düzen kurabilir, başarıya ulaşabilir ve çevrene güven verebilirsin.',
    reversed:
      'Ters Tılsım Kralı, yakın gelecekte hırs, baskıcılık ya da istikrar eksikliği gündeme gelebilir.',
    keywords: ['başarı', 'istikrar', 'güven', 'liderlik', 'bolluk'],
    context:
      'Yakın geleceğin, başarı ya da istikrarsızlıkla şekillenecek.',
    group: 'Tılsımlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_ps_pos6',
    card: 'Ace of Wands',
    position: 6,
    upright:
      'Değnek Ası, yakın gelecekte yeni bir fikir, güçlü bir ilham veya yaratıcı bir başlangıç kapılarını sana açabilir.',
    reversed:
      'Ters Değnek Ası, yakın gelecekte ilham eksikliği, ertelenen projeler ya da enerjide bir durgunluk yaşayabilirsin.',
    keywords: ['başlangıç', 'ilham', 'yaratıcılık', 'tutku', 'kıvılcım'],
    context:
      'Yakın geleceğin, yeni ilhamlarla ya da ertelemelerle şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ps_pos6',
    card: 'Two of Wands',
    position: 6,
    upright:
      'İki Değnek, yakın gelecekte planlarını genişletmek, yeni yollar seçmek ya da ufkunu büyütmek için fırsatlar gündeme gelebilir.',
    reversed:
      'Ters İki Değnek, yakın gelecekte risk almaktan kaçınabilir, güvensizlik ya da dar bakış açısı yaşayabilirsin.',
    keywords: ['plan', 'vizyon', 'gelecek', 'seçim', 'fırsat'],
    context:
      'Yakın geleceğin, vizyonunu genişletmek ya da dar bakışla sınırlanmakla şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ps_pos6',
    card: 'Three of Wands',
    position: 6,
    upright:
      'Üç Değnek, yakın gelecekte ufkunu genişletmek, fırsatlarla karşılaşmak ve attığın adımların sonuçlarını görmek seni bekliyor.',
    reversed:
      'Ters Üç Değnek, yakın gelecekte gecikmeler, vizyon kaybı ya da beklentilerin ertelenmesi olabilir.',
    keywords: ['ilerleme', 'ufuk', 'fırsat', 'plan', 'vizyon'],
    context:
      'Yakın geleceğin, fırsatlarla ya da engellerle şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ps_pos6',
    card: 'Four of Wands',
    position: 6,
    upright:
      'Dört Değnek, yakın gelecekte kutlamalar, huzurlu bir dönem ya da sağlam bir temel kurma enerjisi gündeme gelebilir.',
    reversed:
      'Ters Dört Değnek, yakın gelecekte uyumsuzluk, ev ya da iş yaşamında huzursuzluk yaşayabilirsin.',
    keywords: ['kutlama', 'temel', 'uyum', 'denge', 'huzur'],
    context:
      'Yakın geleceğin, uyum ya da huzursuzlukla şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ps_pos6',
    card: 'Five of Wands',
    position: 6,
    upright:
      'Beş Değnek, yakın gelecekte rekabet, fikir ayrılığı ya da bir mücadele gündeme gelebilir.',
    reversed:
      'Ters Beş Değnek, yakın gelecekte çatışmalardan uzaklaşabilir, işbirliğine daha çok odaklanabilirsin.',
    keywords: ['rekabet', 'çatışma', 'mücadele', 'işbirliği', 'gerilim'],
    context:
      'Yakın geleceğin, rekabet ya da işbirliğiyle şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ps_pos6',
    card: 'Six of Wands',
    position: 6,
    upright:
      'Altı Değnek, yakın gelecekte başarı, zafer ve çevrenden takdir görme enerjisi seni bekliyor.',
    reversed:
      'Ters Altı Değnek, yakın gelecekte değerinin bilinmemesi, başarının engellenmesi ya da özgüven eksikliği yaşayabilirsin.',
    keywords: ['zafer', 'başarı', 'takdir', 'özgüven', 'liderlik'],
    context:
      'Yakın geleceğin, zafer ya da hayal kırıklığıyla şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ps_pos6',
    card: 'Seven of Wands',
    position: 6,
    upright:
      'Yedi Değnek, yakın gelecekte kendi duruşunu savunacak, sınırlarını koruyacak ve kararlılıkla mücadele edeceksin.',
    reversed:
      'Ters Yedi Değnek, yakın gelecekte direnmekte zorlanabilir, geri adım atma ihtiyacı hissedebilirsin.',
    keywords: ['savunma', 'mücadele', 'kararlılık', 'cesaret', 'sınırlar'],
    context:
      'Yakın geleceğin, direnç ya da geri çekilme ile şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ps_pos6',
    card: 'Eight of Wands',
    position: 6,
    upright:
      'Sekiz Değnek, yakın gelecekte hızlı gelişmeler, haberler ya da ani değişimler yaşayabilirsin.',
    reversed:
      'Ters Sekiz Değnek, yakın gelecekte gecikmeler, iletişim sorunları ya da yavaş ilerleme olabilir.',
    keywords: ['hız', 'iletişim', 'haber', 'ilerleme', 'değişim'],
    context:
      'Yakın geleceğin, hızlı ilerleme ya da gecikmelerle şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ps_pos6',
    card: 'Nine of Wands',
    position: 6,
    upright:
      'Dokuz Değnek, yakın gelecekte dayanıklılığını sınayan durumlarla karşılaşabilir, sabırla direnebilirsin.',
    reversed:
      'Ters Dokuz Değnek, yakın gelecekte tükenmişlik, savunmasızlık ya da direnmekte zorlanma olabilir.',
    keywords: ['direnç', 'sabır', 'koruma', 'dayanıklılık', 'mücadele'],
    context:
      'Yakın geleceğin, sabırla direnmek ya da yorgunlukla şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ps_pos6',
    card: 'Ten of Wands',
    position: 6,
    upright:
      'On Değnek, yakın gelecekte ağır sorumluluklar taşıyabilir, iş yükün artabilir ya da görevlerin yoğunlaşabilir.',
    reversed:
      'Ters On Değnek, yakın gelecekte yüklerinden kurtulma, sorumluluklarını hafifletme ya da aşırı yorgunluk olabilir.',
    keywords: ['yük', 'sorumluluk', 'görev', 'mücadele', 'ağırlık'],
    context:
      'Yakın geleceğin, sorumluluk ya da hafifleme ile şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ps_pos6',
    card: 'Page of Wands',
    position: 6,
    upright:
      'Değnek Prensi, yakın gelecekte yeni bir ilham, yaratıcı fikir ya da cesur bir keşif seni bekliyor olabilir.',
    reversed:
      'Ters Değnek Prensi, yakın gelecekte motivasyon kaybı, acelecilik ya da dikkatsizlik yaşayabilirsin.',
    keywords: ['ilham', 'keşif', 'cesaret', 'deneyim', 'merak'],
    context:
      'Yakın geleceğin, cesur adımlar ya da acelecilikle şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ps_pos6',
    card: 'Knight of Wands',
    position: 6,
    upright:
      'Değnek Şövalyesi, yakın gelecekte tutkulu bir girişim, cesur bir adım ya da maceralı bir süreç yaşayabilirsin.',
    reversed:
      'Ters Değnek Şövalyesi, yakın gelecekte sabırsızlık, yönsüzlük ya da aceleci davranışlar olabilir.',
    keywords: ['tutku', 'cesaret', 'macera', 'hareket', 'enerji'],
    context:
      'Yakın geleceğin, cesur girişimler ya da acelecilikle şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ps_pos6',
    card: 'Queen of Wands',
    position: 6,
    upright:
      'Değnek Kraliçesi, yakın gelecekte özgüven, çekicilik ve ilham verici bir liderlik seni yönlendirecek.',
    reversed:
      'Ters Değnek Kraliçesi, yakın gelecekte güvensizlik, kıskançlık ya da enerjide düşüş yaşayabilirsin.',
    keywords: ['özgüven', 'liderlik', 'ilham', 'çekim', 'enerji'],
    context:
      'Yakın geleceğin, özgüven ya da güvensizlikle şekillenecek.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ps_pos6',
    card: 'King of Wands',
    position: 6,
    upright:
      'Değnek Kralı, yakın gelecekte liderlik yapabilir, vizyonunu ortaya koyabilir ve çevrene ilham verebilirsin.',
    reversed:
      'Ters Değnek Kralı, yakın gelecekte baskıcılık, kontrol etme isteği ya da vizyon eksikliği gündeme gelebilir.',
    keywords: ['liderlik', 'vizyon', 'ilham', 'karizma', 'cesaret'],
    context:
      'Yakın geleceğin, vizyon ya da kontrol ihtiyacıyla şekillenecek.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition6Meaning(
  card: TarotCard
): ProblemSolvingPosition6Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position6Meanings.find(m => 
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
  meaning = position6Meanings.find(m => m.card === englishName);
  
  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition6MeaningByCardName(
  cardName: string
): ProblemSolvingPosition6Meaning | null {
  return position6Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllProblemSolvingPosition6Meanings(): ProblemSolvingPosition6Meaning[] {
  return position6Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getProblemSolvingPosition6MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): ProblemSolvingPosition6Meaning[] {
  return position6Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition6Meanings = (): I18nProblemSolvingPosition6Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position6Meanings.map(meaning => {
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
      export const getI18nPosition6Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nProblemSolvingPosition6Meaning | null => {
  const originalMeaning = position6Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `problem-solving.meanings.${cardKey}.position6.upright`
  );
  const i18nReversed = t(
    `problem-solving.meanings.${cardKey}.position6.reversed`
  );
  const i18nKeywords = t(
    `problem-solving.meanings.${cardKey}.position6.keywords`
  );
  const i18nContext = t(
    `problem-solving.meanings.${cardKey}.position6.context`
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
const problemSolvingPosition6Exports = {
  position6Meanings,
  getProblemSolvingPosition6Meaning,
  getProblemSolvingPosition6MeaningByCardName,
  getAllProblemSolvingPosition6Meanings,
  getProblemSolvingPosition6MeaningsByGroup,
  getI18nPosition6Meaning,
};

export default problemSolvingPosition6Exports;
