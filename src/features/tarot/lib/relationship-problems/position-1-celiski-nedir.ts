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
- position1Meanings: gerekli
- getPosition1Meaning: gerekli
*/

// import { getRelationshipProblemsMeaningByCardAndPositionMeaning } from './position-meanings-index';
import { RelationshipProblemsPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position1Meanings: RelationshipProblemsPositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_rc_pos1',
    card: 'The Fool',
    position: 1,
    upright:
      'Joker, ilişkinizdeki temel çelişkinin özgürlük ve bağlılık arasında salındığını gösterir. Biri keşfe ve spontane akışa çekilirken diğeri güvence ve plan ister; bu tempo farkı sürtünme yaratır.',
    reversed:
      'Ters Joker, sorunun kaynağında pervasızlık, düşünmeden verilen sözler ya da sorumluluktan kaçınma olabilir. Belirsizlik ve tutarsız davranışlar güven duygusunu aşındırarak çelişkiyi büyütür.',
    keywords: ['çelişki', 'özgürlük', 'bağlılık', 'belirsizlik', 'tempo farkı'],
    context: 'İlişkide çelişkinin doğası: özgürlük ve güvence gerilimi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_rc_pos1',
    card: 'The Magician',
    position: 1,
    upright:
      'Büyücü, çekirdek çelişkinin iletişim ve niyetlerin ifade edilme biçiminde yattığını söyler. Sözcüklerin gücü yüksek; doğru anlatım yakınlaştırırken eksik veya abartılı ifade yanlış anlaşılma doğurur.',
    reversed:
      'Ters Büyücü, çelişkinin manipülatif iletişim, ikna oyunları veya söz–eylem tutarsızlığından beslendiğini gösterir. Algı yönetimi güveni zedeler ve ortak zemini kaydırır.',
    keywords: ['iletişim', 'niyet', 'tutarlılık', 'güven', 'algı'],
    context: 'İlişkide çelişkinin doğası: ifade ve niyet yönetimi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_rc_pos1',
    card: 'The High Priestess',
    position: 1,
    upright:
      'Başrahibe, çelişkinin görünmeyen katmanlarda; sezgiler, sırlar ve söylenmeyenlerde biriktiğini anlatır. İç dünyaların okunamaması kuşku ve mesafeyi artırır.',
    reversed:
      'Ters Başrahibe, bastırılmış duygular ve yarım iletilen gerçeklerin kafa karışıklığı yarattığını gösterir. Gizliliğe fazlaca sığınmak güvensizlik döngüsünü besler.',
    keywords: ['giz', 'sezgi', 'saklı duygular', 'güvensizlik', 'mesafe'],
    context: 'İlişkide çelişkinin doğası: saklı gündemler ve sezgisel gerilim.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_rc_pos1',
    card: 'The Empress',
    position: 1,
    upright:
      'İmparatoriçe, ihtiyacın görülmesi ve bakım verme dengesinde bir çatallaşma olduğunu gösterir. Bir taraf daha fazla şefkat ve ilgi beklerken diğeri boğulduğunu hissedebilir.',
    reversed:
      'Ters İmparatoriçe, aşırı sahiplenme, bağımlılık ya da ihmal algısının çelişkiyi büyüttüğünü söyler. Öz bakım eksikliği ve kıskançlık gölgeleri ilişkiyi zedeler.',
    keywords: ['bakım', 'ihtiyaç', 'sahiplenme', 'bağımlılık', 'kıskançlık'],
    context: 'İlişkide çelişkinin doğası: bakım ve boğulma dengesi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_rc_pos1',
    card: 'The Emperor',
    position: 1,
    upright:
      'İmparator, çelişkinin sınırlar, kurallar ve karar otoritesi etrafında döndüğünü vurgular. Kontrol ve özgürlük ekseni üzerinde çekişme yaşanabilir.',
    reversed:
      'Ters İmparator, katı tutum, dikte etme veya mikro yönetimin gerilimi tırmandırdığını söyler. Otorite savaşları yakınlığı zayıflatır.',
    keywords: ['sınır', 'kural', 'otorite', 'kontrol', 'özgürlük'],
    context: 'İlişkide çelişkinin doğası: otorite ve sınır çekişmesi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_rc_pos1',
    card: 'The Hierophant',
    position: 1,
    upright:
      'Aziz, gelenekler, aile beklentileri ve doğru ilişki kalıpları konusunda fikir ayrılığına işaret eder. Statükoya uyum baskısı çatışma yaratabilir.',
    reversed:
      'Ters Aziz, dogmatik kurallar ile özgün ilişki arzusu arasında sıkışmayı gösterir. Böyle yapılır kalıbı esnekliği öldürdüğünde çelişki derinleşir.',
    keywords: ['gelenek', 'norm', 'aile baskısı', 'özgünlük', 'dogma'],
    context: 'İlişkide çelişkinin doğası: gelenek ve özgünlük gerilimi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_rc_pos1',
    card: 'The Lovers',
    position: 1,
    upright:
      'Aşıklar, öz değerler ve yaşam tercihleri arasında uyum ve hizalanma meselesinin çekirdek çelişki olduğunu söyler. Seçimler aynı hedefe mi akıyor yoksa yollar mı ayrışıyor.',
    reversed:
      'Ters Aşıklar, kararsızlık, ikiliğe düşme veya sadakatle ilgili gölgelerin güveni sarstığını gösterir. Değer uyumsuzluğu bağı zayıflatır.',
    keywords: ['değerler', 'seçim', 'hizalanma', 'sadakat', 'uyumsuzluk'],
    context: 'İlişkide çelişkinin doğası: değer ve yön hizası.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_rc_pos1',
    card: 'The Chariot',
    position: 1,
    upright:
      'Savaş Arabası, hedef, hız ve yöntem konusunda sürtünme yaşandığını gösterir. Bir taraf hızlı ilerlemek isterken diğeri daha temkinli olabilir.',
    reversed:
      'Ters Savaş Arabası, dağınık yönler, çekişen öncelikler ve direksiyon kavgasının çelişkiyi büyüttüğünü söyler. Ortak rota olmadan momentum kaybolur.',
    keywords: ['yön', 'hız', 'öncelik', 'yöntem', 'momentum'],
    context: 'İlişkide çelişkinin doğası: rota ve tempo uyuşmazlığı.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_rc_pos1',
    card: 'Strength',
    position: 1,
    upright:
      'Güç, duygusal regülasyon ve sabır sınavlarının temel gerilim olduğunu anlatır. Gurur, inat ya da kırılganlığın ifade edilememesi çatışmayı besler.',
    reversed:
      'Ters Güç, özgüven dalgalanması, kıskançlık ya da sabırsızlığın ilişkide güveni aşındırdığını gösterir. Yumuşak güç yerine baskı devreye girdiğinde çelişki artar.',
    keywords: ['sabır', 'duygu yönetimi', 'gurur', 'kıskançlık', 'şefkat'],
    context: 'İlişkide çelişkinin doğası: yumuşak güç ve baskı dengesi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_rc_pos1',
    card: 'The Hermit',
    position: 1,
    upright:
      'Ermiş, yalnızlık ihtiyacı ile yakınlık beklentisi arasında gerilim olduğunu söyler. Bir taraf alan isterken diğeri ihmal algılayabilir.',
    reversed:
      'Ters Ermiş, içe kapanma, kaçınma ya da duygusal geri çekilmenin iletişimi tıkadığını gösterir. Uzak duruş yanlış yorumlanır ve çelişkiyi büyütür.',
    keywords: ['alan', 'yakınlık', 'içe dönüş', 'uzaklaşma', 'iletişim'],
    context: 'İlişkide çelişkinin doğası: alan ve yakınlık dengesi.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_rc_pos1',
    card: 'The Wheel of Fortune',
    position: 1,
    upright:
      'Kader Çarkı, döngüler ve zamanlama kaynaklı iniş çıkışların çatışmayı tetiklediğini söyler. Roller ve koşullar değişirken uyum güncellenmediyse sürtünme artar.',
    reversed:
      'Ters Kader Çarkı, tekrarlayan kalıplara saplanma ve hep böyle olur inancının umudu kırdığını gösterir. Kadercilik çelişkiyi kronikleştirir.',
    keywords: ['döngü', 'zamanlama', 'alışkanlık', 'değişim', 'kadercilik'],
    context: 'İlişkide çelişkinin doğası: döngüsel kalıplar ve zamanlama.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_rc_pos1',
    card: 'Justice',
    position: 1,
    upright:
      'Adalet, adil olmayan iş bölümü, çifte standart veya sorumluluk dengesinin ana çatışma olduğunu belirtir. Hesap verilebilirlik talebi yüksektir.',
    reversed:
      'Ters Adalet, suçlama döngüsü, tarafgirlik ya da görmezden gelmenin güveni sarstığını gösterir. Haksızlık algısı kök çelişkidir.',
    keywords: [
      'adalet',
      'denge',
      'sorumluluk',
      'eşitlik',
      'hesap verebilirlik',
    ],
    context: 'İlişkide çelişkinin doğası: adalet ve denge arayışı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_rc_pos1',
    card: 'The Hanged Man',
    position: 1,
    upright:
      'Asılan Adam, fedakarlıkların tek taraflı algılanması ve askıda kalan kararların çatışma doğurduğunu söyler. Perspektif değişimi gecikmiş olabilir.',
    reversed:
      'Ters Asılan Adam, kurban psikolojisi, erteleme ve pasifliği işaret eder. Ben hep veriyorum anlatısı çelişkiyi besler.',
    keywords: [
      'fedakarlık',
      'askıda kalma',
      'perspektif',
      'erteleme',
      'kurban',
    ],
    context: 'İlişkide çelişkinin doğası: tek taraflı fedakarlık algısı.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_rc_pos1',
    card: 'Death',
    position: 1,
    upright:
      'Ölüm, dönüşüm ihtiyacı ve eski düzenin bitişi etrafında bir çatışma olduğunu söyler. Eski alışkanlıkları bırakmak yenilenmeyi getirebilir.',
    reversed:
      'Ters Ölüm, değişime direnç ve geçmişe tutunmanın krizi uzattığını gösterir. Bitişi reddetmek çelişkiyi kronikleştirir.',
    keywords: ['dönüşüm', 'bitiş', 'bırakma', 'yenilenme', 'direnç'],
    context: 'İlişkide çelişkinin doğası: değişim eşiği ve bırakma.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_rc_pos1',
    card: 'Temperance',
    position: 1,
    upright:
      'Denge, aşırılıklar ve ortak bir karışım bulamama halinin çatışmayı doğurduğunu söyler. Tempo, tarz ve değer dozajları yeniden ayar ister.',
    reversed:
      'Ters Denge, uçlara savrulma, dengesiz ritim ve sabırsızlığın gerilimi artırdığını gösterir. Kalibrasyon eksikliği bağlantıyı zorlar.',
    keywords: ['denge', 'orta yol', 'kalibrasyon', 'aşırılık', 'sabır'],
    context: 'İlişkide çelişkinin doğası: karışım ve ritim kalibrasyonu.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_rc_pos1',
    card: 'The Devil',
    position: 1,
    upright:
      'Şeytan, bağımlılık, kıskançlık, takıntı veya toksik kalıpların çekirdek çelişkiyi beslediğini söyler. Kontrol oyunları bağı zedeler.',
    reversed:
      'Ters Şeytan, koparılamayan bağlar ve tekrar eden kısır döngülerle mücadelenin sürdüğünü gösterir. Zinciri gevşetme çabası görünür.',
    keywords: ['bağımlılık', 'takıntı', 'kıskançlık', 'kontrol', 'toksisite'],
    context: 'İlişkide çelişkinin doğası: bağlayan gölgeler ve kontrol.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_rc_pos1',
    card: 'The Tower',
    position: 1,
    upright:
      'Kule, ani bir gerçek, şok edici söz ya da beklenmedik olayın ilişki dinamiğini sarstığını gösterir. Çatlaklar görünür olup krize evrilmiş olabilir.',
    reversed:
      'Ters Kule, birikmiş gerilimlerin patlamayı ertelediğini fakat temeldeki sorunların hala yerinde durduğunu söyler. Kontrollü yıkım ihtiyacı var.',
    keywords: ['kriz', 'şok', 'yıkım', 'gerçek', 'kırılma'],
    context: 'İlişkide çelişkinin doğası: sarsıcı uyanış ve kırılma.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_rc_pos1',
    card: 'The Star',
    position: 1,
    upright:
      'Yıldız, umut ve gerçeklik dengesi ile iyileşme hızına dair beklenti farklarının çatışma yarattığını söyler. Bir taraf daha hızlı şifa beklerken diğeri zamana ihtiyaç duyabilir.',
    reversed:
      'Ters Yıldız, umutsuzluk söylemi ve olumsuz öngörülerin bağı zayıflattığını gösterir. İnanç kaybı iletişimi kurutur.',
    keywords: ['umut', 'şifa', 'beklenti', 'gerçeklik', 'iyileşme'],
    context: 'İlişkide çelişkinin doğası: şifa temposu ve umut dengesi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_rc_pos1',
    card: 'The Moon',
    position: 1,
    upright:
      'Ay, belirsizlik, projeksiyon ve korkuların çelişkinin merkezinde olduğunu anlatır. Net olmayan sınırlar şüpheyi büyütür.',
    reversed:
      'Ters Ay, sırların açığa çıkmasıyla sisin dağılabileceğini; ancak kırılgan güvenin özen istediğini gösterir. Yanılsamalar çözülürken hassasiyet artar.',
    keywords: ['belirsizlik', 'korku', 'projeksiyon', 'güven', 'yanılsama'],
    context: 'İlişkide çelişkinin doğası: belirsizlik ve kuruntular.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_rc_pos1',
    card: 'The Sun',
    position: 1,
    upright:
      'Güneş, görünürlük, ego ve beğenilme ihtiyacı etrafında bir gerilim olduğunu söyler. Parlak yüzey başarıları, derindeki ihtiyaçları gölgelemiş olabilir.',
    reversed:
      'Ters Güneş, yapay neşe, gösteriş ya da kıyasın içtenliği zedelediğini gösterir. Paylaşılan sevinç gerçek bağ kurmadığında çelişki büyür.',
    keywords: ['ego', 'görünürlük', 'sevinç', 'kıyas', 'otantiklik'],
    context: 'İlişkide çelişkinin doğası: görünürlük ve otantiklik gerilimi.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_rc_pos1',
    card: 'Judgement',
    position: 1,
    upright:
      'Mahkeme, geçmişteki kararlar ve yüzleşmelerin şimdi hesap vermeye çağırdığını söyler. Geçmiş dosyalar kapanmadıysa çelişki bugüne sızar.',
    reversed:
      'Ters Mahkeme, öz eleştiri eksikliği ya da aşırı yargılamanın yeni bir sayfa açmayı engellediğini gösterir. Affediş gecikince gerilim sürer.',
    keywords: ['yüzleşme', 'hesap', 'affediş', 'geçmiş', 'karar'],
    context: 'İlişkide çelişkinin doğası: geçmişle hesaplaşma ve affediş.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_rc_pos1',
    card: 'The World',
    position: 1,
    upright:
      'Dünya, döngüyü tamamlama, taşınma veya evre değişimi gibi büyük eşiğin çelişki ürettiğini söyler. Birlikte bir sonraki aşamaya geçme kararı zorlayıcı olabilir.',
    reversed:
      'Ters Dünya, yarım kalmışlık hissi ve bitiremeden yeniye geçme eğiliminin gerilim yarattığını gösterir. Tamamlanmayan konular ilişkide ağırlık yapar.',
    keywords: ['tamamlanma', 'eşik', 'yaşam evresi', 'taahhüt', 'yarım kalma'],
    context: 'İlişkide çelişkinin doğası: eşik ve tamamlanma meselesi.',
    group: 'Majör Arkana',
  },

  // CUPS
  {
    id: 'ace_of_cups_rc_pos1',
    card: 'Ace of Cups',
    position: 1,
    upright:
      'Kupa Ası, duyguların ifade edilme biçimi ile ihtiyaçların görülmesi arasında çelişki olduğunu söyler. Biri duygusal açılım beklerken diğeri temkinli kalabilir.',
    reversed:
      'Ters Kupa Ası, duygusal tıkanıklık ve kırgınlıkların paylaşımı zorlaştırdığını gösterir. Kalp kapalı kaldıkça yanlış anlamalar artar.',
    keywords: ['duygu', 'ifade', 'kırılganlık', 'ihtiyaç', 'yakınlık'],
    context: 'Çelişkinin duygusal kökü: ifade ve ihtiyaç dengesi.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_rc_pos1',
    card: 'Two of Cups',
    position: 1,
    upright:
      'İki Kupa, karşılıklılık ve eşit alışveriş beklentisinde farklılık olduğunu gösterir. Verilen ile alınan arasında dengesizlik algısı çatışma yaratır.',
    reversed:
      'Ters İki Kupa, uyumun bozulması, yanlış anlaşılma ve kırılgan bağların gerilimi artırdığını söyler. Sözleşilmemiş beklentiler sorunu büyütür.',
    keywords: ['karşılıklılık', 'denge', 'uyum', 'beklenti', 'bağ'],
    context: 'Çelişkinin duygusal kökü: eşitlik ve karşılıklılık.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_rc_pos1',
    card: 'Three of Cups',
    position: 1,
    upright:
      'Üç Kupa, sosyal hayat, arkadaş çevresi ve paylaşılan neşenin dengesinde sürtünmeye işaret eder. Biri daha çok sosyallik isterken diğeri mahremiyeti korumak isteyebilir.',
    reversed:
      'Ters Üç Kupa, kıskançlık, dışlanmış hissetme ya da yüzeysel sosyalliğin bağa zarar verdiğini söyler.',
    keywords: ['sosyallik', 'kıskançlık', 'aidiyet', 'paylaşım', 'mahremiyet'],
    context: 'Çelişkinin duygusal kökü: sosyal alan ve mahremiyet.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_rc_pos1',
    card: 'Four of Cups',
    position: 1,
    upright:
      'Dört Kupa, ilgisizlik algısı ve duygusal doygunluk tartışmasına işaret eder. Biri yeni bir kıvılcım ararken diğeri mevcut düzenden memnun olabilir.',
    reversed:
      'Ters Dört Kupa, fırsatları görmezden gelme ve apatik tutumun yanlış okunduğunu gösterir. Şükran eksikliği çatışmayı büyütür.',
    keywords: ['ilgisizlik', 'tatmin', 'fırsat', 'şükran', 'algı'],
    context: 'Çelişkinin duygusal kökü: tatmin ve ilgi dengesi.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_rc_pos1',
    card: 'Five of Cups',
    position: 1,
    upright:
      'Beş Kupa, geçmiş kırgınlıkların bugünü gölgelediğini ve kayıplara odaklanmanın çelişkiyi beslediğini söyler.',
    reversed:
      'Ters Beş Kupa, affediş geciktiğinde suçlama döngüsünün sürdüğünü gösterir. Yaşananların anlamlandırılması şarttır.',
    keywords: ['kayıp', 'yas', 'affediş', 'suçlama', 'toparlanma'],
    context: 'Çelişkinin duygusal kökü: geçmiş kırgınlıkların gölgesi.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_rc_pos1',
    card: 'Six of Cups',
    position: 1,
    upright:
      'Altı Kupa, nostalji ve eski örüntülere bağlı kalma nedeniyle bugünle temasın bozulduğunu söyler. Geçmiş güzel anlar bugünkü beklentiyi biçimlendirir.',
    reversed:
      'Ters Altı Kupa, geçmişe saplanmanın gelişimi engellediğini ve tekrarlayan çocukça tepkilerin çatışma doğurduğunu gösterir.',
    keywords: ['nostalji', 'geçmiş', 'örüntü', 'beklenti', 'gelişim'],
    context: 'Çelişkinin duygusal kökü: geçmişin bugüne sızması.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_rc_pos1',
    card: 'Seven of Cups',
    position: 1,
    upright:
      'Yedi Kupa, hayal ve gerçeklik arasında bulanık sınırların çelişki yarattığını söyler. Seçenek çokluğu kararsızlığı büyütür.',
    reversed:
      'Ters Yedi Kupa, idealize etme ve kaçışın bağın ihtiyaçlarını perdelediğini gösterir. Net kriter eksikliği sorun üretir.',
    keywords: ['hayal', 'gerçeklik', 'kararsızlık', 'seçenek', 'idealizasyon'],
    context: 'Çelişkinin duygusal kökü: hayal ve gerçeklik dengesi.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_rc_pos1',
    card: 'Eight of Cups',
    position: 1,
    upright:
      'Sekiz Kupa, anlam arayışı ve duygusal tatminsizlik nedeniyle uzaklaşma eğiliminin çelişki yarattığını söyler.',
    reversed:
      'Ters Sekiz Kupa, kalmak ile gitmek arasında gidip gelmenin güvensizlik yarattığını gösterir. Kapanış yapılmayan konular ilişkiyi yorar.',
    keywords: ['anlam', 'tatminsizlik', 'uzaklaşma', 'ikilem', 'kapanış'],
    context: 'Çelişkinin duygusal kökü: anlam ve yön arayışı.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_rc_pos1',
    card: 'Nine of Cups',
    position: 1,
    upright:
      'Dokuz Kupa, kişisel tatmin arzusu ile ortak fayda arasında gerilim olduğunu söyler. Bireysel dilekler ortak hedeflerle çatışabilir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel hazların kalıcı doyuma engel olup beklenti farkı doğurduğunu gösterir.',
    keywords: ['tatmin', 'haz', 'beklenti', 'bireysel hedef', 'ortak fayda'],
    context: 'Çelişkinin duygusal kökü: kişisel tatmin ve ortak fayda.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_rc_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'On Kupa, ideal ilişki imgesi ile gerçek yaşam koşulları arasındaki farkın gerilim ürettiğini söyler.',
    reversed:
      'Ters On Kupa, sahte uyum görüntüsünün bastırılmış sorunları gizlediğini ve beklenti yönetimi eksikliğinin çelişkiyi arttırdığını gösterir.',
    keywords: ['ideal', 'gerçeklik', 'uyum', 'beklenti', 'aile'],
    context: 'Çelişkinin duygusal kökü: ideal ve gerçeklik aralığı.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_rc_pos1',
    card: 'Page of Cups',
    position: 1,
    upright:
      'Kupa Prensi, duygusal olgunluk farkı ve alınganlığın çelişkiyi tetiklediğini söyler. Masum niyetler bile yanlış okunabilir.',
    reversed:
      'Ters Kupa Prensi, kaçış, abartılı duygusallık veya pasif iletişimin anlaşmazlığı büyüttüğünü gösterir.',
    keywords: ['alınganlık', 'olgunluk', 'kaçış', 'ifade', 'hassasiyet'],
    context: 'Çelişkinin duygusal kökü: olgunluk ve ifade farkı.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_rc_pos1',
    card: 'Knight of Cups',
    position: 1,
    upright:
      'Kupa Şövalyesi, romantik idealler ile somut ihtiyaçlar arasında gerilime işaret eder. Yüksek beklenti hayal kırıklığı doğurabilir.',
    reversed:
      'Ters Kupa Şövalyesi, söz ve eylem uyumsuzluğunun güveni sarstığını ve çelişkiyi derinleştirdiğini gösterir.',
    keywords: ['romantizm', 'ideal', 'gerçeklik', 'tutarlılık', 'güven'],
    context: 'Çelişkinin duygusal kökü: ideal ve gerçek uyumsuzluğu.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_rc_pos1',
    card: 'Queen of Cups',
    position: 1,
    upright:
      'Kupa Kraliçesi, empati ihtiyacı ile sınır koyma becerisi arasında dengesizlik olduğunu söyler. Aşırı bakım boğucu algılanabilir.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal manipülasyon veya sınır erimesinin ilişkiyi yorduğunu gösterir.',
    keywords: ['empati', 'sınır', 'bakım', 'manipülasyon', 'denge'],
    context: 'Çelişkinin duygusal kökü: empati ve sınır dengesi.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_rc_pos1',
    card: 'King of Cups',
    position: 1,
    upright:
      'Kupa Kralı, duyguları yönetme tarzındaki farkların çelişki yarattığını söyler. Biri sakin ve kontrollü kalırken diğeri ifade ister.',
    reversed:
      'Ters Kupa Kralı, pasif agresif tutum ve bastırılmış öfkenin güveni aşındırdığını gösterir.',
    keywords: ['duygu yönetimi', 'ifade', 'sükunet', 'pasif agresif', 'güven'],
    context: 'Çelişkinin duygusal kökü: ifade ve regülasyon farkı.',
    group: 'Kupalar',
  },

  // SWORDS
  {
    id: 'ace_of_swords_rc_pos1',
    card: 'Ace of Swords',
    position: 1,
    upright:
      'Kılıç Ası, gerçeğin yorumu ve netlik ihtiyacında çelişki olduğunu söyler. Biri açık ve keskin söz isterken diğeri yumuşak geçiş arar.',
    reversed:
      'Ters Kılıç Ası, bilgi kirliliği, çarpıtılmış anlatı ve belirsiz mesajların anlaşmazlığı büyüttüğünü gösterir.',
    keywords: ['netlik', 'doğruluk', 'mesaj', 'yorum', 'iletişim'],
    context: 'Çelişkinin zihinsel kökü: netlik ve anlatı farkı.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_rc_pos1',
    card: 'Two of Swords',
    position: 1,
    upright:
      'İki Kılıç, kararsızlık ve duyguları dışarıda bırakan akıl oyunlarının çelişkiyi kilitlediğini söyler.',
    reversed:
      'Ters İki Kılıç, yüzleşmeden kaçınmanın ve görmezden gelmenin tıkanmayı uzattığını gösterir.',
    keywords: ['kararsızlık', 'yüzleşme', 'denge', 'engel', 'inkar'],
    context: 'Çelişkinin zihinsel kökü: kaçınma ve karar felci.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_rc_pos1',
    card: 'Three of Swords',
    position: 1,
    upright:
      'Üç Kılıç, kırıcı sözler, ihanet algısı veya sert gerçeklerle yüzleşmenin çekirdek çatışmayı tetiklediğini söyler.',
    reversed:
      'Ters Üç Kılıç, ifade edilmeyen acının sızıntı halinde çatışmayı sürdürdüğünü, onarım konuşmasının ertelendiğini gösterir.',
    keywords: ['kırgınlık', 'ihanet algısı', 'yüzleşme', 'acı', 'onarım'],
    context: 'Çelişkinin zihinsel kökü: kırıcı gerçek ve ifade eksikliği.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_rc_pos1',
    card: 'Four of Swords',
    position: 1,
    upright:
      'Dört Kılıç, aşırı yorgunluk ve zihinsel gürültü nedeniyle sağlıklı konuşmaların ertelendiğini söyler.',
    reversed:
      'Ters Dört Kılıç, dinlenme ve mesafe ihtiyacı reddedildiğinde gerginliğin arttığını gösterir.',
    keywords: ['mola', 'zihin yorgunluğu', 'mesafe', 'sessizlik', 'iyileşme'],
    context: 'Çelişkinin zihinsel kökü: dinlenme ve alan ihtiyacı.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_rc_pos1',
    card: 'Five of Swords',
    position: 1,
    upright:
      'Beş Kılıç, kazanmak uğruna ilişkiyi yakma eğiliminin ve haklılık savaşlarının çekirdek çatışma olduğunu söyler.',
    reversed:
      'Ters Beş Kılıç, küçük düşürme ve alaycı dilin kalıcı iz bıraktığını, yüz kurtaran çözümlerin ertelendiğini gösterir.',
    keywords: ['haklılık', 'ego', 'çatışma', 'maliyet', 'uzlaşı'],
    context: 'Çelişkinin zihinsel kökü: haklı çıkma arzusu.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_rc_pos1',
    card: 'Six of Swords',
    position: 1,
    upright:
      'Altı Kılıç, düşünsel geçiş ihtiyacı ve yöntem farkının gerilim yarattığını söyler. Sakin sulara geçiş için plan gerekir.',
    reversed:
      'Ters Altı Kılıç, eski tartışma kalıplarına dönüşün çözümü geciktirdiğini gösterir.',
    keywords: ['geçiş', 'plan', 'yöntem', 'sakinlik', 'kalıp'],
    context: 'Çelişkinin zihinsel kökü: yöntem ve geçiş stratejisi.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_rc_pos1',
    card: 'Seven of Swords',
    position: 1,
    upright:
      'Yedi Kılıç, saklı ajandalar, eksik anlatım ve stratejik suskunluğun güveni sarstığını söyler.',
    reversed:
      'Ters Yedi Kılıç, sızıntı, yakalanma korkusu ve itiraf ertelenmesinin gerilimi büyüttüğünü gösterir.',
    keywords: ['gizlilik', 'dürüstlük', 'strateji', 'güven', 'saklama'],
    context: 'Çelişkinin zihinsel kökü: şeffaflık ve güven sorunu.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_rc_pos1',
    card: 'Eight of Swords',
    position: 1,
    upright:
      'Sekiz Kılıç, öz kısıtlayıcı inançların ve korku temelli düşüncenin hareket alanını daralttığını söyler.',
    reversed:
      'Ters Sekiz Kılıç, zihinsel tuzakların fark edilmediğinde aynı döngüye tekrar girildiğini gösterir.',
    keywords: ['korku', 'inanç', 'tuzak', 'kısıt', 'özgürleşme'],
    context: 'Çelişkinin zihinsel kökü: korku ve öz kısıt inançları.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_rc_pos1',
    card: 'Nine of Swords',
    position: 1,
    upright:
      'Dokuz Kılıç, kaygı ve felaket senaryolarının iletişimi zehirlediğini, uykusuz gecelerin algıyı bozduğunu söyler.',
    reversed:
      'Ters Dokuz Kılıç, içten içe büyüyen endişelerin paylaşılmadıkça çarpıtılmış anlamlara dönüştüğünü gösterir.',
    keywords: ['kaygı', 'kuruntu', 'uykusuzluk', 'abartı', 'paylaşım'],
    context: 'Çelişkinin zihinsel kökü: kaygı dilinin hakimiyeti.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_rc_pos1',
    card: 'Ten of Swords',
    position: 1,
    upright:
      'On Kılıç, bir tartışma döngüsünün bittiğini fakat acı bir kapanışın yaşandığını söyler. Yeniden inşa için alan açılmalı.',
    reversed:
      'Ters On Kılıç, bitişi kabul etmeyip aynı argümanları sürdürmenin yıpratıcı olduğunu gösterir.',
    keywords: ['bitiş', 'kapanış', 'yeniden doğuş', 'yıpranma', 'kabul'],
    context: 'Çelişkinin zihinsel kökü: acı kapanış ve kabul.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_rc_pos1',
    card: 'Page of Swords',
    position: 1,
    upright:
      'Kılıç Prensi, meraklı sorgulamanın yararlı olabileceğini ama keskin, kuşkucu tonun savunmayı tetiklediğini söyler.',
    reversed:
      'Ters Kılıç Prensi, dedikodu, acele yargı ve kanıtlanmamış iddiaların çatışmayı büyüttüğünü gösterir.',
    keywords: ['soru', 'kuşku', 'dedikodu', 'kanıt', 'iletişim'],
    context: 'Çelişkinin zihinsel kökü: sorgu tonu ve kanıt.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_rc_pos1',
    card: 'Knight of Swords',
    position: 1,
    upright:
      'Kılıç Şövalyesi, hızlı ve sert iletişimin karşı tarafı köşeye sıkıştırdığını, düşünmeden konuşmanın gerilim yarattığını söyler.',
    reversed:
      'Ters Kılıç Şövalyesi, aceleci suçlamaların geri teptiğini ve diyalog kanallarını kapattığını gösterir.',
    keywords: ['sert dil', 'acele', 'saldırı', 'diyalog', 'geri tepme'],
    context: 'Çelişkinin zihinsel kökü: hız ve sertlik.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_rc_pos1',
    card: 'Queen of Swords',
    position: 1,
    upright:
      'Kılıç Kraliçesi, nesnellik arayışı ile duygusal hassasiyet arasında denge kurulamadığını söyler. Fazla eleştiri soğukluk yaratır.',
    reversed:
      'Ters Kılıç Kraliçesi, alaycı ve keskin dilin kopuşu hızlandırdığını gösterir.',
    keywords: ['nesnellik', 'eleştiri', 'sınır', 'soğukluk', 'ifade'],
    context: 'Çelişkinin zihinsel kökü: eleştiri ve şefkat dengesi.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_rc_pos1',
    card: 'King of Swords',
    position: 1,
    upright:
      'Kılıç Kralı, ilke ve kural odaklı yaklaşım ile esneklik ihtiyacı arasında gerilim olduğunu söyler.',
    reversed:
      'Ters Kılıç Kralı, dogmatik tavrın ve güç dilinin güveni aşındırdığını gösterir.',
    keywords: ['ilke', 'kural', 'esneklik', 'dogma', 'güç'],
    context: 'Çelişkinin zihinsel kökü: ilke ve esneklik çekişmesi.',
    group: 'Kılıçlar',
  },

  // WANDS
  {
    id: 'ace_of_wands_rc_pos1',
    card: 'Ace of Wands',
    position: 1,
    upright:
      'Değnek Ası, girişim enerjisi ve istek düzeyindeki farkların gerilim yarattığını söyler. Biri hemen aksiyon isterken diğeri hazırlık arar.',
    reversed:
      'Ters Değnek Ası, hevesin çabuk sönmesi ve yarım bırakmaların güveni sarstığını gösterir.',
    keywords: ['heves', 'başlangıç', 'aksiyon', 'tutarlılık', 'ivme'],
    context: 'Çelişkinin eylemsel kökü: hız ve hazırlık dengesi.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_rc_pos1',
    card: 'Two of Wands',
    position: 1,
    upright:
      'İki Değnek, vizyon ve plan ufkunda farklılık olduğunu söyler. Biri genişlemek isterken diğeri güvenli bölgede kalmak ister.',
    reversed:
      'Ters İki Değnek, risk iştahı dengesizliği ve karar ertelemenin çatışmayı büyüttüğünü gösterir.',
    keywords: ['vizyon', 'plan', 'risk', 'genişleme', 'konfor alanı'],
    context: 'Çelişkinin eylemsel kökü: vizyon ve risk yaklaşımı.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_rc_pos1',
    card: 'Three of Wands',
    position: 1,
    upright:
      'Üç Değnek, zamanlama ve beklenti yönetiminde uyumsuzluk olduğunu söyler. Sonuç ufku ve sabır düzeyi çakışmayabilir.',
    reversed:
      'Ters Üç Değnek, gecikmelerin suçlama döngüsüne dönüştüğünü ve koordinasyon eksikliğinin çatışma yarattığını gösterir.',
    keywords: ['zamanlama', 'beklenti', 'sabır', 'koordinasyon', 'ufuk'],
    context: 'Çelişkinin eylemsel kökü: zaman ve koordinasyon.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_rc_pos1',
    card: 'Four of Wands',
    position: 1,
    upright:
      'Dört Değnek, kutlama, birlikte yaşam adımları veya aile ritüellerinde uyumsuzluk olduğunu söyler.',
    reversed:
      'Ters Dört Değnek, eşiğin tamamlanmadan kutlanmasının hayal kırıklığı yarattığını ve temelin sorgulandığını gösterir.',
    keywords: ['eşik', 'kutlama', 'aile', 'temel', 'aidiyet'],
    context: 'Çelişkinin eylemsel kökü: eşik ve ritüel uyumu.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_rc_pos1',
    card: 'Five of Wands',
    position: 1,
    upright:
      'Beş Değnek, rekabetçi üslup, fikir çarpışması ve güç denemelerinin gerilim ürettiğini söyler.',
    reversed:
      'Ters Beş Değnek, kuralsız tartışmanın verimsizlik doğurduğunu ve oyunun çerçeveye ihtiyaç duyduğunu gösterir.',
    keywords: ['rekabet', 'fikir', 'mücadele', 'kural', 'verim'],
    context: 'Çelişkinin eylemsel kökü: çatışma çerçevesi eksikliği.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_rc_pos1',
    card: 'Six of Wands',
    position: 1,
    upright:
      'Altı Değnek, takdir görme ihtiyacı ile tevazu beklentisi arasında gerilim olduğunu söyler. Kim parlıyor, kim gölgede kalıyor.',
    reversed:
      'Ters Altı Değnek, görünmeyen emek ve kıskançlığın çatışmayı alevlendirdiğini gösterir.',
    keywords: ['takdir', 'görünürlük', 'kıskançlık', 'başarı', 'algı'],
    context: 'Çelişkinin eylemsel kökü: görünürlük ve takdir.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_rc_pos1',
    card: 'Seven of Wands',
    position: 1,
    upright:
      'Yedi Değnek, savunma hali ve sürekli gerekçelendirme ihtiyacının ilişkide mesafe yarattığını söyler.',
    reversed:
      'Ters Yedi Değnek, aşırı savunuculuğun diyalogu kapattığını, yumuşamanın şart olduğunu gösterir.',
    keywords: ['savunma', 'sınır', 'haklılık', 'diyalog', 'esneklik'],
    context: 'Çelişkinin eylemsel kökü: savunma ve açıklık dengesi.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_rc_pos1',
    card: 'Eight of Wands',
    position: 1,
    upright:
      'Sekiz Değnek, iletişim hızında ve öncelik sıralamasında uyumsuzluk olduğunu söyler. Biri hızlı yanıt isterken diğeri yavaş akabilir.',
    reversed:
      'Ters Sekiz Değnek, mesaj karmaşası ve gecikmenin yanlış anlamaları artırdığını gösterir.',
    keywords: ['hız', 'iletişim', 'öncelik', 'senkron', 'gecikme'],
    context: 'Çelişkinin eylemsel kökü: iletişim temposu.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_rc_pos1',
    card: 'Nine of Wands',
    position: 1,
    upright:
      'Dokuz Değnek, yorgunluk ve tetikte olma halinin en küçük sinyale aşırı tepki ürettiğini söyler.',
    reversed:
      'Ters Dokuz Değnek, geçmiş yaralar üzerinden şimdiye bakmanın güveni zayıflattığını gösterir.',
    keywords: ['yorgunluk', 'tetikte olma', 'korunma', 'tolerans', 'geçmiş'],
    context: 'Çelişkinin eylemsel kökü: yorgun savunma hali.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_rc_pos1',
    card: 'Ten of Wands',
    position: 1,
    upright:
      'On Değnek, yük paylaşımı ve sorumluluk dengesindeki adaletsizliğin gerilim yarattığını söyler.',
    reversed:
      'Ters On Değnek, her şeyi üstlenme veya tamamen bırakma uçlarının çatışmayı büyüttüğünü gösterir.',
    keywords: ['yük', 'sorumluluk', 'adalet', 'delege', 'denge'],
    context: 'Çelişkinin eylemsel kökü: yük ve sorumluluk paylaşımı.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_rc_pos1',
    card: 'Page of Wands',
    position: 1,
    upright:
      'Değnek Prensi, merak ve keşif arzusu ile istikrar ihtiyacı arasındaki farkın gerilim ürettiğini söyler.',
    reversed:
      'Ters Değnek Prensi, hevesin yarım kalması ve odak dağınıklığının güveni zedelediğini gösterir.',
    keywords: ['merak', 'keşif', 'odak', 'istikrar', 'heves'],
    context: 'Çelişkinin eylemsel kökü: keşif ve istikrar dengesi.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_rc_pos1',
    card: 'Knight of Wands',
    position: 1,
    upright:
      'Değnek Şövalyesi, atılganlık ve hızlı kararların partneri hazırlıksız yakalayarak çatışma yarattığını söyler.',
    reversed:
      'Ters Değnek Şövalyesi, yarıda bırakma ve dengesiz enerji akışının güven erozyonu yarattığını gösterir.',
    keywords: ['atılganlık', 'hız', 'istikrar', 'taahhüt', 'ivme'],
    context: 'Çelişkinin eylemsel kökü: hız ve taahhüt tutarlılığı.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_rc_pos1',
    card: 'Queen of Wands',
    position: 1,
    upright:
      'Değnek Kraliçesi, görünürlük ve karizma ihtiyacı ile partnerin güvenlik alanı arasında gerilim olduğunu söyler.',
    reversed:
      'Ters Değnek Kraliçesi, kıyas ve görünürlük kaygısının kıskançlığı tetiklediğini gösterir.',
    keywords: ['görünürlük', 'özgüven', 'kıyas', 'kıskançlık', 'karizma'],
    context: 'Çelişkinin eylemsel kökü: görünürlük ve kıyas gölgesi.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_rc_pos1',
    card: 'King of Wands',
    position: 1,
    upright:
      'Değnek Kralı, vizyoner liderlik arzusu ile ortak karar kültürü arasında gerilim olduğunu söyler.',
    reversed:
      'Ters Değnek Kralı, otoriter ton ve ego sürtüşmelerinin diyaloğu bozduğunu gösterir.',
    keywords: ['vizyon', 'liderlik', 'ego', 'otorite', 'katılım'],
    context: 'Çelişkinin eylemsel kökü: liderlik ve katılım dengesi.',
    group: 'Asalar',
  },

  // PENTACLES
  {
    id: 'ace_of_pentacles_rc_pos1',
    card: 'Ace of Pentacles',
    position: 1,
    upright:
      'Tılsım Ası, maddi öncelikler ve somut güvenlik ihtiyacı ile duygusal öncelikler arasında gerilim olduğunu söyler.',
    reversed:
      'Ters Tılsım Ası, fırsat kaçırma korkusu ve kıtlık zihniyetinin ilişki kararlarını baskıladığını gösterir.',
    keywords: ['maddi güven', 'fırsat', 'kıtlık', 'öncelik', 'somutluk'],
    context: 'Çelişkinin somut kökü: güvenlik ve fırsat dengesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_rc_pos1',
    card: 'Two of Pentacles',
    position: 1,
    upright:
      'İki Tılsım, zaman ve kaynak yönetiminde denge kurulamamasının gerilim yarattığını söyler. İş hayatı ve ilişki temposu çatışabilir.',
    reversed:
      'Ters İki Tılsım, dağınık önceliklerin ve ertelemenin yükü artırdığını gösterir.',
    keywords: ['denge', 'zaman', 'öncelik', 'esneklik', 'yük'],
    context: 'Çelişkinin somut kökü: zaman ve kaynak dengesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_rc_pos1',
    card: 'Three of Pentacles',
    position: 1,
    upright:
      'Üç Tılsım, işbirliği ve rol netliğinde eksiklerin sürtünme yarattığını söyler. Kalite beklentisi uyuşmayabilir.',
    reversed:
      'Ters Üç Tılsım, takdir eksikliği ve görünmeyen emeğin çatışmayı büyüttüğünü gösterir.',
    keywords: ['işbirliği', 'rol', 'kalite', 'takdir', 'koordinasyon'],
    context: 'Çelişkinin somut kökü: rol ve kalite çerçevesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_rc_pos1',
    card: 'Four of Pentacles',
    position: 1,
    upright:
      'Dört Tılsım, kontrol ve güvenlik arzusunun paylaşımı sınırladığını söyler. Cimrilik algısı gerilim üretir.',
    reversed:
      'Ters Dört Tılsım, aşırı sıkılık veya savurganlık uçlarının çatışmayı artırdığını gösterir.',
    keywords: ['kontrol', 'güvenlik', 'paylaşım', 'tutma', 'savurganlık'],
    context: 'Çelişkinin somut kökü: kontrol ve paylaşım dengesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_rc_pos1',
    card: 'Five of Pentacles',
    position: 1,
    upright:
      'Beş Tılsım, maddi sıkışma algısı ve dışlanmışlık hissinin duygusal kopuş yarattığını söyler.',
    reversed:
      'Ters Beş Tılsım, yardım isteme ve dayanışma eksikliğinin sorunu büyüttüğünü gösterir.',
    keywords: ['sıkışma', 'dışlanma', 'yardım', 'dayanışma', 'güven'],
    context: 'Çelişkinin somut kökü: kriz ve destek eksikliği.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_rc_pos1',
    card: 'Six of Pentacles',
    position: 1,
    upright:
      'Altı Tılsım, adil alışveriş ve destek dengesinde sorun olduğunu söyler. Veren ve alan rolleri tartışmalıdır.',
    reversed:
      'Ters Altı Tılsım, koşullu destek ve güç dengesizliğinin çatışmayı beslediğini gösterir.',
    keywords: ['adalet', 'destek', 'güç', 'koşul', 'denge'],
    context: 'Çelişkinin somut kökü: adil paylaşım ve güç dengesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_rc_pos1',
    card: 'Seven of Pentacles',
    position: 1,
    upright:
      'Yedi Tılsım, emek ve sonuç zamanlamasında sabır farkının gerilim yarattığını söyler.',
    reversed:
      'Ters Yedi Tılsım, batık maliyet inadı ve sabırsızlığın yanlış kararları tetiklediğini gösterir.',
    keywords: ['sabır', 'hasat', 'verim', 'batık maliyet', 'zamanlama'],
    context: 'Çelişkinin somut kökü: emek ve hasat dengesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_rc_pos1',
    card: 'Eight of Pentacles',
    position: 1,
    upright:
      'Sekiz Tılsım, çalışma alışkanlıkları ve kalite standardı konusunda uyumsuzluk olduğunu söyler.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik veya aşırı mükemmeliyetçiliğin sürtünme yarattığını gösterir.',
    keywords: [
      'çalışma',
      'standart',
      'özen',
      'mükemmeliyetçilik',
      'alışkanlık',
    ],
    context: 'Çelişkinin somut kökü: emek standardı farkı.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_rc_pos1',
    card: 'Nine of Pentacles',
    position: 1,
    upright:
      'Dokuz Tılsım, bağımsızlık arzusu ile ortak yaşam beklentisi arasında gerilim olduğunu söyler.',
    reversed:
      'Ters Dokuz Tılsım, israf algısı veya aşırı tutumluluğun tartışma doğurduğunu gösterir.',
    keywords: ['bağımsızlık', 'konfor', 'tasarruf', 'israf', 'ortak yaşam'],
    context: 'Çelişkinin somut kökü: bağımsızlık ve ortak konfor.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_rc_pos1',
    card: 'Ten of Pentacles',
    position: 1,
    upright:
      'On Tılsım, aile, miras ve uzun vadeli güvence konularında farklı önceliklerin gerilim yarattığını söyler.',
    reversed:
      'Ters On Tılsım, aile veya maddi yapı içi çekişmelerin ilişkiyi zorladığını gösterir.',
    keywords: ['aile', 'miras', 'güvence', 'yapı', 'çekişme'],
    context: 'Çelişkinin somut kökü: aile ve uzun vade öncelikleri.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_rc_pos1',
    card: 'Page of Pentacles',
    position: 1,
    upright:
      'Tılsım Prensi, öğrenme ve beceri yatırımı ile kısa vadeli konfor arasında gerilim olduğunu söyler.',
    reversed:
      'Ters Tılsım Prensi, dağınık odak ve ertelemenin ortak hedeflere zarar verdiğini gösterir.',
    keywords: ['öğrenme', 'yatırım', 'odak', 'erteleme', 'hedef'],
    context: 'Çelişkinin somut kökü: öğrenme ve konfor çatışması.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_rc_pos1',
    card: 'Knight of Pentacles',
    position: 1,
    upright:
      'Tılsım Şövalyesi, yavaş ama emin ilerleme arzusu ile hız beklentisinin çatıştığını söyler.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık veya esneklik eksikliğinin gerilim doğurduğunu gösterir.',
    keywords: ['yavaşlık', 'istikrar', 'hız', 'esneklik', 'rutİN'],
    context: 'Çelişkinin somut kökü: tempo ve istikrar dengesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_rc_pos1',
    card: 'Queen of Pentacles',
    position: 1,
    upright:
      'Tılsım Kraliçesi, bakım ve pratik ihtiyaçlara odak ile romantik beklentiler arasında gerilim olduğunu söyler.',
    reversed:
      'Ters Tılsım Kraliçesi, aşırı yük ve kendini ihmalin huzursuzluk yarattığını gösterir.',
    keywords: ['bakım', 'pratiklik', 'romantizm', 'yük', 'öz bakım'],
    context: 'Çelişkinin somut kökü: bakım ve romantik denge.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_rc_pos1',
    card: 'King of Pentacles',
    position: 1,
    upright:
      'Tılsım Kralı, maddi güvence ve statü odaklı yaklaşım ile esneklik ve paylaşım ihtiyacı arasında gerilim olduğunu söyler.',
    reversed:
      'Ters Tılsım Kralı, kontrol ve sahiplik dilinin bağı baskıladığını gösterir.',
    keywords: ['güvence', 'statü', 'kontrol', 'paylaşım', 'esneklik'],
    context: 'Çelişkinin somut kökü: kontrol ve paylaşım dengesi.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 1 anlamını bulma fonksiyonu
export const getPosition1Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return position1Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipProblemsPosition1Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return getPosition1Meaning(cardName);
};

// Kart adına göre pozisyon 1 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipProblemsPosition1MeaningByCardName = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  const meaning = getPosition1Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 1 anlamlarını alma fonksiyonu
export const getAllPosition1Meanings =
  (): RelationshipProblemsPositionMeaning[] => {
    return position1Meanings;
  };

// Pozisyon 1 anlamlarını filtreleme fonksiyonu
export const getPosition1MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return position1Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 1 anlamlarını arama
export const searchPosition1MeaningsByKeyword = (
  keyword: string
): RelationshipProblemsPositionMeaning[] => {
  return position1Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position1Meanings,
  getPosition1Meaning,
  getAllPosition1Meanings,
  getPosition1MeaningsByGroup,
  searchPosition1MeaningsByKeyword,
};
