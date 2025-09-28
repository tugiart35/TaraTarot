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

export interface ProblemSolvingPosition4Meaning {
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
export interface I18nProblemSolvingPosition4Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position4Meanings: ProblemSolvingPosition4Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ps_pos4',
    card: 'The Fool',
    position: 4,
    upright:
      'Joker, en iyi potansiyel olarak sana sınırsız olasılıklar, cesur başlangıçlar ve özgürleşme getiriyor. Risk almak sana yeni ufuklar açabilir.',
    reversed:
      'Ters Joker, potansiyelinin boşa gitmemesi için dikkatsizlikten, plansızlıktan ve gereksiz risklerden uzak durmalısın.',
    keywords: ['özgürlük', 'başlangıç', 'risk', 'yaratıcılık', 'potansiyel'],
    context:
      'En iyi potansiyelin, cesaretle yeni başlangıçlara açık olmaktan doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ps_pos4',
    card: 'The Magician',
    position: 4,
    upright:
      'Büyücü, potansiyelinin zihinsel becerilerini, iletişimini ve yaratıcılığını kullanarak istediklerini gerçekleştirmek olduğunu gösterir.',
    reversed:
      'Ters Büyücü, potansiyelini yanlış yönlendirmemek için manipülasyondan, kararsızlıktan ve dikkat dağınıklığından uzak durmalısın.',
    keywords: ['yaratıcılık', 'güç', 'beceri', 'iletişim', 'potansiyel'],
    context:
      'En iyi potansiyelin, içindeki gücü doğru ve yaratıcı şekilde kullanmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ps_pos4',
    card: 'The High Priestess',
    position: 4,
    upright:
      'Başrahibe, potansiyelinin sezgilerini dinlemek, içsel bilgeliğine güvenmek ve ruhsal rehberliği kabul etmekte yattığını gösterir.',
    reversed:
      'Ters Başrahibe, potansiyelini açığa çıkarmak için sezgilerini bastırmamalı, içsel işaretleri görmezden gelmemelisin.',
    keywords: ['sezgi', 'bilgelik', 'ruh', 'bilgi', 'potansiyel'],
    context:
      'En iyi potansiyelin, sezgilerini ve içsel rehberliğini dinlemekten doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ps_pos4',
    card: 'The Empress',
    position: 4,
    upright:
      'İmparatoriçe, potansiyelinin üretkenlik, yaratıcılık ve bolluğu hayatına davet etmekte olduğunu söyler.',
    reversed:
      'Ters İmparatoriçe, potansiyelini sınırlamamak için bağımlılıklardan, ilhamsızlıktan ve aşırı kontrol isteğinden uzak durmalısın.',
    keywords: ['yaratıcılık', 'bolluk', 'üretkenlik', 'ilham', 'potansiyel'],
    context:
      'En iyi potansiyelin, üretkenliğini ve yaratıcılığını özgürce akıtmandır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ps_pos4',
    card: 'The Emperor',
    position: 4,
    upright:
      'İmparator, potansiyelinin düzen kurmak, disiplin geliştirmek ve güvenilir bir yapı inşa etmekte yattığını gösterir.',
    reversed:
      'Ters İmparator, potansiyelini engelleyen katılığa, baskıcılığa ya da kontrol saplantısına düşmemelisin.',
    keywords: ['düzen', 'otorite', 'kontrol', 'güven', 'potansiyel'],
    context:
      'En iyi potansiyelin, sağlam bir yapı ve disiplin kurmaktan doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ps_pos4',
    card: 'The Hierophant',
    position: 4,
    upright:
      'Aziz, potansiyelinin bilgeliği aktarmak, başkalarına rehberlik etmek ve manevi değerlerle uyum içinde ilerlemek olduğunu söyler.',
    reversed:
      'Ters Aziz, potansiyelini ortaya çıkarmak için başkalarının kurallarına körü körüne bağlanmamalı, kendi yolunu bulmalısın.',
    keywords: ['rehberlik', 'bilgelik', 'öğreti', 'değerler', 'potansiyel'],
    context: 'En iyi potansiyelin, bilgini ve deneyimini paylaşmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos4',
    card: 'The Lovers',
    position: 4,
    upright:
      'Aşıklar, potansiyelinin doğru seçimler yapmak, uyumlu ilişkiler kurmak ve kalpten bağlanmakta olduğunu gösterir.',
    reversed:
      'Ters Aşıklar, potansiyelini engelleyen kararsızlıklardan ve yanlış seçimlerden kaçınmalısın.',
    keywords: ['seçim', 'uyum', 'ilişki', 'karar', 'potansiyel'],
    context: 'En iyi potansiyelin, kalbinle uyumlu seçimler yapmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ps_pos4',
    card: 'The Chariot',
    position: 4,
    upright:
      'Savaş Arabası, potansiyelinin iradeni güçlendirmek, kontrolü eline almak ve hedeflerine kararlılıkla ilerlemek olduğunu söyler.',
    reversed:
      'Ters Savaş Arabası, potansiyelini boşa harcamamak için yönsüzlükten ve dağınıklıktan uzak durmalısın.',
    keywords: ['irade', 'kontrol', 'kararlılık', 'hedef', 'potansiyel'],
    context: 'En iyi potansiyelin, hedeflerine iradeyle odaklanmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ps_pos4',
    card: 'Strength',
    position: 4,
    upright:
      'Güç, potansiyelinin sabır, cesaret ve içsel dengeyle zorlukları aşmakta olduğunu gösterir.',
    reversed:
      'Ters Güç, potansiyelini kullanırken sabırsızlık, öfke ya da güvensizlikten uzak durmalısın.',
    keywords: ['cesaret', 'sabır', 'denge', 'güven', 'potansiyel'],
    context: 'En iyi potansiyelin, sabır ve cesaretle ilerlemektir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ps_pos4',
    card: 'The Hermit',
    position: 4,
    upright:
      'Ermiş, potansiyelinin içsel bilgelikten, yalnızlıktan doğan farkındalıktan ve kendi yolunu aydınlatmaktan geçtiğini gösterir.',
    reversed:
      'Ters Ermiş, potansiyelini ortaya koymak için izolasyona düşmemeli, içsel bilgini dünyayla paylaşmalısın.',
    keywords: [
      'bilgelik',
      'yalnızlık',
      'aydınlanma',
      'rehberlik',
      'potansiyel',
    ],
    context: 'En iyi potansiyelin, kendi iç ışığını keşfetmek ve paylaşmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ps_pos4',
    card: 'The Wheel of Fortune',
    position: 4,
    upright:
      'Kader Çarkı, potansiyelinin döngülerden faydalanmak, değişime uyum sağlamak ve fırsatları yakalamak olduğunu gösterir.',
    reversed:
      'Ters Kader Çarkı, potansiyelini sınırlayan talihsizlik korkusundan ve kontrol saplantısından uzaklaşmalısın.',
    keywords: ['kader', 'fırsat', 'döngü', 'uyum', 'potansiyel'],
    context: 'En iyi potansiyelin, fırsatları fark edip değerlendirmektir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ps_pos4',
    card: 'Justice',
    position: 4,
    upright:
      'Adalet, potansiyelinin dürüstlük, adil kararlar almak ve dengeyi sağlamakta olduğunu gösterir.',
    reversed:
      'Ters Adalet, potansiyelini zayıflatan taraflı düşünceler ve sorumluluktan kaçmak olabilir.',
    keywords: ['adalet', 'denge', 'karar', 'doğruluk', 'potansiyel'],
    context: 'En iyi potansiyelin, adil ve dengeli seçimler yapmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ps_pos4',
    card: 'The Hanged Man',
    position: 4,
    upright:
      'Asılan Adam, potansiyelinin farklı bir bakış açısı kazanmak, teslimiyet göstermek ve yeni anlayışlar geliştirmek olduğunu gösterir.',
    reversed:
      'Ters Asılan Adam, potansiyelini sınırlayan inatçılık, direnç ve dar görüş olabilir.',
    keywords: [
      'teslimiyet',
      'bakış açısı',
      'kabullenme',
      'öğrenme',
      'potansiyel',
    ],
    context:
      'En iyi potansiyelin, farklı perspektiflerden öğrenmekten doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ps_pos4',
    card: 'Death',
    position: 4,
    upright:
      'Ölüm, potansiyelinin dönüşüm, yenilenme ve eskiyi bırakma cesaretiyle açığa çıktığını gösterir.',
    reversed:
      'Ters Ölüm, potansiyelini zayıflatan değişim korkusu ve bitişleri kabullenememek olabilir.',
    keywords: ['dönüşüm', 'yenilenme', 'bitiş', 'cesaret', 'potansiyel'],
    context: 'En iyi potansiyelin, dönüşüm ve yeniden doğuşa izin vermektir.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ps_pos4',
    card: 'Temperance',
    position: 4,
    upright:
      'Denge, potansiyelinin sabır, ölçülülük ve uyumla ilerlemek olduğunu gösterir.',
    reversed:
      'Ters Denge, potansiyelini engelleyen aşırılıklar, sabırsızlık veya uyumsuzluk olabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'potansiyel'],
    context: 'En iyi potansiyelin, uyumlu ve sabırlı adımlar atmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ps_pos4',
    card: 'The Devil',
    position: 4,
    upright:
      'Şeytan, potansiyelinin farkındalıkla zincirlerini kırmak, bağımlılıklardan özgürleşmek ve kendi gücünü geri almak olduğunu gösterir.',
    reversed:
      'Ters Şeytan, potansiyelini sınırlayan bağımlılıklar, korkular veya kontrol kaybı olabilir.',
    keywords: ['özgürlük', 'farkındalık', 'güç', 'korku', 'potansiyel'],
    context:
      'En iyi potansiyelin, bağımlılıklardan kurtulup özgürlüğünü kazanmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ps_pos4',
    card: 'The Tower',
    position: 4,
    upright:
      'Kule, potansiyelinin ani değişimlerden, krizlerden güçlenerek çıkmak ve yeniden inşa etmek olduğunu gösterir.',
    reversed:
      'Ters Kule, potansiyelini zayıflatan kriz korkusu ve değişime direnç olabilir.',
    keywords: ['değişim', 'yıkım', 'yeniden doğuş', 'kriz', 'potansiyel'],
    context: 'En iyi potansiyelin, yıkımdan sonra yeniden inşa etmektir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ps_pos4',
    card: 'The Star',
    position: 4,
    upright:
      'Yıldız, potansiyelinin umut, ilham ve ruhsal yenilenmeyle parladığını gösterir.',
    reversed:
      'Ters Yıldız, potansiyelini kısıtlayan karamsarlık, güvensizlik ve ilham eksikliği olabilir.',
    keywords: ['umut', 'ilham', 'yenilenme', 'güven', 'potansiyel'],
    context: 'En iyi potansiyelin, umutla ilhamı hayatına taşımaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ps_pos4',
    card: 'The Moon',
    position: 4,
    upright:
      'Ay, potansiyelinin sezgilerini geliştirmek, belirsizliklerle yüzleşmek ve yanılsamaları aşmak olduğunu gösterir.',
    reversed:
      'Ters Ay, potansiyelini engelleyen korkular, yanılsamalar ve güvensizlikler olabilir.',
    keywords: ['sezgi', 'belirsizlik', 'korku', 'yanılsama', 'potansiyel'],
    context:
      'En iyi potansiyelin, sezgilerini güçlendirmek ve korkularını aşmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos4',
    card: 'The Sun',
    position: 4,
    upright:
      'Güneş, potansiyelinin mutluluk, başarı ve aydınlanma ile yaşamını parlatmak olduğunu söyler.',
    reversed:
      'Ters Güneş, potansiyelini engelleyen karamsarlık, başarısızlık korkusu veya özgüven eksikliği olabilir.',
    keywords: ['mutluluk', 'başarı', 'aydınlanma', 'özgüven', 'potansiyel'],
    context: 'En iyi potansiyelin, yaşamını neşe ve aydınlıkla doldurmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos4',
    card: 'Judgement',
    position: 4,
    upright:
      'Mahkeme, potansiyelinin geçmişle yüzleşmek, yeni farkındalıklar kazanmak ve yeniden doğmak olduğunu gösterir.',
    reversed:
      'Ters Mahkeme, potansiyelini sınırlayan inkar, pişmanlık ve sorumluluktan kaçmak olabilir.',
    keywords: ['farkındalık', 'yeniden doğuş', 'geçmiş', 'karar', 'potansiyel'],
    context: 'En iyi potansiyelin, geçmişle yüzleşip yeniden doğmaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos4',
    card: 'The World',
    position: 4,
    upright:
      'Dünya, potansiyelinin bütünlüğü tamamlamak, döngüleri kapatmak ve yeni bir aşamaya geçmek olduğunu gösterir.',
    reversed:
      'Ters Dünya, potansiyelini sınırlayan yarım kalmış işler, kapanmamış döngüler ve eksiklikler olabilir.',
    keywords: ['tamamlanma', 'döngü', 'başarı', 'yeni aşama', 'potansiyel'],
    context:
      'En iyi potansiyelin, bir döngüyü tamamlayıp yenisine başlamaktır.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_ps_pos4',
    card: 'Ace of Cups',
    position: 4,
    upright:
      'Kupa Ası, en iyi potansiyelinin kalbini tamamen açmak, duygusal yenilenme yaşamak ve ilhamın saf kaynağından beslenmek olduğunu söyler. Sevgi akışını başlattığında ilişkiler, yaratıcılık ve iç huzur doğal biçimde büyür.',
    reversed:
      'Ters Kupa Ası, potansiyelini tam açığa çıkarmak için duygusal tıkanıklıkları çözmen ve bastırdığın hisleri şefkatle kabul etmen gerektiğini hatırlatır; kalbini kapalı tutmak ilhamı da kısar.',
    keywords: ['duygusal başlangıç', 'şefkat', 'açılma', 'ilham', 'iyileşme'],
    context:
      'En iyi potansiyel, kalpten gelen akışa izin vermek ve duygusal yenilenmeyi kucaklamaktır.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ps_pos4',
    card: 'Two of Cups',
    position: 4,
    upright:
      'İki Kupa, en iyi potansiyelinin karşılıklı güven ve saygıya dayalı bir ortaklık kurmak, gerçek bağları güçlendirmek ve uyumla büyümek olduğunu gösterir.',
    reversed:
      'Ters İki Kupa, potansiyelini tam kullanmak için sınırları netleştirmen, yanlış eşleşmeleri bırakman ve içsel uyumunu öncelemen gerektiğini söyler.',
    keywords: ['ortaklık', 'uyum', 'karşılıklılık', 'bağ', 'güven'],
    context:
      'En iyi potansiyel, dengeli ve karşılıklı besleyici ilişkiler kurmaktır.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ps_pos4',
    card: 'Three of Cups',
    position: 4,
    upright:
      'Üç Kupa, en iyi potansiyelinin destekleyici topluluklarla bir araya gelmek, başarıları paylaşmak ve işbirliğiyle bereketi çoğaltmak olduğunu söyler.',
    reversed:
      'Ters Üç Kupa, potansiyelini açmak için aşırı sosyallikten doğan dağınıklığı azaltman, sağlıksız çevrelere mesafe koyman ve gerçek destek ağını güçlendirmen gerekir.',
    keywords: ['kutlama', 'destek', 'topluluk', 'işbirliği', 'neşe'],
    context:
      'En iyi potansiyel, destekleyici çevreyle sevinci ve üretkenliği paylaşmaktır.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ps_pos4',
    card: 'Four of Cups',
    position: 4,
    upright:
      'Dört Kupa, en iyi potansiyelin farkındalığını tazeleyip önündeki yeni fırsatları görerek duygusal durgunluktan çıkmanda yatar; şükran bakışı tıkanıklığı açar.',
    reversed:
      'Ters Dört Kupa, potansiyelini büyütmek için kabuğundan çıkman, ilgisizlikten sıyrılıp merakla yeni teklifleri denemen gerektiğini gösterir.',
    keywords: ['farkındalık', 'uyanış', 'şükran', 'fırsat', 'yenilenme'],
    context:
      'En iyi potansiyel, ilgiyi tazeleyip görünmeyen fırsatları fark etmektir.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ps_pos4',
    card: 'Five of Cups',
    position: 4,
    upright:
      'Beş Kupa, en iyi potansiyelinin kayıplardan ders çıkarıp kalanları sahiplenmek, yasın içinden anlamı damıtmak ve yeniden inşa etmeye cesaret etmek olduğunu söyler.',
    reversed:
      'Ters Beş Kupa, potansiyelini açığa çıkarmak için geçmişe takılı kalmaktan vazgeçip affediş ve kendine şefkatle ileriye bakman gerektiğini vurgular.',
    keywords: ['iyileşme', 'kabul', 'öğrenme', 'yeniden inşa', 'umut'],
    context:
      'En iyi potansiyel, kaybı bilgelik ve ileriye dönük güç olarak dönüştürmektir.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ps_pos4',
    card: 'Six of Cups',
    position: 4,
    upright:
      'Altı Kupa, en iyi potansiyelinin masumiyeti, samimiyeti ve geçmişten gelen besleyici anıları bugüne taşıyarak güvenli bağlar kurmak olduğunu gösterir.',
    reversed:
      'Ters Altı Kupa, potansiyeline ulaşmak için nostaljide takılı kalmayı bırakıp anın gerçek ihtiyaçlarına şefkatle cevap vermen gerekir.',
    keywords: ['masumiyet', 'samimiyet', 'anıların gücü', 'güven', 'şefkat'],
    context:
      'En iyi potansiyel, geçmişin sıcaklığını bugünde sağlıklı bağlara dönüştürmektir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ps_pos4',
    card: 'Seven of Cups',
    position: 4,
    upright:
      'Yedi Kupa, en iyi potansiyelinin hayal gücünü net niyetlerle birleştirip seçenekleri sadeleştirerek gerçekçi bir vizyona odaklanmak olduğunu söyler.',
    reversed:
      'Ters Yedi Kupa, potansiyelini büyütmek için dikkatini dağıtan fantezileri elemek, şeffaf öncelikler koymak ve eyleme geçmek gerekir.',
    keywords: ['vizyon', 'seçim', 'odak', 'yaratıcılık', 'netlik'],
    context:
      'En iyi potansiyel, seçenekleri arındırıp tek bir gerçek niyete odaklanmaktır.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ps_pos4',
    card: 'Eight of Cups',
    position: 4,
    upright:
      'Sekiz Kupa, en iyi potansiyelinin seni artık beslemeyen şeyleri onurluca geride bırakıp daha anlamlı bir yola yönelmek olduğunu anlatır.',
    reversed:
      'Ters Sekiz Kupa, potansiyeline ulaşmak için duygusal bağlılıkları sağaltman, korku yerine merakı seçip gerektiğinde vedayı kabul etmen gerekir.',
    keywords: ['bırakış', 'anlam arayışı', 'olgunluk', 'cesaret', 'ilerleyiş'],
    context:
      'En iyi potansiyel, dürüst bir vedayla daha derin bir tatmini aramaktır.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ps_pos4',
    card: 'Nine of Cups',
    position: 4,
    upright:
      'Dokuz Kupa, en iyi potansiyelinin öz-değerini besleyip meyvelerin tadını çıkarmak, doyumu şükranla çoğaltmak ve dileklerine somut adımlarla yaklaşmak olduğunu söyler.',
    reversed:
      'Ters Dokuz Kupa, potansiyeli açmak için yüzeysel tatminlere saplanmaktan vazgeçip kalıcı mutluluk için değerlerinle hizalanman gerekir.',
    keywords: ['tatmin', 'şükran', 'öz-değer', 'dilek', 'hizalanma'],
    context:
      'En iyi potansiyel, gerçek değerlerle uyumlu sürdürülebilir tatmin yaratmaktır.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ps_pos4',
    card: 'Ten of Cups',
    position: 4,
    upright:
      'On Kupa, en iyi potansiyelinin duygusal uyum, aile/ekip içinde barış ve aidiyet duygusunu inşa etmek olduğunu gösterir; huzur başarıyı besler.',
    reversed:
      'Ters On Kupa, potansiyeline erişmek için ilişki beklentilerini gerçekçi kılman, iletişimi güçlendirmen ve ortak değerlerde buluşman gerekir.',
    keywords: ['uyum', 'aidiyet', 'huzur', 'aile/ekip', 'birlik'],
    context:
      'En iyi potansiyel, ortak değerler etrafında kalıcı duygusal uyum kurmaktır.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ps_pos4',
    card: 'Page of Cups',
    position: 4,
    upright:
      'Kupa Prensi, en iyi potansiyelinin merakla hislerini ifade etmek, yaratıcı oyun alanları açmak ve iç çocuğunun sezgilerini ciddiye almak olduğunu söyler.',
    reversed:
      'Ters Kupa Prensi, potansiyelini büyütmek için duygusal ertelemeyi bırakman, hassasiyetini güç olarak sahiplenmen ve üretime dökmen gerekir.',
    keywords: ['yaratıcılık', 'ifade', 'merak', 'sezgi', 'duyarlılık'],
    context:
      'En iyi potansiyel, yaratıcı ve samimi ifade kanallarını açmaktır.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ps_pos4',
    card: 'Knight of Cups',
    position: 4,
    upright:
      'Kupa Şövalyesi, en iyi potansiyelinin ideallerini zarafetle taşıyıp ilham verici tekliflerde bulunmak ve vizyonuna duygusal çekim gücü katmak olduğunu gösterir.',
    reversed:
      'Ters Kupa Şövalyesi, potansiyel için idealizmini eylem planıyla dengelemen, tutarlılık geliştirmen ve gerçekçi taahhütler vermen gerekir.',
    keywords: ['idealizm', 'ilham', 'teklif', 'çekim', 'tutarlılık'],
    context:
      'En iyi potansiyel, ilhamı somut adımlarla tutarlı biçimde taşımaktır.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ps_pos4',
    card: 'Queen of Cups',
    position: 4,
    upright:
      'Kupa Kraliçesi, en iyi potansiyelinin derin empati, sezgisel liderlik ve duygusal alan tutma becerisiyle çevreni şefkatle dönüştürmek olduğunu söyler.',
    reversed:
      'Ters Kupa Kraliçesi, potansiyeline ulaşmak için aşırı yüklenmeyi bırakıp sınırlarını koruman ve öz bakımını önceliklendirmen gerekir.',
    keywords: ['empati', 'sezgi', 'şefkat', 'liderlik', 'sınır'],
    context:
      'En iyi potansiyel, şefkatle liderlik ederken sağlıklı sınırlar korumaktır.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ps_pos4',
    card: 'King of Cups',
    position: 4,
    upright:
      'Kupa Kralı, en iyi potansiyelinin duygusal olgunlukla fırtınalı sularda sakin kalmak, bilgece rehberlik etmek ve güven inşa etmek olduğunu gösterir.',
    reversed:
      'Ters Kupa Kralı, potansiyeli açmak için duyguları bastırmak yerine düzenli ifade alanları kurman ve tetikleyicileri bilinçle yönetmen gerekir.',
    keywords: ['olgunluk', 'sükunet', 'güven', 'rehberlik', 'denge'],
    context:
      'En iyi potansiyel, duygusal dengeyle güven veren bir rehber olmaktır.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_ps_pos4',
    card: 'Ace of Swords',
    position: 4,
    upright:
      'Kılıç Ası, en iyi potansiyelin zihinsel berraklıkla gerçeği görmek, güçlü kararlar almak ve keskin bir farkındalıkla yeni bir sayfa açmaktır.',
    reversed:
      'Ters Kılıç Ası, potansiyelini ortaya çıkarmak için kafa karışıklığını aşmalı, iletişimde netlik geliştirmeli ve kendine dürüst olmalısın.',
    keywords: ['netlik', 'karar', 'gerçek', 'aydınlanma', 'farkındalık'],
    context:
      'En iyi potansiyelin, zihinsel netlikle yeni başlangıçlar yapmaktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ps_pos4',
    card: 'Two of Swords',
    position: 4,
    upright:
      'İki Kılıç, en iyi potansiyelin dengeli seçimler yapmak, çatışmaları uzlaştırmak ve sezgiyle mantığı birleştirmektir.',
    reversed:
      'Ters İki Kılıç, potansiyelini açığa çıkarmak için kararsızlığı aşmalı, gerçeklerle yüzleşmeli ve seçimlerini ertelememelisin.',
    keywords: ['denge', 'seçim', 'uzlaşma', 'karar', 'içgörü'],
    context:
      'En iyi potansiyelin, sezgi ve mantığı uyumla kullanarak karar almaktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ps_pos4',
    card: 'Three of Swords',
    position: 4,
    upright:
      'Üç Kılıç, en iyi potansiyelin geçmişin acılarından öğrenmek, kalbini onarmak ve duygusal bilgelikle güçlenmektir.',
    reversed:
      'Ters Üç Kılıç, potansiyeline ulaşmak için kalp kırıklıklarını iyileştirmeli, suçlulukları bırakmalı ve affedişe alan açmalısın.',
    keywords: ['iyileşme', 'affediş', 'bilgelik', 'deneyim', 'şefkat'],
    context: 'En iyi potansiyelin, acıyı bilgelik ve güce dönüştürmektir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ps_pos4',
    card: 'Four of Swords',
    position: 4,
    upright:
      'Dört Kılıç, en iyi potansiyelin zihinsel dinginlik, bilinçli dinlenme ve içsel huzurla yeniden güç toplamaktır.',
    reversed:
      'Ters Dört Kılıç, potansiyelini açığa çıkarmak için ertelemeyi bırakmalı, aşırı yorgunluğu fark etmeli ve aktif olarak toparlanmaya yönelmelisin.',
    keywords: ['dinlenme', 'zihin', 'iyileşme', 'dinginlik', 'hazırlık'],
    context:
      'En iyi potansiyelin, bilinçli dinlenmeyle içsel gücü yenilemektir.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ps_pos4',
    card: 'Five of Swords',
    position: 4,
    upright:
      'Beş Kılıç, en iyi potansiyelin gereksiz mücadelelerden uzak durmak, gururu bırakmak ve yapıcı yollarla zafer kazanmaktır.',
    reversed:
      'Ters Beş Kılıç, potansiyelini ortaya çıkarmak için kavgaları geride bırakmalı, kırgınlıkları onarmalı ve işbirliğine açık olmalısın.',
    keywords: ['uzlaşma', 'işbirliği', 'olgunluk', 'barış', 'bırakış'],
    context:
      'En iyi potansiyelin, mücadeleyi bilgelikle barışa dönüştürmektir.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ps_pos4',
    card: 'Six of Swords',
    position: 4,
    upright:
      'Altı Kılıç, en iyi potansiyelin zorluklardan uzaklaşıp sakin sulara yönelmek, geçiş süreçlerini kabullenmek ve şifaya alan açmaktır.',
    reversed:
      'Ters Altı Kılıç, potansiyeline ulaşmak için geçmişte sıkışmayı bırakmalı, cesurca ileriye adım atmalı ve yeni yolculuklara izin vermelisin.',
    keywords: ['geçiş', 'ilerleme', 'şifa', 'kabulleniş', 'yolculuk'],
    context: 'En iyi potansiyelin, geçmişten arınarak ileriye yol almaktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ps_pos4',
    card: 'Seven of Swords',
    position: 4,
    upright:
      'Yedi Kılıç, en iyi potansiyelin stratejik düşünmek, zekanı kullanarak doğru zamanda hamle yapmak ve bilinçle hareket etmektir.',
    reversed:
      'Ters Yedi Kılıç, potansiyelini ortaya çıkarmak için dürüstlüğü rehber edinmeli, aldatmalardan arınmalı ve net bir yol izlemelisin.',
    keywords: ['strateji', 'zeka', 'plan', 'dürüstlük', 'uyanıklık'],
    context:
      'En iyi potansiyelin, zekayı dürüstlükle birleştirerek ilerlemektir.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ps_pos4',
    card: 'Eight of Swords',
    position: 4,
    upright:
      'Sekiz Kılıç, en iyi potansiyelin zihinsel sınırları fark edip aşmak, özgürlüğü seçmek ve korkuların yerine inancı koymaktır.',
    reversed:
      'Ters Sekiz Kılıç, potansiyeline ulaşmak için kendini kurban görmekten vazgeçmeli, özgürlük bilincini geliştirmeli ve yeni olasılıklara izin vermelisin.',
    keywords: ['özgürlük', 'korku', 'zihin', 'sınırsızlık', 'inanç'],
    context:
      'En iyi potansiyelin, zihinsel zincirlerden kurtularak özgürlüğe yönelmektir.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ps_pos4',
    card: 'Nine of Swords',
    position: 4,
    upright:
      'Dokuz Kılıç, en iyi potansiyelin korkularınla yüzleşmek, kaygılarını bilinçle yönetmek ve zihinsel huzuru yeniden kazanmak olabilir.',
    reversed:
      'Ters Dokuz Kılıç, potansiyelini açığa çıkarmak için sürekli endişelerden sıyrılmalı, destek almalı ve umutlu bir bakış açısını benimsemelisin.',
    keywords: ['yüzleşme', 'korku', 'huzur', 'umut', 'zihin'],
    context:
      'En iyi potansiyelin, korkularla yüzleşip zihinsel dengeyi yeniden kurmaktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ps_pos4',
    card: 'Ten of Swords',
    position: 4,
    upright:
      'On Kılıç, en iyi potansiyelin zor bir bitişi kabullenmek, yeniden doğmak ve eski yükleri bırakıp yeni bir başlangıç yapmaktır.',
    reversed:
      'Ters On Kılıç, potansiyelini açığa çıkarmak için kapanışlardan kaçmamalı, sonları bilgelikle kabullenip şifayı seçmelisin.',
    keywords: ['bitiş', 'yeniden doğuş', 'şifa', 'kabulleniş', 'özgürlük'],
    context:
      'En iyi potansiyelin, bitişleri fırsata dönüştürerek yeniden başlamaktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ps_pos4',
    card: 'Page of Swords',
    position: 4,
    upright:
      'Kılıç Prensi, en iyi potansiyelin merakını beslemek, yeni bilgiler öğrenmek ve zekanı yaratıcı biçimde geliştirmektir.',
    reversed:
      'Ters Kılıç Prensi, potansiyelini açığa çıkarmak için dikkatsizlikten, yüzeysellikten ve dedikodulara kapılmaktan kaçınmalısın.',
    keywords: ['öğrenme', 'merak', 'zeka', 'yaratıcılık', 'iletişim'],
    context:
      'En iyi potansiyelin, öğrenme merakını yapıcı şekilde kullanmaktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ps_pos4',
    card: 'Knight of Swords',
    position: 4,
    upright:
      'Kılıç Şövalyesi, en iyi potansiyelin cesaretle harekete geçmek, fikirlerini savunmak ve hedeflerine kararlılıkla ilerlemektir.',
    reversed:
      'Ters Kılıç Şövalyesi, potansiyeline ulaşmak için acelecilikten kaçınmalı, yönünü netleştirmeli ve dikkati dağıtmamalısın.',
    keywords: ['cesaret', 'kararlılık', 'hareket', 'savunma', 'vizyon'],
    context:
      'En iyi potansiyelin, kararlılıkla ilerleyip fikirlerini hayata geçirmektir.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ps_pos4',
    card: 'Queen of Swords',
    position: 4,
    upright:
      'Kılıç Kraliçesi, en iyi potansiyelin objektiflik, keskin zekâ ve bağımsız düşünceyle ilerlemektir.',
    reversed:
      'Ters Kılıç Kraliçesi, potansiyelini açığa çıkarmak için aşırı eleştiriden, katılıktan ve duygusal kopukluktan uzak durmalısın.',
    keywords: ['bağımsızlık', 'zeka', 'objektiflik', 'bilgelik', 'düşünce'],
    context:
      'En iyi potansiyelin, bağımsız ve keskin bir zihinle ilerlemektir.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ps_pos4',
    card: 'King of Swords',
    position: 4,
    upright:
      'Kılıç Kralı, en iyi potansiyelin adil kararlar vermek, bilgeliğinle rehberlik etmek ve mantıkla düzen kurmaktır.',
    reversed:
      'Ters Kılıç Kralı, potansiyeline ulaşmak için otoriterlikten, soğukluktan ve katı tavırlardan uzaklaşmalısın.',
    keywords: ['adalet', 'mantık', 'rehberlik', 'otorite', 'bilgelik'],
    context: 'En iyi potansiyelin, adaletli ve mantıklı bir rehber olmaktır.',
    group: 'Kılıçlar',
  },

  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_ps_pos4',
    card: 'Ace of Pentacles',
    position: 4,
    upright:
      'Tılsım Ası, en iyi potansiyelin sağlam temeller üzerine yeni fırsatlar inşa etmek, bolluk yaratmak ve somut bir başlangıç yapmaktır.',
    reversed:
      'Ters Tılsım Ası, potansiyeline ulaşmak için kaçırma korkusunu bırakmalı, güvenle yeni adımlar atmalı ve istikrarı seçmelisin.',
    keywords: ['başlangıç', 'bolluk', 'istikrar', 'güvence', 'fırsat'],
    context:
      'En iyi potansiyelin, yeni maddi fırsatları güvenle değerlendirmektir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ps_pos4',
    card: 'Two of Pentacles',
    position: 4,
    upright:
      'İki Tılsım, en iyi potansiyelin esneklik geliştirmek, birden fazla sorumluluğu dengeyle yönetmek ve uyumla ilerlemektir.',
    reversed:
      'Ters İki Tılsım, potansiyeline ulaşmak için kararsızlıkları bırakmalı, enerjini dağıtan konuları sadeleştirmelisin.',
    keywords: ['denge', 'esneklik', 'uyum', 'sorumluluk', 'odak'],
    context:
      'En iyi potansiyelin, sorumluluklarını dengeyle yönetmekten doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ps_pos4',
    card: 'Three of Pentacles',
    position: 4,
    upright:
      'Üç Tılsım, en iyi potansiyelin işbirliği kurmak, bilgi ve becerilerini uyumla harmanlayarak başarıyı paylaşmaktır.',
    reversed:
      'Ters Üç Tılsım, potansiyelini açmak için tek başına direnmek yerine destek almalı ve ekip çalışmasına açık olmalısın.',
    keywords: ['işbirliği', 'paylaşım', 'beceri', 'uyum', 'başarı'],
    context: 'En iyi potansiyelin, işbirliğiyle somut başarı inşa etmektir.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ps_pos4',
    card: 'Four of Pentacles',
    position: 4,
    upright:
      'Dört Tılsım, en iyi potansiyelin güvenliği sağlamak, kaynaklarını bilinçle korumak ve sağlam temeller üzerine ilerlemektir.',
    reversed:
      'Ters Dört Tılsım, potansiyeline ulaşmak için aşırı kontrolü bırakmalı, paylaşmayı ve esnekliği öğrenmelisin.',
    keywords: ['güvence', 'koruma', 'istikrar', 'kontrol', 'kaynak'],
    context:
      'En iyi potansiyelin, sağlam ve güvenli temeller üzerine inşa etmektir.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ps_pos4',
    card: 'Five of Pentacles',
    position: 4,
    upright:
      'Beş Tılsım, en iyi potansiyelin zorluklardan ders çıkarıp dayanıklılığını geliştirmek, destek sistemleriyle güçlenmek olabilir.',
    reversed:
      'Ters Beş Tılsım, potansiyeline ulaşmak için yetersizlik inancını bırakmalı, yardımı kabul etmeli ve güven duygunu yenilemelisin.',
    keywords: ['dayanıklılık', 'destek', 'zorluk', 'şifa', 'güven'],
    context: 'En iyi potansiyelin, zorlukları dayanıklılıkla aşmaktır.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ps_pos4',
    card: 'Six of Pentacles',
    position: 4,
    upright:
      'Altı Tılsım, en iyi potansiyelin adil paylaşım, yardımlaşma ve dengeyle bolluğu çoğaltmaktır.',
    reversed:
      'Ters Altı Tılsım, potansiyelini açmak için tek taraflı ilişkileri bırakmalı, alma-verme dengesini kurmalısın.',
    keywords: ['adalet', 'paylaşım', 'denge', 'yardım', 'bolluk'],
    context: 'En iyi potansiyelin, adil ve dengeli paylaşımda bulunmaktır.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ps_pos4',
    card: 'Seven of Pentacles',
    position: 4,
    upright:
      'Yedi Tılsım, en iyi potansiyelin sabırla emek vermek, süreçlere güvenmek ve uzun vadeli kazançlar için yatırım yapmaktır.',
    reversed:
      'Ters Yedi Tılsım, potansiyelini açmak için sabırsızlığı bırakmalı, doğru alanlara odaklanmalısın.',
    keywords: ['sabır', 'emek', 'yatırım', 'süreç', 'bekleyiş'],
    context:
      'En iyi potansiyelin, sabırla verilen emeğin meyvesini toplamaktır.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ps_pos4',
    card: 'Eight of Pentacles',
    position: 4,
    upright:
      'Sekiz Tılsım, en iyi potansiyelin çalışkanlıkla becerilerini geliştirmek, ustalaşmak ve disiplinle başarıya yürümektir.',
    reversed:
      'Ters Sekiz Tılsım, potansiyeline ulaşmak için özensizlikten kaçmalı, öğrenmeye açık kalmalı ve disiplinini korumalısın.',
    keywords: ['ustalık', 'çalışkanlık', 'disiplin', 'öğrenme', 'başarı'],
    context: 'En iyi potansiyelin, çalışarak ustalığa erişmektir.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ps_pos4',
    card: 'Nine of Pentacles',
    position: 4,
    upright:
      'Dokuz Tılsım, en iyi potansiyelin bağımsızlık, öz değerini bilmek ve kendi emeğinin meyvesini tatmaktır.',
    reversed:
      'Ters Dokuz Tılsım, potansiyelini açmak için yalnızlık korkusunu bırakmalı ve özgüvenini güçlendirmelisin.',
    keywords: ['bağımsızlık', 'öz değer', 'özgüven', 'başarı', 'tatmin'],
    context:
      'En iyi potansiyelin, kendi emeğinin meyvesini özgüvenle tatmaktır.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ps_pos4',
    card: 'Ten of Pentacles',
    position: 4,
    upright:
      'On Tılsım, en iyi potansiyelin kalıcı istikrar, ailevi mutluluk ve uzun vadeli güvence kurmaktır.',
    reversed:
      'Ters On Tılsım, potansiyeline ulaşmak için kısa vadeli çıkarları bırakmalı, kalıcı değerlere odaklanmalısın.',
    keywords: ['istikrar', 'aile', 'güvence', 'miras', 'bolluk'],
    context: 'En iyi potansiyelin, kalıcı istikrar ve güvence inşa etmektir.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ps_pos4',
    card: 'Page of Pentacles',
    position: 4,
    upright:
      'Tılsım Prensi, en iyi potansiyelin öğrenmeye açık olmak, yeni fırsatları araştırmak ve planlarını sabırla inşa etmektir.',
    reversed:
      'Ters Tılsım Prensi, potansiyelini ortaya çıkarmak için dikkatsizlikten ve yarım kalmış projelerden uzak durmalısın.',
    keywords: ['öğrenme', 'plan', 'fırsat', 'sabır', 'istikrar'],
    context:
      'En iyi potansiyelin, öğrenme isteğiyle yeni başlangıçlar yapmaktır.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ps_pos4',
    card: 'Knight of Pentacles',
    position: 4,
    upright:
      'Tılsım Şövalyesi, en iyi potansiyelin azimle, sabırla ve disiplinle istikrarlı biçimde ilerlemektir.',
    reversed:
      'Ters Tılsım Şövalyesi, potansiyelini engelleyen tembellikten ve aşırı durağanlıktan uzak durmalısın.',
    keywords: ['istikrar', 'sabır', 'azim', 'disiplin', 'ilerleyiş'],
    context: 'En iyi potansiyelin, sabır ve disiplinle ilerlemektir.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ps_pos4',
    card: 'Queen of Pentacles',
    position: 4,
    upright:
      'Tılsım Kraliçesi, en iyi potansiyelin şefkatle üretmek, kaynaklarını bereketle yönetmek ve dengeyle bolluğu paylaşmaktır.',
    reversed:
      'Ters Tılsım Kraliçesi, potansiyeline ulaşmak için öz bakımı ihmal etmemeli, savurganlıktan uzak durmalısın.',
    keywords: ['şefkat', 'bolluk', 'üretkenlik', 'kaynak yönetimi', 'denge'],
    context:
      'En iyi potansiyelin, şefkatle kaynaklarını yönetip bereketi paylaşmaktır.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ps_pos4',
    card: 'King of Pentacles',
    position: 4,
    upright:
      'Tılsım Kralı, en iyi potansiyelin güvenli bir düzen kurmak, başarıyı kalıcı hale getirmek ve bilgeliğinle başkalarına rehber olmaktır.',
    reversed:
      'Ters Tılsım Kralı, potansiyelini açığa çıkarmak için maddi kaygılara aşırı kapılmamalı ve kontrol ihtiyacını esnetmelisin.',
    keywords: ['başarı', 'güven', 'bolluk', 'rehberlik', 'istikrar'],
    context:
      'En iyi potansiyelin, güven ve bollukla kalıcı bir düzen kurmaktır.',
    group: 'Tılsımlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_ps_pos4',
    card: 'Ace of Wands',
    position: 4,
    upright:
      'Değnek Ası, en iyi potansiyelin yeni fikirleri hayata geçirmek, tutkularını eyleme dökmek ve ilhamı cesur adımlara dönüştürmektir.',
    reversed:
      'Ters Değnek Ası, potansiyeline ulaşmak için ertelemeyi bırakmalı, cesaretini toplamalı ve motivasyonunu yeniden yakalamalısın.',
    keywords: ['ilham', 'başlangıç', 'yaratıcılık', 'tutku', 'cesaret'],
    context: 'En iyi potansiyelin, ilhamı eyleme dönüştürmekten doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ps_pos4',
    card: 'Two of Wands',
    position: 4,
    upright:
      'İki Değnek, en iyi potansiyelin geleceği planlamak, vizyonunu genişletmek ve ufuklarını cesaretle keşfetmektir.',
    reversed:
      'Ters İki Değnek, potansiyelini açığa çıkarmak için belirsizlikte kalmayı bırakmalı ve yönünü netleştirmelisin.',
    keywords: ['vizyon', 'plan', 'gelecek', 'cesaret', 'seçim'],
    context: 'En iyi potansiyelin, cesur planlarla geleceği şekillendirmektir.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ps_pos4',
    card: 'Three of Wands',
    position: 4,
    upright:
      'Üç Değnek, en iyi potansiyelin ufkunu genişletmek, fırsatları değerlendirmek ve uzun vadeli başarı için stratejik adımlar atmaktır.',
    reversed:
      'Ters Üç Değnek, potansiyeline ulaşmak için engellere takılmamalı, ertelemeyi bırakmalı ve net bir yön belirlemelisin.',
    keywords: ['fırsat', 'vizyon', 'ilerleme', 'plan', 'ufuk'],
    context:
      'En iyi potansiyelin, ufkunu genişleterek fırsatlara ilerlemektir.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ps_pos4',
    card: 'Four of Wands',
    position: 4,
    upright:
      'Dört Değnek, en iyi potansiyelin kutlamaları paylaşmak, dengeyi bulmak ve istikrarlı temeller üzerine başarı inşa etmektir.',
    reversed:
      'Ters Dört Değnek, potansiyelini açmak için uyumsuzluklardan sıyrılmalı ve aidiyet duygusunu güçlendirmelisin.',
    keywords: ['kutlama', 'denge', 'istikrar', 'aidiyet', 'başarı'],
    context:
      'En iyi potansiyelin, uyumlu bağlar kurup istikrarlı ilerlemektir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ps_pos4',
    card: 'Five of Wands',
    position: 4,
    upright:
      'Beş Değnek, en iyi potansiyelin rekabeti fırsata dönüştürmek, yeteneklerini geliştirmek ve mücadeleden güçlenerek çıkmaktır.',
    reversed:
      'Ters Beş Değnek, potansiyelini açmak için gereksiz çatışmalardan uzaklaşmalı ve enerjini verimli alanlara yöneltmelisin.',
    keywords: ['rekabet', 'mücadele', 'gelişim', 'cesaret', 'fırsat'],
    context: 'En iyi potansiyelin, mücadeleyi büyümeye dönüştürmektir.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ps_pos4',
    card: 'Six of Wands',
    position: 4,
    upright:
      'Altı Değnek, en iyi potansiyelin başarılarını kutlamak, takdir görmek ve güvenle liderlik etmektir.',
    reversed:
      'Ters Altı Değnek, potansiyeline ulaşmak için onay arayışını bırakmalı ve kendi başarını içsel olarak takdir etmelisin.',
    keywords: ['başarı', 'zafer', 'takdir', 'özgüven', 'liderlik'],
    context: 'En iyi potansiyelin, başarılarını sahiplenerek ilerlemektir.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ps_pos4',
    card: 'Seven of Wands',
    position: 4,
    upright:
      'Yedi Değnek, en iyi potansiyelin duruşunu korumak, inançlarını savunmak ve rekabet ortamında ayakta kalmaktır.',
    reversed:
      'Ters Yedi Değnek, potansiyeline ulaşmak için geri adım atmamalı, kararlılıkla sınırlarını savunmalısın.',
    keywords: ['savunma', 'kararlılık', 'cesaret', 'dayanıklılık', 'mücadele'],
    context: 'En iyi potansiyelin, sınırlarını savunmaktan doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ps_pos4',
    card: 'Eight of Wands',
    position: 4,
    upright:
      'Sekiz Değnek, en iyi potansiyelin hızlı ilerlemek, iletişim kurmak ve fırsatları zamanında değerlendirmektir.',
    reversed:
      'Ters Sekiz Değnek, potansiyeline ulaşmak için gecikmeleri bırakmalı ve odaklı, net adımlar atmalısın.',
    keywords: ['hız', 'iletişim', 'ilerleme', 'fırsat', 'odak'],
    context: 'En iyi potansiyelin, hızlı ve odaklı hareket etmektir.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ps_pos4',
    card: 'Nine of Wands',
    position: 4,
    upright:
      'Dokuz Değnek, en iyi potansiyelin zorluklara direnmek, sabırla ayakta kalmak ve deneyimlerini güç kaynağına dönüştürmektir.',
    reversed:
      'Ters Dokuz Değnek, potansiyeline ulaşmak için yorgunluğa yenilmemeli, direnmeye devam etmelisin.',
    keywords: ['direnç', 'sabır', 'deneyim', 'koruma', 'mücadele'],
    context: 'En iyi potansiyelin, sabırlı direnç göstermektir.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ps_pos4',
    card: 'Ten of Wands',
    position: 4,
    upright:
      'On Değnek, en iyi potansiyelin sorumluluklarını bilinçle taşımak, yüklerini düzenlemek ve emeğinin karşılığını almaktır.',
    reversed:
      'Ters On Değnek, potansiyelini açmak için gereksiz yükleri bırakmalı ve sadece sana hizmet eden sorumluluklara odaklanmalısın.',
    keywords: ['sorumluluk', 'yük', 'emek', 'kararlılık', 'azim'],
    context: 'En iyi potansiyelin, bilinçli sorumluluklarla ilerlemektir.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ps_pos4',
    card: 'Page of Wands',
    position: 4,
    upright:
      'Değnek Prensi, en iyi potansiyelin merakla keşfetmek, yeni fikirler denemek ve cesurca harekete geçmektir.',
    reversed:
      'Ters Değnek Prensi, potansiyeline ulaşmak için motivasyonunu canlı tutmalı ve korkularını aşarak adım atmalısın.',
    keywords: ['keşif', 'cesaret', 'ilham', 'başlangıç', 'merak'],
    context: 'En iyi potansiyelin, yeni fikirler keşfetmekten doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ps_pos4',
    card: 'Knight of Wands',
    position: 4,
    upright:
      'Değnek Şövalyesi, en iyi potansiyelin tutkularını eyleme dökmek, cesurca risk almak ve maceracı ruhunu ortaya koymaktır.',
    reversed:
      'Ters Değnek Şövalyesi, potansiyeline ulaşmak için acelecilikten kaçınmalı ve enerjini kontrollü biçimde yönlendirmelisin.',
    keywords: ['tutku', 'cesaret', 'macera', 'hareket', 'enerji'],
    context: 'En iyi potansiyelin, tutkularını cesurca eyleme dökmektir.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ps_pos4',
    card: 'Queen of Wands',
    position: 4,
    upright:
      'Değnek Kraliçesi, en iyi potansiyelin özgüvenini sergilemek, çekiciliğini yaymak ve ilham verici bir liderlik göstermektir.',
    reversed:
      'Ters Değnek Kraliçesi, potansiyeline ulaşmak için güvensizlikten arınmalı ve içsel ışığını parlatmalısın.',
    keywords: ['özgüven', 'liderlik', 'çekim', 'ilham', 'karizma'],
    context: 'En iyi potansiyelin, özgüvenle liderlik etmektir.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ps_pos4',
    card: 'King of Wands',
    position: 4,
    upright:
      'Değnek Kralı, en iyi potansiyelin vizyonunu ortaya koymak, kararlı bir lider olmak ve çevrene ilham vermektir.',
    reversed:
      'Ters Değnek Kralı, potansiyeline ulaşmak için aşırı kontrol ihtiyacını bırakmalı ve vizyonunu paylaşmalısın.',
    keywords: ['vizyon', 'liderlik', 'ilham', 'kararlılık', 'cesaret'],
    context: 'En iyi potansiyelin, vizyonla liderlik etmekten doğuyor.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition4Meaning(
  card: TarotCard
): ProblemSolvingPosition4Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position4Meanings.find(
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
  meaning = position4Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition4MeaningByCardName(
  cardName: string
): ProblemSolvingPosition4Meaning | null {
  return position4Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllProblemSolvingPosition4Meanings(): ProblemSolvingPosition4Meaning[] {
  return position4Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getProblemSolvingPosition4MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): ProblemSolvingPosition4Meaning[] {
  return position4Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition4Meanings = (): I18nProblemSolvingPosition4Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position4Meanings.map(meaning => {
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
export const getI18nPosition4Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nProblemSolvingPosition4Meaning | null => {
  const originalMeaning = position4Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `problem-solving.meanings.${cardKey}.position4.upright`
  );
  const i18nReversed = t(
    `problem-solving.meanings.${cardKey}.position4.reversed`
  );
  const i18nKeywords = t(
    `problem-solving.meanings.${cardKey}.position4.keywords`
  );
  const i18nContext = t(
    `problem-solving.meanings.${cardKey}.position4.context`
  );
  const i18nGroup = t(
    `problem-solving.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
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
const problemSolvingPosition4Exports = {
  position4Meanings,
  getProblemSolvingPosition4Meaning,
  getProblemSolvingPosition4MeaningByCardName,
  getAllProblemSolvingPosition4Meanings,
  getProblemSolvingPosition4MeaningsByGroup,
  getI18nPosition4Meaning,
};

export default problemSolvingPosition4Exports;
