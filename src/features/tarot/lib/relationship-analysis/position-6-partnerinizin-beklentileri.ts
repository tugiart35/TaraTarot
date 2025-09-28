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

import { RelationshipAnalysisPositionMeaning } from './position-meanings-index';

// 6. Pozisyon (Tavsiye) - 78 Tarot kartı
export const position6Meanings: RelationshipAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_ra_pos6',
    card: 'The Fool',
    position: 6,
    upright:
      'Partnerin senden saf bir başlangıç, risk almaya açık bir enerji bekliyor. İçindeki çocukla özgürce akmanı, onunla yeni yollara merakla çıkmanı istiyor.',
    reversed:
      'Partnerin kaygılarını yatıştırmanı, fazla sorumsuzca adımlar atmamanı bekliyor. Özgürlüğü sevse de güvenli bir çerçeve onun için önemli.',
    keywords: ['özgürlük', 'başlangıç', 'merak', 'cesaret', 'güven'],
    context:
      'Partnerin, hem hafiflik hem de güven veren yeni bir başlangıç istiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ra_pos6',
    card: 'The Magician',
    position: 6,
    upright:
      'Partnerin net sözler, tutarlı adımlar ve yaratıcılıkla senin yanında olmanı bekliyor. Söylediğini yapan ve niyetini görünür kılan bir enerji istiyor.',
    reversed:
      'Partnerin maskelerden ve belirsizlikten uzak bir duruş bekliyor. Algı oyunları yerine şeffaflık onu rahatlatacak.',
    keywords: ['niyet', 'yaratım', 'ifade', 'şeffaflık', 'tutarlılık'],
    context: 'Partnerin, sözüyle eylemi bir olan bir bütünlük bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ra_pos6',
    card: 'The High Priestess',
    position: 6,
    upright:
      'Partnerin senin sezgine, derin bilgeliğine ve sakin gücüne güvenmek istiyor. Onun sırlarını güvenle saklayacağını bilmek ona huzur veriyor.',
    reversed:
      'Partnerin duvarlarını çok yükseltmemenizi bekliyor. Ona zaman zaman iç dünyanı açman, ilişkide güveni güçlendirecek.',
    keywords: ['sezgi', 'bilgelik', 'giz', 'güven', 'sükunet'],
    context:
      'Partnerin, senin sezgine yaslanmak ama aynı zamanda açıklık görmek istiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ra_pos6',
    card: 'The Empress',
    position: 6,
    upright:
      'Partnerin senden şefkat, besleyicilik ve sevgiyle büyütülen bir alan bekliyor. Ona sıcaklık ve destek veren bir duruş istiyor.',
    reversed:
      'Partnerin aşırı sahiplenme veya tüketen bir enerji görmek istemiyor. Dengeli şefkat ve öz bakımla ona alan bırakmanı bekliyor.',
    keywords: ['şefkat', 'bolluk', 'besleme', 'öz bakım', 'alan'],
    context: 'Partnerin, cömert ama dengeli bir şefkat alanı bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ra_pos6',
    card: 'The Emperor',
    position: 6,
    upright:
      'Partnerin senden düzen, güven ve net sınırlar bekliyor. Onu destekleyen bir yapı ve istikrar görmek istiyor.',
    reversed:
      'Partnerin katı kurallardan ziyade esneklik de bekliyor. Güçlü ama anlayışlı bir liderlik onun için kıymetli.',
    keywords: ['düzen', 'güven', 'sınır', 'istikrar', 'liderlik'],
    context: 'Partnerin, güven veren ama kalbi kapatmayan bir düzen arıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ra_pos6',
    card: 'The Hierophant',
    position: 6,
    upright:
      'Partnerin ortak değerlerde buluşmak ve geleneksel ya da kişisel ritüellerle bağ kurmak istiyor. Onunla aynı inançta olduğunu bilmek ona huzur verir.',
    reversed:
      'Partnerin körü körüne uyumu değil, birlikte özgün kurallar belirlemeyi bekliyor. Kendi yolunuzu yaratmanız onun için özel.',
    keywords: ['değerler', 'ritüel', 'gelenek', 'bağ', 'uyum'],
    context:
      'Partnerin, ortak değerler ve özgün ritüellerle bağ kurmak istiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ra_pos6',
    card: 'The Lovers',
    position: 6,
    upright:
      'Partnerin senden net seçimler ve kalbinle uyumlu kararlar bekliyor. Ona değer verdiğini bilmek ve ortak hedeflerde buluşmak istiyor.',
    reversed:
      'Partnerin belirsizlikten yoruluyor. Kararsız kalmaman ve seçimlerini görünür kılman onun için güven demek.',
    keywords: ['seçim', 'uyum', 'aşk', 'değer', 'karar'],
    context: 'Partnerin, net seçimler ve ortak yön belirlemek istiyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ra_pos6',
    card: 'The Chariot',
    position: 6,
    upright:
      'Partnerin senden birlikte ilerlemek, yönü netleştirmek ve ortak hedeflere odaklanmanı bekliyor. Onunla aynı arabada olduğunu bilmek ona güven veriyor.',
    reversed:
      'Partnerin savrulmaktan ve dağınık enerjiden kaçınmak istiyor. Ortak rota çizmek onun için değerli.',
    keywords: ['yön', 'birlikte yol', 'ivme', 'hedef', 'odak'],
    context: 'Partnerin, net rota ve aynı yönde ilerleme bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ra_pos6',
    card: 'Strength',
    position: 6,
    upright:
      'Partnerin senden nazik cesaret ve şefkat bekliyor. Onun kalbini yargısızca kucaklamanı istiyor.',
    reversed:
      'Partnerin aşırı gurur ya da sertlikle karşılaşmak istemiyor. Nazik yaklaşım onun kalbini yumuşatır.',
    keywords: ['cesaret', 'şefkat', 'naziklik', 'sabır', 'güven'],
    context: 'Partnerin, şefkatli cesaretle yaklaşmanı bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ra_pos6',
    card: 'The Hermit',
    position: 6,
    upright:
      'Partnerin senden bilgelik, sabır ve içsel olgunluk bekliyor. Ona ışık tutacak bir rehberlik istiyor.',
    reversed:
      'Partnerin tamamen içine kapanmanı istemiyor. Seçici paylaşım onun için değerli.',
    keywords: ['bilgelik', 'içe dönüş', 'sabır', 'rehberlik', 'paylaşım'],
    context: 'Partnerin, hem bilgelik hem de ölçülü paylaşım bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ra_pos6',
    card: 'The Wheel of Fortune',
    position: 6,
    upright:
      'Partnerin değişimlere birlikte uyum sağlamanı bekliyor. Döngülerin farkında olmanı ve beraber yön değiştirmenizi istiyor.',
    reversed:
      'Partnerin kaderi tamamen akışa bırakmanı istemiyor. Karar ve sorumluluk üstlenmeni bekliyor.',
    keywords: ['değişim', 'döngü', 'uyum', 'zamanlama', 'karar'],
    context: 'Partnerin, döngülere uyum ama kararlı duruş bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ra_pos6',
    card: 'Justice',
    position: 6,
    upright:
      'Partnerin adalet, şeffaflık ve eşitlik bekliyor. Onunla açık ve adil bir dil kurmanı istiyor.',
    reversed:
      'Partnerin çifte standart ya da gizlilik istemiyor. Küçük özürler ve telafiler ona güven verir.',
    keywords: ['adalet', 'eşitlik', 'şeffaflık', 'denge', 'sorumluluk'],
    context: 'Partnerin, adil ve şeffaf bir denge bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ra_pos6',
    card: 'The Hanged Man',
    position: 6,
    upright:
      'Partnerin senden bakış açısını değiştirmeyi, onun gözünden de görebilmeyi bekliyor. Teslimiyet ve anlayış onun için şifa.',
    reversed:
      'Partnerin kurban rolü oynamanı istemiyor. Ufak fedakârlıklar ilişkiye denge katacak.',
    keywords: ['perspektif', 'teslimiyet', 'fedakarlık', 'anlayış', 'denge'],
    context: 'Partnerin, anlayış ve yeni bakış açısı bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ra_pos6',
    card: 'Death',
    position: 6,
    upright:
      'Partnerin dönüşüm, yenilenme ve eski yükleri bırakmanı bekliyor. Bitene veda edip yeniye yer açmanı istiyor.',
    reversed:
      'Partnerin değişime direnmeni istemiyor. Küçük vedalarla hafiflik kazanmanı bekliyor.',
    keywords: ['dönüşüm', 'bırakış', 'yenilenme', 'hafiflik', 'doğuş'],
    context: 'Partnerin, değişimlere açık bir yenilenme bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ra_pos6',
    card: 'Temperance',
    position: 6,
    upright:
      'Partnerin senden denge, sabır ve ölçülü bir ritim bekliyor. Uyumla hareket etmeni istiyor.',
    reversed:
      'Partnerin uçlarda savrulmanı istemiyor. Tutarlı ve yumuşak bir tempo arıyor.',
    keywords: ['denge', 'sabır', 'uyum', 'ölçü', 'şifa'],
    context: 'Partnerin, sabırlı ve uyumlu bir ritim bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ra_pos6',
    card: 'The Devil',
    position: 6,
    upright:
      'Partnerin senden açık sınırlar ve özgür iradeye saygı bekliyor. Kontrol oyunlarından uzak bir alan arıyor.',
    reversed:
      'Partnerin zincirleyen bağları çözmeni istiyor. Küçük bir “hayır” bile onun için özgürlük demek.',
    keywords: ['sınır', 'özgürlük', 'kontrol', 'irade', 'saygı'],
    context: 'Partnerin, özgürlük ve saygı dolu bağ bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ra_pos6',
    card: 'The Tower',
    position: 6,
    upright:
      'Partnerin senden hakikati onurlandırmanı ve gerekirse çürük yapıları yıkmanı bekliyor. Yeniden yapılanmaya açık olmanı istiyor.',
    reversed:
      'Partnerin krizleri saklamanı istemiyor. Açık konuşarak yıkımı bilinçli yönetmeni bekliyor.',
    keywords: ['hakikat', 'yıkım', 'yeniden inşa', 'temel', 'arınma'],
    context: 'Partnerin, dürüstlük ve yeniden inşa için açıklık bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ra_pos6',
    card: 'The Star',
    position: 6,
    upright:
      'Partnerin senden umut, ilham ve şeffaf niyet bekliyor. Ona inanç ve güven aşılamanı istiyor.',
    reversed:
      'Partnerin karamsarlıktan uzaklaşmanı bekliyor. Küçük sevinçlerle ışığını paylaşmanı istiyor.',
    keywords: ['umut', 'ilham', 'şeffaflık', 'güven', 'yenilenme'],
    context: 'Partnerin, umut ve şeffaf bir ilham bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ra_pos6',
    card: 'The Moon',
    position: 6,
    upright:
      'Partnerin senden belirsizliklerde bile sezgini dinlemeni bekliyor. Ona kaygı yerine güven vermeni istiyor.',
    reversed:
      'Partnerin varsayımlar yerine net sorular duymak istiyor. Açıklık belirsizliği dağıtır.',
    keywords: ['sezgi', 'belirsizlik', 'korku', 'aydınlanma', 'güven'],
    context: 'Partnerin, sezgi ama aynı zamanda açıklık bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ra_pos6',
    card: 'The Sun',
    position: 6,
    upright:
      'Partnerin senden otantik sevinç ve görünürlük bekliyor. İçten paylaşım onu yakınlaştırıyor.',
    reversed:
      'Partnerin sahte iyimserlik istemiyor. Gerçek sevinci, içtenliği görmek istiyor.',
    keywords: ['sevinç', 'otantiklik', 'paylaşım', 'görünürlük', 'içtenlik'],
    context: 'Partnerin, içten sevinç ve görünürlük bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ra_pos6',
    card: 'Judgement',
    position: 6,
    upright:
      'Partnerin senden geçmişle yüzleşmeni ve öğrenimlerini görmeni bekliyor. Affediş ve çağrıya cevap vermeni istiyor.',
    reversed:
      'Partnerin aşırı öz yargı istemiyor. Merhamet ve sorumluluk dengesi onun için önemli.',
    keywords: ['yüzleşme', 'affediş', 'öğrenme', 'yenilenme', 'çağrı'],
    context: 'Partnerin, affediş ve yenilenme için açıklık bekliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ra_pos6',
    card: 'The World',
    position: 6,
    upright:
      'Partnerin senden döngüleri tamamlamanı ve bütünlükle ilerlemeni bekliyor. Onunla yeni bir aşamaya geçmek istiyor.',
    reversed:
      'Partnerin yarım kalmışlık görmek istemiyor. Eksikleri bağlamak ve bütünlük kurmak onun için huzur.',
    keywords: [
      'tamamlanma',
      'bütünlük',
      'kutlama',
      'yeni aşama',
      'entegrasyon',
    ],
    context: 'Partnerin, tamamlanmışlık ve yeni aşamaya geçiş bekliyor.',
    group: 'Majör Arkana',
  },

  // CUPS (Kupalar)
  {
    id: 'ace_of_cups_ra_pos6',
    card: 'Ace of Cups',
    position: 6,
    upright:
      'Partnerin senden kalbin saf akışını ve duygularını cesurca açmanı bekliyor. Ona sevgini görünür kılmak, ilişkiyi tazeleyecek.',
    reversed:
      'Partnerin, duygularını bastırmamanı ve paylaşımını saklamamanı istiyor. Açıklık güvenini büyütecek.',
    keywords: ['sevgi', 'başlangıç', 'ifade', 'şefkat', 'akış'],
    context: 'Partnerin, kalbinin saf ve açık akışını duymak istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ra_pos6',
    card: 'Two of Cups',
    position: 6,
    upright:
      'Partnerin senden eşitlik, karşılıklılık ve uyum istiyor. Ona bağın dengesini hissettirmek çok kıymetli.',
    reversed:
      'Partnerin tek taraflı yüklenmek istemiyor. Dengeyi koruman ve açık iletişim kurman beklentisi.',
    keywords: ['uyum', 'ortaklık', 'denge', 'bağ', 'güven'],
    context: 'Partnerin, eşitlik ve karşılıklılıkla bağ kurmak istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ra_pos6',
    card: 'Three of Cups',
    position: 6,
    upright:
      'Partnerin senden birlikte kutlamalar, dostluk ve paylaşılan sevinçler istiyor. Ona toplulukta yanında olmanı hissettirmek istiyor.',
    reversed:
      'Partnerin yüzeysellikten uzaklaşmanı istiyor. Derin ve anlamlı paylaşımlar onun beklentisi.',
    keywords: ['kutlama', 'dostluk', 'paylaşım', 'sevinç', 'destek'],
    context: 'Partnerin, dostluk ve neşeli paylaşımlar bekliyor.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ra_pos6',
    card: 'Four of Cups',
    position: 6,
    upright:
      'Partnerin senden farkındalık ve şükranla yaklaşmanı istiyor. Önündeki fırsatları görebilmeni bekliyor.',
    reversed:
      'Partnerin kayıtsızlık görmek istemiyor. Onu ve ilişkiyi canlı tutmanı bekliyor.',
    keywords: ['farkındalık', 'şükran', 'uyanış', 'ilgi', 'bağ'],
    context: 'Partnerin, farkındalığını ve şükranını hissetmek istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ra_pos6',
    card: 'Five of Cups',
    position: 6,
    upright:
      'Partnerin senden kayıplara değil, mevcut güzelliklere odaklanmanı istiyor. Ona umut verecek gözlerle bakmanı bekliyor.',
    reversed:
      'Partnerin yasına hapsolmanı istemiyor. Yeniden toparlanmanı ve umudu büyütmeni bekliyor.',
    keywords: ['umut', 'kayıp', 'kabul', 'şifa', 'yenilenme'],
    context: 'Partnerin, umuda ve kalan güzelliklere odaklanmanı bekliyor.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ra_pos6',
    card: 'Six of Cups',
    position: 6,
    upright:
      'Partnerin geçmişin sıcaklığını onurlandırmanı bekliyor. Ona nostaljiyle sevgi dolu bir bağ sunmanı istiyor.',
    reversed:
      'Partnerin geçmişe saplanmanı istemiyor. Şimdiki anda kalmanı bekliyor.',
    keywords: ['nostalji', 'anı', 'şefkat', 'iç çocuk', 'sevgi'],
    context:
      'Partnerin, geçmişi onurlandırmanı ama şimdiye odaklanmanı bekliyor.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ra_pos6',
    card: 'Seven of Cups',
    position: 6,
    upright:
      'Partnerin senden net seçimler yapmanı istiyor. Hayallerinle gerçekler arasında kararlı bir duruş bekliyor.',
    reversed:
      'Partnerin dağınık enerjiden yoruluyor. Netlik ve öncelik koymanı bekliyor.',
    keywords: ['seçim', 'vizyon', 'netlik', 'öncelik', 'hayal'],
    context: 'Partnerin, net seçimler ve yön belirlemeni bekliyor.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ra_pos6',
    card: 'Eight of Cups',
    position: 6,
    upright:
      'Partnerin senden daha derin bir anlam arayışına katılmanı bekliyor. Gerektiğinde tatmin etmeyeni bırakabilmeni istiyor.',
    reversed:
      'Partnerin git-gel enerjisinden yoruluyor. Net bir karar ve yön bekliyor.',
    keywords: ['anlam', 'ayrılış', 'cesaret', 'dönüşüm', 'karar'],
    context: 'Partnerin, daha anlamlı olana cesaretle yönelmeni bekliyor.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ra_pos6',
    card: 'Nine of Cups',
    position: 6,
    upright:
      'Partnerin senden tatmin ve şükran enerjini paylaşmanı bekliyor. Ona mutluluğunu açmanı istiyor.',
    reversed:
      'Partnerin yüzeysel hazlarla oyalanmanı istemiyor. Daha derin değerlerle buluşmanı bekliyor.',
    keywords: ['tatmin', 'şükran', 'haz', 'bolluk', 'doyum'],
    context: 'Partnerin, tatmin ve şükranı paylaşmanı bekliyor.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ra_pos6',
    card: 'Ten of Cups',
    position: 6,
    upright:
      'Partnerin senden huzurlu bir aile/yuva enerjisi istiyor. Birlik ve uyum onun beklentisi.',
    reversed:
      'Partnerin sahte uyum değil, gerçek bağ bekliyor. Gerçeklikten uzaklaşmanı istemiyor.',
    keywords: ['aile', 'uyum', 'huzur', 'birlik', 'gerçeklik'],
    context: 'Partnerin, uyumlu ve gerçek bağlarla huzur istiyor.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ra_pos6',
    card: 'Page of Cups',
    position: 6,
    upright:
      'Partnerin senden saf merak, duygusal ifade ve oyunbazlık istiyor. Küçük jestler ona ilham verir.',
    reversed:
      'Partnerin aşırı hassasiyet görmek istemiyor. Daha somut, dengeli adımlar bekliyor.',
    keywords: ['merak', 'ilham', 'oyun', 'hassasiyet', 'ifade'],
    context: 'Partnerin, saf merak ve küçük ilhamlı adımlar bekliyor.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ra_pos6',
    card: 'Knight of Cups',
    position: 6,
    upright:
      'Partnerin senden romantik ve vizyoner bir enerji bekliyor. Ona kalpten teklifler sunmanı istiyor.',
    reversed:
      'Partnerin tutarsız romantizm görmek istemiyor. Netlik ve süreklilik onun için çok değerli.',
    keywords: ['romantizm', 'vizyon', 'kalp', 'teklif', 'hareket'],
    context: 'Partnerin, romantik ama tutarlı adımlar bekliyor.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ra_pos6',
    card: 'Queen of Cups',
    position: 6,
    upright:
      'Partnerin senden empati, şefkat ve güvenli bir duygusal alan bekliyor. Onu yargısızca kucaklamanı istiyor.',
    reversed:
      'Partnerin sınır erimesi görmek istemiyor. Sağlıklı öz düzenleme beklentisi var.',
    keywords: ['empati', 'şefkat', 'alan', 'denge', 'sezgi'],
    context: 'Partnerin, empati ve güvenli bir duygusal alan bekliyor.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ra_pos6',
    card: 'King of Cups',
    position: 6,
    upright:
      'Partnerin senden olgunluk, sakinlik ve duygusal liderlik bekliyor. Fırtınada bile merkezde kalmanı istiyor.',
    reversed:
      'Partnerin pasif agresyon görmek istemiyor. Açık ve dengeli ifade onun beklentisi.',
    keywords: ['olgunluk', 'denge', 'liderlik', 'duygu', 'sükunet'],
    context: 'Partnerin, olgun ve dengeli bir liderlik bekliyor.',
    group: 'Kupalar',
  },
  // SWORDS (Kılıçlar)
  {
    id: 'ace_of_swords_ra_pos6',
    card: 'Ace of Swords',
    position: 6,
    upright:
      'Partnerin senden açık sözlülük ve keskin bir netlik bekliyor. Ona hakikati perdelemeden sunmanı istiyor.',
    reversed:
      'Partnerin belirsizlik ve kaçamaklı ifadeler görmek istemiyor. Sadelik ve dürüstlük onun için önemli.',
    keywords: ['hakikat', 'netlik', 'dürüstlük', 'karar', 'ifade'],
    context: 'Partnerin, hakikati duymak ve netlikle güven bulmak istiyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ra_pos6',
    card: 'Two of Swords',
    position: 6,
    upright:
      'Partnerin senden dengeli bir seçim yapmanı bekliyor. Kararlarını açıkça dile getirmeni istiyor.',
    reversed:
      'Partnerin kararsızlık görmek istemiyor. Kör noktaları fark edip netleşmeni bekliyor.',
    keywords: ['denge', 'karar', 'ikilem', 'seçim', 'netlik'],
    context: 'Partnerin, kararlarında netlik ve denge bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ra_pos6',
    card: 'Three of Swords',
    position: 6,
    upright:
      'Partnerin senden kırgınlıklarını dürüstçe paylaşmanı istiyor. Yaranı saklamaman onun için kıymetli.',
    reversed:
      'Partnerin sürekli eski acılara dönmeni istemiyor. Affedişle ilerlemeni bekliyor.',
    keywords: ['kırgınlık', 'gerçek', 'açıklık', 'iyileşme', 'affediş'],
    context:
      'Partnerin, acını dürüstçe paylaşmanı ve affedişi seçmeni bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ra_pos6',
    card: 'Four of Swords',
    position: 6,
    upright:
      'Partnerin senden sakinleşme ve düşünerek adım atmanı bekliyor. Ona dinginlik vermeni istiyor.',
    reversed:
      'Partnerin pasiflik görmek istemiyor. Fazla suskunluk yerine paylaşım bekliyor.',
    keywords: ['dinlenme', 'sükunet', 'denge', 'hazırlık', 'sessizlik'],
    context: 'Partnerin, dingin ve düşünülmüş bir yaklaşım bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ra_pos6',
    card: 'Five of Swords',
    position: 6,
    upright:
      'Partnerin senden kavgadan çok köprü kurmanı bekliyor. Haklı çıkmak değil, huzur onun için değerli.',
    reversed:
      'Partnerin alttan alta güç savaşları görmek istemiyor. Onarıcı bir dil bekliyor.',
    keywords: ['çatışma', 'ego', 'barış', 'onarım', 'uzlaşma'],
    context: 'Partnerin, kazanmayı değil barışı seçmeni bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ra_pos6',
    card: 'Six of Swords',
    position: 6,
    upright:
      'Partnerin senden geçmişi arkada bırakıp sakin sulara geçmeni bekliyor. Ona geleceğe odaklanmanı istiyor.',
    reversed:
      'Partnerin sürekli geçmişi gündeme getirmeni istemiyor. İlerleme ve geçiş beklentisi var.',
    keywords: ['geçiş', 'ilerleme', 'sükunet', 'yenilenme', 'yön'],
    context:
      'Partnerin, geçmişi geride bırakıp birlikte ileriye bakmanı bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ra_pos6',
    card: 'Seven of Swords',
    position: 6,
    upright:
      'Partnerin senden dürüstlük ve şeffaflık bekliyor. Gizli planlar değil, açık niyet görmek istiyor.',
    reversed:
      'Partnerin yarım gerçekler görmek istemiyor. Açıklık ve güvenilirlik onun için çok kıymetli.',
    keywords: ['dürüstlük', 'şeffaflık', 'güven', 'açıklık', 'niyet'],
    context: 'Partnerin, açık ve güvenilir olmanı bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ra_pos6',
    card: 'Eight of Swords',
    position: 6,
    upright:
      'Partnerin senden korkularının seni yönetmesine izin vermemeni istiyor. Cesurca adım bekliyor.',
    reversed:
      'Partnerin kurban rolünde kalmanı istemiyor. Özgürleşmeni ve sorumluluk almanı bekliyor.',
    keywords: ['özgürlük', 'sorumluluk', 'cesaret', 'netlik', 'güç'],
    context: 'Partnerin, korkularını aşıp özgürleşmeni bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ra_pos6',
    card: 'Nine of Swords',
    position: 6,
    upright:
      'Partnerin senden kaygılarını dürüstçe paylaşmanı istiyor. Ona duygularını saklamaman değerli.',
    reversed:
      'Partnerin sürekli karanlık senaryolar görmek istemiyor. Daha umutlu yaklaşım bekliyor.',
    keywords: ['kaygı', 'dürüstlük', 'paylaşım', 'umut', 'gerçek'],
    context:
      'Partnerin, kaygılarını paylaşmanı ama umutla dengelemeni bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ra_pos6',
    card: 'Ten of Swords',
    position: 6,
    upright:
      'Partnerin senden kapanmış döngülere saygı göstermenizi bekliyor. Yeni başlangıç için yer açmanı istiyor.',
    reversed:
      'Partnerin eski yaralara takılmanı istemiyor. Yeniden doğuşa açık olmanı bekliyor.',
    keywords: ['kapanış', 'yeniden doğuş', 'kabul', 'şifa', 'umut'],
    context: 'Partnerin, kapanışı kabul edip yeniyi karşılamanı bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ra_pos6',
    card: 'Page of Swords',
    position: 6,
    upright:
      'Partnerin senden meraklı ama saygılı bir iletişim bekliyor. Ona dürüst sorularla yaklaşmanı istiyor.',
    reversed:
      'Partnerin dedikodu veya acele yargı görmek istemiyor. Net ve olgun iletişim bekliyor.',
    keywords: ['merak', 'iletişim', 'dürüstlük', 'öğrenme', 'saygı'],
    context: 'Partnerin, açık ve saygılı iletişim bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ra_pos6',
    card: 'Knight of Swords',
    position: 6,
    upright:
      'Partnerin senden cesur, net ve kararlı hareketler bekliyor. Onun için adım atmanı istiyor.',
    reversed:
      'Partnerin aceleyle ve düşünmeden hareket etmeni istemiyor. Dengeli kararlılık bekliyor.',
    keywords: ['cesaret', 'karar', 'netlik', 'hareket', 'denge'],
    context: 'Partnerin, cesur ama dengeli adımlar bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ra_pos6',
    card: 'Queen of Swords',
    position: 6,
    upright:
      'Partnerin senden dürüstlük, net sınırlar ve açıklık bekliyor. Ona gerçekleri tatlı sert sunmanı istiyor.',
    reversed:
      'Partnerin aşırı eleştiri görmek istemiyor. Şefkatle açıklık bekliyor.',
    keywords: ['dürüstlük', 'netlik', 'sınır', 'şefkat', 'adalet'],
    context: 'Partnerin, dürüst ama şefkatli bir açıklık bekliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ra_pos6',
    card: 'King of Swords',
    position: 6,
    upright:
      'Partnerin senden stratejik düşünce, adil karar ve olgun iletişim bekliyor. Ona vizyoner bir yön göstermen değerli.',
    reversed:
      'Partnerin soğuk ve katı bir tavır istemiyor. Empatiyle dengeyi kurmanı bekliyor.',
    keywords: ['adalet', 'strateji', 'iletişim', 'olgunluk', 'denge'],
    context: 'Partnerin, adil ve stratejik liderlik bekliyor.',
    group: 'Kılıçlar',
  },

  // WANDS (Asalar)
  {
    id: 'ace_of_wands_ra_pos6',
    card: 'Ace of Wands',
    position: 6,
    upright:
      'Partnerin senden yeni bir enerji ve heyecanlı bir başlangıç bekliyor. Cesur girişimlerin ilişkiye can katmasını istiyor.',
    reversed:
      'Partnerin hevesin yarıda kalmasını istemiyor. Tutarlılık ve süreklilik beklentisi var.',
    keywords: ['başlangıç', 'enerji', 'heves', 'cesaret', 'hareket'],
    context: 'Partnerin, yeni bir enerji ve cesur adımlar bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ra_pos6',
    card: 'Two of Wands',
    position: 6,
    upright:
      'Partnerin senden vizyonunu paylaşmanı ve geleceğe dair plan kurmanı bekliyor. Onunla yol çizmeyi istiyor.',
    reversed:
      'Partnerin kararsızlık görmek istemiyor. Ona net bir yön göstermen beklentisi var.',
    keywords: ['vizyon', 'plan', 'gelecek', 'karar', 'ufuk'],
    context: 'Partnerin, ortak vizyon ve plan bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ra_pos6',
    card: 'Three of Wands',
    position: 6,
    upright:
      'Partnerin senden genişleme, yeni fırsatlar ve işbirliği istiyor. Ufuk açıcı bir tavır bekliyor.',
    reversed:
      'Partnerin dar görüşlülük istemiyor. Açık fikirli olmanı bekliyor.',
    keywords: ['fırsat', 'işbirliği', 'vizyon', 'genişleme', 'ilerleme'],
    context: 'Partnerin, ufku gören ve genişlemeye açık olmanı bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ra_pos6',
    card: 'Four of Wands',
    position: 6,
    upright:
      'Partnerin senden istikrar, kutlama ve güvenli bir temel bekliyor. Ona yuva hissi vermeni istiyor.',
    reversed:
      'Partnerin sahte huzur istemiyor. Gerçek istikrar ve aidiyet beklentisi var.',
    keywords: ['istikrar', 'temel', 'kutlama', 'aidiyet', 'güven'],
    context: 'Partnerin, sağlam bir temel ve aidiyet hissi bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ra_pos6',
    card: 'Five of Wands',
    position: 6,
    upright:
      'Partnerin senden yapıcı bir rekabet ve sağlıklı mücadele bekliyor. Ona oyun gibi yaklaşmanı istiyor.',
    reversed:
      'Partnerin kavgacı tavır görmek istemiyor. Daha çok işbirliği ve uyum bekliyor.',
    keywords: ['mücadele', 'rekabet', 'enerji', 'işbirliği', 'denge'],
    context: 'Partnerin, sağlıklı mücadele ve işbirliği bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ra_pos6',
    card: 'Six of Wands',
    position: 6,
    upright:
      'Partnerin senden başarılarını paylaşmanı ve onu onurlandırmanı bekliyor. Kutlama ve takdir onun için değerli.',
    reversed:
      'Partnerin ilgisiz kalmanı istemiyor. Küçük zaferleri de fark etmeni bekliyor.',
    keywords: ['başarı', 'takdir', 'zafer', 'paylaşım', 'kutlama'],
    context: 'Partnerin, başarıların kutlanmasını ve takdir görmeyi bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ra_pos6',
    card: 'Seven of Wands',
    position: 6,
    upright:
      'Partnerin senden kararlılık ve kendi değerlerini savunmanı bekliyor. Güçlü duruş ona güven veriyor.',
    reversed:
      'Partnerin gereksiz çatışma istemiyor. Esneklik ve anlayış bekliyor.',
    keywords: ['savunma', 'kararlılık', 'değer', 'direnç', 'güç'],
    context: 'Partnerin, kararlı ama esnek durmanı bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ra_pos6',
    card: 'Eight of Wands',
    position: 6,
    upright:
      'Partnerin senden hızlı, net ve akıcı iletişim bekliyor. Ona zamanında dönüş yapmanı istiyor.',
    reversed:
      'Partnerin karmaşık sinyaller görmek istemiyor. Sadelik ve açıklık beklentisi var.',
    keywords: ['iletişim', 'hız', 'netlik', 'akış', 'senkron'],
    context: 'Partnerin, akıcı ve hızlı iletişim bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ra_pos6',
    card: 'Nine of Wands',
    position: 6,
    upright:
      'Partnerin senden dayanıklılık ve ilişkide kalıcılık bekliyor. Ona pes etmeyeceğini hissettirmek istiyor.',
    reversed:
      'Partnerin sürekli tetikte olmanı istemiyor. Daha rahat ve güvenli bir enerji bekliyor.',
    keywords: ['dayanıklılık', 'istikrar', 'koruma', 'süreklilik', 'güven'],
    context: 'Partnerin, pes etmeyen bir bağlılık bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ra_pos6',
    card: 'Ten of Wands',
    position: 6,
    upright:
      'Partnerin senden sorumlulukları paylaşmanı bekliyor. Onun yükünü hafifletmeni istiyor.',
    reversed:
      'Partnerin aşırı yüklenmeni istemiyor. Dengeli paylaşım bekliyor.',
    keywords: ['sorumluluk', 'paylaşım', 'denge', 'yük', 'işbirliği'],
    context: 'Partnerin, sorumlulukların dengeli paylaşılmasını bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ra_pos6',
    card: 'Page of Wands',
    position: 6,
    upright:
      'Partnerin senden merak, oyunbazlık ve yeni fikirler bekliyor. Onu küçük maceralara davet etmeni istiyor.',
    reversed:
      'Partnerin hevesin çabuk sönmesini istemiyor. Daha istikrarlı bir enerji bekliyor.',
    keywords: ['merak', 'oyun', 'heves', 'deneyim', 'ilham'],
    context: 'Partnerin, meraklı ve oyunbaz bir enerji bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ra_pos6',
    card: 'Knight of Wands',
    position: 6,
    upright:
      'Partnerin senden tutkulu ve cesur bir yaklaşım bekliyor. Ona kalpten gelen girişimlerle gelmeni istiyor.',
    reversed:
      'Partnerin savrukluk görmek istemiyor. Adımlarının tutarlı olmasını bekliyor.',
    keywords: ['tutku', 'cesaret', 'hareket', 'girişim', 'istikrar'],
    context: 'Partnerin, tutkulu ama tutarlı adımlar bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ra_pos6',
    card: 'Queen of Wands',
    position: 6,
    upright:
      'Partnerin senden güven, sıcaklık ve karizma bekliyor. Ona ilham olmanı istiyor.',
    reversed:
      'Partnerin kıskançlık veya güvensizlik görmek istemiyor. Dengeli bir güven enerjisi bekliyor.',
    keywords: ['güven', 'karizma', 'ilham', 'sıcaklık', 'özdeğer'],
    context: 'Partnerin, sıcak ve güven veren bir enerji bekliyor.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ra_pos6',
    card: 'King of Wands',
    position: 6,
    upright:
      'Partnerin senden vizyoner liderlik ve cesur yönlendirme bekliyor. Ona birlikte ilerleyecek güçlü bir rota çizmeni istiyor.',
    reversed:
      'Partnerin otoriterlik görmek istemiyor. Dinleyen ve paylaşan bir liderlik bekliyor.',
    keywords: ['liderlik', 'vizyon', 'cesaret', 'rota', 'paylaşım'],
    context: 'Partnerin, vizyoner ama paylaşan bir liderlik bekliyor.',
    group: 'Asalar',
  },

  // PENTACLES (Tılsımlar)

  {
    id: 'ace_of_pentacles_ra_pos6',
    card: 'Ace of Pentacles',
    position: 6,
    upright:
      'Partnerin senden sağlam bir temel ve güven veren bir başlangıç bekliyor. Somut adımlar görmek istiyor.',
    reversed:
      'Partnerin fırsatların kaçmasını istemiyor. Güvensizlik değil, kararlılık bekliyor.',
    keywords: ['güven', 'başlangıç', 'somutluk', 'istikrar', 'temel'],
    context: 'Partnerin, güvenli ve sağlam bir başlangıç bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ra_pos6',
    card: 'Two of Pentacles',
    position: 6,
    upright:
      'Partnerin senden denge ve esneklik bekliyor. İş, aşk ve hayatı uyumla yürütmeni istiyor.',
    reversed:
      'Partnerin dengesizlik görmek istemiyor. Önceliklerini netleştirmeni bekliyor.',
    keywords: ['denge', 'esneklik', 'öncelik', 'uyum', 'dengeleyici'],
    context: 'Partnerin, denge kurmanı ve önceliklerini yönetmeni bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ra_pos6',
    card: 'Three of Pentacles',
    position: 6,
    upright:
      'Partnerin senden işbirliği ve ortak emek bekliyor. İlişkiyi birlikte inşa etmeyi istiyor.',
    reversed:
      'Partnerin tek taraflı çaba görmek istemiyor. Ortak emeğe değer veriyor.',
    keywords: ['işbirliği', 'emek', 'ortaklık', 'dayanışma', 'uyum'],
    context: 'Partnerin, ortak çaba ve işbirliği bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ra_pos6',
    card: 'Four of Pentacles',
    position: 6,
    upright:
      'Partnerin senden güvenlik ve sadakat bekliyor. Ona sahiplenici ama dengeli yaklaşmanı istiyor.',
    reversed:
      'Partnerin aşırı kontrol görmek istemiyor. Paylaşımda cömertlik bekliyor.',
    keywords: ['güvenlik', 'sadakat', 'sahiplenme', 'denge', 'koruma'],
    context: 'Partnerin, güvenli ama paylaşan bir yaklaşım bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ra_pos6',
    card: 'Five of Pentacles',
    position: 6,
    upright:
      'Partnerin zor zamanlarında yanında olmanı bekliyor. Ona destek ve dayanışma istiyor.',
    reversed:
      'Partnerin kendini yalnız hissetmek istemiyor. Birlikte toparlanmayı bekliyor.',
    keywords: ['destek', 'dayanışma', 'sadakat', 'birlik', 'şefkat'],
    context: 'Partnerin, zor günlerde yanında olmanı bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ra_pos6',
    card: 'Six of Pentacles',
    position: 6,
    upright:
      'Partnerin senden adil paylaşım ve şeffaf denge bekliyor. Verme-alma dengesini gözetmeni istiyor.',
    reversed:
      'Partnerin güç dengesizliği istemiyor. Koşulsuz paylaşım bekliyor.',
    keywords: ['paylaşım', 'adalet', 'denge', 'şeffaflık', 'güven'],
    context: 'Partnerin, dengeli ve adil bir alışveriş bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ra_pos6',
    card: 'Seven of Pentacles',
    position: 6,
    upright:
      'Partnerin senden sabır ve emeğinin meyvesini bekleme gücü istiyor. Uzun vadeli yaklaşım arıyor.',
    reversed:
      'Partnerin aceleci sonuç istemiyor. Kararlı sabır ve sebat bekliyor.',
    keywords: ['sabır', 'sebat', 'hasat', 'değerlendirme', 'istikrar'],
    context: 'Partnerin, sabırlı ve uzun vadeli yaklaşım bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ra_pos6',
    card: 'Eight of Pentacles',
    position: 6,
    upright:
      'Partnerin senden emek, özen ve sürekli gelişim bekliyor. İlişkiye çaba katmanı istiyor.',
    reversed:
      'Partnerin özensizlik görmek istemiyor. Çalışkanlık ve sadakat bekliyor.',
    keywords: ['emek', 'özen', 'gelişim', 'çaba', 'istikrar'],
    context: 'Partnerin, özenli emek ve sadakat bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ra_pos6',
    card: 'Nine of Pentacles',
    position: 6,
    upright:
      'Partnerin senden özgüven ve bağımsızlıkla gelen huzuru paylaşmanı bekliyor. Ona olgun bir alan açmanı istiyor.',
    reversed:
      'Partnerin aşırı bağımlılık görmek istemiyor. Özgüvenle yan yana durmanı bekliyor.',
    keywords: ['özgüven', 'bağımsızlık', 'huzur', 'olgunluk', 'denge'],
    context: 'Partnerin, özgüvenli ve huzurlu bir enerji bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ra_pos6',
    card: 'Ten of Pentacles',
    position: 6,
    upright:
      'Partnerin senden uzun vadeli istikrar ve aile temeli bekliyor. Kalıcı düzen kurmanı istiyor.',
    reversed:
      'Partnerin geçicilik istemiyor. Sürdürülebilir güven ve düzen bekliyor.',
    keywords: ['istikrar', 'aile', 'gelecek', 'kalıcılık', 'güven'],
    context: 'Partnerin, uzun vadeli kalıcı bir yapı bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ra_pos6',
    card: 'Page of Pentacles',
    position: 6,
    upright:
      'Partnerin senden öğrenmeye açık ve pratik adımlar bekliyor. Ona yeni yollar denemeni istiyor.',
    reversed:
      'Partnerin ertelemeler istemiyor. Küçük ama kararlı adımlar bekliyor.',
    keywords: ['öğrenme', 'pratik', 'deneyim', 'adım', 'kararlılık'],
    context: 'Partnerin, öğrenen ve kararlı bir yaklaşım bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ra_pos6',
    card: 'Knight of Pentacles',
    position: 6,
    upright:
      'Partnerin senden güvenilirlik, sabır ve tutarlı ilerleme bekliyor. Ona istikrar hissettirmek istiyor.',
    reversed:
      'Partnerin durağanlık istemiyor. Yavaş ama emin adımlar bekliyor.',
    keywords: ['güven', 'sabır', 'istikrar', 'tutarlılık', 'sadakat'],
    context: 'Partnerin, güvenilir ve sabırlı ilerleyiş bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ra_pos6',
    card: 'Queen of Pentacles',
    position: 6,
    upright:
      'Partnerin senden şefkatli pratiklik ve güvenli alan bekliyor. Ona destek olmanı istiyor.',
    reversed:
      'Partnerin aşırı yük görmek istemiyor. Paylaşımda denge bekliyor.',
    keywords: ['şefkat', 'güven', 'pratiklik', 'öz bakım', 'denge'],
    context: 'Partnerin, şefkatli ve güvenli bir alan bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ra_pos6',
    card: 'King of Pentacles',
    position: 6,
    upright:
      'Partnerin senden güçlü, güvenilir ve vizyon sahibi bir liderlik bekliyor. Ona istikrar sunmanı istiyor.',
    reversed:
      'Partnerin otoriterlik veya aşırı kontrol görmek istemiyor. Paylaşımcı ve dengeli bir güç bekliyor.',
    keywords: ['liderlik', 'istikrar', 'güven', 'vizyon', 'paylaşım'],
    context: 'Partnerin, güven veren ve vizyoner bir liderlik bekliyor.',
    group: 'Tılsımlar',
  },

  {
    id: 'ace_of_pentacles_ra_pos6',
    card: 'Ace of Pentacles',
    position: 6,
    upright:
      'Partnerin senden sağlam bir temel ve güven veren bir başlangıç bekliyor. Somut adımlar görmek istiyor.',
    reversed:
      'Partnerin fırsatların kaçmasını istemiyor. Güvensizlik değil, kararlılık bekliyor.',
    keywords: ['güven', 'başlangıç', 'somutluk', 'istikrar', 'temel'],
    context: 'Partnerin, güvenli ve sağlam bir başlangıç bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ra_pos6',
    card: 'Two of Pentacles',
    position: 6,
    upright:
      'Partnerin senden denge ve esneklik bekliyor. İş, aşk ve hayatı uyumla yürütmeni istiyor.',
    reversed:
      'Partnerin dengesizlik görmek istemiyor. Önceliklerini netleştirmeni bekliyor.',
    keywords: ['denge', 'esneklik', 'öncelik', 'uyum', 'dengeleyici'],
    context: 'Partnerin, denge kurmanı ve önceliklerini yönetmeni bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ra_pos6',
    card: 'Three of Pentacles',
    position: 6,
    upright:
      'Partnerin senden işbirliği ve ortak emek bekliyor. İlişkiyi birlikte inşa etmeyi istiyor.',
    reversed:
      'Partnerin tek taraflı çaba görmek istemiyor. Ortak emeğe değer veriyor.',
    keywords: ['işbirliği', 'emek', 'ortaklık', 'dayanışma', 'uyum'],
    context: 'Partnerin, ortak çaba ve işbirliği bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ra_pos6',
    card: 'Four of Pentacles',
    position: 6,
    upright:
      'Partnerin senden güvenlik ve sadakat bekliyor. Ona sahiplenici ama dengeli yaklaşmanı istiyor.',
    reversed:
      'Partnerin aşırı kontrol görmek istemiyor. Paylaşımda cömertlik bekliyor.',
    keywords: ['güvenlik', 'sadakat', 'sahiplenme', 'denge', 'koruma'],
    context: 'Partnerin, güvenli ama paylaşan bir yaklaşım bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ra_pos6',
    card: 'Five of Pentacles',
    position: 6,
    upright:
      'Partnerin zor zamanlarında yanında olmanı bekliyor. Ona destek ve dayanışma istiyor.',
    reversed:
      'Partnerin kendini yalnız hissetmek istemiyor. Birlikte toparlanmayı bekliyor.',
    keywords: ['destek', 'dayanışma', 'sadakat', 'birlik', 'şefkat'],
    context: 'Partnerin, zor günlerde yanında olmanı bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ra_pos6',
    card: 'Six of Pentacles',
    position: 6,
    upright:
      'Partnerin senden adil paylaşım ve şeffaf denge bekliyor. Verme-alma dengesini gözetmeni istiyor.',
    reversed:
      'Partnerin güç dengesizliği istemiyor. Koşulsuz paylaşım bekliyor.',
    keywords: ['paylaşım', 'adalet', 'denge', 'şeffaflık', 'güven'],
    context: 'Partnerin, dengeli ve adil bir alışveriş bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ra_pos6',
    card: 'Seven of Pentacles',
    position: 6,
    upright:
      'Partnerin senden sabır ve emeğinin meyvesini bekleme gücü istiyor. Uzun vadeli yaklaşım arıyor.',
    reversed:
      'Partnerin aceleci sonuç istemiyor. Kararlı sabır ve sebat bekliyor.',
    keywords: ['sabır', 'sebat', 'hasat', 'değerlendirme', 'istikrar'],
    context: 'Partnerin, sabırlı ve uzun vadeli yaklaşım bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ra_pos6',
    card: 'Eight of Pentacles',
    position: 6,
    upright:
      'Partnerin senden emek, özen ve sürekli gelişim bekliyor. İlişkiye çaba katmanı istiyor.',
    reversed:
      'Partnerin özensizlik görmek istemiyor. Çalışkanlık ve sadakat bekliyor.',
    keywords: ['emek', 'özen', 'gelişim', 'çaba', 'istikrar'],
    context: 'Partnerin, özenli emek ve sadakat bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ra_pos6',
    card: 'Nine of Pentacles',
    position: 6,
    upright:
      'Partnerin senden özgüven ve bağımsızlıkla gelen huzuru paylaşmanı bekliyor. Ona olgun bir alan açmanı istiyor.',
    reversed:
      'Partnerin aşırı bağımlılık görmek istemiyor. Özgüvenle yan yana durmanı bekliyor.',
    keywords: ['özgüven', 'bağımsızlık', 'huzur', 'olgunluk', 'denge'],
    context: 'Partnerin, özgüvenli ve huzurlu bir enerji bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ra_pos6',
    card: 'Ten of Pentacles',
    position: 6,
    upright:
      'Partnerin senden uzun vadeli istikrar ve aile temeli bekliyor. Kalıcı düzen kurmanı istiyor.',
    reversed:
      'Partnerin geçicilik istemiyor. Sürdürülebilir güven ve düzen bekliyor.',
    keywords: ['istikrar', 'aile', 'gelecek', 'kalıcılık', 'güven'],
    context: 'Partnerin, uzun vadeli kalıcı bir yapı bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ra_pos6',
    card: 'Page of Pentacles',
    position: 6,
    upright:
      'Partnerin senden öğrenmeye açık ve pratik adımlar bekliyor. Ona yeni yollar denemeni istiyor.',
    reversed:
      'Partnerin ertelemeler istemiyor. Küçük ama kararlı adımlar bekliyor.',
    keywords: ['öğrenme', 'pratik', 'deneyim', 'adım', 'kararlılık'],
    context: 'Partnerin, öğrenen ve kararlı bir yaklaşım bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ra_pos6',
    card: 'Knight of Pentacles',
    position: 6,
    upright:
      'Partnerin senden güvenilirlik, sabır ve tutarlı ilerleme bekliyor. Ona istikrar hissettirmek istiyor.',
    reversed:
      'Partnerin durağanlık istemiyor. Yavaş ama emin adımlar bekliyor.',
    keywords: ['güven', 'sabır', 'istikrar', 'tutarlılık', 'sadakat'],
    context: 'Partnerin, güvenilir ve sabırlı ilerleyiş bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ra_pos6',
    card: 'Queen of Pentacles',
    position: 6,
    upright:
      'Partnerin senden şefkatli pratiklik ve güvenli alan bekliyor. Ona destek olmanı istiyor.',
    reversed:
      'Partnerin aşırı yük görmek istemiyor. Paylaşımda denge bekliyor.',
    keywords: ['şefkat', 'güven', 'pratiklik', 'öz bakım', 'denge'],
    context: 'Partnerin, şefkatli ve güvenli bir alan bekliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ra_pos6',
    card: 'King of Pentacles',
    position: 6,
    upright:
      'Partnerin senden güçlü, güvenilir ve vizyon sahibi bir liderlik bekliyor. Ona istikrar sunmanı istiyor.',
    reversed:
      'Partnerin otoriterlik veya aşırı kontrol görmek istemiyor. Paylaşımcı ve dengeli bir güç bekliyor.',
    keywords: ['liderlik', 'istikrar', 'güven', 'vizyon', 'paylaşım'],
    context: 'Partnerin, güven veren ve vizyoner bir liderlik bekliyor.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 6 anlamını bulma fonksiyonu
export const getPosition6Meaning = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
  return position6Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipAnalysisPosition6Meaning = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
  return getPosition6Meaning(cardName);
};

// Kart adına göre pozisyon 6 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipAnalysisPosition6MeaningByCardName = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
  const meaning = getPosition6Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 6 anlamlarını alma fonksiyonu
export const getAllPosition6Meanings =
  (): RelationshipAnalysisPositionMeaning[] => {
    return position6Meanings;
  };

// Pozisyon 6 anlamlarını filtreleme fonksiyonu
export const getPosition6MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipAnalysisPositionMeaning[] => {
  return position6Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 6 anlamlarını arama
export const searchPosition6MeaningsByKeyword = (
  keyword: string
): RelationshipAnalysisPositionMeaning[] => {
  return position6Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position6Meanings,
  getRelationshipAnalysisPosition6Meaning,
  getRelationshipAnalysisPosition6MeaningByCardName,
  getAllPosition6Meanings: getAllPosition6Meanings,
  getRelationshipAnalysisPosition6MeaningsByGroup: getPosition6MeaningsByGroup,
};
