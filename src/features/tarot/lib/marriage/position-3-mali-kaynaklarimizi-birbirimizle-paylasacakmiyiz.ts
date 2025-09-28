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
- position3Meanings: gerekli
- getposition3Meaning: gerekli
*/

import { MarriagePositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position3Meanings: MarriagePositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_ma_pos3',
    card: 'The Fool',
    position: 3,
    upright:
      'Deli, mali konularda özgür ve esnek bir paylaşımı işaret eder. Ortak harcamalarda cesurca ama düşünmeden adım atma eğilimi olabilir.',
    reversed:
      'Ters Deli, mali konularda dikkatsizlik ve hazırlıksız davranışları gösterir. Plansızlık paylaşımda sorunlara yol açabilir.',
    keywords: ['özgürlük', 'risk', 'plansızlık', 'esneklik'],
    context:
      'Paylaşımda özgürlük var ama yönsüzlük risk oluşturabilir. Dengeyi bulmak önemli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos3',
    card: 'The Magician',
    position: 3,
    upright:
      'Büyücü, mali konularda beceri ve yaratıcılığı simgeler. Ortak kaynaklarınızı akıllıca yönetme potansiyeliniz yüksek.',
    reversed:
      'Ters Büyücü, manipülasyon veya hileli tavırlarla paylaşımda sorunlara işaret eder. Şeffaflık olmazsa güven zedelenir.',
    keywords: ['beceri', 'yaratıcılık', 'şeffaflık', 'güven'],
    context:
      'Paylaşım için zeka ve beceri güçlü. Ancak dürüstlükten saparsanız güven kaybolur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos3',
    card: 'The High Priestess',
    position: 3,
    upright:
      'Başrahibe, mali konularda sezgi ve gizlilik enerjisi taşır. Kaynaklar konusunda derin düşünce ve bilinçli seçimler ön planda.',
    reversed:
      'Ters Başrahibe, gizlilik ve sırların mali paylaşımda güvensizlik yaratabileceğini söyler. Açıklık eksikliği sorunlara yol açar.',
    keywords: ['sezgi', 'giz', 'bilgelik', 'açıklık'],
    context:
      'Paylaşımda sezgi ve bilinçli yaklaşım faydalı. Gizlilik fazla olursa çatışma çıkar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos3',
    card: 'The Empress',
    position: 3,
    upright:
      'İmparatoriçe, bolluk ve cömertliği simgeler. Mali kaynaklar paylaşımında bereketli ve destekleyici bir enerji vardır.',
    reversed:
      'Ters İmparatoriçe, aşırı harcama veya dengesiz paylaşımı anlatır. Kaynakların savrulması sorun çıkarabilir.',
    keywords: ['bolluk', 'cömertlik', 'denge', 'destek'],
    context:
      'Paylaşımda bereket enerjisi hakim. Ama savurganlık dengeyi bozabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos3',
    card: 'The Emperor',
    position: 3,
    upright:
      'İmparator, mali paylaşımda düzen ve net kurallar gereğini gösterir. Disiplin ve sorumluluk ile kaynaklar güvenli olur.',
    reversed:
      'Ters İmparator, katı kontrol veya baskının paylaşımı zorlaştırabileceğini söyler. Güven duygusu zedelenebilir.',
    keywords: ['düzen', 'otorite', 'sorumluluk', 'güvenlik'],
    context:
      'Paylaşımda disiplin ve kurallar güven getirir. Aşırı kontrol çatışma yaratır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos3',
    card: 'The Hierophant',
    position: 3,
    upright:
      'Aziz, mali paylaşımda geleneksel yöntemleri işaret eder. Ortak değerler ve kurallar uyumu destekler.',
    reversed:
      'Ters Aziz, mali konularda farklı inanç ve değerlerin çatışmasına işaret eder. Esneklik olmadan uyum sağlanamaz.',
    keywords: ['değerler', 'gelenek', 'uyum', 'kurallar'],
    context:
      'Paylaşım geleneksel yollarla güvenli olur. Farklı değerler sorun çıkarabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos3',
    card: 'The Lovers',
    position: 3,
    upright:
      'Aşıklar, mali paylaşımda uyum ve ortak değerlerin ön planda olduğunu gösterir. Seçimler birlikte yapılır.',
    reversed:
      'Ters Aşıklar, mali konularda uyumsuzluk ve kararsızlık anlamına gelir. Ortak karar eksikliği sorun yaratır.',
    keywords: ['uyum', 'ortaklık', 'karar', 'değerler'],
    context:
      'Paylaşımda uyum ve ortak karar gücü var. Kararsızlık çatışma doğurabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos3',
    card: 'The Chariot',
    position: 3,
    upright:
      'Savaş Arabası, mali konularda kontrol ve ilerlemeyi simgeler. Birlikte hedeflere odaklanarak başarı mümkündür.',
    reversed:
      'Ters Savaş Arabası, mali uyumda yönsüzlük ve kontrol sorunlarını işaret eder. Çekişme ilerlemeyi engelleyebilir.',
    keywords: ['kontrol', 'ilerleme', 'odak', 'başarı'],
    context:
      'Paylaşımda hedefe odaklanmak başarı getirir. Yönsüzlük kayıplara yol açabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos3',
    card: 'Strength',
    position: 3,
    upright:
      'Güç, mali konularda sabır ve özdenetimi gösterir. Paylaşımda şefkat ve anlayış denge sağlar.',
    reversed:
      'Ters Güç, mali anlaşmazlıklarda sabırsızlık ve baskıcı tavırları işaret eder. Güven eksikliği doğabilir.',
    keywords: ['sabır', 'özdenetim', 'şefkat', 'güven'],
    context: 'Paylaşımda sabır ve şefkat güçlüdür. Baskıcılık sorun çıkarır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos3',
    card: 'The Hermit',
    position: 3,
    upright:
      'Ermiş, mali paylaşımda içe dönük ve dikkatli bir yaklaşımı gösterir. Harcamalarda temkin ve yalnız karar öne çıkabilir.',
    reversed:
      'Ters Ermiş, mali konularda aşırı içe kapanma ve paylaşmama eğilimini anlatır. Bu durum güveni zedeleyebilir.',
    keywords: ['içe dönüş', 'temkin', 'paylaşmama', 'yalnızlık'],
    context:
      'Paylaşımda dikkatli ve temkinli enerji hakim. Aşırı kapanma uyumu bozar.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos3',
    card: 'The Wheel of Fortune',
    position: 3,
    upright:
      'Kader Çarkı, mali konularda şans ve döngüsel değişimleri işaret eder. Ortak kaynaklarda fırsatlar ortaya çıkabilir.',
    reversed:
      'Ters Kader Çarkı, mali konularda beklenmedik kayıpları veya şanssızlıkları gösterir. Paylaşımda iniş çıkışlar olabilir.',
    keywords: ['şans', 'döngü', 'fırsat', 'kayıp'],
    context:
      'Paylaşımda değişim ve fırsatlar olabilir. Ama şanssızlık riski de var.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos3',
    card: 'Justice',
    position: 3,
    upright:
      'Adalet, mali konularda eşitlik ve şeffaflığı simgeler. Açık ve adil paylaşım ilişkiyi dengeler.',
    reversed:
      'Ters Adalet, mali konularda haksızlık ve gizlilikleri gösterir. Eşitsizlik sorun yaratır.',
    keywords: ['adalet', 'eşitlik', 'şeffaflık', 'denge'],
    context:
      'Paylaşımda eşitlik ve şeffaflık güven getirir. Haksızlık uyumu bozar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos3',
    card: 'The Hanged Man',
    position: 3,
    upright:
      'Asılan Adam, mali paylaşımda fedakarlık ve beklemeyi gösterir. Sabırla dengeler kurulabilir.',
    reversed:
      'Ters Asılan Adam, isteksiz fedakarlık veya tıkanıklığı simgeler. Paylaşımda ilerleme durabilir.',
    keywords: ['fedakarlık', 'bekleyiş', 'denge', 'tıkanıklık'],
    context:
      'Paylaşımda sabır ve fedakarlık var. Ama aşırısı sıkışmaya yol açabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos3',
    card: 'Death',
    position: 3,
    upright:
      'Ölüm, mali paylaşımda eski düzenin bitip yeni bir sistemin doğacağını gösterir. Değişim kaçınılmazdır.',
    reversed:
      'Ters Ölüm, mali konularda değişime direnç veya eski alışkanlıklara takılı kalmayı işaret eder.',
    keywords: ['değişim', 'yenilenme', 'direnç', 'dönüşüm'],
    context: 'Paylaşımda dönüşüm zamanı. Direnç uyumu zorlaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos3',
    card: 'Temperance',
    position: 3,
    upright:
      'Denge, mali paylaşımda ölçülülük ve uyum getirir. Kaynakları ortak fayda için birleştirme gücü vardır.',
    reversed:
      'Ters Denge, mali konularda aşırılık veya uyumsuzlukları gösterir. Denge kurulmadığında sorunlar doğar.',
    keywords: ['denge', 'ölçü', 'uyum', 'paylaşım'],
    context: 'Paylaşımda uyum ve ölçü güçlüdür. Aşırılık sorun çıkarır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos3',
    card: 'The Devil',
    position: 3,
    upright:
      'Şeytan, mali paylaşımda bağımlılık veya çıkar ilişkilerini işaret eder. Kaynaklar kontrol aracı olabilir.',
    reversed:
      'Ters Şeytan, mali bağımlılıklardan özgürleşmeyi gösterir. Kaynakların esareti son bulabilir.',
    keywords: ['bağımlılık', 'çıkar', 'özgürlük', 'kontrol'],
    context:
      'Paylaşımda çıkar ve bağımlılık riski var. Özgürlük için sınırlar şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos3',
    card: 'The Tower',
    position: 3,
    upright:
      'Kule, mali paylaşımda ani kriz veya değişiklikleri gösterir. Güvensiz temeller yıkılabilir.',
    reversed:
      'Ters Kule, krizlerin ertelendiğini veya gizlendiğini gösterir. Geçici çözümler kalıcı sorunlara yol açabilir.',
    keywords: ['kriz', 'değişim', 'yıkım', 'temel'],
    context: 'Paylaşımda krizler olabilir. Sağlam temel şarttır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos3',
    card: 'The Star',
    position: 3,
    upright:
      'Yıldız, mali paylaşımda umut ve iyileşmeyi simgeler. Ortak kaynaklar geleceğe güvenle aktarılabilir.',
    reversed:
      'Ters Yıldız, mali paylaşımda umutsuzluk veya güvensizliğe işaret eder. İnanç eksikliği sorun yaratır.',
    keywords: ['umut', 'iyileşme', 'güven', 'paylaşım'],
    context: 'Paylaşımda umut ve iyileşme var. Güven kaybı risk oluşturur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos3',
    card: 'The Moon',
    position: 3,
    upright:
      'Ay, mali konularda belirsizlik ve yanılsamalara işaret eder. Paylaşımda netlik arayışı önemlidir.',
    reversed:
      'Ters Ay, mali konularda sisin dağılması ve netleşmeyi simgeler. Şüpheler azalabilir.',
    keywords: ['belirsizlik', 'yanılsama', 'netlik', 'güven'],
    context: 'Paylaşımda belirsizlik var. Netlik sağlanınca güven artar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos3',
    card: 'The Sun',
    position: 3,
    upright:
      'Güneş, mali paylaşımda bolluk ve netliği gösterir. Açık ve mutlu bir birliktelik kaynakları güçlendirir.',
    reversed:
      'Ters Güneş, mali paylaşımda sahte güvenlik ve yüzeysel iyimserliği işaret eder. Gerçekler göz ardı edilmemeli.',
    keywords: ['bolluk', 'netlik', 'mutluluk', 'açıklık'],
    context:
      'Paylaşımda mutluluk ve bolluk güçlüdür. Sahte iyimserlik risk oluşturur.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos3',
    card: 'Judgement',
    position: 3,
    upright:
      'Mahkeme, mali konularda hesaplaşma ve yenilenmeyi gösterir. Ortak kaynaklarda yeni kararlar alınabilir.',
    reversed:
      'Ters Mahkeme, mali sorumluluklardan kaçınmayı veya hataları tekrar etmeyi işaret eder.',
    keywords: ['hesaplaşma', 'yenilenme', 'sorumluluk', 'karar'],
    context:
      'Paylaşımda hesaplaşma ve yenilenme zamanı. Sorumluluktan kaçmak sorun yaratır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos3',
    card: 'The World',
    position: 3,
    upright:
      'Dünya, mali paylaşımda bütünlük ve başarıyı simgeler. Ortak kaynaklarda tamamlanma ve uyum sağlanır.',
    reversed:
      'Ters Dünya, mali paylaşımda eksik kalan veya tamamlanmamış konuları işaret eder. Uyum gecikebilir.',
    keywords: ['tamamlanma', 'başarı', 'uyum', 'denge'],
    context:
      'Paylaşımda bütünlük ve başarı var. Eksikler tamamlanmazsa uyum gecikir.',
    group: 'Majör Arkana',
  },
  // =========================
  // CUPS — KUPALAR (14)
  // =========================
  {
    id: 'ace_of_cups_ma_pos3',
    card: 'Ace of Cups',
    position: 3,
    upright:
      'Duygusal güven ve iyi niyet, para paylaşımına yumuşak bir kapı açar. Birlikte “biz” bütçesi kurmak kolaylaşır.',
    reversed:
      'Duyguların bastırılması veya kırgınlık, cömertliği kısar. Paylaşım kalbi değil, zorunluluğu izler.',
    keywords: ['cömertlik', 'duygu güveni', 'başlangıç', 'akış'],
    context:
      'Kalp açıkken paylaşım akar. Kırgınlık varsa musluk kısılır. Önce duygusal iklimi onarın.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ma_pos3',
    card: 'Two of Cups',
    position: 3,
    upright:
      'Karşılıklılık ve eşitlik, para konusunda da doğal denge yaratır. “Ben–sen” değil, “biz” hissi güçlenir.',
    reversed:
      'Küçük kırgınlıklar ve yanlış anlaşılmalar, eşit paylaşım dengesini bozar. Önce ilişki sözleşmesini tazeleyin.',
    keywords: ['karşılıklılık', 'eşitlik', 'uyum', 'bağ'],
    context:
      'Uygun zeminde adil paylaşım mümkündür. Mikro çatlaklar büyümeden konuşulmalı.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ma_pos3',
    card: 'Three of Cups',
    position: 3,
    upright:
      'Kutlamalar ve ortak etkinlikler için beraber bütçe ayırmak keyfi artırır. Sosyal harcamalar paylaşılabilir.',
    reversed:
      'Sosyal çevre etkisi ve dağınık harcamalar bütçeyi şaşırtır. Aşırıya kaçan eğlence çatışma doğurur.',
    keywords: ['kutlama', 'paylaşım', 'topluluk', 'eğlence'],
    context:
      'Birlikte harcama keyiflidir; sınırlar konuşulursa sorun yaşanmaz.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ma_pos3',
    card: 'Four of Cups',
    position: 3,
    upright:
      'Memnuniyetsizlik ve ilgisizlik, bütçe planına katılımı düşürebilir. Fırsatlar gözden kaçabilir.',
    reversed:
      'Şükran ve farkındalık yükselince, adil paylaşım için yeni istek oluşur. Tazelenen motivasyon bütçeyi canlandırır.',
    keywords: ['tatminsizlik', 'fırsat', 'şükran', 'farkındalık'],
    context:
      'İlgiyi artırmak paylaşıma ivme verir. Yeni teklifleri duymaya açılın.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ma_pos3',
    card: 'Five of Cups',
    position: 3,
    upright:
      'Geçmiş mali hayal kırıklıkları şimdiki paylaşımı gölgeler. Kayıp odaklı zihin kıstırır.',
    reversed:
      'Affediş ve öğrenilmiş dersler, yeni düzenin kurulmasına izin verir. Kalan imkânlar güçlendirilir.',
    keywords: ['kayıp', 'yas', 'öğrenme', 'toparlanma'],
    context:
      'Geçmişle barışmadan adil paylaşım zor. Dersi alın, çerçeveyi yenileyin.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ma_pos3',
    card: 'Six of Cups',
    position: 3,
    upright:
      'Paylaşımda doğal cömertlik ve sadelik görülür. Geçmiş alışkanlıklar bütçeye sıcaklık katar.',
    reversed:
      'Nostaljiye takılmak gerçek ihtiyaçları örter. Eski kalıplar yeni hedeflere uymayabilir.',
    keywords: ['nostalji', 'cömertlik', 'alışkanlık', 'basitlik'],
    context: 'Sıcak paylaşım var; ama bugünün gerçeklerine uyum şart.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ma_pos3',
    card: 'Seven of Cups',
    position: 3,
    upright:
      'Seçenek bolluğu kafa karıştırır; hedef netliği olmadan bütçe dağılır. Hayaller gerçekçi kalemlere indirilmeli.',
    reversed:
      'Ayıklama ve netleşme başlar; öncelik setleri paylaşımı kolaylaştırır. Sis dağılır.',
    keywords: ['seçenek', 'hayal', 'netlik', 'öncelik'],
    context: 'Listeleri sadeleştirin. Net kriter, adil payı belirler.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ma_pos3',
    card: 'Eight of Cups',
    position: 3,
    upright:
      'Artık değeri kalmayan harcama alışkanlıklarını bırakma zamanı. Anlamlı hedeflere kaynak kaydırılır.',
    reversed:
      'Kal–git ikilemi ekonomik kararları erteler. Yarım bırakılan niyetler bütçeyi sallar.',
    keywords: ['bırakış', 'anlam', 'yeniden yön', 'ikilem'],
    context: 'Anlamsızı bırakıp değere dönmek paylaşımı rahatlatır.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ma_pos3',
    card: 'Nine of Cups',
    position: 3,
    upright:
      'Kişisel tatmin ve küçük lüksler bütçede yer bulur. Paylaşım iyi niyetle sürer.',
    reversed:
      'Yüzeysel hazlar kalıcı doyumu engeller; “ben” odaklı harcama çatışma yaratır.',
    keywords: ['tatmin', 'haz', 'denge', 'minnet'],
    context: 'Mutluluk kalemleri olabilir; adalet hissi korunmalı.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ma_pos3',
    card: 'Ten of Cups',
    position: 3,
    upright:
      'Aile ve birlik duygusu mali kararları kolaylaştırır. Ortak mutluluk hedefleri bütçeyi birleştirir.',
    reversed:
      'İdeal tablo baskısı gerçekleri örter; görünmeyen gerginlik bütçeyi zorlar.',
    keywords: ['aile', 'uyum', 'birlik', 'gerçekçilik'],
    context: 'Birlik vizyonu güçlü; ancak sahicilik kaybolmamalı.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ma_pos3',
    card: 'Page of Cups',
    position: 3,
    upright:
      'Yaratıcı, küçük fikirler para yönetimine tazelik katar. Esnek ama iyi niyetli paylaşım görülür.',
    reversed:
      'Aşırı hassasiyet ve çocukça kaçış, bütçe konuşmalarını baltalar. Somut plana ihtiyaç var.',
    keywords: ['yaratıcılık', 'esneklik', 'hassasiyet', 'başlangıç'],
    context: 'Nazik iletişimle yeni bir bütçe tarzı filizlenir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ma_pos3',
    card: 'Knight of Cups',
    position: 3,
    upright:
      'Romantik idealler cömertliği artırır; jestler bütçeye yansır. Uyum arayışı yüksektir.',
    reversed:
      'Vaat–gerçek uyumsuzluğu güvensizlik yaratır. Tutarsızlık, paylaşımı zorlar.',
    keywords: ['idealizm', 'jest', 'tutarlılık', 'uyum'],
    context: 'Nazik yaklaşım güzel; süreklilik ve plan şart.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ma_pos3',
    card: 'Queen of Cups',
    position: 3,
    upright:
      'Empati ve duygu yönetimi, adil paylaşımı kolaylaştırır. Güvenli duygusal alan bütçeye de yansır.',
    reversed:
      'Sınır erimesi veya duygusal manipülasyon, finansal dengeyi bozar.',
    keywords: ['empati', 'şefkat', 'sınır', 'denge'],
    context: 'Şefkatli ama sınırları net bir bütçe ihtiyacı var.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ma_pos3',
    card: 'King of Cups',
    position: 3,
    upright:
      'Duygusal olgunluk ve sükûnet, para konuşmalarına istikrar katar. Krizde bile denge korunur.',
    reversed:
      'Bastırılmış duygu ve pasif agresif tavır, para paylaşımında güveni aşındırır.',
    keywords: ['olgunluk', 'sükûnet', 'güven', 'liderlik'],
    context: 'Sakin liderlik adil paylaşımı mümkün kılar.',
    group: 'Kupalar',
  },

  // =========================
  // SWORDS — KILIÇLAR (14)
  // =========================
  {
    id: 'ace_of_swords_ma_pos3',
    card: 'Ace of Swords',
    position: 3,
    upright:
      'Net karar ve şeffaf sözleşme bütçeyi hizalar. Gerçekleri masaya koymak çözüm getirir.',
    reversed:
      'Bulanık iletişim ve yarım doğrular, para paylaşımında güvensizlik doğurur.',
    keywords: ['netlik', 'karar', 'şeffaflık', 'hakikat'],
    context: 'Keskin bir plan ve tanım, adaleti sağlar.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ma_pos3',
    card: 'Two of Swords',
    position: 3,
    upright:
      'Karar felci bütçe kararlarını erteler. Tarafsız kalma isteği dengeyi geciktirir.',
    reversed:
      'Kaçınılan yüzleşme gündeme gelir; duyguyu dahil etmek düğümü çözer.',
    keywords: ['ikilem', 'kaçınma', 'yüzleşme', 'denge'],
    context: 'Kararı netleştirmek adil paylaşımı açar.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ma_pos3',
    card: 'Three of Swords',
    position: 3,
    upright:
      'Kırıcı sözler ve hayal kırıklığı, para konuşmalarını sertleştirir. Onarım olmadan ilerlemek zorlaşır.',
    reversed:
      'İyileşme niyetiyle şefkatli diyalog, bütçe birliğini yeniden kurar.',
    keywords: ['kırgınlık', 'acı', 'onarı', 'ifade'],
    context: 'Önce yara sarılmalı; sonra plan konuşulmalı.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ma_pos3',
    card: 'Four of Swords',
    position: 3,
    upright:
      'Mola ve düşünme, sağlıklı mali strateji getirir. Acele kararlar durdurulur.',
    reversed:
      'Dinlenme reddi tükenmişlik yaratır; yanlış bütçe adımları çoğalır.',
    keywords: ['mola', 'strateji', 'sükûnet', 'iyileşme'],
    context: 'Sakin zihin, adil plan üretir.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ma_pos3',
    card: 'Five of Swords',
    position: 3,
    upright:
      'Haklı çıkma arzusu, para konusunu güç savaşına çevirir. Zafer olsa da bağ zarar görür.',
    reversed: 'Yüz kurtaran çözüm ve özür, finansal barışı mümkün kılar.',
    keywords: ['ego', 'çatışma', 'maliyet', 'uzlaşı'],
    context: 'Onur kırıcı dil değil, çözüm odak kazandırır.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ma_pos3',
    card: 'Six of Swords',
    position: 3,
    upright:
      'Sakin sulara geçiş için kademeli bütçe planı gerekir. Ara çözümler rahatlatır.',
    reversed:
      'Eski yöntemlere dönüş, iyileşmeyi geciktirir. Destek almak faydalı olur.',
    keywords: ['geçiş', 'plan', 'sükûnet', 'adaptasyon'],
    context: 'Aşamalı değişim, paylaşımı korur.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ma_pos3',
    card: 'Seven of Swords',
    position: 3,
    upright:
      'Stratejik yaklaşım gerekli; ancak gizliliğin dozu iyi ayarlanmalı. Şeffaflık sınavı var.',
    reversed: 'Yarım gerçekler güveni aşındırır; itiraf ve hizalama şarttır.',
    keywords: ['strateji', 'giz', 'dürüstlük', 'güven'],
    context: 'Etik çizgiyi netleştirin; sonra plan yapın.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ma_pos3',
    card: 'Eight of Swords',
    position: 3,
    upright:
      'Öz-kısıtlayıcı inançlar mali hareketi felç eder. Çıkış kapısı aslında açıktır.',
    reversed:
      'Çözülme başlar; küçük kanıtlar özgüveni artırır ve bütçe akmaya başlar.',
    keywords: ['öz-kısıt', 'korku', 'özgürleşme', 'kanıt'],
    context: 'Zihindeki prangayı çözmek paylaşıma alan açar.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ma_pos3',
    card: 'Nine of Swords',
    position: 3,
    upright:
      'Kaygı ve felaket senaryoları finansal güveni zayıflatır. Geceler gündüzü bozar.',
    reversed:
      'Gerçeklik kontrolü ve düzen, kaygıyı düşürür; paylaşımda güven artar.',
    keywords: ['kaygı', 'kuruntu', 'gerçeklik', 'düzen'],
    context: 'Kaygı hijyeni, para birliğini güçlendirir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ma_pos3',
    card: 'Ten of Swords',
    position: 3,
    upright:
      'Bir finansal yöntem sona erer; yeni başlangıç kaçınılmazdır. Kapanış şifalıdır.',
    reversed:
      'Toparlanma sürecinde eski hayaletler dönebilir; çerçeve net tutulmalı.',
    keywords: ['bitiş', 'kapanış', 'yeniden doğuş', 'kural'],
    context: 'Eskiyi onurlandırıp yeni plan yazma zamanı.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ma_pos3',
    card: 'Page of Swords',
    position: 3,
    upright:
      'Merak ve veri toplama, akıllı bütçe kurar. Doğrulanan bilgi güçtür.',
    reversed: 'Dedikodu ve acele yargı, para konuşmalarını zehirler.',
    keywords: ['merak', 'veri', 'doğrulama', 'öğrenme'],
    context: 'Kanıtlı bilgiyle adil paylaşım yapılır.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ma_pos3',
    card: 'Knight of Swords',
    position: 3,
    upright:
      'Hızlı karar ve kararlı iletişim bütçeyi toparlar. Stratejiyle birleşen hız sonuç getirir.',
    reversed: 'Aceleciliğin sert üslubu kanalları yakar; direnç doğar.',
    keywords: ['hız', 'kararlılık', 'strateji', 'iletişim'],
    context: 'Sert değil, net hız kazandırır.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ma_pos3',
    card: 'Queen of Swords',
    position: 3,
    upright:
      'Nesnellik ve sınırlar, para paylaşımını adil kılar. Serin akıl rehberdir.',
    reversed: 'Aşırı eleştiri ve sarkazm bağı kırar; şefkat dengesi gerekir.',
    keywords: ['nesnellik', 'sınır', 'adalet', 'iletişim'],
    context: 'Net ama nazik çerçeve güven verir.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ma_pos3',
    card: 'King of Swords',
    position: 3,
    upright:
      'İlkelere dayalı net kurallar ve şeffaf muhasebe güveni büyütür. Etik liderlik şarttır.',
    reversed:
      'Dogmatik ton ve soğuk hüküm, ortak bütçeyi tıkar. Empati eksikliği sorun doğurur.',
    keywords: ['ilke', 'etik', 'kural', 'şeffaflık'],
    context: 'Adil çerçeve + empati = sağlam model.',
    group: 'Kılıçlar',
  },

  // =========================
  // PENTACLES — TILSIMLAR (14)
  // =========================
  {
    id: 'ace_of_pentacles_ma_pos3',
    card: 'Ace of Pentacles',
    position: 3,
    upright:
      'Somut fırsat ve sağlam temel, ortak bütçe için güçlü başlangıç verir. Küçük tohumlar büyür.',
    reversed:
      'Kıtlık zihniyeti ve fırsat kaçırma korkusu, adım atmayı geciktirir.',
    keywords: ['fırsat', 'temel', 'güvence', 'başlangıç'],
    context: 'Somut planla paylaşım kök salar.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ma_pos3',
    card: 'Two of Pentacles',
    position: 3,
    upright:
      'Esnek denge ve akıllı jonglörlük, değişken giderleri yönetir. Öncelik ayarı şarttır.',
    reversed: 'Dağınıklık ve erteleme, ödemeleri aksatır; denge bozulur.',
    keywords: ['denge', 'esneklik', 'öncelik', 'akış'],
    context: 'Ritim kurmak adil paylaşımı korur.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ma_pos3',
    card: 'Three of Pentacles',
    position: 3,
    upright:
      'İşbirliği, rol netliği ve süreç; finansal kaliteyi yükseltir. Görünür emek takdiri artırır.',
    reversed:
      'Rol belirsizliği ve koordinasyon eksikliği, çifte iş ve israfa yol açar.',
    keywords: ['işbirliği', 'rol', 'süreç', 'kalite'],
    context: 'Kim neyi yapıyor netleşirse bütçe akar.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ma_pos3',
    card: 'Four of Pentacles',
    position: 3,
    upright:
      'Güvenlik ihtiyacı, tutumlu bir çerçeve kurar. Aşırı tutma büyümeyi frenleyebilir.',
    reversed:
      'Kontrol–savurganlık salınımı bütçeyi yorar; esnek paylaşım öğrenilmeli.',
    keywords: ['güvenlik', 'kontrol', 'tasarruf', 'esneklik'],
    context: 'Güven + esneklik dengesi aranmalı.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ma_pos3',
    card: 'Five of Pentacles',
    position: 3,
    upright:
      'Kıtlık algısı ve dışlanmışlık hissi, maddi dayanışmayı zayıflatır. Yardım istemek zorlaşır.',
    reversed:
      'Toparlanma işaretleri görünür; destek ağı ve şeffaf konuşma çıkış sağlar.',
    keywords: ['kıtlık', 'destek', 'toparlanma', 'dayanışma'],
    context: 'Birlikte çözüm cesareti bütçeyi iyileştirir.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ma_pos3',
    card: 'Six of Pentacles',
    position: 3,
    upright:
      'Adil verme–alma dengesi kurulursa güven büyür. Koşullar şeffaf olmalı.',
    reversed: 'Borçluluk hissi ve koşullu destek, eşitliği zedeler.',
    keywords: ['adalet', 'paylaşım', 'güç dengesi', 'güven'],
    context: 'Şeffaf anlaşma, adil ekonomiyi kurar.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ma_pos3',
    card: 'Seven of Pentacles',
    position: 3,
    upright:
      'Değerlendirme ve sabır, verimi artırır. Küçük iyileştirmeler çarpan etkisi yaratır.',
    reversed:
      'Batık maliyet inadı veya erken vazgeçiş, kayıp doğurur. Kriter şart.',
    keywords: ['değerlendirme', 'sabır', 'verim', 'pivot'],
    context: 'Ölç–öğren–iyileştir döngüsü bütçeyi güçlendirir.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ma_pos3',
    card: 'Eight of Pentacles',
    position: 3,
    upright:
      'Zanaat disiplini ve istikrarlı çalışma, ortak bütçeye güç katar. Kalite standardı yükselir.',
    reversed:
      'Özensizlik ve çabuk sonuç arzusu, tekrar işe ve israfa yol açar.',
    keywords: ['disiplin', 'kalite', 'pratik', 'odak'],
    context: 'Düzenli emek, güveni büyütür.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ma_pos3',
    card: 'Nine of Pentacles',
    position: 3,
    upright:
      'Bağımsızlık ve öz-değer, ortak konforu destekler. Sınırlar refahı korur.',
    reversed: 'Savurganlık veya aşırı tutumluluk uçları gerginlik yaratır.',
    keywords: ['bağımsızlık', 'konfor', 'sınır', 'öz-değer'],
    context: 'Zarif denge paylaşımı güzelleştirir.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ma_pos3',
    card: 'Ten of Pentacles',
    position: 3,
    upright:
      'Aile sistemi, miras ve uzun vade güvence başlıkları ön plana çıkar. Kurumsal bakış istikrar getirir.',
    reversed: 'Akraba–mülk sürtüşmeleri ve bulanık kurallar, uyumu bozar.',
    keywords: ['aile', 'miras', 'sistem', 'istikrar'],
    context: 'Şeffaf kural seti huzur sağlar.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ma_pos3',
    card: 'Page of Pentacles',
    position: 3,
    upright:
      'Öğrenme ve küçük somut adımlar, bütçe disiplinini başlatır. Hedef yazımı önemlidir.',
    reversed: 'Erteleme ve dağınık odak, fırsatları kaçırır.',
    keywords: ['öğrenme', 'hedef', 'disiplin', 'başlangıç'],
    context: 'Mini hedefler payı adil dağıtır.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ma_pos3',
    card: 'Knight of Pentacles',
    position: 3,
    upright:
      'Yavaş ama emin ilerleme güven verir. Rutin ve tutarlılık paylaşıma istikrar katar.',
    reversed: 'Durağanlık ve esneklik eksikliği motivasyonu düşürür.',
    keywords: ['rutin', 'istikrar', 'tutarlılık', 'öz disiplin'],
    context: 'Güvenilir hız, bütçe barışıdır.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ma_pos3',
    card: 'Queen of Pentacles',
    position: 3,
    upright:
      'Besleyen pratiklik ve kaynak yönetimi kuvvetlidir. Görünmeyen emek görünür olmalı.',
    reversed: 'Aşırı yüklenme ve öz bakım açığı, paylaşımı yorar; delege edin.',
    keywords: ['bakım', 'kaynak', 'pratiklik', 'denge'],
    context: 'Şefkat + pratik çerçeve bütçeyi dengeler.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ma_pos3',
    card: 'King of Pentacles',
    position: 3,
    upright:
      'Stratejik sağlamlık ve uzun vade vizyonu baskındır. Sistem ve mentorluk başarıyı kalıcı kılar.',
    reversed: 'Mikro yönetim ve statü odağı, güveni ve paylaşımı kısar.',
    keywords: ['sağlamlık', 'liderlik', 'sistem', 'vizyon'],
    context: 'Güç–sevgi dengesi, adil ekonomiyi kurar.',
    group: 'Tılsımlar',
  },

  // =========================
  // WANDS — ASALAR (14)
  // =========================
  {
    id: 'ace_of_wands_ma_pos3',
    card: 'Ace of Wands',
    position: 3,
    upright:
      'Yeni gelir fikirleri ve girişim ateşi yükselir. Heves paylaşımı da canlandırır.',
    reversed: 'İlham tıkanması ve erteleme, fırsatların kaçmasına yol açar.',
    keywords: ['ilham', 'başlangıç', 'enerji', 'girişim'],
    context: 'Kıvılcımı plana bağlamak bütçeyi büyütür.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ma_pos3',
    card: 'Two of Wands',
    position: 3,
    upright:
      'Vizyon ve planlama, ortak hedeflerle birleşir. Kontrollü risk alma zamanı.',
    reversed: 'Kararsızlık ve konfor alanı, genişlemeyi geciktirir.',
    keywords: ['vizyon', 'plan', 'risk', 'ufuk'],
    context: 'Ufuk haritası, adil payı görünür kılar.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ma_pos3',
    card: 'Three of Wands',
    position: 3,
    upright:
      'Genişleme ve beklenen getiriler ufukta. Koordinasyon paylaşımı güçlendirir.',
    reversed: 'Gecikmeler ve dar görüşlülük, bütçe moralini düşürür.',
    keywords: ['genişleme', 'zamanlama', 'işbirliği', 'ufuk'],
    context: 'Planı dinamik güncellemek gerekir.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ma_pos3',
    card: 'Four of Wands',
    position: 3,
    upright:
      'Eşik, ev ve kutlama masraflarında ortak yapı kurulur. Temel sağlamdır.',
    reversed:
      'Yarım kalmışlık ve düzensizlik, tören/ev bütçesinde gerginlik yaratır.',
    keywords: ['temel', 'eşik', 'istikrar', 'kutlama'],
    context: 'Önce temel, sonra tören; sıra önemlidir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ma_pos3',
    card: 'Five of Wands',
    position: 3,
    upright:
      'Prova kavgaları ve rekabet, para konuşmalarını dağıtır. Kurallar netleşmeli.',
    reversed: 'Yapılandırılmış diyalog gerilimi üretken kılar.',
    keywords: ['çatışma', 'rekabet', 'kural', 'fasilitasyon'],
    context: 'Oyun kuralları anlaşılırsa verim artar.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ma_pos3',
    card: 'Six of Wands',
    position: 3,
    upright:
      'Görünür başarı ve takdir, ortak motivasyonu yükseltir. Zafer paylaşılınca çoğalır.',
    reversed: 'Görünmeyen emek kırgınlık üretir; şeffaf takdir şart.',
    keywords: ['zafer', 'takdir', 'motivasyon', 'görünürlük'],
    context: 'Başarı hikâyesini birlikte yazın.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ma_pos3',
    card: 'Seven of Wands',
    position: 3,
    upright:
      'Pozisyon savunmak ve sınır koymak gerekebilir. Tutarlılık kazandırır.',
    reversed: 'Aşırı savunma yorar; delege ve destek denge sağlar.',
    keywords: ['savunma', 'sınır', 'kararlılık', 'destek'],
    context: 'Net sınır, adaleti korur.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ma_pos3',
    card: 'Eight of Wands',
    position: 3,
    upright:
      'Hızlı iletişim ve zamanında işlemler fırsat penceresi açar. Akış hızlanır.',
    reversed: 'Gecikmeler ve kanal karmaşası, yanlış ödemelere yol açar.',
    keywords: ['hız', 'iletişim', 'senkron', 'akış'],
    context: 'Sıralama ve rol netliği akışı korur.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ma_pos3',
    card: 'Nine of Wands',
    position: 3,
    upright:
      'Son virajda dayanıklılık önemlidir; bütçe disiplini sürdürülür. Küçük molalar şart.',
    reversed: 'Aşırı tetikte olma ve yorgunluk, tartışma eşiğini düşürür.',
    keywords: ['dayanıklılık', 'tetikte', 'mola', 'süreklilik'],
    context: 'Ritim korundukça sonuç gelir.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ma_pos3',
    card: 'Ten of Wands',
    position: 3,
    upright:
      'Aşırı yük ve sorumluluk, bütçe kalitesini düşürür. Delege ve önceliklendirme gerekli.',
    reversed:
      'Bırakılması gereken harcama–görevler tutuldukça motivasyon kırılır.',
    keywords: ['yük', 'delege', 'öncelik', 'tamamlama'],
    context: 'Sadelik, mali nefes alanı açar.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ma_pos3',
    card: 'Page of Wands',
    position: 3,
    upright:
      'Keşif ve deneme hevesi, ek gelir ve tasarruf fikirleri doğurur. Pilot adımlar faydalı.',
    reversed: 'Dağınık ilgi ve yarıda bırakma, finansal güveni zedeler.',
    keywords: ['keşif', 'heves', 'pilot', 'odak'],
    context: 'Küçük dene–öğren döngüsü bütçeyi büyütür.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ma_pos3',
    card: 'Knight of Wands',
    position: 3,
    upright:
      'Atılganlık ve hız, gelir fırsatlarını artırır; taahhüt mimarisi şarttır.',
    reversed: 'Savruk enerji ve yarıda bırakma, güveni ve nakit akışını bozar.',
    keywords: ['hız', 'atılganlık', 'risk', 'taahhüt'],
    context: 'Cesaret + plan = sürdürülebilirlik.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ma_pos3',
    card: 'Queen of Wands',
    position: 3,
    upright:
      'Karizma ve güven, ortak projelerde kaynak çekebilir. Görünürlük getiriyi artırır.',
    reversed:
      'Onay arayışı ve kıskançlık gölgesi, bütçe birlikteliğini zorlar.',
    keywords: ['karizma', 'liderlik', 'özgüven', 'görünürlük'],
    context: 'Değerle hizalı görünürlük bereket getirir.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ma_pos3',
    card: 'King of Wands',
    position: 3,
    upright:
      'Vizyoner liderlik ve stratejik cesaret, ortak sermayeyi büyütür. Yetki devri ölçek sağlar.',
    reversed: 'Ego ve otoriter ton, işbirliğini ve paylaşımı kısar.',
    keywords: ['vizyon', 'liderlik', 'cesaret', 'ölçek'],
    context: 'Paylaşılan vizyon, adil ve büyük bütçe doğurur.',
    group: 'Asalar',
  },
];

// Kart adına göre pozisyon 3 anlamını bulma fonksiyonu
export const getposition3Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return position3Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getmarriageposition3Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return getposition3Meaning(cardName);
};

// Kart adına göre pozisyon 3 anlamını bulma fonksiyonu (ana index için)
export const getmarriageposition3MeaningByCardName = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  const meaning = getposition3Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 3 anlamlarını alma fonksiyonu
export const getAllposition3Meanings = (): MarriagePositionMeaning[] => {
  return position3Meanings;
};

// pozisyon 3 anlamlarını filtreleme fonksiyonu
export const getposition3MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return position3Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 3 anlamlarını arama
export const searchposition3MeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
  return position3Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position3Meanings,
  getposition3Meaning,
  getAllposition3Meanings,
  getposition3MeaningsByGroup,
  searchposition3MeaningsByKeyword,
};
