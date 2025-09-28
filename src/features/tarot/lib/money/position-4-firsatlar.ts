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

export interface Moneyposition4Meaning {
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
export interface I18nMoneyposition4Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position4Meanings: Moneyposition4Meaning[] = [
  // --- Majör Arkana Kartları --- //
  {
    id: 'the_fool_ma_pos4',
    card: 'The Fool',
    position: 4,
    upright:
      'Geçmişte mali konularda düşünmeden riskler almış olabilirsiniz. Plansız harcamalar, kısa süreli heyecanlar için yapılmış olabilir.',
    reversed:
      'Ters Deli, geçmişte finansal konularda aşırı tedbirsizlik veya dikkatsizlik yüzünden kayıpları işaret eder.',
    keywords: ['risk', 'plansızlık', 'harcama', 'özgürlük', 'kayıp'],
    context: 'Geçmişte para konularında dikkatsizlik ön plandaydı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ma_pos4',
    card: 'The Magician',
    position: 4,
    upright:
      'Geçmişte para yönetiminde becerikli ve yaratıcı olmuşsunuz. Kaynakları farklı yollarla değerlendirmişsiniz.',
    reversed:
      'Ters Büyücü, manipülatif kararlar veya kısa vadeli kazanç için riskli davranışları işaret eder.',
    keywords: ['yaratıcılık', 'beceri', 'kaynak', 'fırsat', 'kurnazlık'],
    context: 'Geçmişte parayı yaratıcı şekilde kullanma eğilimi vardı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ma_pos4',
    card: 'The High Priestess',
    position: 4,
    upright:
      'Geçmişte mali kararlarınızı sezgilerinize dayanarak vermiş olabilirsiniz. Görünmeyen fırsatları değerlendirmişsiniz.',
    reversed:
      'Ters Başrahibe, finansal konularda aşırı gizlilik veya bilgiyi paylaşmama sorun yaratmış olabilir.',
    keywords: ['sezgi', 'gizlilik', 'bilgi', 'içgörü', 'belirsizlik'],
    context: 'Geçmişte para yönetiminde sezgi ve gizlilik öne çıkıyordu.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ma_pos4',
    card: 'The Empress',
    position: 4,
    upright:
      'Geçmişte para konularında bolluk ve bereket dönemleri yaşamışsınız. Harcamalar aile ve keyif için yapılmış olabilir.',
    reversed:
      'Ters İmparatoriçe, aşırı harcama veya maddi kaynakları tüketme eğilimini gösterir.',
    keywords: ['bolluk', 'bereket', 'aile', 'harcama', 'keyif'],
    context: 'Geçmişte bolluk ve keyif odaklı harcamalar ön plandaydı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ma_pos4',
    card: 'The Emperor',
    position: 4,
    upright:
      'Geçmişte para konularında disiplinli ve düzenli bir yaklaşımınız vardı. Güvenlik için yapılandırılmış planlar yapılmış.',
    reversed:
      'Ters İmparator, aşırı kontrol veya katı tutumlar nedeniyle esnekliğin kaybolduğunu işaret eder.',
    keywords: ['disiplin', 'düzen', 'güvenlik', 'planlama', 'otorite'],
    context: 'Geçmişte paraya karşı düzenli ve otoriter bir yaklaşım vardı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ma_pos4',
    card: 'The Hierophant',
    position: 4,
    upright:
      'Geçmişte mali kararlar geleneklere veya aile öğretilerine bağlı olarak verilmiş olabilir.',
    reversed:
      'Ters Aziz, finansal konularda geleneksel kuralları reddetme veya alışılmadık yollar deneme eğilimini gösterir.',
    keywords: ['gelenek', 'aile', 'kurallar', 'öğreti', 'maddi düzen'],
    context: 'Geçmişte mali tutumlarda geleneksel etkiler öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ma_pos4',
    card: 'The Lovers',
    position: 4,
    upright:
      'Geçmişte mali konular ortak kararlarla yönetilmiş olabilir. Eş veya partnerle birlikte alınan kararlar öne çıkmıştır.',
    reversed:
      'Ters Aşıklar, mali konularda kararsızlık veya uyumsuz ortaklıkların sorun yarattığını işaret eder.',
    keywords: ['ortaklık', 'karar', 'uyum', 'aile', 'mali birlik'],
    context: 'Geçmişte mali tutumlarda ortak karar alma vardı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ma_pos4',
    card: 'The Chariot',
    position: 4,
    upright:
      'Geçmişte para konularında güçlü bir kontrol ve kararlılık sergilemişsiniz. Hedeflere odaklı ilerlenmiş.',
    reversed:
      'Ters Savaş Arabası, aşırı kontrol veya savruk yönetim nedeniyle dengesizlik yaşanmış olabilir.',
    keywords: ['kontrol', 'kararlılık', 'ilerleme', 'disiplin', 'para'],
    context: 'Geçmişte mali tutumlarda kontrol ve odak ön plandaydı.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ma_pos4',
    card: 'Strength',
    position: 4,
    upright:
      'Geçmişte para yönetiminde sabırlı, sakin ve öz disiplinli davranışlar sergilenmiş. Harcamalar kontrol altında tutulmuş.',
    reversed:
      'Ters Güç, öz denetim eksikliği veya mali kaygıların baskın olduğunu işaret eder.',
    keywords: ['sabır', 'disiplin', 'öz kontrol', 'denge', 'güven'],
    context: 'Geçmişte mali tutumlarda sabır ve öz denetim öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ma_pos4',
    card: 'The Hermit',
    position: 4,
    upright:
      'Geçmişte mali konularda içe dönük ve dikkatli bir tutum sergilenmiş. Yalnız başına kararlar alınmış olabilir.',
    reversed:
      'Ters Ermiş, aşırı yalnızlık veya destek almadan verilen mali kararların risk oluşturduğunu işaret eder.',
    keywords: [
      'içe dönüş',
      'dikkat',
      'yalnızlık',
      'araştırma',
      'öz yeterlilik',
    ],
    context: 'Geçmişte mali tutumlarda içe dönüklük ve dikkat öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ma_pos4',
    card: 'The Wheel of Fortune',
    position: 4,
    upright:
      'Geçmişte para konularında şans ve kader etkili olmuş. Beklenmedik kazançlar veya kayıplar yaşanmış olabilir.',
    reversed:
      'Ters Çark, sürekli tekrar eden finansal döngüler veya fırsatların kaçırılması durumunu işaret eder.',
    keywords: ['şans', 'döngü', 'fırsat', 'kayıp', 'kader'],
    context: 'Geçmişte mali tutumlarda şans ve döngüler etkiliydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ma_pos4',
    card: 'Justice',
    position: 4,
    upright:
      'Geçmişte mali konularda adil, dengeli ve sorumlu bir tutum sergilenmiş. Hesap verebilirlik ön plandaydı.',
    reversed:
      'Ters Adalet, haksız veya dengesiz mali kararlar alınmış olabilir.',
    keywords: ['adalet', 'denge', 'sorumluluk', 'hesap', 'dürüstlük'],
    context: 'Geçmişte mali tutumlarda adalet ve denge öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ma_pos4',
    card: 'The Hanged Man',
    position: 4,
    upright:
      'Geçmişte mali konularda beklemeyi ve olayları farklı açıdan görmeyi tercih etmişsiniz. Sabırlı davranılmış.',
    reversed:
      'Ters Asılan Adam, kararsızlık veya atılması gereken adımların ertelenmesini işaret eder.',
    keywords: ['bekleme', 'feda', 'perspektif', 'karar', 'sabır'],
    context: 'Geçmişte mali tutumlarda bekleme ve sabır öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ma_pos4',
    card: 'Death',
    position: 4,
    upright:
      'Geçmişte mali konularda bitişler ve yeniden yapılanmalar yaşanmış. Eski yöntemler bırakılmış olabilir.',
    reversed:
      'Ters Ölüm, değişimden kaçınma veya eski mali alışkanlıklara sıkı sıkıya bağlı kalmayı işaret eder.',
    keywords: ['bitiş', 'değişim', 'yenilenme', 'dönüşüm', 'para'],
    context: 'Geçmişte mali tutumlarda dönüşüm ve bitiş öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ma_pos4',
    card: 'Temperance',
    position: 4,
    upright:
      'Geçmişte mali konularda denge ve ölçü ön plandaydı. Harcamalar ve tasarruf uyumlu tutulmuş.',
    reversed:
      'Ters Denge, aşırılık veya dengesiz harcamalar geçmişte sorun yaratmış olabilir.',
    keywords: ['denge', 'ölçü', 'uyum', 'tasarruf', 'kontrol'],
    context: 'Geçmişte mali tutumlarda denge ve uyum öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ma_pos4',
    card: 'The Devil',
    position: 4,
    upright:
      'Geçmişte para konularında bağımlılık, borç veya aşırı tüketim öne çıkmış olabilir.',
    reversed:
      'Ters Şeytan, maddi bağımlılıklardan kurtulma veya zararlı alışkanlıkları bırakma sürecini işaret eder.',
    keywords: ['bağımlılık', 'borç', 'tüketim', 'kontrol', 'özgürlük'],
    context: 'Geçmişte mali tutumlarda bağımlılık ve borç öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ma_pos4',
    card: 'The Tower',
    position: 4,
    upright:
      'Geçmişte mali alanda beklenmedik krizler veya ani kayıplar yaşanmış olabilir.',
    reversed:
      'Ters Kule, ertelenmiş bir krizin ya da daha küçük sarsıntıların yaşandığını gösterir.',
    keywords: ['kriz', 'kayıp', 'yıkım', 'beklenmedik', 'yeniden yapı'],
    context: 'Geçmişte mali tutumlarda kriz ve kayıplar öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ma_pos4',
    card: 'The Star',
    position: 4,
    upright:
      'Geçmişte mali alanda umut ve iyimserlik ön plandaydı. Daha iyiye ulaşma inancı güçlüydü.',
    reversed:
      'Ters Yıldız, hayal kırıklıkları veya aşırı iyimser beklentilerin gerçekleşmemesini işaret eder.',
    keywords: ['umut', 'iyimserlik', 'hayal', 'inanç', 'para'],
    context: 'Geçmişte mali tutumlarda umut ve iyimserlik öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ma_pos4',
    card: 'The Moon',
    position: 4,
    upright:
      'Geçmişte mali konularda belirsizlikler ve yanıltıcı durumlar yaşanmış olabilir. Kafada netlik olmayabilir.',
    reversed: 'Ters Ay, yanlış anlamaların aydınlanmaya başlamasını gösterir.',
    keywords: ['belirsizlik', 'yanıltıcı', 'kafa karışıklığı', 'risk', 'para'],
    context: 'Geçmişte mali tutumlarda belirsizlik öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ma_pos4',
    card: 'The Sun',
    position: 4,
    upright:
      'Geçmişte mali konularda başarı ve bolluk dönemi yaşanmış. Harcamalar özgüvenle yapılmış.',
    reversed:
      'Ters Güneş, yüzeysel mutluluk arayışıyla aşırı harcamaları işaret eder.',
    keywords: ['başarı', 'bolluk', 'özgüven', 'harcama', 'para'],
    context: 'Geçmişte mali tutumlarda bolluk ve güven öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ma_pos4',
    card: 'Judgement',
    position: 4,
    upright:
      'Geçmişte mali konularda önemli kararlar alınmış. Eski borçlar veya yükümlülükler kapatılmış olabilir.',
    reversed:
      'Ters Mahkeme, geçmişte mali konularda sorumluluklardan kaçmayı işaret eder.',
    keywords: ['karar', 'borç', 'sorumluluk', 'yüzleşme', 'para'],
    context: 'Geçmişte mali tutumlarda sorumluluk ve karar öndeydi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ma_pos4',
    card: 'The World',
    position: 4,
    upright:
      'Geçmişte mali hedeflerinizin bir kısmını tamamlamış ve döngüleri kapatmışsınız.',
    reversed:
      'Ters Dünya, tamamlanmamış projeler veya eksik kalan mali süreçleri işaret eder.',
    keywords: ['tamamlanma', 'hedef', 'döngü', 'mali süreç', 'başarı'],
    context: 'Geçmişte mali tutumlarda tamamlanma ve başarı öndeydi.',
    group: 'Majör Arkana',
  },
  // --- Kılıçlst ---//
  {
    id: 'ace_of_swords_sw_pos4',
    card: 'Ace of Swords',
    position: 4,
    upright:
      'Geçmişte mali konularda netlik ve yeni fikirler öne çıkmış olabilir. Doğrudan kararlarla ilerlenmiş.',
    reversed:
      'Ters Kılıç Ası, belirsiz ve kararsız mali tutumları işaret eder.',
    keywords: ['netlik', 'karar', 'zihin', 'para', 'başlangıç'],
    context: 'Geçmişte para konularında net kararlar alma eğilimi vardı.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sw_pos4',
    card: 'Two of Swords',
    position: 4,
    upright:
      'Geçmişte mali konularda ikilemler ve karar verememe öne çıkmış olabilir.',
    reversed:
      'Ters İki Kılıç, göz ardı edilen mali sorunların büyümesine neden olmuştur.',
    keywords: ['ikilem', 'kararsızlık', 'tereddüt', 'para', 'dengesizlik'],
    context: 'Geçmişte para tutumunda kararsızlık hakimdi.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sw_pos4',
    card: 'Three of Swords',
    position: 4,
    upright:
      'Geçmişte mali kayıplar veya hayal kırıklıkları yaşanmış olabilir.',
    reversed:
      'Ters Üç Kılıç, mali kayıplardan toparlanmayı ve şifayı işaret eder.',
    keywords: ['kayıp', 'hayal kırıklığı', 'para', 'yas', 'toparlanma'],
    context: 'Geçmişte parayla ilgili hayal kırıklıkları yaşanmıştı.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sw_pos4',
    card: 'Four of Swords',
    position: 4,
    upright:
      'Geçmişte mali konularda dinlenme ve bekleme dönemleri olmuş olabilir.',
    reversed:
      'Ters Dört Kılıç, erteleme ve pasiflik nedeniyle fırsatların kaçtığını gösterir.',
    keywords: ['dinlenme', 'erteleme', 'bekleme', 'para', 'pasiflik'],
    context: 'Geçmişte mali kararlar ertelenmişti.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sw_pos4',
    card: 'Five of Swords',
    position: 4,
    upright: 'Geçmişte mali konularda çatışma ve rekabet öne çıkmış olabilir.',
    reversed:
      'Ters Beş Kılıç, geçmiş mali tartışmalardan öğrenilen dersleri gösterir.',
    keywords: ['çatışma', 'rekabet', 'para', 'mücadele', 'ders'],
    context: 'Geçmişte para konuları çatışmaya neden olmuştu.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sw_pos4',
    card: 'Six of Swords',
    position: 4,
    upright:
      'Geçmişte zor mali dönemlerden çıkış ve rahatlama süreci yaşanmış olabilir.',
    reversed:
      'Ters Altı Kılıç, geçmişte mali sıkıntılardan kurtulmada gecikmeleri işaret eder.',
    keywords: ['geçiş', 'rahatlama', 'zorluk', 'para', 'ilerleme'],
    context: 'Geçmişte mali geçiş süreçleri deneyimlenmişti.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sw_pos4',
    card: 'Seven of Swords',
    position: 4,
    upright:
      'Geçmişte mali konularda gizlilik veya saklı anlaşmalar olmuş olabilir.',
    reversed:
      'Ters Yedi Kılıç, mali konularda dürüstlük arayışını işaret eder.',
    keywords: ['gizlilik', 'hile', 'para', 'dürüstlük', 'strateji'],
    context: 'Geçmişte mali konularda gizlilik ve strateji öne çıkmıştı.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sw_pos4',
    card: 'Eight of Swords',
    position: 4,
    upright:
      'Geçmişte para konularında kısıtlanmış veya çaresiz hissetmiş olabilirsiniz.',
    reversed:
      'Ters Sekiz Kılıç, mali sıkışıklıklardan kurtulma çabasını gösterir.',
    keywords: ['kısıtlama', 'çaresizlik', 'para', 'özgürleşme', 'engeller'],
    context: 'Geçmişte para konusunda sıkışmışlık yaşanmıştı.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sw_pos4',
    card: 'Nine of Swords',
    position: 4,
    upright: 'Geçmişte mali kaygılar ve uykusuz geceler yaşamış olabilirsiniz.',
    reversed:
      'Ters Dokuz Kılıç, mali kaygılardan yavaş yavaş kurtulmayı işaret eder.',
    keywords: ['kaygı', 'endişe', 'para', 'gece', 'stres'],
    context: 'Geçmişte para ile ilgili yoğun kaygılar vardı.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sw_pos4',
    card: 'Ten of Swords',
    position: 4,
    upright:
      'Geçmişte mali bir döngünün acı verici şekilde sonlandığını gösterir.',
    reversed:
      'Ters On Kılıç, mali krizden toparlanmayı ve yeni bir başlangıcı işaret eder.',
    keywords: ['bitiş', 'kriz', 'para', 'yeniden doğuş', 'toparlanma'],
    context: 'Geçmişte mali bir döngü son bulmuştu.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sw_pos4',
    card: 'Page of Swords',
    position: 4,
    upright:
      'Geçmişte mali konularda meraklı ve araştırmacı bir tavır sergilenmiş olabilir.',
    reversed:
      'Ters Kılıç Prensi, yüzeysel bilgiyle alınan hatalı mali kararları işaret eder.',
    keywords: ['merak', 'bilgi', 'araştırma', 'para', 'öğrenme'],
    context: 'Geçmişte mali tutumlarda öğrenme isteği vardı.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sw_pos4',
    card: 'Knight of Swords',
    position: 4,
    upright:
      'Geçmişte mali konularda aceleci veya cesur kararlar verilmiş olabilir.',
    reversed:
      'Ters Kılıç Şövalyesi, düşünmeden atılan mali adımların zararını gösterir.',
    keywords: ['acele', 'cesaret', 'karar', 'para', 'risk'],
    context: 'Geçmişte acele mali kararlar öne çıkmıştı.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sw_pos4',
    card: 'Queen of Swords',
    position: 4,
    upright:
      'Geçmişte mali konularda mantıklı, soğukkanlı ve stratejik bir yaklaşım sergilenmiş olabilir.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştirel veya katı mali kararları işaret eder.',
    keywords: ['mantık', 'strateji', 'soğukkanlılık', 'para', 'adalet'],
    context: 'Geçmişte mali konular mantıklı ve stratejik ele alınmıştı.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sw_pos4',
    card: 'King of Swords',
    position: 4,
    upright:
      'Geçmişte mali konularda disiplinli, kurallı ve adaletli kararlar alınmış olabilir.',
    reversed:
      'Ters Kılıç Kralı, otoriter veya esnek olmayan mali yaklaşımları işaret eder.',
    keywords: ['disiplin', 'otorite', 'kural', 'para', 'adalet'],
    context: 'Geçmişte mali konular disiplinli ve kurallı yürütülmüştü.',
    group: 'Kılıçlar',
  },
  // --- Kupalar ---//
  {
    id: 'ace_of_cups_cups_pos4',
    card: 'Ace of Cups',
    position: 4,
    upright:
      'Geçmişte duygusal motivasyonla harcamalar yapmış olabilirsiniz. Kalpten gelen cömertlik finansal kararlarınızı etkilemiş.',
    reversed:
      'Ters As Kupası, duygusal boşluğu doldurmak için yapılan tatminsiz harcamaları gösterir.',
    keywords: ['duygu', 'cömertlik', 'harcama', 'tatmin', 'kalp'],
    context: 'Para geçmişte duygularla yakından bağlantılıydı.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_cups_pos4',
    card: 'Two of Cups',
    position: 4,
    upright:
      'Geçmişte ortaklık veya partnerle uyum içinde mali kararlar almış olabilirsiniz.',
    reversed:
      'Ters İki Kupa, mali konularda uyumsuzluk veya eşitsizlik yaşandığını işaret eder.',
    keywords: ['ortaklık', 'uyum', 'eşitlik', 'birlik', 'para'],
    context: 'Geçmişte mali kararlar ilişkilerle bağlantılıydı.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_cups_pos4',
    card: 'Three of Cups',
    position: 4,
    upright:
      'Geçmişte kutlamalar ve sosyal etkinliklere yapılan harcamalar ön plandaydı.',
    reversed:
      'Ters Üç Kupa, aşırı sosyal harcamalar veya savurganlık sorun yaratmış olabilir.',
    keywords: ['kutlama', 'sosyal', 'harcama', 'eğlence', 'paylaşım'],
    context: 'Geçmişte sosyal çevre için yapılan harcamalar öndeydi.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_cups_pos4',
    card: 'Four of Cups',
    position: 4,
    upright:
      'Geçmişte paraya karşı tatminsizlik veya ilgisizlik yaşamış olabilirsiniz.',
    reversed:
      'Ters Dört Kupa, fark edilmeyen fırsatların veya kaçırılan mali şansların göstergesidir.',
    keywords: ['tatminsizlik', 'ilgisizlik', 'fırsat', 'para', 'farkındalık'],
    context: 'Geçmişte paraya karşı ilgisizlik ya da tatminsizlik vardı.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_cups_pos4',
    card: 'Five of Cups',
    position: 4,
    upright: 'Geçmişte mali kayıplar veya pişmanlıklar yaşamış olabilirsiniz.',
    reversed: 'Ters Beş Kupa, mali kayıplardan toparlanma sürecini gösterir.',
    keywords: ['kayıp', 'pişmanlık', 'para', 'yas', 'toparlanma'],
    context: 'Geçmişte mali kayıplar duygusal izler bırakmıştı.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_cups_pos4',
    card: 'Six of Cups',
    position: 4,
    upright:
      'Geçmişte aile veya çocukluk deneyimleri para ile ilişkinizi şekillendirmiş olabilir.',
    reversed:
      'Ters Altı Kupa, geçmişe takılı kalma nedeniyle mali ilerlemenin zorlaştığını gösterir.',
    keywords: ['geçmiş', 'aile', 'nostalji', 'para', 'alışkanlık'],
    context: 'Geçmişte para tutumlarınız kök aileden etkilenmişti.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_cups_pos4',
    card: 'Seven of Cups',
    position: 4,
    upright:
      'Geçmişte çok fazla mali seçenek veya hayal peşinde koşma eğilimi olmuş olabilir.',
    reversed:
      'Ters Yedi Kupa, gerçekçi olmayan beklentiler nedeniyle hayal kırıklıkları yaşandığını gösterir.',
    keywords: ['seçenek', 'hayal', 'beklenti', 'para', 'kararsızlık'],
    context: 'Geçmişte mali tutumlarda hayaller ve seçenek bolluğu öndeydi.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_cups_pos4',
    card: 'Eight of Cups',
    position: 4,
    upright:
      'Geçmişte bazı mali durumları geride bırakma kararı almış olabilirsiniz.',
    reversed: 'Ters Sekiz Kupa, gerekli değişimlerden kaçınmayı işaret eder.',
    keywords: ['ayrılma', 'değişim', 'karar', 'para', 'ilerleme'],
    context: 'Geçmişte mali tutumlarda bazı durumları terk etme vardı.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_cups_pos4',
    card: 'Nine of Cups',
    position: 4,
    upright: 'Geçmişte maddi tatmin ve bolluk dönemleri yaşanmış olabilir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatmin arayışıyla gereksiz harcamaları işaret eder.',
    keywords: ['tatmin', 'bolluk', 'para', 'harcama', 'keyif'],
    context: 'Geçmişte mali tatmin ön plandaydı.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_cups_pos4',
    card: 'Ten of Cups',
    position: 4,
    upright: 'Geçmişte aile mutluluğu için harcamalar yapılmış olabilir.',
    reversed: 'Ters On Kupa, aile içi mali anlaşmazlıkları işaret eder.',
    keywords: ['aile', 'mutluluk', 'uyum', 'para', 'harcama'],
    context: 'Geçmişte aile odaklı mali kararlar ön plandaydı.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_cups_pos4',
    card: 'Page of Cups',
    position: 4,
    upright:
      'Geçmişte parayla ilgili hayalci veya duygusal bir tutum sergilemiş olabilirsiniz.',
    reversed:
      'Ters Kupa Prensi, mali konularda sorumsuzluk veya dikkatsizlik işaretidir.',
    keywords: ['hayalcilik', 'duygu', 'sorumsuzluk', 'para', 'başlangıç'],
    context: 'Geçmişte paraya karşı hayalci bir yaklaşım vardı.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_cups_pos4',
    card: 'Knight of Cups',
    position: 4,
    upright:
      'Geçmişte para kazanma veya harcama konusunda idealist davranışlar sergilenmiş olabilir.',
    reversed: 'Ters Kupa Şövalyesi, tutarsız mali kararları işaret eder.',
    keywords: ['idealizm', 'tutarsızlık', 'para', 'vizyon', 'harcama'],
    context: 'Geçmişte mali tutumlarda idealizm ve tutarsızlık öne çıktı.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_cups_pos4',
    card: 'Queen of Cups',
    position: 4,
    upright:
      'Geçmişte para konularında şefkatli ve destekleyici bir tutum öne çıkmış olabilir.',
    reversed: 'Ters Kupa Kraliçesi, aşırı duygusal harcamaları işaret eder.',
    keywords: ['şefkat', 'destek', 'harcama', 'duygu', 'para'],
    context: 'Geçmişte mali kararlar duygusal destekle bağlantılıydı.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_cups_pos4',
    card: 'King of Cups',
    position: 4,
    upright:
      'Geçmişte duygusal dengeyi koruyarak para yönetmişsiniz. Sakin ve olgun kararlar alınmış.',
    reversed:
      'Ters Kupa Kralı, pasif-agresif veya bastırılmış duyguların mali kararları olumsuz etkilediğini işaret eder.',
    keywords: ['denge', 'olgunluk', 'para', 'sakinlik', 'liderlik'],
    context: 'Geçmişte paraya karşı olgun ve dengeli bir yaklaşım vardı.',
    group: 'Kupalar',
  },
  // --- Tılsımlar ---//
  {
    id: 'ace_of_pentacles_pe_pos4',
    card: 'Ace of Pentacles',
    position: 4,
    upright:
      'Geçmişte yeni mali fırsatlar ve somut kazançlar gündeme gelmiş olabilir. Temeller sağlam atılmıştır.',
    reversed:
      'Ters Tılsım Ası, kaçırılan fırsatları veya maddi başlangıçların ertelendiğini gösterir.',
    keywords: ['fırsat', 'başlangıç', 'para', 'yatırım', 'temel'],
    context:
      'Geçmişte yeni mali fırsatlar açılmış, fakat bazıları kaçırılmış olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_pe_pos4',
    card: 'Two of Pentacles',
    position: 4,
    upright:
      'Geçmişte mali dengeyi koruma, bütçe yönetimi ve birden fazla işi yürütme çabası vardı.',
    reversed:
      'Ters İki Tılsım, dengesizlik ve mali yüklerin artışını işaret eder.',
    keywords: ['denge', 'bütçe', 'para', 'çoklu işler', 'uyum'],
    context: 'Geçmişte mali dengeyi sağlama çabası hakimdi.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_pe_pos4',
    card: 'Three of Pentacles',
    position: 4,
    upright:
      'Geçmişte işbirliği, ekip çalışması ve ortak projeler mali gelişimde rol oynamış olabilir.',
    reversed:
      'Ters Üç Tılsım, işbirliği eksikliği ve plansızlığın kayıplara yol açtığını gösterir.',
    keywords: ['işbirliği', 'ekip', 'para', 'plan', 'ustalık'],
    context: 'Geçmişte mali kazançlar ekip çalışmasıyla şekillenmişti.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_pe_pos4',
    card: 'Four of Pentacles',
    position: 4,
    upright:
      'Geçmişte para konularında aşırı tutma, biriktirme ve kontrol etme eğilimi vardı.',
    reversed:
      'Ters Dört Tılsım, savurganlık veya mali konularda gevşek tutumları işaret eder.',
    keywords: ['tutma', 'biriktirme', 'para', 'kontrol', 'güvenlik'],
    context: 'Geçmişte para konularında sıkı kontrol uygulanmıştı.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_pe_pos4',
    card: 'Five of Pentacles',
    position: 4,
    upright:
      'Geçmişte mali kayıplar, yoksunluk ve zor dönemler yaşanmış olabilir.',
    reversed:
      'Ters Beş Tılsım, mali sıkıntılardan toparlanma sürecine girildiğini işaret eder.',
    keywords: ['yoksunluk', 'kayıp', 'para', 'zor dönem', 'toparlanma'],
    context: 'Geçmişte para konusunda zor dönemler yaşanmıştı.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_pe_pos4',
    card: 'Six of Pentacles',
    position: 4,
    upright: 'Geçmişte mali yardımlar, denge ve paylaşım öne çıkmış olabilir.',
    reversed:
      'Ters Altı Tılsım, dengesiz yardımlar veya karşılıksız beklentiler yaşanmıştır.',
    keywords: ['paylaşım', 'yardım', 'para', 'denge', 'cömertlik'],
    context: 'Geçmişte mali kaynaklar paylaşım odaklı kullanılmıştı.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_pe_pos4',
    card: 'Seven of Pentacles',
    position: 4,
    upright:
      'Geçmişte sabır, uzun vadeli yatırımlar ve değerlendirmeler öne çıkmış olabilir.',
    reversed:
      'Ters Yedi Tılsım, sabırsızlık ve kısa vadeli kazanç arayışı nedeniyle kayıplar yaşanmıştır.',
    keywords: ['sabır', 'yatırım', 'para', 'değerlendirme', 'bekleyiş'],
    context: 'Geçmişte mali konular uzun vadeli yatırımlarla şekillendi.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_pe_pos4',
    card: 'Eight of Pentacles',
    position: 4,
    upright:
      'Geçmişte disiplinli çalışma, iş geliştirme ve mali ustalık öne çıkmış olabilir.',
    reversed:
      'Ters Sekiz Tılsım, özensizlik veya motivasyon kaybı nedeniyle gelirler etkilenmiştir.',
    keywords: ['çalışma', 'ustalık', 'para', 'çaba', 'gelişim'],
    context: 'Geçmişte mali durum disiplinli çalışmayla şekillendi.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_pe_pos4',
    card: 'Nine of Pentacles',
    position: 4,
    upright:
      'Geçmişte finansal bağımsızlık, konfor ve kendi emeğinin karşılığını almak öne çıkmış olabilir.',
    reversed:
      'Ters Dokuz Tılsım, bağımsızlık yerine bağımlılık veya savurganlık eğilimini işaret eder.',
    keywords: ['bağımsızlık', 'konfor', 'para', 'emek', 'özgüven'],
    context: 'Geçmişte mali konular bağımsızlık üzerine kuruluydu.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_pe_pos4',
    card: 'Ten of Pentacles',
    position: 4,
    upright:
      'Geçmişte aile desteği, miras veya uzun vadeli birikimler mali güveni sağlamış olabilir.',
    reversed:
      'Ters On Tılsım, ailevi mali anlaşmazlıklar veya miras sorunlarını gösterir.',
    keywords: ['aile', 'miras', 'para', 'birikim', 'güven'],
    context: 'Geçmişte mali güven aile veya miras kaynaklıydı.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_pe_pos4',
    card: 'Page of Pentacles',
    position: 4,
    upright:
      'Geçmişte öğrenme, yeni beceriler ve küçük mali başlangıçlar öne çıkmış olabilir.',
    reversed:
      'Ters Tılsım Prensi, ertelemeler ve dikkatsizlik nedeniyle fırsatlar kaçırılmıştır.',
    keywords: ['öğrenme', 'başlangıç', 'para', 'deneme', 'çaba'],
    context: 'Geçmişte para ile ilgili öğrenme ve küçük adımlar ön plandaydı.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_pe_pos4',
    card: 'Knight of Pentacles',
    position: 4,
    upright:
      'Geçmişte mali konularda istikrarlı, güvenilir ve disiplinli adımlar atılmış olabilir.',
    reversed:
      'Ters Tılsım Şövalyesi, durağanlık ve yenilikten kaçış nedeniyle fırsatlar kaybedilmiştir.',
    keywords: ['istikrar', 'güven', 'para', 'disiplin', 'emek'],
    context: 'Geçmişte mali tutumlar istikrarlı ve güven odaklıydı.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_pe_pos4',
    card: 'Queen of Pentacles',
    position: 4,
    upright:
      'Geçmişte mali konularda şefkatli, destekleyici ve kaynakları iyi yöneten bir yaklaşım öne çıkmış olabilir.',
    reversed:
      'Ters Tılsım Kraliçesi, aşırı yüklenme veya öz-bakım eksikliğinin mali dengeyi etkilediğini gösterir.',
    keywords: ['şefkat', 'kaynak', 'para', 'destek', 'yönetim'],
    context: 'Geçmişte mali kaynaklar dengeli ve destekleyici yönetilmişti.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_pe_pos4',
    card: 'King of Pentacles',
    position: 4,
    upright:
      'Geçmişte mali konularda disiplinli, güçlü ve stratejik bir liderlik yaklaşımı vardı.',
    reversed:
      'Ters Tılsım Kralı, aşırı kontrol veya statü odaklı mali kararların gölgesini işaret eder.',
    keywords: ['liderlik', 'strateji', 'para', 'otorite', 'güç'],
    context: 'Geçmişte mali konular güçlü bir liderlikle yönetilmişti.',
    group: 'Tılsımlar',
  },
  // --- ASALAR ---//
  {
    id: 'ace_of_wands_pe_pos4',
    card: 'Ace of Wands',
    position: 4,
    upright:
      'Geçmişte yeni fırsatlar ve ilhamla para kazanma yolları keşfedilmiş olabilir. Yaratıcılık, mali girişimlere yön vermiştir.',
    reversed:
      'Ters Asa Ası, yarım kalan girişimler ve ertelenmiş projeler nedeniyle maddi potansiyelin tam kullanılamadığını gösterir.',
    keywords: ['ilham', 'başlangıç', 'para', 'yaratıcılık', 'fırsat'],
    context:
      'Geçmişte mali girişimler yaratıcılıkla başlamış ancak her zaman tamamlanmamış olabilir.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_pe_pos4',
    card: 'Two of Wands',
    position: 4,
    upright:
      'Geçmişte mali hedefler için planlama ve vizyon geliştirme önemli rol oynamış olabilir.',
    reversed:
      'Ters İki Asa, planların ertelenmesi veya cesaretsizlik nedeniyle fırsatlar değerlendirilememiştir.',
    keywords: ['vizyon', 'planlama', 'para', 'ufuk', 'karar'],
    context: 'Geçmişte para konularında vizyon ve planlama öne çıkmıştı.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_pe_pos4',
    card: 'Three of Wands',
    position: 4,
    upright:
      'Geçmişte mali gelişim için genişleme, işbirliği veya yeni pazar arayışları olmuş olabilir.',
    reversed:
      'Ters Üç Asa, dar görüşlülük veya ertelemeler nedeniyle ilerleme sınırlanmıştır.',
    keywords: ['genişleme', 'işbirliği', 'para', 'vizyon', 'ilerleme'],
    context:
      'Geçmişte mali gelişim genişleme ve işbirliği arayışlarıyla desteklenmişti.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_pe_pos4',
    card: 'Four of Wands',
    position: 4,
    upright:
      'Geçmişte mali konular kutlamalar, ortak başarılar veya ailevi destekle güçlenmiş olabilir.',
    reversed:
      'Ters Dört Asa, istikrarsızlık veya temellerin eksikliği nedeniyle gelir dalgalanmaları yaşanmıştır.',
    keywords: ['kutlama', 'istikrar', 'para', 'destek', 'aile'],
    context:
      'Geçmişte mali durum ortak kutlamalar ve desteklerle şekillenmişti.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_pe_pos4',
    card: 'Five of Wands',
    position: 4,
    upright:
      'Geçmişte mali kaynaklarda rekabet, anlaşmazlık veya prova niteliğinde mücadeleler öne çıkmış olabilir.',
    reversed:
      'Ters Beş Asa, çözümlenmemiş çatışmaların kazançları sınırladığını işaret eder.',
    keywords: ['rekabet', 'çatışma', 'para', 'mücadele', 'gelişim'],
    context: 'Geçmişte para konularında rekabetçi bir ortam vardı.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_pe_pos4',
    card: 'Six of Wands',
    position: 4,
    upright:
      'Geçmişte finansal başarı ve tanınma kazanılmış olabilir. Başarı, motivasyonu artırmıştır.',
    reversed:
      'Ters Altı Asa, takdir eksikliği veya yanlış yönlendirme nedeniyle başarılar gölgelenmiş olabilir.',
    keywords: ['başarı', 'tanınma', 'para', 'motivasyon', 'zafer'],
    context: 'Geçmişte mali başarı görünürlük ve motivasyon sağlamıştı.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_pe_pos4',
    card: 'Seven of Wands',
    position: 4,
    upright:
      'Geçmişte mali kaynaklar savunma, pozisyon koruma ve rekabetle şekillenmiş olabilir.',
    reversed:
      'Ters Yedi Asa, yorgunluk ve direnç kaybı nedeniyle mali pozisyon korunamamış olabilir.',
    keywords: ['savunma', 'pozisyon', 'para', 'rekabet', 'dayanıklılık'],
    context: 'Geçmişte mali tutumlar savunma ve koruma odaklıydı.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_pe_pos4',
    card: 'Eight of Wands',
    position: 4,
    upright:
      'Geçmişte hızlı gelişmeler, ani mali fırsatlar ve hareketlilik yaşanmış olabilir.',
    reversed:
      'Ters Sekiz Asa, gecikmeler ve iletişim sorunları nedeniyle finansal akış yavaşlamıştır.',
    keywords: ['hız', 'gelişme', 'para', 'fırsat', 'hareket'],
    context: 'Geçmişte mali süreçler hızlı gelişmelerle ilerlemişti.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_pe_pos4',
    card: 'Nine of Wands',
    position: 4,
    upright:
      'Geçmişte mali konularda direnç, dayanıklılık ve zor dönemleri atlatma çabası öne çıkmış olabilir.',
    reversed:
      'Ters Dokuz Asa, tükenmişlik ve aşırı tetikte olma mali güveni zayıflatmıştır.',
    keywords: ['dayanıklılık', 'savunma', 'para', 'zor dönem', 'koruma'],
    context: 'Geçmişte mali durum zorluklara direnç göstererek sürdürüldü.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_pe_pos4',
    card: 'Ten of Wands',
    position: 4,
    upright:
      'Geçmişte mali sorumluluklar ağır yük gibi hissedilmiş olabilir. Çok fazla görev üstlenilmişti.',
    reversed:
      'Ters On Asa, yüklerin paylaşılmaması nedeniyle tükenmişlik ve verim kaybı oluşmuştur.',
    keywords: ['yük', 'sorumluluk', 'para', 'çaba', 'zorlanma'],
    context: 'Geçmişte para konularında aşırı sorumluluk yüklenmişti.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_pe_pos4',
    card: 'Page of Wands',
    position: 4,
    upright:
      'Geçmişte yeni fikirler, cesaret ve keşif ruhu mali girişimlere yön vermiş olabilir.',
    reversed:
      'Ters Asa Prensi, dikkatsizlik veya dağınıklık nedeniyle fırsatlar kaçırılmıştır.',
    keywords: ['keşif', 'cesaret', 'para', 'yenilik', 'ilham'],
    context: 'Geçmişte mali durum keşif ruhu ile hareket edilmişti.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_pe_pos4',
    card: 'Knight of Wands',
    position: 4,
    upright:
      'Geçmişte atılganlık, cesur girişimler ve hızlı hareketler mali tutumları şekillendirmiş olabilir.',
    reversed:
      'Ters Asa Şövalyesi, sabırsızlık ve dikkatsizlik nedeniyle mali istikrar sağlanamamıştır.',
    keywords: ['cesaret', 'hız', 'para', 'girişim', 'atılım'],
    context: 'Geçmişte mali kararlar cesur ve hızlı alınmıştı.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_pe_pos4',
    card: 'Queen of Wands',
    position: 4,
    upright:
      'Geçmişte mali kaynakların yönetiminde karizma, özgüven ve girişimcilik ruhu öne çıkmış olabilir.',
    reversed:
      'Ters Asa Kraliçesi, güvensizlik ve kıskançlık mali gelişimi zorlamış olabilir.',
    keywords: ['özgüven', 'liderlik', 'para', 'karizma', 'girişim'],
    context: 'Geçmişte mali tutumlar güçlü bir liderlik ruhuyla ilerlemişti.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_pe_pos4',
    card: 'King of Wands',
    position: 4,
    upright:
      'Geçmişte vizyoner liderlik, stratejik kararlar ve cesur adımlar mali güvenliği sağlamış olabilir.',
    reversed:
      'Ters Asa Kralı, otoriter tutumlar veya sabırsızlık mali ilerlemeyi sınırlamış olabilir.',
    keywords: ['vizyon', 'liderlik', 'para', 'strateji', 'cesaret'],
    context: 'Geçmişte mali kaynaklar stratejik cesaretle yönetilmişti.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyposition4Meaning(
  card: TarotCard
): Moneyposition4Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position4Meanings.find(
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
  meaning = position4Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getMoneyposition4MeaningByCardName(
  cardName: string
): Moneyposition4Meaning | null {
  return position4Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllMoneyposition4Meanings(): Moneyposition4Meaning[] {
  return position4Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getMoneyposition4MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): Moneyposition4Meaning[] {
  return position4Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition4Meanings = (): I18nMoneyposition4Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position4Meanings.map(meaning => {
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
export const getI18nposition4Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nMoneyposition4Meaning | null => {
  const originalMeaning = position4Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(`money.meanings.${cardKey}.position4.upright`);
  const i18nReversed = t(`money.meanings.${cardKey}.position4.reversed`);
  const i18nKeywords = t(`money.meanings.${cardKey}.position4.keywords`);
  const i18nContext = t(`money.meanings.${cardKey}.position4.context`);
  const i18nGroup = t(
    `money.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
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
const moneyposition4Exports = {
  position4Meanings,
  getMoneyposition4Meaning,
  getMoneyposition4MeaningByCardName,
  getAllMoneyposition4Meanings,
  getMoneyposition4MeaningsByGroup,
  getI18nposition4Meaning,
};

export default moneyposition4Exports;
