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

export interface NewLoverposition5Meaning {
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
export interface I18nNewLoverposition5Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position5Meanings: NewLoverposition5Meaning[] = [
  // --- Majör Arkana Kartları ---
  
    {
      id: 'the_fool_ma_pos5',
      card: 'The Fool',
      position: 5,
      upright:
        'Deli, bu kişiyle bağınızda masumiyet ve yeni başlangıç enerjisi var. Ruh eşi olasılığı, birlikte cesurca keşfe çıkmaya açık olmanızla güçleniyor.',
      reversed:
        'Ters Deli, bağın yüzeyselliğe kayması ruh eşi potansiyelini zayıflatabilir. Derinlikten kaçış, ruh eşliği yerine kısa süreli bir maceraya dönüşebilir.',
      keywords: ['başlangıç', 'masumiyet', 'keşif', 'cesaret', 'ruh eşi'],
      context: 'Yeni başlangıç ruh eşi ihtimalini besler, yüzeysellik bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_magician_ma_pos5',
      card: 'The Magician',
      position: 5,
      upright:
        'Büyücü, ruh eşi enerjisinin güçlü bir çekim ve niyet uyumuyla geldiğini gösteriyor. İletişim ve karşılıklı niyetler bu bağın ruhsal derinliğini besliyor.',
      reversed:
        'Ters Büyücü, yanlış iletişim veya manipülasyon eğilimleri ruh eşi bağlantısını zedeleyebilir. Söz ve niyet dengesizliği bağı yüzeyselleştirebilir.',
      keywords: ['niyet', 'çekim', 'ifade', 'bağ', 'ruh eşi'],
      context: 'Niyet uyumu ruh eşi potansiyelini artırır, manipülasyon gölge yaratır.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_high_priestess_ma_pos5',
      card: 'The High Priestess',
      position: 5,
      upright:
        'Başrahibe, ruh eşi bağlantısının derin sezgiler ve görünmeyen bağlarla örüldüğünü gösterir. İçsel bir tanıma duygusu bu kişide güçlü olabilir.',
      reversed:
        'Ters Başrahibe, sırlar ve aşırı gizlilik ruh eşi bağının önüne set çekebilir. Ruhsal yakınlık yerine mesafe yaratır.',
      keywords: ['sezgi', 'gizem', 'ruhsal bağ', 'içsel tanıma', 'ruh eşi'],
      context: 'Sezgisel bağ ruh eşliğini işaret eder, gizlilik mesafe yaratır.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_empress_ma_pos5',
      card: 'The Empress',
      position: 5,
      upright:
        'İmparatoriçe, bereket, şefkat ve kalpten besleyicilik ruh eşi bağının temelini oluşturur. Bu kişiyle karşılaşmak içsel huzur ve sıcaklık getirebilir.',
      reversed:
        'Ters İmparatoriçe, aşırı bağımlılık veya öz bakım eksikliği ruh eşliğin sağlıklı gelişimini engelleyebilir.',
      keywords: ['şefkat', 'bereket', 'besleme', 'uyum', 'ruh eşi'],
      context: 'Besleyici enerji ruh eşliğini destekler, bağımlılık bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_emperor_ma_pos5',
      card: 'The Emperor',
      position: 5,
      upright:
        'İmparator, sağlam temeller ve güvenilirlik ruh eşi bağı için güçlü bir zemin sağlar. Kalıcı düzen ruh eşliğe işaret edebilir.',
      reversed:
        'Ters İmparator, katı kontrol ve esneklik eksikliği ruh eşi bağını kısıtlayabilir.',
      keywords: ['güven', 'temel', 'istikrar', 'koruma', 'ruh eşi'],
      context: 'Sağlamlık ruh eşliğini destekler, katılık bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_hierophant_ma_pos5',
      card: 'The Hierophant',
      position: 5,
      upright:
        'Aziz, ruh eşliğin ortak değerler, gelenekler veya inançlarla güçlenebileceğini söyler. Manevi bağ ruh eşliğe işaret eder.',
      reversed:
        'Ters Aziz, farklı değer sistemleri veya kör başkaldırı ruh eşi bağında zorluk çıkarabilir.',
      keywords: ['değer', 'inanç', 'maneviyat', 'uyum', 'ruh eşi'],
      context: 'Değer uyumu ruh eşliğini destekler, uyumsuzluk gölge yaratır.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_lovers_ma_pos5',
      card: 'The Lovers',
      position: 5,
      upright:
        'Aşıklar, ruh eşi potansiyelinin en güçlü göstergelerinden biridir. Kalbiniz ve bu kişinin kalbi benzer bir frekansta buluşuyor olabilir.',
      reversed:
        'Ters Aşıklar, kararsızlık veya uyumsuz seçimler ruh eşi bağlantısını zayıflatır.',
      keywords: ['aşk', 'seçim', 'uyum', 'bağ', 'ruh eşi'],
      context: 'Uyum ruh eşliğini besler, kararsızlık bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_chariot_ma_pos5',
      card: 'The Chariot',
      position: 5,
      upright:
        'Savaş Arabası, ruh eşi bağında ortak yön ve disiplinle ilerleme potansiyeli olduğunu gösterir. Yolculuk birlikte tamamlanabilir.',
      reversed:
        'Ters Savaş Arabası, yönsüzlük veya dengesizlik ruh eşi bağını zayıflatabilir.',
      keywords: ['yön', 'disiplin', 'ilerleme', 'birliktelik', 'ruh eşi'],
      context: 'Ortak yön ruh eşliğini destekler, dengesizlik bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'strength_ma_pos5',
      card: 'Strength',
      position: 5,
      upright:
        'Güç, sabır, şefkat ve içsel cesaret ruh eşi bağının doğasını işaret eder. Bu bağ yumuşak ama derin bir güçle büyüyebilir.',
      reversed:
        'Ters Güç, sabırsızlık veya kıskançlık ruh eşi bağını zorlaştırabilir.',
      keywords: ['şefkat', 'sabır', 'cesaret', 'denge', 'ruh eşi'],
      context: 'Şefkat ruh eşliğini besler, sabırsızlık bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_hermit_ma_pos5',
      card: 'The Hermit',
      position: 5,
      upright:
        'Ermiş, ruh eşi bağlantısının içsel bir keşif ve derin farkındalıkla bulunabileceğini söyler. Sessizlikte tanıma duygusu doğar.',
      reversed:
        'Ters Ermiş, aşırı izolasyon ruh eşi bağlantısını geciktirebilir veya zayıflatabilir.',
      keywords: ['içe dönüş', 'bilgelik', 'arayış', 'farkındalık', 'ruh eşi'],
      context: 'İçsel keşif ruh eşliğini destekler, izolasyon bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'wheel_of_fortune_ma_pos5',
      card: 'Wheel of Fortune',
      position: 5,
      upright:
        'Kader Çarkı, ruh eşiyle karşılaşmanın kaderin zamanlamasıyla ilgili olduğunu gösterir. Döngüler sizi buluşturabilir.',
      reversed:
        'Ters Kader Çarkı, direnç veya zamanlama hatası ruh eşi bağlantısını erteleyebilir.',
      keywords: ['kader', 'döngü', 'zamanlama', 'akış', 'ruh eşi'],
      context: 'Doğru zaman ruh eşliğini besler, direnç bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'justice_ma_pos5',
      card: 'Justice',
      position: 5,
      upright:
        'Adalet, ruh eşi bağının dürüstlük, eşitlik ve şeffaflık üzerine kurulabileceğini gösterir.',
      reversed:
        'Ters Adalet, adaletsizlik veya dengesizlik ruh eşi bağını zedeleyebilir.',
      keywords: ['adalet', 'denge', 'eşitlik', 'şeffaflık', 'ruh eşi'],
      context: 'Şeffaflık ruh eşliğini besler, dengesizlik bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_hanged_man_ma_pos5',
      card: 'The Hanged Man',
      position: 5,
      upright:
        'Asılan Adam, ruh eşi bağlantısının farklı bir bakış açısı ve sabırla gelişebileceğini söyler.',
      reversed:
        'Ters Asılan Adam, atalet veya gönülsüzlük ruh eşi bağını geciktirebilir.',
      keywords: ['perspektif', 'teslimiyet', 'sabır', 'farkındalık', 'ruh eşi'],
      context: 'Yeni bakış ruh eşliğini destekler, atalet bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'death_ma_pos5',
      card: 'Death',
      position: 5,
      upright:
        'Ölüm, ruh eşi bağlantısının bir dönüşüm ve yeniden doğuşla mümkün olabileceğini söyler. Eskiyi bırakmak yeniye alan açar.',
      reversed:
        'Ters Ölüm, geçmişe tutunmak ruh eşi bağının önünde engel olabilir.',
      keywords: ['dönüşüm', 'yeniden doğuş', 'bitiş', 'başlangıç', 'ruh eşi'],
      context: 'Dönüşüm ruh eşliğini destekler, geçmiş bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'temperance_ma_pos5',
      card: 'Temperance',
      position: 5,
      upright:
        'Denge, ruh eşi bağının uyum, sabır ve ölçülülükle büyüyebileceğini gösterir.',
      reversed:
        'Ters Denge, aşırılıklar veya sabırsızlık ruh eşi bağlantısını zorlayabilir.',
      keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'ruh eşi'],
      context: 'Denge ruh eşliğini destekler, aşırılık bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_devil_ma_pos5',
      card: 'The Devil',
      position: 5,
      upright:
        'Şeytan, yoğun tutku ve çekim ruh eşi bağı gibi hissedilebilir ama bazen bağımlılık gölgesi taşıyabilir.',
      reversed:
        'Ters Şeytan, özgürleşme arzusu ruh eşi bağını daha sağlıklı hale getirebilir.',
      keywords: ['tutku', 'çekim', 'bağımlılık', 'özgürlük', 'ruh eşi'],
      context: 'Tutku ruh eşliğini hissettirebilir, bağımlılık gölge yaratır.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_tower_ma_pos5',
      card: 'The Tower',
      position: 5,
      upright:
        'Kule, ruh eşi bağlantısı ani farkındalıklarla veya krizlerle gelebilir. Yıkım, yeni bir bağın temelini atabilir.',
      reversed:
        'Ters Kule, değişimden kaçış ruh eşi bağlantısının fark edilmesini engelleyebilir.',
      keywords: ['farkındalık', 'kriz', 'yıkım', 'yeniden inşa', 'ruh eşi'],
      context: 'Ani farkındalık ruh eşliğini açar, kaçış bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_star_ma_pos5',
      card: 'The Star',
      position: 5,
      upright:
        'Yıldız, umut, şifa ve ilham ruh eşi bağlantısını işaret eder. Bu bağ ruhsal bir yenilenme getirir.',
      reversed:
        'Ters Yıldız, umutsuzluk veya ilham kaybı ruh eşi bağını gölgeleyebilir.',
      keywords: ['umut', 'ilham', 'şifa', 'yenilenme', 'ruh eşi'],
      context: 'Umut ruh eşliğini besler, umutsuzluk bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_moon_ma_pos5',
      card: 'The Moon',
      position: 5,
      upright:
        'Ay, ruh eşi bağının sezgisel ve bazen gizemli işaretlerle geldiğini söyler. İçsel hisler bu bağı tanıtır.',
      reversed:
        'Ters Ay, yanılsamalar veya korkular ruh eşi bağının anlaşılmasını zorlaştırır.',
      keywords: ['sezgi', 'gizem', 'korku', 'aydınlanma', 'ruh eşi'],
      context: 'Sezgi ruh eşliğini tanıtır, korkular bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_sun_ma_pos5',
      card: 'The Sun',
      position: 5,
      upright:
        'Güneş, neşe, açıklık ve otantiklik ruh eşi bağını aydınlatır. Bu kişiyle birliktelik sıcaklık ve mutluluk getirebilir.',
      reversed:
        'Ters Güneş, sahte neşe veya netlik eksikliği ruh eşi bağını zorlayabilir.',
      keywords: ['neşe', 'açıklık', 'otantiklik', 'mutluluk', 'ruh eşi'],
      context: 'Açıklık ruh eşliğini destekler, sahicilik eksikliği bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'judgement_ma_pos5',
      card: 'Judgement',
      position: 5,
      upright:
        'Mahkeme, ruh eşi bağlantısının geçmiş deneyimlerin iyileşmesi ve affedişle geldiğini gösterir. Yeniden doğuş ruh eşi bağına kapı açar.',
      reversed:
        'Ters Mahkeme, aşırı yargı veya affedememe ruh eşi bağını zorlaştırır.',
      keywords: ['yargı', 'yenilenme', 'affediş', 'karar', 'ruh eşi'],
      context: 'Affediş ruh eşliğini besler, yargı bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_world_ma_pos5',
      card: 'The World',
      position: 5,
      upright:
        'Dünya, tamamlanma ve bütünlük ruh eşi bağlantısının en güçlü göstergelerindendir. Bu bağ döngüleri kapatarak bütünleşme sağlar.',
      reversed:
        'Ters Dünya, yarım kalmışlık veya eksiklik ruh eşi bağının tam hissedilmesini zorlaştırabilir.',
      keywords: ['tamamlanma', 'bütünlük', 'birleşme', 'denge', 'ruh eşi'],
      context: 'Bütünlük ruh eşliğini işaret eder, eksiklik bağı sınar.',
      group: 'Majör Arkana',
    },

  //-- Kupalar --//
    {
      id: 'ace_of_cups_cu_pos5',
      card: 'Ace of Cups',
      position: 5,
      upright:
        'Kupa Ası, saf bir kalp açılımı ve ruhsal bir bağın doğuşunu gösterir. Bu kişiyle aranızda aşkın en masum ve ruhsal kaynağa bağlı hali olabilir.',
      reversed:
        'Ters Kupa Ası, duyguların bastırılması ya da kalbin tam açılmaması ruh eşi bağına engel olabilir. Ruh eşi potansiyeli için kalbi şeffaf açmak gerekir.',
      keywords: ['aşk', 'başlangıç', 'ruh bağı', 'şefkat', 'yenilik'],
      context: 'Yeni bir kalp açılımı ruh eşliği potansiyelini artırır.',
      group: 'Kupalar',
    },
    {
      id: 'two_of_cups_cu_pos5',
      card: 'Two of Cups',
      position: 5,
      upright:
        'Kupa İkilisi, ruh eşi bağının en güçlü göstergelerinden biridir. Karşılıklı sevgi ve eşit alışveriş, bu bağın ruhsal derinliğini işaret eder.',
      reversed:
        'Ters Kupa İkilisi, eşitsizlik veya yanlış anlaşılmalar ruh eşi bağını zorlaştırabilir. Ancak iletişimle bu bağ yeniden kurulabilir.',
      keywords: ['ruh eşi', 'karşılıklılık', 'eşitlik', 'bağ', 'aşk'],
      context: 'Karşılıklı sevgi ruh eşliğini güçlendirir, dengesizlik gölge yaratır.',
      group: 'Kupalar',
    },
    {
      id: 'three_of_cups_cu_pos5',
      card: 'Three of Cups',
      position: 5,
      upright:
        'Kupa Üçlüsü, ruh eşini bulmanın neşeli kutlamalar veya sosyal ortamlarla mümkün olabileceğini söyler. Bu bağ dostane bir sıcaklıktan filizlenebilir.',
      reversed:
        'Ters Kupa Üçlüsü, fazla sosyal dağınıklık veya üçüncü kişilerin etkisi ruh eşi bağını gölgeleyebilir.',
      keywords: ['kutlama', 'topluluk', 'bağ', 'neşe', 'ruh eşi'],
      context: 'Neşe ruh eşliği potansiyelini artırır, dış etkiler gölge yaratır.',
      group: 'Kupalar',
    },
    {
      id: 'four_of_cups_cu_pos5',
      card: 'Four of Cups',
      position: 5,
      upright:
        'Kupa Dörtlüsü, ruh eşini fark etmeme veya mevcut fırsatları görmezden gelme riskine işaret eder. Ruh eşi bağlantısı göz önünde olabilir.',
      reversed:
        'Ters Kupa Dörtlüsü, uyanış ve farkındalıkla ruh eşi potansiyeli görünür hale gelir. Kalbi açma isteği bu bağı tetikleyebilir.',
      keywords: ['fırsat', 'farkındalık', 'uyanış', 'duygu', 'ruh eşi'],
      context: 'Farkındalık ruh eşliği yolunu açar, kayıtsızlık bağın önüne geçer.',
      group: 'Kupalar',
    },
    {
      id: 'five_of_cups_cu_pos5',
      card: 'Five of Cups',
      position: 5,
      upright:
        'Kupa Beşlisi, geçmiş kayıpların ardından ruh eşini bulma ihtimaline işaret eder. Umudu kaybetmemek bu bağı getirir.',
      reversed:
        'Ters Kupa Beşlisi, yasın bitişiyle birlikte ruh eşi bağlantısı görünür hale gelebilir. Kaybın ardından yeni bir şans doğar.',
      keywords: ['kayıp', 'şifa', 'umut', 'yeniden doğuş', 'ruh eşi'],
      context: 'Kaybın ardından şifa ruh eşliği yolunu açar.',
      group: 'Kupalar',
    },
    {
      id: 'six_of_cups_cu_pos5',
      card: 'Six of Cups',
      position: 5,
      upright:
        'Kupa Altılısı, ruh eşliğin geçmiş yaşam ya da geçmişten biriyle bağlantılı olabileceğini söyler. Tanıdık bir sıcaklık bu bağı tanımlar.',
      reversed:
        'Ters Kupa Altılısı, geçmişe aşırı tutunmak ruh eşi bağını zorlaştırabilir. Ancak anıyı onurlandırarak yeni bir bağ kurulabilir.',
      keywords: ['geçmiş', 'nostalji', 'tanıdıklık', 'ruh bağı', 'ruh eşi'],
      context: 'Geçmişin sıcaklığı ruh eşliğini işaret edebilir.',
      group: 'Kupalar',
    },
    {
      id: 'seven_of_cups_cu_pos5',
      card: 'Seven of Cups',
      position: 5,
      upright:
        'Kupa Yedilisi, ruh eşiyle ilgili hayallerin çoğaldığını ve birçok ihtimal arasında seçim yapılması gerektiğini gösterir.',
      reversed:
        'Ters Kupa Yedilisi, kafa karışıklığının sona ermesiyle ruh eşi potansiyeli netleşebilir. Gerçekçi seçim bu bağı güçlendirir.',
      keywords: ['hayal', 'seçenek', 'vizyon', 'netlik', 'ruh eşi'],
      context: 'Hayaller ruh eşliğini büyütür, netlik bağın temelini kurar.',
      group: 'Kupalar',
    },
    {
      id: 'eight_of_cups_cu_pos5',
      card: 'Eight of Cups',
      position: 5,
      upright:
        'Kupa Sekizlisi, ruh eşini bulmak için eski bağları geride bırakma ihtiyacını gösterir. Daha derin bir hakikate yöneliş vardır.',
      reversed:
        'Ters Kupa Sekizlisi, gitmek-kalmak ikilemi ruh eşi bağının önünü kapatabilir. Net karar bu bağı açığa çıkarır.',
      keywords: ['ayrılış', 'yolculuk', 'hakikat', 'karar', 'ruh eşi'],
      context: 'Yeni hakikat arayışı ruh eşini görünür kılar.',
      group: 'Kupalar',
    },
    {
      id: 'nine_of_cups_cu_pos5',
      card: 'Nine of Cups',
      position: 5,
      upright:
        'Kupa Dokuzlusu, kişisel doyum ve mutluluğun ruh eşini çekme gücünü artırdığını gösterir. Tatmin olmuş bir kalp ruh eşi bağına açıktır.',
      reversed:
        'Ters Kupa Dokuzlusu, yüzeysel hazların peşinde koşmak ruh eşi bağına engel olabilir.',
      keywords: ['tatmin', 'haz', 'mutluluk', 'doyum', 'ruh eşi'],
      context: 'Tatmin ruh eşliğini çeker, yüzeysellik gölge yaratır.',
      group: 'Kupalar',
    },
    {
      id: 'ten_of_cups_cu_pos5',
      card: 'Ten of Cups',
      position: 5,
      upright:
        'Kupa Onlusu, ruh eşi bağının en güçlü göstergelerindendir. Aile, birlik ve kalıcı mutluluk bu bağda mümkündür.',
      reversed:
        'Ters Kupa Onlusu, ideal ile gerçeklik arasındaki fark ruh eşi bağını zorlayabilir. Ancak sahicilik bağın gücünü korur.',
      keywords: ['mutluluk', 'aile', 'birlik', 'uyum', 'ruh eşi'],
      context: 'Birlik ve uyum ruh eşliğini işaret eder.',
      group: 'Kupalar',
    },
    {
      id: 'page_of_cups_cu_pos5',
      card: 'Page of Cups',
      position: 5,
      upright:
        'Kupa Prensi, masum duygular ve ilham verici bir başlangıç ruh eşi bağlantısının ilk kıvılcımı olabilir.',
      reversed:
        'Ters Kupa Prensi, aşırı hayalcilik ruh eşi bağını zorlaştırabilir. Duyguları dengelemek gerekir.',
      keywords: ['masumiyet', 'ilham', 'başlangıç', 'hayal', 'ruh eşi'],
      context: 'Masumiyet ruh eşliği ihtimalini artırır.',
      group: 'Kupalar',
    },
    {
      id: 'knight_of_cups_cu_pos5',
      card: 'Knight of Cups',
      position: 5,
      upright:
        'Kupa Şövalyesi, romantik ve kalpten gelen bir teklif ruh eşi bağına işaret eder. Bu kişi duygularını zarafetle ifade edebilir.',
      reversed:
        'Ters Kupa Şövalyesi, abartılı romantizm veya tutarsız vaatler ruh eşi bağını gölgeleyebilir.',
      keywords: ['romantizm', 'teklif', 'vizyon', 'duygu', 'ruh eşi'],
      context: 'Romantik yaklaşım ruh eşliğini işaret eder.',
      group: 'Kupalar',
    },
    {
      id: 'queen_of_cups_cu_pos5',
      card: 'Queen of Cups',
      position: 5,
      upright:
        'Kupa Kraliçesi, derin empati ve şefkat ruh eşi bağının kalbini oluşturur. Bu bağ duygusal olgunluk üzerine kuruludur.',
      reversed:
        'Ters Kupa Kraliçesi, duygusal bağımlılık veya sınır sorunları ruh eşi bağını zorlaştırabilir.',
      keywords: ['empati', 'şefkat', 'olgunluk', 'sınır', 'ruh eşi'],
      context: 'Şefkat ruh eşliğini besler, bağımlılık bağı sınar.',
      group: 'Kupalar',
    },
    {
      id: 'king_of_cups_cu_pos5',
      card: 'King of Cups',
      position: 5,
      upright:
        'Kupa Kralı, duygusal olgunluk ve sakin liderlik ruh eşi bağını işaret eder. Fırtınalı zamanlarda bile bu kişi güven verir.',
      reversed:
        'Ters Kupa Kralı, duyguların bastırılması veya pasif agresif tutum ruh eşi bağını gölgeleyebilir.',
      keywords: ['olgunluk', 'güven', 'liderlik', 'denge', 'ruh eşi'],
      context: 'Olgunluk ruh eşliğini işaret eder, bastırılmış duygu bağı sınar.',
      group: 'Kupalar',
    },

  // --- Kılıçlar Serisi ---
  
    {
      id: 'ace_of_swords_sw_pos5',
      card: 'Ace of Swords',
      position: 5,
      upright:
        'Kılıç Ası, ruh eşiyle bağın netlik ve hakikat üzerine kurulabileceğini söyler. Bu bağda dürüstlük ve açık iletişim en büyük güçtür.',
      reversed:
        'Ters Kılıç Ası, yanlış anlamalar veya dürüstlükten kaçış ruh eşi bağını gölgeleyebilir. Hakikat saklanmamalıdır.',
      keywords: ['hakikat', 'netlik', 'dürüstlük', 'bağ', 'ruh eşi'],
      context: 'Hakikat ruh eşliğini güçlendirir, yanlış anlamalar bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'two_of_swords_sw_pos5',
      card: 'Two of Swords',
      position: 5,
      upright:
        'Kılıç İkilisi, ruh eşini kabul etmek için kalp ile akıl arasında bir karar verme ihtiyacını gösterir.',
      reversed:
        'Ters Kılıç İkilisi, kararsızlığın bitmesiyle ruh eşi bağına dair netlik ortaya çıkar.',
      keywords: ['karar', 'denge', 'ikilem', 'seçim', 'ruh eşi'],
      context: 'Karar vermek ruh eşliğini netleştirir.',
      group: 'Kılıçlar',
    },
    {
      id: 'three_of_swords_sw_pos5',
      card: 'Three of Swords',
      position: 5,
      upright:
        'Kılıç Üçlüsü, kalp kırıklıklarının ardından ruh eşi bağlantısının şifalı olabileceğini söyler.',
      reversed:
        'Ters Kılıç Üçlüsü, acının ardından iyileşme ruh eşi bağının önünü açar.',
      keywords: ['kalp kırıklığı', 'iyileşme', 'aşk', 'deneyim', 'ruh eşi'],
      context: 'Kalp kırıklığı şifayla ruh eşliğini açar.',
      group: 'Kılıçlar',
    },
    {
      id: 'four_of_swords_sw_pos5',
      card: 'Four of Swords',
      position: 5,
      upright:
        'Kılıç Dörtlüsü, dinlenme ve içe çekilme süreci ruh eşi bağlantısını hazırlayabilir.',
      reversed:
        'Ters Kılıç Dörtlüsü, fazla geri çekilmek ruh eşi bağını zorlaştırabilir. Denge gereklidir.',
      keywords: ['dinlenme', 'içe dönüş', 'hazırlık', 'denge', 'ruh eşi'],
      context: 'İçe dönüş ruh eşliğine hazırlık sağlar.',
      group: 'Kılıçlar',
    },
    {
      id: 'five_of_swords_sw_pos5',
      card: 'Five of Swords',
      position: 5,
      upright:
        'Kılıç Beşlisi, ego savaşlarının ruh eşi bağını gölgeleyebileceğini gösterir. Gerçek bağ zaferden değil anlayıştan doğar.',
      reversed:
        'Ters Kılıç Beşlisi, çatışmaların sona ermesiyle ruh eşi potansiyeli ortaya çıkabilir.',
      keywords: ['çatışma', 'ego', 'barış', 'öğrenme', 'ruh eşi'],
      context: 'Ego gölge yaratır, barış ruh eşliğini açar.',
      group: 'Kılıçlar',
    },
    {
      id: 'six_of_swords_sw_pos5',
      card: 'Six of Swords',
      position: 5,
      upright:
        'Kılıç Altılısı, ruh eşi bağının zorlu dönemlerden sonra sakin bir yolculukla bulunabileceğini gösterir.',
      reversed:
        'Ters Kılıç Altılısı, geçmişe tutunmak ruh eşi bağını engelleyebilir.',
      keywords: ['yolculuk', 'geçiş', 'şifa', 'ilerleme', 'ruh eşi'],
      context: 'Sakin geçiş ruh eşliğini besler.',
      group: 'Kılıçlar',
    },
    {
      id: 'seven_of_swords_sw_pos5',
      card: 'Seven of Swords',
      position: 5,
      upright:
        'Kılıç Yedilisi, gizlilik veya yarım gerçekler ruh eşi bağını zorlaştırabilir. Şeffaflık temel koşuldur.',
      reversed:
        'Ters Kılıç Yedilisi, gerçeğin ortaya çıkışıyla ruh eşi bağının temeli güçlenebilir.',
      keywords: ['gizlilik', 'gerçek', 'dürüstlük', 'bağ', 'ruh eşi'],
      context: 'Şeffaflık ruh eşliği için şarttır.',
      group: 'Kılıçlar',
    },
    {
      id: 'eight_of_swords_sw_pos5',
      card: 'Eight of Swords',
      position: 5,
      upright:
        'Kılıç Sekizlisi, kendi korkularının ruh eşi bağını görmeni engelleyebileceğini gösterir.',
      reversed:
        'Ters Kılıç Sekizlisi, özgürleşme ve farkındalıkla ruh eşi bağı görünür hale gelir.',
      keywords: ['korku', 'özgürlük', 'farkındalık', 'engel', 'ruh eşi'],
      context: 'Korkular gölge yaratır, farkındalık bağı açar.',
      group: 'Kılıçlar',
    },
    {
      id: 'nine_of_swords_sw_pos5',
      card: 'Nine of Swords',
      position: 5,
      upright:
        'Kılıç Dokuzlusu, kaygı ve endişelerin ruh eşi bağını gölgeleyebileceğini söyler.',
      reversed:
        'Ters Kılıç Dokuzlusu, kaygılardan kurtulmak ruh eşi bağlantısına alan açar.',
      keywords: ['kaygı', 'endişe', 'şifa', 'umut', 'ruh eşi'],
      context: 'Kaygı ruh eşliğini zorlar, umut bağı güçlendirir.',
      group: 'Kılıçlar',
    },
    {
      id: 'ten_of_swords_sw_pos5',
      card: 'Ten of Swords',
      position: 5,
      upright:
        'Kılıç Onlusu, biten bir döngüden sonra ruh eşi bağının doğabileceğini söyler. Bitiş, yeni bir başlangıçtır.',
      reversed:
        'Ters Kılıç Onlusu, toparlanma süreci ruh eşi bağını açığa çıkarabilir.',
      keywords: ['bitiş', 'yeniden doğuş', 'şifa', 'başlangıç', 'ruh eşi'],
      context: 'Bitişler ruh eşliğine alan açar.',
      group: 'Kılıçlar',
    },
    {
      id: 'page_of_swords_sw_pos5',
      card: 'Page of Swords',
      position: 5,
      upright:
        'Kılıç Prensi, merak ve öğrenme isteği ruh eşi bağını tanımana yardımcı olabilir.',
      reversed:
        'Ters Kılıç Prensi, dedikodu veya yanlış bilgi ruh eşi bağını gölgeleyebilir.',
      keywords: ['merak', 'öğrenme', 'iletişim', 'gerçek', 'ruh eşi'],
      context: 'Merak bağı güçlendirir, yanlış bilgi gölge yaratır.',
      group: 'Kılıçlar',
    },
    {
      id: 'knight_of_swords_sw_pos5',
      card: 'Knight of Swords',
      position: 5,
      upright:
        'Kılıç Şövalyesi, cesur bir iletişim ruh eşi bağını tetikleyebilir.',
      reversed:
        'Ters Kılıç Şövalyesi, aceleci tavırlar ruh eşi bağını zorlayabilir.',
      keywords: ['cesaret', 'iletişim', 'hız', 'dürüstlük', 'ruh eşi'],
      context: 'Cesaret ruh eşliğini açar, acele gölge yaratır.',
      group: 'Kılıçlar',
    },
    {
      id: 'queen_of_swords_sw_pos5',
      card: 'Queen of Swords',
      position: 5,
      upright:
        'Kılıç Kraliçesi, ruh eşi bağının netlik ve dürüstlükle kurulabileceğini gösterir. Sezgi ve mantık dengesi önemlidir.',
      reversed:
        'Ters Kılıç Kraliçesi, aşırı eleştirellik ruh eşi bağını zorlayabilir.',
      keywords: ['dürüstlük', 'netlik', 'sezgi', 'mantık', 'ruh eşi'],
      context: 'Netlik ruh eşliğini güçlendirir, eleştiri bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'king_of_swords_sw_pos5',
      card: 'King of Swords',
      position: 5,
      upright:
        'Kılıç Kralı, mantık ve etik değerlere dayalı bir ruh eşi bağını işaret eder.',
      reversed:
        'Ters Kılıç Kralı, katı kurallar veya empati eksikliği ruh eşi bağını zorlaştırabilir.',
      keywords: ['etik', 'mantık', 'adalet', 'dürüstlük', 'ruh eşi'],
      context: 'Etik ve mantık ruh eşliğini destekler.',
      group: 'Kılıçlar',
    },
  // --- Tılsımlar Serisi ---//
    {
      id: 'ace_of_pentacles_pe_pos5',
      card: 'Ace of Pentacles',
      position: 5,
      upright:
        'Tılsım Ası, ruh eşiyle bağın somut, güvenli ve uzun vadeli bir temel üzerine kurulabileceğini söyler. Bu birlik gerçek dünyada kalıcı bir başlangıç işaretidir.',
      reversed:
        'Ters Tılsım Ası, fırsatların kaçırılması veya güvensizlik ruh eşi bağını zorlaştırabilir. İlişkiyi sağlamlaştırmak için daha fazla çaba gerekebilir.',
      keywords: ['başlangıç', 'güven', 'temel', 'bolluk', 'ruh eşi'],
      context: 'Güvenli başlangıç ruh eşliğini destekler.',
      group: 'Tılsımlar',
    },
    {
      id: 'two_of_pentacles_pe_pos5',
      card: 'Two of Pentacles',
      position: 5,
      upright:
        'Tılsım İkilisi, ruh eşi bağında denge ve uyum ihtiyacını vurgular. Hayatın farklı alanlarını birlikte yönetmek ilişkiyi güçlendirir.',
      reversed:
        'Ters Tılsım İkilisi, dengesizlik veya sorumluluk karmaşası ruh eşi bağını zorlayabilir.',
      keywords: ['denge', 'uyum', 'sorumluluk', 'akış', 'ruh eşi'],
      context: 'Denge ruh eşliği için gereklidir.',
      group: 'Tılsımlar',
    },
    {
      id: 'three_of_pentacles_pe_pos5',
      card: 'Three of Pentacles',
      position: 5,
      upright:
        'Tılsım Üçlüsü, ruh eşi bağının işbirliği ve ortak emekle kurulabileceğini söyler. Paylaşılan hedefler bağı güçlendirir.',
      reversed:
        'Ters Tılsım Üçlüsü, iletişim eksikliği veya uyumsuz işbirliği ruh eşi bağını zorlaştırabilir.',
      keywords: ['işbirliği', 'emek', 'paylaşım', 'hedef', 'ruh eşi'],
      context: 'İşbirliği ruh eşliğini derinleştirir.',
      group: 'Tılsımlar',
    },
    {
      id: 'four_of_pentacles_pe_pos5',
      card: 'Four of Pentacles',
      position: 5,
      upright:
        'Tılsım Dörtlüsü, ruh eşi bağında güvenliği koruma ve sahiplenme isteğini gösterir. Sınırlarla birlikte denge önemlidir.',
      reversed:
        'Ters Tılsım Dörtlüsü, aşırı kontrol veya korku ruh eşi bağını gölgeleyebilir.',
      keywords: ['güvenlik', 'sahiplenme', 'kontrol', 'denge', 'ruh eşi'],
      context: 'Güven önemlidir ama aşırı sahiplenme bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'five_of_pentacles_pe_pos5',
      card: 'Five of Pentacles',
      position: 5,
      upright:
        'Tılsım Beşlisi, zor zamanlarda ruh eşi bağının dayanışma ve destekle güçleneceğini söyler.',
      reversed:
        'Ters Tılsım Beşlisi, yalnızlık hissi veya destek eksikliği ruh eşi bağını zorlayabilir.',
      keywords: ['destek', 'dayanışma', 'zorluk', 'birlik', 'ruh eşi'],
      context: 'Destek ruh eşliği için şifadır.',
      group: 'Tılsımlar',
    },
    {
      id: 'six_of_pentacles_pe_pos5',
      card: 'Six of Pentacles',
      position: 5,
      upright:
        'Tılsım Altılısı, ruh eşi bağında adil paylaşım ve karşılıklılık olacağını gösterir.',
      reversed:
        'Ters Tılsım Altılısı, güç dengesizliği veya karşılıksız emek bağı zorlayabilir.',
      keywords: ['paylaşım', 'adalet', 'denge', 'karşılıklılık', 'ruh eşi'],
      context: 'Adil paylaşım bağı güçlendirir.',
      group: 'Tılsımlar',
    },
    {
      id: 'seven_of_pentacles_pe_pos5',
      card: 'Seven of Pentacles',
      position: 5,
      upright:
        'Tılsım Yedilisi, ruh eşi bağı için sabır ve uzun vadeli emek gerektiğini söyler.',
      reversed:
        'Ters Tılsım Yedilisi, sabırsızlık veya yanlış yatırım bağı zorlayabilir.',
      keywords: ['sabır', 'emek', 'zaman', 'değerlendirme', 'ruh eşi'],
      context: 'Sabır ve emek ruh eşliğini büyütür.',
      group: 'Tılsımlar',
    },
    {
      id: 'eight_of_pentacles_pe_pos5',
      card: 'Eight of Pentacles',
      position: 5,
      upright:
        'Tılsım Sekizlisi, ruh eşi bağının sürekli gelişim ve öğrenme üzerine kurulabileceğini söyler.',
      reversed:
        'Ters Tılsım Sekizlisi, özensizlik veya gelişime kapalı olmak bağı gölgeleyebilir.',
      keywords: ['öğrenme', 'gelişim', 'çaba', 'ustalık', 'ruh eşi'],
      context: 'Sürekli gelişim bağı güçlendirir.',
      group: 'Tılsımlar',
    },
    {
      id: 'nine_of_pentacles_pe_pos5',
      card: 'Nine of Pentacles',
      position: 5,
      upright:
        'Tılsım Dokuzlusu, ruh eşi bağında bireysel özgürlük ve öz-değerin korunması gerektiğini söyler.',
      reversed:
        'Ters Tılsım Dokuzlusu, aşırı bağımlılık ruh eşi bağını zorlaştırabilir.',
      keywords: ['özgürlük', 'öz-değer', 'bağımsızlık', 'denge', 'ruh eşi'],
      context: 'Öz-değer ruh eşliğini destekler.',
      group: 'Tılsımlar',
    },
    {
      id: 'ten_of_pentacles_pe_pos5',
      card: 'Ten of Pentacles',
      position: 5,
      upright:
        'Tılsım Onlusu, ruh eşi bağının uzun vadeli istikrar ve aile temeli üzerine kurulabileceğini gösterir.',
      reversed:
        'Ters Tılsım Onlusu, aile veya maddi konularda uyumsuzluk bağı zorlayabilir.',
      keywords: ['istikrar', 'aile', 'maddi güven', 'kalıcılık', 'ruh eşi'],
      context: 'Aile ve istikrar ruh eşliğini destekler.',
      group: 'Tılsımlar',
    },
    {
      id: 'page_of_pentacles_pe_pos5',
      card: 'Page of Pentacles',
      position: 5,
      upright:
        'Tılsım Prensi, ruh eşi bağı için öğrenme ve birlikte yeni şeyler deneme heyecanını gösterir.',
      reversed:
        'Ters Tılsım Prensi, odak eksikliği veya erteleme bağı gölgeleyebilir.',
      keywords: ['öğrenme', 'merak', 'başlangıç', 'deneyim', 'ruh eşi'],
      context: 'Merak bağı canlandırır.',
      group: 'Tılsımlar',
    },
    {
      id: 'knight_of_pentacles_pe_pos5',
      card: 'Knight of Pentacles',
      position: 5,
      upright:
        'Tılsım Şövalyesi, ruh eşi bağının sabır, güven ve istikrar üzerine kurulacağını söyler.',
      reversed:
        'Ters Tılsım Şövalyesi, durağanlık veya aşırı temkinlilik bağı zorlayabilir.',
      keywords: ['istikrar', 'güven', 'sabır', 'sorumluluk', 'ruh eşi'],
      context: 'Sabır ruh eşliğini besler.',
      group: 'Tılsımlar',
    },
    {
      id: 'queen_of_pentacles_pe_pos5',
      card: 'Queen of Pentacles',
      position: 5,
      upright:
        'Tılsım Kraliçesi, ruh eşi bağında şefkat, destek ve pratik güven duygusu hâkimdir.',
      reversed:
        'Ters Tılsım Kraliçesi, özverinin tükenmeye dönüşmesi bağı zorlayabilir.',
      keywords: ['şefkat', 'pratiklik', 'destek', 'denge', 'ruh eşi'],
      context: 'Şefkat ruh eşliğini büyütür.',
      group: 'Tılsımlar',
    },
    {
      id: 'king_of_pentacles_pe_pos5',
      card: 'King of Pentacles',
      position: 5,
      upright:
        'Tılsım Kralı, ruh eşi bağının güven, istikrar ve güçlü bir temel üzerine kurulabileceğini gösterir.',
      reversed:
        'Ters Tılsım Kralı, aşırı kontrol veya statü odaklılık bağı gölgeleyebilir.',
      keywords: ['güven', 'istikrar', 'liderlik', 'kalıcılık', 'ruh eşi'],
      context: 'Güven ve istikrar ruh eşliğini destekler.',
      group: 'Tılsımlar',
    },
    //--- Asalar Serisi ---
    
      {
        id: 'ace_of_wands_ma_pos5',
        card: 'Ace of Wands',
        position: 5,
        upright:
          'Asaların Ası, yeni bir başlangıcın kıvılcımını taşır. Bu kişiyle tanışmak, ruhunu ateşleyen güçlü bir çekim ve ilham yaratabilir. İçgüdüsel bir “evet” hissi verir.',
        reversed:
          'Ters Asaların Ası, kıvılcımın çabuk sönmesi ya da yanlış zamanda buluşmayı anlatır. Ruh eşliği enerjisi oradadır ama tam olarak açığa çıkmamış olabilir.',
        keywords: ['başlangıç', 'ilham', 'çekim', 'kıvılcım', 'ruh bağı'],
        context: 'Yeni ruh eşi ihtimali güçlü; ancak zamanlama kritik.',
        group: 'Asalar',
      },
      {
        id: 'two_of_wands_ma_pos5',
        card: 'Two of Wands',
        position: 5,
        upright:
          'Asaların İkilisi, geleceğe dair vizyon ve ortak planlama enerjisi taşır. Bu kişi ruh eşi olma potansiyeliyle hayat ufkunu genişletebilir.',
        reversed:
          'Ters Asaların İkilisi, belirsizlik veya ortak yön eksikliğini anlatır. Ruh eşliği ihtimali var ama kararlar netleşmeden uyum sağlanamayabilir.',
        keywords: ['vizyon', 'ortak yol', 'potansiyel', 'planlama', 'ruh bağı'],
        context: 'Ortak vizyon uyum getirir; kararsızlık ruh bağını zayıflatır.',
        group: 'Asalar',
      },
      {
        id: 'three_of_wands_ma_pos5',
        card: 'Three of Wands',
        position: 5,
        upright:
          'Asaların Üçlüsü, uzak ufuklara açılan bir yolculuğu simgeler. Bu kişi ruh eşin olabilir; birlikte büyüme ve keşif enerjisi taşıyorsunuz.',
        reversed:
          'Ters Asaların Üçlüsü, beklentilerin karşılanmaması ya da yanlış yönlere odaklanmayı anlatır. Ruh eşliği ihtimali olsa da mesafeler veya zamanlama engelleyebilir.',
        keywords: ['ufuk', 'yolculuk', 'gelişim', 'ortaklık', 'ruh bağı'],
        context: 'Büyüme isteği ruh eşliği için kapı açar.',
        group: 'Asalar',
      },
      {
        id: 'four_of_wands_ma_pos5',
        card: 'Four of Wands',
        position: 5,
        upright:
          'Asaların Dörtlüsü, kutlama, birlik ve köklenmeyi anlatır. Bu kişi ruh eşin olabilir; ilişkiniz kalıcı mutluluk getirebilir.',
        reversed:
          'Ters Asaların Dörtlüsü, köklenme eksikliği ya da dengesizliği işaret eder. Ruh eşliği olsa bile sağlam temellere ihtiyaç vardır.',
        keywords: ['kutlama', 'birlik', 'istikrar', 'mutluluk', 'ruh bağı'],
        context: 'Kalıcı mutluluk ruh eşliği ihtimalini güçlendiriyor.',
        group: 'Asalar',
      },
      {
        id: 'five_of_wands_ma_pos5',
        card: 'Five of Wands',
        position: 5,
        upright:
          'Asaların Beşlisi, ufak çatışmaların aslında büyüme fırsatı olduğunu gösterir. Ruh eşi enerjisi, farklılıkların uyuma dönüştürülmesiyle açığa çıkabilir.',
        reversed:
          'Ters Asaların Beşlisi, gereksiz çekişmelerin ilişkiyi zorlayabileceğini anlatır. Ruh eşliği ihtimali olsa da sabır ve anlayış gerekir.',
        keywords: ['çatışma', 'öğrenme', 'uyum', 'enerji', 'ruh bağı'],
        context: 'Farklılıklar sınavdır; uyum sağlanırsa ruh bağı derinleşir.',
        group: 'Asalar',
      },
      {
        id: 'six_of_wands_ma_pos5',
        card: 'Six of Wands',
        position: 5,
        upright:
          'Asaların Altılısı, başarı ve tanınmayı simgeler. Bu kişi ruh eşin olabilir; beraber gurur duyulacak bir ilişki yaratabilirsiniz.',
        reversed:
          'Ters Asaların Altılısı, dış onay beklentisinin gölgeye dönüşmesini anlatır. Ruh eşliği enerjisi için içsel güven şarttır.',
        keywords: ['başarı', 'zafer', 'gurur', 'güven', 'ruh bağı'],
        context: 'Ortak başarılar ruh eşliği ihtimalini besliyor.',
        group: 'Asalar',
      },
      {
        id: 'seven_of_wands_ma_pos5',
        card: 'Seven of Wands',
        position: 5,
        upright:
          'Asaların Yedilisi, inançlarını savunmayı ve sınır çizmeyi gösterir. Ruh eşinle güçlü bir bağ için bu süreçten geçmeniz gerekebilir.',
        reversed:
          'Ters Asaların Yedilisi, yorgunluk ya da direnç kaybını işaret eder. Ruh eşliği potansiyeli olsa da kararlılık zayıflayabilir.',
        keywords: ['savunma', 'inanç', 'sınır', 'direnç', 'ruh bağı'],
        context: 'Sınavlardan geçen bağ, ruh eşliği için güçlenir.',
        group: 'Asalar',
      },
      {
        id: 'eight_of_wands_ma_pos5',
        card: 'Eight of Wands',
        position: 5,
        upright:
          'Asaların Sekizlisi, hızlı gelişmeler ve akışta ilerlemeyi gösterir. Bu kişi ruh eşin olabilir; tanışmanız kader gibi hızla gerçekleşebilir.',
        reversed:
          'Ters Asaların Sekizlisi, gecikmeler ya da iletişimde karışıklıkları anlatır. Ruh eşliği enerjisi var ama sabır gerekebilir.',
        keywords: ['hız', 'akış', 'iletişim', 'kader', 'ruh bağı'],
        context: 'Hızlı akış, ruh eşliğine işaret edebilir.',
        group: 'Asalar',
      },
      {
        id: 'nine_of_wands_ma_pos5',
        card: 'Nine of Wands',
        position: 5,
        upright:
          'Asaların Dokuzlusu, direnç ve sebatı simgeler. Ruh eşi enerjisi sınavlardan sonra daha net ortaya çıkabilir.',
        reversed:
          'Ters Asaların Dokuzlusu, yılgınlık ya da duvar örmeyi anlatır. Ruh eşliği ihtimali olsa da kalp duvarları yumuşatılmalıdır.',
        keywords: ['direnç', 'sabır', 'sınav', 'dayanıklılık', 'ruh bağı'],
        context: 'Sabrın ardından ruh eşliği ihtimali belirir.',
        group: 'Asalar',
      },
      {
        id: 'ten_of_wands_ma_pos5',
        card: 'Ten of Wands',
        position: 5,
        upright:
          'Asaların Onlusu, yük ve sorumluluk taşımayı anlatır. Ruh eşinle bağ, yükleri paylaşarak güçlenebilir.',
        reversed:
          'Ters Asaların Onlusu, aşırı sorumluluğun bağı zorladığını gösterir. Ruh eşliği için yükleri hafifletmek gerekir.',
        keywords: ['sorumluluk', 'yük', 'dayanışma', 'emek', 'ruh bağı'],
        context: 'Paylaşılan emek ruh bağını derinleştirir.',
        group: 'Asalar',
      },
      {
        id: 'page_of_wands_ma_pos5',
        card: 'Page of Wands',
        position: 5,
        upright:
          'Asaların Prensi, keşif ruhunu ve yeni başlangıç heyecanını simgeler. Bu kişi ruh eşin olabilir; maceracı bir bağ kurabilirsiniz.',
        reversed:
          'Ters Asaların Prensi, sabırsızlık ya da dağınıklığı anlatır. Ruh eşliği potansiyeli için daha çok istikrar gerekir.',
        keywords: ['keşif', 'merak', 'başlangıç', 'maceracı ruh', 'ruh bağı'],
        context: 'Maceracı enerji ruh eşliği ihtimalini tetikliyor.',
        group: 'Asalar',
      },
      {
        id: 'knight_of_wands_ma_pos5',
        card: 'Knight of Wands',
        position: 5,
        upright:
          'Asaların Şövalyesi, tutku, cesaret ve hızla gelen bağları simgeler. Bu kişi ruh eşin olabilir; bağınız tutkulu bir şekilde gelişir.',
        reversed:
          'Ters Asaların Şövalyesi, dengesizlik veya kararsızlık getirebilir. Ruh eşliği ihtimali olsa da süreklilik konusunda dikkat gerekir.',
        keywords: ['tutku', 'cesaret', 'hareket', 'heyecan', 'ruh bağı'],
        context: 'Tutkulu başlangıç ruh eşliği ihtimalini gösteriyor.',
        group: 'Asalar',
      },
      {
        id: 'queen_of_wands_ma_pos5',
        card: 'Queen of Wands',
        position: 5,
        upright:
          'Asaların Kraliçesi, çekim gücü, özgüven ve ilhamı simgeler. Bu kişi ruh eşin olabilir; bağınız ilham verici bir birliktelik olabilir.',
        reversed:
          'Ters Asaların Kraliçesi, güvensizlik veya kıskançlık gölgesi taşıyabilir. Ruh eşliği enerjisi için özgüven dengesine ihtiyaç vardır.',
        keywords: ['çekim', 'özgüven', 'ilham', 'liderlik', 'ruh bağı'],
        context: 'Çekim ve ilham ruh eşliği bağını güçlendiriyor.',
        group: 'Asalar',
      },
      {
        id: 'king_of_wands_ma_pos5',
        card: 'King of Wands',
        position: 5,
        upright:
          'Asaların Kralı, vizyoner liderlik ve güçlü bir bağın göstergesidir. Bu kişi ruh eşin olabilir; birlikte büyük hedeflere yürüyebilirsiniz.',
        reversed:
          'Ters Asaların Kralı, aşırı ego veya otoriter tavır riskini anlatır. Ruh eşliği için karşılıklı saygı ve denge şarttır.',
        keywords: ['vizyon', 'liderlik', 'hedef', 'saygı', 'ruh bağı'],
        context: 'Ortak hedefler ruh eşliği bağını pekiştirir.',
        group: 'Asalar',
      },
];

/**
 * Belirli bir kart için pozisyon 5 anlamını getirir
 * @param card - Tarot kartı
 * @returns pozisyon 5 anlamı veya null
 */
  export function getNewLoverposition5Meaning(
  card: TarotCard
): NewLoverposition5Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position5Meanings.find(m => 
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
  meaning = position5Meanings.find(m => m.card === englishName);
  
  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 5 anlamını getirir
 * @param cardName - Kart ismi
 * @returns pozisyon 5 anlamı veya null
 */
export function getNewLoverposition5MeaningByCardName(
  cardName: string
): NewLoverposition5Meaning | null {
  return position5Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 5 anlamlarını getirir
 * @returns pozisyon 5 anlamları array'i
 */
export function getAllNewLoverposition5Meanings(): NewLoverposition5Meaning[] {
  return position5Meanings;
}

/**
 * Kart grubuna göre pozisyon 5 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getNewLoverposition5MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): NewLoverposition5Meaning[] {
  return position5Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
  export const useI18nposition5Meanings = (): I18nNewLoverposition5Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position5Meanings.map(meaning => {
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
export const getI18nposition5Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nNewLoverposition5Meaning | null => {
  const originalMeaning = position5Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `new-lover.meanings.${cardKey}.position5.upright`
  );
  const i18nReversed = t(
    `new-lover.meanings.${cardKey}.position5.reversed`
  );
  const i18nKeywords = t(
    `new-lover.meanings.${cardKey}.position5.keywords`
  );
  const i18nContext = t(
    `new-lover.meanings.${cardKey}.position5.context`
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
const newLoverposition5Exports = {
  position5Meanings,
  getNewLoverposition5Meaning,
  getNewLoverposition5MeaningByCardName,
  getAllNewLoverposition5Meanings,
  getNewLoverposition5MeaningsByGroup,
  getI18nposition5Meaning,
};

export default newLoverposition5Exports;
