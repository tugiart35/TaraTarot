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
- position4Meanings: gerekli
- getposition4Meaning: gerekli
*/

import { SituationAnalysisPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position4Meanings: SituationAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_sa_pos4',
    card: 'The Fool',
    position: 4,
    upright:
      'Merkezde taze başlangıç, merak ve cesur adım atma ihtiyacı var. Akışa güvenmek ve ilk adımı koymak, tüm tabloyu canlandıran ana unsur olabilir.',
    reversed:
      'Merkezde plansızlık, kararsız sıçramalar veya bağlanmaktan kaçınma baskın. Riskleri tartmadan hareket etmek odağı dağıtıyor olabilir.',
    keywords: ['başlangıç', 'cesaret', 'merak', 'risk', 'özgürlük'],
    context: 'Merkez: yeniye atılan ilk adımın kalp atışı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_sa_pos4',
    card: 'The Magician',
    position: 4,
    upright:
      'Merkezde niyetin gücü, odak ve kaynakları ustaca birleştirme teması var. Sözü eyleme bağlamak tüm düzenin eksik dişlisini tamamlar.',
    reversed:
      'Merkezde dağınık niyet, iletişimde kopukluk veya öz-sabotaj görülebilir. Gücünüz var ancak kanal yanlış ayarlı olabilir.',
    keywords: ['niyet', 'odak', 'ifade', 'kaynak', 'manifest'],
    context: 'Merkez: niyet ile eylemi aynı hatta almak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_sa_pos4',
    card: 'The High Priestess',
    position: 4,
    upright:
      'Merkezde sezgi, iç bilgi ve sakin gözlem bulunuyor. Aceleden çok derin dinleme, durumun özüne ışık tutuyor.',
    reversed:
      'Merkezde iç sesi bastırma veya işaretleri görmezden gelme var. Dış gürültü, gerçek odaktan uzaklaştırıyor olabilir.',
    keywords: ['sezgi', 'bilgelik', 'giz', 'içe dönüş', 'sükunet'],
    context: 'Merkez: iç rehberliğin sesi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_sa_pos4',
    card: 'The Empress',
    position: 4,
    upright:
      'Merkezde bereket, bakım ve üretken yaratıcılık teması güçlü. Beslemek ve büyütmek, sürecin kalbini ısıtıyor.',
    reversed:
      'Merkezde öz-bakım eksikliği, aşırı sahiplenme veya tıkanmış üretkenlik görülebilir. Önce kendini beslemek odağı netleştirir.',
    keywords: ['bereket', 'yaratıcılık', 'besleme', 'şefkat', 'üretim'],
    context: 'Merkez: besleyen enerjinin odağı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_sa_pos4',
    card: 'The Emperor',
    position: 4,
    upright:
      'Merkezde yapı, düzen ve stratejik liderlik ihtiyacı var. Net sınırlar ve kurallar, bütün tabloyu ayakta tutar.',
    reversed:
      'Merkezde katılık veya aşırı kontrol eğilimi hakim olabilir. Esnekliği artırmak, sistemi daha dayanıklı kılar.',
    keywords: ['yapı', 'otorite', 'sınır', 'strateji', 'stabilite'],
    context: 'Merkez: düzen kuran eksen.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_sa_pos4',
    card: 'The Hierophant',
    position: 4,
    upright:
      'Merkezde gelenek, öğreti ve güvenilir rehberlik var. Sınanmış yöntemler, belirsizliği azaltan ana bileşen olabilir.',
    reversed:
      'Merkezde dogmaya sıkışma veya tepkisel başkaldırı görülebilir. Kör uyum ile kör reddediş arasında orta yol gerekir.',
    keywords: ['gelenek', 'rehberlik', 'ritüel', 'kurum', 'öğrenme'],
    context: 'Merkez: güven veren çerçeve.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_sa_pos4',
    card: 'The Lovers',
    position: 4,
    upright:
      'Merkezde değer uyumu ve bilinçli bir seçim bulunuyor. Kalp ve akıl aynı çizgide buluştuğunda bütün tablo akışa girer.',
    reversed:
      'Merkezde değer çatışması veya kararsızlık odağı dağıtıyor olabilir. Kriterleri netleştirmek temel çözüm.',
    keywords: ['seçim', 'uyum', 'değerler', 'bağ', 'karar'],
    context: 'Merkez: değerlerle hizalanmış seçim.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_sa_pos4',
    card: 'The Chariot',
    position: 4,
    upright:
      'Merkezde irade, disiplin ve yön hakimiyeti var. Zıt güçleri aynı hedefe sürmek başarıyı tetikler.',
    reversed:
      'Merkezde yön kaybı, savrulma veya kontrol zafiyeti görülebilir. Rotayı sadeleştirmek odağı geri getirir.',
    keywords: ['irade', 'kontrol', 'yön', 'zafer', 'disiplin'],
    context: 'Merkez: tek hedefe odaklı güç.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_sa_pos4',
    card: 'Strength',
    position: 4,
    upright:
      'Merkezde sakin cesaret ve şefkatli güç yer alıyor. Yumuşak ikna, kapıları sert kuvvetten daha iyi açıyor.',
    reversed:
      'Merkezde özgüven dalgalanması veya sabırsızlık tabloyu zedeliyor olabilir. İç sesi sakinleştirmek ekseni güçlendirir.',
    keywords: ['cesaret', 'şefkat', 'özgüven', 'sabır', 'zarafet'],
    context: 'Merkez: yumuşak güçle denge.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_sa_pos4',
    card: 'The Hermit',
    position: 4,
    upright:
      'Merkezde içe dönüş, bilgelik ve yalnız düşünme ihtiyacı var. Gürültüyü kısmak, öz ışığı merkeze alır.',
    reversed:
      'Merkezde aşırı izolasyon veya içe kapanma görülebilir. Seçici paylaşım denge sağlar.',
    keywords: ['inziva', 'bilgelik', 'rehberlik', 'içe dönüş', 'netlik'],
    context: 'Merkez: iç fenerin rehberliği.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_sa_pos4',
    card: 'The Wheel of Fortune',
    position: 4,
    upright:
      'Merkezde döngülerin dönüşü ve zamanlama etkisi var. Akışla uyum ana unsur olabilir.',
    reversed:
      'Merkezde tekrar eden kalıplar veya kötü zamanlama hissi baskın. Farklı bir seçim çarkı çevirebilir.',
    keywords: ['döngü', 'şans', 'zamanlama', 'kader', 'değişim'],
    context: 'Merkez: akışın dümeni.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_sa_pos4',
    card: 'Justice',
    position: 4,
    upright:
      'Merkezde adalet, denge ve sebep-sonuç bilinci var. Şeffaflık ve sorumluluk sistemi ayakta tutar.',
    reversed:
      'Merkezde yanlı bakış veya kaçınılan sorumluluk dengeyi bozuyor olabilir. Telafi, teraziyi düzeltir.',
    keywords: ['adalet', 'denge', 'hakikat', 'karar', 'sorumluluk'],
    context: 'Merkez: terazinin ayarı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_sa_pos4',
    card: 'The Hanged Man',
    position: 4,
    upright:
      'Merkezde perspektif değişimi ve bilinçli duraklama var. Teslimiyet, kilidi yumuşatır.',
    reversed:
      'Merkezde gereksiz askıda kalış veya verimsiz fedakarlık görülebilir. Bağı kesmek odağı tazeler.',
    keywords: ['perspektif', 'teslimiyet', 'duraklama', 'feda', 'aydınlanma'],
    context: 'Merkez: yeni bakışın kavşağı.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_sa_pos4',
    card: 'Death',
    position: 4,
    upright:
      'Merkezde güçlü bir dönüşüm ve kapanışın gerekliliği var. Yer açıldığında yenisi doğar.',
    reversed:
      'Merkezde bitişten kaçınma ve tutunma eğilimi odağı dağıtıyor olabilir. Vedalaşma, kalbi hafifletir.',
    keywords: ['dönüşüm', 'bitiş', 'yeniden doğuş', 'bırakma', 'değişim'],
    context: 'Merkez: bırakmanın kapısı.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_sa_pos4',
    card: 'Temperance',
    position: 4,
    upright:
      'Merkezde ölçülülük, sentez ve şifa karışımı var. Orta yol, sistemi uyumda tutar.',
    reversed:
      'Merkezde aşırılık veya uyumsuz karışımlar dengeyi bozuyor olabilir. Doz ayarı şart.',
    keywords: ['denge', 'sentez', 'şifa', 'sabır', 'uyum'],
    context: 'Merkez: karışımın doğru oranı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_sa_pos4',
    card: 'The Devil',
    position: 4,
    upright:
      'Merkezde bağlayan arzular, bağımlılıklar veya kısıtlayıcı anlaşmalar var. Kısa vadeli rahatlık bedel çıkarabilir.',
    reversed:
      'Merkezde çözülme ve özgürleşme isteği beliriyor. Zincir ilk halkadan kopar.',
    keywords: ['bağlılık', 'gölge', 'arzu', 'kontrol', 'özgürleşme'],
    context: 'Merkez: bağ çözmenin düğümü.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_sa_pos4',
    card: 'The Tower',
    position: 4,
    upright:
      'Merkezde kaçınılmaz bir kırılma ve hakikatin açığa çıkışı var. Çürük temel yıkılırken sağlamı kurulur.',
    reversed:
      'Merkezde ertelenmiş kriz veya bastırılmış patlama görülebilir. Bilinçli yıkım, zararı azaltır.',
    keywords: ['kriz', 'yıkım', 'gerçek', 'arınma', 'yeniden inşa'],
    context: 'Merkez: arındırıcı sarsıntı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_sa_pos4',
    card: 'The Star',
    position: 4,
    upright: 'Merkezde umut, şifa ve sadeleşme var. Şeffaflık ilhamı çoğaltır.',
    reversed:
      'Merkezde umutsuzluk veya tükenmişlik gölgesi bulunabilir. Küçük ritüeller ışığı geri çağırır.',
    keywords: ['umut', 'şifa', 'ilham', 'sadelik', 'yenilenme'],
    context: 'Merkez: huzurun kaynağı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_sa_pos4',
    card: 'The Moon',
    position: 4,
    upright:
      'Merkezde belirsizlik, sezgisel derinlik ve sembolik rehberlik var. Sis aceleyi sevmez.',
    reversed:
      'Merkezde yanılsamadan uyanış veya korkularla yüzleşme beliriyor. Yavaş açıklık güveni artırır.',
    keywords: ['belirsizlik', 'sezgi', 'korku', 'yanılsama', 'içgörü'],
    context: 'Merkez: sisin içindeki pusula.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_sa_pos4',
    card: 'The Sun',
    position: 4,
    upright:
      'Merkezde açıklık, neşe ve görünür başarı var. Enerji yüksek, güven bulaşıcı.',
    reversed:
      'Merkezde geçici karamsarlık veya görünürlük çekincesi olabilir. Küçük zaferleri kutlamak ışığı büyütür.',
    keywords: ['başarı', 'neşe', 'aydınlık', 'özgüven', 'canlılık'],
    context: 'Merkez: parlama noktası.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_sa_pos4',
    card: 'Judgement',
    position: 4,
    upright:
      'Merkezde uyanış, çağrıya cevap ve geçmişten arınma var. Hesaplaşma, yeni bir doğumu tetikler.',
    reversed:
      'Merkezde öz-yargı veya erteleme odağı dağıtıyor olabilir. Şefkatli kabul kapıyı açar.',
    keywords: ['uyanış', 'karar', 'affediş', 'yenilenme', 'çağrı'],
    context: 'Merkez: çağrının merkezi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_sa_pos4',
    card: 'The World',
    position: 4,
    upright:
      'Merkezde tamamlanma, bütünlük ve döngü kapanışı var. Entegrasyon yeni aşamayı güçlendirir.',
    reversed:
      'Merkezde yarım kalmışlık veya bitirmeden yeniye geçme eğilimi olabilir. Eksikleri kapatmak şart.',
    keywords: ['tamamlanma', 'bütünlük', 'entegrasyon', 'döngü', 'başarı'],
    context: 'Merkez: kapanışın tacı.',
    group: 'Majör Arkana',
  },

  // CUPS (Kupalar)
  {
    id: 'ace_of_cups_sa_pos4',
    card: 'Ace of Cups',
    position: 4,
    upright:
      'Merkezde duygusal açılım, şefkat ve kalp akışı var. İfade edilen duygu, tüm ilişkileri besleyen ana kaynaktır.',
    reversed:
      'Merkezde duygusal tıkanma veya bastırma olabilir. Güvenli ifade, kalbi yeniden açar.',
    keywords: ['açılım', 'şefkat', 'ifade', 'akış', 'iyileşme'],
    context: 'Merkez: kalbin çeşmesi.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_sa_pos4',
    card: 'Two of Cups',
    position: 4,
    upright:
      'Merkezde karşılıklılık, uyum ve ortaklık dengesi var. Eşit alışveriş köprüyü güçlendirir.',
    reversed:
      'Merkezde dengesiz bağ veya yanlış anlaşılmalar olabilir. Açık sınır ve net ihtiyaçlar dengeyi kurar.',
    keywords: ['uyum', 'bağ', 'eşitlik', 'diyalog', 'güven'],
    context: 'Merkez: bağın kalbi.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_sa_pos4',
    card: 'Three of Cups',
    position: 4,
    upright:
      'Merkezde topluluk, dostluk ve kutlama enerjisi var. Paylaşım neşeyi çoğaltır.',
    reversed:
      'Merkezde sosyal yorgunluk veya yüzeysellik olabilir. Kaliteli bağlara alan açmak gerekir.',
    keywords: ['topluluk', 'dostluk', 'kutlama', 'paylaşım', 'destek'],
    context: 'Merkez: birlikte olmanın coşkusu.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_sa_pos4',
    card: 'Four of Cups',
    position: 4,
    upright:
      'Merkezde tatminsizlik ve iç gözlem eğilimi var. Önündeki fırsat fark edilmeyi bekliyor.',
    reversed:
      'Merkezde uyanış ve şükranla canlanma potansiyeli artıyor. Odak yenilenmeli.',
    keywords: ['tatminsizlik', 'içe dönüş', 'fırsat', 'farkındalık', 'şükran'],
    context: 'Merkez: anlam arayışının çekirdeği.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_sa_pos4',
    card: 'Five of Cups',
    position: 4,
    upright:
      'Merkezde kayıp ve yas teması öne çıkıyor. Geriye değil, elde olana bakmak dengeyi kurar.',
    reversed:
      'Merkezde toparlanma ve kabullenme filizleniyor. Umudu yeniden örgülemek anahtar.',
    keywords: ['kayıp', 'yas', 'kabul', 'şifa', 'umut'],
    context: 'Merkez: yasın dönüştürücü noktası.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_sa_pos4',
    card: 'Six of Cups',
    position: 4,
    upright:
      'Merkezde nostalji ve iç çocukla temas var. Geçmişin sıcaklığı bugünü yumuşatır.',
    reversed:
      'Merkezde geçmişe tutunma ilerlemeyi zorlayabilir. Anıyı onurlandır, odağı bugüne getir.',
    keywords: ['nostalji', 'iç çocuk', 'anı', 'şefkat', 'yenilenme'],
    context: 'Merkez: hatıranın şifası.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_sa_pos4',
    card: 'Seven of Cups',
    position: 4,
    upright:
      'Merkezde seçenek bolluğu ve hayal cazibesi var. Net ölçütler dağılmayı önler.',
    reversed:
      'Merkezde ayıklama ve netleşme süreci başlıyor. Gerçekçilik odağı güçlendirir.',
    keywords: ['seçenek', 'hayal', 'netlik', 'öncelik', 'vizyon'],
    context: 'Merkez: seçim pusulası.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_sa_pos4',
    card: 'Eight of Cups',
    position: 4,
    upright:
      'Merkezde anlam arayışı ve olgun bir ayrılış ihtiyacı var. Kalp daha derin bir doğruluk istiyor.',
    reversed:
      'Merkezde gitmek-kalmak ikilemi odağı yoruyor. Kapanış ritüeli yönü belirler.',
    keywords: ['ayrılış', 'anlam', 'yol', 'cesaret', 'kapanış'],
    context: 'Merkez: daha anlamlıya yöneliş.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_sa_pos4',
    card: 'Nine of Cups',
    position: 4,
    upright:
      'Merkezde kişisel tatmin ve minnet var. Başarıyı paylaşmak bolluğu artırır.',
    reversed:
      'Merkezde yüzeysel haz veya doyumsuzluk gölgesi olabilir. Değer odaklı hedefler gerçek doyumu getirir.',
    keywords: ['tatmin', 'minnet', 'bolluk', 'haz', 'doyum'],
    context: 'Merkez: kalbin doyum noktası.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_sa_pos4',
    card: 'Ten of Cups',
    position: 4,
    upright:
      'Merkezde aile/kalp çevresinde uyum ve huzur var. Birlik duygusu tabloyu tamamlar.',
    reversed:
      'Merkezde ideal-realite gerilimi görülebilir. Sahici diyalog köprüyü onarır.',
    keywords: ['uyum', 'aile', 'huzur', 'birlik', 'gerçeklik'],
    context: 'Merkez: ev duygusu.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_sa_pos4',
    card: 'Page of Cups',
    position: 4,
    upright:
      'Merkezde yaratıcı sezgi ve masum merak var. Küçük ilhamlar büyük kapılar açar.',
    reversed:
      'Merkezde aşırı hassasiyet veya kaçış eğilimi olabilir. Duyguyu somut adımla dengele.',
    keywords: ['ilham', 'merak', 'hassasiyet', 'ifade', 'oyun'],
    context: 'Merkez: ilhamın kıvılcımı.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_sa_pos4',
    card: 'Knight of Cups',
    position: 4,
    upright:
      'Merkezde idealizm ve kalpten hareket var. Zarafetle yaklaşmak kapı açar.',
    reversed:
      'Merkezde tutarsız vaat veya aşırı romantikleştirme olabilir. Netlik ve süreklilik şart.',
    keywords: ['ideal', 'teklif', 'zarafet', 'vizyon', 'duygu'],
    context: 'Merkez: kalpten eylem.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_sa_pos4',
    card: 'Queen of Cups',
    position: 4,
    upright:
      'Merkezde empati, sezgisel liderlik ve güvenli duygusal alan var. Şefkat akışı besler.',
    reversed:
      'Merkezde sınır erimesi veya duygusal taşma olabilir. Öz-düzenleme dengeyi kurar.',
    keywords: ['empati', 'şefkat', 'sezgi', 'sınır', 'şifa'],
    context: 'Merkez: şefkatli alan tutma.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_sa_pos4',
    card: 'King of Cups',
    position: 4,
    upright:
      'Merkezde duygusal olgunluk ve sakin liderlik var. Fırtınada merkezde kalmak güven verir.',
    reversed:
      'Merkezde bastırılmış duygu veya pasif agresyon olabilir. Açık ifade güveni onarır.',
    keywords: ['olgunluk', 'sükunet', 'duygu yönetimi', 'liderlik', 'güven'],
    context: 'Merkez: dingin kaptan.',
    group: 'Kupalar',
  },

  // SWORDS (Kılıçlar)
  {
    id: 'ace_of_swords_sa_pos4',
    card: 'Ace of Swords',
    position: 4,
    upright:
      'Merkezde netlik ve çıplak gerçek var. Doğru cümle tüm resmi hizalar.',
    reversed:
      'Merkezde bulanıklık veya aşırı analiz odağı dağıtıyor olabilir. Mesajı sadeleştir.',
    keywords: ['netlik', 'hakikat', 'karar', 'kavrayış', 'ifade'],
    context: 'Merkez: keskin zihin.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sa_pos4',
    card: 'Two of Swords',
    position: 4,
    upright:
      'Merkezde ikilem ve bekleme stratejisi var. Duyguyu masaya almak teraziyi dengeler.',
    reversed:
      'Merkezde kaçınılan yüzleşme kararı geciktiriyor. Kör nokta aydınlatılmalı.',
    keywords: ['ikilem', 'kararsızlık', 'denge', 'yüzleşme', 'kör nokta'],
    context: 'Merkez: karar düğümü.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sa_pos4',
    card: 'Three of Swords',
    position: 4,
    upright:
      'Merkezde kırgınlık veya sert bir gerçek var. Yasın payı berraklığı getirir.',
    reversed:
      'Merkezde iyileşme isteği filizleniyor. Şefkatli dil düğümü çözer.',
    keywords: ['kırgınlık', 'yas', 'hakikat', 'iyileşme', 'ifade'],
    context: 'Merkez: acıyla yüzleşme.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sa_pos4',
    card: 'Four of Swords',
    position: 4,
    upright:
      'Merkezde dinlenme ve zihni toplama ihtiyacı var. Sükunet, stratejiyi olgunlaştırır.',
    reversed: 'Merkezde mola direnci tükenmişliği büyütür. Mikro molalar şart.',
    keywords: ['dinlenme', 'toparlanma', 'strateji', 'sükunet', 'yenilenme'],
    context: 'Merkez: sessiz güç.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sa_pos4',
    card: 'Five of Swords',
    position: 4,
    upright:
      'Merkezde haklı çıkma arzusu çatışmayı sertleştiriyor olabilir. Köprüleri korumak için kazanımı yeniden tanımlayın.',
    reversed: 'Merkezde onarım niyeti var. Esnek müzakere gerilimi çözer.',
    keywords: ['çatışma', 'ego', 'haklılık', 'onarım', 'müzakere'],
    context: 'Merkez: bağ mı haklılık mı.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sa_pos4',
    card: 'Six of Swords',
    position: 4,
    upright:
      'Merkezde sakin sulara geçiş var. Kademeli uzaklaşma en sağlıklısı.',
    reversed:
      'Merkezde geçmişe bağlayan ipler rotayı bulandırıyor. Destekle geçişi kolaylaştır.',
    keywords: ['geçiş', 'rota', 'sükunet', 'iyileşme', 'uzaklaşma'],
    context: 'Merkez: güvenli geçiş hattı.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sa_pos4',
    card: 'Seven of Swords',
    position: 4,
    upright:
      'Merkezde strateji ve görünürlüğü düşük ilerleyiş var. Niyet temizse asgari gizlilik faydalı.',
    reversed:
      'Merkezde öz-aldatma veya yarım gerçekler güveni aşındırıyor. Şeffaf hizalama şart.',
    keywords: ['strateji', 'taktik', 'gizlilik', 'güven', 'dürüstlük'],
    context: 'Merkez: akıllı planın çizgisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sa_pos4',
    card: 'Eight of Swords',
    position: 4,
    upright:
      'Merkezde öz-kısıt inançları çevreliyor. Küçük kanıtlar zinciri gevşetir.',
    reversed:
      'Merkezde çözülme başlıyor, fakat eski korkular yokluyor. Destek iste.',
    keywords: ['öz-kısıt', 'korku', 'zihin tuzağı', 'özgürleşme', 'deney'],
    context: 'Merkez: ipleri çözmek.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sa_pos4',
    card: 'Nine of Swords',
    position: 4,
    upright:
      'Merkezde kaygı ve geceler var. Yazmak ve kanıt aramak döngüyü zayıflatır.',
    reversed:
      'Merkezde sabah netliği artıyor. Regülasyon ve küçük zaferler dengeyi kurar.',
    keywords: [
      'kaygı',
      'uykusuzluk',
      'felaketleştirme',
      'regülasyon',
      'gerçeklik',
    ],
    context: 'Merkez: kaygı düğmesi.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sa_pos4',
    card: 'Ten of Swords',
    position: 4,
    upright: 'Merkezde bir döngü bitti. Bitişi onurlandırmak yeniye yer açar.',
    reversed: 'Merkezde toparlanma başlıyor. Yeniden çerçeve güç verir.',
    keywords: ['bitiş', 'teslim', 'yeniden doğuş', 'iyileşme', 'kapanış'],
    context: 'Merkez: sonun hediyesi.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sa_pos4',
    card: 'Page of Swords',
    position: 4,
    upright:
      'Merkezde merak ve gözlem var. Seçici veri toplamak ilerleyişi hızlandırır.',
    reversed:
      'Merkezde acele yargı veya dedikodu riski var. Kaynak doğrulama şart.',
    keywords: ['merak', 'gözlem', 'öğrenme', 'iletişim', 'doğrulama'],
    context: 'Merkez: keşfin kıyısı.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sa_pos4',
    card: 'Knight of Swords',
    position: 4,
    upright:
      'Merkezde hızlı hamle ve net savunu var. Hız, stratejiyle birleşince keskin sonuç üretir.',
    reversed:
      'Merkezde acelecilik üslubu sertleştirebilir. Nefes–dur–konuş ritmi faydalı.',
    keywords: ['hız', 'kararlılık', 'savunma', 'strateji', 'ifade'],
    context: 'Merkez: süratli akıl.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sa_pos4',
    card: 'Queen of Swords',
    position: 4,
    upright:
      'Merkezde netlik, sınır ve nesnellik var. Serin akıl adil karar verir.',
    reversed:
      'Merkezde aşırı eleştiri bağlantıyı inceltebilir. Şefkatli dil etkili olur.',
    keywords: ['netlik', 'sınır', 'nesnellik', 'adalet', 'iletişim'],
    context: 'Merkez: berrak pusula.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sa_pos4',
    card: 'King of Swords',
    position: 4,
    upright:
      'Merkezde ilkeler ve stratejik mantık var. Etik güç güven inşa eder.',
    reversed: 'Merkezde katılık veya dogma riski var. Empatiyle dengeleyin.',
    keywords: ['etik', 'mantık', 'otorite', 'strateji', 'empati'],
    context: 'Merkez: ilkeli zihin.',
    group: 'Kılıçlar',
  },

  // WANDS (Asalar)
  {
    id: 'ace_of_wands_sa_pos4',
    card: 'Ace of Wands',
    position: 4,
    upright:
      'Merkezde ilham kıvılcımı ve harekete geçme var. İlk adım ateşi büyütür.',
    reversed:
      'Merkezde ilham tıkanması veya erteleme olabilir. Küçük eylem akışı açar.',
    keywords: ['ilham', 'başlangıç', 'enerji', 'cesaret', 'hareket'],
    context: 'Merkez: ateşin kıvılcımı.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_sa_pos4',
    card: 'Two of Wands',
    position: 4,
    upright:
      'Merkezde vizyon ve planlama var. Konfor alanından kontrollü çıkış gerekir.',
    reversed:
      'Merkezde tereddüt vizyonu küçültüyor. İlk küçük adım ivme verir.',
    keywords: ['vizyon', 'plan', 'ufuk', 'karar', 'genişleme'],
    context: 'Merkez: ufuk çizimi.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_sa_pos4',
    card: 'Three of Wands',
    position: 4,
    upright:
      'Merkezde genişleme ve işbirlikleri var. Hazırlıklar meyveye dönüyor.',
    reversed:
      'Merkezde gecikme algısı veya dar görüşlülük olabilir. Planı revize edin.',
    keywords: ['genişleme', 'fırsat', 'işbirliği', 'ufuk', 'zamanlama'],
    context: 'Merkez: ufka yolculuk.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_sa_pos4',
    card: 'Four of Wands',
    position: 4,
    upright:
      'Merkezde istikrar ve kutlama eşiği var. Temel sağlamlaştırılmalı.',
    reversed:
      'Merkezde geçici düzensizlik veya yarım kalmışlık olabilir. Ritüeller denge kurar.',
    keywords: ['istikrar', 'temel', 'kutlama', 'aidiyet', 'eşik'],
    context: 'Merkez: temelin taşı.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_sa_pos4',
    card: 'Five of Wands',
    position: 4,
    upright:
      'Merkezde rekabet ve prova çatışması var. Kuralları netleştirmek üretkenlik sağlar.',
    reversed:
      'Merkezde bastırılmış gerilim olabilir. Yapılandırılmış diyalog şart.',
    keywords: ['rekabet', 'çatışma', 'prova', 'diyalog', 'netlik'],
    context: 'Merkez: mücadeleyi yapılandırmak.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_sa_pos4',
    card: 'Six of Wands',
    position: 4,
    upright:
      'Merkezde görünür başarı ve tanınma var. Paylaşılan zafer motivasyonu artırır.',
    reversed:
      'Merkezde takdir eksikliği algısı olabilir. Şeffaf metrikler algıyı düzeltir.',
    keywords: ['zafer', 'tanınma', 'motivasyon', 'liderlik', 'iletişim'],
    context: 'Merkez: zafer anı.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_sa_pos4',
    card: 'Seven of Wands',
    position: 4,
    upright:
      'Merkezde pozisyonu savunma ve sınır koruma var. Tutarlılık avantaj sağlar.',
    reversed:
      'Merkezde yorgunluk savunmayı sertleştiriyor olabilir. Delege etmek hafifletir.',
    keywords: ['savunma', 'sınır', 'kararlılık', 'öncelik', 'direnç'],
    context: 'Merkez: hattı tutmak.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_sa_pos4',
    card: 'Eight of Wands',
    position: 4,
    upright: 'Merkezde hız ve akış var. Zamanında mesaj fırsat penceresi açar.',
    reversed:
      'Merkezde gecikme ve sinyal karmaşası olabilir. Sıralamayı sadeleştirin.',
    keywords: ['hız', 'ivme', 'iletişim', 'senkron', 'akış'],
    context: 'Merkez: ivme yönetimi.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_sa_pos4',
    card: 'Nine of Wands',
    position: 4,
    upright:
      'Merkezde dayanıklılık ve son viraj psikolojisi var. Küçük molalar gücü korur.',
    reversed:
      'Merkezde tükenmişlik veya aşırı tetikte olma olabilir. Destek ağı kurun.',
    keywords: ['dayanıklılık', 'tetikte', 'mola', 'süreklilik', 'koruma'],
    context: 'Merkez: son düzlük.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_sa_pos4',
    card: 'Ten of Wands',
    position: 4,
    upright:
      'Merkezde aşırı yük ve tamamlama baskısı var. Önceliklendirme ve delege şart.',
    reversed:
      'Merkezde bırakılması gereken yükler tutuluyor. Sadelik kaliteyi artırır.',
    keywords: ['yük', 'sorumluluk', 'tamamlama', 'delege', 'sadelik'],
    context: 'Merkez: yük yönetimi.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_sa_pos4',
    card: 'Page of Wands',
    position: 4,
    upright:
      'Merkezde keşif ve deneme hevesi var. Küçük adım öğrenmeyi hızlandırır.',
    reversed:
      'Merkezde dağınık ilgi ve çabuk sıkılma olabilir. Mikro hedefler kurun.',
    keywords: ['keşif', 'heves', 'deney', 'öğrenme', 'odak'],
    context: 'Merkez: merak motoru.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_sa_pos4',
    card: 'Knight of Wands',
    position: 4,
    upright: 'Merkezde cesur hamle ve tutku var. Hız stratejiyle buluşmalı.',
    reversed:
      'Merkezde savrukluk veya yarıda bırakma riski var. Taahhüt yönetimi gerek.',
    keywords: ['cesaret', 'hız', 'tutku', 'strateji', 'taahhüt'],
    context: 'Merkez: atılgan enerjinin dizgini.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_sa_pos4',
    card: 'Queen of Wands',
    position: 4,
    upright:
      'Merkezde karizma ve sıcak liderlik var. Görünürlük alanı büyütür.',
    reversed:
      'Merkezde güvensizlik veya kıskançlık gölgesi olabilir. Öz-değerle hizalanın.',
    keywords: ['karizma', 'liderlik', 'özgüven', 'görünürlük', 'ilham'],
    context: 'Merkez: manyetik etki.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_sa_pos4',
    card: 'King of Wands',
    position: 4,
    upright:
      'Merkezde vizyoner liderlik ve stratejik cesaret var. Yetki devri ölçek sağlar.',
    reversed:
      'Merkezde otoriterleşme veya ego sürtüşmesi olabilir. Dinleme kasını güçlendirin.',
    keywords: ['vizyon', 'liderlik', 'cesaret', 'ölçek', 'dinleme'],
    context: 'Merkez: vizyonun direksiyonu.',
    group: 'Asalar',
  },

  // PENTACLES (Tılsımlar)
  {
    id: 'ace_of_pentacles_sa_pos4',
    card: 'Ace of Pentacles',
    position: 4,
    upright:
      'Merkezde somut fırsat ve sağlam temel var. Küçük tutarlı adımlar büyümeyi garantiler.',
    reversed:
      'Merkezde fırsat kaçırma korkusu veya kıtlık zihniyeti olabilir. Değer önerisini sadeleştirin.',
    keywords: ['fırsat', 'temel', 'maddi güven', 'büyüme', 'tohum'],
    context: 'Merkez: temelin tohumu.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_sa_pos4',
    card: 'Two of Pentacles',
    position: 4,
    upright:
      'Merkezde esnek denge ve zaman yönetimi var. Küçük ayarlar büyük verim getirir.',
    reversed:
      'Merkezde dengesizlik ve erteleme döngüsü olabilir. Öncelik matrisi kurun.',
    keywords: ['denge', 'zaman', 'esneklik', 'öncelik', 'akış'],
    context: 'Merkez: ritim ayarı.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_sa_pos4',
    card: 'Three of Pentacles',
    position: 4,
    upright:
      'Merkezde ekip işi ve ustalık paylaşımı var. Rol netliği kaliteyi yükseltir.',
    reversed:
      'Merkezde rol belirsizliği kaliteyi düşürüyor. Kapsamı netleştirin.',
    keywords: ['işbirliği', 'ustalık', 'süreç', 'geri bildirim', 'rol'],
    context: 'Merkez: birlikte inşa.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_sa_pos4',
    card: 'Four of Pentacles',
    position: 4,
    upright:
      'Merkezde güvenlik ve koruma var. Aşırı tutma büyümeyi frenleyebilir.',
    reversed:
      'Merkezde tutma–salıverme sarkacı çalışıyor. Esnek bütçe denge kurar.',
    keywords: ['güvenlik', 'tasarruf', 'kontrol', 'esneklik', 'akış'],
    context: 'Merkez: sahiplenmenin ayarı.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_sa_pos4',
    card: 'Five of Pentacles',
    position: 4,
    upright:
      'Merkezde yoksunluk algısı ve destek ihtiyacı var. Yardım istemek kapı açar.',
    reversed:
      'Merkezde toparlanma potansiyeli artıyor. Küçük kazanımlar görünür kılınmalı.',
    keywords: ['yoksunluk', 'destek', 'toparlanma', 'dayanıklılık', 'ağ'],
    context: 'Merkez: destek eşiği.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_sa_pos4',
    card: 'Six of Pentacles',
    position: 4,
    upright:
      'Merkezde adil paylaşım ve güven var. Şeffaf koşullar ilişkileri güçlendirir.',
    reversed:
      'Merkezde güç dengesizliği ve koşullu alışveriş olabilir. Sınırlar kurun.',
    keywords: ['adalet', 'paylaşım', 'verme-alma', 'güven', 'sınır'],
    context: 'Merkez: adil denge.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_sa_pos4',
    card: 'Seven of Pentacles',
    position: 4,
    upright:
      'Merkezde değerlendirme ve sabır var. Küçük iyileştirmeler çarpan etkisi yaratır.',
    reversed: 'Merkezde batık maliyet tuzağı olabilir. Kriterle pivot edin.',
    keywords: ['değerlendirme', 'sabır', 'verim', 'pivot', 'hasat'],
    context: 'Merkez: hasat öncesi kontrol.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_sa_pos4',
    card: 'Eight of Pentacles',
    position: 4,
    upright:
      'Merkezde zanaat disiplini ve kalite var. Tekrarlı pratik ustalaştırır.',
    reversed:
      'Merkezde özensizlik veya anlam kaybı olabilir. Standardı tazeleyin.',
    keywords: ['ustalık', 'pratik', 'kalite', 'disiplin', 'odak'],
    context: 'Merkez: işçiliğin kalbi.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_sa_pos4',
    card: 'Nine of Pentacles',
    position: 4,
    upright: 'Merkezde bağımsızlık ve öz-değer var. Sınırlar refahı korur.',
    reversed:
      'Merkezde savurganlık veya aşırı bağımlılık olabilir. Disiplin rahatlık getirir.',
    keywords: ['bağımsızlık', 'öz değer', 'konfor', 'sınır', 'disiplin'],
    context: 'Merkez: zarif yeterlilik.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_sa_pos4',
    card: 'Ten of Pentacles',
    position: 4,
    upright:
      'Merkezde uzun vadeli istikrar ve sistem var. Prosedür kalıcılık getirir.',
    reversed:
      'Merkezde miras/varlık sürtüşmesi olabilir. Şeffaf kurallar gerekli.',
    keywords: ['istikrar', 'miras', 'sistem', 'sürdürülebilirlik', 'paylaşım'],
    context: 'Merkez: kalıcı yapı.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_sa_pos4',
    card: 'Page of Pentacles',
    position: 4,
    upright:
      'Merkezde öğrenme hevesi ve somut hedef var. Küçük deneyler yol açar.',
    reversed:
      'Merkezde erteleme ve dağınık odak olabilir. Mini hedefler kurun.',
    keywords: ['öğrenme', 'başlangıç', 'hedef', 'pratik', 'odak'],
    context: 'Merkez: çırak kıvılcımı.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_sa_pos4',
    card: 'Knight of Pentacles',
    position: 4,
    upright:
      'Merkezde rutin ve tutarlı ilerleme var. Yavaş ama emin adım kazandırır.',
    reversed:
      'Merkezde durağanlık veya aşırı muhafazakarlık olabilir. Küçük yenilikler ekleyin.',
    keywords: ['rutin', 'istikrar', 'tutarlılık', 'esneklik', 'ivme'],
    context: 'Merkez: güvenilir hız.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_sa_pos4',
    card: 'Queen of Pentacles',
    position: 4,
    upright:
      'Merkezde şefkatli pratiklik ve kaynak yönetimi var. Öz-bakım bereketi büyütür.',
    reversed:
      'Merkezde aşırı yüklenme ve öz-bakım açığı olabilir. Sınır ve destek şart.',
    keywords: ['bakım', 'pratiklik', 'kaynak', 'öz bakım', 'denge'],
    context: 'Merkez: besleyen düzen.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_sa_pos4',
    card: 'King of Pentacles',
    position: 4,
    upright:
      'Merkezde stratejik sağlamlık ve maddi bilgelik var. Mentorluk ve sistem başarıyı kalıcı kılar.',
    reversed:
      'Merkezde aşırı kontrol veya statü odağı olabilir. Değerlerle hizalanın.',
    keywords: ['sağlamlık', 'liderlik', 'sistem', 'paylaşım', 'vizyon'],
    context: 'Merkez: sağlam kaptan.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 4 anlamını bulma fonksiyonu
export const getPosition4Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return position4Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getSituationAnalysisPosition4Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return getPosition4Meaning(cardName);
};

// Kart adına göre pozisyon 4 anlamını bulma fonksiyonu (ana index için)
export const getSituationAnalysisPosition4MeaningByCardName = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  const meaning = getPosition4Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 4 anlamlarını alma fonksiyonu
export const getAllPosition4Meanings =
  (): SituationAnalysisPositionMeaning[] => {
    return position4Meanings;
  };

// Pozisyon 4 anlamlarını filtreleme fonksiyonu
export const getPosition4MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): SituationAnalysisPositionMeaning[] => {
  return position4Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 4 anlamlarını arama
export const searchPosition4MeaningsByKeyword = (
  keyword: string
): SituationAnalysisPositionMeaning[] => {
  return position4Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position4Meanings,
  getPosition4Meaning,
  getAllPosition4Meanings,
  getPosition4MeaningsByGroup,
  searchPosition4MeaningsByKeyword,
};
