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
'use client';

import { TarotCard } from '@/types/tarot';
import { getCardNameMappingSync } from '@/features/tarot/lib/love/card-name-mapping';

export interface ProblemSolvingPosition10Meaning {
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
export interface I18nProblemSolvingPosition10Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position10Meanings: ProblemSolvingPosition10Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ps_pos10',
    card: 'The Fool',
    position: 10,
    upright:
      'Joker, olayın sonucunda sana yeni bir başlangıç, özgürleşme ve cesaretle adım atma fırsatı getirebilir.',
    reversed:
      'Ters Joker, olayın sonucunda acelecilik, dikkatsizlik veya yanlış bir başlangıç riskini gösterebilir.',
    keywords: ['başlangıç', 'özgürlük', 'cesaret', 'risk', 'yenilik'],
    context:
      'Sonuç, yeni bir yolculuğa çıkmak ya da aceleyle hata yapmak olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ps_pos10',
    card: 'The Magician',
    position: 10,
    upright:
      'Büyücü, olayın sonucunda gücünü kullanarak kendi potansiyelini gerçekleştireceğini gösterir.',
    reversed:
      'Ters Büyücü, olayın sonucunda manipülasyon, yanıltıcı durumlar ya da becerilerini yanlış yönde kullanma riski olabilir.',
    keywords: ['potansiyel', 'güç', 'yaratma', 'fırsat', 'başarı'],
    context:
      'Sonuç, potansiyelini ortaya koymak ya da yanlış yönlendirilmek olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ps_pos10',
    card: 'The High Priestess',
    position: 10,
    upright:
      'Başrahibe, olayın sonucunda içsel bilgelik, sırların açığa çıkması ve sezgilere güven kazanımı getirebilir.',
    reversed:
      'Ters Başrahibe, olayın sonucunda sezgileri görmezden gelme, yanlış bilgiler veya gizli kalan gerçekler olabilir.',
    keywords: ['bilgelik', 'sır', 'sezgi', 'gizlilik', 'aydınlanma'],
    context:
      'Sonuç, sezgisel farkındalık kazanmak ya da belirsizlikte kalmak olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ps_pos10',
    card: 'The Empress',
    position: 10,
    upright:
      'İmparatoriçe, olayın sonucunda bereket, üretkenlik ve duygusal tatmin elde edebilirsin.',
    reversed:
      'Ters İmparatoriçe, olayın sonucunda üretkenlik kaybı, duygusal dengesizlik ya da aşırı bağımlılık olabilir.',
    keywords: ['bereket', 'üretkenlik', 'bolluk', 'huzur', 'tatmin'],
    context: 'Sonuç, bolluk ve huzur ya da üretkenlik kaybı olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ps_pos10',
    card: 'The Emperor',
    position: 10,
    upright:
      'İmparator, olayın sonucunda düzen, istikrar ve güçlü bir temel oluşturabilirsin.',
    reversed:
      'Ters İmparator, olayın sonucunda otoriter baskı, katılık ya da kontrol kaybı olabilir.',
    keywords: ['düzen', 'istikrar', 'otorite', 'güç', 'kontrol'],
    context:
      'Sonuç, sağlam bir düzen kurmak ya da otorite baskısıyla sınanmak olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ps_pos10',
    card: 'The Hierophant',
    position: 10,
    upright:
      'Aziz, olayın sonucunda bilgeliğe erişim, rehberlik ve manevi uyum getirebilir.',
    reversed:
      'Ters Aziz, olayın sonucunda yanlış rehberlik, geleneklere başkaldırı ya da sahte öğretiler olabilir.',
    keywords: ['bilgelik', 'rehberlik', 'öğreti', 'gelenek', 'uyum'],
    context: 'Sonuç, bilgeliğe erişmek ya da yanlış yönlendirilmek olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos10',
    card: 'The Lovers',
    position: 10,
    upright:
      'Aşıklar, olayın sonucunda uyumlu bir birliktelik, doğru seçim ve kalpten bir bağlanma getirebilir.',
    reversed:
      'Ters Aşıklar, olayın sonucunda uyumsuzluk, yanlış seçim ya da ayrılık olabilir.',
    keywords: ['ilişki', 'seçim', 'uyum', 'bağ', 'karar'],
    context:
      'Sonuç, uyumlu bir bağ kurmak ya da uyumsuzlukla yüzleşmek olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ps_pos10',
    card: 'The Chariot',
    position: 10,
    upright:
      'Savaş Arabası, olayın sonucunda kararlılıkla ilerleme, zafer ve kontrolün sende olduğunu gösterir.',
    reversed:
      'Ters Savaş Arabası, olayın sonucunda yön kaybı, başarısızlık ya da kontrolsüzlük olabilir.',
    keywords: ['zafer', 'kontrol', 'ilerleme', 'başarı', 'kararlılık'],
    context: 'Sonuç, başarıyla ilerlemek ya da kontrolü kaybetmek olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ps_pos10',
    card: 'Strength',
    position: 10,
    upright:
      'Güç, olayın sonucunda sabır, cesaret ve içsel dayanıklılıkla sorunları aşabileceğini gösterir.',
    reversed:
      'Ters Güç, olayın sonucunda sabırsızlık, özgüven kaybı ya da öfke kontrolü sorunu olabilir.',
    keywords: ['cesaret', 'sabır', 'denge', 'dayanıklılık', 'özgüven'],
    context:
      'Sonuç, güçlü bir şekilde ayakta kalmak ya da sabrını kaybetmek olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ps_pos10',
    card: 'The Hermit',
    position: 10,
    upright:
      'Ermiş, olayın sonucunda içsel farkındalık, bilgelik ve yalnızca sana ait bir rehberlik kazanabilirsin.',
    reversed:
      'Ters Ermiş, olayın sonucunda aşırı yalnızlık, izolasyon ya da yanlış yönlendirilme olabilir.',
    keywords: ['bilgelik', 'arayış', 'rehberlik', 'yalnızlık', 'aydınlanma'],
    context: 'Sonuç, içsel ışığını bulmak ya da yalnızlığa çekilmek olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ps_pos10',
    card: 'The Wheel of Fortune',
    position: 10,
    upright:
      'Kader Çarkı, olayın sonucunda şansın açılması, talihin dönmesi ve olumlu değişimlerin başlaması olabilir.',
    reversed:
      'Ters Kader Çarkı, olayın sonucunda tekrar eden talihsizlikler, kötü zamanlama ya da kontrol dışı olaylar olabilir.',
    keywords: ['kader', 'şans', 'değişim', 'döngü', 'fırsat'],
    context:
      'Sonuç, şansın açılması ya da olumsuz bir döngüde sıkışmak olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ps_pos10',
    card: 'Justice',
    position: 10,
    upright:
      'Adalet, olayın sonucunda hakkaniyet, dürüstlük ve doğru kararlarla denge sağlanacağını gösterir.',
    reversed:
      'Ters Adalet, olayın sonucunda adaletsizlik, yanlış kararlar ya da sorumluluktan kaçış olabilir.',
    keywords: ['adalet', 'denge', 'karar', 'sorumluluk', 'gerçek'],
    context: 'Sonuç, adaletin sağlanması ya da haksızlıkla yüzleşmek olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ps_pos10',
    card: 'The Hanged Man',
    position: 10,
    upright:
      'Asılan Adam, olayın sonucunda yeni bir bakış açısı kazanmak, teslimiyet ve kabullenme olabilir.',
    reversed:
      'Ters Asılan Adam, olayın sonucunda isteksizlik, durağanlık ya da boşuna fedakarlık olabilir.',
    keywords: [
      'bakış açısı',
      'teslimiyet',
      'fedakarlık',
      'farkındalık',
      'duraklama',
    ],
    context: 'Sonuç, yeni bir bakış kazanmak ya da durağan kalmak olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ps_pos10',
    card: 'Death',
    position: 10,
    upright:
      'Ölüm, olayın sonucunda bir döngünün kapanması, bitiş ve güçlü bir dönüşüm olabilir.',
    reversed:
      'Ters Ölüm, olayın sonucunda değişime direnç, kapanmayan döngüler ya da gereksiz uzatmalar olabilir.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'değişim', 'kapanış'],
    context: 'Sonuç, güçlü bir dönüşüm ya da değişime direnç olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ps_pos10',
    card: 'Temperance',
    position: 10,
    upright:
      'Denge, olayın sonucunda uyum, sabır ve karşıtlıkların dengelenmesi olabilir.',
    reversed:
      'Ters Denge, olayın sonucunda uyumsuzluk, aşırılıklar ya da denge kaybı olabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'dengelemek', 'orta yol'],
    context: 'Sonuç, uyum sağlamak ya da dengesizlikle uğraşmak olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ps_pos10',
    card: 'The Devil',
    position: 10,
    upright:
      'Şeytan, olayın sonucunda bağımlılıklar, kısıtlamalar ya da geçici arzuların esareti olabilir.',
    reversed:
      'Ters Şeytan, olayın sonucunda özgürleşme, bağımlılıklardan kurtulma ve zincirleri kırma olabilir.',
    keywords: ['bağımlılık', 'esaret', 'özgürleşme', 'arzu', 'kısıtlama'],
    context: 'Sonuç, bağımlı kalmak ya da özgürleşmek olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ps_pos10',
    card: 'The Tower',
    position: 10,
    upright:
      'Kule, olayın sonucunda ani bir kriz, beklenmedik yıkım ya da köklü bir değişim olabilir.',
    reversed:
      'Ters Kule, olayın sonucunda ertelenmiş bir kriz, bastırılan değişimler ya da sarsıntılı süreçler olabilir.',
    keywords: ['kriz', 'değişim', 'yıkım', 'sarsıntı', 'yenilenme'],
    context:
      'Sonuç, ani bir yıkım ya da bastırılmış krizlerin açığa çıkması olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ps_pos10',
    card: 'The Star',
    position: 10,
    upright:
      'Yıldız, olayın sonucunda umut, şifa ve ilham dolu bir yenilenme süreci olabilir.',
    reversed:
      'Ters Yıldız, olayın sonucunda umutsuzluk, inanç kaybı ya da karamsarlık olabilir.',
    keywords: ['umut', 'ilham', 'şifa', 'gelecek', 'aydınlanma'],
    context: 'Sonuç, umut dolu bir yenilenme ya da karamsarlık olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ps_pos10',
    card: 'The Moon',
    position: 10,
    upright:
      'Ay, olayın sonucunda belirsizlik, sezgilerin öne çıkması ya da gizli gerçeklerin ortaya çıkması olabilir.',
    reversed:
      'Ters Ay, olayın sonucunda yanılsamalar, aldatıcı durumlar ya da içsel korkuların büyümesi olabilir.',
    keywords: ['belirsizlik', 'sezgi', 'yanılsama', 'giz', 'aydınlanma'],
    context:
      'Sonuç, sezgisel farkındalık ya da yanılsamalarla yüzleşmek olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos10',
    card: 'The Sun',
    position: 10,
    upright:
      'Güneş, olayın sonucunda başarı, mutluluk ve aydınlanma elde edebilirsin.',
    reversed:
      'Ters Güneş, olayın sonucunda geçici karamsarlık, özgüven kaybı ya da görünürlüğün azalması olabilir.',
    keywords: ['başarı', 'mutluluk', 'aydınlanma', 'özgüven', 'zafer'],
    context: 'Sonuç, parlak bir mutluluk ya da geçici gölgeler olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos10',
    card: 'Judgement',
    position: 10,
    upright:
      'Mahkeme, olayın sonucunda yeniden doğuş, affetme ve geçmişten özgürleşme olabilir.',
    reversed:
      'Ters Mahkeme, olayın sonucunda fırsatları kaçırma, sorumluluklardan kaçış ya da affedememe olabilir.',
    keywords: ['yeniden doğuş', 'karar', 'özgürleşme', 'geçmiş', 'hesaplaşma'],
    context: 'Sonuç, yeniden doğuş ya da fırsatların kaçırılması olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos10',
    card: 'The World',
    position: 10,
    upright:
      'Dünya, olayın sonucunda tamamlanma, bütünlük ve başarıyla yeni bir döngüye girme olabilir.',
    reversed:
      'Ters Dünya, olayın sonucunda eksiklik, başarısızlık ya da tamamlanamayan süreçler olabilir.',
    keywords: ['tamamlanma', 'başarı', 'döngü', 'bütünlük', 'kapanış'],
    context: 'Sonuç, döngüyü kapatmak ya da yarım kalmışlık olabilir.',
    group: 'Majör Arkana',
  },
  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_ps_pos10',
    card: 'Ace of Cups',
    position: 10,
    upright:
      'Kupa Ası, olayın sonucunda duygusal bir yenilenme, yeni bir aşk ya da kalpten gelen bir mutluluk olabilir.',
    reversed:
      'Ters Kupa Ası, olayın sonucunda hayal kırıklığı, duygusal kapanma ya da karşılıksız duygular olabilir.',
    keywords: ['aşk', 'yenilenme', 'mutluluk', 'başlangıç', 'sevgi'],
    context:
      'Sonuç, kalpten gelen bir açılım ya da duygusal hayal kırıklığı olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ps_pos10',
    card: 'Two of Cups',
    position: 10,
    upright:
      'İki Kupa, olayın sonucunda uyumlu bir birliktelik, dostluk ya da ortaklık doğabilir.',
    reversed:
      'Ters İki Kupa, olayın sonucunda uyumsuzluk, ayrılık ya da anlaşmazlık olabilir.',
    keywords: ['birlik', 'ortaklık', 'uyum', 'sevgi', 'ilişki'],
    context: 'Sonuç, güçlü bir bağ kurmak ya da ayrılık olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ps_pos10',
    card: 'Three of Cups',
    position: 10,
    upright:
      'Üç Kupa, olayın sonucunda kutlama, destekleyici dostluklar ve mutluluk dolu bir birliktelik olabilir.',
    reversed:
      'Ters Üç Kupa, olayın sonucunda sahte dostluklar, yanlış anlaşılmalar ya da sosyal kopukluk olabilir.',
    keywords: ['kutlama', 'destek', 'arkadaşlık', 'mutluluk', 'birlik'],
    context: 'Sonuç, kutlama yapmak ya da dostlukları sorgulamak olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ps_pos10',
    card: 'Four of Cups',
    position: 10,
    upright:
      'Dört Kupa, olayın sonucunda içsel sorgulama, tatminsizlik ya da fark edilmeyen fırsatların açığa çıkması olabilir.',
    reversed:
      'Ters Dört Kupa, olayın sonucunda yeni bir farkındalık, fırsatları değerlendirme ya da uyanış olabilir.',
    keywords: ['tatminsizlik', 'fırsat', 'farkındalık', 'sorgulama', 'uyanış'],
    context: 'Sonuç, içsel sorgulama ya da farkındalığa ulaşmak olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ps_pos10',
    card: 'Five of Cups',
    position: 10,
    upright:
      'Beş Kupa, olayın sonucunda kayıplara odaklanmak, hayal kırıklığı ya da pişmanlık olabilir.',
    reversed:
      'Ters Beş Kupa, olayın sonucunda geçmişi bırakma, affetme ve yeniden toparlanma olabilir.',
    keywords: ['kayıp', 'pişmanlık', 'hayal kırıklığı', 'toparlanma', 'şifa'],
    context: 'Sonuç, pişmanlık yaşamak ya da yeniden şifa bulmak olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ps_pos10',
    card: 'Six of Cups',
    position: 10,
    upright:
      'Altı Kupa, olayın sonucunda geçmişten gelen güzel anılar, barışma ya da nostaljik bir mutluluk olabilir.',
    reversed:
      'Ters Altı Kupa, olayın sonucunda geçmişe takılmak, ileriye gidememek ya da çocukça davranışlar olabilir.',
    keywords: ['geçmiş', 'nostalji', 'barışma', 'mutluluk', 'anılar'],
    context: 'Sonuç, geçmişten gelen mutluluk ya da ilerleyememek olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ps_pos10',
    card: 'Seven of Cups',
    position: 10,
    upright:
      'Yedi Kupa, olayın sonucunda birçok seçenek, hayallerin gerçekleşmesi ya da yaratıcılıkla dolu bir süreç olabilir.',
    reversed:
      'Ters Yedi Kupa, olayın sonucunda kafa karışıklığı, yanlış seçimler ya da yanılsamalar olabilir.',
    keywords: ['seçenek', 'hayal', 'yaratıcılık', 'karar', 'yanılsama'],
    context: 'Sonuç, çok seçenekli bir dönem ya da kafa karışıklığı olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ps_pos10',
    card: 'Eight of Cups',
    position: 10,
    upright:
      'Sekiz Kupa, olayın sonucunda tatmin etmeyen şeyleri geride bırakmak ve yeni bir yola çıkmak olabilir.',
    reversed:
      'Ters Sekiz Kupa, olayın sonucunda geri dönmek, ilerleyememek ya da kararsızlık olabilir.',
    keywords: ['bırakış', 'yolculuk', 'tatminsizlik', 'kaçış', 'ilerleme'],
    context: 'Sonuç, ilerlemek ya da geri dönmek olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ps_pos10',
    card: 'Nine of Cups',
    position: 10,
    upright:
      'Dokuz Kupa, olayın sonucunda dileklerin gerçekleşmesi, tatmin ve mutluluk olabilir.',
    reversed:
      'Ters Dokuz Kupa, olayın sonucunda yüzeysel tatmin, doyumsuzluk ya da hayal kırıklığı olabilir.',
    keywords: ['mutluluk', 'tatmin', 'dilek', 'keyif', 'doyum'],
    context: 'Sonuç, büyük bir mutluluk ya da doyumsuzluk olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ps_pos10',
    card: 'Ten of Cups',
    position: 10,
    upright:
      'On Kupa, olayın sonucunda ailevi mutluluk, uyum ve kalıcı huzur olabilir.',
    reversed:
      'Ters On Kupa, olayın sonucunda aile içi uyumsuzluk, huzursuzluk ya da kalıcı mutluluk kaybı olabilir.',
    keywords: ['aile', 'mutluluk', 'uyum', 'huzur', 'ilişki'],
    context: 'Sonuç, kalıcı huzur ya da ailevi uyumsuzluk olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ps_pos10',
    card: 'Page of Cups',
    position: 10,
    upright:
      'Kupa Prensi, olayın sonucunda duygusal bir teklif, yeni bir romantik başlangıç ya da ilham verici bir gelişme olabilir.',
    reversed:
      'Ters Kupa Prensi, olayın sonucunda yüzeysel duygular, reddedilme ya da hayal kırıklığı olabilir.',
    keywords: ['romantizm', 'teklif', 'başlangıç', 'ilham', 'hayal'],
    context: 'Sonuç, romantik bir gelişme ya da hayal kırıklığı olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ps_pos10',
    card: 'Knight of Cups',
    position: 10,
    upright:
      'Kupa Şövalyesi, olayın sonucunda duygusal bir yolculuk, romantik bir teklif ya da idealist bir girişim olabilir.',
    reversed:
      'Ters Kupa Şövalyesi, olayın sonucunda boş vaatler, yanıltıcı teklifler ya da duygusal hayal kırıklıkları olabilir.',
    keywords: ['romantizm', 'teklif', 'hayal', 'yolculuk', 'ideal'],
    context: 'Sonuç, romantik bir teklif ya da boş vaat olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ps_pos10',
    card: 'Queen of Cups',
    position: 10,
    upright:
      'Kupa Kraliçesi, olayın sonucunda duygusal denge, şefkat ve anlayışla dolu bir süreç olabilir.',
    reversed:
      'Ters Kupa Kraliçesi, olayın sonucunda aşırı hassasiyet, bağımlılık ya da duygusal dengesizlik olabilir.',
    keywords: ['şefkat', 'denge', 'anlayış', 'hassasiyet', 'duygu'],
    context: 'Sonuç, duygusal denge ya da aşırılık olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ps_pos10',
    card: 'King of Cups',
    position: 10,
    upright:
      'Kupa Kralı, olayın sonucunda olgunluk, duyguların dengelenmesi ve bilgece rehberlik olabilir.',
    reversed:
      'Ters Kupa Kralı, olayın sonucunda duygusal istikrarsızlık, manipülasyon ya da kontrol kaybı olabilir.',
    keywords: ['olgunluk', 'denge', 'rehberlik', 'duygu', 'kontrol'],
    context: 'Sonuç, olgunluk kazanmak ya da dengesizlik olabilir.',
    group: 'Kupalar',
  },
  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_ps_pos10',
    card: 'Ace of Swords',
    position: 10,
    upright:
      'Kılıç Ası, olayın sonucunda netlik, güçlü bir karar ve yeni bir zihinsel başlangıç elde edebilirsin.',
    reversed:
      'Ters Kılıç Ası, olayın sonucunda kafa karışıklığı, yanlış anlaşılmalar veya başarısız kararlar olabilir.',
    keywords: ['netlik', 'karar', 'başlangıç', 'zihin', 'gerçek'],
    context: 'Sonuç, zihinsel netlik ya da kafa karışıklığı olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ps_pos10',
    card: 'Two of Swords',
    position: 10,
    upright:
      'İki Kılıç, olayın sonucunda önemli bir karara varmak ya da dengeyi sağlamak olabilir.',
    reversed:
      'Ters İki Kılıç, olayın sonucunda karar verememek, kör noktalar ya da yanlış seçimler olabilir.',
    keywords: ['karar', 'denge', 'ikilem', 'seçim', 'netlik'],
    context: 'Sonuç, karar vermek ya da kararsızlıkta kalmak olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ps_pos10',
    card: 'Three of Swords',
    position: 10,
    upright:
      'Üç Kılıç, olayın sonucunda bir ayrılık, hayal kırıklığı veya duygusal bir acı olabilir.',
    reversed:
      'Ters Üç Kılıç, olayın sonucunda affetme, iyileşme ve kalp yaralarının kapanması olabilir.',
    keywords: ['ayrılık', 'hayal kırıklığı', 'acı', 'ihanet', 'iyileşme'],
    context: 'Sonuç, kalp kırıklığı ya da iyileşme olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ps_pos10',
    card: 'Four of Swords',
    position: 10,
    upright:
      'Dört Kılıç, olayın sonucunda dinlenme, toparlanma ve zihinsel huzur bulma olabilir.',
    reversed:
      'Ters Dört Kılıç, olayın sonucunda zorunlu bir duraklama, tükenmişlik ya da gecikme olabilir.',
    keywords: ['dinlenme', 'toparlanma', 'huzur', 'zihin', 'duraklama'],
    context: 'Sonuç, huzur bulmak ya da tükenmişlik olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ps_pos10',
    card: 'Five of Swords',
    position: 10,
    upright:
      'Beş Kılıç, olayın sonucunda bir çatışmanın kazanılması ama bunun kalıcı bir huzur getirmemesi olabilir.',
    reversed:
      'Ters Beş Kılıç, olayın sonucunda uzlaşma, barışma ya da gereksiz kavgaların bitmesi olabilir.',
    keywords: ['çatışma', 'zafer', 'uzlaşma', 'gurur', 'kaygı'],
    context: 'Sonuç, geçici bir zafer ya da barışma olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ps_pos10',
    card: 'Six of Swords',
    position: 10,
    upright:
      'Altı Kılıç, olayın sonucunda bir geçiş, yolculuk ya da zorluklardan uzaklaşmak olabilir.',
    reversed:
      'Ters Altı Kılıç, olayın sonucunda geri dönüş, sıkışma ya da ilerleyememe olabilir.',
    keywords: ['geçiş', 'yolculuk', 'ilerleme', 'kaçış', 'yenilenme'],
    context: 'Sonuç, ileriye yol almak ya da sıkışıp kalmak olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ps_pos10',
    card: 'Seven of Swords',
    position: 10,
    upright:
      'Yedi Kılıç, olayın sonucunda gizli planlar, stratejik hamleler ya da dikkatli ilerleme olabilir.',
    reversed:
      'Ters Yedi Kılıç, olayın sonucunda sırların açığa çıkması, yakalanma ya da dürüstlüğün önem kazanması olabilir.',
    keywords: ['strateji', 'gizlilik', 'plan', 'dürüstlük', 'yakalanma'],
    context: 'Sonuç, stratejik başarı ya da sırların açığa çıkması olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ps_pos10',
    card: 'Eight of Swords',
    position: 10,
    upright:
      'Sekiz Kılıç, olayın sonucunda sınırlanmış hissetmek, özgürlüğü bulamamak ya da engellerle yüzleşmek olabilir.',
    reversed:
      'Ters Sekiz Kılıç, olayın sonucunda özgürleşme, engellerden kurtulma ve yeni yollar bulma olabilir.',
    keywords: ['özgürlük', 'engel', 'sınırlama', 'kaçış', 'çözüm'],
    context: 'Sonuç, sıkışmak ya da özgürleşmek olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ps_pos10',
    card: 'Nine of Swords',
    position: 10,
    upright:
      'Dokuz Kılıç, olayın sonucunda yoğun kaygılar, stres ya da uykusuzluk olabilir.',
    reversed:
      'Ters Dokuz Kılıç, olayın sonucunda kaygıların hafiflemesi, içsel huzur ya da kabusların sona ermesi olabilir.',
    keywords: ['kaygı', 'stres', 'huzur', 'zihin', 'endişe'],
    context: 'Sonuç, kaygı yaşamak ya da huzur bulmak olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ps_pos10',
    card: 'Ten of Swords',
    position: 10,
    upright:
      'On Kılıç, olayın sonucunda bir bitiş, büyük bir son ya da acı bir kapanış olabilir.',
    reversed:
      'Ters On Kılıç, olayın sonucunda toparlanma, yeniden ayağa kalkma ya da yeni bir başlangıç olabilir.',
    keywords: ['bitiş', 'acı', 'ihanet', 'yeniden doğuş', 'son'],
    context: 'Sonuç, bitiş ya da yeniden doğuş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ps_pos10',
    card: 'Page of Swords',
    position: 10,
    upright:
      'Kılıç Prensi, olayın sonucunda yeni bilgiler edinmek, merakla ilerlemek ya da iletişim fırsatları olabilir.',
    reversed:
      'Ters Kılıç Prensi, olayın sonucunda yanlış bilgi, dedikodu ya da dikkatsizlik olabilir.',
    keywords: ['bilgi', 'iletişim', 'merak', 'öğrenme', 'dikkat'],
    context: 'Sonuç, yeni bilgiler edinmek ya da yanlış anlaşılmak olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ps_pos10',
    card: 'Knight of Swords',
    position: 10,
    upright:
      'Kılıç Şövalyesi, olayın sonucunda hızlı ilerleme, kararlı bir hamle ya da cesaret göstermek olabilir.',
    reversed:
      'Ters Kılıç Şövalyesi, olayın sonucunda acelecilik, plansızlık ya da yönsüz hareket olabilir.',
    keywords: ['hız', 'cesaret', 'kararlılık', 'hamle', 'plansızlık'],
    context: 'Sonuç, hızlı bir ilerleme ya da acelecilik olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ps_pos10',
    card: 'Queen of Swords',
    position: 10,
    upright:
      'Kılıç Kraliçesi, olayın sonucunda mantıklı kararlar, bağımsızlık ve net iletişim olabilir.',
    reversed:
      'Ters Kılıç Kraliçesi, olayın sonucunda soğukluk, aşırı eleştiri ya da yanlış anlamalar olabilir.',
    keywords: ['mantık', 'bağımsızlık', 'iletişim', 'eleştiri', 'netlik'],
    context: 'Sonuç, mantıklı kararlar ya da yanlış anlamalar olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ps_pos10',
    card: 'King of Swords',
    position: 10,
    upright:
      'Kılıç Kralı, olayın sonucunda adaletli kararlar, mantıklı liderlik ve zihinsel güç olabilir.',
    reversed:
      'Ters Kılıç Kralı, olayın sonucunda baskıcı kararlar, adaletsizlik ya da soğuk otorite olabilir.',
    keywords: ['adalet', 'mantık', 'otorite', 'liderlik', 'karar'],
    context: 'Sonuç, adaletli bir yönetim ya da baskıcı kararlar olabilir.',
    group: 'Kılıçlar',
  },
  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_ps_pos10',
    card: 'Ace of Pentacles',
    position: 10,
    upright:
      'Tılsım Ası, olayın sonucunda yeni maddi fırsatlar, güvenli bir başlangıç ve bollukla dolu bir temel olabilir.',
    reversed:
      'Ters Tılsım Ası, olayın sonucunda kaçırılmış fırsatlar, yanlış yatırımlar ya da güvensiz bir temel olabilir.',
    keywords: ['fırsat', 'bolluk', 'güvenlik', 'başlangıç', 'yatırım'],
    context: 'Sonuç, yeni maddi kazançlar ya da kaçırılan fırsatlar olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ps_pos10',
    card: 'Two of Pentacles',
    position: 10,
    upright:
      'İki Tılsım, olayın sonucunda dengeli bir yönetim, esneklik ve sorumlulukları dengeleme olabilir.',
    reversed:
      'Ters İki Tılsım, olayın sonucunda dengesizlik, sorumlulukların altında ezilme ya da uyumsuzluk olabilir.',
    keywords: ['denge', 'sorumluluk', 'esneklik', 'uyum', 'karar'],
    context: 'Sonuç, dengeyi bulmak ya da sorumluluklarla zorlanmak olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ps_pos10',
    card: 'Three of Pentacles',
    position: 10,
    upright:
      'Üç Tılsım, olayın sonucunda işbirliği, takdir görmek ve sağlam bir temel üzerine başarı olabilir.',
    reversed:
      'Ters Üç Tılsım, olayın sonucunda uyumsuzluk, yetersiz işbirliği ya da destek eksikliği olabilir.',
    keywords: ['işbirliği', 'başarı', 'takdir', 'ekip', 'temel'],
    context: 'Sonuç, işbirliğiyle başarı ya da uyumsuzluk olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ps_pos10',
    card: 'Four of Pentacles',
    position: 10,
    upright:
      'Dört Tılsım, olayın sonucunda güvenliğin korunması, maddi istikrar ya da sahip olduklarını güçlendirmek olabilir.',
    reversed:
      'Ters Dört Tılsım, olayın sonucunda cimrilik, kontrol kaybı ya da bağımlı hale gelmek olabilir.',
    keywords: ['güvenlik', 'istikrar', 'koruma', 'kontrol', 'maddi güç'],
    context: 'Sonuç, güvenliği korumak ya da kaybetmek olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ps_pos10',
    card: 'Five of Pentacles',
    position: 10,
    upright:
      'Beş Tılsım, olayın sonucunda maddi zorluk, yalnızlık ya da destek arayışı olabilir.',
    reversed:
      'Ters Beş Tılsım, olayın sonucunda toparlanma, destek bulma ya da maddi sıkıntılardan çıkış olabilir.',
    keywords: ['zorluk', 'yalnızlık', 'destek', 'maddi kayıp', 'toparlanma'],
    context: 'Sonuç, zor bir dönem ya da toparlanma olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ps_pos10',
    card: 'Six of Pentacles',
    position: 10,
    upright:
      'Altı Tılsım, olayın sonucunda denge, yardım alma ya da başkalarına destek olma olabilir.',
    reversed:
      'Ters Altı Tılsım, olayın sonucunda adaletsizlik, bağımlılık ya da dengesiz ilişkiler olabilir.',
    keywords: ['yardım', 'denge', 'paylaşım', 'adalet', 'destek'],
    context: 'Sonuç, adil paylaşım ya da dengesizlik olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ps_pos10',
    card: 'Seven of Pentacles',
    position: 10,
    upright:
      'Yedi Tılsım, olayın sonucunda emeklerin karşılığını almak, sabırlı bir bekleyişin ödüllendirilmesi olabilir.',
    reversed:
      'Ters Yedi Tılsım, olayın sonucunda sabırsızlık, yanlış yatırımlar ya da hayal kırıklıkları olabilir.',
    keywords: ['emek', 'sabır', 'yatırım', 'ödül', 'bekleyiş'],
    context: 'Sonuç, emeğin karşılığı ya da hayal kırıklığı olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ps_pos10',
    card: 'Eight of Pentacles',
    position: 10,
    upright:
      'Sekiz Tılsım, olayın sonucunda ustalık kazanmak, öğrenmek ve emeğinin karşılığını almak olabilir.',
    reversed:
      'Ters Sekiz Tılsım, olayın sonucunda dikkatsizlik, başarısızlık ya da yetersiz çaba olabilir.',
    keywords: ['çalışma', 'ustalık', 'öğrenme', 'başarı', 'emek'],
    context: 'Sonuç, ustalaşmak ya da dikkatsizlik olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ps_pos10',
    card: 'Nine of Pentacles',
    position: 10,
    upright:
      'Dokuz Tılsım, olayın sonucunda bağımsızlık, özgüven ve bolluğun tadını çıkarma olabilir.',
    reversed:
      'Ters Dokuz Tılsım, olayın sonucunda bağımlılık, savurganlık ya da özgürlüğün kaybı olabilir.',
    keywords: ['bağımsızlık', 'özgüven', 'bolluk', 'özgürlük', 'keyif'],
    context: 'Sonuç, özgürlük ve bolluk ya da bağımlılık olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ps_pos10',
    card: 'Ten of Pentacles',
    position: 10,
    upright:
      'On Tılsım, olayın sonucunda ailevi istikrar, uzun vadeli başarı ve kalıcı güvence olabilir.',
    reversed:
      'Ters On Tılsım, olayın sonucunda ailevi huzursuzluk, kayıplar ya da başarısız yatırımlar olabilir.',
    keywords: ['aile', 'istikrar', 'başarı', 'güvence', 'uzun vadeli'],
    context: 'Sonuç, kalıcı güvence ya da huzursuzluk olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ps_pos10',
    card: 'Page of Pentacles',
    position: 10,
    upright:
      'Tılsım Prensi, olayın sonucunda yeni bir fırsat, öğrenme şansı ve sağlam bir başlangıç olabilir.',
    reversed:
      'Ters Tılsım Prensi, olayın sonucunda isteksizlik, motivasyon kaybı ya da başarısızlık olabilir.',
    keywords: ['öğrenme', 'fırsat', 'başlangıç', 'maddi güven', 'motivasyon'],
    context: 'Sonuç, öğrenme fırsatı ya da başarısızlık olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ps_pos10',
    card: 'Knight of Pentacles',
    position: 10,
    upright:
      'Tılsım Şövalyesi, olayın sonucunda istikrarlı ilerleme, güvenli adımlar ve sorumlulukların yerine getirilmesi olabilir.',
    reversed:
      'Ters Tılsım Şövalyesi, olayın sonucunda durağanlık, tembellik ya da görevleri ihmal etme olabilir.',
    keywords: ['istikrar', 'sorumluluk', 'ilerleme', 'durağanlık', 'güven'],
    context: 'Sonuç, istikrarla ilerlemek ya da durağan kalmak olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ps_pos10',
    card: 'Queen of Pentacles',
    position: 10,
    upright:
      'Tılsım Kraliçesi, olayın sonucunda bolluk, şefkatle destek ve maddi güvenlik olabilir.',
    reversed:
      'Ters Tılsım Kraliçesi, olayın sonucunda öz bakım eksikliği, güvensizlik ya da aşırı bağımlılık olabilir.',
    keywords: ['bolluk', 'şefkat', 'güvenlik', 'destek', 'maddi güç'],
    context: 'Sonuç, bolluk ve güvenlik ya da bağımlılık olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ps_pos10',
    card: 'King of Pentacles',
    position: 10,
    upright:
      'Tılsım Kralı, olayın sonucunda büyük bir başarı, otorite ve maddi güvence olabilir.',
    reversed:
      'Ters Tılsım Kralı, olayın sonucunda otoriterlik, aşırı hırs ya da kayıp olabilir.',
    keywords: ['başarı', 'otorite', 'bolluk', 'güvenlik', 'liderlik'],
    context: 'Sonuç, kalıcı başarı ya da otorite baskısı olabilir.',
    group: 'Tılsımlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_ps_pos10',
    card: 'Ace of Wands',
    position: 10,
    upright:
      'Değnek Ası, olayın sonucunda yeni bir başlangıç, ilham verici bir fırsat ve yaratıcı bir girişim olabilir.',
    reversed:
      'Ters Değnek Ası, olayın sonucunda motivasyon eksikliği, ertelenen projeler ya da hedefsizlik olabilir.',
    keywords: ['ilham', 'başlangıç', 'yaratıcılık', 'motivasyon', 'fırsat'],
    context:
      'Sonuç, yaratıcı bir başlangıç ya da ertelenmiş bir girişim olabilir.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ps_pos10',
    card: 'Two of Wands',
    position: 10,
    upright:
      'İki Değnek, olayın sonucunda geleceğe yönelik planların netleşmesi, vizyon ve ilerleme olabilir.',
    reversed:
      'Ters İki Değnek, olayın sonucunda plansızlık, vizyon eksikliği ya da fırsatları kaçırmak olabilir.',
    keywords: ['vizyon', 'plan', 'gelecek', 'ilerleme', 'karar'],
    context: 'Sonuç, vizyon geliştirmek ya da plansız kalmak olabilir.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ps_pos10',
    card: 'Three of Wands',
    position: 10,
    upright:
      'Üç Değnek, olayın sonucunda genişleyen fırsatlar, yeni işbirlikleri ve ufukların açılması olabilir.',
    reversed:
      'Ters Üç Değnek, olayın sonucunda gecikmeler, başarısız girişimler ya da beklentilerin karşılanmaması olabilir.',
    keywords: ['fırsat', 'işbirliği', 'ilerleme', 'vizyon', 'genişleme'],
    context: 'Sonuç, yeni fırsatlar ya da hayal kırıklıkları olabilir.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ps_pos10',
    card: 'Four of Wands',
    position: 10,
    upright:
      'Dört Değnek, olayın sonucunda kutlama, başarı ve sağlam bir temel üzerine kurulu uyum olabilir.',
    reversed:
      'Ters Dört Değnek, olayın sonucunda uyumsuzluk, ailevi huzursuzluk ya da istikrarsızlık olabilir.',
    keywords: ['kutlama', 'temel', 'uyum', 'başarı', 'istikrar'],
    context: 'Sonuç, kutlama yapmak ya da uyumsuzlukla yüzleşmek olabilir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ps_pos10',
    card: 'Five of Wands',
    position: 10,
    upright:
      'Beş Değnek, olayın sonucunda rekabet, mücadele ve kendi gücünü kanıtlamak olabilir.',
    reversed:
      'Ters Beş Değnek, olayın sonucunda gereksiz çatışmaların sona ermesi, barış ya da uyum sağlamak olabilir.',
    keywords: ['rekabet', 'mücadele', 'çatışma', 'dayanıklılık', 'barış'],
    context: 'Sonuç, mücadele etmek ya da uyum sağlamak olabilir.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ps_pos10',
    card: 'Six of Wands',
    position: 10,
    upright:
      'Altı Değnek, olayın sonucunda zafer, tanınma ve hak edilen başarı olabilir.',
    reversed:
      'Ters Altı Değnek, olayın sonucunda kıskançlık, takdir görmeme ya da başarısızlık olabilir.',
    keywords: ['zafer', 'başarı', 'tanınma', 'görünürlük', 'gurur'],
    context: 'Sonuç, büyük bir zafer ya da geçici bir başarısızlık olabilir.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ps_pos10',
    card: 'Seven of Wands',
    position: 10,
    upright:
      'Yedi Değnek, olayın sonucunda kendini savunmak, güçlü durmak ve mücadelede kararlılık olabilir.',
    reversed:
      'Ters Yedi Değnek, olayın sonucunda geri çekilmek, direncin kırılması ya da pes etmek olabilir.',
    keywords: ['savunma', 'kararlılık', 'direnç', 'mücadele', 'pes etmek'],
    context: 'Sonuç, güçlü bir savunma ya da geri çekilmek olabilir.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ps_pos10',
    card: 'Eight of Wands',
    position: 10,
    upright:
      'Sekiz Değnek, olayın sonucunda hızlı gelişmeler, haberler ve engellerin aşılması olabilir.',
    reversed:
      'Ters Sekiz Değnek, olayın sonucunda gecikmeler, iletişim sorunları ya da yanlış anlaşılmalar olabilir.',
    keywords: ['hız', 'haber', 'gelişme', 'iletişim', 'engeller'],
    context: 'Sonuç, hızlı bir ilerleme ya da gecikme olabilir.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ps_pos10',
    card: 'Nine of Wands',
    position: 10,
    upright:
      'Dokuz Değnek, olayın sonucunda sabır, dirayet ve son bir mücadeleyle başarıya ulaşmak olabilir.',
    reversed:
      'Ters Dokuz Değnek, olayın sonucunda tükenmişlik, savunmasızlık ya da direnç kaybı olabilir.',
    keywords: ['direnç', 'sabır', 'mücadele', 'dayanıklılık', 'kararlılık'],
    context: 'Sonuç, dayanıklılıkla ayakta kalmak ya da tükenmek olabilir.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ps_pos10',
    card: 'Ten of Wands',
    position: 10,
    upright:
      'On Değnek, olayın sonucunda sorumlulukların tamamlanması, yüklerin taşınması ve başarıyla bitiş olabilir.',
    reversed:
      'Ters On Değnek, olayın sonucunda aşırı yüklenmek, yardım alamamak ya da tükenmişlik olabilir.',
    keywords: ['sorumluluk', 'yük', 'tamamlama', 'başarı', 'bitirme'],
    context: 'Sonuç, başarıyla tamamlama ya da tükenmişlik olabilir.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ps_pos10',
    card: 'Page of Wands',
    position: 10,
    upright:
      'Değnek Prensi, olayın sonucunda yeni bir keşif, ilham verici bir başlangıç ya da heyecanlı bir yolculuk olabilir.',
    reversed:
      'Ters Değnek Prensi, olayın sonucunda dikkatsizlik, motivasyon kaybı ya da yüzeysel girişimler olabilir.',
    keywords: ['keşif', 'ilham', 'başlangıç', 'heyecan', 'enerji'],
    context:
      'Sonuç, heyecan verici bir keşif ya da yüzeysel bir girişim olabilir.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ps_pos10',
    card: 'Knight of Wands',
    position: 10,
    upright:
      'Değnek Şövalyesi, olayın sonucunda cesur adımlar, hızlı gelişmeler ve tutkulu girişimler olabilir.',
    reversed:
      'Ters Değnek Şövalyesi, olayın sonucunda savrukluk, yönsüzlük ya da acelecilik olabilir.',
    keywords: ['cesaret', 'hareket', 'tutku', 'hız', 'gelişme'],
    context: 'Sonuç, tutkulu bir ilerleme ya da acelecilik olabilir.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ps_pos10',
    card: 'Queen of Wands',
    position: 10,
    upright:
      'Değnek Kraliçesi, olayın sonucunda özgüven, karizma ve güçlü bir liderlik olabilir.',
    reversed:
      'Ters Değnek Kraliçesi, olayın sonucunda kıskançlık, güvensizlik ya da dengesizlik olabilir.',
    keywords: ['özgüven', 'karizma', 'liderlik', 'güç', 'çekicilik'],
    context: 'Sonuç, güçlü bir duruş ya da dengesizlik olabilir.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ps_pos10',
    card: 'King of Wands',
    position: 10,
    upright:
      'Değnek Kralı, olayın sonucunda vizyoner liderlik, başarı ve güçlü bir yönlendirme olabilir.',
    reversed:
      'Ters Değnek Kralı, olayın sonucunda otoriterlik, yön kaybı ya da kibir olabilir.',
    keywords: ['liderlik', 'vizyon', 'başarı', 'otorite', 'güç'],
    context: 'Sonuç, vizyoner bir başarı ya da yönsüzlük olabilir.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition10Meaning(
  card: TarotCard
): ProblemSolvingPosition10Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position10Meanings.find(
    m =>
      m.card === card.name ||
      m.card === card.nameTr ||
      card.name === m.card ||
      card.nameTr === m.card
  );

  if (meaning) {
    return meaning;
  }

  // Ana mapping sistemini kullan
  const cardNameMapping = getCardNameMappingSync();

  // Türkçe ismi İngilizce'ye çevir
  const englishName = cardNameMapping[card.nameTr] || card.nameTr;

  // İngilizce isimle tekrar ara
  meaning = position10Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition10MeaningByCardName(
  cardName: string
): ProblemSolvingPosition10Meaning | null {
  return position10Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllProblemSolvingPosition10Meanings(): ProblemSolvingPosition10Meaning[] {
  return position10Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getProblemSolvingPosition10MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): ProblemSolvingPosition10Meaning[] {
  return position10Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition10Meanings = (): I18nProblemSolvingPosition10Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position10Meanings.map(meaning => {
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
export const getI18nPosition10Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nProblemSolvingPosition10Meaning | null => {
  const originalMeaning = position10Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `problem-solving.meanings.${cardKey}.position10.upright`
  );
  const i18nReversed = t(
    `problem-solving.meanings.${cardKey}.position10.reversed`
  );
  const i18nKeywords = t(
    `problem-solving.meanings.${cardKey}.position10.keywords`
  );
  const i18nContext = t(
    `problem-solving.meanings.${cardKey}.position10.context`
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
const problemSolvingPosition10Exports = {
  position10Meanings,
  getProblemSolvingPosition10Meaning,
  getProblemSolvingPosition10MeaningByCardName,
  getAllProblemSolvingPosition10Meanings,
  getProblemSolvingPosition10MeaningsByGroup,
  getI18nPosition10Meaning,
};

export default problemSolvingPosition10Exports;
