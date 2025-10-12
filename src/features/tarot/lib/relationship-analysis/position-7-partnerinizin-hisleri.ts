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

import { RelationshipAnalysisPositionMeaning } from './position-meanings-index';

// 6. Pozisyon (Tavsiye) - 78 Tarot kartı
export const position7Meanings: RelationshipAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_ra_pos7',
    card: 'The Fool',
    position: 7,
    upright:
      'İlişimin geleceğinde taze başlangıçlar ve özgürleşme enerjisi var. Yeni bir döngüye, cesur ve saf bir kalple adım atılabilir.',
    reversed:
      'Gelecekte belirsizlikler ve aceleye gelen kararlar risk oluşturabilir. Yönsüzlük bağda dağınıklık yaratabilir.',
    keywords: ['başlangıç', 'özgürlük', 'yeni döngü', 'merak'],
    context:
      'İlişimin geleceği, yeni bir macera gibi açılacak. Ama köksüzlükten kaçınılmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_ra_pos7',
    card: 'The Magician',
    position: 7,
    upright:
      'İlişimin geleceğinde yaratım ve güç var. Birlikte yeni projeler, yeni hayat düzenleri kurulabilir.',
    reversed:
      'Gelecekte iletişim eksikliği veya manipülasyon bağın potansiyelini sınırlayabilir. Yarım kalan sözler hayal kırıklığı getirebilir.',
    keywords: ['yaratım', 'iletişim', 'güç', 'işbirliği'],
    context:
      'İlişimin geleceği birlikte yaratmaya açık. İfade netliği anahtar olacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_ra_pos7',
    card: 'The High Priestess',
    position: 7,
    upright:
      'İlişimin geleceğinde sezgi ve derinlik hâkim. Daha ruhsal, daha içsel bir bağ gelişebilir.',
    reversed:
      'Aşırı suskunluk veya gizlenmiş duygular gelecekte mesafe yaratabilir. İçine kapanma sıcaklığı azaltır.',
    keywords: ['sezgi', 'derinlik', 'giz', 'ruhsallık'],
    context:
      'İlişimin geleceği, sezgisel bağlarla güçlenecek. Ama giz çoksa duvar örülebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_ra_pos7',
    card: 'The Empress',
    position: 7,
    upright:
      'İlişimin geleceğinde sevgi, bereket ve besleyici bir enerji hâkim. Ortak yaşam alanı büyür ve sıcaklık çoğalır.',
    reversed:
      'Aşırı bağımlılık veya öz bakım eksikliği gelecekte tükenmeye yol açabilir. Denge bozulursa huzursuzluk doğar.',
    keywords: ['bereket', 'şefkat', 'bolluk', 'besleme'],
    context:
      'İlişimin geleceği büyüyüp beslenme üzerine kurulu olacak. Ama öz bakım şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_ra_pos7',
    card: 'The Emperor',
    position: 7,
    upright:
      'İlişimin geleceğinde düzen, güvenlik ve sağlam bir yapı var. Temeller güçleniyor.',
    reversed:
      'Aşırı katılık veya kontrol gelecekte yakınlığı zorlaştırabilir. Sertlik bağa mesafe katar.',
    keywords: ['düzen', 'güven', 'istikrar', 'otorite'],
    context:
      'İlişimin geleceği sağlam bir zemine oturacak. Fakat esneklik korunmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_ra_pos7',
    card: 'The Hierophant',
    position: 7,
    upright:
      'İlişimin geleceğinde geleneksel adımlar, bağlılık ve ortak değerler ön planda olacak. Uzun vadeli bağ güçlenir.',
    reversed:
      'Kör gelenek veya kalıplara sıkışma gelecekte özgürlüğü kısıtlayabilir. Ruh özgün yol arayışına girebilir.',
    keywords: ['değerler', 'gelenek', 'bağlılık', 'uyum'],
    context:
      'İlişimin geleceği sağlam bağlılık ve ortak değerlerle güçlenecek. Ama özgünlük unutulmamalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_ra_pos7',
    card: 'The Lovers',
    position: 7,
    upright:
      'İlişimin geleceğinde uyumlu seçimler ve güçlü bir birleşme var. Kalpler değer hizasında buluşuyor.',
    reversed:
      'Kararsızlık veya değer çatışmaları gelecekte ilişkiyi zorlayabilir. Uyum kaybolursa mesafe artar.',
    keywords: ['aşk', 'uyum', 'birleşme', 'seçim'],
    context:
      'İlişimin geleceği güçlü bir seçim ve birleşme getirecek. Kararsızlık tehlike olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_ra_pos7',
    card: 'The Chariot',
    position: 7,
    upright:
      'İlişimin geleceğinde net yön, kontrol ve ilerleme var. Ortak hedefler güçlü motivasyon yaratacak.',
    reversed:
      'Yönsüzlük veya farklı yönlere çekilme gelecekte savrulmaya yol açabilir. Dengesizlik riskli.',
    keywords: ['ilerleme', 'kontrol', 'yön', 'hedef'],
    context:
      'İlişimin geleceği birlikte yol almaya açık. Ama direksiyon aynı elde olmalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_ra_pos7',
    card: 'Strength',
    position: 7,
    upright:
      'İlişimin geleceğinde şefkat, sabır ve yumuşak güç var. Nazik cesaret bağın temelini güçlendirir.',
    reversed:
      'Sabırsızlık veya kıskançlık gölgesi gelecekte zorluk çıkarabilir. Öz güven dalgalanması bağa zarar verebilir.',
    keywords: ['şefkat', 'sabır', 'güç', 'naziklik'],
    context:
      'İlişimin geleceği nazik güçle şekillenecek. Öfke değil şefkat bağ kuracak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_ra_pos7',
    card: 'The Hermit',
    position: 7,
    upright:
      'İlişimin geleceğinde içsel arayış ve derin düşünceler öne çıkıyor. Kendi ışığını bulmak bağa rehberlik edecek.',
    reversed:
      'Aşırı izolasyon veya uzaklaşma gelecekte soğukluk yaratabilir. Mesafe bağın sıcaklığını zayıflatır.',
    keywords: ['içe dönüş', 'bilgelik', 'yalnızlık', 'rehberlik'],
    context:
      'İlişimin geleceği içsel aydınlanma ile güçlenecek. Ama fazla yalnızlık bağa zarar verebilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_ra_pos7',
    card: 'The Wheel of Fortune',
    position: 7,
    upright:
      'İlişimin geleceğinde değişim döngüleri ve kaderin dönüşü var. Yenilik akışa kapı açıyor.',
    reversed:
      'Tekrar eden döngüler veya değişime direnç gelecekte sıkışıklık yaratabilir. Akışa kapalı olmak huzuru bozar.',
    keywords: ['döngü', 'kader', 'değişim', 'akış'],
    context:
      'İlişimin geleceği değişim ve yenilenme üzerine kurulacak. Direnç tehlikeli olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_ra_pos7',
    card: 'Justice',
    position: 7,
    upright:
      'İlişimin geleceğinde adil paylaşım, dürüstlük ve denge var. Şeffaflık kalıcı güven yaratır.',
    reversed:
      'Adaletsizlik veya çifte standart gelecekte kırgınlık doğurabilir. Gizlilik güveni zayıflatır.',
    keywords: ['adalet', 'denge', 'dürüstlük', 'eşitlik'],
    context:
      'İlişimin geleceği denge ve şeffaflıkla sağlamlaşacak. Ama adalet bozulursa yaralar açılır.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_ra_pos7',
    card: 'The Hanged Man',
    position: 7,
    upright:
      'İlişimin geleceğinde bekleyiş, sabır ve farklı bakış açıları öne çıkacak. Teslimiyet, bağın yeni yönünü gösterebilir.',
    reversed:
      'Gelecekte tıkanıklık veya gönülsüz fedakârlık hissi doğabilir. İlerleme için bakış açısı değiştirilmezse atalet sürebilir.',
    keywords: ['bekleyiş', 'teslimiyet', 'perspektif', 'feda'],
    context:
      'İlişimin geleceği yeni bir bakış açısıyla açılacak. Ama direnç sıkışma yaratabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_ra_pos7',
    card: 'Death',
    position: 7,
    upright:
      'İlişimin geleceğinde bitişler ve dönüşüm var. Eski kalıpları bırakmak yeniyi davet edecek.',
    reversed:
      'Değişime direnmek veya kapanmamış defterler gelecekte huzuru zorlaştırabilir. Bırakılmayan yük bağa ağırlık katar.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'veda'],
    context:
      'İlişimin geleceği köklü bir dönüşümden geçecek. Eskiyi bırakmak yeniyi getirecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_ra_pos7',
    card: 'Temperance',
    position: 7,
    upright:
      'İlişimin geleceğinde uyum, ölçülülük ve sabır öne çıkıyor. Orta yol güvenli bir alan yaratacak.',
    reversed:
      'Aşırılıklar veya sabırsızlık gelecekte dengeyi bozabilir. Uyum kaybolursa huzursuzluk artar.',
    keywords: ['denge', 'uyum', 'sabır', 'orta yol'],
    context:
      'İlişimin geleceği ölçülülük ve uyum üzerine kurulacak. Ama uçlar tehlike olabilir.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_ra_pos7',
    card: 'The Devil',
    position: 7,
    upright:
      'İlişimin geleceğinde güçlü tutku, bağlanma ve kimi zaman kısıtlayıcı bir çekim var. Bağımlılık riski de barındırıyor.',
    reversed:
      'Gelecekte zincirlerden kurtulma arzusu güçlenecek. Bağımlılıklar kırıldığında bağ özgürleşecek.',
    keywords: ['tutku', 'bağlılık', 'bağımlılık', 'özgürleşme'],
    context:
      'İlişimin geleceği yoğun tutkuyla örülecek. Fakat özgürlük ihtiyacı da büyüyecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_ra_pos7',
    card: 'The Tower',
    position: 7,
    upright:
      'İlişimin geleceğinde ani farkındalıklar ve güçlü değişimler var. Eski temeller yıkılıp yeni alan açılabilir.',
    reversed:
      'Geciktirilen yüzleşmeler patlamaya dönebilir. Ertelenen kriz, daha büyük sarsıntı yaratabilir.',
    keywords: ['kriz', 'yıkım', 'farkındalık', 'yeniden inşa'],
    context:
      'İlişimin geleceği sarsıcı değişimlerle yeniden şekillenecek. Yıkım sonrası sağlam zemin oluşacak.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_ra_pos7',
    card: 'The Star',
    position: 7,
    upright:
      'İlişimin geleceğinde umut, şifa ve yenilenme var. Ortak hayaller bağa ilham verecek.',
    reversed:
      'Umutsuzluk veya güven eksikliği gelecekte gölge yaratabilir. İnanç kaybı enerjiyi düşürür.',
    keywords: ['umut', 'şifa', 'yenilenme', 'ilham'],
    context:
      'İlişimin geleceği umut ve şifa ile güçlenecek. Ama umutsuzluk riski unutulmamalı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_ra_pos7',
    card: 'The Moon',
    position: 7,
    upright:
      'İlişimin geleceğinde belirsizlik, sezgi ve hayaller öne çıkacak. Sislerin ardından hakikat belirecek.',
    reversed:
      'Yanılsamalar veya korkular gelecekte ilişkiyi bulandırabilir. Yanlış varsayımlar güvensizlik yaratır.',
    keywords: ['belirsizlik', 'sezgi', 'korku', 'yansıma'],
    context:
      'İlişimin geleceği sezgiyle anlaşılacak. Sis dağıldığında netlik gelecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_ra_pos7',
    card: 'The Sun',
    position: 7,
    upright:
      'İlişimin geleceğinde neşe, sıcaklık ve açık mutluluk var. Otantik paylaşım bağa canlılık katacak.',
    reversed:
      'Sahte neşe veya yüzeysel uyum gelecekte güveni zedeleyebilir. Gerçeklikten kopmak risktir.',
    keywords: ['neşe', 'mutluluk', 'otantiklik', 'aydınlık'],
    context:
      'İlişimin geleceği sevinç ve açıklıkla güçlenecek. Gerçeklikten kopmamak şart.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_ra_pos7',
    card: 'Judgement',
    position: 7,
    upright:
      'İlişimin geleceğinde geçmişle yüzleşme ve yeni bir karar anı var. Affedişle yeni sayfa açılabilir.',
    reversed:
      'Aşırı yargı veya geçmişe takılma gelecekte ilerlemeyi zorlaştırabilir. Kapanmamış konular huzuru bozar.',
    keywords: ['yüzleşme', 'karar', 'yenilenme', 'affediş'],
    context:
      'İlişimin geleceği karar ve affedişle şekillenecek. Yeni bir sayfa açma zamanı gelecek.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_ra_pos7',
    card: 'The World',
    position: 7,
    upright:
      'İlişimin geleceğinde tamamlanma, bütünlük ve kutlama var. Bir döngü başarıyla kapanıyor.',
    reversed:
      'Eksik kalan adımlar veya tamamlanmamışlık hissi gelecekte tatminsizlik doğurabilir. Döngüyü kapatmak şart.',
    keywords: ['tamamlanma', 'bütünlük', 'kutlama', 'denge'],
    context:
      'İlişimin geleceği tamamlanma ve bütünlükle taçlanacak. Ama eksikler kapanmalı.',
    group: 'Majör Arkana',
  },

  // CUPS (Kupalar)
  {
    id: 'ace_of_cups_ra_pos7',
    card: 'Ace of Cups',
    position: 7,
    upright:
      'Gelecekte ilişkine duygusal bir başlangıç ve taze bir sevgi akışı doğacak. Kalplerin açılması yeni bir döngü başlatacak.',
    reversed:
      'Duyguların bastırılması veya ifade edilememesi gelecekte bağın önünü tıkayabilir. Kalp kapalı kaldıkça doyum azalır.',
    keywords: ['başlangıç', 'sevgi', 'akış', 'açılım'],
    context:
      'İlişimin geleceği duygusal bir açılışla güçlenecek. Ama kalpler kapanırsa mesafe büyür.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_ra_pos7',
    card: 'Two of Cups',
    position: 7,
    upright:
      'Gelecekte karşılıklı anlayış ve uyum öne çıkacak. Birlikte kurulan köprü bağın temelini sağlamlaştıracak.',
    reversed:
      'Yanlış anlaşılmalar veya dengesizlik gelecekte uyumu zorlayabilir. Karşılıklılık korunmazsa güven sarsılır.',
    keywords: ['uyum', 'karşılıklılık', 'aşk', 'bağ'],
    context:
      'İlişimin geleceği eşitlik ve uyumla büyüyecek. Ama denge kaybolursa sorun çıkabilir.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_ra_pos7',
    card: 'Three of Cups',
    position: 7,
    upright:
      'İlişimin geleceğinde kutlamalar, dostane çevre ve ortak sevinçler olacak. Paylaşılan mutluluk bağı güçlendirecek.',
    reversed:
      'Üçüncü kişilerin etkisi veya yüzeysellik gelecekte bağın enerjisini zayıflatabilir. Samimiyet korunmalı.',
    keywords: ['kutlama', 'dostluk', 'paylaşım', 'sevinç'],
    context:
      'İlişimin geleceği neşeyle ve sosyal destekle beslenecek. Ama yüzeysellik riski var.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_ra_pos7',
    card: 'Four of Cups',
    position: 7,
    upright:
      'Gelecekte tatminsizlik ve içe dönüş dönemleri olabilir. Fark edilmeyen fırsatlar önüne gelecek.',
    reversed:
      'Yeni farkındalıklar doğacak, şükranla birlikte kalp açılacak. Tatminsizlik yavaş yavaş dağılacak.',
    keywords: ['tatminsizlik', 'farkındalık', 'içe dönüş', 'uyanış'],
    context:
      'İlişimin geleceği şükranla yeniden canlanacak. Fırsatlar görünür hale gelecek.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_ra_pos7',
    card: 'Five of Cups',
    position: 7,
    upright:
      'Gelecekte kayıplar ve hayal kırıklıklarıyla yüzleşmek gerekebilir. Ama elde kalan bağ umut taşıyacak.',
    reversed:
      'Toparlanma ve yeniden umut bulma süreci başlayacak. Geçmişin gölgesi hafiflerken bağ yeniden canlanabilir.',
    keywords: ['kayıp', 'yas', 'umut', 'kabul'],
    context:
      'İlişimin geleceği kabullenmeyle şifalanacak. Umut yeniden kök salacak.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_ra_pos7',
    card: 'Six of Cups',
    position: 7,
    upright:
      'İlişimin geleceğinde nostalji ve geçmişten gelen sıcaklık öne çıkacak. Masumiyet yeniden bağa dokunacak.',
    reversed:
      'Geçmişe fazla tutunmak gelecekte ilerlemeyi zorlaştırabilir. Hatıralar yük olmamalı.',
    keywords: ['geçmiş', 'nostalji', 'masumiyet', 'anı'],
    context:
      'İlişimin geleceği hatıralarla yumuşayacak. Ama geçmişe saplanmamak önemli.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_ra_pos7',
    card: 'Seven of Cups',
    position: 7,
    upright:
      'Gelecekte çok sayıda seçenek ve hayal gündeme gelebilir. Gerçekçi ölçülerle seçim yapılmalı.',
    reversed:
      'Belirsizlik sona eriyor, netlik kazanılacak. Hayaller ayıklanıp somut gerçeklere dönüştürülecek.',
    keywords: ['seçenek', 'hayal', 'netlik', 'karar'],
    context:
      'İlişimin geleceği seçimlerle şekillenecek. Netlik bağın yönünü belirleyecek.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_ra_pos7',
    card: 'Eight of Cups',
    position: 7,
    upright:
      'Gelecekte daha derin anlam arayışı gündeme gelecek. Eskiyi bırakıp yeni yola çıkmak gerekebilir.',
    reversed:
      'Gitmekle kalmak arasında kararsızlık sürebilir. Kapanmamışlık gelecekte ağırlık yapabilir.',
    keywords: ['ayrılış', 'yol', 'anlam', 'arayış'],
    context:
      'İlişimin geleceği derin bir yolculuğa işaret ediyor. Seçim kalbin doğrusu olacak.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_ra_pos7',
    card: 'Nine of Cups',
    position: 7,
    upright:
      'Gelecekte tatmin, huzur ve dileklerin gerçekleşmesi öne çıkacak. Kalplerin arzusu doyuma ulaşabilir.',
    reversed:
      'Yüzeysel tatmin veya doyumsuzluk gelecekte gölge yaratabilir. Gerçek mutluluk içtenlikte saklıdır.',
    keywords: ['tatmin', 'dilek', 'huzur', 'doyum'],
    context:
      'İlişimin geleceği huzurlu doyuma işaret ediyor. Yüzeysellikten uzak durmak şart.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_ra_pos7',
    card: 'Ten of Cups',
    position: 7,
    upright:
      'Gelecekte uyumlu birlik ve aile huzuru öne çıkacak. Tamamlanmışlık duygusu bağın tacı olacak.',
    reversed:
      'İdeal ile gerçek arasındaki fark huzuru gölgeleyebilir. Samimi paylaşım boşluğu kapatır.',
    keywords: ['uyum', 'aile', 'tamamlanma', 'birlik'],
    context:
      'İlişimin geleceği mutluluk ve birlik ile taçlanacak. Ama gerçekçilik korunmalı.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_ra_pos7',
    card: 'Page of Cups',
    position: 7,
    upright:
      'Gelecekte masum duygular ve yaratıcılık öne çıkacak. Küçük ilhamlar bağa canlılık katacak.',
    reversed:
      'Aşırı hassasiyet veya gerçeklerden kaçış gelecekte sorun yaratabilir. Hayaller somutlanmalı.',
    keywords: ['masumiyet', 'ilham', 'hassasiyet', 'duygu'],
    context:
      'İlişimin geleceği saf duygularla canlanacak. Ama kaçış yerine yaratıcılık gerek.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_ra_pos7',
    card: 'Knight of Cups',
    position: 7,
    upright:
      'Gelecekte romantik teklifler ve kalpten hareketler öne çıkacak. Duygusal cesaret bağa tazelik katacak.',
    reversed:
      'Tutarsız vaatler veya aşırı romantizm gelecekte hayal kırıklığı doğurabilir. Netlik ve dürüstlük korunmalı.',
    keywords: ['romantizm', 'cesaret', 'teklif', 'vizyon'],
    context:
      'İlişimin geleceği romantik adımlarla renk kazanacak. Ama tutarlılık şart.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_ra_pos7',
    card: 'Queen of Cups',
    position: 7,
    upright:
      'Gelecekte empati ve şefkatli liderlik öne çıkacak. Partnerini anlamak bağın güvenli alanını büyütecek.',
    reversed:
      'Duygusal sınırların silinmesi veya fazla hassasiyet gelecekte zorlayıcı olabilir. Öz düzenleme korunmalı.',
    keywords: ['empati', 'şefkat', 'sezgi', 'güven'],
    context:
      'İlişimin geleceği şefkat ve empatiyle korunacak. Ama sınırların erimemesi gerekiyor.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_ra_pos7',
    card: 'King of Cups',
    position: 7,
    upright:
      'Gelecekte duygusal olgunluk ve bilgece liderlik öne çıkacak. Fırtınada sakin kalmak bağa güven verecek.',
    reversed:
      'Bastırılmış öfke veya pasif agresyon gelecekte ilişkiye gölge düşürebilir. Açık ifade dengeyi kurar.',
    keywords: ['olgunluk', 'liderlik', 'duygu yönetimi', 'sükunet'],
    context:
      'İlişimin geleceği olgun duygularla büyüyecek. Açıklık güvenin temeli olacak.',
    group: 'Kupalar',
  },

  // SWORDS (Kılıçlar)
  {
    id: 'ace_of_swords_ra_pos7',
    card: 'Ace of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde netlik ve gerçeğin açığa çıkışı olacak. Açık sözler bağın yönünü berraklaştıracak.',
    reversed:
      'Bulanıklık ve iletişim kopukluğu gelecekte güveni sarsabilir. Hakikat saklanırsa bağ bulanır.',
    keywords: ['netlik', 'hakikat', 'karar', 'açıklık'],
    context:
      'İlişimin geleceği hakikatle berraklaşacak. Ama saklama bulanıklık getirir.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_ra_pos7',
    card: 'Two of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde ikilemler ve karar anları olacak. Dengeyi korumak için kalp ve akıl birlikte dinlenmeli.',
    reversed:
      'Kararsızlık sürerse ilişki sıkışabilir. Gözleri kapalı kalmak geleceği zorlaştırır.',
    keywords: ['ikilem', 'karar', 'denge', 'yüzleşme'],
    context:
      'İlişimin geleceği seçimlerle şekillenecek. Kararsızlık uzun sürerse sorun yaratır.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_ra_pos7',
    card: 'Three of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde kırgınlık veya kalp yarası gündeme gelebilir. Ama acının farkına varmak şifayı başlatır.',
    reversed:
      'Geçmiş kırgınlıkların iyileşmesi mümkün olacak. Affediş kalbi özgürleştirecek.',
    keywords: ['kırgınlık', 'acı', 'affediş', 'şifa'],
    context:
      'İlişimin geleceği kalp yarasının şifasıyla açılacak. Yüzleşmek iyileşme getirecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_ra_pos7',
    card: 'Four of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde sakinleşme ve dinlenme dönemi olacak. Zihin ve kalp toparlanma ihtiyacı duyacak.',
    reversed:
      'Dinlenmeyi reddetmek gelecekte tükenmişlik doğurabilir. Küçük molalar bağ için şart.',
    keywords: ['dinlenme', 'toparlanma', 'sessizlik', 'yenilenme'],
    context:
      'İlişimin geleceği sükunetle güçlenecek. Dinlenme reddi bağa zarar verir.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_ra_pos7',
    card: 'Five of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde çatışma sonrası kazan-kaybet hissi olabilir. Haklı çıkmak yerine köprüleri korumak önem kazanacak.',
    reversed:
      'Onarım ve affediş gelecekte mümkün olacak. Ego bırakıldığında bağ yeniden kurulacak.',
    keywords: ['çatışma', 'ego', 'haklılık', 'onarım'],
    context:
      'İlişimin geleceği çatışmalardan dersle şekillenecek. Affetmek köprüleri güçlendirecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_ra_pos7',
    card: 'Six of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde daha sakin sulara yolculuk var. Birlikte sorunlardan uzaklaşma şansı doğacak.',
    reversed:
      'Geçmişi geride bırakmak zor olabilir. Bağları çözmeden yeni yolculuk zorlaşır.',
    keywords: ['geçiş', 'sükunet', 'uzaklaşma', 'yenilenme'],
    context:
      'İlişimin geleceği güvenli geçişlerle şekillenecek. Geçmişten kopuş kolay olmayabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_ra_pos7',
    card: 'Seven of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde stratejik adımlar ve dikkatli ilerleyiş olacak. Her şey açık konuşulmazsa bile niyet temiz olmalı.',
    reversed:
      'Gizlilik veya yarım doğrular gelecekte güveni zedeleyebilir. Şeffaflık zorunlu olacak.',
    keywords: ['strateji', 'gizlilik', 'niyet', 'güven'],
    context:
      'İlişimin geleceği akıllı stratejilerle ilerleyecek. Ama gizlilik sınırını aşmamalı.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_ra_pos7',
    card: 'Eight of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde zihinsel sınırlamalar veya korkular etkili olabilir. Küçük farkındalıklar özgürleşmeyi başlatacak.',
    reversed:
      'Zincirler çözülmeye başlanacak. Ama korkular tekrar yüzeye çıkabilir.',
    keywords: ['kısıt', 'korku', 'özgürleşme', 'zihin tuzağı'],
    context:
      'İlişimin geleceği özgürleşme fırsatı taşıyor. Ama korkular zincir vurabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_ra_pos7',
    card: 'Nine of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde kaygı ve uykusuzluk dönemleri olabilir. Korkular büyütülürse bağ yorulabilir.',
    reversed:
      'Sabahın netliğiyle kaygılar çözülmeye başlayacak. Gerçeklik kontrolü bağa huzur getirecek.',
    keywords: ['kaygı', 'kabus', 'korku', 'gerçeklik'],
    context:
      'İlişimin geleceği kaygılarla sınanabilir. Ama yüzleşme huzuru getirecek.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_ra_pos7',
    card: 'Ten of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde bir döngü tamamlanacak. Bitişle birlikte yeni başlangıca yer açılacak.',
    reversed:
      'Toparlanma ve yeniden doğuş süreci başlayacak. Geçmişin yükü geride kalacak.',
    keywords: ['bitiş', 'teslimiyet', 'yenilenme', 'başlangıç'],
    context:
      'İlişimin geleceği kapanış ve yenilenmeyle şekillenecek. Bitiş yeni bir kapı açacak.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_ra_pos7',
    card: 'Page of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde merak, iletişim ve yeni öğrenmeler öne çıkacak. Küçük keşifler bağa canlılık katacak.',
    reversed:
      'Acele yargılar veya dedikodular gelecekte sorun çıkarabilir. Dürüst iletişim korunmalı.',
    keywords: ['merak', 'iletişim', 'öğrenme', 'keşif'],
    context:
      'İlişimin geleceği merak ve iletişimle güçlenecek. Ama acele yargıdan kaçınmalı.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_ra_pos7',
    card: 'Knight of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde hızlı adımlar ve kararlılık öne çıkacak. Netlik bağa ivme katacak.',
    reversed:
      'Acelecilik veya öfke patlamaları gelecekte dengeyi bozabilir. Sabır ve nefes şart.',
    keywords: ['hız', 'kararlılık', 'netlik', 'ivme'],
    context:
      'İlişimin geleceği hızlı kararlarla ivme kazanacak. Ama acelecilik sorun olabilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_ra_pos7',
    card: 'Queen of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde netlik, nesnellik ve bağımsız düşünce öne çıkacak. Açık söz bağa güven katacak.',
    reversed:
      'Aşırı eleştirellik veya soğukluk gelecekte mesafe yaratabilir. Şefkat dengesi önemli.',
    keywords: ['netlik', 'bağımsızlık', 'nesnellik', 'iletişim'],
    context:
      'İlişimin geleceği netlik ve sağduyuyla korunacak. Ama soğukluk bağa zarar verebilir.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_ra_pos7',
    card: 'King of Swords',
    position: 7,
    upright:
      'İlişimin geleceğinde stratejik akıl ve adil liderlik öne çıkacak. Etik duruş bağa güven katacak.',
    reversed:
      'Katı düşünceler veya empati eksikliği gelecekte soğukluk getirebilir. Denge için anlayış şart.',
    keywords: ['strateji', 'adalet', 'otorite', 'etik'],
    context:
      'İlişimin geleceği adil akılla güçlenecek. Ama empatisizlik uzaklık yaratabilir.',
    group: 'Kılıçlar',
  },

  // WANDS (Asalar)
  {
    id: 'ace_of_wands_ra_pos7',
    card: 'Ace of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde yeni bir enerji ve güçlü bir başlangıç kıvılcımı olacak. Tutku, bağa canlılık katacak.',
    reversed:
      'İlham eksikliği veya gecikmiş başlangıçlar gelecekte bağın enerjisini düşürebilir. Küçük adımlar kıvılcımı yeniden yakar.',
    keywords: ['başlangıç', 'ilham', 'tutku', 'hareket'],
    context:
      'İlişimin geleceği taze bir enerjiyle canlanacak. Ama gecikme kıvılcımı söndürebilir.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_ra_pos7',
    card: 'Two of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde planlar ve yeni ufuklara açılma isteği öne çıkacak. Ortak vizyon bağa yön verecek.',
    reversed:
      'Kararsızlık veya vizyonsuzluk gelecekte ilerlemeyi engelleyebilir. Plan netleştirilmezse bağ sıkışır.',
    keywords: ['vizyon', 'plan', 'ufuk', 'karar'],
    context:
      'İlişimin geleceği ortak vizyonla güçlenecek. Ama kararsızlık yolunu tıkayabilir.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_ra_pos7',
    card: 'Three of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde genişleme ve fırsatlar öne çıkacak. Ortak emeklerin meyvesi görünmeye başlayacak.',
    reversed:
      'Dar bakış veya gecikme gelecekte hayal kırıklığı yaratabilir. Ufku genişletmek şart.',
    keywords: ['fırsat', 'genişleme', 'vizyon', 'ilerleme'],
    context:
      'İlişimin geleceği büyüme fırsatlarıyla açılacak. Ama dar bakışlılık riski var.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_ra_pos7',
    card: 'Four of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde istikrar, kutlama ve bir eşik olacak. Güvenli alan bağın temeli olacak.',
    reversed:
      'Geçici düzensizlik veya aidiyet eksikliği gelecekte huzuru zorlayabilir. Ritüeller köprü kurar.',
    keywords: ['istikrar', 'kutlama', 'aidiyet', 'eşik'],
    context:
      'İlişimin geleceği kutlamalarla ve sağlam temelle güçlenecek. Ama düzensizlik riski var.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_ra_pos7',
    card: 'Five of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde küçük çatışmalar veya rekabet enerjisi olabilir. Sağlıklı tartışma ilerlemeyi destekleyecek.',
    reversed:
      'Bastırılmış öfke veya çözülmeyen gerilim gelecekte büyüyebilir. Açık diyalog şart olacak.',
    keywords: ['çatışma', 'rekabet', 'gerilim', 'diyalog'],
    context:
      'İlişimin geleceği küçük gerilimlerle sınanacak. Ama sağlıklı diyalog ilerletir.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_ra_pos7',
    card: 'Six of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde başarı ve görünürlük öne çıkacak. Birlikte kazanılan zaferler bağa gurur katacak.',
    reversed:
      'Takdir eksikliği veya gizli kıskançlık gelecekte sorun yaratabilir. Paylaşım açık olmalı.',
    keywords: ['zafer', 'tanınma', 'başarı', 'gurur'],
    context:
      'İlişimin geleceği ortak başarılarla güçlenecek. Ama takdir eksikliği sorun olabilir.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_ra_pos7',
    card: 'Seven of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde pozisyonunu savunma ihtiyacı doğabilir. Net sınırlar bağın gücünü koruyacak.',
    reversed:
      'Aşırı savunmacılık veya yorgunluk gelecekte bağı yorabilir. Esneklik şart olacak.',
    keywords: ['savunma', 'sınır', 'mücadele', 'dayanıklılık'],
    context:
      'İlişimin geleceği sınır korumakla şekillenecek. Ama aşırı savunma yorucu olabilir.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_ra_pos7',
    card: 'Eight of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde hızlı gelişmeler ve net mesajlar olacak. İletişim akışı bağa ivme katacak.',
    reversed:
      'Gecikmeler veya yanlış anlaşılmalar gelecekte iletişimi zorlaştırabilir. Sade dil çözüm getirir.',
    keywords: ['hız', 'mesaj', 'ivme', 'iletişim'],
    context:
      'İlişimin geleceği hız ve iletişimle güçlenecek. Ama yanlış anlamalar risktir.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_ra_pos7',
    card: 'Nine of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde dayanıklılık ve son viraj enerjisi olacak. Azim bağın korunmasını sağlayacak.',
    reversed:
      'Tükenmişlik veya fazla tetikte olma gelecekte bağı yorabilir. Destek almak şart olacak.',
    keywords: ['dayanıklılık', 'koruma', 'azim', 'süreç'],
    context:
      'İlişimin geleceği sabır ve dirençle korunacak. Ama tükenmişlik riski var.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_ra_pos7',
    card: 'Ten of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde yüklerin artması ve sorumlulukların yoğunlaşması olabilir. Paylaşım yükü hafifletecek.',
    reversed:
      'Aşırı sorumluluklar veya yükleri bırakmamak gelecekte bağı zorlayabilir. Sadeleşmek gerekiyor.',
    keywords: ['yük', 'sorumluluk', 'tamamlama', 'dayanıklılık'],
    context:
      'İlişimin geleceği sorumluluklarla sınanacak. Ama paylaşım çözüm olacak.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_ra_pos7',
    card: 'Page of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde merak ve keşif enerjisi öne çıkacak. Küçük adımlar bağı heyecanla besleyecek.',
    reversed:
      'Dağınık ilgi veya çabuk sıkılma gelecekte istikrarsızlık getirebilir. Odaklanmak önemli.',
    keywords: ['merak', 'keşif', 'heves', 'deneyim'],
    context:
      'İlişimin geleceği keşiflerle canlanacak. Ama dağınıklık sorun olabilir.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_ra_pos7',
    card: 'Knight of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde tutku, hız ve cesur adımlar öne çıkacak. Atılganlık bağa heyecan verecek.',
    reversed:
      'Düşünmeden yapılan hamleler veya savrukluk gelecekte hayal kırıklığı yaratabilir. Taahhütlere sadakat şart.',
    keywords: ['cesaret', 'tutku', 'hız', 'hamle'],
    context:
      'İlişimin geleceği tutkulu adımlarla ilerleyecek. Ama savrukluk risk taşıyor.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_ra_pos7',
    card: 'Queen of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde çekim, sıcaklık ve güven öne çıkacak. Karizmatik enerji bağı güçlendirecek.',
    reversed:
      'Kıskançlık veya özgüven eksikliği gelecekte gölge yaratabilir. Öz değer bağın anahtarı olacak.',
    keywords: ['çekim', 'güven', 'sıcaklık', 'liderlik'],
    context:
      'İlişimin geleceği karizmatik enerjiyle büyüyecek. Ama kıskançlık riski var.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_ra_pos7',
    card: 'King of Wands',
    position: 7,
    upright:
      'İlişimin geleceğinde vizyoner liderlik ve stratejik enerji öne çıkacak. Cesur kararlar bağa yön verecek.',
    reversed:
      'Otoriterlik veya aşırı ego gelecekte gerilim yaratabilir. Dinleme gücü dengeyi kuracak.',
    keywords: ['vizyon', 'liderlik', 'cesaret', 'strateji'],
    context:
      'İlişimin geleceği güçlü liderlikle ilerleyecek. Ama ego riski var.',
    group: 'Asalar',
  },

  {
    id: 'ace_of_pentacles_ra_pos7',
    card: 'Ace of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde sağlam temeller ve yeni fırsatlar görünüyor. Maddi veya manevi güven bağı güçlendirecek.',
    reversed:
      'Fırsatların kaçırılması veya güvensizlik bağı yavaşlatabilir. Küçük adımlar istikrarı yeniden kurar.',
    keywords: ['fırsat', 'temel', 'güven', 'başlangıç'],
    context:
      'İlişimin geleceği sağlam adımlarla inşa edilecek. Ama güvensizlik riski var.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_ra_pos7',
    card: 'Two of Pentacles',
    position: 7,
    upright:
      'Gelecekte denge, esneklik ve uyum arayışı öne çıkacak. İki tarafın sorumlulukları dengelemesi gerekebilir.',
    reversed:
      'Aşırı yüklenme veya erteleme gelecekte bağı zorlayabilir. Önceliklendirme şart olacak.',
    keywords: ['denge', 'esneklik', 'uyum', 'sorumluluk'],
    context:
      'İlişimin geleceği dengeli adımlarla sürdürülecek. Ama erteleme bağı zayıflatabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_ra_pos7',
    card: 'Three of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde işbirliği ve ortak emek öne çıkacak. Birlikte inşa edilen şeyler kalıcı olacak.',
    reversed:
      'Rol belirsizlikleri veya uyumsuz işbirliği gelecekte sıkıntı yaratabilir. Şeffaflık gerekecek.',
    keywords: ['işbirliği', 'inşa', 'rol', 'uyum'],
    context:
      'İlişimin geleceği ortak emekle yükselecek. Ama belirsizlik engelleyebilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_ra_pos7',
    card: 'Four of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde güvenlik ve korunma isteği öne çıkacak. Sağlam bağ aidiyet hissi yaratacak.',
    reversed:
      'Aşırı sahiplenme veya korkular bağı gelecekte daraltabilir. Paylaşım alan açar.',
    keywords: ['güvenlik', 'sahiplenme', 'aidiyet', 'denge'],
    context:
      'İlişimin geleceği güven duygusuyla korunacak. Ama aşırı tutma sorun olabilir.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_ra_pos7',
    card: 'Five of Pentacles',
    position: 7,
    upright:
      'Gelecekte yoksunluk algısı veya destek ihtiyacı öne çıkabilir. Zorluklar birlikte aşılmalı.',
    reversed:
      'Toparlanma ve destek görme bağı gelecekte güçlendirecek. Umut kendini gösterecek.',
    keywords: ['yoksunluk', 'destek', 'umut', 'birlik'],
    context:
      'İlişimin geleceği zorluklarla test edilecek. Ama destek iyileştirici olacak.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_ra_pos7',
    card: 'Six of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde denge, adalet ve karşılıklılık öne çıkacak. Paylaşım güven yaratacak.',
    reversed:
      'Güç dengesizliği veya koşullu verme–alma gelecekte sorun olabilir. Dengeye dikkat edilmeli.',
    keywords: ['paylaşım', 'denge', 'adalet', 'güven'],
    context:
      'İlişimin geleceği adil paylaşım üzerine kurulacak. Ama eşitsizlik riski var.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_ra_pos7',
    card: 'Seven of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde sabır ve değerlendirme dönemi olacak. Emeklerin karşılığı zamanla alınacak.',
    reversed:
      'Sabırsızlık veya verimsizlik hissi gelecekte umutsuzluk yaratabilir. Değerlendirme şart olacak.',
    keywords: ['sabır', 'değerlendirme', 'emek', 'hasat'],
    context:
      'İlişimin geleceği sabırlı yatırımlarla büyüyecek. Ama sabırsızlık riski var.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_ra_pos7',
    card: 'Eight of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde emek, disiplin ve öğrenme öne çıkacak. Adım adım ustalaşma bağı güçlendirecek.',
    reversed:
      'İhmal veya özensizlik gelecekte bağın kalitesini düşürebilir. Süreklilik önemli olacak.',
    keywords: ['emek', 'disiplin', 'öğrenme', 'süreklilik'],
    context:
      'İlişimin geleceği düzenli emekle güzelleşecek. Ama özensizlik riski var.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_ra_pos7',
    card: 'Nine of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde özgüven, bağımsızlık ve zarif uyum olacak. Kendi değerini bilmek bağa güç katacak.',
    reversed:
      'Aşırı bağımlılık veya öz değer sorunları gelecekte bağı zorlayabilir. Bireysellik korunmalı.',
    keywords: ['öz değer', 'bağımsızlık', 'zarafet', 'denge'],
    context:
      'İlişimin geleceği öz değer bilinciyle büyüyecek. Ama bağımlılık riski var.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_ra_pos7',
    card: 'Ten of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde uzun vadeli güvenlik ve köklü yapı olacak. Ailevi ve manevi bağlar güçlenecek.',
    reversed:
      'Maddi sürtüşmeler veya ailevi sorunlar gelecekte dengeyi bozabilir. Açık diyalog şart olacak.',
    keywords: ['istikrar', 'aile', 'köklülük', 'güven'],
    context:
      'İlişimin geleceği köklü bir güvenle büyüyecek. Ama sürtüşme riski var.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_ra_pos7',
    card: 'Page of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde öğrenme ve yeni hedefler öne çıkacak. Somut adımlar bağa yeni kapılar açacak.',
    reversed:
      'Erteleme veya dağınıklık gelecekte ilerlemeyi zorlaştırabilir. Küçük hedefler çözüm getirir.',
    keywords: ['öğrenme', 'hedef', 'başlangıç', 'adım'],
    context:
      'İlişimin geleceği küçük hedeflerle ilerleyecek. Ama erteleme riski var.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_ra_pos7',
    card: 'Knight of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde istikrarlı, sabırlı ve güvenilir bir ilerleyiş olacak. Yavaş ama emin adımlar bağa kalıcılık katacak.',
    reversed:
      'Durağanlık veya inat gelecekte ilerlemeyi zorlaştırabilir. Küçük yenilikler gerekebilir.',
    keywords: ['istikrar', 'sabır', 'güvenilirlik', 'emek'],
    context:
      'İlişimin geleceği sabırlı ilerleyişle sağlamlaşacak. Ama durağanlık riski var.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_ra_pos7',
    card: 'Queen of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde şefkat, pratik destek ve güvenli alan öne çıkacak. Bakım enerjisi bağa huzur katacak.',
    reversed:
      'Aşırı yüklenme veya ihmal gelecekte dengeyi bozabilir. Öz bakım hatırlanmalı.',
    keywords: ['şefkat', 'pratiklik', 'bakım', 'denge'],
    context:
      'İlişimin geleceği şefkatli alanla büyüyecek. Ama ihmal riski var.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_ra_pos7',
    card: 'King of Pentacles',
    position: 7,
    upright:
      'İlişimin geleceğinde sağlamlık, liderlik ve uzun vadeli güven olacak. Maddi ve manevi destek bağı güçlendirecek.',
    reversed:
      'Kontrolcülük veya statü kaygısı gelecekte yakınlığı zorlayabilir. Paylaşım denge kurar.',
    keywords: ['sağlamlık', 'liderlik', 'güven', 'istikrar'],
    context:
      'İlişimin geleceği sağlam temellerle ilerleyecek. Ama kontrol riski var.',
    group: 'Tılsımlar',
  },
];

// Kart adına göre pozisyon 7 anlamını bulma fonksiyonu
export const getPosition7Meaning = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
  return position7Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getRelationshipAnalysisPosition7Meaning = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
  return getPosition7Meaning(cardName);
};

// Kart adına göre pozisyon 7 anlamını bulma fonksiyonu (ana index için)
export const getRelationshipAnalysisPosition7MeaningByCardName = (
  cardName: string
): RelationshipAnalysisPositionMeaning | undefined => {
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
  (): RelationshipAnalysisPositionMeaning[] => {
    return position7Meanings;
  };

// Pozisyon 7 anlamlarını filtreleme fonksiyonu
export const getPosition7MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): RelationshipAnalysisPositionMeaning[] => {
  return position7Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 7 anlamlarını arama
export const searchPosition7MeaningsByKeyword = (
  keyword: string
): RelationshipAnalysisPositionMeaning[] => {
  return position7Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position7Meanings,
  getRelationshipAnalysisPosition7Meaning,
  getRelationshipAnalysisPosition7MeaningByCardName,
  getAllPosition7Meanings: getAllPosition7Meanings,
  getRelationshipAnalysisPosition7MeaningsByGroup: getPosition7MeaningsByGroup,
};
