// Bu dosya, Aşk açılımında Pozisyon 3 (Duygusal/Ruhsal Bağlantı) için özel kart anlamlarını içerir.
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

export const position3Meanings: CareerPositionMeaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_pos3',
    card: 'The Fool',
    position: 3,
    upright:
      'Joker, kariyer yolunda karşına çıkan beklenmedik sürprizlerin ve hayatın spontane akışının senin kontrolünde olmadığını hatırlatır. Bazı fırsatlar ve riskler senin dışında gelişir.',
    reversed:
      'Ters Joker, hayatın sana getirdiği belirsizliklerden tamamen kaçamayacağını söyler. Plansızlık seni zorlayabilir.',
    keywords: ['spontanlık', 'risk', 'belirsizlik', 'sürpriz', 'özgürlük'],
    context:
      'Kariyerinde her şeyi planlayamazsın; sürpriz gelişmeler senin kontrolün dışında olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_pos3',
    card: 'The Magician',
    position: 3,
    upright:
      'Büyücü, fırsatların sana gelme zamanlamasının her zaman senin elinde olmadığını gösterir. Doğru ortam bazen dışsal faktörlere bağlıdır.',
    reversed:
      'Ters Büyücü, başkalarının manipülasyonları veya yanlış yönlendirmeleri kontrol edemeyeceğin unsurlardır.',
    keywords: ['fırsat', 'yaratıcılık', 'iletişim', 'zamanlama', 'dış etki'],
    context:
      'Kariyerinde her zaman sahneye çıkacağın anı sen seçemezsin; koşullar etkili olur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_pos3',
    card: 'The High Priestess',
    position: 3,
    upright:
      'Başrahibe, görünmeyen dinamikler ve perde arkasındaki süreçlerin senin kontrolünde olmadığını söyler. Gizli kalan şeyler vardır.',
    reversed:
      'Ters Başrahibe, belirsizliklerin ve gizli bilgilerin açığa çıkma zamanını sen belirleyemezsin.',
    keywords: [
      'gizli faktörler',
      'belirsizlik',
      'sezgi',
      'zamanlama',
      'kontrol dışı',
    ],
    context:
      'Kariyerinde her gerçeği bilmen mümkün değil; bazı şeyler senden saklı kalacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_pos3',
    card: 'The Empress',
    position: 3,
    upright:
      'İmparatoriçe, doğal döngüler ve üretim süreçlerinin belirli bir zaman gerektirdiğini gösterir. Gelişme hızını her zaman sen kontrol edemezsin.',
    reversed:
      'Ters İmparatoriçe, ilhamın veya yaratıcılığın doğal akışının senin dışında geliştiğini hatırlatır.',
    keywords: ['doğa', 'zaman', 'yaratıcılık', 'üretim', 'ilham'],
    context:
      'Kariyerinde her şeyin olgunlaşması için gereken zamanı kontrol edemezsin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_pos3',
    card: 'The Emperor',
    position: 3,
    upright:
      'İmparator, otorite figürleri ve kuralların senin elinde olmadığını gösterir. Çalıştığın kurumun ya da sistemin şartları değişmez gerçekler olabilir.',
    reversed:
      'Ters İmparator, baskıcı yöneticiler veya katı kurallar kontrol edemeyeceğin faktörlerdir.',
    keywords: ['otorite', 'kurallar', 'sistem', 'disiplin', 'düzen'],
    context:
      'Kariyerinde bazı kurallar ve otorite yapıları senin dışında kalacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_pos3',
    card: 'The Hierophant',
    position: 3,
    upright:
      'Aziz, kurumların, geleneklerin ve otorite figürlerinin belirlediği standartlar senin kontrolünde değildir.',
    reversed:
      'Ters Aziz, kuralları sorgulasan bile toplumun beklentilerini tamamen değiştiremeyeceğini gösterir.',
    keywords: ['gelenek', 'otorite', 'kurallar', 'toplum', 'sistem'],
    context:
      'Kariyerinde bazı geleneksel yapılar senin kontrolünün dışında kalır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_pos3',
    card: 'The Lovers',
    position: 3,
    upright:
      'Aşıklar, kariyerindeki işbirliklerinin ve ilişkilerin dinamiklerinin her zaman kontrolünde olmadığını hatırlatır.',
    reversed:
      'Ters Aşıklar, uyumsuzluk veya yanlış seçimlerin bazen senin dışındaki faktörlerden kaynaklanabileceğini söyler.',
    keywords: ['ilişkiler', 'uyum', 'seçim', 'denge', 'kontrol dışı'],
    context: 'Kariyerinde tüm iş ilişkilerini ve uyumu sen belirleyemezsin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_pos3',
    card: 'The Chariot',
    position: 3,
    upright:
      'Savaş Arabası, dışsal engellerin ve koşulların hızını sınırlayabileceğini gösterir. Her zaman istediğin hızda ilerleyemezsin.',
    reversed:
      'Ters Savaş Arabası, kontrol edemediğin engeller yüzünden yönünü değiştirmek zorunda kalabilirsin.',
    keywords: ['kontrol', 'hız', 'engeller', 'irade', 'denge'],
    context: 'Kariyerinde ilerleme hızını senin dışındaki koşullar etkiler.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_pos3',
    card: 'Strength',
    position: 3,
    upright:
      'Güç, içsel sabrın sende olsa da başkalarının davranışlarını veya dışsal baskıları kontrol edemeyeceğini söyler.',
    reversed:
      'Ters Güç, başkalarının seni sınayan tutumları üzerinde kontrolün olmadığını gösterir.',
    keywords: ['sabır', 'dayanıklılık', 'kontrol', 'özgüven', 'dış etki'],
    context:
      'Kariyerinde başkalarının tavırlarını değiştiremezsin; sadece kendi sabrını yönetebilirsin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_pos3',
    card: 'The Hermit',
    position: 3,
    upright:
      'Ermiş, yalnız kalma ya da içe çekilme dönemlerinin hayatın akışında kontrol edemediğin bir ihtiyaç olarak ortaya çıkabileceğini gösterir.',
    reversed:
      'Ters Ermiş, bazen zorunlu yalnızlıkların ya da izole hissetmenin senin kontrolünde olmadığını söyler.',
    keywords: ['yalnızlık', 'içe dönüş', 'rehberlik', 'döngü', 'zorunluluk'],
    context:
      'Kariyerinde zaman zaman yalnız kalman kontrolün dışında olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_pos3',
    card: 'The Wheel of Fortune',
    position: 3,
    upright:
      'Kader Çarkı, şans ve kader döngülerinin kontrolünde olmadığını söyler. Bazı inişler ve çıkışlar kaçınılmazdır.',
    reversed:
      'Ters Kader Çarkı, talihsizlikler ve gecikmelerin her zaman engellenemeyeceğini hatırlatır.',
    keywords: ['kader', 'şans', 'değişim', 'döngü', 'kontrol dışı'],
    context:
      'Kariyerinde bazı değişimler kaderin doğal döngüsüdür ve senin kontrolünde değildir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_pos3',
    card: 'Justice',
    position: 3,
    upright:
      'Adalet, yasal süreçlerin ve dışsal kararların senin kontrolünde olmadığını hatırlatır. Her şey adil görünmeyebilir.',
    reversed:
      'Ters Adalet, haksızlıkların ya da yanlış kararların bazen kontrol edemeyeceğin dışsal faktörlerden kaynaklandığını gösterir.',
    keywords: ['adalet', 'hukuk', 'etik', 'sistem', 'karar'],
    context:
      'Kariyerinde yasal süreçleri veya başkalarının kararlarını değiştiremezsin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_pos3',
    card: 'The Hanged Man',
    position: 3,
    upright:
      'Asılan Adam, bekleme dönemlerinin ve sabır gerektiren süreçlerin senin kontrolünde olmadığını gösterir.',
    reversed:
      'Ters Asılan Adam, ilerlemeni yavaşlatan zorunlu duraklamaların senin kontrolünde olmadığını söyler.',
    keywords: ['bekleyiş', 'sabır', 'duraklama', 'teslimiyet', 'kontrol dışı'],
    context: 'Kariyerinde bazı bekleyişler ve duraklamalar kaçınılmazdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_pos3',
    card: 'Death',
    position: 3,
    upright:
      'Ölüm, bitişlerin ve kapanışların kaçınılmaz olduğunu söyler. Bazı döngüleri değiştiremezsin.',
    reversed: 'Ters Ölüm, dönüşümün doğal zamanlaması senin elinde değildir.',
    keywords: ['bitiş', 'dönüşüm', 'kaçınılmazlık', 'değişim', 'yenilenme'],
    context:
      'Kariyerinde bazı bitişler kaçınılmazdır; onları kontrol edemezsin.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_pos3',
    card: 'Temperance',
    position: 3,
    upright:
      'Denge, bazı süreçlerin zamanla olgunlaşacağını gösterir. Hızını kontrol edemezsin.',
    reversed:
      'Ters Denge, aşırılıklardan kaynaklı dengesizliklerin bazen dışsal koşullardan geldiğini söyler.',
    keywords: ['denge', 'zaman', 'uyum', 'sabır', 'doğal süreç'],
    context:
      'Kariyerinde her süreci hızlandıramazsın; bazı şeyler zamanla olur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_pos3',
    card: 'The Devil',
    position: 3,
    upright:
      'Şeytan, bağımlılık yaratan kalıplar veya kısıtlamaların bir kısmının senin dışında olduğunu söyler. Sistemsel zincirler vardır.',
    reversed:
      'Ters Şeytan, tüm zincirleri kırmak kolay olmayabilir; bazı bağımlılıklar dış koşullardan gelir.',
    keywords: [
      'bağımlılık',
      'kısıtlama',
      'sistem',
      'alışkanlık',
      'kontrol dışı',
    ],
    context:
      'Kariyerinde bazı zincirler ve sınırlar kontrol edemeyeceğin koşullardır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_pos3',
    card: 'The Tower',
    position: 3,
    upright:
      'Kule, ani yıkımların ve krizlerin kontrolünde olmadığını söyler. Bazı değişimler kaçınılmazdır.',
    reversed:
      'Ters Kule, değişimden kaçsan bile dışsal faktörlerin seni zorlayabileceğini hatırlatır.',
    keywords: ['kriz', 'değişim', 'yıkım', 'özgürleşme', 'beklenmedik'],
    context: 'Kariyerinde krizleri her zaman engelleyemezsin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_pos3',
    card: 'The Star',
    position: 3,
    upright:
      'Yıldız, ilhamın ve umut ışığının bazen dışsal koşullarla açığa çıktığını gösterir. Sen her zaman süreci hızlandıramazsın.',
    reversed:
      'Ters Yıldız, ilham eksikliklerinin veya moral kaybının her zaman senin elinde olmadığını söyler.',
    keywords: ['umut', 'ilham', 'vizyon', 'moral', 'kontrol dışı'],
    context:
      'Kariyerinde umut ışığının açılması senin dışında faktörlere bağlı olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_pos3',
    card: 'The Moon',
    position: 3,
    upright:
      'Ay, belirsizliklerin ve yanılsamaların kaçınılmaz olduğunu söyler. Tüm gerçeği bilmek mümkün değildir.',
    reversed:
      'Ters Ay, korkuların veya yanlış algıların bazen dış koşullardan kaynaklanabileceğini gösterir.',
    keywords: ['belirsizlik', 'yanılsama', 'korku', 'gizem', 'kontrol dışı'],
    context:
      'Kariyerinde tüm netliği sen sağlayamazsın; belirsizlikler hep olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_pos3',
    card: 'The Sun',
    position: 3,
    upright:
      'Güneş, başarıların görünürlüğünün bazen başkalarının takdirine bağlı olduğunu hatırlatır. Işığın dışsal faktörlerle parlar.',
    reversed:
      'Ters Güneş, motivasyonunun düşmesi veya görünürlüğünün azalması bazen senin dışında gelişir.',
    keywords: ['başarı', 'görünürlük', 'iyimserlik', 'ışık', 'kontrol dışı'],
    context:
      'Kariyerinde her zaman kendi ışığını belirleyemezsin; dış koşullar etkili olur.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_pos3',
    card: 'Judgement',
    position: 3,
    upright:
      'Mahkeme, geçmişin sonuçları ve geri dönüşleri kontrol edemeyeceğin gerçeklerdir. Hesaplaşmalar kaçınılmazdır.',
    reversed:
      'Ters Mahkeme, geçmiş kararların yankılarının senin dışında devam edebileceğini gösterir.',
    keywords: [
      'geçmiş',
      'karar',
      'hesaplaşma',
      'yeniden doğuş',
      'kaçınılmazlık',
    ],
    context: 'Kariyerinde geçmişin sonuçlarını değiştiremezsin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_pos3',
    card: 'The World',
    position: 3,
    upright:
      'Dünya, tamamlanma ve döngülerin kapanışının senin dışında geliştiğini gösterir. Evrensel süreçler vardır.',
    reversed:
      'Ters Dünya, yarım kalmışlıkların ya da gecikmelerin bazen senin kontrolünde olmadığını söyler.',
    keywords: [
      'tamamlanma',
      'döngü',
      'kapanış',
      'evrensel süreç',
      'kontrol dışı',
    ],
    context: 'Kariyerinde bazı döngülerin bitişi senin elinde değildir.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_pos3',
    card: 'Ace of Cups',
    position: 3,
    upright:
      'Kupa Ası, duygusal ilhamın ya da kalpten gelen fırsatların her zaman senin kontrolünde olmadığını gösterir. İlham ne zaman doğarsa o zaman gelir.',
    reversed:
      'Ters Kupa Ası, duygusal tıkanıklıkların veya hayal kırıklıklarının doğal döngüsünü değiştiremeyeceğini hatırlatır.',
    keywords: ['ilham', 'duygu', 'başlangıç', 'sezgi', 'akış'],
    context: 'Kariyerinde duygusal ilhamın doğma zamanını sen belirleyemezsin.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_pos3',
    card: 'Two of Cups',
    position: 3,
    upright:
      'İki Kupa, iş ortaklıklarının ve ilişkilerdeki uyumun tamamen senin kontrolünde olmadığını söyler. Karşındaki kişinin tutumu belirleyicidir.',
    reversed:
      'Ters İki Kupa, uyumsuzluk ve anlaşmazlıkların bazen senin dışında geliştiğini gösterir.',
    keywords: ['ortaklık', 'uyum', 'denge', 'ilişkiler', 'kontrol dışı'],
    context: 'Kariyerinde ilişkilerdeki dengeyi her zaman sen belirleyemezsin.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_pos3',
    card: 'Three of Cups',
    position: 3,
    upright:
      'Üç Kupa, toplulukların ve kutlamaların dinamiklerinin senin dışında geliştiğini söyler. Her zaman çevrendeki destek ortamını kontrol edemezsin.',
    reversed:
      'Ters Üç Kupa, sosyal çevrendeki kopuklukların ya da yanlış anlaşılmaların bazen senin kontrolünde olmadığını gösterir.',
    keywords: ['topluluk', 'destek', 'kutlama', 'ilişki', 'bağlantı'],
    context:
      'Kariyerinde sosyal çevrenin sana sunduğu desteği sen kontrol edemezsin.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_pos3',
    card: 'Four of Cups',
    position: 3,
    upright:
      'Dört Kupa, fırsatların karşına çıkış zamanını kontrol edemeyeceğini gösterir. Bazen seçenekler dış koşullara bağlıdır.',
    reversed:
      'Ters Dört Kupa, farkındalığın açılması için doğru anı beklemen gerektiğini söyler; bu zamanlama senin elinde değildir.',
    keywords: ['fırsat', 'zamanlama', 'döngü', 'farkındalık', 'kontrol dışı'],
    context:
      'Kariyerinde bazı fırsatlar ancak zamanı geldiğinde görünür hale gelir.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_pos3',
    card: 'Five of Cups',
    position: 3,
    upright:
      'Beş Kupa, kayıpların ve hayal kırıklıklarının bazılarını değiştiremeyeceğini gösterir. Geçmişin etkisi senin kontrolünde değildir.',
    reversed:
      'Ters Beş Kupa, kayıpların ardından gelen fırsatların da zamanlamasının senin dışında olduğunu hatırlatır.',
    keywords: ['kayıp', 'hayal kırıklığı', 'geçmiş', 'ders', 'kontrol dışı'],
    context:
      'Kariyerinde bazı hayal kırıklıkları kaçınılmazdır; onları değiştiremezsin.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_pos3',
    card: 'Six of Cups',
    position: 3,
    upright:
      'Altı Kupa, geçmiş deneyimlerin ve çocukluk hayallerinin etkisini değiştiremeyeceğini söyler. Bunlar senin temelin.',
    reversed:
      'Ters Altı Kupa, geçmişe takılı kalmanın ya da nostaljinin senin dışında gelişen etkiler yaratabileceğini gösterir.',
    keywords: ['geçmiş', 'anı', 'nostalji', 'temel', 'kontrol dışı'],
    context: 'Kariyerinde geçmişin etkilerini tamamen değiştiremezsin.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_pos3',
    card: 'Seven of Cups',
    position: 3,
    upright:
      'Yedi Kupa, karşına çıkan hayallerin ve seçeneklerin bolluğunun her zaman senin kontrolünde olmadığını gösterir.',
    reversed:
      'Ters Yedi Kupa, kafa karışıklığının veya yanlış yönlendirmelerin bazen dışsal koşullardan kaynaklandığını söyler.',
    keywords: [
      'seçenek',
      'hayal',
      'fırsat',
      'kafa karışıklığı',
      'kontrol dışı',
    ],
    context: 'Kariyerinde önüne çıkan tüm seçenekleri sen belirleyemezsin.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_pos3',
    card: 'Eight of Cups',
    position: 3,
    upright:
      'Sekiz Kupa, seni tatmin etmeyen durumların bazılarının kaçınılmaz olduğunu gösterir. Bu duygusal kopuşlar kontrol dışıdır.',
    reversed:
      'Ters Sekiz Kupa, ayrılıkların ya da uzaklaşmaların zamanlamasının senin elinde olmadığını söyler.',
    keywords: [
      'kopuş',
      'tatminsizlik',
      'ayrılık',
      'farkındalık',
      'kontrol dışı',
    ],
    context:
      'Kariyerinde bazı ayrılıklar ya da bitişler senin kontrolünde değildir.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_pos3',
    card: 'Nine of Cups',
    position: 3,
    upright:
      'Dokuz Kupa, tatmin ve mutluluğun bazı koşullarının dış faktörlere bağlı olduğunu hatırlatır. Her dileğin senin elinde değildir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatminlerin ya da hayal kırıklıklarının bazen dış koşullardan kaynaklandığını gösterir.',
    keywords: ['tatmin', 'mutluluk', 'dilek', 'koşullar', 'kontrol dışı'],
    context: 'Kariyerinde tam tatmin duygusunu her zaman sen yaratamazsın.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_pos3',
    card: 'Ten of Cups',
    position: 3,
    upright:
      'On Kupa, iş ve özel yaşam dengeni etkileyen bazı unsurların kontrolünde olmadığını gösterir. Çevrendeki insanlar ve koşullar belirleyicidir.',
    reversed:
      'Ters On Kupa, uyum eksikliklerinin bazen senin dışında geliştiğini hatırlatır.',
    keywords: ['uyum', 'denge', 'aile', 'çevre', 'kontrol dışı'],
    context:
      'Kariyerinde tüm uyum ve dengeyi sen sağlayamazsın; dış koşullar da etkilidir.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_pos3',
    card: 'Page of Cups',
    position: 3,
    upright:
      'Kupa Prensi, ilhamın ve yaratıcı fikirlerin ne zaman ortaya çıkacağının senin kontrolünde olmadığını gösterir.',
    reversed:
      'Ters Kupa Prensi, hayal kırıklıklarının ya da ilham eksikliğinin doğal döngüsünün senin dışında geliştiğini söyler.',
    keywords: ['ilham', 'fikir', 'yaratıcılık', 'hayal', 'kontrol dışı'],
    context: 'Kariyerinde ilhamın gelişini tamamen sen belirleyemezsin.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_pos3',
    card: 'Knight of Cups',
    position: 3,
    upright:
      'Kupa Şövalyesi, idealist fırsatların ya da duygusal tekliflerin karşına çıkma zamanının senin elinde olmadığını söyler.',
    reversed:
      'Ters Kupa Şövalyesi, hayal kırıklıklarının bazen dışsal koşullardan kaynaklandığını gösterir.',
    keywords: ['ideal', 'fırsat', 'vizyon', 'hayal', 'kontrol dışı'],
    context: 'Kariyerinde bazı tekliflerin zamanlamasını değiştiremezsin.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_pos3',
    card: 'Queen of Cups',
    position: 3,
    upright:
      'Kupa Kraliçesi, çevrendeki insanların duygusal tepkilerinin senin kontrolünde olmadığını söyler.',
    reversed:
      'Ters Kupa Kraliçesi, başkalarının duygusal dengesizliklerinin seni etkilemesi kaçınılmaz olabilir.',
    keywords: ['empati', 'duygu', 'sezgi', 'etki', 'kontrol dışı'],
    context: 'Kariyerinde başkalarının duygusal tavırlarını değiştiremezsin.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_pos3',
    card: 'King of Cups',
    position: 3,
    upright:
      'Kupa Kralı, otorite konumundaki kişilerin duygusal tutumlarının senin dışında olduğunu gösterir.',
    reversed:
      'Ters Kupa Kralı, çevrende otorite sahiplerinin dengesiz kararlarının seni etkilemesi kaçınılmaz olabilir.',
    keywords: ['liderlik', 'otorite', 'duygu', 'denge', 'kontrol dışı'],
    context:
      'Kariyerinde liderlerin veya yöneticilerin tavırlarını sen belirleyemezsin.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_pos3',
    card: 'Ace of Swords',
    position: 3,
    upright:
      'Kılıç Ası, ani farkındalıkların ve zihinsel aydınlanmaların ne zaman geleceğini sen kontrol edemezsin. Bu içsel netlik kendi zamanında açığa çıkar.',
    reversed:
      'Ters Kılıç Ası, kafa karışıklığı veya iletişim engelleri bazen senin dışında gelişir.',
    keywords: ['aydınlanma', 'fikir', 'iletişim', 'netlik', 'kontrol dışı'],
    context:
      'Kariyerinde zihinsel açıklığın doğuşunu tamamen sen belirleyemezsin.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_pos3',
    card: 'Two of Swords',
    position: 3,
    upright:
      'İki Kılıç, seçeneklerin netleşme zamanını kontrol edemezsin. Bazen karar için koşulların olgunlaşmasını beklemen gerekir.',
    reversed:
      'Ters İki Kılıç, kafa karışıklığının ya da kararsızlığın dış faktörlerden kaynaklanabileceğini gösterir.',
    keywords: ['karar', 'ikilem', 'denge', 'bekleyiş', 'kontrol dışı'],
    context: 'Kariyerinde seçeneklerin netleşmesi senin dışında gelişebilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_pos3',
    card: 'Three of Swords',
    position: 3,
    upright:
      'Üç Kılıç, hayal kırıklıklarını veya kırgınlıkları kontrol edemezsin. Bu deneyimler kaçınılmazdır.',
    reversed:
      'Ters Üç Kılıç, geçmiş yaraların iyileşme süreci bazen senin dışında gelişir.',
    keywords: ['hayal kırıklığı', 'kayıp', 'acı', 'deneyim', 'kontrol dışı'],
    context:
      'Kariyerinde bazı üzüntüler kaçınılmazdır ve onları değiştiremezsin.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_pos3',
    card: 'Four of Swords',
    position: 3,
    upright:
      'Dört Kılıç, dinlenme ya da duraklama dönemlerinin bazen zorunlu olduğunu gösterir. Bu süreçler senin elinde değildir.',
    reversed:
      'Ters Dört Kılıç, tükenmişlik ya da zorunlu molalar senin kontrolünde değildir.',
    keywords: ['dinlenme', 'mola', 'zorunluluk', 'bekleyiş', 'kontrol dışı'],
    context: 'Kariyerinde bazı duraklamalar senin dışında gelişir.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_pos3',
    card: 'Five of Swords',
    position: 3,
    upright:
      'Beş Kılıç, tartışmaların ve çatışmaların yoğunluğunu her zaman sen kontrol edemezsin.',
    reversed:
      'Ters Beş Kılıç, yanlış anlaşılmalar veya haksızlıklar bazen senin dışında gelişir.',
    keywords: [
      'çatışma',
      'gerilim',
      'mücadele',
      'yanlış anlaşılma',
      'kontrol dışı',
    ],
    context: 'Kariyerinde tüm çatışmaların doğasını sen belirleyemezsin.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_pos3',
    card: 'Six of Swords',
    position: 3,
    upright:
      'Altı Kılıç, bir geçiş sürecinin ne zaman başlayacağını veya biteceğini kontrol edemezsin.',
    reversed:
      'Ters Altı Kılıç, zorunlu yolculuklar veya değişimler senin dışında gelişebilir.',
    keywords: ['geçiş', 'değişim', 'zorunluluk', 'yolculuk', 'kontrol dışı'],
    context: 'Kariyerinde bazı geçişler ve değişimler senin elinde değildir.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_pos3',
    card: 'Seven of Swords',
    position: 3,
    upright:
      'Yedi Kılıç, başkalarının dürüst olup olmayacağını kontrol edemezsin. Stratejilerini buna göre yapmalısın.',
    reversed:
      'Ters Yedi Kılıç, gizlenen gerçeklerin açığa çıkma zamanı senin elinde değildir.',
    keywords: ['strateji', 'dürüstlük', 'gizlilik', 'plan', 'kontrol dışı'],
    context:
      'Kariyerinde başkalarının dürüstlüğünü veya gizli niyetlerini değiştiremezsin.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_pos3',
    card: 'Eight of Swords',
    position: 3,
    upright:
      'Sekiz Kılıç, bazı kısıtlamaların ve zihinsel blokajların dış koşullardan kaynaklandığını gösterir.',
    reversed:
      'Ters Sekiz Kılıç, özgürleşme zamanının senin dışında gelişebileceğini söyler.',
    keywords: [
      'kısıtlama',
      'engeller',
      'zihinsel blokaj',
      'özgürlük',
      'kontrol dışı',
    ],
    context: 'Kariyerinde bazı engelleri kendi başına ortadan kaldıramazsın.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_pos3',
    card: 'Nine of Swords',
    position: 3,
    upright:
      'Dokuz Kılıç, kaygıların bazen dış koşullardan kaynaklanabileceğini gösterir. Tüm stresi sen yönetemezsin.',
    reversed:
      'Ters Dokuz Kılıç, korkuların ve endişelerin azalması dışsal faktörlere de bağlı olabilir.',
    keywords: ['kaygı', 'endişe', 'stres', 'zorunluluk', 'kontrol dışı'],
    context:
      'Kariyerinde tüm kaygılarını ortadan kaldıramazsın; bazıları dışsal etkilerden gelir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_pos3',
    card: 'Ten of Swords',
    position: 3,
    upright:
      'On Kılıç, bazı bitişlerin ve kayıpların kaçınılmaz olduğunu gösterir. Bu süreçleri kontrol edemezsin.',
    reversed:
      'Ters On Kılıç, toparlanma sürecinin de zamanlaması senin elinde değildir.',
    keywords: [
      'bitiş',
      'yenilenme',
      'zorunluluk',
      'kaçınılmazlık',
      'kontrol dışı',
    ],
    context:
      'Kariyerinde bazı bitişleri değiştiremezsin; onlar doğal döngüdür.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_pos3',
    card: 'Page of Swords',
    position: 3,
    upright:
      'Kılıç Prensi, bilgiye ulaşma sürecinin veya haberlerin geliş zamanını kontrol edemezsin.',
    reversed:
      'Ters Kılıç Prensi, yanlış bilgilendirmelerin bazen dış koşullardan kaynaklandığını gösterir.',
    keywords: ['bilgi', 'haber', 'öğrenme', 'iletişim', 'kontrol dışı'],
    context: 'Kariyerinde tüm bilgilerin zamanlamasını sen belirleyemezsin.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_pos3',
    card: 'Knight of Swords',
    position: 3,
    upright:
      'Kılıç Şövalyesi, hızlı gelişmelerin ve beklenmedik fırsatların ne zaman geleceğini kontrol edemezsin.',
    reversed:
      'Ters Kılıç Şövalyesi, yön değişikliklerinin bazen senin dışında geliştiğini söyler.',
    keywords: ['hız', 'fırsat', 'beklenmedik', 'aksiyon', 'kontrol dışı'],
    context: 'Kariyerinde ani gelişmeleri tamamen kontrol edemezsin.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_pos3',
    card: 'Queen of Swords',
    position: 3,
    upright:
      'Kılıç Kraliçesi, başkalarının düşüncelerini veya objektiflik seviyelerini kontrol edemezsin.',
    reversed:
      'Ters Kılıç Kraliçesi, çevrendeki soğukluk veya yanlış yargılar senin dışında gelişir.',
    keywords: ['mantık', 'yargı', 'objektiflik', 'iletişim', 'kontrol dışı'],
    context:
      'Kariyerinde başkalarının mantığını veya yargılarını değiştiremezsin.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_pos3',
    card: 'King of Swords',
    position: 3,
    upright:
      'Kılıç Kralı, otorite figürlerinin verdiği stratejik kararları kontrol edemezsin.',
    reversed:
      'Ters Kılıç Kralı, baskıcı ya da adil olmayan kararların senin dışında geliştiğini gösterir.',
    keywords: ['otorite', 'karar', 'strateji', 'yargı', 'kontrol dışı'],
    context: 'Kariyerinde liderlerin kararlarını sen değiştiremezsin.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_pos3',
    card: 'Ace of Wands',
    position: 3,
    upright:
      'Asa Ası, ilhamın ve enerji patlamalarının ne zaman geleceğini kontrol edemezsin. Fırsatlar bazen kendiliğinden ortaya çıkar.',
    reversed:
      'Ters Asa Ası, tıkanıklıklar veya gecikmeler senin elinde değildir. İlham kaynağının ne zaman açılacağı doğal döngülere bağlıdır.',
    keywords: ['ilham', 'enerji', 'fırsat', 'başlangıç', 'kontrol dışı'],
    context: 'Kariyerinde ilhamın ve enerjinin gelişini sen belirleyemezsin.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_pos3',
    card: 'Two of Wands',
    position: 3,
    upright:
      'İki Asa, dışsal fırsatların ve uzun vadeli gelişim alanlarının açılma zamanını kontrol edemezsin.',
    reversed:
      'Ters İki Asa, geleceğe dair bazı belirsizlikler ve fırsat eksiklikleri senin dışında gelişir.',
    keywords: ['plan', 'vizyon', 'fırsat', 'belirsizlik', 'kontrol dışı'],
    context:
      'Kariyerinde ufkunu genişletecek fırsatların doğuşunu kontrol edemezsin.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_pos3',
    card: 'Three of Wands',
    position: 3,
    upright:
      'Üç Asa, uzak fırsatların veya uluslararası bağlantıların gelişini kontrol edemezsin. Onlar kendi zamanında açığa çıkar.',
    reversed:
      'Ters Üç Asa, dış koşullar nedeniyle ertelenen projeler senin kontrolünde değildir.',
    keywords: ['genişleme', 'fırsat', 'bekleyiş', 'zamanlama', 'kontrol dışı'],
    context:
      'Kariyerinde bazı büyük fırsatlar ancak kendi zamanında ortaya çıkar.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_pos3',
    card: 'Four of Wands',
    position: 3,
    upright:
      'Dört Asa, çevrendeki kutlama, destek ve birlik ortamını her zaman sen kontrol edemezsin.',
    reversed:
      'Ters Dört Asa, uyum eksikliği veya destek azlığı senin dışında gelişebilir.',
    keywords: ['destek', 'kutlama', 'uyum', 'topluluk', 'kontrol dışı'],
    context: 'Kariyerinde topluluk desteğini her zaman sen belirleyemezsin.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_pos3',
    card: 'Five of Wands',
    position: 3,
    upright:
      'Beş Asa, rekabetin yoğunluğunu veya çatışmaların doğasını kontrol edemezsin. Bunlar dışsal faktörlerdir.',
    reversed:
      'Ters Beş Asa, uyumsuzluk ve mücadele ortamlarının senin dışında geliştiğini gösterir.',
    keywords: ['rekabet', 'çatışma', 'mücadele', 'gerilim', 'kontrol dışı'],
    context: 'Kariyerinde rekabetin yoğunluğunu sen belirleyemezsin.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_pos3',
    card: 'Six of Wands',
    position: 3,
    upright:
      'Altı Asa, başkalarının sana vereceği takdir ve övgülerin senin kontrolünde olmadığını gösterir.',
    reversed:
      'Ters Altı Asa, hak ettiğin değeri görmemen bazen dışsal koşullardan kaynaklanır.',
    keywords: ['takdir', 'başarı', 'görünürlük', 'destek', 'kontrol dışı'],
    context: 'Kariyerinde ne kadar takdir göreceğini sen belirleyemezsin.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_pos3',
    card: 'Seven of Wands',
    position: 3,
    upright:
      'Yedi Asa, karşına çıkan mücadelelerin yoğunluğunu kontrol edemezsin. Ne kadar savunma yapman gerektiğini koşullar belirler.',
    reversed:
      'Ters Yedi Asa, dışsal baskıların ve zorlamaların kaçınılmaz olduğunu gösterir.',
    keywords: ['savunma', 'mücadele', 'direnç', 'baskı', 'kontrol dışı'],
    context: 'Kariyerinde mücadelelerin yoğunluğu senin elinde değildir.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_pos3',
    card: 'Eight of Wands',
    position: 3,
    upright:
      'Sekiz Asa, hızlı gelişmelerin ve ani ilerlemelerin zamanlamasını kontrol edemezsin.',
    reversed:
      'Ters Sekiz Asa, gecikmeler ve iletişim aksaklıkları senin elinde değildir.',
    keywords: ['hız', 'iletişim', 'fırsat', 'zamanlama', 'kontrol dışı'],
    context: 'Kariyerinde süreçlerin hızını tamamen sen belirleyemezsin.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_pos3',
    card: 'Nine of Wands',
    position: 3,
    upright:
      'Dokuz Asa, karşına çıkan engellerin sayısını ve yoğunluğunu kontrol edemezsin. Direnç göstermek zorundasın.',
    reversed:
      'Ters Dokuz Asa, dışsal baskılar ve yorgunluklar senin elinde değildir.',
    keywords: [
      'direnç',
      'engeller',
      'yorgunluk',
      'dayanıklılık',
      'kontrol dışı',
    ],
    context:
      'Kariyerinde karşına çıkan engellerin yoğunluğunu değiştiremezsin.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_pos3',
    card: 'Ten of Wands',
    position: 3,
    upright:
      'On Asa, sana yüklenen sorumlulukların bir kısmı senin kontrolünde değildir. Bazen sistem seni zorlayabilir.',
    reversed:
      'Ters On Asa, fazladan yüklerin bazen dış koşullar tarafından dayatıldığını gösterir.',
    keywords: ['yük', 'sorumluluk', 'baskı', 'çaba', 'kontrol dışı'],
    context: 'Kariyerinde taşıdığın bazı yükler senin dışında belirlenir.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_pos3',
    card: 'Page of Wands',
    position: 3,
    upright:
      'Asa Prensi, yeni fırsatların doğma zamanını kontrol edemezsin. Fırsatlar kendi anında gelir.',
    reversed:
      'Ters Asa Prensi, ilham eksikliklerinin ve gecikmelerin dış koşullardan kaynaklanabileceğini gösterir.',
    keywords: ['ilham', 'fırsat', 'yeni yol', 'zamanlama', 'kontrol dışı'],
    context:
      'Kariyerinde yeni fırsatların açılma zamanını sen belirleyemezsin.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_pos3',
    card: 'Knight of Wands',
    position: 3,
    upright:
      'Asa Şövalyesi, ani fırsatların karşına çıkışını kontrol edemezsin. Enerji patlamaları kendiliğinden olur.',
    reversed:
      'Ters Asa Şövalyesi, dış koşullardan gelen engeller seni yavaşlatabilir.',
    keywords: ['enerji', 'fırsat', 'hareket', 'ani gelişme', 'kontrol dışı'],
    context: 'Kariyerinde bazı ani fırsatlar senin dışında gerçekleşir.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_pos3',
    card: 'Queen of Wands',
    position: 3,
    upright:
      'Asa Kraliçesi, çevrendekilerin sana duyduğu güveni ve desteği her zaman kontrol edemezsin.',
    reversed:
      'Ters Asa Kraliçesi, başkalarının kıskançlıkları ya da güvensizlikleri senin dışında gelişebilir.',
    keywords: ['güven', 'destek', 'liderlik', 'saygı', 'kontrol dışı'],
    context: 'Kariyerinde başkalarının sana duyduğu güveni belirleyemezsin.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_pos3',
    card: 'King of Wands',
    position: 3,
    upright:
      'Asa Kralı, liderlerin veya güçlü figürlerin kararlarını kontrol edemezsin. Onların vizyonu seni de etkiler.',
    reversed:
      'Ters Asa Kralı, otorite konumundaki kişilerin baskıcı tutumları senin kontrolünde değildir.',
    keywords: ['liderlik', 'otorite', 'vizyon', 'güç', 'kontrol dışı'],
    context: 'Kariyerinde güçlü liderlerin kararlarını sen değiştiremezsin.',
    group: 'Asalar',
  },
  {
    id: 'ace_of_pentacles_pos3',
    card: 'Ace of Pentacles',
    position: 3,
    upright:
      'Tılsım Ası, maddi fırsatların ya da yeni iş olanaklarının karşına çıkma zamanını kontrol edemezsin.',
    reversed:
      'Ters Tılsım Ası, kaçan fırsatlar veya gecikmeler senin kontrolünde değildir.',
    keywords: ['fırsat', 'maddi koşullar', 'başlangıç', 'şans', 'kontrol dışı'],
    context:
      'Kariyerinde maddi fırsatların ortaya çıkışı senin dışında gerçekleşir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pos3',
    card: 'Two of Pentacles',
    position: 3,
    upright:
      'İki Tılsım, birden fazla sorumluluğun aynı anda gelmesini kontrol edemezsin. Bu yoğunluk bazen kaçınılmazdır.',
    reversed:
      'Ters İki Tılsım, dengesizlikler ve aşırı yüklenmeler senin dışında gelişebilir.',
    keywords: ['denge', 'yoğunluk', 'sorumluluk', 'esneklik', 'kontrol dışı'],
    context:
      'Kariyerinde birden fazla işi aynı anda üstlenmek bazen kaçınılmazdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pos3',
    card: 'Three of Pentacles',
    position: 3,
    upright:
      'Üç Tılsım, birlikte çalıştığın insanların katkı seviyesini kontrol edemezsin. İşbirliği tamamen senin elinde değildir.',
    reversed:
      'Ters Üç Tılsım, uyumsuzluk ya da yetersizlikler bazen dış koşullardan kaynaklanır.',
    keywords: ['işbirliği', 'takım', 'destek', 'katkı', 'kontrol dışı'],
    context:
      'Kariyerinde işbirliklerinin kalitesini her zaman sen belirleyemezsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pos3',
    card: 'Four of Pentacles',
    position: 3,
    upright:
      'Dört Tılsım, ekonomik dalgalanmaların ya da güven ihtiyacının doğal döngülerini kontrol edemezsin.',
    reversed:
      'Ters Dört Tılsım, kaygılarının veya maddi kısıtlamaların bazen dışsal faktörlerden geldiğini gösterir.',
    keywords: ['güvenlik', 'ekonomi', 'tasarruf', 'kısıtlama', 'kontrol dışı'],
    context: 'Kariyerinde ekonomik dalgalanmaları değiştiremezsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pos3',
    card: 'Five of Pentacles',
    position: 3,
    upright:
      'Beş Tılsım, maddi zorlukların ya da destek eksikliğinin bazılarını kontrol edemezsin.',
    reversed:
      'Ters Beş Tılsım, toparlanma fırsatlarının zamanlaması senin dışında gelişir.',
    keywords: [
      'kayıp',
      'maddi zorluk',
      'destek',
      'dışsal etki',
      'kontrol dışı',
    ],
    context:
      'Kariyerinde bazı maddi kayıplar ya da destek eksiklikleri kaçınılmazdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pos3',
    card: 'Six of Pentacles',
    position: 3,
    upright:
      'Altı Tılsım, alacağın destek veya yardımın miktarını kontrol edemezsin. Başkalarının cömertliği onların elindedir.',
    reversed:
      'Ters Altı Tılsım, adaletsiz paylaşımlar ya da dengesizlikler senin dışında gelişir.',
    keywords: ['yardım', 'paylaşım', 'adalet', 'denge', 'kontrol dışı'],
    context:
      'Kariyerinde başkalarının desteğini veya cömertliğini sen belirleyemezsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pos3',
    card: 'Seven of Pentacles',
    position: 3,
    upright:
      'Yedi Tılsım, sonuçların ne zaman ortaya çıkacağını kontrol edemezsin. Emeklerinin meyvesi kendi zamanında gelir.',
    reversed:
      'Ters Yedi Tılsım, gecikmeler ve bekleyişler senin elinde değildir.',
    keywords: ['sabır', 'bekleyiş', 'sonuç', 'yatırım', 'kontrol dışı'],
    context: 'Kariyerinde emeklerinin sonuçlanma zamanını sen belirleyemezsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pos3',
    card: 'Eight of Pentacles',
    position: 3,
    upright:
      'Sekiz Tılsım, iş yükünün yoğunluğu ya da öğrenme süreçlerinin uzunluğu senin kontrolünde değildir.',
    reversed:
      'Ters Sekiz Tılsım, gelişim hızının zaman zaman yavaşlaması senin dışında gelişir.',
    keywords: ['çalışma', 'öğrenme', 'uzmanlık', 'yoğunluk', 'kontrol dışı'],
    context: 'Kariyerinde öğrenme sürecinin uzunluğunu kontrol edemezsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pos3',
    card: 'Nine of Pentacles',
    position: 3,
    upright:
      'Dokuz Tılsım, dışsal ekonomik koşullar veya bağımsızlık fırsatlarının oluşma zamanını kontrol edemezsin.',
    reversed:
      'Ters Dokuz Tılsım, bağımsızlığını etkileyen dış faktörler kaçınılmaz olabilir.',
    keywords: ['bağımsızlık', 'ekonomi', 'başarı', 'bolluk', 'kontrol dışı'],
    context: 'Kariyerinde maddi bağımsızlığını tamamen sen belirleyemezsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pos3',
    card: 'Ten of Pentacles',
    position: 3,
    upright:
      'On Tılsım, ailevi ve toplumsal mirasların kariyerindeki etkisini kontrol edemezsin. Bunlar doğal altyapındır.',
    reversed:
      'Ters On Tılsım, köklü yapıların ve geleneklerin üzerindeki etkisi senin elinde değildir.',
    keywords: ['miras', 'aile', 'toplum', 'köklülük', 'kontrol dışı'],
    context: 'Kariyerinde aile ve toplum etkilerini tamamen değiştiremezsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pos3',
    card: 'Page of Pentacles',
    position: 3,
    upright:
      'Tılsım Prensi, öğrenme fırsatlarının ya da yeni projelerin doğma zamanını sen kontrol edemezsin.',
    reversed:
      'Ters Tılsım Prensi, ilham ya da eğitim fırsatlarının eksikliği senin dışında gelişebilir.',
    keywords: ['öğrenme', 'başlangıç', 'fırsat', 'eğitim', 'kontrol dışı'],
    context:
      'Kariyerinde yeni öğrenme fırsatlarının doğuşunu sen belirleyemezsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pos3',
    card: 'Knight of Pentacles',
    position: 3,
    upright:
      'Tılsım Şövalyesi, iş yükünün ritmini ya da görevlerin hızını her zaman kontrol edemezsin.',
    reversed:
      'Ters Tılsım Şövalyesi, monotonluk veya yavaş ilerleme bazen kaçınılmazdır.',
    keywords: ['çalışma', 'ritim', 'süreç', 'sorumluluk', 'kontrol dışı'],
    context: 'Kariyerinde işlerin hızını her zaman sen belirleyemezsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pos3',
    card: 'Queen of Pentacles',
    position: 3,
    upright:
      'Tılsım Kraliçesi, çevrendeki insanların desteğini veya şefkatini kontrol edemezsin.',
    reversed:
      'Ters Tılsım Kraliçesi, başkalarının maddiyatçı tutumları senin dışında gelişebilir.',
    keywords: ['destek', 'bereket', 'toplum', 'yardım', 'kontrol dışı'],
    context: 'Kariyerinde çevrendekilerin yaklaşımını değiştiremezsin.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pos3',
    card: 'King of Pentacles',
    position: 3,
    upright:
      'Tılsım Kralı, ekonomik sistemin ve liderlerin kararlarının senin dışında olduğunu gösterir.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrolcü veya baskıcı liderlerin tavırlarını değiştiremezsin.',
    keywords: ['liderlik', 'ekonomi', 'otorite', 'sistem', 'kontrol dışı'],
    context: 'Kariyerinde ekonomik sistemin kurallarını sen belirleyemezsin.',
    group: 'Tılsımlar',
  },
];

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nPosition3Meanings = (): I18nCareerPositionMeaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position3Meanings.map(meaning => {
    // i18n'den çevirileri al
    const i18nUpright = getCardMeaning(meaning.card, 3, 'upright');
    const i18nReversed = getCardMeaning(meaning.card, 3, 'reversed');
    const i18nKeywords = getCardKeywords(meaning.card, 3);
    const i18nContext = getCardContext(meaning.card, 3);
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
export const getI18nPosition3Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nCareerPositionMeaning | null => {
  const originalMeaning = position3Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`career.meanings.${cardKey}.position3.upright`);
  const i18nReversed = t(`career.meanings.${cardKey}.position3.reversed`);
  const i18nKeywords = t(`career.meanings.${cardKey}.position3.keywords`);
  const i18nContext = t(`career.meanings.${cardKey}.position3.context`);
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
