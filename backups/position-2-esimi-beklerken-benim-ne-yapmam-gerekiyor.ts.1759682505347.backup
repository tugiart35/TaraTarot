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
- position2Meanings: gerekli
- getposition2Meaning: gerekli
*/

import { MarriagePositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position2Meanings: MarriagePositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_ma_pos2',
    card: 'The Fool',
    position: 2,
    upright:
      'Beklerken yeni deneyimlere açık olun, hayatı hafiflik ve merakla yaşayın. Yolculuğunuz size doğru kişiye yaklaşmak için özgürlük kazandırır.',
    reversed:
      'Dikkatsizlik ya da sorumsuzca adımlar, doğru kişiye hazırlığınızı zorlaştırabilir. Beklerken köksüzlük yerine sağlam temellere odaklanın.',
    keywords: ['yenilik', 'özgürlük', 'deneyim', 'hafiflik'],
    context:
      'Beklerken hayatı merakla keşfetmek faydalı. Ama sorumsuz adımlar yerine temeli sağlamlaştırmak gerekir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos2',
    card: 'The Magician',
    position: 2,
    upright:
      'Kendi potansiyelinizi geliştirin, yeteneklerinizi hayata geçirin. Bekleme sürecini kişisel gücünüzü pekiştirmek için kullanın.',
    reversed:
      'Enerjinizi dağınık kullanmak ya da kendinizi küçümsemek sizi yavaşlatabilir. Net niyet ve disiplinle ilerleyin.',
    keywords: ['güç', 'yaratım', 'potansiyel', 'ifade'],
    context:
      'Beklerken gücünüzü geliştirin. Odaklı kalmak sizi doğru kişiye hazırlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos2',
    card: 'The High Priestess',
    position: 2,
    upright:
      'Sezgilerinizi dinleyin ve iç dünyanızı geliştirin. İçsel bilgelik sizi doğru eşe hazırlayacaktır.',
    reversed:
      'Aşırı pasiflik ya da içe kapanıklık süreci zorlaştırabilir. Sezgiyi paylaşım ve açık kalple dengeleyin.',
    keywords: ['sezgi', 'bilgelik', 'içsel rehberlik', 'denge'],
    context:
      'Beklerken sezgiyi güçlendirmek faydalı. Ama kapanmak yerine paylaşım da olmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos2',
    card: 'The Empress',
    position: 2,
    upright:
      'Kendinize şefkat gösterin, bolluk ve bereket bilincini geliştirin. Öz bakım süreciniz eşe hazırlar.',
    reversed:
      'Aşırı bağımlılık ya da öz değeri ihmal etmek süreci zorlaştırır. Önce kendinizi beslemeyi öğrenin.',
    keywords: ['şefkat', 'bolluk', 'öz bakım', 'yaratıcılık'],
    context:
      'Beklerken öz bakım ve şefkat önemlidir. Bu sizi uyumlu bir birlikteliğe hazırlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos2',
    card: 'The Emperor',
    position: 2,
    upright:
      'Hayatınıza düzen ve sağlam sınırlar kurun. Beklerken sorumluluk bilinci sizi olgunlaştırır.',
    reversed:
      'Aşırı katılık ya da kontrol ihtiyacı süreci zorlaştırabilir. Esnekliği de öğrenin.',
    keywords: ['düzen', 'sorumluluk', 'güven', 'istikrar'],
    context:
      'Beklerken düzen kurmak faydalı. Ama katılık yerine dengeli yaklaşın.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos2',
    card: 'The Hierophant',
    position: 2,
    upright:
      'Değerlerinizi ve inançlarınızı güçlendirin. Beklerken doğru rehberlik ve bilgi size yön verir.',
    reversed:
      'Körü körüne geleneklere bağlılık sizi sınırlandırabilir. Kendi değerlerinizi netleştirin.',
    keywords: ['değerler', 'inanç', 'rehberlik', 'öğrenme'],
    context:
      'Beklerken değerlerinizi netleştirmek faydalı. Bu eşleşmenizi kolaylaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos2',
    card: 'The Lovers',
    position: 2,
    upright:
      'Beklerken kendi seçimlerinizi ve değerlerinizi gözden geçirin. Kalbiniz net olduğunda doğru kişi gelir.',
    reversed:
      'Kararsızlık ve ikilem süreci uzatabilir. Öncelikle kendi içinizde seçim yapın.',
    keywords: ['seçim', 'değer', 'uyum', 'karar'],
    context:
      'Beklerken seçimlerinizi netleştirin. Bu sizi doğru bağa hazırlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos2',
    card: 'The Chariot',
    position: 2,
    upright:
      'Hedeflerinizi netleştirin ve kararlılıkla ilerleyin. Disiplinli yöneliş sizi güçlü kılar.',
    reversed:
      'Acelecilik ya da yönsüzlük süreci zorlaştırır. Önceliklerinizi düzenleyin.',
    keywords: ['hedef', 'kontrol', 'kararlılık', 'ilerleme'],
    context:
      'Beklerken hedeflerinizi belirlemek faydalı. Kararlılık sizi hazırlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos2',
    card: 'Strength',
    position: 2,
    upright:
      'Sabır ve şefkatle kendinizi geliştirin. İçsel gücünüz sizi eşe hazırlayacak.',
    reversed:
      'Öfke ya da sabırsızlık süreci zorlaştırabilir. Yumuşak yaklaşımı seçin.',
    keywords: ['sabır', 'şefkat', 'içsel güç', 'cesaret'],
    context:
      'Beklerken şefkat ve sabır önemlidir. Bu süreç sizi olgunlaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos2',
    card: 'The Hermit',
    position: 2,
    upright:
      'İçsel arayışınıza yönelin, kendinizi tanıyın. Yalnızlık bu süreçte rehberdir.',
    reversed: 'Aşırı izolasyon süreci zorlaştırır. Dengeyi bulmak önemlidir.',
    keywords: ['içsel arayış', 'yalnızlık', 'bilgelik', 'rehberlik'],
    context:
      'Beklerken kendinizi tanımak faydalı. Ama aşırı yalnızlaşmamaya dikkat edin.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos2',
    card: 'The Wheel of Fortune',
    position: 2,
    upright:
      'Hayatın döngülerini kabul edin. Beklerken değişim ve fırsatlara açık olun.',
    reversed: 'Değişime direnç göstermek sizi zorlayabilir. Akışa güvenin.',
    keywords: ['döngü', 'değişim', 'akış', 'kabul'],
    context:
      'Beklerken akışa uyum sağlamak faydalı. Direnç yerine kabullenmek gerekir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos2',
    card: 'Justice',
    position: 2,
    upright:
      'Kendi adalet duygunuzu ve dürüstlüğünüzü geliştirin. Beklerken doğru seçimler önemlidir.',
    reversed:
      'Haksızlık duygusu veya içsel çelişki süreci uzatabilir. Tarafsız olun.',
    keywords: ['adalet', 'dürüstlük', 'denge', 'seçim'],
    context:
      'Beklerken dürüstlük ve denge önemlidir. Bu sizi daha uyumlu kılar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos2',
    card: 'The Hanged Man',
    position: 2,
    upright:
      'Beklerken bakış açınızı değiştirin. Teslimiyet size yeni farkındalıklar getirir.',
    reversed: 'Aşırı bekleyiş ya da tıkanıklık süreci zorlaştırır. Esnek olun.',
    keywords: ['perspektif', 'teslimiyet', 'farkındalık', 'bekleme'],
    context:
      'Beklerken farklı açılardan görmek faydalı. Teslimiyet huzur getirir.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos2',
    card: 'Death',
    position: 2,
    upright:
      'Beklerken eski bağları ve alışkanlıkları bırakın. Yenilenme sizi doğru eşe hazırlar.',
    reversed: 'Geçmişe takılı kalmak süreci zorlaştırır. Değişime izin verin.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'bırakma'],
    context: 'Beklerken geçmişi bırakmak faydalı. Bu sizi yeniye hazırlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos2',
    card: 'Temperance',
    position: 2,
    upright:
      'Dengenizi bulun, ölçülü olun. Beklerken sabır ve uyum sizi güçlendirir.',
    reversed:
      'Aşırılıklar ya da dengesizlik süreci zorlaştırır. Orta yolu seçin.',
    keywords: ['denge', 'sabır', 'uyum', 'ölçülülük'],
    context: 'Beklerken uyumlu ve ölçülü olmak faydalı. Bu sizi huzurlu kılar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos2',
    card: 'The Devil',
    position: 2,
    upright:
      'Bağımlılıklardan ve aşırı tutkulardan özgürleşin. Beklerken özgür iradenizi güçlendirin.',
    reversed:
      'Zincirlenmiş hisler ya da esaret süreci zorlaştırır. Kendi gücünüzü hatırlayın.',
    keywords: ['özgürlük', 'bağımlılık', 'gölge', 'tutku'],
    context: 'Beklerken özgürleşmek önemlidir. Bu sizi sağlıklı bağa hazırlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos2',
    card: 'The Tower',
    position: 2,
    upright:
      'Beklerken yanlış temelleri yıkın. Sarsıntılar sizi daha sağlam bir eşleşmeye hazırlar.',
    reversed: 'Gerçeklerle yüzleşmemek süreci zorlaştırır. Yıkımı ertelemeyin.',
    keywords: ['yıkım', 'hakikat', 'yeniden inşa', 'farkındalık'],
    context:
      'Beklerken yanlışları bırakmak faydalı. Bu sizi doğru temele hazırlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos2',
    card: 'The Star',
    position: 2,
    upright:
      'Beklerken umut ve inançla ilerleyin. İçsel şifa sizi eşe hazırlar.',
    reversed: 'Umutsuzluk süreci zorlaştırır. İnancınızı canlı tutun.',
    keywords: ['umut', 'şifa', 'inanç', 'yenilenme'],
    context: 'Beklerken umutlu olmak faydalı. Şifa süreci sizi güçlendirir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos2',
    card: 'The Moon',
    position: 2,
    upright:
      'Beklerken sezgilerinize güvenin, korkularla yüzleşin. Sis dağılınca yol netleşir.',
    reversed:
      'Yanılgılar ya da hayallerde kaybolmak süreci zorlaştırır. Netliği arayın.',
    keywords: ['sezgi', 'korku', 'belirsizlik', 'aydınlanma'],
    context: 'Beklerken sezgilere güvenmek faydalı. Belirsizlik geçicidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos2',
    card: 'The Sun',
    position: 2,
    upright:
      'Beklerken hayatın keyfini çıkarın, neşenizi büyütün. Pozitif enerji sizi eşe çeker.',
    reversed:
      'Aşırı karamsarlık ya da sahte neşe süreci zorlaştırır. Gerçek mutluluğa odaklanın.',
    keywords: ['neşe', 'mutluluk', 'pozitiflik', 'aydınlık'],
    context:
      'Beklerken neşeli olmak faydalı. Pozitif enerji sizi eşinize yaklaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos2',
    card: 'Judgement',
    position: 2,
    upright:
      'Geçmişle yüzleşin, derslerinizi çıkarın. Beklerken kendinizi yenilemek önemlidir.',
    reversed:
      'Kendi hatalarınızı reddetmek süreci zorlaştırır. Kabul ve affedişle ilerleyin.',
    keywords: ['yüzleşme', 'yenilenme', 'affediş', 'karar'],
    context: 'Beklerken geçmişten öğrenmek faydalı. Affediş sizi hafifletir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos2',
    card: 'The World',
    position: 2,
    upright:
      'Beklerken tamamlanmamış işleri bitirin. Döngüleri kapatmak sizi yeni aşamaya hazırlar.',
    reversed: 'Eksik kalanlar süreci zorlaştırır. Tamamlamaya odaklanın.',
    keywords: ['tamamlanma', 'bütünlük', 'döngü', 'başarı'],
    context: 'Beklerken döngüleri kapatmak faydalı. Bu sizi yeniye hazırlar.',
    group: 'Majör Arkana',
  },
  // KUPALAR (14)
  {
    id: 'ace_of_cups_ma_pos2',
    card: 'Ace of Cups',
    position: 2,
    upright:
      'Beklerken kalbinizi açın, duygularınızı ifade edin. İçsel sevgi akışı sizi eşe hazırlar.',
    reversed:
      'Bastırılmış duygular ya da korkular süreci zorlaştırır. Kalbinizi nazikçe açın.',
    keywords: ['sevgi', 'başlangıç', 'duygu', 'ifade'],
    context: 'Beklerken kalbinizi açmak ve duyguları ifade etmek faydalı olur.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ma_pos2',
    card: 'Two of Cups',
    position: 2,
    upright:
      'Kendi içinizde dengeyi bulun ve uyumlu bağlara açık olun. Beklerken ilişki becerilerinizi geliştirin.',
    reversed:
      'Uyumsuz bağlar ya da bağımlılıklar süreci yavaşlatır. Eşit ilişkileri seçin.',
    keywords: ['uyum', 'denge', 'bağ', 'eşitlik'],
    context: 'Beklerken sağlıklı bağ kurma becerisi önemlidir.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ma_pos2',
    card: 'Three of Cups',
    position: 2,
    upright:
      'Arkadaşlıklarınıza değer verin, sosyal çevrenizi besleyin. Beklerken bu destek alanı sizi güçlendirir.',
    reversed:
      'Aşırı yüzeysellik ya da sosyal yorgunluk süreci zorlaştırır. Samimi bağlara yönelin.',
    keywords: ['arkadaşlık', 'kutlama', 'paylaşım', 'topluluk'],
    context: 'Beklerken dostluklarınızı beslemek sizi hazırlar.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ma_pos2',
    card: 'Four of Cups',
    position: 2,
    upright:
      'Kendi duygularınızı gözden geçirin, tatminsizliğinizi fark edin. Beklerken şükür bilinci geliştirin.',
    reversed:
      'Yeni fırsatlara açılmak sizi canlandırır. Rutine sıkışmaktan çıkın.',
    keywords: ['tatminsizlik', 'farkındalık', 'şükür', 'yenilenme'],
    context: 'Beklerken şükür bilinci ve yeniliklere açıklık faydalı olur.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ma_pos2',
    card: 'Five of Cups',
    position: 2,
    upright:
      'Geçmiş kayıplardan ders çıkarın. Beklerken elde kalanlara odaklanın.',
    reversed:
      'Umuda yeniden dönmek zamanı geldi. Yas yerini iyileşmeye bırakıyor.',
    keywords: ['kayıp', 'yas', 'şifa', 'umut'],
    context:
      'Beklerken geçmişi kabullenmek ve umudu canlı tutmak faydalı olur.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ma_pos2',
    card: 'Six of Cups',
    position: 2,
    upright:
      'İç çocuğunuzla bağ kurun. Beklerken masumiyet ve neşeyi canlandırın.',
    reversed:
      'Geçmişte kalmak süreci tıkar. Anıları onurlandırıp bugüne odaklanın.',
    keywords: ['iç çocuk', 'neşe', 'nostalji', 'şefkat'],
    context: 'Beklerken iç çocuğu onurlandırmak kalbi yumuşatır.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ma_pos2',
    card: 'Seven of Cups',
    position: 2,
    upright:
      'Hayallerinizi netleştirin, seçimlerinizi bilinçli yapın. Beklerken vizyonunuzu belirleyin.',
    reversed: 'Hayal ile gerçek arasındaki dengeyi bulun. Dağılmaktan kaçının.',
    keywords: ['hayal', 'seçim', 'vizyon', 'gerçeklik'],
    context: 'Beklerken vizyonunuzu netleştirmek faydalı olur.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ma_pos2',
    card: 'Eight of Cups',
    position: 2,
    upright:
      'Artık sizi beslemeyen şeyleri bırakın. Beklerken anlamlı olana yönelin.',
    reversed: 'Gitmek-kalmak ikilemini çözün. Cesur kararlar ilerletir.',
    keywords: ['ayrılış', 'anlam', 'cesaret', 'yeni yol'],
    context: 'Beklerken anlamlı olana yönelmek faydalı olur.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ma_pos2',
    card: 'Nine of Cups',
    position: 2,
    upright:
      'Kendi mutluluğunuzu ve tatmininizi büyütün. Beklerken şükür ve keyif önemlidir.',
    reversed: 'Yüzeysel tatminler yerine kalıcı mutluluğa odaklanın.',
    keywords: ['mutluluk', 'tatmin', 'şükür', 'bolluk'],
    context: 'Beklerken kendi mutluluğunuzu yaratmak faydalı olur.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ma_pos2',
    card: 'Ten of Cups',
    position: 2,
    upright:
      'Aile ve sevdiklerinizle uyumu besleyin. Beklerken birlik duygusunu geliştirin.',
    reversed:
      'Aşırı idealizm hayal kırıklığı yaratabilir. Gerçekçi uyumu seçin.',
    keywords: ['aile', 'uyum', 'birlik', 'huzur'],
    context: 'Beklerken birlik duygusunu geliştirmek faydalı olur.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ma_pos2',
    card: 'Page of Cups',
    position: 2,
    upright:
      'Yaratıcı sezginizi geliştirin, kalbinizi oyunla açın. Beklerken hayallerinizi besleyin.',
    reversed: 'Aşırı hassasiyet süreci zorlaştırır. Gerçeklikle dengede olun.',
    keywords: ['yaratıcılık', 'sezgi', 'oyun', 'ifade'],
    context: 'Beklerken yaratıcılık ve merak kalbi açar.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ma_pos2',
    card: 'Knight of Cups',
    position: 2,
    upright:
      'Hayallerinizi harekete geçirin. Beklerken duygusal cesaretle ilerleyin.',
    reversed: 'Tutarsızlık ya da aşırı idealizm süreci zorlaştırır. Net olun.',
    keywords: ['hareket', 'hayal', 'cesaret', 'duygu'],
    context: 'Beklerken duygusal cesaret faydalı olur.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ma_pos2',
    card: 'Queen of Cups',
    position: 2,
    upright:
      'Empatinizi ve sezgilerinizi güçlendirin. Beklerken içsel şefkati büyütün.',
    reversed:
      'Sınır erimesi ya da duygusal taşma süreci zorlaştırır. Dengede kalın.',
    keywords: ['empati', 'sezgi', 'şefkat', 'denge'],
    context: 'Beklerken empati ve şefkat faydalı olur.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ma_pos2',
    card: 'King of Cups',
    position: 2,
    upright:
      'Duygusal olgunluk kazanın. Beklerken sakinlik ve anlayış size güç verir.',
    reversed:
      'Bastırılmış duygular ya da pasiflik süreci zorlaştırır. Açık olun.',
    keywords: ['olgunluk', 'sakinlik', 'duygu', 'liderlik'],
    context: 'Beklerken duygusal olgunluk faydalı olur.',
    group: 'Kupalar',
  },

  // KILIÇLAR (14)
  {
    id: 'ace_of_swords_ma_pos2',
    card: 'Ace of Swords',
    position: 2,
    upright:
      'Zihinsel netlik kazanın, gerçekleri görün. Beklerken doğru kararlar verin.',
    reversed:
      'Bulanıklık ya da aşırı analiz süreci zorlaştırır. Basitlik arayın.',
    keywords: ['netlik', 'hakikat', 'karar', 'zihin'],
    context: 'Beklerken net düşünmek faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ma_pos2',
    card: 'Two of Swords',
    position: 2,
    upright:
      'Kararsızlık yerine denge arayın. Beklerken kalbinizi de dinleyin.',
    reversed: 'Kaçınılan karar süreci tıkar. Yüzleşmek gerekir.',
    keywords: ['karar', 'ikilem', 'denge', 'seçim'],
    context: 'Beklerken kararlılık önemlidir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ma_pos2',
    card: 'Three of Swords',
    position: 2,
    upright: 'Geçmiş kırgınlıklarla yüzleşin. Beklerken kalbinizi iyileştirin.',
    reversed: 'Acının içinde kalmak süreci zorlaştırır. Affediş yol açar.',
    keywords: ['kırgınlık', 'yas', 'affediş', 'şifa'],
    context: 'Beklerken kalp yaralarını iyileştirmek faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ma_pos2',
    card: 'Four of Swords',
    position: 2,
    upright: 'Dinlenin, zihninizi toparlayın. Beklerken içsel sakinlik bulun.',
    reversed: 'Dinlenmeyi reddetmek tükenmeye yol açar. Molalara izin verin.',
    keywords: ['dinlenme', 'toparlanma', 'sükunet', 'iyileşme'],
    context: 'Beklerken dinlenmek faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ma_pos2',
    card: 'Five of Swords',
    position: 2,
    upright: 'Egonuzu dizginleyin. Beklerken uzlaşmacı olmayı öğrenin.',
    reversed:
      'Geçmiş çatışmalara tutunmak süreci zorlaştırır. Onarım yolunu seçin.',
    keywords: ['çatışma', 'ego', 'uzlaşma', 'onarım'],
    context: 'Beklerken uzlaşmayı öğrenmek faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ma_pos2',
    card: 'Six of Swords',
    position: 2,
    upright: 'Geçmişi geride bırakın. Beklerken sakin sulara yönelin.',
    reversed: 'Geçmiş bağlar sizi geri çekebilir. Onları çözün.',
    keywords: ['geçiş', 'sakinlik', 'ilerleme', 'bırakma'],
    context: 'Beklerken geçmişi bırakmak faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ma_pos2',
    card: 'Seven of Swords',
    position: 2,
    upright:
      'Kendi stratejinizi geliştirin. Beklerken dürüstlüğü elden bırakmayın.',
    reversed: 'Kendi kendini kandırmak süreci zorlaştırır. Açık olun.',
    keywords: ['strateji', 'dürüstlük', 'plan', 'netlik'],
    context: 'Beklerken dürüst strateji faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ma_pos2',
    card: 'Eight of Swords',
    position: 2,
    upright:
      'Kendi zihinsel engellerinizle yüzleşin. Beklerken özgürlüğünüzü keşfedin.',
    reversed: 'Kendi korkularınızı aşmak gerekir. Cesaret faydalıdır.',
    keywords: ['engeller', 'özgürlük', 'korku', 'cesaret'],
    context: 'Beklerken korkuları aşmak faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ma_pos2',
    card: 'Nine of Swords',
    position: 2,
    upright:
      'Kaygılarınızı fark edin, çözüm yolları arayın. Beklerken zihninizi sakinleştirin.',
    reversed: 'Felaketleştirme süreci zorlaştırır. Gerçeklere odaklanın.',
    keywords: ['kaygı', 'korku', 'zihin', 'gerçeklik'],
    context: 'Beklerken kaygıyı aşmak faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ma_pos2',
    card: 'Ten of Swords',
    position: 2,
    upright: 'Bir döngüyü kapatın. Beklerken yeni başlangıçlara hazırlanın.',
    reversed: 'Geçmişin yükünü bırakın. Yenilenme yakındır.',
    keywords: ['bitiş', 'yenilenme', 'kapanış', 'başlangıç'],
    context: 'Beklerken bitişleri kabullenmek faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ma_pos2',
    card: 'Page of Swords',
    position: 2,
    upright:
      'Yeni şeyler öğrenin, merakınızı besleyin. Beklerken bilgi size güç verir.',
    reversed:
      'Dedikodu ya da dağınık bilgi süreci zorlaştırır. Doğru kaynağa yönelin.',
    keywords: ['öğrenme', 'merak', 'bilgi', 'gözlem'],
    context: 'Beklerken öğrenmek faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ma_pos2',
    card: 'Knight of Swords',
    position: 2,
    upright: 'Hedeflerinize hızla ilerleyin. Beklerken kararlılıkla adım atın.',
    reversed: 'Acelecilik ya da öfke süreci zorlaştırır. Dengeli hız bulun.',
    keywords: ['hedef', 'hız', 'karar', 'azim'],
    context: 'Beklerken kararlılık faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ma_pos2',
    card: 'Queen of Swords',
    position: 2,
    upright: 'Mantık ve objektiflik kazanın. Beklerken netlik önemlidir.',
    reversed: 'Aşırı eleştirellik süreci zorlaştırır. Şefkatle dengeleyin.',
    keywords: ['netlik', 'mantık', 'objektiflik', 'adalet'],
    context: 'Beklerken mantıklı olmak faydalı olur.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ma_pos2',
    card: 'King of Swords',
    position: 2,
    upright:
      'Bilgi ve stratejiyle ilerleyin. Beklerken ilkelerinizle hareket edin.',
    reversed: 'Katı dogmalar süreci zorlaştırır. Esnek olun.',
    keywords: ['bilgi', 'strateji', 'ilke', 'otorite'],
    context: 'Beklerken bilgeliği artırmak faydalı olur.',
    group: 'Kılıçlar',
  },

  // ASALAR (14)
  {
    id: 'ace_of_wands_ma_pos2',
    card: 'Ace of Wands',
    position: 2,
    upright:
      'Yeni projeler başlatın, yaratıcı enerjinizi kullanın. Beklerken tutkunuzu canlandırın.',
    reversed:
      'Enerji düşüklüğü ya da motivasyon eksikliği süreci zorlaştırır. İlham arayın.',
    keywords: ['yaratıcılık', 'tutku', 'başlangıç', 'enerji'],
    context: 'Beklerken yaratıcı enerjiyi kullanmak faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ma_pos2',
    card: 'Two of Wands',
    position: 2,
    upright:
      'Planlarınızı yapın, geleceğe odaklanın. Beklerken vizyonunuzu genişletin.',
    reversed: 'Kararsızlık ya da korku süreci zorlaştırır. Cesaret gösterin.',
    keywords: ['planlama', 'vizyon', 'cesaret', 'gelecek'],
    context: 'Beklerken gelecek planları yapmak faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ma_pos2',
    card: 'Three of Wands',
    position: 2,
    upright: 'Geniş düşünün, uzak hedefler koyun. Beklerken sabırla bekleyin.',
    reversed:
      'Sabırsızlık ya da dar görüşlülük süreci zorlaştırır. Geniş perspektif alın.',
    keywords: ['genişlik', 'hedef', 'sabır', 'perspektif'],
    context: 'Beklerken geniş düşünmek faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ma_pos2',
    card: 'Four of Wands',
    position: 2,
    upright:
      'Başarılarınızı kutlayın, sosyal bağlarınızı güçlendirin. Beklerken topluluk içinde olun.',
    reversed:
      'Aşırı sosyallik ya da yalnızlık süreci zorlaştırır. Dengeyi bulun.',
    keywords: ['kutlama', 'başarı', 'topluluk', 'sosyallik'],
    context: 'Beklerken sosyal bağları güçlendirmek faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ma_pos2',
    card: 'Five of Wands',
    position: 2,
    upright:
      'Rekabeti sağlıklı tutun, çatışmaları çözün. Beklerken uyumlu rekabet öğrenin.',
    reversed:
      'Aşırı rekabet ya da çatışma süreci zorlaştırır. İşbirliğini seçin.',
    keywords: ['rekabet', 'çatışma', 'uyum', 'çözüm'],
    context: 'Beklerken sağlıklı rekabet öğrenmek faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ma_pos2',
    card: 'Six of Wands',
    position: 2,
    upright:
      'Başarılarınızı onurlandırın, güven kazanın. Beklerken kendinizi değerli görün.',
    reversed:
      'Aşırı gurur ya da başarısızlık korkusu süreci zorlaştırır. Mütevazı olun.',
    keywords: ['başarı', 'güven', 'onur', 'değer'],
    context: 'Beklerken başarıları onurlandırmak faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ma_pos2',
    card: 'Seven of Wands',
    position: 2,
    upright:
      'Pozisyonunuzu savunun, inançlarınızı koruyun. Beklerken güçlü durun.',
    reversed:
      'Aşırı savunma ya da çekingenlik süreci zorlaştırır. Dengeli savunma yapın.',
    keywords: ['savunma', 'pozisyon', 'inanç', 'güç'],
    context: 'Beklerken pozisyonunuzu savunmak faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ma_pos2',
    card: 'Eight of Wands',
    position: 2,
    upright:
      'Hızla hareket edin, fırsatları yakalayın. Beklerken momentumu koruyun.',
    reversed:
      'Acelecilik ya da durgunluk süreci zorlaştırır. Dengeli hız bulun.',
    keywords: ['hız', 'fırsat', 'momentum', 'hareket'],
    context: 'Beklerken hızlı ve kararlı olmak faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ma_pos2',
    card: 'Nine of Wands',
    position: 2,
    upright:
      'Dayanıklılığınızı test edin, son gücünüzle durun. Beklerken sabırlı olun.',
    reversed:
      'Tükenmişlik ya da erken vazgeçme süreci zorlaştırır. Gücünüzü koruyun.',
    keywords: ['dayanıklılık', 'sabır', 'güç', 'test'],
    context: 'Beklerken dayanıklılık göstermek faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ma_pos2',
    card: 'Ten of Wands',
    position: 2,
    upright:
      'Sorumluluklarınızı organize edin, yardım isteyin. Beklerken yükü paylaşın.',
    reversed:
      'Aşırı yüklenme ya da sorumluluk kaçınma süreci zorlaştırır. Dengeyi kurun.',
    keywords: ['sorumluluk', 'organizasyon', 'paylaşım', 'denge'],
    context: 'Beklerken sorumlulukları organize etmek faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ma_pos2',
    card: 'Page of Wands',
    position: 2,
    upright:
      'Yeni fikirler geliştirin, merakınızı besleyin. Beklerken öğrenmeye açık olun.',
    reversed:
      'Dağınıklık ya da motivasyon eksikliği süreci zorlaştırır. Odaklanın.',
    keywords: ['öğrenme', 'merak', 'fikir', 'yenilik'],
    context: 'Beklerken yeni şeyler öğrenmek faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ma_pos2',
    card: 'Knight of Wands',
    position: 2,
    upright:
      'Cesaretle hareket edin, maceraya açık olun. Beklerken enerjinizi yönlendirin.',
    reversed:
      'Acelecilik ya da dürtüsellik süreci zorlaştırır. Düşünceli hareket edin.',
    keywords: ['cesaret', 'macera', 'enerji', 'hareket'],
    context: 'Beklerken cesur olmak faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ma_pos2',
    card: 'Queen of Wands',
    position: 2,
    upright:
      'Özgüveninizi artırın, liderlik edin. Beklerken kendinizi ifade edin.',
    reversed:
      'Aşırı baskınlık ya da güven eksikliği süreci zorlaştırır. Dengeli güç gösterin.',
    keywords: ['özgüven', 'liderlik', 'ifade', 'güç'],
    context: 'Beklerken özgüven artırmak faydalı olur.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ma_pos2',
    card: 'King of Wands',
    position: 2,
    upright:
      'Vizyoner liderlik gösterin, büyük düşünün. Beklerken ilham verin.',
    reversed:
      'Aşırı otoriterlik ya da durgunluk süreci zorlaştırır. İlham verici olun.',
    keywords: ['vizyon', 'liderlik', 'ilham', 'büyük düşünce'],
    context: 'Beklerken vizyoner liderlik göstermek faydalı olur.',
    group: 'Asalar',
  },

  // TILSIMLAR (14)
  {
    id: 'ace_of_pentacles_ma_pos2',
    card: 'Ace of Pentacles',
    position: 2,
    upright: 'Maddi fırsatları değerlendirin. Beklerken sağlam temel kurun.',
    reversed: 'Kaçırılan fırsatlar süreci yavaşlatır. Odaklı olun.',
    keywords: ['fırsat', 'temel', 'maddi güven', 'başlangıç'],
    context: 'Beklerken temel oluşturmak faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ma_pos2',
    card: 'Two of Pentacles',
    position: 2,
    upright: 'Zaman ve enerji yönetimini öğrenin. Beklerken esnek kalın.',
    reversed: 'Aşırı dağınıklık süreci zorlaştırır. Öncelik belirleyin.',
    keywords: ['denge', 'zaman', 'esneklik', 'öncelik'],
    context: 'Beklerken dengeli olmak faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ma_pos2',
    card: 'Three of Pentacles',
    position: 2,
    upright:
      'İşbirliği ve yakın çevrelerle ilişkilerinizi geliştirin. Beklerken projelerinize odaklanın.',
    reversed:
      'Aşırı yalnızlık süreci zorlaştırır. İnsan ilişkilerine odaklanın.',
    keywords: ['işbirliği', 'yakın çevre', 'projeler', 'ilişkiler'],
    context: 'Beklerken işbirliği ve ilişkileri geliştirmek faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ma_pos2',
    card: 'Four of Pentacles',
    position: 2,
    upright:
      'Maddi güvenliğinizi sağlayın ama cimrilik yapmayın. Beklerken paylaşımı da öğrenin.',
    reversed:
      'Aşırı cimrilik ya da savurganlık süreci zorlaştırır. Dengeli harcama yapın.',
    keywords: ['güvenlik', 'tutumluluk', 'paylaşım', 'denge'],
    context: 'Beklerken maddi dengeyi kurmak faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ma_pos2',
    card: 'Five of Pentacles',
    position: 2,
    upright:
      'Zorluklar karşısında dayanıklılığınızı artırın. Beklerken yardım almaktan çekinmeyin.',
    reversed: 'Yardım reddetmek süreci zorlaştırır. Destek kabul edin.',
    keywords: ['dayanıklılık', 'zorluk', 'yardım', 'destek'],
    context: 'Beklerken dayanıklılık ve yardım alma faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ma_pos2',
    card: 'Six of Pentacles',
    position: 2,
    upright:
      'Cömertliği öğrenin, hem almayı hem vermeyi bilin. Beklerken dengeyi kurun.',
    reversed: 'Dengesiz paylaşım süreci zorlaştırır. Adil olun.',
    keywords: ['cömertlik', 'paylaşım', 'denge', 'adalet'],
    context: 'Beklerken cömertlik ve adil paylaşım faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ma_pos2',
    card: 'Seven of Pentacles',
    position: 2,
    upright:
      'Sabırla çalışın, uzun vadeli düşünün. Beklerken emeklerinizin meyvesini bekleyin.',
    reversed:
      'Sabırsızlık ya da erken vazgeçme süreci zorlaştırır. İnatçı olun.',
    keywords: ['sabır', 'emek', 'uzun vadeli', 'bekleme'],
    context: 'Beklerken sabır ve uzun vadeli düşünmek faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ma_pos2',
    card: 'Eight of Pentacles',
    position: 2,
    upright:
      'Yeteneklerinizi geliştirin, ustalık kazanın. Beklerken kendinizi eğitin.',
    reversed:
      'Mükemmeliyetçilik ya da yetersizlik hissi süreci zorlaştırır. Gelişime odaklanın.',
    keywords: ['ustalık', 'beceri', 'öğrenme', 'gelişim'],
    context: 'Beklerken yetenek geliştirmek faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ma_pos2',
    card: 'Nine of Pentacles',
    position: 2,
    upright:
      'Bağımsızlığınızı ve öz değerinizi geliştirin. Beklerken kendinizi güçlendirin.',
    reversed:
      'Bağımlılık ya da öz değer eksikliği süreci zorlaştırır. Özgüven kazanın.',
    keywords: ['bağımsızlık', 'öz değer', 'güven', 'tatmin'],
    context: 'Beklerken bağımsızlık ve öz değer faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ma_pos2',
    card: 'Ten of Pentacles',
    position: 2,
    upright:
      'Aile ve miras değerlerinizi güçlendirin. Beklerken köklerinizi besleyin.',
    reversed:
      'Maddi kaygılar ya da aile sorunları süreci zorlaştırır. Uyumu sağlayın.',
    keywords: ['aile', 'miras', 'köklülük', 'güvenlik'],
    context: 'Beklerken aile bağlarını güçlendirmek faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ma_pos2',
    card: 'Page of Pentacles',
    position: 2,
    upright:
      'Yeni fırsatları değerlendirin, pratik adımlar atın. Beklerken öğrenmeye açık olun.',
    reversed: 'Erteleme ya da dağınıklık süreci zorlaştırır. Odaklanın.',
    keywords: ['fırsat', 'pratiklik', 'öğrenme', 'başlangıç'],
    context: 'Beklerken yeni fırsatları değerlendirmek faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ma_pos2',
    card: 'Knight of Pentacles',
    position: 2,
    upright:
      'Kararlılıkla ve sabırla ilerleyin. Beklerken güvenilirliğinizi artırın.',
    reversed: 'İnertlik ya da aşırı yavaşlık süreci zorlaştırır. Hareket edin.',
    keywords: ['kararlılık', 'güvenilirlik', 'sabır', 'sorumluluk'],
    context: 'Beklerken kararlılık ve güvenilirlik faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ma_pos2',
    card: 'Queen of Pentacles',
    position: 2,
    upright:
      'Pratik şefkat ve besleyicilik gösterin. Beklerken hem maddi hem manevi zenginlik yaratın.',
    reversed: 'Aşırı kaygı ya da materyalizm süreci zorlaştırır. Dengeli olun.',
    keywords: ['şefkat', 'pratiklik', 'besleyicilik', 'zenginlik'],
    context: 'Beklerken pratik şefkat göstermek faydalı olur.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ma_pos2',
    card: 'King of Pentacles',
    position: 2,
    upright:
      'Maddi istikrar ve güvenilirlik sağlayın. Beklerken sağlam temeller kurun.',
    reversed:
      'Aşırı muhafazakarlık ya da cimrilik süreci zorlaştırır. Esnek olun.',
    keywords: ['istikrar', 'güvenilirlik', 'liderlik', 'maddi güven'],
    context: 'Beklerken maddi istikrar kurmak faydalı olur.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 2 anlamını bulma fonksiyonu
export const getposition2Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return position2Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getmarriageposition2Meaning = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  return getposition2Meaning(cardName);
};

// Kart adına göre pozisyon 2 anlamını bulma fonksiyonu (ana index için)
export const getmarriageposition2MeaningByCardName = (
  cardName: string
): MarriagePositionMeaning | undefined => {
  const meaning = getposition2Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 2 anlamlarını alma fonksiyonu
export const getAllposition2Meanings = (): MarriagePositionMeaning[] => {
  return position2Meanings;
};

// pozisyon 2 anlamlarını filtreleme fonksiyonu
export const getposition2MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): MarriagePositionMeaning[] => {
  return position2Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 2 anlamlarını arama
export const searchposition2MeaningsByKeyword = (
  keyword: string
): MarriagePositionMeaning[] => {
  return position2Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position2Meanings,
  getposition2Meaning,
  getAllposition2Meanings,
  getposition2MeaningsByGroup,
  searchposition2MeaningsByKeyword,
};
