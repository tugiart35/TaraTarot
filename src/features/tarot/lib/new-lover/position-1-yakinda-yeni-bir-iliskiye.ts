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

export interface NewLoverPosition1Meaning {
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
export interface I18nNewLoverPosition1Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position1Meanings: NewLoverPosition1Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_na_pos1',
    card: 'The Fool',
    position: 1,
    upright:
      'Deli, sana yeni bir başlangıcın eşiğinde olduğunu fısıldar. Yakında hayatına taze bir enerji ve sürpriz bir tanışma gelebilir.',
    reversed:
      'Ters Deli, dikkatsizce atılan adımların kısa süreli bir ilişkiye yol açabileceğini gösterir. Yeniye açılırken sabırlı olmalısın.',
    keywords: ['başlangıç', 'sürpriz', 'özgürlük', 'deneyim'],
    context: 'Yeni bir ilişki olasılığı çok yüksek ama dikkat ve denge gerekli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_na_pos1',
    card: 'The Magician',
    position: 1,
    upright:
      'Büyücü, karizman ve niyetinle yeni bir ilişkiyi çağırabileceğini gösteriyor. Yakında dikkat çekecek ve güçlü bir bağ kurma şansı doğacak.',
    reversed:
      'Ters Büyücü, hayal kırıklığına uğramamak için gözünü açık tutmanı söylüyor. İllüzyonlara kapılmamalısın.',
    keywords: ['çekim', 'başlangıç', 'irade', 'bağlantı'],
    context: 'İlişki ihtimali güçlü, niyetin netleşmeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_na_pos1',
    card: 'The High Priestess',
    position: 1,
    upright:
      'Başrahibe, görünmeyen bir ilişkinin kapıda olduğunu haber verir. Sessizlik içinde doğacak bir tanışma seni şaşırtabilir.',
    reversed:
      'Ters Başrahibe, sezgilerini bastırırsan fırsatı fark etmeyebilirsin. Kalbini açman gerekiyor.',
    keywords: ['sezgi', 'sır', 'fırsat', 'bekleyiş'],
    context: 'Yakında ilişki var, ama sabır ve sezgi şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_na_pos1',
    card: 'The Empress',
    position: 1,
    upright:
      'İmparatoriçe, yakında seni besleyen ve sevgiyle büyüten bir ilişkiye işaret ediyor. Duygusal ve fiziksel uyum seni mutlu edecek.',
    reversed:
      'Ters İmparatoriçe, aşırı bağımlılığa kapılma uyarısı yapar. İlişki gelse bile dengeyi korumalısın.',
    keywords: ['sevgi', 'besleme', 'uyum', 'bolluk'],
    context: 'Yeni ilişki sıcak ve bereketli bir şekilde gelebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_na_pos1',
    card: 'The Emperor',
    position: 1,
    upright:
      'İmparator, güçlü, güven veren bir kişinin hayatına gireceğini söyler. Yakında ciddi niyetli bir ilişki başlayabilir.',
    reversed:
      'Ters İmparator, kontrolcü bir partner ihtimaline karşı dikkat etmeni öğütler. İlişki gelse bile özgürlüğünü korumalısın.',
    keywords: ['güç', 'istikrar', 'otorite', 'koruma'],
    context: 'Ciddi ve sağlam temelli bir ilişki şansı var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_na_pos1',
    card: 'The Hierophant',
    position: 1,
    upright:
      'Aziz, toplum onaylı, ciddi ve geleneksel bir ilişki ihtimaline işaret eder. Yakında ciddi niyetlerle gelen biri olabilir.',
    reversed:
      'Ters Aziz, bağlanma korkusu veya farklı değerler sebebiyle engeller olabileceğini gösterir.',
    keywords: ['gelenek', 'ciddiyet', 'bağlanma', 'değerler'],
    context: 'Yakında ciddi ve güvenli bir ilişki başlayabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_na_pos1',
    card: 'The Lovers',
    position: 1,
    upright:
      'Aşıklar, güçlü bir romantik bağın doğacağını söyler. Yakında kalbinle uyumlu biriyle buluşma çok mümkün.',
    reversed:
      'Ters Aşıklar, kararsızlık veya yanlış seçim riskine işaret eder. Doğru kişiyi seçmeye odaklan.',
    keywords: ['aşk', 'uyum', 'bağlantı', 'karar'],
    context: 'Yeni ilişki ihtimali çok yüksek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_na_pos1',
    card: 'The Chariot',
    position: 1,
    upright:
      'Savaş Arabası, ilerleme ve kararlılıkla yeni bir ilişkiye hızla girebileceğini söyler.',
    reversed:
      'Ters Savaş Arabası, kontrol eksikliği nedeniyle fırsatların kaçabileceğini uyarır.',
    keywords: ['ilerleme', 'hız', 'kararlılık', 'yön'],
    context: 'Yeni bir ilişki yakında hızla gelebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_na_pos1',
    card: 'Strength',
    position: 1,
    upright:
      'Güç, içsel dinginliğin seni yeni bir ilişkiye çekeceğini söyler. Nazik cesaretin başkasının kalbini açabilir.',
    reversed:
      'Ters Güç, fazla gurur veya kontrolün yeni ilişkiye engel olabileceğini söyler.',
    keywords: ['cesaret', 'naziklik', 'çekim', 'denge'],
    context: 'Yakında ilişki mümkün, sabırla yaklaş.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_na_pos1',
    card: 'The Hermit',
    position: 1,
    upright:
      'Ermiş, kendi içine dönerek öğrendiklerin seni doğru ilişkiye hazırlıyor. Yakında bu yalnızlık son bulabilir.',
    reversed:
      'Ters Ermiş, fazla kapanıklık yeni ilişkiyi geciktirebilir. Daha sosyal olmalısın.',
    keywords: ['içsel yolculuk', 'bilgelik', 'bekleyiş', 'hazırlık'],
    context: 'Yakında ilişki olabilir ama içe dönüş süreci etkili.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_na_pos1',
    card: 'Wheel of Fortune',
    position: 1,
    upright:
      'Kader Çarkı, sürpriz bir şekilde yeni bir ilişkinin kapında olacağını söyler.',
    reversed:
      'Ters Çark, yanlış zamanlama nedeniyle fırsatların ertelenebileceğini gösterir.',
    keywords: ['kader', 'sürpriz', 'zamanlama', 'şans'],
    context: 'Yakında ilişki ihtimali güçlü, zamanlama önemli.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_na_pos1',
    card: 'Justice',
    position: 1,
    upright:
      'Adalet, dürüstlük ve dengeyle kurulacak bir ilişkinin yaklaştığını gösterir.',
    reversed:
      'Ters Adalet, yanlış anlaşılmaların yeni ilişkiyi zorlaştırabileceğini söyler.',
    keywords: ['denge', 'dürüstlük', 'adalet', 'uyum'],
    context: 'Yakında adil ve dengeli bir ilişki gelebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_na_pos1',
    card: 'The Hanged Man',
    position: 1,
    upright:
      'Asılan Adam, yeni bir ilişkinin zaman istediğini anlatır. Bekleyiş, seni doğru kişiye hazırlıyor.',
    reversed:
      'Ters Asılan Adam, gereksiz ertelemelerin yeni ilişkiyi geciktireceğini uyarır.',
    keywords: ['bekleyiş', 'zaman', 'teslimiyet', 'farklı bakış'],
    context: 'Yeni ilişki gelebilir ama zamanlama sabır ister.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_na_pos1',
    card: 'Death',
    position: 1,
    upright:
      'Ölüm, eski bağların bitişiyle yeni bir ilişki başlayabilir. Alan açıldığında aşk gelecektir.',
    reversed:
      'Ters Ölüm, geçmişe tutunmak yeni ilişkiye engel olabilir.',
    keywords: ['bitiş', 'yenilenme', 'dönüşüm', 'başlangıç'],
    context: 'Yeni ilişki için geçmişin bırakılması şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_na_pos1',
    card: 'Temperance',
    position: 1,
    upright:
      'Denge, uyumlu ve sabırlı bir ilişkinin yaklaştığını işaret ediyor.',
    reversed:
      'Ters Denge, aşırılıkların yeni ilişkiyi zorlaştırabileceğini söylüyor.',
    keywords: ['denge', 'uyum', 'sabır', 'sadelik'],
    context: 'Yeni ilişki sabır ve uyumla yakında gelecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_na_pos1',
    card: 'The Devil',
    position: 1,
    upright:
      'Şeytan, yoğun tutkularla başlayan bir ilişkiyi işaret edebilir. Yakında güçlü bir çekim yaşanabilir.',
    reversed:
      'Ters Şeytan, bağımlılık ve sağlıksız bağlara dikkat çekiyor. Yakında ilişki olsa bile sağlıklı olmasına odaklan.',
    keywords: ['tutku', 'çekim', 'gölge', 'bağımlılık'],
    context: 'Yeni ilişki mümkün ama denge önemli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_na_pos1',
    card: 'The Tower',
    position: 1,
    upright:
      'Kule, beklenmedik bir tanışma ile hayatına yeni biri girebilir. Şaşırtıcı bir başlangıç mümkün.',
    reversed:
      'Ters Kule, gecikmiş ama ani bir değişimle yeni ilişki doğabilir.',
    keywords: ['şok', 'değişim', 'sürpriz', 'başlangıç'],
    context: 'Yakında beklenmedik bir ilişki başlayabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_na_pos1',
    card: 'The Star',
    position: 1,
    upright:
      'Yıldız, umut ve yenilenme getirir. Yakında huzurlu ve ilham verici bir ilişki başlayabilir.',
    reversed:
      'Ters Yıldız, umutsuzluğun yeni ilişkiyi geciktireceğini söyler.',
    keywords: ['umut', 'ilham', 'şifa', 'başlangıç'],
    context: 'Yeni ilişki olasılığı yüksek, umut canlı tutulmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_na_pos1',
    card: 'The Moon',
    position: 1,
    upright:
      'Ay, duygusal ve gizemli bir ilişkinin yaklaştığını gösterir. Yakında hislerin seni yönlendirecek.',
    reversed:
      'Ters Ay, aldatıcı durumlara dikkat etmeni öğütler. Açık gözle ilerle.',
    keywords: ['duygu', 'gizem', 'sezgi', 'belirsizlik'],
    context: 'Yakında ilişki var ama netlik gerekli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_na_pos1',
    card: 'The Sun',
    position: 1,
    upright:
      'Güneş, kesinlikle yeni bir ilişkinin doğacağını söyler. Mutluluk ve netlik seni bekliyor.',
    reversed:
      'Ters Güneş, yanlış beklentilerin gölge yaratabileceğini uyarır. Yine de ilişki potansiyeli yüksek.',
    keywords: ['mutluluk', 'netlik', 'başlangıç', 'sevinç'],
    context: 'Yeni ilişki neredeyse kesin.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_na_pos1',
    card: 'Judgement',
    position: 1,
    upright:
      'Mahkeme, geçmişin kapanışıyla yeni bir ilişki için yeniden doğuşu işaret eder.',
    reversed:
      'Ters Mahkeme, geçmişte takılı kalmak yeni ilişkiyi engelleyebilir.',
    keywords: ['yenilenme', 'farkındalık', 'başlangıç', 'kapanış'],
    context: 'Yakında ilişki olabilir, geçmişi bırakmak gerek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_na_pos1',
    card: 'The World',
    position: 1,
    upright:
      'Dünya, tamamlanmış döngüden sonra yeni bir ilişkinin başlayacağını söyler. Yakında hayatına uyum getiren biri girebilir.',
    reversed:
      'Ters Dünya, eksik kapanışların yeni ilişkiyi erteleyebileceğini gösterir.',
    keywords: ['tamamlanma', 'başlangıç', 'uyum', 'döngü'],
    context: 'Yeni ilişki kapıda, döngü tamamlanıyor.',
    group: 'Majör Arkana',
  },

  //-- Kupalar --//
  {
    id: 'ace_of_cups_na_pos1',
    card: 'Ace of Cups',
    position: 1,
    upright:
      'Kupaların Ası, kalbin yepyeni bir aşka açıldığını müjdeler. Yakında duygusal bir başlangıç ve yoğun romantizm yaşayabilirsin.',
    reversed:
      'Ters Kupaların Ası, duygularını kapatman nedeniyle fırsatların kaçabileceğini söyler. Yeni ilişki gelse de, açılmaya direnebilirsin.',
    keywords: ['aşk', 'başlangıç', 'duygu', 'romantizm'],
    context: 'Yeni aşk olasılığı çok güçlü, kalbin hazır olmalı.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_na_pos1',
    card: 'Two of Cups',
    position: 1,
    upright:
      'Kupaların İkilisi, yakında eşit ve uyumlu bir ilişkinin doğacağını söyler. Karşılıklı çekim ve ortak niyet çok net.',
    reversed:
      'Ters Kupaların İkilisi, yanlış anlaşılmalar veya dengesiz bir bağ ihtimaline işaret eder.',
    keywords: ['uyum', 'çekim', 'karşılıklılık', 'ortaklık'],
    context: 'Yakında karşılıklı çekimle bir ilişki başlayabilir.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_na_pos1',
    card: 'Three of Cups',
    position: 1,
    upright:
      'Kupaların Üçlüsü, sosyal çevre veya arkadaşlık yoluyla yeni bir ilişkiye işaret eder. Kutlama ve mutluluk enerjisi seni çağırıyor.',
    reversed:
      'Ters Kupaların Üçlüsü, yanlış çevre veya üçüncü kişilerin etkisiyle karışık bir başlangıç riskine dikkat çeker.',
    keywords: ['sosyal', 'kutlama', 'çevre', 'birliktelik'],
    context: 'Yeni ilişki, sosyal ortam aracılığıyla doğabilir.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_na_pos1',
    card: 'Four of Cups',
    position: 1,
    upright:
      'Kupaların Dörtlüsü, yeni bir ilişki fırsatını görmeyebileceğini söylüyor. Kalbin önünde duran teklife dikkat etmelisin.',
    reversed:
      'Ters Kupaların Dörtlüsü, farkındalığın artmasıyla yeni bir ilişkiye açılabileceğini gösterir.',
    keywords: ['fırsat', 'durgunluk', 'farkındalık', 'açılım'],
    context: 'Yakında ilişki olabilir, ama fark etmen lazım.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_na_pos1',
    card: 'Five of Cups',
    position: 1,
    upright:
      'Kupaların Beşlisi, geçmiş hayal kırıklıklarını bırakmadıkça yeni ilişkiye hazır olmayacağını anlatır. Oysa önünde yeni fırsatlar var.',
    reversed:
      'Ters Kupaların Beşlisi, yasın ardından kalbin yeni ilişkiye açılmaya başladığını söyler.',
    keywords: ['kayıp', 'şifa', 'yeni fırsat', 'yenilenme'],
    context: 'Geçmişi bırakırsan yeni ilişki gelebilir.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_na_pos1',
    card: 'Six of Cups',
    position: 1,
    upright:
      'Kupaların Altılısı, geçmişten biriyle yeniden ilişki doğabilir ya da çocuk ruhlu masum bir aşk yakında gelebilir.',
    reversed:
      'Ters Kupaların Altılısı, geçmişe saplanıp kalırsan yeni ilişki kapısı açılmaz.',
    keywords: ['geçmiş', 'nostalji', 'masumiyet', 'tekrar'],
    context: 'Yeni ilişki geçmiş bağlarla ilişkili olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_na_pos1',
    card: 'Seven of Cups',
    position: 1,
    upright:
      'Kupaların Yedilisi, çok sayıda aşk fırsatıyla karşılaşabileceğini gösterir. Ancak doğru seçimi yapman önemli.',
    reversed:
      'Ters Kupaların Yedilisi, kafandaki illüzyonların dağılacağını ve gerçek bir ilişkiyi seçebileceğini söyler.',
    keywords: ['seçenek', 'hayal', 'karar', 'fırsat'],
    context: 'Yakında ilişki fırsatları çok olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_na_pos1',
    card: 'Eight of Cups',
    position: 1,
    upright:
      'Kupaların Sekizlisi, artık sana hizmet etmeyen bağlardan çıkıp yeni bir aşka doğru ilerleyeceğini gösterir.',
    reversed:
      'Ters Kupaların Sekizlisi, geçmişi bırakmakta zorlanmanın yeni ilişkiyi geciktirdiğini söyler.',
    keywords: ['ayrılık', 'ilerleme', 'yeni yol', 'değişim'],
    context: 'Yeni ilişki için eskiyi geride bırakman gerek.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_na_pos1',
    card: 'Nine of Cups',
    position: 1,
    upright:
      'Kupaların Dokuzlusu, dileğinin gerçekleşeceğini ve yakında kalbini doyuran bir ilişkiye kavuşacağını söyler.',
    reversed:
      'Ters Kupaların Dokuzlusu, yüzeysel tatminin gerçek mutluluğu engelleyebileceğini uyarır.',
    keywords: ['dilek', 'tatmin', 'keyif', 'mutluluk'],
    context: 'Yeni ilişki dileğin gerçekleşebilir.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_na_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'Kupaların Onlusu, mutlu ve huzurlu bir ilişki ihtimalini işaret eder. Yakında kalbine ev duygusu verecek biriyle karşılaşabilirsin.',
    reversed:
      'Ters Kupaların Onlusu, beklentiler ile gerçeklik arasında farklar olabileceğini gösterir.',
    keywords: ['mutluluk', 'uyum', 'aile', 'huzur'],
    context: 'Yakında uyumlu ve huzurlu bir ilişki mümkün.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_na_pos1',
    card: 'Page of Cups',
    position: 1,
    upright:
      'Kupaların Prensi, romantik ve sürprizli bir başlangıcı haber verir. Yakında masum bir aşk seni bulabilir.',
    reversed:
      'Ters Kupaların Prensi, duygusal olgunluğun eksikliği nedeniyle yeni ilişkinin kısa sürebileceğini söyler.',
    keywords: ['romantizm', 'masumiyet', 'sürpriz', 'hassasiyet'],
    context: 'Yakında romantik bir ilişki doğabilir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_na_pos1',
    card: 'Knight of Cups',
    position: 1,
    upright:
      'Kupaların Şövalyesi, hayatına romantik bir teklif ya da aşk dolu bir kişi gireceğini söyler.',
    reversed:
      'Ters Kupaların Şövalyesi, tutarsızlık veya hayal kırıklığı riski olabileceğini gösterir.',
    keywords: ['romantizm', 'teklif', 'çekim', 'vizyon'],
    context: 'Yakında romantik bir teklif alabilirsin.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_na_pos1',
    card: 'Queen of Cups',
    position: 1,
    upright:
      'Kupaların Kraliçesi, empatik, sevgi dolu ve derin hisleri olan bir eş adayına işaret eder. Yakında böyle biriyle karşılaşabilirsin.',
    reversed:
      'Ters Kupaların Kraliçesi, duygusal dengesizlik veya aşırı hassasiyet riskini anlatır.',
    keywords: ['empati', 'sevgi', 'hassasiyet', 'derinlik'],
    context: 'Yakında duygusal olarak güçlü bir eş adayı gelebilir.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_na_pos1',
    card: 'King of Cups',
    position: 1,
    upright:
      'Kupaların Kralı, olgun, dengeli ve duygusal olarak güvenilir bir partnerin hayatına gireceğini söyler.',
    reversed:
      'Ters Kupaların Kralı, duygularını bastıran veya manipülatif bir kişiyle karşılaşabileceğini uyarır.',
    keywords: ['olgunluk', 'denge', 'sevgi', 'güven'],
    context: 'Yakında duygusal açıdan olgun biriyle ilişki başlayabilir.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_na_pos1',
    card: 'Ace of Swords',
    position: 1,
    upright:
      'Kılıç Ası, zihin sisini yaran bir netlik ve dürüst başlangıç işaretidir. Yakında açık bir konuşma veya tanışma, yeni ilişkinin kapısını keskin bir netlikle aralayabilir.',
    reversed:
      'Ters Kılıç Ası, belirsiz mesajlar ve yarım doğruların fırsatı bulandırabileceğini anlatır. Yeni ilişki potansiyeli var ama netlik sağlanmazsa başlangıç gecikebilir.',
    keywords: ['netlik', 'gerçek', 'doğrudanlık', 'başlangıç'],
    context: 'Açık söz ve net niyet yeni ilişkiyi çağırıyor; belirsiz dil geciktirir.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_na_pos1',
    card: 'Two of Swords',
    position: 1,
    upright:
      'İki Kılıç, kalbin yeniye açık olsa da kararların kilitlendiğini söyler. Yakında ilişki imkânı doğabilir; göz bağını çözmek için iç sesini ve gerçekleri birlikte tartmalısın.',
    reversed:
      'Ters İki Kılıç, kaçınılan yüzleşmenin sona erip bir seçime zorlanacağını gösterir. Karar verildiğinde yeni ilişki yolu netleşir.',
    keywords: ['ikilem', 'karar', 'yüzleşme', 'denge'],
    context: 'Kararsızlık çözülünce yeni kapı açılacak; kaçınmak geciktirir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_na_pos1',
    card: 'Three of Swords',
    position: 1,
    upright:
      'Üç Kılıç, taze yaraların yeni ilişkiye mesafe koyduğunu fısıldar. Yas ve kırgınlık onarıldıkça önünde daha temiz bir başlangıç belirir.',
    reversed:
      'Ters Üç Kılıç, şifanın başladığını ve kalbin yeniden sevmeye hazırlandığını söyler. Yakında, duygusal açıklıkla beslenen bir tanışma gündeme gelebilir.',
    keywords: ['kırgınlık', 'iyileşme', 'onarım', 'açıklık'],
    context: 'Acıyı onarmak yeni ilişkiye zemin hazırlar; şifa süreci hızlanıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_na_pos1',
    card: 'Four of Swords',
    position: 1,
    upright:
      'Dört Kılıç, kısa bir dinlenme ve zihni toparlama evresini anlatır. Soluklandığında evren, sakin ve sade bir başlangıçla seni buluşturabilir.',
    reversed:
      'Ters Dört Kılıç, gerektiği kadar dinlenmeden koşmanın kalbi yorduğunu söyler. Ritmi düşürdüğünde yeni ilişki ihtimali kendini gösterir.',
    keywords: ['dinlenme', 'toparlanma', 'sükunet', 'yenilenme'],
    context: 'Mola ve zihinsel temizlik, yeni ilişkinin sağlıklı doğuşunu destekler.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_na_pos1',
    card: 'Five of Swords',
    position: 1,
    upright:
      'Beş Kılıç, haklı çıkma savaşlarının kalbine set çektiğini hatırlatır. Bu kalıp bırakıldığında, barışçıl bir tanışma kapısı aralanır.',
    reversed:
      'Ters Beş Kılıç, gerilimden geri adım ve onarım niyeti getirir. Egonun yerine merakı koyduğunda yeni ilişki olasılığı güçlenir.',
    keywords: ['çatışma', 'ego', 'onarım', 'barış'],
    context: 'Sert üslubu bırakmak yeniye alan açar; yumuşaklık çekim yaratır.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_na_pos1',
    card: 'Six of Swords',
    position: 1,
    upright:
      'Altı Kılıç, geçmiş sularından daha sakin kıyılara geçişi simgeler. Bu yumuşak göç, yakında huzurlu bir başlangıca denk düşebilir.',
    reversed:
      'Ters Altı Kılıç, eski sahile dönme eğiliminin ilerlemeyi geciktirdiğini söyler. Geçiş tamamlandığında yeni ilişki görünür olur.',
    keywords: ['geçiş', 'sükunet', 'ilerleme', 'şifa'],
    context: 'Geçmişten güvenli ayrılış yeni ilişkiyi mümkün kılar.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_na_pos1',
    card: 'Seven of Swords',
    position: 1,
    upright:
      'Yedi Kılıç, görünmez ajandaların veya çekingen stratejinin yakın başlangıçları zorlayabileceğini uyarır. Açık niyet, doğru insanı çağırır.',
    reversed:
      'Ters Yedi Kılıç, dürüstçe konuşmanın ve samimi bir itirafın önünü açar. Şeffaflaştıkça yeni ilişki şansı yükselir.',
    keywords: ['şeffaflık', 'strateji', 'güven', 'samimiyet'],
    context: 'Yarım gerçekler yerine açık niyet yeni başlangıcı hızlandırır.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_na_pos1',
    card: 'Eight of Swords',
    position: 1,
    upright:
      'Sekiz Kılıç, zihinsel prangaların “imkânsız” masalı yazdığını söyler. Küçük bir kanıt ve bir adım, kapının aslında açık olduğunu gösterecek.',
    reversed:
      'Ters Sekiz Kılıç, çözülmeye başlayan korku düğümlerini ve artan özgürlük alanını müjdeler. Bu ferahlıkla yakında bir ilişki başlatabilirsin.',
    keywords: ['kısıt inancı', 'korku', 'özgürleşme', 'cesaret'],
    context: 'Zihinsel kilit açıldıkça yeni ilişki görünür olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_na_pos1',
    card: 'Nine of Swords',
    position: 1,
    upright:
      'Dokuz Kılıç, kaygının gece yarısı hikâyeleriyle umudu gölgelediğini anlatır. Gerçeklik testi ve öz-şefkatle bu sis dağılır; ardından bir tanışma gelebilir.',
    reversed:
      'Ters Dokuz Kılıç, kabus yerini sabah netliğine bırakır. Kaygı azaldıkça kalp yeni ilişkiye daha rahat açılır.',
    keywords: ['kaygı', 'gerçeklik', 'şefkat', 'netlik'],
    context: 'Kaygı hijyeni sağlanınca yeni başlangıç zemini güçlenir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_na_pos1',
    card: 'Ten of Swords',
    position: 1,
    upright:
      'On Kılıç, bir döngünün kesin bitişini ve artık eski yöntemle ilerlemeyeceğini söyler. Bu kabul, yakında taze ve dürüst bir ilişkiye kapı açar.',
    reversed:
      'Ters On Kılıç, küllerden doğuşu ve toparlanmayı anlatır. Şifa süreci tamamlanırken yeni bir başlangıç ufukta belirir.',
    keywords: ['bitiş', 'kabul', 'yeniden doğuş', 'şifa'],
    context: 'Net bir kapanış, yeni ilişkiye en sağlam temeli verir.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_na_pos1',
    card: 'Page of Swords',
    position: 1,
    upright:
      'Kılıç Prensi, merak ve iletişim kıvılcımıdır. Yakında sohbetlerle başlayan, öğrenme ve keşif tonlu bir ilişki doğabilir.',
    reversed:
      'Ters Kılıç Prensi, acele yargı ve dedikodu gölgesine karşı uyarır. Temiz iletişim kurulduğunda fırsat parlayacaktır.',
    keywords: ['merak', 'iletişim', 'öğrenme', 'başlangıç'],
    context: 'Açık ve nazik iletişim, yeni tanışmayı ilişkiye dönüştürür.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_na_pos1',
    card: 'Knight of Swords',
    position: 1,
    upright:
      'Kılıç Şövalyesi, hızlı gelişen mesajlar ve net bir yaklaşımı anlatır. Yakında kararlı bir adım, yeni ilişkiyi beklenenden çabuk başlatabilir.',
    reversed:
      'Ters Kılıç Şövalyesi, acele ve sert üslubun köprüleri yakabileceğini söyler. Ritmi yumuşatınca şans artar.',
    keywords: ['hız', 'kararlılık', 'mesaj', 'üslup'],
    context: 'Hız faydalı ama nazik ton şart; böylece başlangıç güçlenir.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_na_pos1',
    card: 'Queen of Swords',
    position: 1,
    upright:
      'Kılıç Kraliçesi, net sınırlar ve olgun iletişimle kurulacak bir ilişkiyi işaret eder. Dürüstlük ve seçicilik yakında doğru kişiyi çeker.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştirel tonun sıcaklığı azaltabileceğini uyarır. Şefkatli netlik ilişkiyi mümkün kılar.',
    keywords: ['netlik', 'sınır', 'olgunluk', 'iletişim'],
    context: 'Nazik ve berrak iletişim doğru eşleşmeyi çağırır.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_na_pos1',
    card: 'King of Swords',
    position: 1,
    upright:
      'Kılıç Kralı, ilkeler ve stratejik netlikle gelen ciddi bir başlangıcı gösterir. Yakında düşünsel uyumla beslenen bir ilişki doğabilir.',
    reversed:
      'Ters Kılıç Kralı, katı yargı ve mesafe riskine işaret eder. Empatiyle dengelendiğinde yeni ilişki şansı güçlenir.',
    keywords: ['ilke', 'strateji', 'netlik', 'empati'],
    context: 'Akıl–kalp dengesi kurulduğunda sağlam bir başlangıç mümkün.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_na_pos1',
    card: 'Ace of Wands',
    position: 1,
    upright:
      'Değnek Ası, yeni bir ilişkinin kıvılcımını müjdeliyor. Tutku, heyecan ve cesaretle dolu bir başlangıç kapıda olabilir.',
    reversed:
      'Ters Değnek Ası, ilham eksikliği ya da korkuların fırsatı geciktirebileceğini gösterir. Küçük bir cesaret bile yeni ilişkiyi başlatabilir.',
    keywords: ['tutku', 'başlangıç', 'kıvılcım', 'cesaret'],
    context: 'Yeni bir aşkın enerjisi kıvılcımlanıyor; hazır ol.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_na_pos1',
    card: 'Two of Wands',
    position: 1,
    upright:
      'İki Değnek, geleceğe dönük planlarının arasında yeni bir ilişki fırsatı doğabileceğini gösterir. Ufka açık olduğunda kalbin yeniye alan açar.',
    reversed:
      'Ters İki Değnek, kararsızlık ve vizyonsuzluk sebebiyle aşkın gecikebileceğini anlatır. Netleştiğinde yeni başlangıç hızla gelir.',
    keywords: ['vizyon', 'plan', 'karar', 'fırsat'],
    context: 'Ufka bakışın, yeni ilişkiyi hayatına davet ediyor.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_na_pos1',
    card: 'Three of Wands',
    position: 1,
    upright:
      'Üç Değnek, genişleyen çevre ve yeni fırsatların aşkı getireceğini söyler. Yeni insanlar ve yolculuklar sana aşk kapısını açabilir.',
    reversed:
      'Ters Üç Değnek, dar görüşlülük ya da sabırsızlık yeni ilişkiyi zorlayabilir. Ufku geniş tutmak aşkı çağırır.',
    keywords: ['genişleme', 'fırsat', 'ufuk', 'yolculuk'],
    context: 'Yeni çevreler ve deneyimler aşkın gelişini hızlandırır.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_na_pos1',
    card: 'Four of Wands',
    position: 1,
    upright:
      'Dört Değnek, kutlama, davet veya sosyal ortamda yeni biriyle tanışabileceğini gösterir. Bu ilişki güvenli bir temele dayanabilir.',
    reversed:
      'Ters Dört Değnek, plansızlık ya da sosyal geri çekilme aşk fırsatını erteleyebilir. Katıldığın kutlamalar yeni aşkı getirebilir.',
    keywords: ['kutlama', 'temel', 'güvenlik', 'sosyal ortam'],
    context: 'Sosyal alanlarda yeni ilişki olasılığı doğuyor.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_na_pos1',
    card: 'Five of Wands',
    position: 1,
    upright:
      'Beş Değnek, küçük rekabet ve canlı tartışmalar arasında yeni biriyle bağ kurabileceğini gösterir. Dinamik enerji ilişkiye dönüşebilir.',
    reversed:
      'Ters Beş Değnek, aşırı çatışma veya rekabet ortamının ilişkiyi zorlaştırabileceğini anlatır. Eğlenceli rekabet yakınlığı besler.',
    keywords: ['rekabet', 'canlılık', 'dinamik', 'çekim'],
    context: 'Dinamik ve canlı ortamlarda aşk kıvılcımı belirebilir.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_na_pos1',
    card: 'Six of Wands',
    position: 1,
    upright:
      'Altı Değnek, görünür başarı ve takdirle birlikte aşkın sana çekildiğini gösterir. Parladığın alanlarda yeni biriyle bağ kurabilirsin.',
    reversed:
      'Ters Altı Değnek, görünmez kalmak ya da takdir eksikliği yeni aşkı erteleyebilir. Kendini ifade ettiğinde aşk yakınlaşır.',
    keywords: ['zafer', 'tanınma', 'çekim', 'takdir'],
    context: 'Başarı ve görünürlük aşkın kapısını açıyor.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_na_pos1',
    card: 'Seven of Wands',
    position: 1,
    upright:
      'Yedi Değnek, kendi duruşunu savunurken dikkatini çekecek birinin ortaya çıkabileceğini söyler. Güçlü duruş çekim yaratır.',
    reversed:
      'Ters Yedi Değnek, aşırı savunmacı yaklaşımın aşk fırsatını zorlaştırabileceğini gösterir. Rahatlık ilişkiye yer açar.',
    keywords: ['savunma', 'duruş', 'çekim', 'kararlılık'],
    context: 'Kendi duruşun, doğru kişiyi sana çekiyor.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_na_pos1',
    card: 'Eight of Wands',
    position: 1,
    upright:
      'Sekiz Değnek, hızlı gelişen bir aşkın ufukta olduğunu gösterir. Aniden gelen haber ya da buluşma yeni ilişkiye yol açabilir.',
    reversed:
      'Ters Sekiz Değnek, gecikmeler ya da iletişim karmaşası aşkı erteleyebilir. Akışa bırakmak yeni bağları hızlandırır.',
    keywords: ['hız', 'haber', 'iletişim', 'akış'],
    context: 'Yakında hızlı bir aşk gelişmesi olabilir.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_na_pos1',
    card: 'Nine of Wands',
    position: 1,
    upright:
      'Dokuz Değnek, yorgun olsan da aşkın kapıda olduğunu gösterir. Direnç ve sabır seni yeni bir ilişkiye ulaştıracak.',
    reversed:
      'Ters Dokuz Değnek, aşırı tetikte olmanın aşkı uzaklaştırabileceğini anlatır. Savunmayı bırakmak yeni ilişkiyi getirir.',
    keywords: ['direnç', 'sabır', 'savunma', 'umut'],
    context: 'Zorlukların ardından aşk kapıya geliyor.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_na_pos1',
    card: 'Ten of Wands',
    position: 1,
    upright:
      'On Değnek, yüklerinin arasında yeni bir aşk fırsatını göremediğini işaret eder. Paylaştığında kalbin hafifler ve ilişkiye yer açılır.',
    reversed:
      'Ters On Değnek, yükleri bırakmaya başladığını gösterir. Bu ferahlık yeni bir aşkın doğmasına yol açar.',
    keywords: ['yük', 'sorumluluk', 'ferahlık', 'açılma'],
    context: 'Yükleri bıraktığında yeni ilişki seni bulur.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_na_pos1',
    card: 'Page of Wands',
    position: 1,
    upright:
      'Değnek Prensi, merak ve heyecanla başlayan bir tanışmayı gösterir. Maceracı ruhun yeni ilişkiye kapı aralayacak.',
    reversed:
      'Ters Değnek Prensi, dağınık enerji ya da sabırsızlığın aşkı erteleyebileceğini işaret eder. Net niyet aşkı hızlandırır.',
    keywords: ['merak', 'heyecan', 'keşif', 'başlangıç'],
    context: 'Maceracı ruhun yeni ilişkiyi çekecek.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_na_pos1',
    card: 'Knight of Wands',
    position: 1,
    upright:
      'Değnek Şövalyesi, ateşli ve cesur bir kişinin hayatına hızlıca gireceğini söyler. Bu kişiyle tutkulu bir ilişki başlayabilir.',
    reversed:
      'Ters Değnek Şövalyesi, tutarsızlık ya da acelecilik yeni ilişkiyi zorlaştırabilir. Sabırla hareket etmek daha kalıcı bağ getirir.',
    keywords: ['tutku', 'cesaret', 'hız', 'çekim'],
    context: 'Ateşli bir giriş yeni aşkı başlatabilir.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_na_pos1',
    card: 'Queen of Wands',
    position: 1,
    upright:
      'Değnek Kraliçesi, karizman ve çekim gücünle yeni bir ilişkiye hazır olduğunu gösterir. Enerjinle çevrende hayranlık uyandırabilirsin.',
    reversed:
      'Ters Değnek Kraliçesi, kıskançlık ya da güvensizlik yeni aşkı zorlayabilir. Kendine güvenmek doğru kişiyi çeker.',
    keywords: ['karizma', 'çekim', 'özgüven', 'enerji'],
    context: 'Parlayan enerjin yeni aşkı çekiyor.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_na_pos1',
    card: 'King of Wands',
    position: 1,
    upright:
      'Değnek Kralı, vizyoner ve güçlü bir kişinin hayatına gireceğini gösterir. Bu kişiyle güçlü ve ilham verici bir ilişki başlayabilir.',
    reversed:
      'Ters Değnek Kralı, otoriterlik ya da aşırı kontrolcülük yeni aşkı gölgeleyebilir. Esneklik ilişkiye yol açar.',
    keywords: ['vizyon', 'liderlik', 'çekim', 'güç'],
    context: 'Güçlü ve vizyoner bir kişiyle yeni aşk kapıda.',
    group: 'Asalar',
  },

    //--- Tılsımlar Serisi ---
    {
      id: 'ace_of_pentacles_na_pos1',
      card: 'Ace of Pentacles',
      position: 1,
      upright:
        'Tılsım Ası, somut ve güvenilir bir başlangıcın kapıda olduğunu gösterir. Bu yeni ilişki toprak gibi sağlam ve uzun vadeli olabilir.',
      reversed:
        'Ters Tılsım Ası, fırsatı görememe ya da güvenlik kaygısı sebebiyle gecikmeleri işaret eder. Dikkatle bakıldığında değerli bir başlangıç hâlâ mümkündür.',
      keywords: ['fırsat', 'başlangıç', 'güven', 'istikrar'],
      context: 'Yakında sağlam temelli bir ilişki fırsatı doğuyor; dikkatli olun.',
      group: 'Tılsımlar',
    },
    {
      id: 'two_of_pentacles_na_pos1',
      card: 'Two of Pentacles',
      position: 1,
      upright:
        'İki Tılsım, hayatındaki yoğunluk içinde denge kurma ihtiyacını vurgular. Yeni ilişki fırsatı gelecek ama önceliklerini düzenlemen gerekiyor.',
      reversed:
        'Ters İki Tılsım, kaotik bir dönemde olduğun için yeni başlangıcın zorlanabileceğini söyler. Küçük ayarlamalarla ilişki için alan açabilirsin.',
      keywords: ['denge', 'esneklik', 'öncelik', 'akış'],
      context: 'Dengeni bulduğunda yeni ilişki şansı netleşir.',
      group: 'Tılsımlar',
    },
    {
      id: 'three_of_pentacles_na_pos1',
      card: 'Three of Pentacles',
      position: 1,
      upright:
        'Üç Tılsım, işbirliği ve ortak çabanın bir ilişkiye vesile olacağını anlatır. Ortak proje, çevre ya da iş alanında tanışma ihtimali yüksek.',
      reversed:
        'Ters Üç Tılsım, rol karışıklığı ya da yanlış anlaşılmaların yakın fırsatı gölgeleyebileceğini işaret eder. Açık iletişimle şans hâlâ senin yanında.',
      keywords: ['işbirliği', 'ortaklık', 'tanışma', 'çaba'],
      context: 'Ortak ortam veya proje yeni ilişkiyi başlatabilir.',
      group: 'Tılsımlar',
    },
    {
      id: 'four_of_pentacles_na_pos1',
      card: 'Four of Pentacles',
      position: 1,
      upright:
        'Dört Tılsım, güvenli alanı koruma isteğinin kalbini kapattığını gösterir. Açıldığında yeni bir ilişki hızla kapına gelebilir.',
      reversed:
        'Ters Dört Tılsım, bırakma ve esneme sürecinin başladığını müjdeler. Bu rahatlama, yeni ilişkinin doğuşunu kolaylaştırır.',
      keywords: ['güvenlik', 'kontrol', 'açılma', 'esneklik'],
      context: 'Kapanan kalp açıldığında ilişki fırsatı kendini gösterir.',
      group: 'Tılsımlar',
    },
    {
      id: 'five_of_pentacles_na_pos1',
      card: 'Five of Pentacles',
      position: 1,
      upright:
        'Beş Tılsım, yalnızlık ve dışarıda kalma duygusunu yansıtır. Ancak bu kırılganlık içinde sana ışık olacak bir eşleşme yakında gelebilir.',
      reversed:
        'Ters Beş Tılsım, toparlanma ve destek bulma sürecini gösterir. Bu yükselişle yeni bir ilişki kapıya dayanabilir.',
      keywords: ['yalnızlık', 'destek', 'umut', 'kırılganlık'],
      context: 'Karanlık dönemin ardından yeni ilişki ihtimali doğuyor.',
      group: 'Tılsımlar',
    },
    {
      id: 'six_of_pentacles_na_pos1',
      card: 'Six of Pentacles',
      position: 1,
      upright:
        'Altı Tılsım, karşılıklı destek ve adil alışverişin bir ilişkiyi başlatabileceğini söyler. Dengeli bir bağ seni bekliyor olabilir.',
      reversed:
        'Ters Altı Tılsım, dengesiz verme–alma alışkanlıklarının yeni ilişkiyi gölgeleyebileceğini işaret eder. Eşitlik sağlandığında yol açılır.',
      keywords: ['denge', 'paylaşım', 'eşitlik', 'destek'],
      context: 'Adil bir alışveriş yeni bir aşkın kapısını aralayabilir.',
      group: 'Tılsımlar',
    },
    {
      id: 'seven_of_pentacles_na_pos1',
      card: 'Seven of Pentacles',
      position: 1,
      upright:
        'Yedi Tılsım, sabırlı bekleyişin ve emeklerin karşılığını vereceğini anlatır. Yakında meyve verecek bir ilişki potansiyeli var.',
      reversed:
        'Ters Yedi Tılsım, sabırsızlık ya da yanlış yatırımın fırsatı erteleyebileceğini söyler. Sükunet ve ölçü yeni aşkı hızlandırır.',
      keywords: ['sabır', 'bekleyiş', 'yatırım', 'ödül'],
      context: 'Sabırla kurduğun temel yeni ilişkiyi getiriyor.',
      group: 'Tılsımlar',
    },
    {
      id: 'eight_of_pentacles_na_pos1',
      card: 'Eight of Pentacles',
      position: 1,
      upright:
        'Sekiz Tılsım, düzenli emek ve öğrenme sürecinin seni ilişkiye hazır hale getirdiğini gösterir. Yakında bu disiplin karşılığını verecek.',
      reversed:
        'Ters Sekiz Tılsım, özensizlik veya aşırı rutinin kalbine ağırlık verdiğini anlatır. Yenilenme sağlandığında ilişki fırsatı doğar.',
      keywords: ['emek', 'disiplin', 'hazırlık', 'ilerleme'],
      context: 'Çabanın ve hazırlığın karşılığı yeni bir aşk olabilir.',
      group: 'Tılsımlar',
    },
    {
      id: 'nine_of_pentacles_na_pos1',
      card: 'Nine of Pentacles',
      position: 1,
      upright:
        'Dokuz Tılsım, bağımsızlığın ve öz değerinin güçlü bir çekim yarattığını söyler. Yakında kendi gücünü gören biriyle yeni bir ilişki doğabilir.',
      reversed:
        'Ters Dokuz Tılsım, aşırı bağımlılık eğiliminin yeni ilişkiyi zorlayabileceğini işaret eder. Kendi bağımsızlığını onurlandırdığında doğru eşleşme gelir.',
      keywords: ['bağımsızlık', 'öz değer', 'çekim', 'özgüven'],
      context: 'Öz değerini koruman yeni aşkı çekecek.',
      group: 'Tılsımlar',
    },
    {
      id: 'ten_of_pentacles_na_pos1',
      card: 'Ten of Pentacles',
      position: 1,
      upright:
        'On Tılsım, uzun vadeli ve kalıcı bir ilişkinin ufukta olduğunu gösterir. Bu yeni bağ, aile ve istikrar enerjisi taşıyabilir.',
      reversed:
        'Ters On Tılsım, geçmişten gelen aile veya güvenlik temalarının başlangıcı zorlayabileceğini anlatır. Bu konular çözüldüğünde yeni ilişki güçlenir.',
      keywords: ['istikrar', 'aile', 'uzun vade', 'güven'],
      context: 'Yakında kalıcı temelli bir ilişki ihtimali var.',
      group: 'Tılsımlar',
    },
    {
      id: 'page_of_pentacles_na_pos1',
      card: 'Page of Pentacles',
      position: 1,
      upright:
        'Tılsım Prensi, merak ve yeni öğrenme hevesiyle gelen bir tanışmayı işaret eder. Somut küçük adımlar yeni bir aşk başlatabilir.',
      reversed:
        'Ters Tılsım Prensi, erteleme ve dağınık odağın fırsatı kaçırabileceğini söyler. Net hedef koymak yeni ilişkiye yol açar.',
      keywords: ['başlangıç', 'öğrenme', 'somut adım', 'heves'],
      context: 'Küçük ama kararlı adım yeni ilişkiyi getirir.',
      group: 'Tılsımlar',
    },
    {
      id: 'knight_of_pentacles_na_pos1',
      card: 'Knight of Pentacles',
      position: 1,
      upright:
        'Tılsım Şövalyesi, sabırlı ve istikrarlı bir adayın yakında hayatına gireceğini müjdeler. Bu kişi uzun vadede güvenilir bir partner olabilir.',
      reversed:
        'Ters Tılsım Şövalyesi, durağanlık ve aşırı temkinin yeni ilişkiyi yavaşlatabileceğini söyler. Ufak cesaretler süreci hızlandırır.',
      keywords: ['istikrar', 'sabır', 'güvenilirlik', 'devamlılık'],
      context: 'Yavaş ama emin adımlarla ilişki ihtimali doğuyor.',
      group: 'Tılsımlar',
    },
    {
      id: 'queen_of_pentacles_na_pos1',
      card: 'Queen of Pentacles',
      position: 1,
      upright:
        'Tılsım Kraliçesi, şefkatli ve pratik enerjisiyle besleyici bir ilişkiye işaret eder. Yakında öz-bakım ve destek alanında güçlü bir eşleşme olabilir.',
      reversed:
        'Ters Tılsım Kraliçesi, aşırı yüklenmenin yeni ilişkiye yer bırakmadığını söyler. Alan açıldığında fırsat hızla doğar.',
      keywords: ['şefkat', 'pratiklik', 'besleyicilik', 'denge'],
      context: 'Besleyici enerjin yeni ilişkiyi çekecek.',
      group: 'Tılsımlar',
    },
    {
      id: 'king_of_pentacles_na_pos1',
      card: 'King of Pentacles',
      position: 1,
      upright:
        'Tılsım Kralı, olgun ve güven veren bir partnerin yakında çıkacağını gösterir. Bu ilişki maddi ve manevi istikrar taşıyabilir.',
      reversed:
        'Ters Tılsım Kralı, aşırı kontrol ya da statü odaklılığın yeni başlangıcı gölgeleyebileceğini uyarır. Esneklikle aşk kendini gösterir.',
      keywords: ['olgunluk', 'istikrar', 'güven', 'sağlamlık'],
      context: 'Olgun ve güvenilir bir partner yeni bir aşk getirebilir.',
      group: 'Tılsımlar',
    },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
  export function getNewLoverPosition1Meaning(
  card: TarotCard
): NewLoverPosition1Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position1Meanings.find(m => 
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
    'Deli': 'The Fool',
    'Büyücü': 'The Magician',
    'Yüksek Rahibe': 'The High Priestess',
    'İmparatoriçe': 'The Empress',
    'İmparator': 'The Emperor',
    'Hierophant': 'The Hierophant',
    'Aziz': 'The Hierophant',
    'Aşıklar': 'The Lovers',
    'Savaş Arabası': 'The Chariot',
    'Güç': 'Strength',
    'Ermiş': 'The Hermit',
    'Münzevi': 'The Hermit',
    'Kader Çarkı': 'The Wheel of Fortune',
    'Adalet': 'Justice',
    'Asılı Adam': 'The Hanged Man',
    'Ölüm': 'Death',
    'Ölçü': 'Temperance',
    'Ölçülülük': 'Temperance',
    'Şeytan': 'The Devil',
    'Kule': 'The Tower',
    'Yıldız': 'The Star',
    'Ay': 'The Moon',
    'Güneş': 'The Sun',
    'Yargı': 'Judgement',
    'Mahkeme': 'Judgement',
    'Dünya': 'The World',
  };
  
  // Türkçe ismi İngilizce'ye çevir
  const englishName = cardNameMapping[card.nameTr] || card.nameTr;
  
  // İngilizce isimle tekrar ara
  meaning = position1Meanings.find(m => m.card === englishName);
  
  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getNewLoverPosition1MeaningByCardName(
  cardName: string
): NewLoverPosition1Meaning | null {
  return position1Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllNewLoverPosition1Meanings(): NewLoverPosition1Meaning[] {
  return position1Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getNewLoverPosition1MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): NewLoverPosition1Meaning[] {
  return position1Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
  export const useI18nPosition1Meanings = (): I18nNewLoverPosition1Meaning[] => {
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
): I18nNewLoverPosition1Meaning | null => {
  const originalMeaning = position1Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `new-lover.meanings.${cardKey}.position1.upright`
  );
  const i18nReversed = t(
    `new-lover.meanings.${cardKey}.position1.reversed`
  );
  const i18nKeywords = t(
    `new-lover.meanings.${cardKey}.position1.keywords`
  );
  const i18nContext = t(
    `new-lover.meanings.${cardKey}.position1.context`
  );
  const i18nGroup = t(
    `new-lover.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
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
const newLoverPosition1Exports = {
  position1Meanings,
  getNewLoverPosition1Meaning,
  getNewLoverPosition1MeaningByCardName,
  getAllNewLoverPosition1Meanings,
  getNewLoverPosition1MeaningsByGroup,
  getI18nPosition1Meaning,
};

export default newLoverPosition1Exports;
