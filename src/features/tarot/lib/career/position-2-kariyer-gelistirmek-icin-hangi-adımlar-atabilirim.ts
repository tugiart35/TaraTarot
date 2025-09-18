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

export const position2Meanings: CareerPositionMeaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_pos2',
    card: 'The Fool',
    position: 2,
    upright:
      'Joker, gelişim için cesur bir adım atmanı önerir. Yeni projelere, farklı alanlara veya hiç denemediğin yöntemlere yönelmek kariyerinde sana büyük ivme kazandırabilir.',
    reversed:
      'Ters Joker, düşünmeden atılan adımların seni zorlayabileceğini hatırlatır. Adım atmadan önce biraz plan yapmak seni güçlendirecek.',
    keywords: ['cesaret', 'deneyim', 'yenilik', 'risk', 'özgürlük'],
    context:
      'Kariyerini geliştirmek için cesur ama bilinçli bir başlangıç yapmalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_pos2',
    card: 'The Magician',
    position: 2,
    upright:
      'Büyücü, kariyerinde elindeki becerileri aktif olarak kullanman gerektiğini söyler. Yeteneklerini daha görünür hale getirmek ve iletişim becerilerini güçlendirmek adımlarını hızlandırır.',
    reversed:
      'Ters Büyücü, yeteneklerini küçümsemenin ya da yanlış kullanmanın seni gerileteceğini gösterir. Gelişim için önce kendine inanmalısın.',
    keywords: ['yaratıcılık', 'beceri', 'iletişim', 'özgüven', 'potansiyel'],
    context:
      'Kariyerini geliştirmek için elindeki kaynakları ustalıkla değerlendirmelisin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_pos2',
    card: 'The High Priestess',
    position: 2,
    upright:
      'Başrahibe, gelişimin için sezgilerini dinlemeyi ve bilgini derinleştirmeyi önerir. Eğitim, araştırma veya içsel keşif bu süreçte sana rehberlik eder.',
    reversed:
      'Ters Başrahibe, iç sesini bastırdığında yanlış yönlere sapabileceğini söyler. Kariyerini geliştirmek için sezgini önemse.',
    keywords: ['sezgi', 'bilgi', 'içsel rehberlik', 'öğrenme', 'bilgelik'],
    context:
      'Kariyerini geliştirmek için hem bilgi hem de sezgiyle ilerlemelisin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_pos2',
    card: 'The Empress',
    position: 2,
    upright:
      'İmparatoriçe, gelişim için yaratıcılığını beslemeni ve üretkenliğini artırmanı önerir. Yeni projeler doğurmak ve mevcut fikirlerini büyütmek kariyerine güç katar.',
    reversed:
      'Ters İmparatoriçe, tembelliğe kapılmanın veya yaratıcılığını bastırmanın seni gerileteceğini gösterir.',
    keywords: ['yaratıcılık', 'üretkenlik', 'bolluk', 'ilham', 'besleyicilik'],
    context:
      'Kariyerini geliştirmek için yaratıcı projeler üretmeli ve büyütmelisin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_pos2',
    card: 'The Emperor',
    position: 2,
    upright:
      'İmparator, gelişim için disiplin ve düzenli çalışma alışkanlıkları edinmeni önerir. Stratejik adımlar atmak ve otorite kazanmak kariyerinde yükselmeni sağlar.',
    reversed:
      'Ters İmparator, katı kurallar veya plansızlık yüzünden ilerleyemeyeceğini gösterir. Dengeli bir düzen kurmalısın.',
    keywords: ['disiplin', 'düzen', 'otorite', 'planlama', 'istikrar'],
    context:
      'Kariyerini geliştirmek için sağlam bir yapı ve disiplinli yaklaşım gerekli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_pos2',
    card: 'The Hierophant',
    position: 2,
    upright:
      'Aziz, gelişim için bilgeliğe ve rehberlere başvurmanı önerir. Bir öğretmenden, mentordan ya da eğitimden fayda sağlayabilirsin.',
    reversed:
      'Ters Aziz, kendi yolunu çizmekten korkmaman gerektiğini gösterir. Geleneksel kalıplara bağlı kalmak seni sınırlayabilir.',
    keywords: ['rehberlik', 'öğrenme', 'gelenek', 'otorite', 'bilgelik'],
    context:
      'Kariyerini geliştirmek için bilgeliği takip et ama kendi yolunu da yarat.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_pos2',
    card: 'The Lovers',
    position: 2,
    upright:
      'Aşıklar, kariyerinde doğru seçimler yapmanın önemini vurgular. Kalbin ve aklın uyum içindeyse attığın adımlar seni ileri taşır.',
    reversed:
      'Ters Aşıklar, kararsızlık veya yanlış seçimlerin gelişimini zorlaştıracağını gösterir.',
    keywords: ['seçim', 'uyum', 'denge', 'işbirliği', 'karar'],
    context:
      'Kariyerini geliştirmek için kalbinle aklının uyumlu olduğu seçimleri yap.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_pos2',
    card: 'The Chariot',
    position: 2,
    upright:
      'Savaş Arabası, kararlılık ve odaklanma ile ilerlemeni önerir. Net bir hedef koymak ve ona doğru güçlü adımlarla ilerlemek kariyerinde başarı getirir.',
    reversed:
      'Ters Savaş Arabası, dikkatsizlik ve dağınıklığın seni yavaşlattığını gösterir.',
    keywords: ['kararlılık', 'odak', 'güç', 'irade', 'kontrol'],
    context:
      'Kariyerini geliştirmek için net hedefler belirleyip odaklanmalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_pos2',
    card: 'Strength',
    position: 2,
    upright:
      'Güç, sabır, öz disiplin ve içsel cesaretle hareket etmeni önerir. Bu sayede engelleri aşabilir ve gelişimini kalıcı kılabilirsin.',
    reversed:
      'Ters Güç, sabırsızlık ya da özgüven eksikliği yüzünden geri adım attığını gösterir.',
    keywords: ['cesaret', 'sabır', 'özgüven', 'denge', 'dayanıklılık'],
    context:
      'Kariyerini geliştirmek için sabırlı, dengeli ve cesur adımlar atmalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_pos2',
    card: 'The Hermit',
    position: 2,
    upright:
      'Ermiş, içsel araştırma ve yalnız zamanlarla kendi yolunu bulmanı önerir. Gelişim için içsel rehberliğe kulak vermek önemli olacak.',
    reversed:
      'Ters Ermiş, aşırı yalnızlık ya da içine kapanıklık seni ilerlemekten alıkoyabilir.',
    keywords: ['içe dönüş', 'bilgelik', 'rehberlik', 'aydınlanma', 'araştırma'],
    context: 'Kariyerini geliştirmek için önce kendi yolunu keşfetmelisin.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_pos2',
    card: 'Wheel of Fortune',
    position: 2,
    upright:
      'Kader Çarkı, değişimlere uyum sağlayarak fırsatları yakalaman gerektiğini söyler. Şans karşına çıkabilir, açık olmalısın.',
    reversed:
      'Ters Kader Çarkı, değişime direndiğinde fırsatları kaçırabileceğini gösterir.',
    keywords: ['değişim', 'fırsat', 'uyum', 'kader', 'döngü'],
    context:
      'Kariyerini geliştirmek için değişime esnek bir şekilde uyum sağlamalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_pos2',
    card: 'Justice',
    position: 2,
    upright:
      'Adalet, dürüstlük ve adil seçimlerle ilerlemeni önerir. Etik değerlere bağlı kalmak uzun vadede kariyerine güç katacaktır.',
    reversed:
      'Ters Adalet, kendine ya da başkalarına dürüst olmadığında gelişimin yavaşlar.',
    keywords: ['adalet', 'dürüstlük', 'etik', 'denge', 'sorumluluk'],
    context: 'Kariyerini geliştirmek için etik değerlere bağlı kalmalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_pos2',
    card: 'The Hanged Man',
    position: 2,
    upright:
      'Asılan Adam, bakış açını değiştirmeyi önerir. Farklı yöntemler denemek kariyerini geliştirebilir.',
    reversed:
      'Ters Asılan Adam, inatçılık yüzünden yeni fırsatları göremediğini söyler.',
    keywords: ['bakış açısı', 'teslimiyet', 'farklılık', 'deneyim', 'sabır'],
    context: 'Kariyerini geliştirmek için farklı bakış açıları kazanmalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_pos2',
    card: 'Death',
    position: 2,
    upright:
      'Ölüm, bitişlerin ardından yeni başlangıçlara işaret eder. Gelişim için artık sana hizmet etmeyen şeyleri geride bırakmalısın.',
    reversed: 'Ters Ölüm, eski düzenlere tutunduğunda ilerleyemezsin.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'değişim', 'özgürleşme'],
    context:
      'Kariyerini geliştirmek için eskiyi bırakıp yeniyi kucaklamalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_pos2',
    card: 'Temperance',
    position: 2,
    upright:
      'Denge, uyum ve sabırla ilerlemeni önerir. Kariyerinde aşırılıklardan uzak durmak sana istikrar getirir.',
    reversed: 'Ters Denge, aşırılıklar yüzünden dengeyi kaybettiğini gösterir.',
    keywords: ['denge', 'uyum', 'sabır', 'orta yol', 'istikrar'],
    context: 'Kariyerini geliştirmek için dengeli bir yaklaşım benimsemelisin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_pos2',
    card: 'The Devil',
    position: 2,
    upright:
      'Şeytan, bağımlılık yaratan kalıplardan çıkman gerektiğini söyler. Gelişimini engelleyen alışkanlıkları bırakmalısın.',
    reversed:
      'Ters Şeytan, zincirlerini kırma ve özgürleşme zamanının geldiğini gösterir.',
    keywords: ['bağımlılık', 'kısıtlama', 'özgürlük', 'alışkanlık', 'kontrol'],
    context:
      'Kariyerini geliştirmek için seni sınırlayan kalıplardan kurtulmalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_pos2',
    card: 'The Tower',
    position: 2,
    upright:
      'Kule, ani değişimlerin gelişimin için gerekli olabileceğini söyler. Eski yapılar yıkıldığında yenisi inşa edilebilir.',
    reversed: 'Ters Kule, değişimden korkmanın seni geri tuttuğunu gösterir.',
    keywords: ['yıkım', 'değişim', 'özgürleşme', 'kriz', 'yenilenme'],
    context: 'Kariyerini geliştirmek için krizleri fırsata çevirmelisin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_pos2',
    card: 'The Star',
    position: 2,
    upright:
      'Yıldız, umut, ilham ve vizyonla hareket etmeni önerir. Kariyerinde ilham aldığın alanlara yönelmek seni parlatır.',
    reversed:
      'Ters Yıldız, umutsuzluk ve motivasyon eksikliğiyle ilerleyemeyeceğini söyler.',
    keywords: ['umut', 'ilham', 'vizyon', 'yaratıcılık', 'gelecek'],
    context: 'Kariyerini geliştirmek için ilhamını canlı tutmalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_pos2',
    card: 'The Moon',
    position: 2,
    upright:
      'Ay, belirsizlikler içinde sezgine güvenerek ilerlemeni önerir. Her şey net olmasa da içsel sesin sana yol gösterecek.',
    reversed: 'Ters Ay, korku ve yanılsamaların seni engellediğini gösterir.',
    keywords: ['belirsizlik', 'sezgi', 'hayal', 'korku', 'gizem'],
    context:
      'Kariyerini geliştirmek için sezgine güvenmeli ve korkularını aşmalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_pos2',
    card: 'The Sun',
    position: 2,
    upright:
      'Güneş, iyimserlik ve açık hedeflerle ilerlemeni önerir. Kariyerinde başarı ve görünürlük seni bekliyor.',
    reversed:
      'Ters Güneş, motivasyon kaybı ya da kendine güven eksikliğini işaret eder.',
    keywords: ['başarı', 'mutluluk', 'görünürlük', 'iyimserlik', 'netlik'],
    context: 'Kariyerini geliştirmek için neşeli ve görünür olmalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_pos2',
    card: 'Judgement',
    position: 2,
    upright:
      'Mahkeme, geçmiş deneyimlerinden ders alarak yeniden doğma adımı atmanı önerir. Geçmişi bırak ve yeni bir vizyonla ilerle.',
    reversed:
      'Ters Mahkeme, geçmişe fazla takılı kalmanın seni engellediğini gösterir.',
    keywords: [
      'yeniden doğuş',
      'farkındalık',
      'karar',
      'özgürleşme',
      'ilerleme',
    ],
    context: 'Kariyerini geliştirmek için geçmişin yüklerini bırakmalısın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_pos2',
    card: 'The World',
    position: 2,
    upright:
      'Dünya, tamamlanma ve yeni döngülere geçişi simgeler. Kariyerinde uluslararası fırsatlar veya daha büyük projeler seni geliştirebilir.',
    reversed: 'Ters Dünya, yarım kalan işlerin seni yavaşlattığını gösterir.',
    keywords: ['tamamlanma', 'başarı', 'yeni döngü', 'gelişim', 'ilerleme'],
    context:
      'Kariyerini geliştirmek için tamamlanmamış işleri bitirip yeni döngülere başlamalısın.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_pos2',
    card: 'Ace of Cups',
    position: 2,
    upright:
      'Kupa Ası, gelişimin için kalbini açmanı ve yeni fırsatları duygusal olarak kucaklamanı önerir. Kariyerine ilham ve şefkat katmak seni ileri taşır.',
    reversed:
      'Ters Kupa Ası, duygularını bastırmanın ya da ilhamını küçümsemenin gelişimini yavaşlatacağını gösterir.',
    keywords: ['ilham', 'duygu', 'başlangıç', 'yaratıcılık', 'şefkat'],
    context:
      'Kariyerini geliştirmek için kalbine hitap eden ilham verici adımlar atmalısın.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_pos2',
    card: 'Two of Cups',
    position: 2,
    upright:
      'İki Kupa, işbirliği ve ortaklık kurarak ilerlemeni önerir. Güvenilir kişilerle uyumlu çalışmalar kariyerini büyütecek.',
    reversed:
      'Ters İki Kupa, uyumsuz ortaklıkların seni yavaşlatabileceğini gösterir.',
    keywords: ['ortaklık', 'işbirliği', 'uyum', 'denge', 'bağlantı'],
    context: 'Kariyerini geliştirmek için doğru kişilerle ortaklık kurmalısın.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_pos2',
    card: 'Three of Cups',
    position: 2,
    upright:
      'Üç Kupa, gelişim için çevrenden destek almanı ve başarılarını paylaşmanı önerir. Kutlamalar ve sosyal bağlantılar sana yeni kapılar açabilir.',
    reversed:
      'Ters Üç Kupa, sosyal çevreni ihmal etmenin seni yalnızlaştırabileceğini gösterir.',
    keywords: ['kutlama', 'destek', 'dostluk', 'paylaşım', 'bağlantı'],
    context:
      'Kariyerini geliştirmek için başarılarını paylaşmalı ve destek ağını güçlendirmelisin.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_pos2',
    card: 'Four of Cups',
    position: 2,
    upright:
      'Dört Kupa, farkında olmadığın fırsatları görmeni önerir. Gelişimin için karşına çıkan teklifleri küçümsememelisin.',
    reversed:
      'Ters Dört Kupa, farkındalık kazanarak yeni fırsatları değerlendirme zamanının geldiğini söyler.',
    keywords: ['fırsat', 'farkındalık', 'uyanış', 'seçenek', 'açılım'],
    context:
      'Kariyerini geliştirmek için dikkatini açmalı ve fırsatları değerlendirmelisin.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_pos2',
    card: 'Five of Cups',
    position: 2,
    upright:
      'Beş Kupa, geçmiş kayıplardan ders çıkararak yoluna devam etmeni önerir. Gelişim için önünde duran fırsatlara odaklanmalısın.',
    reversed:
      'Ters Beş Kupa, geçmişe takılı kalmayı bırakıp yeni olasılıklara yönelmen gerektiğini söyler.',
    keywords: ['ders', 'fırsat', 'kaybı aşma', 'ilerleme', 'yeni yön'],
    context:
      'Kariyerini geliştirmek için geçmiş hayal kırıklıklarını bırakmalısın.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_pos2',
    card: 'Six of Cups',
    position: 2,
    upright:
      'Altı Kupa, çocukluk hayallerini veya geçmiş deneyimlerini ilham kaynağı yapmanı önerir. Bu sana yön verebilir.',
    reversed:
      'Ters Altı Kupa, geçmişe saplanıp kalmanın seni geri tutabileceğini gösterir.',
    keywords: ['nostalji', 'ilham', 'geçmiş', 'hayal', 'anı'],
    context:
      'Kariyerini geliştirmek için geçmiş deneyimlerinden güç almalısın.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_pos2',
    card: 'Seven of Cups',
    position: 2,
    upright:
      'Yedi Kupa, seçeneklerini netleştirmeni ve hayallerini gerçeğe dönüştürmek için somut adımlar atmanı önerir.',
    reversed:
      'Ters Yedi Kupa, hayalperest beklentilerin seni oyalayabileceğini gösterir.',
    keywords: ['seçenek', 'vizyon', 'hayal', 'odak', 'karar'],
    context:
      'Kariyerini geliştirmek için seçeneklerin arasından gerçekçi olanı seçmelisin.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_pos2',
    card: 'Eight of Cups',
    position: 2,
    upright:
      'Sekiz Kupa, artık sana hizmet etmeyen bir yoldan ayrılmayı önerir. Cesaretle yeni bir hedefe yönelmelisin.',
    reversed:
      'Ters Sekiz Kupa, gitmen gereken yerde kalmanın seni yavaşlatabileceğini söyler.',
    keywords: ['cesaret', 'bırakma', 'ilerleme', 'yeni yol', 'tatmin'],
    context:
      'Kariyerini geliştirmek için seni tatmin etmeyen şeyleri bırakmalısın.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_pos2',
    card: 'Nine of Cups',
    position: 2,
    upright:
      'Dokuz Kupa, hedeflerine ulaşmak için net dilekler koymanı ve tatmin getirecek adımlar atmanı önerir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatminlerin seni geride bırakabileceğini gösterir.',
    keywords: ['tatmin', 'dilek', 'hedef', 'mutluluk', 'başarı'],
    context:
      'Kariyerini geliştirmek için gerçek tatmin sağlayan hedefler belirlemelisin.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_pos2',
    card: 'Ten of Cups',
    position: 2,
    upright:
      'On Kupa, iş ve özel hayat dengeni kurmanı önerir. Gelişim için uyumlu bir düzen seni güçlendirecek.',
    reversed:
      'Ters On Kupa, uyumsuzluk ve dengesizlik kariyerinde ilerlemeyi zorlaştırabilir.',
    keywords: ['denge', 'uyum', 'mutluluk', 'düzen', 'tatmin'],
    context: 'Kariyerini geliştirmek için yaşam dengeni korumalısın.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_pos2',
    card: 'Page of Cups',
    position: 2,
    upright:
      'Kupa Prensi, yaratıcı fikirlerini cesurca denemeni önerir. Yeni projeler başlatmak seni ileri taşıyabilir.',
    reversed:
      'Ters Kupa Prensi, hayalperestlik ve dikkatsizlik yüzünden fırsatları kaçırabileceğini gösterir.',
    keywords: ['yaratıcılık', 'ilham', 'deneme', 'fikir', 'keşif'],
    context:
      'Kariyerini geliştirmek için yaratıcı fikirlerini uygulamaya koymalısın.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_pos2',
    card: 'Knight of Cups',
    position: 2,
    upright:
      'Kupa Şövalyesi, ideallerinin peşinden gitmeni önerir. Kariyerinde tutku ve duygusal bağ geliştirmek seni büyütecek.',
    reversed:
      'Ters Kupa Şövalyesi, gerçekçi olmayan hedeflere kapılmaman gerektiğini gösterir.',
    keywords: ['ideal', 'tutku', 'yaratıcılık', 'fırsat', 'vizyon'],
    context:
      'Kariyerini geliştirmek için kalbini koyduğun hedeflere odaklanmalısın.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_pos2',
    card: 'Queen of Cups',
    position: 2,
    upright:
      'Kupa Kraliçesi, empati ve sezgilerini kariyerinde kullanmanı önerir. İnsan ilişkilerinde şefkatle ilerlemek yeni fırsatlar yaratır.',
    reversed:
      'Ters Kupa Kraliçesi, aşırı duygusallığın veya kendini ihmal etmenin seni zorlayabileceğini gösterir.',
    keywords: ['empati', 'sezgi', 'şefkat', 'farkındalık', 'ilham'],
    context: 'Kariyerini geliştirmek için empati ve sezgiyle adım atmalısın.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_pos2',
    card: 'King of Cups',
    position: 2,
    upright:
      'Kupa Kralı, duygularını dengeli yönetmeni önerir. Olgun ve bilge kararlar kariyerinde seni geliştirecek.',
    reversed:
      'Ters Kupa Kralı, duygusal dengesizlik ya da aşırı hassasiyetin gelişimini zorlayabileceğini söyler.',
    keywords: ['denge', 'olgunluk', 'bilgelik', 'liderlik', 'duygu'],
    context: 'Kariyerini geliştirmek için duygularını olgunlukla yönetmelisin.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_pos2',
    card: 'Ace of Swords',
    position: 2,
    upright:
      'Kılıç Ası, gelişim için net bir vizyon ve güçlü kararlar almanı önerir. Zihinsel açıklık, yeni bir fikir ya da stratejik plan seni ileri taşıyacak.',
    reversed:
      'Ters Kılıç Ası, kafa karışıklığı ya da iletişim sorunlarının seni yavaşlatabileceğini gösterir.',
    keywords: ['zihin açıklığı', 'karar', 'fikir', 'strateji', 'başlangıç'],
    context:
      'Kariyerini geliştirmek için zihinsel netlik kazanmalı ve cesur bir karar vermelisin.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_pos2',
    card: 'Two of Swords',
    position: 2,
    upright:
      'İki Kılıç, net bir karar vermeni önerir. Kararsızlık gelişimini geciktiriyor olabilir.',
    reversed:
      'Ters İki Kılıç, ertelediğin kararların artık önü tıkadığını gösterir. Seçimini yapmalısın.',
    keywords: ['karar', 'denge', 'ikilem', 'cesaret', 'netlik'],
    context: 'Kariyerini geliştirmek için seçim yapmaktan korkmamalısın.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_pos2',
    card: 'Three of Swords',
    position: 2,
    upright:
      'Üç Kılıç, hayal kırıklıklarından ders çıkararak ilerlemeni önerir. Bu tecrübeler seni daha güçlü kılar.',
    reversed:
      'Ters Üç Kılıç, eski yaraları geride bırakmanın ve iyileşmenin zamanı geldiğini söyler.',
    keywords: ['ders', 'deneyim', 'iyileşme', 'farkındalık', 'ilerleme'],
    context:
      'Kariyerini geliştirmek için geçmiş üzüntülerden öğrenmeli ve yoluna devam etmelisin.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_pos2',
    card: 'Four of Swords',
    position: 2,
    upright:
      'Dört Kılıç, biraz geri çekilip dinlenmeyi ve plan yapmayı önerir. Gelişim için zihnini toparlaman gerekiyor.',
    reversed:
      'Ters Dört Kılıç, sürekli yorgunluk ve tükenmişlik yüzünden ilerleyemediğini gösterir.',
    keywords: ['dinlenme', 'plan', 'yenilenme', 'hazırlık', 'denge'],
    context:
      'Kariyerini geliştirmek için kendine mola vermeli ve stratejik plan yapmalısın.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_pos2',
    card: 'Five of Swords',
    position: 2,
    upright:
      'Beş Kılıç, gereksiz çatışmalardan uzak durmanı önerir. Gelişim için işbirliğiyle ilerlemek daha verimli olacak.',
    reversed:
      'Ters Beş Kılıç, eski kavgaları geride bırakıp uzlaşma yoluna gitmen gerektiğini söyler.',
    keywords: ['çatışma', 'uzlaşma', 'deneyim', 'farkındalık', 'denge'],
    context: 'Kariyerini geliştirmek için egodan değil, uyumdan beslenmelisin.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_pos2',
    card: 'Six of Swords',
    position: 2,
    upright:
      'Altı Kılıç, gelişim için bir geçiş sürecine girmeni önerir. Yeni bir iş modeli, yeni bir ortam ya da farklı bir yöntem sana huzur getirecek.',
    reversed:
      'Ters Altı Kılıç, geçmişe takılı kaldığında ilerleyemeyeceğini söyler.',
    keywords: ['geçiş', 'ilerleme', 'yolculuk', 'iyileşme', 'fırsat'],
    context:
      'Kariyerini geliştirmek için seni ileri taşıyacak yeni bir yolculuğa çıkmalısın.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_pos2',
    card: 'Seven of Swords',
    position: 2,
    upright:
      'Yedi Kılıç, gelişim için akıllıca ve stratejik hareket etmeni önerir. Planlarını dikkatle yapmalısın.',
    reversed:
      'Ters Yedi Kılıç, dürüst olmayan yolların uzun vadede gelişimini engelleyeceğini gösterir.',
    keywords: ['strateji', 'plan', 'uyanıklık', 'dikkat', 'hesap'],
    context:
      'Kariyerini geliştirmek için stratejik ve şeffaf adımlar atmalısın.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_pos2',
    card: 'Eight of Swords',
    position: 2,
    upright:
      'Sekiz Kılıç, gelişim için zihinsel engellerini fark etmeni önerir. Kendini sınırladığın alanlardan çıkmalısın.',
    reversed:
      'Ters Sekiz Kılıç, kısıtlamalardan özgürleşmeye başladığını gösterir.',
    keywords: ['özgürleşme', 'kısıtlama', 'farkındalık', 'cesaret', 'ilerleme'],
    context:
      'Kariyerini geliştirmek için kendi yarattığın engelleri kaldırmalısın.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_pos2',
    card: 'Nine of Swords',
    position: 2,
    upright:
      'Dokuz Kılıç, kaygılarını aşman gerektiğini söyler. Gelişim için korkularını yönetmeli ve pozitif adımlar atmalısın.',
    reversed:
      'Ters Dokuz Kılıç, gereksiz endişelerden kurtulmaya başladığını gösterir.',
    keywords: ['kaygı', 'endişe', 'stres', 'özgürleşme', 'denge'],
    context:
      'Kariyerini geliştirmek için korkularını aşmalı ve cesur adımlar atmalısın.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_pos2',
    card: 'Ten of Swords',
    position: 2,
    upright:
      'On Kılıç, bitişlerin ardından yeni bir yol açabileceğini söyler. Gelişim için eski yöntemleri bırakmalı ve yeniden başlamalısın.',
    reversed:
      'Ters On Kılıç, toparlanma ve yeni bir sayfa açma fırsatını işaret eder.',
    keywords: ['bitiş', 'yenilenme', 'dönüşüm', 'yeni yol', 'ilerleme'],
    context: 'Kariyerini geliştirmek için eskiyi kapatıp yeniyi başlatmalısın.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_pos2',
    card: 'Page of Swords',
    position: 2,
    upright:
      'Kılıç Prensi, gelişim için sürekli öğrenmeni ve merakını canlı tutmanı önerir. Araştırma ve yeni fikirler seni büyütecek.',
    reversed:
      'Ters Kılıç Prensi, dikkatsizlik ve yüzeysel bilgilenmenin seni sınırlayacağını söyler.',
    keywords: ['öğrenme', 'merak', 'araştırma', 'fikir', 'keşif'],
    context:
      'Kariyerini geliştirmek için araştırmalı ve bilgini derinleştirmelisin.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_pos2',
    card: 'Knight of Swords',
    position: 2,
    upright:
      'Kılıç Şövalyesi, gelişim için hızlı ama odaklı adımlar atmanı önerir. Cesaretinle yol alabilirsin.',
    reversed:
      'Ters Kılıç Şövalyesi, aceleci davranmanın ya da yönsüz ilerlemenin seni zora sokacağını söyler.',
    keywords: ['cesaret', 'hız', 'karar', 'odak', 'ilerleme'],
    context:
      'Kariyerini geliştirmek için hızlı ama bilinçli adımlar atmalısın.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_pos2',
    card: 'Queen of Swords',
    position: 2,
    upright:
      'Kılıç Kraliçesi, mantığını ve bağımsızlığını kullanarak net kararlar almanı önerir. Objektif bakış açısı gelişimini hızlandırır.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı soğukluk ya da duyguları göz ardı etmenin seni sınırlayabileceğini gösterir.',
    keywords: ['mantık', 'bağımsızlık', 'netlik', 'adalet', 'zeka'],
    context:
      'Kariyerini geliştirmek için mantıklı ve bağımsız kararlar almalısın.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_pos2',
    card: 'King of Swords',
    position: 2,
    upright:
      'Kılıç Kralı, stratejik düşünce ve adaletli liderlik ile ilerlemeni önerir. Bilgeliğinle başkalarına da yol gösterebilirsin.',
    reversed:
      'Ters Kılıç Kralı, otoriteni yanlış kullanmanın ya da katı düşüncelerin seni engelleyebileceğini gösterir.',
    keywords: ['liderlik', 'strateji', 'adalet', 'zeka', 'bilgelik'],
    context: 'Kariyerini geliştirmek için bilgece ve adil kararlar almalısın.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_pos2',
    card: 'Ace of Wands',
    position: 2,
    upright:
      'Asa Ası, gelişim için yeni bir projeye ya da tutku uyandıran bir fikre başlamanı önerir. İlhamını harekete geçir.',
    reversed:
      'Ters Asa Ası, fırsatları ertelemenin ya da motivasyon kaybının seni geride tutabileceğini gösterir.',
    keywords: ['ilham', 'başlangıç', 'enerji', 'tutku', 'yaratıcılık'],
    context:
      'Kariyerini geliştirmek için seni heyecanlandıran yeni bir başlangıç yapmalısın.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_pos2',
    card: 'Two of Wands',
    position: 2,
    upright:
      'İki Asa, uzun vadeli plan yapmanı ve vizyonunu genişletmeni önerir. Geleceğe cesurca bakmalısın.',
    reversed:
      'Ters İki Asa, kararsızlık ve korkuların seni sınırlandırabileceğini söyler.',
    keywords: ['vizyon', 'plan', 'cesaret', 'genişleme', 'hedef'],
    context:
      'Kariyerini geliştirmek için ufkunu genişletmeli ve net planlar yapmalısın.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_pos2',
    card: 'Three of Wands',
    position: 2,
    upright:
      'Üç Asa, gelişim için fırsatları araştırmanı ve cesur adımlar atmanı önerir. Ufkun genişliyor.',
    reversed:
      'Ters Üç Asa, sabırsızlık ve yanlış yönlendirmelerden kaçınman gerektiğini gösterir.',
    keywords: ['araştırma', 'genişleme', 'fırsat', 'ilerleme', 'hazırlık'],
    context: 'Kariyerini geliştirmek için yeni fırsatları değerlendirmelisin.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_pos2',
    card: 'Four of Wands',
    position: 2,
    upright:
      'Dört Asa, güçlü temeller kurmanı önerir. Takdir görmek ve işbirliği seni geliştirecek.',
    reversed:
      'Ters Dört Asa, destek eksikliğinin seni zorlayabileceğini gösterir.',
    keywords: ['temel', 'kutlama', 'destek', 'uyum', 'dayanışma'],
    context:
      'Kariyerini geliştirmek için sağlam temeller atmalı ve başarılarını paylaşmalısın.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_pos2',
    card: 'Five of Wands',
    position: 2,
    upright:
      'Beş Asa, sağlıklı rekabetin seni geliştireceğini söyler. Kendini göstermek için mücadele etmelisin.',
    reversed:
      'Ters Beş Asa, gereksiz tartışmalardan uzak durman gerektiğini işaret eder.',
    keywords: ['rekabet', 'mücadele', 'savunma', 'hırs', 'motivasyon'],
    context:
      'Kariyerini geliştirmek için rekabeti verimli bir şekilde kullanmalısın.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_pos2',
    card: 'Six of Wands',
    position: 2,
    upright:
      'Altı Asa, başarılarını görünür kılmanı ve takdir toplamayı önerir. Özgüvenle öne çık.',
    reversed:
      'Ters Altı Asa, takdir beklemek yerine kendi değerini görmen gerektiğini söyler.',
    keywords: ['başarı', 'takdir', 'görünürlük', 'özgüven', 'zafer'],
    context:
      'Kariyerini geliştirmek için başarılarını paylaşmalı ve görünür olmalısın.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_pos2',
    card: 'Seven of Wands',
    position: 2,
    upright:
      'Yedi Asa, kendini savunmanı ve pozisyonunu güçlendirmeni önerir. Direncin seni geliştirecek.',
    reversed:
      'Ters Yedi Asa, gereksiz savunmaların seni yıpratabileceğini gösterir.',
    keywords: ['savunma', 'direnç', 'cesaret', 'kararlılık', 'denge'],
    context:
      'Kariyerini geliştirmek için kendi alanını güçlü şekilde savunmalısın.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_pos2',
    card: 'Eight of Wands',
    position: 2,
    upright:
      'Sekiz Asa, hızlı ilerlemenin ve iletişimin önemini vurgular. Hızlı aksiyon al.',
    reversed:
      'Ters Sekiz Asa, gecikmelerin gelişimini yavaşlatabileceğini gösterir.',
    keywords: ['hız', 'iletişim', 'ivme', 'fırsat', 'hareket'],
    context: 'Kariyerini geliştirmek için hızlı ve etkili iletişim kurmalısın.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_pos2',
    card: 'Nine of Wands',
    position: 2,
    upright:
      'Dokuz Asa, sabırla direnmeni ve yılmamanı önerir. Güçlü durmak seni geliştirecek.',
    reversed:
      'Ters Dokuz Asa, aşırı yorgunluğun seni pes etmeye yaklaştırdığını söyler.',
    keywords: ['dayanıklılık', 'sabır', 'direnç', 'güç', 'koruma'],
    context: 'Kariyerini geliştirmek için dirençli olmalı ve pes etmemelisin.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_pos2',
    card: 'Ten of Wands',
    position: 2,
    upright:
      'On Asa, sorumluluklarını bilinçli şekilde yönetmeni önerir. Yüklerini hafifletmek gelişimini hızlandırır.',
    reversed:
      'Ters On Asa, gereksiz sorumluluklardan kurtulman gerektiğini söyler.',
    keywords: ['sorumluluk', 'yük', 'denge', 'çaba', 'planlama'],
    context:
      'Kariyerini geliştirmek için yüklerini azaltmalı ve önceliklerini düzenlemelisin.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_pos2',
    card: 'Page of Wands',
    position: 2,
    upright:
      'Asa Prensi, yeni şeyler denemeni ve öğrenmeye açık olmanı önerir. Merak seni geliştirecek.',
    reversed:
      'Ters Asa Prensi, dikkatsizlik ya da sabırsızlık yüzünden fırsatları kaçırabileceğini gösterir.',
    keywords: ['öğrenme', 'keşif', 'ilham', 'deneme', 'yaratıcılık'],
    context:
      'Kariyerini geliştirmek için keşfetmeli ve yeni şeyler öğrenmelisin.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_pos2',
    card: 'Knight of Wands',
    position: 2,
    upright:
      'Asa Şövalyesi, tutku ve cesaretle ilerlemeni önerir. Atılganlık seni geliştirecek.',
    reversed:
      'Ters Asa Şövalyesi, aceleci hareketlerin risk yaratabileceğini gösterir.',
    keywords: ['cesaret', 'tutku', 'aksiyon', 'atılım', 'enerji'],
    context: 'Kariyerini geliştirmek için tutkunu harekete dönüştürmelisin.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_pos2',
    card: 'Queen of Wands',
    position: 2,
    upright:
      'Asa Kraliçesi, özgüvenini sergilemeni ve liderlik rolü üstlenmeni önerir. Karizman seni geliştirecek.',
    reversed:
      'Ters Asa Kraliçesi, güvensizlik ya da kendini ifade edememen gelişimini yavaşlatabilir.',
    keywords: ['özgüven', 'liderlik', 'karizma', 'ilham', 'güç'],
    context: 'Kariyerini geliştirmek için özgüvenle öne çıkmalısın.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_pos2',
    card: 'King of Wands',
    position: 2,
    upright:
      'Asa Kralı, vizyoner liderlik ve büyük hedefler koymanı önerir. Cesur adımlar kariyerinde yükselmeni sağlar.',
    reversed:
      'Ters Asa Kralı, plansızlık ya da baskıcı tutumların seni zorlayabileceğini gösterir.',
    keywords: ['vizyon', 'liderlik', 'cesaret', 'karar', 'ilerleme'],
    context: 'Kariyerini geliştirmek için vizyoner ve cesur adımlar atmalısın.',
    group: 'Asalar',
  },

  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_pos2',
    card: 'Ace of Pentacles',
    position: 2,
    upright:
      'Tılsım Ası, gelişim için yeni bir yatırım, eğitim ya da fırsatla ilerlemeni önerir. Maddi güvenliğin artabilir.',
    reversed:
      'Ters Tılsım Ası, fırsatları değerlendirmediğinde ya da temkinli davranmadığında ilerlemenin yavaşlayacağını gösterir.',
    keywords: ['fırsat', 'yatırım', 'başlangıç', 'bolluk', 'istikrar'],
    context: 'Kariyerini geliştirmek için yeni fırsatlara yatırım yapmalısın.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pos2',
    card: 'Two of Pentacles',
    position: 2,
    upright:
      'İki Tılsım, gelişim için sorumluluklarını dengeli yönetmeni önerir. Çoklu görevleri uyumla yürütmek seni güçlendirecek.',
    reversed:
      'Ters İki Tılsım, plansızlık ve dağınıklığın seni zorlayabileceğini gösterir.',
    keywords: ['denge', 'uyum', 'esneklik', 'çoklu görev', 'planlama'],
    context:
      'Kariyerini geliştirmek için dengeyi öğrenmeli ve sorumluluklarını düzenlemelisin.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pos2',
    card: 'Three of Pentacles',
    position: 2,
    upright:
      'Üç Tılsım, takım çalışmasına katılmanı ve işbirliğini artırmanı önerir. Ortak projeler seni geliştirecek.',
    reversed:
      'Ters Üç Tılsım, uyumsuzluk ya da yeterince işbirliği yapmamanın gelişimini sınırlayabileceğini söyler.',
    keywords: ['işbirliği', 'takım', 'ustalık', 'ilerleme', 'öğrenme'],
    context: 'Kariyerini geliştirmek için işbirliğine açık olmalısın.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pos2',
    card: 'Four of Pentacles',
    position: 2,
    upright:
      'Dört Tılsım, gelişim için güvenli bir temel kurmanı önerir. Maddi ve manevi değerlerini koruyarak ilerle.',
    reversed:
      'Ters Dört Tılsım, aşırı tutuculuk ya da değişimden korkmanın gelişimini yavaşlatacağını gösterir.',
    keywords: ['güven', 'temel', 'istikrar', 'koruma', 'denge'],
    context:
      'Kariyerini geliştirmek için sağlam ama esnek bir temel oluşturmalısın.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pos2',
    card: 'Five of Pentacles',
    position: 2,
    upright:
      'Beş Tılsım, gelişim için yardım istemekten çekinmemen gerektiğini söyler. Zorlukları dayanışmayla aşabilirsin.',
    reversed:
      'Ters Beş Tılsım, toparlanma ve destek bulma zamanının geldiğini gösterir.',
    keywords: ['destek', 'zorluk', 'yardım', 'birlik', 'iyileşme'],
    context: 'Kariyerini geliştirmek için destek almayı öğrenmelisin.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pos2',
    card: 'Six of Pentacles',
    position: 2,
    upright:
      'Altı Tılsım, gelişim için paylaşımda bulunmanı ve cömertliğini kullanmanı önerir. Yardımlaşma seni güçlendirecek.',
    reversed:
      'Ters Altı Tılsım, adaletsiz ya da tek taraflı ilişkilerin gelişimini engelleyebileceğini gösterir.',
    keywords: ['cömertlik', 'paylaşım', 'denge', 'destek', 'adalet'],
    context:
      'Kariyerini geliştirmek için adil paylaşım ve işbirliği yapmalısın.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pos2',
    card: 'Seven of Pentacles',
    position: 2,
    upright:
      'Yedi Tılsım, sabırla ilerlemeni ve uzun vadeli yatırımlar yapmanı önerir. Emeklerinin karşılığını alacaksın.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık ya da yanlış yatırımların seni yavaşlatabileceğini gösterir.',
    keywords: ['sabır', 'yatırım', 'ilerleme', 'bekleyiş', 'sonuç'],
    context:
      'Kariyerini geliştirmek için sabırlı olmalı ve uzun vadeli düşünmelisin.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pos2',
    card: 'Eight of Pentacles',
    position: 2,
    upright:
      'Sekiz Tılsım, gelişim için disiplinli çalışmanı ve uzmanlığını geliştirmeyi önerir. Öğrenmeye açık ol.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik ya da ilgisizliğin gelişimini sınırlayabileceğini gösterir.',
    keywords: ['çalışma', 'uzmanlık', 'öğrenme', 'emek', 'ilerleme'],
    context:
      'Kariyerini geliştirmek için disiplinli çalışmalı ve becerilerini geliştirmelisin.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pos2',
    card: 'Nine of Pentacles',
    position: 2,
    upright:
      'Dokuz Tılsım, gelişim için bağımsız hareket etmeni ve kendi emeğinin karşılığını almanı önerir.',
    reversed:
      'Ters Dokuz Tılsım, bağımlılık ya da aşırı rahatlığa kapılmanın seni gerileteceğini söyler.',
    keywords: ['bağımsızlık', 'özgüven', 'başarı', 'tatmin', 'öz yeterlilik'],
    context:
      'Kariyerini geliştirmek için bağımsızlığını korumalı ve emeğine güvenmelisin.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pos2',
    card: 'Ten of Pentacles',
    position: 2,
    upright:
      'On Tılsım, gelişim için kalıcı değerler inşa etmeni önerir. Ailevi ya da uzun vadeli projeler başarı getirecek.',
    reversed:
      'Ters On Tılsım, istikrarsızlık ya da kalıcılıktan uzak seçimlerin gelişimini zorlaştırabileceğini söyler.',
    keywords: ['istikrar', 'miras', 'kalıcılık', 'başarı', 'uzun vade'],
    context:
      'Kariyerini geliştirmek için uzun vadeli kalıcı projelere yönelmelisin.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pos2',
    card: 'Page of Pentacles',
    position: 2,
    upright:
      'Tılsım Prensi, gelişim için öğrenmeye ve yeni beceriler edinmeye açık olmanı önerir.',
    reversed:
      'Ters Tılsım Prensi, dikkatsizlik ve motivasyon eksikliğinin gelişimini yavaşlatabileceğini söyler.',
    keywords: ['öğrenme', 'beceri', 'keşif', 'eğitim', 'potansiyel'],
    context:
      'Kariyerini geliştirmek için öğrenmeye açık olmalı ve bilgini pratiğe dökmelisin.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pos2',
    card: 'Knight of Pentacles',
    position: 2,
    upright:
      'Tılsım Şövalyesi, sabırla ve istikrarla ilerlemeni önerir. Düzenli çalışmak seni güçlendirecek.',
    reversed:
      'Ters Tılsım Şövalyesi, monotonluk ya da fazla katılığın gelişimini yavaşlatabileceğini gösterir.',
    keywords: ['istikrar', 'sabır', 'çalışkanlık', 'planlılık', 'kararlılık'],
    context: 'Kariyerini geliştirmek için sabırlı ve düzenli çalışmalısın.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pos2',
    card: 'Queen of Pentacles',
    position: 2,
    upright:
      'Tılsım Kraliçesi, gelişim için hem üretken hem de destekleyici bir yaklaşım sergilemeni önerir.',
    reversed:
      'Ters Tılsım Kraliçesi, aşırı maddiyatçılığın ya da öz bakımı ihmal etmenin seni zorlayabileceğini gösterir.',
    keywords: ['üretkenlik', 'bereket', 'şefkat', 'pratiklik', 'denge'],
    context:
      'Kariyerini geliştirmek için üretkenliğini ve pratikliğini öne çıkarmalısın.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pos2',
    card: 'King of Pentacles',
    position: 2,
    upright:
      'Tılsım Kralı, liderlik, bolluk ve güvenle hareket etmeni önerir. Maddi ve manevi istikrar kariyerinde yükseliş sağlar.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol ya da hırsın seni tüketebileceğini gösterir.',
    keywords: ['liderlik', 'bolluk', 'güven', 'istikrar', 'başarı'],
    context:
      'Kariyerini geliştirmek için güvenli ve vizyoner liderlik sergilemelisin.',
    group: 'Tılsımlar',
  },
];

// i18n destekli fonksiyonlar - şu an için devre dışı
/*
export const useI18nPosition2Meanings = (): I18nCareerPositionMeaning[] => {
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
*/

// Belirli bir kart için i18n destekli anlam al (hook kullanmadan)
export const getI18nPosition2Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nCareerPositionMeaning | null => {
  const originalMeaning = position2Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`career.meanings.${cardKey}.position2.upright`);
  const i18nReversed = t(`career.meanings.${cardKey}.position2.reversed`);
  const i18nKeywords = t(`career.meanings.${cardKey}.position2.keywords`);
  const i18nContext = t(`career.meanings.${cardKey}.position2.context`);
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
