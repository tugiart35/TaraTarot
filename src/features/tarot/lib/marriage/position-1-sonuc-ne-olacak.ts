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

import { MarriagePositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position1Meanings: MarriagePositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_ma_pos1',
    card: 'The Fool',
    position: 1,
    upright:
      'Evliliğiniz, özgürce atılmış yeni bir başlangıçla şekillenecek. Sonuç; umut, macera ve yeni yolların açılması olabilir.',
    reversed:
      'Plansızlık ya da aşırı saflık, evlilik sürecinin sonucunu belirsizleştirebilir. Aceleyle atılan adımlar kırılganlık yaratabilir.',
    keywords: ['başlangıç', 'özgürlük', 'umut', 'cesaret'],
    context:
      'Sonuç; yeni bir yolculuğun başlangıcı. Ancak temelsizlik risk barındırıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos1',
    card: 'The Magician',
    position: 1,
    upright:
      'Evliliğiniz, karşılıklı iletişim ve irade gücüyle güçlü bir temel bulacak. Sonuç; yaratıcı ve uyumlu bir ortaklık olabilir.',
    reversed:
      'Yanlış iletişim veya manipülasyon, evliliğin sağlıklı zeminini zayıflatabilir. Sonuç; güveni sorgulatan bir süreç olabilir.',
    keywords: ['yaratma', 'irade', 'iletişim', 'güç'],
    context: 'Sonuç; niyet ve eylem uyumuna bağlı. Şeffaf iletişim şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos1',
    card: 'The High Priestess',
    position: 1,
    upright:
      'Evliliğinizde derin anlayış, sezgi ve içsel bağ öne çıkacak. Sonuç; güvenli ve manevi bir yakınlık olabilir.',
    reversed:
      'Gizlenmiş duygular ya da sırlar, evliliğin sonucunda güvensizlik yaratabilir. Netlik eksikliği, mesafe doğurabilir.',
    keywords: ['sezgi', 'bilgelik', 'giz', 'ruhsal bağ'],
    context:
      'Sonuç; içsel uyum ve sezgiye dayalı bir bağ. Ama sırlar güveni sarsabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos1',
    card: 'The Empress',
    position: 1,
    upright:
      'Evliliğiniz şefkat, bolluk ve üretkenlik üzerine kurulacak. Sonuç; sevgiyle büyüyen bir yaşam olabilir.',
    reversed:
      'Aşırı sahiplenme veya öz bakım eksikliği, evliliğin huzurunu azaltabilir. Sonuç; dengesiz bir bağ olabilir.',
    keywords: ['bolluk', 'sevgi', 'şefkat', 'bereket'],
    context: 'Sonuç; bereketli ve şefkatli bir bağ. Ama denge korunmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos1',
    card: 'The Emperor',
    position: 1,
    upright:
      'Evliliğiniz güven, düzen ve sağlam bir yapı kazanacak. Sonuç; istikrar dolu bir birliktelik olabilir.',
    reversed:
      'Aşırı kontrol ya da katı tavırlar, evliliğin akışını zorlaştırabilir. Sonuç; baskıcı bir düzen olabilir.',
    keywords: ['güven', 'düzen', 'istikrar', 'otorite'],
    context:
      'Sonuç; sağlam ve güvenli bir temel. Ama aşırı katılık sorun olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos1',
    card: 'The Hierophant',
    position: 1,
    upright:
      'Evliliğiniz gelenek, değerler ve ortak inançlarla desteklenecek. Sonuç; köklü ve güvenilir bir bağ olabilir.',
    reversed:
      'Kör gelenekçilik ya da değer çatışmaları, evliliğin sonucunu zorlaştırabilir. Farklılıklar gerilime yol açabilir.',
    keywords: ['gelenek', 'değer', 'uyum', 'bağlılık'],
    context:
      'Sonuç; ortak değerlerle güçlenen bir bağ. Ama katı kurallar gölge olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos1',
    card: 'The Lovers',
    position: 1,
    upright:
      'Evliliğiniz sevgi, uyum ve karşılıklı seçim üzerine kurulacak. Sonuç; güçlü bir kalp birliği olabilir.',
    reversed:
      'Kararsızlık ya da değer çatışmaları, evliliğin sonucunu zorlaştırabilir. Sonuç; belirsizlik ve ikilem olabilir.',
    keywords: ['sevgi', 'uyum', 'karar', 'bağ'],
    context:
      'Sonuç; bilinçli bir seçimle köklenen birliktelik. Ama karar netliği şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos1',
    card: 'The Chariot',
    position: 1,
    upright:
      'Evliliğiniz odak, disiplin ve ortak yön belirleme ile ilerleyecek. Sonuç; güçlü ve hedefe yönelik bir bağ olabilir.',
    reversed:
      'Hedefsizlik ya da çatışan yönler, evliliğin sonucunu belirsiz kılabilir. İlerleme dağılabilir.',
    keywords: ['odak', 'yön', 'disiplin', 'irade'],
    context:
      'Sonuç; net hedefler ve ortak rota. Ama savrulmaya dikkat edilmeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos1',
    card: 'Strength',
    position: 1,
    upright:
      'Evliliğiniz sabır, şefkat ve içsel güçle korunacak. Sonuç; sevgiyle güçlenen bir bağ olabilir.',
    reversed:
      'Öfke ya da gurur, evliliğin huzurunu zayıflatabilir. Sonuç; dengesiz güç çatışmaları olabilir.',
    keywords: ['güç', 'sabır', 'şefkat', 'cesaret'],
    context: 'Sonuç; şefkatle güçlenen bir evlilik. Ama öfke dengelenmeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos1',
    card: 'The Hermit',
    position: 1,
    upright:
      'Evliliğinizde içsel bilgelik, sabır ve derin düşünceler öne çıkacak. Sonuç; olgun ve sakin bir bağ olabilir.',
    reversed:
      'Aşırı içe kapanma veya mesafe, evliliğin sonucunu zorlaştırabilir. Yalnızlık duygusu artabilir.',
    keywords: ['bilgelik', 'sabır', 'içe dönüş', 'olgunluk'],
    context:
      'Sonuç; olgunlukla desteklenen bir evlilik. Ama aşırı mesafe gölge olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos1',
    card: 'The Wheel of Fortune',
    position: 1,
    upright:
      'Evliliğiniz kaderin döngüleriyle desteklenecek. Sonuç; şanslı dönemeçler ve fırsatlar olabilir.',
    reversed:
      'Kontrolsüzlük ya da tekrar eden hatalar, evliliğin sonucunu belirsiz kılabilir. Şans tersine dönebilir.',
    keywords: ['kader', 'döngü', 'değişim', 'şans'],
    context:
      'Sonuç; kaderin desteğiyle ilerleyen bir evlilik. Ama döngüleri fark etmek önemli.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos1',
    card: 'Justice',
    position: 1,
    upright:
      'Evliliğiniz adalet, denge ve dürüstlük üzerine kurulacak. Sonuç; eşitlik ve şeffaflıkla korunacak bir bağ olabilir.',
    reversed:
      'Çifte standart veya adaletsizlik, evliliğin sonucunu zedeleyebilir. Dürüstlükten sapma sorun yaratır.',
    keywords: ['adalet', 'denge', 'dürüstlük', 'eşitlik'],
    context:
      'Sonuç; adil ve dengeli bir evlilik. Ama çifte standart gölge olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos1',
    card: 'The Hanged Man',
    position: 1,
    upright:
      'Evliliğiniz fedakârlık, sabır ve farklı bakış açılarıyla şekillenecek. Sonuç; anlayışla derinleşen bir bağ olabilir.',
    reversed:
      'Kurban rolü ya da atalet, evliliğin sonucunu zorlaştırabilir. İlerleme askıya alınabilir.',
    keywords: ['fedakârlık', 'sabır', 'perspektif', 'teslimiyet'],
    context:
      'Sonuç; sabır ve farklı bakışlarla güçlenen evlilik. Ama atalet riski var.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos1',
    card: 'Death',
    position: 1,
    upright:
      'Evliliğinizde bitişler ve dönüşüm yaşanacak. Sonuç; yenilenme ve taze bir başlangıç olabilir.',
    reversed:
      'Değişime direnç ya da kapanmamış geçmiş, evliliğin sonucunu zorlaştırabilir. İlerleme ertelenebilir.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'başlangıç'],
    context:
      'Sonuç; dönüşüm ve yeni bir doğuş. Ama direnç ilerlemeyi engelleyebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos1',
    card: 'Temperance',
    position: 1,
    upright:
      'Evliliğiniz denge, uyum ve ölçülülük üzerine kurulacak. Sonuç; huzurlu ve sabırlı bir bağ olabilir.',
    reversed:
      'Aşırılıklar ya da sabırsızlık, evliliğin sonucunu zorlaştırabilir. Uyum kaybolabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük'],
    context:
      'Sonuç; ölçülü ve dengeli bir evlilik. Ama uçlara kaçmak sorun olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos1',
    card: 'The Devil',
    position: 1,
    upright:
      'Evliliğinizde güçlü tutku ve bağlanma öne çıkacak. Sonuç; derin ama kimi zaman kısıtlayıcı bir birliktelik olabilir.',
    reversed:
      'Bağımlılık zincirlerini kırmak, evliliğin sonucunda özgürleşmeyi getirecek. Sonuç; daha sağlıklı bir bağ olabilir.',
    keywords: ['tutku', 'bağlılık', 'bağımlılık', 'özgürleşme'],
    context: 'Sonuç; tutkulu ve yoğun bir bağ. Ama özgürlük alanı korunmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos1',
    card: 'The Tower',
    position: 1,
    upright:
      'Evliliğiniz ani değişimler ve farkındalıklarla şekillenecek. Sonuç; eski temellerin yıkılıp yeninin kurulması olabilir.',
    reversed:
      'Ertelenen krizler, evliliğin sonucunu sarsıcı kılabilir. Belirsizlikler daha da büyüyebilir.',
    keywords: ['yıkım', 'farkındalık', 'yeniden inşa', 'kriz'],
    context:
      'Sonuç; eskiyi yıkıp yeniye yer açan dönüşüm. Ama krizler ertelenirse büyüyebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos1',
    card: 'The Star',
    position: 1,
    upright:
      'Evliliğiniz umut, şifa ve ilham üzerine kurulacak. Sonuç; huzur ve yenilenme getirecek.',
    reversed:
      'Umutsuzluk ya da güven kaybı, evliliğin sonucunu zayıflatabilir. Enerji düşebilir.',
    keywords: ['umut', 'şifa', 'ilham', 'yenilenme'],
    context: 'Sonuç; umutla beslenen bir evlilik. Ama güven kaybı riski var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos1',
    card: 'The Moon',
    position: 1,
    upright:
      'Evliliğinizde sezgi, hayaller ve kimi zaman belirsizlik öne çıkacak. Sonuç; duygusal bir derinlik olabilir.',
    reversed:
      'Yanılsamalar veya korkular, evliliğin sonucunu karıştırabilir. Yanlış varsayımlar sorun doğurabilir.',
    keywords: ['sezgi', 'hayal', 'belirsizlik', 'korku'],
    context:
      'Sonuç; sezgilerle derinleşen bir evlilik. Ama sisli alanlar gölge yaratabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos1',
    card: 'The Sun',
    position: 1,
    upright:
      'Evliliğiniz neşe, açıklık ve sıcaklıkla parlayacak. Sonuç; mutlu ve aydınlık bir birliktelik olabilir.',
    reversed:
      'Sahte mutluluk ya da yüzeysel uyum, evliliğin sonucunu zayıflatabilir. Gerçeklikten kopma riski vardır.',
    keywords: ['neşe', 'mutluluk', 'açıklık', 'aydınlık'],
    context: 'Sonuç; neşeli ve sıcak bir bağ. Ama yüzeysellikten uzak durmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos1',
    card: 'Judgement',
    position: 1,
    upright:
      'Evliliğiniz geçmişin dersleriyle yenilenme yaşayacak. Sonuç; affediş ve yeni bir sayfa olabilir.',
    reversed:
      'Geçmişe takılı kalmak ya da aşırı öz yargı, evliliğin sonucunu zorlaştırabilir. Yenilenme gecikebilir.',
    keywords: ['yenilenme', 'yüzleşme', 'affediş', 'karar'],
    context:
      'Sonuç; geçmişten öğrenerek yenilenen bir bağ. Ama geçmişte sıkışma riski var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos1',
    card: 'The World',
    position: 1,
    upright:
      'Evliliğiniz bütünlük, tamamlanma ve kutlamayla sonuçlanacak. Sonuç; başarı ve kalıcı huzur olabilir.',
    reversed:
      'Eksik kalan adımlar ya da tamamlanmamışlık, evliliğin sonucunu zayıflatabilir. Döngü kapanmazsa huzursuzluk sürebilir.',
    keywords: ['tamamlanma', 'bütünlük', 'kutlama', 'denge'],
    context:
      'Sonuç; tamamlanmış ve güçlü bir birliktelik. Ama eksikler tamamlanmalı.',
    group: 'Majör Arkana',
  },
  //-- Kupalar --//
  {
    id: 'ace_of_cups_ma_pos1',
    card: 'Ace of Cups',
    position: 1,
    upright:
      'Evliliğinizin sonucu duygusal bir başlangıç, kalbin tamamen açılması olacak. Bolluk ve saf sevgi ilişkide akacak.',
    reversed:
      'Bastırılmış duygular veya duygusal tıkanıklık, evliliğin sonucunu gölgeleyebilir. İfade eksikliği bağın gücünü azaltabilir.',
    keywords: ['başlangıç', 'sevgi', 'açılım', 'şefkat'],
    context:
      'Sonuç; kalpten doğan yeni bir sevgi akışı. Ama duygular bastırılırsa zorluk olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ma_pos1',
    card: 'Two of Cups',
    position: 1,
    upright:
      'Sonuç; karşılıklı sevgi, eşit bağ ve uyumla dolu bir evlilik olacak. İlişki iki kalbin birleşmesiyle güçlenecek.',
    reversed:
      'Yanlış anlaşılmalar ya da dengesiz paylaşım, evliliğin sonucunu zorlayabilir. Uyum için net iletişim şart.',
    keywords: ['birlik', 'uyum', 'ortaklık', 'karşılıklılık'],
    context:
      'Sonuç; eşit ve dengeli bir bağ. Ama küçük iletişim hataları risk taşıyabilir.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ma_pos1',
    card: 'Three of Cups',
    position: 1,
    upright:
      'Evliliğiniz neşe, kutlama ve güçlü bir sosyal destekle sürecek. Sonuç; mutluluk ve birlik içinde paylaşım olacak.',
    reversed:
      'Aşırı sosyal baskı ya da dış müdahaleler, evliliğin sonucunu gölgeleyebilir. Sınırlar korunmalı.',
    keywords: ['kutlama', 'dostluk', 'neşe', 'dayanışma'],
    context:
      'Sonuç; kutlama ve destek dolu bir evlilik. Ama dış etkilere dikkat edilmeli.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ma_pos1',
    card: 'Four of Cups',
    position: 1,
    upright:
      'Sonuç; evlilikte tatmin ve huzur olsa da zamanla monotonluk ihtimali var. Farkındalıkla bağ canlı kalabilir.',
    reversed:
      'İçsel sıkıntıların çözülmesiyle evlilikte canlanma olabilir. Yenilik arayışı bağa nefes getirir.',
    keywords: ['tatmin', 'durgunluk', 'farkındalık', 'yenilenme'],
    context:
      'Sonuç; huzurlu ama monoton bir dönem. Yeniliklerle canlılık korunmalı.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ma_pos1',
    card: 'Five of Cups',
    position: 1,
    upright:
      'Evliliğin sonucu kayıpları kabullenmek ve yeniden inşa etmek olabilir. Olumsuzluklar olsa da umut korunacak.',
    reversed:
      'Yasın geride bırakılmasıyla birlikte yeniden umut filizlenecek. Sonuç; yeni bir sayfa açma şansı.',
    keywords: ['kayıp', 'yas', 'umut', 'kabullenme'],
    context:
      'Sonuç; kayıplardan öğrenilen derslerle yeni bir başlangıç. Umut korunmalı.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ma_pos1',
    card: 'Six of Cups',
    position: 1,
    upright:
      'Sonuç; geçmişten gelen sıcaklık ve anıların üzerine kurulmuş bir evlilik olacak. Saf sevgi bağın temelini güçlendirecek.',
    reversed:
      'Geçmişe aşırı bağlılık, evliliğin sonucunu kısıtlayabilir. İleriye bakmak şart.',
    keywords: ['nostalji', 'masumiyet', 'anı', 'sıcaklık'],
    context:
      'Sonuç; geçmişin şefkatiyle beslenen bir bağ. Ama ileriye dönük kalmak önemli.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ma_pos1',
    card: 'Seven of Cups',
    position: 1,
    upright:
      'Evliliğinizde birçok hayal ve seçenek önünüze çıkacak. Sonuç; doğru seçimlerle güzellik, yanlışlarla karmaşa olabilir.',
    reversed:
      'Hayallerden sıyrılıp gerçekçi seçimler yapıldığında evlilik daha sağlam ilerleyecek.',
    keywords: ['hayal', 'seçenek', 'karar', 'fırsat'],
    context:
      'Sonuç; hayallerle şekillenen bir evlilik. Gerçeklik seçimlerde belirleyici olacak.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ma_pos1',
    card: 'Eight of Cups',
    position: 1,
    upright:
      'Sonuç; yüzeysel şeylerden uzaklaşıp daha derin bir bağ arayışı olacak. Evliliğinizde anlam odaklı bir yolculuk yaşanabilir.',
    reversed:
      'Kopuş ya da uzaklaşma kararsızlığı evliliğin sonucunu belirsizleştirebilir. Kararlılık şart.',
    keywords: ['arayış', 'anlam', 'dönüşüm', 'karar'],
    context:
      'Sonuç; daha derin anlamlara yönelen bir evlilik. Kararsızlık riski var.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ma_pos1',
    card: 'Nine of Cups',
    position: 1,
    upright:
      'Evliliğinizde duygusal tatmin ve mutluluk ön planda olacak. Sonuç; dileklerin gerçekleşmesi gibi bir huzur hali.',
    reversed:
      'Yüzeysel tatminler, evliliğin sonucunda kalıcı doyumu engelleyebilir. Daha derin bağ aranmalı.',
    keywords: ['mutluluk', 'tatmin', 'huzur', 'bolluk'],
    context:
      'Sonuç; dileklerin gerçekleştiği huzurlu bir bağ. Ama yüzeysel kalmamalı.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ma_pos1',
    card: 'Ten of Cups',
    position: 1,
    upright:
      'Sonuç; aile huzuru, sevgi dolu bir yuva ve kalıcı mutluluk olacak. Tamamlanmış bir mutluluk tablosu.',
    reversed:
      'Hayaller ve gerçekler arasındaki uyumsuzluk, evliliğin sonucunu zorlayabilir. Gerçekçi uyum sağlanmalı.',
    keywords: ['aile', 'mutluluk', 'uyum', 'tamamlanma'],
    context:
      'Sonuç; huzurlu ve sevgi dolu bir aile hayatı. Ama beklentilerle gerçekler dengelenmeli.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ma_pos1',
    card: 'Page of Cups',
    position: 1,
    upright:
      'Sonuç; masumiyet, romantizm ve yaratıcı duygular evliliğinizi şekillendirecek. İlişki saf sevgiyle renklenecek.',
    reversed:
      'Çocuksuluk ya da duygusal olgunluk eksikliği, evliliğin sonucunu zorlayabilir.',
    keywords: ['romantizm', 'masumiyet', 'yaratıcılık', 'duyarlılık'],
    context:
      'Sonuç; saf duygularla dolu bir evlilik. Ama olgunluk dengesi gerekebilir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ma_pos1',
    card: 'Knight of Cups',
    position: 1,
    upright:
      'Evliliğiniz romantizm, zarafet ve kalpten gelen adımlarla ilerleyecek. Sonuç; idealist ama sevgi dolu bir bağ.',
    reversed:
      'Tutarsız vaatler ya da aşırı idealizm, evliliğin sonucunu zedeleyebilir. Gerçekçilik önemli.',
    keywords: ['romantizm', 'idealizm', 'zarafet', 'tutku'],
    context:
      'Sonuç; romantik ve zarif bir evlilik. Ama ayakların yere basması gerekebilir.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ma_pos1',
    card: 'Queen of Cups',
    position: 1,
    upright:
      'Sonuç; empati, derin duygular ve güvenli duygusal alan üzerine kurulmuş bir evlilik olacak.',
    reversed:
      'Aşırı hassasiyet ya da sınır eksikliği, evliliğin sonucunu zorlaştırabilir.',
    keywords: ['empati', 'şefkat', 'hassasiyet', 'duygusal denge'],
    context: 'Sonuç; şefkatli ve duygusal bir bağ. Ama sınırlar korunmalı.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ma_pos1',
    card: 'King of Cups',
    position: 1,
    upright:
      'Evliliğiniz duygusal olgunluk ve sakin liderlikle ilerleyecek. Sonuç; güvenli ve dengeli bir birliktelik olacak.',
    reversed:
      'Duyguların bastırılması ya da pasif agresyon, evliliğin sonucunu zedeleyebilir.',
    keywords: ['olgunluk', 'denge', 'liderlik', 'sükunet'],
    context:
      'Sonuç; olgun ve dengeli bir evlilik. Ama duygular bastırılmamalı.',
    group: 'Kupalar',
  },
  //-- Kılıçlar --//
  {
    id: 'ace_of_swords_ma_pos1',
    card: 'Ace of Swords',
    position: 1,
    upright:
      'Sonuç; evliliğinizde netlik, dürüstlük ve güçlü bir zihinsel bağ olacak. Gerçekler açıklıkla ortaya konacak.',
    reversed:
      'Yanlış anlaşılmalar veya iletişimde bulanıklık, evliliğin sonucunu gölgeleyebilir.',
    keywords: ['netlik', 'hakikat', 'karar', 'zihin'],
    context:
      'Sonuç; doğruluk ve açıklığa dayalı bir evlilik. Ama iletişimde netlik korunmalı.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ma_pos1',
    card: 'Two of Swords',
    position: 1,
    upright:
      'Sonuç; kritik kararlar vermeniz gerekebilir. Evliliğinizde dengeyi bulmak için yüzleşme şart olacak.',
    reversed:
      'Kararsızlık ya da kaçış, evliliğin sonucunu belirsiz hale getirebilir.',
    keywords: ['karar', 'denge', 'ikilem', 'yüzleşme'],
    context:
      'Sonuç; karar anlarıyla şekillenecek bir evlilik. Belirsizlik çözülmeli.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ma_pos1',
    card: 'Three of Swords',
    position: 1,
    upright:
      'Sonuç; kalp kırıklıkları veya zor gerçeklerle yüzleşme olabilir. Ama bu süreçten sonra daha net bir bağ doğar.',
    reversed:
      'İyileşme ve affetme süreci, evliliğin sonucunu daha güçlü kılabilir.',
    keywords: ['kalp kırıklığı', 'yüzleşme', 'iyileşme', 'gerçek'],
    context: 'Sonuç; zorlayıcı ama dönüştürücü deneyimlerle netleşen bir bağ.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ma_pos1',
    card: 'Four of Swords',
    position: 1,
    upright:
      'Sonuç; dinginlik, içsel dinlenme ve huzurlu bir alan evliliğinizi besleyecek.',
    reversed:
      'Aşırı stres veya dinlenme eksikliği, evliliğin sonucunu zayıflatabilir.',
    keywords: ['dinlenme', 'huzur', 'zihin', 'toparlanma'],
    context:
      'Sonuç; sakinlik ve huzur temelli bir evlilik. Ama stres yönetilmeli.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ma_pos1',
    card: 'Five of Swords',
    position: 1,
    upright:
      'Sonuç; küçük çatışmalar veya güç savaşları olabilir. Ama doğru iletişimle bunlar aşılır.',
    reversed:
      'Gerginliklerin çözülmesi ve affetme, evliliğin sonucunu iyileştirecek.',
    keywords: ['çatışma', 'ego', 'tartışma', 'çözüm'],
    context:
      'Sonuç; çatışmaların da öğretici olduğu bir evlilik. Bağ onarımla güçlenecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ma_pos1',
    card: 'Six of Swords',
    position: 1,
    upright:
      'Sonuç; zor dönemlerin ardından huzurlu bir geçiş olacak. İlişkiniz dinginliğe doğru ilerleyecek.',
    reversed:
      'Geçmişin izleri evliliğin sonucunu zorlayabilir. Bağışlama şart.',
    keywords: ['geçiş', 'huzur', 'ilerleme', 'denge'],
    context:
      'Sonuç; fırtınadan sonra gelen sakinlik. Geçmiş bırakılırsa bağ güçlenir.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ma_pos1',
    card: 'Seven of Swords',
    position: 1,
    upright:
      'Sonuç; dikkatli planlama ve stratejiyle evliliğiniz ilerleyecek. Gizlilikten kaçınılmalı.',
    reversed: 'Açık olunmayan şeyler gün yüzüne çıkabilir. Şeffaflık şart.',
    keywords: ['strateji', 'plan', 'gizlilik', 'dürüstlük'],
    context:
      'Sonuç; strateji ve açıklık dengesinde bir evlilik. Gizlilik zarar verebilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ma_pos1',
    card: 'Eight of Swords',
    position: 1,
    upright:
      'Sonuç; zihinsel kısıtlamalar veya korkular evliliğinizi sınırlayabilir. Özgürleşmek için cesaret gerek.',
    reversed:
      'Kısıtlamalardan kurtulma süreci, evliliğin sonucunu olumluya çevirecek.',
    keywords: ['kısıt', 'korku', 'özgürlük', 'zihin'],
    context:
      'Sonuç; korkuların çözülmesiyle güçlenen bir bağ. Cesaretle ilerleme lazım.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ma_pos1',
    card: 'Nine of Swords',
    position: 1,
    upright:
      'Sonuç; kaygılar veya uykusuzluk evliliği zorlayabilir. Ancak bu yüzleşmeyle şifa mümkün.',
    reversed: 'Kaygıların azalmasıyla huzur geri dönecek. İyileşme başlayacak.',
    keywords: ['kaygı', 'endişe', 'zihin', 'şifa'],
    context:
      'Sonuç; kaygıları aşarak güçlenen bir evlilik. İç huzur kazanılmalı.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ma_pos1',
    card: 'Ten of Swords',
    position: 1,
    upright:
      'Sonuç; zorlu bir dönemin bitişiyle evlilikte yeni bir başlangıç olacak.',
    reversed:
      'Toparlanma süreci evliliğin sonucunu umutla yeniden inşa edebilir.',
    keywords: ['bitiş', 'yenilenme', 'acı', 'şifa'],
    context: 'Sonuç; zor bir döngünün kapanışıyla doğan yeni sayfa.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ma_pos1',
    card: 'Page of Swords',
    position: 1,
    upright: 'Sonuç; merak, iletişim ve öğrenme isteği evliliği taze tutacak.',
    reversed:
      'Yanlış anlamalar veya dedikodular evliliğin sonucunu zorlayabilir.',
    keywords: ['merak', 'öğrenme', 'iletişim', 'gerçek'],
    context:
      'Sonuç; açık iletişimle güçlenen bir evlilik. Yanlış bilgilere dikkat edilmeli.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ma_pos1',
    card: 'Knight of Swords',
    position: 1,
    upright:
      'Sonuç; hızlı ilerleme, kararlılık ve net adımlar evliliğinizi şekillendirecek.',
    reversed: 'Acelecilik veya öfke, evliliğin sonucunu gölgeleyebilir.',
    keywords: ['kararlılık', 'hız', 'aksiyon', 'zihin'],
    context:
      'Sonuç; kararlı adımlarla güçlenen bir evlilik. Ama acelecilikten kaçınılmalı.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ma_pos1',
    card: 'Queen of Swords',
    position: 1,
    upright:
      'Sonuç; objektif bakış, bilgelik ve net iletişim evliliği sağlıklı kılacak.',
    reversed:
      'Soğukluk veya aşırı eleştiri, evliliğin sonucunu zorlaştırabilir.',
    keywords: ['bilgelik', 'iletişim', 'adalet', 'netlik'],
    context:
      'Sonuç; bilgelikle ve netlikle şekillenen bir evlilik. Ama şefkat korunmalı.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ma_pos1',
    card: 'King of Swords',
    position: 1,
    upright:
      'Sonuç; stratejik düşünce, dürüstlük ve adalet evliliğinizi yönlendirecek.',
    reversed:
      'Katılık veya iletişimde sertlik evliliğin sonucunu zorlayabilir.',
    keywords: ['adalet', 'mantık', 'dürüstlük', 'otorite'],
    context:
      'Sonuç; dürüstlük ve stratejiyle ilerleyen bir evlilik. Ama katılığa dikkat.',
    group: 'Kılıçlar',
  },

  //-- Asalar --//
  {
    id: 'ace_of_wands_ma_pos1',
    card: 'Ace of Wands',
    position: 1,
    upright:
      'Sonuç; evliliğinizde yeni bir enerji, tutku ve başlangıç kıvılcımı olacak. İlişkiniz canlılıkla büyüyecek.',
    reversed:
      'Gecikmiş başlangıçlar veya motivasyon eksikliği, evliliğin sonucunu gölgeleyebilir.',
    keywords: ['başlangıç', 'tutku', 'enerji', 'yaratıcılık'],
    context:
      'Sonuç; tutkuyla başlayan canlı bir evlilik. Ama motivasyon korunmalı.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ma_pos1',
    card: 'Two of Wands',
    position: 1,
    upright:
      'Sonuç; ortak vizyon, planlama ve geleceğe dair kararlılık evliliğinizi yönlendirecek.',
    reversed:
      'Belirsizlik veya vizyon eksikliği, evliliğin sonucunu yavaşlatabilir.',
    keywords: ['vizyon', 'plan', 'karar', 'gelecek'],
    context:
      'Sonuç; ortak planlara dayalı bir evlilik. Belirsizlikler çözülmeli.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ma_pos1',
    card: 'Three of Wands',
    position: 1,
    upright:
      'Sonuç; genişleme, işbirliği ve birlikte büyüme olacak. Ufukta yeni fırsatlar var.',
    reversed:
      'Beklentilerin karşılanmaması hayal kırıklığı yaratabilir. Sabır gerekli.',
    keywords: ['büyüme', 'işbirliği', 'vizyon', 'sabır'],
    context:
      'Sonuç; birlikte genişleyen bir evlilik. Ama beklentiler gerçekçi olmalı.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ma_pos1',
    card: 'Four of Wands',
    position: 1,
    upright: 'Sonuç; evlilikte kutlama, istikrar ve güvenli bir yuva olacak.',
    reversed:
      'Geçici düzensizlik ya da evlilik ritüellerinde eksiklik görülebilir.',
    keywords: ['kutlama', 'istikrar', 'yuva', 'güven'],
    context:
      'Sonuç; istikrarlı ve mutlu bir evlilik. Küçük düzensizlikler aşılmalı.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ma_pos1',
    card: 'Five of Wands',
    position: 1,
    upright:
      'Sonuç; fikir ayrılıkları ve küçük rekabetler ilişkiye dinamizm katacak.',
    reversed:
      'Aşırı çatışma evliliğin sonucunu zorlayabilir. Ortak noktalar bulunmalı.',
    keywords: ['çatışma', 'rekabet', 'dinamizm', 'çözüm'],
    context: 'Sonuç; tartışmalarla güçlenen bir evlilik. Çözüm odaklı kalmalı.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ma_pos1',
    card: 'Six of Wands',
    position: 1,
    upright:
      'Sonuç; başarı, zafer ve karşılıklı gurur evliliğinizi süsleyecek.',
    reversed:
      'Takdir eksikliği, evliliğin sonucunu zorlayabilir. Küçük başarılar kutlanmalı.',
    keywords: ['zafer', 'başarı', 'takdir', 'gurur'],
    context:
      'Sonuç; birlikte kazanılan zaferlerle dolu bir evlilik. Ama takdir edilmeli.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ma_pos1',
    card: 'Seven of Wands',
    position: 1,
    upright:
      'Sonuç; evliliğinizi korumak için kararlılık ve savunma göstereceksiniz.',
    reversed: 'Yorgunluk ve savunmasızlık, evliliğin sonucunu zorlaştırabilir.',
    keywords: ['kararlılık', 'savunma', 'mücadele', 'güç'],
    context:
      'Sonuç; korunan ve savunulan bir evlilik. Ama yorgunluk yönetilmeli.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ma_pos1',
    card: 'Eight of Wands',
    position: 1,
    upright: 'Sonuç; hızlı ilerleme ve akıcı iletişimle evliliğiniz gelişecek.',
    reversed: 'Gecikmeler veya iletişim sorunları süreci zorlayabilir.',
    keywords: ['hız', 'iletişim', 'akış', 'ilerleme'],
    context: 'Sonuç; hızlı ve akıcı bir evlilik. Ama gecikmeler önlenmeli.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ma_pos1',
    card: 'Nine of Wands',
    position: 1,
    upright:
      'Sonuç; sabır, dayanıklılık ve son aşamada gösterilen güç evliliğinizi kalıcı kılacak.',
    reversed:
      'Tükenmişlik ya da aşırı temkinlilik, evliliğin sonucunu zorlayabilir.',
    keywords: ['dayanıklılık', 'sabır', 'güç', 'koruma'],
    context:
      'Sonuç; sabırla güçlenen bir evlilik. Ama aşırı yorgunluk engel olabilir.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ma_pos1',
    card: 'Ten of Wands',
    position: 1,
    upright:
      'Sonuç; yoğun sorumluluklarla birlikte bir tamamlama olacak. Çabanız karşılığını verecek.',
    reversed:
      'Aşırı yüklenmek, evliliğin sonucunu zorlayabilir. Sorumluluk paylaşılmalı.',
    keywords: ['yük', 'sorumluluk', 'tamamlama', 'çaba'],
    context: 'Sonuç; emekle şekillenen bir evlilik. Ama yükler paylaşılmalı.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ma_pos1',
    card: 'Page of Wands',
    position: 1,
    upright: 'Sonuç; merak, keşif ve macera ruhu evliliğinizi renklendirecek.',
    reversed:
      'Dikkatsizlik ya da yönsüzlük evliliğin sonucunu zorlaştırabilir.',
    keywords: ['keşif', 'merak', 'macera', 'heves'],
    context:
      'Sonuç; keşiflerle canlı kalan bir evlilik. Ama yönsüzlük engel olabilir.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ma_pos1',
    card: 'Knight of Wands',
    position: 1,
    upright:
      'Sonuç; tutku, cesaret ve hızlı adımlarla dolu bir evlilik olacak.',
    reversed: 'Acelecilik veya sabırsızlık evliliğin sonucunu gölgeleyebilir.',
    keywords: ['cesaret', 'tutku', 'hız', 'hareket'],
    context: 'Sonuç; tutkulu ve cesur bir evlilik. Ama sabır da gerekli.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ma_pos1',
    card: 'Queen of Wands',
    position: 1,
    upright: 'Sonuç; özgüven, karizma ve sıcaklık evliliğinizi besleyecek.',
    reversed: 'Kıskançlık ya da güvensizlik, evliliğin sonucunu zorlayabilir.',
    keywords: ['özgüven', 'karizma', 'sıcaklık', 'liderlik'],
    context:
      'Sonuç; güven ve sıcaklıkla büyüyen bir evlilik. Ama kıskançlık engel olabilir.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ma_pos1',
    card: 'King of Wands',
    position: 1,
    upright:
      'Sonuç; vizyoner liderlik, strateji ve cesaretle evliliğiniz kalıcı olacak.',
    reversed:
      'Aşırı otoriterlik ya da ego, evliliğin sonucunu zorlaştırabilir.',
    keywords: ['liderlik', 'vizyon', 'cesaret', 'strateji'],
    context: 'Sonuç; güçlü vizyonla yönlenen bir evlilik. Ama ego yönetilmeli.',
    group: 'Asalar',
  },
  //-- Tılsımlar --//
  {
    id: 'ace_of_pentacles_ma_pos1',
    card: 'Ace of Pentacles',
    position: 1,
    upright:
      'Sonuç; evliliğinizde sağlam bir başlangıç, maddi güven ve kalıcı fırsatlar olacak.',
    reversed:
      'Kaçırılan fırsatlar ya da maddi güvensizlik, evliliğin sonucunu zorlayabilir.',
    keywords: ['başlangıç', 'fırsat', 'maddi güven', 'istikrar'],
    context:
      'Sonuç; güvenli ve istikrarlı bir evlilik. Ama fırsatlar değerlendirilmezse zorlanabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ma_pos1',
    card: 'Two of Pentacles',
    position: 1,
    upright: 'Sonuç; evliliğinizde denge, uyum ve esneklikle ilerleyiş olacak.',
    reversed:
      'Dengesizlik ve karar verememek, evliliğin sonucunu zorlaştırabilir.',
    keywords: ['denge', 'esneklik', 'uyum', 'karar'],
    context: 'Sonuç; esnek ve dengeli bir evlilik. Ama kararlar net olmalı.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ma_pos1',
    card: 'Three of Pentacles',
    position: 1,
    upright:
      'Sonuç; işbirliği, birlikte çalışma ve ortak hedeflere ulaşma olacak.',
    reversed:
      'Uyumsuzluk veya işbirliği eksikliği, evliliğin sonucunu zayıflatabilir.',
    keywords: ['işbirliği', 'hedef', 'uyum', 'emek'],
    context: 'Sonuç; ortak çabalarla büyüyen bir evlilik. Ama işbirliği şart.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ma_pos1',
    card: 'Four of Pentacles',
    position: 1,
    upright:
      'Sonuç; maddi ve duygusal güvenlik evliliğinizin temelinde olacak.',
    reversed:
      'Aşırı kontrol ya da cimrilik, evliliğin sonucunu zorlaştırabilir.',
    keywords: ['güvenlik', 'istikrar', 'kontrol', 'koruma'],
    context:
      'Sonuç; güvenli bir evlilik. Ama aşırı kontrol ilişkide sıkışma yaratabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ma_pos1',
    card: 'Five of Pentacles',
    position: 1,
    upright:
      'Sonuç; zor zamanlarda dayanışma ve birlikte mücadele öne çıkacak.',
    reversed:
      'Desteksizlik ya da yalnızlık hissi, evliliğin sonucunu zorlayabilir.',
    keywords: ['mücadele', 'dayanışma', 'zorluk', 'yardım'],
    context:
      'Sonuç; zor günlerde birbirine destek olan bir evlilik. Ama yalnızlık hissi çözülmeli.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ma_pos1',
    card: 'Six of Pentacles',
    position: 1,
    upright:
      'Sonuç; adil paylaşım, yardımlaşma ve denge evliliğinizde önemli olacak.',
    reversed:
      'Güç dengesizliği ya da tek taraflı verme, evliliğin sonucunu zorlayabilir.',
    keywords: ['paylaşım', 'denge', 'yardım', 'uyum'],
    context:
      'Sonuç; eşit paylaşıma dayalı bir evlilik. Ama tek taraflılık engel olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ma_pos1',
    card: 'Seven of Pentacles',
    position: 1,
    upright:
      'Sonuç; sabır, emek ve uzun vadeli yatırım evliliğinizi büyütecek.',
    reversed:
      'Sabırsızlık veya verimsizlik, evliliğin sonucunu zorlaştırabilir.',
    keywords: ['sabır', 'emek', 'yatırım', 'bekleyiş'],
    context:
      'Sonuç; sabırla büyüyen bir evlilik. Ama acelecilik engel olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ma_pos1',
    card: 'Eight of Pentacles',
    position: 1,
    upright:
      'Sonuç; disiplin, çaba ve sürekli gelişim evliliğinizi güçlendirecek.',
    reversed: 'İlgisizlik ya da özensizlik, evliliğin sonucunu zayıflatabilir.',
    keywords: ['çaba', 'disiplin', 'gelişim', 'ustalık'],
    context:
      'Sonuç; emekle büyüyen bir evlilik. Ama özensizlikten kaçınılmalı.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ma_pos1',
    card: 'Nine of Pentacles',
    position: 1,
    upright:
      'Sonuç; özgüven, refah ve bağımsızlıkla dengeli bir evlilik olacak.',
    reversed: 'Bağımlılık ya da savurganlık, evliliğin sonucunu zorlayabilir.',
    keywords: ['refah', 'özgüven', 'bağımsızlık', 'denge'],
    context:
      'Sonuç; özgüvenli ve dengeli bir evlilik. Ama bağımlılıktan kaçınılmalı.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ma_pos1',
    card: 'Ten of Pentacles',
    position: 1,
    upright:
      'Sonuç; kalıcı mutluluk, aile desteği ve nesiller arası bağlarla güçlenen bir evlilik olacak.',
    reversed:
      'Ailevi anlaşmazlıklar veya maddi sorunlar, evliliğin sonucunu zorlaştırabilir.',
    keywords: ['aile', 'istikrar', 'miras', 'kalıcılık'],
    context:
      'Sonuç; aileyle köklü bir evlilik. Ama aile sorunları engel olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ma_pos1',
    card: 'Page of Pentacles',
    position: 1,
    upright:
      'Sonuç; öğrenme, gelişim ve yeni temellerle evliliğiniz şekillenecek.',
    reversed: 'İsteksizlik ya da erteleme, evliliğin sonucunu yavaşlatabilir.',
    keywords: ['öğrenme', 'gelişim', 'başlangıç', 'temel'],
    context:
      'Sonuç; öğrenerek büyüyen bir evlilik. Ama ertelemeden kaçınılmalı.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ma_pos1',
    card: 'Knight of Pentacles',
    position: 1,
    upright:
      'Sonuç; sabırlı, istikrarlı ve güvenli adımlarla ilerleyen bir evlilik olacak.',
    reversed: 'Durağanlık ya da inatçılık, evliliğin sonucunu zorlaştırabilir.',
    keywords: ['istikrar', 'sabır', 'güven', 'süreklilik'],
    context:
      'Sonuç; sabırlı ve güvenli bir evlilik. Ama durağanlığa dikkat edilmeli.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ma_pos1',
    card: 'Queen of Pentacles',
    position: 1,
    upright:
      'Sonuç; şefkat, bereket ve pratik destekle evliliğiniz güçlenecek.',
    reversed:
      'Aşırı yüklenme ya da öz bakım eksikliği evliliği zorlaştırabilir.',
    keywords: ['şefkat', 'bereket', 'pratiklik', 'destek'],
    context: 'Sonuç; şefkatle büyüyen bir evlilik. Ama öz bakım unutulmamalı.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ma_pos1',
    card: 'King of Pentacles',
    position: 1,
    upright:
      'Sonuç; güçlü liderlik, maddi güvence ve kalıcılıkla evliliğiniz sağlam olacak.',
    reversed:
      'Aşırı otorite ya da maddi baskı, evliliğin sonucunu zorlaştırabilir.',
    keywords: ['liderlik', 'güven', 'maddi istikrar', 'kalıcılık'],
    context:
      'Sonuç; güvenceyle desteklenen bir evlilik. Ama otorite dengeli olmalı.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 1 anlamını bulma fonksiyonu
export const getPosition1Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return position1Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getmarriagePosition1Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return getPosition1Meaning(cardName);
};

// Kart adına göre pozisyon 1 anlamını bulma fonksiyonu (ana index için)
export const getmarriagePosition1MeaningByCardName = (
  cardName: string
): MarriagePositionMeaning | undefined => {
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
export const getAllPosition1Meanings = (): MarriagePositionMeaning[] => {
  return position1Meanings;
};

// Pozisyon 1 anlamlarını filtreleme fonksiyonu
export const getPosition1MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return position1Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 1 anlamlarını arama
export const searchPosition1MeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
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
