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

export interface MoneyPosition5Meaning {
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
export interface I18nMoneyPosition5Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position5Meanings: MoneyPosition5Meaning[] = [
  //--- Majör Arkana Kartları ---
  {
    id: 'the_fool_ma_pos5',
    card: 'The Fool',
    position: 5,
    upright:
      'Deli, mali sorumluluklarını hafife alma eğilimini gösterir. Bazen özgürlük arayışı nedeniyle planlar ertelenmiş olabilir. Bu da yükümlülükleri tam yerine getirmeyi zorlaştırır.',
    reversed:
      'Ters Deli, sorumluluklardan kaçma veya dikkatsiz kararların yük getirdiğini işaret eder. Plansız adımlar mali dengeyi bozmuş olabilir.',
    keywords: ['özgürlük', 'sorumluluk', 'plansızlık', 'risk', 'hafiflik'],
    context:
      'Mali sorumluluklarda özgürlük isteği ile disiplin arasında bir çatışma vardır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos5',
    card: 'The Magician',
    position: 5,
    upright:
      'Büyücü, mali sorumluluklarda beceri ve kaynak yönetiminin öne çıktığını gösterir. Zekâ ve irade ile yükümlülükler ustalıkla ele alınmıştır.',
    reversed:
      'Ters Büyücü, manipülasyon veya yanıltıcı kararların mali sorumlulukları ağırlaştırdığını işaret eder. Yüzeysel çözümler uzun vadede yük yaratmıştır.',
    keywords: ['kaynak', 'beceri', 'sorumluluk', 'irade', 'denge'],
    context: 'Mali sorumluluklarda beceri ve bilinçli yönetim öne çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos5',
    card: 'The High Priestess',
    position: 5,
    upright:
      'Başrahibe, mali sorumluluklarda sezgi ve içgörüyle hareket etme eğilimini gösterir. Bazı kararlar iç sesle desteklenmiştir.',
    reversed:
      'Ters Başrahibe, mali sorumluluklarda gizlilik veya bilgisizlik sorun yaratabilir. Açık olmayan konular yükümlülükleri ağırlaştırır.',
    keywords: ['sezgi', 'bilgelik', 'gizlilik', 'sorumluluk', 'karar'],
    context:
      'Mali sorumluluklarda sezgiyle ilerleme ama aynı zamanda şeffaflık ihtiyacı vardır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos5',
    card: 'The Empress',
    position: 5,
    upright:
      'İmparatoriçe, mali sorumluluklarda aileyi, bakım ve ihtiyaçları karşılamayı öne çıkarır. Maddi konular şefkat ve cömertlikle yönetilmiştir.',
    reversed:
      'Ters İmparatoriçe, aşırı harcama veya fazla sahiplenme mali yükleri artırabilir. Kendine ve başkalarına fazlasıyla yüklenme söz konusudur.',
    keywords: ['bakım', 'cömertlik', 'aile', 'harcama', 'yük'],
    context:
      'Mali sorumluluklar, sevdiklerini koruma ve destekleme üzerinden şekillenmiştir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos5',
    card: 'The Emperor',
    position: 5,
    upright:
      'İmparator, mali sorumluluklarda düzen ve disiplin kurma becerisini gösterir. Güven ve yapı bu süreçte temel olmuştur.',
    reversed:
      'Ters İmparator, aşırı kontrol veya katı tutum nedeniyle mali sorumluluklar baskıya dönüşebilir.',
    keywords: ['düzen', 'otorite', 'sorumluluk', 'güven', 'disiplin'],
    context: 'Mali sorumluluklar disiplin ve yapılandırma üzerine kuruludur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos5',
    card: 'The Hierophant',
    position: 5,
    upright:
      'Aziz, mali sorumluluklarda geleneksel yollar, ailevi yükümlülükler veya toplumsal görevler ön planda olabilir.',
    reversed:
      'Ters Aziz, geleneklere körü körüne bağlılık veya aşırı bağımlılık mali yükümlülükleri zorlaştırmıştır.',
    keywords: ['gelenek', 'aile', 'toplum', 'sorumluluk', 'bağımlılık'],
    context:
      'Mali sorumluluklarda geleneksel yöntemler ve toplumsal roller öne çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos5',
    card: 'The Lovers',
    position: 5,
    upright:
      'Aşıklar, mali sorumluluklarda ortak kararların ve işbirliğinin öne çıktığını işaret eder. Partnerle alınan kararlar yükü paylaşmıştır.',
    reversed:
      'Ters Aşıklar, fikir ayrılıkları veya yanlış seçimler mali sorumlulukları ağırlaştırabilir.',
    keywords: ['işbirliği', 'ortaklık', 'karar', 'sorumluluk', 'denge'],
    context: 'Mali sorumluluklar işbirliği veya seçimler üzerinden şekillendi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos5',
    card: 'The Chariot',
    position: 5,
    upright:
      'Savaş Arabası, mali sorumluluklarda kontrol ve kararlılıkla ilerlemeyi gösterir. Hedef odaklı adımlar atılmıştır.',
    reversed:
      'Ters Savaş Arabası, yön kaybı veya kontrolsüzlük mali sorumluluklarda dengesizlik yaratabilir.',
    keywords: ['kontrol', 'kararlılık', 'hedef', 'ilerleme', 'denge'],
    context: 'Mali sorumluluklarda kararlılık ve yön belirleme önemlidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos5',
    card: 'Strength',
    position: 5,
    upright:
      'Güç, mali sorumluluklarda sabır ve öz disiplinin öne çıktığını işaret eder. Duygusal denge ile yükümlülükler yönetilmiştir.',
    reversed:
      'Ters Güç, sabırsızlık veya içsel zayıflık mali sorumlulukları daha zor hale getirmiş olabilir.',
    keywords: ['sabır', 'öz disiplin', 'sorumluluk', 'denge', 'güç'],
    context: 'Mali sorumluluklar sabır ve öz disiplinle taşınmıştır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos5',
    card: 'The Hermit',
    position: 5,
    upright:
      'Ermiş, mali sorumluluklarda yalnız hareket etme veya içsel rehberlik arama eğilimini gösterir. Bireysel kararlarla sorumluluk taşınmıştır.',
    reversed:
      'Ters Ermiş, aşırı izolasyon veya sorumluluklardan kaçınma eğilimi yük getirmiş olabilir.',
    keywords: ['yalnızlık', 'bilgelik', 'sorumluluk', 'rehberlik', 'içe dönüş'],
    context:
      'Mali sorumluluklarda bireysel karar ve içsel rehberlik öne çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos5',
    card: 'The Wheel of Fortune',
    position: 5,
    upright:
      'Kader Çarkı, mali sorumluluklarda döngüsel etkiler olduğunu gösterir. Şans, piyasa ya da dış koşullar yükümlülükleri şekillendirmiştir.',
    reversed:
      'Ters Kader Çarkı, beklenmedik aksilikler ve şanssızlıkların mali sorumlulukları artırdığını işaret eder.',
    keywords: ['döngü', 'şans', 'sorumluluk', 'kader', 'dış koşullar'],
    context:
      'Mali sorumluluklar kaderin döngüsel iniş çıkışlarından etkilenmiştir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos5',
    card: 'Justice',
    position: 5,
    upright:
      'Adalet, mali sorumluluklarda şeffaflık ve adil iş bölümü ön planda olmuştur. Sorumluluklar eşit paylaşılmaya çalışılmıştır.',
    reversed:
      'Ters Adalet, adaletsizlik veya sorumlulukların eşitsiz paylaşımı sorun yaratmıştır.',
    keywords: ['adalet', 'denge', 'sorumluluk', 'şeffaflık', 'eşitlik'],
    context: 'Mali sorumluluklarda adalet ve şeffaflık arayışı vardır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos5',
    card: 'The Hanged Man',
    position: 5,
    upright:
      'Asılan Adam, mali sorumluluklarda fedakarlık veya ertelemeler ön planda olabilir. Bekleyiş, yükümlülüklerin seyrini etkilemiştir.',
    reversed:
      'Ters Asılan Adam, kurban rolüne düşmek ya da kaçış eğilimi sorumlulukları ağırlaştırmıştır.',
    keywords: ['fedakarlık', 'bekleme', 'sorumluluk', 'teslimiyet', 'denge'],
    context:
      'Mali sorumluluklarda fedakarlık veya ertelenmiş kararlar etkili olmuştur.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos5',
    card: 'Death',
    position: 5,
    upright:
      'Ölüm, mali sorumluluklarda köklü dönüşümlerin yaşandığını işaret eder. Eski yükümlülükler kapanmış, yenilerine yer açılmıştır.',
    reversed:
      'Ters Ölüm, değişime direnç veya bitmesi gereken yükümlülükleri sürdürme eğilimi yük getirmiştir.',
    keywords: ['dönüşüm', 'bitiş', 'sorumluluk', 'değişim', 'yenilenme'],
    context:
      'Mali sorumluluklarda eski yükler kapanmış ya da dönüşüm süreci başlamıştır.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos5',
    card: 'Temperance',
    position: 5,
    upright:
      'Denge, mali sorumluluklarda ölçülü ve dengeli bir yaklaşım sergilendiğini gösterir. Yükler uyumla taşınmıştır.',
    reversed:
      'Ters Denge, dengesizlik veya aşırılıklar sorumlulukları zorlaştırmıştır.',
    keywords: ['denge', 'ölçü', 'sorumluluk', 'uyum', 'sabır'],
    context: 'Mali sorumluluklar ölçülülük ve denge arayışı ile yönetilmiştir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos5',
    card: 'The Devil',
    position: 5,
    upright:
      'Şeytan, mali sorumluluklarda bağımlılıklar, borçlar veya baskılar öne çıkmış olabilir. Maddi bağlar yükü ağırlaştırmıştır.',
    reversed:
      'Ters Şeytan, bağımlılıkları kırma ve mali baskılardan özgürleşme sürecine işaret eder.',
    keywords: ['bağımlılık', 'borç', 'sorumluluk', 'baskı', 'özgürleşme'],
    context:
      'Mali sorumluluklar bağımlılık veya baskı kaynaklı ağırlaşmış olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos5',
    card: 'The Tower',
    position: 5,
    upright:
      'Kule, ani krizler veya beklenmedik masrafların mali sorumlulukları artırdığını işaret eder. Çöküş sonrası yeniden yapılanma gerekmiştir.',
    reversed:
      'Ters Kule, krizin ertelenmesi veya görmezden gelinmesi sorumlulukları büyütmüştür.',
    keywords: ['kriz', 'masraf', 'sorumluluk', 'yeniden yapılanma', 'değişim'],
    context: 'Mali sorumluluklar ani krizlerle sarsılmış olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos5',
    card: 'The Star',
    position: 5,
    upright:
      'Yıldız, mali sorumluluklarda umut ve iyileştirme çabalarının öne çıktığını gösterir. Şeffaflık ve güven duygusu yükleri hafifletmiştir.',
    reversed:
      'Ters Yıldız, hayal kırıklığı veya umutsuzluk mali sorumlulukları ağır hissettirmiş olabilir.',
    keywords: ['umut', 'şifa', 'sorumluluk', 'şeffaflık', 'güven'],
    context: 'Mali sorumluluklarda umut ve iyileştirme süreci etkili olmuştur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos5',
    card: 'The Moon',
    position: 5,
    upright:
      'Ay, mali sorumluluklarda belirsizlik veya yanılsamaların rol oynadığını işaret eder. Netlik eksikliği yükleri artırmış olabilir.',
    reversed:
      'Ters Ay, belirsizliklerin çözülmeye başlamasıyla mali sorumluluklarda daha açık bir yol belirlenmiştir.',
    keywords: ['belirsizlik', 'yanılsama', 'sorumluluk', 'korku', 'netlik'],
    context: 'Mali sorumluluklarda belirsizlik ve netlik arayışı öne çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos5',
    card: 'The Sun',
    position: 5,
    upright:
      'Güneş, mali sorumluluklarda başarı, netlik ve iyimserliğin öne çıktığını gösterir. Yükler paylaşılmış ve hafiflemiştir.',
    reversed:
      'Ters Güneş, yanlış iyimserlik veya yüzeysel yaklaşımlar sorumlulukları zorlaştırmış olabilir.',
    keywords: ['başarı', 'iyimserlik', 'sorumluluk', 'netlik', 'paylaşım'],
    context: 'Mali sorumluluklarda netlik ve başarı yükleri hafifletmiştir.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos5',
    card: 'Judgement',
    position: 5,
    upright:
      'Mahkeme, mali sorumluluklarda geçmiş kararların değerlendirilip yeniden yapılandırıldığını işaret eder. Hesaplaşma dönemi olmuştur.',
    reversed:
      'Ters Mahkeme, sorumluluklardan kaçış veya öz eleştiriden uzak durma mali yükleri artırmıştır.',
    keywords: [
      'hesaplaşma',
      'değerlendirme',
      'sorumluluk',
      'karar',
      'yenilenme',
    ],
    context:
      'Mali sorumluluklarda geçmiş kararların sonuçlarıyla yüzleşilmiştir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos5',
    card: 'The World',
    position: 5,
    upright:
      'Dünya, mali sorumluluklarda tamamlanma, başarı ve entegrasyonun öne çıktığını gösterir. Döngü kapanmış, yükümlülükler yerine getirilmiştir.',
    reversed:
      'Ters Dünya, yarım kalmış sorumluluklar veya entegrasyon eksikliği yükün devam ettiğini işaret eder.',
    keywords: ['tamamlanma', 'başarı', 'sorumluluk', 'entegrasyon', 'bütünlük'],
    context: 'Mali sorumluluklarda tamamlanma ve bütünlük süreci öne çıkıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'ace_of_cups_cu_pos5',
    card: 'Ace of Cups',
    position: 5,
    upright:
      'Kupa Ası, mali sorumluluklara karşı kalpten gelen bir istek ve sevgiyle yaklaşmayı gösterir. Ailenize, sevdiklerinize ya da değer verdiğiniz kişilere gönülden destek olabilirsiniz.',
    reversed:
      'Ters Kupa Ası, mali sorumluluklara karşı isteksizlik, gönülsüzlük ya da duygusal tükenmişlik hissini gösterebilir. Kalbinizle bağ kurmadığınız yükler size ağır gelebilir.',
    keywords: ['sorumluluk', 'gönüllülük', 'destek', 'sevgi', 'yük'],
    context:
      'Mali sorumluluklarda gönülden bağlılık ya da gönülsüzlük belirleyici olur.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cu_pos5',
    card: 'Two of Cups',
    position: 5,
    upright:
      'İki Kupa, mali sorumlulukların ortaklık ve karşılıklı uyumla taşındığını gösterir. Karşılıklı destek ve iş birliği yükleri hafifletir.',
    reversed:
      'Ters İki Kupa, mali sorumluluklarda anlaşmazlık, dengesizlik veya karşılıklı beklentilerin uyuşmamasını işaret eder.',
    keywords: ['ortaklık', 'uyum', 'paylaşım', 'dengelenme', 'sorumluluk'],
    context:
      'Mali sorumluluklarda ortaklık ve iş birliği ya da dengesizlik ön plana çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cu_pos5',
    card: 'Three of Cups',
    position: 5,
    upright:
      'Üç Kupa, mali sorumlulukların aile, arkadaşlar ya da topluluk desteğiyle paylaşıldığını gösterir. Kutlamalar, birliktelikler bu yükleri daha hafif kılabilir.',
    reversed:
      'Ters Üç Kupa, mali sorumlulukların dağınık gruplar, yanlış paylaşımlar ya da destek eksikliği nedeniyle zorluk yaratabileceğini işaret eder.',
    keywords: ['topluluk', 'destek', 'paylaşım', 'kutlama', 'sorumluluk'],
    context:
      'Mali sorumluluklarda destekleyici topluluk ya da destek eksikliği ön plana çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cu_pos5',
    card: 'Four of Cups',
    position: 5,
    upright:
      'Dört Kupa, mali sorumluluklara karşı isteksizlik veya tatminsizlik hislerini gösterebilir. Zihniniz geçmişteki yüklerde kalmış olabilir.',
    reversed:
      'Ters Dört Kupa, mali sorumluluklara yeni bir bakış açısı kazanmayı ve yeniden ilgi duymayı işaret eder.',
    keywords: [
      'tatminsizlik',
      'isteksizlik',
      'yenilenme',
      'ilgi',
      'sorumluluk',
    ],
    context:
      'Mali sorumluluklarda isteksizlik ya da yeni bir farkındalık belirleyici olur.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cu_pos5',
    card: 'Five of Cups',
    position: 5,
    upright:
      'Beş Kupa, mali sorumluluklarla ilgili kayıp, pişmanlık veya üzüntüyü işaret eder. Yapılamayanlar kalbi zorlayabilir.',
    reversed:
      'Ters Beş Kupa, mali sorumluluklarda toparlanma ve yeniden umut bulma sürecine girildiğini gösterir.',
    keywords: ['kayıp', 'pişmanlık', 'toparlanma', 'umut', 'sorumluluk'],
    context: 'Mali sorumluluklarda kayıp ve toparlanma döngüsü ön plandadır.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cu_pos5',
    card: 'Six of Cups',
    position: 5,
    upright:
      'Altı Kupa, geçmişten gelen mali sorumluluklar ya da ailevi yükümlülükleri gösterebilir. Çocukluk ya da aile desteği burada etkili olabilir.',
    reversed:
      'Ters Altı Kupa, geçmişten gelen sorumlulukların ilerlemeyi zorlaştırdığını işaret eder.',
    keywords: ['geçmiş', 'aile', 'destek', 'yükümlülük', 'sorumluluk'],
    context:
      'Mali sorumluluklarda geçmişten gelen bağlar ya da engeller öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cu_pos5',
    card: 'Seven of Cups',
    position: 5,
    upright:
      'Yedi Kupa, mali sorumluluklarda çok fazla seçenek veya kafa karışıklığını işaret eder. Karar vermek zor olabilir.',
    reversed:
      'Ters Yedi Kupa, mali sorumluluklarda netleşme ve önceliklerin belirlenmesini gösterir.',
    keywords: ['seçenek', 'kararsızlık', 'netleşme', 'öncelik', 'sorumluluk'],
    context: 'Mali sorumluluklarda kararsızlık ya da netleşme ön plana çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cu_pos5',
    card: 'Eight of Cups',
    position: 5,
    upright:
      'Sekiz Kupa, bazı mali sorumluluklardan bilinçli olarak uzaklaşmayı ve yeni bir yön arayışını gösterir.',
    reversed:
      'Ters Sekiz Kupa, mali sorumluluklardan kopamama ya da geçmiş yükleri bırakmakta zorlanmayı işaret eder.',
    keywords: ['bırakma', 'uzaklaşma', 'yeni yön', 'kopamama', 'sorumluluk'],
    context:
      'Mali sorumluluklarda bırakma ya da bağımlı kalma etkisi öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cu_pos5',
    card: 'Nine of Cups',
    position: 5,
    upright:
      'Dokuz Kupa, mali sorumlulukların tatmin ve doyumla yerine getirildiğini gösterir. Paylaşımlar keyif verebilir.',
    reversed:
      'Ters Dokuz Kupa, mali sorumluluklarda doyumsuzluk ya da yüzeysellik hissini işaret eder.',
    keywords: ['tatmin', 'doyum', 'paylaşım', 'yüzeysellik', 'sorumluluk'],
    context: 'Mali sorumluluklarda tatmin ya da doyumsuzluk etkisi öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cu_pos5',
    card: 'Ten of Cups',
    position: 5,
    upright:
      'On Kupa, mali sorumlulukların aile uyumu ve huzurla yerine getirildiğini gösterir. Ortak mutluluk bu yükleri hafifletir.',
    reversed:
      'Ters On Kupa, mali sorumluluklarda aile içi anlaşmazlıklar veya uyum sorunlarını işaret eder.',
    keywords: ['aile', 'uyum', 'mutluluk', 'sorumluluk', 'denge'],
    context:
      'Mali sorumluluklarda aile uyumu ya da uyumsuzluğu belirleyici olur.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cu_pos5',
    card: 'Page of Cups',
    position: 5,
    upright:
      'Kupa Prensi, mali sorumluluklarda yeni, küçük ve duygusal bir adımı işaret eder. Öğrenme sürecindesiniz.',
    reversed:
      'Ters Kupa Prensi, mali sorumluluklara karşı aşırı naiflik, hayalcillik ya da ciddiyetsizlik gösterebilir.',
    keywords: ['öğrenme', 'naiflik', 'hayal', 'başlangıç', 'sorumluluk'],
    context:
      'Mali sorumluluklarda öğrenme ya da aşırı hayalcilik belirleyici olur.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cu_pos5',
    card: 'Knight of Cups',
    position: 5,
    upright:
      'Kupa Şövalyesi, mali sorumluluklara idealist ve hevesli bir şekilde yaklaşmayı gösterir. Duygu ve romantizm işin içine girebilir.',
    reversed:
      'Ters Kupa Şövalyesi, mali sorumluluklarda tutarsızlık ya da aşırı hayalcilik nedeniyle sıkıntılar yaşanabileceğini işaret eder.',
    keywords: ['idealizm', 'heves', 'tutarsızlık', 'romantizm', 'sorumluluk'],
    context: 'Mali sorumluluklarda heves ya da tutarsızlık etkisi öne çıkar.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cu_pos5',
    card: 'Queen of Cups',
    position: 5,
    upright:
      'Kupa Kraliçesi, mali sorumluluklarda şefkatli ve koruyucu bir tavrı işaret eder. Empati ve sezgiyle hareket edersiniz.',
    reversed:
      'Ters Kupa Kraliçesi, mali sorumluluklarda duygusal sınırların zayıflaması, aşırı yüklenme ya da manipülasyon riskini işaret eder.',
    keywords: ['şefkat', 'empati', 'koruma', 'sınır', 'sorumluluk'],
    context:
      'Mali sorumluluklarda şefkat ya da sınır zayıflığı belirleyici olur.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cu_pos5',
    card: 'King of Cups',
    position: 5,
    upright:
      'Kupa Kralı, mali sorumluluklarda olgun, dengeli ve duygusal açıdan güçlü bir yaklaşımı gösterir. Fırtınalarda bile merkezdesiniz.',
    reversed:
      'Ters Kupa Kralı, mali sorumluluklarda duygularını bastırmak ya da pasif-agresif tutumla hareket etmek sorun yaratabilir.',
    keywords: ['olgunluk', 'denge', 'koruyuculuk', 'liderlik', 'sorumluluk'],
    context:
      'Mali sorumluluklarda olgunluk ya da bastırılmışlık belirleyici olur.',
    group: 'Kupalar',
  },
  {
    id: 'ace_of_swords_sw_pos5',
    card: 'Ace of Swords',
    position: 5,
    upright:
      'Kılıç Ası, mali sorumluluklarda netlik, karar alma ve doğruyu gözetmeyi temsil eder. Açık sözlü olmak yükümlülükleri daha adil kılar.',
    reversed:
      'Ters Kılıç Ası, mali sorumluluklarda yanlış anlaşılma, bulanıklık veya gerçekleri gizleme durumlarını işaret eder.',
    keywords: ['netlik', 'karar', 'adalet', 'hakikat', 'sorumluluk'],
    context:
      'Mali sorumluluklarda doğruluk ve netlik ya da bulanıklık ön planda olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sw_pos5',
    card: 'Two of Swords',
    position: 5,
    upright:
      'İki Kılıç, mali sorumluluklarda karar vermek için denge ve tarafsızlık gerektiğini gösterir. İkilem olabilir.',
    reversed:
      'Ters İki Kılıç, mali sorumluluklarda yüzleşmekten kaçınma veya anlaşmazlıkları görmezden gelmeyi işaret eder.',
    keywords: ['ikilem', 'karar', 'denge', 'yüzleşme', 'sorumluluk'],
    context:
      'Mali sorumluluklarda karar verme zorluğu veya kaçınma görülebilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sw_pos5',
    card: 'Three of Swords',
    position: 5,
    upright:
      'Üç Kılıç, mali sorumluluklarda kırgınlık, hayal kırıklığı veya anlaşmazlıkları gösterebilir. Paylaşımlar kalbi zorlayabilir.',
    reversed:
      'Ters Üç Kılıç, mali sorumluluklarda iyileşme, barışma ve ortak yükleri onarma sürecine girildiğini gösterir.',
    keywords: [
      'hayal kırıklığı',
      'anlaşmazlık',
      'iyileşme',
      'barışma',
      'sorumluluk',
    ],
    context: 'Mali sorumluluklarda kırgınlık ya da onarım süreçleri öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sw_pos5',
    card: 'Four of Swords',
    position: 5,
    upright:
      'Dört Kılıç, mali sorumluluklarda dinlenme, ara verme ya da yeniden planlama ihtiyacını gösterir. Fazla yükler yorgunluk yaratabilir.',
    reversed:
      'Ters Dört Kılıç, mali sorumluluklarda mola vermeyi reddetmek veya sürekli stres altında kalmayı işaret eder.',
    keywords: ['dinlenme', 'planlama', 'yük', 'stres', 'sorumluluk'],
    context:
      'Mali sorumluluklarda mola vermek ya da yorgunluk belirleyici olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sw_pos5',
    card: 'Five of Swords',
    position: 5,
    upright:
      'Beş Kılıç, mali sorumluluklarda çatışma, haklı çıkma isteği veya bencillik nedeniyle sorunları işaret eder.',
    reversed:
      'Ters Beş Kılıç, mali sorumluluklarda barış, uzlaşma ve kırgınlıkları onarma isteğini gösterir.',
    keywords: ['çatışma', 'ego', 'uzlaşma', 'haklılık', 'sorumluluk'],
    context: 'Mali sorumluluklarda çatışma ya da uzlaşma öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sw_pos5',
    card: 'Six of Swords',
    position: 5,
    upright:
      'Altı Kılıç, mali sorumluluklarda daha sakin bir döneme geçişi işaret eder. Zorluklardan uzaklaşma arzusu vardır.',
    reversed:
      'Ters Altı Kılıç, mali sorumluluklardan uzaklaşamamak, geçmişin yüklerini taşımaya devam etmek anlamına gelebilir.',
    keywords: ['geçiş', 'uzaklaşma', 'huzur', 'geçmiş yük', 'sorumluluk'],
    context: 'Mali sorumluluklarda geçiş ya da geçmişe bağlılık ön plandadır.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sw_pos5',
    card: 'Seven of Swords',
    position: 5,
    upright:
      'Yedi Kılıç, mali sorumluluklarda gizlilik, strateji ya da yükümlülüklerden kaçma eğilimini gösterebilir.',
    reversed:
      'Ters Yedi Kılıç, mali sorumluluklarda dürüstlüğe dönüş, gizlenen gerçeklerin açığa çıkışı veya hesap verme sürecini işaret eder.',
    keywords: ['gizlilik', 'strateji', 'kaçınma', 'dürüstlük', 'sorumluluk'],
    context: 'Mali sorumluluklarda gizlenme ya da açıklık belirleyici olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sw_pos5',
    card: 'Eight of Swords',
    position: 5,
    upright:
      'Sekiz Kılıç, mali sorumluluklarda çaresizlik, kısıtlı hissetme veya hareket alanının daralmasını işaret eder.',
    reversed:
      'Ters Sekiz Kılıç, mali sorumluluklarda özgürleşme, engellerden kurtulma ya da çözüm bulma sürecine girildiğini gösterir.',
    keywords: ['çaresizlik', 'kısıtlılık', 'özgürleşme', 'engel', 'sorumluluk'],
    context:
      'Mali sorumluluklarda çaresizlik ya da özgürleşme etkisi öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sw_pos5',
    card: 'Nine of Swords',
    position: 5,
    upright:
      'Dokuz Kılıç, mali sorumluluklarla ilgili yoğun kaygı, stres ve uykusuzluk anlamına gelir. Endişeler zihni yorabilir.',
    reversed:
      'Ters Dokuz Kılıç, mali sorumluluklarda kaygıların hafiflemesi, daha rasyonel bir yaklaşım kazanmayı işaret eder.',
    keywords: ['kaygı', 'stres', 'endişe', 'hafifleme', 'sorumluluk'],
    context: 'Mali sorumluluklarda kaygı ya da sakinleşme öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sw_pos5',
    card: 'Ten of Swords',
    position: 5,
    upright:
      'On Kılıç, mali sorumluluklarda ağır bir yükün sona erdiğini veya zor bir döngünün kapandığını işaret eder.',
    reversed:
      'Ters On Kılıç, mali sorumluluklarda toparlanma, yeniden ayağa kalkma ve yeni bir başlangıç yapma sürecini gösterir.',
    keywords: ['son', 'bitiş', 'yenilenme', 'toparlanma', 'sorumluluk'],
    context: 'Mali sorumluluklarda bitiş ya da yeniden doğuş ön plana çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sw_pos5',
    card: 'Page of Swords',
    position: 5,
    upright:
      'Kılıç Prensi, mali sorumluluklarda merak, öğrenme isteği ve dikkatli gözlem yapmayı işaret eder.',
    reversed:
      'Ters Kılıç Prensi, mali sorumluluklarda yüzeysellik, dedikoduya dayalı kararlar veya yetersiz bilgiyle hareket etmeyi gösterir.',
    keywords: ['öğrenme', 'merak', 'gözlem', 'yüzeysellik', 'sorumluluk'],
    context: 'Mali sorumluluklarda öğrenme ya da yüzeysellik etkisi öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sw_pos5',
    card: 'Knight of Swords',
    position: 5,
    upright:
      'Kılıç Şövalyesi, mali sorumluluklara hızlı ve kararlı bir şekilde yaklaşmayı işaret eder. İlerleme cesurca yapılır.',
    reversed:
      'Ters Kılıç Şövalyesi, mali sorumluluklarda aceleci, agresif ya da plansız kararları işaret eder.',
    keywords: ['hız', 'kararlılık', 'cesaret', 'acelecilik', 'sorumluluk'],
    context: 'Mali sorumluluklarda cesaret ya da acelecilik ön plana çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sw_pos5',
    card: 'Queen of Swords',
    position: 5,
    upright:
      'Kılıç Kraliçesi, mali sorumluluklarda mantık, bağımsızlık ve net iletişimi temsil eder. Adalet duygusu yükleri kolaylaştırır.',
    reversed:
      'Ters Kılıç Kraliçesi, mali sorumluluklarda aşırı eleştiri, soğukluk ya da duygusuzluk nedeniyle sorunların büyüyebileceğini işaret eder.',
    keywords: ['mantık', 'bağımsızlık', 'adalet', 'eleştiri', 'sorumluluk'],
    context: 'Mali sorumluluklarda adalet ya da eleştiri belirleyici olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sw_pos5',
    card: 'King of Swords',
    position: 5,
    upright:
      'Kılıç Kralı, mali sorumluluklarda disiplin, strateji ve adil liderliği işaret eder. Rasyonel yaklaşım başarı getirir.',
    reversed:
      'Ters Kılıç Kralı, mali sorumluluklarda aşırı otoriter, katı ya da empati eksikliğiyle yaklaşmayı işaret eder.',
    keywords: ['disiplin', 'strateji', 'adalet', 'otorite', 'sorumluluk'],
    context: 'Mali sorumluluklarda disiplin ya da katılık öne çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'ace_of_pentacles_pe_pos5',
    card: 'Ace of Pentacles',
    position: 5,
    upright:
      'Tılsım Ası, mali sorumluluklarda yeni fırsat ve sağlam bir temel kurma şansını gösterir. Maddi istikrar için güçlü bir başlangıç yapılabilir.',
    reversed:
      'Ters Tılsım Ası, mali sorumluluklarda kaçırılmış fırsatlar ya da yanlış yatırımların yük oluşturduğunu işaret eder.',
    keywords: ['başlangıç', 'fırsat', 'istikrar', 'yatırım', 'sorumluluk'],
    context:
      'Mali sorumluluklarda sağlam temeller ya da kayıp fırsatlar ön plandadır.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pe_pos5',
    card: 'Two of Pentacles',
    position: 5,
    upright:
      'İki Tılsım, mali sorumluluklarda denge, bütçe yönetimi ve çoklu görevleri temsil eder. Esneklik yükleri kolaylaştırır.',
    reversed:
      'Ters İki Tılsım, mali sorumluluklarda dengesizlik, borçların üst üste binmesi ya da kötü zamanlama işaretidir.',
    keywords: ['denge', 'esneklik', 'bütçe', 'çoklu görev', 'sorumluluk'],
    context: 'Mali sorumluluklarda denge ya da dengesizlik öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pe_pos5',
    card: 'Three of Pentacles',
    position: 5,
    upright:
      'Üç Tılsım, mali sorumlulukların işbirliği, ekip çalışması ve rol paylaşımıyla kolaylaştığını gösterir.',
    reversed:
      'Ters Üç Tılsım, mali sorumluluklarda uyumsuzluk, anlaşmazlık ya da yetersiz işbirliğini işaret eder.',
    keywords: ['işbirliği', 'rol paylaşımı', 'emek', 'uyum', 'sorumluluk'],
    context:
      'Mali sorumluluklarda işbirliği ya da uyumsuzluk belirleyici olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pe_pos5',
    card: 'Four of Pentacles',
    position: 5,
    upright:
      'Dört Tılsım, mali sorumluluklarda tutumlu olmak, elde olanı korumak ve güvence arayışını gösterir.',
    reversed:
      'Ters Dört Tılsım, mali sorumluluklarda cimrilik, aşırı kontrol veya paylaşmak istememe sorun yaratabilir.',
    keywords: ['tasarruf', 'koruma', 'güvence', 'kontrol', 'sorumluluk'],
    context:
      'Mali sorumluluklarda tutumlu yaklaşım ya da aşırı kontrol öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pe_pos5',
    card: 'Five of Pentacles',
    position: 5,
    upright:
      'Beş Tılsım, mali sorumluluklarda yoksunluk, kayıp veya destek ihtiyacını temsil eder.',
    reversed:
      'Ters Beş Tılsım, mali sorumluluklarda toparlanma, yeni fırsatlar veya destek bulma sürecini gösterir.',
    keywords: ['yoksunluk', 'destek', 'kaynak', 'toparlanma', 'sorumluluk'],
    context: 'Mali sorumluluklarda kayıp ya da toparlanma ön plandadır.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pe_pos5',
    card: 'Six of Pentacles',
    position: 5,
    upright:
      'Altı Tılsım, mali sorumluluklarda denge, paylaşım ve karşılıklı destek anlamına gelir. Eşitlik önemlidir.',
    reversed:
      'Ters Altı Tılsım, mali sorumluluklarda eşitsizlik, bağımlı ilişkiler ya da adaletsizlik sorun yaratabilir.',
    keywords: ['denge', 'paylaşım', 'destek', 'adalet', 'sorumluluk'],
    context:
      'Mali sorumluluklarda adil paylaşım ya da eşitsizlik etkisi görülür.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pe_pos5',
    card: 'Seven of Pentacles',
    position: 5,
    upright:
      'Yedi Tılsım, mali sorumluluklarda sabır, uzun vadeli planlama ve değerlendirmeyi işaret eder.',
    reversed:
      'Ters Yedi Tılsım, mali sorumluluklarda sabırsızlık, acele sonuç bekleme ya da yanlış yatırımları gösterir.',
    keywords: ['sabır', 'planlama', 'değerlendirme', 'yatırım', 'sorumluluk'],
    context: 'Mali sorumluluklarda sabır ya da sabırsızlık belirleyici olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pe_pos5',
    card: 'Eight of Pentacles',
    position: 5,
    upright:
      'Sekiz Tılsım, mali sorumluluklarda disiplin, çalışma azmi ve ustalaşma sürecini temsil eder.',
    reversed:
      'Ters Sekiz Tılsım, mali sorumluluklarda özensizlik, yarım işler ya da motivasyon eksikliği sorun yaratır.',
    keywords: ['çalışma', 'disiplin', 'ustalık', 'özen', 'sorumluluk'],
    context: 'Mali sorumluluklarda emek ya da özensizlik öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pe_pos5',
    card: 'Nine of Pentacles',
    position: 5,
    upright:
      'Dokuz Tılsım, mali sorumluluklarda bağımsızlık, konfor ve kişisel tatmin anlamına gelir.',
    reversed:
      'Ters Dokuz Tılsım, mali sorumluluklarda bağımlılık, savurganlık veya aşırı harcamaları işaret eder.',
    keywords: [
      'bağımsızlık',
      'konfor',
      'öz değer',
      'savurganlık',
      'sorumluluk',
    ],
    context: 'Mali sorumluluklarda bağımsızlık ya da bağımlılık öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pe_pos5',
    card: 'Ten of Pentacles',
    position: 5,
    upright:
      'On Tılsım, mali sorumluluklarda aile, miras ve uzun vadeli güvenceyi temsil eder.',
    reversed:
      'Ters On Tılsım, mali sorumluluklarda aile içi çatışmalar, miras sorunları veya istikrarsızlık anlamına gelir.',
    keywords: ['aile', 'miras', 'istikrar', 'uzun vadeli plan', 'sorumluluk'],
    context: 'Mali sorumluluklarda güvence ya da ailevi sorunlar etkili olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pe_pos5',
    card: 'Page of Pentacles',
    position: 5,
    upright:
      'Tılsım Prensi, mali sorumluluklarda öğrenme, yeni beceri geliştirme ve küçük yatırımları işaret eder.',
    reversed:
      'Ters Tılsım Prensi, mali sorumluluklarda dağınık enerji, erteleme veya bilgisizce yüklenmeyi gösterir.',
    keywords: ['öğrenme', 'başlangıç', 'yatırım', 'erteleme', 'sorumluluk'],
    context: 'Mali sorumluluklarda öğrenme ya da dağınıklık öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pe_pos5',
    card: 'Knight of Pentacles',
    position: 5,
    upright:
      'Tılsım Şövalyesi, mali sorumluluklarda disiplin, güvenilirlik ve sürekli çabayı işaret eder.',
    reversed:
      'Ters Tılsım Şövalyesi, mali sorumluluklarda durağanlık, sıkıcılık ya da aşırı yavaş ilerleme sorun yaratabilir.',
    keywords: [
      'disiplin',
      'güvenilirlik',
      'istikrar',
      'yavaşlık',
      'sorumluluk',
    ],
    context: 'Mali sorumluluklarda güvenilirlik ya da durağanlık öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pe_pos5',
    card: 'Queen of Pentacles',
    position: 5,
    upright:
      'Tılsım Kraliçesi, mali sorumluluklarda şefkat, aileyi gözetmek ve kaynakları dengeli kullanmayı işaret eder.',
    reversed:
      'Ters Tılsım Kraliçesi, mali sorumluluklarda aşırı yüklenme, öz bakım eksikliği ya da tükenmişliği gösterebilir.',
    keywords: ['şefkat', 'aile', 'denge', 'öz bakım', 'sorumluluk'],
    context: 'Mali sorumluluklarda denge ya da tükenmişlik belirleyici olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pe_pos5',
    card: 'King of Pentacles',
    position: 5,
    upright:
      'Tılsım Kralı, mali sorumluluklarda güçlü liderlik, maddi güvence ve stratejik yönetimi işaret eder.',
    reversed:
      'Ters Tılsım Kralı, mali sorumluluklarda aşırı kontrol, statü takıntısı ya da baskıcı tavırları gösterebilir.',
    keywords: ['liderlik', 'güvence', 'strateji', 'kontrol', 'sorumluluk'],
    context: 'Mali sorumluluklarda liderlik ya da baskı öne çıkar.',
    group: 'Tılsımlar',
  },
  {
    id: 'ace_of_wands_wa_pos5',
    card: 'Ace of Wands',
    position: 5,
    upright:
      'Değnek Ası, mali sorumluluklarda yeni fırsat, ilham ve girişim enerjisini gösterir. Cesur adımlar atmak yükümlülükleri hafifletebilir.',
    reversed:
      'Ters Değnek Ası, mali sorumluluklarda motivasyon eksikliği, erteleme ya da fırsatları değerlendirememe anlamına gelir.',
    keywords: ['fırsat', 'ilham', 'girişim', 'motivasyon', 'sorumluluk'],
    context:
      'Mali sorumluluklarda yeni ilham ya da motivasyon eksikliği belirleyicidir.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_wa_pos5',
    card: 'Two of Wands',
    position: 5,
    upright:
      'İki Değnek, mali sorumluluklarda planlama, ileriye dönük vizyon ve seçenekleri değerlendirmeyi işaret eder.',
    reversed:
      'Ters İki Değnek, mali sorumluluklarda vizyonsuzluk, risk almaktan kaçınma veya sıkışmışlık gösterebilir.',
    keywords: ['planlama', 'vizyon', 'risk', 'karar', 'sorumluluk'],
    context: 'Mali sorumluluklarda vizyon ya da sıkışma etkili olur.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_wa_pos5',
    card: 'Three of Wands',
    position: 5,
    upright:
      'Üç Değnek, mali sorumluluklarda genişleme, işbirlikleri ve uzun vadeli fırsatların değerlendirilmesini işaret eder.',
    reversed:
      'Ters Üç Değnek, mali sorumluluklarda gecikmeler, dar bakış açısı veya ilerlemenin engellenmesini gösterir.',
    keywords: [
      'genişleme',
      'işbirliği',
      'uzun vadeli plan',
      'vizyon',
      'sorumluluk',
    ],
    context: 'Mali sorumluluklarda genişleme ya da gecikme öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_wa_pos5',
    card: 'Four of Wands',
    position: 5,
    upright:
      'Dört Değnek, mali sorumluluklarda istikrar, kutlama ve temel sağlamlaştırmayı işaret eder.',
    reversed:
      'Ters Dört Değnek, mali sorumluluklarda geçici istikrarsızlık, düzensizlik veya yarım kalmış işler anlamına gelir.',
    keywords: ['istikrar', 'temel', 'kutlama', 'aile', 'sorumluluk'],
    context: 'Mali sorumluluklarda istikrar ya da düzensizlik ön plandadır.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_wa_pos5',
    card: 'Five of Wands',
    position: 5,
    upright:
      'Beş Değnek, mali sorumluluklarda rekabet, tartışma veya fikir ayrılıklarını gösterir.',
    reversed:
      'Ters Beş Değnek, mali sorumluluklarda barışma, anlaşmazlıkların çözülmesi ve uyum sürecini işaret eder.',
    keywords: ['rekabet', 'tartışma', 'çözüm', 'uyum', 'sorumluluk'],
    context: 'Mali sorumluluklarda çatışma ya da çözüm etkili olur.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_wa_pos5',
    card: 'Six of Wands',
    position: 5,
    upright:
      'Altı Değnek, mali sorumluluklarda başarı, takdir ve görünür ilerlemeyi işaret eder.',
    reversed:
      'Ters Altı Değnek, mali sorumluluklarda takdir eksikliği, başarısızlık korkusu veya görünmez emeği gösterir.',
    keywords: ['başarı', 'takdir', 'ilerleme', 'görünürlük', 'sorumluluk'],
    context: 'Mali sorumluluklarda başarı ya da değersizlik hissi öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_wa_pos5',
    card: 'Seven of Wands',
    position: 5,
    upright:
      'Yedi Değnek, mali sorumluluklarda savunma, pozisyonunu koruma ve mücadeleyi işaret eder.',
    reversed:
      'Ters Yedi Değnek, mali sorumluluklarda yorgunluk, direnç kaybı veya aşırı savunmacılığı gösterebilir.',
    keywords: ['savunma', 'koruma', 'direnç', 'mücadele', 'sorumluluk'],
    context: 'Mali sorumluluklarda mücadele ya da yorgunluk belirleyici olur.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_wa_pos5',
    card: 'Eight of Wands',
    position: 5,
    upright:
      'Sekiz Değnek, mali sorumluluklarda hızlı gelişmeler, haberler veya ivmeyi temsil eder.',
    reversed:
      'Ters Sekiz Değnek, mali sorumluluklarda gecikmeler, karışıklık veya yavaş ilerleme anlamına gelir.',
    keywords: ['hız', 'ivme', 'haber', 'gelişme', 'sorumluluk'],
    context: 'Mali sorumluluklarda hız ya da gecikme ön plandadır.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_wa_pos5',
    card: 'Nine of Wands',
    position: 5,
    upright:
      'Dokuz Değnek, mali sorumluluklarda direnç, dayanıklılık ve son bir gayreti temsil eder.',
    reversed:
      'Ters Dokuz Değnek, mali sorumluluklarda yorgunluk, tükenmişlik veya savunma isteğinin azalmasını işaret eder.',
    keywords: ['direnç', 'dayanıklılık', 'mücadele', 'tükenme', 'sorumluluk'],
    context: 'Mali sorumluluklarda dayanıklılık ya da tükenme öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_wa_pos5',
    card: 'Ten of Wands',
    position: 5,
    upright:
      'On Değnek, mali sorumluluklarda ağır yükler, fazlalık ve baskıyı işaret eder.',
    reversed:
      'Ters On Değnek, mali sorumluluklarda yükleri azaltma, paylaşma ya da sorumlulukları bırakma ihtiyacını gösterir.',
    keywords: ['yük', 'sorumluluk', 'fazlalık', 'baskı', 'paylaşım'],
    context:
      'Mali sorumluluklarda yük ya da yükün hafiflemesi belirleyici olur.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_wa_pos5',
    card: 'Page of Wands',
    position: 5,
    upright:
      'Değnek Prensi, mali sorumluluklarda öğrenme hevesi, yeni projeler ve keşfetmeyi temsil eder.',
    reversed:
      'Ters Değnek Prensi, mali sorumluluklarda dağınıklık, dikkatsizlik ya da aceleyle yapılan işleri işaret eder.',
    keywords: ['öğrenme', 'keşif', 'heves', 'dikkat', 'sorumluluk'],
    context: 'Mali sorumluluklarda heves ya da dikkatsizlik etkili olur.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_wa_pos5',
    card: 'Knight of Wands',
    position: 5,
    upright:
      'Değnek Şövalyesi, mali sorumluluklarda cesaret, hızlı ilerleme ve tutkulu adımları işaret eder.',
    reversed:
      'Ters Değnek Şövalyesi, mali sorumluluklarda sabırsızlık, savrukluk veya istikrarsızlık gösterebilir.',
    keywords: ['cesaret', 'tutku', 'hız', 'istikrar', 'sorumluluk'],
    context: 'Mali sorumluluklarda cesaret ya da istikrarsızlık öne çıkar.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_wa_pos5',
    card: 'Queen of Wands',
    position: 5,
    upright:
      'Değnek Kraliçesi, mali sorumluluklarda özgüven, liderlik ve kaynakları verimli kullanmayı temsil eder.',
    reversed:
      'Ters Değnek Kraliçesi, mali sorumluluklarda kıskançlık, güvensizlik veya aşırı kontrolü işaret eder.',
    keywords: ['özgüven', 'liderlik', 'kaynak yönetimi', 'güven', 'sorumluluk'],
    context: 'Mali sorumluluklarda özgüven ya da güvensizlik belirleyici olur.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_wa_pos5',
    card: 'King of Wands',
    position: 5,
    upright:
      'Değnek Kralı, mali sorumluluklarda vizyoner liderlik, stratejik kararlar ve uzun vadeli planlamayı işaret eder.',
    reversed:
      'Ters Değnek Kralı, mali sorumluluklarda baskıcı tutum, otoriter davranış ya da aşırı risk almayı gösterebilir.',
    keywords: ['liderlik', 'vizyon', 'strateji', 'risk', 'sorumluluk'],
    context:
      'Mali sorumluluklarda vizyoner bakış ya da baskıcı tutum ön plandadır.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyPosition5Meaning(
  card: TarotCard
): MoneyPosition5Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = Position5Meanings.find(
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
  meaning = Position5Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyPosition5MeaningByCardName(
  cardName: string
): MoneyPosition5Meaning | null {
  return Position5Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllMoneyPosition5Meanings(): MoneyPosition5Meaning[] {
  return Position5Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getMoneyPosition5MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MoneyPosition5Meaning[] {
  return Position5Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nPosition5Meanings = (): I18nMoneyPosition5Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return Position5Meanings.map(meaning => {
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
export const getI18nPosition5Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nMoneyPosition5Meaning | null => {
  const originalMeaning = Position5Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`money.meanings.${cardKey}.Position5.upright`);
  const i18nReversed = t(`money.meanings.${cardKey}.Position5.reversed`);
  const i18nKeywords = t(`money.meanings.${cardKey}.Position5.keywords`);
  const i18nContext = t(`money.meanings.${cardKey}.Position5.context`);
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
const moneyPosition5Exports = {
  Position5Meanings,
  getMoneyPosition5Meaning,
  getMoneyPosition5MeaningByCardName,
  getAllMoneyPosition5Meanings,
  getMoneyPosition5MeaningsByGroup,
  getI18nPosition5Meaning,
};

export default moneyPosition5Exports;
