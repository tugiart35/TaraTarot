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

export interface MoneyPosition6Meaning {
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
export interface I18nMoneyPosition6Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position6Meanings: MoneyPosition6Meaning[] = [
  // --- Majör Arkana Kartları ---//
  {
    id: 'the_fool_ma_pos6',
    card: 'The Fool',
    position: 6,
    upright:
      'Deli, yeni mali planlarda cesaret ve özgürlükle atılacak ilk adımı temsil eder. Risk almaya açıksınız ve farklı yollar deneme arzusu içindesiniz.',
    reversed:
      'Ters Deli, mali planlarda acelecilik ya da dikkatsizlikten doğan riskleri işaret eder. Plansızlık maddi kayıplara yol açabilir.',
    keywords: ['başlangıç', 'risk', 'özgürlük', 'cesaret', 'plan'],
    context:
      'Yeni mali planlarda cesaret ile dikkatsizlik arasında denge kurmalısınız.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos6',
    card: 'The Magician',
    position: 6,
    upright:
      'Büyücü, yeni mali planlarda beceri ve kaynakların etkin kullanılmasını gösterir. İletişim gücünüz ve yaratıcılığınızla başarı mümkün.',
    reversed:
      'Ters Büyücü, yeni mali planlarda yanlış yönlendirme, manipülasyon ya da boşa çıkan enerji riskini işaret eder.',
    keywords: ['beceri', 'yaratıcılık', 'kaynak', 'başarı', 'plan'],
    context: 'Yeni mali planlarda kaynakları doğru yönetmek başarı getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos6',
    card: 'The High Priestess',
    position: 6,
    upright:
      'Başrahibe, yeni mali planlarda sezgilerinize güvenmeniz gerektiğini söyler. Görünmeyen fırsatlar iç sesle fark edilebilir.',
    reversed:
      'Ters Başrahibe, mali planlarda sezgiyi bastırmak ya da belirsizlikte kaybolmayı işaret eder.',
    keywords: ['sezgi', 'bilgelik', 'görünmeyen', 'içsel rehberlik', 'plan'],
    context: 'Yeni mali planlarda sezgilerinize kulak vermek yol gösterecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos6',
    card: 'The Empress',
    position: 6,
    upright:
      'İmparatoriçe, yeni mali planlarda bolluk ve üretkenliği işaret eder. Yaratıcılıkla bereketli yatırımlar gündeme gelebilir.',
    reversed:
      'Ters İmparatoriçe, aşırı harcama, doyumsuzluk ya da üretkenliğin tıkanıklığını gösterebilir.',
    keywords: ['bolluk', 'yaratıcılık', 'üretkenlik', 'yatırım', 'plan'],
    context:
      'Yeni mali planlarda bereket enerjisi ve yaratıcılık ön plandadır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos6',
    card: 'The Emperor',
    position: 6,
    upright:
      'İmparator, yeni mali planlarda düzen, otorite ve sağlam yapı kurmayı işaret eder. Stratejik adımlar kalıcı sonuçlar getirir.',
    reversed:
      'Ters İmparator, mali planlarda katı kontrol ya da esneklik eksikliğinin başarısızlığa yol açabileceğini söyler.',
    keywords: ['düzen', 'otorite', 'planlama', 'istikrar', 'yapı'],
    context: 'Yeni mali planlarda disiplin ve stratejik yaklaşım gerekir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos6',
    card: 'The Hierophant',
    position: 6,
    upright:
      'Aziz, mali planlarda geleneksel yöntemleri, uzman tavsiyelerini ve güvenilir kurumlarla ilerlemeyi işaret eder.',
    reversed:
      'Ters Aziz, yeni mali planlarda kuralları sorgulamayı, geleneklere karşı çıkmayı ve daha özgün çözümler aramayı gösterir.',
    keywords: ['gelenek', 'kurumlar', 'tavsiye', 'disiplin', 'plan'],
    context:
      'Yeni mali planlarda geleneksel yöntem ya da özgün yollar öne çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos6',
    card: 'The Lovers',
    position: 6,
    upright:
      'Aşıklar, yeni mali planlarda ortaklık ve işbirliğiyle uyumlu kararları gösterir. Kararlar değerlerinizle uyumlu olmalı.',
    reversed:
      'Ters Aşıklar, mali planlarda kararsızlık, uyumsuz ortaklık ya da yanlış seçim riskini işaret eder.',
    keywords: ['ortaklık', 'karar', 'uyum', 'seçim', 'değerler'],
    context: 'Yeni mali planlarda doğru ortaklıklar başarıyı getirir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos6',
    card: 'The Chariot',
    position: 6,
    upright:
      'Savaş Arabası, mali planlarda kararlılık, odaklanma ve irade gücüyle hedefe ilerlemeyi işaret eder.',
    reversed:
      'Ters Savaş Arabası, mali planlarda yönsüzlük, acelecilik veya kontrol kaybını gösterebilir.',
    keywords: ['irade', 'kontrol', 'odak', 'başarı', 'plan'],
    context: 'Yeni mali planlarda net hedef ve kararlılık önemlidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos6',
    card: 'Strength',
    position: 6,
    upright:
      'Güç, yeni mali planlarda sabır, öz disiplin ve istikrarlı çabanın başarı getireceğini söyler.',
    reversed:
      'Ters Güç, mali planlarda sabırsızlık, öz güven eksikliği veya kontrolsüz harcama riskini gösterir.',
    keywords: ['sabır', 'özgüven', 'disiplin', 'istikrar', 'plan'],
    context: 'Yeni mali planlarda sabır ve öz disiplin belirleyici olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos6',
    card: 'The Hermit',
    position: 6,
    upright:
      'Ermiş, yeni mali planlarda içe dönük düşünme, araştırma ve yalnız başına strateji kurma ihtiyacını işaret eder.',
    reversed:
      'Ters Ermiş, mali planlarda aşırı izolasyon, yalnız karar alma ve rehberliği reddetmeyi gösterebilir.',
    keywords: ['araştırma', 'içe dönüş', 'bilgelik', 'rehberlik', 'plan'],
    context:
      'Yeni mali planlarda derin düşünme ve analiz yol gösterici olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos6',
    card: 'The Wheel of Fortune',
    position: 6,
    upright:
      'Kader Çarkı, mali planlarda beklenmedik fırsatlar, şans ve döngülerin desteğini işaret eder.',
    reversed:
      'Ters Kader Çarkı, mali planlarda aksilikler, tekrar eden hatalar veya kontrol dışı gecikmeler gösterebilir.',
    keywords: ['şans', 'fırsat', 'döngü', 'değişim', 'plan'],
    context: 'Yeni mali planlarda şans ve döngülerin etkisi güçlüdür.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos6',
    card: 'Justice',
    position: 6,
    upright:
      'Adalet, yeni mali planlarda şeffaflık, dürüstlük ve yasal düzenlemelere uygun hareket etmeyi işaret eder.',
    reversed:
      'Ters Adalet, mali planlarda adaletsizlik, eksik bilgi veya yasal sorun riskini işaret eder.',
    keywords: ['adalet', 'dürüstlük', 'yasa', 'denge', 'plan'],
    context: 'Yeni mali planlarda şeffaflık ve adil yaklaşım esastır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos6',
    card: 'The Hanged Man',
    position: 6,
    upright:
      'Asılan Adam, mali planlarda farklı bakış açıları, sabır ve geçici fedakarlığı işaret eder.',
    reversed:
      'Ters Asılan Adam, mali planlarda inatçılık, değişime direnç ya da fırsatları ertelemeyi gösterebilir.',
    keywords: ['sabır', 'farklı bakış', 'fedakarlık', 'bekleyiş', 'plan'],
    context: 'Yeni mali planlarda sabır ve farklı bakış açıları önemlidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos6',
    card: 'Death',
    position: 6,
    upright:
      'Ölüm, yeni mali planlarda eski yöntemleri bırakıp yeniyi inşa etme sürecini temsil eder.',
    reversed:
      'Ters Ölüm, mali planlarda değişime direnç, eski düzenlere sıkı sıkıya bağlı kalmayı gösterebilir.',
    keywords: ['dönüşüm', 'bitiş', 'yenilik', 'bırakma', 'plan'],
    context: 'Yeni mali planlarda eskiyi bırakmak yeniyi davet edecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos6',
    card: 'Temperance',
    position: 6,
    upright:
      'Denge, yeni mali planlarda ölçülülük, uyum ve sabırlı ilerlemeyi işaret eder.',
    reversed:
      'Ters Denge, mali planlarda aşırılıklar, sabırsızlık veya dengesiz yaklaşımı gösterebilir.',
    keywords: ['uyum', 'ölçü', 'denge', 'sabır', 'plan'],
    context: 'Yeni mali planlarda denge ve ölçülülük ön plandadır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos6',
    card: 'The Devil',
    position: 6,
    upright:
      'Şeytan, mali planlarda bağımlılık, aşırı risk ya da çıkar ilişkilerine dikkat çeker.',
    reversed:
      'Ters Şeytan, mali planlarda zincirleri kırma, bağımlılıklardan kurtulma ve özgürleşmeyi işaret eder.',
    keywords: ['bağımlılık', 'risk', 'özgürlük', 'çıkar', 'plan'],
    context: 'Yeni mali planlarda bağımlılıkları fark etmek önemlidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos6',
    card: 'The Tower',
    position: 6,
    upright:
      'Kule, mali planlarda ani değişim, beklenmedik kriz ya da yıkıcı dönüşümü işaret eder. Eski yapıların çökmesi yeni fırsat doğurabilir.',
    reversed:
      'Ters Kule, mali planlarda ertelenen krizler, bastırılmış sorunlar ya da küçük sarsıntılarla uyarı verir.',
    keywords: ['kriz', 'yıkım', 'dönüşüm', 'yeniden inşa', 'plan'],
    context: 'Yeni mali planlarda kriz sonrası yenilenme gündeme gelebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos6',
    card: 'The Star',
    position: 6,
    upright:
      'Yıldız, mali planlarda umut, yenilenme ve ilhamı temsil eder. Uzun vadeli hedeflerde ışık doğar.',
    reversed:
      'Ters Yıldız, mali planlarda umutsuzluk, ilham eksikliği ya da yanlış yönlere sapmayı gösterebilir.',
    keywords: ['umut', 'ilham', 'vizyon', 'yenilenme', 'plan'],
    context: 'Yeni mali planlarda umut ve vizyon rehberlik edecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos6',
    card: 'The Moon',
    position: 6,
    upright:
      'Ay, mali planlarda belirsizlik, yanılsama ve sezgilerin önemini işaret eder.',
    reversed:
      'Ters Ay, mali planlarda sisin dağılması, gizli bilgilerin açığa çıkması ve netleşmeyi temsil eder.',
    keywords: ['belirsizlik', 'sezgi', 'yanılsama', 'gizli bilgi', 'plan'],
    context: 'Yeni mali planlarda belirsizlik sezgiyle aşılabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos6',
    card: 'The Sun',
    position: 6,
    upright:
      'Güneş, mali planlarda başarı, netlik ve bolluk dönemini işaret eder. Olumlu enerji projeleri destekler.',
    reversed:
      'Ters Güneş, mali planlarda geçici hayal kırıklıkları, gecikmeler ya da abartılı iyimserlik riskini gösterebilir.',
    keywords: ['başarı', 'bolluk', 'netlik', 'iyimserlik', 'plan'],
    context: 'Yeni mali planlarda başarı ve netlik ön planda olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos6',
    card: 'Judgement',
    position: 6,
    upright:
      'Mahkeme, mali planlarda geçmişten ders çıkarıp yeni bir aşamaya geçişi işaret eder. Büyük kararlar gündeme gelebilir.',
    reversed:
      'Ters Mahkeme, mali planlarda geçmiş hatalara takılı kalma ya da yenilenmeyi reddetmeyi gösterir.',
    keywords: ['karar', 'yenilenme', 'hesaplaşma', 'ilerleme', 'plan'],
    context: 'Yeni mali planlarda geçmişten ders almak yenilenme getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos6',
    card: 'The World',
    position: 6,
    upright:
      'Dünya, mali planlarda tamamlanma, başarı ve yeni bir döngünün açılışını işaret eder.',
    reversed:
      'Ters Dünya, mali planlarda eksik kalma, yarım bırakma ya da tamamlanmamış projeleri gösterebilir.',
    keywords: ['tamamlanma', 'başarı', 'döngü', 'hedef', 'plan'],
    context: 'Yeni mali planlarda tamamlanma ve yeni bir döngü öne çıkacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'ace_of_cups_cu_pos6',
    card: 'Ace of Cups',
    position: 6,
    upright:
      'Kupa Ası, yeni mali planlarda duygusal tatmin ve içsel motivasyonun gücünü gösterir. Maddi kararlar kalpten gelen ilhamla desteklenir.',
    reversed:
      'Ters Kupa Ası, mali planlarda duygusal tıkanıklık ya da motivasyon eksikliğini işaret eder. Yeni fırsatlara kapalı kalabilirsiniz.',
    keywords: ['başlangıç', 'motivasyon', 'ilham', 'tatmin', 'akış'],
    context:
      'Yeni mali planlarda kalpten gelen motivasyon belirleyici olacaktır.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cu_pos6',
    card: 'Two of Cups',
    position: 6,
    upright:
      'İki Kupa, mali planlarda ortaklık ve iş birliğiyle kurulan dengeli birlikteliği işaret eder. Kararlar uyum içinde alınır.',
    reversed:
      'Ters İki Kupa, mali planlarda ortaklıkta dengesizlik ya da uyumsuzluk riskine dikkat çeker.',
    keywords: ['ortaklık', 'uyum', 'denge', 'paylaşım', 'ilişki'],
    context: 'Yeni mali planlarda ortaklık ve uyum önem taşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cu_pos6',
    card: 'Three of Cups',
    position: 6,
    upright:
      'Üç Kupa, mali planlarda destekleyici çevre, kutlama ve iş birliğinin gücünü gösterir. Ortak başarılar öne çıkar.',
    reversed:
      'Ters Üç Kupa, mali planlarda aşırı harcama ya da iş birliğinde yüzeysellik riskini işaret eder.',
    keywords: ['kutlama', 'işbirliği', 'destek', 'topluluk', 'başarı'],
    context: 'Yeni mali planlarda destekleyici çevre bereket getirir.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cu_pos6',
    card: 'Four of Cups',
    position: 6,
    upright:
      'Dört Kupa, mali planlarda mevcut fırsatları görmezden gelme eğilimini işaret eder. Yeniliklere açık olmak gerekir.',
    reversed:
      'Ters Dört Kupa, mali planlarda farkındalığın artması ve yeni fırsatların değerlendirilmesi sürecini gösterir.',
    keywords: ['farkındalık', 'tatminsizlik', 'yenilenme', 'dikkat', 'seçenek'],
    context: 'Yeni mali planlarda mevcut fırsatları fark etmek gerekir.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cu_pos6',
    card: 'Five of Cups',
    position: 6,
    upright:
      'Beş Kupa, mali planlarda geçmiş kayıpların gölgesinde hareket etmeyi işaret eder. Kalan imkanlara odaklanmak önemlidir.',
    reversed:
      'Ters Beş Kupa, mali planlarda toparlanma ve yeni bir başlangıç enerjisini temsil eder.',
    keywords: ['kayıp', 'odak', 'yenilenme', 'umut', 'şifa'],
    context: 'Yeni mali planlarda geçmişi bırakıp mevcut imkanlara yönelin.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cu_pos6',
    card: 'Six of Cups',
    position: 6,
    upright:
      'Altı Kupa, mali planlarda geçmiş deneyimlerden gelen fırsat ve yardımı gösterir. Geçmişten ders almak kazanç sağlar.',
    reversed:
      'Ters Altı Kupa, mali planlarda geçmişe aşırı bağlılık ve ilerleyememe riskine dikkat çeker.',
    keywords: ['geçmiş', 'yardım', 'fırsat', 'deneyim', 'şefkat'],
    context: 'Yeni mali planlarda geçmişin dersleri yol gösterecek.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cu_pos6',
    card: 'Seven of Cups',
    position: 6,
    upright:
      'Yedi Kupa, mali planlarda birçok seçenek ve hayalin bulunduğunu gösterir. Net hedef belirlemek önemlidir.',
    reversed:
      'Ters Yedi Kupa, mali planlarda gerçekçi seçimler yapma ve odaklanma sürecini işaret eder.',
    keywords: ['seçenek', 'hayal', 'hedef', 'netlik', 'vizyon'],
    context: 'Yeni mali planlarda net hedefler belirlemek gerekir.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cu_pos6',
    card: 'Eight of Cups',
    position: 6,
    upright:
      'Sekiz Kupa, mali planlarda eski alışkanlıklardan vazgeçip daha anlamlı hedeflere yönelmeyi işaret eder.',
    reversed:
      'Ters Sekiz Kupa, mali planlarda gitmekle kalmak arasında yaşanan kararsızlığı gösterir.',
    keywords: ['ayrılış', 'değişim', 'anlam', 'yeni yol', 'vizyon'],
    context: 'Yeni mali planlarda anlamlı hedeflere yönelmek gerekecek.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cu_pos6',
    card: 'Nine of Cups',
    position: 6,
    upright:
      'Dokuz Kupa, mali planlarda tatmin, başarı ve minnet duygusunu temsil eder. Mevcut kazançlar mutluluk verir.',
    reversed:
      'Ters Dokuz Kupa, mali planlarda doyumsuzluk ya da aşırı haz arayışını işaret eder.',
    keywords: ['tatmin', 'başarı', 'minnet', 'bolluk', 'doyum'],
    context: 'Yeni mali planlarda tatmin ve minnet duygusu ön plandadır.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cu_pos6',
    card: 'Ten of Cups',
    position: 6,
    upright:
      'On Kupa, mali planlarda ailevi uyum, huzur ve ortak mutluluğu işaret eder. Finansal güven duygusal refahı da destekler.',
    reversed:
      'Ters On Kupa, mali planlarda aile içinde anlaşmazlık ya da beklenti–gerçeklik farkını işaret eder.',
    keywords: ['uyum', 'aile', 'huzur', 'mutluluk', 'ortaklık'],
    context: 'Yeni mali planlarda ailevi uyum ve huzur öne çıkıyor.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cu_pos6',
    card: 'Page of Cups',
    position: 6,
    upright:
      'Kupa Prensi, mali planlarda yaratıcı fikirler, yeni fırsatlar ve ilhamı işaret eder.',
    reversed:
      'Ters Kupa Prensi, mali planlarda hayalcilik ya da tutarsızlık riskini gösterir.',
    keywords: ['yaratıcılık', 'ilham', 'fırsat', 'deneyim', 'yenilik'],
    context: 'Yeni mali planlarda yaratıcı çözümler ortaya çıkacak.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cu_pos6',
    card: 'Knight of Cups',
    position: 6,
    upright:
      'Kupa Şövalyesi, mali planlarda idealist yaklaşımlar ve vizyoner adımları temsil eder.',
    reversed:
      'Ters Kupa Şövalyesi, mali planlarda tutarsızlık, fazla romantikleştirme ya da hayal kırıklığına işaret eder.',
    keywords: ['vizyon', 'ideal', 'hareket', 'teklif', 'duygu'],
    context: 'Yeni mali planlarda vizyoner adımlar belirleyici olacak.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cu_pos6',
    card: 'Queen of Cups',
    position: 6,
    upright:
      'Kupa Kraliçesi, mali planlarda sezgi, empati ve güvenli duygusal rehberlik sağlar.',
    reversed:
      'Ters Kupa Kraliçesi, mali planlarda duygusal dengesizlik ya da aşırı hassasiyet riskini işaret eder.',
    keywords: ['sezgi', 'empati', 'rehberlik', 'denge', 'güven'],
    context: 'Yeni mali planlarda sezgisel rehberlik önemlidir.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cu_pos6',
    card: 'King of Cups',
    position: 6,
    upright:
      'Kupa Kralı, mali planlarda duygusal olgunluk, sakin liderlik ve bilgece yaklaşımı işaret eder.',
    reversed:
      'Ters Kupa Kralı, mali planlarda bastırılmış duyguların veya pasif agresif tavırların riski olabilir.',
    keywords: ['liderlik', 'olgunluk', 'denge', 'bilgelik', 'sorumluluk'],
    context: 'Yeni mali planlarda bilge ve sakin yaklaşım önemlidir.',
    group: 'Kupalar',
  },
  {
    id: 'ace_of_swords_sw_pos6',
    card: 'Ace of Swords',
    position: 6,
    upright:
      'Kılıç Ası, yeni mali planlarda netlik, doğru kararlar ve keskin bir başlangıcı gösterir. Gerçeklerle hareket etmek kazanç sağlar.',
    reversed:
      'Ters Kılıç Ası, mali planlarda kafa karışıklığı, yanlış bilgi veya aceleci kararların riskini işaret eder.',
    keywords: ['netlik', 'doğruluk', 'başlangıç', 'karar', 'gerçek'],
    context: 'Yeni mali planlarda net düşünce ve doğru bilgi önemlidir.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sw_pos6',
    card: 'Two of Swords',
    position: 6,
    upright:
      'İki Kılıç, mali planlarda ikilem, kararsızlık ve dengelenmesi gereken iki seçeneği işaret eder.',
    reversed:
      'Ters İki Kılıç, mali planlarda karar vermekten kaçınma veya kör noktaların fark edilmemesi anlamına gelir.',
    keywords: ['kararsızlık', 'denge', 'ikilem', 'seçim', 'çözüm'],
    context: 'Yeni mali planlarda kararsızlık ya da netleşme etkili olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sw_pos6',
    card: 'Three of Swords',
    position: 6,
    upright:
      'Üç Kılıç, mali planlarda hayal kırıklığı, kayıp ya da acı verici bir karar anlamına gelir.',
    reversed:
      'Ters Üç Kılıç, mali planlarda iyileşme, toparlanma ve geçmiş kayıpların telafisini işaret eder.',
    keywords: ['hayal kırıklığı', 'kayıp', 'karar', 'iyileşme', 'toparlanma'],
    context:
      'Yeni mali planlarda hayal kırıklığı ya da toparlanma görülebilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sw_pos6',
    card: 'Four of Swords',
    position: 6,
    upright:
      'Dört Kılıç, mali planlarda dinlenme, düşünme ve mola vererek strateji oluşturmayı işaret eder.',
    reversed:
      'Ters Dört Kılıç, mali planlarda tükenmişlik, yeterince dinlenememe veya yanlış stratejiyi gösterir.',
    keywords: ['dinlenme', 'strateji', 'mola', 'hazırlık', 'denge'],
    context: 'Yeni mali planlarda dinlenme ve düşünme önemli olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sw_pos6',
    card: 'Five of Swords',
    position: 6,
    upright:
      'Beş Kılıç, mali planlarda anlaşmazlık, ego çatışması veya kayıplı bir kazancı işaret eder.',
    reversed:
      'Ters Beş Kılıç, mali planlarda barışma, uzlaşma ve çatışmaların çözülmesi anlamına gelir.',
    keywords: ['çatışma', 'ego', 'kaynak', 'uzlaşma', 'denge'],
    context: 'Yeni mali planlarda anlaşmazlık ya da çözüm süreci yaşanabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sw_pos6',
    card: 'Six of Swords',
    position: 6,
    upright:
      'Altı Kılıç, mali planlarda sakinleşme, zorluklardan uzaklaşma ve güvenli bir geçişi gösterir.',
    reversed:
      'Ters Altı Kılıç, mali planlarda geçmişe takılı kalma veya ileriye gidememe riskini işaret eder.',
    keywords: ['geçiş', 'sükunet', 'güven', 'yolculuk', 'çözüm'],
    context: 'Yeni mali planlarda geçiş ve sakinleşme öne çıkıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sw_pos6',
    card: 'Seven of Swords',
    position: 6,
    upright:
      'Yedi Kılıç, mali planlarda strateji, dikkat ve görünmez planlarla ilerlemeyi işaret eder.',
    reversed:
      'Ters Yedi Kılıç, mali planlarda aldatma, yarım gerçekler ya da gizli konuların açığa çıkmasını gösterir.',
    keywords: ['strateji', 'gizlilik', 'taktik', 'gerçek', 'açığa çıkma'],
    context: 'Yeni mali planlarda strateji ya da gizlilik belirleyici olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sw_pos6',
    card: 'Eight of Swords',
    position: 6,
    upright:
      'Sekiz Kılıç, mali planlarda zihinsel kısıtlamalar, korkular ve hareketsizlik duygusunu işaret eder.',
    reversed:
      'Ters Sekiz Kılıç, mali planlarda özgürleşme, kısıtlamaları aşma ve yeni bir vizyon kazanmayı gösterir.',
    keywords: ['kısıt', 'korku', 'özgürlük', 'vizyon', 'karar'],
    context: 'Yeni mali planlarda zihinsel kısıt ya da özgürleşme etkili olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sw_pos6',
    card: 'Nine of Swords',
    position: 6,
    upright:
      'Dokuz Kılıç, mali planlarda kaygı, stres ve gelecekle ilgili yoğun endişeyi işaret eder.',
    reversed:
      'Ters Dokuz Kılıç, mali planlarda toparlanma, kaygıların azalması ve umut ışığının belirmesini gösterir.',
    keywords: ['kaygı', 'endişe', 'stres', 'toparlanma', 'umut'],
    context: 'Yeni mali planlarda kaygı ya da rahatlama belirleyici olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sw_pos6',
    card: 'Ten of Swords',
    position: 6,
    upright:
      'On Kılıç, mali planlarda zor bir dönemin bitişini, kapanışı ve yeniden doğuşu işaret eder.',
    reversed:
      'Ters On Kılıç, mali planlarda toparlanma, yeniden inşa süreci ve iyileşme enerjisini gösterir.',
    keywords: ['bitiş', 'yeniden doğuş', 'kapanış', 'iyileşme', 'çözüm'],
    context:
      'Yeni mali planlarda bir bitiş ya da yeniden inşa süreci etkili olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sw_pos6',
    card: 'Page of Swords',
    position: 6,
    upright:
      'Kılıç Prensi, mali planlarda merak, öğrenme ve dikkatli gözlem enerjisini gösterir.',
    reversed:
      'Ters Kılıç Prensi, mali planlarda yanlış bilgi, dedikodu veya aceleci yargıları işaret eder.',
    keywords: ['merak', 'öğrenme', 'dikkat', 'gözlem', 'bilgi'],
    context: 'Yeni mali planlarda merak ya da yanlış bilgi öne çıkabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sw_pos6',
    card: 'Knight of Swords',
    position: 6,
    upright:
      'Kılıç Şövalyesi, mali planlarda hızlı hareket, kararlılık ve cesur girişimleri işaret eder.',
    reversed:
      'Ters Kılıç Şövalyesi, mali planlarda acelecilik, sabırsızlık ya da yanlış yönelim riskine dikkat çeker.',
    keywords: ['hız', 'kararlılık', 'cesaret', 'acele', 'risk'],
    context: 'Yeni mali planlarda hız ya da acelecilik belirleyici olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sw_pos6',
    card: 'Queen of Swords',
    position: 6,
    upright:
      'Kılıç Kraliçesi, mali planlarda objektiflik, analitik bakış ve net kararların gücünü işaret eder.',
    reversed:
      'Ters Kılıç Kraliçesi, mali planlarda aşırı eleştiri, soğukluk veya iletişim eksikliğini işaret eder.',
    keywords: ['analiz', 'netlik', 'karar', 'akıl', 'denge'],
    context:
      'Yeni mali planlarda objektiflik ya da aşırı eleştiri etkili olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sw_pos6',
    card: 'King of Swords',
    position: 6,
    upright:
      'Kılıç Kralı, mali planlarda stratejik akıl, otorite ve disiplinli kararları gösterir.',
    reversed:
      'Ters Kılıç Kralı, mali planlarda katılık, soğukluk ya da manipülasyon riskini işaret eder.',
    keywords: ['strateji', 'otorite', 'akıl', 'disiplin', 'karar'],
    context:
      'Yeni mali planlarda disiplinli strateji ya da katı tutum öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'ace_of_pentacles_pt_pos6',
    card: 'Ace of Pentacles',
    position: 6,
    upright:
      'Tılsım Ası, mali planlarda yeni bir fırsat, sağlam başlangıç ve bereketli bir yatırım kapısını işaret eder.',
    reversed:
      'Ters Tılsım Ası, kaçırılan fırsatlar, yanlış yatırımlar veya istikrarsız planların uyarısını verir.',
    keywords: ['fırsat', 'başlangıç', 'yatırım', 'istikrar', 'bereket'],
    context:
      'Yeni mali planlarda sağlam başlangıç veya fırsat kaçırma gündemde.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pt_pos6',
    card: 'Two of Pentacles',
    position: 6,
    upright:
      'İki Tılsım, mali planlarda denge, çoklu gelir kaynaklarını yönetme ve esnekliğin önemini gösterir.',
    reversed:
      'Ters İki Tılsım, dağınıklık, mali dengesizlik veya aşırı yüklenmeyi işaret eder.',
    keywords: ['denge', 'çoklu kaynak', 'esneklik', 'yönetim', 'uyum'],
    context:
      'Yeni mali planlarda denge kurmak ya da dağınıklığı toparlamak gerekebilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pt_pos6',
    card: 'Three of Pentacles',
    position: 6,
    upright:
      'Üç Tılsım, mali planlarda işbirliği, takım çalışması ve ortak yatırımların değerini gösterir.',
    reversed:
      'Ters Üç Tılsım, uyumsuzluk, işbirliği eksikliği veya ortak projelerde sorunları işaret eder.',
    keywords: ['işbirliği', 'takım', 'yatırım', 'ortaklık', 'uyum'],
    context: 'Yeni mali planlarda işbirliği ya da uyumsuzluk öne çıkacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pt_pos6',
    card: 'Four of Pentacles',
    position: 6,
    upright:
      'Dört Tılsım, mali planlarda güvenlik arayışı, birikim yapma ve kaynakları koruma ihtiyacını işaret eder.',
    reversed:
      'Ters Dört Tılsım, aşırı tutuculuk, cimrilik ya da kontrol kaybını gösterir.',
    keywords: ['güvenlik', 'birikim', 'koruma', 'kontrol', 'tasarruf'],
    context:
      'Yeni mali planlarda güvenlik ya da aşırı tutuculuk etkili olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pt_pos6',
    card: 'Five of Pentacles',
    position: 6,
    upright:
      'Beş Tılsım, mali planlarda kayıp, yokluk ya da finansal sıkıntıları işaret eder.',
    reversed:
      'Ters Beş Tılsım, toparlanma, destek bulma ve mali iyileşmeye gidişi gösterir.',
    keywords: ['kayıp', 'sıkıntı', 'destek', 'toparlanma', 'iyileşme'],
    context: 'Yeni mali planlarda kayıp ya da toparlanma öne çıkıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pt_pos6',
    card: 'Six of Pentacles',
    position: 6,
    upright:
      'Altı Tılsım, mali planlarda adil paylaşım, destek alma-verme ve yardımlaşmayı işaret eder.',
    reversed:
      'Ters Altı Tılsım, dengesiz yardım, karşılıksız kalma ya da çıkar ilişkisini işaret eder.',
    keywords: ['paylaşım', 'yardım', 'denge', 'destek', 'adalet'],
    context:
      'Yeni mali planlarda adil paylaşım ya da dengesizlik gündeme gelir.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pt_pos6',
    card: 'Seven of Pentacles',
    position: 6,
    upright:
      'Yedi Tılsım, mali planlarda sabır, değerlendirme ve uzun vadeli yatırım vizyonunu gösterir.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık, yanlış yatırım veya zaman kaybını işaret eder.',
    keywords: ['sabır', 'yatırım', 'uzun vade', 'değerlendirme', 'vizyon'],
    context: 'Yeni mali planlarda sabır ya da sabırsızlık etkili olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pt_pos6',
    card: 'Eight of Pentacles',
    position: 6,
    upright:
      'Sekiz Tılsım, mali planlarda disiplin, çalışma, ustalaşma ve düzenli kazançları gösterir.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik, motivasyon kaybı veya düşük kaliteyi işaret eder.',
    keywords: ['disiplin', 'çalışma', 'ustalık', 'kazanç', 'düzen'],
    context:
      'Yeni mali planlarda disiplin ya da özensizlik belirleyici olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pt_pos6',
    card: 'Nine of Pentacles',
    position: 6,
    upright:
      'Dokuz Tılsım, mali planlarda bağımsızlık, özgüven ve finansal refahı gösterir.',
    reversed:
      'Ters Dokuz Tılsım, aşırı bağımlılık, savurganlık veya rahatlığın kaybını işaret eder.',
    keywords: ['özgüven', 'refah', 'bağımsızlık', 'rahatlık', 'öz değer'],
    context: 'Yeni mali planlarda bağımsızlık ya da bağımlılık öne çıkacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pt_pos6',
    card: 'Ten of Pentacles',
    position: 6,
    upright:
      'On Tılsım, mali planlarda kalıcı zenginlik, aile mirası ve uzun vadeli güvenliği işaret eder.',
    reversed:
      'Ters On Tılsım, maddi huzursuzluk, aile içi çatışma veya mali düzensizliği gösterir.',
    keywords: ['zenginlik', 'güvenlik', 'miras', 'istikrar', 'aile'],
    context:
      'Yeni mali planlarda kalıcı güvenlik ya da düzensizlik gündeme gelir.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pt_pos6',
    card: 'Page of Pentacles',
    position: 6,
    upright:
      'Tılsım Prensi, mali planlarda öğrenme, yeni fırsatlar ve başlangıç vizyonunu gösterir.',
    reversed:
      'Ters Tılsım Prensi, dağınıklık, erteleme veya yanlış odaklanmayı işaret eder.',
    keywords: ['öğrenme', 'başlangıç', 'fırsat', 'vizyon', 'deneyim'],
    context: 'Yeni mali planlarda öğrenme ya da dağınıklık etkili olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pt_pos6',
    card: 'Knight of Pentacles',
    position: 6,
    upright:
      'Tılsım Şövalyesi, mali planlarda disiplinli çalışma, sabır ve güvenilir adımları işaret eder.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık, sıkıcılık veya aşırı yavaş ilerlemeyi işaret eder.',
    keywords: ['disiplin', 'güven', 'sabır', 'istikrar', 'çalışma'],
    context: 'Yeni mali planlarda güvenilirlik ya da durağanlık öne çıkacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pt_pos6',
    card: 'Queen of Pentacles',
    position: 6,
    upright:
      'Tılsım Kraliçesi, mali planlarda şefkatli yönetim, pratik çözümler ve kaynakları dengeli kullanmayı gösterir.',
    reversed:
      'Ters Tılsım Kraliçesi, öz bakım eksikliği, dengesizlik veya aşırı yüklenmeye işaret eder.',
    keywords: ['pratiklik', 'denge', 'öz bakım', 'yönetim', 'kaynak'],
    context:
      'Yeni mali planlarda denge ya da öz bakım eksikliği belirleyici olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pt_pos6',
    card: 'King of Pentacles',
    position: 6,
    upright:
      'Tılsım Kralı, mali planlarda stratejik vizyon, zenginlik ve güçlü liderliği işaret eder.',
    reversed:
      'Ters Tılsım Kralı, açgözlülük, aşırı kontrol ya da maddi odaklı sorunları işaret eder.',
    keywords: ['liderlik', 'vizyon', 'zenginlik', 'kontrol', 'güç'],
    context: 'Yeni mali planlarda liderlik ya da aşırı kontrol öne çıkacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'ace_of_wands_wa_pos6',
    card: 'Ace of Wands',
    position: 6,
    upright:
      'Değnek Ası, mali planlarda yeni bir girişim, ilham ve yaratıcılığın başlangıcını gösterir. Cesaretle atılan adım bereket getirir.',
    reversed:
      'Ters Değnek Ası, ertelenen fırsatlar, düşük motivasyon veya yanlış yönlendirilmiş enerjiyi işaret eder.',
    keywords: ['başlangıç', 'ilham', 'cesaret', 'girişim', 'yaratıcılık'],
    context:
      'Yeni mali planlarda yaratıcı başlangıçlar ya da ertelenmiş fırsatlar öne çıkacak.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_wa_pos6',
    card: 'Two of Wands',
    position: 6,
    upright:
      'İki Değnek, mali planlarda vizyon geliştirme, plan yapma ve ufku genişletme sürecini gösterir.',
    reversed:
      'Ters İki Değnek, karar verememe, korkular yüzünden küçülme veya fırsatları kaçırmayı işaret eder.',
    keywords: ['vizyon', 'plan', 'ufuk', 'karar', 'genişleme'],
    context:
      'Yeni mali planlarda vizyon veya karar verme eksikliği gündemde olacak.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_wa_pos6',
    card: 'Three of Wands',
    position: 6,
    upright:
      'Üç Değnek, mali planlarda genişleme, yeni işbirlikleri ve uzun vadeli kazanç fırsatlarını işaret eder.',
    reversed:
      'Ters Üç Değnek, gecikme, dar görüşlülük veya planlarda tıkanıklığı gösterir.',
    keywords: [
      'genişleme',
      'işbirliği',
      'uzun vade',
      'vizyon',
      'fırsat',
    ],
    context:
      'Yeni mali planlarda genişleme veya dar görüşlülük belirleyici olacak.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_wa_pos6',
    card: 'Four of Wands',
    position: 6,
    upright:
      'Dört Değnek, mali planlarda istikrar, ortak başarıların kutlanması ve sağlam temelleri işaret eder.',
    reversed:
      'Ters Dört Değnek, geçici düzensizlik, uyumsuzluk veya tamamlanmamış projeleri gösterir.',
    keywords: ['istikrar', 'kutlama', 'temel', 'uyum', 'başarı'],
    context:
      'Yeni mali planlarda sağlam temel veya uyumsuzluk gündeme gelebilir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_wa_pos6',
    card: 'Five of Wands',
    position: 6,
    upright:
      'Beş Değnek, mali planlarda rekabet, çıkar çatışmaları ve fikir ayrılıklarını işaret eder.',
    reversed:
      'Ters Beş Değnek, çatışmaların çözülmesi, yapıcı işbirliği veya uzlaşmayı gösterir.',
    keywords: ['rekabet', 'çatışma', 'fikir ayrılığı', 'uzlaşma', 'dinamizm'],
    context: 'Yeni mali planlarda rekabet ya da uzlaşma belirleyici olacak.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_wa_pos6',
    card: 'Six of Wands',
    position: 6,
    upright:
      'Altı Değnek, mali planlarda başarı, tanınma ve emeklerin karşılığını almayı işaret eder.',
    reversed:
      'Ters Altı Değnek, takdir görmeme, geçici başarı veya aşırı gururu işaret eder.',
    keywords: ['başarı', 'tanınma', 'emek', 'takdir', 'zafer'],
    context: 'Yeni mali planlarda başarı ya da takdir eksikliği öne çıkacak.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_wa_pos6',
    card: 'Seven of Wands',
    position: 6,
    upright:
      'Yedi Değnek, mali planlarda savunma, rekabet ortamında güçlü duruş ve haklarını korumayı gösterir.',
    reversed:
      'Ters Yedi Değnek, yorgunluk, direncin azalması veya pozisyon kaybını işaret eder.',
    keywords: ['savunma', 'rekabet', 'dayanıklılık', 'koruma', 'mücadele'],
    context: 'Yeni mali planlarda güçlü savunma veya yorgunluk etkili olacak.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_wa_pos6',
    card: 'Eight of Wands',
    position: 6,
    upright:
      'Sekiz Değnek, mali planlarda hız, fırsatların yakalanması ve hızlı ilerlemeyi işaret eder.',
    reversed:
      'Ters Sekiz Değnek, gecikme, yanlış iletişim veya engellenmiş akışı işaret eder.',
    keywords: ['hız', 'ilerleme', 'fırsat', 'iletişim', 'akış'],
    context:
      'Yeni mali planlarda hızlı ilerleme ya da gecikmeler gündemde olacak.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_wa_pos6',
    card: 'Nine of Wands',
    position: 6,
    upright:
      'Dokuz Değnek, mali planlarda dayanıklılık, direnç ve son aşamaya kadar mücadeleyi işaret eder.',
    reversed:
      'Ters Dokuz Değnek, tükenmişlik, fazladan yüklenme veya gereksiz savunmayı gösterir.',
    keywords: ['dayanıklılık', 'direnç', 'savunma', 'yük', 'kararlılık'],
    context:
      'Yeni mali planlarda dayanıklılık ya da tükenmişlik etkili olacak.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_wa_pos6',
    card: 'Ten of Wands',
    position: 6,
    upright:
      'On Değnek, mali planlarda ağır sorumluluk, yük ve tamamlanmaya yakın bir projeyi işaret eder.',
    reversed:
      'Ters On Değnek, aşırı yük, görevlerin bırakılması veya tükenmişliği işaret eder.',
    keywords: ['sorumluluk', 'yük', 'tamamlama', 'çaba', 'tükenmişlik'],
    context:
      'Yeni mali planlarda ağır yükler veya bırakma ihtiyacı öne çıkacak.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_wa_pos6',
    card: 'Page of Wands',
    position: 6,
    upright:
      'Değnek Prensi, mali planlarda keşif, heves ve yeni projelere adım atmayı işaret eder.',
    reversed:
      'Ters Değnek Prensi, dağınıklık, tutarsızlık veya çabuk sıkılmayı işaret eder.',
    keywords: ['keşif', 'heves', 'başlangıç', 'deneyim', 'heyecan'],
    context: 'Yeni mali planlarda keşif veya tutarsızlık etkili olacak.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_wa_pos6',
    card: 'Knight of Wands',
    position: 6,
    upright:
      'Değnek Şövalyesi, mali planlarda cesur girişimler, hız ve güçlü adımları işaret eder.',
    reversed:
      'Ters Değnek Şövalyesi, acelecilik, savrukluk veya yarım bırakmayı işaret eder.',
    keywords: ['cesaret', 'girişim', 'hız', 'atılım', 'enerji'],
    context:
      'Yeni mali planlarda cesur girişimler ya da acelecilik öne çıkacak.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_wa_pos6',
    card: 'Queen of Wands',
    position: 6,
    upright:
      'Değnek Kraliçesi, mali planlarda özgüven, karizma ve yaratıcı liderliği işaret eder.',
    reversed:
      'Ters Değnek Kraliçesi, güvensizlik, kıskançlık veya öz değer eksikliğini işaret eder.',
    keywords: ['özgüven', 'liderlik', 'karizma', 'ilham', 'yaratıcılık'],
    context: 'Yeni mali planlarda özgüven ya da güvensizlik gündeme gelecek.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_wa_pos6',
    card: 'King of Wands',
    position: 6,
    upright:
      'Değnek Kralı, mali planlarda stratejik vizyon, girişimcilik ve liderliği işaret eder.',
    reversed:
      'Ters Değnek Kralı, otoriter tavır, ego veya aşırı kontrolü işaret eder.',
    keywords: ['vizyon', 'liderlik', 'strateji', 'girişim', 'güç'],
    context: 'Yeni mali planlarda vizyon veya aşırı kontrol öne çıkacak.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyPosition6Meaning(
  card: TarotCard
): MoneyPosition6Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = Position6Meanings.find(
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
  meaning = Position6Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyPosition6MeaningByCardName(
  cardName: string
): MoneyPosition6Meaning | null {
  return Position6Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllMoneyPosition6Meanings(): MoneyPosition6Meaning[] {
  return Position6Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getMoneyPosition6MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MoneyPosition6Meaning[] {
  return Position6Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nPosition6Meanings = (): I18nMoneyPosition6Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return Position6Meanings.map(meaning => {
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
): I18nMoneyPosition6Meaning | null => {
  const originalMeaning = Position6Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`money.meanings.${cardKey}.Position6.upright`);
  const i18nReversed = t(`money.meanings.${cardKey}.Position6.reversed`);
  const i18nKeywords = t(`money.meanings.${cardKey}.Position6.keywords`);
  const i18nContext = t(`money.meanings.${cardKey}.Position6.context`);
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
const moneyPosition6Exports = {
  Position6Meanings,
  getMoneyPosition6Meaning,
  getMoneyPosition6MeaningByCardName,
  getAllMoneyPosition6Meanings,
  getMoneyPosition6MeaningsByGroup,
  getI18nPosition6Meaning,
};

export default moneyPosition6Exports;
