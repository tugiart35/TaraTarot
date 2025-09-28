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
- position2Meanings: gerekli
- getposition2Meaning: gerekli
*/

// import { getRelationshipProblemsMeaningByCardAndPositionMeaning } from './position-meanings-index';
import { RelationshipProblemsPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position2Meanings: RelationshipProblemsPositionMeaning[] = [
  // MAJÖR ARKANA
  // MAJOR ARCANA — Pozisyon 2: Sorun nedir?
  {
    id: 'the_fool_rc_pos2',
    card: 'The Fool',
    position: 2,
    upright:
      'Joker, sorunun özünde yönsüz başlangıçlar ve düşünmeden atılan adımlar olduğunu fısıldar. İlişkide özgürlük arzusu ile güven ihtiyacı çatıştığından, sözler hızlı verilir ama sabitlenmez.\n\nİpucu: Plan eksikliği, yarım kalan konuşmalar ve sürekli yeniye atlama eğilimi. Sorun, ortak rotanın çizilmemesiyle büyür.',
    reversed:
      'Ters Joker, sorunun pervasız kaçışlar, sorumluluktan geri durma ve bağlanma korkusundan beslendiğini söyler. Dürtüsel kararlar sonra pişmanlığa döner.\n\nBelirti: Sürekli erteleme, mazeret üretme ve ilişkiyi tanımlamaktan kaçınma. Sorun, belirsizliğin kronikleşmesiyle derinleşir.',
    keywords: [
      'başlangıç',
      'plansızlık',
      'özgürlük',
      'bağlanma',
      'belirsizlik',
    ],
    context:
      'Kök sorun: Plansız girişimler ve bağlanma kaygısı. Etkilediği alanlar: güven, beklenti yönetimi, ilişki tanımı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_rc_pos2',
    card: 'The Magician',
    position: 2,
    upright:
      'Büyücü, sorunun kalbinde iletişimin şekli ve niyetin ifadesi olduğunu anlatır. Sözcükler güçlü ama bazen yönlendirici ya da eksik olabilir.\n\nİpucu: Söylem–eylem uyumsuzluğu, abartılı vaatler ve pazarlama dili. Sorun, şeffaf niyet eksikliğinde kök salar.',
    reversed:
      'Ters Büyücü, sorunun manipülatif iletişim, maskeleme ve algı yönetiminden beslendiğini söyler. Ne söylendiği kadar nasıl söylendiği de yara açar.\n\nBelirti: Üstü kapalı mesajlar, ikircikli tutum ve güven erozyonu. Sorun, netlik yerine numaraya yaslanınca büyür.',
    keywords: ['iletişim', 'niyet', 'tezahür', 'tutarlılık', 'güven'],
    context:
      'Kök sorun: Şeffaf olmayan ifade ve tutarsız icra. Etkilediği alanlar: güven, sınır, karar alma.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_rc_pos2',
    card: 'The High Priestess',
    position: 2,
    upright:
      'Başrahibe, sorunun görünen değil görünmeyen katmanda yaşandığını söyler. Sırlar, sezgiler ve söylemeyip içte tutulanlar arayı açar.\n\nİpucu: İma dili, yarım bırakılan cümleler ve kapalı ajanda. Sorun, duyguların güvenli ifade kanalını bulamamasıdır.',
    reversed:
      'Ters Başrahibe, bastırılan duygular ve gizlenen gerçeklerin bulandırdığı suda ilerlemeye çalıştığınızı gösterir. Sezgi var, paylaşım yok.\n\nBelirti: Şüphe döngüsü, içe kapanma ve uzaklaşma. Sorun, bilinçaltı korkuların konuşulmadığı yerde köklenir.',
    keywords: ['giz', 'sezgi', 'sır', 'iç dünya', 'mesafe'],
    context:
      'Kök sorun: Saklı gündem ve ifade edilmemiş duygu. Etkilediği alanlar: yakınlık, güven, açıklık.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_rc_pos2',
    card: 'The Empress',
    position: 2,
    upright:
      'İmparatoriçe, bakım, ilgi ve beslenme dengesinde aksaklık olduğunu anlatır. Bir taraf doyurulmadığını, diğeri boğulduğunu hissedebilir.\n\nİpucu: Aşırı korumacılık ya da ihmal algısı. Sorun, ihtiyaçların açık ve zamanında karşılanmamasıyla büyür.',
    reversed:
      'Ters İmparatoriçe, aşırı sahiplenme, duygusal bağımlılık ya da öz bakım ihmalinden beslenen bir çatlak gösterir. Verirken tükenme ve beklenti kırılmaları yaşanır.\n\nBelirti: Kıskançlık gölgeleri, suçluluk ve küsmeler. Sorun, sevginin kontrol aracına dönüştüğü yerde derinleşir.',
    keywords: ['bakım', 'şefkat', 'sahiplenme', 'ihtiyaç', 'kıskançlık'],
    context:
      'Kök sorun: Beslenme–boğulma salınımı. Etkilediği alanlar: duygusal emniyet, öz bakım, karşılıklılık.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_rc_pos2',
    card: 'The Emperor',
    position: 2,
    upright:
      'İmparator, sorunun sınırlar, kurallar ve karar otoritesi etrafında döndüğünü söyler. Yapı gerekli ama katılık gerilim yaratır.\n\nİpucu: Kim karar veriyor, kim dinliyor tartışması. Sorun, gücü paylaşma biçiminde düğümlenir.',
    reversed:
      'Ters İmparator, mikro yönetim, dikte ve kontrol ihtiyacının bağa gölge düşürdüğünü anlatır. Söz hakkı dengesizdir.\n\nBelirti: İnat düğümleri, saygı yaşları ve geri çekilme. Sorun, esneklikten yoksun kurallarda köklenir.',
    keywords: ['sınır', 'otorite', 'yapı', 'kontrol', 'saygı'],
    context:
      'Kök sorun: Güç ve yapı paylaşımı. Etkilediği alanlar: saygı, güven, çatışma çözümü.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_rc_pos2',
    card: 'The Hierophant',
    position: 2,
    upright:
      'Aziz, gelenek, aile normları ve yazılı olmayan kuralların sorun başlığına dönüştüğünü söyler. Standartlar aynı sayfada değildir.\n\nİpucu: Onay alma ihtiyacı, ritüeller ve rol beklentileri. Sorun, esneklik payı bırakmayan kalıplardan doğar.',
    reversed:
      'Ters Aziz, kör gelenekçilik ile kör başkaldırı arasında savrulmayı anlatır. Ne uyum ne özgünlük tam yaşanır.\n\nBelirti: Sözde kurallar, görünmez baskı ve ikiyüzlü standartlar. Sorun, inanç ve rutinlerin konuşulmadan dayatılmasında büyür.',
    keywords: ['gelenek', 'norm', 'onay', 'değer', 'kalıp'],
    context:
      'Kök sorun: Norm ve değer uyumsuzluğu. Etkilediği alanlar: aile ilişkileri, yaşam tarzı kararları.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_rc_pos2',
    card: 'The Lovers',
    position: 2,
    upright:
      'Aşıklar, sorunun özünde değerlerin ve hedeflerin hizalanmaması olduğunu söyler. Seçimler aynı ufka akmıyorsa bağ gerginleşir.\n\nİpucu: Öncelik çatışmaları, yaşam kararı ayrışmaları. Sorun, ortak evet in eksik kalmasıdır.',
    reversed:
      'Ters Aşıklar, kararsızlık, ikilik ve öz değerlerden uzak seçimlerin yarattığı kırılmayı anlatır. Sadakat ve söz temasları yara alır.\n\nBelirti: Git–kal salınımı, pişmanlık ve güven aşınması. Sorun, iç pusulanın susturulmasıyla büyür.',
    keywords: ['değer', 'seçim', 'hizalanma', 'sadakat', 'öncelik'],
    context:
      'Kök sorun: Değer ve rota uyumsuzluğu. Etkilediği alanlar: taahhüt, uzun vade, güven.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_rc_pos2',
    card: 'The Chariot',
    position: 2,
    upright:
      'Savaş Arabası, sorun başlığını hedef, hız ve yöntem farkı olarak gösterir. Zıt yönlere koşan duygular ipi gerer.\n\nİpucu: Hızlı sonuç beklentisi ile temkinli ilerleme çekişmesi. Sorun, ortak ritme kavuşturulamayan ivmedir.',
    reversed:
      'Ters Savaş Arabası, direksiyon kavgası, savrulma ve yön kaybının sorunu derinleştirdiğini söyler. Amaç çok, rota yoktur.\n\nBelirti: Dağınık ajandalar, iptal–erteleme, motivasyon düşüşü. Sorun, odağın çoğalmasında düğümlenir.',
    keywords: ['yön', 'hız', 'kontrol', 'odak', 'disiplin'],
    context:
      'Kök sorun: Ortak yön ve hız eksikliği. Etkilediği alanlar: planlama, motivasyon, görev paylaşımı.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_rc_pos2',
    card: 'Strength',
    position: 2,
    upright:
      'Güç, sorunun duygusal regülasyon ve sabır kasında olduğunu söyler. Kibar cesaret yerine gerilim ve inat sahneye çıkmıştır.\n\nİpucu: Tetiklenmelerin büyütülmesi, gurur savaşı ve nazik sınırların erimesi. Sorun, yumuşak gücün unutulmasıdır.',
    reversed:
      'Ters Güç, özgüven dalgalanması ve kıskançlık gölgelerinin sorunu beslediğini anlatır. Sabırsızlık, hassas alanlara baskı uygular.\n\nBelirti: Küçük meselelerin fırtınaya dönüşmesi, pasif agresif dil. Sorun, şefkatsiz öz savunmada büyür.',
    keywords: ['cesaret', 'sabır', 'şefkat', 'özgüven', 'regülasyon'],
    context:
      'Kök sorun: Duygu yönetimi ve nazik sınır. Etkilediği alanlar: çatışma dili, güven, yakınlık.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_rc_pos2',
    card: 'The Hermit',
    position: 2,
    upright:
      'Ermiş, sorunun yalnızlık ihtiyacı ile birlik ihtiyacı arasında kurulamayan dengeden doğduğunu söyler. İç ses dinlenirken eşlik unutulmuş olabilir.\n\nİpucu: Uzaklaşma, kapanma ve paylaşım eksikliği. Sorun, içe dönüş ile iletişim arasına kurulan duvarda büyür.',
    reversed:
      'Ters Ermiş, sağlıksız izolasyon ve kaçınmanın sorunu kronikleştirdiğini anlatır. İç hesaplaşma var, ortak çözüm yok.\n\nBelirti: Görüşmeyi erteleme, yüz yüze kaçınma ve soğukluk. Sorun, yalnız çözülmeye çalışılan ortak meselede düğümlenir.',
    keywords: ['içe dönüş', 'mesafe', 'yalnızlık', 'paylaşım', 'rehberlik'],
    context:
      'Kök sorun: Alan–yakınlık dengesi. Etkilediği alanlar: iletişim ritmi, destek, empati.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_rc_pos2',
    card: 'The Wheel of Fortune',
    position: 2,
    upright:
      'Kader Çarkı, sorunun döngüler ve zamanlama pencerelerine takıldığını söyler. Aynı tartışmalar farklı günlerde tekrar eder.\n\nİpucu: Şans–zaman okumalarının hatalı yapılması, fırsat kaçırma hissi. Sorun, kalıp tepkilerin kırılmamasıdır.',
    reversed:
      'Ters Kader Çarkı, kadercilik ve tekrarlayan alışkanlıkların ilişkiyi kilitlediğini gösterir. Değişimi bekleyip eylemi ertelemek sorunu uzatır.\n\nBelirti: Öğrenilmemiş dersler, kısır döngü. Sorun, döngüyü fark etmeme hatasında büyür.',
    keywords: ['döngü', 'zamanlama', 'alışkanlık', 'değişim', 'kısır döngü'],
    context:
      'Kök sorun: Tekrarlayan kalıplar. Etkilediği alanlar: karar anları, kriz yönetimi, esneklik.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_rc_pos2',
    card: 'Justice',
    position: 2,
    upright:
      'Adalet, sorunun adil olmayan iş bölümü ve çifte standartta yattığını söyler. Terazinin kefesi eşit hissettirmez.\n\nİpucu: Hesap verilebilirlik talebi, şeffaflık ihtiyacı. Sorun, sorumlulukların net paylaşılmamasıdır.',
    reversed:
      'Ters Adalet, tarafgirlik ve görmezden gelmenin güveni aşındırdığını anlatır. Özür gecikir, telafi gelmez.\n\nBelirti: İçerleme, kırgın birikimi ve defter tutma. Sorun, adalet hissinin zedelenmesinde büyür.',
    keywords: ['adalet', 'denge', 'sorumluluk', 'şeffaflık', 'telafi'],
    context:
      'Kök sorun: Adil paylaşım ve şeffaflık açığı. Etkilediği alanlar: güven, uzlaşı, görev taksimi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_rc_pos2',
    card: 'The Hanged Man',
    position: 2,
    upright:
      'Asılan Adam, sorunun askıda kararlar ve tek taraflı fedakarlık algısında düğümlendiğini söyler. Perspektif değişimi gecikmiştir.\n\nİpucu: Erteleme, bekletme ve gönülsüz özveri. Sorun, anlamlandırılamayan bekleyişte büyür.',
    reversed:
      'Ters Asılan Adam, kurban anlatısı ve pasifliğin kök sorunu beslediğini anlatır. Bırakılması gereken yere tutunulur.\n\nBelirti: Suçlama–susma döngüsü, atalet. Sorun, harekete direnen konfor bölgesinde derinleşir.',
    keywords: [
      'askıda kalma',
      'fedakarlık',
      'perspektif',
      'erteleme',
      'atalet',
    ],
    context:
      'Kök sorun: Karar askısı ve kurbanlaşma. Etkilediği alanlar: ilerleme, umut, denge.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_rc_pos2',
    card: 'Death',
    position: 2,
    upright:
      'Ölüm, sorunun bitmesi gerekenin uzatılmasından ve dönüşüm korkusundan doğduğunu söyler. Eski kabuklar dar gelir.\n\nİpucu: Alışkanlıkları bırakamama, kapanışsız dosyalar. Sorun, yeninin doğumuna alan açılmamasıdır.',
    reversed:
      'Ters Ölüm, değişime direncin krizi kronikleştirdiğini anlatır. Vedalaşmadan devam etmeye çalışmak yorucudur.\n\nBelirti: Hep aynı tartışma, umut erozyonu. Sorun, bitişin kutsanmadığı yerde büyür.',
    keywords: ['bitiş', 'dönüşüm', 'bırakma', 'yeniden doğuş', 'direnç'],
    context:
      'Kök sorun: Kapanış ve dönüşüm eksikliği. Etkilediği alanlar: alışkanlık, beklenti, yenilenme.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_rc_pos2',
    card: 'Temperance',
    position: 2,
    upright:
      'Denge, sorunun aşırılıklar ve uyumsuz karışımda yattığını söyler. Dozlar tutmayınca huzur bozulur.\n\nİpucu: Tempo, tarz ve değer ayarlarının kaçması. Sorun, kalibrasyon eksikliğidir.',
    reversed:
      'Ters Denge, sabırsız ve uçlara savrulan tavrın sorunu büyüttüğünü anlatır. Birlikte ritim tutturulamaz.\n\nBelirti: Ya hep ya hiç döngüsü, hız–yavaşlık çatışması. Sorun, orta yolu bulamamakta köklenir.',
    keywords: ['denge', 'ölçü', 'sentez', 'uyum', 'sabır'],
    context:
      'Kök sorun: Karışım ve tempo kalibrasyonu. Etkilediği alanlar: gündelik ritim, çatışma yönetimi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_rc_pos2',
    card: 'The Devil',
    position: 2,
    upright:
      'Şeytan, sorunun bağımlılık, kıskançlık, takıntı ve toksik anlaşmalardan beslendiğini söyler. Bağ, özgürlüğü kısar.\n\nİpucu: Kontrol oyunları, kıskançlık krizleri ve gizli bağımlılıklar. Sorun, sınır ihlalindedir.',
    reversed:
      'Ters Şeytan, zinciri gevşetme girişimlerinin zorlandığını gösterir. Kısır döngü kırılmak üzere olsa da tetikleyiciler güçlüdür.\n\nBelirti: Bırak–geri dön salınımları, suçluluk. Sorun, gölgeyle yüzleşmemekte düğümlenir.',
    keywords: ['bağımlılık', 'takıntı', 'kıskançlık', 'kontrol', 'toksisite'],
    context:
      'Kök sorun: Toksik bağ ve sınır ihlali. Etkilediği alanlar: güven, özgürlük, öz değer.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_rc_pos2',
    card: 'The Tower',
    position: 2,
    upright:
      'Kule, sorunun çürük temelde yükselen ilişkisel yapıda olduğunu söyler. Ani bir gerçek sarsmış olabilir.\n\nİpucu: Beklenmedik itiraf, şok eden söz veya olay. Sorun, sağlamlaştırılmamış zemindir.',
    reversed:
      'Ters Kule, patlaması gereken gerilimin ertelendiğini anlatır. Küçük sarsıntılar büyük depremi işaret eder.\n\nBelirti: Sürekli çatlak tamiri, yüzeysel çözümler. Sorun, radikal onarımdan kaçışla büyür.',
    keywords: ['kriz', 'yıkım', 'temel', 'gerçek', 'yeniden inşa'],
    context:
      'Kök sorun: Zayıf temel ve ertelenen kriz. Etkilediği alanlar: güven, istikrar, yeniden kurulum.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_rc_pos2',
    card: 'The Star',
    position: 2,
    upright:
      'Yıldız, sorunun umut–gerçeklik dengesinde ve şifa temposunda yattığını söyler. Biri hızlı iyileşme beklerken diğeri zamana ihtiyaç duyar.\n\nİpucu: Kırılma sonrası iyileşme planı eksikliği. Sorun, sabırlı onarım yerine sihirli çözüm arayışıdır.',
    reversed:
      'Ters Yıldız, umutsuzluk söyleminin dokuyu kuruttuğunu anlatır. Gökyüzü kapalı sanılır, oysa şafak gecikmiştir.\n\nBelirti: Pes etme dili, içe kapanma ve motivasyon kaybı. Sorun, umut kasının zayıflamasıdır.',
    keywords: ['umut', 'şifa', 'sadelik', 'sabır', 'yenilenme'],
    context:
      'Kök sorun: Şifa süreci ve umut yönetimi. Etkilediği alanlar: iletişim tonu, beklenti, yakınlık.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_rc_pos2',
    card: 'The Moon',
    position: 2,
    upright:
      'Ay, sorunun belirsizlik, projeksiyon ve korkulardan beslendiğini söyler. Gölge büyüyünce hayal gerçek diye yaşanır.\n\nİpucu: Şüphe, kapalı uçlar ve karanlıkta kalmış detaylar. Sorun, doğrulanmamış varsayımlardır.',
    reversed:
      'Ters Ay, bazı sırların açığa çıkmasıyla sis dağılmaya başlasa da güvensizlik izi kalır. Netlik için zamana ihtiyaç vardır.\n\nBelirti: Çelişkili anlatılar, ikircikli işaretler. Sorun, gerçeklik kontrolünün gecikmesidir.',
    keywords: ['belirsizlik', 'korku', 'projeksiyon', 'yanılsama', 'güven'],
    context:
      'Kök sorun: Varsayım ve belirsizlik. Etkilediği alanlar: gerçeklik testi, açık iletişim.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_rc_pos2',
    card: 'The Sun',
    position: 2,
    upright:
      'Güneş, sorunun görünürlük, ego ve takdir ihtiyacı etrafında oluştuğunu söyler. Parlamak ile paylaşmak karışmıştır.\n\nİpucu: Sergileme, kıyas ve başarı gündemi. Sorun, ortak sevinci eşitleyememektir.',
    reversed:
      'Ters Güneş, yapay neşe ve yüzeysel pozitifliğin gerçek meseleleri örttüğünü anlatır. Eksik detaylar gölgede kalır.\n\nBelirti: İyiymiş gibi yapma, içtenlik açığı. Sorun, otantik sevinç ve gerçeği birlikte taşıyamamaktır.',
    keywords: ['görünürlük', 'ego', 'takdir', 'otantiklik', 'netlik'],
    context:
      'Kök sorun: Takdir ve görünürlük dengesi. Etkilediği alanlar: otantiklik, paylaşım, sevinç ritüeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_rc_pos2',
    card: 'Judgement',
    position: 2,
    upright:
      'Mahkeme, sorunun geçmiş dosyaların kapanmamasında ve çağrıya cevap verememekte yattığını söyler. Eski kararlar bugünü yönetir.\n\nİpucu: Affediş eksikliği, yüzleşme korkusu. Sorun, hakkaniyetli bir yeniden değerlendirmeye duyulan ihtiyaçtır.',
    reversed:
      'Ters Mahkeme, aşırı öz yargı ya da hiç sorumluluk almama uçlarında savrulmayı anlatır. Yeni sayfa gecikir.\n\nBelirti: Tekrarlayan suçlama–savunma konuşmaları. Sorun, geçmişle net hesaplaşmanın olmamasıdır.',
    keywords: ['yüzleşme', 'affediş', 'karar', 'yenilenme', 'hesap'],
    context:
      'Kök sorun: Tamamlanmamış muhasebe. Etkilediği alanlar: kapanış, öz sorumluluk, ilerleme.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_rc_pos2',
    card: 'The World',
    position: 2,
    upright:
      'Dünya, sorunun büyük eşiği aşma ve döngüyü tamamlama cesaretinde olduğunu söyler. Mezuniyet hissi yarım kalmıştır.\n\nİpucu: Taşınma, ortak yaşam, aile planı gibi başlıklarda askı. Sorun, bitirmeden yeniye geçmektir.',
    reversed:
      'Ters Dünya, yarım kalmışlık ve eksik uçların kapanmamasıyla sürüp giden bir gerilim anlatır. Bütünlük parçalıdır.\n\nBelirti: Ertelenen kararlar, tatminsiz tamamlanmalar. Sorun, entegrasyon eksikliğinde köklenir.',
    keywords: ['tamamlama', 'bütünlük', 'eşik', 'entegrasyon', 'uzatma'],
    context:
      'Kök sorun: Döngü kapanışı ve entegrasyon. Etkilediği alanlar: uzun vade, ortak hedef, sistem.',
    group: 'Majör Arkana',
  },

  // CUPS — Kupalar
  {
    id: 'ace_of_cups_rc_pos2',
    card: 'Ace of Cups',
    position: 2,
    upright:
      'Kupa Ası, sorunun duyguların güvenle akmamasında olduğunu söyler. Kalp dolu ama ifade kanalı tıkanmıştır.\n\nİpucu: Duyguları saklama, utangaç paylaşım ve kırılganlıktan kaçınma. Sorun, duygusal açılış kapısının kilididir.',
    reversed:
      'Ters Kupa Ası, bastırılmış kırgınlık ve eski hayal kırıklıklarının yeni şansı gölgelemesini anlatır. İçeride taşan duygu dışarı sızmaz.\n\nBelirti: Donukluk, mesafeli nezaket ve duygusuzlaşma. Sorun, kalbin kendini kapatmasıdır.',
    keywords: ['duygu', 'ifade', 'kırılganlık', 'şifa', 'yakınlık'],
    context:
      'Kök sorun: Duygusal akış tıkanıklığı. Etkilediği alanlar: güvenli ifade, empati, bağ kurma.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_rc_pos2',
    card: 'Two of Cups',
    position: 2,
    upright:
      'İki Kupa, sorunun karşılıklılık ve eşit alışveriş dengesinde olduğunu söyler. Veren–alan salınımı eşit hissettirmez.\n\nİpucu: Jest–emek–zaman payı tartışmaları. Sorun, görünür eşitliğin bozulmasıdır.',
    reversed:
      'Ters İki Kupa, uyumun bozulduğunu ve küçük yanlış anlaşılmaların simge olaylara dönüştüğünü anlatır. Bağda mikro çatlaklar vardır.\n\nBelirti: Küskün jestler, geri çekilme. Sorun, ilişki kontratının güncellenmemesidir.',
    keywords: ['karşılıklılık', 'denge', 'uyum', 'bağ', 'eşitlik'],
    context:
      'Kök sorun: Adil alışveriş. Etkilediği alanlar: jest dili, sözleşilmemiş beklentiler.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_rc_pos2',
    card: 'Three of Cups',
    position: 2,
    upright:
      'Üç Kupa, sorunun sosyal alan, arkadaş çevresi ve paylaşılan ritüellerde yaşandığını söyler. Mahremiyet–kalabalık dengesi kaçmış olabilir.\n\nİpucu: Dışlanma hissi, kıskançlık ve zaman paylaşımı gerilimi. Sorun, sosyal ekosistemin ayarıdır.',
    reversed:
      'Ters Üç Kupa, yüzeysel sosyallik ve dedikodu gölgelerinin bağa zarar verdiğini anlatır. Sahici bağlantı zayıflar.\n\nBelirti: Ortamdan kaçınma, sahte uyum. Sorun, kalabalık içinde yalnızlık hissidir.',
    keywords: ['sosyallik', 'mahremiyet', 'kıskançlık', 'ritüel', 'aidiyet'],
    context:
      'Kök sorun: Sosyal sınır ve ritim. Etkilediği alanlar: zaman planı, üçüncü kişiler, aidiyet.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_rc_pos2',
    card: 'Four of Cups',
    position: 2,
    upright:
      'Dört Kupa, sorunun tatminsizlik ve ilgisizlik algısında olduğunu söyler. Fırsatlar kapıdayken göz ufkun içindedir.\n\nİpucu: Şükran eksikliği, dikkat dağınıklığı. Sorun, iyiyi görmeyen zihin filtresidir.',
    reversed:
      'Ters Dört Kupa, apati perdesinin aralandığını ama yeniye uzanma cesaretinin düşük olduğunu gösterir. Eski hayal kırıklığı yeni teklifi gölgeler.\n\nBelirti: İsteksiz evetler, erteleme. Sorun, duygusal uyuşmada köklenir.',
    keywords: ['tatmin', 'ilgi', 'fırsat', 'şükran', 'odak'],
    context:
      'Kök sorun: Duygusal doygunluk tartışması. Etkilediği alanlar: motivasyon, minnet, yeniye açıklık.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_rc_pos2',
    card: 'Five of Cups',
    position: 2,
    upright:
      'Beş Kupa, sorunun geçmiş kayıplara odaklanmak ve yasın bugünü yönetmesinde olduğunu söyler. Kalan iki kupa görülmez.\n\nİpucu: Keşke dili, pişmanlık ve suçluluk. Sorun, ileri bakışı kuramamaktır.',
    reversed:
      'Ters Beş Kupa, toparlanma niyeti olsa da affediş kapısının tam açılmadığını anlatır. Kalp temkinlidir.\n\nBelirti: Kontrollü yakınlaşma, tetikte sevgi. Sorun, yasla işbirliğinin eksikliğidir.',
    keywords: ['yas', 'kayıp', 'affediş', 'toparlanma', 'umut'],
    context:
      'Kök sorun: Geçmişin gölgesi. Etkilediği alanlar: onarım, affediş, geleceğe odak.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_rc_pos2',
    card: 'Six of Cups',
    position: 2,
    upright:
      'Altı Kupa, sorunun nostaljinin bugünü şekillendirmesinde olduğunu söyler. Eski iyiye öykünmek şimdiyi çarpıtır.\n\nİpucu: Çocukluk örüntüleri, alışkanlık ritüelleri. Sorun, geçmiş konforuna aşırı bağlılıktır.',
    reversed:
      'Ters Altı Kupa, geriye saplanmanın gelişimi tıkadığını anlatır. Bugünün ihtiyaçları ertelenir.\n\nBelirti: Eskiye referanslı kavgalar, şimdiye uzaklık. Sorun, anla bağlantının zayıflığıdır.',
    keywords: ['nostalji', 'geçmiş', 'örüntü', 'konfor', 'şimdi'],
    context:
      'Kök sorun: Geçmişe bağımlı bakış. Etkilediği alanlar: yenilik, esneklik, an farkındalığı.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_rc_pos2',
    card: 'Seven of Cups',
    position: 2,
    upright:
      'Yedi Kupa, sorunun seçenek bolluğu ve hayal–gerçek bulanıklığında olduğunu söyler. Karar gecikince bağ yorulur.\n\nİpucu: İdealleştirme, kaçış ve erteleme. Sorun, net kriterlerin olmayışıdır.',
    reversed:
      'Ters Yedi Kupa, sisin dağılmasına rağmen karara bağlama cesaretinin eksik olduğunu anlatır. Tercih yapmamak da tercihtir.\n\nBelirti: Yarım niyetler, belirsiz sözler. Sorun, taahhüt kıtlığıdır.',
    keywords: ['seçenek', 'hayal', 'gerçek', 'karar', 'kriter'],
    context:
      'Kök sorun: Netleştirilmemiş tercih. Etkilediği alanlar: hedef, sorumluluk, taahhüt.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_rc_pos2',
    card: 'Eight of Cups',
    position: 2,
    upright:
      'Sekiz Kupa, sorunun anlam arayışı ve duygusal tatminsizlikte olduğunu söyler. Kalp, bir şey eksik der.\n\nİpucu: İçsel göç, uzaklaşma ve sessiz kopuşlar. Sorun, değersizleşen ritüellerdir.',
    reversed:
      'Ters Sekiz Kupa, kal–git ikileminin ilişkiyi dalgalandırdığını anlatır. Kapanış ritüeli yapılmamıştır.\n\nBelirti: Geri dönüşler, kararsız adımlar. Sorun, net yön belirleyememektir.',
    keywords: ['anlam', 'tatminsizlik', 'ayrılış', 'ikilem', 'yol'],
    context:
      'Kök sorun: Anlam boşluğu. Etkilediği alanlar: bağlılık, amaç birliği, ritüeller.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_rc_pos2',
    card: 'Nine of Cups',
    position: 2,
    upright:
      'Dokuz Kupa, sorunun kişisel tatmin ile ortak faydayı dengeleyememekte olduğunu söyler. Dilekler çarpışır.\n\nİpucu: Konfor alanı, küçük lüksler ve ben odaklı hedefler. Sorun, birlikte sevinecek hedef yoksunluğudur.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel hazların kalıcı doyumu engellediğini anlatır. İçten tatmin yerine vitrin başarıları toplanır.\n\nBelirti: Hızlı ödüller, geçici mutluluk. Sorun, değerle hizalanmayan arzudur.',
    keywords: ['tatmin', 'haz', 'değer', 'hedef', 'ortak fayda'],
    context:
      'Kök sorun: Tatmin ve değer hizası. Etkilediği alanlar: motivasyon, paylaşım, amaç.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_rc_pos2',
    card: 'Ten of Cups',
    position: 2,
    upright:
      'On Kupa, sorunun ideal aile–ilişki imgesi ile gerçek koşullar arasındaki farkta olduğunu söyler. Masal ile hayat ayrışır.\n\nİpucu: Beklenti yönetimi zayıftır. Sorun, sahici uyumun yerini tabloya bırakmasıdır.',
    reversed:
      'Ters On Kupa, sahte uyum ve gülümseyen fotoğrafın ardındaki kırılmayı anlatır. Konuşulmamış çatlaklar büyür.\n\nBelirti: Suskun sofralar, törensel mutluluk. Sorun, görünür uyumun içi boşalmasıdır.',
    keywords: ['ideal', 'gerçeklik', 'uyum', 'aile', 'beklenti'],
    context:
      'Kök sorun: İdeal–gerçek aralığı. Etkilediği alanlar: ritüel, beklenti, birlikte yaşam.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_rc_pos2',
    card: 'Page of Cups',
    position: 2,
    upright:
      'Kupa Prensi, sorunun duygusal olgunluk farkı ve aşırı hassasiyette olduğunu söyler. İyi niyet yanlış okunur.\n\nİpucu: Alınganlık, kaçış ve fanteziye sığınma. Sorun, duyguyu eyleme bağlayamamaktır.',
    reversed:
      'Ters Kupa Prensi, pasif–agresif tutum ve çocukça geri çekilmelerin bağı zedelediğini anlatır. Gerçek konuşma ertelenir.\n\nBelirti: Küsmeler, mesajla konuşmalar. Sorun, duygusal yetişkinliğin ertelenmesidir.',
    keywords: ['hassasiyet', 'olgunluk', 'kaçış', 'ifade', 'oyunsuluk'],
    context:
      'Kök sorun: Duygusal olgunluk açığı. Etkilediği alanlar: iletişim, sorumluluk, sınır.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_rc_pos2',
    card: 'Knight of Cups',
    position: 2,
    upright:
      'Kupa Şövalyesi, sorunun romantik idealler ile pratik ihtiyaçların çatışmasında olduğunu söyler. Söz büyülü, zemin belirsizdir.\n\nİpucu: Jest çok, plan az. Sorun, tutarlılık ve sürdürülebilirliktir.',
    reversed:
      'Ters Kupa Şövalyesi, söz–eylem uyumsuzluğu ve kolay vazgeçmenin güveni aşındırdığını anlatır. Hayal kırıklığı birikir.\n\nBelirti: Uçup giden vaatler, tutarsız yakınlık. Sorun, idealin gerçeklikten kopmasıdır.',
    keywords: ['romantizm', 'ideal', 'tutarlılık', 'pratik', 'güven'],
    context:
      'Kök sorun: Romantizm–pratik dengelemesi. Etkilediği alanlar: planlılık, güven, süreklilik.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_rc_pos2',
    card: 'Queen of Cups',
    position: 2,
    upright:
      'Kupa Kraliçesi, sorunun empati–sınır dengesinde olduğunu söyler. Aşırı bakım boğabilir, azı ihmal gibi okunur.\n\nİpucu: Duygu taşması, enerjisel yorgunluk. Sorun, şefkatin kendi kendini yakmasıdır.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal manipülasyon ve sınır erimesinin bağa zarar verdiğini anlatır. Kırılganlık koz olur.\n\nBelirti: Suçluluk tetiklemeleri, içe kapanma. Sorun, temiz empati kanalı eksikliğidir.',
    keywords: ['empati', 'sınır', 'bakım', 'manipülasyon', 'öz bakım'],
    context:
      'Kök sorun: Empati–sınır kalibrasyonu. Etkilediği alanlar: duygusal emek, tükenmişlik, rol dağılımı.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_rc_pos2',
    card: 'King of Cups',
    position: 2,
    upright:
      'Kupa Kralı, sorunun duygu yönetimi stil farkında olduğunu söyler. Biri sükunetle tutar, diğeri ifade ister.\n\nİpucu: Duygusuz sanılma, anlaşılmama. Sorun, ifade biçimlerinin çakışmasıdır.',
    reversed:
      'Ters Kupa Kralı, bastırılmış öfke ve pasif–agresif dalgaların güveni aşındırdığını anlatır. Sular yüzeyde duru ama dipte kabarır.\n\nBelirti: İma yüklü sessizlikler, iniş çıkış. Sorun, duyguyu sağlıklı kanalize edememektir.',
    keywords: ['sükunet', 'ifade', 'denge', 'pasif agresif', 'liderlik'],
    context:
      'Kök sorun: Duygu aktarım biçimi. Etkilediği alanlar: anlaşılma, güven, kriz yönetimi.',
    group: 'Kupalar',
  },

  // SWORDS — Kılıçlar
  {
    id: 'ace_of_swords_rc_pos2',
    card: 'Ace of Swords',
    position: 2,
    upright:
      'Kılıç Ası, sorunun netlik ve hakikatin adı konmamasında olduğunu söyler. Keskin bir cümleye ihtiyaç vardır.\n\nİpucu: Muğlak söylemler, farklı okunan gerçekler. Sorun, tanım eksikliğidir.',
    reversed:
      'Ters Kılıç Ası, bilgi kirliliği, çarpıtma ve yarım doğruların sorunu büyüttüğünü anlatır. Keskinlik korkutur diye flu kalınır.\n\nBelirti: Bağlam dışı alıntılar, yanlış atıflar. Sorun, veri hijyeni açığıdır.',
    keywords: ['netlik', 'gerçek', 'mesaj', 'tanım', 'karar'],
    context:
      'Kök sorun: Net olmayan dil ve veri. Etkilediği alanlar: karar, ittifak, güven.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_rc_pos2',
    card: 'Two of Swords',
    position: 2,
    upright:
      'İki Kılıç, sorunun karar felci ve kaçınmada olduğunu söyler. Gözler bağlı, kalp dışarıda bırakılmıştır.\n\nİpucu: Erteleme, tarafsızlık maskesi. Sorun, yüzleşme kaçışıdır.',
    reversed:
      'Ters İki Kılıç, bastırılanın geri dönüş yaptığını ve küçük tetikleyicilerin büyüdüğünü anlatır. Kör nokta sızdırır.\n\nBelirti: Ani patlamalar, savunmacı duvarlar. Sorun, duygu–akıl köprüsünün kopukluğudur.',
    keywords: ['kararsızlık', 'kaçınma', 'ikilem', 'yüzleşme', 'denge'],
    context:
      'Kök sorun: Karar ve yüzleşme eksikliği. Etkilediği alanlar: sınır, netlik, zamanlama.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_rc_pos2',
    card: 'Three of Swords',
    position: 2,
    upright:
      'Üç Kılıç, sorunun kırıcı sözler, ihanet algısı ya da sert gerçeklerle temasta olduğunu söyler. Kalp delik deşik hissedebilir.\n\nİpucu: Kayıtlı incinmeler, kapanmamış yaralar. Sorun, onarım konuşmasının eksikliğidir.',
    reversed:
      'Ters Üç Kılıç, iyileşmenin niyet edildiğini ama duygusal çivilerin sökülmediğini anlatır. Sessizlik ağrıyı uzatır.\n\nBelirti: Sızdıran acı, tetikleyen anılar. Sorun, şefkatli yüzleşme eksikliğidir.',
    keywords: ['kırgınlık', 'ihanet algısı', 'acı', 'onarı', 'ifade'],
    context:
      'Kök sorun: Kırık kalp ve onarım açığı. Etkilediği alanlar: güven, şeffaflık, affediş.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_rc_pos2',
    card: 'Four of Swords',
    position: 2,
    upright:
      'Dört Kılıç, sorunun zihinsel yorgunluk ve dinlenme eksikliğinde olduğunu söyler. Yorgun beyin iyi konuşmaz.\n\nİpucu: Tükenmişlik, boş bakışlar. Sorun, ritim ve mola planıdır.',
    reversed:
      'Ters Dört Kılıç, mola talebinin reddedildiğini ve minik çatışmaların büyüdüğünü anlatır. Beden konuşur, zihin inkâr eder.\n\nBelirti: Hastalanarak ara verme, kopuk cevaplar. Sorun, dinlenme izni eksikliğidir.',
    keywords: ['dinlenme', 'toparlanma', 'sükunet', 'ritim', 'enerji'],
    context:
      'Kök sorun: Enerji yönetimi. Etkilediği alanlar: iletişim kalitesi, sabır, anlayış.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_rc_pos2',
    card: 'Five of Swords',
    position: 2,
    upright:
      'Beş Kılıç, sorunun haklı çıkma hırsı ve ilişki pahasına zafer arzusunda olduğunu söyler. Kazanılır ama kaybedilir.\n\nİpucu: Alay, küçümseme ve iğneleme. Sorun, onur kırıcı dil kalıbıdır.',
    reversed:
      'Ters Beş Kılıç, yüz kurtaran çözüme direnildiğini ve onarımın ertelendiğini anlatır. Gurur, köprüleri yakar.\n\nBelirti: Özürsüz vedalar, soğuk savaş. Sorun, uzlaşı penceresinin kapalı oluşudur.',
    keywords: ['ego', 'zafer', 'maliyet', 'uzlaşı', 'onur'],
    context:
      'Kök sorun: Ego savaşları. Etkilediği alanlar: saygı, güven, müzakere.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_rc_pos2',
    card: 'Six of Swords',
    position: 2,
    upright:
      'Altı Kılıç, sorunun geçiş planı eksikliği ve yöntem tartışmasında olduğunu söyler. Sakin sular için köprü gerekir.\n\nİpucu: Düzensiz taşınma, ara çözümler. Sorun, kademeli planın olmayışıdır.',
    reversed:
      'Ters Altı Kılıç, eski sahile geri dönme eğiliminin çözümü geciktirdiğini anlatır. Alışkanlık mı, ihtiyaç mı.\n\nBelirti: Geri adımlar, yarım bırakılan değişiklik. Sorun, adaptasyon kasının zayıflığıdır.',
    keywords: ['geçiş', 'plan', 'yöntem', 'adaptasyon', 'sakinlik'],
    context:
      'Kök sorun: Geçiş ve yöntem yönetimi. Etkilediği alanlar: proje, yaşam düzeni, taşınma.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_rc_pos2',
    card: 'Seven of Swords',
    position: 2,
    upright:
      'Yedi Kılıç, sorunun şeffaflık eksikliği ve stratejik saklamada olduğunu söyler. Gerçek açıklanmaz, güven aşınır.\n\nİpucu: Eksik anlatı, saklı mesaj. Sorun, etik çizginin bulanıklığıdır.',
    reversed:
      'Ters Yedi Kılıç, itirafa yaklaşan bir enerjiyi ama utanç bariyerlerini anlatır. Doğruluk gelmekte zorlanır.\n\nBelirti: Parça parça gerçek, kaçamak cevap. Sorun, dürüstlüğe güven kaybıdır.',
    keywords: ['şeffaflık', 'dürüstlük', 'strateji', 'güven', 'saklama'],
    context:
      'Kök sorun: Saklı ajanda. Etkilediği alanlar: güven, iletişim, etik sınır.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_rc_pos2',
    card: 'Eight of Swords',
    position: 2,
    upright:
      'Sekiz Kılıç, sorunun öz kısıtlayıcı inançlar ve korku hikayelerinde olduğunu söyler. Kapı açıkken kapalı sanılır.\n\nİpucu: Kendini sabote etmek, felç hali. Sorun, kanıtsız kehanetlerdir.',
    reversed:
      'Ters Sekiz Kılıç, çözülmeye başlayan düğümler ve halen süren şüphe arasında gidip gelmeyi anlatır. Özgürleşme parçalıdır.\n\nBelirti: Bir ileri bir geri, yardım istemekten çekinme. Sorun, yardım çağrısını geciktirmektir.',
    keywords: ['öz kısıt', 'korku', 'inanç', 'özgürleşme', 'yardım'],
    context:
      'Kök sorun: Zihinsel prangalar. Etkilediği alanlar: hareket alanı, iletişim cesareti.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_rc_pos2',
    card: 'Nine of Swords',
    position: 2,
    upright:
      'Dokuz Kılıç, sorunun kaygı ve felaket senaryolarının ilişkide yankılanmasında olduğunu söyler. Uykusuz geceler gündüzü bozar.\n\nİpucu: Aşırı düşünme, abartılı tahmin. Sorun, gerçeklik testinin yapılmamasıdır.',
    reversed:
      'Ters Dokuz Kılıç, kabusun yerini yavaş gerçekliğe bıraktığını ama kaygı artığının sürdüğünü anlatır. Regülasyon eksiktir.\n\nBelirti: Sabah yorgunluğu, kaçınan diyalog. Sorun, kaygı hijyeni açığıdır.',
    keywords: ['kaygı', 'kuruntu', 'gerçeklik', 'uyku', 'regülasyon'],
    context:
      'Kök sorun: Kaygı dili. Etkilediği alanlar: iletişim tonu, karar kalitesi.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_rc_pos2',
    card: 'Ten of Swords',
    position: 2,
    upright:
      'On Kılıç, sorunun acı bir kapanış ya da bıçağın kemiğe dayandığı anda olduğunu söyler. Eski yöntem öldü.\n\nİpucu: Tükenmiş tartışma, umutsuzluk. Sorun, vedayı kabul etmeyi reddetmektir.',
    reversed:
      'Ters On Kılıç, toparlanma niyetiyle birlikte geçmişin hayaletlerinin ara ara döndüğünü anlatır. Kapanış ritüeli eksiktir.\n\nBelirti: Son kez konuşmalar, yarım vedalar. Sorun, yeniyi çerçeveleyememektir.',
    keywords: ['bitiş', 'kapanış', 'yeniden doğuş', 'tükenmişlik', 'kabul'],
    context:
      'Kök sorun: Eski döngünün sonu. Etkilediği alanlar: yeniden kurulum, sınır, karar.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_rc_pos2',
    card: 'Page of Swords',
    position: 2,
    upright:
      'Kılıç Prensi, sorunun sorgu tonu ve kanıtsız varsayımda olduğunu söyler. Merak faydalı, kuşku dili yaralayıcıdır.\n\nİpucu: Mesaj tarama, ekran dörtgenleri. Sorun, güven yerine dedektifliktir.',
    reversed:
      'Ters Kılıç Prensi, dedikodu ve acele yargının sorunu büyüttüğünü anlatır. Bilgi teyitsizdir.\n\nBelirti: Ekran görüntüsü savaşları, savunmacı cevaplar. Sorun, doğrulama eksikliğidir.',
    keywords: ['sorgu', 'kuşku', 'doğrulama', 'iletişim', 'öğrenme'],
    context:
      'Kök sorun: Kanıt ve dil etiketi. Etkilediği alanlar: saygı, veri, iletişim güveni.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_rc_pos2',
    card: 'Knight of Swords',
    position: 2,
    upright:
      'Kılıç Şövalyesi, sorunun hızlı, sert ve köşeye sıkıştıran iletişimde olduğunu söyler. Hız hakikati çarpar.\n\nİpucu: Ültimatomlar, sözle yaralama. Sorun, nefes almadan konuşmaktır.',
    reversed:
      'Ters Kılıç Şövalyesi, acele saldırıların geri tepmesini ve iletişim kanallarını yakmasını anlatır. Savunma duvarı yükselir.\n\nBelirti: Kapatılan telefonlar, tek cümlelik mesajlar. Sorun, ritimsiz konuşmadır.',
    keywords: ['hız', 'sertlik', 'iletişim', 'saldırı', 'geri tepme'],
    context:
      'Kök sorun: İletişim temposu ve tonu. Etkilediği alanlar: güven, sorun çözümü.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_rc_pos2',
    card: 'Queen of Swords',
    position: 2,
    upright:
      'Kılıç Kraliçesi, sorunun nesnellik ile şefkat arasındaki köprüde olduğunu söyler. Fazla eleştiri soğukluk yaratır.\n\nİpucu: Keskin analiz, kırıcı netlik. Sorun, kalbin dışarıda bırakılmasıdır.',
    reversed:
      'Ters Kılıç Kraliçesi, alay, iğne ve sarkazmın bağı incittiğini anlatır. Akıl iyi, üslup ağırdır.\n\nBelirti: Surat asma, savunma. Sorun, net ama nazik olmamaktır.',
    keywords: ['nesnellik', 'eleştiri', 'şefkat', 'sınır', 'üslup'],
    context:
      'Kök sorun: Netlik–şefkat dengesi. Etkilediği alanlar: iletişim kalitesi, yakınlık.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_rc_pos2',
    card: 'King of Swords',
    position: 2,
    upright:
      'Kılıç Kralı, sorunun ilke ve kural vurgusunun esnekliği kısıtlamasında olduğunu söyler. Hukuk var, merhamet azdır.\n\nİpucu: Kural kitapçığı, siyah–beyaz bakış. Sorun, gri alanlara yer bırakmamaktır.',
    reversed:
      'Ters Kılıç Kralı, dogmatik ve güç diliyle konuşmanın ilişkiyi tıkadığını anlatır. Strateji var, empati yoktur.\n\nBelirti: Kesin yargılar, soğuk hüküm. Sorun, kalpten kopuk akıldır.',
    keywords: ['ilke', 'kural', 'strateji', 'empati', 'otorite'],
    context:
      'Kök sorun: Kural–empati dengesi. Etkilediği alanlar: karar, uzlaşı, güven.',
    group: 'Kılıçlar',
  },

  // WANDS — Asalar
  {
    id: 'ace_of_wands_rc_pos2',
    card: 'Ace of Wands',
    position: 2,
    upright:
      'Değnek Ası, sorunun heves–hazırlık dengesinde olduğunu söyler. Kıvılcım var ama düzen yoktur.\n\nİpucu: Başla–bırak döngüsü, acele başlangıç. Sorun, sürdürülebilir plana bağlanamamaktır.',
    reversed:
      'Ters Değnek Ası, tıkanan motivasyon ve ertelemelerin sorunu büyüttüğünü anlatır. Korku, heyecanı bastırır.\n\nBelirti: Yarım projeler, sönen alev. Sorun, ilk adımı ritme çevirememektir.',
    keywords: ['kıvılcım', 'motivasyon', 'başlangıç', 'süreklilik', 'ritim'],
    context:
      'Kök sorun: İlhamı yapıya bağlayamama. Etkilediği alanlar: tempo, plan, taahhüt.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_rc_pos2',
    card: 'Two of Wands',
    position: 2,
    upright:
      'İki Değnek, sorunun vizyon–risk iştahı farkında olduğunu söyler. Biri ufka bakar, diğeri güvenli kıyıyı ister.\n\nİpucu: Uzun vade konuşulmazsa kısa vade sürtünür. Sorun, ufuk haritasının yokluğudur.',
    reversed:
      'Ters İki Değnek, kalma–çıkma ikileminin eylemi felç ettiğini anlatır. Cesaret prangalıdır.\n\nBelirti: Sonsuz plan, sıfır adım. Sorun, pilot denemenin yapılmamasıdır.',
    keywords: ['vizyon', 'plan', 'risk', 'ufuk', 'karar'],
    context:
      'Kök sorun: Vizyon ve risk kalibrasyonu. Etkilediği alanlar: genişleme, taşınma, proje.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_rc_pos2',
    card: 'Three of Wands',
    position: 2,
    upright:
      'Üç Değnek, sorunun zamanlama, beklenti ve koordinasyonda olduğunu söyler. Yola çıkıldı, liman belirsizdir.\n\nİpucu: Beklenen sonuç ufukta, süreçte uyum eksik. Sorun, rol–zaman uyumudur.',
    reversed:
      'Ters Üç Değnek, gecikmelerin suçlama döngüsüne dönüştüğünü anlatır. Ufka küskün bakışlar artar.\n\nBelirti: Erteleme, yanlış senkron. Sorun, planı dinamik güncellememektir.',
    keywords: ['zamanlama', 'beklenti', 'genişleme', 'koordinasyon', 'ufuk'],
    context:
      'Kök sorun: Zaman–rol hizası. Etkilediği alanlar: proje akışı, teslim, sabır.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_rc_pos2',
    card: 'Four of Wands',
    position: 2,
    upright:
      'Dört Değnek, sorunun eşik ve kutlama adımlarında olduğunu söyler. Temel sağlamlığı tartışmalıdır.\n\nİpucu: Nikah, taşınma, tanışma ritüelleri. Sorun, eşiklerin zamansızlığıdır.',
    reversed:
      'Ters Dört Değnek, eşiği tamamlamadan kutlamanın hayal kırıklığı yarattığını anlatır. Önce temel, sonra tören.\n\nBelirti: Eksik tamamlama, törensel gerginlik. Sorun, sıralama hatasıdır.',
    keywords: ['eşik', 'kutlama', 'temel', 'aidiyet', 'ev'],
    context:
      'Kök sorun: Eşik yönetimi. Etkilediği alanlar: birlikte yaşam, aile entegrasyonu.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_rc_pos2',
    card: 'Five of Wands',
    position: 2,
    upright:
      'Beş Değnek, sorunun kuralsız tartışma ve güç denemelerinde olduğunu söyler. Prova savaşına dönüşür.\n\nİpucu: Yarış, kıyas ve bölük pörçük kavgalar. Sorun, oyun kurallarının olmamasıdır.',
    reversed:
      'Ters Beş Değnek, çatışmayı yapıcı arenaya taşıyamamanın verimsizlik doğurduğunu anlatır. Enerji boşa dağılır.\n\nBelirti: Gündem kaybı, gürültü. Sorun, fasilitasyon eksikliğidir.',
    keywords: ['çatışma', 'rekabet', 'kural', 'fasilitasyon', 'verim'],
    context:
      'Kök sorun: Yapısız mücadele. Etkilediği alanlar: toplantı, karar, işbirliği.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_rc_pos2',
    card: 'Six of Wands',
    position: 2,
    upright:
      'Altı Değnek, sorunun takdir ve görünürlük dengesinde olduğunu söyler. Kim alkışlanıyor, kim gölgede kalıyor.\n\nİpucu: Başarı anlatısı eşit paylaşılmaz. Sorun, hikayeyi birlikte yazamamaktır.',
    reversed:
      'Ters Altı Değnek, görünmeyen emeklerin kırgınlık yarattığını anlatır. Zafer tek kişiye ait gibi yaşanır.\n\nBelirti: İçerleme, motivasyon düşüşü. Sorun, takdir sisteminin yoksunluğudur.',
    keywords: ['takdir', 'görünürlük', 'zafer', 'algı', 'motivasyon'],
    context:
      'Kök sorun: Takdir ekonomisi. Etkilediği alanlar: motivasyon, adalet, ekip uyumu.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_rc_pos2',
    card: 'Seven of Wands',
    position: 2,
    upright:
      'Yedi Değnek, sorunun sürekli savunma pozisyonunda durmak olduğunu söyler. Diyalog yerine mevzi tutulur.\n\nİpucu: Gerekçelendirme yorgunluğu. Sorun, güvenli alanın daralıp şeffaflığın düşmesidir.',
    reversed:
      'Ters Yedi Değnek, aşırı savunuculuk ve yalnız savaşmanın yıprattığını anlatır. Yardım talep edilmez.\n\nBelirti: Yalnız kale, sert ton. Sorun, destek sistemini kurmamaktır.',
    keywords: ['savunma', 'sınır', 'direnç', 'destek', 'yük'],
    context:
      'Kök sorun: Savunma refleksi. Etkilediği alanlar: işbirliği, empati, yorgunluk.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_rc_pos2',
    card: 'Eight of Wands',
    position: 2,
    upright:
      'Sekiz Değnek, sorunun iletişim hızı ve kanal kalabalığında olduğunu söyler. Mesajlar uçuşur, anlam düşer.\n\nİpucu: Çok kanal, az netlik. Sorun, sıraya koyamama ve senkron eksikliğidir.',
    reversed:
      'Ters Sekiz Değnek, gecikmeler ve karmaşanın yanlış anlamayı büyüttüğünü anlatır. Hız ya çok ya hiçtir.\n\nBelirti: Bekleyen konuşmalar, çakışan mesajlar. Sorun, akış tasarımı eksikliğidir.',
    keywords: ['hız', 'iletişim', 'senkron', 'sıra', 'akış'],
    context:
      'Kök sorun: İletişim akışı. Etkilediği alanlar: sıraya koyma, beklenti yönetimi.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_rc_pos2',
    card: 'Nine of Wands',
    position: 2,
    upright:
      'Dokuz Değnek, sorunun yorgunluk ve tetikte olma halinde olduğunu söyler. Küçük kıvılcım yangına döner.\n\nİpucu: Fazla nöbet, az dinlenme. Sorun, dayanıklılığı yanlış yerden zorlamaktır.',
    reversed:
      'Ters Dokuz Değnek, geçmiş yaraların şimdiye taşınmasını ve savunma duvarlarının yükselmesini anlatır. Tolerans düşer.\n\nBelirti: Hızlı patlama, kapı çarpma. Sorun, iyileşmemiş izlerle anlaşmaya çalışmaktır.',
    keywords: ['dayanıklılık', 'yorgunluk', 'tetikte olma', 'mola', 'koruma'],
    context:
      'Kök sorun: Enerji ve tolerans eşiği. Etkilediği alanlar: çatışma eşiği, mola kültürü.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_rc_pos2',
    card: 'Ten of Wands',
    position: 2,
    upright:
      'On Değnek, sorunun yük ve sorumluluk dengesizliğinde olduğunu söyler. Bir omuz çöker.\n\nİpucu: Delege eksikliği, her şeyi üstlenme. Sorun, hayır diyememektir.',
    reversed:
      'Ters On Değnek, biriken yükün motivasyonu kırdığını ve bırakılması gerekenlerin taşındığını anlatır. Dağınıklık artar.\n\nBelirti: Ertelemeler, şikayet–devam döngüsü. Sorun, öncelik temizliğini yapmamaktır.',
    keywords: ['yük', 'delege', 'öncelik', 'sorumluluk', 'sadelik'],
    context:
      'Kök sorun: Yük yönetimi. Etkilediği alanlar: iş–yaşam dengesi, ilişkisel emek.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_rc_pos2',
    card: 'Page of Wands',
    position: 2,
    upright:
      'Değnek Prensi, sorunun hevesi odakla bağlayamamakta olduğunu söyler. Keşif iyi, yönsüzlük yorar.\n\nİpucu: Yeniye atlama, çabuk sıkılma. Sorun, deney–öğren çerçevesinin olmamasıdır.',
    reversed:
      'Ters Değnek Prensi, yarıda bırakma ve dikkat dağınıklığının güveni aşındırdığını anlatır. Başlar, bitmez.\n\nBelirti: Kısa projeler mezarlığı. Sorun, bitiricilik kasının zayıflığıdır.',
    keywords: ['keşif', 'heves', 'odak', 'bitiricilik', 'pilot'],
    context:
      'Kök sorun: Heves–odak dengesi. Etkilediği alanlar: alışkanlık, proje, motivasyon.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_rc_pos2',
    card: 'Knight of Wands',
    position: 2,
    upright:
      'Değnek Şövalyesi, sorunun hız ve atılganlıkta fren eksikliğinde olduğunu söyler. Ateş güzel, ocak gerekli.\n\nİpucu: Ani kararlar, yüksek risk. Sorun, hızın akılla hizalanmamasıdır.',
    reversed:
      'Ters Değnek Şövalyesi, savruk enerji ve yarıda bırakmanın yarattığı güvensizliği anlatır. Alev çabuk söner.\n\nBelirti: Başlayıp kaçmak, tutarsız ivme. Sorun, taahhüt mimarisidir.',
    keywords: ['hız', 'atılganlık', 'risk', 'taahhüt', 'ivme'],
    context:
      'Kök sorun: Hız–taahhüt kalibrasyonu. Etkilediği alanlar: karar, güven, sürdürme.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_rc_pos2',
    card: 'Queen of Wands',
    position: 2,
    upright:
      'Değnek Kraliçesi, sorunun görünürlük ve karizma ihtiyacının kıskançlık gölgeleriyle çarpışmasında olduğunu söyler. Işık büyür, gölge de.\n\nİpucu: Kıyas, vitrin baskısı. Sorun, değer ve öz güven hizasının bozulmasıdır.',
    reversed:
      'Ters Değnek Kraliçesi, içten içe güvensizlik ve onay arayışının ilişkiyi yorduğunu anlatır. Dış onay bağımlılık olur.\n\nBelirti: Kırılgan ego, sessiz sitem. Sorun, öz değer boşluğudur.',
    keywords: ['görünürlük', 'karizma', 'kıyas', 'özgüven', 'onay'],
    context:
      'Kök sorun: Öz değer ve görünürlük dengesi. Etkilediği alanlar: kıskançlık, paylaşım, destek.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_rc_pos2',
    card: 'King of Wands',
    position: 2,
    upright:
      'Değnek Kralı, sorunun vizyoner liderlik ile ortak karar kültürü arasında olduğunu söyler. Söz büyük, katılım küçük kalır.\n\nİpucu: Tek merkezli vizyon. Sorun, yetki paylaşımının sınırlılığıdır.',
    reversed:
      'Ters Değnek Kralı, otoriter ton ve ego çatışmalarının işbirliğini bozduğunu anlatır. Ateş yakar.\n\nBelirti: Dikleşen söylem, kopuk ekip. Sorun, güç paylaşımı korkusudur.',
    keywords: ['vizyon', 'liderlik', 'yetki', 'ego', 'katılım'],
    context:
      'Kök sorun: Vizyon–katılım dengesi. Etkilediği alanlar: ortak hedef, güven, motivasyon.',
    group: 'Asalar',
  },

  // PENTACLES — Tılsımlar
  {
    id: 'ace_of_pentacles_rc_pos2',
    card: 'Ace of Pentacles',
    position: 2,
    upright:
      'Tılsım Ası, sorunun maddi güvence ve fırsat pencerelerinde olduğunu söyler. Somutluk istenir.\n\nİpucu: Bütçe, iş, gelecek kaygısı. Sorun, fırsatı plana çevirememe ya da kıtlık zihniyetidir.',
    reversed:
      'Ters Tılsım Ası, fırsat kaçırma korkusu ve güvensizlik döngüsünün kararı felç ettiğini anlatır. Küçük adım atılmaz.\n\nBelirti: Başlamadan vazgeçme, erteleme. Sorun, somut tohum ekememektir.',
    keywords: ['fırsat', 'temel', 'bütçe', 'güven', 'somut adım'],
    context:
      'Kök sorun: Somut güvence ve başlangıç. Etkilediği alanlar: para, iş, gelecek planı.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_rc_pos2',
    card: 'Two of Pentacles',
    position: 2,
    upright:
      'İki Tılsım, sorunun zaman–enerji–para dengelemesinde olduğunu söyler. Jonglör yorulmuştur.\n\nİpucu: Öncelik karmaşası, program çakışması. Sorun, denge mekanizması eksikliğidir.',
    reversed:
      'Ters İki Tılsım, erteleme ve dağınıklığın bedelini ilişkiye yazdığını anlatır. Top çabuk düşer.\n\nBelirti: Son dakika krizleri, unutulan sözler. Sorun, plan disiplini açığıdır.',
    keywords: ['denge', 'öncelik', 'zaman', 'esneklik', 'program'],
    context:
      'Kök sorun: Ritim ve kapasite yönetimi. Etkilediği alanlar: söz, buluşma, iş–yaşam dengesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_rc_pos2',
    card: 'Three of Pentacles',
    position: 2,
    upright:
      'Üç Tılsım, sorunun işbirliği, rol netliği ve kalite standardında olduğunu söyler. Ustalık konuşulmalıdır.\n\nİpucu: Kimin neyi yaptığı belirsiz. Sorun, rol–beklenti sözleşmesidir.',
    reversed:
      'Ters Üç Tılsım, görünmeyen emek ve takdir açığının motivasyonu kırdığını anlatır. Koordinasyon düşüktür.\n\nBelirti: Çifte iş, tekrarlar. Sorun, süreç tasarımının eksikliğidir.',
    keywords: ['işbirliği', 'rol', 'kalite', 'takdir', 'koordinasyon'],
    context:
      'Kök sorun: İş birliği mimarisi. Etkilediği alanlar: süreç, standart, görünür emek.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_rc_pos2',
    card: 'Four of Pentacles',
    position: 2,
    upright:
      'Dört Tılsım, sorunun kontrol ve güvenlik ihtiyacının paylaşıma set çekmesinde olduğunu söyler. Avuç sıkıdır.\n\nİpucu: Bütçe kısıtı, duygusal kısıt. Sorun, esnek paylaşım eksikliğidir.',
    reversed:
      'Ters Dört Tılsım, aşırı tutma ya da savurganlık uçlarının gerginlik yarattığını anlatır. Dengesi kaçmış kontrol vardır.\n\nBelirti: Hesap sorma, gizli harcama. Sorun, güvenli paylaşım çerçevesidir.',
    keywords: ['kontrol', 'güvenlik', 'paylaşım', 'tutma', 'savurganlık'],
    context:
      'Kök sorun: Kontrol–paylaşım dengesi. Etkilediği alanlar: finans, duygusal kaynak, alan.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_rc_pos2',
    card: 'Five of Pentacles',
    position: 2,
    upright:
      'Beş Tılsım, sorunun maddi–manevi dışlanmışlık ve kıtlık hissinde olduğunu söyler. Kapı var, anahtar yok sanılır.\n\nİpucu: Yardım istememe, utanç. Sorun, destek ağını kullanamamaktır.',
    reversed:
      'Ters Beş Tılsım, toparlanma işaretleri olsa da yalnız başa çıkma inadının sürdüğünü anlatır. Dayanışma çağrısı eksiktir.\n\nBelirti: Sessiz sıkışma, içine kapanma. Sorun, birlikte çözüm cesaretidir.',
    keywords: ['kıtlık', 'dışlanmışlık', 'yardım', 'dayanışma', 'moral'],
    context:
      'Kök sorun: Destek erişimi. Etkilediği alanlar: finansal stres, duygusal destek.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_rc_pos2',
    card: 'Six of Pentacles',
    position: 2,
    upright:
      'Altı Tılsım, sorunun adil paylaşım ve güç dengesi başlığında olduğunu söyler. Veren–alan rolleri tartışmalıdır.\n\nİpucu: Koşullu destek, minnet beklentisi. Sorun, eşitlik zeminidir.',
    reversed:
      'Ters Altı Tılsım, iyilik karşılığı vade ve borçluluk hissinin bağa gölge düşürdüğünü anlatır. Denge şaşar.\n\nBelirti: Skor tutma, karşılık bekleme. Sorun, şeffaf anlaşma eksikliğidir.',
    keywords: ['adalet', 'paylaşım', 'güç', 'koşul', 'eşitlik'],
    context:
      'Kök sorun: Adil değiş tokuş. Etkilediği alanlar: destek, sınır, güven.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_rc_pos2',
    card: 'Seven of Pentacles',
    position: 2,
    upright:
      'Yedi Tılsım, sorunun sabır ve verim beklentisinde olduğunu söyler. Ürün geç kalmış sanılır.\n\nİpucu: Hasada erken gitmek. Sorun, göstergeleri okumamaktır.',
    reversed:
      'Ters Yedi Tılsım, batık maliyet inadı ve sabırsızlığın yanlış kararlara ittiğini anlatır. Yanlış toprağa su verilir.\n\nBelirti: Erken vazgeçme ya da gereksiz ısrar. Sorun, ölçme–öğrenme döngüsü eksikliğidir.',
    keywords: ['sabır', 'verim', 'hasat', 'ölçüm', 'pivot'],
    context:
      'Kök sorun: Değerlendirme ve kalibrasyon. Etkilediği alanlar: hedef, kaynak, zaman.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_rc_pos2',
    card: 'Eight of Pentacles',
    position: 2,
    upright:
      'Sekiz Tılsım, sorunun işçilik standardı ve odakta olduğunu söyler. Zanaat özeni dalgalanır.\n\nİpucu: Otomatiğe bağlama ya da aşırı titizlik. Sorun, bilinçli pratik eksikliğidir.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik ve çabuk sonuç arzusunun kaliteyi düşürdüğünü anlatır. Emek görünmezleşir.\n\nBelirti: Hatalar, tekrar iş. Sorun, öğrenme disiplinidir.',
    keywords: ['ustalık', 'pratik', 'odak', 'kalite', 'özen'],
    context:
      'Kök sorun: Zanaat ve odak. Etkilediği alanlar: görev kalitesi, gurur, gelişim.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_rc_pos2',
    card: 'Nine of Pentacles',
    position: 2,
    upright:
      'Dokuz Tılsım, sorunun bağımsızlık arzusu ile ortak yaşam beklentisi arasında olduğunu söyler. Zarif yalnızlık mı, birlikte konfor mu.\n\nİpucu: Kendi alanı kutsama. Sorun, sınır–birlik ritmidir.',
    reversed:
      'Ters Dokuz Tılsım, israf–aşırı tutumluluk uçlarının gerilim yarattığını anlatır. Konfor suçlulukla gölgelenir.\n\nBelirti: Para–prestij tartışmaları. Sorun, değer–harcama hizasıdır.',
    keywords: ['bağımsızlık', 'konfor', 'sınır', 'harcama', 'tasarruf'],
    context:
      'Kök sorun: Bağımsızlık ve ortak konfor. Etkilediği alanlar: alan, bütçe, stil.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_rc_pos2',
    card: 'Ten of Pentacles',
    position: 2,
    upright:
      'On Tılsım, sorunun aile yapısı, miras ve uzun vade güvence başlıklarında olduğunu söyler. Nesiller arası beklentiler çarpışır.\n\nİpucu: Aile onayı, mülk, düzen. Sorun, sistem ve rol paylaşımıdır.',
    reversed:
      'Ters On Tılsım, aile içi güç çekişmeleri ve ekonomik gerilimlerin ilişkiye yansıdığını anlatır. Ev huzuru zorlanır.\n\nBelirti: Taraf tutma, ev içi ittifaklar. Sorun, kurumsal aile kurallarının gölgesidir.',
    keywords: ['aile', 'miras', 'sistem', 'güvence', 'rol'],
    context:
      'Kök sorun: Aile–sistem etkisi. Etkilediği alanlar: uzun vade, mülkiyet, sınır.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_rc_pos2',
    card: 'Page of Pentacles',
    position: 2,
    upright:
      'Tılsım Prensi, sorunun öğrenme–sertifika–kariyer yatırımı ile kısa vadeli konfor arasında olduğunu söyler. Somut hedef ister.\n\nİpucu: Dağınık odak, erteleme. Sorun, küçük adımı yazmamaktır.',
    reversed:
      'Ters Tılsım Prensi, fırsatların tembellik ya da dikkat dağınıklığıyla kaçırıldığını anlatır. Tozu alınmayan niyetler raftadır.\n\nBelirti: Başlayamama, oyalanma. Sorun, disiplinli çıraklık eksikliğidir.',
    keywords: ['öğrenme', 'hedef', 'disiplin', 'başlangıç', 'somutluk'],
    context:
      'Kök sorun: Öğrenme ve somut adım. Etkilediği alanlar: beceri, kariyer, düzen.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_rc_pos2',
    card: 'Knight of Pentacles',
    position: 2,
    upright:
      'Tılsım Şövalyesi, sorunun yavaş ama emin ritmi kabul edememekte olduğunu söyler. Hız baskısı artar.\n\nİpucu: Sabır çatışması, rutin yorgunluğu. Sorun, istikrarın değersizleşmesidir.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık ve esneklik eksikliğinin motivasyonu kırdığını anlatır. Aynı kalıp bıktırır.\n\nBelirti: Sıkılma, itiş gücü düşüşü. Sorun, çevik iyileştirmeyi reddetmektir.',
    keywords: ['rutin', 'istikrar', 'çeviklik', 'sabır', 'ilerleme'],
    context:
      'Kök sorun: Tempo–istikrar dengesi. Etkilediği alanlar: alışkanlık, görev akışı.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_rc_pos2',
    card: 'Queen of Pentacles',
    position: 2,
    upright:
      'Tılsım Kraliçesi, sorunun bakım–pratik ihtiyaç yönetiminde olduğunu söyler. Ev, bütçe, sağlık konuşulmalıdır.\n\nİpucu: Aşırı yüklenme, görünmez emek. Sorun, paylaşılmayan bakım işidir.',
    reversed:
      'Ters Tılsım Kraliçesi, kendini ihmal ve tükenmişliğin bağa gölge düşürdüğünü anlatır. Şefkat önce kendine gerek.\n\nBelirti: Yorgun şefkat, sitem. Sorun, destek isteme kasıdır.',
    keywords: ['bakım', 'pratiklik', 'öz bakım', 'destek', 'kaynak'],
    context:
      'Kök sorun: Kaynak ve bakım yönetimi. Etkilediği alanlar: ev, bütçe, sağlık ritmi.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_rc_pos2',
    card: 'King of Pentacles',
    position: 2,
    upright:
      'Tılsım Kralı, sorunun maddi güvence ve statü odaklı yaklaşımın esnekliği kısıtlamasında olduğunu söyler. Güvenlik, sıcaklığı gölgeler.\n\nİpucu: Kontrol, mülkiyet, itibar. Sorun, güçle sevgi dengesidir.',
    reversed:
      'Ters Tılsım Kralı, mikro yönetim ve kaybetme korkusunun ilişkiyi sertleştirdiğini anlatır. Paylaşım zorlaşır.\n\nBelirti: Kural çok, alan dar. Sorun, yetki ve güven paylaşımıdır.',
    keywords: ['güvence', 'statü', 'kontrol', 'paylaşım', 'esneklik'],
    context:
      'Kök sorun: Güvence–esneklik dengesi. Etkilediği alanlar: finans, otorite, şefkatli liderlik.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 2 anlamını bulma fonksiyonu
export const getposition2Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return position2Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipProblemsposition2Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return getposition2Meaning(cardName);
};

// Kart adına göre pozisyon 2 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipProblemsposition2MeaningByCardName = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  const meaning = getposition2Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 2 anlamlarını alma fonksiyonu
export const getAllposition2Meanings =
  (): RelationshipProblemsPositionMeaning[] => {
    return position2Meanings;
  };

// pozisyon 2 anlamlarını filtreleme fonksiyonu
export const getposition2MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return position2Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 2 anlamlarını arama
export const searchposition2MeaningsByKeyword = (
  keyword: string
): RelationshipProblemsPositionMeaning[] => {
  return position2Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position2Meanings,
  getposition2Meaning,
  getAllposition2Meanings,
  getposition2MeaningsByGroup,
  searchposition2MeaningsByKeyword,
};
