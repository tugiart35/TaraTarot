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

export interface ProblemSolvingPosition1Meaning {
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
export interface I18nProblemSolvingPosition1Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position1Meanings: ProblemSolvingPosition1Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ps_pos1',
    card: 'The Fool',
    position: 1,
    upright:
      'Joker, sorunun temelinde yeni bir başlangıca duyulan ihtiyaç veya bilinmez bir yola adım atma arzusu olabilir. Problem, belirsizlik ve plansızlıktan doğuyor olabilir.',
    reversed:
      'Ters Joker, sorunun özünde dikkatsizlik, riskleri görmezden gelme ya da sorumluluklardan kaçma yatıyor olabilir.',
    keywords: ['başlangıç', 'risk', 'özgürlük', 'belirsizlik', 'soru'],
    context:
      'Sorunun merkezinde özgürlük isteği ile belirsizlikler arasında kalma hali var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ps_pos1',
    card: 'The Magician',
    position: 1,
    upright:
      'Büyücü, sorunun merkezinde potansiyelini ortaya koyma ihtiyacı ve becerilerini nasıl kullanacağını bilmemek olabilir.',
    reversed:
      'Ters Büyücü, aldatıcı durumlar, manipülasyon veya iradeni tam kullanamama bu problemin ana kaynağı olabilir.',
    keywords: ['potansiyel', 'yaratıcılık', 'beceri', 'irade', 'soru'],
    context:
      'Sorunun merkezinde gücünü doğru kanalize edememek veya yanlış yönlendirilmek var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ps_pos1',
    card: 'The High Priestess',
    position: 1,
    upright:
      'Başrahibe, sorunun merkezinde bilinçaltında saklı kalan bilgiler, sezgilerini dinlememe veya belirsizlik olabilir.',
    reversed:
      'Ters Başrahibe, sezgilerini bastırmak veya gerçekleri görmezden gelmek problemin kaynağı olabilir.',
    keywords: ['sezgi', 'bilgi', 'gizli gerçek', 'belirsizlik', 'soru'],
    context:
      'Sorunun özünde saklı kalan gerçekler veya bastırılmış sezgiler var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ps_pos1',
    card: 'The Empress',
    position: 1,
    upright:
      'İmparatoriçe, sorunun merkezinde yaratıcılığı ortaya koyma ihtiyacı, bakım ya da üretkenlik teması olabilir.',
    reversed:
      'Ters İmparatoriçe, tıkanmış yaratıcılık, ilham eksikliği veya aşırı bağımlılık sorunun kaynağı olabilir.',
    keywords: ['yaratıcılık', 'üretkenlik', 'besleyicilik', 'ilham', 'soru'],
    context:
      'Sorunun merkezinde yaratıcı gücünü kullanma veya bastırma hali var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ps_pos1',
    card: 'The Emperor',
    position: 1,
    upright:
      'İmparator, sorunun temelinde kontrol, düzen kurma ihtiyacı veya otorite figürleriyle yaşanan çatışma olabilir.',
    reversed:
      'Ters İmparator, aşırı kontrol, katı kurallar veya disiplin eksikliği problemin merkezinde olabilir.',
    keywords: ['kontrol', 'otorite', 'düzen', 'kurallar', 'soru'],
    context:
      'Sorunun merkezinde kontrol kurma ihtiyacı ya da otoriteyle çatışma var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ps_pos1',
    card: 'The Hierophant',
    position: 1,
    upright:
      'Aziz, sorunun temelinde geleneklere bağlılık, toplumun beklentileri veya rehberlik ihtiyacı olabilir.',
    reversed:
      'Ters Aziz, kuralları reddetmek, normların dışına çıkmak ya da otoriteye başkaldırı problemin kaynağı olabilir.',
    keywords: ['gelenek', 'öğreti', 'otorite', 'beklentiler', 'soru'],
    context:
      'Sorunun merkezinde toplumsal normlar ve otoriteye uyum sağlama isteği var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos1',
    card: 'The Lovers',
    position: 1,
    upright:
      'Aşıklar, sorunun merkezinde önemli bir seçim, değer çatışması veya uyum arayışı olabilir.',
    reversed:
      'Ters Aşıklar, kararsızlık, uyumsuz ilişkiler veya yanlış seçimler problemin özünü oluşturuyor olabilir.',
    keywords: ['seçim', 'uyum', 'karar', 'ilişki', 'soru'],
    context:
      'Sorunun merkezinde değerler ve uyum arasında yapılacak bir seçim var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ps_pos1',
    card: 'The Chariot',
    position: 1,
    upright:
      'Savaş Arabası, sorunun merkezinde yön bulma, kontrol sağlama veya kararlılık eksikliği olabilir.',
    reversed:
      'Ters Savaş Arabası, dağınıklık, kontrolsüzlük veya hedefe odaklanamama problemin kaynağı olabilir.',
    keywords: ['kontrol', 'irade', 'kararlılık', 'yön', 'soru'],
    context:
      'Sorunun merkezinde kontrol sağlama ve yön belirleme ihtiyacı var.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ps_pos1',
    card: 'Strength',
    position: 1,
    upright:
      'Güç, sorunun merkezinde sabır, öz güven veya korkularla yüzleşme ihtiyacı olabilir.',
    reversed:
      'Ters Güç, öz güven eksikliği, korkulara yenik düşmek veya sabırsızlık problemin kaynağı olabilir.',
    keywords: ['güç', 'cesaret', 'öz güven', 'sabır', 'soru'],
    context:
      'Sorunun merkezinde cesaretini kullanmak ve korkularla yüzleşmek var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ps_pos1',
    card: 'The Hermit',
    position: 1,
    upright:
      'Ermiş, sorunun merkezinde içe dönüş, yalnızlık ihtiyacı veya doğru rehberi arayış olabilir.',
    reversed:
      'Ters Ermiş, aşırı yalnızlık, kapanıklık veya rehbersizlik problemin kaynağı olabilir.',
    keywords: ['yalnızlık', 'içe dönüş', 'bilgelik', 'arayış', 'soru'],
    context: 'Sorunun merkezinde içsel rehberliğe duyulan ihtiyaç var.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ps_pos1',
    card: 'The Wheel of Fortune',
    position: 1,
    upright:
      'Kader Çarkı, sorunun merkezinde şans, döngüler ve kontrol edilemeyen olaylar olabilir.',
    reversed:
      'Ters Kader Çarkı, talihsizlik veya değişimlere direnmek problemin kaynağı olabilir.',
    keywords: ['kader', 'şans', 'döngü', 'değişim', 'soru'],
    context:
      'Sorunun merkezinde kaderin döngüleri ve kontrol dışı değişimler var.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ps_pos1',
    card: 'Justice',
    position: 1,
    upright:
      'Adalet, sorunun merkezinde dürüstlük, adil kararlar ve denge arayışı olabilir.',
    reversed:
      'Ters Adalet, yanlış kararlar, haksızlık veya dürüstlükten sapma problemin kaynağı olabilir.',
    keywords: ['adalet', 'denge', 'karar', 'sorumluluk', 'soru'],
    context:
      'Sorunun merkezinde adalet arayışı ve doğru karar verme ihtiyacı var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ps_pos1',
    card: 'The Hanged Man',
    position: 1,
    upright:
      'Asılan Adam, sorunun merkezinde bakış açısı değiştirme veya teslimiyet ihtiyacı olabilir.',
    reversed:
      'Ters Asılan Adam, direnç, kararsızlık veya isteksizlik problemin kaynağı olabilir.',
    keywords: ['bakış açısı', 'teslimiyet', 'farkındalık', 'denge', 'soru'],
    context: 'Sorunun merkezinde farklı bir açıdan bakma ihtiyacı var.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ps_pos1',
    card: 'Death',
    position: 1,
    upright:
      'Ölüm, sorunun merkezinde köklü bir dönüşüm, bitiş veya yenilenme ihtiyacı olabilir.',
    reversed:
      'Ters Ölüm, değişime direnç veya bırakmayı reddetmek problemin kaynağı olabilir.',
    keywords: ['dönüşüm', 'bitiş', 'başlangıç', 'yenilenme', 'soru'],
    context: 'Sorunun merkezinde köklü bir değişim ihtiyacı var.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ps_pos1',
    card: 'Temperance',
    position: 1,
    upright:
      'Denge, sorunun merkezinde uyum arayışı, ölçülülük veya sabır ihtiyacı olabilir.',
    reversed:
      'Ters Denge, aşırılıklar veya uyumsuzluk problemin kaynağı olabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'soru'],
    context: 'Sorunun merkezinde denge arayışı ve uyum sağlama isteği var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ps_pos1',
    card: 'The Devil',
    position: 1,
    upright:
      'Şeytan, sorunun merkezinde bağımlılıklar, kısıtlamalar veya sağlıksız bağlar olabilir.',
    reversed:
      'Ters Şeytan, zincirlerinden kurtulamamak veya kontrolü başkasına bırakmak problemin kaynağı olabilir.',
    keywords: ['bağımlılık', 'kısıtlama', 'özgürlük', 'kontrol', 'soru'],
    context: 'Sorunun merkezinde özgürlüğünü kısıtlayan bağlar var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ps_pos1',
    card: 'The Tower',
    position: 1,
    upright:
      'Kule, sorunun merkezinde ani değişimler, krizler veya beklenmedik yıkımlar olabilir.',
    reversed:
      'Ters Kule, değişime direnmek veya krizi ertelemek problemin kaynağı olabilir.',
    keywords: ['kriz', 'değişim', 'yıkım', 'yenilenme', 'soru'],
    context: 'Sorunun merkezinde ani değişimler ve krizler var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ps_pos1',
    card: 'The Star',
    position: 1,
    upright:
      'Yıldız, sorunun merkezinde umut, ilham ve yol gösterici bir vizyon ihtiyacı olabilir.',
    reversed:
      'Ters Yıldız, umutsuzluk, ilham eksikliği veya karamsarlık problemin kaynağı olabilir.',
    keywords: ['umut', 'ilham', 'vizyon', 'farkındalık', 'soru'],
    context: 'Sorunun merkezinde umut ve ilham arayışı var.',
    group: 'Majör Arkana',
  },
  {
    id: 'ten_of_cups_ps_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'Kadehler Onlusu, sorunun merkezinde aile uyumu, mutluluk ve tatmin arayışı olabilir.',
    reversed:
      'Ters Kadehler Onlusu, aile sorunları, mutsuzluk veya tatminsizlik problemin kaynağı olabilir.',
    keywords: ['aile', 'uyum', 'mutluluk', 'tatmin', 'soru'],
    context: 'Sorunun merkezinde aile uyumu ve mutluluk arayışı var.',
    group: 'Kupalar',
  },
  {
    id: 'the_moon_ps_pos1',
    card: 'The Moon',
    position: 1,
    upright:
      'Ay, sorunun merkezinde belirsizlik, korkular veya yanılsamalar olabilir.',
    reversed:
      'Ters Ay, gerçekleri görememek, aldanma veya korkulara kapılmak problemin kaynağı olabilir.',
    keywords: ['belirsizlik', 'korku', 'yanılsama', 'sezgi', 'soru'],
    context: 'Sorunun merkezinde belirsizlikler ve yanılsamalar var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos1',
    card: 'The Sun',
    position: 1,
    upright:
      'Güneş, sorunun merkezinde başarı, mutluluk arayışı veya görünürlük ihtiyacı olabilir.',
    reversed:
      'Ters Güneş, karamsarlık, özgüven eksikliği veya engellenmiş başarı problemin kaynağı olabilir.',
    keywords: ['başarı', 'özgüven', 'aydınlık', 'umut', 'soru'],
    context: 'Sorunun merkezinde başarı ve görünürlük arzusu var.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos1',
    card: 'Judgement',
    position: 1,
    upright:
      'Mahkeme, sorunun merkezinde geçmişle yüzleşmek, yeniden doğuş veya büyük bir karar ihtiyacı olabilir.',
    reversed:
      'Ters Mahkeme, geçmişten kaçmak, sorumluluk almamak veya kendini kandırmak problemin kaynağı olabilir.',
    keywords: ['yeniden doğuş', 'karar', 'yüzleşme', 'farkındalık', 'soru'],
    context:
      'Sorunun merkezinde geçmişle yüzleşme ve yeniden doğma ihtiyacı var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos1',
    card: 'The World',
    position: 1,
    upright:
      'Dünya, sorunun merkezinde tamamlanma, bütünlük veya döngüyü kapatma ihtiyacı olabilir.',
    reversed:
      'Ters Dünya, eksik kalmış süreçler, tamamlanmamış işler veya kapanmamış döngüler problemin kaynağı olabilir.',
    keywords: ['tamamlanma', 'başarı', 'bütünlük', 'zafer', 'soru'],
    context:
      'Sorunun merkezinde bir döngüyü tamamlama ve bütünlüğe ulaşma isteği var.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_ps_pos1',
    card: 'Ace of Cups',
    position: 1,
    upright:
      'Kupa Ası, sorunun merkezinde duygusal bir başlangıç, yeni bir his veya kalpten gelen bir arayış olabilir.',
    reversed:
      'Ters Kupa Ası, duygusal tıkanıklık, sevgiyi bastırmak veya hayal kırıklığı problemin kaynağı olabilir.',
    keywords: ['duygu', 'başlangıç', 'sevgi', 'ilham', 'soru'],
    context: 'Sorunun merkezinde duygusal bir yenilenme ihtiyacı var.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ps_pos1',
    card: 'Two of Cups',
    position: 1,
    upright:
      'İki Kupa, sorunun merkezinde ilişki, ortaklık veya uyumlu bir bağ kurma isteği olabilir.',
    reversed:
      'Ters İki Kupa, uyumsuzluk, anlaşmazlık veya kopukluk problemin kaynağı olabilir.',
    keywords: ['ortaklık', 'uyum', 'ilişki', 'birlik', 'soru'],
    context: 'Sorunun merkezinde bir bağ veya işbirliği konusu var.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ps_pos1',
    card: 'Three of Cups',
    position: 1,
    upright:
      'Üç Kupa, sorunun merkezinde destek görmek, kutlama veya sosyal bağların önemi olabilir.',
    reversed:
      'Ters Üç Kupa, dışlanma, yalnızlık veya aşırıya kaçmak problemin kaynağı olabilir.',
    keywords: ['kutlama', 'destek', 'topluluk', 'birliktelik', 'soru'],
    context: 'Sorunun merkezinde sosyal bağlar veya destek arayışı var.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ps_pos1',
    card: 'Four of Cups',
    position: 1,
    upright:
      'Dört Kupa, sorunun merkezinde ilgisizlik, tatminsizlik veya fırsatları görmemek olabilir.',
    reversed:
      'Ters Dört Kupa, dikkat dağınıklığı veya farkındalık eksikliği problemin kaynağı olabilir.',
    keywords: ['tatminsizlik', 'fırsat', 'ilgi', 'içe dönüş', 'soru'],
    context: 'Sorunun merkezinde fark edilmeyen fırsatlar var.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ps_pos1',
    card: 'Five of Cups',
    position: 1,
    upright:
      'Beş Kupa, sorunun merkezinde hayal kırıklıkları, kayıplar veya pişmanlıklar olabilir.',
    reversed:
      'Ters Beş Kupa, geçmişe takılı kalmak veya ders çıkaramamak problemin kaynağı olabilir.',
    keywords: ['kayıp', 'üzüntü', 'pişmanlık', 'geçmiş', 'soru'],
    context: 'Sorunun merkezinde geçmiş kayıplar ve pişmanlıklar var.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ps_pos1',
    card: 'Six of Cups',
    position: 1,
    upright:
      'Altı Kupa, sorunun merkezinde geçmişten gelen anılar, çocukluk etkileri veya nostalji olabilir.',
    reversed:
      'Ters Altı Kupa, geçmişe takılı kalmak veya ileriye gidememek problemin kaynağı olabilir.',
    keywords: ['geçmiş', 'anı', 'çocukluk', 'nostalji', 'soru'],
    context: 'Sorunun merkezinde geçmişten gelen duygusal etkiler var.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ps_pos1',
    card: 'Seven of Cups',
    position: 1,
    upright:
      'Yedi Kupa, sorunun merkezinde seçenek bolluğu, hayaller veya kafa karışıklığı olabilir.',
    reversed:
      'Ters Yedi Kupa, gerçeklerden kopmak veya yanlış seçimler yapmak problemin kaynağı olabilir.',
    keywords: ['seçenek', 'hayal', 'karışıklık', 'vizyon', 'soru'],
    context:
      'Sorunun merkezinde kafa karışıklığı veya seçenekler arasında kaybolmak var.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ps_pos1',
    card: 'Eight of Cups',
    position: 1,
    upright:
      'Sekiz Kupa, sorunun merkezinde tatminsizlikten uzaklaşma veya bir şeyleri geride bırakma ihtiyacı olabilir.',
    reversed:
      'Ters Sekiz Kupa, bırakmakta zorlanmak veya bağımlılık problemin kaynağı olabilir.',
    keywords: ['bırakmak', 'kopuş', 'tatminsizlik', 'arayış', 'soru'],
    context:
      'Sorunun merkezinde tatmin etmeyen bir şeyi geride bırakma ihtiyacı var.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ps_pos1',
    card: 'Nine of Cups',
    position: 1,
    upright:
      'Dokuz Kupa, sorunun merkezinde tatmin, başarı veya kişisel doyum isteği olabilir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatminler veya aşırı beklentiler problemin kaynağı olabilir.',
    keywords: ['tatmin', 'başarı', 'mutluluk', 'beklenti', 'soru'],
    context: 'Sorunun merkezinde kişisel mutluluk ve tatmin arayışı var.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ps_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'On Kupa, sorunun merkezinde huzur, uyumlu ilişkiler ve duygusal denge isteği olabilir.',
    reversed:
      'Ters On Kupa, uyumsuzluk, huzursuzluk veya ailevi sorunlar problemin kaynağı olabilir.',
    keywords: ['uyum', 'aile', 'denge', 'huzur', 'soru'],
    context:
      'Sorunun merkezinde huzurlu ve dengeli ilişkiler kurma isteği var.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ps_pos1',
    card: 'Page of Cups',
    position: 1,
    upright:
      'Kupa Prensi, sorunun merkezinde yaratıcılık, duygusal ifade veya yeni bir his olabilir.',
    reversed:
      'Ters Kupa Prensi, hayalcilik, duygusal olgunluk eksikliği veya dikkatsizlik problemin kaynağı olabilir.',
    keywords: ['yaratıcılık', 'ifade', 'hayal', 'duygu', 'soru'],
    context: 'Sorunun merkezinde duygusal ifade ve yaratıcılık arayışı var.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ps_pos1',
    card: 'Knight of Cups',
    position: 1,
    upright:
      'Kupa Şövalyesi, sorunun merkezinde idealizm, romantik bakış açısı veya hayallerin peşinden gitmek olabilir.',
    reversed:
      'Ters Kupa Şövalyesi, gerçeklerden kopmak veya aşırı hayalcilik problemin kaynağı olabilir.',
    keywords: ['idealizm', 'hayal', 'vizyon', 'romantizm', 'soru'],
    context: 'Sorunun merkezinde hayaller ve ideallerin etkisi var.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ps_pos1',
    card: 'Queen of Cups',
    position: 1,
    upright:
      'Kupa Kraliçesi, sorunun merkezinde empati, duygusal denge veya başkalarına fazla odaklanmak olabilir.',
    reversed:
      'Ters Kupa Kraliçesi, aşırı hassasiyet, duygusal karışıklık veya bağımlılık problemin kaynağı olabilir.',
    keywords: ['empati', 'hassasiyet', 'denge', 'duyarlılık', 'soru'],
    context: 'Sorunun merkezinde duygusal hassasiyet ve empati var.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ps_pos1',
    card: 'King of Cups',
    position: 1,
    upright:
      'Kupa Kralı, sorunun merkezinde duygusal olgunluk, soğukkanlılık veya güvenilirlik ihtiyacı olabilir.',
    reversed:
      'Ters Kupa Kralı, duygusal dengesizlik, bastırılmış hisler veya kontrolsüzlük problemin kaynağı olabilir.',
    keywords: ['olgunluk', 'denge', 'liderlik', 'duygu', 'soru'],
    context:
      'Sorunun merkezinde duygusal olgunluk ve dengeli bir yaklaşım ihtiyacı var.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_ps_pos1',
    card: 'Ace of Swords',
    position: 1,
    upright:
      'Kılıç Ası, sorunun merkezinde netlik arayışı, gerçeği bulma veya yeni bir fikre duyulan ihtiyaç olabilir.',
    reversed:
      'Ters Kılıç Ası, kafa karışıklığı, iletişim sorunları veya yanlış anlaşılmalar problemin kaynağı olabilir.',
    keywords: ['netlik', 'gerçek', 'fikir', 'iletişim', 'soru'],
    context:
      'Sorunun merkezinde gerçeği ortaya çıkarmak ve netlik kazanmak var.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ps_pos1',
    card: 'Two of Swords',
    position: 1,
    upright:
      'İki Kılıç, sorunun merkezinde kararsızlık, denge arayışı veya bir seçim yapmak olabilir.',
    reversed:
      'Ters İki Kılıç, gerçeği reddetmek veya karar vermekten kaçmak problemin kaynağı olabilir.',
    keywords: ['karar', 'denge', 'ikilem', 'seçim', 'soru'],
    context: 'Sorunun merkezinde yapılması gereken kritik bir seçim var.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ps_pos1',
    card: 'Three of Swords',
    position: 1,
    upright:
      'Üç Kılıç, sorunun merkezinde hayal kırıklığı, kalp kırıklığı veya acı verici bir tecrübe olabilir.',
    reversed:
      'Ters Üç Kılıç, geçmişin yaralarını iyileştirememek veya duygusal yükleri taşımak problemin kaynağı olabilir.',
    keywords: ['hayal kırıklığı', 'acı', 'geçmiş', 'kayıp', 'soru'],
    context: 'Sorunun merkezinde acı verici bir deneyimin etkisi var.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ps_pos1',
    card: 'Four of Swords',
    position: 1,
    upright:
      'Dört Kılıç, sorunun merkezinde dinlenme, toparlanma veya erteleme olabilir.',
    reversed:
      'Ters Dört Kılıç, aşırı yorgunluk, toparlanamamak veya sürekli kaçış problemin kaynağı olabilir.',
    keywords: ['dinlenme', 'erteleme', 'toparlanma', 'kaçış', 'soru'],
    context: 'Sorunun merkezinde toparlanma ve içsel dinlenme ihtiyacı var.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ps_pos1',
    card: 'Five of Swords',
    position: 1,
    upright:
      'Beş Kılıç, sorunun merkezinde çatışma, haksız rekabet veya ego savaşları olabilir.',
    reversed:
      'Ters Beş Kılıç, gereksiz tartışmalar veya kazanılsa bile kaybettiren durumlar problemin kaynağı olabilir.',
    keywords: ['çatışma', 'ego', 'rekabet', 'kaybetmek', 'soru'],
    context: 'Sorunun merkezinde çatışma ve ego savaşları var.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ps_pos1',
    card: 'Six of Swords',
    position: 1,
    upright:
      'Altı Kılıç, sorunun merkezinde bir geçiş süreci, geride bırakma veya değişim ihtiyacı olabilir.',
    reversed:
      'Ters Altı Kılıç, geçmişe bağlı kalmak veya ilerlemekte zorlanmak problemin kaynağı olabilir.',
    keywords: ['geçiş', 'bırakmak', 'ilerleme', 'değişim', 'soru'],
    context: 'Sorunun merkezinde bir şeyleri geride bırakma ihtiyacı var.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ps_pos1',
    card: 'Seven of Swords',
    position: 1,
    upright:
      'Yedi Kılıç, sorunun merkezinde gizlilik, strateji veya dürüst olmayan davranışlar olabilir.',
    reversed:
      'Ters Yedi Kılıç, yakalanma korkusu, açığa çıkan sırlar veya başarısız planlar problemin kaynağı olabilir.',
    keywords: ['strateji', 'gizlilik', 'hile', 'plan', 'soru'],
    context:
      'Sorunun merkezinde gizlenen gerçekler veya stratejik hamleler var.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ps_pos1',
    card: 'Eight of Swords',
    position: 1,
    upright:
      'Sekiz Kılıç, sorunun merkezinde zihinsel engeller, çaresizlik hissi veya sıkışmışlık olabilir.',
    reversed:
      'Ters Sekiz Kılıç, kendini sınırlamak, korkulara teslim olmak veya özgüven eksikliği problemin kaynağı olabilir.',
    keywords: ['sınırlama', 'korku', 'özgüven', 'zihin', 'soru'],
    context: 'Sorunun merkezinde zihinsel engellerden kurtulamamak var.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ps_pos1',
    card: 'Nine of Swords',
    position: 1,
    upright:
      'Dokuz Kılıç, sorunun merkezinde kaygılar, uykusuzluk ve stres olabilir.',
    reversed:
      'Ters Dokuz Kılıç, geçmiş korkularını aşamamak veya endişeleri bastırmak problemin kaynağı olabilir.',
    keywords: ['kaygı', 'stres', 'korku', 'endişe', 'soru'],
    context: 'Sorunun merkezinde korkular ve kaygılarla yüzleşmek var.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ps_pos1',
    card: 'Ten of Swords',
    position: 1,
    upright:
      'On Kılıç, sorunun merkezinde bir bitiş, ihanet veya yıkıcı bir son olabilir.',
    reversed:
      'Ters On Kılıç, toparlanamamak, eski yaraları kapatamamak veya süreci uzatmak problemin kaynağı olabilir.',
    keywords: ['bitiş', 'ihanet', 'acı', 'yenilenme', 'soru'],
    context: 'Sorunun merkezinde acılı bir son veya kapanış var.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ps_pos1',
    card: 'Page of Swords',
    position: 1,
    upright:
      'Kılıç Prensi, sorunun merkezinde merak, yeni fikirler veya dikkatsizlik olabilir.',
    reversed:
      'Ters Kılıç Prensi, yüzeysellik, dedikodular veya dikkatsizce hareket etmek problemin kaynağı olabilir.',
    keywords: ['merak', 'fikir', 'öğrenme', 'dikkat', 'soru'],
    context: 'Sorunun merkezinde bilgi arayışı ve öğrenme isteği var.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ps_pos1',
    card: 'Knight of Swords',
    position: 1,
    upright:
      'Kılıç Şövalyesi, sorunun merkezinde hızlı kararlar, acelecilik veya hedefe odaklanmak olabilir.',
    reversed:
      'Ters Kılıç Şövalyesi, acelecilik, düşüncesizlik veya agresif tavırlar problemin kaynağı olabilir.',
    keywords: ['hız', 'acele', 'hedef', 'kararlılık', 'soru'],
    context: 'Sorunun merkezinde aceleci kararlar veya hızlı hareket etme var.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ps_pos1',
    card: 'Queen of Swords',
    position: 1,
    upright:
      'Kılıç Kraliçesi, sorunun merkezinde mantık, objektiflik veya bağımsızlık ihtiyacı olabilir.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştiri, soğukluk veya anlayış eksikliği problemin kaynağı olabilir.',
    keywords: ['mantık', 'objektiflik', 'bağımsızlık', 'eleştiri', 'soru'],
    context: 'Sorunun merkezinde mantıklı ve objektif yaklaşım ihtiyacı var.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ps_pos1',
    card: 'King of Swords',
    position: 1,
    upright:
      'Kılıç Kralı, sorunun merkezinde adalet, bilgelik veya otorite olabilir.',
    reversed:
      'Ters Kılıç Kralı, katılık, adaletsizlik veya otoriteyle çatışma problemin kaynağı olabilir.',
    keywords: ['bilgelik', 'adalet', 'otorite', 'liderlik', 'soru'],
    context: 'Sorunun merkezinde bilgece kararlar ve adalet arayışı var.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_ps_pos1',
    card: 'Ace of Wands',
    position: 1,
    upright:
      'Asa Ası, sorunun merkezinde yeni bir ilham, yaratıcı bir fikir veya güçlü bir başlangıç ihtiyacı olabilir.',
    reversed:
      'Ters Asa Ası, motivasyon eksikliği, gecikmeler veya hevesin çabuk sönmesi problemin kaynağı olabilir.',
    keywords: ['ilham', 'yaratıcılık', 'başlangıç', 'motivasyon', 'soru'],
    context:
      'Sorunun merkezinde yeni bir enerji veya ilham kaynağı arayışı var.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ps_pos1',
    card: 'Two of Wands',
    position: 1,
    upright:
      'İki Asa, sorunun merkezinde plan yapmak, vizyon oluşturmak veya geleceğe dair kararlar olabilir.',
    reversed:
      'Ters İki Asa, dar görüşlülük, cesaret eksikliği veya adım atmaktan korkmak problemin kaynağı olabilir.',
    keywords: ['plan', 'vizyon', 'gelecek', 'cesaret', 'soru'],
    context:
      'Sorunun merkezinde geleceğe yönelik net planlar oluşturma ihtiyacı var.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ps_pos1',
    card: 'Three of Wands',
    position: 1,
    upright:
      'Üç Asa, sorunun merkezinde fırsatları değerlendirmek, genişlemek veya ilerlemek olabilir.',
    reversed:
      'Ters Üç Asa, fırsatları kaçırmak, beklemek veya vizyon eksikliği problemin kaynağı olabilir.',
    keywords: ['fırsat', 'genişleme', 'vizyon', 'ilerleme', 'soru'],
    context: 'Sorunun merkezinde yeni fırsatları görmek ve değerlendirmek var.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ps_pos1',
    card: 'Four of Wands',
    position: 1,
    upright:
      'Dört Asa, sorunun merkezinde istikrar, işbirliği veya kutlama arzusu olabilir.',
    reversed:
      'Ters Dört Asa, huzursuzluk, destek eksikliği veya temelsizlik problemin kaynağı olabilir.',
    keywords: ['istikrar', 'destek', 'kutlama', 'temel', 'soru'],
    context:
      'Sorunun merkezinde istikrarlı bir yapı ve uyumlu bağlar isteği var.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ps_pos1',
    card: 'Five of Wands',
    position: 1,
    upright:
      'Beş Asa, sorunun merkezinde rekabet, mücadele veya farklı görüşlerin çatışması olabilir.',
    reversed:
      'Ters Beş Asa, gereksiz tartışmalar, uyumsuzluk veya pasiflik problemin kaynağı olabilir.',
    keywords: ['rekabet', 'mücadele', 'çatışma', 'farklılık', 'soru'],
    context: 'Sorunun merkezinde mücadele ve fikir çatışmaları var.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ps_pos1',
    card: 'Six of Wands',
    position: 1,
    upright:
      'Altı Asa, sorunun merkezinde başarıya ulaşma arzusu, tanınmak veya takdir görmek olabilir.',
    reversed:
      'Ters Altı Asa, görünmez kalmak, kıskançlık veya başarının gölgelenmesi problemin kaynağı olabilir.',
    keywords: ['başarı', 'tanınma', 'takdir', 'özgüven', 'soru'],
    context: 'Sorunun merkezinde başarı ve takdir görme arzusu var.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ps_pos1',
    card: 'Seven of Wands',
    position: 1,
    upright:
      'Yedi Asa, sorunun merkezinde kendini savunmak, haklarını korumak veya direnmek olabilir.',
    reversed:
      'Ters Yedi Asa, güçsüzlük, direnç eksikliği veya geri çekilmek problemin kaynağı olabilir.',
    keywords: ['savunma', 'direnç', 'hak', 'cesaret', 'soru'],
    context: 'Sorunun merkezinde kendi duruşunu savunma ihtiyacı var.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ps_pos1',
    card: 'Eight of Wands',
    position: 1,
    upright:
      'Sekiz Asa, sorunun merkezinde hızlı gelişmeler, iletişim veya değişim ihtiyacı olabilir.',
    reversed:
      'Ters Sekiz Asa, gecikmeler, yanlış iletişim veya tıkanıklık problemin kaynağı olabilir.',
    keywords: ['hız', 'iletişim', 'değişim', 'fırsat', 'soru'],
    context: 'Sorunun merkezinde hızlı ilerleme ve iletişim ihtiyacı var.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ps_pos1',
    card: 'Nine of Wands',
    position: 1,
    upright:
      'Dokuz Asa, sorunun merkezinde direnç göstermek, sabırlı olmak veya bir sınavdan geçmek olabilir.',
    reversed:
      'Ters Dokuz Asa, yorgunluk, vazgeçme eğilimi veya güçsüzlük problemin kaynağı olabilir.',
    keywords: ['direnç', 'sabır', 'azim', 'koruma', 'soru'],
    context: 'Sorunun merkezinde dayanıklılık ve sabırla ilerlemek var.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ps_pos1',
    card: 'Ten of Wands',
    position: 1,
    upright:
      'On Asa, sorunun merkezinde aşırı sorumluluk, yük veya baskı olabilir.',
    reversed:
      'Ters On Asa, gereksiz yükler, tükenmişlik veya paylaşmamak problemin kaynağı olabilir.',
    keywords: ['yük', 'sorumluluk', 'baskı', 'tükenmişlik', 'soru'],
    context: 'Sorunun merkezinde fazla sorumluluk taşımak var.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ps_pos1',
    card: 'Page of Wands',
    position: 1,
    upright:
      'Asa Prensi, sorunun merkezinde yeni bir fikir, öğrenme hevesi veya macera arayışı olabilir.',
    reversed:
      'Ters Asa Prensi, sabırsızlık, hevesin çabuk sönmesi veya dikkatsizlik problemin kaynağı olabilir.',
    keywords: ['fikir', 'öğrenme', 'heves', 'yaratıcılık', 'soru'],
    context: 'Sorunun merkezinde yeni bir şey deneme isteği var.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ps_pos1',
    card: 'Knight of Wands',
    position: 1,
    upright:
      'Asa Şövalyesi, sorunun merkezinde cesaret, hareket etme arzusu veya enerji olabilir.',
    reversed:
      'Ters Asa Şövalyesi, acelecilik, yönsüzlük veya tutarsızlık problemin kaynağı olabilir.',
    keywords: ['cesaret', 'hareket', 'enerji', 'tutku', 'soru'],
    context: 'Sorunun merkezinde harekete geçme ihtiyacı var.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ps_pos1',
    card: 'Queen of Wands',
    position: 1,
    upright:
      'Asa Kraliçesi, sorunun merkezinde özgüven, liderlik veya karizma olabilir.',
    reversed:
      'Ters Asa Kraliçesi, özgüven eksikliği, kıskançlık veya otorite sorunları problemin kaynağı olabilir.',
    keywords: ['özgüven', 'liderlik', 'karizma', 'cesaret', 'soru'],
    context: 'Sorunun merkezinde özgüvenli bir duruş ihtiyacı var.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ps_pos1',
    card: 'King of Wands',
    position: 1,
    upright:
      'Asa Kralı, sorunun merkezinde vizyon, liderlik veya kontrol ihtiyacı olabilir.',
    reversed:
      'Ters Asa Kralı, yönsüzlük, baskıcı tavırlar veya vizyon eksikliği problemin kaynağı olabilir.',
    keywords: ['vizyon', 'liderlik', 'kontrol', 'karizma', 'soru'],
    context: 'Sorunun merkezinde güçlü bir vizyon ve yön ihtiyacı var.',
    group: 'Asalar',
  },
  {
    id: 'ace_of_pentacles_ps_pos1',
    card: 'Ace of Pentacles',
    position: 1,
    upright:
      'Tılsım Ası, sorunun merkezinde yeni bir fırsat, maddi güvence veya sağlam bir temel oluşturma arzusu olabilir.',
    reversed:
      'Ters Tılsım Ası, kaçırılmış fırsatlar, istikrarsızlık veya maddi güvensizlik problemin kaynağı olabilir.',
    keywords: ['fırsat', 'maddi güven', 'temel', 'başlangıç', 'soru'],
    context: 'Sorunun merkezinde somut bir fırsat veya güvence arayışı var.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ps_pos1',
    card: 'Two of Pentacles',
    position: 1,
    upright:
      'İki Tılsım, sorunun merkezinde denge arayışı, çoklu sorumluluklar veya öncelik belirleme olabilir.',
    reversed:
      'Ters İki Tılsım, dengesizlik, kontrolsüzlük veya kaynakları kötü yönetmek problemin kaynağı olabilir.',
    keywords: ['denge', 'öncelik', 'sorumluluk', 'esneklik', 'soru'],
    context: 'Sorunun merkezinde kaynakları dengede tutma ihtiyacı var.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ps_pos1',
    card: 'Three of Pentacles',
    position: 1,
    upright:
      'Üç Tılsım, sorunun merkezinde işbirliği, ekip çalışması veya bir projeyi inşa etme arzusu olabilir.',
    reversed:
      'Ters Üç Tılsım, uyumsuzluk, destek eksikliği veya yalnız çalışmak problemin kaynağı olabilir.',
    keywords: ['işbirliği', 'ekip', 'inşa', 'destek', 'soru'],
    context: 'Sorunun merkezinde işbirliği ve destek ihtiyacı var.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ps_pos1',
    card: 'Four of Pentacles',
    position: 1,
    upright:
      'Dört Tılsım, sorunun merkezinde güvenlik, sahiplenme veya elde tutma arzusu olabilir.',
    reversed:
      'Ters Dört Tılsım, aşırı kontrol, cimrilik veya paylaşmamak problemin kaynağı olabilir.',
    keywords: ['güvenlik', 'kontrol', 'paylaşım', 'sahiplenme', 'soru'],
    context: 'Sorunun merkezinde güvence ihtiyacı ve elde tutma arzusu var.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ps_pos1',
    card: 'Five of Pentacles',
    position: 1,
    upright:
      'Beş Tılsım, sorunun merkezinde maddi zorluklar, yalnızlık veya destek eksikliği olabilir.',
    reversed:
      'Ters Beş Tılsım, yardım istememek, kendini dışlanmış hissetmek veya güven kaybı problemin kaynağı olabilir.',
    keywords: ['maddi zorluk', 'yalnızlık', 'destek', 'kaygı', 'soru'],
    context: 'Sorunun merkezinde maddi ya da duygusal destek arayışı var.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ps_pos1',
    card: 'Six of Pentacles',
    position: 1,
    upright:
      'Altı Tılsım, sorunun merkezinde adalet, yardım alma veya verme, karşılıklı denge olabilir.',
    reversed:
      'Ters Altı Tılsım, adaletsizlik, bağımlı ilişkiler veya dengesiz alışveriş problemin kaynağı olabilir.',
    keywords: ['yardım', 'denge', 'adalet', 'paylaşım', 'soru'],
    context: 'Sorunun merkezinde adil bir denge ve paylaşım isteği var.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ps_pos1',
    card: 'Seven of Pentacles',
    position: 1,
    upright:
      'Yedi Tılsım, sorunun merkezinde sabır, emeklerinin karşılığını beklemek veya uzun vadeli yatırımlar olabilir.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık, acelecilik veya yanlış yatırımlar problemin kaynağı olabilir.',
    keywords: ['sabır', 'yatırım', 'bekleyiş', 'sonuç', 'soru'],
    context:
      'Sorunun merkezinde sabırlı olmak ve doğru zamanda sonuç almak var.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ps_pos1',
    card: 'Eight of Pentacles',
    position: 1,
    upright:
      'Sekiz Tılsım, sorunun merkezinde becerilerini geliştirmek, eğitim veya ustalaşma arzusu olabilir.',
    reversed:
      'Ters Sekiz Tılsım, motivasyon eksikliği, özensizlik veya yarım bırakmak problemin kaynağı olabilir.',
    keywords: ['ustalık', 'öğrenme', 'disiplin', 'çaba', 'soru'],
    context:
      'Sorunun merkezinde becerileri geliştirme ve disiplinli olma ihtiyacı var.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ps_pos1',
    card: 'Nine of Pentacles',
    position: 1,
    upright:
      'Dokuz Tılsım, sorunun merkezinde bağımsızlık, özgüven veya kişisel tatmin olabilir.',
    reversed:
      'Ters Dokuz Tılsım, yalnızlık korkusu, bağımlılık veya yetersizlik duygusu problemin kaynağı olabilir.',
    keywords: ['bağımsızlık', 'özgüven', 'tatmin', 'öz yeterlilik', 'soru'],
    context: 'Sorunun merkezinde kişisel tatmin ve bağımsızlık ihtiyacı var.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ps_pos1',
    card: 'Ten of Pentacles',
    position: 1,
    upright:
      'On Tılsım, sorunun merkezinde aile, miras, uzun vadeli istikrar veya kalıcı başarı olabilir.',
    reversed:
      'Ters On Tılsım, aile içi sorunlar, güvensizlik veya istikrarsızlık problemin kaynağı olabilir.',
    keywords: ['istikrar', 'aile', 'miras', 'başarı', 'soru'],
    context:
      'Sorunun merkezinde kalıcı bir güvenlik ve ailevi istikrar isteği var.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ps_pos1',
    card: 'Page of Pentacles',
    position: 1,
    upright:
      'Tılsım Prensi, sorunun merkezinde öğrenme isteği, fırsat arayışı veya yeni bir başlangıç olabilir.',
    reversed:
      'Ters Tılsım Prensi, dikkatsizlik, motivasyon kaybı veya yanlış yönelim problemin kaynağı olabilir.',
    keywords: ['öğrenme', 'fırsat', 'başlangıç', 'merak', 'soru'],
    context: 'Sorunun merkezinde yeni şeyler öğrenme ve keşfetme ihtiyacı var.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ps_pos1',
    card: 'Knight of Pentacles',
    position: 1,
    upright:
      'Tılsım Şövalyesi, sorunun merkezinde disiplin, sabır veya istikrarlı ilerleme ihtiyacı olabilir.',
    reversed:
      'Ters Tılsım Şövalyesi, tembellik, durağanlık veya motivasyon eksikliği problemin kaynağı olabilir.',
    keywords: ['istikrar', 'sabır', 'disiplin', 'çalışma', 'soru'],
    context: 'Sorunun merkezinde sabırla ve disiplinle ilerleme ihtiyacı var.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ps_pos1',
    card: 'Queen of Pentacles',
    position: 1,
    upright:
      'Tılsım Kraliçesi, sorunun merkezinde denge, üretkenlik veya kaynakları verimli kullanma olabilir.',
    reversed:
      'Ters Tılsım Kraliçesi, dağınıklık, öz bakım eksikliği veya kaynakların kötü yönetimi problemin kaynağı olabilir.',
    keywords: ['denge', 'üretkenlik', 'kaynak', 'pratiklik', 'soru'],
    context: 'Sorunun merkezinde üretkenlik ve dengeyi sağlama isteği var.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ps_pos1',
    card: 'King of Pentacles',
    position: 1,
    upright:
      'Tılsım Kralı, sorunun merkezinde güvenilirlik, liderlik veya maddi istikrar olabilir.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol, hırslı davranışlar veya mali dengesizlik problemin kaynağı olabilir.',
    keywords: ['liderlik', 'istikrar', 'güvence', 'kontrol', 'soru'],
    context: 'Sorunun merkezinde güçlü bir liderlik ve güvence arayışı var.',
    group: 'Tılsımlar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition1Meaning(
  card: TarotCard
): ProblemSolvingPosition1Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position1Meanings.find(
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
  meaning = position1Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition1MeaningByCardName(
  cardName: string
): ProblemSolvingPosition1Meaning | null {
  return position1Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllProblemSolvingPosition1Meanings(): ProblemSolvingPosition1Meaning[] {
  return position1Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getProblemSolvingPosition1MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): ProblemSolvingPosition1Meaning[] {
  return position1Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nPosition1Meanings = (): I18nProblemSolvingPosition1Meaning[] => {
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
): I18nProblemSolvingPosition1Meaning | null => {
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
    `problem-solving.meanings.${cardKey}.position1.upright`
  );
  const i18nReversed = t(
    `problem-solving.meanings.${cardKey}.position1.reversed`
  );
  const i18nKeywords = t(
    `problem-solving.meanings.${cardKey}.position1.keywords`
  );
  const i18nContext = t(
    `problem-solving.meanings.${cardKey}.position1.context`
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
const problemSolvingPosition1Exports = {
  position1Meanings,
  getProblemSolvingPosition1Meaning,
  getProblemSolvingPosition1MeaningByCardName,
  getAllProblemSolvingPosition1Meanings,
  getProblemSolvingPosition1MeaningsByGroup,
  getI18nPosition1Meaning,
};

export default problemSolvingPosition1Exports;
