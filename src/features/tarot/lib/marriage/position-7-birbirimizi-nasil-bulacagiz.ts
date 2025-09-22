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
- position7Meanings: gerekli
- getposition7Meaning: gerekli
*/

import { MarriagePositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position7Meanings: MarriagePositionMeaning[] = [
 // ========== MAJÖR ARKANA (22) ==========
 {
  id: 'the_fool_ma_pos7',
  card: 'The Fool',
  position: 7,
  upright:
    'Deli, tanışmanızın spontane ve beklenmedik bir anda gerçekleşeceğini söyler. Doğallığınız ve akışa bırakma tavrınız, sizi birbirinize çekecek. Karşılaşmanız sürpriz ve hafif bir enerjiyle gelecektir.',
  reversed:
    'Ters Deli, karşılaşmanızın aceleci ya da dikkatsiz bir ortamda olabileceğini gösterir. Başta ciddiyetsiz gibi görünen bir buluşma zamanla anlam kazanabilir. Ön yargısız yaklaşmak önemlidir.',
  keywords: ['başlangıç', 'tesadüf', 'doğallık', 'hafiflik', 'akış'],
  context:
    'Tanışmanız sürprizli, hafif ve akışın içinde gerçekleşebilir. İlk izlenim aceleci olsa da derinleşebilir.',
  group: 'Majör Arkana',
},
{
  id: 'the_magician_ma_pos7',
  card: 'The Magician',
  position: 7,
  upright:
    'Büyücü, iletişim gücünüz ve çekiciliğiniz sayesinde birbirinizi bulacağınızı gösterir. Sözleriniz ve enerjiniz, tanışmanızı özel kılacak. Bir konuşma ya da ortak proje sizi yakınlaştırabilir.',
  reversed:
    'Ters Büyücü, yanlış anlaşılmalar ya da aldatıcı enerjilerle başlayan bir tanışmayı işaret eder. Başta netlik eksik olabilir, ama zamanla gerçek niyetler ortaya çıkar. Sabır ve açıklık süreci kolaylaştırır.',
  keywords: ['iletişim', 'çekim', 'proje', 'bağlantı', 'samimiyet'],
  context:
    'Tanışma iletişim üzerinden olacak. Açıklık ve samimiyet bağı güçlendirir.',
  group: 'Majör Arkana',
},
{
  id: 'the_high_priestess_ma_pos7',
  card: 'The High Priestess',
  position: 7,
  upright:
    'Başrahibe, tanışmanızın derin bir sezgi ya da ruhsal bağ üzerinden olabileceğini söyler. Birbirinizi hislerle tanıyacak, kelimelerden çok enerjiyle bağ kuracaksınız.',
  reversed:
    'Ters Başrahibe, tanışmada gizlilik veya belirsizlik olabilir. Başlangıçta birbirinize tam açılmakta zorlanabilirsiniz. Zamanla güven oluştuğunda bağ derinleşir.',
  keywords: ['sezgi', 'ruh bağı', 'giz', 'hissetmek', 'enerji'],
  context:
    'Tanışma güçlü bir içsel sezgiyle gerçekleşebilir. Zamanla açıklık bağınızı güçlendirecek.',
  group: 'Majör Arkana',
},
{
  id: 'the_empress_ma_pos7',
  card: 'The Empress',
  position: 7,
  upright:
    'İmparatoriçe, tanışmanızın şefkat, sıcaklık ve doğal bir ortamda olacağını söyler. Aile, dostlar ya da doğayla ilgili bir etkinlik sizi buluşturabilir. Samimi bir atmosfer bağınızı besler.',
  reversed:
    'Ters İmparatoriçe, tanışmada aşırı sahiplenme ya da beklenti enerjisi olabilir. Başta fazla duygusallık sizi zorlayabilir. Denge ve sakinlik buluşmayı kolaylaştırır.',
  keywords: ['şefkat', 'sıcaklık', 'doğa', 'aile', 'yakınlık'],
  context:
    'Tanışma sıcak, samimi ve besleyici bir ortamda gerçekleşebilir. Duyguların dengesi önemlidir.',
  group: 'Majör Arkana',
},
{
  id: 'the_emperor_ma_pos7',
  card: 'The Emperor',
  position: 7,
  upright:
    'İmparator, tanışmanızın ciddi ve düzenli bir ortamda olacağını söyler. İş, eğitim ya da resmi bir süreç sizi bir araya getirebilir. Güven ve istikrar tanışmanızı güçlendirecektir.',
  reversed:
    'Ters İmparator, tanışmanızda katılık ya da kontrolcü bir hava olabilir. İlk başta resmiyet mesafe yaratabilir. Zamanla yumuşayan bir bağ kurmanız mümkün.',
  keywords: ['ciddiyet', 'iş', 'düzen', 'istikrar', 'resmiyet'],
  context:
    'Tanışma ciddi ve düzenli bir ortamda olabilir. Zamanla samimiyet artar.',
  group: 'Majör Arkana',
},
{
  id: 'the_hierophant_ma_pos7',
  card: 'The Hierophant',
  position: 7,
  upright:
    'Aziz, tanışmanızın geleneksel veya sosyal bir bağlamda olacağını işaret eder. Bir kurs, dini veya toplumsal bir organizasyon sizi yakınlaştırabilir.',
  reversed:
    'Ters Aziz, tanışmanızda farklı inanç veya değer sistemleri öne çıkabilir. Başta uyumsuzluk gibi görünse de bu farklılıklar sizi birbirinize çekebilir.',
  keywords: ['gelenek', 'toplum', 'öğreti', 'uyum', 'değerler'],
  context:
    'Tanışma geleneksel veya sosyal bağlamda gerçekleşebilir. Farklı değerler sizi sınayabilir ama bağ kurabilir.',
  group: 'Majör Arkana',
},
{
  id: 'the_lovers_ma_pos7',
  card: 'The Lovers',
  position: 7,
  upright:
    'Aşıklar, tanışmanızın kalpten bir seçimle olacağını söyler. Doğru zamanda birbirinizi seçerek buluşacaksınız. Ortak değerleriniz sizi hızla yakınlaştırır.',
  reversed:
    'Ters Aşıklar, tanışmanızda kararsızlık ya da üçüncü kişiler etkili olabilir. Net bir seçim yapılmadıkça bağınız ilerlemekte zorlanabilir.',
  keywords: ['seçim', 'değerler', 'uyum', 'çekim', 'yakınlık'],
  context:
    'Tanışma kalpten bir seçimle olur. Kararsızlık süreci zorlaştırabilir.',
  group: 'Majör Arkana',
},
{
  id: 'the_chariot_ma_pos7',
  card: 'The Chariot',
  position: 7,
  upright:
    'Savaş Arabası, tanışmanızın hareket ve yolculuk üzerinden olacağını gösterir. Seyahat, taşınma veya ortak bir hedef sizi buluşturabilir.',
  reversed:
    'Ters Savaş Arabası, tanışmanızda yönsüzlük ya da karşıtlıklar olabilir. Farklı hedefler başta mesafe yaratabilir ama uyumla aşılabilir.',
  keywords: ['yolculuk', 'hareket', 'hedef', 'birleşme', 'odak'],
  context:
    'Tanışma yolculuk veya hareketle bağlantılıdır. Uyum sağlamak süreci kolaylaştırır.',
  group: 'Majör Arkana',
},
{
  id: 'strength_ma_pos7',
  card: 'Strength',
  position: 7,
  upright:
    'Güç, tanışmanızın sabır ve nazik bir enerjiyle gerçekleşeceğini söyler. Yumuşak yaklaşımınız karşı tarafın kalbini kazanır.',
  reversed:
    'Ters Güç, tanışmanızda gurur veya sertlik engel olabilir. Fazla baskın tavır yakınlaşmayı yavaşlatabilir.',
  keywords: ['sabır', 'naziklik', 'güç', 'çekim', 'yumuşaklık'],
  context:
    'Tanışma yumuşak ve sabırlı enerjiyle gerçekleşebilir. Sertlik mesafe yaratır.',
  group: 'Majör Arkana',
},
{
  id: 'the_hermit_ma_pos7',
  card: 'The Hermit',
  position: 7,
  upright:
    'Ermiş, tanışmanın içe dönüş ve sakin bir dönemde olacağını söyler. Bir atölye, kitaplık, kurs ya da yalnız kalmayı seçtiğin bir yolculukta yollarınız kesişebilir; derin sohbet yakınlaştırır.',
  reversed:
    'Ters Ermiş, fazlaca içe kapanmanın karşılaşmayı geciktirebileceğini anlatır. İzolasyonu yumuşatıp seçici sosyallik kurduğunda kader temasına alan açılır.',
  keywords: ['içe dönüş', 'bilgelik', 'sakinlik', 'derin sohbet'],
  context:
    'Sessiz ve anlamlı bir ortamda tanışırsınız. Derinlik sizi çeker. İzolasyonu gevşetmek buluşmayı hızlandırır.',
  group: 'Majör Arkana',
},
{
  id: 'wheel_of_fortune_ma_pos7',
  card: 'Wheel of Fortune',
  position: 7,
  upright:
    'Kader Çarkı, tanışmanın tesadüf gibi görünen güçlü bir zaman penceresinde olacağını söyler. Planlanmamış bir değişim, taşınma ya da seyahat sizi rastlantısal biçimde birleştirir.',
  reversed:
    'Ters Çark, yanlış zamanlama veya kaçırılan fırsatların süreci uzatabileceğini anlatır. Akışa direnmek yerine küçük bir evet, kaderi hizaya getirir.',
  keywords: ['kader', 'zamanlama', 'rastlantı', 'değişim'],
  context:
    'Zaman penceresi açıldığında karşılaşırsınız. Akışla uyum hız kazandırır. Direnç fırsatı kaçırır.',
  group: 'Majör Arkana',
},
{
  id: 'justice_ma_pos7',
  card: 'Justice',
  position: 7,
  upright:
    'Adalet, tanışmanın anlaşma, belge, eğitim veya yasal bir süreç aracılığıyla olacağını söyler. Adil ve şeffaf bir ortamda karşılıklı saygı hızla oluşur.',
  reversed:
    'Ters Adalet, yanlış anlaşılmalar veya dengesiz beklentilerin ilk teması gölgeleyebileceğini anlatır. Net ve dürüst iletişim kurulduğunda bağ doğru raya girer.',
  keywords: ['denge', 'şeffaflık', 'sözleşme', 'adalet'],
  context:
    'Resmi/şeffaf bir bağlamda tanışırsınız. Netlik çekimi artırır. Muğlaklık süreci zorlar.',
  group: 'Majör Arkana',
},
{
  id: 'the_hanged_man_ma_pos7',
  card: 'The Hanged Man',
  position: 7,
  upright:
    'Asılan Adam, tanışmanın askıda bir dönemde farklı bir bakış açısı kazandığında geleceğini söyler. Planları durdurup ritmi yavaşlatmak, beklenmedik bir karşılaşmayı doğurur.',
  reversed:
    'Ters Asılan Adam, erteleme ve kararsızlığın fırsat penceresini kapatabileceğini anlatır. Kurban hikâyesini bırakıp mikro adım attığında yollar kesişir.',
  keywords: ['bekleyiş', 'perspektif', 'teslimiyet', 'ara'],
  context:
    'Yavaşlama anında tanışırsınız. Perspektif değişimi kapı açar. Uzayan erteleme fırsatı kaçırır.',
  group: 'Majör Arkana',
},
{
  id: 'death_ma_pos7',
  card: 'Death',
  position: 7,
  upright:
    'Ölüm, güçlü bir kapanış ve dönüşümden sonra tanışmayı söyler. Eski bir döngüyü bitirdiğinizde, taze başlangıç alanında birbirinizi görürsünüz.',
  reversed:
    'Ters Ölüm, eskiye tutunmanın yeni karşılaşmayı geciktirdiğini anlatır. Vedayı onurlandırdığınızda yollar doğalca birleşir.',
  keywords: ['bitiş', 'dönüşüm', 'yeniden doğuş', 'bırakma'],
  context:
    'Kapanıştan sonra buluşursunuz. Dönüşüm alan açar. Direnç süreci uzatır.',
  group: 'Majör Arkana',
},
{
  id: 'temperance_ma_pos7',
  card: 'Temperance',
  position: 7,
  upright:
    'Denge, tanışmanın iki dünyanın uyumla karıştığı bir ortamda olacağını söyler. Ortak arkadaş, karma bir proje ya da şifa/sağlık temalı alanlar sizi harmanlar.',
  reversed:
    'Ters Denge, aşırılık veya uyumsuz temponun yakınlaşmayı zorlayabileceğini anlatır. Orta yol ve sabır, karşılaşmayı olgunlaştırır.',
  keywords: ['uyum', 'orta yol', 'sabır', 'karışım'],
  context:
    'Karma bir alanda yollar kesişir. Orta yol bağı büyütür. Aşırılık süreci dağıtır.',
  group: 'Majör Arkana',
},
{
  id: 'the_devil_ma_pos7',
  card: 'The Devil',
  position: 7,
  upright:
    'Şeytan, yoğun çekim ve cazibenin bulunduğu bir ortamda tanışmayı söyler. Tutku yüksek olabilir; sınır ve bilinç, bağı sağlıklı kılar.',
  reversed:
    'Ters Şeytan, toksik döngülerden özgürleştikçe doğru karşılaşmanın alan bulacağını anlatır. Bağımlılıklardan çıkış, temiz bir tanışmayı davet eder.',
  keywords: ['tutku', 'çekim', 'sınır', 'gölge'],
  context:
    'Çekimin güçlü olduğu yerde tanışırsınız. Bilinçli sınır şart. Özgürleşme alanı arındırır.',
  group: 'Majör Arkana',
},
{
  id: 'the_tower_ma_pos7',
  card: 'The Tower',
  position: 7,
  upright:
    'Kule, ani bir kırılma veya beklenmedik olay sonrası tanışmayı söyler. Kriz bir şeyi yıkar, gerçek sizi birbirinize görünür kılar.',
  reversed:
    'Ters Kule, ertelenen yüzleşmelerin süreci tıkadığını anlatır. Gerçeği kabullenmek, doğru buluşmaya kapı açar.',
  keywords: ['kriz', 'gerçek', 'yıkım', 'uyanış'],
  context:
    'Sarsıntıdan sonra yollar kesişir. Hakikat yakınlaştırır. Kaçınma geciktirir.',
  group: 'Majör Arkana',
},
{
  id: 'the_star_ma_pos7',
  card: 'The Star',
  position: 7,
  upright:
    'Yıldız, umut ve şifa döneminde tanışmayı söyler. İlham veren bir topluluk, yaratıcı alan ya da gönüllülük sizi nazikçe birleştirir.',
  reversed:
    'Ters Yıldız, umutsuz dilin ışığı gölgeleyebileceğini anlatır. Şükran ve sadeleşme, doğru eşzamanlılığı çağırır.',
  keywords: ['umut', 'şifa', 'ilham', 'sadelik'],
  context:
    'Şifa ve ilham anında tanışırsınız. Sadelik bağı parlatır. Umutsuzluk perde olur.',
  group: 'Majör Arkana',
},
{
  id: 'the_moon_ma_pos7',
  card: 'The Moon',
  position: 7,
  upright:
    'Ay, belirsizlik içeren bir süreçte sezgilerin kılavuzluk edeceğini söyler. Rüyalar, sanat, gece etkinliği veya iç dünyaya yakın alanlar buluşmayı örer.',
  reversed:
    'Ters Ay, varsayımın ve korkuların sinyalleri bozabileceğini anlatır. Net mini adımlar sis perdesini kaldırır; tanışma berraklaşır.',
  keywords: ['sezgi', 'belirsizlik', 'rüya', 'iç dünya'],
  context:
    'Sezgisel izlerle tanışırsınız. Netlik süreci aydınlatır. Korku akışı karartır.',
  group: 'Majör Arkana',
},
{
  id: 'the_sun_ma_pos7',
  card: 'The Sun',
  position: 7,
  upright:
    'Güneş, sıcak ve neşeli bir ortamda tanışmayı söyler. Tatil, kutlama, açık hava veya başarı temalı bir etkinlik sizi görünür kılar ve hızla yakınlaştırır.',
  reversed:
    'Ters Güneş, yapay neşenin veya kıyasın doğallığı gölgeleyebileceğini anlatır. Otantik paylaşımla gerçek ışıltı ortaya çıkar.',
  keywords: ['neşe', 'görünürlük', 'kutlama', 'otantiklik'],
  context:
    'Aydınlık bir zeminde karşılaşırsınız. Otantiklik bağı güçlendirir. Yapaylık ışıltıyı kısar.',
  group: 'Majör Arkana',
},
{
  id: 'judgement_ma_pos7',
  card: 'Judgement',
  position: 7,
  upright:
    'Mahkeme, geçmişle yüzleşip temiz bir sayfa açtığınız günlerde tanışmayı söyler. Bir çağrı, duyuru, buluşma organizasyonu veya yeniden bağlantı sizi bir araya getirir.',
  reversed:
    'Ters Mahkeme, aşırı öz-yargı ya da eski defterlere takılmanın yeni karşılaşmayı geciktireceğini anlatır. Affediş ve kapanış, yolları kesiştirir.',
  keywords: ['yenilenme', 'çağrı', 'yüzleşme', 'affediş'],
  context:
    'Kapanış sonrası bir çağrıyla buluşursunuz. Yenilenme çekim yaratır. Yargı süreci yavaşlatır.',
  group: 'Majör Arkana',
},
{
  id: 'the_world_ma_pos7',
  card: 'The World',
  position: 7,
  upright:
    'Dünya, büyük bir döngüyü tamamladığınızda ya da uluslararası/çapraz kültürlü bir bağlamda tanışmayı söyler. Mezuniyet, proje bitişi veya seyahat sizi tamlık duygusuyla birleştirir.',
  reversed:
    'Ters Dünya, yarım kalmış işlerin dikkatinizi dağıtarak tanışmayı erteleyebileceğini anlatır. Eksikleri kapatıp kutladığınızda doğru eşzamanlılık kapıyı çalar.',
  keywords: ['tamamlanma', 'eşik', 'seyahat', 'bütünlük'],
  context:
    'Tamamlama ve kutlama eşiğinde buluşursunuz. Bütünlük çekimi artırır. Yarım işler akışı geciktirir.',
  group: 'Majör Arkana',
},
{
  id: 'ace_of_cups_ma_pos7',
  card: 'Ace of Cups',
  position: 7,
  upright:
    'Asa Kupası, tanışmanın duygusal bir başlangıç anında olacağını gösterir. Bir davet, kutlama ya da duygusal yoğunluğu olan bir ortam sizi karşılaştırır.',
  reversed:
    'Ters Asa Kupası, kapalı kalbin tanışmayı geciktirebileceğini söyler. İçsel akışı açtığında bağ kendiliğinden doğar.',
  keywords: ['başlangıç', 'duygu', 'yakınlaşma', 'akış'],
  context:
    'Duygusal yoğunluğun olduğu bir ortamda karşılaşırsınız. Açık kalp tanışmayı kolaylaştırır.',
  group: 'Kupalar',
},
{
  id: 'two_of_cups_ma_pos7',
  card: 'Two of Cups',
  position: 7,
  upright:
    'İki Kupa, tanışmanın doğrudan karşılıklı çekim ve uyum ortamında olacağını söyler. Küçük bir buluşma veya ortak proje bağı hızla başlatır.',
  reversed:
    'Ters İki Kupa, dengesiz bağ ya da yanlış beklentilerle tanışmayı gölgeleyebilir. Açık iletişim yolları netleştirir.',
  keywords: ['uyum', 'çekim', 'ortaklık', 'denge'],
  context:
    'Karşılıklı çekimin olduğu bir ortamda buluşursunuz. Netlik ilişkiyi hızlandırır.',
  group: 'Kupalar',
},
{
  id: 'three_of_cups_ma_pos7',
  card: 'Three of Cups',
  position: 7,
  upright:
    'Üç Kupa, tanışmanın arkadaş çevresi, kutlama ya da toplu etkinlikte gerçekleşeceğini söyler. Neşe ve paylaşım, bağın ilk zeminini oluşturur.',
  reversed:
    'Ters Üç Kupa, yüzeysel ya da aşırı sosyal ortamların bağı zayıflatabileceğini söyler. Küçük samimi gruplar daha kalıcı tanışma sağlar.',
  keywords: ['kutlama', 'arkadaşlık', 'topluluk', 'paylaşım'],
  context:
    'Neşeli bir toplulukta tanışırsınız. Samimiyet bağı güçlendirir.',
  group: 'Kupalar',
},
{
  id: 'four_of_cups_ma_pos7',
  card: 'Four of Cups',
  position: 7,
  upright:
    'Dört Kupa, tanışmanın içe kapanık bir dönemde fark edilmeyen bir fırsatla geleceğini söyler. Farkındalıkla bakıldığında bağ ortaya çıkar.',
  reversed:
    'Ters Dört Kupa, yeniye açılma isteğinin güçlendiğini gösterir. Şükranla yaklaşmak karşılaşmayı hızlandırır.',
  keywords: ['fırsat', 'içe dönüş', 'uyanış', 'farkındalık'],
  context:
    'Küçük ama değerli bir fırsatla tanışırsınız. Açık gözler kapıyı görür.',
  group: 'Kupalar',
},
{
  id: 'five_of_cups_ma_pos7',
  card: 'Five of Cups',
  position: 7,
  upright:
    'Beş Kupa, tanışmanın kayıp ya da hayal kırıklığı sonrası yeni bir kapı açtığını söyler. Geçmişten çıkış, karşılaşmaya alan yaratır.',
  reversed:
    'Ters Beş Kupa, toparlanma ve geleceğe dönme süreciyle yeni tanışmayı işaret eder. Yasın ardından gelen umut bağı besler.',
  keywords: ['kayıp', 'umut', 'iyileşme', 'yeni başlangıç'],
  context:
    'Geçmişten özgürleştiğinizde tanışırsınız. Umut size rehber olur.',
  group: 'Kupalar',
},
{
  id: 'six_of_cups_ma_pos7',
  card: 'Six of Cups',
  position: 7,
  upright:
    'Altı Kupa, tanışmanın geçmiş bağlantılar veya nostaljik bir bağ aracılığıyla olacağını söyler. Eski bir arkadaş, çocukluk bağı sizi yeniden birleştirebilir.',
  reversed:
    'Ters Altı Kupa, geçmişe fazlaca tutunmanın yeni bağın önünü kapatabileceğini söyler. Anıyı onurlandırmak ama bugüne yönelmek kapıyı açar.',
  keywords: ['nostalji', 'geçmiş', 'bağ', 'yeniden buluşma'],
  context:
    'Eski bir bağ üzerinden tanışırsınız. Geçmişi onurlandırmak bugünü kolaylaştırır.',
  group: 'Kupalar',
},
{
  id: 'seven_of_cups_ma_pos7',
  card: 'Seven of Cups',
  position: 7,
  upright:
    'Yedi Kupa, tanışmanın seçenekler arasında net seçim yaptığınızda geleceğini söyler. Hayal yerine ölçüt belirlemek doğru kişiye yöneltir.',
  reversed:
    'Ters Yedi Kupa, kafa karışıklığını geride bırakıp netleşmeyi gösterir. Net niyet, tanışmayı hızlandırır.',
  keywords: ['seçenek', 'netlik', 'hayal', 'karar'],
  context:
    'Seçenekleri sadeleştirdiğinizde tanışırsınız. Netlik doğru kapıyı açar.',
  group: 'Kupalar',
},
{
  id: 'eight_of_cups_ma_pos7',
  card: 'Eight of Cups',
  position: 7,
  upright:
    'Sekiz Kupa, anlam arayışında olduğunuz bir dönemde tanışmayı gösterir. Daha derin bir yolculuk sizi bir araya getirir.',
  reversed:
    'Ters Sekiz Kupa, gitmek-kalmak ikileminde sıkışmayı işaret eder. Net karar yeni tanışmayı getirir.',
  keywords: ['arayış', 'yolculuk', 'anlam', 'karar'],
  context:
    'Anlamlı bir yolculukta buluşursunuz. Karar vermek tanışmayı netleştirir.',
  group: 'Kupalar',
},
{
  id: 'nine_of_cups_ma_pos7',
  card: 'Nine of Cups',
  position: 7,
  upright:
    'Dokuz Kupa, tatmin ve minnet duygusunun yoğun olduğu bir süreçte tanışmayı gösterir. İçsel huzur çekim alanı yaratır.',
  reversed:
    'Ters Dokuz Kupa, yüzeysel tatmin arayışının bağın özünü gölgeleyebileceğini söyler. Sahici değerler tanışmayı kalıcı yapar.',
  keywords: ['tatmin', 'minnet', 'bolluk', 'huzur'],
  context:
    'İç huzurla tanışırsınız. Gerçek tatmin bağı güçlendirir.',
  group: 'Kupalar',
},
{
  id: 'ten_of_cups_ma_pos7',
  card: 'Ten of Cups',
  position: 7,
  upright:
    'On Kupa, aile veya topluluk uyumunun güçlü olduğu bir ortamda tanışmayı söyler. Birlik duygusu bağın zeminini hazırlar.',
  reversed:
    'Ters On Kupa, aşırı beklentilerin tanışmayı gölgeleyebileceğini söyler. Gerçekçi yaklaşım ilişkiyi besler.',
  keywords: ['uyum', 'aile', 'birlik', 'huzur'],
  context:
    'Birlik ve huzur ortamında tanışırsınız. Gerçekçilik bağa güç verir.',
  group: 'Kupalar',
},
{
  id: 'page_of_cups_ma_pos7',
  card: 'Page of Cups',
  position: 7,
  upright:
    'Kupa Prensi, yaratıcı ve merak dolu bir anda tanışmayı gösterir. Sanat, hayal ya da ilham anı sizi buluşturur.',
  reversed:
    'Ters Kupa Prensi, aşırı hassasiyetin veya hayale kapılmanın karşılaşmayı gölgeleyebileceğini söyler. Gerçekçi yaklaşım net kapı açar.',
  keywords: ['ilham', 'merak', 'yaratıcılık', 'hassasiyet'],
  context:
    'Yaratıcı bir anda buluşursunuz. Oyun ve ilham bağı kurar.',
  group: 'Kupalar',
},
{
  id: 'knight_of_cups_ma_pos7',
  card: 'Knight of Cups',
  position: 7,
  upright:
    'Kupa Şövalyesi, romantik ve idealist bir ortamda tanışmayı gösterir. Kalpten gelen bir teklif yollarınızı kesiştirir.',
  reversed:
    'Ters Kupa Şövalyesi, tutarsız vaatlerin bağı zorlaştırabileceğini söyler. Net niyet tanışmayı sağlıklı kılar.',
  keywords: ['romantizm', 'idealizm', 'teklif', 'vizyon'],
  context:
    'Romantik bir teklifle tanışırsınız. Netlik ilişkiyi güçlendirir.',
  group: 'Kupalar',
},
{
  id: 'queen_of_cups_ma_pos7',
  card: 'Queen of Cups',
  position: 7,
  upright:
    'Kupa Kraliçesi, şefkatli ve sezgisel bir ortamda tanışmayı gösterir. Empati ve duygusal açıklık bağa davet eder.',
  reversed:
    'Ters Kupa Kraliçesi, sınırların erimesinin bağı zorlayabileceğini söyler. Sağlıklı sınırlar kalıcı bağ yaratır.',
  keywords: ['şefkat', 'sezgi', 'empati', 'sınır'],
  context:
    'Şefkatli bir alanda tanışırsınız. Sağlıklı sınırlar bağınızı güçlendirir.',
  group: 'Kupalar',
},
{
  id: 'king_of_cups_ma_pos7',
  card: 'King of Cups',
  position: 7,
  upright:
    'Kupa Kralı, olgun ve sakin bir ortamda tanışmayı gösterir. Duygusal denge ve güven bağın temelini oluşturur.',
  reversed:
    'Ters Kupa Kralı, bastırılmış duyguların bağı gölgeleyebileceğini söyler. Açık ifade yolları kolaylaştırır.',
  keywords: ['olgunluk', 'denge', 'güven', 'sükunet'],
  context:
    'Olgunlukla tanışırsınız. Açıklık bağınızı güçlendirir.',
  group: 'Kupalar',
},

// ==== SWORDS (Kılıçlar) ====
{
  id: 'ace_of_swords_ma_pos7',
  card: 'Ace of Swords',
  position: 7,
  upright:
    'As Kılıç, tanışmanın netlik ve yeni bir fikirle başlayacağını söyler. Bir eğitim, sunum ya da açık sözlü bir konuşma sizi birleştirir.',
  reversed:
    'Ters As Kılıç, bulanık iletişimin bağı zorlayabileceğini anlatır. Netlik bağı güçlendirir.',
  keywords: ['netlik', 'iletişim', 'fikir', 'karar'],
  context:
    'Net bir fikir anında tanışırsınız. Açık sözlülük bağı hızlandırır.',
  group: 'Kılıçlar',
},
{
  id: 'two_of_swords_ma_pos7',
  card: 'Two of Swords',
  position: 7,
  upright:
    'İki Kılıç, tanışmanın kararsız bir süreçte geleceğini gösterir. İkilemin ortasında açık bir seçim buluşmayı getirir.',
  reversed:
    'Ters İki Kılıç, yüzleşmeden kaçışın süreci geciktirebileceğini söyler. Net karar bağı kurar.',
  keywords: ['kararsızlık', 'seçim', 'denge', 'yüzleşme'],
  context:
    'Karar anında tanışırsınız. Netlik bağa yön verir.',
  group: 'Kılıçlar',
},
{
  id: 'three_of_swords_ma_pos7',
  card: 'Three of Swords',
  position: 7,
  upright:
    'Üç Kılıç, kırgınlık veya ayrılık sonrası tanışmayı gösterir. Açık yürek yeni bağı doğurur.',
  reversed:
    'Ters Üç Kılıç, iyileşme sürecinin tanışmaya alan açtığını söyler. Şefkatli iletişim bağı büyütür.',
  keywords: ['ayrılık', 'kırgınlık', 'iyileşme', 'yüzleşme'],
  context:
    'Kapanış sonrası tanışırsınız. Şefkat süreci hızlandırır.',
  group: 'Kılıçlar',
},
{
  id: 'four_of_swords_ma_pos7',
  card: 'Four of Swords',
  position: 7,
  upright:
    'Dört Kılıç, dinlenme ve içsel toparlanma sürecinde tanışmayı gösterir. Sessizlik sonrası gelen buluşma kalıcı olur.',
  reversed:
    'Ters Dört Kılıç, ertelemenin bağı geciktirebileceğini söyler. Küçük adımlar tanışmayı hızlandırır.',
  keywords: ['dinlenme', 'sessizlik', 'toparlanma', 'sabır'],
  context:
    'Sessizlikten sonra buluşursunuz. Küçük adım süreci kolaylaştırır.',
  group: 'Kılıçlar',
},
{
  id: 'five_of_swords_ma_pos7',
  card: 'Five of Swords',
  position: 7,
  upright:
    'Beş Kılıç, tanışmanın bir tartışma veya fikir ayrılığı ortamında doğabileceğini söyler. Doğru ifade yeni bir köprü kurar.',
  reversed:
    'Ters Beş Kılıç, esneklik ve onarım niyetiyle tanışmayı işaret eder. Ego değil empati kapıyı açar.',
  keywords: ['çatışma', 'ego', 'empati', 'diyalog'],
  context:
    'Fikir ayrılığı ortamında tanışırsınız. Empati bağı güçlendirir.',
  group: 'Kılıçlar',
},
{
  id: 'six_of_swords_ma_pos7',
  card: 'Six of Swords',
  position: 7,
  upright:
    'Altı Kılıç, yolculuk ya da taşınma sırasında tanışmayı gösterir. Geçiş döneminde yeni bağ ortaya çıkar.',
  reversed:
    'Ters Altı Kılıç, eski bağların süreci geciktirebileceğini söyler. Geçişi kabul etmek buluşmayı kolaylaştırır.',
  keywords: ['yolculuk', 'geçiş', 'değişim', 'yeni bağ'],
  context:
    'Yolculukta tanışırsınız. Geçiş süreci kapı açar.',
  group: 'Kılıçlar',
},
{
  id: 'seven_of_swords_ma_pos7',
  card: 'Seven of Swords',
  position: 7,
  upright:
    'Yedi Kılıç, tanışmanın stratejik veya dolaylı yollarla olacağını söyler. Küçük bir sır veya gizli fırsat kapıyı açar.',
  reversed:
    'Ters Yedi Kılıç, yarım gerçeklerin bağı zorlaştırabileceğini söyler. Açıklık güveni besler.',
  keywords: ['strateji', 'giz', 'fırsat', 'güven'],
  context:
    'Dolaylı bir yolla tanışırsınız. Açıklık bağı güçlendirir.',
  group: 'Kılıçlar',
},
{
  id: 'eight_of_swords_ma_pos7',
  card: 'Eight of Swords',
  position: 7,
  upright:
    'Sekiz Kılıç, zihinsel kısıtların tanışmayı zorlayabileceğini söyler. Küçük bir cesaret zinciri kırar.',
  reversed:
    'Ters Sekiz Kılıç, özgürleşmenin süreci hızlandıracağını gösterir. Destek almak bağı kolaylaştırır.',
  keywords: ['kısıt', 'özgürleşme', 'cesaret', 'zihin'],
  context:
    'Zihinsel engeller aşıldığında tanışırsınız. Cesaret yolu açar.',
  group: 'Kılıçlar',
},
{
  id: 'nine_of_swords_ma_pos7',
  card: 'Nine of Swords',
  position: 7,
  upright:
    'Dokuz Kılıç, kaygılı bir dönemde tanışmayı gösterir. İçsel korkuları konuşmak bağı yakınlaştırır.',
  reversed:
    'Ters Dokuz Kılıç, sabah netliğinin bağı güçlendireceğini söyler. Kaygıyı paylaşmak güven yaratır.',
  keywords: ['kaygı', 'korku', 'iletişim', 'güven'],
  context:
    'Kaygılı bir süreçte tanışırsınız. Paylaşım güven kurar.',
  group: 'Kılıçlar',
},
{
  id: 'ten_of_swords_ma_pos7',
  card: 'Ten of Swords',
  position: 7,
  upright:
    'On Kılıç, bitiş sonrası tanışmayı gösterir. Son kapanış yeni başlangıca kapı açar.',
  reversed:
    'Ters On Kılıç, toparlanma ve yeniden doğuşla tanışmayı işaret eder. Yeniden çerçeve buluşmayı kolaylaştırır.',
  keywords: ['bitiş', 'yeniden doğuş', 'dönüşüm', 'kapanış'],
  context:
    'Bir sonun ardından buluşursunuz. Dönüşüm yeni kapı açar.',
  group: 'Kılıçlar',
},
{
  id: 'page_of_swords_ma_pos7',
  card: 'Page of Swords',
  position: 7,
  upright:
    'Kılıç Prensi, öğrenme ve merak sürecinde tanışmayı gösterir. Eğitim veya araştırma bağı hızlandırır.',
  reversed:
    'Ters Kılıç Prensi, acele yargının bağı zorlayabileceğini söyler. Gözlem süreci kolaylaştırır.',
  keywords: ['öğrenme', 'merak', 'iletişim', 'gözlem'],
  context:
    'Öğrenme ortamında tanışırsınız. Merak bağı kurar.',
  group: 'Kılıçlar',
},
{
  id: 'knight_of_swords_ma_pos7',
  card: 'Knight of Swords',
  position: 7,
  upright:
    'Kılıç Şövalyesi, hızlı ve net bir ortamda tanışmayı gösterir. Bir tartışma ya da hızlı bir gelişme sizi birleştirir.',
  reversed:
    'Ters Kılıç Şövalyesi, aceleciliğin bağı zorlayabileceğini söyler. Yavaşlamak ilişkiyi güçlendirir.',
  keywords: ['hız', 'kararlılık', 'iletişim', 'savunma'],
  context:
    'Hızlı bir ortamda tanışırsınız. Netlik bağı besler.',
  group: 'Kılıçlar',
},
{
  id: 'queen_of_swords_ma_pos7',
  card: 'Queen of Swords',
  position: 7,
  upright:
    'Kılıç Kraliçesi, netlik ve dürüstlüğün güçlü olduğu bir ortamda tanışmayı gösterir. Açık söz bağı kurar.',
  reversed:
    'Ters Kılıç Kraliçesi, aşırı eleştirinin bağı zorlayabileceğini söyler. Şefkatli dil süreci kolaylaştırır.',
  keywords: ['netlik', 'dürüstlük', 'sınır', 'adalet'],
  context:
    'Dürüstlük zemininde tanışırsınız. Açık söz bağı büyütür.',
  group: 'Kılıçlar',
},
{
  id: 'king_of_swords_ma_pos7',
  card: 'King of Swords',
  position: 7,
  upright:
    'Kılıç Kralı, ilkelerin ve mantığın ön planda olduğu bir ortamda tanışmayı gösterir. Strateji ve adalet bağı güçlendirir.',
  reversed:
    'Ters Kılıç Kralı, katılığın bağı gölgeleyebileceğini söyler. Empati tanışmayı kolaylaştırır.',
  keywords: ['mantık', 'adalet', 'strateji', 'otorite'],
  context:
    'İlke ve adalet ortamında buluşursunuz. Empati bağı dengeler.',
  group: 'Kılıçlar',
},

// ==== PENTACLES (Tılsımlar) ====
{
  id: 'ace_of_pentacles_ma_pos7',
  card: 'Ace of Pentacles',
  position: 7,
  upright:
    'As Tılsım, tanışmanın somut bir fırsatla olacağını söyler. Yeni iş, proje ya da maddi fırsat yolları kesiştirir.',
  reversed:
    'Ters As Tılsım, fırsatı görmezden gelmenin tanışmayı geciktireceğini söyler. Değerleri fark etmek bağı kolaylaştırır.',
  keywords: ['fırsat', 'temel', 'proje', 'büyüme'],
  context:
    'Somut fırsatta tanışırsınız. Değer görmek bağı açar.',
  group: 'Tılsımlar',
},
{
  id: 'two_of_pentacles_ma_pos7',
  card: 'Two of Pentacles',
  position: 7,
  upright:
    'İki Tılsım, tanışmanın yoğunluk ve denge arayışında olacağını söyler. Zaman yönetimi doğru kişiyi getirebilir.',
  reversed:
    'Ters İki Tılsım, dengesizliğin bağı zorlayabileceğini söyler. Öncelik belirlemek buluşmayı kolaylaştırır.',
  keywords: ['denge', 'zaman', 'öncelik', 'uyum'],
  context:
    'Yoğun bir dönemde tanışırsınız. Öncelik bağı hızlandırır.',
  group: 'Tılsımlar',
},
{
  id: 'three_of_pentacles_ma_pos7',
  card: 'Three of Pentacles',
  position: 7,
  upright:
    'Üç Tılsım, işbirliği ve ekip çalışması sırasında tanışmayı gösterir. Ortak proje bağı kolaylaştırır.',
  reversed:
    'Ters Üç Tılsım, rol belirsizliğinin bağı zorlayabileceğini söyler. Netlik süreci güçlendirir.',
  keywords: ['işbirliği', 'proje', 'rol', 'ustalık'],
  context:
    'Ortak projede buluşursunuz. Netlik bağı kurar.',
  group: 'Tılsımlar',
},
{
  id: 'four_of_pentacles_ma_pos7',
  card: 'Four of Pentacles',
  position: 7,
  upright:
    'Dört Tılsım, güvenlik arayışında tanışmayı gösterir. Kontrollü ortam bağ kurar.',
  reversed:
    'Ters Dört Tılsım, aşırı kontrolün bağı zorlayabileceğini söyler. Esneklik süreci açar.',
  keywords: ['güvenlik', 'kontrol', 'koruma', 'denge'],
  context:
    'Güvenlik odaklı ortamda tanışırsınız. Esneklik bağı güçlendirir.',
  group: 'Tılsımlar',
},
{
  id: 'five_of_pentacles_ma_pos7',
  card: 'Five of Pentacles',
  position: 7,
  upright:
    'Beş Tılsım, zorluk ya da destek arayışında tanışmayı gösterir. Zor dönemde yan yana gelirsiniz.',
  reversed:
    'Ters Beş Tılsım, toparlanmanın bağı hızlandıracağını söyler. Yardımlaşma kapıyı açar.',
  keywords: ['zorluk', 'destek', 'toparlanma', 'dayanışma'],
  context:
    'Destek arayışında buluşursunuz. Yardımlaşma bağı güçlendirir.',
  group: 'Tılsımlar',
},
{
  id: 'six_of_pentacles_ma_pos7',
  card: 'Six of Pentacles',
  position: 7,
  upright:
    'Altı Tılsım, adil paylaşımın olduğu bir ortamda tanışmayı gösterir. Güven ve denge bağı kurar.',
  reversed:
    'Ters Altı Tılsım, güç dengesizliğinin bağı zorlayabileceğini söyler. Açıklık süreci kolaylaştırır.',
  keywords: ['adalet', 'paylaşım', 'denge', 'güven'],
  context:
    'Adil paylaşım ortamında tanışırsınız. Açıklık bağı büyütür.',
  group: 'Tılsımlar',
},
{
  id: 'seven_of_pentacles_ma_pos7',
  card: 'Seven of Pentacles',
  position: 7,
  upright:
    'Yedi Tılsım, sabır ve değerlendirme döneminde tanışmayı gösterir. Uzun vadeli düşünce bağı kurar.',
  reversed:
    'Ters Yedi Tılsım, aceleciliğin bağı zorlayabileceğini söyler. Sabır süreci kolaylaştırır.',
  keywords: ['sabır', 'değerlendirme', 'hasat', 'bekleyiş'],
  context:
    'Sabırlı süreçte tanışırsınız. Değerlendirme bağ kurar.',
  group: 'Tılsımlar',
},
{
  id: 'eight_of_pentacles_ma_pos7',
  card: 'Eight of Pentacles',
  position: 7,
  upright:
    'Sekiz Tılsım, disiplinli çalışma ve öğrenme sırasında tanışmayı gösterir. Ortak emek bağı hızlandırır.',
  reversed:
    'Ters Sekiz Tılsım, özensizliğin bağı zorlayabileceğini söyler. Dikkat ve emek tanışmayı kolaylaştırır.',
  keywords: ['çalışma', 'öğrenme', 'disiplin', 'ustalık'],
  context:
    'Çalışma ortamında buluşursunuz. Emek bağı kurar.',
  group: 'Tılsımlar',
},
{
  id: 'nine_of_pentacles_ma_pos7',
  card: 'Nine of Pentacles',
  position: 7,
  upright:
    'Dokuz Tılsım, bağımsızlık ve öz-değerin ön planda olduğu dönemde tanışmayı gösterir. Kendi ayakları üzerinde durmak çekimi artırır.',
  reversed:
    'Ters Dokuz Tılsım, aşırı bağımlılığın bağı gölgeleyebileceğini söyler. Özgüven tanışmayı güçlendirir.',
  keywords: ['öz-değer', 'bağımsızlık', 'özgüven', 'huzur'],
  context:
    'Bağımsızlıkla tanışırsınız. Özgüven bağı büyütür.',
  group: 'Tılsımlar',
},
{
  id: 'ten_of_pentacles_ma_pos7',
  card: 'Ten of Pentacles',
  position: 7,
  upright:
    'On Tılsım, uzun vadeli istikrar ve aile ortamında tanışmayı gösterir. Kalıcı değerler bağın temelini atar.',
  reversed:
    'Ters On Tılsım, miras veya sistemsel gerilimin bağı zorlayabileceğini söyler. Şeffaflık süreci kolaylaştırır.',
  keywords: ['istikrar', 'aile', 'kalıcılık', 'sistem'],
  context:
    'Kalıcı değerler ortamında tanışırsınız. Açıklık bağı güçlendirir.',
  group: 'Tılsımlar',
},
{
  id: 'page_of_pentacles_ma_pos7',
  card: 'Page of Pentacles',
  position: 7,
  upright:
    'Tılsım Prensi, öğrenme ve somut hedefler sürecinde tanışmayı gösterir. Küçük bir deneyim bağ kurar.',
  reversed:
    'Ters Tılsım Prensi, ertelemenin bağı geciktirebileceğini söyler. Küçük adımlar buluşmayı kolaylaştırır.',
  keywords: ['öğrenme', 'hedef', 'başlangıç', 'pratik'],
  context:
    'Öğrenme sürecinde tanışırsınız. Küçük adım bağı hızlandırır.',
  group: 'Tılsımlar',
},
{
  id: 'knight_of_pentacles_ma_pos7',
  card: 'Knight of Pentacles',
  position: 7,
  upright:
    'Tılsım Şövalyesi, sabırlı ve tutarlı bir dönemde tanışmayı gösterir. Yavaş ama emin adımlar bağı kurar.',
  reversed:
    'Ters Tılsım Şövalyesi, durağanlığın bağı zorlayabileceğini söyler. Küçük yenilikler süreci kolaylaştırır.',
  keywords: ['tutarlılık', 'sabır', 'istikrar', 'güven'],
  context:
    'Tutarlı adımlarla tanışırsınız. Sabır bağı güçlendirir.',
  group: 'Tılsımlar',
},
{
  id: 'queen_of_pentacles_ma_pos7',
  card: 'Queen of Pentacles',
  position: 7,
  upright:
    'Tılsım Kraliçesi, pratiklik ve şefkatin olduğu bir ortamda tanışmayı gösterir. Kaynak yönetimi ve bakım bağı güçlendirir.',
  reversed:
    'Ters Tılsım Kraliçesi, aşırı yüklenmenin bağı zorlayabileceğini söyler. Öz bakım süreci kolaylaştırır.',
  keywords: ['şefkat', 'pratiklik', 'kaynak', 'bakım'],
  context:
    'Pratik ve şefkatli ortamda tanışırsınız. Öz bakım bağı güçlendirir.',
  group: 'Tılsımlar',
},
{
  id: 'king_of_pentacles_ma_pos7',
  card: 'King of Pentacles',
  position: 7,
  upright:
    'Tılsım Kralı, maddi güvenlik ve sağlamlık ortamında tanışmayı gösterir. Sistemli yaklaşım bağı kalıcı yapar.',
  reversed:
    'Ters Tılsım Kralı, aşırı kontrolün bağı gölgeleyebileceğini söyler. Esneklik buluşmayı kolaylaştırır.',
  keywords: ['sağlamlık', 'güven', 'sistem', 'vizyon'],
  context:
    'Güvenli ortamda tanışırsınız. Esneklik bağı büyütür.',
  group: 'Tılsımlar',
},

// ==== WANDS (Asalar) ====
{
  id: 'ace_of_wands_ma_pos7',
  card: 'Ace of Wands',
  position: 7,
  upright:
    'Asa Ası, tanışmanın ilham ve enerji dolu bir başlangıçla olacağını gösterir. Yeni bir proje veya kıvılcım sizi buluşturur.',
  reversed:
    'Ters Asa Ası, ertelemenin veya ilham tıkanmasının tanışmayı geciktireceğini söyler. Küçük bir adım ateşi yakar.',
  keywords: ['ilham', 'başlangıç', 'enerji', 'cesaret'],
  context:
    'İlham anında buluşursunuz. Küçük adım bağı hızlandırır.',
  group: 'Asalar',
},
{
  id: 'two_of_wands_ma_pos7',
  card: 'Two of Wands',
  position: 7,
  upright:
    'İki Asa, vizyon ve planlama sürecinde tanışmayı gösterir. Yeni ufuk arayışı sizi karşılaştırır.',
  reversed:
    'Ters İki Asa, tereddüdün tanışmayı geciktirebileceğini söyler. İlk adım buluşmayı hızlandırır.',
  keywords: ['vizyon', 'plan', 'ufuk', 'karar'],
  context:
    'Ufuk arayışında tanışırsınız. İlk adım süreci açar.',
  group: 'Asalar',
},
{
  id: 'three_of_wands_ma_pos7',
  card: 'Three of Wands',
  position: 7,
  upright:
    'Üç Asa, genişleme ve işbirliği sürecinde tanışmayı gösterir. Ufukta beliren fırsat sizi buluşturur.',
  reversed:
    'Ters Üç Asa, gecikmenin veya dar görüşlülüğün bağı zorlayabileceğini söyler. Planı revize etmek buluşmayı kolaylaştırır.',
  keywords: ['genişleme', 'fırsat', 'işbirliği', 'ufuk'],
  context:
    'Genişleme sürecinde tanışırsınız. Ufuk bağı büyütür.',
  group: 'Asalar',
},
{
  id: 'four_of_wands_ma_pos7',
  card: 'Four of Wands',
  position: 7,
  upright:
    'Dört Asa, kutlama veya istikrar anında tanışmayı gösterir. Temel güven bağ kurar.',
  reversed:
    'Ters Dört Asa, düzensizlik veya yarım kalmışlığın tanışmayı zorlayabileceğini söyler. Ritüeller bağı kolaylaştırır.',
  keywords: ['kutlama', 'istikrar', 'temel', 'birlik'],
  context:
    'Kutlama ortamında buluşursunuz. İstikrar bağı güçlendirir.',
  group: 'Asalar',
},
{
  id: 'five_of_wands_ma_pos7',
  card: 'Five of Wands',
  position: 7,
  upright:
    'Beş Asa, rekabet ya da prova niteliğinde bir ortamda tanışmayı gösterir. Enerjik çatışma bağ kurar.',
  reversed:
    'Ters Beş Asa, bastırılmış gerilimin bağı zorlayabileceğini söyler. Yapılandırılmış diyalog süreci açar.',
  keywords: ['rekabet', 'prova', 'çatışma', 'diyalog'],
  context:
    'Enerjik ortamda tanışırsınız. Diyalog bağı güçlendirir.',
  group: 'Asalar',
},
{
  id: 'six_of_wands_ma_pos7',
  card: 'Six of Wands',
  position: 7,
  upright:
    'Altı Asa, başarı ve tanınma anında tanışmayı gösterir. Görünür zafer bağı büyütür.',
  reversed:
    'Ters Altı Asa, takdir eksikliğinin bağı gölgeleyebileceğini söyler. Açık paylaşım süreci kolaylaştırır.',
  keywords: ['başarı', 'tanınma', 'zafer', 'görünürlük'],
  context:
    'Zafer anında buluşursunuz. Tanınma bağı güçlendirir.',
  group: 'Asalar',
},
{
  id: 'seven_of_wands_ma_pos7',
  card: 'Seven of Wands',
  position: 7,
  upright:
    'Yedi Asa, sınırların ve tutarlılığın öne çıktığı bir ortamda tanışmayı gösterir. Kararlılık güven verir.',
  reversed:
    'Ters Yedi Asa, yorgunluğun savunmayı sertleştirebileceğini söyler. Esneklik ve destek tanışmayı kolaylaştırır.',
  keywords: ['savunma', 'sınır', 'kararlılık', 'direnç'],
  context: 'Kararlı ortamda tanışırsınız. Esneklik bağı büyütür.',
  group: 'Asalar',
},
{
  id: 'eight_of_wands_ma_pos7',
  card: 'Eight of Wands',
  position: 7,
  upright:
    'Sekiz Asa, hızlı gelişmeler ve iletişim akışında tanışmayı gösterir. Haber, yolculuk veya ani buluşma sizi birleştirir.',
  reversed:
    'Ters Sekiz Asa, gecikmenin veya karmaşanın bağı zorlayabileceğini söyler. Net sıralama buluşmayı kolaylaştırır.',
  keywords: ['hız', 'iletişim', 'ivme', 'akış'],
  context: 'Hızlı gelişmede tanışırsınız. Netlik bağı kurar.',
  group: 'Asalar',
},
{
  id: 'nine_of_wands_ma_pos7',
  card: 'Nine of Wands',
  position: 7,
  upright:
    'Dokuz Asa, dayanıklılık ve sınır koruma sürecinde tanışmayı gösterir. Zor bir dönemin sonunda buluşma güven getirir.',
  reversed:
    'Ters Dokuz Asa, tükenmişliğin bağı zorlayabileceğini söyler. Destek ağı buluşmayı kolaylaştırır.',
  keywords: ['dayanıklılık', 'koruma', 'sınır', 'güven'],
  context: 'Dayanıklılık sürecinde tanışırsınız. Destek bağı güçlendirir.',
  group: 'Asalar',
},
{
  id: 'ten_of_wands_ma_pos7',
  card: 'Ten of Wands',
  position: 7,
  upright:
    'On Asa, sorumluluk yükü altında tanışmayı gösterir. Paylaşım, yükü hafifletir ve yakınlığı artırır.',
  reversed:
    'Ters On Asa, aşırı yükün bağı zorlayabileceğini söyler. Sadelik ve dengeleme buluşmayı kolaylaştırır.',
  keywords: ['yük', 'sorumluluk', 'paylaşım', 'denge'],
  context: 'Yükün paylaşıldığı anda buluşursunuz. Denge bağı kurar.',
  group: 'Asalar',
},
{
  id: 'page_of_wands_ma_pos7',
  card: 'Page of Wands',
  position: 7,
  upright:
    'Asa Prensi, keşif ve merak dolu bir anda tanışmayı gösterir. Yeni bir deneyim veya yolculuk kapıyı açar.',
  reversed:
    'Ters Asa Prensi, dağınık ilgi ya da ertelemenin tanışmayı geciktireceğini söyler. Küçük hedefler bağı kolaylaştırır.',
  keywords: ['keşif', 'merak', 'deney', 'yolculuk'],
  context: 'Keşif sürecinde tanışırsınız. Küçük adım bağı büyütür.',
  group: 'Asalar',
},
{
  id: 'knight_of_wands_ma_pos7',
  card: 'Knight of Wands',
  position: 7,
  upright:
    'Asa Şövalyesi, tutku ve cesaret dolu bir anda tanışmayı gösterir. Enerjik bir hamle yollarınızı kesiştirir.',
  reversed:
    'Ters Asa Şövalyesi, acelecilik veya istikrarsızlığın bağı zorlayabileceğini söyler. Taahhüt tanışmayı güçlendirir.',
  keywords: ['cesaret', 'tutku', 'enerji', 'taahhüt'],
  context: 'Tutkulu bir ortamda buluşursunuz. Taahhüt bağı büyütür.',
  group: 'Asalar',
},
{
  id: 'queen_of_wands_ma_pos7',
  card: 'Queen of Wands',
  position: 7,
  upright:
    'Asa Kraliçesi, karizma ve özgüvenle dolu bir ortamda tanışmayı gösterir. Sıcak enerji çekimi artırır.',
  reversed:
    'Ters Asa Kraliçesi, kıskançlık ya da güvensizliğin buluşmayı gölgeleyebileceğini söyler. Öz-değer bağı kolaylaştırır.',
  keywords: ['karizma', 'özgüven', 'çekim', 'liderlik'],
  context: 'Karizmatik ortamda tanışırsınız. Öz-değer bağı güçlendirir.',
  group: 'Asalar',
},
{
  id: 'king_of_wands_ma_pos7',
  card: 'King of Wands',
  position: 7,
  upright:
    'Asa Kralı, vizyoner ve stratejik bir ortamda tanışmayı gösterir. Liderlik ve cesaret bağı kalıcı yapar.',
  reversed:
    'Ters Asa Kralı, otoriterliğin ya da ego sürtüşmesinin bağı zorlayabileceğini söyler. Dinleme kası süreci kolaylaştırır.',
  keywords: ['vizyon', 'liderlik', 'cesaret', 'strateji'],
  context: 'Stratejik ortamda buluşursunuz. Dinleme bağı dengeler.',
  group: 'Asalar',
},
];

// Kart adına göre pozisyon 7 anlamını bulma fonksiyonu
export const getposition7Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return position7Meanings.find(
    meaning => meaning.card === cardName
  );
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getmarriageposition7Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return getposition7Meaning(cardName);
};

// Kart adına göre pozisyon 7 anlamını bulma fonksiyonu (ana index için)
export const getmarriageposition7MeaningByCardName = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  const meaning = getposition7Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 7 anlamlarını alma fonksiyonu
export const getAllposition7Meanings = (): MarriagePositionMeaning[] => {
  return position7Meanings;
};

// pozisyon 7 anlamlarını filtreleme fonksiyonu
export const getposition7MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return position7Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 7 anlamlarını arama
export const searchposition7MeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
  return position7Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position7Meanings,
  getposition7Meaning,
  getAllposition7Meanings,
  getposition7MeaningsByGroup,
  searchposition7MeaningsByKeyword,
};
