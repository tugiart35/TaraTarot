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

export interface NewLoverposition2Meaning {
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
export interface I18nNewLoverposition2Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position2Meanings: NewLoverposition2Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_na_pos2',
    card: 'The Fool',
    position: 2,
    upright:
      'Deli, bu kişinin burcunun sabit değil, değişken enerjiler taşıyabileceğini gösterir. İkizler, Yay veya Kova gibi özgür ruhlu, keşfe açık burçlardan biri olabilir.',
    reversed:
      'Ters Deli, bu kişinin özgürlük arayışı yüzünden dengesiz bir görünüme kayabileceğini anlatır. Kova veya İkizler gölgede bağ kurmada zorluk gösterebilir.',
    keywords: ['özgürlük', 'değişken', 'yenilik', 'bağımsızlık'],
    context: 'Burcu değişken elementlerden olabilir. Özgür ruhuyla öne çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_na_pos2',
    card: 'The Magician',
    position: 2,
    upright:
      'Büyücü, bu kişinin Merkür yönetimli bir burca ait olabileceğini söyler. İkizler ya da Başak enerjisi baskındır, iletişimi güçlüdür.',
    reversed:
      'Ters Büyücü, İkizler–Başak gölgesinde manipülatif ya da fazla hesapçı tavırlar ortaya çıkabilir. Sözü bol ama özü zayıf olabilir.',
    keywords: ['iletişim', 'zeka', 'yaratım', 'ifade'],
    context: 'Merkür etkili bir burç: İkizler veya Başak vurgusu güçlüdür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_na_pos2',
    card: 'The High Priestess',
    position: 2,
    upright:
      'Başrahibe, bu kişinin su grubu burçlarından olabileceğini gösterir. Yengeç, Akrep ya da Balık sezgisi yüksektir.',
    reversed:
      'Ters Başrahibe, su burçlarının gölge tarafını anlatır: fazla gizemli, içe kapanık veya duygusal karmaşa içinde olabilir.',
    keywords: ['sezgi', 'su burcu', 'derinlik', 'gizem'],
    context: 'Su grubu enerjisi: Yengeç, Akrep, Balık.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_na_pos2',
    card: 'The Empress',
    position: 2,
    upright:
      'İmparatoriçe, Venüs’ün yönettiği Boğa ya da Terazi burcunu işaret eder. Bu kişi zarif, uyumlu ve estetiğe düşkündür.',
    reversed:
      'Ters İmparatoriçe, Boğa–Terazi gölgesinde fazla sahiplenici ya da yüzeysel davranışlar gösterebilir.',
    keywords: ['Venüs', 'güzellik', 'uyum', 'dişil enerji'],
    context: 'Boğa veya Terazi enerjisi baskındır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_na_pos2',
    card: 'The Emperor',
    position: 2,
    upright:
      'İmparator, Koç burcunun enerjisini taşır. Bu kişi girişken, lider ve güçlü bir karakterdir.',
    reversed:
      'Ters İmparator, Koç’un gölgesinde inatçı, kontrolcü ve sert bir tavır ortaya çıkarabilir.',
    keywords: ['Koç', 'liderlik', 'güç', 'disiplin'],
    context: 'Koç enerjisi baskın bir burçtur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_na_pos2',
    card: 'The Hierophant',
    position: 2,
    upright:
      'Aziz, Boğa burcunu temsil eder. Bu kişi güven arayan, sadık ve değerlerine bağlı biridir.',
    reversed:
      'Ters Aziz, Boğa gölgesinde katı kurallara sıkışabilir veya fazla inatçı olabilir.',
    keywords: ['Boğa', 'değer', 'gelenek', 'istikrar'],
    context: 'Boğa burcu vurgusu güçlüdür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_na_pos2',
    card: 'The Lovers',
    position: 2,
    upright:
      'Aşıklar, İkizler burcunu temsil eder. Bu kişi uyumlu, meraklı ve iletişimde güçlüdür.',
    reversed:
      'Ters Aşıklar, İkizler gölgesinde kararsız, tutarsız ve dağınık olabilir.',
    keywords: ['İkizler', 'uyum', 'iletişim', 'seçim'],
    context: 'İkizler enerjisi baskındır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_na_pos2',
    card: 'The Chariot',
    position: 2,
    upright:
      'Savaş Arabası, Yengeç burcunu temsil eder. Bu kişi duyarlı ama aynı zamanda güçlü bir iradeye sahiptir.',
    reversed:
      'Ters Savaş Arabası, Yengeç gölgesinde kararsızlık, duygusal dalgalanmalar ve yönsüzlük getirebilir.',
    keywords: ['Yengeç', 'duygu', 'irade', 'koruma'],
    context: 'Yengeç burcu enerjisi öne çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_na_pos2',
    card: 'Strength',
    position: 2,
    upright:
      'Güç, Aslan burcunu temsil eder. Bu kişi karizmatik, gururlu ve cesurdur.',
    reversed:
      'Ters Güç, Aslan gölgesinde kibir, inat ve sabırsızlık gösterebilir.',
    keywords: ['Aslan', 'cesaret', 'gurur', 'liderlik'],
    context: 'Aslan enerjisi güçlüdür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_na_pos2',
    card: 'The Hermit',
    position: 2,
    upright:
      'Ermiş, Başak burcunu temsil eder. Bu kişi analitik, içe dönük ve bilge bir karakterdir.',
    reversed:
      'Ters Ermiş, Başak gölgesinde aşırı eleştirel veya yalnızlığa kapanmış olabilir.',
    keywords: ['Başak', 'bilgelik', 'analiz', 'içe dönüş'],
    context: 'Başak burcu etkisi güçlüdür.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_na_pos2',
    card: 'The Wheel of Fortune',
    position: 2,
    upright:
      'Kader Çarkı, değişken burçların (İkizler, Başak, Yay, Balık) enerjisini taşır. Bu kişi hayatında dönüşümlere açıktır.',
    reversed:
      'Ters Kader Çarkı, değişken burçların gölgesinde kararsızlık ve istikrarsızlık getirebilir.',
    keywords: ['değişim', 'kader', 'değişken', 'döngü'],
    context: 'Değişken burçlardan biri olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_na_pos2',
    card: 'Justice',
    position: 2,
    upright:
      'Adalet, Terazi burcunu temsil eder. Bu kişi adil, dengeli ve ilişkilere değer veren biridir.',
    reversed:
      'Ters Adalet, Terazi gölgesinde kararsız, yüzeysel veya ilişki bağımlısı olabilir.',
    keywords: ['Terazi', 'denge', 'adalet', 'ilişki'],
    context: 'Terazi enerjisi öne çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_na_pos2',
    card: 'The Hanged Man',
    position: 2,
    upright:
      'Asılan Adam, Balık burcunu temsil eder. Bu kişi fedakâr, duyarlı ve sezgiseldir.',
    reversed:
      'Ters Asılan Adam, Balık gölgesinde kararsızlık, kurban rolü ve dağınıklık gösterebilir.',
    keywords: ['Balık', 'fedakarlık', 'sezgi', 'empati'],
    context: 'Balık burcu etkisi güçlüdür.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_na_pos2',
    card: 'Death',
    position: 2,
    upright:
      'Ölüm, Akrep burcunu temsil eder. Bu kişi tutkulu, derinlikli ve dönüşümcü bir karakterdir.',
    reversed:
      'Ters Ölüm, Akrep gölgesinde takıntılı, kıskanç veya kin tutmaya meyilli olabilir.',
    keywords: ['Akrep', 'dönüşüm', 'tutku', 'derinlik'],
    context: 'Akrep burcu enerjisi baskındır.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_na_pos2',
    card: 'Temperance',
    position: 2,
    upright:
      'Denge, Yay burcunu temsil eder. Bu kişi iyimser, özgürlükçü ve maceraperesttir.',
    reversed:
      'Ters Denge, Yay gölgesinde savruk, aşırı risk alan veya sabırsız olabilir.',
    keywords: ['Yay', 'denge', 'özgürlük', 'iyimserlik'],
    context: 'Yay enerjisi öne çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_na_pos2',
    card: 'The Devil',
    position: 2,
    upright:
      'Şeytan, Oğlak burcunu temsil eder. Bu kişi çalışkan, hırslı ve güçlü iradelidir.',
    reversed:
      'Ters Şeytan, Oğlak gölgesinde aşırı kontrolcü, soğuk veya bağımlı tavırlar gösterebilir.',
    keywords: ['Oğlak', 'hırs', 'kontrol', 'dayanıklılık'],
    context: 'Oğlak enerjisi güçlüdür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_na_pos2',
    card: 'The Tower',
    position: 2,
    upright:
      'Kule, ani ve beklenmedik Uranüs etkisi taşır. Bu kişi Kova burcuyla bağlantılıdır: özgürlükçü, sıra dışı ve devrimci.',
    reversed:
      'Ters Kule, Kova gölgesinde asi, kopuk ya da istikrarsız olabilir.',
    keywords: ['Kova', 'özgürlük', 'yenilik', 'sürpriz'],
    context: 'Kova burcu enerjisi baskındır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_na_pos2',
    card: 'The Star',
    position: 2,
    upright:
      'Yıldız, Kova burcunu temsil eder. Bu kişi vizyoner, insancıl ve yenilikçidir.',
    reversed:
      'Ters Yıldız, Kova gölgesinde umutsuz, kopuk veya fazla idealist olabilir.',
    keywords: ['Kova', 'vizyon', 'özgürlük', 'insancıllık'],
    context: 'Kova enerjisi öne çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_na_pos2',
    card: 'The Moon',
    position: 2,
    upright:
      'Ay, Balık burcunu temsil eder. Bu kişi sezgisel, duygusal ve yaratıcıdır.',
    reversed:
      'Ters Ay, Balık gölgesinde yanılsamalar, kafa karışıklığı ve duygusal dalgalanmalar gösterebilir.',
    keywords: ['Balık', 'sezgi', 'duygu', 'yaratıcılık'],
    context: 'Balık burcu etkisi güçlüdür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_na_pos2',
    card: 'The Sun',
    position: 2,
    upright:
      'Güneş, Aslan burcunu temsil eder. Bu kişi neşeli, karizmatik ve hayat doludur.',
    reversed:
      'Ters Güneş, Aslan gölgesinde bencillik, kibir veya sahte neşe gösterebilir.',
    keywords: ['Aslan', 'neşe', 'karizma', 'yaratıcılık'],
    context: 'Aslan enerjisi güçlüdür.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_na_pos2',
    card: 'Judgement',
    position: 2,
    upright:
      'Mahkeme, Plüton etkisini taşır. Akrep burcuyla bağlantılıdır, bu kişi dönüşümcü, sezgili ve güçlüdür.',
    reversed:
      'Ters Mahkeme, Akrep gölgesinde geçmişe takılma, takıntı veya aşırı sorgulama gösterebilir.',
    keywords: ['Akrep', 'dönüşüm', 'yeniden doğuş', 'sezgi'],
    context: 'Akrep enerjisi öne çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_na_pos2',
    card: 'The World',
    position: 2,
    upright:
      'Dünya, sabit burçların (Boğa, Aslan, Akrep, Kova) birleşimini temsil eder. Bu kişi kalıcı, güçlü ve istikrarlı enerjiler taşır.',
    reversed:
      'Ters Dünya, sabit burçların gölgesinde inat, katılık veya tamamlanmamışlık gösterebilir.',
    keywords: ['Boğa', 'Aslan', 'Akrep', 'Kova', 'istikrar'],
    context: 'Sabit burçlardan biri olabilir.',
    group: 'Majör Arkana',
  },

  //-- Kupalar --//
  {
    id: 'ace_of_cups_na_pos2',
    card: 'Ace of Cups',
    position: 2,
    upright:
      'Kupa Ası, bu kişinin güçlü bir su elementi etkisi taşıdığını gösterir. Yengeç, Akrep veya Balık enerjisiyle gelen taze duygusal açılıma işaret eder.',
    reversed:
      'Ters Kupa Ası, su burçlarının gölgesinde duygusal karmaşa ya da içe kapanıklık olabilir. Duygularını paylaşmakta zorlanan bir profil çıkabilir.',
    keywords: ['su burcu', 'duygu', 'açılım', 'empati'],
    context: 'Yengeç, Akrep veya Balık gibi su grubu burçları öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_na_pos2',
    card: 'Two of Cups',
    position: 2,
    upright:
      'Kupa İkilisi, uyumlu ve dengeli bir burcu işaret eder. Yengeç–Balık veya Akrep–Yengeç gibi su elementlerinin birbirini tamamlayan kombinasyonları öne çıkar.',
    reversed:
      'Ters Kupa İkilisi, dengesizlik veya kopukluk gösterebilir. Burcu ilişki odaklı olsa da (Yengeç, Terazi), gölgede bağ kurmada zorlanabilir.',
    keywords: ['uyum', 'su burcu', 'denge', 'ilişki'],
    context: 'Yengeç, Balık veya Akrep enerjisiyle bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_na_pos2',
    card: 'Three of Cups',
    position: 2,
    upright:
      'Kupa Üçlüsü, sosyal yönü kuvvetli Balık veya Yengeç etkisini işaret eder. Bu kişi çevresiyle uyumlu, kutlamayı seven biridir.',
    reversed:
      'Ters Kupa Üçlüsü, sosyal yorgunluk veya fazla yüzeysellik gösterebilir. Su burcu olsa da Balık gölgesinde dağınıklık olabilir.',
    keywords: ['sosyallik', 'kutlama', 'su burcu', 'dostluk'],
    context: 'Balık veya Yengeç vurgusu öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_na_pos2',
    card: 'Four of Cups',
    position: 2,
    upright:
      'Kupa Dörtlüsü, içine dönük Yengeç enerjisine işaret eder. Bu kişi hassas, duygularını saklayan ama derin hislere sahip olabilir.',
    reversed:
      'Ters Kupa Dörtlüsü, Yengeç gölgesinde melankoli veya ilgisizlik gösterebilir. İçe kapanıklık ilişkiye yansıyabilir.',
    keywords: ['içe dönüş', 'Yengeç', 'hassasiyet', 'duygu'],
    context: 'Yengeç burcunun içsel tarafını anlatır.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_na_pos2',
    card: 'Five of Cups',
    position: 2,
    upright:
      'Kupa Beşlisi, Akrep burcunun gölgesini işaret eder. Bu kişi tutkuları derin ama kayıplara da duyarlı olabilir.',
    reversed:
      'Ters Kupa Beşlisi, Akrep burcunun dönüşümcü tarafını açığa çıkarır. Acıdan güçlenerek çıkabilir.',
    keywords: ['Akrep', 'duygu', 'dönüşüm', 'tutku'],
    context: 'Akrep burcu etkisi güçlü olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_na_pos2',
    card: 'Six of Cups',
    position: 2,
    upright:
      'Kupa Altılısı, nostaljik ve sevecen Yengeç burcunu işaret eder. Bu kişi geçmişle bağ kurmaya önem verir.',
    reversed:
      'Ters Kupa Altılısı, Yengeç gölgesinde geçmişten kopamayan, fazla takılı kalan bir kişiyi gösterebilir.',
    keywords: ['Yengeç', 'nostalji', 'duygu', 'aile'],
    context: 'Yengeç enerjisi belirgindir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_na_pos2',
    card: 'Seven of Cups',
    position: 2,
    upright:
      'Kupa Yedilisi, hayal gücü güçlü Balık burcunu işaret eder. Bu kişi yaratıcı, sezgisel ama bazen kararsız olabilir.',
    reversed:
      'Ters Kupa Yedilisi, Balık gölgesinde dağınıklık veya yanılsamalar gösterebilir. Karar vermekte zorlanabilir.',
    keywords: ['Balık', 'hayal', 'sezgi', 'karmaşa'],
    context: 'Balık burcu etkisi öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_na_pos2',
    card: 'Eight of Cups',
    position: 2,
    upright:
      'Kupa Sekizlisi, ruhsal derinlik arayan Balık ya da Akrep burcunu işaret eder. Bu kişi yaşamında anlam peşindedir.',
    reversed:
      'Ters Kupa Sekizlisi, Balık–Akrep gölgesinde kararsızlık veya kaçış eğilimi gösterebilir.',
    keywords: ['Balık', 'Akrep', 'arayış', 'derinlik'],
    context: 'Balık veya Akrep vurgusu güçlüdür.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_na_pos2',
    card: 'Nine of Cups',
    position: 2,
    upright:
      'Kupa Dokuzlusu, Venüs etkisiyle uyumlu Yengeç veya Balık burcuna işaret eder. Bu kişi duygusal tatmini önemser.',
    reversed:
      'Ters Kupa Dokuzlusu, su burçlarının gölgesinde yüzeysellik veya doyumsuzluk gösterebilir.',
    keywords: ['su burcu', 'tatmin', 'duygu', 'empati'],
    context: 'Yengeç–Balık etkileri öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_na_pos2',
    card: 'Ten of Cups',
    position: 2,
    upright:
      'Kupa Onlusu, aile odaklı Yengeç burcunu işaret eder. Bu kişi ev ve aidiyet temasını önemser.',
    reversed:
      'Ters Kupa Onlusu, Yengeç gölgesinde aile beklentilerinden kaynaklı zorluklar olabilir.',
    keywords: ['Yengeç', 'aile', 'duygu', 'aidiyet'],
    context: 'Yengeç burcu enerjisi baskındır.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_na_pos2',
    card: 'Page of Cups',
    position: 2,
    upright:
      'Kupa Prensi, genç ve hayalperest Balık enerjisini işaret eder. Bu kişi masum, romantik ve sezgisel olabilir.',
    reversed:
      'Ters Kupa Prensi, Balık gölgesinde aşırı hassas veya kaçışçı olabilir.',
    keywords: ['Balık', 'romantizm', 'sezgi', 'masumiyet'],
    context: 'Balık enerjisi baskın çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_na_pos2',
    card: 'Knight of Cups',
    position: 2,
    upright:
      'Kupa Şövalyesi, romantik Balık ya da Akrep burcunu işaret eder. Bu kişi idealist ve duygularını ifade eden biridir.',
    reversed:
      'Ters Kupa Şövalyesi, Balık–Akrep gölgesinde fazla hayalperest ya da tutarsız olabilir.',
    keywords: ['Balık', 'Akrep', 'romantizm', 'ideal'],
    context: 'Balık veya Akrep vurgusu güçlüdür.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_na_pos2',
    card: 'Queen of Cups',
    position: 2,
    upright:
      'Kupa Kraliçesi, sezgisel ve şefkatli Yengeç burcunu işaret eder. Bu kişi duygusal olgunluğa sahiptir.',
    reversed:
      'Ters Kupa Kraliçesi, Yengeç gölgesinde aşırı hassasiyet veya bağımlılık gösterebilir.',
    keywords: ['Yengeç', 'sezgi', 'şefkat', 'olgunluk'],
    context: 'Yengeç enerjisi baskındır.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_na_pos2',
    card: 'King of Cups',
    position: 2,
    upright:
      'Kupa Kralı, olgun Balık veya Akrep burcunu işaret eder. Bu kişi duygularını yönetebilen ve anlayışlı biridir.',
    reversed:
      'Ters Kupa Kralı, Akrep–Balık gölgesinde manipülasyon ya da bastırılmış öfke gösterebilir.',
    keywords: ['Balık', 'Akrep', 'olgunluk', 'duygu'],
    context: 'Balık veya Akrep burcu öne çıkar.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_na_pos2',
    card: 'Ace of Swords',
    position: 2,
    upright:
      'Kılıç Ası, hava burcu etkisini güçlü vurgular. İkizler, Terazi veya Kova burcu; zekâ, netlik ve keskin düşünce ile tanımlanır.',
    reversed:
      'Ters Kılıç Ası, bu kişinin iletişimde bulanıklık veya kararsızlık gösterebileceğini anlatır. Hava burçlarının gölgesi olan zihinsel karmaşa belirginleşebilir.',
    keywords: ['hava burcu', 'zeka', 'netlik', 'karar'],
    context: 'İkizler, Terazi veya Kova enerjisini işaret eder.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_na_pos2',
    card: 'Two of Swords',
    position: 2,
    upright:
      'Kılıç İkilisi, Terazi burcunun kararsız ama adil yönünü temsil eder. Bu kişi denge arayışıyla tanınır.',
    reversed:
      'Ters Kılıç İkilisi, Terazi’nin gölgesinde kaçınma veya karar vermekte zorlanma öne çıkar.',
    keywords: ['Terazi', 'denge', 'karar', 'ikilem'],
    context: 'Terazi burcu etkisi baskın olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_na_pos2',
    card: 'Three of Swords',
    position: 2,
    upright:
      'Kılıç Üçlüsü, İkizler burcunun gölgesine işaret eder. Bu kişi iletişimde sert sözlere ya da kırıcı dürüstlüğe sahip olabilir.',
    reversed:
      'Ters Kılıç Üçlüsü, İkizler’in gölgesinde dağınıklık veya yanlış anlaşılmalar ön planda olabilir.',
    keywords: ['İkizler', 'iletişim', 'ayrılık', 'sertlik'],
    context: 'İkizler enerjisi vurgulanır.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_na_pos2',
    card: 'Four of Swords',
    position: 2,
    upright:
      'Kılıç Dörtlüsü, Kova’nın içsel dinlenmeye değer veren yanını gösterir. Bu kişi zihinsel molalara önem verebilir.',
    reversed:
      'Ters Kılıç Dörtlüsü, Kova gölgesinde aşırı mesafe veya kopukluk gösterebilir.',
    keywords: ['Kova', 'dinlenme', 'mesafe', 'zihin'],
    context: 'Kova burcu etkisi öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_na_pos2',
    card: 'Five of Swords',
    position: 2,
    upright:
      'Kılıç Beşlisi, Kova’nın meydan okuyan tarafını işaret eder. Bu kişi rekabetçi olabilir.',
    reversed:
      'Ters Kılıç Beşlisi, Kova’nın gölgesinde inatlaşma veya gereksiz tartışmalar gösterebilir.',
    keywords: ['Kova', 'rekabet', 'inat', 'zihin'],
    context: 'Kova burcu gölge yanlarıyla öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_na_pos2',
    card: 'Six of Swords',
    position: 2,
    upright:
      'Kılıç Altılısı, hava burçlarının analitik yönünü vurgular. İkizler veya Kova etkisiyle uzaklaşma ve zihinsel netlik temasını getirir.',
    reversed:
      'Ters Kılıç Altılısı, hava burçlarının gölgesinde uzaklaşamama ya da takılı kalma gösterebilir.',
    keywords: ['İkizler', 'Kova', 'mesafe', 'analiz'],
    context: 'İkizler veya Kova enerjisi baskındır.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_na_pos2',
    card: 'Seven of Swords',
    position: 2,
    upright:
      'Kılıç Yedilisi, İkizler burcunun stratejik ve bazen gizli yönünü gösterir. Zekâsıyla ilerleyen biridir.',
    reversed:
      'Ters Kılıç Yedilisi, İkizler gölgesinde dürüstlük sorunları veya yarım gerçeklerle sınanma olabilir.',
    keywords: ['İkizler', 'strateji', 'zeka', 'gizlilik'],
    context: 'İkizler enerjisi güçlüdür.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_na_pos2',
    card: 'Eight of Swords',
    position: 2,
    upright:
      'Kılıç Sekizlisi, Terazi’nin gölgesinde kararsızlık ve zihinsel engelleri işaret eder. Bu kişi özgüvenini toparlamakta zaman alabilir.',
    reversed:
      'Ters Kılıç Sekizlisi, Terazi’nin dengeyi bulma yönünü açığa çıkarır. Kararsızlıktan özgürleşme eğilimi vardır.',
    keywords: ['Terazi', 'kararsızlık', 'engel', 'denge'],
    context: 'Terazi burcu öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_na_pos2',
    card: 'Nine of Swords',
    position: 2,
    upright:
      'Kılıç Dokuzlusu, İkizler burcunun aşırı zihinsel yükünü temsil eder. Kaygıya yatkın olabilir.',
    reversed:
      'Ters Kılıç Dokuzlusu, İkizler gölgesinde korkulardan kurtulmaya çalışan birini gösterebilir.',
    keywords: ['İkizler', 'kaygı', 'zihin', 'korku'],
    context: 'İkizler enerjisi belirgindir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_na_pos2',
    card: 'Ten of Swords',
    position: 2,
    upright:
      'Kılıç Onlusu, Kova’nın dönüşümcü tarafını temsil eder. Krizden çıkış için yenilenme arayışında olabilir.',
    reversed:
      'Ters Kılıç Onlusu, Kova gölgesinde geçmişten kopmakta zorlanma veya sert kırılmalar gösterebilir.',
    keywords: ['Kova', 'dönüşüm', 'yenilenme', 'kriz'],
    context: 'Kova burcu enerjisi baskındır.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_na_pos2',
    card: 'Page of Swords',
    position: 2,
    upright:
      'Kılıç Prensi, İkizler burcunu güçlü şekilde işaret eder. Öğrenmeye açık, meraklı ve genç bir enerji taşır.',
    reversed:
      'Ters Kılıç Prensi, İkizler gölgesinde dağınık bilgi veya yüzeysellik gösterebilir.',
    keywords: ['İkizler', 'merak', 'öğrenme', 'zihin'],
    context: 'İkizler burcu etkisi çok açıktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_na_pos2',
    card: 'Knight of Swords',
    position: 2,
    upright:
      'Kılıç Şövalyesi, Kova burcunun hızlı, kararlı ve keskin tarafını anlatır. Cesur ve direkt biridir.',
    reversed:
      'Ters Kılıç Şövalyesi, Kova gölgesinde acelecilik ya da sabırsızlık gösterebilir.',
    keywords: ['Kova', 'cesaret', 'hız', 'keskinlik'],
    context: 'Kova enerjisi baskındır.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_na_pos2',
    card: 'Queen of Swords',
    position: 2,
    upright:
      'Kılıç Kraliçesi, Terazi burcunu işaret eder. Adil, net ve mantıklı biridir.',
    reversed:
      'Ters Kılıç Kraliçesi, Terazi gölgesinde aşırı eleştirel veya mesafeli olabilir.',
    keywords: ['Terazi', 'adalet', 'mantık', 'denge'],
    context: 'Terazi burcu enerjisi öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_na_pos2',
    card: 'King of Swords',
    position: 2,
    upright:
      'Kılıç Kralı, Kova burcunun bilge ve stratejik yönünü gösterir. Bu kişi ilkeleriyle hareket eden biridir.',
    reversed:
      'Ters Kılıç Kralı, Kova gölgesinde katı, soğuk veya dogmatik davranış gösterebilir.',
    keywords: ['Kova', 'bilgelik', 'strateji', 'otorite'],
    context: 'Kova burcu etkisi baskındır.',
    group: 'Kılıçlar',
  },
  // --- Asalar Serisi ---//
  {
    id: 'ace_of_wands_ma_pos2',
    card: 'Ace of Wands',
    position: 2,
    upright:
      'Değnek Ası, ateş burçlarının doğrudan enerjisini taşır. Koç, Aslan veya Yay burcundan, hevesli ve girişken biri olabilir.',
    reversed:
      'Ters Değnek Ası, bu kişinin ateş burcu özelliklerini yitirmiş gibi görünebileceğini gösterir. Sabırsızlık veya motivasyon eksikliği öne çıkabilir.',
    keywords: ['Koç', 'Aslan', 'Yay', 'heves', 'başlangıç'],
    context: 'Koç, Aslan veya Yay burcu etkisi baskındır.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ma_pos2',
    card: 'Two of Wands',
    position: 2,
    upright:
      'Değnek İkilisi, Yay burcunun ufka bakan ve vizyoner doğasını işaret eder. Planlı ve ileriye dönük biri olabilir.',
    reversed:
      'Ters Değnek İkilisi, Yay gölgesinde kararsızlık ya da riskten kaçınma gösterebilir.',
    keywords: ['Yay', 'vizyon', 'plan', 'ufuk'],
    context: 'Yay burcu öne çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ma_pos2',
    card: 'Three of Wands',
    position: 2,
    upright:
      'Değnek Üçlüsü, Aslan’ın genişleyen enerjisini taşır. Cesur ve işbirliğine açık biri olabilir.',
    reversed:
      'Ters Değnek Üçlüsü, Aslan gölgesinde dar görüşlülük ya da aşırı gurur gösterebilir.',
    keywords: ['Aslan', 'genişleme', 'işbirliği', 'cesaret'],
    context: 'Aslan burcu etkisi belirgin.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ma_pos2',
    card: 'Four of Wands',
    position: 2,
    upright:
      'Değnek Dörtlüsü, Aslan’ın kutlama ve aidiyet arayışını temsil eder. Bu kişi neşeli ve paylaşımcı olabilir.',
    reversed:
      'Ters Değnek Dörtlüsü, Aslan gölgesinde huzursuzluk veya bağlılık korkusu gösterebilir.',
    keywords: ['Aslan', 'kutlama', 'aidiyet', 'uyum'],
    context: 'Aslan enerjisi baskındır.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ma_pos2',
    card: 'Five of Wands',
    position: 2,
    upright:
      'Değnek Beşlisi, Koç’un rekabetçi ve meydan okuyan tarafını gösterir. Canlı, hırslı bir kişi olabilir.',
    reversed:
      'Ters Değnek Beşlisi, Koç gölgesinde gereksiz tartışmalar ya da sabırsızlık gösterebilir.',
    keywords: ['Koç', 'rekabet', 'meydan okuma', 'canlılık'],
    context: 'Koç burcu etkisi öne çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ma_pos2',
    card: 'Six of Wands',
    position: 2,
    upright:
      'Değnek Altılısı, Aslan burcunun karizmatik liderliğini işaret eder. Tanınan ve beğenilen biri olabilir.',
    reversed:
      'Ters Değnek Altılısı, Aslan gölgesinde ego sorunları ya da onay bağımlılığı gösterebilir.',
    keywords: ['Aslan', 'zafer', 'tanınma', 'karizma'],
    context: 'Aslan enerjisi belirgindir.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ma_pos2',
    card: 'Seven of Wands',
    position: 2,
    upright:
      'Değnek Yedilisi, Koç burcunun kararlı ve savunmacı yönünü gösterir. İnatçı ve mücadeleci biri olabilir.',
    reversed:
      'Ters Değnek Yedilisi, Koç gölgesinde yorgunluk ya da pes etme eğilimi gösterebilir.',
    keywords: ['Koç', 'mücadele', 'savunma', 'inat'],
    context: 'Koç burcu baskındır.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ma_pos2',
    card: 'Eight of Wands',
    position: 2,
    upright:
      'Değnek Sekizlisi, Yay burcunun hızlı ve hareketli doğasını işaret eder. Seyahat veya hızlı gelişmelerle ilgili olabilir.',
    reversed:
      'Ters Değnek Sekizlisi, Yay gölgesinde kaos ya da yönsüz hız gösterebilir.',
    keywords: ['Yay', 'hız', 'seyahat', 'gelişme'],
    context: 'Yay burcu enerjisi baskındır.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ma_pos2',
    card: 'Nine of Wands',
    position: 2,
    upright:
      'Değnek Dokuzlusu, Koç’un dirençli ve yılmaz tarafını gösterir. Bu kişi kolay pes etmez.',
    reversed:
      'Ters Değnek Dokuzlusu, Koç gölgesinde aşırı yorgunluk veya sürekli tetikte olma hali gösterebilir.',
    keywords: ['Koç', 'direnç', 'azim', 'koruma'],
    context: 'Koç burcu etkisi öne çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ma_pos2',
    card: 'Ten of Wands',
    position: 2,
    upright:
      'Değnek Onlusu, Oğlak ile ateş enerjisinin birleşimi gibi sorumluluk taşıyan biri olabilir. Ancak asıl ateş burçlarından Koç’un yük taşıma azmini de gösterir.',
    reversed:
      'Ters Değnek Onlusu, Koç gölgesinde aşırı yüklenme veya kendi başına kalma eğilimi gösterebilir.',
    keywords: ['Koç', 'sorumluluk', 'yük', 'azim'],
    context: 'Koç burcu etkisi ağır basıyor.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ma_pos2',
    card: 'Page of Wands',
    position: 2,
    upright:
      'Değnek Prensi, Yay burcunun genç, maceracı ve iyimser tarafını işaret eder.',
    reversed:
      'Ters Değnek Prensi, Yay gölgesinde dağınıklık ya da sabırsızlık gösterebilir.',
    keywords: ['Yay', 'macera', 'iyimserlik', 'öğrenme'],
    context: 'Yay burcu baskındır.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ma_pos2',
    card: 'Knight of Wands',
    position: 2,
    upright:
      'Değnek Şövalyesi, Koç veya Yay burcunun cesur, hızlı ve tutkulu tarafını temsil eder.',
    reversed:
      'Ters Değnek Şövalyesi, ateş burcu gölgesinde savrukluk ya da istikrarsızlık gösterebilir.',
    keywords: ['Koç', 'Yay', 'cesaret', 'tutku'],
    context: 'Koç veya Yay enerjisi öne çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ma_pos2',
    card: 'Queen of Wands',
    position: 2,
    upright:
      'Değnek Kraliçesi, Aslan burcunun karizma, sıcaklık ve liderlik enerjisini taşır.',
    reversed:
      'Ters Değnek Kraliçesi, Aslan gölgesinde kıskançlık ya da öz güven sorunları gösterebilir.',
    keywords: ['Aslan', 'liderlik', 'karizma', 'özgüven'],
    context: 'Aslan burcu baskındır.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ma_pos2',
    card: 'King of Wands',
    position: 2,
    upright:
      'Değnek Kralı, Yay veya Aslan burcunun vizyoner liderlik ve cesur doğasını işaret eder.',
    reversed:
      'Ters Değnek Kralı, ateş burçlarının gölgesinde kibir ya da otorite sorunları gösterebilir.',
    keywords: ['Aslan', 'Yay', 'vizyon', 'liderlik'],
    context: 'Aslan veya Yay burcu öne çıkar.',
    group: 'Asalar',
  },

  //--- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_na_pos2',
    card: 'Ace of Pentacles',
    position: 2,
    upright:
      'Tılsım Ası, toprak burçlarından birini işaret eder. Boğa, Başak veya Oğlak; güvenilirlik ve somut adımlarla tanımlanır.',
    reversed:
      'Ters Tılsım Ası, bu kişinin maddi güvence arayışında dengesizlik yaşayabileceğini gösterir. Toprak burçlarının gölgesinde sabitlik yerine durağanlık öne çıkabilir.',
    keywords: ['toprak burcu', 'güvence', 'madde', 'başlangıç'],
    context: 'Boğa, Başak veya Oğlak etkisi baskındır.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_na_pos2',
    card: 'Two of Pentacles',
    position: 2,
    upright:
      'Tılsım İkilisi, Başak burcunun pratik ve denge arayışını işaret eder. Bu kişi çok yönlü ve uyumlu olabilir.',
    reversed:
      'Ters Tılsım İkilisi, Başak’ın gölgesinde kararsızlık ya da fazla yüklenme gösterebilir.',
    keywords: ['Başak', 'denge', 'pratiklik', 'uyum'],
    context: 'Başak enerjisi öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_na_pos2',
    card: 'Three of Pentacles',
    position: 2,
    upright:
      'Tılsım Üçlüsü, Oğlak burcunun işbirlikçi ve yapı kuran tarafını temsil eder. Bu kişi ekip çalışmasına önem verir.',
    reversed:
      'Ters Tılsım Üçlüsü, Oğlak gölgesinde işbirliği sorunları veya bireysel katılık gösterebilir.',
    keywords: ['Oğlak', 'işbirliği', 'emek', 'yapı'],
    context: 'Oğlak enerjisi baskındır.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_na_pos2',
    card: 'Four of Pentacles',
    position: 2,
    upright:
      'Tılsım Dörtlüsü, Boğa burcunun güvenlik arayışını işaret eder. Bu kişi sahip olduklarını korumak ister.',
    reversed:
      'Ters Tılsım Dörtlüsü, Boğa gölgesinde cimrilik veya kıskançlık gösterebilir.',
    keywords: ['Boğa', 'güvenlik', 'mülkiyet', 'koruma'],
    context: 'Boğa burcu öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_na_pos2',
    card: 'Five of Pentacles',
    position: 2,
    upright:
      'Tılsım Beşlisi, toprak burçlarının gölgesinde kayıp veya yoksunluk temasını taşır. Özellikle Boğa’da maddi güvence sorunları öne çıkabilir.',
    reversed:
      'Ters Tılsım Beşlisi, kayıplardan toparlanmayı ve dayanıklılığı işaret eder. Oğlak veya Başak burcu bu direnci gösterebilir.',
    keywords: ['Boğa', 'Oğlak', 'kayıp', 'dayanıklılık'],
    context: 'Toprak burcu gölgesinde kriz ve iyileşme vurgusu var.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_na_pos2',
    card: 'Six of Pentacles',
    position: 2,
    upright:
      'Tılsım Altılısı, Boğa veya Terazi etkisini işaret eder. Adil paylaşımcı ve dengeli biridir.',
    reversed:
      'Ters Tılsım Altılısı, Boğa gölgesinde güç dengesizlikleri ya da çıkar ilişkileri gösterebilir.',
    keywords: ['Boğa', 'adalet', 'paylaşım', 'denge'],
    context: 'Boğa enerjisi belirgindir.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_na_pos2',
    card: 'Seven of Pentacles',
    position: 2,
    upright:
      'Tılsım Yedilisi, Başak burcunun sabır ve değerlendirme yönünü temsil eder. Bu kişi detaycıdır.',
    reversed:
      'Ters Tılsım Yedilisi, Başak gölgesinde sabırsızlık ya da yanlış yatırım gösterebilir.',
    keywords: ['Başak', 'sabır', 'değerlendirme', 'detay'],
    context: 'Başak burcu etkisi öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_na_pos2',
    card: 'Eight of Pentacles',
    position: 2,
    upright:
      'Tılsım Sekizlisi, Başak’ın çalışkan ve öğrenmeye açık tarafını gösterir. Bu kişi emekle ilerler.',
    reversed:
      'Ters Tılsım Sekizlisi, Başak gölgesinde fazla mükemmeliyetçilik ya da özensizlik olabilir.',
    keywords: ['Başak', 'emek', 'öğrenme', 'detay'],
    context: 'Başak burcu enerjisi baskındır.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_na_pos2',
    card: 'Nine of Pentacles',
    position: 2,
    upright:
      'Tılsım Dokuzlusu, Boğa burcunun zarif bağımsızlığını işaret eder. Bu kişi kendi değerini bilir.',
    reversed:
      'Ters Tılsım Dokuzlusu, Boğa gölgesinde bağımlılık ya da aşırı konfor düşkünlüğü gösterebilir.',
    keywords: ['Boğa', 'bağımsızlık', 'öz değer', 'konfor'],
    context: 'Boğa enerjisi öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_na_pos2',
    card: 'Ten of Pentacles',
    position: 2,
    upright:
      'Tılsım Onlusu, Oğlak burcunun uzun vadeli yapıcı yönünü gösterir. Bu kişi kalıcılığa önem verir.',
    reversed:
      'Ters Tılsım Onlusu, Oğlak gölgesinde aile veya miras konularında zorluklar gösterebilir.',
    keywords: ['Oğlak', 'istikrar', 'miras', 'kalıcılık'],
    context: 'Oğlak burcu baskındır.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_na_pos2',
    card: 'Page of Pentacles',
    position: 2,
    upright:
      'Tılsım Prensi, Başak burcunun öğrenmeye açık genç enerjisini temsil eder. Meraklı ve çalışkandır.',
    reversed:
      'Ters Tılsım Prensi, Başak gölgesinde dağınıklık veya erteleme gösterebilir.',
    keywords: ['Başak', 'öğrenme', 'başlangıç', 'çalışma'],
    context: 'Başak enerjisi öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_na_pos2',
    card: 'Knight of Pentacles',
    position: 2,
    upright:
      'Tılsım Şövalyesi, Oğlak burcunun disiplinli ve istikrarlı yönünü gösterir. Güvenilir biridir.',
    reversed:
      'Ters Tılsım Şövalyesi, Oğlak gölgesinde katılık veya inatçılık gösterebilir.',
    keywords: ['Oğlak', 'disiplin', 'istikrar', 'çalışkanlık'],
    context: 'Oğlak burcu baskındır.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_na_pos2',
    card: 'Queen of Pentacles',
    position: 2,
    upright:
      'Tılsım Kraliçesi, Boğa burcunun besleyici ve şefkatli tarafını işaret eder. Kaynaklarını dengeli kullanır.',
    reversed:
      'Ters Tılsım Kraliçesi, Boğa gölgesinde aşırı sahiplenme veya öz-bakım eksikliği gösterebilir.',
    keywords: ['Boğa', 'şefkat', 'pratiklik', 'güvence'],
    context: 'Boğa enerjisi baskındır.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_na_pos2',
    card: 'King of Pentacles',
    position: 2,
    upright:
      'Tılsım Kralı, Oğlak burcunun liderlik ve sağlamlık yönünü temsil eder. Güven verici ve kararlı biridir.',
    reversed:
      'Ters Tılsım Kralı, Oğlak gölgesinde aşırı kontrol veya statü odaklılık gösterebilir.',
    keywords: ['Oğlak', 'liderlik', 'sağlamlık', 'madde'],
    context: 'Oğlak burcu etkisi öne çıkar.',
    group: 'Tılsımlar',
  },
];

/**
 * Belirli bir kart için pozisyon 2 anlamını getirir
 * @param card - Tarot kartı
 * @returns pozisyon 2 anlamı veya null
 */
export function getNewLoverposition2Meaning(
  card: TarotCard
): NewLoverposition2Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position2Meanings.find(
    m =>
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
    Deli: 'The Fool',
    Büyücü: 'The Magician',
    'Yüksek Rahibe': 'The High Priestess',
    İmparatoriçe: 'The Empress',
    İmparator: 'The Emperor',
    Hierophant: 'The Hierophant',
    Aziz: 'The Hierophant',
    Aşıklar: 'The Lovers',
    'Savaş Arabası': 'The Chariot',
    Güç: 'Strength',
    Ermiş: 'The Hermit',
    Münzevi: 'The Hermit',
    'Kader Çarkı': 'The The Wheel of Fortune',
    Adalet: 'Justice',
    'Asılı Adam': 'The Hanged Man',
    Ölüm: 'Death',
    Ölçü: 'Temperance',
    Ölçülülük: 'Temperance',
    Şeytan: 'The Devil',
    Kule: 'The Tower',
    Yıldız: 'The Star',
    Ay: 'The Moon',
    Güneş: 'The Sun',
    Yargı: 'Judgement',
    Mahkeme: 'Judgement',
    Dünya: 'The World',
  };

  // Türkçe ismi İngilizce'ye çevir
  const englishName = cardNameMapping[card.nameTr] || card.nameTr;

  // İngilizce isimle tekrar ara
  meaning = position2Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 2 anlamını getirir
 * @param cardName - Kart ismi
 * @returns pozisyon 2 anlamı veya null
 */
export function getNewLoverposition2MeaningByCardName(
  cardName: string
): NewLoverposition2Meaning | null {
  return position2Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 2 anlamlarını getirir
 * @returns pozisyon 2 anlamları array'i
 */
export function getAllNewLoverposition2Meanings(): NewLoverposition2Meaning[] {
  return position2Meanings;
}

/**
 * Kart grubuna göre pozisyon 2 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getNewLoverposition2MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): NewLoverposition2Meaning[] {
  return position2Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
  export const useI18nposition2Meanings = (): I18nNewLoverposition2Meaning[] => {
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
): I18nNewLoverposition2Meaning | null => {
  const originalMeaning = position2Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`new-lover.meanings.${cardKey}.position2.upright`);
  const i18nReversed = t(`new-lover.meanings.${cardKey}.position2.reversed`);
  const i18nKeywords = t(`new-lover.meanings.${cardKey}.position2.keywords`);
  const i18nContext = t(`new-lover.meanings.${cardKey}.position2.context`);
  const i18nGroup = t(
    `new-lover.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
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
const newLoverposition2Exports = {
  position2Meanings,
  getNewLoverposition2Meaning,
  getNewLoverposition2MeaningByCardName,
  getAllNewLoverposition2Meanings,
  getNewLoverposition2MeaningsByGroup,
  getI18nposition2Meaning,
};

export default newLoverposition2Exports;
