// Bu dosya, Aşk açılımında Pozisyon 3 (Duygusal/Ruhsal Bağlantı) için özel kart anlamlarını içerir.
// Her kartın bu pozisyonda ne anlama geldiği tanımlanmıştır.
// i18n desteği için güncellenmiştir.

import { useLoveTranslations } from './i18n-helper';

export interface LovePositionMeaning {
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
export interface I18nLovePositionMeaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position3Meanings: LovePositionMeaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_pos3',
    card: 'The Fool',
    position: 3,
    upright:
      'Duygusal ve ruhsal olarak yeni bir yolculuğun başlangıcındasınız. Bu bağ, beklentisiz, saf ve maceracı bir ruhla gelişiyor. Birbirinize karşı tamamen açık ve yargısızsınız.',
    reversed:
      'Ters Fool, duygusal olarak bağlanmaktan korktuğunuzu veya ruhsal bir bağ kurma konusunda düşüncesiz davrandığınızı gösterir. Bu bağlantının ciddiyetinden kaçıyorsunuz.',
    keywords: [
      'yeni başlangıç',
      'masumiyet',
      'ruhsal macera',
      'beklentisizlik',
      'güven',
    ],
    context:
      'Duygusal bağınız, bilinmeyene atlayan iki ruhun neşeli ve öngörülemez yolculuğu.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_pos3',
    card: 'The Magician',
    position: 3,
    upright:
      'Aranızda güçlü bir irade ve bilinçli bir yaratım enerjisi var. Duygusal ve ruhsal olarak ne istediğinizi biliyor ve bu bağı aktif olarak şekillendiriyorsunuz. Güçlü bir zihinsel ve ruhsal senkronizasyon.',
    reversed:
      'Ters Magician, aranızdaki duygusal bağın bir tarafça manipüle edildiğini veya ruhsal potansiyelinizin kullanılmadığını gösterir. Duygusal güç oyunları olabilir.',
    keywords: [
      'bilinçli yaratım',
      'ruhsal senkronizasyon',
      'irade',
      'iletişim',
      'güçlü bağ',
    ],
    context:
      'Duygusal bağınız, iki güçlü iradenin birlikte bir dünya yarattığı bir alan.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_pos3',
    card: 'The High Priestess',
    position: 3,
    upright:
      'Aranızda kelimelerin ötesinde, derin ve sezgisel bir ruhsal bağ var. Birbirinizin düşüncelerini ve hislerini konuşmadan anlıyorsunuz. Bu bağ gizemli ve derindir.',
    reversed:
      'Ters High Priestess, aranızda saklanan sırlar veya duygusal bir mesafenin olduğunu gösterir. Sezgisel olarak birbirinize kapalı, ruhsal olarak güvensizsiniz.',
    keywords: [
      'sezgisel bağ',
      'ruhsal anlayış',
      'gizem',
      'telepati',
      'söylenmemiş sırlar',
    ],
    context:
      'Ruhsal bağınız, sadece kalplerin anlayabildiği, sessiz ve derin bir fısıltı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_pos3',
    card: 'The Empress',
    position: 3,
    upright:
      'Duygusal bağınız son derece besleyici, şefkatli ve sıcak. Birbirinizin ruhunu büyütüyor ve duygusal olarak güvende hissettiriyorsunuz. Bu, sevginin ve şefkatin filizlendiği verimli bir toprak.',
    reversed:
      'Ters Empress, duygusal olarak boğucu bir sevgi, aşırı sahiplenme veya duygusal ihtiyaçların karşılanmadığı bir ilişkiyi gösterir. Ruhsal olarak gelişim durmuş olabilir.',
    keywords: [
      'besleyici sevgi',
      'şefkat',
      'duygusal güvenlik',
      'büyüme',
      'verimlilik',
    ],
    context:
      'Duygusal bağınız, birbirini sevgiyle besleyen ve büyüten, bereketli bir anne kucağı gibi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_pos3',
    card: 'The Emperor',
    position: 3,
    upright:
      'Duygusal bağınız sağlam temeller, istikrar ve karşılıklı saygı üzerine kurulu. Birbirinize karşı koruyucu ve sadıksınız. Bu, güven veren, yapılandırılmış bir ruhsal ortaklık.',
    reversed:
      'Ters Emperor, aranızda duygusal bir katılık, kontrol savaşları veya şefkat eksikliği olduğunu gösterir. Duygular ifade edilmiyor, ruhsal bağ zayıf kalıyor.',
    keywords: [
      'istikrar',
      'güven',
      'koruyuculuk',
      'sağlam temeller',
      'sadakat',
    ],
    context:
      'Duygusal bağınız, fırtınalara dayanacak kadar sağlam inşa edilmiş bir kale.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_pos3',
    card: 'The Hierophant',
    position: 3,
    upright:
      'Aranızda ortak inançlar, değerler ve gelenekler üzerine kurulu bir ruhsal bağ var. Bu ilişki, sizin için daha yüksek bir anlam taşıyor ve birbirinize ruhsal öğretmenlik yapıyorsunuz.',
    reversed:
      'Ters Hierophant, ruhsal veya ahlaki konularda bir çatışma yaşadığınızı gösterir. Değerleriniz uyuşmuyor ve bu durum duygusal bir uzaklaşmaya neden oluyor.',
    keywords: [
      'ruhsal ortaklık',
      'ortak inançlar',
      'değerler',
      'öğretmenlik',
      'bağlılık',
    ],
    context:
      'Ruhsal bağınız, ortak bir inanç sisteminde birleşen iki müridin yol arkadaşlığı gibi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_pos3',
    card: 'The Lovers',
    position: 3,
    upright:
      'Aranızda derin bir ruhsal ve duygusal uyum var. Bu, bir ruh eşi veya ikiz alev bağlantısını, kalplerin ve zihinlerin mükemmel birliğini temsil eder. Duygusal olarak birbirinizi tamamlıyorsunuz.',
    reversed:
      'Ters Aşıklar, aranızda duygusal bir uyumsuzluk veya ruhsal bir kopukluk olduğunu gösterir. Değerleriniz veya kalpleriniz farklı yönlere bakıyor olabilir. Yanlış bir duygusal seçim.',
    keywords: [
      'ruh eşi',
      'duygusal uyum',
      'derin bağ',
      'kalp seçimi',
      'birlik',
    ],
    context:
      'Duygusal bağınız, iki ruhun bir araya gelerek tek bir bütün oluşturduğu kutsal bir birliktelik.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_pos3',
    card: 'The Chariot',
    position: 3,
    upright:
      'Duygusal olarak aynı hedefe kilitlenmiş durumdasınız. Aranızdaki ruhsal bağ, ortak bir amaç doğrultusunda ilerlemenizi sağlıyor. Bu, zorlukların üstesinden birlikte gelen güçlü bir ekip ruhu.',
    reversed:
      'Ters Chariot, duygusal hedeflerinizin farklı yönlere gittiğini veya aranızda bir güç mücadelesi olduğunu gösterir. Ruhsal olarak aynı yolda ilerleyemiyorsunuz.',
    keywords: [
      'ortak hedef',
      'güçlü irade',
      'duygusal birlik',
      'ilerleme',
      'kararlılık',
    ],
    context:
      'Duygusal bağınız, aynı hedefe doğru birlikte yol alan, güçlü ve kararlı bir savaş arabası.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_pos3',
    card: 'Strength',
    position: 3,
    upright:
      'Duygusal bağınız şefkat, sabır ve derin bir içsel güç üzerine kurulu. Birbirinizin en vahşi yönlerini bile sevgiyle kabul ediyor ve sakinleştiriyorsunuz. Bu, ruhu iyileştiren bir bağ.',
    reversed:
      'Ters Strength, duygusal olarak birbirinize karşı güvensizlik veya zayıflık gösterdiğinizi işaret eder. Birbirinizin ruhsal gücünü tüketiyor olabilirsiniz.',
    keywords: ['şefkatli güç', 'sabır', 'kabul', 'ruhsal şifa', 'içsel güç'],
    context:
      'Duygusal bağınız, en zorlu duyguları bile şefkatle evcilleştiren, iyileştirici bir dokunuş.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_pos3',
    card: 'The Hermit',
    position: 3,
    upright:
      'Aranızda duygusal bir mesafe veya her iki tarafın da kendi içine döndüğü bir dönem var. Bağlantınız, birbirinizin ruhsal yolculuğuna saygı duymak üzerine kurulu olabilir. Derin ama sessiz bir bağ.',
    reversed:
      'Ters Ermiş, birinin yalnızlık korkusuyla diğerine yapıştığını veya duygusal olarak kendini zorla izole ettiğini gösterir. Ruhsal bir bağlantı kurulamıyor.',
    keywords: [
      'duygusal mesafe',
      'içe dönüş',
      'ruhsal arayış',
      'yalnızlık',
      'saygı',
    ],
    context:
      'Duygusal bağınız, birbirine alan tanıyan iki ruhun kendi içsel ışığını aradığı bir yolculuk.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_pos3',
    card: 'The Wheel of Fortune',
    position: 3,
    upright:
      'Bu, karmik bir ruhsal bağlantıdır. Kader sizi bir araya getirmiştir ve bu ilişkinin ruhsal evriminizde önemli bir rolü vardır. Bağlantınız sürekli bir değişim ve büyüme içinde.',
    reversed:
      'Ters The Wheel of Fortune, ilişkinin ruhsal bir döngüde takılıp kaldığını veya olumsuz bir karmik deseni tekrarladığınızı gösterir. Değişime direniyorsunuz.',
    keywords: ['karmik bağ', 'kader', 'ruhsal döngü', 'değişim', 'evrim'],
    context:
      'Ruhsal bağınız, kaderin bir araya getirdiği ve birlikte bir döngüyü tamamlamanız gereken iki ruh.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_pos3',
    card: 'Justice',
    position: 3,
    upright:
      'Duygusal bağınız dürüstlük, denge ve karşılıklı anlayış üzerine kurulu. Aranızda açık bir iletişim var ve her iki taraf da duygusal sorumluluk alıyor. Bu, adil bir ruhsal sözleşmedir.',
    reversed:
      'Ters Justice, duygusal bir adaletsizlik veya dengesizlik olduğunu gösterir. Bir taraf haksızlığa uğradığını hissediyor veya geçmişin hataları affedilmiyor.',
    keywords: [
      'duygusal adalet',
      'dürüstlük',
      'denge',
      'sorumluluk',
      'açık iletişim',
    ],
    context:
      'Duygusal bağınız, her iki ruhun da hak ettiğini aldığı ve verdiği adil bir terazi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_pos3',
    card: 'The Hanged Man',
    position: 3,
    upright:
      'Duygusal olarak bir duraklama veya fedakarlık dönemindesiniz. Bu bağ, size olaylara farklı bir ruhsal perspektiften bakmayı öğretiyor. İlerleme, teslimiyetle gelecek.',
    reversed:
      'Ters Hanged Man, duygusal bir çıkmazda olduğunuzu veya bir tarafın boşuna fedakarlık yaptığını gösterir. Ruhsal olarak ilerleyemiyorsunuz, takılıp kalmışsınız.',
    keywords: [
      'ruhsal perspektif',
      'teslimiyet',
      'fedakarlık',
      'duraklama',
      'bekleyiş',
    ],
    context:
      'Duygusal bağınız, daha derin bir anlayışa ulaşmak için askıya alınmış bir an.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_pos3',
    card: 'Death',
    position: 3,
    upright:
      'Bu duygusal bağ, derin bir dönüşüm geçiriyor. İlişkinin eski hali ölüyor ve tamamen yeni bir ruhsal temel üzerine yeniden doğuyor. Bu, kaçınılmaz ve şifalı bir değişim.',
    reversed:
      'Ters Death, gerekli olan duygusal bir sonlanmaya veya değişime direndiğinizi gösterir. Bu durum, ruhsal olarak çürümenize neden oluyor.',
    keywords: [
      'duygusal dönüşüm',
      'bitiş ve başlangıç',
      'yeniden doğuş',
      'ruhsal temizlik',
      'değişim',
    ],
    context:
      'Duygusal bağınız, küllerinden yeniden doğan bir anka kuşu gibi, köklü bir dönüşümün içinde.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_pos3',
    card: 'Temperance',
    position: 3,
    upright:
      'Aranızda harika bir duygusal ve ruhsal denge var. Birbirinizin enerjilerini mükemmel bir şekilde harmanlıyor ve şifalandırıyorsunuz. Bu, sakin, huzurlu ve uyumlu bir bağ.',
    reversed:
      'Ters Temperance, aranızda duygusal bir dengesizlik veya çatışma olduğunu gösterir. Enerjileriniz birbiriyle uyumlu değil, bu da ruhsal bir gerginliğe yol açıyor.',
    keywords: ['duygusal denge', 'uyum', 'ruhsal şifa', 'harmanlanma', 'huzur'],
    context:
      'Duygusal bağınız, iki farklı ruhun birleşerek yarattığı şifalı ve dengeli bir iksir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_pos3',
    card: 'The Devil',
    position: 3,
    upright:
      'Aranızda yoğun, tutkulu ve bağımlılık yaratan bir duygusal bağ var. Bu, gölge yönlerinizle yüzleşmenizi sağlayan, karmik ve zorlayıcı bir ruhsal ders olabilir. Birbirinize güçlü bir şekilde bağlısınız.',
    reversed:
      'Ters Devil, aranızdaki sağlıksız duygusal veya ruhsal bağları kırmaya başladığınızı gösterir. Bir bağımlılıktan özgürleşme veya bir takıntının sona ermesi.',
    keywords: [
      'yoğun tutku',
      'bağımlılık',
      'karmik ders',
      'gölge yönler',
      'takıntı',
    ],
    context:
      'Ruhsal bağınız, sizi birbirine görünmez zincirlerle bağlayan, kaçınılmaz bir çekim gücü.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_pos3',
    card: 'The Tower',
    position: 3,
    upright:
      'Duygusal ve ruhsal bağınızda ani ve sarsıcı bir aydınlanma yaşanıyor. Bu, ilişkinin temelini sarsan bir gerçeğin ortaya çıkması veya ani bir kopuş olabilir. Bu yıkım, yeni ve daha dürüst bir bağ için gereklidir.',
    reversed:
      'Ters Tower, kaçınılmaz bir duygusal yüzleşmeden veya krizden kaçtığınızı gösterir. Bu durum, bastırılmış enerjinin daha büyük bir patlamaya yol açmasına neden olabilir.',
    keywords: [
      'ani aydınlanma',
      'duygusal yıkım',
      'yüzleşme',
      'kriz',
      'temellerin sarsılması',
    ],
    context:
      'Duygusal bağınız, sahte temeller üzerine kurulu bir kulenin yıkılışı gibi ani ve şok edici.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_pos3',
    card: 'The Star',
    position: 3,
    upright:
      'Aranızda umut dolu, ilham verici ve şifalı bir ruhsal bağ var. Birbirinizin en iyi yönlerini ortaya çıkarıyor ve geleceğe dair ortak bir umut besliyorsunuz. Bu, evren tarafından kutsanmış bir bağlantı.',
    reversed:
      'Ters Star, duygusal olarak umudunuzu kaybettiğinizi veya ruhsal bir kopukluk yaşadığınızı gösterir. Aranızdaki ilham kaynağı kurumuş olabilir.',
    keywords: ['umut', 'ilham', 'ruhsal şifa', 'inanç', 'kutsanmış bağ'],
    context:
      'Ruhsal bağınız, en karanlık zamanlarda bile yolunuzu aydınlatan parlak bir yıldız.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_pos3',
    card: 'The Moon',
    position: 3,
    upright:
      'Duygusal bağınız belirsizlikler, korkular ve bilinçaltı dinamikleriyle dolu. Aranızda güçlü bir sezgisel çekim var ama aynı zamanda birbirinizden sakladığınız şeyler veya yanlış anlaşılmalar olabilir.',
    reversed:
      'Ters Moon, aranızdaki duygusal belirsizliklerin ve korkuların dağılmaya başladığını gösterir. Sırlar ortaya çıkıyor ve ruhsal bir netlik kazanılıyor.',
    keywords: [
      'belirsizlik',
      'korkular',
      'sezgisel çekim',
      'bilinçaltı',
      'yanılsama',
    ],
    context:
      'Duygusal bağınız, bilinçaltı okyanusunun derinliklerinde seyreden, gizemli bir yolculuk.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_pos3',
    card: 'The Sun',
    position: 3,
    upright:
      'Aranızda neşe, sıcaklık ve açıklıkla dolu, harika bir duygusal bağ var. Birlikteyken kendinizi özgür ve mutlu hissediyorsunuz. Ruhlarınız birbiriyle oynayan iki çocuk gibi.',
    reversed:
      'Ters Sun, aranızdaki neşenin ve sıcaklığın geçici olarak gölgelendiğini gösterir. Duygusal olarak birbirinizi tam olarak göremiyor olabilirsiniz.',
    keywords: ['neşe', 'mutluluk', 'açıklık', 'sıcaklık', 'ruhsal canlılık'],
    context:
      'Duygusal bağınız, tüm karanlığı aydınlatan, sıcak ve hayat dolu bir güneş ışığı.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_pos3',
    card: 'Judgement',
    position: 3,
    upright:
      'Bu, bir uyanış ve hesaplaşma bağıdır. İlişkiniz, sizi daha yüksek bir ruhsal farkındalığa çağıran bir katalizör görevi görüyor. Geçmişi affetme ve birlikte yeniden doğma zamanı.',
    reversed:
      'Ters Judgement, birbirinizi veya kendinizi geçmiş hatalarınız için yargıladığınızı gösterir. Ruhsal olarak ilerlemenizi engelleyen bir affedememe durumu var.',
    keywords: [
      'ruhsal uyanış',
      'hesaplaşma',
      'affetme',
      'yeniden doğuş',
      'çağrı',
    ],
    context:
      'Ruhsal bağınız, sizi daha otantik bir varoluşa çağıran, dönüştürücü bir güç.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_pos3',
    card: 'The World',
    position: 3,
    upright:
      'Duygusal ve ruhsal olarak bir tamamlanma ve bütünlük hissi. Birlikte önemli bir döngüyü başarıyla tamamladınız. Bu, derin bir tatmin ve uyum içeren, olgun bir ruhsal bağ.',
    reversed:
      'Ters World, duygusal olarak bir şeylerin eksik kaldığını veya bir kapanış yapamadığınızı gösterir. Ruhsal olarak bir araya gelememe, tamamlanmamışlık hissi.',
    keywords: [
      'tamamlanma',
      'bütünlük',
      'duygusal doyum',
      'başarı',
      'ruhsal uyum',
    ],
    context:
      'Duygusal bağınız, uzun bir yolculuğun sonunda ulaşılan, tatmin ve bütünlük dolu bir dans.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_pos3',
    card: 'Ace of Cups',
    position: 3,
    upright:
      'Aranızda yeni bir sevgi, şefkat ve duygusal açıklık filizleniyor. Bu, saf ve koşulsuz bir sevginin başlangıcıdır. Kalpleriniz birbirine akıyor.',
    reversed:
      'Ters Kupa Ası, duygusal bir kapalılık veya bastırılmışlık olduğunu gösterir. Bir taraf sevgiyi kabul etmeye veya vermeye hazır değil. Ruhsal kaynak tıkanmış.',
    keywords: [
      'yeni sevgi',
      'duygusal başlangıç',
      'şefkat',
      'kalp açıklığı',
      'ruhsal akış',
    ],
    context:
      'Duygusal bağınız, taşmaya hazır, sevgi dolu bir kadehin ilk damlası.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_pos3',
    card: 'Two of Cups',
    position: 3,
    upright:
      'Aranızda karşılıklı, dengeli ve sevgi dolu bir duygusal bağ var. Birbirinizin duygularını anlıyor ve ruhsal olarak birbirinizi besliyorsunuz. Kalplerin buluşması.',
    reversed:
      'Ters Kupa İkilisi, duygusal bir kopukluk, yanlış anlaşılma veya karşılıksız bir sevgi olduğunu gösterir. Ruhsal uyum bozulmuş veya hiç oluşmamış olabilir.',
    keywords: [
      'duygusal bağ',
      'karşılıklı sevgi',
      'ruhsal uyum',
      'empati',
      'birlik',
    ],
    context:
      'Duygusal bağlantınız, iki kalbin birbirine sevgi ve anlayışla aktığı bir nehir gibi.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_pos3',
    card: 'Three of Cups',
    position: 3,
    upright:
      'Duygusal bağınız neşeli, kutlamaya değer ve uyumlu. Birlikte eğleniyor ve birbirinizin ruhunu yükseltiyorsunuz. Bu, arkadaşlık temelinde yükselen, mutlu bir bağ.',
    reversed:
      'Ters Kupa Üçlüsü, duygusal olarak bir yüzeysellik veya bir üçüncü kişinin aranızdaki bağı zedelediğini gösterir. Dedikodu veya güvensizlik ruhsal uyumu bozuyor.',
    keywords: [
      'neşeli bağ',
      'kutlama',
      'arkadaşlık',
      'duygusal uyum',
      'topluluk',
    ],
    context:
      'Duygusal bağınız, iki ruhun birlikte dans ettiği neşeli bir kutlama.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_pos3',
    card: 'Four of Cups',
    position: 3,
    upright:
      'Duygusal olarak bir durgunluk veya tatminsizlik dönemi. Bir taraf, diğerinin sunduğu sevgiyi veya ilgiyi görmezden geliyor olabilir. Ruhsal olarak bir içe çekilme var.',
    reversed:
      'Ters Kupa Dörtlüsü, duygusal bir durgunluktan çıkıp yeniden birbirinize ilgi duymaya başladığınızı gösterir. Ruhsal bir uyanış ve yeni bir farkındalık.',
    keywords: [
      'duygusal durgunluk',
      'tatminsizlik',
      'ilgisizlik',
      'içe çekilme',
      'fırsatları kaçırma',
    ],
    context:
      'Duygusal bağınız, sunulan sevgi kadehini görmeyen, kendi içine dalmış bir ruh hali.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_pos3',
    card: 'Five of Cups',
    position: 3,
    upright:
      'Duygusal bağınız, geçmişteki bir kayıp veya hayal kırıklığının gölgesinde. Aranızda bir keder veya pişmanlık var. Ancak bu acı, ruhsal olarak affetme ve iyileşme potansiyeli taşıyor.',
    reversed:
      'Ters Kupa Beşlisi, geçmişteki duygusal acıları affetmeye ve geride bırakmaya başladığınızı gösterir. Ruhsal bir iyileşme ve umut filizleniyor.',
    keywords: ['kayıp', 'keder', 'pişmanlık', 'duygusal acı', 'affetme'],
    context:
      'Duygusal bağınız, dökülenlere ağlarken, hala dolu olan sevgi potansiyelini görmekte zorlanıyor.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_pos3',
    card: 'Six of Cups',
    position: 3,
    upright:
      'Aranızda geçmişten gelen, tanıdık ve masum bir ruhsal bağ var. Bu, bir çocukluk aşkı veya geçmiş yaşam bağlantısı olabilir. Güvenli ve şefkatli bir duygusal ortam.',
    reversed:
      'Ters Kupa Altılısı, geçmişe takılıp kalmanın duygusal bağınızı olumsuz etkilediğini gösterir. Büyümeyi reddeden, olgunlaşmamış bir ruhsal dinamik.',
    keywords: [
      'geçmiş yaşam bağı',
      'nostalji',
      'masumiyet',
      'güven',
      'tanıdık ruh',
    ],
    context:
      'Ruhsal bağınız, geçmişin tatlı anılarından beslenen, tanıdık ve sıcak bir his.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_pos3',
    card: 'Seven of Cups',
    position: 3,
    upright:
      'Duygusal bağınızda bir kafa karışıklığı veya gerçekçi olmayan beklentiler var. Aranızdaki ruhsal bağlantı, bir yanılsama veya fantezi üzerine kurulu olabilir. Netlik gerekiyor.',
    reversed:
      'Ters Kupa Yedilisi, duygusal yanılsamaların dağıldığını ve gerçeğin ortaya çıktığını gösterir. Ruhsal olarak daha net bir anlayışa ulaşıyorsunuz.',
    keywords: [
      'yanılsama',
      'kafa karışıklığı',
      'gerçekçi olmayan beklentiler',
      'fantezi',
      'seçenekler',
    ],
    context:
      'Duygusal bağınız, gerçek bir temel yerine, hayaller ve olasılıklar bulutu üzerinde yüzüyor.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_pos3',
    card: 'Eight of Cups',
    position: 3,
    upright:
      'Bir tarafın veya her ikisinin de duygusal olarak tatmin etmeyen bu bağı geride bırakma arzusu var. Daha derin bir ruhsal anlam arayışıyla yeni bir yola çıkma ihtiyacı.',
    reversed:
      'Ters Kupa Sekizlisi, duygusal olarak gitmekle kalmak arasında sıkışıp kaldığınızı gösterir. Ruhsal bir arayış var ama eyleme geçme korkusu hakim.',
    keywords: [
      'duygusal arayış',
      'terk etme',
      'daha fazlasını arama',
      'tatminsizlik',
      'ruhsal yolculuk',
    ],
    context:
      'Ruhsal bağınız, artık beslemeyen bir limandan ayrılıp, bilinmeyen denizlere yelken açma arifesinde.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_pos3',
    card: 'Nine of Cups',
    position: 3,
    upright:
      'Aranızda derin bir duygusal tatmin ve memnuniyet var. Birbirinizin dileklerini gerçekleştiriyor ve ruhsal olarak doyuma ulaşıyorsunuz. Mutlu ve cömert bir bağ.',
    reversed:
      'Ters Kupa Dokuzlusu, duygusal bir bencillik veya tatminsizlik olduğunu gösterir. Bir tarafın istekleri karşılanmıyor veya sevgi gösterişe dönüşmüş.',
    keywords: [
      'duygusal tatmin',
      'memnuniyet',
      'dileklerin kabulü',
      'mutluluk',
      'cömertlik',
    ],
    context:
      'Duygusal bağınız, her iki ruhun da kendini şanslı ve tatmin olmuş hissettiği bir şölen.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_pos3',
    card: 'Ten of Cups',
    position: 3,
    upright:
      'Bu, nihai duygusal ve ruhsal tamamlanmadır. Aranızda derin bir sevgi, uyum ve kalıcı bir mutluluk var. Aile gibi hissettiren, kutsanmış bir bağ.',
    reversed:
      'Ters Kupa Onlusu, aranızdaki duygusal uyumun bozulduğunu veya hayal edilen mutluluğun gerçekleşmediğini gösterir. Ruhsal olarak bir kopukluk var.',
    keywords: [
      'kalıcı mutluluk',
      'duygusal doyum',
      'uyum',
      'kutsanmış bağ',
      'aile hissi',
    ],
    context:
      'Duygusal bağınız, gökkuşağının altındaki o mükemmel an; kalıcı ve koşulsuz sevgi.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_pos3',
    card: 'Page of Cups',
    position: 3,
    upright:
      'Aranızda yeni ve hassas bir duygusal başlangıç var. Bir aşk itirafı, bir özür veya sezgisel bir mesaj olabilir. Ruhlarınız birbirine merakla ve şefkatle yaklaşıyor.',
    reversed:
      'Ters Kupa Uşağı, duygusal olgunlaşmamışlık veya bir hayal kırıklığı olduğunu gösterir. Duygular ifade edilemiyor veya yanlış anlaşılıyor.',
    keywords: [
      'duygusal mesaj',
      'hassasiyet',
      'sezgisel başlangıç',
      'merak',
      'şefkat',
    ],
    context:
      'Ruhsal bağınız, kalbinden gelen bir mesajı sunmaya çalışan, masum ve hassas bir haberci.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_pos3',
    card: 'Knight of Cups',
    position: 3,
    upright:
      'Aranızda romantik ve idealist bir ruhsal akış var. Bir taraf diğerine duygularını büyük bir jestle sunuyor. Bu, kalbin peşinden giden, şiirsel bir bağ.',
    reversed:
      'Ters Kupa Şövalyesi, gerçekçi olmayan duygusal beklentiler veya samimiyetsiz romantizm olduğunu gösterir. Duygusal bir hayal kırıklığı yaşanabilir.',
    keywords: [
      'romantizm',
      'duygusal teklif',
      'idealizm',
      'kalp yolculuğu',
      'sanatsal ruh',
    ],
    context:
      'Duygusal bağınız, size kalbini bir kadeh gibi sunan romantik bir şövalyenin yolculuğu.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_pos3',
    card: 'Queen of Cups',
    position: 3,
    upright:
      'Bu, derin bir sezgisel anlayış, şefkat ve empati üzerine kurulu bir ruhsal bağdır. Birbirinizin ruhunu okuyor ve koşulsuz bir sevgiyle besliyorsunuz. Şifalı bir bağlantı.',
    reversed:
      'Ters Kupa Kraliçesi, aşırı duygusallık, duygusal manipülasyon veya sınırların kaybolduğu boğucu bir bağ olduğunu gösterir. Duygusal denge kaybolmuş.',
    keywords: [
      'sezgisel anlayış',
      'empati',
      'şefkat',
      'duygusal bilgelik',
      'koşulsuz sevgi',
    ],
    context:
      'Ruhsal bağınız, kalbinin derinliklerindeki okyanustan bilgelik sunan şefkatli bir kraliçe.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_pos3',
    card: 'King of Cups',
    position: 3,
    upright:
      'Aranızda duygusal olgunluk, denge ve şefkatli bir kontrol var. Bu, zor zamanlarda bile sakin kalabilen, bilge ve istikrarlı bir ruhsal bağdır. Birbirinize duygusal liderlik yapıyorsunuz.',
    reversed:
      'Ters Kupa Kralı, duygusal manipülasyon, soğukluk veya duyguların bastırıldığı bir bağ olduğunu gösterir. Bir tarafın duygusal olarak ulaşılamaz olması.',
    keywords: [
      'duygusal olgunluk',
      'istikrar',
      'şefkatli liderlik',
      'bilgelik',
      'denge',
    ],
    context:
      'Duygusal bağınız, duygular okyanusunu ustalıkla yöneten bilge ve şefkatli bir kral.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_pos3',
    card: 'Ace of Swords',
    position: 3,
    upright:
      'Aranızda ani bir zihinsel ve ruhsal netlik anı yaşanıyor. Bu bağ, sizi bir gerçeği görmeye veya önemli bir karar vermeye zorluyor. Dürüstlük üzerine kurulu bir bağlantı.',
    reversed:
      'Ters Kılıç Ası, aranızda zihinsel bir çatışma veya yanlış anlaşılma olduğunu gösterir. Duygusal ve ruhsal olarak aynı dili konuşmuyorsunuz.',
    keywords: [
      'zihinsel netlik',
      'gerçek',
      'dürüst iletişim',
      'ruhsal aydınlanma',
      'karar',
    ],
    context:
      'Ruhsal bağınız, yanılsamaları kesip atan ve gerçeği ortaya çıkaran keskin bir kılıç.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_pos3',
    card: 'Two of Swords',
    position: 3,
    upright:
      'Duygusal olarak birbirinize karşı bir savunma veya kararsızlık durumu var. Kalplerinizi açmaktan korkuyor ve bir çıkmazda hissediyorsunuz. Ruhsal bir ateşkes durumu.',
    reversed:
      'Ters Kılıç İkilisi, bastırılmış duyguların veya bir kararsızlığın yarattığı gerilimin arttığını gösterir. Duygusal bir çıkmaza saplanmışsınız.',
    keywords: [
      'duygusal kararsızlık',
      'savunma',
      'çıkmaz',
      'inkar',
      'kalbi kapatma',
    ],
    context:
      'Duygusal bağınız, gözleri bağlı iki ruhun birbirine yaklaşmaktan korktuğu bir an.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_pos3',
    card: 'Three of Swords',
    position: 3,
    upright:
      'Bu, acı verici bir duygusal bağı, bir kalp kırıklığını veya bir ihaneti temsil eder. Bu acı, ruhsal bir ders ve iyileşme fırsatı taşısa da şu an için keder hakimdir.',
    reversed:
      'Ters Kılıç Üçlüsü, bir kalp kırıklığının acısını uzattığınızı veya affetmeyi reddettiğinizi gösterir. Ruhsal olarak bu acıya takılıp kalmışsınız.',
    keywords: ['kalp kırıklığı', 'duygusal acı', 'ihanet', 'keder', 'ayrılık'],
    context:
      'Duygusal bağınız, üç keskin kılıcın saplandığı, acı çeken bir kalp.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_pos3',
    card: 'Four of Swords',
    position: 3,
    upright:
      'Duygusal ve ruhsal olarak bir dinlenme ve iyileşme dönemindesiniz. İlişkide bir mola veya birbirinize alan tanıma ihtiyacı var. Bu, daha sağlıklı bir bağ için zihinsel bir hazırlık.',
    reversed:
      'Ters Kılıç Dörtlüsü, duygusal sorunlardan kaçtığınızı veya dinlenmeyi reddederek ruhsal olarak tükendiğinizi gösterir. Birbirinize nefes aldırmıyorsunuz.',
    keywords: [
      'duygusal dinlenme',
      'iyileşme',
      'mola',
      'zihinsel sükunet',
      'alan tanıma',
    ],
    context:
      'Ruhsal bağınız, savaşlara ara vermiş, şifa bulmak için dinlenen bir şövalye gibi.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_pos3',
    card: 'Five of Swords',
    position: 3,
    upright:
      'Duygusal bağlantınızda bir çatışma, ego savaşları ve incitici sözler var. Birbirinizin zayıf noktalarını biliyor ve bunları kullanıyor olabilirsiniz. Empati eksikliği ruhsal bağı zedeliyor.',
    reversed:
      'Ters Kılıç Beşlisi, duygusal bir savaşın ardından gelen pişmanlığı veya barışma arzusunu gösterir. Ancak yaralar derin olabilir ve ruhsal güven sarsılmıştır.',
    keywords: [
      'duygusal çatışma',
      'incitici sözler',
      'ego savaşı',
      'empati eksikliği',
      'güven kaybı',
    ],
    context:
      'Ruhsal bağınız, sevgi yerine, kazananı olmayan bir ego savaşıyla tanımlanıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_pos3',
    card: 'Six of Swords',
    position: 3,
    upright:
      'Zorlu bir duygusal dönemi geride bırakıp birlikte daha sakin sulara yol alıyorsunuz. Bu, ruhsal bir iyileşme ve geçmişin acılarından uzaklaşma sürecidir.',
    reversed:
      'Ters Kılıç Altılısı, duygusal sorunlardan kaçmaya çalışsanız da geçmişin yükünün hala ruhsal bağınızı etkilediğini gösterir. Tam bir iyileşme sağlanamamış.',
    keywords: [
      'ruhsal iyileşme',
      'geçiş',
      'huzur',
      'geçmişi bırakma',
      'sakinleşme',
    ],
    context:
      'Duygusal bağınız, fırtınalı bir denizden ayrılıp, sakin bir koya doğru yol alan bir tekne.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_pos3',
    card: 'Seven of Swords',
    position: 3,
    upright:
      'Duygusal bağınızda bir dürüstlük eksikliği, saklanan sırlar veya aldatma olabilir. Bir taraf diğerine karşı tamamen açık değil, bu da ruhsal güveni zedeliyor.',
    reversed:
      'Ters Kılıç Yedilisi, bir yalanın veya sırrın ortaya çıkma tehlikesini veya bunun getirdiği vicdan azabını gösterir. Ruhsal olarak bir temizlenme ihtiyacı.',
    keywords: [
      'aldatma',
      'sırlar',
      'dürüstlük eksikliği',
      'güvensizlik',
      'kaçınma',
    ],
    context:
      'Duygusal bağınız, bir tarafın diğerinden bir şeyler sakladığı, eksik bir yapboz gibi.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_pos3',
    card: 'Eight of Swords',
    position: 3,
    upright:
      'Duygusal olarak kendinizi kapana kısılmış hissediyorsunuz. Bu bağ, özgürlüğünüzü kısıtlıyor gibi görünüyor, ancak bu genellikle kendi yarattığınız zihinsel bir hapishanedir. Ruhsal olarak ilerleyemiyorsunuz.',
    reversed:
      'Ters Kılıç Sekizlisi, sizi kısıtlayan duygusal veya ruhsal engelleri fark edip onlardan kurtulmaya başladığınızı gösterir. Bir özgürleşme anı.',
    keywords: [
      'duygusal hapis',
      'kısıtlanma',
      'korku',
      'çaresizlik',
      'zihinsel engel',
    ],
    context:
      'Ruhsal bağınız, kendi korkularınızla ördüğünüz, sizi hapsetmiş bir kafes.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_pos3',
    card: 'Nine of Swords',
    position: 3,
    upright:
      'Bu duygusal bağ, size endişe, suçluluk veya korku veriyor. İlişkiyle ilgili zihinsel kaygılar, ruhsal olarak sizi tüketiyor. Birbirinize veya kendinize karşı acımasız olabilirsiniz.',
    reversed:
      'Ters Kılıç Dokuzlusu, en kötü korkularınızla yüzleştiğinizi ve bunların yersiz olduğunu fark ettiğinizi gösterir. Duygusal bir krizin sonu ve ruhsal bir rahatlama.',
    keywords: ['endişe', 'korku', 'suçluluk', 'zihinsel acı', 'ruhsal eziyet'],
    context:
      'Duygusal bağınız, geceleri sizi uyutmayan, endişe ve korku dolu bir kabus.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_pos3',
    card: 'Ten of Swords',
    position: 3,
    upright:
      'Bu, duygusal bir bitişin veya bir ihanetin en acı noktasını temsil eder. Ruhsal olarak dipte hissediyorsunuz. Ancak bu son, yeni ve daha sağlıklı bir bağ için bir başlangıçtır.',
    reversed:
      'Ters Kılıç Onlusu, acı verici bir duygusal durumdan sonra yavaş yavaş toparlanmayı gösterir. Yaralar hala taze ama ruhsal bir iyileşme süreci başlamış.',
    keywords: [
      'acı son',
      'ihanet',
      'duygusal çöküş',
      'dip nokta',
      'yeniden başlangıç',
    ],
    context:
      'Duygusal bağınız, sırtından bıçaklanmış gibi hissedilen, acı verici bir son.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_pos3',
    card: 'Page of Swords',
    position: 3,
    upright:
      'Aranızdaki duygusal bağ, entelektüel bir merak ve açık iletişimle besleniyor. Birbirinizin zihnini keşfetmekten hoşlanıyorsunuz. Ancak bu, bazen duygusal derinlikten yoksun olabilir.',
    reversed:
      'Ters Kılıç Uşağı, aranızda kırıcı sözler, tartışmalar veya zihinsel oyunlar olduğunu gösterir. İletişim, ruhsal bağı güçlendirmek yerine zedeliyor.',
    keywords: [
      'zihinsel merak',
      'açık iletişim',
      'sorgulama',
      'tartışma',
      'dürüstlük',
    ],
    context:
      'Duygusal bağınız, kelimelerle ve fikirlerle oynanan, keskin ve meraklı bir zihin oyunu.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_pos3',
    card: 'Knight of Swords',
    position: 3,
    upright:
      'Duygusal bağınız hızlı, direkt ve bazen de düşüncesiz. Gerçeği söylemekten çekinmiyorsunuz ama bu, şefkatten yoksun olabilir. Ruhsal olarak hızlı ama sarsıcı bir ilerleme.',
    reversed:
      'Ters Kılıç Şövalyesi, aranızda agresif tartışmalar ve duygusal saldırganlık olduğunu gösterir. Birbirinizin ruhunu yaralıyorsunuz.',
    keywords: [
      'hızlı iletişim',
      'direktlik',
      'düşüncesizlik',
      'tartışma',
      'gerçeği arama',
    ],
    context:
      'Duygusal bağınız, gerçeği ararken önüne çıkan her şeyi yıkan, hızlı bir fırtına.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_pos3',
    card: 'Queen of Swords',
    position: 3,
    upright:
      'Aranızdaki duygusal bağ, dürüstlük, zeka ve bağımsızlık üzerine kurulu. Birbirinize karşı net ve açıksınız. Bu, acı tecrübelerden sonra oluşmuş, olgun bir ruhsal anlayış.',
    reversed:
      'Ters Kılıç Kraliçesi, aranızda duygusal bir soğukluk, mesafe veya acımasız bir eleştiri olduğunu gösterir. Geçmişin yaraları, ruhsal bağı dondurmuş.',
    keywords: [
      'duygusal netlik',
      'dürüstlük',
      'zeka',
      'bağımsızlık',
      'sınır koyma',
    ],
    context:
      'Ruhsal bağınız, duygusal dramadan arınmış, zeki ve net bir anlayış.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_pos3',
    card: 'King of Swords',
    position: 3,
    upright:
      'Aranızdaki ruhsal bağ, yüksek bir zihinsel uyum, adalet ve dürüstlük üzerine kurulu. Birbirinize karşı entelektüel olarak saygı duyuyorsunuz. Bu, bilge ve olgun bir zihin ortaklığı.',
    reversed:
      'Ters Kılıç Kralı, duygusal olarak manipülatif, soğuk ve yargılayıcı bir bağ olduğunu gösterir. Zeka, ruhsal bir bağ kurmak yerine üstünlük kurmak için kullanılıyor.',
    keywords: [
      'zihinsel uyum',
      'adalet',
      'dürüstlük',
      'entelektüel saygı',
      'bilgelik',
    ],
    context:
      'Duygusal bağınız, gerçeğin ve adaletin hüküm sürdüğü, olgun bir zihin krallığı.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_pos3',
    card: 'Ace of Wands',
    position: 3,
    upright:
      'Aranızda yeni ve heyecan verici bir ruhsal kıvılcım var. Bu bağ, size ilham veriyor ve birlikte yaratma arzusu uyandırıyor. Tutkulu bir ruhsal başlangıç.',
    reversed:
      'Ters Asa Ası, aranızdaki ruhsal ve duygusal enerjinin düşük olduğunu veya bir başlangıç yapma konusunda isteksizlik olduğunu gösterir. İlham kaynağı tıkanmış.',
    keywords: [
      'ruhsal kıvılcım',
      'ilham',
      'tutku',
      'yaratıcılık',
      'yeni başlangıç',
    ],
    context:
      'Ruhsal bağınız, yeni bir projenin veya maceranın başlangıcındaki o heyecan verici kıvılcım.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_pos3',
    card: 'Two of Wands',
    position: 3,
    upright:
      'Ortak bir ruhsal vizyon ve gelecek planı oluşturuyorsunuz. Bu bağ, sizi bireysel olarak ve birlikte büyümeye teşvik ediyor. Birbirinizin potansiyeline inanıyorsunuz.',
    reversed:
      'Ters Asa İkilisi, ortak bir vizyon eksikliği veya gelecek planları konusunda bir kararsızlık olduğunu gösterir. Ruhsal olarak farklı yönlere bakıyorsunuz.',
    keywords: [
      'ortak vizyon',
      'gelecek planı',
      'potansiyel',
      'büyüme',
      'kararlılık',
    ],
    context:
      'Duygusal bağınız, ortak bir geleceğe bakan ve bir sonraki adımı planlayan iki kaşif.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_pos3',
    card: 'Three of Wands',
    position: 3,
    upright:
      'Ruhsal ve duygusal olarak ektiğiniz tohumların meyvelerini bekliyorsunuz. Aranızdaki bağ genişliyor ve geleceğe umutla bakıyorsunuz. Ortak hayalleriniz var.',
    reversed:
      'Ters Asa Üçlüsü, duygusal ilerlemede gecikmeler veya hayal kırıklıkları olduğunu gösterir. Ruhsal olarak bir bekleme ve sıkışmışlık hali.',
    keywords: ['genişleme', 'beklenti', 'ortak hayaller', 'ilerleme', 'umut'],
    context:
      'Ruhsal bağınız, limana dönmekte olan gemilerini umutla bekleyen bir denizci gibi.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_pos3',
    card: 'Four of Wands',
    position: 3,
    upright:
      'Aranızda istikrarlı, mutlu ve kutlamaya değer bir duygusal bağ var. Birlikteyken kendinizi evinizde hissediyorsunuz. Bu, ruhsal bir yuva ve güvenli bir liman.',
    reversed:
      'Ters Asa Dörtlüsü, duygusal olarak bir istikrarsızlık veya uyumsuzluk olduğunu gösterir. Ruhsal temeliniz sağlam değil ve bir kutlama hissi yok.',
    keywords: [
      'ruhsal yuva',
      'mutluluk',
      'istikrar',
      'kutlama',
      'güvenli liman',
    ],
    context:
      'Duygusal bağınız, iki ruhun bir araya gelmesini kutlayan neşeli ve sağlam bir yapı.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_pos3',
    card: 'Five of Wands',
    position: 3,
    upright:
      'Duygusal bağınızda bir rekabet, sürtüşme veya farklı enerjilerin çatışması var. Bu, tutkulu bir dinamik olabilir ama aynı zamanda ruhsal olarak yorucudur. Birbirinizi anlamak için çaba gerekiyor.',
    reversed:
      'Ters Asa Beşlisi, içsel bir çatışma yaşadığınızı veya duygusal bir savaştan kaçındığınızı gösterir. Bu durum, bastırılmış bir gerginliğe yol açar.',
    keywords: [
      'duygusal çatışma',
      'rekabet',
      'sürtüşme',
      'enerji uyumsuzluğu',
      'yorucu dinamik',
    ],
    context:
      'Ruhsal bağınız, farklı fikirlerin ve tutkuların çarpıştığı, enerjik bir kaos alanı.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_pos3',
    card: 'Six of Wands',
    position: 3,
    upright:
      'Duygusal olarak birbirinizi destekliyor ve başarılarınızı kutluyorsunuz. Aranızda bir zafer ve takdir duygusu var. Bu, özgüveni artıran, motive edici bir ruhsal bağ.',
    reversed:
      'Ters Asa Altılısı, aranızda bir tanınma eksikliği veya bir tarafın diğerinin başarısını kıskanması olduğunu gösterir. Ruhsal destek eksik.',
    keywords: ['karşılıklı destek', 'takdir', 'başarı', 'özgüven', 'zafer'],
    context:
      'Duygusal bağınız, birbirini onurlandıran ve zafere taşıyan iki müttefik.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_pos3',
    card: 'Seven of Wands',
    position: 3,
    upright:
      'Bu duygusal bağı dış etkenlere veya zorluklara karşı birlikte savunuyorsunuz. Aranızda, inandığınız değerler için mücadele eden, cesur bir ruhsal ortaklık var.',
    reversed:
      'Ters Asa Yedilisi, dış baskılar karşısında duygusal olarak bunalmış hissettiğinizi veya birbirinizi savunmaktan vazgeçtiğinizi gösterir. Ruhsal olarak yorgunsunuz.',
    keywords: [
      'birlikte savunma',
      'cesaret',
      'meydan okuma',
      'inanç',
      'ruhsal direnç',
    ],
    context:
      'Ruhsal bağınız, zorluklara karşı birlikte duran, sarsılmaz bir kale.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_pos3',
    card: 'Eight of Wands',
    position: 3,
    upright:
      'Aranızda hızlı ve heyecan verici bir duygusal ve ruhsal iletişim var. Duygular açıkça ve hızla ifade ediliyor. Bu, hızla ilerleyen, dinamik bir bağ.',
    reversed:
      'Ters Asa Sekizlisi, duygusal iletişimde bir yavaşlama, yanlış anlaşılma veya gecikme olduğunu gösterir. Ruhsal olarak aynı frekansta değilsiniz.',
    keywords: [
      'hızlı iletişim',
      'duygusal akış',
      'heyecan',
      'ilerleme',
      'tutkulu mesajlar',
    ],
    context:
      'Duygusal bağınız, iki kalp arasında hızla gidip gelen sevgi ve tutku dolu oklar gibi.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_pos3',
    card: 'Nine of Wands',
    position: 3,
    upright:
      'Geçmişteki duygusal yaralar nedeniyle birbirinize karşı temkinli ve savunmacısınız. Aranızda bir güven sorunu olabilir, ancak bu bağı korumak için hala bir direnç var. Yorgun ama pes etmeyen bir ruhsal bağ.',
    reversed:
      'Ters Asa Dokuzlusu, duygusal olarak duvarlarınızı daha da yükselttiğinizi veya artık savaşacak gücünüzün kalmadığını gösterir. Ruhsal bir tükenmişlik.',
    keywords: [
      'duygusal savunma',
      'güvensizlik',
      'dayanıklılık',
      'geçmiş yaralar',
      'temkin',
    ],
    context:
      'Duygusal bağınız, geçmişte yaralanmış ama hala ayakta duran yorgun bir savaşçı.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_pos3',
    card: 'Ten of Wands',
    position: 3,
    upright:
      'Bu duygusal bağ, bir zevkten çok bir yük veya sorumluluk haline gelmiş. Bir taraf veya her ikisi de ilişkinin ağırlığı altında eziliyor. Ruhsal olarak yorucu.',
    reversed:
      'Ters Asa Onlusu, aranızdaki duygusal yükleri bırakmaya başladığınızı gösterir. Bu, ilişkinin hafiflemesine ve ruhsal olarak nefes almasına olanak tanır.',
    keywords: [
      'duygusal yük',
      'sorumluluk',
      'tükenmişlik',
      'baskı',
      'yorucu bağ',
    ],
    context: 'Ruhsal bağınız, taşınması zorlaşan, ağır bir yük haline gelmiş.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_pos3',
    card: 'Page of Wands',
    position: 3,
    upright:
      'Aranızda yeni bir tutku, heyecan ve ruhsal merak filizleniyor. Birbirinizi keşfetmeye ve birlikte yeni maceralara atılmaya heveslisiniz. Eğlenceli ve enerjik bir bağ.',
    reversed:
      'Ters Asa Uşağı, duygusal bir başlangıç yapma konusunda kararsızlık veya olgunlaşmamış bir enerji olduğunu gösterir. Heves var ama eylem yok.',
    keywords: ['ruhsal merak', 'yeni tutku', 'macera', 'keşif', 'heyecan'],
    context:
      'Duygusal bağınız, yeni bir maceranın başında duran, hevesli ve enerjik bir kaşif.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_pos3',
    card: 'Knight of Wands',
    position: 3,
    upright:
      'Aranızda tutkulu, maceracı ve enerjik bir ruhsal bağ var. Birlikte risk almaktan ve anı yaşamaktan keyif alıyorsunuz. Ancak bu, bazen istikrarsız olabilir.',
    reversed:
      'Ters Asa Şövalyesi, duygusal olarak aceleci, sabırsız veya bağlanmaktan kaçan bir dinamik olduğunu gösterir. Tutku çabuk parlayıp sönebilir.',
    keywords: [
      'tutkulu bağ',
      'macera',
      'enerji',
      'acelecilik',
      'bağlanma korkusu',
    ],
    context:
      'Ruhsal bağınız, bir alev gibi parlak, sıcak ama aynı zamanda öngörülemez.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_pos3',
    card: 'Queen of Wands',
    position: 3,
    upright:
      'Aranızda sıcak, cömert, kendine güvenen ve ilham verici bir ruhsal bağ var. Birbirinizin yaratıcılığını ve bireyselliğini destekliyorsunuz. Manyetik bir çekim.',
    reversed:
      'Ters Asa Kraliçesi, aranızda kıskançlık, duygusal drama veya bir tarafın diğerini gölgede bırakma arzusu olduğunu gösterir. Ruhsal güven eksik.',
    keywords: [
      'ilham verici bağ',
      'özgüven',
      'yaratıcılık',
      'sıcaklık',
      'karşılıklı destek',
    ],
    context:
      'Duygusal bağınız, birbirine ilham veren ve enerji katan iki parlak ateş.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_pos3',
    card: 'King of Wands',
    position: 3,
    upright:
      'Aranızda ortak bir vizyonla hareket eden, güçlü, lider ve ilham verici bir ruhsal bağ var. Birbirinize büyük hedefler için cesaret veriyorsunuz. Bu, dinamik bir güç ortaklığı.',
    reversed:
      'Ters Asa Kralı, duygusal olarak baskıcı, egoist veya bir tarafın diğerini yönetmeye çalıştığı bir bağ olduğunu gösterir. Ruhsal bir güç mücadelesi.',
    keywords: ['liderlik', 'ortak vizyon', 'ilham', 'güç ortaklığı', 'cesaret'],
    context:
      'Ruhsal bağınız, ortak bir krallığı yöneten, vizyoner ve güçlü iki lider.',
    group: 'Asalar',
  },

  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_pos3',
    card: 'Ace of Pentacles',
    position: 3,
    upright:
      'Aranızda sağlam, güvenilir ve potansiyeli yüksek yeni bir duygusal bağ filizleniyor. Bu, gerçek dünyada kök salabilecek, kalıcı bir sevginin tohumudur.',
    reversed:
      'Ters Tılsım Ası, duygusal bir başlangıç için fırsatın kaçırıldığını veya bağın sağlam bir temelden yoksun olduğunu gösterir. Ruhsal olarak bir güvensizlik var.',
    keywords: [
      'sağlam başlangıç',
      'güven',
      'kalıcı potansiyel',
      'gerçekçi sevgi',
      'fırsat',
    ],
    context:
      'Duygusal bağınız, verimli bir toprağa ekilmiş, büyümeye hazır değerli bir tohum.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pos3',
    card: 'Two of Pentacles',
    position: 3,
    upright:
      'Duygusal olarak esnek ve uyumlu bir bağınız var. Hayatın iniş çıkışlarında birbirinize destek oluyor ve dengeyi buluyorsunuz. Eğlenceli ve pratik bir ruhsal ortaklık.',
    reversed:
      'Ters Tılsım İkilisi, duygusal olarak dengeyi kaybettiğinizi veya ilişkinin hayatınızdaki diğer öncelikler arasında ezildiğini gösterir. Ruhsal olarak bir istikrarsızlık var.',
    keywords: [
      'duygusal denge',
      'esneklik',
      'uyum',
      'pratik destek',
      'öncelikler',
    ],
    context:
      'Duygusal bağınız, hayatın dalgalarında birlikte dans eden, uyumlu bir çift.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pos3',
    card: 'Three of Pentacles',
    position: 3,
    upright:
      'Bu, bir ekip çalışması üzerine kurulu bir duygusal bağdır. Birbirinizin yeteneklerine saygı duyuyor ve birlikte bir şeyler inşa ediyorsunuz. Bu, karşılıklı tanınma ve takdire dayalı bir ruhsal ortaklık.',
    reversed:
      'Ters Tılsım Üçlüsü, duygusal olarak bir ekip gibi çalışamadığınızı veya aranızda bir uyumsuzluk olduğunu gösterir. Bir tarafın çabaları takdir edilmiyor olabilir.',
    keywords: [
      'duygusal işbirliği',
      'karşılıklı saygı',
      'birlikte inşa etme',
      'takdir',
      'uyum',
    ],
    context:
      'Ruhsal bağınız, her birinin kendi rolünü oynadığı, sağlam bir yapı inşa eden üç usta gibi.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pos3',
    card: 'Four of Pentacles',
    position: 3,
    upright:
      'Duygusal olarak birbirinize sıkı sıkıya tutunuyorsunuz. Bu, bir güvenlik hissi verse de aynı zamanda duygusal olarak büyümeyi ve değişimi engelleyebilir. Kontrollü bir ruhsal bağ.',
    reversed:
      'Ters Tılsım Dörtlüsü, duygusal olarak cimrilik veya kaybetme korkusuyla birbirinizi boğduğunuzu gösterir. Ruhsal olarak akışa izin vermiyorsunuz.',
    keywords: [
      'duygusal güvenlik',
      'kontrol',
      'tutunma',
      'değişim korkusu',
      'sahiplenme',
    ],
    context:
      'Duygusal bağınız, kaybetme korkusuyla sıkıca kilitlenmiş bir hazine sandığı.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pos3',
    card: 'Five of Pentacles',
    position: 3,
    upright:
      'Aranızda duygusal bir yoksunluk, dışlanmışlık veya yalnızlık hissi var. Birbirinize ruhsal olarak destek olamıyor ve zor bir dönemden geçiyorsunuz. Birlikte ama yalnız hissediyorsunuz.',
    reversed:
      'Ters Tılsım Beşlisi, zor bir duygusal dönemin ardından yeniden birbirinize yaklaştığınızı ve ruhsal bir iyileşme sürecine girdiğinizi gösterir. Yardım kabul ediliyor.',
    keywords: [
      'duygusal yoksunluk',
      'yalnızlık',
      'dışlanma',
      'destek eksikliği',
      'zor dönem',
    ],
    context: 'Ruhsal bağınız, soğukta kalmış ve birbirini ısıtamayan iki ruh.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pos3',
    card: 'Six of Pentacles',
    position: 3,
    upright:
      'Aranızda cömert ve dengeli bir duygusal alışveriş var. Birbirinizin ruhunu besliyor ve ihtiyaçlarını karşılıyorsunuz. Bu, adil ve destekleyici bir ruhsal ortaklık.',
    reversed:
      'Ters Tılsım Altılısı, duygusal olarak bir dengesizlik olduğunu gösterir. Bir taraf sürekli veriyor, diğeri ise alıyor. Bu durum, bir borçluluk hissine veya manipülasyona yol açabilir.',
    keywords: [
      'duygusal cömertlik',
      'alma-verme dengesi',
      'karşılıklı destek',
      'adalet',
      'şefkat',
    ],
    context:
      'Duygusal bağınız, her iki tarafın da hem aldığı hem de verdiği, adil ve cömert bir hediyeleşme.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pos3',
    card: 'Seven of Pentacles',
    position: 3,
    upright:
      'Duygusal bağınızın durumunu değerlendiriyor ve geleceğine yatırım yapıp yapmayacağınıza karar veriyorsunuz. Bu, sabır gerektiren bir ruhsal gözlem dönemi.',
    reversed:
      'Ters Tılsım Yedilisi, bu ilişkiye yaptığınız duygusal yatırımın karşılığını alamadığınızı veya sabırsızlık gösterdiğinizi gösterir. Ruhsal bir hayal kırıklığı.',
    keywords: [
      'duygusal değerlendirme',
      'sabır',
      'yatırım',
      'bekleyiş',
      'gözlem',
    ],
    context:
      'Ruhsal bağınız, emeklerinizin meyve verip vermeyeceğini görmek için sabırla beklediğiniz bir bahçe.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pos3',
    card: 'Eight of Pentacles',
    position: 3,
    upright:
      'Duygusal bağınızı güçlendirmek için bilinçli bir çaba harcıyorsunuz. Birbirinizi anlamak ve daha iyi bir ilişki kurmak için özenle çalışıyorsunuz. Bu, adanmış bir ruhsal emek.',
    reversed:
      'Ters Tılsım Sekizlisi, duygusal olarak ilişkiye yeterince çaba göstermediğinizi veya bir rutine saplanıp kaldığınızı gösterir. Ruhsal gelişim durmuş.',
    keywords: ['duygusal çaba', 'adanmışlık', 'özen', 'gelişim', 'ustalaşma'],
    context:
      'Duygusal bağınız, bir zanaatkarın eserine gösterdiği özenle, dikkatle ve sevgiyle işleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pos3',
    card: 'Nine of Pentacles',
    position: 3,
    upright:
      'Aranızdaki bağ, iki bağımsız ve kendine yeten ruhun bir araya gelmesiyle oluşmuş. Birbirinize ihtiyaç duymadan, sadece birlikte olmanın keyfini çıkarıyorsunuz. Olgun ve zarif bir duygusal bağ.',
    reversed:
      'Ters Tılsım Dokuzlusu, aranızda duygusal bir mesafe veya yalnızlık hissi olduğunu gösterir. Birlikteyken bile ruhsal olarak ayrı dünyalardasınız.',
    keywords: [
      'duygusal bağımsızlık',
      'kendine yetme',
      'olgunluk',
      'zarafet',
      'keyif',
    ],
    context:
      'Ruhsal bağınız, her ikisinin de kendi bahçesine sahip olduğu, birbirinin alanına saygılı iki insan.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pos3',
    card: 'Ten of Pentacles',
    position: 3,
    upright:
      'Bu, son derece sağlam, güvenli ve kalıcı bir duygusal bağdır. Aile gibi hissettiren, nesiller boyu sürebilecek bir ruhsal miras inşa ediyorsunuz. Derin bir köklenme hissi.',
    reversed:
      'Ters Tılsım Onlusu, aranızdaki duygusal bağın istikrarsız olduğunu veya ailevi sorunların ruhsal uyumunuzu bozduğunu gösterir. Güvenlik hissi eksik.',
    keywords: [
      'kalıcı bağ',
      'duygusal güvenlik',
      'aile mirası',
      'köklenme',
      'istikrar',
    ],
    context:
      'Duygusal bağınız, geleceğe uzanan kökleri olan, sağlam ve bereketli bir aile ağacı.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pos3',
    card: 'Page of Pentacles',
    position: 3,
    upright:
      'Duygusal bağınız, sağlam ve gerçekçi bir temelde filizleniyor. Birbirinize karşı dürüst ve güvenilirsiniz. Bu, öğrenmeye ve büyümeye açık, umut vadeden bir ruhsal başlangıç.',
    reversed:
      'Ters Tılsım Uşağı, duygusal bir başlangıç yapma konusunda tembellik veya isteksizlik olduğunu gösterir. Ruhsal potansiyel değerlendirilmiyor.',
    keywords: [
      'sağlam başlangıç',
      'güvenilirlik',
      'öğrenme',
      'gerçekçilik',
      'umut',
    ],
    context:
      'Ruhsal bağınız, yeni bir şeyi öğrenmeye hevesli, ayakları yere basan bir öğrenci.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pos3',
    card: 'Knight of Pentacles',
    position: 3,
    upright:
      'Aranızda son derece sadık, sabırlı ve güvenilir bir duygusal bağ var. Duygularınızı yavaş ama emin adımlarla gösteriyorsunuz. Bu, zamanla güçlenen, istikrarlı bir ruhsal ortaklık.',
    reversed:
      'Ters Tılsım Şövalyesi, duygusal olarak bir durgunluk, sıkıcılık veya değişime kapalılık olduğunu gösterir. Ruhsal bağ, bir rutine dönüşmüş ve heyecanını kaybetmiş.',
    keywords: [
      'sadakat',
      'sabır',
      'güvenilirlik',
      'istikrar',
      'yavaş ilerleme',
    ],
    context:
      'Duygusal bağınız, görevine sadık, yavaş ama asla yolundan dönmeyen bir şövalye.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pos3',
    card: 'Queen of Pentacles',
    position: 3,
    upright:
      'Aranızdaki duygusal bağ besleyici, sıcak, cömert ve pratiktir. Birbirinize hem duygusal hem de pratik olarak destek oluyorsunuz. Bu, güven veren, anaç bir ruhsal kucaklama.',
    reversed:
      'Ters Tılsım Kraliçesi, bir tarafın diğerine aşırı bağımlı olduğunu veya duygusal ihtiyaçların pratik kaygılar altında ezildiğini gösterir. Ruhsal beslenme eksik.',
    keywords: [
      'besleyici sevgi',
      'pratik destek',
      'cömertlik',
      'güven',
      'sıcaklık',
    ],
    context:
      'Ruhsal bağınız, hem karnınızı hem de ruhunuzu doyuran, sıcak ve şefkatli bir yuva.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pos3',
    card: 'King of Pentacles',
    position: 3,
    upright:
      'Aranızda son derece başarılı, istikrarlı ve güven veren bir ruhsal bağ var. Birlikte bir imparatorluk kurmuş gibisiniz. Bu, hem maddi hem de manevi zenginliğe dayanan, cömert bir ortaklık.',
    reversed:
      'Ters Tılsım Kralı, duygusal bağın aşırı materyalist veya kontrolcü bir hale geldiğini gösterir. Sevgi, bir güç veya statü göstergesine dönüşmüş olabilir.',
    keywords: ['istikrarlı bağ', 'güven', 'başarı', 'cömertlik', 'zenginlik'],
    context:
      'Duygusal bağınız, hem zengin hem de cömert, bilge bir kralın yönettiği bir krallık.',
    group: 'Tılsımlar',
  },
];

// i18n destekli fonksiyonlar
export const useI18nPosition3Meanings = (): I18nLovePositionMeaning[] => {
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

// Belirli bir kart için i18n destekli anlam al (hook kullanmadan)
export const getI18nPosition3Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nLovePositionMeaning | null => {
  const originalMeaning = position3Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`love.meanings.${cardKey}.position3.upright`);
  const i18nReversed = t(`love.meanings.${cardKey}.position3.reversed`);
  const i18nKeywords = t(`love.meanings.${cardKey}.position3.keywords`);
  const i18nContext = t(`love.meanings.${cardKey}.position3.context`);
  const i18nGroup = t(
    `love.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
  );

  return {
    id: originalMeaning.id,
    card: originalMeaning.card,
    position: originalMeaning.position,
    upright: i18nUpright || originalMeaning.upright,
    reversed: i18nReversed || originalMeaning.reversed,
    keywords: (() => {
      if (!i18nKeywords) {
        return originalMeaning.keywords;
      }
      try {
        const parsed = JSON.parse(i18nKeywords);
        if (Array.isArray(parsed)) {
          return parsed;
        }
        return originalMeaning.keywords;
      } catch (error) {
        console.error(`[Love Position 3] Failed to parse keywords for ${cardName}:`, error);
        return originalMeaning.keywords;
      }
    })(),
    context: i18nContext || originalMeaning.context,
    group: i18nGroup || originalMeaning.group,
  };
};
