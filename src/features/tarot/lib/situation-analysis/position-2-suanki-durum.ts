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
- position2Meanings: gerekli
- getposition2Meaning: gerekli
*/

import { SituationAnalysisPositionMeaning } from './position-meanings-index';

// 2  . Pozisyon (Geçmiş ya da Sebepler) - 78 Tarot kartı
export const position2Meanings: SituationAnalysisPositionMeaning[] = [
  // MAJÖR ARKANA
  {
    id: 'the_fool_sa_pos2',
    card: 'The Fool',
    position: 2,
    upright:
      'Joker, şu anki durumunuzda özgür ruhlu, keşif arzusuyla dolu ve yeni başlangıçlara açık bir enerjiyi simgeler. Hayata karşı heyecan ve merakla bakıyor, yeni fırsatları değerlendirmeye hazır olabilirsiniz. İçinizde güçlü bir keşfetme dürtüsü var.\n\nBu kart, şu anda bulunduğunuz durumda risk almanın, sezgilerinize güvenmenin ve cesur adımlar atmanın önemini vurgular.',
    reversed:
      'Ters Joker, şu anki durumunuzda dikkatsizlik, plansızlık veya gereksiz risk alma eğilimini simgeler. Belki de yönünüzü tam olarak bulamıyor, kararlarınızı aceleyle veriyor olabilirsiniz. Bu durum, hata yapma olasılığını artırıyor.\n\nKart, aynı zamanda yeni bir başlangıçtan korktuğunuzu veya adım atmakta tereddüt ettiğinizi de gösterebilir.',
    keywords: ['başlangıç', 'özgürlük', 'risk', 'merak', 'şimdi'],
    context:
      'Şu anki durumunuzda yeni başlangıçlara açıklık veya dikkatsizlik enerjisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_magician_sa_pos2',
    card: 'The Magician',
    position: 2,
    upright:
      'Büyücü, şu anda yaratıcılığınızın, kaynaklarınızın ve niyetinizin güçlü bir şekilde aktif olduğunu simgeler. Elinizdeki araçları doğru kullanarak hayatınızı şekillendirme gücüne sahipsiniz. Zihniniz ve eylemleriniz arasında uyum var.\n\nBu kart, şu an kendinizi güçlü hissettiğinizi ve fırsatları değerlendirmeniz için doğru bir noktada olduğunuzu hatırlatır.',
    reversed:
      'Ters Büyücü, şu anki durumda enerjinizin dağınık olduğunu, odaklanmakta zorlandığınızı ya da potansiyelinizi tam olarak kullanamadığınızı gösterir. Belki de dışsal manipülasyonlarla karşı karşıyasınız ya da kendi gücünüzü küçümsüyorsunuz.\n\nBu kart, dikkatli olmanız ve enerjinizi doğru kanallara yönlendirmeniz gerektiğini vurgular.',
    keywords: ['yaratıcılık', 'niyet', 'kaynak', 'güç', 'şimdi'],
    context: 'Şu anki durumda yaratıcı gücün doğru ya da yanlış kullanımı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_high_priestess_sa_pos2',
    card: 'The High Priestess',
    position: 2,
    upright:
      'Başrahibe, şu anki durumda sezgilerinize, içsel bilginize ve bilinçaltınızdan gelen işaretlere yönelmeniz gerektiğini gösterir. İçsel rehberliğiniz güçlü ve size doğru yolu işaret ediyor olabilir.\n\nBu kart, şu an fazla konuşmak ya da dışa dönük olmak yerine, içe dönüp sessizlikten güç almanın önemini vurgular.',
    reversed:
      'Ters Başrahibe, şu an sezgilerinizi görmezden geldiğinizi, içsel rehberliğinizi bastırdığınızı veya bilinçaltınızdaki gerçeklerle yüzleşmekten kaçtığınızı gösterir. Bilgi var ama erişim zor olabilir.\n\nBu kart, sezgilerinizi reddetmenin ya da gerçekleri görmezden gelmenin şu anki sıkışıklığı artırabileceğini hatırlatır.',
    keywords: ['sezgi', 'bilgelik', 'içsel bilgi', 'gizli', 'şimdi'],
    context: 'Şu anki durumda sezgilerin ve içsel bilgeliğin rolü.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_empress_sa_pos2',
    card: 'The Empress',
    position: 2,
    upright:
      'İmparatoriçe, şu anki durumda bereket, yaratıcılık ve doğayla güçlü bir bağ içinde olduğunuzu simgeler. Bu süreçte üretkenliğiniz artabilir ve projeleriniz meyve vermeye başlayabilir. Aynı zamanda şefkatli bir tavır içindesiniz.\n\nBu kart, şu an hayatınızda yeni şeyler yaratma ve kendinizi ifade etme potansiyelinizin çok güçlü olduğunu vurgular.',
    reversed:
      'Ters İmparatoriçe, şu an yaratıcı enerjinizin tıkanmış olduğunu, üretkenlikte zorluk yaşadığınızı veya bağımlılıklarla boğuştuğunuzu gösterebilir. Kendinizi ihmal ediyor ya da aşırı koruyucu bir tavır sergiliyor olabilirsiniz.\n\nBu kart, şefkat enerjisini yeniden dengelemeniz gerektiğini anlatır.',
    keywords: ['bereket', 'yaratıcılık', 'doğa', 'şefkat', 'şimdi'],
    context: 'Şu anki durumda yaratıcılık ve şefkat enerjisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_emperor_sa_pos2',
    card: 'The Emperor',
    position: 2,
    upright:
      'İmparator, şu anda düzen, otorite ve yapı kurma enerjisini simgeler. Hayatınızı belirli bir disiplin ve kararlılıkla yönlendirme çabasındasınız. Güvenilirlik ve kararlılık ön planda.\n\nBu kart, şu an güçlü bir liderlik tavrı sergilediğinizi veya böyle bir figürün hayatınızda etkili olduğunu gösterir.',
    reversed:
      'Ters İmparator, şu an otoriteyle çatışma yaşadığınızı, düzen kurmakta zorlandığınızı veya aşırı katı kurallardan bunaldığınızı gösterir. Belki de kontrolü kaybettiğinizi hissediyorsunuz.\n\nBu kart, gücü baskıya dönüştürmeden dengeyi bulmanız gerektiğini hatırlatır.',
    keywords: ['düzen', 'otorite', 'kontrol', 'kararlılık', 'şimdi'],
    context: 'Şu anki durumda otorite ve düzenin rolü.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hierophant_sa_pos2',
    card: 'The Hierophant',
    position: 2,
    upright:
      'Aziz, şu anda geleneksel bilgeliğe, öğretmenlere ya da rehberlik eden bir figüre ihtiyaç duyduğunuzu simgeler. Kurallar, düzen ve öğrenme süreci ön planda olabilir.\n\nBu kart, şu an rehberlik arayışında olduğunuzu veya öğrendiklerinizden güç aldığınızı vurgular.',
    reversed:
      'Ters Aziz, şu an kuralları sorguladığınızı, geleneklere karşı çıktığınızı ya da yanlış rehberliklerle karşı karşıya olduğunuzu gösterebilir. Otoriteyi kabul etmeme eğiliminde olabilirsiniz.\n\nBu kart, kendi yolunuzu çizme ihtiyacınızın arttığını hatırlatır.',
    keywords: ['öğreti', 'rehberlik', 'gelenek', 'bilgelik', 'şimdi'],
    context: 'Şu anki durumda rehberlik veya otoriteyle çatışma.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_lovers_sa_pos2',
    card: 'The Lovers',
    position: 2,
    upright:
      'Aşıklar, şu anki durumda önemli bir karar, ilişki ya da ortaklık enerjisini simgeler. Kalbinizi dinlemek ve doğru seçimler yapmak ön planda olabilir. Bir bağ veya uyum süreci yaşıyor olabilirsiniz.\n\nBu kart, şu anda sevgi ve bağlılık üzerinden hayatınızı şekillendirdiğinizi gösterir.',
    reversed:
      'Ters Aşıklar, şu anda yaşanan uyumsuzlukları, yanlış kararları veya ayrılıkları simgeler. Karar anında kalbinizi bastırmış ya da uyumdan uzaklaşmış olabilirsiniz.\n\nBu kart, seçimlerinizin sonuçlarını yeniden değerlendirmeniz gerektiğini hatırlatır.',
    keywords: ['ilişki', 'karar', 'uyum', 'seçim', 'şimdi'],
    context: 'Şu anki durumda ilişkiler ve kararların etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_chariot_sa_pos2',
    card: 'The Chariot',
    position: 2,
    upright:
      'Savaş Arabası, şu anki durumda kararlılık, irade gücü ve kontrolü simgeler. Hedefe odaklanarak ilerlemek için güçlü bir motivasyona sahipsiniz. Zorlukları aşmaya hazır görünüyorsunuz.\n\nBu kart, şu an iradenizi kullanarak başarıya doğru ilerlediğinizi hatırlatır.',
    reversed:
      'Ters Savaş Arabası, şu an kontrolü kaybettiğinizi, yönsüzlük yaşadığınızı veya dağınık bir enerjiyle ilerlediğinizi gösterebilir. Belki de hedeflerinize ulaşmakta zorlanıyorsunuz.\n\nBu kart, şu anda yeniden odaklanmanız ve kontrolü sağlamanız gerektiğini vurgular.',
    keywords: ['kararlılık', 'başarı', 'kontrol', 'irade', 'şimdi'],
    context: 'Şu anki durumda kontrol ve kararlılığın etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'strength_sa_pos2',
    card: 'Strength',
    position: 2,
    upright:
      'Güç, şu anki durumda sabır, cesaret ve içsel dayanıklılığı simgeler. Kendi içsel gücünüzü kullanarak zorlukların üstesinden geliyorsunuz. Bu süreçte sakinliğinizle öne çıkıyorsunuz.\n\nBu kart, şu an için yumuşak gücün ve öz güvenin önemini vurgular.',
    reversed:
      'Ters Güç, şu an sabırsızlık, öfke kontrolü sorunları veya özgüven eksikliği yaşadığınızı gösterebilir. İçsel gücünüzü hatırlamakta zorlanıyorsunuz.\n\nBu kart, şu anda kendinizi yeniden toparlamanız ve öz güveninizi güçlendirmeniz gerektiğini anlatır.',
    keywords: ['cesaret', 'dayanıklılık', 'özgüven', 'sabır', 'şimdi'],
    context: 'Şu anki durumda içsel gücün veya sabırsızlığın etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hermit_sa_pos2',
    card: 'The Hermit',
    position: 2,
    upright:
      'Ermiş, şu anki durumda içsel bir yolculuğu, yalnızlığı ve içe dönüklüğü simgeler. Kendinizi anlamak ve içsel cevaplar bulmak için geri çekilmiş olabilirsiniz.\n\nBu kart, şu an içsel rehberliğe odaklanmanız gerektiğini hatırlatır.',
    reversed:
      'Ters Ermiş, şu an aşırı izolasyon, yalnızlık ya da dış dünyadan kopukluk yaşadığınızı gösterir. İçsel rehberliğe ulaşmakta zorlanıyor olabilirsiniz.\n\nBu kart, şu an dengeyi bulmak için yalnızlıkla dış dünya arasında orta yolu bulmanız gerektiğini vurgular.',
    keywords: ['bilgelik', 'arayış', 'yalnızlık', 'içe dönüş', 'şimdi'],
    context: 'Şu anki durumda içsel yolculuğun veya izolasyonun etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'wheel_of_fortune_sa_pos2',
    card: 'The Wheel of Fortune',
    position: 2,
    upright:
      'Kader Çarkı, şu anda hayatınızda önemli bir değişim, şans döngüsü ya da beklenmedik fırsatlar yaşanabileceğini gösterir. Şu an değişim enerjisi yoğun.\n\nBu kart, şu an kaderin size sunduğu fırsatlara uyum sağlamanın önemini hatırlatır.',
    reversed:
      'Ters Kader Çarkı, şu anda talihsizlikler, tekrar eden döngüler ya da yanlış zamanlamalar yaşadığınızı gösterebilir. Aynı hataları tekrar ediyor olabilirsiniz.\n\nBu kart, şu an döngüleri kırmanız ve farklı bir yol denemeniz gerektiğini vurgular.',
    keywords: ['kader', 'değişim', 'şans', 'döngü', 'şimdi'],
    context: 'Şu anki durumda değişimlerin veya döngülerin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'justice_sa_pos2',
    card: 'Justice',
    position: 2,
    upright:
      'Adalet, şu anki durumda dürüstlük, adil kararlar ve sorumluluk bilinci ön planda. Şu anda gerçeklerle yüzleşme ve dengeli kararlar alma sürecindesiniz.\n\nBu kart, şu an objektiflik ve adaletin önemini vurgular.',
    reversed:
      'Ters Adalet, şu anda adaletsizlik, yanlış kararlar ya da sorumluluktan kaçış yaşanabileceğini gösterir. Gerçekleri görmezden geliyor olabilirsiniz.\n\nBu kart, şu an dürüstçe yüzleşmekten kaçınmamanız gerektiğini hatırlatır.',
    keywords: ['adalet', 'karar', 'denge', 'gerçek', 'şimdi'],
    context: 'Şu anki durumda adaletin ya da adaletsizliğin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_hanged_man_sa_pos2',
    card: 'The Hanged Man',
    position: 2,
    upright:
      'Asılan Adam, şu anki durumda farklı bir bakış açısı kazanma, teslimiyet ve sabır sürecindesiniz. Bu kart, olayları başka bir açıdan görmenizi sağlar.\n\nŞu an duraklamanın, size yeni farkındalıklar kazandırdığını hatırlatır.',
    reversed:
      'Ters Asılan Adam, şu an gereksiz fedakarlıklar, duraksama ya da ilerleyememe hissini simgeler. Belki de bırakmanız gereken şeylere tutunuyorsunuz.\n\nBu kart, şu anda esnek olup yenilenmeye izin vermeniz gerektiğini gösterir.',
    keywords: ['bakış açısı', 'teslimiyet', 'fedakarlık', 'duraklama', 'şimdi'],
    context: 'Şu anki durumda teslimiyetin veya durgunluğun etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'death_sa_pos2',
    card: 'Death',
    position: 2,
    upright:
      'Ölüm, şu anki durumda güçlü bir dönüşüm, bir bitiş ve yeniden doğuş sürecindesiniz. Artık eskiyi bırakıp yeniyi karşılamanın zamanı olabilir.\n\nBu kart, şu an değişime direnmek yerine onu kucaklamanız gerektiğini hatırlatır.',
    reversed:
      'Ters Ölüm, şu anda bitişlerden kaçındığınızı, değişime direnç gösterdiğinizi ya da kapanmamış bir sürecin sizi yorduğunu gösterir. Eskiyi bırakmadığınız için ilerleme gecikebilir.\n\nBu kart, şu an dönüşümün doğal akışına teslim olmanız gerektiğini vurgular.',
    keywords: ['dönüşüm', 'bitiş', 'yenilenme', 'değişim', 'şimdi'],
    context: 'Şu anki durumda dönüşümün ya da direncin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'temperance_sa_pos2',
    card: 'Temperance',
    position: 2,
    upright:
      'Denge, şu anki durumda uyum, sabır ve ölçülülük enerjisini simgeler. Şu anda orta yolu bulmaya ve hayatınızı dengelemeye çalışıyorsunuz.\n\nBu kart, şu anki süreçte sabırlı olmanız ve uyumlu hareket etmeniz gerektiğini hatırlatır.',
    reversed:
      'Ters Denge, şu an aşırılık, uyumsuzluk veya sabırsızlık yaşadığınızı gösterir. Dengeyi bulmakta zorlanıyor olabilirsiniz.\n\nBu kart, şu anda yaşamınızdaki aşırılıkları dengelemeniz gerektiğini vurgular.',
    keywords: ['denge', 'uyum', 'sabır', 'ölçülülük', 'şimdi'],
    context: 'Şu anki durumda denge veya uyumsuzluk etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_devil_sa_pos2',
    card: 'The Devil',
    position: 2,
    upright:
      'Şeytan, şu anki durumda bağımlılıklar, arzular veya kontrol eden bağlar ön planda olabilir. Güçlü bir tutku veya bağımlılık sizi etkiliyor olabilir.\n\nBu kart, şu an özgürleşme ihtiyacınızı vurgular.',
    reversed:
      'Ters Şeytan, şu an bağımlılıklardan kurtulma çabasında olduğunuzu ya da özgürleşme yolunda adımlar attığınızı simgeler. Zincirleri kırma enerjisi güçlüdür.\n\nBu kart, şu an bağımlılıklardan uzaklaşmanız için fırsat olduğunu hatırlatır.',
    keywords: ['bağımlılık', 'arzu', 'kontrol', 'özgürlük', 'şimdi'],
    context:
      'Şu anki durumda bağımlılıkların veya özgürleşme sürecinin etkisi.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_tower_sa_pos2',
    card: 'The Tower',
    position: 2,
    upright:
      'Kule, şu anki durumda ani sarsıntıları, beklenmedik değişimleri ve eski yapının yıkılmasını simgeler. Güvensiz temeller üzerinde duran her şey çözülüyor olabilir. Bu süreç rahatsız edici görünse de, gerçeği ortaya çıkarır ve yeniden inşa için alan açar.\n\nBu kart, şu an yaşadığınız sarsıntının uzun vadede sizi daha sağlam bir zemine taşıma potansiyeli taşıdığını hatırlatır.',
    reversed:
      'Ters Kule, şu anda yaklaşan bir sarsıntıyı ertelediğinizi, gerekli değişimi geciktirdiğinizi veya krizi küçümsediğinizi gösterebilir. Yıkımı tamamen önlemek mümkün olmasa da, kontrollü bir dönüşümle zararı azaltabilirsiniz.\n\nBu kart, direncin süreci uzattığını ve esnemekle kazanabileceğinizi vurgular.',
    keywords: ['kriz', 'değişim', 'yıkım', 'gerçek', 'şimdi'],
    context: 'Şu anki durumda sarsıcı ama arındırıcı değişim.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_star_sa_pos2',
    card: 'The Star',
    position: 2,
    upright:
      'Yıldız, şu an umut, şifa ve ilhamın hayatınızda belirginleştiğini simgeler. Zorlu dönemlerden sonra içsel dinginlik ve güven duygusu yeniden filizleniyor. Yolunuz netleşirken sezgisel rehberlikle ilerleyebilirsiniz.\n\nBu kart, şu an nazikçe toparlanmanın ve kendinize şefkatin önemini vurgular.',
    reversed:
      'Ters Yıldız, şu an umutsuzluk, ilham eksikliği ya da inancın zayıfladığını gösterebilir. Enerjiniz dağılmış, geleceğe dair parlak resmi görmekte zorlanıyor olabilirsiniz.\n\nBu kart, küçük ama tutarlı öz bakım adımlarıyla ışığınızı yeniden yakabileceğinizi hatırlatır.',
    keywords: ['umut', 'şifa', 'ilham', 'dinginlik', 'şimdi'],
    context: 'Şu anki durumda umut ve şifalanma arayışı.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_moon_sa_pos2',
    card: 'The Moon',
    position: 2,
    upright:
      'Ay, şu an belirsizlik, sezgisel sinyaller ve gölgede kalan konuların etkili olduğunu gösterir. Net olmayan bilgiler ve değişken duygular karar süreçlerinizi zorlayabilir.\n\nBu kart, sezgilerinize güvenerek, acele etmeden ilerlemenin ve sis dağılana kadar temkinli olmanın önemini vurgular.',
    reversed:
      'Ters Ay, şu anda yanılsamaların açığa çıktığını, korkuların çözülmeye başladığını ya da gizli gerçeklerin görünür olduğunu gösterebilir. Yine de aşırı şüphe, paranoya veya kafa karışıklığı dalgaları gelebilir.\n\nBu kart, netlik belirirken ayaklarınızı yere sağlam basmanızı öğütler.',
    keywords: ['belirsizlik', 'sezgi', 'giz', 'yanılsama', 'şimdi'],
    context: 'Şu anki durumda sisli ama çözülmekte olan süreç.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_sun_sa_pos2',
    card: 'The Sun',
    position: 2,
    upright:
      'Güneş, şu anda açıklık, başarı ve canlılığın yüksek olduğunu simgeler. Güven, neşe ve netlik işleri kolaylaştırır; görünürlüğünüz artar ve yollar açılır.\n\nBu kart, iyimserliğinizi koruyarak basit ve etkili adımlar atmanın tam zamanı olduğunu söyler.',
    reversed:
      'Ters Güneş, şu an geçici bir karamsarlık, motivasyon düşüşü veya görünürlüğün azalmasına işaret edebilir. Potansiyeliniz yerinde, sadece bulutlar güneşi geçici olarak perdelemiş durumda.\n\nBu kart, küçük başarıları kutlayarak enerjinizi yeniden yükseltmenizi önerir.',
    keywords: ['başarı', 'neşe', 'aydınlanma', 'özgüven', 'şimdi'],
    context: 'Şu anki durumda yüksek canlılık ya da geçici gölgeler.',
    group: 'Majör Arkana',
  },
  {
    id: 'judgement_sa_pos2',
    card: 'Judgement',
    position: 2,
    upright:
      'Mahkeme, şu an bir uyanış, muhasebe ve yön değişimi zamanında olduğunuzu gösterir. Geçmişi değerlendirip kendinizi affederek daha net bir çağrıya yanıt verme eşiğindesiniz.\n\nBu kart, içsel çağrınızı ciddiye alıp yeni safhaya geçmeye hazır olduğunuzu vurgular.',
    reversed:
      'Ters Mahkeme, şu an fırsatları ertelediğinizi, çağrıyı duymazdan geldiğinizi ya da öz-yargı içinde takıldığınızı gösterebilir. Kendinizi affetmemek ilerleyişi yavaşlatır.\n\nBu kart, yumuşak bir yüzleşmenin ve sorumluluk almanın kapıları açacağını hatırlatır.',
    keywords: ['uyanış', 'hesaplaşma', 'karar', 'yeniden doğuş', 'şimdi'],
    context: 'Şu anki durumda iç çağrı ve karar eşiği.',
    group: 'Majör Arkana',
  },
  {
    id: 'the_world_sa_pos2',
    card: 'The World',
    position: 2,
    upright:
      'Dünya, şu an bir döngüyü başarıyla tamamlama, bütünlük hissi ve yeni bir aşamaya geçişi simgeler. Emeğinizin karşılığını alıyor ve daha geniş bir perspektife ulaşıyorsunuz.\n\nBu kart, kutlama ve şükranla yeni bir başlangıca hazırlanmanızı öğütler.',
    reversed:
      'Ters Dünya, şu an tamamlanamayan süreçler, eksik halkalar veya bitişten çekinmeyi gösterir. Küçük bir dokunuş ya da kapanış ritüeli, döngüyü kapatmanıza yardım edebilir.\n\nBu kart, eksikleri nazikçe tamamlarsanız yolun açılacağını hatırlatır.',
    keywords: ['tamamlanma', 'başarı', 'bütünlük', 'döngü', 'şimdi'],
    context: 'Şu anki durumda kapanış ve yeni döngüye hazırlık.',
    group: 'Majör Arkana',
  },

  //-- Kupalar --//
  {
    id: 'ace_of_cups_sa_pos2',
    card: 'Ace of Cups',
    position: 2,
    upright:
      'Kupa Ası, şu anda duygusal bir açılış, kalbin yumuşaması ve sevginin akışıyla karşı karşıya olduğunuzu gösterir. Sevgi alışverişi, şefkat ve empati enerjisi yükseliyor; ruhsal tatmin olasılığı artıyor.\n\nBu kart, duyguları ifade etmenin ve kalbinizi açık tutmanın şimdi ilişkilerde ve yaratıcı süreçlerde iyileştirici olacağını vurgular.',
    reversed:
      'Ters Kupa Ası, şu an duyguların bastırılması, ifade güçlüğü ya da duygusal tıkanıklık yaşanabileceğini gösterir. İçsel kabınız dolu ama akışa izin verilmiyor olabilir.\n\nŞimdi öz-şefkat, duyguları adlandırma ve güvenli paylaşımlar, tıkanıklığı çözmek için kritik öneme sahiptir.',
    keywords: ['duygusal başlangıç', 'şefkat', 'ifade', 'akış', 'şimdi'],
    context: 'Duygusal açılma veya duygusal tıkanma eşiği.',
    group: 'Kupalar',
  },
  {
    id: 'two_of_cups_sa_pos2',
    card: 'Two of Cups',
    position: 2,
    upright:
      'İki Kupa, şu anda uyumlu bir bağın, karşılıklı anlayışın ve ortaklığın merkezde olduğunu söyler. Verme-alma dengesi güçlenebilir, diyaloglar şifalıdır.\n\nKalpten kurulan köprüler, güveni derinleştirir ve birlikte büyümeyi destekler.',
    reversed:
      'Ters İki Kupa, şu an dengesiz alışveriş, kopukluk ya da yanlış anlaşılmaların ilişki alanını zorlayabileceğini gösterir. Beklentiler konuşulmadan büyümüş olabilir.\n\nSınırları ve ihtiyaçları açıkça ifade etmek, köprüleri onarmanın anahtarıdır.',
    keywords: ['uyum', 'ortaklık', 'dengeli bağ', 'iletişim', 'şimdi'],
    context: 'Bağ kurma vs. bağda dengesizlikleri onarma.',
    group: 'Kupalar',
  },
  {
    id: 'three_of_cups_sa_pos2',
    card: 'Three of Cups',
    position: 2,
    upright:
      'Üç Kupa, şu an topluluk, dostluk ve kutlama enerjisini öne çıkarır. Destekleyici çevreyle paylaşım neşeyi artırır, işbirliği ilham verir.\n\nBirlikte üretmek ve başarıları kutlamak duygusal rezervleri tazeler.',
    reversed:
      'Ters Üç Kupa, şu an sosyal yorgunluk, dışlanmış hissetme ya da yüzeysel bağlantıların yıpratıcı olabileceğini gösterir. Fazla dağılma öz-kaynağı tüketebilir.\n\nKaliteli ilişkilere alan açmak ve sağlıksız bağlardan geri çekilmek dengeleri toparlar.',
    keywords: ['kutlama', 'dostluk', 'destek', 'paylaşım', 'şimdi'],
    context: 'Sosyal desteği çoğaltma veya aşırılığı dengeleme.',
    group: 'Kupalar',
  },
  {
    id: 'four_of_cups_sa_pos2',
    card: 'Four of Cups',
    position: 2,
    upright:
      'Dört Kupa, şu an ilgisizlik, tatminsizlik ya da duygusal doygunluk arayışını gösterir. Önünüzdeki fırsatlar gözden kaçıyor olabilir.\n\nİçe dönerek gerçek ihtiyacı tanımlamak, yeni bir anlam hissi yaratır.',
    reversed:
      'Ters Dört Kupa, şu an uyanışa, farkındalık artışına ve yeni bir duygusal ilgiye işaret eder. Kabullenme ve şükran, bulanıklığı dağıtır.\n\nUfak adımlar ve merak, yeniden canlanmanın kapısını aralar.',
    keywords: ['tatminsizlik', 'içe dönüş', 'farkındalık', 'fırsat', 'şimdi'],
    context: 'Tatminsizliği anlamlandırma ve yeniye açılma.',
    group: 'Kupalar',
  },
  {
    id: 'five_of_cups_sa_pos2',
    card: 'Five of Cups',
    position: 2,
    upright:
      'Beş Kupa, şu an kayıp, pişmanlık ya da yas duygusunun baskın olabileceğini gösterir. Dikkat kaybedilene odaklıdır.\n\nGörünmeyeni, hâlâ elde olanı fark etmek iyileşmenin ilk adımıdır.',
    reversed:
      'Ters Beş Kupa, şu an toparlanma, kabul ve umudun geri dönüşünü anlatır. Yasın içinden geçen güç, yeni bir bakış sunar.\n\nKendine şefkat ve destek aramak, duygusal esnekliği artırır.',
    keywords: ['kayıp', 'yas', 'pişmanlık', 'kabul', 'şimdi'],
    context: 'Yasla kalma ya da umudu yeniden çağırma.',
    group: 'Kupalar',
  },
  {
    id: 'six_of_cups_sa_pos2',
    card: 'Six of Cups',
    position: 2,
    upright:
      'Altı Kupa, şu an nostalji, sıcak anılar ve iç çocuğa temas zamanıdır. Masumiyet duygusu kalbi yumuşatır.\n\nGeçmişten gelen şefkat, bugünü besleyebilir; ancak geçmişte takılı kalmamaya dikkat.',
    reversed:
      'Ters Altı Kupa, şu an geçmişe saplanma, idealizasyon veya ilerleyememe hissini gösterir. Nostalji, kaçışa dönüşebilir.\n\nAnıları onurlandırıp odağı bugüne taşımak dengeyi sağlar.',
    keywords: ['nostalji', 'iç çocuk', 'şefkat', 'anı', 'şimdi'],
    context: 'Anıyı şifalandırma vs. geçmişte kalma.',
    group: 'Kupalar',
  },
  {
    id: 'seven_of_cups_sa_pos2',
    card: 'Seven of Cups',
    position: 2,
    upright:
      'Yedi Kupa, şu an hayaller, seçenekler ve ihtimallerin cazibesini anlatır. Zihin bulutlu; netlik için ölçütlere ihtiyaç var.\n\nÖnceliklendirme ve gerçeklik testi, dağılmayı önler.',
    reversed:
      'Ters Yedi Kupa, şu an ayıklama, net karar ve gerçekçi hedeflere dönüşü gösterir. Sis dağılır, seçim yapılır.\n\nKüçük ve ölçülebilir adımlar, hayali pratiğe çevirir.',
    keywords: ['seçenek', 'hayal', 'belirsizlik', 'netlik', 'şimdi'],
    context: 'Seçenek bolluğu vs. odaklanmış seçim.',
    group: 'Kupalar',
  },
  {
    id: 'eight_of_cups_sa_pos2',
    card: 'Eight of Cups',
    position: 2,
    upright:
      'Sekiz Kupa, şu an duygusal tatminsizlikten uzaklaşma ve daha anlamlı bir yola yönelmeyi simgeler. Bırakış, cesurca bir iç çağrıdır.\n\nDeğerlerle hizalanmak için konfor alanından çıkış gerekebilir.',
    reversed:
      'Ters Sekiz Kupa, şu an gitmek ile kalmak arasında bocalama ya da yarım kalmış bir veda hissini gösterir. Bağlar çözümlenmeden adım atmak zorlaşır.\n\nKapanış ritüelleri ve net niyetler, yön duygusunu güçlendirir.',
    keywords: ['ayrılış', 'anlam arayışı', 'bırakış', 'yol', 'şimdi'],
    context: 'Anlamlı yönü seçme veya kararsızlık.',
    group: 'Kupalar',
  },
  {
    id: 'nine_of_cups_sa_pos2',
    card: 'Nine of Cups',
    position: 2,
    upright:
      'Dokuz Kupa, şu an kişisel tatmin, minnet ve duygusal doyum enerjisini taşır. Emeğin meyvesi görünür.\n\nPaylaşarak çoğaltmak ve şükretmek, bolluğu kalıcı kılar.',
    reversed:
      'Ters Dokuz Kupa, şu an yüzeysel tatmin, aşırılık ya da doyumsuzluk uyarısıdır. Duygusal boşluk dışsal hazlarla dolduruluyor olabilir.\n\nDeğer odaklı hedeflere dönmek, gerçek doyumu mümkün kılar.',
    keywords: ['tatmin', 'minnet', 'bolluk', 'doyum', 'şimdi'],
    context: 'Derin doyum vs. yüzeysel haz döngüsü.',
    group: 'Kupalar',
  },
  {
    id: 'ten_of_cups_sa_pos2',
    card: 'Ten of Cups',
    position: 2,
    upright:
      'On Kupa, şu an aile/kalp çevresinde uyum, huzur ve duygusal bütünlük temasını vurgular. Bağlar sağlamlaşır, ev duygusu güçlenir.\n\nBirlikte geçirilen kaliteli zaman, mutluluğu pekiştirir.',
    reversed:
      'Ters On Kupa, şu an ailevi gerilim, beklenti-realite çatışması ya da ilişki içi kopuklukları gösterebilir. İdeal tablo baskı yaratabilir.\n\nDuyguları dürüstçe paylaşmak ve esnek beklentiler, köprüleri onarır.',
    keywords: ['aile', 'huzur', 'birlik', 'mutluluk', 'şimdi'],
    context: 'Bütünlük kurma veya kopukluğu onarma.',
    group: 'Kupalar',
  },
  {
    id: 'page_of_cups_sa_pos2',
    card: 'Page of Cups',
    position: 2,
    upright:
      'Kupa Prensi, şu an yaratıcı sezgilerin, masum merakın ve duygusal mesajların gündemde olduğunu söyler. İlhamlar beklenmedik yerden gelebilir.\n\nKalbi açık tutmak ve küçük işaretleri ciddiye almak, yeni kapılar açar.',
    reversed:
      'Ters Kupa Prensi, şu an duygusal dikkatsizlik, aşırı hassasiyet ya da hayalperest kaçışları işaret eder. Sınırlar bulanıklaşabilir.\n\nDuyguları düzenlemek ve somut adımlarla desteklemek denge sağlar.',
    keywords: ['ilham', 'merak', 'duygu mesajı', 'hassasiyet', 'şimdi'],
    context: 'İlhamı somuta taşıma veya duygusal dağılmayı toplama.',
    group: 'Kupalar',
  },
  {
    id: 'knight_of_cups_sa_pos2',
    card: 'Knight of Cups',
    position: 2,
    upright:
      'Kupa Şövalyesi, şu an romantik teklif, idealist vizyon ve kalpten hareket enerjisini getirir. Zarafetle yaklaşmak kapıları aralar.\n\nHayale yön vermek ve niyetle eylemi buluşturmak ilişkileri besler.',
    reversed:
      'Ters Kupa Şövalyesi, şu an abartılı idealizm, tutarsız vaatler ya da pasif kaçışları gösterebilir. Söylenen ile yapılan ayrışabilir.\n\nNetlik, süreklilik ve dürüstlük; duygusal güveni yeniden inşa eder.',
    keywords: ['romantizm', 'idealler', 'teklif', 'zarafet', 'şimdi'],
    context: 'Kalpten eylem veya aşırı idealizmi dengeleme.',
    group: 'Kupalar',
  },
  {
    id: 'queen_of_cups_sa_pos2',
    card: 'Queen of Cups',
    position: 2,
    upright:
      'Kupa Kraliçesi, şu an empati, sezgisel liderlik ve şefkatli tutumu vurgular. Duygusal güvenli alanlar oluşturmak şifayı hızlandırır.\n\nKendine bakım ve başkalarına şefkat dengesi, akışı berraklaştırır.',
    reversed:
      'Ters Kupa Kraliçesi, şu an duygusal taşma, içe kapanma ya da manipülasyon riskine işaret eder. Aşırı özveri, iç depoları boşaltabilir.\n\nSınır koyma ve öz-düzenleme pratiği, dengeyi geri getirir.',
    keywords: ['empati', 'şefkat', 'sezgi', 'sınırlar', 'şimdi'],
    context: 'Şefkati dengelemek ve sağlıklı sınırlar kurmak.',
    group: 'Kupalar',
  },
  {
    id: 'king_of_cups_sa_pos2',
    card: 'King of Cups',
    position: 2,
    upright:
      'Kupa Kralı, şimdi duygusal olgunluk, sakin liderlik ve bilgece rehberlik dönemini anlatır. Fırtınada bile merkezde kalabilme kapasitesi yüksektir.\n\nDuyguları yönetmek, çevreye güven ve istikrar verir.',
    reversed:
      'Ters Kupa Kralı, şu an duyguları bastırma, pasif agresyon ya da duygusal manipülasyon riskini işaret eder. Sessiz öfke bağları zedeleyebilir.\n\nDuyguları adil ve açık ifade etmek, güveni yeniden kurar.',
    keywords: ['olgunluk', 'duygu yönetimi', 'şifa', 'sükunet', 'şimdi'],
    context: 'Duygusal merkezde kalma veya bastırmayı çözme.',
    group: 'Kupalar',
  },
  //-- Asalar --//
  {
    id: 'ace_of_wands_sa_pos2',
    card: 'Ace of Wands',
    position: 2,
    upright:
      'Değnek Ası, şu an ilhamın kıvılcımının yandığını, yaratıcı bir başlangıca hazır olduğunuzu gösterir. Enerji yüksek, motivasyon taze; yeni bir proje, girişim veya tutkulu adım için evren yeşil ışık yakıyor.\n\nBu kart, niyeti eyleme çevirmek, ertelemeyi bırakmak ve cesaretle ilk adımı atmak için uygun bir zaman olduğunu vurgular.',
    reversed:
      'Ters Değnek Ası, şu an ilham tıkanıklığı, hedefsizlik veya gecikmiş başlangıçlar yaşadığınızı işaret eder. İçinizde kıvılcım var fakat koşullar, korkular veya dağınık odak ateşi büyütmeyi zorlaştırıyor olabilir.\n\nYeniye başlamadan önce niyeti netleştirmek, küçük ve kararlı adımlarla akışı açmak tıkanıklığı çözer.',
    keywords: ['ilham', 'başlangıç', 'enerji', 'motivasyon', 'şimdi'],
    context: 'Şu an yükselen yaratıcı kıvılcım veya geçici tıkanıklık.',
    group: 'Asalar',
  },
  {
    id: 'two_of_wands_sa_pos2',
    card: 'Two of Wands',
    position: 2,
    upright:
      'İki Değnek, şu an vizyon kurma, seçenekleri kıyaslama ve rotayı planlama evresinde olduğunuzu gösterir. Ufkunuz genişliyor; konfor alanından çıkarak büyüme olasılığını tartıyorsunuz.\n\nNet bir strateji ve ölçülebilir adımlar, potansiyeli gerçeğe çevirir.',
    reversed:
      'Ters İki Değnek, şu an tereddüt, konfor alanına bağlılık veya vizyon eksikliğine işaret eder. Kararsızlık ilerlemeyi yavaşlatıyor olabilir.\n\nÖncelikleri sadeleştirip ilk küçük adıma odaklanmak ivme kazandırır.',
    keywords: ['vizyon', 'plan', 'karar', 'ufuk', 'şimdi'],
    context: 'Planlama evresi ya da konfor alanına sıkışma.',
    group: 'Asalar',
  },
  {
    id: 'three_of_wands_sa_pos2',
    card: 'Three of Wands',
    position: 2,
    upright:
      'Üç Değnek, şu an yaptığınız hazırlıkların meyve vermek üzere olduğunu ve ufukta genişleme fırsatları belirdiğini söyler. İşbirlikleri, uzak bağlantılar veya yeni pazarlar gündemde olabilir.\n\nSabırla beklemek ve gelen fırsatları proaktif karşılamak büyümeyi hızlandırır.',
    reversed:
      'Ters Üç Değnek, şu an gecikmeler, beklentilerin altında kalan sonuçlar veya dar görüşlülük uyarısıdır. Kaynakları çeşitlendirmeden büyümeye zorlamak tıkanma yaratabilir.\n\nUfku genişletmek, geri bildirim almak ve planı revize etmek akışı açar.',
    keywords: ['genişleme', 'fırsat', 'işbirliği', 'ufuk', 'şimdi'],
    context: 'Genişleme eşiği veya gecikmelerin gözden geçirilmesi.',
    group: 'Asalar',
  },
  {
    id: 'four_of_wands_sa_pos2',
    card: 'Four of Wands',
    position: 2,
    upright:
      'Dört Değnek, şu an istikrar, kutlama ve topluluk hissinin öne çıktığını gösterir. Bir eşiği geçmiş, emeklerinizin karşılığını görmeye başlamış olabilirsiniz.\n\nBağları güçlendirmek ve temeli sağlamlaştırmak bir sonraki aşamayı destekler.',
    reversed:
      'Ters Dört Değnek, şu an ev/iş düzeninde geçici istikrarsızlık, uyumsuzluk veya yarım kalmış kutlamalar hissini anlatır. Temellerin bazı taşları yerine oturmamış olabilir.\n\nDenge ve ritüellere alan açmak, küçük düzeltmelerle uyumu geri getirir.',
    keywords: ['istikrar', 'kutlama', 'temel', 'uyum', 'şimdi'],
    context: 'Temeli pekiştirme veya geçici düzensizliği onarma.',
    group: 'Asalar',
  },
  {
    id: 'five_of_wands_sa_pos2',
    card: 'Five of Wands',
    position: 2,
    upright:
      'Beş Değnek, şu an rekabet, görüş ayrılıkları veya sağlıklı bir prova mücadelesi içinden geçtiğinizi gösterir. Fikirlerin çarpışması yaratıcılığı da tetikleyebilir.\n\nKuralları netleştirmek ve amaç birliğini hatırlatmak çatışmayı üretkenliğe dönüştürür.',
    reversed:
      'Ters Beş Değnek, şu an gereksiz sürtüşmeleri bitirme, iç çatışmaları yatıştırma veya tartışmadan kaçınma eğilimine işaret eder. Bastırılmış tansiyon sonra daha sert geri dönebilir.\n\nYapıcı diyalog ve net rol dağılımı, gerilimi kalıcı biçimde çözer.',
    keywords: ['rekabet', 'çatışma', 'prova', 'diyalog', 'şimdi'],
    context: 'Mücadeleyi yapılandırma veya tansiyonu düşürme.',
    group: 'Asalar',
  },
  {
    id: 'six_of_wands_sa_pos2',
    card: 'Six of Wands',
    position: 2,
    upright:
      'Altı Değnek, şu an görünür başarı, takdir ve moral yükselişi getirir. Emekleriniz fark ediliyor; liderlik etkisi artıyor.\n\nZafer anını paylaşmak, ekibi de motive eder ve sürdürülebilir başarıya köprü kurar.',
    reversed:
      'Ters Altı Değnek, şu an takdir eksikliği, kıskançlık gölgeleri veya kendinden şüphe uyarısıdır. Başarı iletişimi ya hatalı ya da görünmez kalmış olabilir.\n\nMetri̇klerle ilerlemeyi somutlamak ve şeffaf paylaşım algıyı toparlar.',
    keywords: ['zafer', 'tanınma', 'motivasyon', 'liderlik', 'şimdi'],
    context: 'Görünür başarıyı pekiştirme veya algı düzeltmesi.',
    group: 'Asalar',
  },
  {
    id: 'seven_of_wands_sa_pos2',
    card: 'Seven of Wands',
    position: 2,
    upright:
      'Yedi Değnek, şu an pozisyonunuzu savunma, önceliklerinizi koruma ve sınırlarınızı net tutma zamanı olduğunu söyler. Rakip baskısı veya beklenti artışı hissediliyor olabilir.\n\nNet kriterler ve tutarlı duruş, avantajınızı korur.',
    reversed:
      'Ters Yedi Değnek, şu an yorgunluk, geri çekilme isteği veya savunmayı abartma eğilimi gösterebilir. Aşırı tetikte kalmak kaynakları tüketir.\n\nÖncelik listesi ve delege etmek, yükü dengeler.',
    keywords: ['savunma', 'sınır', 'öncelik', 'direnç', 'şimdi'],
    context: 'Haklı zemini koruma veya tükenmeyi önleme.',
    group: 'Asalar',
  },
  {
    id: 'eight_of_wands_sa_pos2',
    card: 'Eight of Wands',
    position: 2,
    upright:
      'Sekiz Değnek, şu an hız, akış ve haberleşme artışını gösterir. Engeller çözülüyor; süreçler ivme kazanıyor.\n\nMesajları net ve zamanında yönetmek fırsat pencerelerini açar.',
    reversed:
      'Ters Sekiz Değnek, şu an gecikmeler, karışık mesajlar veya senkron kaybı uyarısıdır. Acele, hatalı iletilere yol açabilir.\n\nBeklentileri yeniden hizalamak ve sırayı sadeleştirmek akışı düzeltir.',
    keywords: ['hız', 'iletişim', 'ivme', 'senkron', 'şimdi'],
    context: 'Hızlı akışı yönetme veya gecikmeleri düzeltme.',
    group: 'Asalar',
  },
  {
    id: 'nine_of_wands_sa_pos2',
    card: 'Nine of Wands',
    position: 2,
    upright:
      'Dokuz Değnek, şu an dayanıklılık ve son viraj psikolojisini anlatır. Çok yol aldınız; temkinli ilerlemek doğaldır.\n\nSınırları koruyup küçük molalar vermek, bitişe sağlıklı ulaşmanızı sağlar.',
    reversed:
      'Ters Dokuz Değnek, şu an tükenmişlik, savunmada aşırı kalma veya geçmiş yaralara aşırı tetiklenme riski taşır.\n\nDestek istemek, yükü bölmek ve ritmi düşürmek gücü geri kazandırır.',
    keywords: ['dayanıklılık', 'tetikte olma', 'mola', 'süreklilik', 'şimdi'],
    context: 'Son düzlükte enerjiyi yönetme veya tükenmeyi onarma.',
    group: 'Asalar',
  },
  {
    id: 'ten_of_wands_sa_pos2',
    card: 'Ten of Wands',
    position: 2,
    upright:
      'On Değnek, şu an aşırı yük, sorumluluk birikimi ve taşıdığınız emek paketini simgeler. Bitiriş yakın ama yük ağır.\n\nÖnceliklendirme ve delege, yükü hafifletir ve kaliteyi korur.',
    reversed:
      'Ters On Değnek, şu an gereksiz yüklerden arınma ve hayır deme pratiği ihtiyacını gösterir. Tek başına taşımak sürdürülemez olabilir.\n\nSüreçleri sadeleştirmek ve destek ağı kurmak akışı rahatlatır.',
    keywords: ['yük', 'sorumluluk', 'tamamlama', 'delege', 'şimdi'],
    context: 'Ağırlığı yönetme veya bırakılması gerekenleri bırakma.',
    group: 'Asalar',
  },
  {
    id: 'page_of_wands_sa_pos2',
    card: 'Page of Wands',
    position: 2,
    upright:
      'Değnek Prensi, şu an merak, keşif ve deneme-yanılma cesaretini getirir. Küçük bir kıvılcım, maceracı bir yolculuğa dönüşebilir.\n\nHafif adımlar, öğrenme eğrisini hızlandırır ve hevesi canlı tutar.',
    reversed:
      'Ters Değnek Prensi, şu an dağınık ilgi, çabuk sıkılma veya düşüncesiz çıkışlar uyarısıdır. Kıvılcım çabuk sönüyor olabilir.\n\nMikro hedefler ve rutin, hevesi tutarlı ilerlemeye dönüştürür.',
    keywords: ['keşif', 'heves', 'deneme', 'öğrenme', 'şimdi'],
    context: 'Hevesi odakla birleştirme veya saçılmayı toplama.',
    group: 'Asalar',
  },
  {
    id: 'knight_of_wands_sa_pos2',
    card: 'Knight of Wands',
    position: 2,
    upright:
      'Değnek Şövalyesi, şu an cesur hamle, hız ve tutku enerjisini yükseltir. Risk iştahı artmış; fırsatları kovalamak için idealdir.\n\nAni ivmeyi stratejiyle dengelemek, sürdürülebilir başarı getirir.',
    reversed:
      'Ters Değnek Şövalyesi, şu an acelecilik, savrukluk veya yarıda bırakılan girişimler uyarısıdır. Ateş hızlı yanıp sönebilir.\n\nNet hedef, zamanlama ve taahhüt yönetimi istikrar sağlar.',
    keywords: ['cesaret', 'hız', 'hamle', 'tutku', 'şimdi'],
    context: 'Atılganlığı yapılandırma veya savrukluğu dizginleme.',
    group: 'Asalar',
  },
  {
    id: 'queen_of_wands_sa_pos2',
    card: 'Queen of Wands',
    position: 2,
    upright:
      'Değnek Kraliçesi, şu an özgüven, karizma ve sıcak liderlik zamanını gösterir. Görünürlük artar; insanları ilhamla bir araya getirebilirsiniz.\n\nSınırları koruyarak cömertçe parlamak, alanınızı büyütür.',
    reversed:
      'Ters Değnek Kraliçesi, şu an güvensizlik, kıskançlık gölgesi veya dağınık odak riski taşır. Aşırı onay ihtiyacı enerjiyi düşürebilir.\n\nÖz-değer çalışması ve net öncelikler, ışığınızı berraklaştırır.',
    keywords: ['özgüven', 'karizma', 'liderlik', 'görünürlük', 'şimdi'],
    context: 'Manyetik liderliği dengelemek veya iç sabotajı yatıştırmak.',
    group: 'Asalar',
  },
  {
    id: 'king_of_wands_sa_pos2',
    card: 'King of Wands',
    position: 2,
    upright:
      'Değnek Kralı, şu an vizyoner liderlik, stratejik cesaret ve büyük resmi tutma becerisini vurgular. Etkinizi büyütmek için doğru zaman.\n\nYetki devri ve net yön, çevrenizi de yükseltir.',
    reversed:
      'Ters Değnek Kralı, şu an otoriterleşme, sabırsız dayatma veya ego çatışmaları uyarısıdır. Vizyon iletişime dönüşmezse direnç artar.\n\nDinleme, ortak akıl ve esneklik, etkili liderliği geri getirir.',
    keywords: ['vizyon', 'liderlik', 'strateji', 'etki', 'şimdi'],
    context: 'Vizyonu hayata geçirme veya ego kaynaklı sürtünmeyi çözme.',
    group: 'Asalar',
  },
  //-- Tılsımlar --//
  {
    id: 'ace_of_pentacles_sa_pos2',
    card: 'Ace of Pentacles',
    position: 2,
    upright:
      'Tılsım Ası, şu an somut bir fırsatın kapıda olduğunu gösterir: yeni gelir kapısı, iş teklifi, proje bütçesi ya da sağlam bir temel atma şansı. Maddi güveni artıracak pratik adımlar için zemin elverişli.\n\nNiyetinizi netleştirip küçük ama tutarlı eylemlerle tohumu toprağa koyarsanız, istikrar ve büyüme potansiyeli yükselir.',
    reversed:
      'Ters Tılsım Ası, şu an fırsatların kaçması, güvensiz temeller veya kıtlık zihniyetiyle hareket etme riskini işaret eder. Fazla beklemek ya da dağınık planlar, verimli bir başlangıcı geciktirebilir.\n\nDeğer önerisini sadeleştirip kaynak planını netleştirmek ve israf noktalarını kapatmak akışı düzeltir.',
    keywords: ['fırsat', 'başlangıç', 'maddi güven', 'temel', 'şimdi'],
    context: 'Somut fırsatı değerlendirme veya boşa harcama eşiği.',
    group: 'Tılsımlar',
  },
  {
    id: 'two_of_pentacles_sa_pos2',
    card: 'Two of Pentacles',
    position: 2,
    upright:
      'İki Tılsım, şu an çoklu sorumlulukları çeviklikle dengelediğinizi gösterir. Nakit akışı, zaman yönetimi ve öncelik sıralaması gündemde.\n\nEsneklik ve ritim kurmak; küçük ayarlamalarla büyük verim artışı sağlar.',
    reversed:
      'Ters İki Tılsım, şu an dengesizlik, dağılma ve ertelemelerin biriktiğini söyler. Aşırı yük, hatalara ve stresli kararlara yol açabilir.\n\nBasit bir öncelik matrisi, devretme ve gereksiz işleri eleme; kontrolü geri kazandırır.',
    keywords: ['denge', 'zaman yönetimi', 'öncelik', 'esneklik', 'şimdi'],
    context: 'Sorumlulukları dengeleme veya yük altında ezilme.',
    group: 'Tılsımlar',
  },
  {
    id: 'three_of_pentacles_sa_pos2',
    card: 'Three of Pentacles',
    position: 2,
    upright:
      'Üç Tılsım, şu an ekip çalışması, ustalık paylaşımı ve iyi tanımlı süreçlerin sonuç ürettiğini gösterir. Geri bildirim döngüsü ve rol netliği verimi artırır.\n\nİşbirliği içinde öğrenmek, projenin kalitesini ve görünürlüğünü yükseltir.',
    reversed:
      'Ters Üç Tılsım, şu an rol karmaşası, uyumsuz beklentiler ya da yeterince takdir edilmemeyi işaret eder. Silo çalışması kaliteyi düşürebilir.\n\nKapsam, sorumluluk ve başarı ölçütlerini yeniden yazmak hizalamayı güçlendirir.',
    keywords: ['işbirliği', 'ustalık', 'süreç', 'geri bildirim', 'şimdi'],
    context: 'Ekip uyumunu güçlendirme veya uyumsuzluğu düzeltme.',
    group: 'Tılsımlar',
  },
  {
    id: 'four_of_pentacles_sa_pos2',
    card: 'Four of Pentacles',
    position: 2,
    upright:
      'Dört Tılsım, şu an güvenliği koruma, bütçeyi sıkı tutma ve riskleri sınırlama eğilimini gösterir. Varlıkları sağlamlaştırmak için kontrollü ilerliyorsunuz.\n\nTasarruf ve disiplin faydalı fakat aşırı tutuculuk büyümeyi frenleyebilir.',
    reversed:
      'Ters Dört Tılsım, şu an ya aşırı sıkılık ya da kontrolsüz harcama sarkacında kalmayı işaret eder. Güvenlik ihtiyacı ile esnek yatırım arasında denge gerekir.\n\nNet hedefler, acil olmayan giderleri kısma ve stratejik harcamalar sağlıklı akış getirir.',
    keywords: ['güvenlik', 'tasarruf', 'kontrol', 'esneklik', 'şimdi'],
    context: 'Varlıkları koruma ile büyümeyi destekleme dengesi.',
    group: 'Tılsımlar',
  },
  {
    id: 'five_of_pentacles_sa_pos2',
    card: 'Five of Pentacles',
    position: 2,
    upright:
      'Beş Tılsım, şu an maddi/duygusal yoksunluk, dışlanmışlık veya destek eksikliği hissini vurgular. Kaynaklar kısıtlı görünebilir.\n\nYardım istemek, ağları aktive etmek ve geçici çözümlerle köprü kurmak toparlanmayı hızlandırır.',
    reversed:
      'Ters Beş Tılsım, şu an toparlanma, destek bulma ve yeniden ayağa kalkma fırsatını gösterir. Zor döngü kırılmaya hazır.\n\nKüçük kazanımları görünür kılmak ve sürdürülebilir alışkanlıklar kurmak güveni tazeler.',
    keywords: ['yoksunluk', 'destek', 'toparlanma', 'dayanıklılık', 'şimdi'],
    context: 'Geçici zorlukta destek ağı kurma.',
    group: 'Tılsımlar',
  },
  {
    id: 'six_of_pentacles_sa_pos2',
    card: 'Six of Pentacles',
    position: 2,
    upright:
      'Altı Tılsım, şu an adil paylaşım, yardım ve kazan-kazan alışverişinin öne çıktığını söyler. Denge, şeffaf koşullar ve güvenle kurulur.\n\nVermek ve almak arasında sağlıklı ritim, ilişkileri ve akışı güçlendirir.',
    reversed:
      'Ters Altı Tılsım, şu an dengesiz alışveriş, şartlı yardım ya da bağımlı ilişkiler uyarısıdır. Güç dengesizlikleri güveni zedeler.\n\nSınırlar, net anlaşmalar ve ölçülebilir karşılıklar dengeyi geri getirir.',
    keywords: ['paylaşım', 'adalet', 'verme-alma', 'güven', 'şimdi'],
    context: 'Adil alışveriş kurmak veya dengesizliği düzeltmek.',
    group: 'Tılsımlar',
  },
  {
    id: 'seven_of_pentacles_sa_pos2',
    card: 'Seven of Pentacles',
    position: 2,
    upright:
      'Yedi Tılsım, şu an değerlendirme, sabır ve verim analizi zamanıdır. Ne ektiniz, ne biçiyorsunuz; neyi sürdürmeli, neyi budamalı?\n\nKademeli iyileştirmeler ve gerçekçi beklentiler, sürdürülebilir büyüme sağlar.',
    reversed:
      'Ters Yedi Tılsım, şu an sabırsızlık, yanlış yatırım veya tıkanan getiri uyarısıdır. Sırf emek verdiniz diye sürdürmek “batık maliyet” tuzağı olabilir.\n\nKriterlere göre pivot etmek ve verimsizi bırakmak kaynakları özgürleştirir.',
    keywords: ['değerlendirme', 'sabır', 'verim', 'pivot', 'şimdi'],
    context: 'Hasat öncesi strateji ayarı veya batık maliyetten çıkış.',
    group: 'Tılsımlar',
  },
  {
    id: 'eight_of_pentacles_sa_pos2',
    card: 'Eight of Pentacles',
    position: 2,
    upright:
      'Sekiz Tılsım, şu an ustalık geliştirme, düzenli pratik ve kaliteye odaklanmayı vurgular. Zanaat bilinciyle ilerlemek değer yaratır.\n\nKüçük iterasyonlar ve geri bildirimle beceri eğriniz hızla yükselir.',
    reversed:
      'Ters Sekiz Tılsım, şu an özensizlik, motivasyon düşüşü ya da “sırf bitsin” yaklaşımını işaret eder. Kalite erozyonu uzun vadeli zarara yol açar.\n\nStandartları tazelemek, molalar ve anlamla yeniden bağ kurmak verimi artırır.',
    keywords: ['ustalık', 'pratik', 'kalite', 'disiplin', 'şimdi'],
    context: 'Beceri derinleştirme veya kaliteyi geri kazanma.',
    group: 'Tılsımlar',
  },
  {
    id: 'nine_of_pentacles_sa_pos2',
    card: 'Nine of Pentacles',
    position: 2,
    upright:
      'Dokuz Tılsım, şu an bağımsızlık, öz-değer ve emeğin meyvesini keyifle sürme zamanını gösterir. Kendi emeğinizin sağladığı konfor hissi yükselir.\n\nSınırlar ve öz-bakım, bu kazanımı kalıcı kılar.',
    reversed:
      'Ters Dokuz Tılsım, şu an aşırı bağımlılık, savurganlık ya da “hak ettim” gerekçesiyle dikkatsiz yönetime işaret edebilir. İmkan var ama tatmin düşüyor olabilir.\n\nBütçe bilinci, üretken hobiler ve öz-disiplin gerçek refahı destekler.',
    keywords: ['bağımsızlık', 'öz-değer', 'konfor', 'disiplin', 'şimdi'],
    context: 'Kazanımı sağlama alma veya dağılmayı toplama.',
    group: 'Tılsımlar',
  },
  {
    id: 'ten_of_pentacles_sa_pos2',
    card: 'Ten of Pentacles',
    position: 2,
    upright:
      'On Tılsım, şu an uzun vadeli istikrar, aile/ekip mirası ve sürdürülebilir yapıların önemini vurgular. Sistem kurmak bireysel efordan daha değerlidir.\n\nProsedürler, finansal plan ve ardıl düzeni kalıcılık sağlar.',
    reversed:
      'Ters On Tılsım, şu an ailevi/kurumsal uyumsuzluk, miras/varlık çatışmaları ya da kısa vade odaklılık uyarısıdır.\n\nŞeffaf kurallar, adil paylaşım ve risk dağılımı istikrarı geri getirir.',
    keywords: ['miras', 'istikrar', 'sistem', 'sürdürülebilirlik', 'şimdi'],
    context: 'Uzun vadeli yapı kurma veya çatışmayı çözme.',
    group: 'Tılsımlar',
  },
  {
    id: 'page_of_pentacles_sa_pos2',
    card: 'Page of Pentacles',
    position: 2,
    upright:
      'Tılsım Prensi, şu an öğrenme hevesi, staj niteliğinde fırsatlar ve somut bir hedefe yönelik ilk adımları gösterir. Merak ve disiplin birleşiyor.\n\nPlanı küçük deneylerle test etmek, büyüme yolunu açar.',
    reversed:
      'Ters Tılsım Prensi, şu an erteleme, dikkat dağınıklığı ya da niyeti eyleme dökememeyi işaret eder. Başlangıç enerjisi dağılıyor olabilir.\n\nNet teslim tarihleri, mini hedefler ve hesap verebilirlik ritimleri odak kazandırır.',
    keywords: ['öğrenme', 'başlangıç', 'pratik', 'hedef', 'şimdi'],
    context: 'Öğrenmeyi somut hedefe bağlama veya ertelemeyi aşma.',
    group: 'Tılsımlar',
  },
  {
    id: 'knight_of_pentacles_sa_pos2',
    card: 'Knight of Pentacles',
    position: 2,
    upright:
      'Tılsım Şövalyesi, şu an disiplin, rutin ve istikrarlı ilerleme dönemini gösterir. Yavaş ama emin adımlar verimlidir.\n\nSüreç sadeliği ve tutarlılık, uzun vadeli sonuçları garanti eder.',
    reversed:
      'Ters Tılsım Şövalyesi, şu an durağanlık, aşırı muhafazakârlık ya da motivasyon düşüşü uyarısıdır. Esneklik kaybı fırsat kaçırır.\n\nSistemi hafifletmek, küçük yenilikler ve ölçülü risk alma ivme yaratır.',
    keywords: ['istikrar', 'rutin', 'disiplin', 'tutarlılık', 'şimdi'],
    context: 'Sürdürülebilir hız veya tıkanıklığı çözme.',
    group: 'Tılsımlar',
  },
  {
    id: 'queen_of_pentacles_sa_pos2',
    card: 'Queen of Pentacles',
    position: 2,
    upright:
      'Tılsım Kraliçesi, şu an şefkatli pratiklik, yuva/ekip bakımı ve kaynak yönetimi ustalığını vurgular. Hem üretken hem besleyicisiniz.\n\nÖz-bakımı ihmal etmeden başkalarına alan tutmak bolluğu büyütür.',
    reversed:
      'Ters Tılsım Kraliçesi, şu an öz-bakım eksikliği, aşırı yüklenme ya da maddi/duygusal dengesizlik uyarısıdır. Herkesi beslerken kendinizi tüketiyor olabilirsiniz.\n\nSınır koymak, destek istemek ve düzeni sadeleştirmek dengeyi geri getirir.',
    keywords: ['bakım', 'pratiklik', 'kaynak yönetimi', 'şefkat', 'şimdi'],
    context: 'Beslemek ile tükenmemek arasındaki denge.',
    group: 'Tılsımlar',
  },
  {
    id: 'king_of_pentacles_sa_pos2',
    card: 'King of Pentacles',
    position: 2,
    upright:
      'Tılsım Kralı, şu an sağlamlık, finansal bilgelik ve stratejik liderliği gösterir. Riskler hesaplı, vizyon somut hedeflerle bağlanmış.\n\nVarlık tahsisi, mentorluk ve ölçeklenebilir sistemler, kalıcı başarı getirir.',
    reversed:
      'Ters Tılsım Kralı, şu an aşırı kontrol, hırsın gölgesi ya da maddi odaklı körlük uyarısıdır. Esneklik kaybı ve katılık fırsat maliyeti doğurur.\n\nDeğerlerle hizalama, paylaşım ve inovasyona açıklık etkiyi artırır.',
    keywords: ['istikrar', 'maddi bilgelik', 'liderlik', 'sistem', 'şimdi'],
    context: 'Sağlam liderliği büyütmek veya katılığı yumuşatmak.',
    group: 'Tılsımlar',
  },

  //-- Kılıçlar --//
  {
    id: 'ace_of_swords_sa_pos2',
    card: 'Ace of Swords',
    position: 2,
    upright:
      'Kılıç Ası, şu anki durumunuzda keskin bir netlik, gerçeği olduğu gibi görme ve zihinsel bir atılım enerjisinin öne çıktığını gösterir. Sis dağılmak üzere; doğru kelimeler ve doğru karar kapıda.\n\nBu kart, net bir niyet cümlesi kurduğunuzda dağınık konuların hızla hizalanacağını vurgular.',
    reversed:
      'Ters Kılıç Ası, şu an kararsız söylemler, bilgi kirliliği ya da aşırı analiz nedeniyle oluşan zihinsel bulanıklığa işaret eder. Gerçeği adlandırmaktan kaçınma, ilerleyişi yavaşlatıyor olabilir.\n\nMesajı sadeleştirip çekirdek soruyu netleştirmek tıkanıklığı açar.',
    keywords: ['netlik', 'hakikat', 'karar', 'iletişim', 'kavrayış'],
    context: 'Şu anki zihinsel iklim: keskinlik arayışı ve açık sözlülük.',
    group: 'Kılıçlar',
  },
  {
    id: 'two_of_swords_sa_pos2',
    card: 'Two of Swords',
    position: 2,
    upright:
      'İki Kılıç, şu an iki seçenek arasında bocaladığınız, duyguları devre dışı bırakıp sadece akılla denge kurmaya çalıştığınız bir eşikte olduğunuzu gösterir. Kararı ertelemek geçici bir sükûnet sağlar.\n\nKalp verisini masaya davet etmek teraziyi adil kılar.',
    reversed:
      'Ters İki Kılıç, kaçınılan yüzleşmelerin artık kapıyı zorladığını ve kör noktaların görünür olmaya başladığını söyler. Kararsızlığı sürdürmek kaygıyı büyütür.\n\nKüçük bir gerçeklik testi ve sınırlı bir zaman penceresi kararı kolaylaştırır.',
    keywords: ['ikilem', 'kararsızlık', 'denge', 'yüzleşme', 'kör nokta'],
    context: 'Şu anki düğüm: karar felci ve erteleme.',
    group: 'Kılıçlar',
  },
  {
    id: 'three_of_swords_sa_pos2',
    card: 'Three of Swords',
    position: 2,
    upright:
      'Üç Kılıç, şu anda kırgınlık, hayal kırıklığı ya da sert bir gerçeğin gölgesinden geçtiğinizi gösterir. Zihin, kalbi korumak için keskinleşmiş olabilir.\n\nAcıyı adlandırmak ve yasın payını vermek berraklığı geri çağırır.',
    reversed:
      'Ters Üç Kılıç, iyileşmeye hazır bir yaranın kabuk bağladığını; fakat tetikleyicilerin hâlâ zaman zaman sızlatabileceğini gösterir. Affediş, esnek sınırlarla birlikte kalıcı olur.\n\nŞefkatli ifade, içteki düğümü çözer.',
    keywords: ['kırgınlık', 'yas', 'hakikat', 'ifade', 'iyileşme'],
    context: 'Şu anki ton: kalp kırığıyla yüzleşme ve onarım.',
    group: 'Kılıçlar',
  },
  {
    id: 'four_of_swords_sa_pos2',
    card: 'Four of Swords',
    position: 2,
    upright:
      'Dört Kılıç, şu an dinlenme, geri çekilme ve zihni toparlama ihtiyacının belirgin olduğunu gösterir. Sessiz bir mola, stratejiyi olgunlaştırır.\n\nSükûnet alanı açtıkça çözüm kendiliğinden belirir.',
    reversed:
      'Ters Dört Kılıç, molayı bile erteleyecek kadar yoğun zihinsel gürültüye işaret eder. “Durursam düşerim” inancı tükenmişliği büyütür.\n\nMikro molalar ve dijital diyet, zihinsel enerjiyi tazeler.',
    keywords: ['dinlenme', 'toparlanma', 'strateji', 'sükûnet', 'yenilenme'],
    context: 'Şu anki ihtiyaç: zihne alan ve ritimli nefes.',
    group: 'Kılıçlar',
  },
  {
    id: 'five_of_swords_sa_pos2',
    card: 'Five of Swords',
    position: 2,
    upright:
      'Beş Kılıç, şu an tartışmaların “haklı çıkma” zeminine kayabildiğini ve ilişkisel maliyetleri görmezden gelme riskini gösterir. Zafer, boş gelebilir.\n\nKazanım tanımını gözden geçirmek köprüleri korur.',
    reversed:
      'Ters Beş Kılıç, tansiyonu düşürme ve onarım niyetinin belirdiğini; fakat gururun araya girebileceğini söyler. Esnek müzakere alan açar.\n\n“Doğru” olmaktan çok “iyi” olana odaklanın.',
    keywords: ['çatışma', 'haklılık', 'ego', 'onarım', 'müzakere'],
    context: 'Şu anki ders: haklılık–bağlılık dengesi.',
    group: 'Kılıçlar',
  },
  {
    id: 'six_of_swords_sa_pos2',
    card: 'Six of Swords',
    position: 2,
    upright:
      'Altı Kılıç, şu an fırtınalı sulardan daha sakin bir rotaya geçiş yaptığınızı gösterir. Mantık, güvenli çıkış hattını çiziyor.\n\nKademeli ve sessiz ilerleyiş en sürdürülebilir olanıdır.',
    reversed:
      'Ters Altı Kılıç, geçmişe bağlayan ince iplerin geçişi zorlaştırdığını işaret eder. Belirsizlik korkusu rotayı bulandırabilir.\n\nKüçük taşınmalar ve destek, hareketi mümkün kılar.',
    keywords: ['geçiş', 'iyileşme', 'sükûnet', 'rota', 'uzaklaşma'],
    context: 'Şu anki hareket: sessiz ve emin yön değişimi.',
    group: 'Kılıçlar',
  },
  {
    id: 'seven_of_swords_sa_pos2',
    card: 'Seven of Swords',
    position: 2,
    upright:
      'Yedi Kılıç, şu an stratejik ilerleme, görünürlüğü düşük hamleler ve kaynakları koruma ihtiyacının öne çıktığını gösterir. Taktik, savunmadan güçlüdür.\n\nNiyet temizse asgari gizlilik faydalıdır.',
    reversed:
      'Ters Yedi Kılıç, yarım gerçekler, kendini kandırma ya da yakalanma kaygısının verimi düşürdüğünü söyler. Güven aşınır.\n\nŞeffaf bir yeniden hizalama hafiflik getirir.',
    keywords: ['strateji', 'taktik', 'gizlilik', 'öz-doğruluk', 'güven'],
    context: 'Şu anki yaklaşım: akıllı plan, temiz niyet.',
    group: 'Kılıçlar',
  },
  {
    id: 'eight_of_swords_sa_pos2',
    card: 'Eight of Swords',
    position: 2,
    upright:
      'Sekiz Kılıç, şu an “çıkış yok” anlatısının güçlü olduğunu ve öz-kısıtlayıcı inançların hareket alanınızı daralttığını gösterir. Zihinsel zincirler gerçekte olduğundan sıkıdır.\n\nKüçük deneyler bu zincirlerde ilk gevşemeyi yaratır.',
    reversed:
      'Ters Sekiz Kılıç, düğümlerin çözülmeye başladığını ama eski korkuların ara ara geri döndüğünü söyler. Kanıt toplamak özgürleşmeyi hızlandırır.\n\nDestek istemek, ipleri tek tek çözer.',
    keywords: ['öz-kısıt', 'korku', 'zihin tuzağı', 'özgürleşme', 'deney'],
    context: 'Şu anki tema: algılanan engelleri test etmek.',
    group: 'Kılıçlar',
  },
  {
    id: 'nine_of_swords_sa_pos2',
    card: 'Nine of Swords',
    position: 2,
    upright:
      'Dokuz Kılıç, şu an kaygı, gece düşünceleri ve felaket senaryolarının zihni meşgul ettiğini gösterir. Uykusuzluk netliği gölgeler.\n\nKaygıyı kâğıda dökmek ve kanıt aramak döngüyü zayıflatır.',
    reversed:
      'Ters Dokuz Kılıç, kabusun sabahında gerçekliğin daha taşınabilir göründüğünü işaret eder. Yine de tetiklenmeler olabilir.\n\nNefes, beden regülasyonu ve küçük başarıların kaydı denge getirir.',
    keywords: [
      'kaygı',
      'uykusuzluk',
      'felaketleştirme',
      'regülasyon',
      'gerçeklik testi',
    ],
    context: 'Şu anki ihtiyaç: kaygı hijyeni ve ritim.',
    group: 'Kılıçlar',
  },
  {
    id: 'ten_of_swords_sa_pos2',
    card: 'Ten of Swords',
    position: 2,
    upright:
      'On Kılıç, şu an bir döngünün fiilen bittiğini ve teslimiyetin kapıda olduğunu gösterir. En dipten sonra yön yalnızca yukarıdır.\n\nBitişi onurlandırmak, yeniye yer açar.',
    reversed:
      'Ters On Kılıç, toparlanma ve hikâyeyi yeniden çerçeveleme sürecinin başladığını söyler. Eski acıya dönük bakış açısını değiştirmek iyileşmeyi hızlandırır.\n\nKüçük ileri anlaşmalar, tazelenmiş güç yaratır.',
    keywords: [
      'bitiş',
      'teslim',
      'yeniden doğuş',
      'iyileşme',
      'yeniden çerçeve',
    ],
    context: 'Şu anki eşik: kapanışın kabulü, başlangıcın kıvılcımı.',
    group: 'Kılıçlar',
  },
  {
    id: 'page_of_swords_sa_pos2',
    card: 'Page of Swords',
    position: 2,
    upright:
      'Kılıç Prensi, şu an merakın yüksek, gözlemin keskin ve öğrenme hevesinin diri olduğunu gösterir. Sorular doğru yere yöneliyor.\n\nYeni fikirler denetimli riskler ister.',
    reversed:
      'Ters Kılıç Prensi, dağınık bilgi, acele yargı ya da dedikodu riskine işaret eder. Hız, doğruluğu gölgelemesin.\n\nKaynak doğrulama ve niyet netliği zihni berraklaştırır.',
    keywords: ['merak', 'gözlem', 'iletişim', 'doğrulama', 'öğrenme'],
    context: 'Şu anki mod: keşif ve veri toplama, ama seçici.',
    group: 'Kılıçlar',
  },
  {
    id: 'knight_of_swords_sa_pos2',
    card: 'Knight of Swords',
    position: 2,
    upright:
      'Kılıç Şövalyesi, şu an hızlı hamle, net savunu ve iddialı iletişimin öne çıktığını gösterir. Zihin hızla karar istiyor.\n\nHız, stratejiyle birleştiğinde keskin sonuçlar verir.',
    reversed:
      'Ters Kılıç Şövalyesi, acelecilik, dürtüsel söylem ve kırıcı üslup riskine işaret eder. Haklılık arzusu dinlemeyi kısabilir.\n\nNefes–dur–konuş ritmi, verimi artırır.',
    keywords: ['hız', 'kararlılık', 'tartışma', 'strateji', 'ifade'],
    context: 'Şu anki ivme: hızlı düşün, akıllı uygula.',
    group: 'Kılıçlar',
  },
  {
    id: 'queen_of_swords_sa_pos2',
    card: 'Queen of Swords',
    position: 2,
    upright:
      'Kılıç Kraliçesi, şu an netlik, sınır ve nesnelliğin pusula olduğunu gösterir. Veri, efsaneden üstündür; adil bir bakış netlik getirir.\n\nSerin akıl, sıcak kalple dengelenince en doğru karar doğar.',
    reversed:
      'Ters Kılıç Kraliçesi, aşırı eleştiri, keskin dil ya da mesafeyle korunma eğilimine işaret eder. Sertlik bağlantıyı inceltebilir.\n\nŞefkatli dil, mesajın etkisini artırır.',
    keywords: ['nesnellik', 'sınır', 'netlik', 'iletişim', 'şefkatli üslup'],
    context: 'Şu anki duruş: berrak akıl, yumuşak ifade.',
    group: 'Kılıçlar',
  },
  {
    id: 'king_of_swords_sa_pos2',
    card: 'King of Swords',
    position: 2,
    upright:
      'Kılıç Kralı, şu an ilkeler, etik ve stratejik mantığın direksiyon başında olduğunu gösterir. Sistem kuran akıl, karmaşayı düzenler.\n\nAdil güç kullanımı güven inşa eder.',
    reversed:
      'Ters Kılıç Kralı, katı kurallar, dogmatik düşünce ya da aklı güce araç etme riskine işaret eder. Soğuk mantık empatiyi gölgeleyebilir.\n\nEtikle empatiyi eşlemek hem etkiyi hem kabulü büyütür.',
    keywords: ['mantık', 'etik', 'otorite', 'strateji', 'empati'],
    context: 'Şu anki eksen: ilkeli akıl, dengeli otorite.',
    group: 'Kılıçlar',
  },
];

// Kart adına göre pozisyon 2 anlamını bulma fonksiyonu
export const getPosition2Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return position2Meanings.find(meaning => meaning.card === cardName);
};

// Ana index dosyası için uyumluluk fonksiyonu
export const getSituationAnalysisPosition2Meaning = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  return getPosition2Meaning(cardName);
};

// Kart adına göre pozisyon 2 anlamını bulma fonksiyonu (ana index için)
export const getSituationAnalysisPosition2MeaningByCardName = (
  cardName: string
): SituationAnalysisPositionMeaning | undefined => {
  const meaning = getPosition2Meaning(cardName);
  if (meaning) {
    return {
      ...meaning,
      cardName: cardName, // cardName alanını ekle
    };
  }
  return meaning;
};

// Tüm pozisyon 2 anlamlarını alma fonksiyonu
export const getAllPosition2Meanings =
  (): SituationAnalysisPositionMeaning[] => {
    return position2Meanings;
  };

// Pozisyon 2 anlamlarını filtreleme fonksiyonu
export const getPosition2MeaningsByGroup = (
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar'
): SituationAnalysisPositionMeaning[] => {
  return position2Meanings.filter(meaning => meaning.group === group);
};

// Anahtar kelimeye göre pozisyon 2 anlamlarını arama
export const searchPosition2MeaningsByKeyword = (
  keyword: string
): SituationAnalysisPositionMeaning[] => {
  return position2Meanings.filter(meaning =>
    meaning.keywords.some((kw: string) =>
      kw.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Varsayılan export
export default {
  position2Meanings,
  getPosition2Meaning,
  getAllPosition2Meanings,
  getPosition2MeaningsByGroup,
  searchPosition2MeaningsByKeyword,
};
