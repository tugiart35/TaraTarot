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

// import { getRelationshipProblemsMeaningByCardAndPositionMeaning } from './position-meanings-index';
import { RelationshipProblemsPositionMeaning } from './position-meanings-index';

// 1. Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position4Meanings: RelationshipProblemsPositionMeaning[] = [
  // MAJÖR ARKANA
  // RELATIONSHIP CONFLICT — Pozisyon 4: 'Bu sorundaki payımı görmezden mi geliyorum?'
  // MAJOR ARCANA (22)
  {
    id: 'the_fool_rc_pos4',
    card: 'The Fool',
    position: 4,
    upright:
      'Joker, payını hafife alıp hevesle atılan adımların sonuçlarını görmezden gelme eğiliminde olabileceğini fısıldar. Açık niyet ve ufak bir plan, “benim de payım var” demeni kolaylaştırır.',
    reversed:
      'Ters Joker, sorumluluğu şansa ve akışa bırakıp suçu dışa yansıtma eğiliminin kuvvetlenebileceğini söyler. Kör noktayı kabul etmedikçe aynı döngü başa sarar.',
    keywords: [
      'kör nokta',
      'plansızlık',
      'inkâr',
      'öz farkındalık',
      'başlangıç',
    ],
    context:
      'Ne yoksayıyorum: plansız adımlarımın etkisi. İlişkiye etkisi: güven ve beklenti bulanır. Ne yapmalı: niyeti yaz, küçük taahhüt ver, takip et.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_rc_pos4',
    card: 'The Magician',
    position: 4,
    upright:
      'Büyücü, söz–eylem uyumsuzluğunu küçümseyip “niyetim iyiydi” kalkanının ardına saklanabileceğini söyler. İfade gücün gerçeği gölgelediğinde payını görmen zorlaşır.',
    reversed:
      'Ters Büyücü, algı yönetimi ve süslü sözlerle öz sorumluluktan kaçma refleksinin artabileceğini anlatır. Netlik yerine numara, inkârı besler.',
    keywords: ['iletişim', 'tutarlılık', 'öz sorumluluk', 'algı', 'dürüstlük'],
    context:
      'Ne yoksayıyorum: söylem–icra arası boşluk. Etki: güven erir, şüphe artar. Yap: sade konuş, kanıtlanabilir adım at.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_rc_pos4',
    card: 'The High Priestess',
    position: 4,
    upright:
      'Başrahibe, duygunu saklayıp “anlasın” beklentisiyle payını görmezden gelebileceğini söyler. İma dili, kendi katkını sisler.',
    reversed:
      'Ters Başrahibe, içe gömülüp susarak sorumluluğu görünmez kılma eğiliminin güçlenebileceğini anlatır. Saklanan her şey, inkârı besler.',
    keywords: ['giz', 'ima', 'ifade eksikliği', 'öz açıklık', 'sezgi'],
    context:
      'Ne yoksayıyorum: söylenmeyenlerin yükü. Etki: yakınlık kopar, şüphe büyür. Yap: duyguyu zamanında ve açık söyle.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_rc_pos4',
    card: 'The Empress',
    position: 4,
    upright:
      'İmparatoriçe, aşırı bakım ya da sahiplenmeyi “sevgi” diye meşrulaştırıp payını görmezden gelebileceğini söyler. İyi niyet doz aşımı boğuculuğa dönüşebilir.',
    reversed:
      'Ters İmparatoriçe, kıskançlık gölgesi ya da ihmalin etkisini küçümseme eğilimini gösterir. “Ben sadece iyi olmak istedim” kalıbı inkârı büyütür.',
    keywords: ['bakım', 'dozaj', 'sahiplenme', 'kıskançlık', 'öz bakım'],
    context:
      'Ne yoksayıyorum: doz kaçan ilgi/ihmal. Etki: özgürlük daralır, gücenme artar. Yap: ihtiyaçları birlikte kalibre et.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_rc_pos4',
    card: 'The Emperor',
    position: 4,
    upright:
      'İmparator, kuralcılığı “düzen” diye etiketleyip katılığı görmezden gelebileceğini söyler. Mikro yönetim, payını perdeleyebilir.',
    reversed:
      'Ters İmparator, kontrol ihtiyacını inkâr edip karşı tarafın hassasiyetini küçümseme eğilimini vurgular. Esneklik yoksa sorumluluk da görünmez olur.',
    keywords: ['kontrol', 'kural', 'esneklik', 'otorite', 'sınır'],
    context:
      'Ne yoksayıyorum: sert çerçevenin etkisi. Etki: saygı ve otonomi yıpranır. Yap: yetkiyi paylaş, esnet.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_rc_pos4',
    card: 'The Hierophant',
    position: 4,
    upright:
      'Aziz, gelenek ve aile normlarını “doğrusu bu” diye dayarken payını görmezden gelebileceğini söyler. Kalıp, kişisel sorumluluğu maskeleyebilir.',
    reversed:
      'Ters Aziz, kör gelenekçilik ya da kör başkaldırıyı gerekçelendirerek katkını inkâr etme eğilimini gösterir. Değer diyaloğu yoksa, pay da görünmez.',
    keywords: ['gelenek', 'norm', 'onay', 'değer', 'kalıp'],
    context:
      'Ne yoksayıyorum: norm dayatmasının bedeli. Etki: özgünlük ve uyum çatışır. Yap: birlikte kural yaz.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_rc_pos4',
    card: 'The Lovers',
    position: 4,
    upright:
      'Aşıklar, kararsızlığı “şartlar böyle” diye açıklayıp seçimlerinin etkisini küçümseyebileceğini söyler. İki tarafa da göz kırpmak payını perdeleyebilir.',
    reversed:
      'Ters Aşıklar, ikilik ve uyumsuz değerleri kabul etmeyip suçu koşullara atma eğilimini gösterir. Seçimsizlik de seçimin sorumluluğudur.',
    keywords: ['seçim', 'değer', 'kararsızlık', 'hizalanma', 'taahhüt'],
    context:
      'Ne yoksayıyorum: seçimimin bedeli. Etki: güven ve yön bulanır. Yap: açık evet/hayır ver.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_rc_pos4',
    card: 'The Chariot',
    position: 4,
    upright:
      'Savaş Arabası, hız ve yöntemi “başarmak lazım” diye savunup baskı etkini görmezden gelebileceğini söyler. Direksiyonu hep sende tutmak payını gizler.',
    reversed:
      'Ters Savaş Arabası, savrulmayı tesadüfe bağlayıp yön kaybındaki katkını inkâr etme eğilimini anlatır. Rota ortaklaşmadıkça sorumluluk görünmez.',
    keywords: ['hız', 'yöntem', 'kontrol', 'yön', 'odak'],
    context:
      'Ne yoksayıyorum: tempo/rota dayatması. Etki: motivasyon düşer, direnç artar. Yap: ritmi ortaklaştır.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_rc_pos4',
    card: 'Strength',
    position: 4,
    upright:
      'Güç, tetiklenince sertleşen tonu “haklı öfke” diye meşrulaştırıp katkını küçümseyebileceğini söyler. Yumuşak güç unutulduğunda payın görünmez olur.',
    reversed:
      'Ters Güç, kıskançlık/özgüven dalgalanmasını “ben böyleyim” diyerek inkâr etme eğilimini gösterir. Regülasyon yoksa sorumluluk da yok.',
    keywords: ['sabır', 'nazik güç', 'tetiklenme', 'öz düzenleme', 'şefkat'],
    context:
      'Ne yoksayıyorum: ton/duygu etkisi. Etki: yakınlık gerilir. Yap: nefes–ara–yeniden dene.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_rc_pos4',
    card: 'The Hermit',
    position: 4,
    upright:
      'Ermiş, içe çekilmeyi “alan ihtiyacı” diye anlatıp iletişim eksenindeki payını görmezden gelebileceğini söyler. Susmak, ihmal gibi okunabilir.',
    reversed:
      'Ters Ermiş, sağlıksız izolasyonu normalleştirip kaçınmayı inkâr etme eğilimini vurgular. Yalnız çözmeye çalışmak katkını perdeleyebilir.',
    keywords: ['mesafe', 'içe dönüş', 'kaçınma', 'paylaşım', 'rehberlik'],
    context:
      'Ne yoksayıyorum: anlatılmayan ihtiyaç. Etki: güven/aidiyet zayıflar. Yap: sebebiyle paylaş.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_rc_pos4',
    card: 'The Wheel of Fortune',
    position: 4,
    upright:
      'Kader Çarkı, tekrar eden kalıpları “şanssızlık” diye etiketleyip payını görmezden gelebileceğini söyler. Ders çıkarmadıkça tur yine gelir.',
    reversed:
      'Ters Kader Çarkı, kaderciliğe sığınıp değiştirilebilir kısmı inkâr etme eğilimini gösterir. Sorumluluk görünmez ise değişim gecikir.',
    keywords: ['döngü', 'alışkanlık', 'zamanlama', 'değişim', 'öğrenme'],
    context:
      'Ne yoksayıyorum: kendi payıma düşen döngü. Etki: umut ve ilerleme tıkanır. Yap: tek küçük fark yarat.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_rc_pos4',
    card: 'Justice',
    position: 4,
    upright:
      'Adalet, adil olmayan iş bölümünü “zaten ben yaparım” diyerek normalleştirip payını göremeyebileceğini söyler. Şeffaf hesap olmadan denge kurulmaz.',
    reversed:
      'Ters Adalet, hatayı görüp telafiyi geciktirme veya bahane ile savunma eğilimini vurgular. Öz sorumluluk reddi inkârı besler.',
    keywords: ['adalet', 'şeffaflık', 'hesap', 'telafi', 'denge'],
    context:
      'Ne yoksayıyorum: sorumluluk payım. Etki: güven aşınır. Yap: açık hesap + zamanında telafi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_rc_pos4',
    card: 'The Hanged Man',
    position: 4,
    upright:
      'Asılan Adam, ertelemeyi “zamana bırakmak” diye adlandırıp katkını küçümseyebileceğini söyler. Askıda kalmak da bir tercihtir.',
    reversed:
      'Ters Asılan Adam, kurban anlatısına sığınıp eylemi reddederek payını inkâr etme eğilimini işaret eder. Perspektif değişmeden sorumluluk görünmez.',
    keywords: ['erteleme', 'perspektif', 'atalet', 'fedakârlık', 'askı'],
    context:
      'Ne yoksayıyorum: karar kaçınmam. Etki: umut ve netlik erir. Yap: küçük/temiz karar al.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_rc_pos4',
    card: 'Death',
    position: 4,
    upright:
      'Ölüm, bitmesi gerekeni uzatmayı “sabır” sanıp payını görmezden gelebileceğini söyler. Eski kabuk dar geldikçe gerilim büyür.',
    reversed:
      'Ters Ölüm, vedayı reddedip değişimi inkâr etme eğilimini gösterir. Bırakmadan yenisi gelmez; bu da öz sorumluluktur.',
    keywords: ['bitiş', 'bırakma', 'dönüşüm', 'direnç', 'yenilenme'],
    context:
      'Ne yoksayıyorum: bırakmam gerekenler. Etki: tıkanma, yorgunluk. Yap: bilinçli kapanış ritüeli.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_rc_pos4',
    card: 'Temperance',
    position: 4,
    upright:
      'Denge, uçlara savrulmayı “ben buyum” diyerek meşrulaştırıp payını görmezden gelebileceğini söyler. Kalibrasyon eksikliği çatışmayı besler.',
    reversed:
      'Ters Denge, sabırsızlığı ve ya-hep-ya-hiç tutumunu inkâr etme eğilimini vurgular. Orta yol reddi, öz sorumluluğu görünmez kılar.',
    keywords: ['denge', 'ölçü', 'sentez', 'sabır', 'kalibrasyon'],
    context:
      'Ne yoksayıyorum: doz–tempo ayarım. Etki: huzur kaçar. Yap: orta yolu kur, ölçülü ol.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_rc_pos4',
    card: 'The Devil',
    position: 4,
    upright:
      'Şeytan, kıskançlık/bağımlılık kalıplarını “sevdiğim için” diye açıklayıp payını görmezden gelebileceğini söyler. Zincir, sevgi kılığına girebilir.',
    reversed:
      'Ters Şeytan, tetikleyicileri küçümseyip sınır ihlalini inkâr etme eğilimini anlatır. Yüzleşmeden özgürlük yok.',
    keywords: ['bağımlılık', 'kıskançlık', 'kontrol', 'sınır', 'gölge'],
    context:
      'Ne yoksayıyorum: toksik tetiklerim. Etki: güven ve özgürlük daralır. Yap: sınır ve destek iste.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_rc_pos4',
    card: 'The Tower',
    position: 4,
    upright:
      'Kule, gecikmiş hakikati “zamanı değildi” diyerek rasyonalize edip payını görmezden gelebileceğini söyler. Çatlak, erken onarım ister.',
    reversed:
      'Ters Kule, krizi ertelemeyi beceri sanıp yıkımda katkını inkâr etme eğilimini vurgular. Radikal dürüstlükten kaçış inkârdır.',
    keywords: ['kriz', 'gerçek', 'temel', 'yıkım', 'onarım'],
    context:
      'Ne yoksayıyorum: geciken doğruluk. Etki: güven sarsılır. Yap: açıkla, yeniden inşa et.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_rc_pos4',
    card: 'The Star',
    position: 4,
    upright:
      'Yıldız, pembe gözlükle “geçecek” deyip onarım sorumluluğunu küçümseyebileceğini söyler. Umut güzel, plan şart.',
    reversed:
      'Ters Yıldız, umutsuzluğu bahane edip payını inkâr etme eğilimini gösterir. Küçük somut adım atılmadıkça şifa gecikir.',
    keywords: ['umut', 'şifa', 'sadelik', 'plan', 'sabır'],
    context:
      'Ne yoksayıyorum: şifa emeğim. Etki: motivasyon düşer. Yap: küçük/ölçülebilir adım.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_rc_pos4',
    card: 'The Moon',
    position: 4,
    upright:
      'Ay, varsayımı gerçek sanıp tepkini meşrulaştırarak payını görmezden gelebileceğini söyler. Sis, öz sorumluluğu gizler.',
    reversed:
      'Ters Ay, şüpheyi alışkanlık yapıp doğrulama sorumluluğunu inkâr etme eğilimini vurgular. Netlik istemek cesarettir.',
    keywords: ['belirsizlik', 'varsayım', 'korku', 'yanılsama', 'netlik'],
    context:
      'Ne yoksayıyorum: gerçeklik testi. Etki: güven aşınır. Yap: sor, doğrula, sonra yorumla.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_rc_pos4',
    card: 'The Sun',
    position: 4,
    upright:
      'Güneş, “iyiyiz” parıltısıyla gerçek meseleleri gölgede bırakıp payını görmezden gelebileceğini söyler. Pozitiflik, inkâr kılığına girmesin.',
    reversed:
      'Ters Güneş, yapay neşeyi kalkan yapıp sorunları küçümseme eğilimini gösterir. Otantik açıklık payını görünür kılar.',
    keywords: ['görünürlük', 'otantiklik', 'takdir', 'netlik', 'gerçek'],
    context:
      'Ne yoksayıyorum: gölgede kalan konu. Etki: birikim, patlama. Yap: neşeyle birlikte gerçeği de göster.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_rc_pos4',
    card: 'Judgement',
    position: 4,
    upright:
      'Mahkeme, özrü/telafiyi erteleyip “zamanla düzelir” diyerek payını görmezden gelebileceğini söyler. Yüzleşme olmadan yenilenme olmaz.',
    reversed:
      'Ters Mahkeme, ya aşırı öz yargı ya da sıfır sorumluluk uçlarına sığınıp inkârı besleyebileceğini anlatır. Hakkaniyetli muhasebe şart.',
    keywords: ['yüzleşme', 'affediş', 'telafi', 'yenilenme', 'hesap'],
    context:
      'Ne yoksayıyorum: adil muhasebe. Etki: ilerleme tıkanır. Yap: özür + somut telafi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_rc_pos4',
    card: 'The World',
    position: 4,
    upright:
      'Dünya, eksik kalan parçayı “ufak detay” diye görüp payını küçümseyebileceğini söyler. Tamamlanmayan döngü huzuru kaçırır.',
    reversed:
      'Ters Dünya, yarım işleri normalleştirip entegrasyon sorumluluğunu inkâr etme eğilimini vurgular. Bitirmeden başlamak inkârdır.',
    keywords: ['tamamlama', 'bütünlük', 'entegrasyon', 'eşik', 'uzatma'],
    context:
      'Ne yoksayıyorum: eksik uçlar. Etki: tatminsizlik sürer. Yap: kapat, sonra başla.',
    group: 'Majör Arkana',
  },

  // CUPS (14)
  {
    id: 'ace_of_cups_rc_pos4',
    card: 'Ace of Cups',
    position: 4,
    upright:
      'Kupa Ası, duygunu saklayıp “anlasın” beklentisiyle payını görmezden gelebileceğini söyler. Kalp dolu ama kapı kapalıysa sorumluluk görünmez.',
    reversed:
      'Ters Kupa Ası, duygusal tıkanıklığı normalleştirip öz açıklığı inkâr etme eğilimini gösterir. Akmayan duygu, inkârın maskesidir.',
    keywords: ['duygu', 'ifade', 'kırılganlık', 'yakınlık', 'şifa'],
    context:
      'Yoksayılan: paylaşım ihtiyacı. Etki: yakınlık solar. Yap: güvenli ifade kapısı aç.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_rc_pos4',
    card: 'Two of Cups',
    position: 4,
    upright:
      'İki Kupa, jest–emek dengesizliğini görmeyip “ben zaten veriyorum” demeye meyledebileceğini söyler. Eşitlik hissi konuşmadan gelmez.',
    reversed:
      'Ters İki Kupa, küçük kırılmaları görmezden gelerek payını inkâr etme eğilimini vurgular. Mikro ihmal makro gücene dönüşür.',
    keywords: ['karşılıklılık', 'denge', 'uyum', 'eşitlik', 'bağ'],
    context:
      'Yoksayılan: adil alışveriş. Etki: güven aşınır. Yap: jest dilini hizala.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_rc_pos4',
    card: 'Three of Cups',
    position: 4,
    upright:
      'Üç Kupa, sosyal alan–mahremiyet dengesini bozup buna “normal” deyerek payını görmezden gelebileceğini söyler. Zaman paylaşımı konuşulmalı.',
    reversed:
      'Ters Üç Kupa, yüzeysel sosyalliği siper edip derin teması erteleyerek inkârı besleyebileceğini anlatır.',
    keywords: ['sosyallik', 'mahremiyet', 'zaman', 'aidiyet', 'ritüel'],
    context:
      'Yoksayılan: dengeli zaman. Etki: kıskançlık/mesafe artar. Yap: sosyal ritmi eşitle.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_rc_pos4',
    card: 'Four of Cups',
    position: 4,
    upright:
      'Dört Kupa, ilgisizliği yorgunlukla açıklayıp payını görmezden gelebileceğini söyler. Şükran eksikliği buz gibi okunur.',
    reversed:
      'Ters Dört Kupa, isteksizliği normalleştirip takdir sorumluluğunu inkâr etme eğilimini gösterir.',
    keywords: ['ilgi', 'tatmin', 'şükran', 'odak', 'fırsat'],
    context:
      'Yoksayılan: görünür takdir. Etki: motivasyon düşer. Yap: minik teşekkür ritmi kur.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_rc_pos4',
    card: 'Five of Cups',
    position: 4,
    upright:
      'Beş Kupa, geçmişe tutunmayı “haklı yas” diye meşrulaştırıp bugüne katkını görmezden gelebileceğini söyler. Kalanı görmemek payını saklar.',
    reversed:
      'Ters Beş Kupa, affedişi geciktirmeyi alışkanlıklaştırarak inkârı besleyebileceğini anlatır.',
    keywords: ['yas', 'kayıp', 'affediş', 'toparlanma', 'umut'],
    context:
      'Yoksayılan: toparlanma adımı. Etki: onarım gecikir. Yap: küçük bırakma ritüeli.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_rc_pos4',
    card: 'Six of Cups',
    position: 4,
    upright:
      'Altı Kupa, nostaljiyi siper edip şimdiki ihtiyaçları görmezden gelebileceğini söyler. “Eskisi gibi” demek inkârı parlatır.',
    reversed:
      'Ters Altı Kupa, çocukluk örüntülerini fark etmeyi reddederek payını gizleyebileceğini anlatır.',
    keywords: ['nostalji', 'geçmiş', 'örüntü', 'konfor', 'şimdi'],
    context:
      'Yoksayılan: bugünün ihtiyacı. Etki: esneklik düşer. Yap: “şimdi–burada” kontrol et.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_rc_pos4',
    card: 'Seven of Cups',
    position: 4,
    upright:
      'Yedi Kupa, kararsızlığı “seçenek çok” diye açıklayıp sorumluluğu görmezden gelebileceğini söyler. Net kriter yoksa inkâr kolaydır.',
    reversed:
      'Ters Yedi Kupa, hayale sığınıp seçim bedelini inkâr etme eğilimini vurgular.',
    keywords: ['seçenek', 'karar', 'hayal', 'kriter', 'netlik'],
    context:
      'Yoksayılan: seçim sorumluluğu. Etki: hedef bulanır. Yap: 3 kriter + 1 karar.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_rc_pos4',
    card: 'Eight of Cups',
    position: 4,
    upright:
      'Sekiz Kupa, sessiz uzaklaşmayı “kendimi koruma” diye meşrulaştırıp payını görmezden gelebileceğini söyler. Konuşulmadan gidilen yol inkârdır.',
    reversed:
      'Ters Sekiz Kupa, kal–git salınımını normalleştirerek sorumluluğu gizleyebileceğini anlatır.',
    keywords: ['ayrılış', 'anlam', 'ikilem', 'yol', 'kapanış'],
    context:
      'Yoksayılan: net yön cümlesi. Etki: güven erir. Yap: kalıyorum/çıkıyorum + neden.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_rc_pos4',
    card: 'Nine of Cups',
    position: 4,
    upright:
      'Dokuz Kupa, kişisel konforu “hakkım” diyerek öne koyup ortak faydadaki payını görmezden gelebileceğini söyler. Bencillik kılığında inkâr görünmezdir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel hazları bahane edip derin doyum emeğini inkâr etme eğilimini gösterir.',
    keywords: ['tatmin', 'haz', 'değer', 'hedef', 'paylaşım'],
    context:
      'Yoksayılan: ortak sevinç. Etki: bağ gevşer. Yap: ortak hedef/sevinç tasarla.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_rc_pos4',
    card: 'Ten of Cups',
    position: 4,
    upright:
      'On Kupa, ideal tabloyu “biz iyiyiz” diye savunup çatlakları görmezden gelebileceğini söyler. Fotoğraf gülse de kalp susmasın.',
    reversed:
      'Ters On Kupa, sahte uyumu sürdürerek payını inkâr etme eğilimini vurgular. Otantik konuşma şart.',
    keywords: ['ideal', 'gerçeklik', 'uyum', 'aile', 'beklenti'],
    context:
      'Yoksayılan: görünür çatlak. Etki: patlama riski artar. Yap: gerçek konuş, küçük onarım.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_rc_pos4',
    card: 'Page of Cups',
    position: 4,
    upright:
      'Kupa Prensi, alınganlığı “hassasiyet” diye meşrulaştırıp payını görmezden gelebileceğini söyler. Çocukça savunular inkârı süsler.',
    reversed:
      'Ters Kupa Prensi, pasif–agresif sızlanmayla sorumluluğu gizleme eğilimini anlatır.',
    keywords: ['hassasiyet', 'olgunluk', 'kaçış', 'ifade', 'oyunsuluk'],
    context:
      'Yoksayılan: yetişkin ifade. Etki: iletişim bulanır. Yap: açık talep cümlesi kur.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_rc_pos4',
    card: 'Knight of Cups',
    position: 4,
    upright:
      'Kupa Şövalyesi, jesti planın önüne koyup tutarlılık sorumluluğunu görmezden gelebileceğini söyler. Romantizm inkârı cilalar.',
    reversed:
      'Ters Kupa Şövalyesi, söz–eylem uyumsuzluğunu bahane ederek katkını gizleme eğilimini gösterir.',
    keywords: ['romantizm', 'tutarlılık', 'ideal', 'pratik', 'güven'],
    context:
      'Yoksayılan: sürdürülebilirlik. Etki: güven düşer. Yap: az-öz, düzenli adım.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_rc_pos4',
    card: 'Queen of Cups',
    position: 4,
    upright:
      'Kupa Kraliçesi, empatiyi sınırla dengeleyememeyi “fedakârlık” diye anlatıp payını görmezden gelebileceğini söyler. Aşırı bakım da sorumluluktur.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal manipülasyonu görmezden gelip suçluluk tetikleyerek inkârı besleyebileceğini anlatır.',
    keywords: ['empati', 'sınır', 'bakım', 'manipülasyon', 'öz bakım'],
    context:
      'Yoksayılan: sağlıklı sınır. Etki: tükenmişlik, kırgınlık. Yap: net sınır + nazik dil.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_rc_pos4',
    card: 'King of Cups',
    position: 4,
    upright:
      'Kupa Kralı, duyguyu aşırı kontrol etmeyi “olgunluk” diye sunup payını görmezden gelebileceğini söyler. Sükunet, kopukluğa dönüşmesin.',
    reversed:
      'Ters Kupa Kralı, pasif–agresif dalgaları küçümseyerek sorumluluğu gizleme eğilimini vurgular.',
    keywords: ['sükunet', 'ifade', 'denge', 'pasif agresif', 'liderlik'],
    context:
      'Yoksayılan: duygunun görünürlüğü. Etki: anlaşılma azalır. Yap: adlandır–paylaş.',
    group: 'Kupalar',
  },

  // SWORDS (14)
  {
    id: 'ace_of_swords_rc_pos4',
    card: 'Ace of Swords',
    position: 4,
    upright:
      'Kılıç Ası, net tanım yapmadan tartışmayı “zaten ortada” sayıp payını görmezden gelebileceğini söyler. Keskinlik, bağlam ister.',
    reversed:
      'Ters Kılıç Ası, bilgi kirliliğini fark etmeden aktarıp sorumluluğu gizleme eğilimini gösterir.',
    keywords: ['netlik', 'tanım', 'gerçek', 'karar', 'bağlam'],
    context:
      'Yoksayılan: tanım/ölçüt. Etki: kararlar savrulur. Yap: önce tanımla.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_rc_pos4',
    card: 'Two of Swords',
    position: 4,
    upright:
      'İki Kılıç, karar kaçınmasını “tarafsızlık” diye adlandırıp payını görmezden gelebileceğini söyler. Askıda kalmak da etkidir.',
    reversed:
      'Ters İki Kılıç, yüzleşmeyi geciktirmeyi normalleştirerek inkârı besleyebileceğini anlatır.',
    keywords: ['kararsızlık', 'kaçınma', 'yüzleşme', 'denge', 'ikilem'],
    context:
      'Yoksayılan: küçük kesin seçim. Etki: zamanlama kaçar. Yap: göz bandını çıkar.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_rc_pos4',
    card: 'Three of Swords',
    position: 4,
    upright:
      'Üç Kılıç, sert üslubu “dürüstlük” diye meşrulaştırıp payını görmezden gelebileceğini söyler. Hakikat nazik olunca şifadır.',
    reversed:
      'Ters Üç Kılıç, acıyı konuşmaktan kaçınıp sızdırarak sorumluluğu gizleme eğilimini gösterir.',
    keywords: ['kırgınlık', 'acı', 'üslup', 'onarım', 'dürüstlük'],
    context:
      'Yoksayılan: nazik ifade. Etki: güven yaralanır. Yap: özür + onarım planı.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_rc_pos4',
    card: 'Four of Swords',
    position: 4,
    upright:
      'Dört Kılıç, yorgunluğu görmezden gelip “konuşalım” ısrarıyla payını gizleyebileceğini söyler. Mola, sorumluluktur.',
    reversed:
      'Ters Dört Kılıç, dinlenme ihtiyacını inkâr edip gerilimi büyütme eğilimini vurgular.',
    keywords: ['mola', 'sükunet', 'enerji', 'ritim', 'toparlanma'],
    context:
      'Yoksayılan: ara ihtiyacı. Etki: ton sertleşir. Yap: ara ver–sonra konuş.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_rc_pos4',
    card: 'Five of Swords',
    position: 4,
    upright:
      'Beş Kılıç, haklı çıkmayı başarı sanıp payını görmezden gelebileceğini söyler. Zafer, ilişki bedeliyle pahalıdır.',
    reversed:
      'Ters Beş Kılıç, alay ve sarkazmı mizah diye paketleyip inkârı besleme eğilimini gösterir.',
    keywords: ['ego', 'zafer', 'maliyet', 'uzlaşı', 'saygı'],
    context:
      'Yoksayılan: ilişki maliyeti. Etki: saygı erir. Yap: geri çekil, dinle.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_rc_pos4',
    card: 'Six of Swords',
    position: 4,
    upright:
      'Altı Kılıç, geçiş planını konuşmadan yön değiştirmeyi “pratik” sayıp payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Altı Kılıç, eski kıyıya dönmeyi tesadüf sanıp katkını inkâr etme eğilimini anlatır.',
    keywords: ['geçiş', 'plan', 'yöntem', 'adaptasyon', 'sakinlik'],
    context:
      'Yoksayılan: adım adım plan. Etki: güvensizlik artar. Yap: köprü kur.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_rc_pos4',
    card: 'Seven of Swords',
    position: 4,
    upright:
      'Yedi Kılıç, eksik bilgi vermeyi “detay” sayıp payını görmezden gelebileceğini söyler. Şeffaflık sorumluluktur.',
    reversed:
      'Ters Yedi Kılıç, itirafı parça parça yapıp inkârı uzatma eğilimini vurgular.',
    keywords: ['şeffaflık', 'dürüstlük', 'saklama', 'güven', 'etik'],
    context:
      'Yoksayılan: tam ve zamanlı bilgi. Etki: güven kırılır. Yap: açıkla–aç.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_rc_pos4',
    card: 'Eight of Swords',
    position: 4,
    upright:
      'Sekiz Kılıç, öz kısıt inançlarını “gerçek” sanıp payını görmezden gelebileceğini söyler. Kapı açık olabilir.',
    reversed:
      'Ters Sekiz Kılıç, yardım istememeyi gurur sayarak inkârı besleme eğilimini anlatır.',
    keywords: ['korku', 'öz kısıt', 'yardım', 'inanç', 'özgürleşme'],
    context:
      'Yoksayılan: yardım çağrısı. Etki: hareket alanı daralır. Yap: kanıt ara–destek iste.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_rc_pos4',
    card: 'Nine of Swords',
    position: 4,
    upright:
      'Dokuz Kılıç, kaygıyı gerçek diye taşıyıp payını görmezden gelebileceğini söyler. Kuruntu, inkârın sisidir.',
    reversed:
      'Ters Dokuz Kılıç, regülasyonsuz kaygıyı “ben böyleyim” diyerek meşrulaştırma eğilimini vurgular.',
    keywords: ['kaygı', 'kuruntu', 'uyku', 'gerçeklik testi', 'regülasyon'],
    context:
      'Yoksayılan: kanıt kontrolü. Etki: ton sertleşir. Yap: veri–sonra yorum.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_rc_pos4',
    card: 'Ten of Swords',
    position: 4,
    upright:
      'On Kılıç, bitişi kabul etmeyip yöntemi sürdürmeyi direniş sanarak payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters On Kılıç, kapanışı erteleyip yarayı açık tutma eğilimini gösterir. Bu da inkârdır.',
    keywords: ['bitiş', 'kapanış', 'yeniden doğuş', 'tükeniş', 'kabul'],
    context:
      'Yoksayılan: net kapanış. Etki: umut tüketilir. Yap: bitir ve onar.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_rc_pos4',
    card: 'Page of Swords',
    position: 4,
    upright:
      'Kılıç Prensi, sorgu tonunu merak diye sunup payını görmezden gelebileceğini söyler. Dedektiflik güveni yer.',
    reversed:
      'Ters Kılıç Prensi, dedikodu/kanıtsız paylaşımla inkârı besleme eğilimini vurgular.',
    keywords: ['sorgu', 'kuşku', 'doğrulama', 'iletişim', 'öğrenme'],
    context:
      'Yoksayılan: nazik merak. Etki: savunma artar. Yap: önce sor, sonra yorum.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_rc_pos4',
    card: 'Knight of Swords',
    position: 4,
    upright:
      'Kılıç Şövalyesi, hız/sertliği “doğrudanlık” sayıp payını görmezden gelebileceğini söyler. Nefes almadan söz, inkâra kalkan olur.',
    reversed:
      'Ters Kılıç Şövalyesi, ültimatom dilini normalleştirerek sorumluluğu gizleme eğilimini gösterir.',
    keywords: ['hız', 'sertlik', 'iletişim', 'saldırı', 'geri tepme'],
    context:
      'Yoksayılan: tempo/ton ayarı. Etki: kapılar kapanır. Yap: yavaşlat–yumuşat.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_rc_pos4',
    card: 'Queen of Swords',
    position: 4,
    upright:
      'Kılıç Kraliçesi, şefkatsiz netliği “gerçekçilik” diye meşrulaştırıp payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Kılıç Kraliçesi, sarkazmı mizah sayıp inkârı besleme eğilimini vurgular.',
    keywords: ['nesnellik', 'eleştiri', 'şefkat', 'üslup', 'sınır'],
    context:
      'Yoksayılan: nazik çerçeve. Etki: yakınlık donar. Yap: kalp + netlik.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_rc_pos4',
    card: 'King of Swords',
    position: 4,
    upright:
      'Kılıç Kralı, kuralı merhametin önüne koyup payını görmezden gelebileceğini söyler. Gri alanlar da gerçektir.',
    reversed:
      'Ters Kılıç Kralı, dogmatik üslubu “ilke” diye paketleyerek inkârı besleme eğilimini gösterir.',
    keywords: ['ilke', 'kural', 'empati', 'otorite', 'esneklik'],
    context:
      'Yoksayılan: kural–empati dengesi. Etki: uzlaşı zorlaşır. Yap: ilke + merhametle konuş.',
    group: 'Kılıçlar',
  },

  // WANDS (14)
  {
    id: 'ace_of_wands_rc_pos4',
    card: 'Ace of Wands',
    position: 4,
    upright:
      'Değnek Ası, hevesi plan sanıp payını görmezden gelebileceğini söyler. Kıvılcım iyi, ritim sorumluluktur.',
    reversed:
      'Ters Değnek Ası, yarım bırakmayı normalleştirerek inkârı besleme eğilimini gösterir.',
    keywords: ['kıvılcım', 'motivasyon', 'ritim', 'başlangıç', 'süreklilik'],
    context:
      'Yoksayılan: sürdürülebilir adım. Etki: güven yıpranır. Yap: küçük düzenli çıktı.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_rc_pos4',
    card: 'Two of Wands',
    position: 4,
    upright:
      'İki Değnek, vizyonu konuşmadan risk bekleyip payını görmezden gelebileceğini söyler. Ufuk eşleşmezse adım da boşa düşer.',
    reversed:
      'Ters İki Değnek, sonsuz plan–sıfır adımı bahane ederek inkârı büyütebilir.',
    keywords: ['vizyon', 'plan', 'risk', 'ufuk', 'karar'],
    context:
      'Yoksayılan: pilot adım. Etki: genişleme tıkanır. Yap: mini deneme başlat.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_rc_pos4',
    card: 'Three of Wands',
    position: 4,
    upright:
      'Üç Değnek, beklentiyi konuşmadan kurup gecikmeyi “normal” sayarak payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Üç Değnek, planı güncellemeden sitem ederek inkârı besleme eğilimini gösterir.',
    keywords: ['zamanlama', 'beklenti', 'koordinasyon', 'ufuk', 'akış'],
    context:
      'Yoksayılan: rol–zaman uyumu. Etki: sabır erir. Yap: senkronizasyon kur.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_rc_pos4',
    card: 'Four of Wands',
    position: 4,
    upright:
      'Dört Değnek, temeli güçlendirmeden eşiğe koşup hayal kırıklığını “talihsizlik” sayarak payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Dört Değnek, törensel “iyiyiz” kalkanıyla inkârı sürdürebileceğini anlatır.',
    keywords: ['eşik', 'temel', 'kutlama', 'aidiyet', 'sıra'],
    context:
      'Yoksayılan: temel işleri. Etki: istikrar zayıflar. Yap: önce temel, sonra tören.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_rc_pos4',
    card: 'Five of Wands',
    position: 4,
    upright:
      'Beş Değnek, kuralsız tartışmayı “açık iletişim” sanıp payını görmezden gelebileceğini söyler. Oyun kuralsızsa kavga büyür.',
    reversed:
      'Ters Beş Değnek, gürültüyü sürdüren rolünü inkâr etme eğilimini gösterir.',
    keywords: ['çatışma', 'kural', 'rekabet', 'fasilitasyon', 'verim'],
    context:
      'Yoksayılan: tartışma çerçevesi. Etki: saygı ve verim düşer. Yap: kurallı diyalog.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_rc_pos4',
    card: 'Six of Wands',
    position: 4,
    upright:
      'Altı Değnek, görünürlüğü paylaşmayıp “hak edilmiş” diyerek payını görmezden gelebileceğini söyler. Alkış tek elde kırgınlık doğurur.',
    reversed:
      'Ters Altı Değnek, görünmeyen emeği görmezden gelme eğilimini vurgular.',
    keywords: ['takdir', 'görünürlük', 'zafer', 'algı', 'motivasyon'],
    context:
      'Yoksayılan: adil takdir. Etki: motivasyon erir. Yap: emeği görünür kıl.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_rc_pos4',
    card: 'Seven of Wands',
    position: 4,
    upright:
      'Yedi Değnek, savunmayı güvenlik sanıp payını görmezden gelebileceğini söyler. Sürekli mevzi, diyalogu öldürür.',
    reversed:
      'Ters Yedi Değnek, yardım istememeyi güç sayarak inkârı besleme eğilimini gösterir.',
    keywords: ['savunma', 'sınır', 'direnç', 'destek', 'yük'],
    context:
      'Yoksayılan: yumuşak savunma. Etki: işbirliği düşer. Yap: destek talep et.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_rc_pos4',
    card: 'Eight of Wands',
    position: 4,
    upright:
      'Sekiz Değnek, hız/mesaj kalabalığını “hareket” sanıp payını görmezden gelebileceğini söyler. Çok mesaj, az anlam.',
    reversed:
      'Ters Sekiz Değnek, gecikmeyi bahane ederek inkârı sürdürme eğilimini vurgular.',
    keywords: ['hız', 'iletişim', 'senkron', 'sıra', 'akış'],
    context:
      'Yoksayılan: akış tasarımı. Etki: yanlış anlama artar. Yap: tek kanal + sıra.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_rc_pos4',
    card: 'Nine of Wands',
    position: 4,
    upright:
      'Dokuz Değnek, yorgun tetikteliği “gerekli” sayıp payını görmezden gelebileceğini söyler. Dinlenme reddi inkârdır.',
    reversed:
      'Ters Dokuz Değnek, eski yarayı şimdiye taşıma rolünü inkâr etme eğilimini gösterir.',
    keywords: ['yorgunluk', 'tetikte olma', 'mola', 'dayanıklılık', 'eşik'],
    context:
      'Yoksayılan: mola kuralı. Etki: patlama eşiği düşer. Yap: ara ver–dön.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_rc_pos4',
    card: 'Ten of Wands',
    position: 4,
    upright:
      'On Değnek, her şeyi üstlenmeyi erdem sayıp yük paylaşımındaki payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters On Değnek, bırakılması gerekeni taşımayı “sorumluluk” sanıp inkârı büyütebilir.',
    keywords: ['yük', 'delege', 'öncelik', 'sorumluluk', 'sadelik'],
    context:
      'Yoksayılan: bırak/delege. Etki: tükeniş. Yap: yük haritası çıkar.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_rc_pos4',
    card: 'Page of Wands',
    position: 4,
    upright:
      'Değnek Prensi, hevesi odaksızlıkla karıştırıp payını görmezden gelebileceğini söyler. Başlamak güzel, bitirmek sorumluluktur.',
    reversed:
      'Ters Değnek Prensi, yarım projeleri kader sayarak inkârı besleme eğilimini gösterir.',
    keywords: ['heves', 'odak', 'bitiricilik', 'pilot', 'ritim'],
    context:
      'Yoksayılan: mini teslim tarihi. Etki: güven azalır. Yap: küçük sprintler.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_rc_pos4',
    card: 'Knight of Wands',
    position: 4,
    upright:
      'Değnek Şövalyesi, atılganlığı cesaret sanıp hazırlıksızlığın payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Değnek Şövalyesi, dengesiz ivmeyi “doğam” diyerek inkâr etme eğilimini vurgular.',
    keywords: ['hız', 'atılganlık', 'risk', 'taahhüt', 'ivme'],
    context:
      'Yoksayılan: taahhüt mimarisi. Etki: süreklilik zayıflar. Yap: ritim sözleşmesi.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_rc_pos4',
    card: 'Queen of Wands',
    position: 4,
    upright:
      'Değnek Kraliçesi, görünürlüğü paylaşmadan parlayıp kıyası tetiklediğini görmezden gelebileceğini söyler.',
    reversed:
      'Ters Değnek Kraliçesi, onay arayışını ihtiyaç diye sunup payını inkâr etme eğilimini gösterir.',
    keywords: ['görünürlük', 'karizma', 'kıyas', 'özgüven', 'onay'],
    context:
      'Yoksayılan: ortak sahne. Etki: kıskançlık artar. Yap: başarıyı paylaştır.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_rc_pos4',
    card: 'King of Wands',
    position: 4,
    upright:
      'Değnek Kralı, tek merkezli vizyonu liderlik sanıp katılım eksikliğindeki payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Değnek Kralı, ego çatışmasını “prensip” diyerek inkâr etme eğilimini vurgular.',
    keywords: ['vizyon', 'liderlik', 'yetki', 'ego', 'katılım'],
    context:
      'Yoksayılan: ortak karar. Etki: motivasyon/güven düşer. Yap: yetkiyi paylaş.',
    group: 'Asalar',
  },

  // PENTACLES (14)
  {
    id: 'ace_of_pentacles_rc_pos4',
    card: 'Ace of Pentacles',
    position: 4,
    upright:
      'Tılsım Ası, somut planı “zaten bakarız” diye erteleyip payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Tılsım Ası, kıtlık zihnini bahane edip adımı iptal ederek inkârı besleme eğilimini gösterir.',
    keywords: ['fırsat', 'temel', 'güvence', 'bütçe', 'somut adım'],
    context:
      'Yoksayılan: ilk küçük adım. Etki: güven zayıflar. Yap: tarih–çıktı belirle.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_rc_pos4',
    card: 'Two of Pentacles',
    position: 4,
    upright:
      'İki Tılsım, dağınık önceliği “yoğunluk” diyerek meşrulaştırıp payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters İki Tılsım, ertelemeyi norm yaparak inkârı besleme eğilimini gösterir.',
    keywords: ['denge', 'öncelik', 'zaman', 'esneklik', 'program'],
    context:
      'Yoksayılan: gerçek kapasite. Etki: sözler düşer. Yap: takvimle ve sadeleştir.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_rc_pos4',
    card: 'Three of Pentacles',
    position: 4,
    upright:
      'Üç Tılsım, rol/standart muğlaklığını “halledilir” diyerek küçümseyip payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Üç Tılsım, görünmez emeği görmeyip takdir sorumluluğunu inkâr etme eğilimini vurgular.',
    keywords: ['işbirliği', 'rol', 'kalite', 'takdir', 'koordinasyon'],
    context:
      'Yoksayılan: süreç/rol netliği. Etki: tekrar iş, motivasyon kaybı. Yap: anlaşma yaz.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_rc_pos4',
    card: 'Four of Pentacles',
    position: 4,
    upright:
      'Dört Tılsım, kontrolü güvenlik diye sunup payını görmezden gelebileceğini söyler. Tutmak da tercihtir.',
    reversed:
      'Ters Dört Tılsım, aşırı sıkılığı “tasarruf” diye paketleyip inkârı besleme eğilimini gösterir.',
    keywords: ['kontrol', 'güvenlik', 'paylaşım', 'tutma', 'esneklik'],
    context:
      'Yoksayılan: esnek paylaşım. Etki: şeffaflık düşer. Yap: açık bütçe/alan.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_rc_pos4',
    card: 'Five of Pentacles',
    position: 4,
    upright:
      'Beş Tılsım, yardım istemeyi zayıflık sayıp payını görmezden gelebileceğini söyler. Yalnızlık inkârı büyütür.',
    reversed:
      'Ters Beş Tılsım, dayanışma kapısını çalmayı geciktirerek sorumluluğu gizleme eğilimini vurgular.',
    keywords: ['kıtlık', 'yardım', 'dışlanmışlık', 'moral', 'dayanışma'],
    context:
      'Yoksayılan: destek çağrısı. Etki: moral düşer. Yap: ihtiyacı açık söyle.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_rc_pos4',
    card: 'Six of Pentacles',
    position: 4,
    upright:
      'Altı Tılsım, koşullu destek/karşılık beklentisini “denge” sanıp payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Altı Tılsım, skor tutmayı normalleştirerek inkârı besleme eğilimini gösterir.',
    keywords: ['adalet', 'paylaşım', 'güç', 'koşul', 'eşitlik'],
    context:
      'Yoksayılan: gönüllü paylaşım. Etki: güven geriler. Yap: koşulu azalt, şeffaf ol.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_rc_pos4',
    card: 'Seven of Pentacles',
    position: 4,
    upright:
      'Yedi Tılsım, sabırsızlığı “verimsizlik” diye etiketleyip payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Yedi Tılsım, batık maliyete inadı “sebat” sanıp inkârı büyütme eğilimini vurgular.',
    keywords: ['sabır', 'verim', 'hasat', 'ölçüm', 'pivot'],
    context:
      'Yoksayılan: ölçme–öğrenme. Etki: kaynak ziyanı. Yap: gösterge/pivot kararı.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_rc_pos4',
    card: 'Eight of Pentacles',
    position: 4,
    upright:
      'Sekiz Tılsım, özensizliği “pratiklik” sanıp payını görmezden gelebileceğini söyler. Zanaat sevgisi ilişkide de gerek.',
    reversed:
      'Ters Sekiz Tılsım, hızlı sonuç arzusunu bahane edip inkârı besleme eğilimini gösterir.',
    keywords: ['ustalık', 'özen', 'odak', 'kalite', 'pratik'],
    context:
      'Yoksayılan: bilinçli pratik. Etki: kalite düşer. Yap: düzenli ince ayar.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_rc_pos4',
    card: 'Nine of Pentacles',
    position: 4,
    upright:
      'Dokuz Tılsım, bağımsız konforu “benim alanım” diyerek öne koyup payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Dokuz Tılsım, israf/aşırı tasarrufu “tarz” diye paketleyip inkârı besleme eğilimini vurgular.',
    keywords: ['bağımsızlık', 'konfor', 'alan', 'harcama', 'tasarruf'],
    context:
      'Yoksayılan: ortak konfor. Etki: mesafe büyür. Yap: alan/bütçe protokolü.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_rc_pos4',
    card: 'Ten of Pentacles',
    position: 4,
    upright:
      'On Tılsım, aile/sistem beklentilerini “doğal” sayıp payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters On Tılsım, aile içi gerilimi ilişkiye taşıyıp sınır sorumluluğunu inkâr etme eğilimini gösterir.',
    keywords: ['aile', 'sistem', 'miras', 'sınır', 'güvence'],
    context:
      'Yoksayılan: sınır/rol yazımı. Etki: huzur zorlanır. Yap: çerçeveyi netleştir.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_rc_pos4',
    card: 'Page of Pentacles',
    position: 4,
    upright:
      'Tılsım Prensi, öğrenme/disiplin eksikliğini “vakit yok” diye açıklayıp payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Tılsım Prensi, oyalanmayı normalleştirerek inkârı besleme eğilimini vurgular.',
    keywords: ['öğrenme', 'disiplin', 'hedef', 'başlangıç', 'somutluk'],
    context:
      'Yoksayılan: küçük görev–tarih. Etki: ilerleme yavaşlar. Yap: mini görev planı.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_rc_pos4',
    card: 'Knight of Pentacles',
    position: 4,
    upright:
      'Tılsım Şövalyesi, istikrarlı ritmi küçümseyip hız baskısıyla payını görmezden gelebileceğini söyler.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlığı “istikrar” diye savunup çevikleşme sorumluluğunu inkâr etme eğilimini gösterir.',
    keywords: ['rutin', 'istikrar', 'çeviklik', 'sabır', 'ilerleme'],
    context:
      'Yoksayılan: mikro iyileştirme. Etki: motivasyon düşer. Yap: küçük süreç upgrade’i.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_rc_pos4',
    card: 'Queen of Pentacles',
    position: 4,
    upright:
      'Tılsım Kraliçesi, görünmez emeği üstlenmeyi erdem sayıp paylaşım sorumluluğunu görmezden gelebileceğini söyler.',
    reversed:
      'Ters Tılsım Kraliçesi, öz bakımı ihmal etmeyi “fedakârlık” diye meşrulaştırarak inkârı besleme eğilimini gösterir.',
    keywords: ['bakım', 'pratiklik', 'öz bakım', 'destek', 'kaynak'],
    context:
      'Yoksayılan: yardım isteme. Etki: tükenmişlik. Yap: işi böl, bakım planı yap.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_rc_pos4',
    card: 'King of Pentacles',
    position: 4,
    upright:
      'Tılsım Kralı, güvenceyi kontrolle karıştırıp payını görmezden gelebileceğini söyler. Statü dili sıcaklığı gölgeler.',
    reversed:
      'Ters Tılsım Kralı, mikro yönetimi “sorumluluk” diye paketleyip inkârı besleme eğilimini vurgular.',
    keywords: ['güvence', 'kontrol', 'statü', 'paylaşım', 'esneklik'],
    context:
      'Yoksayılan: yetki paylaşımı. Etki: güven/şefkat azalır. Yap: alan aç, delege et.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 4 anlamını bulma fonksiyonu
export const getposition4Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return position4Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipProblemsposition4Meaning = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  return getposition4Meaning(cardName);
};

// Kart adına göre pozisyon 4 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipProblemsposition4MeaningByCardName = (
  cardName: string
): RelationshipProblemsPositionMeaning | undefined => {
  const meaning = getposition4Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 4 anlamlarını alma fonksiyonu
export const getAllposition4Meanings =
  (): RelationshipProblemsPositionMeaning[] => {
    return position4Meanings;
  };

// pozisyon 4 anlamlarını filtreleme fonksiyonu
export const getposition4MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipProblemsPositionMeaning[] => {
  return position4Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 4 anlamlarını arama
export const searchposition4MeaningsByKeyword = (
  keyword: string
): RelationshipProblemsPositionMeaning[] => {
  return position4Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position4Meanings,
  getposition4Meaning,
  getAllposition4Meanings,
  getposition4MeaningsByGroup,
  searchposition4MeaningsByKeyword,
};
