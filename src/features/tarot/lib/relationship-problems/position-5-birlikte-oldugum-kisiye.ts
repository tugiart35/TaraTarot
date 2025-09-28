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
- position5Meanings: gerekli
- getposition5Meaning: gerekli
*/

// import { getRelationshipProblemsMeaningByCardAndPositionMeaning } from './position-meanings-index';
import { RelationshipProblemsPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position5Meanings: RelationshipProblemsPositionMeaning[] = [
  // MAJÖR ARKANA
  // RELATIONSHIP CONFLICT — Pozisyon 5: 'Birlikte olduğum kişiyle geçmişteki deneyimlerim'
  // MAJOR ARCANA (22)
  {
    id: 'the_fool_rc_pos5',
    card: 'The Fool',
    position: 5,
    upright:
      'Joker, ilişkinizin başlarında spontane ve plansız adımların çok olduğunu söyler. Bu tazelik yakınlığı hızla büyütmüş ama sınırlar belirsiz kalmış olabilir.',
    reversed:
      'Ters Joker, geçmişte düşünmeden atılan adımların kırılgan zemin bıraktığını anlatır. “Bakarız” tavrı bugün güvensizlik tetiklemiş olabilir.',
    keywords: ['başlangıç', 'spontane', 'özgürlük', 'belirsizlik', 'sınır'],
    context:
      'Erken dönem hevesi ve plansızlık teması. Sınırlar geç konuşulmuş. Bugün netlik ve çerçeve ihtiyacı doğmuş.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_rc_pos5',
    card: 'The Magician',
    position: 5,
    upright:
      'Büyücü, ilk günlerde güçlü iletişim ve çekimin ilişkinizi kurduğunu söyler. Birbirinizi motive etmiş, hayaller kurmuşsunuz.',
    reversed:
      'Ters Büyücü, söz–eylem uyumsuzluklarının geçmişte tohum attığını anlatır. Abartılı vaatler bugün kuşkuya dönüşmüş olabilir.',
    keywords: ['iletişim', 'çekim', 'vaat', 'tutarlılık', 'güven'],
    context:
      'Parlak başlangıçlar; zamanla tutarlılık testi. Algı–gerçek farkı güveni etkilemiş. Şimdi sade ve kanıtlanabilir adımlar gerekli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_rc_pos5',
    card: 'The High Priestess',
    position: 5,
    upright:
      'Başrahibe, geçmişinizde güçlü sezgi ve sözsüz anlaşma olduğunu söyler. Sessizlik bazen güvenli alan yaratmış.',
    reversed:
      'Ters Başrahibe, konuşulmayanların biriktiğini ve yanlış okumalar doğurduğunu anlatır. Sırlar bugün gölge gibi dolaşıyor olabilir.',
    keywords: ['sezgi', 'sır', 'suskunluk', 'mahremiyet', 'yanlış anlama'],
    context:
      'Paylaşılmayan duygular ve ima dili. Güven var ama şeffaflık eksik kalmış. Bugün açık ifade gerekli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_rc_pos5',
    card: 'The Empress',
    position: 5,
    upright:
      'İmparatoriçe, geçmişte şefkat, bakım ve sıcaklığın bol olduğunu söyler. Birbirinizi beslemiş, güvenli bir yuva hissi kurmuşsunuz.',
    reversed:
      'Ters İmparatoriçe, aşırı sahiplenme ya da ihmal döngülerinin iz bıraktığını anlatır. Duygusal dozaj sorunları bugün tetiklenebilir.',
    keywords: ['bakım', 'şefkat', 'sahiplenme', 'yuva', 'dozaj'],
    context:
      'Sıcaklık ve bakım dengesi. Zaman zaman boğuculuk/ihmal uçları. Şimdi ölçülü ilgi ve öz bakım şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_rc_pos5',
    card: 'The Emperor',
    position: 5,
    upright:
      'İmparator, geçmişte yapı, düzen ve güven hissi verdiğinizi söyler. Kurallar ve hedefler ilişkide omurga olmuş.',
    reversed:
      'Ters İmparator, katı tutumların ve kontrol reflekslerinin iz bıraktığını anlatır. Esneklik eksikliği bugün direnç yaratıyor olabilir.',
    keywords: ['düzen', 'güven', 'kural', 'kontrol', 'esneklik'],
    context:
      'Sağlam çerçeve; zamanla katılaşma riski. Otonomi ve ortak söz hakkı ihtiyacı. Şimdi esnetme ve delege zamanı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_rc_pos5',
    card: 'The Hierophant',
    position: 5,
    upright:
      'Aziz, gelenekler, aile onayı ve ritüellerin ilişkiyi desteklediğini söyler. Değerler kesişimi güven vermiş.',
    reversed:
      'Ters Aziz, norm dayatmaları veya aile etkisinin sorun çıkardığını anlatır. Kalıp baskısı bugün özgünlüğü zorluyor olabilir.',
    keywords: ['gelenek', 'değerler', 'onay', 'ritüel', 'kalıp'],
    context:
      'Değer ortaklığı fakat kalıplar ağır. Dış onay etkisi yüksek. Şimdi özgün anlaşma yazmak gerek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_rc_pos5',
    card: 'The Lovers',
    position: 5,
    upright:
      'Aşıklar, geçmişte güçlü bir değer ve kalp hizası yakaladığınızı söyler. Zor bir seçimi birlikte aşmış olabilirsiniz.',
    reversed:
      'Ters Aşıklar, kararsızlıklar veya üçgen durumların iz bıraktığını anlatır. Uyum arayışı bugüne kadar sarkaç gibi kalmış olabilir.',
    keywords: ['değer', 'seçim', 'uyum', 'sadakat', 'ikilem'],
    context:
      'Derin bağ + kritik seçimler. Zaman zaman ikilik yaşanmış. Şimdi net ve ortak yön gerekiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_rc_pos5',
    card: 'The Chariot',
    position: 5,
    upright:
      'Savaş Arabası, birlikte zorlukları aşma ve hızla ilerleme dönemleriniz olduğunu söyler. Ortak hedef sizi taşımış.',
    reversed:
      'Ters Savaş Arabası, farklı hız/önceliklerin çatışma yarattığını anlatır. Direksiyon savaşları iz bırakmış olabilir.',
    keywords: ['ilerleme', 'hız', 'odak', 'hedef', 'yöntem'],
    context:
      'Güçlü ivme, hız uyumsuzluğu. Yöntem tartışmaları birikmiş. Şimdi ortak tempo şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_rc_pos5',
    card: 'Strength',
    position: 5,
    upright:
      'Güç, zor zamanlarda birbirinize şefkat ve sabırla tutunduğunuzu söyler. Duygu regülasyonu ilişkiyi korumuş.',
    reversed:
      'Ters Güç, tetiklenmeler ve gurur savaşlarının geçmişte yaralar açtığını anlatır. Sabırsız anlar bugünü tetikleyebilir.',
    keywords: ['sabır', 'şefkat', 'regülasyon', 'gurur', 'tetiklenme'],
    context:
      'Şefkatli güç mirası; bazen sertleşen ton. Tolerans eşiği dalgalı. Şimdi nazik güç tazelenmeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_rc_pos5',
    card: 'The Hermit',
    position: 5,
    upright:
      'Ermiş, dönem dönem sağlıklı mesafe ve içe dönüşün ilişkinizi olgunlaştırdığını söyler. Yalnızlık bilgelik getirmiş.',
    reversed:
      'Ters Ermiş, aşırı kapanma ve kaçınmanın iz bıraktığını anlatır. Anlatılmayan ihtiyaçlar bugün yankılanabilir.',
    keywords: ['içe dönüş', 'mesafe', 'bilgelik', 'kaçınma', 'paylaşım'],
    context:
      'Faydalı alan + iletişim eksikleri. İhmal algısı oluşmuş. Şimdi ihtiyaçlar açık ifade edilmeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_rc_pos5',
    card: 'The Wheel of Fortune',
    position: 5,
    upright:
      'Kader Çarkı, ilişki döngülerinde iniş-çıkışları birlikte yaşadığınızı söyler. Değişimle uyum beceriniz var.',
    reversed:
      'Ters Kader Çarkı, aynı tartışmanın farklı zamanlarda tekrarlandığını anlatır. Öğrenilmeyen ders bugüne sızıyor olabilir.',
    keywords: ['döngü', 'zamanlama', 'alışkanlık', 'değişim', 'öğrenme'],
    context:
      'Tekrarlayan örüntüler. Bazen uyum, bazen takılma. Şimdi bilinçli fark yaratma zamanı.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_rc_pos5',
    card: 'Justice',
    position: 5,
    upright:
      'Adalet, geçmişte adil paylaşım ve açık hesabın ilişkinizi güçlendirdiğini söyler. Denge arayışı belirgin.',
    reversed:
      'Ters Adalet, eşitsizlik algısı ve geç telafilerin iz bıraktığını anlatır. Hakkaniyet tartışmaları bugünü etkiliyor olabilir.',
    keywords: ['adalet', 'denge', 'hesap', 'telafi', 'şeffaflık'],
    context:
      'Adil çaba niyeti; pratikte aksamalar. Açık hesap ihtiyacı belirgin. Şimdi telafi ve net çerçeve gerekir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_rc_pos5',
    card: 'The Hanged Man',
    position: 5,
    upright:
      'Asılan Adam, askıya alma ve beklemelerin bazen yeni perspektif kazandırdığını söyler. Sabır size bakış açısı getirmiş.',
    reversed:
      'Ters Asılan Adam, ertelemenin kronikleşip belirsizlik yarattığını anlatır. Kurban anlatıları bugüne taşınmış olabilir.',
    keywords: [
      'bekleme',
      'perspektif',
      'erteleme',
      'fedakârlık',
      'belirsizlik',
    ],
    context:
      'Faydalı duruş + sürünceme riski. Net kararlar gecikmiş. Şimdi askıdan indirme zamanı.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_rc_pos5',
    card: 'Death',
    position: 5,
    upright:
      'Ölüm, birlikte büyük dönüşümlerden geçtiğinizi söyler. Eskiyi bırakma cesareti ilişkinizi yenilemiş.',
    reversed:
      'Ters Ölüm, bitmesi gereken döngülerin uzatıldığını anlatır. Tutunmalar bugün yıpranmayı artırmış olabilir.',
    keywords: ['bitiş', 'dönüşüm', 'yenilenme', 'direnç', 'bırakma'],
    context:
      'Dönüşüm kapasitesi yüksek. Bazı vedalar gecikmiş. Şimdi bilinçli bırakma şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_rc_pos5',
    card: 'Temperance',
    position: 5,
    upright:
      'Denge, uyum ve sentezle krizleri birlikte yumuşattığınızı söyler. Orta yolu sıkça bulmuşsunuz.',
    reversed:
      'Ters Denge, doz kaçan tutumların geçmişte dalgalanma yarattığını anlatır. Sabır kayıpları bugün tetiklenebilir.',
    keywords: ['denge', 'sentez', 'ölçü', 'uyum', 'sabır'],
    context:
      'Orta yol becerisi var. Aşırılık dönemleri iz bırakmış. Şimdi kalibrasyon gerekir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_rc_pos5',
    card: 'The Devil',
    position: 5,
    upright:
      'Şeytan, kıskançlık, kontrol ya da bağımlılık temalarının geçmişte göründüğünü söyler. Bağ güçlü ama bazen bağlayıcı olmuş.',
    reversed:
      'Ters Şeytan, toksik örüntülerden kopma çabasının yarım kaldığını anlatır. Sınırlar bugün yeniden çizilmeli.',
    keywords: ['bağımlılık', 'kıskançlık', 'kontrol', 'sınır', 'gölge'],
    context:
      'Çekim + gölge oyunları. Sınır ihlalleri yaşanmış. Şimdi sağlıklı sınır şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_rc_pos5',
    card: 'The Tower',
    position: 5,
    upright:
      'Kule, geçmişte bir kriz veya sarsıcı gerçeğin her şeyi değiştirdiğini söyler. Yıkım sonrası sadeleşme yaşanmış olabilir.',
    reversed:
      'Ters Kule, küçük çatlakların zamanında onarılmadığını anlatır. Geciken yüzleşmeler bugün yankılanıyor olabilir.',
    keywords: ['kriz', 'gerçek', 'yıkım', 'onarım', 'temel'],
    context:
      'Sarsıcı eşik. Onarım hızı belirleyici olmuş. Şimdi radikal dürüstlük gerekli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_rc_pos5',
    card: 'The Star',
    position: 5,
    upright:
      'Yıldız, bir iyileşme dönemini birlikte taşıdığınızı söyler. Umut, nezaket ve basit adımlar size iyi gelmiş.',
    reversed:
      'Ters Yıldız, umutsuzluk ya da pembe gözlük uçlarının iniş çıkış yarattığını anlatır. Gerçekçi umut terazisi bugün şart.',
    keywords: ['umut', 'şifa', 'sadelik', 'sabır', 'yenilenme'],
    context:
      'Şifa deneyimi var. Gerçekçilik ayarı dalgalı. Şimdi küçük ama net adımlar zamanı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_rc_pos5',
    card: 'The Moon',
    position: 5,
    upright:
      'Ay, belirsizlikler ve sezgisel alanların sık yaşandığını söyler. Korkular konuşulmadığında sis artmış.',
    reversed:
      'Ters Ay, varsayım ve şüphe döngülerinin iz bıraktığını anlatır. Netlik ihtiyacı bugün yakıcı olabilir.',
    keywords: ['belirsizlik', 'korku', 'varsayım', 'sezgi', 'netlik'],
    context:
      'Sisli dönemler. Kanıtsız yorumlar çoğalmış. Şimdi kanıt ve açıklık gerekli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_rc_pos5',
    card: 'The Sun',
    position: 5,
    upright:
      'Güneş, birlikte neşe, oyun ve başarı dönemleri yaşadığınızı söyler. Görünürlük ve takdir bağınızı güçlendirmiş.',
    reversed:
      'Ters Güneş, sahte pozitiflik veya kıyasın zaman zaman gölge yaptığını anlatır. Paylaşılan sevinç azaldığında sızı büyür.',
    keywords: ['neşe', 'takdir', 'görünürlük', 'otantiklik', 'paylaşım'],
    context:
      'Parlak anlar güçlü. Gölge: kıyas/sahte neşe. Şimdi otantik görünürlük önemli.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_rc_pos5',
    card: 'Judgement',
    position: 5,
    upright:
      'Mahkeme, geçmişte bir yüzleşme ve affediş sayfası açtığınızı söyler. Yeniden doğuş hissi gelmiş olabilir.',
    reversed:
      'Ters Mahkeme, kapanmayan dosyaların ve geciken özrün iz bıraktığını anlatır. Telafi bugün hâlâ çağırıyor olabilir.',
    keywords: ['yüzleşme', 'affediş', 'telafi', 'karar', 'yenilenme'],
    context:
      'Hesap zamanı yaşanmış. Bazı başlıklar yarım kalmış. Şimdi adil telafi şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_rc_pos5',
    card: 'The World',
    position: 5,
    upright:
      'Dünya, birlikte bir döngüyü olgun tamamladığınızı söyler. Bütünlük ve yolculuk bilinci gelişmiş.',
    reversed:
      'Ters Dünya, eksik kalan parçaların huzuru kaçırdığını anlatır. Tamamlanmayan işler bugüne sızıyor olabilir.',
    keywords: ['tamamlama', 'bütünlük', 'eşik', 'entegrasyon', 'uzatma'],
    context:
      'Tamamlanmış etaplar + açık uçlar. Entegrasyon ihtiyacı. Şimdi eksikleri kapatma zamanı.',
    group: 'Majör Arkana',
  },

  // CUPS (14)
  {
    id: 'ace_of_cups_rc_pos5',
    card: 'Ace of Cups',
    position: 5,
    upright:
      'Kupa Ası, ilişkinizin başında yoğun bir duygusal açılma yaşandığını söyler. Kalpler hızla bağ kurmuş.',
    reversed:
      'Ters Kupa Ası, duyguların bir noktada tıkandığını anlatır. Bastırılan hisler bugün mesafe yaratıyor olabilir.',
    keywords: ['duygu', 'açılma', 'kırılganlık', 'tıkanma', 'yakınlık'],
    context:
      'Erken duygusal patlama. Zamanla akış kesilmiş. Şimdi güvenli ifade kanalı gerekli.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_rc_pos5',
    card: 'Two of Cups',
    position: 5,
    upright:
      'İki Kupa, karşılıklılığın ve eşitliğin başta güçlü olduğunu söyler. Birliktelik hissi sizi beslemiş.',
    reversed:
      'Ters İki Kupa, jest–emek dengesinin dönem dönem bozulduğunu anlatır. Küçük ihmaller kırgınlık biriktirmiş olabilir.',
    keywords: ['karşılıklılık', 'denge', 'bağ', 'jest', 'ihmal'],
    context:
      'Güçlü eşleşme. Mikro dengesizlikler birikmiş. Şimdi adil alışveriş konuşulmalı.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_rc_pos5',
    card: 'Three of Cups',
    position: 5,
    upright:
      'Üç Kupa, arkadaşlık ve kutlama enerjisinin ilişkinizi canlı tuttuğunu söyler. Sosyal çevre destek olmuş.',
    reversed:
      'Ters Üç Kupa, üçüncü kişi/kalabalık etkilerinin zaman zaman mesafe yarattığını anlatır. Mahremiyet ihtiyacı görünmez kalmış olabilir.',
    keywords: ['arkadaşlık', 'kutlama', 'topluluk', 'mahremiyet', 'kıskançlık'],
    context:
      'Sosyal destek yüksek. Mahremiyet dengesiz kalmış. Şimdi ikinize ait ritüel kurun.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_rc_pos5',
    card: 'Four of Cups',
    position: 5,
    upright:
      'Dört Kupa, dönem dönem ilgisizlik ya da doyumsuzluk döngüleri yaşandığını söyler. Şükran unutulunca renk solar.',
    reversed:
      'Ters Dört Kupa, fırsatları görmezden gelmenin iz bırakığını anlatır. Apati bugüne yansımış olabilir.',
    keywords: ['ilgisizlik', 'doyum', 'şükran', 'fırsat', 'apatik'],
    context:
      'Duygusal durgunluk anları. Takdir görünürlüğü düşük. Şimdi minik takdir ritimleri şart.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_rc_pos5',
    card: 'Five of Cups',
    position: 5,
    upright:
      'Beş Kupa, geçmişte bir kayıp veya hayal kırıklığı yaşandığını söyler. Yas süreci bağınızı test etmiş.',
    reversed:
      'Ters Beş Kupa, affediş gecikince kırgınlığın kaldığını anlatır. Bugün hâlâ hassas noktalar olabilir.',
    keywords: ['yas', 'kayıp', 'kırgınlık', 'affediş', 'toparlanma'],
    context:
      'Zor bir duygu dönemi. Bir kısmı onarılmış, bir kısmı canlı. Şimdi nazik kapanış gerek.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_rc_pos5',
    card: 'Six of Cups',
    position: 5,
    upright:
      'Altı Kupa, tatlı anılar ve saf bağın sıkça anıldığını söyler. Nostalji sizi birleştirmiş.',
    reversed:
      'Ters Altı Kupa, geçmişe aşırı tutunmanın şimdiyi gölgelediğini anlatır. Çocukluk örüntüleri tetikleyici olabilir.',
    keywords: ['nostalji', 'masumiyet', 'geçmiş', 'örüntü', 'şimdi'],
    context:
      'Güzel anılar güçlü. Geçmiş idealizasyonu fazla. Şimdi bugünü kurmak gerek.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_rc_pos5',
    card: 'Seven of Cups',
    position: 5,
    upright:
      'Yedi Kupa, hayallerin bol olduğunu söyler. Ancak bazıları gerçekçi plana bağlanmamış.',
    reversed:
      'Ters Yedi Kupa, belirsiz beklentilerin hayal kırıklığına döndüğünü anlatır. Seçenek bolluğu kararı zorlamış olabilir.',
    keywords: ['hayal', 'seçenek', 'beklenti', 'gerçek', 'karar'],
    context:
      'Yaratıcı düşler + plan eksikleri. Sisli hedefler birikmiş. Şimdi kriter ve seçim lazım.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_rc_pos5',
    card: 'Eight of Cups',
    position: 5,
    upright:
      'Sekiz Kupa, bir dönem uzaklaşıp sonra yeniden yaklaşmaları söyler. Anlam arayışı yaşanmış.',
    reversed:
      'Ters Sekiz Kupa, kal–git sarkacının yorduğunu anlatır. Kapanışsızlık bugün güvensizlik yaratıyor olabilir.',
    keywords: ['uzaklaşma', 'anlam', 'ikilem', 'dönüş', 'kapanış'],
    context:
      'Arayış dönemleri. Net cümleler eksik kalmış. Şimdi yön ve niyet netleşmeli.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_rc_pos5',
    card: 'Nine of Cups',
    position: 5,
    upright:
      'Dokuz Kupa, birlikte keyif ve tatmin anlarının çok olduğunu söyler. Küçük zevkler bağı beslemiş.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel haz dönemlerinin derin ihtiyaçları örttüğünü anlatır. Doyum kısa sürmüş olabilir.',
    keywords: ['tatmin', 'keyif', 'haz', 'derinlik', 'paylaşım'],
    context:
      'Paylaşılan mutluluklar güzel. Derin ihtiyaçlar konuşulmamış yerler var. Şimdi derin bağ konuşması gerek.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_rc_pos5',
    card: 'Ten of Cups',
    position: 5,
    upright:
      'On Kupa, aile/ev hayali veya huzurlu bir dönem yaşadığınızı söyler. Uyum duygusu yüksekmiş.',
    reversed:
      'Ters On Kupa, ideal resim baskısının gerçek ihtiyaçları susturduğunu anlatır. Sahne ile kulis ayrışmış olabilir.',
    keywords: ['aile', 'uyum', 'ideal', 'gerçek', 'huzur'],
    context:
      'Güzel uyum anları. İdeal baskısı yormuş. Şimdi otantik gündem şart.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_rc_pos5',
    card: 'Page of Cups',
    position: 5,
    upright:
      'Kupa Prensi, naif jestler ve yaratıcı duygusallığın ilk zamanlarda bol olduğunu söyler. Masumiyet bağ kurmuş.',
    reversed:
      'Ters Kupa Prensi, alınganlık ve pasif–agresif sızıntıların iz bıraktığını anlatır. Duygusal olgunluk dalgalanmış olabilir.',
    keywords: ['naiflik', 'jest', 'alınganlık', 'ifade', 'olgunluk'],
    context:
      'Tatlı jestler; bazen çocukça tepkiler. Yetişkin dil ihtiyacı belirgin. Şimdi açık talep cümleleri gerek.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_rc_pos5',
    card: 'Knight of Cups',
    position: 5,
    upright:
      'Kupa Şövalyesi, romantik hamlelerin ilişkinizi taşıdığını söyler. Jestler kalpleri yumuşatmış.',
    reversed:
      'Ters Kupa Şövalyesi, söz–eylem tutarsızlığının dönem dönem hayal kırıklığı doğurduğunu anlatır.',
    keywords: ['romantizm', 'jest', 'tutarlılık', 'ideal', 'pratik'],
    context:
      'Romantizm güçlü. Sürdürülebilirlik dalgalı. Şimdi az-öz, düzenli adım önemli.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_rc_pos5',
    card: 'Queen of Cups',
    position: 5,
    upright:
      'Kupa Kraliçesi, derin empati ve şefkatin ilişkinizin omurgası olduğunu söyler. Duygusal güvenlik alanı oluşmuş.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal manipülasyon veya sınır erimesinin iz bıraktığını anlatır.',
    keywords: ['empati', 'şefkat', 'sınır', 'güven', 'bakım'],
    context:
      'Yüksek empati; sınır bulanıklığı riski. Öz bakım eksik kalmış. Şimdi net sınır + nazik dil şart.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_rc_pos5',
    card: 'King of Cups',
    position: 5,
    upright:
      'Kupa Kralı, duyguyu olgun ve sakin taşıdığınız dönemleri söyler. Fırtınada liman olmuşsunuz.',
    reversed:
      'Ters Kupa Kralı, pasif–agresif dalgalar veya bastırılmış öfkenin iz bıraktığını anlatır.',
    keywords: ['sükunet', 'olgunluk', 'ifade', 'pasif agresif', 'denge'],
    context:
      'Olgun duygusal liderlik. Bazı duygular gizlenmiş. Şimdi adlandırıp paylaşmak gerek.',
    group: 'Kupalar',
  },

  // SWORDS (14)
  {
    id: 'ace_of_swords_rc_pos5',
    card: 'Ace of Swords',
    position: 5,
    upright:
      'Kılıç Ası, net konuşmaların ilişki yönünü belirlediğini söyler. Gerçekler dürüstçe dile gelmiş.',
    reversed:
      'Ters Kılıç Ası, bilgi kirliliği veya keskin üslubun yaralar açtığını anlatır. Yarım doğrular iz bırakmış olabilir.',
    keywords: ['netlik', 'gerçek', 'iletişim', 'üslup', 'karar'],
    context:
      'Net çıkışlar değerli. Ton/bağlam yer yer sert. Şimdi nazik netlik gerekli.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_rc_pos5',
    card: 'Two of Swords',
    position: 5,
    upright:
      'İki Kılıç, kritik anlarda karar kaçınmalarının yaşandığını söyler. Askıda kalan konular olmuş.',
    reversed:
      'Ters İki Kılıç, ertelemenin patlamalara zemin hazırladığını anlatır. Kör noktalar bugün de tetikleyici olabilir.',
    keywords: ['kararsızlık', 'kaçınma', 'askı', 'yüzleşme', 'denge'],
    context:
      'Askıda dosyalar birikmiş. Küçük kararlar gecikmiş. Şimdi net bir seçim şart.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_rc_pos5',
    card: 'Three of Swords',
    position: 5,
    upright:
      'Üç Kılıç, geçmişte bir kırgınlık/ihanet temasını söyler. Sözler keskinleşmiş olabilir.',
    reversed:
      'Ters Üç Kılıç, acının konuşulmadan bırakıldığını anlatır. Onarım çağrısı bugün de sürüyor.',
    keywords: ['kırgınlık', 'ihanet', 'acı', 'onarım', 'özür'],
    context:
      'Kırıcı bir dönem. Üslup ve güven yaraları. Şimdi özür + onarım planı gerekir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_rc_pos5',
    card: 'Four of Swords',
    position: 5,
    upright:
      'Dört Kılıç, mola ve sakinleşme alışkanlığınızın işe yaradığını söyler. Ara vermek iletişimi korumuş.',
    reversed:
      'Ters Dört Kılıç, dinlenmeyi erteleyip yorgun tartışmalar yaptığınızı anlatır.',
    keywords: ['mola', 'sükunet', 'dinlenme', 'ritim', 'iyileşme'],
    context:
      'Faydalı duraklar var. Bazen ihmal edilmiş. Şimdi molayı sistemleştirin.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_rc_pos5',
    card: 'Five of Swords',
    position: 5,
    upright:
      'Beş Kılıç, haklı çıkma savaşlarının yaşandığını söyler. Zafer pahalıya mal olmuş.',
    reversed:
      'Ters Beş Kılıç, alay/sarkazmın köprüleri yaktığını anlatır. Yüz kurtarma refleksi iz bırakmış olabilir.',
    keywords: ['ego', 'zafer', 'maliyet', 'uzlaşı', 'saygı'],
    context:
      'Ego çarpışmaları. Saygı yıpranmış. Şimdi uzlaşı ve geri çekilme cesareti gerek.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_rc_pos5',
    card: 'Six of Swords',
    position: 5,
    upright:
      'Altı Kılıç, zor sudan birlikte daha sakin sulara geçtiğinizi söyler. Planlı geçişler işe yaramış.',
    reversed:
      'Ters Altı Kılıç, eski kalıplara dönüşlerin yaşandığını anlatır. Adaptasyon eksik kalmış olabilir.',
    keywords: ['geçiş', 'plan', 'sakinlik', 'adaptasyon', 'yöntem'],
    context:
      'Başarılı geçişler + geri dönüşler. Yöntem konuşmaları şart. Şimdi köprü planı yapın.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_rc_pos5',
    card: 'Seven of Swords',
    position: 5,
    upright:
      'Yedi Kılıç, eksik bilgi ya da saklama temalarının yaşandığını söyler. Şeffaflık sınanmış.',
    reversed:
      'Ters Yedi Kılıç, itirafların geç geldiğini anlatır. Parça parça doğrular güveni yormuş olabilir.',
    keywords: ['şeffaflık', 'saklama', 'güven', 'itiraf', 'etik'],
    context:
      'Bilgi şeffaflığı zayıf anlar. Güven kırıkları oluşmuş. Şimdi tam ve zamanında paylaşım gerek.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_rc_pos5',
    card: 'Eight of Swords',
    position: 5,
    upright:
      'Sekiz Kılıç, zihinsel korkuların iletişimi daralttığını söyler. Kapı açıkken kapalı sanılmış.',
    reversed:
      'Ters Sekiz Kılıç, yardım istememenin kalıplaştığını anlatır. İnançlar gerçeğin önüne geçmiş olabilir.',
    keywords: ['korku', 'öz kısıt', 'yardım', 'gerçeklik', 'özgürleşme'],
    context:
      'Korku odaklı dönemler. Gerçeklik testi az yapılmış. Şimdi kanıt ve destek şart.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_rc_pos5',
    card: 'Nine of Swords',
    position: 5,
    upright:
      'Dokuz Kılıç, uykusuz geceler ve kaygı dilinin yaşandığını söyler. Zihin senaryoları ilişkiye taşmış.',
    reversed:
      'Ters Dokuz Kılıç, regülasyonsuz kaygının bugüne de sızdığını anlatır. Paylaşılmayan korkular birikmiş olabilir.',
    keywords: ['kaygı', 'kuruntu', 'regülasyon', 'paylaşım', 'gerçek'],
    context:
      'Yüksek anksiyete. İletişime etkisi büyük. Şimdi kanıtla konuşma ve sakinleşme pratiği gerek.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_rc_pos5',
    card: 'Ten of Swords',
    position: 5,
    upright:
      'On Kılıç, bir tükeniş veya bitiş eşiğinin yaşandığını söyler. Sonrasında toparlanma şansı doğmuş olabilir.',
    reversed:
      'Ters On Kılıç, kapanışların yarım bırakıldığını anlatır. Eski yöntem bugün de yük olabilir.',
    keywords: ['bitiş', 'tükeniş', 'kapanış', 'yeniden doğuş', 'vedalaşma'],
    context:
      'Kritik eşik atlanmış. Bir kısmı tamamlanmış, bir kısmı açık. Şimdi temiz kapanış gerekli.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_rc_pos5',
    card: 'Page of Swords',
    position: 5,
    upright:
      'Kılıç Prensi, merak ve soru sorma kültürünün ilişkide yer tuttuğunu söyler. Öğrenme isteği güçlüymüş.',
    reversed:
      'Ters Kılıç Prensi, dedikodu/kanıtsız çıkarımların sorun yarattığını anlatır.',
    keywords: ['merak', 'soru', 'öğrenme', 'kanıt', 'dedikodu'],
    context:
      'Canlı merak; doğrulama eksikleri. Savunma tetiği yükselmiş. Şimdi nazik merak ve kanıt şart.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_rc_pos5',
    card: 'Knight of Swords',
    position: 5,
    upright:
      'Kılıç Şövalyesi, hızlı ve direkt çıkışların sık olduğunu söyler. Hız bazen kalbi ezmiş.',
    reversed:
      'Ters Kılıç Şövalyesi, ültimatom ve sert tonun iz bıraktığını anlatır.',
    keywords: ['hız', 'sertlik', 'doğrudanlık', 'ton', 'geri tepme'],
    context:
      'Hızlı tartışmalar. Ton yönetimi zayıf. Şimdi yavaşlatma ve yumuşatma gerek.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_rc_pos5',
    card: 'Queen of Swords',
    position: 5,
    upright:
      'Kılıç Kraliçesi, netlik ve sınırın ilişkiye ferahlık verdiğini söyler. Nesnellik çoğu yerde işe yaramış.',
    reversed:
      'Ters Kılıç Kraliçesi, şefkatsiz netliğin soğukluk bıraktığını anlatır. Sarkazm iz bırakmış olabilir.',
    keywords: ['netlik', 'sınır', 'nesnellik', 'şefkat', 'üslup'],
    context:
      'Temiz sınırlar + üslup riski. Kalp–akıl dengesi gerek. Şimdi nazik netlik zamanı.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_rc_pos5',
    card: 'King of Swords',
    position: 5,
    upright:
      'Kılıç Kralı, strateji ve ilke duygusunun krizleri yönettiğini söyler. Akıl pusula olmuş.',
    reversed:
      'Ters Kılıç Kralı, dogmatik tavrın sıcaklığı azalttığını anlatır. Kuralcı dil iz bırakmış olabilir.',
    keywords: ['ilke', 'strateji', 'kural', 'empati', 'otorite'],
    context:
      'Güçlü akıl; empati eksikleri. Gri alanlar sert kesilmiş. Şimdi ilke + merhamet gerekir.',
    group: 'Kılıçlar',
  },

  // WANDS (14)
  {
    id: 'ace_of_wands_rc_pos5',
    card: 'Ace of Wands',
    position: 5,
    upright:
      'Değnek Ası, tutku ve motivasyonun başlarda çok güçlü olduğunu söyler. Kıvılcım hızla büyümüş.',
    reversed:
      'Ters Değnek Ası, heves düşüşleri ve yarım kalan girişimlerin iz bıraktığını anlatır.',
    keywords: ['kıvılcım', 'tutku', 'motivasyon', 'başlangıç', 'süreklilik'],
    context:
      'Yüksek ateş, ritim dalgası. Bitiricilik eksikleri olmuş. Şimdi sürdürülebilir tempo gerekli.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_rc_pos5',
    card: 'Two of Wands',
    position: 5,
    upright:
      'İki Değnek, ortak vizyon ve plan konuşmalarınızın ilişkide yer tuttuğunu söyler. Ufuk açılmış.',
    reversed:
      'Ters İki Değnek, plan–icra arasındaki boşlukların hayal kırıklığı yarattığını anlatır.',
    keywords: ['vizyon', 'plan', 'risk', 'ufuk', 'karar'],
    context:
      'Güzel ufuk; adım eksikleri. Cesaret/plan dengesiz. Şimdi pilot adım şart.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_rc_pos5',
    card: 'Three of Wands',
    position: 5,
    upright:
      'Üç Değnek, birlikte büyüme ve genişleme isteğini söyler. Beklentiler netleşmiş.',
    reversed:
      'Ters Üç Değnek, senkron sorunları ve gecikmelerin iz bıraktığını anlatır.',
    keywords: ['genişleme', 'beklenti', 'zamanlama', 'senkron', 'ufuk'],
    context:
      'Büyüme arzusu var. Koordinasyon aksaklıkları olmuş. Şimdi rol–zaman uyumu gerek.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_rc_pos5',
    card: 'Four of Wands',
    position: 5,
    upright:
      'Dört Değnek, kutlamalar, eşikler ve aidiyet anlarının güçlü olduğunu söyler. Ev hissi kurulmuş.',
    reversed:
      'Ters Dört Değnek, temeller güçlenmeden törene koşulduğunu anlatır. Sıra karışınca hayal kırıklığı doğmuş olabilir.',
    keywords: ['eşik', 'kutlama', 'aidiyet', 'temel', 'ev'],
    context:
      'Güzel eşik anları. Temel işleri atlama riski. Şimdi önce temel, sonra tören.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_rc_pos5',
    card: 'Five of Wands',
    position: 5,
    upright:
      'Beş Değnek, yapıcı rekabet ve fikir çarpışmalarının olduğunu söyler. Enerji canlıymış.',
    reversed:
      'Ters Beş Değnek, kuralsız tartışmaların verimi düşürdüğünü anlatır. Gürültü iz bırakmış olabilir.',
    keywords: ['çatışma', 'rekabet', 'kural', 'enerji', 'verim'],
    context:
      'Canlı fikir akışı. Çerçeve eksikliği yormuş. Şimdi kurallı diyalog gerekli.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_rc_pos5',
    card: 'Six of Wands',
    position: 5,
    upright:
      'Altı Değnek, başarıların birlikte kutlandığını söyler. Takdir bağı güçlendirmiş.',
    reversed:
      'Ters Altı Değnek, görünmeyen emeğin görülmemesinin kırgınlık bıraktığını anlatır.',
    keywords: ['takdir', 'başarı', 'görünürlük', 'emek', 'motivasyon'],
    context:
      'Zaferler paylaşılmış. Adil takdir her zaman olmamış. Şimdi emeği görünür kılın.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_rc_pos5',
    card: 'Seven of Wands',
    position: 5,
    upright:
      'Yedi Değnek, dış baskılara karşı birlikte savunma hattı kurduğunuzu söyler. Birbirinizi kollamışsınız.',
    reversed:
      'Ters Yedi Değnek, sürekli savunmanın içeride gerilim yarattığını anlatır. Yardım reddi iz bırakmış olabilir.',
    keywords: ['savunma', 'sınır', 'baskı', 'destek', 'direnç'],
    context:
      'Birlikte dışa karşı güç. İçeride yorulma olmuş. Şimdi yumuşak savunma ve destek şart.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_rc_pos5',
    card: 'Eight of Wands',
    position: 5,
    upright:
      'Sekiz Değnek, hızlı iletişim ve çabuk karar dönemlerini söyler. Mesaj akışı yoğundu.',
    reversed:
      'Ters Sekiz Değnek, karmaşık kanallar ve gecikmelerin yanlış anlamalara yol açtığını anlatır.',
    keywords: ['hız', 'iletişim', 'akış', 'sıra', 'senkron'],
    context:
      'Hızlı akış; düzen az. Karışıklık iz bırakmış. Şimdi tek kanal ve net sıra lazım.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_rc_pos5',
    card: 'Nine of Wands',
    position: 5,
    upright:
      'Dokuz Değnek, yorulsanız da vazgeçmediğinizi söyler. Dayanıklılık bağınızı korumuş.',
    reversed:
      'Ters Dokuz Değnek, tetikte yaşamanın yıprattığını anlatır. Eski yaralar şimdiye taşınmış olabilir.',
    keywords: ['dayanıklılık', 'yorgunluk', 'tetik', 'mola', 'koruma'],
    context: 'Direnç güçlü. Tetik sürekli açık kalmış. Şimdi mola kuralı şart.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_rc_pos5',
    card: 'Ten of Wands',
    position: 5,
    upright:
      'On Değnek, fazla yükü sırtlanıp ilerlediğinizi söyler. Sorumluluk çokmuş.',
    reversed:
      'Ters On Değnek, delege eksikliği ve tükenişin iz bıraktığını anlatır.',
    keywords: ['yük', 'delege', 'tükeniş', 'sorumluluk', 'sadelik'],
    context:
      'Ağır yükler taşınmış. Yorgunluk birikmiş. Şimdi bırakma ve paylaşma zamanı.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_rc_pos5',
    card: 'Page of Wands',
    position: 5,
    upright:
      'Değnek Prensi, keşif ve heves dönemlerinin çok olduğunu söyler. Birlikte yeni şeyler denemişsiniz.',
    reversed:
      'Ters Değnek Prensi, yarım kalan projelerin güveni yorduğunu anlatır.',
    keywords: ['keşif', 'heves', 'odak', 'bitiricilik', 'deneme'],
    context:
      'Yaratıcı başlangıçlar. Bitirme oranı düşük kalmış. Şimdi mini sprintler gerek.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_rc_pos5',
    card: 'Knight of Wands',
    position: 5,
    upright:
      'Değnek Şövalyesi, cesur hamleler ve macera ruhu dönemlerini söyler. Enerji yüksekmiş.',
    reversed:
      'Ters Değnek Şövalyesi, dengesiz ivme ve yarıda bırakmaların iz bıraktığını anlatır.',
    keywords: ['cesaret', 'hız', 'ivme', 'risk', 'süreklilik'],
    context:
      'Atak enerji; ritim tutarsız. Taahhüt mimarisi eksik. Şimdi ritim sözleşmesi lazım.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_rc_pos5',
    card: 'Queen of Wands',
    position: 5,
    upright:
      'Değnek Kraliçesi, karizma ve sıcak liderliğin ilişkiyi canlandırdığını söyler. İlham vermişsiniz.',
    reversed:
      'Ters Değnek Kraliçesi, görünürlük/kıyas gölgelerinin zaman zaman gerilim yarattığını anlatır.',
    keywords: ['karizma', 'ilham', 'görünürlük', 'kıyas', 'özgüven'],
    context:
      'İlham verici dönemler. Kıyas tetikleri oluşmuş. Şimdi başarıyı ortak etmek gerek.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_rc_pos5',
    card: 'King of Wands',
    position: 5,
    upright:
      'Değnek Kralı, vizyoner tavrın yön verdiğini söyler. Liderlik ilişkiyi taşıdı.',
    reversed:
      'Ters Değnek Kralı, tek merkezli kararların zaman zaman çatışma doğurduğunu anlatır.',
    keywords: ['vizyon', 'liderlik', 'yetki', 'katılım', 'ego'],
    context:
      'Güçlü vizyon. Katılım eksik kalmış. Şimdi yetki paylaşımı önemli.',
    group: 'Asalar',
  },

  // PENTACLES (14)
  {
    id: 'ace_of_pentacles_rc_pos5',
    card: 'Ace of Pentacles',
    position: 5,
    upright:
      'Tılsım Ası, somut bir başlangıç/fırsatın ilişkiye güven verdiğini söyler. Temel atılmış.',
    reversed:
      'Ters Tılsım Ası, fırsatların planlanmadığını ve boşa aktığını anlatır.',
    keywords: ['fırsat', 'temel', 'güvence', 'plan', 'somut adım'],
    context:
      'Güzel tohumlar ekilmiş. Plan eksikleri olmuş. Şimdi küçük somut adımlar gerekli.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_rc_pos5',
    card: 'Two of Pentacles',
    position: 5,
    upright:
      'İki Tılsım, zaman/enerji/bütçe dengelemesini çoğu zaman başardığınızı söyler. Esneklik yüksekmiş.',
    reversed:
      'Ters İki Tılsım, dağınıklık ve ertelemenin krizlere yol açtığını anlatır.',
    keywords: ['denge', 'zaman', 'öncelik', 'esneklik', 'program'],
    context:
      'Esnek yönetim iyi; bazen savrulma. Son dakika stresleri yaşanmış. Şimdi sade ajanda gerekli.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_rc_pos5',
    card: 'Three of Pentacles',
    position: 5,
    upright:
      'Üç Tılsım, işbirliği ve rol netliğinin birçok sorunu çözdüğünü söyler. Birlikte üretmişsiniz.',
    reversed:
      'Ters Üç Tılsım, görünmez emeğin görülmemesi ve kalite standardı eksikliğini anlatır.',
    keywords: ['işbirliği', 'rol', 'kalite', 'takdir', 'koordinasyon'],
    context:
      'Güzel işbirliği; takdir/standart açığı. Şimdi anlaşma yazısı ve görünür teşekkür gerekir.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_rc_pos5',
    card: 'Four of Pentacles',
    position: 5,
    upright:
      'Dört Tılsım, güvenlik ve kaynak koruma refleksinin güçlü olduğunu söyler. Maddi/duygusal tutuş yüksekmiş.',
    reversed:
      'Ters Dört Tılsım, aşırı kontrol veya cimriliğin sıcaklığı azalttığını anlatır.',
    keywords: ['güvenlik', 'kontrol', 'paylaşım', 'tutma', 'şeffaflık'],
    context:
      'Güvence arayışı kuvvetli. Esneklik azalmış. Şimdi açık bütçe ve paylaşım şart.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_rc_pos5',
    card: 'Five of Pentacles',
    position: 5,
    upright:
      'Beş Tılsım, bir yoksunluk/soğuk döneminden birlikte geçtiğinizi söyler. Dayanışma sınanmış.',
    reversed:
      'Ters Beş Tılsım, yardım istememe ve yalnız savaşma kalıplarını anlatır.',
    keywords: ['kıtlık', 'yardım', 'dayanışma', 'dışlanmışlık', 'moral'],
    context:
      'Zor ekonomik/duygusal dönem. Kapı çalınmamış anlar var. Şimdi destek mekanizması kurun.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_rc_pos5',
    card: 'Six of Pentacles',
    position: 5,
    upright:
      'Altı Tılsım, cömertlik ve paylaşımın ilişkiye iyi geldiğini söyler. Denge gözetilmiş.',
    reversed:
      'Ters Altı Tılsım, koşullu yardım ve skor tutmanın iz bıraktığını anlatır.',
    keywords: ['paylaşım', 'adalet', 'güç', 'koşul', 'eşitlik'],
    context:
      'Güzel paylaşım niyeti. Koşul ve beklenti anları kırmış. Şimdi şeffaf ve gönüllü paylaşım gerekli.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_rc_pos5',
    card: 'Seven of Pentacles',
    position: 5,
    upright:
      'Yedi Tılsım, sabırla emek verip sonuç aldığınızı söyler. Ölçme–öğrenme kültürü oluşmuş.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık ya da batık maliyete inadın yıprattığını anlatır.',
    keywords: ['sabır', 'verim', 'ölçüm', 'hasat', 'pivot'],
    context:
      'Emek ve bekleme dengesi. Zaman zaman yanlış ısrar. Şimdi gösterge ve pivot lazım.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_rc_pos5',
    card: 'Eight of Pentacles',
    position: 5,
    upright:
      'Sekiz Tılsım, birlikte beceri ve ilişki zanaatine yatırım yaptığınızı söyler. Küçük iyileştirmeler çok şey kazandırmış.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik ve otomatik pilotun iz bıraktığını anlatır.',
    keywords: ['ustalık', 'pratik', 'özen', 'kalite', 'odak'],
    context:
      'Bilinçli pratik değerli. Bazen kalite dalgası düşmüş. Şimdi düzenli ince ayar gerekli.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_rc_pos5',
    card: 'Nine of Pentacles',
    position: 5,
    upright:
      'Dokuz Tılsım, bağımsızlık ve kişisel konforun sağlıklı paylaşıldığını söyler. Alan birbirinize iyi gelmiş.',
    reversed:
      'Ters Dokuz Tılsım, aşırı konfor/tek başınalık vurgusunun mesafe yarattığını anlatır.',
    keywords: ['bağımsızlık', 'konfor', 'alan', 'paylaşım', 'denge'],
    context:
      'Alan dengesi güzel; bazen fazla olmuş. Ortak konfor artırılmalı. Şimdi alan/birlikte zaman protokolü.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_rc_pos5',
    card: 'Ten of Pentacles',
    position: 5,
    upright:
      'On Tılsım, aile/sistem ve uzun vade planlarının ilişkiye güven verdiğini söyler. Köklülük hissi oluşmuş.',
    reversed:
      'Ters On Tılsım, aile içi dinamikler veya para meselelerinin gerilim yarattığını anlatır.',
    keywords: ['aile', 'sistem', 'miras', 'güvence', 'sınır'],
    context:
      'Köklü planlar var. Dış ailenin etkisi yüksek. Şimdi sınır ve rol netleştirme gerek.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_rc_pos5',
    card: 'Page of Pentacles',
    position: 5,
    upright:
      'Tılsım Prensi, öğrenme ve küçük somut hedeflerin ilişkiye ivme verdiğini söyler. Çırak zihin fayda sağlamış.',
    reversed:
      'Ters Tılsım Prensi, oyalanma ve dağınık odakla fırsatların kaçtığını anlatır.',
    keywords: ['öğrenme', 'hedef', 'disiplin', 'başlangıç', 'somutluk'],
    context:
      'Küçük hedefler işe yaradı. Dağınıklık dönemleri yordu. Şimdi mini görev–tarih sistemi lazım.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_rc_pos5',
    card: 'Knight of Pentacles',
    position: 5,
    upright:
      'Tılsım Şövalyesi, güvenilir ritim ve istikrarın en büyük gücünüz olduğunu söyler. Yavaş ama emin adımlar atılmış.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık ve inatın zaman zaman ilerlemeyi kestiğini anlatır.',
    keywords: ['istikrar', 'rutin', 'güvenilirlik', 'yavaşlık', 'ilerleme'],
    context:
      'Sağlam rutin; bazen durağan. Küçük iyileştirme ihtiyacı. Şimdi mikro upgrade’ler şart.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_rc_pos5',
    card: 'Queen of Pentacles',
    position: 5,
    upright:
      'Tılsım Kraliçesi, pratik bakım ve görünmez emeğin yuvayı sıcak tuttuğunu söyler. Sahiplenici bir şefkat varmış.',
    reversed:
      'Ters Tılsım Kraliçesi, öz bakım ihmalinin tükenişe yol açtığını anlatır.',
    keywords: ['bakım', 'pratiklik', 'öz bakım', 'kaynak', 'yuva'],
    context:
      'Güçlü bakım emeği. Kendi kaynaklar tüketilmiş. Şimdi paylaşım ve dinlenme gerekli.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_rc_pos5',
    card: 'King of Pentacles',
    position: 5,
    upright:
      'Tılsım Kralı, maddi/duygusal güvence sağlamanın ilişkiye huzur verdiğini söyler. Kaynak yönetimi güçlüymüş.',
    reversed:
      'Ters Tılsım Kralı, kontrol ve statü dilinin sıcaklığı düşürdüğünü anlatır.',
    keywords: ['güvence', 'kaynak', 'kontrol', 'statü', 'esneklik'],
    context:
      'Güçlü güvence; esneklik zaman zaman az. Yetki paylaşımı önemli. Şimdi şeffaf plan ve yumuşak liderlik gerekir.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 5 anlamını bulma fonksiyonu
export const getposition5Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return position5Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipProblemsposition5Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return getposition5Meaning(cardName);
};

// Kart adına göre pozisyon 5 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipProblemsposition5MeaningByCardName = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  const meaning = getposition5Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 5 anlamlarını alma fonksiyonu
export const getAllposition5Meanings =
  (): RelationshipProblemsPositionMeaning[] => {
    return position5Meanings;
  };

// pozisyon 5 anlamlarını filtreleme fonksiyonu
export const getposition5MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return position5Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 5 anlamlarını arama
export const searchposition5MeaningsByKeyword = (
  keyword: string
): RelationshipProblemsPositionMeaning[] => {
  return position5Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position5Meanings,
  getposition5Meaning,
  getAllposition5Meanings,
  getposition5MeaningsByGroup,
  searchposition5MeaningsByKeyword,
};
