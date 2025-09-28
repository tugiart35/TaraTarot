/*
info:
---
Dosya Amacı:
- Problem Çözme açılımında 1. pozisyon (Mevcut Durum) için özel kart anlamları
- Her kartın bu pozisyonda nasıl yorumlanacağını belirler
- Pozisyon özel anlamlar + genel kart anlamlarını birleştirir

Bağlı Dosyalar:
- position-meanings-index.ts (ana index dosyası)
- RelationshipAnalysisTarot.tsx (ana bileşen)

Üretime Hazır mı?:
- Evet, detaylı anlamlar mevcut
---

*/

import { TarotCard } from '@/types/tarot';

export interface RelationshipAnalysisPosition2Meaning {
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
export interface I18nRelationshipAnalysisPosition2Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position2Meanings: RelationshipAnalysisPosition2Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ra_pos2',
    card: 'The Fool',
    position: 2,
    upright:
      'Deli, kalbinizde özgürlük ve yeni bir sayfa açma isteğini gösterir. İçinizde maceraya açılan saf bir enerji var.',
    reversed:
      'Ters Deli, bağlanma korkusu ve kararsızlığın hislerinizi savurduğunu söyler. İçte özgürlük kaybı korkusu olabilir. Belirti: Belirsizlik, iniş çıkış.',
    keywords: ['özgürlük', 'heves', 'belirsizlik', 'macera', 'kararsızlık'],
    context:
      'Şu an duygularınız yeniye açılıyor. Özgürlük arzusu ile bağ isteği arasında çelişki yaşıyorsunuz. Bu ikilik hislerinize damga vuruyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ra_pos2',
    card: 'The Magician',
    position: 2,
    upright:
      'Büyücü, hislerinizde güçlü bir niyet ve çekim olduğunu gösterir. Partnerinize yön verebilecek kadar yoğun hissediyorsunuz.',
    reversed:
      'Ters Büyücü, niyetlerinizi ifade edememek ve tutarsız hislerin bağı gölgelediğini anlatır. Belirti: Yarım kalmış sözler.',
    keywords: ['çekim', 'niyet', 'ifade', 'güç', 'iletişim'],
    context:
      'Şu an kalbinizde çok şey var ama aktarımda zorluk olabilir. Netlik ve açıklık hislerinizi hafifletecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ra_pos2',
    card: 'The High Priestess',
    position: 2,
    upright:
      'Başrahibe, duygularınızı derinde sakladığınızı söyler. Sezgileriniz kuvvetli ama paylaşmakta çekingen hissediyorsunuz.',
    reversed:
      'Ters Başrahibe, bastırılmış duyguların suskunluğa dönüştüğünü gösterir. Bu durum yakınlıkta mesafe yaratıyor. Belirti: Sessizlik ve şüphe.',
    keywords: ['sezgi', 'giz', 'içsel dünya', 'suskunluk', 'mesafe'],
    context:
      'Şu an çok hissediyor ama azını paylaşıyorsunuz. Açıklık kurmak kalbinizi dengeleyecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ra_pos2',
    card: 'The Empress',
    position: 2,
    upright:
      'İmparatoriçe, kalbinizde sevgi verme ve besleme isteğinin baskın olduğunu söyler. Şefkatle dokunmak sizin için doğal.',
    reversed:
      'Ters İmparatoriçe, aşırı sahiplenme veya öz bakım eksikliğinin hislerinizi zorladığını söyler. Belirti: Tükenmiş şefkat, kıskançlık.',
    keywords: ['şefkat', 'besleme', 'bolluk', 'dişil enerji', 'uyum'],
    context:
      'Şu an sevgi verme arzunuz öne çıkıyor. Fakat kendi ihtiyaçlarınızı gözetmek dengeyi koruyacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ra_pos2',
    card: 'The Emperor',
    position: 2,
    upright:
      'İmparator, hislerinizde düzen, güven ve sağlamlık arzusunu gösterir. Kalbiniz istikrarla huzur bulmak istiyor.',
    reversed:
      'Ters İmparator, katı kurallara sarılmanın duygularınızı sertleştirdiğini söyler. Belirti: İnat ve kontrol isteği.',
    keywords: ['güven', 'sınır', 'düzen', 'kontrol', 'otorite'],
    context:
      'Şu an güven ve istikrar arıyorsunuz. Esneklik kalbinizi yumuşatacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ra_pos2',
    card: 'The Hierophant',
    position: 2,
    upright:
      'Aziz, hislerinizin değerler ve geleneklerle uyum aradığını gösterir. Onaylanma isteğiniz güçlü olabilir.',
    reversed:
      'Ters Aziz, kalıplara sıkışma ya da kör başkaldırının hislerinizi çelişkide bıraktığını gösterir. Belirti: Uyumsuzluk.',
    keywords: ['değer', 'inanç', 'ritüel', 'uyum', 'onay'],
    context:
      'Şu an aidiyet arayışındasınız ama özgünlüğünüz de ses veriyor. İçsel pusulayı takip etmek şifa getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ra_pos2',
    card: 'The Lovers',
    position: 2,
    upright:
      'Aşıklar, hislerinizde seçim ve uyum arzusunu gösterir. Partnerinizle değerlerde buluşmak istiyorsunuz.',
    reversed:
      'Ters Aşıklar, kararsızlık ve değer çatışmasının hislerinizi zorladığını söyler. Belirti: Git–kal salınımı.',
    keywords: ['seçim', 'uyum', 'karar', 'değer', 'bağ'],
    context:
      'Şu an kararsızlık yaşıyorsunuz. Değer uyumunu gözden geçirmek hislerinizi rahatlatacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ra_pos2',
    card: 'The Chariot',
    position: 2,
    upright:
      'Savaş Arabası, hislerinizin kontrol ve ilerleme arzusuyla dolu olduğunu gösterir. Hızla yol almak istiyorsunuz.',
    reversed:
      'Ters Savaş Arabası, savrulma ve yönsüzlüğün hislerinizi yorduğunu söyler. Belirti: Erteleme–acele döngüsü.',
    keywords: ['yön', 'kontrol', 'ivme', 'disiplin', 'odak'],
    context:
      'Şu an hisleriniz hız ve yön arıyor. Senkron yakalamak huzur getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ra_pos2',
    card: 'Strength',
    position: 2,
    upright:
      'Güç, sabır ve şefkatin duygularınızda ön planda olduğunu söyler. Kalbiniz nazik cesaretle bağ kurmak istiyor.',
    reversed:
      'Ters Güç, sabırsızlık ve kıskançlığın hislerinizi gölgelediğini söyler. Belirti: Küçük tetik–büyük tepki.',
    keywords: ['şefkat', 'sabır', 'cesaret', 'özgüven', 'naziklik'],
    context:
      'Şu an hisleriniz sakin güçle ilerliyor. Nazik cesaret kapıları açacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ra_pos2',
    card: 'The Hermit',
    position: 2,
    upright:
      'Ermiş, duygularınızda içsel sorgulama ve yalnızlık isteğini gösterir. İçsel ışığınızı arıyorsunuz.',
    reversed:
      'Ters Ermiş, aşırı geri çekilmenin hislerinizi mesafeli hale getirdiğini söyler. Belirti: İçsel kapanış.',
    keywords: ['içe dönüş', 'yalnızlık', 'rehberlik', 'mesafe', 'sessizlik'],
    context:
      'Şu an hisleriniz içe dönük. İçsel cevap aranıyor. Açık paylaşım köprü kuracak.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ra_pos2',
    card: 'The Wheel of Fortune',
    position: 2,
    upright:
      'Kader Çarkı, hislerinizin döngüler ve şansla değiştiğini gösterir. Kalbiniz sürekli hareket halinde.',
    reversed:
      'Ters Kader Çarkı, tekrar eden döngülerin hislerinizi zorladığını söyler. Belirti: Aynı hataları görmek.',
    keywords: ['döngü', 'zamanlama', 'alışkanlık', 'değişim', 'şans'],
    context:
      'Şu an hisleriniz dalgalı. Kalıbı kırmak duygularınızı özgürleştirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ra_pos2',
    card: 'Justice',
    position: 2,
    upright:
      'Adalet, hislerinizde denge ve eşitlik isteğini gösterir. Hakkaniyet kalbinizde önemli.',
    reversed:
      'Ters Adalet, çifte standart ya da içsel suçluluk duygularınızı gölgeleyebilir. Belirti: İçerleme.',
    keywords: ['adalet', 'denge', 'sorumluluk', 'şeffaflık', 'karar'],
    context:
      'Şu an kalbinizde adil olmak baskın. İç hesaplaşma dengeyi getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ra_pos2',
    card: 'The Hanged Man',
    position: 2,
    upright:
      'Asılan Adam, hislerinizde bekleyiş ve fedakarlık enerjisini gösterir. Kalbiniz farklı açıdan bakmaya çağrılıyor.',
    reversed:
      'Ters Asılan Adam, tek taraflı fedakarlığın hislerinizi yorduğunu gösterir. Belirti: Kurban rolü.',
    keywords: ['bekleyiş', 'fedakarlık', 'perspektif', 'erteleme', 'atalet'],
    context:
      'Şu an hisleriniz askıda. Perspektif değişimi kalbinizi özgürleştirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ra_pos2',
    card: 'Death',
    position: 2,
    upright:
      'Ölüm, hislerinizde dönüşüm ve yenilenme isteğini gösterir. Eski kalıpları bırakıyorsunuz.',
    reversed:
      'Ters Ölüm, değişime direnç ve geçmişe tutunmanın hislerinizi zorladığını söyler. Belirti: Bitmeyen döngü.',
    keywords: ['bitiş', 'dönüşüm', 'yenilenme', 'direnç', 'kapanış'],
    context:
      'Şu an kalbinizde bir dönem kapanıyor. Yeniye açılmak hafifletecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ra_pos2',
    card: 'Temperance',
    position: 2,
    upright:
      'Denge, hislerinizde uyum ve ölçülülük arayışını gösterir. Orta yol kalbinizi besliyor.',
    reversed:
      'Ters Denge, aşırılık ve dengesizliklerin hislerinizi zorladığını söyler. Belirti: Ya hep ya hiç hali.',
    keywords: ['denge', 'uyum', 'sabır', 'sentez', 'ölçü'],
    context: 'Şu an hisleriniz orta yolu arıyor. Uyum ritmi huzur getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ra_pos2',
    card: 'The Devil',
    position: 2,
    upright:
      'Şeytan, hislerinizde bağımlılık, kıskançlık ya da kontrol enerjilerinin baskın olduğunu gösterir. Zincirler görünmez olabilir.',
    reversed:
      'Ters Şeytan, zincirleri kırma isteği hislerinizde öne çıkıyor ama gölgeler hâlâ güçlü. Belirti: Bırak–geri dön döngüsü.',
    keywords: ['bağımlılık', 'takıntı', 'kıskançlık', 'kontrol', 'özgürlük'],
    context:
      'Şu an bağınızda kontrol ve bağımlılık temaları var. Özgürleşmek kalbinizi hafifletecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ra_pos2',
    card: 'The Tower',
    position: 2,
    upright:
      'Kule, hislerinizde ani fark edişler ve sarsıcı duygular olduğunu gösterir. Eski inançlar yıkılıyor.',
    reversed:
      'Ters Kule, ertelenmiş krizlerin hislerinizi gerilimli hale getirdiğini söyler. Belirti: İç patlamalar.',
    keywords: ['kriz', 'yıkım', 'gerçek', 'yeniden inşa', 'temel'],
    context:
      'Şu an kalbiniz bir uyanış yaşıyor. Yıkılan yapı yeni duygulara alan açacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ra_pos2',
    card: 'The Star',
    position: 2,
    upright:
      'Yıldız, hislerinizde umut ve iyileşme ışığı olduğunu gösterir. Kalbiniz yeniden parlıyor.',
    reversed:
      'Ters Yıldız, umutsuzluk ve güvensizliğin hislerinizi zorladığını söyler. Belirti: Pes etme hali.',
    keywords: ['umut', 'şifa', 'yenilenme', 'sadelik', 'sabır'],
    context:
      'Şu an hislerinizde ışık yanıyor. Sabırla ilerlemek kalbinizi şifalandıracak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ra_pos2',
    card: 'The Moon',
    position: 2,
    upright:
      'Ay, hislerinizde belirsizlik, korku ve yanılsamaların etkili olduğunu gösterir. Sis kalbinizi sarıyor.',
    reversed:
      'Ters Ay, sisin dağılmaya başladığını ama güvensizlik izlerinin sürdüğünü söyler. Belirti: Çelişkili işaretler.',
    keywords: ['belirsizlik', 'korku', 'yanılsama', 'projeksiyon', 'güven'],
    context:
      'Şu an hisleriniz netlik arıyor. Açık iletişim sis perdesini kaldıracak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ra_pos2',
    card: 'The Sun',
    position: 2,
    upright:
      'Güneş, hislerinizde sıcaklık, açıklık ve neşe olduğunu gösterir. Kalbiniz aydınlıkta.',
    reversed:
      'Ters Güneş, yapay mutluluk ve yüzeysel pozitifliğin hislerinizi gölgelediğini söyler. Belirti: İçtenlik eksikliği.',
    keywords: ['sevinç', 'açıklık', 'otantiklik', 'umut', 'paylaşım'],
    context:
      'Şu an hislerinizde ışık var. Gerçek sevinci paylaşmak güven yaratacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ra_pos2',
    card: 'Judgement',
    position: 2,
    upright:
      'Mahkeme, hislerinizde yüzleşme ve yeniden değerlendirme enerjisi var. Geçmişten öğreniyorsunuz.',
    reversed:
      'Ters Mahkeme, geçmişi kapatamamanın hislerinizi gölgelediğini söyler. Belirti: Suçlama–savunma.',
    keywords: ['yüzleşme', 'karar', 'yenilenme', 'affediş', 'geçmiş'],
    context:
      'Şu an hisleriniz geçmişle yüzleşiyor. Affetmek kalbinizi hafifletecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ra_pos2',
    card: 'The World',
    position: 2,
    upright:
      'Dünya, hislerinizde tamamlanma ve bütünlük arzusunu gösterir. Yeni bir eşiğe hazırsınız.',
    reversed:
      'Ters Dünya, yarım kalmışlık hissinin kalbinizi gölgelediğini gösterir. Belirti: Eksik tamamlanma.',
    keywords: ['tamamlanma', 'bütünlük', 'döngü', 'eşik', 'başarı'],
    context:
      'Şu an kalbiniz bütünlük istiyor. Döngüyü onurlandırmak hislerinizi doyuracak.',
    group: 'Majör Arkana',
  },
  //-- Kupalar --//
  {
    id: 'ace_of_cups_ra_pos2',
    card: 'Ace of Cups',
    position: 2,
    upright:
      'Kupa Ası, kalbinizde saf sevgi ve tazelenme isteğini gösterir. İçinizden taşan şefkat paylaşılmak için hazır.',
    reversed:
      'Ters Kupa Ası, sevginizi bastırma ya da akışa izin vermeme halini anlatır. Belirti: Tıkanmış hisler.',
    keywords: ['yeni başlangıç', 'sevgi', 'şefkat', 'açılma', 'duygusal akış'],
    context:
      'Şu an kalbiniz yeni duygulara açılıyor. Saf sevgi bağı tazelemek için hazır.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ra_pos2',
    card: 'Two of Cups',
    position: 2,
    upright:
      'İki Kupa, hislerinizin karşılıklılık ve uyum istediğini gösterir. Kalbiniz eşit bir bağa yöneliyor. İpucu: Göz göze gelin.',
    reversed:
      'Ters İki Kupa, uyumsuzluk ya da yanlış anlaşılmaların duygularınızı zorladığını söyler. Belirti: Yakınlıkta mesafe.',
    keywords: ['uyum', 'karşılıklılık', 'bağ', 'aşk', 'partnerlik'],
    context:
      'Şu an kalbiniz eşitlik ve uyum arıyor. Açık paylaşım yakınlığı derinleştirecek.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ra_pos2',
    card: 'Three of Cups',
    position: 2,
    upright:
      'Üç Kupa, hislerinizde neşe, dostluk ve paylaşım öne çıkıyor. Kalbiniz kutlama enerjisiyle dolu. İpucu: Mutluluğu paylaşın.',
    reversed:
      'Ters Üç Kupa, aşırılık ya da üçüncü kişilerin etkisinin duygularınızı gölgelediğini söyler. Belirti: Karışan enerjiler.',
    keywords: ['neşe', 'kutlama', 'paylaşım', 'arkadaşlık', 'birlik'],
    context:
      'Şu an hisleriniz kutlama modunda. Fakat dış etkiler gölge yaratabilir.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ra_pos2',
    card: 'Four of Cups',
    position: 2,
    upright:
      'Dört Kupa, hislerinizde isteksizlik ve tatminsizlik hissi olduğunu gösterir. İçte bir duraklama var. İpucu: Gözünüzün önündekini fark edin.',
    reversed:
      'Ters Dört Kupa, yeniden ilgi ve heves doğduğunu söyler. Belirti: Uyanan kalp.',
    keywords: ['durgunluk', 'isteksizlik', 'tatminsizlik', 'aranış', 'uyanış'],
    context:
      'Şu an kalbiniz biraz durgun. Yeniden farkındalık tazelenme getirecek.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ra_pos2',
    card: 'Five of Cups',
    position: 2,
    upright:
      'Beş Kupa, hislerinizde kayıp ve pişmanlık ağırlığı olduğunu gösterir. Kalbiniz geçmişe takılmış olabilir. İpucu: Önünüzdeki dolu kupaları görün.',
    reversed:
      'Ters Beş Kupa, yasın hafiflemeye başladığını ve kalbinizin iyileştiğini söyler. Belirti: Yeniden doğan umut.',
    keywords: ['kayıp', 'pişmanlık', 'geçmiş', 'üzüntü', 'yenilenme'],
    context:
      'Şu an kalbiniz geçmişe odaklı. Önünüzdeki fırsatları görmek iyileştirecek.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ra_pos2',
    card: 'Six of Cups',
    position: 2,
    upright:
      'Altı Kupa, hislerinizde nostalji ve masumiyet enerjisi var. Geçmişin tatlı anıları kalbinizi ısıtıyor. İpucu: Anıyı keyifle hatırlayın.',
    reversed:
      'Ters Altı Kupa, geçmişe fazlaca saplanmanın hislerinizi durdurduğunu gösterir. Belirti: Takılı kalan kalp.',
    keywords: ['nostalji', 'masumiyet', 'çocukluk', 'geçmiş', 'saflık'],
    context:
      'Şu an kalbiniz geçmişle dolu. Masum hatırlama şifalı, takılı kalmak engelleyici.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ra_pos2',
    card: 'Seven of Cups',
    position: 2,
    upright:
      'Yedi Kupa, hislerinizde hayaller ve seçenek bolluğu var. Kararsızlık kalbinizi bulandırıyor. İpucu: Gerçekçi olanı seçin.',
    reversed:
      'Ters Yedi Kupa, hayal perdesinin kalktığını ama kararsızlığın devam edebildiğini gösterir. Belirti: Kafa karışıklığı.',
    keywords: ['hayal', 'seçenek', 'illüzyon', 'karar', 'arayış'],
    context: 'Şu an kalbiniz hayallerle dolu. Net seçim huzur getirecek.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ra_pos2',
    card: 'Eight of Cups',
    position: 2,
    upright:
      'Sekiz Kupa, hislerinizde bırakma ve yeniye yürüme arzusu var. Kalbiniz geride olanı aşmak istiyor. İpucu: Arkana bakmadan ilerleyin.',
    reversed:
      'Ters Sekiz Kupa, bırakma konusunda tereddüt ve geri dönüş eğilimini gösterir. Belirti: Adım atıp geri çekilme.',
    keywords: ['bırakış', 'yolculuk', 'terk', 'ilerleme', 'dönüşüm'],
    context:
      'Şu an kalbiniz gitmekle kalmak arasında. Net karar özgürleştirecek.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ra_pos2',
    card: 'Nine of Cups',
    position: 2,
    upright:
      'Dokuz Kupa, hislerinizde tatmin ve mutluluk enerjisi var. Kalbiniz şükürle dolu. İpucu: Keyfin tadını çıkarın.',
    reversed:
      'Ters Dokuz Kupa, sahte tatmin ya da yüzeysel zevklerin hislerinizi gölgelediğini söyler. Belirti: Eksik hissetme.',
    keywords: ['tatmin', 'mutluluk', 'doyum', 'şükür', 'zevk'],
    context: 'Şu an kalbiniz dolu. İçten gelen mutluluk huzuru besleyecek.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ra_pos2',
    card: 'Ten of Cups',
    position: 2,
    upright:
      'On Kupa, hislerinizde aile ve bütünlük arzusu var. Kalbiniz huzurlu bir yuva hayal ediyor. İpucu: Hayali paylaşın.',
    reversed:
      'Ters On Kupa, uyum eksikliğinin ailevi hayalleri zorladığını söyler. Belirti: Yarım huzur.',
    keywords: ['aile', 'bütünlük', 'huzur', 'hayal', 'birlik'],
    context:
      'Şu an kalbiniz huzurlu birlik arıyor. Samimiyetle bu hayal gerçeğe yaklaşacak.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ra_pos2',
    card: 'Page of Cups',
    position: 2,
    upright:
      'Kupa Prensi, hislerinizde saf romantizm ve duygusal açıklık öne çıkıyor. Kalbiniz oyunbaz bir sevgi diliyle atıyor. İpucu: Hayal gücünüzü paylaşın.',
    reversed:
      'Ters Kupa Prensi, duygusal olgunluk eksikliğinin hislerinizi savurduğunu gösterir. Belirti: Abartılı duygular.',
    keywords: [
      'romantizm',
      'masumiyet',
      'hayal gücü',
      'duygusallık',
      'açıklık',
    ],
    context:
      'Şu an kalbiniz masum bir aşkla dolu. Olgunluk bu sevgiyi büyütecek.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ra_pos2',
    card: 'Knight of Cups',
    position: 2,
    upright:
      'Kupa Şövalyesi, hislerinizde romantik jestler ve ifade isteği var. Kalbiniz harekete geçmek istiyor. İpucu: Açık niyetlerle yaklaşın.',
    reversed:
      'Ters Kupa Şövalyesi, hayalperestlik ve tutarsızlık duygularınızı zorlayabilir. Belirti: Boş vaatler.',
    keywords: ['jest', 'romantizm', 'teklif', 'hayal', 'hareket'],
    context:
      'Şu an kalbiniz jestlerle dolu. Samimiyetle bu hisler güven verecek.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ra_pos2',
    card: 'Queen of Cups',
    position: 2,
    upright:
      'Kupa Kraliçesi, hislerinizde empati, şefkat ve derinlik var. Kalbiniz duygularla yumuşuyor. İpucu: Sezgilerinize güvenin.',
    reversed:
      'Ters Kupa Kraliçesi, aşırı hassasiyetin hislerinizi zorladığını söyler. Belirti: Alınganlık.',
    keywords: ['empati', 'şefkat', 'derinlik', 'duygusallık', 'sezgi'],
    context:
      'Şu an kalbiniz yumuşaklıkla dolu. Denge duygularınızı güçlendirecek.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ra_pos2',
    card: 'King of Cups',
    position: 2,
    upright:
      'Kupa Kralı, hislerinizde olgunluk, anlayış ve denge var. Kalbiniz güçlü bir merkezde. İpucu: Olgunluğunuzu paylaşın.',
    reversed:
      'Ters Kupa Kralı, bastırılmış duyguların ya da manipülasyonun kalbinizi gölgelediğini söyler. Belirti: Pasif agresiflik.',
    keywords: ['olgunluk', 'denge', 'şefkat', 'bilgelik', 'hassasiyet'],
    context:
      'Şu an kalbiniz olgun bir sevgiyle akıyor. Açık ifade bu dengeyi pekiştirecek.',
    group: 'Kupalar',
  },

  //-- Tılsımlar --//
  {
    id: 'ace_of_pentacles_ra_pos2',
    card: 'Ace of Pentacles',
    position: 2,
    upright:
      'Tılsım Ası, hislerinizde güven, istikrar ve uzun vadeli bir başlangıç arzusu var. Kalbiniz sağlam temeller kurmak istiyor. İpucu: Tohum ekin.',
    reversed:
      'Ters Tılsım Ası, fırsatların görülmemesi veya güvensizlik nedeniyle hislerinizi gölgelediğini söyler. Belirti: Kaçan başlangıç.',
    keywords: ['güven', 'başlangıç', 'temel', 'istikrar', 'bolluk'],
    context:
      'Şu an kalbiniz sağlam bir başlangıca hazır. Güven duygusu hislerinizi güçlendirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ra_pos2',
    card: 'Two of Pentacles',
    position: 2,
    upright:
      'İki Tılsım, hislerinizde denge kurma ve çoklu sorumlulukları idare etme çabası var. Kalbiniz esneklik arıyor. İpucu: Önceliklerinizi netleştirin.',
    reversed:
      'Ters İki Tılsım, dengesizlik ve aşırı yükün hislerinizi zorladığını söyler. Belirti: Dağınık enerji.',
    keywords: ['denge', 'uyum', 'sorumluluk', 'esneklik', 'akış'],
    context: 'Şu an kalbiniz çok şeyle uğraşıyor. Esneklik sizi hafifletecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ra_pos2',
    card: 'Three of Pentacles',
    position: 2,
    upright:
      'Üç Tılsım, hislerinizde işbirliği ve ortak emek arzusu öne çıkıyor. Kalbiniz uyum içinde inşa etmek istiyor. İpucu: Takım ruhunu besleyin.',
    reversed:
      'Ters Üç Tılsım, uyumsuzluk ve katkısızlığın hislerinizi zorladığını gösterir. Belirti: Ortak emek eksikliği.',
    keywords: ['işbirliği', 'emek', 'uyum', 'dayanışma', 'inşa'],
    context:
      'Şu an kalbiniz ortak çabayı özlüyor. Birlikte emek vermek bağı güçlendirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ra_pos2',
    card: 'Four of Pentacles',
    position: 2,
    upright:
      'Dört Tılsım, hislerinizde sahiplenme ve koruma arzusu baskın. Kalbiniz güven alanını tutmak istiyor. İpucu: Açıklıkla denge kurun.',
    reversed:
      'Ters Dört Tılsım, aşırı tutunma veya kaybetme korkusunun hislerinizi zorladığını söyler. Belirti: Kıskançlık.',
    keywords: ['sahiplenme', 'güven', 'kontrol', 'koruma', 'tutku'],
    context:
      'Şu an kalbiniz güvende olmak istiyor. Fazla tutunmak ise sizi yorabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ra_pos2',
    card: 'Five of Pentacles',
    position: 2,
    upright:
      'Beş Tılsım, hislerinizde yalnızlık veya destek görmeme hissi var. Kalbiniz dışarıda kalmış gibi hissediyor. İpucu: Destek istemekten çekinmeyin.',
    reversed:
      'Ters Beş Tılsım, toparlanma ve desteğe yönelme isteğinin arttığını gösterir. Belirti: Kapı aralanıyor.',
    keywords: ['yalnızlık', 'eksiklik', 'destek', 'kaynak', 'yardım'],
    context: 'Şu an kalbiniz destek arıyor. Paylaşım yaraları saracak.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ra_pos2',
    card: 'Six of Pentacles',
    position: 2,
    upright:
      'Altı Tılsım, hislerinizde denge ve paylaşım arzusu var. Kalbiniz eşit alışverişe yöneliyor. İpucu: Almak ve vermek arasında denge kurun.',
    reversed:
      'Ters Altı Tılsım, dengesiz alışverişin hislerinizi gölgelediğini söyler. Belirti: Tek taraflı emek.',
    keywords: ['paylaşım', 'denge', 'eşitlik', 'destek', 'adalet'],
    context:
      'Şu an kalbiniz eşitlik arıyor. Dengeyi bulmak hislerinizi besleyecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ra_pos2',
    card: 'Seven of Pentacles',
    position: 2,
    upright:
      'Yedi Tılsım, hislerinizde sabır ve geleceğe yatırım enerjisi var. Kalbiniz bekleyişle dolu. İpucu: Zamanı güvenle izleyin.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık ve sonuç görememenin hislerinizi zorladığını söyler. Belirti: Umutsuz bekleyiş.',
    keywords: ['sabır', 'yatırım', 'bekleyiş', 'umut', 'emek'],
    context: 'Şu an kalbiniz sabırla dolu. İnançla beklemek meyve verecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ra_pos2',
    card: 'Eight of Pentacles',
    position: 2,
    upright:
      'Sekiz Tılsım, hislerinizde öğrenme ve emek verme arzusu var. Kalbiniz ustalaşmak istiyor. İpucu: Küçük adımlar büyür.',
    reversed:
      'Ters Sekiz Tılsım, isteksizlik veya dikkatsizlik yüzünden hislerinizin gölgelendiğini söyler. Belirti: Yarım işler.',
    keywords: ['emek', 'öğrenme', 'çaba', 'ustalık', 'sabır'],
    context:
      'Şu an kalbiniz emek vermek istiyor. Disiplin hislerinizi olgunlaştıracak.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ra_pos2',
    card: 'Nine of Pentacles',
    position: 2,
    upright:
      'Dokuz Tılsım, hislerinizde bağımsızlık ve öz değer duygusu var. Kalbiniz kendi ayakları üzerinde durmak istiyor. İpucu: Kendi alanınızı kutlayın.',
    reversed:
      'Ters Dokuz Tılsım, bağımlılık ya da kendi değerini görememenin hislerinizi gölgelediğini söyler. Belirti: Onay arayışı.',
    keywords: ['öz değer', 'bağımsızlık', 'güven', 'başarı', 'özgürlük'],
    context:
      'Şu an kalbiniz kendi değerini hissetmek istiyor. Öz yeterlilik sizi güçlendirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ra_pos2',
    card: 'Ten of Pentacles',
    position: 2,
    upright:
      'On Tılsım, hislerinizde kalıcı güven ve ailevi bütünlük arzusu var. Kalbiniz uzun vadeli huzur istiyor. İpucu: Köklerinizle bağ kurun.',
    reversed:
      'Ters On Tılsım, maddi veya ailevi güvensizliklerin hislerinizi zorladığını gösterir. Belirti: Eksik temel.',
    keywords: ['istikrar', 'aile', 'miras', 'kalıcılık', 'güven'],
    context:
      'Şu an kalbiniz kalıcı güven arıyor. Köklenmek hislerinizi huzura taşıyacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ra_pos2',
    card: 'Page of Pentacles',
    position: 2,
    upright:
      'Tılsım Prensi, hislerinizde merak ve öğrenme arzusu var. Kalbiniz yeni temellere yöneliyor. İpucu: Öğrenciliği kucaklayın.',
    reversed:
      'Ters Tılsım Prensi, dikkatsizlik ve yüzeyselliğin hislerinizi savurduğunu söyler. Belirti: Yarım kalmış niyetler.',
    keywords: ['öğrenme', 'merak', 'temel', 'deneyim', 'sabır'],
    context:
      'Şu an kalbiniz yeni temeller arıyor. Kararlılık ilerletici olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ra_pos2',
    card: 'Knight of Pentacles',
    position: 2,
    upright:
      'Tılsım Şövalyesi, hislerinizde istikrar ve sorumluluk arzusu var. Kalbiniz güvenle ilerlemek istiyor. İpucu: Sabırla adım atın.',
    reversed:
      'Ters Tılsım Şövalyesi, isteksizlik veya durağanlığın hislerinizi zorladığını söyler. Belirti: Erteleme.',
    keywords: ['istikrar', 'sorumluluk', 'sabır', 'güven', 'ilerleme'],
    context:
      'Şu an kalbiniz yavaş ama emin adımlar atmak istiyor. Sabır güven getirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ra_pos2',
    card: 'Queen of Pentacles',
    position: 2,
    upright:
      'Tılsım Kraliçesi, hislerinizde şefkat, bakım ve güven enerjisi var. Kalbiniz huzurla beslemek istiyor. İpucu: Toprağınızı yeşertin.',
    reversed:
      'Ters Tılsım Kraliçesi, aşırı özveri ya da ihmalin hislerinizi zorladığını gösterir. Belirti: Yorgun şefkat.',
    keywords: ['şefkat', 'güven', 'besleme', 'istikrar', 'topraklama'],
    context:
      'Şu an kalbiniz şefkatle akıyor. Kendi ihtiyaçlarınıza da alan açmak dengeyi koruyacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ra_pos2',
    card: 'King of Pentacles',
    position: 2,
    upright:
      'Tılsım Kralı, hislerinizde olgunluk, güven ve bolluk isteği var. Kalbiniz sağlam temellere dayanmak istiyor. İpucu: Bilgelikle yön verin.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol veya statü kaygısının hislerinizi zorladığını gösterir. Belirti: Sertleşmiş tutum.',
    keywords: ['olgunluk', 'bolluk', 'güven', 'istikrar', 'liderlik'],
    context:
      'Şu an kalbiniz güvenli bir alan yaratmak istiyor. Yumuşak yaklaşım kalbinizi hafifletecek.',
    group: 'Tılsımlar',
  },
  //-- Kılıçlar --//
  {
    id: 'ace_of_swords_ra_pos2',
    card: 'Ace of Swords',
    position: 2,
    upright:
      'Kılıç Ası, kalbinizde netlik ve hakikati adlandırma isteğini gösterir. Duygularınız açık bir cümleye kavuşmak istiyor. İpucu: Nazik ama net söyleyin.',
    reversed:
      'Ters Kılıç Ası, muğlaklık ve yarım doğruların kalbinizi yorduğunu söyler. Belirti: Çelişkili sözler, kararsız ton.',
    keywords: ['netlik', 'gerçek', 'ifade', 'karar', 'tanım'],
    context:
      'Şu an kalbiniz net olmak istiyor. Duygular adı kondukça rahatlayacak. Açık dil güveni büyütecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ra_pos2',
    card: 'Two of Swords',
    position: 2,
    upright:
      'İki Kılıç, hislerinizde karar felci ve kaçınmayı gösterir. Kalp ile akıl arasında kalmış gibisiniz. İpucu: Göz bağını çözün.',
    reversed:
      'Ters İki Kılıç, bastırılan duyguların ani patlamalara dönüştüğünü söyler. Belirti: Savunmacı duvarlar.',
    keywords: ['ikilem', 'kaçınma', 'denge', 'yüzleşme', 'karar'],
    context:
      'Şu an duygularınız kararsız. Küçük bir yüzleşme büyük rahatlama getirecek. Kalbin sesi duyulmak istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ra_pos2',
    card: 'Three of Swords',
    position: 2,
    upright:
      'Üç Kılıç, kalbinizde kırgınlık izi ve hassas bir bölge olduğunu söyler. Söz yarası taze olabilir. İpucu: Acıya şefkatle dokunun.',
    reversed:
      'Ters Üç Kılıç, iyileşme isteği olsa da duygunun tutulduğunu gösterir. Belirti: Sızdıran hüzün.',
    keywords: ['kırgınlık', 'acı', 'onarma', 'ifade', 'şefkat'],
    context:
      'Şu an kalbiniz onarım istiyor. Duyguyu görünce yük hafifleyecek. Yumuşak konuşma köprü kuracak.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ra_pos2',
    card: 'Four of Swords',
    position: 2,
    upright:
      'Dört Kılıç, duygularınızda dinlenme ve içe çekilme ihtiyacını gösterir. Kalbiniz nefes istiyor. İpucu: Sessizliği şifa için kullanın.',
    reversed:
      'Ters Dört Kılıç, mola verememenin gerginliği büyüttüğünü söyler. Belirti: Zihinsel yorgunluk.',
    keywords: ['dinlenme', 'toparlanma', 'sükunet', 'mola', 'içe dönüş'],
    context:
      'Şu an kalbiniz yavaşlamak istiyor. Kısa bir duruş duygu tonunu dengeler. Ritminizi nazikçe düzenleyin.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ra_pos2',
    card: 'Five of Swords',
    position: 2,
    upright:
      'Beş Kılıç, hislerinizde haklı çıkma arzusu ile incelik ihtiyacının çatıştığını söyler. Zafer duygusu yalnız bırakabilir. İpucu: Onurdan çok uzlaşıyı seçin.',
    reversed:
      'Ters Beş Kılıç, gururun özür kapısını kapattığını gösterir. Belirti: Soğuk savaş.',
    keywords: ['ego', 'çatışma', 'zafer', 'maliyet', 'uzlaşı'],
    context:
      'Şu an kalbinizde savunma yüksek. Bir adım geri huzur getirecek. Yumuşak niyetler köprü kuracak.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ra_pos2',
    card: 'Six of Swords',
    position: 2,
    upright:
      'Altı Kılıç, duygularınızda sakin sulara geçme arzusu olduğunu söyler. Kalbiniz köprü arıyor. İpucu: Kademeli ilerleyin.',
    reversed:
      'Ters Altı Kılıç, eski sahile geri dönüşlerin sizi yorduğunu söyler. Belirti: Tekrarlayan geri adım.',
    keywords: ['geçiş', 'sakinlik', 'iyileşme', 'yol', 'adaptasyon'],
    context:
      'Şu an kalbiniz huzura taşınmak istiyor. Küçük, tutarlı adımlar güven yaratacak. Geçmişe takılmayın.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ra_pos2',
    card: 'Seven of Swords',
    position: 2,
    upright:
      'Yedi Kılıç, duygularınızda sakınma ve temkinli paylaşım eğilimini gösterir. Kalbiniz güven testi yapıyor. İpucu: Doğru yerde açık olun.',
    reversed:
      'Ters Yedi Kılıç, itiraf isteği ile utanç bariyerinin çekiştiğini söyler. Belirti: Kaçamak cevaplar.',
    keywords: ['şeffaflık', 'güven', 'saklama', 'strateji', 'dürüstlük'],
    context:
      'Şu an kalbiniz temkinli. Güvenli alanlarda açık olmak içi rahatlatacak. Yarım söz yerine netlik iyi gelecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ra_pos2',
    card: 'Eight of Swords',
    position: 2,
    upright:
      'Sekiz Kılıç, kendinizi kısıtlayan inançların duygularınızı daralttığını söyler. Kapı açıkken kapalı sanılıyor. İpucu: Kanıtla korkuyu ayırın.',
    reversed:
      'Ters Sekiz Kılıç, çözülmeye başlayan düğümlere rağmen tereddüdün sürdüğünü söyler. Belirti: Bir ileri bir geri.',
    keywords: ['öz-kısıt', 'korku', 'inanç', 'özgürlük', 'cesaret'],
    context:
      'Şu an kalbiniz çekingen. Küçük cesur deneyler alan açacak. Yardım istemek de güçtür.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ra_pos2',
    card: 'Nine of Swords',
    position: 2,
    upright:
      'Dokuz Kılıç, kaygı ve abartılı senaryoların duygularınızı sardığını söyler. Zihin geceyi büyütüyor. İpucu: Gerçeklik kontrolü yapın.',
    reversed:
      'Ters Dokuz Kılıç, kabusun hafiflediğini ama izinin kaldığını gösterir. Belirti: Uykusuzluk artığı.',
    keywords: ['kaygı', 'kuruntu', 'uyku', 'gerçeklik', 'regülasyon'],
    context:
      'Şu an kalbiniz güvence istiyor. Nefes ve açık konuşma kaygıyı çözecek. Küçük kanıtlar büyük huzur verir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ra_pos2',
    card: 'Ten of Swords',
    position: 2,
    upright:
      'On Kılıç, duygularınızda bir döngünün bittiğini ve eski yöntemin artık işlemediğini söyler. Bırakmanın vakti. İpucu: Kapanışı ritüelleyin.',
    reversed:
      'Ters On Kılıç, toparlanma niyetine rağmen tam vedanın zorlandığını söyler. Belirti: Yarım bitiriş.',
    keywords: ['bitiş', 'kapanış', 'yenilenme', 'tükeniş', 'kabul'],
    context:
      'Şu an kalbiniz yük indirmek istiyor. Bitişi onurlandırmak hafifletecek. Yeni sayfa hazır.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ra_pos2',
    card: 'Page of Swords',
    position: 2,
    upright:
      'Kılıç Prensi, merak ve öğrenme arzusunun hislerinizi yönlendirdiğini söyler. Sormak istedikleriniz var. İpucu: Nazik soru, açık kalp.',
    reversed:
      'Ters Kılıç Prensi, dedikodu ve acele yargının duygularınızı bulandırdığını söyler. Belirti: Teyitsiz bilgi.',
    keywords: ['merak', 'soru', 'öğrenme', 'iletişim', 'netlik'],
    context:
      'Şu an kalbiniz bilmek istiyor. Doğrudan ve yumuşak sorular güven kuracak. Varsayımdan uzaklaşın.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ra_pos2',
    card: 'Knight of Swords',
    position: 2,
    upright:
      'Kılıç Şövalyesi, duygularınızda hızlı ve keskin ifade isteğini gösterir. Söze atılmaya hazırsınız. İpucu: Önce dinleyin, sonra netleşin.',
    reversed:
      'Ters Kılıç Şövalyesi, sert üslubun savunmayı artırdığını söyler. Belirti: Kapanan kapılar.',
    keywords: ['hız', 'keskinlik', 'iletişim', 'tepki', 'netlik'],
    context:
      'Şu an kalbiniz hızlı konuşuyor. Bir nefeslik durak tüm tonu değiştirir. Nazik netlik kapı açar.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ra_pos2',
    card: 'Queen of Swords',
    position: 2,
    upright:
      'Kılıç Kraliçesi, duygularınızda berrak akıl ve sınır bilinci olduğunu söyler. Netlik değerli. İpucu: Net olun ama kalbi dışlamayın.',
    reversed:
      'Ters Kılıç Kraliçesi, eleştirel tonun duyguları sertleştirdiğini söyler. Belirti: Sarkazm, iğneleyici dil.',
    keywords: ['analiz', 'netlik', 'sınır', 'nesnellik', 'üslup'],
    context:
      'Şu an kalbiniz düzen ister. Şefkatle karışan netlik derin yakınlık getirir. Diliniz balansa gelsin.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ra_pos2',
    card: 'King of Swords',
    position: 2,
    upright:
      'Kılıç Kralı, duygularınızda ilke ve adalet duygusunun güçlü olduğunu söyler. Yapı arıyorsunuz. İpucu: Empatiyi akılla harmanlayın.',
    reversed:
      'Ters Kılıç Kralı, katı ve hükmedici tonun içte mesafe yarattığını söyler. Belirti: Soğuk hüküm.',
    keywords: ['ilke', 'kural', 'strateji', 'empati', 'otorite'],
    context:
      'Şu an kalbiniz düzen ve tutarlılık istiyor. Yumuşak empati odayı ısıtacak. İlke ve kalp el ele ilerlesin.',
    group: 'Kılıçlar',
  },
  // Set: Asalar (14 kart)

  {
    id: 'ace_of_wands_ra_pos2',
    card: 'Ace of Wands',
    position: 2,
    upright:
      'Değnek Ası, hislerinizde tutku ve yeni bir kıvılcım doğduğunu söyler. Kalbiniz ateşlenmek istiyor. İpucu: İçinizdeki coşkuyu paylaşın.',
    reversed:
      'Ters Değnek Ası, hevesin söndüğü veya engellendiğini gösterir. Belirti: Ertelenmiş başlangıç.',
    keywords: ['tutku', 'ilham', 'başlangıç', 'ateş', 'coşku'],
    context:
      'Şu an kalbinizde kıvılcım var. Ateşi büyütmek bağınızı canlandıracak.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ra_pos2',
    card: 'Two of Wands',
    position: 2,
    upright:
      'İki Değnek, hislerinizde plan yapma ve ufka bakma isteği var. Kalbiniz geleceğe yöneliyor. İpucu: Cesur bir vizyon belirleyin.',
    reversed:
      'Ters İki Değnek, adım atamama ve kararsızlığın hislerinizi tuttuğunu gösterir. Belirti: Ufka bakıp geri çekilme.',
    keywords: ['plan', 'vizyon', 'gelecek', 'tereddüt', 'cesaret'],
    context:
      'Şu an kalbiniz ileriye bakıyor. Net niyetler adım atmayı kolaylaştıracak.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ra_pos2',
    card: 'Three of Wands',
    position: 2,
    upright:
      'Üç Değnek, hislerinizde beklenti ve genişleme arzusu var. Kalbiniz yeni ufuklara açılmak istiyor. İpucu: Sabırla fırsatları izleyin.',
    reversed:
      'Ters Üç Değnek, beklenen şeylerin gelmemesinin duygularınızı zorladığını söyler. Belirti: Hayal kırıklığı.',
    keywords: ['beklenti', 'genişleme', 'vizyon', 'umut', 'ufuk'],
    context:
      'Şu an kalbiniz gelecek için umutlu. Sabır ve inanç duygularınızı büyütecek.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ra_pos2',
    card: 'Four of Wands',
    position: 2,
    upright:
      'Dört Değnek, hislerinizde kutlama ve güvenli alan enerjisi var. Kalbiniz huzurla bağ kurmak istiyor. İpucu: Mutluluğu paylaşın.',
    reversed:
      'Ters Dört Değnek, uyumsuzluk veya yarım kalmış birlik hissini gösterir. Belirti: Eksik kutlama.',
    keywords: ['kutlama', 'huzur', 'birlik', 'güven', 'dayanışma'],
    context:
      'Şu an kalbiniz huzurlu birlik arıyor. Güvenli alan paylaşımı şifalı olacak.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ra_pos2',
    card: 'Five of Wands',
    position: 2,
    upright:
      'Beş Değnek, hislerinizde rekabet veya küçük çatışmalar hissi var. Kalbiniz anlaşılmak istiyor. İpucu: Çatışmayı oyuna çevirin.',
    reversed:
      'Ters Beş Değnek, gereksiz tartışmaların duygularınızı zorladığını gösterir. Belirti: Enerji kaybı.',
    keywords: ['rekabet', 'çatışma', 'dinamizm', 'oyun', 'ifade'],
    context: 'Şu an kalbiniz biraz rekabetçi. Yapıcı yaklaşım bağı besleyecek.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ra_pos2',
    card: 'Six of Wands',
    position: 2,
    upright:
      'Altı Değnek, hislerinizde takdir görme ve onaylanma isteği var. Kalbiniz gururla ışıldıyor. İpucu: Zaferinizi paylaşın.',
    reversed:
      'Ters Altı Değnek, görülmeme hissi veya onay eksikliğinin hislerinizi gölgelediğini söyler. Belirti: Hayal kırıklığı.',
    keywords: ['zafer', 'takdir', 'görülmek', 'gurur', 'başarı'],
    context:
      'Şu an kalbiniz takdir arıyor. Şeffaf paylaşım görülmenizi kolaylaştıracak.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ra_pos2',
    card: 'Seven of Wands',
    position: 2,
    upright:
      'Yedi Değnek, hislerinizde savunma ve direnç enerjisi var. Kalbiniz kendini korumak istiyor. İpucu: Sınırlarınızı şefkatle anlatın.',
    reversed:
      'Ters Yedi Değnek, yorucu savunmaların kalbinizi yorduğunu söyler. Belirti: Tükenmiş direnç.',
    keywords: ['savunma', 'sınır', 'direnç', 'mücadele', 'güç'],
    context:
      'Şu an kalbiniz kendini koruyor. Yumuşak açıklık duygularınızı hafifletecek.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ra_pos2',
    card: 'Eight of Wands',
    position: 2,
    upright:
      'Sekiz Değnek, hislerinizde hız ve akış isteği var. Kalbiniz gelişmeleri görmek istiyor. İpucu: Haberleşmeye izin verin.',
    reversed:
      'Ters Sekiz Değnek, gecikmelerin hislerinizi zorladığını gösterir. Belirti: Sabırsızlık.',
    keywords: ['hız', 'akış', 'iletişim', 'gelişme', 'ivme'],
    context:
      'Şu an kalbiniz hız arıyor. Sabırla beklemek akışı kolaylaştıracak.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ra_pos2',
    card: 'Nine of Wands',
    position: 2,
    upright:
      'Dokuz Değnek, hislerinizde temkin ve direnç enerjisi var. Kalbiniz sınırlarını koruyor. İpucu: Az kaldı, sabırlı olun.',
    reversed:
      'Ters Dokuz Değnek, aşırı yorgunluk ve şüphelerin duygularınızı zorladığını gösterir. Belirti: Bitkin savunma.',
    keywords: ['sabır', 'koruma', 'sınır', 'direnç', 'azim'],
    context:
      'Şu an kalbiniz kendini korumakla meşgul. Biraz dinlenmek güç toplayacak.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ra_pos2',
    card: 'Ten of Wands',
    position: 2,
    upright:
      'On Değnek, hislerinizde yük taşıma ve sorumluluk baskısı var. Kalbiniz yorulmuş olabilir. İpucu: Yükünüzü paylaşın.',
    reversed:
      'Ters On Değnek, fazlalıkları bırakma ihtiyacını söyler. Belirti: Tükenmişlik.',
    keywords: ['sorumluluk', 'yük', 'yorulma', 'dayanma', 'paylaşım'],
    context:
      'Şu an kalbiniz yük altında. Destek istemek duygularınızı hafifletecek.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ra_pos2',
    card: 'Page of Wands',
    position: 2,
    upright:
      'Değnek Prensi, hislerinizde merak ve macera isteği var. Kalbiniz keşfe aç. İpucu: Cesurca adım atın.',
    reversed:
      'Ters Değnek Prensi, dengesizlik ve sabırsızlığın hislerinizi savurduğunu gösterir. Belirti: Başlanıp yarım kalan işler.',
    keywords: ['merak', 'macera', 'heves', 'keşif', 'coşku'],
    context: 'Şu an kalbiniz keşif arıyor. Denge bu enerjiyi besleyecek.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ra_pos2',
    card: 'Knight of Wands',
    position: 2,
    upright:
      'Değnek Şövalyesi, hislerinizde tutku ve hızlı hareket isteği var. Kalbiniz aceleyle ilerlemek istiyor. İpucu: Sabırla ateşi besleyin.',
    reversed:
      'Ters Değnek Şövalyesi, sabırsızlık ve öfke patlamalarının hislerinizi zorladığını söyler. Belirti: Acele kararlar.',
    keywords: ['tutku', 'hız', 'hareket', 'cesaret', 'coşku'],
    context: 'Şu an kalbiniz atak. Sabırla adım atmak bağı güçlendirecek.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ra_pos2',
    card: 'Queen of Wands',
    position: 2,
    upright:
      'Değnek Kraliçesi, hislerinizde özgüven ve sıcaklık enerjisi var. Kalbiniz ışığını saçmak istiyor. İpucu: Çekiciliğinizi paylaşın.',
    reversed:
      'Ters Değnek Kraliçesi, kıskançlık veya aşırı gururun hislerinizi zorladığını söyler. Belirti: Kapris.',
    keywords: ['özgüven', 'sıcaklık', 'çekicilik', 'tutku', 'liderlik'],
    context: 'Şu an kalbiniz parlıyor. İçtenlik bu ışığı büyütecek.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ra_pos2',
    card: 'King of Wands',
    position: 2,
    upright:
      'Değnek Kralı, hislerinizde güçlü liderlik ve yön belirleme isteği var. Kalbiniz tutkulu bir vizyon istiyor. İpucu: İlhamla yön verin.',
    reversed:
      'Ters Değnek Kralı, otoriterlik veya aşırı baskının hislerinizi zorladığını gösterir. Belirti: Katı tutum.',
    keywords: ['liderlik', 'vizyon', 'tutku', 'karizma', 'ilham'],
    context:
      'Şu an kalbiniz güçlü hislerle dolu. Şefkatle liderlik etmek bağı büyütecek.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 2 anlamını getirir
 * @param card - Tarot kartı
 * @returns pozisyon 2 anlamı veya null
 */
export function getRelationshipAnalysisPosition2Meaning(
  card: TarotCard
): RelationshipAnalysisPosition2Meaning | null {
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
 * Belirli bir kart ismi için pozisyon 2 anlamını getirir
 * @param cardName - Kart ismi
 * @returns pozisyon 2 anlamı veya null
 */
export function getRelationshipAnalysisPosition2MeaningByCardName(
  cardName: string
): RelationshipAnalysisPosition2Meaning | null {
  return position2Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 2 anlamlarını getirir
 * @returns pozisyon 2 anlamları array'i
 */
export function getAllRelationshipAnalysisPosition2Meanings(): RelationshipAnalysisPosition2Meaning[] {
  return position2Meanings;
}

/**
 * Kart grubuna göre pozisyon 2 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getRelationshipAnalysisPosition2MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipAnalysisPosition2Meaning[] {
  return position2Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition2Meanings = (): I18nRelationshipAnalysisposition2Meaning[] => {
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
): I18nRelationshipAnalysisPosition2Meaning | null => {
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
    `relationship-analysis.meanings.${cardKey}.position2.upright`
  );
  const i18nReversed = t(
    `relationship-analysis.meanings.${cardKey}.position2.reversed`
  );
  const i18nKeywords = t(
    `relationship-analysis.meanings.${cardKey}.position2.keywords`
  );
  const i18nContext = t(
    `relationship-analysis.meanings.${cardKey}.position2.context`
  );
  const i18nGroup = t(
    `relationship-analysis.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
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
const RelationshipAnalysisposition2Exports = {
  position2Meanings,
  getRelationshipAnalysisPosition2Meaning,
  getRelationshipAnalysisPosition2MeaningByCardName,
  getAllRelationshipAnalysisPosition2Meanings,
  getRelationshipAnalysisPosition2MeaningsByGroup,
  getI18nPosition2Meaning,
};

export default RelationshipAnalysisposition2Exports;
