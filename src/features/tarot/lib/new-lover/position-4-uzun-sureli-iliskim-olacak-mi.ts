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

export interface NewLoverposition4Meaning {
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
export interface I18nNewLoverposition4Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position4Meanings: NewLoverposition4Meaning[] = [
  // --- Majör Arkana Kartları ---
    {
      id: 'the_fool_ma_pos4',
      card: 'The Fool',
      position: 4,
      upright:
        'Deli, ilişkinin özgürlük ve tazelikle başlayacağını gösterir. Uzun süreli olması için sorumluluk bilinci eklenmelidir.',
      reversed:
        'Ters Deli, plansızlık ve ciddiyetsizlik uzun vadeyi zorlaştırır. Dengeyi bulmak önemlidir.',
      keywords: ['özgürlük', 'başlangıç', 'sorumluluk', 'denge', 'uzun vade'],
      context: 'Tazelik uzun vadeyi besler, sorumsuzluk bağı kısa kılar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_magician_ma_pos4',
      card: 'The Magician',
      position: 4,
      upright:
        'Büyücü, uzun vadeli ilişki için güçlü bir potansiyel yaratımını gösterir. İletişim becerileri sürekliliği sağlar.',
      reversed:
        'Ters Büyücü, manipülasyon veya dürüst olmayan davranış uzun vadeyi zedeler.',
      keywords: ['yaratım', 'potansiyel', 'iletişim', 'dürüstlük', 'uzun vade'],
      context: 'Net niyet uzun vadeyi besler, oyunlar bağı yıpratır.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_high_priestess_ma_pos4',
      card: 'The High Priestess',
      position: 4,
      upright:
        'Başrahibe, ilişki derin bir sezgi ve anlayışla ilerleyebilir. Bu, uzun vadeli bağ için güçlü bir temeldir.',
      reversed:
        'Ters Başrahibe, aşırı gizlilik veya içe kapanma uzun vadede sorun yaratır.',
      keywords: ['sezgi', 'anlayış', 'giz', 'derinlik', 'uzun vade'],
      context: 'Derin sezgi uzun vadeyi güçlendirir, aşırı gizlilik bağı zayıflatır.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_empress_ma_pos4',
      card: 'The Empress',
      position: 4,
      upright:
        'İmparatoriçe, bereketli ve besleyici bir bağ uzun vadeyi destekler. Sevgi dolu bakım ilişkinin sürekliliğini sağlar.',
      reversed:
        'Ters İmparatoriçe, aşırı sahiplenme veya tükenmişlik uzun vadeyi zorlaştırır.',
      keywords: ['bereket', 'besleyicilik', 'sevgi', 'süreklilik', 'denge'],
      context: 'Besleyici sevgi uzun vadeyi güçlendirir, tükenmişlik bağı zorlar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_emperor_ma_pos4',
      card: 'The Emperor',
      position: 4,
      upright:
        'İmparator, sağlam yapı ve istikrar uzun vadeyi destekler. Güvenilirlik bağın temeli olur.',
      reversed:
        'Ters İmparator, aşırı kontrol veya katı kurallar uzun vadeyi zorlaştırır.',
      keywords: ['istikrar', 'güven', 'otorite', 'yapı', 'uzun vade'],
      context: 'İstikrar uzun vadeyi besler, katılık bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_hierophant_ma_pos4',
      card: 'The Hierophant',
      position: 4,
      upright:
        'Aziz, geleneksel değerler ve bağlılık uzun vadeli ilişkiyi destekler. Ortak inançlar bağları güçlendirir.',
      reversed:
        'Ters Aziz, kör gelenekçilik veya başkaldırı uzun vadeyi zorlaştırır.',
      keywords: ['gelenek', 'bağlılık', 'inanç', 'uyum', 'uzun vade'],
      context: 'Ortak değerler uzun vadeyi destekler, kör kurallar bağı yıpratır.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_lovers_ma_pos4',
      card: 'The Lovers',
      position: 4,
      upright:
        'Aşıklar, güçlü bir seçim ve uyum uzun vadeli birlikteliği destekler. Kalbin netliği sürekliliği sağlar.',
      reversed:
        'Ters Aşıklar, kararsızlık veya uyumsuzluk uzun vadeyi zorlaştırır.',
      keywords: ['uyum', 'seçim', 'aşk', 'taahhüt', 'uzun vade'],
      context: 'Net seçim uzun vadeyi destekler, kararsızlık bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_chariot_ma_pos4',
      card: 'The Chariot',
      position: 4,
      upright:
        'Savaş Arabası, kararlılık ve ortak hedefler uzun vadeli ilişkiyi destekler. Birlikte yol almak bağları güçlendirir.',
      reversed:
        'Ters Savaş Arabası, yönsüzlük veya aşırı ego uzun vadeyi zorlaştırır.',
      keywords: ['kararlılık', 'hedef', 'birlik', 'ilerleme', 'uzun vade'],
      context: 'Ortak hedefler uzun vadeyi besler, yönsüzlük bağı yorar.',
      group: 'Majör Arkana',
    },
    {
      id: 'strength_ma_pos4',
      card: 'Strength',
      position: 4,
      upright:
        'Güç, sabır ve şefkat uzun vadeli ilişkinin temelidir. Yumuşak cesaret bağları kalıcı kılar.',
      reversed:
        'Ters Güç, gurur veya öfke uzun vadede bağları yıpratır.',
      keywords: ['sabır', 'şefkat', 'cesaret', 'denge', 'uzun vade'],
      context: 'Şefkat uzun vadeyi güçlendirir, gurur bağı zayıflatır.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_hermit_ma_pos4',
      card: 'The Hermit',
      position: 4,
      upright:
        'Ermiş, içsel bilgelik ve sağlıklı yalnızlık uzun vadeyi destekler. Düşünceli yaklaşım bağları olgunlaştırır.',
      reversed:
        'Ters Ermiş, aşırı izolasyon uzun vadede bağı zedeler.',
      keywords: ['bilgelik', 'içe dönüş', 'olgunluk', 'denge', 'uzun vade'],
      context: 'Bilgelik uzun vadeyi besler, izolasyon bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'wheel_of_fortune_ma_pos4',
      card: 'Wheel of Fortune',
      position: 4,
      upright:
        'Kader Çarkı, ilişkinin döngüler içinde gelişeceğini gösterir. Değişime uyum uzun vadeyi güçlendirir.',
      reversed:
        'Ters Çark, direnç ve kontrol arzusu uzun vadeyi zorlaştırır.',
      keywords: ['döngü', 'değişim', 'uyum', 'şans', 'uzun vade'],
      context: 'Değişime uyum uzun vadeyi destekler, direnç bağı yorar.',
      group: 'Majör Arkana',
    },
    {
      id: 'justice_ma_pos4',
      card: 'Justice',
      position: 4,
      upright:
        'Adalet, dürüstlük ve adil paylaşım uzun vadeyi destekler. Açık iletişim bağları güçlendirir.',
      reversed:
        'Ters Adalet, adaletsizlik veya yalan uzun vadeyi zedeler.',
      keywords: ['adalet', 'dürüstlük', 'denge', 'iletişim', 'uzun vade'],
      context: 'Adalet uzun vadeyi besler, adaletsizlik bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_hanged_man_ma_pos4',
      card: 'The Hanged Man',
      position: 4,
      upright:
        'Asılan Adam, farklı bakış açıları uzun vadeli ilişkiyi destekler. Teslimiyet bağları güçlendirir.',
      reversed:
        'Ters Asılan Adam, kurban rolü veya inat uzun vadeyi zorlaştırır.',
      keywords: ['teslimiyet', 'perspektif', 'denge', 'özveri', 'uzun vade'],
      context: 'Perspektif uzun vadeyi destekler, inat bağı zedeler.',
      group: 'Majör Arkana',
    },
    {
      id: 'death_ma_pos4',
      card: 'Death',
      position: 4,
      upright:
        'Ölüm, dönüşüm ve eskiyi bırakma uzun vadeli ilişkinin kapısını açar. Yenilenme bağları tazeler.',
      reversed:
        'Ters Ölüm, değişime direnç uzun vadeyi zorlaştırır.',
      keywords: ['dönüşüm', 'yenilenme', 'bitiş', 'başlangıç', 'uzun vade'],
      context: 'Dönüşüm uzun vadeyi güçlendirir, direnç bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'temperance_ma_pos4',
      card: 'Temperance',
      position: 4,
      upright:
        'Denge, sabır ve uyum uzun vadeli ilişkiyi destekler. Orta yol bağları kalıcı kılar.',
      reversed:
        'Ters Denge, aşırılıklar uzun vadeyi zedeler.',
      keywords: ['denge', 'sabır', 'uyum', 'orta yol', 'uzun vade'],
      context: 'Denge uzun vadeyi besler, aşırılık bağı zorlar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_devil_ma_pos4',
      card: 'The Devil',
      position: 4,
      upright:
        'Şeytan, bağımlılık veya tutku uzun vadeyi zorlayabilir. Sağlıklı sınırlar ilişkiyi korur.',
      reversed:
        'Ters Şeytan, özgürleşme uzun vadeli ilişkiyi destekler.',
      keywords: ['bağımlılık', 'tutku', 'sınır', 'özgürlük', 'uzun vade'],
      context: 'Sınırlar uzun vadeyi korur, bağımlılık bağı yorar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_tower_ma_pos4',
      card: 'The Tower',
      position: 4,
      upright:
        'Kule, krizlerin ardından yenilenme uzun vadeyi destekler. Gerçeklerle yüzleşmek bağı sağlamlaştırır.',
      reversed:
        'Ters Kule, kaçınılan krizler uzun vadeyi zedeler.',
      keywords: ['kriz', 'yenilenme', 'gerçek', 'dönüşüm', 'uzun vade'],
      context: 'Yüzleşme uzun vadeyi güçlendirir, kaçınma bağı yorar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_star_ma_pos4',
      card: 'The Star',
      position: 4,
      upright:
        'Yıldız, umut ve şifa uzun vadeli ilişkiyi destekler. İlham bağları tazeler.',
      reversed:
        'Ters Yıldız, umutsuzluk veya ilgisizlik uzun vadeyi zorlaştırır.',
      keywords: ['umut', 'şifa', 'ilham', 'yenilenme', 'uzun vade'],
      context: 'Umut uzun vadeyi besler, ilgisizlik bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_moon_ma_pos4',
      card: 'The Moon',
      position: 4,
      upright:
        'Ay, sezgi ve duygusal derinlik uzun vadeyi destekler. Netlik zamanla gelir.',
      reversed:
        'Ters Ay, aldanma veya belirsizlik uzun vadeyi zedeler.',
      keywords: ['sezgi', 'derinlik', 'belirsizlik', 'duygu', 'uzun vade'],
      context: 'Sezgi uzun vadeyi besler, belirsizlik bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_sun_ma_pos4',
      card: 'The Sun',
      position: 4,
      upright:
        'Güneş, mutluluk ve netlik uzun vadeli ilişkiyi destekler. Neşe bağları kalıcı kılar.',
      reversed:
        'Ters Güneş, sahte mutluluk veya yüzeysellik uzun vadeyi zorlaştırır.',
      keywords: ['mutluluk', 'netlik', 'neşe', 'uyum', 'uzun vade'],
      context: 'Neşe uzun vadeyi besler, yüzeysellik bağı yorar.',
      group: 'Majör Arkana',
    },
    {
      id: 'judgement_ma_pos4',
      card: 'Judgement',
      position: 4,
      upright:
        'Mahkeme, geçmişle yüzleşme ve affediş uzun vadeli ilişkiyi destekler. Yenilenme bağları güçlendirir.',
      reversed:
        'Ters Mahkeme, pişmanlık veya öz-yargı uzun vadeyi zedeler.',
      keywords: ['yüzleşme', 'affediş', 'yenilenme', 'özgürlük', 'uzun vade'],
      context: 'Affediş uzun vadeyi destekler, öz-yargı bağı sınar.',
      group: 'Majör Arkana',
    },
    {
      id: 'the_world_ma_pos4',
      card: 'The World',
      position: 4,
      upright:
        'Dünya, tamamlanma ve bütünlük uzun vadeli ilişkiyi destekler. Ortak hedefler bağları kalıcı kılar.',
      reversed:
        'Ters Dünya, yarım kalmışlık veya eksik kapanış uzun vadeyi zorlaştırır.',
      keywords: ['tamamlanma', 'bütünlük', 'hedef', 'istikrar', 'uzun vade'],
      context: 'Bütünlük uzun vadeyi güçlendirir, eksiklik bağı sınar.',
      group: 'Majör Arkana',
    },

  //-- Kupalar --//
    {
      id: 'ace_of_cups_ma_pos4',
      card: 'Ace of Cups',
      position: 4,
      upright:
        'As Kupa, saf bir sevgi başlangıcını ve duygusal açıdan derin bir bağ kurma potansiyelini gösterir. Bu ilişki uzun vadede kalbi besleyebilir.',
      reversed:
        'Ters As Kupa, duygusal açıklığın eksikliği uzun vadeli bağın önünde engel olabilir. Kapanma ya da kırgınlık sürekliliği zorlaştırır.',
      keywords: ['başlangıç', 'sevgi', 'duygusal bağ', 'potansiyel', 'uzun vade'],
      context: 'Saf sevgi uzun vadeyi destekler, kapanma bağı zayıflatır.',
      group: 'Kupalar',
    },
    {
      id: 'two_of_cups_ma_pos4',
      card: 'Two of Cups',
      position: 4,
      upright:
        'İki Kupa, karşılıklı uyum ve ortaklık uzun vadeli ilişkinin temeli olur. Kalpler arasında eşitlik bağı kalıcı kılar.',
      reversed:
        'Ters İki Kupa, uyumsuzluk ya da dengesiz alışveriş uzun vadeyi zayıflatır.',
      keywords: ['uyum', 'ortaklık', 'eşitlik', 'sevgi', 'uzun vade'],
      context: 'Eşitlik uzun vadeyi besler, dengesizlik bağı yıpratır.',
      group: 'Kupalar',
    },
    {
      id: 'three_of_cups_ma_pos4',
      card: 'Three of Cups',
      position: 4,
      upright:
        'Üç Kupa, dostluk ve kutlama enerjisi uzun vadede bağı güçlendirir. Paylaşılan neşe ilişkinin ömrünü uzatır.',
      reversed:
        'Ters Üç Kupa, aşırı yüzeysellik ya da üçüncü kişilerin etkisi uzun vadeyi zorlaştırır.',
      keywords: ['kutlama', 'dostluk', 'paylaşım', 'neşe', 'uzun vade'],
      context: 'Neşe uzun vadeyi besler, yüzeysellik bağı yorar.',
      group: 'Kupalar',
    },
    {
      id: 'four_of_cups_ma_pos4',
      card: 'Four of Cups',
      position: 4,
      upright:
        'Dört Kupa, uzun vadeli ilişkinin zamanla durağanlık hissi verebileceğini gösterir. Farkındalık canlılığı korur.',
      reversed:
        'Ters Dört Kupa, farkındalığın artmasıyla ilişkiye yeni bir tazelik gelir. Bu da uzun vadeyi destekler.',
      keywords: ['durağanlık', 'farkındalık', 'tatmin', 'yenilenme', 'uzun vade'],
      context: 'Farkındalık uzun vadeyi besler, tatminsizlik bağı sınar.',
      group: 'Kupalar',
    },
    {
      id: 'five_of_cups_ma_pos4',
      card: 'Five of Cups',
      position: 4,
      upright:
        'Beş Kupa, kayıplara odaklanmanın uzun vadeli ilişkiyi zorlayabileceğini gösterir. Eldekini görme alışkanlığı süreklilik sağlar.',
      reversed:
        'Ters Beş Kupa, yasın ardından iyileşme ve umut uzun vadeli bağları onarır.',
      keywords: ['kayıp', 'yas', 'umut', 'iyileşme', 'uzun vade'],
      context: 'Umuda dönmek uzun vadeyi besler, kayıplara saplanmak bağı sınar.',
      group: 'Kupalar',
    },
    {
      id: 'six_of_cups_ma_pos4',
      card: 'Six of Cups',
      position: 4,
      upright:
        'Altı Kupa, geçmişten gelen sıcaklık ve içtenlik uzun vadeli ilişkiye kök sağlar. Masumiyet bağı canlı kılar.',
      reversed:
        'Ters Altı Kupa, geçmişe fazla takılı kalmak uzun vadeyi zorlaştırır. Şimdiye odaklanmak gerekir.',
      keywords: ['nostalji', 'masumiyet', 'sıcaklık', 'geçmiş', 'uzun vade'],
      context: 'Sıcaklık uzun vadeyi destekler, geçmişe saplanmak bağı yorar.',
      group: 'Kupalar',
    },
    {
      id: 'seven_of_cups_ma_pos4',
      card: 'Seven of Cups',
      position: 4,
      upright:
        'Yedi Kupa, hayallerin ve seçeneklerin bolluğu uzun vadede net seçim gerektirir. Belirsizlik bağın dengesini sarsabilir.',
      reversed:
        'Ters Yedi Kupa, netleşme ve gerçekçi yaklaşım uzun vadeyi destekler.',
      keywords: ['seçenek', 'hayal', 'netlik', 'gerçekçilik', 'uzun vade'],
      context: 'Net seçim uzun vadeyi besler, belirsizlik bağı sınar.',
      group: 'Kupalar',
    },
    {
      id: 'eight_of_cups_ma_pos4',
      card: 'Eight of Cups',
      position: 4,
      upright:
        'Sekiz Kupa, daha derin anlam arayışı uzun vadede dönüşüm gerektirebilir. Sağlıklı kararlar sürekliliği sağlar.',
      reversed:
        'Ters Sekiz Kupa, kararsızlık veya git–kal ikilemi uzun vadeyi zorlaştırır.',
      keywords: ['arayış', 'dönüşüm', 'karar', 'gitmek', 'uzun vade'],
      context: 'Anlam arayışı uzun vadeyi güçlendirir, kararsızlık bağı sınar.',
      group: 'Kupalar',
    },
    {
      id: 'nine_of_cups_ma_pos4',
      card: 'Nine of Cups',
      position: 4,
      upright:
        'Dokuz Kupa, kişisel tatmin ve mutluluk uzun vadeli bağı güçlendirir. Paylaşılan memnuniyet sürekliliği sağlar.',
      reversed:
        'Ters Dokuz Kupa, bencillik ya da yüzeysel tatmin uzun vadeyi zayıflatır.',
      keywords: ['tatmin', 'mutluluk', 'paylaşım', 'haz', 'uzun vade'],
      context: 'Paylaşılan mutluluk uzun vadeyi besler, bencillik bağı sınar.',
      group: 'Kupalar',
    },
    {
      id: 'ten_of_cups_ma_pos4',
      card: 'Ten of Cups',
      position: 4,
      upright:
        'On Kupa, ailevi uyum ve huzur uzun vadeli ilişkinin işareti olur. Birlik duygusu sürekliliği besler.',
      reversed:
        'Ters On Kupa, beklenti–gerçeklik çatışması uzun vadeyi zorlaştırır.',
      keywords: ['aile', 'uyum', 'huzur', 'birlik', 'uzun vade'],
      context: 'Birlik uzun vadeyi besler, çatışma bağı sınar.',
      group: 'Kupalar',
    },
    {
      id: 'page_of_cups_ma_pos4',
      card: 'Page of Cups',
      position: 4,
      upright:
        'Kupa Prensi, duygusal açıklık ve masumiyet uzun vadeli ilişkiye tazelik katar. Merak bağı canlı tutar.',
      reversed:
        'Ters Kupa Prensi, aşırı hassasiyet veya olgunlaşmamışlık uzun vadeyi zorlaştırır.',
      keywords: ['merak', 'masumiyet', 'açıklık', 'olgunlaşma', 'uzun vade'],
      context: 'Açıklık uzun vadeyi besler, olgunlaşmamışlık bağı sınar.',
      group: 'Kupalar',
    },
    {
      id: 'knight_of_cups_ma_pos4',
      card: 'Knight of Cups',
      position: 4,
      upright:
        'Kupa Şövalyesi, romantizm ve zarafet uzun vadeli ilişkiyi destekler. Kalpten adımlar süreklilik sağlar.',
      reversed:
        'Ters Kupa Şövalyesi, tutarsız vaatler uzun vadeyi zedeler.',
      keywords: ['romantizm', 'zarafet', 'teklif', 'duygu', 'uzun vade'],
      context: 'Romantizm uzun vadeyi besler, tutarsızlık bağı sınar.',
      group: 'Kupalar',
    },
    {
      id: 'queen_of_cups_ma_pos4',
      card: 'Queen of Cups',
      position: 4,
      upright:
        'Kupa Kraliçesi, empati ve duygusal olgunluk uzun vadeli bağ için temel olur. Güvenli alan sürekliliği sağlar.',
      reversed:
        'Ters Kupa Kraliçesi, aşırı duygusallık veya sınır eksikliği uzun vadeyi zorlaştırır.',
      keywords: ['empati', 'olgunluk', 'güven', 'duygu', 'uzun vade'],
      context: 'Empati uzun vadeyi destekler, sınır eksikliği bağı sınar.',
      group: 'Kupalar',
    },
    {
      id: 'king_of_cups_ma_pos4',
      card: 'King of Cups',
      position: 4,
      upright:
        'Kupa Kralı, duygusal denge ve olgun liderlik uzun vadeli ilişkiyi destekler. Sükûnet bağı kalıcı kılar.',
      reversed:
        'Ters Kupa Kralı, bastırılmış duygular veya pasif agresif tavırlar uzun vadeyi zorlaştırır.',
      keywords: ['denge', 'liderlik', 'olgunluk', 'duygu', 'uzun vade'],
      context: 'Olgunluk uzun vadeyi besler, bastırılmış duygular bağı sınar.',
      group: 'Kupalar',
    },

  // --- Kılıçlar Serisi ---
    {
      id: 'ace_of_swords_ma_pos4',
      card: 'Ace of Swords',
      position: 4,
      upright:
        'Kılıç Ası, netlik ve dürüstlük uzun süreli ilişkinin temel taşıdır. Açık iletişim geleceği sağlamlaştırır.',
      reversed:
        'Ters Kılıç Ası, yanlış anlamalar veya iletişim kopuklukları uzun vadeli bağı zedeleyebilir.',
      keywords: ['netlik', 'dürüstlük', 'iletişim', 'hakikat', 'uzun vade'],
      context: 'Netlik uzun vadeyi güçlendirir, kopukluk bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'two_of_swords_ma_pos4',
      card: 'Two of Swords',
      position: 4,
      upright:
        'İki Kılıç, kararların ertelenmesi uzun vadeli bağı askıda tutabilir. Açık seçimler süreklilik sağlar.',
      reversed:
        'Ters İki Kılıç, yüzleşilen karar uzun vadeli ilişkinin kaderini belirler.',
      keywords: ['karar', 'ikilem', 'yüzleşme', 'denge', 'uzun vade'],
      context: 'Karar netliği uzun vadeyi besler, ikilem bağı zorlar.',
      group: 'Kılıçlar',
    },
    {
      id: 'three_of_swords_ma_pos4',
      card: 'Three of Swords',
      position: 4,
      upright:
        'Üç Kılıç, kalp kırıklıkları uzun vadeli bağın sınavı olabilir. Açık şifa süreçleri sürekliliği destekler.',
      reversed:
        'Ters Üç Kılıç, iyileşme sürecine girilirse uzun vadeli bağ yeniden kurulabilir.',
      keywords: ['kalp kırıklığı', 'acı', 'iyileşme', 'gerçeklik', 'uzun vade'],
      context: 'Şifa uzun vadeyi güçlendirir, acı bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'four_of_swords_ma_pos4',
      card: 'Four of Swords',
      position: 4,
      upright:
        'Dört Kılıç, dinlenme ve sakinleşme süreçleri uzun vadeli bağı korur. Sükûnet ilişkiye güç verir.',
      reversed:
        'Ters Dört Kılıç, yorgunluk ve mola eksikliği uzun vadeyi zorlaştırır.',
      keywords: ['dinlenme', 'sükûnet', 'toparlanma', 'denge', 'uzun vade'],
      context: 'Dinlenme uzun vadeyi besler, tükenme bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'five_of_swords_ma_pos4',
      card: 'Five of Swords',
      position: 4,
      upright:
        'Beş Kılıç, çatışmaların kazanç uğruna büyümesi uzun vadeli bağa zarar verebilir. Köprüleri korumak önemlidir.',
      reversed:
        'Ters Beş Kılıç, onarım niyeti uzun vadeli ilişkinin yeniden yeşermesini sağlar.',
      keywords: ['çatışma', 'ego', 'onarma', 'rekabet', 'uzun vade'],
      context: 'Onarım uzun vadeyi besler, ego bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'six_of_swords_ma_pos4',
      card: 'Six of Swords',
      position: 4,
      upright:
        'Altı Kılıç, zorlu dönemlerin ardından sakin sulara geçiş uzun vadeli bağın güçlenmesini sağlar.',
      reversed:
        'Ters Altı Kılıç, geçmişten kopamamak uzun vadeyi zorlaştırabilir.',
      keywords: ['geçiş', 'iyileşme', 'rota', 'ilerleme', 'uzun vade'],
      context: 'Geçiş uzun vadeyi besler, bağ geçmişe saplanırsa zorlanır.',
      group: 'Kılıçlar',
    },
    {
      id: 'seven_of_swords_ma_pos4',
      card: 'Seven of Swords',
      position: 4,
      upright:
        'Yedi Kılıç, gizlilik veya stratejik davranış uzun vadeli bağı sınayabilir. Şeffaflık sürekliliği güçlendirir.',
      reversed:
        'Ters Yedi Kılıç, dürüstlükle yüzleşmek uzun vadeli ilişkinin temelini yeniden kurar.',
      keywords: ['gizlilik', 'strateji', 'dürüstlük', 'güven', 'uzun vade'],
      context: 'Şeffaflık uzun vadeyi besler, gizlilik bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'eight_of_swords_ma_pos4',
      card: 'Eight of Swords',
      position: 4,
      upright:
        'Sekiz Kılıç, zihinsel kısıtlamalar uzun vadeli bağı daraltabilir. İnanç kalıplarını aşmak özgürlük getirir.',
      reversed:
        'Ters Sekiz Kılıç, özgürleşme ve farkındalık uzun vadeyi destekler.',
      keywords: ['kısıt', 'zihin', 'özgürlük', 'farkındalık', 'uzun vade'],
      context: 'Özgürleşme uzun vadeyi besler, kısıt bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'nine_of_swords_ma_pos4',
      card: 'Nine of Swords',
      position: 4,
      upright:
        'Dokuz Kılıç, kaygılar ve korkular uzun vadeli bağı zayıflatabilir. Gerçekçi bakış açısı ilişkiyi korur.',
      reversed:
        'Ters Dokuz Kılıç, kabuslardan uyanış ve netleşme uzun vadeyi güçlendirebilir.',
      keywords: ['kaygı', 'korku', 'gerçekçilik', 'netlik', 'uzun vade'],
      context: 'Gerçekçilik uzun vadeyi destekler, kaygı bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'ten_of_swords_ma_pos4',
      card: 'Ten of Swords',
      position: 4,
      upright:
        'On Kılıç, bitişlerin ardından yeniden doğuş uzun vadeli bağda yeni bir sayfa açabilir.',
      reversed:
        'Ters On Kılıç, toparlanma süreci uzun vadeyi destekler fakat sabır ister.',
      keywords: ['bitiş', 'yeniden doğuş', 'teslimiyet', 'yenilenme', 'uzun vade'],
      context: 'Bitişten doğan yenilik uzun vadeyi destekler.',
      group: 'Kılıçlar',
    },
    {
      id: 'page_of_swords_ma_pos4',
      card: 'Page of Swords',
      position: 4,
      upright:
        'Kılıç Prensi, merak ve dürüst iletişim uzun vadeli bağı canlı tutar.',
      reversed:
        'Ters Kılıç Prensi, dedikodu veya yüzeysellik uzun vadeli bağı zayıflatır.',
      keywords: ['merak', 'iletişim', 'dürüstlük', 'öğrenme', 'uzun vade'],
      context: 'Dürüst iletişim uzun vadeyi besler, yüzeysellik bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'knight_of_swords_ma_pos4',
      card: 'Knight of Swords',
      position: 4,
      upright:
        'Kılıç Şövalyesi, hızlı hareket ve netlik uzun vadede ivme katar. Kararlı duruş sürekliliği destekler.',
      reversed:
        'Ters Kılıç Şövalyesi, acelecilik ve sert üslup uzun vadeyi zorlaştırır.',
      keywords: ['hız', 'kararlılık', 'netlik', 'strateji', 'uzun vade'],
      context: 'Kararlılık uzun vadeyi destekler, acelecilik bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'queen_of_swords_ma_pos4',
      card: 'Queen of Swords',
      position: 4,
      upright:
        'Kılıç Kraliçesi, objektiflik ve adalet uzun vadeli bağda denge sağlar. Netlik sürekliliği besler.',
      reversed:
        'Ters Kılıç Kraliçesi, aşırı eleştirellik uzun vadeli bağı inceltebilir.',
      keywords: ['adalet', 'netlik', 'objektiflik', 'denge', 'uzun vade'],
      context: 'Objektiflik uzun vadeyi güçlendirir, eleştiri bağı sınar.',
      group: 'Kılıçlar',
    },
    {
      id: 'king_of_swords_ma_pos4',
      card: 'King of Swords',
      position: 4,
      upright:
        'Kılıç Kralı, stratejik düşünce ve ilkesel duruş uzun vadeli bağ için güçlü bir temel sağlar.',
      reversed:
        'Ters Kılıç Kralı, katılık ve soğukluk uzun vadeli bağı zorlaştırır.',
      keywords: ['strateji', 'ilke', 'otorite', 'mantık', 'uzun vade'],
      context: 'İlkeler uzun vadeyi besler, katılık bağı sınar.',
      group: 'Kılıçlar',
    },
  // --- Asalar Serisi ---//
    {
      id: 'ace_of_pentacles_ma_pos4',
      card: 'Ace of Pentacles',
      position: 4,
      upright:
        'Tılsım Ası, sağlam bir temel ve somut fırsat uzun vadeli ilişki için güçlü bir başlangıç sunar.',
      reversed:
        'Ters Tılsım Ası, kaçırılan fırsatlar veya maddi kaygılar uzun vadeli ilişkinin güvenini zorlayabilir.',
      keywords: ['temel', 'fırsat', 'istikrar', 'maddi güven', 'uzun vade'],
      context: 'Sağlam temel uzun vadeyi destekler, kaygılar bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'two_of_pentacles_ma_pos4',
      card: 'Two of Pentacles',
      position: 4,
      upright:
        'İki Tılsım, uyumlu dengeleme ve esneklik uzun vadeli ilişkinin akışını sağlar.',
      reversed:
        'Ters İki Tılsım, dengesizlik ve öncelik karmaşası uzun vadeli ilişkiyi zorlayabilir.',
      keywords: ['denge', 'esneklik', 'uyum', 'öncelik', 'uzun vade'],
      context: 'Denge uzun vadeyi besler, karmaşa bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'three_of_pentacles_ma_pos4',
      card: 'Three of Pentacles',
      position: 4,
      upright:
        'Üç Tılsım, işbirliği ve birlikte inşa uzun vadeli bağ için kalıcı yapı kurar.',
      reversed:
        'Ters Üç Tılsım, işbirliği eksikliği veya değer çatışması uzun vadeli ilişkiyi zayıflatır.',
      keywords: ['işbirliği', 'inşa', 'ortaklık', 'süreklilik', 'uzun vade'],
      context: 'İşbirliği uzun vadeyi güçlendirir, çatışma bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'four_of_pentacles_ma_pos4',
      card: 'Four of Pentacles',
      position: 4,
      upright:
        'Dört Tılsım, koruma ve güvenlik arayışı uzun vadeli bağa istikrar kazandırır.',
      reversed:
        'Ters Dört Tılsım, aşırı kontrol veya cimrilik uzun vadeli ilişkiyi sıkıştırabilir.',
      keywords: ['güvenlik', 'koruma', 'istikrar', 'kontrol', 'uzun vade'],
      context: 'Güvenlik uzun vadeyi besler, kontrol bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'five_of_pentacles_ma_pos4',
      card: 'Five of Pentacles',
      position: 4,
      upright:
        'Beş Tılsım, zor zamanlarda dayanışma uzun vadeli bağı güçlendirebilir.',
      reversed:
        'Ters Beş Tılsım, toparlanma ve destek bulma uzun vadeli bağda yeniden güven kurar.',
      keywords: ['dayanışma', 'zorluk', 'destek', 'güven', 'uzun vade'],
      context: 'Destek uzun vadeyi besler, yalnızlık bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'six_of_pentacles_ma_pos4',
      card: 'Six of Pentacles',
      position: 4,
      upright:
        'Altı Tılsım, adil paylaşım ve karşılıklılık uzun vadeli ilişkinin dengesini sağlar.',
      reversed:
        'Ters Altı Tılsım, güç dengesizliği uzun vadeli bağı zedeleyebilir.',
      keywords: ['paylaşım', 'adalet', 'denge', 'karşılıklılık', 'uzun vade'],
      context: 'Adil paylaşım uzun vadeyi destekler, dengesizlik bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'seven_of_pentacles_ma_pos4',
      card: 'Seven of Pentacles',
      position: 4,
      upright:
        'Yedi Tılsım, sabır ve değerlendirme uzun vadeli ilişkiyi büyütür.',
      reversed:
        'Ters Yedi Tılsım, sabırsızlık ve tatminsizlik uzun vadeyi zorlaştırır.',
      keywords: ['sabır', 'değerlendirme', 'büyüme', 'emeğin karşılığı', 'uzun vade'],
      context: 'Sabır uzun vadeyi besler, tatminsizlik bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'eight_of_pentacles_ma_pos4',
      card: 'Eight of Pentacles',
      position: 4,
      upright:
        'Sekiz Tılsım, emek ve sürekli gelişim uzun vadeli bağı güçlendirir.',
      reversed:
        'Ters Sekiz Tılsım, özensizlik veya tembellik uzun vadeyi zayıflatır.',
      keywords: ['emek', 'gelişim', 'çaba', 'ustalık', 'uzun vade'],
      context: 'Emek uzun vadeyi güçlendirir, özensizlik bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'nine_of_pentacles_ma_pos4',
      card: 'Nine of Pentacles',
      position: 4,
      upright:
        'Dokuz Tılsım, bağımsızlık ve öz değer uzun vadeli ilişkiye olgunluk katar.',
      reversed:
        'Ters Dokuz Tılsım, aşırı bağımlılık veya savurganlık uzun vadeyi zedeleyebilir.',
      keywords: ['öz değer', 'bağımsızlık', 'konfor', 'olgunluk', 'uzun vade'],
      context: 'Öz değer uzun vadeyi destekler, bağımlılık bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'ten_of_pentacles_ma_pos4',
      card: 'Ten of Pentacles',
      position: 4,
      upright:
        'On Tılsım, aile ve kalıcı yapı uzun vadeli ilişkinin temelini oluşturur.',
      reversed:
        'Ters On Tılsım, miras veya ailevi çatışmalar uzun vadeli bağı zorlayabilir.',
      keywords: ['aile', 'istikrar', 'kalıcılık', 'miras', 'uzun vade'],
      context: 'Kalıcılık uzun vadeyi besler, çatışma bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'page_of_pentacles_ma_pos4',
      card: 'Page of Pentacles',
      position: 4,
      upright:
        'Tılsım Prensi, öğrenme hevesi ve planlı adımlar uzun vadeli bağı güçlendirir.',
      reversed:
        'Ters Tılsım Prensi, dağınıklık ve erteleme uzun vadeli bağı zayıflatır.',
      keywords: ['öğrenme', 'hedef', 'planlama', 'pratiklik', 'uzun vade'],
      context: 'Planlı adımlar uzun vadeyi destekler, erteleme bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'knight_of_pentacles_ma_pos4',
      card: 'Knight of Pentacles',
      position: 4,
      upright:
        'Tılsım Şövalyesi, istikrarlı ve tutarlı çaba uzun vadeli bağın en büyük gücüdür.',
      reversed:
        'Ters Tılsım Şövalyesi, durağanlık ve esneksizlik uzun vadeyi zorlaştırır.',
      keywords: ['istikrar', 'çaba', 'süreklilik', 'düzen', 'uzun vade'],
      context: 'Tutarlılık uzun vadeyi destekler, durağanlık bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'queen_of_pentacles_ma_pos4',
      card: 'Queen of Pentacles',
      position: 4,
      upright:
        'Tılsım Kraliçesi, şefkat ve pratiklik uzun vadeli bağı besler.',
      reversed:
        'Ters Tılsım Kraliçesi, aşırı yüklenme veya öz bakım eksikliği uzun vadeyi zedeleyebilir.',
      keywords: ['şefkat', 'pratiklik', 'öz bakım', 'denge', 'uzun vade'],
      context: 'Şefkat uzun vadeyi besler, öz bakım eksikliği bağı sınar.',
      group: 'Tılsımlar',
    },
    {
      id: 'king_of_pentacles_ma_pos4',
      card: 'King of Pentacles',
      position: 4,
      upright:
        'Tılsım Kralı, maddi güven ve stratejik sağlamlık uzun vadeli ilişkiyi kalıcı kılar.',
      reversed:
        'Ters Tılsım Kralı, aşırı kontrol ve statü odaklılık uzun vadeyi zorlaştırır.',
      keywords: ['maddi güven', 'sağlamlık', 'strateji', 'istikrar', 'uzun vade'],
      context: 'Güven uzun vadeyi destekler, kontrol bağı sınar.',
      group: 'Tılsımlar',
    },
    //--- Tılsımlar Serisi ---
      {
        id: 'ace_of_wands_ma_pos4',
        card: 'Ace of Wands',
        position: 4,
        upright:
          'Asa Ası, yeni bir kıvılcım ve güçlü bir enerji uzun süreli bir bağın temellerini atabilir. Tutku uzun vadede ilişkiye canlılık katar.',
        reversed:
          'Ters Asa Ası, ilham eksikliği veya ertelenmiş başlangıçlar uzun süreli ilişkinin zayıf kalmasına sebep olabilir.',
        keywords: ['başlangıç', 'tutku', 'ilham', 'enerji', 'uzun vade'],
        context: 'Tutku uzun vadeyi güçlendirir, ilham eksikliği bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'two_of_wands_ma_pos4',
        card: 'Two of Wands',
        position: 4,
        upright:
          'İki Asa, gelecek planlarının paylaşılması uzun vadeli bağ için güçlü bir işarettir. Ortak vizyon sürekliliği sağlar.',
        reversed:
          'Ters İki Asa, vizyon eksikliği veya tereddüt uzun süreli bağın gelişimini zorlaştırır.',
        keywords: ['vizyon', 'planlama', 'gelecek', 'ortaklık', 'uzun vade'],
        context: 'Ortak vizyon uzun vadeyi destekler, tereddüt bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'three_of_wands_ma_pos4',
        card: 'Three of Wands',
        position: 4,
        upright:
          'Üç Asa, ufuk genişleten fırsatlar ve ilerleme uzun süreli ilişkinin büyümesine katkı sağlar.',
        reversed:
          'Ters Üç Asa, dar görüşlülük veya gecikmeler uzun vadeli bağın gelişimini engelleyebilir.',
        keywords: ['ufuk', 'fırsat', 'genişleme', 'ilerleme', 'uzun vade'],
        context: 'Genişleme uzun vadeyi besler, gecikme bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'four_of_wands_ma_pos4',
        card: 'Four of Wands',
        position: 4,
        upright:
          'Dört Asa, kutlama, uyum ve sağlam bir temel uzun süreli ilişkinin işaretidir.',
        reversed:
          'Ters Dört Asa, istikrarsızlık veya yarım kalmışlık uzun vadeyi zorlayabilir.',
        keywords: ['kutlama', 'uyum', 'istikrar', 'temel', 'uzun vade'],
        context: 'Sağlam temel uzun vadeyi destekler, istikrarsızlık bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'five_of_wands_ma_pos4',
        card: 'Five of Wands',
        position: 4,
        upright:
          'Beş Asa, rekabet ve fikir ayrılıkları uzun vadeli bağda sınav olabilir. Çözüm süreci ilişkiyi olgunlaştırır.',
        reversed:
          'Ters Beş Asa, bastırılmış gerilim uzun vadeyi zayıflatabilir, şeffaflık şarttır.',
        keywords: ['rekabet', 'çatışma', 'gerilim', 'çözüm', 'uzun vade'],
        context: 'Çözüm uzun vadeyi besler, gerilim bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'six_of_wands_ma_pos4',
        card: 'Six of Wands',
        position: 4,
        upright:
          'Altı Asa, ortak zaferler ve tanınma uzun vadeli ilişkinin güvenini artırır.',
        reversed:
          'Ters Altı Asa, takdir eksikliği uzun vadeli bağı zorlaştırabilir.',
        keywords: ['zafer', 'tanınma', 'başarı', 'takdir', 'uzun vade'],
        context: 'Zafer uzun vadeyi besler, takdir eksikliği bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'seven_of_wands_ma_pos4',
        card: 'Seven of Wands',
        position: 4,
        upright:
          'Yedi Asa, sınırları koruma ve kararlılık uzun vadeli bağın devamlılığını sağlar.',
        reversed:
          'Ters Yedi Asa, aşırı savunmacılık veya yorgunluk uzun vadeli bağı zayıflatır.',
        keywords: ['savunma', 'sınır', 'kararlılık', 'direnç', 'uzun vade'],
        context: 'Kararlılık uzun vadeyi destekler, yorgunluk bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'eight_of_wands_ma_pos4',
        card: 'Eight of Wands',
        position: 4,
        upright:
          'Sekiz Asa, hızlı ilerleme ve net iletişim uzun vadeli bağı güçlendirir.',
        reversed:
          'Ters Sekiz Asa, gecikmeler ve yanlış sinyaller uzun vadeyi zorlaştırabilir.',
        keywords: ['hız', 'iletişim', 'ilerleme', 'senkron', 'uzun vade'],
        context: 'Hızlı akış uzun vadeyi besler, gecikme bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'nine_of_wands_ma_pos4',
        card: 'Nine of Wands',
        position: 4,
        upright:
          'Dokuz Asa, direnç ve kararlılık uzun vadeli ilişkinin gücünü artırır.',
        reversed:
          'Ters Dokuz Asa, tükenmişlik veya aşırı tetikte olma uzun vadeyi zorlaştırır.',
        keywords: ['direnç', 'kararlılık', 'koruma', 'sabır', 'uzun vade'],
        context: 'Kararlılık uzun vadeyi besler, tükenme bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'ten_of_wands_ma_pos4',
        card: 'Ten of Wands',
        position: 4,
        upright:
          'On Asa, sorumlulukların paylaşımı uzun vadeli bağın devamını sağlar.',
        reversed:
          'Ters On Asa, aşırı yüklenme ve tek taraflı çaba uzun vadeli ilişkiyi zorlayabilir.',
        keywords: ['sorumluluk', 'yük', 'paylaşım', 'denge', 'uzun vade'],
        context: 'Paylaşım uzun vadeyi besler, yük bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'page_of_wands_ma_pos4',
        card: 'Page of Wands',
        position: 4,
        upright:
          'Asa Prensi, keşif ruhu ve heves uzun vadeli ilişkiye canlılık katar.',
        reversed:
          'Ters Asa Prensi, dağınıklık veya kararsızlık uzun vadeyi zorlaştırır.',
        keywords: ['heves', 'keşif', 'canlılık', 'öğrenme', 'uzun vade'],
        context: 'Heves uzun vadeyi besler, dağınıklık bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'knight_of_wands_ma_pos4',
        card: 'Knight of Wands',
        position: 4,
        upright:
          'Asa Şövalyesi, tutku ve cesaret uzun vadeli bağın büyümesini sağlar.',
        reversed:
          'Ters Asa Şövalyesi, savrukluk veya taahhüt eksikliği uzun vadeyi zayıflatır.',
        keywords: ['tutku', 'cesaret', 'hareket', 'kararlılık', 'uzun vade'],
        context: 'Cesaret uzun vadeyi besler, savrukluk bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'queen_of_wands_ma_pos4',
        card: 'Queen of Wands',
        position: 4,
        upright:
          'Asa Kraliçesi, karizma ve güven uzun vadeli bağda ateşi canlı tutar.',
        reversed:
          'Ters Asa Kraliçesi, kıskançlık veya güvensizlik uzun vadeyi zorlayabilir.',
        keywords: ['karizma', 'güven', 'liderlik', 'tutku', 'uzun vade'],
        context: 'Güven uzun vadeyi besler, güvensizlik bağı sınar.',
        group: 'Asalar',
      },
      {
        id: 'king_of_wands_ma_pos4',
        card: 'King of Wands',
        position: 4,
        upright:
          'Asa Kralı, vizyon ve liderlik uzun vadeli bağın yönünü belirler.',
        reversed:
          'Ters Asa Kralı, otoriterlik veya sabırsızlık uzun vadeyi zorlaştırır.',
        keywords: ['vizyon', 'liderlik', 'karizma', 'cesaret', 'uzun vade'],
        context: 'Vizyon uzun vadeyi besler, sabırsızlık bağı sınar.',
        group: 'Asalar',
      },
];

/**
 * Belirli bir kart için pozisyon 4 anlamını getirir
 * @param card - Tarot kartı
 * @returns pozisyon 4 anlamı veya null
 */
  export function getNewLoverposition4Meaning(
  card: TarotCard
): NewLoverposition4Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position4Meanings.find(m => 
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
    'Deli': 'The Fool',
    'Büyücü': 'The Magician',
    'Yüksek Rahibe': 'The High Priestess',
    'İmparatoriçe': 'The Empress',
    'İmparator': 'The Emperor',
    'Hierophant': 'The Hierophant',
    'Aziz': 'The Hierophant',
    'Aşıklar': 'The Lovers',
    'Savaş Arabası': 'The Chariot',
    'Güç': 'Strength',
    'Ermiş': 'The Hermit',
    'Münzevi': 'The Hermit',
    'Kader Çarkı': 'The Wheel of Fortune',
    'Adalet': 'Justice',
    'Asılı Adam': 'The Hanged Man',
    'Ölüm': 'Death',
    'Ölçü': 'Temperance',
    'Ölçülülük': 'Temperance',
    'Şeytan': 'The Devil',
    'Kule': 'The Tower',
    'Yıldız': 'The Star',
    'Ay': 'The Moon',
    'Güneş': 'The Sun',
    'Yargı': 'Judgement',
    'Mahkeme': 'Judgement',
    'Dünya': 'The World',
  };
  
  // Türkçe ismi İngilizce'ye çevir
  const englishName = cardNameMapping[card.nameTr] || card.nameTr;
  
  // İngilizce isimle tekrar ara
  meaning = position4Meanings.find(m => m.card === englishName);
  
  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 4 anlamını getirir
 * @param cardName - Kart ismi
 * @returns pozisyon 4 anlamı veya null
 */
export function getNewLoverposition4MeaningByCardName(
  cardName: string
): NewLoverposition4Meaning | null {
  return position4Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 4 anlamlarını getirir
 * @returns pozisyon 4 anlamları array'i
 */
export function getAllNewLoverposition4Meanings(): NewLoverposition4Meaning[] {
  return position4Meanings;
}

/**
 * Kart grubuna göre pozisyon 4 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getNewLoverposition4MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): NewLoverposition4Meaning[] {
  return position4Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
  export const useI18nposition4Meanings = (): I18nNewLoverposition4Meaning[] => {
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
): I18nNewLoverposition4Meaning | null => {
  const originalMeaning = position4Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `new-lover.meanings.${cardKey}.position4.upright`
  );
  const i18nReversed = t(
    `new-lover.meanings.${cardKey}.position4.reversed`
  );
  const i18nKeywords = t(
    `new-lover.meanings.${cardKey}.position4.keywords`
  );
  const i18nContext = t(
    `new-lover.meanings.${cardKey}.position4.context`
  );
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
const newLoverposition4Exports = {
  position4Meanings,
  getNewLoverposition4Meaning,
  getNewLoverposition4MeaningByCardName,
  getAllNewLoverposition4Meanings,
  getNewLoverposition4MeaningsByGroup,
  getI18nposition4Meaning,
};

export default newLoverposition4Exports;
