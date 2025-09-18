/*
info:
Bağlantılı dosyalar:
- './position-meanings-index': Ana pozisyon anlamları index dosyası
- '@/types/tarot': Tarot kartı tipi tanımları

Dosyanın amacı:
- Durum Analizi açılımında 1. pozisyon (Geçmiş ya da Sebepler) için 78 tarot kartının özel anlamlarını içerir
- Her kart için upright ve reversed anlamları, anahtar kelimeler ve bağlam bilgileri sağlar
- Pozisyon bazlı kart anlamları yönetimi

Supabase değişkenleri ve tablolar:
- Bu dosya sadece frontend tarafında kullanılır, doğrudan Supabase bağlantısı yok

Geliştirme önerileri:
- i18n desteği genişletilebilir
- Diğer pozisyonlar için benzer dosyalar oluşturulabilir

Tespit edilen hatalar:
- Yok

Kullanım durumları:
- position1Meanings: gerekli
- getPosition1Meaning: gerekli
*/

import { SituationAnalysisPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position1Meanings: SituationAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_sa_pos1',
    card: 'The Fool',
    cardName: 'The Fool',
    position: 1,
    upright:
      'Joker, geçmişte cesurca atılan bir adım, yeni bir başlangıç veya özgür ruhlu bir seçim, bugünkü durumun temelinde yer alıyor olabilir.',
    reversed:
      'Ters Joker, geçmişte dikkatsizce alınan riskler, plansız hareketler veya acelecilik mevcut sürecin sebeplerini oluşturmuş olabilir.',
    keywords: ['yeni başlangıç', 'özgürlük', 'risk', 'merak', 'geçmiş'],
    context: 'Geçmişteki cesur ya da dikkatsiz seçimlerin bugünkü etkileri.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_sa_pos1',
    card: 'The Magician',
    position: 1,
    upright:
      'Büyücü, geçmişte niyet ve odakla yaratılan güçlü bir başlangıcın, bugünkü koşulların temelini oluşturduğunu gösterir.',
    reversed:
      'Ters Büyücü, geçmişteki manipülasyonlar, yanlış yönlendirmeler veya dağınık niyetler bugünkü durumu etkilemiş olabilir.',
    keywords: ['niyet', 'odak', 'yaratma', 'başlangıç', 'geçmiş'],
    context: 'Geçmişteki odaklanma veya manipülasyonun etkileri.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_sa_pos1',
    card: 'The High Priestess',
    position: 1,
    upright:
      'Başrahibe, geçmişte sezgilerine güvenerek aldığın kararlar veya ortaya çıkan gizli gerçekler bugünkü durumun temelini oluşturuyor olabilir.',
    reversed:
      'Ters Başrahibe, geçmişte sezgilerin görmezden gelinmesi ya da gizli bilgilerin saklanması mevcut koşulları etkilemiş olabilir.',
    keywords: ['sezgi', 'bilgelik', 'gizli', 'bilinçaltı', 'geçmiş'],
    context: 'Geçmişte sezgilerin veya gizli bilgilerin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_sa_pos1',
    card: 'The Empress',
    position: 1,
    upright:
      'İmparatoriçe, geçmişteki bereket, yaratıcılık veya güçlü bir destek sürecin temelini oluşturmuş olabilir.',
    reversed:
      'Ters İmparatoriçe, geçmişte üretkenliğin tıkanması, duygusal dengesizlikler veya bağımlılıklar bu sürecin sebebi olabilir.',
    keywords: ['bereket', 'yaratıcılık', 'destek', 'duygu', 'geçmiş'],
    context: 'Geçmişteki üretkenlik veya bağımlılıkların etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_sa_pos1',
    card: 'The Emperor',
    position: 1,
    upright:
      'İmparator, geçmişte kurulan düzen, otorite figürleri veya alınan sağlam kararlar bugünkü duruma zemin hazırlamış olabilir.',
    reversed:
      'Ters İmparator, geçmişteki baskı, katı kurallar veya kontrol kaybı şu anki durumun temel sebeplerini oluşturmuş olabilir.',
    keywords: ['düzen', 'otorite', 'güç', 'kontrol', 'geçmiş'],
    context: 'Geçmişteki düzen veya baskının etkileri.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_sa_pos1',
    card: 'The Hierophant',
    position: 1,
    upright:
      'Aziz, geçmişte alınan eğitimler, gelenekler veya bir otorite figüründen gelen rehberlik bugünkü sürecin temelini oluşturmuş olabilir.',
    reversed:
      'Ters Aziz, geçmişte yanlış rehberlik, kurallara başkaldırı veya sahte öğretiler bugünkü durumun sebepleri olabilir.',
    keywords: ['rehberlik', 'gelenek', 'öğreti', 'bilgelik', 'geçmiş'],
    context: 'Geçmişteki rehberlik veya yanlış öğretilerin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_sa_pos1',
    card: 'The Lovers',
    position: 1,
    upright:
      'Aşıklar, geçmişte verilen kalpten bir karar, ilişkilerdeki uyum ya da ortaklıklar bugünkü duruma yön vermiş olabilir.',
    reversed:
      'Ters Aşıklar, geçmişte yapılan yanlış seçimler, uyumsuz ilişkiler veya ayrılıklar sürecin kökeninde olabilir.',
    keywords: ['ilişki', 'karar', 'uyum', 'seçim', 'geçmiş'],
    context: 'Geçmişteki seçimlerin veya ilişkilerin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_sa_pos1',
    card: 'The Chariot',
    position: 1,
    upright:
      'Savaş Arabası, geçmişteki kararlılık, başarı veya güçlü bir ilerleyiş bugünkü duruma temel oluşturmuş olabilir.',
    reversed:
      'Ters Savaş Arabası, geçmişteki kontrol kaybı, başarısızlık veya yönsüzlük bugünkü koşulları etkilemiş olabilir.',
    keywords: ['kararlılık', 'başarı', 'kontrol', 'ilerleme', 'geçmiş'],
    context: 'Geçmişteki kararlılık veya kontrol kaybının etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_sa_pos1',
    card: 'Strength',
    position: 1,
    upright:
      'Güç, geçmişte gösterilen sabır, cesaret veya içsel dayanıklılık bugünkü durumun kökeninde yer alıyor olabilir.',
    reversed:
      'Ters Güç, geçmişteki sabırsızlık, öfke kontrolü sorunları veya özgüven kaybı sürecin sebeplerini oluşturmuş olabilir.',
    keywords: ['cesaret', 'sabır', 'dayanıklılık', 'özgüven', 'geçmiş'],
    context: 'Geçmişteki güç veya güçsüzlük deneyimlerinin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_sa_pos1',
    card: 'The Hermit',
    position: 1,
    upright:
      'Ermiş, geçmişte yapılan içsel yolculuk, yalnızlık ya da bir arayış bugünkü duruma temel hazırlamış olabilir.',
    reversed:
      'Ters Ermiş, geçmişteki izolasyon, içine kapanıklık ya da yanlış rehberlik sürecin sebeplerini oluşturmuş olabilir.',
    keywords: ['bilgelik', 'arayış', 'yalnızlık', 'rehberlik', 'geçmiş'],
    context: 'Geçmişteki arayış ya da yalnızlığın etkileri.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_sa_pos1',
    card: 'Wheel of Fortune',
    position: 1,
    upright:
      'Kader Çarkı, geçmişte yaşanan talihli rastlantılar, değişimler veya döngüler bugünkü duruma temel hazırlamış olabilir.',
    reversed:
      'Ters Kader Çarkı, geçmişte tekrar eden talihsizlikler veya kötü zamanlamalar sürecin kökeninde olabilir.',
    keywords: ['kader', 'şans', 'döngü', 'değişim', 'geçmiş'],
    context: 'Geçmişteki şans veya talihsizliklerin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_sa_pos1',
    card: 'Justice',
    position: 1,
    upright:
      'Adalet, geçmişte alınan adil kararlar veya verilen haklar bugünkü durumun temelinde olabilir.',
    reversed:
      'Ters Adalet, geçmişteki adaletsizlikler, yanlış kararlar veya sorumluluktan kaçış sürecin sebeplerini oluşturmuş olabilir.',
    keywords: ['adalet', 'karar', 'denge', 'gerçek', 'geçmiş'],
    context: 'Geçmişteki adil ya da adaletsiz kararların etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_sa_pos1',
    card: 'The Hanged Man',
    position: 1,
    upright:
      'Asılan Adam, geçmişte farklı bir bakış açısı kazanmak, fedakarlık yapmak veya bir duraklama yaşamak bu sürecin temelinde olabilir.',
    reversed:
      'Ters Asılan Adam, geçmişte boşa yapılan fedakarlıklar veya isteksizce yaşanan durağanlık mevcut durumu şekillendirmiş olabilir.',
    keywords: ['bakış açısı', 'fedakarlık', 'duraklama', 'teslimiyet', 'geçmiş'],
    context: 'Geçmişteki fedakarlık ya da duraklamaların etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_sa_pos1',
    card: 'Death',
    position: 1,
    upright:
      'Ölüm, geçmişte kapanan bir döngü, bitiş veya güçlü bir dönüşüm bugünkü koşulların kökeninde olabilir.',
    reversed:
      'Ters Ölüm, geçmişte değişime direnç, kapanmamış süreçler veya zorlayıcı bitişler mevcut durumu etkilemiş olabilir.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'değişim', 'geçmiş'],
    context: 'Geçmişteki dönüşüm ya da dirençlerin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_sa_pos1',
    card: 'Temperance',
    position: 1,
    upright:
      'Denge, geçmişte uyum, sabır veya dengeli kararlar bu sürecin temelinde olabilir.',
    reversed:
      'Ters Denge, geçmişteki uyumsuzluk, aşırılıklar veya dengesizlikler bugünkü koşulları oluşturmuş olabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'dengelemek', 'geçmiş'],
    context: 'Geçmişteki denge ya da dengesizliklerin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_sa_pos1',
    card: 'The Devil',
    position: 1,
    upright:
      'Şeytan, geçmişteki bağımlılıklar, kısıtlamalar veya güçlü arzular bugünkü sürecin sebepleri olabilir.',
    reversed:
      'Ters Şeytan, geçmişte bağımlılıklardan kurtulma veya zincirleri kırma çabaları mevcut duruma yön vermiş olabilir.',
    keywords: ['bağımlılık', 'esaret', 'arzu', 'özgürleşme', 'geçmiş'],
    context: 'Geçmişteki bağımlılık ya da özgürleşme deneyimlerinin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_sa_pos1',
    card: 'The Tower',
    position: 1,
    upright:
      'Kule, geçmişte yaşanan ani bir kriz, beklenmedik sarsıntı ya da köklü değişim sürecin temelini oluşturmuş olabilir.',
    reversed:
      'Ters Kule, geçmişte bastırılmış krizler veya ertelenmiş yıkımlar bugünkü duruma etki etmiş olabilir.',
    keywords: ['kriz', 'değişim', 'yıkım', 'sarsıntı', 'geçmiş'],
    context: 'Geçmişteki krizlerin ya da yıkımların etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_sa_pos1',
    card: 'The Star',
    position: 1,
    upright:
      'Yıldız, geçmişteki umut, şifa arayışı veya ilham verici bir gelişme bugünkü sürecin kökeninde olabilir.',
    reversed:
      'Ters Yıldız, geçmişte yaşanan umutsuzluk, inanç kaybı veya karamsarlık mevcut duruma yön vermiş olabilir.',
    keywords: ['umut', 'şifa', 'ilham', 'gelecek', 'geçmiş'],
    context: 'Geçmişteki umut veya umutsuzluk deneyimlerinin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_sa_pos1',
    card: 'The Moon',
    position: 1,
    upright:
      'Ay, geçmişte belirsizlik, yanılsamalar veya sezgisel etkiler bugünkü koşulların kökeninde olabilir.',
    reversed:
      'Ters Ay, geçmişteki yanılsamalar, korkular veya gizlenen gerçekler bugünkü duruma etki etmiş olabilir.',
    keywords: ['belirsizlik', 'sezgi', 'yanılsama', 'giz', 'geçmiş'],
    context: 'Geçmişteki belirsizlik ya da yanılsamaların etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_sa_pos1',
    card: 'The Sun',
    position: 1,
    upright:
      'Güneş, geçmişteki başarı, mutluluk ve aydınlık enerjiler bugünkü durumun temelinde olabilir.',
    reversed:
      'Ters Güneş, geçmişte yaşanan geçici karamsarlık, özgüven kaybı veya gölgeler bu sürecin kökeninde olabilir.',
    keywords: ['başarı', 'mutluluk', 'aydınlanma', 'özgüven', 'geçmiş'],
    context: 'Geçmişteki başarı ya da gölgelerin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_sa_pos1',
    card: 'Judgement',
    position: 1,
    upright:
      'Mahkeme, geçmişteki bir uyanış, affetme veya yeniden doğuş süreci bugünkü duruma temel hazırlamış olabilir.',
    reversed:
      'Ters Mahkeme, geçmişte fırsatların kaçırılması, affedememe veya sorumluluktan kaçış mevcut durumu şekillendirmiş olabilir.',
    keywords: ['uyanış', 'karar', 'özgürleşme', 'hesaplaşma', 'geçmiş'],
    context: 'Geçmişteki uyanış ya da kaçırılan fırsatların etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_sa_pos1',
    card: 'The World',
    position: 1,
    upright:
      'Dünya, geçmişte tamamlanan bir döngü, elde edilen başarılar veya bütünlük hissi bugünkü sürecin temelini oluşturmuş olabilir.',
    reversed:
      'Ters Dünya, geçmişte tamamlanmamış işler, eksiklikler veya başarısız döngüler mevcut koşulları etkilemiş olabilir.',
    keywords: ['tamamlanma', 'başarı', 'bütünlük', 'döngü', 'geçmiş'],
    context: 'Geçmişteki tamamlanma ya da eksikliklerin etkisi.',
    group: 'Majör Arkana',
  },

  //-- Kupalar --//
  {
    id: 'ace_of_cups_sa_pos1',
    card: 'Ace of Cups',
    position: 1,
    upright:
      'Kupa Ası, geçmişte yaşanan duygusal bir başlangıcı, yoğun sevgiyi veya kalbin açılmasını simgeler. Bu bir ilişki, dostluk ya da sizi derinden etkileyen bir deneyim olabilir. Bu sevgi dolu adım, bugünkü koşullarınızın temelinde önemli bir rol oynamış olabilir.\n\nBu kart, geçmişteki bu duygusal başlangıcın, hala ruhsal yolculuğunuzda iz bıraktığını gösterir.',
    reversed:
      'Ters Kupa Ası, geçmişte bastırılan duyguları, ifade edilemeyen sevgiyi ya da yarım kalmış duygusal başlangıçları işaret eder. Belki kalbinizi açmaya hazır olmadığınız için fırsatlar kaçtı veya duygularınız tam olarak akmadı.\n\nBu kart, geçmişte sevginin engellenmesinin bugünkü duygusal durumunuzu hâlâ etkilediğini hatırlatır.',
    keywords: ['sevgi', 'başlangıç', 'duygu', 'şefkat', 'geçmiş'],
    context: 'Geçmişteki duygusal başlangıçların veya engellenen sevgilerin etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_sa_pos1',
    card: 'Two of Cups',
    position: 1,
    upright:
      'İki Kupa, geçmişte yaşanan uyumlu bir ilişkiyi, ortaklığı ya da güçlü bir bağı simgeler. Bu bağ, bugünkü koşullarınıza temel oluşturmuş olabilir. Romantik ya da dostane bir birliktelik sizi şekillendirmiştir.\n\nBu kart, geçmişteki bu uyumun hâlâ size güç verdiğini hatırlatır.',
    reversed:
      'Ters İki Kupa, geçmişte yaşanan uyumsuzluğu, ayrılığı ya da dengesiz ilişkileri işaret eder. Bu deneyimler bugünkü koşulların kökeninde olabilir.\n\nBu kart, geçmişte kaybedilen uyumun veya yaşanan ayrılıkların bugün hâlâ üzerinizde etkisini sürdürdüğünü gösterir.',
    keywords: ['ilişki', 'uyum', 'bağ', 'ortaklık', 'geçmiş'],
    context: 'Geçmişteki uyumlu ya da uyumsuz ilişkilerin etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_sa_pos1',
    card: 'Three of Cups',
    position: 1,
    upright:
      'Üç Kupa, geçmişte yaşanan kutlamaları, arkadaşlık bağlarını veya neşe dolu zamanları simgeler. Bu deneyimler, size destek olmuş ve bugünkü durumunuza temel hazırlamış olabilir.\n\nBu kart, geçmişteki dostlukların hâlâ size ilham verdiğini gösterir.',
    reversed:
      'Ters Üç Kupa, geçmişte yaşanan kopuklukları, dostluklarda hayal kırıklıklarını veya keyifli anların yarım kalmasını işaret eder. Bu deneyimler, bugünkü duygusal halinize gölge düşürmüş olabilir.\n\nBu kart, geçmişte bozulmuş bağların bugüne kadar uzandığını anlatır.',
    keywords: ['kutlama', 'arkadaşlık', 'birlik', 'destek', 'geçmiş'],
    context: 'Geçmişteki dostlukların veya kopuklukların etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_sa_pos1',
    card: 'Four of Cups',
    position: 1,
    upright:
      'Dört Kupa, geçmişte yaşanan duygusal tatminsizliği, fırsatları görmezden gelmeyi ya da isteksizliği simgeler. Bu tavır, bugünkü koşullarınızın temelinde olabilir.\n\nBu kart, geçmişteki bu ilgisizliğin veya tatminsizliğin bugün hâlâ sizi etkilediğini gösterir.',
    reversed:
      'Ters Dört Kupa, geçmişte kaçırılan fırsatları fark etmeyi, uyanışı ya da yeni bir duygusal başlangıcı işaret eder. Bu dönem, bugünkü koşullarınıza zemin hazırlamış olabilir.\n\nBu kart, geçmişteki bu farkındalığın ya da kaçan fırsatların bugünkü ruh halinizi hâlâ etkilediğini anlatır.',
    keywords: ['tatminsizlik', 'fırsat', 'duygu', 'ilgisizlik', 'geçmiş'],
    context: 'Geçmişteki tatminsizliklerin veya farkındalıkların etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_sa_pos1',
    card: 'Five of Cups',
    position: 1,
    upright:
      'Beş Kupa, geçmişte yaşanan kayıpları, pişmanlıkları ve hayal kırıklıklarını simgeler. Bu acılar, bugünkü koşulların temelinde olabilir. Geçmişte gözünüzün önünde olan fırsatları görememek de bu süreci şekillendirmiş olabilir.\n\nBu kart, geçmişteki kayıpların bugünkü bakış açınızı hâlâ etkilediğini gösterir.',
    reversed:
      'Ters Beş Kupa, geçmişte yaşanan kayıplardan sonra gelen toparlanmayı, yeniden umudu bulmayı ve iyileşmeyi işaret eder. Ancak bu süreç kolay olmamış olabilir ve izleri bugün hâlâ görülüyor olabilir.\n\nBu kart, geçmişte yaşanan pişmanlıkların bugünkü ruh haliniz üzerinde iz bıraktığını hatırlatır.',
    keywords: ['kayıp', 'pişmanlık', 'hayal kırıklığı', 'acı', 'geçmiş'],
    context: 'Geçmişteki kayıpların veya toparlanmaların etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_sa_pos1',
    card: 'Six of Cups',
    position: 1,
    upright:
      'Altı Kupa, geçmişteki anıları, nostaljiyi ve çocukluk deneyimlerini simgeler. Bu güzel hatıralar, bugünkü bakış açınızı şekillendirmiş olabilir. Geçmişte yaşanan bir bağ ya da anı, bugünkü koşulların temelinde yer alıyor olabilir.\n\nBu kart, geçmişten gelen bu bağların hâlâ sizi duygusal olarak beslediğini gösterir.',
    reversed:
      'Ters Altı Kupa, geçmişe aşırı bağlı kalmayı, nostaljide boğulmayı veya ilerleyememeyi simgeler. Geçmişi bırakamamak, bugünkü koşullarınızı zayıflatmış olabilir.\n\nBu kart, geçmişe takılı kalmanın bugünkü ilerleyişinize engel olduğunu anlatır.',
    keywords: ['nostalji', 'çocukluk', 'anı', 'bağ', 'geçmiş'],
    context: 'Geçmişteki anıların veya bağımlılıkların etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_sa_pos1',
    card: 'Seven of Cups',
    position: 1,
    upright:
      'Yedi Kupa, geçmişte yaşanan hayalleri, seçenekleri veya belirsizlikleri simgeler. Fazla hayal kurmak ya da seçenekler arasında kaybolmak bugünkü durumun temelinde olabilir.\n\nBu kart, geçmişte gerçekçi olmayan beklentilerin bugünkü koşulları etkilediğini hatırlatır.',
    reversed:
      'Ters Yedi Kupa, geçmişte kafa karışıklığını aşmayı, net bir karar vermeyi veya hayallerden uyanmayı işaret eder. Bu süreç, bugünkü durumunuza yön vermiş olabilir.\n\nBu kart, geçmişte verilen kararların bugün hâlâ etkisini sürdürdüğünü anlatır.',
    keywords: ['hayal', 'seçenek', 'karışıklık', 'beklenti', 'geçmiş'],
    context: 'Geçmişteki hayallerin veya net kararların etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_sa_pos1',
    card: 'Eight of Cups',
    position: 1,
    upright:
      'Sekiz Kupa, geçmişte bırakılan bir ilişkiyi, terk edilen bir yolu veya duygusal olarak uzaklaşmayı simgeler. Bu ayrılık, bugünkü durumunuzun temelinde olabilir.\n\nBu kart, geçmişteki ayrılığın sizi yeni arayışlara yönelttiğini gösterir.',
    reversed:
      'Ters Sekiz Kupa, geçmişte bırakılması gereken bir şeye tutunmayı, ayrılıktan kaçınmayı veya yarım kalmış bir vedayı işaret eder. Bu davranış, bugünkü durumun kökeninde olabilir.\n\nBu kart, geçmişte tamamlanmamış ayrılıkların bugünkü ilerleyişinizi engellediğini gösterir.',
    keywords: ['ayrılık', 'uzaklaşma', 'vedalaşma', 'yolculuk', 'geçmiş'],
    context: 'Geçmişteki ayrılıkların veya tamamlanmamış vedaların etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_sa_pos1',
    card: 'Nine of Cups',
    position: 1,
    upright:
      'Dokuz Kupa, geçmişte gerçekleşen bir dileği, tatmini ve mutluluğu simgeler. Bu doyum, bugünkü durumunuza temel oluşturmuş olabilir. Kendinizi mutlu hissettiğiniz bir an, hâlâ size güç veriyor olabilir.\n\nBu kart, geçmişteki bu tatminin bugünkü özgüveninizi beslediğini gösterir.',
    reversed:
      'Ters Dokuz Kupa, geçmişte yaşanan tatminsizliği, doyumsuzluğu ya da aşırı bencilliği işaret eder. Bu durumlar, bugünkü koşulların kökeninde olabilir.\n\nBu kart, geçmişte doyuma ulaşamamanın bugün hâlâ sizi etkilediğini anlatır.',
    keywords: ['dilek', 'tatmin', 'mutluluk', 'özgüven', 'geçmiş'],
    context: 'Geçmişteki mutlulukların veya doyumsuzlukların etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_sa_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'On Kupa, geçmişte yaşanan ailevi mutluluğu, birlikteliği ve huzuru simgeler. Bu anılar, bugünkü koşullarınıza temel oluşturmuş olabilir.\n\nBu kart, geçmişteki bu huzurun bugün hâlâ size güç verdiğini gösterir.',
    reversed:
      'Ters On Kupa, geçmişte ailevi uyumsuzlukları, kırgınlıkları veya kopuşları işaret eder. Bu sorunlar, bugünkü ruh halinizi şekillendirmiş olabilir.\n\nBu kart, geçmişteki huzursuzlukların bugünkü mutluluk arayışınıza gölge düşürdüğünü anlatır.',
    keywords: ['aile', 'mutluluk', 'huzur', 'birlik', 'geçmiş'],
    context: 'Geçmişteki ailevi huzurun veya huzursuzlukların etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_sa_pos1',
    card: 'Page of Cups',
    position: 1,
    upright:
      'Kupa Prensi, geçmişte yaşanan masum duyguları, hayal gücünü ve romantik bir başlangıcı simgeler. Bu deneyim, bugünkü koşullarınıza temel oluşturmuş olabilir.\n\nBu kart, geçmişteki bu saf duyguların hâlâ kalbinizde yer ettiğini gösterir.',
    reversed:
      'Ters Kupa Prensi, geçmişte duygusal olgunlaşmamayı, hayalperestliği veya dikkatsizliği işaret eder. Bu eksiklikler, bugünkü durumun kökeninde olabilir.\n\nBu kart, geçmişteki saf duyguların yanlış kullanılması ya da hafife alınmasının bugün hâlâ sizi etkilediğini gösterir.',
    keywords: ['masumiyet', 'hayal', 'duygu', 'başlangıç', 'geçmiş'],
    context: 'Geçmişteki saf duyguların veya olgunlaşmamış davranışların etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_sa_pos1',
    card: 'Knight of Cups',
    position: 1,
    upright:
      'Kupa Şövalyesi, geçmişte yapılan romantik bir teklifi, duygusal bir yolculuğu veya idealist bir tavrı simgeler. Bu durum, bugünkü koşullarınızın temelinde olabilir.\n\nBu kart, geçmişteki bu duygusal yolculuğun bugünkü ruh halinizi hâlâ etkilediğini gösterir.',
    reversed:
      'Ters Kupa Şövalyesi, geçmişte verilen boşa sözleri, hayal kırıklıklarını veya aşırı idealizmi işaret eder. Bu durumlar, bugünkü durumunuzun kökeninde olabilir.\n\nBu kart, geçmişteki yanlış romantik adımların bugünkü süreçlerinize gölge düşürdüğünü anlatır.',
    keywords: ['romantizm', 'teklif', 'yolculuk', 'idealizm', 'geçmiş'],
    context: 'Geçmişteki romantik adımların veya hayal kırıklıklarının etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_sa_pos1',
    card: 'Queen of Cups',
    position: 1,
    upright:
      'Kupa Kraliçesi, geçmişteki şefkati, empatiyi ve duygusal desteği simgeler. Bu enerji, bugünkü koşullarınıza temel oluşturmuş olabilir.\n\nBu kart, geçmişteki bu şefkatli enerjinin hâlâ size yol gösterdiğini gösterir.',
    reversed:
      'Ters Kupa Kraliçesi, geçmişte aşırı hassasiyeti, duygusal dengesizlikleri veya manipülasyonu işaret eder. Bu durumlar, bugünkü koşulların temelinde olabilir.\n\nBu kart, geçmişte duygusal hassasiyetlerin bugünkü dengeyi zorlaştırdığını gösterir.',
    keywords: ['şefkat', 'empati', 'destek', 'hassasiyet', 'geçmiş'],
    context: 'Geçmişteki şefkatli ya da dengesiz enerjilerin etkisi.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_sa_pos1',
    card: 'King of Cups',
    position: 1,
    upright:
      'Kupa Kralı, geçmişteki duygusal olgunluğu, bilgece rehberliği veya dengeli bir tavrı simgeler. Bu enerji, bugünkü koşulların temelinde olabilir.\n\nBu kart, geçmişteki bu bilge tavrın hâlâ size rehberlik ettiğini gösterir.',
    reversed:
      'Ters Kupa Kralı, geçmişte duygusal baskıları, manipülasyonları veya bastırılan hisleri işaret eder. Bu deneyimler bugünkü ruh halinizin kökeninde olabilir.\n\nBu kart, geçmişteki duygusal baskıların bugünkü ilişkilerinize hâlâ gölge düşürdüğünü anlatır.',
    keywords: ['duygu', 'olgunluk', 'rehberlik', 'denge', 'geçmiş'],
    context: 'Geçmişteki duygusal olgunluğun veya baskıların etkisi.',
    group: 'Kupalar',
  },
  //-- Kılıçlar --//
  {
    id: 'ace_of_swords_sa_pos1',
    card: 'Ace of Swords',
    position: 1,
    upright:
      'Kılıç Ası, geçmişte yaşadığınız bir zihinsel aydınlanmayı, güçlü bir kararı ya da berraklaşan bir fikri simgeler. Bu deneyim, size yeni bir bakış açısı kazandırmış ve mevcut durumunuzun temelinde etkili olmuştur. Bir söz, bir karar ya da keskin bir farkındalık sürecinizin başlangıç noktasını oluşturmuş olabilir.\n\nBu kart aynı zamanda geçmişte hakikati bulma arzunuzun ve dürüstlüğe olan ihtiyacınızın sizi yönlendirdiğini gösterir. Bugünkü durumu anlamak için, o dönemde kazandığınız netliğin izini sürmeniz önemlidir.',
    reversed:
      'Ters Kılıç Ası, geçmişte yaşanan kafa karışıklığını, yanlış anlaşılmaları ya da bulanık bir karar sürecini gösterir. Netlik yerine belirsizlik içinde alınan kararlar, bugünkü zorlukların kökeninde yer alıyor olabilir. Hatalı iletişimler veya doğruluğu kanıtlanmamış fikirler size yanlış bir yol çizmiş olabilir.\n\nAyrıca bu kart, geçmişte söylenen incitici sözlerin ya da tamamlanmamış konuşmaların etkisinin bugün hâlâ hissedildiğini anlatır. Kapanmamış meseleler, bugünkü koşullarınıza gölge düşürmüş olabilir.',
    keywords: ['netlik', 'karar', 'aydınlanma', 'zihin', 'geçmiş'],
    context: 'Geçmişteki zihinsel netlik ya da kafa karışıklığının etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sa_pos1',
    card: 'Two of Swords',
    position: 1,
    upright:
      'İki Kılıç, geçmişte yaşadığınız kararsızlıkları ya da iki seçenek arasında sıkışıp kalmayı işaret eder. O dönemde bir seçim yapmamış ya da ertelemiş olmanız bugünkü durumun temelinde etkili olabilir. Kendinizi tarafsız kalarak korumaya çalışmış olabilirsiniz fakat bu çözümü geciktirmiştir.\n\nBu süreç, içsel bir denge arayışına katkı sağlamış olsa da ilerleyememek bugünkü koşullara zemin hazırlamış olabilir.',
    reversed:
      'Ters İki Kılıç, geçmişte alınan yanlış kararları ya da görmezden gelinen gerçekleri simgeler. Belki de yüzleşmekten kaçındığınız meseleler bugün hala üzerinizde etkisini sürdürüyor. Gerçekleri bilmeden alınan kararlar, bugünkü sorunların kaynağı olabilir.\n\nBu kart aynı zamanda korkular yüzünden ertelenen kararların sonucunda sıkışıp kalma durumunu da yansıtır. Şimdi yaşadığınız zorlukların temelinde geçmişteki bu kaçışlar yer alıyor olabilir.',
    keywords: ['karar', 'ikilem', 'denge', 'seçim', 'geçmiş'],
    context: 'Geçmişteki seçimlerin ya da kararsızlığın etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sa_pos1',
    card: 'Three of Swords',
    position: 1,
    upright:
      'Üç Kılıç, geçmişte yaşadığınız bir kalp kırıklığını, ihaneti veya derin bir hayal kırıklığını simgeler. Bu acı deneyim, sizi daha dikkatli ve temkinli yapmış olabilir ama aynı zamanda kalbinizde derin izler bırakmıştır. O dönemde yaşadığınız kayıplar bugünkü durumunuza doğrudan etki etmiş olabilir.\n\nBu kart, acının öğretici yönünü hatırlatır. Yaşanan hayal kırıklıkları, bugün daha bilinçli seçimler yapmanızı sağlamış olabilir.',
    reversed:
      'Ters Üç Kılıç, geçmişte kapanmamış yaraları, affedilememiş kırgınlıkları ve unutulmamış ihanetleri işaret eder. Belki de geçmişte yaşadığınız acıyı bastırmaya çalıştınız ama bu duygular çözülmeden kaldı. Bugün karşılaştığınız sorunların kökeninde bu kapanmamış yaralar olabilir.\n\nBu kart aynı zamanda kendinizi ya da başkalarını affetmekte zorlanmanın, içsel huzursuzluk yaratmaya devam ettiğini de vurgular. Geçmişin ağırlığı, bugünü gölgelemiş olabilir.',
    keywords: ['kalp kırıklığı', 'acı', 'ihanet', 'hayal kırıklığı', 'geçmiş'],
    context: 'Geçmişteki acıların bugüne yansıması.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sa_pos1',
    card: 'Four of Swords',
    position: 1,
    upright:
      'Dört Kılıç, geçmişte yaşadığınız bir dinlenme dönemi, zorunlu bir duraklama ya da iyileşme sürecini gösterir. O anki mola, bugün karşılaştığınız koşulların temelini oluşturmuş olabilir. Bu süreç size nefes alma ve yeniden toparlanma fırsatı sunmuş olabilir.\n\nAynı zamanda bu kart, geçmişte yaşadığınız sessizliğin ya da inzivanın, bugünkü içsel gücünüzün bir parçası haline geldiğini de ifade eder.',
    reversed:
      'Ters Dört Kılıç, geçmişte ihmal edilen dinlenmeleri, ertelenmiş toparlanmaları ya da sürekli erteleme halini simgeler. Yorucu bir dönemden sonra kendinize zaman tanımamış olmanız bugünkü zorlukların kökeninde olabilir. Bitmeyen telaşlar ya da yeterince dinlenmemek sağlığınızı ve kararlarınızı etkilemiş olabilir.\n\nBu kart, geçmişteki bu ihmallerin bugün hala yorgunluk ve tükenmişlik şeklinde karşınıza çıkabileceğini gösterir.',
    keywords: ['dinlenme', 'iyileşme', 'duraklama', 'huzur', 'geçmiş'],
    context: 'Geçmişteki dinlenme veya ihmalin etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sa_pos1',
    card: 'Five of Swords',
    position: 1,
    upright:
      'Beş Kılıç, geçmişte yaşadığınız çatışmaları, kavgaları ya da kazanılsa bile kalıcı mutluluk getirmeyen bir zaferi simgeler. Bu deneyim, size gururla karışık bir huzursuzluk bırakmış olabilir. Geçmişteki bu gerilim, bugünkü durumunuzun kökeninde yer alıyor olabilir.\n\nBu kart, kazandığınız bir şeyin aslında kaybettirdiklerini de düşünmeniz gerektiğini hatırlatır. Geçmişteki bu çatışmalar, bugün ilişkilerinize ve seçimlerinize yansıyor olabilir.',
    reversed:
      'Ters Beş Kılıç, geçmişte çözülemeyen anlaşmazlıkları, gururdan kaynaklanan kopuşları ya da barış fırsatlarının kaçırılmasını simgeler. Belki de geçmişte geri adım atmayı reddettiniz ve bu durum bugüne kadar uzanan bir çatışma enerjisi yarattı.\n\nBu kart, eski kavgaların izlerinin hâlâ üzerinizde olabileceğini ve affetme yoluna gitmediğiniz için huzursuzlukların devam ettiğini anlatır.',
    keywords: ['çatışma', 'zafer', 'kaygı', 'uzlaşmazlık', 'geçmiş'],
    context: 'Geçmişteki çatışmaların bugüne etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sa_pos1',
    card: 'Six of Swords',
    position: 1,
    upright:
      'Altı Kılıç, geçmişte yaşadığınız bir geçişi, yolculuğu veya zor bir dönemden uzaklaşmayı simgeler. Bu süreç size iyileşme ve daha sakin bir hayata geçiş fırsatı sunmuş olabilir. Bugünkü durumunuz, o dönemde aldığınız bu kararlardan etkilenmiş olabilir.\n\nBu kart aynı zamanda geçmişteki bu yolculuğun, sizi duygusal anlamda daha olgunlaştırdığını da gösterir.',
    reversed:
      'Ters Altı Kılıç, geçmişte ilerlemek yerine geri dönmeyi, sıkışıp kalmayı ya da yarım kalan bir geçişi işaret eder. Bir şeylerden uzaklaşmak istediniz ama bu süreç tamamlanmadı. Bu yüzden bugün hâlâ aynı döngü içinde sıkışmış hissediyor olabilirsiniz.\n\nBu kart, geçmişte ilerleme fırsatlarını değerlendirememenin, bugünkü sorunların kaynağı olduğunu hatırlatır.',
    keywords: ['geçiş', 'yolculuk', 'ilerleme', 'kaçış', 'geçmiş'],
    context: 'Geçmişteki geçiş ya da sıkışmışlığın etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sa_pos1',
    card: 'Seven of Swords',
    position: 1,
    upright:
      'Yedi Kılıç, geçmişte saklanan gerçekleri, gizli planları ya da stratejik hamleleri gösterir. Belki de bir şeyleri açıkça paylaşmamak veya yalnız ilerlemek bugünkü durumun kökeninde yer alıyor olabilir.\n\nBu kart, geçmişte izlediğiniz bu stratejinin kısa vadede işe yaramış olsa bile bugün sorunlara yol açtığını işaret eder.',
    reversed:
      'Ters Yedi Kılıç, geçmişte açığa çıkan sırları, yakalanan hileleri ya da başarısız stratejileri temsil eder. Saklanan gerçeklerin ortaya çıkması, bugünkü koşulları doğrudan etkilemiş olabilir.\n\nBu kart aynı zamanda dürüstlüğü ertelediğiniz için daha büyük sorunlarla karşılaşmış olabileceğinizi de hatırlatır.',
    keywords: ['strateji', 'gizlilik', 'hile', 'plan', 'geçmiş'],
    context: 'Geçmişteki gizli hamlelerin etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sa_pos1',
    card: 'Eight of Swords',
    position: 1,
    upright:
      'Sekiz Kılıç, geçmişte yaşadığınız bir sıkışmışlık, özgürlüğünüzün kısıtlanması ya da kendinizi çaresiz hissettiğiniz bir dönemi simgeler. Bu deneyim, kendi sınırlarınızı fark etmenize neden olmuş olabilir. Ancak aynı zamanda bugünkü durumun temelinde yer alan korkularınızı da beslemiş olabilir.\n\nBu kart, geçmişte yaşanan çaresizliğin, bugünkü algılarınızı sınırlamış olabileceğini hatırlatır.',
    reversed:
      'Ters Sekiz Kılıç, geçmişte kurtulma fırsatınız olduğu halde kendinizi sınırlamaya devam ettiğiniz durumları işaret eder. Belki de özgürleşmek mümkündü fakat korkularınız sizi durdurdu. Bu yüzden bugün hâlâ aynı zincirlerin yankılarını hissediyor olabilirsiniz.\n\nBu kart, geçmişte kendi gücünüzü küçümsemenin bugünkü sorunlara yol açtığını gösterir.',
    keywords: ['özgürlük', 'engel', 'sınırlama', 'çaresizlik', 'geçmiş'],
    context: 'Geçmişteki sıkışmışlık ya da özgürleşme çabalarının etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sa_pos1',
    card: 'Nine of Swords',
    position: 1,
    upright:
      'Dokuz Kılıç, geçmişte yaşanan yoğun kaygıları, korkuları veya uykusuzluk dönemlerini simgeler. Bu deneyimler, zihninizi sürekli meşgul etmiş ve bugünkü ruh halinize doğrudan etki etmiş olabilir.\n\nBu kart, geçmişteki bu endişelerin hâlâ sizi içten içe etkilediğini ve bugün karşılaştığınız sorunların temelinde yer alabileceğini gösterir.',
    reversed:
      'Ters Dokuz Kılıç, geçmişte görmezden gelinen korkuları, bastırılan kaygıları veya inkâr edilen acıları temsil eder. O dönemde yüzleşmekten kaçtığınız duygular bugün daha da büyüyerek karşınıza çıkmış olabilir.\n\nBu kart, geçmişte zihinsel huzuru bulmakta zorlanmanın bugünkü koşulları etkilemiş olabileceğini vurgular.',
    keywords: ['kaygı', 'stres', 'endişe', 'gece', 'geçmiş'],
    context: 'Geçmişteki korkuların bugünkü ruh halinize etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sa_pos1',
    card: 'Ten of Swords',
    position: 1,
    upright:
      'On Kılıç, geçmişte yaşanmış bir bitişi, ihaneti veya ani bir kaybı işaret eder. Bu bitiş çok acı verici olsa da aynı zamanda yeni bir başlangıcın yolunu açmış olabilir. Bugünkü durum, bu kapanışın ardından şekillenmiş olabilir.\n\nBu kart, geçmişte yaşadığınız büyük bir yıkımın bugünkü gücünüzün de kaynağı olabileceğini hatırlatır.',
    reversed:
      'Ters On Kılıç, geçmişte yaşanmış ama kabul edilmeyen bitişleri, ertelenen kapanışları ya da uzatılan acıları simgeler. Belki de sonlanması gereken bir şeyin bitişini kabullenemediniz ve bu durum sizi hâlâ etkiliyor.\n\nBu kart, geçmişteki kapanmamış döngülerin bugünkü sorunların kökeninde olduğunu gösterir.',
    keywords: ['bitiş', 'ihanet', 'acı', 'kapanış', 'geçmiş'],
    context: 'Geçmişteki bitişlerin ve kayıpların etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sa_pos1',
    card: 'Page of Swords',
    position: 1,
    upright:
      'Kılıç Prensi, geçmişte öğrenme isteği, merak veya iletişim çabalarıyla başlayan bir süreci temsil eder. O dönemde edindiğiniz bilgiler ya da attığınız küçük adımlar bugünkü durumun köklerinde olabilir.\n\nBu kart, geçmişteki bu öğrenme sürecinin sizi daha dikkatli ve analitik bir bakış açısına yönlendirdiğini hatırlatır.',
    reversed:
      'Ters Kılıç Prensi, geçmişte yanlış bilgilerle yönlendirilmiş olmayı, dedikodulara kapılmayı ya da dikkatsizce atılan adımları simgeler. Bu hatalı yönelim, bugünkü koşulların şekillenmesinde etkili olabilir.\n\nBu kart, geçmişte dikkatsizce söylenen sözlerin ya da aceleyle verilen kararların bugüne kadar izini sürdüğünü de gösterebilir.',
    keywords: ['öğrenme', 'merak', 'bilgi', 'iletişim', 'geçmiş'],
    context: 'Geçmişteki öğrenme çabalarının ya da yanlış bilgilerin etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sa_pos1',
    card: 'Knight of Swords',
    position: 1,
    upright:
      'Kılıç Şövalyesi, geçmişte hızlıca alınan kararları, cesur hamleleri ya da ani yön değişikliklerini simgeler. O dönemde gösterdiğiniz cesaret bugünkü durumun temelinde etkili olabilir. Hızlı ilerleyişiniz, sizi bugünkü konumunuza taşımış olabilir.\n\nBu kart, geçmişteki bu atılganlığın, bugün hala olaylara yaklaşımınızı şekillendirdiğini gösterir.',
    reversed:
      'Ters Kılıç Şövalyesi, geçmişte aceleyle yapılan girişimleri, plansızlıkları ya da kontrolsüz davranışları simgeler. Bu hatalı adımlar, bugünkü sorunların kökeninde olabilir. Aceleyle söylenen sözler veya düşünülmeden atılan adımlar hâlâ etkisini sürdürüyor olabilir.\n\nBu kart, geçmişte gösterilen sabırsızlığın bugünkü süreçleri zorlaştırmış olabileceğini de vurgular.',
    keywords: ['cesaret', 'hız', 'hamle', 'karar', 'geçmiş'],
    context: 'Geçmişteki aceleci ya da cesur kararların etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sa_pos1',
    card: 'Queen of Swords',
    position: 1,
    upright:
      'Kılıç Kraliçesi, geçmişte mantıklı kararlar alan, bağımsız ve güçlü bir figürü simgeler. Bu kişi siz olabilir veya hayatınızda etkili olmuş bir başkası. Onun tavrı bugünkü durumunuzun kökeninde yer alıyor olabilir.\n\nBu kart, geçmişteki bu mantıklı ve kararlı yaklaşımın, sizi bugün daha bağımsız ve net düşünceli biri haline getirdiğini hatırlatır.',
    reversed:
      'Ters Kılıç Kraliçesi, geçmişte aşırı eleştirel, soğuk ya da mesafeli bir tavrı simgeler. Bu tutum, ilişkilerde duvarlar örülmesine neden olmuş olabilir. Belki de bu yaklaşım, bugünkü koşulların zorluğunu yaratan kök sebeplerden biridir.\n\nBu kart, geçmişteki katı ve eleştirel davranışların bugünkü sorunları şekillendirdiğini anlatır.',
    keywords: ['mantık', 'bağımsızlık', 'eleştiri', 'soğukluk', 'geçmiş'],
    context: 'Geçmişteki mantıklı ya da soğuk yaklaşımların etkisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sa_pos1',
    card: 'King of Swords',
    position: 1,
    upright:
      'Kılıç Kralı, geçmişte adaletli, mantıklı ve otoriter bir figürü simgeler. Bu kişinin etkisi veya bu şekilde davranmanız bugünkü sürecin temelini oluşturmuş olabilir. Onun bilgeliği ve kararları hayatınıza yön vermiş olabilir.\n\nBu kart, geçmişteki disiplinin ve adalet arayışının, bugün yaşadığınız durumun altında yatan sebeplerden biri olduğunu vurgular.',
    reversed:
      'Ters Kılıç Kralı, geçmişte baskıcı, soğuk veya adaletsiz bir figürü temsil eder. Bu otoriterlik, bugünkü koşullarınızı olumsuz yönde şekillendirmiş olabilir. Belki de aşırı kontrolcü bir kişi ya da haksız bir karar, bugünkü sorunların kökünde yer alıyor.\n\nBu kart, geçmişteki adaletsizliklerin veya soğuk otoritenin izlerinin hâlâ devam ettiğini de hatırlatır.',
    keywords: ['adalet', 'mantık', 'otorite', 'liderlik', 'geçmiş'],
    context: 'Geçmişteki adaletli ya da baskıcı figürlerin etkisi.',
    group: 'Kılıçlar',
  },
  //-- Asalar --//
  {
    id: 'ace_of_wands_sa_pos1',
    card: 'Ace of Wands',
    position: 1,
    upright:
      'Değnek Ası, geçmişte doğan bir fikir, ilham veya tutkulu bir başlangıcı simgeler. Bu enerji, yeni bir projeye adım atmak ya da hayatınıza heyecan katmak için güçlü bir motivasyon yaratmış olabilir. Bu kıvılcım, bugünkü durumunuzun temelinde önemli bir rol oynamıştır.\n\nBu kart aynı zamanda geçmişteki bu girişimin size özgüven kazandırarak sonraki adımlarınızı şekillendirdiğini hatırlatır.',
    reversed:
      'Ters Değnek Ası, geçmişte yarım kalan bir girişimi, motivasyon kaybını veya hedefsizliği işaret eder. Potansiyel varken kullanılmayan fırsatlar bugünkü durumun sebeplerini oluşturmuş olabilir. Belki de doğru zamanda harekete geçmediğiniz için fırsatlar elinizden kaydı.\n\nBu kart, geçmişteki bu eksikliklerin bugün hâlâ enerjinizi etkilediğini gösterir.',
    keywords: ['başlangıç', 'ilham', 'tutku', 'motivasyon', 'geçmiş'],
    context: 'Geçmişteki ilham verici başlangıçların ya da yarım kalmış girişimlerin etkisi.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_sa_pos1',
    card: 'Two of Wands',
    position: 1,
    upright:
      'İki Değnek, geçmişte yapılan planları, vizyon geliştirmeyi ve geleceğe yönelik atılan ilk adımları simgeler. Ufkunuzu genişleten bu süreç bugünkü koşulların kökeninde olabilir.\n\nBu kart, geçmişteki planlamalarınızın size yön verdiğini ve bugün karşılaştığınız fırsatlara zemin hazırladığını hatırlatır.',
    reversed:
      'Ters İki Değnek, geçmişte net vizyon eksikliği, tereddüt veya güven eksikliği yaşandığını gösterir. Belki de cesaret edemediğiniz adımlar, bugünkü durumun eksikliklerini doğurdu.\n\nBu kart, geleceği şekillendirecek hamleleri ertelemenin, bugün sıkışmışlık yarattığını anlatır.',
    keywords: ['vizyon', 'plan', 'gelecek', 'ilerleme', 'geçmiş'],
    context: 'Geçmişteki planların veya eksik vizyonun bugünkü etkisi.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_sa_pos1',
    card: 'Three of Wands',
    position: 1,
    upright:
      'Üç Değnek, geçmişte ufuk açıcı bir fırsatın yakalanmasını, yeni işbirliklerini ve genişleyen olanakları simgeler. Bu süreç, bugünkü koşulların temelini güçlendirmiş olabilir.\n\nBu kart, geçmişte atılan cesur adımların sizi bugün bulunduğunuz noktaya taşıdığını gösterir.',
    reversed:
      'Ters Üç Değnek, geçmişte yaşanan gecikmeleri, başarısız girişimleri veya beklenenin karşılanmamasını simgeler. Hayallerinizin gerçekleşmemesi, bugünkü sürecin kökeninde olabilir.\n\nBu kart, beklentilerin karşılanmadığı bir dönemin bugünkü durumunuza gölge düşürdüğünü anlatır.',
    keywords: ['fırsat', 'genişleme', 'işbirliği', 'vizyon', 'geçmiş'],
    context: 'Geçmişteki işbirlikleri veya hayal kırıklıklarının etkisi.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_sa_pos1',
    card: 'Four of Wands',
    position: 1,
    upright:
      'Dört Değnek, geçmişte yaşanan bir kutlamayı, birlikteliği veya sağlam bir temeli simgeler. Bu deneyim, size güven ve istikrar kazandırmış olabilir.\n\nBu kart, geçmişteki mutluluk anlarının bugün bile hayatınıza güç verdiğini hatırlatır.',
    reversed:
      'Ters Dört Değnek, geçmişte yaşanan uyumsuzlukları, ailevi huzursuzlukları veya istikrarsızlıkları gösterir. Belki de birliktelik yerine dağınıklık yaşandı ve bu durum bugünkü koşulları etkiledi.\n\nBu kart, geçmişteki uyumsuzlukların bugünkü istikrarı zayıflattığını anlatır.',
    keywords: ['kutlama', 'temel', 'uyum', 'başarı', 'geçmiş'],
    context: 'Geçmişteki uyum veya uyumsuzlukların etkisi.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_sa_pos1',
    card: 'Five of Wands',
    position: 1,
    upright:
      'Beş Değnek, geçmişte yaşanan rekabeti, mücadeleyi ya da fikir çatışmalarını simgeler. Bu dönem, size dayanıklılık kazandırmış olabilir.\n\nBu kart, geçmişteki mücadelenin sizi bugün daha güçlü biri haline getirdiğini gösterir.',
    reversed:
      'Ters Beş Değnek, geçmişteki gereksiz tartışmaları, uzlaşmazlıkları ya da çözülmemiş çatışmaları işaret eder. Bu durumlar bugünkü sürecin temelinde etkili olabilir.\n\nBu kart, geçmişte yaşanan bu sürtüşmelerin hâlâ etkisini sürdürdüğünü gösterir.',
    keywords: ['rekabet', 'mücadele', 'çatışma', 'dayanıklılık', 'geçmiş'],
    context: 'Geçmişteki çatışmaların ya da mücadelelerin etkisi.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_sa_pos1',
    card: 'Six of Wands',
    position: 1,
    upright:
      'Altı Değnek, geçmişte kazanılan bir zaferi, başarıyı ve tanınmayı simgeler. Bu dönemde elde edilen başarı, bugünkü motivasyonunuza temel oluşturmuş olabilir.\n\nBu kart, geçmişteki zaferin hâlâ sizi ileriye taşıdığını gösterir.',
    reversed:
      'Ters Altı Değnek, geçmişte başarıların takdir görmemesi, kıskançlıklar ya da başarısızlıklar yaşandığını işaret eder. Bu durumlar bugünkü kendinize bakışınızı etkilemiş olabilir.\n\nBu kart, geçmişte görülmeyen başarıların ya da başarısızlıkların izlerinin bugün hâlâ sürdüğünü gösterir.',
    keywords: ['zafer', 'başarı', 'tanınma', 'gurur', 'geçmiş'],
    context: 'Geçmişteki zaferlerin veya başarısızlıkların etkisi.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_sa_pos1',
    card: 'Seven of Wands',
    position: 1,
    upright:
      'Yedi Değnek, geçmişte kendinizi savunmak zorunda kaldığınız bir dönemi simgeler. Güçlü duruşunuz, bugünkü durumunuzun temelinde etkili olmuş olabilir.\n\nBu kart, geçmişte verdiğiniz mücadelelerin sizi daha dirençli biri haline getirdiğini anlatır.',
    reversed:
      'Ters Yedi Değnek, geçmişte pes etmeyi, geri çekilmeyi ya da direnç kaybını işaret eder. Bu durum, bugünkü sürecin temelinde olabilir.\n\nBu kart, geçmişte yeterince savunulmamış bir hakkın veya geri adım atmanın bugünkü etkilerini vurgular.',
    keywords: ['savunma', 'kararlılık', 'direnç', 'mücadele', 'geçmiş'],
    context: 'Geçmişteki savunmaların ya da geri çekilmelerin etkisi.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_sa_pos1',
    card: 'Eight of Wands',
    position: 1,
    upright:
      'Sekiz Değnek, geçmişte yaşanan hızlı gelişmeleri, beklenmedik haberleri veya hızlı ilerlemeyi simgeler. Bu olaylar, bugünkü sürecin temelinde önemli bir yer tutuyor olabilir.\n\nBu kart, geçmişteki hızın sizi bugün hâlâ etkileyen bir noktaya taşıdığını anlatır.',
    reversed:
      'Ters Sekiz Değnek, geçmişte yaşanan gecikmeleri, iletişim sorunlarını ya da ertelenen fırsatları işaret eder. Bu sorunlar bugünkü sürecin temelini oluşturmuş olabilir.\n\nBu kart, geçmişte kaybedilen hızın ya da iletişim eksikliklerinin bugün bile etkili olduğunu gösterir.',
    keywords: ['hız', 'haber', 'gelişme', 'iletişim', 'geçmiş'],
    context: 'Geçmişteki hızlı gelişmelerin ya da gecikmelerin etkisi.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_sa_pos1',
    card: 'Nine of Wands',
    position: 1,
    upright:
      'Dokuz Değnek, geçmişte çok çalışıp mücadele verdiğiniz ve direncinizin test edildiği bir dönemi simgeler. Bu süreç sizi daha dayanıklı ve dikkatli yapmış olabilir.\n\nBu kart, geçmişteki sabrınızın ve mücadelenizin bugünkü duruma güç kattığını hatırlatır.',
    reversed:
      'Ters Dokuz Değnek, geçmişte tükenmişliği, yorulmayı ya da sonuna kadar direnememeyi simgeler. Bu durum, bugünkü sürecin sebeplerinden biri olabilir.\n\nBu kart, geçmişte tamamlanmamış mücadelelerin bugünkü eksikliklere yol açtığını gösterir.',
    keywords: ['direnç', 'sabır', 'mücadele', 'dayanıklılık', 'geçmiş'],
    context: 'Geçmişteki direncin ya da tükenmişliğin etkisi.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_sa_pos1',
    card: 'Ten of Wands',
    position: 1,
    upright:
      'On Değnek, geçmişte omuzladığınız sorumlulukları, yükleri ve ağır sorumluluklarla geçen bir dönemi simgeler. Bu süreç, sizi daha güçlü kılmış ama aynı zamanda yormuş olabilir.\n\nBu kart, geçmişte taşınan yüklerin bugünkü duruma doğrudan etkisi olduğunu gösterir.',
    reversed:
      'Ters On Değnek, geçmişte üstlenilen gereksiz yükleri, paylaşılmamış sorumlulukları ya da tükenmişliği işaret eder. Bu durum, bugünkü sürecin temelinde olabilir.\n\nBu kart, geçmişte fazla sorumluluk almanın bugünkü sıkışmışlığa sebep olduğunu vurgular.',
    keywords: ['sorumluluk', 'yük', 'tamamlama', 'başarı', 'geçmiş'],
    context: 'Geçmişteki sorumlulukların ya da tükenmişliğin etkisi.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_sa_pos1',
    card: 'Page of Wands',
    position: 1,
    upright:
      'Değnek Prensi, geçmişte yaşanan bir keşfi, ilham verici bir başlangıcı ya da yeni bir yolculuğu simgeler. Bu enerji, bugün bulunduğunuz koşullara yön vermiş olabilir.\n\nBu kart, geçmişteki hevesli girişimlerin bugün bile yolunuzu şekillendirdiğini gösterir.',
    reversed:
      'Ters Değnek Prensi, geçmişte dikkatsizlik, motivasyon kaybı ya da yüzeysel girişimleri işaret eder. Bu eksiklikler, bugünkü sürecin temelini oluşturmuş olabilir.\n\nBu kart, geçmişte doğru şekilde değerlendirilmeyen fırsatların bugünkü sıkışmışlığa yol açtığını anlatır.',
    keywords: ['keşif', 'ilham', 'başlangıç', 'heyecan', 'geçmiş'],
    context: 'Geçmişteki keşiflerin ya da yüzeysel girişimlerin etkisi.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_sa_pos1',
    card: 'Knight of Wands',
    position: 1,
    upright:
      'Değnek Şövalyesi, geçmişte cesaretle atılan adımları, hızlı gelişmeleri ve tutkulu girişimleri simgeler. Bu enerji, sizi bugünkü koşullara taşımış olabilir.\n\nBu kart, geçmişteki cesur tavrınızın sizi ileriye taşıyan bir itici güç olduğunu gösterir.',
    reversed:
      'Ters Değnek Şövalyesi, geçmişte acelecilik, savrukluk ya da yönsüzlük yaşandığını simgeler. Bu davranışlar, bugünkü sürecin kökeninde yer alıyor olabilir.\n\nBu kart, geçmişteki yönsüz girişimlerin bugünkü sıkışmışlığa sebep olduğunu anlatır.',
    keywords: ['cesaret', 'tutku', 'hareket', 'hız', 'geçmiş'],
    context: 'Geçmişteki cesur adımların ya da aceleciliklerin etkisi.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_sa_pos1',
    card: 'Queen of Wands',
    position: 1,
    upright:
      'Değnek Kraliçesi, geçmişte özgüveni yüksek, karizmatik ve lider ruhlu bir etkiyi simgeler. Bu siz olabilir ya da hayatınızdaki güçlü bir figür olabilir. Onun etkisi bugünkü koşullarınızı şekillendirmiştir.\n\nBu kart, geçmişteki bu liderliğin size cesaret ve karizma kattığını gösterir.',
    reversed:
      'Ters Değnek Kraliçesi, geçmişte yaşanan güvensizlikleri, kıskançlıkları ya da dengesizlikleri işaret eder. Bu durumlar, bugünkü koşulların temelini oluşturmuş olabilir.\n\nBu kart, geçmişteki bu olumsuz etkilerin bugün bile size yön verdiğini anlatır.',
    keywords: ['özgüven', 'karizma', 'liderlik', 'güç', 'geçmiş'],
    context: 'Geçmişteki özgüven ya da güvensizliğin etkisi.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_sa_pos1',
    card: 'King of Wands',
    position: 1,
    upright:
      'Değnek Kralı, geçmişte vizyoner bir liderliği, güçlü bir yönlendirmeyi veya büyük bir başarıyı simgeler. Bu figür, sizin ya da çevrenizdeki birinin enerjisi olabilir ve bugünkü durumun temelini oluşturmuş olabilir.\n\nBu kart, geçmişteki liderliğin ya da vizyonun, bugün hâlâ size yol gösterdiğini gösterir.',
    reversed:
      'Ters Değnek Kralı, geçmişte kibir, yön kaybı ya da otorite baskısını işaret eder. Bu durumlar bugünkü koşulların kökeninde olabilir.\n\nBu kart, geçmişteki otorite figürlerinin ya da yanlış liderliğin bugün yaşadığınız sorunlara yol açtığını gösterir.',
    keywords: ['liderlik', 'vizyon', 'otorite', 'güç', 'geçmiş'],
    context: 'Geçmişteki vizyoner başarıların ya da kibirli tavırların etkisi.',
    group: 'Asalar',
  },
  //-- Tılsımlar --//
  {
    id: 'ace_of_pentacles_sa_pos1',
    card: 'Ace of Pentacles',
    position: 1,
    upright:
      'Tılsım Ası, geçmişte atılan sağlam bir adımı, maddi güvenceyi veya yeni bir fırsatı simgeler. Bu, bir işe başlamak, yatırım yapmak ya da hayatınıza istikrar katan bir fırsatı değerlendirmek olabilir. O dönem, bugünkü koşullarınızın temel taşlarından birini oluşturmuştur.\n\nBu kart, geçmişteki bu güvenli başlangıcın size hâlâ destek olduğunu hatırlatır.',
    reversed:
      'Ters Tılsım Ası, geçmişte kaçırılan fırsatları, yanlış yatırımları veya güvensiz temelleri işaret eder. Potansiyel varken değerlendirilmemesi ya da zayıf temeller üzerine kurulan işler, bugünkü durumunuzun sebeplerini oluşturmuş olabilir.\n\nBu kart, geçmişte kaçırılan ya da yanlış değerlendirilen fırsatların bugün hâlâ size etki ettiğini gösterir.',
    keywords: ['fırsat', 'maddi güven', 'başlangıç', 'istikrar', 'geçmiş'],
    context: 'Geçmişteki fırsatların veya kaçırılan başlangıçların etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_sa_pos1',
    card: 'Two of Pentacles',
    position: 1,
    upright:
      'İki Tılsım, geçmişte sorumlulukları dengelemek için verdiğiniz çabaları simgeler. İş, aile veya maddi konular arasında kurduğunuz denge, bugünkü koşullarınızın temelinde olabilir.\n\nBu kart, geçmişteki esnekliğinizin ve uyum sağlama yeteneğinizin bugün hâlâ size destek olduğunu hatırlatır.',
    reversed:
      'Ters İki Tılsım, geçmişte yaşanan dengesizlikleri, sorumlulukların altında ezilmeyi ya da gereksiz karmaşaları simgeler. Bu durum, bugünkü sıkışmışlığın sebeplerini oluşturmuş olabilir.\n\nBu kart, geçmişte dağılan enerjilerin bugünkü dengelerinizi hâlâ etkilediğini anlatır.',
    keywords: ['denge', 'sorumluluk', 'esneklik', 'uyum', 'geçmiş'],
    context: 'Geçmişteki denge arayışının veya dengesizliklerin etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_sa_pos1',
    card: 'Three of Pentacles',
    position: 1,
    upright:
      'Üç Tılsım, geçmişteki işbirliklerini, ekip çalışmalarını veya öğrenme süreçlerini simgeler. Ortak bir çabayla elde edilen başarı, bugünkü koşullarınıza zemin hazırlamış olabilir.\n\nBu kart, geçmişte birlikte inşa ettiklerinizin hâlâ size yol gösterdiğini anlatır.',
    reversed:
      'Ters Üç Tılsım, geçmişteki uyumsuzlukları, destek eksikliğini ya da başarısız işbirliklerini simgeler. Bu sorunlar, bugünkü durumunuzun temelinde olabilir.\n\nBu kart, geçmişte yeterince destek bulamamanın veya yanlış işbirliklerinin bugüne yansıdığını gösterir.',
    keywords: ['işbirliği', 'öğrenme', 'ekip', 'başarı', 'geçmiş'],
    context: 'Geçmişteki işbirliklerinin veya uyumsuzlukların etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_sa_pos1',
    card: 'Four of Pentacles',
    position: 1,
    upright:
      'Dört Tılsım, geçmişte sahip olduklarınızı koruma arzunuzu, güvenliğe verdiğiniz önemi ve istikrar arayışınızı simgeler. Bu tutum, bugünkü koşullarınızın kökeninde olabilir.\n\nBu kart, geçmişteki bu güvenlik arayışının size hâlâ yön verdiğini gösterir.',
    reversed:
      'Ters Dört Tılsım, geçmişte cimrilik, aşırı kontrol ya da kayıplar yüzünden güven kaybı yaşandığını işaret eder. Bu deneyimler bugünkü durumunuzun temelinde olabilir.\n\nBu kart, geçmişteki kaygıların bugün hâlâ güvenlik ihtiyacınızı artırdığını anlatır.',
    keywords: ['güvenlik', 'istikrar', 'koruma', 'maddi güç', 'geçmiş'],
    context: 'Geçmişteki güvenlik arayışının ya da kayıpların etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_sa_pos1',
    card: 'Five of Pentacles',
    position: 1,
    upright:
      'Beş Tılsım, geçmişte yaşanan maddi sıkıntıları, yalnızlık dönemlerini veya dışlanmışlık hissini simgeler. Bu zorlu süreç, bugünkü durumun temelinde olabilir.\n\nBu kart, geçmişteki kayıpların size dayanıklılık kazandırdığını da hatırlatır.',
    reversed:
      'Ters Beş Tılsım, geçmişte toparlanma fırsatlarını, destek görmeyi veya zorluklardan çıkışı simgeler. Belki de bu süreç size yeni bir güç kazandırdı. Ancak aynı zamanda yaşanan sıkıntılar bugünkü ruh halinizi hâlâ etkiliyor olabilir.\n\nBu kart, geçmişte yaşanan kayıpların bugüne bıraktığı izleri işaret eder.',
    keywords: ['maddi zorluk', 'yalnızlık', 'destek', 'kayıp', 'geçmiş'],
    context: 'Geçmişteki maddi zorlukların ya da toparlanmaların etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_sa_pos1',
    card: 'Six of Pentacles',
    position: 1,
    upright:
      'Altı Tılsım, geçmişte aldığınız ya da verdiğiniz yardımları, destek ilişkilerini ve paylaşımı simgeler. Bu etkileşimler, bugünkü koşulların temelinde olabilir.\n\nBu kart, geçmişteki adil paylaşımların sizi bugüne taşıyan unsurlardan biri olduğunu gösterir.',
    reversed:
      'Ters Altı Tılsım, geçmişte yaşanan adaletsizlikleri, bağımlılıkları ya da dengesiz ilişkileri işaret eder. Bu durumlar bugünkü sorunların kökeninde olabilir.\n\nBu kart, geçmişte eşitsiz paylaşımın bugüne kadar iz bıraktığını anlatır.',
    keywords: ['yardım', 'paylaşım', 'adalet', 'denge', 'geçmiş'],
    context: 'Geçmişteki yardımların veya adaletsizliklerin etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_sa_pos1',
    card: 'Seven of Pentacles',
    position: 1,
    upright:
      'Yedi Tılsım, geçmişte emek verdiğiniz, sabırla beklediğiniz ve sonuçlarını görmek için çalıştığınız süreçleri simgeler. Bu çabalar, bugünkü koşulların temelinde olabilir.\n\nBu kart, geçmişteki sabrınızın ve emeğinizin bugün hâlâ sonuçlarını verdiğini hatırlatır.',
    reversed:
      'Ters Yedi Tılsım, geçmişteki sabırsızlıkları, yanlış yatırımları ya da sonuçsuz kalan çabaları işaret eder. Bu deneyimler, bugünkü durumunuzun kökeninde olabilir.\n\nBu kart, geçmişte emeğinizin karşılığını alamamanın bugüne etkilerini gösterir.',
    keywords: ['emek', 'sabır', 'yatırım', 'ödül', 'geçmiş'],
    context: 'Geçmişteki sabırlı ya da sabırsız adımların etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_sa_pos1',
    card: 'Eight of Pentacles',
    position: 1,
    upright:
      'Sekiz Tılsım, geçmişte öğrendiğiniz becerileri, geliştirdiğiniz ustalıkları ve verdiğiniz emeği simgeler. Bu çalışmalar, bugünkü durumun temelinde olabilir.\n\nBu kart, geçmişteki öğrenme sürecinizin bugün hâlâ meyvelerini verdiğini hatırlatır.',
    reversed:
      'Ters Sekiz Tılsım, geçmişte dikkatsizce yapılan işleri, özensizlikleri ya da öğrenme fırsatlarının kaçırılmasını işaret eder. Bu durumlar bugünkü eksikliklerin temelinde olabilir.\n\nBu kart, geçmişte atlanan derslerin bugünkü sorunlara yol açtığını gösterir.',
    keywords: ['öğrenme', 'ustalık', 'emek', 'başarı', 'geçmiş'],
    context: 'Geçmişteki öğrenmelerin veya ihmallerin etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_sa_pos1',
    card: 'Nine of Pentacles',
    position: 1,
    upright:
      'Dokuz Tılsım, geçmişte kazanılan bağımsızlığı, bolluğu ve özgüveni simgeler. Bu başarılar, bugünkü koşulların temelini oluşturmuş olabilir.\n\nBu kart, geçmişteki özgüveninizin bugün hâlâ size destek verdiğini gösterir.',
    reversed:
      'Ters Dokuz Tılsım, geçmişteki savurganlıkları, bağımlılıkları veya kayıpları işaret eder. Bu deneyimler bugünkü durumun sebeplerini oluşturmuş olabilir.\n\nBu kart, geçmişte özgürlüğünüzü kısıtlayan durumların bugüne etkisini vurgular.',
    keywords: ['bağımsızlık', 'özgüven', 'bolluk', 'özgürlük', 'geçmiş'],
    context: 'Geçmişteki bağımsızlığın veya bağımlılıkların etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_sa_pos1',
    card: 'Ten of Pentacles',
    position: 1,
    upright:
      'On Tılsım, geçmişteki ailevi istikrarı, uzun vadeli başarıları veya güvenceyi simgeler. Bu miras, bugünkü koşulların temelini oluşturmuş olabilir.\n\nBu kart, geçmişteki bu kalıcı güvenin bugün hâlâ sizi desteklediğini gösterir.',
    reversed:
      'Ters On Tılsım, geçmişte yaşanan ailevi huzursuzlukları, kayıpları ya da başarısız yatırımları işaret eder. Bu deneyimler, bugünkü sürecin kökeninde olabilir.\n\nBu kart, geçmişteki güvencelerin kaybının bugün hâlâ sizi etkilediğini anlatır.',
    keywords: ['aile', 'istikrar', 'güvence', 'miras', 'geçmiş'],
    context: 'Geçmişteki ailevi ya da maddi mirasların etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_sa_pos1',
    card: 'Page of Pentacles',
    position: 1,
    upright:
      'Tılsım Prensi, geçmişte atılan küçük ama değerli bir adımı, öğrenme fırsatını veya maddi güvene doğru ilk girişimi simgeler. Bu deneyim, bugünkü koşulların temelinde olabilir.\n\nBu kart, geçmişteki merakın ve öğrenme isteğinin bugün hâlâ size destek verdiğini hatırlatır.',
    reversed:
      'Ters Tılsım Prensi, geçmişte motivasyon eksikliğini, fırsatların değerlendirilememesini ya da öğrenme süreçlerinde yaşanan tembelliği simgeler. Bu durum, bugünkü sorunların kökeninde olabilir.\n\nBu kart, geçmişte kaçırılan fırsatların bugünkü gelişim sürecinizi yavaşlattığını anlatır.',
    keywords: ['öğrenme', 'fırsat', 'başlangıç', 'maddi güven', 'geçmiş'],
    context: 'Geçmişteki öğrenme fırsatlarının veya motivasyon eksikliklerinin etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_sa_pos1',
    card: 'Knight of Pentacles',
    position: 1,
    upright:
      'Tılsım Şövalyesi, geçmişte istikrarlı bir ilerleyişi, sabrı ve sorumlulukları yerine getirmeyi simgeler. Bu tutum, bugünkü koşulların temelinde olabilir.\n\nBu kart, geçmişteki azminizin ve disiplininizin bugün hâlâ size güç verdiğini hatırlatır.',
    reversed:
      'Ters Tılsım Şövalyesi, geçmişte tembelliği, durağanlığı veya görevleri ihmal etmeyi simgeler. Bu tutum, bugünkü sorunların kökeninde olabilir.\n\nBu kart, geçmişteki sorumluluk eksikliğinin bugünkü durumunuzu zayıflattığını anlatır.',
    keywords: ['istikrar', 'sorumluluk', 'azim', 'sabır', 'geçmiş'],
    context: 'Geçmişteki istikrarın veya ihmalkârlığın etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_sa_pos1',
    card: 'Queen of Pentacles',
    position: 1,
    upright:
      'Tılsım Kraliçesi, geçmişte sağlanan bolluğu, şefkatle verilen desteği ve güvenliği simgeler. Bu enerji, bugünkü koşulların temelinde olabilir.\n\nBu kart, geçmişteki şefkatli desteklerin bugün hâlâ sizi koruduğunu gösterir.',
    reversed:
      'Ters Tılsım Kraliçesi, geçmişte öz bakım eksikliğini, güvensizliği veya aşırı bağımlılıkları simgeler. Bu durum, bugünkü sorunların kökeninde olabilir.\n\nBu kart, geçmişte kendinize yeterince özen göstermemenin bugünkü duruma etkisini vurgular.',
    keywords: ['bolluk', 'şefkat', 'güvenlik', 'destek', 'geçmiş'],
    context: 'Geçmişteki bolluk veya güvensizliklerin etkisi.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_sa_pos1',
    card: 'King of Pentacles',
    position: 1,
    upright:
      'Tılsım Kralı, geçmişte elde edilen büyük bir başarıyı, maddi güvenceyi ve otoriteyi simgeler. Bu enerji, bugünkü koşulların temelinde olabilir.\n\nBu kart, geçmişteki bu otoritenin ve başarının hâlâ size yol gösterdiğini hatırlatır.',
    reversed:
      'Ters Tılsım Kralı, geçmişte aşırı hırsı, otoriterliği ya da maddi kayıpları simgeler. Bu deneyimler bugünkü sürecin kökeninde olabilir.\n\nBu kart, geçmişte kontrolsüz hırsların ya da kayıpların bugün hâlâ size etki ettiğini gösterir.',
    keywords: ['başarı', 'otorite', 'bolluk', 'güvenlik', 'geçmiş'],
    context: 'Geçmişteki başarıların ya da hırsların etkisi.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 1 anlamını bulma fonksiyonu
export const getPosition1Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return position1Meanings.find(
    meaning => meaning.card === cardName
  );
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getSituationAnalysisPosition1Meaning = (
  cardName: string,
  isReversed: boolean = false
): SituationAnalysisPositionMeaning | undefined => {
  return getPosition1Meaning(cardName, isReversed);
};

// Kart adına göre pozisyon 1 anlamını bulma fonksiyonu (ana index için)
export const getSituationAnalysisPosition1MeaningByCardName = (
  cardName: string,
  isReversed: boolean = false
): SituationAnalysisPositionMeaning | undefined => {
  const meaning = getPosition1Meaning(cardName, isReversed);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 1 anlamlarını alma fonksiyonu
export const getAllPosition1Meanings = (): SituationAnalysisPositionMeaning[] => {
  return position1Meanings;
};

// Pozisyon 1 anlamlarını filtreleme fonksiyonu
export const getPosition1MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): SituationAnalysisPositionMeaning[] => {
  return position1Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 1 anlamlarını arama
export const searchPosition1MeaningsByKeyword = (
  keyword: string
): SituationAnalysisPositionMeaning[] => {
  return position1Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position1Meanings,
  getPosition1Meaning,
  getAllPosition1Meanings,
  getPosition1MeaningsByGroup,
  searchPosition1MeaningsByKeyword,
};
