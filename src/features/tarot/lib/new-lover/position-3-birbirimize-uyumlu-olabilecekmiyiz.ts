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

export interface NewLoverposition3Meaning {
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
export interface I18nNewLoverposition3Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position3Meanings: NewLoverposition3Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ma_pos3',
    card: 'The Fool',
    position: 3,
    upright:
      'Deli, ilişkinizde taze bir uyumun doğabileceğini gösterir. Birbirinizi hafif, spontane ve özgür bırakabildiğinizde, doğal bir akışla uyum kolayca kurulur.',
    reversed:
      'Ters Deli, aceleyle alınan kararların ve düşüncesizce atılan adımların uyumu zorlayacağını gösterir. Beklentilerin belirsizliği, dengesizlik yaratabilir.',
    keywords: ['özgürlük', 'başlangıç', 'uyum', 'hafiflik', 'denge'],
    context:
      'Uyum için özgürlüğü paylaşmak gerekir. Fazla acele, dengeyi bozabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos3',
    card: 'The Magician',
    position: 3,
    upright:
      'Büyücü, iletişim ve karşılıklı ifade gücünüzün uyumu destekleyeceğini söyler. Birbirinizin potansiyelini açığa çıkarmak için kelimeleriniz sihirli olur.',
    reversed:
      'Ters Büyücü, yanlış anlaşılmalar veya manipülatif tavırlar uyumu zorlaştırabilir. Güvenin sarsılması, iletişim köprüsünü zayıflatır.',
    keywords: ['ifade', 'iletişim', 'potansiyel', 'uyum', 'güven'],
    context: 'Uyumun anahtarı açık iletişimdir. İllüzyonlar köprüyü yıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos3',
    card: 'The High Priestess',
    position: 3,
    upright:
      'Başrahibe, sezgisel bağ ve derin bir anlayışla uyumun sessizce kurulabileceğini söyler. Birbirinizi anlamak için çok konuşmaya gerek kalmaz.',
    reversed:
      'Ters Başrahibe, aşırı gizlilik veya içe kapanıklık, uyumu gölgeler. Açılmayan sırlar mesafe yaratabilir.',
    keywords: ['sezgi', 'bağ', 'anlayış', 'sessizlik', 'uyum'],
    context: 'Sessiz bağ uyumu güçlendirir. Gizlilik ise mesafe yaratır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos3',
    card: 'The Empress',
    position: 3,
    upright:
      'İmparatoriçe, şefkat ve paylaşımın uyumu besleyeceğini gösterir. Birbirinizi besleyen ve büyüten bir bağ doğal olarak ahenkli olur.',
    reversed:
      'Ters İmparatoriçe, aşırı bağımlılık veya bencillik uyumu bozabilir. Kendi ihtiyaçlarınıza fazla gömülmek, dengeyi zedeler.',
    keywords: ['şefkat', 'paylaşım', 'büyüme', 'uyum', 'besleme'],
    context: 'Paylaşım uyumu büyütür. Bencillik ise köprüleri daraltır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos3',
    card: 'The Emperor',
    position: 3,
    upright:
      'İmparator, düzen ve net sınırlarla uyumun güçleneceğini söyler. Karşılıklı sorumluluk paylaşımı sağlam bir temel oluşturur.',
    reversed:
      'Ters İmparator, aşırı otorite veya katı kurallar uyumu zorlar. Esnekliğin yokluğu ilişkinin nefesini kesebilir.',
    keywords: ['düzen', 'sorumluluk', 'sınır', 'güç', 'denge'],
    context: 'Net sınırlar uyum sağlar. Katılık, bağı daraltır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos3',
    card: 'The Hierophant',
    position: 3,
    upright:
      'Aziz, benzer değerler ve ortak inançların uyumu destekleyeceğini söyler. Gelenekler veya ritüeller ortak köprü kurar.',
    reversed:
      'Ters Aziz, değer çatışmaları veya inatlaşmalar uyumu bozabilir. Kör bağlılık yerine esneklik gerekir.',
    keywords: ['değerler', 'inanç', 'ritüel', 'uyum', 'gelenek'],
    context: 'Ortak değerler uyumu besler. Farklılıklar köprü ister.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos3',
    card: 'The Lovers',
    position: 3,
    upright:
      'Aşıklar, aranızdaki doğal çekimin ve seçimlerin uyumu getireceğini gösterir. Birlikte “evet” dediğinizde kalpler aynı ritimde atar.',
    reversed:
      'Ters Aşıklar, kararsızlık veya ikilem uyumu zayıflatır. Net olmayan seçimler, bağın dengesini bozar.',
    keywords: ['sevgi', 'çekim', 'seçim', 'uyum', 'birlik'],
    context: 'Seçimle uyum gelir. Kararsızlık uyumu gölgeler.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos3',
    card: 'The Chariot',
    position: 3,
    upright:
      'Savaş Arabası, aynı yöne ilerleme kararlılığının uyumu güçlendireceğini söyler. Ortak hedefler bağınızı hizalar.',
    reversed:
      'Ters Savaş Arabası, farklı yönlere çekilmek uyumu zayıflatır. Kontrol savaşları ilişkiyi yorar.',
    keywords: ['yön', 'hedef', 'uyum', 'denge', 'kararlılık'],
    context: 'Aynı hedef uyumu getirir. Çekişme bağları koparır.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos3',
    card: 'Strength',
    position: 3,
    upright:
      'Güç, sabır ve şefkatin uyumu derinleştireceğini gösterir. Nazik bir yaklaşım bağın güvenini büyütür.',
    reversed:
      'Ters Güç, gurur ve sabırsızlık uyumu engeller. Zorlamak yerine yumuşaklık gerekir.',
    keywords: ['şefkat', 'sabır', 'cesaret', 'uyum', 'güven'],
    context: 'Şefkat uyumu büyütür. Gurur uyumu kırar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos3',
    card: 'The Hermit',
    position: 3,
    upright:
      'Ermiş, içsel bilgelik ve sağlıklı alan tanımanın uyumu destekleyeceğini gösterir. Birbirinize alan vermek bağınızı güçlendirir.',
    reversed:
      'Ters Ermiş, aşırı içe kapanma veya uzaklık uyumu gölgeler. Yalnızlığa fazlaca çekilmek mesafe yaratır.',
    keywords: ['bilgelik', 'alan', 'anlayış', 'uyum', 'içe dönüş'],
    context: 'Alan tanımak uyumu besler. Fazla uzaklık bağları zedeler.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos3',
    card: 'The Wheel of Fortune',
    position: 3,
    upright:
      'Kader Çarkı, ilişkinizdeki döngülerin doğal uyumu destekleyeceğini söyler. Doğru zamanlama, uyumu kolaylaştırır.',
    reversed:
      'Ters Çark, tekrar eden hatalar uyumu zorlaştırabilir. Farkındalık olmadan döngü aynı kalır.',
    keywords: ['zamanlama', 'döngü', 'uyum', 'kader', 'değişim'],
    context: 'Zamanlama uyumu getirir. Tekrarlar bağları yorar.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos3',
    card: 'Justice',
    position: 3,
    upright:
      'Adalet, dürüstlük ve adil yaklaşımın uyumu büyüteceğini gösterir. Şeffaf iletişim güven inşa eder.',
    reversed:
      'Ters Adalet, çifte standartlar veya gizlemeler uyumu bozar. Adil olmayan tavırlar bağları zayıflatır.',
    keywords: ['adalet', 'denge', 'uyum', 'şeffaflık', 'dürüstlük'],
    context: 'Dürüstlük uyumun temeli. Gizlilik köprüleri yıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos3',
    card: 'The Hanged Man',
    position: 3,
    upright:
      'Asılan Adam, farklı bakış açılarıyla uyumun kurulabileceğini gösterir. Empatiyle bakmak bağınızı güçlendirir.',
    reversed:
      'Ters Asılan Adam, inatçılık veya tek taraflı fedakarlık uyumu zorlaştırır. Dengeyi gözetmek gerekir.',
    keywords: ['perspektif', 'empati', 'feda', 'uyum', 'denge'],
    context: 'Empati uyumu getirir. Tek taraflılık bağları zedeler.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos3',
    card: 'Death',
    position: 3,
    upright:
      'Ölüm, dönüşümün ve eskiyi bırakmanın uyumu güçlendireceğini söyler. Yenilenmeye açık olmak ilişkinizi derinleştirir.',
    reversed:
      'Ters Ölüm, değişime direnmek uyumu engeller. Geçmişe tutunmak dengesizlik yaratır.',
    keywords: ['dönüşüm', 'yenilenme', 'bırakma', 'uyum', 'değişim'],
    context: 'Değişime açıklık uyumu getirir. Direnç bağları bozar.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos3',
    card: 'Temperance',
    position: 3,
    upright:
      'Denge, sabır ve uyumun kalıcı bağ kuracağınızı söyler. Orta yolu bulmak ilişkinizi sakinleştirir.',
    reversed:
      'Ters Denge, aşırılıklar ve ölçüsüzlük uyumu zorlaştırır. Tutarlılık bağ için şarttır.',
    keywords: ['denge', 'sabır', 'uyum', 'orta yol', 'sakinlik'],
    context: 'Orta yol uyumu getirir. Aşırılık bağları yıpratır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos3',
    card: 'The Devil',
    position: 3,
    upright:
      'Şeytan, güçlü tutku ve bağlılığın uyum getirebileceğini söyler. Ancak sınırların net olması gerekir.',
    reversed:
      'Ters Şeytan, bağımlılık ve kıskançlık uyumu bozar. Özgürlük olmadan bağ sağlıklı olamaz.',
    keywords: ['tutku', 'bağlılık', 'sınır', 'uyum', 'özgürlük'],
    context: 'Tutku uyumu besler. Bağımlılık uyumu gölgeler.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos3',
    card: 'The Tower',
    position: 3,
    upright:
      'Kule, beklenmedik değişimlerin uyumu sınayacağını söyler. Krizler doğru yönetilirse bağınızı güçlendirebilir.',
    reversed:
      'Ters Kule, yıkımı reddetmek ve gerçeği saklamak uyumu zayıflatır. Krizleri kabul etmek şarttır.',
    keywords: ['kriz', 'değişim', 'hakikat', 'uyum', 'yenilenme'],
    context: 'Krizler uyumu test eder. Hakikat köprüyü onarır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos3',
    card: 'The Star',
    position: 3,
    upright:
      'Yıldız, umut ve ilhamla uyumun kolaylıkla sağlanacağını söyler. Açık kalp bağınızı güçlendirir.',
    reversed:
      'Ters Yıldız, umutsuzluk veya hayal kırıklığı uyumu zorlaştırır. İyileşme için güven gerekir.',
    keywords: ['umut', 'ilham', 'şifa', 'uyum', 'açıklık'],
    context: 'Umudunuz uyumu güçlendirir. Umutsuzluk bağları gölgeler.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos3',
    card: 'The Moon',
    position: 3,
    upright:
      'Ay, sezgi ve empatiyle uyumun derinleşebileceğini söyler. Kalbinizi dinlemek bağınızı besler.',
    reversed:
      'Ters Ay, yanlış anlamalar veya kuruntular uyumu gölgeler. Netlik için açık iletişim gerekir.',
    keywords: ['sezgi', 'empati', 'uyum', 'hassasiyet', 'duygu'],
    context: 'Sezgi uyumu derinleştirir. Kuruntular bağları yorar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos3',
    card: 'The Sun',
    position: 3,
    upright:
      'Güneş, neşe ve açıklığın uyumu kolaylaştıracağını söyler. Ortak sevinçler bağınızı güçlendirir.',
    reversed:
      'Ters Güneş, yüzeysellik veya aşırı iyimserlik uyumu zorlaştırır. Gerçekçi bakış açısı gerekir.',
    keywords: ['neşe', 'açıklık', 'paylaşım', 'uyum', 'sevgi'],
    context: 'Neşe uyumu büyütür. Yüzeysellik bağları daraltır.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos3',
    card: 'Judgement',
    position: 3,
    upright:
      'Mahkeme, geçmiş deneyimlerden öğrenerek uyum kurabileceğinizi gösterir. Birbirinizi affetmek bağınızı güçlendirir.',
    reversed:
      'Ters Mahkeme, geçmişe takılı kalmak uyumu bozar. Eski hatalar tekrar edebilir.',
    keywords: ['yüzleşme', 'affetmek', 'öğrenme', 'uyum', 'yenilenme'],
    context: 'Geçmişten öğrenmek uyumu getirir. Takılı kalmak bağları bozar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos3',
    card: 'The World',
    position: 3,
    upright:
      'Dünya, bütünlük ve tamamlanmışlıkla uyumun sağlanacağını söyler. Birbirinizi tamamlayan bir denge doğar.',
    reversed:
      'Ters Dünya, yarım kalmışlık hissi uyumu zayıflatır. Tamamlanmamış işler bağda engel olabilir.',
    keywords: ['tamamlanma', 'bütünlük', 'denge', 'uyum', 'tamlık'],
    context: 'Tamlık uyumu güçlendirir. Yarım kalmışlık bağları yıpratır.',
    group: 'Majör Arkana',
  },

  //-- Kupalar --//
  {
    id: 'ace_of_cups_cu_pos3',
    card: 'Ace of Cups',
    position: 3,
    upright:
      'Kupa Ası, duygusal başlangıçların uyum için büyük bir potansiyel taşıdığını söyler. Açık kalpler ve ilk duygular ilişkide saf bir uyum yaratır.',
    reversed:
      'Ters Kupa Ası, duyguların ifade edilememesi veya kalbin kapanması uyumu gölgeler. Bastırılan hisler dengeyi bozar.',
    keywords: ['başlangıç', 'duygu', 'uyum', 'açıklık', 'potansiyel'],
    context: 'Yeni duygular uyumu doğurur. Kapalı kalp bağları zorlar.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cu_pos3',
    card: 'Two of Cups',
    position: 3,
    upright:
      'Kupa İkilisi, karşılıklı sevgi ve eşitlik uyumun temelini oluşturur. Ruhlarınızın aynalanması güçlü bir denge getirir.',
    reversed:
      'Ters Kupa İkilisi, yanlış anlamalar veya dengesiz bağ uyumu zayıflatır. Karşılıklılık eksikliği mesafe doğurur.',
    keywords: ['sevgi', 'eşitlik', 'karşılıklılık', 'uyum', 'denge'],
    context: 'Eşitlik uyumu besler. Dengesizlik bağları zedeler.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cu_pos3',
    card: 'Three of Cups',
    position: 3,
    upright:
      'Kupa Üçlüsü, neşe ve paylaşımın uyumu güçlendireceğini gösterir. Birlikte kutlamalar ilişkinizi derinleştirir.',
    reversed:
      'Ters Kupa Üçlüsü, aşırı sosyal etkenler veya üçüncü kişilerin varlığı uyumu bozabilir. Bağınızı özel tutmak gerekebilir.',
    keywords: ['neşe', 'paylaşım', 'topluluk', 'uyum', 'kutlama'],
    context: 'Paylaşım uyumu büyütür. Fazlalıklar bağı zorlar.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cu_pos3',
    card: 'Four of Cups',
    position: 3,
    upright:
      'Kupa Dörtlüsü, uyumu engelleyen bir tatminsizlik veya duygusal geri çekilme olabileceğini söyler. Yeniliği fark etmek dengeyi yeniden kurar.',
    reversed:
      'Ters Kupa Dörtlüsü, farkındalığın uyanmasıyla uyum yeniden doğar. Şükranla yaklaşmak bağları besler.',
    keywords: ['tatminsizlik', 'farkındalık', 'uyum', 'dönüşüm', 'şükran'],
    context: 'Farkındalık uyumu getirir. Kapanma bağları zayıflatır.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cu_pos3',
    card: 'Five of Cups',
    position: 3,
    upright:
      'Kupa Beşlisi, kayıpların veya geçmiş üzüntülerin uyumu zorlayabileceğini söyler. Olana odaklanmak uyumu yeniden kurar.',
    reversed:
      'Ters Kupa Beşlisi, kabullenişin başlamasıyla uyumun iyileşebileceğini gösterir. Geçmişi bırakmak huzur getirir.',
    keywords: ['kayıp', 'üzüntü', 'kabulleniş', 'uyum', 'şifa'],
    context: 'Geçmişi bırakmak uyumu açar. Yas bağları daraltır.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cu_pos3',
    card: 'Six of Cups',
    position: 3,
    upright:
      'Kupa Altılısı, nostalji ve saf bağların uyumu güçlendirdiğini gösterir. İç çocuk enerjisi sıcaklık getirir.',
    reversed:
      'Ters Kupa Altılısı, geçmişe aşırı takılı kalmak uyumu zorlaştırır. Şimdiye dönmek gerekir.',
    keywords: ['nostalji', 'saflık', 'iç çocuk', 'uyum', 'geçmiş'],
    context: 'Saf bağ uyumu besler. Takılılık bağı yorar.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cu_pos3',
    card: 'Seven of Cups',
    position: 3,
    upright:
      'Kupa Yedilisi, hayallerin uyumu besleyebileceğini gösterir. Doğru seçimler ortak bir vizyon yaratır.',
    reversed:
      'Ters Kupa Yedilisi, hayal kırıklığı veya dağınıklık uyumu zedeler. Gerçekçi seçimler yapılmalıdır.',
    keywords: ['hayal', 'seçim', 'vizyon', 'uyum', 'gerçeklik'],
    context: 'Seçimler uyumu belirler. Dağınıklık bağı zorlar.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cu_pos3',
    card: 'Eight of Cups',
    position: 3,
    upright:
      'Kupa Sekizlisi, duygusal olgunlaşma ve anlam arayışıyla uyumun güçlenebileceğini söyler. Gereksiz yükleri bırakmak bağınızı temizler.',
    reversed:
      'Ters Kupa Sekizlisi, gitmekle kalmak arasında sıkışma uyumu zorlaştırır. Kararsızlık ilişkide mesafe doğurur.',
    keywords: ['anlam arayışı', 'olgunluk', 'bırakma', 'uyum', 'denge'],
    context: 'Olgunluk uyumu getirir. Kararsızlık bağı zorlar.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cu_pos3',
    card: 'Nine of Cups',
    position: 3,
    upright:
      'Kupa Dokuzlusu, tatmin ve mutluluğun uyumun doğal sonucu olabileceğini gösterir. İç huzurunuz bağa da yansır.',
    reversed:
      'Ters Kupa Dokuzlusu, yüzeysel hazların peşinde koşmak uyumu zayıflatır. Gerçek doyum arayışı gerekir.',
    keywords: ['mutluluk', 'tatmin', 'uyum', 'doyum', 'huzur'],
    context: 'Tatmin uyumu besler. Yüzeysellik bağı gölgeler.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cu_pos3',
    card: 'Ten of Cups',
    position: 3,
    upright:
      'Kupa Onlusu, ailevi uyum ve kalıcı mutluluğun potansiyelini gösterir. Birlikte huzurlu bir gelecek mümkündür.',
    reversed:
      'Ters Kupa Onlusu, beklentilerin fazla idealize edilmesi uyumu bozabilir. Gerçekçi diyalog önemlidir.',
    keywords: ['mutluluk', 'aile', 'huzur', 'uyum', 'gelecek'],
    context: 'Birlik uyumu getirir. İdealizm bağı zorlar.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cu_pos3',
    card: 'Page of Cups',
    position: 3,
    upright:
      'Kupa Prensi, saf duygular ve merak uyumu güçlendirir. Küçük jestler ilişkiyi canlandırır.',
    reversed:
      'Ters Kupa Prensi, aşırı hassasiyet veya hayalperestlik uyumu zorlaştırır. Gerçekçi yaklaşım gerekebilir.',
    keywords: ['masumiyet', 'merak', 'jestler', 'uyum', 'ifade'],
    context: 'Saf duygular uyumu büyütür. Aşırılık bağı zorlar.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cu_pos3',
    card: 'Knight of Cups',
    position: 3,
    upright:
      'Kupa Şövalyesi, romantizm ve zarafetin uyumu besleyeceğini söyler. Kalpten gelen teklif bağınızı güçlendirir.',
    reversed:
      'Ters Kupa Şövalyesi, aşırı romantikleştirme veya tutarsızlık uyumu bozabilir. Netlik ve süreklilik gerekir.',
    keywords: ['romantizm', 'zarafet', 'teklif', 'uyum', 'vizyon'],
    context: 'Romantizm uyumu besler. Tutarsızlık bağı zayıflatır.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cu_pos3',
    card: 'Queen of Cups',
    position: 3,
    upright:
      'Kupa Kraliçesi, empati ve derin duygusallığın uyumu güçlendireceğini gösterir. Güvenli alan bağınızı büyütür.',
    reversed:
      'Ters Kupa Kraliçesi, sınırların kaybolması veya aşırı hassasiyet uyumu gölgeler. Öz düzenleme gerekir.',
    keywords: ['empati', 'şefkat', 'uyum', 'duygusallık', 'güven'],
    context: 'Empati uyumu büyütür. Dengesizlik bağı zorlar.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cu_pos3',
    card: 'King of Cups',
    position: 3,
    upright:
      'Kupa Kralı, duygusal olgunluk ve sakin liderlikle uyumu güçlendireceğini gösterir. Kriz anlarında dengeyi korumak bağa huzur getirir.',
    reversed:
      'Ters Kupa Kralı, duyguların bastırılması veya pasif agresyon uyumu zorlaştırır. Açık ifade gerekir.',
    keywords: ['olgunluk', 'denge', 'uyum', 'sükunet', 'liderlik'],
    context: 'Olgunluk uyumu getirir. Bastırma bağı zorlar.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_sw_pos3',
    card: 'Ace of Swords',
    position: 3,
    upright:
      'Kılıç Ası, açık iletişim ve dürüstlüğün uyumun temelini oluşturacağını söyler. Gerçeklerin netleşmesi ilişkiye denge katar.',
    reversed:
      'Ters Kılıç Ası, yanlış anlaşılmalar veya bulanıklık uyumu zedeler. İletişimde keskinlik yerine açıklık gerekir.',
    keywords: ['netlik', 'hakikat', 'uyum', 'iletişim', 'doğruluk'],
    context: 'Açık söz uyumu besler. Bulanıklık bağları zorlar.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sw_pos3',
    card: 'Two of Swords',
    position: 3,
    upright:
      'Kılıç İkilisi, uyum için dengeli kararların önemini gösterir. Tarafsızlık dengeyi korur.',
    reversed:
      'Ters Kılıç İkilisi, kaçınma ve kararsızlık uyumu engeller. Görmezden gelmek yerine net seçimler gerekir.',
    keywords: ['karar', 'denge', 'ikilem', 'uyum', 'seçim'],
    context: 'Net karar uyumu getirir. Kaçınma bağı bozar.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sw_pos3',
    card: 'Three of Swords',
    position: 3,
    upright:
      'Kılıç Üçlüsü, kalp kırıklıkları veya sert gerçeklerin uyumu zorlayabileceğini söyler. Açık yüzleşme denge getirir.',
    reversed:
      'Ters Kılıç Üçlüsü, iyileşme süreciyle uyumun yeniden kurulabileceğini gösterir. Şefkatli dil yaraları sarar.',
    keywords: ['kırık kalp', 'gerçek', 'yüzleşme', 'uyum', 'şifa'],
    context: 'Yüzleşme uyumu onarır. Bastırma bağları yorar.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sw_pos3',
    card: 'Four of Swords',
    position: 3,
    upright:
      'Kılıç Dörtlüsü, uyum için dinlenme ve sakinleşmenin gerekli olduğunu söyler. Zihinsel duruluk ilişkide denge sağlar.',
    reversed:
      'Ters Kılıç Dörtlüsü, aşırı gerginlik uyumu bozabilir. Mola vermeden ilerlemek bağları zorlar.',
    keywords: ['dinlenme', 'denge', 'sükunet', 'uyum', 'zihinsel rahatlık'],
    context: 'Sükunet uyumu getirir. Gerginlik bağları tüketir.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sw_pos3',
    card: 'Five of Swords',
    position: 3,
    upright:
      'Kılıç Beşlisi, ego çatışmalarının uyumu zorlayabileceğini gösterir. Haklı çıkma isteği yerine köprü kurmak önemlidir.',
    reversed:
      'Ters Kılıç Beşlisi, affediş ve uzlaşmayla uyum yeniden doğabilir. Gerilimi bırakmak barışı getirir.',
    keywords: ['çatışma', 'ego', 'haklılık', 'uyum', 'uzlaşma'],
    context: 'Köprü kurmak uyumu besler. Ego bağları koparır.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sw_pos3',
    card: 'Six of Swords',
    position: 3,
    upright:
      'Kılıç Altılısı, uyum için zorluklardan uzaklaşmak gerektiğini söyler. Birlikte sakin sulara geçmek ilişkiye huzur getirir.',
    reversed:
      'Ters Kılıç Altılısı, geçmişe takılı kalmak uyumu engeller. Yolculuk cesaret ister.',
    keywords: ['geçiş', 'uyum', 'huzur', 'ilerleme', 'denge'],
    context: 'Geçiş uyumu sağlar. Takılılık bağı zorlar.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sw_pos3',
    card: 'Seven of Swords',
    position: 3,
    upright:
      'Kılıç Yedilisi, strateji ve ölçülü davranışın uyum için önemli olduğunu gösterir. Açık niyet güveni artırır.',
    reversed:
      'Ters Kılıç Yedilisi, gizlilik veya yarım gerçekler uyumu zedeler. Şeffaflık gereklidir.',
    keywords: ['strateji', 'dürüstlük', 'uyum', 'güven', 'açıklık'],
    context: 'Şeffaflık uyumu büyütür. Gizlilik bağları yıpratır.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sw_pos3',
    card: 'Eight of Swords',
    position: 3,
    upright:
      'Kılıç Sekizlisi, zihinsel engellerin uyumu sınırlayabileceğini söyler. İnanç kalıplarını aşmak özgürlük getirir.',
    reversed:
      'Ters Kılıç Sekizlisi, özgürleşme isteğiyle uyumun yeniden kurulabileceğini gösterir. Kısıtlamaları aşmak gerekir.',
    keywords: ['kısıtlılık', 'inanç', 'özgürlük', 'uyum', 'aşma'],
    context: 'Özgürleşmek uyumu getirir. Kalıplar bağları sınırlar.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sw_pos3',
    card: 'Nine of Swords',
    position: 3,
    upright:
      'Kılıç Dokuzlusu, kaygı ve endişelerin uyumu zorlayabileceğini gösterir. Gerçekle yüzleşmek dengeyi getirir.',
    reversed:
      'Ters Kılıç Dokuzlusu, kabusların dağılmasıyla uyumun yeniden kurulabileceğini söyler. İçsel huzur önemlidir.',
    keywords: ['kaygı', 'endişe', 'gerçek', 'uyum', 'huzur'],
    context: 'Gerçekle yüzleşmek uyumu getirir. Kaygı bağları zorlar.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sw_pos3',
    card: 'Ten of Swords',
    position: 3,
    upright:
      'Kılıç Onlusu, acı bir sonun uyumda yer açabileceğini söyler. Yeniden doğuş için bitiş şart olabilir.',
    reversed:
      'Ters Kılıç Onlusu, toparlanma ve iyileşmenin başlamasıyla uyum yeniden kurulabilir.',
    keywords: ['bitiş', 'yenilenme', 'uyum', 'şifa', 'dönüşüm'],
    context: 'Bitiş uyumu açar. İyileşme bağı güçlendirir.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sw_pos3',
    card: 'Page of Swords',
    position: 3,
    upright:
      'Kılıç Prensi, merak ve öğrenme arzusunun uyumu destekleyeceğini gösterir. Açık diyalog bağları besler.',
    reversed:
      'Ters Kılıç Prensi, dedikodu veya yanlış bilgiler uyumu bozabilir. Bilgiyi doğrulamak gerekir.',
    keywords: ['merak', 'iletişim', 'uyum', 'öğrenme', 'doğruluk'],
    context: 'Açık bilgi uyumu besler. Yanlışlık bağları yorar.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sw_pos3',
    card: 'Knight of Swords',
    position: 3,
    upright:
      'Kılıç Şövalyesi, hızlı iletişim ve net tavırların uyumu destekleyebileceğini gösterir. Hedefe odaklılık bağda ivme yaratır.',
    reversed:
      'Ters Kılıç Şövalyesi, aceleci sözler uyumu bozabilir. Düşünmeden hareket etmek bağları zedeler.',
    keywords: ['hız', 'iletişim', 'uyum', 'netlik', 'kararlılık'],
    context: 'Netlik uyumu getirir. Acelecilik bağı zorlar.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sw_pos3',
    card: 'Queen of Swords',
    position: 3,
    upright:
      'Kılıç Kraliçesi, mantık ve objektifliğin uyumu güçlendireceğini gösterir. Açık sınırlar bağa netlik getirir.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştiri veya soğukluk uyumu zayıflatır. Şefkatle yaklaşmak gerekir.',
    keywords: ['mantık', 'netlik', 'uyum', 'sınırlar', 'objektiflik'],
    context: 'Objektiflik uyumu besler. Soğukluk bağları yıpratır.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sw_pos3',
    card: 'King of Swords',
    position: 3,
    upright:
      'Kılıç Kralı, stratejik düşünce ve dürüstlüğün uyumu güçlendireceğini gösterir. İlkesel yaklaşım bağda güven sağlar.',
    reversed:
      'Ters Kılıç Kralı, katı kurallar veya aşırı eleştiri uyumu zorlaştırır. Empatiyle denge sağlanmalı.',
    keywords: ['strateji', 'dürüstlük', 'uyum', 'mantık', 'güven'],
    context: 'İlkeler uyumu besler. Katılık bağı sınırlar.',
    group: 'Kılıçlar',
  },
  // --- Asalar Serisi ---//
  {
    id: 'ace_of_pentacles_pe_pos3',
    card: 'Ace of Pentacles',
    position: 3,
    upright:
      'Tılsım Ası, uyumun sağlam temeller üzerine kurulacağını gösterir. Maddi ve manevi güven ilişkide istikrar yaratır.',
    reversed:
      'Ters Tılsım Ası, fırsatların kaçırılması veya güvensizlik uyumu zorlayabilir. Temeli sağlamlaştırmak gerekir.',
    keywords: ['temel', 'güven', 'istikrar', 'uyum', 'fırsat'],
    context: 'Güvenli temel uyumu besler. Zayıf zemin bağları zorlar.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pe_pos3',
    card: 'Two of Pentacles',
    position: 3,
    upright:
      'Tılsım İkilisi, uyum için esneklik ve denge kurmak gerektiğini söyler. Sorumlulukları paylaşmak ilişkiyi dengeler.',
    reversed:
      'Ters Tılsım İkilisi, dengesizlik veya aşırı yük uyumu bozabilir. Öncelikler gözden geçirilmeli.',
    keywords: ['denge', 'esneklik', 'uyum', 'paylaşım', 'sorumluluk'],
    context: 'Esneklik uyumu getirir. Aşırı yük bağları zedeler.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pe_pos3',
    card: 'Three of Pentacles',
    position: 3,
    upright:
      'Tılsım Üçlüsü, işbirliği ve ortak çabanın uyumu güçlendireceğini gösterir. Ortak hedefler bağları sağlamlaştırır.',
    reversed:
      'Ters Tılsım Üçlüsü, uyum eksikliği veya işbirliği sorunları bağları zayıflatabilir. Rol netliği önemlidir.',
    keywords: ['işbirliği', 'uyum', 'hedef', 'ortaklık', 'denge'],
    context: 'Ortak çaba uyumu besler. İşbirliği eksikliği bağları yorar.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pe_pos3',
    card: 'Four of Pentacles',
    position: 3,
    upright:
      'Tılsım Dörtlüsü, güven ve sahiplenmenin uyumu koruyabileceğini gösterir. Fakat aşırı tutuculuk dengeyi bozabilir.',
    reversed:
      'Ters Tılsım Dörtlüsü, fazla kontrolün bırakılmasıyla uyum güçlenebilir. Paylaşmak bağı rahatlatır.',
    keywords: ['güven', 'sahiplenme', 'uyum', 'denge', 'paylaşım'],
    context: 'Güven uyumu besler. Aşırı tutuculuk bağı sınırlar.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pe_pos3',
    card: 'Five of Pentacles',
    position: 3,
    upright:
      'Tılsım Beşlisi, yoksunluk veya dışlanma hissinin uyumu zorlayabileceğini gösterir. Birlikte destekleşmek bağı güçlendirir.',
    reversed:
      'Ters Tılsım Beşlisi, toparlanma ve dayanışmayla uyum yeniden kurulabilir. Zorlukları paylaşmak bağları onarır.',
    keywords: ['yoksunluk', 'destek', 'uyum', 'birlik', 'dayanışma'],
    context: 'Dayanışma uyumu güçlendirir. Dışlanma bağı yaralar.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pe_pos3',
    card: 'Six of Pentacles',
    position: 3,
    upright:
      'Tılsım Altılısı, adil paylaşım ve destek uyumu büyütür. Dengeyi korumak bağları güçlendirir.',
    reversed:
      'Ters Tılsım Altılısı, güç dengesizliği veya koşullu destek uyumu bozabilir. Eşitlik sağlanmalı.',
    keywords: ['paylaşım', 'denge', 'uyum', 'eşitlik', 'destek'],
    context: 'Adil paylaşım uyumu besler. Dengesizlik bağı zorlar.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pe_pos3',
    card: 'Seven of Pentacles',
    position: 3,
    upright:
      'Tılsım Yedilisi, sabır ve ortak emekle uyumun zamanla güçleneceğini gösterir. Yatırım ilişkide meyve verir.',
    reversed:
      'Ters Tılsım Yedilisi, sabırsızlık veya beklenti hayal kırıklığı uyumu zorlayabilir.',
    keywords: ['sabır', 'emek', 'uyum', 'yatırım', 'zaman'],
    context: 'Sabır uyumu getirir. Acelecilik bağı sınırlar.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pe_pos3',
    card: 'Eight of Pentacles',
    position: 3,
    upright:
      'Tılsım Sekizlisi, birlikte öğrenmek ve emek vermek uyumu pekiştirir. Disiplinli yaklaşım bağları güçlendirir.',
    reversed:
      'Ters Tılsım Sekizlisi, özensizlik veya çaba eksikliği uyumu zayıflatır. Düzen şarttır.',
    keywords: ['emek', 'öğrenme', 'uyum', 'disiplin', 'gelişim'],
    context: 'Ortak emek uyumu besler. Özensizlik bağı yıpratır.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pe_pos3',
    card: 'Nine of Pentacles',
    position: 3,
    upright:
      'Tılsım Dokuzlusu, bireysel güç ve öz değer uyumda denge sağlar. Bağımsızlık ilişkide huzuru besler.',
    reversed:
      'Ters Tılsım Dokuzlusu, aşırı bağımlılık veya savurganlık uyumu bozabilir. Öz yeterlilik önemlidir.',
    keywords: ['öz değer', 'bağımsızlık', 'uyum', 'denge', 'özgürlük'],
    context: 'Öz değer uyumu büyütür. Bağımlılık bağı zorlar.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pe_pos3',
    card: 'Ten of Pentacles',
    position: 3,
    upright:
      'Tılsım Onlusu, aile ve uzun vadeli istikrarın uyumu pekiştireceğini gösterir. Ortak değerler bağı güçlendirir.',
    reversed:
      'Ters Tılsım Onlusu, ailevi çatışmalar veya istikrarsızlık uyumu zorlaştırabilir.',
    keywords: ['aile', 'istikrar', 'uyum', 'değerler', 'kalıcılık'],
    context: 'Uzun vadeli istikrar uyumu besler. Çatışma bağı sınar.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pe_pos3',
    card: 'Page of Pentacles',
    position: 3,
    upright:
      'Tılsım Prensi, öğrenme arzusu ve yeni başlangıçlar uyumu destekler. Küçük adımlar büyük ilerleme getirir.',
    reversed:
      'Ters Tılsım Prensi, dikkatsizlik veya dağınık hedefler uyumu bozabilir. Odaklanmak şarttır.',
    keywords: ['öğrenme', 'başlangıç', 'uyum', 'odak', 'hedef'],
    context: 'Yeni öğrenme uyumu getirir. Dağınıklık bağı yorar.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pe_pos3',
    card: 'Knight of Pentacles',
    position: 3,
    upright:
      'Tılsım Şövalyesi, sabırlı ve istikrarlı adımların uyumu güçlendireceğini gösterir. Sadakat bağları pekiştirir.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık veya inat uyumu bozabilir. Esneklik gerekir.',
    keywords: ['istikrar', 'sabır', 'uyum', 'sadakat', 'güven'],
    context: 'İstikrar uyumu güçlendirir. Katılık bağı zorlar.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pe_pos3',
    card: 'Queen of Pentacles',
    position: 3,
    upright:
      'Tılsım Kraliçesi, şefkatli ve pratik yaklaşımın uyumu destekleyeceğini gösterir. Besleyici enerji bağı korur.',
    reversed:
      'Ters Tılsım Kraliçesi, aşırı yüklenme veya öz bakım eksikliği uyumu zorlayabilir.',
    keywords: ['şefkat', 'pratiklik', 'uyum', 'denge', 'besleyicilik'],
    context:
      'Besleyici enerji uyumu büyütür. Öz bakım eksikliği bağı zayıflatır.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pe_pos3',
    card: 'King of Pentacles',
    position: 3,
    upright:
      'Tılsım Kralı, sağlamlık ve sorumluluk uyumu destekler. Stratejik yaklaşım ilişkiye güven katar.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol veya statü odaklılık uyumu zayıflatır.',
    keywords: ['sağlamlık', 'uyum', 'sorumluluk', 'strateji', 'güven'],
    context: 'Sağlamlık uyumu besler. Kontrol bağı sınırlandırır.',
    group: 'Tılsımlar',
  },

  //--- Tılsımlar Serisi ---
  {
    id: 'ace_of_wands_wa_pos3',
    card: 'Ace of Wands',
    position: 3,
    upright:
      'Değnek Ası, ilişkiye taze enerji ve tutku getirir. Yaratıcı bir kıvılcım uyumun başlangıcını ateşler.',
    reversed:
      'Ters Değnek Ası, motivasyon eksikliği veya erteleme uyumu zorlaştırabilir. Ateşi canlı tutmak gerekir.',
    keywords: ['tutku', 'başlangıç', 'yaratıcılık', 'uyum', 'enerji'],
    context: 'Yeni kıvılcım uyumu canlandırır. Sönük ateş bağı zayıflatır.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_wa_pos3',
    card: 'Two of Wands',
    position: 3,
    upright:
      'Değnek İkilisi, geleceğe dair ortak vizyon uyumu besler. Plan yapmak ilişkide dengeyi sağlar.',
    reversed:
      'Ters Değnek İkilisi, belirsizlik veya karar verememe uyumu bozabilir.',
    keywords: ['vizyon', 'plan', 'ortaklık', 'uyum', 'denge'],
    context: 'Ortak vizyon uyumu büyütür. Kararsızlık bağı sınar.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_wa_pos3',
    card: 'Three of Wands',
    position: 3,
    upright:
      'Değnek Üçlüsü, birlikte genişleme ve fırsatlar uyumu güçlendirir. Ufka bakmak bağları besler.',
    reversed:
      'Ters Değnek Üçlüsü, dar görüşlülük veya gecikmeler uyumu zorlaştırır.',
    keywords: ['fırsat', 'genişleme', 'uyum', 'vizyon', 'birlik'],
    context: 'Ufuk uyumu besler. Gecikme bağı sınar.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_wa_pos3',
    card: 'Four of Wands',
    position: 3,
    upright:
      'Değnek Dörtlüsü, kutlama ve uyum enerjisini taşır. Ortak mutluluk bağları güçlendirir.',
    reversed:
      'Ters Değnek Dörtlüsü, uyum yerine geçici düzensizlik veya huzursuzluk getirebilir.',
    keywords: ['kutlama', 'uyum', 'denge', 'birlik', 'istikrar'],
    context: 'Kutlama uyumu güçlendirir. Düzensizlik bağı zayıflatır.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_wa_pos3',
    card: 'Five of Wands',
    position: 3,
    upright:
      'Değnek Beşlisi, sağlıklı rekabetin uyumu besleyebileceğini gösterir. Yapıcı mücadele bağları dinamik kılar.',
    reversed:
      'Ters Değnek Beşlisi, çatışmaların artması uyumu zedeleyebilir. Uyum için denge gerekir.',
    keywords: ['rekabet', 'mücadele', 'uyum', 'denge', 'dinamizm'],
    context: 'Yapıcı rekabet uyumu canlı tutar. Çatışma bağı yorar.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_wa_pos3',
    card: 'Six of Wands',
    position: 3,
    upright:
      'Değnek Altılısı, başarı ve takdirin paylaşımı uyumu büyütür. Birbirini onurlandırmak bağları güçlendirir.',
    reversed:
      'Ters Değnek Altılısı, kıskançlık veya takdir eksikliği uyumu bozabilir.',
    keywords: ['başarı', 'takdir', 'uyum', 'destek', 'zafer'],
    context: 'Takdir uyumu besler. Eksik onay bağı zorlar.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_wa_pos3',
    card: 'Seven of Wands',
    position: 3,
    upright:
      'Değnek Yedilisi, sınırları korumanın uyum için önemli olduğunu söyler. Güçlü duruş bağları sağlamlaştırır.',
    reversed: 'Ters Değnek Yedilisi, fazla savunmacılık uyumu zedeleyebilir.',
    keywords: ['savunma', 'sınır', 'uyum', 'denge', 'güç'],
    context: 'Sağlam sınırlar uyumu besler. Katılık bağı zorlar.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_wa_pos3',
    card: 'Eight of Wands',
    position: 3,
    upright:
      'Değnek Sekizlisi, hızlı ilerleme ve açık iletişim uyumu güçlendirir. Enerji akışı bağları besler.',
    reversed: 'Ters Değnek Sekizlisi, iletişimde aksaklıklar uyumu bozabilir.',
    keywords: ['iletişim', 'hız', 'uyum', 'akış', 'ilerleme'],
    context: 'Açık iletişim uyumu güçlendirir. Tıkanma bağı sınar.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_wa_pos3',
    card: 'Nine of Wands',
    position: 3,
    upright:
      'Değnek Dokuzlusu, direnç ve azimle uyumun korunacağını gösterir. Zorluklara rağmen dayanışma bağları güçlendirir.',
    reversed:
      'Ters Değnek Dokuzlusu, tükenmişlik veya fazla savunma uyumu bozabilir.',
    keywords: ['direnç', 'dayanışma', 'uyum', 'azim', 'koruma'],
    context: 'Dayanışma uyumu besler. Tükenmişlik bağı sınar.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_wa_pos3',
    card: 'Ten of Wands',
    position: 3,
    upright:
      'Değnek Onlusu, sorumlulukların paylaşılmasıyla uyumun güçleneceğini gösterir. Ortak yükler bağları destekler.',
    reversed:
      'Ters Değnek Onlusu, aşırı yüklenme veya dengesiz sorumluluk uyumu bozabilir.',
    keywords: ['sorumluluk', 'paylaşım', 'uyum', 'denge', 'yük'],
    context: 'Ortak sorumluluk uyumu besler. Dengesizlik bağı yorar.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_wa_pos3',
    card: 'Page of Wands',
    position: 3,
    upright:
      'Değnek Prensi, merak ve keşif uyumu destekler. Yeni deneyimler bağlara heyecan katar.',
    reversed:
      'Ters Değnek Prensi, dağınıklık veya sabırsızlık uyumu bozabilir.',
    keywords: ['keşif', 'merak', 'uyum', 'heyecan', 'başlangıç'],
    context: 'Keşif uyumu büyütür. Dağınıklık bağı zorlar.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_wa_pos3',
    card: 'Knight of Wands',
    position: 3,
    upright:
      'Değnek Şövalyesi, tutku ve hareket uyumu besler. Cesur adımlar bağları güçlendirir.',
    reversed:
      'Ters Değnek Şövalyesi, acelecilik veya dengesizlik uyumu bozabilir.',
    keywords: ['tutku', 'hareket', 'uyum', 'cesaret', 'denge'],
    context: 'Tutku uyumu besler. Acelecilik bağı sınar.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_wa_pos3',
    card: 'Queen of Wands',
    position: 3,
    upright:
      'Değnek Kraliçesi, sıcaklık ve güvenin uyumu destekleyeceğini gösterir. Karizma bağları büyütür.',
    reversed:
      'Ters Değnek Kraliçesi, kıskançlık veya güvensizlik uyumu bozabilir.',
    keywords: ['sıcaklık', 'güven', 'uyum', 'karizma', 'liderlik'],
    context: 'Sıcaklık uyumu güçlendirir. Güvensizlik bağı sınar.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_wa_pos3',
    card: 'King of Wands',
    position: 3,
    upright:
      'Değnek Kralı, vizyon ve liderlik uyumu destekler. Güven verici enerji bağları sağlamlaştırır.',
    reversed:
      'Ters Değnek Kralı, aşırı otorite veya sabırsızlık uyumu zorlaştırabilir.',
    keywords: ['vizyon', 'liderlik', 'uyum', 'güven', 'denge'],
    context: 'Vizyon uyumu besler. Otorite bağı zorlar.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 3 anlamını getirir
 * @param card - Tarot kartı
 * @returns pozisyon 3 anlamı veya null
 */
export function getNewLoverposition3Meaning(
  card: TarotCard
): NewLoverposition3Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position3Meanings.find(
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
  meaning = position3Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 3 anlamını getirir
 * @param cardName - Kart ismi
 * @returns pozisyon 3 anlamı veya null
 */
export function getNewLoverposition3MeaningByCardName(
  cardName: string
): NewLoverposition3Meaning | null {
  return position3Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 3 anlamlarını getirir
 * @returns pozisyon 3 anlamları array'i
 */
export function getAllNewLoverposition3Meanings(): NewLoverposition3Meaning[] {
  return position3Meanings;
}

/**
 * Kart grubuna göre pozisyon 3 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getNewLoverposition3MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): NewLoverposition3Meaning[] {
  return position3Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
  export const useI18nposition3Meanings = (): I18nNewLoverposition3Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position3Meanings.map(meaning => {
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
export const getI18nposition3Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nNewLoverposition3Meaning | null => {
  const originalMeaning = position3Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`new-lover.meanings.${cardKey}.position3.upright`);
  const i18nReversed = t(`new-lover.meanings.${cardKey}.position3.reversed`);
  const i18nKeywords = t(`new-lover.meanings.${cardKey}.position3.keywords`);
  const i18nContext = t(`new-lover.meanings.${cardKey}.position3.context`);
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
const newLoverposition3Exports = {
  position3Meanings,
  getNewLoverposition3Meaning,
  getNewLoverposition3MeaningByCardName,
  getAllNewLoverposition3Meanings,
  getNewLoverposition3MeaningsByGroup,
  getI18nposition3Meaning,
};

export default newLoverposition3Exports;
