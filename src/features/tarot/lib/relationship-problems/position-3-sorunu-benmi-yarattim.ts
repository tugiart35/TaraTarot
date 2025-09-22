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
- position3Meanings: gerekli
- getposition3Meaning: gerekli
*/

// import { getRelationshipProblemsMeaningByCardAndPositionMeaning } from './position-meanings-index';
import { RelationshipProblemsPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position3Meanings: RelationshipProblemsPositionMeaning[] = [
  // MAJÖR ARKANA
  // RELATIONSHIP CONFLICT — Pozisyon 3: 'Sorunu ben mi yarattım?'
// MAJOR ARCANA (22)
{
  id: 'the_fool_rc_pos3',
  card: 'The Fool',
  position: 3,
  upright:
    'Joker, payının ani başlangıçlar ve “bakalım” moduyla netlik vermemekten gelebileceğini fısıldar. Özgürlük güzel ama çerçevesiz kaldığında karşı tarafta güvensizlik biriktirmiş olabilirsin.',
  reversed:
    'Ters Joker, sorumluluktan kaçınma, sözleri havada bırakma ve bağlanma korkusu ile senin de ateşe benzin taşıdığını söyler. Belirsizliği normalleştirmen, çatışmayı kroniklemiş olabilir.',
  keywords: ['başlangıç', 'plansızlık', 'özgürlük', 'bağlanma', 'belirsizlik'],
  context:
    'Pay: planı konuşmadan adım atma ve ilişkiyi tanımlamayı erteleme. Etki: güven, beklenti yönetimi. Öneri: net niyet + basit yol haritası.',
  group: 'Majör Arkana',
},
{
  id: 'the_magician_rc_pos3',
  card: 'The Magician',
  position: 3,
  upright:
    'Büyücü, güçlü anlatımının söz–eylem uyumsuzluğuna kaydığında kıvılcımı senin çaktığını söyler. “İkna” tonu şeffaf niyetin önüne geçtiyse payın büyük olabilir.',
  reversed:
    'Ters Büyücü, maskeleme, abartı ya da algı yönetimi girişimleriyle ateşi büyütmüş olabileceğini anlatır. Netliğin yerini numara aldığında güven erir.',
  keywords: ['iletişim', 'niyet', 'tutarlılık', 'güven', 'algı'],
  context:
    'Pay: şeffaf olmayan ifade ve vaat ekonomisi. Etki: güven, sınır. Öneri: sade dil + kanıtlanabilir adım.',
  group: 'Majör Arkana',
},
{
  id: 'the_high_priestess_rc_pos3',
  card: 'The High Priestess',
  position: 3,
  upright:
    'Başrahibe, payının duygularını saklamak ve ima diliyle konuşmaktan gelebileceğini söyler. İçini kapalı tutman, karşı tarafta “benden gizli” algısı yaratmış olabilir.',
  reversed:
    'Ters Başrahibe, bastırdığın şeylerin pasif–agresif sızıntılarla geri döndüğünü anlatır. Payın; gerçeği zamanında, yeterince açmayışındadır.',
  keywords: ['giz', 'sezgi', 'sır', 'mesafe', 'iç dünya'],
  context:
    'Pay: ifade edilmeyen duygu ve yarım cümleler. Etki: yakınlık, güven. Öneri: açık paylaşım ritmi.',
  group: 'Majör Arkana',
},
{
  id: 'the_empress_rc_pos3',
  card: 'The Empress',
  position: 3,
  upright:
    'İmparatoriçe, iyi niyetli ama boğucu bakım ve sahiplenmeyle kıvılcımı senin yakmış olabileceğini söyler. Sevgi verirken alan bırakmadığında geri çekilmeyi tetikler.',
  reversed:
    'Ters İmparatoriçe, kıskançlık gölgesi ve duygusal bağımlılık ile dengeyi kaçırmış olabileceğini anlatır. İhmal ya da aşırı bakım uçları payını büyütür.',
  keywords: ['bakım', 'şefkat', 'sahiplenme', 'ihtiyaç', 'kıskançlık'],
  context:
    'Pay: dozajı kaçan ilgi/ihmal. Etki: duygusal emniyet, özgürlük. Öneri: ihtiyaçları birlikte kalibre et.',
  group: 'Majör Arkana',
},
{
  id: 'the_emperor_rc_pos3',
  card: 'The Emperor',
  position: 3,
  upright:
    'İmparator, “ben bilirim” ve kural koyucu tavrınla gerilimi senin yükseltmiş olabileceğini söyler. Düzen kurarken esnekliği unutmak çatışma yaratır.',
  reversed:
    'Ters İmparator, mikro yönetim ve sert tonla payının arttığını anlatır. Kontrol ihtiyacı sevgiyi gölgelediğinde karşı taraf savunmaya geçer.',
  keywords: ['sınır', 'otorite', 'kural', 'kontrol', 'saygı'],
  context:
    'Pay: otorite ve mikro yönetim. Etki: saygı, otonomi. Öneri: çerçeve + ortak söz hakkı.',
  group: 'Majör Arkana',
},
{
  id: 'the_hierophant_rc_pos3',
  card: 'The Hierophant',
  position: 3,
  upright:
    'Aziz, gelenek ve aile normlarını “böyle olmalı” diye dayayınca kıvılcımın sende olabileceğini söyler. Onay ihtiyacı özgünlüğü bastırır.',
  reversed:
    'Ters Aziz, dogma ya da “kuralsızlık olsun” tepkiselliğiyle payını büyüttüğünü anlatır. Kalıp ve başkaldırı arasında savrulma ilişkiyi yorar.',
  keywords: ['gelenek', 'norm', 'onay', 'değer', 'kalıp'],
  context:
    'Pay: norm dayatması/inkârı. Etki: değer uyumu, özgünlük. Öneri: birlikte kural yazımı.',
  group: 'Majör Arkana',
},
{
  id: 'the_lovers_rc_pos3',
  card: 'The Lovers',
  position: 3,
  upright:
    'Aşıklar, değerlerini netleştirmeden kritik seçimler yaptıysan fitili sen ateşlemiş olabilirsin. İki yöne birden yürümek güvensizlik üretir.',
  reversed:
    'Ters Aşıklar, kararsızlık ve ikilikle payının arttığını söyler. Seçimsizlik de bir seçimdir ve ilişkiyi yaralar.',
  keywords: ['değer', 'seçim', 'hizalanma', 'sadakat', 'öncelik'],
  context:
    'Pay: kararsız/çelişkili seçimler. Etki: güven, taahhüt. Öneri: değer hizası + açık evet.',
  group: 'Majör Arkana',
},
{
  id: 'the_chariot_rc_pos3',
  card: 'The Chariot',
  position: 3,
  upright:
    'Savaş Arabası, hız ve yöntemi tek başına belirleyince kıvılcım sende olabilir der. İyi niyetli itiş gücün baskı gibi okunmuştur.',
  reversed:
    'Ters Savaş Arabası, savrulma ve yön kaybınla payını artırdığını anlatır. “Hemen”cilik diyalogu ezer.',
  keywords: ['yön', 'hız', 'odak', 'disiplin', 'kontrol'],
  context:
    'Pay: tempo ve rota dayatması. Etki: motivasyon, eşitlik. Öneri: ritmi ortaklaştır.',
  group: 'Majör Arkana',
},
{
  id: 'strength_rc_pos3',
  card: 'Strength',
  position: 3,
  upright:
    'Güç, tetiklenince sertleşen tonun ve sabırsızlığınla ateşi büyütmüş olabileceğini söyler. Yumuşak gücü unuttuğunda köprüler yanar.',
  reversed:
    'Ters Güç, özgüven dalgalanması ve kıskançlık gölgesiyle payını büyüttüğünü anlatır. Küçük kıvılcım fırtınaya döner.',
  keywords: ['cesaret', 'sabır', 'şefkat', 'özgüven', 'regülasyon'],
  context:
    'Pay: duygu regülasyonu açığı. Etki: iletişim kalitesi. Öneri: nefes–ara–yeniden dene.',
  group: 'Majör Arkana',
},
{
  id: 'the_hermit_rc_pos3',
  card: 'The Hermit',
  position: 3,
  upright:
    'Ermiş, “alan” isteğini anlatmadan çekildiğinde kıvılcım sende olabilir der. Sessizliğin, ihmal gibi okunmuştur.',
  reversed:
    'Ters Ermiş, sağlıksız izolasyon ve kaçınma ile payını büyüttüğünü söyler. “Kendi kendime” çözme, ortaklığı zedeler.',
  keywords: ['içe dönüş', 'mesafe', 'yalnızlık', 'paylaşım', 'rehberlik'],
  context:
    'Pay: açıklanmayan mesafe. Etki: yakınlık, güven. Öneri: ihtiyaçları görünür kıl.',
  group: 'Majör Arkana',
},
{
  id: 'wheel_of_fortune_rc_pos3',
  card: 'Wheel of Fortune',
  position: 3,
  upright:
    'Kader Çarkı, aynı tartışma döngüsüne fark etmeden döndüğünde payının oluştuğunu söyler. Ders alınmadıkça sahne tekrarlanır.',
  reversed:
    'Ters Kader Çarkı, “böyle gelmiş böyle gider” tavrınla büyütmüş olabileceğini anlatır. Kadercilik, sorumluluğu buharlaştırır.',
  keywords: ['döngü', 'zamanlama', 'alışkanlık', 'değişim', 'kısır döngü'],
  context:
    'Pay: tekrarlanan kalıplar. Etki: umut, ilerleme. Öneri: bir küçük fark yarat.',
  group: 'Majör Arkana',
},
{
  id: 'justice_rc_pos3',
  card: 'Justice',
  position: 3,
  upright:
    'Adalet, görev ve şeffaflıkta aksadığında kıvılcım sende olabilir der. Kefeler eşit hissettirmediğinde içerleme büyür.',
  reversed:
    'Ters Adalet, görmezden gelme ve bahane diliyle payını artırdığını söyler. Telafi gecikince güven erir.',
  keywords: ['adalet', 'denge', 'sorumluluk', 'şeffaflık', 'telafi'],
  context:
    'Pay: adil paylaşım açığı. Etki: güven, uzlaşı. Öneri: açık hesap + telafi.',
  group: 'Majör Arkana',
},
{
  id: 'the_hanged_man_rc_pos3',
  card: 'The Hanged Man',
  position: 3,
  upright:
    'Asılan Adam, kararları askıda tutarak belirsizliği büyüttüğünde payın var der. “Sonra bakarız” uzadıkça çatışma artar.',
  reversed:
    'Ters Asılan Adam, kurban anlatısına sığınıp eylemi ertelediğinde ateşi sen beslemiş olabilirsin. Perspektif değişmeden ilerleme yok.',
  keywords: ['askıda kalma', 'fedakarlık', 'perspektif', 'erteleme', 'atalet'],
  context:
    'Pay: erteleme–atalet. Etki: umut, netlik. Öneri: küçük/temiz bir karar.',
  group: 'Majör Arkana',
},
{
  id: 'death_rc_pos3',
  card: 'Death',
  position: 3,
  upright:
    'Ölüm, bitmesi gerekeni uzatıp eski kabuğa tutunduğunda payının yüksek olabileceğini söyler. Dönüşüm geciktikçe gerilim kronikleşir.',
  reversed:
    'Ters Ölüm, vedalaşmayı reddedip geçmişi taşımakla kıvılcımı senin büyüttüğünü anlatır. Yer açmadan yenisi gelmez.',
  keywords: ['bitiş', 'dönüşüm', 'bırakma', 'yeniden doğuş', 'direnç'],
  context:
    'Pay: değişime direnç. Etki: yenilenme, esneklik. Öneri: bilinçli bırakma.',
  group: 'Majör Arkana',
},
{
  id: 'temperance_rc_pos3',
  card: 'Temperance',
  position: 3,
  upright:
    'Denge, doz kaçırıp uçlara savrulduğunda fitilin sende olabileceğini söyler. Orta yol bulunmayınca küçük şeyler büyür.',
  reversed:
    'Ters Denge, sabırsızlık ve sıfır–yüz zihniyetiyle payını artırdığını anlatır. Kalibrasyon eksikliği ilişkiyi yorar.',
  keywords: ['denge', 'ölçü', 'sentez', 'uyum', 'sabır'],
  context:
    'Pay: tempo/ton kalibrasyonu. Etki: huzur, süreklilik. Öneri: doz ayarı yap.',
  group: 'Majör Arkana',
},
{
  id: 'the_devil_rc_pos3',
  card: 'The Devil',
  position: 3,
  upright:
    'Şeytan, kıskançlık, kontrol veya bağımlılık oyunlarıyla kıvılcımı senin yükseltmiş olabileceğini söyler. Zincir, sevgiye gölge düşürür.',
  reversed:
    'Ters Şeytan, ayrılmak istediğin halde tetikleyiciyi besleyerek payını büyüttüğünü anlatır. Zinciri gevşetmek cesaret ister.',
  keywords: ['bağımlılık', 'takıntı', 'kıskançlık', 'kontrol', 'toksisite'],
  context:
    'Pay: toksik tetikleyiciler. Etki: güven, özgürlük. Öneri: sınır + destek.',
  group: 'Majör Arkana',
},
{
  id: 'the_tower_rc_pos3',
  card: 'The Tower',
  position: 3,
  upright:
    'Kule, geç söylenen gerçek veya gömülü gerçeğin patlamasıyla ateşi senin yaktığını söyler. Çatlaklar zamanında onarılmadıysa şok kaçınılmazdır.',
  reversed:
    'Ters Kule, krizi erteleyip küçük sarsıntıları görmezden gelerek payını büyüttüğünü anlatır. Yıkımı yönetmek de cesarettir.',
  keywords: ['kriz', 'yıkım', 'temel', 'gerçek', 'yeniden inşa'],
  context:
    'Pay: geciken hakikat. Etki: istikrar, onarım. Öneri: radikal dürüstlük.',
  group: 'Majör Arkana',
},
{
  id: 'the_star_rc_pos3',
  card: 'The Star',
  position: 3,
  upright:
    'Yıldız, aşırı pembe gözlük ya da aşırı karamsarlıkla dengeyi kaçırdığında kıvılcım sende olabilir der. Umut yönetimi şifanın hızını belirler.',
  reversed:
    'Ters Yıldız, “olmuyor” dilini büyütüp motivasyonu düşürdüğün için payının arttığını anlatır. Ufak yapılabilir adımların yokluğu yaralar.',
  keywords: ['umut', 'şifa', 'sadelik', 'sabır', 'yenilenme'],
  context:
    'Pay: umut/gerçeklik dengesi. Etki: motivasyon, şifa. Öneri: küçük somut adım.',
  group: 'Majör Arkana',
},
{
  id: 'the_moon_rc_pos3',
  card: 'The Moon',
  position: 3,
  upright:
    'Ay, varsayımları gerçek sanıp tepki verdiğinde payın yüksek olabilir der. Sis büyüdükçe yanlış anlama da büyür.',
  reversed:
    'Ters Ay, sır aramak ve ima toplamakla ateşi senin canlı tuttuğunu anlatır. Netlik gelmeden hüküm yormuştur.',
  keywords: ['belirsizlik', 'korku', 'projeksiyon', 'yanılsama', 'güven'],
  context:
    'Pay: doğrulanmamış varsayım. Etki: güven, iletişim. Öneri: netlik iste.',
  group: 'Majör Arkana',
},
{
  id: 'the_sun_rc_pos3',
  card: 'The Sun',
  position: 3,
  upright:
    'Güneş, görünürlüğünü paylaşmadan öne çıkarınca kıvılcım sende olabilir der. Parlaklık, gölge yaratmış olabilir.',
  reversed:
    'Ters Güneş, “iyiyiz ya” diyerek gerçek meseleleri örtmekle payını artırdığını anlatır. Yapay neşe, onarımı geciktirir.',
  keywords: ['görünürlük', 'ego', 'takdir', 'otantiklik', 'netlik'],
  context:
    'Pay: takdir/otantiklik dengesizliği. Etki: eşitlik, sıcaklık. Öneri: sevinci ortak et.',
  group: 'Majör Arkana',
},
{
  id: 'judgement_rc_pos3',
  card: 'Judgement',
  position: 3,
  upright:
    'Mahkeme, yüzleşmeyi erteleyip özrü geciktirdiğinde payın olduğunu söyler. Geçmiş dosya kapanmadan bugün rahatlamaz.',
  reversed:
    'Ters Mahkeme, ya aşırı öz yargı ya da sıfır sorumluluk uçlarında salındığın için ateşi büyüttüğünü anlatır. Hakkaniyetli muhasebe şart.',
  keywords: ['yüzleşme', 'affediş', 'karar', 'yenilenme', 'hesap'],
  context:
    'Pay: kapanmamış hesap. Etki: ilerleme, güven. Öneri: özür + telafi.',
  group: 'Majör Arkana',
},
{
  id: 'the_world_rc_pos3',
  card: 'The World',
  position: 3,
  upright:
    'Dünya, bir döngüyü tamamlamadan yeniye geçtiğinde payının arttığını söyler. Entegrasyon atlanırsa tatminsizlik sürer.',
  reversed:
    'Ters Dünya, yarım kalmışlık hissini büyüten eksik uçlarla ateşi senin tutmuş olabileceğini anlatır. Bitirmeden başlamak yorucudur.',
  keywords: ['tamamlama', 'bütünlük', 'eşik', 'entegrasyon', 'uzatma'],
  context:
    'Pay: eksik tamamlanma. Etki: huzur, süreklilik. Öneri: eksikleri kapat.',
  group: 'Majör Arkana',
},

// CUPS (14)
{
  id: 'ace_of_cups_rc_pos3',
  card: 'Ace of Cups',
  position: 3,
  upright:
    'Kupa Ası, duygunu saklayıp kırılganlığını göstermemekle payın olabileceğini söyler. Kalp dolu ama kanal kapalıysa yanlış anlaşılma büyür.',
  reversed:
    'Ters Kupa Ası, bastırılmış kırgınlık ve duygusal tıkanıklığı sürdürerek ateşi senin büyüttüğünü anlatır. İçeride taşan şey dışarıda duvar olur.',
  keywords: ['duygu', 'ifade', 'kırılganlık', 'yakınlık', 'şifa'],
  context:
    'Pay: akmayan duygu. Etki: yakınlık, empati. Öneri: güvenli ifade kapısı.',
  group: 'Kupalar',
},
{
  id: 'two_of_cups_rc_pos3',
  card: 'Two of Cups',
  position: 3,
  upright:
    'İki Kupa, verdiğin–aldığın dengesinde adaletsiz hissettiren tutumlarınla payın olabileceğini söyler. Jest–emek uyumsuzluğu kırgınlık doğurur.',
  reversed:
    'Ters İki Kupa, mikro kırılmaları konuşmayıp uzaklaşarak ateşi büyüttüğünü anlatır. Bağ, küçük ihmallerle incelir.',
  keywords: ['karşılıklılık', 'denge', 'uyum', 'bağ', 'eşitlik'],
  context:
    'Pay: adil alışveriş açığı. Etki: güven, sıcaklık. Öneri: jest dilini hizala.',
  group: 'Kupalar',
},
{
  id: 'three_of_cups_rc_pos3',
  card: 'Three of Cups',
  position: 3,
  upright:
    'Üç Kupa, sosyal alanı ve zamanı dengesiz paylaştığında payının arttığını söyler. Mahremiyet–kalabalık ayarı kaçınca kıskançlık uyanır.',
  reversed:
    'Ters Üç Kupa, yüzeysel sosyalliğe sığınıp sahici teması erteleyerek ateşi büyüttüğünü anlatır. Dışarıya akış içeriyi kurutur.',
  keywords: ['sosyallik', 'mahremiyet', 'kıskançlık', 'ritüel', 'aidiyet'],
  context:
    'Pay: sosyal ritim uyumsuzluğu. Etki: güven, aidiyet. Öneri: zaman payını dengele.',
  group: 'Kupalar',
},
{
  id: 'four_of_cups_rc_pos3',
  card: 'Four of Cups',
  position: 3,
  upright:
    'Dört Kupa, ilgisiz görünen tavırlarınla ateşi senin yakmış olabileceğini söyler. İyi olanı fark etmeyince umut düşer.',
  reversed:
    'Ters Dört Kupa, apatiyi sürdürüp fırsatlara kapalı kalarak payını büyüttüğünü anlatır. Şükran eksikliği bağı soğutur.',
  keywords: ['tatmin', 'ilgi', 'fırsat', 'şükran', 'odak'],
  context:
    'Pay: apati/ilgisizlik algısı. Etki: motivasyon, yakınlık. Öneri: takdir görünür kıl.',
  group: 'Kupalar',
},
{
  id: 'five_of_cups_rc_pos3',
  card: 'Five of Cups',
  position: 3,
  upright:
    'Beş Kupa, geçmişe takılı kalıp kayba odaklandığında payın vardır der. Kalanı görmeyen göz bugünle bağını zayıflatır.',
  reversed:
    'Ters Beş Kupa, affedişi geciktirip pişmanlık dilini sürdürerek ateşi büyüttüğünü anlatır. Yas işbirliği ister.',
  keywords: ['yas', 'kayıp', 'affediş', 'toparlanma', 'umut'],
  context:
    'Pay: geçmişin gölgesi. Etki: onarım, ilerleme. Öneri: anlamlandır + bırak.',
  group: 'Kupalar',
},
{
  id: 'six_of_cups_rc_pos3',
  card: 'Six of Cups',
  position: 3,
  upright:
    'Altı Kupa, nostaljiye saplanıp “eskisi gibi” beklentisiyle payın olabileceğini söyler. Şimdiye haksızlık büyür.',
  reversed:
    'Ters Altı Kupa, çocukça savunulara dönüp bugünü ihmal ederek ateşi büyüttüğünü anlatır. Geçmiş konforu rehber değil pranga olur.',
  keywords: ['nostalji', 'geçmiş', 'örüntü', 'konfor', 'şimdi'],
  context:
    'Pay: geçmiş merkezli bakış. Etki: yenilik, esneklik. Öneri: bugünü kalibre et.',
  group: 'Kupalar',
},
{
  id: 'seven_of_cups_rc_pos3',
  card: 'Seven of Cups',
  position: 3,
  upright:
    'Yedi Kupa, hayal–gerçek çizgisini bulanıklaştırıp karar kaçırdığında payın vardır der. Sis, ilişkiyi yorur.',
  reversed:
    'Ters Yedi Kupa, seçenek çoğaltıp kriter belirlemeyerek ateşi büyüttüğünü anlatır. Seçmemek de seçmektir.',
  keywords: ['seçenek', 'hayal', 'gerçek', 'karar', 'kriter'],
  context:
    'Pay: net olmayan tercih. Etki: hedef, taahhüt. Öneri: kriter belirle.',
  group: 'Kupalar',
},
{
  id: 'eight_of_cups_rc_pos3',
  card: 'Eight of Cups',
  position: 3,
  upright:
    'Sekiz Kupa, sessizce uzaklaşıp anlam arayışını paylaşmadığında payın olabilir der. Konuşulmadan gidilen yol güvensizlik doğurur.',
  reversed:
    'Ters Sekiz Kupa, kal–git sarkacını sürdürerek ateşi büyüttüğünü anlatır. Kapanışsızlık ilişkiyi yorar.',
  keywords: ['anlam', 'tatminsizlik', 'ayrılış', 'ikilem', 'yol'],
  context:
    'Pay: paylaşılmayan yön arayışı. Etki: güven, istikrar. Öneri: net rota cümlesi.',
  group: 'Kupalar',
},
{
  id: 'nine_of_cups_rc_pos3',
  card: 'Nine of Cups',
  position: 3,
  upright:
    'Dokuz Kupa, kişisel konforu ortak faydanın önüne koyduğunda payın artar der. Dilekler çarpışınca sevinç daralır.',
  reversed:
    'Ters Dokuz Kupa, yüzeysel hazları kovalayıp derin doyumu ihmal ederek ateşi büyüttüğünü anlatır. Vitrin mutluluğu kırılgandır.',
  keywords: ['tatmin', 'haz', 'değer', 'hedef', 'ortak fayda'],
  context:
    'Pay: ben–odaklı tatmin. Etki: paylaşım, amaç. Öneri: ortak hedef tanımı.',
  group: 'Kupalar',
},
{
  id: 'ten_of_cups_rc_pos3',
  card: 'Ten of Cups',
  position: 3,
  upright:
    'On Kupa, ideal tabloya tutunup gerçeği reddettiğinde payın olabilir der. Masal, hayata dar kalır.',
  reversed:
    'Ters On Kupa, sahte uyumu sürdürüp sorunu halının altına iterek ateşi büyüttüğünü anlatır. Fotoğraf güler, kalp susar.',
  keywords: ['ideal', 'gerçeklik', 'uyum', 'aile', 'beklenti'],
  context:
    'Pay: ideal–gerçek kopukluğu. Etki: beklenti, ritüel. Öneri: otantik konuşma.',
  group: 'Kupalar',
},
{
  id: 'page_of_cups_rc_pos3',
  card: 'Page of Cups',
  position: 3,
  upright:
    'Kupa Prensi, alınganlık ve duygusal çocuklukla payını artırmış olabileceğini söyler. Masum niyeti bile yanlış okutan tavırlar güveni yorar.',
  reversed:
    'Ters Kupa Prensi, pasif–agresif sızlanmalar ve kaçışla ateşi büyüttüğünü anlatır. Yetişkin konuşma ertelenir.',
  keywords: ['hassasiyet', 'olgunluk', 'kaçış', 'ifade', 'oyunsuluk'],
  context:
    'Pay: duygusal olgunluk açığı. Etki: iletişim, sorumluluk. Öneri: açık talep cümlesi.',
  group: 'Kupalar',
},
{
  id: 'knight_of_cups_rc_pos3',
  card: 'Knight of Cups',
  position: 3,
  upright:
    'Kupa Şövalyesi, jesti planın önüne koyup tutarlılığı zayıflattığında payın olur der. Romantizm güzel ama sürdürülebilirlik ister.',
  reversed:
    'Ters Kupa Şövalyesi, söz–eylem uyumsuzluğu ve çabuk vazgeçmeyle ateşi büyüttüğünü anlatır. Hayal kırıklığı birikir.',
  keywords: ['romantizm', 'ideal', 'tutarlılık', 'pratik', 'güven'],
  context:
    'Pay: sürdürülemez jestler. Etki: güven, beklenti. Öneri: az-öz tutarlılık.',
  group: 'Kupalar',
},
{
  id: 'queen_of_cups_rc_pos3',
  card: 'Queen of Cups',
  position: 3,
  upright:
    'Kupa Kraliçesi, empatiyi sınırlarla dengeleyemeyince payın artar der. Aşırı bakım boğucu, azı ihmal gibi okunur.',
  reversed:
    'Ters Kupa Kraliçesi, duygusal manipülasyon ve suçluluk tetikleyerek ateşi büyüttüğünü anlatır. Şefkat önce kendine gerekir.',
  keywords: ['empati', 'sınır', 'bakım', 'manipülasyon', 'öz bakım'],
  context:
    'Pay: sınır/şefkat dengesi. Etki: tükenmişlik, güven. Öneri: net sınır + nazik dil.',
  group: 'Kupalar',
},
{
  id: 'king_of_cups_rc_pos3',
  card: 'King of Cups',
  position: 3,
  upright:
    'Kupa Kralı, duygunu fazla kontrol edip “soğuk” görünerek payın olabileceğini söyler. Sükunet, duyulmayı engellemesin.',
  reversed:
    'Ters Kupa Kralı, bastırılmış öfke ve pasif–agresif dalgalarla ateşi büyüttüğünü anlatır. Duygu sağlıklı kanal ister.',
  keywords: ['sükunet', 'ifade', 'denge', 'pasif agresif', 'liderlik'],
  context:
    'Pay: duygu aktarım stili. Etki: anlaşılma, güven. Öneri: adlandır–paylaş.',
  group: 'Kupalar',
},

// SWORDS (14)
{
  id: 'ace_of_swords_rc_pos3',
  card: 'Ace of Swords',
  position: 3,
  upright:
    'Kılıç Ası, net tanım yapmadan tartışmaya girdiğinde payın vardır der. Keskinlik iyi, bağlam eksikliği yaralar.',
  reversed:
    'Ters Kılıç Ası, bilgi kirliliği ve çarpıtılmış anlatıyla ateşi büyüttüğünü anlatır. Yarım doğrular güveni eritir.',
  keywords: ['netlik', 'gerçek', 'mesaj', 'tanım', 'karar'],
  context:
    'Pay: net olmayan dil/veri. Etki: karar, ittifak. Öneri: tanımı yaz.',
  group: 'Kılıçlar',
},
{
  id: 'two_of_swords_rc_pos3',
  card: 'Two of Swords',
  position: 3,
  upright:
    'İki Kılıç, karar felci ve kaçınmayla payın artar der. Gözleri bağlayıp “tarafsızım” demek sorunu bekletir.',
  reversed:
    'Ters İki Kılıç, yüzleşmeyi erteleyip patlamalara zemin hazırlayarak ateşi büyüttüğünü anlatır. Duygu–akıl köprüsü şart.',
  keywords: ['kararsızlık', 'kaçınma', 'ikilem', 'yüzleşme', 'denge'],
  context:
    'Pay: ertelenen karar. Etki: zamanlama, güven. Öneri: küçük kesin seçim.',
  group: 'Kılıçlar',
},
{
  id: 'three_of_swords_rc_pos3',
  card: 'Three of Swords',
  position: 3,
  upright:
    'Üç Kılıç, kırıcı söz ve sivri mizahla payın olabileceğini söyler. Sert gerçek nazik üslup ister.',
  reversed:
    'Ters Üç Kılıç, acıyı konuşmadan sızdırarak ateşi büyüttüğünü anlatır. Onarım çağrısı gecikmiştir.',
  keywords: ['kırgınlık', 'ihanet', 'acı', 'onarım', 'ifade'],
  context:
    'Pay: üslup/ifade hatası. Etki: güven, şefkat. Öneri: özür + onarım planı.',
  group: 'Kılıçlar',
},
{
  id: 'four_of_swords_rc_pos3',
  card: 'Four of Swords',
  position: 3,
  upright:
    'Dört Kılıç, dinlenmeden konuşup yorgun zihninle payını artırdığını söyler. Mola yoksa kalite de yok.',
  reversed:
    'Ters Dört Kılıç, “araya” direnirken küçük krizi büyüttüğünü anlatır. Beden mola ister.',
  keywords: ['dinlenme', 'toparlanma', 'sükunet', 'ritim', 'enerji'],
  context:
    'Pay: mola eksikliği. Etki: ton, tolerans. Öneri: ara ver–sonra konuş.',
  group: 'Kılıçlar',
},
{
  id: 'five_of_swords_rc_pos3',
  card: 'Five of Swords',
  position: 3,
  upright:
    'Beş Kılıç, haklı çıkma hırsıyla payının arttığını söyler. Zafer kazanılır, ilişki kaybedilir.',
  reversed:
    'Ters Beş Kılıç, alay/sarkazmla köprüleri yakarak ateşi büyüttüğünü anlatır. Yüz kurtarmak onarımı geciktirir.',
  keywords: ['ego', 'zafer', 'maliyet', 'uzlaşı', 'onur'],
  context:
    'Pay: ego savaşı. Etki: saygı, uzlaşı. Öneri: maliyeti gör–geri çekil.',
  group: 'Kılıçlar',
},
{
  id: 'six_of_swords_rc_pos3',
  card: 'Six of Swords',
  position: 3,
  upright:
    'Altı Kılıç, geçiş planını konuşmadan yön değiştirdiğinde payın olur der. Köprü kurmadan kıyı değişmez.',
  reversed:
    'Ters Altı Kılıç, eski kalıba geri dönüp çözümü geciktirerek ateşi büyüttüğünü anlatır. Adaptasyon şart.',
  keywords: ['geçiş', 'plan', 'yöntem', 'adaptasyon', 'sakinlik'],
  context:
    'Pay: yöntem eksikliği. Etki: süreç, umut. Öneri: adım adım plan.',
  group: 'Kılıçlar',
},
{
  id: 'seven_of_swords_rc_pos3',
  card: 'Seven of Swords',
  position: 3,
  upright:
    'Yedi Kılıç, saklama ve eksik anlatımla payın artar der. Şeffaflık yoksa güven de yok.',
  reversed:
    'Ters Yedi Kılıç, itirafı geciktirip parça parça doğrulukla ateşi büyüttüğünü anlatır. Utanç bariyeri indirilmeli.',
  keywords: ['şeffaflık', 'dürüstlük', 'strateji', 'güven', 'saklama'],
  context:
    'Pay: saklı ajanda. Etki: güven, etik. Öneri: tam ve zamanında bilgi.',
  group: 'Kılıçlar',
},
{
  id: 'eight_of_swords_rc_pos3',
  card: 'Eight of Swords',
  position: 3,
  upright:
    'Sekiz Kılıç, kanıtsız korkularla alanını daraltıp payını artırdığını söyler. Kapı açıkken kapalı sanmış olabilirsin.',
  reversed:
    'Ters Sekiz Kılıç, yardım istememeyi sürdürerek ateşi büyüttüğünü anlatır. Zihinsel prangalar çözülmek ister.',
  keywords: ['öz kısıt', 'korku', 'inanç', 'özgürleşme', 'yardım'],
  context:
    'Pay: korku hikâyeleri. Etki: hareket, iletişim. Öneri: gerçeklik testi.',
  group: 'Kılıçlar',
},
{
  id: 'nine_of_swords_rc_pos3',
  card: 'Nine of Swords',
  position: 3,
  upright:
    'Dokuz Kılıç, kaygı diliyle senaryoları büyütüp payını arttırdığını söyler. Uykusuz zihin sevgiye haksızlık eder.',
  reversed:
    'Ters Dokuz Kılıç, regülasyonsuz kaygıyı ilişkiye taşıyarak ateşi büyüttüğünü anlatır. Paylaş, hafifle.',
  keywords: ['kaygı', 'kuruntu', 'gerçeklik', 'uyku', 'regülasyon'],
  context:
    'Pay: kaygı hijyeni açığı. Etki: ton, karar. Öneri: kanıtla konuş.',
  group: 'Kılıçlar',
},
{
  id: 'ten_of_swords_rc_pos3',
  card: 'Ten of Swords',
  position: 3,
  upright:
    'On Kılıç, bitmiş yöntemi sürdürüp tükenişe de katkı verdiğini söyler. Bitişi kabul, yeninin başlangıcıdır.',
  reversed:
    'Ters On Kılıç, kapanışı reddedip konuyu döndürerek ateşi büyüttüğünü anlatır. Veda da sevgidir.',
  keywords: ['bitiş', 'kapanış', 'yeniden doğuş', 'tükenmişlik', 'kabul'],
  context:
    'Pay: kapanışsızlık. Etki: umut, yeniden kurulum. Öneri: net bitir–temiz başla.',
  group: 'Kılıçlar',
},
{
  id: 'page_of_swords_rc_pos3',
  card: 'Page of Swords',
  position: 3,
  upright:
    'Kılıç Prensi, dedektiflik ve sorgu tonuyla payın olabileceğini söyler. Merak iyi; kuşku dili yaralar.',
  reversed:
    'Ters Kılıç Prensi, dedikodu/kanıtsız iddiayla ateşi büyüttüğünü anlatır. Doğrulama olmadan hüküm yok.',
  keywords: ['sorgu', 'kuşku', 'doğrulama', 'iletişim', 'öğrenme'],
  context:
    'Pay: kanıtsız yargı. Etki: saygı, güven. Öneri: önce sor–sonra yorumla.',
  group: 'Kılıçlar',
},
{
  id: 'knight_of_swords_rc_pos3',
  card: 'Knight of Swords',
  position: 3,
  upright:
    'Kılıç Şövalyesi, hızlı ve sert girişlerle payını artırdığını söyler. Hız, hakikati çarpar.',
  reversed:
    'Ters Kılıç Şövalyesi, ültimatom ve keskin ifadelerle ateşi büyüttüğünü anlatır. Nefes arası, kalp arasıdır.',
  keywords: ['hız', 'sertlik', 'iletişim', 'saldırı', 'geri tepme'],
  context:
    'Pay: ton/tempo fazlası. Etki: güven, çözüm. Öneri: yavaşlat–yumuşat.',
  group: 'Kılıçlar',
},
{
  id: 'queen_of_swords_rc_pos3',
  card: 'Queen of Swords',
  position: 3,
  upright:
    'Kılıç Kraliçesi, aşırı eleştirel nesnellikle payını yükseltmiş olabileceğini söyler. Netlik nazik olmayınca soğutur.',
  reversed:
    'Ters Kılıç Kraliçesi, alay ve sarkazmla ateşi büyüttüğünü anlatır. Akıl iyi; üslup ağır.',
  keywords: ['nesnellik', 'eleştiri', 'şefkat', 'sınır', 'üslup'],
  context:
    'Pay: şefkatsiz netlik. Etki: yakınlık, açıklık. Öneri: nazik çerçeve.',
  group: 'Kılıçlar',
},
{
  id: 'king_of_swords_rc_pos3',
  card: 'King of Swords',
  position: 3,
  upright:
    'Kılıç Kralı, kural/ilke vurgusunu esnetmeyerek payını artırdığını söyler. Gri alanlar da gerçektir.',
  reversed:
    'Ters Kılıç Kralı, dogmatik güç diliyle ateşi büyüttüğünü anlatır. Strateji empatiyle evlensin.',
  keywords: ['ilke', 'kural', 'strateji', 'empati', 'otorite'],
  context:
    'Pay: kuralcı sertlik. Etki: uzlaşı, güven. Öneri: kural + merhamet.',
  group: 'Kılıçlar',
},

// WANDS (14)
{
  id: 'ace_of_wands_rc_pos3',
  card: 'Ace of Wands',
  position: 3,
  upright:
    'Değnek Ası, hevesi planla bağlamayıp payını artırdığını söyler. Kıvılcım var, ritim yoksa güven düşer.',
  reversed:
    'Ters Değnek Ası, yarım bırakmalar ve çabuk sönmelerle ateşi büyüttüğünü anlatır. İvme kadar istikrar da aşk ister.',
  keywords: ['kıvılcım', 'motivasyon', 'başlangıç', 'süreklilik', 'ritim'],
  context:
    'Pay: sürdürülemez hız. Etki: güven, beklenti. Öneri: küçük istikrarlı adım.',
  group: 'Asalar',
},
{
  id: 'two_of_wands_rc_pos3',
  card: 'Two of Wands',
  position: 3,
  upright:
    'İki Değnek, vizyonu konuşmadan risk bekleyip payını artırdığını söyler. Ufuk eşleşmeyince adımlar boşa düşer.',
  reversed:
    'Ters İki Değnek, sonsuz plan–sıfır adımla ateşi büyüttüğünü anlatır. Pilot deneme yapılmalı.',
  keywords: ['vizyon', 'plan', 'risk', 'ufuk', 'karar'],
  context:
    'Pay: ufuk/cesaret uyumsuzluğu. Etki: genişleme, güven. Öneri: minik prova.',
  group: 'Asalar',
},
{
  id: 'three_of_wands_rc_pos3',
  card: 'Three of Wands',
  position: 3,
  upright:
    'Üç Değnek, zamanlama ve koordinasyonu konuşmadan beklenti kurup payını artırdığını söyler. Ufuk güzel; süreç bozuksa huzur kaçar.',
  reversed:
    'Ters Üç Değnek, gecikmeleri suçlayıp planı güncellememekle ateşi büyüttüğünü anlatır. Senkron şart.',
  keywords: ['zamanlama', 'beklenti', 'genişleme', 'koordinasyon', 'ufuk'],
  context:
    'Pay: senkron açığı. Etki: teslim, sabır. Öneri: rol–zaman uyumu.',
  group: 'Asalar',
},
{
  id: 'four_of_wands_rc_pos3',
  card: 'Four of Wands',
  position: 3,
  upright:
    'Dört Değnek, temeli sağlamlaştırmadan eşiğe koşup payını artırdığını söyler. Kutlama sırası karışınca hayal kırıklığı büyür.',
  reversed:
    'Ters Dört Değnek, törensel “iyiyiz” görüntüsüyle sorunu erteleyerek ateşi büyüttüğünü anlatır. Önce temel, sonra tören.',
  keywords: ['eşik', 'kutlama', 'temel', 'aidiyet', 'ev'],
  context:
    'Pay: sıralama hatası. Etki: istikrar, aile entegrasyonu. Öneri: temel güçlendir.',
  group: 'Asalar',
},
{
  id: 'five_of_wands_rc_pos3',
  card: 'Five of Wands',
  position: 3,
  upright:
    'Beş Değnek, kuralsız tartışma ve güç denemeleriyle payını artırdığını söyler. Oyun yoksa kavga oyunu bozuyor.',
  reversed:
    'Ters Beş Değnek, gürültüyü çoğaltıp fasilitasyonu reddederek ateşi büyüttüğünü anlatır. Çerçeve kur.',
  keywords: ['çatışma', 'rekabet', 'kural', 'fasilitasyon', 'verim'],
  context:
    'Pay: yapısız kavga. Etki: verim, saygı. Öneri: tartışma kuralları.',
  group: 'Asalar',
},
{
  id: 'six_of_wands_rc_pos3',
  card: 'Six of Wands',
  position: 3,
  upright:
    'Altı Değnek, görünürlük ve takdiri paylaşmayıp payını artırdığını söyler. Alkış tek kişideyse kırgınlık büyür.',
  reversed:
    'Ters Altı Değnek, görünmeyen emeği görmezden gelerek ateşi büyüttüğünü anlatır. Zaferi birlikte yaz.',
  keywords: ['takdir', 'görünürlük', 'zafer', 'algı', 'motivasyon'],
  context:
    'Pay: takdir açığı. Etki: motivasyon, adalet. Öneri: emeği görünür kıl.',
  group: 'Asalar',
},
{
  id: 'seven_of_wands_rc_pos3',
  card: 'Seven of Wands',
  position: 3,
  upright:
    'Yedi Değnek, sürekli savunmada kalıp payını artırdığını söyler. Mevzide yaşamak diyalogu öldürür.',
  reversed:
    'Ters Yedi Değnek, yalnız savaşmayı seçip desteği reddederek ateşi büyüttüğünü anlatır. Yumuşa, paylaş.',
  keywords: ['savunma', 'sınır', 'direnç', 'destek', 'yük'],
  context:
    'Pay: aşırı savunma. Etki: işbirliği, empati. Öneri: yardım iste.',
  group: 'Asalar',
},
{
  id: 'eight_of_wands_rc_pos3',
  card: 'Eight of Wands',
  position: 3,
  upright:
    'Sekiz Değnek, mesaj hızını ve kanal sayısını yönetmeyip payını artırdığını söyler. Çok mesaj az anlam.',
  reversed:
    'Ters Sekiz Değnek, gecikme/kargaşayı normalleştirip ateşi büyüttüğünü anlatır. Akış tasarımı kur.',
  keywords: ['hız', 'iletişim', 'senkron', 'sıra', 'akış'],
  context:
    'Pay: iletişim akışı kaosu. Etki: yanlış anlama. Öneri: tek kanal–net sıra.',
  group: 'Asalar',
},
{
  id: 'nine_of_wands_rc_pos3',
  card: 'Nine of Wands',
  position: 3,
  upright:
    'Dokuz Değnek, yorgunken tetikte kalıp küçük sinyale aşırı tepkiyle payını artırdığını söyler. Dinlenmeden savaş olmaz.',
  reversed:
    'Ters Dokuz Değnek, eski yarayı şimdiye taşıyarak ateşi büyüttüğünü anlatır. Tolerans eşiğini tazele.',
  keywords: ['dayanıklılık', 'yorgunluk', 'tetikte olma', 'mola', 'koruma'],
  context:
    'Pay: yorgun savunma. Etki: çatışma eşiği. Öneri: mola kuralı.',
  group: 'Asalar',
},
{
  id: 'ten_of_wands_rc_pos3',
  card: 'Ten of Wands',
  position: 3,
  upright:
    'On Değnek, her şeyi üstlenip sonra sitem ederek payını artırdığını söyler. Delege etmeden yük adaleti olmaz.',
  reversed:
    'Ters On Değnek, bırakılması gerekeni taşımaya devam ederek ateşi büyüttüğünü anlatır. Öncelik temizliği yap.',
  keywords: ['yük', 'delege', 'öncelik', 'sorumluluk', 'sadelik'],
  context:
    'Pay: yük yönetimi hatası. Etki: tükenmişlik, sabır. Öneri: bırak–paylaş.',
  group: 'Asalar',
},
{
  id: 'page_of_wands_rc_pos3',
  card: 'Page of Wands',
  position: 3,
  upright:
    'Değnek Prensi, hevesi odakla bağlamayıp payını artırdığını söyler. Başlamak güzel; bitirmek güven verir.',
  reversed:
    'Ters Değnek Prensi, yarım projeler ve dikkat dağınıklığıyla ateşi büyüttüğünü anlatır. Küçük teslim tarihi koy.',
  keywords: ['keşif', 'heves', 'odak', 'bitiricilik', 'pilot'],
  context:
    'Pay: bitiricilik açığı. Etki: güven, hız. Öneri: mini sprint.',
  group: 'Asalar',
},
{
  id: 'knight_of_wands_rc_pos3',
  card: 'Knight of Wands',
  position: 3,
  upright:
    'Değnek Şövalyesi, hız/atılganlıkla hazırlıksız yakalayıp payını artırdığını söyler. Ateş güzel; ocak gerekir.',
  reversed:
    'Ters Değnek Şövalyesi, yarıda bırakmalar ve dengesiz ivmeyle ateşi büyüttüğünü anlatır. Taahhüt mimarisi kur.',
  keywords: ['hız', 'atılganlık', 'risk', 'taahhüt', 'ivme'],
  context:
    'Pay: hız–taahhüt açığı. Etki: güven, süreklilik. Öneri: ritim/çıktı sözleşmesi.',
  group: 'Asalar',
},
{
  id: 'queen_of_wands_rc_pos3',
  card: 'Queen of Wands',
  position: 3,
  upright:
    'Değnek Kraliçesi, görünürlüğü paylaşmayıp kıyası tetikleyerek payını artırdığını söyler. Işık büyürken gölgeyi de düşün.',
  reversed:
    'Ters Değnek Kraliçesi, onay arayışını ilişkiden talep ederek ateşi büyüttüğünü anlatır. Öz değer içeriden güçlensin.',
  keywords: ['görünürlük', 'karizma', 'kıyas', 'özgüven', 'onay'],
  context:
    'Pay: onay/görünürlük gölgesi. Etki: kıskançlık, destek. Öneri: başarıyı ortak et.',
  group: 'Asalar',
},
{
  id: 'king_of_wands_rc_pos3',
  card: 'King of Wands',
  position: 3,
  upright:
    'Değnek Kralı, vizyonu tek merkezden yönetip payını artırdığını söyler. Liderlik katılımla güzeldir.',
  reversed:
    'Ters Değnek Kralı, ego/otorite çarpışmalarıyla ateşi büyüttüğünü anlatır. Yetki paylaş sıcaklığı artırır.',
  keywords: ['vizyon', 'liderlik', 'yetki', 'ego', 'katılım'],
  context:
    'Pay: tek kutuplu vizyon. Etki: motivasyon, güven. Öneri: birlikte karar.',
  group: 'Asalar',
},

// PENTACLES (14)
{
  id: 'ace_of_pentacles_rc_pos3',
  card: 'Ace of Pentacles',
  position: 3,
  upright:
    'Tılsım Ası, fırsatı somut plana çevirmeyip payını artırdığını söyler. Güvence konuşulmadan umut yorulur.',
  reversed:
    'Ters Tılsım Ası, kıtlık zihniyeti ve ertelemeyle ateşi büyüttüğünü anlatır. Küçük somut adım yoksa söz değer kaybeder.',
  keywords: ['fırsat', 'temel', 'bütçe', 'güven', 'somut adım'],
  context:
    'Pay: somutluk eksikliği. Etki: güven, gelecek planı. Öneri: tohum ek.',
  group: 'Tılsımlar',
},
{
  id: 'two_of_pentacles_rc_pos3',
  card: 'Two of Pentacles',
  position: 3,
  upright:
    'İki Tılsım, zaman/enerji/bütçe dengelemesini yönetmeyip payını artırdığını söyler. Jonglör yorulur, top düşer.',
  reversed:
    'Ters İki Tılsım, erteleme ve dağınıklıkla ateşi büyüttüğünü anlatır. Program ve öncelik şart.',
  keywords: ['denge', 'öncelik', 'zaman', 'esneklik', 'program'],
  context:
    'Pay: ritim planı yok. Etki: ihmal, son dakika krizleri. Öneri: takvim–söz uyumu.',
  group: 'Tılsımlar',
},
{
  id: 'three_of_pentacles_rc_pos3',
  card: 'Three of Pentacles',
  position: 3,
  upright:
    'Üç Tılsım, rol/standart netliğini konuşmayıp payını artırdığını söyler. İşbirliği mimarisi olmayınca sürtünme artar.',
  reversed:
    'Ters Üç Tılsım, görünmeyen emeği görmezden gelip koordinasyonu ihmal ederek ateşi büyüttüğünü anlatır. Takdir sistemi kur.',
  keywords: ['işbirliği', 'rol', 'kalite', 'takdir', 'koordinasyon'],
  context:
    'Pay: rol/kalite muğlaklığı. Etki: motivasyon, tekrar iş. Öneri: süreç/standart.',
  group: 'Tılsımlar',
},
{
  id: 'four_of_pentacles_rc_pos3',
  card: 'Four of Pentacles',
  position: 3,
  upright:
    'Dört Tılsım, kontrol ve tutma refleksiyle payını artırdığını söyler. Güvenlik, paylaşımı boğmasın.',
  reversed:
    'Ters Dört Tılsım, aşırı sıkılık ya da savurganlık uçlarıyla ateşi büyüttüğünü anlatır. Denge görünür olmalı.',
  keywords: ['kontrol', 'güvenlik', 'paylaşım', 'tutma', 'savurganlık'],
  context:
    'Pay: kontrol/edim uçları. Etki: güven, şeffaflık. Öneri: açık bütçe.',
  group: 'Tılsımlar',
},
{
  id: 'five_of_pentacles_rc_pos3',
  card: 'Five of Pentacles',
  position: 3,
  upright:
    'Beş Tılsım, zor anda yardım istemeyip payını artırdığını söyler. Yalnız savaşmak ilişkiyi yalnızlaştırır.',
  reversed:
    'Ters Beş Tılsım, dayanışma çağrısını geciktirerek ateşi büyüttüğünü anlatır. Kapı var; çal.',
  keywords: ['kıtlık', 'dışlanmışlık', 'yardım', 'dayanışma', 'moral'],
  context:
    'Pay: destekten kaçınma. Etki: moral, bağ. Öneri: ihtiyaç talebi yap.',
  group: 'Tılsımlar',
},
{
  id: 'six_of_pentacles_rc_pos3',
  card: 'Six of Pentacles',
  position: 3,
  upright:
    'Altı Tılsım, koşullu destek ve minnet beklentisiyle payını artırdığını söyler. Eşitlik yoksa kırgınlık var.',
  reversed:
    'Ters Altı Tılsım, skor tutarak ateşi büyüttüğünü anlatır. Paylaşım şeffaf ve gönüllü olmalı.',
  keywords: ['adalet', 'paylaşım', 'güç', 'koşul', 'eşitlik'],
  context:
    'Pay: adaletsiz değişim. Etki: güven, güç dengesi. Öneri: koşulsuzlaş.',
  group: 'Tılsımlar',
},
{
  id: 'seven_of_pentacles_rc_pos3',
  card: 'Seven of Pentacles',
  position: 3,
  upright:
    'Yedi Tılsım, hasada erken gidip sabırsızlıkla payını artırdığını söyler. Ölçmeden hüküm yorar.',
  reversed:
    'Ters Yedi Tılsım, batık maliyete inat ederek ateşi büyüttüğünü anlatır. Pivotsuz emek tükeniştir.',
  keywords: ['sabır', 'verim', 'hasat', 'ölçüm', 'pivot'],
  context:
    'Pay: ölçme/öğrenme eksik. Etki: kaynak, umut. Öneri: gösterge belirle.',
  group: 'Tılsımlar',
},
{
  id: 'eight_of_pentacles_rc_pos3',
  card: 'Eight of Pentacles',
  position: 3,
  upright:
    'Sekiz Tılsım, otomatiğe bağlayıp özeni düşürerek payını artırdığını söyler. Zanaat sevgisi ilişkiye de lazım.',
  reversed:
    'Ters Sekiz Tılsım, özensizlik ve hızlı sonuç arzusuyla ateşi büyüttüğünü anlatır. Bilinçli pratik kur.',
  keywords: ['ustalık', 'pratik', 'odak', 'kalite', 'özen'],
  context:
    'Pay: kalite dalgası. Etki: gurur, güven. Öneri: düzenli ince ayar.',
  group: 'Tılsımlar',
},
{
  id: 'nine_of_pentacles_rc_pos3',
  card: 'Nine of Pentacles',
  position: 3,
  upright:
    'Dokuz Tılsım, bağımsız konforunu ortak faydanın önüne koyup payını artırdığını söyler. Zarif yalnızlık çift olmayı zorlar.',
  reversed:
    'Ters Dokuz Tılsım, israf/aşırı tasarruf uçlarında ateşi büyüttüğünü anlatır. Değer–harcama hizası kur.',
  keywords: ['bağımsızlık', 'konfor', 'sınır', 'harcama', 'tasarruf'],
  context:
    'Pay: konfor önceliği. Etki: alan, bütçe. Öneri: ortak konfor protokolü.',
  group: 'Tılsımlar',
},
{
  id: 'ten_of_pentacles_rc_pos3',
  card: 'Ten of Pentacles',
  position: 3,
  upright:
    'On Tılsım, aile/gelecek yapısını konuşmadan varsayarak payını artırdığını söyler. Sistem netleşmeden huzur zor.',
  reversed:
    'Ters On Tılsım, aile içi çekişmeleri ilişkiye taşıyıp ateşi büyüttüğünü anlatır. Sınır, huzurun bekçisi.',
  keywords: ['aile', 'miras', 'sistem', 'güvence', 'rol'],
  context:
    'Pay: sistem/rol muğlaklığı. Etki: uzun vade, sınır. Öneri: yazılı çerçeve.',
  group: 'Tılsımlar',
},
{
  id: 'page_of_pentacles_rc_pos3',
  card: 'Page of Pentacles',
  position: 3,
  upright:
    'Tılsım Prensi, öğrenme/sertifika gibi somut yatırımı erteleyip payını artırdığını söyler. Niyet tohum ister.',
  reversed:
    'Ters Tılsım Prensi, oyalanma ve dağınık odakla ateşi büyüttüğünü anlatır. Minik teslim tarihi şart.',
  keywords: ['öğrenme', 'hedef', 'disiplin', 'başlangıç', 'somutluk'],
  context:
    'Pay: disiplin eksikliği. Etki: ilerleme, güven. Öneri: küçük görev–tarih.',
  group: 'Tılsımlar',
},
{
  id: 'knight_of_pentacles_rc_pos3',
  card: 'Knight of Pentacles',
  position: 3,
  upright:
    'Tılsım Şövalyesi, yavaş ama emin ritmi küçümseyip hız baskısıyla payını artırdığını söyler. İstikrarın kıymetini bil.',
  reversed:
    'Ters Tılsım Şövalyesi, durağanlığa saplanıp çevikliği reddederek ateşi büyüttüğünü anlatır. Küçük iyileştirme büyük iş görür.',
  keywords: ['rutin', 'istikrar', 'çeviklik', 'sabır', 'ilerleme'],
  context:
    'Pay: tempo körlüğü. Etki: motivasyon, sürdürülebilirlik. Öneri: mikro iyileştirme.',
  group: 'Tılsımlar',
},
{
  id: 'queen_of_pentacles_rc_pos3',
  card: 'Queen of Pentacles',
  position: 3,
  upright:
    'Tılsım Kraliçesi, görünmez bakımı üstlenip sonra sitemle payını artırdığını söyler. Destek istemek güçtür.',
  reversed:
    'Ters Tılsım Kraliçesi, öz bakımı ihmal edip tükenmişlikle ateşi büyüttüğünü anlatır. Doldurmayan kap veremez.',
  keywords: ['bakım', 'pratiklik', 'öz bakım', 'destek', 'kaynak'],
  context:
    'Pay: görünmez emek. Etki: yorgunluk, huzur. Öneri: paylaş–dinlen.',
  group: 'Tılsımlar',
},
{
  id: 'king_of_pentacles_rc_pos3',
  card: 'King of Pentacles',
  position: 3,
  upright:
    'Tılsım Kralı, güvenceyi kontrolle karıştırıp payını artırdığını söyler. Statü dili sıcaklığı gölgeler.',
  reversed:
    'Ters Tılsım Kralı, mikro yönetim ve kaybetme korkusuyla ateşi büyüttüğünü anlatır. Güven yetkiden geçer.',
  keywords: ['güvence', 'statü', 'kontrol', 'paylaşım', 'esneklik'],
  context:
    'Pay: kontrol/güvence karışması. Etki: şefkatli liderlik. Öneri: yetki paylaş.',
  group: 'Tılsımlar',
},
];

// Kart adına göre pozisyon 3  anlamını bulma fonksiyonu
export const getposition3Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return position3Meanings.find(
    meaning => meaning.card === cardName
  );
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipProblemsposition3Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return getposition3Meaning(cardName);
};

// Kart adına göre pozisyon 3  anlamını bulma fonksiyonu (ana index için)
export const getRelationshipProblemsposition3MeaningByCardName = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  const meaning = getposition3Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 3  anlamlarını alma fonksiyonu
export const getAllposition3Meanings = (): RelationshipProblemsPositionMeaning[] => {
  return position3Meanings;
};

// pozisyon 3  anlamlarını filtreleme fonksiyonu
export const getposition3MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return position3Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 3  anlamlarını arama
export const searchposition3MeaningsByKeyword = (
  keyword: string
): RelationshipProblemsPositionMeaning[] => {
  return position3Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position3Meanings,
  getposition3Meaning,
  getAllposition3Meanings,
  getposition3MeaningsByGroup,
  searchposition3MeaningsByKeyword,
};
