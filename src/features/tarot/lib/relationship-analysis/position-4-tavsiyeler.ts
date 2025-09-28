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
- position4Meanings: gerekli
- getposition4Meaning: gerekli
*/

import { RelationshipAnalysisPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position4Meanings: RelationshipAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
  // ==== MAJÖR ARKANA (22) — 4. Pozisyon: Tavsiyeler (büşbüş stili, ra) ====
  {
    id: 'the_fool_ra_pos4',
    card: 'The Fool',
    position: 4,
    upright:
      'Deli, kalbini hafiflet ve cesur ama bilinçli bir ilk adım at. Merakın rehberin olsun, küçük bir hareket bile yol açar.. Yenilik cesaretle birleştiğinde akış açılır.',
    reversed:
      'Ters Deli, aceleye gelen kararların kalbini yoracağını söyler. Önce niyetini netleştir, sonra adım at.\n\nBelirti: Plansız sıçramalara fren.',
    keywords: ['cesaret', 'yenilik', 'merak', 'akış', 'denge'],
    context:
      'Tavsiyen yeniye açılmak ama öz sorumluluğu elden bırakmamak. Minik ve sürdürülebilir adımlar güven tazeleyebilir. Merakla ilerle, sınırlarını da onurlandır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ra_pos4',
    card: 'The Magician',
    position: 4,
    upright:
      'Büyücü, niyetini yaz ve sözünle köprü kur. Söylediğinle yaptığın hizalandığında kapılar kolay açılır.. Net cümle, net gerçeklik.',
    reversed:
      'Ters Büyücü, maskeleri bırak ve algı oyunlarından uzak dur. Dönüştürücü gücün şeffaflıkla çalışır.\n\nBelirti: Abartı ve belirsiz vaatten kaçın.',
    keywords: ['niyet', 'ifade', 'yaratım', 'netlik', 'güven'],
    context:
      'Tavsiyen; niyetini görünür kılmak ve küçük icralarla sabitlemek. Net söz, net adım ve nazik bir ritim ilişkine can verir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ra_pos4',
    card: 'The High Priestess',
    position: 4,
    upright:
      'Başrahibe, sezgine yaslan ve iç bilgeliğini dinle. Uygun zeminde yumuşakça paylaşım iyileştirir.. Sessizlikte gelen işaretlere kulak ver.',
    reversed:
      'Ters Başrahibe, aşırı gizlenme duvar örer. Güvenli alan seçip içindekileri kademeli aç.\n\nBelirti: İç ses–paylaşım dengesini kur.',
    keywords: ['sezgi', 'bilgelik', 'giz', 'paylaşım', 'sükunet'],
    context:
      'Tavsiyen; iç pusulanı onurlandırırken iletişim köprüsünü diri tutmak. Küçük ve güvenli açıklıklar samimiyeti büyütür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ra_pos4',
    card: 'The Empress',
    position: 4,
    upright:
      'İmparatoriçe, önce kendini besle, sonra sevgini cömertçe paylaştır. Şefkat kök salar, acele etme.. Öz bakım, sevginin yakıtıdır.',
    reversed:
      'Ters İmparatoriçe, aşırı sahiplenme ve tükenişe dikkat çekiyor. Paylaşmayı dengeli kıl, nefeslen.\n\nBelirti: “Dur–yenilen–devam et” ritmi.',
    keywords: ['şefkat', 'bolluk', 'öz bakım', 'besleme', 'köklenme'],
    context:
      'Tavsiyen; sevgi verirken depo doldurmayı unutmamak. Nazik ritüeller ve bedenine iyi gelen rutinler, ilişkinin sıcaklığını kalıcı kılar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ra_pos4',
    card: 'The Emperor',
    position: 4,
    upright:
      'İmparator, net sınırlar ve yumuşak yapı kurmanı ister. Düzen güven duygunu besler.. Kural değil, anlaşma dili.',
    reversed:
      'Ters İmparator, katılığı gevşetmeni hatırlatır. Esneklik yakınlığı büyütür.\n\nBelirti: “Nasıl”da yumuşama.',
    keywords: ['sınır', 'düzen', 'güven', 'istikrar', 'esneklik'],
    context:
      'Tavsiyen; çerçeve koyarken kalbi kapatmamak. Adil iş bölümü ve açık takvim, sürtünmeyi azaltır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ra_pos4',
    card: 'The Hierophant',
    position: 4,
    upright:
      'Aziz, değerlerinle uyumlu küçük ritüeller kur. Onay ihtiyacını iç rehberinle dengele.. Sadelik kutsaldır.',
    reversed:
      'Ters Aziz, kör geleneği ya da kör başkaldırıyı bırak. Sana uyanın ölçüsünü bul.\n\nBelirti: “Neden”inle hizalan.',
    keywords: ['değer', 'ritüel', 'uyum', 'rehberlik', 'özgünlük'],
    context:
      'Tavsiyen; görünmez kuralları görünür konuşmak. “Bizim kuralımız” ortak güveni büyütür.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ra_pos4',
    card: 'The Lovers',
    position: 4,
    upright:
      'Aşıklar, değerde buluş ve net bir “evet” seç. Kalbinin pusulasını birlikte çiz.. Küçük ama tutarlı evetler.',
    reversed:
      'Ters Aşıklar, kararsızlığı sonsuza dek sürdürme. Seçim, iyileşmenin kapısı.\n\nBelirti: Kriterleri yaz–seç.',
    keywords: ['seçim', 'değer', 'uyum', 'karar', 'bağ'],
    context:
      'Tavsiyen; ortak hedefi sadeleştirip görünür kılmak. Ufacık ortak kazanımlar güveni üst üste dizer.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ra_pos4',
    card: 'The Chariot',
    position: 4,
    upright:
      'Savaş Arabası, rotayı netleştir ve direksiyonu birlikte tut. Hızın kalbin ritmiyle uyumlu olsun.. Haftalık minik hedefler.',
    reversed:
      'Ters Savaş Arabası, savrulmayı durdur, öncelikleri sadeleştir. Az şey, iyi yapılır.\n\nBelirti: Fazlalıkları bırak.',
    keywords: ['yön', 'ivme', 'odak', 'disiplin', 'uyum'],
    context:
      'Tavsiyen; ortak takvim ve şeffaf plan. Aynı sayfa, aynı ritim—gerisi akıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ra_pos4',
    card: 'Strength',
    position: 4,
    upright:
      'Güç, nazik cesaretini devreye al. Yumuşak ton kapıları açar.. Nefes al–adlandır–yumuşat.',
    reversed:
      'Ters Güç, tetiklenmede bekle, küçük mola al. Gurur değil, şefkat kazandırır.\n\nBelirti: 10 saniye kuralı.',
    keywords: ['şefkat', 'sabır', 'cesaret', 'öz düzen', 'naziklik'],
    context:
      'Tavsiyen; duygu yükselince hızını düşürmek. Şefkatli sınırlar ilişkiye güç verir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ra_pos4',
    card: 'The Hermit',
    position: 4,
    upright:
      'Ermiş, iç sesi duymak için küçük inzivalar önerir. Sonra öğrendiğini paylaş.. “Ben neye ihtiyaç duyuyorum?” sorusu.',
    reversed:
      'Ters Ermiş, aşırı izolasyondan çık. Seçici açıklık sıcaklığı geri getirir.\n\nBelirti: Haftada bir “derin sohbet”.',
    keywords: ['içe dönüş', 'bilgelik', 'paylaşım', 'alan', 'denge'],
    context:
      'Tavsiyen; yalnızlık ve yakınlık arasında bilinçli salınım. İç ışığını getir, birlikte aydınlanın.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ra_pos4',
    card: 'The Wheel of Fortune',
    position: 4,
    upright:
      'Kader Çarkı, döngüyü fark et ve küçük bir farklı seçim yap. Zaman seninle.. “Aynı yerde başka tepki”.',
    reversed:
      'Ters Çark, direnç yerine merak dene. Mikroadım, makro değişimi başlatır.\n\nBelirti: Tekrarda bilinçli mola.',
    keywords: ['döngü', 'zamanlama', 'değişim', 'esneklik', 'akış'],
    context:
      'Tavsiyen; kalıp tepkiyi yumuşatıp ritmi yeniden ayarlamak. Döngü farkındalığı huzur verir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ra_pos4',
    card: 'Justice',
    position: 4,
    upright:
      'Adalet, şeffaflık ve adil iş bölümü çağırır. Hesap verebilir dil güven kurar.. “Ben–sen değil, konu–çözüm”.',
    reversed:
      'Ters Adalet, çifte standartları bırak, telafi öner. Eşitlik hissi yarayı kapatır.\n\nBelirti: Küçük ve zamanında özür.',
    keywords: ['adalet', 'denge', 'şeffaflık', 'telafi', 'sorumluluk'],
    context:
      'Tavsiyen; roller ve beklentileri yazıp güncellemek. Netlik, kırgınlığı eritir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ra_pos4',
    card: 'The Hanged Man',
    position: 4,
    upright:
      'Asılan Adam, perspektifi değiştir. Kısa bir duruş yeni anlam getirir.. “Onun gözünden” egzersizi.',
    reversed:
      'Ters Asılan Adam, kurban hikâyesini bırak. Gönüllü minik fedalar akışı yumuşatır.\n\nBelirti: Erteleme yerine mikro adım.',
    keywords: ['perspektif', 'teslimiyet', 'feda', 'farkındalık', 'akış'],
    context:
      'Tavsiyen; önce anla, sonra anlat. Bekleyişi bilinçli kılmak huzur verir.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ra_pos4',
    card: 'Death',
    position: 4,
    upright:
      'Ölüm, bitene saygı duy ve yer aç. Dönüşüm şefkatle ilerler.. Kapanış ritüeli.',
    reversed:
      'Ters Ölüm, direnci fark et ve yumuşakça bırak. Hafiflik yeniyi çağırır.\n\nBelirti: Veda cümlesi–yeni niyet.',
    keywords: ['dönüşüm', 'bırakma', 'yenilenme', 'kapanış', 'doğuş'],
    context:
      'Tavsiyen; eski kabuğu soyup ruhuna nefes açmak. Küçük vedalar büyük alan yaratır.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ra_pos4',
    card: 'Temperance',
    position: 4,
    upright:
      'Denge, dozu ayarla ve karışımı nazikçe yap. Orta yol, kalbi sakinleştirir.. Yavaş–az–sık.',
    reversed:
      'Ters Denge, uçlardan dön ve ritmi küçült. Tutarlılık huzur getirir.\n\nBelirti: “%80 iyi yeter”.',
    keywords: ['denge', 'ölçü', 'sentez', 'sabır', 'şifa'],
    context:
      'Tavsiyen; hız, ton ve süreyi kalbin nabzına uydurmak. Kalibrasyon, çatışmayı çözer.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ra_pos4',
    card: 'The Devil',
    position: 4,
    upright:
      'Şeytan, tetikleyicini isimlendir ve sınır koy. Özgür iraden, en büyük ilacın.. Tetik günlüğü tut.',
    reversed:
      'Ters Şeytan, zinciri halkadan çöz. Küçük bir hayır, büyük bir özgürlüktür.\n\nBelirti: Tetikte mola–yön değişimi.',
    keywords: ['sınır', 'özgürlük', 'gölge', 'tetik', 'farkındalık'],
    context:
      'Tavsiyen; kontrol oyunlarından çekilmek ve şeffaf anlaşma kurmak. Işık gölgeyi eritir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ra_pos4',
    card: 'The Tower',
    position: 4,
    upright:
      'Kule, çürük taşı çek ve gerçeği onurlandır. Yıkım arınmadır.. “Şu andaki hakikat nedir?” sorusu.',
    reversed:
      'Ters Kule, ertelenen patlamayı bilinçle boşalt. Kademeli sök–yeniden kur.\n\nBelirti: Krizi randevuyla konuş.',
    keywords: ['hakikat', 'yıkım', 'arınma', 'temel', 'yeniden inşa'],
    context:
      'Tavsiyen; sarsıntıyı düşman değil, fırsat görmek. Sonrasında sade ve sağlam bir zemin kur.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ra_pos4',
    card: 'The Star',
    position: 4,
    upright:
      'Yıldız, umudu besle ve sadeleş. Şeffaf bir niyet, kalbi ferahlatır.. Şükran listesi.',
    reversed:
      'Ters Yıldız, tükenmişliği minik sevinçlerle çöz. Işığı ritüelle çağır.\n\nBelirti: Günde 1 şifa anı.',
    keywords: ['umut', 'şifa', 'sadelik', 'ilham', 'yenilenme'],
    context:
      'Tavsiyen; az ama öz iyi geleni artırmak. Umut kası, nazik tekrarlarla güçlenir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ra_pos4',
    card: 'The Moon',
    position: 4,
    upright:
      'Ay, korku yerine sezgiyi seç. Sis, yavaş sorularla dağılır.. “Kanıtım ne?” kontrolü.',
    reversed:
      'Ters Ay, varsayımı doğrula, belirsizliği küçült. Netlik güveni büyütür.\n\nBelirti: 24 saat kuralı—önce sor, sonra karar.',
    keywords: ['sezgi', 'belirsizlik', 'korku', 'aydınlanma', 'netlik'],
    context:
      'Tavsiyen; karanlıkta acele hüküm vermemek. Nazik sorular, doğru ışığı getirir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ra_pos4',
    card: 'The Sun',
    position: 4,
    upright:
      'Güneş, otantik sevincini paylaş. Sıcak görünürlük yakınlığı güçlendirir.. Küçük zaferi birlikte kutla.',
    reversed:
      'Ters Güneş, “iyimiş gibi” maskesini bırak. Gerçek sevinç, gerçeği kabulden doğar.\n\nBelirti: İçten teşekkür.',
    keywords: ['sevinç', 'otantiklik', 'netlik', 'paylaşım', 'görünürlük'],
    context:
      'Tavsiyen; iyi olanı büyütmek ama süslememek. İçtenlik güvenin güneşidir.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ra_pos4',
    card: 'Judgement',
    position: 4,
    upright:
      'Mahkeme, geçmişle şefkatle yüzleş ve çağrıya cevap ver. Affediş kapı açar.. “Bundan ne öğrendim?”',
    reversed:
      'Ters Mahkeme, aşırı öz yargıyı bırak. Sorumluluk + merhamet = yenilenme.\n\nBelirti: Hafifletici öz–şefkat.',
    keywords: ['yüzleşme', 'affediş', 'yenilenme', 'çağrı', 'özgürleşme'],
    context:
      'Tavsiyen; dosyaları kapatmak ve öğrenilmişi entegre etmek. Yeni sayfa, temiz niyet ister.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ra_pos4',
    card: 'The World',
    position: 4,
    upright:
      'Dünya, döngüyü kapat ve kutla. Bütünlük yeni aşamayı davet eder.. Tamamlananı görünür kıl.',
    reversed:
      'Ters Dünya, eksik ucu bağla; yarım kalmışlık enerjiyi düşürür. Entegrasyon huzurdur.\n\nBelirti: “Ne eksik?” kontrol listesi.',
    keywords: ['tamamlanma', 'bütünlük', 'entegrasyon', 'kutlama', 'eşik'],
    context:
      'Tavsiyen; biteni bitirmek ve emeği onurlandırmak. Kutlama, sürekliliği besler.',
    group: 'Majör Arkana',
  },

  // CUPS (Kupalar)
  // KUPALAR (14) — 4. Pozisyon: Tavsiyeler (büşbüş stili, ra)
  {
    id: 'ace_of_cups_ra_pos4',
    card: 'Ace of Cups',
    position: 4,
    upright:
      'Kupa Ası, kalbini nazikçe aç ve duygunu su gibi akıt der. Küçük bir şefkat jesti bile gölü berraklaştırır.. Duyguyu somut bir cümleye dök.',
    reversed:
      'Ters Kupa Ası, tıkanmış musluğu yumuşak ısıyla açmanı ister. Önce kendine şefkat, sonra dışa akış.\n\nBelirti: Günde bir “nasılım?” check-in’i.',
    keywords: ['açılış', 'şefkat', 'ifade', 'akış', 'yumuşaklık'],
    context:
      'Tavsiyen; kırılganlığını küçücük bir paylaşımda görünür kılmak. Güvenli cümleler kalbe alan açar. Akış başlayınca yakınlık büyür.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ra_pos4',
    card: 'Two of Cups',
    position: 4,
    upright:
      'İki Kupa, kalp kalbe eşit bir köprü kur der. “Ben” ve “sen” dili yerine “biz” niyetini seç.. Küçük ritüel—haftalık minik randevu.',
    reversed:
      'Ters İki Kupa, teraziyi eşitlemek için beklentiyi yazdırır. Net sınır, sıcak bağı güçlendirir.\n\nBelirti: İhtiyaç–ricayı açık söyle.',
    keywords: ['karşılıklılık', 'uyum', 'ritüel', 'sınır', 'güven'],
    context:
      'Tavsiyen; görünmez anlaşmaları görünür kılmak. Eşit jest–emek dengesi bağın kalbini rahatlatır. Küçük ama tutarlı buluşmalar şifadır.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ra_pos4',
    card: 'Three of Cups',
    position: 4,
    upright:
      'Üç Kupa, neşeyi paylaş ve minik kutlamalarla bağı besle der. Dost desteği sevginin oksijenidir.. “Haftanın iyi anı” paylaşımı.',
    reversed:
      'Ters Üç Kupa, kalabalığın içinde yalnız kalmamayı öğütler. Kaliteli az sohbet, çok gürültüden iyidir.\n\nBelirti: Sosyal dozu bilinçli ayarla.',
    keywords: ['kutlama', 'topluluk', 'neşe', 'paylaşım', 'destek'],
    context:
      'Tavsiyen; birlikte gülmek ve minneti dillendirmek. Seçici sosyallik enerjini korur. Kaliteli birlikte-zaman yakınlığı derinleştirir.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ra_pos4',
    card: 'Four of Cups',
    position: 4,
    upright:
      'Dört Kupa, kalbin dalgınken önündeki iyiyi fark et der. Şükran, donuk camı buğudan arındırır.. Günlük 3 şükran notu.',
    reversed:
      'Ters Dört Kupa, uykudan uyanır gibi tazelenmeni çağırır. Minik bir “evet” motivasyonu canlandırır.\n\nBelirti: Tek bir yeni mikro alışkanlık.',
    keywords: ['farkındalık', 'şükran', 'uyanış', 'motivasyon', 'odak'],
    context:
      'Tavsiyen; odağını eksikten iyi olana kaydırmak. Küçük fark edişler duygu tonunu yükseltir. Kalp canlılıkla akışa girer.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ra_pos4',
    card: 'Five of Cups',
    position: 4,
    upright:
      'Beş Kupa, yası onurlandırıp kalan iki kupaya dön der. Gözyaşı toprağı yumuşatır.. “Ne kaybettim / ne kaldı?” yazısı.',
    reversed:
      'Ters Beş Kupa, affedişi minik adımlarla davet et der. Suçluluk değil şefkat iyileştirir.\n\nBelirti: Kendine nazik bir telafi.',
    keywords: ['yas', 'kabul', 'affediş', 'şifa', 'umut'],
    context:
      'Tavsiyen; geçmişe saygı, şimdiye şefkat. Kalanı görüp tutmak kalbe güç verir. Umut, küçük adımlarla gelir.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ra_pos4',
    card: 'Six of Cups',
    position: 4,
    upright:
      'Altı Kupa, iç çocuğuna sıcak bir selam ver der. Saf oyun kalbi yumuşatır.. Bir “çocukluk neşesi”ni bugüne taşı.',
    reversed:
      'Ters Altı Kupa, geçmişe saplanmayı bırak der. Anıyı kutsa, yönü bugüne çevir.\n\nBelirti: “Şimdi ve burada” egzersizi.',
    keywords: ['nostalji', 'iç çocuk', 'neşe', 'şefkat', 'şimdi'],
    context:
      'Tavsiyen; anıyı ilham, bugünü sahne yapmak. Oyun ve şefkat ilişkide sıcak zemin kurar. Şimdiye dönen kalp huzur bulur.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ra_pos4',
    card: 'Seven of Cups',
    position: 4,
    upright:
      'Yedi Kupa, hayali sev ama seçimi netleştir der. Ölçüt yoksa sis dağılmaz.. 3 kriter + 1 küçük karar.',
    reversed:
      'Ters Yedi Kupa, seçenek yorgunluğunu sadeleştir der. Tek niyet, tek adım huzur verir.\n\nBelirti: “Şimdi ne seçiyorum?” sorusu.',
    keywords: ['seçim', 'netlik', 'vizyon', 'öncelik', 'karar'],
    context:
      'Tavsiyen; hayalden gerçeğe köprü kurmak. Az seçenek, derin ilerleme. Netlik kalbi sakinleştirir.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ra_pos4',
    card: 'Eight of Cups',
    position: 4,
    upright:
      'Sekiz Kupa, değeri tükenen ritüelden zarafetle ayrıl der. Anlama sadakat, şekle değil.. Kapanış cümlesi yaz.',
    reversed:
      'Ters Sekiz Kupa, git-kal salınımını netleştir der. Deneme süresi ve geri bildirimle karar olgunlaşır.\n\nBelirti: Tarihli mikro anlaşma.',
    keywords: ['anlam', 'ayrılış', 'kapanış', 'dürüstlük', 'yön'],
    context:
      'Tavsiyen; kalbini hafifleten yöne yürümek. Şefkatli vedalar yeniye alan açar. Dürüstlük en güvenli haritadır.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ra_pos4',
    card: 'Nine of Cups',
    position: 4,
    upright:
      'Dokuz Kupa, küçük dileklerini görünür kıl ve kutla der. Paylaşılan sevinç çoğalır.. Haftalık “mini başarı” ritüeli.',
    reversed:
      'Ters Dokuz Kupa, vitrinden gerçeğe dön der. Derin doyum, değerle hizadan gelir.\n\nBelirti: Haz–değer kontrolü.',
    keywords: ['tatmin', 'minnet', 'kutlama', 'değer', 'doyum'],
    context:
      'Tavsiyen; olanı takdir edip içten sevinmek. Değerle uyumlu hedefler kalıcı mutluluk verir. Kalp sakin ve tok hisseder.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ra_pos4',
    card: 'Ten of Cups',
    position: 4,
    upright:
      'On Kupa, ev duygunu besleyen sade ritüeller kur der. Sahicilik huzurun mayasıdır.. Haftada bir ortak “şükür anı”.',
    reversed:
      'Ters On Kupa, tabloyu cilalamayı bırak der. Konuşulmamış küçük çatlakları şefkatle onarın.\n\nBelirti: “Ben böyle hissediyorum” cümlesi.',
    keywords: ['uyum', 'aile', 'sadelik', 'sahicilik', 'huzur'],
    context:
      'Tavsiyen; fotoğraf değil duyguya odaklanmak. Şeffaf sohbetler güveni büyütür. Huzur, gerçeklikle yan yana yürür.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ra_pos4',
    card: 'Page of Cups',
    position: 4,
    upright:
      'Kupa Prensi, ilhamı oyuna çevir der. Küçük bir yaratıcı jest kalbi tazeler.. El yazısı minik not.',
    reversed:
      'Ters Kupa Prensi, alınganlığı yumuşat ve duyguyu eyleme bağla der. Hayal, küçük plana ihtiyaç duyar.\n\nBelirti: 1 duygu → 1 adım.',
    keywords: ['ilham', 'oyun', 'ifade', 'hassasiyet', 'yaratıcılık'],
    context:
      'Tavsiyen; masum merakı eylemle beslemek. Küçük jestler büyük kapılar açar. Yüreğin hafifler, bağ neşelenir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ra_pos4',
    card: 'Knight of Cups',
    position: 4,
    upright:
      'Kupa Şövalyesi, romantizmi pratikle mühürle der. Sözünü takvimle güçlendir.. Jest + tarih + küçük plan.',
    reversed:
      'Ters Kupa Şövalyesi, uçup giden vaatleri bırak der. Az söz, tam icra güveni tazeler.\n\nBelirti: Sürdürülebilir jest.',
    keywords: ['romantizm', 'tutarlılık', 'jest', 'plan', 'güven'],
    context:
      'Tavsiyen; kalbin şiirini günlük hayata indirmek. Somutluk romantizmi kalıcı kılar. Güven sessizce büyür.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ra_pos4',
    card: 'Queen of Cups',
    position: 4,
    upright:
      'Kupa Kraliçesi, empatiyi temiz sınırla taçlandır der. Kendini de duy, onu da duy.. “Seni anlıyorum + ihtiyacım şu.”',
    reversed:
      'Ters Kupa Kraliçesi, duygusal taşmayı düzenle der. Şefkat önce içerden akar.\n\nBelirti: Günde 5 dak. duygu check-in.',
    keywords: ['empati', 'sınır', 'şefkat', 'öz bakım', 'alan tutma'],
    context:
      'Tavsiyen; şefkati kendinden başlatmak. Duygu hijyeni ilişkide berrak alan açar. Sınırlarla sevgi büyür.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ra_pos4',
    card: 'King of Cups',
    position: 4,
    upright:
      'Kupa Kralı, fırtınada sakin merkez ol der. Duyguyu sakince adlandırmak güven verir.. “Şu an şunu hissediyorum.”',
    reversed:
      'Ters Kupa Kralı, pasif-agresif dalgayı söze çevir der. İçte tutulan öfke nazik kanala ihtiyaç duyar.\n\nBelirti: Zamanlı ve açık ifade.',
    keywords: ['olgunluk', 'sükunet', 'duygu yönetimi', 'ifade', 'liderlik'],
    context:
      'Tavsiyen; dalga vursa da merkezde kalabilmek. Net ve yumuşak dil bağa emniyet hissi verir. Olgun duygu, ilişkide limandır.',
    group: 'Kupalar',
  },

  // KILIÇLAR (14) — 4. Pozisyon: Tavsiyeler (büşbüş stili, ra)
  {
    id: 'ace_of_swords_ra_pos4',
    card: 'Ace of Swords',
    position: 4,
    upright:
      'Kılıç Ası, sisin içinde net bir kelime seç der. Doğru cümle kalbi hizalar.. “Tek net cümle” pratiği.',
    reversed:
      'Ters Kılıç Ası, bulanıklığı sadeleştir der. Fazla analiz kalbi yorar.\n\nBelirti: Not al–özetle–paylaş.',
    keywords: ['netlik', 'hakikat', 'doğruluk', 'ifade', 'aydınlanma'],
    context:
      'Tavsiyen; zihni berraklaştırmak ve tek bir niyet cümlesiyle ilerlemek. Hakikate tutunmak kalbi sakinleştirir.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ra_pos4',
    card: 'Two of Swords',
    position: 4,
    upright:
      'İki Kılıç, ertelediğin seçime küçük bir adım at der. Karar kalbi rahatlatır.. “Artılar–eksiler” listesi.',
    reversed:
      'Ters İki Kılıç, kaçındığın yüzleşmeye ışık tut der. Kör nokta açıldığında huzur gelir.\n\nBelirti: Net soruyla diyalog.',
    keywords: ['karar', 'ikilem', 'denge', 'yüzleşme', 'netlik'],
    context:
      'Tavsiyen; seçim düğümünü çözmek için minik adımlar atmak. Karar, kalbin yükünü hafifletir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ra_pos4',
    card: 'Three of Swords',
    position: 4,
    upright:
      'Üç Kılıç, acıyı gör ve adını koy der. Kalp kırığı konuşuldukça şifalanır.. “Şu anda şunu hissediyorum.”',
    reversed:
      'Ters Üç Kılıç, yara kabuk bağlamak üzere. Şefkatli dil, kapanışı hızlandırır.\n\nBelirti: Affedişe küçük adım.',
    keywords: ['kırgınlık', 'hakikat', 'yas', 'şifa', 'ifade'],
    context:
      'Tavsiyen; kalbin yarasını saklamadan paylaşmak. Açıklık ve şefkat, yarayı inceltir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ra_pos4',
    card: 'Four of Swords',
    position: 4,
    upright:
      'Dört Kılıç, zihne mola ver der. Dinlenmek stratejiyi berraklaştırır.. 10 dak. sessizlik.',
    reversed:
      'Ters Dört Kılıç, mola direnci yerine mikro aralar koy der. Yorgunluk kalbi sertleştirir.\n\nBelirti: Nefes–duruş–devam.',
    keywords: ['dinlenme', 'strateji', 'sükunet', 'toparlanma', 'huzur'],
    context:
      'Tavsiyen; sessizlikle zihni boşaltmak. Küçük molalar, kalbe güvenli alan yaratır.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ra_pos4',
    card: 'Five of Swords',
    position: 4,
    upright:
      'Beş Kılıç, haklılık yarışını bırak der. Köprüleri korumak kazancın özüdür.. “Kazan-kazan” bakışı.',
    reversed:
      'Ters Beş Kılıç, onarım için fırsat sunar. Telafi jesti bağı iyileştirir.\n\nBelirti: Küçük özür, büyük etki.',
    keywords: ['çatışma', 'ego', 'onarım', 'haklılık', 'telafi'],
    context:
      'Tavsiyen; haklı olmaktan çok bağ kurmaya odaklanmak. Alçak gönüllülük bağı onarır.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ra_pos4',
    card: 'Six of Swords',
    position: 4,
    upright:
      'Altı Kılıç, sakin sulara geç der. Küçük mesafe huzuru geri getirir.. “Bugün bir nefeslik ara.”',
    reversed:
      'Ters Altı Kılıç, geçmiş bağları gevşet der. Hafifledikçe yön netleşir.\n\nBelirti: Vedalaşma ritüeli.',
    keywords: ['geçiş', 'sükunet', 'rota', 'hafiflik', 'ilerleme'],
    context:
      'Tavsiyen; yükleri bırakıp sakin rotaya yönelmek. Geçiş süreci kalbe huzur verir.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ra_pos4',
    card: 'Seven of Swords',
    position: 4,
    upright:
      'Yedi Kılıç, stratejini temiz niyetle kur der. Şeffaflık güvenin köprüsüdür.. Planı paylaş.',
    reversed:
      'Ters Yedi Kılıç, yarım gerçeği bırak der. Açıklık huzur getirir.\n\nBelirti: “Benim niyetim şu” cümlesi.',
    keywords: ['strateji', 'dürüstlük', 'plan', 'güven', 'niyet'],
    context:
      'Tavsiyen; aklındaki planı saklamadan paylaşmak. Dürüstlük bağı güçlendirir.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ra_pos4',
    card: 'Eight of Swords',
    position: 4,
    upright:
      'Sekiz Kılıç, zincir sandığın inancı fark et der. Küçük kanıt özgürleştirir.. “Gerçekten engel mi?” sorgusu.',
    reversed:
      'Ters Sekiz Kılıç, çözülmeye izin ver der. Destek al, ipler gevşer.\n\nBelirti: Tek bir adım özgürlük.',
    keywords: ['öz-kısıt', 'inanç', 'özgürlük', 'korku', 'farkındalık'],
    context:
      'Tavsiyen; zihinsel zincirleri fark edip küçücük kanıtlarla gevşetmek. İnanç değişirse kalp açılır.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ra_pos4',
    card: 'Nine of Swords',
    position: 4,
    upright:
      'Dokuz Kılıç, kaygını yaz ve görünür kıl der. Gece büyüyen gölge, gün ışığında küçülür.. “Endişe listesi” tekniği.',
    reversed:
      'Ters Dokuz Kılıç, sabahın netliğini kullan der. Küçük zaferler kaygıyı eritir.\n\nBelirti: Günün ilk ışığında minik niyet.',
    keywords: ['kaygı', 'endişe', 'yazma', 'netlik', 'şifa'],
    context:
      'Tavsiyen; korkularını kâğıda döküp düzenlemek. Netlik kalbi huzura taşır.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ra_pos4',
    card: 'Ten of Swords',
    position: 4,
    upright:
      'On Kılıç, bitişi onurlandır der. Yeni başlangıç için kapanış şart.. Veda ritüeli.',
    reversed:
      'Ters On Kılıç, toparlanma başlıyor. Hafifletilmiş niyet yeniye kapı açar.\n\nBelirti: “Bitti ve iyi ki oldu.”',
    keywords: ['bitiş', 'yenilenme', 'teslimiyet', 'vedalaşma', 'doğuş'],
    context:
      'Tavsiyen; eski döngüyü şefkatle kapatmak. Kapanış kalbe nefes açar.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ra_pos4',
    card: 'Page of Swords',
    position: 4,
    upright:
      'Kılıç Prensi, merakını bilgeliğe çevir der. Sorular köprü kurar.. “Bugün yeni ne öğrendim?”',
    reversed:
      'Ters Kılıç Prensi, dedikoduya değil kaynağa yönel der. Gerçeklik güveni besler.\n\nBelirti: Kaynak kontrolü.',
    keywords: ['merak', 'öğrenme', 'iletişim', 'soru', 'gözlem'],
    context:
      'Tavsiyen; merakını yapıcı sorulara çevirmek. Net öğrenme bağa güç katar.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ra_pos4',
    card: 'Knight of Swords',
    position: 4,
    upright:
      'Kılıç Şövalyesi, hızını niyetle hizala der. Net savunu kalbi rahatlatır.. Nefes–konuş–dinle döngüsü.',
    reversed:
      'Ters Kılıç Şövalyesi, acele sözleri yavaşlat der. Sertlik yerine sakinlik seç.\n\nBelirti: 3 saniye kuralı.',
    keywords: ['hız', 'savunma', 'ifade', 'netlik', 'denge'],
    context: 'Tavsiyen; söylemeden önce nefes almak. Sakin hız bağı korur.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ra_pos4',
    card: 'Queen of Swords',
    position: 4,
    upright:
      'Kılıç Kraliçesi, net sınır ve berrak ifade çağırır. Serin akıl, adil karar verir.. “Ben dili” kullan.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştiriyi yumuşat der. Şefkatli söz en etkili silahtır.\n\nBelirti: Geri bildirim + empati.',
    keywords: ['netlik', 'sınır', 'adalet', 'iletişim', 'nesnellik'],
    context:
      'Tavsiyen; açık ama şefkatli ifade kullanmak. Netlik kalbi hafifletir, güveni büyütür.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ra_pos4',
    card: 'King of Swords',
    position: 4,
    upright:
      'Kılıç Kralı, ilkelerine sadık kal ama empatiyi unutma der. Stratejik akıl güven kurar.. “İlke + kalp” formülü.',
    reversed:
      'Ters Kılıç Kralı, katılığı gevşet der. Dinlemek gücün en nazik hali.\n\nBelirti: Önce sor–sonra yönlendir.',
    keywords: ['ilke', 'strateji', 'otorite', 'empati', 'adalet'],
    context:
      'Tavsiyen; aklı kalple dengelemek. İlkelerle birlikte şefkat güven yaratır.',
    group: 'Kılıçlar',
  },

  // WANDS (Asalar)
  // ASALAR (14) — 4. Pozisyon: Tavsiyeler (büşbüş stili, ra)
  {
    id: 'ace_of_wands_ra_pos4',
    card: 'Ace of Wands',
    position: 4,
    upright:
      'Değnek Ası, ilham kıvılcımını hemen küçük bir eyleme çevir der. Ateşin yön bulması için minik bir adım yeter.',
    reversed:
      'Ters Değnek Ası, tıkanmış hevesi ritüelle uyandır der. Küçük ve tutarlı tekrarlar alevi büyütür.',
    keywords: ['ilham', 'başlangıç', 'enerji', 'cesaret', 'ritüel'],
    context:
      'Tavsiyen; beklemek yerine minik bir hareketle akışı açmak. Erteleme alevi söndürür; ritimse büyütür. Ateşin yönü niyetinle netleşir.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ra_pos4',
    card: 'Two of Wands',
    position: 4,
    upright:
      'İki Değnek, ufku netleştir ve güvenli kıyıdan bir adım dışarı çık der. Vizyon haritası cesareti besler.',
    reversed:
      'Ters İki Değnek, sonsuz plan–sıfır adım döngüsünü kır der. Pilot deneme, korkuyu küçültür.',
    keywords: ['vizyon', 'plan', 'ufuk', 'risk', 'pilot'],
    context:
      'Tavsiyen; hayali somutlaştırıp ölçeklenebilir denemeler yapmak. Küçük keşifler güven inşa eder. Ufka bakarken ayağın yerde kalsın.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ra_pos4',
    card: 'Three of Wands',
    position: 4,
    upright:
      'Üç Değnek, hazırlığını görünür hedeflerle eşleştir der. Koordinasyon ufku yakınlaştırır.',
    reversed:
      'Ters Üç Değnek, gecikme algısını plan revizyonuyla dönüştür der. Esnek takvim umut üretir.',
    keywords: ['genişleme', 'zamanlama', 'koordinasyon', 'işbirliği', 'hedef'],
    context:
      'Tavsiyen; süreci şeffaflaştırıp küçük teslimlere bölmek. Ufka giden yol küçük istasyonlarla kısalır. Uyum, ivmeyi korur.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ra_pos4',
    card: 'Four of Wands',
    position: 4,
    upright:
      'Dört Değnek, sağlam temeli kutlama ritüeliyle pekiştir der. Eşikler sevgiyle sabitlenir.',
    reversed:
      'Ters Dört Değnek, törenden önce temeli güçlendir der. Sıralama barışı korur.',
    keywords: ['temel', 'kutlama', 'istikrar', 'aidiyet', 'eşik'],
    context:
      'Tavsiyen; eşiği bilinçle geçmek: önce temel, sonra tören. Küçük kutlamalar bağlılığı besler. Sağlam zemin huzur verir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ra_pos4',
    card: 'Five of Wands',
    position: 4,
    upright:
      'Beş Değnek, çatışmayı prova alanına taşı der. Kuralı olan tartışma üretkendir.',
    reversed:
      'Ters Beş Değnek, dağınık çekişmeyi tek konuya indir der. Fasilitasyon enerjiyi toplar.',
    keywords: ['çatışma', 'kural', 'netlik', 'fasilitasyon', 'odak'],
    context:
      'Tavsiyen; müsabakayı işbirliğine çevirmek. Çerçeve, saygıyı korur. Net oyun alanı, kıvılcımı ısıya dönüştürür.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ra_pos4',
    card: 'Six of Wands',
    position: 4,
    upright:
      'Altı Değnek, görünmeyen emeği görünür kıl ve zaferi paylaş der. Takdir, motivasyonun yakıtıdır.',
    reversed:
      'Ters Altı Değnek, alkış dengesini eşitle der. Adil görünürlük kırgınlığı eritir.',
    keywords: ['takdir', 'görünürlük', 'zafer', 'motivasyon', 'adalet'],
    context:
      'Tavsiyen; hikâyeyi birlikte yazmak. Küçük teşekkürler büyük güven üretir. Alkışın adaleti kalpleri yumuşatır.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ra_pos4',
    card: 'Seven of Wands',
    position: 4,
    upright:
      'Yedi Değnek, sınırını nazikçe ama net tut der. Tutarlılık en iyi savunmadır.',
    reversed:
      'Ters Yedi Değnek, yalnız savaşma der. Destek istemek gücünü büyütür.',
    keywords: ['sınır', 'savunma', 'tutarlılık', 'destek', 'öncelik'],
    context:
      'Tavsiyen; mevzi tutarken yumuşak kalmak. Yardım istemek zayıflık değil bilgeliktir. Net öncelikler yorgunluğu azaltır.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ra_pos4',
    card: 'Eight of Wands',
    position: 4,
    upright:
      'Sekiz Değnek, mesajlarını sırala ve hızını senkronla der. Net akış yanlış anlamayı eritir.',
    reversed:
      'Ters Sekiz Değnek, karmaşayı yavaşlat ve bekleyen konuşmaları randevula der.',
    keywords: ['hız', 'iletişim', 'senkron', 'akış', 'sıralama'],
    context:
      'Tavsiyen; hızın dozunu akılla ayarlamak. Az kanal, çok netlik demektir. Senkron, bağı rahatlatır.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ra_pos4',
    card: 'Nine of Wands',
    position: 4,
    upright:
      'Dokuz Değnek, dayan ama körleşme der. Küçük molalar direncini tazeler.',
    reversed:
      'Ters Dokuz Değnek, eski yaraların tetiklerini tanı ve regülasyon planı kur der.',
    keywords: ['dayanıklılık', 'mola', 'tetik', 'regülasyon', 'koruma'],
    context:
      'Tavsiyen; tetikte kalırken yumuşak kalabilmek. Mola, duvarı indirir; esneklik gücü çoğaltır. Şefkatli koruma şifadır.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ra_pos4',
    card: 'Ten of Wands',
    position: 4,
    upright:
      'On Değnek, yükünü hafiflet ve öncelik temizliği yap der. Delege etmek sevgidir.',
    reversed:
      'Ters On Değnek, bitmesi gerekeni taşımayı bırak der. Sadelik nefes açar.',
    keywords: ['yük', 'öncelik', 'delege', 'sadelik', 'tamamlama'],
    context:
      'Tavsiyen; sırtındaki gereksizleri indirmek. Az ama öz, kaliteyi artırır. Boşalan alan yakınlığı büyütür.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ra_pos4',
    card: 'Page of Wands',
    position: 4,
    upright:
      'Değnek Prensi, merakı deneye çevir der. Küçük keşifler büyük ufuklar açar.',
    reversed:
      'Ters Değnek Prensi, yarım bıraktıklarını mini sprintle kapat der. Bitiricilik güven üretir.',
    keywords: ['keşif', 'heves', 'öğrenme', 'odak', 'bitiricilik'],
    context:
      'Tavsiyen; oyun gibi denemek ve öğrendiklerini paylaşmak. Dikkatini tek kıvılcıma topla, alevi izle. Bitirmek en tatlı motivasyondur.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ra_pos4',
    card: 'Knight of Wands',
    position: 4,
    upright:
      'Değnek Şövalyesi, cesaretini stratejiyle evlendir der. Hızın yönü olursa güven olur.',
    reversed:
      'Ters Değnek Şövalyesi, savruk alevi taahhüt mimarisiyle dizginle der.',
    keywords: ['hız', 'atılganlık', 'taahhüt', 'strateji', 'ivme'],
    context:
      'Tavsiyen; spontane enerjiyi planla çerçevelemek. İvmeyi sürdüren, sözün ağırlığıdır. Cesaret + yapı = güven.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ra_pos4',
    card: 'Queen of Wands',
    position: 4,
    upright:
      'Değnek Kraliçesi, ışığını saklama ve kendine inanan duruşla görün der. Karizma destek ister, kıyas değil.',
    reversed:
      'Ters Değnek Kraliçesi, dış onay yerine öz-değerine köklen der. Kıskanç gölgeyi şefkatle çöz.',
    keywords: ['özgüven', 'görünürlük', 'karizma', 'özdeğer', 'ilham'],
    context:
      'Tavsiyen; ışığını paylaşırken mütevazı kalmak. Kendine güvenin sıcaklığı başkalarını da ısıtır. İç onay en sağlam güneştir.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ra_pos4',
    card: 'King of Wands',
    position: 4,
    upright:
      'Değnek Kralı, vizyonunu stratejiyle destekle ve sorumluluk paylaş der. Liderlik ölçekle büyür.',
    reversed:
      'Ters Değnek Kralı, otoriterleşme riskini fark et ve dinleme kasını güçlendir der.',
    keywords: ['vizyon', 'liderlik', 'sorumluluk', 'strateji', 'dinleme'],
    context:
      'Tavsiyen; güçlü vizyonu paylaşırken empatiyi kaybetmemek. Dinleyen lider güven inşa eder. Strateji + kalp = bütünlük.',
    group: 'Asalar',
  },
];

// Kart adına göre pozisyon 4 anlamını bulma fonksiyonu
export const getPosition4Meaning = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
  return position4Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipAnalysisPosition4Meaning = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
  return getPosition4Meaning(cardName);
};

// Kart adına göre pozisyon 4 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipAnalysisPosition4MeaningByCardName = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
  const meaning = getPosition4Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 4 anlamlarını alma fonksiyonu
export const getAllPosition4Meanings =
  (): RelationshipAnalysisPositionMeaning[] => {
    return position4Meanings;
  };

// Pozisyon 4 anlamlarını filtreleme fonksiyonu
export const getPosition4MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipAnalysisPositionMeaning[] => {
  return position4Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 4 anlamlarını arama
export const searchPosition4MeaningsByKeyword = (
  keyword: string
): RelationshipAnalysisPositionMeaning[] => {
  return position4Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position4Meanings,
  getRelationshipAnalysisPosition4Meaning,
  getRelationshipAnalysisPosition4MeaningByCardName,
  getAllPosition4Meanings: getAllPosition4Meanings,
  getRelationshipAnalysisPosition4MeaningsByGroup: getPosition4MeaningsByGroup,
};
