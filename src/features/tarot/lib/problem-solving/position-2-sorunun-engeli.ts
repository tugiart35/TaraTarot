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

export interface ProblemSolvingPosition2Meaning {
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
export interface I18nProblemSolvingPosition2Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position2Meanings: ProblemSolvingPosition2Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ps_pos2',
    card: 'The Fool',
    position: 2,
    upright:
      'Joker, engelin temelinde düşünmeden atılan adımlar, aşırı risk alma veya plansızlık olabilir. Sorunun önünde duranın aslında sabırsızca yeniye atlama isteğin olduğunu gösterir.',
    reversed:
      'Ters Joker, engelin kaynağı dikkatsizlik, sorumsuzluk veya sürekli ertelediğin risklerdir. Belirsizlikten kaçarken cesaretini de kaybediyor olabilirsin.',
    keywords: ['risk', 'plansızlık', 'belirsizlik', 'sabırsızlık', 'engel'],
    context: 'Engel, belirsizlik ve plansız adımlardan kaynaklanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ps_pos2',
    card: 'The Magician',
    position: 2,
    upright:
      'Büyücü, engelin merkezinde potansiyelini doğru kullanmamak, dağınıklık veya kendine güvenmemek olabilir. Sahip olduğun yetenekleri uygulamaya koymakta zorlanıyor olabilirsin.',
    reversed:
      'Ters Büyücü, manipülasyon, yanıltıcı durumlar veya irade eksikliği engel oluşturuyor olabilir. Gücünü yanlış alanlara harcamak ilerleyişini zorlaştırıyor.',
    keywords: ['potansiyel', 'güç', 'irade', 'dağınıklık', 'engel'],
    context:
      'Engel, gücünü net ve doğru bir şekilde kullanmamandan kaynaklanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ps_pos2',
    card: 'The High Priestess',
    position: 2,
    upright:
      'Başrahibe, engelin sezgilerini dinlememek, içsel bilgeliğini bastırmak ya da gerçeği görmekten kaçmak olabilir. Bilinçaltındaki korkular önünde duvar örüyor olabilir.',
    reversed:
      'Ters Başrahibe, gizli bilgilerin, sırların veya kendine kapalı olmanın yarattığı engeli işaret eder. Sezgini bastırmak çözümü bulmanı zorlaştırıyor.',
    keywords: ['sezgi', 'gizli bilgi', 'içsel korku', 'kapalılık', 'engel'],
    context: 'Engel, sezgini ve içsel bilgelik sesini bastırmandan doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ps_pos2',
    card: 'The Empress',
    position: 2,
    upright:
      'İmparatoriçe, engelin yaratıcılığını ifade edememek, aşırı bağımlı olmak ya da üretkenliğini kısıtlamak olabilir. Kendi doğallığını serbest bırakmadığında gelişim de tıkanıyor.',
    reversed:
      'Ters İmparatoriçe, aşırı korumacılık, üretkenlik eksikliği veya aşırı bağlılık engeli gösterir. Yaratıcı akışını kısıtlayan bağlardan özgürleşmen gerekiyor.',
    keywords: ['yaratıcılık', 'üretkenlik', 'bağımlılık', 'kısıtlama', 'engel'],
    context:
      'Engel, yaratıcılığını baskılamandan ve bağımlı ilişkilerden kaynaklanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ps_pos2',
    card: 'The Emperor',
    position: 2,
    upright:
      'İmparator, engelin aşırı otorite, kuralların baskısı veya disiplinin katılığı olabilir. Fazla kontrolcü bir yapı, özgür hareket etmene engel oluyor.',
    reversed:
      'Ters İmparator, kuralsızlık, dağınıklık ya da otoriteyle çatışma problemini büyütüyor olabilir. Aşırı baskıcı tavırlar da esnekliğini kaybettiriyor.',
    keywords: ['kontrol', 'otorite', 'kurallar', 'katılık', 'engel'],
    context: 'Engel, katı kurallar ve kontrol etme ihtiyacından kaynaklanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ps_pos2',
    card: 'The Hierophant',
    position: 2,
    upright:
      'Aziz, engelin geleneklere fazla bağlı kalmak, toplumun beklentilerine göre hareket etmek olabilir. Bu durum özgün çözümler üretmeni engelliyor.',
    reversed:
      'Ters Aziz, kuralları reddetmek, rehbersizlik veya isyanın yarattığı düzensizlik engeli oluşturuyor olabilir.',
    keywords: ['gelenek', 'otorite', 'beklenti', 'rehberlik', 'engel'],
    context: 'Engel, kurallar ve toplum baskısının aşırı etkisinden doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos2',
    card: 'The Lovers',
    position: 2,
    upright:
      'Aşıklar, engelin kararsızlık, değerler arasında çatışma veya yanlış seçimler olabilir. İkili bir yol ayrımı seni durduruyor.',
    reversed:
      'Ters Aşıklar, uyumsuzluk, yanlış ortaklıklar veya değersel çatışmaların yarattığı engeli gösterir.',
    keywords: ['seçim', 'kararsızlık', 'çatışma', 'ilişki', 'engel'],
    context:
      'Engel, seçim yapamamak veya yanlış seçimlerin etkisinden doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ps_pos2',
    card: 'The Chariot',
    position: 2,
    upright:
      'Savaş Arabası, engelin yönsüzlük, kontrol kaybı veya kararlılık eksikliği olabilir. Hedefe odaklanamadığında ilerleme de duruyor.',
    reversed:
      'Ters Savaş Arabası, kaos, aşırı hırs ya da dağınıklık nedeniyle yolun tıkanıyor olabilir.',
    keywords: ['kontrol', 'irade', 'yön', 'kaos', 'engel'],
    context: 'Engel, net bir yön ve kararlılık eksikliğinden kaynaklanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ps_pos2',
    card: 'Strength',
    position: 2,
    upright:
      'Güç, engelin sabırsızlık, öz güven eksikliği veya içsel korkular olabilir. Cesaretini kullanmadığında problem büyüyor.',
    reversed:
      'Ters Güç, korkulara yenik düşmek, kontrolü kaybetmek veya öfkeye kapılmak engelin kaynağı olabilir.',
    keywords: ['cesaret', 'öz güven', 'korku', 'sabır', 'engel'],
    context:
      'Engel, içsel korkuların ve öz güven eksikliğinin etkisinden doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ps_pos2',
    card: 'The Hermit',
    position: 2,
    upright:
      'Ermiş, engelin aşırı içe kapanmak, yalnızlığa sığınmak veya rehberlik almamak olabilir. Sorunu kendi başına çözmeye çalışmak seni yoruyor.',
    reversed:
      'Ters Ermiş, izolasyon, rehberlikten kaçma veya dünyadan uzaklaşmak problemini büyütüyor olabilir.',
    keywords: ['yalnızlık', 'rehberlik', 'içe dönüş', 'izolasyon', 'engel'],
    context: 'Engel, aşırı yalnızlaşma ve destek almaktan kaçınmadan doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ps_pos2',
    card: 'The Wheel of Fortune',
    position: 2,
    upright:
      'Kader Çarkı, engelin kontrol dışı olaylar, şans faktörü veya değişimlere direnmek olabilir. Döngülerin farkına varamadığında zorlanıyorsun.',
    reversed:
      'Ters Kader Çarkı, talihsizlik, yanlış zamanlama veya sürekli tekrar eden olumsuz döngüler engel oluşturuyor olabilir.',
    keywords: ['kader', 'döngü', 'talih', 'zamanlama', 'engel'],
    context:
      'Engel, döngülerden çıkamamak ve değişimi kabullenememekten doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ps_pos2',
    card: 'Justice',
    position: 2,
    upright:
      'Adalet, engelin dürüstlükten sapmak, adaletsiz bir durum veya yanlış kararlar olabilir. Hak ve sorumluluk arasındaki dengeyi kurmakta zorlanıyorsun.',
    reversed:
      'Ters Adalet, adaletsizlik, yanlış anlaşılmalar veya sorumluluk almamak engel oluşturuyor olabilir.',
    keywords: ['adalet', 'sorumluluk', 'denge', 'karar', 'engel'],
    context:
      'Engel, adil karar verememekten ve sorumluluklardan kaçmaktan kaynaklanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ps_pos2',
    card: 'The Hanged Man',
    position: 2,
    upright:
      'Asılan Adam, engelin bakış açını değiştirmemek, teslimiyetten kaçmak veya bir noktaya takılı kalmak olabilir.',
    reversed:
      'Ters Asılan Adam, inatçılık, direnç veya vazgeçememek engel oluşturuyor olabilir.',
    keywords: ['bakış açısı', 'teslimiyet', 'inat', 'tutulma', 'engel'],
    context: 'Engel, farklı bir perspektifi kabul etmemekten kaynaklanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ps_pos2',
    card: 'Death',
    position: 2,
    upright:
      'Ölüm, engelin değişime direnmek, eskiyi bırakmamak veya bir döngüyü kapatamamak olabilir. Yenilenme ihtiyacını reddetmek sorunu büyütüyor.',
    reversed:
      'Ters Ölüm, bitmesi gerekeni sürdürmek veya dönüşümden korkmak engel oluşturuyor olabilir.',
    keywords: ['dönüşüm', 'bitiş', 'değişim', 'korku', 'engel'],
    context: 'Engel, bırakman gerekeni bırakmamaktan doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ps_pos2',
    card: 'Temperance',
    position: 2,
    upright:
      'Denge, engelin aşırılıklar, dengesizlik veya uyum eksikliği olabilir. Ölçülülüğü kaybettiğinde çözüm de zorlaşıyor.',
    reversed:
      'Ters Denge, sabırsızlık, aşırı uçlara gitmek veya uyumsuzluk problemin kaynağı olabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'engel'],
    context: 'Engel, dengeyi kuramamak ve sabırsızlıktan doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ps_pos2',
    card: 'The Devil',
    position: 2,
    upright:
      'Şeytan, engelin bağımlılıklar, korkular veya kontrol kaybı olabilir. Zincirlerinden kurtulmadıkça ilerleyemezsin.',
    reversed:
      'Ters Şeytan, özgürleşememek, kısıtlamalara boyun eğmek veya bağımlı kalmak engel oluşturuyor olabilir.',
    keywords: ['bağımlılık', 'korku', 'kısıtlama', 'özgürlük', 'engel'],
    context: 'Engel, bağımlı olduğun alışkanlıklar ve korkulardan doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ps_pos2',
    card: 'The Tower',
    position: 2,
    upright:
      'Kule, engelin ani değişimler, krizler veya yıkıcı olaylar olabilir. Beklenmedik sarsıntılar seni hazırlıksız yakalamış olabilir.',
    reversed:
      'Ters Kule, krizleri görmezden gelmek, değişimi ertelemek veya kaosu bastırmak engel oluşturuyor olabilir.',
    keywords: ['kriz', 'değişim', 'yıkım', 'kaos', 'engel'],
    context: 'Engel, ani yıkımlar ve krizlerle yüzleşmemekten doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ps_pos2',
    card: 'The Star',
    position: 2,
    upright:
      'Yıldız, engelin umutsuzluk, ilham kaybı veya vizyon eksikliği olabilir. Yolunu aydınlatacak ışığı kaybetmek zorlaştırıyor.',
    reversed:
      'Ters Yıldız, karamsarlık, güven kaybı veya rehberlik eksikliği engelin kaynağı olabilir.',
    keywords: ['umut', 'vizyon', 'ilham', 'karamsarlık', 'engel'],
    context: 'Engel, umut kaybı ve karamsar bakış açısından doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'two_of_cups_ps_pos2',
    card: 'Two of Cups',
    position: 2,
    upright:
      'Kadehler İkilisi, engelin ilişki sorunları, ortaklık eksikliği veya karşılıklı çekim yokluğu olabilir.',
    reversed:
      'Ters Kadehler İkilisi, ilişki sorunları, ortaklık eksikliği veya karşılıklı çekim yokluğu engel oluşturuyor olabilir.',
    keywords: [
      'ilişki sorunları',
      'ortaklık eksikliği',
      'çekim yokluğu',
      'engel',
    ],
    context: 'Engel, ilişki sorunları ve ortaklık eksikliğinden doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'the_moon_ps_pos2',
    card: 'The Moon',
    position: 2,
    upright:
      'Ay, engelin belirsizlikler, korkular veya yanıltıcı durumlar olabilir. Net göremediğinde doğru çözüm bulmak zorlaşıyor.',
    reversed:
      'Ters Ay, yanılsama, yanlış anlamalar veya korkulara teslim olmak engel oluşturuyor olabilir.',
    keywords: ['belirsizlik', 'korku', 'yanılsama', 'aldanma', 'engel'],
    context: 'Engel, gerçekleri görememek ve korkulara kapılmaktan doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos2',
    card: 'The Sun',
    position: 2,
    upright:
      'Güneş, engelin fazla iyimserlik, gerçekleri görmezden gelmek veya aşırı beklentiler olabilir. Gerçekçi olmamak çözümü zorlaştırıyor.',
    reversed:
      'Ters Güneş, özgüven eksikliği, engellenmiş başarı veya karamsarlık engel oluşturuyor olabilir.',
    keywords: ['iyimserlik', 'başarı', 'özgüven', 'gerçekçilik', 'engel'],
    context: 'Engel, aşırı beklentiler ya da özgüven eksikliğinden doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos2',
    card: 'Judgement',
    position: 2,
    upright:
      'Mahkeme, engelin geçmişle yüzleşmemek, sorumluluklardan kaçmak veya karar vermekte zorlanmak olabilir. Eski yaraları kapatmadıkça çözüm gecikir.',
    reversed:
      'Ters Mahkeme, öz değerlendirmeden kaçmak, kendini kandırmak veya geçmişi reddetmek engel oluşturuyor olabilir.',
    keywords: ['karar', 'geçmiş', 'sorumluluk', 'yüzleşme', 'engel'],
    context: 'Engel, geçmişle yüzleşmemek ve sorumluluktan kaçmaktan doğuyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos2',
    card: 'The World',
    position: 2,
    upright:
      'Dünya, engelin tamamlanmamış işler, kapanmamış döngüler veya bütünlüğe ulaşamamak olabilir. Eksik kalan süreçler seni durduruyor.',
    reversed:
      'Ters Dünya, başarısızlık korkusu, tamamlanamayan hedefler veya sürekli ertelemek engel oluşturuyor olabilir.',
    keywords: ['tamamlanma', 'döngü', 'eksiklik', 'hedef', 'engel'],
    context: 'Engel, kapanmamış döngülerden ve yarım kalmış işlerden doğuyor.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_ps_pos2',
    card: 'Ace of Cups',
    position: 2,
    upright:
      'Kupa Ası, engelin duygusal olarak yeni bir başlangıca hazır olamamak veya hislerini bastırmak olabilir. Kalbini açamadığında sevgi ve ilham akışı da tıkanır.',
    reversed:
      'Ters Kupa Ası, duygusal hayal kırıklıkları, sevgiyi reddetmek veya içsel kapanıklık problemin ana engeli olabilir.',
    keywords: ['duygu', 'başlangıç', 'sezgi', 'sevgi', 'engel'],
    context: 'Engel, duygularını bastırmaktan ve kalbini kapatmaktan doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ps_pos2',
    card: 'Two of Cups',
    position: 2,
    upright:
      'İki Kupa, engelin uyumsuzluk, yanlış ortaklıklar veya bağların zayıflığı olabilir. Birlikte ilerlemen gereken yerde uyum eksikliği seni durduruyor.',
    reversed:
      'Ters İki Kupa, dengesiz ilişkiler, güvensizlik veya bağların kopması problemin kaynağı olabilir.',
    keywords: ['ortaklık', 'uyum', 'güven', 'ilişki', 'engel'],
    context: 'Engel, ilişkilerdeki uyumsuzluk ve güven sorunlarından doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ps_pos2',
    card: 'Three of Cups',
    position: 2,
    upright:
      'Üç Kupa, engelin aşırı sosyallik, dikkatin dağılması veya dış etkilerin fazlalığı olabilir. Kendi odağını kaybettiğinde ilerlemek zorlaşır.',
    reversed:
      'Ters Üç Kupa, yalnızlık, dışlanma ya da destek görememek engeli ortaya çıkarıyor olabilir.',
    keywords: ['destek', 'arkadaşlık', 'sosyallik', 'yalnızlık', 'engel'],
    context:
      'Engel, sosyal çevreden yeterli destek alamamaktan veya aşırı bağımlılıktan doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ps_pos2',
    card: 'Four of Cups',
    position: 2,
    upright:
      'Dört Kupa, engelin ilgisizlik, tatminsizlik veya fırsatları görmemek olabilir. İçine kapanıklık seni çözümden uzaklaştırıyor.',
    reversed:
      'Ters Dört Kupa, sürekli kaçırılan fırsatlar veya dikkatsizlik engeli oluşturuyor olabilir.',
    keywords: ['tatminsizlik', 'ilgisizlik', 'fırsat', 'kapanma', 'engel'],
    context: 'Engel, fırsatları görememek ve ilgisizlikten doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ps_pos2',
    card: 'Five of Cups',
    position: 2,
    upright:
      'Beş Kupa, engelin geçmiş kayıplara fazla odaklanmak, pişmanlık veya suçluluk olabilir. Geçmişe saplanmak seni ilerlemekten alıkoyuyor.',
    reversed:
      'Ters Beş Kupa, ders çıkarmamak veya geçmişin yüklerini bırakmamak engelin kaynağı olabilir.',
    keywords: ['kayıp', 'pişmanlık', 'geçmiş', 'suçluluk', 'engel'],
    context: 'Engel, geçmişe takılı kalmaktan ve bırakmamaktan doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ps_pos2',
    card: 'Six of Cups',
    position: 2,
    upright:
      'Altı Kupa, engelin çocukluk etkileri, nostalji veya geçmişten gelen bağlar olabilir. Eski anılara sıkı sıkıya tutunmak seni durduruyor.',
    reversed:
      'Ters Altı Kupa, geçmişten kopamamak, ileriye bakamamak veya sürekli geriye dönmek engel olabilir.',
    keywords: ['geçmiş', 'çocukluk', 'bağ', 'nostalji', 'engel'],
    context: 'Engel, geçmişten gelen bağların hâlâ etkili olmasından doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ps_pos2',
    card: 'Seven of Cups',
    position: 2,
    upright:
      'Yedi Kupa, engelin fazla seçenek, kafa karışıklığı veya hayallere kapılmak olabilir. Gerçekçi seçim yapamadığında yolun bulanıklaşıyor.',
    reversed:
      'Ters Yedi Kupa, yanlış seçimler, aldanma veya gerçeklerden kopmak engel oluşturuyor olabilir.',
    keywords: ['seçenek', 'hayal', 'karışıklık', 'aldanma', 'engel'],
    context: 'Engel, kafa karışıklığı ve yanlış seçimlerden doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ps_pos2',
    card: 'Eight of Cups',
    position: 2,
    upright:
      'Sekiz Kupa, engelin bırakman gerekeni bırakmamak, tatminsizlikten kaçmak veya bağlılık olabilir. Geride kalanı taşımak seni engelliyor.',
    reversed:
      'Ters Sekiz Kupa, bağımlılık, geri dönmek ya da terk edememek problemin kaynağı olabilir.',
    keywords: ['bırakmak', 'tatminsizlik', 'bağımlılık', 'geri dönüş', 'engel'],
    context: 'Engel, artık seni geliştirmeyen şeyleri bırakmamaktan doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ps_pos2',
    card: 'Nine of Cups',
    position: 2,
    upright:
      'Dokuz Kupa, engelin aşırı beklenti, tatminsizlik ya da sadece kendi mutluluğunu ön planda tutmak olabilir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatminler, doyumsuzluk veya içsel boşluk engelin kaynağı olabilir.',
    keywords: ['tatmin', 'beklenti', 'doyum', 'yüzeysellik', 'engel'],
    context: 'Engel, aşırı beklenti ve içsel tatminsizlikten doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ps_pos2',
    card: 'Ten of Cups',
    position: 2,
    upright:
      'On Kupa, engelin ailevi sorunlar, huzursuzluk veya uyumsuzluk olabilir. Duygusal dengeyi bulamamak ilerleyişini zorlaştırıyor.',
    reversed:
      'Ters On Kupa, kopukluk, güvensizlik veya çatışmalar engelin kaynağı olabilir.',
    keywords: ['aile', 'uyum', 'huzur', 'denge', 'engel'],
    context: 'Engel, huzursuz ilişkiler ve uyum eksikliğinden doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ps_pos2',
    card: 'Page of Cups',
    position: 2,
    upright:
      'Kupa Prensi, engelin duygusal olgunluk eksikliği, hayalcilik veya dikkatsizlik olabilir. Gerçekçi olmadığında çözüm bulmak zorlaşır.',
    reversed:
      'Ters Kupa Prensi, aşırı hassasiyet, hayal dünyasına kaçmak veya dikkatsizlik engelin kaynağı olabilir.',
    keywords: ['hayalcilik', 'duygu', 'olgunluk', 'hassasiyet', 'engel'],
    context:
      'Engel, duygusal olgunluk eksikliği ve hayallere kaçmaktan doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ps_pos2',
    card: 'Knight of Cups',
    position: 2,
    upright:
      'Kupa Şövalyesi, engelin fazla idealizm, romantizm veya gerçeklerden kopmak olabilir. Hayallere fazla kapıldığında ilerlemek zorlaşıyor.',
    reversed:
      'Ters Kupa Şövalyesi, hayal kırıklıkları, gerçek dışı beklentiler veya tutarsızlık problemin kaynağı olabilir.',
    keywords: ['idealizm', 'romantizm', 'hayal', 'tutarsızlık', 'engel'],
    context: 'Engel, hayallere kapılmak ve gerçeklerden uzaklaşmaktan doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ps_pos2',
    card: 'Queen of Cups',
    position: 2,
    upright:
      'Kupa Kraliçesi, engelin aşırı hassasiyet, başkalarının sorunlarını üstlenmek veya duygusal karmaşa olabilir.',
    reversed:
      'Ters Kupa Kraliçesi, bağımlılık, manipülasyon veya duygusal dengesizlik engelin kaynağı olabilir.',
    keywords: ['empati', 'hassasiyet', 'bağımlılık', 'duygu', 'engel'],
    context: 'Engel, aşırı hassasiyet ve duygusal yüklenmeden doğuyor.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ps_pos2',
    card: 'King of Cups',
    position: 2,
    upright:
      'Kupa Kralı, engelin duygularını kontrol edememek, güven eksikliği veya soğukkanlılığı kaybetmek olabilir.',
    reversed:
      'Ters Kupa Kralı, duygusal dengesizlik, bastırılmış öfke veya sorumluluk almamak engelin kaynağı olabilir.',
    keywords: ['denge', 'olgunluk', 'güven', 'sorumluluk', 'engel'],
    context: 'Engel, duygusal olgunluğu kaybetmek ve dengesizlikten doğuyor.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_ps_pos2',
    card: 'Ace of Swords',
    position: 2,
    upright:
      'Kılıç Ası, engelin net düşünememek, gerçeği görememek veya iletişim sorunları olabilir. Zihin berraklığı eksik olduğunda çözüm yolları da bulanık kalır.',
    reversed:
      'Ters Kılıç Ası, kafa karışıklığı, yanıltıcı bilgiler veya yalanlar engel oluşturuyor olabilir.',
    keywords: ['netlik', 'gerçek', 'iletişim', 'kafa karışıklığı', 'engel'],
    context: 'Engel, net düşünememek ve gerçeği görememekten doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ps_pos2',
    card: 'Two of Swords',
    position: 2,
    upright:
      'İki Kılıç, engelin kararsızlık, ikilemler veya gerçekleri görmezden gelmek olabilir. Bir seçim yapamamak seni sıkıştırıyor.',
    reversed:
      'Ters İki Kılıç, inatçılık, karar ertelemek veya gerçeği reddetmek engelin kaynağı olabilir.',
    keywords: ['karar', 'ikilem', 'görmezden gelmek', 'denge', 'engel'],
    context: 'Engel, seçim yapmamak ve gerçekleri reddetmekten doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ps_pos2',
    card: 'Three of Swords',
    position: 2,
    upright:
      'Üç Kılıç, engelin kalp kırıklıkları, acı verici geçmiş deneyimler veya duygusal yaralar olabilir. Bu acılar kararlarını gölgeleyebilir.',
    reversed:
      'Ters Üç Kılıç, geçmişin acılarını iyileştirememen veya eski yaraları taşımak engel oluşturuyor olabilir.',
    keywords: ['acı', 'yaralar', 'kayıp', 'geçmiş', 'engel'],
    context: 'Engel, geçmiş yaraların hâlâ etkisini sürdürmesinden doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ps_pos2',
    card: 'Four of Swords',
    position: 2,
    upright:
      'Dört Kılıç, engelin harekete geçmemek, dinlenmeye fazlaca kapanmak veya erteleme olabilir. Sürekli beklemek çözümden uzaklaştırıyor.',
    reversed:
      'Ters Dört Kılıç, aşırı yorgunluk, tükenmişlik ya da kaçış eğilimi engelin kaynağı olabilir.',
    keywords: ['dinlenme', 'erteleme', 'kaçış', 'tükenmişlik', 'engel'],
    context: 'Engel, eylemsizlik ve ertelemeden doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ps_pos2',
    card: 'Five of Swords',
    position: 2,
    upright:
      'Beş Kılıç, engelin çatışmalar, gereksiz tartışmalar veya gurur olabilir. Kazanmak adına kaybettiklerin çözüme engel oluyor.',
    reversed:
      'Ters Beş Kılıç, kin tutmak, yanlış mücadeleler veya yenilgiyi kabul edememek engelin kaynağı olabilir.',
    keywords: ['çatışma', 'tartışma', 'ego', 'gurur', 'engel'],
    context: 'Engel, gereksiz çatışmalara takılmaktan doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ps_pos2',
    card: 'Six of Swords',
    position: 2,
    upright:
      'Altı Kılıç, engelin geçmişten kopamamak, taşınmakta zorlanmak veya ileriye gidememek olabilir. Eski alışkanlıklar seni tutuyor.',
    reversed:
      'Ters Altı Kılıç, sürekli geçmişe dönmek, ilerlemeyi reddetmek veya zihinsel tıkanıklık engel oluşturuyor olabilir.',
    keywords: ['geçiş', 'geçmiş', 'ilerleme', 'tutulma', 'engel'],
    context: 'Engel, geçmişten kopamamak ve ileriye gidememekten doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ps_pos2',
    card: 'Seven of Swords',
    position: 2,
    upright:
      'Yedi Kılıç, engelin dürüst olmamak, gizlilik ya da stratejik oyunlar olabilir. Gerçeklerden kaçmak çözümü zorlaştırıyor.',
    reversed:
      'Ters Yedi Kılıç, açığa çıkan sırlar, güven kaybı veya başarısız planlar engelin kaynağı olabilir.',
    keywords: ['gizlilik', 'hile', 'güven', 'kaçış', 'engel'],
    context: 'Engel, gizlilik ve dürüstlükten sapmaktan doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ps_pos2',
    card: 'Eight of Swords',
    position: 2,
    upright:
      'Sekiz Kılıç, engelin zihinsel engeller, çaresizlik hissi veya sıkışmışlık olabilir. Özgürlüğünü fark edememek çözümü görmeni engelliyor.',
    reversed:
      'Ters Sekiz Kılıç, kendi yarattığın sınırlamalardan çıkamamak veya korkulara teslim olmak problemin kaynağı olabilir.',
    keywords: ['sınırlama', 'korku', 'zihin', 'özgürlük', 'engel'],
    context:
      'Engel, zihinsel engeller ve kendi yarattığın sınırlamalardan doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ps_pos2',
    card: 'Nine of Swords',
    position: 2,
    upright:
      'Dokuz Kılıç, engelin kaygılar, uykusuzluk veya suçluluk olabilir. Zihin sürekli endişeyle dolu olduğunda çözüm bulanıklaşır.',
    reversed:
      'Ters Dokuz Kılıç, korkularla yüzleşememek, bastırılmış suçluluk ya da aşırı stres engelin kaynağı olabilir.',
    keywords: ['kaygı', 'stres', 'endişe', 'korku', 'engel'],
    context: 'Engel, aşırı kaygı ve stresle zihnini meşgul etmekten doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ps_pos2',
    card: 'Ten of Swords',
    position: 2,
    upright:
      'On Kılıç, engelin bitişi kabul etmemek, ihanetin yaralarını kapatamamak veya yenilenmekten kaçmak olabilir.',
    reversed:
      'Ters On Kılıç, eski yaraları sürekli açmak veya kapanışa direnmek engelin kaynağı olabilir.',
    keywords: ['bitiş', 'ihanet', 'yenilenme', 'geçmiş', 'engel'],
    context: 'Engel, bir bitişi kabullenmemekten doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ps_pos2',
    card: 'Page of Swords',
    position: 2,
    upright:
      'Kılıç Prensi, engelin dikkatsizlik, yüzeysellik veya öğrenme isteğini yanlış yönlendirmek olabilir.',
    reversed:
      'Ters Kılıç Prensi, dedikodular, yanlış bilgi toplamak veya odaklanamamak engelin kaynağı olabilir.',
    keywords: ['dikkat', 'merak', 'öğrenme', 'bilgi', 'engel'],
    context: 'Engel, dikkatsizlik ve yüzeysel kalmaktan doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ps_pos2',
    card: 'Knight of Swords',
    position: 2,
    upright:
      'Kılıç Şövalyesi, engelin acelecilik, sabırsızlık veya saldırgan davranışlar olabilir. Çok hızlı hareket etmek çözümü zorlaştırıyor.',
    reversed:
      'Ters Kılıç Şövalyesi, yönsüz koşmak, dikkatsizlik veya fevrilik engelin kaynağı olabilir.',
    keywords: ['acele', 'sabırsızlık', 'hedef', 'fevrilik', 'engel'],
    context: 'Engel, aceleci kararlar ve sabırsızlıktan doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ps_pos2',
    card: 'Queen of Swords',
    position: 2,
    upright:
      'Kılıç Kraliçesi, engelin aşırı eleştirel olmak, soğuk davranışlar veya mesafe koymak olabilir. Fazla mantık duyguları bastırıyor.',
    reversed:
      'Ters Kılıç Kraliçesi, katılık, aşırı yargılamak veya anlayış eksikliği engelin kaynağı olabilir.',
    keywords: ['eleştiri', 'soğukluk', 'mantık', 'yargı', 'engel'],
    context: 'Engel, aşırı eleştirel ve soğuk yaklaşımdan doğuyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ps_pos2',
    card: 'King of Swords',
    position: 2,
    upright:
      'Kılıç Kralı, engelin otorite baskısı, aşırı mantık veya katı kurallar olabilir. Fazla katı olmak esnekliği engelliyor.',
    reversed:
      'Ters Kılıç Kralı, adaletsizlik, otoriteyle çatışma veya soğuk tavırlar engelin kaynağı olabilir.',
    keywords: ['otorite', 'mantık', 'katılık', 'adalet', 'engel'],
    context: 'Engel, katı kurallar ve mantığın aşırı baskısından doğuyor.',
    group: 'Kılıçlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_ps_pos2',
    card: 'Ace of Wands',
    position: 2,
    upright:
      'Asa Ası, engelin motivasyon eksikliği, ilhamını kaybetmek veya başlangıç cesaretini bulamamak olabilir. İçindeki ateş yanmadığında yeni fırsatları değerlendirmek zorlaşır.',
    reversed:
      'Ters Asa Ası, yarım kalmış projeler, hevesin çabuk sönmesi veya engellenmiş yaratıcılık problemin kaynağı olabilir.',
    keywords: ['ilham', 'motivasyon', 'yaratıcılık', 'başlangıç', 'engel'],
    context: 'Engel, ilham ve motivasyon eksikliğinden doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ps_pos2',
    card: 'Two of Wands',
    position: 2,
    upright:
      'İki Asa, engelin geleceğe dair net bir vizyon oluşturamamak, dar görüşlü olmak veya karar verememek olabilir.',
    reversed:
      'Ters İki Asa, cesaret eksikliği, fırsatları küçümsemek veya güven sorunları engel olabilir.',
    keywords: ['vizyon', 'gelecek', 'cesaret', 'dar görüş', 'engel'],
    context: 'Engel, vizyon eksikliği ve adım atmaktan çekinmekten doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ps_pos2',
    card: 'Three of Wands',
    position: 2,
    upright:
      'Üç Asa, engelin fırsatları görememek, beklemek veya genişlemeye cesaret edememek olabilir. Ufka bakamadığında yolunu da kısıtlı görürsün.',
    reversed:
      'Ters Üç Asa, yanlış planlar, belirsizlik veya vizyonsuzluk engelin kaynağı olabilir.',
    keywords: ['fırsat', 'vizyon', 'plan', 'belirsizlik', 'engel'],
    context:
      'Engel, fırsatları değerlendirememek ve vizyon eksikliğinden doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ps_pos2',
    card: 'Four of Wands',
    position: 2,
    upright:
      'Dört Asa, engelin istikrar bulamamak, temelsiz ilişkiler veya uyumsuzluk olabilir. Sağlam bir temel olmadığında ilerlemek zorlaşır.',
    reversed:
      'Ters Dört Asa, huzursuzluk, kutlama fırsatlarının kaçırılması veya ev/iş düzeninde aksaklık engelin kaynağı olabilir.',
    keywords: ['istikrar', 'uyum', 'temel', 'huzursuzluk', 'engel'],
    context: 'Engel, istikrarsızlık ve temelsizlikten doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ps_pos2',
    card: 'Five of Wands',
    position: 2,
    upright:
      'Beş Asa, engelin sürekli rekabet, çatışma veya işbirliği eksikliği olabilir. Güç mücadelesi çözüm yollarını kapatıyor.',
    reversed:
      'Ters Beş Asa, pasiflik, kendini savunamamak veya gereksiz tartışmalar engel oluşturuyor olabilir.',
    keywords: [
      'rekabet',
      'çatışma',
      'işbirliği eksikliği',
      'mücadele',
      'engel',
    ],
    context: 'Engel, sürekli mücadele ve uyumsuzluklardan doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ps_pos2',
    card: 'Six of Wands',
    position: 2,
    upright:
      'Altı Asa, engelin takdir görmemek, görünmez kalmak veya başarıya ulaşamamak olabilir. Değerinin fark edilmemesi ilerleyişini zorlaştırıyor.',
    reversed:
      'Ters Altı Asa, kibir, başarısızlık korkusu veya kıskançlık engelin kaynağı olabilir.',
    keywords: ['başarı', 'takdir', 'görünürlük', 'kibir', 'engel'],
    context: 'Engel, takdir görmemek ve değersiz hissetmekten doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ps_pos2',
    card: 'Seven of Wands',
    position: 2,
    upright:
      'Yedi Asa, engelin kendini savunamamak, direnç eksikliği veya baskılara boyun eğmek olabilir.',
    reversed:
      'Ters Yedi Asa, vazgeçmek, güvensizlik veya mücadeleyi bırakmak engel oluşturuyor olabilir.',
    keywords: ['direnç', 'savunma', 'cesaret', 'güvensizlik', 'engel'],
    context: 'Engel, direnç eksikliği ve kendini savunamamaktan doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ps_pos2',
    card: 'Eight of Wands',
    position: 2,
    upright:
      'Sekiz Asa, engelin gecikmeler, iletişim sorunları veya hız kaybı olabilir. Süreçlerin yavaş ilerlemesi çözümü engelliyor.',
    reversed:
      'Ters Sekiz Asa, yanlış anlaşılmalar, tıkanıklıklar veya sürekli ertelemeler engelin kaynağı olabilir.',
    keywords: ['iletişim', 'gecikme', 'hız', 'tıkanıklık', 'engel'],
    context: 'Engel, iletişimdeki sorunlar ve yavaşlamadan doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ps_pos2',
    card: 'Nine of Wands',
    position: 2,
    upright:
      'Dokuz Asa, engelin yorgunluk, sürekli savunmada kalmak veya pes etme noktasına gelmek olabilir.',
    reversed:
      'Ters Dokuz Asa, direnç kaybı, aşırı baskı veya yılgınlık engelin kaynağı olabilir.',
    keywords: ['yorgunluk', 'direnç', 'savunma', 'baskı', 'engel'],
    context: 'Engel, bitkinlik ve dayanıklılığın tükenmesinden doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ps_pos2',
    card: 'Ten of Wands',
    position: 2,
    upright:
      'On Asa, engelin aşırı yük, sorumluluk fazlalığı veya baskılar olabilir. Fazla yük almak ilerlemeni zorlaştırıyor.',
    reversed:
      'Ters On Asa, gereksiz sorumluluklar, paylaşmamak veya tükenmişlik engel oluşturuyor olabilir.',
    keywords: ['yük', 'sorumluluk', 'baskı', 'tükenmişlik', 'engel'],
    context: 'Engel, fazla sorumluluk ve yük taşımaktan doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ps_pos2',
    card: 'Page of Wands',
    position: 2,
    upright:
      'Asa Prensi, engelin sabırsızlık, dikkatsizlik veya öğrenme hevesini yanlış yönlendirmek olabilir.',
    reversed:
      'Ters Asa Prensi, motivasyon eksikliği, hevesin çabuk sönmesi veya amaçsızlık engelin kaynağı olabilir.',
    keywords: ['heves', 'öğrenme', 'sabırsızlık', 'motivasyon', 'engel'],
    context: 'Engel, sabırsızlık ve yanlış yönlendirilmiş hevesten doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ps_pos2',
    card: 'Knight of Wands',
    position: 2,
    upright:
      'Asa Şövalyesi, engelin acelecilik, tutarsızlık veya yönsüz hareket olabilir. Fazla hızlı gitmek çözümü engelliyor.',
    reversed:
      'Ters Asa Şövalyesi, dikkatsizlik, kararsızlık veya aşırı risk almak engelin kaynağı olabilir.',
    keywords: ['acele', 'hareket', 'risk', 'tutarsızlık', 'engel'],
    context: 'Engel, aceleci ve yönsüz hareketlerden doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ps_pos2',
    card: 'Queen of Wands',
    position: 2,
    upright:
      'Asa Kraliçesi, engelin özgüven eksikliği, kıskançlık veya liderlik korkusu olabilir. Kendi ışığını saklamak seni geride tutuyor.',
    reversed:
      'Ters Asa Kraliçesi, otorite sorunları, kararsızlık veya başkalarının gölgesinde kalmak engelin kaynağı olabilir.',
    keywords: ['özgüven', 'liderlik', 'karizma', 'kıskançlık', 'engel'],
    context: 'Engel, özgüven eksikliği ve liderlik korkusundan doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ps_pos2',
    card: 'King of Wands',
    position: 2,
    upright:
      'Asa Kralı, engelin vizyon eksikliği, kontrol sorunları veya yönsüzlük olabilir. Liderlik potansiyelini bastırmak çözümü zorlaştırıyor.',
    reversed:
      'Ters Asa Kralı, baskıcılık, sabırsızlık veya vizyon yoksunluğu engelin kaynağı olabilir.',
    keywords: ['vizyon', 'kontrol', 'liderlik', 'yön', 'engel'],
    context: 'Engel, vizyon eksikliği ve kontrol sorunlarından doğuyor.',
    group: 'Asalar',
  },

  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_ps_pos2',
    card: 'Ace of Pentacles',
    position: 2,
    upright:
      'Tılsım Ası, engelin yeni fırsatları görememek, maddi güvensizlik veya başlangıç için gereken temeli bulamamak olabilir. Sağlam zeminin olmadığında ilerlemek de zorlaşır.',
    reversed:
      'Ters Tılsım Ası, kaçırılan fırsatlar, istikrarsızlık veya yanlış yatırımlar engelin kaynağı olabilir.',
    keywords: ['fırsat', 'maddi güven', 'temel', 'yatırım', 'engel'],
    context:
      'Engel, fırsatları değerlendirememek ve güvence eksikliğinden doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ps_pos2',
    card: 'Two of Pentacles',
    position: 2,
    upright:
      'İki Tılsım, engelin denge kuramamak, aşırı sorumluluk veya önceliklerini ayarlayamamak olabilir. Fazla yük almak ilerleyişi zorlaştırır.',
    reversed:
      'Ters İki Tılsım, kontrolsüzlük, kaynakları kötü yönetmek veya sürekli kararsızlık engelin kaynağı olabilir.',
    keywords: ['denge', 'öncelik', 'sorumluluk', 'kontrol', 'engel'],
    context: 'Engel, dengesizlik ve öncelikleri belirleyememekten doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ps_pos2',
    card: 'Three of Pentacles',
    position: 2,
    upright:
      'Üç Tılsım, engelin işbirliği eksikliği, uyumsuzluk veya destek görmemek olabilir. Tek başına ilerlemek seni sınırlandırıyor.',
    reversed:
      'Ters Üç Tılsım, kötü takım çalışması, iletişim kopukluğu veya yalnız kalmak engelin kaynağı olabilir.',
    keywords: ['işbirliği', 'destek', 'uyum', 'ekip', 'engel'],
    context: 'Engel, işbirliği eksikliğinden ve destek görmemekten doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ps_pos2',
    card: 'Four of Pentacles',
    position: 2,
    upright:
      'Dört Tılsım, engelin aşırı kontrol, paylaşmamak veya güvenlik takıntısı olabilir. Tutunduğun şeyler seni aynı yerde tutuyor.',
    reversed:
      'Ters Dört Tılsım, cimrilik, kaybetme korkusu veya aşırı sahiplenme engelin kaynağı olabilir.',
    keywords: ['güvenlik', 'kontrol', 'paylaşmamak', 'korku', 'engel'],
    context: 'Engel, aşırı kontrol ve paylaşım eksikliğinden doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ps_pos2',
    card: 'Five of Pentacles',
    position: 2,
    upright:
      'Beş Tılsım, engelin maddi sıkıntılar, yalnızlık veya destek görememek olabilir. Kaynak eksikliği ilerleyişini zorlaştırıyor.',
    reversed:
      'Ters Beş Tılsım, yardımı reddetmek, dışlanmışlık hissi veya özgüven kaybı engelin kaynağı olabilir.',
    keywords: ['maddi zorluk', 'yalnızlık', 'destek', 'güven', 'engel'],
    context: 'Engel, kaynak eksikliği ve yalnızlık duygusundan doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ps_pos2',
    card: 'Six of Pentacles',
    position: 2,
    upright:
      'Altı Tılsım, engelin dengesiz alışveriş, adaletsizlik veya karşılıklı destek görememek olabilir. Paylaşım eksikliği çözümü geciktiriyor.',
    reversed:
      'Ters Altı Tılsım, bağımlı ilişkiler, sömürü veya haksızlık engelin kaynağı olabilir.',
    keywords: ['denge', 'adalet', 'paylaşım', 'bağımlılık', 'engel'],
    context: 'Engel, dengesiz alışveriş ve haksızlıktan doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ps_pos2',
    card: 'Seven of Pentacles',
    position: 2,
    upright:
      'Yedi Tılsım, engelin sabırsızlık, aceleci sonuç beklemek veya emeğin değerini görmemek olabilir.',
    reversed:
      'Ters Yedi Tılsım, yanlış yatırımlar, verimsiz emek veya motivasyon eksikliği engelin kaynağı olabilir.',
    keywords: ['sabır', 'emek', 'beklemek', 'yatırım', 'engel'],
    context:
      'Engel, sabırsızlık ve emeğin karşılığını bekleyememekten doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ps_pos2',
    card: 'Eight of Pentacles',
    position: 2,
    upright:
      'Sekiz Tılsım, engelin disiplinsizlik, özensizlik veya öğrenmeye kapalı olmak olabilir. Ustalığa ulaşmak için gereken çabayı göstermemek ilerleyişini engelliyor.',
    reversed:
      'Ters Sekiz Tılsım, motivasyon kaybı, yarım işler veya dikkatsizlik engelin kaynağı olabilir.',
    keywords: ['disiplin', 'öğrenme', 'ustalık', 'özensizlik', 'engel'],
    context: 'Engel, disiplin eksikliği ve özensizlikten doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ps_pos2',
    card: 'Nine of Pentacles',
    position: 2,
    upright:
      'Dokuz Tılsım, engelin bağımsızlıktan korkmak, özgüven eksikliği veya aşırı bağımlılık olabilir. Özgürleşememek seni sınırlandırıyor.',
    reversed:
      'Ters Dokuz Tılsım, yalnızlık korkusu, maddi bağımlılık veya tatminsizlik engelin kaynağı olabilir.',
    keywords: ['bağımsızlık', 'özgüven', 'tatmin', 'bağımlılık', 'engel'],
    context: 'Engel, bağımsızlık eksikliği ve güvensizlikten doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ps_pos2',
    card: 'Ten of Pentacles',
    position: 2,
    upright:
      'On Tılsım, engelin ailevi sorunlar, kalıcı güvence eksikliği veya maddi istikrarsızlık olabilir. Uzun vadeli istikrarın olmaması seni geride tutuyor.',
    reversed:
      'Ters On Tılsım, miras kavgaları, aile içi çatışmalar veya kalıcı başarıyı kuramamak engelin kaynağı olabilir.',
    keywords: ['aile', 'istikrar', 'maddi güven', 'çatışma', 'engel'],
    context: 'Engel, ailevi veya maddi istikrarsızlıktan doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ps_pos2',
    card: 'Page of Pentacles',
    position: 2,
    upright:
      'Tılsım Prensi, engelin dikkatsizlik, öğrenmeye isteksizlik veya planlarını somutlaştıramamak olabilir. Teoriyi pratiğe dökmemek ilerleyişi zorlaştırıyor.',
    reversed:
      'Ters Tılsım Prensi, motivasyon kaybı, yanlış hedefler veya yarım projeler engelin kaynağı olabilir.',
    keywords: ['öğrenme', 'dikkat', 'motivasyon', 'hedef', 'engel'],
    context: 'Engel, dikkatsizlik ve somut adım atmaktan kaçınmaktan doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ps_pos2',
    card: 'Knight of Pentacles',
    position: 2,
    upright:
      'Tılsım Şövalyesi, engelin durağanlık, aşırı temkinlilik veya motivasyon eksikliği olabilir. Fazla yavaş ilerlemek çözümü zorlaştırıyor.',
    reversed:
      'Ters Tılsım Şövalyesi, tembellik, dikkatsizlik veya plan eksikliği engelin kaynağı olabilir.',
    keywords: ['durağanlık', 'temkin', 'motivasyon', 'plan', 'engel'],
    context: 'Engel, durağanlık ve tembellikten doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ps_pos2',
    card: 'Queen of Pentacles',
    position: 2,
    upright:
      'Tılsım Kraliçesi, engelin öz bakım eksikliği, aşırı sorumluluk almak veya dağınıklık olabilir. Kendini ihmal etmek çözüm yollarını kapatıyor.',
    reversed:
      'Ters Tılsım Kraliçesi, savurganlık, ilgisizlik veya kaynakları kötü yönetmek engelin kaynağı olabilir.',
    keywords: ['öz bakım', 'sorumluluk', 'kaynak', 'dengesizlik', 'engel'],
    context:
      'Engel, kendini ihmal etmek ve kaynakları kötü yönetmekten doğuyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ps_pos2',
    card: 'King of Pentacles',
    position: 2,
    upright:
      'Tılsım Kralı, engelin aşırı kontrol, hırs veya maddi güvenceye bağımlı olmak olabilir. Maddi odaklı kalmak manevi çözümü engelliyor.',
    reversed:
      'Ters Tılsım Kralı, maddi kaygılar, baskıcılık veya doyumsuzluk engelin kaynağı olabilir.',
    keywords: ['kontrol', 'hırs', 'maddi güven', 'doyumsuzluk', 'engel'],
    context: 'Engel, maddi kaygılar ve aşırı kontrol isteğinden doğuyor.',
    group: 'Tılsımlar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition2Meaning(
  card: TarotCard
): ProblemSolvingPosition2Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position2Meanings.find(
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
  meaning = position2Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition2MeaningByCardName(
  cardName: string
): ProblemSolvingPosition2Meaning | null {
  return position2Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllProblemSolvingPosition2Meanings(): ProblemSolvingPosition2Meaning[] {
  return position2Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getProblemSolvingPosition2MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): ProblemSolvingPosition2Meaning[] {
  return position2Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition2Meanings = (): I18nProblemSolvingPosition2Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position2Meanings.map(meaning => {
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
export const getI18nPosition2Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nProblemSolvingPosition2Meaning | null => {
  const originalMeaning = position2Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `problem-solving.meanings.${cardKey}.position2.upright`
  );
  const i18nReversed = t(
    `problem-solving.meanings.${cardKey}.position2.reversed`
  );
  const i18nKeywords = t(
    `problem-solving.meanings.${cardKey}.position2.keywords`
  );
  const i18nContext = t(
    `problem-solving.meanings.${cardKey}.position2.context`
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
const problemSolvingPosition2Exports = {
  position2Meanings,
  getProblemSolvingPosition2Meaning,
  getProblemSolvingPosition2MeaningByCardName,
  getAllProblemSolvingPosition2Meanings,
  getProblemSolvingPosition2MeaningsByGroup,
  getI18nPosition2Meaning,
};

export default problemSolvingPosition2Exports;
