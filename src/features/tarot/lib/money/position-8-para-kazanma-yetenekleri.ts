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

export interface MoneyPosition8Meaning {
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
export interface I18nMoneyPosition8Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position8Meanings: MoneyPosition8Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ma_pos8',
    card: 'The Fool',
    position: 8,
    upright:
      'Deli, para kazanma yeteneklerinde cesaret, yaratıcılık ve yenilikçi yolları denemeyi gösterir. Risk almaktan korkmadığında yeni gelir kapıları açılır.',
    reversed:
      'Ters Deli, aceleci ve düşüncesiz girişimlerin para kaybına yol açabileceğini işaret eder. Plansız risklerden uzak durmak gerekir.',
    keywords: ['cesaret', 'risk', 'yaratıcılık', 'yenilik', 'başlangıç'],
    context:
      'Para kazanma yeteneklerin yeni yollar denemekten ya da düşüncesiz risklerden etkilenebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos8',
    card: 'The Magician',
    position: 8,
    upright:
      'Büyücü, para kazanma konusunda becerilerini, iletişim gücünü ve yaratıcı zekanı kullanma yeteneğini gösterir. Elindeki kaynakları doğru yönlendirebilirsin.',
    reversed:
      'Ters Büyücü, manipülasyon, dağınıklık veya odak eksikliği nedeniyle yeteneklerini tam potansiyeliyle kullanamadığını işaret eder.',
    keywords: ['beceri', 'odak', 'yaratıcılık', 'iletişim', 'kaynak'],
    context:
      'Para kazanma yeteneklerin becerilerini kullanma ya da yanlış yönlendirme ile bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos8',
    card: 'The High Priestess',
    position: 8,
    upright:
      'Başrahibe, sezgi, gizli bilgi ve stratejik içgörüleri para kazanma konusunda güçlü bir kaynak haline getirir. İç sesine güvenmek büyük avantajdır.',
    reversed:
      'Ters Başrahibe, sezgini bastırma, kafa karışıklığı veya bilgiyi paylaşmama nedeniyle fırsatların kaçabileceğini gösterir.',
    keywords: ['sezgi', 'bilgi', 'içgörü', 'strateji', 'gizlilik'],
    context:
      'Para kazanma yeteneklerin sezgini kullanma ya da görmezden gelme ile bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos8',
    card: 'The Empress',
    position: 8,
    upright:
      'İmparatoriçe, yaratıcılık, üretkenlik ve kaynakları çoğaltma yeteneğini gösterir. Para kazanma becerilerin bolluk ve bereket enerjisiyle desteklenir.',
    reversed:
      'Ters İmparatoriçe, aşırı bağımlılık, özensizlik veya verimsizlik nedeniyle maddi fırsatların zayıflayabileceğini işaret eder.',
    keywords: ['yaratıcılık', 'bolluk', 'bereket', 'üretim', 'kaynak'],
    context:
      'Para kazanma yeteneklerin üretkenlik ya da verimsizlik üzerinden gelişir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos8',
    card: 'The Emperor',
    position: 8,
    upright:
      'İmparator, disiplin, planlama ve düzen sayesinde para kazanma becerilerini güçlendirdiğini gösterir. Stratejik kararlar başarı getirir.',
    reversed:
      'Ters İmparator, aşırı katılık, otoriterlik veya esneksizlik nedeniyle fırsatların daralabileceğini işaret eder.',
    keywords: ['düzen', 'planlama', 'disiplin', 'otorite', 'istikrar'],
    context:
      'Para kazanma yeteneklerin düzen ya da katılıkla doğrudan bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos8',
    card: 'The Hierophant',
    position: 8,
    upright:
      'Aziz, para kazanma becerilerinde geleneksel yöntemler, eğitim ve kurumlarla işbirliğinin önemini vurgular. Bilgi aktarımı güçlü bir kaynaktır.',
    reversed:
      'Ters Aziz, katı kurallara bağlılık ya da kör başkaldırı nedeniyle finansal yeteneklerin gelişiminin sekteye uğrayabileceğini gösterir.',
    keywords: ['gelenek', 'öğreti', 'eğitim', 'rehberlik', 'işbirliği'],
    context:
      'Para kazanma yeteneklerin geleneksel yöntemlerle ya da katı kurallarla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos8',
    card: 'The Lovers',
    position: 8,
    upright:
      'Aşıklar, işbirliği, ortaklık ve doğru seçimler sayesinde para kazanma becerilerinin artacağını gösterir. Değer uyumu başarı getirir.',
    reversed:
      'Ters Aşıklar, yanlış seçimler, kararsızlık veya değer çatışmaları nedeniyle finansal yeteneklerin tam kullanılmadığını işaret eder.',
    keywords: ['ortaklık', 'uyum', 'seçim', 'değer', 'bağlantı'],
    context:
      'Para kazanma yeteneklerin doğru seçimler ya da kararsızlıklarla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos8',
    card: 'The Chariot',
    position: 8,
    upright:
      'Savaş Arabası, kararlılık, irade gücü ve hedef odaklılık sayesinde para kazanma becerilerini geliştirdiğini gösterir.',
    reversed:
      'Ters Savaş Arabası, yön kaybı, disiplinsizlik veya kontrolsüzlük nedeniyle fırsatların zayıflayabileceğini işaret eder.',
    keywords: ['kararlılık', 'hedef', 'kontrol', 'ilerleme', 'disiplin'],
    context:
      'Para kazanma yeteneklerin disiplin ya da yön kaybıyla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos8',
    card: 'Strength',
    position: 8,
    upright:
      'Güç, sabır, şefkat ve öz disiplinle para kazanma becerilerinin desteklendiğini gösterir. Yumuşak güç uzun vadede başarı getirir.',
    reversed:
      'Ters Güç, sabırsızlık, özgüven eksikliği ya da kontrolsüz öfkenin yeteneklerini zayıflatabileceğini işaret eder.',
    keywords: ['özgüven', 'sabır', 'öz disiplin', 'şefkat', 'kararlılık'],
    context:
      'Para kazanma yeteneklerin sabır ya da sabırsızlıkla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos8',
    card: 'The Hermit',
    position: 8,
    upright:
      'Ermiş, içsel bilgelik, tecrübe ve yalnız çalışabilme becerisinin para kazanma yeteneklerini desteklediğini gösterir.',
    reversed:
      'Ters Ermiş, aşırı izolasyon, yalnızlık ya da başkalarından destek almama nedeniyle fırsatların kaçabileceğini işaret eder.',
    keywords: ['bilgelik', 'içe dönüş', 'tecrübe', 'bağımsızlık', 'rehberlik'],
    context:
      'Para kazanma yeteneklerin içsel bilgelik ya da izolasyonla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos8',
    card: 'The Wheel of Fortune',
    position: 8,
    upright:
      'Kader Çarkı, para kazanma becerilerinin değişim, döngüler ve şansla desteklendiğini gösterir. Fırsatlar doğru zamanda gelir.',
    reversed:
      'Ters Kader Çarkı, tekrar eden hatalar, kontrol dışı olaylar ya da şanssızlık nedeniyle finansal gelişimde zorlukları işaret eder.',
    keywords: ['döngü', 'şans', 'değişim', 'fırsat', 'zamanlama'],
    context:
      'Para kazanma yeteneklerin şans ya da tekrar eden hatalarla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos8',
    card: 'Justice',
    position: 8,
    upright:
      'Adalet, dürüstlük, şeffaflık ve etik davranışların para kazanma becerilerini desteklediğini gösterir.',
    reversed:
      'Ters Adalet, haksızlık, yalan ya da sorumluluk almama nedeniyle finansal becerilerin zayıflayabileceğini işaret eder.',
    keywords: ['adalet', 'etik', 'şeffaflık', 'denge', 'sorumluluk'],
    context:
      'Para kazanma yeteneklerin etik ya da etik dışı davranışlarla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos8',
    card: 'The Hanged Man',
    position: 8,
    upright:
      'Asılan Adam, para kazanma becerilerinin bakış açısı değiştirmek, sabır ve yeni yöntemler denemekle gelişeceğini gösterir.',
    reversed:
      'Ters Asılan Adam, atalete düşmek, fırsatları ertelemek veya gönülsüz fedakarlıkların mali gelişimi engelleyeceğini işaret eder.',
    keywords: ['perspektif', 'sabır', 'fedakarlık', 'yöntem', 'atalet'],
    context:
      'Para kazanma yeteneklerin yeni bakış açıları ya da atalete düşmekle bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos8',
    card: 'Death',
    position: 8,
    upright:
      'Ölüm, para kazanma becerilerinin dönüşüm, eski alışkanlıkları bırakma ve yenilenmeyle güçleneceğini gösterir.',
    reversed:
      'Ters Ölüm, değişime direnç, kapanmamış dosyalar ya da eski yöntemlere tutunmak nedeniyle fırsatların kaçabileceğini işaret eder.',
    keywords: ['dönüşüm', 'bırakma', 'yenilenme', 'son', 'başlangıç'],
    context: 'Para kazanma yeteneklerin dönüşüm ya da dirençle bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos8',
    card: 'Temperance',
    position: 8,
    upright:
      'Denge, uyum, sabır ve ölçülülüğün para kazanma becerilerini desteklediğini gösterir.',
    reversed:
      'Ters Denge, aşırılık, sabırsızlık ya da dengesiz kararların mali gelişimi zayıflatabileceğini işaret eder.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'huzur'],
    context:
      'Para kazanma yeteneklerin denge ya da dengesizlikle bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos8',
    card: 'The Devil',
    position: 8,
    upright:
      'Şeytan, para kazanma becerilerinde tutku, bağlılık ve hırsın etkisini gösterir. Ancak bu bağ bazen bağımlılığa dönüşebilir.',
    reversed:
      'Ters Şeytan, zincirleri kırma, özgürleşme ve bağımlılıkları bırakma sayesinde mali yeteneklerin güçleneceğini işaret eder.',
    keywords: ['tutku', 'bağlılık', 'hırs', 'özgürlük', 'gölge'],
    context:
      'Para kazanma yeteneklerin tutkuyla bağlılık ya da özgürleşmeyle bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos8',
    card: 'The Tower',
    position: 8,
    upright:
      'Kule, ani farkındalıklar, krizler ve radikal değişimlerin para kazanma becerilerini dönüştüreceğini gösterir.',
    reversed:
      'Ters Kule, ertelenen krizler, bastırılmış öfke veya yıkımı kabullenmeme nedeniyle fırsatların zayıflayabileceğini işaret eder.',
    keywords: ['kriz', 'yıkım', 'farkındalık', 'değişim', 'yeniden doğuş'],
    context:
      'Para kazanma yeteneklerin krizleri fırsata çevirme ya da reddetme ile bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos8',
    card: 'The Star',
    position: 8,
    upright:
      'Yıldız, umut, ilham ve vizyonun para kazanma becerilerini desteklediğini gösterir.',
    reversed:
      'Ters Yıldız, umutsuzluk, vizyon kaybı ya da ilham eksikliğinin finansal gelişimini engelleyebileceğini işaret eder.',
    keywords: ['umut', 'ilham', 'vizyon', 'şifa', 'yenilenme'],
    context: 'Para kazanma yeteneklerin umut ya da umutsuzlukla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos8',
    card: 'The Moon',
    position: 8,
    upright:
      'Ay, para kazanma becerilerinde sezgi, yaratıcılık ve gizemli yolların etkili olabileceğini gösterir.',
    reversed:
      'Ters Ay, yanılsamalar, korkular ya da belirsizliklerin fırsatları gölgeleyebileceğini işaret eder.',
    keywords: ['sezgi', 'yaratıcılık', 'belirsizlik', 'gizem', 'hayal'],
    context:
      'Para kazanma yeteneklerin sezgi ya da yanılsamalarla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos8',
    card: 'The Sun',
    position: 8,
    upright:
      'Güneş, para kazanma becerilerinde neşe, açıklık ve başarıyı işaret eder. Çabaların görünür sonuç verir.',
    reversed:
      'Ters Güneş, sahte umutlar, aşırı iyimserlik ya da gizlenen sorunların fırsatları azaltabileceğini işaret eder.',
    keywords: ['başarı', 'açıklık', 'neşe', 'görünürlük', 'umut'],
    context:
      'Para kazanma yeteneklerin açıklık ya da sahte umutlarla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos8',
    card: 'Judgement',
    position: 8,
    upright:
      'Mahkeme, para kazanma becerilerinin geçmiş deneyimleri değerlendirme, öğrenme ve yeniden doğuşla güçleneceğini gösterir.',
    reversed:
      'Ters Mahkeme, geçmişe takılı kalma, aşırı öz eleştiri ya da karar verememenin mali gelişimi engelleyeceğini işaret eder.',
    keywords: ['yargı', 'yenilenme', 'karar', 'öğrenme', 'özgürlük'],
    context:
      'Para kazanma yeteneklerin öğrenme ya da geçmişe takılı kalmakla bağlantılıdır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos8',
    card: 'The World',
    position: 8,
    upright:
      'Dünya, para kazanma becerilerinin bütünlük, global fırsatlar ve tamamlama enerjisiyle desteklendiğini gösterir.',
    reversed:
      'Ters Dünya, eksik kalan döngüler, tamamlanmamış projeler ya da bütünlüğü görememenin finansal becerilerini sınırlayabileceğini işaret eder.',
    keywords: ['tamamlanma', 'fırsat', 'bütünlük', 'başarı', 'global'],
    context:
      'Para kazanma yeteneklerin bütünlük ya da eksiklikle bağlantılıdır.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_cu_pos8',
    card: 'Ace of Cups',
    position: 8,
    upright:
      'Kupa Ası, para kazanma yeteneklerinin yaratıcılık, ilham ve duygusal motivasyonla desteklendiğini gösterir. Sevdiğin işi yaparak kazanç sağlayabilirsin.',
    reversed:
      'Ters Kupa Ası, ilham eksikliği veya motivasyon kaybı nedeniyle para kazanma yeteneklerinin körelmiş olabileceğini işaret eder.',
    keywords: ['yaratıcılık', 'ilham', 'motivasyon', 'sevgi', 'başlangıç'],
    context:
      'Para kazanma yeteneklerin ilham bulmak ya da kaybetmekle bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cu_pos8',
    card: 'Two of Cups',
    position: 8,
    upright:
      'İki Kupa, işbirliği, ortaklık ve uyum sayesinde para kazanma becerilerinin geliştiğini gösterir.',
    reversed:
      'Ters İki Kupa, uyumsuz ortaklıklar veya iletişim sorunlarının finansal becerilerini zayıflatabileceğini işaret eder.',
    keywords: ['ortaklık', 'uyum', 'bağlantı', 'denge', 'işbirliği'],
    context:
      'Para kazanma yeteneklerin işbirliği ya da uyumsuzlukla bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cu_pos8',
    card: 'Three of Cups',
    position: 8,
    upright:
      'Üç Kupa, sosyal çevre, kutlamalar ve işbirliklerinin para kazanma becerilerini güçlendirdiğini gösterir.',
    reversed:
      'Ters Üç Kupa, yüzeysel bağlantılar ya da aşırı eğlence nedeniyle finansal odak zayıflayabilir.',
    keywords: ['topluluk', 'kutlama', 'destek', 'ağ', 'paylaşım'],
    context:
      'Para kazanma yeteneklerin sosyal çevre ya da yüzeysellikle bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cu_pos8',
    card: 'Four of Cups',
    position: 8,
    upright:
      'Dört Kupa, fırsatları görmezden gelme veya tatminsizlik nedeniyle yeteneklerinin tam kullanılmadığını gösterir.',
    reversed:
      'Ters Dört Kupa, yeni farkındalık ve şükran sayesinde finansal becerilerin yeniden güçlenebileceğini işaret eder.',
    keywords: [
      'tatminsizlik',
      'fırsat',
      'farkındalık',
      'motivasyon',
      'durgunluk',
    ],
    context:
      'Para kazanma yeteneklerin fırsatları görme ya da gözden kaçırmayla bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cu_pos8',
    card: 'Five of Cups',
    position: 8,
    upright:
      'Beş Kupa, geçmiş kayıplar ya da hayal kırıklıklarının para kazanma becerilerini gölgelediğini gösterir.',
    reversed:
      'Ters Beş Kupa, toparlanma, umut ve mevcut fırsatlara odaklanarak yeteneklerini yeniden aktive edebileceğini işaret eder.',
    keywords: ['kayıp', 'hayal kırıklığı', 'umut', 'fırsat', 'şifa'],
    context:
      'Para kazanma yeteneklerin kayıplara odaklanmak ya da toparlanmakla bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cu_pos8',
    card: 'Six of Cups',
    position: 8,
    upright:
      'Altı Kupa, geçmiş deneyimlerden öğrenmek ve nostaljik bağları kullanarak para kazanma becerilerini güçlendirdiğini gösterir.',
    reversed:
      'Ters Altı Kupa, geçmişe saplanıp kalmanın veya eski yöntemlere bağlı kalmanın gelişimini kısıtlayabileceğini işaret eder.',
    keywords: ['geçmiş', 'nostalji', 'deneyim', 'şefkat', 'öğrenme'],
    context:
      'Para kazanma yeteneklerin geçmişten öğrenmek ya da saplanmakla bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cu_pos8',
    card: 'Seven of Cups',
    position: 8,
    upright:
      'Yedi Kupa, çoklu seçenekler, hayaller ve vizyonların para kazanma becerilerini desteklediğini gösterir. Ancak net seçim önemlidir.',
    reversed:
      'Ters Yedi Kupa, hayallere kapılmak veya kararsızlık nedeniyle fırsatların boşa gidebileceğini işaret eder.',
    keywords: ['seçenek', 'hayal', 'vizyon', 'kararsızlık', 'netlik'],
    context:
      'Para kazanma yeteneklerin hayalleri netleştirmek ya da dağılmakla bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cu_pos8',
    card: 'Eight of Cups',
    position: 8,
    upright:
      'Sekiz Kupa, seni tatmin etmeyen işlerden veya projelerden ayrılarak daha anlamlı fırsatlara yönelme yeteneğini gösterir.',
    reversed:
      'Ters Sekiz Kupa, gitmek ya da kalmak arasındaki kararsızlık nedeniyle potansiyelini sınırlayabileceğini işaret eder.',
    keywords: ['ayrılış', 'anlam arayışı', 'yolculuk', 'cesaret', 'değişim'],
    context:
      'Para kazanma yeteneklerin anlam arayışı ya da kararsızlıkla bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cu_pos8',
    card: 'Nine of Cups',
    position: 8,
    upright:
      'Dokuz Kupa, kişisel tatmin, bolluk ve iç huzurun para kazanma becerilerini desteklediğini gösterir.',
    reversed:
      'Ters Dokuz Kupa, aşırı hazcılık veya yüzeysel doyum nedeniyle uzun vadeli başarıların risk altında olabileceğini işaret eder.',
    keywords: ['tatmin', 'bolluk', 'mutluluk', 'doyum', 'iç huzur'],
    context:
      'Para kazanma yeteneklerin doyum ya da yüzeysellikle bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cu_pos8',
    card: 'Ten of Cups',
    position: 8,
    upright:
      'On Kupa, aile, topluluk ve güçlü duygusal bağların para kazanma becerilerini desteklediğini gösterir.',
    reversed:
      'Ters On Kupa, uyumsuz ilişkiler veya ailevi sorunların finansal yeteneklerini kısıtlayabileceğini işaret eder.',
    keywords: ['aile', 'topluluk', 'uyum', 'bağlantı', 'huzur'],
    context: 'Para kazanma yeteneklerin uyum ya da uyumsuzlukla bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cu_pos8',
    card: 'Page of Cups',
    position: 8,
    upright:
      'Kupa Prensi, yaratıcılık, merak ve hayal gücünün para kazanma becerilerini desteklediğini gösterir.',
    reversed:
      'Ters Kupa Prensi, dikkatsizlik, hayalperestlik veya aşırı hassasiyet nedeniyle finansal becerilerin zayıflayabileceğini işaret eder.',
    keywords: ['yaratıcılık', 'hayal gücü', 'merak', 'ilham', 'hassasiyet'],
    context:
      'Para kazanma yeteneklerin yaratıcılık ya da dikkatsizlikle bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cu_pos8',
    card: 'Knight of Cups',
    position: 8,
    upright:
      'Kupa Şövalyesi, idealizm, zarafet ve ikna gücünün para kazanma becerilerini desteklediğini gösterir.',
    reversed:
      'Ters Kupa Şövalyesi, tutarsızlık, hayal kırıklığı veya gerçeklerden kopukluk nedeniyle becerilerinin zayıflayabileceğini işaret eder.',
    keywords: ['idealizm', 'ikna', 'zarafet', 'vizyon', 'tutarlılık'],
    context:
      'Para kazanma yeteneklerin idealizm ya da tutarsızlıkla bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cu_pos8',
    card: 'Queen of Cups',
    position: 8,
    upright:
      'Kupa Kraliçesi, empati, sezgi ve duygusal zekânın para kazanma becerilerini desteklediğini gösterir.',
    reversed:
      'Ters Kupa Kraliçesi, aşırı hassasiyet, duygusal bağımlılık veya öz sınır eksikliği nedeniyle fırsatların zayıflayabileceğini işaret eder.',
    keywords: ['empati', 'sezgi', 'duygusal zeka', 'hassasiyet', 'şefkat'],
    context:
      'Para kazanma yeteneklerin empati ya da aşırı hassasiyetle bağlantılıdır.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cu_pos8',
    card: 'King of Cups',
    position: 8,
    upright:
      'Kupa Kralı, duygusal denge, olgunluk ve diplomasi becerilerinin para kazanma yeteneklerini desteklediğini gösterir.',
    reversed:
      'Ters Kupa Kralı, pasiflik, bastırılmış duygular veya pasif-agresif tutumların finansal becerilerini zayıflatabileceğini işaret eder.',
    keywords: ['denge', 'olgunluk', 'diplomasi', 'duygu yönetimi', 'güven'],
    context:
      'Para kazanma yeteneklerin olgunluk ya da pasiflikle bağlantılıdır.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_sw_pos8',
    card: 'Ace of Swords',
    position: 8,
    upright:
      'Kılıç Ası, zihinsel netlik, keskin analiz ve doğru karar verme becerilerinin para kazanma yeteneklerini güçlendirdiğini gösterir.',
    reversed:
      'Ters Kılıç Ası, kafa karışıklığı, yanlış iletişim veya aşırı analiz nedeniyle fırsatların kaçabileceğini işaret eder.',
    keywords: ['netlik', 'karar', 'analiz', 'zihin', 'keskinlik'],
    context:
      'Para kazanma yeteneklerin zihinsel netlik ya da kafa karışıklığı ile bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sw_pos8',
    card: 'Two of Swords',
    position: 8,
    upright:
      'İki Kılıç, dengeli düşünce ve tarafsız karar verme becerisinin para kazanma yeteneklerini geliştirdiğini gösterir.',
    reversed:
      'Ters İki Kılıç, karar verememe, kararsızlık veya gerçeği görmezden gelme nedeniyle fırsatların kaçabileceğini işaret eder.',
    keywords: ['denge', 'karar', 'ikilem', 'tarafsızlık', 'netlik'],
    context:
      'Para kazanma yeteneklerin kararlılık ya da kararsızlıkla bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sw_pos8',
    card: 'Three of Swords',
    position: 8,
    upright:
      'Üç Kılıç, hayal kırıklığı ve zorluklardan öğrenilen derslerin finansal becerilerini güçlendirdiğini gösterir.',
    reversed:
      'Ters Üç Kılıç, geçmiş acılara saplanmak veya duygusal yaraların kararlarını etkilemesi nedeniyle fırsatların kaybolabileceğini işaret eder.',
    keywords: ['ders', 'hayal kırıklığı', 'tecrübe', 'zorluk', 'karar'],
    context:
      'Para kazanma yeteneklerin zorluklardan öğrenmek ya da geçmişte takılı kalmakla bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sw_pos8',
    card: 'Four of Swords',
    position: 8,
    upright:
      'Dört Kılıç, dinlenme, toparlanma ve zihinsel yenilenme sayesinde para kazanma becerilerinin geliştiğini gösterir.',
    reversed:
      'Ters Dört Kılıç, tükenmişlik, aşırı yorgunluk ve gerekli molaları almamaktan doğan finansal beceri kaybını işaret eder.',
    keywords: ['dinlenme', 'yenilenme', 'sükunet', 'denge', 'toparlanma'],
    context:
      'Para kazanma yeteneklerin yenilenme ya da tükenmişlikle bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sw_pos8',
    card: 'Five of Swords',
    position: 8,
    upright:
      'Beş Kılıç, rekabetten öğrenme ve stratejik hamleler yapma becerilerinin finansal kazanımını artırabileceğini gösterir.',
    reversed:
      'Ters Beş Kılıç, aşırı rekabet, hırs veya çıkar çatışmaları nedeniyle becerilerinin zayıflayabileceğini işaret eder.',
    keywords: ['rekabet', 'strateji', 'çatışma', 'ders', 'denge'],
    context: 'Para kazanma yeteneklerin strateji ya da hırsla bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sw_pos8',
    card: 'Six of Swords',
    position: 8,
    upright:
      'Altı Kılıç, sorunlardan uzaklaşma ve daha sakin koşullara yönelme becerinin finansal potansiyelini artırdığını gösterir.',
    reversed:
      'Ters Altı Kılıç, geçmiş sorunlara saplanıp kalma nedeniyle gelişim fırsatlarının kaçabileceğini işaret eder.',
    keywords: ['geçiş', 'iyileşme', 'ilerleme', 'denge', 'değişim'],
    context:
      'Para kazanma yeteneklerin ilerleme ya da geçmişte kalmakla bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sw_pos8',
    card: 'Seven of Swords',
    position: 8,
    upright:
      'Yedi Kılıç, zekâ, strateji ve fırsatları görünmez yollarla değerlendirme becerisinin finansal avantaj sağladığını gösterir.',
    reversed:
      'Ters Yedi Kılıç, dürüst olmayan yöntemler veya öz-aldatma nedeniyle becerilerinin zayıflayabileceğini işaret eder.',
    keywords: ['strateji', 'zeka', 'fırsat', 'gizlilik', 'dikkat'],
    context:
      'Para kazanma yeteneklerin strateji ya da dürüstlükle bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sw_pos8',
    card: 'Eight of Swords',
    position: 8,
    upright:
      'Sekiz Kılıç, zihinsel kısıtlamaların ve korkuların yeteneklerini sınırlandırdığını gösterir. Potansiyelin açığa çıkması için özgürleşme gerekir.',
    reversed:
      'Ters Sekiz Kılıç, zihinsel zincirlerden kurtulma ve özgüveni artırma yoluyla becerilerinin gelişebileceğini işaret eder.',
    keywords: ['kısıtlama', 'özgürleşme', 'korku', 'zihin', 'potansiyel'],
    context:
      'Para kazanma yeteneklerin korkulara teslim olmak ya da özgürleşmekle bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sw_pos8',
    card: 'Nine of Swords',
    position: 8,
    upright:
      'Dokuz Kılıç, kaygılar ve uykusuzlukların para kazanma becerilerini gölgeleyebileceğini gösterir.',
    reversed:
      'Ters Dokuz Kılıç, kaygılardan kurtulma ve sabah netliğiyle daha sağlıklı kararlar alma sayesinde becerilerinin gelişebileceğini işaret eder.',
    keywords: ['kaygı', 'uykusuzluk', 'korku', 'düşünce', 'denge'],
    context: 'Para kazanma yeteneklerin kaygı ya da netlikle bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sw_pos8',
    card: 'Ten of Swords',
    position: 8,
    upright:
      'On Kılıç, zorlu bir döngünün sona ermesiyle para kazanma yeteneklerinde yeni bir başlangıç yapabileceğini gösterir.',
    reversed:
      'Ters On Kılıç, eski yaraları geride bırakma ve yeniden yapılanma yoluyla becerilerinin güçlenebileceğini işaret eder.',
    keywords: ['bitiş', 'yenilenme', 'zorluk', 'denge', 'başlangıç'],
    context:
      'Para kazanma yeteneklerin bitişler ya da yeniden yapılanmayla bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sw_pos8',
    card: 'Page of Swords',
    position: 8,
    upright:
      'Kılıç Prensi, öğrenme isteği, gözlem ve merakın para kazanma yeteneklerini geliştirdiğini gösterir.',
    reversed:
      'Ters Kılıç Prensi, dikkatsizlik, yanlış bilgi veya acele kararlar nedeniyle becerilerinin zayıflayabileceğini işaret eder.',
    keywords: ['öğrenme', 'merak', 'gözlem', 'zeka', 'iletişim'],
    context: 'Para kazanma yeteneklerin öğrenme ya da aceleyle bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sw_pos8',
    card: 'Knight of Swords',
    position: 8,
    upright:
      'Kılıç Şövalyesi, hızlı düşünme, kararlılık ve girişkenliğin para kazanma yeteneklerini güçlendirdiğini gösterir.',
    reversed:
      'Ters Kılıç Şövalyesi, acelecilik, sabırsızlık veya sert iletişimin fırsatları zayıflatabileceğini işaret eder.',
    keywords: ['hız', 'kararlılık', 'girişkenlik', 'strateji', 'iletişim'],
    context: 'Para kazanma yeteneklerin hız ya da acelecilikle bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sw_pos8',
    card: 'Queen of Swords',
    position: 8,
    upright:
      'Kılıç Kraliçesi, netlik, objektiflik ve analitik düşünmenin para kazanma yeteneklerini desteklediğini gösterir.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştiri, soğukluk veya anlayış eksikliğinin becerilerini kısıtlayabileceğini işaret eder.',
    keywords: ['netlik', 'analiz', 'nesnellik', 'iletişim', 'bilgelik'],
    context:
      'Para kazanma yeteneklerin objektiflik ya da eleştiriyle bağlantılıdır.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sw_pos8',
    card: 'King of Swords',
    position: 8,
    upright:
      'Kılıç Kralı, stratejik düşünce, liderlik ve etik kurallara bağlılığın para kazanma yeteneklerini güçlendirdiğini gösterir.',
    reversed:
      'Ters Kılıç Kralı, katı düşünce, soğukluk veya otoriterlik nedeniyle becerilerinin zayıflayabileceğini işaret eder.',
    keywords: ['strateji', 'liderlik', 'etik', 'otorite', 'zihin'],
    context:
      'Para kazanma yeteneklerin strateji ya da katılıkla bağlantılıdır.',
    group: 'Kılıçlar',
  },

  // --- Asalar Serisi ---//

  {
    id: 'ace_of_wands_wa_pos8',
    card: 'Ace of Wands',
    position: 8,
    upright:
      'Değnek Ası, yaratıcılık, ilham ve girişimciliğin para kazanma yeteneklerini artırdığını gösterir.',
    reversed:
      'Ters Değnek Ası, motivasyon eksikliği, erteleme veya yanlış başlangıçların fırsatları kaçırabileceğini işaret eder.',
    keywords: ['ilham', 'başlangıç', 'girişim', 'cesaret', 'enerji'],
    context:
      'Para kazanma yeteneklerin ilham bulmak ya da motivasyonu kaybetmekle bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_wa_pos8',
    card: 'Two of Wands',
    position: 8,
    upright:
      'İki Değnek, vizyon, planlama ve ufku genişletme becerisinin finansal potansiyelini artırdığını gösterir.',
    reversed:
      'Ters İki Değnek, tereddüt, dar bakış açısı veya risk almaktan kaçınma nedeniyle fırsatların kaybolabileceğini işaret eder.',
    keywords: ['vizyon', 'planlama', 'genişleme', 'karar', 'ufuk'],
    context:
      'Para kazanma yeteneklerin vizyon geliştirmek ya da tereddütle bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_wa_pos8',
    card: 'Three of Wands',
    position: 8,
    upright:
      'Üç Değnek, genişleme, ticari girişimler ve işbirliklerinin para kazanma yeteneklerini desteklediğini gösterir.',
    reversed:
      'Ters Üç Değnek, dar görüşlülük, plansızlık veya sabırsızlık nedeniyle fırsatların sınırlanabileceğini işaret eder.',
    keywords: ['genişleme', 'işbirliği', 'fırsat', 'ticaret', 'vizyon'],
    context:
      'Para kazanma yeteneklerin genişleme ya da dar görüşle bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_wa_pos8',
    card: 'Four of Wands',
    position: 8,
    upright:
      'Dört Değnek, sağlam temeller, kutlamalar ve güvenli alanların para kazanma becerilerini artırdığını gösterir.',
    reversed:
      'Ters Dört Değnek, düzensizlik, istikrarsızlık veya aceleci planlamaların fırsatları zayıflatabileceğini işaret eder.',
    keywords: ['temel', 'istikrar', 'kutlama', 'birlik', 'aidiyet'],
    context:
      'Para kazanma yeteneklerin istikrar kurmak ya da düzensizlikle bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_wa_pos8',
    card: 'Five of Wands',
    position: 8,
    upright:
      'Beş Değnek, rekabet, pratik beceriler ve mücadele gücünün para kazanma yeteneklerini artırdığını gösterir.',
    reversed:
      'Ters Beş Değnek, gereksiz çatışmalar, kıskançlık veya dağınık enerjinin fırsatları sınırlayabileceğini işaret eder.',
    keywords: ['rekabet', 'mücadele', 'deneme', 'pratik', 'büyüme'],
    context:
      'Para kazanma yeteneklerin rekabet ya da çatışmayla bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_wa_pos8',
    card: 'Six of Wands',
    position: 8,
    upright:
      'Altı Değnek, başarı, tanınma ve liderlik becerilerinin finansal kazanç potansiyelini artırdığını gösterir.',
    reversed:
      'Ters Altı Değnek, kibir, görünürlük eksikliği veya başarısızlık korkusunun fırsatları engelleyebileceğini işaret eder.',
    keywords: ['başarı', 'tanınma', 'liderlik', 'özgüven', 'zafer'],
    context:
      'Para kazanma yeteneklerin başarıyla öne çıkmak ya da özgüven eksikliğiyle bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_wa_pos8',
    card: 'Seven of Wands',
    position: 8,
    upright:
      'Yedi Değnek, pozisyonunu savunma, dayanıklılık ve azim becerilerinin para kazanma yeteneklerini geliştirdiğini gösterir.',
    reversed:
      'Ters Yedi Değnek, yorgunluk, direnç kaybı veya savunmasızlık nedeniyle fırsatların kaçabileceğini işaret eder.',
    keywords: ['savunma', 'dayanıklılık', 'azim', 'mücadele', 'kararlılık'],
    context:
      'Para kazanma yeteneklerin dayanıklılık ya da yorgunlukla bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_wa_pos8',
    card: 'Eight of Wands',
    position: 8,
    upright:
      'Sekiz Değnek, hız, iletişim ve fırsatlara anında yanıt verme becerilerinin para kazanma yeteneklerini artırdığını gösterir.',
    reversed:
      'Ters Sekiz Değnek, gecikmeler, yanlış iletişim veya dağınıklık nedeniyle fırsatların kaçabileceğini işaret eder.',
    keywords: ['hız', 'iletişim', 'fırsat', 'ivme', 'senkron'],
    context:
      'Para kazanma yeteneklerin hızla yanıt vermek ya da gecikmeyle bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_wa_pos8',
    card: 'Nine of Wands',
    position: 8,
    upright:
      'Dokuz Değnek, direnç, sebat ve sınır koyma becerilerinin finansal potansiyelini güçlendirdiğini gösterir.',
    reversed:
      'Ters Dokuz Değnek, tükenmişlik, sürekli savunma veya bitkinliğin fırsatları zayıflatabileceğini işaret eder.',
    keywords: ['direnç', 'sebat', 'sınır', 'koruma', 'kararlılık'],
    context:
      'Para kazanma yeteneklerin sebat ya da tükenmişlikle bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_wa_pos8',
    card: 'Ten of Wands',
    position: 8,
    upright:
      'On Değnek, sorumluluk alma, iş yükünü yönetme ve azim becerilerinin para kazanma yeteneklerini geliştirdiğini gösterir.',
    reversed:
      'Ters On Değnek, aşırı yük, stres veya görevlerin bölünmemesi nedeniyle fırsatların kaybolabileceğini işaret eder.',
    keywords: ['sorumluluk', 'yük', 'azim', 'iş', 'çaba'],
    context:
      'Para kazanma yeteneklerin sorumluluk almak ya da aşırı yüklenmekle bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_wa_pos8',
    card: 'Page of Wands',
    position: 8,
    upright:
      'Değnek Prensi, merak, keşif ve yeni fikirler üretme becerisinin para kazanma potansiyelini artırdığını gösterir.',
    reversed:
      'Ters Değnek Prensi, sabırsızlık, dağınıklık veya hevesin çabuk sönmesi nedeniyle fırsatların sınırlanabileceğini işaret eder.',
    keywords: ['merak', 'keşif', 'ilham', 'heves', 'fikir'],
    context:
      'Para kazanma yeteneklerin keşif ya da sabırsızlıkla bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_wa_pos8',
    card: 'Knight of Wands',
    position: 8,
    upright:
      'Değnek Şövalyesi, cesaret, girişkenlik ve hızlı harekete geçme becerisinin finansal becerilerini güçlendirdiğini gösterir.',
    reversed:
      'Ters Değnek Şövalyesi, acelecilik, dikkatsizlik veya istikrarsızlık nedeniyle fırsatların kaybolabileceğini işaret eder.',
    keywords: ['cesaret', 'girişim', 'hız', 'tutku', 'enerji'],
    context:
      'Para kazanma yeteneklerin cesaretle hareket etmek ya da acelecilikle bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_wa_pos8',
    card: 'Queen of Wands',
    position: 8,
    upright:
      'Değnek Kraliçesi, özgüven, liderlik ve ilham verici yaklaşımın para kazanma yeteneklerini geliştirdiğini gösterir.',
    reversed:
      'Ters Değnek Kraliçesi, kıskançlık, güvensizlik veya liderlik eksikliğinin fırsatları sınırlayabileceğini işaret eder.',
    keywords: ['liderlik', 'özgüven', 'ilham', 'karizma', 'yaratıcılık'],
    context:
      'Para kazanma yeteneklerin özgüvenle öne çıkmak ya da güvensizlikle bağlantılıdır.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_wa_pos8',
    card: 'King of Wands',
    position: 8,
    upright:
      'Değnek Kralı, stratejik vizyon, liderlik ve girişimcilik ruhunun para kazanma yeteneklerini güçlendirdiğini gösterir.',
    reversed:
      'Ters Değnek Kralı, otoriter tavır, aşırı özgüven veya plansızlığın fırsatları sınırlayabileceğini işaret eder.',
    keywords: ['vizyon', 'liderlik', 'girişimcilik', 'strateji', 'cesaret'],
    context:
      'Para kazanma yeteneklerin stratejik liderlik ya da aşırılıkla bağlantılıdır.',
    group: 'Asalar',
  },

  // --- Tılsımlar Serisi ---//
  {
    id: 'ace_of_pentacles_pe_pos8',
    card: 'Ace of Pentacles',
    position: 8,
    upright:
      'Tılsım Ası, yeni finansal fırsatlar, yatırımlar ve somut başlangıçların para kazanma yeteneklerini desteklediğini gösterir.',
    reversed:
      'Ters Tılsım Ası, fırsatların kaçırılması, kötü yatırım kararları veya tembellik nedeniyle maddi potansiyelin kullanılamayacağını işaret eder.',
    keywords: ['fırsat', 'başlangıç', 'yatırım', 'bolluk', 'temel'],
    context:
      'Para kazanma yeteneklerin yeni fırsatları değerlendirmek ya da onları kaçırmakla bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pe_pos8',
    card: 'Two of Pentacles',
    position: 8,
    upright:
      'İki Tılsım, çoklu görevleri dengeleme, zamanı ve kaynakları yönetme becerisinin para kazanma yeteneklerini geliştirdiğini gösterir.',
    reversed:
      'Ters İki Tılsım, dağınıklık, kötü planlama veya önceliklerin karışması nedeniyle fırsatların kaybolabileceğini işaret eder.',
    keywords: ['denge', 'planlama', 'zaman yönetimi', 'esneklik', 'öncelik'],
    context:
      'Para kazanma yeteneklerin denge kurmak ya da dağılmakla bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pe_pos8',
    card: 'Three of Pentacles',
    position: 8,
    upright:
      'Üç Tılsım, işbirliği, takım çalışması ve uzmanlık paylaşımının finansal becerilerini artırdığını gösterir.',
    reversed:
      'Ters Üç Tılsım, ekip uyumsuzluğu, yetersiz işbirliği veya iletişim eksikliğinin fırsatları zayıflatabileceğini işaret eder.',
    keywords: ['işbirliği', 'ekip', 'uzmanlık', 'çalışma', 'paylaşım'],
    context:
      'Para kazanma yeteneklerin işbirliği ya da uyumsuzlukla bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pe_pos8',
    card: 'Four of Pentacles',
    position: 8,
    upright:
      'Dört Tılsım, maddi güvenliği koruma, tutumlu olma ve sahip olduklarını yönetme becerinin para kazanma yeteneklerini desteklediğini gösterir.',
    reversed:
      'Ters Dört Tılsım, aşırı cimrilik, açgözlülük veya kaybetme korkusu nedeniyle gelişim fırsatlarının kaçabileceğini işaret eder.',
    keywords: ['güvenlik', 'koruma', 'tutum', 'kaynak yönetimi', 'kontrol'],
    context:
      'Para kazanma yeteneklerin güvenlik sağlamak ya da kısıtlanmakla bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pe_pos8',
    card: 'Five of Pentacles',
    position: 8,
    upright:
      'Beş Tılsım, zorluklardan öğrenilen derslerin ve dayanıklılığın para kazanma yeteneklerini geliştirdiğini gösterir.',
    reversed:
      'Ters Beş Tılsım, toparlanma süreci, destek bulma ve yeniden ayağa kalkma becerilerinin gelişebileceğini işaret eder.',
    keywords: ['zorluk', 'dayanıklılık', 'yardım', 'toparlanma', 'güç'],
    context:
      'Para kazanma yeteneklerin zorluklardan ders almak ya da umudu yitirmekle bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pe_pos8',
    card: 'Six of Pentacles',
    position: 8,
    upright:
      'Altı Tılsım, paylaşım, cömertlik ve denge kurma becerisinin finansal potansiyelini artırdığını gösterir.',
    reversed:
      'Ters Altı Tılsım, güç dengesizliği, bağımlılık veya çıkar çatışmalarının becerilerini zayıflatabileceğini işaret eder.',
    keywords: ['paylaşım', 'denge', 'yardım', 'eşitlik', 'cömertlik'],
    context:
      'Para kazanma yeteneklerin paylaşım ya da dengesizlikle bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pe_pos8',
    card: 'Seven of Pentacles',
    position: 8,
    upright:
      'Yedi Tılsım, sabır, değerlendirme ve uzun vadeli plan yapma becerisinin para kazanma yeteneklerini desteklediğini gösterir.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık, kısa vadeli düşünme veya yanlış yatırımlar nedeniyle kayıpları işaret eder.',
    keywords: ['sabır', 'planlama', 'değerlendirme', 'yatırım', 'bekleme'],
    context:
      'Para kazanma yeteneklerin sabır ya da sabırsızlıkla bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pe_pos8',
    card: 'Eight of Pentacles',
    position: 8,
    upright:
      'Sekiz Tılsım, disiplin, sürekli öğrenme ve işçiliğin finansal becerilerini geliştirdiğini gösterir.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik, dikkatsizlik veya işini önemsememek nedeniyle becerilerinin zayıflayabileceğini işaret eder.',
    keywords: ['öğrenme', 'işçilik', 'disiplin', 'gelişim', 'ustalık'],
    context:
      'Para kazanma yeteneklerin disiplin ya da özensizlikle bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pe_pos8',
    card: 'Nine of Pentacles',
    position: 8,
    upright:
      'Dokuz Tılsım, bağımsızlık, öz değer ve kendi emeğinle başarıya ulaşmanın para kazanma yeteneklerini geliştirdiğini gösterir.',
    reversed:
      'Ters Dokuz Tılsım, aşırı bağımlılık, savurganlık veya öz-değer eksikliğinin fırsatları sınırlayabileceğini işaret eder.',
    keywords: ['bağımsızlık', 'öz değer', 'başarı', 'refah', 'öz yeterlilik'],
    context:
      'Para kazanma yeteneklerin bağımsızlık ya da bağımlılıkla bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pe_pos8',
    card: 'Ten of Pentacles',
    position: 8,
    upright:
      'On Tılsım, uzun vadeli güvenlik, aile desteği ve mirasın para kazanma becerilerini güçlendirdiğini gösterir.',
    reversed:
      'Ters On Tılsım, maddi sürtüşmeler, ailevi çatışmalar veya kısa vadeli düşünmenin fırsatları azaltabileceğini işaret eder.',
    keywords: ['istikrar', 'aile', 'güvenlik', 'bolluk', 'kalıcılık'],
    context:
      'Para kazanma yeteneklerin uzun vadeli güvenlik ya da çatışmayla bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pe_pos8',
    card: 'Page of Pentacles',
    position: 8,
    upright:
      'Tılsım Prensi, öğrenmeye açıklık, yeni fikirler ve girişimcilik ruhunun para kazanma becerilerini artırdığını gösterir.',
    reversed:
      'Ters Tılsım Prensi, erteleme, dikkatsizlik veya fırsatları küçümseme nedeniyle becerilerinin zayıflayabileceğini işaret eder.',
    keywords: ['öğrenme', 'girişim', 'fırsat', 'deneme', 'başlangıç'],
    context:
      'Para kazanma yeteneklerin öğrenme ya da erteleme ile bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pe_pos8',
    card: 'Knight of Pentacles',
    position: 8,
    upright:
      'Tılsım Şövalyesi, sabırlı, güvenilir ve istikrarlı çalışmanın para kazanma yeteneklerini güçlendirdiğini gösterir.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık, inatçılık veya yeniliklere kapalı olma nedeniyle fırsatların kaybolabileceğini işaret eder.',
    keywords: ['istikrar', 'sabır', 'güvenilirlik', 'çalışma', 'süreklilik'],
    context:
      'Para kazanma yeteneklerin sabır ya da durağanlıkla bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pe_pos8',
    card: 'Queen of Pentacles',
    position: 8,
    upright:
      'Tılsım Kraliçesi, kaynak yönetimi, şefkatli pratiklik ve verimliliğin finansal becerilerini geliştirdiğini gösterir.',
    reversed:
      'Ters Tılsım Kraliçesi, aşırı yüklenme, öz bakım eksikliği veya maddi konulara fazla odaklanma nedeniyle becerilerin sınırlanabileceğini işaret eder.',
    keywords: ['kaynak', 'pratiklik', 'şefkat', 'verim', 'denge'],
    context:
      'Para kazanma yeteneklerin kaynak yönetimi ya da dengesizlikle bağlantılıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pe_pos8',
    card: 'King of Pentacles',
    position: 8,
    upright:
      'Tılsım Kralı, stratejik planlama, sağlam yatırımlar ve bilge liderliğin para kazanma yeteneklerini güçlendirdiğini gösterir.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol, statü saplantısı veya katı düşünce nedeniyle fırsatların kaybolabileceğini işaret eder.',
    keywords: ['liderlik', 'yatırım', 'strateji', 'sağlamlık', 'vizyon'],
    context:
      'Para kazanma yeteneklerin stratejik liderlik ya da katılıkla bağlantılıdır.',
    group: 'Tılsımlar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyPosition8Meaning(
  card: TarotCard
): MoneyPosition8Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position8Meanings.find(
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
  meaning = position8Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyPosition8MeaningByCardName(
  cardName: string
): MoneyPosition8Meaning | null {
  return position8Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllMoneyPosition8Meanings(): MoneyPosition8Meaning[] {
  return position8Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getMoneyPosition8MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MoneyPosition8Meaning[] {
  return position8Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nPosition8meanings = (): I18nMoneyPosition8meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position8meanings.map(meaning => {
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
export const getI18nPosition8Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nMoneyPosition8Meaning | null => {
  const originalMeaning = position8Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`money.meanings.${cardKey}.position8.upright`);
  const i18nReversed = t(`money.meanings.${cardKey}.position8.reversed`);
  const i18nKeywords = t(`money.meanings.${cardKey}.position8.keywords`);
  const i18nContext = t(`money.meanings.${cardKey}.position8.context`);
  const i18nGroup = t(
    `money.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
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
const moneyPosition8Exports = {
  position8Meanings,
  getMoneyPosition8Meaning,
  getMoneyPosition8MeaningByCardName,
  getAllMoneyPosition8Meanings,
  getMoneyPosition8MeaningsByGroup,
  getI18nPosition8Meaning,
};

export default moneyPosition8Exports;
