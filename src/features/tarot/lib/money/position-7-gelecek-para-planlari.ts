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

export interface MoneyPosition7Meaning {
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
export interface I18nMoneyPosition7Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position7Meanings: MoneyPosition7Meaning[] = [
  // --- Majör Arkana Kartları ---//
  {
    id: 'the_fool_ma_pos7',
    card: 'The Fool',
    position: 7,
    upright:
      'Gelecek mali planlarda Deli, risk almayı ve yeni başlangıçlara cesurca adım atmayı işaret eder. Belirsizlik olsa da macera ruhu sizi yeni fırsatlara götürebilir.',
    reversed:
      'Ters Deli, dikkatsizlikten doğan maddi risklere ve plansız yatırımlara karşı uyarır. Geleceği güvence altına almak için daha temkinli adımlar gereklidir.',
    keywords: ['başlangıç', 'risk', 'cesaret', 'fırsat', 'özgürlük'],
    context:
      'Gelecek planlarınızda cesur adımlar ya da dikkatsiz riskler ön planda olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos7',
    card: 'The Magician',
    position: 7,
    upright:
      'Büyücü, gelecekteki finansal planlarda becerilerinizi ve kaynaklarınızı etkin kullanarak yeni fırsatlar yaratabileceğinizi gösterir. Akıl ve yaratıcılıkla güçlü bir vizyon ortaya çıkıyor.',
    reversed:
      'Ters Büyücü, manipülasyon, yanlış yönlendirme ya da kaynağı kötüye kullanma riskini işaret eder. Gelecek planları için dürüstlük ve netlik şarttır.',
    keywords: ['yaratım', 'kaynak', 'vizyon', 'beceri', 'güç'],
    context:
      'Gelecek mali planlarda güçlü vizyon veya kaynağın kötüye kullanımı gündemde olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos7',
    card: 'The High Priestess',
    position: 7,
    upright:
      'Başrahibe, gelecekte finansal kararlarınızda sezgilerinize güvenmeniz gerektiğini vurgular. Derin bir anlayışla gizli fırsatları görebileceksiniz.',
    reversed:
      'Ters Başrahibe, finansal kararları belirsizlik içinde almak, aşırı gizlilik ya da sezgileri görmezden gelmek risklidir.',
    keywords: ['sezgi', 'bilgi', 'gizli fırsat', 'içgörü', 'denge'],
    context:
      'Gelecek mali planlarda sezgi ya da belirsizlik belirleyici olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos7',
    card: 'The Empress',
    position: 7,
    upright:
      'İmparatoriçe, gelecekte bolluk, bereket ve yatırımın meyvelerini alma vaktine işaret eder. Maddi güvenliğiniz daha güçlü bir şekilde kök salacaktır.',
    reversed:
      'Ters İmparatoriçe, aşırı harcama, kontrolsüz yatırım ya da maddi tükeniş riskine karşı uyarır.',
    keywords: ['bolluk', 'yatırım', 'bereket', 'güvenlik', 'büyüme'],
    context:
      'Gelecek mali planlarda bereket ya da aşırı tüketim gündemde olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos7',
    card: 'The Emperor',
    position: 7,
    upright:
      'İmparator, gelecek mali planlarda disiplin, düzen ve sağlam stratejilerle uzun vadeli başarıyı işaret eder.',
    reversed:
      'Ters İmparator, katı kurallar ya da esneklikten uzak finansal planların riskli olabileceğini gösterir.',
    keywords: ['düzen', 'strateji', 'istikrar', 'otorite', 'uzun vade'],
    context: 'Gelecek mali planlarda disiplin ya da katılık öne çıkacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos7',
    card: 'The Hierophant',
    position: 7,
    upright:
      'Aziz, gelecekte geleneksel yöntemlere, eğitim ve rehberliğe güvenilmesi gerektiğini söyler. Güvenilir sistemler finansal istikrarı artıracaktır.',
    reversed:
      'Ters Aziz, kurallara körü körüne bağlılık veya tamamen kuralları reddetme dengesizliğini işaret eder.',
    keywords: ['gelenek', 'rehberlik', 'sistem', 'öğreti', 'istikrar'],
    context:
      'Gelecek mali planlarda rehberlik veya kör bağlılık belirleyici olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos7',
    card: 'The Lovers',
    position: 7,
    upright:
      'Aşıklar, finansal planlarda ortak seçimler, değerlerde uyum ve işbirliğini gösterir. İki tarafın ortak vizyonu geleceği güçlendirebilir.',
    reversed:
      'Ters Aşıklar, finansal konularda uyumsuzluk, kararsızlık veya değer çatışması yaratabilir.',
    keywords: ['uyum', 'seçim', 'ortaklık', 'değerler', 'karar'],
    context: 'Gelecek mali planlarda uyum ya da uyumsuzluk gündemde olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos7',
    card: 'The Chariot',
    position: 7,
    upright:
      'Savaş Arabası, gelecekte finansal hedeflere güçlü bir odak ve kararlılıkla ilerleyeceğinizi gösterir. Net yön ve irade başarıyı getirir.',
    reversed:
      'Ters Savaş Arabası, dağınık enerji, kontrolsüz harcama veya yön kaybına işaret eder.',
    keywords: ['odak', 'irade', 'yön', 'kararlılık', 'başarı'],
    context:
      'Gelecek mali planlarda net yön ya da yön kaybı belirleyici olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos7',
    card: 'Strength',
    position: 7,
    upright:
      'Güç, mali planlarda sabır, özdisiplin ve içsel denge ile uzun vadeli başarıya işaret eder.',
    reversed:
      'Ters Güç, mali konularda sabırsızlık, öfke veya kontrolsüzlükten kaynaklanan risklere karşı uyarır.',
    keywords: ['sabır', 'özdisiplin', 'denge', 'kararlılık', 'kontrol'],
    context:
      'Gelecek mali planlarda sabır ya da kontrolsüzlük belirleyici olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos7',
    card: 'The Hermit',
    position: 7,
    upright:
      'Ermiş, gelecekte finansal planlarda içsel bilgelik ve yalnız karar verme dönemini işaret eder. Derin analiz uzun vadeli kazanç sağlar.',
    reversed:
      'Ters Ermiş, aşırı izolasyon ya da yalnız kararların riskli olabileceğini gösterir.',
    keywords: ['bilgelik', 'analiz', 'içe dönüş', 'uzun vade', 'yalnızlık'],
    context: 'Gelecek mali planlarda derin analiz ya da izolasyon öne çıkacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos7',
    card: 'The Wheel of Fortune',
    position: 7,
    upright:
      'Kader Çarkı, gelecekte finansal planlarda şans, döngüsel fırsatlar ve değişim vurgusu taşır. Doğru zamanda doğru karar bereket getirecek.',
    reversed:
      'Ters Kader Çarkı, talihsizlik, yanlış zamanlama veya fırsat kaçırma riskine işaret eder.',
    keywords: ['şans', 'döngü', 'fırsat', 'zamanlama', 'değişim'],
    context:
      'Gelecek mali planlarda şanslı fırsatlar ya da yanlış zamanlama öne çıkacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos7',
    card: 'Justice',
    position: 7,
    upright:
      'Adalet, gelecekte mali planlarda adil kararlar, şeffaflık ve sözleşmelerin doğru işleyişini işaret eder.',
    reversed:
      'Ters Adalet, haksızlık, yanlış hesaplar veya şeffaf olmayan kararların riskine işaret eder.',
    keywords: ['adalet', 'denge', 'sözleşme', 'karar', 'sorumluluk'],
    context: 'Gelecek mali planlarda adil ya da haksız kararlar etkili olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos7',
    card: 'The Hanged Man',
    position: 7,
    upright:
      'Asılan Adam, gelecekte finansal planlarda bekleyiş, fedakârlık ve farklı bir bakış açısının önemine işaret eder.',
    reversed:
      'Ters Asılan Adam, isteksiz bekleyiş, kararsızlık veya gereksiz kurban rolünü işaret eder.',
    keywords: ['bekleyiş', 'feda', 'perspektif', 'sabır', 'akış'],
    context:
      'Gelecek mali planlarda bekleyiş ya da kararsızlık belirleyici olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos7',
    card: 'Death',
    position: 7,
    upright:
      'Ölüm, gelecekte mali planlarda dönüşüm, eski sistemleri bırakma ve yeniyi karşılama sürecini gösterir.',
    reversed:
      'Ters Ölüm, değişime direnç, eski planlara tutunma ve yeniyi geciktirme riskini işaret eder.',
    keywords: ['dönüşüm', 'bitiş', 'yenilik', 'bırakma', 'yeniden doğuş'],
    context: 'Gelecek mali planlarda dönüşüm ya da direnç etkili olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos7',
    card: 'Temperance',
    position: 7,
    upright:
      'Denge, mali planlarda ölçülülük, uyum ve uzun vadeli istikrarı işaret eder.',
    reversed:
      'Ters Denge, aşırılıklar, dengesizlik ya da plansızlık riskini gösterir.',
    keywords: ['denge', 'ölçü', 'uyum', 'istikrar', 'sabır'],
    context:
      'Gelecek mali planlarda uyum ya da dengesizlik belirleyici olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos7',
    card: 'The Devil',
    position: 7,
    upright:
      'Şeytan, gelecekte mali planlarda bağımlılıklar, aşırı borçlanma ya da maddi hırsların baskın olabileceğini gösterir.',
    reversed:
      'Ters Şeytan, zincirlerden kurtulma, finansal özgürlük ve bağımlılıkların bitişine işaret eder.',
    keywords: ['bağımlılık', 'borç', 'hırs', 'özgürlük', 'kontrol'],
    context:
      'Gelecek mali planlarda bağımlılık ya da özgürlük gündeme gelecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos7',
    card: 'The Tower',
    position: 7,
    upright:
      'Kule, gelecekte mali planlarda ani kriz, beklenmedik masraflar ve dönüşüm yaratan çöküşleri işaret eder.',
    reversed:
      'Ters Kule, ertelenmiş krizler veya küçük uyarıcı sarsıntılarla geleceği yeniden yapılandırma şansını gösterir.',
    keywords: ['kriz', 'yıkım', 'değişim', 'sarsıntı', 'yeniden yapı'],
    context: 'Gelecek mali planlarda kriz ya da yeniden yapı gündemde olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos7',
    card: 'The Star',
    position: 7,
    upright:
      'Yıldız, gelecekte mali planlarda umut, ilham ve şifalı bir yeniden yapılanmayı işaret eder. Yolunuz aydınlık olacaktır.',
    reversed:
      'Ters Yıldız, umutsuzluk, motivasyon eksikliği ya da yanlış yönelim riskine işaret eder.',
    keywords: ['umut', 'ilham', 'şifa', 'yenilenme', 'vizyon'],
    context: 'Gelecek mali planlarda umut ya da umutsuzluk belirleyici olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos7',
    card: 'The Moon',
    position: 7,
    upright:
      'Ay, gelecekte mali planlarda belirsizlik, illüzyon ve sezgilerin önemini işaret eder.',
    reversed:
      'Ters Ay, yanılgılardan uyanma, yanlış anlaşılmaları çözme ve daha net plan yapma sürecini gösterir.',
    keywords: ['belirsizlik', 'illüzyon', 'sezgi', 'yanılgı', 'aydınlanma'],
    context:
      'Gelecek mali planlarda belirsizlik ya da netleşme gündeme gelecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos7',
    card: 'The Sun',
    position: 7,
    upright:
      'Güneş, gelecekte mali planlarda başarı, bolluk ve netlik vaat eder. Uzun vadede güven ve mutluluk ön planda olacaktır.',
    reversed:
      'Ters Güneş, gecikmiş başarılar, yanlış iyimserlik ya da sahte güvenlik hissini işaret eder.',
    keywords: ['başarı', 'bolluk', 'netlik', 'mutluluk', 'güven'],
    context:
      'Gelecek mali planlarda net başarı ya da yanlış güven duygusu öne çıkacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos7',
    card: 'Judgement',
    position: 7,
    upright:
      'Mahkeme, gelecekte mali planlarda geçmiş derslerin farkındalığıyla yenilenme ve güçlü kararların önemini işaret eder.',
    reversed:
      'Ters Mahkeme, geçmiş hatalardan ders almamak veya karar vermekte zorlanmayı işaret eder.',
    keywords: ['yenilenme', 'karar', 'farkındalık', 'geçmiş', 'yargı'],
    context:
      'Gelecek mali planlarda ders çıkarma ya da tekrarlama öne çıkacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos7',
    card: 'The World',
    position: 7,
    upright:
      'Dünya, gelecekte mali planlarda tamamlanma, bütünlük ve uluslararası fırsatların artmasını işaret eder.',
    reversed:
      'Ters Dünya, tamamlanmamış projeler, eksik döngüler veya ertelenmiş başarıları gösterir.',
    keywords: ['tamamlanma', 'bütünlük', 'başarı', 'vizyon', 'döngü'],
    context: 'Gelecek mali planlarda tamamlanma ya da eksiklik öne çıkacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'ten_of_cups_ps_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'Kadehler Onlusu, sorunun merkezinde aile uyumu, mutluluk ve tatmin arayışı olabilir.',
    reversed:
      'Ters Kadehler Onlusu, aile sorunları, mutsuzluk veya tatminsizlik problemin kaynağı olabilir.',
    keywords: ['aile', 'uyum', 'mutluluk', 'tatmin', 'soru'],
    context: 'Sorunun merkezinde aile uyumu ve mutluluk arayışı var.',
    group: 'Kupalar',
  },
  {
    id: 'the_moon_ps_pos1',
    card: 'The Moon',
    position: 1,
    upright:
      'Ay, sorunun merkezinde belirsizlik, korkular veya yanılsamalar olabilir.',
    reversed:
      'Ters Ay, gerçekleri görememek, aldanma veya korkulara kapılmak problemin kaynağı olabilir.',
    keywords: ['belirsizlik', 'korku', 'yanılsama', 'sezgi', 'soru'],
    context: 'Sorunun merkezinde belirsizlikler ve yanılsamalar var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos1',
    card: 'The Sun',
    position: 1,
    upright:
      'Güneş, sorunun merkezinde başarı, mutluluk arayışı veya görünürlük ihtiyacı olabilir.',
    reversed:
      'Ters Güneş, karamsarlık, özgüven eksikliği veya engellenmiş başarı problemin kaynağı olabilir.',
    keywords: ['başarı', 'özgüven', 'aydınlık', 'umut', 'soru'],
    context: 'Sorunun merkezinde başarı ve görünürlük arzusu var.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos1',
    card: 'Judgement',
    position: 1,
    upright:
      'Mahkeme, sorunun merkezinde geçmişle yüzleşmek, yeniden doğuş veya büyük bir karar ihtiyacı olabilir.',
    reversed:
      'Ters Mahkeme, geçmişten kaçmak, sorumluluk almamak veya kendini kandırmak problemin kaynağı olabilir.',
    keywords: ['yeniden doğuş', 'karar', 'yüzleşme', 'farkındalık', 'soru'],
    context:
      'Sorunun merkezinde geçmişle yüzleşme ve yeniden doğma ihtiyacı var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos1',
    card: 'The World',
    position: 1,
    upright:
      'Dünya, sorunun merkezinde tamamlanma, bütünlük veya döngüyü kapatma ihtiyacı olabilir.',
    reversed:
      'Ters Dünya, eksik kalmış süreçler, tamamlanmamış işler veya kapanmamış döngüler problemin kaynağı olabilir.',
    keywords: ['tamamlanma', 'başarı', 'bütünlük', 'zafer', 'soru'],
    context:
      'Sorunun merkezinde bir döngüyü tamamlama ve bütünlüğe ulaşma isteği var.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_cu_pos7',
    card: 'Ace of Cups',
    position: 7,
    upright:
      'Kupa Ası, gelecekte finansal planlarda duygusal tatmin ve yeni fırsatların bolluk getireceğini işaret eder. Yatırımlar gönülden gelen bir motivasyonla birleşir.',
    reversed:
      'Ters Kupa Ası, duygusal olarak tatmin etmeyen projeler veya yanlış yönlendirilmiş yatırımların hayal kırıklığı yaratabileceğini gösterir.',
    keywords: ['başlangıç', 'bolluk', 'tatmin', 'motivasyon', 'fırsat'],
    context:
      'Gelecek mali planlarda duygusal tatmin ya da hayal kırıklığı belirleyici olacak.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cu_pos7',
    card: 'Two of Cups',
    position: 7,
    upright:
      'İki Kupa, gelecekte finansal planlarda ortaklık, işbirliği ve karşılıklı faydanın güçleneceğini gösterir.',
    reversed:
      'Ters İki Kupa, iş ortaklıklarında anlaşmazlık, mali uyumsuzluk veya dengesizlik riskini işaret eder.',
    keywords: ['ortaklık', 'uyum', 'işbirliği', 'denge', 'fayda'],
    context:
      'Gelecek mali planlarda uyumlu ortaklık veya anlaşmazlık gündeme gelecek.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cu_pos7',
    card: 'Three of Cups',
    position: 7,
    upright:
      'Üç Kupa, gelecekte mali planlarda topluluk desteği, ortak projelerden sevinç ve kazanç elde etmeyi gösterir.',
    reversed:
      'Ters Üç Kupa, finansal projelerde yüzeysellik, aşırı harcama veya ortaklıkta sorunları işaret eder.',
    keywords: ['topluluk', 'kutlama', 'kazanç', 'destek', 'paylaşım'],
    context:
      'Gelecek mali planlarda topluluk desteği ya da yüzeysel harcamalar öne çıkacak.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cu_pos7',
    card: 'Four of Cups',
    position: 7,
    upright:
      'Dört Kupa, gelecekte mali planlarda mevcut fırsatları görmezden gelme riskine işaret eder. Şükran ve farkındalık bereketi artıracaktır.',
    reversed:
      'Ters Dört Kupa, yeni fırsatlara uyanışı ve finansal açıdan daha bilinçli kararlar almayı gösterir.',
    keywords: ['fırsat', 'tatminsizlik', 'şükran', 'uyanış', 'farkındalık'],
    context:
      'Gelecek mali planlarda tatminsizlik ya da farkındalık ön planda olacak.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cu_pos7',
    card: 'Five of Cups',
    position: 7,
    upright:
      'Beş Kupa, gelecekte mali kayıplar ya da yanlış yatırımların üzüntüsüne işaret eder. Ancak geriye kalan fırsatlara odaklanmak gerekir.',
    reversed:
      'Ters Beş Kupa, toparlanma sürecini, yeni umutları ve geçmiş hatalardan alınan derslerle geleceği inşa etmeyi gösterir.',
    keywords: ['kayıp', 'ders', 'umut', 'şifa', 'odak'],
    context: 'Gelecek mali planlarda kayıp ya da toparlanma gündeme gelecek.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cu_pos7',
    card: 'Six of Cups',
    position: 7,
    upright:
      'Altı Kupa, geçmiş deneyimlerden öğrenilen derslerle gelecekte güvenli finansal planların kurulabileceğini işaret eder.',
    reversed:
      'Ters Altı Kupa, geçmişe aşırı tutunmak ve aynı hataları tekrarlama riskine işaret eder.',
    keywords: ['geçmiş', 'ders', 'güven', 'anı', 'öğrenme'],
    context:
      'Gelecek mali planlarda geçmişten ders alma ya da tekrar gündeme gelecek.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cu_pos7',
    card: 'Seven of Cups',
    position: 7,
    upright:
      'Yedi Kupa, gelecekte çok sayıda finansal fırsatın karşınıza çıkacağını, ancak seçim yaparken netlik gerektiğini gösterir.',
    reversed:
      'Ters Yedi Kupa, kafa karışıklığının sona erdiğini ve mali planlarda netleşme sürecini işaret eder.',
    keywords: ['fırsatlar', 'hayaller', 'seçim', 'netlik', 'vizyon'],
    context: 'Gelecek mali planlarda bolluk ya da netleşme belirleyici olacak.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cu_pos7',
    card: 'Eight of Cups',
    position: 7,
    upright:
      'Sekiz Kupa, gelecekte anlam arayışıyla mevcut finansal planlardan uzaklaşma ve daha doyurucu yollar aramayı işaret eder.',
    reversed:
      'Ters Sekiz Kupa, gitmek ile kalmak arasında sıkışmayı ya da mali projeleri tamamlamadan bırakmayı işaret eder.',
    keywords: ['ayrılış', 'anlam', 'doyum', 'yeni yol', 'karar'],
    context:
      'Gelecek mali planlarda yeni yollar ya da kararsızlık öne çıkacak.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cu_pos7',
    card: 'Nine of Cups',
    position: 7,
    upright:
      'Dokuz Kupa, gelecekte mali tatmin, başarıların tadını çıkarma ve bolluğun keyfini sürmeyi işaret eder.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatmin veya aşırı lüks harcamaların hayal kırıklığına yol açabileceğini gösterir.',
    keywords: ['tatmin', 'bolluk', 'keyif', 'başarı', 'lüks'],
    context:
      'Gelecek mali planlarda tatmin ya da yüzeysel haz gündeme gelecek.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cu_pos7',
    card: 'Ten of Cups',
    position: 7,
    upright:
      'On Kupa, gelecekte aile içinde mali uyum, huzur ve uzun vadeli güvenlik vaat eder.',
    reversed:
      'Ters On Kupa, aile içinde mali uyumsuzluk ya da beklentilerin karşılanmaması riskine işaret eder.',
    keywords: ['aile', 'uyum', 'huzur', 'uzun vade', 'güvenlik'],
    context:
      'Gelecek mali planlarda aile uyumu ya da uyumsuzluğu etkili olacak.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cu_pos7',
    card: 'Page of Cups',
    position: 7,
    upright:
      'Kupa Prensi, gelecekte yeni fikirler, yaratıcı yatırımlar ve umut verici fırsatları işaret eder.',
    reversed:
      'Ters Kupa Prensi, hayalperest yaklaşımlar, dağınık projeler veya tutarsız yatırımlar riskine işaret eder.',
    keywords: ['yaratıcılık', 'umut', 'fikir', 'başlangıç', 'ilham'],
    context:
      'Gelecek mali planlarda yaratıcı fırsatlar ya da dağınıklık öne çıkacak.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cu_pos7',
    card: 'Knight of Cups',
    position: 7,
    upright:
      'Kupa Şövalyesi, gelecekte idealist yatırımlar, vizyoner projeler ve zarafetle ilerlemeyi işaret eder.',
    reversed:
      'Ters Kupa Şövalyesi, tutarsızlık, aşırı romantikleştirme ya da mali gerçeklerden kopmayı işaret eder.',
    keywords: ['idealizm', 'vizyon', 'yatırım', 'zarafet', 'hedef'],
    context:
      'Gelecek mali planlarda vizyoner yatırımlar ya da tutarsızlık etkili olacak.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cu_pos7',
    card: 'Queen of Cups',
    position: 7,
    upright:
      'Kupa Kraliçesi, gelecekte sezgisel liderlik, empati ve mali konularda güvenli alan yaratmayı işaret eder.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal sınırların erimesi veya aşırı hassasiyetin mali planları zorlamasını işaret eder.',
    keywords: ['empati', 'sezgi', 'liderlik', 'şefkat', 'güven'],
    context:
      'Gelecek mali planlarda sezgi ya da duygusal aşırılık belirleyici olacak.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cu_pos7',
    card: 'King of Cups',
    position: 7,
    upright:
      'Kupa Kralı, gelecekte mali planlarda olgunluk, sakin liderlik ve güvenilir finansal stratejilere işaret eder.',
    reversed:
      'Ters Kupa Kralı, bastırılmış duygular, pasif agresif davranışlar veya net olmayan mali yönetim riskine işaret eder.',
    keywords: ['olgunluk', 'liderlik', 'güven', 'strateji', 'denge'],
    context: 'Gelecek mali planlarda olgunluk ya da dengesizlik öne çıkacak.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_sw_pos7',
    card: 'Ace of Swords',
    position: 7,
    upright:
      'Kılıç Ası, gelecekte mali planlarda netlik, yeni fikirler ve keskin kararların başarı getireceğini gösterir. Zihin açıklığı fırsatları ortaya çıkarır.',
    reversed:
      'Ters Kılıç Ası, kafa karışıklığı, iletişim sorunları veya yanlış kararların finansal ilerlemeyi zorlaştıracağını işaret eder.',
    keywords: ['netlik', 'karar', 'fikir', 'başlangıç', 'hakikat'],
    context:
      'Gelecek mali planlarda net kararlar ya da kafa karışıklığı belirleyici olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sw_pos7',
    card: 'Two of Swords',
    position: 7,
    upright:
      'İki Kılıç, gelecekte mali planlarda kararsızlık, seçenekler arasında sıkışma ve tarafsız kalma çabasını işaret eder.',
    reversed:
      'Ters İki Kılıç, uzun süredir ertelenmiş kararların gündeme geleceğini ve gerçeklerle yüzleşme zamanının geldiğini gösterir.',
    keywords: ['kararsızlık', 'ikilem', 'denge', 'yüzleşme', 'seçim'],
    context: 'Gelecek mali planlarda kararsızlık ya da yüzleşme öne çıkacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sw_pos7',
    card: 'Three of Swords',
    position: 7,
    upright:
      'Üç Kılıç, gelecekte mali planlarda kırılma, kayıp ya da acı veren bir kararın gündeme gelebileceğini işaret eder.',
    reversed:
      'Ters Üç Kılıç, iyileşme sürecini, mali yaraların sarılmasını ve daha bilinçli planların oluşmasını gösterir.',
    keywords: ['kayıp', 'karar', 'acı', 'iyileşme', 'gerçek'],
    context:
      'Gelecek mali planlarda kayıp ya da iyileşme süreci etkili olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sw_pos7',
    card: 'Four of Swords',
    position: 7,
    upright:
      'Dört Kılıç, gelecekte mali planlarda dinlenme, toparlanma ve stratejik düşünme sürecine girileceğini işaret eder.',
    reversed:
      'Ters Dört Kılıç, aşırı yorgunluk, hareketsizlik veya gerekli molaların ertelenmesinin risk oluşturacağını gösterir.',
    keywords: ['dinlenme', 'strateji', 'toparlanma', 'planlama', 'denge'],
    context:
      'Gelecek mali planlarda stratejik mola ya da yorgunluk öne çıkacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sw_pos7',
    card: 'Five of Swords',
    position: 7,
    upright:
      'Beş Kılıç, gelecekte mali konularda rekabet, çıkar çatışmaları veya gereksiz tartışmaların yaşanabileceğini işaret eder.',
    reversed:
      'Ters Beş Kılıç, mali ilişkilerde onarım, uzlaşma ve kaybedilen güveni geri kazanma şansını gösterir.',
    keywords: ['rekabet', 'çatışma', 'ego', 'onarım', 'uzlaşma'],
    context: 'Gelecek mali planlarda çatışma ya da onarım gündeme gelecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sw_pos7',
    card: 'Six of Swords',
    position: 7,
    upright:
      'Altı Kılıç, gelecekte mali planlarda sakinleşme, riskli durumlardan uzaklaşma ve güvenli sulara geçişi işaret eder.',
    reversed:
      'Ters Altı Kılıç, geçmiş mali sorunlara bağlı kalma ve ileriye gitmekte zorlanma riskini gösterir.',
    keywords: ['geçiş', 'sükunet', 'uzaklaşma', 'rota', 'güven'],
    context:
      'Gelecek mali planlarda güvenli geçiş ya da takılı kalma öne çıkacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sw_pos7',
    card: 'Seven of Swords',
    position: 7,
    upright:
      'Yedi Kılıç, gelecekte mali planlarda stratejik ilerleyiş, gizli projeler veya zekice adımlar atılacağını işaret eder.',
    reversed:
      'Ters Yedi Kılıç, dürüstlükten sapma, mali gizliliklerin açığa çıkması veya kendini kandırma riskini gösterir.',
    keywords: ['strateji', 'gizlilik', 'plan', 'zeka', 'risk'],
    context:
      'Gelecek mali planlarda strateji ya da dürüstlük sınavı öne çıkacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sw_pos7',
    card: 'Eight of Swords',
    position: 7,
    upright:
      'Sekiz Kılıç, gelecekte mali planlarda kısıtlılık hissi, kendi inançlarının engeli ve çıkışsızlık algısını işaret eder.',
    reversed:
      'Ters Sekiz Kılıç, sınırlardan kurtulma, özgürleşme ve yeni mali çözümlerin bulunması sürecini gösterir.',
    keywords: ['kısıt', 'korku', 'özgürlük', 'engeller', 'inanç'],
    context: 'Gelecek mali planlarda kısıtlılık ya da özgürleşme öne çıkacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sw_pos7',
    card: 'Nine of Swords',
    position: 7,
    upright:
      'Dokuz Kılıç, gelecekte mali planlarda kaygı, uykusuzluk ve endişelerin yoğunlaşabileceğini işaret eder.',
    reversed:
      'Ters Dokuz Kılıç, bu kaygılardan kurtulma, gerçekleri daha net görme ve iç huzurun artması sürecini gösterir.',
    keywords: ['kaygı', 'endişe', 'gerçeklik', 'özgürleşme', 'kabus'],
    context: 'Gelecek mali planlarda kaygı ya da iç huzur belirleyici olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sw_pos7',
    card: 'Ten of Swords',
    position: 7,
    upright:
      'On Kılıç, gelecekte bir mali döngünün sona ereceğini, bitişin ardından yeni bir başlangıcın geleceğini gösterir.',
    reversed:
      'Ters On Kılıç, toparlanma sürecini, bitmiş olanın ardından yeni fırsatlara yönelme gücünü işaret eder.',
    keywords: ['bitiş', 'yeniden doğuş', 'teslim', 'fırsat', 'toparlanma'],
    context:
      'Gelecek mali planlarda bir bitiş ya da toparlanma gündeme gelecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sw_pos7',
    card: 'Page of Swords',
    position: 7,
    upright:
      'Kılıç Prensi, gelecekte mali planlarda öğrenme, araştırma ve yeni bilgilere açık olmayı işaret eder.',
    reversed:
      'Ters Kılıç Prensi, yüzeysel bilgi, acele kararlar veya dedikodu kaynaklı yanlış yönlendirmeleri gösterir.',
    keywords: ['öğrenme', 'merak', 'bilgi', 'gözlem', 'doğrulama'],
    context: 'Gelecek mali planlarda öğrenme ya da yüzeysellik etkili olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sw_pos7',
    card: 'Knight of Swords',
    position: 7,
    upright:
      'Kılıç Şövalyesi, gelecekte hızlı kararlar, cesur girişimler ve stratejik atılımlar yapılacağını işaret eder.',
    reversed:
      'Ters Kılıç Şövalyesi, acelecilik, sabırsızlık ve düşünmeden hareket etmenin zarar getirebileceğini gösterir.',
    keywords: ['hız', 'strateji', 'karar', 'cesaret', 'atılım'],
    context:
      'Gelecek mali planlarda cesaret ya da acelecilik belirleyici olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sw_pos7',
    card: 'Queen of Swords',
    position: 7,
    upright:
      'Kılıç Kraliçesi, gelecekte mali planlarda netlik, bağımsızlık ve mantıklı stratejilerin ön plana çıkacağını işaret eder.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştiri, soğukluk ya da duygusuz kararların ilişkileri zedeleyebileceğini gösterir.',
    keywords: ['netlik', 'bağımsızlık', 'mantık', 'liderlik', 'nesnellik'],
    context:
      'Gelecek mali planlarda mantık ya da aşırı eleştiri etkili olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sw_pos7',
    card: 'King of Swords',
    position: 7,
    upright:
      'Kılıç Kralı, gelecekte mali planlarda etik, ilkeli yönetim ve stratejik düşünmenin güçlü etkisini işaret eder.',
    reversed:
      'Ters Kılıç Kralı, katı tutum, otoriter yaklaşım ya da iletişim eksikliğinin finansal planları zorlayabileceğini gösterir.',
    keywords: ['etik', 'mantık', 'otorite', 'strateji', 'iletişim'],
    context:
      'Gelecek mali planlarda etik liderlik ya da katılık belirleyici olacak.',
    group: 'Kılıçlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_wd_pos7',
    card: 'Ace of Wands',
    position: 7,
    upright:
      'Asa Ası, gelecekte mali planlarda yeni fırsatlar, ilham dolu başlangıçlar ve girişimcilik ruhunu gösterir. Cesur bir adım büyük büyümeyi başlatabilir.',
    reversed:
      'Ters Asa Ası, ilham kaybı, erteleme ya da motivasyon eksikliği nedeniyle fırsatların kaçabileceğini işaret eder.',
    keywords: ['başlangıç', 'ilham', 'girişim', 'cesaret', 'enerji'],
    context:
      'Gelecek mali planlarda yeni başlangıçlar ya da ilham eksikliği belirleyici olacak.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_wd_pos7',
    card: 'Two of Wands',
    position: 7,
    upright:
      'İki Asa, gelecekte mali planlarda vizyon geliştirme, ufuk genişletme ve yeni projeleri planlama öne çıkar.',
    reversed:
      'Ters İki Asa, kararsızlık, korkular ya da konfor alanından çıkamama nedeniyle fırsatların erteleneceğini işaret eder.',
    keywords: ['vizyon', 'planlama', 'ufuk', 'projeler', 'karar'],
    context:
      'Gelecek mali planlarda vizyon geliştirme ya da kararsızlık etkili olacak.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_wd_pos7',
    card: 'Three of Wands',
    position: 7,
    upright:
      'Üç Asa, gelecekte mali planlarda genişleme, işbirlikleri ve uzun vadeli fırsatlara açılımı işaret eder.',
    reversed:
      'Ters Üç Asa, dar görüşlülük, erteleme veya fırsatların yanlış değerlendirilmesi riskini gösterir.',
    keywords: ['genişleme', 'işbirliği', 'fırsat', 'ufuk', 'zamanlama'],
    context:
      'Gelecek mali planlarda genişleme ya da fırsatların kaçırılması öne çıkacak.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_wd_pos7',
    card: 'Four of Wands',
    position: 7,
    upright:
      'Dört Asa, gelecekte mali planlarda istikrar, kutlama ve işbirliklerinin sağlam temel oluşturacağını gösterir.',
    reversed:
      'Ters Dört Asa, geçici düzensizlik, aile içi veya iş ilişkilerinde huzursuzluk riskine işaret eder.',
    keywords: ['istikrar', 'kutlama', 'temel', 'ortaklık', 'uyum'],
    context: 'Gelecek mali planlarda istikrar ya da huzursuzluk etkili olacak.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_wd_pos7',
    card: 'Five of Wands',
    position: 7,
    upright:
      'Beş Asa, gelecekte mali planlarda rekabet, fikir çatışmaları ve üretken mücadeleler öne çıkacaktır.',
    reversed:
      'Ters Beş Asa, verimsiz tartışmalar, gereksiz rekabet ya da bastırılmış öfkenin planları zorlaştırabileceğini gösterir.',
    keywords: ['rekabet', 'mücadele', 'fikir çatışması', 'gelişim', 'gerilim'],
    context:
      'Gelecek mali planlarda rekabet ya da verimsiz çatışma öne çıkacak.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_wd_pos7',
    card: 'Six of Wands',
    position: 7,
    upright:
      'Altı Asa, gelecekte mali planlarda başarı, takdir edilme ve görünür zaferler öne çıkacaktır.',
    reversed:
      'Ters Altı Asa, tanınmama, başarının küçümsenmesi veya takdir eksikliği riskini işaret eder.',
    keywords: ['başarı', 'tanınma', 'zafer', 'motivasyon', 'liderlik'],
    context:
      'Gelecek mali planlarda başarı ya da takdir eksikliği belirleyici olacak.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_wd_pos7',
    card: 'Seven of Wands',
    position: 7,
    upright:
      'Yedi Asa, gelecekte mali planlarda güçlü duruş, rekabet ortamında savunma ve hak edilen pozisyonu korumayı gösterir.',
    reversed:
      'Ters Yedi Asa, yorgunluk, savunma eksikliği ya da pes etme eğiliminin finansal istikrarı zorlayabileceğini işaret eder.',
    keywords: ['savunma', 'direnç', 'rekabet', 'kararlılık', 'güç'],
    context:
      'Gelecek mali planlarda güçlü duruş ya da yorgunluk etkili olacak.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_wd_pos7',
    card: 'Eight of Wands',
    position: 7,
    upright:
      'Sekiz Asa, gelecekte mali planlarda hız, haberleşme ve ani fırsatların gelişini işaret eder.',
    reversed:
      'Ters Sekiz Asa, gecikmeler, iletişim sorunları veya yanlış zamanlamaların fırsatları erteleyeceğini gösterir.',
    keywords: ['hız', 'fırsat', 'iletişim', 'ivme', 'zamanlama'],
    context: 'Gelecek mali planlarda hız ya da gecikme belirleyici olacak.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_wd_pos7',
    card: 'Nine of Wands',
    position: 7,
    upright:
      'Dokuz Asa, gelecekte mali planlarda direnç, sabır ve son aşamada başarıya ulaşma kararlılığını işaret eder.',
    reversed:
      'Ters Dokuz Asa, tükenmişlik, gereksiz savunma ya da bitkinlik nedeniyle fırsatların ertelenmesi riskini gösterir.',
    keywords: ['dayanıklılık', 'sabır', 'savunma', 'kararlılık', 'koruma'],
    context: 'Gelecek mali planlarda sabır ya da tükenmişlik öne çıkacak.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_wd_pos7',
    card: 'Ten of Wands',
    position: 7,
    upright:
      'On Asa, gelecekte mali planlarda ağır sorumluluklar, iş yükü ve hedeflere ulaşmak için yoğun çaba öne çıkacaktır.',
    reversed:
      'Ters On Asa, aşırı yüklenme, delege edememe veya sorumlulukların baskısı nedeniyle zorlanma riskine işaret eder.',
    keywords: ['yük', 'sorumluluk', 'çaba', 'tamamlama', 'zorluk'],
    context:
      'Gelecek mali planlarda yoğun çaba ya da yük fazlalığı belirleyici olacak.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_wd_pos7',
    card: 'Page of Wands',
    position: 7,
    upright:
      'Asa Prensi, gelecekte mali planlarda keşif, yeni fikirler ve hevesli adımlar öne çıkacaktır.',
    reversed:
      'Ters Asa Prensi, dikkatsizlik, sabırsızlık veya hevesin çabuk sönmesi riskini gösterir.',
    keywords: ['keşif', 'heves', 'başlangıç', 'yaratıcılık', 'enerji'],
    context: 'Gelecek mali planlarda keşif ya da sabırsızlık öne çıkacak.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_wd_pos7',
    card: 'Knight of Wands',
    position: 7,
    upright:
      'Asa Şövalyesi, gelecekte mali planlarda cesur girişimler, tutku ve hızlı ilerleme öne çıkacaktır.',
    reversed:
      'Ters Asa Şövalyesi, acelecilik, istikrarsızlık veya projelerin yarım kalma riskini işaret eder.',
    keywords: ['cesaret', 'tutku', 'hız', 'atılım', 'hedef'],
    context:
      'Gelecek mali planlarda cesaret ya da acelecilik belirleyici olacak.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_wd_pos7',
    card: 'Queen of Wands',
    position: 7,
    upright:
      'Asa Kraliçesi, gelecekte mali planlarda karizma, liderlik ve öz güvenle kaynakları büyütme potansiyelini işaret eder.',
    reversed:
      'Ters Asa Kraliçesi, güvensizlik, kıskançlık ya da aşırı kontrol arzusunun sorun yaratabileceğini gösterir.',
    keywords: ['liderlik', 'öz güven', 'karizma', 'vizyon', 'cesaret'],
    context: 'Gelecek mali planlarda özgüven ya da güvensizlik etkili olacak.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_wd_pos7',
    card: 'King of Wands',
    position: 7,
    upright:
      'Asa Kralı, gelecekte mali planlarda vizyoner liderlik, stratejik yatırımlar ve cesur adımların öne çıkacağını işaret eder.',
    reversed:
      'Ters Asa Kralı, otoriterlik, aşırı hırs ya da dinlemeyi ihmal etmenin sorun yaratabileceğini gösterir.',
    keywords: ['vizyon', 'liderlik', 'strateji', 'cesaret', 'yatırım'],
    context:
      'Gelecek mali planlarda vizyoner liderlik ya da otoriterlik belirleyici olacak.',
    group: 'Asalar',
  },

  {
    id: 'ace_of_pentacles_pt_pos7',
    card: 'Ace of Pentacles',
    position: 7,
    upright:
      'Tılsım Ası, gelecekte yeni maddi fırsatlar, sağlam başlangıçlar ve kalıcı yatırımların önünü açar. Uzun vadeli güvenlik için güçlü bir temel atılır.',
    reversed:
      'Ters Tılsım Ası, fırsatların kaçması, maddi güvensizlik veya yanlış yatırımların riskine işaret eder.',
    keywords: ['fırsat', 'temel', 'yatırım', 'güvenlik', 'başlangıç'],
    context:
      'Gelecek mali planlarda yeni fırsatlar ya da kaçırılan imkanlar belirleyici olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pt_pos7',
    card: 'Two of Pentacles',
    position: 7,
    upright:
      'İki Tılsım, gelecekte mali planlarda esneklik, birden fazla gelir kaynağını yönetme ve denge arayışını gösterir.',
    reversed:
      'Ters İki Tılsım, düzensizlik, dengesizlik veya fazla sorumluluğun mali ilerlemeyi zorlayacağını işaret eder.',
    keywords: ['denge', 'esneklik', 'çok yönlülük', 'uyum', 'zaman yönetimi'],
    context: 'Gelecek mali planlarda denge ya da dengesizlik öne çıkacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pt_pos7',
    card: 'Three of Pentacles',
    position: 7,
    upright:
      'Üç Tılsım, gelecekte işbirliği, ortak projeler ve ekip çalışmasıyla finansal büyümenin geleceğini işaret eder.',
    reversed:
      'Ters Üç Tılsım, uyumsuzluk, ekip içi sorunlar veya işbirliğinin bozulması riskini gösterir.',
    keywords: ['işbirliği', 'ortaklık', 'planlama', 'inşa', 'paylaşım'],
    context:
      'Gelecek mali planlarda işbirliği ya da uyumsuzluk belirleyici olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pt_pos7',
    card: 'Four of Pentacles',
    position: 7,
    upright:
      'Dört Tılsım, gelecekte mali planlarda tasarruf, güvence arayışı ve elde olanı koruma isteğini işaret eder.',
    reversed:
      'Ters Dört Tılsım, aşırı cimrilik, kontrol kaybı veya gereksiz harcamaların mali güveni zorlayacağını gösterir.',
    keywords: ['tasarruf', 'koruma', 'güvence', 'kontrol', 'tutuculuk'],
    context: 'Gelecek mali planlarda koruma ya da aşırılık öne çıkacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pt_pos7',
    card: 'Five of Pentacles',
    position: 7,
    upright:
      'Beş Tılsım, gelecekte mali planlarda zorluk, kayıp ya da destek arayışı gündeme gelebilir. Geçici bir sıkıntıyı gösterir.',
    reversed:
      'Ters Beş Tılsım, toparlanma, yeni destek kaynakları bulma ve mali iyileşme sürecine işaret eder.',
    keywords: ['kayıp', 'yoksunluk', 'destek', 'iyileşme', 'dayanıklılık'],
    context:
      'Gelecek mali planlarda zorluk ya da toparlanma belirleyici olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pt_pos7',
    card: 'Six of Pentacles',
    position: 7,
    upright:
      'Altı Tılsım, gelecekte mali planlarda denge, adalet ve karşılıklı yardımlaşma öne çıkar. Vermek ve almak dengesi korunur.',
    reversed:
      'Ters Altı Tılsım, dengesizlik, bağımlılık veya koşullu yardımların sorun yaratabileceğini işaret eder.',
    keywords: ['denge', 'yardım', 'adalet', 'eşitlik', 'paylaşım'],
    context:
      'Gelecek mali planlarda adil paylaşım ya da dengesizlik etkili olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pt_pos7',
    card: 'Seven of Pentacles',
    position: 7,
    upright:
      'Yedi Tılsım, gelecekte mali planlarda sabır, uzun vadeli yatırımlar ve çabanın karşılığını bekleme sürecini gösterir.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık, kısa vadeli düşünme veya yanlış yatırımların riskini işaret eder.',
    keywords: ['sabır', 'yatırım', 'değerlendirme', 'verim', 'bekleyiş'],
    context: 'Gelecek mali planlarda sabır ya da sabırsızlık öne çıkacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pt_pos7',
    card: 'Eight of Pentacles',
    position: 7,
    upright:
      'Sekiz Tılsım, gelecekte mali planlarda disiplin, emek ve düzenli çalışmanın finansal güvenlik getireceğini işaret eder.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik, motivasyon kaybı veya dağınık çalışmanın başarısızlığa neden olacağını gösterir.',
    keywords: ['emek', 'çalışma', 'disiplin', 'öğrenme', 'başarı'],
    context: 'Gelecek mali planlarda disiplin ya da dağınıklık etkili olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pt_pos7',
    card: 'Nine of Pentacles',
    position: 7,
    upright:
      'Dokuz Tılsım, gelecekte mali planlarda bağımsızlık, kişisel konfor ve emeklerin karşılığını almayı işaret eder.',
    reversed:
      'Ters Dokuz Tılsım, aşırı bağımlılık, savurganlık veya lüks düşkünlüğünün sorun yaratabileceğini gösterir.',
    keywords: ['bağımsızlık', 'konfor', 'emek', 'ödül', 'özgüven'],
    context: 'Gelecek mali planlarda bağımsızlık ya da bağımlılık öne çıkacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pt_pos7',
    card: 'Ten of Pentacles',
    position: 7,
    upright:
      'On Tılsım, gelecekte mali planlarda uzun vadeli istikrar, aile desteği ve kalıcı refah öne çıkacaktır.',
    reversed:
      'Ters On Tılsım, miras sorunları, aile içi mali anlaşmazlıklar veya sürdürülebilir olmayan yapıları işaret eder.',
    keywords: ['istikrar', 'refah', 'aile', 'miras', 'süreklilik'],
    context:
      'Gelecek mali planlarda kalıcı refah ya da ailevi sürtüşmeler öne çıkacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pt_pos7',
    card: 'Page of Pentacles',
    position: 7,
    upright:
      'Tılsım Prensi, gelecekte mali planlarda öğrenme, yeni fırsatları değerlendirme ve küçük ama istikrarlı adımları işaret eder.',
    reversed:
      'Ters Tılsım Prensi, erteleme, dikkatsizlik veya kısa vadeli düşüncenin potansiyeli sınırlayacağını gösterir.',
    keywords: ['öğrenme', 'fırsat', 'başlangıç', 'azim', 'hedef'],
    context: 'Gelecek mali planlarda öğrenme ya da erteleme etkili olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pt_pos7',
    card: 'Knight of Pentacles',
    position: 7,
    upright:
      'Tılsım Şövalyesi, gelecekte mali planlarda sabır, disiplin ve istikrarlı ilerleme öne çıkar.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık, aşırı temkinlilik veya yenilikten kaçınmanın riskini gösterir.',
    keywords: ['istikrar', 'sabır', 'çalışma', 'sorumluluk', 'planlama'],
    context:
      'Gelecek mali planlarda istikrar ya da durağanlık belirleyici olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pt_pos7',
    card: 'Queen of Pentacles',
    position: 7,
    upright:
      'Tılsım Kraliçesi, gelecekte mali planlarda şefkatli liderlik, kaynak yönetimi ve pratik zekanın öne çıkacağını gösterir.',
    reversed:
      'Ters Tılsım Kraliçesi, aşırı yük, öz bakım eksikliği veya kaynakların yanlış kullanımına işaret eder.',
    keywords: ['kaynak', 'pratiklik', 'liderlik', 'öz bakım', 'denge'],
    context:
      'Gelecek mali planlarda kaynak yönetimi ya da öz bakım eksikliği etkili olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pt_pos7',
    card: 'King of Pentacles',
    position: 7,
    upright:
      'Tılsım Kralı, gelecekte mali planlarda stratejik sağlamlık, güçlü yatırımlar ve uzun vadeli refahın hakim olacağını işaret eder.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol, statü hırsı veya kaynakların yanlış yönlendirilme riskini gösterir.',
    keywords: ['strateji', 'refah', 'güvenlik', 'liderlik', 'vizyon'],
    context:
      'Gelecek mali planlarda sağlamlık ya da kontrol hırsı öne çıkacak.',
    group: 'Tılsımlar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyPosition7Meaning(
  card: TarotCard
): MoneyPosition7Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position7Meanings.find(
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
  meaning = position7Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyPosition7MeaningByCardName(
  cardName: string
): MoneyPosition7Meaning | null {
  return position7Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllMoneyposition7Meanings(): MoneyPosition7Meaning[] {
  return position7Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getMoneyposition7MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MoneyPosition7Meaning[] {
  return position7Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition7Meanings = (): I18nMoneyPosition7Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position7Meanings.map(meaning => {
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
export const getI18nPosition7Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nMoneyPosition7Meaning | null => {
  const originalMeaning = position7Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`money.meanings.${cardKey}.Position7.upright`);
  const i18nReversed = t(`money.meanings.${cardKey}.Position7.reversed`);
  const i18nKeywords = t(`money.meanings.${cardKey}.Position7.keywords`);
  const i18nContext = t(`money.meanings.${cardKey}.Position7.context`);
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
const moneyPosition7Exports = {
  position7Meanings,
  getMoneyPosition7Meaning,
  getMoneyPosition7MeaningByCardName,
  getAllMoneyposition7Meanings,
  getMoneyposition7MeaningsByGroup,
  getI18nPosition7Meaning,
};

export default moneyPosition7Exports;
