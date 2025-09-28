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

import { SituationAnalysisPositionMeaning } from './position-meanings-index';

// 6. Pozisyon (Tavsiye) - 78 Tarot kartı
export const position6Meanings: SituationAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_sa_pos6',
    card: 'The Fool',
    position: 6,
    upright:
      'Tavsiye: Küçük ama cesur bir deneme başlatın. Merakı rehber alın, riskinizi sınırlayın ve “pilot adım”la öğrenin; yol, yürüdükçe belirginleşecek.',
    reversed:
      'Tavsiye: Dürtüselliği yavaşlatın. En küçük uygulanabilir planı yazın, güvenlik ağınızı kurun ve önce tek bir minik deneme yapın.',
    keywords: ['başlangıç', 'cesaret', 'deney', 'öğrenme', 'pilot'],
    context: 'Tavsiye: Güvenli küçük risklerle ilerleme.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_sa_pos6',
    card: 'The Magician',
    position: 6,
    upright:
      'Tavsiye: Tek bir niyete odaklanın ve sahip olduğunuz araçları tek kanala toplayın. Kısa, net bir değer cümlesi oluşturun ve hemen eyleme bağlayın.',
    reversed:
      'Tavsiye: Dağınıklığı kesin, çoklu işi azaltın. Eksik beceriyi belirleyip mikro eğitimle tamamlayın; mesajınızı sadeleştirin.',
    keywords: ['odak', 'ifade', 'kaynak', 'eylem', 'mesaj'],
    context: 'Tavsiye: Niyeti tek kanala bağlamak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_sa_pos6',
    card: 'The High Priestess',
    position: 6,
    upright:
      'Tavsiye: Gürültüyü kısın, iç sesi dinleyin. Günlük tutun, işaretleri gözlemleyin ve acele karar yerine sezgiyi olgunlaştırın.',
    reversed:
      'Tavsiye: Aşırı bilgi tüketimini durdurun. Sırlarınızı herkese açmayın; bir sessizlik alanı kurup berraklaşın.',
    keywords: ['sezgi', 'sessizlik', 'içe dönüş', 'gözlem', 'netlik'],
    context: 'Tavsiye: İç rehberliği yükseltmek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_sa_pos6',
    card: 'The Empress',
    position: 6,
    upright:
      'Tavsiye: Üretkenliğinizi besleyin. Ortamınızı düzenleyin, beden-zihin bakımına yatırım yapın ve yaratıcı tohumları sevgiyle büyütün.',
    reversed:
      'Tavsiye: Aşırı sahiplenmeyi bırakın. Sınır koyun, gereksiz yükleri indirin ve önce öz-bakımı dengeleyin.',
    keywords: ['bereket', 'bakım', 'yaratıcılık', 'sınır', 'denge'],
    context: 'Tavsiye: Besleme–sınır dengesini kurmak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_sa_pos6',
    card: 'The Emperor',
    position: 6,
    upright:
      'Tavsiye: Basit kurallar, net roller, haftalık ritimler oluşturun. Yapı, özgürlük getirir.',
    reversed:
      'Tavsiye: Aşırı kontrolü gevşetin. Delege edin, kuralları güncelleyin ve esneklik pencereleri açın.',
    keywords: ['yapı', 'kural', 'rol', 'delege', 'esneklik'],
    context: 'Tavsiye: İşleyen bir iskelet kurmak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_sa_pos6',
    card: 'The Hierophant',
    position: 6,
    upright:
      'Tavsiye: Mentor bulun, iyi pratikleri standartlaştırın. Sınanmış yöntemi kendi bağlamınıza uyarlayın.',
    reversed:
      'Tavsiye: Faydasız gelenekleri sorgulayın. Kendi oyun kitabınızı yazın ve gereksizi bırakın.',
    keywords: ['mentor', 'standart', 'öğreti', 'uyarlama', 'yenilik'],
    context: 'Tavsiye: Gelenek–inovasyon dengesini kurmak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_sa_pos6',
    card: 'The Lovers',
    position: 6,
    upright:
      'Tavsiye: Değerlerinizi netleştirin ve onlarla hizalı seçimi yapın. Uyumlu ortaklık kurun.',
    reversed:
      'Tavsiye: Uyuşmayan bağları gözden geçirin. Yanlış hizalı taahhütleri bırakın ya da yeniden pazarlık edin.',
    keywords: ['değer', 'seçim', 'hizalama', 'ortaklık', 'netlik'],
    context: 'Tavsiye: Değer temelli karar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_sa_pos6',
    card: 'The Chariot',
    position: 6,
    upright:
      'Tavsiye: Tek hedef seçin, günlük rutinle ilerleyin. Zıt güçleri aynı yöne koşullandırın.',
    reversed:
      'Tavsiye: Çok işi aynı anda bırakın. Direksiyonu geri alın, sapmaları kapatın.',
    keywords: ['yön', 'disiplin', 'hedef', 'rutin', 'odak'],
    context: 'Tavsiye: Tek hedef, net rota.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_sa_pos6',
    card: 'Strength',
    position: 6,
    upright:
      'Tavsiye: Yumuşak güçle ilerleyin. Mikro cesaret dozlarını artırın ve sabırla sürdürün.',
    reversed:
      'Tavsiye: Kendinize şefkat gösterin, ritmi düşürün. Zorlandığınız yerde destek alın.',
    keywords: ['cesaret', 'sabır', 'şefkat', 'süreklilik', 'destek'],
    context: 'Tavsiye: Şefkatli direnç inşa etmek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_sa_pos6',
    card: 'The Hermit',
    position: 6,
    upright:
      'Tavsiye: Derin çalışma blokları ayırın, bir bilge/uzmanla görüşün. İç feneri izleyin.',
    reversed:
      'Tavsiye: İzolasyonu azaltın. Taslakları paylaşın, geri bildirim döngüsü kurun.',
    keywords: ['derin iş', 'uzman', 'içe dönüş', 'paylaşım', 'geribildirim'],
    context: 'Tavsiye: Sessizlik ve seçici görünürlük.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_sa_pos6',
    card: 'The Wheel of Fortune',
    position: 6,
    upright:
      'Tavsiye: Zamanlamayı tarayın, en olası senaryolara B planı hazırlayın. Akışa uyum sağlayın.',
    reversed:
      'Tavsiye: Tekrarlayan döngüyü kırın. Küçük ama farklı bir seçim yapın.',
    keywords: ['zamanlama', 'senaryo', 'adaptasyon', 'döngü', 'fırsat'],
    context: 'Tavsiye: Ritme göre hamle.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_sa_pos6',
    card: 'Justice',
    position: 6,
    upright:
      'Tavsiye: Ölçün, şeffaf olun ve adil değiş-tokuş kurun. Kararları veriye dayandırın.',
    reversed:
      'Tavsiye: Hatanızı kabul edin, telafi planı yapın ve dengeleri yeniden ayarlayın.',
    keywords: ['adalet', 'ölçüm', 'şeffaflık', 'telafi', 'denge'],
    context: 'Tavsiye: Teraziyi düzeltmek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_sa_pos6',
    card: 'The Hanged Man',
    position: 6,
    upright:
      'Tavsiye: Perspektifi değiştirin, bilinçli bir durak verin ve bakışı tazeleyin.',
    reversed:
      'Tavsiye: Kurbanlık ve gereksiz fedayı bırakın. Karar verip akışı başlatın.',
    keywords: ['perspektif', 'durak', 'teslim', 'karar', 'yenilenme'],
    context: 'Tavsiye: Bakışı ters çevirip akışı açmak.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_sa_pos6',
    card: 'Death',
    position: 6,
    upright:
      'Tavsiye: Biteni onurlandırın ve kapatın. Yer açıldığında yeni filizlenir.',
    reversed:
      'Tavsiye: Tutunduğunuz eski kabukları bırakın. Küçük bir vedalaşma ritüeli yapın.',
    keywords: ['bitiş', 'dönüşüm', 'bırakma', 'yeniden doğuş', 'temizlik'],
    context: 'Tavsiye: Kapanışla ferahlama.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_sa_pos6',
    card: 'Temperance',
    position: 6,
    upright:
      'Tavsiye: Doğru karışımı bulun. Dozları kademeli ayarlayın, aşırılıklardan kaçının.',
    reversed:
      'Tavsiye: Uyuşmayan unsurları azaltın. Basitleştirin ve tempo tutturun.',
    keywords: ['denge', 'sentez', 'ölçü', 'ritim', 'uyum'],
    context: 'Tavsiye: Karışımın kalibrasyonu.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_sa_pos6',
    card: 'The Devil',
    position: 6,
    upright:
      'Tavsiye: Bağımlılıkları ve pahalı alışkanlıkları denetleyin. Anlaşmaları gözden geçirin.',
    reversed:
      'Tavsiye: Toksik bağdan çıkış planı yapın. Küçük özgürleşme adımları atın.',
    keywords: ['bağımlılık', 'anlaşma', 'gölge', 'özgürlük', 'denetim'],
    context: 'Tavsiye: Bağ çözüp alan açmak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_sa_pos6',
    card: 'The Tower',
    position: 6,
    upright:
      'Tavsiye: Kırılgan temelleri dürüstçe tespit edip güçlendirin. Kriz senaryosu yazın.',
    reversed:
      'Tavsiye: Kontrollü yıkım yapın. Artık işe yaramayanı bilinçli şekilde sökün.',
    keywords: ['kriz', 'risk', 'temel', 'güçlendirme', 'yeniden inşa'],
    context: 'Tavsiye: Proaktif sağlamlaştırma.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_sa_pos6',
    card: 'The Star',
    position: 6,
    upright:
      'Tavsiye: Sadeleşin, şeffaf iletişim kurun ve umudu besleyen küçük ritüeller oluşturun.',
    reversed:
      'Tavsiye: Dinlenin, kaynaklarınızı doldurun. Umudu diri tutacak mini hedefler koyun.',
    keywords: ['umut', 'şifa', 'sadelik', 'şeffaflık', 'ritüel'],
    context: 'Tavsiye: Işığı sistemli biçimde büyütmek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_sa_pos6',
    card: 'The Moon',
    position: 6,
    upright:
      'Tavsiye: Varsayımları test edin, belirsiz alanları küçük deneylerle aydınlatın.',
    reversed: 'Tavsiye: Gerçeklik kontrolü yapın. Korkuyu veriyle dengeleyin.',
    keywords: ['belirsizlik', 'varsayım', 'test', 'korku', 'doğrulama'],
    context: 'Tavsiye: Sis içinde küçük fenerler yakmak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_sa_pos6',
    card: 'The Sun',
    position: 6,
    upright:
      'Tavsiye: Kazanımları görünür kılın, kutlayın ve işbirliklerini büyütün.',
    reversed:
      'Tavsiye: Küçük zaferleri belgeleyin. Pozitif ivmeyi besleyen rutinler kurun.',
    keywords: ['başarı', 'görünürlük', 'kutlama', 'işbirliği', 'ivme'],
    context: 'Tavsiye: Işığı paylaşarak çoğaltmak.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_sa_pos6',
    card: 'Judgement',
    position: 6,
    upright:
      'Tavsiye: Geçmişi objektifçe değerlendirip çağrıya cevap verin. Eski yükleri bırakın.',
    reversed:
      'Tavsiye: Öz-yargıyı yumuşatın. Affediş ve net bir karar yeni sayfayı açar.',
    keywords: ['değerlendirme', 'çağrı', 'affediş', 'karar', 'yenilenme'],
    context: 'Tavsiye: Hesaplaşma ve sıçrama.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_sa_pos6',
    card: 'The World',
    position: 6,
    upright:
      'Tavsiye: Dosyayı tamamlayın, belgeleyin ve ölçekleyin. Başarıyı sistemleştirin.',
    reversed: 'Tavsiye: Eksik uçları kapatın. Bitirmeden yeniye geçmeyin.',
    keywords: ['tamamlama', 'sistem', 'ölçek', 'entegrasyon', 'başarı'],
    context: 'Tavsiye: Kapanıştan sonra ölçekleme.',
    group: 'Majör Arkana',
  },

  // CUPS (Kupalar)
  {
    id: 'ace_of_cups_sa_pos6',
    card: 'Ace of Cups',
    position: 6,
    upright:
      'Tavsiye: Duygularınızı nazikçe ifade edin, şefkat alanı açın ve yeni bir duygusal bağa evet deyin.',
    reversed:
      'Tavsiye: Kırgın kalbi onarın. Öz-sevgi ritüelleri ve güvenli ifade ile akışı açın.',
    keywords: ['ifade', 'şefkat', 'yakınlık', 'öz-sevgi', 'akış'],
    context: 'Tavsiye: Kalbi nazikçe açmak.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_sa_pos6',
    card: 'Two of Cups',
    position: 6,
    upright:
      'Tavsiye: Karşılıklılığı güçlendirin; net beklenti ve sınırlarla eşit bağ kurun.',
    reversed:
      'Tavsiye: Dengesiz alışverişi yeniden pazarlık edin ya da mesafe koyun.',
    keywords: ['karşılıklılık', 'sınır', 'diyalog', 'uyum', 'denge'],
    context: 'Tavsiye: Eşitliği yapılandırmak.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_sa_pos6',
    card: 'Three of Cups',
    position: 6,
    upright:
      'Tavsiye: Topluluğunuzu aktive edin, destek isteyin ve küçük kutlamalar planlayın.',
    reversed: 'Tavsiye: Sosyal diyet uygulayın. Derin bağlara öncelik verin.',
    keywords: ['topluluk', 'destek', 'kutlama', 'öncelik', 'bağ'],
    context: 'Tavsiye: Sosyal enerjiyi bilinçli kullanmak.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_sa_pos6',
    card: 'Four of Cups',
    position: 6,
    upright:
      'Tavsiye: Şükran pratiği yapın, ufak bir yenilik deneyin ve dikkati tazeleyin.',
    reversed:
      'Tavsiye: Gelen yeni fırsata alan açın; minimum bir deneme yapın.',
    keywords: ['şükran', 'fırsat', 'yenilik', 'dikkat', 'deneme'],
    context: 'Tavsiye: Doygunluğu tazelemek.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_sa_pos6',
    card: 'Five of Cups',
    position: 6,
    upright:
      'Tavsiye: Yasınıza alan verin, kalan imkanlara odaklanın ve adım adım toparlanın.',
    reversed:
      'Tavsiye: Affediş çalışması yapın, ileriye dönük küçük bir amaç belirleyin.',
    keywords: ['yas', 'kabul', 'toparlanma', 'affediş', 'ilerleme'],
    context: 'Tavsiye: Kayıptan sonra yön bulmak.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_sa_pos6',
    card: 'Six of Cups',
    position: 6,
    upright:
      'Tavsiye: Güçlü eski bağlarla yeniden temas kurun; iç çocuğa şefkat gösterin.',
    reversed: 'Tavsiye: Geçmişi onurlandırın ama bugüne yatırım yapın.',
    keywords: ['nostalji', 'bağ', 'şefkat', 'bugün', 'destek'],
    context: 'Tavsiye: Geçmişten güç alıp bugüne akmak.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_sa_pos6',
    card: 'Seven of Cups',
    position: 6,
    upright:
      'Tavsiye: Seçim kriterleri yazın, 3 alternatife indirin ve birini test edin.',
    reversed: 'Tavsiye: Sis dağıtın; tek seçime odaklanıp yürütün.',
    keywords: ['seçim', 'netlik', 'kriter', 'odak', 'test'],
    context: 'Tavsiye: Ayıklama ve taahhüt.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_sa_pos6',
    card: 'Eight of Cups',
    position: 6,
    upright:
      'Tavsiye: Anlam taşımayanı bırakın ve değerlerle uyumlu yola koyulun.',
    reversed:
      'Tavsiye: Kapanış için eksik adımı tamamlayın; yarım kalmış vedayı bitirin.',
    keywords: ['ayrılış', 'anlam', 'değer', 'kapanış', 'yön'],
    context: 'Tavsiye: Anlamlıya yönelmek.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_sa_pos6',
    card: 'Nine of Cups',
    position: 6,
    upright: 'Tavsiye: Değer odaklı hedefler belirleyin ve başarıyı paylaşın.',
    reversed: 'Tavsiye: Yüzeysel hazları sınırlayın; içsel tatmini besleyin.',
    keywords: ['tatmin', 'değer', 'hedef', 'paylaşım', 'öz-disiplin'],
    context: 'Tavsiye: Sahici doyumu kurmak.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_sa_pos6',
    card: 'Ten of Cups',
    position: 6,
    upright:
      'Tavsiye: Aile/ekip ritüelleri oluşturun, birlikte sevinen bir kültür kurun.',
    reversed: 'Tavsiye: Beklentileri açıkça konuşun; sahici uyumu inşa edin.',
    keywords: ['uyum', 'ritüel', 'kültür', 'iletişim', 'birlik'],
    context: 'Tavsiye: Birlik duygusunu yapılandırmak.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_sa_pos6',
    card: 'Page of Cups',
    position: 6,
    upright:
      'Tavsiye: Küçük yaratıcı bir proje başlatın; oyunsulukla keşfedin.',
    reversed: 'Tavsiye: Kaçışı sınırlayın; duyguyu eyleme bağlayın.',
    keywords: ['yaratıcılık', 'oyun', 'başlangıç', 'ifade', 'eylem'],
    context: 'Tavsiye: Oyunla akışı açmak.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_sa_pos6',
    card: 'Knight of Cups',
    position: 6,
    upright: 'Tavsiye: Kalpten bir teklif götürün; zarafetle iletişim kurun.',
    reversed:
      'Tavsiye: Söz–eylem tutarlılığını kurun; romantizmi gerçeklikle dengeleyin.',
    keywords: ['teklif', 'zarafet', 'tutarlılık', 'vizyon', 'gerçeklik'],
    context: 'Tavsiye: Kalpten ama tutarlı hareket.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_sa_pos6',
    card: 'Queen of Cups',
    position: 6,
    upright:
      'Tavsiye: Güvenli duygusal alan tutun, empatik dinleyin, şefkatle yön verin.',
    reversed: 'Tavsiye: Sınırlarınızı güçlendirin; öz-bakımı önceliklendirin.',
    keywords: ['empati', 'alan', 'sınır', 'öz bakım', 'şifa'],
    context: 'Tavsiye: Şefkat–sınır dengesi.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_sa_pos6',
    card: 'King of Cups',
    position: 6,
    upright: 'Tavsiye: Fırtınada sakin kalın; duygusal liderlikle güven verin.',
    reversed: 'Tavsiye: Bastırılanı ifade edin; pasif-agresyonu durdurun.',
    keywords: ['sükunet', 'liderlik', 'ifade', 'denge', 'güven'],
    context: 'Tavsiye: Duygu yönetimiyle liderlik.',
    group: 'Kupalar',
  },

  // SWORDS (Kılıçlar)
  {
    id: 'ace_of_swords_sa_pos6',
    card: 'Ace of Swords',
    position: 6,
    upright: 'Tavsiye: Bir cümlede niyetinizi yazın ve ona göre karar verin.',
    reversed: 'Tavsiye: Mesajı sadeleştirin, bilgi kalabalığını kesin.',
    keywords: ['netlik', 'karar', 'mesaj', 'sadelik', 'odak'],
    context: 'Tavsiye: Çekirdek cümleye inmek.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sa_pos6',
    card: 'Two of Swords',
    position: 6,
    upright: 'Tavsiye: Eksik veriyi toplayın ve karar için tarih belirleyin.',
    reversed: 'Tavsiye: Karar felcini bitirin; küçük hataya izin verip seçin.',
    keywords: ['karar', 'veri', 'tarih', 'ikilem', 'seçim'],
    context: 'Tavsiye: Karar penceresi açmak.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sa_pos6',
    card: 'Three of Swords',
    position: 6,
    upright:
      'Tavsiye: Dürüst bir yüzleşme ve nazik bir konuşma yapın; yasın payını verin.',
    reversed:
      'Tavsiye: Kapanış/terapi desteği alın; hikayeyi iyileştirici şekilde yeniden yazın.',
    keywords: ['yüzleşme', 'ifade', 'kapanış', 'şifa', 'iletişim'],
    context: 'Tavsiye: Acıyı dönüştüren diyalog.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sa_pos6',
    card: 'Four of Swords',
    position: 6,
    upright:
      'Tavsiye: Dinlenme blokları planlayın; zihin soğudukça çözüm belirir.',
    reversed: 'Tavsiye: Mikro molalar ve dijital diyetle tükenmişliği azaltın.',
    keywords: ['dinlenme', 'mola', 'toparlanma', 'ritim', 'netlik'],
    context: 'Tavsiye: Enerji bankasını doldurmak.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sa_pos6',
    card: 'Five of Swords',
    position: 6,
    upright: 'Tavsiye: Haklılık yerine ilişkiyi koruyan kazanımı seçin.',
    reversed: 'Tavsiye: Özür/onarım teklifiyle köprüleri onarın.',
    keywords: ['ilişki', 'ego', 'kazanım', 'onarım', 'müzakere'],
    context: 'Tavsiye: Köprüleri yakmamak.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sa_pos6',
    card: 'Six of Swords',
    position: 6,
    upright:
      'Tavsiye: Kademeli bir geçiş planı yapın; güvenli eşlikçiler bulun.',
    reversed: 'Tavsiye: Büyük sıçrama yerine küçük taşınmalarla ilerleyin.',
    keywords: ['geçiş', 'plan', 'eşlik', 'kademeli', 'güven'],
    context: 'Tavsiye: Sakin sulara rota.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sa_pos6',
    card: 'Seven of Swords',
    position: 6,
    upright:
      'Tavsiye: Etik bir strateji kurun; gereksizce her şeyi açıklamayın.',
    reversed: 'Tavsiye: Yarım gerçekleri düzeltin; şeffaf hizalanın.',
    keywords: ['strateji', 'etik', 'taktik', 'şeffaflık', 'güven'],
    context: 'Tavsiye: Akıllı ve temiz oyun.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sa_pos6',
    card: 'Eight of Swords',
    position: 6,
    upright:
      'Tavsiye: İnanç sınırlarını küçük deneylerle test edin; kanıt toplayın.',
    reversed: 'Tavsiye: Yardım isteyin; çıkış adımlarını yazın.',
    keywords: ['inanç', 'deney', 'kanıt', 'yardım', 'özgürleşme'],
    context: 'Tavsiye: Zihinsel düğümü çözmek.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sa_pos6',
    card: 'Nine of Swords',
    position: 6,
    upright:
      'Tavsiye: Korku listesini yazın, kanıtla çürütün; beden regülasyonu yapın.',
    reversed:
      'Tavsiye: Sabah ritüeliyle gerçeklik testini alışkanlık haline getirin.',
    keywords: ['kaygı', 'yazma', 'kanıt', 'regülasyon', 'ritüel'],
    context: 'Tavsiye: Kaygı hijyeni.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sa_pos6',
    card: 'Ten of Swords',
    position: 6,
    upright: 'Tavsiye: Bitişi kabul edin ve yeni çerçeveyi tasarlayın.',
    reversed:
      'Tavsiye: İleriye dönük küçük anlaşmalar yapın; gücü geri toplayın.',
    keywords: ['bitiş', 'kabul', 'yeniden çerçeve', 'başlangıç', 'güç'],
    context: 'Tavsiye: Sonra yeniyi kurmak.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sa_pos6',
    card: 'Page of Swords',
    position: 6,
    upright:
      'Tavsiye: Araştırın, soru sorun, veri toplayın; öğrenmeyi hızlandırın.',
    reversed: 'Tavsiye: Kaynak doğrulaması yapın; dedikodudan uzak durun.',
    keywords: ['araştırma', 'soru', 'veri', 'doğrulama', 'öğrenme'],
    context: 'Tavsiye: Merakı disipline etmek.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sa_pos6',
    card: 'Knight of Swords',
    position: 6,
    upright: 'Tavsiye: Hızlı harekete net plan ekleyin; mesajı doğrudan verin.',
    reversed: 'Tavsiye: Nefes–dur–konuş ritmi uygulayın; aceleyle kırmayın.',
    keywords: ['hız', 'plan', 'mesaj', 'ritim', 'etki'],
    context: 'Tavsiye: Süratle ama isabetle.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sa_pos6',
    card: 'Queen of Swords',
    position: 6,
    upright: 'Tavsiye: Net sınırlar koyun, objektif karar verin, adil olun.',
    reversed: 'Tavsiye: Dili yumuşatın; şefkatle net olmayı deneyin.',
    keywords: ['sınır', 'nesnellik', 'adalet', 'iletişim', 'şefkat'],
    context: 'Tavsiye: Berrak ama nazik olmak.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sa_pos6',
    card: 'King of Swords',
    position: 6,
    upright:
      'Tavsiye: İlkelere dayalı politika yazın; stratejiyi açıkça iletin.',
    reversed: 'Tavsiye: Katılığı azaltın; empatiyi çerçeveye ekleyin.',
    keywords: ['ilke', 'strateji', 'politika', 'iletişim', 'empati'],
    context: 'Tavsiye: İlke ve empatiyi birleştirmek.',
    group: 'Kılıçlar',
  },

  // WANDS (Asalar)
  {
    id: 'ace_of_wands_sa_pos6',
    card: 'Ace of Wands',
    position: 6,
    upright: 'Tavsiye: İlk kıvılcımı hemen küçük bir eyleme dönüştürün.',
    reversed: 'Tavsiye: Blokajı aşmak için 10 dakikalık mikro başlangıç yapın.',
    keywords: ['kıvılcım', 'başlangıç', 'hareket', 'minik adım', 'ivme'],
    context: 'Tavsiye: Ateşi pratikle yakmak.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_sa_pos6',
    card: 'Two of Wands',
    position: 6,
    upright: 'Tavsiye: 90 günlük plan yapın; ufku haritalayın.',
    reversed: 'Tavsiye: Büyük vizyonu küçük pilotla test edin.',
    keywords: ['plan', 'ufuk', 'pilot', 'risk', 'harita'],
    context: 'Tavsiye: Vizyonu zemine indirmek.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_sa_pos6',
    card: 'Three of Wands',
    position: 6,
    upright:
      'Tavsiye: Delegasyon ve kilometre taşları belirleyin; ufka bakarken yürüyün.',
    reversed:
      'Tavsiye: Zaman çizelgesini revize edin; beklentiyi gerçeklikle hizalayın.',
    keywords: ['genişleme', 'delege', 'milestone', 'zamanlama', 'ufuk'],
    context: 'Tavsiye: Genişlemeyi planlamak.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_sa_pos6',
    card: 'Four of Wands',
    position: 6,
    upright:
      'Tavsiye: Küçük bir kutlama/landmark organize edin; temeli pekiştirin.',
    reversed: 'Tavsiye: Eşiği tamamlayın, eksikleri kapatın; sonra kutlayın.',
    keywords: ['temel', 'eşik', 'kutlama', 'istikrar', 'tamamlama'],
    context: 'Tavsiye: Temel–eşik döngüsünü kapatmak.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_sa_pos6',
    card: 'Five of Wands',
    position: 6,
    upright:
      'Tavsiye: Oyun kurallarını netleştirin; çatışmayı yaratıcı provaya çevirin.',
    reversed:
      'Tavsiye: Gereksiz sürtüşmeleri fasilite edilmiş toplantıya taşıyın.',
    keywords: ['kural', 'fasilitasyon', 'yaratıcılık', 'prova', 'çözüm'],
    context: 'Tavsiye: Mücadeleyi yapılandırmak.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_sa_pos6',
    card: 'Six of Wands',
    position: 6,
    upright: 'Tavsiye: Başarıyı görünür kılın; hikayeleştirip paylaşın.',
    reversed: 'Tavsiye: Kanıt ve metrik oluşturun; algıyı veriye dayayın.',
    keywords: ['zafer', 'görünürlük', 'hikaye', 'metrik', 'algı'],
    context: 'Tavsiye: Zaferi kalıcı kılmak.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_sa_pos6',
    card: 'Seven of Wands',
    position: 6,
    upright: 'Tavsiye: Öncelikli hatları savunun; seçici savaşın.',
    reversed: 'Tavsiye: Destek isteyin, dinlenin; kaynakları yenileyin.',
    keywords: ['savunma', 'öncelik', 'seçicilik', 'destek', 'enerji'],
    context: 'Tavsiye: Doğru savaşı seçmek.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_sa_pos6',
    card: 'Eight of Wands',
    position: 6,
    upright: 'Tavsiye: İletişimi tek kanala toplayın; sırayı sadeleştirin.',
    reversed: 'Tavsiye: Eşzamanlı işleri azaltın; bekleyenleri kapatın.',
    keywords: ['hız', 'iletişim', 'sıra', 'akış', 'WIP'],
    context: 'Tavsiye: Akışta sürtünmeyi düşürmek.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_sa_pos6',
    card: 'Nine of Wands',
    position: 6,
    upright:
      'Tavsiye: Enerjinizi koruyun, mikro molalarla dayanıklılığı sürdürün.',
    reversed: 'Tavsiye: Yükü hafifletin; destek ağı kurun.',
    keywords: ['dayanıklılık', 'mola', 'koruma', 'yük', 'destek'],
    context: 'Tavsiye: Güç rezervini yönetmek.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_sa_pos6',
    card: 'Ten of Wands',
    position: 6,
    upright: 'Tavsiye: Delege edin, vazgeçilecekleri belirleyin; yükü azaltın.',
    reversed: 'Tavsiye: “Hayır” demeyi planlayın; sadeleştirin.',
    keywords: ['delege', 'yük', 'sadelik', 'odak', 'bırakma'],
    context: 'Tavsiye: Yük yönetimi sistemi.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_sa_pos6',
    card: 'Page of Wands',
    position: 6,
    upright: 'Tavsiye: Bir pilot başlatın; merakla keşfedin.',
    reversed: 'Tavsiye: Odak listesi yapın; hevesi ritme bağlayın.',
    keywords: ['pilot', 'keşif', 'odak', 'ritim', 'öğrenme'],
    context: 'Tavsiye: Hevesi sürdürülebilir kılmak.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_sa_pos6',
    card: 'Knight of Wands',
    position: 6,
    upright: 'Tavsiye: Enerjinizi tek OKR’a bağlayın; hızla ilerleyin.',
    reversed:
      'Tavsiye: “Başla-bitir” taahhüdü koyun; yarıda bırakmayı durdurun.',
    keywords: ['enerji', 'OKR', 'hız', 'taahhüt', 'tamamlama'],
    context: 'Tavsiye: Atılganlığı rayına koymak.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_sa_pos6',
    card: 'Queen of Wands',
    position: 6,
    upright: 'Tavsiye: Görün; karizmanızı paylaşın; ilham verin.',
    reversed: 'Tavsiye: Öz-değeri güçlendirin; kıyas tuzağından çıkın.',
    keywords: ['görünürlük', 'özgüven', 'ilham', 'liderlik', 'etki'],
    context: 'Tavsiye: Manyetik duruşu beslemek.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_sa_pos6',
    card: 'King of Wands',
    position: 6,
    upright: 'Tavsiye: Vizyonu net söyleyin, yetki devredin ve ölçekleyin.',
    reversed:
      'Tavsiye: Dinleyin, ego sürtüşmelerini yumuşatın; ekipleri güçlendirin.',
    keywords: ['vizyon', 'yetki', 'ölçek', 'dinleme', 'güçlendirme'],
    context: 'Tavsiye: Vizyonu paylaştırmak.',
    group: 'Asalar',
  },

  // PENTACLES (Tılsımlar)
  {
    id: 'ace_of_pentacles_sa_pos6',
    card: 'Ace of Pentacles',
    position: 6,
    upright:
      'Tavsiye: Somut bir tohum ekin—küçük yatırım/ürün/alışkanlık başlatın.',
    reversed:
      'Tavsiye: Kıtlık dilini bırakın; küçük ama tutarlı adımlarla birikim yapın.',
    keywords: ['tohum', 'yatırım', 'alışkanlık', 'tutarlılık', 'büyüme'],
    context: 'Tavsiye: Somutu filizlendirmek.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_sa_pos6',
    card: 'Two of Pentacles',
    position: 6,
    upright: 'Tavsiye: Zaman–enerji dengelemesi için timeboxing uygulayın.',
    reversed: 'Tavsiye: Fazla taahhütleri azaltın; ajandayı sadeleştirin.',
    keywords: ['denge', 'timeboxing', 'öncelik', 'akış', 'sadelik'],
    context: 'Tavsiye: Ritmi yönetmek.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_sa_pos6',
    card: 'Three of Pentacles',
    position: 6,
    upright:
      'Tavsiye: İşbirliği kurun; rol ve kalite standartlarını netleştirin.',
    reversed: 'Tavsiye: Sorumluluk matrisi yazın; koordinasyonu artırın.',
    keywords: ['işbirliği', 'rol', 'standart', 'koordinasyon', 'kalite'],
    context: 'Tavsiye: Birlikte inşa sistemi.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_sa_pos6',
    card: 'Four of Pentacles',
    position: 6,
    upright: 'Tavsiye: Bütçe yapın ama büyüme yatırımı için pay ayırın.',
    reversed: 'Tavsiye: Aşırı sıkılığı gevşetin; stratejik risk alın.',
    keywords: ['bütçe', 'tasarruf', 'yatırım', 'risk', 'denge'],
    context: 'Tavsiye: Koruma–büyüme dengesini kurmak.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_sa_pos6',
    card: 'Five of Pentacles',
    position: 6,
    upright: 'Tavsiye: Yardım isteyin; destek programlarını araştırın.',
    reversed: 'Tavsiye: Küçük kazanımları görünür kılın; morali yükseltin.',
    keywords: ['destek', 'yardım', 'program', 'kazanım', 'moral'],
    context: 'Tavsiye: Köprü desteklerle geçmek.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_sa_pos6',
    card: 'Six of Pentacles',
    position: 6,
    upright: 'Tavsiye: Adil anlaşmalar kurun; koşulları şeffaflaştırın.',
    reversed: 'Tavsiye: Güç dengesini düzeltin; net beklenti yazın.',
    keywords: ['adalet', 'anlaşma', 'şeffaflık', 'denge', 'beklenti'],
    context: 'Tavsiye: Kazan-kazanı yapılandırmak.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_sa_pos6',
    card: 'Seven of Pentacles',
    position: 6,
    upright:
      'Tavsiye: Göstergeleri gözden geçirin; küçük iyileştirmeler yapın.',
    reversed: 'Tavsiye: Batık maliyete takılmayın; pivot kriteri uygulayın.',
    keywords: ['verim', 'ölçüm', 'iyileştirme', 'pivot', 'sabır'],
    context: 'Tavsiye: Hasat öncesi ince ayar.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_sa_pos6',
    card: 'Eight of Pentacles',
    position: 6,
    upright:
      'Tavsiye: Deliberate practice yapın; zanaat standardını yükseltin.',
    reversed: 'Tavsiye: Oto-pilotu kapatın; anlamla yeniden bağ kurun.',
    keywords: ['pratik', 'ustalık', 'standart', 'anlam', 'odak'],
    context: 'Tavsiye: Ustalığı bilinçle büyütmek.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_sa_pos6',
    card: 'Nine of Pentacles',
    position: 6,
    upright: 'Tavsiye: Sınırları güçlendirin; emeğin meyvesini tadın.',
    reversed: 'Tavsiye: İsrafı kısın; akıllı tasarruf/gelir planı yapın.',
    keywords: ['sınır', 'öz yeter', 'konfor', 'tasarruf', 'plan'],
    context: 'Tavsiye: Zarif yeterliliği korumak.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_sa_pos6',
    card: 'Ten of Pentacles',
    position: 6,
    upright:
      'Tavsiye: Sistem ve süreçlerle kalıcılık kurun; miras/uzun vade düşünün.',
    reversed: 'Tavsiye: Aile/kurumsal çekişmeleri şeffaf kurallarla çözün.',
    keywords: ['sistem', 'süreç', 'uzun vade', 'miras', 'şeffaflık'],
    context: 'Tavsiye: Kalıcı yapı oluşturmak.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_sa_pos6',
    card: 'Page of Pentacles',
    position: 6,
    upright:
      'Tavsiye: Yeni bir beceri/sertifika sürecine başlayın; küçük hedef koyun.',
    reversed: 'Tavsiye: Öğrenme planı yazın; dikkat dağınıklığını sınırlayın.',
    keywords: ['öğrenme', 'hedef', 'sertifika', 'plan', 'odak'],
    context: 'Tavsiye: Çıraklık kasını çalıştırmak.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_sa_pos6',
    card: 'Knight of Pentacles',
    position: 6,
    upright: 'Tavsiye: Rutinler ve SOP’lar kurun; istikrarla ilerleyin.',
    reversed: 'Tavsiye: Sürece çeviklik ekleyin; küçük yenilikler deneyin.',
    keywords: ['rutin', 'SOP', 'istikrar', 'çeviklik', 'ivme'],
    context: 'Tavsiye: Güvenilir tempo.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_sa_pos6',
    card: 'Queen of Pentacles',
    position: 6,
    upright: 'Tavsiye: Kaynakları sevgiyle yönetin; öz-bakıma pay ayırın.',
    reversed: 'Tavsiye: Aşırı yükü bırakın; destek ve sınır isteyin.',
    keywords: ['kaynak', 'öz bakım', 'destek', 'sınır', 'denge'],
    context: 'Tavsiye: Besleyen düzen kurmak.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_sa_pos6',
    card: 'King of Pentacles',
    position: 6,
    upright:
      'Tavsiye: Uzun vadeli strateji yazın; mentorlukla etkiyi kalıcı kılın.',
    reversed: 'Tavsiye: Mikro-yönetimi bırakın; yetki ve güven dağıtın.',
    keywords: ['strateji', 'uzun vade', 'mentorluk', 'yetki', 'güven'],
    context: 'Tavsiye: Sağlam liderlikle ölçeklemek.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 6 anlamını bulma fonksiyonu
export const getPosition6Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return position6Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getSituationAnalysisPosition6Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return getPosition6Meaning(cardName);
};

// Kart adına göre pozisyon 6 anlamını bulma fonksiyonu (ana index için)
export const getSituationAnalysisPosition6MeaningByCardName = (
  cardName: string,
  _isReversed: boolean = false
): SituationAnalysisPositionMeaning | undefined => {
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
  (): SituationAnalysisPositionMeaning[] => {
    return position6Meanings;
  };

// Pozisyon 6 anlamlarını filtreleme fonksiyonu
export const getPosition6MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): SituationAnalysisPositionMeaning[] => {
  return position6Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 6 anlamlarını arama
export const searchPosition6MeaningsByKeyword = (
  keyword: string
): SituationAnalysisPositionMeaning[] => {
  return position6Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position6Meanings,
  getPosition6Meaning,
  getAllPosition6Meanings,
  getPosition6MeaningsByGroup,
  searchPosition6MeaningsByKeyword,
};
