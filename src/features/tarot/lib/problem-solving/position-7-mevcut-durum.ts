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
'use client';

import { TarotCard } from '@/types/tarot';
import { getCardNameMappingSync } from '@/features/tarot/lib/love/card-name-mapping';

export interface ProblemSolvingPosition7Meaning {
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
export interface I18nProblemSolvingPosition7Meaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: string;
}

export const position7Meanings: ProblemSolvingPosition7Meaning[] = [
  // --- Majör Arkana Kartları ---
  {
    id: 'the_fool_ps_pos7',
    card: 'The Fool',
    position: 7,
    upright:
      'Joker, şu an içinde bulunduğun durumda yeni bir başlangıç enerjisi hakim. Hayata cesurca adım atıyor, bilinmezliklere merakla yaklaşıyor olabilirsin.',
    reversed:
      'Ters Joker, şu anda dikkatsiz, hazırlıksız ya da sorumsuzca davranışların seni zor durumda bırakabilir. Riskleri görmezden geliyor olabilirsin.',
    keywords: ['başlangıç', 'özgürlük', 'risk', 'cesaret', 'macera'],
    context:
      'Mevcut durumun, cesur başlangıçlar ya da dikkatsizlikle şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ps_pos7',
    card: 'The Magician',
    position: 7,
    upright:
      'Büyücü, şu anda elindeki kaynakları, yeteneklerini ve zekanı etkin şekilde kullanma gücüne sahipsin.',
    reversed:
      'Ters Büyücü, şu anda potansiyelini tam olarak değerlendiremiyor, belki de manipülasyon ya da aldatmacayla karşı karşıya olabilirsin.',
    keywords: ['güç', 'yaratıcılık', 'kaynak', 'başlangıç', 'yetenek'],
    context:
      'Mevcut durumun, yeteneklerini kullanman ya da boşa harcamanla belirleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ps_pos7',
    card: 'The High Priestess',
    position: 7,
    upright:
      'Başrahibe, şu anda sezgilerin güçlü bir şekilde devrede. İç sesine kulak vermen gereken bir dönemdesin.',
    reversed:
      'Ters Başrahibe, şu anda sezgilerini görmezden geliyor ya da sırların saklı kalması seni zor durumda bırakıyor olabilir.',
    keywords: ['sezgi', 'bilgelik', 'giz', 'içsel rehberlik', 'farkındalık'],
    context: 'Mevcut durumun, sezgilerini dinleyip dinlememenle şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ps_pos7',
    card: 'The Empress',
    position: 7,
    upright:
      'İmparatoriçe, şu anda bolluk, üretkenlik ve şefkat enerjisi içinde olabilirsin. Yaratıcılığın ön planda.',
    reversed:
      'Ters İmparatoriçe, şu anda üretkenlikte tıkanıklık, bağımlılık ya da öz bakım eksikliği yaşıyor olabilirsin.',
    keywords: ['yaratıcılık', 'bolluk', 'şefkat', 'ilişki', 'üretim'],
    context:
      'Mevcut durumun, bolluk ya da üretkenlik tıkanıklığıyla şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ps_pos7',
    card: 'The Emperor',
    position: 7,
    upright:
      'İmparator, şu anda düzen kurma, sorumluluk alma ve güçlü bir yapı inşa etme sürecindesin.',
    reversed:
      'Ters İmparator, şu anda otoriteyle çatışıyor, baskıcı bir enerji altında ya da kontrol kaybı içinde olabilirsin.',
    keywords: ['düzen', 'otorite', 'kontrol', 'istikrar', 'güven'],
    context:
      'Mevcut durumun, düzen kurma ya da düzenle çatışmayla şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ps_pos7',
    card: 'The Hierophant',
    position: 7,
    upright:
      'Aziz, şu anda geleneklere bağlılık, öğrenme ya da manevi rehberlik arayışı içinde olabilirsin.',
    reversed:
      'Ters Aziz, şu anda kurallara karşı gelme, geleneklerden kopma ya da rehberlikten uzak kalma söz konusu olabilir.',
    keywords: ['öğreti', 'gelenek', 'maneviyat', 'rehberlik', 'otorite'],
    context:
      'Mevcut durumun, rehberliği kabul etmen ya da reddetmenle şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ps_pos7',
    card: 'The Lovers',
    position: 7,
    upright:
      'Aşıklar, şu anda önemli bir seçim yapma noktasında olabilir ya da ilişkilerinde uyumu deneyimliyor olabilirsin.',
    reversed:
      'Ters Aşıklar, şu anda uyumsuzluk, yanlış kararlar ya da kararsızlık seni zorluyor olabilir.',
    keywords: ['ilişki', 'seçim', 'uyum', 'karar', 'değerler'],
    context:
      'Mevcut durumun, ilişkilerde ya da seçimlerde netlik ihtiyacıyla şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ps_pos7',
    card: 'The Chariot',
    position: 7,
    upright:
      'Savaş Arabası, şu anda iradeni kullanarak hedeflerine doğru kararlı bir şekilde ilerliyorsun.',
    reversed:
      'Ters Savaş Arabası, şu anda yönsüzlük, dağınıklık ya da kontrol kaybı yaşıyor olabilirsin.',
    keywords: ['irade', 'kararlılık', 'kontrol', 'hedef', 'ilerleme'],
    context:
      'Mevcut durumun, irade ve kontrol dengesine bağlı olarak şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ps_pos7',
    card: 'Strength',
    position: 7,
    upright:
      'Güç, şu anda cesaret, sabır ve içsel dengeyle hareket ediyorsun. Zor durumlarda bile sakinliğini koruyorsun.',
    reversed:
      'Ters Güç, şu anda güvensizlik, sabırsızlık ya da öfke patlamaları seni zorlayabilir.',
    keywords: ['cesaret', 'sabır', 'denge', 'güven', 'irade'],
    context: 'Mevcut durumun, cesaretle ya da güvensizlikle şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ps_pos7',
    card: 'The Hermit',
    position: 7,
    upright:
      'Ermiş, şu anda içsel bir yolculukta olabilir, yalnız kalarak kendini keşfetmeye çalışıyor olabilirsin.',
    reversed:
      'Ters Ermiş, şu anda aşırı yalnızlık, rehberlik eksikliği ya da içe kapanıklık seni zorlayabilir.',
    keywords: [
      'bilgelik',
      'içsel arayış',
      'yalnızlık',
      'rehberlik',
      'farkındalık',
    ],
    context: 'Mevcut durumun, içsel keşif ya da yalnızlıkla şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ps_pos7',
    card: 'The Wheel of Fortune',
    position: 7,
    upright:
      'Kader Çarkı, şu anda hayatında önemli değişimler, döngüler ve şanslı fırsatlar ortaya çıkıyor olabilir.',
    reversed:
      'Ters Kader Çarkı, şu anda şanssızlık, yanlış zamanlama ya da tekrarlayan döngüler içinde olabilirsin.',
    keywords: ['kader', 'şans', 'döngü', 'fırsat', 'değişim'],
    context: 'Mevcut durumun, olumlu ya da olumsuz döngülerle şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ps_pos7',
    card: 'Justice',
    position: 7,
    upright:
      'Adalet, şu anda hayatında denge arayışı, adil kararlar ve gerçeklerle yüzleşme süreci hakim.',
    reversed:
      'Ters Adalet, şu anda yanlış anlaşılmalar, adaletsizlik ya da dengesizlik seni zorluyor olabilir.',
    keywords: ['adalet', 'denge', 'gerçek', 'karar', 'dürüstlük'],
    context:
      'Mevcut durumun, adaletli ya da adaletsiz kararlarla şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ps_pos7',
    card: 'The Hanged Man',
    position: 7,
    upright:
      'Asılan Adam, şu anda farklı bir bakış açısı kazanıyor, fedakarlık yapıyor ya da bekleyiş içindesin.',
    reversed:
      'Ters Asılan Adam, şu anda direnç, inatçılık ya da teslimiyet eksikliği seni zorlayabilir.',
    keywords: [
      'bakış açısı',
      'teslimiyet',
      'fedakarlık',
      'farkındalık',
      'öğrenme',
    ],
    context:
      'Mevcut durumun, yeni bir bakış açısı ya da dirençle şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ps_pos7',
    card: 'Death',
    position: 7,
    upright:
      'Ölüm, şu anda hayatında bir dönemi kapatma, köklü dönüşüm ve eskiyi geride bırakma süreci içindesin.',
    reversed:
      'Ters Ölüm, şu anda değişime direniyor, kapanması gereken süreçleri erteleyerek zorlanıyor olabilirsin.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'kapanış', 'cesaret'],
    context: 'Mevcut durumun, dönüşüm ya da dirençle şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ps_pos7',
    card: 'Temperance',
    position: 7,
    upright:
      'Denge, şu anda sabırlı, uyumlu ve dengeleyici bir enerji içindesin. Aşırılıklardan uzak duruyorsun.',
    reversed:
      'Ters Denge, şu anda sabırsızlık, uyumsuzluk ya da aşırılıklar seni zorlayabilir.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'dengeleyici'],
    context: 'Mevcut durumun, uyum ya da dengesizlikle şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ps_pos7',
    card: 'The Devil',
    position: 7,
    upright:
      'Şeytan, şu anda bağımlılıkların, korkuların ya da seni kısıtlayan bağların etkisi altında olabilirsin.',
    reversed:
      'Ters Şeytan, şu anda zincirlerini kırma, özgürleşme ve korkularını aşma süreci seni bekliyor.',
    keywords: ['bağımlılık', 'kısıtlama', 'özgürlük', 'korku', 'gölge'],
    context:
      'Mevcut durumun, bağımlılıklarla ya da özgürleşmeyle şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ps_pos7',
    card: 'The Tower',
    position: 7,
    upright:
      'Kule, şu anda hayatında ani bir değişim, kriz ya da sarsıcı bir olay etkisini gösterebilir.',
    reversed:
      'Ters Kule, şu anda ertelediğin bir kriz patlayabilir ya da değişimden kaçıyor olabilirsin.',
    keywords: ['kriz', 'yıkım', 'değişim', 'dönüşüm', 'şok'],
    context: 'Mevcut durumun, kriz ya da krizden kaçışla şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ps_pos7',
    card: 'The Star',
    position: 7,
    upright:
      'Yıldız, şu anda umut, ilham ve ruhsal yenilenme enerjisi içinde olabilirsin.',
    reversed:
      'Ters Yıldız, şu anda umutsuzluk, güven kaybı ya da ilham eksikliği seni zorluyor olabilir.',
    keywords: ['umut', 'ilham', 'yenilenme', 'ruh', 'güven'],
    context: 'Mevcut durumun, umutla ya da umutsuzlukla şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ps_pos7',
    card: 'The Moon',
    position: 7,
    upright:
      'Ay, şu anda belirsizlikler, yanılsamalar ya da sezgisel korkularla karşı karşıya olabilirsin.',
    reversed:
      'Ters Ay, şu anda sırların açığa çıkması, netlik kazanma ya da yanılsamalardan kurtulma süreci yaşanıyor olabilir.',
    keywords: ['belirsizlik', 'yanılsama', 'sezgi', 'korku', 'gizli'],
    context: 'Mevcut durumun, belirsizlik ya da netlikle şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ps_pos7',
    card: 'The Sun',
    position: 7,
    upright:
      'Güneş, şu anda mutluluk, başarı ve içsel aydınlanma enerjisi seni destekliyor.',
    reversed:
      'Ters Güneş, şu anda karamsarlık, özgüven eksikliği ya da başarıların gecikmesi söz konusu olabilir.',
    keywords: ['mutluluk', 'başarı', 'aydınlanma', 'özgüven', 'neşe'],
    context: 'Mevcut durumun, aydınlanma ya da karamsarlıkla şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ps_pos7',
    card: 'Judgement',
    position: 7,
    upright:
      'Mahkeme, şu anda geçmişle yüzleşme, farkındalık kazanma ve önemli bir karar alma sürecindesin.',
    reversed:
      'Ters Mahkeme, şu anda sorumluluklardan kaçma, geçmişi reddetme ya da fırsatları görmezden gelme olabilir.',
    keywords: ['farkındalık', 'karar', 'yüzleşme', 'yenilenme', 'çağrı'],
    context: 'Mevcut durumun, farkındalık ya da kaçışla şekilleniyor.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ps_pos7',
    card: 'The World',
    position: 7,
    upright:
      'Dünya, şu anda bir döngüyü tamamlama, başarıya ulaşma ya da bütünlük hissi yaşama sürecindesin.',
    reversed:
      'Ters Dünya, şu anda yarım kalmış işler, kapanmayan döngüler ya da tatminsizlik seni zorlayabilir.',
    keywords: ['tamamlanma', 'başarı', 'döngü', 'bütünlük', 'kapanış'],
    context: 'Mevcut durumun, tamamlanma ya da yarım kalmışlıkla şekilleniyor.',
    group: 'Majör Arkana',
  },
  // --- Kupalar Serisi ---
  {
    id: 'ace_of_cups_ps_pos7',
    card: 'Ace of Cups',
    position: 7,
    upright:
      'Kupa Ası, şu anda kalbin yeni duygulara, ilhama ve sevgiye açık. İçsel bir uyanış veya duygusal bir yenilenme süreci yaşıyor olabilirsin.',
    reversed:
      'Ters Kupa Ası, şu anda duygularını bastırıyor, hayal kırıklığı ya da kapanmış bir kalp deneyimi yaşıyor olabilirsin.',
    keywords: ['yeni duygular', 'ilham', 'sevgi', 'başlangıç', 'şefkat'],
    context:
      'Mevcut durumun, duygusal açılım ya da hayal kırıklığıyla şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ps_pos7',
    card: 'Two of Cups',
    position: 7,
    upright:
      'İki Kupa, şu anda uyumlu bir bağ, romantik bir ilişki veya samimi bir ortaklık yaşıyor olabilirsin.',
    reversed:
      'Ters İki Kupa, şu anda anlaşmazlık, uyumsuzluk veya iletişim sorunları seni zorlayabilir.',
    keywords: ['ilişki', 'ortaklık', 'uyum', 'sevgi', 'bağ'],
    context: 'Mevcut durumun, uyum ya da uyumsuzlukla şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ps_pos7',
    card: 'Three of Cups',
    position: 7,
    upright:
      'Üç Kupa, şu anda kutlama, dostlarla bir araya gelme veya sosyal bağlarını güçlendirme dönemindesin.',
    reversed:
      'Ters Üç Kupa, şu anda sosyal çevrenden uzaklaşma, yanlış anlaşılma ya da samimiyetsizlikle karşılaşabilirsin.',
    keywords: ['kutlama', 'dostluk', 'topluluk', 'mutluluk', 'paylaşım'],
    context: 'Mevcut durumun, sosyal bağlarla ya da uzaklaşmayla şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ps_pos7',
    card: 'Four of Cups',
    position: 7,
    upright:
      'Dört Kupa, şu anda ilgisizlik, tatminsizlik ya da içsel bir boşluk duygusu içinde olabilirsin.',
    reversed:
      'Ters Dört Kupa, şu anda farkındalık kazanıyor, fırsatlara yeniden açılıyor ya da yeni ilgiler geliştiriyor olabilirsin.',
    keywords: [
      'tatminsizlik',
      'ilgisizlik',
      'uyanış',
      'fırsat',
      'içsel boşluk',
    ],
    context: 'Mevcut durumun, tatminsizlik ya da farkındalıkla şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ps_pos7',
    card: 'Five of Cups',
    position: 7,
    upright:
      'Beş Kupa, şu anda kayıplarına odaklanıyor, pişmanlık ya da üzüntü içinde olabilirsin.',
    reversed:
      'Ters Beş Kupa, şu anda geçmişi geride bırakıyor, kalan güzelliklere odaklanıyor ve şifalanıyorsun.',
    keywords: ['kayıp', 'pişmanlık', 'üzüntü', 'şifa', 'farkındalık'],
    context: 'Mevcut durumun, yas ya da şifalanmayla şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ps_pos7',
    card: 'Six of Cups',
    position: 7,
    upright:
      'Altı Kupa, şu anda geçmişten gelen anılar, eski dostluklar ya da nostaljik duygular gündeminde olabilir.',
    reversed:
      'Ters Altı Kupa, şu anda geçmişe fazlaca takılıp kalma veya ileriye ilerleyememe durumu yaşıyor olabilirsin.',
    keywords: ['geçmiş', 'anı', 'nostalji', 'çocukluk', 'bağ'],
    context:
      'Mevcut durumun, geçmişe bağlılık ya da geleceğe açılamamakla şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ps_pos7',
    card: 'Seven of Cups',
    position: 7,
    upright:
      'Yedi Kupa, şu anda birçok seçenek ya da hayal içinde olabilir, karar vermekte zorlanıyor olabilirsin.',
    reversed:
      'Ters Yedi Kupa, şu anda kafandaki karmaşayı geride bırakıyor, netlik kazanıyor ve somut seçimlere yöneliyorsun.',
    keywords: ['seçenek', 'hayal', 'karar', 'vizyon', 'netlik'],
    context: 'Mevcut durumun, kafa karışıklığı ya da netlikle şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ps_pos7',
    card: 'Eight of Cups',
    position: 7,
    upright:
      'Sekiz Kupa, şu anda seni tatmin etmeyen bir durumu bırakma ya da yeni bir yolculuğa çıkma sürecinde olabilirsin.',
    reversed:
      'Ters Sekiz Kupa, şu anda geçmişe dönme, ayrılmakta zorlanma ya da kararsızlık içinde olabilirsin.',
    keywords: ['bırakış', 'arayış', 'tatminsizlik', 'karar', 'kaçış'],
    context: 'Mevcut durumun, bırakış ya da geri dönüşle şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ps_pos7',
    card: 'Nine of Cups',
    position: 7,
    upright:
      'Dokuz Kupa, şu anda dileklerinin gerçekleştiği, tatmin ve mutluluk içinde olduğun bir dönemde olabilirsin.',
    reversed:
      'Ters Dokuz Kupa, şu anda yüzeysel tatmin, doyumsuzluk ya da beklentilerin karşılanmaması söz konusu olabilir.',
    keywords: ['tatmin', 'dilek', 'mutluluk', 'doyum', 'beklenti'],
    context: 'Mevcut durumun, tatmin ya da doyumsuzlukla şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ps_pos7',
    card: 'Ten of Cups',
    position: 7,
    upright:
      'On Kupa, şu anda aile, dostluk ya da ilişkilerde huzurlu ve uyumlu bir dönem yaşıyor olabilirsin.',
    reversed:
      'Ters On Kupa, şu anda ailevi huzursuzluk, uyumsuzluk ya da hayal kırıklığı seni zorluyor olabilir.',
    keywords: ['aile', 'mutluluk', 'uyum', 'huzur', 'ilişki'],
    context: 'Mevcut durumun, uyum ya da huzursuzlukla şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ps_pos7',
    card: 'Page of Cups',
    position: 7,
    upright:
      'Kupa Prensi, şu anda romantik bir ilham, yaratıcı bir kıvılcım ya da yeni bir duygusal açılım deneyimliyor olabilirsin.',
    reversed:
      'Ters Kupa Prensi, şu anda hayalcilik, duygusal olgunluk eksikliği ya da samimiyet sorunları yaşayabilirsin.',
    keywords: ['ilham', 'romantizm', 'yaratıcılık', 'hayal', 'samimiyet'],
    context: 'Mevcut durumun, ilham ya da hayalcilikle şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ps_pos7',
    card: 'Knight of Cups',
    position: 7,
    upright:
      'Kupa Şövalyesi, şu anda romantik bir teklif, yaratıcı bir girişim ya da ilham verici bir yolculuk içindesin.',
    reversed:
      'Ters Kupa Şövalyesi, şu anda tutarsızlık, boş vaatler ya da gerçek dışı beklentiler seni zorluyor olabilir.',
    keywords: ['romantizm', 'teklif', 'ilham', 'hayal', 'hareket'],
    context: 'Mevcut durumun, romantizm ya da tutarsızlıkla şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ps_pos7',
    card: 'Queen of Cups',
    position: 7,
    upright:
      'Kupa Kraliçesi, şu anda şefkat, empati ve duygusal bilgelik seni yönlendiriyor.',
    reversed:
      'Ters Kupa Kraliçesi, şu anda aşırı hassasiyet, bağımlılık ya da duygusal dengesizlik seni zorlayabilir.',
    keywords: ['şefkat', 'empati', 'bilgelik', 'hassasiyet', 'denge'],
    context:
      'Mevcut durumun, şefkat ya da duygusal dengesizlikle şekilleniyor.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ps_pos7',
    card: 'King of Cups',
    position: 7,
    upright:
      'Kupa Kralı, şu anda duygusal olgunluk, bilgelik ve sakinlik enerjisiyle hareket ediyor olabilirsin.',
    reversed:
      'Ters Kupa Kralı, şu anda duygusal kontrol kaybı, bastırılmış öfke ya da güvensizlik deneyimliyor olabilirsin.',
    keywords: ['olgunluk', 'denge', 'sakinlik', 'bilgelik', 'rehberlik'],
    context:
      'Mevcut durumun, duygusal olgunluk ya da dengesizlikle şekilleniyor.',
    group: 'Kupalar',
  },

  // --- Kılıçlar Serisi ---
  {
    id: 'ace_of_swords_ps_pos7',
    card: 'Ace of Swords',
    position: 7,
    upright:
      'Kılıç Ası, şu anda zihinsel netlik kazanıyor, yeni bir fikre ya da güçlü bir karara odaklanıyor olabilirsin.',
    reversed:
      'Ters Kılıç Ası, şu anda kafa karışıklığı, iletişim sorunları veya yanlış kararların etkisi altında olabilirsin.',
    keywords: ['netlik', 'karar', 'fikir', 'başlangıç', 'iletişim'],
    context:
      'Mevcut durumun, netlik kazanma ya da kafa karışıklığıyla şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ps_pos7',
    card: 'Two of Swords',
    position: 7,
    upright:
      'İki Kılıç, şu anda bir karar verme sürecinde olabilir, iki seçenek arasında denge kurmaya çalışıyor olabilirsin.',
    reversed:
      'Ters İki Kılıç, şu anda karar vermekten kaçınıyor, belki de yanlış tercihler yapıyor olabilirsin.',
    keywords: ['karar', 'denge', 'ikilem', 'kararsızlık', 'yol ayrımı'],
    context: 'Mevcut durumun, seçim yapma ya da kararsızlıkla şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ps_pos7',
    card: 'Three of Swords',
    position: 7,
    upright:
      'Üç Kılıç, şu anda kalp kırıklığı, ayrılık ya da duygusal bir acı deneyimliyor olabilirsin.',
    reversed:
      'Ters Üç Kılıç, şu anda eski yaraların şifalanması, affediş ya da acıyı geride bırakma süreci içindesin.',
    keywords: ['kalp kırıklığı', 'ayrılık', 'acı', 'şifa', 'affetmek'],
    context: 'Mevcut durumun, acı ya da şifalanmayla şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ps_pos7',
    card: 'Four of Swords',
    position: 7,
    upright:
      'Dört Kılıç, şu anda dinlenme, toparlanma ya da zihinsel yenilenme sürecinde olabilirsin.',
    reversed:
      'Ters Dört Kılıç, şu anda tükenmişlik ya da kendine zaman ayıramama durumu seni zorluyor olabilir.',
    keywords: ['dinlenme', 'toparlanma', 'zihin', 'huzur', 'iyileşme'],
    context: 'Mevcut durumun, yenilenme ya da tükenmişlikle şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ps_pos7',
    card: 'Five of Swords',
    position: 7,
    upright:
      'Beş Kılıç, şu anda bir çatışma, tartışma ya da gurur mücadelesi içinde olabilirsin.',
    reversed:
      'Ters Beş Kılıç, şu anda barış arayışı, uzlaşma ya da geçmiş çatışmaları geride bırakma süreci yaşıyor olabilirsin.',
    keywords: ['çatışma', 'tartışma', 'gurur', 'uzlaşma', 'kaygı'],
    context: 'Mevcut durumun, çatışma ya da barışma ihtiyacıyla şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ps_pos7',
    card: 'Six of Swords',
    position: 7,
    upright:
      'Altı Kılıç, şu anda bir geçiş süreci, yolculuk ya da geçmişten uzaklaşma dönemindesin.',
    reversed:
      'Ters Altı Kılıç, şu anda geçmişe bağlılık, ilerleyememe ya da yolculuklarda aksaklık olabilir.',
    keywords: ['geçiş', 'ilerleme', 'geçmiş', 'yolculuk', 'kaçış'],
    context:
      'Mevcut durumun, ilerleyiş ya da geçmişe takılı kalmayla şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ps_pos7',
    card: 'Seven of Swords',
    position: 7,
    upright:
      'Yedi Kılıç, şu anda gizlilik, strateji ya da saklı planlar içinde olabilirsin.',
    reversed:
      'Ters Yedi Kılıç, şu anda sırların açığa çıkması, dürüstlük ihtiyacı ya da yakalanma durumu gündemde olabilir.',
    keywords: ['gizlilik', 'hile', 'strateji', 'sırlar', 'plan'],
    context: 'Mevcut durumun, gizlilik ya da dürüstlükle şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ps_pos7',
    card: 'Eight of Swords',
    position: 7,
    upright:
      'Sekiz Kılıç, şu anda kendini sınırlanmış, çaresiz ya da zihinsel engeller altında hissediyor olabilirsin.',
    reversed:
      'Ters Sekiz Kılıç, şu anda özgürleşme, engelleri kaldırma ya da kendi sınırlarını aşma süreci içindesin.',
    keywords: ['sınırlama', 'çaresizlik', 'özgürlük', 'engeller', 'zihin'],
    context: 'Mevcut durumun, kısıtlanma ya da özgürleşmeyle şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ps_pos7',
    card: 'Nine of Swords',
    position: 7,
    upright:
      'Dokuz Kılıç, şu anda yoğun kaygı, stres ya da uykusuzluk içinde olabilirsin.',
    reversed:
      'Ters Dokuz Kılıç, şu anda kaygılardan kurtulma, rahatlama ya da destek bulma süreci yaşıyor olabilirsin.',
    keywords: ['kaygı', 'stres', 'endişe', 'kabus', 'rahatlama'],
    context: 'Mevcut durumun, kaygılar ya da şifalanmayla şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ps_pos7',
    card: 'Ten of Swords',
    position: 7,
    upright:
      'On Kılıç, şu anda acı verici bir bitiş, ihanet ya da tükenmişlik duygusu yaşıyor olabilirsin.',
    reversed:
      'Ters On Kılıç, şu anda yeniden doğuş, toparlanma ve karanlık dönemleri geride bırakma sürecindesin.',
    keywords: ['bitiş', 'ihanet', 'yeniden doğuş', 'acı', 'travma'],
    context: 'Mevcut durumun, bitiş ya da yeniden doğuşla şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ps_pos7',
    card: 'Page of Swords',
    position: 7,
    upright:
      'Kılıç Prensi, şu anda merak, öğrenme arzusu ve yeni fikirlerle dolu bir enerjiye sahipsin.',
    reversed:
      'Ters Kılıç Prensi, şu anda dedikodu, yanlış bilgi ya da dikkatsizlik seni etkiliyor olabilir.',
    keywords: ['merak', 'iletişim', 'öğrenme', 'zeka', 'dikkat'],
    context: 'Mevcut durumun, öğrenme ya da dikkatsizlikle şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ps_pos7',
    card: 'Knight of Swords',
    position: 7,
    upright:
      'Kılıç Şövalyesi, şu anda hızlı hareket ediyor, cesur adımlar atıyor ve kararlılıkla ilerliyorsun.',
    reversed:
      'Ters Kılıç Şövalyesi, şu anda acelecilik, dikkatsizlik ya da yönsüzlük seni zorlayabilir.',
    keywords: ['cesaret', 'hız', 'karar', 'odak', 'acele'],
    context: 'Mevcut durumun, cesaret ya da acelecilikle şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ps_pos7',
    card: 'Queen of Swords',
    position: 7,
    upright:
      'Kılıç Kraliçesi, şu anda mantığını kullanıyor, objektif kararlar alıyor ve bağımsız bir tavır sergiliyorsun.',
    reversed:
      'Ters Kılıç Kraliçesi, şu anda soğukluk, eleştirellik ya da anlayışsızlıkla karşı karşıya olabilirsin.',
    keywords: ['mantık', 'bağımsızlık', 'objektiflik', 'soğukluk', 'karar'],
    context: 'Mevcut durumun, mantıkla ya da aşırı soğuklukla şekilleniyor.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ps_pos7',
    card: 'King of Swords',
    position: 7,
    upright:
      'Kılıç Kralı, şu anda mantıklı kararlar alıyor, adil davranıyor ve bilgeliğini kullanıyorsun.',
    reversed:
      'Ters Kılıç Kralı, şu anda baskıcılık, adaletsiz kararlar ya da soğuk bir tavır sergiliyor olabilirsin.',
    keywords: ['otorite', 'adalet', 'mantık', 'bilgelik', 'karar'],
    context: 'Mevcut durumun, bilgelik ya da adaletsizlikle şekilleniyor.',
    group: 'Kılıçlar',
  },
  // --- Tılsımlar Serisi ---
  {
    id: 'ace_of_pentacles_ps_pos7',
    card: 'Ace of Pentacles',
    position: 7,
    upright:
      'Tılsım Ası, şu anda hayatında yeni bir maddi fırsat, sağlam bir başlangıç veya güçlü bir temel oluşturma enerjisi mevcut.',
    reversed:
      'Ters Tılsım Ası, şu anda fırsatları değerlendirmekte zorlanabilir, yanlış yatırımlar ya da istikrar eksikliği yaşayabilirsin.',
    keywords: ['fırsat', 'başlangıç', 'bolluk', 'yatırım', 'temel'],
    context:
      'Mevcut durumun, fırsatların ya da istikrarsızlıkların etkisiyle şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ps_pos7',
    card: 'Two of Pentacles',
    position: 7,
    upright:
      'İki Tılsım, şu anda sorumluluklarını dengelemeye, önceliklerini belirlemeye ve esnek kalmaya çalışıyorsun.',
    reversed:
      'Ters İki Tılsım, şu anda dengesizlik, fazla yüklenme ya da karar verememe durumuyla karşı karşıya olabilirsin.',
    keywords: ['denge', 'sorumluluk', 'öncelik', 'yoğunluk', 'esneklik'],
    context: 'Mevcut durumun, dengeyi bulmak ya da kaybetmekle şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ps_pos7',
    card: 'Three of Pentacles',
    position: 7,
    upright:
      'Üç Tılsım, şu anda işbirliği, ekip çalışması ve ortak projelerde başarı enerjisi içinde olabilirsin.',
    reversed:
      'Ters Üç Tılsım, şu anda uyumsuzluk, destek eksikliği ya da işbirliği yapamama durumu söz konusu olabilir.',
    keywords: ['işbirliği', 'ekip', 'başarı', 'paylaşım', 'uyum'],
    context: 'Mevcut durumun, işbirliği ya da uyumsuzlukla şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ps_pos7',
    card: 'Four of Pentacles',
    position: 7,
    upright:
      'Dört Tılsım, şu anda güvenlik arayışında olabilir, sahip olduklarını korumaya ve istikrar sağlamaya odaklanıyor olabilirsin.',
    reversed:
      'Ters Dört Tılsım, şu anda kaybetme korkusu, aşırı kontrol ya da cimrilik eğilimi seni zorlayabilir.',
    keywords: ['güvenlik', 'istikrar', 'koruma', 'kontrol', 'kaybetme korkusu'],
    context:
      'Mevcut durumun, güvence arayışı ya da aşırı tutuculukla şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ps_pos7',
    card: 'Five of Pentacles',
    position: 7,
    upright:
      'Beş Tılsım, şu anda yalnızlık, maddi sıkıntı ya da destek eksikliği yaşıyor olabilirsin.',
    reversed:
      'Ters Beş Tılsım, şu anda yardım bulma, destek alma ya da zorlukları aşma sürecindesin.',
    keywords: ['zorluk', 'destek', 'yalnızlık', 'maddi sıkıntı', 'dayanışma'],
    context: 'Mevcut durumun, zorluk ya da destek bulmayla şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ps_pos7',
    card: 'Six of Pentacles',
    position: 7,
    upright:
      'Altı Tılsım, şu anda yardımlaşma, adil paylaşım ve alma-verme dengesini kurma sürecindesin.',
    reversed:
      'Ters Altı Tılsım, şu anda eşitsizlik, tek taraflı ilişkiler ya da dengesizlik deneyimliyor olabilirsin.',
    keywords: ['yardım', 'paylaşım', 'adalet', 'denge', 'destek'],
    context: 'Mevcut durumun, denge ya da dengesizlikle şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ps_pos7',
    card: 'Seven of Pentacles',
    position: 7,
    upright:
      'Yedi Tılsım, şu anda sabırla beklemek, emeklerinin karşılığını görmek ya da uzun vadeli planlarını değerlendirmektesin.',
    reversed:
      'Ters Yedi Tılsım, şu anda sabırsızlık, tatminsizlik ya da boşa emek verme duygusu içinde olabilirsin.',
    keywords: ['sabır', 'emek', 'bekleyiş', 'yatırım', 'kazanç'],
    context: 'Mevcut durumun, sabır ya da tatminsizlikle şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ps_pos7',
    card: 'Eight of Pentacles',
    position: 7,
    upright:
      'Sekiz Tılsım, şu anda disiplinli bir şekilde çalışıyor, becerilerini geliştiriyor ve ustalaşıyorsun.',
    reversed:
      'Ters Sekiz Tılsım, şu anda özensizlik, motivasyon eksikliği ya da aynı hataları tekrar etme eğilimi olabilir.',
    keywords: ['çalışma', 'ustalık', 'disiplin', 'öğrenme', 'emek'],
    context: 'Mevcut durumun, çalışkanlık ya da özensizlikle şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ps_pos7',
    card: 'Nine of Pentacles',
    position: 7,
    upright:
      'Dokuz Tılsım, şu anda bağımsızlık, öz güven ve emeğinin karşılığını alma enerjisi içindesin.',
    reversed:
      'Ters Dokuz Tılsım, şu anda bağımlılıklar, yalnızlık korkusu ya da maddi aşırılıklar seni etkiliyor olabilir.',
    keywords: ['bağımsızlık', 'özgüven', 'tatmin', 'bolluk', 'başarı'],
    context: 'Mevcut durumun, bağımsızlık ya da bağımlılıkla şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ps_pos7',
    card: 'Ten of Pentacles',
    position: 7,
    upright:
      'On Tılsım, şu anda aile bağları, kalıcı istikrar ve maddi güvence içinde olabilirsin.',
    reversed:
      'Ters On Tılsım, şu anda ailevi sorunlar, miras anlaşmazlıkları ya da istikrarsızlık seni etkiliyor olabilir.',
    keywords: ['aile', 'istikrar', 'maddi güvence', 'bolluk', 'bağ'],
    context: 'Mevcut durumun, istikrar ya da ailevi zorluklarla şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ps_pos7',
    card: 'Page of Pentacles',
    position: 7,
    upright:
      'Tılsım Prensi, şu anda öğrenmeye açık, fırsatları araştıran ve planlarını hayata geçirmeye hazırlanan bir enerjidesin.',
    reversed:
      'Ters Tılsım Prensi, şu anda motivasyon kaybı, dikkatsizlik ya da yarım kalmış projeler seni etkiliyor olabilir.',
    keywords: ['öğrenme', 'fırsat', 'plan', 'başlangıç', 'keşif'],
    context:
      'Mevcut durumun, öğrenme ya da motivasyon eksikliğiyle şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ps_pos7',
    card: 'Knight of Pentacles',
    position: 7,
    upright:
      'Tılsım Şövalyesi, şu anda disiplinli, sabırlı ve düzenli bir şekilde ilerliyorsun.',
    reversed:
      'Ters Tılsım Şövalyesi, şu anda tembellik, durağanlık ya da yavaş ilerleme seni zorlayabilir.',
    keywords: ['sabır', 'istikrar', 'çalışma', 'disiplin', 'azim'],
    context: 'Mevcut durumun, disiplin ya da durağanlıkla şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ps_pos7',
    card: 'Queen of Pentacles',
    position: 7,
    upright:
      'Tılsım Kraliçesi, şu anda bolluk, şefkat ve kaynaklarını verimli yönetme süreci içindesin.',
    reversed:
      'Ters Tılsım Kraliçesi, şu anda savurganlık, öz bakım eksikliği ya da dengesiz kaynak kullanımı seni etkiliyor olabilir.',
    keywords: ['bolluk', 'şefkat', 'kaynak yönetimi', 'denge', 'üretkenlik'],
    context: 'Mevcut durumun, bolluk ya da savurganlıkla şekilleniyor.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ps_pos7',
    card: 'King of Pentacles',
    position: 7,
    upright:
      'Tılsım Kralı, şu anda güçlü, istikrarlı ve güven veren bir enerji içindesin.',
    reversed:
      'Ters Tılsım Kralı, şu anda hırs, baskıcılık ya da istikrar eksikliği seni zorlayabilir.',
    keywords: ['başarı', 'istikrar', 'liderlik', 'güven', 'bolluk'],
    context: 'Mevcut durumun, başarı ya da istikrarsızlıkla şekilleniyor.',
    group: 'Tılsımlar',
  },
  // --- Asalar Serisi ---
  {
    id: 'ace_of_wands_ps_pos7',
    card: 'Ace of Wands',
    position: 7,
    upright:
      'Değnek Ası, şu anda hayatında yeni bir ilham, güçlü bir kıvılcım ya da yaratıcı bir başlangıç enerjisi mevcut.',
    reversed:
      'Ters Değnek Ası, şu anda motivasyon eksikliği, ertelenmiş planlar ya da ilham tıkanıklığı yaşayabilirsin.',
    keywords: ['ilham', 'başlangıç', 'yaratıcılık', 'tutku', 'kıvılcım'],
    context:
      'Mevcut durumun, yaratıcı başlangıçlar ya da ertelemelerle şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ps_pos7',
    card: 'Two of Wands',
    position: 7,
    upright:
      'İki Değnek, şu anda geleceğe dair planlar yapıyor, vizyonunu genişletiyor ve seçimler arasında yön belirliyorsun.',
    reversed:
      'Ters İki Değnek, şu anda risk almaktan kaçınıyor, dar bakış açısı ya da güvensizlik içinde olabilirsin.',
    keywords: ['plan', 'vizyon', 'gelecek', 'seçim', 'cesaret'],
    context:
      'Mevcut durumun, vizyon genişletme ya da güvensizlikle şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ps_pos7',
    card: 'Three of Wands',
    position: 7,
    upright:
      'Üç Değnek, şu anda ufkunu genişletiyor, yeni fırsatlara açılıyor ve attığın adımların karşılığını görüyorsun.',
    reversed:
      'Ters Üç Değnek, şu anda gecikmeler, engeller ya da planlarda aksamalar yaşayabilirsin.',
    keywords: ['ilerleme', 'fırsat', 'vizyon', 'ufuk', 'plan'],
    context: 'Mevcut durumun, ilerleme ya da gecikmelerle şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ps_pos7',
    card: 'Four of Wands',
    position: 7,
    upright:
      'Dört Değnek, şu anda kutlamalar, huzur ve sağlam temeller kurma enerjisi içinde olabilirsin.',
    reversed:
      'Ters Dört Değnek, şu anda uyumsuzluk, ev veya iş yaşamında huzursuzluk seni etkiliyor olabilir.',
    keywords: ['kutlama', 'huzur', 'temel', 'uyum', 'denge'],
    context: 'Mevcut durumun, huzur ya da uyumsuzlukla şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ps_pos7',
    card: 'Five of Wands',
    position: 7,
    upright:
      'Beş Değnek, şu anda rekabet, fikir ayrılığı ya da bir mücadele içinde olabilirsin.',
    reversed:
      'Ters Beş Değnek, şu anda çatışmalardan uzaklaşma, işbirliğine yönelme ya da gerilimi azaltma sürecindesin.',
    keywords: ['rekabet', 'çatışma', 'mücadele', 'gerilim', 'işbirliği'],
    context: 'Mevcut durumun, rekabet ya da işbirliğiyle şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ps_pos7',
    card: 'Six of Wands',
    position: 7,
    upright:
      'Altı Değnek, şu anda başarı, zafer ve çevrenden takdir görme sürecindesin.',
    reversed:
      'Ters Altı Değnek, şu anda özgüven eksikliği, başarının gölgelenmesi ya da takdir görmeme durumuyla karşılaşabilirsin.',
    keywords: ['zafer', 'başarı', 'takdir', 'özgüven', 'liderlik'],
    context: 'Mevcut durumun, başarı ya da hayal kırıklığıyla şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ps_pos7',
    card: 'Seven of Wands',
    position: 7,
    upright:
      'Yedi Değnek, şu anda kendi sınırlarını savunuyor, inançlarını koruyor ve mücadele veriyorsun.',
    reversed:
      'Ters Yedi Değnek, şu anda direnç kaybı, geri çekilme ya da pes etme eğilimi içinde olabilirsin.',
    keywords: ['savunma', 'kararlılık', 'cesaret', 'sınırlar', 'dayanıklılık'],
    context: 'Mevcut durumun, kararlılık ya da geri çekilme ile şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ps_pos7',
    card: 'Eight of Wands',
    position: 7,
    upright:
      'Sekiz Değnek, şu anda hızlı gelişmeler, haberler ve ani değişimlerin içindesin.',
    reversed:
      'Ters Sekiz Değnek, şu anda gecikmeler, iletişim sorunları ya da yavaş ilerleme söz konusu olabilir.',
    keywords: ['hız', 'haber', 'iletişim', 'ilerleme', 'değişim'],
    context:
      'Mevcut durumun, hızlı gelişmeler ya da gecikmelerle şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ps_pos7',
    card: 'Nine of Wands',
    position: 7,
    upright:
      'Dokuz Değnek, şu anda zorluklara karşı direniyor, sabırla ayakta kalmaya devam ediyorsun.',
    reversed:
      'Ters Dokuz Değnek, şu anda tükenmişlik, yorgunluk ya da pes etme eğilimi yaşıyor olabilirsin.',
    keywords: ['direnç', 'sabır', 'koruma', 'dayanıklılık', 'mücadele'],
    context: 'Mevcut durumun, direnç ya da yorgunlukla şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ps_pos7',
    card: 'Ten of Wands',
    position: 7,
    upright:
      'On Değnek, şu anda ağır sorumluluklar taşıyor, yoğun iş yükü altında olabilirsin.',
    reversed:
      'Ters On Değnek, şu anda yüklerini hafifletme, sorumlulukları bırakma ya da aşırı yorgunlukla uğraşıyor olabilirsin.',
    keywords: ['yük', 'sorumluluk', 'emek', 'yoğunluk', 'azim'],
    context:
      'Mevcut durumun, sorumluluk ya da yüklerden kurtulmayla şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ps_pos7',
    card: 'Page of Wands',
    position: 7,
    upright:
      'Değnek Prensi, şu anda yeni bir fikir, merak ve keşif enerjisi içindesin.',
    reversed:
      'Ters Değnek Prensi, şu anda motivasyon kaybı, dikkatsizlik ya da hevesini yitirme durumu yaşayabilirsin.',
    keywords: ['merak', 'ilham', 'cesaret', 'keşif', 'deneyim'],
    context:
      'Mevcut durumun, keşif ya da motivasyon eksikliğiyle şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ps_pos7',
    card: 'Knight of Wands',
    position: 7,
    upright:
      'Değnek Şövalyesi, şu anda tutkulu bir şekilde harekete geçiyor, cesur adımlar atıyor olabilirsin.',
    reversed:
      'Ters Değnek Şövalyesi, şu anda acelecilik, yönsüzlük ya da sabırsızlık seni etkiliyor olabilir.',
    keywords: ['tutku', 'cesaret', 'hareket', 'macera', 'enerji'],
    context: 'Mevcut durumun, cesur adımlar ya da acelecilikle şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ps_pos7',
    card: 'Queen of Wands',
    position: 7,
    upright:
      'Değnek Kraliçesi, şu anda özgüvenli, ilham verici ve çekim gücü yüksek bir enerjiyle hareket ediyorsun.',
    reversed:
      'Ters Değnek Kraliçesi, şu anda güvensizlik, kıskançlık ya da enerjide düşüş seni zorlayabilir.',
    keywords: ['özgüven', 'liderlik', 'çekim', 'ilham', 'enerji'],
    context: 'Mevcut durumun, özgüven ya da güvensizlikle şekilleniyor.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ps_pos7',
    card: 'King of Wands',
    position: 7,
    upright:
      'Değnek Kralı, şu anda vizyon sahibi, kararlı ve liderlik eden bir enerji içindesin.',
    reversed:
      'Ters Değnek Kralı, şu anda kontrol etme isteği, baskıcılık ya da vizyon eksikliği seni zorlayabilir.',
    keywords: ['liderlik', 'vizyon', 'ilham', 'karizma', 'cesaret'],
    context: 'Mevcut durumun, vizyon ya da kontrol ihtiyacıyla şekilleniyor.',
    group: 'Asalar',
  },
];

/**
 * Belirli bir kart için pozisyon 1 anlamını getirir
 * @param card - Tarot kartı
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition7Meaning(
  card: TarotCard
): ProblemSolvingPosition7Meaning | null {
  // Kart ismi eşleştirmesi için hem İngilizce hem Türkçe isimleri kontrol et
  // Önce doğrudan eşleşme ara
  let meaning = position7Meanings.find(
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
  meaning = position7Meanings.find(m => m.card === englishName);

  return meaning || null;
}

/**
 * Belirli bir kart ismi için pozisyon 1 anlamını getirir
 * @param cardName - Kart ismi
 * @returns Pozisyon 1 anlamı veya null
 */
export function getProblemSolvingPosition7MeaningByCardName(
  cardName: string
): ProblemSolvingPosition7Meaning | null {
  return position7Meanings.find(m => m.card === cardName) || null;
}

/**
 * Tüm pozisyon 1 anlamlarını getirir
 * @returns Pozisyon 1 anlamları array'i
 */
export function getAllProblemSolvingPosition7Meanings(): ProblemSolvingPosition7Meaning[] {
  return position7Meanings;
}

/**
 * Kart grubuna göre pozisyon 1 anlamlarını filtreler
 * @param group - Kart grubu
 * @returns Filtrelenmiş anlamlar
 */
export function getProblemSolvingPosition7MeaningsByGroup(
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): ProblemSolvingPosition7Meaning[] {
  return position7Meanings.filter(meaning => meaning.group === group);
}

// i18n destekli fonksiyonlar - şu an kullanılmıyor
/*
export const useI18nposition7Meanings = (): I18nProblemSolvingPosition7Meaning[] => {
  const { getCardMeaning, getCardKeywords, getCardContext, getCardGroup } =
    useLoveTranslations();

  return position7Meanings.map(meaning => {
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
export const getI18nPosition7Meaning = (
  cardName: string,
  t: (_key: string) => string
): I18nProblemSolvingPosition7Meaning | null => {
  const originalMeaning = position7Meanings.find(m => m.card === cardName);
  if (!originalMeaning) {
    return null;
  }

  // i18n'den çevirileri al
  const cardKey = cardName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  const i18nUpright = t(
    `problem-solving.meanings.${cardKey}.position7.upright`
  );
  const i18nReversed = t(
    `problem-solving.meanings.${cardKey}.position7.reversed`
  );
  const i18nKeywords = t(
    `problem-solving.meanings.${cardKey}.position7.keywords`
  );
  const i18nContext = t(
    `problem-solving.meanings.${cardKey}.position7.context`
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
const problemSolvingPosition7Exports = {
  position7Meanings,
  getProblemSolvingPosition7Meaning,
  getProblemSolvingPosition7MeaningByCardName,
  getAllProblemSolvingPosition7Meanings,
  getProblemSolvingPosition7MeaningsByGroup,
  getI18nPosition7Meaning,
};

export default problemSolvingPosition7Exports;
