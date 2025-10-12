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
- position7Meanings: gerekli
- getposition7Meaning: gerekli
*/

import { SituationAnalysisPositionMeaning } from './position-meanings-index';

// 6. Pozisyon (Tavsiye) - 78 Tarot kartı
export const position7Meanings: SituationAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_sa_pos7',
    card: 'The Fool',
    position: 7,
    upright:
      'Olası gelecek: Yeni bir sayfa açılır; cesur bir adım atarak taze bir yolculuğa başlarsınız. Keşif ve merak, beklenmedik fırsatları kapınıza getirir ve hafiflik başarıyı hızlandırır.',
    reversed:
      'Olası gelecek: Aceleci hamleler, yarım kalmış başlangıçlar ve yönsüzlük risk oluşturur. Plansız adımlar geri dönüş gerektirebilir; önce zemini sağlamlaştırmak gerekebilir.',
    keywords: ['yeni başlangıç', 'risk', 'özgürlük', 'keşif', 'niyet'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_sa_pos7',
    card: 'The Magician',
    position: 7,
    upright:
      'Olası gelecek: Niyet–odak–eylem üçlüsü hizalanır; kaynaklarınızla somut bir başarıyı tezahür ettirirsiniz. Etkili iletişim, anahtar kapıları açar.',
    reversed:
      'Olası gelecek: Dağınık enerji ve yarım kalan projeler verimi düşürür. Abartılı vaatler güveni zedeleyebilir; mesajı sadeleştirmek ve beceri açığını kapatmak gerekir.',
    keywords: ['tezahür', 'odak', 'iletişim', 'kaynak', 'başarı'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_sa_pos7',
    card: 'The High Priestess',
    position: 7,
    upright:
      'Olası gelecek: Sezgisel netlik artar; perde arkası dinamikler görünür olur ve doğru zamanda doğru bilgiyi çekersiniz. Sabır, derin kavrayış getirir.',
    reversed:
      'Olası gelecek: Saklı bilgiler ve muğlak sinyaller süreci uzatabilir. İç sesi bastırmak kafa karışıklığını büyütebilir; sessiz alan açmak gerekir.',
    keywords: ['sezgi', 'giz', 'bilgelik', 'zamanlama', 'içgörü'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_sa_pos7',
    card: 'The Empress',
    position: 7,
    upright:
      'Olası gelecek: Bereket, büyüme ve yaratıcı üretim meyve verir; emek verdiğiniz tohumlar somutlaşır. Şefkatli bakım istikrar yaratır.',
    reversed:
      'Olası gelecek: Aşırı sahiplenme ya da öz-bakım eksikliği üretkenliği düşürür. Yaratıcı tıkanıklık geçici olabilir; beslenme–dinlenme döngüsü yeniler.',
    keywords: ['bereket', 'yaratıcılık', 'büyüme', 'şefkat', 'üreti'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_sa_pos7',
    card: 'The Emperor',
    position: 7,
    upright:
      'Olası gelecek: Sağlam yapı ve net kurallar kalıcı başarı getirir; otoriteniz tanınır. Strateji, kaosu düzenler.',
    reversed:
      'Olası gelecek: Katı tutum ve mikro-yönetim direnç doğurur. Esnekleşmeyen sistemler yavaşlayabilir; delege ve güncelleme gerekir.',
    keywords: ['yapı', 'otorite', 'strateji', 'sınır', 'istikrar'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_sa_pos7',
    card: 'The Hierophant',
    position: 7,
    upright:
      'Olası gelecek: Kurumsal onay, sertifika ya da geleneksel yollarla kabul gelir. Mentor desteği kapıları açabilir.',
    reversed:
      'Olası gelecek: Kalıpları kırma isteği sürtünme yaratabilir; özgün yol alternatif kapılar aralar ama süreç uzayabilir.',
    keywords: ['gelenek', 'onay', 'mentor', 'standart', 'kurum'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_sa_pos7',
    card: 'The Lovers',
    position: 7,
    upright:
      'Olası gelecek: Değerlerle uyumlu bir seçim yapılır; güçlü bir ortaklık ya da kaynaşma doğar. Karar, iç barışı artırır.',
    reversed:
      'Olası gelecek: Kararsızlık veya değer çatışması yolları ayırabilir. Net ölçütler belirlenmezse uyumsuzluk hissi sürebilir.',
    keywords: ['seçim', 'uyum', 'ortaklık', 'değer', 'karar'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_sa_pos7',
    card: 'The Chariot',
    position: 7,
    upright:
      'Olası gelecek: Disiplin ve odakla zafer; zıt güçleri aynı hedefe sürerek görünür bir ilerleme kazanırsınız.',
    reversed:
      'Olası gelecek: Yön kaybı ve savrulma riski artar; dağınık hedefler ivmeyi bozar. Rotayı sadeleştirmek şart olur.',
    keywords: ['zafer', 'disiplin', 'yön', 'kararlılık', 'ivme'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_sa_pos7',
    card: 'Strength',
    position: 7,
    upright:
      'Olası gelecek: Sakin cesaret ve şefkatli güçle engeller aşılır; güven inşası kalıcı sonuç verir.',
    reversed:
      'Olası gelecek: Öz-güven dalgalanması ve sabırsızlık süreci zorlayabilir; ritmi düşürmek ve destek almak gerekir.',
    keywords: ['cesaret', 'şefkat', 'direnç', 'özgüven', 'sabır'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_sa_pos7',
    card: 'The Hermit',
    position: 7,
    upright:
      'Olası gelecek: Derin içgörü ve rafine stratejiyle daha bilge bir yön belirlenir; yalnız çalışma meyve verir.',
    reversed:
      'Olası gelecek: Aşırı içe kapanma görünürlüğü azaltır; geri bildirim eksikliği ilerlemeyi yavaşlatabilir.',
    keywords: ['bilgelik', 'içe dönüş', 'strateji', 'rehberlik', 'netlik'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_sa_pos7',
    card: 'The Wheel of Fortune',
    position: 7,
    upright:
      'Olası gelecek: Çark lehinize döner; doğru zamanlama çarpan etkisi yaratır ve döngü yeni bir faza geçer.',
    reversed:
      'Olası gelecek: Tekrarlayan kalıplar ve kötü zamanlama pencereleri kaçırmanıza neden olabilir; rota düzeltmesi gerekir.',
    keywords: ['zamanlama', 'döngü', 'değişim', 'şans', 'adaptasyon'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_sa_pos7',
    card: 'Justice',
    position: 7,
    upright:
      'Olası gelecek: Adil ve dengeli bir sonuç alınır; sebep–sonuç çizgisi şeffaftır ve karar tatmin edicidir.',
    reversed:
      'Olası gelecek: Algılanan adaletsizlik ya da dengesizlik itiraz/temyiz ihtiyacı doğurabilir.',
    keywords: ['adalet', 'denge', 'karar', 'sorumluluk', 'şeffaflık'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_sa_pos7',
    card: 'The Hanged Man',
    position: 7,
    upright:
      'Olası gelecek: Kısa bir askı süreci yeni bir bakış ve yaratıcı bir pivot getirir; gecikme anlam üretir.',
    reversed:
      'Olası gelecek: Verimsiz bekleyiş ve kararsız fedakârlık enerjiyi tüketebilir; net karar şart olur.',
    keywords: ['perspektif', 'askıda', 'pivot', 'teslim', 'aydınlanma'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'death_sa_pos7',
    card: 'Death',
    position: 7,
    upright:
      'Olası gelecek: Anlamlı bir kapanış gerçekleşir; yer açıldığında yeni bir dönem başlar ve hafifleme gelir.',
    reversed:
      'Olası gelecek: Geçiş uzar; eskiye tutunmak yeninin gelişini geciktirir. Bırakış kaçınılmazdır.',
    keywords: ['bitiş', 'dönüşüm', 'yeniden doğuş', 'bırakma', 'geçiş'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_sa_pos7',
    card: 'Temperance',
    position: 7,
    upright:
      'Olası gelecek: Uyumlu bir sentez kurulur; sürdürülebilir denge ve şifa ortaya çıkar.',
    reversed:
      'Olası gelecek: Aşırılık ve uyumsuz karışımlar dalgalanma yaratır; kalibrasyon gerekir.',
    keywords: ['denge', 'sentez', 'şifa', 'ölçü', 'sürdürülebilirlik'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_sa_pos7',
    card: 'The Devil',
    position: 7,
    upright:
      'Olası gelecek: Bağlayıcı sözleşmeler, alışkanlıklar veya arzular etkisini sürdürür; sınır koymak şart olur.',
    reversed:
      'Olası gelecek: Zincir gevşer; toksik döngülerden çıkış ve yeniden pazarlık imkânı doğar.',
    keywords: ['bağlılık', 'gölge', 'sözleşme', 'sınır', 'özgürleşme'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_sa_pos7',
    card: 'The Tower',
    position: 7,
    upright:
      'Olası gelecek: Sarsıcı ama arındırıcı bir kırılma çürük temeli yıkar; gerçek görünür olur ve yeniden inşa başlar.',
    reversed:
      'Olası gelecek: Kontrollü bir yıkım zararı azaltır; yine de köklü bir değişim kaçınılmazdır.',
    keywords: ['kriz', 'yıkım', 'uyanış', 'arınma', 'yeniden inşa'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_sa_pos7',
    card: 'The Star',
    position: 7,
    upright:
      'Olası gelecek: Şifa, umut ve sadeleşme ile yol aydınlanır; güven tazelenir ve ilham artar.',
    reversed:
      'Olası gelecek: İvmeyi toplamak zaman alır; kaynakları doldurmak ve güveni onarmak gerekir.',
    keywords: ['umut', 'şifa', 'ilham', 'sadelik', 'yenilenme'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_sa_pos7',
    card: 'The Moon',
    position: 7,
    upright:
      'Olası gelecek: Belirsizlik bir süre daha sürer; sezgiyle ilerlemek ve işaretleri okumak gerekir.',
    reversed:
      'Olası gelecek: Sis dağılır; yanılsamalar çözülür ve gerçeklikle barışılır.',
    keywords: ['belirsizlik', 'sezgi', 'korku', 'yanılsama', 'açığa çıkış'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_sa_pos7',
    card: 'The Sun',
    position: 7,
    upright:
      'Olası gelecek: Net başarı, görünürlük ve neşe; enerji yükselir ve güven pekişir.',
    reversed:
      'Olası gelecek: Kısmi bir başarı ve detay eksikleri görülebilir; küçük düzeltmelerle parlaklık artar.',
    keywords: ['başarı', 'netlik', 'neşe', 'görünürlük', 'özgüven'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_sa_pos7',
    card: 'Judgement',
    position: 7,
    upright:
      'Olası gelecek: Uyanış ve çağrıya cevap; geçmiş yükleri bırakıp yeni sayfaya geçiş yapılır.',
    reversed:
      'Olası gelecek: Kabul gecikebilir; öz-yargı ilerlemeyi yavaşlatır. Affediş kapıyı açar.',
    keywords: ['uyanış', 'karar', 'affediş', 'yenilenme', 'kapanış'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_sa_pos7',
    card: 'The World',
    position: 7,
    upright:
      'Olası gelecek: Döngü tamamlanır; entegrasyon ve “mezuniyet” ile yeni bir seviyeye çıkarsınız.',
    reversed:
      'Olası gelecek: Eksik uçlar kapanışı geciktirir; bitirmeden yeniye geçmek dağınıklık yaratır.',
    keywords: ['tamamlanma', 'entegrasyon', 'başarı', 'bütünlük', 'mezuniyet'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Majör Arkana',
  },

  // CUPS (Kupalar)
  {
    id: 'ace_of_cups_sa_pos7',
    card: 'Ace of Cups',
    position: 7,
    upright:
      'Olası gelecek: Duygusal bir tazelenme ve kalpten bir başlangıç doğar; yakınlık ve şefkat artar.',
    reversed:
      'Olası gelecek: Duygusal tıkanıklık çözülmeden yeni sayfa zor açılır; güvenli ifade gereklidir.',
    keywords: ['yeni duygu', 'şefkat', 'ifade', 'açılım', 'yakınlık'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_sa_pos7',
    card: 'Two of Cups',
    position: 7,
    upright:
      'Olası gelecek: Karşılıklı bağ güçlenir; adil ve sıcak bir ortaklık kurulur.',
    reversed:
      'Olası gelecek: Uyum bozulabilir; yanlış anlaşılmalar bağda soğuma yaratır.',
    keywords: ['ortaklık', 'uyum', 'karşılıklılık', 'şeffaflık', 'güven'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_sa_pos7',
    card: 'Three of Cups',
    position: 7,
    upright:
      'Olası gelecek: Kutlama, topluluk desteği ve paylaşım neşesi; başarı birlikte çoğalır.',
    reversed:
      'Olası gelecek: Sosyal sürtüşme ya da erteleme moral düşürebilir; yakın halka odak faydalıdır.',
    keywords: ['kutlama', 'dostluk', 'paylaşım', 'topluluk', 'moral'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_sa_pos7',
    card: 'Four of Cups',
    position: 7,
    upright:
      'Olası gelecek: Tatminsizlik yerini farkındalığa bırakabilir; yeni bir teklif ilginizi çekebilir.',
    reversed:
      'Olası gelecek: Apathy devam ederse fırsat kaçabilir; şükran pratiği ufku açar.',
    keywords: ['tatminsizlik', 'fırsat', 'uyanış', 'odak', 'şükran'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_sa_pos7',
    card: 'Five of Cups',
    position: 7,
    upright:
      'Olası gelecek: Kayıp kabul edilir ve kalanı değerlendirme gücü doğar; toparlanma başlar.',
    reversed:
      'Olası gelecek: Onarım ve affediş süreci umut yaratır; ileriye adım kolaylaşır.',
    keywords: ['kayıp', 'kabul', 'onarım', 'umut', 'ilerleme'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_sa_pos7',
    card: 'Six of Cups',
    position: 7,
    upright:
      'Olası gelecek: Sıcacık bir uzlaşma veya geçmiş bağlarla tatlı bir yeniden buluşma mümkündür.',
    reversed:
      'Olası gelecek: Geçmişe takılmak bugünü gölgeleyebilir; denge kurmak gerekir.',
    keywords: ['nostalji', 'uzlaşma', 'iç çocuk', 'şefkat', 'denge'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_sa_pos7',
    card: 'Seven of Cups',
    position: 7,
    upright:
      'Olası gelecek: Çok seçenekli bir tablo oluşur; net kriterlerle gerçekçi seçim başarı getirir.',
    reversed:
      'Olası gelecek: Sis dağılır; hayal–gerçek ayrımı netleşir ve tek yola bağlanırsınız.',
    keywords: ['seçenek', 'vizyon', 'netlik', 'öncelik', 'karar'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_sa_pos7',
    card: 'Eight of Cups',
    position: 7,
    upright:
      'Olası gelecek: Anlamlı olana doğru olgun bir ayrılış; kalbiniz yeni ufka yönelir.',
    reversed:
      'Olası gelecek: Dönmek ya da kalmak ikilemi uzayabilir; kapanış ritüeli netlik sağlar.',
    keywords: ['ayrılış', 'anlam', 'yol', 'cesaret', 'kapanış'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_sa_pos7',
    card: 'Nine of Cups',
    position: 7,
    upright:
      'Olası gelecek: Dilek gerçekleşir; kişisel tatmin ve minnet duygusu artar.',
    reversed:
      'Olası gelecek: Yüzeysel hazlar doyum getirmeyebilir; değer odaklı hedefler gerekir.',
    keywords: ['tatmin', 'dilek', 'minnet', 'haz', 'değer'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_sa_pos7',
    card: 'Ten of Cups',
    position: 7,
    upright:
      'Olası gelecek: Uyumlu, barışçıl ve destekleyici bir atmosfer; aile/ekip huzuru yerleşir.',
    reversed:
      'Olası gelecek: İdeal–realite farkı gerginlik yaratabilir; sahici diyalogla köprü kurulur.',
    keywords: ['uyum', 'huzur', 'birlik', 'aile', 'gerçeklik'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_sa_pos7',
    card: 'Page of Cups',
    position: 7,
    upright:
      'Olası gelecek: Yaratıcı bir haber/teklif gelir; ilham kıvılcımı yeni projeyi başlatır.',
    reversed:
      'Olası gelecek: Aşırı hassasiyet ya da kaçış eğilimi fırsatı erteleyebilir; somut adım gerek.',
    keywords: ['ilham', 'teklif', 'haber', 'hassasiyet', 'başlangıç'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_sa_pos7',
    card: 'Knight of Cups',
    position: 7,
    upright:
      'Olası gelecek: Zarif bir teklif/işbirliği gelir; idealizmle hareket ivmeyi artırır.',
    reversed:
      'Olası gelecek: Tutarsız vaatler hayal kırıklığı yaratabilir; söz–eylem uyumu sınanır.',
    keywords: ['teklif', 'vizyon', 'zarafet', 'ittifak', 'tutarlılık'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_sa_pos7',
    card: 'Queen of Cups',
    position: 7,
    upright:
      'Olası gelecek: Empatik liderlik ve güvenli duygusal alan yerleşir; şifa kalıcı hale gelir.',
    reversed:
      'Olası gelecek: Sınır erimesi yorgunluk yaratabilir; öz-bakım ve çerçeveye ihtiyaç vardır.',
    keywords: ['empati', 'şifa', 'sınır', 'liderlik', 'güven'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_sa_pos7',
    card: 'King of Cups',
    position: 7,
    upright:
      'Olası gelecek: Duygusal olgunlukla krizler sükûnetle yönetilir; güven veren bir sonuç oluşur.',
    reversed:
      'Olası gelecek: Bastırılmış duygular pasif-agresif dalgalanmalara yol açabilir; açık ifade şart olur.',
    keywords: ['olgunluk', 'sükunet', 'liderlik', 'ifade', 'denge'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kupalar',
  },

  // SWORDS (Kılıçlar)
  {
    id: 'ace_of_swords_sa_pos7',
    card: 'Ace of Swords',
    position: 7,
    upright:
      'Olası gelecek: Zihinsel bir atılım ve keskin bir karar tabloyu netleştirir; hakikat işleri hızlandırır.',
    reversed:
      'Olası gelecek: Bilgi kirliliği ve bulanıklık sürerse karar ertelenebilir; sadeleştirme gerekir.',
    keywords: ['atılım', 'netlik', 'gerçek', 'karar', 'iletişim'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sa_pos7',
    card: 'Two of Swords',
    position: 7,
    upright:
      'Olası gelecek: Geçici bir stalemate devam eder; duyguyu masaya almadan terazi dengeye gelmez.',
    reversed:
      'Olası gelecek: Kör nokta aydınlanır ve karar verilir; akış yeniden başlar.',
    keywords: ['stalemate', 'ikilem', 'denge', 'yüzleşme', 'karar'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sa_pos7',
    card: 'Three of Swords',
    position: 7,
    upright:
      'Olası gelecek: Sert bir gerçek ya da hayal kırıklığıyla yüzleşilir; bu açıklık iyileşmeyi başlatır.',
    reversed: 'Olası gelecek: İyileşme hızlanır; affediş köprüleri onarır.',
    keywords: ['kırgınlık', 'gerçek', 'iyileşme', 'ifade', 'affediş'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sa_pos7',
    card: 'Four of Swords',
    position: 7,
    upright:
      'Olası gelecek: Dinlenme ve toparlanma süreci meyve verir; zihin soğuduğunda çözüm belirir.',
    reversed:
      'Olası gelecek: Dinlenme ertelenirse tükenmişlik uzayabilir; mikro molalar şart olur.',
    keywords: ['dinlenme', 'toparlanma', 'sükunet', 'strateji', 'yenilenme'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sa_pos7',
    card: 'Five of Swords',
    position: 7,
    upright:
      'Olası gelecek: Pyrrhus zaferi tadında, bedeli yüksek bir kazanım mümkündür; ilişkisel maliyet görünür olur.',
    reversed: 'Olası gelecek: Onarım ve yüz kurtaran uzlaşı kapısı aralanır.',
    keywords: ['çatışma', 'zafer', 'maliyet', 'ego', 'uzlaşı'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sa_pos7',
    card: 'Six of Swords',
    position: 7,
    upright:
      'Olası gelecek: Daha sakin sulara geçilir; yumuşak bir geçiş huzur getirir.',
    reversed:
      'Olası gelecek: Eski bağlar ilerlemeyi geciktirebilir; kademeli taşınma gerekir.',
    keywords: ['geçiş', 'iyileşme', 'sükunet', 'rota', 'uzaklaşma'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sa_pos7',
    card: 'Seven of Swords',
    position: 7,
    upright:
      'Olası gelecek: Akıllı bir taktik kısa vadeli kazanım getirebilir; ancak güven yönetimi kritik olur.',
    reversed:
      'Olası gelecek: Saklı meselelerin açığa çıkması temizlik fırsatı yaratır; şeffaflık güveni yeniler.',
    keywords: ['strateji', 'taktik', 'güven', 'şeffaflık', 'risk'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sa_pos7',
    card: 'Eight of Swords',
    position: 7,
    upright:
      'Olası gelecek: Öz-kısıtlayıcı inançlar sürerse hareket dar kalır; kanıt temelli denemeler şarttır.',
    reversed:
      'Olası gelecek: Zihinsel düğümler çözülür; özgürleşme adımları hızlanır.',
    keywords: ['öz-kısıt', 'korku', 'serbestleşme', 'inanç', 'deney'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sa_pos7',
    card: 'Nine of Swords',
    position: 7,
    upright:
      'Olası gelecek: Kaygı zirve yapıp ardından gerçeklik testiyle sönebilir; destek ve ritüel rahatlatır.',
    reversed:
      'Olası gelecek: Uykusuz gecelerin ardından netlik gelir; zihinsel yük hafifler.',
    keywords: ['kaygı', 'uykusuzluk', 'gerçeklik', 'regülasyon', 'rahatlama'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sa_pos7',
    card: 'Ten of Swords',
    position: 7,
    upright:
      'Olası gelecek: Kesin bir bitiş; hikâye kapanır ve yeniden doğuş eşiği görünür.',
    reversed:
      'Olası gelecek: Toparlanma başlar; geçmiş yük atılır ve güç geri toplanır.',
    keywords: ['bitiş', 'kapanış', 'yeniden doğuş', 'iyileşme', 'kabul'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sa_pos7',
    card: 'Page of Swords',
    position: 7,
    upright:
      'Olası gelecek: Merak tetiklenir; haber, fikir ya da öğrenme fırsatı ilerlemeyi hızlandırır.',
    reversed:
      'Olası gelecek: Dedikodu ve acele yargı hataya yol açabilir; doğrulama kritik olur.',
    keywords: ['merak', 'haber', 'öğrenme', 'doğrulama', 'iletişim'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sa_pos7',
    card: 'Knight of Swords',
    position: 7,
    upright:
      'Olası gelecek: Hızlı hamle ve keskin iletişim sonuç getirir; sürat stratejiyle birleşir.',
    reversed:
      'Olası gelecek: Acelecilik çatışma ve geri tepme riskini artırır; ritmi ayarlamak gerekir.',
    keywords: ['hız', 'kararlılık', 'söylem', 'strateji', 'risk'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sa_pos7',
    card: 'Queen of Swords',
    position: 7,
    upright:
      'Olası gelecek: Nesnel bir karar ve net sınırlar adil bir sonuca götürür.',
    reversed:
      'Olası gelecek: Sert üslup bağlantıyı zayıflatabilir; şefkatle net olmak gerekir.',
    keywords: ['nesnellik', 'sınır', 'adalet', 'iletişim', 'netlik'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sa_pos7',
    card: 'King of Swords',
    position: 7,
    upright:
      'Olası gelecek: Stratejik ve etik bir hüküm verilir; sistem kuran akıl güven inşa eder.',
    reversed:
      'Olası gelecek: Katı/dogmatik yaklaşım tıkanma yaratabilir; empatik çerçeve gerekir.',
    keywords: ['strateji', 'etik', 'otorite', 'kural', 'güven'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Kılıçlar',
  },

  // WANDS (Asalar)
  {
    id: 'ace_of_wands_sa_pos7',
    card: 'Ace of Wands',
    position: 7,
    upright:
      'Olası gelecek: İlham kıvılcımı güçlü bir girişimi ateşler; enerji ve cesaret yükselir.',
    reversed:
      'Olası gelecek: Yanlış zamanlama ya da korku başlangıcı geciktirebilir; minik eylem akışı açar.',
    keywords: ['ilham', 'başlangıç', 'enerji', 'cesaret', 'hareket'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_sa_pos7',
    card: 'Two of Wands',
    position: 7,
    upright:
      'Olası gelecek: Ufuk genişler; planlı bir şekilde konfor alanı dışına çıkılır.',
    reversed:
      'Olası gelecek: Tereddüt vizyonu daraltabilir; küçük pilot adım ivme verir.',
    keywords: ['vizyon', 'plan', 'ufuk', 'risk', 'genişleme'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_sa_pos7',
    card: 'Three of Wands',
    position: 7,
    upright:
      'Olası gelecek: Beklenen sonuçlar ufukta görünür; işbirlikleri meyve verir.',
    reversed:
      'Olası gelecek: Gecikmeler zaman çizelgesini zorlayabilir; plan revizyonu gerekebilir.',
    keywords: ['genişleme', 'işbirliği', 'zamanlama', 'ufuk', 'teslim'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_sa_pos7',
    card: 'Four of Wands',
    position: 7,
    upright:
      'Olası gelecek: Sağlam bir eşik ve kutlama; temelin güçlendiği bir döneme girilir.',
    reversed:
      'Olası gelecek: Eşik tamamlanmadan kutlama zayıf kalır; eksikleri kapatmak gerekir.',
    keywords: ['eşik', 'kutlama', 'istikrar', 'aidiyet', 'temel'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_sa_pos7',
    card: 'Five of Wands',
    position: 7,
    upright:
      'Olası gelecek: Rekabet ve yaratıcı sürtünme devam eder; net kurallar verimi artırır.',
    reversed:
      'Olası gelecek: Çatışma çözümüne geçilir; düzenleyici çerçeve gerilimi düşürür.',
    keywords: ['rekabet', 'prova', 'kural', 'mücadele', 'çözüm'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_sa_pos7',
    card: 'Six of Wands',
    position: 7,
    upright: 'Olası gelecek: Görünür bir zafer ve tanınma; motivasyon artar.',
    reversed:
      'Olası gelecek: Takdir eksikliği algısı oluşabilir; başarıyı ölçmek ve anlatmak gerekir.',
    keywords: ['zafer', 'tanınma', 'algı', 'motivasyon', 'hikaye'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_sa_pos7',
    card: 'Seven of Wands',
    position: 7,
    upright:
      'Olası gelecek: Pozisyon korunur; tutarlı savunma üstünlük sağlar.',
    reversed:
      'Olası gelecek: Yorgunluk savunmayı zayıflatabilir; destek ve delege önem kazanır.',
    keywords: ['savunma', 'üstünlük', 'kararlılık', 'sınır', 'destek'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_sa_pos7',
    card: 'Eight of Wands',
    position: 7,
    upright:
      'Olası gelecek: Hızlı ilerleme ve net iletişim; fırsat penceresi açılır.',
    reversed:
      'Olası gelecek: Gecikme ve mesaj karmaşası ivmeyi düşürebilir; sıralamayı sadeleştirmek gerekir.',
    keywords: ['hız', 'iletişim', 'akış', 'senkron', 'fırsat'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_sa_pos7',
    card: 'Nine of Wands',
    position: 7,
    upright:
      'Olası gelecek: Son viraj dayanıklılıkla aşılır; küçük molalar gücü korur.',
    reversed:
      'Olası gelecek: Tükenmişlik riskini yönetmek gerekir; yükü hafifletmek şart olur.',
    keywords: ['dayanıklılık', 'son düzlük', 'koruma', 'mola', 'yük'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_sa_pos7',
    card: 'Ten of Wands',
    position: 7,
    upright:
      'Olası gelecek: Yük ağır ama tamamlanma yakın; öncelik ve delege ile bitiş gelir.',
    reversed:
      'Olası gelecek: Gereksiz yükler bırakılır; sadeleşme nefes aldırır.',
    keywords: ['yük', 'tamamlama', 'delege', 'sadelik', 'odak'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_sa_pos7',
    card: 'Page of Wands',
    position: 7,
    upright:
      'Olası gelecek: Keşif ve deneme yeni bir girişime evrilir; öğrenme yükselir.',
    reversed:
      'Olası gelecek: Hevesin çabuk sönmesi projeyi yarım bırakabilir; odak gerekir.',
    keywords: ['keşif', 'öğrenme', 'girişim', 'heves', 'odak'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_sa_pos7',
    card: 'Knight of Wands',
    position: 7,
    upright:
      'Olası gelecek: Cesur bir atılım momentum yaratır; hızlı ilerleme görünür olur.',
    reversed:
      'Olası gelecek: Savruk enerji ve yarıda kalma riski artar; taahhüt yönetimi şarttır.',
    keywords: ['cesaret', 'hız', 'momentum', 'taahhüt', 'ilerleme'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_sa_pos7',
    card: 'Queen of Wands',
    position: 7,
    upright:
      'Olası gelecek: Karizma ve özgüven etkisiyle alan büyür; ilham verici liderlik kalıcılaşır.',
    reversed:
      'Olası gelecek: Güvensizlik/kıyas gölgesi motivasyonu düşürebilir; öz-değerle hizalanmak gerekir.',
    keywords: ['karizma', 'liderlik', 'özgüven', 'ilham', 'görünürlük'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_sa_pos7',
    card: 'King of Wands',
    position: 7,
    upright:
      'Olası gelecek: Vizyon ölçeklenir; yetki devriyle etki alanı genişler.',
    reversed:
      'Olası gelecek: Otoriter ton direnç doğurur; dinlemek ve güç paylaşmak gerekir.',
    keywords: ['vizyon', 'ölçek', 'yetki', 'liderlik', 'etki'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Asalar',
  },

  // PENTACLES (Tılsımlar)
  {
    id: 'ace_of_pentacles_sa_pos7',
    card: 'Ace of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Somut bir fırsat/teklif gelir; sağlam temel üzerine büyüme başlar.',
    reversed:
      'Olası gelecek: Fırsat kaçırma ya da kıtlık zihniyeti ilerlemeyi sınırlar; küçük ama tutarlı adımlar gerekir.',
    keywords: ['fırsat', 'temel', 'büyüme', 'maddi güven', 'tohum'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_sa_pos7',
    card: 'Two of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Esnek denge korunur; çoklu sorumluluklar ritimle yönetilir.',
    reversed:
      'Olası gelecek: Dengesizlik ve erteleme döngüsü yükü artırabilir; sadeleştirme gerekir.',
    keywords: ['denge', 'zaman', 'esneklik', 'akış', 'öncelik'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_sa_pos7',
    card: 'Three of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: İşbirliği kalite üretir; ustalık görünür ve sonuçlar sağlam olur.',
    reversed:
      'Olası gelecek: Koordinasyon zayıflığı kaliteyi düşürebilir; roller netleştirilmelidir.',
    keywords: [
      'işbirliği',
      'ustalık',
      'kalite',
      'koordinasyon',
      'geri bildirim',
    ],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_sa_pos7',
    card: 'Four of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Güvenlik ve birikim artar; kontrollü tutum istikrar sağlar.',
    reversed:
      'Olası gelecek: Aşırı tutma büyümeyi yavaşlatır; ölçülü risk alanı açmak gerekir.',
    keywords: ['güvenlik', 'tasarruf', 'kontrol', 'istikrar', 'risk'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_sa_pos7',
    card: 'Five of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Geçici bir sıkışma veya destek eksikliği hissi yaşanabilir; yardım istemek önemlidir.',
    reversed:
      'Olası gelecek: Toparlanma başlar; yardım programları ve küçük kazanımlar moral verir.',
    keywords: ['sıkışma', 'destek', 'dayanıklılık', 'toparlanma', 'ağ'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_sa_pos7',
    card: 'Six of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Adil paylaşım ve kazan-kazan düzeni kurulur; güven pekişir.',
    reversed:
      'Olası gelecek: Koşullu destek güç dengesizliği yaratabilir; şeffaflık gerekir.',
    keywords: ['adalet', 'paylaşım', 'güven', 'denge', 'koşul'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_sa_pos7',
    card: 'Seven of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Sabırlı emek karşılığını verir; hasat yaklaşır ve verim görünür olur.',
    reversed:
      'Olası gelecek: Sabırsızlık veya batık maliyet tuzağı hatalı ısrar doğurabilir; pivot gündeme gelebilir.',
    keywords: ['hasat', 'sabır', 'verim', 'değerlendirme', 'pivot'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_sa_pos7',
    card: 'Eight of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Ustalık artar; düzenli pratik kaliteyi ve güveni yükseltir.',
    reversed:
      'Olası gelecek: Oto-pilot ve özensizlik ilerlemeyi durdurabilir; standardı tazelemek gerekir.',
    keywords: ['ustalık', 'pratik', 'kalite', 'disiplin', 'odak'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_sa_pos7',
    card: 'Nine of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Bağımsızlık ve zarif yeterlilik yerleşir; emeğin meyvesi keyifle yaşanır.',
    reversed:
      'Olası gelecek: Savurganlık veya aşırı bağımlılık risk oluşturur; disiplin ve sınır gerekir.',
    keywords: ['bağımsızlık', 'konfor', 'öz-değer', 'disiplin', 'sınır'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_sa_pos7',
    card: 'Ten of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Uzun vadeli istikrar, aile/kurumsal destek ve kalıcı bir miras oluşur.',
    reversed:
      'Olası gelecek: Varlık/rol çekişmeleri düzeni zorlayabilir; şeffaf kurallar şarttır.',
    keywords: ['istikrar', 'miras', 'sistem', 'ağ', 'sürdürülebilirlik'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_sa_pos7',
    card: 'Page of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Eğitim/beceri/iş fırsatı doğar; küçük somut adım yeni kapı açar.',
    reversed:
      'Olası gelecek: Erteleme ve dağınık odak fırsatı kaçırabilir; planlı çalışma gerek.',
    keywords: ['öğrenme', 'hedef', 'başlangıç', 'plan', 'somut adım'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_sa_pos7',
    card: 'Knight of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Yavaş ama emin ilerleme; rutin ve tutarlılıkla hedefe varılır.',
    reversed:
      'Olası gelecek: Aşırı durağanlık fırsat kaçırabilir; sürece küçük çeviklik eklemek gerekir.',
    keywords: ['tutarlılık', 'rutin', 'istikrar', 'çeviklik', 'ilerleme'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_sa_pos7',
    card: 'Queen of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Şefkatli pratiklikle kaynaklar iyi yönetilir; bereket ve güven artar.',
    reversed:
      'Olası gelecek: Aşırı yüklenme yıpratabilir; öz-bakım ve destek ağı gerekir.',
    keywords: ['pratiklik', 'kaynak', 'öz-bakım', 'bereket', 'denge'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_sa_pos7',
    card: 'King of Pentacles',
    position: 7,
    upright:
      'Olası gelecek: Maddi güvence, stratejik liderlik ve kalıcı başarı; sistem meyve verir.',
    reversed:
      'Olası gelecek: Aşırı kontrol ve statü odağı esnekliği kısıtlayabilir; yetki paylaşımı gerekir.',
    keywords: ['güvence', 'liderlik', 'sistem', 'bolluk', 'paylaşım'],
    context: 'Gelecek potansiyeli ve olası sonuçlar',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 7 anlamını bulma fonksiyonu
export const getPosition7Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return position7Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getSituationAnalysisPosition7Meaning = (
  cardName: string,
  _isReversed: boolean = false
): SituationAnalysisPositionMeaning | undefined => {
  return getPosition7Meaning(cardName);
};

// Kart adına göre pozisyon 7 anlamını bulma fonksiyonu (ana index için)
export const getSituationAnalysisPosition7MeaningByCardName = (
  cardName: string,
  _isReversed: boolean = false
): SituationAnalysisPositionMeaning | undefined => {
  const meaning = getPosition7Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 7 anlamlarını alma fonksiyonu
export const getAllPosition7Meanings =
  (): SituationAnalysisPositionMeaning[] => {
    return position7Meanings;
  };

// Pozisyon 7 anlamlarını filtreleme fonksiyonu
export const getPosition7MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): SituationAnalysisPositionMeaning[] => {
  return position7Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 7 anlamlarını arama
export const searchPosition7MeaningsByKeyword = (
  keyword: string
): SituationAnalysisPositionMeaning[] => {
  return position7Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position7Meanings,
  getPosition7Meaning,
  getAllPosition7Meanings,
  getPosition7MeaningsByGroup,
  searchPosition7MeaningsByKeyword,
};
