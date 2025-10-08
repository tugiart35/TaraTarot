// Bu dosya, Aşk açılımında Pozisyon 2 (Fiziksel/Cinsel Bağlantı) için özel kart anlamlarını içerir.
// Her kartın bu pozisyonda ne anlama geldiği tanımlanmıştır.
// i18n desteği için güncellenmiştir.
'use client';

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

export const position2Meanings: LovePositionMeaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_pos2',
    card: 'The Fool',
    position: 2,
    upright:
      'Fiziksel bağlantınızda çocuksu bir merak ve deneme arzusu var. Spontan, eğlenceli ve plansız bir cinsel keşif potansiyeli taşıyor. Kurallardan ve beklentilerden uzak, özgür bir macera.',
    reversed:
      'Ters Fool, cinsel konularda pervasızlık, düşüncesizlik veya riskli davranışlar olabileceğini gösterir. Taraflardan biri deneyimsizlikten veya bağlanma korkusundan dolayı geri duruyor olabilir.',
    keywords: ['keşif', 'spontanlık', 'deneyimsizlik', 'eğlence', 'özgürlük'],
    context:
      'Aranızdaki tensel çekim, yeni ve heyecan verici bir cinsel maceranın başlangıcını işaret ediyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_pos2',
    card: 'The Magician',
    position: 2,
    upright:
      'Aranızda güçlü ve bilinçli bir cinsel çekim var. Taraflardan biri veya her ikisi de ne istediğini biliyor ve yatakta oldukça becerikli. Yaratıcı ve tatmin edici bir cinsel hayat potansiyeli yüksek.',
    reversed:
      'Ters Magician, cinsel enerjinin manipülasyon veya aldatma için kullanılabileceğini gösterir. Performans anksiyetesi veya cinsel potansiyeli kullanamama durumu olabilir.',
    keywords: [
      'cinsel beceri',
      'çekicilik',
      'yaratıcılık',
      'manifesto',
      'güçlü arzu',
    ],
    context:
      'Cinsel bağlantınız, arzu ve becerinin birleştiği, yaratıcı bir oyun alanı gibi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_pos2',
    card: 'The High Priestess',
    position: 2,
    upright:
      'Fiziksel bağlantınız gizemli, sezgisel ve henüz tam olarak açığa çıkmamış bir potansiyel taşıyor. Tensel birleşmeden çok, ruhsal bir çekim ve söylenmemiş arzular ön planda. Cinsellik yavaş ve derinlemesine keşfedilmeyi bekliyor.',
    reversed:
      'Ters High Priestess, cinsel konularda bastırılmış duyguları, sırları veya bir soğukluğu işaret eder. Taraflar birbirine karşı cinsel olarak açık değil ve sezgisel bağ kurulamıyor.',
    keywords: [
      'sezgisel çekim',
      'gizem',
      'söylenmemiş arzular',
      'bastırılmış cinsellik',
      'ruhsal bağ',
    ],
    context:
      'Aranızdaki cinsel çekim, su yüzeyinin altındaki görünmez akıntılar gibi derin ve gizemli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_pos2',
    card: 'The Empress',
    position: 2,
    upright:
      'Fiziksel bağlantınız son derece şehvetli, besleyici, verimli ve duyulara hitap ediyor. Cinsellik, bir zevk ve bereket kutlaması gibi yaşanır. Doğurganlık ve rahat, doğal bir tensel uyum söz konusu.',
    reversed:
      'Ters Empress, cinsel enerjide bir tembellik, kendine bakmama veya zevk alamama durumu olabileceğini gösterir. Tensel bağda bir yaratıcılık eksikliği veya sahiplenici bir tavır olabilir.',
    keywords: ['şehvet', 'bereket', 'duyusallık', 'doğurganlık', 'zevk'],
    context:
      'Cinsel yaşamınız, tüm duyuların harekete geçtiği, bereketli ve zevk dolu bir bahçe gibi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_pos2',
    card: 'The Emperor',
    position: 2,
    upright:
      'Fiziksel bağlantınızda yapı, kontrol ve tutku var. Cinsellikte liderliği ve kontrolü elinde tutan, deneyimli bir enerji hakim. Güçlü ve koruyucu bir cinsel dinamik olabilir.',
    reversed:
      'Ters Emperor, cinsel hayatta aşırı kontrolcü, dominant veya katı bir tutumu gösterir. Duygusal ifade eksikliği veya cinsel isteksizlik olabilir. Bir güç mücadelesi yaşanabilir.',
    keywords: ['tutku', 'kontrol', 'güç', 'istikrar', 'liderlik'],
    context:
      'Cinsel bağlantınız, tutkunun ve kontrolün birleştiği, sağlam temelli bir yapı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_pos2',
    card: 'The Hierophant',
    position: 2,
    upright:
      'Fiziksel bağlantınız geleneksel ve belirli beklentiler çerçevesinde yaşanabilir. Cinsellik, kutsal bir bağın veya evliliğin bir parçası olarak görülüyor olabilir. Tutkudan çok, bir ritüel ve bağlılık anlamı taşır.',
    reversed:
      'Ters Hierophant, cinsel tabulara veya geleneksel ahlak anlayışına bir başkaldırıyı gösterir. Cinsel özgürlük arayışı veya geleneksel olmayan cinsel deneyimler söz konusu olabilir.',
    keywords: [
      'geleneksel cinsellik',
      'bağlılık',
      'ritüel',
      'tabular',
      'kutsal bağ',
    ],
    context:
      'Cinsel yaşamınız, toplumsal veya kişisel inançların şekillendirdiği bir çerçeve içinde yaşanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_pos2',
    card: 'The Lovers',
    position: 2,
    upright:
      'Aranızda ruhsal ve fiziksel olarak derin bir uyum ve mükemmel bir kimya var. Cinsellik, sadece fiziksel bir eylem değil, iki ruhun birleşmesidir. Yoğun bir aşk ve tutku dolu bir cinsel bağlantı.',
    reversed:
      'Ters Lovers, fiziksel ve duygusal uyumsuzluğu, cinsel konularda yanlış kararları veya bir kopukluğu gösterir. Tenler uyuşsa bile kalplerin aynı frekansta olmadığını işaret edebilir.',
    keywords: ['cinsel uyum', 'ruh eşi', 'tutku', 'kimya', 'derin bağ'],
    context:
      'Fiziksel bağlantınız, iki ruhun bir bütün olduğu, kutsal bir birleşmeyi temsil ediyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_pos2',
    card: 'The Chariot',
    position: 2,
    upright:
      'Cinsel yaşamınızda güçlü bir irade, hedef odaklılık ve yüksek bir libido var. Tutkulu ve enerjik bir cinsel birleşme. Taraflardan biri cinsel olarak ne istediğini biliyor ve bunu elde etmek için harekete geçiyor.',
    reversed:
      'Ters Chariot, cinsel enerjinin kontrolsüz veya agresif bir şekilde kullanıldığını gösterir. Cinsel uyumsuzluk, sabırsızlık veya libido dengesizliği olabilir.',
    keywords: ['yüksek libido', 'irade', 'tutku', 'kontrol', 'enerji'],
    context:
      'Cinsel enerjiniz, hedefine kararlılıkla ilerleyen, güçlü ve tutkulu bir güç.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_pos2',
    card: 'Strength',
    position: 2,
    upright:
      'Fiziksel bağlantınızda tutku ve şefkat mükemmel bir denge içindedir. Vahşi arzular, nazik bir dokunuşla ve sabırla yönetilir. Güçlü ama aynı zamanda yumuşak ve sevgi dolu bir cinsellik.',
    reversed:
      'Ters Strength, cinsel güvensizlik veya ham arzuların kontrolsüz bir şekilde dışa vurumunu gösterir. Tutku ve şefkat arasında bir denge kurulamıyor.',
    keywords: ['dengeli tutku', 'şefkat', 'içsel güç', 'sabır', 'cinsel güven'],
    context:
      'Cinselliğiniz, vahşi bir aslanı şefkatle evcilleştiren içsel bir gücün ifadesi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_pos2',
    card: 'The Hermit',
    position: 2,
    upright:
      'Şu anda fiziksel bağlantı ve cinsellik öncelik değil. Taraflardan biri veya her ikisi de cinsel bir geri çekilme, yalnızlık veya içe dönme döneminde. Tensel bir bağ kurmak için zaman ve sabır gerekiyor.',
    reversed:
      'Ters Hermit, bir cinsel izolasyon döneminin sona erdiğini veya yalnızlık korkusuyla cinsel ilişkiye girildiğini gösterebilir. Bağlantı kurma çabası var ama bu zorlayıcı olabilir.',
    keywords: [
      'cinsel geri çekilme',
      'libido düşüklüğü',
      'yalnızlık',
      'içe dönüklük',
      'mesafe',
    ],
    context:
      'Fiziksel bağlantı, şu anda bir arayış içinde olan ve kendi içine dönmüş bir ruh için ikinci planda.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_pos2',
    card: 'The Wheel of Fortune',
    position: 2,
    upright:
      'Cinsel yaşamınızda beklenmedik gelişmeler ve döngüsel değişimler var. Bazen çok tutkulu, bazen daha mesafeli olabilirsiniz. Kaderin sizi fiziksel olarak bir araya getirdiği veya ayırdığı bir dönem.',
    reversed:
      'Ters The Wheel of Fortune, cinsel hayatta bir durgunluk, şanssızlık veya tekrarlayan olumsuz döngüleri gösterir. Cinsel rutin sıkıcı hale gelmiş olabilir.',
    keywords: [
      'kader',
      'döngüler',
      'beklenmedik gelişme',
      'cinsel kimya',
      'değişim',
    ],
    context:
      'Cinsel yaşamınız, kader çarkının dönüşü gibi, inişli çıkışlı ve sürprizlerle dolu.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_pos2',
    card: 'Justice',
    position: 2,
    upright:
      'Fiziksel bağlantınızda denge, adalet ve dürüstlük önemli. Her iki tarafın da ihtiyaçlarının ve arzularının karşılandığı, adil bir cinsel ilişki. Cinsellik, karşılıklı saygıya dayanır.',
    reversed:
      'Ters Justice, cinsel hayatta bir dengesizlik veya adaletsizlik olduğunu gösterir. Bir tarafın istekleri diğerine baskın çıkıyor veya cinsel konularda dürüstlük eksikliği var.',
    keywords: ['denge', 'adalet', 'dürüstlük', 'karşılıklılık', 'saygı'],
    context:
      'Cinselliğiniz, her iki tarafın da tatmin olduğu adil bir alışverişe dayanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_pos2',
    card: 'The Hanged Man',
    position: 2,
    upright:
      'Cinsel hayatta bir duraklama, fedakarlık veya askıya alma dönemi. Fiziksel birleşme yerine, ruhsal veya platonik bir bağ ön planda olabilir. Cinselliğe farklı bir açıdan bakma zamanı.',
    reversed:
      'Ters Hanged Man, cinsel hayattaki bir tıkanıklığı veya anlamsız bir fedakarlığı gösterir. Taraflardan biri cinsel olarak tatmin olmuyor ama bu durumu değiştirmek için bir şey yapmıyor.',
    keywords: [
      'duraklama',
      'fedakarlık',
      'askıya alma',
      'platonik bağ',
      'bakış açısı',
    ],
    context:
      'Fiziksel bağlantınız, şu an için durmuş, olaylara farklı bir perspektiften bakmayı bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_pos2',
    card: 'Death',
    position: 2,
    upright:
      'Cinsel yaşamınızda büyük bir dönüşüm yaşanıyor. Eski cinsel kimliğiniz veya dinamikleriniz sona eriyor ve tamamen yeni bir cinsel anlayış doğuyor. Bu, cinsel bir uyanış veya bir dönemin sonu olabilir.',
    reversed:
      'Ters Death, cinsel bir değişime veya sonlanmaya direndiğinizi gösterir. Sağlıksız bir cinsel dinamiğe veya alışkanlığa tutunmak, ilerlemeyi engelliyor.',
    keywords: [
      'cinsel dönüşüm',
      'bitiş',
      'yeniden doğuş',
      'uyanış',
      'sonlanma',
    ],
    context:
      'Cinselliğiniz, eski bir deriyi atıp yeniden doğan bir yılan gibi köklü bir dönüşüm içinde.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_pos2',
    card: 'Temperance',
    position: 2,
    upright:
      'Fiziksel ve duygusal enerjiler arasında mükemmel bir denge ve uyum var. Cinsellik, sakin, şefkatli ve iki ruhu birleştiren bir simya gibidir. Tutku ve sevgi harmanlanmıştır.',
    reversed:
      'Ters Temperance, cinsel enerjide bir dengesizlik, aşırılık veya uyumsuzluk olduğunu gösterir. Tutku ile sevgi bir araya gelemiyor, bu da tatminsizliğe yol açıyor.',
    keywords: ['denge', 'uyum', 'simya', 'ölçülülük', 'şefkatli tutku'],
    context:
      'Cinselliğiniz, iki farklı enerjinin mükemmel bir uyumla birleştiği şifalı bir iksir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_pos2',
    card: 'The Devil',
    position: 2,
    upright:
      'Aranızda karşı konulmaz, ham ve yoğun bir cinsel çekim var. Bu kart, tabuları, cinsel fantezileri ve bağımlılık yaratan bir tutkuyu temsil eder. Fiziksel bağlantınız son derece güçlü ve ilkel.',
    reversed:
      'Ters Devil, cinsel bir bağımlılıktan veya sağlıksız bir dinamikten kurtulma arzusunu gösterir. Aranızdaki yoğun ama toksik çekimin zincirleri kırılıyor. Cinsel özgürleşme.',
    keywords: [
      'yoğun tutku',
      'cinsel çekim',
      'tabular',
      'bağımlılık',
      'fantezi',
    ],
    context:
      'Aranızdaki cinsel enerji, sizi birbirinize bağlayan ilkel ve güçlü bir çekim kuvveti.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_pos2',
    card: 'The Tower',
    position: 2,
    upright:
      'Cinsel yaşamınızda ani ve sarsıcı bir aydınlanma veya şok edici bir olay yaşanabilir. Bu, gizli bir arzunun açığa çıkması veya cinsel dinamikleri temelden sarsan bir gerçek olabilir. Beklenmedik bir orgazmik enerji.',
    reversed:
      'Ters Tower, cinsel bir krizin veya yüzleşmenin ertelendiğini gösterir. Bastırılmış cinsel enerji, bir patlamaya yol açma tehlikesi taşıyor. Yıkım korkusuyla yaşanan bir gerilim.',
    keywords: [
      'ani aydınlanma',
      'cinsel şok',
      'tabuların yıkılışı',
      'sarsıcı gerçek',
      'patlama',
    ],
    context:
      'Cinsel enerjiniz, bir şimşek gibi çakıp mevcut yapıları yıkan, sarsıcı bir potansiyele sahip.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_pos2',
    card: 'The Star',
    position: 2,
    upright:
      'Fiziksel bağlantınız umut dolu, şifalı ve ruhsal bir nitelik taşıyor. Cinsellik, sevgi ve açıklıkla yaşanır. Geçmiş cinsel travmalardan sonra gelen bir yenilenme ve masumiyet hissi vardır.',
    reversed:
      'Ters Star, cinsel hayatta bir umutsuzluk, isteksizlik veya ilham eksikliği olduğunu gösterir. Fiziksel bağda bir soğukluk veya hayal kırıklığı yaşanıyor olabilir.',
    keywords: [
      'şifa',
      'umut',
      'cinsel yenilenme',
      'masumiyet',
      'ruhsal cinsellik',
    ],
    context:
      'Fiziksel bağlantınız, karanlık bir gecenin ardından parlayan, şifa ve umut veren bir yıldız gibi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_pos2',
    card: 'The Moon',
    position: 2,
    upright:
      'Fiziksel bağlantınız belirsizlikler, fanteziler ve gizli arzularla dolu. Cinsellik, rüya gibi ve gizemli bir alanda yaşanır. Neyin gerçek neyin hayal olduğu belirsiz olabilir. Yoğun ama kafa karıştırıcı bir çekim.',
    reversed:
      'Ters Moon, gizli cinsel arzuların veya aldatmacaların açığa çıktığını gösterir. Cinsel konulardaki kafa karışıklığı sona eriyor ve daha fazla netlik kazanılıyor.',
    keywords: [
      'fantezi',
      'gizli arzular',
      'belirsizlik',
      'kafa karışıklığı',
      'rüya gibi cinsellik',
    ],
    context:
      'Cinselliğiniz, ay ışığının aydınlattığı, gölgeler ve fantezilerle dolu gizemli bir orman.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_pos2',
    card: 'The Sun',
    position: 2,
    upright:
      'Fiziksel bağlantınız neşe, canlılık ve açıklıkla dolu. Cinsellik, utançtan uzak, özgürce ve keyifle yaşanır. Yüksek bir cinsel enerji ve tatmin söz konusudur.',
    reversed:
      'Ters Sun, cinsel enerjide geçici bir düşüşü veya cinsel yaşamdan keyif alamamayı gösterir. Potansiyel var ama bir bulut tarafından gölgelenmiş gibi.',
    keywords: [
      'neşe',
      'canlılık',
      'cinsel özgürlük',
      'tatmin',
      'yüksek enerji',
    ],
    context:
      'Cinsel yaşamınız, her şeyi aydınlatan ve ısıtan, neşe ve canlılık dolu bir güneş.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_pos2',
    card: 'Judgement',
    position: 2,
    upright:
      "Cinsel bir uyanış veya yeniden doğuş yaşanıyor. Geçmiş cinsel deneyimler ve yargılar geride bırakılarak daha yüksek bir cinsel farkındalığa ulaşılıyor. Bu, bir 'ikinci şans' veya cinsel bir çağrıdır.",
    reversed:
      'Ters Judgement, cinsel konularda kendini veya partnerini yargılamayı, geçmiş hatalara takılıp kalmayı gösterir. Cinsel suçluluk veya utanç duyguları olabilir.',
    keywords: [
      'cinsel uyanış',
      'yeniden doğuş',
      'çağrı',
      'hesaplaşma',
      'affetme',
    ],
    context:
      'Cinselliğiniz, sizi daha derin bir anlayışa ve kabule çağıran bir uyanış borusu gibi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_pos2',
    card: 'The World',
    position: 2,
    upright:
      'Fiziksel bağlantınızda bir bütünlük, tamamlanma ve derin bir tatmin hissi var. Cinsel yaşamınız tatmin edici ve döngüsünü başarıyla tamamlamış. Mükemmel bir cinsel uyum.',
    reversed:
      'Ters World, cinsel hayatta bir şeylerin eksik kaldığı hissini, bir tamamlanamamayı veya rutine saplanıp kalmayı gösterir. Bir kapanış yapamama veya cinsel doyumsuzluk.',
    keywords: ['tamamlanma', 'cinsel doyum', 'bütünlük', 'başarı', 'uyum'],
    context:
      'Fiziksel bağlantınız, yolculuğun sonunda ulaşılan, tatmin ve bütünlük dolu bir dans.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_pos2',
    card: 'Ace of Cups',
    position: 2,
    upright:
      'Fiziksel bağlantınız sevgi, şefkat ve derin bir duygusal bağ ile başlıyor. Cinsellik, duyguların bir ifadesidir. Yeni bir romantik ve tensel başlangıç. Doğurganlık potansiyeli.',
    reversed:
      'Ters Kupa Ası, cinsel yakınlıktan kaçınma, duygusal kapalılık veya cinsel isteksizlik gösterir. Duygusal bağ olmadan fiziksel yakınlık kurulamıyor.',
    keywords: [
      'duygusal cinsellik',
      'sevgi',
      'şefkat',
      'yeni başlangıç',
      'doğurganlık',
    ],
    context: 'Cinselliğiniz, taşan bir sevgi ve şefkat pınarından besleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_pos2',
    card: 'Two of Cups',
    position: 2,
    upright:
      'Aranızda inanılmaz bir kimya ve karşılıklı çekim var. Fiziksel ve duygusal olarak mükemmel bir uyum içindesiniz. Cinsellik, iki ruhun ve bedenin aşkla birleşmesidir.',
    reversed:
      'Ters Kupa İkilisi, fiziksel çekimin olmasına rağmen duygusal bir kopukluk yaşandığını veya cinsel uyumsuzluk olduğunu gösterir. Birbirini yanlış anlama veya soğukluk.',
    keywords: [
      'mükemmel kimya',
      'karşılıklı çekim',
      'tensel uyum',
      'romantik cinsellik',
      'ruh eşi',
    ],
    context:
      'Fiziksel yakınlığınız, iki insanın tek bir bütün haline geldiği büyülü bir an.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_pos2',
    card: 'Three of Cups',
    position: 2,
    upright:
      "Fiziksel bağlantınız eğlenceli, sosyal ve kaygısız. Bu, bir 'friends with benefits' (arkadaşça ilişki) durumunu veya grup fantezilerini işaret edebilir. Cinsellik, bir kutlama ve neşe kaynağıdır.",
    reversed:
      'Ters Kupa Üçlüsü, cinsel bir kaçamağı, bir aldatmayı veya ilişkinize müdahale eden üçüncü bir kişiyi işaret edebilir. Eğlence bitmiş, yerine dedikodu ve karmaşa gelmiştir.',
    keywords: [
      'eğlenceli cinsellik',
      'kaygısızlık',
      'kutlama',
      'flört',
      'üçüncü kişi',
    ],
    context:
      'Cinsel yaşamınız, arkadaşlık ve neşenin ön planda olduğu, sosyal ve hafif bir enerji taşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_pos2',
    card: 'Four of Cups',
    position: 2,
    upright:
      'Cinsel hayatta bir can sıkıntısı, ilgisizlik veya tatminsizlik var. Partnerin cinsel yaklaşımları geri çevriliyor olabilir. Libido düşüklüğü ve cinsel isteksizlik söz konusu.',
    reversed:
      'Ters Kupa Dörtlüsü, cinsel bir durgunluk döneminden çıkıldığını ve yeni deneyimlere açık olunduğunu gösterir. Cinsel ilgi yeniden canlanıyor.',
    keywords: [
      'cinsel ilgisizlik',
      'tatminsizlik',
      'libido düşüklüğü',
      'can sıkıntısı',
      'geri çevirme',
    ],
    context:
      'Fiziksel bağlantınız, sunulan cinsel fırsatlara karşı bir ilgisizlik ve geri çekilme halinde.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_pos2',
    card: 'Five of Cups',
    position: 2,
    upright:
      'Geçmişteki kötü bir cinsel deneyim veya kalp kırıklığı, şimdiki cinsel yaşamı olumsuz etkiliyor. Cinsel yakınlık sırasında keder veya pişmanlık hissedilebilir. Zevke odaklanmakta zorluk.',
    reversed:
      'Ters Kupa Beşlisi, geçmiş cinsel travmaların üstesinden gelindiğini ve iyileşme sürecinin başladığını gösterir. Cinselliğe yeniden umutla ve açıklıkla yaklaşma.',
    keywords: [
      'cinsel yas',
      'pişmanlık',
      'geçmiş travma',
      'hayal kırıklığı',
      'keder',
    ],
    context:
      'Cinsel yaşamınız, geçmişin hayaletlerinin gölgesinde kalmış, tatminden çok kedere odaklı.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_pos2',
    card: 'Six of Cups',
    position: 2,
    upright:
      'Fiziksel bağlantınız masum, tatlı ve nostaljik bir his taşıyor. Cinsellik, şefkatli ve neredeyse çocuksu bir saflıkla yaşanır. Eski bir sevgiliyle yeniden alevlenen bir tutkuyu da gösterebilir.',
    reversed:
      'Ters Kupa Altılısı, geçmiş cinsel deneyimlere takılıp kalmayı veya cinsel olgunluk eksikliğini gösterir. Cinsellik, gerçekçi olmayan, geçmişe dönük beklentilerle yaşanıyor.',
    keywords: ['masumiyet', 'şefkat', 'nostalji', 'tatlılık', 'eski sevgili'],
    context:
      'Tensel yakınlığınız, geçmişin tatlı anılarını anımsatan, güvenli ve şefkatli bir liman.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_pos2',
    card: 'Seven of Cups',
    position: 2,
    upright:
      'Cinsel yaşamınızda çok fazla fantezi, hayal ve seçenek var. Ancak bu, gerçek bir fiziksel bağlantı yerine hayal dünyasında yaşamaya neden olabilir. Cinsel kafa karışıklığı veya aldatıcı durumlar.',
    reversed:
      'Ters Kupa Yedilisi, cinsel fantezilerle gerçekler arasındaki ayrımın yapıldığını gösterir. Kafa karışıklığı bitiyor ve net bir cinsel arzu veya karar ortaya çıkıyor.',
    keywords: [
      'cinsel fantezi',
      'kafa karışıklığı',
      'seçenekler',
      'yanılsama',
      'hayalperestlik',
    ],
    context:
      'Cinselliğiniz, gerçeklikten çok, sayısız seçeneğin olduğu bir hayal bulutunun içinde yaşanıyor.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_pos2',
    card: 'Eight of Cups',
    position: 2,
    upright:
      'Cinsel olarak tatmin etmeyen bir ilişkiden veya durumdan uzaklaşma. Fiziksel zevkten daha derin bir anlam veya ruhsal bir bağ arayışı. Cinsel bir yolculuğa çıkma.',
    reversed:
      'Ters Kupa Sekizlisi, cinsel tatminsizliğe rağmen bir ilişkide kalma korkusunu veya nereye gideceğini bilememeyi gösterir. Cinsel bir arayış var ama eyleme geçilemiyor.',
    keywords: [
      'cinsel tatminsizlik',
      'arayış',
      'uzaklaşma',
      'derin anlam',
      'yolculuk',
    ],
    context:
      'Fiziksel bağlantı, artık ruhu beslemediği için geride bırakılan bir arayışın başlangıcı.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_pos2',
    card: 'Nine of Cups',
    position: 2,
    upright:
      "Son derece tatmin edici, zevk dolu ve duyusal bir cinsel yaşam. 'Cinsel dileklerin gerçekleşmesi' olarak yorumlanabilir. Her iki tarafın da zevk aldığı, cömert bir cinsellik.",
    reversed:
      'Ters Kupa Dokuzlusu, cinsel doyumsuzluğu, bencilliği veya beklentilerin karşılanmamasını gösterir. Zevk var ama bir şeyler eksik veya yüzeysel.',
    keywords: ['cinsel tatmin', 'zevk', 'şehvet', 'doyum', 'cömertlik'],
    context:
      'Cinsel yaşamınız, tüm arzularınızın gerçekleştiği, zevk ve tatmin dolu bir şölen.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_pos2',
    card: 'Ten of Cups',
    position: 2,
    upright:
      'Fiziksel bağlantınız, derin bir sevgi, bağlılık ve duygusal güven üzerine kurulu. Cinsellik, mutlu ve uyumlu bir ilişkinin doğal bir parçasıdır. Aile kurma arzusunu yansıtan bir tensel uyum.',
    reversed:
      'Ters Kupa Onlusu, cinsel hayattaki uyumsuzluğun aile hayatına yansıdığını veya tam tersini gösterir. Mutlu bir tablo var ama cinsel tatmin eksik.',
    keywords: [
      'duygusal güvenlik',
      'sevgi dolu cinsellik',
      'uyum',
      'kalıcı bağ',
      'aile',
    ],
    context:
      'Cinsel bağlantınız, mutlu bir yuvanın sıcaklığı ve güveniyle sarmalanmış.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_pos2',
    card: 'Page of Cups',
    position: 2,
    upright:
      'Fiziksel bağlantıda flörtöz, hassas ve romantik bir başlangıç. Cinsel bir teklif veya duyguların tensel bir dille ifadesi. Keşfe açık, masum bir cinsel merak.',
    reversed:
      'Ters Kupa Uşağı, cinsel olgunlaşmamışlığı, alınganlığı veya reddedilme korkusunu gösterir. Flörtöz yaklaşımlar samimiyetsiz veya çocukça olabilir.',
    keywords: [
      'flört',
      'romantik başlangıç',
      'hassasiyet',
      'cinsel merak',
      'teklif',
    ],
    context:
      'Tensel enerjiniz, size kalbini ve bedenini sunan utangaç ama istekli bir aşık gibi.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_pos2',
    card: 'Knight of Cups',
    position: 2,
    upright:
      'Son derece romantik, baştan çıkarıcı ve idealist bir cinsel yaklaşım. Cinsellik, bir sanat gibi incelikle ve duyarlılıkla yaşanır. Size romantik ve tutkulu bir deneyim sunuluyor.',
    reversed:
      'Ters Kupa Şövalyesi, aldatıcı bir romantizmi, samimiyetsiz cinsel vaatleri veya duygusal manipülasyonu gösterir. Görünenin altındaki niyetler farklı olabilir.',
    keywords: [
      'romantizm',
      'baştan çıkarma',
      'idealist aşk',
      'duyarlılık',
      'tutkulu teklif',
    ],
    context:
      'Fiziksel bağlantınız, bir şairin dizeleri gibi romantik ve baştan çıkarıcı.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_pos2',
    card: 'Queen of Cups',
    position: 2,
    upright:
      'Fiziksel bağlantı, derin bir duygusal ve sezgisel anlayışa dayanır. Cinsellik şefkatli, besleyici ve son derece empatiktir. Partnerinin ihtiyaçlarını hisseden, sevgi dolu bir tensel birleşme.',
    reversed:
      'Ters Kupa Kraliçesi, cinsel hayatta aşırı duygusallık, duygusal manipülasyon veya boğucu bir yakınlık olabileceğini gösterir. Cinsel sınırlar belirsizleşebilir.',
    keywords: [
      'empatik cinsellik',
      'şefkat',
      'sezgisel bağ',
      'duygusal derinlik',
      'besleyicilik',
    ],
    context:
      'Cinselliğiniz, partnerinizin ruhuna dokunan, şefkatli ve sezgisel bir dans.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_pos2',
    card: 'King of Cups',
    position: 2,
    upright:
      'Cinsellikte duygusal olgunluk ve kontrol hakimdir. Tutku, sevgi ve bilgelikle yönetilir. Partnerine karşı şefkatli, anlayışlı ve tatmin edici bir cinsel deneyim sunar. Duygusal ve fiziksel olarak dengeli.',
    reversed:
      'Ters Kupa Kralı, cinsel olarak mesafeli, duygusal olarak ulaşılamaz veya manipülatif bir partneri gösterir. Duygularını cinsel bir silah olarak kullanabilir.',
    keywords: [
      'duygusal olgunluk',
      'dengeli tutku',
      'şefkat',
      'kontrol',
      'bilgelik',
    ],
    context:
      'Cinsel bağlantınız, duygular okyanusunu bilgece yöneten, olgun ve şefkatli bir kral gibi.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_pos2',
    card: 'Ace of Swords',
    position: 2,
    upright:
      "Fiziksel bağlantı, zihinsel bir uyarılma ve net bir arzu ile başlıyor. Cinsel konularda açık ve dürüst bir iletişim var. Tutkudan çok, zihinsel bir 'evet' anı veya keskin bir arzu.",
    reversed:
      'Ters Kılıç Ası, cinsel konularda iletişim eksikliği, yanlış anlaşılmalar veya cinsel isteksizliği gösterir. Zihinsel bir engel, fiziksel birleşmeyi önlüyor.',
    keywords: [
      'zihinsel uyarılma',
      'net arzu',
      'dürüst iletişim',
      'keskin çekim',
      'karar',
    ],
    context:
      'Tensel çekiminiz, bir fikrin parlaması gibi, ani ve keskin bir netlikle başlıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_pos2',
    card: 'Two of Swords',
    position: 2,
    upright:
      'Cinsel yakınlığa karşı bir savunma veya kararsızlık durumu. Taraflar, cinsel bir adım atmaktan kaçınıyor ve duygusal bir duvar örüyor. Cinsel gerilim var ama eylem yok.',
    reversed:
      'Ters Kılıç İkilisi, cinsel bir çıkmazı veya bastırılmış duyguların yarattığı bir gerilimi gösterir. Kararsızlık, fiziksel yakınlığı imkansız kılıyor.',
    keywords: [
      'cinsel kararsızlık',
      'savunma',
      'duvar örme',
      'gerilim',
      'kaçınma',
    ],
    context:
      'Fiziksel bağlantınız, birbirine kapalı iki zihin arasındaki soğuk bir barış gibi.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_pos2',
    card: 'Three of Swords',
    position: 2,
    upright:
      'Fiziksel bağlantı, bir aldatma, cinsel bir hayal kırıklığı veya acı verici bir gerçekle gölgelenmiş. Cinsel birleşme, keder veya acı hissi taşıyabilir. Kalp kırıklığı tensel bağı etkiliyor.',
    reversed:
      'Ters Kılıç Üçlüsü, cinsel bir acının veya ihanetin üstesinden gelme çabasını gösterir. İyileşme süreci yavaş ve acı verici olabilir. Affetmekte zorlanma.',
    keywords: [
      'cinsel hayal kırıklığı',
      'aldatma',
      'acı',
      'kalp kırıklığı',
      'keder',
    ],
    context:
      'Fiziksel bağlantınız, acı bir gerçeğin kalbe sapladığı kılıçlar yüzünden yaralı.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_pos2',
    card: 'Four of Swords',
    position: 2,
    upright:
      'Cinsel bir mola veya dinlenme dönemi. Taraflar, cinsel aktiviteden uzaklaşarak enerji topluyor. Libido düşüklüğü veya cinsel perhiz anlamına gelebilir. İyileşme için gerekli bir süreç.',
    reversed:
      'Ters Kılıç Dörtlüsü, cinsel bir durgunluğun zorla yaşandığını veya bir tükenmişlik durumunu gösterir. Cinsel aktiviteye dönme zamanı gelmiş olabilir ama bir isteksizlik var.',
    keywords: [
      'cinsel mola',
      'perhiz',
      'dinlenme',
      'iyileşme',
      'libido düşüklüğü',
    ],
    context:
      'Cinsel enerjiniz, bir sonraki savaşa hazırlanmak için dinlenen bir şövalye gibi sakin.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_pos2',
    card: 'Five of Swords',
    position: 2,
    upright:
      'Cinsellikte bir güç mücadelesi, bencillik veya çatışma var. Bir tarafın zevki, diğerinin pahasına olabilir. Cinsel birleşme, bir zafer veya yenilgi gibi hissedilebilir. Agresif veya aşağılayıcı olabilir.',
    reversed:
      'Ters Kılıç Beşlisi, cinsel bir çatışmanın ardından gelen pişmanlığı veya bir aldatmacanın ortaya çıkmasını gösterebilir. Cinsel zorbalık veya taciz potansiyeli.',
    keywords: [
      'cinsel çatışma',
      'bencillik',
      'güç mücadelesi',
      'agresyon',
      'yenilgi',
    ],
    context:
      'Cinsel alanınız, sevgi dolu bir birleşme yerine bir savaş alanı gibi.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_pos2',
    card: 'Six of Swords',
    position: 2,
    upright:
      'Zorlu veya acı verici bir cinsel geçmişi geride bırakıp daha huzurlu bir döneme geçiş. Cinsel travmalardan iyileşme ve daha sakin bir cinsel yaşama doğru yol alma.',
    reversed:
      'Ters Kılıç Altılısı, cinsel sorunlardan kaçmaya çalışsanız da geçmişin yükünün hala sizinle geldiğini gösterir. Tam bir iyileşme sağlanamamış.',
    keywords: [
      'cinsel iyileşme',
      'geçiş',
      'huzur',
      'geçmişi bırakma',
      'sakinleşme',
    ],
    context:
      'Cinsel enerjiniz, fırtınalı denizlerden ayrılıp sakin bir koya doğru yol alıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_pos2',
    card: 'Seven of Swords',
    position: 2,
    upright:
      'Cinsel hayatta gizlilik, aldatma veya dürüst olmayan davranışlar söz konusu. Bir kaçamak, gizli bir ilişki veya partnerden saklanan cinsel fanteziler olabilir.',
    reversed:
      'Ters Kılıç Yedilisi, bir yalanın veya aldatmacanın ortaya çıkma tehlikesini gösterir. Sır saklamanın getirdiği vicdan azabı veya yakalanma korkusu.',
    keywords: [
      'aldatma',
      'gizlilik',
      'kaçamak',
      'dürüst olmayan davranış',
      'sırlar',
    ],
    context:
      'Fiziksel bağlantınız, dürüst bir birleşme yerine gizli saklı yürütülen bir plana benziyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_pos2',
    card: 'Eight of Swords',
    position: 2,
    upright:
      'Fiziksel bağlantınız, korkular ve zihinsel engeller tarafından kısıtlanıyor. Taraflardan biri veya her ikisi de cinsel olarak kendini ifade etmekten korkuyor, kendini kapana kısılmış hissediyor. Cinsellik zihinsel bir hapishanede yaşanıyor.',
    reversed:
      'Ters Kılıç Sekizlisi, cinsel tabuların ve korkuların aşıldığını gösterir. Zihinsel engeller kalkıyor ve cinsel özgürleşme başlıyor. Kendini kısıtlayan düşüncelerden kurtulma.',
    keywords: [
      'cinsel ketumiyet',
      'korku',
      'zihinsel engel',
      'özgüvensizlik',
      'kısıtlanma',
    ],
    context:
      'Aranızdaki tensel bağ, kişinin kendi zihninde yarattığı engellerle boğuşuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_pos2',
    card: 'Nine of Swords',
    position: 2,
    upright:
      'Cinsel yaşam, endişe, suçluluk veya korkuyla dolu. Cinsel performans anksiyetesi, geçmiş bir travma veya utanç, fiziksel yakınlığı bir eziyete dönüştürebilir.',
    reversed:
      'Ters Kılıç Dokuzlusu, cinsel korkularla yüzleşildiğini ve bu endişelerin yersiz olduğunun anlaşıldığını gösterir. Bir iyileşme süreci başlıyor ama hala kırılganlık var.',
    keywords: [
      'cinsel anksiyete',
      'korku',
      'suçluluk',
      'utanç',
      'performans kaygısı',
    ],
    context:
      'Cinsel yaşamınız, zihinsel işkenceye dönüşen endişelerle dolu karanlık bir gece gibi.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_pos2',
    card: 'Ten of Swords',
    position: 2,
    upright:
      'Cinsel bir bitiş, bir ihanetin en acı verici noktası veya cinsel enerjinin tamamen tükenmesi. Bu, bir dönemin sonudur ve artık yeni bir başlangıçtan başka yol yoktur.',
    reversed:
      'Ters Kılıç Onlusu, acı verici bir cinsel durumdan sonra yavaş yavaş toparlanmayı gösterir. Yaralar hala taze ama en kötüsü geçmiş olabilir. Tam bir çöküşten kurtulma.',
    keywords: [
      'acı son',
      'ihanet',
      'cinsel tükenme',
      'dip nokta',
      'ihanet acısı',
    ],
    context:
      'Fiziksel bağlantınız, en dip noktaya ulaşmış, acı verici bir sonu temsil ediyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_pos2',
    card: 'Page of Swords',
    position: 2,
    upright:
      "Cinsel konularda meraklı, sorgulayıcı ve konuşkan bir enerji. 'Kirli konuşma' (dirty talk) veya cinsel deneyimler hakkında açıkça iletişim kurma potansiyeli. Biraz deneyimsiz ama hevesli.",
    reversed:
      'Ters Kılıç Uşağı, sözlerin cinsel hayatta kırıcı olabileceğini veya yalanları gösterir. İletişim, yakınlaşmak yerine uzaklaştırabilir. Savunmacı bir cinsellik.',
    keywords: [
      'cinsel merak',
      'iletişim',
      'kirli konuşma',
      'sorgulama',
      'deneyimsizlik',
    ],
    context:
      'Fiziksel bağlantınız, kelimelerle ve zihinle oynanan keskin ve meraklı bir oyun.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_pos2',
    card: 'Knight of Swords',
    position: 2,
    upright:
      "Hızlı, tutkulu ve belki de biraz düşüncesiz bir cinsel yaklaşım. 'Tek gecelik ilişki' enerjisi taşıyabilir. Hedef odaklıdır ve duygusal derinlikten çok, eyleme ve fethe odaklanır.",
    reversed:
      'Ters Kılıç Şövalyesi, agresif, kaba veya bencil bir cinsel partneri gösterebilir. Partnerinin ihtiyaçlarını göz ardı eden, aceleci bir enerji.',
    keywords: [
      'hızlı cinsellik',
      'düşüncesizlik',
      'fetih',
      'tek gecelik ilişki',
      'acelecilik',
    ],
    context:
      'Cinsel enerjiniz, bir fırtına gibi hızla gelip geçen, hedef odaklı bir akıncı.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_pos2',
    card: 'Queen of Swords',
    position: 2,
    upright:
      'Cinsel olarak zeki, deneyimli ve ne istediğini bilen birini temsil eder. Duygusal dramadan çok, açık iletişime ve zihinsel uyuma önem verir. Esprili ve keskin bir cinsel zekası olabilir.',
    reversed:
      'Ters Kılıç Kraliçesi, cinsel olarak soğuk, mesafeli, eleştirel veya geçmişteki acılar yüzünden kendini kapatmış birini gösterebilir. Cinselliği bir intikam aracı olarak kullanabilir.',
    keywords: ['cinsel zeka', 'deneyim', 'netlik', 'mesafe', 'bağımsızlık'],
    context:
      'Cinselliğiniz, zekanın ve deneyimin yönlendirdiği, duygusal mesafenin korunduğu bir alan.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_pos2',
    card: 'King of Swords',
    position: 2,
    upright:
      'Cinsellikte otorite, zeka ve kontrol sahibi birini temsil eder. Cinsel fanteziler veya konuşmalar entelektüel bir seviyede olabilir. Duygusal olarak mesafeli ama adil ve dürüst bir cinsel partner.',
    reversed:
      'Ters Kılıç Kralı, cinsel olarak manipülatif, kontrolcü ve duygusuz birini gösterir. Zekasını partnerini kontrol etmek veya cinsel olarak baskı kurmak için kullanabilir.',
    keywords: [
      'entelektüel cinsellik',
      'kontrol',
      'otorite',
      'dürüstlük',
      'mesafe',
    ],
    context:
      'Cinsel bağlantınız, zekanın ve mantığın hüküm sürdüğü, son derece kontrollü bir alan.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_pos2',
    card: 'Ace of Wands',
    position: 2,
    upright:
      'Aranızda yeni ve güçlü bir cinsel kıvılcım var. Bu, büyük bir tutkunun, fiziksel enerjinin ve cinsel uyanışın başlangıcıdır. Karşı konulmaz bir arzu söz konusu.',
    reversed:
      'Ters Asa Ası, cinsel isteksizlik, enerji düşüklüğü veya aranızdaki çekimin sönükleştiğini gösterir. Potansiyel var ama bir türlü alevlenmiyor. İktidarsızlık veya cinsel soğukluk.',
    keywords: [
      'cinsel kıvılcım',
      'tutku',
      'arzu',
      'fiziksel enerji',
      'yeni başlangıç',
    ],
    context:
      'Fiziksel bağlantınız, patlamaya hazır bir tutkunun ilk kıvılcımını taşıyor.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_pos2',
    card: 'Two of Wands',
    position: 2,
    upright:
      'Fiziksel olarak birbirinizi arzuluyor ve gelecekteki cinsel potansiyeli düşünüyorsunuz. Bir keşif ve planlama aşaması. Cinsel olarak daha ileri gitme isteği var.',
    reversed:
      'Ters Asa İkilisi, cinsel bir adım atmaktan korkma, risk almama veya aradaki çekimin tek taraflı kalması anlamına gelir. Arzu var ama eylem yok.',
    keywords: ['cinsel arzu', 'potansiyel', 'planlama', 'keşif', 'çekim'],
    context:
      'Tensel enerjiniz, bir sonraki adımı atmayı düşünen, potansiyel dolu bir kaşif gibi.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_pos2',
    card: 'Three of Wands',
    position: 2,
    upright:
      'Cinsel beklentileriniz ve arzularınız karşılık buluyor. Fiziksel olarak bir açılma ve keşfetme dönemi. Uzak mesafe ilişkisindeyseniz, kavuşma zamanının yaklaştığını gösterebilir.',
    reversed:
      'Ters Asa Üçlüsü, cinsel hayatta hayal kırıklığı, gecikmeler veya tatminsizlik olduğunu gösterir. Beklentileriniz gerçekleşmiyor. Sabırsızlık, zevki engelliyor.',
    keywords: [
      'cinsel beklenti',
      'karşılık bulma',
      'keşif',
      'ilerleme',
      'kavuşma',
    ],
    context:
      'Fiziksel bağlantınız, ufukta yeni ve heyecan verici cinsel maceraların göründüğü bir bekleyiş.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_pos2',
    card: 'Four of Wands',
    position: 2,
    upright:
      'Fiziksel bağlantınız neşeli, uyumlu ve kutlamaya değer. Cinsellik, iki insan arasındaki mutlu bir birliğin kutlamasıdır. Balayı veya tutkulu bir kaçamak enerjisi.',
    reversed:
      'Ters Asa Dörtlüsü, cinsel hayatta bir uyumsuzluk veya istikrarsızlık olduğunu gösterir. Fiziksel bağ, beklenen neşeyi ve kutlama hissini vermiyor.',
    keywords: ['tutkulu kutlama', 'cinsel uyum', 'neşe', 'balayı', 'istikrar'],
    context:
      'Cinsel yaşamınız, iki insanın bir araya gelmesini kutlayan neşeli ve tutkulu bir festival.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_pos2',
    card: 'Five of Wands',
    position: 2,
    upright:
      'Cinsel yaşamınızda bir rekabet, oyuncul bir sürtüşme veya çok fazla ham enerji var. Bu, tutkulu ve enerjik bir cinselliğe işaret edebilir, ancak aynı zamanda bir çatışmaya da dönüşebilir. Farklı arzuların çarpışması.',
    reversed:
      'Ters Asa Beşlisi, cinsel çatışmadan kaçınma, bastırılmış arzu veya cinsel yorgunluğu gösterir. Rekabet, yerini isteksizliğe bırakmıştır.',
    keywords: [
      'cinsel rekabet',
      'ham enerji',
      'tutkulu sürtüşme',
      'çatışma',
      'farklı arzular',
    ],
    context:
      'Cinselliğiniz, enerjilerin ve arzuların çarpıştığı, oyuncul ama kaotik bir alan.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_pos2',
    card: 'Six of Wands',
    position: 2,
    upright:
      'Tatmin edici ve başarılı bir cinsel yaşam. Partnerler birbirini memnun eder ve bu durum özgüveni artırır. Cinsel performansın takdir edilmesi ve zafer hissi.',
    reversed:
      'Ters Asa Altılısı, cinsel hayatta bir başarısızlık hissi, performans anksiyetesi veya takdir eksikliği olduğunu gösterir. Bir tarafın egosunun diğerini ezmesi.',
    keywords: ['cinsel zafer', 'özgüven', 'takdir', 'başarı', 'tatmin'],
    context:
      'Fiziksel bağlantınız, her iki tarafın da kendini galip hissettiği, başarılı bir fetih.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_pos2',
    card: 'Seven of Wands',
    position: 2,
    upright:
      'Cinsel olarak kendini savunma veya sınırları koruma durumu. Bir tarafın cinsel yaklaşımlarına karşı diğerinin direnç göstermesi. Tutkulu bir meydan okuma veya cinsel bir mücadele.',
    reversed:
      'Ters Asa Yedilisi, cinsel bir mücadelede yenik düşme, cinsel özgüven kaybı veya savunmasız hissetme. Sınırlar aşıldığında hissedilen yorgunluk.',
    keywords: [
      'cinsel sınırlar',
      'meydan okuma',
      'savunma',
      'direnç',
      'mücadele',
    ],
    context:
      'Cinsel enerjiniz, birinin kendi alanını ve arzularını tutkuyla savunduğu bir mücadele.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_pos2',
    card: 'Eight of Wands',
    position: 2,
    upright:
      'Hızlı, tutkulu ve heyecan verici bir cinsel enerji. Olaylar hızla gelişebilir. Tutkulu mesajlaşmalar, ani buluşmalar ve yüksek bir cinsel tempo.',
    reversed:
      'Ters Asa Sekizlisi, cinsel enerjide bir yavaşlama, gecikme veya yanlış zamanlama olduğunu gösterir. Tutkulu mesajlar cevapsız kalabilir veya cinsel birleşme ertelenebilir. Kıskançlık.',
    keywords: [
      'hızlı tutku',
      'heyecan',
      'cinsel iletişim',
      'yüksek tempo',
      'arzu',
    ],
    context:
      'Fiziksel bağlantınız, hedefine hızla ulaşan tutku okları gibi, durdurulamaz bir enerji.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_pos2',
    card: 'Nine of Wands',
    position: 2,
    upright:
      'Geçmiş cinsel hayal kırıklıkları nedeniyle temkinli ve savunmacı bir duruş. Cinsel yakınlığa karşı bir duvar örülmüş olabilir. Arzu vardır ama güven eksikliği nedeniyle eyleme geçmek zordur.',
    reversed:
      'Ters Asa Dokuzlusu, cinsel bir savunmanın artık işe yaramadığını veya aşıldığını gösterir. Ya tamamen pes etme ya da inatçı bir şekilde güvensizliğe devam etme.',
    keywords: [
      'cinsel güvensizlik',
      'savunma',
      'temkin',
      'geçmiş yaralar',
      'duvar örme',
    ],
    context:
      'Fiziksel bağlantınız, geçmişte yaralanmış ve yeniden incinmekten korkan bir savaşçının enerjisi.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_pos2',
    card: 'Ten of Wands',
    position: 2,
    upright:
      'Cinsel yaşam, bir zevk kaynağından çok bir görev veya yük gibi hissediliyor. Stres ve yorgunluk, libidoyu ve cinsel isteği baskılamış durumda.',
    reversed:
      'Ters Asa Onlusu, cinsel yaşamdaki bir yükün veya baskının hafiflediğini gösterir. Sorumlulukların azalmasıyla cinsel enerji yeniden canlanabilir.',
    keywords: [
      'cinsel yük',
      'stres',
      'tükenmişlik',
      'baskı',
      'görev gibi cinsellik',
    ],
    context:
      'Cinsel yaşamınız, hayatın diğer yükleri altında ezilmiş, zevkini kaybetmiş bir enerji.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_pos2',
    card: 'Page of Wands',
    position: 2,
    upright:
      'Yeni cinsel deneyimlere karşı bir heves ve macera arzusu. Flörtöz, enerjik ve tutkulu bir başlangıç. Cinsel olarak keşfe açık ve eğlenceli bir enerji.',
    reversed:
      'Ters Asa Uşağı, cinsel bir başlangıç yapma konusunda kararsızlık veya olgunlaşmamış bir cinsel enerji gösterir. Tutku var ama nereye yönlendireceğini bilemiyor.',
    keywords: ['cinsel macera', 'heves', 'flört', 'keşif', 'tutkulu başlangıç'],
    context:
      'Fiziksel bağlantınız, yeni maceralara atılmaya hevesli, enerjik ve tutkulu bir kaşif.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_pos2',
    card: 'Knight of Wands',
    position: 2,
    upright:
      'Son derece tutkulu, enerjik ve maceraperest bir cinsel bağlantı. Karizmatik ve baştan çıkarıcı bir enerji. Cinsel olarak oldukça aktif ve cesur.',
    reversed:
      'Ters Asa Şövalyesi, bencil, aceleci ve sadece kendi zevkine odaklanmış bir cinsel partneri gösterebilir. Tutkusu çabuk parlayıp sönebilir. Bağlılıktan kaçan bir enerji.',
    keywords: ['yoğun tutku', 'macera', 'karizma', 'cinsel enerji', 'cesaret'],
    context:
      'Cinsel enerjiniz, bir alev gibi parlak, sıcak ve durdurulamaz bir maceraperest.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_pos2',
    card: 'Queen of Wands',
    position: 2,
    upright:
      'Kendine güvenen, tutkulu ve cinsel olarak özgür bir enerji. Yatakta ne istediğini bilen, yaratıcı ve eğlenceli bir partner. Çekici ve manyetik bir cinsel aura.',
    reversed:
      'Ters Asa Kraliçesi, cinsel olarak talepkar, kıskanç veya dramatik birini gösterebilir. Cinsel enerjisini manipülasyon için kullanabilir. Güvensizlik, tutkunun önüne geçiyor.',
    keywords: [
      'cinsel özgüven',
      'tutku',
      'yaratıcılık',
      'çekicilik',
      'özgürlük',
    ],
    context:
      'Cinsel bağlantınız, ateşli, kendine güvenen ve etrafına ışık saçan bir kraliçenin enerjisi.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_pos2',
    card: 'King of Wands',
    position: 2,
    upright:
      'Cinsel olarak deneyimli, lider ve son derece tutkulu bir partner. Yatakta kontrolü elinde tutmayı sever ama aynı zamanda cömerttir. Karizmatik ve güçlü bir cinsel enerji.',
    reversed:
      'Ters Asa Kralı, cinsel olarak baskıcı, bencil veya egoist bir partneri gösterebilir. Partnerinin ihtiyaçlarını önemsemeyen, sadece kendi tatminine odaklanan bir lider.',
    keywords: ['cinsel liderlik', 'deneyim', 'yoğun tutku', 'karizma', 'güç'],
    context:
      'Cinsel yaşamınız, tutku krallığını yöneten, deneyimli ve karizmatik bir lider.',
    group: 'Asalar',
  },

  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_pos2',
    card: 'Ace of Pentacles',
    position: 2,
    upright:
      'Yeni, sağlam ve güven veren bir fiziksel başlangıç. Bu, ilk cinsel deneyim veya tensel uyumun keşfedildiği yeni bir ilişki olabilir. Cinsellik, topraklanmış ve gerçektir.',
    reversed:
      'Ters Tılsım Ası, cinsel bir fırsatın kaçırıldığını veya fiziksel bağ kurmak için doğru bir zaman olmadığını gösterir. Tensel uyumda bir eksiklik veya gecikme.',
    keywords: [
      'sağlam başlangıç',
      'tensel uyum',
      'güven',
      'gerçeklik',
      'fırsat',
    ],
    context:
      'Fiziksel bağlantınız, sağlam bir zeminde filizlenen yeni ve değerli bir tohum gibi.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pos2',
    card: 'Two of Pentacles',
    position: 2,
    upright:
      'Fiziksel bağlantınız eğlenceli, esnek ve ritmik. Partnerler arasında oyuncul bir denge vardır. Cinsellik, hayatın diğer sorumlulukları arasında bir denge unsuru olabilir.',
    reversed:
      'Ters Tılsım İkilisi, cinsel hayatta bir denge kurulamadığını gösterir. Stres veya meşguliyet, fiziksel yakınlığı olumsuz etkiliyor. Uyumsuz bir ritim.',
    keywords: ['denge', 'ritim', 'esneklik', 'eğlence', 'oyunculuk'],
    context:
      'Cinselliğiniz, iki bedenin uyum içinde dans ettiği, neşeli ve esnek bir ritim.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pos2',
    card: 'Three of Pentacles',
    position: 2,
    upright:
      'Fiziksel bağlantı, bir ekip çalışması gibidir. Partnerler birbirlerinin bedenlerini öğrenir ve birlikte zevki inşa ederler. Bu kart, bir üçlü ilişki (threesome) olasılığını da gösterebilir.',
    reversed:
      'Ters Tılsım Üçlüsü, cinsel olarak bir ekip gibi çalışamama, uyumsuzluk veya öğrenmeye kapalılık gösterir. Cinsellik, bir zevk paylaşımı yerine bir görev haline gelmiş.',
    keywords: [
      'işbirliği',
      'öğrenme',
      'tensel uyum',
      'inşa etme',
      'üçlü ilişki',
    ],
    context:
      'Cinsel yaşamınız, iki mimarın birlikte zevk ve tatmin inşa ettiği bir proje gibi.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pos2',
    card: 'Four of Pentacles',
    position: 2,
    upright:
      'Cinsel hayatta tutucu, kontrollü ve bazen de cimri bir enerji. Partnerini veya cinsel zevki kaybetme korkusuyla kendini kısıtlama. Cinsellik, bir rutin içinde ve yeniliklere kapalı.',
    reversed:
      'Ters Tılsım Dörtlüsü, cinsel kısıtlamalardan kurtulma arzusunu veya cinsel kontrolü kaybetme korkusunu gösterir. Bir değişim yaşanıyor ama bu gerginlik yaratabilir.',
    keywords: [
      'cinsel tutuculuk',
      'kontrol',
      'kısıtlama',
      'rutin',
      'kaybetme korkusu',
    ],
    context:
      'Cinsel enerjiniz, zevki özgürce yaşamak yerine onu biriktirmeye çalışan, kapalı bir hazine sandığı.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pos2',
    card: 'Five of Pentacles',
    position: 2,
    upright:
      'Fiziksel olarak dışlanmış, istenmeyen veya sevgisiz hissetme. Cinsel yakınlık eksikliği veya soğukluk. Sağlık sorunları veya maddi sıkıntılar cinsel yaşamı olumsuz etkiliyor.',
    reversed:
      'Ters Tılsım Beşlisi, cinsel bir yoksunluk döneminin sona erdiğini gösterir. Fiziksel ve duygusal sıcaklık yeniden bulunuyor. İyileşme ve kabul.',
    keywords: [
      'cinsel yoksunluk',
      'soğukluk',
      'dışlanma',
      'istenmeme',
      'yakınlık eksikliği',
    ],
    context:
      'Fiziksel bağlantınız, sevgi ve sıcaklık arayışında olan, soğukta kalmış bir ruh hali.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pos2',
    card: 'Six of Pentacles',
    position: 2,
    upright:
      "Cinsel hayatta cömert ve dengeli bir alma-verme ilişkisi var. Partnerler birbirlerinin zevkine önem verir. Bu, cinsel bir güç dengesini veya bir tarafın diğerine cinsel olarak 'öğretmenlik' yapmasını gösterebilir.",
    reversed:
      'Ters Tılsım Altılısı, cinsel hayatta bir dengesizlik olduğunu gösterir. Bir taraf sürekli vericiyken diğeri alıcıdır. Bu durum, bir borçluluk veya manipülasyon hissine yol açabilir.',
    keywords: [
      'cinsel cömertlik',
      'alma-verme dengesi',
      'karşılıklı zevk',
      'güç dengesi',
      'paylaşım',
    ],
    context:
      'Cinselliğiniz, her iki tarafın da hem aldığı hem de verdiği, adil ve cömert bir hediyeleşme.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pos2',
    card: 'Seven of Pentacles',
    position: 2,
    upright:
      "Cinsel yaşamda bir durup değerlendirme yapma zamanı. 'Bu ilişki tensel olarak beni tatmin ediyor mu?' sorusu sorulabilir. Sabırlı bir bekleyiş veya cinsel bir duraklama dönemi.",
    reversed:
      'Ters Tılsım Yedilisi, cinsel hayattaki çabaların boşa gittiği hissini veya sabırsızlık nedeniyle zevkin kaçırıldığını gösterir. Yatırım yapılan cinsel enerji karşılığını vermiyor.',
    keywords: [
      'değerlendirme',
      'sabır',
      'cinsel duraklama',
      'tatminsizlik',
      'bekleyiş',
    ],
    context:
      'Cinsel bağlantınız, emeklerinizin meyve verip vermeyeceğini görmek için sabırla beklediğiniz bir bahçe.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pos2',
    card: 'Eight of Pentacles',
    position: 2,
    upright:
      'Cinsel yaşamda bir öğrenme, pratik yapma ve ustalaşma süreci. Partnerler birbirlerinin bedenlerini ve zevk noktalarını keşfetmeye odaklanmış durumda. Özenli ve dikkatli bir cinsellik.',
    reversed:
      'Ters Tılsım Sekizlisi, cinsel hayatta bir tembellik, özensizlik veya rutine saplanıp kalma durumu gösterir. Cinsellik, mekanik ve ilhamsız bir hale gelmiş.',
    keywords: ['cinsel öğrenme', 'ustalaşma', 'özen', 'pratik', 'keşif'],
    context:
      'Cinselliğiniz, birbirinizin bedenini bir sanat eseri gibi özenle işlediğiniz bir atölye.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pos2',
    card: 'Nine of Pentacles',
    position: 2,
    upright:
      'Kendi bedeniyle ve cinselliğiyle barışık, kendine yeten bir enerji. Cinsellik, bir ihtiyaçtan çok, bir zevk ve lüks olarak yaşanır. Mastürbasyon veya partner olmadan da cinsel tatmin bulma.',
    reversed:
      'Ters Tılsım Dokuzlusu, cinsel olarak kendine güvensizlik, yalnızlık hissi veya bedeniyle barışık olmama durumunu gösterir. Lüks ve zevk arayışı, bir boşluğu doldurma çabası olabilir.',
    keywords: [
      'cinsel bağımsızlık',
      'kendine yetme',
      'zevk',
      'lüks',
      'beden olumlama',
    ],
    context:
      'Cinsel enerjiniz, kendi bahçesinin keyfini süren, bağımsız ve şehvetli bir ruh.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pos2',
    card: 'Ten of Pentacles',
    position: 2,
    upright:
      'Fiziksel bağlantınız son derece sağlam, tatmin edici ve güven verici. Bu, sadece geçici bir heves değil, aynı zamanda köklü ve kalıcı olabilecek bir tensel uyumu gösterir. Cinsellik, bir yuva hissi verir ve doğurganlığı destekler.',
    reversed:
      'Ters Tılsım Onlusu, fiziksel uyumsuzluk veya cinsel hayatta bir istikrarsızlık olduğunu gösterir. Tensel bağ, beklenen güveni ve tatmini sağlamıyor veya aile beklentileri cinsel hayatı olumsuz etkiliyor.',
    keywords: [
      'tensel uyum',
      'istikrar',
      'güven',
      'doğurganlık',
      'fiziksel tatmin',
    ],
    context:
      'Cinsel uyumunuz, uzun vadeli bir bağın ve köklü bir tatminin temelini oluşturuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pos2',
    card: 'Page of Pentacles',
    position: 2,
    upright:
      'Yeni bir tensel deneyime veya bedensel keşfe açık olma. Cinselliği öğrenmeye hevesli, meraklı ve topraklanmış bir enerji. Sağlam ve yavaş bir cinsel başlangıç.',
    reversed:
      'Ters Tılsım Uşağı, cinsel bir fırsatı kaçırma, tembellik veya bedensel farkındalık eksikliği gösterir. Cinselliğe karşı pratik olmayan, hayalperest bir yaklaşım.',
    keywords: [
      'bedensel keşif',
      'tensel merak',
      'öğrenme',
      'sağlam başlangıç',
      'fırsat',
    ],
    context:
      'Fiziksel bağlantınız, kendi bedenini ve zevklerini keşfeden hevesli bir öğrenci gibi.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pos2',
    card: 'Knight of Pentacles',
    position: 2,
    upright:
      'Fiziksel bağlantınız yavaş, sabırlı, güvenilir ve son derece şehvetli. Aceleci değildir, zevkin her anını hissetmeye odaklanır. Sadık ve istikrarlı bir cinsel partner.',
    reversed:
      'Ters Tılsım Şövalyesi, cinsel hayatta bir durgunluk, sıkıcılık veya tembellik gösterir. Cinsellik, bir macera veya zevkten çok, bir rutine dönüşmüş.',
    keywords: ['şehvet', 'sabır', 'güvenilirlik', 'sadakat', 'yavaş cinsellik'],
    context:
      'Cinsel enerjiniz, hedefine yavaş ama emin adımlarla ilerleyen, şehvetli ve güvenilir bir şövalye.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pos2',
    card: 'Queen of Pentacles',
    position: 2,
    upright:
      'Cinsellik besleyici, cömert, sıcak ve son derece duyusaldır. Tüm duyulara hitap eder (dokunma, tat, koku). Partnerine güvenli ve rahat bir ortam sunan, şehvetli bir enerji.',
    reversed:
      'Ters Tılsım Kraliçesi, cinsel olarak kendine veya partnerine bakmama, tembellik veya cinsel enerjiyi sadece pratik bir görev olarak görme durumunu gösterir. Duyusallık eksik.',
    keywords: ['duyusallık', 'şehvet', 'besleyicilik', 'cömertlik', 'güven'],
    context:
      'Cinsel yaşamınız, tüm duyuları besleyen, sıcak ve bereketli bir kucaklama gibi.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pos2',
    card: 'King of Pentacles',
    position: 2,
    upright:
      'Son derece şehvetli, cömert ve usta bir cinsel partner. Fiziksel zevklere düşkündür ve partnerini nasıl memnun edeceğini iyi bilir. Zengin ve tatmin edici bir cinsel deneyim sunar.',
    reversed:
      'Ters Tılsım Kralı, cinsel olarak bencil, tembel veya sadece kendi zevkine odaklanmış birini gösterebilir. Cinselliği bir statü veya güç göstergesi olarak kullanabilir.',
    keywords: [
      'şehvetli usta',
      'cömertlik',
      'fiziksel zevk',
      'başarı',
      'tatmin',
    ],
    context:
      'Cinsel bağlantınız, fiziksel zevkler krallığının cömert ve usta hükümdarı gibi.',
    group: 'Tılsımlar',
  },
];

// i18n destekli fonksiyonlar
export const useI18nPosition2Meanings = (): I18nLovePositionMeaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position2Meanings.map(meaning => {
    // i18n'den çevirileri al
    const i18nUpright = getCardMeaning(meaning.card, 2, 'upright');
    const i18nReversed = getCardMeaning(meaning.card, 2, 'reversed');
    const i18nKeywords = getCardKeywords(meaning.card, 2);
    const i18nContext = getCardContext(meaning.card, 2);
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
export const getI18nPosition2Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nLovePositionMeaning | null => {
  const originalMeaning = position2Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`love.meanings.${cardKey}.position2.upright`);
  const i18nReversed = t(`love.meanings.${cardKey}.position2.reversed`);
  const i18nKeywords = t(`love.meanings.${cardKey}.position2.keywords`);
  const i18nContext = t(`love.meanings.${cardKey}.position2.context`);
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
        console.error(`[Love Position 2] Failed to parse keywords for ${cardName}:`, error);
        return originalMeaning.keywords;
      }
    })(),
    context: i18nContext || originalMeaning.context,
    group: i18nGroup || originalMeaning.group,
  };
};
