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
- position5Meanings: gerekli
- getposition5Meaning: gerekli
*/

import { SituationAnalysisPositionMeaning } from './position-meanings-index';

// 5. Pozisyon (Dış Etkenler) - 78 Tarot kartı
export const position5Meanings: SituationAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_sa_pos5',
    card: 'The Fool',
    position: 5,
    upright:
      'Joker, dış çevrenin deneme-yanılmaya açık, risk almaya teşvik eden ve yeni başlangıçları destekleyen bir iklim sunduğunu gösterir. Piyasa/çevre, merak ve spontane hamleleri ödüllendiriyor.',
    reversed:
      'Ters Joker, etraftaki tutarsızlık, plansızlık ya da toy yaklaşımların riskleri büyüttüğünü söyler. Dış etkenler, sürüklenmeye ve dağınık hareketlere zemin hazırlayabilir.',
    keywords: ['yeni', 'deney', 'risk', 'esneklik', 'çevre'],
    context: 'Dış çevre deneysel adımlara açık ama tutarlılık sınavında.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_sa_pos5',
    card: 'The Magician',
    position: 5,
    upright:
      'Büyücü, dış kaynakların, araçların ve etkileyici kişilerin erişilebilir olduğunu gösterir. Network ve iletişim kanalları niyetinizi güçlendirebilir.',
    reversed:
      'Ters Büyücü, dışarıda manipülatif iletişim, yanlış vaatler ya da illüzyon yaratma riskine işaret eder. Mesaj kirliliği karar kalitesini düşürebilir.',
    keywords: ['network', 'kaynak', 'ikna', 'algı', 'iletişim'],
    context: 'Dış sahnede güçlü araçlar kadar algı oyunları da var.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_sa_pos5',
    card: 'The High Priestess',
    position: 5,
    upright:
      'Başrahibe, dış dünyada saklı bilgi, perde arkası dinamikler ve sezgiyle okunması gereken işaretler olduğunu söyler. Resmî veriler kadar örtük sinyaller belirleyicidir.',
    reversed:
      'Ters Başrahibe, dedikodu, bilgi saklama ve şeffaf olmayan süreçlerin dışarıda belirsizlik ürettiğini gösterir. Kapalı kapılar ardındaki kararlar sizi dolaylı etkileyebilir.',
    keywords: ['giz', 'örtük bilgi', 'sezgi', 'şeffaflık', 'dedikodu'],
    context: 'Bilginin açık kısmı kadar görünmeyen kısmı da yön veriyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_sa_pos5',
    card: 'The Empress',
    position: 5,
    upright:
      'İmparatoriçe, dış çevrenin besleyici, kaynak zengini ve yaratıcı üretimi destekleyici olduğunu gösterir. Paydaşlar ve topluluklar büyümeyi teşvik ediyor.',
    reversed:
      'Ters İmparatoriçe, aşırı korumacı/kollayıcı çevrenin tembelliğe veya bağımlılığa yol açabileceğini söyler. Konfor, inovasyonun önüne geçebilir.',
    keywords: ['kaynak', 'destek', 'bereket', 'konfor alanı', 'yaratıcılık'],
    context:
      'Dış kaynak bolluğu üretimi büyütür; konfor fazlası frenleyebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_sa_pos5',
    card: 'The Emperor',
    position: 5,
    upright:
      'İmparator, dış etkenlerde otorite, düzen ve net kuralların belirleyici olduğunu gösterir. Regülasyon ve kurumlar çerçeve sağlar, belirsizliği azaltır.',
    reversed:
      'Ters İmparator, bürokrasi, katı hiyerarşi veya mikro-yönetim dışarıdan baskı kuruyor olabilir. Esnek olmayan kurallar hız keser.',
    keywords: ['otorite', 'kural', 'regülasyon', 'bürokrasi', 'çerçeve'],
    context: 'Kurumsal düzen fırsat ve sınırları birlikte getiriyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_sa_pos5',
    card: 'The Hierophant',
    position: 5,
    upright:
      'Aziz, dışarıda geleneksel yapıların, mentorların ve sektör normlarının güçlü etkisini vurgular. Onay mekanizmaları ilerleyişe kapı açabilir.',
    reversed:
      'Ters Aziz, dogma, kalıplaşmış prosedürler ve yeniliğe dirençli kurumların dışarıda sürtünme yarattığını söyler. Eski kurallar yeni çözümleri geciktirebilir.',
    keywords: ['gelenek', 'norm', 'mentor', 'onay', 'direnç'],
    context: 'Sektör normları hem güven hem kısıt getiriyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_sa_pos5',
    card: 'The Lovers',
    position: 5,
    upright:
      'Aşıklar, dış paydaşların değer uyumuna ve şeffaf ortaklıklara açık olduğunu gösterir. Stratejik bir birliktelik kaldıraç etkisi yaratabilir.',
    reversed:
      'Ters Aşıklar, çıkar çatışmaları, parçalı beklentiler ve uyumsuz ortaklıkların dışarıda gerilim yarattığını söyler. Yanlış hizalanma maliyetlidir.',
    keywords: ['ortaklık', 'uyum', 'çıkar', 'hizalama', 'karar'],
    context: 'Dış ortakların hizası başarıyı katlar; uyumsuzluk yorar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_sa_pos5',
    card: 'The Chariot',
    position: 5,
    upright:
      'Savaş Arabası, rekabet ve hız baskısının dışarıda güçlü olduğunu gösterir. Pazar ivmesi cesur ve yönlü hamleleri ödüllendirir.',
    reversed:
      'Ters Savaş Arabası, dağınık ajandalar, çelişen talepler veya agresif rekabetin yön kaybı yarattığını söyler. Konsolidasyon gerekir.',
    keywords: ['rekabet', 'ivme', 'pazar', 'yön', 'baskı'],
    context: 'Hızlı dış tempo net rota talep ediyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_sa_pos5',
    card: 'Strength',
    position: 5,
    upright:
      'Güç, dış etkilerde sakin liderlik, sabır ve güven inşasının prim yaptığını gösterir. Yumuşak güç kapıları açar.',
    reversed:
      'Ters Güç, dışarıda zorbalık, baskı kurma ya da düşük moralin etkili olduğunu söyler. Sert üslup destek kaybettirebilir.',
    keywords: ['güven', 'itibar', 'sükunet', 'moral', 'liderlik'],
    context: 'Sakin ve tutarlı duruş dışarıda destek toplar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_sa_pos5',
    card: 'The Hermit',
    position: 5,
    upright:
      'Ermiş, dış dünyada uzman görüşü, düşünür figürler ve derin analiz talebinin yüksek olduğunu söyler. Thought leadership değer görür.',
    reversed:
      'Ters Ermiş, izolasyon, kopuk iletişim veya geri bildirim eksikliğinin dışarıdan engel oluşturduğunu gösterir. İçeri kapanmak görünürlüğü düşürür.',
    keywords: ['uzmanlık', 'analiz', 'görüş', 'izolasyon', 'görünürlük'],
    context: 'Pazar, derinlik ve bilgece rehberlik arıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_sa_pos5',
    card: 'The Wheel of Fortune',
    position: 5,
    upright:
      'Kader Çarkı, dışarıda dalgalı döngüler ve zamanlamanın kritik olduğunu gösterir. Doğru an, çarpan etkisi yaratır.',
    reversed:
      'Ters Kader Çarkı, kötü zamanlama, tekrarlayan döngüler ve dış şokların planı zorladığını söyler. Esnek senaryolar şart.',
    keywords: ['zamanlama', 'döngü', 'dalga', 'şans', 'adaptasyon'],
    context: 'Makro ritimle uyum rekabette avantaj sağlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_sa_pos5',
    card: 'Justice',
    position: 5,
    upright:
      'Adalet, dış ekosistemde hakkaniyet, uyum ve şeffaf denetim olduğunu gösterir. Hukuki/regülasyon çerçevesi dengeli çalışır.',
    reversed:
      'Ters Adalet, taraflı kararlar, gri bölgeler veya tutarsız uygulamaların dışarıda risk yarattığını söyler. Uyuşmazlıklar artabilir.',
    keywords: ['hukuk', 'uyum', 'şeffaflık', 'taraflılık', 'risk'],
    context: 'Yönetişim düzeyi fırsatı ya da riski belirliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_sa_pos5',
    card: 'The Hanged Man',
    position: 5,
    upright:
      'Asılan Adam, dışarıda beklemeyi gerektiren süreçler, onaylar ve perspektif değişimi çağrısı olduğunu gösterir. Sabır verimlidir.',
    reversed:
      'Ters Asılan Adam, kararsız paydaşlar, askıda kalan kararlar ve gereksiz ertelemelerin dışarıda tıkanma yarattığını söyler.',
    keywords: ['bekleme', 'onay', 'perspektif', 'askıda', 'sabır'],
    context: 'Dış süreçler zaman ister; plan buna göre kurulmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_sa_pos5',
    card: 'Death',
    position: 5,
    upright:
      'Ölüm, dış çevrede köklü dönüşüm, sektör değişimi ve eski düzenin kapanışını gösterir. Yenilenme penceresi açılıyor.',
    reversed:
      'Ters Ölüm, dış direniş, eskiye tutunma ve geçişi geciktiren yapıların hâkim olduğunu söyler. Eski kabuklar atılmadıkça risk artar.',
    keywords: ['dönüşüm', 'geçiş', 'yenilenme', 'direnç', 'sektör'],
    context: 'Makro değişim kapıda; adaptasyon şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_sa_pos5',
    card: 'Temperance',
    position: 5,
    upright:
      'Denge, dış paydaşlar arasında uyum, entegrasyon ve makul orta yolun mümkün olduğunu gösterir. Sinerji üretilebilir.',
    reversed:
      'Ters Denge, parçalı ekipler, uyumsuz metodlar ve aşırılıkların dışarıda sürtünme yarattığını söyler. Kalibrasyon gerekir.',
    keywords: ['entegrasyon', 'uyum', 'sentez', 'aşırılık', 'kalibrasyon'],
    context: 'Ekosistem işbirliği dengeli kurulduğunda akış başlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_sa_pos5',
    card: 'The Devil',
    position: 5,
    upright:
      'Şeytan, dış anlaşmalar, bağımlı tedarikler veya toksik ilişkilerin etki alanına işaret eder. Kısa vadeli fayda uzun vadeli maliyet doğurabilir.',
    reversed:
      'Ters Şeytan, bağların gevşetilmesi, yeniden pazarlık ve toksik yapılardan çıkış fırsatının dışarıda belirdiğini söyler.',
    keywords: ['bağlılık', 'sözleşme', 'bağımlılık', 'toksisite', 'pazarlık'],
    context: 'Kilitli anlaşmalar stratejiyi sınırlayabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_sa_pos5',
    card: 'The Tower',
    position: 5,
    upright:
      'Kule, dış şoklar, ani politika/pazar değişimleri ve sarsıcı haberlerin etkisini gösterir. Eski varsayımlar yıkılabilir.',
    reversed:
      'Ters Kule, ertelenmiş/örtük krizlerin birikerek çatlama riski taşıdığını söyler. Kontrollü yıkım zararı azaltır.',
    keywords: ['şok', 'kriz', 'yıkım', 'yeniden inşa', 'varsayım'],
    context: 'Dış kırılmalara dayanıklı mimari şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_sa_pos5',
    card: 'The Star',
    position: 5,
    upright:
      'Yıldız, dışarıda güven, iyi niyet ve topluluk desteğinin yüksek olduğunu gösterir. Şeffaflık ve ilham etkisi kuvvetli.',
    reversed:
      'Ters Yıldız, umutsuzluk söylemi, negatif PR veya güven erozyonunun dışarıda yankı bulduğunu söyler. İtibar çalışması gerekir.',
    keywords: ['itibar', 'güven', 'topluluk', 'ilham', 'PR'],
    context: 'Dış algı, şeffaf iletişimle parlıyor ya da sönüyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_sa_pos5',
    card: 'The Moon',
    position: 5,
    upright:
      'Ay, söylentiler, belirsiz mesajlar ve çift anlamlı sinyallerin dışarıda kafa karıştırdığını gösterir. Netleştirme şart.',
    reversed:
      'Ters Ay, sisin dağılması, gerçeklerin açığa çıkması ve bilgi doğrulamanın dışarıda düzen kurduğunu söyler.',
    keywords: ['belirsizlik', 'söylenti', 'algı', 'netleşme', 'risk'],
    context: 'İletişim netliği belirsizlik maliyetini düşürür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_sa_pos5',
    card: 'The Sun',
    position: 5,
    upright:
      'Güneş, olumlu görünürlük, başarı hikâyeleri ve destekleyici vitrin etkisinin dışarıda güçlü olduğunu gösterir. Morali ve kabulü yükseltir.',
    reversed:
      'Ters Güneş, abartılı vaatler, gölgede kalan ayrıntılar veya kıskanç bakışların dışarıda sorun doğurabileceğini söyler.',
    keywords: ['görünürlük', 'başarı', 'moral', 'parlaklık', 'algı'],
    context: 'Parlak vitrin fırsat sunar; gerçeklik kontrolü şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_sa_pos5',
    card: 'Judgement',
    position: 5,
    upright:
      'Mahkeme, denetim, değerlendirme ve geri çağırma süreçlerinin dışarıda devrede olduğunu gösterir. Objektif ölçütler ilerlemeyi hızlandırır.',
    reversed:
      'Ters Mahkeme, haksız yargılar, önyargı veya ağır bürokrasinin dışarıda kararları geciktirdiğini söyler.',
    keywords: ['değerlendirme', 'denetim', 'geri bildirim', 'yargı', 'ölçüt'],
    context: 'Harici değerlendirme oyun alanını belirliyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_sa_pos5',
    card: 'The World',
    position: 5,
    upright:
      'Dünya, küresel erişim, geniş ağlar ve tamamlanmış döngülerin dışarıda avantaj sağladığını gösterir. Uluslararası kapılar açık.',
    reversed:
      'Ters Dünya, eksik entegrasyon, bölgesel kısıtlar veya lojistik engellerin dışarıda çerçeveyi daralttığını söyler.',
    keywords: ['küresel', 'ağ', 'entegrasyon', 'erişim', 'lojistik'],
    context: 'Global bağlar ölçeği büyütür; eksikleri kapatmak gerek.',
    group: 'Majör Arkana',
  },

  // CUPS (Kupalar)
  {
    id: 'ace_of_cups_sa_pos5',
    card: 'Ace of Cups',
    position: 5,
    upright:
      'Kupa Ası, dış çevrede samimi destek, empati ve yeni ilişkiler için açık kapılar olduğunu gösterir. Duygusal iklim besleyici.',
    reversed:
      'Ters Kupa Ası, dışarıda duygusal soğukluk, kırgınlık veya güven sorunu olabileceğini söyler. Mesafe, işbirliğini zayıflatır.',
    keywords: ['destek', 'empati', 'yakınlık', 'güven', 'ilişki'],
    context: 'Topluluk/ekip sıcaklığı ortak çalışmayı etkiliyor.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_sa_pos5',
    card: 'Two of Cups',
    position: 5,
    upright:
      'İki Kupa, dış paydaşlarla karşılıklılık ve uyum ihtimalinin yüksek olduğunu gösterir. Eşit alışveriş köprü kurar.',
    reversed:
      'Ters İki Kupa, dengesiz bağ, yanlış anlama veya kırılgan ittifakların dışarıda sorun yaratabileceğini söyler.',
    keywords: ['uyum', 'karşılıklılık', 'ittifak', 'diyalog', 'denge'],
    context: 'Eşit ilişki dış destek kalitesini belirler.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_sa_pos5',
    card: 'Three of Cups',
    position: 5,
    upright:
      'Üç Kupa, dışarıda topluluk kutlaması, destekleyici ağlar ve paylaşım kültürünün güçlü olduğunu gösterir. Moral yükselir.',
    reversed:
      'Ters Üç Kupa, dış çevrede kıskançlık, dışlanmışlık hissi veya yüzeyselliğin görünebileceğini söyler.',
    keywords: ['topluluk', 'kutlama', 'destek', 'kıskançlık', 'kültür'],
    context: 'Sosyal iklim, motivasyonu güçlendirebilir ya da gölgeleyebilir.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_sa_pos5',
    card: 'Four of Cups',
    position: 5,
    upright:
      'Dört Kupa, dış tekliflerin ilgi çekmeyebileceğini veya fırsatların fark edilmediğini gösterir. Dış gürültü dikkat dağıtabilir.',
    reversed:
      'Ters Dört Kupa, yeni bir dış fırsatın ilgiyi canlandıracağını söyler. Uyanış kapıda.',
    keywords: ['ilgisizlik', 'fırsat', 'dikkat', 'uyanış', 'odak'],
    context: 'Gelen tekliflerin değeri tekrar gözden geçirilmeli.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_sa_pos5',
    card: 'Five of Cups',
    position: 5,
    upright:
      'Beş Kupa, dışarıda hayal kırıklıkları veya iptallerin moral bozabileceğini gösterir. Ancak elde kalanlar kullanılabilir.',
    reversed:
      'Ters Beş Kupa, dış çevrede telafi ve onarım fırsatlarının güçlendiğini söyler. Köprüler yenilenebilir.',
    keywords: ['kayıp', 'telafi', 'moral', 'onarım', 'şans'],
    context: 'Dış kırılmaların ardından toparlanma alanı var.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_sa_pos5',
    card: 'Six of Cups',
    position: 5,
    upright:
      'Altı Kupa, dış dünyada nostalji ve eski temasların destek sağlayabileceğini gösterir. Geçmiş bağlar canlanabilir.',
    reversed:
      'Ters Altı Kupa, geçmişe saplanmış ilişkilerin ilerleyişi yavaşlatabileceğini söyler.',
    keywords: ['geçmiş', 'ağ', 'hatıra', 'yeniden bağ', 'destek'],
    context: 'Eski bağlar yeni kapılar açabilir; takılma riski var.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_sa_pos5',
    card: 'Seven of Cups',
    position: 5,
    upright:
      'Yedi Kupa, dışarıda seçenek bolluğu ve parıldayan vaatlerin olduğunu gösterir. Seçim ölçütü şart.',
    reversed:
      'Ters Yedi Kupa, dışarıdaki sisin dağılacağını ve gerçekçi alternatiflerin öne çıkacağını söyler.',
    keywords: ['seçenek', 'vaat', 'netlik', 'ölçüt', 'odak'],
    context: 'Pazar cazibesi yüksek; ayıklama yapın.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_sa_pos5',
    card: 'Eight of Cups',
    position: 5,
    upright:
      'Sekiz Kupa, dış koşulların daha anlamlı bir yöne geçişi desteklediğini gösterir. Eski ilişki/bağlar geride kalabilir.',
    reversed:
      'Ters Sekiz Kupa, dış bağların kopmasını zorlaştıran duygusal/itibarî nedenler olabileceğini söyler.',
    keywords: ['ayrılış', 'anlam', 'geçiş', 'bağ', 'itibar'],
    context: 'Dış ağ değişimi stratejik olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_sa_pos5',
    card: 'Nine of Cups',
    position: 5,
    upright:
      'Dokuz Kupa, dışarıda beğeni, takdir ve olumlu geri bildirimlerin yüksek olduğunu gösterir. Tatmin bulaşıcıdır.',
    reversed:
      'Ters Dokuz Kupa, aşırı övgü/şişkin beklentilerin dışarıda gerçeklikten kopuk bir tablo yaratabileceğini söyler.',
    keywords: ['takdir', 'tatmin', 'övgü', 'beklenti', 'gerçekçilik'],
    context: 'Dış beğeni moral verir; ölçülülük gerekir.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_sa_pos5',
    card: 'Ten of Cups',
    position: 5,
    upright:
      'On Kupa, dış çevrede uyumlu ekip/aile kültürü ve barışçıl atmosferin hâkim olduğunu gösterir. Birlik duygusu işler.',
    reversed:
      'Ters On Kupa, dışarıda görünür uyumun altında bastırılmış gerginlikler olabileceğini söyler.',
    keywords: ['uyum', 'kültür', 'barış', 'iklim', 'gerilim'],
    context: 'Dış huzur üretkenliği artırır; sahicilik önemli.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_sa_pos5',
    card: 'Page of Cups',
    position: 5,
    upright:
      'Kupa Prensi, dışarıda yaratıcı tekliflere ve nazik yaklaşımlara açık bir alan olduğunu gösterir. Yumuşak iletişim etkili.',
    reversed:
      'Ters Kupa Prensi, alınganlık, kararsızlık veya aşırı duygusallığın dış ilişkilerde dalgalanma yaratabileceğini söyler.',
    keywords: ['yaratıcılık', 'naziklik', 'teklif', 'hassasiyet', 'dalgalanma'],
    context: 'Dış diyalogda narin üslup kapı açar.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_sa_pos5',
    card: 'Knight of Cups',
    position: 5,
    upright:
      'Kupa Şövalyesi, dışarıda vizyoner ve zarif işbirliklerinin mümkün olduğunu gösterir. Estetik/etik ton önemsenir.',
    reversed:
      'Ters Kupa Şövalyesi, tutarsız vaatler ve fazla romantize edilmiş beklentilerin dışarıda güvensizlik yaratabileceğini söyler.',
    keywords: ['vizyon', 'zarafet', 'ittifak', 'tutarlılık', 'güven'],
    context: 'Dış tekliflerde samimiyet ve süreklilik aranır.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_sa_pos5',
    card: 'Queen of Cups',
    position: 5,
    upright:
      'Kupa Kraliçesi, dış çevrede empatik liderler ve koruyucu alanlar olduğunu gösterir. Güvenli ilişkiler inşa edilebilir.',
    reversed:
      'Ters Kupa Kraliçesi, sınır erimesi, duygusal manipülasyon veya aşırı hassasiyetin dış alanda karmaşa yaratabileceğini söyler.',
    keywords: ['empati', 'alan tutma', 'güven', 'sınır', 'manipülasyon'],
    context: 'Dış destek şefkatli ama sınır ihlali riski var.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_sa_pos5',
    card: 'King of Cups',
    position: 5,
    upright:
      'Kupa Kralı, dışarıda duygusal olgunluk ve kriz anında serinkanlı liderliğin bulunduğunu gösterir. Zor koşullarda bile sükûnet korunur.',
    reversed:
      'Ters Kupa Kralı, pasif-agresif tutumlar, bastırılmış duygular ve gelgitli tepkilerin dış ilişkileri zorlayabileceğini söyler.',
    keywords: [
      'olgunluk',
      'sükûnet',
      'kriz yönetimi',
      'pasif-agresyon',
      'denge',
    ],
    context: 'Dış liderlik dengeli; gölge tarafı gizli gerilim.',
    group: 'Kupalar',
  },

  // SWORDS (Kılıçlar)
  {
    id: 'ace_of_swords_sa_pos5',
    card: 'Ace of Swords',
    position: 5,
    upright:
      'Kılıç Ası, dışarıda net bilgi, keskin analiz ve doğru ifadeye değer verildiğini gösterir. Açık iletişim kapıları açar.',
    reversed:
      'Ters Kılıç Ası, bilgi kirliliği, çarpıtılmış söylem veya kararsız mesajların dışarıda kafa karıştırdığını söyler.',
    keywords: ['netlik', 'bilgi', 'analiz', 'iletişim', 'mesaj'],
    context: 'Saha, keskin ve doğru söze prim veriyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sa_pos5',
    card: 'Two of Swords',
    position: 5,
    upright:
      'İki Kılıç, dış paydaşların bekle-gör tutumu veya kararsızlığını gösterir. Dosyalar askıda kalabilir.',
    reversed:
      'Ters İki Kılıç, ertelenen yüzleşmelerin açığa çıkacağını ve karar baskısının artacağını söyler.',
    keywords: ['kararsızlık', 'bekleme', 'yüzleşme', 'terazi', 'eşik'],
    context: 'Dış karar yapısı ağır çalışıyor; zaman planı önemli.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sa_pos5',
    card: 'Three of Swords',
    position: 5,
    upright:
      'Üç Kılıç, dışarıda kırıcı eleştiriler, anlaşmazlıklar veya olumsuz basının etkisini gösterir.',
    reversed:
      'Ters Üç Kılıç, onarım ve dürüst iletişimle dış kırılmaların tamir edilebileceğini söyler.',
    keywords: ['eleştiri', 'anlaşmazlık', 'PR', 'onarım', 'ifade'],
    context: 'Dış eleştiri yönetimi hayati.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sa_pos5',
    card: 'Four of Swords',
    position: 5,
    upright:
      'Dört Kılıç, dış süreçlerde geçici duraklamalar, tatiller veya bekleme pencereleri olduğunu gösterir.',
    reversed:
      'Ters Dört Kılıç, dinlenmeden çalışma kültürünün dışarıda verimi düşürdüğünü söyler.',
    keywords: ['duraklama', 'takvim', 'bekleme', 'ritim', 'verim'],
    context: 'Saha ritmi aralıklı; pencereyi iyi yakalayın.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sa_pos5',
    card: 'Five of Swords',
    position: 5,
    upright:
      'Beş Kılıç, dışarıda kazanan-her-şeyi-alır tavırlar ve keskin rekabet olduğunu gösterir.',
    reversed:
      'Ters Beş Kılıç, uzlaşı ve yüz kurtarma çözümlerinin dışarıda mümkün olduğunu söyler.',
    keywords: ['rekabet', 'çatışma', 'uzlaşı', 'maliyet', 'strateji'],
    context: 'Kazanan odaklı iklim; köprüleri yakmadan ilerle.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sa_pos5',
    card: 'Six of Swords',
    position: 5,
    upright:
      'Altı Kılıç, dışarıda geçiş programları, taşınma/dönüşüm projeleri ve yumuşak iniş fırsatları olduğunu gösterir.',
    reversed:
      'Ters Altı Kılıç, yol/ağ sorunları veya geçiş dirençlerinin dışarıda engel yaratabileceğini söyler.',
    keywords: ['geçiş', 'taşınma', 'dönüşüm', 'ağ', 'engel'],
    context: 'Dış altyapı geçişi kolaylaştırabilir ya da zorlaştırır.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sa_pos5',
    card: 'Seven of Swords',
    position: 5,
    upright:
      'Yedi Kılıç, dışarıda stratejik hamleler, kulis ve bilgi saklama pratiklerinin etkili olduğunu gösterir.',
    reversed:
      'Ters Yedi Kılıç, sızıntılar, ifşalar ve güven kaybının dışarıda risk doğurduğunu söyler.',
    keywords: ['strateji', 'kulis', 'gizlilik', 'sızıntı', 'güven'],
    context: 'Oyun kuralları sahnede değil kuliste yazılıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sa_pos5',
    card: 'Eight of Swords',
    position: 5,
    upright:
      'Sekiz Kılıç, dış regülasyon/kısıtların hareket alanını daralttığını gösterir.',
    reversed:
      'Ters Sekiz Kılıç, kısıtların gevşemesi veya muafiyetlerin dışarıda açılabileceğini söyler.',
    keywords: ['kısıt', 'regülasyon', 'engel', 'muafiyet', 'esneklik'],
    context: 'Kural seti alanı tanımlıyor; esneklik arayışı önemli.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sa_pos5',
    card: 'Nine of Swords',
    position: 5,
    upright:
      'Dokuz Kılıç, dışarıda kaygı söylemi, kriz haberleri ve stres ikliminin baskın olduğunu gösterir.',
    reversed:
      'Ters Dokuz Kılıç, panik dalgasının dineceğini ve daha rasyonel bir tonun dışarıda yükseleceğini söyler.',
    keywords: ['kaygı', 'kriz', 'haber', 'stres', 'rasyonellik'],
    context: 'Dış haber akışı duygu durumunu etkiliyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sa_pos5',
    card: 'Ten of Swords',
    position: 5,
    upright:
      'On Kılıç, dışarıda bir dosyanın kapanması, sonlanma veya iflas/hükümsüzlük gibi sert bitişleri gösterir.',
    reversed:
      'Ters On Kılıç, dışarıda yeniden başlama, enkaz kaldırma ve toparlanma zemininin oluştuğunu söyler.',
    keywords: ['bitiş', 'kapanış', 'kriz', 'yeniden başlangıç', 'toparlanma'],
    context: 'Harici kapanışlar yeni rota gerektirir.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sa_pos5',
    card: 'Page of Swords',
    position: 5,
    upright:
      'Kılıç Prensi, dışarıda yüksek merak, soru-cevap ve bilgi talebinin arttığını gösterir.',
    reversed:
      'Ters Kılıç Prensi, dedikodu, yanlış bilgi ve acele yargıların dışarıda yayıldığını söyler.',
    keywords: ['merak', 'bilgi', 'soru', 'dedikodu', 'doğrulama'],
    context: 'Bilgi hijyeni rekabet avantajı sağlar.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sa_pos5',
    card: 'Knight of Swords',
    position: 5,
    upright:
      'Kılıç Şövalyesi, dış sahada hızlı hareket eden aktörler ve agresif iletişim olduğunu gösterir.',
    reversed:
      'Ters Kılıç Şövalyesi, aceleci/sert söylemin geri tepebileceğini ve direnç doğuracağını söyler.',
    keywords: ['hız', 'agresif', 'söylem', 'risk', 'tempo'],
    context: 'Hızlı sahada stratejik fren-gaz gerekir.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sa_pos5',
    card: 'Queen of Swords',
    position: 5,
    upright:
      'Kılıç Kraliçesi, dışarıda nesnellik, şeffaf akıl ve adil değerlendirme beklentisinin yüksek olduğunu gösterir.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştirinin, ince alayın veya sert dilin dışarıda soğuma yaratabileceğini söyler.',
    keywords: ['nesnellik', 'adalet', 'şeffaflık', 'eleştiri', 'iletişim'],
    context: 'Akılcı çerçeve kabulü artırır; dil tonu kritik.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sa_pos5',
    card: 'King of Swords',
    position: 5,
    upright:
      'Kılıç Kralı, dış otorite, uzman komiteler ve etik standardın oyunu şekillendirdiğini gösterir.',
    reversed:
      'Ters Kılıç Kralı, katı/dogmatik kararların ve güç istismarının dışarıda güven erozyonu yaratabileceğini söyler.',
    keywords: ['otorite', 'uzman', 'etik', 'dogma', 'güven'],
    context: 'Harici akıl ve etik çerçeve rotayı belirliyor.',
    group: 'Kılıçlar',
  },

  // WANDS (Asalar)
  {
    id: 'ace_of_wands_sa_pos5',
    card: 'Ace of Wands',
    position: 5,
    upright:
      'Değnek Ası, dışarıda taze fırsatlar, hızlanan talep ve girişimci enerji olduğunu gösterir.',
    reversed:
      'Ters Değnek Ası, dış kıvılcımın kısa ömürlü olabileceğini veya zamanlamanın erken/geç kalabileceğini söyler.',
    keywords: ['fırsat', 'talep', 'enerji', 'girişim', 'zamanlama'],
    context: 'Pazar ateşi yanıyor; pencereyi kaçırmamak gerek.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_sa_pos5',
    card: 'Two of Wands',
    position: 5,
    upright:
      'İki Değnek, dış pazarlarda genişleme ve yeni bölgelerle temas şansı olduğunu gösterir.',
    reversed:
      'Ters İki Değnek, dış belirsizliklerin risk iştahını kısabileceğini ve içeride kalma baskısı yaratabileceğini söyler.',
    keywords: ['genişleme', 'pazar', 'ufuk', 'risk', 'vizyon'],
    context: 'Dış sahada planlı adım rekabet üstünlüğü sağlar.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_sa_pos5',
    card: 'Three of Wands',
    position: 5,
    upright:
      'Üç Değnek, dış ortaklıklar, tedarik zinciri ve lojistiğin büyümeyi desteklediğini gösterir.',
    reversed:
      'Ters Üç Değnek, gecikme, tedarik aksaklığı veya gümrük/lojistik sorunlarının dışarıda hız kestiğini söyler.',
    keywords: ['ortaklık', 'tedarik', 'lojistik', 'gecikme', 'büyüme'],
    context: 'Dış omurga (tedarik/lojistik) büyümenin anahtarı.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_sa_pos5',
    card: 'Four of Wands',
    position: 5,
    upright:
      'Dört Değnek, dış etkinlikler, lansmanlar ve topluluk buluşmalarının ivme yarattığını gösterir.',
    reversed:
      'Ters Dört Değnek, mekân/organizasyon sorunları veya katılım düşüklüğünün dış ivmeyi azaltabileceğini söyler.',
    keywords: ['etkinlik', 'topluluk', 'lansman', 'aidiyet', 'katılım'],
    context: 'Dış sahnede görünür kutlamalar moral ve talep üretir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_sa_pos5',
    card: 'Five of Wands',
    position: 5,
    upright:
      'Beş Değnek, dış rekabet, prova çatışmaları ve fikir çarpışmalarının yoğun olduğunu gösterir.',
    reversed:
      'Ters Beş Değnek, dağınık çekişmelerin verimsizlik yarattığını ve kuralların netleşmesi gerektiğini söyler.',
    keywords: ['rekabet', 'fikir', 'prova', 'kural', 'verim'],
    context: 'Dış rekabet akıllı çerçeveyle fırsata dönüşür.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_sa_pos5',
    card: 'Six of Wands',
    position: 5,
    upright:
      'Altı Değnek, dışarıda tanınma, ödül ve olumlu görünürlüğün yükseldiğini gösterir.',
    reversed:
      'Ters Altı Değnek, görünmeyen emek, kıskançlık veya ölçülmeyen başarıların dışarıda algı sorununa yol açabileceğini söyler.',
    keywords: ['tanınma', 'ödül', 'algı', 'görünürlük', 'metrik'],
    context: 'Dış zafer doğru ölçülür ve anlatılırsa kalıcıdır.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_sa_pos5',
    card: 'Seven of Wands',
    position: 5,
    upright:
      'Yedi Değnek, dışarıda pozisyonu koruma, itirazlara yanıt ve savunma gerektirdiğini gösterir.',
    reversed:
      'Ters Yedi Değnek, aşırı savunuculuğun dış destek kaybına yol açabileceğini söyler.',
    keywords: ['savunma', 'itibar', 'pozisyon', 'itiraz', 'destek'],
    context: 'Dış meydan okumaya ölçülü yanıt güven verir.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_sa_pos5',
    card: 'Eight of Wands',
    position: 5,
    upright:
      'Sekiz Değnek, dış iletişim hatlarının hızlı, yanıtların çabuk ve fırsat pencerelerinin kısa olduğunu gösterir.',
    reversed:
      'Ters Sekiz Değnek, mesaj karmaşası ve gecikmenin dışarıda fırsat kaçırttığını söyler.',
    keywords: ['hız', 'iletişim', 'senkron', 'fırsat', 'zaman'],
    context: 'Hızlı hatlar rekabet üstünlüğü yaratır.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_sa_pos5',
    card: 'Nine of Wands',
    position: 5,
    upright:
      'Dokuz Değnek, dış baskıların arttığını ancak dayanıklılık ve itibarın sizi koruduğunu gösterir.',
    reversed:
      'Ters Dokuz Değnek, tükenmiş ekosistem, yorgun paydaşlar ve düşük toleransın dışarıda risk yarattığını söyler.',
    keywords: ['dayanıklılık', 'baskı', 'itibar', 'tolerans', 'riske maruz'],
    context: 'Dış zorluklar karşısında dayanma kapasitesi kritik.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_sa_pos5',
    card: 'Ten of Wands',
    position: 5,
    upright:
      'On Değnek, dış taleplerin yükü artırdığını ve kapasite sınırına yaklaşıldığını gösterir.',
    reversed:
      'Ters On Değnek, dış yüklerin sadeleştirilmesi ve delege edilmesi gerektiğini söyler.',
    keywords: ['yük', 'talep', 'kapasite', 'delege', 'sadelik'],
    context: 'Talep yönetimi dış ilişkilerin sürdürülebilirliğini belirler.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_sa_pos5',
    card: 'Page of Wands',
    position: 5,
    upright:
      'Değnek Prensi, dışarıda keşif, pilot projeler ve denemelere açık alan olduğunu gösterir.',
    reversed:
      'Ters Değnek Prensi, dış hevesin çabuk sönmesi veya ilgilerin hızla kayması riskine işaret eder.',
    keywords: ['pilot', 'deney', 'keşif', 'heves', 'süreklilik'],
    context: 'Dış sahada küçük deneyler yola ışık tutar.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_sa_pos5',
    card: 'Knight of Wands',
    position: 5,
    upright:
      'Değnek Şövalyesi, dış momentumun yüksek olduğunu ve cesur hamlelerin yankı bulduğunu gösterir.',
    reversed:
      'Ters Değnek Şövalyesi, savruk enerji ve yarıda bırakılan girişimlerin dış güveni zedeleyebileceğini söyler.',
    keywords: ['momentum', 'cesaret', 'hamle', 'istikrar', 'güven'],
    context: 'Hızlı enerji stratejiyle bağlanmalı.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_sa_pos5',
    card: 'Queen of Wands',
    position: 5,
    upright:
      'Değnek Kraliçesi, dış sahada karizma, çekici marka ve ilham verici liderliğin güçlü etkisi olduğunu gösterir.',
    reversed:
      'Ters Değnek Kraliçesi, görünürlük kaygısı, kıskançlık ve dağınık odaklılığın dışarıda karizmayı gölgeleyebileceğini söyler.',
    keywords: ['karizma', 'marka', 'liderlik', 'görünürlük', 'odak'],
    context: 'Dış algı manyetik; tutarlılık onu kalıcı kılar.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_sa_pos5',
    card: 'King of Wands',
    position: 5,
    upright:
      'Değnek Kralı, dış dünyada vizyoner liderlere alan ve ölçeklenme fırsatı verildiğini gösterir.',
    reversed:
      'Ters Değnek Kralı, otoriter tonun, ego sürtüşmelerinin ve dinleme eksikliğinin dışarıda direnç doğuracağını söyler.',
    keywords: ['vizyon', 'ölçek', 'liderlik', 'ego', 'direnç'],
    context: 'Vizyonu paylaşmak dış desteği büyütür.',
    group: 'Asalar',
  },

  // PENTACLES (Tılsımlar)
  {
    id: 'ace_of_pentacles_sa_pos5',
    card: 'Ace of Pentacles',
    position: 5,
    upright:
      'Tılsım Ası, dışarıda fon, bütçe veya somut fırsat pencerelerinin açıldığını gösterir.',
    reversed:
      'Ters Tılsım Ası, kaynak sıkılığı, bütçe kesintisi veya belirsiz finansman koşullarını işaret eder.',
    keywords: ['fon', 'bütçe', 'fırsat', 'yatırım', 'kaynak'],
    context: 'Maddi zemin karar hızını belirliyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_sa_pos5',
    card: 'Two of Pentacles',
    position: 5,
    upright:
      'İki Tılsım, dışarıda değişken öncelikler ve birden fazla talebin dengelenmesi gerektiğini gösterir.',
    reversed:
      'Ters İki Tılsım, dengesiz nakit akışı/operasyon yükü nedeniyle dışarıda aksamalar olabileceğini söyler.',
    keywords: ['denge', 'nakit', 'öncelik', 'akış', 'operasyon'],
    context: 'Esnek planlama dış dalgalanmalara çare.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_sa_pos5',
    card: 'Three of Pentacles',
    position: 5,
    upright:
      'Üç Tılsım, dış işbirlikleri, uzman ekipler ve kalite standartlarının ortak zeminde buluştuğunu gösterir.',
    reversed:
      'Ters Üç Tılsım, rol belirsizliği ve düşük koordinasyonun dış işlerde kalite kaybı yaratabileceğini söyler.',
    keywords: ['işbirliği', 'uzman', 'kalite', 'koordinasyon', 'rol'],
    context: 'Harici ortaklıklar net çerçeve ister.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_sa_pos5',
    card: 'Four of Pentacles',
    position: 5,
    upright:
      'Dört Tılsım, dış çevrede riskten kaçınma ve tasarruf odaklılığın arttığını gösterir.',
    reversed:
      'Ters Dört Tılsım, aşırı sıkılık/harcama ikileminin dış pazarda akışı bozabileceğini söyler.',
    keywords: ['tasarruf', 'risk', 'kontrol', 'nakit', 'esneklik'],
    context: 'Temkinli iklim; ölçülü risk gerek.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_sa_pos5',
    card: 'Five of Pentacles',
    position: 5,
    upright:
      'Beş Tılsım, dış finansal sıkışma, talep düşüşü veya destek eksikliğini gösterir.',
    reversed:
      'Ters Beş Tılsım, hibeler, yardım programları veya toparlanma işaretlerinin dışarıda belirdiğini söyler.',
    keywords: ['sıkışma', 'destek', 'talep', 'toparlanma', 'yardım'],
    context: 'Zor iklimde köprü finansman/yardım kritik.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_sa_pos5',
    card: 'Six of Pentacles',
    position: 5,
    upright:
      'Altı Tılsım, dış dünyada adil alışveriş, sponsorluklar ve hibrit kazan-kazan modellerinin mümkün olduğunu gösterir.',
    reversed:
      'Ters Altı Tılsım, güç dengesizliği ve koşullu desteklerin dışarıda bağımlılık doğurabileceğini söyler.',
    keywords: ['alışveriş', 'sponsorluk', 'adalet', 'güç', 'koşul'],
    context: 'Şeffaf şartlar güven üretir.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_sa_pos5',
    card: 'Seven of Pentacles',
    position: 5,
    upright:
      'Yedi Tılsım, dış yatırımcıların sabır ve ölçümlenebilir kazanım beklediğini gösterir.',
    reversed:
      'Ters Yedi Tılsım, kısa vadeli baskı ve sabırsızlığın dışarıda stratejiyi bozabileceğini söyler.',
    keywords: ['yatırım', 'getiri', 'sabır', 'ölçüm', 'baskı'],
    context: 'Dış sermaye ROI ve zaman çizgisine bakıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_sa_pos5',
    card: 'Eight of Pentacles',
    position: 5,
    upright:
      'Sekiz Tılsım, dışarıda ustalık, sertifikasyon ve kalite belgelerine değer verildiğini gösterir.',
    reversed:
      'Ters Sekiz Tılsım, kalitesizlik/özensizlik algısının dış pazarda hızla cezalandırılacağını söyler.',
    keywords: ['ustalık', 'kalite', 'sertifika', 'standart', 'itibar'],
    context: 'Dış pazar standartları çıtayı belirler.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_sa_pos5',
    card: 'Nine of Pentacles',
    position: 5,
    upright:
      'Dokuz Tılsım, dışarıda prestij, bağımsızlık ve premium algının ödüllendirildiğini gösterir.',
    reversed:
      'Ters Dokuz Tılsım, abartılı lüks/harcama algısının dışarıda tepki doğurabileceğini söyler.',
    keywords: ['prestij', 'bağımsızlık', 'premium', 'algı', 'itidal'],
    context: 'Kaliteli imaj değer katar; israf algısı zarar verir.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_sa_pos5',
    card: 'Ten of Pentacles',
    position: 5,
    upright:
      'On Tılsım, dışarıda aile/ofis ağları, kurumsal miras ve uzun vadeli fonların destekleyici olduğunu gösterir.',
    reversed:
      'Ters On Tılsım, miras anlaşmazlığı, varlık dağınıklığı veya kurumsal çekişmelerin dışarıda engel olabileceğini söyler.',
    keywords: ['miras', 'ağ', 'kurumsal', 'istikrar', 'çekişme'],
    context: 'Köklü ağlar kaldıraçtır; iç çekişme dışta görünür.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_sa_pos5',
    card: 'Page of Pentacles',
    position: 5,
    upright:
      'Tılsım Prensi, dış staj/hibe/mini fon ve eğitim olanaklarının mevcut olduğunu gösterir.',
    reversed:
      'Ters Tılsım Prensi, dağınık başvurular ve süreleri kaçırmanın dış fırsatları heba edebileceğini söyler.',
    keywords: ['hibe', 'staj', 'eğitim', 'başvuru', 'takvim'],
    context: 'Küçük dış kaynaklar büyük kapılar açar.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_sa_pos5',
    card: 'Knight of Pentacles',
    position: 5,
    upright:
      'Tılsım Şövalyesi, dış ortamda düzen, süreç ve güvenilir teslimatın tercih edildiğini gösterir.',
    reversed:
      'Ters Tılsım Şövalyesi, aşırı durağan/katı süreçlerin dışarıda fırsat kaçırttığını söyler.',
    keywords: ['süreç', 'güvenilirlik', 'teslim', 'disiplin', 'esneklik'],
    context: 'Dış müşteri istikrar ister; çeviklik de gerek.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_sa_pos5',
    card: 'Queen of Pentacles',
    position: 5,
    upright:
      'Tılsım Kraliçesi, dış paydaşların pratik, bakım odaklı ve sürdürülebilir çözümleri tercih ettiğini gösterir.',
    reversed:
      'Ters Tılsım Kraliçesi, kaynak israfı ve dağınık önceliklerin dış güveni zedeleyebileceğini söyler.',
    keywords: ['sürdürülebilirlik', 'pratiklik', 'kaynak', 'bakım', 'israf'],
    context: 'Somut fayda ve bakım kültürü dışta değer görür.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_sa_pos5',
    card: 'King of Pentacles',
    position: 5,
    upright:
      'Tılsım Kralı, dışarıda finansal bilgelik, stratejik sponsorlar ve sağlam yatırımcı profilinin mevcut olduğunu gösterir.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrolcü sponsorlar, statü odaklı bakış ve katı şartların dışarıda esnekliği kısıtlayabileceğini söyler.',
    keywords: ['sponsor', 'yatırım', 'strateji', 'kontrol', 'şart'],
    context: 'Akıllı sermaye kanatlandırır; katı şartlar sınırlar.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 5 anlamını bulma fonksiyonu
export const getPosition5Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return position5Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getSituationAnalysisPosition5Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return getPosition5Meaning(cardName);
};

// Kart adına göre pozisyon 5 anlamını bulma fonksiyonu (ana index için)
export const getSituationAnalysisPosition5MeaningByCardName = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  const meaning = getPosition5Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 5 anlamlarını alma fonksiyonu
export const getAllPosition5Meanings =
  (): SituationAnalysisPositionMeaning[] => {
    return position5Meanings;
  };

// Pozisyon 5 anlamlarını filtreleme fonksiyonu
export const getPosition5MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): SituationAnalysisPositionMeaning[] => {
  return position5Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 5 anlamlarını arama
export const searchPosition5MeaningsByKeyword = (
  keyword: string
): SituationAnalysisPositionMeaning[] => {
  return position5Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position5Meanings,
  getPosition5Meaning,
  getAllPosition5Meanings,
  getPosition5MeaningsByGroup,
  searchPosition5MeaningsByKeyword,
};
