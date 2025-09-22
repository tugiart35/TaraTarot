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

import { RelationshipAnalysisPositionMeaning } from './position-meanings-index';

// 5. Pozisyon (Dış Etkenler) - 78 Tarot kartı
export const position5Meanings: RelationshipAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
    {
      id: 'the_fool_ra_pos5',
      card: 'The Fool',
      position: 5,
      upright:
        'Deli, yolunun taze bir başlangıçla açıldığını fısıldıyor. Merakını pusula yap, küçük de olsa cesur bir adım yeni bir maceranın kapısını aralayacak.',
      reversed:
        'Ters Deli, aceleyle atılan adımların kalbini yoracağını hatırlatıyor. Önce yönünü netleştir, niyetini berraklaştır, sonra hareket et.',
      keywords: ['yenilik', 'cesaret', 'merak', 'akış', 'denge'],
      context:
        'Yol haritan; taze adımlar ve merakla ilerlemek. Cesaret, ufak hareketlerle büyüyecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_magician_ra_pos5',
      card: 'The Magician',
      position: 5,
      upright:
        'Büyücü, sana yolun niyetlerini berraklaştırmaktan geçtiğini söylüyor. Sözünle eylemini hizaladığında, önünde yeni kapılar açılacak.',
      reversed:
        'Ters Büyücü, bulanık vaatlerin ya da maskeli yaklaşımların yolunu tıkadığını hatırlatıyor. Şeffaflıkla ilerlediğinde dönüşüm başlayacak.',
      keywords: ['niyet', 'ifade', 'yaratım', 'netlik', 'güven'],
      context:
        'Yol haritan; açık niyetler ve küçük somut adımlar. Netlik ilişkini güçlendirecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_high_priestess_ra_pos5',
      card: 'The High Priestess',
      position: 5,
      upright:
        'Başrahibe, sezgini pusula yapmanı öğütlüyor. Sessizlikten gelen işaretlere güven, zamanı gelince yumuşakça paylaş.',
      reversed:
        'Ters Başrahibe, aşırı gizlenmenin seni duvardan duvara sıkıştırabileceğini söylüyor. Kalbinle güvenli alanlar seçerek kademeli açıklıklar yarat.',
      keywords: ['sezgi', 'bilgelik', 'giz', 'paylaşım', 'denge'],
      context:
        'Yol haritan; iç sesini onurlandırırken köprü kurmak. Sessizlik ve açıklık dengede buluşacak.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_empress_ra_pos5',
      card: 'The Empress',
      position: 5,
      upright:
        'İmparatoriçe, önce kendini beslemeni ve sevgiyle köklenecek alanlar açmanı öneriyor. Şefkat ve öz bakım, yolunu bereketle dolduracak.',
      reversed:
        'Ters İmparatoriçe, aşırı sahiplenme ya da tükenmenin yolunu tıkadığını anlatıyor. Paylaşımı dengede tut, nefeslen ve kendine dön.',
      keywords: ['şefkat', 'bolluk', 'öz bakım', 'besleme', 'denge'],
      context:
        'Yol haritan; öz bakımı hatırlamak. Kalbin doldukça paylaşımın güçlenecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_emperor_ra_pos5',
      card: 'The Emperor',
      position: 5,
      upright:
        'İmparator, yolunun güven veren sınırlar ve dengeli bir düzenle açılacağını söylüyor. Yapı kur, ama kalbini sertleştirme.',
      reversed:
        'Ters İmparator, fazla katılığın sıcaklığı gölgelediğini fısıldıyor. Esneklik ve yumuşaklıkla yol daha akışkan olacak.',
      keywords: ['sınır', 'düzen', 'güven', 'istikrar', 'esneklik'],
      context:
        'Yol haritan; açık sınırlar ve adil iş bölümü. Güven, esneklikle birlikte akacak.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_hierophant_ra_pos5',
      card: 'The Hierophant',
      position: 5,
      upright:
        'Aziz, değerlerinle uyumlu ritüeller kurmanı öğütlüyor. Sadelik içinde kutsallık bulacaksın.',
      reversed:
        'Ters Aziz, kör gelenek ya da kör başkaldırının yolunu kapattığını söylüyor. Sana uyan ölçüyü seçerek ilerle.',
      keywords: ['değer', 'ritüel', 'uyum', 'rehberlik', 'özgünlük'],
      context:
        'Yol haritan; görünmeyeni görünür kılmak. Ortak kurallar güveni besleyecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_lovers_ra_pos5',
      card: 'The Lovers',
      position: 5,
      upright:
        'Aşıklar, yolunun net bir seçim yapıp değerlerinizde buluşmaktan geçtiğini söyler. Kalbinizle evet dediğiniz yerde uyum filizlenir.',
      reversed:
        'Ters Aşıklar, kararsızlığın seni yol ayrımında tuttuğunu söylüyor. Seçim, iyileşmenin kapısını açacak.',
      keywords: ['seçim', 'değer', 'uyum', 'karar', 'bağ'],
      context:
        'Yol haritan; ortak hedefte netleşmek. Küçük evetler bağı pekiştirecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_chariot_ra_pos5',
      card: 'The Chariot',
      position: 5,
      upright:
        'Savaş Arabası, yönünü netleştirip direksiyonu birlikte tutmanı öğütlüyor. Ortak rota sizi ileriye taşıyacak.',
      reversed:
        'Ters Savaş Arabası, savrulmaları ve dağınıklığı bırakman için çağırıyor. Önceliklerini sadeleştir, az ama öz ilerle.',
      keywords: ['yön', 'ivme', 'odak', 'disiplin', 'uyum'],
      context:
        'Yol haritan; ortak plan ve şeffaf rota. Aynı ritim bağınızı büyütecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'strength_ra_pos5',
      card: 'Strength',
      position: 5,
      upright:
        'Güç, yolunun nazik cesaret ve sabırla yürüneceğini söylüyor. Yumuşak ton, kapalı kapıları açacak.',
      reversed:
        'Ters Güç, sabırsızlığa kapıldığında bağın gerileceğini hatırlatıyor. Gurur yerine şefkat seni ileri taşıyacak.',
      keywords: ['şefkat', 'sabır', 'cesaret', 'naziklik', 'denge'],
      context:
        'Yol haritan; hızını düşürmek ve şefkatle yaklaşmak. Naziklik bağı güçlendirecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_hermit_ra_pos5',
      card: 'The Hermit',
      position: 5,
      upright:
        'Ermiş, yolunun iç sesine kulak vermekle başlayacağını söylüyor. Öğrendiklerini partnerinle paylaştığında ışık çoğalacak.',
      reversed:
        'Ters Ermiş, aşırı izolasyonun kalbi soğutacağını anlatıyor. Küçük açıklıklarla sıcaklığı geri çağır.',
      keywords: ['içe dönüş', 'bilgelik', 'paylaşım', 'alan', 'denge'],
      context:
        'Yol haritan; yalnızlık ve paylaşım arasında denge. İç ışığın yola rehber olacak.',
      group: 'Majör Arkana',
    },
    {
      id: 'wheel_of_fortune_ra_pos5',
      card: 'Wheel of Fortune',
      position: 5,
      upright:
        'Kader Çarkı, yolunun döngüleri fark etmekle açıldığını söylüyor. Kalıp bir tepkiyi değiştirmen, yeni bir akış başlatacak.',
      reversed:
        'Ters Çark, direnişi bırakmanı ve merakla yaklaşmanı öğütlüyor. Küçük bir değişim, büyük bir dönüşüm yaratır.',
      keywords: ['döngü', 'zamanlama', 'değişim', 'esneklik', 'akış'],
      context:
        'Yol haritan; kalıpları kırmak. Döngü farkındalığı huzur getirecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'justice_ra_pos5',
      card: 'Justice',
      position: 5,
      upright:
        'Adalet, yolunun şeffaflık ve adil paylaşım kurmaktan geçtiğini söylüyor. Net cümleler güven köprüsünü kuracak.',
      reversed:
        'Ters Adalet, çifte standartların ve suskunluğun bağa zarar verdiğini anlatıyor. Telafi ve eşitlik seni ileri taşıyacak.',
      keywords: ['adalet', 'denge', 'şeffaflık', 'telafi', 'sorumluluk'],
      context:
        'Yol haritan; net roller ve eşitlik. Adalet bağı iyileştirecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_hanged_man_ra_pos5',
      card: 'The Hanged Man',
      position: 5,
      upright:
        'Asılan Adam, yolunun bakış açını değiştirmekten geçtiğini söylüyor. Kısa bir duruş, yeni anlamlar açacak.',
      reversed:
        'Ters Asılan Adam, kurban bilinciyle kalmanın yolunu kapattığını anlatıyor. Gönüllü küçük fedalar bağı yumuşatacak.',
      keywords: ['perspektif', 'teslimiyet', 'feda', 'farkındalık', 'akış'],
      context:
        'Yol haritan; anlama öncelik vermek. Bekleyişi bilinçli kılmak huzur getirecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'death_ra_pos5',
      card: 'Death',
      position: 5,
      upright:
        'Ölüm, yolunun eskiyi onurlandırıp bırakmaktan geçtiğini söylüyor. Yenilenme, şefkatli vedadan doğacak.',
      reversed:
        'Ters Ölüm, direncin yükünü büyüttüğünü hatırlatıyor. Hafiflik ve kabullenme seni yeniye taşıyacak.',
      keywords: ['dönüşüm', 'bırakma', 'yenilenme', 'kapanış', 'doğuş'],
      context:
        'Yol haritan; vedalarla açılan alan. Eskiyi bırakmak yeni nefes getirecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'temperance_ra_pos5',
      card: 'Temperance',
      position: 5,
      upright:
        'Denge, yolunun ölçülü adımlar ve uyumlu karışımlarla ilerleyeceğini söylüyor. Yavaş ve tutarlı bir ritim sana huzur verecek.',
      reversed:
        'Ters Denge, uçlarda savrulmanın yolunu tıkadığını anlatıyor. Ritmini küçült ve sadelikle ilerle.',
      keywords: ['denge', 'ölçü', 'sentez', 'sabır', 'şifa'],
      context:
        'Yol haritan; hızını kalbine uydurmak. Orta yol, çatışmayı çözecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_devil_ra_pos5',
      card: 'The Devil',
      position: 5,
      upright:
        'Şeytan, yolunun sınırlarını netleştirmekten geçtiğini söylüyor. Zinciri çöz, özgür iradeni hatırla.',
      reversed:
        'Ters Şeytan, bağımlılık ve oyunlardan çekilmeni öğütlüyor. Küçük bir hayır, büyük bir özgürlük getirecek.',
      keywords: ['sınır', 'özgürlük', 'gölge', 'tetik', 'farkındalık'],
      context:
        'Yol haritan; kontrol oyunlarından çekilmek. Şeffaflık gölgeleri eritecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_tower_ra_pos5',
      card: 'The Tower',
      position: 5,
      upright:
        'Kule, yolunun çürük taşları çekmekten geçtiğini söylüyor. Hakikati onurlandır, yeniden inşa sana güç verecek.',
      reversed:
        'Ters Kule, ertelenmiş patlamaları bilinçle boşaltmanı öğütlüyor. Kademeli söküp yeniden kurmak bağı sağlamlaştıracak.',
      keywords: ['hakikat', 'yıkım', 'arınma', 'temel', 'yeniden inşa'],
      context:
        'Yol haritan; sarsıntıyı fırsat görmek. Yeniden kurmak kalıcılık getirecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_star_ra_pos5',
      card: 'The Star',
      position: 5,
      upright:
        'Yıldız, yolunun umut ve sadelikle açıldığını söylüyor. Şeffaf bir niyet kalbine ferahlık verecek.',
      reversed:
        'Ters Yıldız, tükenmişliğin seni gölgelediğini hatırlatıyor. Küçük sevinçler ışığını geri çağıracak.',
      keywords: ['umut', 'şifa', 'sadelik', 'ilham', 'yenilenme'],
      context:
        'Yol haritan; az ama öz iyilikleri büyütmek. Umut, nazik tekrarlarla güçlenecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_moon_ra_pos5',
      card: 'The Moon',
      position: 5,
      upright:
        'Ay, yolunun sezgiyle ilerlemekten geçtiğini söylüyor. Sis, sabırlı sorularla dağılacak.',
      reversed:
        'Ters Ay, varsayımların yolunu kararttığını hatırlatıyor. Net sorular, güveni büyütecek.',
      keywords: ['sezgi', 'belirsizlik', 'korku', 'aydınlanma', 'netlik'],
      context:
        'Yol haritan; acele hüküm vermemek. Nazik sorular ışığı açacak.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_sun_ra_pos5',
      card: 'The Sun',
      position: 5,
      upright:
        'Güneş, yolunun otantik sevinçten geçtiğini söylüyor. İçten paylaşılan mutluluk bağı büyütecek.',
      reversed:
        'Ters Güneş, iyimiş gibi görünmenin seni uzaklaştırdığını anlatıyor. Gerçek sevinç, sahicilikten doğacak.',
      keywords: ['sevinç', 'otantiklik', 'netlik', 'paylaşım', 'görünürlük'],
      context:
        'Yol haritan; içtenliği büyütmek. Sahici mutluluk güveni ısıtacak.',
      group: 'Majör Arkana',
    },
    {
      id: 'judgement_ra_pos5',
      card: 'Judgement',
      position: 5,
      upright:
        'Mahkeme, yolunun geçmişle yüzleşip şefkatle kabullenmekten geçtiğini söylüyor. Affediş, yeni bir kapı açacak.',
      reversed:
        'Ters Mahkeme, aşırı öz yargının yolunu daralttığını anlatıyor. Merhamet ve sorumluluk birlikte yenilenme getirecek.',
      keywords: ['yüzleşme', 'affediş', 'yenilenme', 'çağrı', 'özgürleşme'],
      context:
        'Yol haritan; dosyaları kapatıp öğrenilmişi taşımak. Yeni sayfa, temiz niyet isteyecek.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_world_ra_pos5',
      card: 'The World',
      position: 5,
      upright:
        'Dünya, yolunun tamamlanma ve kutlamayla açıldığını söylüyor. Döngüyü kapat, emeğini onurlandır.',
      reversed:
        'Ters Dünya, eksik kalan uçların seni yorduğunu anlatıyor. Yarım kalan parçaları tamamladığında huzur bulacaksın.',
      keywords: ['tamamlanma', 'bütünlük', 'entegrasyon', 'kutlama', 'eşik'],
      context:
        'Yol haritan; biteni bitirmek ve kutlamak. Bütünlük yeni kapıları açacak.',
      group: 'Majör Arkana',
    },
  
  // CUPS (Kupalar)
    {
      id: 'ace_of_cups_ra_pos5',
      card: 'Ace of Cups',
      position: 5,
      upright:
        'Yol haritan kalbini açmak ve duygularını özgürce akıtmakla başlıyor. Saf sevgi, yeni bir bağın veya mevcut ilişkinin tazelenmiş hali için kapı açar.',
      reversed:
        'Yol haritan duygularını bastırmakla gölgelenebilir. Kendini açmayı reddetmek kalbini sıkıştırır, şefkat alanlarını kapatır.',
      keywords: ['sevgi', 'başlangıç', 'duygular', 'açılım', 'şefkat'],
      context: 'Kalbini aç. Yeni duygular yolunu aydınlatacak.',
      group: 'Kupalar',
    },
    {
      id: 'two_of_cups_ra_pos5',
      card: 'Two of Cups',
      position: 5,
      upright:
        'Yol haritan uyumlu ortaklık ve karşılıklı destek üzerine kurulmalı. Eşit alışveriş köprüyü güçlendirir.',
      reversed:
        'Yol haritan yanlış anlaşılmalar ve dengesiz alışverişle tıkanabilir. Açık iletişim ve sınırlar şifayı getirir.',
      keywords: ['uyum', 'ortaklık', 'denge', 'aşk', 'iletişim'],
      context: 'Karşılıklılık yolunu açar. Denge seni ileri taşır.',
      group: 'Kupalar',
    },
    {
      id: 'three_of_cups_ra_pos5',
      card: 'Three of Cups',
      position: 5,
      upright:
        'Yol haritan dostluk, kutlama ve paylaşılan sevinçlerle genişleyecek. Topluluk içinde destek bulmak kalbini hafifletir.',
      reversed:
        'Yol haritan yüzeysel bağlarla gölgelenebilir. Kaliteli ve derin ilişkiler seçmek önemlidir.',
      keywords: ['kutlama', 'dostluk', 'destek', 'paylaşım', 'neşe'],
      context: 'Paylaşım ve dostluk yolunu genişletecek.',
      group: 'Kupalar',
    },
    {
      id: 'four_of_cups_ra_pos5',
      card: 'Four of Cups',
      position: 5,
      upright:
        'Yol haritan tatminsizlikle yüzleşip yeni fırsatlara uyanmakla ilerleyecek. İç gözlem seni farkındalığa taşıyacak.',
      reversed:
        'Yol haritan kabullenişi reddetmekle daralabilir. Şükran pratiği yolunu açacak.',
      keywords: ['tatminsizlik', 'uyanış', 'şükran', 'fırsat', 'farkındalık'],
      context: 'Şükran kalbini açacak. Fırsatlar yolunu gösterecek.',
      group: 'Kupalar',
    },
    {
      id: 'five_of_cups_ra_pos5',
      card: 'Five of Cups',
      position: 5,
      upright:
        'Yol haritan kayıpları onurlandırıp kalan güzellikleri fark etmekten geçiyor. Yasın içinden umut filizlenir.',
      reversed:
        'Yol haritan geçmişe takılı kalmakla gölgelenebilir. Kabullenmek yeni bir döngüyü başlatır.',
      keywords: ['yas', 'kayıp', 'umut', 'kabul', 'şifa'],
      context: 'Kayıpları bırak. Umut yolunu aydınlatacak.',
      group: 'Kupalar',
    },
    {
      id: 'six_of_cups_ra_pos5',
      card: 'Six of Cups',
      position: 5,
      upright:
        'Yol haritan geçmişin sıcaklığını onurlandırıp bugüne taşıyor. İç çocukla bağ kurmak sevgi dolu bir yol açar.',
      reversed:
        'Yol haritan geçmişe saplanmakla zorlaşabilir. Şimdiye odaklanmak ilerlemeni kolaylaştırır.',
      keywords: ['geçmiş', 'nostalji', 'iç çocuk', 'şefkat', 'an'],
      context: 'Geçmişi onurlandır, ama şimdiye dön. Yolun burada açılır.',
      group: 'Kupalar',
    },
    {
      id: 'seven_of_cups_ra_pos5',
      card: 'Seven of Cups',
      position: 5,
      upright:
        'Yol haritan çoklu seçenekler arasından kalbinin sesini seçmekle ilerleyecek. Hayal ve gerçek dengesi önemlidir.',
      reversed:
        'Yol haritan hayallerde kaybolmakla tıkanabilir. Öncelik belirlemek yönünü netleştirir.',
      keywords: ['seçenek', 'hayal', 'öncelik', 'netlik', 'vizyon'],
      context: 'Seçimlerini netleştir. Öncelik yolunu belirleyecek.',
      group: 'Kupalar',
    },
    {
      id: 'eight_of_cups_ra_pos5',
      card: 'Eight of Cups',
      position: 5,
      upright:
        'Yol haritan seni tatmin etmeyeni bırakıp daha anlamlı olana yönelmekten geçiyor. Cesurca ayrılış yeni kapılar açar.',
      reversed:
        'Yol haritan gitmek-kalmak ikilemiyle gölgelenebilir. Doğru kapanış ritüeli netliği getirir.',
      keywords: ['ayrılık', 'anlam', 'cesaret', 'yolculuk', 'bırakış'],
      context: 'Tatmin etmeyeni bırak. Daha anlamlıya yol açılacak.',
      group: 'Kupalar',
    },
    {
      id: 'nine_of_cups_ra_pos5',
      card: 'Nine of Cups',
      position: 5,
      upright:
        'Yol haritan kişisel tatmini ve şükranı büyütmekten geçiyor. Doyum içsel dengeyle gelir.',
      reversed:
        'Yol haritan yüzeysel hazlarla gölgelenebilir. Derin değerler doyumu kalıcı kılar.',
      keywords: ['tatmin', 'şükran', 'bolluk', 'haz', 'denge'],
      context: 'Şükran bolluğu büyütecek. Denge doyumu getirecek.',
      group: 'Kupalar',
    },
    {
      id: 'ten_of_cups_ra_pos5',
      card: 'Ten of Cups',
      position: 5,
      upright:
        'Yol haritan kalp çevresinde uyum ve aile sıcaklığı kurmaktan geçiyor. Birlik duygusu huzur verir.',
      reversed:
        'Yol haritan ideal–gerçeklik çatışmasıyla gölgelenebilir. Sahici diyalog köprü kurar.',
      keywords: ['uyum', 'aile', 'birlik', 'huzur', 'gerçeklik'],
      context: 'Birlik duygusu yolunu besleyecek. Huzur kalbini açacak.',
      group: 'Kupalar',
    },
    {
      id: 'page_of_cups_ra_pos5',
      card: 'Page of Cups',
      position: 5,
      upright:
        'Yol haritan saf merak ve yaratıcı sezgiyle açılıyor. Küçük ilhamlar büyük keşifler doğurur.',
      reversed:
        'Yol haritan aşırı hassasiyetle gölgelenebilir. Duyguları somut adımla dengelemek önemli.',
      keywords: ['merak', 'ilham', 'sezgi', 'hassasiyet', 'keşif'],
      context: 'Merak yolunu açacak. İlham seni büyütecek.',
      group: 'Kupalar',
    },
    {
      id: 'knight_of_cups_ra_pos5',
      card: 'Knight of Cups',
      position: 5,
      upright:
        'Yol haritan kalpten gelen eylemlerle ilerliyor. Romantik ve vizyoner adımlar yolunu aydınlatır.',
      reversed:
        'Yol haritan tutarsız vaatlerle gölgelenebilir. Netlik ve süreklilik şarttır.',
      keywords: ['vizyon', 'romantizm', 'kalp', 'teklif', 'hareket'],
      context: 'Kalpten eylem yolunu açacak. Netlik seni koruyacak.',
      group: 'Kupalar',
    },
    {
      id: 'queen_of_cups_ra_pos5',
      card: 'Queen of Cups',
      position: 5,
      upright:
        'Yol haritan empati, sezgi ve şefkatli alan tutmakla güçleniyor. Kalbini dinlemek sana rehberlik edecek.',
      reversed:
        'Yol haritan sınır erimesiyle gölgelenebilir. Öz düzenleme dengeyi getirir.',
      keywords: ['empati', 'sezgi', 'şefkat', 'denge', 'alan'],
      context: 'Empati yolunu yumuşatacak. Sezgi sana rehber olacak.',
      group: 'Kupalar',
    },
    {
      id: 'king_of_cups_ra_pos5',
      card: 'King of Cups',
      position: 5,
      upright:
        'Yol haritan duygusal olgunluk ve sakin liderlikle ilerliyor. Zor anlarda bile merkezde kalmak yolunu aydınlatır.',
      reversed:
        'Yol haritan bastırılmış öfke veya pasif agresyonla zorlanabilir. Açık ifade dengeyi yeniden kurar.',
      keywords: ['olgunluk', 'denge', 'liderlik', 'duygu', 'sükunet'],
      context: 'Olgunluk yolunu gösterecek. Sakinlik sana güç katacak.',
      group: 'Kupalar',
    },
  {
    id: 'ace_of_cups_ra_pos5',
    card: 'Ace of Cups',
    position: 5,
    upright:
      'Yol haritan kalbini açmak ve duygularını özgürce akıtmakla başlıyor. Saf sevgi, yeni bir bağın veya mevcut ilişkinin tazelenmiş hali için kapı açar.',
    reversed:
      'Yol haritan duygularını bastırmakla gölgelenebilir. Kendini açmayı reddetmek kalbini sıkıştırır, şefkat alanlarını kapatır.',
    keywords: ['sevgi', 'başlangıç', 'duygular', 'açılım', 'şefkat'],
    context: 'Kalbini aç. Yeni duygular yolunu aydınlatacak.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ra_pos5',
    card: 'Two of Cups',
    position: 5,
    upright:
      'Yol haritan uyumlu ortaklık ve karşılıklı destek üzerine kurulmalı. Eşit alışveriş köprüyü güçlendirir.',
    reversed:
      'Yol haritan yanlış anlaşılmalar ve dengesiz alışverişle tıkanabilir. Açık iletişim ve sınırlar şifayı getirir.',
    keywords: ['uyum', 'ortaklık', 'denge', 'aşk', 'iletişim'],
    context: 'Karşılıklılık yolunu açar. Denge seni ileri taşır.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ra_pos5',
    card: 'Three of Cups',
    position: 5,
    upright:
      'Yol haritan dostluk, kutlama ve paylaşılan sevinçlerle genişleyecek. Topluluk içinde destek bulmak kalbini hafifletir.',
    reversed:
      'Yol haritan yüzeysel bağlarla gölgelenebilir. Kaliteli ve derin ilişkiler seçmek önemlidir.',
    keywords: ['kutlama', 'dostluk', 'destek', 'paylaşım', 'neşe'],
    context: 'Paylaşım ve dostluk yolunu genişletecek.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ra_pos5',
    card: 'Four of Cups',
    position: 5,
    upright:
      'Yol haritan tatminsizlikle yüzleşip yeni fırsatlara uyanmakla ilerleyecek. İç gözlem seni farkındalığa taşıyacak.',
    reversed:
      'Yol haritan kabullenişi reddetmekle daralabilir. Şükran pratiği yolunu açacak.',
    keywords: ['tatminsizlik', 'uyanış', 'şükran', 'fırsat', 'farkındalık'],
    context: 'Şükran kalbini açacak. Fırsatlar yolunu gösterecek.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ra_pos5',
    card: 'Five of Cups',
    position: 5,
    upright:
      'Yol haritan kayıpları onurlandırıp kalan güzellikleri fark etmekten geçiyor. Yasın içinden umut filizlenir.',
    reversed:
      'Yol haritan geçmişe takılı kalmakla gölgelenebilir. Kabullenmek yeni bir döngüyü başlatır.',
    keywords: ['yas', 'kayıp', 'umut', 'kabul', 'şifa'],
    context: 'Kayıpları bırak. Umut yolunu aydınlatacak.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ra_pos5',
    card: 'Six of Cups',
    position: 5,
    upright:
      'Yol haritan geçmişin sıcaklığını onurlandırıp bugüne taşıyor. İç çocukla bağ kurmak sevgi dolu bir yol açar.',
    reversed:
      'Yol haritan geçmişe saplanmakla zorlaşabilir. Şimdiye odaklanmak ilerlemeni kolaylaştırır.',
    keywords: ['geçmiş', 'nostalji', 'iç çocuk', 'şefkat', 'an'],
    context: 'Geçmişi onurlandır, ama şimdiye dön. Yolun burada açılır.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ra_pos5',
    card: 'Seven of Cups',
    position: 5,
    upright:
      'Yol haritan çoklu seçenekler arasından kalbinin sesini seçmekle ilerleyecek. Hayal ve gerçek dengesi önemlidir.',
    reversed:
      'Yol haritan hayallerde kaybolmakla tıkanabilir. Öncelik belirlemek yönünü netleştirir.',
    keywords: ['seçenek', 'hayal', 'öncelik', 'netlik', 'vizyon'],
    context: 'Seçimlerini netleştir. Öncelik yolunu belirleyecek.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ra_pos5',
    card: 'Eight of Cups',
    position: 5,
    upright:
      'Yol haritan seni tatmin etmeyeni bırakıp daha anlamlı olana yönelmekten geçiyor. Cesurca ayrılış yeni kapılar açar.',
    reversed:
      'Yol haritan gitmek-kalmak ikilemiyle gölgelenebilir. Doğru kapanış ritüeli netliği getirir.',
    keywords: ['ayrılık', 'anlam', 'cesaret', 'yolculuk', 'bırakış'],
    context: 'Tatmin etmeyeni bırak. Daha anlamlıya yol açılacak.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ra_pos5',
    card: 'Nine of Cups',
    position: 5,
    upright:
      'Yol haritan kişisel tatmini ve şükranı büyütmekten geçiyor. Doyum içsel dengeyle gelir.',
    reversed:
      'Yol haritan yüzeysel hazlarla gölgelenebilir. Derin değerler doyumu kalıcı kılar.',
    keywords: ['tatmin', 'şükran', 'bolluk', 'haz', 'denge'],
    context: 'Şükran bolluğu büyütecek. Denge doyumu getirecek.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ra_pos5',
    card: 'Ten of Cups',
    position: 5,
    upright:
      'Yol haritan kalp çevresinde uyum ve aile sıcaklığı kurmaktan geçiyor. Birlik duygusu huzur verir.',
    reversed:
      'Yol haritan ideal–gerçeklik çatışmasıyla gölgelenebilir. Sahici diyalog köprü kurar.',
    keywords: ['uyum', 'aile', 'birlik', 'huzur', 'gerçeklik'],
    context: 'Birlik duygusu yolunu besleyecek. Huzur kalbini açacak.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ra_pos5',
    card: 'Page of Cups',
    position: 5,
    upright:
      'Yol haritan saf merak ve yaratıcı sezgiyle açılıyor. Küçük ilhamlar büyük keşifler doğurur.',
    reversed:
      'Yol haritan aşırı hassasiyetle gölgelenebilir. Duyguları somut adımla dengelemek önemli.',
    keywords: ['merak', 'ilham', 'sezgi', 'hassasiyet', 'keşif'],
    context: 'Merak yolunu açacak. İlham seni büyütecek.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ra_pos5',
    card: 'Knight of Cups',
    position: 5,
    upright:
      'Yol haritan kalpten gelen eylemlerle ilerliyor. Romantik ve vizyoner adımlar yolunu aydınlatır.',
    reversed:
      'Yol haritan tutarsız vaatlerle gölgelenebilir. Netlik ve süreklilik şarttır.',
    keywords: ['vizyon', 'romantizm', 'kalp', 'teklif', 'hareket'],
    context: 'Kalpten eylem yolunu açacak. Netlik seni koruyacak.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ra_pos5',
    card: 'Queen of Cups',
    position: 5,
    upright:
      'Yol haritan empati, sezgi ve şefkatli alan tutmakla güçleniyor. Kalbini dinlemek sana rehberlik edecek.',
    reversed:
      'Yol haritan sınır erimesiyle gölgelenebilir. Öz düzenleme dengeyi getirir.',
    keywords: ['empati', 'sezgi', 'şefkat', 'denge', 'alan'],
    context: 'Empati yolunu yumuşatacak. Sezgi sana rehber olacak.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ra_pos5',
    card: 'King of Cups',
    position: 5,
    upright:
      'Yol haritan duygusal olgunluk ve sakin liderlikle ilerliyor. Zor anlarda bile merkezde kalmak yolunu aydınlatır.',
    reversed:
      'Yol haritan bastırılmış öfke veya pasif agresyonla zorlanabilir. Açık ifade dengeyi yeniden kurar.',
    keywords: ['olgunluk', 'denge', 'liderlik', 'duygu', 'sükunet'],
    context: 'Olgunluk yolunu gösterecek. Sakinlik sana güç katacak.',
    group: 'Kupalar',
  },
  
  // SWORDS (Kılıçlar)
    // RELATIONSHIP ANALYSIS (ra) – POSITION 5: "Yol Haritası"
// Kılıçlar – 14 Kart

  {
    id: 'ace_of_swords_ra_pos5',
    card: 'Ace of Swords',
    position: 5,
    upright:
      'Yolun, netlik ve hakikati ortaya koymaktan geçiyor. Açık ve dürüst bir cümle bağın yönünü aydınlatacak.',
    reversed:
      'Yol, belirsizlik ve aşırı analizden uzaklaşmanı istiyor. Kafa karışıklığını sadeleştirmek huzuru getirir.',
    keywords: ['netlik', 'hakikat', 'dürüstlük', 'karar'],
    context:
      'Yol haritan; keskin doğrulukla başlar. Net cümleler bağa güven verecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ra_pos5',
    card: 'Two of Swords',
    position: 5,
    upright:
      'Yolun, ikilemi fark edip kararı kalbinle vermekten geçiyor. Duygularını masaya koyduğunda denge sağlanacak.',
    reversed:
      'Yol, kaçınmayı bırakmanı istiyor. Kör noktaları görmek özgürleştirici olacak.',
    keywords: ['karar', 'denge', 'yüzleşme', 'ikilem'],
    context:
      'Yol haritan; ikilemde kalmamak. Karar vermek huzuru geri getirecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ra_pos5',
    card: 'Three of Swords',
    position: 5,
    upright:
      'Yolun, kırgınlıkları onurlandırıp şefkatle yüzleşmekten geçiyor. Acıyı görmek, iyileşmenin ilk kapısıdır.',
    reversed:
      'Yol, yasın içinde kaybolmamanı ister. Affediş kalbine alan açacak.',
    keywords: ['kırgınlık', 'yas', 'hakikat', 'iyileşme'],
    context:
      'Yol haritan; acıyla yüzleşmek. Şefkatle yaklaşım bağı güçlendirecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ra_pos5',
    card: 'Four of Swords',
    position: 5,
    upright:
      'Yolun, mola verip zihnini dinlendirmekten geçiyor. Sessizlik stratejini olgunlaştıracak.',
    reversed:
      'Yol, tükenmişliği fark edip dinlenmeyi seçmeni istiyor. Yorucu ısrar fayda getirmiyor.',
    keywords: ['dinlenme', 'toparlanma', 'sessizlik', 'strateji'],
    context:
      'Yol haritan; küçük molalar. Zihinsel sükunet ilerlemeni kolaylaştıracak.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ra_pos5',
    card: 'Five of Swords',
    position: 5,
    upright:
      'Yolun, haklı çıkma hırsını bırakıp köprüleri korumaktan geçiyor. Kazanım bağın değil egonun tatmini olabilir.',
    reversed:
      'Yol, onarım için şans tanımanı istiyor. Esnek dil gerilimi yumuşatacak.',
    keywords: ['çatışma', 'ego', 'haklılık', 'onarım'],
    context:
      'Yol haritan; köprüyü korumak. Haklılıktan çok huzuru seçmek şifa getirecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ra_pos5',
    card: 'Six of Swords',
    position: 5,
    upright:
      'Yolun, fırtınalı sudan uzaklaşıp sakinliğe doğru ilerlemekten geçiyor. Kademeli adımlar sana güven getirecek.',
    reversed:
      'Yol, eski bağlardan özgürleşmeni istiyor. Destek almak geçişi kolaylaştırır.',
    keywords: ['geçiş', 'sükunet', 'rota', 'iyileşme'],
    context:
      'Yol haritan; sakin sulara yönelmek. Güvenli uzaklaşma huzur verecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ra_pos5',
    card: 'Seven of Swords',
    position: 5,
    upright:
      'Yolun, stratejik ama temiz niyetli adımlardan geçiyor. Sessiz ilerlemek faydalı olabilir.',
    reversed:
      'Yol, yarım doğruları bırakmanı istiyor. Şeffaflık güveni onaracak.',
    keywords: ['strateji', 'gizlilik', 'dürüstlük', 'plan'],
    context:
      'Yol haritan; niyeti temiz strateji. Şeffaflık bağı koruyacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ra_pos5',
    card: 'Eight of Swords',
    position: 5,
    upright:
      'Yolun, kendi zihinsel zincirlerini fark edip özgürleşmekten geçiyor. Küçük kanıtlar seni serbest bırakacak.',
    reversed:
      'Yol, korkulara teslim olmadan çıkış kapısını görmeni istiyor. Destek istemek fayda getirir.',
    keywords: ['özgürleşme', 'korku', 'zihin tuzağı', 'deney'],
    context:
      'Yol haritan; kendi sınırlarını çözmek. Küçük özgürlük adımları yönünü açacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ra_pos5',
    card: 'Nine of Swords',
    position: 5,
    upright:
      'Yolun, kaygılarını yazıya döküp gerçeklikle yüzleşmekten geçiyor. Gece düşünceleri sabah netliğiyle hafifler.',
    reversed:
      'Yol, felaket senaryolarını bırakmanı istiyor. Küçük zaferler kaygıyı çözecek.',
    keywords: ['kaygı', 'uykusuzluk', 'felaketleştirme', 'şifa'],
    context:
      'Yol haritan; kaygıyla yüzleşmek. Gerçeklik kaygıyı zayıflatacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ra_pos5',
    card: 'Ten of Swords',
    position: 5,
    upright:
      'Yolun, kapanmış bir döngüyü onurlandırıp yeniden başlamaktan geçiyor. Bitiş, yeniye kapı açar.',
    reversed:
      'Yol, toparlanmayı hızlandırmanı ister. Yeniden çerçeve güç kazandırır.',
    keywords: ['bitiş', 'yeniden doğuş', 'teslimiyet', 'şifa'],
    context:
      'Yol haritan; biteni bırakmak. Yenisi için alan açılacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ra_pos5',
    card: 'Page of Swords',
    position: 5,
    upright:
      'Yolun, merak ve öğrenme adımlarından geçiyor. Seçici bilgi toplamak ilerlemeyi hızlandırır.',
    reversed:
      'Yol, acele yargılardan uzak durmanı istiyor. Kaynak doğrulama güveni artırır.',
    keywords: ['merak', 'öğrenme', 'iletişim', 'doğrulama'],
    context:
      'Yol haritan; bilinçli öğrenme. Açık gözlem ilerlemeyi destekleyecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ra_pos5',
    card: 'Knight of Swords',
    position: 5,
    upright:
      'Yolun, cesur ama stratejik hamlelerden geçiyor. Hızını planla dengelemek sonuç verecek.',
    reversed:
      'Yol, aceleci üsluptan sakınmanı istiyor. Nefes alıp yön belirlemek fayda getirecek.',
    keywords: ['cesaret', 'hız', 'kararlılık', 'strateji'],
    context:
      'Yol haritan; hızlı ama bilinçli adımlar. Stratejiyle desteklenen cesaret yol açacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ra_pos5',
    card: 'Queen of Swords',
    position: 5,
    upright:
      'Yolun, nesnellik ve netlikle ilerlemekten geçiyor. Serin akıl adil karar verir.',
    reversed:
      'Yol, aşırı eleştiriden uzaklaşmanı istiyor. Şefkatli dil bağını korur.',
    keywords: ['netlik', 'sınır', 'adalet', 'nesnellik'],
    context:
      'Yol haritan; berrak bakış açısı. Nesnellik ve şefkat dengesi huzur verecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ra_pos5',
    card: 'King of Swords',
    position: 5,
    upright:
      'Yolun, etik ilkelere yaslanarak stratejik ilerlemekten geçiyor. Mantık ve değer birleşince güç doğar.',
    reversed:
      'Yol, katı kurallardan sıyrılmanı istiyor. Empati zihnini yumuşatacak.',
    keywords: ['etik', 'mantık', 'otorite', 'empati'],
    context:
      'Yol haritan; ilkeli adımlar. Empatiyle birleşen mantık bağı güçlendirecek.',
    group: 'Kılıçlar',
  },
// RELATIONSHIP ANALYSIS (ra) – POSITION 5: "Yol Haritası"
// Asalar – 14 Kart
  {
    id: 'ace_of_wands_ra_pos5',
    card: 'Ace of Wands',
    position: 5,
    upright:
      'Yolun, içindeki ateşi uyandırıp yeni bir başlangıç yapmaktan geçiyor. Cesaretle atılan ilk adım tüm süreci ateşleyecek.',
    reversed:
      'Yol, ertelemeyi bırakmanı ve kıvılcımı büyütmeni istiyor. İlhamı küçük eylemlere dönüştürmek seni ileri taşıyacak.',
    keywords: ['başlangıç', 'ilham', 'ateş', 'cesaret'],
    context:
      'Yol haritan; kıvılcımı büyütmek. Minik cesur adımlar seni ileri götürecek.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ra_pos5',
    card: 'Two of Wands',
    position: 5,
    upright:
      'Yolun, ufkunu genişletip konfor alanından çıkmaktan geçiyor. Planlarını görünür kılmak vizyonunu güçlendirecek.',
    reversed:
      'Yol, kararsızlığı geride bırakmanı istiyor. Ufka bakmak yerine harekete geçmek ilerleme getirecek.',
    keywords: ['vizyon', 'plan', 'ufuk', 'cesaret'],
    context:
      'Yol haritan; vizyonu eyleme dökmek. Net plan yeni yönünü belirleyecek.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ra_pos5',
    card: 'Three of Wands',
    position: 5,
    upright:
      'Yolun, hazırlıklarını somut adımlara çevirmekten geçiyor. Ufka bakarken işbirliği seni destekleyecek.',
    reversed:
      'Yol, gecikme korkusunu bırakmanı istiyor. Dar görüşlülüğü aşmak genişleme getirecek.',
    keywords: ['genişleme', 'işbirliği', 'ufuk', 'fırsat'],
    context:
      'Yol haritan; vizyonu genişletmek. İşbirliğiyle ufuk açılacak.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ra_pos5',
    card: 'Four of Wands',
    position: 5,
    upright:
      'Yolun, kutlama ve istikrarı inşa etmekten geçiyor. Sağlam temel sana güven verecek.',
    reversed:
      'Yol, düzensizliği kabul edip ritüellerle düzen kurmanı istiyor. Küçük kutlamalar bağı güçlendirecek.',
    keywords: ['istikrar', 'kutlama', 'aidiyet', 'temel'],
    context:
      'Yol haritan; sağlam temel kurmak. Kutlamalar bağı besleyecek.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ra_pos5',
    card: 'Five of Wands',
    position: 5,
    upright:
      'Yolun, enerjiyi yapıcı rekabete çevirmekten geçiyor. Net kurallar mücadeleyi üretken kılacak.',
    reversed:
      'Yol, bastırılmış gerilimi konuşmanı istiyor. Şeffaf diyalog kaosu düzenleyecek.',
    keywords: ['rekabet', 'çatışma', 'diyalog', 'netlik'],
    context:
      'Yol haritan; mücadeleyi yapılandırmak. Açık iletişim huzuru getirecek.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ra_pos5',
    card: 'Six of Wands',
    position: 5,
    upright:
      'Yolun, başarılarını görünür kılmaktan geçiyor. Paylaşılan zafer motivasyonu büyütecek.',
    reversed:
      'Yol, takdir eksikliğini telafi etmeni istiyor. Şeffaf paylaşım algıyı onaracak.',
    keywords: ['zafer', 'tanınma', 'motivasyon', 'paylaşım'],
    context:
      'Yol haritan; zaferi paylaşmak. Görünürlük güveni artıracak.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ra_pos5',
    card: 'Seven of Wands',
    position: 5,
    upright:
      'Yolun, değerlerini savunmaktan geçiyor. Tutarlılık sana avantaj sağlayacak.',
    reversed:
      'Yol, tükenmiş savunmayı bırakmanı istiyor. Delege etmek hafifletecek.',
    keywords: ['savunma', 'sınır', 'kararlılık', 'öncelik'],
    context:
      'Yol haritan; hattı korumak. Tutarlılık gücünü pekiştirecek.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ra_pos5',
    card: 'Eight of Wands',
    position: 5,
    upright:
      'Yolun, hız ve akışı yakalamaktan geçiyor. Zamanında mesaj fırsat kapılarını açacak.',
    reversed:
      'Yol, gecikme korkusunu bırakmanı istiyor. Sıralamayı sadeleştirmek akışı kolaylaştıracak.',
    keywords: ['hız', 'ivme', 'akış', 'senkron'],
    context:
      'Yol haritan; ivmeyi yönetmek. Zamanında hareket ilerlemeyi hızlandıracak.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ra_pos5',
    card: 'Nine of Wands',
    position: 5,
    upright:
      'Yolun, dayanıklılıkla son virajı geçmekten geçiyor. Küçük molalar gücünü koruyacak.',
    reversed:
      'Yol, aşırı tetikte kalmaktan uzaklaşmanı istiyor. Destek istemek seni güçlendirecek.',
    keywords: ['dayanıklılık', 'tetikte', 'mola', 'koruma'],
    context:
      'Yol haritan; son düzlükte sabır. Dinlenmek yolunu aydınlatacak.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ra_pos5',
    card: 'Ten of Wands',
    position: 5,
    upright:
      'Yolun, yüklerini dengelemekten geçiyor. Önceliklendirme seni özgürleştirecek.',
    reversed:
      'Yol, fazlalıkları bırakmanı istiyor. Basitlik kaliteyi artıracak.',
    keywords: ['yük', 'sorumluluk', 'tamamlama', 'denge'],
    context:
      'Yol haritan; yükü sadeleştirmek. Paylaşmak özgürlük getirecek.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ra_pos5',
    card: 'Page of Wands',
    position: 5,
    upright:
      'Yolun, merak ve denemelerle ilerlemekten geçiyor. Küçük keşifler büyük kapılar açacak.',
    reversed:
      'Yol, dağınık ilgini odaklamanı istiyor. Mikro hedefler seni hizalayacak.',
    keywords: ['merak', 'keşif', 'deneyim', 'odak'],
    context:
      'Yol haritan; öğrenme hevesi. Küçük adımlar yön verecek.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ra_pos5',
    card: 'Knight of Wands',
    position: 5,
    upright:
      'Yolun, tutkuyla ama stratejik ilerlemekten geçiyor. Cesaretle atılan adım yolu hızlandıracak.',
    reversed:
      'Yol, savrukluğu bırakmanı istiyor. Taahhütlerini düzenlemek ilerleme getirecek.',
    keywords: ['tutku', 'cesaret', 'hız', 'strateji'],
    context:
      'Yol haritan; ateşi dengelemek. Stratejik tutku yolunu açacak.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ra_pos5',
    card: 'Queen of Wands',
    position: 5,
    upright:
      'Yolun, karizmanı ve özgüvenini yansıtmakla geçiyor. Sıcak liderlik çevreni büyütecek.',
    reversed:
      'Yol, kıskançlık gölgesini bırakmanı istiyor. Öz-değerine yaslanmak seni parlatacak.',
    keywords: ['karizma', 'özgüven', 'liderlik', 'ilham'],
    context:
      'Yol haritan; içsel ışığı yansıtmak. Öz-değer güven verecek.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ra_pos5',
    card: 'King of Wands',
    position: 5,
    upright:
      'Yolun, vizyoner liderlikten geçiyor. Cesur stratejiler seni ileriye taşıyacak.',
    reversed:
      'Yol, otoriterleşmeden uzak durmanı istiyor. Dinleme becerisi yolunu aydınlatacak.',
    keywords: ['vizyon', 'liderlik', 'cesaret', 'dinleme'],
    context:
      'Yol haritan; vizyonu yönetmek. Cesaret ve empati denge kuracak.',
    group: 'Asalar',
  },
  
  // PENTACLES (Tılsımlar)
    {
      id: 'ace_of_pentacles_ra_pos5',
      card: 'Ace of Pentacles',
      position: 5,
      upright:
        'Yol haritan somut bir fırsat ve güvenli bir temel üzerine kurulmalı. Küçük, düzenli adımlar uzun vadeli istikrarı doğurur.',
      reversed:
        'Yol haritan dağılma ve fırsatı kaçırma korkusu ile bulanıklaşabilir. Net öncelikler belirlemek ve odaklanmak seni güçlendirir.',
      keywords: ['fırsat', 'başlangıç', 'temel', 'istikrar', 'büyüme'],
      context:
        'Yeni bir başlangıç seni bekliyor. Somutlaştır ve küçük adımlarla güveni inşa et.',
      group: 'Tılsımlar',
    },
    {
      id: 'two_of_pentacles_ra_pos5',
      card: 'Two of Pentacles',
      position: 5,
      upright:
        'Yol haritan esneklik ve denge üzerine kurulmalı. Birden fazla sorumluluğu uyumla yönetmek ilerlemeni sağlar.',
      reversed:
        'Yol haritan dengesizlik ve erteleme ile dağılabilir. Önceliklerini sadeleştirmen şarttır.',
      keywords: ['denge', 'esneklik', 'zaman', 'öncelik', 'uyum'],
      context:
        'Dengeyi koruyarak ilerle. Küçük ayarlamalar yolunu açacak.',
      group: 'Tılsımlar',
    },
    {
      id: 'three_of_pentacles_ra_pos5',
      card: 'Three of Pentacles',
      position: 5,
      upright:
        'Yol haritan işbirliği ve uzmanlık paylaşımından güç alır. Birlikte inşa edilen yapı uzun ömürlü olur.',
      reversed:
        'Yol haritan belirsiz roller ve iletişimsizlik ile tıkanabilir. Net iş bölümü gereklidir.',
      keywords: ['işbirliği', 'ustalık', 'paylaşım', 'inşa', 'takım'],
      context:
        'Birlikte çalışmak büyüteç etkisi yaratır. Güvenle paylaş.',
      group: 'Tılsımlar',
    },
    {
      id: 'four_of_pentacles_ra_pos5',
      card: 'Four of Pentacles',
      position: 5,
      upright:
        'Yol haritan sağlamlık ve sahip olduklarını koruma üzerine kurulu. Fazla tutunmadan esnek kalmak uzun vadeli büyüme sağlar.',
      reversed:
        'Yol haritan aşırı kontrol ve açgözlülükle daralabilir. Bırakmak ve paylaşmak ilerletir.',
      keywords: ['güvenlik', 'koruma', 'kontrol', 'denge', 'esneklik'],
      context:
        'Köklerini güvenle koru. Ama fazlasını da bırakmayı öğren.',
      group: 'Tılsımlar',
    },
    {
      id: 'five_of_pentacles_ra_pos5',
      card: 'Five of Pentacles',
      position: 5,
      upright:
        'Yol haritan zor zamanlarda dayanışma ve destek arayışı ile güçlenecek. Zorluk paylaşınca hafifler.',
      reversed:
        'Yol haritan yalnızlık ve yoksunluk hissiyle gölgelenebilir. Yardım istemek yeni kapılar açar.',
      keywords: ['zorluk', 'destek', 'dayanıklılık', 'yardım', 'birlik'],
      context:
        'Zorlukta el ele ver. Destek seni güçlendirecek.',
      group: 'Tılsımlar',
    },
    {
      id: 'six_of_pentacles_ra_pos5',
      card: 'Six of Pentacles',
      position: 5,
      upright:
        'Yol haritan adil paylaşım ve denge üzerine kurulu. Vermek ve almak aynı anda büyütür.',
      reversed:
        'Yol haritan güç dengesizlikleri ile gölgelenebilir. Sınırları net tutmalısın.',
      keywords: ['paylaşım', 'adalet', 'denge', 'alma-verme', 'güven'],
      context:
        'Eşitlik ve şeffaflık yolunu açar. Paylaşım köprü kurar.',
      group: 'Tılsımlar',
    },
    {
      id: 'seven_of_pentacles_ra_pos5',
      card: 'Seven of Pentacles',
      position: 5,
      upright:
        'Yol haritan sabır ve değerlendirme ritmiyle ilerler. Küçük iyileştirmeler uzun vadede hasat getirir.',
      reversed:
        'Yol haritan sabırsızlık ve “batık maliyet” sendromu ile zorlanabilir. Pivot etmek gerekebilir.',
      keywords: ['sabır', 'değerlendirme', 'emek', 'bekleyiş', 'hasat'],
      context:
        'Sabırlı ol, çaban filizlenecek. Küçük ayarlar büyük fark yaratır.',
      group: 'Tılsımlar',
    },
    {
      id: 'eight_of_pentacles_ra_pos5',
      card: 'Eight of Pentacles',
      position: 5,
      upright:
        'Yol haritan disiplinli emek ve ustalıkla örülmeli. Tekrar ve odak başarı getirir.',
      reversed:
        'Yol haritan özensizlik veya hedefsizlik ile tıkanabilir. Motivasyonu yeniden tazele.',
      keywords: ['çalışma', 'emek', 'disiplin', 'odak', 'ustalık'],
      context:
        'Adım adım ustalaş. Sabırla inşa et.',
      group: 'Tılsımlar',
    },
    {
      id: 'nine_of_pentacles_ra_pos5',
      card: 'Nine of Pentacles',
      position: 5,
      upright:
        'Yol haritan bağımsızlık ve öz-değerin tadını çıkararak güçlenir. Kendi emeğinin karşılığını görmek gurur verir.',
      reversed:
        'Yol haritan savurganlık ya da başkasına aşırı bağımlılık ile sekteye uğrayabilir. Disiplin seni korur.',
      keywords: ['öz değer', 'bağımsızlık', 'konfor', 'istikrar', 'emek'],
      context:
        'Emeğini onurlandır. Kendi ayakların üzerinde gururla dur.',
      group: 'Tılsımlar',
    },
    {
      id: 'ten_of_pentacles_ra_pos5',
      card: 'Ten of Pentacles',
      position: 5,
      upright:
        'Yol haritan uzun vadeli yapı ve miras bırakma arzusu ile şekillenecek. Güçlü temeller gelecek nesillere değer katar.',
      reversed:
        'Yol haritan maddi anlaşmazlıklar ve miras çatışmaları ile sekteye uğrayabilir. Şeffaflık şarttır.',
      keywords: ['istikrar', 'miras', 'aile', 'sistem', 'gelecek'],
      context:
        'Köklerini besle, geleceğe aktar. Uzun vadeli plan yap.',
      group: 'Tılsımlar',
    },
    {
      id: 'page_of_pentacles_ra_pos5',
      card: 'Page of Pentacles',
      position: 5,
      upright:
        'Yol haritan öğrenme isteği ve merakla büyüyecek. Küçük projeler büyük vizyonun tohumu olabilir.',
      reversed:
        'Yol haritan erteleme ve odak kaybı ile gölgelenebilir. Net hedefler belirlemek gerekir.',
      keywords: ['öğrenme', 'hedef', 'başlangıç', 'pratik', 'vizyon'],
      context:
        'Küçük öğrenmeler büyük kapılar açar. Merakla ilerle.',
      group: 'Tılsımlar',
    },
    {
      id: 'knight_of_pentacles_ra_pos5',
      card: 'Knight of Pentacles',
      position: 5,
      upright:
        'Yol haritan sabır ve düzenli emekle sağlamlaşır. Yavaş ama emin adımlar kalıcı başarı getirir.',
      reversed:
        'Yol haritan durağanlık ve aşırı muhafazakarlıkla gölgelenebilir. Ufak yenilikler katmak gerek.',
      keywords: ['sabır', 'istikrar', 'emek', 'rutin', 'güven'],
      context:
        'İstikrar seni taşıyacak. Yavaş ama emin adımlarla ilerle.',
      group: 'Tılsımlar',
    },
    {
      id: 'queen_of_pentacles_ra_pos5',
      card: 'Queen of Pentacles',
      position: 5,
      upright:
        'Yol haritan şefkatli pratiklik ve kaynak yönetimi ile şekillenmeli. Öz bakım bereketi artırır.',
      reversed:
        'Yol haritan aşırı yüklenme veya tükeniş ile gölgelenebilir. Destek istemek gerekir.',
      keywords: ['şefkat', 'kaynak', 'öz bakım', 'denge', 'bereket'],
      context:
        'Kaynaklarını dengeli kullan. Kendine bak, bereket artsın.',
      group: 'Tılsımlar',
    },
    {
      id: 'king_of_pentacles_ra_pos5',
      card: 'King of Pentacles',
      position: 5,
      upright:
        'Yol haritan sağlam vizyon ve stratejik yönetimle güvenli temeller kuracak. Liderlik sorumluluğun uzun vadede meyve verir.',
      reversed:
        'Yol haritan statü ve kontrol saplantısı ile gölgelenebilir. Değerlerle hizalanmak seni özgürleştirir.',
      keywords: ['liderlik', 'vizyon', 'strateji', 'istikrar', 'güven'],
      context:
        'Sağlam temeller kur. Stratejik ve güvenli bir yol izle.',
      group: 'Tılsımlar',
    },
];

// Kart adına göre pozisyon 5 anlamını bulma fonksiyonu
export const getPosition5Meaning = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
  return position5Meanings.find(
    meaning => meaning.card === cardName
  );
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipAnalysisPosition5Meaning = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
  return getPosition5Meaning(cardName);
};

// Kart adına göre pozisyon 5 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipAnalysisPosition5MeaningByCardName = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
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
export const getAllPosition5Meanings = (): RelationshipAnalysisPositionMeaning[] => {
  return position5Meanings;
};

// Pozisyon 5 anlamlarını filtreleme fonksiyonu
export const getPosition5MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipAnalysisPositionMeaning[] => {
  return position5Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 5 anlamlarını arama
export const searchPosition5MeaningsByKeyword = (
  keyword: string
): RelationshipAnalysisPositionMeaning[] => {
  return position5Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position5Meanings,
  getRelationshipAnalysisPosition5Meaning,
  getRelationshipAnalysisPosition5MeaningByCardName,
  getAllPosition5Meanings: getAllPosition5Meanings,
  getRelationshipAnalysisPosition5MeaningsByGroup: getPosition5MeaningsByGroup,
};
