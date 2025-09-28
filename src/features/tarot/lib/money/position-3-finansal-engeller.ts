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

export interface Moneyposition3Meaning {
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
export interface I18nMoneyposition3Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position3Meanings: Moneyposition3Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ma_pos3',
    card: 'The Fool',
    position: 3,
    upright:
      'Deli, parayı özgürce ve plansızca harcama eğilimini gösterir. Bu tutum, heyecan verse de istikrarsızlık yaratabilir.',
    reversed:
      'Ters Deli, aşırı riskten kaçma veya dikkatsizce borçlanma kaygısını işaret eder. Para kullanımı bilinçsizleşir.',
    keywords: ['özgürlük', 'risk', 'dikkatsizlik', 'harcama', 'plansızlık'],
    context: 'Para kullanımında özgürlük ile sorumluluk dengesini hatırlatır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos3',
    card: 'The Magician',
    position: 3,
    upright:
      'Büyücü, kaynaklarını akıllıca kullanma ve fırsatları değerlendirme becerisini gösterir. Para, yaratım aracı olur.',
    reversed:
      'Ters Büyücü, manipülatif harcama ya da becerilerini küçümseme riskini işaret eder. Para güvensizlik yaratır.',
    keywords: ['yaratım', 'beceri', 'fırsat', 'para yönetimi', 'bilinç'],
    context: 'Parayı beceriyle yönlendirme ve bilinçli yatırım zamanı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos3',
    card: 'The High Priestess',
    position: 3,
    upright:
      'Başrahibe, para kullanımında sezgisel yaklaşımı ve ölçülü tutumu işaret eder. Sessiz planlama fayda getirir.',
    reversed:
      'Ters Başrahibe, gizlenmiş harcamalar veya şeffaf olmayan finansal kararları işaret eder.',
    keywords: ['sezgi', 'ölçü', 'giz', 'tasarruf', 'denge'],
    context: 'Para kullanımında şeffaflık ve ölçülülük önem kazanır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos3',
    card: 'The Empress',
    position: 3,
    upright:
      'İmparatoriçe, parayı bolluk yaratmak ve başkalarını desteklemek için kullanma eğilimini gösterir. Cömertlik öne çıkar.',
    reversed:
      'Ters İmparatoriçe, aşırı harcama veya duygusal alışveriş kaygısını işaret eder.',
    keywords: ['bolluk', 'cömertlik', 'destek', 'harcama', 'bereket'],
    context: 'Para kullanımı bolluğu paylaşma ve üretme yönünde olur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos3',
    card: 'The Emperor',
    position: 3,
    upright:
      'İmparator, parayı düzenli ve planlı kullanma eğilimini gösterir. Güvenli yapı inşa etmek için kaynakları yönetirsin.',
    reversed:
      'Ters İmparator, aşırı kontrol ya da katı harcama kurallarıyla güvenlik kaygısını işaret eder.',
    keywords: ['düzen', 'plan', 'kontrol', 'güvenlik', 'sistem'],
    context: 'Para kullanımında düzen ve yapı ön plana çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos3',
    card: 'The Hierophant',
    position: 3,
    upright:
      'Aziz, parayı geleneksel yöntemlerle yönetme eğilimini gösterir. Aile veya kurum desteği önemlidir.',
    reversed:
      'Ters Aziz, finansal bağımsızlık isteği veya geleneksel yöntemlerden sapma kaygısını işaret eder.',
    keywords: ['gelenek', 'destek', 'yöntem', 'güvenlik', 'kurum'],
    context: 'Para kullanımında geleneksel yollar ve öğretiler öne çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos3',
    card: 'The Lovers',
    position: 3,
    upright:
      'Aşıklar, parayı ortak kararlarla yönetme eğilimini gösterir. Uyumlu işbirliği kaynakları güçlendirir.',
    reversed:
      'Ters Aşıklar, mali konularda uyumsuzluk ya da kararsızlığı işaret eder.',
    keywords: ['uyum', 'karar', 'ortaklık', 'para', 'işbirliği'],
    context: 'Para kullanımı ortak seçimler ve uyumlu kararlarla şekillenir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos3',
    card: 'The Chariot',
    position: 3,
    upright:
      'Savaş Arabası, parayı hedef odaklı ve kararlı biçimde kullanmayı işaret eder. Odak, başarı getirir.',
    reversed:
      'Ters Savaş Arabası, savruk harcama veya yönsüz mali adımları işaret eder.',
    keywords: ['hedef', 'kararlılık', 'odak', 'para', 'ilerleme'],
    context: 'Para kullanımı odaklı ve kararlı bir şekilde olur.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos3',
    card: 'Strength',
    position: 3,
    upright:
      'Güç, parayı öz disiplinle yönetme eğilimini gösterir. İstekleri sabırla kontrol edersin.',
    reversed:
      'Ters Güç, para kullanımında aşırı özveri veya kontrol kaybı riskini işaret eder.',
    keywords: ['öz disiplin', 'sabır', 'kontrol', 'denge', 'para'],
    context: 'Para kullanımında sabır ve özdenetim öne çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos3',
    card: 'The Hermit',
    position: 3,
    upright:
      'Ermiş, parayı sade ve bilinçli bir şekilde kullanma eğilimini gösterir. Azla yetinmek huzur getirir.',
    reversed:
      'Ters Ermiş, aşırı izolasyon veya paradan uzaklaşma kaygısını işaret eder.',
    keywords: ['sadelik', 'bilinç', 'tasarruf', 'içe dönüş', 'para'],
    context: 'Para kullanımında sadeleşme ve bilinçli harcama ön planda.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos3',
    card: 'The Wheel of Fortune',
    position: 3,
    upright:
      'Kader Çarkı, para kullanımında döngüsel fırsat ve değişkenliği gösterir. Şansın açılması mümkündür.',
    reversed:
      'Ters Çark, beklenmeyen kayıplar ya da aynı hataların tekrarını işaret eder.',
    keywords: ['döngü', 'şans', 'değişim', 'fırsat', 'para'],
    context: 'Para kullanımında döngüler ve şanslı anlar önem kazanır.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos3',
    card: 'Justice',
    position: 3,
    upright:
      'Adalet, parayı dengeli ve adil biçimde kullanma eğilimini gösterir. Şeffaflık güven yaratır.',
    reversed:
      'Ters Adalet, finansal konularda adaletsizlik ya da gizlenmiş detayları işaret eder.',
    keywords: ['adalet', 'denge', 'şeffaflık', 'para', 'sorumluluk'],
    context: 'Para kullanımında adil ve dengeli yaklaşım gerekir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos3',
    card: 'The Hanged Man',
    position: 3,
    upright:
      'Asılan Adam, parayı farklı bir bakış açısıyla değerlendirme eğilimini gösterir. Sabırlı olmak kazandırır.',
    reversed:
      'Ters Asılan Adam, para kullanımında kurban bilinci ya da erteleme kaygısını işaret eder.',
    keywords: ['perspektif', 'sabır', 'bekleme', 'feda', 'para'],
    context: 'Para kullanımında sabırlı bekleyiş ve yeni bakış önemlidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos3',
    card: 'Death',
    position: 3,
    upright:
      'Ölüm, para kullanımında eski alışkanlıkların bırakılıp yeni düzen kurulmasını gösterir. Dönüşüm kazanç getirir.',
    reversed: 'Ters Ölüm, değişimden korkmak veya kayıp kaygısını işaret eder.',
    keywords: ['dönüşüm', 'bırakma', 'yenilenme', 'para', 'değişim'],
    context: 'Para kullanımında eski alışkanlıkların bırakılması gerekir.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos3',
    card: 'Temperance',
    position: 3,
    upright:
      'Denge, parayı ölçülü ve uyumlu bir şekilde kullanmayı gösterir. Aşırılıktan uzak durmak huzur getirir.',
    reversed:
      'Ters Denge, savurganlık ya da aşırı kısıtlama kaygısını işaret eder.',
    keywords: ['ölçü', 'denge', 'uyum', 'para', 'sabır'],
    context: 'Para kullanımında ölçülülük ve denge ön planda.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos3',
    card: 'The Devil',
    position: 3,
    upright:
      'Şeytan, parayı bağımlılık ya da aşırı tüketimle kullanma eğilimini gösterir. Kontrol zayıflayabilir.',
    reversed:
      'Ters Şeytan, finansal bağımlılıklardan kurtulma sürecini işaret eder.',
    keywords: ['bağımlılık', 'kontrol', 'aşırılık', 'para', 'özgürlük'],
    context: 'Para kullanımında bağımlılık ve özgürlük dengesine dikkat et.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos3',
    card: 'The Tower',
    position: 3,
    upright:
      'Kule, para kullanımında ani değişim ve beklenmedik harcamaları işaret eder. Yapılar yıkılabilir.',
    reversed:
      'Ters Kule, ertelenmiş kriz ya da küçük sarsıntıları işaret eder.',
    keywords: ['ani değişim', 'kriz', 'para', 'yıkım', 'yeniden inşa'],
    context: 'Para kullanımında beklenmedik gelişmeler dönüştürücü olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos3',
    card: 'The Star',
    position: 3,
    upright:
      'Yıldız, parayı umut ve yenilenme için kullanma eğilimini gösterir. Şeffaf hedefler huzur getirir.',
    reversed:
      'Ters Yıldız, finansal umutsuzluk ya da tükenmişliği işaret eder.',
    keywords: ['umut', 'yenilenme', 'hedef', 'para', 'şeffaflık'],
    context: 'Para kullanımında umut ve ilham verici hedefler öne çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos3',
    card: 'The Moon',
    position: 3,
    upright:
      'Ay, parayı belirsizlik ve sezgiyle yönetme eğilimini gösterir. Netlik eksik olabilir.',
    reversed: 'Ters Ay, gizli mali sorunların açığa çıkmasını işaret eder.',
    keywords: ['belirsizlik', 'sezgi', 'para', 'giz', 'yanılsama'],
    context: 'Para kullanımında belirsizlik ve sezgi bir aradadır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos3',
    card: 'The Sun',
    position: 3,
    upright:
      'Güneş, parayı neşe ve bollukla kullanma eğilimini gösterir. Açıklık güven yaratır.',
    reversed:
      'Ters Güneş, aşırı iyimserlik veya yanlış yatırım kaygısını işaret eder.',
    keywords: ['bolluk', 'açıklık', 'neşe', 'para', 'başarı'],
    context: 'Para kullanımında açıklık ve neşe hakim olur.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos3',
    card: 'Judgement',
    position: 3,
    upright:
      'Mahkeme, parayı bilinçli yüzleşme ve ders çıkararak kullanmayı işaret eder. Hesaplaşma kazandırır.',
    reversed:
      'Ters Mahkeme, geçmiş mali hatalardan kaçmayı veya aşırı öz eleştiriyi işaret eder.',
    keywords: ['hesaplaşma', 'ders', 'para', 'bilinç', 'yenilenme'],
    context: 'Para kullanımında geçmişten öğrenmek önemlidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos3',
    card: 'The World',
    position: 3,
    upright:
      'Dünya, parayı bütünsel başarı ve tamamlanma için kullanmayı işaret eder. Çevrimin kapanışı kazanç getirir.',
    reversed:
      'Ters Dünya, tamamlanmamış projeler veya eksik yatırımları işaret eder.',
    keywords: ['tamamlanma', 'başarı', 'bütünlük', 'para', 'istikrar'],
    context: 'Para kullanımında bütünsel başarı ve kalıcılık öne çıkar.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi --- //
  {
    id: 'ace_of_cups_cu_pos3',
    card: 'Ace of Cups',
    position: 3,
    upright:
      'Kupa Ası, parayı gönülden vermek ve paylaşmak isteğini gösterir. Cömertlik akış yaratır ama aşırısı savurganlığa dönüşebilir.',
    reversed:
      'Ters Kupa Ası, duygusal boşluğu doldurmak için yapılan harcamaları işaret eder. Para, sevgi yerine ikame edilir.',
    keywords: ['cömertlik', 'paylaşım', 'harcama', 'duygu', 'akış'],
    context: 'Para kullanımında kalbin duygusal ihtiyaçları etkili olur.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cu_pos3',
    card: 'Two of Cups',
    position: 3,
    upright:
      'İki Kupa, parayı ortaklaşa ve uyum içinde kullanma eğilimini gösterir. Birlikte yapılan seçimler güven getirir.',
    reversed:
      'Ters İki Kupa, mali uyumsuzluk veya eşitsizlik hissini işaret eder.',
    keywords: ['ortaklık', 'uyum', 'eşitlik', 'para', 'ilişki'],
    context: 'Para kullanımında uyumlu işbirliği öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cu_pos3',
    card: 'Three of Cups',
    position: 3,
    upright:
      'Üç Kupa, parayı eğlence, kutlama ve sosyal etkinliklerde kullanma eğilimini gösterir. Paylaşmak keyif getirir.',
    reversed:
      'Ters Üç Kupa, aşırı harcama veya sosyal baskı nedeniyle para kaybını işaret eder.',
    keywords: ['kutlama', 'paylaşım', 'sosyal', 'harcama', 'neşe'],
    context: 'Para kullanımında sosyallik ve paylaşım öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cu_pos3',
    card: 'Four of Cups',
    position: 3,
    upright:
      'Dört Kupa, paraya ilgisizlik veya fırsatları görmezden gelme eğilimini işaret eder. Maddi tatminsizlik yaşanabilir.',
    reversed:
      'Ters Dört Kupa, yeni fırsatları değerlendirme ve farklı para yollarına açılma sürecini gösterir.',
    keywords: ['tatminsizlik', 'ilgisizlik', 'fırsat', 'para', 'yeni yön'],
    context: 'Para kullanımında farkındalık eksikliği risk taşır.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cu_pos3',
    card: 'Five of Cups',
    position: 3,
    upright:
      'Beş Kupa, geçmiş kayıplara odaklanarak parayı umutsuzlukla kullanma eğilimini işaret eder. Fırsatlar kaçabilir.',
    reversed:
      'Ters Beş Kupa, finansal kayıplardan ders çıkarıp yeni bir yaklaşım geliştirmeyi gösterir.',
    keywords: ['kayıp', 'umutsuzluk', 'para', 'fırsat', 'yenilenme'],
    context: 'Para kullanımında geçmiş deneyimler etkili olur.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cu_pos3',
    card: 'Six of Cups',
    position: 3,
    upright:
      'Altı Kupa, parayı nostalji, aile veya geçmişe dayalı amaçlarda kullanma eğilimini işaret eder. Yardımlaşma öne çıkar.',
    reversed:
      'Ters Altı Kupa, geçmişin mali alışkanlıklarına takılı kalmayı veya çocukça harcamaları işaret eder.',
    keywords: ['aile', 'geçmiş', 'yardım', 'nostalji', 'para'],
    context: 'Para kullanımında geçmiş deneyim ve aile etkisi hissedilir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cu_pos3',
    card: 'Seven of Cups',
    position: 3,
    upright:
      'Yedi Kupa, hayali projelere para yatırma veya dağınık harcama eğilimini işaret eder. Net seçimler önemlidir.',
    reversed:
      'Ters Yedi Kupa, hayalden uyanarak gerçekçi finansal kararlar almayı gösterir.',
    keywords: ['hayal', 'seçim', 'para', 'gerçeklik', 'fırsat'],
    context: 'Para kullanımında hayalcilik risk ve netlik ihtiyacı vardır.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cu_pos3',
    card: 'Eight of Cups',
    position: 3,
    upright:
      'Sekiz Kupa, para kullanımında tatminsizlikten uzaklaşıp yeni yollar aramayı işaret eder. Maddi dönüşüm başlar.',
    reversed:
      'Ters Sekiz Kupa, eski harcama alışkanlıklarına geri dönme veya bırakmakta zorlanmayı gösterir.',
    keywords: ['tatminsizlik', 'yeni yön', 'para', 'kaçış', 'dönüşüm'],
    context: 'Para kullanımında yeni yollar arayışı öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cu_pos3',
    card: 'Nine of Cups',
    position: 3,
    upright:
      'Dokuz Kupa, parayı keyif ve kişisel tatmin için kullanma eğilimini gösterir. Lüks harcamalar öne çıkar.',
    reversed:
      'Ters Dokuz Kupa, aşırı tüketim veya doyumsuz harcama eğilimini işaret eder.',
    keywords: ['tatmin', 'lüks', 'keyif', 'para', 'zevk'],
    context: 'Para kullanımında kişisel keyifler belirleyici olur.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cu_pos3',
    card: 'Ten of Cups',
    position: 3,
    upright:
      'On Kupa, parayı aile refahı ve ortak mutluluk için kullanma eğilimini gösterir. Paylaşım mutluluk getirir.',
    reversed:
      'Ters On Kupa, mali konularda aile içi uyumsuzluk veya tatminsizlik riskini işaret eder.',
    keywords: ['aile', 'mutluluk', 'refah', 'paylaşım', 'para'],
    context: 'Para kullanımında aile refahı ve mutluluk ön plandadır.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cu_pos3',
    card: 'Page of Cups',
    position: 3,
    upright:
      'Kupa Prensi, parayı yaratıcı projeler veya yeni fikirler için kullanma eğilimini gösterir. Küçük adımlar bereket getirir.',
    reversed:
      'Ters Kupa Prensi, dikkatsiz ve hayalci harcama riskini işaret eder.',
    keywords: ['yaratıcılık', 'hayal', 'para', 'başlangıç', 'projeler'],
    context: 'Para kullanımında hayaller ve küçük girişimler öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cu_pos3',
    card: 'Knight of Cups',
    position: 3,
    upright:
      'Kupa Şövalyesi, parayı idealist amaçlarla ve gönülden yatırımlarla kullanma eğilimini gösterir.',
    reversed:
      'Ters Kupa Şövalyesi, gerçekçi olmayan mali adımlar veya ertelemeleri işaret eder.',
    keywords: ['idealizm', 'yatırım', 'hayal', 'para', 'amaç'],
    context: 'Para kullanımında idealist yönler baskın olur.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cu_pos3',
    card: 'Queen of Cups',
    position: 3,
    upright:
      'Kupa Kraliçesi, parayı sezgi ve duygusal güvenlik için kullanma eğilimini gösterir. Duygular harcamaları etkiler.',
    reversed:
      'Ters Kupa Kraliçesi, aşırı duygusal harcama veya bağımlılık riskini işaret eder.',
    keywords: ['sezgi', 'güvenlik', 'para', 'duygu', 'harcama'],
    context: 'Para kullanımında sezgi ve duygusal ihtiyaçlar etkilidir.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cu_pos3',
    card: 'King of Cups',
    position: 3,
    upright:
      'Kupa Kralı, parayı dengeli ve duygusal olgunlukla kullanma eğilimini gösterir. Sorumluluk duygusu öne çıkar.',
    reversed:
      'Ters Kupa Kralı, mali konularda duygusal manipülasyon veya istikrarsızlığı işaret eder.',
    keywords: ['denge', 'olgunluk', 'sorumluluk', 'para', 'güven'],
    context: 'Para kullanımında olgunluk ve denge önemlidir.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_sw_pos3',
    card: 'Ace of Swords',
    position: 3,
    upright:
      'Kılıç Ası, para kullanımında netlik ve keskin kararların alındığını gösterir. Rasyonel planlama başarı getirir.',
    reversed:
      'Ters Kılıç Ası, yanlış bilgilere dayalı kararlar veya mali kafa karışıklığını işaret eder.',
    keywords: ['netlik', 'karar', 'zihin', 'para', 'gerçek'],
    context: 'Para kullanımında keskin zihin ve doğru bilgi önemlidir.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sw_pos3',
    card: 'Two of Swords',
    position: 3,
    upright:
      'İki Kılıç, para harcarken kararsız kalma veya seçimden kaçınma eğilimini gösterir. Denge aranır.',
    reversed:
      'Ters İki Kılıç, ertelenen mali kararların krize yol açabileceğini işaret eder.',
    keywords: ['kararsızlık', 'denge', 'ikilem', 'karar', 'para'],
    context: 'Para kullanımında ikilem ve karar erteleme riski vardır.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sw_pos3',
    card: 'Three of Swords',
    position: 3,
    upright:
      'Üç Kılıç, para harcarken hayal kırıklıkları veya kayıpların etkisini işaret eder. Acı tecrübe ders olur.',
    reversed:
      'Ters Üç Kılıç, mali kayıpların ardından toparlanma ve onarım sürecini gösterir.',
    keywords: ['kayıp', 'hayal kırıklığı', 'para', 'acı', 'ders'],
    context: 'Para kullanımında geçmiş yaralar etkili olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sw_pos3',
    card: 'Four of Swords',
    position: 3,
    upright:
      'Dört Kılıç, para kullanımında mola verme veya harcamaları durdurma ihtiyacını gösterir. Tasarruf zamanı gelir.',
    reversed:
      'Ters Dört Kılıç, hareketsizlikten kaynaklı fırsatların kaçırıldığını işaret eder.',
    keywords: ['dinlenme', 'bekleme', 'tasarruf', 'mola', 'para'],
    context: 'Para kullanımında mola ve tasarruf öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sw_pos3',
    card: 'Five of Swords',
    position: 3,
    upright:
      'Beş Kılıç, para harcarken rekabet veya çıkar çatışmasını işaret eder. Kazanmak için mücadele öne çıkar.',
    reversed:
      'Ters Beş Kılıç, mali konularda anlaşmazlıkların çözülmesi veya kayıpların kabullenilmesini gösterir.',
    keywords: ['çatışma', 'rekabet', 'para', 'kaybetmek', 'mücadele'],
    context: 'Para kullanımında tartışma ve mücadele öne çıkabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sw_pos3',
    card: 'Six of Swords',
    position: 3,
    upright:
      'Altı Kılıç, para kullanımında sorunlardan uzaklaşma veya yeni bir mali planlamaya geçişi işaret eder.',
    reversed:
      'Ters Altı Kılıç, geçmiş mali alışkanlıkların geride bırakılmakta zorlanıldığını gösterir.',
    keywords: ['geçiş', 'plan', 'kaçış', 'para', 'yenilenme'],
    context: 'Para kullanımında geçiş ve iyileşme süreci vardır.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sw_pos3',
    card: 'Seven of Swords',
    position: 3,
    upright:
      'Yedi Kılıç, gizli harcamalar veya mali konularda stratejik davranmayı işaret eder. Şeffaflık eksikliği olabilir.',
    reversed:
      'Ters Yedi Kılıç, mali sırların açığa çıkması veya dürüstlüğün önem kazanmasını gösterir.',
    keywords: ['gizlilik', 'strateji', 'hile', 'para', 'risk'],
    context: 'Para kullanımında strateji ve gizlilik etkili olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sw_pos3',
    card: 'Eight of Swords',
    position: 3,
    upright:
      'Sekiz Kılıç, para kullanımında sıkışmışlık ve özgürce hareket edememe durumunu gösterir.',
    reversed:
      'Ters Sekiz Kılıç, mali kısıtlamalardan kurtulma veya özgürleşmeyi işaret eder.',
    keywords: ['sıkışma', 'kısıtlama', 'para', 'özgürlük', 'engel'],
    context: 'Para kullanımında kısıtlama hissi baskındır.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sw_pos3',
    card: 'Nine of Swords',
    position: 3,
    upright:
      'Dokuz Kılıç, mali endişeler, kaygılar ve uykusuz geceleri işaret eder. Kaygı yönetimi önemlidir.',
    reversed:
      'Ters Dokuz Kılıç, mali kaygılardan çıkış ve rahatlama sürecini gösterir.',
    keywords: ['kaygı', 'endişe', 'para', 'kabus', 'stres'],
    context: 'Para kullanımında kaygı ve stres öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sw_pos3',
    card: 'Ten of Swords',
    position: 3,
    upright:
      'On Kılıç, mali bir döngünün sonunu ve kayıpları işaret eder. Yeniden başlamak gerekebilir.',
    reversed:
      'Ters On Kılıç, toparlanma ve mali yeniden yapılanmayı işaret eder.',
    keywords: ['son', 'kayıp', 'yenilenme', 'para', 'bitiş'],
    context: 'Para kullanımında sonlanma ve yeniden doğuş öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sw_pos3',
    card: 'Page of Swords',
    position: 3,
    upright:
      'Kılıç Prensi, mali konularda merak ve araştırma eğilimini işaret eder. Harcama öncesi bilgi toplamak önemlidir.',
    reversed:
      'Ters Kılıç Prensi, dikkatsiz harcama veya yanlış bilgilere güvenmeyi işaret eder.',
    keywords: ['merak', 'araştırma', 'bilgi', 'para', 'öğrenme'],
    context: 'Para kullanımında araştırma ve bilgi toplama öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sw_pos3',
    card: 'Knight of Swords',
    position: 3,
    upright:
      'Kılıç Şövalyesi, ani ve hızlı harcama kararlarını işaret eder. Risk almak söz konusu olabilir.',
    reversed:
      'Ters Kılıç Şövalyesi, aceleci adımların finansal zarara yol açabileceğini gösterir.',
    keywords: ['hız', 'risk', 'para', 'ani karar', 'cesaret'],
    context: 'Para kullanımında aceleci kararlar öne çıkabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sw_pos3',
    card: 'Queen of Swords',
    position: 3,
    upright:
      'Kılıç Kraliçesi, mali konularda mantıklı, analitik ve bağımsız bir yaklaşımı işaret eder. Netlik ön plandadır.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştirel veya soğuk mali kararları işaret eder.',
    keywords: ['mantık', 'netlik', 'bağımsızlık', 'para', 'analiz'],
    context: 'Para kullanımında mantık ve analiz önemlidir.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sw_pos3',
    card: 'King of Swords',
    position: 3,
    upright:
      'Kılıç Kralı, mali konularda stratejik, adil ve disiplinli bir yaklaşımı işaret eder. Uzun vadeli planlama öne çıkar.',
    reversed:
      'Ters Kılıç Kralı, aşırı katı, baskıcı veya duygusuz mali kararları işaret eder.',
    keywords: ['strateji', 'adalet', 'disiplin', 'para', 'plan'],
    context: 'Para kullanımında disiplinli strateji önemlidir.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_wa_pos3',
    card: 'Ace of Wands',
    position: 3,
    upright:
      'Değnek Ası, para kullanımında yeni fikirlerin ve girişimlerin ortaya çıktığını gösterir. Yaratıcı projelere yatırım yapılabilir.',
    reversed:
      'Ters Değnek Ası, hevesle başlayan ama yarım kalan projelere kaynak harcandığını işaret eder.',
    keywords: ['yaratıcılık', 'başlangıç', 'girişim', 'heves', 'yatırım'],
    context: 'Para kullanımında yeni ve yaratıcı girişimler öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_wa_pos3',
    card: 'Two of Wands',
    position: 3,
    upright:
      'İki Değnek, para kullanımında gelecek planları ve ufuk genişletme arzusunu işaret eder. Yatırımlar stratejik yapılır.',
    reversed:
      'Ters İki Değnek, cesaret eksikliği nedeniyle fırsatların kaçırıldığını gösterir.',
    keywords: ['plan', 'ufuk', 'vizyon', 'cesaret', 'yatırım'],
    context: 'Para kullanımında gelecek vizyonu öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_wa_pos3',
    card: 'Three of Wands',
    position: 3,
    upright:
      'Üç Değnek, para kullanımında büyüme fırsatlarını ve işbirliklerini işaret eder. Ufuk açıcı yatırımlar öne çıkar.',
    reversed: 'Ters Üç Değnek, beklenen mali kazançların gecikmesini gösterir.',
    keywords: ['genişleme', 'işbirliği', 'vizyon', 'beklenti', 'yatırım'],
    context: 'Para kullanımında işbirliği ve genişleme öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_wa_pos3',
    card: 'Four of Wands',
    position: 3,
    upright:
      'Dört Değnek, para kullanımında kutlama, ev veya aile için yapılan harcamaları işaret eder. Güvenlik duygusu pekişir.',
    reversed:
      'Ters Dört Değnek, plansız harcamaların düzeni bozabileceğini gösterir.',
    keywords: ['kutlama', 'güvenlik', 'aile', 'ev', 'harcama'],
    context: 'Para kullanımında güvenlik ve kutlama temaları öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_wa_pos3',
    card: 'Five of Wands',
    position: 3,
    upright:
      'Beş Değnek, para kullanımında rekabet ve anlaşmazlıkları işaret eder. Ortak kaynaklarda sürtüşmeler olabilir.',
    reversed:
      'Ters Beş Değnek, mali tartışmaların çözülmeye başladığını gösterir.',
    keywords: ['rekabet', 'anlaşmazlık', 'para', 'çatışma', 'kaynak'],
    context: 'Para kullanımında rekabet ve çatışmalar öne çıkabilir.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_wa_pos3',
    card: 'Six of Wands',
    position: 3,
    upright:
      'Altı Değnek, para kullanımında başarı, görünürlük ve kazançları işaret eder. Harcamalar özgüvenle yapılır.',
    reversed:
      'Ters Altı Değnek, takdir görmeyen çabalar nedeniyle tatminsizlik yaratır.',
    keywords: ['başarı', 'takdir', 'kazanç', 'özgüven', 'para'],
    context: 'Para kullanımında başarı ve takdir öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_wa_pos3',
    card: 'Seven of Wands',
    position: 3,
    upright:
      'Yedi Değnek, para kullanımında savunmacı bir tavrı ve kaynakları koruma isteğini işaret eder.',
    reversed:
      'Ters Yedi Değnek, savunmasız kalma veya mali mücadelede zorluk yaşamayı gösterir.',
    keywords: ['savunma', 'koruma', 'mücadele', 'para', 'risk'],
    context: 'Para kullanımında koruma ve savunma öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_wa_pos3',
    card: 'Eight of Wands',
    position: 3,
    upright:
      'Sekiz Değnek, para kullanımında hızlı gelişmeler ve ani harcamaları işaret eder. Hızlı yatırımlar öne çıkabilir.',
    reversed:
      'Ters Sekiz Değnek, gecikmeler veya yanlış zamanlama nedeniyle kayıpları gösterir.',
    keywords: ['hız', 'yatırım', 'gelişme', 'harcama', 'fırsat'],
    context: 'Para kullanımında hızlı gelişmeler öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_wa_pos3',
    card: 'Nine of Wands',
    position: 3,
    upright:
      'Dokuz Değnek, para kullanımında tedbirli ve temkinli olmayı işaret eder. Önceden yaşanan kayıplar dikkatli olmaya yöneltir.',
    reversed:
      'Ters Dokuz Değnek, aşırı yorgunluk veya sürekli kaygı nedeniyle para kullanımında katılığa işaret eder.',
    keywords: ['tedbir', 'temkin', 'direnç', 'kaygı', 'para'],
    context: 'Para kullanımında dikkat ve temkin öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_wa_pos3',
    card: 'Ten of Wands',
    position: 3,
    upright:
      'On Değnek, para kullanımında aşırı sorumluluk ve yüklenmeyi işaret eder. Fazla mali yük baskı yaratabilir.',
    reversed:
      'Ters On Değnek, fazla sorumlulukları bırakma ve hafiflemenin başladığını gösterir.',
    keywords: ['sorumluluk', 'yük', 'para', 'baskı', 'dayanıklılık'],
    context: 'Para kullanımında yük ve sorumluluk öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_wa_pos3',
    card: 'Page of Wands',
    position: 3,
    upright:
      'Değnek Prensi, para kullanımında hevesli ve keşifçi bir yaklaşımı işaret eder. Yeni fırsatlar heyecanla değerlendirilir.',
    reversed:
      'Ters Değnek Prensi, dağınıklık veya istikrarsız mali kararları işaret eder.',
    keywords: ['heves', 'fırsat', 'keşif', 'para', 'başlangıç'],
    context: 'Para kullanımında heves ve keşif öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_wa_pos3',
    card: 'Knight of Wands',
    position: 3,
    upright:
      'Değnek Şövalyesi, para kullanımında cesur ve hızlı adımları işaret eder. Yatırımlar riskli ama heyecan verici olabilir.',
    reversed:
      'Ters Değnek Şövalyesi, savruk veya düşüncesiz mali kararları gösterir.',
    keywords: ['cesaret', 'hız', 'risk', 'para', 'hareket'],
    context: 'Para kullanımında cesaret ve hız öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_wa_pos3',
    card: 'Queen of Wands',
    position: 3,
    upright:
      'Değnek Kraliçesi, para kullanımında özgüven, karizma ve pratikliği işaret eder. Kaynaklar yaratıcı şekilde değerlendirilir.',
    reversed:
      'Ters Değnek Kraliçesi, aşırı harcama veya özdeğer sorunları yüzünden kaynak kaybını işaret eder.',
    keywords: ['özgüven', 'pratiklik', 'karizma', 'para', 'liderlik'],
    context: 'Para kullanımında özgüven ve yaratıcılık öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_wa_pos3',
    card: 'King of Wands',
    position: 3,
    upright:
      'Değnek Kralı, para kullanımında stratejik liderlik ve vizyonu işaret eder. Kaynaklar uzun vadeli projelere yönlendirilir.',
    reversed:
      'Ters Değnek Kralı, aşırı otoriter veya bencil mali kararları gösterir.',
    keywords: ['liderlik', 'vizyon', 'strateji', 'para', 'uzun vade'],
    context: 'Para kullanımında liderlik ve strateji öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'ace_of_pentacles_pe_pos3',
    card: 'Ace of Pentacles',
    position: 3,
    upright:
      'Tılsım Ası, para kullanımında yeni fırsatların ve sağlam başlangıçların işaretidir. Harcamalar somut yatırımlara dönüşebilir.',
    reversed:
      'Ters Tılsım Ası, fırsatları kaçırma veya maddi kaynakları yanlış yönlendirme kaygısını gösterir.',
    keywords: ['fırsat', 'başlangıç', 'yatırım', 'bolluk', 'güvenlik'],
    context: 'Para kullanımında yeni ve güvenilir başlangıçlar öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pe_pos3',
    card: 'Two of Pentacles',
    position: 3,
    upright:
      'İki Tılsım, para kullanımında esneklik ve dengeyi işaret eder. Gelir-gider yönetimi ustalıkla sürdürülür.',
    reversed:
      'Ters İki Tılsım, mali dengesizlik veya ertelemeler yüzünden zorlanmayı gösterir.',
    keywords: ['denge', 'esneklik', 'zaman', 'kaynak', 'uyum'],
    context: 'Para kullanımında denge ve çok yönlü yönetim önemlidir.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pe_pos3',
    card: 'Three of Pentacles',
    position: 3,
    upright:
      'Üç Tılsım, para kullanımında işbirliği ve ortak planlamayı işaret eder. Maddi kaynaklar ekip çalışmasıyla daha verimli olur.',
    reversed:
      'Ters Üç Tılsım, uyumsuzluk ve iletişim eksikliği nedeniyle kaynakların yanlış kullanılabileceğini gösterir.',
    keywords: ['işbirliği', 'plan', 'kaynak', 'ustalık', 'paylaşım'],
    context: 'Para kullanımında işbirliği ve koordinasyon öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pe_pos3',
    card: 'Four of Pentacles',
    position: 3,
    upright:
      'Dört Tılsım, para kullanımında tutuculuk ve elde olanı koruma eğilimini işaret eder. Kaybetme korkusu baskındır.',
    reversed:
      'Ters Dört Tılsım, aşırı cimrilik ya da savurganlık arasında sıkışmayı gösterir.',
    keywords: ['kontrol', 'koruma', 'tutuculuk', 'para', 'güvenlik'],
    context: 'Para kullanımında tutma ve salıverme arasında denge aranır.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pe_pos3',
    card: 'Five of Pentacles',
    position: 3,
    upright:
      'Beş Tılsım, para kullanımında kıtlık bilincini ve kayıp korkusunu işaret eder. Geçici zorluklar baskın olabilir.',
    reversed:
      'Ters Beş Tılsım, toparlanma ve destek bulma sürecini gösterir. Yeni kaynaklar belirebilir.',
    keywords: ['kıtlık', 'kayıp', 'kaygı', 'destek', 'para'],
    context: 'Para kullanımında kıtlık hissi baskın olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pe_pos3',
    card: 'Six of Pentacles',
    position: 3,
    upright:
      'Altı Tılsım, para kullanımında denge ve adil paylaşımı işaret eder. Vermek ve almak uyum içinde olur.',
    reversed:
      'Ters Altı Tılsım, koşullu yardımlar veya güç dengesizliklerini gösterir.',
    keywords: ['denge', 'paylaşım', 'yardım', 'adalet', 'kaynak'],
    context: 'Para kullanımında adil paylaşım öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pe_pos3',
    card: 'Seven of Pentacles',
    position: 3,
    upright:
      'Yedi Tılsım, para kullanımında sabır ve uzun vadeli planlamayı işaret eder. Emeklerin karşılığı zamanla gelir.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık veya yanlış yatırımların getirdiği kaygıları gösterir.',
    keywords: ['sabır', 'yatırım', 'bekleme', 'emek', 'plan'],
    context: 'Para kullanımında sabır ve uzun vadeli vizyon öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pe_pos3',
    card: 'Eight of Pentacles',
    position: 3,
    upright:
      'Sekiz Tılsım, para kullanımında disiplinli çalışma ve öğrenme yoluyla gelişimi işaret eder. Harcamalar eğitim ve ustalık içindir.',
    reversed:
      'Ters Sekiz Tılsım, dikkatsizlik veya özensiz mali planlama nedeniyle kayıpları gösterir.',
    keywords: ['disiplin', 'öğrenme', 'ustalık', 'emek', 'para'],
    context: 'Para kullanımında disiplin ve öğrenme öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pe_pos3',
    card: 'Nine of Pentacles',
    position: 3,
    upright:
      'Dokuz Tılsım, para kullanımında bağımsızlık ve kişisel refahı işaret eder. Harcamalar kişisel zevk ve konfor için olabilir.',
    reversed:
      'Ters Dokuz Tılsım, aşırı bağımlılık veya savurganlık yüzünden bağımsızlığın kaybolmasını gösterir.',
    keywords: ['bağımsızlık', 'refah', 'konfor', 'özgürlük', 'para'],
    context: 'Para kullanımında kişisel bağımsızlık öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pe_pos3',
    card: 'Ten of Pentacles',
    position: 3,
    upright:
      'On Tılsım, para kullanımında aile, miras ve uzun vadeli güvenceyi işaret eder. Harcamalar kalıcı değerlere yöneliktir.',
    reversed:
      'Ters On Tılsım, aile içi mali anlaşmazlıklar veya miras sorunlarını gösterebilir.',
    keywords: ['aile', 'miras', 'güvence', 'uzun vade', 'para'],
    context: 'Para kullanımında aile ve uzun vadeli güvence öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pe_pos3',
    card: 'Page of Pentacles',
    position: 3,
    upright:
      'Tılsım Prensi, para kullanımında öğrenme isteğini ve küçük fırsatların değerlendirilmesini işaret eder.',
    reversed:
      'Ters Tılsım Prensi, dikkatsiz harcamalar veya hedeflerin net olmaması yüzünden kaynak kaybını gösterir.',
    keywords: ['öğrenme', 'fırsat', 'hedef', 'başlangıç', 'para'],
    context: 'Para kullanımında öğrenme ve küçük fırsatlar öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pe_pos3',
    card: 'Knight of Pentacles',
    position: 3,
    upright:
      'Tılsım Şövalyesi, para kullanımında istikrarlı, dikkatli ve planlı harcamaları işaret eder.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık veya aşırı temkinlilik nedeniyle fırsatların kaçmasını gösterir.',
    keywords: ['istikrar', 'plan', 'dikkat', 'para', 'çalışma'],
    context: 'Para kullanımında istikrar ve dikkat öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pe_pos3',
    card: 'Queen of Pentacles',
    position: 3,
    upright:
      'Tılsım Kraliçesi, para kullanımında cömertlik, güvenlik ve pratikliği işaret eder. Kaynaklar dengeli kullanılır.',
    reversed:
      'Ters Tılsım Kraliçesi, öz-bakımı ihmal etme veya aşırı yüklenme yüzünden mali sıkıntıları gösterir.',
    keywords: ['cömertlik', 'pratiklik', 'kaynak', 'öz bakım', 'para'],
    context: 'Para kullanımında cömertlik ve pratiklik öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pe_pos3',
    card: 'King of Pentacles',
    position: 3,
    upright:
      'Tılsım Kralı, para kullanımında sağlamlık, disiplin ve liderliği işaret eder. Kaynaklar stratejik yönetilir.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol veya statüye bağlılık yüzünden kaygıları işaret eder.',
    keywords: ['liderlik', 'disiplin', 'güvenlik', 'strateji', 'para'],
    context: 'Para kullanımında liderlik ve güvenlik öne çıkar.',
    group: 'Tılsımlar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyposition3Meaning(
  card: TarotCard
): Moneyposition3Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position3Meanings.find(
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
  meaning = position3Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyposition3MeaningByCardName(
  cardName: string
): Moneyposition3Meaning | null {
  return position3Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllMoneyposition3Meanings(): Moneyposition3Meaning[] {
  return position3Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getMoneyposition3MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): Moneyposition3Meaning[] {
  return position3Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition3Meanings = (): I18nMoneyposition3Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position3Meanings.map(meaning => {
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
export const getI18nposition3Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nMoneyposition3Meaning | null => {
  const originalMeaning = position3Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`money.meanings.${cardKey}.position3.upright`);
  const i18nReversed = t(`money.meanings.${cardKey}.position3.reversed`);
  const i18nKeywords = t(`money.meanings.${cardKey}.position3.keywords`);
  const i18nContext = t(`money.meanings.${cardKey}.position3.context`);
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
const moneyposition3Exports = {
  position3Meanings,
  getMoneyposition3Meaning,
  getMoneyposition3MeaningByCardName,
  getAllMoneyposition3Meanings,
  getMoneyposition3MeaningsByGroup,
  getI18nposition3Meaning,
};

export default moneyposition3Exports;
