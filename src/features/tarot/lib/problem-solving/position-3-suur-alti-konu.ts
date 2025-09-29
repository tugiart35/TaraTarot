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
import { getCardNameMappingSync } from '@/features/tarot/lib/love/card-name-mapping';

export interface ProblemSolvingPosition3Meaning {
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
export interface I18nProblemSolvingPosition3Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position3Meanings: ProblemSolvingPosition3Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ps_pos3',
    card: 'The Fool',
    position: 3,
    upright:
      'Joker, bilinçaltında geçmişte yaşadığın kontrolsüz başlangıçlar, aceleci adımlar veya düşünmeden risk alma eğilimleri yatıyor olabilir. Bu deneyimler şimdiki problemine yön vermiş olabilir.',
    reversed:
      'Ters Joker, geçmişte sorumsuzluk, dikkatsizlik veya fırsatları heba etmek bilinçaltına yerleşmiş olabilir. Bugün yaşadığın engellerin kaynağı bu deneyimlerden geliyor olabilir.',
    keywords: ['risk', 'başlangıç', 'sorumsuzluk', 'geçmiş', 'bilinçaltı'],
    context:
      'Geçmişte aceleci kararların ve plansız adımların bugünkü sorunlara temel olmuş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ps_pos3',
    card: 'The Magician',
    position: 3,
    upright:
      'Büyücü, bilinçaltında geçmişteki becerilerini doğru kullanamamak veya potansiyelini ortaya koymakta yaşadığın zorluklar yatıyor olabilir.',
    reversed:
      'Ters Büyücü, geçmişte manipülasyon, yanlış yönlendirilme ya da iradeni kaybetme bilinçaltına yerleşmiş olabilir.',
    keywords: ['potansiyel', 'beceri', 'güç', 'manipülasyon', 'bilinçaltı'],
    context:
      'Geçmişte gücünü doğru yönlendirememek bugünkü sorunların arka planında olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ps_pos3',
    card: 'The High Priestess',
    position: 3,
    upright:
      'Başrahibe, bilinçaltında geçmişte sezgilerini görmezden gelmek, saklı bilgileri dikkate almamak veya sırlarla çevrili olmak yatıyor olabilir.',
    reversed:
      'Ters Başrahibe, bilinçaltına geçmişte bastırılmış sezgiler, görmezden gelinen işaretler veya bilinçli inkarlar yerleşmiş olabilir.',
    keywords: ['sezgi', 'sırlar', 'bilgi', 'bastırma', 'bilinçaltı'],
    context:
      'Geçmişte sezgilerini reddetmek ve sırlarla yaşamak bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ps_pos3',
    card: 'The Empress',
    position: 3,
    upright:
      'İmparatoriçe, bilinçaltında geçmişte yaratıcılığını kısıtlanmış hissetmek, bağımlı ilişkiler yaşamak veya üretkenliğini engelleyen koşullar olabilir.',
    reversed:
      'Ters İmparatoriçe, aşırı koruma, bağımlılık veya ilham kaybı geçmişten bilinçaltına taşınmış olabilir.',
    keywords: ['yaratıcılık', 'bağımlılık', 'koruma', 'ilham', 'bilinçaltı'],
    context:
      'Geçmişte kısıtlanan yaratıcılık ve bağımlı bağlar bugünkü sorunlarına gölge düşürüyor olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ps_pos3',
    card: 'The Emperor',
    position: 3,
    upright:
      'İmparator, bilinçaltında geçmişte baskıcı otoriteler, katı kurallar veya kontrol altında hissetmek olabilir.',
    reversed:
      'Ters İmparator, geçmişte düzen kaybı, otoriteyle çatışma veya kuralsızlık deneyimleri bilinçaltına yerleşmiş olabilir.',
    keywords: ['otorite', 'kurallar', 'baskı', 'kontrol', 'bilinçaltı'],
    context:
      'Geçmişteki otorite çatışmaları ve kontrol sorunları bugünkü durumunu şekillendirmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ps_pos3',
    card: 'The Hierophant',
    position: 3,
    upright:
      'Aziz, bilinçaltında geçmişte toplumun beklentileri, geleneksel kurallar veya öğretiler seni etkilemiş olabilir.',
    reversed:
      'Ters Aziz, kuralları reddetmek, isyan veya rehberlikten yoksun kalmak geçmişte bilinçaltına yerleşmiş olabilir.',
    keywords: ['gelenek', 'otorite', 'rehberlik', 'isyankarlık', 'bilinçaltı'],
    context:
      'Geçmişte toplumsal normlara uyum sağlama ya da reddetme deneyimlerin bugünkü sorunlarına temel olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos3',
    card: 'The Lovers',
    position: 3,
    upright:
      'Aşıklar, bilinçaltında geçmişte değer çatışmaları, zor seçimler veya uyumsuz ilişkiler yaşamış olabilirsin.',
    reversed:
      'Ters Aşıklar, yanlış seçimler, kopukluklar veya kararsızlıklar bilinçaltına yerleşmiş olabilir.',
    keywords: ['seçim', 'değer', 'uyum', 'kararsızlık', 'bilinçaltı'],
    context:
      'Geçmişteki seçimlerin ve değer çatışmaları bugünkü sorunlarına yansıyor olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ps_pos3',
    card: 'The Chariot',
    position: 3,
    upright:
      'Savaş Arabası, bilinçaltında geçmişte yönsüzlük, kontrol eksikliği veya fazla hırs yatıyor olabilir.',
    reversed:
      'Ters Savaş Arabası, geçmişte dağınıklık, kontrol kaybı veya yolunu bulamamak bilinçaltına yerleşmiş olabilir.',
    keywords: ['kontrol', 'irade', 'hırs', 'yönsüzlük', 'bilinçaltı'],
    context:
      'Geçmişte yönünü bulamamak ve kontrol sorunları bugünkü problemlerine temel olmuş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ps_pos3',
    card: 'Strength',
    position: 3,
    upright:
      'Güç, bilinçaltında geçmişte yaşadığın korkularla yüzleşememek, öz güven sorunları veya sabırsızlık olabilir.',
    reversed:
      'Ters Güç, geçmişte cesaret kaybı, öfke patlamaları veya kontrolü kaybetmek bilinçaltına yerleşmiş olabilir.',
    keywords: ['cesaret', 'öz güven', 'korku', 'sabırsızlık', 'bilinçaltı'],
    context:
      'Geçmişteki korkular ve öz güven sorunları bugünkü durumunu gölgeliyor olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ps_pos3',
    card: 'The Hermit',
    position: 3,
    upright:
      'Ermiş, bilinçaltında geçmişte aşırı yalnızlık, içe kapanma veya doğru rehberi bulamamak olabilir.',
    reversed:
      'Ters Ermiş, izolasyon, rehbersizlik veya toplumdan uzaklaşmak geçmişten taşınmış olabilir.',
    keywords: ['yalnızlık', 'rehberlik', 'izolasyon', 'bilgelik', 'bilinçaltı'],
    context:
      'Geçmişteki yalnızlık ve rehbersizlik bugünkü sorunlarının temelinde olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ps_pos3',
    card: 'The Wheel of Fortune',
    position: 3,
    upright:
      'Kader Çarkı, bilinçaltında geçmişte şans faktörleri, kontrol dışı değişimler veya döngüsel tekrarlar etkili olmuş olabilir.',
    reversed:
      'Ters Kader Çarkı, talihsizlik, yanlış zamanlama veya tekrar eden olumsuz döngüler bilinçaltına işlenmiş olabilir.',
    keywords: ['kader', 'döngü', 'talihsizlik', 'zamanlama', 'bilinçaltı'],
    context:
      'Geçmişte şanssızlık ve döngüler bugünkü sorunlarına temel olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ps_pos3',
    card: 'Justice',
    position: 3,
    upright:
      'Adalet, bilinçaltında geçmişte haksızlıklar, yanlış kararlar veya dengesiz durumlar olabilir.',
    reversed:
      'Ters Adalet, dürüst olmamak, yanlış anlaşılmalar veya sorumluluktan kaçmak bilinçaltına yerleşmiş olabilir.',
    keywords: ['adalet', 'karar', 'denge', 'haksızlık', 'bilinçaltı'],
    context:
      'Geçmişte yaşanan adaletsizlikler bugünkü sorunlarını gölgeliyor olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ps_pos3',
    card: 'The Hanged Man',
    position: 3,
    upright:
      'Asılan Adam, bilinçaltında geçmişte teslimiyetten kaçmak, farklı bakış açılarını görmezden gelmek veya tıkanıklık yaşamak olabilir.',
    reversed:
      'Ters Asılan Adam, inatçılık, vazgeçememek veya direnmek bilinçaltına yerleşmiş olabilir.',
    keywords: ['bakış açısı', 'teslimiyet', 'inat', 'direnç', 'bilinçaltı'],
    context:
      'Geçmişte farklı bir bakış açısını kabul etmemek bugünkü sorunlara temel olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ps_pos3',
    card: 'Death',
    position: 3,
    upright:
      'Ölüm, bilinçaltında geçmişte bırakman gerekeni bırakmamak, değişime direnmek veya yenilenmekten kaçmak olabilir.',
    reversed:
      'Ters Ölüm, kapanmamış döngüler, bitmemiş işler veya dönüşüm korkusu bilinçaltına işlenmiş olabilir.',
    keywords: ['dönüşüm', 'bitiş', 'değişim', 'korku', 'bilinçaltı'],
    context:
      'Geçmişte değişime direnmek bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ps_pos3',
    card: 'Temperance',
    position: 3,
    upright:
      'Denge, bilinçaltında geçmişte uyumsuzluk, aşırılıklar veya sabır kaybı olabilir.',
    reversed:
      'Ters Denge, geçmişte ölçüsüz davranmak, sabırsızlık veya uyum sorunları bilinçaltına taşınmış olabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'aşırılık', 'bilinçaltı'],
    context: 'Geçmişte denge kaybı bugünkü problemlerine temel olmuş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ps_pos3',
    card: 'The Devil',
    position: 3,
    upright:
      'Şeytan, bilinçaltında geçmişte bağımlılıklar, kısıtlamalar veya korkular olabilir. Zincirlerinden kurtulamamak bugünkü sorunlarını tetikliyor olabilir.',
    reversed:
      'Ters Şeytan, geçmişte bağımlı kalmak, özgürleşememek veya kontrolü başkasına bırakmak bilinçaltına yerleşmiş olabilir.',
    keywords: ['bağımlılık', 'korku', 'kısıtlama', 'özgürlük', 'bilinçaltı'],
    context:
      'Geçmişteki bağımlılıklar ve kısıtlamalar bugünkü sorunlara gölge düşürüyor olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ps_pos3',
    card: 'The Tower',
    position: 3,
    upright:
      'Kule, bilinçaltında geçmişte ani değişimler, krizler veya yıkımlar olabilir. Bu travmalar bugünkü sorunlarına yön vermiş olabilir.',
    reversed:
      'Ters Kule, krizleri bastırmak, kaosla yüzleşmemek veya değişimi reddetmek bilinçaltına işlenmiş olabilir.',
    keywords: ['kriz', 'yıkım', 'değişim', 'travma', 'bilinçaltı'],
    context:
      'Geçmişteki krizler ve yıkımlar bugünkü problemlerini şekillendirmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ps_pos3',
    card: 'The Star',
    position: 3,
    upright:
      'Yıldız, bilinçaltında geçmişte umut kaybı, ilham eksikliği veya güvensizlik olabilir.',
    reversed:
      'Ters Yıldız, karamsarlık, rehberlik eksikliği veya kendine inanmamak bilinçaltına yerleşmiş olabilir.',
    keywords: ['umut', 'ilham', 'vizyon', 'karamsarlık', 'bilinçaltı'],
    context:
      'Geçmişte umutsuzluk ve güven kaybı bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos3',
    card: 'The Lovers',
    position: 3,
    upright:
      'Aşıklar, bilinçaltında geçmişte değer çatışmaları, zor seçimler veya uyumsuz ilişkiler yaşamış olabilirsin.',
    reversed:
      'Ters Aşıklar, bilinçaltında geçmişte yanlış seçimler, değer çatışmaları veya uyumsuz ilişkiler yaşamış olabilirsin.',
    keywords: [
      'değer çatışmaları',
      'zor seçimler',
      'uyumsuz ilişkiler',
      'bilinçaltı',
    ],
    context:
      'Geçmişteki değer çatışmaları ve zor seçimler bugünkü problemlerini şekillendirmiş olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ps_pos3',
    card: 'The Moon',
    position: 3,
    upright:
      'Ay, bilinçaltında geçmişte belirsizlikler, korkular veya yanılsamalar olabilir. Net olmayan durumlar bugünkü sorunlarına yön vermiş olabilir.',
    reversed:
      'Ters Ay, geçmişte yanlış anlamalar, aldatılmak veya sezgilerini görmezden gelmek bilinçaltına yerleşmiş olabilir.',
    keywords: ['belirsizlik', 'korku', 'yanılsama', 'aldanma', 'bilinçaltı'],
    context:
      'Geçmişteki korkular ve yanılsamalar bugünkü problemlerinin temelinde olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos3',
    card: 'The Sun',
    position: 3,
    upright:
      'Güneş, bilinçaltında geçmişte mutluluk, başarı veya özgüven eksikliği olabilir. Aydınlık zamanların kaybı seni bugünkü durumda etkiliyor olabilir.',
    reversed:
      'Ters Güneş, karamsarlık, engellenmiş başarı veya özgüven kaybı bilinçaltına yerleşmiş olabilir.',
    keywords: ['başarı', 'özgüven', 'umut', 'karamsarlık', 'bilinçaltı'],
    context:
      'Geçmişte kaybedilen güven ve başarı hissi bugünkü sorunlara yansıyor olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos3',
    card: 'Judgement',
    position: 3,
    upright:
      'Mahkeme, bilinçaltında geçmişte yüzleşilmeyen kararlar, ertelenmiş sorumluluklar veya geçmişin yükü olabilir.',
    reversed:
      'Ters Mahkeme, kendini kandırmak, geçmişi inkar etmek veya sorumluluklardan kaçmak bilinçaltına taşınmış olabilir.',
    keywords: ['karar', 'geçmiş', 'sorumluluk', 'yüzleşme', 'bilinçaltı'],
    context:
      'Geçmişte alınmayan kararlar ve sorumluluklar bugünkü sorunlarının temelinde olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos3',
    card: 'The World',
    position: 3,
    upright:
      'Dünya, bilinçaltında geçmişte tamamlanmamış döngüler, eksik kalan işler veya bütünlüğü yakalayamamak olabilir.',
    reversed:
      'Ters Dünya, geçmişte yarım kalmış hedefler, kapanmamış süreçler veya başarısızlık korkusu bilinçaltına yerleşmiş olabilir.',
    keywords: ['tamamlanma', 'döngü', 'eksiklik', 'hedef', 'bilinçaltı'],
    context:
      'Geçmişte kapanmamış döngüler ve eksik kalan süreçler bugünkü sorunlarına temel olabilir.',
    group: 'Majör Arkana',
  },

  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_ps_pos3',
    card: 'Ace of Cups',
    position: 3,
    upright:
      'Kupa Ası, bilinçaltında geçmişte yaşadığın yoğun bir duygusal başlangıç, saf sevgi ya da kalpten gelen bir ilham olabilir. Bu deneyim, bugünkü sorunlarını duygusal açıdan şekillendirmiş olabilir.',
    reversed:
      'Ters Kupa Ası, geçmişte yaşanan hayal kırıklıkları, sevgiyi reddetmek ya da duygusal kapanıklık bilinçaltında iz bırakmış olabilir.',
    keywords: ['duygu', 'başlangıç', 'ilham', 'hayal kırıklığı', 'bilinçaltı'],
    context:
      'Geçmişteki duygusal başlangıçlar veya hayal kırıklıkları bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ps_pos3',
    card: 'Two of Cups',
    position: 3,
    upright:
      'İki Kupa, bilinçaltında geçmişte kurulan güçlü bir bağ, ortaklık ya da ilişki olabilir. Bu bağ bugünkü sorunlarına yön veriyor olabilir.',
    reversed:
      'Ters İki Kupa, uyumsuz ilişkiler, yanlış ortaklıklar veya güven eksikliği bilinçaltına yerleşmiş olabilir.',
    keywords: ['ilişki', 'ortaklık', 'uyum', 'güven', 'bilinçaltı'],
    context:
      'Geçmiş ilişkiler ve ortaklıklar bugünkü sorunlarını etkileyen unsurlar olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ps_pos3',
    card: 'Three of Cups',
    position: 3,
    upright:
      'Üç Kupa, bilinçaltında geçmişte yaşadığın kutlamalar, sosyal bağlar ya da dostluklar olabilir. Bu ilişkiler sana hem destek hem de sınır koymuş olabilir.',
    reversed:
      'Ters Üç Kupa, dışlanma, yalnız kalma ya da sosyal çevreden gelen hayal kırıklıkları bilinçaltına yerleşmiş olabilir.',
    keywords: ['kutlama', 'sosyal bağ', 'destek', 'yalnızlık', 'bilinçaltı'],
    context:
      'Geçmiş sosyal bağlar ve dostluklar bugünkü sorunlarına zemin hazırlamış olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ps_pos3',
    card: 'Four of Cups',
    position: 3,
    upright:
      'Dört Kupa, bilinçaltında geçmişte yaşadığın tatminsizlik, ilgisizlik ya da fırsatları görmezden gelmek olabilir.',
    reversed:
      'Ters Dört Kupa, geçmişte kaçırılan fırsatlar, dikkatsizlik ya da duygusal kapanıklık bilinçaltına iz bırakmış olabilir.',
    keywords: ['tatminsizlik', 'fırsat', 'ilgisizlik', 'duygu', 'bilinçaltı'],
    context:
      'Geçmişteki ilgisizlik ve tatminsizlik bugünkü sorunlarını şekillendiriyor olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ps_pos3',
    card: 'Five of Cups',
    position: 3,
    upright:
      'Beş Kupa, bilinçaltında geçmişte yaşanan kayıplar, pişmanlıklar veya suçluluk duyguları olabilir. Bu durum bugünkü engellerini etkiliyor olabilir.',
    reversed:
      'Ters Beş Kupa, geçmişe takılı kalmak, ders çıkaramamak ya da sürekli kayıpları düşünmek bilinçaltında yerleşmiş olabilir.',
    keywords: ['kayıp', 'pişmanlık', 'geçmiş', 'suçluluk', 'bilinçaltı'],
    context:
      'Geçmişteki kayıplar ve pişmanlıklar bugünkü sorunlarını etkileyen köklü duygular olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ps_pos3',
    card: 'Six of Cups',
    position: 3,
    upright:
      'Altı Kupa, bilinçaltında geçmişte çocukluk etkileri, nostaljik bağlar veya ailevi durumlar olabilir.',
    reversed:
      'Ters Altı Kupa, geçmişten kopamamak, ileriye bakamamak ya da eski anılara sıkışmak bilinçaltına yerleşmiş olabilir.',
    keywords: ['geçmiş', 'çocukluk', 'bağ', 'nostalji', 'bilinçaltı'],
    context:
      'Geçmişteki çocukluk anıları ve eski bağlar bugünkü sorunlarına yön vermiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ps_pos3',
    card: 'Seven of Cups',
    position: 3,
    upright:
      'Yedi Kupa, bilinçaltında geçmişte kafa karışıklığı, hayaller ya da fazla seçenekler arasında kaybolmak olabilir.',
    reversed:
      'Ters Yedi Kupa, yanlış seçimler, yanılsamalar veya gerçeklerden kaçış bilinçaltına yerleşmiş olabilir.',
    keywords: ['hayal', 'seçenek', 'karışıklık', 'yanılsama', 'bilinçaltı'],
    context:
      'Geçmişteki kafa karışıklığı ve yanlış seçimler bugünkü sorunlarına temel olmuş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ps_pos3',
    card: 'Eight of Cups',
    position: 3,
    upright:
      'Sekiz Kupa, bilinçaltında geçmişte tatminsizlik nedeniyle uzaklaşmak, bir şeyleri geride bırakmak ya da vazgeçmek olabilir.',
    reversed:
      'Ters Sekiz Kupa, geçmişte kopamamak, bırakamamak ya da geri dönmek bilinçaltına işlenmiş olabilir.',
    keywords: [
      'tatminsizlik',
      'bırakmak',
      'geri dönüş',
      'bağlılık',
      'bilinçaltı',
    ],
    context:
      'Geçmişteki uzaklaşmalar veya bağımlılıklar bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ps_pos3',
    card: 'Nine of Cups',
    position: 3,
    upright:
      'Dokuz Kupa, bilinçaltında geçmişte elde ettiğin başarılar, tatminler veya kişisel mutluluklar olabilir. Bu deneyimler sana bugünkü bakış açını vermiş olabilir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel tatminler, aşırı beklentiler ya da doyumsuzluk bilinçaltına yerleşmiş olabilir.',
    keywords: ['tatmin', 'beklenti', 'başarı', 'doyumsuzluk', 'bilinçaltı'],
    context:
      'Geçmişteki başarılar ya da hayal kırıklıkları bugünkü sorunlarını şekillendiriyor olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ps_pos3',
    card: 'Ten of Cups',
    position: 3,
    upright:
      'On Kupa, bilinçaltında geçmişte yaşadığın huzurlu aile bağları, uyumlu ilişkiler veya hayaller olabilir.',
    reversed:
      'Ters On Kupa, kopukluk, ailevi huzursuzluklar veya uyumsuzluklar bilinçaltına iz bırakmış olabilir.',
    keywords: ['aile', 'uyum', 'huzur', 'ilişki', 'bilinçaltı'],
    context:
      'Geçmişteki ailevi dinamikler ve uyum sorunları bugünkü problemlerine temel olmuş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ps_pos3',
    card: 'Page of Cups',
    position: 3,
    upright:
      'Kupa Prensi, bilinçaltında geçmişte yaşadığın saf duygular, yaratıcılık veya hayal gücü deneyimleri olabilir.',
    reversed:
      'Ters Kupa Prensi, duygusal olgunluk eksikliği, dikkatsizlik ya da hayalcilik bilinçaltına yerleşmiş olabilir.',
    keywords: ['hayalcilik', 'yaratıcılık', 'duygu', 'olgunluk', 'bilinçaltı'],
    context:
      'Geçmişteki saf duygular ve hayal gücü bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ps_pos3',
    card: 'Knight of Cups',
    position: 3,
    upright:
      'Kupa Şövalyesi, bilinçaltında geçmişte hayallerin peşinden gitmek, romantik bir bakış açısı veya idealist duygular olabilir.',
    reversed:
      'Ters Kupa Şövalyesi, hayal kırıklıkları, gerçek dışı beklentiler veya duygusal karmaşalar bilinçaltına yerleşmiş olabilir.',
    keywords: ['idealizm', 'romantizm', 'hayal', 'gerçekçilik', 'bilinçaltı'],
    context:
      'Geçmişteki idealizm ve hayal kırıklıkları bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ps_pos3',
    card: 'Queen of Cups',
    position: 3,
    upright:
      'Kupa Kraliçesi, bilinçaltında geçmişteki empati, duygusal hassasiyet veya başkalarına odaklanmak olabilir.',
    reversed:
      'Ters Kupa Kraliçesi, aşırı hassasiyet, bağımlı ilişkiler veya duygusal dengesizlik bilinçaltına işlenmiş olabilir.',
    keywords: ['empati', 'hassasiyet', 'denge', 'duyarlılık', 'bilinçaltı'],
    context:
      'Geçmişteki aşırı empati veya bağımlılık bugünkü sorunlarının temelinde olabilir.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ps_pos3',
    card: 'King of Cups',
    position: 3,
    upright:
      'Kupa Kralı, bilinçaltında geçmişte olgun duygular, soğukkanlılık ya da başkalarını yönlendirme deneyimi olabilir.',
    reversed:
      'Ters Kupa Kralı, duygusal dengesizlik, bastırılmış öfke veya kontrol sorunları bilinçaltına yerleşmiş olabilir.',
    keywords: ['olgunluk', 'denge', 'liderlik', 'öfke', 'bilinçaltı'],
    context:
      'Geçmişteki duygusal deneyimler bugünkü sorunlarının zeminini oluşturuyor olabilir.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_ps_pos3',
    card: 'Ace of Swords',
    position: 3,
    upright:
      'Kılıç Ası, bilinçaltında geçmişte yaşadığın bir aydınlanma, netlik arayışı ya da gerçeği keşfetme deneyimi olabilir. Zihinsel berraklık çabaların bugün yaşadığın sorunlara yön vermiş olabilir.',
    reversed:
      'Ters Kılıç Ası, geçmişte yanlış kararlar, yanıltıcı sözler veya kafa karışıklığı bilinçaltına yerleşmiş olabilir.',
    keywords: ['netlik', 'gerçek', 'zihin', 'karar', 'bilinçaltı'],
    context:
      'Geçmişte zihinsel netlik arayışların veya kafa karışıklıkların bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ps_pos3',
    card: 'Two of Swords',
    position: 3,
    upright:
      'İki Kılıç, bilinçaltında geçmişte verdiğin zor bir karar, yaşadığın ikilemler veya gerçekleri görmezden gelme olabilir.',
    reversed:
      'Ters İki Kılıç, geçmişte sürekli karar ertelemek, inatçılık ya da gerçeği reddetmek bilinçaltına yerleşmiş olabilir.',
    keywords: ['karar', 'ikilem', 'görmezden gelmek', 'denge', 'bilinçaltı'],
    context:
      'Geçmişteki kararsızlık ve ikilemler bugünkü sorunlarına temel olmuş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ps_pos3',
    card: 'Three of Swords',
    position: 3,
    upright:
      'Üç Kılıç, bilinçaltında geçmişte yaşadığın kalp kırıklıkları, ihanetler ya da duygusal acılar olabilir.',
    reversed:
      'Ters Üç Kılıç, geçmişte yaşadığın acıları iyileştirememek, suçluluk veya pişmanlık bilinçaltında yer etmiş olabilir.',
    keywords: ['kalp kırıklığı', 'ihanet', 'acı', 'pişmanlık', 'bilinçaltı'],
    context:
      'Geçmişteki acı verici deneyimler bugünkü sorunlarını tetikliyor olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ps_pos3',
    card: 'Four of Swords',
    position: 3,
    upright:
      'Dört Kılıç, bilinçaltında geçmişte yaşadığın dinlenme ihtiyacı, inziva veya zorunlu bekleyişler olabilir.',
    reversed:
      'Ters Dört Kılıç, geçmişteki aşırı yorgunluk, tükenmişlik veya kaçış eğilimleri bilinçaltına yerleşmiş olabilir.',
    keywords: ['dinlenme', 'bekleyiş', 'tükenmişlik', 'kaçış', 'bilinçaltı'],
    context:
      'Geçmişte yaşanan duraksamalar ve kaçış eğilimleri bugünkü sorunlarının altında olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ps_pos3',
    card: 'Five of Swords',
    position: 3,
    upright:
      'Beş Kılıç, bilinçaltında geçmişte yaşadığın tartışmalar, kayıplar veya gurur savaşları olabilir.',
    reversed:
      'Ters Beş Kılıç, geçmişte gereksiz mücadeleler, kin tutma ya da yenilgiyi kabul edememek bilinçaltına işlenmiş olabilir.',
    keywords: ['tartışma', 'mücadele', 'gurur', 'kayıp', 'bilinçaltı'],
    context:
      'Geçmişteki çatışmalar ve gurur savaşları bugünkü sorunlarına yön veriyor olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ps_pos3',
    card: 'Six of Swords',
    position: 3,
    upright:
      'Altı Kılıç, bilinçaltında geçmişte bir geçiş süreci, taşınma ya da geçmişten uzaklaşma çabaları olabilir.',
    reversed:
      'Ters Altı Kılıç, geçmişteki ilerleyememek, geçmişe bağlı kalmak ya da sürekli geri dönmek bilinçaltına yerleşmiş olabilir.',
    keywords: ['geçiş', 'geçmiş', 'ilerleme', 'bağlılık', 'bilinçaltı'],
    context:
      'Geçmişteki geçiş süreçleri veya geçmişe bağlılık bugünkü sorunlarının temelinde olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ps_pos3',
    card: 'Seven of Swords',
    position: 3,
    upright:
      'Yedi Kılıç, bilinçaltında geçmişte gizlilik, saklanan gerçekler veya dürüst olmayan davranışlarla karşılaşmak olabilir.',
    reversed:
      'Ters Yedi Kılıç, geçmişte açığa çıkan sırlar, güven kaybı veya başarısız planlar bilinçaltına yerleşmiş olabilir.',
    keywords: ['gizlilik', 'hile', 'güven', 'sır', 'bilinçaltı'],
    context:
      'Geçmişte yaşanan gizlilikler ve güven sorunları bugünkü problemlerini etkiliyor olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ps_pos3',
    card: 'Eight of Swords',
    position: 3,
    upright:
      'Sekiz Kılıç, bilinçaltında geçmişte kendini çaresiz hissetmek, sınırlanmak veya baskı altında kalmak olabilir.',
    reversed:
      'Ters Sekiz Kılıç, geçmişteki korkular, zihinsel engeller ya da özgürlüğünü görememek bilinçaltına işlenmiş olabilir.',
    keywords: ['çaresizlik', 'sınırlama', 'korku', 'özgürlük', 'bilinçaltı'],
    context:
      'Geçmişte yaşanan sınırlamalar ve korkular bugünkü sorunlarının altında olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ps_pos3',
    card: 'Nine of Swords',
    position: 3,
    upright:
      'Dokuz Kılıç, bilinçaltında geçmişte yaşadığın yoğun kaygılar, uykusuz geceler ya da suçluluk duyguları olabilir.',
    reversed:
      'Ters Dokuz Kılıç, geçmişte korkularla yüzleşememek, bastırılmış suçluluk veya aşırı stres bilinçaltına yerleşmiş olabilir.',
    keywords: ['kaygı', 'stres', 'korku', 'suçluluk', 'bilinçaltı'],
    context:
      'Geçmişte yaşanan kaygı ve stres bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ps_pos3',
    card: 'Ten of Swords',
    position: 3,
    upright:
      'On Kılıç, bilinçaltında geçmişte yaşadığın bitişler, ihanetler veya yenilgiler olabilir.',
    reversed:
      'Ters On Kılıç, geçmişte yaşanan travmaları kapatamamak, kapanışı reddetmek ya da sürekli eski yaraları açmak bilinçaltına yerleşmiş olabilir.',
    keywords: ['bitiş', 'ihanet', 'travma', 'yenilgi', 'bilinçaltı'],
    context:
      'Geçmişteki bitişler ve ihanetler bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ps_pos3',
    card: 'Page of Swords',
    position: 3,
    upright:
      'Kılıç Prensi, bilinçaltında geçmişte öğrenme isteği, merak veya dikkatsiz davranışlar olabilir.',
    reversed:
      'Ters Kılıç Prensi, dedikodular, yanlış bilgi toplamak veya yüzeysel kalmak geçmişten bilinçaltına taşınmış olabilir.',
    keywords: ['öğrenme', 'merak', 'bilgi', 'dikkatsizlik', 'bilinçaltı'],
    context:
      'Geçmişteki öğrenme deneyimleri ve dikkatsizlik bugünkü sorunlarına yön veriyor olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ps_pos3',
    card: 'Knight of Swords',
    position: 3,
    upright:
      'Kılıç Şövalyesi, bilinçaltında geçmişte aceleci kararlar, sabırsızlık veya öfke patlamaları olabilir.',
    reversed:
      'Ters Kılıç Şövalyesi, geçmişte yönsüzlük, dikkatsizlik veya aşırı risk almak bilinçaltına yerleşmiş olabilir.',
    keywords: ['acelecilik', 'sabırsızlık', 'öfke', 'risk', 'bilinçaltı'],
    context:
      'Geçmişteki aceleci kararlar bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ps_pos3',
    card: 'Queen of Swords',
    position: 3,
    upright:
      'Kılıç Kraliçesi, bilinçaltında geçmişte mantığı öne çıkarmak, soğukluk veya duygulardan kopmak olabilir.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştiri, anlayış eksikliği veya katılık geçmişten bilinçaltına taşınmış olabilir.',
    keywords: ['mantık', 'soğukluk', 'eleştiri', 'katılık', 'bilinçaltı'],
    context:
      'Geçmişteki katı veya soğuk yaklaşımlar bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ps_pos3',
    card: 'King of Swords',
    position: 3,
    upright:
      'Kılıç Kralı, bilinçaltında geçmişte otorite baskısı, mantığın katılığı veya adalet arayışları olabilir.',
    reversed:
      'Ters Kılıç Kralı, geçmişteki adaletsizlikler, baskıcı figürler veya soğuk tavırlar bilinçaltına işlenmiş olabilir.',
    keywords: ['otorite', 'adalet', 'katılık', 'soğukluk', 'bilinçaltı'],
    context:
      'Geçmişte otorite baskısı ve adaletsizlik bugünkü sorunlarına temel olmuş olabilir.',
    group: 'Kılıçlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_ps_pos3',
    card: 'Ace of Wands',
    position: 3,
    upright:
      'Asa Ası, bilinçaltında geçmişte doğan güçlü bir ilham, yaratıcı bir kıvılcım ya da heyecanlı bir başlangıç olabilir. Bu motivasyon, bugün yaşadığın sorunlara yön veren bir iz bırakmış olabilir.',
    reversed:
      'Ters Asa Ası, geçmişte hevesin çabuk sönmesi, yarım kalmış projeler veya motivasyon kaybı bilinçaltına yerleşmiş olabilir.',
    keywords: ['ilham', 'başlangıç', 'yaratıcılık', 'heves', 'bilinçaltı'],
    context:
      'Geçmişteki ilham verici başlangıçlar veya motivasyon kaybı bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ps_pos3',
    card: 'Two of Wands',
    position: 3,
    upright:
      'İki Asa, bilinçaltında geçmişte gelecek planları yapma, vizyon geliştirme veya büyük kararlar alma deneyimleri olabilir.',
    reversed:
      'Ters İki Asa, geçmişte vizyon eksikliği, cesaretsizlik veya fırsatları küçümsemek bilinçaltına yerleşmiş olabilir.',
    keywords: ['vizyon', 'plan', 'gelecek', 'cesaret', 'bilinçaltı'],
    context:
      'Geçmişteki planlar ve vizyon eksiklikleri bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ps_pos3',
    card: 'Three of Wands',
    position: 3,
    upright:
      'Üç Asa, bilinçaltında geçmişte genişlemek, fırsatları keşfetmek veya uzak hedeflere bakmak olabilir.',
    reversed:
      'Ters Üç Asa, yanlış planlar, vizyonsuzluk veya fırsatları görememek geçmişte bilinçaltına taşınmış olabilir.',
    keywords: ['fırsat', 'vizyon', 'plan', 'genişleme', 'bilinçaltı'],
    context:
      'Geçmişteki fırsatlar veya vizyon eksiklikleri bugünkü sorunlarına temel olmuş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ps_pos3',
    card: 'Four of Wands',
    position: 3,
    upright:
      'Dört Asa, bilinçaltında geçmişte kutlamalar, ailevi bağlar veya sağlam bir temel oluşturma deneyimleri olabilir.',
    reversed:
      'Ters Dört Asa, geçmişte huzursuzluk, uyumsuzluk veya temelsizlik bilinçaltına yerleşmiş olabilir.',
    keywords: ['temel', 'kutlama', 'uyum', 'huzur', 'bilinçaltı'],
    context:
      'Geçmişteki ailevi temeller ve uyum sorunları bugünkü problemlerine temel olabilir.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ps_pos3',
    card: 'Five of Wands',
    position: 3,
    upright:
      'Beş Asa, bilinçaltında geçmişte rekabet, tartışmalar veya güç mücadeleleri olabilir.',
    reversed:
      'Ters Beş Asa, geçmişte uyumsuzluk, pasiflik veya gereksiz tartışmalar bilinçaltına işlenmiş olabilir.',
    keywords: ['rekabet', 'mücadele', 'çatışma', 'uyumsuzluk', 'bilinçaltı'],
    context:
      'Geçmişteki çatışmalar ve rekabet deneyimleri bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ps_pos3',
    card: 'Six of Wands',
    position: 3,
    upright:
      'Altı Asa, bilinçaltında geçmişte elde edilen başarılar, takdir görmek veya öne çıkmak olabilir.',
    reversed:
      'Ters Altı Asa, geçmişte kıskançlık, başarısızlık korkusu veya değer görmemek bilinçaltına yerleşmiş olabilir.',
    keywords: ['başarı', 'takdir', 'görünürlük', 'kıskançlık', 'bilinçaltı'],
    context:
      'Geçmişteki başarılar veya takdir eksikliği bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ps_pos3',
    card: 'Seven of Wands',
    position: 3,
    upright:
      'Yedi Asa, bilinçaltında geçmişte kendini savunmak, direnmek veya rekabette ayakta kalmaya çalışmak olabilir.',
    reversed:
      'Ters Yedi Asa, geçmişte pes etmek, güvensizlik veya mücadeleyi bırakmak bilinçaltına işlenmiş olabilir.',
    keywords: ['savunma', 'direnç', 'güvensizlik', 'mücadele', 'bilinçaltı'],
    context:
      'Geçmişteki savunmalar ve güvensizlikler bugünkü sorunlarına temel olmuş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ps_pos3',
    card: 'Eight of Wands',
    position: 3,
    upright:
      'Sekiz Asa, bilinçaltında geçmişte hızlı gelişmeler, iletişim trafiği veya ani değişimler olabilir.',
    reversed:
      'Ters Sekiz Asa, geçmişte yaşanan yanlış anlaşılmalar, tıkanıklıklar veya gecikmeler bilinçaltına yerleşmiş olabilir.',
    keywords: ['iletişim', 'hız', 'değişim', 'gecikme', 'bilinçaltı'],
    context:
      'Geçmişteki iletişim sorunları ve ani değişimler bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ps_pos3',
    card: 'Nine of Wands',
    position: 3,
    upright:
      'Dokuz Asa, bilinçaltında geçmişte direnmek, pes etmemek veya yaralı halde devam etmek olabilir.',
    reversed:
      'Ters Dokuz Asa, geçmişte yılgınlık, aşırı baskı veya savunmasızlık bilinçaltına yerleşmiş olabilir.',
    keywords: ['direnç', 'yorgunluk', 'savunma', 'baskı', 'bilinçaltı'],
    context:
      'Geçmişteki yorgunluklar ve savunma durumları bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ps_pos3',
    card: 'Ten of Wands',
    position: 3,
    upright:
      'On Asa, bilinçaltında geçmişte aşırı sorumluluk almak, yük taşımak veya baskılar altında kalmak olabilir.',
    reversed:
      'Ters On Asa, geçmişte gereksiz sorumluluklar, paylaşmamak veya tükenmişlik bilinçaltına yerleşmiş olabilir.',
    keywords: ['yük', 'sorumluluk', 'tükenmişlik', 'baskı', 'bilinçaltı'],
    context:
      'Geçmişteki aşırı sorumluluklar bugünkü sorunlarının temelinde olabilir.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ps_pos3',
    card: 'Page of Wands',
    position: 3,
    upright:
      'Asa Prensi, bilinçaltında geçmişte yaşadığın öğrenme hevesi, yeni girişimler veya macera arzusu olabilir.',
    reversed:
      'Ters Asa Prensi, geçmişte sabırsızlık, dikkatsizlik veya hevesin çabuk sönmesi bilinçaltına yerleşmiş olabilir.',
    keywords: ['öğrenme', 'heves', 'macera', 'sabırsızlık', 'bilinçaltı'],
    context:
      'Geçmişteki öğrenme deneyimleri ve hevesler bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ps_pos3',
    card: 'Knight of Wands',
    position: 3,
    upright:
      'Asa Şövalyesi, bilinçaltında geçmişte cesur adımlar, aceleci davranışlar veya riskler olabilir.',
    reversed:
      'Ters Asa Şövalyesi, geçmişte dikkatsizlik, tutarsızlık veya yönsüzlük bilinçaltına yerleşmiş olabilir.',
    keywords: ['cesaret', 'risk', 'tutarsızlık', 'hareket', 'bilinçaltı'],
    context:
      'Geçmişteki riskler ve aceleci hareketler bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ps_pos3',
    card: 'Queen of Wands',
    position: 3,
    upright:
      'Asa Kraliçesi, bilinçaltında geçmişte özgüvenli olmak, liderlik üstlenmek veya karizma sergilemek deneyimleri olabilir.',
    reversed:
      'Ters Asa Kraliçesi, geçmişte özgüven kaybı, kıskançlık veya başkalarının gölgesinde kalmak bilinçaltına işlenmiş olabilir.',
    keywords: ['özgüven', 'liderlik', 'karizma', 'kıskançlık', 'bilinçaltı'],
    context:
      'Geçmişteki özgüven deneyimleri veya kıskançlıklar bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ps_pos3',
    card: 'King of Wands',
    position: 3,
    upright:
      'Asa Kralı, bilinçaltında geçmişte vizyon sahibi olmak, liderlik etmek veya yön belirlemek olabilir.',
    reversed:
      'Ters Asa Kralı, geçmişte vizyon eksikliği, baskıcılık veya yönsüzlük bilinçaltına yerleşmiş olabilir.',
    keywords: ['vizyon', 'liderlik', 'yön', 'baskı', 'bilinçaltı'],
    context:
      'Geçmişteki vizyon ve liderlik deneyimleri bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Asalar',
  },

  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_ps_pos3',
    card: 'Ace of Pentacles',
    position: 3,
    upright:
      'Tılsım Ası, bilinçaltında geçmişte yaşadığın yeni bir fırsat, maddi bir başlangıç veya sağlam bir temel arayışı olabilir. Bu deneyimler bugünkü sorunlarına yön veriyor olabilir.',
    reversed:
      'Ters Tılsım Ası, geçmişte kaçırılan fırsatlar, yanlış yatırımlar veya istikrarsızlık bilinçaltına işlenmiş olabilir.',
    keywords: ['fırsat', 'başlangıç', 'maddi güven', 'yatırım', 'bilinçaltı'],
    context:
      'Geçmişteki fırsatlar veya maddi temeller bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ps_pos3',
    card: 'Two of Pentacles',
    position: 3,
    upright:
      'İki Tılsım, bilinçaltında geçmişte denge arayışı, çoklu sorumluluklar veya uyum sağlama çabaları olabilir.',
    reversed:
      'Ters İki Tılsım, geçmişte kontrolsüzlük, sürekli kararsızlık veya kaynakları kötü yönetmek bilinçaltına yerleşmiş olabilir.',
    keywords: ['denge', 'sorumluluk', 'kontrol', 'karar', 'bilinçaltı'],
    context:
      'Geçmişte denge kurma çabaları veya dengesizlik bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ps_pos3',
    card: 'Three of Pentacles',
    position: 3,
    upright:
      'Üç Tılsım, bilinçaltında geçmişte işbirliği, ortak çalışmalar veya ustalaşma çabaları olabilir.',
    reversed:
      'Ters Üç Tılsım, uyumsuzluk, ekip sorunları veya destek görememek bilinçaltına işlenmiş olabilir.',
    keywords: ['işbirliği', 'ekip', 'ustalık', 'uyum', 'bilinçaltı'],
    context:
      'Geçmişteki işbirliği veya uyumsuzluk deneyimleri bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ps_pos3',
    card: 'Four of Pentacles',
    position: 3,
    upright:
      'Dört Tılsım, bilinçaltında geçmişte güvence arayışı, sahip olduklarını koruma çabası veya paylaşmaktan kaçınmak olabilir.',
    reversed:
      'Ters Dört Tılsım, geçmişte cimrilik, kaybetme korkusu veya aşırı kontrol bilinçaltına yerleşmiş olabilir.',
    keywords: ['güvence', 'kontrol', 'korku', 'paylaşım', 'bilinçaltı'],
    context:
      'Geçmişteki güvence arayışları veya korkular bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ps_pos3',
    card: 'Five of Pentacles',
    position: 3,
    upright:
      'Beş Tılsım, bilinçaltında geçmişte maddi sıkıntılar, yalnızlık ya da desteğin eksikliği olabilir.',
    reversed:
      'Ters Beş Tılsım, geçmişte yardımı reddetmek, dışlanmak veya güvensizlik bilinçaltına işlenmiş olabilir.',
    keywords: ['maddi sıkıntı', 'yalnızlık', 'destek', 'güven', 'bilinçaltı'],
    context:
      'Geçmişte yaşanan sıkıntılar ve yalnızlık bugünkü sorunlarının temelinde olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ps_pos3',
    card: 'Six of Pentacles',
    position: 3,
    upright:
      'Altı Tılsım, bilinçaltında geçmişte paylaşım, yardım almak veya adalet arayışı olabilir.',
    reversed:
      'Ters Altı Tılsım, bağımlı ilişkiler, sömürü veya dengesizlik geçmişten bilinçaltına taşınmış olabilir.',
    keywords: ['paylaşım', 'yardım', 'adalet', 'denge', 'bilinçaltı'],
    context:
      'Geçmişteki yardım veya adaletsizlik deneyimleri bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ps_pos3',
    card: 'Seven of Pentacles',
    position: 3,
    upright:
      'Yedi Tılsım, bilinçaltında geçmişte sabırla beklemek, emek vermek ya da uzun vadeli yatırımlar yapmak olabilir.',
    reversed:
      'Ters Yedi Tılsım, geçmişte sabırsızlık, verimsiz emek veya yanlış yatırımlar bilinçaltına yerleşmiş olabilir.',
    keywords: ['sabır', 'emek', 'yatırım', 'bekleyiş', 'bilinçaltı'],
    context:
      'Geçmişteki sabır ya da sabırsızlık deneyimleri bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ps_pos3',
    card: 'Eight of Pentacles',
    position: 3,
    upright:
      'Sekiz Tılsım, bilinçaltında geçmişte çalışma disiplini, ustalaşma süreci veya öğrenme çabaları olabilir.',
    reversed:
      'Ters Sekiz Tılsım, geçmişte motivasyon kaybı, yarım işler veya özensizlik bilinçaltına yerleşmiş olabilir.',
    keywords: ['çalışma', 'ustalık', 'öğrenme', 'motivasyon', 'bilinçaltı'],
    context:
      'Geçmişteki öğrenme ve emek süreçleri bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ps_pos3',
    card: 'Nine of Pentacles',
    position: 3,
    upright:
      'Dokuz Tılsım, bilinçaltında geçmişte bağımsızlık, özgüven veya kendi ayaklarının üzerinde durma deneyimleri olabilir.',
    reversed:
      'Ters Dokuz Tılsım, geçmişte bağımlılık, yalnızlık korkusu veya tatminsizlik bilinçaltına yerleşmiş olabilir.',
    keywords: ['bağımsızlık', 'özgüven', 'yalnızlık', 'tatmin', 'bilinçaltı'],
    context:
      'Geçmişteki bağımsızlık ya da bağımlılık deneyimleri bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ps_pos3',
    card: 'Ten of Pentacles',
    position: 3,
    upright:
      'On Tılsım, bilinçaltında geçmişte ailevi değerler, miras veya uzun vadeli güvence arayışları olabilir.',
    reversed:
      'Ters On Tılsım, geçmişte aile içi çatışmalar, maddi sorunlar veya kalıcı başarıyı kuramamak bilinçaltına işlenmiş olabilir.',
    keywords: ['aile', 'miras', 'istikrar', 'maddi güven', 'bilinçaltı'],
    context:
      'Geçmişteki ailevi dinamikler ve güvence arayışları bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ps_pos3',
    card: 'Page of Pentacles',
    position: 3,
    upright:
      'Tılsım Prensi, bilinçaltında geçmişte öğrenme isteği, plan yapmak veya yeni projelere adım atmak olabilir.',
    reversed:
      'Ters Tılsım Prensi, geçmişte dikkatsizlik, motivasyon eksikliği veya yanlış hedefler bilinçaltına yerleşmiş olabilir.',
    keywords: ['öğrenme', 'plan', 'motivasyon', 'hedef', 'bilinçaltı'],
    context:
      'Geçmişteki öğrenme veya planlama deneyimleri bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ps_pos3',
    card: 'Knight of Pentacles',
    position: 3,
    upright:
      'Tılsım Şövalyesi, bilinçaltında geçmişte disiplin, sabırlı çalışma veya sorumluluk alma olabilir.',
    reversed:
      'Ters Tılsım Şövalyesi, geçmişte tembellik, durağanlık veya dikkatsizlik bilinçaltına yerleşmiş olabilir.',
    keywords: ['disiplin', 'sorumluluk', 'sabır', 'durağanlık', 'bilinçaltı'],
    context:
      'Geçmişteki disiplin veya tembellik deneyimleri bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ps_pos3',
    card: 'Queen of Pentacles',
    position: 3,
    upright:
      'Tılsım Kraliçesi, bilinçaltında geçmişte öz bakım, üretkenlik veya ailevi sorumluluk deneyimleri olabilir.',
    reversed:
      'Ters Tılsım Kraliçesi, geçmişte savurganlık, ilgisizlik veya kaynakları kötü yönetmek bilinçaltına işlenmiş olabilir.',
    keywords: ['öz bakım', 'sorumluluk', 'kaynak', 'üretkenlik', 'bilinçaltı'],
    context:
      'Geçmişteki öz bakım veya kaynak yönetimi deneyimleri bugünkü sorunlarını şekillendirmiş olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ps_pos3',
    card: 'King of Pentacles',
    position: 3,
    upright:
      'Tılsım Kralı, bilinçaltında geçmişte başarı, maddi güvence veya liderlik deneyimleri olabilir.',
    reversed:
      'Ters Tılsım Kralı, geçmişte hırs, baskıcılık veya doyumsuzluk bilinçaltına yerleşmiş olabilir.',
    keywords: ['başarı', 'liderlik', 'maddi güven', 'hırs', 'bilinçaltı'],
    context:
      'Geçmişteki başarılar veya doyumsuzluklar bugünkü sorunlarını etkiliyor olabilir.',
    group: 'Tılsımlar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition3Meaning(
  card: TarotCard
): ProblemSolvingPosition3Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position3Meanings.find(
    m =>
      m.card === card.name ||
      m.card === card.nameTr ||
      card.name === m.card ||
      card.nameTr === m.card
  );

  if (meaning) {
    return meaning;
  }

  // Ana mapping sistemini kullan
  const cardNameMapping = getCardNameMappingSync();

  // Türkçe ismi İngilizce'ye çevir
  const englishName = cardNameMapping[card.nameTr] || card.nameTr;

  // İngilizce isimle tekrar ara
  meaning = position3Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition3MeaningByCardName(
  cardName: string
): ProblemSolvingPosition3Meaning | null {
  return position3Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllProblemSolvingPosition3Meanings(): ProblemSolvingPosition3Meaning[] {
  return position3Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getProblemSolvingPosition3MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): ProblemSolvingPosition3Meaning[] {
  return position3Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition3Meanings = (): I18nProblemSolvingPosition3Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position3Meanings.map(meaning => {
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
export const getI18nPosition3Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nProblemSolvingPosition3Meaning | null => {
  const originalMeaning = position3Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `problem-solving.meanings.${cardKey}.position3.upright`
  );
  const i18nReversed = t(
    `problem-solving.meanings.${cardKey}.position3.reversed`
  );
  const i18nKeywords = t(
    `problem-solving.meanings.${cardKey}.position3.keywords`
  );
  const i18nContext = t(
    `problem-solving.meanings.${cardKey}.position3.context`
  );
  const i18nGroup = t(
    `problem-solving.cardGroups.${originalMeaning.group.toLowerCase().replace(/\s+/g, '')}`
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
const problemSolvingPosition3Exports = {
  position3Meanings,
  getProblemSolvingPosition3Meaning,
  getProblemSolvingPosition3MeaningByCardName,
  getAllProblemSolvingPosition3Meanings,
  getProblemSolvingPosition3MeaningsByGroup,
  getI18nPosition3Meaning,
};

export default problemSolvingPosition3Exports;
