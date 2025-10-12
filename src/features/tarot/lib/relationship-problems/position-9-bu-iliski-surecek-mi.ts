'use client';

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
- position9Meanings: gerekli
- getposition9Meaning: gerekli
*/

// import { getRelationshipProblemsMeaningByCardAndPositionMeaning } from './position-meanings-index';
import { RelationshipProblemsPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position9Meanings: RelationshipProblemsPositionMeaning[] = [
  // MAJÖR ARKANA
  // RELATIONSHIP CONFLICT — Pozisyon 9: 'Bu ilişki sürecek mi?'
  // MAJOR ARCANA (22)
  {
    id: 'the_fool_rc_pos9',
    card: 'The Fool',
    position: 9,
    upright:
      'Joker, ilişkiye taze bir nefes ve yeniden başlama cesareti getirir. Esnek, keşfe açık ve yük taşımayan bir yaklaşım benimserseniz sürme ihtimali yüksektir.',
    reversed:
      'Ters Joker, pervasız kararlar, bağlanmaktan kaçış ve “bakarız” tutumu ilişkiyi yorar. Yön ve çerçeve konulmazsa süreklilik zayıflar.',
    keywords: ['başlangıç', 'özgür ruh', 'esneklik', 'bağlanma', 'yön'],
    context:
      'Sürmesi için: açık niyet + küçük ama tutarlı adımlar; tesadüfe bırakmayın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_rc_pos9',
    card: 'The Magician',
    position: 9,
    upright:
      'Büyücü, doğru iletişim, net niyet ve kaynakları akıllı kullanımla ilişkinin devam edebileceğini söyler. “Ne istiyoruz?” sorusuna ortak yanıt sürdürülebilirlik üretir.',
    reversed:
      'Ters Büyücü, söz–eylem tutarsızlığı ve algı oyunları uzun vadeyi sabote eder. Güven aşınırsa süreç dağılır.',
    keywords: ['niyet', 'iletişim', 'tutarlılık', 'güven', 'kaynak'],
    context: 'Sürmesi için: açık hedef, yazılı küçük plan ve düzenli check-in.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_rc_pos9',
    card: 'The High Priestess',
    position: 9,
    upright:
      'Başrahibe, sezgisel uyum ve saygılı alanla ilişkinin derinleşebileceğini söyler. Sessiz güç ve mahremiyet bağa uzun ömür katar.',
    reversed:
      'Ters Başrahibe, gizlilik ve ima dili güveni aşındırır. Söylenmeyenler büyürse devam zorlaşır.',
    keywords: ['sezgi', 'mahremiyet', 'güven', 'giz', 'açıklık'],
    context:
      'Sürmesi için: açık sınırlar + sakince paylaşım; sır ekonomisini azaltın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_rc_pos9',
    card: 'The Empress',
    position: 9,
    upright:
      'İmparatoriçe, bakım, şefkat ve üretkenliğin ilişkiyi beslediğini söyler. Ortak konfor ve duygusal güvenlik sürdürülebilirliği artırır.',
    reversed:
      'Ters İmparatoriçe, boğucu sahiplenme veya ihmal dengesizliği yaratır. İhtiyaçlar görülmezse bağ zayıflar.',
    keywords: ['bakım', 'şefkat', 'üretkenlik', 'konfor', 'ihtiyaç'],
    context:
      'Sürmesi için: bakımın dozu + görünür takdir + karşılıklı besleme.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_rc_pos9',
    card: 'The Emperor',
    position: 9,
    upright:
      'İmparator, net kurallar, rol ve sınırlarla ilişkinin uzun vadeli istikrara kavuşacağını söyler. Yapı güven verir.',
    reversed:
      'Ters İmparator, katılık ve kontrolcülük sıcaklığı söndürür. Esneklik olmadan sürdürülebilirlik düşer.',
    keywords: ['yapı', 'sınır', 'güven', 'esneklik', 'kontrol'],
    context: 'Sürmesi için: birlikte yazılmış kurallar + esnek uygulama.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_rc_pos9',
    card: 'The Hierophant',
    position: 9,
    upright:
      'Aziz, ortak değerler, aile/geleneğin desteği ve sağlıklı ritüellerle ilişkinin sürme şansı yüksektir. Değer uyumu omurga olur.',
    reversed:
      'Ters Aziz, dogma, utandırma ve kalıp beklentiler ilişkiyi boğar. Özgünlük ezilirse devam zorlaşır.',
    keywords: ['değerler', 'ritüel', 'toplum', 'dogma', 'özgünlük'],
    context: 'Sürmesi için: ortak değer bildirgesi + gereksiz normları eleme.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_rc_pos9',
    card: 'The Lovers',
    position: 9,
    upright:
      'Aşıklar, bilinçli seçim, karşılıklılık ve uyumla ilişkinin devam edebileceğini söyler. “Birlikte seçiyoruz” cümlesi köklenmeyi sağlar.',
    reversed:
      'Ters Aşıklar, ikilemler ve uyumsuz değerler sürekliliği tehdit eder. Kararsızlık bağı yıpratır.',
    keywords: ['seçim', 'uyum', 'karşılıklılık', 'ikilem', 'bağ'],
    context: 'Sürmesi için: açık taahhüt + ortak rota + net sınırlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_rc_pos9',
    card: 'The Chariot',
    position: 9,
    upright:
      'Savaş Arabası, ortak hedef ve disiplinli ilerleyişle ilişki rayda kalır. Birlikte yön belirlemek süreklilik üretir.',
    reversed:
      'Ters Savaş Arabası, farklı hızlar ve güç savaşları ilişkiyi savurur. Direksiyon çekişmesi sürdürmeyi zorlar.',
    keywords: ['hedef', 'ivme', 'yön', 'disiplin', 'güç'],
    context: 'Sürmesi için: tempo anlaşması + ivmeyi ortaklaştırma.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_rc_pos9',
    card: 'Strength',
    position: 9,
    upright:
      'Güç, nazik kuvvet, sabır ve özdenetimle ilişkinin dayanıklılığı artar. Şefkatli tutarlılık uzun ömür getirir.',
    reversed:
      'Ters Güç, tetiklerle yükselmek, kıskançlık ve gurur devamı zorlar. Regülasyon yoksa yıpranma büyür.',
    keywords: [
      'sabır',
      'nazik güç',
      'regülasyon',
      'kıskançlık',
      'dayanıklılık',
    ],
    context: 'Sürmesi için: tetik haritası + sakinleşme protokolü.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_rc_pos9',
    card: 'The Hermit',
    position: 9,
    upright:
      'Ermiş, sağlıklı alan ve bilinçli yalnızlıkla ilişkinin nefes alacağını söyler. İç bilgelik sürekliliği destekler.',
    reversed:
      'Ters Ermiş, aşırı izolasyon ve duvardan duvara suskunluk bağları zayıflatır. Uzaklık büyürse sürdürmek güçleşir.',
    keywords: ['alan', 'iç görü', 'yalnızlık', 'iletişim', 'denge'],
    context: 'Sürmesi için: planlı alan + planlı bağlantı ritmi.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_rc_pos9',
    card: 'The Wheel of Fortune',
    position: 9,
    upright:
      'Kader Çarkı, iniş çıkışları birlikte yöneten çiftlerin uzun vadede kalabildiğini söyler. Esneklik ve uyum kabiliyeti anahtardır.',
    reversed:
      'Ters Kader Çarkı, tekrar eden toksik döngüler kırılmazsa ilişki yıpranır. Kadercilik değişimi engeller.',
    keywords: ['döngü', 'esneklik', 'uyum', 'alışkanlık', 'değişim'],
    context: 'Sürmesi için: döngü farkındalığı + küçük sistem güncellemeleri.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_rc_pos9',
    card: 'Justice',
    position: 9,
    upright:
      'Adalet, şeffaflık, eşitlik ve zamanında telafiyle ilişki sürdürülebilir. Açık hesap güveni tazeler.',
    reversed:
      'Ters Adalet, çifte standart ve geç özür bağın ipini inceltir. Haksızlık onarılmazsa devam risklenir.',
    keywords: ['eşitlik', 'şeffaflık', 'telafi', 'hak', 'güven'],
    context: 'Sürmesi için: açık metrikler + hızlı onarım kültürü.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_rc_pos9',
    card: 'The Hanged Man',
    position: 9,
    upright:
      'Asılan Adam, kısa süreli fedakârlık ve perspektif değişimiyle ilişki toparlanır. Askıda kalış bilinçli olursa süreklilik sağlar.',
    reversed:
      'Ters Asılan Adam, kronik erteleme ve kurban anlatısı ilişkiyi askıda çürütür.',
    keywords: ['fedakârlık', 'perspektif', 'erteleme', 'askı', 'denge'],
    context: 'Sürmesi için: süreli fedakârlık + net dönüş tarihi.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_rc_pos9',
    card: 'Death',
    position: 9,
    upright:
      'Ölüm, eski kalıpları bitirirseniz ilişkinin yenilenerek sürebileceğini söyler. Arınma, bir üst aşamayı mümkün kılar.',
    reversed:
      'Ters Ölüm, değişime direniş ve vedası gelmiş olana tutunmak sürekliliği daha da zorlaştırır.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'direnç', 'arınma'],
    context: 'Sürmesi için: vedalaş–yenile; yer açmadan devam zor.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_rc_pos9',
    card: 'Temperance',
    position: 9,
    upright:
      'Denge, doz ayarı, orta yol ve entegrasyonla uzun ömürlü bir yapı kurulabilir. Esnek sentez ilişkiyi taşır.',
    reversed:
      'Ters Denge, uçlara savrulma ve ya hep ya hiç tutumu bağın sürekliliğini tehdit eder.',
    keywords: ['denge', 'sentez', 'esneklik', 'orta yol', 'istikrar'],
    context: 'Sürmesi için: ritim sözleşmesi + küçük düzenli ayar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_rc_pos9',
    card: 'The Devil',
    position: 9,
    upright:
      'Şeytan, bağımlılık, kıskançlık ve kontrol kırılmazsa ilişki yorulur. Zincir çözüldüğünde kalıcılık şansı doğar.',
    reversed:
      'Ters Şeytan, toksik bağlardan özgürleşme niyeti varsa ilişki yeni bir zeminle sürebilir; yoksa kopuş kaçınılmazdır.',
    keywords: ['bağımlılık', 'kıskançlık', 'kontrol', 'özgürleşme', 'sınır'],
    context:
      'Sürmesi için: tetik planı + sınır + destek (gerekirse profesyonel).',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_rc_pos9',
    card: 'The Tower',
    position: 9,
    upright:
      'Kule, sarsıcı bir gerçek sonrası radikal onarım yapılırsa ilişki daha dürüst temelde sürebilir. Aksi halde yıkım kalıcı olur.',
    reversed:
      'Ters Kule, çatlakları görmezden gelmek er ya da geç daha büyük kopuş getirir.',
    keywords: ['kriz', 'ifşa', 'onarım', 'gerçek', 'kopuş'],
    context: 'Sürmesi için: çıplak gerçek + net onarım protokolü.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_rc_pos9',
    card: 'The Star',
    position: 9,
    upright:
      'Yıldız, umut, şifa ve nazik süreklilik vaadeder. Küçük ama istikrarlı adımlar ilişkiyi taşır.',
    reversed:
      'Ters Yıldız, pembe beklenti ve plansız iyimserlik hayal kırıklığına dönüşür; umut planla birleşmezse sönümlenir.',
    keywords: ['umut', 'şifa', 'naziklik', 'istikrar', 'plan'],
    context: 'Sürmesi için: umut + ölçülebilir mini hedefler.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_rc_pos9',
    card: 'The Moon',
    position: 9,
    upright:
      'Ay, belirsizlikler ve korkular temizlenmeden süreklilik kırılgan kalır. Sis dağıtılırsa bağ güçlenir.',
    reversed:
      'Ters Ay, kuruntu, ima ve gaslighting devam ederse ilişki yıpranır; netlik kurulmadan sürdürmek zordur.',
    keywords: ['belirsizlik', 'korku', 'netlik', 'kuruntu', 'güven'],
    context: 'Sürmesi için: doğrulama kültürü + açık dil.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_rc_pos9',
    card: 'The Sun',
    position: 9,
    upright:
      'Güneş, açıklık, neşe ve ortak başarıyla uzun vadeli sıcaklık vaat eder. Otantik görünürlük bağı güçlendirir.',
    reversed:
      'Ters Güneş, gösterişe oynanan mutluluk ve bastırılan sorunlar sürekliliği yaralar.',
    keywords: ['açıklık', 'neşe', 'otantiklik', 'başarı', 'görünürlük'],
    context:
      'Sürmesi için: vitrin değil hakikat; düzenli iyi zamanlar planlayın.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_rc_pos9',
    card: 'Judgement',
    position: 9,
    upright:
      'Mahkeme, hesap, telafi ve ikinci fırsatla ilişki yeniden doğabilir. Öğrenilen dersler kalıcılık üretir.',
    reversed:
      'Ters Mahkeme, sorumluluktan kaçış ve tekrarlanan hatalar sürdürmeyi güçleştirir.',
    keywords: ['yüzleşme', 'telafi', 'ikinci şans', 'ders', 'yenilenme'],
    context: 'Sürmesi için: açık muhasebe + somut değişim.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_rc_pos9',
    card: 'The World',
    position: 9,
    upright:
      'Dünya, döngüleri olgun tamamlayıp entegrasyon sağlanırsa kalıcı bir birlikteliğe işaret eder. Olgun bağ mümkündür.',
    reversed:
      'Ters Dünya, yarım bırakılan işler ve kapanmayan dosyalar sürdürülebilirliği zayıflatır.',
    keywords: ['tamamlama', 'entegrasyon', 'olgunluk', 'döngü', 'kapanış'],
    context: 'Sürmesi için: açık uçları kapatın, ortak vizyonu yazın.',
    group: 'Majör Arkana',
  },

  // CUPS (14)
  {
    id: 'ace_of_cups_rc_pos9',
    card: 'Ace of Cups',
    position: 9,
    upright:
      'Kupa Ası, taze duygular ve açılan kalple ilişkinin devam şansı yüksektir. Şefkat ve zarafet bağa can verir.',
    reversed:
      'Ters Kupa Ası, duygusal tıkanıklık ve bastırma devam ederse süreklilik zorlaşır.',
    keywords: ['yeni his', 'açık kalp', 'şefkat', 'tıkanıklık', 'akış'],
    context: 'Sürmesi için: duyguyu adlandırma + yumuşak ifade ritmi.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_rc_pos9',
    card: 'Two of Cups',
    position: 9,
    upright:
      'İki Kupa, karşılıklılık, saygı ve küçük jestlerle uzun ömürlü bir ortaklık işaret eder.',
    reversed:
      'Ters İki Kupa, eşitlik bozulur ve kırgınlık birikirse bağ çözülür.',
    keywords: ['karşılıklılık', 'ittifak', 'eşitlik', 'kırgınlık', 'uyum'],
    context: 'Sürmesi için: haftalık minik jest ve teşekkür protokolü.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_rc_pos9',
    card: 'Three of Cups',
    position: 9,
    upright:
      'Üç Kupa, sosyal destek ve birlikte kutlama ilişkiyi canlı tutar. Paylaşılan sevinçler bağa ömür katar.',
    reversed:
      'Ters Üç Kupa, dedikodu ve üçüncü kişilerin gölgesi süreci yıpratır.',
    keywords: ['kutlama', 'topluluk', 'destek', 'dedikodu', 'mahremiyet'],
    context: 'Sürmesi için: güvenli çevre + mahremiyet sınırı.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_rc_pos9',
    card: 'Four of Cups',
    position: 9,
    upright:
      'Dört Kupa, apati ve bıkkınlık fark edilip üzerine gidilirse bağ tazelenebilir. Farkındalık fırsata döner.',
    reversed: 'Ters Dört Kupa, ilgisizlik kronikleşirse ilişki sönümlenir.',
    keywords: ['apatik', 'fırsat', 'yenileme', 'ilgi', 'motivasyon'],
    context: 'Sürmesi için: planlı yeni deneyimler + takdir rutini.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_rc_pos9',
    card: 'Five of Cups',
    position: 9,
    upright:
      'Beş Kupa, yas tutulup ders alınırsa köprüler onarılabilir; umut penceresi açıktır.',
    reversed: 'Ters Beş Kupa, geçmişte takılı kalmak sürekliliği engeller.',
    keywords: ['yas', 'telafi', 'umut', 'geçmiş', 'onarma'],
    context: 'Sürmesi için: kapanış konuşması + geleceğe odak.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_rc_pos9',
    card: 'Six of Cups',
    position: 9,
    upright:
      'Altı Kupa, birlikte kurulan sıcak anılar ilişkiyi taşır. Masumiyet ve şefkat uzun ömür getirir.',
    reversed: 'Ters Altı Kupa, nostalji bugünü gölgelerse ilerleme durur.',
    keywords: ['nostalji', 'anı', 'şefkat', 'ilerleme', 'denge'],
    context: 'Sürmesi için: anı + bugünü besleyen ritüeller.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_rc_pos9',
    card: 'Seven of Cups',
    position: 9,
    upright:
      'Yedi Kupa, net seçim ve gerçekçi beklenti konursa devam edebilir. Sis dağılmalı.',
    reversed:
      'Ters Yedi Kupa, hayal satmak ve muğlak vaatler sürekliliği zayıflatır.',
    keywords: ['seçim', 'beklenti', 'netlik', 'vaat', 'gerçek'],
    context: 'Sürmesi için: beklenti listesi + tarih/kriter.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_rc_pos9',
    card: 'Eight of Cups',
    position: 9,
    upright:
      'Sekiz Kupa, değersizleşen kalıpları bırakıp anlamlı olana yönelirseniz ilişki devam edebilir.',
    reversed: 'Ters Sekiz Kupa, kal–git sarkacı uzun süre sürerse bağ gevşer.',
    keywords: ['bırakma', 'anlam', 'yön', 'ikilem', 'yenilenme'],
    context: 'Sürmesi için: ortak yön kararı + net taahhüt.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_rc_pos9',
    card: 'Nine of Cups',
    position: 9,
    upright:
      'Dokuz Kupa, tatmin ve minnet pratiği ilişkiyi uzun süre taşır. Birlikte keyif alanları açın.',
    reversed:
      'Ters Dokuz Kupa, bencilleşen konfor ve yüzeysellik bağı zayıflatır.',
    keywords: ['tatmin', 'minnet', 'keyif', 'bencillik', 'derinlik'],
    context: 'Sürmesi için: minnet ritüeli + ortak sevinç planı.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_rc_pos9',
    card: 'Ten of Cups',
    position: 9,
    upright:
      'On Kupa, uyumlu aile/ortak vizyon ve duygusal güvenlikle kalıcı mutluluk mümkündür.',
    reversed:
      'Ters On Kupa, vitrin mutluluğu ve bastırılan sorunlar sürdürmeyi riske atar.',
    keywords: ['uyum', 'aile', 'vizyon', 'güven', 'otantiklik'],
    context: 'Sürmesi için: gerçek ihtiyaçlara dayalı ev/ilişki vizyonu.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_rc_pos9',
    card: 'Page of Cups',
    position: 9,
    upright:
      'Kupa Prensi, naif jestler ve yaratıcı duygu dili ilişkiyi tazeler; sürme şansı artar.',
    reversed:
      'Ters Kupa Prensi, alınganlık ve pasif agresiflik kalıcılığı zedeler.',
    keywords: ['naiflik', 'jest', 'yaratıcılık', 'alınganlık', 'ifade'],
    context: 'Sürmesi için: açık duygu cümleleri + küçük jest ritmi.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_rc_pos9',
    card: 'Knight of Cups',
    position: 9,
    upright:
      'Kupa Şövalyesi, romantik tutarlılık ve anlamlı jestlerle ilişki yürür.',
    reversed:
      'Ters Kupa Şövalyesi, söz–jest tutarsızlığı beklenti yorar; sürdürmek güçleşir.',
    keywords: ['romantizm', 'jest', 'tutarlılık', 'umut', 'denge'],
    context: 'Sürmesi için: az ama düzenli jest + net söz.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_rc_pos9',
    card: 'Queen of Cups',
    position: 9,
    upright: 'Kupa Kraliçesi, empatik alan ve güvenli bağ uzun ömrü destekler.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal manipülasyon ve suçluluk aşılaması kalıcılığı baltalar.',
    keywords: ['empati', 'güvenli bağ', 'bakım', 'manipülasyon', 'sınır'],
    context: 'Sürmesi için: şefkat + sınırın birlikte kurulması.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_rc_pos9',
    card: 'King of Cups',
    position: 9,
    upright:
      'Kupa Kralı, duygusal olgunluk ve sakin regülasyonla ilişki uzun soluklu olur.',
    reversed:
      'Ters Kupa Kralı, pasif agresiflik ve duygu kaçınması sürekliliği zayıflatır.',
    keywords: ['olgunluk', 'sükûnet', 'regülasyon', 'kaçınma', 'istikrar'],
    context: 'Sürmesi için: duyguyu isimlendir + zor konuşmaları planla.',
    group: 'Kupalar',
  },

  // SWORDS (14)
  {
    id: 'ace_of_swords_rc_pos9',
    card: 'Ace of Swords',
    position: 9,
    upright:
      'Kılıç Ası, netlik ve dürüst diyalog kurulursa ilişki sürer. Keskin ama adil doğruluk bağ kurar.',
    reversed: 'Ters Kılıç Ası, çarpıtma ve yarım doğrular kalıcılığı baltalar.',
    keywords: ['netlik', 'dürüstlük', 'karar', 'çarpıtma', 'hakikat'],
    context: 'Sürmesi için: net kararlar + kanıt temelli konuşma.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_rc_pos9',
    card: 'Two of Swords',
    position: 9,
    upright:
      'İki Kılıç, karar kaçınması sürerse ilişki askıda kalır; yüzleşme gelirse yürür.',
    reversed: 'Ters İki Kılıç, kronik erteleme kopuş ihtimalini artırır.',
    keywords: ['kararsızlık', 'askı', 'yüzleşme', 'seçim', 'netlik'],
    context: 'Sürmesi için: küçük net seçim + tarih.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_rc_pos9',
    card: 'Three of Swords',
    position: 9,
    upright:
      'Üç Kılıç, acı dürüstlük ve şifalı onarımla devam mümkün; aksi halde yara kanar.',
    reversed:
      'Ters Üç Kılıç, sürekli kanatılan yaralar ilişkide kopuşa götürebilir.',
    keywords: ['acı', 'onarım', 'dürüstlük', 'yaralar', 'kapanış'],
    context: 'Sürmesi için: onarım dili + kapanış ritüeli.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_rc_pos9',
    card: 'Four of Swords',
    position: 9,
    upright:
      'Dört Kılıç, mola ve sakin düşünme ilişkiyi koruyabilir; dinlenmiş akıl sürdürür.',
    reversed: 'Ters Dört Kılıç, aşırı susuş ve kaçınma bağları gevşetir.',
    keywords: ['mola', 'iyileşme', 'sükûnet', 'kaçınma', 'ritim'],
    context: 'Sürmesi için: planlı mola + geri dönüş tarihi.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_rc_pos9',
    card: 'Five of Swords',
    position: 9,
    upright:
      'Beş Kılıç, kazanmaya oynayan zihin bırakılıp uzlaşı aranırsa ilişki yürür.',
    reversed: 'Ters Beş Kılıç, alay/küçümseme sürerse uzun vadede kopuş gelir.',
    keywords: ['ego', 'uzlaşı', 'saygı', 'alay', 'zafer'],
    context: 'Sürmesi için: kazanmak değil anlaşmak hedefi.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_rc_pos9',
    card: 'Six of Swords',
    position: 9,
    upright:
      'Altı Kılıç, geçiş planı ve yapılandırılmış onarımla ilişki daha sakin sulara taşınır.',
    reversed: 'Ters Altı Kılıç, eski kıyıya dönmek sürekliliği zedeler.',
    keywords: ['geçiş', 'plan', 'onarım', 'istikrar', 'takip'],
    context: 'Sürmesi için: yazılı geçiş adımları + kontrol.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_rc_pos9',
    card: 'Seven of Swords',
    position: 9,
    upright:
      'Yedi Kılıç, şeffaflık sağlanırsa güven onarılır ve sürer; saklama biter.',
    reversed: 'Ters Yedi Kılıç, gizli ajanda sürerse bağ çözülür.',
    keywords: ['şeffaflık', 'giz', 'güven', 'itiraf', 'etik'],
    context: 'Sürmesi için: açık defter kuralı.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_rc_pos9',
    card: 'Eight of Swords',
    position: 9,
    upright:
      'Sekiz Kılıç, çaresizlik anlatısı bırakılıp yardım alınırsa devam mümkündür.',
    reversed: 'Ters Sekiz Kılıç, kurbanlıkta ısrar ilişkiyi kilitler.',
    keywords: ['çaresizlik', 'yardım', 'inanç', 'kilit', 'özgürleşme'],
    context: 'Sürmesi için: destek isteme + sorumluluk paylaşımı.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_rc_pos9',
    card: 'Nine of Swords',
    position: 9,
    upright:
      'Dokuz Kılıç, kaygı yönetilirse ilişki nefes alır; aksi halde tükeniş gelir.',
    reversed:
      'Ters Dokuz Kılıç, felaket senaryoları bırakılmazsa süreklilik zayıflar.',
    keywords: ['kaygı', 'uyku', 'regülasyon', 'felaket', 'gerçekçilik'],
    context: 'Sürmesi için: gündüz konuşma + gece dinlenme kuralı.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_rc_pos9',
    card: 'Ten of Swords',
    position: 9,
    upright:
      'On Kılıç, bir döngü net kapanırsa yeniden doğuşla sürme şansı doğar; aksi halde biter.',
    reversed:
      'Ters On Kılıç, dramatik kopuşu onarımla fırsata çevirmek zordur ama mümkündür.',
    keywords: ['kapanış', 'yeniden başla', 'drama', 'onarım', 'eşik'],
    context: 'Sürmesi için: acı ama net kapanış + temiz sayfa.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_rc_pos9',
    card: 'Page of Swords',
    position: 9,
    upright: 'Kılıç Prensi, merak ve dürüst soru kültürü ilişkiyi ileri taşır.',
    reversed: 'Ters Kılıç Prensi, dedikodu ve gözetleme kalıcılığı baltalar.',
    keywords: ['merak', 'soru', 'öğrenme', 'dedikodu', 'sınır'],
    context: 'Sürmesi için: nazik merak + kanıt odak.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_rc_pos9',
    card: 'Knight of Swords',
    position: 9,
    upright: 'Kılıç Şövalyesi, hızlı ama saygılı eylem ilişkiyi yerinde tutar.',
    reversed:
      'Ters Kılıç Şövalyesi, saldırgan üslup ve ültimatomlar sürdürmeyi zorlaştırır.',
    keywords: ['hız', 'saygı', 'ton', 'ültimatom', 'eylem'],
    context: 'Sürmesi için: hız + yumuşak çerçeve.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_rc_pos9',
    card: 'Queen of Swords',
    position: 9,
    upright:
      'Kılıç Kraliçesi, netlik ve sınır koyma becerisi ilişkiyi sağlıklı sürdürür.',
    reversed: 'Ters Kılıç Kraliçesi, sertlik ve yargı bağı soğutur.',
    keywords: ['netlik', 'sınır', 'nesnellik', 'sertlik', 'şefkat'],
    context: 'Sürmesi için: net + şefkatli dil.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_rc_pos9',
    card: 'King of Swords',
    position: 9,
    upright: 'Kılıç Kralı, ilke ve adil çerçeveyle ilişki uzun vadeye taşınır.',
    reversed: 'Ters Kılıç Kralı, dogma ve katı kural sürekliliği bozar.',
    keywords: ['ilke', 'adalet', 'çerçeve', 'dogma', 'esneklik'],
    context: 'Sürmesi için: prensip + esneklik dengesi.',
    group: 'Kılıçlar',
  },

  // WANDS (14)
  {
    id: 'ace_of_wands_rc_pos9',
    card: 'Ace of Wands',
    position: 9,
    upright:
      'Değnek Ası, taze enerji ve arzu ilişkiyi canlandırır; devam potansiyeli yüksek.',
    reversed: 'Ters Değnek Ası, heves çabuk sönüyorsa süreklilik zayıflar.',
    keywords: ['kıvılcım', 'arzu', 'canlanma', 'süreklilik', 'heves'],
    context: 'Sürmesi için: kıvılcımı rutine bağlayın (randevu/ritüel).',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_rc_pos9',
    card: 'Two of Wands',
    position: 9,
    upright:
      'İki Değnek, ortak ufuk ve planla ilişki devam eder. Vizyon bağlar.',
    reversed: 'Ters İki Değnek, plan–icra boşluğu sürekliliği bozar.',
    keywords: ['vizyon', 'plan', 'ufuk', 'icra', 'karar'],
    context: 'Sürmesi için: vizyonu takvim ve göreve çevirin.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_rc_pos9',
    card: 'Three of Wands',
    position: 9,
    upright:
      'Üç Değnek, sabırlı genişleme ve birlikte bekleme gücüyle ilişki yürür.',
    reversed:
      'Ters Üç Değnek, gecikme ve uyumsuz beklenti kopuşa zemin hazırlar.',
    keywords: ['genişleme', 'sabır', 'beklenti', 'zamanlama', 'umut'],
    context: 'Sürmesi için: beklenti eşleştirme + ara hedefler.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_rc_pos9',
    card: 'Four of Wands',
    position: 9,
    upright:
      'Dört Değnek, eşiği kutlamak ve temel atmak kalıcılığı güçlendirir.',
    reversed: 'Ters Dört Değnek, vitrin/tören baskısı temeli zayıflatır.',
    keywords: ['eşik', 'kutlama', 'temel', 'ev', 'istikrar'],
    context: 'Sürmesi için: önce temel, sonra tören.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_rc_pos9',
    card: 'Five of Wands',
    position: 9,
    upright:
      'Beş Değnek, kurallı tartışma ve adil söz hakkıyla ilişki gelişir ve sürer.',
    reversed: 'Ters Beş Değnek, kaotik kavga kalıcılığı aşındırır.',
    keywords: ['tartışma', 'kural', 'rekabet', 'fasilitasyon', 'saygı'],
    context: 'Sürmesi için: tartışma protokolü (süre/ton/ara).',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_rc_pos9',
    card: 'Six of Wands',
    position: 9,
    upright:
      'Altı Değnek, başarıları paylaşmak ve takdir etmek ilişkiyi uzun vadeye taşır.',
    reversed:
      'Ters Altı Değnek, takdir eksikliği ve imaj baskısı sürekliliği zayıflatır.',
    keywords: ['takdir', 'başarı', 'görünürlük', 'imaj', 'motivasyon'],
    context: 'Sürmesi için: haftalık takdir ritüeli.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_rc_pos9',
    card: 'Seven of Wands',
    position: 9,
    upright: 'Yedi Değnek, birlikte sınır savunusu ilişkiyi korur ve sürdürür.',
    reversed: 'Ters Yedi Değnek, bitmeyen savunma ve inat kalıcılığı zorlar.',
    keywords: ['sınır', 'savunma', 'birlik', 'inat', 'esneklik'],
    context: 'Sürmesi için: esnek sınır + ortak cephe.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_rc_pos9',
    card: 'Eight of Wands',
    position: 9,
    upright: 'Sekiz Değnek, hızlı, açık iletişim ve akışla ilişki canlı kalır.',
    reversed: 'Ters Sekiz Değnek, iletişim kaosu ve gecikme bağa zarar verir.',
    keywords: ['hız', 'akış', 'iletişim', 'gecikme', 'netlik'],
    context: 'Sürmesi için: tek kanal + cevap ritmi.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_rc_pos9',
    card: 'Nine of Wands',
    position: 9,
    upright:
      'Dokuz Değnek, yorgun da olsanız vazgeçmeme ve sınır onarımı ilişkiyi taşır.',
    reversed:
      'Ters Dokuz Değnek, kronik tetiktelik ve şüphe kalıcılığı aşındırır.',
    keywords: ['direnç', 'yorgunluk', 'onarım', 'tetik', 'güven'],
    context: 'Sürmesi için: dinlenme planı + güven inşası.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_rc_pos9',
    card: 'Ten of Wands',
    position: 9,
    upright:
      'On Değnek, yük adil dağıtılırsa ilişki yürür; tek kişilik taşıma yorar.',
    reversed: 'Ters On Değnek, yükler pay edilmezse kopuş riski büyür.',
    keywords: ['yük', 'delege', 'sorumluluk', 'sadelik', 'denge'],
    context: 'Sürmesi için: iş/duygu yük haritası.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_rc_pos9',
    card: 'Page of Wands',
    position: 9,
    upright:
      'Değnek Prensi, merak ve macera ruhu ilişkiyi taze tutar; sürme potansiyeli artar.',
    reversed:
      'Ters Değnek Prensi, odaksızlık ve yarım bırakmalar kalıcılığı zedeler.',
    keywords: ['merak', 'macera', 'odak', 'tamamlama', 'heves'],
    context: 'Sürmesi için: mini projeler + bitiriş kutlaması.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_rc_pos9',
    card: 'Knight of Wands',
    position: 9,
    upright: 'Değnek Şövalyesi, cesur adımlar ve ritimle ilişki ilerler.',
    reversed:
      'Ters Değnek Şövalyesi, dengesiz hız ve anlık öfke sürekliliği bozar.',
    keywords: ['cesaret', 'ritim', 'denge', 'öfke', 'istikrar'],
    context: 'Sürmesi için: tempo sözleşmesi + öfke molası.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_rc_pos9',
    card: 'Queen of Wands',
    position: 9,
    upright:
      'Değnek Kraliçesi, sıcak karizma ve karşılıklı hayranlık ilişkiyi uzun vadeye taşır.',
    reversed:
      'Ters Değnek Kraliçesi, kıyas ve görünürlük savaşı bağa zarar verir.',
    keywords: ['karizma', 'hayranlık', 'sıcaklık', 'kıyas', 'paylaşım'],
    context: 'Sürmesi için: ortak sahne + kıyası kapatma.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_rc_pos9',
    card: 'King of Wands',
    position: 9,
    upright:
      'Değnek Kralı, vizyoner liderlik ve ortak risk yönetimiyle ilişki sürer.',
    reversed: 'Ters Değnek Kralı, ego ve tek merkez karar kalıcılığı bozar.',
    keywords: ['vizyon', 'liderlik', 'risk', 'ego', 'katılım'],
    context: 'Sürmesi için: yetki paylaşımı + birlikte karar.',
    group: 'Asalar',
  },

  // PENTACLES (14)
  {
    id: 'ace_of_pentacles_rc_pos9',
    card: 'Ace of Pentacles',
    position: 9,
    upright:
      'Tılsım Ası, somut başlangıç, birlikte yatırım ve güvenceyle ilişki uzun vadeye taşınır.',
    reversed:
      'Ters Tılsım Ası, kaçırılan fırsatlar ve kötü zamanlama sürdürmeyi zorlar.',
    keywords: ['başlangıç', 'yatırım', 'güvence', 'fırsat', 'zamanlama'],
    context: 'Sürmesi için: küçük ortak yatırım/plan.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_rc_pos9',
    card: 'Two of Pentacles',
    position: 9,
    upright: 'İki Tılsım, hayat dengelenirse ilişki yürür. Esnek plan şarttır.',
    reversed: 'Ters İki Tılsım, kaos ve son dakika krizleri bağı yıpratır.',
    keywords: ['denge', 'esneklik', 'zaman', 'öncelik', 'akış'],
    context: 'Sürmesi için: ajanda eşleştirme + kapasite sınırı.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_rc_pos9',
    card: 'Three of Pentacles',
    position: 9,
    upright: 'Üç Tılsım, işbirliği ve rol netliği ilişkiyi kalıcı kılar.',
    reversed:
      'Ters Üç Tılsım, görünmez emek ve rol karmaşası sürekliliği bozar.',
    keywords: ['işbirliği', 'rol', 'takdir', 'kalite', 'verim'],
    context: 'Sürmesi için: rol sözleşmesi + takdir görünürlüğü.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_rc_pos9',
    card: 'Four of Pentacles',
    position: 9,
    upright: 'Dört Tılsım, güvenlik ve makul tasarruf ilişkiye istikrar verir.',
    reversed: 'Ters Dört Tılsım, cimrilik/kontrol kalıcılığı zedeler.',
    keywords: ['güvenlik', 'tasarruf', 'kontrol', 'paylaşım', 'esneklik'],
    context: 'Sürmesi için: bütçe şeffaflığı + alan bırakma.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_rc_pos9',
    card: 'Five of Pentacles',
    position: 9,
    upright:
      'Beş Tılsım, zor günlerde dayanışma kurulursa ilişki güçlenerek sürer.',
    reversed:
      'Ters Beş Tılsım, yalnızlaştırma ve utanç dili sürekliliği kırar.',
    keywords: ['dayanışma', 'yoksunluk', 'destek', 'utanç', 'yakınlık'],
    context: 'Sürmesi için: “biz” dili + yardım ağı.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_rc_pos9',
    card: 'Six of Pentacles',
    position: 9,
    upright:
      'Altı Tılsım, adil paylaşım ve karşılıklılık ilişkiyi uzun vadeye taşır.',
    reversed: 'Ters Altı Tılsım, koşullu yardım ve borçlandırma bağı zedeler.',
    keywords: ['paylaşım', 'adalet', 'karşılıklılık', 'koşul', 'güç'],
    context: 'Sürmesi için: şeffaf katkı modeli.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_rc_pos9',
    card: 'Seven of Pentacles',
    position: 9,
    upright:
      'Yedi Tılsım, sabır ve ölç–öğren–iyileştir yaklaşımıyla ilişki meyve verir.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık ve batık maliyete saplanma sürdürmeyi zorlar.',
    keywords: ['sabır', 'değerlendirme', 'hasat', 'verim', 'öğrenme'],
    context: 'Sürmesi için: periyodik değerlendirme + küçük ayar.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_rc_pos9',
    card: 'Eight of Pentacles',
    position: 9,
    upright:
      'Sekiz Tılsım, özen ve mikro iyileştirmeler ilişkiyi kalıcı kılar.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik ve tekrar eden aynı hatalar sürekliliği bozar.',
    keywords: ['özen', 'zanaat', 'iyileştirme', 'standart', 'emek'],
    context: 'Sürmesi için: ilişki standartları + pratik.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_rc_pos9',
    card: 'Nine of Pentacles',
    position: 9,
    upright:
      'Dokuz Tılsım, sağlıklı bireysellik ve ortak konfor ilişkiyi uzun ömürlü kılar.',
    reversed:
      'Ters Dokuz Tılsım, gösteriş ve ayrı dünyalar kalıcılığı zedeler.',
    keywords: ['bireysellik', 'konfor', 'bağımsızlık', 'gösteriş', 'paylaşım'],
    context: 'Sürmesi için: bireysel alan + ortak keyif dengesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_rc_pos9',
    card: 'Ten of Pentacles',
    position: 9,
    upright:
      'On Tılsım, yapı, aile ve uzun vadeli planlarla ilişki kalıcı bir sisteme oturur.',
    reversed:
      'Ters On Tılsım, aile/para çatışmaları çözülmezse süreklilik risklenir.',
    keywords: ['aile', 'yapı', 'uzun vade', 'miras', 'plan'],
    context: 'Sürmesi için: sistem ve sınırların netleştirilmesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_rc_pos9',
    card: 'Page of Pentacles',
    position: 9,
    upright:
      'Tılsım Prensi, öğrenme ve küçük somut adımlar ilişkiyi ileri taşır.',
    reversed: 'Ters Tılsım Prensi, oyalanma ve erteleme kalıcılığı zayıflatır.',
    keywords: ['öğrenme', 'küçük adım', 'odak', 'disiplin', 'fırsat'],
    context: 'Sürmesi için: mini hedef + teslim tarihi.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_rc_pos9',
    card: 'Knight of Pentacles',
    position: 9,
    upright:
      'Tılsım Şövalyesi, istikrarlı tempo ve güvenilirlik ilişkiyi uzun vadeye taşır.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık ve yenilikten kaçış bağı yorar.',
    keywords: [
      'istikrar',
      'güvenilirlik',
      'rutin',
      'durağanlık',
      'iyileştirme',
    ],
    context: 'Sürmesi için: rutin + mikro yenilik.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_rc_pos9',
    card: 'Queen of Pentacles',
    position: 9,
    upright:
      'Tılsım Kraliçesi, pratik bakım ve ev ekonomisiyle ilişki kök salır.',
    reversed:
      'Ters Tılsım Kraliçesi, görünmez emeğin borçlandırmaya dönüşmesi kalıcılığı zedeler.',
    keywords: ['bakım', 'pratik', 'ev', 'görünmez emek', 'borçlandırma'],
    context: 'Sürmesi için: iş bölümü + takdir görünürlüğü.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_rc_pos9',
    card: 'King of Pentacles',
    position: 9,
    upright:
      'Tılsım Kralı, finansal güvence, olgun liderlik ve uzun vadeli vizyonla ilişki sürer.',
    reversed: 'Ters Tılsım Kralı, para/otorite sopası kalıcılığı bozar.',
    keywords: ['güvence', 'liderlik', 'uzun vade', 'otorite', 'şeffaflık'],
    context: 'Sürmesi için: şeffaf liderlik + ortak imza kültürü.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 9 anlamını bulma fonksiyonu
export const getposition9Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return position9Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipProblemsposition9Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return getposition9Meaning(cardName);
};

// Kart adına göre pozisyon 9 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipProblemsposition9MeaningByCardName = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  const meaning = getposition9Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 9 anlamlarını alma fonksiyonu
export const getAllposition9Meanings =
  (): RelationshipProblemsPositionMeaning[] => {
    return position9Meanings;
  };

// pozisyon 9 anlamlarını filtreleme fonksiyonu
export const getposition9MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return position9Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 9 anlamlarını arama
export const searchposition9MeaningsByKeyword = (
  keyword: string
): RelationshipProblemsPositionMeaning[] => {
  return position9Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position9Meanings,
  getposition9Meaning,
  getAllposition9Meanings,
  getposition9MeaningsByGroup,
  searchposition9MeaningsByKeyword,
};
