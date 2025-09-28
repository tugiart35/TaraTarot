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

// import { getRelationshipProblemsMeaningByCardAndPositionMeaning } from './position-meanings-index';
import { RelationshipProblemsPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position8Meanings: RelationshipProblemsPositionMeaning[] = [
  // MAJÖR ARKANA
  // RELATIONSHIP CONFLICT — Pozisyon 8: 'İlişkimizi etkileyen maddi sorunlar var mı?'
  // MAJOR ARCANA (22)
  {
    id: 'the_fool_rc_pos8',
    card: 'The Fool',
    position: 8,
    upright:
      'Joker, finansal alanda yeni başlangıçlar, risk alma ve deneme cesaretini gösterir. Doğru yönetilirse fırsat; plansızsa ilişki bütçesinde stres yaratır.',
    reversed:
      'Ters Joker, fevri harcamalar, düşünmeden borçlanma ve “sonra bakarız” tavrının ortak düzeni bozduğunu anlatır. Hesapsız özgürlük, ortak güveni sarsar.',
    keywords: ['risk', 'başlangıç', 'hesapsızlık', 'özgürlük', 'bütçe'],
    context:
      'Maddi alanda plansız girişimler ilişki dengesini etkiliyor; riskler konuşulup sınır çizilmeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_rc_pos8',
    card: 'The Magician',
    position: 8,
    upright:
      'Büyücü, yetenek ve kaynakları akıllıca birleştirerek gelir yaratma becerisini vurgular. Doğru iletişim ve odak, bütçeyi büyütebilir.',
    reversed:
      'Ters Büyücü, şişirilmiş sözler, kandırıcı teklifler ve “kolay para” masallarına karşı uyarır. Algı oyunları ortak kasayı riske atar.',
    keywords: ['beceri', 'kaynak', 'gelir', 'manipülasyon', 'odak'],
    context:
      'Para akışı için yetenekleri şeffaf planla kullanın; mucize vaatlerden uzak durun.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_rc_pos8',
    card: 'The High Priestess',
    position: 8,
    upright:
      'Başrahibe, görünmeyen masraflar ve sezgisel kaygıları işaret eder. Parada sessizlik bazen korur ama gizlemek güvensizlik doğurur.',
    reversed:
      'Ters Başrahibe, saklanan hesaplar, gizli borçlar ya da paylaşılmayan finans kararlarının ilişkiyi içten içe yorduğunu söyler.',
    keywords: ['gizli masraf', 'sezgi', 'şeffaflık', 'borç', 'güven'],
    context:
      'Parasal konularda gizlilik yerine ölçülü açıklık ve net kayıtlar gerekli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_rc_pos8',
    card: 'The Empress',
    position: 8,
    upright:
      'İmparatoriçe, bereket, konfor ve ihtiyaçların karşılanmasını anlatır. Akıllı bakım ve üretkenlik, maddi huzuru besler.',
    reversed:
      'Ters İmparatoriçe, konfor uğruna aşırı harcama, duygusal alışveriş ve israf döngülerine karşı uyarır. “Hak ettik” diyerek bütçe aşılabilir.',
    keywords: ['bereket', 'konfor', 'israf', 'ihtiyaç', 'üretkenlik'],
    context:
      'Konfor ile tasarruf arasındaki ölçü ayarlanırsa para tartışmaları yumuşar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_rc_pos8',
    card: 'The Emperor',
    position: 8,
    upright:
      'İmparator, düzen, plan ve bütçe disiplinini savunur. Net kurallar parasal güven yaratır.',
    reversed:
      'Ters İmparator, parayı kontrol aracı yapma, katı tutum ve “ben bilirim” tavrının ortak alanı daralttığını söyler.',
    keywords: ['düzen', 'bütçe', 'kontrol', 'kural', 'güven'],
    context:
      'Net bütçe iyi; otoriter dil değil. Ortak kurallar birlikte yazılmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_rc_pos8',
    card: 'The Hierophant',
    position: 8,
    upright:
      'Aziz, aile ekonomisi, geleneksel para anlayışı ve büyüklerin tavsiyesini gündeme getirir. Disiplin ve değerler destek olabilir.',
    reversed:
      'Ters Aziz, “böyle yapılır” baskısı, ayıplama ve kalıp kararlarla finansive yaşam tarzını sınırlayabilir.',
    keywords: ['gelenek', 'aile', 'değer', 'baskı', 'kalıp'],
    context:
      'Dış değerler ilham olsun, dayatma olmasın; size uygun finans kuralı seçin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_rc_pos8',
    card: 'The Lovers',
    position: 8,
    upright:
      'Aşıklar, para değerlerinde hizalanma ve ortak kararların gücünü vurgular. Beraber seçilen hedefler bütçeyi güçlendirir.',
    reversed:
      'Ters Aşıklar, harcama alışkanlıkları, birikim beklentisi ya da risk iştahında uyumsuzlukların çatışma doğurduğunu söyler.',
    keywords: ['değer', 'uyum', 'karar', 'hedef', 'uyumsuzluk'],
    context: 'Öncelikleri konuşup aynı harita üzerinde buluşmak gereklidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_rc_pos8',
    card: 'The Chariot',
    position: 8,
    upright:
      'Savaş Arabası, net finans hedefi ve kararlı aksiyonu anlatır. Disiplinli ilerleyiş parayı rayına sokar.',
    reversed:
      'Ters Savaş Arabası, acele kararlar, dürtüsel alışveriş ve performans baskısının mali hataları artırdığını söyler.',
    keywords: ['hedef', 'disiplin', 'hız', 'dürtü', 'baskı'],
    context: 'Hız değil tutarlılık; adımları takvim ve limitlerle yürütün.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_rc_pos8',
    card: 'Strength',
    position: 8,
    upright:
      'Güç, sabır, özdenetim ve şefkatli kısıt ile bütçeyi iyileştirmeyi anlatır. Nazik disiplin, krizleri yumuşatır.',
    reversed:
      'Ters Güç, gurur nedeniyle yardım istememek, “harcamayayım” derken patlamak veya duygusal tetiklerle para yönetimini kaçırmak demektir.',
    keywords: ['özdenetim', 'sabır', 'yardım', 'tetik', 'kısıt'],
    context:
      'Duygusal tetiklerde mola, gerekirse destek alın; nazik ama net sınırlar koyun.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_rc_pos8',
    card: 'The Hermit',
    position: 8,
    upright:
      'Ermiş, sadeleşme, frugal yaşam ve iç muhasebeyi önerir. Yalın plan maddi stresi azaltır.',
    reversed:
      'Ters Ermiş, aşırı kısma, paylaşmama ve “ben hallederim” izolasyonunun yükü büyüttüğünü söyler.',
    keywords: ['sadeleşme', 'tasarruf', 'muhasebe', 'izolasyon', 'paylaşım'],
    context:
      'Sade plan iyi; ortak iletişimi kesmek değil. Kararları birlikte değerlendirin.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_rc_pos8',
    card: 'The Wheel of Fortune',
    position: 8,
    upright:
      'Kader Çarkı, gelir–gider döngülerinde dalgalanmayı gösterir. Esnek plan ve yedek akçe şarttır.',
    reversed:
      'Ters Kader Çarkı, tekrarlayan borç, geciken ödemeler ve “kısmet”e bağlanan finans hatalarını işaret eder.',
    keywords: ['dalgalanma', 'yastık', 'borç', 'alışkanlık', 'zamanlama'],
    context: 'Dalga yönetimi için acil fon ve tekrar eden kalıpları düzeltin.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_rc_pos8',
    card: 'Justice',
    position: 8,
    upright:
      'Adalet, adil paylaşım, şeffaf bütçe ve kayıt disiplinine vurgu yapar. Netlik huzur getirir.',
    reversed:
      'Ters Adalet, çifte standart, gizli harcama ve geç telafinin güveni zedelediğini söyler.',
    keywords: ['adalet', 'şeffaflık', 'kayıt', 'çifte standart', 'telafi'],
    context: 'Gelir–gider açık defter; hatada hızlı telafi, eşit kurallar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_rc_pos8',
    card: 'The Hanged Man',
    position: 8,
    upright:
      'Asılan Adam, kısa süreli fedakarlık, erteleme ve yeniden önceliklendirmeyi anlatır. Askıda kalış, nefes kazandırır.',
    reversed:
      'Ters Asılan Adam, sürüncemede kalan ödemeler, “sonra bakarız” döngüsü ve finansal ertelemecilikle uyarır.',
    keywords: ['fedakarlık', 'erteleme', 'öncelik', 'askı', 'nakit akışı'],
    context:
      'Geçici kısıt bilinçli ve süreli olmalı; kalıcı erteleme yaratmayın.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_rc_pos8',
    card: 'Death',
    position: 8,
    upright:
      'Ölüm, bitirmesi gereken abonelikler, borçlar ve verimsiz alışkanlıkları kapatmayı söyler. Sadeleşme güçtür.',
    reversed:
      'Ters Ölüm, gereksiz masrafları bırakmaktan kaçınma ve “alıştık” konforu yüzünden zarar etmeyi anlatır.',
    keywords: ['bitiş', 'temizlik', 'alışkanlık', 'borç kapama', 'sadeleşme'],
    context: 'Finansal detoks yapın; gereksizi kapatın, kaynak açın.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_rc_pos8',
    card: 'Temperance',
    position: 8,
    upright:
      'Denge, orta yol bütçe, zarf yöntemi ve ölçülü harcamayı savunur. Karışım iyi ise huzur gelir.',
    reversed:
      'Ters Denge, ya hep ya hiç alışveriş, aşırı kısıp sonra taşırma döngüsünü işaret eder.',
    keywords: ['denge', 'ölçü', 'bütçe', 'istikrar', 'taşkınlık'],
    context: 'Ritmi yumuşatın; küçük düzenli adımlar büyük sıçramadan iyidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_rc_pos8',
    card: 'The Devil',
    position: 8,
    upright:
      'Şeytan, tüketim bağımlılığı, kredi döngüsü, kumar/alışveriş tetikleri ve statü harcamalarıyla uyarır.',
    reversed:
      'Ters Şeytan, zincirleri kırma ve tetikleyici uygulama/sitelerden uzaklaşma kararlılığını anlatır.',
    keywords: ['borç', 'bağımlılık', 'tetik', 'statü', 'özgürleşme'],
    context:
      'Tetikleri kapatın, borç planı ve destekle bağı kesmeye odaklanın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_rc_pos8',
    card: 'The Tower',
    position: 8,
    upright:
      'Kule, ani masraf, bozulan cihaz, iş kaybı gibi şokları gösterir. Acil fon yoksa ilişki gerilir.',
    reversed:
      'Ters Kule, çatlakların görmezden gelindiğini; küçük arızanın büyük faturaya dönüşebileceğini söyler.',
    keywords: ['ani masraf', 'acil fon', 'kriz', 'onarım', 'önlem'],
    context: 'Acil durum bütçesi kurun; bakım ve garanti ile riski azaltın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_rc_pos8',
    card: 'The Star',
    position: 8,
    upright:
      'Yıldız, umut, bağış/yardım ağı, burs ve iyileşen nakit akışını anlatır. Küçük, sürdürülebilir adımlar şifa getirir.',
    reversed:
      'Ters Yıldız, pembe beklenti, “nasıl olsa olur” rehaveti ve plan dışı iyimserliğin hayal kırıklığına dönebileceğini söyler.',
    keywords: ['umut', 'şifa', 'destek', 'iyimserlik', 'plan'],
    context: 'Umut + plan = gerçek; ölçülebilir hedeflerle ilerleyin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_rc_pos8',
    card: 'The Moon',
    position: 8,
    upright:
      'Ay, belirsiz giderler, gizli ücretler ve muğlak sözleşmelerle uyarır. Sisli rakam güveni sarsar.',
    reversed:
      'Ters Ay, paranoyaya düşmeden kanıt istemeyi; söylenti/varsayımı bırakıp sözleşmeye inmeyi anlatır.',
    keywords: ['belirsizlik', 'gizli ücret', 'sözleşme', 'varsayım', 'netlik'],
    context: 'Her rakamı yazıya dökün; sisli kalem bırakmayın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_rc_pos8',
    card: 'The Sun',
    position: 8,
    upright:
      'Güneş, açık hesap, dürüst tablo ve görünür hedeflerle rahatlama getirir. Başarı ve bereket mümkündür.',
    reversed:
      'Ters Güneş, vitrin ekonomisi, gösteriş harcaması ve “mutlu görünme” baskısının bütçeyi yorduğunu söyler.',
    keywords: ['açıklık', 'başarı', 'vitrin', 'hedef', 'görünürlük'],
    context: 'Gerçek tabloyu paylaşın; imaj için değil, huzur için harcayın.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_rc_pos8',
    card: 'Judgement',
    position: 8,
    upright:
      'Mahkeme, finansal muhasebe, geçmiş hataları itiraf ve telafiyi çağırır. Temiz defter, yeni sayfa demektir.',
    reversed:
      'Ters Mahkeme, suç atma, geciken özür/telafi ve kaçınmanın bütçeyi çökerttiğini söyler.',
    keywords: ['muhasebe', 'itraf', 'telafi', 'geçmiş', 'yenilenme'],
    context: 'Açık muhasebe yapın; sorumluluk ve çözüm planı belirleyin.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_rc_pos8',
    card: 'The World',
    position: 8,
    upright:
      'Dünya, uzun vadeli hedeflerin (ev, kredi, birikim) tamamlanmasını ve finansal olgunluğu gösterir.',
    reversed:
      'Ters Dünya, yarım kalan planlar, uzayan borçlar ve kapanmayan döngülere işaret eder.',
    keywords: ['tamamlama', 'uzun vade', 'kredi', 'birikim', 'döngü'],
    context: 'Planları kapatın, hedefleri somut kilometre taşlarına bağlayın.',
    group: 'Majör Arkana',
  },

  // CUPS (14)
  {
    id: 'ace_of_cups_rc_pos8',
    card: 'Ace of Cups',
    position: 8,
    upright:
      'Kupa Ası, duygusal destek ve cömertliğin para stresinde merhem olabileceğini söyler. Kalpten dayanışma, bütçeyi de iyileştirir.',
    reversed:
      'Ters Kupa Ası, duygusal boşluğu alışverişle doldurma ve “kendimi ödüllendireyim” harcamalarının artabileceğini anlatır.',
    keywords: ['destek', 'cömertlik', 'alışveriş', 'duygu', 'merhem'],
    context: 'Duyguyu parayla telafi etmeyin; desteği konuşarak kurun.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_rc_pos8',
    card: 'Two of Cups',
    position: 8,
    upright:
      'İki Kupa, ortak cüzdan ve karşılıklılıkta uyumu gösterir. Küçük jestler bile finans güvenini büyütür.',
    reversed:
      'Ters İki Kupa, “ben verdim–sen verdin” hesabı ve eşit olmayan katkı algısının gerginlik doğurduğunu söyler.',
    keywords: ['ortak cüzdan', 'eşitlik', 'jest', 'katkı', 'güven'],
    context: 'Paylaşımı ve katkı hissini düzenli konuşun; puan tutmayın.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_rc_pos8',
    card: 'Three of Cups',
    position: 8,
    upright:
      'Üç Kupa, sosyal harcamalar ve kutlama bütçelerini işaret eder. Planlı yapıldığında bağları besler.',
    reversed:
      'Ters Üç Kupa, kalabalıkta aşırı harcama, “her etkinliğe katılma” baskısı ve gereksiz masraf uyarısıdır.',
    keywords: ['sosyal', 'kutlama', 'baskı', 'masraf', 'plan'],
    context: 'Sosyal bütçe koyun; “hayır” demeyi öğrenin.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_rc_pos8',
    card: 'Four of Cups',
    position: 8,
    upright:
      'Dört Kupa, motivasyon düşüşü ve “ne yapsak yetmiyor” hissiyle harcamaları salıvermeye meylettirebilir.',
    reversed:
      'Ters Dört Kupa, fırsatları görmezden gelme ve indirim/avantajları kaçırma eğilimini anlatır.',
    keywords: ['apatik', 'fırsat', 'motivasyon', 'tasarruf', 'ilgisizlik'],
    context:
      'Küçük fırsatları fark etmek için bilerek bakın; otomatik pilottan çıkın.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_rc_pos8',
    card: 'Five of Cups',
    position: 8,
    upright:
      'Beş Kupa, geçmiş maddi kayıpların üzüntüsünü taşır. Yas tutmak doğal ama umut penceresi açıktır.',
    reversed:
      'Ters Beş Kupa, “boşa gitti” pişmanlığıyla yeni fırsatları da kaçırma riskini söyler. Affediş bütçeyi de rahatlatır.',
    keywords: ['kayıp', 'yas', 'pişmanlık', 'fırsat', 'toparlanma'],
    context: 'Kayıptan ders çıkarın; geleceğe odaklı mikro adımlar atın.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_rc_pos8',
    card: 'Six of Cups',
    position: 8,
    upright:
      'Altı Kupa, aile desteği, eski alışkanlıklar ve nostaljik harcamaları gündeme getirir.',
    reversed:
      'Ters Altı Kupa, “eskiden böyleydi” diye sürdürülen pahalı alışkanlıkların bütçeyi zorladığını söyler.',
    keywords: ['aile', 'nostalji', 'alışkanlık', 'destek', 'pahalı rutin'],
    context: 'Geçmiş güzel; bugüne uygun, sürdürülebilir haliyle yaşatın.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_rc_pos8',
    card: 'Seven of Cups',
    position: 8,
    upright:
      'Yedi Kupa, çok seçenek, kampanya ve hayal pazarıyla dikkat dağıtıcıdır. Net kriter yoksa para uçar.',
    reversed:
      'Ters Yedi Kupa, hayal satın almayı bırakıp gerçek maliyetlere dönmeyi söyler.',
    keywords: ['seçenek', 'kampanya', 'dikkat dağıtıcı', 'kriter', 'gerçek'],
    context: 'Alışverişte kriter listesi ve bekleme kuralı koyun.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_rc_pos8',
    card: 'Eight of Cups',
    position: 8,
    upright:
      'Sekiz Kupa, anlamını yitiren masrafları bırakıp daha değerli hedeflere yönelmeyi anlatır.',
    reversed:
      'Ters Sekiz Kupa, kal–git sarkacında iptal edemediğiniz abonelikler ve kararsızlık maliyeti uyarısıdır.',
    keywords: ['bırakma', 'değer', 'abonelik', 'kararsızlık', 'odak'],
    context: 'Artık hizmet etmeyeni iptal edin; kaynağı önceliklere taşıyın.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_rc_pos8',
    card: 'Nine of Cups',
    position: 8,
    upright:
      'Dokuz Kupa, tatmin, küçük lüksler ve hakkını verme hissini getirir. Ölçülü olduğunda motivasyon katar.',
    reversed:
      'Ters Dokuz Kupa, keyif harcamasının kontrolden çıkıp temel hedefleri geciktirdiğini söyler.',
    keywords: ['tatmin', 'lüks', 'motivasyon', 'ölçü', 'erteleme'],
    context: 'Keyfi bütçeyi sınırlayın; hedef bütçesini önceleyin.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_rc_pos8',
    card: 'Ten of Cups',
    position: 8,
    upright:
      'On Kupa, aile uyumu, ev içi huzur ve ortak mutluluk hedefleriyle uyumlu harcamaları anlatır.',
    reversed:
      'Ters On Kupa, “mutlu görünme” baskısıyla vitrin harcamaları ve aile beklentisi masraflarını işaret eder.',
    keywords: ['aile', 'huzur', 'vitrin', 'beklenti', 'uyum'],
    context: 'Mutluluk ölçüsü gerçek ihtiyaçlar; gösteriş baskısını azaltın.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_rc_pos8',
    card: 'Page of Cups',
    position: 8,
    upright:
      'Kupa Prensi, yaratıcı küçük fırsatlar ve naif gelir fikirlerini gösterir. Denemeler ilham olabilir.',
    reversed:
      'Ters Kupa Prensi, alınganlıkla “hak ettim” alışverişi ve pasif–agresif harcama refleksi uyarısıdır.',
    keywords: ['yaratıcılık', 'küçük fırsat', 'alınganlık', 'ödül', 'deneme'],
    context: 'Küçük gelir fikirlerini test edin; duygu anında kartı bırakın.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_rc_pos8',
    card: 'Knight of Cups',
    position: 8,
    upright:
      'Kupa Şövalyesi, romantik jest bütçesini planlayınca ilişkinin kalbi de cüzdan da rahatlar.',
    reversed:
      'Ters Kupa Şövalyesi, jest baskısı ve tutarsız harcamanın ay sonunu zorlayabileceğini söyler.',
    keywords: ['jest', 'plan', 'tutarlılık', 'romantizm', 'ay sonu'],
    context: 'Jest güzel; tutarlı, küçük ve planlı olduğunda anlamlı.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_rc_pos8',
    card: 'Queen of Cups',
    position: 8,
    upright:
      'Kupa Kraliçesi, şefkatli destek, duygusal güvenlik ve akıllı yardımla finans yükünü hafifletir.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal manipülasyonla para talebi ve “benim için yap” baskısına karşı uyarır.',
    keywords: ['şefkat', 'destek', 'güvenlik', 'manipülasyon', 'talep'],
    context: 'Yardım sevgiyle ve sınırla olsun; borçlandırmadan verin/alın.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_rc_pos8',
    card: 'King of Cups',
    position: 8,
    upright:
      'Kupa Kralı, finans konuşmalarına duygusal olgunluk, sakinlik ve empati getirir.',
    reversed:
      'Ters Kupa Kralı, pasif–agresif sızıntı ve kırılganlıkla bütçe konularını ertelemek uyarısıdır.',
    keywords: ['olgunluk', 'empati', 'sakinlik', 'erteleme', 'ifade'],
    context:
      'Hissinizi söyleyin, bütçeyi de net konuşun; ikisi birlikte ilerler.',
    group: 'Kupalar',
  },

  // SWORDS (14)
  {
    id: 'ace_of_swords_rc_pos8',
    card: 'Ace of Swords',
    position: 8,
    upright:
      'Kılıç Ası, net finans stratejisi, keskin karar ve gereksizi kesip atmayı anlatır.',
    reversed:
      'Ters Kılıç Ası, çarpıtılmış bilgiler, muğlak sözleşme ve kafa karışıklığıyla maddi kayba yol açabilir.',
    keywords: ['netlik', 'karar', 'sözleşme', 'kestirme', 'strateji'],
    context: 'Sözleşmeleri okuyun, gereksizi kesin; kararınızı yazılılaştırın.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_rc_pos8',
    card: 'Two of Swords',
    position: 8,
    upright:
      'İki Kılıç, karar kaçınması ve bütçe toplantısını ertelemenin maliyetiyle uyarır.',
    reversed:
      'Ters İki Kılıç, veriye bakmadan taraf tutmak ve “bilmiyorum”da kalmanın borcu büyüteceğini söyler.',
    keywords: ['kararsızlık', 'erteleme', 'veri', 'borç', 'yüzleşme'],
    context: 'Küçük ama net bir seçim yapın; toplantı tarihini sabitleyin.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_rc_pos8',
    card: 'Three of Swords',
    position: 8,
    upright:
      'Üç Kılıç, para yüzünden kırıcı sözler ve sert eleştirilerin yarasını gösterir.',
    reversed:
      'Ters Üç Kılıç, suç atma yerine onarım diline geçmenin bütçe kadar bağı da iyileştireceğini söyler.',
    keywords: ['kırgınlık', 'eleştiri', 'onarım', 'suçlama', 'dil'],
    context: 'Tonunuzu yumuşatın; rakamı değil kişiyi hedef almayın.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_rc_pos8',
    card: 'Four of Swords',
    position: 8,
    upright:
      'Dört Kılıç, harcama molası, no-spend günleri ve sakin değerlendirmeyi önerir.',
    reversed:
      'Ters Dört Kılıç, aşırı bekleme ve eylemsizliğin fırsat kaybına dönüşebileceğini söyler.',
    keywords: ['mola', 'no-spend', 'sükunet', 'fırsat', 'değerlendirme'],
    context: 'Planlı mola iyi; ama süre ve hedef belirlenmeli.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_rc_pos8',
    card: 'Five of Swords',
    position: 8,
    upright:
      'Beş Kılıç, “haklı çıkma” savaşının para çözümlerini kilitlediğini anlatır.',
    reversed:
      'Ters Beş Kılıç, alay ve sarkazmı bırakıp kazan–kazan çözümüne dönme çağrısıdır.',
    keywords: ['ego', 'çatışma', 'saygı', 'uzlaşı', 'çözüm'],
    context: 'Hedef anlaşmak; dilinizi kazanmaktan anlayışa çevirin.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_rc_pos8',
    card: 'Six of Swords',
    position: 8,
    upright:
      'Altı Kılıç, borçtan çıkış planı, yapılandırma ve daha sakin sulara geçişi gösterir.',
    reversed:
      'Ters Altı Kılıç, eski alışkanlıklara geri dönme ve plan dışına savrulma riskini uyarır.',
    keywords: ['geçiş', 'yapılandırma', 'plan', 'istikrar', 'takip'],
    context: 'Planı yazın, aylık kontrolle rotada kalın.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_rc_pos8',
    card: 'Seven of Swords',
    position: 8,
    upright:
      'Yedi Kılıç, kaçak harcama, gizli hesap ve “haber vermeden” finans kararlarına karşı uyarır.',
    reversed:
      'Ters Yedi Kılıç, itiraf, şeffaflık ve güveni yeniden inşa etme fırsatını getirir.',
    keywords: ['gizli harcama', 'itiraf', 'şeffaflık', 'güven', 'etik'],
    context: 'Açık defter; sürpriz harcamaya kural koyun.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_rc_pos8',
    card: 'Eight of Swords',
    position: 8,
    upright:
      'Sekiz Kılıç, borç ve faturalar karşısında çaresizlik hissini anlatır. Kapı çoğu kez açıktır.',
    reversed:
      'Ters Sekiz Kılıç, destek isteme, danışma ve küçük adımlarla çıkışın mümkün olduğunu söyler.',
    keywords: ['çaresizlik', 'borç', 'destek', 'küçük adım', 'özgürleşme'],
    context: 'Gerçek tabloyu çıkarın; yardım ve yeniden pazarlık deneyin.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_rc_pos8',
    card: 'Nine of Swords',
    position: 8,
    upright:
      'Dokuz Kılıç, para kaygısı, uykusuz geceler ve felaket senaryolarını gösterir.',
    reversed:
      'Ters Dokuz Kılıç, kanıt odaklı plan, sakin nefes ve sınırlandırılmış ekranla kaygıyı düşürmeyi önerir.',
    keywords: ['kaygı', 'uyku', 'felaket', 'kanıt', 'regülasyon'],
    context: 'Kaygıyı planla düzenleyin; gece finans konuşması yapmayın.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_rc_pos8',
    card: 'Ten of Swords',
    position: 8,
    upright:
      'On Kılıç, iflas hissi, tükeniş ve “bitti” duygusunu simgeler. Sonra toparlanma mümkün.',
    reversed:
      'Ters On Kılıç, dramatize etmeden sade kapanış ve yeniden başlama çağrısıdır.',
    keywords: ['tükeniş', 'kapanış', 'yeniden başla', 'onarım', 'gerçekçilik'],
    context: 'Zor dosyayı kapatın; yeni planla küçükten başlayın.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_rc_pos8',
    card: 'Page of Swords',
    position: 8,
    upright:
      'Kılıç Prensi, araştırma, fiyat karşılaştırma ve merakla tasarruf fırsatlarını bulmayı anlatır.',
    reversed:
      'Ters Kılıç Prensi, dedikodu, yanlış bilgi ve sahte kampanyalara kanma riskini söyler.',
    keywords: ['araştırma', 'karşılaştırma', 'bilgi', 'sahte', 'merak'],
    context: 'Kaynak doğrulayın; her “indirim” gerçek değil.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_rc_pos8',
    card: 'Knight of Swords',
    position: 8,
    upright:
      'Kılıç Şövalyesi, hızlı karar, pazarlık ve gereksiz kalemi kesmeyi destekler.',
    reversed:
      'Ters Kılıç Şövalyesi, acele imza, ültimatom ve finansal agresyonun ilişkiyi gerdiğini söyler.',
    keywords: ['hız', 'pazarlık', 'acele imza', 'agresyon', 'kesinti'],
    context: 'Hızlı olun ama kör olmayın; sözleşme okumadan hareket etmeyin.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_rc_pos8',
    card: 'Queen of Swords',
    position: 8,
    upright:
      'Kılıç Kraliçesi, nesnel akıl, net kriter ve duygudan bağımsız bütçe kararlarını savunur.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı sertlik ve merhametsiz kesintinin ilişkide soğukluk yaratabileceğini söyler.',
    keywords: ['nesnellik', 'kriter', 'netlik', 'sertlik', 'denge'],
    context: 'Net olun; şefkati de denklemden çıkarmayın.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_rc_pos8',
    card: 'King of Swords',
    position: 8,
    upright:
      'Kılıç Kralı, finansal danışman/uzman aklı, yasa ve kuralın koruyucu etkisini vurgular.',
    reversed:
      'Ters Kılıç Kralı, kural sopasıyla baskı kurma ve gri alanı yok sayma riski taşır.',
    keywords: ['uzman', 'kural', 'yasa', 'gri alan', 'otorite'],
    context: 'Uzmanlık alın; kurallar esneklikle birlikte uygulansın.',
    group: 'Kılıçlar',
  },

  // WANDS (14)
  {
    id: 'ace_of_wands_rc_pos8',
    card: 'Ace of Wands',
    position: 8,
    upright:
      'Değnek Ası, yeni iş/freelance/yan proje kıvılcımını gösterir. Gelir artışı için enerji yüksek.',
    reversed:
      'Ters Değnek Ası, hevesle başlayıp yarım bırakma ve kaynak israfı riskine karşı uyarır.',
    keywords: ['kıvılcım', 'yan iş', 'gelir', 'heves', 'israf'],
    context: 'Enerjiyi paraya çevirmek için bitiricilik planı yapın.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_rc_pos8',
    card: 'Two of Wands',
    position: 8,
    upright:
      'İki Değnek, ufuk/plân ve bütçe hedefi senaryolarını çalışmayı önerir. Vizyon gelir getirir.',
    reversed:
      'Ters İki Değnek, plan–icra boşluğu ve oldu-bitti kararlarının kaynağı tükettiğini söyler.',
    keywords: ['vizyon', 'plan', 'senaryo', 'uygulama', 'boşluk'],
    context: 'Planı takvime bağlayın; yetki ve görevleri netleştirin.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_rc_pos8',
    card: 'Three of Wands',
    position: 8,
    upright:
      'Üç Değnek, büyüme, yeni pazar ve iş fırsatını anlatır. Sabırlı bekleyiş meyve verebilir.',
    reversed:
      'Ters Üç Değnek, gecikme, yanlış koordinasyon ve nakit akışı sıkışıklığı uyarısıdır.',
    keywords: ['büyüme', 'fırsat', 'koordinasyon', 'gecikme', 'nakit'],
    context: 'Koordinasyon takvimi kurun; köprü finans planlayın.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_rc_pos8',
    card: 'Four of Wands',
    position: 8,
    upright:
      'Dört Değnek, ev kutlaması, taşınma ve eşik harcamalarını gündeme getirir; planlayınca keyiflidir.',
    reversed:
      'Ters Dört Değnek, tören/etiket baskısı ve gösteriş maliyetine karşı uyarır.',
    keywords: ['eşik', 'ev', 'kutlama', 'gösteriş', 'plan'],
    context: 'Kutlama bütçesi belirleyin; gerek yoksa sadeleştirin.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_rc_pos8',
    card: 'Five of Wands',
    position: 8,
    upright:
      'Beş Değnek, para önceliklerinde fikir çarpışmasını gösterir. Kurallı tartışma verimlidir.',
    reversed:
      'Ters Beş Değnek, kaotik pazarlık, enerji kaybı ve dağınık harcamaya yol açabilir.',
    keywords: ['tartışma', 'öncelik', 'pazarlık', 'kural', 'dağınıklık'],
    context: 'Süre–tur kuralı koyun; kararları yazın.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_rc_pos8',
    card: 'Six of Wands',
    position: 8,
    upright:
      'Altı Değnek, başarı ve prim/bonus gibi görünür kazançları anlatır. Takdir motivasyon getirir.',
    reversed:
      'Ters Altı Değnek, imaj harcaması ve alkış için gereksiz masraf uyarısıdır.',
    keywords: ['başarı', 'prim', 'takdir', 'imaj', 'masraf'],
    context: 'Zaferi kutlayın; imaj için değil, değere göre harcayın.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_rc_pos8',
    card: 'Seven of Wands',
    position: 8,
    upright:
      'Yedi Değnek, dış finans baskılarına karşı bütçeyi savunmayı anlatır. Sınırlar şart.',
    reversed:
      'Ters Yedi Değnek, sürekli savunmada kalmanın fırsat görmeyi engellediğini söyler.',
    keywords: ['savunma', 'sınır', 'baskı', 'fırsat', 'denge'],
    context: 'Sınır koyun ama körleşmeyin; fırsat pencerelerine bakın.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_rc_pos8',
    card: 'Eight of Wands',
    position: 8,
    upright:
      'Sekiz Değnek, hızla akan iş/ödeme/teklif trafiğini gösterir. Hız doğru yönetilirse kazançtır.',
    reversed:
      'Ters Sekiz Değnek, acele onay, hatalı transfer ve iletişimde karmaşa riskini uyarır.',
    keywords: ['hız', 'trafik', 'onay', 'transfer', 'karmaşa'],
    context: 'Tek kanal ve kontrol listesiyle hızınızı güvene alın.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_rc_pos8',
    card: 'Nine of Wands',
    position: 8,
    upright:
      'Dokuz Değnek, ekonomik zorluklara rağmen pes etmeyen dayanıklılığı simgeler.',
    reversed:
      'Ters Dokuz Değnek, “sürekli tetikte” yaşamanın tükenişe ve finans körlüğüne yol açabileceğini söyler.',
    keywords: ['dayanıklılık', 'tetik', 'tükeniş', 'koruma', 'mola'],
    context: 'Mola ve delege ile gücü koruyun; tükenişi önleyin.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_rc_pos8',
    card: 'Ten of Wands',
    position: 8,
    upright:
      'On Değnek, fazla yük ve tek kişide toplanan maddi sorumlulukları anlatır.',
    reversed:
      'Ters On Değnek, delege, otomasyon ve sadeleştirme ile yükü pay etmeyi önerir.',
    keywords: ['yük', 'sorumluluk', 'delege', 'sadeleştirme', 'otomat'],
    context: 'Görev ve faturaları dağıtın; iş akışını hafifletin.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_rc_pos8',
    card: 'Page of Wands',
    position: 8,
    upright:
      'Değnek Prensi, düşük bütçeyle yaratıcı çözüm ve mikro proje fikirlerini getirir.',
    reversed:
      'Ters Değnek Prensi, odaksız kıvılcımın yarım iş ve masraf doğurabileceğini söyler.',
    keywords: ['yaratıcılık', 'mikro proje', 'odak', 'masraf', 'deneme'],
    context: 'Küçük denemeleri net hedef ve süreyle yapın.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_rc_pos8',
    card: 'Knight of Wands',
    position: 8,
    upright:
      'Değnek Şövalyesi, satış/komisyon/ek işte atak hamle ve hızlı gelir fırsatını gösterir.',
    reversed:
      'Ters Değnek Şövalyesi, dengesiz tempo ve yarıda kalan işlerin para yakabileceğini söyler.',
    keywords: ['atak', 'komisyon', 'hız', 'dengesiz', 'tamamlama'],
    context: 'Hızlı kazanı planla, teslimi garantiye al.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_rc_pos8',
    card: 'Queen of Wands',
    position: 8,
    upright:
      'Değnek Kraliçesi, girişimcilik özgüveni, network ve ikna gücüyle geliri büyütmeyi anlatır.',
    reversed:
      'Ters Değnek Kraliçesi, görünürlük için gereksiz masraf ve kıyas baskısı uyarısıdır.',
    keywords: ['girişim', 'özgüven', 'network', 'görünürlük', 'kıyas'],
    context: 'Görünürlüğü stratejik yönetin; imaj değil değer üretin.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_rc_pos8',
    card: 'King of Wands',
    position: 8,
    upright:
      'Değnek Kralı, vizyoner liderlik ve risk yönetimiyle geliri ölçeklemeyi vurgular.',
    reversed:
      'Ters Değnek Kralı, ego kaynaklı riskler ve tek merkezli kararların finansı zorlayabileceğini söyler.',
    keywords: ['vizyon', 'risk', 'ölçek', 'ego', 'yetki'],
    context: 'Yetki paylaşın; riskleri veriyle yönetin.',
    group: 'Asalar',
  },

  // PENTACLES (14)
  {
    id: 'ace_of_pentacles_rc_pos8',
    card: 'Ace of Pentacles',
    position: 8,
    upright:
      'Tılsım Ası, yeni iş/fırsat, prim ya da somut başlangıcı müjdeler. Temel atılırsa bereket gelir.',
    reversed:
      'Ters Tılsım Ası, kaçırılan fırsat, kötü zamanlama ve plansız girişimle para kaybını uyarır.',
    keywords: ['fırsat', 'temel', 'bereket', 'zamanlama', 'kayma'],
    context: 'Fırsatı doğrulayın; temel atmadan büyümeye kalkmayın.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_rc_pos8',
    card: 'Two of Pentacles',
    position: 8,
    upright:
      'İki Tılsım, gelir–gider dengeleme, çoklu akış ve esnek planı anlatır.',
    reversed:
      'Ters İki Tılsım, dağınıklık, son dakika stresleri ve ödeme aksaklığı riski taşır.',
    keywords: ['denge', 'çoklu akış', 'esneklik', 'dağınıklık', 'akış'],
    context: 'Ajanda ve nakit akış tablosu ile ritmi düzenleyin.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_rc_pos8',
    card: 'Three of Pentacles',
    position: 8,
    upright:
      'Üç Tılsım, işbirliği, kalite standardı ve görünür emeğin kazancı büyüttüğünü söyler.',
    reversed:
      'Ters Üç Tılsım, rol karmaşası, düşük kalite ve emeği görünmez kılmanın kayıp yazdıracağını anlatır.',
    keywords: ['işbirliği', 'kalite', 'rol', 'takdir', 'verim'],
    context: 'Süreç–rol–standartları yazın; takdiri görünür kılın.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_rc_pos8',
    card: 'Four of Pentacles',
    position: 8,
    upright:
      'Dört Tılsım, tasarruf, güvenlik ve eldeki kaynağı korumayı vurgular. Yastık fon önemlidir.',
    reversed:
      'Ters Dört Tılsım, aşırı tutma, cimrilik ya da parayla kontrol kurmanın ilişkiyi gerdiğini söyler.',
    keywords: ['tasarruf', 'güvenlik', 'yastık', 'cimrilik', 'kontrol'],
    context: 'Güvenlik iyi; esnekliği ve paylaşımı unutmayın.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_rc_pos8',
    card: 'Five of Pentacles',
    position: 8,
    upright:
      'Beş Tılsım, maddi zorluk, daralma ve yalnızlık hissini anlatır. Kapılar vardır.',
    reversed:
      'Ters Beş Tılsım, yardım ağına erişim, destek ve toparlanma şansını gösterir.',
    keywords: ['daralma', 'yalnızlık', 'yardım', 'destek', 'toparlanma'],
    context: 'Destek isteyin; kısa-orta vadeli toparlanma planı yapın.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_rc_pos8',
    card: 'Six of Pentacles',
    position: 8,
    upright:
      'Altı Tılsım, adil paylaşım, yardımlaşma ve karşılıklılıkla bütçeyi dengelemeyi anlatır.',
    reversed:
      'Ters Altı Tılsım, koşullu yardım, borçlandırma ve güç asimetrisi uyarısıdır.',
    keywords: ['paylaşım', 'adalet', 'koşul', 'karşılıklılık', 'güç'],
    context: 'Şeffaf ve onurlu yardımlaşma; borçlandırmayı reddedin.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_rc_pos8',
    card: 'Seven of Pentacles',
    position: 8,
    upright:
      'Yedi Tılsım, sabır, ölç–öğren–iyileştir döngüsü ve hasat zamanlamasını vurgular.',
    reversed:
      'Ters Yedi Tılsım, sabırsız satış, batık maliyete saplanma ve verimsiz ısrarla uyarır.',
    keywords: ['sabır', 'ölçüm', 'hasat', 'batık maliyet', 'iyileştirme'],
    context: 'Metrik belirleyin; gerekirse pivot edin.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_rc_pos8',
    card: 'Eight of Pentacles',
    position: 8,
    upright:
      'Sekiz Tılsım, zanaat, beceri artışı ve düzenli küçük iyileştirmenin gelir doğurduğunu söyler.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik, tekrar iş ve kalite düşüşünün para yaktığını anlatır.',
    keywords: ['ustalık', 'pratik', 'kalite', 'özen', 'verim'],
    context: 'Standart ve kontrol listeleriyle kaliteyi güvenceye alın.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_rc_pos8',
    card: 'Nine of Pentacles',
    position: 8,
    upright:
      'Dokuz Tılsım, finansal bağımsızlık, zarif sade lüks ve emek meyvesini simgeler.',
    reversed:
      'Ters Dokuz Tılsım, gösteriş/yalnız konfor ve ortak hedeflerden kopma riskini söyler.',
    keywords: ['bağımsızlık', 'konfor', 'lüks', 'gösteriş', 'hedef'],
    context: 'Konforu ortak hedeflerle hizalayın; paylaşımı artırın.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_rc_pos8',
    card: 'Ten of Pentacles',
    position: 8,
    upright:
      'On Tılsım, aile sistemi, miras, ev ve uzun vadeli birikimle güveni gösterir.',
    reversed:
      'Ters On Tılsım, aile müdahalesi, miras anlaşmazlığı ve ev masraflarında belirsizliğe işaret eder.',
    keywords: ['miras', 'ev', 'birikim', 'aile', 'belirsizlik'],
    context: 'Sözleşme ve sınırlarla yapıyı netleştirin.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_rc_pos8',
    card: 'Page of Pentacles',
    position: 8,
    upright:
      'Tılsım Prensi, öğrenme, sertifika, küçük yatırım ve yeni gelir becerisini simgeler.',
    reversed:
      'Ters Tılsım Prensi, oyalanma, erteleme ve dağınık odakla fırsat kaçırmayı söyler.',
    keywords: ['öğrenme', 'sertifika', 'küçük yatırım', 'odak', 'fırsat'],
    context: 'Mini hedef ve tarih koyun; öğrenmeyi gelire bağlayın.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_rc_pos8',
    card: 'Knight of Pentacles',
    position: 8,
    upright:
      'Tılsım Şövalyesi, istikrarlı gelir, rutin ve güvenilir çalışma temposunu anlatır.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık, yeniliğe direnç ve verim düşüşü riskini uyarır.',
    keywords: ['istikrar', 'rutin', 'güven', 'durağanlık', 'verim'],
    context: 'Rutin iyi; mikro iyileştirme ve otomasyon ekleyin.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_rc_pos8',
    card: 'Queen of Pentacles',
    position: 8,
    upright:
      'Tılsım Kraliçesi, pratik bütçe, ev ekonomisi ve görünmez emeğin finansı taşıdığını söyler.',
    reversed:
      'Ters Tılsım Kraliçesi, bakım emeğini borçlandırma ve para üzerinden kontrol riskini işaret eder.',
    keywords: [
      'ev ekonomisi',
      'pratik',
      'görünmez emek',
      'borçlandırma',
      'kontrol',
    ],
    context: 'Emeği görünür kılın; iş bölümü ve bütçe şeffaf olsun.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_rc_pos8',
    card: 'King of Pentacles',
    position: 8,
    upright:
      'Tılsım Kralı, finansal liderlik, birikim ve uzun vadeli güvenceyi simgeler.',
    reversed:
      'Ters Tılsım Kralı, para–statü sopası, cimrilik ya da kontrol dilinin ilişkiyi germesini uyarır.',
    keywords: ['liderlik', 'güvence', 'birikim', 'statü', 'kontrol'],
    context: 'Liderlik şeffaf ve kapsayıcı olsun; güç değil güven üretsin.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 8 anlamını bulma fonksiyonu
export const getposition8Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return position8Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipProblemsposition8Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return getposition8Meaning(cardName);
};

// Kart adına göre pozisyon 8 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipProblemsposition8MeaningByCardName = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
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
export const getAllposition8Meanings =
  (): RelationshipProblemsPositionMeaning[] => {
    return position8Meanings;
  };

// pozisyon 8 anlamlarını filtreleme fonksiyonu
export const getposition8MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return position8Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 8 anlamlarını arama
export const searchposition8MeaningsByKeyword = (
  keyword: string
): RelationshipProblemsPositionMeaning[] => {
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
