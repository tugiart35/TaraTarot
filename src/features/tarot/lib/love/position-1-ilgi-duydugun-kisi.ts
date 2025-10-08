// Bu dosya, Aşk açılımında Pozisyon 1 (İlgi Duyduğun Kişi) için özel kart anlamlarını içerir.
// Her kartın bu pozisyonda ne anlama geldiği tanımlanmıştır.
// i18n desteği için güncellenmiştir.
'use client';

// Bu dosya, Aşk açılımında Pozisyon 1 (İlgi Duyduğun Kişi) için özel kart anlamlarını içerir.

import { useLoveTranslations } from './i18n-helper';

export interface LovePosition1Meaning {
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
export interface I18nLovePosition1Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position1Meanings: LovePosition1Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_pos1',
    card: 'The Fool',
    position: 1,
    upright:
      'İlgi duyduğun kişi, hayata karşı çocuksu bir merak ve heyecanla dolu. Yeni başlangıçlara açık, maceracı bir ruha sahip ancak bu durum bazen plansız ve programsız olmasına neden olabilir. İlişkilere de bu özgür ruhla yaklaşır.',
    reversed:
      'Ters Fool, bu kişinin pervasız, sorumsuz veya bir ilişkiye başlamaktan korkan biri olabileceğini gösterir. Potansiyel tehlikeleri görmezden geliyor ve bağlanmaktan kaçınıyor olabilir.',
    keywords: [
      'yeni başlangıçlar',
      'masumiyet',
      'spontanlık',
      'risk almak',
      'özgür ruh',
    ],
    context:
      'Bu kişi, aşk hayatında yeni bir sayfa açmaya hazır veya bundan korkan bir maceracı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_pos1',
    card: 'The Magician',
    position: 1,
    upright:
      'İlgi duyduğun kişi, çekici, yetenekli ve istediğini elde etme gücüne sahip biri. İletişim becerileri yüksek ve olayları kendi lehine çevirmeyi biliyor. Size karşı bilinçli bir çekim yaratıyor olabilir.',
    reversed:
      'Ters Magician, bu kişinin manipülatif, aldatıcı veya potansiyelini kullanmayan biri olabileceğine işaret eder. Sözleri ile eylemleri tutarlı olmayabilir veya özgüven eksikliği çekiyor olabilir.',
    keywords: ['irade', 'yaratıcılık', 'beceri', 'çekicilik', 'manifesto'],
    context:
      'Bu kişi, hayatının ve ilişkilerinin yönetmen koltuğunda oturan bir yaratıcı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_pos1',
    card: 'The High Priestess',
    position: 1,
    upright:
      'Bu kişi gizemli, sezgisel ve duygularını hemen belli etmeyen bir yapıya sahip. İç dünyası zengin ve anlaşılması zaman alabilir. Size karşı hissettiklerini bir sır gibi saklıyor olabilir.',
    reversed:
      'Ters High Priestess, bu kişinin sır saklayan, sezgilerinden kopuk veya size karşı samimi olmayan biri olabileceğini gösterir. Kendi iç dünyasıyla veya sizinle bağlantı kurmakta zorlanıyor olabilir.',
    keywords: ['sezgi', 'gizem', 'bilinçaltı', 'saklı duygular', 'içgörü'],
    context:
      'Bu kişi, duygularını yüzeyde değil, derinlerde yaşayan gizemli bir ruh.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_pos1',
    card: 'The Empress',
    position: 1,
    upright:
      'İlgi duyduğun kişi, besleyici, şefkatli, sıcakkanlı ve hayatın keyiflerini seven biri. Çevresine güzellik ve bereket yayar. İlişkilerde güven veren, anaç veya babaç bir tavrı olabilir.',
    reversed:
      'Ters Empress, bu kişinin aşırı sahiplenici, tembel veya kendine bakmayan biri olabileceğini gösterir. Yaratıcılığı veya sevgiyi ifade etme konusunda blokajları olabilir.',
    keywords: ['bereket', 'annelik', 'doğallık', 'şefkat', 'güzellik'],
    context: 'Bu kişi, sevgi ve şefkatle besleyen, hayat dolu bir kalp.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_pos1',
    card: 'The Emperor',
    position: 1,
    upright:
      'Bu kişi, düzenli, disiplinli, koruyucu ve lider ruhlu bir yapıya sahip. Hayatında istikrar ve kontrol arar. İlişkilerde güvenilir bir omuz ve sağlam bir temel sunabilir.',
    reversed:
      'Ters Emperor, bu kişinin aşırı kontrolcü, katı, dominant veya otoriteyle sorunları olan biri olabileceğine işaret eder. Duygularını göstermekte zorlanabilir.',
    keywords: ['otorite', 'istikrar', 'liderlik', 'koruyuculuk', 'disiplin'],
    context:
      'Bu kişi, hayatını ve ilişkilerini sağlam temeller üzerine kurmak isteyen bir lider.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_pos1',
    card: 'The Hierophant',
    position: 1,
    upright:
      'İlgi duyduğun kişi, geleneklere bağlı, ahlaki değerleri yüksek ve toplumsal kurallara önem veren biridir. İlişkilerde ciddiyet, bağlılık ve geleneksel bir yol arayışında olabilir.',
    reversed:
      'Ters Hierophant, bu kişinin kurallara karşı çıkan, asi, dogmatik veya dar görüşlü biri olabileceğini gösterir. Toplumsal baskı hissediyor veya geleneksel yolları reddediyor olabilir.',
    keywords: [
      'gelenek',
      'inanç sistemleri',
      'kurallar',
      'bağlılık',
      'maneviyat',
    ],
    context:
      'Bu kişi, aşkı ve hayatı belirli bir inanç veya değerler sistemiyle yaşayan biri.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_pos1',
    card: 'The Lovers',
    position: 1,
    upright:
      'Bu kişi, ilişkiler ve ortaklıklar konusunda önemli bir dönemeçte. Kalbiyle hareket eden, sevgi dolu ve bir partnerle derin bir bağ kurmaya açık biri. Sizinle güçlü bir ruhsal çekim hissediyor olabilir.',
    reversed:
      'Ters Lovers, bu kişinin ilişkilerde kararsızlık yaşadığını, yanlış seçimler yaptığını veya kalbiyle zihni arasında bir çatışma içinde olduğunu gösterir. Uyumsuzluk ve iletişim sorunları olabilir.',
    keywords: ['aşk', 'seçim', 'uyum', 'ortaklık', 'ruhsal bağ'],
    context:
      'Bu kişi, kalbinin yolunu arayan ve önemli bir ilişki kararı arifesinde olan biri.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_pos1',
    card: 'The Chariot',
    position: 1,
    upright:
      'İlgi duyduğun kişi, hırslı, iradeli ve hedeflerine odaklanmış biridir. Hayatında kontrolü ele almış ve hızla ilerliyor. Bir ilişki istiyorsa, bu hedefe kararlılıkla yönelecektir.',
    reversed:
      'Ters Chariot, bu kişinin kontrolsüz, hedefsiz veya agresif bir enerjiye sahip olduğunu gösterir. Hayatının direksiyonunu kaybetmiş veya engeller karşısında pes etmiş olabilir.',
    keywords: ['irade', 'zafer', 'kontrol', 'hırs', 'hareket'],
    context:
      'Bu kişi, hayatının arabasını hedeflerine doğru kararlılıkla süren bir savaşçı.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_pos1',
    card: 'Strength',
    position: 1,
    upright:
      'Bu kişi, içsel bir güce, cesarete ve sabra sahip. Kaba kuvvet yerine şefkatle ve anlayışla zorlukların üstesinden gelir. Vahşi dürtülerini kontrol edebilen, nazik ama güçlü bir karakterdir.',
    reversed:
      'Ters Strength, bu kişinin kendine güvensiz, korkak veya içsel dürtüleri tarafından yönetilen biri olduğunu gösterir. Gücünü yanlış kullanıyor veya kendini zayıf hissediyor olabilir.',
    keywords: ['içsel güç', 'cesaret', 'şefkat', 'sabr', 'kontrol'],
    context:
      'Bu kişi, gerçek gücün nezaket ve sabırda yattığını bilen cesur bir kalp.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_pos1',
    card: 'The Hermit',
    position: 1,
    upright:
      'İlgi duyduğun kişi, kendi içine dönmüş, ruhsal bir arayış içinde olan ve yalnızlığa ihtiyaç duyan biridir. Şu anda ilişkilere mesafeli olabilir ve kendi içsel rehberliğini arıyor olabilir.',
    reversed:
      'Ters Hermit, bu kişinin kendini toplumdan zorla soyutladığını, yalnızlık korkusu çektiğini veya başkalarının tavsiyelerini dinlemeyi reddettiğini gösterir. İzolasyon içinde kaybolmuş olabilir.',
    keywords: [
      'içsel arayış',
      'yalnızlık',
      'bilgelik',
      'rehberlik',
      'içe dönüklük',
    ],
    context:
      'Bu kişi, cevapları dışarıda değil, kendi içinde arayan bilge bir gezgin.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_pos1',
    card: 'The Wheel of Fortune',
    position: 1,
    upright:
      'Bu kişi, hayatında önemli bir dönüm noktası ve değişim döngüsü içinde. Kaderin rüzgarları onun için esiyor. İlişki hayatında da ani ve beklenmedik gelişmeler yaşanabilir.',
    reversed:
      'Ters The Wheel of Fortune, bu kişinin şanssız bir dönemden geçtiğini, değişime direndiğini veya hayatının kontrolünü kaybettiğini hissettiğini gösterir. İşler onun için ters gidiyor olabilir.',
    keywords: ['kader', 'döngüler', 'değişim', 'şans', 'dönüm noktası'],
    context:
      'Bu kişi, hayatın iniş ve çıkışlarının tam ortasında, kader çarkının döndüğü bir noktada.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_pos1',
    card: 'Justice',
    position: 1,
    upright:
      'İlgi duyduğun kişi, adil, dürüst, mantıklı ve dengeli biridir. Hayatında ve ilişkilerinde doğruluk ve şeffaflık arar. Geçmiş eylemlerinin sonuçlarıyla yüzleşiyor olabilir.',
    reversed:
      'Ters Justice, bu kişinin adaletsiz davrandığını, sorumluluktan kaçtığını veya ön yargılı olduğunu gösterir. Hayatında bir dengesizlik veya haksızlık durumu söz konusu olabilir.',
    keywords: ['adalet', 'denge', 'doğruluk', 'sebep-sonuç', 'karar'],
    context:
      'Bu kişi, hayatın ve aşkın adil bir dengeye oturması gerektiğine inanan bir ruh.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_pos1',
    card: 'The Hanged Man',
    position: 1,
    upright:
      'Bu kişi, olaylara farklı bir bakış açısı kazanmak için duraklama döneminde. Bir fedakarlık yapıyor veya bir konuda beklemede kalıyor olabilir. Şu an harekete geçmek yerine gözlem yapmayı tercih ediyor.',
    reversed:
      'Ters Hanged Man, bu kişinin boşuna fedakarlık yaptığını, bir durumda takılıp kaldığını veya değişime direndiğini gösterir. Zamanını ve enerjisini boşa harcıyor olabilir.',
    keywords: [
      'farklı bakış açısı',
      'fedakarlık',
      'duraklama',
      'teslimiyet',
      'bekleme',
    ],
    context:
      'Bu kişi, ilerlemek için durup dünyaya farklı bir gözle bakması gereken biri.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_pos1',
    card: 'Death',
    position: 1,
    upright:
      'Bu kişi, hayatında büyük bir dönüşüm ve bitiş sürecinden geçiyor. Eskiyi geride bırakıp yeni bir başlangıç yapmaya hazırlanıyor. Bu, bir ilişkinin bitişi veya kişisel bir değişim olabilir.',
    reversed:
      'Ters Death, bu kişinin değişime direndiğini, geçmişe takılıp kaldığını veya gerekli bir sonlanmayı geciktirdiğini gösterir. Bu durum onun ilerlemesini engelliyor.',
    keywords: [
      'dönüşüm',
      'bitişler',
      'yeni başlangıçlar',
      'değişim',
      'sonlanma',
    ],
    context:
      'Bu kişi, küllerinden yeniden doğmak için eski bir benliği geride bırakan bir Anka kuşu.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_pos1',
    card: 'Temperance',
    position: 1,
    upright:
      'Bu kişi, hayatında dengeyi, uyumu ve ölçüyü bulmuş biridir. Farklı unsurları bir araya getirerek huzurlu bir sentez yaratır. İlişkilerde sabırlı, sakin ve uzlaşmacı bir tavrı vardır.',
    reversed:
      'Ters Temperance, bu kişinin hayatında dengesizlik, aşırılık veya çatışma yaşadığını gösterir. Sabırsız davranıyor ve içsel huzurunu kaybetmiş olabilir.',
    keywords: ['denge', 'uyum', 'ölçülülük', 'sabır', 'sentez'],
    context:
      'Bu kişi, hayatın farklı notalarını birleştirerek kendi huzur melodisini yaratan bir simyacı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_pos1',
    card: 'The Devil',
    position: 1,
    upright:
      'Bu kişi, materyalist zevklere, bağımlılıklara veya sağlıksız ilişki dinamiklerine sıkı sıkıya bağlı olabilir. Yoğun bir tutkuya sahip olsa da bu durum kısıtlayıcı veya toksik bir hal alabilir.',
    reversed:
      'Ters Devil, bu kişinin bir bağımlılıktan kurtulduğunu, zincirlerini kırdığını veya bir tuzağın farkına vardığını gösterir. Özgürleşme yolunda önemli bir adım atıyor.',
    keywords: [
      'bağımlılık',
      'kısıtlanma',
      'materyalizm',
      'tutku',
      'gölge benlik',
    ],
    context:
      'Bu kişi, kendi yarattığı veya içinde bulunduğu bir kafesin esiri ya da o kafesten kurtulmaya çalışan biri.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_pos1',
    card: 'The Tower',
    position: 1,
    upright:
      'Bu kişi, hayatında ani, sarsıcı ve beklenmedik bir yıkım yaşıyor. İnandığı temeller sarsılıyor ve ani bir aydınlanma ile gerçekleri görüyor. Bu süreç acı verici olsa da özgürleştiricidir.',
    reversed:
      'Ters Tower, bu kişinin gerekli bir yıkımdan kaçındığını, bir felaketi önlemeye çalıştığını veya değişime direndiği için krizin uzadığını gösterir. Yıkım korkusuyla yaşıyor.',
    keywords: [
      'ani yıkım',
      'sarsıcı değişim',
      'aydınlanma',
      'kurtuluş',
      'kaos',
    ],
    context:
      'Bu kişi, hayatının sağlam sandığı kulesi yıkılırken gerçeklerle yüzleşen biri.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_pos1',
    card: 'The Star',
    position: 1,
    upright:
      'Bu kişi, zor bir dönemden sonra umut, ilham ve inançla dolu. Geleceğe pozitif bakıyor ve ruhsal olarak iyileşme sürecinde. İlişkilere karşı kalbi açık ve iyimser.',
    reversed:
      'Ters Star, bu kişinin umudunu kaybetmiş, karamsar veya ilham kaynaklarından kopuk olduğunu gösterir. Geleceğe dair inancını yitirmiş ve kendini kaybolmuş hissediyor.',
    keywords: ['umut', 'inanç', 'ilham', 'iyileşme', 'huzur'],
    context:
      'Bu kişi, karanlık bir gecenin ardından parlayan, yol gösteren bir umut yıldızı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_pos1',
    card: 'The Moon',
    position: 1,
    upright:
      'Bu kişi, belirsizlikler, korkular ve yanılsamalarla dolu bir dönemden geçiyor. Sezgileri güçlü olsa da, neyin gerçek neyin hayal olduğunu ayırt etmekte zorlanıyor olabilir. Duygusal olarak kafa karıştırıcı bir enerjisi var.',
    reversed:
      'Ters Moon, bu kişinin korkularıyla yüzleştiğini, bir aldatmacanın açığa çıktığını veya kafa karışıklığının sona erdiğini gösterir. Sırlar ortaya çıkıyor ve netlik kazanıyor.',
    keywords: [
      'korkular',
      'yanılsamalar',
      'sezgi',
      'belirsizlik',
      'bilinçaltı',
    ],
    context:
      'Bu kişi, kendi içsel karanlığında yolunu bulmaya çalışan, sezgisel ama kaygılı bir ruh.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_pos1',
    card: 'The Sun',
    position: 1,
    upright:
      'Bu kişi, neşe, canlılık, başarı ve pozitif enerjiyle dolu. Hayatından keyif alıyor, kendine güveniyor ve etrafına ışık saçıyor. İlişkilerde açık, dürüst ve sıcakkanlıdır.',
    reversed:
      'Ters Sun, bu kişinin geçici bir mutsuzluk yaşadığını, enerjisinin düşük olduğunu veya potansiyelini tam olarak gösteremediğini belirtir. Başarıyı ve neşeyi görmekte zorlanıyor.',
    keywords: ['neşe', 'başarı', 'canlılık', 'iyimserlik', 'netlik'],
    context:
      'Bu kişi, etrafına sıcaklık ve mutluluk yayan, parlayan bir güneş.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_pos1',
    card: 'Judgement',
    position: 1,
    upright:
      'Bu kişi, hayatında önemli bir muhasebe ve yeniden doğuş döneminde. Geçmişi değerlendirip kendini affediyor ve daha yüksek bir amaca uyanıyor. İlişkilerde ikinci bir şans veya önemli bir karar söz konusu olabilir.',
    reversed:
      'Ters Judgement, bu kişinin kendini veya başkalarını yargıladığını, geçmiş hatalarından ders almadığını veya önemli bir karardan kaçındığını gösterir. Kendine karşı çok eleştirel olabilir.',
    keywords: ['hesaplaşma', 'yeniden doğuş', 'uyanış', 'affetme', 'karar'],
    context:
      'Bu kişi, geçmişiyle yüzleşip hayatında yeni bir sayfa açmak için bir çağrı duyan biri.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_pos1',
    card: 'The World',
    position: 1,
    upright:
      'Bu kişi, hayatında bir döngüyü başarıyla tamamlamış ve bütünlüğe ulaşmış. Kendisiyle barışık, tatmin olmuş ve yeni bir aşamaya geçmeye hazır. İlişkilerde de bir tamamlanma ve doyum hissi arar.',
    reversed:
      'Ters World, bu kişinin bir projeyi veya döngüyü tamamlayamadığını, hedeflerine ulaşamadığını ve bir şeylerin eksik kaldığını hissettiğini gösterir. Kapanış yapamıyor olabilir.',
    keywords: ['tamamlanma', 'bütünlük', 'başarı', 'doyum', 'yolculuk'],
    context:
      'Bu kişi, hayat yolculuğunda önemli bir aşamayı başarıyla tamamlamış ve dünyanın zirvesinde hisseden biri.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_pos1',
    card: 'Ace of Cups',
    position: 1,
    upright:
      'Bu kişi duygusal olarak yeni bir başlangıca hazır. Kalbi sevgiye, şefkate ve yeni bir ilişkiye tamamen açık. Size karşı saf ve yoğun duygular beslemeye başlıyor olabilir.',
    reversed:
      'Ters Kupa Ası, bu kişinin duygularını bastırdığını, kendini sevgiye kapattığını veya duygusal bir hayal kırıklığı yaşadığını gösterir. Kalbi şu an için kapalı olabilir.',
    keywords: ['yeni aşk', 'duygusal başlangıç', 'sevgi', 'şefkat', 'sezgi'],
    context:
      'Bu kişinin kalbi, yeni bir aşkın filizlenmesi için hazır ve açık.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_pos1',
    card: 'Two of Cups',
    position: 1,
    upright:
      'Bu kişi, sizinle güçlü bir karşılıklı çekim ve duygusal bağ hissediyor. Bir ortaklık, ruh eşi bağlantısı veya derin bir anlayış arayışında. İlişkide denklik ve uyum onun için çok önemli.',
    reversed:
      'Ters Kupa İkilisi, aranızdaki bağın zayıf olduğunu, bir uyumsuzluk veya iletişim kopukluğu yaşandığını gösterir. Tek taraflı bir çekim veya bir anlaşmazlık olabilir.',
    keywords: ['karşılıklı çekim', 'ortaklık', 'aşk', 'uyum', 'ruh eşi'],
    context:
      'Bu kişi, sizinle ruhsal ve duygusal bir ayna yansıması arayan bir partner.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_pos1',
    card: 'Three of Cups',
    position: 1,
    upright:
      'Bu kişi sosyal, arkadaş canlısı ve kutlamayı seven bir yapıya sahip. Şu anda hayatının keyifli bir döneminde olabilir. İlişkiyi arkadaşlık ve eğlence üzerine kurmak isteyebilir.',
    reversed:
      'Ters Kupa Üçlüsü, bu kişinin sosyal çevresinde sorunlar yaşadığını, bir dedikoduya karıştığını veya kendini dışlanmış hissettiğini gösterir. Üçüncü bir kişinin ilişkiye müdahalesi de olabilir.',
    keywords: ['kutlama', 'arkadaşlık', 'topluluk', 'neşe', 'sosyallik'],
    context:
      'Bu kişi, hayatı ve aşkı arkadaşlarıyla birlikte kutlamayı seven sosyal bir kelebek.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_pos1',
    card: 'Four of Cups',
    position: 1,
    upright:
      'Bu kişi şu anda duygusal olarak tatminsiz ve içe kapanık. Önüne çıkan fırsatları (belki de sizi) görmüyor olabilir. Hayattan veya ilişkilerden sıkılmış ve yeni bir şeye ilgi duymuyor.',
    reversed:
      'Ters Kupa Dörtlüsü, bu kişinin bir durgunluk döneminden çıktığını, yeni fırsatlara kendini açtığını ve hayata yeniden ilgi duymaya başladığını gösterir. İçe kapanıklığı sona eriyor.',
    keywords: [
      'tatminsizlik',
      'ilgisizlik',
      'içe kapanma',
      'fırsatları kaçırma',
      'durgunluk',
    ],
    context:
      'Bu kişi, elindeki kadehleri beğenmeyip uzatılan yeni kadehi görmezden gelen biri.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_pos1',
    card: 'Five of Cups',
    position: 1,
    upright:
      'Bu kişi geçmişteki bir kayıp veya hayal kırıklığına odaklanmış durumda. Pişmanlık duyuyor ve olumlu şeyleri görmekte zorlanıyor. Duygusal olarak kederli ve yas sürecinde olabilir.',
    reversed:
      'Ters Kupa Beşlisi, bu kişinin geçmişi geride bırakmaya başladığını, kayıplarını kabullendiğini ve affetme yolunda olduğunu gösterir. İyileşme ve umut belirtileri var.',
    keywords: ['kayıp', 'pişmanlık', 'keder', 'hayal kırıklığı', 'yas'],
    context:
      'Bu kişi, dökülen süt için ağlarken arkasındaki dolu kadehleri fark etmeyen biri.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_pos1',
    card: 'Six of Cups',
    position: 1,
    upright:
      'Bu kişi geçmişe özlem duyan, nostaljik ve masum bir ruha sahip. Geçmişten biri olabilir veya size karşı çocuksu, saf duygular besliyor olabilir. Size tanıdık ve güvenli bir his verir.',
    reversed:
      'Ters Kupa Altılısı, bu kişinin geçmişe takılıp kaldığını, olgunlaşmayı reddettiğini veya geçmişteki bir olayın yükünü taşıdığını gösterir. Geleceğe bakmakta zorlanıyor.',
    keywords: ['nostalji', 'geçmiş', 'masumiyet', 'çocukluk anıları', 'hediye'],
    context: 'Bu kişi, kalbi geçmişin tatlı anılarıyla dolu, masum bir ruh.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_pos1',
    card: 'Seven of Cups',
    position: 1,
    upright:
      'Bu kişi hayal dünyasında yaşayan, birçok seçeneği olan ama karar vermekte zorlanan biri. Aşk konusunda beklentileri gerçekçi olmayabilir. Size karşı da net olmayan, hayalperest bir tavrı olabilir.',
    reversed:
      'Ters Kupa Yedilisi, bu kişinin hayal dünyasından çıkarak gerçeklerle yüzleştiğini, seçeneklerini daralttığını ve net bir karar verdiğini gösterir. Kafa karışıklığı sona eriyor.',
    keywords: [
      'hayaller',
      'seçenekler',
      'kafa karışıklığı',
      'yanılsama',
      'kararsızlık',
    ],
    context:
      'Bu kişi, seçenekler ve hayaller bulutunun içinde kaybolmuş, hangi kadehi seçeceğini bilemeyen biri.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_pos1',
    card: 'Eight of Cups',
    position: 1,
    upright:
      'Bu kişi, duygusal olarak onu tatmin etmeyen bir durumu veya ilişkiyi geride bırakma kararı almış. Daha derin bir anlam ve maneviyat arayışıyla yeni bir yola çıkıyor. Şu an bir arayış içinde.',
    reversed:
      "Ters Kupa Sekizlisi, bu kişinin bir durumu terk etmekle kalmak arasında gidip geldiğini, korktuğunu veya nereye gideceğini bilemediğini gösterir. 'Acaba yanlış mı yapıyorum?' diye sorguluyor olabilir.",
    keywords: [
      'terk etme',
      'arayış',
      'duygusal yolculuk',
      'tatminsizlik',
      'yeni yol',
    ],
    context:
      'Bu kişi, dolu kupalarını arkasında bırakıp daha fazlasını aramak için yola çıkan bir gezgin.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_pos1',
    card: 'Nine of Cups',
    position: 1,
    upright:
      "Bu kişi hayatından memnun, duygusal olarak tatmin olmuş ve kendine yeten biridir. 'Dilek kartı' olarak bu kişi, aradığınız birçok olumlu özelliğe sahip olabilir. İlişkide cömert ve keyifli bir partnerdir.",
    reversed:
      'Ters Kupa Dokuzlusu, bu kişinin tatminsiz, materyalist veya kendini beğenmiş olabileceğini gösterir. Hayatındaki güzelliklerin farkında olmayabilir veya dilekleri gerçekleşmiyor olabilir.',
    keywords: [
      'memnuniyet',
      'dileklerin kabulü',
      'duygusal tatmin',
      'keyif',
      'cömertlik',
    ],
    context:
      'Bu kişi, hayatın sunduğu nimetlerden keyif alan, kendine yeten ve mutlu bir ruh.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'Bu kişi, aileye, yuvaya ve uzun süreli mutluluğa değer veren biridir. Duygusal olarak tamamlanmış hissediyor ve sizinle de böyle bir uyum ve mutluluk arayışında olabilir. Aile kurma potansiyeli yüksek.',
    reversed:
      'Ters Kupa Onlusu, bu kişinin aile içinde sorunlar yaşadığını, bir uyumsuzluk olduğunu veya hayalindeki mutluluğa ulaşamadığını gösterir. İlişkilerinde bir şeyler eksik.',
    keywords: ['mutluluk', 'aile', 'uyum', 'tamamlanma', 'duygusal doyum'],
    context:
      'Bu kişi, gökkuşağının altındaki mutlu bir yuvayı hayal eden veya yaşayan biri.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_pos1',
    card: 'Page of Cups',
    position: 1,
    upright:
      'Bu kişi hayalperest, sezgisel, hassas ve duygusal bir mesaj taşıyan genç bir ruhtur. Size karşı bir aşk itirafında bulunabilir veya flörtöz bir mesaj gönderebilir. Duygularını ifade etmekten çekinmez.',
    reversed:
      'Ters Kupa Uşağı, bu kişinin duygusal olarak olgunlaşmamış, alıngan veya gerçeklerden kaçan biri olabileceğini gösterir. Kötü bir haber veya bir hayal kırıklığı yaşayabilir.',
    keywords: ['duygusal mesaj', 'sezgi', 'hayalperest', 'hassasiyet', 'flört'],
    context:
      'Bu kişi, kalbinden gelen bir mesajı size sunmaya hazırlanan hassas bir haberci.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_pos1',
    card: 'Knight of Cups',
    position: 1,
    upright:
      "Bu kişi romantik, idealist, çekici ve sanatsal bir ruhtur. Aşkla hareket eder ve size romantik bir teklifle gelebilir. 'Beyaz atlı prens' arketipini temsil eder.",
    reversed:
      'Ters Kupa Şövalyesi, bu kişinin hayal kırıklığına uğratan, aldatıcı, karamsar veya gerçekçi olmayan beklentilere sahip biri olabileceğini gösterir. Romantik jestleri samimi olmayabilir.',
    keywords: ['romantizm', 'teklif', 'idealizm', 'çekicilik', 'sanatçı ruh'],
    context:
      'Bu kişi, aşkını bir kadeh gibi sunan, kalbinin peşinden giden bir romantik şövalye.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_pos1',
    card: 'Queen of Cups',
    position: 1,
    upright:
      'Bu kişi duygusal olarak olgun, şefkatli, sezgisel ve empatik biridir. Empati yeteneği çok gelişmiştir ve sevdiklerine karşı derin bir sevgi besler. Güven veren ve anlayışlı bir partnerdir.',
    reversed:
      'Ters Kupa Kraliçesi, bu kişinin duygusal olarak dengesiz, aşırı hassas, manipülatif veya muhtaç bir yapıda olabileceğini gösterir. Duygularını kontrol etmekte zorlanıyor olabilir.',
    keywords: ['duygusal olgunluk', 'sezgi', 'şefkat', 'empati', 'sevgi'],
    context: 'Bu kişi, kalbinin bilgeliğiyle hareket eden, sevgi dolu bir ruh.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_pos1',
    card: 'King of Cups',
    position: 1,
    upright:
      'Bu kişi duygularını kontrol edebilen, diplomatik, şefkatli ve bilge bir liderdir. Duygusal zekası yüksektir ve zor durumlarda bile sakin kalabilir. Olgun ve dengeli bir sevgi sunar.',
    reversed:
      'Ters Kupa Kralı, bu kişinin duygusal olarak manipülatif, soğuk, mesafeli veya dengesiz olabileceğini gösterir. Duygularını bastırıyor veya kötüye kullanıyor olabilir.',
    keywords: [
      'duygusal kontrol',
      'bilgelik',
      'şefkat',
      'diplomasi',
      'olgunluk',
    ],
    context:
      'Bu kişi, duygular okyanusunun bilge kralı; sakin ve kontrollü bir kalp.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_pos1',
    card: 'Ace of Swords',
    position: 1,
    upright:
      'Bu kişi zihinsel olarak çok net, zeki ve gerçekçi biridir. Yeni bir fikri veya gerçeği temsil eder. İlişkilerde dürüstlüğe ve açık iletişime önem verir. Sizinle ilgili net bir karar vermiş olabilir.',
    reversed:
      'Ters Kılıç Ası, bu kişinin kafa karışıklığı yaşadığını, yanlış kararlar aldığını veya düşüncelerinde net olmadığını gösterir. İletişim kurmakta zorlanıyor olabilir.',
    keywords: ['zihinsel netlik', 'gerçek', 'yeni fikir', 'zafer', 'dürüstlük'],
    context:
      'Bu kişi, gerçeğin keskin kılıcını elinde tutan, net ve kararlı bir zihin.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_pos1',
    card: 'Two of Swords',
    position: 1,
    upright:
      'Bu kişi zor bir karar karşısında kararsız kalmış ve bir savunma mekanizması geliştirmiş. Gerçeklerle yüzleşmekten kaçınıyor ve duygularını bloke ediyor olabilir. Size karşı da gardını almış durumda.',
    reversed:
      'Ters Kılıç İkilisi, bu kişinin bir kararsızlık dönemini aştığını, bir çıkmaza girdiğini veya gerçekleri görmeyi reddettiği için zorlandığını gösterir. Kafa karışıklığı ve belirsizlik hakim.',
    keywords: [
      'kararsızlık',
      'çıkmaz',
      'savunma',
      'inkar',
      'gerçeklerden kaçış',
    ],
    context:
      'Bu kişi, gözleri bağlı bir şekilde, ne yöne gideceğini bilmeden kalbiyle zihni arasında kalmış.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_pos1',
    card: 'Three of Swords',
    position: 1,
    upright:
      'Bu kişi yakın zamanda bir kalp kırıklığı yaşamış, acı bir gerçekle yüzleşmiş veya bir ayrılık geçirmiş. Şu anda zihinsel olarak acı çekiyor ve duygusal olarak yaralı. Yeni bir ilişkiye hazır olmayabilir.',
    reversed:
      'Ters Kılıç Üçlüsü, bu kişinin acısını bastırdığını, iyileşme sürecini reddettiğini veya geçmişteki bir hayal kırıklığını atlatamadığını gösterir. Affedemiyor ve acıyı uzatıyor olabilir.',
    keywords: [
      'kalp kırıklığı',
      'acı',
      'ayrılık',
      'gerçekle yüzleşme',
      'keder',
    ],
    context:
      'Bu kişi, aşkın getirdiği acı verici gerçeklerle boğuşan yaralı bir kalbe sahip.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_pos1',
    card: 'Four of Swords',
    position: 1,
    upright:
      'Bu kişi zihinsel olarak yorgun ve dinlenmeye ihtiyaç duyuyor. Stresli bir dönemden sonra mola vermiş ve kendini toparlamaya çalışıyor. Şu anda ilişkiler için enerjisi olmayabilir.',
    reversed:
      'Ters Kılıç Dörtlüsü, bu kişinin ya dinlenme dönemini bitirip harekete geçtiğini ya da dinlenmeyi reddederek tükenmişliğe doğru gittiğini gösterir. Stres ve yorgunluk devam ediyor.',
    keywords: ['dinlenme', 'mola', 'iyileşme', 'meditasyon', 'sakinlik'],
    context:
      'Bu kişi, savaşlarına ara vermiş, zihnini ve ruhunu dinlendiren bir şövalye.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_pos1',
    card: 'Five of Swords',
    position: 1,
    upright:
      "Bu kişi bir çatışma veya rekabet içinde. Kazanmak için her yolu deneyebilir, ancak bu zafer 'pirus zaferi' olabilir, yani kayıpları kazançlarından fazladır. Bencil ve hırslı bir tavrı olabilir.",
    reversed:
      'Ters Kılıç Beşlisi, bu kişinin bir çatışmanın anlamsızlığını fark ettiğini, uzlaşmaya çalıştığını veya geçmişteki bir kavgadan pişmanlık duyduğunu gösterir. Barış arayışında olabilir.',
    keywords: ['çatışma', 'rekabet', 'yenilgi', 'bencillik', 'hırs'],
    context:
      'Bu kişi, kazanmak uğruna her şeyi feda edebilecek, çatışmacı bir ruh.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_pos1',
    card: 'Six of Swords',
    position: 1,
    upright:
      'Bu kişi zorlu bir dönemi geride bırakıp daha sakin sulara doğru yol alıyor. Bir geçiş sürecinde ve zihinsel olarak iyileşiyor. Geçmişi arkasında bırakarak yeni bir başlangıca yelken açmış.',
    reversed:
      'Ters Kılıç Altılısı, bu kişinin bir geçiş sürecinde zorlandığını, geçmişin yükünü taşımaya devam ettiğini veya bir yolculuğun ertelendiğini gösterir. Huzura kavuşmakta zorlanıyor.',
    keywords: ['geçiş', 'yolculuk', 'iyileşme', 'huzur', 'geçmişi bırakma'],
    context:
      'Bu kişi, fırtınalı denizlerden ayrılıp sakin bir limana doğru yol alan bir gezgin.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_pos1',
    card: 'Seven of Swords',
    position: 1,
    upright:
      'Bu kişi stratejik, kurnaz ve bazen de gizli işler çeviren biri olabilir. Sorumluluktan kaçıyor, bir şeyi saklıyor veya dürüst davranmıyor olabilir. Size karşı tamamen açık olmayabilir.',
    reversed:
      'Ters Kılıç Yedilisi, bu kişinin bir yalanının ortaya çıktığını, vicdan azabı çektiğini veya artık gizli saklı işler yapmak istemediğini gösterir. Dürüst olmaya karar verebilir.',
    keywords: [
      'hile',
      'strateji',
      'gizlilik',
      'aldatma',
      'sorumluluktan kaçış',
    ],
    context:
      'Bu kişi, kimseye fark ettirmeden kendi planını uygulamaya çalışan kurnaz bir strateg.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_pos1',
    card: 'Eight of Swords',
    position: 1,
    upright:
      'Bu kişi kendini kapana kısılmış, kısıtlanmış ve çaresiz hissediyor. Ancak bu durum genellikle kendi yarattığı bir zihin hapishanesidir. Kendi gücünün farkında değil ve kurban rolünü oynuyor olabilir.',
    reversed:
      'Ters Kılıç Sekizlisi, bu kişinin kendini kısıtlayan inançlardan kurtulduğunu, özgürleştiğini ve kendi gücünü eline aldığını gösterir. Zihin hapishanesinden bir çıkış yolu bulmuş.',
    keywords: [
      'kısıtlanma',
      'çaresizlik',
      'kurban rolü',
      'zihin hapishanesi',
      'korku',
    ],
    context:
      'Bu kişi, kendi düşüncelerinin esiri olmuş, etrafındaki kılıçların aslında ona dokunmadığını fark etmeyen biri.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_pos1',
    card: 'Nine of Swords',
    position: 1,
    upright:
      'Bu kişi derin bir endişe, korku, suçluluk veya kabuslar içinde. Zihni ona eziyet ediyor ve uykusuz geceler geçiriyor olabilir. Yoğun bir stres ve anksiyete yaşıyor.',
    reversed:
      'Ters Kılıç Dokuzlusu, bu kişinin en kötü korkularıyla yüzleştiğini, endişelerinin yersiz olduğunu anladığını veya bir krizin sonuna geldiğini gösterir. İyileşme ve rahatlama başlıyor.',
    keywords: ['endişe', 'korku', 'kabuslar', 'stres', 'suçluluk'],
    context:
      'Bu kişi, geceleri zihninin karanlık koridorlarında kaybolan, endişeli bir ruh.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_pos1',
    card: 'Ten of Swords',
    position: 1,
    upright:
      'Bu kişi acı verici bir son, bir ihanet veya bir çöküş yaşamış. En dip noktada ve her şeyin bittiğini düşünüyor. Ancak bu aynı zamanda yeni bir başlangıcın habercisidir, çünkü daha kötüye gidemez.',
    reversed:
      'Ters Kılıç Onlusu, bu kişinin bir felaketten kıl payı kurtulduğunu, iyileşme sürecinin başladığını veya geçmişin acılarının hala devam ettiğini gösterir. Tam bir bitiş yaşanmamış olabilir.',
    keywords: ['acı son', 'ihanet', 'çöküş', 'dip nokta', 'yeni başlangıç'],
    context:
      'Bu kişi, sırtından bıçaklanmış ve en dibi görmüş, ama artık yeniden doğuşa hazır.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_pos1',
    card: 'Page of Swords',
    position: 1,
    upright:
      'Bu kişi meraklı, enerjik, konuşkan ve bazen de dedikoducu biridir. Yeni şeyler öğrenmeye heveslidir ama sabırsız olabilir. Size karşı keskin bir zekayla ve sorgulayıcı bir tavırla yaklaşabilir.',
    reversed:
      'Ters Kılıç Uşağı, bu kişinin sözleriyle kırıcı olabileceğini, savunmacı davrandığını veya boş konuştuğunu gösterir. İletişimde sorunlar ve yanlış anlaşılmalar olabilir.',
    keywords: ['merak', 'iletişim', 'enerji', 'sorgulama', 'gerçeği arama'],
    context:
      'Bu kişi, elindeki kılıçla fikirleri ve gerçekleri keşfetmeye hevesli, genç ve enerjik bir zihin.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_pos1',
    card: 'Knight of Swords',
    position: 1,
    upright:
      'Bu kişi hırslı, odaklanmış, hızlı düşünen ve daha da hızlı hareket eden biridir. Bir hedefe kitlenmiş ve onu elde etmek için hızla ilerliyor. Bazen düşüncesiz ve aceleci olabilir.',
    reversed:
      'Ters Kılıç Şövalyesi, bu kişinin agresif, pervasız, kavgacı veya hedeflerinden sapmış biri olabileceğini gösterir. Enerjisini yanlış yönde kullanıyor.',
    keywords: ['hırs', 'hız', 'odaklanma', 'acelecilik', 'kararlılık'],
    context:
      'Bu kişi, bir fırtına gibi hedefine doğru ilerleyen, durdurulması zor bir fikir savaşçısı.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_pos1',
    card: 'Queen of Swords',
    position: 1,
    upright:
      'Bu kişi zeki, bağımsız, dürüst ve esprili biridir. Duygularıyla değil, mantığıyla hareket eder. Acı tecrübelerden ders çıkarmış olabilir. İlişkilerde netlik ve dürüstlük bekler.',
    reversed:
      'Ters Kılıç Kraliçesi, bu kişinin aşırı eleştirel, soğuk, kinci veya acımasız olabileceğini gösterir. Zekasını başkalarını yaralamak için kullanabilir.',
    keywords: ['zekâ', 'bağımsızlık', 'dürüstlük', 'netlik', 'mantık'],
    context:
      'Bu kişi, gerçeği görmenizi sağlayan keskin zekalı, bağımsız bir ruh.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_pos1',
    card: 'King of Swords',
    position: 1,
    upright:
      'Bu kişi entelektüel, otoriter, adil ve analitik bir liderdir. Gerçeklere ve mantığa dayanarak kararlar alır. Duygusal olarak mesafeli olabilir ama adil ve dürüst bir partnerdir.',
    reversed:
      'Ters Kılıç Kralı, bu kişinin yargılayıcı, manipülatif, duygusuz veya gücünü kötüye kullanan biri olabileceğini gösterir. Entelektüel zorbalık yapabilir.',
    keywords: [
      'entelektüel otorite',
      'adalet',
      'mantık',
      'analitik düşünce',
      'dürüstlük',
    ],
    context:
      'Bu kişi, aklın ve adaletin krallığında hüküm süren, bilge ve tarafsız bir zihin.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_pos1',
    card: 'Ace of Wands',
    position: 1,
    upright:
      'Bu kişi enerji, ilham ve tutku dolu yeni bir başlangıcın eşiğinde. Yaratıcı potansiyeli yüksek ve harekete geçmeye hazır. Size karşı yoğun bir fiziksel çekim ve heyecan duyuyor olabilir.',
    reversed:
      'Ters Asa Ası, bu kişinin bir başlangıç yapmakta zorlandığını, ilhamını kaybettiğini veya enerjisinin düşük olduğunu gösterir. Bir gecikme veya engelle karşılaşmış olabilir.',
    keywords: ['yeni başlangıç', 'ilham', 'tutku', 'yaratıcılık', 'enerji'],
    context:
      'Bu kişi, içinde patlamaya hazır bir yaratıcılık ve tutku kıvılcımı taşıyor.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_pos1',
    card: 'Two of Wands',
    position: 1,
    upright:
      'Bu kişi geleceği için planlar yapan, potansiyelini tartan ve dünyayı keşfetmeye hazır biridir. Mevcut durumundan daha fazlasını istiyor. İlişkilerde de bir sonraki adımı planlıyor olabilir.',
    reversed:
      'Ters Asa İkilisi, bu kişinin gelecek korkusu yaşadığını, plan yapmaktan kaçındığını veya potansiyelini küçümsediğini gösterir. Risk almaktan korkuyor olabilir.',
    keywords: ['planlama', 'gelecek', 'potansiyel', 'karar', 'keşif'],
    context:
      'Bu kişi, elinde dünyayla, bir sonraki hamlesini planlayan bir vizyoner.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_pos1',
    card: 'Three of Wands',
    position: 1,
    upright:
      'Bu kişi planlarının ilk meyvelerini almaya başlamış ve geleceğe umutla bakıyor. Ufukları geniş ve uzun vadeli hedefleri var. İlişkinin geleceği konusunda iyimser ve beklenti içinde.',
    reversed:
      'Ters Asa Üçlüsü, bu kişinin planlarında gecikmeler veya engellerle karşılaştığını, ilerleyemediğini veya hayal kırıklığı yaşadığını gösterir. Sabırsızlık ve öngörü eksikliği olabilir.',
    keywords: ['beklenti', 'ilerleme', 'genişleme', 'öngörü', 'fırsat'],
    context:
      'Bu kişi, gemilerinin limana dönmesini bekleyen, geleceğe umutla bakan bir kaşif.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_pos1',
    card: 'Four of Wands',
    position: 1,
    upright:
      'Bu kişi bir başarıyı veya önemli bir olayı kutluyor. Hayatında istikrar, uyum ve mutluluk var. Sizinle bir kutlama, nişan, evlilik veya sadece mutlu bir birliktelik arayışında olabilir.',
    reversed:
      'Ters Asa Dörtlüsü, bu kişinin ev veya aile hayatında bir uyumsuzluk, istikrarsızlık veya kutlamanın ertelenmesi durumu yaşadığını gösterir. Temeller sağlam olmayabilir.',
    keywords: ['kutlama', 'istikrar', 'mutluluk', 'evlilik', 'uyum'],
    context:
      'Bu kişi, hayatın mutlu anlarını kutlayan, istikrarlı ve neşeli bir ruh.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_pos1',
    card: 'Five of Wands',
    position: 1,
    upright:
      'Bu kişi bir rekabet, çatışma veya anlaşmazlık içinde. Farklı fikirler çarpışıyor ve bir ego savaşı yaşanıyor olabilir. İlişkiye de bu rekabetçi ve kaotik enerjiyi yansıtabilir.',
    reversed:
      'Ters Asa Beşlisi, bu kişinin bir çatışmanın anlamsızlığını fark ettiğini, uzlaşmaya çalıştığını veya geçmişteki bir kavgadan pişmanlık duyduğunu gösterir. Barış arayışında olabilir.',
    keywords: ['rekabet', 'çatışma', 'anlaşmazlık', 'ego', 'kaos'],
    context:
      'Bu kişi, fikirlerin ve egoların çarpıştığı bir savaş alanının tam ortasında.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_pos1',
    card: 'Six of Wands',
    position: 1,
    upright:
      'Bu kişi bir başarı kazanmış, takdir görmüş ve zaferin tadını çıkarıyor. Kendine güveni yüksek ve çevresi tarafından destekleniyor. Sizi de bu zaferinin bir parçası olarak görebilir.',
    reversed:
      'Ters Asa Altılısı, bu kişinin bir yenilgi yaşadığını, takdir görmediğini veya kendine olan güvenini kaybettiğini gösterir. Başarısı geçici veya sahte olabilir.',
    keywords: ['zafer', 'başarı', 'takdir', 'özgüven', 'destek'],
    context:
      'Bu kişi, mücadelesini kazanmış ve zaferini halkın önünde kutlayan bir kahraman.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_pos1',
    card: 'Seven of Wands',
    position: 1,
    upright:
      'Bu kişi inandığı bir şeyi veya pozisyonunu cesurca savunuyor. Zorluklara ve rekabete karşı tek başına mücadele ediyor olabilir. İlişkide de kendi alanını ve sınırlarını korumaya çalışıyor.',
    reversed:
      'Ters Asa Yedilisi, bu kişinin mücadeleden vazgeçtiğini, yenilgiyi kabul ettiğini veya bunalmış hissettiğini gösterir. Savunması kırılmış olabilir.',
    keywords: ['savunma', 'cesaret', 'mücadele', 'meydan okuma', 'inanç'],
    context:
      'Bu kişi, tepede tek başına, inandıkları uğruna aşağıdakilere karşı savaşan bir savaşçı.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_pos1',
    card: 'Eight of Wands',
    position: 1,
    upright:
      'Bu kişi hayatında hızlı gelişmeler, ani haberler veya bir yolculuk yaşıyor. Olaylar hızla ilerliyor. Size karşı da hızlı bir iletişim veya ilişkinin hızla ilerlemesi söz konusu olabilir.',
    reversed:
      'Ters Asa Sekizlisi, bu kişinin hayatında gecikmeler, engeller veya yanlış anlaşılmalar olduğunu gösterir. Hız kesilmiş ve bir duraklama yaşanıyor olabilir.',
    keywords: [
      'hızlı gelişmeler',
      'haberler',
      'hareket',
      'iletişim',
      'yolculuk',
    ],
    context:
      'Bu kişi, hedefine doğru hızla uçan oklar gibi, eylem ve iletişim dolu bir enerjiye sahip.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_pos1',
    card: 'Nine of Wands',
    position: 1,
    upright:
      'Bu kişi geçmiş savaşlardan yara almış ama hala ayakta duran, dayanıklı biridir. Son bir mücadeleye daha hazır ve gardını indirmiyor. İlişkilere karşı temkinli ve savunmacı olabilir.',
    reversed:
      'Ters Asa Dokuzlusu, bu kişinin artık savaşacak gücü kalmadığını, pes ettiğini veya inatçı bir şekilde savunmada kalarak kendini yorduğunu gösterir. Paranoyak olabilir.',
    keywords: ['dayanıklılık', 'savunma', 'yorgunluk', 'inatçılık', 'temkin'],
    context:
      'Bu kişi, yaralı ama yenilmemiş, son bir savaşa daha hazırlanan yorgun bir savaşçı.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_pos1',
    card: 'Ten of Wands',
    position: 1,
    upright:
      'Bu kişi çok fazla sorumluluk ve yük altında eziliyor. Çok çalışıyor ve her şeyi tek başına yapmaya çalışıyor olabilir. İlişkiye ayıracak zamanı veya enerjisi olmayabilir.',
    reversed:
      'Ters Asa Onlusu, bu kişinin üzerindeki yükleri bıraktığını, sorumlulukları paylaştığını veya artık bu kadar ağır bir yük taşımak istemediğini gösterir. Bir rahatlama söz konusu.',
    keywords: ['yük', 'sorumluluk', 'baskı', 'tükenmişlik', 'çok çalışma'],
    context:
      'Bu kişi, tek başına taşıyamayacağı kadar çok yükü sırtlanmış, hedefine ulaşmaya çalışan biri.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_pos1',
    card: 'Page of Wands',
    position: 1,
    upright:
      'Bu kişi maceracı, hevesli, enerjik ve yeni fikirlere açık genç bir ruhtur. Keşfetmeyi ve yeni şeyler denemeyi sever. Size heyecan verici bir mesaj veya bir macera teklifi getirebilir.',
    reversed:
      'Ters Asa Uşağı, bu kişinin hedefsiz, kararsız veya bir başlangıcı yapamayan biri olduğunu gösterir. Kötü haber veya hayal kırıklığı getirebilir.',
    keywords: ['macera', 'heves', 'enerji', 'yeni fikirler', 'keşif'],
    context:
      'Bu kişi, elindeki asayla dünyayı keşfetmeye hazır, enerjik ve hevesli bir haberci.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_pos1',
    card: 'Knight of Wands',
    position: 1,
    upright:
      'Bu kişi tutkulu, enerjik, maceraperest ve karizmatik biridir. Harekete geçmekten ve risk almaktan korkmaz. Ancak bazen aceleci ve sabırsız olabilir. Hayatınıza bir anda girip çıkabilir.',
    reversed:
      'Ters Asa Şövalyesi, bu kişinin pervasız, kaba, sabırsız veya bir yere bağlı kalamayan biri olduğunu gösterir. Enerjisi dağınık ve hedefsiz olabilir.',
    keywords: ['tutku', 'macera', 'enerji', 'acelecilik', 'karizma'],
    context:
      'Bu kişi, atını dörtnala süren, tutkulu ve durdurulması zor bir maceraperest.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_pos1',
    card: 'Queen of Wands',
    position: 1,
    upright:
      'Bu kişi kendine güvenen, popüler, enerjik, sıcakkanlı ve yaratıcı biridir. Sosyaldir ve ilgi odağı olmayı sever. İlişkide tutkulu, eğlenceli ve ilham veren bir partnerdir.',
    reversed:
      'Ters Asa Kraliçesi, bu kişinin kıskanç, talepkar, agresif veya güvensiz olabileceğini gösterir. Popülerliğini kötüye kullanabilir.',
    keywords: ['özgüven', 'yaratıcılık', 'popülerlik', 'tutku', 'enerji'],
    context:
      'Bu kişi, hayat sahnesinde parlayan, etrafına enerji ve ilham saçan bir kraliçe.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_pos1',
    card: 'King of Wands',
    position: 1,
    upright:
      'Bu kişi doğal bir lider, vizyoner, karizmatik ve ilham veren biridir. Büyük düşünür ve insanları peşinden sürükler. İlişkide cesur, koruyucu ve tutkulu bir partnerdir.',
    reversed:
      'Ters Asa Kralı, bu kişinin baskıcı, egoist, sabırsız veya acımasız bir lider olabileceğini gösterir. Vizyonu konusunda aşırıya kaçabilir veya verdiği sözleri tutmayabilir.',
    keywords: ['liderlik', 'vizyon', 'karizma', 'ilham', 'tutku'],
    context:
      'Bu kişi, kendi krallığını kurmuş, vizyonuyla insanlara ilham veren bir lider.',
    group: 'Asalar',
  },

  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_pos1',
    card: 'Ace of Pentacles',
    position: 1,
    upright:
      'Bu kişi hayatında yeni ve somut bir başlangıç fırsatıyla karşı karşıya. Bu, yeni bir iş, yatırım veya sağlam temelli bir ilişki olabilir. Size güven veren, istikrarlı bir başlangıç sunabilir.',
    reversed:
      'Ters Tılsım Ası, bu kişinin kötü bir yatırım yaptığını, bir fırsatı kaçırdığını veya finansal olarak zorlandığını gösterir. Başlangıçlar için iyi bir zaman değil.',
    keywords: ['yeni fırsat', 'somut başlangıç', 'refah', 'istikrar', 'güven'],
    context:
      'Bu kişi, evrenden gelen somut bir hediye veya fırsatın eşiğinde duruyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pos1',
    card: 'Two of Pentacles',
    position: 1,
    upright:
      'Bu kişi hayatında birden fazla şeyi (iş, para, ilişkiler) aynı anda dengelemeye çalışıyor. Meşgul, esnek ve uyumlu biridir. Ancak bu durum bazen kararsızlığa yol açabilir.',
    reversed:
      'Ters Tılsım İkilisi, bu kişinin dengeyi kaybettiğini, çok fazla sorumluluk altında ezildiğini veya finansal olarak zorlandığını gösterir. Önceliklerini belirlemekte zorlanıyor.',
    keywords: ['denge', 'çoklu görev', 'esneklik', 'meşguliyet', 'uyum'],
    context:
      'Bu kişi, hayatın iniş çıkışlarında hokkabazlık yapan, dengeyi bulmaya çalışan biri.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pos1',
    card: 'Three of Pentacles',
    position: 1,
    upright:
      'Bu kişi bir ekip çalışması veya projede yeteneklerini sergileyen, çalışkan biridir. Kaliteli iş çıkarmaya ve öğrenmeye önem verir. İlişkiyi de bir ekip çalışması olarak görüp birlikte bir şeyler inşa etmek isteyebilir.',
    reversed:
      'Ters Tılsım Üçlüsü, bu kişinin ekip içinde uyumsuzluk yaşadığını, yeteneklerini gösteremediğini veya kalitesiz iş çıkardığını gösterir. İşbirliğine kapalı olabilir.',
    keywords: ['ekip çalışması', 'beceri', 'planlama', 'kalite', 'işbirliği'],
    context:
      'Bu kişi, başkalarıyla birlikte çalışarak değerli bir eser ortaya koyan bir usta.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pos1',
    card: 'Four of Pentacles',
    position: 1,
    upright:
      'Bu kişi maddi güvenceye, kontrole ve birikime aşırı önem veren biridir. Sahip olduklarına (para, mülk, hatta ilişkiler) sıkı sıkıya tutunur. Değişime ve cömertliğe kapalı olabilir.',
    reversed:
      'Ters Tılsım Dörtlüsü, bu kişinin ya sonunda cömertleşmeye başladığını ya da kaybetme korkusuyla daha da cimrileştiğini gösterir. Kontrolü kaybediyor olabilir.',
    keywords: [
      'cimrilik',
      'kontrol',
      'güvenlik arayışı',
      'sahiplenme',
      'tutuculuk',
    ],
    context:
      'Bu kişi, sahip olduklarını kaybetme korkusuyla onlara sımsıkı sarılan, kapalı bir kalp.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pos1',
    card: 'Five of Pentacles',
    position: 1,
    upright:
      'Bu kişi maddi zorluk, dışlanma veya sağlık sorunları yaşıyor. Kendini yalnız ve yardıma muhtaç hissediyor. Yakınındaki yardım fırsatını (belki de sizi) görmüyor olabilir.',
    reversed:
      'Ters Tılsım Beşlisi, bu kişinin zor bir maddi dönemin sonuna geldiğini, bir krizden çıktığını veya yardım kabul etmeye başladığını gösterir. İyileşme ve toparlanma var.',
    keywords: [
      'maddi kayıp',
      'yoksulluk',
      'dışlanma',
      'sağlık sorunları',
      'yalnızlık',
    ],
    context:
      'Bu kişi, kışın ortasında, kilisenin sıcak ışığını görmeden dışarıda kalmış, zor durumda biri.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pos1',
    card: 'Six of Pentacles',
    position: 1,
    upright:
      'Bu kişi cömert, yardımsever ve finansal olarak dengeli biridir. Hem almayı hem de vermeyi bilir. İlişkide de verici ve destekleyici bir partner olabilir ya da şu an yardıma ihtiyacı olan taraf olabilir.',
    reversed:
      'Ters Tılsım Altılısı, bu kişinin ya borç içinde olduğunu ya da cömertliğini kötüye kullandığını, karşılık bekleyerek verdiğini gösterir. Bir güç dengesizliği var.',
    keywords: ['cömertlik', 'yardımseverlik', 'denge', 'alma-verme', 'destek'],
    context:
      'Bu kişi, elindekini ihtiyacı olanlarla paylaşan, adil ve cömert bir ruh.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pos1',
    card: 'Seven of Pentacles',
    position: 1,
    upright:
      'Bu kişi uzun süreli bir çabanın sonuçlarını değerlendiriyor. Emeklerinin karşılığını bekliyor ve sabırlı bir dönemde. İlişkinin gidişatını gözden geçiriyor ve geleceğe yatırım yapıp yapmayacağına karar veriyor.',
    reversed:
      'Ters Tılsım Yedilisi, bu kişinin çabalarının boşa gittiğini, sabırsızlık ettiğini veya yanlış bir şeye yatırım yaptığını gösterir. Emeklerinin karşılığını alamıyor.',
    keywords: ['değerlendirme', 'sabır', 'yatırım', 'emek', 'bekleyiş'],
    context:
      'Bu kişi, ektiği tohumların büyümesini sabırla bekleyen, emeğini tartan bir çiftçi.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pos1',
    card: 'Eight of Pentacles',
    position: 1,
    upright:
      'Bu kişi bir zanaat veya beceri üzerinde özenle çalışan, çalışkan ve detaycı biridir. Kendini geliştirmeye ve ustalaşmaya adamıştır. İlişkiye de aynı özen ve çabayı gösterebilir.',
    reversed:
      'Ters Tılsım Sekizlisi, bu kişinin işine olan ilgisini kaybettiğini, tembellik ettiğini veya mükemmeliyetçilik yüzünden hiçbir şeyi bitiremediğini gösterir. Detaylarda boğuluyor.',
    keywords: [
      'ustalık',
      'çalışkanlık',
      'beceri geliştirme',
      'detaycılık',
      'özen',
    ],
    context:
      'Bu kişi, bir zanaatkar gibi, becerilerini mükemmelleştirmek için özenle çalışan biri.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pos1',
    card: 'Nine of Pentacles',
    position: 1,
    upright:
      'Bu kişi maddi olarak bağımsız, kendine yeten, zarif ve hayatın lükslerinden keyif alan biridir. Kendi emeğiyle refaha kavuşmuştur. İlişkide bir partnere ihtiyacı yoktur ama isterse seçer.',
    reversed:
      'Ters Tılsım Dokuzlusu, bu kişinin maddi olarak bağımlı olduğunu, gösteriş meraklısı olduğunu veya yalnızlık çektiğini gösterir. Kendi kendine yetme konusunda sorunları var.',
    keywords: ['bağımsızlık', 'refah', ' kendine yetme', 'zarafet', 'keyif'],
    context:
      'Bu kişi, kendi emeğiyle kurduğu bahçenin keyfini süren, bağımsız ve zarif bir ruh.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pos1',
    card: 'Ten of Pentacles',
    position: 1,
    upright:
      'Bu kişi aile mirasına, geleneklere ve uzun vadeli güvenliğe önem veren biridir. Maddi ve manevi olarak zengin bir altyapısı vardır. Sizinle de kalıcı, istikrarlı bir gelecek ve aile kurmak isteyebilir.',
    reversed:
      'Ters Tılsım Onlusu, bu kişinin aile içinde finansal sorunlar yaşadığını, bir mirası kaybettiğini veya aile bağlarının zayıf olduğunu gösterir. Kalıcı bir güvenlik hissi yok.',
    keywords: ['aile mirası', 'zenginlik', 'güvenlik', 'gelenek', 'kalıcılık'],
    context:
      'Bu kişi, nesiller boyu süren bir zenginliğin ve aile bağlarının temsilcisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pos1',
    card: 'Page of Pentacles',
    position: 1,
    upright:
      'Bu kişi öğrenmeye hevesli, çalışkan, güvenilir ve yeni fırsatları değerlendiren genç bir ruhtur. Somut bir hedefe odaklanmıştır. Size sağlam ve gerçekçi bir başlangıç teklif edebilir.',
    reversed:
      'Ters Tılsım Uşağı, bu kişinin tembel, hedefsiz veya bir fırsatı kaçıran biri olduğunu gösterir. Okul veya iş hayatında sorunlar yaşayabilir.',
    keywords: [
      'öğrenme',
      'yeni fırsat',
      'çalışkanlık',
      'güvenilirlik',
      'somut hedefler',
    ],
    context:
      'Bu kişi, elindeki tılsımı inceleyen, yeni ve somut bir şeyler öğrenmeye hevesli bir öğrenci.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pos1',
    card: 'Knight of Pentacles',
    position: 1,
    upright:
      'Bu kişi son derece güvenilir, sabırlı, çalışkan ve metodik biridir. Görevlerini titizlikle yerine getirir. Aşkta yavaş ama emin adımlarla ilerler. Sadık ve istikrarlı bir partnerdir.',
    reversed:
      'Ters Tılsım Şövalyesi, bu kişinin aşırı sıkıcı, inatçı, tembel veya değişime kapalı biri olabileceğini gösterir. Rutinlerine saplanıp kalmış olabilir.',
    keywords: ['güvenilirlik', 'sabır', 'çalışkanlık', 'sadakat', 'istikrar'],
    context:
      'Bu kişi, ağır ama emin adımlarla ilerleyen, görevine sadık bir şövalye.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pos1',
    card: 'Queen of Pentacles',
    position: 1,
    upright:
      'Bu kişi besleyici, pratik, cömert ve evcimen biridir. Hem evini hem de işini başarıyla yönetir. Sevdiklerine karşı sıcak ve güven veren bir ortam yaratır. Pratik ve sevgi dolu bir partnerdir.',
    reversed:
      'Ters Tılsım Kraliçesi, bu kişinin ya iş ve ev hayatı arasında denge kuramadığını, ya da aşırı materyalist ve endişeli olduğunu gösterir. Kendine veya çevresine bakmıyor olabilir.',
    keywords: [
      'besleyicilik',
      'pratiklik',
      'cömertlik',
      'güvenlik',
      'evcimenlik',
    ],
    context:
      'Bu kişi, hem maddi hem de manevi zenginlik sunan, ayakları yere basan bir anaç ruh.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pos1',
    card: 'King of Pentacles',
    position: 1,
    upright:
      'Bu kişi maddi olarak başarılı, güvenilir, cömert ve istikrarlı bir liderdir. Kendi imparatorluğunu kurmuştur. Sevdiklerine karşı koruyucu ve refah içinde bir hayat sunan biridir.',
    reversed:
      'Ters Tılsım Kralı, bu kişinin aşırı materyalist, yozlaşmış, inatçı veya güvensiz biri olabileceğini gösterir. Başarısını ve zenginliğini kötüye kullanabilir.',
    keywords: ['başarı', 'zenginlik', 'güvenilirlik', 'cömertlik', 'istikrar'],
    context:
      'Bu kişi, maddi dünyanın kralı; başarılı, güvenilir ve cömert bir lider.',
    group: 'Tılsımlar',
  },
];

// i18n destekli fonksiyonlar
export const useI18nPosition1Meanings = (): I18nLovePosition1Meaning[] => {
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

// Belirli bir kart için i18n destekli anlam al (hook kullanmadan)
export const getI18nPosition1Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nLovePosition1Meaning | null => {
  const originalMeaning = position1Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`love.meanings.${cardKey}.position1.upright`);
  const i18nReversed = t(`love.meanings.${cardKey}.position1.reversed`);
  const i18nKeywords = t(`love.meanings.${cardKey}.position1.keywords`);
  const i18nContext = t(`love.meanings.${cardKey}.position1.context`);
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
        return originalMeaning.keywords;
      }
    })(),
    context: i18nContext || originalMeaning.context,
    group: i18nGroup || originalMeaning.group,
  };
};
