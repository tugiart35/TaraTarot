// Bu dosya, Aşk açılımında Pozisyon 4 (Uzun Vadeli Sonuç) için özel kart anlamlarını içerir.
// Her kartın bu pozisyonda ne anlama geldiği tanımlanmıştır.
// i18n desteği için güncellenmiştir.

// import { useLoveTranslations } from './i18n-helper';

export interface CareerPositionMeaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar';
}

// i18n destekli LovePositionMeaning interface'i
export interface I18nCareerPositionMeaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position7Meanings: CareerPositionMeaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_pos7',
    card: 'The Fool',
    position: 7,
    upright:
      'Joker, kariyer yolculuğunun sonucunun özgürlük ve yeni başlangıçlarla şekilleneceğini gösterir. Geleceğin sana heyecan verici fırsatlar sunacak.',
    reversed:
      'Ters Joker, dikkatsizlik veya plansızlık nedeniyle fırsatların tam değerlendirilememesi sonucunu gösterebilir.',
    keywords: ['yeni başlangıç', 'özgürlük', 'macera', 'risk', 'gelecek'],
    context:
      'Kariyer yolculuğunun sonucu yeni bir sayfa açmak ve özgürlüğünü keşfetmek olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_pos7',
    card: 'The Magician',
    position: 7,
    upright:
      'Büyücü, kariyer yolculuğunun sonucunun becerilerini ustalıkla kullanarak başarıya ulaşmak olacağını gösterir.',
    reversed:
      'Ters Büyücü, potansiyelini tam kullanmadığında sonuç, eksik ya da yanıltıcı olabilir.',
    keywords: ['potansiyel', 'başarı', 'yaratıcılık', 'beceri', 'gelecek'],
    context:
      'Sonuç, yaratıcılığını ve becerilerini ortaya koyarak kariyerinde güçlü bir konuma ulaşmak olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_pos7',
    card: 'The High Priestess',
    position: 7,
    upright:
      'Başrahibe, kariyer yolculuğunun sonucunun içsel bilgelik ve derin sezgiyle şekilleneceğini gösterir.',
    reversed:
      'Ters Başrahibe, sezgini bastırdığında sonuç belirsizlik ve içsel tatminsizlik olabilir.',
    keywords: ['sezgi', 'bilgelik', 'derinlik', 'farkındalık', 'gelecek'],
    context:
      'Kariyer yolculuğunun sonucu sezgilerini rehber edinerek bilinçli adımlar atmak olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_pos7',
    card: 'The Empress',
    position: 7,
    upright:
      'İmparatoriçe, kariyer yolculuğunun sonucunun yaratıcılık, üretkenlik ve bereketle dolu olacağını gösterir.',
    reversed:
      'Ters İmparatoriçe, ilham eksikliği veya üretkenliğin kısıtlanması sonucunu getirebilir.',
    keywords: ['yaratıcılık', 'bereket', 'üretkenlik', 'ilham', 'gelecek'],
    context:
      'Kariyer yolculuğunun sonucu yaratıcı ve üretken bir döneme girmek olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_pos7',
    card: 'The Emperor',
    position: 7,
    upright:
      'İmparator, kariyer yolculuğunun sonucunun istikrar, güç ve otoriteyle şekilleneceğini gösterir.',
    reversed:
      'Ters İmparator, katı kuralların veya aşırı kontrolün sonucu sınırlayıcı olabilir.',
    keywords: ['istikrar', 'güç', 'otorite', 'liderlik', 'gelecek'],
    context:
      'Kariyer yolculuğunun sonucu sağlam bir yapı kurmak ve güçlü bir konuma gelmek olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_pos7',
    card: 'The Hierophant',
    position: 7,
    upright:
      'Aziz, kariyer yolculuğunun sonucunun geleneksel yöntemler, güvenilir destek ve sağlam temeller üzerinde ilerlemek olacağını gösterir.',
    reversed:
      'Ters Aziz, kuralları reddetmek veya aşırı başkaldırı, sonucun istikrarsız olmasına yol açabilir.',
    keywords: ['gelenek', 'bilgelik', 'destek', 'öğreti', 'gelecek'],
    context:
      'Sonuç, güvenilir desteklerle ve sağlam öğretilerle güçlenen bir yolculuk olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_pos7',
    card: 'The Lovers',
    position: 7,
    upright:
      'Aşıklar, kariyer yolculuğunun sonucunun uyumlu seçimler ve güçlü ortaklıklarla şekilleneceğini gösterir.',
    reversed:
      'Ters Aşıklar, kararsızlık veya uyumsuz seçimler sonucunda yolculuk dağılabilir.',
    keywords: ['seçim', 'uyum', 'ortaklık', 'karar', 'gelecek'],
    context:
      'Sonuç, doğru seçimler ve uyumlu ortaklıklarla kariyerinde ilerleme olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_pos7',
    card: 'The Chariot',
    position: 7,
    upright:
      'Savaş Arabası, kariyer yolculuğunun sonucunun irade, kararlılık ve yön bulma gücüyle zafer olacağını gösterir.',
    reversed:
      'Ters Savaş Arabası, kontrolsüzlük veya dağınıklık sonucun gecikmesine yol açabilir.',
    keywords: ['irade', 'zafer', 'kontrol', 'kararlılık', 'gelecek'],
    context: 'Sonuç, iradeni güçlendirerek zafer kazanmak olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_pos7',
    card: 'Strength',
    position: 7,
    upright:
      'Güç, kariyer yolculuğunun sonucunun sabır, cesaret ve içsel dengeyle başarıya ulaşmak olacağını gösterir.',
    reversed:
      'Ters Güç, korkularına yenik düşmek sonucun zayıf kalmasına yol açabilir.',
    keywords: ['cesaret', 'sabır', 'denge', 'öz güven', 'gelecek'],
    context:
      'Sonuç, sabırla ve cesaretle içsel gücünü kullanarak başarıya ulaşmak olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_pos7',
    card: 'The Hermit',
    position: 7,
    upright:
      'Ermiş, kariyer yolculuğunun sonucunun bilgelik, içsel aydınlanma ve derin farkındalık olacağını gösterir.',
    reversed:
      'Ters Ermiş, izolasyon veya aşırı kapanıklık sonucu sınırlı kılabilir.',
    keywords: ['bilgelik', 'aydınlanma', 'farkındalık', 'yalnızlık', 'gelecek'],
    context:
      'Sonuç, bilgelikle ve içsel keşifle olgun bir noktaya ulaşmak olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_pos7',
    card: 'The Wheel of Fortune',
    position: 7,
    upright:
      'Kader Çarkı, kariyer yolculuğunun sonucunun şans, kaderin desteği ve döngüsel başarılarla şekilleneceğini gösterir.',
    reversed:
      'Ters Kader Çarkı, fırsatları değerlendirmemek sonucun yavaşlamasına yol açabilir.',
    keywords: ['kader', 'şans', 'döngü', 'fırsat', 'gelecek'],
    context:
      'Sonuç, şansın dönmesiyle ve fırsatların gelmesiyle ilerleme olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_pos7',
    card: 'Justice',
    position: 7,
    upright:
      'Adalet, kariyer yolculuğunun sonucunun dürüstlük, denge ve adil kararlarla başarıya ulaşmak olacağını gösterir.',
    reversed:
      'Ters Adalet, yanlış kararlar veya adaletsizlik sonucu olumsuz etkileyebilir.',
    keywords: ['adalet', 'denge', 'doğruluk', 'sorumluluk', 'gelecek'],
    context: 'Sonuç, adaletli davranarak sağlam bir geleceğe ulaşmak olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_pos7',
    card: 'The Hanged Man',
    position: 7,
    upright:
      'Asılan Adam, kariyer yolculuğunun sonucunun bakış açını değiştirerek farkındalık kazanmak olacağını gösterir.',
    reversed: 'Ters Asılan Adam, gereksiz direnç sonucu süreci yavaşlatabilir.',
    keywords: ['farkındalık', 'bakış açısı', 'teslimiyet', 'denge', 'gelecek'],
    context:
      'Sonuç, bakış açını değiştirerek yeni bir anlayışa ulaşmak olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_pos7',
    card: 'Death',
    position: 7,
    upright:
      'Ölüm, kariyer yolculuğunun sonucunun köklü dönüşümler ve yeni başlangıçlarla şekilleneceğini gösterir.',
    reversed:
      'Ters Ölüm, değişime direnmek sonucun gecikmesine neden olabilir.',
    keywords: ['dönüşüm', 'bitiş', 'başlangıç', 'yenilenme', 'gelecek'],
    context: 'Sonuç, eskiyi bırakıp yeniye adım atmak olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_pos7',
    card: 'Temperance',
    position: 7,
    upright:
      'Denge, kariyer yolculuğunun sonucunun uyum, sabır ve ölçülülükle başarıya ulaşmak olacağını gösterir.',
    reversed: 'Ters Denge, aşırılıklar sonucun dengesini bozabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'gelecek'],
    context: 'Sonuç, uyumlu ve dengeli adımlarla gelişim göstermek olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_pos7',
    card: 'The Devil',
    position: 7,
    upright:
      'Şeytan, kariyer yolculuğunun sonucunun bağımlılıklardan arınmazsan kısıtlı kalabileceğini gösterir.',
    reversed:
      'Ters Şeytan, zincirlerini kırdığında özgürleşerek daha büyük başarı elde edebilirsin.',
    keywords: ['bağımlılık', 'özgürlük', 'kontrol', 'kısıtlama', 'gelecek'],
    context: 'Sonuç, zincirlerinden kurtulup özgürleşmek olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_pos7',
    card: 'The Tower',
    position: 7,
    upright:
      'Kule, kariyer yolculuğunun sonucunun köklü bir değişim veya beklenmedik bir kırılma noktasıyla şekilleneceğini gösterir.',
    reversed:
      'Ters Kule, direnç gösterilen krizler sonucun daha sancılı olmasına yol açabilir.',
    keywords: ['kriz', 'yıkım', 'dönüşüm', 'yenilik', 'gelecek'],
    context: 'Sonuç, büyük bir kırılma sonrası yeniden yapılanma olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_pos7',
    card: 'The Star',
    position: 7,
    upright:
      'Yıldız, kariyer yolculuğunun sonucunun umut, ilham ve yol gösterici vizyonla şekilleneceğini gösterir.',
    reversed:
      'Ters Yıldız, umutsuzluk veya ilham eksikliği sonucun geç şekillenmesine yol açabilir.',
    keywords: ['umut', 'ilham', 'vizyon', 'farkındalık', 'gelecek'],
    context: 'Sonuç, umut dolu bir geleceğe ilerlemek olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_pos7',
    card: 'The Moon',
    position: 7,
    upright:
      'Ay, kariyer yolculuğunun sonucunun belirsizlikleri aşarak sezgilerle yön bulmak olacağını gösterir.',
    reversed: 'Ters Ay, yanılsamalar veya korkular sonucu gölgeleyebilir.',
    keywords: ['sezgi', 'belirsizlik', 'farkındalık', 'korku', 'gelecek'],
    context: 'Sonuç, belirsizlikleri aşarak yolunu bulmak olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_pos7',
    card: 'The Sun',
    position: 7,
    upright:
      'Güneş, kariyer yolculuğunun sonucunun başarı, özgüven ve aydınlık bir gelecek olacağını gösterir.',
    reversed:
      'Ters Güneş, gecikmiş başarılar veya karamsarlık sonucun tadını gölgeleyebilir.',
    keywords: ['başarı', 'özgüven', 'aydınlık', 'umut', 'gelecek'],
    context: 'Sonuç, aydınlık ve başarı dolu bir gelecek olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_pos7',
    card: 'Judgement',
    position: 7,
    upright:
      'Mahkeme, kariyer yolculuğunun sonucunun geçmişten ders alarak yeniden doğmak olacağını gösterir.',
    reversed: 'Ters Mahkeme, geçmişle yüzleşmemek sonucu erteleyebilir.',
    keywords: ['yeniden doğuş', 'ders', 'yüzleşme', 'farkındalık', 'gelecek'],
    context: 'Sonuç, geçmişle yüzleşip güçlü bir yenilenme yaşamak olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_pos7',
    card: 'The World',
    position: 7,
    upright:
      'Dünya, kariyer yolculuğunun sonucunun tamamlanma, başarı ve bütünlük olacağını gösterir.',
    reversed:
      'Ters Dünya, tamamlanmamış süreçler sonucun eksik kalmasına yol açabilir.',
    keywords: ['tamamlanma', 'başarı', 'bütünlük', 'zafer', 'gelecek'],
    context: 'Sonuç, döngüyü başarıyla tamamlamak ve bütünlüğe ulaşmak olacak.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_pos7',
    card: 'Ace of Cups',
    position: 7,
    upright:
      'Kupa Ası, kariyer yolculuğunun sonucunun ilham dolu yeni başlangıçlar ve tatmin getireceğini gösterir.',
    reversed:
      'Ters Kupa Ası, duygusal motivasyonun eksikliği sonucu geciktirebilir.',
    keywords: ['ilham', 'başlangıç', 'tatmin', 'duygu', 'gelecek'],
    context: 'Sonuç, duygusal açıdan tatmin edici yeni bir dönem olacak.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_pos7',
    card: 'Two of Cups',
    position: 7,
    upright:
      'İki Kupa, kariyer yolculuğunun sonucunun uyumlu işbirlikleri ve karşılıklı güvenle güçleneceğini gösterir.',
    reversed:
      'Ters İki Kupa, uyumsuz ortaklıklar veya iletişim eksikliği sonucu etkileyebilir.',
    keywords: ['işbirliği', 'uyum', 'güven', 'ortaklık', 'gelecek'],
    context: 'Sonuç, uyumlu iş ilişkileriyle ilerlemek olacak.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_pos7',
    card: 'Three of Cups',
    position: 7,
    upright:
      'Üç Kupa, kariyer yolculuğunun sonucunun destekleyici topluluklar ve kutlanacak başarılarla şekilleneceğini gösterir.',
    reversed:
      'Ters Üç Kupa, yalnızlık veya destek eksikliği sonucu yavaşlatabilir.',
    keywords: ['kutlama', 'destek', 'topluluk', 'başarı', 'gelecek'],
    context: 'Sonuç, destek ve kutlama getiren bir başarı olacak.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_pos7',
    card: 'Four of Cups',
    position: 7,
    upright:
      'Dört Kupa, kariyer yolculuğunun sonucunun içsel tatmin arayışına yönelmek olacağını gösterir.',
    reversed:
      'Ters Dört Kupa, farkındalık eksikliği sonucu fırsatları geç fark etmene yol açabilir.',
    keywords: ['tatmin', 'farkındalık', 'arayış', 'düşünme', 'gelecek'],
    context: 'Sonuç, içsel tatmin ve farkındalık üzerine kurulacak.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_pos7',
    card: 'Five of Cups',
    position: 7,
    upright:
      'Beş Kupa, kariyer yolculuğunun sonucunun kayıplardan ders çıkararak güçlenmek olacağını gösterir.',
    reversed: 'Ters Beş Kupa, geçmişe takılı kalmak sonucu geciktirebilir.',
    keywords: ['ders', 'kayıp', 'odak', 'güçlenme', 'gelecek'],
    context:
      'Sonuç, kayıplardan öğrenilen derslerle daha sağlam bir gelecek olacak.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_pos7',
    card: 'Six of Cups',
    position: 7,
    upright:
      'Altı Kupa, kariyer yolculuğunun sonucunun geçmişten gelen destek veya deneyimlerle güçleneceğini gösterir.',
    reversed:
      'Ters Altı Kupa, geçmişe aşırı bağlılık sonucun ilerlemesini yavaşlatabilir.',
    keywords: ['geçmiş', 'deneyim', 'destek', 'fırsat', 'gelecek'],
    context: 'Sonuç, geçmiş deneyimlerinle güçlenmek olacak.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_pos7',
    card: 'Seven of Cups',
    position: 7,
    upright:
      'Yedi Kupa, kariyer yolculuğunun sonucunun seçenekler arasından doğruyu seçmekle şekilleneceğini gösterir.',
    reversed: 'Ters Yedi Kupa, kafa karışıklığı sonucu yavaşlatabilir.',
    keywords: ['seçim', 'vizyon', 'hayal', 'odak', 'gelecek'],
    context: 'Sonuç, hayallerin arasından doğru olanı seçmek olacak.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_pos7',
    card: 'Eight of Cups',
    position: 7,
    upright:
      'Sekiz Kupa, kariyer yolculuğunun sonucunun seni tatmin etmeyen şeylerden uzaklaşarak ilerlemek olacağını gösterir.',
    reversed: 'Ters Sekiz Kupa, geçmişe bağlı kalmak sonucun hızını kesebilir.',
    keywords: ['kopuş', 'tatmin', 'ilerleme', 'vizyon', 'gelecek'],
    context: 'Sonuç, seni tatmin etmeyeni geride bırakıp ilerlemek olacak.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_pos7',
    card: 'Nine of Cups',
    position: 7,
    upright:
      'Dokuz Kupa, kariyer yolculuğunun sonucunun kişisel tatmin, mutluluk ve başarı olacağını gösterir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatminler veya doyumsuzluk sonucun kalitesini düşürebilir.',
    keywords: ['tatmin', 'başarı', 'mutluluk', 'huzur', 'gelecek'],
    context: 'Sonuç, kişisel mutluluk ve tatmin olacak.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_pos7',
    card: 'Ten of Cups',
    position: 7,
    upright:
      'On Kupa, kariyer yolculuğunun sonucunun uyumlu bir yaşam dengesi ve huzur getireceğini gösterir.',
    reversed:
      'Ters On Kupa, huzursuzluk veya uyumsuzluk sonucu gölgeleyebilir.',
    keywords: ['uyum', 'denge', 'huzur', 'tamamlanma', 'gelecek'],
    context: 'Sonuç, huzurlu ve dengeli bir yaşam olacak.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_pos7',
    card: 'Page of Cups',
    position: 7,
    upright:
      'Kupa Prensi, kariyer yolculuğunun sonucunun yeni fikirler ve yaratıcılıkla şekilleneceğini gösterir.',
    reversed:
      'Ters Kupa Prensi, hayalcilik veya uygulama eksikliği sonucu geciktirebilir.',
    keywords: ['yaratıcılık', 'fikir', 'hayal', 'deneme', 'gelecek'],
    context: 'Sonuç, yaratıcılığınla yeni fırsatlar yaratmak olacak.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_pos7',
    card: 'Knight of Cups',
    position: 7,
    upright:
      'Kupa Şövalyesi, kariyer yolculuğunun sonucunun idealist hedefler ve vizyonla ilerlemek olacağını gösterir.',
    reversed:
      'Ters Kupa Şövalyesi, gerçeklerden kopukluk sonucu zayıflatabilir.',
    keywords: ['vizyon', 'idealizm', 'hedef', 'fırsat', 'gelecek'],
    context: 'Sonuç, idealist hedeflerle ilerlemek olacak.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_pos7',
    card: 'Queen of Cups',
    position: 7,
    upright:
      'Kupa Kraliçesi, kariyer yolculuğunun sonucunun empati, anlayış ve duygusal dengeyle şekilleneceğini gösterir.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal dengesizlik sonucu gölgeleyebilir.',
    keywords: ['empati', 'denge', 'duyarlılık', 'farkındalık', 'gelecek'],
    context: 'Sonuç, duygusal denge ve empatiyle güçlenen bir yolculuk olacak.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_pos7',
    card: 'King of Cups',
    position: 7,
    upright:
      'Kupa Kralı, kariyer yolculuğunun sonucunun olgunluk, soğukkanlılık ve güvenilir liderlik olacağını gösterir.',
    reversed:
      'Ters Kupa Kralı, dengesizlik veya aşırı duygusallık sonucu sınırlayabilir.',
    keywords: ['olgunluk', 'liderlik', 'denge', 'güven', 'gelecek'],
    context: 'Sonuç, olgun ve dengeli bir liderlik olacak.',
    group: 'Kupalar',
  },
  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_pos7',
    card: 'Ace of Swords',
    position: 7,
    upright:
      'Kılıç Ası, kariyer yolculuğunun sonucunun netlik, doğru kararlar ve güçlü bir vizyon olacağını gösterir.',
    reversed:
      'Ters Kılıç Ası, kafa karışıklığı veya iletişim eksikliği sonucu geciktirebilir.',
    keywords: ['netlik', 'karar', 'vizyon', 'iletişim', 'gelecek'],
    context: 'Sonuç, net kararlar ve güçlü bir vizyonla ilerlemek olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_pos7',
    card: 'Two of Swords',
    position: 7,
    upright:
      'İki Kılıç, kariyer yolculuğunun sonucunun dikkatli seçimlerle dengeli bir noktaya ulaşmak olacağını gösterir.',
    reversed:
      'Ters İki Kılıç, kararsızlık veya erteleme sonucu olumsuz etkileyebilir.',
    keywords: ['seçim', 'denge', 'karar', 'ikilem', 'gelecek'],
    context: 'Sonuç, dikkatli seçimlerle dengeye ulaşmak olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_pos7',
    card: 'Three of Swords',
    position: 7,
    upright:
      'Üç Kılıç, kariyer yolculuğunun sonucunun bazı hayal kırıklıkları ve zorluklardan ders almak olacağını gösterir.',
    reversed:
      'Ters Üç Kılıç, geçmiş yaraların etkisi sonucu süreci zorlaştırabilir.',
    keywords: ['ders', 'zorluk', 'hayal kırıklığı', 'öğrenme', 'gelecek'],
    context: 'Sonuç, zorluklardan ders çıkararak ilerlemek olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_pos7',
    card: 'Four of Swords',
    position: 7,
    upright:
      'Dört Kılıç, kariyer yolculuğunun sonucunun dinlenme, toparlanma ve yenilenme süreciyle şekilleneceğini gösterir.',
    reversed:
      'Ters Dört Kılıç, aşırı yorgunluk veya ertelemeler sonucu geciktirebilir.',
    keywords: ['dinlenme', 'toparlanma', 'yenilenme', 'denge', 'gelecek'],
    context: 'Sonuç, yenilenme ve toparlanma süreciyle güçlenmek olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_pos7',
    card: 'Five of Swords',
    position: 7,
    upright:
      'Beş Kılıç, kariyer yolculuğunun sonucunun bazı çatışmaların ardından zafer ya da deneyim kazanımı olacağını gösterir.',
    reversed:
      'Ters Beş Kılıç, gereksiz tartışmalar sonucu ilerlemeyi zorlaştırabilir.',
    keywords: ['çatışma', 'zafer', 'öğrenme', 'ego', 'gelecek'],
    context:
      'Sonuç, çatışmalardan ders çıkararak daha güçlü bir noktaya gelmek olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_pos7',
    card: 'Six of Swords',
    position: 7,
    upright:
      'Altı Kılıç, kariyer yolculuğunun sonucunun zorlukları geride bırakıp daha sakin sulara ulaşmak olacağını gösterir.',
    reversed: 'Ters Altı Kılıç, geçmişe bağlı kalmak sonucu geciktirebilir.',
    keywords: ['ilerleme', 'geçiş', 'sükunet', 'yolculuk', 'gelecek'],
    context:
      'Sonuç, zorlukları geride bırakıp huzurlu bir döneme geçmek olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_pos7',
    card: 'Seven of Swords',
    position: 7,
    upright:
      'Yedi Kılıç, kariyer yolculuğunun sonucunun stratejik düşünerek engelleri aşmak olacağını gösterir.',
    reversed:
      'Ters Yedi Kılıç, gizlilik veya dürüstlük eksikliği sonucu yavaşlatabilir.',
    keywords: ['strateji', 'plan', 'dikkat', 'taktik', 'gelecek'],
    context: 'Sonuç, stratejik adımlarla başarıya ulaşmak olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_pos7',
    card: 'Eight of Swords',
    position: 7,
    upright:
      'Sekiz Kılıç, kariyer yolculuğunun sonucunun zihinsel sınırlarını aşarak özgürleşmek olacağını gösterir.',
    reversed:
      'Ters Sekiz Kılıç, özgüven eksikliği sonucu ilerlemeyi geciktirebilir.',
    keywords: ['özgürlük', 'zihin', 'sınırlar', 'inanç', 'gelecek'],
    context: 'Sonuç, zihinsel sınırlarını aşarak yolunu açmak olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_pos7',
    card: 'Nine of Swords',
    position: 7,
    upright:
      'Dokuz Kılıç, kariyer yolculuğunun sonucunun kaygılarla yüzleşmek ve onları aşmak olacağını gösterir.',
    reversed:
      'Ters Dokuz Kılıç, korkulara yenik düşmek sonucu olumsuz etkileyebilir.',
    keywords: ['kaygı', 'yüzleşme', 'cesaret', 'stres', 'gelecek'],
    context: 'Sonuç, korkularınla yüzleşip onları aşmak olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_pos7',
    card: 'Ten of Swords',
    position: 7,
    upright:
      'On Kılıç, kariyer yolculuğunun sonucunun bir döngünün kapanması ve yeni bir başlangıca hazırlanmak olacağını gösterir.',
    reversed:
      'Ters On Kılıç, geçmişin yüklerini bırakmamak sonucu zorlaştırabilir.',
    keywords: ['bitiş', 'döngü', 'yenilenme', 'dönüşüm', 'gelecek'],
    context: 'Sonuç, bir döngüyü kapatıp yeniye hazırlanmak olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_pos7',
    card: 'Page of Swords',
    position: 7,
    upright:
      'Kılıç Prensi, kariyer yolculuğunun sonucunun yeni bilgi, merak ve öğrenme fırsatlarıyla şekilleneceğini gösterir.',
    reversed:
      'Ters Kılıç Prensi, dikkatsizlik veya yüzeysellik sonucu olumsuz etkileyebilir.',
    keywords: ['öğrenme', 'merak', 'bilgi', 'keşif', 'gelecek'],
    context: 'Sonuç, yeni şeyler öğrenerek ilerlemek olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_pos7',
    card: 'Knight of Swords',
    position: 7,
    upright:
      'Kılıç Şövalyesi, kariyer yolculuğunun sonucunun hızlı ve kararlı adımlarla ilerlemek olacağını gösterir.',
    reversed:
      'Ters Kılıç Şövalyesi, acelecilik sonucu planların eksik kalabilir.',
    keywords: ['hız', 'kararlılık', 'hedef', 'cesaret', 'gelecek'],
    context: 'Sonuç, hızlı ve kararlı ilerleyiş olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_pos7',
    card: 'Queen of Swords',
    position: 7,
    upright:
      'Kılıç Kraliçesi, kariyer yolculuğunun sonucunun objektif bakış, mantıklı kararlar ve bağımsızlık olacağını gösterir.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştiri veya soğukluk sonucu olumsuz etkileyebilir.',
    keywords: ['mantık', 'objektiflik', 'bağımsızlık', 'netlik', 'gelecek'],
    context:
      'Sonuç, mantıklı ve objektif kararlarla bağımsız ilerlemek olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_pos7',
    card: 'King of Swords',
    position: 7,
    upright:
      'Kılıç Kralı, kariyer yolculuğunun sonucunun bilgelik, adalet ve güçlü bir liderlikle şekilleneceğini gösterir.',
    reversed:
      'Ters Kılıç Kralı, otoriterlik veya adaletsizlik sonucu zayıflatabilir.',
    keywords: ['bilgelik', 'adalet', 'otorite', 'liderlik', 'gelecek'],
    context: 'Sonuç, bilge ve adil bir liderlikle güçlenmek olacak.',
    group: 'Kılıçlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_pos7',
    card: 'Ace of Wands',
    position: 7,
    upright:
      'Asa Ası, kariyer yolculuğunun sonucunun yaratıcı başlangıçlar ve güçlü bir ilhamla şekilleneceğini gösterir.',
    reversed:
      'Ters Asa Ası, motivasyon eksikliği veya kaçırılan fırsatlar sonucu yavaşlatabilir.',
    keywords: ['başlangıç', 'ilham', 'yaratıcılık', 'motivasyon', 'gelecek'],
    context: 'Sonuç, güçlü bir ilham ve yeni başlangıçlarla ilerlemek olacak.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_pos7',
    card: 'Two of Wands',
    position: 7,
    upright:
      'İki Asa, kariyer yolculuğunun sonucunun planlı adımlar ve geniş vizyonla şekilleneceğini gösterir.',
    reversed:
      'Ters İki Asa, dar görüşlülük veya tereddüt sonucu olumsuz etkileyebilir.',
    keywords: ['plan', 'vizyon', 'gelecek', 'hedef', 'ilerleme'],
    context: 'Sonuç, vizyonunu genişletip planlı ilerlemek olacak.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_pos7',
    card: 'Three of Wands',
    position: 7,
    upright:
      'Üç Asa, kariyer yolculuğunun sonucunun yeni fırsatlara açılarak ve ufkunu genişleterek şekilleneceğini gösterir.',
    reversed: 'Ters Üç Asa, fırsatları görmezden gelmek sonucu geciktirebilir.',
    keywords: ['fırsat', 'ufuk', 'genişleme', 'vizyon', 'gelecek'],
    context: 'Sonuç, ufkunu genişleterek ilerlemek olacak.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_pos7',
    card: 'Four of Wands',
    position: 7,
    upright:
      'Dört Asa, kariyer yolculuğunun sonucunun uyumlu işbirlikleri ve istikrarlı başarılarla şekilleneceğini gösterir.',
    reversed:
      'Ters Dört Asa, huzursuzluk veya istikrarsızlık sonucu etkileyebilir.',
    keywords: ['uyum', 'istikrar', 'kutlama', 'başarı', 'gelecek'],
    context: 'Sonuç, uyumlu işbirlikleriyle kalıcı başarı olacak.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_pos7',
    card: 'Five of Wands',
    position: 7,
    upright:
      'Beş Asa, kariyer yolculuğunun sonucunun mücadelelerden güçlenerek çıkmak olacağını gösterir.',
    reversed:
      'Ters Beş Asa, gereksiz rekabet veya tartışmalar sonucu zayıflatabilir.',
    keywords: ['mücadele', 'rekabet', 'azim', 'direnç', 'gelecek'],
    context: 'Sonuç, rekabetten güçlenerek çıkmak olacak.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_pos7',
    card: 'Six of Wands',
    position: 7,
    upright:
      'Altı Asa, kariyer yolculuğunun sonucunun zafer, görünürlük ve takdir edilmek olacağını gösterir.',
    reversed:
      'Ters Altı Asa, görünmez kalmak veya başarının geç fark edilmesi sonucu etkileyebilir.',
    keywords: ['zafer', 'takdir', 'özgüven', 'başarı', 'gelecek'],
    context: 'Sonuç, başarılarınla görünür olmak ve takdir kazanmak olacak.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_pos7',
    card: 'Seven of Wands',
    position: 7,
    upright:
      'Yedi Asa, kariyer yolculuğunun sonucunun kararlılıkla duruşunu savunmak ve güçlü bir konuma gelmek olacağını gösterir.',
    reversed:
      'Ters Yedi Asa, direnç gösterememek sonucu ilerlemeyi zayıflatabilir.',
    keywords: ['savunma', 'kararlılık', 'cesaret', 'konum', 'gelecek'],
    context:
      'Sonuç, kararlı duruşunu koruyarak güçlü bir konuma gelmek olacak.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_pos7',
    card: 'Eight of Wands',
    position: 7,
    upright:
      'Sekiz Asa, kariyer yolculuğunun sonucunun hızlı ilerlemeler, gelişmeler ve yeni fırsatlar olacağını gösterir.',
    reversed:
      'Ters Sekiz Asa, gecikmeler veya yavaş ilerleme sonucu yavaşlatabilir.',
    keywords: ['hız', 'fırsat', 'gelişme', 'hareket', 'gelecek'],
    context: 'Sonuç, hızlı ilerleme ve fırsatlarla gelişim olacak.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_pos7',
    card: 'Nine of Wands',
    position: 7,
    upright:
      'Dokuz Asa, kariyer yolculuğunun sonucunun sabır, direnç ve dayanıklılıkla başarıya ulaşmak olacağını gösterir.',
    reversed:
      'Ters Dokuz Asa, yorgunluk veya pes etme eğilimi sonucu geciktirebilir.',
    keywords: ['dayanıklılık', 'sabır', 'direnç', 'koruma', 'gelecek'],
    context: 'Sonuç, dayanıklılık ve azimle ilerlemek olacak.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_pos7',
    card: 'Ten of Wands',
    position: 7,
    upright:
      'On Asa, kariyer yolculuğunun sonucunun sorumlulukların dengelenmesiyle kalıcı başarı olacağını gösterir.',
    reversed: 'Ters On Asa, aşırı yüklenmek sonucu ilerlemeyi zorlaştırabilir.',
    keywords: ['sorumluluk', 'denge', 'yük', 'azim', 'gelecek'],
    context:
      'Sonuç, sorumluluklarını dengeli yöneterek başarıya ulaşmak olacak.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_pos7',
    card: 'Page of Wands',
    position: 7,
    upright:
      'Asa Prensi, kariyer yolculuğunun sonucunun yeni fikirler, heves ve denemelerle şekilleneceğini gösterir.',
    reversed: 'Ters Asa Prensi, hevesin çabuk sönmesi sonucu geciktirebilir.',
    keywords: ['fikir', 'heves', 'deneme', 'ilham', 'gelecek'],
    context: 'Sonuç, yeni fikirlerle denemeler yaparak ilerlemek olacak.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_pos7',
    card: 'Knight of Wands',
    position: 7,
    upright:
      'Asa Şövalyesi, kariyer yolculuğunun sonucunun cesur adımlar ve enerjik ilerlemelerle şekilleneceğini gösterir.',
    reversed:
      'Ters Asa Şövalyesi, acelecilik veya yönsüzlük sonucu süreci zorlaştırabilir.',
    keywords: ['cesaret', 'enerji', 'ilerleme', 'hedef', 'gelecek'],
    context: 'Sonuç, cesur adımlar atarak ilerlemek olacak.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_pos7',
    card: 'Queen of Wands',
    position: 7,
    upright:
      'Asa Kraliçesi, kariyer yolculuğunun sonucunun özgüven, liderlik ve karizma ile şekilleneceğini gösterir.',
    reversed:
      'Ters Asa Kraliçesi, özgüven eksikliği sonucu başarıyı gölgeleyebilir.',
    keywords: ['özgüven', 'liderlik', 'karizma', 'cesaret', 'gelecek'],
    context: 'Sonuç, özgüvenle ve karizmayla liderlik yapmak olacak.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_pos7',
    card: 'King of Wands',
    position: 7,
    upright:
      'Asa Kralı, kariyer yolculuğunun sonucunun vizyoner liderlik ve güçlü bir otoriteyle şekilleneceğini gösterir.',
    reversed:
      'Ters Asa Kralı, kontrolsüzlük veya yön kaybı sonucu etkileşimleri zayıflatabilir.',
    keywords: ['vizyon', 'liderlik', 'otorite', 'karizma', 'gelecek'],
    context: 'Sonuç, vizyoner bir liderlikle güçlü bir konuma gelmek olacak.',
    group: 'Asalar',
  },
  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_pos7',
    card: 'Ace of Pentacles',
    position: 7,
    upright:
      'Tılsım Ası, kariyer yolculuğunun sonucunun somut fırsatlar, maddi güvence ve istikrar getireceğini gösterir.',
    reversed:
      'Ters Tılsım Ası, fırsatların kaçırılması veya istikrarsızlık sonucu süreci yavaşlatabilir.',
    keywords: ['fırsat', 'maddi güvence', 'istikrar', 'başlangıç', 'gelecek'],
    context: 'Sonuç, yeni ve somut bir fırsatla istikrar kazanmak olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pos7',
    card: 'Two of Pentacles',
    position: 7,
    upright:
      'İki Tılsım, kariyer yolculuğunun sonucunun dengeyi sağlamak ve kaynakları akıllıca yönetmek olacağını gösterir.',
    reversed:
      'Ters İki Tılsım, dengesizlik veya öncelik hataları sonucu süreci zorlaştırabilir.',
    keywords: ['denge', 'kaynak', 'öncelik', 'esneklik', 'gelecek'],
    context: 'Sonuç, kaynaklarını dengeyle yöneterek ilerlemek olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pos7',
    card: 'Three of Pentacles',
    position: 7,
    upright:
      'Üç Tılsım, kariyer yolculuğunun sonucunun işbirliği, ekip çalışması ve uzmanlık kazanımıyla şekilleneceğini gösterir.',
    reversed:
      'Ters Üç Tılsım, işbirliği eksikliği veya yalnızlık sonucu başarıyı zorlaştırabilir.',
    keywords: ['işbirliği', 'ekip', 'ustalık', 'destek', 'gelecek'],
    context: 'Sonuç, ekip desteğiyle uzmanlık geliştirmek olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pos7',
    card: 'Four of Pentacles',
    position: 7,
    upright:
      'Dört Tılsım, kariyer yolculuğunun sonucunun güvenli yapı kurmak ve istikrar sağlamak olacağını gösterir.',
    reversed:
      'Ters Dört Tılsım, aşırı tutuculuk veya kontrol sonucu fırsatların kaçmasına yol açabilir.',
    keywords: ['güvenlik', 'istikrar', 'kontrol', 'denge', 'gelecek'],
    context: 'Sonuç, güvenli bir temelle ilerlemek olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pos7',
    card: 'Five of Pentacles',
    position: 7,
    upright:
      'Beş Tılsım, kariyer yolculuğunun sonucunun zorluklardan sonra dayanışma ve destekle toparlanmak olacağını gösterir.',
    reversed:
      'Ters Beş Tılsım, yalnızlık veya yardım eksikliği sonucu süreci zorlaştırabilir.',
    keywords: ['dayanışma', 'destek', 'zorluk', 'toparlanma', 'gelecek'],
    context: 'Sonuç, zorluklardan sonra destekle toparlanmak olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pos7',
    card: 'Six of Pentacles',
    position: 7,
    upright:
      'Altı Tılsım, kariyer yolculuğunun sonucunun adil paylaşım, karşılıklı destek ve dengeyle şekilleneceğini gösterir.',
    reversed:
      'Ters Altı Tılsım, dengesiz ilişkiler veya adaletsizlik sonucu etkileyebilir.',
    keywords: ['adalet', 'denge', 'paylaşım', 'yardım', 'gelecek'],
    context: 'Sonuç, adil ve dengeli ilişkilerle ilerlemek olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pos7',
    card: 'Seven of Pentacles',
    position: 7,
    upright:
      'Yedi Tılsım, kariyer yolculuğunun sonucunun sabırla yapılan yatırımların karşılığını almak olacağını gösterir.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık veya erken vazgeçiş sonucu ilerlemeyi zorlaştırabilir.',
    keywords: ['sabır', 'yatırım', 'sonuç', 'bekleyiş', 'gelecek'],
    context: 'Sonuç, sabırla beklenen emeklerin karşılığını almak olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pos7',
    card: 'Eight of Pentacles',
    position: 7,
    upright:
      'Sekiz Tılsım, kariyer yolculuğunun sonucunun ustalaşmak, becerilerini geliştirmek ve disiplinle başarıya ulaşmak olacağını gösterir.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik veya motivasyon eksikliği sonucu süreci yavaşlatabilir.',
    keywords: ['ustalık', 'disiplin', 'öğrenme', 'emek', 'gelecek'],
    context: 'Sonuç, becerilerini geliştirmek ve ustalaşmak olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pos7',
    card: 'Nine of Pentacles',
    position: 7,
    upright:
      'Dokuz Tılsım, kariyer yolculuğunun sonucunun bağımsızlık, öz yeterlilik ve kişisel tatmin olacağını gösterir.',
    reversed:
      'Ters Dokuz Tılsım, yalnızlık veya bağımlılık sonucu başarıyı gölgeleyebilir.',
    keywords: ['bağımsızlık', 'öz yeterlilik', 'tatmin', 'özgüven', 'gelecek'],
    context: 'Sonuç, öz yeterlilik ve bağımsız başarı olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pos7',
    card: 'Ten of Pentacles',
    position: 7,
    upright:
      'On Tılsım, kariyer yolculuğunun sonucunun kalıcı başarı, güvence ve güçlü bir miras bırakmak olacağını gösterir.',
    reversed:
      'Ters On Tılsım, uzun vadeli istikrarı sağlayamamak sonucu zorlaştırabilir.',
    keywords: ['kalıcılık', 'istikrar', 'miras', 'güvence', 'gelecek'],
    context: 'Sonuç, kalıcı bir istikrar ve başarı oluşturmak olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pos7',
    card: 'Page of Pentacles',
    position: 7,
    upright:
      'Tılsım Prensi, kariyer yolculuğunun sonucunun öğrenme, keşif ve yeni fırsatlarla şekilleneceğini gösterir.',
    reversed:
      'Ters Tılsım Prensi, ilgisizlik veya dikkatsizlik sonucu ilerlemeyi geciktirebilir.',
    keywords: ['öğrenme', 'keşif', 'fırsat', 'başlangıç', 'gelecek'],
    context: 'Sonuç, öğrenerek ve keşfederek ilerlemek olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pos7',
    card: 'Knight of Pentacles',
    position: 7,
    upright:
      'Tılsım Şövalyesi, kariyer yolculuğunun sonucunun sabır, disiplin ve istikrarlı ilerleme olacağını gösterir.',
    reversed:
      'Ters Tılsım Şövalyesi, monotonluk veya tembellik sonucu süreci zorlaştırabilir.',
    keywords: ['sabır', 'istikrar', 'disiplin', 'güvenilirlik', 'gelecek'],
    context: 'Sonuç, sabırlı ve disiplinli ilerlemek olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pos7',
    card: 'Queen of Pentacles',
    position: 7,
    upright:
      'Tılsım Kraliçesi, kariyer yolculuğunun sonucunun kaynaklarını akıllıca yönetmek, üretkenlik ve dengeyle şekilleneceğini gösterir.',
    reversed:
      'Ters Tılsım Kraliçesi, dağınıklık veya öz bakım eksikliği sonucu olumsuz etkileyebilir.',
    keywords: [
      'kaynak yönetimi',
      'üretkenlik',
      'denge',
      'pratiklik',
      'gelecek',
    ],
    context: 'Sonuç, üretkenlik ve kaynak yönetimiyle güçlenmek olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pos7',
    card: 'King of Pentacles',
    position: 7,
    upright:
      'Tılsım Kralı, kariyer yolculuğunun sonucunun güçlü liderlik, maddi istikrar ve vizyoner bir başarı olacağını gösterir.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol veya sorumsuz mali kararlar sonucu süreci zorlaştırabilir.',
    keywords: ['liderlik', 'istikrar', 'maddi güvence', 'vizyon', 'gelecek'],
    context: 'Sonuç, güçlü ve güven veren bir liderlikle başarı olacak.',
    group: 'Tılsımlar',
  },
];

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nPosition7Meanings = (): I18nCareerPositionMeaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position7Meanings.map(meaning => {
    // i18n'den çevirileri al
    const i18nUpright = getCardMeaning(meaning.card, 7, 'upright');
    const i18nReversed = getCardMeaning(meaning.card, 7, 'reversed');
    const i18nKeywords = getCardKeywords(meaning.card, 7);
    const i18nContext = getCardContext(meaning.card, 7);
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
export const getI18nPosition7Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nCareerPositionMeaning | null => {
  const originalMeaning = position7Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`career.meanings.${cardKey}.position7.upright`);
  const i18nReversed = t(`career.meanings.${cardKey}.position7.reversed`);
  const i18nKeywords = t(`career.meanings.${cardKey}.position7.keywords`);
  const i18nContext = t(`career.meanings.${cardKey}.position7.context`);
  const i18nGroup = t(
    `career.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
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
