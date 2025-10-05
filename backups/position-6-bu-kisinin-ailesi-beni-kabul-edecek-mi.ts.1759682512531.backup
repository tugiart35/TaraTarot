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

import { MarriagePositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position6Meanings: MarriagePositionMeaning[] = [
  // ========== MAJÖR ARKANA (22) ==========
  {
    id: 'the_fool_ma_pos6',
    card: 'The Fool',
    position: 6,
    upright:
      'Deli kartı, ailenin seni ön yargısız ve taze bir enerjiyle karşılayabileceğini gösterir. Onlar için farklı ve özgür bir ruhsun; bu özgünlüğün zamanla merak uyandırıp kabulü kolaylaştırabilir. Samimi ve açık tavrın sana kapıları açacak.',
    reversed:
      'Ters Deli, ailenin seni biraz fazla sorumsuz ya da aceleci algılayabileceğini işaret eder. İlk etapta güven vermekte zorlanabilirsin. Daha ciddi ve dengeli bir yaklaşım göstererek bu algıyı kırabilirsin.',
    keywords: ['başlangıç', 'özgürlük', 'merak', 'ön yargı', 'denge'],
    context:
      'Ailenin sana yaklaşımı merak ve temkin arasında salınabilir. Samimiyetin kabul sürecini hızlandıracaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos6',
    card: 'The Magician',
    position: 6,
    upright:
      'Büyücü, seni güçlü iletişimin ve ikna yeteneğin sayesinde kolayca kabul ettirebileceğini gösterir. Doğru sözler ve samimi tavırlar ailenin gönlünü kazanmanı sağlayacak. Etkileyici ve güven veren enerjinle hızla bağ kurabilirsin.',
    reversed:
      'Ters Büyücü, ailenin senin niyetlerini ya da sözlerini sorgulama eğiliminde olabileceğini anlatır. Eğer kendini fazla gösterişli sunarsan samimiyetin sorgulanabilir. Sakin ve şeffaf bir yaklaşım kabulü kolaylaştıracaktır.',
    keywords: ['iletişim', 'ikna', 'güç', 'samimiyet', 'şeffaflık'],
    context:
      'Sözlerin ve tavırların kabul sürecinde belirleyici olacak. Samimiyet güveni güçlendirir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos6',
    card: 'The High Priestess',
    position: 6,
    upright:
      'Başrahibe, ailenin seni ilk başta biraz mesafeli ama bilge biri olarak algılayabileceğini gösterir. Fazla konuşmadan sezgilerinle güven vermen onların ilgisini çekecek. Zamanla samimiyetin ortaya çıkacak.',
    reversed:
      'Ters Başrahibe, ailenin seni içine kapanık ya da gizemli bulabileceğini anlatır. Bu da kabul sürecini yavaşlatabilir. Açıklık ve paylaşım, mesafeyi azaltacaktır.',
    keywords: ['sezgi', 'mesafe', 'bilgelik', 'giz', 'paylaşım'],
    context:
      'Başta biraz kapalı görünsen de, paylaşımların arttıkça aile sıcaklığı artacaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos6',
    card: 'The Empress',
    position: 6,
    upright:
      'İmparatoriçe, ailenin seni sıcak, şefkatli ve besleyici enerjinle hızla kabul edeceğini söyler. Senin sevgiyi sahiplenme şeklin onları etkileyebilir. Onların gözünde aileye değer katacak biri olacaksın.',
    reversed:
      'Ters İmparatoriçe, ailenin seni fazla sahiplenici ya da bağımlı algılayabileceğini gösterir. Fazla verici tavır bazen karşı tarafta baskı hissi yaratabilir. Dengeli yaklaşım seni kolayca kabul ettirecektir.',
    keywords: ['şefkat', 'sıcaklık', 'besleme', 'aile', 'denge'],
    context:
      'Nazik ve besleyici tavırların aile tarafından hızla benimsenebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos6',
    card: 'The Emperor',
    position: 6,
    upright:
      'İmparator, ailenin seni güven veren ve düzenli yapınla kabul edeceğini söyler. Onlar için sağlam ve sorumluluk sahibi biri olarak görünmek büyük avantajdır. Disiplinin ve ciddiyetin saygı kazandırır.',
    reversed:
      'Ters İmparator, ailenin seni fazla katı, inatçı veya kontrolcü algılayabileceğini işaret eder. Bu da mesafe yaratabilir. Esneklik ve yumuşaklık göstermek kabul sürecini hızlandırır.',
    keywords: ['güven', 'düzen', 'otorite', 'esneklik', 'saygı'],
    context:
      'Ciddi ve güven veren tavrın kabulü kolaylaştırır, ama katılık mesafe yaratabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_fool_ma_pos6',
    card: 'The Fool',
    position: 6,
    upright:
      'Deli kartı, ailenin seni ön yargısız ve taze bir enerjiyle karşılayabileceğini gösterir. Onlar için farklı ve özgür bir ruhsun; bu özgünlüğün zamanla merak uyandırıp kabulü kolaylaştırabilir. Samimi ve açık tavrın sana kapıları açacak.',
    reversed:
      'Ters Deli, ailenin seni biraz fazla sorumsuz ya da aceleci algılayabileceğini işaret eder. İlk etapta güven vermekte zorlanabilirsin. Daha ciddi ve dengeli bir yaklaşım göstererek bu algıyı kırabilirsin.',
    keywords: ['başlangıç', 'özgürlük', 'merak', 'ön yargı', 'denge'],
    context:
      'Ailenin sana yaklaşımı merak ve temkin arasında salınabilir. Samimiyetin kabul sürecini hızlandıracaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos6',
    card: 'The Magician',
    position: 6,
    upright:
      'Büyücü, seni güçlü iletişimin ve ikna yeteneğin sayesinde kolayca kabul ettirebileceğini gösterir. Doğru sözler ve samimi tavırlar ailenin gönlünü kazanmanı sağlayacak. Etkileyici ve güven veren enerjinle hızla bağ kurabilirsin.',
    reversed:
      'Ters Büyücü, ailenin senin niyetlerini ya da sözlerini sorgulama eğiliminde olabileceğini anlatır. Eğer kendini fazla gösterişli sunarsan samimiyetin sorgulanabilir. Sakin ve şeffaf bir yaklaşım kabulü kolaylaştıracaktır.',
    keywords: ['iletişim', 'ikna', 'güç', 'samimiyet', 'şeffaflık'],
    context:
      'Sözlerin ve tavırların kabul sürecinde belirleyici olacak. Samimiyet güveni güçlendirir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos6',
    card: 'The High Priestess',
    position: 6,
    upright:
      'Başrahibe, ailenin seni ilk başta biraz mesafeli ama bilge biri olarak algılayabileceğini gösterir. Fazla konuşmadan sezgilerinle güven vermen onların ilgisini çekecek. Zamanla samimiyetin ortaya çıkacak.',
    reversed:
      'Ters Başrahibe, ailenin seni içine kapanık ya da gizemli bulabileceğini anlatır. Bu da kabul sürecini yavaşlatabilir. Açıklık ve paylaşım, mesafeyi azaltacaktır.',
    keywords: ['sezgi', 'mesafe', 'bilgelik', 'giz', 'paylaşım'],
    context:
      'Başta biraz kapalı görünsen de, paylaşımların arttıkça aile sıcaklığı artacaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos6',
    card: 'The Empress',
    position: 6,
    upright:
      'İmparatoriçe, ailenin seni sıcak, şefkatli ve besleyici enerjinle hızla kabul edeceğini söyler. Senin sevgiyi sahiplenme şeklin onları etkileyebilir. Onların gözünde aileye değer katacak biri olacaksın.',
    reversed:
      'Ters İmparatoriçe, ailenin seni fazla sahiplenici ya da bağımlı algılayabileceğini gösterir. Fazla verici tavır bazen karşı tarafta baskı hissi yaratabilir. Dengeli yaklaşım seni kolayca kabul ettirecektir.',
    keywords: ['şefkat', 'sıcaklık', 'besleme', 'aile', 'denge'],
    context:
      'Nazik ve besleyici tavırların aile tarafından hızla benimsenebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos6',
    card: 'The Emperor',
    position: 6,
    upright:
      'İmparator, ailenin seni güven veren ve düzenli yapınla kabul edeceğini söyler. Onlar için sağlam ve sorumluluk sahibi biri olarak görünmek büyük avantajdır. Disiplinin ve ciddiyetin saygı kazandırır.',
    reversed:
      'Ters İmparator, ailenin seni fazla katı, inatçı veya kontrolcü algılayabileceğini işaret eder. Bu da mesafe yaratabilir. Esneklik ve yumuşaklık göstermek kabul sürecini hızlandırır.',
    keywords: ['güven', 'düzen', 'otorite', 'esneklik', 'saygı'],
    context:
      'Ciddi ve güven veren tavrın kabulü kolaylaştırır, ama katılık mesafe yaratabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos6',
    card: 'The Hierophant',
    position: 6,
    upright:
      'Aziz, ailenin geleneksel değerlerle seni ölçebileceğini ve bu değerlere uyumun sayesinde kabulün kolay olacağını söyler. Onlar için kültürel ya da manevi uyum önemli olabilir. Bu alanlarda saygılı bir tavır sergilemek güven kazanmanı sağlar.',
    reversed:
      'Ters Aziz, ailenin seni farklı görüşlerin ya da geleneklere aykırı tavırların nedeniyle sorgulayabileceğini gösterir. Bu durum mesafeyi artırabilir. Saygılı bir açıklama ve açık iletişim kabul sürecini dengeleyebilir.',
    keywords: ['gelenek', 'uyum', 'onay', 'inanç', 'saygı'],
    context: 'Ailenin değerlerine saygı göstermek kabulün anahtarı olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos6',
    card: 'The Lovers',
    position: 6,
    upright:
      'Aşıklar kartı, ailenin senin ilişkinizdeki uyumu ve sevgiyi görerek kabulünü kolaylaştıracağını söyler. Ortak değerleriniz onların güvenini artırır. Sevginizi doğal ve dengeli şekilde göstermeye devam edin.',
    reversed:
      'Ters Aşıklar, ailenin ilişkinizi sorgulaması ya da taraf tutma eğilimi göstermesi ihtimalini işaret eder. Fikir ayrılıkları kabul sürecini zorlaştırabilir. Kararlılığınızı ve uyumunuzu sergilemek güven yaratacaktır.',
    keywords: ['sevgi', 'uyum', 'karar', 'değerler', 'güven'],
    context: 'İlişkinizin sağlamlığı aileyi ikna etmede önemli rol oynar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos6',
    card: 'The Chariot',
    position: 6,
    upright:
      'Savaş Arabası, ailenin seni kararlı ve güçlü duruşun sayesinde kabul edeceğini gösterir. Onlar için net hedeflerin ve ilerleme arzun güven verici bir işarettir. Güçlü iraden onlara cesaret verebilir.',
    reversed:
      'Ters Savaş Arabası, ailenin seni fazla aceleci, baskıcı ya da yönsüz algılayabileceğini işaret eder. Bu algı kabul sürecini zorlaştırabilir. Ölçülü ve sakin bir duruş güven inşa edecektir.',
    keywords: ['kararlılık', 'güç', 'ilerleme', 'duruş', 'denge'],
    context:
      'Kararlı ama dengeli tavırların ailenin güvenini kazanmanı sağlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos6',
    card: 'Strength',
    position: 6,
    upright:
      'Güç kartı, ailenin seni sabırlı, anlayışlı ve şefkatli yönünle kabul edeceğini gösterir. Nazik yaklaşımın onların güvenini kazanmanı kolaylaştırır. Sakin gücün saygı uyandırır.',
    reversed:
      'Ters Güç, ailenin seni fazla sabırsız, kıskanç ya da kontrolsüz algılayabileceğini gösterir. Bu da sıcaklığın azalmasına yol açabilir. Sakinlik ve öz güven kabul sürecini güçlendirir.',
    keywords: ['şefkat', 'sabır', 'naziklik', 'özgüven', 'denge'],
    context:
      'Şefkatli gücün ailenin kalbini kazanmanda en büyük destekçin olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos6',
    card: 'The Hermit',
    position: 6,
    upright:
      'Ermiş, ailenin seni bilge, sakin ve içe dönük tavırlarınla saygı duyulacak biri olarak görebileceğini anlatır. Sessizliğin güven verici bulunabilir. Düşünceli yanın kabulü hızlandırır.',
    reversed:
      'Ters Ermiş, ailenin seni fazla içine kapanık veya uzak algılayabileceğini işaret eder. Bu durum samimiyetin geç gelişmesine neden olabilir. Daha paylaşımcı bir tavır mesafeyi azaltacaktır.',
    keywords: ['bilgelik', 'sessizlik', 'mesafe', 'saygı', 'düşünce'],
    context:
      'Sessiz ama bilge tavrın saygı uyandırır, fakat aşırı mesafe kabulü yavaşlatır.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos6',
    card: 'The Wheel of Fortune',
    position: 6,
    upright:
      'Kader Çarkı, aile kabulünün zamana yayılan, dalgalı ama genel olarak olumlu bir seyir izleyebileceğini söyler. Koşullar değiştikçe seninle ilgili algıları da yumuşayabilir; akışa uyum, şansını artırır.',
    reversed:
      'Ters Kader Çarkı, aile içi döngülerin (alışkanlıklar, eski yargılar) kabulü geciktirebileceğini anlatır. Değişimi zorlamak yerine sabırla küçük iyi deneyimler biriktirmek bu döngüyü kırar.',
    keywords: ['zamanlama', 'döngü', 'akış', 'uyum', 'şans'],
    context:
      'Kabul süreci dönem dönem değişebilir. Uyumlu ve sabırlı duruşun şansı lehine çevirir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos6',
    card: 'Justice',
    position: 6,
    upright:
      'Adalet, tutarlı ve dürüst tavırlarınla aileden saygı ve kabul görme olasılığını yükseltir. Şeffaf iletişim ve adil iş bölümü, seni “güvenilir” hanesine yazar.',
    reversed:
      'Ters Adalet, çifte standart algısı ya da eksik açıklamalar ailede şüphe doğurabilir. Netlik ve gerektiğinde zamanında telafi, dengeyi yeniden kurar.',
    keywords: ['dürüstlük', 'denge', 'şeffaflık', 'saygı', 'güven'],
    context:
      'Adil ve net duruş kabulün anahtarıdır. Belirsizlikleri hızla açıklığa kavuştur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos6',
    card: 'The Hanged Man',
    position: 6,
    upright:
      'Asılan Adam, kabul için bakış açısı değişimine ve sabırlı bekleyişe ihtiyaç olduğunu söyler. Ailenin dünyasını onların gözünden görmek, köprüleri kalıcı kılar.',
    reversed:
      'Ters Asılan Adam, “askıda kalmışlık” ve kararsızlık iması kabulü yavaşlatabilir. Kurban anlatısı yerine, küçük gönüllü fedakârlıklar güveni büyütür.',
    keywords: ['perspektif', 'sabır', 'teslimiyet', 'empati', 'köprü'],
    context:
      'Zaman ve empati ile yumuşayan bir süreç. Gönüllü esneklik kabulü hızlandırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos6',
    card: 'Death',
    position: 6,
    upright:
      'Ölüm, aileyle ilişkide bir eşik atlamayı ve eski önyargıların bırakılmasıyla yeni bir sayfa açılmasını gösterir. Sağlıklı bir dönüşüm, kabulü daha sahici kılar.',
    reversed:
      'Ters Ölüm, geçmiş kalıplara takılı kalmanın kabulü geciktirebileceğini anlatır. Yumuşak vedalar ve net sınırlar, yeninin doğması için alan açar.',
    keywords: ['dönüşüm', 'bitiş', 'yeniden doğuş', 'eşik', 'serbest bırakma'],
    context:
      'Eski yargılara veda edilirse süreç hızlanır. Dönüşüm, kalıcı kabul getirir.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos6',
    card: 'Temperance',
    position: 6,
    upright:
      'Denge, ölçülü ve arabulucu tavrınla ailede uyum yaratabileceğini söyler. Tarzları karıştırmadan nazikçe harmanlamak, seni “birleştirici” olarak konumlar.',
    reversed:
      'Ters Denge, uçlara savrulan tutumlar ve aceleci yakınlaşma baskısı uyumu bozabilir. Orta yol ve dozunda temas, güveni adım adım inşa eder.',
    keywords: ['uyum', 'ölçü', 'sabır', 'sentez', 'uzlaşı'],
    context:
      'Nazik kalibrasyon kabulü besler. Aceleci hamleler yerine tutarlılık seç.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos6',
    card: 'The Devil',
    position: 6,
    upright:
      'Şeytan, kıskançlık, kontrol ya da bağımlılık temalarının aile algısını gölgeleyebileceğini işaret eder. Sınırlarına saygı ve şeffaf anlaşmalar, kaygıları yatıştırır.',
    reversed:
      'Ters Şeytan, sağlıksız dinamiklerden özgürleşme niyetiyle kabulün önündeki engellerin çözülebileceğini gösterir. Küçük “hayır”lar, büyük güven inşa eder.',
    keywords: ['gölge', 'sınır', 'kontrol', 'özgürleşme', 'şeffaflık'],
    context:
      'Tetikleyicileri adlandır, sınırları netleştir. Gölge aydınlandıkça kabul artar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos6',
    card: 'The Tower',
    position: 6,
    upright:
      'Kule, şok bir olay ya da sert bir gerçek anının aile algısını sarsabileceğini söyler. Ancak bu yıkım, daha dürüst ve sağlam bir zemin kurmak için fırsata dönüşebilir.',
    reversed:
      'Ters Kule, ertelenen patlamaların alttan alta gerilimi büyüttüğünü anlatır. Gerçeği zamanında ve ölçülü paylaşmak, krizi güvene çevirir.',
    keywords: ['kriz', 'hakikat', 'yıkım', 'yeniden inşa', 'arınma'],
    context:
      'Gerçeği saklamadan, nazik açıklıkla ilerle. Sonrasında kurulan yapı daha sağlam olur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos6',
    card: 'The Star',
    position: 6,
    upright:
      'Yıldız, sakin umut ve şeffaf iyileşme diliyle ailenin kalbini yumuşatabileceğini söyler. Sadelik ve içtenlik, güveni kendiliğinden büyütür.',
    reversed:
      'Ters Yıldız, umutsuzluk söylemi ve içe kapanma kabul yolunu daraltabilir. Küçük şifa anlarını görünür kılmak ışığı geri çağırır.',
    keywords: ['umut', 'şifa', 'sadelik', 'içtenlik', 'yenilenme'],
    context:
      'Az ama öz sevinçleri paylaş. Umut dili, kabulün kapılarını aralar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos6',
    card: 'The Moon',
    position: 6,
    upright:
      'Ay, belirsizlik ve projeksiyonların aile tarafında yanlış anlamalara yol açabileceğini söyler. Somut bilgi ve sakin açıklık, sis perdesini dağıtır.',
    reversed:
      'Ters Ay, sisin dağılmaya başladığını fakat güvensizlik izlerinin kalabileceğini anlatır. Tutarlı davranış ve zaman, kalanı iyileştirir.',
    keywords: ['belirsizlik', 'korku', 'projeksiyon', 'netlik', 'güven'],
    context: 'Varsayım yerine doğrulama seç. Netlik arttıkça kabul kolaylaşır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos6',
    card: 'The Sun',
    position: 6,
    upright:
      'Güneş, içten neşen ve açık karakterinle ailede sıcak bir kabul göreceğini söyler. Otantik başarılar ve gönülden teşekkürler, bağı güçlendirir.',
    reversed:
      'Ters Güneş, “iyimiş gibi” yüzeysel pozitiflik gerçeği gölgeleyebilir. Otantik sevinç ve açık iletişim, güveni geri getirir.',
    keywords: ['sevinç', 'otantiklik', 'netlik', 'sıcaklık', 'takdir'],
    context:
      'Sahici ışığını paylaş. Yapmacıklık değil, içtenlik aileyi ikna eder.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos6',
    card: 'Judgement',
    position: 6,
    upright:
      'Mahkeme, geçmiş yargıların adil bir değerlendirmeyle kapanabileceğini ve aileyle yeni bir çağrı/başlangıç doğabileceğini söyler. Öğrenilen dersleri olgunlukla ifade etmek saygıyı artırır.',
    reversed:
      'Ters Mahkeme, aşırı savunma ya da hiç sorumluluk almama eğilimi kabulü zorlaştırabilir. Şefkatli yüzleşme ve ölçülü özür, kapıları yeniden aralar.',
    keywords: ['yüzleşme', 'yenilenme', 'affediş', 'karar', 'saygı'],
    context: 'Geçmiş dosyaları şefkatle kapat. Olgun duruş, kabulün zeminidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos6',
    card: 'The World',
    position: 6,
    upright:
      'Dünya, aileyle bütünleşme ve döngüyü başarıyla tamamlama potansiyelini gösterir. Olgun, istikrarlı ve kapsayıcı tavrın, seni aile sistemine doğalca entegre eder.',
    reversed:
      'Ters Dünya, küçük eksik uçların (yarım konuşmalar, belirsiz roller) bütünlük duygusunu erteleyebileceğini anlatır. Entegrasyonu tamamlamak için açık bir çerçeve kurmak yeterlidir.',
    keywords: ['bütünlük', 'entegrasyon', 'tamamlama', 'aidiyet', 'istikrar'],
    context:
      'Eksik kalan başlıkları kapat. Tamamlanmış çember, kalıcı kabul getirir.',
    group: 'Majör Arkana',
  },

  // ========== KUPALAR (14) ==========
  {
    id: 'ace_of_cups_cu_pos6',
    card: 'Ace of Cups',
    position: 6,
    upright:
      'Kupaların Ası, ailenin seni kalpten kabul etmesi için güçlü bir duygusal açılımın mümkün olduğunu söyler. İçtenlik ve saf sevgiyle yaklaşmak, duygusal bağın temelini atar.',
    reversed:
      'Ters Kupaların Ası, duyguların ifade edilmemesi ya da kalbin kapalı tutulması ailede yanlış anlaşılmalara yol açabilir. Güvenli bir şekilde hislerini paylaşmak kapıları açar.',
    keywords: ['yeni başlangıç', 'duygu', 'açılım', 'samimiyet', 'bağ'],
    context:
      'Kalpten ve şeffaf bir başlangıç seni kolayca kabul ettirebilir. Saf sevgi, en güçlü anahtardır.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cu_pos6',
    card: 'Two of Cups',
    position: 6,
    upright:
      'Kupa İkilisi, aileyle karşılıklı uyum ve saygı içinde bir bağ kurabileceğini işaret eder. Samimi paylaşımlar köprüleri hızla güçlendirir.',
    reversed:
      'Ters Kupa İkilisi, aileyle yanlış anlaşılmalar veya denge kaybı ihtimalini gösterir. Açık sınırlar ve dürüst diyalog bu boşluğu kapatır.',
    keywords: ['uyum', 'saygı', 'eşitlik', 'karşılıklılık', 'güven'],
    context:
      'Karşılıklı saygı ve net iletişim kabul sürecini hızlandırır. Diyalog anahtardır.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cu_pos6',
    card: 'Three of Cups',
    position: 6,
    upright:
      'Kupa Üçlüsü, ailenin seni kutlama, sevinç ve birlik enerjisiyle kabul edebileceğini anlatır. Ortak etkinlikler bağların güçlenmesini sağlar.',
    reversed:
      'Ters Kupa Üçlüsü, yüzeysel bir birliktelik ya da kıskançlık temalarıyla mesafe oluşabileceğini işaret eder. Daha derin bağlara odaklanmak güveni artırır.',
    keywords: ['kutlama', 'birlik', 'dostluk', 'paylaşım', 'destek'],
    context:
      'Samimi ve neşeli paylaşımlar kabulü kolaylaştırır. Yüzeysellikten kaçınmak gerekir.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cu_pos6',
    card: 'Four of Cups',
    position: 6,
    upright:
      'Kupa Dörtlüsü, aile tarafında başta bir çekingenlik veya mesafeli tavır görülebileceğini söyler. Ancak önlerindeki fırsatı fark ettiklerinde seni kabule yönelirler.',
    reversed:
      'Ters Kupa Dörtlüsü, ailenin bakış açısını yenileyerek seni daha hızlı kabullenebileceğini anlatır. Ufak şükran ve içtenlik işareti büyük fark yaratır.',
    keywords: ['çekingenlik', 'mesafe', 'fırsat', 'uyanış', 'şükran'],
    context:
      'Başta mesafeli olabilirler. Zamanla farkındalıkla sıcaklık gelişir.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cu_pos6',
    card: 'Five of Cups',
    position: 6,
    upright:
      'Kupa Beşlisi, ailede geçmiş kayıplar ya da kırgınlıkların gölgesinin süreci zorlaştırabileceğini anlatır. Ancak elde olana odaklanmak yeni bir güven alanı yaratır.',
    reversed:
      'Ters Kupa Beşlisi, toparlanma ve kabullenme enerjisinin yükseldiğini söyler. Umudu yeniden yeşertmek seni kabullerine kolayca taşır.',
    keywords: ['kayıp', 'yas', 'kabul', 'şifa', 'umut'],
    context:
      'Geçmiş gölgeler sürece etki edebilir. Umuda odaklanmak kapıyı açar.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cu_pos6',
    card: 'Six of Cups',
    position: 6,
    upright:
      'Kupa Altılısı, nostalji ve içtenlik sayesinde aile seni geçmiş sıcaklıklarıyla bağdaştırabilir. İçten şefkat bağları kabulü kolaylaştırır.',
    reversed:
      'Ters Kupa Altılısı, geçmişe aşırı tutunma ya da karşılaştırmalar kabulü geciktirebilir. Anıyı onurlandırıp bugüne odaklanmak güveni artırır.',
    keywords: ['nostalji', 'şefkat', 'geçmiş', 'sıcaklık', 'hatıra'],
    context:
      'Geçmişle sıcak bağ kurmak aileyi yumuşatır. Bugünle dengelemek gerekir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cu_pos6',
    card: 'Seven of Cups',
    position: 6,
    upright:
      'Kupa Yedilisi, ailede birçok seçenek ya da fikir nedeniyle kararsızlık yaşanabileceğini gösterir. Net ölçütler koyarak güvenlerini kazanabilirsin.',
    reversed:
      'Ters Kupa Yedilisi, ailedeki kafa karışıklığının çözülmeye başladığını gösterir. Gerçekçi yaklaşımlar kabulü hızlandırır.',
    keywords: ['kararsızlık', 'hayal', 'netlik', 'seçenek', 'vizyon'],
    context:
      'Ailede kafa karışıklığı olabilir. Gerçekçi ve net tutum kabul getirir.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cu_pos6',
    card: 'Eight of Cups',
    position: 6,
    upright:
      'Kupa Sekizlisi, aile tarafında önce mesafe koyma ya da seni tanımakta zorlanma görülebilir. Ancak senin olgun duruşun zamanla yakınlaşmayı sağlar.',
    reversed:
      'Ters Kupa Sekizlisi, gitmek-kalmak ikileminin ailenin kabul sürecini zorlaştırabileceğini söyler. Kararlılık ve istikrar güveni getirir.',
    keywords: ['mesafe', 'arayış', 'olgunluk', 'kararlılık', 'yakınlaşma'],
    context:
      'Başta çekilme olabilir ama olgunlukla güven sağlanır. Kararlılık önemlidir.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cu_pos6',
    card: 'Nine of Cups',
    position: 6,
    upright:
      'Kupa Dokuzlusu, ailenin seni huzur ve mutluluk kaynağı olarak görebileceğini söyler. Samimi paylaşımlar tatmini artırır.',
    reversed:
      'Ters Kupa Dokuzlusu, yüzeysel haz ya da doyumsuzluk algısı kabulü zorlaştırabilir. Gerçekçi ve değer odaklı yaklaşım bu algıyı kırar.',
    keywords: ['mutluluk', 'tatmin', 'samimiyet', 'şükran', 'bolluk'],
    context:
      'Sıcak ve şükür dolu tavrın kabul getirir. Yüzeysellikten uzak durmalısın.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cu_pos6',
    card: 'Ten of Cups',
    position: 6,
    upright:
      'Kupa Onlusu, aile içinde uyum ve birlik duygusunun kolayca gelişeceğini gösterir. Sen, onlara bütünlüğün parçası gibi hissettirebilirsin.',
    reversed:
      'Ters Kupa Onlusu, ideal ile gerçek arasında fark algısı olabilir. Sahici ve açık diyalog aile bağlarını onarır.',
    keywords: ['uyum', 'aile', 'birlik', 'huzur', 'gerçeklik'],
    context: 'Bütünlük enerjin aileyi etkiler. Sahicilik güveni pekiştirir.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cu_pos6',
    card: 'Page of Cups',
    position: 6,
    upright:
      'Kupa Prensi, masumiyetin ve yaratıcı sezgilerin aileyi sana yakınlaştırabileceğini söyler. Küçük jestler ve duyarlı ifadeler kabulü büyütür.',
    reversed:
      'Ters Kupa Prensi, aşırı hassasiyet ya da çocukça algı ailede mesafe yaratabilir. Duyguları olgunlukla dengelemek güven sağlar.',
    keywords: ['masumiyet', 'hassasiyet', 'ilham', 'yaratıcılık', 'jest'],
    context:
      'İçten ve sevecen tavır bağları güçlendirir. Olgunluk denge getirir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cu_pos6',
    card: 'Knight of Cups',
    position: 6,
    upright:
      'Kupa Şövalyesi, romantik ve zarif yaklaşımının aileyi etkileyeceğini söyler. İncelikli davranışlar seni kolayca kabullerine taşır.',
    reversed:
      'Ters Kupa Şövalyesi, tutarsız vaatler ya da aşırı idealist tavırlar ailede kuşku yaratabilir. Netlik ve süreklilikle güven sağlanır.',
    keywords: ['romantizm', 'zarafet', 'teklif', 'samimiyet', 'netlik'],
    context: 'Nazik ve tutarlı duruş kabul getirir. Abartıdan uzak durmalısın.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cu_pos6',
    card: 'Queen of Cups',
    position: 6,
    upright:
      'Kupa Kraliçesi, şefkatli ve empatik duruşunun aile tarafından çok kıymetli görüleceğini söyler. Güvenli duygusal alan kabulü kolaylaştırır.',
    reversed:
      'Ters Kupa Kraliçesi, sınırların erimesi ya da duygusal taşma ailede karmaşa yaratabilir. Öz-düzenleme ile uyum sağlanır.',
    keywords: ['şefkat', 'empati', 'sezgi', 'sınır', 'güven'],
    context: 'Şefkatli alan kabulün anahtarıdır. Duygu taşkınlığına dikkat et.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cu_pos6',
    card: 'King of Cups',
    position: 6,
    upright:
      'Kupa Kralı, duygusal olgunluğun ve sakin liderliğin aileye güven vereceğini söyler. Fırtınalı anda bile dengeli oluşun kabulü hızlandırır.',
    reversed:
      'Ters Kupa Kralı, bastırılmış duygu ya da pasif agresif tavırlar ailede güvensizlik yaratabilir. Açık ve dengeli iletişimle bu engel aşılır.',
    keywords: ['olgunluk', 'denge', 'liderlik', 'duygu', 'güven'],
    context: 'Duygusal denge aileye güven verir. Açık ifade kabulü besler.',
    group: 'Kupalar',
  },

  // ========== KILIÇLAR (14) ==========
  {
    id: 'ace_of_swords_ma_pos6',
    card: 'Ace of Swords',
    position: 6,
    upright:
      'Aile içinde açık iletişim ve netlik öne çıkar. Başlangıçta keskin sorular ve sınamalar olsa da, dürüstlüğünüz ve kararlı tavrınız güven inşa edecektir. Net cümleler ve açık niyetler sayesinde kabul görme şansınız artar.',
    reversed:
      'Yanlış anlaşılmalar, gizli gerilimler veya belirsiz ifadeler aile bağlarını zedeleyebilir. Söylenmeyenler birikerek mesafeye sebep olabilir. Şeffaflık yerine suskunluk seçilirse, kabul süreci uzar ve gerginleşir.',
    keywords: ['netlik', 'iletişim', 'hakikat', 'başlangıç', 'dürüstlük'],
    context:
      'Açık sözlülük ve net niyet aile kabulünü kolaylaştırır. İletişimde eksiklik mesafe yaratabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ma_pos6',
    card: 'Two of Swords',
    position: 6,
    upright:
      'Aile, sizi kabul etme konusunda kararsızlık yaşıyor olabilir. Görünürde tarafsızlık veya mesafe olsa da, sabır ve anlayışla köprü kurma şansınız vardır. İlişkinizi zamanla gözlemleyip dengeyi bulmaları mümkündür.',
    reversed:
      'Kararsızlık yerini açık bir redde ya da katı tavra bırakabilir. Aile, sizi yeterince tanımadan ön yargı geliştirebilir. Diyaloğa kapalı olurlarsa kabul süreci yavaşlar.',
    keywords: ['kararsızlık', 'denge', 'ön yargı', 'bekleme', 'sınama'],
    context:
      'Aile başta kararsız kalabilir. Sabırla ve zamanla kabul mümkün, acele etmemek gerekir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ma_pos6',
    card: 'Three of Swords',
    position: 6,
    upright:
      'Aile kabul sürecinde geçmiş kırgınlıklar veya duygusal yaralar devreye girebilir. Kalplerinde sizi kabul etmelerini zorlaştıran bir kayıp, hayal kırıklığı veya aile içi gerginlik olabilir. Sizin şefkatli yaklaşımınız bu yaraları hafifletebilir.',
    reversed:
      'Eski kırgınlıklar konuşulmadan bastırıldığında, soğukluk ve mesafe artabilir. İyileşme için gerekli yüzleşmeler yapılmazsa aile bağları sizi zorlayabilir. Süreç, zamanla ve anlayışla yumuşatılmalıdır.',
    keywords: ['kırgınlık', 'mesafe', 'yaralar', 'soğukluk', 'iyileşme'],
    context:
      'Aile geçmiş yaraların gölgesinde olabilir. Şefkatli yaklaşım kabul yolunu açabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ma_pos6',
    card: 'Four of Swords',
    position: 6,
    upright:
      'Ailenin sizi kabul etmesi zaman alacaktır. İlk etapta sessizlik, mesafe ve temkinli bir gözlem süreci vardır. Onların ritmini bekleyerek, sabırlı olmanız süreci olumlu etkiler.',
    reversed:
      'Ailede bitmeyen kuşkular veya geçmişten gelen kaygılar olabilir. Sessizlik kabulün değil, kalıcı bir mesafenin işareti haline gelebilir. Çabalarınıza rağmen duvarlar inatla yerinde kalabilir.',
    keywords: ['bekleme', 'dinlenme', 'gözlem', 'mesafe', 'sabır'],
    context:
      'Başta sessizlik ve mesafe olabilir. Zaman tanırsanız aile kabul süreci kolaylaşır.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ma_pos6',
    card: 'Five of Swords',
    position: 6,
    upright:
      'Ailede fikir çatışmaları ve güç mücadeleleri sizi zorlayabilir. Haklı çıkma çabası kabul sürecini geciktirebilir. Ancak siz köprüleri koruyarak geri adım atarsanız, orta yol bulunabilir.',
    reversed:
      'Çatışmalar daha da büyüyerek sizi dışarıda bırakma riskini artırabilir. Aile içi tartışmaların hedefinde kalabilir ve kırıcı sözlerle karşılaşabilirsiniz. Barış yerine inatla sürdürülmüş kavgalar süreci yıpratır.',
    keywords: ['çatışma', 'ego', 'haklılık', 'güç mücadelesi', 'mesafe'],
    context:
      'Aile içinde çatışmalar gündeme gelebilir. Uzlaşmacı tavır kabul için anahtar olacaktır.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ma_pos6',
    card: 'Six of Swords',
    position: 6,
    upright:
      'Aile sizi zamanla daha sakin ve kabul edici bir noktaya taşıyabilir. Zor süreçlerden sonra huzura giden bir köprü vardır. Ortak bir amaç ya da yolculuk sizi yakınlaştırabilir.',
    reversed:
      'Aile, geçmiş düşünce kalıplarını geride bırakmakta zorlanabilir. Sizi tanımadan sabit yargılarla davranabilirler. Kabul süreci bu yüzden gecikebilir veya sancılı olabilir.',
    keywords: ['geçiş', 'huzur', 'uyum', 'yolculuk', 'kabullenme'],
    context:
      'Zamanla aile daha kabul edici olabilir. Geçmişten çıkışları zaman alabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ma_pos6',
    card: 'Seven of Swords',
    position: 6,
    upright:
      'Ailenin size yaklaşımında temkin ve kuşku olabilir. Onların gözünde sınanmanız gerekebilir. Dürüstlüğünüzü göstermeniz, güveni artıracaktır.',
    reversed:
      'Aile, sizi açıkça reddetmek yerine perde arkasında itiraz edebilir. Küçük oyunlar veya gizli güvensizlikler süreci zorlaştırabilir. Netleşmeyen tavırlar kalıcı soğukluk yaratır.',
    keywords: ['kuşku', 'gizlilik', 'strateji', 'güven', 'sınama'],
    context:
      'Aile temkinli davranabilir. Net dürüstlük güveni artırıp kabul yolunu açar.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ma_pos6',
    card: 'Eight of Swords',
    position: 6,
    upright:
      'Ailedeki bazı bireyler kendi önyargılarına sıkışmış olabilir. Sizi gerçekten görmekte zorlanabilirler. Sabırla ve küçük adımlarla bu algıları değiştirmek mümkündür.',
    reversed:
      'Önyargılar yerini yavaş yavaş esnekliğe bırakabilir. Ancak eski düşünce kalıpları tamamen çözülmedikçe sizi dışarıda tutmaya devam edebilirler. Dönüşüm için daha fazla çaba gerekebilir.',
    keywords: ['kısıtlılık', 'önyargı', 'algı', 'sabır', 'engeller'],
    context:
      'Aile önyargılarla hareket edebilir. Küçük sabırlı adımlar algılarını değiştirebilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ma_pos6',
    card: 'Nine of Swords',
    position: 6,
    upright:
      'Ailede kaygı ve endişeler sizi kabul etmelerini zorlaştırabilir. Uykusuz geceler, korkular ve abartılmış senaryolar gündeme gelebilir. Zamanla bu kaygıların yersiz olduğu ortaya çıkacaktır.',
    reversed:
      'Kaygılar hafiflese bile kalıcı bir şüphe veya huzursuzluk kalabilir. Aile, sizi tam olarak kucaklamakta zorlanabilir. Bu durum ilişkiye gölge düşürebilir.',
    keywords: ['kaygı', 'korku', 'şüphe', 'endişe', 'uykusuzluk'],
    context:
      'Ailenin kaygıları kabulü geciktirebilir. Zamanla bu endişeler yersizleşebilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ma_pos6',
    card: 'Ten of Swords',
    position: 6,
    upright:
      'Aileden kesin bir red veya sonlandırma tavrı görülebilir. Bu durum ilk etapta ağır gelse de, zamanla başka bir kapının açılmasına sebep olabilir. Gerçeği bilmek, sizi özgürleştirir.',
    reversed:
      'Aileyle yaşanan sert bir kırılma yavaş yavaş toparlanmaya başlayabilir. Ancak tam bir kabul için süreç çok yavaş ilerleyebilir. İyileşme zaman alacaktır.',
    keywords: ['son', 'reddedilme', 'kırılma', 'özgürleşme', 'iyileşme'],
    context:
      'Aile kesin bir red gösterebilir. Yavaş da olsa zamanla toparlanma ihtimali vardır.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ma_pos6',
    card: 'Page of Swords',
    position: 6,
    upright:
      'Aile sizi daha çok gözlemlemek isteyecektir. Sorular sorabilir, davranışlarınızı sınayabilir. Meraklarını dürüst ve sabırlı şekilde karşılamak kabulü kolaylaştırır.',
    reversed:
      'Aşırı merak, dedikodu veya yanlış yorumlamalar ailede kabulü zorlaştırabilir. Hakkınızda yanılgılar oluşabilir. Sabırlı iletişim bu algıları zamanla düzeltebilir.',
    keywords: ['gözlem', 'merak', 'soru', 'öğrenme', 'sabır'],
    context: 'Aile sizi sınayabilir. Dürüst cevaplarınız kabul yolunu açar.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ma_pos6',
    card: 'Knight of Swords',
    position: 6,
    upright:
      'Aile hızlı yargılar ve acele kararlarla hareket edebilir. Ancak siz sakin ve ölçülü durduğunuzda bu fırtına kısa sürede dağılabilir. Cesur ama sabırlı duruşunuz takdir toplayabilir.',
    reversed:
      'Ailenin aceleci ve saldırgan tavrı sizi köşeye sıkıştırabilir. Gerginlikler büyüyerek kabul şansını zayıflatabilir. Bu noktada mesafe koymak gerekebilir.',
    keywords: ['acelecilik', 'karar', 'cesaret', 'fırtına', 'ölçülülük'],
    context:
      'Aile hızlı yargılar verebilir. Sakin duruşunuz takdir toplayabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ma_pos6',
    card: 'Queen of Swords',
    position: 6,
    upright:
      'Ailede mantıklı ve soğukkanlı bir figür sizi değerlendirecektir. Duygularından çok mantığıyla hareket eder. Ona karşı samimi ve saygılı olmanız kabul sürecinde kilit rol oynar.',
    reversed:
      'Bu figür aşırı eleştirel olabilir ve kusurlarınıza odaklanabilir. Sizi sürekli sınayan bir tavırla mesafe koyabilir. Fazla soğuk yaklaşımı kabulü zorlaştırabilir.',
    keywords: ['mantık', 'eleştiri', 'soğukkanlılık', 'otorite', 'mesafe'],
    context:
      'Ailede mantıklı bir figür sizi sınayabilir. Saygılı tavrınız kabulü kolaylaştırır.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ma_pos6',
    card: 'King of Swords',
    position: 6,
    upright:
      'Ailede otoriter ve ilkelerine bağlı biri size karar verebilir. Dürüst, net ve sorumluluk sahibi olduğunuzu gösterdiğinizde kabul etmesi muhtemeldir. Kurallara uygun hareket etmeniz önemlidir.',
    reversed:
      'Aşırı katı ve kurallara saplanmış biri sizi dışarıda bırakabilir. Duygusal yakınlık yerine sadece mantıkla yaklaşabilir. Bu soğuk tavır kabulü zorlaştırır.',
    keywords: ['otorite', 'kural', 'dürüstlük', 'sorumluluk', 'soğukluk'],
    context:
      'Ailede otoriter figür karar verebilir. Net ve sorumlu tavrınız kabul sağlar.',
    group: 'Kılıçlar',
  },

  // ========== TILSIMLAR (14) ==========
  {
    id: 'ace_of_pentacles_ma_pos6',
    card: 'Ace of Pentacles',
    position: 6,
    upright:
      'Aile, size başlangıçta fırsat gözüyle bakabilir. Sağlamlık, güvenilirlik ve maddi istikrar onlara güven verecek. Somut adımlarınız ve ciddi niyetiniz kabul sürecini hızlandırabilir.',
    reversed:
      'Aile sizi fırsatçı ya da güvensiz algılayabilir. Maddi endişeler veya gelecek kaygıları kabulü zorlaştırabilir. Somut kanıtlar eksik olduğunda şüphe artar.',
    keywords: ['fırsat', 'güven', 'başlangıç', 'istikrar', 'somutluk'],
    context:
      'Aile güven arar. Somut adımlarınız kabul yolunu açar, eksiklik güvensizlik yaratır.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ma_pos6',
    card: 'Two of Pentacles',
    position: 6,
    upright:
      'Aile sizi dengede görmeye çalışır. Farklı sorumlulukları uyumla taşımanız onların gözünde değerli olacaktır. Esneklik ve uyum kapasiteniz kabul sürecini kolaylaştırır.',
    reversed:
      'Ailenin gözünde sorumlulukları yönetemeyen veya kararsız bir imaj bırakabilirsiniz. Bu durum güven vermediği için kabul süreci uzayabilir. Fazla dağınıklık kuşku yaratır.',
    keywords: ['denge', 'esneklik', 'sorumluluk', 'uyum', 'karar'],
    context:
      'Sorumlulukları dengeli taşımak kabulü kolaylaştırır. Dağınıklık güvensizlik yaratabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ma_pos6',
    card: 'Three of Pentacles',
    position: 6,
    upright:
      'Aile sizi işbirlikçi ve uyumlu bir kişi olarak değerlendirebilir. Rolünüzü netleştirip katkınızı gösterdiğinizde sizi takdir ederler. Ortak emek kabulün yolunu açar.',
    reversed:
      'Uyum yerine bencillik ya da işbirliği eksikliği algısı ailede mesafe yaratır. Katkınızı göstermediğinizde değeriniz sorgulanabilir. Kabul için daha fazla işbirliği şarttır.',
    keywords: ['işbirliği', 'katkı', 'uyum', 'emek', 'değer'],
    context:
      'Katkınızı ve uyumunuzu göstermek aile kabulünü kolaylaştırır. Eksik işbirliği kuşku yaratır.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ma_pos6',
    card: 'Four of Pentacles',
    position: 6,
    upright:
      'Aile sizi güvenli ve tutumlu biri olarak görebilir. Onlara göre siz değerleri koruyan birisiniz. Sahiplenici tavrınız güven hissi verebilir.',
    reversed:
      'Aile sizi aşırı tutucu veya bencil algılayabilir. Maddi veya manevi açıdan paylaşmayan biri olarak görülmek kabulü zorlaştırır. Fazla kontrol mesafe doğurur.',
    keywords: ['güvenlik', 'koruma', 'sahiplenme', 'tutuculuk', 'paylaşım'],
    context:
      'Güven verici tavırlar kabulü hızlandırır. Aşırı tutuculuk mesafe yaratır.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ma_pos6',
    card: 'Five of Pentacles',
    position: 6,
    upright:
      'Aile ilk etapta sizi yoksunluk veya eksiklik üzerinden değerlendirebilir. Ancak dayanıklılığınızı ve destek arayışınızı gördüklerinde empati kurabilirler. Zor zamanları birlikte aşma isteğiniz kabulü artırır.',
    reversed:
      'Aile, sizi yük gibi algılayabilir. Maddi ya da manevi eksiklikler fazla öne çıktığında, güven kırılabilir. Yetersizlik algısı kabul sürecini zorlaştırır.',
    keywords: ['eksiklik', 'destek', 'dayanıklılık', 'empati', 'yoksunluk'],
    context:
      'Eksiklikten çok dayanıklılık göstermek kabulü kolaylaştırır. Aksi halde yük algısı oluşur.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ma_pos6',
    card: 'Six of Pentacles',
    position: 6,
    upright:
      'Aile sizi adil ve paylaşımcı biri olarak görebilir. Verme-alma dengesini korumanız onlara güven verecektir. Şeffaf ve dengeli tavırlarınız kabulü hızlandırır.',
    reversed:
      'Aile sizi dengesiz ya da çıkarcı algılayabilir. Güç dengesizliği veya koşullu paylaşımlar kabul sürecini zorlaştırır. Açık olmayan tavırlar şüphe uyandırır.',
    keywords: ['paylaşım', 'adalet', 'denge', 'şeffaflık', 'güven'],
    context:
      'Adil ve dengeli olmak kabul yolunu açar. Dengesizlik veya çıkar algısı mesafe yaratır.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ma_pos6',
    card: 'Seven of Pentacles',
    position: 6,
    upright:
      'Aile sizi sabırlı ve planlı biri olarak görebilir. Emek vermeniz ve istikrarlı duruşunuz onları ikna edebilir. Süreç yavaş ama olumlu şekilde ilerler.',
    reversed:
      'Aile, sabırsızlık ya da sonuçsuz çabalar görürse güveni zedelenebilir. Emeksiz beklenti kabulü zorlaştırır. Sonuç göstermeden sabırsız davranmak aileyi uzaklaştırır.',
    keywords: ['sabır', 'emek', 'plan', 'istikrar', 'bekleyiş'],
    context:
      'Sabır ve istikrarlı emek kabulü kolaylaştırır. Sonuçsuz çabalar aileyi uzaklaştırır.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ma_pos6',
    card: 'Eight of Pentacles',
    position: 6,
    upright:
      'Aile sizi çalışkan, becerikli ve özverili biri olarak değerlendirebilir. Düzenli çabanız ve disiplininiz güven verecektir. İstikrar kabulün temelini atar.',
    reversed:
      'Özensizlik veya çabadan kaçış algısı aileyi rahatsız eder. Emeksizlik güveni sarsar. Çalışma disiplini göstermemek kabul sürecini zorlaştırır.',
    keywords: ['çalışkanlık', 'beceri', 'istikrar', 'disiplin', 'emek'],
    context: 'Disiplinli çaba güven sağlar. Emeksizlik kabulü zorlaştırır.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ma_pos6',
    card: 'Nine of Pentacles',
    position: 6,
    upright:
      'Aile sizi bağımsız, güçlü ve öz-değer sahibi biri olarak görebilir. Zarif ve dengeli duruşunuz onlara güven verir. Kendi ayakları üzerinde duran kişi olarak takdir edilebilirsiniz.',
    reversed:
      'Aile sizi aşırı bağımlı ya da savurgan görebilir. Öz-değer eksikliği ya da disiplinsizlik kabul sürecini zorlaştırır. Dengesizlik güveni sarsar.',
    keywords: ['bağımsızlık', 'öz değer', 'zarafet', 'denge', 'güven'],
    context:
      'Bağımsızlık ve öz değer kabulü hızlandırır. Bağımlılık ve savurganlık mesafe yaratır.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ma_pos6',
    card: 'Ten of Pentacles',
    position: 6,
    upright:
      'Aile sizi uzun vadeli istikrar sağlayabilecek biri olarak görebilir. Geleneksel değerlerle uyum göstermeniz kabulü kolaylaştırır. Güçlü bir aile bağı kurma potansiyeliniz takdir edilir.',
    reversed:
      'Aile, sizi kendi gelenekleriyle uyumsuz veya güven vermeyen biri gibi algılayabilir. Maddi veya kültürel farklar kabul sürecini zorlaştırır. Aile değerleriyle çatışma mesafe yaratır.',
    keywords: ['aile', 'istikrar', 'gelenek', 'uzun vadeli', 'uyum'],
    context:
      'Aile değerleriyle uyum göstermek kabulü kolaylaştırır. Uyuşmazlık mesafe yaratır.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ma_pos6',
    card: 'Page of Pentacles',
    position: 6,
    upright:
      'Aile sizi öğrenmeye açık, gelişime istekli ve sorumluluk sahibi biri olarak görebilir. Küçük ama kararlı adımlarınız güven uyandırır. Ciddiyetiniz kabul sürecini destekler.',
    reversed:
      'Aile sizi dağınık, dikkatsiz ya da tembel algılayabilir. Hedefsiz tavırlar kabul sürecini zorlaştırır. İlgisizlik güveni kırar.',
    keywords: ['öğrenme', 'hedef', 'sorumluluk', 'gelişim', 'ciddiyet'],
    context:
      'Öğrenme ve gelişim isteği kabulü artırır. Hedefsizlik mesafe yaratır.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ma_pos6',
    card: 'Knight of Pentacles',
    position: 6,
    upright:
      'Aile sizi güvenilir, çalışkan ve istikrarlı biri olarak değerlendirebilir. Yavaş ama emin adımlarınız kabulü kolaylaştırır. Onlara göre siz güven veren bir eş adayı olabilirsiniz.',
    reversed:
      'Aile sizi durağan, yeniliğe kapalı ya da sorumluluk almayan biri olarak algılayabilir. Aşırı temkin kabulü zorlaştırır. İlerleme göstermemek şüphe doğurur.',
    keywords: ['istikrar', 'çalışkanlık', 'güvenilirlik', 'sabır', 'emek'],
    context:
      'Güvenilir ve çalışkan tavırlar kabul sağlar. Durağanlık ya da isteksizlik şüphe doğurur.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ma_pos6',
    card: 'Queen of Pentacles',
    position: 6,
    upright:
      'Aile sizi şefkatli, pratik ve destekleyici biri olarak görebilir. Hem kaynakları yönetmeniz hem de sıcak yaklaşımınız güven uyandırır. Ev ve aile odaklı duruşunuz takdir edilecektir.',
    reversed:
      'Aile sizi aşırı yüklenen veya ilgisiz biri olarak algılayabilir. Kaynak yönetiminde zorluk ya da ilgisizlik kabulü zorlaştırır. Fazla soğukluk ailede mesafe yaratır.',
    keywords: ['şefkat', 'pratiklik', 'kaynak yönetimi', 'güven', 'destek'],
    context:
      'Şefkatli ve pratik duruş kabulü kolaylaştırır. İlgisizlik veya zorluk mesafe yaratır.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ma_pos6',
    card: 'King of Pentacles',
    position: 6,
    upright:
      'Aile sizi güçlü, güvenilir ve liderlik vasıfları olan biri olarak görebilir. Maddi ve manevi istikrarınız kabul sürecini kolaylaştırır. Otoriteniz ve sağlamlığınız saygı uyandırır.',
    reversed:
      'Aile sizi aşırı kontrolcü, statü odaklı ya da bencil görebilir. Maddi üstünlük vurgusu kabulü zorlaştırır. Fazla katı olmak ailede direnç yaratır.',
    keywords: ['güven', 'istikrar', 'liderlik', 'otorite', 'saygı'],
    context:
      'Güvenilir ve otoriter duruş kabulü artırır. Aşırı kontrol mesafe yaratır.',
    group: 'Tılsımlar',
  },

  // ========== ASALAR (14) ==========
  {
    id: 'ace_of_wands_ma_pos6',
    card: 'Ace of Wands',
    position: 6,
    upright:
      'Aile sizi yeni bir enerji ve canlılıkla görebilir. Cesur adımlarınız ve içten niyetiniz kabul edilmeyi kolaylaştırır. Onlar için siz, aileye taze bir soluk getirebilirsiniz.',
    reversed:
      'Aile sizi hevesli ama tutarsız algılayabilir. Adımlarınız netlikten uzak görünürse güven zedelenebilir. İstikrarsızlık kabul sürecini zorlaştırır.',
    keywords: ['enerji', 'başlangıç', 'cesaret', 'heves', 'canlılık'],
    context:
      'Yeni enerji kabulü hızlandırır. İstikrarsızlık ailede kuşku yaratır.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ma_pos6',
    card: 'Two of Wands',
    position: 6,
    upright:
      'Aile sizi vizyoner ve planlı biri olarak değerlendirebilir. Geleceğe dair sağlam planlarınız onları ikna eder. Ufkunuz genişse kabul kolaylaşır.',
    reversed:
      'Aile sizi kararsız veya yönsüz biri gibi görebilir. Plan eksikliği güveni azaltır. Geleceğe dair belirsizlik ailede mesafe yaratır.',
    keywords: ['vizyon', 'plan', 'gelecek', 'karar', 'ufuk'],
    context:
      'Gelecek planları güven uyandırır. Belirsizlik kabulü zorlaştırır.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ma_pos6',
    card: 'Three of Wands',
    position: 6,
    upright:
      'Aile sizi genişleme ve ilerleme fırsatıyla ilişkilendirebilir. Açık görüşlü ve işbirliğine yatkın tavırlarınız onları memnun eder. Geniş ufuk kabulü kolaylaştırır.',
    reversed:
      'Aile sizi dar görüşlü ya da ilerleme göstermeyen biri olarak algılayabilir. Beklentileri karşılamamak kabulü geciktirir. Ufuksuzluk güven kırar.',
    keywords: ['genişleme', 'ilerleme', 'işbirliği', 'ufuk', 'açıklık'],
    context: 'Geniş görüş kabulü artırır. Dar bakış açısı aileyi soğutabilir.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ma_pos6',
    card: 'Four of Wands',
    position: 6,
    upright:
      'Aile sizi kutlama ve birlik ruhu getiren biri olarak görebilir. Uyumlu ve sıcak tavırlarınız aileye aidiyet hissi kazandırır. Onlarla kaynaşma isteğiniz kabul sürecini kolaylaştırır.',
    reversed:
      'Aile sizi mesafeli ya da aidiyet duygusu eksik biri olarak algılayabilir. Kutlamalara uyumsuzluk kabulü zorlaştırır. Dışarıda kalma hali güveni sarsar.',
    keywords: ['kutlama', 'aidiyet', 'uyum', 'birlik', 'kaynaşma'],
    context:
      'Uyum ve aidiyet kabulü kolaylaştırır. Mesafe algısı ailede direnç yaratır.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ma_pos6',
    card: 'Five of Wands',
    position: 6,
    upright:
      'Aile sizi enerjik ama zaman zaman rekabetçi bulabilir. Sağlıklı tartışmalarla kendinizi ifade etmeniz kabul görmenizi sağlar. Çatışmayı yapıcı kılmak önemlidir.',
    reversed:
      'Aile sizi kavga çıkaran ya da uyumsuz biri olarak görebilir. Gereksiz gerilim kabulü zorlaştırır. Sertlik güveni sarsar.',
    keywords: ['enerji', 'tartışma', 'rekabet', 'ifade', 'uyum'],
    context: 'Yapıcı ifade kabulü artırır. Gereksiz kavga kabulü zorlaştırır.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ma_pos6',
    card: 'Six of Wands',
    position: 6,
    upright:
      'Aile sizi başarılı ve takdir edilen biri olarak görebilir. Zaferleriniz ve görünür başarılarınız kabulünüzü hızlandırır. Başarı ailede gurur uyandırır.',
    reversed:
      'Aile sizi abartılı ya da kendini beğenmiş algılayabilir. Takdir görmeme kabulü zorlaştırır. Fazla gurur ailede mesafe yaratır.',
    keywords: ['başarı', 'takdir', 'görünürlük', 'zafer', 'gurur'],
    context: 'Başarı ailede güven yaratır. Aşırı gurur kabulü zorlaştırır.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ma_pos6',
    card: 'Seven of Wands',
    position: 6,
    upright:
      'Aile sizi kararlı ve duruşunu koruyan biri olarak görebilir. Savunduğunuz değerleriniz kabulünüzü kolaylaştırır. Tutarlılık güven verir.',
    reversed:
      'Aile sizi inatçı ya da aşırı savunmacı bulabilir. Esnekliğin eksikliği kabul sürecini zorlaştırır. Fazla sert duruş ailede direnç doğurur.',
    keywords: ['kararlılık', 'savunma', 'değerler', 'tutarlılık', 'güven'],
    context:
      'Kararlı duruş kabulü kolaylaştırır. Fazla sertlik ailede mesafe yaratır.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ma_pos6',
    card: 'Eight of Wands',
    position: 6,
    upright:
      'Aile sizi hızlı uyum sağlayan ve iletişime açık biri olarak görebilir. Akışla hareket etmeniz onları rahatlatır. Net ve hızlı cevaplar güven yaratır.',
    reversed:
      'Aile sizi aceleci veya iletişimde yetersiz bulabilir. Karmaşa ve gecikme kabul sürecini zorlaştırır. Belirsizlik aileyi tedirgin eder.',
    keywords: ['iletişim', 'uyum', 'hız', 'netlik', 'akış'],
    context: 'Hızlı uyum ve netlik kabulü artırır. Karmaşa aileyi zorlar.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ma_pos6',
    card: 'Nine of Wands',
    position: 6,
    upright:
      'Aile sizi dayanıklı ve azimli biri olarak görebilir. Zorluklara karşı direnciniz onların gözünde değerli olur. Sabrınız kabulünüzü kolaylaştırır.',
    reversed:
      'Aile sizi fazla yorgun veya kapanmış biri olarak görebilir. Savunmacı tavırlar kabulü zorlaştırır. Tükenmişlik güveni azaltır.',
    keywords: ['dayanıklılık', 'azim', 'sabır', 'direnç', 'koruma'],
    context: 'Azim kabulü artırır. Yorgunluk ve kapanma ailede şüphe yaratır.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ma_pos6',
    card: 'Ten of Wands',
    position: 6,
    upright:
      'Aile sizi sorumluluk alan ve yük taşıyan biri olarak görebilir. Çabanız ve fedakârlığınız kabulünüzü hızlandırır. Onlara göre siz güvenilir bir destek olabilirsiniz.',
    reversed:
      'Aile sizi aşırı yük altında ezilen biri olarak görebilir. Fazla sorumluluk almak güçsüzlük algısı yaratabilir. Bu durum kabulü zorlaştırır.',
    keywords: ['sorumluluk', 'yük', 'fedakârlık', 'çaba', 'güvenilirlik'],
    context:
      'Fedakârlık kabulü kolaylaştırır. Aşırı yük algısı mesafe yaratır.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ma_pos6',
    card: 'Page of Wands',
    position: 6,
    upright:
      'Aile sizi meraklı, hevesli ve öğrenmeye açık biri olarak görebilir. Yeni fikirlere açıklığınız onları etkiler. Canlılık kabulünüzü kolaylaştırır.',
    reversed:
      'Aile sizi dağınık ya da çocuksu algılayabilir. Fazla istikrarsızlık güveni sarsar. Hevesin çabuk sönmesi kabulü zorlaştırır.',
    keywords: ['merak', 'heves', 'öğrenme', 'canlılık', 'açıklık'],
    context:
      'Heves ve merak kabulü hızlandırır. Dağınıklık ailede güveni azaltır.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ma_pos6',
    card: 'Knight of Wands',
    position: 6,
    upright:
      'Aile sizi enerjik, cesur ve atılgan biri olarak görebilir. Tutkunuz kabulünüzü hızlandırır. Onlara göre siz, hayatı canlandıran bir figürsünüz.',
    reversed:
      'Aile sizi sabırsız ya da savruk bulabilir. Tutarlılık eksikliği güveni sarsar. Fazla acelecilik kabul sürecini zorlaştırır.',
    keywords: ['cesaret', 'enerji', 'tutku', 'atılım', 'canlılık'],
    context: 'Cesur enerji kabulü artırır. Acelecilik ailede şüphe doğurur.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ma_pos6',
    card: 'Queen of Wands',
    position: 6,
    upright:
      'Aile sizi karizmatik, sıcak ve çekici biri olarak görebilir. Sosyal becerileriniz ve güveniniz kabulünüzü kolaylaştırır. İlham verici duruşunuz takdir uyandırır.',
    reversed:
      'Aile sizi fazla baskın ya da kıskanç algılayabilir. Kontrolcü tavırlar kabulü zorlaştırır. Aşırı dikkat çekmek güveni azaltır.',
    keywords: ['karizma', 'sıcaklık', 'çekicilik', 'güven', 'ilham'],
    context:
      'Sıcaklık ve karizma kabulü kolaylaştırır. Fazla baskınlık aileyi zorlar.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ma_pos6',
    card: 'King of Wands',
    position: 6,
    upright:
      'Aile sizi vizyoner, güçlü ve lider ruhlu biri olarak görebilir. Cesur duruşunuz ve güven veren tavırlarınız kabul sürecini kolaylaştırır. Onlara göre siz, yol gösterici bir figürsünüz.',
    reversed:
      'Aile sizi otoriter ya da ego merkezli algılayabilir. Fazla baskınlık kabulü zorlaştırır. Denge eksikliği ailede mesafe yaratır.',
    keywords: ['vizyon', 'liderlik', 'cesaret', 'güç', 'otorite'],
    context: 'Liderlik kabulü artırır. Fazla otoriterlik aileyi zorlaştırır.',
    group: 'Asalar',
  },
];

// Kart adına göre pozisyon 6 anlamını bulma fonksiyonu
export const getposition6Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return position6Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getmarriageposition6Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return getposition6Meaning(cardName);
};

// Kart adına göre pozisyon 6 anlamını bulma fonksiyonu (ana index için)
export const getmarriageposition6MeaningByCardName = (
  cardName: string
): MarriagePositionMeaning | undefined => {
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
export const getAllposition6Meanings = (): MarriagePositionMeaning[] => {
  return position6Meanings;
};

// pozisyon 6 anlamlarını filtreleme fonksiyonu
export const getposition6MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return position6Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 6 anlamlarını arama
export const searchposition6MeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
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
