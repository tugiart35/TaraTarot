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

export interface ProblemSolvingPosition9Meaning {
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
export interface I18nProblemSolvingPosition9Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position9Meanings: ProblemSolvingPosition9Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ps_pos9',
    card: 'The Fool',
    position: 9,
    upright:
      'Joker, korkuların arasında bilinmeyene adım atma, risk alma ya da hata yapma endişesi olabilir.',
    reversed:
      'Ters Joker, kontrolsüzlük, dikkatsizlik ya da yanlış yönlendirilme korkusu seni geri tutuyor olabilir.',
    keywords: ['risk', 'bilinmezlik', 'başlangıç', 'özgürlük', 'endişe'],
    context:
      'Korkuların, yeni başlangıçlara cesaret edip etmeme üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ps_pos9',
    card: 'The Magician',
    position: 9,
    upright:
      'Büyücü, potansiyelini tam kullanamama, kaynaklarını boşa harcama ya da manipülasyona uğrama korkusu yaşayabilirsin.',
    reversed:
      'Ters Büyücü, kandırılma, yanlış yönlendirilme ya da becerilerinin yetersiz kalacağı endişesi taşıyor olabilirsin.',
    keywords: ['potansiyel', 'kaynak', 'manipülasyon', 'başarı', 'korku'],
    context:
      'Korkuların, gücünü doğru kullanamamak ya da suistimale uğramakla ilgili.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ps_pos9',
    card: 'The High Priestess',
    position: 9,
    upright:
      'Başrahibe, bilinmeyen sırların açığa çıkması ya da sezgilerine güvenememe korkusu barındırıyor olabilirsin.',
    reversed:
      'Ters Başrahibe, yanlış sezgiler, sırların ifşa olması ya da gerçeklerden uzaklaşma korkusu seni endişelendirebilir.',
    keywords: ['sır', 'bilgi', 'sezgi', 'gizlilik', 'endişe'],
    context:
      'Korkuların, gizlenmiş bilgiler ya da yanlış sezgiler üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ps_pos9',
    card: 'The Empress',
    position: 9,
    upright:
      'İmparatoriçe, üretken olamama, bolluk kaybı ya da destek görememe endişesi taşıyor olabilirsin.',
    reversed:
      'Ters İmparatoriçe, bağımlı hale gelme, üretkenliğini kaybetme ya da duygusal yetersizlik korkusu seni etkileyebilir.',
    keywords: ['bolluk', 'üretkenlik', 'destek', 'bereket', 'kaygı'],
    context:
      'Korkuların, bereketi kaybetmek ya da bağımlı olmakla ilgili.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ps_pos9',
    card: 'The Emperor',
    position: 9,
    upright:
      'İmparator, kontrol kaybı, otorite karşısında güçsüz kalma ya da düzenin bozulması korkusu taşıyabilirsin.',
    reversed:
      'Ters İmparator, baskı altında ezilme, gücün suistimali ya da otoriteyle çatışma endişesi yaşayabilirsin.',
    keywords: ['otorite', 'düzen', 'kontrol', 'güç', 'endişe'],
    context:
      'Korkuların, otorite figürleri ya da kontrol kaybıyla bağlantılı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ps_pos9',
    card: 'The Hierophant',
    position: 9,
    upright:
      'Aziz, yanlış rehberlik almak, geleneklere uymamak ya da kabul görmeme korkusu taşıyabilirsin.',
    reversed:
      'Ters Aziz, sahte otoriteler, yanlış öğretiler ya da özgürlüğünü kaybetme endişesi seni etkileyebilir.',
    keywords: ['öğreti', 'otorite', 'rehberlik', 'gelenek', 'kaygı'],
    context:
      'Korkuların, yanlış yönlendirilme ya da kabul görmemekle ilgili.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos9',
    card: 'The Lovers',
    position: 9,
    upright:
      'Aşıklar, yanlış seçim yapma, uyumsuz bir ilişkiye girme ya da bağlanmaktan korkma endişesi taşıyor olabilirsin.',
    reversed:
      'Ters Aşıklar, ayrılık, uyumsuzluk ya da yanlış karar verme korkusu seni etkileyebilir.',
    keywords: ['ilişki', 'seçim', 'uyum', 'bağ', 'endişe'],
    context:
      'Korkuların, yanlış seçim ya da uyumsuz ilişkilerle bağlantılı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ps_pos9',
    card: 'The Chariot',
    position: 9,
    upright:
      'Savaş Arabası, kontrolü kaybetme, yönünü bulamama ya da ilerleyememe korkusu taşıyabilirsin.',
    reversed:
      'Ters Savaş Arabası, başarısızlık, motivasyon kaybı ya da yönsüzlük endişesi yaratabilir.',
    keywords: ['kontrol', 'ilerleme', 'yön', 'başarı', 'endişe'],
    context:
      'Korkuların, kontrolü kaybetmek ya da ilerleyememekle ilgili.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ps_pos9',
    card: 'Strength',
    position: 9,
    upright:
      'Güç, sabırsızlık, zayıflık göstermek ya da duygularını kontrol edememek korkusu yaşayabilirsin.',
    reversed:
      'Ters Güç, güvensizlik, öfke patlamaları ya da sabırsızlık endişesi seni etkileyebilir.',
    keywords: ['cesaret', 'sabır', 'denge', 'özgüven', 'kaygı'],
    context:
      'Korkuların, gücünü kaybetmek ya da sabrını yitirmekle bağlantılı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ps_pos9',
    card: 'The Hermit',
    position: 9,
    upright:
      'Ermiş, yalnız kalma, rehbersiz kalma ya da içsel yolculukta kaybolma korkusu yaşayabilirsin.',
    reversed:
      'Ters Ermiş, izolasyon, aşırı yalnızlık ya da yanlış rehberlik korkusu seni etkileyebilir.',
    keywords: ['yalnızlık', 'bilgelik', 'rehberlik', 'arayış', 'endişe'],
    context:
      'Korkuların, yalnızlık ya da yanlış yönlendirmeler üzerine odaklanıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ps_pos9',
    card: 'Wheel of Fortune',
    position: 9,
    upright:
      'Kader Çarkı, şanssızlık, kontrol dışı olaylar ya da talihin tersine dönmesi korkusu taşıyabilirsin.',
    reversed:
      'Ters Kader Çarkı, döngülerde sıkışıp kalma, tekrar eden talihsizlikler ya da kötü zamanlama endişesi yaratabilir.',
    keywords: ['kader', 'şans', 'değişim', 'döngü', 'kaygı'],
    context:
      'Korkuların, şansın ters dönmesi ya da döngülerden çıkamamakla ilgili.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ps_pos9',
    card: 'Justice',
    position: 9,
    upright:
      'Adalet, haksızlık, yanlış yargılanma ya da dengenin bozulması korkusu yaşayabilirsin.',
    reversed:
      'Ters Adalet, adaletsizlik, suistimal ya da sorumluluktan kaçma korkusu seni etkileyebilir.',
    keywords: ['adalet', 'denge', 'karar', 'gerçek', 'kaygı'],
    context:
      'Korkuların, adil değerlendirilmemek ya da haksızlığa uğramakla bağlantılı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ps_pos9',
    card: 'The Hanged Man',
    position: 9,
    upright:
      'Asılan Adam, kontrolü bırakma, belirsizlikte kalma ya da fedakarlık yapma korkusu taşıyor olabilirsin.',
    reversed:
      'Ters Asılan Adam, hareketsizlik, isteksizlik ya da yanlış fedakarlık korkusu yaratabilir.',
    keywords: ['fedakarlık', 'bekleme', 'teslimiyet', 'belirsizlik', 'endişe'],
    context:
      'Korkuların, beklemek ya da teslim olmak üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ps_pos9',
    card: 'Death',
    position: 9,
    upright:
      'Ölüm, büyük değişimler, bitişler ya da dönüşüm korkusu yaşayabilirsin.',
    reversed:
      'Ters Ölüm, bırakmamak, kapanmayan döngüler ya da değişime direnme korkusu seni etkileyebilir.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'değişim', 'korku'],
    context:
      'Korkuların, dönüşüm ya da değişime direnmek üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ps_pos9',
    card: 'Temperance',
    position: 9,
    upright:
      'Denge, uyumu yakalayamama, aşırılıklara kapılma ya da sabırsızlık korkusu yaşayabilirsin.',
    reversed:
      'Ters Denge, dengesizlik, uyumsuzluk ya da aşırılıklardan zarar görme korkusu yaratabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'aşırılık', 'kaygı'],
    context:
      'Korkuların, dengeyi kaybetmek ya da aşırılıklara kapılmakla ilgili.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ps_pos9',
    card: 'The Devil',
    position: 9,
    upright:
      'Şeytan, bağımlılık, esaret ya da kontrol kaybı korkusu yaşayabilirsin.',
    reversed:
      'Ters Şeytan, özgürleşememek, kısıtlı kalmak ya da bağlarını koparamama endişesi yaratabilir.',
    keywords: ['bağımlılık', 'esaret', 'korku', 'kısıtlama', 'özgürlük'],
    context:
      'Korkuların, bağımlı kalmak ya da özgürleşememek üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ps_pos9',
    card: 'The Tower',
    position: 9,
    upright:
      'Kule, ani değişimler, krizler ya da yıkıcı olaylar korkusu yaşayabilirsin.',
    reversed:
      'Ters Kule, sarsıcı olayları görmezden gelme, değişimden kaçma ya da beklenmedik krizlerden korkma eğilimi olabilir.',
    keywords: ['kriz', 'değişim', 'yıkım', 'şok', 'endişe'],
    context:
      'Korkuların, krizler ya da ani değişimler üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ps_pos9',
    card: 'The Star',
    position: 9,
    upright:
      'Yıldız, umutlarını kaybetme, geleceğe dair güven duymama ya da ilhamını yitirme korkusu yaşayabilirsin.',
    reversed:
      'Ters Yıldız, umutsuzluk, inanç kaybı ya da karamsarlık endişesi seni etkileyebilir.',
    keywords: ['umut', 'ilham', 'güven', 'gelecek', 'kaygı'],
    context:
      'Korkuların, umut kaybı ya da karamsarlık üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ps_pos9',
    card: 'The Moon',
    position: 9,
    upright:
      'Ay, belirsizlik, aldanma ya da korkularla yüzleşme endişesi barındırıyor olabilirsin.',
    reversed:
      'Ters Ay, sırların açığa çıkması, yanlış algılar ya da içsel korkuların büyümesi endişesi yaratabilir.',
    keywords: ['belirsizlik', 'korku', 'yanılsama', 'sezgi', 'kaygı'],
    context:
      'Korkuların, belirsizlik ve yanılsamalar üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos9',
    card: 'The Sun',
    position: 9,
    upright:
      'Güneş, mutluluğu kaybetme, başarısızlık ya da görünürlükten korkma endişesi yaratabilir.',
    reversed:
      'Ters Güneş, özgüven eksikliği, gölgede kalma ya da başarılarının küçümsenmesi korkusu olabilir.',
    keywords: ['mutluluk', 'başarı', 'özgüven', 'aydınlanma', 'endişe'],
    context:
      'Korkuların, başarı kaybı ya da görünür olmamak üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos9',
    card: 'Judgement',
    position: 9,
    upright:
      'Mahkeme, geçmişle yüzleşme, yargılanma ya da yanlış karar verme korkusu yaşayabilirsin.',
    reversed:
      'Ters Mahkeme, sorumluluklardan kaçma, fırsatları kaçırma ya da affedilmeme endişesi yaratabilir.',
    keywords: ['yargı', 'geçmiş', 'karar', 'hesaplaşma', 'endişe'],
    context:
      'Korkuların, yargılanmak ya da fırsatları kaçırmak üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos9',
    card: 'The World',
    position: 9,
    upright:
      'Dünya, tamamlanma, başarıya ulaşamama ya da döngüleri kapatamama korkusu yaşayabilirsin.',
    reversed:
      'Ters Dünya, yarım kalmış işler, başarısızlık ya da bütünlüğü kaybetme endişesi yaratabilir.',
    keywords: ['tamamlanma', 'başarı', 'döngü', 'kapanış', 'kaygı'],
    context:
      'Korkuların, başarıya ulaşamamak ya da eksik kalmak üzerine yoğunlaşıyor.',
    group: 'Majör Arkana',
  },
  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_ps_pos9',
    card: 'Ace of Cups',
    position: 9,
    upright:
      'Kupa Ası, duygusal olarak açılmaktan, sevilmemekten ya da yeni bir bağ kurarken kırılmaktan korkuyor olabilirsin.',
    reversed:
      'Ters Kupa Ası, duygularını bastırma, reddedilme ya da hayal kırıklığı yaşama endişesini gösteriyor.',
    keywords: ['açılma', 'duygu', 'kırılganlık', 'sevgi', 'endişe'],
    context:
      'Korkuların, duygularını açmak ve karşılık görmemek üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ps_pos9',
    card: 'Two of Cups',
    position: 9,
    upright:
      'İki Kupa, uyumsuz bir ilişkiye girme, bağlanmaktan korkma ya da karşılıklı sevgiyi kaybetme endişesini gösterebilir.',
    reversed:
      'Ters İki Kupa, ayrılık, anlaşmazlık ya da dengesiz bir ilişki korkusu taşıyor olabilirsin.',
    keywords: ['ilişki', 'uyum', 'ayrılık', 'bağ', 'endişe'],
    context:
      'Korkuların, uyumlu ilişki kuramamak ya da bağını kaybetmek üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ps_pos9',
    card: 'Three of Cups',
    position: 9,
    upright:
      'Üç Kupa, dışlanma, yanlış dostluklara güvenme ya da kutlamaların dışında kalma endişesi gösterebilir.',
    reversed:
      'Ters Üç Kupa, dedikodu, sahte dostluklar ya da sosyal kopukluk korkusu yaşayabilirsin.',
    keywords: ['dostluk', 'kutlama', 'sahte bağ', 'sosyal çevre', 'endişe'],
    context:
      'Korkuların, dostluklarda aldatılma ya da dışlanma üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ps_pos9',
    card: 'Four of Cups',
    position: 9,
    upright:
      'Dört Kupa, fırsatları kaçırmaktan, ilgisizlikten ya da hayata karşı tatminsizlikten korkuyor olabilirsin.',
    reversed:
      'Ters Dört Kupa, ilgisiz kalma, fırsatları değerlendirememe ya da kayıtsız görünme endişesi gösterebilir.',
    keywords: ['tatminsizlik', 'fırsat', 'ilgisizlik', 'kaçırmak', 'endişe'],
    context:
      'Korkuların, fırsatları görmemek ya da kaçırmak üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ps_pos9',
    card: 'Five of Cups',
    position: 9,
    upright:
      'Beş Kupa, kayıp, pişmanlık ve duygusal hayal kırıklığı yaşamaktan korkuyor olabilirsin.',
    reversed:
      'Ters Beş Kupa, geçmişte yaşanan üzüntüleri aşamama ya da sürekli kayıplara odaklanma endişesini gösteriyor.',
    keywords: ['kayıp', 'pişmanlık', 'üzüntü', 'hayal kırıklığı', 'endişe'],
    context:
      'Korkuların, kayıp yaşamaktan ya da geçmişi geride bırakamamaktan kaynaklanıyor.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ps_pos9',
    card: 'Six of Cups',
    position: 9,
    upright:
      'Altı Kupa, geçmişe takılı kalma, eski bağlardan kopamama ya da nostaljide kaybolma korkusu gösterebilir.',
    reversed:
      'Ters Altı Kupa, geçmişten gelen sorunların tekrar etmesi ya da ilerleyememe endişesi yaşatabilir.',
    keywords: ['geçmiş', 'nostalji', 'bağ', 'çocukluk', 'endişe'],
    context:
      'Korkuların, geçmişten kopamamak ya da aynı hataları tekrarlamak üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ps_pos9',
    card: 'Seven of Cups',
    position: 9,
    upright:
      'Yedi Kupa, yanlış seçim yapmaktan, hayallere kapılmaktan ya da gerçeklikten uzaklaşmaktan korkabilirsin.',
    reversed:
      'Ters Yedi Kupa, hayal kırıklığı, netlik kaybı ya da yanıltıcı seçenekler korkusu gösterebilir.',
    keywords: ['seçenek', 'yanılsama', 'hayal', 'karar', 'endişe'],
    context:
      'Korkuların, yanlış seçimler ya da yanıltıcı hayaller üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ps_pos9',
    card: 'Eight of Cups',
    position: 9,
    upright:
      'Sekiz Kupa, bırakmaktan, yoluna devam edememekten ya da tatmin etmeyen şeylerden uzaklaşamamaktan korkabilirsin.',
    reversed:
      'Ters Sekiz Kupa, geri dönme, kararsızlık ya da ilerleyememe endişesini gösteriyor.',
    keywords: ['bırakış', 'kaçış', 'tatminsizlik', 'karar', 'endişe'],
    context:
      'Korkuların, ilerleyememek ya da bırakmamak üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ps_pos9',
    card: 'Nine of Cups',
    position: 9,
    upright:
      'Dokuz Kupa, tatminsizlik, beklentilerin karşılanmaması ya da mutluluğun elinden alınması korkusu gösterebilir.',
    reversed:
      'Ters Dokuz Kupa, yüzeysel mutluluk, doyumsuzluk ya da içsel boşluk endişesi yaşatabilir.',
    keywords: ['mutluluk', 'tatmin', 'beklenti', 'doyumsuzluk', 'endişe'],
    context:
      'Korkuların, tatminsizlik ya da mutluluğu kaybetmek üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ps_pos9',
    card: 'Ten of Cups',
    position: 9,
    upright:
      'On Kupa, aile bağlarını kaybetmek, huzursuzluk yaşamak ya da uyumu kaybetmek korkusu gösterebilir.',
    reversed:
      'Ters On Kupa, ailevi sorunlar, uyumsuzluk ya da kalıcı mutluluğun sarsılması endişesi yaratabilir.',
    keywords: ['aile', 'mutluluk', 'uyum', 'huzur', 'endişe'],
    context:
      'Korkuların, ailevi huzursuzluk ya da uyumu kaybetmek üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ps_pos9',
    card: 'Page of Cups',
    position: 9,
    upright:
      'Kupa Prensi, reddedilmekten, duygusal olarak ciddiye alınmamaktan ya da hayallerinin küçümsenmesinden korkabilirsin.',
    reversed:
      'Ters Kupa Prensi, yüzeysel romantizm, aldatıcı teklif ya da hayal kırıklığı korkusu gösterebilir.',
    keywords: ['romantizm', 'reddedilme', 'ilham', 'duygusallık', 'endişe'],
    context:
      'Korkuların, duygusal ciddiyetin sorgulanması üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ps_pos9',
    card: 'Knight of Cups',
    position: 9,
    upright:
      'Kupa Şövalyesi, boş vaatlere kanma, romantik hayal kırıklığı ya da aşırı duygusallık korkusu gösterebilir.',
    reversed:
      'Ters Kupa Şövalyesi, tutarsızlık, duygusal oyunlar ya da yanıltıcı teklifler korkusu yaratabilir.',
    keywords: ['romantizm', 'tutarsızlık', 'teklif', 'duygu', 'endişe'],
    context:
      'Korkuların, romantik vaatler ya da duygusal oyunlar üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ps_pos9',
    card: 'Queen of Cups',
    position: 9,
    upright:
      'Kupa Kraliçesi, duygusal olarak incinmekten, fazla hassas görülmekten ya da başkalarına bağımlı olmaktan korkabilirsin.',
    reversed:
      'Ters Kupa Kraliçesi, duygusal istismar, aşırı hassasiyet ya da bağımlılık korkusu gösterebilir.',
    keywords: ['şefkat', 'hassasiyet', 'incinme', 'bağımlılık', 'endişe'],
    context:
      'Korkuların, aşırı hassasiyet ya da bağımlılıkla ilgili.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ps_pos9',
    card: 'King of Cups',
    position: 9,
    upright:
      'Kupa Kralı, duygularını kontrol edememekten, destek görememekten ya da manipülasyona uğramaktan korkuyor olabilirsin.',
    reversed:
      'Ters Kupa Kralı, duygusal dengesizlik, istismar ya da baskı altında kalma endişesi gösterebilir.',
    keywords: ['olgunluk', 'kontrol', 'manipülasyon', 'denge', 'endişe'],
    context:
      'Korkuların, duygusal kontrolü kaybetmek ya da manipülasyona uğramak üzerine yoğunlaşıyor.',
    group: 'Kupalar',
  },
  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_ps_pos9',
    card: 'Ace of Swords',
    position: 9,
    upright:
      'Kılıç Ası, yanlış karar vermekten, gerçeği görememekten ya da netlik kaybı yaşamaktan korkuyor olabilirsin.',
    reversed:
      'Ters Kılıç Ası, kafa karışıklığı, yanlış anlaşılma veya iletişim sorunları korkusunu gösteriyor.',
    keywords: ['netlik', 'karar', 'iletişim', 'gerçek', 'endişe'],
    context:
      'Korkuların, doğru kararı verememek ya da yanlış bilgiye kapılmak üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ps_pos9',
    card: 'Two of Swords',
    position: 9,
    upright:
      'İki Kılıç, karar verememekten, ikilemler arasında sıkışmaktan ya da yanlış tarafı seçmekten korkabilirsin.',
    reversed:
      'Ters İki Kılıç, kararları ertelemek, kör noktaları fark edememek veya yanlış seçimler korkusunu yansıtıyor.',
    keywords: ['karar', 'ikilem', 'denge', 'seçim', 'endişe'],
    context:
      'Korkuların, seçim yapamamak ya da yanlış seçim üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ps_pos9',
    card: 'Three of Swords',
    position: 9,
    upright:
      'Üç Kılıç, kalp kırıklığı, ihanet ya da duygusal acı yaşama korkusu gösterebilir.',
    reversed:
      'Ters Üç Kılıç, eski yaraların yeniden açılması, affedememek ya da kırgınlıkların büyümesi endişesini gösteriyor.',
    keywords: ['ihanet', 'acı', 'ayrılık', 'kırılma', 'endişe'],
    context:
      'Korkuların, kalp kırıklıkları ya da ihanetler üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ps_pos9',
    card: 'Four of Swords',
    position: 9,
    upright:
      'Dört Kılıç, dinlenememekten, iyileşememekten ya da toparlanma fırsatı bulamamaktan korkabilirsin.',
    reversed:
      'Ters Dört Kılıç, tükenmişlik, zorunlu dinlenme ya da hastalık korkusu gösterebilir.',
    keywords: ['dinlenme', 'toparlanma', 'huzur', 'iyileşme', 'endişe'],
    context:
      'Korkuların, dinlenememek ya da tükenmişlikle ilgili.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ps_pos9',
    card: 'Five of Swords',
    position: 9,
    upright:
      'Beş Kılıç, kaybetmekten, haksızlığa uğramaktan ya da gurur mücadelesi vermekten korkabilirsin.',
    reversed:
      'Ters Beş Kılıç, tartışmaları çözememek, uzlaşamamak ya da kin tutma endişesi gösterebilir.',
    keywords: ['çatışma', 'gurur', 'kayıp', 'uzlaşmazlık', 'endişe'],
    context:
      'Korkuların, kayıplar ya da çözümsüz çatışmalar üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ps_pos9',
    card: 'Six of Swords',
    position: 9,
    upright:
      'Altı Kılıç, geçmişten uzaklaşamamaktan, geçişi tamamlayamamaktan ya da yeni bir yol bulamamaktan korkabilirsin.',
    reversed:
      'Ters Altı Kılıç, geri dönmek, ilerleyememek ya da sıkışıp kalmak endişesini gösterebilir.',
    keywords: ['geçiş', 'ilerleme', 'geçmiş', 'kaçış', 'endişe'],
    context:
      'Korkuların, ilerleyememek ya da geçmişte sıkışıp kalmak üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ps_pos9',
    card: 'Seven of Swords',
    position: 9,
    upright:
      'Yedi Kılıç, kandırılmaktan, arkadan iş çevrilmesinden ya da güven kaybı yaşamaktan korkabilirsin.',
    reversed:
      'Ters Yedi Kılıç, yakalanma, sırrın açığa çıkması ya da planların bozulması endişesi gösterebilir.',
    keywords: ['hile', 'gizlilik', 'aldatma', 'plan', 'endişe'],
    context:
      'Korkuların, aldatılmak ya da sırrın açığa çıkması üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ps_pos9',
    card: 'Eight of Swords',
    position: 9,
    upright:
      'Sekiz Kılıç, özgür kalamamaktan, çevresel baskılardan kurtulamamaktan ya da engellere sıkışmaktan korkabilirsin.',
    reversed:
      'Ters Sekiz Kılıç, bağımlı kalmak, çözüm bulamamak ya da özgürlüğü elde edememek endişesi gösterebilir.',
    keywords: ['özgürlük', 'engeller', 'sınırlama', 'kaçış', 'endişe'],
    context:
      'Korkuların, sıkışıp kalmak ya da bağımlı olmak üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ps_pos9',
    card: 'Nine of Swords',
    position: 9,
    upright:
      'Dokuz Kılıç, uykusuzluk, yoğun kaygı ve stres yaşama korkusu gösterebilir.',
    reversed:
      'Ters Dokuz Kılıç, kabuslar, endişelerin büyümesi ya da akıl sağlığını kaybetme korkusu gösterebilir.',
    keywords: ['kaygı', 'stres', 'kabus', 'uykusuzluk', 'endişe'],
    context:
      'Korkuların, zihinsel baskı ve kaygılar üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ps_pos9',
    card: 'Ten of Swords',
    position: 9,
    upright:
      'On Kılıç, ihanet, bitiş ya da ağır kayıplar yaşamaktan korkabilirsin.',
    reversed:
      'Ters On Kılıç, toparlanamamak, yeniden başlayamamak ya da kapanmayan yaralar endişesini gösterebilir.',
    keywords: ['ihanet', 'bitiş', 'acı', 'yeniden doğuş', 'endişe'],
    context:
      'Korkuların, ihanetler ya da geri dönüşsüz bitişler üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ps_pos9',
    card: 'Page of Swords',
    position: 9,
    upright:
      'Kılıç Prensi, yanlış anlaşılmaktan, sözlerinin çarpıtılmasından ya da merakının küçümsenmesinden korkabilirsin.',
    reversed:
      'Ters Kılıç Prensi, dedikoduya maruz kalma, yanlış bilgi yayma ya da dikkatsizlik korkusu gösterebilir.',
    keywords: ['iletişim', 'yanlış anlama', 'bilgi', 'dedikodu', 'endişe'],
    context:
      'Korkuların, sözlerinin çarpıtılması ya da yanlış bilgi üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ps_pos9',
    card: 'Knight of Swords',
    position: 9,
    upright:
      'Kılıç Şövalyesi, aceleyle hata yapmaktan, fevri davranmaktan ya da plansızlıktan korkabilirsin.',
    reversed:
      'Ters Kılıç Şövalyesi, kontrolsüz öfke, yönsüz hareket ya da başarısızlık korkusunu gösterebilir.',
    keywords: ['acele', 'plansızlık', 'öfke', 'hız', 'endişe'],
    context:
      'Korkuların, aceleci davranmak ya da hata yapmak üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ps_pos9',
    card: 'Queen of Swords',
    position: 9,
    upright:
      'Kılıç Kraliçesi, duygusal olarak soğuk görünmekten, yalnız kalmaktan ya da yanlış anlaşılmaktan korkabilirsin.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştiri, anlayışsızlık ya da sertlik korkusu gösterebilir.',
    keywords: ['soğukluk', 'eleştiri', 'yalnızlık', 'bağımsızlık', 'endişe'],
    context:
      'Korkuların, soğukluk ya da yanlış anlaşılma üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ps_pos9',
    card: 'King of Swords',
    position: 9,
    upright:
      'Kılıç Kralı, yanlış hüküm vermekten, mantığını yitirmekten ya da adaletsizlikten korkabilirsin.',
    reversed:
      'Ters Kılıç Kralı, baskı altında kalma, otorite tarafından ezilme ya da yanlış yönlendirilme korkusu gösterebilir.',
    keywords: ['adalet', 'mantık', 'otorite', 'yanlış hüküm', 'endişe'],
    context:
      'Korkuların, adaletsizlik ya da otorite baskısı üzerine yoğunlaşıyor.',
    group: 'Kılıçlar',
  },
  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_ps_pos9',
    card: 'Ace of Pentacles',
    position: 9,
    upright:
      'Tılsım Ası, fırsatları kaçırmaktan, maddi güvenceyi sağlayamamaktan ya da sağlam temeller kuramamaktan korkabilirsin.',
    reversed:
      'Ters Tılsım Ası, yanlış yatırım, güvensizlik ya da başlangıçların başarısız olma endişesini gösterebilir.',
    keywords: ['fırsat', 'güvence', 'başlangıç', 'yatırım', 'endişe'],
    context:
      'Korkuların, maddi fırsatları değerlendirememek ya da istikrarı kuramamak üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ps_pos9',
    card: 'Two of Pentacles',
    position: 9,
    upright:
      'İki Tılsım, sorumluluklarını dengeleyememekten, çok fazla yük almaktan ya da uyumsuzluk yaşamaktan korkabilirsin.',
    reversed:
      'Ters İki Tılsım, dengesizlik, kararsızlık ya da öncelikleri yönetememe endişesini gösterebilir.',
    keywords: ['denge', 'sorumluluk', 'öncelik', 'karar', 'endişe'],
    context:
      'Korkuların, dengesizlik ya da sorumlulukları kaldıramamak üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ps_pos9',
    card: 'Three of Pentacles',
    position: 9,
    upright:
      'Üç Tılsım, işbirliği yapamamaktan, yeterince takdir edilmemekten ya da yeteneklerini gösterememekten korkabilirsin.',
    reversed:
      'Ters Üç Tılsım, ekip uyumsuzluğu, destek görememe ya da başarısız ortaklık korkusunu gösterebilir.',
    keywords: ['işbirliği', 'takdir', 'ekip', 'başarı', 'endişe'],
    context:
      'Korkuların, işbirliği eksikliği ya da yetersizlik üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ps_pos9',
    card: 'Four of Pentacles',
    position: 9,
    upright:
      'Dört Tılsım, kaybetmekten, sahip olduklarını koruyamamaktan ya da güvenlik alanını kaybetmekten korkabilirsin.',
    reversed:
      'Ters Dört Tılsım, cimrilik, kontrolü kaybetmek ya da bağımlı hale gelmek endişesini gösterebilir.',
    keywords: ['güvenlik', 'kaybetme', 'kontrol', 'koruma', 'endişe'],
    context:
      'Korkuların, güvenlik kaybı ya da kontrolü yitirmek üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ps_pos9',
    card: 'Five of Pentacles',
    position: 9,
    upright:
      'Beş Tılsım, yalnız kalmaktan, maddi zorluklardan ya da dışlanmaktan korkabilirsin.',
    reversed:
      'Ters Beş Tılsım, destek bulamamak, toparlanamamak ya da daha da zorlanmak korkusu gösterebilir.',
    keywords: ['yalnızlık', 'zorluk', 'destek', 'kayıp', 'endişe'],
    context:
      'Korkuların, dışlanmak ya da destek bulamamak üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ps_pos9',
    card: 'Six of Pentacles',
    position: 9,
    upright:
      'Altı Tılsım, haksızlık, eşitsizlik ya da adil olmayan bir paylaşım korkusu gösterebilir.',
    reversed:
      'Ters Altı Tılsım, bağımlılık, dengesiz ilişkiler ya da yardım alamama endişesini gösterebilir.',
    keywords: ['denge', 'eşitlik', 'yardım', 'adalet', 'endişe'],
    context:
      'Korkuların, adaletsiz ilişkiler ya da dengesizlik üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ps_pos9',
    card: 'Seven of Pentacles',
    position: 9,
    upright:
      'Yedi Tılsım, emeklerinin karşılığını alamamaktan, sabrını kaybetmekten ya da sonuçların gecikmesinden korkabilirsin.',
    reversed:
      'Ters Yedi Tılsım, yanlış yatırımlar, sabırsızlık ya da boşa harcanan emek korkusu gösterebilir.',
    keywords: ['emek', 'sabır', 'yatırım', 'gecikme', 'endişe'],
    context:
      'Korkuların, emeğin karşılığını alamamak ya da sabırsızlık üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ps_pos9',
    card: 'Eight of Pentacles',
    position: 9,
    upright:
      'Sekiz Tılsım, yetersiz olmak, hatalar yapmak ya da ustalaşamamak korkusu gösterebilir.',
    reversed:
      'Ters Sekiz Tılsım, dikkatsizlik, motivasyon kaybı ya da başarısızlık korkusu gösterebilir.',
    keywords: ['çalışma', 'hata', 'ustalık', 'yetersizlik', 'endişe'],
    context:
      'Korkuların, başarısızlık ya da ustalaşamamak üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ps_pos9',
    card: 'Nine of Pentacles',
    position: 9,
    upright:
      'Dokuz Tılsım, bağımsızlığını kaybetmekten, özgürlüğünü sınırlamaktan ya da yalnız kalmaktan korkabilirsin.',
    reversed:
      'Ters Dokuz Tılsım, bağımlı hale gelmek, özgüven kaybı ya da bolluğun bozulması endişesi gösterebilir.',
    keywords: ['bağımsızlık', 'özgüven', 'bolluk', 'yalnızlık', 'endişe'],
    context:
      'Korkuların, bağımsızlığını kaybetmek ya da yalnız kalmak üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ps_pos9',
    card: 'Ten of Pentacles',
    position: 9,
    upright:
      'On Tılsım, ailevi desteği kaybetmekten, miras sorunlarından ya da uzun vadeli istikrarsızlıktan korkabilirsin.',
    reversed:
      'Ters On Tılsım, ailevi huzursuzluk, kayıplar ya da köklü desteklerin yıkılması korkusunu gösterebilir.',
    keywords: ['aile', 'istikrar', 'miras', 'kayıp', 'endişe'],
    context:
      'Korkuların, ailevi destek kaybı ya da istikrarsızlık üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ps_pos9',
    card: 'Page of Pentacles',
    position: 9,
    upright:
      'Tılsım Prensi, fırsatları değerlendirememekten, öğrenme şansını kaçırmaktan ya da plansız kalmaktan korkabilirsin.',
    reversed:
      'Ters Tılsım Prensi, motivasyon kaybı, dikkat dağınıklığı ya da başarısızlık korkusunu gösterebilir.',
    keywords: ['öğrenme', 'fırsat', 'başlangıç', 'plan', 'endişe'],
    context:
      'Korkuların, öğrenme şansını kaçırmak ya da başarısızlık üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ps_pos9',
    card: 'Knight of Pentacles',
    position: 9,
    upright:
      'Tılsım Şövalyesi, ilerleyememekten, durağan kalmaktan ya da çabanın boşa gitmesinden korkabilirsin.',
    reversed:
      'Ters Tılsım Şövalyesi, tembellik, isteksizlik ya da görevleri tamamlayamama korkusu gösterebilir.',
    keywords: ['çaba', 'istikrar', 'sorumluluk', 'durağanlık', 'endişe'],
    context:
      'Korkuların, ilerleyememek ya da görevleri tamamlayamamak üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ps_pos9',
    card: 'Queen of Pentacles',
    position: 9,
    upright:
      'Tılsım Kraliçesi, destek görememekten, maddi güvensizlikten ya da bakım sorumluluklarını yerine getirememekten korkabilirsin.',
    reversed:
      'Ters Tılsım Kraliçesi, öz bakım eksikliği, bağımlılık ya da savurganlık korkusunu gösterebilir.',
    keywords: ['güvenlik', 'destek', 'öz bakım', 'sorumluluk', 'endişe'],
    context:
      'Korkuların, güven kaybı ya da bağımlılık üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ps_pos9',
    card: 'King of Pentacles',
    position: 9,
    upright:
      'Tılsım Kralı, başarısızlık, otoriteyi kaybetme ya da maddi güvenliği sağlayamama korkusu gösterebilir.',
    reversed:
      'Ters Tılsım Kralı, baskıcı figürler, hırs ya da kontrol kaybı endişesi yaşatabilir.',
    keywords: ['başarı', 'otorite', 'bolluk', 'kontrol', 'endişe'],
    context:
      'Korkuların, başarısızlık ya da otorite kaybı üzerine yoğunlaşıyor.',
    group: 'Tılsımlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_ps_pos9',
    card: 'Ace of Wands',
    position: 9,
    upright:
      'Değnek Ası, ilham kaybetmekten, yeni başlangıçlara cesaret edememekten ya da fırsatları kaçırmaktan korkabilirsin.',
    reversed:
      'Ters Değnek Ası, motivasyon kaybı, projelerin ertelenmesi ya da potansiyelini kullanamama korkusunu gösterebilir.',
    keywords: ['ilham', 'başlangıç', 'motivasyon', 'fırsat', 'endişe'],
    context:
      'Korkuların, yaratıcılığını ortaya koyamamak ya da fırsatları kaçırmak üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ps_pos9',
    card: 'Two of Wands',
    position: 9,
    upright:
      'İki Değnek, yanlış plan yapmaktan, geleceği görememekten ya da risk almaktan korkabilirsin.',
    reversed:
      'Ters İki Değnek, vizyonsuzluk, kararsızlık ya da fırsatların kaçırılması korkusunu gösterebilir.',
    keywords: ['vizyon', 'plan', 'risk', 'seçenek', 'endişe'],
    context:
      'Korkuların, yanlış yön seçmek ya da vizyonunu kaybetmek üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ps_pos9',
    card: 'Three of Wands',
    position: 9,
    upright:
      'Üç Değnek, uzak fırsatları görememekten, ilerleyememekten ya da işbirliklerinde başarısız olmaktan korkabilirsin.',
    reversed:
      'Ters Üç Değnek, gecikmeler, başarısız girişimler ya da hayal kırıklığı korkusunu gösterebilir.',
    keywords: ['ilerleme', 'fırsat', 'vizyon', 'bekleyiş', 'endişe'],
    context:
      'Korkuların, gecikmeler ya da vizyon kaybı üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ps_pos9',
    card: 'Four of Wands',
    position: 9,
    upright:
      'Dört Değnek, aidiyet hissini kaybetmekten, kutlamaların dışında kalmaktan ya da istikrarsızlıktan korkabilirsin.',
    reversed:
      'Ters Dört Değnek, uyumsuzluk, ailevi sorunlar ya da taşınma/yerleşim endişesi gösterebilir.',
    keywords: ['aidiyet', 'kutlama', 'uyum', 'temel', 'endişe'],
    context:
      'Korkuların, aidiyet kaybı ya da uyumsuzluk üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ps_pos9',
    card: 'Five of Wands',
    position: 9,
    upright:
      'Beş Değnek, rekabeti kaybetmekten, tartışmalardan ya da mücadelede yetersiz kalmaktan korkabilirsin.',
    reversed:
      'Ters Beş Değnek, gereksiz çatışmalar, uyumsuzluk ya da sürekli sürtüşme korkusunu gösterebilir.',
    keywords: ['rekabet', 'çatışma', 'mücadele', 'uyumsuzluk', 'endişe'],
    context:
      'Korkuların, rekabet ya da tartışmalar üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ps_pos9',
    card: 'Six of Wands',
    position: 9,
    upright:
      'Altı Değnek, başarısızlık, görünür olmamak ya da takdir edilmemek korkusu gösterebilir.',
    reversed:
      'Ters Altı Değnek, gurur kaybı, kıskanılmak ya da emeğinin küçümsenmesi endişesi yaşatabilir.',
    keywords: ['başarı', 'takdir', 'görünürlük', 'gurur', 'endişe'],
    context:
      'Korkuların, takdir görmemek ya da başarısızlık üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ps_pos9',
    card: 'Seven of Wands',
    position: 9,
    upright:
      'Yedi Değnek, kendini savunamamaktan, baskıya boyun eğmekten ya da konumunu kaybetmekten korkabilirsin.',
    reversed:
      'Ters Yedi Değnek, pes etmek, direnememek ya da geri çekilmek korkusu gösterebilir.',
    keywords: ['savunma', 'baskı', 'direnç', 'pes etmek', 'endişe'],
    context:
      'Korkuların, direncini kaybetmek ya da baskıya boyun eğmek üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ps_pos9',
    card: 'Eight of Wands',
    position: 9,
    upright:
      'Sekiz Değnek, gecikmekten, mesajların yanlış gitmesinden ya da gelişmeleri kontrol edememekten korkabilirsin.',
    reversed:
      'Ters Sekiz Değnek, iletişim aksaklıkları, yanlış anlaşılma ya da fırsatların gecikmesi endişesi gösterebilir.',
    keywords: ['hız', 'iletişim', 'gecikme', 'fırsat', 'endişe'],
    context:
      'Korkuların, iletişim aksaklıkları ya da gecikmeler üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ps_pos9',
    card: 'Nine of Wands',
    position: 9,
    upright:
      'Dokuz Değnek, dayanıklılığını kaybetmekten, tekrar eden sınavlara yenik düşmekten ya da gardını düşürmekten korkabilirsin.',
    reversed:
      'Ters Dokuz Değnek, tükenmişlik, şüphe ya da pes etme korkusu gösterebilir.',
    keywords: ['dayanıklılık', 'tekrar sınav', 'pes etmek', 'şüphe', 'endişe'],
    context:
      'Korkuların, tükenmişlik ya da savunmasız kalmak üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ps_pos9',
    card: 'Ten of Wands',
    position: 9,
    upright:
      'On Değnek, aşırı sorumluluk almaktan, yükün altında ezilmekten ya da bitiremeyeceğin işlere girmekten korkabilirsin.',
    reversed:
      'Ters On Değnek, yardım alamamak, yükü paylaşamamak ya da tükenmişlik korkusunu gösterebilir.',
    keywords: ['yük', 'sorumluluk', 'bitirme', 'tükenmişlik', 'endişe'],
    context:
      'Korkuların, aşırı yüklenmek ya da sorumlulukların altında ezilmek üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ps_pos9',
    card: 'Page of Wands',
    position: 9,
    upright:
      'Değnek Prensi, yanlış yollara sapmaktan, dikkatsizlikten ya da boş heveslere kapılmaktan korkabilirsin.',
    reversed:
      'Ters Değnek Prensi, motivasyon kaybı, hedefsizlik ya da dağınıklık korkusunu gösterebilir.',
    keywords: ['keşif', 'hedef', 'ilham', 'deneme', 'endişe'],
    context:
      'Korkuların, yanlış yönlere sapmak ya da hedefini kaybetmek üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ps_pos9',
    card: 'Knight of Wands',
    position: 9,
    upright:
      'Değnek Şövalyesi, acelecilikten, düşünmeden harekete geçmekten ya da riskleri göz ardı etmekten korkabilirsin.',
    reversed:
      'Ters Değnek Şövalyesi, dengesizlik, savrukluk ya da yönsüz davranma korkusunu gösterebilir.',
    keywords: ['acele', 'risk', 'hareket', 'denge', 'endişe'],
    context:
      'Korkuların, acelecilik ya da yönsüzlük üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ps_pos9',
    card: 'Queen of Wands',
    position: 9,
    upright:
      'Değnek Kraliçesi, özgüvenini kaybetmekten, gücünü küçümsemekten ya da çekiciliğini yitirmekten korkabilirsin.',
    reversed:
      'Ters Değnek Kraliçesi, kıskançlık, güvensizlik ya da dengesizlik korkusunu gösterebilir.',
    keywords: ['özgüven', 'çekicilik', 'karizma', 'güvensizlik', 'endişe'],
    context:
      'Korkuların, öz güven kaybı ya da dengesizlik üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ps_pos9',
    card: 'King of Wands',
    position: 9,
    upright:
      'Değnek Kralı, liderlik yapamamaktan, vizyonunu kaybetmekten ya da otoriteye karşı yetersiz kalmaktan korkabilirsin.',
    reversed:
      'Ters Değnek Kralı, baskıcı figürlerden korkma, yanlış yönlendirilme ya da vizyonsuzluk endişesi gösterebilir.',
    keywords: ['liderlik', 'vizyon', 'otorite', 'baskı', 'endişe'],
    context:
      'Korkuların, liderlikte başarısız olmak ya da yönünü kaybetmek üzerine yoğunlaşıyor.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition9Meaning(
  card: TarotCard
): ProblemSolvingPosition9Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position9Meanings.find(m => 
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
  meaning = position9Meanings.find(m => m.card === englishName);
  
  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition9MeaningByCardName(
  cardName: string
): ProblemSolvingPosition9Meaning | null {
  return position9Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllProblemSolvingPosition9Meanings(): ProblemSolvingPosition9Meaning[] {
  return position9Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getProblemSolvingPosition9MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): ProblemSolvingPosition9Meaning[] {
  return position9Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition9Meanings = (): I18nProblemSolvingPosition9Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position9Meanings.map(meaning => {
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
      export const getI18nPosition9Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nProblemSolvingPosition9Meaning | null => {
  const originalMeaning = position9Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `problem-solving.meanings.${cardKey}.position9.upright`
  );
  const i18nReversed = t(
    `problem-solving.meanings.${cardKey}.position9.reversed`
  );
  const i18nKeywords = t(
    `problem-solving.meanings.${cardKey}.position9.keywords`
  );
  const i18nContext = t(
    `problem-solving.meanings.${cardKey}.position9.context`
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
const problemSolvingPosition9Exports = {
  position9Meanings,
  getProblemSolvingPosition9Meaning,
  getProblemSolvingPosition9MeaningByCardName,
  getAllProblemSolvingPosition9Meanings,
  getProblemSolvingPosition9MeaningsByGroup,
  getI18nPosition9Meaning,
};

export default problemSolvingPosition9Exports;
