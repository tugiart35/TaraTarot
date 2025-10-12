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
- position8Meanings: gerekli
- getposition8Meaning: gerekli
*/

import { MarriagePositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position8Meanings: MarriagePositionMeaning[] = [
  // ========== MAJÖR ARKANA (22) ==========
  {
    id: 'the_fool_ma_pos8',
    card: 'The Fool',
    position: 8,
    upright:
      'Deli, iletişimde açıklık ve doğal samimiyetle birbirinizi anlayabileceğinizi gösterir. Önyargısız yaklaşım, yanlış anlaşılmaları önler ve bağı güçlendirir.',
    reversed:
      'Ters Deli, dikkatsizlik ve düşünmeden konuşmanın anlaşmayı zorlaştırabileceğini söyler. Daha bilinçli ve dikkatli ifadeler dengeyi kurar.',
    keywords: ['samimiyet', 'açıklık', 'doğallık', 'önyargısızlık'],
    context:
      'Doğal açıklık uyumu sağlar; dikkatsizlik yanlış anlaşılmalara yol açabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos8',
    card: 'The Magician',
    position: 8,
    upright:
      'Büyücü, iletişim gücünüzün yüksek olduğunu gösterir. Net niyet ve açık sözlerle karşılıklı anlayış kolaylaşır.',
    reversed:
      'Ters Büyücü, manipülasyon veya abartılı sözlerin iletişimi bozabileceğini işaret eder. Şeffaflık ve tutarlılık uyumu sağlar.',
    keywords: ['iletişim', 'netlik', 'ifadeler', 'niyet'],
    context:
      'Açık niyetler anlaşmayı kolaylaştırır; oyunlar iletişimi zedeler.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos8',
    card: 'The High Priestess',
    position: 8,
    upright:
      'Başrahibe, sezgisel uyumun güçlü olduğunu gösterir. Sessizliği anlamak ve içsel işaretleri fark etmek anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Başrahibe, aşırı suskunluk ya da sırların iletişimi zorlaştırabileceğini belirtir. Güvenli açıklık uyumu artırır.',
    keywords: ['sezgi', 'uyum', 'giz', 'içgörü'],
    context: 'Sessiz anlaşılma potansiyeli yüksektir; gizleme uyumu bozar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos8',
    card: 'The Empress',
    position: 8,
    upright:
      'İmparatoriçe, şefkatli ve besleyici bir iletişim tarzının hâkim olacağını gösterir. Yumuşak dil, anlaşmayı kolaylaştırır.',
    reversed:
      'Ters İmparatoriçe, aşırı sahiplenme ya da duygusal taşmaların iletişimde sıkıntı yaratabileceğini söyler. Dengeli ifade uyumu getirir.',
    keywords: ['şefkat', 'ifade', 'besleyicilik', 'denge'],
    context: 'Şefkatli iletişim anlaşmayı güçlendirir; aşırılık engel yaratır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos8',
    card: 'The Emperor',
    position: 8,
    upright:
      'İmparator, iletişimde net sınırlar ve düzenle uyum sağlanabileceğini gösterir. Kararlılık güven verir.',
    reversed:
      'Ters İmparator, katı ve buyurgan bir dilin anlaşmayı zorlaştıracağını işaret eder. Esneklik uyumu artırır.',
    keywords: ['sınır', 'düzen', 'kararlılık', 'güven'],
    context: 'Net düzen iletişimi güçlendirir; katılık kopukluk yaratır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos8',
    card: 'The Hierophant',
    position: 8,
    upright:
      'Aziz, ortak değerler ve gelenekler üzerinden iletişimde uyum sağlanacağını gösterir. Anlayış, benzer bakış açılarından beslenir.',
    reversed:
      'Ters Aziz, katı kurallar ya da kör başkaldırının iletişimi bozabileceğini söyler. Esnek uyum dengeyi kurar.',
    keywords: ['değerler', 'gelenek', 'uyum', 'rehberlik'],
    context: 'Ortak değerler iletişimi kolaylaştırır; kör direnç zorlaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos8',
    card: 'The Lovers',
    position: 8,
    upright:
      'Aşıklar, kalpten gelen dürüst konuşmaların anlaşmayı güçlendireceğini gösterir. Uyum, açık seçimlerle sağlanır.',
    reversed:
      'Ters Aşıklar, kararsızlık veya çifte dilin iletişimde sorun yaratabileceğini söyler. Netlik bağı kurtarır.',
    keywords: ['uyum', 'aşk', 'seçim', 'açıklık'],
    context: 'Açık seçimler anlaşmayı sağlar; çifte dil kopukluk yaratır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos8',
    card: 'The Chariot',
    position: 8,
    upright:
      'Savaş Arabası, odaklanmış iletişimle anlaşmanın mümkün olduğunu gösterir. Ortak hedefe yönelmek bağları güçlendirir.',
    reversed:
      'Ters Savaş Arabası, savruk ya da baskıcı üslubun iletişimi bozabileceğini söyler. Ortak yön uyumu sağlar.',
    keywords: ['odak', 'hedef', 'disiplin', 'yön'],
    context: 'Odaklı iletişim uyum getirir; savrukluk anlaşmayı zorlaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos8',
    card: 'Strength',
    position: 8,
    upright:
      'Güç, sabırlı ve nazik bir üslubun anlaşmayı sağlayacağını gösterir. Yumuşak cesaret iletişimde köprü kurar.',
    reversed:
      'Ters Güç, öfke ya da inatçılığın iletişimi bozabileceğini söyler. Şefkat dengeyi sağlar.',
    keywords: ['sabır', 'naziklik', 'cesaret', 'şefkat'],
    context: 'Nazik güç uyumu büyütür; öfke anlaşmayı zorlaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos8',
    card: 'The Hermit',
    position: 8,
    upright:
      'Ermiş, derin düşünce ve içgörüyle iletişimde uyum sağlanabileceğini gösterir. Sessizlikten sonra gelen sözler değerlidir.',
    reversed:
      'Ters Ermiş, aşırı içe kapanıklığın anlaşmayı zorlaştırabileceğini belirtir. Açıklık uyumu artırır.',
    keywords: ['içe dönüş', 'bilgelik', 'derinlik', 'yalınlık'],
    context: 'Derinlik uyumu getirir; aşırı kapanma anlaşmayı engeller.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos8',
    card: 'The Wheel of Fortune',
    position: 8,
    upright:
      'Kader Çarkı, iletişimde şanslı karşılaşmalar ve doğal akışın anlaşmayı kolaylaştıracağını gösterir. Döngülere uyum sağlamak önemlidir.',
    reversed:
      'Ters Çark, direnç ya da kontrol çabasının iletişimi zorlaştıracağını söyler. Akışa güvenmek uyumu getirir.',
    keywords: ['döngü', 'şans', 'akış', 'uyum'],
    context: 'Akışa güvenmek anlaşmayı sağlar; direnç engel çıkarır.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos8',
    card: 'Justice',
    position: 8,
    upright:
      'Adalet, dürüstlük ve şeffaflığın iletişimde uyumu güçlendireceğini gösterir. Netlik güven kurar.',
    reversed:
      'Ters Adalet, çifte standart ya da adaletsiz dilin anlaşmayı bozabileceğini işaret eder. Şeffaflık dengeyi getirir.',
    keywords: ['adalet', 'netlik', 'şeffaflık', 'denge'],
    context: 'Dürüst dil uyumu güçlendirir; adaletsizlik kopukluk yaratır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos8',
    card: 'The Hanged Man',
    position: 8,
    upright:
      'Asılan Adam, farklı bakış açılarını anlamaya çalışarak uyum sağlanacağını gösterir. Empati iletişimde köprü kurar.',
    reversed:
      'Ters Asılan Adam, kurban psikolojisi ya da inatçılığın anlaşmayı zorlaştıracağını belirtir. Perspektif değişimi uyumu kolaylaştırır.',
    keywords: ['perspektif', 'empati', 'farklılık', 'teslimiyet'],
    context: 'Empati uyumu sağlar; inat anlaşmayı engeller.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos8',
    card: 'Death',
    position: 8,
    upright:
      'Ölüm, eski iletişim kalıplarını bırakıp yenisini kurarak uyum sağlayabileceğinizi gösterir. Dönüşüm anlaşmayı güçlendirir.',
    reversed:
      'Ters Ölüm, değişime direnmenin iletişimi zorlaştıracağını söyler. Eskiyi bırakmak uyumu getirir.',
    keywords: ['dönüşüm', 'yenilenme', 'bırakma', 'iletişim'],
    context: 'Eskiyi bırakmak anlaşmayı güçlendirir; direnç uyumu bozar.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos8',
    card: 'Temperance',
    position: 8,
    upright:
      'Denge, uyumlu ve ölçülü bir iletişimin anlaşmayı kolaylaştıracağını gösterir. Orta yol güven verir.',
    reversed:
      'Ters Denge, aşırılıklara kapılmanın iletişimi bozabileceğini işaret eder. Ölçülülük uyumu sağlar.',
    keywords: ['denge', 'ölçü', 'uyum', 'orta yol'],
    context: 'Ölçülü dil uyumu getirir; aşırılık anlaşmayı zorlaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos8',
    card: 'The Devil',
    position: 8,
    upright:
      'Şeytan, iletişimde bağımlılık veya manipülasyona dikkat edilmesi gerektiğini söyler. Açık sınırlar uyumu getirir.',
    reversed:
      'Ters Şeytan, zincirleri kırarak dürüst iletişim kurabileceğinizi gösterir. Özgür ifade anlaşmayı kolaylaştırır.',
    keywords: ['bağımlılık', 'sınır', 'manipülasyon', 'özgürlük'],
    context: 'Açık sınırlar uyumu güçlendirir; oyunlar bağı bozar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos8',
    card: 'The Tower',
    position: 8,
    upright:
      'Kule, iletişimde ani çıkışların ya da hakikatlerin anlaşmayı sarsabileceğini gösterir. Doğruyu kabul etmek uzun vadede denge getirir.',
    reversed:
      'Ters Kule, bastırılan krizlerin iletişimi zedeleyeceğini belirtir. Açık yüzleşme uyumu kolaylaştırır.',
    keywords: ['kriz', 'hakikat', 'yıkım', 'açıklık'],
    context: 'Açık hakikat uyumu getirir; bastırma çatışma yaratır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos8',
    card: 'The Star',
    position: 8,
    upright:
      'Yıldız, umut ve ilham dolu bir iletişimin anlaşmayı kolaylaştıracağını gösterir. Şeffaflık güven verir.',
    reversed:
      'Ters Yıldız, tükenmişlik ya da umutsuz dilin uyumu bozabileceğini söyler. Küçük umutlar anlaşmayı büyütür.',
    keywords: ['umut', 'ilham', 'şeffaflık', 'güven'],
    context: 'Şeffaf dil uyumu getirir; umutsuzluk bağı zayıflatır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos8',
    card: 'The Moon',
    position: 8,
    upright:
      'Ay, sezgisel ama net olmayan bir iletişim tarzını işaret eder. Belirsizlik soru sormayla aşılır ve uyum sağlanır.',
    reversed:
      'Ters Ay, yanlış anlamaların ve kuruntuların iletişimi bozabileceğini söyler. Açık sorular uyumu güçlendirir.',
    keywords: ['belirsizlik', 'sezgi', 'soru', 'aydınlanma'],
    context: 'Belirsizlik soru ile çözülür; kuruntu uyumu bozar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos8',
    card: 'The Sun',
    position: 8,
    upright:
      'Güneş, açık, net ve sevinçli bir iletişimin uyumu kolaylaştıracağını gösterir. Paylaşılan mutluluk bağı güçlendirir.',
    reversed:
      'Ters Güneş, aşırı iyimser maskelerin iletişimi zedeleyebileceğini söyler. İçtenlik uyumu sağlar.',
    keywords: ['açıklık', 'netlik', 'sevinç', 'içtenlik'],
    context: 'Netlik ve içtenlik uyumu getirir; maskeler bağı bozar.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos8',
    card: 'Judgement',
    position: 8,
    upright:
      'Mahkeme, geçmişi açıkça konuşmak ve ders çıkarmanın anlaşmayı güçlendireceğini gösterir. Şeffaf yüzleşme bağı büyütür.',
    reversed:
      'Ters Mahkeme, aşırı yargılamanın iletişimi bozabileceğini işaret eder. Şefkatli dil uyumu getirir.',
    keywords: ['yüzleşme', 'açıklık', 'ders', 'yenilenme'],
    context: 'Geçmişi şefkatle konuşmak uyumu sağlar; yargı zedeler.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos8',
    card: 'The World',
    position: 8,
    upright:
      'Dünya, bütüncül ve açık bir iletişimin anlaşmayı tamamlayacağını gösterir. Ortak döngü kapanır ve yeni bir denge başlar.',
    reversed:
      'Ters Dünya, eksik konuşmaların veya yarım kalmış diyalogların uyumu zorlaştıracağını söyler. Tamamlayıcı açıklık anlaşmayı kolaylaştırır.',
    keywords: ['bütünlük', 'tamamlanma', 'açıklık', 'denge'],
    context: 'Tamamlanmış iletişim uyumu getirir; eksik bırakma zedeler.',
    group: 'Majör Arkana',
  },
  // KUPALAR – 14 Kart //
  {
    id: 'ace_of_cups_cu_pos8',
    card: 'Ace of Cups',
    position: 8,
    upright:
      'Kupa Ası, duygusal olarak birbirinizi anlamaya açık bir başlangıcı simgeler. İletişimde şefkat ve samimiyet ön plandadır.',
    reversed:
      'Ters Kupa Ası, duyguların bastırılması veya ifade edilmemesi sebebiyle anlaşmanın zorlaşabileceğini gösterir. İçtenliği açmak bağı güçlendirir.',
    keywords: ['duygu', 'başlangıç', 'samimiyet', 'şefkat'],
    context: 'Duygusal açıklık uyumu getirir; bastırma kopukluk yaratır.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cu_pos8',
    card: 'Two of Cups',
    position: 8,
    upright:
      'Kupa İkilisi, karşılıklı uyum ve eşit alışverişi gösterir. İletişimde denge ve empati anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kupa İkilisi, yanlış anlaşılmaların veya dengesiz bağların iletişimi zorlaştırabileceğini işaret eder. Açık sınırlar uyumu getirir.',
    keywords: ['uyum', 'eşitlik', 'empati', 'denge'],
    context: 'Eşit bağlar anlaşmayı güçlendirir; dengesizlik zedeler.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cu_pos8',
    card: 'Three of Cups',
    position: 8,
    upright:
      'Kupa Üçlüsü, neşeli ve destekleyici iletişimin kolayca kurulabileceğini gösterir. Ortak paylaşımlar bağı derinleştirir.',
    reversed:
      'Ters Kupa Üçlüsü, yüzeysel iletişim veya dış etkenlerin uyumu zorlaştırabileceğini söyler. Samimiyet korunduğunda anlaşma kalıcı olur.',
    keywords: ['paylaşım', 'neşe', 'destek', 'samimiyet'],
    context: 'Samimi paylaşımlar uyumu artırır; yüzeysellik bağı bozar.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cu_pos8',
    card: 'Four of Cups',
    position: 8,
    upright:
      'Kupa Dörtlüsü, iletişimde kayıtsızlık veya tatminsizlik görülebileceğini söyler. Farkındalıkla dinlemek uyumu sağlar.',
    reversed:
      'Ters Kupa Dörtlüsü, farkındalığın artmasıyla iletişimde yeniden canlanma olacağını gösterir. Şükran duygusu anlaşmayı kolaylaştırır.',
    keywords: ['tatminsizlik', 'farkındalık', 'dinleme', 'şükran'],
    context: 'Duygulara dikkat etmek uyumu getirir; ilgisizlik engeller.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cu_pos8',
    card: 'Five of Cups',
    position: 8,
    upright:
      'Kupa Beşlisi, iletişimde geçmiş kırgınlıkların anlaşmayı zorlaştırabileceğini belirtir. Odak elde kalan bağlarda olmalıdır.',
    reversed:
      'Ters Kupa Beşlisi, affetme ve kabulle iletişimin yeniden kurulabileceğini gösterir. Umut, anlaşmayı onarır.',
    keywords: ['kırgınlık', 'kaygı', 'kabul', 'umut'],
    context: 'Geçmişi bırakmak anlaşmayı kolaylaştırır; odak yas uyumu bozar.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cu_pos8',
    card: 'Six of Cups',
    position: 8,
    upright:
      'Kupa Altılısı, nostaljik ve sıcak iletişimi işaret eder. Geçmişten gelen güven bağı anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kupa Altılısı, geçmişe takılı kalmanın anlaşmayı zorlaştırabileceğini söyler. Şimdiki ana odak uyumu getirir.',
    keywords: ['nostalji', 'güven', 'sıcaklık', 'anılar'],
    context: 'Geçmişten gelen sıcaklık uyumu destekler; takılı kalma zedeler.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cu_pos8',
    card: 'Seven of Cups',
    position: 8,
    upright:
      'Kupa Yedilisi, iletişimde çok fazla seçenek veya kafa karışıklığını gösterebilir. Netlik sağlamak anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kupa Yedilisi, gerçekçi bakış açısıyla iletişimde sadeleşme getirir. Odak uyumu artırır.',
    keywords: ['seçenek', 'karışıklık', 'netlik', 'odak'],
    context: 'Netlik anlaşmayı güçlendirir; kafa karışıklığı engel olur.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cu_pos8',
    card: 'Eight of Cups',
    position: 8,
    upright:
      'Kupa Sekizlisi, yüzeysel iletişimden uzaklaşıp daha derin bir anlayış arayışını işaret eder. Samimiyet anlaşmayı besler.',
    reversed:
      'Ters Kupa Sekizlisi, kaçış eğiliminin iletişimi zorlaştırabileceğini söyler. Kalmak ve konuşmak uyumu sağlar.',
    keywords: ['derinlik', 'samimiyet', 'arayış', 'kaçış'],
    context: 'Derinlik arayışı uyumu büyütür; kaçış engel çıkarır.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cu_pos8',
    card: 'Nine of Cups',
    position: 8,
    upright:
      'Kupa Dokuzlusu, tatmin edici ve keyifli iletişimi gösterir. Memnuniyet ve huzur anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kupa Dokuzlusu, bencillik veya yüzeysellik sebebiyle iletişimde doyumsuzluk görülebilir. Paylaşım uyumu getirir.',
    keywords: ['tatmin', 'huzur', 'paylaşım', 'keyif'],
    context: 'Paylaşılan tatmin uyumu artırır; bencillik bağı bozar.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cu_pos8',
    card: 'Ten of Cups',
    position: 8,
    upright:
      'Kupa Onlusu, uyumlu ve huzurlu bir iletişimi işaret eder. Aile gibi hissettiren bağ anlaşmayı kalıcı kılar.',
    reversed:
      'Ters Kupa Onlusu, beklenti–gerçeklik arasındaki farkların iletişimi zorlaştırabileceğini söyler. Samimiyet dengeyi sağlar.',
    keywords: ['uyum', 'huzur', 'birlik', 'aile'],
    context: 'Huzurlu bağ uyumu büyütür; hayal kırıklığı uyumu zorlaştırır.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cu_pos8',
    card: 'Page of Cups',
    position: 8,
    upright:
      'Kupa Prensi, yaratıcı ve masum bir iletişimi işaret eder. Açık merak anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kupa Prensi, aşırı hassasiyetin veya hayalperestliğin anlaşmayı zorlaştırabileceğini söyler. Gerçekçi merak uyumu getirir.',
    keywords: ['masumiyet', 'merak', 'yaratıcılık', 'hassasiyet'],
    context: 'Merak uyumu artırır; aşırı hassasiyet engel olur.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cu_pos8',
    card: 'Knight of Cups',
    position: 8,
    upright:
      'Kupa Şövalyesi, romantik ve idealist bir iletişimi gösterir. Zarif sözler anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kupa Şövalyesi, tutarsız vaatlerin iletişimi zedeleyebileceğini söyler. Netlik ve süreklilik uyumu sağlar.',
    keywords: ['romantizm', 'idealizm', 'zarafet', 'netlik'],
    context: 'Zarif dil uyumu güçlendirir; tutarsızlık zedeler.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cu_pos8',
    card: 'Queen of Cups',
    position: 8,
    upright:
      'Kupa Kraliçesi, empatik ve sezgisel bir iletişimi işaret eder. Şefkatli dinleme anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kupa Kraliçesi, aşırı duygusallığın veya sınırların kaybolmasının iletişimi zorlaştırabileceğini söyler. Dengeli şefkat uyumu getirir.',
    keywords: ['empati', 'şefkat', 'sezgi', 'denge'],
    context: 'Şefkat uyumu büyütür; sınır kaybı engel olur.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cu_pos8',
    card: 'King of Cups',
    position: 8,
    upright:
      'Kupa Kralı, olgun ve dengeli iletişimi işaret eder. Duygularını sakince ifade eden tutum anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kupa Kralı, pasif agresif ya da bastırılmış duyguların uyumu bozabileceğini söyler. Açık ifade anlaşmayı güçlendirir.',
    keywords: ['olgunluk', 'denge', 'ifade', 'sükunet'],
    context: 'Olgun iletişim uyumu artırır; bastırma engel çıkarır.',
    group: 'Kupalar',
  },

  // ==== SWORDS (Kılıçlar) ====
  {
    id: 'ace_of_swords_sw_pos8',
    card: 'Ace of Swords',
    position: 8,
    upright:
      'Kılıç Ası, iletişimde netlik ve dürüstlüğün öne çıkacağını gösterir. Açık sözler ve berrak düşünce anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kılıç Ası, bulanıklık veya yanlış ifadelerin iletişimi zorlaştırabileceğini söyler. Sözcükleri sadeleştirmek uyumu getirir.',
    keywords: ['netlik', 'doğruluk', 'düşünce', 'iletişim'],
    context: 'Netlik anlaşmayı güçlendirir; bulanıklık zedeler.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sw_pos8',
    card: 'Two of Swords',
    position: 8,
    upright:
      'Kılıç İkilisi, karar verme ve iletişimde denge arayışını gösterir. Tarafsızlık anlaşmayı korur.',
    reversed:
      'Ters Kılıç İkilisi, kaçınılan yüzleşmelerin iletişimi tıkayabileceğini söyler. Açıklık anlaşmayı sağlar.',
    keywords: ['denge', 'karar', 'ikilem', 'yüzleşme'],
    context: 'Denge anlaşmayı büyütür; kaçınma engel çıkarır.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sw_pos8',
    card: 'Three of Swords',
    position: 8,
    upright:
      'Kılıç Üçlüsü, iletişimde kırgınlık veya sert sözlerin anlaşmayı zorlaştırabileceğini işaret eder. Şefkatli dil onarıcıdır.',
    reversed:
      'Ters Kılıç Üçlüsü, affedişin ve yumuşak iletişimin yeniden anlaşma fırsatı sunduğunu gösterir.',
    keywords: ['kırgınlık', 'yas', 'şefkat', 'dil'],
    context: 'Şefkatli dil anlaşmayı güçlendirir; sertlik bağları zedeler.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sw_pos8',
    card: 'Four of Swords',
    position: 8,
    upright:
      'Kılıç Dörtlüsü, iletişimde sakinleşmeye ve düşünceleri toparlamaya işaret eder. Sessizlik anlaşmayı kolaylaştırabilir.',
    reversed:
      'Ters Kılıç Dörtlüsü, iletişimden kaçışın uyumu zorlaştırabileceğini söyler. Küçük ama net adımlar faydalı olur.',
    keywords: ['sükunet', 'toparlanma', 'dinlenme', 'iletişim'],
    context: 'Sükunet uyumu getirir; kaçış anlaşmayı zorlaştırır.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sw_pos8',
    card: 'Five of Swords',
    position: 8,
    upright:
      'Kılıç Beşlisi, haklı çıkma arzusunun iletişimi zorlaştırabileceğini gösterir. Empati anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kılıç Beşlisi, onarım niyetiyle iletişimin yeniden kurulabileceğini gösterir. Taviz bağı güçlendirir.',
    keywords: ['çatışma', 'haklılık', 'empati', 'onarım'],
    context: 'Empati anlaşmayı kolaylaştırır; ego çatışma yaratır.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sw_pos8',
    card: 'Six of Swords',
    position: 8,
    upright:
      'Kılıç Altılısı, iletişimde daha sakin ve dengeli bir sürece geçişi işaret eder. Zihinler huzur bulduğunda anlaşma kolaydır.',
    reversed:
      'Ters Kılıç Altılısı, geçmiş konuların iletişimi zorlaştırabileceğini söyler. Geçmişi geride bırakmak uyumu getirir.',
    keywords: ['geçiş', 'denge', 'huzur', 'sükunet'],
    context: 'Huzurlu geçiş anlaşmayı sağlar; geçmişe takılma engel olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sw_pos8',
    card: 'Seven of Swords',
    position: 8,
    upright:
      'Kılıç Yedilisi, iletişimde strateji ve dikkat gerektirdiğini gösterir. Dürüstlük anlaşmanın anahtarıdır.',
    reversed:
      'Ters Kılıç Yedilisi, gizlenenlerin açığa çıkmasıyla uyum sağlanabileceğini söyler. Şeffaflık anlaşmayı güçlendirir.',
    keywords: ['strateji', 'gizlilik', 'şeffaflık', 'dürüstlük'],
    context: 'Şeffaflık uyumu getirir; gizlilik anlaşmayı bozar.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sw_pos8',
    card: 'Eight of Swords',
    position: 8,
    upright:
      'Kılıç Sekizlisi, zihin kalıplarının iletişimi kısıtlayabileceğini gösterir. Özgür bakış açısı anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kılıç Sekizlisi, iletişimde çözülme ve özgürleşme sürecini işaret eder. Cesurca ifade uyumu getirir.',
    keywords: ['kısıtlama', 'zihin tuzağı', 'özgürlük', 'ifade'],
    context: 'Özgür ifade uyumu artırır; kalıplar uyumu bozar.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sw_pos8',
    card: 'Nine of Swords',
    position: 8,
    upright:
      'Kılıç Dokuzlusu, kaygıların iletişimi zorlaştırabileceğini gösterir. Endişeleri paylaşmak anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kılıç Dokuzlusu, kaygılardan arınma ve daha açık iletişim fırsatını işaret eder.',
    keywords: ['kaygı', 'endişe', 'iletişim', 'ifade'],
    context: 'Kaygıları paylaşmak uyumu büyütür; bastırmak engeller.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sw_pos8',
    card: 'Ten of Swords',
    position: 8,
    upright:
      'Kılıç Onlusu, iletişimde bir döngünün sonunu gösterir. Zorlu bir bitişten sonra yeniden anlaşma için fırsat doğar.',
    reversed:
      'Ters Kılıç Onlusu, toparlanma ve yeniden iletişim kurma sürecini işaret eder. Yeniden doğuş uyumu getirir.',
    keywords: ['bitiş', 'yenilenme', 'döngü', 'ifade'],
    context: 'Bitiş sonrası açıklık uyumu sağlar; direnç zedeler.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sw_pos8',
    card: 'Page of Swords',
    position: 8,
    upright:
      'Kılıç Prensi, merak ve dikkatli dinlemeyle iletişimin güçleneceğini gösterir. Öğrenme isteği anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kılıç Prensi, acele yargıların iletişimi zedeleyebileceğini işaret eder. Açık sorular uyumu getirir.',
    keywords: ['merak', 'öğrenme', 'iletişim', 'dinleme'],
    context: 'Merak uyumu artırır; acele yargı engel çıkarır.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sw_pos8',
    card: 'Knight of Swords',
    position: 8,
    upright:
      'Kılıç Şövalyesi, hızlı ve keskin iletişimi işaret eder. Net ifadeler anlaşmayı sağlar.',
    reversed:
      'Ters Kılıç Şövalyesi, aceleci sözlerin iletişimi zorlaştırabileceğini gösterir. Yavaşlamak uyumu getirir.',
    keywords: ['hız', 'netlik', 'keskinlik', 'iletişim'],
    context: 'Netlik uyumu getirir; acelecilik bağı zorlaştırır.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sw_pos8',
    card: 'Queen of Swords',
    position: 8,
    upright:
      'Kılıç Kraliçesi, objektif ve açık iletişimi işaret eder. Dürüstlük anlaşmayı güçlendirir.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştirinin uyumu bozabileceğini gösterir. Şefkatli dil dengeyi kurar.',
    keywords: ['dürüstlük', 'objektiflik', 'eleştiri', 'şefkat'],
    context: 'Dürüstlük uyumu büyütür; sertlik engeller.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sw_pos8',
    card: 'King of Swords',
    position: 8,
    upright:
      'Kılıç Kralı, mantıklı ve adil iletişimi işaret eder. Stratejik düşünce anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Kılıç Kralı, katı veya soğuk iletişimin uyumu bozabileceğini söyler. Empati dengeyi getirir.',
    keywords: ['mantık', 'adalet', 'strateji', 'empati'],
    context: 'Mantık uyumu getirir; katılık engel çıkarır.',
    group: 'Kılıçlar',
  },

  // ==== PENTACLES (Tılsımlar) ====
  {
    id: 'ace_of_pentacles_pe_pos8',
    card: 'Ace of Pentacles',
    position: 8,
    upright:
      'Tılsım Ası, iletişimde güvenli ve sağlam bir başlangıcı simgeler. Maddi ve manevi istikrar anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Tılsım Ası, fırsatların gözden kaçması veya güvensiz bir temel iletişimi zorlaştırabilir. Netlik ve somut adımlar bağı güçlendirir.',
    keywords: ['başlangıç', 'güven', 'istikrar', 'somutluk'],
    context: 'Sağlam temel iletişimi destekler.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pe_pos8',
    card: 'Two of Pentacles',
    position: 8,
    upright:
      'Tılsım İkilisi, iletişimde esneklik ve dengeyi gösterir. Günlük hayatın temposunu uyumla yönetmek anlaşmayı sağlar.',
    reversed:
      'Ters Tılsım İkilisi, dengesizlik ve karmaşanın iletişimi zorlaştırabileceğini söyler. Öncelikleri sadeleştirmek uyumu artırır.',
    keywords: ['denge', 'esneklik', 'öncelik', 'uyum'],
    context: 'Denge ve esneklik anlaşmayı kolaylaştırır.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pe_pos8',
    card: 'Three of Pentacles',
    position: 8,
    upright:
      'Tılsım Üçlüsü, iletişimde işbirliği ve ortak emek vurgusunu taşır. Ortak hedefler uyumu büyütür.',
    reversed:
      'Ters Tılsım Üçlüsü, rol karmaşasının anlaşmayı zorlaştırabileceğini gösterir. Açık görev paylaşımı uyumu sağlar.',
    keywords: ['işbirliği', 'emek', 'ortak hedef', 'uyum'],
    context: 'Ortak emek anlaşmayı güçlendirir.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pe_pos8',
    card: 'Four of Pentacles',
    position: 8,
    upright:
      'Tılsım Dörtlüsü, iletişimde güvenliği koruma isteğini işaret eder. Açık ve paylaşımcı tutum uyumu getirir.',
    reversed:
      'Ters Tılsım Dörtlüsü, aşırı tutuculuğun iletişimi zorlaştırabileceğini gösterir. Esnek davranmak bağı güçlendirir.',
    keywords: ['güvenlik', 'kontrol', 'paylaşım', 'esneklik'],
    context: 'Paylaşım uyumu artırır.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pe_pos8',
    card: 'Five of Pentacles',
    position: 8,
    upright:
      'Tılsım Beşlisi, iletişimde yalnızlık veya dışlanmışlık hissini yansıtabilir. Destek vermek ve almak uyumu onarır.',
    reversed:
      'Ters Tılsım Beşlisi, toparlanma ve yeniden bağ kurma enerjisini gösterir. Küçük adımlar bağı güçlendirir.',
    keywords: ['yalnızlık', 'destek', 'toparlanma', 'birlik'],
    context: 'Destek vermek anlaşmayı güçlendirir.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pe_pos8',
    card: 'Six of Pentacles',
    position: 8,
    upright:
      'Tılsım Altılısı, iletişimde adalet ve karşılıklı alışverişi simgeler. Eşit paylaşım anlaşmayı sağlar.',
    reversed:
      'Ters Tılsım Altılısı, dengesiz güç ilişkilerinin iletişimi zedeleyebileceğini gösterir. Şeffaflık uyumu artırır.',
    keywords: ['adalet', 'paylaşım', 'eşitlik', 'uyum'],
    context: 'Eşitlik anlaşmayı kolaylaştırır.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pe_pos8',
    card: 'Seven of Pentacles',
    position: 8,
    upright:
      'Tılsım Yedilisi, iletişimde sabır ve değerlendirme sürecini simgeler. Acele etmeyip dinlemek uyumu büyütür.',
    reversed:
      'Ters Tılsım Yedilisi, sabırsızlığın ve çabuk yargıların iletişimi zedeleyebileceğini gösterir. Zaman tanımak bağı güçlendirir.',
    keywords: ['sabır', 'değerlendirme', 'zaman', 'uyum'],
    context: 'Sabır iletişimi güçlendirir.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pe_pos8',
    card: 'Eight of Pentacles',
    position: 8,
    upright:
      'Tılsım Sekizlisi, iletişimde emek ve sürekli öğrenme vurgusunu taşır. Çaba göstermek anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Tılsım Sekizlisi, özensizlik veya ilgisizliğin iletişimi zorlaştırabileceğini söyler. Düzenli ilgi bağı güçlendirir.',
    keywords: ['emek', 'öğrenme', 'çaba', 'uyum'],
    context: 'Sürekli emek uyumu getirir.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pe_pos8',
    card: 'Nine of Pentacles',
    position: 8,
    upright:
      'Tılsım Dokuzlusu, iletişimde özgüven ve bireysel tatmin uyumu destekler. Bağımsızlık içinde paylaşım anlaşmayı büyütür.',
    reversed:
      'Ters Tılsım Dokuzlusu, bağımlılığın ya da mesafe koymanın iletişimi zorlaştırabileceğini gösterir. Dengeli paylaşım uyumu sağlar.',
    keywords: ['özgüven', 'bağımsızlık', 'tatmin', 'paylaşım'],
    context: 'Dengeli özgüven uyumu besler.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pe_pos8',
    card: 'Ten of Pentacles',
    position: 8,
    upright:
      'Tılsım Onlusu, iletişimde aile ve uzun vadeli istikrar enerjisini taşır. Ortak değerler uyumu büyütür.',
    reversed:
      'Ters Tılsım Onlusu, aile baskısı veya farklı beklentilerin iletişimi zorlaştırabileceğini gösterir. Ortak zemin bulmak uyumu getirir.',
    keywords: ['aile', 'istikrar', 'değerler', 'uyum'],
    context: 'Ortak değerler anlaşmayı kolaylaştırır.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pe_pos8',
    card: 'Page of Pentacles',
    position: 8,
    upright:
      'Tılsım Prensi, iletişimde öğrenme hevesi ve somut adımlar atma arzusunu simgeler. Küçük jestler anlaşmayı güçlendirir.',
    reversed:
      'Ters Tılsım Prensi, dağınıklığın veya ertelemenin iletişimi zorlaştırabileceğini gösterir. Odaklanma uyumu getirir.',
    keywords: ['öğrenme', 'jest', 'odak', 'adım'],
    context: 'Küçük jestler anlaşmayı kolaylaştırır.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pe_pos8',
    card: 'Knight of Pentacles',
    position: 8,
    upright:
      'Tılsım Şövalyesi, iletişimde sabır ve kararlılığı işaret eder. Tutarlılık uyumu destekler.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık veya inatçılığın iletişimi zorlaştırabileceğini gösterir. Esneklik bağı güçlendirir.',
    keywords: ['sabır', 'kararlılık', 'tutarlılık', 'iletişim'],
    context: 'Tutarlılık uyumu getirir.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pe_pos8',
    card: 'Queen of Pentacles',
    position: 8,
    upright:
      'Tılsım Kraliçesi, iletişimde şefkat ve pratik desteği gösterir. Anlayışlı yaklaşım anlaşmayı büyütür.',
    reversed:
      'Ters Tılsım Kraliçesi, aşırı fedakârlığın iletişimde dengeyi bozabileceğini söyler. Öz bakım uyumu korur.',
    keywords: ['şefkat', 'pratik', 'destek', 'uyum'],
    context: 'Şefkatli yaklaşım anlaşmayı kolaylaştırır.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pe_pos8',
    card: 'King of Pentacles',
    position: 8,
    upright:
      'Tılsım Kralı, iletişimde istikrar, güven ve pratik çözümler sunar. Olgun yaklaşım anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrolcülük ya da iletişimde katılık anlaşmayı zorlaştırır. Esneklik uyumu getirir.',
    keywords: ['istikrar', 'güven', 'pratiklik', 'olgunluk'],
    context: 'İstikrarlı ve güvenilir iletişim uyumu sağlar.',
    group: 'Tılsımlar',
  },

  // ==== WANDS (Asalar) ====
  {
    id: 'ace_of_wands_wa_pos8',
    card: 'Ace of Wands',
    position: 8,
    upright:
      'Değnek Ası, iletişimde yeni bir kıvılcım ve canlılık gösterir. Tutkulu yaklaşım anlaşmayı besler.',
    reversed:
      'Ters Değnek Ası, motivasyon eksikliğinin iletişimi zorlaştırabileceğini gösterir. Küçük adımlar ateşi yeniden yakar.',
    keywords: ['başlangıç', 'kıvılcım', 'motivasyon', 'iletişim'],
    context: 'Tutku ve canlılık anlaşmayı kolaylaştırır.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_wa_pos8',
    card: 'Two of Wands',
    position: 8,
    upright:
      'Değnek İkilisi, iletişimde vizyon ve ortak planlamayı işaret eder. Geleceğe birlikte bakmak uyumu getirir.',
    reversed:
      'Ters Değnek İkilisi, belirsizlik ve karar verememe iletişimi zedeleyebilir. Net bir yön belirlemek anlaşmayı kolaylaştırır.',
    keywords: ['vizyon', 'plan', 'karar', 'gelecek'],
    context: 'Ortak vizyon iletişim uyumunu artırır.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_wa_pos8',
    card: 'Three of Wands',
    position: 8,
    upright:
      'Değnek Üçlüsü, iletişimde genişleme ve karşılıklı destek potansiyelini gösterir. Açık ufuklar anlaşmayı güçlendirir.',
    reversed:
      'Ters Değnek Üçlüsü, dar görüşlülüğün uyumu zorlaştırabileceğini işaret eder. Açık fikirli olmak anlaşmayı sağlar.',
    keywords: ['genişleme', 'destek', 'ufuk', 'iletişim'],
    context: 'Açık ufuklar anlaşmayı büyütür.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_wa_pos8',
    card: 'Four of Wands',
    position: 8,
    upright:
      'Değnek Dörtlüsü, iletişimde kutlama, istikrar ve uyumun göstergesidir. Birlikte inşa edilen güven anlaşmayı kolaylaştırır.',
    reversed:
      'Ters Değnek Dörtlüsü, geçici huzursuzlukların iletişimi zorlayabileceğini gösterir. Küçük kutlamalar bağı güçlendirir.',
    keywords: ['istikrar', 'kutlama', 'güven', 'uyum'],
    context: 'Birlikte kutlamak anlaşmayı derinleştirir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_wa_pos8',
    card: 'Five of Wands',
    position: 8,
    upright:
      'Değnek Beşlisi, fikir çatışmalarının iletişimde öne çıkabileceğini gösterir. Sağlıklı tartışma uyumu güçlendirir.',
    reversed:
      'Ters Değnek Beşlisi, bastırılmış öfkenin iletişimi zedeleyebileceğini söyler. Açık ve yapıcı konuşma anlaşmayı kolaylaştırır.',
    keywords: ['çatışma', 'tartışma', 'enerji', 'iletişim'],
    context: 'Sağlıklı tartışma anlaşmayı güçlendirir.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_wa_pos8',
    card: 'Six of Wands',
    position: 8,
    upright:
      'Değnek Altılısı, iletişimde takdir ve görünür başarıyı işaret eder. Karşılıklı onay uyumu büyütür.',
    reversed:
      'Ters Değnek Altılısı, takdir eksikliğinin anlaşmayı zorlaştırabileceğini gösterir. Küçük övgüler bağı güçlendirir.',
    keywords: ['takdir', 'başarı', 'onay', 'iletişim'],
    context: 'Takdir paylaşımı uyumu artırır.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_wa_pos8',
    card: 'Seven of Wands',
    position: 8,
    upright:
      'Değnek Yedilisi, iletişimde kendi sınırlarını savunmayı gösterir. Tutarlı duruş anlaşmayı sağlar.',
    reversed:
      'Ters Değnek Yedilisi, savunmacı tavrın iletişimi zorlaştırabileceğini işaret eder. Esneklik uyumu getirir.',
    keywords: ['savunma', 'sınır', 'kararlılık', 'iletişim'],
    context: 'Tutarlı sınırlar anlaşmayı kolaylaştırır.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_wa_pos8',
    card: 'Eight of Wands',
    position: 8,
    upright:
      'Değnek Sekizlisi, hızlı ve akıcı iletişimi işaret eder. Zamanında mesajlar anlaşmayı güçlendirir.',
    reversed:
      'Ters Değnek Sekizlisi, gecikme ve yanlış anlaşılmaların uyumu zorlayabileceğini söyler. Netlik bağı kurtarır.',
    keywords: ['hız', 'akış', 'mesaj', 'iletişim'],
    context: 'Zamanında iletişim uyumu artırır.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_wa_pos8',
    card: 'Nine of Wands',
    position: 8,
    upright:
      'Değnek Dokuzlusu, iletişimde sabır ve dayanıklılığı işaret eder. Vazgeçmemek uyumu güçlendirir.',
    reversed:
      'Ters Değnek Dokuzlusu, yorgunluğun iletişimi zorlaştırabileceğini gösterir. Küçük molalar bağı korur.',
    keywords: ['sabır', 'dayanıklılık', 'yorgunluk', 'iletişim'],
    context: 'Sabır uyumu güçlendirir.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_wa_pos8',
    card: 'Ten of Wands',
    position: 8,
    upright:
      'Değnek Onlusu, iletişimde yüklerin paylaşımını gösterir. Ortak sorumluluk uyumu kolaylaştırır.',
    reversed:
      'Ters Değnek Onlusu, aşırı yüklenmenin iletişimi bozabileceğini gösterir. Paylaşım anlaşmayı sağlar.',
    keywords: ['yük', 'sorumluluk', 'paylaşım', 'iletişim'],
    context: 'Yük paylaşımı uyumu artırır.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_wa_pos8',
    card: 'Page of Wands',
    position: 8,
    upright:
      'Değnek Prensi, iletişimde keşif ve merak enerjisini getirir. Yeni yaklaşımlar anlaşmayı güçlendirir.',
    reversed:
      'Ters Değnek Prensi, dağınık iletişimin uyumu zorlaştırabileceğini söyler. Odaklanmak anlaşmayı kolaylaştırır.',
    keywords: ['merak', 'keşif', 'enerji', 'iletişim'],
    context: 'Merak uyumu güçlendirir.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_wa_pos8',
    card: 'Knight of Wands',
    position: 8,
    upright:
      'Değnek Şövalyesi, tutkulu ve atılgan iletişimi işaret eder. Cesur ifadeler uyumu güçlendirir.',
    reversed:
      'Ters Değnek Şövalyesi, aceleci ve düşüncesiz iletişimin bağı zorlayabileceğini gösterir. Denge uyumu getirir.',
    keywords: ['tutku', 'cesaret', 'atılganlık', 'iletişim'],
    context: 'Cesur ifade uyumu artırır.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_wa_pos8',
    card: 'Queen of Wands',
    position: 8,
    upright:
      'Değnek Kraliçesi, sıcak ve karizmatik iletişimi işaret eder. Samimiyet uyumu büyütür.',
    reversed:
      'Ters Değnek Kraliçesi, kıskançlık veya güvensizlik gölgesinin iletişimi zorlaştırabileceğini gösterir. Öz değer uyumu getirir.',
    keywords: ['karizma', 'samimiyet', 'güven', 'iletişim'],
    context: 'Samimiyet uyumu büyütür.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_wa_pos8',
    card: 'King of Wands',
    position: 8,
    upright:
      'Değnek Kralı, vizyoner ve lider bir iletişimi işaret eder. Net yönlendirme uyumu sağlar.',
    reversed:
      'Ters Değnek Kralı, baskıcı tavrın iletişimi zorlaştırabileceğini gösterir. Dinlemek bağı güçlendirir.',
    keywords: ['liderlik', 'vizyon', 'dinleme', 'iletişim'],
    context: 'Liderlik ve dinleme uyumu getirir.',
    group: 'Asalar',
  },
];

// Kart adına göre pozisyon 8 anlamını bulma fonksiyonu
export const getposition8Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return position8Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getmarriageposition8Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return getposition8Meaning(cardName);
};

// Kart adına göre pozisyon 8 anlamını bulma fonksiyonu (ana index için)
export const getmarriageposition8MeaningByCardName = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  const meaning = getposition8Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 8 anlamlarını alma fonksiyonu
export const getAllposition8Meanings = (): MarriagePositionMeaning[] => {
  return position8Meanings;
};

// pozisyon 8 anlamlarını filtreleme fonksiyonu
export const getposition8MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return position8Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 8 anlamlarını arama
export const searchposition8MeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
  return position8Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position8Meanings,
  getposition8Meaning,
  getAllposition8Meanings,
  getposition8MeaningsByGroup,
  searchposition8MeaningsByKeyword,
};
