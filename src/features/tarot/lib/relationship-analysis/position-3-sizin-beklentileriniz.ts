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

export interface RelationshipAnalysisposition3Meaning {
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
export interface I18nRelationshipAnalysisposition3Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position3Meanings: RelationshipAnalysisposition3Meaning[] = [
  // --- Majör Arkana Kartları ---
// RELATIONSHIP ANALYSIS (ra) – POSITION 3: "Sizin Beklentileriniz"


  {
    id: 'the_fool_ra_pos3',
    card: 'The Fool',
    position: 3,
    upright:
      'Deli, beklentinizin taze bir başlangıç ve özgür bir alan olduğunu söyler. İçten içe bağın sizi keşfe ve yeni deneyimlere götürmesini istiyorsunuz.. Cesaret, açıklık, masumiyet.',
    reversed:
      'Ters Deli, beklentinizin belirsizlikten ve kaybolma ihtimalinden korunmak olduğunu gösterir. Yeniye açılırken güvenli sınırlar istiyorsunuz.\n\nBelirti: Tedirgin adım, yarım cesaret.',
    keywords: ['özgürlük', 'başlangıç', 'deneyim', 'cesaret', 'alan'],
    context:
      'Beklentiniz yeniye açılmak ama güvenli bir çerçevede. Macera duygusunu yaşarken köksüz hissetmek istemiyorsunuz.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ra_pos3',
    card: 'The Magician',
    position: 3,
    upright:
      'Büyücü, beklentinizin hisleri net ifade etmek ve bağda güçlü iletişim kurmak olduğunu söyler. Sözcüklerinizi sihir gibi kullanmak istiyorsunuz.. Açık ifade, yaratıcılık.',
    reversed:
      'Ters Büyücü, beklentinizin manipülasyondan ve yarım sözlerden uzak durmak olduğunu anlatır. Dürüstlük sizin için en büyük ihtiyaç.\n\nBelirti: Abartıdan kaçış, şeffaflık arzusu.',
    keywords: ['iletişim', 'dürüstlük', 'niyet', 'ifade', 'şeffaflık'],
    context:
      'Beklentiniz güçlü ve net iletişim. Karşılıklı şeffaflık ve niyetlerin açıkça paylaşılması sizi rahatlatıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ra_pos3',
    card: 'The High Priestess',
    position: 3,
    upright:
      'Başrahibe, beklentinizin içsel güven ve sezgilerinize alan açılması olduğunu söyler. Duygularınızın saygıyla dinlenmesini istiyorsunuz.. Güvenli sır, sezgiye değer.',
    reversed:
      'Ters Başrahibe, beklentinizin suskunluk ve sırların yarattığı mesafeden korunmak olduğunu gösterir. Açıklık sizin için iyileştirici.\n\nBelirti: Sırdan arınma, paylaşım isteği.',
    keywords: ['sezgi', 'güven', 'açıklık', 'içsel dünya', 'hassasiyet'],
    context:
      'Beklentiniz duygularınızın güvenle paylaşılabilmesi. Saklı kalan değil, görünen bir bağ arzuluyorsunuz.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ra_pos3',
    card: 'The Empress',
    position: 3,
    upright:
      'İmparatoriçe, beklentinizin sevgi dolu bakım, şefkat ve bereket olduğunu söyler. Bağınızda büyütmek ve beslemek arzunuz güçlü.. Bolluk, güven, sıcaklık.',
    reversed:
      'Ters İmparatoriçe, beklentinizin aşırı bağımlılık ya da boğucu sahiplenmeden uzak kalmak olduğunu gösterir. Özgür şefkat arıyorsunuz.\n\nBelirti: Denge arayışı, öz bakım ihtiyacı.',
    keywords: ['şefkat', 'bolluk', 'besleme', 'özgürlük', 'denge'],
    context:
      'Beklentiniz sevgiyle beslenen ama aynı zamanda özgür nefes alabilen bir bağ. Şefkat ve özgürlüğün yan yana durması sizin için çok önemli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ra_pos3',
    card: 'The Emperor',
    position: 3,
    upright:
      'İmparator, beklentinizin güvenli yapı ve kararlılık olduğunu söyler. İstikrarlı bir bağ kurmak istiyorsunuz.. Düzen, net sınır, sağlamlık.',
    reversed:
      'Ters İmparator, beklentinizin aşırı kontrol ve katı kuralların dışında bir alan yaratmak olduğunu gösterir. Esneklik arıyorsunuz.\n\nBelirti: İnat yerine işbirliği.',
    keywords: ['güven', 'istikrar', 'düzen', 'otorite', 'esneklik'],
    context:
      'Beklentiniz güvenli bir temel üzerinde ilerlemek. Ancak katılığa saplanmadan, yumuşak bir düzen arıyorsunuz.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ra_pos3',
    card: 'The Hierophant',
    position: 3,
    upright:
      'Aziz, beklentinizin gelenek, değerler ve kutsal birlik olduğunu söyler. Bağınızın ciddi ve derin temellere oturmasını istiyorsunuz.. Onay, değer uyumu.',
    reversed:
      'Ters Aziz, beklentinizin kör geleneklerden ve dayatmalardan uzak kalmak olduğunu anlatır. Ruhunuz özgün bir birlik arıyor.\n\nBelirti: Kalıpları aşma arzusu.',
    keywords: ['değer', 'ritüel', 'uyum', 'özgünlük', 'aidiyet'],
    context:
      'Beklentiniz değerlere dayalı bir bağ. Fakat kalıplara sıkışmadan özgünlükle yaşamak sizin için önemli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ra_pos3',
    card: 'The Lovers',
    position: 3,
    upright:
      'Aşıklar, beklentinizin değer uyumu ve kalpten evet olduğunu gösterir. Ortak seçimler yapmak istiyorsunuz.. Kalp hizası, ortak karar.',
    reversed:
      'Ters Aşıklar, beklentinizin kararsızlık ve uyumsuzluk riskinden korunmak olduğunu gösterir. Net bir bağ arıyorsunuz.\n\nBelirti: Git–kal korkusu.',
    keywords: ['uyum', 'karar', 'değer', 'bağ', 'seçim'],
    context:
      'Beklentiniz ortak değerlerle ilerlemek. Kalpten uyum sizin için anahtar bir ihtiyaç.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ra_pos3',
    card: 'The Chariot',
    position: 3,
    upright:
      'Savaş Arabası, beklentinizin ilerleme ve yön bulma olduğunu gösterir. Hızlı ve net bir yol istiyorsunuz.. Odak, hareket, ivme.',
    reversed:
      'Ters Savaş Arabası, beklentinizin savrulma ve kaostan korunmak olduğunu söyler. Düzensiz bir bağ istemiyorsunuz.\n\nBelirti: Durağanlık korkusu.',
    keywords: ['yön', 'odak', 'ilerleme', 'denge', 'kontrol'],
    context:
      'Beklentiniz bağın net bir yola girmesi. Ortak hedeflerde senkron sizi mutlu ediyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ra_pos3',
    card: 'Strength',
    position: 3,
    upright:
      'Güç, beklentinizin sabır ve şefkat temelli bağ kurmak olduğunu söyler. Nazik cesaretle yürümek istiyorsunuz.. Şefkat, nezaket.',
    reversed:
      'Ters Güç, beklentinizin kıskançlık ve sabırsızlık gölgelerinden uzak kalmak olduğunu gösterir. Sakin bir ritim arıyorsunuz.\n\nBelirti: Dalgalı özgüven, kırılgan sınırlar.',
    keywords: ['şefkat', 'sabır', 'naziklik', 'özgüven', 'denge'],
    context:
      'Beklentiniz nazik ama güçlü bir bağ. Sakinlik, kalbinize huzur veriyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ra_pos3',
    card: 'The Hermit',
    position: 3,
    upright:
      'Ermiş, beklentinizin içsel keşif ve bilgelik olduğunu söyler. İç dünyanıza saygı duyan bir bağ istiyorsunuz.. Yalnızlık alanı, derinlik.',
    reversed:
      'Ters Ermiş, beklentinizin sağlıksız izolasyondan korunmak olduğunu anlatır. Yakınlıkla birlikte bireysel alan arıyorsunuz.\n\nBelirti: Mesafeyi aşma arzusu.',
    keywords: ['bilgelik', 'alan', 'yalnızlık', 'yakınlık', 'iç ses'],
    context:
      'Beklentiniz hem iç sesinizi duymak hem de paylaşabilmek. Alan ve birlik dengesi sizin için çok değerli.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ra_pos3',
    card: 'Wheel of Fortune',
    position: 3,
    upright:
      'Kader Çarkı, beklentinizin akışa güvenmek ve zamanında doğru fırsatları yakalamak olduğunu söyler. Döngülerin desteklemesini istiyorsunuz.. Akış, uyum, fırsat.',
    reversed:
      'Ters Kader Çarkı, beklentinizin tekrar eden döngülerden ve şanssızlıktan uzaklaşmak olduğunu gösterir. Yenilik istiyorsunuz.\n\nBelirti: Değişim ihtiyacı.',
    keywords: ['döngü', 'akış', 'fırsat', 'zamanlama', 'değişim'],
    context:
      'Beklentiniz bağın akışla uyumlu ilerlemesi. Zamanın desteğini hissetmek size güven veriyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ra_pos3',
    card: 'Justice',
    position: 3,
    upright:
      'Adalet, beklentinizin dürüstlük, denge ve eşitlik olduğunu söyler. Terazinin iki kefesi de aynı hissettirmeli.. Adil paylaşım, netlik.',
    reversed:
      'Ters Adalet, beklentinizin çifte standarttan ve gizli hesaplardan uzak kalmak olduğunu gösterir. Şeffaflık sizin için anahtar.\n\nBelirti: Eşitlik isteği.',
    keywords: ['adalet', 'denge', 'şeffaflık', 'sorumluluk', 'eşitlik'],
    context:
      'Beklentiniz bağda adaletli bir düzen. Her iki taraf da eşit hissettiğinde kalbiniz huzur buluyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ra_pos3',
    card: 'The Hanged Man',
    position: 3,
    upright:
      'Asılan Adam, beklentinizin anlayış ve fedakarlığın dengeli olması olduğunu söyler. Empatiyle bakılmasını istiyorsunuz.. Perspektif, teslimiyet.',
    reversed:
      'Ters Asılan Adam, beklentinizin kurban rolüne itilmekten korunmak olduğunu gösterir. Denge sizin için şart.\n\nBelirti: Fedakarlık sınırı.',
    keywords: ['empati', 'fedakarlık', 'denge', 'perspektif', 'özgürlük'],
    context:
      'Beklentiniz karşılıklı anlayış ve denge. Tek taraflı özveri değil, ortak bakış açısı arıyorsunuz.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ra_pos3',
    card: 'Death',
    position: 3,
    upright:
      'Ölüm, beklentinizin dönüşüm ve yeni bir başlangıç olduğunu söyler. Eskiyi bırakıp yeniyi kucaklamak istiyorsunuz.. Dönüşüm, yenilenme.',
    reversed:
      'Ters Ölüm, beklentinizin değişime direncin kırılmasından yana olduğunu gösterir. Eski döngülere sıkışmak istemiyorsunuz.\n\nBelirti: Yenilenme ihtiyacı.',
    keywords: ['dönüşüm', 'yenilenme', 'bırakma', 'başlangıç', 'değişim'],
    context:
      'Beklentiniz bağda taze bir sayfa. Geçmiş yüklerden arınmak sizin için şifa olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ra_pos3',
    card: 'Temperance',
    position: 3,
    upright:
      'Denge, beklentinizin uyum ve sabırla ilerlemek olduğunu söyler. Orta yol sizin için şifa.. Uyum, ölçü, sabır.',
    reversed:
      'Ters Denge, beklentinizin aşırılıklardan ve uyumsuzluklardan korunmak olduğunu anlatır. Sükunet arıyorsunuz.\n\nBelirti: Orta yol ihtiyacı.',
    keywords: ['uyum', 'denge', 'sabır', 'ölçü', 'ritim'],
    context:
      'Beklentiniz bağın uyumla akması. Ne hızlı ne yavaş, tam sizin ritminizde bir ilerleyiş arıyorsunuz.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ra_pos3',
    card: 'The Devil',
    position: 3,
    upright:
      'Şeytan, beklentinizin özgürlük ve toksik bağlardan uzak kalmak olduğunu söyler. Bağınızda ışık arıyorsunuz.. Bağımlılıklardan arınma.',
    reversed:
      'Ters Şeytan, beklentinizin zincirlerden kurtulmak olduğunu gösterir. Kısıtlardan özgürleşmek sizin için öncelik.\n\nBelirti: Kontrol alanını aşma arzusu.',
    keywords: ['özgürlük', 'bağımsızlık', 'sınır', 'ışık', 'öz değer'],
    context:
      'Beklentiniz bağda sağlıklı bir özgürlük. Zincir değil, kanat istiyorsunuz.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ra_pos3',
    card: 'The Tower',
    position: 3,
    upright:
      'Kule, beklentinizin sağlam temelli bir bağ olduğunu söyler. Çatlaklardan kaçınmak istiyorsunuz.. Gerçek, net temel.',
    reversed:
      'Ters Kule, beklentinizin yıkıcı krizlerden ve ertelenen patlamalardan uzak kalmak olduğunu gösterir. Sarsıntı değil, onarım arıyorsunuz.\n\nBelirti: Güvenli yapı isteği.',
    keywords: ['temel', 'gerçek', 'istikrar', 'onarım', 'güven'],
    context:
      'Beklentiniz sağlam ve dürüst bir temel. Kırılganlık yerine güven arıyorsunuz.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ra_pos3',
    card: 'The Star',
    position: 3,
    upright:
      'Yıldız, beklentinizin umut ve şifa olduğunu söyler. Kalbiniz iyileşme ve parlama istiyor.. Umut, iyimserlik.',
    reversed:
      'Ters Yıldız, beklentinizin umutsuzluk ve motivasyon kaybından uzak kalmak olduğunu anlatır. Umudunuzu korumak istiyorsunuz.\n\nBelirti: Şifa ihtiyacı.',
    keywords: ['umut', 'şifa', 'yenilenme', 'iyileşme', 'ışık'],
    context:
      'Beklentiniz bağın umut dolu bir yola girmesi. Şifalanma enerjisi sizin için çok kıymetli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ra_pos3',
    card: 'The Moon',
    position: 3,
    upright:
      'Ay, beklentinizin netlik ve güven olduğunu söyler. Sisli duygulardan çıkmak istiyorsunuz.. Açıklık, şeffaflık.',
    reversed:
      'Ters Ay, beklentinizin yanılsamalardan ve karanlıktan arınmak olduğunu gösterir. Gerçeklik sizin için şifa.\n\nBelirti: Netlik isteği.',
    keywords: ['netlik', 'güven', 'gerçek', 'açıklık', 'aydınlık'],
    context:
      'Beklentiniz bağda netlik. Sis değil, ay ışığının aydınlattığı güvenli bir yol arıyorsunuz.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ra_pos3',
    card: 'The Sun',
    position: 3,
    upright:
      'Güneş, beklentinizin neşe, açıklık ve paylaşım olduğunu söyler. Ortak mutluluk istiyorsunuz.. Otantik sevinç.',
    reversed:
      'Ters Güneş, beklentinizin yapay mutluluk ve yüzeysel uyumdan uzak kalmak olduğunu gösterir. Gerçek sevinç sizin için değerli.\n\nBelirti: İçtenlik arayışı.',
    keywords: ['neşe', 'paylaşım', 'otantiklik', 'ışık', 'mutluluk'],
    context:
      'Beklentiniz bağda içten bir mutluluk. Yüzeysel değil, kalpten gelen bir sevinç arıyorsunuz.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ra_pos3',
    card: 'Judgement',
    position: 3,
    upright:
      'Mahkeme, beklentinizin yeniden doğuş ve dürüst yüzleşme olduğunu söyler. Geçmişle hesaplaşıp yeniye adım atmak istiyorsunuz.. Yenilenme, uyanış.',
    reversed:
      'Ters Mahkeme, beklentinizin geçmişe takılıp kalmamak olduğunu gösterir. İleriye bakmak istiyorsunuz.\n\nBelirti: Yenilenme ihtiyacı.',
    keywords: ['uyanış', 'yeniden doğuş', 'hesaplaşma', 'netlik', 'ilerleme'],
    context:
      'Beklentiniz bağda dürüst bir yüzleşme sonrası yeniden doğmak. Geçmişin ağırlığını bırakmak sizi özgürleştirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ra_pos3',
    card: 'The World',
    position: 3,
    upright:
      'Dünya, beklentinizin tamlık ve bütünlük olduğunu söyler. Bağınızda döngünün tamamlanmasını ve doyum bulmayı istiyorsunuz.. Bütünlük, uyum.',
    reversed:
      'Ters Dünya, beklentinizin yarım kalmışlık hissinden korunmak olduğunu gösterir. Tamamlanma arıyorsunuz.\n\nBelirti: Bitmeyen döngü korkusu.',
    keywords: ['tamlık', 'tamamlanma', 'uyum', 'doyum', 'denge'],
    context:
      'Beklentiniz bağda bütün olmak. Yarım kalan değil, tamamlanan bir hikaye arıyorsunuz.',
    group: 'Majör Arkana',
  },

  //-- Kupalar --//
  {
    id: 'ace_of_cups_ra_pos3',
    card: 'Ace of Cups',
    position: 3,
    upright:
      'Kupa Ası, beklentinizin saf sevgi ve duygusal başlangıç olduğunu söyler. Kalbiniz yeni bir şefkat akışına açılmak istiyor.. Açık yürek, yeni duygular.',
    reversed:
      'Ters Kupa Ası, beklentinizin duygusal blokajları aşmak ve kalbinizi yeniden açmak olduğunu gösterir. Kapanmış hisleri serbest bırakmak istiyorsunuz.\n\nBelirti: İçsel çözülme isteği.',
    keywords: ['sevgi', 'başlangıç', 'açılım', 'şefkat', 'yenilenme'],
    context:
      'Beklentiniz kalbinizin tazelenmesi. Şefkatle açılan bir kapı arıyorsunuz.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ra_pos3',
    card: 'Two of Cups',
    position: 3,
    upright:
      'İki Kupa, beklentinizin karşılıklı sevgi ve eşit bağ olduğunu söyler. Ruh eşitliği arıyorsunuz.. Karşılıklılık, uyum.',
    reversed:
      'Ters İki Kupa, beklentinizin dengesiz bağlardan uzaklaşmak olduğunu gösterir. Eşit olmayan ilişkiler sizi yormuş olabilir.\n\nBelirti: Denge arayışı.',
    keywords: ['eşitlik', 'uyum', 'karşılıklılık', 'aşk', 'bağ'],
    context:
      'Beklentiniz karşılıklı değer görmektir. Kalbiniz eşit bir sevgi talep ediyor.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ra_pos3',
    card: 'Three of Cups',
    position: 3,
    upright:
      'Üç Kupa, beklentinizin paylaşım, kutlama ve dostane destek olduğunu söyler. Kalbiniz birlikte neşelenmek istiyor.. Kutlama, birlik.',
    reversed:
      'Ters Üç Kupa, beklentinizin yüzeysel sosyal bağlardan korunmak olduğunu gösterir. Samimi paylaşım arıyorsunuz.\n\nBelirti: Gerçek dostluk ihtiyacı.',
    keywords: ['kutlama', 'paylaşım', 'destek', 'arkadaşlık', 'neşe'],
    context:
      'Beklentiniz samimi çevreyle kalbinizi paylaşmak. Yüzeysel değil, derin bağlar arıyorsunuz.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ra_pos3',
    card: 'Four of Cups',
    position: 3,
    upright:
      'Dört Kupa, beklentinizin farkındalıkla yeni fırsatlara açılmak olduğunu söyler. Kalbiniz uyanış istiyor.. Açık göz, yeni şans.',
    reversed:
      'Ters Dört Kupa, beklentinizin kayıtsızlıktan çıkmak ve yeniden heves bulmak olduğunu gösterir. Tatminsizlik perdesini aşmak istiyorsunuz.\n\nBelirti: İlgi arayışı.',
    keywords: ['fırsat', 'uyanış', 'heves', 'dikkat', 'yeniye açıklık'],
    context:
      'Beklentiniz kalbinizi yeniden canlandırmak. Duygusal ilgiyi büyütmek istiyorsunuz.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ra_pos3',
    card: 'Five of Cups',
    position: 3,
    upright:
      'Beş Kupa, beklentinizin kayıpları onarmak ve yeniden umut bulmak olduğunu söyler. Kalbiniz yasın ötesini görmek istiyor.. Affetme, toparlanma.',
    reversed:
      'Ters Beş Kupa, beklentinizin geçmiş kırıklıklardan tamamen arınmak olduğunu gösterir. Gözünüz geleceğe dönük.\n\nBelirti: Yeniden doğma arzusu.',
    keywords: ['onarım', 'umut', 'affediş', 'toparlanma', 'yeniden başlama'],
    context:
      'Beklentiniz geçmişten özgürleşmek. Kalbiniz ileriye bakmak istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ra_pos3',
    card: 'Six of Cups',
    position: 3,
    upright:
      'Altı Kupa, beklentinizin masumiyet ve sıcak anıları yeniden yaşamak olduğunu söyler. Saf bir bağ arıyorsunuz.. Nostalji, saflık.',
    reversed:
      'Ters Altı Kupa, beklentinizin geçmişe sıkışmadan anı şefkatle kucaklamak olduğunu gösterir. İleriye bakmak istiyorsunuz.\n\nBelirti: Şimdiye odak ihtiyacı.',
    keywords: ['nostalji', 'masumiyet', 'şefkat', 'anı', 'sağaltım'],
    context:
      'Beklentiniz saf sevgiyi yeniden hissetmek. Kalbiniz masumiyet özlüyor.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ra_pos3',
    card: 'Seven of Cups',
    position: 3,
    upright:
      'Yedi Kupa, beklentinizin net seçimler yapmak olduğunu söyler. Kalbiniz hayalden gerçeğe geçmek istiyor.. Netlik, kararlılık.',
    reversed:
      'Ters Yedi Kupa, beklentinizin kafa karışıklığından kurtulmak ve gerçekçi kararlar almak olduğunu gösterir. Sis dağılmalı.\n\nBelirti: Karar isteği.',
    keywords: ['seçim', 'netlik', 'karar', 'gerçeklik', 'odak'],
    context:
      'Beklentiniz duygusal netliktir. Kalbiniz pusulasını belirlemek istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ra_pos3',
    card: 'Eight of Cups',
    position: 3,
    upright:
      'Sekiz Kupa, beklentinizin daha anlamlı bir bağa yönelmek olduğunu söyler. Kalbiniz derinlik arıyor.. Yeni yol, arayış.',
    reversed:
      'Ters Sekiz Kupa, beklentinizin yarım kalmış kopuşlardan özgürleşmek olduğunu gösterir. Net yön istiyorsunuz.\n\nBelirti: Tamamlanma arzusu.',
    keywords: ['arayış', 'yeni yol', 'derinlik', 'tatmin', 'ilerleme'],
    context:
      'Beklentiniz duygusal tatmin. Kalbiniz anlamlı bir yolculuk istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ra_pos3',
    card: 'Nine of Cups',
    position: 3,
    upright:
      'Dokuz Kupa, beklentinizin kişisel tatmin ve dileklerin gerçekleşmesi olduğunu söyler. Kalbiniz huzur arıyor.. Tatmin, sevinç.',
    reversed:
      'Ters Dokuz Kupa, beklentinizin yüzeysel hazzı değil, derin doyumu bulmak olduğunu gösterir. İçtenlik arıyorsunuz.\n\nBelirti: Sahici tatmin isteği.',
    keywords: ['tatmin', 'dilek', 'huzur', 'mutluluk', 'derinlik'],
    context:
      'Beklentiniz kalpten tatmin. Yüzeysel değil, sahici mutluluk arıyorsunuz.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ra_pos3',
    card: 'Ten of Cups',
    position: 3,
    upright:
      'On Kupa, beklentinizin mutlu aile ve huzurlu birlik olduğunu söyler. Kalbiniz sevgi dolu bir tabloya açılıyor.. Aile, huzur.',
    reversed:
      'Ters On Kupa, beklentinizin sahici uyumu sahte gülüşlerden ayırt etmek olduğunu gösterir. Gerçek aile ruhu arıyorsunuz.\n\nBelirti: Otantik bağ ihtiyacı.',
    keywords: ['aile', 'huzur', 'uyum', 'sevgi', 'tamlık'],
    context:
      'Beklentiniz huzurlu ve sahici bir birlik. Kalbiniz gerçek uyum istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ra_pos3',
    card: 'Page of Cups',
    position: 3,
    upright:
      'Kupa Prensi, beklentinizin saf duyguların ifade edilmesi olduğunu söyler. Masumca açılım arıyorsunuz.. Romantizm, içtenlik.',
    reversed:
      'Ters Kupa Prensi, beklentinizin çocukça oyunlardan uzak kalmak olduğunu gösterir. Duygusal olgunluk istiyorsunuz.\n\nBelirti: Net ifade arayışı.',
    keywords: ['içtenlik', 'romantizm', 'masumiyet', 'ifade', 'hassasiyet'],
    context:
      'Beklentiniz duyguların safça paylaşımı. Kalbiniz dürüst ifadeyi istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ra_pos3',
    card: 'Knight of Cups',
    position: 3,
    upright:
      'Kupa Şövalyesi, beklentinizin romantik jestler ve tutarlı duygusal adımlar olduğunu söyler. Kalbiniz şiirsellik arıyor.. Jest, romantizm.',
    reversed:
      'Ters Kupa Şövalyesi, beklentinizin hayali vaatlerden korunmak olduğunu gösterir. Gerçekçi romantizm arıyorsunuz.\n\nBelirti: Söz–eylem tutarlılığı isteği.',
    keywords: ['romantizm', 'jest', 'ideal', 'tutarlılık', 'yakınlık'],
    context:
      'Beklentiniz duyguların hem şiirsel hem gerçekçi aktarımı. Kalbiniz güvenli romantizm istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ra_pos3',
    card: 'Queen of Cups',
    position: 3,
    upright:
      'Kupa Kraliçesi, beklentinizin empati ve şefkat dolu bir bağ olduğunu söyler. Kalbiniz yumuşak bir alan istiyor.. Duygusal denge.',
    reversed:
      'Ters Kupa Kraliçesi, beklentinizin duygusal manipülasyondan uzak kalmak olduğunu gösterir. Saf empati arıyorsunuz.\n\nBelirti: Şeffaf duygu isteği.',
    keywords: ['empati', 'şefkat', 'yumuşaklık', 'denge', 'duygu'],
    context:
      'Beklentiniz şefkatle dokunan bir bağ. Kalbiniz güvenli empati istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ra_pos3',
    card: 'King of Cups',
    position: 3,
    upright:
      'Kupa Kralı, beklentinizin olgun duygu yönetimi ve dengeli sevgi olduğunu söyler. Kalbiniz huzurlu bir rehberlik istiyor.. Duygusal liderlik.',
    reversed:
      'Ters Kupa Kralı, beklentinizin pasif–agresif tutumlardan uzak kalmak olduğunu gösterir. Sağlıklı duygu aktarımı istiyorsunuz.\n\nBelirti: Net duygu isteği.',
    keywords: ['olgunluk', 'denge', 'liderlik', 'huzur', 'empati'],
    context:
      'Beklentiniz olgun sevgi. Kalbiniz dengeli ve huzurlu duygusal aktarım istiyor.',
    group: 'Kupalar',
  },

  //-- Tılsımlar --//
  {
    id: 'ace_of_pentacles_ra_pos3',
    card: 'Ace of Pentacles',
    position: 3,
    upright:
      'Tılsım Ası, beklentinizin sağlam başlangıç ve somut güvence olduğunu söyler. Kalbiniz istikrar istiyor.. Güvenli temel.',
    reversed:
      'Ters Tılsım Ası, beklentinizin fırsatların kaçmaması olduğunu gösterir. Kalbiniz sağlamlık arıyor.\n\nBelirti: Güvence ihtiyacı.',
    keywords: ['güven', 'başlangıç', 'somut', 'istikrar', 'bolluk'],
    context:
      'Beklentiniz köklü başlangıçtır. Kalbiniz sağlam bir zemin arıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ra_pos3',
    card: 'Two of Pentacles',
    position: 3,
    upright:
      'İki Tılsım, beklentinizin denge ve uyum olduğunu söyler. Kalbiniz esneklik istiyor.. Uyum, çok yönlülük.',
    reversed:
      'Ters İki Tılsım, beklentinizin kaostan uzaklaşmak olduğunu gösterir. Kalbiniz düzen arıyor.\n\nBelirti: Denge isteği.',
    keywords: ['denge', 'uyum', 'esneklik', 'düzen', 'denge arayışı'],
    context:
      'Beklentiniz dengeli yürüyüştür. Kalbiniz çoklu alanda uyum istiyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ra_pos3',
    card: 'Three of Pentacles',
    position: 3,
    upright:
      'Üç Tılsım, beklentinizin işbirliği olduğunu söyler. Kalbiniz ortak emek istiyor.. Ortaklık, uyum.',
    reversed:
      'Ters Üç Tılsım, beklentinizin uyumsuz çabalardan korunmak olduğunu gösterir. Kalbiniz uyumlu işbirliği istiyor.\n\nBelirti: Ortaklık ihtiyacı.',
    keywords: ['işbirliği', 'ortaklık', 'emek', 'uyum', 'destek'],
    context:
      'Beklentiniz ortak emeğin değerlenmesidir. Kalbiniz birlikte inşa etmek istiyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ra_pos3',
    card: 'Four of Pentacles',
    position: 3,
    upright:
      'Dört Tılsım, beklentinizin güvenli alanını korumak olduğunu söyler. Kalbiniz istikrar istiyor.. Güvence, koruma.',
    reversed:
      'Ters Dört Tılsım, beklentinizin aşırı tutuculuktan kurtulmak olduğunu gösterir. Kalbiniz paylaşım arıyor.\n\nBelirti: Rahatlama isteği.',
    keywords: ['güvenlik', 'koruma', 'istikrar', 'kontrol', 'paylaşım'],
    context:
      'Beklentiniz güvenli hissetmektir. Kalbiniz sağlıklı denge arıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ra_pos3',
    card: 'Five of Pentacles',
    position: 3,
    upright:
      'Beş Tılsım, beklentinizin destek ve dayanışma olduğunu söyler. Kalbiniz yalnız kalmamak istiyor.. Dayanışma, umut.',
    reversed:
      'Ters Beş Tılsım, beklentinizin yoksunluktan çıkmak olduğunu gösterir. Kalbiniz bolluk arıyor.\n\nBelirti: Umut ihtiyacı.',
    keywords: ['dayanışma', 'umut', 'destek', 'birlik', 'bolluk'],
    context:
      'Beklentiniz desteklenmektir. Kalbiniz yalnızlıktan sıyrılmak istiyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ra_pos3',
    card: 'Six of Pentacles',
    position: 3,
    upright:
      'Altı Tılsım, beklentinizin adil alışveriş olduğunu söyler. Kalbiniz eşit denge istiyor.. Adil paylaşım.',
    reversed:
      'Ters Altı Tılsım, beklentinizin dengesiz yardımlardan uzak kalmak olduğunu gösterir. Kalbiniz eşitlik arıyor.\n\nBelirti: Denge arayışı.',
    keywords: ['eşitlik', 'adalet', 'paylaşım', 'denge', 'destek'],
    context:
      'Beklentiniz eşit alışveriştir. Kalbiniz dengeli paylaşım istiyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ra_pos3',
    card: 'Seven of Pentacles',
    position: 3,
    upright:
      'Yedi Tılsım, beklentinizin sabır ve emek sonucunu görmek olduğunu söyler. Kalbiniz meyve arıyor.. Sabır, verim.',
    reversed:
      'Ters Yedi Tılsım, beklentinizin boşa giden çabalardan korunmak olduğunu gösterir. Kalbiniz değerli emek arıyor.\n\nBelirti: Verimlilik isteği.',
    keywords: ['sabır', 'emek', 'verim', 'beklenti', 'sonuç'],
    context:
      'Beklentiniz emeğinizin karşılığını almaktır. Kalbiniz meyve istiyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ra_pos3',
    card: 'Eight of Pentacles',
    position: 3,
    upright:
      'Sekiz Tılsım, beklentinizin çaba ve ustalık olduğunu söyler. Kalbiniz öğrenmek istiyor.. Emek, öğrenme.',
    reversed:
      'Ters Sekiz Tılsım, beklentinizin boşa emek vermekten kaçınmak olduğunu gösterir. Kalbiniz anlamlı iş arıyor.\n\nBelirti: Değerli emek isteği.',
    keywords: ['çaba', 'öğrenme', 'ustalık', 'emek', 'gelişim'],
    context:
      'Beklentiniz gelişimdir. Kalbiniz emekle büyümek istiyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ra_pos3',
    card: 'Nine of Pentacles',
    position: 3,
    upright:
      'Dokuz Tılsım, beklentinizin bağımsız huzur olduğunu söyler. Kalbiniz keyifli özgürlük istiyor.. Özgürlük, tatmin.',
    reversed:
      'Ters Dokuz Tılsım, beklentinizin yalnızlığa düşmeden özgür olmak olduğunu gösterir. Kalbiniz sağlıklı denge arıyor.\n\nBelirti: Özgürlük isteği.',
    keywords: ['özgürlük', 'huzur', 'tatmin', 'bağımsızlık', 'bolluk'],
    context:
      'Beklentiniz tatmindir. Kalbiniz bağımsız ama paylaşımcı olmak istiyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ra_pos3',
    card: 'Ten of Pentacles',
    position: 3,
    upright:
      'On Tılsım, beklentinizin kalıcı güvence ve aile bağı olduğunu söyler. Kalbiniz köklenmek istiyor.. Güvence, kök.',
    reversed:
      'Ters On Tılsım, beklentinizin güvensizlikten korunmak olduğunu gösterir. Kalbiniz sağlam temel arıyor.\n\nBelirti: Güvenlik arayışı.',
    keywords: ['aile', 'güvence', 'köklülük', 'istikrar', 'miras'],
    context:
      'Beklentiniz kalıcı birliktir. Kalbiniz güvenli bağ arıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ra_pos3',
    card: 'Page of Pentacles',
    position: 3,
    upright:
      'Tılsım Prensi, beklentinizin öğrenme ve uzun vadeli istikrar olduğunu söyler. Kalbiniz gelişim istiyor.. Öğrenme, temel.',
    reversed:
      'Ters Tılsım Prensi, beklentinizin yüzeysellikten uzak kalmak olduğunu gösterir. Kalbiniz kalıcı adım arıyor.\n\nBelirti: Derinlik ihtiyacı.',
    keywords: ['öğrenme', 'istikrar', 'temel', 'gelişim', 'sabır'],
    context:
      'Beklentiniz öğrenerek ilerlemektir. Kalbiniz köklü adım istiyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ra_pos3',
    card: 'Knight of Pentacles',
    position: 3,
    upright:
      'Tılsım Şövalyesi, beklentinizin güvenilirlik ve istikrarlı ilerleme olduğunu söyler. Kalbiniz sabır istiyor.. Sabır, kararlılık.',
    reversed:
      'Ters Tılsım Şövalyesi, beklentinizin durağanlıktan korunmak olduğunu gösterir. Kalbiniz akış arıyor.\n\nBelirti: Esneklik ihtiyacı.',
    keywords: ['istikrar', 'güven', 'sabır', 'kararlılık', 'emek'],
    context:
      'Beklentiniz güvenilir ilerlemedir. Kalbiniz sabırla yol almak istiyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ra_pos3',
    card: 'Queen of Pentacles',
    position: 3,
    upright:
      'Tılsım Kraliçesi, beklentinizin güven dolu şefkat olduğunu söyler. Kalbiniz hem sıcaklık hem istikrar istiyor.. Şefkat, güven.',
    reversed:
      'Ters Tılsım Kraliçesi, beklentinizin aşırı bağımlılıktan korunmak olduğunu gösterir. Kalbiniz denge arıyor.\n\nBelirti: Sağlıklı şefkat isteği.',
    keywords: ['şefkat', 'güven', 'istikrar', 'bolluk', 'denge'],
    context:
      'Beklentiniz güvenli şefkattir. Kalbiniz hem sevgi hem istikrar arıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ra_pos3',
    card: 'King of Pentacles',
    position: 3,
    upright:
      'Tılsım Kralı, beklentinizin güçlü temel ve bolluk olduğunu söyler. Kalbiniz sağlam güvence arıyor.. Bolluk, güç.',
    reversed:
      'Ters Tılsım Kralı, beklentinizin aşırı kontrol gölgesinden uzak kalmak olduğunu gösterir. Kalbiniz paylaşımcı güç arıyor.\n\nBelirti: Paylaşım arzusu.',
    keywords: ['bolluk', 'güvence', 'güç', 'istikrar', 'liderlik'],
    context:
      'Beklentiniz bolluk ve güvenli temeldir. Kalbiniz paylaşımcı güç istiyor.',
    group: 'Tılsımlar',
  },
  //-- Kılıçlar --//
  {
    id: 'ace_of_swords_ra_pos3',
    card: 'Ace of Swords',
    position: 3,
    upright:
      'Kılıç Ası, beklentinizin netlik ve dürüstlük olduğunu söyler. Kalbiniz açık sözlerle rahatlamak istiyor.. Hakikat, kesinlik.',
    reversed:
      'Ters Kılıç Ası, beklentinizin yanlış anlamaları aşmak ve flu iletişimi temizlemek olduğunu gösterir. Kalbiniz net sınırlar arıyor.\n\nBelirti: Karışıklık çözme arzusu.',
    keywords: ['netlik', 'hakikat', 'dil', 'açıklık', 'kesinlik'],
    context:
      'Beklentiniz açık sözlü diyalog. Kalbiniz hakikatin netliğinde huzur bulmak istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ra_pos3',
    card: 'Two of Swords',
    position: 3,
    upright:
      'İki Kılıç, beklentinizin dengeli karar olduğunu söyler. Kalbiniz akıl ve duygu arasında uyum arıyor.. Uzlaşı, denge.',
    reversed:
      'Ters İki Kılıç, beklentinizin kararsızlığı kırmak ve net bir seçim yapmak olduğunu gösterir. Sis dağılmalı.\n\nBelirti: Karar netliği isteği.',
    keywords: ['karar', 'denge', 'uyum', 'seçim', 'yüzleşme'],
    context:
      'Beklentiniz akıl–kalp dengesinde karar almak. Kalbiniz net bir seçim istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ra_pos3',
    card: 'Three of Swords',
    position: 3,
    upright:
      'Üç Kılıç, beklentinizin kırıklıkları onarmak olduğunu söyler. Kalbiniz şifalı bir yüzleşme arıyor.. Onarım, affediş.',
    reversed:
      'Ters Üç Kılıç, beklentinizin geçmiş yaraları tamamen kapatmak olduğunu gösterir. Kalbiniz hafiflemek istiyor.\n\nBelirti: Geçmişi geride bırakma isteği.',
    keywords: ['kırıklık', 'yüzleşme', 'onarım', 'affetme', 'şifa'],
    context:
      'Beklentiniz geçmişin acısını dönüştürmek. Kalbiniz onarımla huzur bulmak istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ra_pos3',
    card: 'Four of Swords',
    position: 3,
    upright:
      'Dört Kılıç, beklentinizin huzur ve mola olduğunu söyler. Kalbiniz dinlenmeye aç.. Sükunet, içsel barış.',
    reversed:
      'Ters Dört Kılıç, beklentinizin yorucu döngülerden çıkmak olduğunu gösterir. Kalbiniz sakinlik istiyor.\n\nBelirti: Huzur arayışı.',
    keywords: ['huzur', 'mola', 'dinlenme', 'sükunet', 'barış'],
    context:
      'Beklentiniz duygusal dinginlik. Kalbiniz sakin bir nefes almak istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ra_pos3',
    card: 'Five of Swords',
    position: 3,
    upright:
      'Beş Kılıç, beklentinizin ego savaşlarının son bulması olduğunu söyler. Kalbiniz barış istiyor.. Uzlaşı, şefkat.',
    reversed:
      'Ters Beş Kılıç, beklentinizin gururu bırakıp hakikaten barışmak olduğunu gösterir. Kalbiniz köprü kurmak istiyor.\n\nBelirti: Barış talebi.',
    keywords: ['barış', 'uzlaşı', 'ego', 'onur', 'köprü'],
    context:
      'Beklentiniz uzlaşmadır. Kalbiniz kavgadan çok anlayış arıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ra_pos3',
    card: 'Six of Swords',
    position: 3,
    upright:
      'Altı Kılıç, beklentinizin daha sakin sulara yolculuk olduğunu söyler. Kalbiniz huzurlu bir geçiş istiyor.. Yolculuk, ilerleme.',
    reversed:
      'Ters Altı Kılıç, beklentinizin eski sorunları tamamen geride bırakmak olduğunu gösterir. Kalbiniz kapanış arıyor.\n\nBelirti: Geçiş ihtiyacı.',
    keywords: ['geçiş', 'huzur', 'ilerleme', 'sakinlik', 'dönüşüm'],
    context:
      'Beklentiniz duygusal sakinleşme. Kalbiniz huzurlu bir rota istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ra_pos3',
    card: 'Seven of Swords',
    position: 3,
    upright:
      'Yedi Kılıç, beklentinizin dürüstlük olduğunu söyler. Kalbiniz saklı ajandadan uzak, şeffaf bağ istiyor.. Açıklık, güven.',
    reversed:
      'Ters Yedi Kılıç, beklentinizin gizli oyunlardan arınmak olduğunu gösterir. Kalbiniz temiz niyet arıyor.\n\nBelirti: Güven isteği.',
    keywords: ['dürüstlük', 'açıklık', 'güven', 'şeffaflık', 'sadakat'],
    context:
      'Beklentiniz açık niyetlerdir. Kalbiniz sahicilik talep ediyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ra_pos3',
    card: 'Eight of Swords',
    position: 3,
    upright:
      'Sekiz Kılıç, beklentinizin korkuları aşmak olduğunu söyler. Kalbiniz özgürleşmek istiyor.. Cesaret, çözülme.',
    reversed:
      'Ters Sekiz Kılıç, beklentinizin zihinsel engelleri bırakmak olduğunu gösterir. Kalbiniz özgür nefes arıyor.\n\nBelirti: Özgürleşme isteği.',
    keywords: ['özgürlük', 'korku', 'cesaret', 'çözülme', 'aydınlık'],
    context:
      'Beklentiniz özgürleşmektir. Kalbiniz kendi zincirlerini kırmak istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ra_pos3',
    card: 'Nine of Swords',
    position: 3,
    upright:
      'Dokuz Kılıç, beklentinizin kaygılardan kurtulmak olduğunu söyler. Kalbiniz huzurlu uyku istiyor.. Güven, sakinlik.',
    reversed:
      'Ters Dokuz Kılıç, beklentinizin korkuları geride bırakmak olduğunu gösterir. Kalbiniz umut istiyor.\n\nBelirti: Kaygıdan arınma arzusu.',
    keywords: ['kaygı', 'umut', 'sakinlik', 'özgürlük', 'şifa'],
    context:
      'Beklentiniz huzurdur. Kalbiniz güvenli bir alan arıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ra_pos3',
    card: 'Ten of Swords',
    position: 3,
    upright:
      'On Kılıç, beklentinizin eski döngülerin kapanması olduğunu söyler. Kalbiniz yeniden doğmak istiyor.. Bitiş, başlangıç.',
    reversed:
      'Ters On Kılıç, beklentinizin toparlanmak ve yeniden umut bulmak olduğunu gösterir. Kalbiniz yeni bir sayfa arıyor.\n\nBelirti: Yeniden doğuş isteği.',
    keywords: ['bitiş', 'yenilenme', 'başlangıç', 'dönüşüm', 'umut'],
    context:
      'Beklentiniz kapanıştır. Kalbiniz yeniye doğmak istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ra_pos3',
    card: 'Page of Swords',
    position: 3,
    upright:
      'Kılıç Prensi, beklentinizin açık merak ve dürüst sorular olduğunu söyler. Kalbiniz şeffaf diyalog istiyor.. Öğrenme, iletişim.',
    reversed:
      'Ters Kılıç Prensi, beklentinizin yanlış anlaşılmalardan arınmak olduğunu gösterir. Kalbiniz güvenli konuşma arıyor.\n\nBelirti: Şeffaf iletişim isteği.',
    keywords: ['iletişim', 'soru', 'merak', 'şeffaflık', 'öğrenme'],
    context:
      'Beklentiniz açık diyalogdur. Kalbiniz öğrenmeye ve anlaşılmaya aç.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ra_pos3',
    card: 'Knight of Swords',
    position: 3,
    upright:
      'Kılıç Şövalyesi, beklentinizin net ve kararlı adımlar olduğunu söyler. Kalbiniz hızlı çözüm istiyor.. Kararlılık, netlik.',
    reversed:
      'Ters Kılıç Şövalyesi, beklentinizin acele kararlardan uzak durmak olduğunu gösterir. Kalbiniz dengeli adım istiyor.\n\nBelirti: Ölçülü hareket talebi.',
    keywords: ['kararlılık', 'netlik', 'ölçü', 'denge', 'hız'],
    context:
      'Beklentiniz dengeli ama net adımlar. Kalbiniz sakin çözüm istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ra_pos3',
    card: 'Queen of Swords',
    position: 3,
    upright:
      'Kılıç Kraliçesi, beklentinizin net ama şefkatli iletişim olduğunu söyler. Kalbiniz keskinlikte denge arıyor.. Açık söz, incelik.',
    reversed:
      'Ters Kılıç Kraliçesi, beklentinizin kırıcı üsluptan korunmak olduğunu gösterir. Kalbiniz nazik dil arıyor.\n\nBelirti: Yumuşak üslup ihtiyacı.',
    keywords: ['netlik', 'şefkat', 'incelik', 'iletişim', 'denge'],
    context:
      'Beklentiniz kalpten ama net iletişim. Kalbiniz nazikçe anlaşılmak istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ra_pos3',
    card: 'King of Swords',
    position: 3,
    upright:
      'Kılıç Kralı, beklentinizin adaletli ve ilkesel iletişim olduğunu söyler. Kalbiniz akıl–vicdan dengesinde karar arıyor.. İlke, adalet.',
    reversed:
      'Ters Kılıç Kralı, beklentinizin katı hükümlerin çözülmesi olduğunu gösterir. Kalbiniz empatiyle harmanlanmış karar istiyor.\n\nBelirti: Esneklik isteği.',
    keywords: ['adalet', 'ilke', 'karar', 'denge', 'empati'],
    context:
      'Beklentiniz ilke ve şefkat birleşimidir. Kalbiniz adil bir iletişim arıyor.',
    group: 'Kılıçlar',
  },

// Set: Asalar (14 kart)

{
    id: 'ace_of_wands_ra_pos3',
    card: 'Ace of Wands',
    position: 3,
    upright:
      'Değnek Ası, beklentinizin yeni bir tutku ve yaratıcı başlangıç olduğunu söyler. Kalbiniz heyecanla kıvılcım arıyor.. İlham, yeni enerji.',
    reversed:
      'Ters Değnek Ası, beklentinizin motivasyon eksikliğini aşmak olduğunu gösterir. Kalbiniz canlılık istiyor.\n\nBelirti: Enerji tazeleme arzusu.',
    keywords: ['tutku', 'başlangıç', 'ilham', 'enerji', 'yaratıcılık'],
    context:
      'Beklentiniz taze bir kıvılcım. Kalbiniz canlı bir başlangıç arıyor.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ra_pos3',
    card: 'Two of Wands',
    position: 3,
    upright:
      'İki Değnek, beklentinizin planlı ilerleme olduğunu söyler. Kalbiniz yön belirlemek istiyor.. Hedef, vizyon.',
    reversed:
      'Ters İki Değnek, beklentinizin belirsizlikten kurtulmak olduğunu gösterir. Kalbiniz net rota istiyor.\n\nBelirti: Belirsizlikten çıkış isteği.',
    keywords: ['vizyon', 'plan', 'rota', 'hedef', 'ilerleme'],
    context:
      'Beklentiniz yol haritasıdır. Kalbiniz yönünü bilmek istiyor.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ra_pos3',
    card: 'Three of Wands',
    position: 3,
    upright:
      'Üç Değnek, beklentinizin ufuk açmak ve yeni fırsatlara yönelmek olduğunu söyler. Kalbiniz genişleme istiyor.. Fırsat, büyüme.',
    reversed:
      'Ters Üç Değnek, beklentinizin gecikmelerden korunmak olduğunu gösterir. Kalbiniz akışta ilerlemek istiyor.\n\nBelirti: Akış arayışı.',
    keywords: ['ufuk', 'fırsat', 'büyüme', 'ilerleme', 'genişleme'],
    context:
      'Beklentiniz yeni kapılar açmaktır. Kalbiniz yolculukla genişlemek istiyor.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ra_pos3',
    card: 'Four of Wands',
    position: 3,
    upright:
      'Dört Değnek, beklentinizin huzurlu birliktelik ve kutlama olduğunu söyler. Kalbiniz güvenli bir yuva istiyor.. Uyum, kutlama.',
    reversed:
      'Ters Dört Değnek, beklentinizin temelsiz kutlamalardan korunmak olduğunu gösterir. Kalbiniz sahici huzur arıyor.\n\nBelirti: Gerçeklik isteği.',
    keywords: ['huzur', 'uyum', 'kutlama', 'aile', 'istikrar'],
    context:
      'Beklentiniz sağlam köklerdir. Kalbiniz güvenli bir alan arıyor.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ra_pos3',
    card: 'Five of Wands',
    position: 3,
    upright:
      'Beş Değnek, beklentinizin sağlıklı rekabet ve yapıcı tartışma olduğunu söyler. Kalbiniz enerjik etkileşim istiyor.. Yapıcılık, enerji.',
    reversed:
      'Ters Beş Değnek, beklentinizin kavga ve kaostan korunmak olduğunu gösterir. Kalbiniz huzurlu etkileşim arıyor.\n\nBelirti: Sükunet isteği.',
    keywords: ['rekabet', 'etkileşim', 'enerji', 'tartışma', 'hareket'],
    context:
      'Beklentiniz yapıcı enerji alışverişidir. Kalbiniz sağlıklı paylaşım arıyor.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ra_pos3',
    card: 'Six of Wands',
    position: 3,
    upright:
      'Altı Değnek, beklentinizin başarı ve takdir olduğunu söyler. Kalbiniz görülmek istiyor.. Başarı, onay.',
    reversed:
      'Ters Altı Değnek, beklentinizin samimiyetsiz övgülerden uzak kalmak olduğunu gösterir. Kalbiniz sahici takdir arıyor.\n\nBelirti: İçtenlik ihtiyacı.',
    keywords: ['başarı', 'takdir', 'onay', 'görülme', 'gurur'],
    context:
      'Beklentiniz emeğinizin görülmesidir. Kalbiniz samimi onay istiyor.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ra_pos3',
    card: 'Seven of Wands',
    position: 3,
    upright:
      'Yedi Değnek, beklentinizin kendinizi savunma gücü olduğunu söyler. Kalbiniz sınırlarını korumak istiyor.. Dayanıklılık, özgüven.',
    reversed:
      'Ters Yedi Değnek, beklentinizin savunma yorgunluğundan korunmak olduğunu gösterir. Kalbiniz destek arıyor.\n\nBelirti: Güven ihtiyacı.',
    keywords: ['savunma', 'özgüven', 'dayanıklılık', 'sınır', 'direnç'],
    context:
      'Beklentiniz sınırlarınızın anlaşılmasıdır. Kalbiniz yanında durulmasını istiyor.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ra_pos3',
    card: 'Eight of Wands',
    position: 3,
    upright:
      'Sekiz Değnek, beklentinizin hızlı ilerleme ve net mesajlar olduğunu söyler. Kalbiniz akış istiyor.. Hız, açıklık.',
    reversed:
      'Ters Sekiz Değnek, beklentinizin gecikmelerden korunmak olduğunu gösterir. Kalbiniz zamanında adım bekliyor.\n\nBelirti: Akış talebi.',
    keywords: ['hız', 'akış', 'mesaj', 'ilerleme', 'ivme'],
    context:
      'Beklentiniz akışkan bir süreçtir. Kalbiniz hızla yol almak istiyor.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ra_pos3',
    card: 'Nine of Wands',
    position: 3,
    upright:
      'Dokuz Değnek, beklentinizin dirayet ve toparlanma olduğunu söyler. Kalbiniz pes etmeden devam etmek istiyor.. Güç, dayanıklılık.',
    reversed:
      'Ters Dokuz Değnek, beklentinizin yorgunluk ve şüpheden arınmak olduğunu gösterir. Kalbiniz güven tazelemek istiyor.\n\nBelirti: Yenilenme ihtiyacı.',
    keywords: ['direnç', 'dayanıklılık', 'güven', 'sabır', 'güç'],
    context:
      'Beklentiniz toparlanmaktır. Kalbiniz yeniden ayağa kalkmak istiyor.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ra_pos3',
    card: 'Ten of Wands',
    position: 3,
    upright:
      'On Değnek, beklentinizin yüklerin paylaşılması olduğunu söyler. Kalbiniz hafiflemek istiyor.. Paylaşım, destek.',
    reversed:
      'Ters On Değnek, beklentinizin gereksiz yüklerden arınmak olduğunu gösterir. Kalbiniz rahatlama arıyor.\n\nBelirti: Sorumluluk azaltma arzusu.',
    keywords: ['yük', 'paylaşım', 'destek', 'sorumluluk', 'hafifleme'],
    context:
      'Beklentiniz yüklerin dengeli paylaşımıdır. Kalbiniz destek görmek istiyor.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ra_pos3',
    card: 'Page of Wands',
    position: 3,
    upright:
      'Değnek Prensi, beklentinizin keşif ve heves olduğunu söyler. Kalbiniz yeni maceraya aç.. Heves, öğrenme.',
    reversed:
      'Ters Değnek Prensi, beklentinizin yarım kalmış heveslerden arınmak olduğunu gösterir. Kalbiniz sahici motivasyon istiyor.\n\nBelirti: Gerçek tutku isteği.',
    keywords: ['heves', 'keşif', 'öğrenme', 'tutku', 'enerji'],
    context:
      'Beklentiniz macera ruhudur. Kalbiniz keşfetmek istiyor.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ra_pos3',
    card: 'Knight of Wands',
    position: 3,
    upright:
      'Değnek Şövalyesi, beklentinizin coşkulu hareket ve tutkulu bağ olduğunu söyler. Kalbiniz ateş istiyor.. Tutku, cesaret.',
    reversed:
      'Ters Değnek Şövalyesi, beklentinizin acelecilikten korunmak olduğunu gösterir. Kalbiniz dengeli hareket istiyor.\n\nBelirti: Ölçülü enerji isteği.',
    keywords: ['tutku', 'cesaret', 'hareket', 'heves', 'ateş'],
    context:
      'Beklentiniz tutkulu adımlardır. Kalbiniz ateşli ama dengeli ilerlemek istiyor.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ra_pos3',
    card: 'Queen of Wands',
    position: 3,
    upright:
      'Değnek Kraliçesi, beklentinizin özgüven ve neşe olduğunu söyler. Kalbiniz ışığını paylaşmak istiyor.. Cazibe, sıcaklık.',
    reversed:
      'Ters Değnek Kraliçesi, beklentinizin kıskançlık gölgelerinden korunmak olduğunu gösterir. Kalbiniz sahici sıcaklık istiyor.\n\nBelirti: Saf enerji talebi.',
    keywords: ['özgüven', 'cazibe', 'sıcaklık', 'ışıltı', 'güç'],
    context:
      'Beklentiniz ışığınızın görülmesidir. Kalbiniz neşeyle parlamak istiyor.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ra_pos3',
    card: 'King of Wands',
    position: 3,
    upright:
      'Değnek Kralı, beklentinizin liderlik ve vizyon olduğunu söyler. Kalbiniz yön gösterici bir bağ istiyor.. Güç, vizyon.',
    reversed:
      'Ters Değnek Kralı, beklentinizin otoriter tavırlardan korunmak olduğunu gösterir. Kalbiniz ilhamla yönetilen bağ istiyor.\n\nBelirti: Esin ihtiyacı.',
    keywords: ['liderlik', 'vizyon', 'ilham', 'güç', 'karizma'],
    context:
      'Beklentiniz vizyon sahibi bir bağdır. Kalbiniz esin verici bir ortaklık istiyor.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 3 anlamını getirir
 * @param card - Tarot kartı
 * @returns pozisyon 3 anlamı veya null
 */
export function getRelationshipAnalysisPosition3Meaning(
  card: TarotCard
): RelationshipAnalysisposition3Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position3Meanings.find(m => 
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
  meaning = position3Meanings.find(m => m.card === englishName);
  
  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 3 anlamını getirir
 * @param cardName - Kart ismi
 * @returns pozisyon 3 anlamı veya null
 */
export function getRelationshipAnalysisPosition3MeaningByCardName(
  cardName: string
): RelationshipAnalysisposition3Meaning | null {
  return position3Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 3 anlamlarını getirir
 * @returns pozisyon 3 anlamları array'i
 */
export function getAllRelationshipAnalysisPosition3Meanings(): RelationshipAnalysisposition3Meaning[] {
  return position3Meanings;
}

/**
 * Kart grubuna göre pozisyon 3 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getRelationshipAnalysisPosition3MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipAnalysisposition3Meaning[] {
  return position3Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition3Meanings = (): I18nRelationshipAnalysisposition3Meaning[] => {
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
): I18nRelationshipAnalysisposition3Meaning | null => {
  const originalMeaning = position3Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `relationship-analysis.meanings.${cardKey}.position3.upright`
  );
  const i18nReversed = t(
    `relationship-analysis.meanings.${cardKey}.position3.reversed`
  );
  const i18nKeywords = t(
    `relationship-analysis.meanings.${cardKey}.position3.keywords`
  );
  const i18nContext = t(
    `relationship-analysis.meanings.${cardKey}.position3.context`
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
const RelationshipAnalysisposition3Exports = {
  position3Meanings,
  getRelationshipAnalysisPosition3Meaning,
  getRelationshipAnalysisPosition3MeaningByCardName,
  getAllRelationshipAnalysisPosition3Meanings,
  getRelationshipAnalysisPosition3MeaningsByGroup,
};

export default RelationshipAnalysisposition3Exports;
