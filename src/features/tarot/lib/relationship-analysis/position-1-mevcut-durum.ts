'use client';

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

export interface RelationshipAnalysisPosition1Meaning {
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
export interface I18nRelationshipAnalysisPosition1Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position1Meanings: RelationshipAnalysisPosition1Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ra_pos1',
    card: 'The Fool',
    position: 1,
    upright:
      'Deli, ilişkinizin şu an taze bir enerji ve bilinmezlik taşıdığını söyler. Adımlar cesur ama yönsüz olabilir. İpucu: Keşif heyecanı yüksek, yön belirlemek gerek.',
    reversed:
      'Ters Deli, bağın mevcut durumda kararsızlık ve sorumluluktan kaçışla gölgelendiğini gösterir. Belirsizlik hakimdir. Belirti: Düşünmeden verilen sözler, ertelenen kararlar.',
    keywords: ['yenilik', 'özgürlük', 'belirsizlik', 'macera', 'başlangıç'],
    context:
      'Mevcut durumda bağ yeni başlangıçlar ve keşiflerle dolu. Fakat yön eksikliği dengesizlik yaratıyor. Net bir pusula ilişkide huzur getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ra_pos1',
    card: 'The Magician',
    position: 1,
    upright:
      'Büyücü, ilişkinizin şu an iletişim ve niyet gücü üzerine kurulduğunu gösterir. Sözcükleriniz bağın enerjisini yönlendiriyor. İpucu: Net iletişim sihir yaratır.',
    reversed:
      'Ters Büyücü, ilişkinin mevcut durumda yarım kalan sözler ve yanlış anlaşılmalardan etkilendiğini gösterir. Manipülasyona açık bir enerji vardır. Belirti: Tutarsızlık ve bulanık mesajlar.',
    keywords: ['iletişim', 'niyet', 'çekim', 'yaratıcılık', 'ifade'],
    context:
      'Mevcut durumda iletişim anahtar rol oynuyor. Netlik ve şeffaflık bağınızı güçlendirecek. Söz–eylem uyumu şimdi çok önemli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ra_pos1',
    card: 'The High Priestess',
    position: 1,
    upright:
      'Başrahibe, ilişkinin mevcut durumda gizli duygular ve sezgilerle örülü olduğunu söyler. Her şey açıkça konuşulmamış olabilir. İpucu: İç sesinize kulak verin.',
    reversed:
      'Ters Başrahibe, suskunluk ve bastırılmış duyguların mevcut enerjide mesafe yarattığını gösterir. Gizlilik şüphe doğurur. Belirti: Yarım cümleler, içe kapanma.',
    keywords: ['sezgi', 'giz', 'içsel dünya', 'mesafe', 'suskunluk'],
    context:
      'Mevcut durumda gizlilik ve ima dili baskın. Açıklık ve güven alanı ilişkide denge getirecek. İç sesinizi net ifadeye dönüştürmek gerek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ra_pos1',
    card: 'The Empress',
    position: 1,
    upright:
      'İmparatoriçe, ilişkinin mevcut durumda sevgi, bakım ve bereket enerjisiyle beslendiğini söyler. Şefkat bağa canlılık getiriyor. İpucu: Verirken kendinizi de besleyin.',
    reversed:
      'Ters İmparatoriçe, aşırı sahiplenme veya bakım eksikliğinin mevcut durumda dengeyi bozduğunu gösterir. Belirti: Tükenmiş şefkat, kıskançlık gölgesi.',
    keywords: ['şefkat', 'bolluk', 'besleme', 'dişil enerji', 'uyum'],
    context:
      'Mevcut durumda sevgi akışı kuvvetli. Ancak öz bakım eksik kalırsa bağ zayıflar. Dengeli şefkat ilişkinizi besleyecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ra_pos1',
    card: 'The Emperor',
    position: 1,
    upright:
      'İmparator, ilişkinin mevcut durumda güvenlik ve düzen ihtiyacıyla şekillendiğini gösterir. Sağlamlık arayışı baskın. İpucu: Sınırlar sevgiyle çizilmeli.',
    reversed:
      'Ters İmparator, katılık ve kontrolün mevcut enerjide gölge yarattığını anlatır. Esneklik kaybolabilir. Belirti: İnat ve soğukluk.',
    keywords: ['güven', 'düzen', 'otorite', 'sınır', 'istikrar'],
    context:
      'Mevcut durumda güven arayışı öne çıkıyor. Aşırı katılık yakınlığı zorlaştırabilir. Esneklik sevgiye alan açacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ra_pos1',
    card: 'The Hierophant',
    position: 1,
    upright:
      'Aziz, ilişkinin mevcut durumda değerler ve geleneklerle sınandığını gösterir. Onay ve kabul arayışı hissediliyor. İpucu: Ortak değerleri gözden geçirin.',
    reversed:
      'Ters Aziz, geleneksel kalıpların ya da isyanın mevcut durumda uyumu zorladığını söyler. Belirti: Kalıplaşmış roller, içsel çatışma.',
    keywords: ['değer', 'gelenek', 'onay', 'uyum', 'ritüel'],
    context:
      'Mevcut durumda değerler konusu ön planda. Uyum sağlamak için ortak pusula şart. Kendi özgün yolunuzu da koruyun.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ra_pos1',
    card: 'The Lovers',
    position: 1,
    upright:
      'Aşıklar, ilişkinin mevcut durumda uyum ve seçim enerjisiyle şekillendiğini söyler. Değer hizası gündemdedir. İpucu: Kalbinizin evet dediğini dinleyin.',
    reversed:
      'Ters Aşıklar, kararsızlık ve değer çatışmasının mevcut durumda bağa gölge düşürdüğünü gösterir. Belirti: Git–kal ikilemi.',
    keywords: ['uyum', 'seçim', 'değer', 'karar', 'ilişki'],
    context:
      'Mevcut durumda seçimler kalbi zorluyor. Uyum için net karar şart. Kalp ve akıl dengelenmeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ra_pos1',
    card: 'The Chariot',
    position: 1,
    upright:
      'Savaş Arabası, ilişkinin mevcut durumda ilerleme ve kontrol arzusuyla dolu olduğunu gösterir. Ortak yön bulmak isteniyor. İpucu: Direksiyonu birlikte tutun.',
    reversed:
      'Ters Savaş Arabası, savrulma ve yön kaybının mevcut enerjide hakim olduğunu anlatır. Belirti: Erteleme ve hız çatışması.',
    keywords: ['yön', 'kontrol', 'ivme', 'disiplin', 'hedef'],
    context:
      'Mevcut durumda hız ve yön farkı göze çarpıyor. Senkron bulunmazsa çatışma büyüyebilir. Net hedefler uyumu artırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ra_pos1',
    card: 'Strength',
    position: 1,
    upright:
      'Güç, ilişkinin mevcut durumda sabır ve şefkat üzerine kurulduğunu gösterir. Nazik cesaret bağa hayat veriyor. İpucu: Gücünüz şefkatte.',
    reversed:
      'Ters Güç, kıskançlık ve sabırsızlığın mevcut durumda gölge yarattığını anlatır. Belirti: Küçük tetik–büyük tepki.',
    keywords: ['şefkat', 'sabır', 'cesaret', 'özgüven', 'naziklik'],
    context:
      'Mevcut durumda sakin güç ön planda. Öfke yerine şefkat bağınızı iyileştirecek. Nazik duruş en güçlü yanınız.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ra_pos1',
    card: 'The Hermit',
    position: 1,
    upright:
      'Ermiş, ilişkinin mevcut durumda içsel sorgulama ve yalnızlık ihtiyacıyla sınandığını gösterir. İç ses aranıyor. İpucu: İçsel ışığınızı paylaşın.',
    reversed:
      'Ters Ermiş, aşırı geri çekilmenin mevcut durumda mesafe yarattığını gösterir. Belirti: Uzaklaşma ve iletişim eksikliği.',
    keywords: ['içe dönüş', 'yalnızlık', 'rehberlik', 'mesafe', 'sessizlik'],
    context:
      'Mevcut durumda yalnızlık ve sorgulama enerjisi var. İçsel cevap aranıyor. İletişim köprüsü yeniden kurulmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ra_pos1',
    card: 'The Wheel of Fortune',
    position: 1,
    upright:
      'Kader Çarkı, ilişkinin mevcut durumda döngüler ve şans kapılarıyla hareket ettiğini söyler. Rastlantılar yön belirliyor. İpucu: Zamanlamaya dikkat edin.',
    reversed:
      'Ters Kader Çarkı, tekrar eden alışkanlıkların ve kısır döngülerin mevcut durumda bağı zorladığını anlatır. Belirti: Aynı tartışmaların tekrarı.',
    keywords: ['döngü', 'zamanlama', 'alışkanlık', 'değişim', 'şans'],
    context:
      'Mevcut durumda kaderin döngüleri etkili. Tekrar eden temalar bağı yoruyor. Kalıbı kırmak ilerleme getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ra_pos1',
    card: 'Justice',
    position: 1,
    upright:
      'Adalet, ilişkinin mevcut durumda denge ve eşitlik arayışıyla şekillendiğini söyler. Hesaplaşma ve netlik zamanı olabilir. İpucu: Teraziyi adil tutun.',
    reversed:
      'Ters Adalet, çifte standart ve sorumluluk kaçışının mevcut durumda bağı zorladığını gösterir. Belirti: İçerleme ve kırgınlık.',
    keywords: ['adalet', 'denge', 'sorumluluk', 'şeffaflık', 'karar'],
    context:
      'Mevcut durumda adil paylaşım önem kazanıyor. Eşitlik eksikliği bağı zedeleyebilir. Açık hesaplaşma huzur getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ra_pos1',
    card: 'The Hanged Man',
    position: 1,
    upright:
      'Asılan Adam, ilişkinin mevcut durumda bekleyiş ve fedakarlık enerjisiyle ilerlediğini söyler. Perspektif değişimi gerekiyor. İpucu: Bekleyişte anlam arayın.',
    reversed:
      'Ters Asılan Adam, tek taraflı özveri ve ertelemelerin mevcut durumda bağı yorduğunu anlatır. Belirti: Kurban rolü, atalet.',
    keywords: ['bekleyiş', 'fedakarlık', 'perspektif', 'erteleme', 'atalet'],
    context:
      'Mevcut durumda kararlar askıda. Fedakarlık tek yönlü hissedilebilir. Perspektif değişimi ilişkiye yeni nefes getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ra_pos1',
    card: 'Death',
    position: 1,
    upright:
      'Ölüm, ilişkinin mevcut durumda dönüşüm ve yenilenme eşiğinde olduğunu gösterir. Eski kalıplar kapanıyor. İpucu: Bitişi kabul edin, yeniye alan açın.',
    reversed:
      'Ters Ölüm, değişime direnç ve geçmişi uzatma çabasının mevcut durumda bağı zorladığını anlatır. Belirti: Bitmeyen döngü.',
    keywords: ['bitiş', 'dönüşüm', 'yenilenme', 'direnç', 'kapanış'],
    context:
      'Mevcut durumda bir dönem sona eriyor. Eskiye tutunmak zorluk çıkarabilir. Yenilenme bağı tazeleyecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ra_pos1',
    card: 'Temperance',
    position: 1,
    upright:
      'Denge, ilişkinin mevcut durumda uyum ve ölçülülük arayışıyla ilerlediğini gösterir. Orta yol bulunmaya çalışılıyor. İpucu: Sabırlı karışımlar huzur getirir.',
    reversed:
      'Ters Denge, aşırılıklar ve uyum eksikliğinin mevcut durumda bağı zorladığını gösterir. Belirti: Ya hep ya hiç tavrı.',
    keywords: ['denge', 'uyum', 'sabır', 'sentez', 'ölçü'],
    context:
      'Mevcut durumda orta yol arayışı var. Aşırılıklar bağınızı yoruyor. Uyum ritmi huzuru artıracak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ra_pos1',
    card: 'The Devil',
    position: 1,
    upright:
      'Şeytan, ilişkinin mevcut durumda bağımlılık, kıskançlık ve kontrol enerjileriyle sınandığını söyler. Zincirler görünmez olabilir. İpucu: Sınırları onurlandırın.',
    reversed:
      'Ters Şeytan, zincirleri kırma isteğinin mevcut durumda öne çıktığını anlatır. Fakat gölgeler hâlâ güçlü. Belirti: Bırak–geri dön salınımı.',
    keywords: ['bağımlılık', 'takıntı', 'kıskançlık', 'kontrol', 'özgürlük'],
    context:
      'Mevcut durumda bağda kontrol ve bağımlılık temaları öne çıkıyor. Özgürleşme çabası önemli. Net sınırlar şifa getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ra_pos1',
    card: 'The Tower',
    position: 1,
    upright:
      'Kule, ilişkinin mevcut durumda ani bir sarsıntı veya gerçeğin ortaya çıkışıyla değiştiğini söyler. Temeller test ediliyor. İpucu: Yıkılanı onarın, yeniyi kurun.',
    reversed:
      'Ters Kule, ertelenen krizlerin ve yüzeysel çözümlerin mevcut durumda bağı yorduğunu gösterir. Belirti: Küçük çatlaklar, büyük deprem işareti.',
    keywords: ['kriz', 'yıkım', 'gerçek', 'yeniden inşa', 'temel'],
    context:
      'Mevcut durumda kriz enerjisi hissediliyor. Temeller zayıfsa yıkım yaşanabilir. Gerçeği kabul etmek yeniden inşa için şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ra_pos1',
    card: 'The Star',
    position: 1,
    upright:
      'Yıldız, ilişkinin mevcut durumda umut ve iyileşme ışığı taşıdığını söyler. Şifa süreci başlamış olabilir. İpucu: Sabırla yenilenmeye izin verin.',
    reversed:
      'Ters Yıldız, umutsuzluk ve motivasyon kaybının mevcut durumda gölge yarattığını gösterir. Belirti: Pes etme dili.',
    keywords: ['umut', 'şifa', 'yenilenme', 'sadelik', 'sabır'],
    context:
      'Mevcut durumda iyileşme ışığı yanıyor. Ancak sabırsızlık umudu gölgeleyebilir. Küçük adımlar bağınızı onaracak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ra_pos1',
    card: 'The Moon',
    position: 1,
    upright:
      'Ay, ilişkinin mevcut durumda belirsizlik, korku ve yanılsamalarla şekillendiğini söyler. Sis yoğun olabilir. İpucu: Varsayımları test edin.',
    reversed:
      'Ters Ay, sisin dağılmaya başladığını ama güvensizliğin hâlâ iz bıraktığını gösterir. Belirti: Çelişkili işaretler.',
    keywords: ['belirsizlik', 'korku', 'yanılsama', 'projeksiyon', 'güven'],
    context:
      'Mevcut durumda netlik eksikliği var. Yanılsamalar bağınızı etkiliyor. Açık iletişim sis perdesini kaldıracak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ra_pos1',
    card: 'The Sun',
    position: 1,
    upright:
      'Güneş, ilişkinin mevcut durumda sıcaklık, açıklık ve neşeyle aydınlandığını söyler. Sevinç bağı güçlendiriyor. İpucu: Otantik sevinci paylaşın.',
    reversed:
      'Ters Güneş, yapay mutluluk ve yüzeysel pozitifliğin mevcut durumda gölge yarattığını gösterir. Belirti: İçtenlik eksikliği.',
    keywords: ['sevinç', 'açıklık', 'otantiklik', 'umut', 'paylaşım'],
    context:
      'Mevcut durumda bağda ışık ve sıcaklık var. Ancak içtenlik eksik kalırsa yüzeyselleşebilir. Gerçek sevinç güven yaratacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ra_pos1',
    card: 'Judgement',
    position: 1,
    upright:
      'Mahkeme, ilişkinin mevcut durumda yüzleşme ve yeniden değerlendirme sürecinde olduğunu söyler. Eski defterler açılıyor. İpucu: Affetmeyi öğrenin.',
    reversed:
      'Ters Mahkeme, geçmişin kapanmaması ve öz sorumluluk eksikliğinin mevcut durumda bağı zorladığını gösterir. Belirti: Suçlama–savunma döngüsü.',
    keywords: ['yüzleşme', 'karar', 'yenilenme', 'affediş', 'geçmiş'],
    context:
      'Mevcut durumda geçmişle hesaplaşma var. Bu yüzleşme yenilenmeye zemin hazırlayabilir. Affetmek bağı şifalandıracak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ra_pos1',
    card: 'The World',
    position: 1,
    upright:
      'Dünya, ilişkinin mevcut durumda tamamlama ve yeni eşiğe adım atma enerjisiyle dolu olduğunu söyler. Döngü kapanıyor. İpucu: Başarıyı kutlayın.',
    reversed:
      'Ters Dünya, yarım kalmışlık ve tamamlanmamış süreçlerin mevcut durumda bağı zorladığını gösterir. Belirti: Ertelenen kararlar.',
    keywords: ['tamamlama', 'döngü', 'bütünlük', 'eşik', 'yeni başlangıç'],
    context:
      'Mevcut durumda bir döngü tamamlanıyor. Eksik kalanlar huzuru gölgeleyebilir. Tamamlanma bağı ileri taşıyacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'ace_of_cups_ra_pos1',
    card: 'Ace of Cups',
    position: 1,
    upright:
      'Kupa Ası, ilişkinizin şu an duygusal bir başlangıç ve sevgi taşmasıyla dolu olduğunu söyler. Kalpler açılmaya hazır. İpucu: Saf sevgiyi akıtın.',
    reversed:
      'Ters Kupa Ası, mevcut durumda duyguların bastırıldığını ya da ifade edilmediğini gösterir. Belirti: Kapalı kalpler, suskun sevgi.',
    keywords: ['başlangıç', 'sevgi', 'açılım', 'duygu', 'saflık'],
    context:
      'Mevcut durumda yeni duygular filizleniyor. Açık kalmak bağı büyütecek. Kapalı kalpler engel yaratabilir.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ra_pos1',
    card: 'Two of Cups',
    position: 1,
    upright:
      'Kupa İkilisi, ilişkinin mevcut durumda karşılıklı uyum ve birlik arzusuyla şekillendiğini gösterir. Bağ güçleniyor. İpucu: Sevgi alışverişini kutsayın.',
    reversed:
      'Ters Kupa İkilisi, uyumun bozulduğunu ve yanlış anlamaların mevcut durumda bağı zorladığını söyler. Belirti: Küçük anlaşmazlıklar büyüyor.',
    keywords: ['uyum', 'ortaklık', 'bağ', 'birlik', 'dengelenme'],
    context:
      'Mevcut durumda sevgi ve ortaklık enerjisi baskın. Fakat yanlış anlamalar uyumu zedeleyebilir. Açık iletişim şart.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ra_pos1',
    card: 'Three of Cups',
    position: 1,
    upright:
      'Kupa Üçlüsü, ilişkinin mevcut durumda kutlama, dostluk ve paylaşım enerjisiyle beslendiğini gösterir. Birlikte keyif öne çıkıyor. İpucu: Birliktelikleri kutlayın.',
    reversed:
      'Ters Kupa Üçlüsü, üçüncü kişilerin ya da aşırı sosyal etkileşimin mevcut durumda bağı gölgelediğini gösterir. Belirti: Karışan enerjiler.',
    keywords: ['kutlama', 'paylaşım', 'dostluk', 'keyif', 'topluluk'],
    context:
      'Mevcut durumda eğlence ve paylaşım baskın. Ancak dış etkiler bağı zorlayabilir. Sınırlar denge getirecek.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ra_pos1',
    card: 'Four of Cups',
    position: 1,
    upright:
      'Kupa Dörtlüsü, ilişkinin mevcut durumda duygusal durgunluk ve tatminsizlik hissiyle sınandığını söyler. İlgisizlik enerjisi var. İpucu: Önünüze geleni fark edin.',
    reversed:
      'Ters Kupa Dörtlüsü, mevcut durumda yeni fırsatlara açılma arzusunu ama aynı zamanda tereddütü gösterir. Belirti: Kararsızlık, dalgınlık.',
    keywords: [
      'durgunluk',
      'tatminsizlik',
      'ilgisizlik',
      'fırsat',
      'yenilenme',
    ],
    context:
      'Mevcut durumda monotonluk öne çıkıyor. Yeni duygusal fırsatlar fark edilmeli. Aksi halde bağ yavaşlar.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ra_pos1',
    card: 'Five of Cups',
    position: 1,
    upright:
      'Kupa Beşlisi, ilişkinin mevcut durumda hayal kırıklıkları ve kayıplara odaklandığını söyler. Üzüntü enerjisi ağır basıyor. İpucu: Kalan sevgiye bakın.',
    reversed:
      'Ters Kupa Beşlisi, yasın geride bırakılmaya başlandığını ve iyileşme enerjisinin mevcut durumda açıldığını gösterir. Belirti: Kabullenme, yeni umut.',
    keywords: ['kayıp', 'üzüntü', 'hayal kırıklığı', 'yas', 'kabullenme'],
    context:
      'Mevcut durumda kalp kayıplara odaklı. Ama hâlâ duran sevgi fark edilirse denge gelir. İyileşme kapısı açık.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ra_pos1',
    card: 'Six of Cups',
    position: 1,
    upright:
      'Kupa Altılısı, ilişkinin mevcut durumda geçmiş anılar ve nostaljiyle beslendiğini söyler. Saf ve masum enerji var. İpucu: Çocuk kalbinizi hatırlayın.',
    reversed:
      'Ters Kupa Altılısı, geçmişe takılı kalmanın ve eski defterlerin açılmasının mevcut durumda bağı zorladığını gösterir. Belirti: Geçmişten çıkamamak.',
    keywords: ['geçmiş', 'nostalji', 'masumiyet', 'anı', 'çocukluk'],
    context:
      'Mevcut durumda geçmişe dönüş enerjisi hakim. Saf sevgi hissediliyor. Ama geçmişe saplanmak ilerlemeyi engelleyebilir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ra_pos1',
    card: 'Seven of Cups',
    position: 1,
    upright:
      'Kupa Yedilisi, ilişkinin mevcut durumda hayaller ve seçeneklerle dolu olduğunu gösterir. Kafa karışıklığı olabilir. İpucu: Gerçeği hayalden ayırın.',
    reversed:
      'Ters Kupa Yedilisi, kararsızlık ve yanılsamanın mevcut durumda gölge yarattığını gösterir. Belirti: Hayal–gerçek çatışması.',
    keywords: ['hayal', 'seçenek', 'yanılsama', 'kararsızlık', 'fırsat'],
    context:
      'Mevcut durumda hayaller bol. Ama gerçek adım eksikliği bağı zorlayabilir. Net seçim huzur getirecek.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ra_pos1',
    card: 'Eight of Cups',
    position: 1,
    upright:
      'Kupa Sekizlisi, ilişkinin mevcut durumda duygusal bir geri çekilme veya arayış enerjisi taşıdığını gösterir. İçsel sorgu öne çıkıyor. İpucu: Kalbinizin yönünü takip edin.',
    reversed:
      'Ters Kupa Sekizlisi, mevcut durumda kaçamamanın ya da eskiye dönmenin bağı zorladığını gösterir. Belirti: Bitmeyen geri dönüşler.',
    keywords: ['geri çekilme', 'arayış', 'tatminsizlik', 'ayrılış', 'yön'],
    context:
      'Mevcut durumda bir taraf geri çekiliyor olabilir. İçsel arayış baskın. Kalbe dürüst olmak huzur verecek.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ra_pos1',
    card: 'Nine of Cups',
    position: 1,
    upright:
      'Kupa Dokuzlusu, ilişkinin mevcut durumda dileklerin gerçekleşmesi ve tatmin enerjisi taşıdığını söyler. Kalpler dolu hissediyor. İpucu: Şükranla paylaşın.',
    reversed:
      'Ters Kupa Dokuzlusu, yüzeysel tatmin ve aşırı beklentilerin mevcut durumda gölge yarattığını gösterir. Belirti: Fazla istemek, doyumsuzluk.',
    keywords: ['tatmin', 'dilek', 'memnuniyet', 'bolluk', 'şükran'],
    context:
      'Mevcut durumda bağ keyif ve tatmin enerjisiyle dolu. Ama aşırı beklenti gölge yaratabilir. Şükran bağı koruyacak.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ra_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'Kupa Onlusu, ilişkinin mevcut durumda huzur, birlik ve aile sıcaklığıyla dolu olduğunu gösterir. Tamamlanma enerjisi hakim. İpucu: Paylaşılan sevgi kutlansın.',
    reversed:
      'Ters Kupa Onlusu, ailevi huzursuzlukların ya da birlik eksikliğinin mevcut durumda gölge yarattığını söyler. Belirti: Ev içi gerilim.',
    keywords: ['mutluluk', 'birlik', 'aile', 'huzur', 'tamamlanma'],
    context:
      'Mevcut durumda bağda huzur ve sıcaklık öne çıkıyor. Birlik duygusu güçlü. Küçük çatışmalar gölge olabilir ama sevgi baskın.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ra_pos1',
    card: 'Page of Cups',
    position: 1,
    upright:
      'Kupa Prensi, ilişkinin mevcut durumda saf ve çocukça bir sevgi enerjisi taşıdığını söyler. Romantik sürprizler ve duygusal açıklık öne çıkar. İpucu: Kalbinizi oyunbaz bir dille açın.',
    reversed:
      'Ters Kupa Prensi, duygusal olgunlaşma eksikliğinin veya yüzeysel hislerin mevcut durumda bağı zorladığını gösterir. Belirti: Alınganlık, abartılı duygular.',
    keywords: ['masumiyet', 'romantizm', 'duygusallık', 'sevimlilik', 'oyun'],
    context:
      'Mevcut durumda bağ masum bir romantizmle akıyor. Fakat duygusal olgunluk eksikliği engel olabilir. Saf kalp enerjisi bağı besleyecek.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ra_pos1',
    card: 'Knight of Cups',
    position: 1,
    upright:
      'Kupa Şövalyesi, ilişkinin mevcut durumda romantik teklifler ve duygusal jestlerle hareketlendiğini gösterir. Sevgi ifade buluyor. İpucu: Açık kalbinizle yaklaşın.',
    reversed:
      'Ters Kupa Şövalyesi, hayalperestlik ve boş vaatlerin mevcut durumda gölge yarattığını söyler. Belirti: Tutarsız romantizm.',
    keywords: ['romantizm', 'jest', 'teklif', 'hayal', 'hareket'],
    context:
      'Mevcut durumda bağ romantizmle renkleniyor. Fakat tutarlılık eksikliği sorun yaratabilir. Gerçek niyetlerle yaklaşmak şifa getirecek.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ra_pos1',
    card: 'Queen of Cups',
    position: 1,
    upright:
      'Kupa Kraliçesi, ilişkinin mevcut durumda şefkat, empati ve duygusal derinlik enerjisiyle beslendiğini söyler. Kalpler açık. İpucu: Duygularınızı sezgiyle yönlendirin.',
    reversed:
      'Ters Kupa Kraliçesi, aşırı hassasiyet ve duygusal bağımlılığın mevcut durumda bağı zorladığını gösterir. Belirti: Alınganlık ve duygu iniş çıkışları.',
    keywords: ['şefkat', 'empati', 'duygusallık', 'derinlik', 'sezgi'],
    context:
      'Mevcut durumda bağ şefkatle örülü. Ancak aşırı hassasiyet iletişimi zorlaştırabilir. Duygusal denge bağı güçlendirecek.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ra_pos1',
    card: 'King of Cups',
    position: 1,
    upright:
      'Kupa Kralı, ilişkinin mevcut durumda olgun sevgi, anlayış ve duygusal denge enerjisi taşıdığını söyler. Kalbiniz güçlü bir merkezde. İpucu: Olgunluğunuzla yol gösterin.',
    reversed:
      'Ters Kupa Kralı, duygusal manipülasyon ya da bastırmanın mevcut durumda gölge yarattığını anlatır. Belirti: Gizli kırgınlık, pasif agresiflik.',
    keywords: ['olgunluk', 'denge', 'şefkat', 'hassasiyet', 'bilgelik'],
    context:
      'Mevcut durumda bağ olgun duygularla besleniyor. Ancak bastırılan kırgınlık gölge olabilir. Açık yüreklilik bağı onaracak.',
    group: 'Kupalar',
  },
  {
    id: 'ace_of_pentacles_ra_pos1',
    card: 'Ace of Pentacles',
    position: 1,
    upright:
      'Tılsım Ası, mevcut durumda ilişkinin somut temeller üzerine kurulmaya başladığını gösterir. Güven, düzen ve yeni bir başlangıç enerjisi var. İpucu: Küçük ama sağlam adımlar atın.',
    reversed:
      'Ters Tılsım Ası, fırsatların gözden kaçtığını ya da güvensizliklerin somut adımı engellediğini söyler. Belirti: Erteleme ve çekingenlik.',
    keywords: ['başlangıç', 'güven', 'somutluk', 'temel', 'fırsat'],
    context:
      'Mevcut durumda ilişki güvenli bir temel arıyor. Somut adımlar bağa güç katacak. İhmal edilen fırsatlar toparlanmalı.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ra_pos1',
    card: 'Two of Pentacles',
    position: 1,
    upright:
      'İki Tılsım, mevcut durumda dengenin arandığını söyler. Günlük hayat, iş ve ilişki arasında denge kurma çabası hissediliyor. İpucu: Önceliklerinizi sadeleştirin.',
    reversed:
      'Ters İki Tılsım, sorumlulukların ve programların çakışmasının bağı zorladığını gösterir. Belirti: Dağınıklık ve ihmal.',
    keywords: ['denge', 'öncelik', 'zaman', 'enerji', 'esneklik'],
    context:
      'Mevcut durumda bağ çoklu sorumluluklarla sınanıyor. Zaman yönetimi kalpleri rahatlatacak. Sadelik huzur getirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ra_pos1',
    card: 'Three of Pentacles',
    position: 1,
    upright:
      'Üç Tılsım, mevcut durumda işbirliği, rol paylaşımı ve ortak hedeflere doğru ilerleme enerjisini gösterir. İpucu: Takım ruhunu büyütün.',
    reversed:
      'Ters Üç Tılsım, katkıların görünmemesi veya uyumsuz işbirliğinin bağı zorladığını söyler. Belirti: Motivasyon düşüklüğü.',
    keywords: ['işbirliği', 'paylaşım', 'rol', 'takım', 'hedef'],
    context:
      'Mevcut durumda ilişki işbirliği ihtiyacıyla sınanıyor. Ortak çaba bağın temelini sağlamlaştıracak.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ra_pos1',
    card: 'Four of Pentacles',
    position: 1,
    upright:
      'Dört Tılsım, mevcut durumda güvenlik ihtiyacının öne çıktığını gösterir. Duyguların ya da kaynakların korunmaya çalışıldığı bir dönemdesiniz. İpucu: Paylaşmayı öğrenin.',
    reversed:
      'Ters Dört Tılsım, aşırı tutma ya da aşırı savurganlığın bağı zorladığını söyler. Belirti: Kontrollü ya da sıkışmış hisler.',
    keywords: ['güvenlik', 'kontrol', 'paylaşım', 'koruma', 'sabitlik'],
    context:
      'Mevcut durumda güvenli alan yaratma çabası var. Ancak aşırı tutma bağı daraltabilir. Dengeli paylaşım huzur getirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ra_pos1',
    card: 'Five of Pentacles',
    position: 1,
    upright:
      'Beş Tılsım, mevcut durumda dışlanmışlık ya da maddi–manevi yoksunluk hissini gösterir. İpucu: Yardım istemekten çekinmeyin.',
    reversed:
      'Ters Beş Tılsım, toparlanma niyeti olsa da yalnız başa çıkma eğiliminin bağı zorladığını söyler. Belirti: Sessiz sıkışma.',
    keywords: ['kıtlık', 'yalnızlık', 'yardım', 'destek', 'dışlanmışlık'],
    context:
      'Mevcut durumda bir taraf kendini dışlanmış hissediyor olabilir. Dayanışma kapıyı açacak. Paylaşım şifa getirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ra_pos1',
    card: 'Six of Pentacles',
    position: 1,
    upright:
      'Altı Tılsım, mevcut durumda denge ve adalet ihtiyacını gösterir. Veren–alan rolleri gündemdedir. İpucu: Eşitlikçi olun.',
    reversed:
      'Ters Altı Tılsım, iyilik karşılığı beklentilerin bağı zorladığını anlatır. Belirti: Minnet baskısı.',
    keywords: ['adalet', 'paylaşım', 'denge', 'eşitlik', 'yardım'],
    context:
      'Mevcut durumda bağ adil paylaşım isteğiyle sınanıyor. Koşulsuz destek bağın köklerini güçlendirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ra_pos1',
    card: 'Seven of Pentacles',
    position: 1,
    upright:
      'Yedi Tılsım, mevcut durumda sabır ve yatırım enerjisini gösterir. İlişki yavaş ama istikrarlı büyüyor. İpucu: Zamana güvenin.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık ve erken vazgeçmenin gölge yarattığını söyler. Belirti: Çabuk pes etme.',
    keywords: ['sabır', 'yatırım', 'verim', 'ilerleme', 'zaman'],
    context:
      'Mevcut durumda bağ meyvesini zamanla verecek. Sabırlı olmak ilişkinin gücünü artıracak.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ra_pos1',
    card: 'Eight of Pentacles',
    position: 1,
    upright:
      'Sekiz Tılsım, mevcut durumda ilişkiye emek ve özen gösterildiğini söyler. Küçük adımlar büyük bağ kurar. İpucu: Öğrenerek ilerleyin.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik ya da çabuk sonuç arayışının gölge yarattığını gösterir. Belirti: Tekrarlayan hatalar.',
    keywords: ['emek', 'özen', 'çalışma', 'öğrenme', 'sabır'],
    context:
      'Mevcut durumda bağın işçiliği önem taşıyor. Özenli adımlar kalpleri yakınlaştıracak.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ra_pos1',
    card: 'Nine of Pentacles',
    position: 1,
    upright:
      'Dokuz Tılsım, mevcut durumda bağımsızlık ve kişisel alan ihtiyacının ön planda olduğunu gösterir. Konfor alanı kutsanıyor. İpucu: Özgürlük ile paylaşımı dengeleyin.',
    reversed:
      'Ters Dokuz Tılsım, aşırı bağımsızlık ya da israfın bağı zorladığını gösterir. Belirti: Tatminsizlik.',
    keywords: ['bağımsızlık', 'konfor', 'özgürlük', 'alan', 'tatmin'],
    context:
      'Mevcut durumda bağ içinde kişisel alan arayışı var. Dengeli sınırlar bağı güçlendirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ra_pos1',
    card: 'Ten of Pentacles',
    position: 1,
    upright:
      'On Tılsım, mevcut durumda uzun vadeli güvence, aile ve istikrar temaları baskın. İpucu: Geleceği birlikte planlayın.',
    reversed:
      'Ters On Tılsım, aile baskısı ya da uzun vadeli planlarda uyumsuzluğun gölge yarattığını gösterir. Belirti: Gelecek kaygısı.',
    keywords: ['aile', 'istikrar', 'uzun vade', 'güvence', 'miras'],
    context:
      'Mevcut durumda bağ uzun vadeli düşüncelerle şekilleniyor. Açık planlama huzur getirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ra_pos1',
    card: 'Page of Pentacles',
    position: 1,
    upright:
      'Tılsım Prensi, mevcut durumda öğrenme ve gelişim enerjisi öne çıkıyor. Küçük ama değerli adımlar atılıyor. İpucu: Merakla öğrenin.',
    reversed:
      'Ters Tılsım Prensi, odaksızlık ve ertelemenin bağı zorladığını söyler. Belirti: Başlanmayan niyetler.',
    keywords: ['öğrenme', 'başlangıç', 'adım', 'hedef', 'merak'],
    context:
      'Mevcut durumda bağ öğrenme ve büyüme aşamasında. Küçük adımlar büyük fark yaratacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ra_pos1',
    card: 'Knight of Pentacles',
    position: 1,
    upright:
      'Tılsım Şövalyesi, mevcut durumda sabırlı, istikrarlı ve güvenli bir ilerleme enerjisi var. İpucu: Düzenli ve güvenilir olun.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık ve inatçılığın bağı zorladığını gösterir. Belirti: Monotonluk.',
    keywords: ['istikrar', 'sabır', 'düzen', 'güven', 'çalışkanlık'],
    context:
      'Mevcut durumda bağ düzenli ilerliyor. Monotonluk yerine esneklik huzur getirecek.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ra_pos1',
    card: 'Queen of Pentacles',
    position: 1,
    upright:
      'Tılsım Kraliçesi, mevcut durumda şefkatli bakım, ev ve pratik düzen enerjisi ön planda. İpucu: Besleyici yanınızı koruyun.',
    reversed:
      'Ters Tılsım Kraliçesi, kendini ihmal etmenin ya da aşırı yüklenmenin bağı zorladığını gösterir. Belirti: Yorgunluk.',
    keywords: ['bakım', 'pratiklik', 'ev', 'şefkat', 'kaynak'],
    context:
      'Mevcut durumda bağ bakım ve destek enerjisiyle akıyor. Ancak öz bakım unutulursa denge bozulabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ra_pos1',
    card: 'King of Pentacles',
    position: 1,
    upright:
      'Tılsım Kralı, mevcut durumda güven, istikrar ve maddi–manevi sağlamlık öne çıkıyor. İpucu: Sorumluluk alın ve köklerinizi güçlendirin.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol ya da maddi kaygının bağı zorladığını gösterir. Belirti: Sertlik, cimrilik.',
    keywords: ['güven', 'istikrar', 'liderlik', 'sorumluluk', 'bolluk'],
    context:
      'Mevcut durumda bağ sağlam bir güven enerjisi taşıyor. Fakat aşırı kontrol gölge yaratabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'ace_of_swords_ra_pos1',
    card: 'Ace of Swords',
    position: 1,
    upright:
      'Kılıç Ası, mevcut durumda gerçeğin ve netliğin aranışını gösterir. İlişkide açık konuşma ve hakikat ihtiyacı baskın. İpucu: Sözcükleri keskin değil şifalı kullanın.',
    reversed:
      'Ters Kılıç Ası, bulanıklık, çarpıtılmış sözler ve netlikten kaçışın gölge yarattığını söyler. Belirti: Yanlış anlaşılmalar.',
    keywords: ['gerçek', 'netlik', 'iletişim', 'tanım', 'doğruluk'],
    context:
      'Mevcut durumda bağda hakikati ortaya koyma ihtiyacı öne çıkıyor. Açık iletişim huzur getirecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ra_pos1',
    card: 'Two of Swords',
    position: 1,
    upright:
      'İki Kılıç, mevcut durumda karar verememe ve ikilemin baskın olduğunu söyler. Kalp ile akıl arasında sıkışma yaşanıyor. İpucu: Görmekten kaçmayın.',
    reversed:
      'Ters İki Kılıç, bastırılan konuların aniden patladığını anlatır. Belirti: Ani tepkiler.',
    keywords: ['ikilem', 'karar', 'kaçınma', 'denge', 'yüzleşme'],
    context:
      'Mevcut durumda bağ karar felciyle sınanıyor. Yüzleşme kaçınılmaz hale geliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ra_pos1',
    card: 'Three of Swords',
    position: 1,
    upright:
      'Üç Kılıç, mevcut durumda kalp kırıklığı ya da incitici sözlerin gölgesini gösterir. İpucu: Acıyı onarmadan ilerlemeyin.',
    reversed:
      'Ters Üç Kılıç, yaraların sarılmaya çalışıldığını ama sessizliğin süreci uzattığını söyler. Belirti: Sızdıran kırgınlık.',
    keywords: ['kırgınlık', 'acı', 'ihanet algısı', 'onarma', 'gerçek'],
    context:
      'Mevcut durumda bağ kırgınlıkla yüzleşiyor. Şefkatli konuşma şifa olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ra_pos1',
    card: 'Four of Swords',
    position: 1,
    upright:
      'Dört Kılıç, mevcut durumda dinlenme ve düşünme ihtiyacını gösterir. İlişki mola enerjisine girmiş olabilir. İpucu: Suskunluk şifa için kullanılmalı.',
    reversed:
      'Ters Dört Kılıç, mola ihtiyacının reddedildiğini ya da zoraki mesafenin kırgınlık yarattığını söyler. Belirti: Yorgun zihin.',
    keywords: ['dinlenme', 'mola', 'düşünme', 'sükunet', 'toparlanma'],
    context:
      'Mevcut durumda bağ biraz soluklanmaya ihtiyaç duyuyor. Sessizlik doğru kullanılırsa yakınlaştırır.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ra_pos1',
    card: 'Five of Swords',
    position: 1,
    upright:
      'Beş Kılıç, mevcut durumda güç ve haklılık savaşlarını gösterir. Kazanmak uğruna bağ zedeleniyor olabilir. İpucu: Zafer değil uzlaşıya odaklanın.',
    reversed:
      'Ters Beş Kılıç, gururun onarımı geciktirdiğini söyler. Belirti: Özürsüz kapanış.',
    keywords: ['ego', 'çatışma', 'zafer', 'kaybetmek', 'uzlaşı'],
    context:
      'Mevcut durumda bağda ego savaşları öne çıkıyor. Alçakgönüllülük köprüleri onaracak.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ra_pos1',
    card: 'Six of Swords',
    position: 1,
    upright:
      'Altı Kılıç, mevcut durumda daha sakin bir yola geçme niyetini gösterir. Fırtınalı sular geride bırakılmak isteniyor. İpucu: Geçişe güvenin.',
    reversed:
      'Ters Altı Kılıç, geçmişe geri dönme eğiliminin huzuru geciktirdiğini söyler. Belirti: Tekrarlayan döngüler.',
    keywords: ['geçiş', 'sakinlik', 'ilerleme', 'yolculuk', 'adaptasyon'],
    context:
      'Mevcut durumda bağ daha huzurlu bir zemine taşınmak istiyor. Geçmişe saplanmamak iyileştirici olacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ra_pos1',
    card: 'Seven of Swords',
    position: 1,
    upright:
      'Yedi Kılıç, mevcut durumda şeffaflık sorunlarını gösterir. Saklanan sözler güveni zedeliyor olabilir. İpucu: Açıklık anahtardır.',
    reversed:
      'Ters Yedi Kılıç, itiraf niyetini ama çekingenliği gösterir. Belirti: Kaçamak cevaplar.',
    keywords: ['gizlilik', 'strateji', 'dürüstlük', 'saklama', 'güven'],
    context:
      'Mevcut durumda bağ dürüstlük testi yaşıyor. Netlik güveni yeniden kuracak.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ra_pos1',
    card: 'Eight of Swords',
    position: 1,
    upright:
      'Sekiz Kılıç, mevcut durumda kısıtlayıcı inançların etkili olduğunu söyler. Aslında açık olan yollar kapalı sanılıyor. İpucu: Zihinsel zincirleri kırın.',
    reversed:
      'Ters Sekiz Kılıç, özgürleşme ihtimalinin doğduğunu ama korkuların geri çektiğini gösterir. Belirti: Kararsız adımlar.',
    keywords: ['kısıt', 'korku', 'özgürlük', 'inanç', 'zihin'],
    context:
      'Mevcut durumda bağ korkularla sınanıyor. Cesurca adım atmak zincirleri çözecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ra_pos1',
    card: 'Nine of Swords',
    position: 1,
    upright:
      'Dokuz Kılıç, mevcut durumda kaygıların ve abartılı senaryoların ağır bastığını söyler. Zihin huzuru bulmakta zorlanıyor. İpucu: Gerçekle kaygıyı ayırın.',
    reversed:
      'Ters Dokuz Kılıç, kabusların hafiflemeye başladığını ama kalıntıların sürdüğünü söyler. Belirti: Uykusuzluk.',
    keywords: ['kaygı', 'kuruntu', 'uyku', 'zihin', 'abartı'],
    context:
      'Mevcut durumda bağ fazla düşünceyle yoruluyor. Kaygıların yerine güven koymak şifa getirecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ra_pos1',
    card: 'Ten of Swords',
    position: 1,
    upright:
      'On Kılıç, mevcut durumda yıpratıcı bir kapanışı veya tükenişi gösterir. Eski yöntem bitti. İpucu: Yeniden doğuma izin verin.',
    reversed:
      'Ters On Kılıç, toparlanma işaretlerini ama tam bir kapanış eksikliğini gösterir. Belirti: Yarım vedalar.',
    keywords: ['bitiş', 'kapanış', 'yenilenme', 'tükeniş', 'yeniden doğuş'],
    context:
      'Mevcut durumda bağ bir döngüyü kapatıyor. Yeniye alan açmak özgürleştirecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ra_pos1',
    card: 'Page of Swords',
    position: 1,
    upright:
      'Kılıç Prensi, mevcut durumda merak ve sorgulama enerjisi hakim. Sorular soruluyor, gerçek aranıyor. İpucu: Merakınızı nazikçe dile getirin.',
    reversed:
      'Ters Kılıç Prensi, dedikodu ve yanlış varsayımların gölge yarattığını söyler. Belirti: Teyitsiz bilgi.',
    keywords: ['merak', 'iletişim', 'soru', 'öğrenme', 'gerçek'],
    context:
      'Mevcut durumda bağ sorgulamalarla sınanıyor. Açık ve nazik iletişim güveni besleyecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ra_pos1',
    card: 'Knight of Swords',
    position: 1,
    upright:
      'Kılıç Şövalyesi, mevcut durumda hızlı ve keskin bir iletişim enerjisi var. Sözler aceleyle çıkıyor. İpucu: Önce dinleyin, sonra konuşun.',
    reversed:
      'Ters Kılıç Şövalyesi, sert tepkilerin bağın duvarlarını yükselttiğini söyler. Belirti: Kapatılan kapılar.',
    keywords: ['hız', 'sertlik', 'iletişim', 'tepki', 'keskinlik'],
    context:
      'Mevcut durumda bağda hız ve sertlik öne çıkıyor. Yumuşaklık iletişimi onaracak.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ra_pos1',
    card: 'Queen of Swords',
    position: 1,
    upright:
      'Kılıç Kraliçesi, mevcut durumda netlik ve analiz enerjisi var. Duygular ikinci planda kalmış olabilir. İpucu: Kalbi dışlamayın.',
    reversed:
      'Ters Kılıç Kraliçesi, eleştirel ve sert üslubun bağda soğukluk yarattığını söyler. Belirti: Alay ve sarkazm.',
    keywords: ['analiz', 'netlik', 'nesnellik', 'eleştiri', 'mesafe'],
    context:
      'Mevcut durumda bağ akıl odaklı işliyor. Şefkatle denge kurmak sıcaklık getirecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ra_pos1',
    card: 'King of Swords',
    position: 1,
    upright:
      'Kılıç Kralı, mevcut durumda kurallar ve ilkelerin ağır bastığını gösterir. Duygular geri planda olabilir. İpucu: Empatiye alan açın.',
    reversed:
      'Ters Kılıç Kralı, katı ve dogmatik üslubun bağı zorladığını söyler. Belirti: Soğuk hüküm.',
    keywords: ['kural', 'otorite', 'strateji', 'netlik', 'empati'],
    context:
      'Mevcut durumda bağ kurallarla yönetiliyor. Empatiyi öne çıkarmak kalpleri yumuşatacak.',
    group: 'Kılıçlar',
  },
  // RELATIONSHIP ANALYSIS (ra) – POSITION 1: "Mevcut Durum"
  // Set: Asalar (14 kart)

  {
    id: 'ace_of_wands_ra_pos1',
    card: 'Ace of Wands',
    position: 1,
    upright:
      'Değnek Ası, mevcut durumda ilişkinizde kıvılcım ve yeni başlangıç enerjisi olduğunu gösterir. Heves ve tutku artıyor. İpucu: Alevi planla besleyin.',
    reversed:
      'Ters Değnek Ası, ertelenmiş girişimler ve motivasyon düşüşünün mevcut durumda gölge yarattığını söyler. Belirti: Yarım kalmış adımlar.',
    keywords: ['başlangıç', 'heves', 'tutku', 'ilham', 'kıvılcım'],
    context:
      'Mevcut durumda bağ canlı bir kıvılcımla hareketleniyor. Planlama eksikliği enerjiyi söndürebilir.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ra_pos1',
    card: 'Two of Wands',
    position: 1,
    upright:
      'İki Değnek, mevcut durumda ufka bakma ve geleceği planlama isteğini gösterir. Ortak vizyon konuşuluyor. İpucu: Ufku birlikte çizin.',
    reversed:
      'Ters İki Değnek, kararsızlık ve risk almaktan kaçınmanın mevcut durumda durgunluk yarattığını söyler. Belirti: Sonsuz planlar, sıfır adım.',
    keywords: ['vizyon', 'plan', 'risk', 'gelecek', 'seçim'],
    context:
      'Mevcut durumda bağda ortak ufuk arayışı var. Cesaretle karar almak süreci hızlandıracak.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ra_pos1',
    card: 'Three of Wands',
    position: 1,
    upright:
      'Üç Değnek, mevcut durumda beklenti ve genişleme enerjisi hakim. Ufukta büyüme var. İpucu: Sabırla izleyin.',
    reversed:
      'Ters Üç Değnek, gecikmelerin ve uyumsuzluğun mevcut durumda gerilim yarattığını söyler. Belirti: Ertelenen planlar.',
    keywords: ['beklenti', 'vizyon', 'genişleme', 'koordinasyon', 'sabır'],
    context:
      'Mevcut durumda bağ genişleme enerjisine giriyor. Uyum yakalamak süreci kolaylaştıracak.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ra_pos1',
    card: 'Four of Wands',
    position: 1,
    upright:
      'Dört Değnek, mevcut durumda ilişki kutlama ve istikrar enerjisi taşıyor. Eşikler kutlanmak üzere. İpucu: Mutluluğu paylaşın.',
    reversed:
      'Ters Dört Değnek, temelsiz kutlamaların hayal kırıklığı yaratabileceğini söyler. Belirti: Erken sevincin gölgesi.',
    keywords: ['kutlama', 'istikrar', 'eşik', 'aidiyet', 'mutluluk'],
    context:
      'Mevcut durumda bağ bir eşikte. Sağlam temel mutluluğu kalıcı kılacak.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ra_pos1',
    card: 'Five of Wands',
    position: 1,
    upright:
      'Beş Değnek, mevcut durumda küçük çatışmalar ve güç denemeleri öne çıkıyor. Rekabet enerjisi yüksek. İpucu: Çatışmayı oyuna çevirin.',
    reversed:
      'Ters Beş Değnek, verimsiz tartışmaların bağda yorucu olduğunu söyler. Belirti: Gürültü ve dağınık enerji.',
    keywords: ['çatışma', 'rekabet', 'gerilim', 'güç denemesi', 'dinamizm'],
    context:
      'Mevcut durumda bağ küçük çatışmalarla test ediliyor. Yapıcı yaklaşım uyumu getirecek.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ra_pos1',
    card: 'Six of Wands',
    position: 1,
    upright:
      'Altı Değnek, mevcut durumda başarı ve görünürlük enerjisi hakim. İlişki dışarıdan alkış topluyor olabilir. İpucu: Gururu paylaşın.',
    reversed:
      'Ters Altı Değnek, görünmeyen emeğin bağda kırgınlık yarattığını söyler. Belirti: Takdir eksikliği.',
    keywords: ['zafer', 'takdir', 'görünürlük', 'başarı', 'kutlama'],
    context:
      'Mevcut durumda bağ başarıyla öne çıkıyor. Takdir paylaşımı uyumu artıracak.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ra_pos1',
    card: 'Seven of Wands',
    position: 1,
    upright:
      'Yedi Değnek, mevcut durumda savunma ve kendi alanını koruma enerjisi öne çıkıyor. Sınırlar test ediliyor. İpucu: Net olun ama yumuşak kalın.',
    reversed:
      'Ters Yedi Değnek, yalnız savaşma ve fazla savunuculuğun bağda gölge yarattığını söyler. Belirti: Yorgun direnç.',
    keywords: ['savunma', 'direnç', 'sınır', 'mücadele', 'koruma'],
    context:
      'Mevcut durumda bağ sınırların korunmasıyla meşgul. Ortak savunma anlayışı güven getirecek.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ra_pos1',
    card: 'Eight of Wands',
    position: 1,
    upright:
      'Sekiz Değnek, mevcut durumda hızlı iletişim ve gelişmelerin öne çıktığını gösterir. Enerji akıyor. İpucu: Akışı düzenleyin.',
    reversed:
      'Ters Sekiz Değnek, gecikmeler ve yanlış anlaşmaların gölge yarattığını söyler. Belirti: Çakışan mesajlar.',
    keywords: ['hız', 'iletişim', 'akış', 'haber', 'hareket'],
    context:
      'Mevcut durumda bağ hızlı akıyor. Net sıralama iletişimi rahatlatacak.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ra_pos1',
    card: 'Nine of Wands',
    position: 1,
    upright:
      'Dokuz Değnek, mevcut durumda yorgun ama kararlı bir direnç olduğunu gösterir. Bağ hala ayakta. İpucu: Dayanıklılığınızı yumuşaklıkla birleştirin.',
    reversed:
      'Ters Dokuz Değnek, geçmiş yaraların şimdiye taşınarak savunmayı sertleştirdiğini söyler. Belirti: Aşırı tetikte olma.',
    keywords: [
      'dayanıklılık',
      'tetikte olma',
      'savunma',
      'yorgunluk',
      'direnç',
    ],
    context:
      'Mevcut durumda bağ sınavlardan geçmiş ama ayakta. Yumuşak savunma şifa getirecek.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ra_pos1',
    card: 'Ten of Wands',
    position: 1,
    upright:
      'On Değnek, mevcut durumda yüklerin ve sorumlulukların ağırlaştığını gösterir. Biri fazla yük taşıyor olabilir. İpucu: Paylaşarak hafifleyin.',
    reversed:
      'Ters On Değnek, tükenmişlik ve bırakılması gereken yüklerin elde tutulduğunu söyler. Belirti: Şikayet–devam döngüsü.',
    keywords: ['yük', 'sorumluluk', 'baskı', 'tükenmişlik', 'paylaşım'],
    context:
      'Mevcut durumda bağ fazla yük altında. Ortak paylaşım rahatlatıcı olacak.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ra_pos1',
    card: 'Page of Wands',
    position: 1,
    upright:
      'Değnek Prensi, mevcut durumda merak ve keşif enerjisi hakim. Yeni adımlar için heves var. İpucu: Oyunbaz kalın.',
    reversed:
      'Ters Değnek Prensi, yarım bırakılan heveslerin güveni zedelediğini söyler. Belirti: Yarım projeler.',
    keywords: ['heves', 'keşif', 'merak', 'başlangıç', 'enerji'],
    context:
      'Mevcut durumda bağ merakla besleniyor. Tutarlılık güveni artıracak.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ra_pos1',
    card: 'Knight of Wands',
    position: 1,
    upright:
      'Değnek Şövalyesi, mevcut durumda hız ve tutku enerjisi var. Aksiyon yüksek. İpucu: Cesaretle ama dengeli ilerleyin.',
    reversed:
      'Ters Değnek Şövalyesi, savrukluk ve çabuk vazgeçmenin mevcut durumda gölge yarattığını söyler. Belirti: Tutarsız enerji.',
    keywords: ['tutku', 'hız', 'aksiyon', 'cesaret', 'ivme'],
    context:
      'Mevcut durumda bağ tutkulu bir ivmeyle hareket ediyor. Dengeli hız güven verecek.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ra_pos1',
    card: 'Queen of Wands',
    position: 1,
    upright:
      'Değnek Kraliçesi, mevcut durumda karizma, güven ve sıcaklık enerjisi öne çıkıyor. Bağ çekicilikle parlıyor. İpucu: Işığınızı paylaşın.',
    reversed:
      'Ters Değnek Kraliçesi, kıskançlık ve onay ihtiyacının gölge yarattığını söyler. Belirti: Güvensizlik.',
    keywords: ['karizma', 'güven', 'çekicilik', 'sıcaklık', 'ışıltı'],
    context:
      'Mevcut durumda bağ çekim gücüyle parlıyor. Samimiyet bu enerjiyi sağlamlaştıracak.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ra_pos1',
    card: 'King of Wands',
    position: 1,
    upright:
      'Değnek Kralı, mevcut durumda liderlik, vizyon ve kararlılık enerjisi hakim. İlişkiyi ileri taşımak arzusu var. İpucu: Vizyonu birlikte taşıyın.',
    reversed:
      'Ters Değnek Kralı, otoriterlik ve tek yönlü vizyonun mevcut durumda gerilim yarattığını söyler. Belirti: Ego çatışmaları.',
    keywords: ['liderlik', 'vizyon', 'kararlılık', 'ateş', 'güç'],
    context:
      'Mevcut durumda bağ vizyoner bir enerjiyle ilerliyor. Paylaşılan liderlik uyumu artıracak.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getRelationshipAnalysisPosition1Meaning(
  card: TarotCard
): RelationshipAnalysisPosition1Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position1Meanings.find(
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
  meaning = position1Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getRelationshipAnalysisPosition1MeaningByCardName(
  cardName: string
): RelationshipAnalysisPosition1Meaning | null {
  return position1Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllRelationshipAnalysisPosition1Meanings(): RelationshipAnalysisPosition1Meaning[] {
  return position1Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getRelationshipAnalysisPosition1MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipAnalysisPosition1Meaning[] {
  return position1Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nPosition1Meanings = (): I18nRelationshipAnalysisPosition1Meaning[] => {
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
): I18nRelationshipAnalysisPosition1Meaning | null => {
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
    `relationship-analysis.meanings.${cardKey}.position1.upright`
  );
  const i18nReversed = t(
    `relationship-analysis.meanings.${cardKey}.position1.reversed`
  );
  const i18nKeywords = t(
    `relationship-analysis.meanings.${cardKey}.position1.keywords`
  );
  const i18nContext = t(
    `relationship-analysis.meanings.${cardKey}.position1.context`
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
const RelationshipAnalysisPosition1Exports = {
  position1Meanings,
  getRelationshipAnalysisPosition1Meaning,
  getRelationshipAnalysisPosition1MeaningByCardName,
  getAllRelationshipAnalysisPosition1Meanings,
  getRelationshipAnalysisPosition1MeaningsByGroup,
  getI18nPosition1Meaning,
};

export default RelationshipAnalysisPosition1Exports;
