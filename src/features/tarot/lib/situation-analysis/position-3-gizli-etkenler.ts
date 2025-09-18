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

import { SituationAnalysisPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position3Meanings: SituationAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_sa_pos3',
    card: 'The Fool',
    position: 3,
    upright:
      'Joker, bilinçaltınızda spontane olma arzusu, yeniye atlama dürtüsü ve “ya olursa?” merakı çalışıyor olabilir. Farkında olmadan riskleri küçümseyip keşif ihtiyacınızı rasyonel gerekçelerle gizliyor olabilirsiniz.',
    reversed:
      'Ters Joker, bağlanmaktan kaçınma, sorumluluktan ürkme ve erteleme eğilimi gibi gizli kalıpları gösterir. İçerideki belirsizlik korkusu, sizi görünmez frenlerle yerinizde tutuyor olabilir.',
    keywords: ['gizli dürtü', 'risk', 'özgürlük', 'merak', 'bilinçaltı'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_sa_pos3',
    card: 'The Magician',
    position: 3,
    upright:
      'Büyücü, gizli etkilerde niyetinizin gücü ve öz-yeterlilik inancı belirleyici. İçeride “yapabilirim” sesi var; kaynakları görünmez biçimde birbirine bağlıyorsunuz.',
    reversed:
      'Ters Büyücü, kendini sabote eden inançlar, dağınık odak veya manipülasyona maruz kalma riskini işaret eder. İçteki sahtekar sendromu, gücünüzü perdeleyebilir.',
    keywords: ['niyet', 'odak', 'öz-yeterlilik', 'manipülasyon', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_sa_pos3',
    card: 'The High Priestess',
    position: 3,
    upright:
      'Başrahibe, sezgisel bilginin ve rüyaların perde arkasından sizi yönlendirdiğini gösterir. Sözsüz işaretler ve iç ses, görünenden daha güçlü bir rehber.',
    reversed:
      'Ters Başrahibe, sezgiyi bastırma, gizlenen bilgi ve iç sese güvensizliği vurgular. Görmediğinizi sandığınız şey aslında görmezden geldiğiniz gerçektir.',
    keywords: ['sezgi', 'giz', 'bilinçaltı', 'rüyalar', 'iç ses'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_sa_pos3',
    card: 'The Empress',
    position: 3,
    upright:
      'İmparatoriçe, gizli etkide beslenme ihtiyacı, konfor arayışı ve yaratıcılık açlığı bulunur. İçerideki şefkat enerjisi üretkenliği çağırıyor.',
    reversed:
      'Ters İmparatoriçe, öz-bakım eksikliği, onay bağımlılığı ya da rahat alana yapışma eğilimini gösterir. Duygusal doyum arayışı gizliden kararları etkiliyor olabilir.',
    keywords: ['beslenme', 'yaratıcılık', 'konfor', 'öz-bakım', 'gizli ihtiyaç'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_sa_pos3',
    card: 'The Emperor',
    position: 3,
    upright:
      'İmparator, kontrol ve yapı kurma ihtiyacının perde arkasından süreci yönettiğini söyler. Güvenlik arayışı, kuralları görünmezce sıkılaştırır.',
    reversed:
      'Ters İmparator, katılık, otoriteyle gizli çatışma veya güç kaybetme korkusunu vurgular. İçeride “her şeyi ben tutmalıyım” inancı esnekliği kısar.',
    keywords: ['kontrol', 'güvenlik', 'otorite', 'katılık', 'bilinçaltı kalıp'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_sa_pos3',
    card: 'The Hierophant',
    position: 3,
    upright:
      'Aziz, gelenek, aile/kültür normları ve otorite onayı gibi görünmez referansların kararlarınızı etkilediğini gösterir. Alışılmış olan güven verir.',
    reversed:
      'Ters Aziz, dogmaya tepki, kurala gizli başkaldırı veya yanlış rehberliğin izleri olabilir. İçten içe “kendi yolum” çağrısı duyuluyor.',
    keywords: ['gelenek', 'onay', 'öğreti', 'dogma', 'gizli etki'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_sa_pos3',
    card: 'The Lovers',
    position: 3,
    upright:
      'Aşıklar, görünmez düzeyde değerleriniz ve bağlılık ihtiyaçlarınız seçimlerinizi yönlendiriyor. Uyum arzusu kararlara yumuşak bir baskı yapıyor.',
    reversed:
      'Ters Aşıklar, değer çatışması, yakınlık korkusu veya üçgen dinamikleri gibi gizli kalıpları işaret eder. Kaçınma stratejisi seçimleri bulandırabilir.',
    keywords: ['değerler', 'seçim', 'bağ', 'yakınlık', 'gizli çatışma'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_sa_pos3',
    card: 'The Chariot',
    position: 3,
    upright:
      'Savaş Arabası, kontrolü elde tutma ihtiyacı ve kazanma dürtüsü perde arkasından itiş gücü sağlar. Zıtları yönetme beceriniz bilinçaltı bir koz.',
    reversed:
      'Ters Savaş Arabası, yön kaybı korkusu, dağılma ve başarısızlıktan kaçınma gibi gizli tetikleyicileri gösterir. İçsel gerilim kontrolü zayıflatabilir.',
    keywords: ['kontrol', 'irade', 'başarı dürtüsü', 'dağılma', 'gizli tetik'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_sa_pos3',
    card: 'Strength',
    position: 3,
    upright:
      'Güç, sakin cesaret ve öz-şefkatin görünmez desteğiyle ilerlediğinizi söyler. İçteki dayanıklılık, fırtınayı sessizce dengeler.',
    reversed:
      'Ters Güç, bastırılmış öfke, özgüven sarsıntısı veya sabırsızlık gibi gizli dalgalanmaları vurgular. İç hayvanı yumuşatma ihtiyacı var.',
    keywords: ['cesaret', 'öz-şefkat', 'öfke', 'özgüven', 'gizli dalga'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_sa_pos3',
    card: 'The Hermit',
    position: 3,
    upright:
      'Ermiş, içsel bilge ve yalnız kalma ihtiyacının perde arkasından rehberlik ettiğini söyler. İçe dönük işlem, karar kalitesini artırır.',
    reversed:
      'Ters Ermiş, görünmez bir kaçış, izolasyon ya da görünür olmaktan çekinme kalıbını gösterir. Aşırı içe kapanma teması etkili olabilir.',
    keywords: ['iç bilge', 'yalnızlık', 'kaçınma', 'gizlenme', 'sezgi'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_sa_pos3',
    card: 'Wheel of Fortune',
    position: 3,
    upright:
      'Kader Çarkı, döngüler ve zamanlama inançlarının görünmez etkisini vurgular. “Zamanı gelince” fikri sabrı ve stratejiyi şekillendirir.',
    reversed:
      'Ters Kader Çarkı, tekrar eden kalıplar, kötü zamanlama korkusu ve kadercilik eğilimini işaret eder. “Hep bana böyle olur” öyküsü gizlice çalışıyor olabilir.',
    keywords: ['döngü', 'zamanlama', 'şans', 'kadercilik', 'gizli inanç'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_sa_pos3',
    card: 'Justice',
    position: 3,
    upright:
      'Adalet, içte güçlü bir adalet duygusu ve hesap verebilirlik ihtiyacının karar terazisini görünmezce etkilediğini söyler. Hakkaniyet arayışı yön veriyor.',
    reversed:
      'Ters Adalet, suçluluk, öz-yargı ya da taraflı bakış gibi gizli dengesizlikleri gösterir. “Haklı çıkmalıyım” ihtiyacı netliği bozabilir.',
    keywords: ['adalet', 'denge', 'suçluluk', 'taraflılık', 'gizli motiv'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_sa_pos3',
    card: 'The Hanged Man',
    position: 3,
    upright:
      'Asılan Adam, perspektif değişimi ve teslimiyet temasının perde arkasından olgunlaştırıcı etki yaptığını söyler. Askıda kalış, içte anlam üretir.',
    reversed:
      'Ters Asılan Adam, boşuna fedakârlık, erteleme ya da yapışma kalıbını vurgular. Bırakamama hali gizlice enerjiyi tüketir.',
    keywords: ['perspektif', 'teslimiyet', 'feda', 'erteleme', 'gizli bağ'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'death_sa_pos3',
    card: 'Death',
    position: 3,
    upright:
      'Ölüm, dönüşüm isteği ve eskiyi bırakma çağrısının içeriden yükseldiğini gösterir. Bitene tutunmamak, görünmez bir özgürleşme kapısı açar.',
    reversed:
      'Ters Ölüm, değişime direnç, kapanmamış döngüler ve vedadan kaçınma gibi gizli bağları işaret eder. Korku, yeniyi geciktirir.',
    keywords: ['dönüşüm', 'bitiş', 'bırakma', 'direnç', 'gizli bağlar'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_sa_pos3',
    card: 'Temperance',
    position: 3,
    upright:
      'Denge, ölçülülük ve karışımları doğru ayarlama becerisinin perde arkasından süreci yumuşattığını söyler. İçte şifa ritmi çalışır.',
    reversed:
      'Ters Denge, aşırılık, sabırsızlık ve uyumsuz karışımların gizli stres yarattığını gösterir. Doz aşımı netliği gölgeler.',
    keywords: ['ölçü', 'uyum', 'şifa', 'aşırılık', 'gizli gerilim'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_sa_pos3',
    card: 'The Devil',
    position: 3,
    upright:
      'Şeytan, bağımlılıklar, gölge arzular ve kontrol eden anlaşmaların görünmez etkisini vurgular. Kısa vadeli rahatlık, gizlice ipleri çeker.',
    reversed:
      'Ters Şeytan, çözülmek isteyen bağlar, bırakılmaya hazır kalıplar ve özgürleşme ihtiyacını gösterir. Farkındalık zinciri gevşetir.',
    keywords: ['bağımlılık', 'gölge', 'arzu', 'kontrol', 'özgürleşme isteği'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_sa_pos3',
    card: 'The Tower',
    position: 3,
    upright:
      'Kule, temeldeki çatlakların ve gerçeklikle çelişen varsayımların gizli sarsıntılar yarattığını söyler. Yıkım korkusu değişimi erteliyor olabilir.',
    reversed:
      'Ters Kule, ertelenmiş kriz, bastırılmış öfke ve küçük patlamalarla kendini gösteren birikimi işaret eder. Bilinçli boşaltım şart.',
    keywords: ['kriz', 'yıkım', 'çatlak', 'ertelenme', 'gizli basınç'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_sa_pos3',
    card: 'The Star',
    position: 3,
    upright:
      'Yıldız, içteki umut kıvılcımı ve incinebilirliğe izin verme isteğinin görünmez iyileştirici etkisini gösterir. Saf niyet ışık yakar.',
    reversed:
      'Ters Yıldız, umutsuzluk öyküsü, tükenmişlik ve kendini küçümseme kalıplarını vurgular. Işığı perdeleyen sis, içeride üretildi.',
    keywords: ['umut', 'şifa', 'incinebilirlik', 'tükenmişlik', 'gizli ışık'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_sa_pos3',
    card: 'The Moon',
    position: 3,
    upright:
      'Ay, korkular, projeksiyonlar ve belirsizliğin bilinçaltından dalga dalga geldiğini söyler. Semboller rehber; acele hüküm sis yaratır.',
    reversed:
      'Ters Ay, yanılsamadan uyanma eşiği, kaygının kökenini görme ve sisin dağılması yönünde gizli bir itişi gösterir. Gerçek yakın.',
    keywords: ['korku', 'yanılsama', 'belirsizlik', 'projeksiyon', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_sa_pos3',
    card: 'The Sun',
    position: 3,
    upright:
      'Güneş, içte neşe, oyun ve kendini açıkça ifade etme ihtiyacının gizliden güç verdiğini söyler. İç çocuk parlaklık arıyor.',
    reversed:
      'Ters Güneş, görünür olmaktan çekinme, sevilmeme korkusu ve geçici karamsarlık kalıplarını işaret eder. Işık var; çekince perde yapıyor.',
    keywords: ['neşe', 'özgüven', 'görünürlük', 'iç çocuk', 'gizli çekince'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_sa_pos3',
    card: 'Judgement',
    position: 3,
    upright:
      'Mahkeme, iç çağrı, affediş ve yeniden doğuş arzusunun perde arkasından sizi dürttüğünü söyler. Eski hikâyeyi bırakma isteği güçleniyor.',
    reversed:
      'Ters Mahkeme, öz-yargı, hata korkusu ve çağrıyı erteleme kalıplarını vurgular. “Ya geç kaldıysam?” inancı kapıyı kapatır.',
    keywords: ['uyanış', 'affediş', 'çağrı', 'öz-yargı', 'gizli direnç'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_sa_pos3',
    card: 'The World',
    position: 3,
    upright:
      'Dünya, tamamlanma arzusu ve bütünlenme ihtiyacının görünmez motivasyon sağladığını söyler. Döngüyü zarafetle kapatma isteği içten büyür.',
    reversed:
      'Ters Dünya, kapanmamış işler, kapanış korkusu ve eksik entegrasyon kalıplarını işaret eder. Bitirmeden yeniye geçmek içte huzursuzluk yaratır.',
    keywords: ['tamamlanma', 'bütünlük', 'entegrasyon', 'kapanış', 'gizli tema'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Majör Arkana',
  },
  //-- Kupalar --//
  {
    id: 'ace_of_cups_sa_pos3',
    card: 'Ace of Cups',
    position: 3,
    upright:
      'Kupa Ası, bilinçaltınızda sevginin akmasına, duygusal bir yenilenmeye ve kalbi açmaya dönük güçlü bir arzu olduğunu gösterir. İfade edilmemiş duygular ve şefkat ihtiyacı görünmez biçimde kararlarınıza yön veriyor olabilir.',
    reversed:
      'Ters Kupa Ası, bastırılmış hisler, kırılganlıktan kaçınma ve duygusal tıkanıklığın perde arkasında çalıştığını anlatır. Kalbinizin “akmak” isteyen tarafı, incinme korkusuyla kendini geri çekiyor olabilir.',
    keywords: ['duygu', 'şefkat', 'açılma', 'gizli', 'bilinçaltı'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_sa_pos3',
    card: 'Two of Cups',
    position: 3,
    upright:
      'İki Kupa, karşılıklılık, uyum ve görülme ihtiyacının içerde güçlü bir tema olduğunu gösterir. “Eşit bağ” arzusu, fark etmeden seçimlerinizi ve iletişim tonunuzu belirliyor olabilir.',
    reversed:
      'Ters İki Kupa, gizli dengesizlikler, onay bağımlılığı ya da eşitsiz verme-alma kalıplarının ilişki alanını gölgede bıraktığını söyler. İçten içe hoşnutsuzluk, açıkça konuşulamayan beklentilerden besleniyor olabilir.',
    keywords: ['karşılıklılık', 'uyum', 'onay', 'dengesizlik', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_sa_pos3',
    card: 'Three of Cups',
    position: 3,
    upright:
      'Üç Kupa, topluluk desteği, dostluk ve paylaşım ihtiyacının perde arkasında motivasyon sağladığını anlatır. İçeride “birlikte olma” arzusu, neşeyi ve ilhamı çoğaltmak istiyor.',
    reversed:
      'Ters Üç Kupa, dışlanma korkusu, yüzeysel bağlar ya da kıyaslanma hissinin gizli gerilim yarattığını söyler. Sosyal yorgunluk, gerçek ihtiyaçların adlandırılmamasından kaynaklanabilir.',
    keywords: ['topluluk', 'dostluk', 'paylaşım', 'kıyas', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_sa_pos3',
    card: 'Four of Cups',
    position: 3,
    upright:
      'Dört Kupa, içten içe bir tatminsizlik, duygusal uyuşma veya hayatın sunduklarını küçümseme eğiliminin çalıştığını gösterir. Dikkat, mevcut fırsatlardan çok eksik olana odaklanıyor olabilir.',
    reversed:
      'Ters Dört Kupa, uyanma isteği ve şükranla yeniden bağ kurma çağrısının içeride filizlendiğini söyler. Ancak alışkanlıkla kurulan mesafe, canlılığı geri çağırmayı geciktirebilir.',
    keywords: ['tatminsizlik', 'ilgisizlik', 'farkındalık', 'şükran', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_sa_pos3',
    card: 'Five of Cups',
    position: 3,
    upright:
      'Beş Kupa, işlenmemiş yas, pişmanlık ve kayıp anlatılarının perde arkasından görüşünüzü renklendirdiğini gösterir. Geçmiş hayal kırıklıkları, bugünkü olasılıkları gölgeleyebilir.',
    reversed:
      'Ters Beş Kupa, toparlanma ve kabullenme isteğinin içerde güç kazandığını anlatır. Yine de “keşke”lere tutunma, iyileşmeyi yavaşlatabilir.',
    keywords: ['yas', 'kayıp', 'pişmanlık', 'kabul', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_sa_pos3',
    card: 'Six of Cups',
    position: 3,
    upright:
      'Altı Kupa, nostalji, iç çocuk temaları ve güvenli anılara sığınma ihtiyacının görünmez bir çıpa olduğunu söyler. Geçmişteki sıcaklık, bugünkü seçimleri yumuşatabilir.',
    reversed:
      'Ters Altı Kupa, geçmişe tutunma, idealize etme veya “eskisi gibi olsun” arzusunun ilerlemeyi perdelediğini gösterir. Hatıralar ilham olsa da yön, bugünde bulunur.',
    keywords: ['nostalji', 'iç çocuk', 'anı', 'tutunma', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_sa_pos3',
    card: 'Seven of Cups',
    position: 3,
    upright:
      'Yedi Kupa, hayal ve kaçış kalıplarının, seçenek bolluğu karşısında dağılma riskini artırdığını söyler. Fanteziler, gerçek ihtiyaçları örtüyor olabilir.',
    reversed:
      'Ters Yedi Kupa, berraklaşma isteği ve yanılsamalardan sıyrılma çağrısının içeride güçlendiğini gösterir. Net ölçütler, sisin içinden yolu belirginleştirir.',
    keywords: ['hayal', 'kaçış', 'seçenek', 'netlik', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_sa_pos3',
    card: 'Eight of Cups',
    position: 3,
    upright:
      'Sekiz Kupa, daha anlamlı olana yönelme ve geride bırakma çağrısının içerden geldiğini anlatır. Duygusal doygunluk arayışı, sessizce pusulanızı çeviriyor olabilir.',
    reversed:
      'Ters Sekiz Kupa, “gitmeli miyim kalmalı mıyım” ikileminin ve yarım kalmış vedaların perde arkasında enerjinizi tükettiğini gösterir. Belirsiz bağlar adımı zorlaştırabilir.',
    keywords: ['ayrılış', 'anlam arayışı', 'kararsızlık', 'veda', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_sa_pos3',
    card: 'Nine of Cups',
    position: 3,
    upright:
      'Dokuz Kupa, öz-değer ve kişisel tatmin ihtiyacının içeride güçlü bir motivasyon olduğunu söyler. “Kendimle gurur duyayım” arzusu, kararlarınıza şeffaf bir keyif tonu katıyor olabilir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatmin, aşırılık ya da “hak ettim” bahanesiyle öz-bakımı savurganlığa dönüştürme eğiliminin gizli riskini vurgular. Gerçek doyum, değerlerle hizalanır.',
    keywords: ['tatmin', 'öz-değer', 'haz', 'aşırılık', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_sa_pos3',
    card: 'Ten of Cups',
    position: 3,
    upright:
      'On Kupa, ideal uyum ve ailevi huzur imgesinin görünmez bir çıpa olduğunu gösterir. “Mükemmel tablo” arzusu, çatışmadan kaçınmaya sebep olabilir.',
    reversed:
      'Ters On Kupa, uyum uğruna kendini inkâr, memnun etme kalıpları ve gerçeklikle ideal arasındaki gerilimin gizli etkisini anlatır. Sahici yakınlık, dürüst ifadeyle mümkün olur.',
    keywords: ['uyum', 'aile', 'ideal', 'kaçınma', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_sa_pos3',
    card: 'Page of Cups',
    position: 3,
    upright:
      'Kupa Prensi, hassas sezgi, hayal gücü ve masum merakın içeriden ilham verdiğini söyler. Yaratıcı kıvılcım, beklenmedik işaretlerle kapınızı çalıyor olabilir.',
    reversed:
      'Ters Kupa Prensi, duygusal dalgalanma, alınganlık ya da çocukça kaçış kalıplarının perde arkasındaki etkisini vurgular. Sınır koyma ve öz-düzenleme ihtiyacı belirgindir.',
    keywords: ['sezgi', 'yaratıcılık', 'hassasiyet', 'alınganlık', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_sa_pos3',
    card: 'Knight of Cups',
    position: 3,
    upright:
      'Kupa Şövalyesi, romantikleştirme eğilimi, idealler peşinde hareket ve zarafet arzusunun içerde canlı olduğunu gösterir. Kalpten gelen vizyon, yön duygusunu besliyor olabilir.',
    reversed:
      'Ters Kupa Şövalyesi, tutarsız vaatler, duygusal kaçış ya da fazla idealizm kalıplarının gizli etkisini anlatır. Söylenenle yapılan arasındaki boşluk güveni zedeleyebilir.',
    keywords: ['romantizm', 'idealizm', 'vizyon', 'kaçış', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_sa_pos3',
    card: 'Queen of Cups',
    position: 3,
    upright:
      'Kupa Kraliçesi, derin empati, şefkat ve sezgisel liderliğin perde arkasından sizi yönlendirdiğini gösterir. Güvenli duygusal alan yaratma arzusu güçlüdür.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal sınır erimesi, aşırı özveri ya da incelikli manipülasyon kalıplarının gizli riskini vurgular. Kendi ihtiyaçlarınızı duymak dengeyi geri getirir.',
    keywords: ['empati', 'şefkat', 'sınırlar', 'enmeshment', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_sa_pos3',
    card: 'King of Cups',
    position: 3,
    upright:
      'Kupa Kralı, duygusal olgunluk, sükûnet ve bilgece dengelemenin içeride bir çıpa olduğunu gösterir. Fırtınada bile merkezde kalma arzusu yön veriyor olabilir.',
    reversed:
      'Ters Kupa Kralı, duyguları bastırma, pasif-agresyon ya da kontrol ihtiyacının gizli etkisini anlatır. İfade edilmeyen hisler, dolaylı yollardan dışarı sızabilir.',
    keywords: ['olgunluk', 'duygu yönetimi', 'bastırma', 'pasif-agresyon', 'gizli'],
    context: 'Bilinçaltı ve gizli faktörler',
    group: 'Kupalar',
  },
  //-- Asalar --//
  {
    id: 'ace_of_wands_sa_pos3',
    card: 'Ace of Wands',
    position: 3,
    upright:
      'Değnek Ası, bilinçaltınızda güçlü bir kıvılcım, yaratma arzusu ve “hemen başlayayım” dürtüsünün çalıştığını gösterir. İçten içe risk almayı ve yeni bir sahneye çıkmayı istiyorsunuz; tutku, kararlarınızı görünmezce itiyor olabilir.\n\nBu kart, bastırılmış ilhamın doğru kanala akıtıldığında hızlı bir sıçrama yaratabileceğini hatırlatır.',
    reversed:
      'Ters Değnek Ası, içinizde var olan kıvılcımın korkular, mükemmeliyetçilik ya da dağınık odak nedeniyle bastırıldığını söyler. “Ya yanılırsam?” kaygısı, ilhamın akışını gizliden gizliye kesiyor olabilir.\n\nBu kart, niyeti sadeleştirip minik deneylerle özgüveni beslemenin tıkanıklığı çözeceğini vurgular.',
    keywords: ['kıvılcım', 'ilham', 'başlangıç', 'cesaret', 'akış'],
    context: 'Bilinçaltında bastırılmış ilham ve risk alma isteği.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_sa_pos3',
    card: 'Two of Wands',
    position: 3,
    upright:
      'İki Değnek, perde arkasında ufku genişletme, plan yapma ve daha büyük bir sahneye çıkma niyetinin yattığını gösterir. Konfor alanından çıkma arzusu sessizce olgunlaşıyor.\n\nGizli etken, “daha fazlası mümkün” inancının vizyonu büyütmesidir.',
    reversed:
      'Ters İki Değnek, görünmez bir tereddüt, öz-güvende oynamalar ve “ya olmazsa” endişesi nedeniyle vizyonu küçültme eğilimini işaret eder. İçteki ihtiyat, atılımı geciktiriyor olabilir.\n\nBu kart, tek bir küçük adımın bile sarkacı ileriye çevirebileceğini hatırlatır.',
    keywords: ['vizyon', 'plan', 'tereddüt', 'genişleme', 'konfor alanı'],
    context: 'Gizli vizyon–konfor alanı sarkacı ve karar cesareti.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_sa_pos3',
    card: 'Three of Wands',
    position: 3,
    upright:
      'Üç Değnek, içeride fırsat kollama, ufka bakma ve işbirlikleriyle büyüme hevesinin canlı olduğunu söyler. Sabırla beklemek yerine proaktif olma arzusu derinden çalışır.\n\nBu kart, görünmeyen hazırlığın “şans” hissini yarattığını vurgular.',
    reversed:
      'Ters Üç Değnek, gizli bir hayal kırıklığı, gecikme korkusu ya da kaynak yetersizliği algısının genişlemeyi perdelediğini gösterir. Ufku daraltan içsel bir anlatı olabilir.\n\nBu kart, geri bildirim alıp planı güncellemenin sızı azaltacağını söyler.',
    keywords: ['genişleme', 'fırsat', 'beklenti', 'işbirliği', 'revizyon'],
    context: 'Genişleme arzusu ile gecikme/kaynak korkusunun gerilimi.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_sa_pos3',
    card: 'Four of Wands',
    position: 3,
    upright:
      'Dört Değnek, görünmez bir istikrar arzusu, aidiyet ve “eve dönme” hissinin davranışları şekillendirdiğini gösterir. Kutlama ve güvenli alan ihtiyacı içeriden motive eder.\n\nBu kart, temel güven duygusunun risk iştahını da beslediğini anlatır.',
    reversed:
      'Ters Dört Değnek, destek görmeme korkusu, “yerim yok” hissi ya da tamamlanmamış bir eşiğin gölgesini işaret eder. İçteki huzursuzluk, ilerleyişi sesizce frenleyebilir.\n\nRitüeller ve küçük kutlamalar görünmeyen boşluğu onarır.',
    keywords: ['istikrar', 'aidiyet', 'eşik', 'kutlama', 'güven'],
    context: 'Aidiyet ihtiyacı ve yarım kalmış eşiğin gölgesi.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_sa_pos3',
    card: 'Five of Wands',
    position: 3,
    upright:
      'Beş Değnek, iç çatışmalar, rekabet duygusu ve kendini kanıtlama ihtiyacının perde arkasında çalıştığını gösterir. Mücadele dürtüsü yaratıcılığı tetiklerken gerilim de doğurabilir.\n\nGizli etken, “haklı çıkmalıyım” anlatısıdır.',
    reversed:
      'Ters Beş Değnek, gizliden kaçınılan sürtüşmeler, bastırılmış öfke ya da “gerek yok” deyip biriken kıvılcımları işaret eder. Görmezden gelinen gerilim, enerjiyi içeriden tüketebilir.\n\nYapılandırılmış diyalog, biriken basıncı güvenli boşaltır.',
    keywords: ['rekabet', 'iç çatışma', 'kanıtlama', 'öfke', 'diyalog'],
    context: 'Kanıtlama ihtiyacı ve bastırılmış gerilim döngüsü.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_sa_pos3',
    card: 'Six of Wands',
    position: 3,
    upright:
      'Altı Değnek, takdir edilme, sahnede olma ve görünür başarı arzusunun içeride güçlü bir motivatör olduğunu söyler. Zafer hayali adımlarınızı sessizce yönlendirir.\n\nGizli motor, tanınma ihtiyacıdır.',
    reversed:
      'Ters Altı Değnek, onay bağımlılığı, kıskançlık tetikleri ya da “fark edilmeyeceğim” korkusunun gölgesini işaret eder. Başarıyı küçültme eğilimi görünmez fren olabilir.\n\nMetri̇klerle görünürlüğü somutlamak algıyı dengeler.',
    keywords: ['takdir', 'başarı', 'görünürlük', 'onay', 'öz-değer'],
    context: 'Tanınma ihtiyacı ve görünürlük kaygısının ince etkisi.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_sa_pos3',
    card: 'Seven of Wands',
    position: 3,
    upright:
      'Yedi Değnek, pozisyonunuzu koruma ve sınırlarınızı savunma dürtüsünün derinden çalıştığını gösterir. İçte “haklı zemini bırakma” kararlılığı vardır.\n\nBu kart, görünmez tehdit algısının tetikte tutabileceğini söyler.',
    reversed:
      'Ters Yedi Değnek, yorgunluk, geri çekilme isteği ya da aşırı savunma refleksinin görünmez etkisini işaret eder. Her şeye karşı tetikte olma, kaynağı tüketebilir.\n\nÖnceliklendirme ve delege etmek iç direnci korur.',
    keywords: ['savunma', 'sınırlar', 'kararlılık', 'tükenme', 'öncelik'],
    context: 'Sınır koruma refleksi ve tükenmişlik riski.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_sa_pos3',
    card: 'Eight of Wands',
    position: 3,
    upright:
      'Sekiz Değnek, hız, momentum ve “yakala ve ilerle” dürtüsünün içeriden yükseldiğini gösterir. Hızlı karar verme arzusu perde arkasında itici güçtür.\n\nDoğru senkronu yakalama isteği görünmez biçimde yön verir.',
    reversed:
      'Ters Sekiz Değnek, gecikme korkusu, dağınık sinyaller ya da acelecilik eğiliminin gizli etkisini işaret eder. Mesaj karmaşası iç ritmi bozuyor olabilir.\n\nSıralamayı sadeleştirmek akışı netleştirir.',
    keywords: ['hız', 'ivme', 'iletişim', 'senkron', 'acelecilik'],
    context: 'Hız dürtüsü ile senkron kaygısı arasındaki gizli salınım.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_sa_pos3',
    card: 'Nine of Wands',
    position: 3,
    upright:
      'Dokuz Değnek, geçmiş tecrübelerin tetiklediği “temkinli ilerleme” kalıbının içeride çalıştığını gösterir. Dayanıklılık yüksek; ancak omuzlar hep tetikte.\n\nBu kart, görünmez yorgunluğun sınırları gereğinden sertleştirebileceğini söyler.',
    reversed:
      'Ters Dokuz Değnek, tükenmişlik, şüphecilik ya da “bir şey olacak” beklentisinin gizli etkisini işaret eder. Sürekli alarm hali, kaynakları tüketir.\n\nGüvenli destek ve mikro molalar savunmayı yumuşatır.',
    keywords: ['dayanıklılık', 'tetikte olma', 'yorgunluk', 'şüphe', 'koruma'],
    context: 'Travma sonrası tetikte kalma ve dayanıklılık sarkacı.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_sa_pos3',
    card: 'Ten of Wands',
    position: 3,
    upright:
      'On Değnek, “her şeyi ben taşımalıyım” inancının perde arkasından yüklendiğinizi gösterir. Tamamlama arzusu güçlü ama yük ağırdır.\n\nBu kart, görünmez görev birikiminin neşeyi kısmasına dikkat çeker.',
    reversed:
      'Ters On Değnek, gereksiz yükler, hayır diyememe ya da görev bağımlılığının gizli etkisini işaret eder. Bırakamamak, verimi düşürür.\n\nYetki devri ve sadeleştirme içteki baskıyı azaltır.',
    keywords: ['yük', 'sorumluluk', 'tamamlama', 'delege', 'sadelik'],
    context: 'Aşırı yüklenme kalıbı ve bırakma direnci.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_sa_pos3',
    card: 'Page of Wands',
    position: 3,
    upright:
      'Değnek Prensi, merak, keşif ve deneme–yanılma cesaretinin içeride canlı olduğunu gösterir. Küçük kıvılcımlar büyük maceralara dönüşmek istiyor.\n\nGizli etken, oyunsuluk ve öğrenme iştahıdır.',
    reversed:
      'Ters Değnek Prensi, dağınık ilgi, çabuk sıkılma ya da düşüncesiz çıkışların gizli etkisini işaret eder. Kıvılcım çabuk sönebilir.\n\nMikro hedefler ve ritim, hevesi sürdürülebilir kılar.',
    keywords: ['keşif', 'heves', 'deney', 'öğrenme', 'süreklilik'],
    context: 'Merakın itişi ile dağılma riskinin gizli çekişmesi.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_sa_pos3',
    card: 'Knight of Wands',
    position: 3,
    upright:
      'Değnek Şövalyesi, atılganlık, hız ve tutkunun içerden yükseldiğini gösterir. Fırsatları kovalamak için güçlü bir dürtü vardır.\n\nBu kart, ani ivmenin stratejiyle birleştiğinde sıçrama yaratacağını söyler.',
    reversed:
      'Ters Değnek Şövalyesi, acelecilik, savrukluk veya yarıda bırakma eğiliminin gizli etkisini işaret eder. Ateş hızlı yanıp sönebilir.\n\nNet hedef ve zamanlama taahhüdü, enerjiyi rayına koyar.',
    keywords: ['atılganlık', 'hız', 'tutku', 'strateji', 'istikrar'],
    context: 'Atılganlık dürtüsü ile stratejik disiplin ihtiyacı.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_sa_pos3',
    card: 'Queen of Wands',
    position: 3,
    upright:
      'Değnek Kraliçesi, karizma, özgüven ve sıcak liderliğin içeride güçlü bir mıknatıs olduğunu gösterir. Görünür olmak ve ilham vermek arzusu derinden çalışır.\n\nBu kart, öz-değer ile etki alanı arasında gizli bir beslenme döngüsü olduğunu ima eder.',
    reversed:
      'Ters Değnek Kraliçesi, güvensizlik, kıskançlık gölgesi ya da dağınık odak eğiliminin gizli etkisini işaret eder. Dış onaya aşırı ihtiyaç ışığı bulandırır.\n\nÖz-değer çalışması ve net öncelikler ışıltıyı berraklaştırır.',
    keywords: ['özgüven', 'karizma', 'liderlik', 'görünürlük', 'öncelik'],
    context: 'Karizma ihtiyacı ve görünürlük kaygısının ince dengesi.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_sa_pos3',
    card: 'King of Wands',
    position: 3,
    upright:
      'Değnek Kralı, vizyonerlik, stratejik cesaret ve büyük resmi tutma becerisinin içerde güçlü bir kaptan gibi çalıştığını gösterir. Etkiyi büyütme isteği sessizce yön verir.\n\nBu kart, riskleri hesaplayıp yetki devriyle ölçeklenmenin mümkün olduğunu hatırlatır.',
    reversed:
      'Ters Değnek Kralı, otoriterleşme, sabırsız dayatma veya ego çatışmalarının gizli etkisini işaret eder. Vizyon iletişime dönüşmezse direnç artar.\n\nDinleme ve ortak akıl, liderliği yeniden manyetik kılar.',
    keywords: ['vizyon', 'liderlik', 'cesaret', 'ego', 'ölçekleme'],
    context: 'Vizyoner kontrol isteği ile esneklik ihtiyacının çatışması.',
    group: 'Asalar',
  },
  //-- Tılsımlar --//
  {
    id: 'ace_of_pentacles_sa_pos3',
    card: 'Ace of Pentacles',
    position: 3,
    upright:
      'Tılsım Ası, bilinçaltınızda sağlam bir temel kurma, maddi güveni artırma ve somut bir fırsatı yeşertme isteğinin güçlü olduğunu gösterir. İçte saklı bir bereket inancı, pratik adımlar atmanız için görünmez bir cesaret veriyor olabilir.\n\nBu kart, imkanların tohum halinde zaten elinizde bulunduğunu ve doğru bakım ile hızlıca filizlenebileceğini hatırlatır.',
    reversed:
      'Ters Tılsım Ası, kıtlık zihniyeti, fırsatı kaçırma korkusu ya da yanlış temellere yatırım yapma endişesinin perde arkasında çalıştığını gösterir. Aşırı temkin veya dağınık plan, tohumun toprağa girmesini geciktiriyor olabilir.\n\nBu kart, değeri sadeleştirip küçük ve tekrarlı denemelerle güveni inşa etmenin tıkanıklığı çözeceğini söyler.',
    keywords: ['fırsat', 'temel', 'bereket', 'güven', 'tohum'],
    context: 'Gizli istikrar arayışı ve fırsatı görme eşiği.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_sa_pos3',
    card: 'Two of Pentacles',
    position: 3,
    upright:
      'İki Tılsım, bilinçaltınızda çoklu sorumlulukları çeviklikle yönetme ve esneklik kazanma arzusu olduğunu gösterir. İç ritmi ayarlama isteği, görünmez bir denge çubuğu gibi kararları hizalıyor olabilir.\n\nBu kart, minik ayarların büyük dalgalanmaları sönümleyebileceğini vurgular.',
    reversed:
      'Ters İki Tılsım, görünmeyen bir dengesizlik, karar yorgunluğu ya da gizli erteleme döngüsünü işaret eder. Aşırı yük, içte sızı gibi odaklanmayı bozuyor olabilir.\n\nBu kart, basit bir öncelik matrisi ve net sınırlar ile dengeyi geri çağırmayı önerir.',
    keywords: ['denge', 'esneklik', 'akış', 'zamanlama', 'öncelik'],
    context: 'Gizli denge oyunu ve görünmeyen akış baskısı.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_sa_pos3',
    card: 'Three of Pentacles',
    position: 3,
    upright:
      'Üç Tılsım, içeride takdir edilen ustalık ve işbirliği ihtiyacının güçlü olduğunu gösterir. Bilginizi paylaşma ve başkalarıyla inşa etme arzusu, perde arkasından kaliteyi yükseltiyor olabilir.\n\nBu kart, geri bildirim döngüsünün görünmez biçimde sizi beslediğini hatırlatır.',
    reversed:
      'Ters Üç Tılsım, rol belirsizliği, değersizlik hissi ya da yalnız çalışma kalıbının gizli etkisini gösterir. Destek talep etmekten çekinme, kaliteyi sessizce düşürebilir.\n\nBu kart, kapsam ve sorumlulukları netleştirmenin iç gerilimi çözeceğini söyler.',
    keywords: ['işbirliği', 'ustalık', 'geri bildirim', 'takdir', 'rol'],
    context: 'Gizli ustalık onayı ihtiyacı ve işbirliği eşiği.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_sa_pos3',
    card: 'Four of Pentacles',
    position: 3,
    upright:
      'Dört Tılsım, içeride koruma, biriktirme ve statükoyu sürdürme eğiliminin çalıştığını gösterir. Güvenlik arayışı, görünmezce risk iştahını kısıyor olabilir.\n\nBu kart, öz değer ile net değer arasındaki farkı görmenin kilidi açacağını söyler.',
    reversed:
      'Ters Dört Tılsım, aşırı tutma ya da kontrol kaybı korkusuyla savurganlık arasında gidip gelen gizli bir sarkaçtan bahseder. Sıkı tutuş, akışı daraltabilir.\n\nBu kart, niyete uygun harcama ve esnek bütçenin iç gerilimi yatıştıracağını vurgular.',
    keywords: ['güvenlik', 'kontrol', 'tutma', 'bütçe', 'esneklik'],
    context: 'Gizli tutma refleksi ve kaybetme korkusu.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_sa_pos3',
    card: 'Five of Pentacles',
    position: 3,
    upright:
      'Beş Tılsım, geçmiş yoksunluk deneyimlerinin sessiz izinin bugün algınızı etkilediğini gösterir. İç hikaye, desteğin erişilemez olduğu yönünde olabilir.\n\nBu kart, yardım isteme kasını çalıştırmanın görünmez engelleri çözeceğini hatırlatır.',
    reversed:
      'Ters Beş Tılsım, toparlanma isteği ve dayanıklılığın içinizde filizlendiğini gösterir. Yine de utanç veya yetersizlik anlatısı kapıdan geri çevirebilir.\n\nBu kart, küçük kazanımları görünür kılmanın özgüveni dengelediğini söyler.',
    keywords: ['yoksunluk', 'destek', 'dayanıklılık', 'utanç', 'toparlanma'],
    context: 'Gizli yoksunluk hikayesi ve destek isteme bariyeri.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_sa_pos3',
    card: 'Six of Pentacles',
    position: 3,
    upright:
      'Altı Tılsım, içinizde adil paylaşım ve kazan kazan ilişkisi kurma arzusunun güçlü olduğunu gösterir. Vermek ve almak arasındaki ritim, görünmez bir denge çizer.\n\nBu kart, şeffaf koşulların güveni kalıcı hale getireceğini vurgular.',
    reversed:
      'Ters Altı Tılsım, güç dengesizlikleri, koşullu yardım ya da onay karşılığı verme alma kalıplarının gizli etkisini gösterir. Bu, ilişkilerde sessiz bir küskünlük yaratabilir.\n\nBu kart, sınırlar ve net anlaşmalarla dengenin geri çağrılabileceğini söyler.',
    keywords: ['paylaşım', 'adalet', 'verme-alma', 'güç', 'sınır'],
    context: 'Gizli güç dengesi ve koşullu alışveriş kalıbı.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_sa_pos3',
    card: 'Seven of Pentacles',
    position: 3,
    upright:
      'Yedi Tılsım, sabır ve verim analizi ihtiyacının içinizde çalıştığını gösterir. Ne ektiğinizin muhasebesini yapmak, görünmezce stratejinizi rafine ediyor olabilir.\n\nBu kart, küçük iyileştirmelerin sabırla çarpan etkisi yaratacağını hatırlatır.',
    reversed:
      'Ters Yedi Tılsım, batık maliyet önyargısı, sabırsızlık ya da yanlış yatırım korkusunun gizli etkisini işaret eder. Sırf emek verdiniz diye sürdürmek tıkanma yaratabilir.\n\nBu kart, kriterle pivot etmenin iç sıkışmayı çözeceğini söyler.',
    keywords: ['sabır', 'hasat', 'verim', 'batık maliyet', 'pivot'],
    context: 'Gizli verim sorgusu ve batık maliyet çekimi.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_sa_pos3',
    card: 'Eight of Pentacles',
    position: 3,
    upright:
      'Sekiz Tılsım, zanaat bilinci, titizlik ve ustalığa adanma arzusunun derinde çalıştığını gösterir. Tekrarlı pratik, görünmezce özgüveni besliyor olabilir.\n\nBu kart, süreç sevgisinin sonuç kalitesini katladığını vurgular.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik, anlamdan kopma ya da sırf bitsin diye yapma kalıbının gizli etkisini gösterir. Kalite erozyonu, içte tatminsizlik üretir.\n\nBu kart, standardı tazeleme ve anlamla yeniden bağ kurmanın akışı düzelteceğini söyler.',
    keywords: ['ustalık', 'pratik', 'kalite', 'disiplin', 'anlam'],
    context: 'Gizli ustalık ihtiyacı ve işçilik standartları.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_sa_pos3',
    card: 'Nine of Pentacles',
    position: 3,
    upright:
      'Dokuz Tılsım, bağımsızlık, öz yeterlilik ve emeğin meyvesini keyifle sürme arzusunun içeride kök saldığını gösterir. Kendine güven, görünmezce sınırları güçlendiriyor olabilir.\n\nBu kart, zarif bir sadeleşmenin refah hissini artıracağını hatırlatır.',
    reversed:
      'Ters Dokuz Tılsım, aşırı bağımlılık, savurganlık ya da şekilci konfor kalıbının gizli etkisini gösterir. Konfor alanı, büyüme alanını daraltabilir.\n\nBu kart, bütçe bilinci ve üretken hobelerin dengeyi geri getireceğini söyler.',
    keywords: ['bağımsızlık', 'öz değer', 'konfor', 'sınır', 'tasarruf'],
    context: 'Gizli bağımsızlık ideali ve konfor alanı gerilimi.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_sa_pos3',
    card: 'Ten of Pentacles',
    position: 3,
    upright:
      'On Tılsım, aile mirası, uzun vade ve sistem kurma ihtiyacının perde arkasında belirleyici olduğunu gösterir. Kurumsal hafıza, görünmez bir güven ağı sunuyor olabilir.\n\nBu kart, kalıcılığın prosedür ve adil paylaşım ile güçleneceğini vurgular.',
    reversed:
      'Ters On Tılsım, miras çatışmaları, değer ayrışmaları ya da kısa vade odaklılığın gizli etkisini gösterir. Görünmez sürtünme, birikimi aşındırabilir.\n\nBu kart, şeffaf kurallar ve risk dağılımının iç huzuru onaracağını söyler.',
    keywords: ['miras', 'sistem', 'istikrar', 'paylaşım', 'uzun vade'],
    context: 'Gizli soy beklentisi ve uzun vade senaryoları.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_sa_pos3',
    card: 'Page of Pentacles',
    position: 3,
    upright:
      'Tılsım Prensi, çırak zihniyeti, öğrenme hevesi ve somut hedefe küçük adımlarla ilerleme arzusunun içeride canlı olduğunu gösterir. Merak ve disiplin, görünmez bir itiş gücü sağlar.\n\nBu kart, minik deneylerin büyük yollar açabileceğini hatırlatır.',
    reversed:
      'Ters Tılsım Prensi, erteleme, dikkat dağınıklığı ya da niyeti eyleme dökememe kalıbının gizli etkisini gösterir. Başlangıç enerjisi hızla sönüyor olabilir.\n\nBu kart, mikro hedefler ve hesap verebilir ritimlerin odağı toparlayacağını söyler.',
    keywords: ['öğrenme', 'başlangıç', 'merak', 'disiplin', 'odak'],
    context: 'Gizli çıraklık motivi ve erteleme sarkacı.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_sa_pos3',
    card: 'Knight of Pentacles',
    position: 3,
    upright:
      'Tılsım Şövalyesi, düzen, rutin ve istikrarlı ilerleme ihtiyacının derinde güçlü bir çıpa olduğunu gösterir. Yavaş ama emin adımlar, görünmezce güven inşa eder.\n\nBu kart, tutarlılığın uzun oyunda kazandırdığını vurgular.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık, aşırı muhafazakarlık ya da motivasyon düşüşünün gizli etkisini gösterir. Esneklik kaybı, fırsat maliyeti yaratabilir.\n\nBu kart, sistemi hafifletme ve küçük yeniliklerle ivme kazanmayı önerir.',
    keywords: ['istikrar', 'rutin', 'tutarlılık', 'esneklik', 'ivme'],
    context: 'Gizli düzen ihtiyacı ve esneklik korkusu.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_sa_pos3',
    card: 'Queen of Pentacles',
    position: 3,
    upright:
      'Tılsım Kraliçesi, şefkatli pratiklik, bakım verme ve kaynak yönetimi becerisinin içeride güçlü çalıştığını gösterir. Hem üretken hem besleyici olmak görünmez bir gurur kaynağıdır.\n\nBu kart, öz bakımı ihmal etmemenin bereketi çoğaltacağını hatırlatır.',
    reversed:
      'Ters Tılsım Kraliçesi, aşırı yüklenme, kendini unutma ya da duygusal maddi dengesizliğin gizli etkisini gösterir. Herkesi beslerken tükenme riski doğabilir.\n\nBu kart, sınır koyma ve destek istemenin iç dengeyi onaracağını söyler.',
    keywords: ['bakım', 'pratiklik', 'kaynak', 'öz bakım', 'sınır'],
    context: 'Gizli bakım verme kalıbı ve öz bakım açığı.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_sa_pos3',
    card: 'King of Pentacles',
    position: 3,
    upright:
      'Tılsım Kralı, stratejik sağlamlık, finansal bilgelik ve uzun vadeli liderlik arzusunun içeride güçlü olduğunu gösterir. Varlık tahsisi ve sistem kurma isteği, görünmezce yön verir.\n\nBu kart, paylaşım ve mentorlukla etkinizin kalıcı hale geleceğini vurgular.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol, hırsın gölgesi ya da statü odaklılığın gizli etkisini gösterir. Katılık, esnek fırsatları kaçırmanıza yol açabilir.\n\nBu kart, değerlerle hizalama ve yeniliğe açıklığın iç huzuru ve etkinizi artıracağını söyler.',
    keywords: ['liderlik', 'sağlamlık', 'kontrol', 'hırs', 'inovasyon'],
    context: 'Gizli kontrol ve statü motivasyonu ile değer hizası.',
    group: 'Tılsımlar',
  },

  //-- Kılıçlar --//
  {
    id: 'ace_of_swords_sa_pos3',
    card: 'Ace of Swords',
    position: 3,
    upright:
      'Kılıç Ası, bilinçaltınızda zihinsel bir atılım, çıplak gerçeği görme ve “adıyla çağırma” ihtiyacının güçlü olduğunu gösterir. İçinizde net bir kavrayış kıvılcımı yanıyor; sisli alanları kesip geçme arzusu seçimlerinize görünmezce yön veriyor olabilir.\n\nBu kart, kelimelerinize ve kararlarınıza dürüstlük çizgisi çektiğinizde, dağınık düşüncelerin hızla hizalanacağını hatırlatır.',
    reversed:
      'Ters Kılıç Ası, sisli düşünme, aşırı analitikleşme ya da gerçeği söylemekten kaçınma eğiliminin perde arkasında çalıştığını gösterir. Fazla veri, cesur bir cümleyi erteleyebilir.\n\nBu kart, mesajı sadeleştirip niyeti net bir cümleye indirmenin zihinsel tıkanıklığı çözeceğini vurgular.',
    keywords: ['netlik', 'hakikat', 'kavrama', 'iletişim', 'keskinlik'],
    context: 'Gizli netlik arayışı ve gerçeği adlandırma cesareti.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sa_pos3',
    card: 'Two of Swords',
    position: 3,
    upright:
      'İki Kılıç, bilinçaltınızda duyguları görmezden gelen bir “zihinsel barikat” ve kararsızlık kalıbının çalıştığını gösterir. İçte, iki seçenek arasında dengeyi bozmamak için gözleri kapalı tutma eğilimi olabilir.\n\nBu kart, kalp verisini masaya davet etmeden salt akılla karar vermenin tıkanma yaratabileceğini hatırlatır.',
    reversed:
      'Ters İki Kılıç, kaçınılan yüzleşmelerin artık içerden basınç yaptığını, kör noktaların göz önüne gelmeye başladığını söyler. Kararı ertelemek kaygıyı büyütür.\n\nBu kart, küçük bir gerçeklik testi ve kademeli açıklığın düğümü çözeceğini belirtir.',
    keywords: ['kararsızlık', 'barikat', 'kör nokta', 'denge', 'yüzleşme'],
    context: 'Gizli karar felci ve duyguyu dışarıda bırakma eğilimi.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sa_pos3',
    card: 'Three of Swords',
    position: 3,
    upright:
      'Üç Kılıç, bilinçaltında işlenmemiş bir kırgınlık, hayal kırıklığı ya da ihanet izinin düşüncelerinizi keskinleştirdiğini gösterir. Zihinsel savunular, kalbi korumak için tetikte olabilir.\n\nBu kart, acıyı adlandırmanın ve yasın payını vermenin zihinsel berraklığı geri getireceğini söyler.',
    reversed:
      'Ters Üç Kılıç, iyileşmeye hazır bir yara izi ve affediş çağrısının içeride filizlendiğini anlatır. Yine de tetikleyiciler beklenmedik anlarda keskinleşebilir.\n\nBu kart, güvenli ifade ve şefkatli sınırların kırılganlığı güçlendireceğini vurgular.',
    keywords: ['kırgınlık', 'yas', 'ihanet', 'iyileşme', 'ifade'],
    context: 'Gizli kalp acısının düşünce kalıplarını keskinleştirmesi.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sa_pos3',
    card: 'Four of Swords',
    position: 3,
    upright:
      'Dört Kılıç, bilinçaltınızda geri çekilme, zihni dinlendirme ve içsel toparlanma ihtiyacının güçlü olduğunu gösterir. Yorgun düşmüş düşünceler, sessiz bir molayı çağırıyor olabilir.\n\nBu kart, stratejinin uykuda olgunlaştığını ve dinlenmenin yeni çözümler için alan açtığını hatırlatır.',
    reversed:
      'Ters Dört Kılıç, dinlenmeyi bile erteler hale gelen bir zihinsel gürültüyü işaret eder. “Şimdi durursam düşerim” inancı tükenmişliği derinleştirebilir.\n\nBu kart, kısa ve düzenli mikro molaların verimi geri çağıracağını vurgular.',
    keywords: ['dinlenme', 'toparlanma', 'içe dönüş', 'strateji', 'sükûnet'],
    context: 'Gizli dinlenme ihtiyacı ve zihinsel gürültüyü susturma çağrısı.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sa_pos3',
    card: 'Five of Swords',
    position: 3,
    upright:
      'Beş Kılıç, kazanma saplantısı, haklı çıkma ihtiyacı ve savunmacı aklın perde arkasında çalıştığını gösterir. “Bedeli ne olursa olsun zafer” anlatısı ilişkileri yıpratabilir.\n\nBu kart, kazanç tanımını gözden geçirmenin ve köprüleri yakmadan sınır koymanın önemini vurgular.',
    reversed:
      'Ters Beş Kılıç, gerilimi düşürme ve özür/onarım niyetinin içeride belirdiğini gösterir; ancak gurur direnç üretebilir.\n\nBu kart, esnek müzakerenin ve ortak zeminin görünmez yaraları kapatacağını söyler.',
    keywords: ['çatışma', 'haklılık', 'zafer', 'ego', 'onarım'],
    context: 'Gizli kazanma takıntısı ve ilişkisel maliyet kavşağı.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sa_pos3',
    card: 'Six of Swords',
    position: 3,
    upright:
      'Altı Kılıç, bilinçaltında “buradan usulca uzaklaşma” ve daha sakin sulara geçme arzusunun güçlü olduğunu gösterir. Akıl, duygusal fırtınadan çıkış rotası çizer.\n\nBu kart, geçişin sessiz ve kademeli olduğunda daha sürdürülebilir olacağını hatırlatır.',
    reversed:
      'Ters Altı Kılıç, geçmişe bağlayan iplerin ve belirsiz sular korkusunun geçişi geciktirdiğini gösterir. Eski düşünce yolları geri çağırabilir.\n\nBu kart, küçük taşınmalar ve güvenli eşlikçilerin geçişi kolaylaştıracağını vurgular.',
    keywords: ['geçiş', 'uzaklaşma', 'sükûnet', 'belirsizlik', 'rotayı çizme'],
    context: 'Gizli uzaklaşma arzusu ve geçmişe bağlayan ince ipler.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sa_pos3',
    card: 'Seven of Swords',
    position: 3,
    upright:
      'Yedi Kılıç, strateji, gizlilik ve “dikkat çekmeden ilerleme” ihtiyacının perde arkasında çalıştığını gösterir. Kaynakları korumak için saklama taktikleri devrede olabilir.\n\nBu kart, niyet temizse stratejinin de şeffaflıkla dengelenmesi gerektiğini hatırlatır.',
    reversed:
      'Ters Yedi Kılıç, kendini kandırma, yarım gerçekler ya da yakalanma kaygısının içte gerilim yarattığını gösterir. Saklı planlar güven aşındırabilir.\n\nBu kart, itiraf ve yeniden hizalamanın zihni hafiflettiğini vurgular.',
    keywords: ['strateji', 'gizlilik', 'taktik', 'öz-aldatma', 'güven'],
    context: 'Gizli strateji ile şeffaflık ihtiyacı arasındaki ince çizgi.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sa_pos3',
    card: 'Eight of Swords',
    position: 3,
    upright:
      'Sekiz Kılıç, öz-kısıtlama inançlarının ve “çıkış yok” anlatısının bilinçaltında görünmez duvarlar ördüğünü gösterir. Zihin, özgürlüğü sınırlayan bir labirent yaratmış olabilir.\n\nBu kart, gerçeği test eden küçük deneylerin ipleri çözeceğini hatırlatır.',
    reversed:
      'Ters Sekiz Kılıç, çözülmeye hazır düğümler ve özgürleşme niyetinin içeride güçlendiğini söyler. Ancak eski korkular ara sıra göz bağı gibi geri gelebilir.\n\nBu kart, kanıt toplamayı ve destek istemeyi özgürleşmenin kaldıraçları olarak önerir.',
    keywords: ['öz-kısıt', 'korku', 'zihin tuzağı', 'özgürleşme', 'deney'],
    context: 'Gizli öz-sınırlamalar ve çıkış denemeleri.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sa_pos3',
    card: 'Nine of Swords',
    position: 3,
    upright:
      'Dokuz Kılıç, gece kaygısı, felaketleştirme ve “ya…” senaryolarının perde arkasında zihni kemirdiğini gösterir. Uykusuz düşünceler, gündüz işlevini gölgeleyebilir.\n\nBu kart, kaygıyı dışsallaştırmanın (yazmak/konuşmak) gücünü hatırlatır.',
    reversed:
      'Ters Dokuz Kılıç, kabusun sabahında gerçekliğin daha az korkutucu olduğunun fark edilmeye başlandığını söyler. Yine de zihinsel döngüler ara sıra geri dönebilir.\n\nBu kart, kanıt temelli çürütmeler ve bedenle regülasyonun döngüyü zayıflattığını vurgular.',
    keywords: ['kaygı', 'uykusuzluk', 'felaketleştirme', 'çözülme', 'regülasyon'],
    context: 'Gizli kaygı döngüsü ve gerçeklik testi ihtiyacı.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sa_pos3',
    card: 'Ten of Swords',
    position: 3,
    upright:
      'On Kılıç, bir döngünün zihinsel olarak çoktan bittiğini fakat kabulün geriden geldiğini gösterir. “En dibe” anlatısı, yeniden doğuş eşiğine işaret eder.\n\nBu kart, bitişi onurlandırmanın güç ve hafiflik yaratacağını söyler.',
    reversed:
      'Ters On Kılıç, toparlanma, yükü atma ve hikâyeyi yeniden çerçeveleme niyetinin içeride filizlendiğini gösterir. Eski acıya geri dönme dürtüsü ara sıra yoklayabilir.\n\nBu kart, ileriye bakan küçük anlaşmaların (kendinle) iyileşmeyi kalıcı kılacağını vurgular.',
    keywords: ['bitiş', 'teslim', 'yeniden doğuş', 'kabul', 'iyileşme'],
    context: 'Gizli bitiş kabulü ve yeniden başlama eşiği.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sa_pos3',
    card: 'Page of Swords',
    position: 3,
    upright:
      'Kılıç Prensi, zihinsel merak, gözlemcilik ve yeni fikirlere açıklığın perde arkasında güçlü bir itiş olduğunu gösterir. Soru sormak, görünmez yakıtınızdır.\n\nBu kart, merakın sorumlulukla dengelendiğinde keskin bir öğrenme eğrisi yaratacağını söyler.',
    reversed:
      'Ters Kılıç Prensi, dedikodu, dağınık bilgi toplama ya da tetikte aşırılığın gizli riskini gösterir. Hızlı yargılar yanlış bayrak kaldırabilir.\n\nBu kart, kaynağı doğrulamanın ve niyeti netleştirmenin zihni berraklaştıracağını vurgular.',
    keywords: ['merak', 'gözlem', 'öğrenme', 'gossip', 'doğrulama'],
    context: 'Gizli merak dürtüsü ve bilgi hijyeni ihtiyacı.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sa_pos3',
    card: 'Knight of Swords',
    position: 3,
    upright:
      'Kılıç Şövalyesi, hızlı hamle, keskin tartışma ve fikri savunma dürtüsünün içeride güçlü olduğunu gösterir. Zihin hız ister; eylem çağrısı yüksek seste çalar.\n\nBu kart, hızın stratejiyle harmanlanmadığında kırılganlık yaratabileceğini hatırlatır.',
    reversed:
      'Ters Kılıç Şövalyesi, acelecilik, düşünmeden konuşma ya da saldırgan iletişimin gizli riskini gösterir. Haklı olma isteği dinleme kapasitesini kısabilir.\n\nBu kart, nefes–dur–konuş ritminin etkili olacağını vurgular.',
    keywords: ['hız', 'tartışma', 'savunma', 'acele', 'strateji'],
    context: 'Gizli atılgan zihin ve fren–gaz dengesinin ihtiyacı.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sa_pos3',
    card: 'Queen of Swords',
    position: 3,
    upright:
      'Kılıç Kraliçesi, duygudan arınmış netlik, sınır koyma ve adil değerlendirme kapasitesinin içeride bir pusula olduğunu gösterir. Zihin, efsaneyi değil veriyi ister.\n\nBu kart, sıcak kalplilikle serin aklın birlikte tutulduğunda en adil sonucu verdiğini hatırlatır.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştirellik, küskün ironi ya da keskin dilin gizli riskini gösterir. Korunmak için mesafe, bağlantıyı inceltebilir.\n\nBu kart, şefkatli dil ve yumuşak sınırların etkileşimi zenginleştireceğini vurgular.',
    keywords: ['netlik', 'sınır', 'nesnellik', 'eleştiri', 'şefkatli dil'],
    context: 'Gizli analitik pusula ve dilde keskinlik riski.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sa_pos3',
    card: 'King of Swords',
    position: 3,
    upright:
      'Kılıç Kralı, ilkelere bağlılık, etik ve stratejik aklın içeride yönetici ilke olduğunu gösterir. Mantık çerçevesi, karmaşayı hızla düzenler.\n\nBu kart, adil güç kullanımının güven inşa ettiğini hatırlatır.',
    reversed:
      'Ters Kılıç Kralı, dogmatik düşünme, katı kurallar ya da aklı güce araç etmenin gizli riskini gösterir. Soğuk mantık, empatiyi gölgeleyebilir.\n\nBu kart, etikle empatiyi eşleştirmenin hem etkiyi hem kabulü artıracağını vurgular.',
    keywords: ['etik', 'mantık', 'otorite', 'dogma', 'empati'],
    context: 'Gizli ilke odaklılık ve katılaşma eşiği.',
    group: 'Kılıçlar',
  },
];

// Kart adına göre pozisyon 3 anlamını bulma fonksiyonu
export const getPosition3Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return position3Meanings.find(
    meaning => meaning.card === cardName
  );
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getSituationAnalysisPosition3Meaning = (
  cardName: string,
  isReversed: boolean = false
): SituationAnalysisPositionMeaning | undefined => {
  return getPosition3Meaning(cardName, isReversed);
};

// Kart adına göre pozisyon 3 anlamını bulma fonksiyonu (ana index için)
export const getSituationAnalysisPosition3MeaningByCardName = (
  cardName: string,
  isReversed: boolean = false
): SituationAnalysisPositionMeaning | undefined => {
  const meaning = getPosition3Meaning(cardName, isReversed);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 3 anlamlarını alma fonksiyonu
export const getAllPosition3Meanings = (): SituationAnalysisPositionMeaning[] => {
  return position3Meanings;
};

// Pozisyon 3 anlamlarını filtreleme fonksiyonu
export const getPosition3MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): SituationAnalysisPositionMeaning[] => {
  return position3Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 3 anlamlarını arama
export const searchPosition3MeaningsByKeyword = (
  keyword: string
): SituationAnalysisPositionMeaning[] => {
  return position3Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position3Meanings,
  getPosition3Meaning,
  getAllPosition3Meanings,
  getPosition3MeaningsByGroup,
  searchPosition3MeaningsByKeyword,
};
