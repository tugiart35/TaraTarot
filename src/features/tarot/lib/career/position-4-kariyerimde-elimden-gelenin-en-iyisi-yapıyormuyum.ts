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

export const position4Meanings: CareerPositionMeaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_pos4',
    card: 'The Fool',
    position: 4,
    upright:
      'Joker, işinde içtenlikle ve merakla ilerlediğini gösterir. Yeni şeyleri denemeye açıksın ve bu da performansını özgün kılıyor.',
    reversed:
      'Ters Joker, dikkatsizlik veya plansız adımlar nedeniyle enerjini tam anlamıyla ortaya koymadığını gösterir.',
    keywords: ['cesaret', 'özgünlük', 'merak', 'performans', 'özgürlük'],
    context:
      'Şu anki kariyerinde özgür bir ruhla ilerliyorsun ama daha planlı olursan çaban daha çok değer kazanacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_pos4',
    card: 'The Magician',
    position: 4,
    upright:
      'Büyücü, potansiyelini işine yansıttığını ve kaynaklarını verimli kullandığını gösterir. Gerçekten elinden geleni yapıyorsun.',
    reversed:
      'Ters Büyücü, yeteneklerini küçümseyebilir ya da yanlış kullanabilirsin. Bu da performansının tam yansımamasına neden olur.',
    keywords: ['beceri', 'potansiyel', 'yaratıcılık', 'özgüven', 'performans'],
    context:
      'Şu anki çaban, sahip olduğun becerileri doğru kullandığında en iyisine dönüşüyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_pos4',
    card: 'The High Priestess',
    position: 4,
    upright:
      'Başrahibe, işinde sezgilerini ve bilgeliğini kullandığını gösterir. İçsel gücün performansına yansıyor.',
    reversed:
      'Ters Başrahibe, sezgini bastırdığında potansiyelini tam ortaya koyamayabilirsin.',
    keywords: ['sezgi', 'bilgelik', 'içsel güç', 'farkındalık', 'performans'],
    context:
      'Şu anki çaban, bilgeliğini ve sezgini işine katmanla değer kazanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_pos4',
    card: 'The Empress',
    position: 4,
    upright:
      'İmparatoriçe, yaratıcılığını ve üretkenliğini işine kattığını gösterir. Elinden gelenin en iyisini yapıyorsun.',
    reversed:
      'Ters İmparatoriçe, üretkenliğini kısıtladığında veya ilhamını bastırdığında potansiyelini tam kullanmıyorsun.',
    keywords: ['yaratıcılık', 'üretkenlik', 'ilham', 'performans', 'bereket'],
    context: 'Şu anki çaban yaratıcılığını işine katmanla ortaya çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_pos4',
    card: 'The Emperor',
    position: 4,
    upright:
      'İmparator, disiplinin ve kararlılığın işine en iyi şekilde yansıdığını gösterir. Elinden gelenin en iyisini yapıyorsun.',
    reversed:
      'Ters İmparator, fazla katı kurallar ya da kontrolsüzlük nedeniyle çabanın tam karşılığını alamıyor olabilirsin.',
    keywords: ['disiplin', 'kararlılık', 'istikrar', 'otorite', 'performans'],
    context: 'Şu anki çaban, disiplin ve düzenle güçleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_pos4',
    card: 'The Hierophant',
    position: 4,
    upright:
      'Aziz, bilgini ve deneyimini işinde kullandığını gösterir. Öğrenme ve öğretme yönün güçlü.',
    reversed:
      'Ters Aziz, otoriteyi reddetmek veya kurallara uymamak çabanın eksik görünmesine neden olabilir.',
    keywords: ['bilgi', 'öğrenme', 'öğretme', 'otorite', 'performans'],
    context: 'Şu anki performansın, bilgini paylaşarak daha da güçleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_pos4',
    card: 'The Lovers',
    position: 4,
    upright:
      'Aşıklar, işine kalbini koyduğunu ve seçimlerinde samimi olduğunu gösterir. Elinden geleni yapıyorsun.',
    reversed:
      'Ters Aşıklar, kararsızlık ya da tutarsızlık nedeniyle enerjini tam aktaramıyor olabilirsin.',
    keywords: ['karar', 'samimiyet', 'uyum', 'çaba', 'performans'],
    context: 'Çaban, işine olan bağlılığınla güçleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_pos4',
    card: 'The Chariot',
    position: 4,
    upright:
      'Savaş Arabası, azmin ve kararlılığın seni ileri taşıdığını gösterir. Tüm gücünle çalışıyorsun.',
    reversed:
      'Ters Savaş Arabası, odak eksikliği nedeniyle çabanın dağılabileceğini söyler.',
    keywords: ['azim', 'odak', 'irade', 'kararlılık', 'performans'],
    context:
      'Şu anki performansın, iradeni ve odak gücünü işine aktarmanla ortaya çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_pos4',
    card: 'Strength',
    position: 4,
    upright:
      'Güç, sabrın, öz kontrolün ve içsel direncin işine en iyi şekilde yansıdığını gösterir.',
    reversed:
      'Ters Güç, sabırsızlık veya güvensizlik çabanın değerini düşürebilir.',
    keywords: ['sabır', 'direnç', 'özgüven', 'kontrol', 'performans'],
    context: 'Elinden gelenin en iyisini sabırla ve öz kontrolle yapıyorsun.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_pos4',
    card: 'The Hermit',
    position: 4,
    upright:
      'Ermiş, işine derin düşünce ve tecrübeyle yaklaştığını gösterir. Çaban bilgelikle birleşiyor.',
    reversed:
      'Ters Ermiş, aşırı içe kapanıklık veya yalnızlık, performansını sınırlayabilir.',
    keywords: ['bilgelik', 'tecrübe', 'içsel güç', 'öğrenme', 'performans'],
    context:
      'Çaban, tecrübelerini ve içsel gücünü işine yansıtmanla ortaya çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_pos4',
    card: 'The Wheel of Fortune',
    position: 4,
    upright:
      'Kader Çarkı, fırsatlar karşısında elinden geleni yaptığını gösterir. Döngüleri iyi değerlendiriyorsun.',
    reversed:
      'Ters Kader Çarkı, şanssızlık ya da gecikmeler performansını tam yansıtmana engel olabilir.',
    keywords: ['fırsat', 'döngü', 'şans', 'çaba', 'performans'],
    context: 'Elinden geleni yapıyorsun ama bazı şeyler dış koşullara bağlı.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_pos4',
    card: 'Justice',
    position: 4,
    upright:
      'Adalet, işinde adil, dürüst ve sorumluluk sahibi davrandığını gösterir. Çaban net ve güçlü.',
    reversed:
      'Ters Adalet, hataları görmezden gelmek veya sorumluluktan kaçmak performansını düşürebilir.',
    keywords: ['adalet', 'dürüstlük', 'sorumluluk', 'denge', 'performans'],
    context:
      'Şu anki performansın, dürüst ve sorumlu yaklaşımınla ortaya çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_pos4',
    card: 'The Hanged Man',
    position: 4,
    upright:
      'Asılan Adam, fedakarlıkların ve sabırlı yaklaşımın çabanı gösteriyor. Elinden geleni yapıyorsun.',
    reversed:
      'Ters Asılan Adam, gereksiz ertelemeler veya isteksizlik, performansını sınırlıyor olabilir.',
    keywords: [
      'fedakarlık',
      'sabır',
      'bakış açısı',
      'teslimiyet',
      'performans',
    ],
    context: 'Çaban, sabırlı ve fedakar yaklaşımınla yansıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_pos4',
    card: 'Death',
    position: 4,
    upright:
      'Ölüm, işinde dönüşüm için cesurca adımlar attığını ve çabanı yenilenmeye yönlendirdiğini gösterir.',
    reversed:
      'Ters Ölüm, değişime direnç göstermek çabanın etkisini azaltabilir.',
    keywords: ['dönüşüm', 'cesaret', 'yenilenme', 'değişim', 'performans'],
    context: 'Çaban, dönüşüme uyum sağlamanla en güçlü şekilde ortaya çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_pos4',
    card: 'Temperance',
    position: 4,
    upright:
      'Denge, işinde uyumlu ve ölçülü davrandığını gösterir. Çaban istikrarlı ve bilinçli.',
    reversed:
      'Ters Denge, aşırılık ya da sabırsızlık, çabanın değerini azaltabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'istikrar', 'performans'],
    context: 'Elinden geleni uyumla ve sabırla yapıyorsun.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_pos4',
    card: 'The Devil',
    position: 4,
    upright:
      'Şeytan, işinde çok fazla çaba harcadığını ama bazen bağımlılık veya aşırılıkla kendini zorladığını gösterir.',
    reversed:
      'Ters Şeytan, bazı alışkanlıklar veya bağımlılıklar yüzünden enerjini tam verimli kullanmadığını gösterebilir.',
    keywords: ['bağımlılık', 'aşırılık', 'çaba', 'tutku', 'performans'],
    context:
      'Çaban yüksek ama bazen seni kısıtlayan kalıplar altında gerçekleşiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_pos4',
    card: 'The Tower',
    position: 4,
    upright:
      'Kule, kriz anlarında bile elinden geleni yaptığını ve ayakta kalmaya çalıştığını gösterir.',
    reversed:
      'Ters Kule, beklenmedik olaylar karşısında çabanın yetersiz hissettirebileceğini gösterir.',
    keywords: ['kriz', 'çaba', 'güç', 'dayanıklılık', 'performans'],
    context: 'Elinden geleni zor zamanlarda bile gösteriyorsun.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_pos4',
    card: 'The Star',
    position: 4,
    upright:
      'Yıldız, işine umut ve ilham kattığını gösterir. Çaban pozitif bir ışık saçıyor.',
    reversed:
      'Ters Yıldız, umutsuzluk veya motivasyon kaybı çabanın etkisini zayıflatabilir.',
    keywords: ['umut', 'ilham', 'pozitiflik', 'çaba', 'performans'],
    context: 'Şu anki çaban ilham ve umutla birleşiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_pos4',
    card: 'The Moon',
    position: 4,
    upright:
      'Ay, işinde sezgilerini kullandığını ama bazen belirsizliklerle uğraştığını gösterir. Çaban dürüst ama netlik eksik olabilir.',
    reversed:
      'Ters Ay, kaygılar veya yanlış algılar performansını sınırlıyor olabilir.',
    keywords: ['belirsizlik', 'sezgi', 'çaba', 'performans', 'yanılsama'],
    context: 'Çaban var ama belirsizlikler onu tam görünür kılmıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_pos4',
    card: 'The Sun',
    position: 4,
    upright:
      'Güneş, işinde parlak bir enerjiyle ilerlediğini ve gerçekten elinden gelenin en iyisini yaptığını gösterir.',
    reversed:
      'Ters Güneş, özgüven eksikliği veya yorgunluk performansını tam yansıtmayabilir.',
    keywords: ['başarı', 'özgüven', 'pozitiflik', 'enerji', 'performans'],
    context: 'Çaban güçlü, ışığını işine katıyorsun.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_pos4',
    card: 'Judgement',
    position: 4,
    upright:
      'Mahkeme, geçmiş deneyimlerinden ders çıkararak en iyisini yaptığını gösterir. Çaban bilinçli ve güçlü.',
    reversed:
      'Ters Mahkeme, geçmiş hataları görmezden gelmek performansını sınırlıyor olabilir.',
    keywords: ['ders', 'farkındalık', 'deneyim', 'çaba', 'performans'],
    context:
      'Şu anki çaban, geçmişten öğrendiklerini işine katmanla güçleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_pos4',
    card: 'The World',
    position: 4,
    upright:
      'Dünya, işinde bütünsel bir çaba gösterdiğini ve tamamlanmaya doğru ilerlediğini gösterir.',
    reversed:
      'Ters Dünya, eksik kalan detayların performansının tam görünmesini engelleyebilir.',
    keywords: ['tamamlanma', 'başarı', 'çaba', 'performans', 'döngü'],
    context: 'Çaban bütünsel bir başarıya doğru ilerliyor.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_pos4',
    card: 'Ace of Cups',
    position: 4,
    upright:
      'Kupa Ası, işinde samimiyet ve içtenlik ile ilerlediğini gösterir. Kalbini kattığın için çaban çok değerli.',
    reversed:
      'Ters Kupa Ası, duygularını bastırdığında ya da ilhamını kaybettiğinde çaban tam görünmeyebilir.',
    keywords: ['samimiyet', 'ilham', 'duygu', 'başlangıç', 'performans'],
    context:
      'Çaban, içtenlikle işine kalbini koyduğunda en güçlü hale geliyor.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_pos4',
    card: 'Two of Cups',
    position: 4,
    upright:
      'İki Kupa, işbirliği ve uyum konusunda elinden geleni yaptığını gösterir. Partnerliklerin performansına katkı sağlıyor.',
    reversed:
      'Ters İki Kupa, uyum eksikliği ya da yanlış anlaşılmalar çabanın görünmesini engelleyebilir.',
    keywords: ['uyum', 'ortaklık', 'işbirliği', 'denge', 'performans'],
    context: 'Çaban, ilişkilerinde kurduğun uyumla işine yansıyor.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_pos4',
    card: 'Three of Cups',
    position: 4,
    upright:
      'Üç Kupa, işinde ekip ruhuna katkı sunduğunu ve başarıları paylaştığını gösterir.',
    reversed:
      'Ters Üç Kupa, ekip içindeki uyumsuzluk çabanın değerini gölgeleyebilir.',
    keywords: ['destek', 'ekip', 'paylaşım', 'kutlama', 'performans'],
    context: 'Çaban, ekip çalışmasına kattığın destekle parlıyor.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_pos4',
    card: 'Four of Cups',
    position: 4,
    upright:
      'Dört Kupa, bazen elinden geleni yapsan da tatminsizlik hissedebildiğini gösterir. Çaban güçlü ama motivasyon eksikliği olabilir.',
    reversed:
      'Ters Dört Kupa, fırsatlara odaklanmadığında performansının görünürlüğü azalır.',
    keywords: ['tatmin', 'farkındalık', 'motivasyon', 'çaba', 'performans'],
    context: 'Çaban var ama fırsatlara daha çok odaklanman gerekebilir.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_pos4',
    card: 'Five of Cups',
    position: 4,
    upright:
      'Beş Kupa, geçmiş kayıplara rağmen elinden geleni yaptığını gösterir. Çaban, zorluklara rağmen sürüyor.',
    reversed:
      'Ters Beş Kupa, odak noktanı kayıplardan çevirdiğinde performansın güçlenecek.',
    keywords: ['kayıp', 'çaba', 'sabır', 'denge', 'performans'],
    context: 'Çaban, zor zamanlarda bile devam etmenle öne çıkıyor.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_pos4',
    card: 'Six of Cups',
    position: 4,
    upright:
      'Altı Kupa, işine samimiyet ve geçmişten gelen deneyimleri kattığını gösterir.',
    reversed:
      'Ters Altı Kupa, geçmişe fazla takılı kaldığında enerjin bugüne tam yansımıyor olabilir.',
    keywords: ['samimiyet', 'deneyim', 'geçmiş', 'paylaşım', 'performans'],
    context: 'Çaban, samimiyet ve geçmişten aldığın güçle destekleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_pos4',
    card: 'Seven of Cups',
    position: 4,
    upright:
      'Yedi Kupa, birçok hayal ve seçenek arasında çaba gösterdiğini ama bazen dağılabildiğini gösterir.',
    reversed:
      'Ters Yedi Kupa, netleştiğinde performansın çok daha güçlü olacaktır.',
    keywords: ['hayal', 'seçenek', 'odak', 'çaba', 'performans'],
    context: 'Çaban var ama odaklandığında daha görünür hale geliyor.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_pos4',
    card: 'Eight of Cups',
    position: 4,
    upright:
      'Sekiz Kupa, sana tatmin vermeyen şeylerden uzaklaşarak elinden geleni yaptığını gösterir. Cesaretin performansına yansıyor.',
    reversed:
      'Ters Sekiz Kupa, kalbinden geçenleri bastırmak çabanın görünmesini zorlaştırabilir.',
    keywords: ['cesaret', 'tatminsizlik', 'kopuş', 'farkındalık', 'performans'],
    context: 'Çaban, seni tatmin etmeyen şeylerden uzaklaşmanla güçleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_pos4',
    card: 'Nine of Cups',
    position: 4,
    upright:
      'Dokuz Kupa, işinde tatmin ve mutluluğa ulaşmak için elinden geleni yaptığını gösterir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatminlere kapılmak performansını tam yansıtmıyor olabilir.',
    keywords: ['tatmin', 'mutluluk', 'başarı', 'çaba', 'performans'],
    context: 'Çaban, sana mutluluk ve tatmin getiren şekilde ilerliyor.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_pos4',
    card: 'Ten of Cups',
    position: 4,
    upright:
      'On Kupa, işinde uyum ve huzur yaratarak elinden geleni yaptığını gösterir.',
    reversed:
      'Ters On Kupa, uyumsuzluklar veya huzursuzluklar çabanın görünmesini zorlaştırabilir.',
    keywords: ['uyum', 'huzur', 'denge', 'çaba', 'performans'],
    context: 'Çaban, uyumlu bir ortam yaratmanla güçleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_pos4',
    card: 'Page of Cups',
    position: 4,
    upright:
      'Kupa Prensi, işinde yaratıcılığını ve merakını kattığını gösterir. İçten çaban öne çıkıyor.',
    reversed:
      'Ters Kupa Prensi, dikkatsizlik veya hayalperestlik performansını sınırlayabilir.',
    keywords: ['yaratıcılık', 'merak', 'ilham', 'çaba', 'performans'],
    context: 'Çaban, içtenlikle ve merakla işine kattıklarınla görünüyor.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_pos4',
    card: 'Knight of Cups',
    position: 4,
    upright:
      'Kupa Şövalyesi, işinde idealist bir yaklaşım gösterdiğini ve elinden gelenin en iyisini yapmaya çalıştığını gösterir.',
    reversed:
      'Ters Kupa Şövalyesi, aşırı hayalciliğin ya da pasifliğin çabanın etkisini zayıflatabilir.',
    keywords: ['idealizm', 'vizyon', 'samimiyet', 'çaba', 'performans'],
    context: 'Çaban, idealist yaklaşımınla öne çıkıyor.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_pos4',
    card: 'Queen of Cups',
    position: 4,
    upright:
      'Kupa Kraliçesi, işine empati, duyarlılık ve şefkat kattığını gösterir. Çaban bu yönünle değerli.',
    reversed:
      'Ters Kupa Kraliçesi, fazla duygusallık performansını dengelemekte zorlanmana neden olabilir.',
    keywords: ['empati', 'duyarlılık', 'şefkat', 'samimiyet', 'performans'],
    context: 'Çaban, empatin ve duygusal zekânla daha görünür hale geliyor.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_pos4',
    card: 'King of Cups',
    position: 4,
    upright:
      'Kupa Kralı, işinde olgunluk ve duygusal denge ile ilerlediğini gösterir. Elinden gelenin en iyisini yapıyorsun.',
    reversed:
      'Ters Kupa Kralı, duygusal dengesizlik performansının değerini azaltabilir.',
    keywords: ['denge', 'olgunluk', 'liderlik', 'empati', 'performans'],
    context: 'Çaban, olgunluk ve duygusal dengeyle işine yansıyor.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_pos4',
    card: 'Ace of Swords',
    position: 4,
    upright:
      'Kılıç Ası, işinde netlik ve kararlılık gösterdiğini, düşüncelerini güçlü bir şekilde ortaya koyduğunu gösterir.',
    reversed:
      'Ters Kılıç Ası, kararsızlık veya net olmayan düşünceler nedeniyle enerjini tam yansıtamıyor olabilirsin.',
    keywords: ['netlik', 'karar', 'zihin gücü', 'çaba', 'performans'],
    context: 'Çaban, zihinsel açıklığın ve kararlılığınla güçleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_pos4',
    card: 'Two of Swords',
    position: 4,
    upright:
      'İki Kılıç, dengeli kararlar almaya çalıştığını gösterir. Elinden gelenin en iyisini yapıyorsun ama bazen ikilemler seni yavaşlatabilir.',
    reversed:
      'Ters İki Kılıç, kararsızlık veya erteleme çabanın görünmesini engelleyebilir.',
    keywords: ['karar', 'denge', 'ikilem', 'çaba', 'performans'],
    context:
      'Çaban var, ama karar süreçlerinde netleştiğinde daha çok parlayacaksın.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_pos4',
    card: 'Three of Swords',
    position: 4,
    upright:
      'Üç Kılıç, hayal kırıklıklarına rağmen elinden geleni yaptığını gösterir. Zor zamanlarda bile işine çaba veriyorsun.',
    reversed:
      'Ters Üç Kılıç, geçmiş kırgınlıkları bırakmadığında enerjini tam ortaya koyamıyor olabilirsin.',
    keywords: [
      'hayal kırıklığı',
      'çaba',
      'dayanıklılık',
      'sabır',
      'performans',
    ],
    context: 'Çaban, zorluklara rağmen devam etmenle değer kazanıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_pos4',
    card: 'Four of Swords',
    position: 4,
    upright:
      'Dört Kılıç, kendini toparlamak ve enerjini dengede tutmak için çaba gösterdiğini gösterir.',
    reversed:
      'Ters Dört Kılıç, aşırı yorgunluk çabanın görünürlüğünü azaltabilir.',
    keywords: ['dinlenme', 'denge', 'hazırlık', 'çaba', 'performans'],
    context: 'Çaban, dinlenme ve toparlanmaya da izin verdiğinde güçleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_pos4',
    card: 'Five of Swords',
    position: 4,
    upright:
      'Beş Kılıç, mücadele ortamında bile elinden geleni yaptığını gösterir. Zorlayıcı ortamlarda dirençlisin.',
    reversed:
      'Ters Beş Kılıç, gereksiz çatışmalar performansının değerini düşürebilir.',
    keywords: ['mücadele', 'direnç', 'çaba', 'çatışma', 'performans'],
    context: 'Çaban, zor şartlarda direnmenle ortaya çıkıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_pos4',
    card: 'Six of Swords',
    position: 4,
    upright:
      'Altı Kılıç, işinde geçiş dönemlerini sabırla ve emekle yönettiğini gösterir. Elinden geleni yapıyorsun.',
    reversed:
      'Ters Altı Kılıç, geçiş süreçlerinde kararsızlık performansını gölgeleyebilir.',
    keywords: ['geçiş', 'sabır', 'yolculuk', 'çaba', 'performans'],
    context: 'Çaban, zor dönemleri sabırla yönetmenle güçleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_pos4',
    card: 'Seven of Swords',
    position: 4,
    upright:
      'Yedi Kılıç, stratejik davrandığını ve zekânı kullanarak elinden geleni yaptığını gösterir.',
    reversed:
      'Ters Yedi Kılıç, dikkatsizlik veya açık strateji eksikliği performansını düşürebilir.',
    keywords: ['strateji', 'zekâ', 'çaba', 'planlama', 'performans'],
    context: 'Çaban, stratejik düşünmenle ortaya çıkıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_pos4',
    card: 'Eight of Swords',
    position: 4,
    upright:
      'Sekiz Kılıç, kendini sınırlasan da çaba göstermeye devam ettiğini gösterir. Elinden geleni yapıyorsun.',
    reversed:
      'Ters Sekiz Kılıç, özgürleştiğinde performansın çok daha güçlü olacaktır.',
    keywords: ['kısıtlama', 'çaba', 'özgürleşme', 'sabır', 'performans'],
    context: 'Çaban, sınırlarını zorlamanla ortaya çıkıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_pos4',
    card: 'Nine of Swords',
    position: 4,
    upright:
      'Dokuz Kılıç, kaygılarına rağmen işinde elinden geleni yaptığını gösterir. Çaban güçlü.',
    reversed:
      'Ters Dokuz Kılıç, kaygıların azalması performansını daha görünür kılacaktır.',
    keywords: ['kaygı', 'çaba', 'endişe', 'sabır', 'performans'],
    context: 'Çaban, korkularına rağmen devam etmenle değerli hale geliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_pos4',
    card: 'Ten of Swords',
    position: 4,
    upright:
      'On Kılıç, bitişlere rağmen elinden geleni yaptığını ve yeniden başlamak için çaba gösterdiğini gösterir.',
    reversed: 'Ters On Kılıç, toparlandığında performansın daha da güçlenecek.',
    keywords: ['bitiş', 'yenilenme', 'çaba', 'sabır', 'performans'],
    context: 'Çaban, zor bitişlerden sonra yeniden kalkmanla ortaya çıkıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_pos4',
    card: 'Page of Swords',
    position: 4,
    upright:
      'Kılıç Prensi, öğrenmeye ve araştırmaya açık olduğunu gösterir. Bu merakın çabanı besliyor.',
    reversed:
      'Ters Kılıç Prensi, dikkatsizlik veya yüzeysel yaklaşım çabanın gücünü azaltabilir.',
    keywords: ['öğrenme', 'merak', 'çaba', 'keşif', 'performans'],
    context: 'Çaban, öğrenme isteğinle güçleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_pos4',
    card: 'Knight of Swords',
    position: 4,
    upright:
      'Kılıç Şövalyesi, hızla ve cesaretle ilerlediğini gösterir. Elinden gelenin en iyisini yapıyorsun.',
    reversed: 'Ters Kılıç Şövalyesi, acelecilik çabanın etkisini azaltabilir.',
    keywords: ['cesaret', 'hız', 'çaba', 'odak', 'performans'],
    context: 'Çaban, cesaretin ve hızınla ortaya çıkıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_pos4',
    card: 'Queen of Swords',
    position: 4,
    upright:
      'Kılıç Kraliçesi, mantıklı, objektif ve bağımsız çalışarak elinden geleni yaptığını gösterir.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı soğukluk veya mesafe performansını gölgeleyebilir.',
    keywords: ['mantık', 'bağımsızlık', 'çaba', 'disiplin', 'performans'],
    context: 'Çaban, mantıklı ve bağımsız yaklaşımınla güçleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_pos4',
    card: 'King of Swords',
    position: 4,
    upright:
      'Kılıç Kralı, bilgeliğini ve adaletli kararlarını işine yansıttığını gösterir. Elinden gelenin en iyisini yapıyorsun.',
    reversed:
      'Ters Kılıç Kralı, katı tutum veya yanlış yargılar performansının değerini azaltabilir.',
    keywords: ['bilgelik', 'adalet', 'liderlik', 'çaba', 'performans'],
    context: 'Çaban, adaletli ve bilgece kararlarınla öne çıkıyor.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_pos4',
    card: 'Ace of Wands',
    position: 4,
    upright:
      'Asa Ası, işinde yeni fırsatlara hevesle yaklaştığını ve tutkunla elinden geleni yaptığını gösterir.',
    reversed:
      'Ters Asa Ası, motivasyon eksikliği veya erteleme, performansının tam görünmesini engelleyebilir.',
    keywords: ['tutku', 'ilham', 'çaba', 'başlangıç', 'performans'],
    context: 'Çaban, işine kattığın enerji ve tutkunla ortaya çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_pos4',
    card: 'Two of Wands',
    position: 4,
    upright:
      'İki Asa, planlama ve vizyon geliştirme konusunda elinden geleni yaptığını gösterir.',
    reversed: 'Ters İki Asa, net plan eksikliği çabanın gücünü azaltabilir.',
    keywords: ['vizyon', 'plan', 'hedef', 'çaba', 'performans'],
    context: 'Çaban, gelecek için attığın planlı adımlarla güçleniyor.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_pos4',
    card: 'Three of Wands',
    position: 4,
    upright:
      'Üç Asa, ufkunu genişletmek ve fırsatları değerlendirmek için elinden geleni yaptığını gösterir.',
    reversed: 'Ters Üç Asa, sabırsızlık çabanın görünmesini engelleyebilir.',
    keywords: ['genişleme', 'fırsat', 'bekleyiş', 'çaba', 'performans'],
    context:
      'Çaban, fırsatları araştırma ve genişleme isteğinle ortaya çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_pos4',
    card: 'Four of Wands',
    position: 4,
    upright:
      'Dört Asa, uyum ve dayanışma içinde çalışarak elinden geleni yaptığını gösterir.',
    reversed:
      'Ters Dört Asa, işbirliği eksikliği çabanın tam görünmesini zorlaştırabilir.',
    keywords: ['dayanışma', 'uyum', 'destek', 'çaba', 'performans'],
    context: 'Çaban, işbirliği ve uyumlu çalışma isteğinle güçleniyor.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_pos4',
    card: 'Five of Wands',
    position: 4,
    upright:
      'Beş Asa, rekabet ortamında elinden geleni yaptığını ve mücadele ettiğini gösterir.',
    reversed:
      'Ters Beş Asa, gereksiz tartışmalar çabanın değerini gölgeleyebilir.',
    keywords: ['rekabet', 'mücadele', 'direnç', 'çaba', 'performans'],
    context: 'Çaban, rekabet içinde ayakta kalma isteğinle ortaya çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_pos4',
    card: 'Six of Wands',
    position: 4,
    upright:
      'Altı Asa, başarılarını görünür kılmak için çaba gösterdiğini ve takdir edilmeye çalıştığını gösterir.',
    reversed:
      'Ters Altı Asa, görünürlük eksikliği çabanın değerini gölgeleyebilir.',
    keywords: ['başarı', 'takdir', 'özgüven', 'çaba', 'performans'],
    context: 'Çaban, başarılarını öne çıkarmanla güçleniyor.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_pos4',
    card: 'Seven of Wands',
    position: 4,
    upright:
      'Yedi Asa, pozisyonunu korumak için dirençle elinden geleni yaptığını gösterir.',
    reversed: 'Ters Yedi Asa, aşırı savunmacılık çabanın verimini azaltabilir.',
    keywords: ['savunma', 'direnç', 'çaba', 'kararlılık', 'performans'],
    context: 'Çaban, güçlü duruşun ve savunmanla öne çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_pos4',
    card: 'Eight of Wands',
    position: 4,
    upright:
      'Sekiz Asa, işinde hızlı ve kararlı hareket ederek elinden geleni yaptığını gösterir.',
    reversed:
      'Ters Sekiz Asa, gecikmeler veya acelecilik performansını gölgeleyebilir.',
    keywords: ['hız', 'kararlılık', 'çaba', 'fırsat', 'performans'],
    context: 'Çaban, hızlı ve etkili aksiyonlarınla ortaya çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_pos4',
    card: 'Nine of Wands',
    position: 4,
    upright:
      'Dokuz Asa, yorgun olsan bile elinden geleni yapmaya devam ettiğini gösterir.',
    reversed:
      'Ters Dokuz Asa, tükenmişlik performansının değerini azaltabilir.',
    keywords: ['dayanıklılık', 'çaba', 'sabır', 'direnç', 'performans'],
    context: 'Çaban, direncin ve vazgeçmemenle güçleniyor.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_pos4',
    card: 'Ten of Wands',
    position: 4,
    upright:
      'On Asa, ağır sorumluluklara rağmen elinden geleni yaptığını gösterir.',
    reversed: 'Ters On Asa, fazla yüklenmek çabanın değerini azaltabilir.',
    keywords: ['sorumluluk', 'yük', 'çaba', 'sabır', 'performans'],
    context: 'Çaban, üstlendiğin yükleri taşımanla görünüyor.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_pos4',
    card: 'Page of Wands',
    position: 4,
    upright:
      'Asa Prensi, işine merak ve öğrenme hevesiyle yaklaşarak elinden geleni yaptığını gösterir.',
    reversed: 'Ters Asa Prensi, dikkatsizlik performansını gölgeleyebilir.',
    keywords: ['merak', 'öğrenme', 'heves', 'çaba', 'performans'],
    context: 'Çaban, yeni şeyler öğrenme isteğinle ortaya çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_pos4',
    card: 'Knight of Wands',
    position: 4,
    upright:
      'Asa Şövalyesi, tutku ve cesaretle ilerlediğini, elinden geleni enerjinle ortaya koyduğunu gösterir.',
    reversed: 'Ters Asa Şövalyesi, acelecilik çabanın değerini azaltabilir.',
    keywords: ['cesaret', 'tutku', 'çaba', 'enerji', 'performans'],
    context: 'Çaban, cesur ve tutkulu yaklaşımınla öne çıkıyor.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_pos4',
    card: 'Queen of Wands',
    position: 4,
    upright:
      'Asa Kraliçesi, işine güven ve karizma kattığını gösterir. Elinden gelenin en iyisini yapıyorsun.',
    reversed:
      'Ters Asa Kraliçesi, özgüven eksikliği performansının değerini düşürebilir.',
    keywords: ['özgüven', 'liderlik', 'karizma', 'çaba', 'performans'],
    context: 'Çaban, özgüvenin ve liderliğinle işine yansıyor.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_pos4',
    card: 'King of Wands',
    position: 4,
    upright:
      'Asa Kralı, vizyoner bir bakış açısıyla ilerlediğini ve işinde liderlik ederek elinden geleni yaptığını gösterir.',
    reversed:
      'Ters Asa Kralı, plansızlık ya da aşırılık performansını gölgeleyebilir.',
    keywords: ['vizyon', 'liderlik', 'çaba', 'kararlılık', 'performans'],
    context: 'Çaban, vizyoner liderliğin ve kararlı tutumunla ortaya çıkıyor.',
    group: 'Asalar',
  },

  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_pos4',
    card: 'Ace of Pentacles',
    position: 4,
    upright:
      'Tılsım Ası, somut sonuçlar için güçlü bir başlangıç enerjisi taşıdığını gösterir. Kaynaklarını verimli kullanıyor, elinden geleni yapıyorsun.',
    reversed:
      'Ters Tılsım Ası, fırsatları yeterince sahiplenmediğinde çaban görünmeyebilir; temeli güçlendirmelisin.',
    keywords: ['başlangıç', 'fırsat', 'somut adım', 'verim', 'istikrar'],
    context:
      'Çaban, sağlam ve somut başlangıçlar yaptığında en iyi şekilde görünür.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pos4',
    card: 'Two of Pentacles',
    position: 4,
    upright:
      'İki Tılsım, birden çok görevi dengede tuttuğunu ve esnek çalıştığını gösterir. Elinden geleni yapıyorsun.',
    reversed:
      'Ters İki Tılsım, önceliklendirme eksikliği çabanın etkisini azaltabilir.',
    keywords: ['denge', 'esneklik', 'zaman yönetimi', 'öncelik', 'akış'],
    context: 'Çaban, akıllı zaman ve görev yönetimiyle en çok değer kazanır.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pos4',
    card: 'Three of Pentacles',
    position: 4,
    upright:
      'Üç Tılsım, ekip içinde görünür emek verdiğini ve ustalığını sergilediğini gösterir.',
    reversed:
      'Ters Üç Tılsım, işbirliği eksikliği veya standart altı iş, performans algını düşürebilir.',
    keywords: ['işbirliği', 'ustalık', 'standart', 'geri bildirim', 'gelişim'],
    context: 'Çaban, ortak üretim ve kalite standardıyla öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pos4',
    card: 'Four of Pentacles',
    position: 4,
    upright:
      'Dört Tılsım, kaynaklarını koruyup disiplinle çalıştığını gösterir. İstikrarlı bir çaban var.',
    reversed:
      'Ters Dört Tılsım, aşırı tutuculuk ve riskten kaçma performansını sınırlayabilir.',
    keywords: ['istikrar', 'disiplin', 'tasarruf', 'kontrol', 'güven'],
    context: 'Çaban, istikrarla birleştiğinde sürdürülebilir başarı üretir.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pos4',
    card: 'Five of Pentacles',
    position: 4,
    upright:
      'Beş Tılsım, zorluklara rağmen çalışmaya devam ettiğini gösterir; dayanıklısın.',
    reversed:
      'Ters Beş Tılsım, yardım istememek çabanın verimini düşürebilir; destek al.',
    keywords: ['dayanıklılık', 'yardım', 'azim', 'iyileşme', 'sabır'],
    context: 'Çaban, destekle birleştiğinde zorluk eşiğini aşar.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pos4',
    card: 'Six of Pentacles',
    position: 4,
    upright:
      'Altı Tılsım, adil paylaşım ve karşılıklı destekle performansını güçlendirdiğini gösterir.',
    reversed:
      'Ters Altı Tılsım, dengesiz alışveriş ve görünmeyen emek motivasyonunu zayıflatabilir.',
    keywords: ['paylaşım', 'adalet', 'destek', 'denge', 'takdir'],
    context: 'Çaban, adil takdir ve destek gördüğünde en iyi haline ulaşır.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pos4',
    card: 'Seven of Pentacles',
    position: 4,
    upright:
      'Yedi Tılsım, sabırla yatırım yaptığını ve süreç odaklı çalıştığını gösterir. Elinden geleni yapıyorsun.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık ya da yanlış ölçüm, çabanın değerini gölgeleyebilir.',
    keywords: ['sabır', 'ölçme', 'değerlendirme', 'verim', 'uzun vade'],
    context: 'Çaban, düzenli ölçüm ve iyileştirmeyle meyve verir.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pos4',
    card: 'Eight of Pentacles',
    position: 4,
    upright:
      'Sekiz Tılsım, ustalık için disiplinli pratik yaptığını ve detaylara özen gösterdiğini gösterir.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik veya yarım bırakma alışkanlığı performansı düşürür.',
    keywords: ['ustalık', 'pratik', 'detay', 'özen', 'süreklilik'],
    context: 'Çaban, sürekli iyileştirme ve ustalıkla parlıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pos4',
    card: 'Nine of Pentacles',
    position: 4,
    upright:
      'Dokuz Tılsım, öz yeterlilik ve kalite standardınla güçlü bir performans sergilediğini gösterir.',
    reversed:
      'Ters Dokuz Tılsım, bağımsız çalışırken izolasyon riski; ağ kurmak çabanı büyütür.',
    keywords: ['öz yeterlilik', 'kalite', 'öz disiplin', 'zarafet', 'öz güven'],
    context: 'Çaban, bağımsızlık ve yüksek standart birleşince görünür olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pos4',
    card: 'Ten of Pentacles',
    position: 4,
    upright:
      'On Tılsım, sürdürülebilir değer ve kalıcı sonuçlar ürettiğini gösterir. Emeğin kurumsal etki yaratıyor.',
    reversed:
      'Ters On Tılsım, kısa vadeye sıkışmak uzun vadeli performansı zayıflatabilir.',
    keywords: ['kalıcılık', 'sistem', 'miras', 'uzun vade', 'değer'],
    context: 'Çaban, sistem ve süreç kurduğunda kalıcı etkiye dönüşür.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pos4',
    card: 'Page of Pentacles',
    position: 4,
    upright:
      'Tılsım Prensi, öğrenmeye açık, planlı ve meraklı çalıştığını gösterir; temel performansın sağlam.',
    reversed:
      'Ters Tılsım Prensi, dağınık odak ya da erteleme çabanı zayıflatır.',
    keywords: ['öğrenme', 'plan', 'merak', 'temel beceri', 'odak'],
    context: 'Çaban, öğrenme planıyla birleştiğinde hızla büyür.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pos4',
    card: 'Knight of Pentacles',
    position: 4,
    upright:
      'Tılsım Şövalyesi, istikrarlı, sabırlı ve metodik çalıştığını gösterir. Elinden gelenin en iyisini yapıyorsun.',
    reversed:
      'Ters Tılsım Şövalyesi, aşırı rutin veya esneksizlik verimi düşürebilir.',
    keywords: ['istikrar', 'metod', 'sabır', 'süreç', 'güvenilirlik'],
    context: 'Çaban, düzenli ritim ve süreçlerle zirve yapar.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pos4',
    card: 'Queen of Pentacles',
    position: 4,
    upright:
      'Tılsım Kraliçesi, üretken, pratik ve besleyici bir iş tarzın olduğunu gösterir. Kaynakları iyi yönetiyorsun.',
    reversed:
      'Ters Tılsım Kraliçesi, öz bakımı ihmal etmek performans kaliteni düşürebilir.',
    keywords: ['üretkenlik', 'pratiklik', 'kaynak yönetimi', 'şefkat', 'denge'],
    context:
      'Çaban, pratik çözümler ve öz bakım dengesiyle en iyi haline ulaşır.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pos4',
    card: 'King of Pentacles',
    position: 4,
    upright:
      'Tılsım Kralı, stratejik, güvenilir ve sonuç odaklı bir performans sergilediğini gösterir. Elinden gelenin en iyisini yapıyorsun.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol ya da sadece sonuca odaklanmak ekip performansını zayıflatabilir.',
    keywords: ['strateji', 'sonuç', 'liderlik', 'güven', 'verimlilik'],
    context: 'Çaban, stratejik akıl ve güven inşasıyla katlanarak değerlenir.',
    group: 'Tılsımlar',
  },
];

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nPosition4Meanings = (): I18nCareerPositionMeaning[] => {
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
*/

// Belirli bir kart için i18n destekli anlam al (hook kullanmadan)
export const getI18nPosition4Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nCareerPositionMeaning | null => {
  const originalMeaning = position4Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`career.meanings.${cardKey}.position4.upright`);
  const i18nReversed = t(`career.meanings.${cardKey}.position4.reversed`);
  const i18nKeywords = t(`career.meanings.${cardKey}.position4.keywords`);
  const i18nContext = t(`career.meanings.${cardKey}.position4.context`);
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
