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
- position10Meanings: gerekli
- getposition10Meaning: gerekli
*/

import { MarriagePositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position10Meanings: MarriagePositionMeaning[] = [
 // ========== MAJÖR ARKANA (22) ==========
{
  id: "the_fool_ma_pos10",
  card: "The Fool",
  position: 10,
  upright: "Deli, evlilik yolculuğunda özgürce yeni bir başlangıcı işaret eder. Cesaret ve saf bir inançla adım atmak evliliğe kapı açar.",
  reversed: "Ters Deli, plansızlık ya da dikkatsiz adımların evlilik yolunu geciktirebileceğini söyler. Daha bilinçli bir yaklaşım gerekir.",
  keywords: ["başlangıç", "cesaret", "inanç", "özgürlük", "yeni yol"],
  context: "Evlilik ihtimali var; ancak bilinçli bir seçim ve niyet gerektiriyor.",
  group: "Majör Arkana"
},
{
  id: "the_magician_ma_pos10",
  card: "The Magician",
  position: 10,
  upright: "Büyücü, evliliğe ulaşma gücünüze işaret eder. İsteklerinizi net ifade ederek kendi kaderinizi yaratabilirsiniz.",
  reversed: "Ters Büyücü, aldatıcı sözler ya da manipülasyon nedeniyle evlilik yolunda engeller olabilir.",
  keywords: ["yaratım", "ifade", "güç", "odak", "gerçekleşme"],
  context: "Evlilik sizin elinizde; dürüstlük ve odak şarttır.",
  group: "Majör Arkana"
},
{
  id: "the_high_priestess_ma_pos10",
  card: "The High Priestess",
  position: 10,
  upright: "Başrahibe, evliliğin içsel sezgi ve derin bir bağ yoluyla mümkün olabileceğini gösterir. Sabır ve içsel rehberlik önemlidir.",
  reversed: "Ters Başrahibe, gizlilik ya da saklanan gerçekler evlilik yolunu engelleyebilir.",
  keywords: ["sezgi", "giz", "bilgelik", "sabır", "bağ"],
  context: "Evlilik, içsel sezgiye güvenmekle şekillenecek.",
  group: "Majör Arkana"
},
{
  id: "the_empress_ma_pos10",
  card: "The Empress",
  position: 10,
  upright: "İmparatoriçe, bolluk, sevgi ve aile kurma isteğinin evlilik potansiyelini güçlendirdiğini söyler.",
  reversed: "Ters İmparatoriçe, aşırı bağımlılık ya da dengesiz sevgi evlilik ihtimalini zorlaştırabilir.",
  keywords: ["sevgi", "bolluk", "aile", "şefkat", "yaratıcılık"],
  context: "Evlilik olasılığı güçlü; şefkat ve dengeyle beslenmeli.",
  group: "Majör Arkana"
},
{
  id: "the_emperor_ma_pos10",
  card: "The Emperor",
  position: 10,
  upright: "İmparator, düzen, kararlılık ve güçlü temellerle evlilik ihtimalini destekler.",
  reversed: "Ters İmparator, kontrol veya katılık evlilik yolunda engel olabilir.",
  keywords: ["düzen", "güven", "istikrar", "kararlılık", "temel"],
  context: "Evlilik, güvenli yapı ve istikrarla gerçekleşir.",
  group: "Majör Arkana"
},
{
  id: "the_hierophant_ma_pos10",
  card: "The Hierophant",
  position: 10,
  upright: "Aziz, geleneksel evlilik yollarını, aile onayını ve kutsal bir bağı işaret eder.",
  reversed: "Ters Aziz, geleneksel kurallara direnç veya uyumsuzluk evlilik yolunu geciktirebilir.",
  keywords: ["gelenek", "bağlılık", "aile", "kutsallık", "uyum"],
  context: "Evlilik ihtimali güçlüdür; geleneksel yollarla desteklenecek.",
  group: "Majör Arkana"
},
{
  id: "the_lovers_ma_pos10",
  card: "The Lovers",
  position: 10,
  upright: "Aşıklar, güçlü bir sevgi bağı ve uyumla evliliğin mümkün olduğunu söyler. Doğru seçim sizi evliliğe götürür.",
  reversed: "Ters Aşıklar, kararsızlık ya da uyumsuzluk evliliğe engel olabilir.",
  keywords: ["aşk", "uyum", "bağ", "karar", "birlik"],
  context: "Evlilik kalpten yapılan bir seçimle gerçekleşecek.",
  group: "Majör Arkana"
},
{
  id: "the_chariot_ma_pos10",
  card: "The Chariot",
  position: 10,
  upright: "Savaş Arabası, odaklanma ve kararlılıkla evliliğe ulaşabileceğinizi gösterir.",
  reversed: "Ters Savaş Arabası, yönsüzlük veya çelişkiler evlilik sürecini yavaşlatabilir.",
  keywords: ["karar", "odak", "irade", "kontrol", "yön"],
  context: "Evlilik, odaklı ve bilinçli adımlarla mümkün olacak.",
  group: "Majör Arkana"
},
{
  id: "strength_ma_pos10",
  card: "Strength",
  position: 10,
  upright: "Güç, sabır, şefkat ve içsel dengeyle evliliğin gerçekleşebileceğini gösterir.",
  reversed: "Ters Güç, sabırsızlık, gurur ya da dengesizlik evlilik yolunu engelleyebilir.",
  keywords: ["sabır", "şefkat", "denge", "cesaret", "kararlılık"],
  context: "Evlilik, sabır ve şefkatle inşa edilecek.",
  group: "Majör Arkana"
},
{
  id: "the_hermit_ma_pos10",
  card: "The Hermit",
  position: 10,
  upright: "Ermiş, içsel keşif ve yalnızlık sürecinden sonra evlilik olasılığının güçleneceğini söyler.",
  reversed: "Ters Ermiş, aşırı içe kapanma evlilik yolunu erteleyebilir.",
  keywords: ["içe dönüş", "bilgelik", "arayış", "yalnızlık", "sabır"],
  context: "Evlilik ihtimali var, ancak içsel hazırlık sonrası gerçekleşecek.",
  group: "Majör Arkana"
},
{
  id: "wheel_of_fortune_ma_pos10",
  card: "Wheel of Fortune",
  position: 10,
  upright: "Kader Çarkı, evlilik şansının yüksek olduğunu, zamanın sizin için işlediğini gösterir.",
  reversed: "Ters Çark, kontrol dışı engeller ya da şanssızlık evlilik sürecini geciktirebilir.",
  keywords: ["kader", "şans", "zaman", "değişim", "döngü"],
  context: "Evlilik ihtimali vardır; doğru zamanda gerçekleşecektir.",
  group: "Majör Arkana"
},
{
  id: "justice_ma_pos10",
  card: "Justice",
  position: 10,
  upright: "Adalet, evlilik kararının adil, dengeli ve resmiyet kazanan bir birliktelik olacağını gösterir.",
  reversed: "Ters Adalet, dengesizlik ya da sorumluluk almaktan kaçınma evlilik yolunu engelleyebilir.",
  keywords: ["adalet", "denge", "karar", "sorumluluk", "resmiyet"],
  context: "Evlilik adil ve dengeli bir seçimle mümkün olacak.",
  group: "Majör Arkana"
},
{
  id: "the_hanged_man_ma_pos10",
  card: "The Hanged Man",
  position: 10,
  upright: "Asılan Adam, bakış açınızı değiştirip teslimiyetle ilerlediğinizde evlilik kapısı açılır.",
  reversed: "Ters Asılan Adam, kararsızlık ya da inatçılık evlilik yolunu geciktirebilir.",
  keywords: ["bakış açısı", "teslimiyet", "bekleme", "karar", "vizyon"],
  context: "Evlilik, farklı bir bakış açısıyla mümkün olacak.",
  group: "Majör Arkana"
},
{
  id: "death_ma_pos10",
  card: "Death",
  position: 10,
  upright: "Ölüm, bir dönemin kapanması ve yeni bir başlangıçla evlilik yolunun açılacağını söyler.",
  reversed: "Ters Ölüm, geçmişe tutunmak evliliği engelleyebilir.",
  keywords: ["dönüşüm", "bitiş", "yenilenme", "başlangıç", "değişim"],
  context: "Evlilik, dönüşüm sonrası gerçekleşecek.",
  group: "Majör Arkana"
},
{
  id: "temperance_ma_pos10",
  card: "Temperance",
  position: 10,
  upright: "Denge, sabır ve uyumla evliliğin mümkün olduğunu gösterir.",
  reversed: "Ters Denge, aşırılıklar ya da uyumsuzluk evlilik ihtimalini zayıflatabilir.",
  keywords: ["denge", "uyum", "sabır", "akış", "uyarlama"],
  context: "Evlilik, sabır ve uyumla kurulacak.",
  group: "Majör Arkana"
},
{
  id: "the_devil_ma_pos10",
  card: "The Devil",
  position: 10,
  upright: "Şeytan, bağımlılık veya güçlü bir tutkuya dayalı ilişkilerin evlilik yoluna girebileceğini gösterir.",
  reversed: "Ters Şeytan, bağımlılıklardan kurtulma ve özgürleşmeyle evlilik olasılığı artar.",
  keywords: ["bağımlılık", "tutku", "özgürleşme", "bağ", "gölge"],
  context: "Evlilik ihtimali vardır; özgür seçimlerle sağlıklı olur.",
  group: "Majör Arkana"
},
{
  id: "the_tower_ma_pos10",
  card: "The Tower",
  position: 10,
  upright: "Kule, ani gelişmeler ve köklü değişimlerle evlilik yoluna girilebileceğini işaret eder.",
  reversed: "Ters Kule, geciken krizler veya korkular evliliği zorlaştırabilir.",
  keywords: ["yıkım", "değişim", "kriz", "yeniden doğuş", "gerçek"],
  context: "Evlilik ihtimali vardır; köklü değişimden sonra gelir.",
  group: "Majör Arkana"
},
{
  id: "the_star_ma_pos10",
  card: "The Star",
  position: 10,
  upright: "Yıldız, umut, ilham ve şifa ile evlilik yolunun açık olduğunu gösterir.",
  reversed: "Ters Yıldız, umutsuzluk ya da hayal kırıklıkları evlilik yolunu geciktirebilir.",
  keywords: ["umut", "ilham", "şifa", "gelecek", "vizyon"],
  context: "Evlilik olasılığı güçlü; umutla destekleniyor.",
  group: "Majör Arkana"
},
{
  id: "the_moon_ma_pos10",
  card: "The Moon",
  position: 10,
  upright: "Ay, evlilik yolunda belirsizliklerin ve duygusal iniş çıkışların olabileceğini gösterir.",
  reversed: "Ters Ay, sisin dağılması ve gerçeklerin açığa çıkması evlilik yolunu netleştirir.",
  keywords: ["belirsizlik", "sezgi", "duygu", "yanılsama", "aydınlanma"],
  context: "Evlilik ihtimali vardır; netleşme sonrası mümkün olur.",
  group: "Majör Arkana"
},
{
  id: "the_sun_ma_pos10",
  card: "The Sun",
  position: 10,
  upright: "Güneş, mutluluk, uyum ve parlak bir gelecekle evliliğin kesinlikle mümkün olduğunu gösterir.",
  reversed: "Ters Güneş, yüzeysel mutluluk veya sahte sevinç evlilik sürecini gölgeleyebilir.",
  keywords: ["mutluluk", "umut", "uyum", "gelecek", "aile"],
  context: "Evlilik potansiyeli çok yüksek; sevinçle destekleniyor.",
  group: "Majör Arkana"
},
{
  id: "judgement_ma_pos10",
  card: "Judgement",
  position: 10,
  upright: "Mahkeme, geçmiş derslerden sonra yeniden doğuşla evliliğin mümkün olduğunu gösterir.",
  reversed: "Ters Mahkeme, öz eleştiri ya da geçmişe takılı kalmak evlilik yolunu engelleyebilir.",
  keywords: ["yeniden doğuş", "karar", "yüzleşme", "çağrı", "özgürleşme"],
  context: "Evlilik ihtimali vardır; geçmişi geride bırakmak şarttır.",
  group: "Majör Arkana"
},
{
  id: "the_world_ma_pos10",
  card: "The World",
  position: 10,
  upright: "Dünya, tamamlanma, başarı ve bütünlükle evliliğin kesin bir ihtimal olduğunu gösterir.",
  reversed: "Ters Dünya, eksik kalmışlık ya da yarım bırakılmış işler evlilik sürecini geciktirebilir.",
  keywords: ["tamamlanma", "bütünlük", "başarı", "döngü", "kutlama"],
  context: "Evlilik potansiyeli çok yüksek; tamamlanma enerjisi hakimdir.",
  group: "Majör Arkana"
},
// KUPALAR – 14 Kart //
 // KUPALAR
 {
 id: "ace_of_cups_ma_pos10",
 card: "Ace of Cups",
 position: 10,
 upright: "Kupa Ası, kalbin kapılarının açıldığını ve yeni, saf bir sevginin filizlenebileceğini söyler. Duygusal akışın başlaması evlilik niyetini destekler; teklif ve kutlama enerjisi yüksektir.",
 reversed: "Bastırılmış duygular veya şifa bekleyen kırgınlıklar evlilik kapısını ağırlaştırabilir. Önce kalbi arındırmak, sonra yeni bağa alan açmak gerekir.",
 keywords: ["yeni aşk", "duygusal açılış", "şifa", "yakınlık", "kutlama"],
 context: "Evlilik ihtimali güçlü; kalbin açık, akışın net olmalı.",
 group: "Kupalar"
},
{
 id: "two_of_cups_ma_pos10",
 card: "Two of Cups",
 position: 10,
 upright: "İki Kupa, karşılıklı çekim ve eşit alışverişle evliliğe çok elverişli bir birlikteliği gösterir. Niyetler uyuşursa söz birliğine ve resmi bir bağa kolayca evrilebilir.",
 reversed: "Karşılıklılıkta küçük bir dengesizlik veya yanlış anlaşılmalar evlilik hızını düşürebilir. Net sınırlar ve açık konuşmalar dengeyi geri getirir.",
 keywords: ["karşılıklılık", "uyum", "bağ", "söz", "denge"],
 context: "Evlilik potansiyeli yüksek; eşitlik ve net niyet şart.",
 group: "Kupalar"
},
{
 id: "three_of_cups_ma_pos10",
 card: "Three of Cups",
 position: 10,
 upright: "Üç Kupa, kutlama, yakın çevrenin desteği ve sevinçli buluşmalarla evlilik gündemini güçlendirir. Nişan/düğün gibi topluluk ritüellerine uygun bir atmosfer oluşur.",
 reversed: "Aşırı sosyallik, üçüncü kişilerin görüşleri veya yüzeysellik evlilik odağını dağıtabilir. İlişkinin özüne dönmek gerekir.",
 keywords: ["kutlama", "destek", "topluluk", "neşe", "ritüel"],
 context: "Evlilik yolu açık; doğru çevre ve sade odakla hızlanır.",
 group: "Kupalar"
},
{
 id: "four_of_cups_ma_pos10",
 card: "Four of Cups",
 position: 10,
 upright: "Dört Kupa, duygusal tatminsizlik ya da dalgınlık nedeniyle fırsatın yanından geçilebileceğini söyler. Şükran ve farkındalık artırılırsa evlilik seçeneği görünür olur.",
 reversed: "Uyanış ve yeniye açıklık artar; geçmiş hayal kırıklıkları çözülürse evlilik kapısı tekrar belirir.",
 keywords: ["tatminsizlik", "fırsat", "farkındalık", "şükran", "yenilenme"],
 context: "Evlilik olası; fırsatı görmek ve kalbi canlandırmak gerek.",
 group: "Kupalar"
},
{
 id: "five_of_cups_ma_pos10",
 card: "Five of Cups",
 position: 10,
 upright: "Beş Kupa, geçmiş kayıpların izinin bugünü gölgelediğini anlatır. Kalan iyiye dönülür ve affediş seçilirse evlilik yolu yeniden aydınlanır.",
 reversed: "Toparlanma ve kabulle umut yeşerir; yasın ardından atılan bilinçli adımlar evliliği mümkün kılar.",
 keywords: ["yas", "kayıp", "affediş", "umut", "toparlanma"],
 context: "Evlilik, geçmişten özgürleşmeyle mümkün olur.",
 group: "Kupalar"
},
{
 id: "six_of_cups_ma_pos10",
 card: "Six of Cups",
 position: 10,
 upright: "Altı Kupa, masum sevgi, geçmiş bağlantılar veya çocukluk uyumu taşıyan bir ilişkinin evliliğe varabileceğini söyler. Sıcak, güvenli bir bağ ön planda.",
 reversed: "Geçmişe aşırı tutunma bugünü kaçırabilir. Anıyı onurlandırıp şimdiyi kurmak evlilik şansını yükseltir.",
 keywords: ["nostalji", "masumiyet", "aidiyet", "geçmiş bağ", "güven"],
 context: "Evlilik sıcak ve tanıdık bir bağla gelebilir; şimdiye yer aç.",
 group: "Kupalar"
},
{
 id: "seven_of_cups_ma_pos10",
 card: "Seven of Cups",
 position: 10,
 upright: "Yedi Kupa, seçenek bolluğu ve hayal–gerçek bulanıklığının kararı geciktirebileceğini söyler. Net kriterler konursa evlilik yolu netleşir.",
 reversed: "Sis dağılır; gerçekçi seçimle evlilik ihtimali belirir. Kararsızlığı bırakmak gerekir.",
 keywords: ["seçenek", "hayal", "netlik", "karar", "vizyon"],
 context: "Evlilik için net seçim ve ölçüt belirle.",
 group: "Kupalar"
},
{
 id: "eight_of_cups_ma_pos10",
 card: "Eight of Cups",
 position: 10,
 upright: "Sekiz Kupa, eksik hissedilen döngüyü onurluca bırakıp daha derin bir gerçeğe yürümeyi anlatır. Bu cesaret, evliliğe layık bir birlikteliğe kapı açar.",
 reversed: "Git–kal ikilemi evlilik planını sallandırabilir. Kapanış ritüeli ve net yön, doğru kapıyı görünür kılar.",
 keywords: ["anlam arayışı", "kapanış", "yol", "cesaret", "yön"],
 context: "Evlilik; doğru yere yönelme cesaretiyle mümkün.",
 group: "Kupalar"
},
{
 id: "nine_of_cups_ma_pos10",
 card: "Nine of Cups",
 position: 10,
 upright: "Dokuz Kupa, dileklerin gerçekleşmesi ve kalpten memnuniyetle evlilik ihtimalini parlatır. Kişisel doyum paylaşılınca ortak kutlamaya dönüşür.",
 reversed: "Yüzeysel hazlar ya da tek taraflı konfor evlilik vizyonunu daraltabilir. Değer odaklı hedefler denge sağlar.",
 keywords: ["dilek", "tatmin", "bolluk", "şükran", "keyif"],
 context: "Evlilik şansı yüksek; değere yaslanan niyet şart.",
 group: "Kupalar"
},
{
 id: "ten_of_cups_ma_pos10",
 card: "Ten of Cups",
 position: 10,
 upright: "On Kupa, duygusal uyum, aile sıcaklığı ve uzun vadeli mutlulukla evliliğin güçlü bir olasılık olduğunu söyler. Birlikte ev hissi kurulur.",
 reversed: "İdeal tablo baskısı sahiciliği zayıflatabilir. Gerçekçi beklenti ve açık iletişimle evlilik zemini sağlamlaşır.",
 keywords: ["aile", "uyum", "mutluluk", "birlik", "uzun vade"],
 context: "Evlilik potansiyeli çok güçlü; sahicilikle besle.",
 group: "Kupalar"
},
{
 id: "page_of_cups_ma_pos10",
 card: "Page of Cups",
 position: 10,
 upright: "Kupa Prensi, nazik bir teklif, romantik haberler ve taze duygularla evlilik hayalini canlandırır. Yaratıcı, saf yaklaşım kapı aralar.",
 reversed: "Aşırı alınganlık veya kaçışkan tavır niyetleri flu bırakabilir. Duyguyu olgun, tutarlı ifadeye bağlamak gerekir.",
 keywords: ["teklif", "romantizm", "masumiyet", "ilham", "ifade"],
 context: "Evlilik için naif ama net adımlar at.",
 group: "Kupalar"
},
{
 id: "knight_of_cups_ma_pos10",
 card: "Knight of Cups",
 position: 10,
 upright: "Kupa Şövalyesi, romantik bir yaklaşım ve zarif jestlerle evlilik teklifine giden yolu gösterir. İdeal duygular pratik planla buluşursa süreç hızlanır.",
 reversed: "Tutarsız vaatler veya aşırı idealizasyon hayal kırıklığı yaratabilir. Söylem–eylem uyumu elzemdir.",
 keywords: ["romantizm", "jest", "teklif", "idealler", "tutarlılık"],
 context: "Evlilik için romantizm + plan uyumu gerekli.",
 group: "Kupalar"
},
{
 id: "queen_of_cups_ma_pos10",
 card: "Queen of Cups",
 position: 10,
 upright: "Kupa Kraliçesi, derin empati ve duygusal güvenle evliliğin yeşerebileceğini söyler. Şefkatli alan tutmak resmi bağa cesaret verir.",
 reversed: "Sınır erimesi ya da duygusal manipülasyon güvensizlik yaratır. Öz bakım ve net sınırlar evlilik zeminini temizler.",
 keywords: ["empati", "güven", "şefkat", "sınır", "derin bağ"],
 context: "Evlilik; güvenli, şefkatli bir sarmalda büyür.",
 group: "Kupalar"
},
{
  id: "king_of_cups_ma_pos10",
  card: "King of Cups",
  position: 10,
  upright: "Kupa Kralı, duygusal olgunluk ve sakin liderlikle evlilik kararını taşıyabileceğinizi gösterir. Krizlerde merkezde kalmak resmi adımı kolaylaştırır.",
  reversed: "Bastırılmış öfke ya da pasif–agresif dalga evlilik güvenini aşındırabilir. Açık ve dengeli ifade şarttır.",
  keywords: ["olgunluk", "sükunet", "duygu yönetimi", "güven", "liderlik"],
  context: "Evlilik; olgun duygu yönetimiyle mümkün ve sağlam.",
  group: "Kupalar"
},

// ==== SWORDS (Kılıçlar) ====
{
  id: "ace_of_swords_ma_pos10",
  card: "Ace of Swords",
  position: 10,
  upright: "Kılıç Ası, evlilik konusunda netlik ve doğru kararların kapıda olduğunu gösterir. Gerçeği görmek ve kararlılık evlilik yolunu açar.",
  reversed: "Belirsizlik, yanlış iletişim veya kafa karışıklığı evliliğin netleşmesini geciktirebilir. İletişimi sadeleştirmek gerekir.",
  keywords: ["netlik", "karar", "hakikat", "iletişim", "başlangıç"],
  context: "Evlilik ihtimali güçlü; net karar ve dürüst iletişim şart.",
  group: "Kılıçlar"
},
{
  id: "two_of_swords_ma_pos10",
  card: "Two of Swords",
  position: 10,
  upright: "İki Kılıç, evlilikle ilgili ikilem ve karar verme zorluğunu gösterir. Kalp ile zihin uyum sağladığında evlilik yolu netleşir.",
  reversed: "Karar erteleme ve yüzleşmeden kaçış evliliğin gelişimini yavaşlatabilir. Doğrudan konulara eğilmek gerekir.",
  keywords: ["ikilem", "karar", "denge", "yüzleşme", "kararsızlık"],
  context: "Evlilik kararı için kalp–zihin dengesi kurulmalı.",
  group: "Kılıçlar"
},
{
  id: "three_of_swords_ma_pos10",
  card: "Three of Swords",
  position: 10,
  upright: "Üç Kılıç, geçmiş kırgınlıkların evlilik kararını gölgeleyebileceğini söyler. Şifa ve affedişle bu bağ resmi adımlara taşınabilir.",
  reversed: "İyileşme ve kalp onarımı sürecindesiniz; bu da evliliğe daha açık bir yol yaratır.",
  keywords: ["kırgınlık", "yas", "gerçek", "iyileşme", "ifade"],
  context: "Evlilik, kalp yaraları onarıldığında güçlenir.",
  group: "Kılıçlar"
},
{
  id: "four_of_swords_ma_pos10",
  card: "Four of Swords",
  position: 10,
  upright: "Dört Kılıç, evlilik konusunun dinginlik ve planlama aşamasında olduğunu söyler. Mola vermek ve net düşünmek uzun vadeli adımları kolaylaştırır.",
  reversed: "Dinlenmeden kaçmak ya da telaş evliliğe dair netliği engeller. Zihin ve kalbin toparlanması gerekir.",
  keywords: ["dinlenme", "strateji", "sükunet", "planlama", "toparlanma"],
  context: "Evlilik süreci için sakin planlama zamanı.",
  group: "Kılıçlar"
},
{
  id: "five_of_swords_ma_pos10",
  card: "Five of Swords",
  position: 10,
  upright: "Beş Kılıç, çatışmalar ve ego savaşlarının evlilik yolunu zedeleyebileceğini işaret eder. Haklılık yerine bağa odaklanmak gerekir.",
  reversed: "Onarım ve affedişle evliliğin önü açılır. Ego değil, işbirliği kazanır.",
  keywords: ["çatışma", "ego", "haklılık", "onarım", "gerilim"],
  context: "Evlilik için bağın korunması haklılıktan önemli.",
  group: "Kılıçlar"
},
{
  id: "six_of_swords_ma_pos10",
  card: "Six of Swords",
  position: 10,
  upright: "Altı Kılıç, zorlukları aşarak daha huzurlu bir döneme geçişi gösterir. Bu süreç evliliğe doğru ilerlemeyi kolaylaştırır.",
  reversed: "Geçmiş bağlardan tam kopamamak evlilik adımını geciktirebilir. Destek almak faydalı olur.",
  keywords: ["geçiş", "sükunet", "rota", "uzaklaşma", "yenilik"],
  context: "Evlilik; huzurlu geçiş ve yeni rota ile mümkün.",
  group: "Kılıçlar"
},
{
  id: "seven_of_swords_ma_pos10",
  card: "Seven of Swords",
  position: 10,
  upright: "Yedi Kılıç, evlilik sürecinde dürüstlük ve netlik ihtiyacını vurgular. Açık niyetle hareket etmek güveni artırır.",
  reversed: "Yarım gerçekler veya kendini aldatma evliliği zorlaştırabilir. Şeffaflık zorunludur.",
  keywords: ["strateji", "dürüstlük", "gizlilik", "güven", "plan"],
  context: "Evlilik için açık niyet ve şeffaflık şart.",
  group: "Kılıçlar"
},
{
  id: "eight_of_swords_ma_pos10",
  card: "Eight of Swords",
  position: 10,
  upright: "Sekiz Kılıç, evliliğe dair kendi düşünce kalıplarınla sıkıştığını gösterir. İnançları sorgulamak özgürleşmeyi sağlar.",
  reversed: "Çözülmeler başlıyor; özgürleşme adımları evlilik ihtimalini güçlendiriyor.",
  keywords: ["kısıtlılık", "zihin tuzağı", "özgürleşme", "korku", "inanç"],
  context: "Evlilik için kısıtlı inançları bırakma zamanı.",
  group: "Kılıçlar"
},
{
  id: "nine_of_swords_ma_pos10",
  card: "Nine of Swords",
  position: 10,
  upright: "Dokuz Kılıç, kaygı ve endişelerin evlilik ihtimalini gölgelediğini anlatır. Gerçekle yüzleşmek huzur getirir.",
  reversed: "Kaygılar çözülmeye başlar; umut ışığı yeniden görünür.",
  keywords: ["kaygı", "endişe", "karabasan", "gerçeklik", "yüzleşme"],
  context: "Evlilik için kaygıları çözmek şart.",
  group: "Kılıçlar"
},
{
  id: "ten_of_swords_ma_pos10",
  card: "Ten of Swords",
  position: 10,
  upright: "On Kılıç, bir döngünün sona erdiğini ve yeni bir başlangıca zemin hazırlandığını gösterir. Kapanış evliliğe yeni alan açar.",
  reversed: "Toparlanma ve yeniden doğuş enerjisi artıyor; evlilik için yeni sayfa açılabilir.",
  keywords: ["bitiş", "teslimiyet", "yeniden doğuş", "şifa", "kapanış"],
  context: "Evlilik için eski döngüleri kapatmak gerek.",
  group: "Kılıçlar"
},
{
  id: "page_of_swords_ma_pos10",
  card: "Page of Swords",
  position: 10,
  upright: "Kılıç Prensi, merak ve iletişimle evlilik ihtimalini araştırma aşamasında olduğunuzu gösterir. Öğrenmek ve konuşmak yön verir.",
  reversed: "Dedikodu, yanlış bilgi veya acele yargı evlilik yolunu bulandırabilir. Kaynakları doğrulamak gerek.",
  keywords: ["merak", "öğrenme", "iletişim", "gözlem", "doğruluk"],
  context: "Evlilik; açık iletişim ve öğrenmeyle güçlenir.",
  group: "Kılıçlar"
},
{
  id: "knight_of_swords_ma_pos10",
  card: "Knight of Swords",
  position: 10,
  upright: "Kılıç Şövalyesi, hızlı karar ve atak girişimlerle evliliğe doğru bir ivme yaratır. Ancak sabır ve strateji şarttır.",
  reversed: "Acelecilik ve sert üslup evliliği zedeleyebilir. Nefes almak ve süreci yumuşatmak gerekir.",
  keywords: ["hız", "atak", "kararlılık", "strateji", "iletişim"],
  context: "Evlilik için hız + sabır dengesi gerekir.",
  group: "Kılıçlar"
},
{
  id: "queen_of_swords_ma_pos10",
  card: "Queen of Swords",
  position: 10,
  upright: "Kılıç Kraliçesi, nesnel bakış, dürüstlük ve sınırlarla evlilik kararını sağlıklı verir. Netlik güveni büyütür.",
  reversed: "Aşırı eleştiri veya soğukluk evlilik sürecini zorlaştırabilir. Şefkatle denge kurmak önemli.",
  keywords: ["netlik", "sınır", "adalet", "iletişim", "bilgelik"],
  context: "Evlilik için netlik ve şefkatli ifade gerekli.",
  group: "Kılıçlar"
},
{
  id: "king_of_swords_ma_pos10",
  card: "King of Swords",
  position: 10,
  upright: "Kılıç Kralı, stratejik akıl, adalet ve otoriteyle evlilik kararının sağlam alınabileceğini gösterir. Mantık ve etik güçlüdür.",
  reversed: "Katı tutumlar veya dogmatik bakış açısı evliliği zorlaştırabilir. Empatiyi dahil etmek gerekir.",
  keywords: ["strateji", "otorite", "mantık", "adalet", "empati"],
  context: "Evlilik için mantık ve etik uyumu şart.",
  group: "Kılıçlar"
},

// TILSIMLAR
{
  id: "ace_of_pentacles_ma_pos10",
  card: "Ace of Pentacles",
  position: 10,
  upright: "Tılsım Ası, evliliğin güçlü ve somut bir temele oturma potansiyelini gösterir. Yeni başlangıç için fırsatlar ve bolluk kapıları açılıyor.",
  reversed: "Fırsatların kaçırılması veya güvensizlikler evlilik yolunu zorlaştırabilir. İstikrarı kurmak için dikkatli adımlar atılmalı.",
  keywords: ["başlangıç", "fırsat", "güvenlik", "bolluk", "temel"],
  context: "Evlilik için somut fırsatlar doğuyor, sağlam adımlar gerekli.",
  group: "Tılsımlar"
},
{
  id: "two_of_pentacles_ma_pos10",
  card: "Two of Pentacles",
  position: 10,
  upright: "İki Tılsım, evlilik sürecinde denge ve uyum arayışını vurgular. Sorumlulukları dengelemek evliliği mümkün kılar.",
  reversed: "Dengesizlik ve ertelemeler evliliğe dair ilerlemeyi geciktirebilir. Net öncelik belirlemek şarttır.",
  keywords: ["denge", "uyum", "sorumluluk", "esneklik", "öncelik"],
  context: "Evlilik için sorumluluk dengesi kritik.",
  group: "Tılsımlar"
},
{
  id: "three_of_pentacles_ma_pos10",
  card: "Three of Pentacles",
  position: 10,
  upright: "Üç Tılsım, evlilik için işbirliği ve ortak çabaların başarı getireceğini gösterir. Ortak değerler üzerine inşa edilen bir bağ güçlenir.",
  reversed: "Uyumsuzluk ve işbirliği eksikliği evliliği zorlaştırabilir. Rolleri netleştirmek önemlidir.",
  keywords: ["işbirliği", "ortaklık", "değerler", "inşa", "başarı"],
  context: "Evlilik için işbirliği ve değer ortaklığı şart.",
  group: "Tılsımlar"
},
{
  id: "four_of_pentacles_ma_pos10",
  card: "Four of Pentacles",
  position: 10,
  upright: "Dört Tılsım, güvenlik ve sahiplenme isteğiyle evlilik ihtimalini gösterir. Sağlam bir temel üzerine kurulan bağ kalıcı olabilir.",
  reversed: "Aşırı kontrol ve bırakmama hali evlilik sürecini zorlaştırabilir. Esneklik öğrenilmeli.",
  keywords: ["güvenlik", "sahiplenme", "istikrar", "koruma", "kontrol"],
  context: "Evlilik için güvenlik ve esneklik dengelenmeli.",
  group: "Tılsımlar"
},
{
  id: "five_of_pentacles_ma_pos10",
  card: "Five of Pentacles",
  position: 10,
  upright: "Beş Tılsım, maddi ya da manevi zorlukların evlilik yolunda kaygı yaratabileceğini gösterir. Ancak destek ve dayanışma bu engeli aşar.",
  reversed: "Toparlanma ve güçlenme süreci evliliğe doğru kapı açar. Zorluklar geride bırakılıyor.",
  keywords: ["zorluk", "kaygı", "destek", "dayanışma", "iyileşme"],
  context: "Evlilik için destekle zorluklar aşılır.",
  group: "Tılsımlar"
},
{
  id: "six_of_pentacles_ma_pos10",
  card: "Six of Pentacles",
  position: 10,
  upright: "Altı Tılsım, evlilikte adil paylaşım ve karşılıklı destekle güçlü bir birliktelik kurabileceğinizi gösterir.",
  reversed: "Güç dengesizlikleri veya koşullu alışveriş evliliği zorlaştırabilir. Şeffaflık önemlidir.",
  keywords: ["paylaşım", "adalet", "denge", "destek", "şeffaflık"],
  context: "Evlilik için adil denge şarttır.",
  group: "Tılsımlar"
},
{
  id: "seven_of_pentacles_ma_pos10",
  card: "Seven of Pentacles",
  position: 10,
  upright: "Yedi Tılsım, sabır ve uzun vadeli çaba ile evliliğin gerçekleşebileceğini söyler. Emek verildiğinde sonuç alınır.",
  reversed: "Sabırsızlık ve yanlış yatırım evlilik yolunu zorlaştırabilir. Zamanın değerini bilmek gerekir.",
  keywords: ["sabır", "emek", "yatırım", "bekleyiş", "uzun vadeli"],
  context: "Evlilik için sabırlı çaba şart.",
  group: "Tılsımlar"
},
{
  id: "eight_of_pentacles_ma_pos10",
  card: "Eight of Pentacles",
  position: 10,
  upright: "Sekiz Tılsım, sürekli emek ve özenle evliliğin mümkün olduğunu gösterir. Kaliteli bağ çalışmayla kurulur.",
  reversed: "İlgisizlik ya da özensizlik evlilik yolunu zayıflatır. Düzenli çaba gerekir.",
  keywords: ["çaba", "emek", "özen", "öğrenme", "ustalık"],
  context: "Evlilik için düzenli emek şarttır.",
  group: "Tılsımlar"
},
{
  id: "nine_of_pentacles_ma_pos10",
  card: "Nine of Pentacles",
  position: 10,
  upright: "Dokuz Tılsım, bireysel bağımsızlık ve öz değer duygusunun evliliği güçlendireceğini söyler. Sağlam bireyler güçlü birliktelik kurar.",
  reversed: "Aşırı bağımlılık ya da savurganlık evliliği zayıflatabilir. Öz disiplin gerekir.",
  keywords: ["bağımsızlık", "öz değer", "refah", "özgüven", "denge"],
  context: "Evlilik için bağımsızlık + paylaşım dengesi şart.",
  group: "Tılsımlar"
},
{
  id: "ten_of_pentacles_ma_pos10",
  card: "Ten of Pentacles",
  position: 10,
  upright: "On Tılsım, uzun vadeli istikrar ve aile bağlarıyla güçlü bir evlilik olasılığını gösterir. Kalıcı mutluluk mümkündür.",
  reversed: "Ailevi sorunlar veya maddi çatışmalar evliliği zorlaştırabilir. Açık iletişimle çözülebilir.",
  keywords: ["istikrar", "aile", "miras", "gelenek", "uzun vadeli"],
  context: "Evlilik için kalıcı yapı gündemde.",
  group: "Tılsımlar"
},
{
  id: "page_of_pentacles_ma_pos10",
  card: "Page of Pentacles",
  position: 10,
  upright: "Tılsım Prensi, evlilik yolunda öğrenme ve yeni fırsatları deneme sürecini gösterir. Küçük adımlar büyük başlangıçlar yaratır.",
  reversed: "Dağınık enerji veya erteleme evliliğe gidişi geciktirebilir. Somut adımlar şarttır.",
  keywords: ["öğrenme", "fırsat", "başlangıç", "deneme", "adım"],
  context: "Evlilik için öğrenme + somut adımlar gerekli.",
  group: "Tılsımlar"
},
{
  id: "knight_of_pentacles_ma_pos10",
  card: "Knight of Pentacles",
  position: 10,
  upright: "Tılsım Şövalyesi, sabırlı ve istikrarlı adımlarla evliliğin gerçekleşebileceğini gösterir. Yavaş ama emin ilerleyiş başarı getirir.",
  reversed: "Aşırı durağanlık veya inat evlilik yolunu zorlaştırabilir. Esneklik katmak gerek.",
  keywords: ["istikrar", "sabır", "emek", "güvenilirlik", "süreklilik"],
  context: "Evlilik için sabırlı ve istikrarlı yol şart.",
  group: "Tılsımlar"
},
{
  id: "queen_of_pentacles_ma_pos10",
  card: "Queen of Pentacles",
  position: 10,
  upright: "Tılsım Kraliçesi, şefkat, sorumluluk ve pratiklik ile evliliğin sıcak bir yuva yaratabileceğini gösterir.",
  reversed: "Aşırı yüklenme veya öz bakım eksikliği evlilikte sorun çıkarabilir. Dengeye ihtiyaç vardır.",
  keywords: ["şefkat", "sorumluluk", "pratiklik", "yuva", "denge"],
  context: "Evlilik için şefkat ve pratiklik birleşmeli.",
  group: "Tılsımlar"
},
{
  id: "king_of_pentacles_ma_pos10",
  card: "King of Pentacles",
  position: 10,
  upright: "Tılsım Kralı, güvenlik, istikrar ve sorumlulukla evliliğin güçlü bir şekilde mümkün olduğunu gösterir. Sağlam temeller başarı getirir.",
  reversed: "Aşırı kontrol veya statü odaklılık evlilik yolunu gölgeleyebilir. Paylaşım dengesine ihtiyaç var.",
  keywords: ["güvenlik", "istikrar", "liderlik", "sorumluluk", "paylaşım"],
  context: "Evlilik için güçlü ve güvenli temel mevcut.",
  group: "Tılsımlar"
},

// ASALAR
{
  id: "ace_of_wands_ma_pos10",
  card: "Ace of Wands",
  position: 10,
  upright: "Değnek Ası, evliliğe doğru güçlü bir başlangıç enerjisi getirir. Tutku ve istek birleşerek yeni bir kapı açabilir.",
  reversed: "İlham eksikliği veya kararsızlık evliliğin başlamasını geciktirebilir. Küçük bir adım ateşi yakacaktır.",
  keywords: ["başlangıç", "ilham", "tutku", "fırsat", "hareket"],
  context: "Evlilik için güçlü bir istek ve yeni başlangıç gündemde.",
  group: "Asalar"
},
{
  id: "two_of_wands_ma_pos10",
  card: "Two of Wands",
  position: 10,
  upright: "İki Değnek, evlilik için planlama ve geleceğe yönelik vizyonu işaret eder. İlişki bir sonraki adıma taşınabilir.",
  reversed: "Kararsızlık ve konfor alanından çıkamama evliliği geciktirebilir. Cesaretle vizyonu büyütmek gerek.",
  keywords: ["vizyon", "planlama", "gelecek", "karar", "cesaret"],
  context: "Evlilik için vizyon ve cesaretli planlama gerekiyor.",
  group: "Asalar"
},
{
  id: "three_of_wands_ma_pos10",
  card: "Three of Wands",
  position: 10,
  upright: "Üç Değnek, ufkunuzun genişlediğini ve evlilik için fırsatların yakın olduğunu gösterir. Bekleyişin ardından adımlar hızlanır.",
  reversed: "Gecikmeler veya dar bakış açısı evliliği yavaşlatabilir. Planı revize etmek faydalıdır.",
  keywords: ["ufuk", "fırsat", "genişleme", "bekleyiş", "vizyon"],
  context: "Evlilik için fırsatlar yaklaşmakta, vizyonu geniş tutmak gerek.",
  group: "Asalar"
},
{
  id: "four_of_wands_ma_pos10",
  card: "Four of Wands",
  position: 10,
  upright: "Dört Değnek, kutlama ve birlik enerjisiyle evliliğin mümkün olduğunu gösterir. Güçlü bir yuva temeli var.",
  reversed: "Düzensizlik veya yarım kalmışlık evlilik planlarını zorlaştırabilir. Ritüeller ve istikrar süreci destekler.",
  keywords: ["kutlama", "birlik", "yuva", "istikrar", "temel"],
  context: "Evlilik için sağlam yuva ve kutlama enerjisi var.",
  group: "Asalar"
},
{
  id: "five_of_wands_ma_pos10",
  card: "Five of Wands",
  position: 10,
  upright: "Beş Değnek, evlilik yolunda küçük çatışmalar ve rekabeti işaret eder. Sağlıklı diyalogla bu süreç aşılabilir.",
  reversed: "Bastırılmış gerilim evliliği zedeleyebilir. Açık iletişimle çözüm aranmalı.",
  keywords: ["çatışma", "rekabet", "diyalog", "gerilim", "farklılık"],
  context: "Evlilik için çatışmaların sağlıklı yönetimi şart.",
  group: "Asalar"
},
{
  id: "six_of_wands_ma_pos10",
  card: "Six of Wands",
  position: 10,
  upright: "Altı Değnek, başarı ve tanınma enerjisiyle evlilik yolunun açık olduğunu gösterir. Çabanızın karşılığını alacaksınız.",
  reversed: "Tanınma eksikliği veya yetersizlik algısı evlilik sürecini zorlaştırabilir. Küçük başarılar kutlanmalı.",
  keywords: ["başarı", "tanınma", "motivasyon", "zafer", "ilerleme"],
  context: "Evlilik için başarı ve kutlama enerjisi güçlü.",
  group: "Asalar"
},
{
  id: "seven_of_wands_ma_pos10",
  card: "Seven of Wands",
  position: 10,
  upright: "Yedi Değnek, evlilik yolunda pozisyonunuzu koruma ve bağlılıkla mücadele etme ihtiyacını gösterir. Azim başarı getirir.",
  reversed: "Yorgunluk veya savunmacı tavır evliliğe dair ilerlemeyi engelleyebilir. Destek almak faydalıdır.",
  keywords: ["azim", "savunma", "kararlılık", "mücadele", "tutarlılık"],
  context: "Evlilik için azim ve kararlılıkla ilerlemek gerek.",
  group: "Asalar"
},
{
  id: "eight_of_wands_ma_pos10",
  card: "Eight of Wands",
  position: 10,
  upright: "Sekiz Değnek, hızlı gelişmeler ve haberlerin evliliğe doğru yol açtığını gösterir. Süreç hızlanıyor.",
  reversed: "Gecikmeler ve yanlış anlaşılmalar evlilik yolunu zorlaştırabilir. Sabırla sıralama yapılmalı.",
  keywords: ["hız", "iletişim", "haber", "gelişme", "akış"],
  context: "Evlilik için hızlı gelişmeler kapıda.",
  group: "Asalar"
},
{
  id: "nine_of_wands_ma_pos10",
  card: "Nine of Wands",
  position: 10,
  upright: "Dokuz Değnek, evlilik yolunda dayanıklılık ve son aşamaya yaklaşıldığını gösterir. Sabırla direnenler başarıya ulaşır.",
  reversed: "Tükenmişlik ve pes etme eğilimi evlilik planlarını zedeleyebilir. Destekle devam etmek gerekir.",
  keywords: ["dayanıklılık", "sabır", "koruma", "direnç", "tamamlama"],
  context: "Evlilik için son aşama, sabırla güçlenmek gerek.",
  group: "Asalar"
},
{
  id: "ten_of_wands_ma_pos10",
  card: "Ten of Wands",
  position: 10,
  upright: "On Değnek, sorumlulukların ağırlığına rağmen evliliğin mümkün olduğunu gösterir. Yük paylaşılırsa başarı gelir.",
  reversed: "Aşırı yüklenmek evliliği zorlaştırabilir. Sadeleşme ve paylaşım şarttır.",
  keywords: ["sorumluluk", "yük", "tamamlama", "dayanıklılık", "çaba"],
  context: "Evlilik için yük paylaşımı önemli.",
  group: "Asalar"
},
{
  id: "page_of_wands_ma_pos10",
  card: "Page of Wands",
  position: 10,
  upright: "Değnek Prensi, merak ve keşif enerjisiyle evliliğe dair yeni adımların yakın olduğunu gösterir. Cesur adım atılmalı.",
  reversed: "Dağınıklık veya kararsızlık evlilik yolunu zorlaştırabilir. Hedefe odaklanmak gerek.",
  keywords: ["keşif", "merak", "cesaret", "adım", "öğrenme"],
  context: "Evlilik için cesur adım ve keşif zamanı.",
  group: "Asalar"
},
{
  id: "knight_of_wands_ma_pos10",
  card: "Knight of Wands",
  position: 10,
  upright: "Değnek Şövalyesi, tutku ve cesaretle evlilik yolunda hızlı ilerleme sağlayabilir. Enerji çok yüksek.",
  reversed: "Savrukluk veya acelecilik evliliği zorlaştırabilir. İstikrarla ilerlemek gerekir.",
  keywords: ["cesaret", "tutku", "hız", "kararlılık", "atılım"],
  context: "Evlilik için tutkulu ve dengeli ilerleme gerekiyor.",
  group: "Asalar"
},
{
  id: "queen_of_wands_ma_pos10",
  card: "Queen of Wands",
  position: 10,
  upright: "Değnek Kraliçesi, karizma ve sıcak enerjiyle evliliğin mümkün olduğunu gösterir. Liderlik ve güven evliliği güçlendirir.",
  reversed: "Kıskançlık veya güvensizlik evlilik yolunu gölgeleyebilir. Öz güven şarttır.",
  keywords: ["karizma", "güven", "liderlik", "tutku", "denge"],
  context: "Evlilik için güven ve sıcak enerji önemli.",
  group: "Asalar"
},
{
  id: "king_of_wands_ma_pos10",
  card: "King of Wands",
  position: 10,
  upright: "Değnek Kralı, vizyon ve kararlılıkla evliliğin gerçekleşebileceğini gösterir. Güçlü liderlik sağlam temel kurar.",
  reversed: "Aşırı otoriterlik veya ego evlilik sürecini zorlaştırabilir. Dinlemek ve paylaşmak gerekir.",
  keywords: ["vizyon", "liderlik", "kararlılık", "tutku", "güç"],
  context: "Evlilik için vizyon ve güçlü kararlılık gerekiyor.",
  group: "Asalar"
},
];

// Kart adına göre pozisyon 10 anlamını bulma fonksiyonu
export const getposition10Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return position10Meanings.find(
    meaning => meaning.card === cardName
  );
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getmarriageposition10Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return getposition10Meaning(cardName);
};

// Kart adına göre pozisyon 10 anlamını bulma fonksiyonu (ana index için)
export const getmarriageposition10MeaningByCardName = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  const meaning = getposition10Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 10 anlamlarını alma fonksiyonu
export const getAllposition10Meanings = (): MarriagePositionMeaning[] => {
  return position10Meanings;
};

// pozisyon 10 anlamlarını filtreleme fonksiyonu
export const getposition10MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return position10Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 10 anlamlarını arama
export const searchposition10MeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
  return position10Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position10Meanings,
  getposition10Meaning,
  getAllposition10Meanings,
  getposition10MeaningsByGroup,
  searchposition10MeaningsByKeyword,
};
