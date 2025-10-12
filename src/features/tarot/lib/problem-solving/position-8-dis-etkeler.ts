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

export interface ProblemSolvingPosition8Meaning {
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
export interface I18nProblemSolvingPosition8Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position8Meanings: ProblemSolvingPosition8Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ps_pos8',
    card: 'The Fool',
    position: 8,
    upright:
      'Joker, dış çevreden gelen etkiler seni yeni bir başlangıca yönlendirebilir. Beklenmedik fırsatlar veya maceracı enerjiler hayatına girebilir.',
    reversed:
      'Ters Joker, dış etkenler seni dikkatsizliğe, belirsizliğe ya da yanlış yönlendirmelere itebilir.',
    keywords: ['başlangıç', 'özgürlük', 'risk', 'macera', 'fırsat'],
    context:
      'Dış etkiler, seni cesur başlangıçlara ya da dikkatsiz adımlara sürükleyebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ps_pos8',
    card: 'The Magician',
    position: 8,
    upright:
      'Büyücü, dış çevre sana kaynak, fırsat ve yaratıcı iş birlikleri sunuyor olabilir.',
    reversed:
      'Ters Büyücü, dış etkiler seni manipülasyona, yanıltıcı tekliflere ya da sahte vaatlere maruz bırakabilir.',
    keywords: ['kaynak', 'yaratıcılık', 'fırsat', 'iletişim', 'başlangıç'],
    context:
      'Dış etkiler, potansiyelini açabilir ya da manipülasyon riski taşıyabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ps_pos8',
    card: 'The High Priestess',
    position: 8,
    upright:
      'Başrahibe, dış etkiler gizli bilgiler, sezgisel yönlendirmeler ya da derin bilgelikle hayatına dokunuyor olabilir.',
    reversed:
      'Ters Başrahibe, dış etkiler gizlenmiş gerçekler, sırlar ya da yanlış sezgilerle seni yanıltabilir.',
    keywords: ['sezgi', 'bilgi', 'sır', 'bilgelik', 'rehberlik'],
    context: 'Dış etkiler, sezgi ve gizli bilgiler üzerinden seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ps_pos8',
    card: 'The Empress',
    position: 8,
    upright:
      'İmparatoriçe, dış etkiler sana bolluk, destek ve yaratıcı fırsatlar sunuyor.',
    reversed:
      'Ters İmparatoriçe, dış etkiler bağımlılık, aşırı korumacılık ya da üretkenlikte tıkanıklık yaratabilir.',
    keywords: ['bolluk', 'destek', 'üretkenlik', 'şefkat', 'yaratıcılık'],
    context: 'Dış etkiler, üretkenlik ya da bağımlılıkla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ps_pos8',
    card: 'The Emperor',
    position: 8,
    upright:
      'İmparator, dış etkiler düzen, otorite ve güçlü yapılarla seni destekliyor olabilir.',
    reversed:
      'Ters İmparator, dış etkiler baskıcı figürler, katı kurallar ya da otoriteyle çatışmalar getirebilir.',
    keywords: ['otorite', 'düzen', 'güç', 'kontrol', 'koruma'],
    context: 'Dış etkiler, düzen kurabilir ya da baskı yaratabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ps_pos8',
    card: 'The Hierophant',
    position: 8,
    upright:
      'Aziz, dış etkiler gelenek, öğretmenler veya rehber figürler aracılığıyla seni yönlendiriyor olabilir.',
    reversed:
      'Ters Aziz, dış etkiler kurallara karşı çıkmanı, geleneklerden kopmanı ya da yanlış rehberlik almanı tetikleyebilir.',
    keywords: ['gelenek', 'öğreti', 'rehberlik', 'otorite', 'maneviyat'],
    context: 'Dış etkiler, geleneksel ya da asi yollarla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos8',
    card: 'The Lovers',
    position: 8,
    upright:
      'Aşıklar, dış etkiler sana ilişkiler, ortaklıklar ya da önemli seçimler aracılığıyla yön veriyor.',
    reversed:
      'Ters Aşıklar, dış etkiler uyumsuzluk, yanlış seçimler ya da kararsızlık enerjisi getirebilir.',
    keywords: ['ilişki', 'ortaklık', 'seçim', 'uyum', 'karar'],
    context: 'Dış etkiler, seçimler ya da ilişkiler üzerinden seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ps_pos8',
    card: 'The Chariot',
    position: 8,
    upright:
      'Savaş Arabası, dış etkiler seni ilerlemeye, hedefe odaklanmaya ve başarıya yönlendiriyor olabilir.',
    reversed:
      'Ters Savaş Arabası, dış etkiler dağınıklık, yönsüzlük ya da kontrol kaybı enerjisi taşıyabilir.',
    keywords: ['ilerleme', 'hedef', 'irade', 'kontrol', 'başarı'],
    context: 'Dış etkiler, ilerlemeni destekleyebilir ya da yavaşlatabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ps_pos8',
    card: 'Strength',
    position: 8,
    upright:
      'Güç, dış etkiler seni cesarete, sabra ve dayanıklılığa teşvik ediyor olabilir.',
    reversed:
      'Ters Güç, dış etkiler güvensizlik, öfke ya da sabırsızlık enerjisi getirebilir.',
    keywords: ['cesaret', 'sabır', 'dayanıklılık', 'denge', 'güven'],
    context: 'Dış etkiler, cesaret ya da güvensizlik üzerinden seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ps_pos8',
    card: 'The Hermit',
    position: 8,
    upright:
      'Ermiş, dış etkiler içe dönüş, bilgelik ve yalnızlık ihtiyacını tetikliyor olabilir.',
    reversed:
      'Ters Ermiş, dış etkiler aşırı yalnızlaşma, izolasyon ya da yanlış rehberlik getirebilir.',
    keywords: ['bilgelik', 'arayış', 'yalnızlık', 'rehberlik', 'içe dönüş'],
    context: 'Dış etkiler, bilgelik ya da yalnızlık yoluyla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ps_pos8',
    card: 'The Wheel of Fortune',
    position: 8,
    upright:
      'Kader Çarkı, dış etkiler hayatına beklenmedik şanslar, fırsatlar ya da döngüsel değişimler getirebilir.',
    reversed:
      'Ters Kader Çarkı, dış etkiler şanssızlık, yanlış zamanlama ya da tekrarlayan döngülerle seni zorlayabilir.',
    keywords: ['kader', 'şans', 'değişim', 'fırsat', 'döngü'],
    context:
      'Dış etkiler, şanslı fırsatlar ya da olumsuz döngüler yoluyla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ps_pos8',
    card: 'Justice',
    position: 8,
    upright:
      'Adalet, dış etkiler sana adil kararlar, objektif değerlendirmeler ya da dengeleyici enerjiler sunuyor.',
    reversed:
      'Ters Adalet, dış etkiler adaletsizlik, yanlış yargılar ya da dengesizlik getirebilir.',
    keywords: ['adalet', 'denge', 'karar', 'gerçek', 'dürüstlük'],
    context:
      'Dış etkiler, adil değerlendirmeler ya da adaletsizlikle seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ps_pos8',
    card: 'The Hanged Man',
    position: 8,
    upright:
      'Asılan Adam, dış etkiler seni beklemeye, farklı bir bakış açısı kazanmaya ya da fedakarlık yapmaya teşvik ediyor olabilir.',
    reversed:
      'Ters Asılan Adam, dış etkiler seni inatçılık, direnç ya da teslimiyet eksikliğiyle zorlayabilir.',
    keywords: [
      'bakış açısı',
      'bekleme',
      'fedakarlık',
      'teslimiyet',
      'farkındalık',
    ],
    context: 'Dış etkiler, yeni bir bakış açısı ya da dirençle seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ps_pos8',
    card: 'Death',
    position: 8,
    upright:
      'Ölüm, dış etkiler hayatında köklü değişimlere, bitişlere ya da dönüşümlere neden olabilir.',
    reversed:
      'Ters Ölüm, dış etkiler seni değişime direnişe, kapanmayan döngülere ya da eskiyi bırakmamaya sürükleyebilir.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'değişim', 'cesaret'],
    context: 'Dış etkiler, dönüşüm ya da dirençle seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ps_pos8',
    card: 'Temperance',
    position: 8,
    upright:
      'Denge, dış etkiler sana uyum, sabır ve dengeleyici bir enerji sunuyor olabilir.',
    reversed:
      'Ters Denge, dış etkiler aşırılık, uyumsuzluk ya da sabırsızlık yaratabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'dengeleyici'],
    context: 'Dış etkiler, uyum ya da uyumsuzluk yoluyla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ps_pos8',
    card: 'The Devil',
    position: 8,
    upright:
      'Şeytan, dış etkiler seni bağımlılıklara, kısıtlayıcı bağlara ya da korkulara sürükleyebilir.',
    reversed:
      'Ters Şeytan, dış etkiler seni özgürleşmeye, zincirlerini kırmaya ya da kısıtlamalardan kurtulmaya yönlendirebilir.',
    keywords: ['bağımlılık', 'kısıtlama', 'özgürlük', 'korku', 'gölge'],
    context:
      'Dış etkiler, seni bağımlılıkla sınayabilir ya da özgürleştirebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ps_pos8',
    card: 'The Tower',
    position: 8,
    upright:
      'Kule, dış etkiler ani değişimler, krizler ya da sarsıcı olaylarla hayatını etkileyebilir.',
    reversed:
      'Ters Kule, dış etkiler krizleri erteleyebilir ya da değişimden kaçış enerjisi taşıyabilir.',
    keywords: ['kriz', 'değişim', 'yıkım', 'şok', 'dönüşüm'],
    context:
      'Dış etkiler, ani krizler ya da ertelemeler yoluyla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ps_pos8',
    card: 'The Star',
    position: 8,
    upright:
      'Yıldız, dış etkiler sana umut, ilham ve ruhsal yenilenme getiriyor olabilir.',
    reversed:
      'Ters Yıldız, dış etkiler umutsuzluk, güven kaybı ya da ilham eksikliği yaratabilir.',
    keywords: ['umut', 'ilham', 'yenilenme', 'güven', 'ışık'],
    context: 'Dış etkiler, umut ya da umutsuzluk yoluyla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ps_pos8',
    card: 'The Moon',
    position: 8,
    upright:
      'Ay, dış etkiler belirsizlik, yanılsama ya da sezgisel korkularla hayatına dokunuyor olabilir.',
    reversed:
      'Ters Ay, dış etkiler sırların açığa çıkması, netlik kazanma ya da aldatmacaların çözülmesi yoluyla seni etkileyebilir.',
    keywords: ['belirsizlik', 'yanılsama', 'korku', 'sezgi', 'giz'],
    context: 'Dış etkiler, belirsizlik ya da netlik yoluyla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos8',
    card: 'The Sun',
    position: 8,
    upright:
      'Güneş, dış etkiler sana mutluluk, başarı ve aydınlanma enerjisi getiriyor olabilir.',
    reversed:
      'Ters Güneş, dış etkiler özgüven eksikliği, karamsarlık ya da başarıların gecikmesiyle seni zorlayabilir.',
    keywords: ['mutluluk', 'başarı', 'aydınlanma', 'özgüven', 'neşe'],
    context: 'Dış etkiler, mutluluk ya da karamsarlık yoluyla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos8',
    card: 'Judgement',
    position: 8,
    upright:
      'Mahkeme, dış etkiler geçmişten gelen konuları gündeme getirebilir, farkındalık ve hesaplaşma enerjisi taşıyabilir.',
    reversed:
      'Ters Mahkeme, dış etkiler fırsatları kaçırmana, geçmişi reddetmene ya da sorumluluklardan kaçmana sebep olabilir.',
    keywords: ['farkındalık', 'karar', 'geçmiş', 'çağrı', 'yenilenme'],
    context: 'Dış etkiler, farkındalık ya da kaçış yoluyla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos8',
    card: 'The World',
    position: 8,
    upright:
      'Dünya, dış etkiler sana tamamlanma, başarı ya da yeni bir döngünün başlangıcını getiriyor olabilir.',
    reversed:
      'Ters Dünya, dış etkiler yarım kalmış işler, eksik tatmin ya da kapanmayan döngülerle seni etkileyebilir.',
    keywords: ['tamamlanma', 'başarı', 'döngü', 'kapanış', 'bütünlük'],
    context:
      'Dış etkiler, tamamlanma ya da eksik kapanış yoluyla seni etkiliyor.',
    group: 'Majör Arkana',
  },
  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_ps_pos8',
    card: 'Ace of Cups',
    position: 8,
    upright:
      'Kupa Ası, dış etkiler sana yeni duygusal fırsatlar, ilham ve şefkatli ilişkiler getirebilir.',
    reversed:
      'Ters Kupa Ası, dış etkiler duygusal kapanma, hayal kırıklığı ya da sevgide dengesizlik yaratabilir.',
    keywords: ['duygu', 'başlangıç', 'ilham', 'sevgi', 'şefkat'],
    context:
      'Dış etkiler, duygusal açılım ya da kapanış yoluyla seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ps_pos8',
    card: 'Two of Cups',
    position: 8,
    upright:
      'İki Kupa, dış etkiler sana uyumlu ortaklıklar, romantik bağlar veya işbirlikleri getirebilir.',
    reversed:
      'Ters İki Kupa, dış etkiler ilişkilerde uyumsuzluk, anlaşmazlık ya da iletişim sorunları yaratabilir.',
    keywords: ['ortaklık', 'ilişki', 'uyum', 'bağ', 'işbirliği'],
    context:
      'Dış etkiler, uyumlu bağlar ya da anlaşmazlıklarla seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ps_pos8',
    card: 'Three of Cups',
    position: 8,
    upright:
      'Üç Kupa, dış etkiler sana dostluklar, kutlamalar ve sosyal çevrenden destek getirebilir.',
    reversed:
      'Ters Üç Kupa, dış etkiler samimiyetsizlik, yanlış dostluklar ya da sosyal kopukluk yaratabilir.',
    keywords: ['kutlama', 'dostluk', 'topluluk', 'paylaşım', 'mutluluk'],
    context: 'Dış etkiler, dostluklar ya da sosyal sorunlarla seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ps_pos8',
    card: 'Four of Cups',
    position: 8,
    upright:
      'Dört Kupa, dış etkiler seni farkındalığa çağırıyor, çevrenden gelen fırsatlara dikkat etmen gerekebilir.',
    reversed:
      'Ters Dört Kupa, dış etkiler seni yeni ilgi alanlarına yönlendirebilir ya da ilgisizliğini artırabilir.',
    keywords: ['ilgisizlik', 'fırsat', 'uyanış', 'farkındalık', 'boşluk'],
    context:
      'Dış etkiler, farkındalık ya da ilgisizlik yoluyla seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ps_pos8',
    card: 'Five of Cups',
    position: 8,
    upright:
      'Beş Kupa, dış etkiler seni kayıplara, pişmanlıklara ya da duygusal hayal kırıklıklarına yönlendirebilir.',
    reversed:
      'Ters Beş Kupa, dış etkiler seni şifalanmaya, geçmişi geride bırakmaya ve kalan güzelliklere odaklanmaya yöneltebilir.',
    keywords: ['kayıp', 'pişmanlık', 'üzüntü', 'şifa', 'farkındalık'],
    context: 'Dış etkiler, kayıp ya da şifalanma yoluyla seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ps_pos8',
    card: 'Six of Cups',
    position: 8,
    upright:
      'Altı Kupa, dış etkiler geçmişten gelen dostlukları, hatıraları ya da destekleyici bağları gündeme getirebilir.',
    reversed:
      'Ters Altı Kupa, dış etkiler seni geçmişe bağımlı kılabilir ya da ilerleyişini yavaşlatabilir.',
    keywords: ['geçmiş', 'anı', 'nostalji', 'çocukluk', 'bağ'],
    context:
      'Dış etkiler, geçmişten gelen bağlar ya da ileriye ilerleyememek üzerinden seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ps_pos8',
    card: 'Seven of Cups',
    position: 8,
    upright:
      'Yedi Kupa, dış etkiler seni seçeneklerle, hayallerle ya da cazip ama gerçekçi olmayan fırsatlarla karşılaştırabilir.',
    reversed:
      'Ters Yedi Kupa, dış etkiler seni netlik kazanmaya, gerçekçi seçimler yapmaya ve kafa karışıklığını gidermeye yönlendirebilir.',
    keywords: ['seçenek', 'hayal', 'fırsat', 'netlik', 'karar'],
    context: 'Dış etkiler, kafa karışıklığı ya da netlikle seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ps_pos8',
    card: 'Eight of Cups',
    position: 8,
    upright:
      'Sekiz Kupa, dış etkiler seni bırakışa, tatmin etmeyen şeylerden uzaklaşmaya veya yeni yollar aramaya yönlendirebilir.',
    reversed:
      'Ters Sekiz Kupa, dış etkiler seni geçmişe döndürmeye ya da kararsızlık içinde kalmana sebep olabilir.',
    keywords: ['bırakış', 'arayış', 'kaçış', 'tatminsizlik', 'karar'],
    context: 'Dış etkiler, bırakış ya da geri dönüş üzerinden seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ps_pos8',
    card: 'Nine of Cups',
    position: 8,
    upright:
      'Dokuz Kupa, dış etkiler sana tatmin, mutluluk ve dileklerinin gerçekleşmesi yönünde destek verebilir.',
    reversed:
      'Ters Dokuz Kupa, dış etkiler seni yüzeysel tatminlere, doyumsuzluğa ya da boş vaatlere yöneltebilir.',
    keywords: ['tatmin', 'mutluluk', 'dilek', 'beklenti', 'bolluk'],
    context:
      'Dış etkiler, tatmin ya da hayal kırıklığı üzerinden seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ps_pos8',
    card: 'Ten of Cups',
    position: 8,
    upright:
      'On Kupa, dış etkiler sana ailevi mutluluk, huzur ve uyum getirebilir.',
    reversed:
      'Ters On Kupa, dış etkiler ailevi sorunlar, uyumsuzluk ya da duygusal hayal kırıklıkları yaratabilir.',
    keywords: ['aile', 'mutluluk', 'uyum', 'huzur', 'bağ'],
    context: 'Dış etkiler, huzur ya da uyumsuzluk yoluyla seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ps_pos8',
    card: 'Page of Cups',
    position: 8,
    upright:
      'Kupa Prensi, dış etkiler sana romantik bir teklif, yaratıcı ilham veya duygusal bir açılım getirebilir.',
    reversed:
      'Ters Kupa Prensi, dış etkiler seni hayalcilik, yüzeysellik ya da duygusal olgunluk eksikliğiyle etkileyebilir.',
    keywords: ['romantizm', 'ilham', 'yaratıcılık', 'teklif', 'hayal'],
    context: 'Dış etkiler, romantizm ya da yüzeysellik yoluyla seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ps_pos8',
    card: 'Knight of Cups',
    position: 8,
    upright:
      'Kupa Şövalyesi, dış etkiler sana romantik bir teklif, yaratıcı bir yolculuk ya da duygusal destek getirebilir.',
    reversed:
      'Ters Kupa Şövalyesi, dış etkiler boş vaatler, tutarsızlık ya da aşırı hayalcilik yaratabilir.',
    keywords: ['romantizm', 'teklif', 'ilham', 'hayal', 'destek'],
    context: 'Dış etkiler, ilham ya da tutarsızlık yoluyla seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ps_pos8',
    card: 'Queen of Cups',
    position: 8,
    upright:
      'Kupa Kraliçesi, dış etkiler sana şefkat, empati ve duygusal destek sunabilir.',
    reversed:
      'Ters Kupa Kraliçesi, dış etkiler seni aşırı hassasiyet, duygusal bağımlılık ya da dengesizlikle etkileyebilir.',
    keywords: ['şefkat', 'empati', 'destek', 'hassasiyet', 'denge'],
    context:
      'Dış etkiler, şefkat ya da duygusal hassasiyet yoluyla seni etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ps_pos8',
    card: 'King of Cups',
    position: 8,
    upright:
      'Kupa Kralı, dış etkiler sana bilgece rehberlik, duygusal olgunluk ve destek sağlayabilir.',
    reversed:
      'Ters Kupa Kralı, dış etkiler seni duygusal manipülasyon, kontrol kaybı ya da dengesizlikle etkileyebilir.',
    keywords: ['bilgelik', 'olgunluk', 'denge', 'destek', 'rehberlik'],
    context: 'Dış etkiler, bilgelik ya da manipülasyon yoluyla seni etkiliyor.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_ps_pos8',
    card: 'Ace of Swords',
    position: 8,
    upright:
      'Kılıç Ası, dış etkiler sana netlik, yeni fikirler ve güçlü bir iletişim desteği getirebilir.',
    reversed:
      'Ters Kılıç Ası, dış etkiler kafa karışıklığı, iletişim sorunları veya yanlış bilgiyle seni yanıltabilir.',
    keywords: ['netlik', 'fikir', 'karar', 'iletişim', 'başlangıç'],
    context:
      'Dış etkiler, netlik ya da yanlış bilgiler yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ps_pos8',
    card: 'Two of Swords',
    position: 8,
    upright:
      'İki Kılıç, dış etkiler seni karar vermeye zorlayabilir, çevrenden gelen baskılar seçim yapmanı gerektirebilir.',
    reversed:
      'Ters İki Kılıç, dış etkiler seni kararsızlığa, yanlış yönlendirmelere ya da erteleme eğilimine itebilir.',
    keywords: ['karar', 'ikilem', 'denge', 'kararsızlık', 'seçim'],
    context:
      'Dış etkiler, seçim yapmanı kolaylaştırabilir ya da zorlaştırabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ps_pos8',
    card: 'Three of Swords',
    position: 8,
    upright:
      'Üç Kılıç, dış etkiler seni kalp kırıklığı, anlaşmazlık veya ayrılık gibi duygusal yaralarla sınayabilir.',
    reversed:
      'Ters Üç Kılıç, dış etkiler şifalanma, barışma ya da acının azalmasına yardım edebilir.',
    keywords: ['kalp kırıklığı', 'acı', 'ayrılık', 'şifa', 'anlaşmazlık'],
    context: 'Dış etkiler, acı ya da şifa yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ps_pos8',
    card: 'Four of Swords',
    position: 8,
    upright:
      'Dört Kılıç, dış etkiler sana dinlenme, yenilenme ya da toparlanma fırsatı sunabilir.',
    reversed:
      'Ters Dört Kılıç, dış etkiler seni tükenmişlik, dinlenememe ya da stres altında kalmaya itebilir.',
    keywords: ['dinlenme', 'yenilenme', 'huzur', 'toparlanma', 'rahatlama'],
    context: 'Dış etkiler, huzur ya da tükenmişlik yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ps_pos8',
    card: 'Five of Swords',
    position: 8,
    upright:
      'Beş Kılıç, dış etkiler seni çatışmalara, fikir ayrılıklarına ya da gurur mücadelelerine sürükleyebilir.',
    reversed:
      'Ters Beş Kılıç, dış etkiler seni barışa, anlaşmazlıkların çözümüne ve uzlaşmaya yönlendirebilir.',
    keywords: ['çatışma', 'tartışma', 'uzlaşma', 'gurur', 'fikir ayrılığı'],
    context: 'Dış etkiler, çatışma ya da uzlaşma yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ps_pos8',
    card: 'Six of Swords',
    position: 8,
    upright:
      'Altı Kılıç, dış etkiler sana geçiş dönemi, ilerleme veya sorunlardan uzaklaşma fırsatı getirebilir.',
    reversed:
      'Ters Altı Kılıç, dış etkiler seni geçmişe bağlayabilir, ilerleyişini zorlaştırabilir ya da yolculuklarda aksaklık yaratabilir.',
    keywords: ['geçiş', 'ilerleme', 'kaçış', 'geçmiş', 'yolculuk'],
    context:
      'Dış etkiler, ilerleme ya da geriye takılma yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ps_pos8',
    card: 'Seven of Swords',
    position: 8,
    upright:
      'Yedi Kılıç, dış etkiler seni strateji geliştirmeye, sırları açığa çıkarmaya ya da dikkatli olmaya yönlendirebilir.',
    reversed:
      'Ters Yedi Kılıç, dış etkiler seni dürüstlükle yüzleştirebilir ya da saklı planların açığa çıkmasına sebep olabilir.',
    keywords: ['strateji', 'hile', 'gizlilik', 'plan', 'sırlar'],
    context: 'Dış etkiler, gizlilik ya da dürüstlük yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ps_pos8',
    card: 'Eight of Swords',
    position: 8,
    upright:
      'Sekiz Kılıç, dış etkiler seni sınırlı hissettirebilir, çevrenden gelen baskılar seni kısıtlayabilir.',
    reversed:
      'Ters Sekiz Kılıç, dış etkiler seni özgürleştirebilir, engellerin kalkmasına yardım edebilir.',
    keywords: ['sınırlama', 'özgürlük', 'baskı', 'engeller', 'zihin'],
    context: 'Dış etkiler, seni kısıtlayabilir ya da özgürleştirebilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ps_pos8',
    card: 'Nine of Swords',
    position: 8,
    upright:
      'Dokuz Kılıç, dış etkiler seni stres, kaygı ve uykusuzluk gibi yoğun endişelere sürükleyebilir.',
    reversed:
      'Ters Dokuz Kılıç, dış etkiler seni bu kaygılardan arındırabilir, destek ve rahatlama getirebilir.',
    keywords: ['kaygı', 'stres', 'endişe', 'rahatlama', 'kabus'],
    context: 'Dış etkiler, kaygı ya da şifa yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ps_pos8',
    card: 'Ten of Swords',
    position: 8,
    upright:
      'On Kılıç, dış etkiler seni zorlayıcı bitişlere, ihanetlere ya da acı dolu bir kapanışa itebilir.',
    reversed:
      'Ters On Kılıç, dış etkiler seni toparlanmaya, yeniden doğuşa ve zor dönemleri geride bırakmaya yönlendirebilir.',
    keywords: ['bitiş', 'ihanet', 'yeniden doğuş', 'acı', 'travma'],
    context: 'Dış etkiler, bitiş ya da yeniden doğuş yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ps_pos8',
    card: 'Page of Swords',
    position: 8,
    upright:
      'Kılıç Prensi, dış etkiler sana yeni bilgiler, merak uyandırıcı fırsatlar ve öğrenme alanları sunabilir.',
    reversed:
      'Ters Kılıç Prensi, dış etkiler seni dedikodular, yanlış bilgiler ya da dikkatsizlikle zorlayabilir.',
    keywords: ['öğrenme', 'merak', 'iletişim', 'bilgi', 'zeka'],
    context:
      'Dış etkiler, bilgi ya da yanlış yönlendirme yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ps_pos8',
    card: 'Knight of Swords',
    position: 8,
    upright:
      'Kılıç Şövalyesi, dış etkiler seni hızlı hareket etmeye, cesurca ilerlemeye teşvik edebilir.',
    reversed:
      'Ters Kılıç Şövalyesi, dış etkiler seni aceleci, dikkatsiz ya da yönsüz davranışlara itebilir.',
    keywords: ['hız', 'cesaret', 'karar', 'acele', 'odak'],
    context:
      'Dış etkiler, hız ve cesaret ya da acelecilik yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ps_pos8',
    card: 'Queen of Swords',
    position: 8,
    upright:
      'Kılıç Kraliçesi, dış etkiler sana mantıklı, objektif ve bilgece rehberlik sağlayabilir.',
    reversed:
      'Ters Kılıç Kraliçesi, dış etkiler seni soğukluk, aşırı eleştiri ya da anlayışsızlıkla zorlayabilir.',
    keywords: ['mantık', 'bilgelik', 'bağımsızlık', 'soğukluk', 'karar'],
    context: 'Dış etkiler, bilgelik ya da soğukluk yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ps_pos8',
    card: 'King of Swords',
    position: 8,
    upright:
      'Kılıç Kralı, dış etkiler sana adil kararlar, mantıklı rehberlik ve otorite desteği getirebilir.',
    reversed:
      'Ters Kılıç Kralı, dış etkiler baskı, adaletsizlik ya da soğuk bir otorite figürü yoluyla seni zorlayabilir.',
    keywords: ['adalet', 'otorite', 'bilgelik', 'mantık', 'karar'],
    context: 'Dış etkiler, adalet ya da baskı yoluyla seni etkiliyor.',
    group: 'Kılıçlar',
  },
  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_ps_pos8',
    card: 'Ace of Pentacles',
    position: 8,
    upright:
      'Tılsım Ası, dış etkiler sana yeni bir maddi fırsat, sağlam bir başlangıç veya istikrar sağlayacak bir teklif getirebilir.',
    reversed:
      'Ters Tılsım Ası, dış etkiler seni kaçırılan fırsatlar, yanlış yatırımlar ya da güvensizlik ortamına sürükleyebilir.',
    keywords: ['fırsat', 'başlangıç', 'bolluk', 'yatırım', 'temel'],
    context:
      'Dış etkiler, fırsatlar sunabilir ya da istikrarsızlık yaratabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ps_pos8',
    card: 'Two of Pentacles',
    position: 8,
    upright:
      'İki Tılsım, dış etkiler sana dengelemen gereken çoklu sorumluluklar veya uyum sağlamanı gerektiren koşullar getirebilir.',
    reversed:
      'Ters İki Tılsım, dış etkiler dengeyi bozabilir, aşırı yüklenme veya kararsızlık yaratabilir.',
    keywords: ['denge', 'sorumluluk', 'esneklik', 'karar', 'öncelik'],
    context: 'Dış etkiler, dengeyi kurmanı kolaylaştırabilir ya da bozabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ps_pos8',
    card: 'Three of Pentacles',
    position: 8,
    upright:
      'Üç Tılsım, dış etkiler işbirliği, ekip desteği veya becerilerini geliştirecek projeler getirebilir.',
    reversed:
      'Ters Üç Tılsım, dış etkiler uyumsuzluk, destek eksikliği veya iletişim sorunları yaratabilir.',
    keywords: ['işbirliği', 'ekip', 'başarı', 'paylaşım', 'uyum'],
    context: 'Dış etkiler, işbirliği ya da uyumsuzluk yoluyla seni etkiliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ps_pos8',
    card: 'Four of Pentacles',
    position: 8,
    upright:
      'Dört Tılsım, dış etkiler sana güvenlik, istikrar veya sahip olduklarını koruma yönünde baskı yapabilir.',
    reversed:
      'Ters Dört Tılsım, dış etkiler aşırı kontrol, cimrilik ya da kaybetme korkusunu tetikleyebilir.',
    keywords: ['güvenlik', 'istikrar', 'koruma', 'kontrol', 'korku'],
    context: 'Dış etkiler, güven hissi ya da kaygı yoluyla seni etkiliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ps_pos8',
    card: 'Five of Pentacles',
    position: 8,
    upright:
      'Beş Tılsım, dış etkiler yalnızlık, maddi sıkıntılar veya destek eksikliği olarak kendini gösterebilir.',
    reversed:
      'Ters Beş Tılsım, dış etkiler yardım, destek veya toparlanma fırsatları getirebilir.',
    keywords: ['zorluk', 'yalnızlık', 'destek', 'kaynak', 'kayıp'],
    context:
      'Dış etkiler, seni zorluklarla sınayabilir ya da destek getirebilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ps_pos8',
    card: 'Six of Pentacles',
    position: 8,
    upright:
      'Altı Tılsım, dış etkiler alma-verme dengesini kurmana yardım eden destekler, yardımlar veya adil fırsatlar sunabilir.',
    reversed:
      'Ters Altı Tılsım, dış etkiler eşitsizlik, tek taraflı ilişkiler veya dengesizlik yaratabilir.',
    keywords: ['yardım', 'paylaşım', 'denge', 'adalet', 'destek'],
    context: 'Dış etkiler, dengeyi kurabilir ya da bozabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ps_pos8',
    card: 'Seven of Pentacles',
    position: 8,
    upright:
      'Yedi Tılsım, dış etkiler sabırla beklemeni, yatırımlarının karşılığını zamanla almanı teşvik edebilir.',
    reversed:
      'Ters Yedi Tılsım, dış etkiler sabırsızlık, hayal kırıklığı veya emeklerin boşa gittiği duygusunu yaratabilir.',
    keywords: ['sabır', 'emek', 'bekleyiş', 'yatırım', 'kazanç'],
    context:
      'Dış etkiler, sabrı teşvik edebilir ya da tatminsizlik yaratabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ps_pos8',
    card: 'Eight of Pentacles',
    position: 8,
    upright:
      'Sekiz Tılsım, dış etkiler öğrenme fırsatları, iş disiplini veya becerilerini geliştirme yolları sunabilir.',
    reversed:
      'Ters Sekiz Tılsım, dış etkiler özensizlik, motivasyon kaybı veya tekrar eden hatalar yaratabilir.',
    keywords: ['çalışma', 'öğrenme', 'ustalık', 'emek', 'disiplin'],
    context: 'Dış etkiler, çalışmaya teşvik edebilir ya da gevşetebilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ps_pos8',
    card: 'Nine of Pentacles',
    position: 8,
    upright:
      'Dokuz Tılsım, dış etkiler bağımsızlığını güçlendirebilir, sana güven ve maddi tatmin sağlayabilir.',
    reversed:
      'Ters Dokuz Tılsım, dış etkiler yalnızlık, bağımlılıklar veya aşırı harcama eğilimi getirebilir.',
    keywords: ['özgüven', 'bağımsızlık', 'bolluk', 'tatmin', 'güven'],
    context:
      'Dış etkiler, bağımsızlığını güçlendirebilir ya da zayıflatabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ps_pos8',
    card: 'Ten of Pentacles',
    position: 8,
    upright:
      'On Tılsım, dış etkiler sana ailevi destek, miras veya kalıcı istikrar sağlayabilir.',
    reversed:
      'Ters On Tılsım, dış etkiler ailevi huzursuzluk, miras anlaşmazlıkları veya istikrarsızlık yaratabilir.',
    keywords: ['aile', 'istikrar', 'miras', 'gelenek', 'bolluk'],
    context: 'Dış etkiler, istikrar sağlayabilir ya da bozabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ps_pos8',
    card: 'Page of Pentacles',
    position: 8,
    upright:
      'Tılsım Prensi, dış etkiler sana yeni öğrenme fırsatları, projeler veya maddi başlangıçlar sunabilir.',
    reversed:
      'Ters Tılsım Prensi, dış etkiler dikkatsizlik, motivasyon kaybı veya erteleme eğilimi yaratabilir.',
    keywords: ['öğrenme', 'başlangıç', 'fırsat', 'plan', 'keşif'],
    context:
      'Dış etkiler, öğrenme fırsatları getirebilir ya da dikkat dağıtabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ps_pos8',
    card: 'Knight of Pentacles',
    position: 8,
    upright:
      'Tılsım Şövalyesi, dış etkiler seni disipline, sabırlı olmaya ve istikrarla ilerlemeye teşvik edebilir.',
    reversed:
      'Ters Tılsım Şövalyesi, dış etkiler durağanlık, tembellik veya yavaş ilerleme yaratabilir.',
    keywords: ['sabır', 'istikrar', 'çalışma', 'disiplin', 'azim'],
    context: 'Dış etkiler, istikrar sağlayabilir ya da tembelliğe itebilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ps_pos8',
    card: 'Queen of Pentacles',
    position: 8,
    upright:
      'Tılsım Kraliçesi, dış etkiler sana şefkat, bolluk ve pratik destek sağlayabilir.',
    reversed:
      'Ters Tılsım Kraliçesi, dış etkiler öz bakım eksikliği, savurganlık veya aşırı bağımlılık yaratabilir.',
    keywords: ['şefkat', 'bolluk', 'pratik destek', 'denge', 'kaynak'],
    context: 'Dış etkiler, bolluk getirebilir ya da dengesizlik yaratabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ps_pos8',
    card: 'King of Pentacles',
    position: 8,
    upright:
      'Tılsım Kralı, dış etkiler sana güçlü bir destek, liderlik ve maddi güvence sağlayabilir.',
    reversed:
      'Ters Tılsım Kralı, dış etkiler baskıcı figürler, hırs veya aşırı kontrol eğilimi getirebilir.',
    keywords: ['liderlik', 'başarı', 'istikrar', 'bolluk', 'güven'],
    context: 'Dış etkiler, güven verebilir ya da baskı yaratabilir.',
    group: 'Tılsımlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_ps_pos8',
    card: 'Ace of Wands',
    position: 8,
    upright:
      'Değnek Ası, dış etkiler sana ilham veren başlangıçlar, yaratıcı teşvikler ve harekete geçirici fırsatlar sunuyor olabilir.',
    reversed:
      'Ters Değnek Ası, dış etkiler ilham tıkanıklığı, ertelenen projeler ya da motivasyonu düşüren koşullar yaratabilir.',
    keywords: ['ilham', 'başlangıç', 'hareket', 'yaratıcılık', 'fırsat'],
    context: 'Dış etkiler, kıvılcım yakabilir ya da alevi kısabilir.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ps_pos8',
    card: 'Two of Wands',
    position: 8,
    upright:
      'İki Değnek, dış çevre vizyonunu genişletmen, plan yapman ve ufuk açıcı seçenekleri değerlendirmen için seni destekliyor.',
    reversed:
      'Ters İki Değnek, dış etkiler risk almaktan caydırabilir, dar bakış açısı ya da belirsizlik yaratabilir.',
    keywords: ['vizyon', 'plan', 'seçenek', 'ufuk', 'cesaret'],
    context: 'Dış etkiler, plan yapmayı teşvik edebilir ya da erteletebilir.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ps_pos8',
    card: 'Three of Wands',
    position: 8,
    upright:
      'Üç Değnek, dış etkiler işbirliği, uzak fırsatlar ve genişleme rüzgârlarını arkanıza alabileceğin bir dönem getiriyor.',
    reversed:
      'Ters Üç Değnek, dış etkiler gecikmeler, tedarik/iletişim aksaklıkları ve vizyon daralması yaratabilir.',
    keywords: ['genişleme', 'fırsat', 'ilerleme', 'bekleyiş', 'işbirliği'],
    context: 'Dış etmenler, ufuk açabilir ya da yolunu daraltabilir.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ps_pos8',
    card: 'Four of Wands',
    position: 8,
    upright:
      'Dört Değnek, dış çevre kutlama, destek ve istikrar sunarak güvenli bir temel hissettirebilir.',
    reversed:
      'Ters Dört Değnek, dış etkiler uyumsuzluk, taşınma/yerleşim sorunları veya aidiyet duygusunu zedeleyen durumlar yaratabilir.',
    keywords: ['kutlama', 'temel', 'uyum', 'destek', 'aidiyet'],
    context: 'Dış etkiler, yuvayı kurabilir ya da sallayabilir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ps_pos8',
    card: 'Five of Wands',
    position: 8,
    upright:
      'Beş Değnek, dış etkiler rekabet, fikir çatışmaları ve sağlıklı mücadele ortamı doğurabilir.',
    reversed:
      'Ters Beş Değnek, dış etmenler gereksiz sürtüşme, kaos ya da pasif-agresif çekişmeler yaratabilir.',
    keywords: ['rekabet', 'çatışma', 'mücadele', 'enerji', 'gelişim'],
    context: 'Dış etkiler, seni bileyleyebilir ya da yıpratabilir.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ps_pos8',
    card: 'Six of Wands',
    position: 8,
    upright:
      'Altı Değnek, dış çevre takdir, görünürlük ve başarıyı destekleyen fırsatlar sunuyor olabilir.',
    reversed:
      'Ters Altı Değnek, dış etkiler kıskançlık, alkışın gecikmesi ya da emeğinin küçümsenmesi şeklinde görünebilir.',
    keywords: ['takdir', 'başarı', 'zafer', 'görünürlük', 'itibar'],
    context: 'Dış etkiler, seni yüceltebilir ya da gölgeleyebilir.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ps_pos8',
    card: 'Seven of Wands',
    position: 8,
    upright:
      'Yedi Değnek, dış etkiler duruşunu savunmanı gerektiren baskılar ve sınamalar getirebilir.',
    reversed:
      'Ters Yedi Değnek, dış etmenler yıldırma, geri çekilmeye zorlama ya da savunma hattını zayıflatma eğiliminde olabilir.',
    keywords: ['savunma', 'baskı', 'kararlılık', 'sınır', 'direniş'],
    context: 'Dış etkiler, seni sıkıştırabilir ya da güçlendirebilir.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ps_pos8',
    card: 'Eight of Wands',
    position: 8,
    upright:
      'Sekiz Değnek, dış etkiler hızlı haberleşme, ivme ve ani fırsatlarla süreci hızlandırabilir.',
    reversed:
      'Ters Sekiz Değnek, dış etmenler gecikme, yanlış iletişim ya da yönsüz koşturmaca yaratabilir.',
    keywords: ['hız', 'haber', 'ivme', 'akış', 'ilerleme'],
    context: 'Dış etkiler, hız kazandırabilir ya da frenleyebilir.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ps_pos8',
    card: 'Nine of Wands',
    position: 8,
    upright:
      'Dokuz Değnek, dış etkiler tekrar eden sınavlar ve dayanıklılık gerektiren koşullar yaratabilir; gardını koruman faydalı.',
    reversed:
      'Ters Dokuz Değnek, dış etmenler yorgunluğu artırabilir, şüphe ve geri çekilme eğilimini tetikleyebilir.',
    keywords: ['dayanıklılık', 'tekrar sınav', 'korunma', 'sabır', 'temkin'],
    context: 'Dış etkiler, seni sınayabilir ya da yıldırabilir.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ps_pos8',
    card: 'Ten of Wands',
    position: 8,
    upright:
      'On Değnek, dış etkiler üzerindeki sorumlulukları artırabilir; yük paylaşımı talep etmek gerekebilir.',
    reversed:
      'Ters On Değnek, dış etmenler yetki devrini zorlaştırabilir ya da gereksiz yükleri üstüne yıkabilir.',
    keywords: ['yük', 'sorumluluk', 'yoğunluk', 'bitirme', 'delege'],
    context: 'Dış etkiler, yükünü artırabilir ya da hafifletebilir.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ps_pos8',
    card: 'Page of Wands',
    position: 8,
    upright:
      'Değnek Prensi, dış etkiler keşfe çağıran haberler, denemeye teşvik eden küçük fırsatlar ve merak uyandıran sinyaller getiriyor.',
    reversed:
      'Ters Değnek Prensi, dış etmenler dağınık mesajlar, boş hevesler ya da dikkati dağıtan öneriler sunabilir.',
    keywords: ['keşif', 'haber', 'deneme', 'merak', 'kıvılcım'],
    context: 'Dış etkiler, denemeye cesaretlendirebilir ya da oyalayabilir.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ps_pos8',
    card: 'Knight of Wands',
    position: 8,
    upright:
      'Değnek Şövalyesi, dış etkiler cesur atılımlar, hareket ve macera çağrısı taşıyabilir.',
    reversed:
      'Ters Değnek Şövalyesi, dış etmenler acelecilik, savrukluk ya da yönsüz bir koşturma yaratabilir.',
    keywords: ['cesaret', 'hareket', 'atılım', 'macera', 'enerji'],
    context: 'Dış etkiler, hızla ilerletebilir ya da savurabilir.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ps_pos8',
    card: 'Queen of Wands',
    position: 8,
    upright:
      'Değnek Kraliçesi, dış çevre ilham verici figürler, destekleyici ağlar ve özgüveni besleyen ortamlar sunabilir.',
    reversed:
      'Ters Değnek Kraliçesi, dış etkiler kıskançlık, pasif saldırgan tavırlar ya da güveni sarsan durumlar doğurabilir.',
    keywords: ['özgüven', 'karizma', 'destek', 'ilham', 'çekim'],
    context: 'Dış etkiler, ışığını parlatabilir ya da gölge düşürebilir.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ps_pos8',
    card: 'King of Wands',
    position: 8,
    upright:
      'Değnek Kralı, dış etkiler vizyoner liderlik, mentorluk ve büyük resme odaklanmayı destekleyebilir.',
    reversed:
      'Ters Değnek Kralı, dış etmenler otoriter baskı, kontrol arzusu ya da vizyonsuz yönlendirmeler getirebilir.',
    keywords: ['liderlik', 'vizyon', 'etki', 'strateji', 'inşa'],
    context: 'Dış etkiler, vizyonu büyütebilir ya da baskıyla daraltabilir.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition8Meaning(
  card: TarotCard
): ProblemSolvingPosition8Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position8Meanings.find(
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
  meaning = position8Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition8MeaningByCardName(
  cardName: string
): ProblemSolvingPosition8Meaning | null {
  return position8Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllProblemSolvingPosition8Meanings(): ProblemSolvingPosition8Meaning[] {
  return position8Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getProblemSolvingPosition8MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): ProblemSolvingPosition8Meaning[] {
  return position8Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition8Meanings = (): I18nProblemSolvingPosition8Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position8Meanings.map(meaning => {
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
export const getI18nPosition8Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nProblemSolvingPosition8Meaning | null => {
  const originalMeaning = position8Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `problem-solving.meanings.${cardKey}.position8.upright`
  );
  const i18nReversed = t(
    `problem-solving.meanings.${cardKey}.position8.reversed`
  );
  const i18nKeywords = t(
    `problem-solving.meanings.${cardKey}.position8.keywords`
  );
  const i18nContext = t(
    `problem-solving.meanings.${cardKey}.position8.context`
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
const problemSolvingPosition8Exports = {
  position8Meanings,
  getProblemSolvingPosition8Meaning,
  getProblemSolvingPosition8MeaningByCardName,
  getAllProblemSolvingPosition8Meanings,
  getProblemSolvingPosition8MeaningsByGroup,
  getI18nPosition8Meaning,
};

export default problemSolvingPosition8Exports;
