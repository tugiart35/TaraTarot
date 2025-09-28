// Bu dosya, Aşk açılımında Pozisyon 1 (İlgi Duyduğun Kişi) için özel kart anlamlarını içerir.
// Her kartın bu pozisyonda ne anlama geldiği tanımlanmıştır.
// i18n desteği için güncellenmiştir.

// import { useLoveTranslations } from './i18n-helper';

export interface CareerPosition1Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar';
}

// i18n destekli LovePosition1Meaning interface'i
export interface I18nCareerPosition1Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position1Meanings: CareerPosition1Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_pos1',
    card: 'The Fool',
    position: 1,
    upright:
      'Joker, kariyer yolunda yeni bir başlangıcın eşiğinde olduğunu söyler. Kalbini heyecanlandıran alanlara cesurca adım atabilirsin. Mevcut yol seni tatmin etmiyorsa, özgürlüğünü besleyecek yeni bir yöne yönelme zamanı olabilir.',
    reversed:
      'Ters Joker, plansız adımların hayal kırıklığı getirebileceğini gösterir. Belki de mevcut kariyerin sana uygun değil ama sırf değişiklik olsun diye aceleyle yeni bir yol seçmek risklidir.',
    keywords: ['yeni başlangıç', 'cesaret', 'özgürlük', 'risk', 'macera'],
    context:
      'Kariyer yolunda kalbinin istediği özgür alanı bulma isteğin ön planda.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_pos1',
    card: 'The Magician',
    position: 1,
    upright:
      'Büyücü, potansiyelini ortaya koyabileceğin bir döneme işaret eder. Kariyerinde yaratıcılığın, iletişim gücün ve iraden seni başarıya taşıyabilir. Mevcut yol bu enerjiyi destekliyorsa doğru yoldasın.',
    reversed:
      'Ters Büyücü, yeteneklerini yanlış yönde kullandığını ya da potansiyelini kısıtlayan bir işte olduğunu gösterebilir. Bu durumda mevcut kariyer seni tüketiyor olabilir.',
    keywords: ['yaratıcılık', 'potansiyel', 'iletişim', 'vizyon', 'güç'],
    context:
      'Kendi gücünü doğru yerde kullanıp kullanmadığını sorgulaman gerekiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_pos1',
    card: 'The High Priestess',
    position: 1,
    upright:
      'Başrahibe, sezgilerini dinlemen gerektiğini söyler. Mevcut kariyerin zihnini doyuruyor olabilir ama kalbin başka bir şey fısıldıyorsa, cevap iç dünyanda saklıdır.',
    reversed:
      'Ters Başrahibe, sezgilerini bastırdığını ve sadece dışsal beklentilerle hareket ettiğini gösterir. Bu yol belki güvenli ama seni tatmin etmiyor olabilir.',
    keywords: ['sezgi', 'bilgelik', 'içsel rehberlik', 'sır', 'sessizlik'],
    context: 'Gerçek kariyer cevabını kalbinin fısıldadığı yerde bulacaksın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_pos1',
    card: 'The Empress',
    position: 1,
    upright:
      'İmparatoriçe, yaratıcılık ve bolluğun sembolüdür. Eğer kariyerin sana üretkenlik, tatmin ve değerlerini ortaya koyma fırsatı veriyorsa doğru yoldasın.',
    reversed:
      'Ters İmparatoriçe, mevcut işinin yaratıcılığını körelttiğini ya da sana değer vermediğini gösterebilir. Belki de başkalarının beklentilerini karşılamak için bu yolu seçtin.',
    keywords: ['yaratıcılık', 'bolluk', 'üretkenlik', 'tatmin', 'dişil enerji'],
    context:
      'Kariyerinde yaratıcı ve üretken yanını yaşayıp yaşamadığını sorgula.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_pos1',
    card: 'The Emperor',
    position: 1,
    upright:
      'İmparator, düzen, otorite ve sağlamlık anlamına gelir. Mevcut kariyerin sana istikrar, güven ve netlik sunuyorsa bu yol doğru olabilir.',
    reversed:
      'Ters İmparator, baskı ve katı kurallar içinde sıkışmış olabileceğini söyler. Belki de özgürlüğünü kaybettiğin bir yerde çalışıyorsun.',
    keywords: ['otorite', 'istikrar', 'kurallar', 'düzen', 'güç'],
    context: 'Güven ile özgürlük arasında denge kurman gerekiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_pos1',
    card: 'The Hierophant',
    position: 1,
    upright:
      'Aziz, geleneksel yolları ve güvenli alanları temsil eder. Eğer mevcut kariyerin sana düzen ve toplumsal kabul sağlıyorsa doğru yerde olabilirsin.',
    reversed:
      'Ters Aziz, başkalarının kurallarıyla yaşadığını ve ruhunun özgünlüğünü kaybettiğini gösterir. Belki de bu kariyer senin öz değerlerine uygun değil.',
    keywords: ['gelenek', 'öğreti', 'otorite', 'uyum', 'rehberlik'],
    context:
      'Toplumsal onay için mi, yoksa kendi kalbin için mi bu yolu seçtin?',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_pos1',
    card: 'The Lovers',
    position: 1,
    upright:
      'Aşıklar, seçimler ve uyum anlamına gelir. Mevcut kariyerin kalbin ve aklınla uyumluysa doğru seçimdir.',
    reversed:
      'Ters Aşıklar, yaptığın seçimin seni içsel bir çatışmaya sürüklediğini söyler. Belki de başkasının yönlendirmesiyle bu yolu seçtin.',
    keywords: ['seçim', 'uyum', 'kalp-akıl dengesi', 'ortaklık', 'karar'],
    context:
      'Bu kariyer seçiminde kendi kalbinin sesini dinleyip dinlemediğini sorgula.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_pos1',
    card: 'The Chariot',
    position: 1,
    upright:
      'Savaş Arabası, irade ve kararlılığı simgeler. Mevcut kariyerinde güçlü bir şekilde ilerlemek için gereken motivasyona sahipsin.',
    reversed:
      'Ters Savaş Arabası, kontrolü kaybettiğini ya da yönünü bulmakta zorlandığını gösterir. Belki de bu yol seni ileri taşımıyor.',
    keywords: ['irade', 'kararlılık', 'ilerleme', 'güç', 'odak'],
    context: 'Kariyerinde ilerlemek için yönünü netleştirmen gerekiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_pos1',
    card: 'Strength',
    position: 1,
    upright:
      'Güç, içsel cesaretini ve sabrını temsil eder. Bu kariyer sana kendi gücünü dengeli bir şekilde gösterme fırsatı veriyorsa doğru yerde olabilirsin.',
    reversed:
      'Ters Güç, özgüven eksikliği ya da baskı altında hissettiğini söyler. Belki de bu kariyer seni yıpratıyor.',
    keywords: ['cesaret', 'özgüven', 'sabır', 'denge', 'dayanıklılık'],
    context:
      'Kariyerinde gücünü dengeli bir şekilde ortaya koyup koymadığını sorgula.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_pos1',
    card: 'The Hermit',
    position: 1,
    upright:
      'Ermiş, içsel arayış ve yalnızlıkla gelen bilgeliği simgeler. Belki de şu anki kariyerin sana içsel tatmin sunmuyor ve kendi yolunu bulman gerekiyor.',
    reversed:
      'Ters Ermiş, fazlasıyla içine kapanıp dış dünyadan uzaklaştığını gösterir. Belki de bu iş seni yalnızlaştırıyor.',
    keywords: ['bilgelik', 'içe dönüş', 'rehberlik', 'arayış', 'aydınlanma'],
    context: 'Kariyer yolunda asıl aradığını bulmak için içsel rehberine dön.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_pos1',
    card: 'The Wheel of Fortune',
    position: 1,
    upright:
      'Kader Çarkı, değişim ve fırsatları temsil eder. Şu anki kariyer yolun sürpriz gelişmelerle şekillenebilir.',
    reversed:
      'Ters Kader Çarkı, kontrol edemediğin döngülere sıkıştığını gösterir. Belki de bu iş seni sürekli aynı yere getiriyor.',
    keywords: ['değişim', 'kader', 'şans', 'fırsat', 'döngü'],
    context: 'Kariyerin seni hangi döngüye sürüklüyor, farkında ol.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_pos1',
    card: 'Justice',
    position: 1,
    upright:
      'Adalet, dürüstlük ve dengeyi temsil eder. Mevcut kariyerin değerlerinle uyumlu ve adil hissettiriyorsa doğru seçimdir.',
    reversed:
      'Ters Adalet, haksızlık ya da dengesizlik içinde olduğunu söyler. Belki de bu iş sana adil davranmıyor.',
    keywords: ['adalet', 'denge', 'doğruluk', 'etik', 'sorumluluk'],
    context: 'Bu kariyer sana gerçekten adil hissettiriyor mu?',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_pos1',
    card: 'The Hanged Man',
    position: 1,
    upright:
      'Asılan Adam, farklı bakış açılarıyla yeni bir anlayış kazandırır. Belki de mevcut kariyerine başka bir gözle bakman gerekiyor.',
    reversed:
      'Ters Asılan Adam, gereksiz fedakarlıklar yaptığını ve zaman kaybettiğini söyler. Bu iş seni duraklatıyor olabilir.',
    keywords: [
      'fedakarlık',
      'bekleyiş',
      'farklı bakış',
      'dönüşüm',
      'teslimiyet',
    ],
    context: 'Mevcut kariyerin seni ileri taşıyor mu, yoksa bekletiyor mu?',
    group: 'Majör Arkana',
  },
  {
    id: 'death_pos1',
    card: 'Death',
    position: 1,
    upright:
      'Ölüm, bir sonun ardından gelen yeni başlangıçları simgeler. Belki de mevcut kariyerin sona ermeli ki gerçek yolun açılsın.',
    reversed:
      'Ters Ölüm, bitmesi gereken bir sürece tutunduğunu gösterir. Bu iş seni dönüştürmek yerine geride tutuyor.',
    keywords: ['dönüşüm', 'son', 'yeniden doğuş', 'bırakma', 'değişim'],
    context: 'Bitmesi gereken bir şeyi tutmak seni ilerlemekten alıkoyuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_pos1',
    card: 'Temperance',
    position: 1,
    upright:
      'Denge, uyum ve sabrı temsil eder. Eğer mevcut kariyerin sana huzur ve uyum veriyorsa doğru yoldasın.',
    reversed:
      'Ters Denge, aşırılıklar ve huzursuzluk içinde olduğunu gösterir. Belki de bu iş ruhsal dengenle çatışıyor.',
    keywords: ['denge', 'uyum', 'sabır', 'orta yol', 'huzur'],
    context: 'Kariyerinde dengeyi bulman gerekiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_pos1',
    card: 'The Devil',
    position: 1,
    upright:
      'Şeytan, bağımlılık ve kısıtlanmışlık anlamına gelir. Mevcut kariyerin sana bağımlı hissettiriyor olabilir.',
    reversed:
      'Ters Şeytan, özgürleşme isteğini gösterir. Zincirlerini kırmak üzeresin.',
    keywords: ['bağımlılık', 'kontrol', 'kısıtlama', 'tutku', 'özgürleşme'],
    context: 'Bu kariyer seni özgürleştiriyor mu, yoksa zincirliyor mu?',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_pos1',
    card: 'The Tower',
    position: 1,
    upright:
      'Kule, ani değişim ve yıkımı simgeler. Mevcut kariyerin sarsıcı şekilde değişebilir.',
    reversed:
      'Ters Kule, yıkımı ertelediğini ya da krizleri görmezden geldiğini gösterir.',
    keywords: ['yıkım', 'değişim', 'kriz', 'özgürleşme', 'yenilenme'],
    context: 'Eski yapılar yıkılmadan yeni bir yol açılamaz.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_pos1',
    card: 'The Star',
    position: 1,
    upright:
      'Yıldız, umut, ilham ve yenilenme anlamına gelir. Kariyerinde parlama potansiyeline sahipsin.',
    reversed:
      'Ters Yıldız, umudunu kaybettiğini ya da ilhamını yitirdiğini gösterir.',
    keywords: ['umut', 'ilham', 'yenilenme', 'vizyon', 'parlaklık'],
    context: 'Kariyer yolunda ışığını takip et.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_pos1',
    card: 'The Moon',
    position: 1,
    upright:
      'Ay, belirsizlik ve hayallerin kartıdır. Mevcut kariyerin sana netlik sunmuyor olabilir.',
    reversed:
      'Ters Ay, yanılsamalardan uyanışa işaret eder. Gerçeği görmeye başlıyorsun.',
    keywords: ['belirsizlik', 'sezgi', 'yanılsama', 'hayal', 'gizem'],
    context: 'Gerçek ile yanılsama arasındaki farkı görmelisin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_pos1',
    card: 'The Sun',
    position: 1,
    upright:
      'Güneş, başarı, mutluluk ve açıklığı simgeler. Eğer kariyerin sana keyif ve başarı veriyorsa doğru yoldasın.',
    reversed:
      'Ters Güneş, tatminsizlik ya da motivasyon eksikliği hissettirebilir. Belki de gerçek potansiyelini ortaya koyamıyorsun.',
    keywords: ['başarı', 'mutluluk', 'parlaklık', 'açıklık', 'umut'],
    context: 'Kariyerin sana ışık ve sevinç veriyor mu?',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_pos1',
    card: 'Judgement',
    position: 1,
    upright:
      'Mahkeme, farkındalık ve yeniden doğuş anlamına gelir. Mevcut kariyerin sana yeni bir yön sunabilir.',
    reversed:
      'Ters Mahkeme, geçmişten kopmakta zorlandığını gösterir. Belki de eski kararlarının esiri olmuşsun.',
    keywords: ['yeniden doğuş', 'farkındalık', 'karar', 'uyanış', 'özgürleşme'],
    context: 'Gerçek kariyer cevabın içsel bir uyanışla ortaya çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_pos1',
    card: 'The World',
    position: 1,
    upright:
      'Dünya, tamamlama ve bütünlüğün kartıdır. Kariyerinde ulaştığın yer sana tatmin ve bütünlük sunuyorsa doğru yoldasın.',
    reversed:
      'Ters Dünya, döngünün tamamlanmadığını ya da eksik bir şeyler hissettiğini gösterir.',
    keywords: ['tamamlanma', 'başarı', 'bütünlük', 'tatmin', 'döngü'],
    context: 'Gerçek kariyerin, sana tamamlanmışlık hissi veren yoldur.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'six_of_cups_pos1',
    card: 'Six of Cups',
    position: 1,
    upright:
      'Altı Kupa, geçmişten gelen mutlulukları, nostaljiyi ve saf sevinci simgeler. Kariyerinde çocukluk hayallerine ya da sana gerçekten keyif veren bir yöne dönme arzusu olabilir.',
    reversed:
      'Ters Altı Kupa, geçmişe fazlasıyla takılı kaldığını ya da eski alışkanlıkların seni geri tuttuğunu gösterir. Bu yol seni ileri taşımıyor olabilir.',
    keywords: [
      'nostalji',
      'geçmiş',
      'mutluluk',
      'çocukluk hayali',
      'saf sevinç',
    ],
    context:
      'Gerçek kariyerin, sana çocukluk hayallerini hatırlatan ve ruhunu neşeyle dolduran yerdedir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_pos1',
    card: 'Seven of Cups',
    position: 1,
    upright:
      'Yedi Kupa, hayaller, seçenekler ve kafa karışıklığını simgeler. Kariyerinde birçok yol önüne çıkıyor olabilir ama hepsi gerçekçi değil. Doğru seçimi yapmak için dikkatli olmalısın.',
    reversed:
      'Ters Yedi Kupa, hayallerden sıyrılıp net karar verme zamanının geldiğini gösterir. Gerçek olanla olmayanı ayırmaya başlıyorsun.',
    keywords: [
      'hayaller',
      'seçenekler',
      'kafa karışıklığı',
      'fırsatlar',
      'illüzyon',
    ],
    context:
      'Gerçek kariyerin, çoklu seçenekler arasında kalbine en uygun olanı seçtiğinde açığa çıkacak.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_pos1',
    card: 'Eight of Cups',
    position: 1,
    upright:
      'Sekiz Kupa, tatmin etmeyen bir yolu geride bırakma cesaretini simgeler. Kariyerinde sana artık mutluluk vermeyen bir alandan uzaklaşmaya hazırsın.',
    reversed:
      'Ters Sekiz Kupa, gitmen gereken yerde kaldığını ya da terk etmekten korktuğunu gösterir. Bu, seni daha da yıpratabilir.',
    keywords: ['bırakma', 'vedalaşma', 'yolculuk', 'tatminsizlik', 'cesaret'],
    context:
      'Gerçek kariyerin, seni artık beslemeyen yolu bırakıp yeni bir yola çıktığında görünecek.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_pos1',
    card: 'Nine of Cups',
    position: 1,
    upright:
      'Dokuz Kupa, tatmin, mutluluk ve bolluğun kartıdır. Mevcut kariyerin sana gerçekten keyif ve doyum sağlıyorsa doğru yoldasın.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatmin ya da gerçek olmayan bir başarı hissini gösterebilir. Belki de içten içe boş hissediyorsun.',
    keywords: ['tatmin', 'mutluluk', 'başarı', 'bolluk', 'keyif'],
    context: 'Gerçek kariyerin, sana içsel mutluluk ve tatmin veren yoldur.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'On Kupa, duygusal tatminin, huzurun ve bütünlüğün kartıdır. Kariyerin yaşamındaki diğer alanlarla uyum içindeyse doğru yoldasın.',
    reversed:
      'Ters On Kupa, iş-özel hayat dengesinin bozulduğunu ya da uyum eksikliği yaşadığını gösterir.',
    keywords: ['mutluluk', 'uyum', 'aile', 'denge', 'huzur'],
    context: 'Gerçek kariyerin, yaşamının tüm alanlarıyla uyumlu olan yoldur.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_pos1',
    card: 'Page of Cups',
    position: 1,
    upright:
      'Kupa Prensi, yeni fikirler, yaratıcılık ve sezgisel açılımlar getirir. Kariyerinde yaratıcı bir başlangıç veya sürpriz bir fırsat belirebilir.',
    reversed:
      'Ters Kupa Prensi, olgunlaşmamış duygular ya da hayalperest beklentilerle hareket ettiğini gösterir. Bu, seni gerçekçi olmayan bir yola sürükleyebilir.',
    keywords: ['yaratıcılık', 'ilham', 'sezgi', 'yeni fırsatlar', 'hayal gücü'],
    context:
      'Gerçek kariyerin, sezgilerini ve hayal gücünü özgürce ortaya koyabileceğin yerdedir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_pos1',
    card: 'Knight of Cups',
    position: 1,
    upright:
      'Kupa Şövalyesi, ideallerini takip etmeyi ve kalbinin sesini dinlemeyi simgeler. Kariyerinde duygusal olarak tatmin olacağın bir yol seni bekliyor olabilir.',
    reversed:
      'Ters Kupa Şövalyesi, hayalperestlik, kaçış ya da gerçekçi olmayan hedeflere kapıldığını gösterir.',
    keywords: ['idealler', 'duygu', 'yaratıcılık', 'arayış', 'hayal'],
    context: 'Gerçek kariyerin, kalbinin peşinden gittiğinde seni bulacak.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_pos1',
    card: 'Queen of Cups',
    position: 1,
    upright:
      'Kupa Kraliçesi, empati, sezgi ve duygusal derinliği simgeler. Kariyerinde başkalarına fayda sağladığın, ilham verdiğin bir yolda doğru yerdesin.',
    reversed:
      'Ters Kupa Kraliçesi, aşırı duygusallık ya da kendi ihtiyaçlarını ihmal ettiğini gösterebilir.',
    keywords: ['empati', 'sezgi', 'duygu', 'şefkat', 'ilham'],
    context:
      'Gerçek kariyerin, empati ve duygusal zekanı ortaya koyduğun yolda açığa çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_pos1',
    card: 'King of Cups',
    position: 1,
    upright:
      'Kupa Kralı, olgunluk, bilgelik ve duygusal dengeyi simgeler. Kariyerinde duygularını dengeli bir şekilde yönetebiliyorsan doğru yoldasın.',
    reversed:
      'Ters Kupa Kralı, duygusal manipülasyon ya da içsel dengesizlik gösterebilir. Belki de iş seni duygusal olarak tüketiyor.',
    keywords: ['denge', 'bilgelik', 'duygu', 'olgunluk', 'liderlik'],
    context:
      'Gerçek kariyerin, duygularını olgunlukla yönettiğin ve başkalarına ilham verdiğin yoldur.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_pos1',
    card: 'Ace of Swords',
    position: 1,
    upright:
      'Kılıç Ası, zihinsel açıklık ve yeni fikirlerin kartıdır. Kariyerinde sana netlik getirecek bir fırsat ya da ilham belirebilir.',
    reversed:
      'Ters Kılıç Ası, kafa karışıklığı ya da iletişim sorunlarını gösterir. Belki de şu anki yol sana netlik sunmuyor.',
    keywords: ['zihin açıklığı', 'fikir', 'gerçek', 'karar', 'başlangıç'],
    context:
      'Gerçek kariyerin, zihninde netlik ve yeni bir vizyon uyandırandır.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_pos1',
    card: 'Two of Swords',
    position: 1,
    upright:
      'İki Kılıç, karar verme zorluğunu simgeler. Kariyerinde iki yol arasında kalmış olabilirsin.',
    reversed:
      'Ters İki Kılıç, kararı ertelemenin seni zorladığını ve artık seçim yapma zamanının geldiğini gösterir.',
    keywords: ['karar', 'ikilem', 'denge', 'seçim', 'ikircik'],
    context:
      'Gerçek kariyerin, kararsızlık perdesini araladığında ortaya çıkacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_pos1',
    card: 'Three of Swords',
    position: 1,
    upright:
      'Üç Kılıç, hayal kırıklığı ve kalp kırıklığını simgeler. Kariyerinde seni üzen ya da beklentini karşılamayan durumlar olabilir.',
    reversed:
      'Ters Üç Kılıç, iyileşme ve geçmiş hayal kırıklıklarını geride bırakma sürecini gösterir.',
    keywords: ['üzüntü', 'hayal kırıklığı', 'kayıp', 'ihanet', 'gerçek'],
    context:
      'Gerçek kariyerin, seni üzen deneyimlerden öğrenip iyileştiğinde ortaya çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_pos1',
    card: 'Four of Swords',
    position: 1,
    upright:
      'Dört Kılıç, dinlenme ve toparlanma ihtiyacını simgeler. Belki de kariyerinde mola verip yönünü yeniden değerlendirmelisin.',
    reversed:
      'Ters Dört Kılıç, aşırı yorgunluk ya da toparlanmayı ihmal ettiğini gösterir.',
    keywords: ['dinlenme', 'iyileşme', 'toparlanma', 'içe dönüş', 'yenilenme'],
    context:
      'Gerçek kariyerin, zihinsel ve fiziksel yenilenmene izin veren yoldur.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_pos1',
    card: 'Five of Swords',
    position: 1,
    upright:
      'Beş Kılıç, çatışma ve kazanırken kaybetmeyi simgeler. Kariyerinde gereksiz mücadeleler seni yoruyor olabilir.',
    reversed:
      'Ters Beş Kılıç, çatışmaları geride bırakma ve barışma zamanının geldiğini söyler.',
    keywords: ['çatışma', 'gerilim', 'yenilgi', 'ego', 'mücadele'],
    context:
      'Gerçek kariyerin, çatışmadan değil uyumdan güç aldığında ortaya çıkacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_pos1',
    card: 'Six of Swords',
    position: 1,
    upright:
      'Altı Kılıç, geçiş ve iyileşmeyi simgeler. Kariyerinde seni huzura götürecek bir geçiş süreci olabilir.',
    reversed:
      'Ters Altı Kılıç, geçmiş sorunlardan kopamadığını ya da ileriye gidemediğini gösterir.',
    keywords: ['geçiş', 'iyileşme', 'ilerleme', 'yolculuk', 'umut'],
    context:
      'Gerçek kariyerin, seni ileriye taşıyan bir geçiş süreciyle belirginleşecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_pos1',
    card: 'Seven of Swords',
    position: 1,
    upright:
      'Yedi Kılıç, strateji, dikkat ve bazen de gizliliği simgeler. Kariyerinde akıllıca plan yapman gerekiyor.',
    reversed:
      'Ters Yedi Kılıç, dürüstlükten sapmanın seni zor durumda bırakabileceğini gösterir.',
    keywords: ['strateji', 'plan', 'gizlilik', 'uyanıklık', 'hesap'],
    context:
      'Gerçek kariyerin, dürüst stratejiler ve akıllı adımlarla inşa edilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_pos1',
    card: 'Eight of Swords',
    position: 1,
    upright:
      'Sekiz Kılıç, kısıtlanmışlık ve çıkmaz hissini simgeler. Kariyerinde sıkışmış hissediyor olabilirsin.',
    reversed:
      'Ters Sekiz Kılıç, bu kısıtlamalardan özgürleşmeye başladığını gösterir.',
    keywords: ['kısıtlama', 'sıkışmışlık', 'korku', 'çıkmaz', 'özgürleşme'],
    context:
      'Gerçek kariyerin, kendi zihinsel engellerinden kurtulduğunda açığa çıkacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_pos1',
    card: 'Nine of Swords',
    position: 1,
    upright:
      'Dokuz Kılıç, kaygı, stres ve uykusuzluk kartıdır. Kariyerinde büyük bir zihinsel yük taşıyor olabilirsin.',
    reversed:
      'Ters Dokuz Kılıç, kaygıların hafiflemesi ya da içsel huzura yönelme sürecini gösterir.',
    keywords: ['kaygı', 'stres', 'endişe', 'zihinsel yük', 'karabasan'],
    context:
      'Gerçek kariyerin, seni uykusuz bırakacak yük değil, huzur getiren yoldur.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_pos1',
    card: 'Ten of Swords',
    position: 1,
    upright:
      'On Kılıç, acı bir sonu simgeler. Kariyerinde bir dönemin kapanışı olabilir ama bu yeni başlangıç için alan açıyor.',
    reversed:
      'Ters On Kılıç, toparlanma ve yeniden doğuş sürecine işaret eder.',
    keywords: ['son', 'kapanış', 'acı', 'bitiş', 'yenilenme'],
    context:
      'Gerçek kariyerin, bitmesi gerekenin ardından doğacak yeni başlangıçta gizlidir.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_pos1',
    card: 'Page of Swords',
    position: 1,
    upright:
      'Kılıç Prensi, merak, öğrenme isteği ve yeni fikirleri simgeler. Kariyerinde yeni bir bilgi ya da eğitim süreci başlayabilir.',
    reversed:
      'Ters Kılıç Prensi, dikkatsizlik ya da yüzeysel öğrenmeyi gösterir.',
    keywords: ['öğrenme', 'merak', 'fikir', 'iletişim', 'keşif'],
    context:
      'Gerçek kariyerin, öğrenmeye ve yeni fikirlere açık olduğunda gelişecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_pos1',
    card: 'Knight of Swords',
    position: 1,
    upright:
      'Kılıç Şövalyesi, hızlı hareket ve cesur kararları simgeler. Kariyerinde kararlılıkla ilerlemek istiyorsun.',
    reversed:
      'Ters Kılıç Şövalyesi, acelecilik ya da düşünmeden hareket etme riskini gösterir.',
    keywords: ['hız', 'kararlılık', 'cesaret', 'aksiyon', 'odak'],
    context:
      'Gerçek kariyerin, aceleyle değil bilinçli cesaretle ortaya çıkacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_pos1',
    card: 'Queen of Swords',
    position: 1,
    upright:
      'Kılıç Kraliçesi, zekâ, bağımsızlık ve objektifliği simgeler. Kariyerinde mantığınla doğru kararlar verebilirsin.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı soğukluk ya da duygulardan kopukluk gösterebilir.',
    keywords: ['zekâ', 'bağımsızlık', 'netlik', 'gerçek', 'mantık'],
    context:
      'Gerçek kariyerin, mantığını özgürce kullanabildiğin yerde belirginleşecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_pos1',
    card: 'King of Swords',
    position: 1,
    upright:
      'Kılıç Kralı, otorite, adalet ve zekânın birleşimini simgeler. Kariyerinde bilgelik ve stratejiyle ilerliyorsun.',
    reversed:
      'Ters Kılıç Kralı, otoriteyi kötüye kullanma ya da aşırı katı tutumları gösterebilir.',
    keywords: ['otorite', 'adalet', 'strateji', 'zeka', 'mantık'],
    context:
      'Gerçek kariyerin, bilgelik ve adaletle liderlik yaptığında açığa çıkar.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_pos1',
    card: 'Ace of Wands',
    position: 1,
    upright:
      'Asa Ası, ilham, yeni bir fırsat ve enerjik bir başlangıç anlamına gelir. Kariyerinde tutkunu ateşleyen, seni heyecanlandıran bir kapı açılabilir.',
    reversed:
      'Ters Asa Ası, gecikmiş fırsatlar ya da enerjinin blokajını gösterir. Belki de mevcut işinde yaratıcılığın bastırılıyor.',
    keywords: ['ilham', 'başlangıç', 'yaratıcılık', 'enerji', 'tutku'],
    context:
      'Gerçek kariyerin, seni ateşleyen ve enerjini ortaya çıkaran yeni bir başlangıçta yatıyor.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_pos1',
    card: 'Two of Wands',
    position: 1,
    upright:
      'İki Asa, planlama ve vizyon anlamına gelir. Kariyerinde geleceğe yönelik sağlam adımlar atma potansiyeline sahipsin.',
    reversed:
      'Ters İki Asa, korkular ya da kararsızlık yüzünden potansiyelini kullanamadığını gösterebilir.',
    keywords: ['planlama', 'vizyon', 'karar', 'ilerleme', 'fırsat'],
    context:
      'Gerçek kariyerin, ufkunu genişlettiğin ve cesurca plan yaptığın yerde açığa çıkar.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_pos1',
    card: 'Three of Wands',
    position: 1,
    upright:
      'Üç Asa, ilerleme, genişleme ve ufukların açılmasını simgeler. Kariyerinde fırsatlar kapında olabilir.',
    reversed:
      'Ters Üç Asa, sabırsızlık ya da yanlış yönlendirmeler yüzünden ilerleyemediğini gösterir.',
    keywords: ['ilerleme', 'fırsat', 'vizyon', 'genişleme', 'hazırlık'],
    context:
      'Gerçek kariyerin, geleceğe umutla baktığında ve cesurca adım attığında ortaya çıkar.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_pos1',
    card: 'Four of Wands',
    position: 1,
    upright:
      'Dört Asa, kutlama, başarı ve topluluk desteğini simgeler. Kariyerinde sağlam temellere oturduğun bir döneme işaret eder.',
    reversed:
      'Ters Dört Asa, destek eksikliği ya da uyumsuz bir ortamda olduğunu gösterebilir.',
    keywords: ['kutlama', 'başarı', 'dayanışma', 'temel', 'istikrar'],
    context:
      'Gerçek kariyerin, başarılarını paylaşabileceğin bir toplulukta açığa çıkar.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_pos1',
    card: 'Five of Wands',
    position: 1,
    upright:
      'Beş Asa, rekabet ve çatışmayı simgeler. Kariyerinde kendini kanıtlamak için mücadele veriyor olabilirsin.',
    reversed:
      'Ters Beş Asa, gereksiz tartışmalardan uzaklaşman gerektiğini söyler. Bu yol seni tüketiyor olabilir.',
    keywords: ['rekabet', 'mücadele', 'çatışma', 'savunma', 'hırs'],
    context:
      'Gerçek kariyerin, rekabetten beslenmek yerine uyumla büyüdüğünde ortaya çıkar.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_pos1',
    card: 'Six of Wands',
    position: 1,
    upright:
      'Altı Asa, zafer ve tanınmayı simgeler. Kariyerinde başarılarının takdir edildiğini gösterir.',
    reversed:
      'Ters Altı Asa, beklediğin takdiri görememek ya da başarının ertelenmesi anlamına gelir.',
    keywords: ['zafer', 'tanınma', 'başarı', 'takdir', 'gurur'],
    context: 'Gerçek kariyerin, emeğinin takdir edildiği ve parladığın yoldur.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_pos1',
    card: 'Seven of Wands',
    position: 1,
    upright:
      'Yedi Asa, kendini savunma ve güçlü duruşu simgeler. Kariyerinde pozisyonunu korumak için mücadele ediyorsun.',
    reversed:
      'Ters Yedi Asa, savunmasız hissettiğini ya da mücadele etmekten yorulduğunu gösterir.',
    keywords: ['savunma', 'mücadele', 'cesaret', 'direnç', 'kararlılık'],
    context:
      'Gerçek kariyerin, kendi değerlerini cesaretle savunduğunda güçlenecek.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_pos1',
    card: 'Eight of Wands',
    position: 1,
    upright:
      'Sekiz Asa, hızlı gelişmeler ve ilerlemeyi simgeler. Kariyerinde ani fırsatlar ve ivme seni bekliyor olabilir.',
    reversed:
      'Ters Sekiz Asa, gecikmeler ve iletişim sorunlarını işaret eder. Beklediğin ilerleme yavaş gelebilir.',
    keywords: ['hız', 'ilerleme', 'haber', 'fırsat', 'ivme'],
    context:
      'Gerçek kariyerin, hızlı gelişmelerle önüne açılan fırsatlarda belirginleşecek.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_pos1',
    card: 'Nine of Wands',
    position: 1,
    upright:
      'Dokuz Asa, direnç ve kararlılığı simgeler. Kariyerinde zorluklara rağmen ayakta kalmayı başarıyorsun.',
    reversed:
      'Ters Dokuz Asa, tükenmişlik ve pes etme eğilimini gösterebilir. Fazla yüklenmiş olabilirsin.',
    keywords: ['dayanıklılık', 'kararlılık', 'direnç', 'savaş', 'korunma'],
    context:
      'Gerçek kariyerin, pes etmeden direndiğinde ve gücünü toparladığında ortaya çıkar.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_pos1',
    card: 'Ten of Wands',
    position: 1,
    upright:
      'On Asa, yük ve sorumlulukların arttığını gösterir. Kariyerinde ağır bir yükün altına girmiş olabilirsin.',
    reversed:
      'Ters On Asa, gereksiz sorumluluklardan kurtulman gerektiğini söyler. Taşıdığın yük seni tüketiyor.',
    keywords: ['sorumluluk', 'yük', 'zorlanma', 'çaba', 'dayanıklılık'],
    context:
      'Gerçek kariyerin, sana ağır yükler değil, paylaşılabilir sorumluluklar getirmelidir.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_pos1',
    card: 'Page of Wands',
    position: 1,
    upright:
      'Asa Prensi, merak, keşif ve ilhamı simgeler. Kariyerinde yeni bir fırsat ya da öğrenme süreci seni bekliyor.',
    reversed:
      'Ters Asa Prensi, hevesin çabuk sönmesi ya da dikkatsizlik yüzünden fırsatları kaçırmayı gösterebilir.',
    keywords: ['merak', 'ilham', 'keşif', 'öğrenme', 'başlangıç'],
    context:
      'Gerçek kariyerin, keşif ruhunu besleyen yeni başlangıçlarda yatıyor.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_pos1',
    card: 'Knight of Wands',
    position: 1,
    upright:
      'Asa Şövalyesi, tutku ve cesaretle hareket etmeyi simgeler. Kariyerinde yeni bir yol seni heyecanlandırıyor olabilir.',
    reversed:
      'Ters Asa Şövalyesi, acelecilik ya da yönsüz hareket etme riskini gösterir.',
    keywords: ['tutku', 'cesaret', 'macera', 'hareket', 'enerji'],
    context: 'Gerçek kariyerin, tutkunu heyecanla takip ettiğinde parlayacak.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_pos1',
    card: 'Queen of Wands',
    position: 1,
    upright:
      'Asa Kraliçesi, özgüven, karizma ve liderlik enerjisini simgeler. Kariyerinde kendini güçlü bir şekilde ortaya koyuyorsun.',
    reversed:
      'Ters Asa Kraliçesi, güvensizlik ya da kendini ifade etmekte zorlanmayı gösterebilir.',
    keywords: ['liderlik', 'özgüven', 'karizma', 'ilham', 'güç'],
    context:
      'Gerçek kariyerin, içsel gücünü ve liderliğini ortaya koyduğunda açığa çıkacak.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_pos1',
    card: 'King of Wands',
    position: 1,
    upright:
      'Asa Kralı, vizyoner liderliği ve cesur kararları simgeler. Kariyerinde güçlü bir liderlik enerjisi taşıyorsun.',
    reversed:
      'Ters Asa Kralı, baskıcı tutumlar ya da yönsüz bir liderliği gösterebilir.',
    keywords: ['vizyon', 'liderlik', 'cesaret', 'karar', 'güç'],
    context: 'Gerçek kariyerin, vizyonunu kararlılıkla ortaya koyduğun yoldur.',
    group: 'Asalar',
  },
  {
    id: 'ace_of_pentacles_pos1',
    card: 'Ace of Pentacles',
    position: 1,
    upright:
      'Tılsım Ası, bolluk, fırsat ve sağlam bir başlangıcın kartıdır. Kariyerinde yeni bir iş, kazanç ya da güven veren bir yol açılabilir.',
    reversed:
      'Ters Tılsım Ası, kaçırılan fırsatlar ya da maddi belirsizlikleri gösterir. Belki de mevcut yol sana istikrar sunmuyor.',
    keywords: ['fırsat', 'bolluk', 'başlangıç', 'maddi güven', 'potansiyel'],
    context:
      'Gerçek kariyerin, sana istikrar ve somut kazanç sağlayan yeni bir başlangıçta gizlidir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pos1',
    card: 'Two of Pentacles',
    position: 1,
    upright:
      'İki Tılsım, denge ve uyumu simgeler. Kariyerinde birden fazla sorumluluğu aynı anda yürütüyor olabilirsin.',
    reversed:
      'Ters İki Tılsım, aşırı yük ya da önceliklerini yönetememeyi gösterir.',
    keywords: ['denge', 'uyum', 'esneklik', 'çoklu görev', 'idare'],
    context:
      'Gerçek kariyerin, sorumluluklarını dengeli şekilde yönetebildiğin yerde açığa çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pos1',
    card: 'Three of Pentacles',
    position: 1,
    upright:
      'Üç Tılsım, işbirliği ve ustalık anlamına gelir. Kariyerinde takım çalışmasıyla değerli bir şey inşa ediyorsun.',
    reversed:
      'Ters Üç Tılsım, uyumsuzluk ya da çabalarının yeterince takdir edilmediğini gösterebilir.',
    keywords: ['işbirliği', 'ustalık', 'başarı', 'takım çalışması', 'öğrenme'],
    context:
      'Gerçek kariyerin, emeğinin değer gördüğü ve birlikte inşa ettiğin yerde parlayacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pos1',
    card: 'Four of Pentacles',
    position: 1,
    upright:
      'Dört Tılsım, güven ve sahiplenmeyi simgeler. Kariyerinde istikrar arıyor ve elde ettiklerini korumak istiyor olabilirsin.',
    reversed:
      'Ters Dört Tılsım, aşırı kontrol ya da kaybetme korkusuyla hareket ettiğini gösterebilir.',
    keywords: ['güven', 'koruma', 'maddi istikrar', 'kontrol', 'sahiplenme'],
    context:
      'Gerçek kariyerin, sana güven verirken aynı zamanda gelişim fırsatı da sunmalıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pos1',
    card: 'Five of Pentacles',
    position: 1,
    upright:
      'Beş Tılsım, zorluk ve yoksunluğu simgeler. Kariyerinde kaygı ya da geçici kayıplar yaşıyor olabilirsin.',
    reversed:
      'Ters Beş Tılsım, destek bulma ve yeniden toparlanma sürecini işaret eder.',
    keywords: ['zorluk', 'kayıp', 'yalnızlık', 'maddi sıkıntı', 'destek'],
    context:
      'Gerçek kariyerin, zorlukları dayanışma ile aşabileceğin yerde açığa çıkacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pos1',
    card: 'Six of Pentacles',
    position: 1,
    upright:
      'Altı Tılsım, cömertlik ve karşılıklı desteği simgeler. Kariyerinde yardımlaşma ve paylaşım öne çıkıyor.',
    reversed:
      'Ters Altı Tılsım, dengesiz ilişkiler ya da eşit olmayan paylaşımları gösterebilir.',
    keywords: ['cömertlik', 'paylaşım', 'yardım', 'denge', 'destek'],
    context:
      'Gerçek kariyerin, adil paylaşım ve karşılıklı destek üzerine kurulu olandır.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pos1',
    card: 'Seven of Pentacles',
    position: 1,
    upright:
      'Yedi Tılsım, sabır ve uzun vadeli çabanın kartıdır. Kariyerinde emeklerinin karşılığını zamanla alacaksın.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık ya da yanlış yatırımları gösterebilir.',
    keywords: ['sabır', 'emek', 'yatırım', 'bekleyiş', 'ilerleme'],
    context:
      'Gerçek kariyerin, sabırla inşa ettiğin ve zamanla meyvesini verecek yoldur.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pos1',
    card: 'Eight of Pentacles',
    position: 1,
    upright:
      'Sekiz Tılsım, ustalık ve işine adanmayı simgeler. Kariyerinde kendini geliştirmek ve uzmanlaşmak için çabalıyorsun.',
    reversed:
      'Ters Sekiz Tılsım, ilgisizlik ya da özensizlik yüzünden verimsizlik gösterebilir.',
    keywords: ['ustalık', 'öğrenme', 'emek', 'pratik', 'gelişim'],
    context:
      'Gerçek kariyerin, uzmanlığını adanarak geliştirdiğin yerde açığa çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pos1',
    card: 'Nine of Pentacles',
    position: 1,
    upright:
      'Dokuz Tılsım, bağımsızlık, özgüven ve maddi başarıyı simgeler. Kariyerinde kendi emeğinin karşılığını görüyorsun.',
    reversed:
      'Ters Dokuz Tılsım, bağımlılık ya da aşırı lüks arayışını gösterebilir.',
    keywords: ['bağımsızlık', 'özgüven', 'başarı', 'maddi güven', 'bolluk'],
    context:
      'Gerçek kariyerin, bağımsızlığını koruyarak başarıya ulaştığında belirginleşecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pos1',
    card: 'Ten of Pentacles',
    position: 1,
    upright:
      'On Tılsım, kalıcı başarı, aile ve miras değerlerini simgeler. Kariyerinde sağlam bir temel üzerine inşa edilmiş bir tatmin söz konusu.',
    reversed:
      'Ters On Tılsım, istikrarsızlık ya da güvensizlik ortamını gösterebilir.',
    keywords: ['kalıcılık', 'başarı', 'maddi güven', 'miras', 'istikrar'],
    context: 'Gerçek kariyerin, uzun vadeli güven ve tatmin sağlayan yoldur.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pos1',
    card: 'Page of Pentacles',
    position: 1,
    upright:
      'Tılsım Prensi, öğrenme, fırsat ve keşfi simgeler. Kariyerinde yeni bir beceri edinmek ya da eğitim almak sana kapı açabilir.',
    reversed:
      'Ters Tılsım Prensi, dikkatsizlik ya da motivasyon eksikliğini gösterebilir.',
    keywords: ['öğrenme', 'fırsat', 'keşif', 'çalışkanlık', 'potansiyel'],
    context:
      'Gerçek kariyerin, öğrendiklerini istikrarlı şekilde uyguladığında gelişecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pos1',
    card: 'Knight of Pentacles',
    position: 1,
    upright:
      'Tılsım Şövalyesi, disiplin, sabır ve kararlılığı simgeler. Kariyerinde istikrarlı ilerliyorsun.',
    reversed:
      'Ters Tılsım Şövalyesi, monotonluk ya da esnek olmamayı gösterebilir.',
    keywords: ['istikrar', 'sabır', 'disiplin', 'çaba', 'güven'],
    context:
      'Gerçek kariyerin, düzenli ve disiplinli ilerleyişinle başarıya ulaşacağın yoldur.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pos1',
    card: 'Queen of Pentacles',
    position: 1,
    upright:
      'Tılsım Kraliçesi, bereket, şefkat ve pratikliği simgeler. Kariyerinde hem üretken hem de destekleyici bir rol üstlenebilirsin.',
    reversed:
      'Ters Tılsım Kraliçesi, aşırı maddiyatçılığı ya da öz bakımı ihmal etmeyi gösterebilir.',
    keywords: ['bereket', 'şefkat', 'pratiklik', 'üretkenlik', 'destek'],
    context:
      'Gerçek kariyerin, hem üretkenliğini hem de şefkatini ortaya koyduğun yoldur.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pos1',
    card: 'King of Pentacles',
    position: 1,
    upright:
      'Tılsım Kralı, bolluk, güven ve liderliği simgeler. Kariyerinde istikrar ve başarıya ulaşmışsın.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol ya da maddi hırsların seni tükettiğini gösterebilir.',
    keywords: ['bolluk', 'liderlik', 'güven', 'maddi başarı', 'istikrar'],
    context:
      'Gerçek kariyerin, liderlik ve bolluk bilinciyle inşa ettiğin yoldur.',
    group: 'Tılsımlar',
  },
];

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nPosition1Meanings = (): I18nCareerPosition1Meaning[] => {
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
): I18nCareerPosition1Meaning | null => {
  const originalMeaning = position1Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`career.meanings.${cardKey}.position1.upright`);
  const i18nReversed = t(`career.meanings.${cardKey}.position1.reversed`);
  const i18nKeywords = t(`career.meanings.${cardKey}.position1.keywords`);
  const i18nContext = t(`career.meanings.${cardKey}.position1.context`);
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
