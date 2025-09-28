// Bu dosya, Aşk açılımında Pozisyon 4 (Uzun Vadeli Sonuç) için özel kart anlamlarını içerir.
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

export const position4Meanings: LovePositionMeaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_pos4',
    card: 'The Fool',
    position: 4,
    upright:
      'Uzun vadede bu ilişki, sizi tamamen yeni ve beklenmedik bir yola sokacak. Bu, geleneksel bir ilişki olmayabilir, ancak birlikte yeni bir hayata başlama potansiyeli taşıyor. Belirsiz ama heyecan verici bir gelecek.',
    reversed:
      'Ters Fool, uzun vadede bu ilişkinin sorumsuzluk veya bağlanma korkusu nedeniyle havada kalacağını gösterir. Potansiyel bir başlangıç, gerçekleşmeden sona erebilir.',
    keywords: [
      'yeni başlangıç',
      'belirsiz gelecek',
      'risk almak',
      'özgürlük',
      'beklenmedik yol',
    ],
    context:
      'Bu ilişkinin uzun vadeli kaderi, bilinmeyene atılan cesur bir adımdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_pos4',
    card: 'The Magician',
    position: 4,
    upright:
      'Uzun vadede, birlikte istediğiniz ilişkiyi ve hayatı yaratma gücüne sahipsiniz. Bu, bilinçli bir çabayla inşa edilen, dinamik ve güçlü bir birliktelik olacak.',
    reversed:
      'Ters Magician, uzun vadede bir potansiyelin boşa harcanacağını veya bir tarafın diğerini manipüle etmesiyle ilişkinin sona ereceğini gösterir. Güç dengesizliği yıkıma yol açar.',
    keywords: [
      'birlikte yaratma',
      'güçlü gelecek',
      'potansiyel',
      'irade',
      'başarı',
    ],
    context:
      'Bu ilişkinin kaderi, sizin iradenizle şekillenecek, potansiyel dolu bir başyapıt.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_pos4',
    card: 'The High Priestess',
    position: 4,
    upright:
      'Bu ilişkinin uzun vadeli sonucu gizemini koruyor. Her şeyin netleşmesi zaman alacak. Aranızdaki bağ, yüzeyde görünenden daha derin ve ruhsal bir boyutta devam edebilir.',
    reversed:
      'Ters High Priestess, uzun vadede saklanan sırların veya güvensizliğin ilişkiyi bitireceğini gösterir. Birbirinize asla tam olarak açılamayabilirsiniz.',
    keywords: [
      'gizemli gelecek',
      'belirsizlik',
      'sezgisel bağ',
      'saklı potansiyel',
      'zaman',
    ],
    context:
      'Bu ilişkinin nihai kaderi, henüz açığa çıkmamış bir sır gibi, zamanla anlaşılacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_pos4',
    card: 'The Empress',
    position: 4,
    upright:
      'Uzun vadeli sonuç, bereketli, sevgi dolu ve büyüyen bir birlikteliktir. Bu, evlilik, çocuk sahibi olma veya birlikte son derece yaratıcı ve verimli bir hayat kurma potansiyeli taşır.',
    reversed:
      'Ters Empress, uzun vadede ilişkinin durağanlaşacağını, bir tarafın diğerine aşırı bağımlı hale geleceğini veya sevginin boğucu bir hal alacağını gösterir.',
    keywords: ['bereket', 'büyüme', 'evlilik', 'doğurganlık', 'kalıcı sevgi'],
    context:
      'Bu ilişkinin geleceği, sevgiyle sulanan ve sürekli meyve veren bereketli bir bahçe.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_pos4',
    card: 'The Emperor',
    position: 4,
    upright:
      'Uzun vadeli sonuç, son derece istikrarlı, güvenli ve kalıcı bir ilişkidir. Bu, evlilik veya uzun süreli bir ortaklık gibi sağlam yapılar kurmayı işaret eder.',
    reversed:
      'Ters Emperor, uzun vadede kontrol savaşları, duygusal katılık veya bir tarafın dominantlığı nedeniyle ilişkinin bir hapishaneye dönüşeceğini gösterir.',
    keywords: [
      'kalıcı ilişki',
      'istikrar',
      'güvenlik',
      'evlilik',
      'sağlam yapı',
    ],
    context:
      'Bu ilişkinin uzun vadeli kaderi, zamanın testine dayanacak sağlam bir imparatorluk kurmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_pos4',
    card: 'The Hierophant',
    position: 4,
    upright:
      'Bu ilişkinin uzun vadeli sonucu, geleneksel bir bağlılık, genellikle evliliktir. Ortak inançlar ve toplumsal değerler üzerine kurulu, saygın bir birliktelik sizi bekliyor.',
    reversed:
      'Ters Hierophant, uzun vadede toplumsal baskı veya farklı inançlar nedeniyle bu ilişkinin yürümesinin zor olacağını gösterir. Geleneklere bir başkaldırı veya ayrılık.',
    keywords: [
      'evlilik',
      'geleneksel bağlılık',
      'ortak inançlar',
      'toplumsal onay',
      'uzun süreli birliktelik',
    ],
    context:
      'Bu bağın nihai kaderi, toplumun ve geleneklerin kutsadığı resmi bir birliktelik.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_pos4',
    card: 'The Lovers',
    position: 4,
    upright:
      'Uzun vadeli sonuç, derin bir aşk, ruhsal birlik ve uyum dolu bir ortaklıktır. Bu, "ruh eşi" bağlantısının en yüksek potansiyelidir ve kalıcı mutluluğu işaret eder.',
    reversed:
      'Ters Lovers, uzun vadede yanlış bir seçim yapıldığını ve ilişkinin uyumsuzluk nedeniyle sona ereceğini gösterir. Kalplerin ayrılığı kaçınılmazdır.',
    keywords: [
      'ruh eşi',
      'kalıcı aşk',
      'uyumlu ortaklık',
      'mutluluk',
      'doğru seçim',
    ],
    context:
      'Bu ilişkinin kaderi, iki ruhun bir bütün olduğu, derin ve anlamlı bir aşk hikayesi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_pos4',
    card: 'The Chariot',
    position: 4,
    upright:
      'Birlikte zorlukların üstesinden gelerek hedeflerinize ulaşacaksınız. Uzun vadeli sonuç, ortak bir irade ile kazanılmış bir zafer ve başarılı bir birlikteliktir.',
    reversed:
      'Ters Chariot, uzun vadede güç mücadeleleri ve farklı hedefler nedeniyle ilişkinin raydan çıkacağını gösterir. Kontrol kaybı ve başarısızlık.',
    keywords: [
      'ortak zafer',
      'başarı',
      'hedeflere ulaşma',
      'güçlü birliktelik',
      'ilerleme',
    ],
    context:
      'Bu ilişkinin geleceği, zorluklara karşı birlikte kazanılmış bir zaferdir.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_pos4',
    card: 'Strength',
    position: 4,
    upright:
      'Uzun vadeli sonuç, şefkat ve sabırla güçlenmiş, derin ve dayanıklı bir bağdır. Birbirinizin en zorlu yönlerini bile sevgiyle kabul ederek, sarsılmaz bir birliktelik kuracaksınız.',
    reversed:
      'Ters Strength, uzun vadede güvensizlik ve zayıflıkların ilişkiyi yıpratacağını gösterir. Aranızdaki tutku, şefkatle dengelenemez ve bağ kopar.',
    keywords: [
      'dayanıklı bağ',
      'şefkat',
      'sabır',
      'karşılıklı kabul',
      'içsel güç',
    ],
    context:
      'Bu ilişkinin uzun vadeli sonucu, fırtınalara sevgiyle direnen, sarsılmaz bir güçtür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_pos4',
    card: 'The Hermit',
    position: 4,
    upright:
      'Uzun vadede bu ilişki bir ayrılığa veya her iki tarafın da kendi yoluna giderek ruhsal bir arayışa girmesine neden olabilir. Bu, necessarily kötü değildir, kişisel büyüme için bir adımdır.',
    reversed:
      'Ters Hermit, uzun vadede bir yalnızlık ve izolasyon hissinin ilişkiyi bitireceğini gösterir. Birbirinize ulaşamadan, ayrı dünyalarda kaybolacaksınız.',
    keywords: [
      'ayrılık',
      'kişisel yolculuk',
      'yalnızlık',
      'içe dönüş',
      'büyüme',
    ],
    context:
      'Bu ilişkinin kaderi, her iki ruhun da kendi ışığını bulmak için ayrı yollara gitmesidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_pos4',
    card: 'The Wheel of Fortune',
    position: 4,
    upright:
      'Bu ilişkinin uzun vadeli kaderi, kadersel bir dönüm noktasıdır. Birlikte yeni ve şanslı bir döngüye girebilirsiniz. Kader sizi bir araya getirecek.',
    reversed:
      'Ters The Wheel of Fortune, uzun vadede şanssızlıkların ve tekrarlayan olumsuz döngülerin ilişkiyi bitireceğini gösterir. Kader, yollarınızı ayırabilir.',
    keywords: ['kader', 'dönüm noktası', 'şans', 'yeni döngü', 'karmik sonuç'],
    context:
      'Bu ilişkinin nihai sonucu, kader çarkının sizin lehinize veya aleyhinize dönmesidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_pos4',
    card: 'Justice',
    position: 4,
    upright:
      'Uzun vadeli sonuç, hak edilen bir denge ve adalettir. Bu, resmi bir bağlılık (evlilik, yasal ortaklık) veya dürüst bir ayrılık olabilir. Herkes ektiğini biçecektir.',
    reversed:
      'Ters Justice, uzun vadede bir adaletsizlik, haksızlık veya çözülmemiş bir anlaşmazlık nedeniyle ilişkinin sona ereceğini gösterir. Karmik bir borç kalabilir.',
    keywords: [
      'adalet',
      'denge',
      'resmiyet',
      'sebep-sonuç',
      'hak edilen sonuç',
    ],
    context:
      'Bu ilişkinin kaderi, evrensel adaletin tecelli edeceği, adil bir sonuçtur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_pos4',
    card: 'The Hanged Man',
    position: 4,
    upright:
      'Uzun vadede bu ilişki bir belirsizlik içinde kalabilir veya bir duraklama dönemine girebilir. Bir sonuca varmadan önce, olaylara farklı bir perspektiften bakmanız gerekecek.',
    reversed:
      'Ters Hanged Man, uzun vadede bir tarafın boşuna fedakarlık yapmasıyla veya bir çıkmazdan kurtulamayarak ilişkinin sona ereceğini gösterir. Bir kurban etme durumu.',
    keywords: ['belirsizlik', 'duraklama', 'fedakarlık', 'çıkmaz', 'bekleyiş'],
    context:
      'Bu ilişkinin uzun vadeli kaderi, bir sonuca ulaşmadan askıda kalmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_pos4',
    card: 'Death',
    position: 4,
    upright:
      'Uzun vadeli sonuç, kaçınılmaz bir son ve köklü bir dönüşümdür. Bu ilişki mevcut haliyle devam edemez. Bu bitiş, her ikiniz için de yeni ve daha sağlıklı başlangıçlara yol açacaktır.',
    reversed:
      'Ters Death, kaçınılmaz bir sona direnmenin uzun vadede her iki tarafa da daha fazla acı vereceğini gösterir. Bitemeyen, çürüyen bir ilişki.',
    keywords: [
      'kaçınılmaz son',
      'dönüşüm',
      'bitiş',
      'yeniden doğuş',
      'vazgeçiş',
    ],
    context:
      'Bu ilişkinin kaderi, eskiyi tamamen bitirip yeni bir hayata başlamaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_pos4',
    card: 'Temperance',
    position: 4,
    upright:
      'Uzun vadeli sonuç, son derece dengeli, uyumlu ve huzurlu bir birlikteliktir. Birbirinizin en iyi yönlerini ortaya çıkararak, sakin ve sevgi dolu bir ortaklık kuracaksınız.',
    reversed:
      'Ters Temperance, uzun vadede uyumsuzluk ve çatışmaların ilişkiyi yıpratacağını gösterir. Denge bir türlü bulunamaz ve yollar ayrılır.',
    keywords: ['denge', 'uyum', 'huzur', 'uzun süreli ortaklık', 'şifa'],
    context:
      'Bu ilişkinin uzun vadeli potansiyeli, iki ruhun mükemmel bir uyumla harmanlandığı şifalı bir bağdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_pos4',
    card: 'The Devil',
    position: 4,
    upright:
      'Uzun vadede bu ilişki, sağlıksız bir bağımlılığa, takıntıya veya toksik bir dinamiğe dönüşebilir. Birbirinizden kopmakta zorlanacağınız, karmik ve zorlayıcı bir bağ.',
    reversed:
      'Ters Devil, uzun vadede bu sağlıksız bağın zincirlerini kıracağınızı ve özgürleşeceğinizi gösterir. Acı verici ama gerekli bir kopuş.',
    keywords: [
      'toksik ilişki',
      'bağımlılık',
      'takıntı',
      'karmik bağ',
      'kopamama',
    ],
    context:
      'Bu ilişkinin uzun vadeli kaderi, birbirine zarar veren ama ayrılamayan iki ruhun hikayesidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_pos4',
    card: 'The Tower',
    position: 4,
    upright:
      'Uzun vadeli sonuç, ani ve sarsıcı bir ayrılık veya ilişkinin temellerini yıkan bir aydınlanmadır. Mevcut yapı sürdürülemez ve beklenmedik bir şekilde sona erecektir.',
    reversed:
      'Ters Kule, kaçınılmaz bir ayrılıktan veya krizden korkarak bu süreci uzattığınızı gösterir. Uzun vadede, bu durum daha büyük bir duygusal çöküşe yol açabilir.',
    keywords: ['ani ayrılık', 'yıkım', 'kriz', 'beklenmedik son', 'yüzleşme'],
    context:
      'Bu ilişkinin uzun vadeli kaderi, sağlam olmayan temellerin kaçınılmaz yıkımıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_pos4',
    card: 'The Star',
    position: 4,
    upright:
      'Uzun vadeli sonuç, umut, şifa ve ilham dolu bir gelecektir. Bu ilişki, zor zamanların ardından gelen bir hediye gibidir ve size kalıcı bir mutluluk ve huzur getirebilir.',
    reversed:
      'Ters Star, uzun vadede umutların tükeneceğini ve hayal kırıklığı yaşanacağını gösterir. İlişki, parlaklığını yitirip sıradanlaşabilir.',
    keywords: ['umutlu gelecek', 'şifa', 'mutluluk', 'ilham', 'huzur'],
    context:
      'Bu ilişkinin kaderi, karanlıktan sonra doğan, parlak ve umut dolu bir şafaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_pos4',
    card: 'The Moon',
    position: 4,
    upright:
      'Bu ilişkinin uzun vadeli sonucu belirsizliğini koruyacaktır. Korkular, yanılsamalar veya gizli durumlar, ilişkinin geleceğini sürekli olarak etkileyebilir. Net bir sonuca varmak zordur.',
    reversed:
      'Ters Moon, uzun vadede bir aldatmacanın veya gizli bir durumun ortaya çıkmasıyla ilişkinin sona ereceğini gösterir. Güvensizlik, bağı tamamen yok eder.',
    keywords: [
      'belirsiz gelecek',
      'yanılsama',
      'korkular',
      'aldatma',
      'güvensizlik',
    ],
    context:
      'Bu ilişkinin uzun vadeli kaderi, sisler arasında yolunu kaybetmiş bir gemi gibi belirsizdir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_pos4',
    card: 'The Sun',
    position: 4,
    upright:
      'Uzun vadeli sonuç, büyük bir mutluluk, neşe, başarı ve açıklıktır. Bu, son derece pozitif, aydınlık ve tatmin edici bir birlikteliğin habercisidir.',
    reversed:
      'Ters Sun, uzun vadede bir mutluluk potansiyelinin tam olarak gerçekleştirilemeyeceğini gösterir. İlişki devam etse bile, bir gölge veya eksiklik hissi kalabilir.',
    keywords: [
      'büyük mutluluk',
      'başarı',
      'neşe',
      'açıklık',
      'tatmin edici gelecek',
    ],
    context:
      'Bu ilişkinin kaderi, her günü aydınlatan, sıcak ve parlak bir güneştir.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_pos4',
    card: 'Judgement',
    position: 4,
    upright:
      'Uzun vadede bu ilişki bir uyanış yaşayacak. Bu, bir affetme, barışma ve ilişkiye ikinci bir şans verme anlamına gelebilir. Karmik bir hesaplaşma ve yeniden doğuş.',
    reversed:
      'Ters Judgement, uzun vadede geçmişin hatalarını affedememe veya sürekli birbirini yargılama nedeniyle ilişkinin sona ereceğini gösterir. Bir şans daha olmayacak.',
    keywords: [
      'ikinci şans',
      'uyanış',
      'affetme',
      'hesaplaşma',
      'yeniden doğuş',
    ],
    context:
      'Bu ilişkinin nihai kaderi, geçmişiyle yüzleşip yeniden doğmak ya da yargılar altında ezilmek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_pos4',
    card: 'The World',
    position: 4,
    upright:
      'Bu ilişkinin uzun vadeli sonucu, bir tamamlanma, bütünlük ve derin bir mutluluktur. Birlikte bir döngüyü başarıyla tamamlayacak ve aradığınız her şeyi bu bağda bulacaksınız. Nihai başarı.',
    reversed:
      'Ters Dünya, uzun vadede bir şeylerin eksik kalacağını, bir tamamlanmamışlık hissi yaşanacağını gösterir. Hedeflerinize ulaşamadan bu ilişki döngüsü kapanabilir.',
    keywords: ['tamamlanma', 'başarı', 'mutluluk', 'bütünlük', 'döngünün sonu'],
    context:
      'Uzun vadede bu ilişki, tatmin ve başarıyla dolu bir yolculuğun mutlu sonudur.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_pos4',
    card: 'Ace of Cups',
    position: 4,
    upright:
      'Uzun vadeli sonuç, derin ve gerçek bir aşkın başlangıcıdır. Bu, duygusal olarak son derece tatmin edici, sevgi dolu ve potansiyeli yüksek bir birlikteliğin habercisidir.',
    reversed:
      'Ters Kupa Ası, uzun vadede duygusal bir hayal kırıklığı veya sevginin karşılık bulamaması anlamına gelir. Duygusal potansiyel gerçekleşmeden solar.',
    keywords: [
      'gerçek aşk',
      'duygusal başlangıç',
      'mutluluk',
      'şefkat',
      'yeni ilişki',
    ],
    context: 'Bu ilişkinin geleceği, taşan bir sevgi ve mutluluk pınarıdır.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_pos4',
    card: 'Two of Cups',
    position: 4,
    upright:
      'Uzun vadeli sonuç, güçlü ve karşılıklı bir sevgiye dayalı, son derece uyumlu bir ortaklıktır. Bu, evlilik veya derin bir bağlılıkla sonuçlanabilecek bir ruh eşi bağlantısıdır.',
    reversed:
      'Ters Kupa İkilisi, uzun vadede bir uyumsuzluk veya duygusal kopukluk nedeniyle ayrılık yaşanacağını gösterir. Bağlantı, zamanla zayıflar.',
    keywords: [
      'uyumlu ortaklık',
      'evlilik',
      'ruh eşi',
      'karşılıklı sevgi',
      'bağlılık',
    ],
    context:
      'Bu ilişkinin kaderi, iki kalbin mükemmel bir uyum içinde attığı, kalıcı bir birlikteliktir.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_pos4',
    card: 'Three of Cups',
    position: 4,
    upright:
      'Uzun vadeli sonuç, mutlu, sosyal ve kutlamalarla dolu bir birlikteliktir. Bu, nişan, evlilik veya mutlu bir olayın kutlanması anlamına gelebilir. Arkadaşlık temelinde güçlü bir aşk.',
    reversed:
      'Ters Kupa Üçlüsü, uzun vadede bir üçüncü kişinin (veya bir aldatmanın) ilişkiyi bitireceğini gösterir. Neşe, yerini dedikoduya ve acıya bırakır.',
    keywords: [
      'mutlu kutlama',
      'evlilik',
      'nişan',
      'sosyal uyum',
      'arkadaşça aşk',
    ],
    context:
      'Bu ilişkinin geleceği, sevdiklerinizle birlikte kutlanacak neşeli bir olaydır.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_pos4',
    card: 'Four of Cups',
    position: 4,
    upright:
      'Uzun vadede bu ilişki bir durgunluğa veya tatminsizliğe yol açabilir. Bir tarafın ilgisizliği veya can sıkıntısı, ilişkinin sona ermesine neden olabilir.',
    reversed:
      'Ters Kupa Dörtlüsü, bir durgunluk döneminden sonra bu ilişkiye yeni bir şans vereceğinizi ve potansiyelini yeniden keşfedeceğinizi gösterir.',
    keywords: [
      'durgunluk',
      'tatminsizlik',
      'ilgisizlik',
      'kaçırılan fırsat',
      'ayrılık potansiyeli',
    ],
    context:
      'Bu ilişkinin uzun vadeli kaderi, sunulan sevgiye karşı bir kayıtsızlık ve uzaklaşmadır.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_pos4',
    card: 'Five of Cups',
    position: 4,
    upright:
      'Uzun vadeli sonuç, bir kayıp, pişmanlık ve kederdir. Bu ilişki, bir hayal kırıklığı ile sona erebilir ve geriye sadece acı anılar kalabilir.',
    reversed:
      'Ters Kupa Beşlisi, uzun vadede geçmişin acılarını affedip yola devam etmeyi başaracağınızı gösterir. Zor bir iyileşme sürecinin ardından gelen kabulleniş.',
    keywords: ['kayıp', 'pişmanlık', 'keder', 'hayal kırıklığı', 'üzücü son'],
    context:
      'Bu ilişkinin geleceği, geçmişin kayıplarına odaklanmaktan önünüzdeki mutluluğu görememektir.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_pos4',
    card: 'Six of Cups',
    position: 4,
    upright:
      'Uzun vadeli sonuç, geçmişten gelen bir bağın yeniden canlanması ve mutlu bir şekilde devam etmesidir. Bu, masum, tatlı ve güvenli bir sevgi ortamı vaat eder.',
    reversed:
      'Ters Kupa Altılısı, uzun vadede geçmişe takılıp kalmanın veya olgunlaşamamanın ilişkiyi bitireceğini gösterir. Geçmişin gölgeleri geleceği karartır.',
    keywords: [
      'geçmişin canlanması',
      'mutlu anılar',
      'güvenli sevgi',
      'masumiyet',
      'kalıcı bağ',
    ],
    context:
      'Bu ilişkinin kaderi, geçmişin tatlılığı ve masumiyeti üzerine kurulu, huzurlu bir gelecek.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_pos4',
    card: 'Seven of Cups',
    position: 4,
    upright:
      'Uzun vadede bu ilişki bir kafa karışıklığı ve kararsızlık içinde kalacaktır. Çok fazla seçenek veya gerçekçi olmayan beklentiler, somut bir sonuca ulaşmayı engeller.',
    reversed:
      'Ters Kupa Yedilisi, uzun vadede bir yanılsamanın ortaya çıkmasıyla veya net bir karar verilmesiyle bir sonuca varılacağını gösterir. Bu, ayrılık da olabilir.',
    keywords: [
      'kararsızlık',
      'kafa karışıklığı',
      'yanılsama',
      'seçenekler',
      'belirsiz sonuç',
    ],
    context:
      'Bu ilişkinin geleceği, seçenekler arasında kaybolmuş, net bir yönden yoksun bir hayaldir.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_pos4',
    card: 'Eight of Cups',
    position: 4,
    upright:
      'Uzun vadeli sonuç, bir tarafın veya her ikisinin de duygusal olarak tatmin olmadığı için bu ilişkiyi geride bırakmasıdır. Daha derin bir anlam arayışıyla yollar ayrılacaktır.',
    reversed:
      'Ters Kupa Sekizlisi, uzun vadede bir gitme-kalma mücadelesi yaşanacağını gösterir. Mutsuz olsanız bile ayrılmaktan korkarak, bu durumda sıkışıp kalabilirsiniz.',
    keywords: [
      'ayrılık',
      'terk etme',
      'yeni arayış',
      'tatminsizlik',
      'yol ayrımı',
    ],
    context:
      'Bu ilişkinin kaderi, daha fazlasını aramak için bildik limanlardan ayrılmaktır.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_pos4',
    card: 'Nine of Cups',
    position: 4,
    upright:
      'Uzun vadeli sonuç, son derece tatmin edici, mutlu ve dileklerinizin gerçekleştiği bir birlikteliktir. Aradığınız duygusal ve maddi doyuma ulaşırsınız.',
    reversed:
      'Ters Kupa Dokuzlusu, uzun vadede bir tatminsizlik veya bencillik nedeniyle hayal kırıklığı yaşanacağını gösterir. Görünen mutluluk, yüzeysel kalabilir.',
    keywords: [
      'dileklerin kabulü',
      'mutluluk',
      'duygusal tatmin',
      'keyif',
      'başarı',
    ],
    context:
      'Bu ilişkinin geleceği, her iki tarafın da kendini şanslı ve tatmin olmuş hissettiği, mutlu bir sonuçtur.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_pos4',
    card: 'Ten of Cups',
    position: 4,
    upright:
      "Uzun vadeli sonuç, kalıcı mutluluk, duygusal doyum ve uyumlu bir aile hayatıdır. Bu, hayallerdeki 'mutlu son' kartıdır. Birlikte bir yuva kurabilirsiniz.",
    reversed:
      'Ters Kupa Onlusu, uzun vadede duygusal uyumsuzluk ve hayal kırıklığına işaret eder. Mutluluk tablosu bir türlü tamamlanamaz ve aile içinde sorunlar yaşanabilir.',
    keywords: [
      'kalıcı mutluluk',
      'aile',
      'uyum',
      'duygusal doyum',
      'mutlu son',
    ],
    context:
      'Bu bağın uzun vadeli potansiyeli, gökkuşağının altındaki o mükemmel aile tablosudur.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_pos4',
    card: 'Page of Cups',
    position: 4,
    upright:
      'Uzun vadede bu ilişki, romantik ve hassas bir şekilde gelişmeye devam edecektir. Bu, bir nişan teklifi, hamilelik haberi veya sevginin yaratıcı bir ifadesi olabilir.',
    reversed:
      'Ters Kupa Uşağı, uzun vadede duygusal olgunlaşmamışlık veya hayal kırıklığı yaratan haberler nedeniyle ilişkinin zora gireceğini gösterir.',
    keywords: [
      'romantik gelişme',
      'iyi haber',
      'yaratıcılık',
      'hassasiyet',
      'nişan',
    ],
    context:
      'Bu ilişkinin geleceği, kalpten gelen bir mesajla şekillenecek, umut dolu bir başlangıç.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_pos4',
    card: 'Knight of Cups',
    position: 4,
    upright:
      'Uzun vadeli sonuç, romantik bir teklif, evlilik veya son derece idealist bir aşkın gerçekleşmesidir. Hayallerinizdeki romantik partnerle bir gelecek sizi bekliyor.',
    reversed:
      'Ters Kupa Şövalyesi, uzun vadede romantik hayallerin bir hayal kırıklığı ile sonuçlanacağını gösterir. Verilen sözler tutulmayabilir.',
    keywords: [
      'evlilik teklifi',
      'romantizm',
      'ideal aşk',
      'gerçekleşen hayaller',
      'bağlılık',
    ],
    context:
      'Bu ilişkinin kaderi, beyaz atlı prensin geldiği ve mutlu sonun başladığı bir masal gibidir.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_pos4',
    card: 'Queen of Cups',
    position: 4,
    upright:
      'Uzun vadeli sonuç, derin bir sezgisel anlayış, şefkat ve empati üzerine kurulu, son derece sevgi dolu bir birlikteliktir. Birbirinizin ruhunu besleyerek, kalıcı bir mutluluk bulacaksınız.',
    reversed:
      'Ters Kupa Kraliçesi, uzun vadede aşırı duygusallık veya duygusal manipülasyonun ilişkiyi yıpratacağını gösterir. Duygusal denge kaybolur.',
    keywords: [
      'koşulsuz sevgi',
      'empati',
      'şefkat',
      'kalıcı mutluluk',
      'sezgisel bağ',
    ],
    context:
      'Bu ilişkinin geleceği, birbirini koşulsuz bir sevgi ve anlayışla kucaklayan iki ruhun birliğidir.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_pos4',
    card: 'King of Cups',
    position: 4,
    upright:
      'Uzun vadeli sonuç, duygusal olgunluk, istikrar ve şefkat üzerine kurulu, son derece dengeli bir ilişkidir. Bu, zamanın testine dayanacak, bilge ve sevgi dolu bir ortaklıktır.',
    reversed:
      'Ters Kupa Kralı, uzun vadede bir tarafın duygusal olarak mesafeli veya manipülatif olması nedeniyle ilişkinin tatmin edici olmayacağını gösterir.',
    keywords: [
      'duygusal olgunluk',
      'istikrarlı aşk',
      'kalıcı bağlılık',
      'bilgelik',
      'şefkat',
    ],
    context:
      'Bu ilişkinin kaderi, duygularını ustalıkla yöneten iki insanın kurduğu, huzurlu bir krallıktır.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_pos4',
    card: 'Ace of Swords',
    position: 4,
    upright:
      'Uzun vadeli sonuç, bir gerçeğin net bir şekilde ortaya çıkmasıdır. Bu, ya ilişkiyi daha güçlü bir temele oturtacak bir dürüstlük anı ya da bir ayrılık kararı olabilir. Net bir sonuç kaçınılmaz.',
    reversed:
      'Ters Kılıç Ası, uzun vadede çözülmemiş çatışmalar ve yanlış anlaşılmaların ilişkiyi bitireceğini gösterir. Netlik bir türlü sağlanamaz.',
    keywords: ['net sonuç', 'gerçek', 'karar', 'dürüstlük', 'aydınlanma'],
    context:
      'Bu ilişkinin kaderi, her şeyi değiştirecek, keskin ve net bir hakikat anıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_pos4',
    card: 'Two of Swords',
    position: 4,
    upright:
      'Uzun vadede bu ilişki bir çıkmazda kalacaktır. Önemli bir karar verilemediği için, ilişki ne ilerler ne de biter. Bir kararsızlık durumu devam eder.',
    reversed:
      'Ters Kılıç İkilisi, uzun vadede bir kararsızlık nedeniyle bir tarafın pes edeceğini veya dış bir gücün ilişkiyi bitireceğini gösterir. Çıkmaz, bir kopuşla sonuçlanır.',
    keywords: [
      'çıkmaz',
      'kararsızlık',
      'belirsizlik',
      'sonuçsuzluk',
      'ateşkes',
    ],
    context:
      'Bu ilişkinin uzun vadeli kaderi, bir karar verilemediği için askıda kalmaktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_pos4',
    card: 'Three of Swords',
    position: 4,
    upright:
      'Uzun vadeli sonuç, kaçınılmaz bir kalp kırıklığı, ayrılık ve kederdir. Bu ilişki, acı verici bir şekilde sona erecektir.',
    reversed:
      'Ters Kılıç Üçlüsü, uzun vadede bir ayrılığın veya ihanetin acısının bir türlü geçmeyeceğini gösterir. Sürekli bir keder ve iyileşememe durumu.',
    keywords: ['ayrılık', 'kalp kırıklığı', 'keder', 'acı', 'ihanet'],
    context: 'Bu ilişkinin kaderi, acı, gözyaşı ve kederle dolu bir sondur.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_pos4',
    card: 'Four of Swords',
    position: 4,
    upright:
      'Uzun vadede bu ilişki bir duraklama dönemine girecek. Bu, geçici bir ayrılık veya ilişkinin geleceğini düşünmek için bir mola olabilir. Bir son değil, bir dinlenme.',
    reversed:
      'Ters Kılıç Dörtlüsü, uzun vadede sorunlardan kaçarak veya dinlenmeyi reddederek ilişkinin yavaşça tükeneceğini ve biteceğini gösterir.',
    keywords: [
      'duraklama',
      'mola',
      'geçici ayrılık',
      'dinlenme',
      'iyileşme süreci',
    ],
    context:
      'Bu ilişkinin geleceği, bir süreliğine rafa kaldırılacak, bir nefes alma molasıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_pos4',
    card: 'Five of Swords',
    position: 4,
    upright:
      'Uzun vadeli sonuç, acı ve kayıplarla dolu bir çatışma ve ayrılıktır. Bu, kazananı olmayan bir savaştır ve geriye sadece pişmanlık ve düşmanlık kalır.',
    reversed:
      'Ters Kılıç Beşlisi, uzun vadede bir tarafın diğerini tamamen yeneceği veya ilişkinin onarılamaz bir şekilde hasar göreceği bir sonu gösterir. Geri dönüşü olmayan bir yıkım.',
    keywords: ['düşmanca ayrılık', 'çatışma', 'yenilgi', 'pişmanlık', 'kayıp'],
    context:
      'Bu ilişkinin geleceği, her iki tarafın da kaybettiği, onur kırıcı bir savaştır.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_pos4',
    card: 'Six of Swords',
    position: 4,
    upright:
      'Uzun vadede, zorlu bir dönemin ardından birlikte daha sakin ve huzurlu bir geleceğe yol alacaksınız. Bu, sorunları geride bırakıp, yavaş ama emin adımlarla iyileşmektir.',
    reversed:
      'Ters Kılıç Altılısı, uzun vadede geçmişin sorunlarından bir türlü kurtulamayacağınızı ve ilişkinin bu yük altında ezileceğini gösterir.',
    keywords: [
      'huzurlu gelecek',
      'iyileşme',
      'geçiş',
      'sorunları aşma',
      'sakinlik',
    ],
    context:
      'Bu ilişkinin kaderi, fırtınalı denizlerden ayrılıp sakin bir limana ulaşmaktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_pos4',
    card: 'Seven of Swords',
    position: 4,
    upright:
      'Uzun vadeli sonuç, bir aldatma, dürüstlük eksikliği veya bir tarafın ilişkiyi gizlice terk etmesidir. Güven eksikliği, bu bağın sonunu getirecektir.',
    reversed:
      'Ters Kılıç Yedilisi, uzun vadede bir yalanın ortaya çıkmasıyla ilişkinin ani ve sancılı bir şekilde biteceğini gösterir. Yüzleşme kaçınılmazdır.',
    keywords: [
      'aldatma',
      'ayrılık',
      'güvensizlik',
      'sırlar',
      'dürüstlük eksikliği',
    ],
    context:
      'Bu ilişkinin kaderi, güvenin ihanete uğramasıyla gelen bir sondur.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_pos4',
    card: 'Eight of Swords',
    position: 4,
    upright:
      'Uzun vadede bu ilişki, sizi kapana kısılmış ve çaresiz hissettiren bir duruma dönüşecektir. Korkularınız ve kısıtlamalarınız nedeniyle bu bağdan kurtulamayabilirsiniz.',
    reversed:
      'Ters Kılıç Sekizlisi, uzun vadede bu kısıtlayıcı ilişkiden kurtulmak için bir yol bulacağınızı gösterir. Bu, özgürleşme ile sonuçlanacak bir ayrılıktır.',
    keywords: [
      'kapana kısılma',
      'çaresizlik',
      'kısıtlayıcı ilişki',
      'korku',
      'özgürleşme ihtiyacı',
    ],
    context:
      'Bu ilişkinin geleceği, kendi yarattığınız korkularla inşa edilmiş bir hapishanedir.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_pos4',
    card: 'Nine of Swords',
    position: 4,
    upright:
      'Uzun vadeli sonuç, endişe, suçluluk ve korku dolu bir ilişkidir. Bu bağ, size mutluluktan çok zihinsel acı getirecek ve bir kabusa dönüşecektir.',
    reversed:
      'Ters Kılıç Dokuzlusu, uzun vadede bir krizin veya büyük bir korkunun ilişkiyi bitireceğini gösterir. Endişeler gerçeğe dönüşebilir.',
    keywords: ['endişe', 'korku', 'zihinsel acı', 'kabus', 'suçluluk'],
    context:
      'Bu ilişkinin geleceği, endişe ve pişmanlıklarla dolu, uykusuz bir gecedir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_pos4',
    card: 'Ten of Swords',
    position: 4,
    upright:
      'Uzun vadeli sonuç, acı verici ve kesin bir sondur. Bu ilişki, bir ihanet veya kaçınılmaz bir çöküşle sona erecektir. Bu bitiş, aynı zamanda yeni bir başlangıç için bir zorunluluktur.',
    reversed:
      'Ters Kılıç Onlusu, acı verici bir sonun sürekli ertelendiğini veya bir ayrılığın ardından bile acının uzun süre devam edeceğini gösterir. Bir türlü tam olarak bitmez.',
    keywords: ['kesin son', 'ihanet', 'acı', 'çöküş', 'yenilgi'],
    context:
      'Bu ilişkinin kaderi, kaçınılmaz ve acı dolu bir finalle noktalanmaktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_pos4',
    card: 'Page of Swords',
    position: 4,
    upright:
      'Bu ilişkinin geleceği, sürekli bir sorgulama ve iletişim içinde olacak. Bu, zihinsel olarak uyarıcı olabilir, ancak aynı zamanda sürekli tartışmalara ve anlaşmazlıklara da yol açabilir.',
    reversed:
      'Ters Kılıç Uşağı, uzun vadede kırıcı sözler ve dürüst olmayan iletişimin ilişkiyi bitireceğini gösterir. Birbirinize karşı sabırsız olacaksınız.',
    keywords: [
      'sürekli tartışma',
      'iletişim sorunları',
      'anlaşmazlık',
      'sorgulama',
      'net olmayan gelecek',
    ],
    context:
      'Bu ilişkinin geleceği, bitmeyen bir müzakere ve zihinsel bir satranç oyunu.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_pos4',
    card: 'Knight of Swords',
    position: 4,
    upright:
      'Uzun vadeli sonuç, ani ve hızlı bir ayrılıktır. Bir taraf, düşünmeden ve hızla ilişkiyi bitirme kararı alabilir.',
    reversed:
      'Ters Kılıç Şövalyesi, uzun vadede büyük ve yıkıcı bir kavganın ardından gelen bir ayrılığı gösterir. Geri dönüşü olmayan sözler söylenebilir.',
    keywords: ['ani ayrılık', 'hızlı son', 'düşüncesizlik', 'kavga', 'kopuş'],
    context:
      'Bu ilişkinin kaderi, bir fırtına gibi aniden gelip her şeyi yıkan bir sondur.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_pos4',
    card: 'Queen of Swords',
    position: 4,
    upright:
      'Uzun vadeli sonuç, net ve mantıklı bir kararla yolların ayrılmasıdır. Bu, acı tecrübelerden sonra gelen, duygusal olmayan ama dürüst bir son olabilir. Bağımsızlık kazanılır.',
    reversed:
      'Ters Kılıç Kraliçesi, uzun vadede soğukluk, mesafe ve affetmemenin ilişkiyi bitireceğini gösterir. Yalnız ve kinci bir son.',
    keywords: [
      'mantıklı ayrılık',
      'bağımsızlık',
      'net karar',
      'dürüst son',
      'mesafe',
    ],
    context:
      'Bu ilişkinin geleceği, duygulardan arınmış, keskin ve net bir karardır.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_pos4',
    card: 'King of Swords',
    position: 4,
    upright:
      'Uzun vadeli sonuç, entelektüel bir ortaklık veya adil ve mantıklı bir ayrılıktır. Duygular yerine, gerçekler ve mantık üzerine kurulu bir karara varılacaktır.',
    reversed:
      'Ters Kılıç Kralı, uzun vadede bir tarafın diğerine karşı zihinsel üstünlük kurması veya manipülasyonuyla ilişkinin sona ereceğini gösterir. Soğuk ve adaletsiz bir son.',
    keywords: [
      'adil sonuç',
      'mantıklı karar',
      'entelektüel ortaklık',
      'dürüstlük',
      'otorite',
    ],
    context:
      'Bu ilişkinin kaderi, bir yargıcın verdiği gibi, nihai ve adil bir kararla belirlenir.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_pos4',
    card: 'Ace of Wands',
    position: 4,
    upright:
      'Uzun vadeli sonuç, birlikte yeni ve tutkulu bir maceraya atılmaktır. Bu, yeni bir başlangıç, birlikte bir proje veya enerjik bir birlikteliğin habercisidir.',
    reversed:
      'Ters Asa Ası, uzun vadede bir potansiyelin gerçekleşemeyeceğini ve tutkunun sönümleneceğini gösterir. Bir başlangıç yapılamadan her şey biter.',
    keywords: [
      'yeni başlangıç',
      'tutkulu gelecek',
      'macera',
      'yaratıcılık',
      'enerji',
    ],
    context:
      'Bu ilişkinin geleceği, yeni bir hayatı ateşleyen, parlak bir tutku kıvılcımıdır.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_pos4',
    card: 'Two of Wands',
    position: 4,
    upright:
      'Uzun vadeli sonuç, birlikte cesur planlar yapmak ve geleceğe doğru ilerlemektir. Bu, ortak bir vizyonla hareket eden, başarılı bir ortaklık olabilir.',
    reversed:
      'Ters Asa İkilisi, uzun vadede kararsızlık veya gelecek korkusu nedeniyle ilişkinin bir yere varamayacağını gösterir. Potansiyel, eyleme dökülemez.',
    keywords: [
      'ortak gelecek',
      'planlama',
      'başarılı ortaklık',
      'vizyon',
      'ilerleme',
    ],
    context: 'Bu ilişkinin kaderi, ortak bir vizyonla dünyayı fethetmektir.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_pos4',
    card: 'Three of Wands',
    position: 4,
    upright:
      'Uzun vadeli sonuç, ortak çabalarınızın meyvelerini toplamanız ve geleceğe umutla bakmanızdır. Bu, genişleyen ve büyüyen, başarılı bir ilişkiyi gösterir.',
    reversed:
      'Ters Asa Üçlüsü, uzun vadede planların suya düşeceğini ve hayal kırıklığı yaşanacağını gösterir. Beklentiler karşılanmaz.',
    keywords: [
      'başarılı gelecek',
      'genişleme',
      'beklentilerin karşılanması',
      'büyüme',
      'umut',
    ],
    context:
      'Bu ilişkinin geleceği, ufukta parlak fırsatların belirdiği, umut dolu bir bekleyiştir.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_pos4',
    card: 'Four of Wands',
    position: 4,
    upright:
      'Uzun vadeli sonuç, istikrarlı, mutlu ve kutlamalarla dolu bir birlikteliktir. Bu, evlilik, birlikte yaşama veya mutlu bir yuva kurma anlamına gelir.',
    reversed:
      'Ters Asa Dörtlüsü, uzun vadede bir istikrarsızlık veya temel uyumsuzluklar nedeniyle ilişkinin sağlam bir zemine oturamayacağını gösterir.',
    keywords: [
      'evlilik',
      'mutlu yuva',
      'istikrar',
      'kutlama',
      'kalıcı mutluluk',
    ],
    context:
      'Bu ilişkinin kaderi, birlikte kutlanacak mutlu ve sağlam bir gelecektir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_pos4',
    card: 'Five of Wands',
    position: 4,
    upright:
      'Uzun vadede bu ilişki, sürekli bir çatışma, rekabet ve sürtüşme içinde olacaktır. Bu, enerjinizi tüketen, yorucu bir dinamiktir.',
    reversed:
      'Ters Asa Beşlisi, uzun vadede büyük bir çatışmadan kaçınmanın, sorunları halının altına süpürmenin ilişkiyi bitireceğini gösterir. Bastırılmış gerilim patlar.',
    keywords: [
      'sürekli çatışma',
      'rekabet',
      'uyumsuzluk',
      'yorucu ilişki',
      'gerilim',
    ],
    context:
      'Bu ilişkinin geleceği, kazananı olmayan, bitmek bilmeyen bir savaştır.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_pos4',
    card: 'Six of Wands',
    position: 4,
    upright:
      'Uzun vadeli sonuç, birlikte kazanılmış bir zafer ve toplum tarafından takdir edilen, başarılı bir ilişkidir. Birlikte parlayacak ve özgüven kazanacaksınız.',
    reversed:
      'Ters Asa Altılısı, uzun vadede bir başarısızlık veya bir tarafın diğerini gölgede bırakmasıyla sonuçlanacak bir ilişkiyi gösterir. Kamuoyu önünde bir düşüş.',
    keywords: ['ortak zafer', 'başarı', 'takdir', 'mutlu son', 'özgüven'],
    context: 'Bu ilişkinin kaderi, herkesin imreneceği, parlak bir zaferdir.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_pos4',
    card: 'Seven of Wands',
    position: 4,
    upright:
      'Uzun vadede, ilişkinizi dış etkenlere ve zorluklara karşı sürekli olarak savunmanız gerekecek. Bu, yorucu ama başarılı olabilecek bir mücadeledir.',
    reversed:
      'Ters Asa Yedilisi, uzun vadede dış baskılara veya zorluklara yenik düşerek ilişkinin sona ereceğini gösterir. Mücadeleyi kaybedersiniz.',
    keywords: [
      'sürekli mücadele',
      'savunma',
      'meydan okuma',
      'dayanıklılık',
      'zorlu gelecek',
    ],
    context:
      'Bu ilişkinin geleceği, sürekli bir savunma ve mücadele gerektiren bir direniştir.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_pos4',
    card: 'Eight of Wands',
    position: 4,
    upright:
      'Uzun vadeli sonuç, hızlı ve heyecan verici gelişmelerle dolu bir gelecektir. Bu, ani bir evlilik teklifi, birlikte taşınma veya hızla ilerleyen bir ilişki olabilir.',
    reversed:
      'Ters Asa Sekizlisi, uzun vadede yanlış zamanlama, gecikmeler veya kıskançlık nedeniyle ilişkinin hızla sona ereceğini gösterir.',
    keywords: [
      'hızlı gelişmeler',
      'heyecanlı gelecek',
      'ilerleme',
      'iyi haberler',
      'evlilik teklifi',
    ],
    context:
      'Bu ilişkinin kaderi, sizi hızla mutlu bir sona ulaştıracak bir dizi olaydır.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_pos4',
    card: 'Nine of Wands',
    position: 4,
    upright:
      'Uzun vadede bu ilişki, yorgun ama dayanıklı bir şekilde devam edecektir. Geçmişin yaralarına rağmen, birbirinizden vazgeçmeyeceksiniz. Yorucu ama kalıcı bir bağ.',
    reversed:
      'Ters Asa Dokuzlusu, uzun vadede geçmişin güvensizlikleri ve yaraları nedeniyle ilişkinin bir noktada pes edeceğini gösterir. Direnç kırılır.',
    keywords: [
      'dayanıklılık',
      'kalıcı bağ',
      'güvensizlik',
      'yorucu ilişki',
      'vazgeçmeme',
    ],
    context:
      'Bu ilişkinin kaderi, tüm yaralara rağmen ayakta kalmayı başaran yorgun bir savaşçıdır.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_pos4',
    card: 'Ten of Wands',
    position: 4,
    upright:
      'Uzun vadede bu ilişki, bir zevkten çok ağır bir yüke dönüşecektir. Sorumluluklar ve baskılar, sevgiyi ve tutkuyu yok edebilir.',
    reversed:
      'Ters Asa Onlusu, uzun vadede bu yükün altında ezilerek ilişkinin sona ereceğini veya bir tarafın tüm sorumluluğu bırakıp gideceğini gösterir.',
    keywords: ['ağır yük', 'sorumluluk', 'tükenmişlik', 'baskı', 'yorucu son'],
    context:
      'Bu ilişkinin geleceği, taşınması imkansız hale gelen, ağır bir sorumluluktur.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_pos4',
    card: 'Page of Wands',
    position: 4,
    upright:
      'Uzun vadeli sonuç, birlikte yeni maceralara atılmak, keşfetmek ve eğlenmektir. Bu, genç ve enerjik bir ruhla devam eden, dinamik bir ilişki.',
    reversed:
      'Ters Asa Uşağı, uzun vadede bir başlangıç yapma hevesinin kaybolacağını ve ilişkinin bir yere varamayacağını gösterir. Olgunlaşamayan bir bağ.',
    keywords: ['yeni maceralar', 'keşif', 'eğlence', 'dinamik ilişki', 'heves'],
    context: 'Bu ilişkinin geleceği, bitmeyen bir keşif ve macera ruhudur.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_pos4',
    card: 'Knight of Wands',
    position: 4,
    upright:
      'Uzun vadeli sonuç, tutkulu, heyecanlı ama aynı zamanda istikrarsız bir ilişkidir. Bu, bir an gelip bir an giden, bağlanmaktan kaçan bir dinamik olabilir.',
    reversed:
      'Ters Asa Şövalyesi, uzun vadede ani bir tutku patlamasının ardından gelen hızlı bir ayrılığı gösterir. Bağlılık kurulamadan ilişki sona erer.',
    keywords: [
      'tutkulu ama istikrarsız',
      'ani ilişki',
      'bağlanma korkusu',
      'macera',
      'hızlı son',
    ],
    context:
      'Bu ilişkinin kaderi, bir alev gibi parlayıp aniden sönen, tutkulu bir maceradır.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_pos4',
    card: 'Queen of Wands',
    position: 4,
    upright:
      'Uzun vadeli sonuç, kendine güvenen, popüler ve yaratıcı bir çift olmaktır. Birlikte sosyal bir hayatın tadını çıkaracak, ilham veren, sıcak bir birliktelik kuracaksınız.',
    reversed:
      'Ters Asa Kraliçesi, uzun vadede kıskançlık, drama ve güvensizliğin ilişkiyi bitireceğini gösterir. Bir tarafın popülerliği, diğerini ezer.',
    keywords: [
      'başarılı çift',
      'özgüven',
      'sosyal hayat',
      'yaratıcılık',
      'ilham',
    ],
    context:
      'Bu ilişkinin geleceği, birlikte parlayan, etrafına neşe ve enerji saçan bir güç çifti.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_pos4',
    card: 'King of Wands',
    position: 4,
    upright:
      'Uzun vadeli sonuç, ortak bir vizyonla hareket eden, güçlü ve başarılı bir ortaklıktır. Birlikte bir imparatorluk kurabilir, liderlik yapabilir ve büyük hedeflere ulaşabilirsiniz.',
    reversed:
      'Ters Asa Kralı, uzun vadede bir tarafın diğerine karşı baskıcı veya egoist olmasıyla ilişkinin sona ereceğini gösterir. Güç mücadelesi, bağı yok eder.',
    keywords: [
      'güçlü ortaklık',
      'liderlik',
      'başarı',
      'ortak vizyon',
      'imparatorluk',
    ],
    context:
      'Bu ilişkinin kaderi, birlikte dünyayı yönetebilecek, vizyoner bir liderliktir.',
    group: 'Asalar',
  },

  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_pos4',
    card: 'Ace of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, son derece sağlam, güvenilir ve gerçekçi bir birlikteliktir. Bu, evlilik, birlikte bir ev satın alma veya kalıcı bir ortaklık gibi somut bir başlangıçtır.',
    reversed:
      'Ters Tılsım Ası, uzun vadede bir fırsatın kaçırılacağını veya ilişkinin maddi veya pratik nedenlerle sona ereceğini gösterir.',
    keywords: ['somut başlangıç', 'kalıcı ilişki', 'güven', 'refah', 'fırsat'],
    context:
      'Bu ilişkinin geleceği, gerçek dünyada kök salan, sağlam ve verimli bir başlangıçtır.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pos4',
    card: 'Two of Pentacles',
    position: 4,
    upright:
      'Uzun vadede, hayatın iniş ve çıkışlarına rağmen dengeyi bulmayı başaran, esnek bir ilişki sizi bekliyor. Birlikte her duruma uyum sağlayacaksınız.',
    reversed:
      'Ters Tılsım İkilisi, uzun vadede hayatın stresi ve sorumlulukları altında ezilerek ilişkinin dengeyi kaybedeceğini ve sona ereceğini gösterir.',
    keywords: [
      'denge',
      'uyum',
      'esneklik',
      'devamlılık',
      'inişler ve çıkışlar',
    ],
    context:
      'Bu ilişkinin geleceği, hayatın ritmine uyumla dans eden, esnek bir ortaklıktır.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pos4',
    card: 'Three of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, birlikte bir şeyler inşa etmeye dayalı, başarılı bir ortaklıktır. Bu, bir iş kurmak, bir ev inşa etmek veya birlikte bir aile yetiştirmek olabilir. Karşılıklı saygıya dayalıdır.',
    reversed:
      'Ters Tılsım Üçlüsü, uzun vadede bir ekip olarak çalışmayı başaramayarak ilişkinin sona ereceğini gösterir. Uyumsuzluk, projeyi yıkar.',
    keywords: [
      'başarılı ortaklık',
      'birlikte inşa etme',
      'takım çalışması',
      'saygı',
      'kalıcı eser',
    ],
    context:
      'Bu ilişkinin kaderi, her iki tarafın da emeğiyle yükselen, kalıcı bir yapıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pos4',
    card: 'Four of Pentacles',
    position: 4,
    upright:
      'Uzun vadede bu ilişki, son derece istikrarlı ama aynı zamanda değişime kapalı ve durağan bir hale gelecektir. Güvenlik hissi vardır ama heyecan yoktur.',
    reversed:
      'Ters Tılsım Dörtlüsü, uzun vadede kaybetme korkusu veya cimrilik nedeniyle ilişkinin boğucu bir hal alıp sona ereceğini gösterir.',
    keywords: [
      'durağanlık',
      'istikrar',
      'kontrol',
      'değişime kapalılık',
      'güvenlik',
    ],
    context:
      'Bu ilişkinin geleceği, güvenli ama sıkıcı, değişmeyen bir kaledir.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pos4',
    card: 'Five of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, maddi veya manevi zorluklar içinde birlikte mücadele etmektir. Bu, zor bir dönemden geçen ama birbirini terk etmeyen bir çifti veya tam tersi bir ayrılığı gösterebilir.',
    reversed:
      'Ters Tılsım Beşlisi, uzun vadede zor bir dönemin ardından ya birlikte toparlanacağınızı ya da bu krizin sizi tamamen ayıracağını gösterir.',
    keywords: [
      'zor zamanlar',
      'maddi sıkıntı',
      'yalnızlık',
      'kriz',
      'dayanışma veya ayrılık',
    ],
    context:
      'Bu ilişkinin kaderi, soğukta birlikte titremek ya da o soğukta tek başına kalmaktır.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pos4',
    card: 'Six of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, son derece cömert, dengeli ve destekleyici bir ilişkidir. Birbirinize hem maddi hem de manevi olarak destek olacağınız, adil bir ortaklık.',
    reversed:
      'Ters Tılsım Altılısı, uzun vadede bir alma-verme dengesizliği veya bir tarafın diğerine borçlu hissetmesi nedeniyle ilişkinin sona ereceğini gösterir.',
    keywords: [
      'dengeli ortaklık',
      'cömertlik',
      'karşılıklı destek',
      'adalet',
      'refah',
    ],
    context:
      'Bu ilişkinin geleceği, her iki tarafın da hak ettiğini aldığı, cömert ve adil bir paylaşımdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pos4',
    card: 'Seven of Pentacles',
    position: 4,
    upright:
      'Uzun vadede bu ilişki, sabırla ektiğiniz tohumların meyvelerini toplamanızla sonuçlanacaktır. Bu, yavaş ama emin adımlarla büyüyen, kalıcı bir birlikteliktir.',
    reversed:
      'Ters Tılsım Yedilisi, uzun vadede emeklerinizin boşa gideceğini ve ilişkinin bir hayal kırıklığı ile sonuçlanacağını gösterir. Sabırsızlık, her şeyi mahveder.',
    keywords: [
      'emeğin karşılığı',
      'sabır',
      'kalıcı büyüme',
      'yatırım',
      'hasat zamanı',
    ],
    context:
      'Bu ilişkinin geleceği, sabırla ve özenle bakılan bir bahçenin vereceği berekettir.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pos4',
    card: 'Eight of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, ilişki üzerinde sürekli çalışarak ve özen göstererek onu mükemmelleştirmektir. Bu, adanmışlık ve çaba ile ustalaşan, güçlü bir bağdır.',
    reversed:
      'Ters Tılsım Sekizlisi, uzun vadede ilişkiye yeterince çaba gösterilmemesi veya tembellik nedeniyle bağın zayıflayacağını ve sona ereceğini gösterir.',
    keywords: [
      'adanmışlık',
      'sürekli çaba',
      'gelişen ilişki',
      'ustalık',
      'özen',
    ],
    context:
      'Bu ilişkinin kaderi, bir ustanın eseri gibi, sürekli çalışmayla mükemmelleşen bir bağdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pos4',
    card: 'Nine of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, her iki tarafın da bağımsızlığını ve kişisel alanını koruduğu, olgun ve refah içinde bir ilişkidir. Birbirinize ihtiyaç duymadan, birlikte olmanın lüksünü yaşarsınız.',
    reversed:
      'Ters Tılsım Dokuzlusu, uzun vadede bir tarafın diğerine maddi veya manevi olarak bağımlı hale gelmesiyle veya yalnızlık hissiyle sonuçlanabilir.',
    keywords: ['bağımsız ilişki', 'refah', 'olgunluk', 'lüks', 'kendine yetme'],
    context:
      'Bu ilişkinin geleceği, her ikisinin de kendi bahçesine sahip olduğu, zarif bir ortaklıktır.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pos4',
    card: 'Ten of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, son derece istikrarlı, güvenli ve zengin bir aile hayatıdır. Bu, bir miras inşa etmeyi, aile kurmayı ve nesiller boyu sürecek bir mutluluğu temsil eder.',
    reversed:
      'Ters Tılsım Onlusu, uzun vadede maddi sorunlar veya ailevi anlaşmazlıklar nedeniyle ilişkinin sona ereceğini gösterir. Kalıcı bir temel kurulamayabilir.',
    keywords: ['kalıcı aile', 'zenginlik', 'güvenlik', 'miras', 'istikrar'],
    context:
      'Bu ilişkinin kaderi, nesiller boyu sürecek, sağlam ve bereketli bir aile ağacı kurmaktır.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pos4',
    card: 'Page of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, sağlam ve gerçekçi bir temelde büyüyen, umut vadeden bir ilişkidir. Birlikte öğrenmeye ve gelişmeye devam edeceksiniz.',
    reversed:
      'Ters Tılsım Uşağı, uzun vadede bir fırsatın kaçırılacağını veya pratik sorunlar nedeniyle ilişkinin bir yere varamayacağını gösterir.',
    keywords: [
      'umut vadeden gelecek',
      'sağlam temel',
      'büyüme',
      'öğrenme',
      'fırsat',
    ],
    context:
      'Bu ilişkinin geleceği, sağlam bir zeminde büyüyen, umut dolu bir fidan.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pos4',
    card: 'Knight of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, son derece sadık, güvenilir ve istikrarlı bir birlikteliktir. Bu ilişki, yavaş ama emin adımlarla ömür boyu sürecek bir yapıya dönüşür.',
    reversed:
      'Ters Tılsım Şövalyesi, uzun vadede ilişkinin sıkıcı bir rutine dönüşerek veya değişime direnerek sona ereceğini gösterir. İlerleme durur.',
    keywords: [
      'ömür boyu bağlılık',
      'sadakat',
      'güvenilirlik',
      'istikrar',
      'sabır',
    ],
    context:
      'Bu ilişkinin kaderi, yavaş ama sarsılmaz adımlarla ilerleyen, son derece güvenilir bir yol arkadaşlığıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pos4',
    card: 'Queen of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, besleyici, sıcak, güvenli ve rahat bir yuva kurmaktır. Birbirinize hem maddi hem de manevi olarak bakacağınız, son derece cömert bir birliktelik.',
    reversed:
      'Ters Tılsım Kraliçesi, uzun vadede pratik kaygıların veya bir tarafın diğerine aşırı bağımlı olmasının ilişkiyi boğacağını gösterir.',
    keywords: [
      'güvenli yuva',
      'besleyici ortaklık',
      'konfor',
      'cömertlik',
      'istikrar',
    ],
    context:
      'Bu ilişkinin geleceği, hem bedeni hem de ruhu besleyen, sıcak ve bereketli bir yuvadır.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pos4',
    card: 'King of Pentacles',
    position: 4,
    upright:
      'Uzun vadeli sonuç, son derece başarılı, zengin ve istikrarlı bir imparatorluk kurmaktır. Bu, hem maddi hem de manevi olarak refah içinde, güçlü ve kalıcı bir birlikteliktir.',
    reversed:
      'Ters Tılsım Kralı, uzun vadede materyalizmin veya kontrol arzusunun sevgiyi gölgede bırakarak ilişkiyi bitireceğini gösterir.',
    keywords: [
      'başarılı imparatorluk',
      'zenginlik',
      'istikrar',
      'güvenlik',
      'kalıcı başarı',
    ],
    context:
      'Bu ilişkinin kaderi, birlikte inşa edilmiş, zengin ve cömert bir krallıktır.',
    group: 'Tılsımlar',
  },
];

// i18n destekli fonksiyonlar
export const useI18nPosition4Meanings = (): I18nLovePositionMeaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position4Meanings.map(meaning => {
    // i18n'den çevirileri al
    const i18nUpright = getCardMeaning(meaning.card, 4, 'upright');
    const i18nReversed = getCardMeaning(meaning.card, 4, 'reversed');
    const i18nKeywords = getCardKeywords(meaning.card, 4);
    const i18nContext = getCardContext(meaning.card, 4);
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
export const getI18nPosition4Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nLovePositionMeaning | null => {
  const originalMeaning = position4Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`love.meanings.${cardKey}.position4.upright`);
  const i18nReversed = t(`love.meanings.${cardKey}.position4.reversed`);
  const i18nKeywords = t(`love.meanings.${cardKey}.position4.keywords`);
  const i18nContext = t(`love.meanings.${cardKey}.position4.context`);
  const i18nGroup = t(
    `love.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
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
