/*
info:
---
Dosya Amacı:
- Problem Çözme açılımında 1. pozisyon (Mevcut Durum) için özel kart anlamları
- Her kartın bu pozisyonda nasıl yorumlanacağını belirler
- Pozisyon özel anlamlar + genel kart anlamlarını birleştirir

Bağlı Dosyalar:
- position-meanings-index.ts (ana index dosyası)
- ProblemSolvingTarot.tsx (ana bileşen)

Üretime Hazır mı?:
- Evet, detaylı anlamlar mevcut
---

*/

import { TarotCard } from '@/types/tarot';

export interface NewLoverposition6Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar';
}

// i18n destekli interface
export interface I18nNewLoverposition6Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position6Meanings: NewLoverposition6Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ma_pos6',
    card: 'The Fool',
    position: 6,
    upright:
      'Deli, dileğinizin gerçekleşme yolunda size yeni bir başlangıç ve cesur adımlar vaat ettiğini gösterir. Beklenmedik bir fırsatla hayallerinizin kapısı açılabilir.',
    reversed:
      'Ters Deli, aceleci davranışların dileğinizi zorlaştırabileceğini söyler. Hazırlıksız adımlar hayal kırıklığına dönüşebilir.',
    keywords: ['başlangıç', 'cesaret', 'fırsat', 'risk', 'yeni yol'],
    context: 'Cesur ve bilinçli adımlar dileğinizi gerçeğe dönüştürebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos6',
    card: 'The Magician',
    position: 6,
    upright:
      'Büyücü, dileğinizin gerçekleşmesi için tüm araçlara sahip olduğunuzu gösterir. Niyetinizi net belirleyip harekete geçerseniz hayalleriniz somutlaşacaktır.',
    reversed:
      'Ters Büyücü, dileğinizi gerçekleştirme gücünüzü yanlış kullanabileceğinizi veya dağınık odak nedeniyle fırsatları kaçırabileceğinizi işaret eder.',
    keywords: ['niyet', 'yaratma', 'odak', 'güç', 'başarı'],
    context: 'Net niyet ve kararlı eylem dileğinizi gerçeğe taşır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos6',
    card: 'The High Priestess',
    position: 6,
    upright:
      'Başrahibe, dileğinizin gerçekleşmesinin içsel sezgilerinize güvenmekten geçtiğini söyler. İç dünyanızı dinleyerek doğru zamanı ve yolu bulabilirsiniz.',
    reversed:
      'Ters Başrahibe, dileğinizin gerçekleşmesini engelleyenin sezgilerinizi görmezden gelmeniz olduğunu gösterir. İç sesinizi bastırmak ilerlemeyi zorlaştırır.',
    keywords: ['sezgi', 'sabır', 'bilgelik', 'zamanlama', 'içsel güç'],
    context: 'Sezgi ve sabır dileğinizin yolunu açacaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos6',
    card: 'The Empress',
    position: 6,
    upright:
      'İmparatoriçe, dileğinizin bolluk, bereket ve doğal akışla gerçekleşme potansiyeline sahip olduğunu gösterir. Dileğiniz meyveye durabilir.',
    reversed:
      'Ters İmparatoriçe, aşırı beklenti ya da öz bakım eksikliğinin dileğinizin gerçekleşmesini zorlaştırabileceğini işaret eder.',
    keywords: ['bolluk', 'bereket', 'yaratıcılık', 'doğa', 'akış'],
    context: 'Doğal akış ve öz bakım dileğinizi besler.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos6',
    card: 'The Emperor',
    position: 6,
    upright:
      'İmparator, dileğinizin gerçekleşmesi için disiplin ve sağlam plan gerektiğini gösterir. Düzen kurduğunuzda isteğiniz kalıcı hale gelir.',
    reversed:
      'Ters İmparator, aşırı kontrol veya katılık nedeniyle dileğinizin gerçekleşmesinin zorlaşabileceğini anlatır.',
    keywords: ['düzen', 'disiplin', 'istikrar', 'plan', 'otorite'],
    context: 'Sağlam yapı dileğinizin temeli olacaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos6',
    card: 'The Hierophant',
    position: 6,
    upright:
      'Aziz, dileğinizin gerçekleşmesi için rehberlik, değerler ve destekleyici bağların önemine işaret eder. Geleneksel yollar başarıya götürebilir.',
    reversed:
      'Ters Aziz, körü körüne geleneklere bağlı kalmanın dileğinizin önünü tıkayabileceğini söyler. Özgün yolunuzu keşfetmelisiniz.',
    keywords: ['değerler', 'rehberlik', 'gelenek', 'uyum', 'destek'],
    context: 'Doğru rehberlik dileğinizi kolaylaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos6',
    card: 'The Lovers',
    position: 6,
    upright:
      'Aşıklar, dileğinizin gerçekleşmesinde doğru seçimlerin ve uyumlu bağların etkili olacağını gösterir. Kalbinizden gelen seçim sizi hedefinize ulaştırır.',
    reversed:
      'Ters Aşıklar, dileğinizin önünde kararsızlık ve çatışan değerler olduğunu işaret eder. Seçim netleşmezse dilek gerçekleşmeyebilir.',
    keywords: ['seçim', 'uyum', 'bağ', 'değerler', 'karar'],
    context: 'Net seçim dileğinize giden kapıyı açar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos6',
    card: 'The Chariot',
    position: 6,
    upright:
      'Savaş Arabası, dileğinizin güçlü irade ve odakla gerçekleşeceğini söyler. Kontrolü elinize alırsanız başarıya ulaşırsınız.',
    reversed:
      'Ters Savaş Arabası, dağınıklık veya yönsüzlük dileğinizin önünü kapatabilir. Net hedef belirlemek gerekir.',
    keywords: ['irade', 'kontrol', 'başarı', 'yön', 'zafer'],
    context: 'Odaklı irade dileğinizin gerçekleşmesini sağlar.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos6',
    card: 'Strength',
    position: 6,
    upright:
      'Güç, dileğinizin sabır, şefkat ve içsel cesaretle gerçekleşeceğini gösterir. Nazik gücünüzle engelleri aşabilirsiniz.',
    reversed:
      'Ters Güç, sabırsızlık ve içsel güvensizliğin dileğinizin önünde engel oluşturabileceğini söyler.',
    keywords: ['cesaret', 'şefkat', 'sabır', 'özgüven', 'denge'],
    context: 'İçsel güç dileğinizin gerçekleşmesini kolaylaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos6',
    card: 'The Hermit',
    position: 6,
    upright:
      'Ermiş, dileğinizin gerçekleşmesi için içe dönüp kendi ışığınızı takip etmeniz gerektiğini söyler. Sabır ve yalnızlık süreci gerekebilir.',
    reversed:
      'Ters Ermiş, aşırı izolasyonun dileğinizin gerçekleşmesini zorlaştırabileceğini gösterir. Paylaşım da önemlidir.',
    keywords: ['içsel yolculuk', 'sabır', 'ışık', 'bilgelik', 'rehberlik'],
    context: 'İçsel rehberlik dileğinize giden yolu açar.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos6',
    card: 'The Wheel of Fortune',
    position: 6,
    upright:
      'Kader Çarkı, dileğinizin gerçekleşmesinde şans ve doğru zamanlamanın önemli olduğunu gösterir. Döngüler size fırsat sunacak.',
    reversed:
      'Ters Kader Çarkı, talihsizlik veya direnç yüzünden dileğinizin gecikebileceğini gösterir.',
    keywords: ['kader', 'zamanlama', 'fırsat', 'döngü', 'şans'],
    context: 'Doğru zaman dileğinizin gerçekleşmesini kolaylaştırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos6',
    card: 'Justice',
    position: 6,
    upright:
      'Adalet, dileğinizin gerçekleşmesinde adil seçimler ve dengeli yaklaşımların önemli olduğunu söyler. Hak edişler karşılığını bulacaktır.',
    reversed:
      'Ters Adalet, haksızlık veya dengesizlik nedeniyle dileğinizin ertelenebileceğini gösterir.',
    keywords: ['adalet', 'denge', 'hakikat', 'dürüstlük', 'sonuç'],
    context: 'Adil ve şeffaf yaklaşım dileğinizi hızlandırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos6',
    card: 'The Hanged Man',
    position: 6,
    upright:
      'Asılan Adam, dileğinizin gerçekleşmesi için sabır ve yeni bakış açıları gerektiğini gösterir. Teslimiyetle süreç kolaylaşır.',
    reversed:
      'Ters Asılan Adam, isteksizlik ve inatçılığın dileğinizi geciktirebileceğini söyler.',
    keywords: ['sabır', 'teslimiyet', 'perspektif', 'bekleyiş', 'farkındalık'],
    context: 'Teslimiyet ve yeni bakış dileğinizi gerçeğe dönüştürür.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos6',
    card: 'Death',
    position: 6,
    upright:
      'Ölüm, dileğinizin gerçekleşmesi için bir şeylerden vazgeçmeniz gerektiğini söyler. Dönüşümle yeni dilekler filizlenecektir.',
    reversed:
      'Ters Ölüm, eskiye tutunmak dileğinizin gerçekleşmesini engelleyebilir. Bırakmanız gerekenleri bırakmalısınız.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'vedalaşma', 'doğuş'],
    context: 'Bitişler yeni dileklerin yolunu açar.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos6',
    card: 'Temperance',
    position: 6,
    upright:
      'Denge, dileğinizin gerçekleşmesi için uyum ve sabır gerektiğini söyler. Ölçülü adımlar sizi hedefinize taşır.',
    reversed:
      'Ters Denge, aşırılıkların dileğinizi zorlaştırabileceğini işaret eder.',
    keywords: ['denge', 'sabır', 'uyum', 'orta yol', 'huzur'],
    context: 'Orta yol dileğinizi gerçeğe taşıyacaktır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos6',
    card: 'The Devil',
    position: 6,
    upright:
      'Şeytan, dileğinizin gerçekleşmesi için bağımlılıklardan ve sınırlayıcı inançlardan özgürleşmeniz gerektiğini söyler.',
    reversed:
      'Ters Şeytan, zincirlerden kurtuluş ve özgürleşme ile dileğinizin yolunun açılabileceğini gösterir.',
    keywords: ['özgürleşme', 'bağımlılık', 'gölge', 'sınır', 'irade'],
    context: 'Özgürleşmek dileğinizin önünü açar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos6',
    card: 'The Tower',
    position: 6,
    upright:
      'Kule, dileğinizin gerçekleşmesi için hayatınızda ani ve köklü değişimler olabileceğini gösterir. Yıkım sonrası yeniden inşa mümkündür.',
    reversed:
      'Ters Kule, gerekli değişimlerden kaçmanın dileğinizin gerçekleşmesini geciktirebileceğini söyler.',
    keywords: ['yıkım', 'değişim', 'farkındalık', 'yeniden inşa', 'gerçek'],
    context: 'Ani değişimler dileğinize yer açar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos6',
    card: 'The Star',
    position: 6,
    upright:
      'Yıldız, dileğinizin gerçekleşeceğine dair umut ve ilham verir. İnancınızı koruyarak şifalı bir sürece girebilirsiniz.',
    reversed:
      'Ters Yıldız, umutsuzluk ve inançsızlığın dileğinizin gerçekleşmesini zorlaştırabileceğini söyler.',
    keywords: ['umut', 'şifa', 'ilham', 'inanç', 'yenilenme'],
    context: 'Umudu korumak dileğinizi çağırır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos6',
    card: 'The Moon',
    position: 6,
    upright:
      'Ay, dileğinizin gerçekleşmesi yolunda belirsizlikler olabileceğini gösterir. Sezgilerinize güvenmek size yol gösterecektir.',
    reversed:
      'Ters Ay, aldanma veya korkuların dileğinizi engelleyebileceğini gösterir. Netlik arayışı önemlidir.',
    keywords: ['belirsizlik', 'sezgi', 'korku', 'aydınlanma', 'içgörü'],
    context: 'Sezgiler netliği getirirse dileğiniz gerçekleşebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos6',
    card: 'The Sun',
    position: 6,
    upright:
      'Güneş, dileğinizin gerçekleşeceğini müjdeler. Sevinç, başarı ve netlik enerjisiyle dileğiniz hayata geçecektir.',
    reversed:
      'Ters Güneş, geçici karamsarlıkların dileğinizin ışığını gölgeleyebileceğini gösterir. Gerçek sevinç yeniden açığa çıkacaktır.',
    keywords: ['mutluluk', 'başarı', 'netlik', 'sevinç', 'umut'],
    context: 'Olumlu enerji dileğinizin gerçekleşmesini destekler.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos6',
    card: 'Judgement',
    position: 6,
    upright:
      'Mahkeme, dileğinizin gerçekleşmesi için geçmişle yüzleşip karar vermeniz gerektiğini söyler. Doğru seçim sizi hedefinize ulaştırır.',
    reversed:
      'Ters Mahkeme, geçmişin ağırlığının dileğinizin gerçekleşmesini geciktirdiğini işaret eder.',
    keywords: ['karar', 'yenilenme', 'yüzleşme', 'özgürleşme', 'seçim'],
    context: 'Net karar dileğinizin kapısını açar.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos6',
    card: 'The World',
    position: 6,
    upright:
      'Dünya, dileğinizin gerçekleşeceğini ve tamamlanma döngüsüne ulaşacağınızı gösterir. İstediğiniz sonuç kutlama getirebilir.',
    reversed:
      'Ters Dünya, eksik kalan parçalar nedeniyle dileğinizin tamamlanmasının gecikebileceğini işaret eder.',
    keywords: ['tamamlanma', 'kutlama', 'başarı', 'bütünlük', 'zafer'],
    context: 'Tamamlanma dileğinizin gerçekleşmesini onaylar.',
    group: 'Majör Arkana',
  },

  //-- Kupalar --//
  {
    id: 'ace_of_cups_cu_pos6',
    card: 'Ace of Cups',
    position: 6,
    upright:
      'Asların gücüyle, dileğinizin duygusal anlamda yeni bir başlangıç getirme ihtimali çok yüksek. Kalbinizden geçenin karşılık bulacağı, taze bir mutluluk doğabilir.',
    reversed:
      'Ters As, dileğinizin gerçekleşmesini duygusal tıkanıklık veya kendinizi kapatmanız engelleyebilir. Kalbinizi açmadığınız sürece fırsatlar görünmez kalabilir.',
    keywords: ['başlangıç', 'duygu', 'açılım', 'şans', 'umut'],
    context: 'Kalbinizi açarsanız dileğinizin filizlenme ihtimali vardır.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cu_pos6',
    card: 'Two of Cups',
    position: 6,
    upright:
      'Bu kart, dileğinizin gerçekleşeceğini ve karşılıklı uyumla bir araya gelmeyi desteklediğini gösterir. Karşılıklı niyetler birleştiğinde dileğiniz hayat bulur.',
    reversed:
      'Ters ikili, uyumsuzluk veya yanlış anlaşılmalar nedeniyle dileğinizin gerçekleşmesinin gecikebileceğini anlatır. Netlik ve açık iletişim gerekir.',
    keywords: ['uyum', 'karşılıklılık', 'bağ', 'anlaşma', 'denge'],
    context: 'Karşılıklı niyet dileğinizi görünür kılar.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cu_pos6',
    card: 'Three of Cups',
    position: 6,
    upright:
      'Üçlü, dileğinizin gerçekleşmesinin kutlama ve sevinç getireceğini gösterir. Sosyal destek ve dostluklar bu yolda size eşlik edebilir.',
    reversed:
      'Ters üçlü, yüzeysel bağlar ya da yanlış çevrelerin dileğinizin gerçekleşmesini zorlaştırabileceğini işaret eder.',
    keywords: ['kutlama', 'destek', 'birlik', 'neşe', 'paylaşım'],
    context: 'Doğru çevre dileğinizin gerçekleşmesini kolaylaştırır.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cu_pos6',
    card: 'Four of Cups',
    position: 6,
    upright:
      'Dördül, dileğinizin gerçekleşmesi için önünüzde fırsatlar olsa da dikkatinizin dağınık olabileceğini gösterir. Duygusal uyanış dileğinizi çağırır.',
    reversed:
      'Ters dörtlü, dileğinizin yeniden canlanma ihtimaline işaret eder. Şükranla bakarsanız istediğiniz sonuç görünür olabilir.',
    keywords: ['fırsat', 'uyanış', 'tatminsizlik', 'şükran', 'farkındalık'],
    context: 'Farkındalık dileğinizin yolunu açacaktır.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cu_pos6',
    card: 'Five of Cups',
    position: 6,
    upright:
      'Beşli, dileğinizin gerçekleşme sürecinde hayal kırıklığı veya kayıplardan geçebileceğinizi gösterir. Ancak kalan imkânlara odaklanırsanız dileğiniz mümkün olabilir.',
    reversed:
      'Ters beşli, toparlanma ve yeniden umutla dileğinizin gerçekleşebileceğini gösterir.',
    keywords: ['kayıp', 'umut', 'şifa', 'yeniden doğuş', 'kabul'],
    context: 'Umudu korumak dileğinizi yaşatır.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cu_pos6',
    card: 'Six of Cups',
    position: 6,
    upright:
      'Altılı, dileğinizin gerçekleşme ihtimalini geçmişten gelen bir bağ veya nostaljik bir enerjiyle işaret eder. Tanıdık bir kapı açılabilir.',
    reversed:
      'Ters altılı, geçmişe fazlaca tutunmanın dileğinizin önünü kapatabileceğini söyler. Bugüne odaklanmak gerekir.',
    keywords: ['geçmiş', 'nostalji', 'bağ', 'şefkat', 'anı'],
    context: 'Geçmişten gelen bağ dileğinizi tetikleyebilir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cu_pos6',
    card: 'Seven of Cups',
    position: 6,
    upright:
      'Yedili, dileğinizin gerçekleşmesi için önünüzde birçok seçenek olacağını gösterir. Netleşmek dileğinizi somutlaştırır.',
    reversed:
      'Ters yedili, hayallerden uyanıp gerçekçi seçimler yaparsanız dileğiniz gerçekleşebilir.',
    keywords: ['seçenek', 'hayal', 'netlik', 'vizyon', 'seçim'],
    context: 'Net seçim dileğinizi gerçeğe taşır.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cu_pos6',
    card: 'Eight of Cups',
    position: 6,
    upright:
      'Sekizli, dileğinizin gerçekleşmesi için bazı şeyleri geride bırakmanız gerektiğini gösterir. Yeniye yönelmek dileğinizin yolunu açar.',
    reversed:
      'Ters sekizli, gitmekle kalmak arasında kaldığınızda dileğiniz askıda kalabilir. Net karar gerekir.',
    keywords: ['ayrılış', 'yeni yol', 'cesaret', 'anlam', 'karar'],
    context: 'Bırakmak dileğinize yer açacaktır.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cu_pos6',
    card: 'Nine of Cups',
    position: 6,
    upright:
      'Dokuzlu, dileğinizin gerçekleşme olasılığının çok yüksek olduğunu gösterir. Kalbinizin tatmin olacağı bir sonuç yolda.',
    reversed:
      'Ters dokuzlu, yüzeysel tatminin dileğinizin özüne engel olabileceğini anlatır. Derin ihtiyaçlara odaklanmalısınız.',
    keywords: ['tatmin', 'doyum', 'mutluluk', 'bolluk', 'şükür'],
    context: 'Gerçek tatmin dileğinizi görünür kılar.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cu_pos6',
    card: 'Ten of Cups',
    position: 6,
    upright:
      'Onlu, dileğinizin gerçekleşmesinin kalıcı mutluluk ve uyum getireceğini gösterir. Ailevi huzur ve sevgi dolu bir ortam işaret edilir.',
    reversed:
      'Ters onlu, ideal beklentilerle gerçeklik çatışırsa dileğinizin tam olarak gerçekleşmesi zor olabilir.',
    keywords: ['mutluluk', 'uyum', 'aile', 'sevgi', 'huzur'],
    context: 'Sevgi dolu ortam dileğinizi destekler.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cu_pos6',
    card: 'Page of Cups',
    position: 6,
    upright:
      'Prens, dileğinizin gerçekleşmesinde küçük sürprizler ve yaratıcı başlangıçlar olacağını gösterir. Umulmadık bir haber dileğinizi çağırabilir.',
    reversed:
      'Ters prens, aşırı hayalcilik dileğinizi zorlaştırabilir. Gerçekçi yaklaşım gerekir.',
    keywords: ['ilham', 'yaratıcılık', 'başlangıç', 'merak', 'umut'],
    context: 'Küçük bir sürpriz dileğinize vesile olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cu_pos6',
    card: 'Knight of Cups',
    position: 6,
    upright:
      'Şövalye, dileğinizin gerçekleşmesini romantik bir teklif veya duygu yüklü bir gelişmenin getireceğini söyler.',
    reversed:
      'Ters şövalye, hayalperest vaatler veya tutarsız adımlar dileğinizi zora sokabilir.',
    keywords: ['romantizm', 'teklif', 'vizyon', 'adım', 'duygu'],
    context: 'Tutarlı romantik bir adım dileğinizi mümkün kılar.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cu_pos6',
    card: 'Queen of Cups',
    position: 6,
    upright:
      'Kraliçe, dileğinizin gerçekleşmesinde sezgi ve şefkatli desteklerin önemli rol oynayacağını gösterir.',
    reversed:
      'Ters kraliçe, duygusal dengesizlik veya fazla hassasiyet dileğinizi zorlaştırabilir.',
    keywords: ['sezgi', 'şefkat', 'destek', 'empati', 'bilgelik'],
    context: 'Sezgisel destek dileğinizi güçlendirir.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cu_pos6',
    card: 'King of Cups',
    position: 6,
    upright:
      'Kupa Kralı, dileğinizin olgun bir şekilde gerçekleşebileceğini söyler. Duygusal denge dileğinizin anahtarıdır.',
    reversed:
      'Ters kral, bastırılmış duygular veya pasiflik dileğinizin yolunu tıkayabilir.',
    keywords: ['denge', 'olgunluk', 'güven', 'huzur', 'liderlik'],
    context: 'Duygusal olgunluk dileğinizi mümkün kılar.',
    group: 'Kupalar',
  },
  //-- KILIÇLAR --//
  {
    id: 'ace_of_swords_sw_pos6',
    card: 'Ace of Swords',
    position: 6,
    upright:
      'As, dileğinizin gerçekleşmesini net bir farkındalık ve doğru karar ile mümkün kılar. Gerçeği cesurca ifade ettiğinizde dileğinizin önü açılır.',
    reversed:
      'Ters As, kafa karışıklığı veya iletişimde bulanıklık dileğinizin gerçekleşmesini engelleyebilir. Önce zihin berraklığı gerekir.',
    keywords: ['netlik', 'gerçek', 'karar', 'başlangıç', 'zihin'],
    context: 'Keskin farkındalık dileğinizi görünür kılar.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sw_pos6',
    card: 'Two of Swords',
    position: 6,
    upright:
      'İkili, dileğinizin gerçekleşmesinin ikilemli bir karar noktasına bağlı olduğunu gösterir. Gözünüzü açıp seçim yapmalısınız.',
    reversed:
      'Ters ikili, kaçınmalar dileğinizi askıya alabilir. Kararı geciktirmek dileğinizi uzaklaştırır.',
    keywords: ['ikilem', 'karar', 'denge', 'kaçınma', 'netlik'],
    context: 'Seçim yapmak dileğinizi ileri taşır.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sw_pos6',
    card: 'Three of Swords',
    position: 6,
    upright:
      'Üçlü, dileğinizin gerçekleşmesi yolunda bir hayal kırıklığı ya da kalp kırıklığı deneyimlenebileceğini söyler. Ancak bu farkındalıkla iyileşme gelir.',
    reversed:
      'Ters üçlü, yaraların sarılması dileğinizin gerçekleşme ihtimalini artırır. Acının dönüşümü yolu açar.',
    keywords: ['kırgınlık', 'gerçek', 'iyileşme', 'yas', 'farkındalık'],
    context: 'Şifa dileğinizin kapısını aralayabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sw_pos6',
    card: 'Four of Swords',
    position: 6,
    upright:
      'Dördül, dileğinizin gerçekleşmesi için dinlenmeye ve stratejik beklemeye ihtiyaç olduğunu gösterir. Sabırlı bir duraklama sonuç getirebilir.',
    reversed:
      'Ters dörtlü, aşırı yorgunluk veya mola almamak dileğinizi geciktirebilir. Yenilenmek şarttır.',
    keywords: ['dinlenme', 'sabır', 'strateji', 'bekleme', 'şifa'],
    context: 'Dileğiniz için kısa bir mola gerekli olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sw_pos6',
    card: 'Five of Swords',
    position: 6,
    upright:
      'Beşli, dileğinizin gerçekleşmesi için çatışmalardan uzak durmanız gerektiğini gösterir. Haklı çıkma isteği yerine uyum yol açar.',
    reversed:
      'Ters beşli, gerilimlerin çözülmesiyle dileğiniz gerçekleşebilir. Onarım dileğinizin önünü açar.',
    keywords: ['çatışma', 'ego', 'haklılık', 'onarım', 'denge'],
    context: 'Uyum dileğinizin enerjisini yükseltir.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sw_pos6',
    card: 'Six of Swords',
    position: 6,
    upright:
      'Altılı, dileğinizin gerçekleşmesinin güvenli bir geçiş veya uzaklaşma süreciyle mümkün olacağını gösterir.',
    reversed:
      'Ters altılı, eski bağlara tutunmak dileğinizi erteleyebilir. Geçişi kabullenmek gerekir.',
    keywords: ['geçiş', 'yolculuk', 'sükunet', 'iyileşme', 'uzaklaşma'],
    context: 'Geçiş süreci dileğinizin gerçekleşmesini kolaylaştırır.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sw_pos6',
    card: 'Seven of Swords',
    position: 6,
    upright:
      'Yedili, dileğinizin gerçekleşmesi için stratejik davranmanız gerektiğini söyler. Açık sözlülük güveni artırır.',
    reversed:
      'Ters yedili, gizlilik veya yarım gerçekler dileğinizin gerçekleşmesini zorlaştırabilir. Şeffaflık şarttır.',
    keywords: ['strateji', 'gizlilik', 'dürüstlük', 'plan', 'netlik'],
    context: 'Şeffaflık dileğinizi destekler.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sw_pos6',
    card: 'Eight of Swords',
    position: 6,
    upright:
      'Sekizli, dileğinizin gerçekleşmesini engelleyen en büyük şey kendi zihinsel kısıtlamalarınızdır. Zincirleri fark edin.',
    reversed:
      'Ters sekizli, özgürleşme yolunda atacağınız küçük adımlar dileğinizin yolunu açar.',
    keywords: ['öz-kısıt', 'zihin', 'korku', 'özgürleşme', 'farkındalık'],
    context: 'Zihinsel engeller kalktığında dileğiniz akabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sw_pos6',
    card: 'Nine of Swords',
    position: 6,
    upright:
      'Dokuzlu, dileğinizin gerçekleşmesini kaygı ve korkuların zorlaştırdığını söyler. Felaketleştirmeyi bırakın.',
    reversed:
      'Ters dokuzlu, sabah netliği ve iç huzuruyla dileğiniz daha yakın hale gelebilir.',
    keywords: ['kaygı', 'korku', 'uykusuzluk', 'şüphe', 'huzur'],
    context: 'Korkularınız dileğinizi geciktirebilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sw_pos6',
    card: 'Ten of Swords',
    position: 6,
    upright:
      'Onlu, dileğinizin mevcut bir döngünün bitişinden sonra gerçekleşebileceğini gösterir. Bir son yeni bir başlangıcı çağırır.',
    reversed:
      'Ters onlu, toparlanma ve yeniden doğuş dileğinizin gerçekleşmesini güçlendirir.',
    keywords: ['bitiş', 'yeniden doğuş', 'teslim', 'dönüşüm', 'umut'],
    context: 'Biten bir süreç dileğinizi başlatabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sw_pos6',
    card: 'Page of Swords',
    position: 6,
    upright:
      'Prens, dileğinizin gerçekleşmesinin araştırma ve gözlemle destekleneceğini gösterir. Merak yol açıcıdır.',
    reversed:
      'Ters prens, dedikodu veya acele yargılar dileğinizi zorlaştırabilir. Gerçek bilgilere odaklanın.',
    keywords: ['merak', 'gözlem', 'öğrenme', 'doğruluk', 'iletişim'],
    context: 'Araştırma dileğinize yön verebilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sw_pos6',
    card: 'Knight of Swords',
    position: 6,
    upright:
      'Şövalye, dileğinizin gerçekleşmesi için hızlı ve cesur bir adım gerekebilir. Kararlılıkla ilerlemek sonucu çağırır.',
    reversed:
      'Ters şövalye, acelecilik dileğinizi riske sokabilir. Sabır ve strateji önemlidir.',
    keywords: ['cesaret', 'hız', 'karar', 'adım', 'strateji'],
    context: 'Hızlı karar dileğinizi mümkün kılar.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sw_pos6',
    card: 'Queen of Swords',
    position: 6,
    upright:
      'Kraliçe, dileğinizin gerçekleşmesini netlik, adalet ve sınırlarla mümkün kılar. Nesnel yaklaşım önemlidir.',
    reversed:
      'Ters kraliçe, aşırı eleştiri veya sertlik dileğinizin yolunu tıkayabilir. Şefkatli dil açar.',
    keywords: ['netlik', 'adalet', 'sınır', 'doğruluk', 'zihin'],
    context: 'Adil ve net olmak dileğinizi güçlendirir.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sw_pos6',
    card: 'King of Swords',
    position: 6,
    upright:
      'Kral, dileğinizin gerçekleşmesini mantık, disiplin ve stratejiyle destekler. Etik güç sonucu kalıcı kılar.',
    reversed:
      'Ters kral, katılık veya soğukluk dileğinizin gerçekleşmesini zorlaştırabilir. Empati dengeyi getirir.',
    keywords: ['mantık', 'etik', 'otorite', 'disiplin', 'netlik'],
    context: 'Disiplin dileğinizin gerçekleşmesini sağlar.',
    group: 'Kılıçlar',
  },
  // --- Tılsımlar Serisi ---//
  {
    id: 'ace_of_pentacles_pe_pos6',
    card: 'Ace of Pentacles',
    position: 6,
    upright:
      'As, dileğinizin gerçekleşmesi için sağlam bir fırsatın önünüze çıkacağını gösterir. Maddi ya da somut bir başlangıç, dileğinize destek olur.',
    reversed:
      'Ters As, fırsatın fark edilmemesi veya kıtlık düşüncesi dileğinizi engelleyebilir. Şükran ve dikkat yol açıcıdır.',
    keywords: ['fırsat', 'başlangıç', 'bolluk', 'somut', 'temel'],
    context: 'Sağlam bir fırsat dileğinizi mümkün kılabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pe_pos6',
    card: 'Two of Pentacles',
    position: 6,
    upright:
      'İkili, dileğinizin gerçekleşmesi için esnek denge ve zaman yönetimi gerektiğini gösterir. Küçük ayarlar büyük sonuç doğurabilir.',
    reversed:
      'Ters ikili, dengesizlik ve erteleme dileğinizi geciktirebilir. Öncelik belirlemek gerekir.',
    keywords: ['denge', 'zaman', 'esneklik', 'öncelik', 'akış'],
    context: 'Dengeli adımlar dileğinizin yolunu açar.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pe_pos6',
    card: 'Three of Pentacles',
    position: 6,
    upright:
      'Üçlü, dileğinizin gerçekleşmesini ekip desteği ve işbirliğiyle mümkün kılar. Ortak çaba somut sonuç getirir.',
    reversed:
      'Ters üçlü, rol belirsizliği veya uyumsuz işbirlikleri dileğinizi zorlaştırabilir.',
    keywords: ['işbirliği', 'destek', 'uyum', 'rol', 'emek'],
    context: 'Ortak çaba dileğinizi güçlendirir.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pe_pos6',
    card: 'Four of Pentacles',
    position: 6,
    upright:
      'Dörtlü, dileğinizin gerçekleşmesi için istikrar ve sahiplenme isteğini gösterir. Kontrollü bir yaklaşım dileğinizi sağlamlaştırabilir.',
    reversed:
      'Ters dörtlü, aşırı tutma veya bırakmamak dileğinizin önünü kapatabilir. Esneklik gerekir.',
    keywords: ['güvenlik', 'kontrol', 'istikrar', 'koruma', 'denge'],
    context: 'Aşırı tutma yerine esneklik dileğinizi açar.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pe_pos6',
    card: 'Five of Pentacles',
    position: 6,
    upright:
      'Beşli, dileğinizin gerçekleşmesini engelleyen yoksunluk hissi olabilir. Destek alırsanız yol açılır.',
    reversed:
      'Ters beşli, toparlanma ve yardım alma dileğinizin gerçekleşmesini kolaylaştırır.',
    keywords: ['yoksunluk', 'destek', 'toparlanma', 'dayanıklılık', 'yardım'],
    context: 'Destek almak dileğinizin önünü açar.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pe_pos6',
    card: 'Six of Pentacles',
    position: 6,
    upright:
      'Altılı, dileğinizin gerçekleşmesinde adil paylaşım ve destek rol oynar. Şeffaf alışveriş yol açıcıdır.',
    reversed:
      'Ters altılı, güç dengesizliği dileğinizi engelleyebilir. Adalet önemlidir.',
    keywords: ['paylaşım', 'adalet', 'denge', 'destek', 'şeffaflık'],
    context: 'Adil denge dileğinizi mümkün kılar.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pe_pos6',
    card: 'Seven of Pentacles',
    position: 6,
    upright:
      'Yedili, dileğinizin gerçekleşmesi için sabırlı bekleyiş ve değerlendirme gerektiğini gösterir. Küçük iyileştirmeler süreci hızlandırır.',
    reversed:
      'Ters yedili, sabırsızlık veya batık maliyet düşüncesi dileğinizi zorlaştırabilir.',
    keywords: ['sabır', 'değerlendirme', 'bekleyiş', 'emek', 'hasat'],
    context: 'Sabır dileğinizin meyvesini getirir.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pe_pos6',
    card: 'Eight of Pentacles',
    position: 6,
    upright:
      'Sekizli, dileğinizin gerçekleşmesini düzenli emek ve disiplinli çalışma ile destekler. Süreklilik başarı getirir.',
    reversed:
      'Ters sekizli, özensizlik veya motivasyon kaybı dileğinizi zorlaştırabilir.',
    keywords: ['emek', 'disiplin', 'çalışma', 'özen', 'istikrar'],
    context: 'Düzenli emek dileğinizi besler.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pe_pos6',
    card: 'Nine of Pentacles',
    position: 6,
    upright:
      'Dokuzlu, dileğinizin gerçekleşmesini bağımsızlık ve öz değer hissiyle ilişkilendirir. Kendi ayaklarınız üzerinde durduğunuzda sonuç gelir.',
    reversed:
      'Ters dokuzlu, aşırı bağımlılık dileğinizi zorlaştırabilir. Özgüven güçlendirir.',
    keywords: ['özgüven', 'bağımsızlık', 'öz değer', 'konfor', 'başarı'],
    context: 'Özgüven dileğinizi gerçekleşmeye yaklaştırır.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pe_pos6',
    card: 'Ten of Pentacles',
    position: 6,
    upright:
      'Onlu, dileğinizin gerçekleşmesinin kalıcı refah ve ailevi istikrar getireceğini gösterir.',
    reversed:
      'Ters onlu, maddi çatışmalar dileğinizi zorlaştırabilir. Şeffaf kurallar gerekir.',
    keywords: ['istikrar', 'refah', 'aile', 'sistem', 'bolluk'],
    context: 'Kalıcı düzen dileğinizi destekler.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pe_pos6',
    card: 'Page of Pentacles',
    position: 6,
    upright:
      'Prens, dileğinizin gerçekleşmesini öğrenme hevesi ve küçük başlangıçlarla mümkün kılar.',
    reversed: 'Ters prens, erteleme ve dağınık odak dileğinizi engelleyebilir.',
    keywords: ['öğrenme', 'başlangıç', 'hedef', 'pratik', 'odak'],
    context: 'Küçük adımlar dileğinizi başlatır.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pe_pos6',
    card: 'Knight of Pentacles',
    position: 6,
    upright:
      'Şövalye, dileğinizin gerçekleşmesini yavaş ama emin adımlarla getirir. Tutarlılık anahtardır.',
    reversed:
      'Ters şövalye, durağanlık veya aşırı temkin dileğinizi geciktirebilir.',
    keywords: ['istikrar', 'sabır', 'rutin', 'emek', 'tutarlılık'],
    context: 'Tutarlı adımlar dileğinizi mümkün kılar.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pe_pos6',
    card: 'Queen of Pentacles',
    position: 6,
    upright:
      'Kraliçe, dileğinizin gerçekleşmesini şefkatli pratiklik ve öz bakım ile ilişkilendirir.',
    reversed: 'Ters kraliçe, öz bakımı ihmal etmek dileğinizi zorlaştırabilir.',
    keywords: ['öz bakım', 'şefkat', 'kaynak', 'denge', 'pratiklik'],
    context: 'Öz bakım dileğinizi destekler.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pe_pos6',
    card: 'King of Pentacles',
    position: 6,
    upright:
      'Kral, dileğinizin gerçekleşmesini stratejik sağlamlık ve maddi bilgelikle destekler.',
    reversed:
      'Ters kral, aşırı kontrol veya statü kaygısı dileğinizi zorlaştırabilir.',
    keywords: ['sağlamlık', 'liderlik', 'sistem', 'refah', 'güven'],
    context: 'Stratejik sağlamlık dileğinizi güçlendirir.',
    group: 'Tılsımlar',
  },
  //--- Asalar Serisi ---//
  {
    id: 'ace_of_wands_wa_pos6',
    card: 'Ace of Wands',
    position: 6,
    upright:
      'Asa Ası, dileğinizin gerçekleşmesi için güçlü bir ilham ve yeni başlangıç enerjisi taşır. Yaratıcı bir kıvılcım harekete geçmenizi sağlar.',
    reversed:
      'Ters Asa Ası, ilham eksikliği veya gecikme dileğinizi zorlaştırabilir. Küçük adımlar akışı yeniden başlatır.',
    keywords: ['ilham', 'başlangıç', 'enerji', 'yaratıcılık', 'hareket'],
    context: 'Yaratıcı kıvılcım dileğinizi başlatır.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_wa_pos6',
    card: 'Two of Wands',
    position: 6,
    upright:
      'İki Asa, dileğinizin gerçekleşmesi için vizyon belirlemeniz ve plan yapmanız gerektiğini gösterir. Ufku genişletmek dileğinizi güçlendirir.',
    reversed:
      'Ters ikili, tereddüt veya dar bakış açısı dileğinizi geciktirebilir.',
    keywords: ['vizyon', 'plan', 'genişleme', 'karar', 'ufuk'],
    context: 'Vizyon ve plan dileğinizi güçlendirir.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_wa_pos6',
    card: 'Three of Wands',
    position: 6,
    upright:
      'Üç Asa, dileğinizin gerçekleşmesinde fırsatların ufukta olduğunu gösterir. Hazırlık ve cesur adım atmak sonuç getirir.',
    reversed:
      'Ters üçlü, sabırsızlık veya kısa görüşlülük dileğinizi zorlaştırabilir.',
    keywords: ['fırsat', 'genişleme', 'hazırlık', 'ufuk', 'ilerleme'],
    context: 'Ufka bakmak dileğinizi mümkün kılar.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_wa_pos6',
    card: 'Four of Wands',
    position: 6,
    upright:
      'Dört Asa, dileğinizin gerçekleşmesinde kutlama, uyum ve istikrar enerjisi bulunur. Temelin sağlam olması dileğinize alan açar.',
    reversed:
      'Ters dört, geçici düzensizlik dileğinizi erteleyebilir. Temeli sağlamlaştırmak gerekir.',
    keywords: ['istikrar', 'kutlama', 'uyum', 'temel', 'eşik'],
    context: 'Sağlam temel dileğinizi destekler.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_wa_pos6',
    card: 'Five of Wands',
    position: 6,
    upright:
      'Beş Asa, dileğinizin gerçekleşmesinde rekabet ve küçük engeller görülebilir. Mücadele, sizi güçlendirecektir.',
    reversed:
      'Ters beşli, gereksiz çatışmalar dileğinizi zorlaştırabilir. Odaklanma şarttır.',
    keywords: ['rekabet', 'mücadele', 'engel', 'enerji', 'kararlılık'],
    context: 'Engelleri aşmak dileğinizi yakınlaştırır.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_wa_pos6',
    card: 'Six of Wands',
    position: 6,
    upright:
      'Altı Asa, dileğinizin gerçekleşmesinde başarı ve görünür zafer enerjisi vardır. Takdir görmek dileğinizi hızlandırır.',
    reversed:
      'Ters altılı, takdir eksikliği veya kibir dileğinizi engelleyebilir.',
    keywords: ['zafer', 'başarı', 'görünürlük', 'motivasyon', 'takdir'],
    context: 'Zafer enerjisi dileğinizi besler.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_wa_pos6',
    card: 'Seven of Wands',
    position: 6,
    upright:
      'Yedi Asa, dileğinizin gerçekleşmesi için konumunuzu savunmanız gerektiğini söyler. Direnç sizi güçlendirecektir.',
    reversed:
      'Ters yedili, yorgunluk veya kararsızlık dileğinizi geciktirebilir.',
    keywords: ['savunma', 'direnç', 'kararlılık', 'sınır', 'güç'],
    context: 'Kararlılık dileğinizi mümkün kılar.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_wa_pos6',
    card: 'Eight of Wands',
    position: 6,
    upright:
      'Sekiz Asa, dileğinizin gerçekleşmesini hızlı gelişmeler ve iletişim kolaylaştırır. Akış hızlanır.',
    reversed:
      'Ters sekizli, gecikmeler veya yanlış iletişim dileğinizi zorlaştırabilir.',
    keywords: ['hız', 'iletişim', 'akış', 'ivme', 'haber'],
    context: 'Hızlı gelişmeler dileğinizi getirir.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_wa_pos6',
    card: 'Nine of Wands',
    position: 6,
    upright:
      'Dokuz Asa, dileğinizin gerçekleşmesinde son virajda dayanıklılık göstermeniz gerektiğini işaret eder. Azim başarı getirir.',
    reversed:
      'Ters dokuzlu, tükenmişlik dileğinizi zorlaştırabilir. Mola almak önemlidir.',
    keywords: ['dayanıklılık', 'azim', 'son viraj', 'koruma', 'güç'],
    context: 'Azim dileğinizi tamamlar.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_wa_pos6',
    card: 'Ten of Wands',
    position: 6,
    upright:
      'On Asa, dileğinizin gerçekleşmesi için büyük bir sorumluluğu taşımak gerektiğini gösterir. Çaba sonuç getirir.',
    reversed:
      'Ters onlu, aşırı yük dileğinizi zorlaştırabilir. Paylaşmak önemlidir.',
    keywords: ['yük', 'sorumluluk', 'tamamlama', 'çaba', 'hedef'],
    context: 'Çabayı dengelemek dileğinizi mümkün kılar.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_wa_pos6',
    card: 'Page of Wands',
    position: 6,
    upright:
      'Prens, dileğinizin gerçekleşmesinde keşif, öğrenme ve heves önemli rol oynar. Yeni yollar açılır.',
    reversed:
      'Ters prens, dağınıklık veya odak kaybı dileğinizi erteleyebilir.',
    keywords: ['keşif', 'heves', 'merak', 'öğrenme', 'başlangıç'],
    context: 'Merak dileğinizi başlatır.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_wa_pos6',
    card: 'Knight of Wands',
    position: 6,
    upright:
      'Şövalye, dileğinizin gerçekleşmesini cesur ve tutkulu adımların hızlandıracağını gösterir.',
    reversed:
      'Ters şövalye, acelecilik veya yarım bırakma dileğinizi engelleyebilir.',
    keywords: ['cesaret', 'tutku', 'hız', 'hedef', 'enerji'],
    context: 'Tutkulu adım dileğinizi hızlandırır.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_wa_pos6',
    card: 'Queen of Wands',
    position: 6,
    upright:
      'Kraliçe, dileğinizin gerçekleşmesini öz güven ve karizma ile destekler. Etki alanınızı büyütmek dileğinize hizmet eder.',
    reversed:
      'Ters kraliçe, kıskançlık veya özgüven eksikliği dileğinizi zorlaştırabilir.',
    keywords: ['özgüven', 'karizma', 'liderlik', 'güç', 'çekim'],
    context: 'Özgüven dileğinizi güçlendirir.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_wa_pos6',
    card: 'King of Wands',
    position: 6,
    upright:
      'Kral, dileğinizin gerçekleşmesini vizyoner liderlik ve stratejik cesaretle ilişkilendirir.',
    reversed:
      'Ters kral, aşırı otoriterlik veya ego dileğinizi zorlaştırabilir.',
    keywords: ['vizyon', 'liderlik', 'cesaret', 'strateji', 'güç'],
    context: 'Vizyon dileğinizi mümkün kılar.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 6 anlamını getirir
 * @param card - Tarot kartı
 * @returns pozisyon 6 anlamı veya null
 */
export function getNewLoverposition6Meaning(
  card: TarotCard
): NewLoverposition6Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position6Meanings.find(
    m =>
      m.card === card.name ||
      m.card === card.nameTr ||
      card.name === m.card ||
      card.nameTr === m.card
  );

  if (meaning) {
    return meaning;
  }

  // Kart ismi mapping'i kullanarak eşleştirme yap
  const cardNameMapping: { [key: string]: string } = {
    // Major Arcana - Türkçe
    Deli: 'The Fool',
    Büyücü: 'The Magician',
    'Yüksek Rahibe': 'The High Priestess',
    İmparatoriçe: 'The Empress',
    İmparator: 'The Emperor',
    Hierophant: 'The Hierophant',
    Aziz: 'The Hierophant',
    Aşıklar: 'The Lovers',
    'Savaş Arabası': 'The Chariot',
    Güç: 'Strength',
    Ermiş: 'The Hermit',
    Münzevi: 'The Hermit',
    'Kader Çarkı': 'The The Wheel of Fortune',
    Adalet: 'Justice',
    'Asılı Adam': 'The Hanged Man',
    Ölüm: 'Death',
    Ölçü: 'Temperance',
    Ölçülülük: 'Temperance',
    Şeytan: 'The Devil',
    Kule: 'The Tower',
    Yıldız: 'The Star',
    Ay: 'The Moon',
    Güneş: 'The Sun',
    Yargı: 'Judgement',
    Mahkeme: 'Judgement',
    Dünya: 'The World',
  };

  // Türkçe ismi İngilizce'ye çevir
  const englishName = cardNameMapping[card.nameTr] || card.nameTr;

  // İngilizce isimle tekrar ara
  meaning = position6Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 6 anlamını getirir
 * @param cardName - Kart ismi
 * @returns pozisyon 6 anlamı veya null
 */
export function getNewLoverposition6MeaningByCardName(
  cardName: string
): NewLoverposition6Meaning | null {
  return position6Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 6 anlamlarını getirir
 * @returns pozisyon 6 anlamları array'i
 */
export function getAllNewLoverposition6Meanings(): NewLoverposition6Meaning[] {
  return position6Meanings;
}

/**
 * Kart grubuna göre pozisyon 6 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getNewLoverposition6MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): NewLoverposition6Meaning[] {
  return position6Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
  export const useI18nposition6Meanings = (): I18nNewLoverposition6Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position6Meanings.map(meaning => {
    // i18n'den çevirileri al
    const i18nUpright = getCardMeaning(meaning.card, 1, 'upright');
    const i18nReversed = getCardMeaning(meaning.card, 1, 'reversed');
    const i18nKeywords = getCardKeywords(meaning.card, 1);
    const i18nContext = getCardContext(meaning.card, 1);
    const i18nGroup = getCardGroup(meaning.group);

    return {
      id: meaning.id,
      card: meaning.card,
      position: meaning.position,
      upright: i18nUpright || meaning.upright, // Fallback olarak orijinal metni kullan
      reversed: i18nReversed || meaning.reversed,
      keywords: i18nKeywords.length > 0 ? i18nKeywords : meaning.keywords,
      context: i18nContext || meaning.context,
      group: i18nGroup || meaning.group,
    };
  });
};
*/

// Belirli bir kart için i18n destekli anlam al (hook kullanmadan)
export const getI18nposition6Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nNewLoverposition6Meaning | null => {
  const originalMeaning = position6Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`new-lover.meanings.${cardKey}.position6.upright`);
  const i18nReversed = t(`new-lover.meanings.${cardKey}.position6.reversed`);
  const i18nKeywords = t(`new-lover.meanings.${cardKey}.position6.keywords`);
  const i18nContext = t(`new-lover.meanings.${cardKey}.position6.context`);
  const i18nGroup = t(
    `new-lover.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
  );

  return {
    id: originalMeaning.id,
    card: originalMeaning.card,
    position: originalMeaning.position,
    upright: i18nUpright || originalMeaning.upright,
    reversed: i18nReversed || originalMeaning.reversed,
    keywords: i18nKeywords
      ? JSON.parse(i18nKeywords)
      : originalMeaning.keywords,
    context: i18nContext || originalMeaning.context,
    group: i18nGroup || originalMeaning.group,
  };
};

// Varsayılan export
const newLoverposition6Exports = {
  position6Meanings,
  getNewLoverposition6Meaning,
  getNewLoverposition6MeaningByCardName,
  getAllNewLoverposition6Meanings,
  getNewLoverposition6MeaningsByGroup,
  getI18nposition6Meaning,
};

export default newLoverposition6Exports;
