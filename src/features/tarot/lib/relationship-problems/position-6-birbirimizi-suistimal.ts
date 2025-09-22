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
- position6Meanings: gerekli
- getposition6Meaning: gerekli
*/

// import { getRelationshipProblemsMeaningByCardAndPositionMeaning } from './position-meanings-index';
import { RelationshipProblemsPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position6Meanings: RelationshipProblemsPositionMeaning[] = [
  // MAJÖR ARKANA
 // RELATIONSHIP CONFLICT — Pozisyon 6: 'Birbirimizi suistimal mi ediyoruz?'
// MAJOR ARCANA (22)
{
  id: 'the_fool_rc_pos6',
  card: 'The Fool',
  position: 6,
  upright:
    'Joker, sınırların naifçe ihmal edilip iyi niyetin sömürüye açık bırakılabileceğini söyler. Biri özgürlüğünü kalkan yaparken diğeri sorumluluğu üstleniyor olabilir.',
  reversed:
    'Ters Joker, pervasızlık ve düşünmeden atılan adımların karşı tarafın emeğini ve duygusunu istismar etmesine zemin hazırladığını anlatır. Masumiyet, bedeli başkasına yükleyen bir kaytarma biçimine dönüşebilir.',
  keywords: ['sınır', 'naiflik', 'sorumluluk', 'özgürlük', 'kaytarma'],
  context:
    'Tema: iyi niyetin kötüye kullanımı; Risk: sınır ihlali ve tek taraflı yük; Yap: net çerçeve ve küçük taahhütlerle denge.',
  group: 'Majör Arkana',
},
{
  id: 'the_magician_rc_pos6',
  card: 'The Magician',
  position: 6,
  upright:
    'Büyücü, ikna gücünün ilişki lehine kullanıldığında besleyici olabileceğini fakat sınır aşımında manipülasyona kayabileceğini fısıldar. Parlak sözler eylem desteği almıyorsa sömürü riski doğar.',
  reversed:
    'Ters Büyücü, gerçeklerin bükülmesi, gaz aydınlatması ve görünmez iplerle yönlendirme ihtimalini yükseltir. İstek, onay ve rıza olmadan kurulan düzen, güç dengesini bozar.',
  keywords: ['manipülasyon', 'ikna', 'güç', 'rıza', 'algı'],
  context:
    'Tema: ikna ile yönlendirme çizgisi; Risk: söz–eylem makası; Yap: rıza ve şeffaflık kuralı.',
  group: 'Majör Arkana',
},
{
  id: 'the_high_priestess_rc_pos6',
  card: 'The High Priestess',
  position: 6,
  upright:
    'Başrahibe, gizlilik ve ima dilinin gerektiğinde koruyucu olacağını ama sistematik sır tutmanın güç kurmak için kullanılabileceğini söyler. Bilgiye erişim kısıtlandıkça denge bozulur.',
  reversed:
    'Ters Başrahibe, duygusal geri çekilme ve sessizlikle cezalandırma döngülerini işaret eder. İletişimi kapatmak, kontrol aracı haline gelebilir.',
  keywords: ['giz', 'suskunluk', 'erişim', 'bilgi gücü', 'duygu'],
  context:
    'Tema: bilgi ve duygu erişimi; Risk: sessizlikle kontrol; Yap: açık paylaşım sınırları.',
  group: 'Majör Arkana',
},
{
  id: 'the_empress_rc_pos6',
  card: 'The Empress',
  position: 6,
  upright:
    'İmparatoriçe, bakım ve şefkatin sağaltıcı olduğunu ancak aşırı korumacılığın bağımlılık ve borçluluk duygusu yaratabileceğini söyler. İyilik pazarlık aracı olmamalıdır.',
  reversed:
    'Ters İmparatoriçe, kıskançlıkla sarıp sarmalama veya ihmal arasında savrulmayı anlatır. Bakımı geri çekme, karşı tarafı hizaya sokma taktiğine dönüşebilir.',
  keywords: ['bakım', 'şefkat', 'korumacılık', 'bağımlılık', 'kıskançlık'],
  context:
    'Tema: bakımın dozu; Risk: iyilik karşılığı boyun eğme; Yap: koşulsuz destek + sağlıklı sınır.',
  group: 'Majör Arkana',
},
{
  id: 'the_emperor_rc_pos6',
  card: 'The Emperor',
  position: 6,
  upright:
    'İmparator, düzen ve güvenliğin kıymetini vurgular; fakat kurallar tek taraflı konduğunda otorite sömürüye kayar. Ben bilirim tavrı, ihtiyaçları bastırabilir.',
  reversed:
    'Ters İmparator, mikro yönetim, izin kültürü ve katı kontrolle partneri küçültme riskini büyütür. Güç, koruma değil boyun eğdirme aracına dönüşebilir.',
  keywords: ['otorite', 'kural', 'kontrol', 'güven', 'mikro yönetim'],
  context:
    'Tema: düzen ve esneklik dengesi; Risk: tek taraflı yönetim; Yap: ortak kural ve yetki paylaşımı.',
  group: 'Majör Arkana',
},
{
  id: 'the_hierophant_rc_pos6',
  card: 'The Hierophant',
  position: 6,
  upright:
    'Aziz, gelenek ve değerlerin ortak çerçeve sunduğunu söyler; fakat bunlar dayatmaya döndüğünde vicdan ve özgünlüğü sömürebilir. Onay toplama ihtiyacı, baskı aracına dönüşmemeli.',
  reversed:
    'Ters Aziz, dogma, utandırma ve toplumsal normları sopa olarak kullanma riskini işaret eder. Benim ailemin yolu söylemi, partnerin sesini bastırabilir.',
  keywords: ['gelenek', 'norm', 'onay', 'utandırma', 'özgünlük'],
  context:
    'Tema: değer ortaklığı; Risk: norm dayatması; Yap: değer diyaloğu ve esneklik.',
  group: 'Majör Arkana',
},
{
  id: 'the_lovers_rc_pos6',
  card: 'The Lovers',
  position: 6,
  upright:
    'Aşıklar, seçim ve rıza dengesinin kutsal olduğunu hatırlatır. Sevgi adıyla yapılan duygusal şantaj, uyumu değil sömürüyü doğurur.',
  reversed:
    'Ters Aşıklar, karşılıklılık bozulduğunda sevginin koz olarak kullanılmasını, kıskançlık ve üçgenlerin güç oyununa dönüşmesini anlatır.',
  keywords: ['seçim', 'rıza', 'karşılıklılık', 'kıskançlık', 'koşulluluk'],
  context:
    'Tema: sevgi ve özgürlük; Risk: duygusal şantaj; Yap: açık evet/hayır ve seçim saygısı.',
  group: 'Majör Arkana',
},
{
  id: 'the_chariot_rc_pos6',
  card: 'The Chariot',
  position: 6,
  upright:
    'Savaş Arabası, yön ve hedefin netliğini över; fakat hız ve baskı artınca istek dayatmaya dönüşebilir. Direksiyon hep tek eldeyse sömürü riski yükselir.',
  reversed:
    'Ters Savaş Arabası, partnerin sınırını aşan itiş kakış ve kazanmak için bastırmayı işaret eder. İplerle çekmek yerine uzlaşmak gerekir.',
  keywords: ['baskı', 'yön', 'hız', 'dayatma', 'uzlaşı'],
  context:
    'Tema: ivme ve rıza; Risk: hedef uğruna baskı; Yap: ortak tempo ve kontrol paylaşımı.',
  group: 'Majör Arkana',
},
{
  id: 'strength_rc_pos6',
  card: 'Strength',
  position: 6,
  upright:
    'Güç, nazik kuvvetin iyileştirici olduğunu söyler; ama kıskançlık ve utandırma ile dizginleme girişimleri sömürüye dönüşebilir. Şefkat, tahakküm kılığına girmemeli.',
  reversed:
    'Ters Güç, duyguları tetikleyip geri çekerek partneri cezalandırma veya suçluluk yükleme ihtimalini artırır. Öz denge yoksa güç dengesizliği büyür.',
  keywords: ['nazik güç', 'kıskançlık', 'utanç', 'öz düzenleme', 'denge'],
  context:
    'Tema: şefkatli etki; Risk: duygusal dizginleme; Yap: tetikleyici anda mola ve açık talep.',
  group: 'Majör Arkana',
},
{
  id: 'the_hermit_rc_pos6',
  card: 'The Hermit',
  position: 6,
  upright:
    'Ermiş, sağlıklı yalnızlığın faydasını anlatır; fakat mesafe ve sessizliği koz olarak kullanmak sömürüdür. Geri çekilme, partneri cezalandırma aracına dönüşmemeli.',
  reversed:
    'Ters Ermiş, taş duvar örüp iletişimi kilitleyerek güç toplama ve kontrol kurma riskini vurgular. İlişki, bilinçli izolasyonla cezalandırılamaz.',
  keywords: ['mesafe', 'yalnızlık', 'iletişim', 'cezalandırma', 'alan'],
  context:
    'Tema: alan ve bağ; Risk: taş duvar davranışı; Yap: planlı mola ve geri dönüş protokolü.',
  group: 'Majör Arkana',
},
{
  id: 'wheel_of_fortune_rc_pos6',
  card: 'Wheel of Fortune',
  position: 6,
  upright:
    'Kader Çarkı, tekrar eden kazanan–kaybeden döngülerine dikkat çeker. Sömürü kalıbı fark edilmezse aynı oyun dönüp durur.',
  reversed:
    'Ters Kader Çarkı, kadercilikle suistimali meşrulaştırma riskini anlatır. Böyle gelmiş böyle gider söylemi, değişimi sabote eder.',
  keywords: ['döngü', 'alışkanlık', 'denge', 'farkındalık', 'değişim'],
  context:
    'Tema: tekrar örüntüsü; Risk: normalleştirilmiş sömürü; Yap: küçük fark yaratan kural.',
  group: 'Majör Arkana',
},
{
  id: 'justice_rc_pos6',
  card: 'Justice',
  position: 6,
  upright:
    'Adalet, açık hesap ve dengeli paylaşımı şart koşar. Kural ve yaptırım tek tarafa işlerse hak, güç aracına dönüşür.',
  reversed:
    'Ters Adalet, çifte standart, seçici hafıza ve geç telafiyle suistimali işaret eder. Denge kurulmadıkça güven erir.',
  keywords: ['adalet', 'denge', 'hesap', 'telafi', 'şeffaflık'],
  context:
    'Tema: hesap verilebilirlik; Risk: çifte standart; Yap: açık metrik ve zamanında telafi.',
  group: 'Majör Arkana',
},
{
  id: 'the_hanged_man_rc_pos6',
  card: 'The Hanged Man',
  position: 6,
  upright:
    'Asılan Adam, fedakarlığın armağan olduğunu fakat kronikleştiğinde kendini feda üzerinden pasif baskıya dönebileceğini söyler. Sürekli ben veriyorum söylemi borç duygusu yaratır.',
  reversed:
    'Ters Asılan Adam, kurban anlatısını güç aracı yapma riskini büyütür. Askıda bırakma ve erteleme, karşı tarafı kontrol etmenin yolu olabilir.',
  keywords: ['fedakarlık', 'askıda kalma', 'kurbanlık', 'pasif baskı', 'denge'],
  context:
    'Tema: verme–alma dengesi; Risk: fedayı koz yapmak; Yap: gönüllü sınır ve süre tanımı.',
  group: 'Majör Arkana',
},
{
  id: 'death_rc_pos6',
  card: 'Death',
  position: 6,
  upright:
    'Ölüm, bitmesi gereken şeyleri uzatmanın taraflardan birine güç sağlayabileceğini söyler. Kapanışı ertelemek, kararsızlık üzerinden kontrol yaratır.',
  reversed:
    'Ters Ölüm, değişim korkusunu kullanarak partneri yerinde tutma ve seçenekleri daraltma riskini anlatır. Gitmekle tehdit etmek de sömürüdür.',
  keywords: ['bitiş', 'değişim', 'korku', 'kontrol', 'kapanış'],
  context:
    'Tema: eşik ve vedalaşma; Risk: kapanışla şantaj; Yap: net karar ve güvenli geçiş.',
  group: 'Majör Arkana',
},
{
  id: 'temperance_rc_pos6',
  card: 'Temperance',
  position: 6,
  upright:
    'Denge, karışımı özenle yapmayı öğütler; ama sınırlar eridiğinde kim kimden ne bekliyor belirsizleşir. Bu sis sömürüye alan açar.',
  reversed:
    'Ters Denge, uçlara savrulan dozaj ve ya hep ya hiç tutumuyla ilişkiyi kırılgan hale getirir. Dalgalı ritim, bir tarafı sürekli taşımaya zorlayabilir.',
  keywords: ['denge', 'dozaj', 'sınır', 'ritim', 'sentez'],
  context:
    'Tema: karışım ve sınır; Risk: görünmez emek; Yap: doz ve rol kalibrasyonu.',
  group: 'Majör Arkana',
},
{
  id: 'the_devil_rc_pos6',
  card: 'The Devil',
  position: 6,
  upright:
    'Şeytan, bağımlılık, kıskançlık ve kontrolün suistimalin klasik yüzlerini açığa çıkarır. Sevgi, zincir kılığına bürünmemelidir.',
  reversed:
    'Ters Şeytan, bağları çözme ihtiyacını ve tetikleyicilerle yüzleşmeyi çağırır. Zincirler görmezden gelindikçe sömürü normalleşir.',
  keywords: ['bağımlılık', 'kıskançlık', 'kontrol', 'sınır', 'özgürleşme'],
  context:
    'Tema: toksik bağ; Risk: kontrol ve kıskançlık; Yap: tetik yönetimi ve net sınır.',
  group: 'Majör Arkana',
},
{
  id: 'the_tower_rc_pos6',
  card: 'The Tower',
  position: 6,
  upright:
    'Kule, kriz ve şokun gerçekleri görünür kıldığını söyler. Kaosu çıkarıp ardından kurtarıcı rolü oynamak suistimalin sert bir biçimidir.',
  reversed:
    'Ters Kule, patlamayı geciktirip çatlakları koz olarak kullanma riskini anlatır. Korku iklimiyle kontrol kurulmamalıdır.',
  keywords: ['kriz', 'korku', 'gerçek', 'kurtarıcı sendromu', 'yıkım'],
  context:
    'Tema: kriz ve güç; Risk: korku üzerinden kontrol; Yap: radikal dürüstlük ve onarım planı.',
  group: 'Majör Arkana',
},
{
  id: 'the_star_rc_pos6',
  card: 'The Star',
  position: 6,
  upright:
    'Yıldız, umut ve şifanın nazikçe paylaşıldığında güç verdiğini söyler. Fakat boş vaatlerle oyalamak veya şifa vaadiyle ertelemek sömürüdür.',
  reversed:
    'Ters Yıldız, umutsuzluğu koz yapıp partnerin ihtiyaçlarını küçümseme tehlikesini gösterir. Umut dengesizse bağımlı bir bekleme hali doğar.',
  keywords: ['umut', 'şifa', 'vaat', 'gerçekçilik', 'sabır'],
  context:
    'Tema: umut ekonomisi; Risk: vaat sömürüsü; Yap: küçük ölçülebilir adım.',
  group: 'Majör Arkana',
},
{
  id: 'the_moon_rc_pos6',
  card: 'The Moon',
  position: 6,
  upright:
    'Ay, belirsizlik, şüphe ve çelişik sinyallerin zemin oluşturduğunu söyler. Sis büyüdükçe yorum gücü artar ve bu sömürüye çevrilebilir.',
  reversed:
    'Ters Ay, gaslighting ve paranoya döngülerini işaret eder. Kanıt yerine ima üretmek partneri yorar.',
  keywords: ['belirsizlik', 'yanılsama', 'gaslighting', 'korku', 'netlik'],
  context:
    'Tema: sis ve netlik; Risk: zihin oyunları; Yap: doğrulama ve açık dil.',
  group: 'Majör Arkana',
},
{
  id: 'the_sun_rc_pos6',
  card: 'The Sun',
  position: 6,
  upright:
    'Güneş, görünürlük ve açıklığın sömürüye panzehir olduğunu vurgular. Ancak sürekli iyi görünme baskısı sorunları halının altına itebilir.',
  reversed:
    'Ters Güneş, toksik pozitiflik ve sahne arkasını gizleme riskini anlatır. Neşeyi kalkan yapmak gerçek ihtiyacı bastırır.',
  keywords: ['açıklık', 'görünürlük', 'otantiklik', 'performans', 'güven'],
  context:
    'Tema: şeffaf sıcaklık; Risk: göstermelik mutluluk; Yap: otantik paylaşım.',
  group: 'Majör Arkana',
},
{
  id: 'judgement_rc_pos6',
  card: 'Judgement',
  position: 6,
  upright:
    'Mahkeme, hesap ve telafinin ilişkiyi arındırdığını söyler. Suistimal varsa adil yüzleşme ve onarım kaçınılmazdır.',
  reversed:
    'Ters Mahkeme, suç atma, geçmişi seçici hatırlama ve özrü pazarlık malzemesi yapma riskini büyütür. Hesap vermeden yenilenme olmaz.',
  keywords: ['yüzleşme', 'telafi', 'hesap', 'sorumluluk', 'yenilenme'],
  context:
    'Tema: adil muhasebe; Risk: sorumluluktan kaçış; Yap: net özür ve somut telafi.',
  group: 'Majör Arkana',
},
{
  id: 'the_world_rc_pos6',
  card: 'The World',
  position: 6,
  upright:
    'Dünya, döngülerin olgun tamamlanmasını vurgular. Açık uçları kasıtlı bırakmak, karşı tarafı bekletme ve kontrol etme aracına dönüşebilir.',
  reversed:
    'Ters Dünya, bitirmeden başlatma ve yarım bırakma kalıbıyla partnerin emeğini harcama riskini gösterir. Entegrasyon olmadan huzur gelmez.',
  keywords: ['tamamlama', 'entegrasyon', 'açık uç', 'kontrol', 'huzur'],
  context:
    'Tema: kapatma disiplini; Risk: yarım işler; Yap: tamamla ve paylaş.',
  group: 'Majör Arkana',
},

// CUPS (14)
{
  id: 'ace_of_cups_rc_pos6',
  card: 'Ace of Cups',
  position: 6,
  upright:
    'Kupa Ası, duygusal açıklığın besleyici olduğunu fakat sevgi ve şefkatin ödül ceza sistemine çevrilmemesi gerektiğini söyler.',
  reversed:
    'Ters Kupa Ası, sevgiyi çekip vererek bağımlılık yaratma ve duygusal açlığı koz yapma riskini işaret eder.',
  keywords: ['sevgi', 'şefkat', 'ödül ceza', 'açıklık', 'bağımlılık'],
  context:
    'Tema: koşulsuz sıcaklık; Risk: sevgi ekonomisi; Yap: duygu paylaşım protokolü.',
  group: 'Kupalar',
},
{
  id: 'two_of_cups_rc_pos6',
  card: 'Two of Cups',
  position: 6,
  upright:
    'İki Kupa, karşılıklılığı yüceltir. Eşit olmayan jest ve emek dağılımı, görünmez sömürüye dönüşebilir.',
  reversed:
    'Ters İki Kupa, küçük kırgınlıkları biriktirip partneri borçlandırma ve ilişkiyi puan tablosuna çevirme riskini anlatır.',
  keywords: ['karşılıklılık', 'denge', 'jest', 'emek', 'eşitlik'],
  context:
    'Tema: adil alışveriş; Risk: borçlandırma; Yap: jest dili ve limitler.',
  group: 'Kupalar',
},
{
  id: 'three_of_cups_rc_pos6',
  card: 'Three of Cups',
  position: 6,
  upright:
    'Üç Kupa, sosyal desteğin iyileştirici olduğunu söyler. Ancak kalabalık ve üçüncü kişiler kıskançlık veya baskı aracı yapılmamalıdır.',
  reversed:
    'Ters Üç Kupa, dış onayı silah gibi kullanma ve kıyasla partneri küçültme riskine dikkat çeker.',
  keywords: ['topluluk', 'kıyas', 'kıskançlık', 'onay', 'mahremiyet'],
  context:
    'Tema: sosyal alan; Risk: üçüncü kişi baskısı; Yap: mahremiyet anlaşması.',
  group: 'Kupalar',
},
{
  id: 'four_of_cups_rc_pos6',
  card: 'Four of Cups',
  position: 6,
  upright:
    'Dört Kupa, ilgisizlik ve bıkkınlığın pasif sömürü yaratabileceğini söyler. Takdiri geri çekmek de bir kontrol biçimidir.',
  reversed:
    'Ters Dört Kupa, isteksizlikle partneri cezalandırma ve fırsatları görmezden gelerek gücünü artırma riskini anlatır.',
  keywords: ['ilgisizlik', 'takdir', 'pasiflik', 'fırsat', 'kontrol'],
  context:
    'Tema: takdir ekonomisi; Risk: ilgiyi koz yapmak; Yap: görünür teşekkür ritmi.',
  group: 'Kupalar',
},
{
  id: 'five_of_cups_rc_pos6',
  card: 'Five of Cups',
  position: 6,
  upright:
    'Beş Kupa, yas ve hayal kırıklığının gerçek olduğunu kabul eder; fakat geçmiş acıyı sürekli hatırlatmak borçlandırma aracına dönüşebilir.',
  reversed:
    'Ters Beş Kupa, affedişi geciktirip suçluluk üzerinden güç kurma riskini işaret eder.',
  keywords: ['yas', 'kırgınlık', 'affediş', 'suçluluk', 'toparlanma'],
  context:
    'Tema: yasın sınırı; Risk: suçlulukla yönetim; Yap: kapanış ve yeni sayfa.',
  group: 'Kupalar',
},
{
  id: 'six_of_cups_rc_pos6',
  card: 'Six of Cups',
  position: 6,
  upright:
    'Altı Kupa, tatlı anıların bağ kurduğunu söyler; ama nostaljiyle bugün talep etmek sömürüye kayabilir. Eskisi gibi söylemi baskı kurabilir.',
  reversed:
    'Ters Altı Kupa, çocukluk kalıplarını bahane edip sorumluluğu erteleme riskini vurgular.',
  keywords: ['nostalji', 'geçmiş', 'kalıp', 'konfor', 'talep'],
  context:
    'Tema: geçmiş ve şimdi; Risk: nostalji baskısı; Yap: bugünün ihtiyacını konuşmak.',
  group: 'Kupalar',
},
{
  id: 'seven_of_cups_rc_pos6',
  card: 'Seven of Cups',
  position: 6,
  upright:
    'Yedi Kupa, belirsiz vaatler ve muğlak beklentilerin ilişkiyi sisle kaplayabileceğini söyler. Sis, güç asimetrisi doğurur.',
  reversed:
    'Ters Yedi Kupa, hayal satıp sorumluluk almama ve karar erteleme ile partneri oyalama riskini gösterir.',
  keywords: ['vaat', 'belirsizlik', 'beklenti', 'karar', 'sorumluluk'],
  context:
    'Tema: netlik ihtiyacı; Risk: vaat sömürüsü; Yap: kriter ve takvimle seçim.',
  group: 'Kupalar',
},
{
  id: 'eight_of_cups_rc_pos6',
  card: 'Eight of Cups',
  position: 6,
  upright:
    'Sekiz Kupa, anlam arayışını onurlandırır; fakat sessiz uzaklaşma kal–git salıncağına dönüştüğünde duygusal kontrol aracına dönüşebilir.',
  reversed:
    'Ters Sekiz Kupa, terk tehdidi veya ayrılık imasıyla partneri hizaya getirme riskini vurgular.',
  keywords: ['uzaklaşma', 'ikilem', 'ayrılık tehdidi', 'anlam', 'kapanış'],
  context:
    'Tema: yön ve rıza; Risk: ayrılıkla şantaj; Yap: konuşulan yön kararı.',
  group: 'Kupalar',
},
{
  id: 'nine_of_cups_rc_pos6',
  card: 'Nine of Cups',
  position: 6,
  upright:
    'Dokuz Kupa, kişisel konforun değerini hatırlatır; ama konforu sürekli öne koymak partnerin ihtiyaçlarını sömürebilir.',
  reversed:
    'Ters Dokuz Kupa, yüzeysel hazlarla derin ihtiyaçları bastırıp ilişki emeğini tek tarafa yıktığına dikkat çeker.',
  keywords: ['konfor', 'haz', 'denge', 'ihtiyaç', 'paylaşım'],
  context:
    'Tema: konfor–emek dengesi; Risk: bencilleşme; Yap: ortak sevinç ve görevler.',
  group: 'Kupalar',
},
{
  id: 'ten_of_cups_rc_pos6',
  card: 'Ten of Cups',
  position: 6,
  upright:
    'On Kupa, uyum ve aile hayalinin kıymetini söyler; fakat ideal tabloyu kalkan yapmak gerçek ihtiyacı susturabilir.',
  reversed:
    'Ters On Kupa, görünürdeki mutluluğu koz yapıp partnerin kaygısını küçümseme riskini anlatır.',
  keywords: ['ideal', 'uyum', 'gerçek', 'beklenti', 'otantiklik'],
  context:
    'Tema: gerçek uyum; Risk: vitrin mutluluğu; Yap: otantik gündem konuşması.',
  group: 'Kupalar',
},
{
  id: 'page_of_cups_rc_pos6',
  card: 'Page of Cups',
  position: 6,
  upright:
    'Kupa Prensi, naif jestlerin tatlılığını anlatır; ama alınganlıkla duygusal şantaj kurmak sömürüdür.',
  reversed:
    'Ters Kupa Prensi, pasif agresif sızlanma ve küsme ile partneri yönetme eğilimini büyütür.',
  keywords: ['naiflik', 'alınganlık', 'pasif agresif', 'jest', 'ifade'],
  context:
    'Tema: olgun duygu dili; Risk: trip ve sitem; Yap: açık talep cümleleri.',
  group: 'Kupalar',
},
{
  id: 'knight_of_cups_rc_pos6',
  card: 'Knight of Cups',
  position: 6,
  upright:
    'Kupa Şövalyesi, romantizmin büyüsünü över; fakat jestleri koz yapıp onay koparmak sömürüye kayabilir.',
  reversed:
    'Ters Kupa Şövalyesi, söz–eylem tutarsızlığıyla umut verip geri çekme riskini işaret eder.',
  keywords: ['romantizm', 'jest', 'onay', 'tutarlılık', 'geri çekilme'],
  context:
    'Tema: jest ve güven; Risk: umutla oyalama; Yap: az ve tutarlı adım.',
  group: 'Kupalar',
},
{
  id: 'queen_of_cups_rc_pos6',
  card: 'Queen of Cups',
  position: 6,
  upright:
    'Kupa Kraliçesi, empatiyle sarar; ancak aşırı duygusal bakım, görünmez borç ve bağımlılık üretebilir.',
  reversed:
    'Ters Kupa Kraliçesi, suçluluk tetikleme ve duygusal manipülasyonla partneri yönetme riskine dikkat çeker.',
  keywords: ['empati', 'bakım', 'bağımlılık', 'suçluluk', 'sınır'],
  context:
    'Tema: şefkat ve sınır; Risk: duygusal borçlandırma; Yap: öz bakım ve sınır netliği.',
  group: 'Kupalar',
},
{
  id: 'king_of_cups_rc_pos6',
  card: 'King of Cups',
  position: 6,
  upright:
    'Kupa Kralı, duygusal olgunluğu vurgular; fakat sakinliği kalkan yapıp meseleleri süpürmek partnerin duygusunu söndürebilir.',
  reversed:
    'Ters Kupa Kralı, pasif agresif dalgalarla dengeyi koz yapan bir sömürü biçimini gösterir.',
  keywords: ['olgunluk', 'sükunet', 'bastırma', 'pasif agresif', 'ifade'],
  context:
    'Tema: olgun sakinlik; Risk: duyguyu susturma; Yap: adlandır ve görünür kıl.',
  group: 'Kupalar',
},

// SWORDS (14)
{
  id: 'ace_of_swords_rc_pos6',
  card: 'Ace of Swords',
  position: 6,
  upright:
    'Kılıç Ası, netliğin kurtarıcı olduğunu söyler; fakat keskinlik, hakaret ve gözdağına kaydığında sömürüye dönüşür.',
  reversed:
    'Ters Kılıç Ası, bilgi kirliliği, çarpıtma ve yarım doğrularla partneri yönlendirme riskini büyütür.',
  keywords: ['netlik', 'keskinlik', 'çarpıtma', 'hakikat', 'güç'],
  context:
    'Tema: hakikatin dili; Risk: sözle baskı; Yap: nazik netlik ve kanıt.',
  group: 'Kılıçlar',
},
{
  id: 'two_of_swords_rc_pos6',
  card: 'Two of Swords',
  position: 6,
  upright:
    'İki Kılıç, karar kaçınmasının pasif kontrol üretebileceğini söyler. Askıda bırakmak, partneri belirsizlikle yönetmeye dönebilir.',
  reversed:
    'Ters İki Kılıç, yüzleşmeyi erteleyip suçun yükünü karşı tarafa bırakma riskini anlatır.',
  keywords: ['kararsızlık', 'kaçınma', 'askı', 'yüzleşme', 'belirsizlik'],
  context:
    'Tema: karar ve rıza; Risk: askıyla kontrol; Yap: küçük net seçim.',
  group: 'Kılıçlar',
},
{
  id: 'three_of_swords_rc_pos6',
  card: 'Three of Swords',
  position: 6,
  upright:
    'Üç Kılıç, sert üslup ve iğneleyici dürüstlüğün ilişkiyi kanatabileceğini söyler. Acıyla terbiye etmek sömürüdür.',
  reversed:
    'Ters Üç Kılıç, duygusal yarayı hatırlatıp suçluluk dağıtan dilin güç aracı olma riskini vurgular.',
  keywords: ['acı', 'üslup', 'iğne', 'suçluluk', 'onarım'],
  context:
    'Tema: incitmeden doğruluk; Risk: acıyla hizaya getirme; Yap: nazik ifade ve onarım.',
  group: 'Kılıçlar',
},
{
  id: 'four_of_swords_rc_pos6',
  card: 'Four of Swords',
  position: 6,
  upright:
    'Dört Kılıç, molanın şifa olduğunu söyler; fakat geri dönüşü bilerek geciktirmek partneri baskılamak için kullanılabilir.',
  reversed:
    'Ters Dört Kılıç, dinlenme bahanesiyle konuşmayı süresiz askıda tutma ve belirsizlikle güç kurma riskini gösterir.',
  keywords: ['mola', 'sükunet', 'gecikme', 'belirsizlik', 'geri dönüş'],
  context:
    'Tema: planlı mola; Risk: süresiz susuş; Yap: dönüş zamanı belirlemek.',
  group: 'Kılıçlar',
},
{
  id: 'five_of_swords_rc_pos6',
  card: 'Five of Swords',
  position: 6,
  upright:
    'Beş Kılıç, kazanmaya odaklı tartışmanın ilişkiyi kaybettirdiğini söyler. Zafer, sömürüye kapı aralayabilir.',
  reversed:
    'Ters Beş Kılıç, alay, küçümseme ve sarkazmın sessiz şiddet olarak kullanılması riskini işaret eder.',
  keywords: ['ego', 'zafer', 'küçümseme', 'sarkazm', 'saygı'],
  context:
    'Tema: kazanmak değil anlaşmak; Risk: alayla baskı; Yap: geri çekil ve dinle.',
  group: 'Kılıçlar',
},
{
  id: 'six_of_swords_rc_pos6',
  card: 'Six of Swords',
  position: 6,
  upright:
    'Altı Kılıç, geçişlerin planla yapılmasını öğütler; fakat habersiz yön değiştirmek partneri zayıf konuma düşürebilir.',
  reversed:
    'Ters Altı Kılıç, eski kıyıya geri dönme tehdidiyle kontrol kurma riskini gösterir.',
  keywords: ['geçiş', 'plan', 'habersiz', 'tehdit', 'adaptasyon'],
  context:
    'Tema: şeffaf geçiş; Risk: ani rota değişimi; Yap: adım adım plan paylaşımı.',
  group: 'Kılıçlar',
},
{
  id: 'seven_of_swords_rc_pos6',
  card: 'Seven of Swords',
  position: 6,
  upright:
    'Yedi Kılıç, eksik bilgi ve saklamanın güç üretmek için kullanılabileceğini söyler. Şeffaflık zayıflatmaz, güveni güçlendirir.',
  reversed:
    'Ters Yedi Kılıç, itirafı parça parça verip partneri oyalama ve gündemi kontrol etme riskini vurgular.',
  keywords: ['saklama', 'şeffaflık', 'güven', 'yönlendirme', 'etik'],
  context:
    'Tema: tam ve zamanında bilgi; Risk: bilgiyle manipülasyon; Yap: açık paylaşım kuralı.',
  group: 'Kılıçlar',
},
{
  id: 'eight_of_swords_rc_pos6',
  card: 'Eight of Swords',
  position: 6,
  upright:
    'Sekiz Kılıç, korku anlatısının kendini hapsetme ve partneri suçlama döngüsü yaratabileceğini söyler. Kapı çoğu kez açıktır.',
  reversed:
    'Ters Sekiz Kılıç, yardım talebini reddedip çaresizliği koz yapma riskini gösterir.',
  keywords: ['korku', 'çaresizlik', 'inanç', 'yardım', 'özgürleşme'],
  context:
    'Tema: gerçeklik testi; Risk: çaresizlikle yönetim; Yap: destek istemek ve kanıt bakışı.',
  group: 'Kılıçlar',
},
{
  id: 'nine_of_swords_rc_pos6',
  card: 'Nine of Swords',
  position: 6,
  upright:
    'Dokuz Kılıç, kaygıyı partnerin üzerinde baskı kurmak için kullanma eğilimine dikkat çeker. Sürekli endişe, ilişkinin gündemini tekelleştirebilir.',
  reversed:
    'Ters Dokuz Kılıç, uykusuzluk ve kuruntuyu bahane ederek sorumluluğu devretme riskini işaret eder.',
  keywords: ['kaygı', 'kuruntu', 'baskı', 'gündem', 'regülasyon'],
  context:
    'Tema: duygu regülasyonu; Risk: kaygıyla kontrol; Yap: kanıt odaklı konuşma.',
  group: 'Kılıçlar',
},
{
  id: 'ten_of_swords_rc_pos6',
  card: 'Ten of Swords',
  position: 6,
  upright:
    'On Kılıç, bitişi koz olarak kullanıp partneri tehdit etmenin sömürü olduğunu söyler. Tükenmişliği silah yapmak onarımı imkansızlaştırır.',
  reversed:
    'Ters On Kılıç, yıkımı abartıp öz şefkati reddederek diğerini suçlulukla sürükleme riskini gösterir.',
  keywords: ['bitiş', 'tehdit', 'tükeniş', 'şantaj', 'onarım'],
  context:
    'Tema: kapanış etiği; Risk: ayrılık kartı; Yap: sakin değerlendirme ve netlik.',
  group: 'Kılıçlar',
},
{
  id: 'page_of_swords_rc_pos6',
  card: 'Page of Swords',
  position: 6,
  upright:
    'Kılıç Prensi, merakın sağlıklı olduğunu ama sorgu tonunun sorgulama ve gözetlemeye kaymasıyla sömürüye dönüşebileceğini söyler.',
  reversed:
    'Ters Kılıç Prensi, dedikodu ve kanıtsız suçlamayla partneri izole etme riskini vurgular.',
  keywords: ['merak', 'sorgu', 'gözetleme', 'kanıt', 'dedikodu'],
  context:
    'Tema: nazik merak; Risk: casusluk kültürü; Yap: kanıt ve izin prensibi.',
  group: 'Kılıçlar',
},
{
  id: 'knight_of_swords_rc_pos6',
  card: 'Knight of Swords',
  position: 6,
  upright:
    'Kılıç Şövalyesi, hız ve doğrudanlığın bazen baskıya dönüştüğünü söyler. Ültimatom dili sömürünün habercisidir.',
  reversed:
    'Ters Kılıç Şövalyesi, sözlü saldırı ve korkutma taktikleriyle partneri sindirme riskini işaret eder.',
  keywords: ['hız', 'doğrudanlık', 'ültimatom', 'saldırı', 'korkutma'],
  context:
    'Tema: ton ve tempo; Risk: ültimatom; Yap: yavaşlat ve çerçevele.',
  group: 'Kılıçlar',
},
{
  id: 'queen_of_swords_rc_pos6',
  card: 'Queen of Swords',
  position: 6,
  upright:
    'Kılıç Kraliçesi, netliğin kıymetini bilir; fakat şefkatsiz keskinlik partneri küçültebilir. Nesnellik, incelikle birleşmelidir.',
  reversed:
    'Ters Kılıç Kraliçesi, sarkazm, taşlama ve küçümsemenin sessiz sömürüye dönüştüğünü gösterir.',
  keywords: ['netlik', 'nesnellik', 'şefkat', 'sarkazm', 'saygı'],
  context:
    'Tema: kalp ve akıl; Risk: keskinlikle terbiye; Yap: yumuşak çerçeve.',
  group: 'Kılıçlar',
},
{
  id: 'king_of_swords_rc_pos6',
  card: 'King of Swords',
  position: 6,
  upright:
    'Kılıç Kralı, ilke ve stratejinin gücünü hatırlatır; fakat kuralı sopa yapmak ve gri alanı yok saymak sömürüye dönüşebilir.',
  reversed:
    'Ters Kılıç Kralı, dogmatik ve buyurgan dilin partneri susturma riskini büyütür.',
  keywords: ['ilke', 'kural', 'dogma', 'empati', 'otorite'],
  context:
    'Tema: ilke ve merhamet; Risk: kural sopası; Yap: istisna tanıyan çerçeve.',
  group: 'Kılıçlar',
},

// WANDS (14)
{
  id: 'ace_of_wands_rc_pos6',
  card: 'Ace of Wands',
  position: 6,
  upright:
    'Değnek Ası, kıvılcımın canlılığını över; fakat hevesi bahane edip sorumluluğu devretmek partnerin emeğini sömürebilir.',
  reversed:
    'Ters Değnek Ası, başlatıp bırakma kalıbıyla diğerinin emeğini tüketme riskini gösterir.',
  keywords: ['heves', 'başlangıç', 'sorumluluk', 'süreklilik', 'emek'],
  context:
    'Tema: kıvılcım ve ritim; Risk: yarım işler; Yap: küçük ama düzenli teslim.',
  group: 'Asalar',
},
{
  id: 'two_of_wands_rc_pos6',
  card: 'Two of Wands',
  position: 6,
  upright:
    'İki Değnek, vizyonu paylaşmayı çağırır; fakat ufku kendi lehine kurup partneri destek rolüne itmek sömürüye kayar.',
  reversed:
    'Ters İki Değnek, planları tek başına yapıp oldu bitti yaratma ve gücü merkezde tutma riskini anlatır.',
  keywords: ['vizyon', 'plan', 'katılım', 'güç', 'risk'],
  context:
    'Tema: ortak ufuk; Risk: merkezileşme; Yap: birlikte plan ve pilot adım.',
  group: 'Asalar',
},
{
  id: 'three_of_wands_rc_pos6',
  card: 'Three of Wands',
  position: 6,
  upright:
    'Üç Değnek, genişlemeyi destekler; fakat beklentiyi konuşmadan yüklemek partneri borçlu hissettirebilir.',
  reversed:
    'Ters Üç Değnek, gecikmeleri koz yapıp sitemle yön vermek riskine dikkat çeker.',
  keywords: ['beklenti', 'genişleme', 'zamanlama', 'koordinasyon', 'sitem'],
  context:
    'Tema: senkron ve rol; Risk: görünmez beklenti; Yap: net rol–zaman haritası.',
  group: 'Asalar',
},
{
  id: 'four_of_wands_rc_pos6',
  card: 'Four of Wands',
  position: 6,
  upright:
    'Dört Değnek, eşik ve kutlamayı över; fakat töreni kalkan yapıp temeli atlamaya zorlama sömürüye dönüşebilir.',
  reversed:
    'Ters Dört Değnek, görünür mutluluğu pazarlık aracı yapma ve itibar baskısı kurma riskini gösterir.',
  keywords: ['eşik', 'kutlama', 'temel', 'itibar', 'baskı'],
  context:
    'Tema: temel ve tören sırası; Risk: vitrin baskısı; Yap: önce temel, sonra kutlama.',
  group: 'Asalar',
},
{
  id: 'five_of_wands_rc_pos6',
  card: 'Five of Wands',
  position: 6,
  upright:
    'Beş Değnek, fikir çarpışmasını canlı tutar; fakat kuralsız tartışma, baskın olanın sömürüsüne dönüşebilir.',
  reversed:
    'Ters Beş Değnek, gürültü yaratarak konuyu saptırma ve karşı tarafı yorma taktiğini işaret eder.',
  keywords: ['çatışma', 'kural', 'rekabet', 'saptırma', 'fasilitasyon'],
  context:
    'Tema: kurallı diyalog; Risk: gürültüyle baskı; Yap: tur ve süre kuralı.',
  group: 'Asalar',
},
{
  id: 'six_of_wands_rc_pos6',
  card: 'Six of Wands',
  position: 6,
  upright:
    'Altı Değnek, görünürlüğün tatlı olduğunu söyler; fakat alkışı tek elde toplamak partnerin emeğini görünmez kılar.',
  reversed:
    'Ters Altı Değnek, takdiri geri tutarak motivasyonla pazarlık yapma riskini anlatır.',
  keywords: ['takdir', 'görünürlük', 'emek', 'motivasyon', 'paylaşım'],
  context:
    'Tema: adil takdir; Risk: alkış tekeli; Yap: emeği görünür kılma ritmi.',
  group: 'Asalar',
},
{
  id: 'seven_of_wands_rc_pos6',
  card: 'Seven of Wands',
  position: 6,
  upright:
    'Yedi Değnek, sınır savunusunu anlatır; fakat sürekli mevzide kalmak partnerin söz hakkını bastırabilir.',
  reversed:
    'Ters Yedi Değnek, yardım talebini zayıflık sayıp yükü diğerine yıkma ve savunmayla yönetme riskini gösterir.',
  keywords: ['savunma', 'sınır', 'destek', 'yük', 'direnç'],
  context:
    'Tema: esnek sınır; Risk: savunmayla susturma; Yap: ortak savunma dili.',
  group: 'Asalar',
},
{
  id: 'eight_of_wands_rc_pos6',
  card: 'Eight of Wands',
  position: 6,
  upright:
    'Sekiz Değnek, hızlı iletişimi över; fakat mesaj seliyle partneri boğmak ve karar dayatmak sömürüdür.',
  reversed:
    'Ters Sekiz Değnek, bilinçli geciktirme ve erteleme ile gündemi rehin alma riskini işaret eder.',
  keywords: ['hız', 'iletişim', 'gecikme', 'dayatma', 'akış'],
  context:
    'Tema: akış tasarımı; Risk: mesaj baskısı; Yap: tek kanal ve sıra.',
  group: 'Asalar',
},
{
  id: 'nine_of_wands_rc_pos6',
  card: 'Nine of Wands',
  position: 6,
  upright:
    'Dokuz Değnek, dayanıklılığı över; fakat bitkinliği kalkan yapıp partnerden sürekli anlayış beklemek sömürüye dönüşebilir.',
  reversed:
    'Ters Dokuz Değnek, eski yaraları bugüne taşıyıp partneri temkinli yürütme riskini gösterir.',
  keywords: ['dayanıklılık', 'yorgunluk', 'anlayış', 'tetik', 'mola'],
  context:
    'Tema: dinlenmiş güç; Risk: sürekli tolerans talebi; Yap: planlı mola ve iş bölümü.',
  group: 'Asalar',
},
{
  id: 'ten_of_wands_rc_pos6',
  card: 'Ten of Wands',
  position: 6,
  upright:
    'On Değnek, aşırı yüklenmenin görünmez sömürü yaratabileceğini söyler. Her şeyi ben taşırım söylemi partneri borçlu bırakır.',
  reversed:
    'Ters On Değnek, bırakılabilir işleri taşımakta ısrar ederek diğerini yönetme riskini anlatır.',
  keywords: ['yük', 'delege', 'borçluluk', 'sadelik', 'sorumluluk'],
  context:
    'Tema: yük haritası; Risk: yükle yönetim; Yap: delege ve önceliklendirme.',
  group: 'Asalar',
},
{
  id: 'page_of_wands_rc_pos6',
  card: 'Page of Wands',
  position: 6,
  upright:
    'Değnek Prensi, hevesi sever; fakat odaksızlıkla partnerin tamamlamasını beklemek sömürüye dönüşebilir.',
  reversed:
    'Ters Değnek Prensi, yarım bırakma ve ortadan kaybolmanın diğerini taşıyıcı role itme riskini büyütür.',
  keywords: ['heves', 'odak', 'tamamlama', 'istikrar', 'sorumluluk'],
  context:
    'Tema: bitiricilik; Risk: diğerini tamamlatma; Yap: mini sprint ve teslim.',
  group: 'Asalar',
},
{
  id: 'knight_of_wands_rc_pos6',
  card: 'Knight of Wands',
  position: 6,
  upright:
    'Değnek Şövalyesi, cesareti öne çıkarır; fakat atılganlıkla başlatıp partneri söndürme riskini doğurur.',
  reversed:
    'Ters Değnek Şövalyesi, dengesiz ivme ve ani geri çekilmeyle partneri belirsizlikte tutma eğilimini gösterir.',
  keywords: ['cesaret', 'ivme', 'geri çekilme', 'denge', 'taahhüt'],
  context:
    'Tema: tutarlı ivme; Risk: hızla yakıp bırakma; Yap: tempo sözleşmesi.',
  group: 'Asalar',
},
{
  id: 'queen_of_wands_rc_pos6',
  card: 'Queen of Wands',
  position: 6,
  upright:
    'Değnek Kraliçesi, karizma ve görünürlüğü parlatır; fakat sahneyi tekelleştirmek partneri gölgede bırakabilir.',
  reversed:
    'Ters Değnek Kraliçesi, onay arayışını ilişki üzerinden besleyip kıyasla baskı kurma riskini anlatır.',
  keywords: ['karizma', 'görünürlük', 'kıyas', 'onay', 'paylaşım'],
  context:
    'Tema: ortak sahne; Risk: ışık tekeli; Yap: görünürlüğü paylaşmak.',
  group: 'Asalar',
},
{
  id: 'king_of_wands_rc_pos6',
  card: 'King of Wands',
  position: 6,
  upright:
    'Değnek Kralı, vizyonerliği över; fakat tek merkezli kararlarla partneri uygulayıcı role itmek sömürüdür.',
  reversed:
    'Ters Değnek Kralı, ego savaşları ve yetkiyi geri almama riskiyle gücü araçsallaştırmayı işaret eder.',
  keywords: ['vizyon', 'liderlik', 'yetki', 'katılım', 'ego'],
  context:
    'Tema: yetki paylaşımı; Risk: tek merkez; Yap: ortak karar ritmi.',
  group: 'Asalar',
},

// PENTACLES (14)
{
  id: 'ace_of_pentacles_rc_pos6',
  card: 'Ace of Pentacles',
  position: 6,
  upright:
    'Tılsım Ası, somut fırsatların adil paylaşımını önerir; fakat kaynakları tek elde tutmak güç asimetrisi doğurur.',
  reversed:
    'Ters Tılsım Ası, parayı, zamanı veya bilgiyi esirgerken partnerden fedakarlık bekleme riskini vurgular.',
  keywords: ['kaynak', 'para', 'zaman', 'güç', 'eşitlik'],
  context:
    'Tema: kaynak şeffaflığı; Risk: tek elde birikim; Yap: açık bütçe ve zaman planı.',
  group: 'Tılsımlar',
},
{
  id: 'two_of_pentacles_rc_pos6',
  card: 'Two of Pentacles',
  position: 6,
  upright:
    'İki Tılsım, denge becerisini över; fakat dağınıklıkla işleri son dakikaya bırakıp yükü partnerin sırtına yıkmak sömürüdür.',
  reversed:
    'Ters İki Tılsım, kendi önceliğini dayatıp diğerinin planını sürekli bozma riskini işaret eder.',
  keywords: ['denge', 'öncelik', 'zaman', 'yük', 'esneklik'],
  context:
    'Tema: ajanda adaleti; Risk: son dakika transferi; Yap: ortak plan ve kapasite sınırı.',
  group: 'Tılsımlar',
},
{
  id: 'three_of_pentacles_rc_pos6',
  card: 'Three of Pentacles',
  position: 6,
  upright:
    'Üç Tılsım, işbirliği ve rol netliğini ister. Görünmez emek sömürüsüne karşı kalite ve rol tanımı şarttır.',
  reversed:
    'Ters Üç Tılsım, takdiri geri çekmek ve emeği sahiplenmekle partneri değersizleştirme riskini gösterir.',
  keywords: ['işbirliği', 'rol', 'kalite', 'takdir', 'görünmez emek'],
  context:
    'Tema: rol–kalite sözleşmesi; Risk: emeği sahiplenme; Yap: açık süreç ve takdir.',
  group: 'Tılsımlar',
},
{
  id: 'four_of_pentacles_rc_pos6',
  card: 'Four of Pentacles',
  position: 6,
  upright:
    'Dört Tılsım, güvenlik ihtiyacını anlar; fakat para ve evi kontrol aracı yapmak sömürüye dönüşebilir.',
  reversed:
    'Ters Dört Tılsım, cimrilik veya erişimi kısarak partneri bağımlı kılma riskini vurgular.',
  keywords: ['güvenlik', 'kontrol', 'mülkiyet', 'paylaşım', 'erişim'],
  context:
    'Tema: güven ve esneklik; Risk: kaynakla kontrol; Yap: şeffaf paylaşım kuralları.',
  group: 'Tılsımlar',
},
{
  id: 'five_of_pentacles_rc_pos6',
  card: 'Five of Pentacles',
  position: 6,
  upright:
    'Beş Tılsım, yoksunluk dönemlerinde dayanışmayı çağırır; fakat yardımı geri çekmek veya utandırmak güç kurmanın yolu olabilir.',
  reversed:
    'Ters Beş Tılsım, dışlanmışlık korkusunu koz yapıp partneri boyun eğdirmeye çalışma riskini işaret eder.',
  keywords: ['kıtlık', 'dayanışma', 'utanç', 'dışlanma', 'yardım'],
  context:
    'Tema: dayanışma etiği; Risk: yardımla şantaj; Yap: açık ihtiyaç ve destek ağı.',
  group: 'Tılsımlar',
},
{
  id: 'six_of_pentacles_rc_pos6',
  card: 'Six of Pentacles',
  position: 6,
  upright:
    'Altı Tılsım, adil paylaşımı savunur; fakat koşullu yardım ve puan tutma sömürüdür.',
  reversed:
    'Ters Altı Tılsım, güç dengesini korumak için vermeyi araçsallaştırma ve bağımlılık yaratma riskini gösterir.',
  keywords: ['adalet', 'paylaşım', 'koşul', 'güç', 'eşitlik'],
  context:
    'Tema: koşulsuzluk ve şeffaflık; Risk: yardımla güç; Yap: açık kriter ve karşılıklılık.',
  group: 'Tılsımlar',
},
{
  id: 'seven_of_pentacles_rc_pos6',
  card: 'Seven of Pentacles',
  position: 6,
  upright:
    'Yedi Tılsım, emek ve sabrı över; fakat bekleme bahanesiyle partnerin emeğini bedavalaştırmak sömürüye dönüşebilir.',
  reversed:
    'Ters Yedi Tılsım, batık maliyete sığınarak diğerinin enerjisini tüketme riskini işaret eder.',
  keywords: ['emek', 'sabır', 'verim', 'bekleme', 'batık maliyet'],
  context:
    'Tema: adil hasat; Risk: bekleme ile oyalama; Yap: net metrik ve pivot.',
  group: 'Tılsımlar',
},
{
  id: 'eight_of_pentacles_rc_pos6',
  card: 'Eight of Pentacles',
  position: 6,
  upright:
    'Sekiz Tılsım, özen ve zanaati savunur; fakat kalite yükünü tek kişiye yıkmak görünmez sömürü üretir.',
  reversed:
    'Ters Sekiz Tılsım, özensizliği normalleştirip hatayı partnerin düzeltmesini bekleme riskini anlatır.',
  keywords: ['özen', 'kalite', 'iş bölümü', 'tekrar iş', 'sorumluluk'],
  context:
    'Tema: kalite ve paylaşım; Risk: görünmez düzeltme emeği; Yap: standart ve kontrol listesi.',
  group: 'Tılsımlar',
},
{
  id: 'nine_of_pentacles_rc_pos6',
  card: 'Nine of Pentacles',
  position: 6,
  upright:
    'Dokuz Tılsım, bağımsız konforu över; fakat ortak kaynaklardan tek taraflı faydalanmak partneri yorar.',
  reversed:
    'Ters Dokuz Tılsım, israf ya da aşırı tasarrufla partneri baskılama riskini gösterir.',
  keywords: ['bağımsızlık', 'konfor', 'kaynak', 'tasarruf', 'israf'],
  context:
    'Tema: ortak konfor; Risk: keyfin bedelini yüklemek; Yap: bütçe ve alan protokolü.',
  group: 'Tılsımlar',
},
{
  id: 'ten_of_pentacles_rc_pos6',
  card: 'Ten of Pentacles',
  position: 6,
  upright:
    'On Tılsım, aile ve sistem kaynaklarının dengeyle yönetilmesini ister; fakat aile gücünü baskı aracına çevirmek sömürü doğurur.',
  reversed:
    'Ters On Tılsım, miras, ev ve para meselelerini koz yapıp partnerin kararlarını kısıtlama riskini vurgular.',
  keywords: ['aile', 'miras', 'ev', 'para', 'sınır'],
  context:
    'Tema: sistem ve sınır; Risk: aile gücüyle baskı; Yap: net sınır ve şeffaf plan.',
  group: 'Tılsımlar',
},
{
  id: 'page_of_pentacles_rc_pos6',
  card: 'Page of Pentacles',
  position: 6,
  upright:
    'Tılsım Prensi, öğrenme isteğini över; fakat çıraklığı bahane edip emeği partnerden beklemek sömürüye dönüşebilir.',
  reversed:
    'Ters Tılsım Prensi, oyalanma ve erteleme ile diğerine sürekli destek görevi yükleme riskini anlatır.',
  keywords: ['öğrenme', 'disiplin', 'oyalanma', 'hedef', 'destek'],
  context:
    'Tema: küçük hedefler; Risk: sürekli yardım talebi; Yap: net görev ve tarih.',
  group: 'Tılsımlar',
},
{
  id: 'knight_of_pentacles_rc_pos6',
  card: 'Knight of Pentacles',
  position: 6,
  upright:
    'Tılsım Şövalyesi, istikrarı över; fakat işi hep aynı kişiye yıkmak ve yenilik taleplerini bastırmak sömürüye dönebilir.',
  reversed:
    'Ters Tılsım Şövalyesi, durağanlığı bahane edip partnerin esnekliğini sömürme riskini gösterir.',
  keywords: ['istikrar', 'rutin', 'iş bölümü', 'esneklik', 'ilerleme'],
  context:
    'Tema: adil rutin; Risk: tek kişilik omurga; Yap: rotasyon ve mikro iyileştirme.',
  group: 'Tılsımlar',
},
{
  id: 'queen_of_pentacles_rc_pos6',
  card: 'Queen of Pentacles',
  position: 6,
  upright:
    'Tılsım Kraliçesi, görünmez bakım emeğini aydınlatır. Bu emek koşul ve borç üretmemeli, aksi halde sömürüye dönüşür.',
  reversed:
    'Ters Tılsım Kraliçesi, öz bakımı ihmal edip ev içi tüm yükü üstlenirken karşı taraftan itaat bekleme riskini vurgular.',
  keywords: ['bakım', 'ev işi', 'görünmez emek', 'öz bakım', 'paylaşım'],
  context:
    'Tema: bakımın değeri; Risk: borçlandırma; Yap: iş bölümü ve görünür teşekkür.',
  group: 'Tılsımlar',
},
{
  id: 'king_of_pentacles_rc_pos6',
  card: 'King of Pentacles',
  position: 6,
  upright:
    'Tılsım Kralı, güvence sağlar; fakat finansı kontrol aracı yapmak ve kararları tek elden vermek sömürüye dönüşebilir.',
  reversed:
    'Ters Tılsım Kralı, statü ve para diliyle partneri susturma ve bağımlı kılma riskini işaret eder.',
  keywords: ['güvence', 'finans', 'kontrol', 'statü', 'yetki'],
  context:
    'Tema: finansal şeffaflık; Risk: para gücüyle baskı; Yap: ortak bütçe ve imza.',
  group: 'Tılsımlar',
},
];

// Kart adına göre pozisyon 6 anlamını bulma fonksiyonu
export const getposition6Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return position6Meanings.find(
    meaning => meaning.card === cardName
  );
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipProblemsposition6Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return getposition6Meaning(cardName);
};

// Kart adına göre pozisyon 6 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipProblemsposition6MeaningByCardName = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  const meaning = getposition6Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 6 anlamlarını alma fonksiyonu
export const getAllposition6Meanings = (): RelationshipProblemsPositionMeaning[] => {
  return position6Meanings;
};

// pozisyon 6 anlamlarını filtreleme fonksiyonu
export const getposition6MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return position6Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 6 anlamlarını arama
export const searchposition6MeaningsByKeyword = (
  keyword: string
): RelationshipProblemsPositionMeaning[] => {
  return position6Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position6Meanings,
  getposition6Meaning,
  getAllposition6Meanings,
  getposition6MeaningsByGroup,
  searchposition6MeaningsByKeyword,
};
