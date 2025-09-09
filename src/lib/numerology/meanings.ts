/**
 * Numeroloji sayı anlamları ve açılımları
 * Her sayı için detaylı açıklamalar ve rehberlik
 */

export interface NumberMeaning {
  number: number;
  title: string;
  keywords: string[];
  description: string;
  positiveTraits: string[];
  challenges: string[];
  lifeGuidance: string;
  careerAdvice: string;
  relationshipAdvice: string;
  spiritualMessage: string;
  color: string;
  element: string;
  planet: string;
  birthdayMeaning?: string; // Doğum günü sayısı için özel açıklama
  lifePathMeaning?: string; // Yaşam yolu sayısı için özel açıklama
  expressionMeaning?: string; // İfade/Kader sayısı için özel açıklama
  personalityMeaning?: string; // Kişilik sayısı için özel açıklama
  maturityMeaning?: string; // Olgunluk/Yaşam Amacı sayısı için özel açıklama
  pinnacleMeaning?: string; // Zirve sayısı için özel açıklama
  challengeMeaning?: string; // Zorluk sayısı için özel açıklama
  personalYearMeaning?: string; // Kişisel yıl sayısı için özel açıklama
  compatibilityMeaning?: string; // Uyum/İlişki analizi için özel açıklama
}

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    number: 1,
    title: "Lider ve Öncü",
    keywords: ["Liderlik", "Bağımsızlık", "Yaratıcılık", "Güç", "Kararlılık"],
    description: "1 sayısı liderlik, bağımsızlık ve yeni başlangıçları temsil eder. Bu sayıya sahip kişiler doğal liderlerdir ve kendi yollarını çizerler.",
    positiveTraits: [
      "Güçlü liderlik yetenekleri",
      "Bağımsız düşünce",
      "Yaratıcılık ve yenilik",
      "Kararlılık ve azim",
      "Özgüven"
    ],
    challenges: [
      "Bazen çok baskın olabilir",
      "Başkalarının fikirlerini dinlemekte zorlanabilir",
      "Sabırsızlık",
      "Tek başına hareket etme eğilimi"
    ],
    lifeGuidance: "Hayatınızda öncü olun ve yeni yollar açın. Başkalarına liderlik ederken onların fikirlerini de dinlemeyi unutmayın.",
    careerAdvice: "Liderlik pozisyonları, girişimcilik, yaratıcı alanlar ve bağımsız çalışma sizin için idealdir.",
    relationshipAdvice: "Partnerinizin bağımsızlığına saygı gösterin ve birlikte kararlar almayı öğrenin.",
    spiritualMessage: "Ruhsal yolculuğunuzda öncü olun ve başkalarına rehberlik edin.",
    color: "Kırmızı",
    element: "Ateş",
    planet: "Güneş",
    birthdayMeaning: "Doğum günü sayısı 1 olan kişiler güçlü bir bireysellik duygusuyla dünyaya gelirler. Hayatın erken dönemlerinden itibaren kendi yollarını çizme, bağımsız kararlar alma ve liderlik etme ihtiyacı duyarlar. İçlerinde yanan kıvılcım onları sürekli yeni başlangıçlara, yeni fırsatlara yönlendirir. Bu kişiler cesur, kararlı ve çoğu zaman öncü fikirleriyle çevrelerine örnek olurlar.\n\nAncak bu güçlü liderlik enerjisi bazen aşırı benmerkezci ya da otoriter bir tavra dönüşebilir. Doğum günü 1 olan kişiler, başkalarıyla işbirliği yapmayı öğrenmediklerinde yalnız kalma riski taşırlar. Dengeli olduklarında ise hem kendi hayatlarında hem de başkalarının hayatlarında yol açıcı bir ışık haline gelirler.",
    lifePathMeaning: "Yaşam Yolu 1 olan kişiler liderlik, bağımsızlık ve öncülük enerjisiyle hayata gelirler. Onlar kendi yollarını çizme, yeni fikirler üretme ve çevrelerine yön verme arzusunu taşırlar. Çoğu zaman girişimci, cesur ve vizyon sahibi bir yapıya sahiptirler. Hayatlarında sık sık ön plana çıkma, kendi kimliklerini güçlü bir şekilde ortaya koyma ihtiyacı hissederler.\n\nAncak bu enerji bazen bencillik, sabırsızlık veya otoriterlik olarak gölge yansıyabilir. İşbirliğine açık olduklarında ve başkalarının da liderliğini tanıdıklarında, yaşamlarında büyük başarılar ve ilham verici başlangıçlar yaparlar.",
    expressionMeaning: "İfade sayısı 1 olan kişiler hayatlarına güçlü bir liderlik ve bireysellik enerjisiyle yön verirler. Onlar yaratıcı fikirler üretir, kendi yollarını açar ve başkalarına örnek olurlar. Doğuştan gelen kararlılıkları ve özgüvenleri sayesinde girişimlerde bulunmak, yeni projeler başlatmak ve risk almak onlar için doğal bir süreçtir.\n\nFakat bu güçlü enerji bazen bencillik, sabırsızlık ya da otoriterlik olarak gölge yanını gösterebilir. İşbirliğini öğrendiklerinde ve başkalarının fikirlerine değer verdiklerinde, hayat yollarında büyük başarılar ve kalıcı etkiler bırakırlar.",
    personalityMeaning: "Kişilik sayısı 1 olan kişiler dışarıdan kararlı, kendinden emin ve lider ruhlu olarak algılanırlar. İnsanlar onları güçlü, özgüvenli ve cesur bir karakter olarak görür. Konuştuklarında otorite duygusu yayar, bulundukları ortamda doğal olarak dikkat çekerler.\n\nAncak bu enerji bazen başkaları tarafından otoriter, kibirli veya fazla benmerkezci olarak algılanabilir. Daha yumuşak ve paylaşımcı bir tavır geliştirdiklerinde, başkalarına ilham veren doğal bir lider haline gelirler."
  },

  2: {
    number: 2,
    title: "Diplomat ve İşbirlikçi",
    keywords: ["İşbirliği", "Denge", "Diplomasi", "Hassasiyet", "Uyum"],
    description: "2 sayısı işbirliği, denge ve uyumu temsil eder. Bu sayıya sahip kişiler doğal diplomatlardır ve uyum sağlama konusunda yeteneklidirler.",
    positiveTraits: [
      "Mükemmel diplomatik yetenekler",
      "Empati ve anlayış",
      "Denge ve uyum sağlama",
      "İşbirliği yapma",
      "Hassas ve düşünceli"
    ],
    challenges: [
      "Karar vermekte zorlanabilir",
      "Çok hassas olabilir",
      "Başkalarının etkisinde kalabilir",
      "Çatışmadan kaçınma"
    ],
    lifeGuidance: "Dengenizi koruyun ve başkalarıyla işbirliği yapın. Kendi ihtiyaçlarınızı da göz ardı etmeyin.",
    careerAdvice: "Danışmanlık, diplomasi, sanat, terapi ve işbirliği gerektiren alanlar sizin için idealdir.",
    relationshipAdvice: "İlişkilerinizde denge kurun ve partnerinizle açık iletişim sağlayın.",
    spiritualMessage: "Ruhsal yolculuğunuzda denge ve uyum arayın.",
    color: "Turuncu",
    element: "Su",
    planet: "Ay",
    birthdayMeaning: "Doğum günü sayısı 2 olanlar uyum, denge ve ilişkiler üzerine kurulu bir enerjiyle dünyaya gelirler. Onlar doğal arabuluculardır; çatışmaları çözmede, farklı tarafları bir araya getirmede ve işbirliği ortamı yaratmada eşsiz bir yetenekleri vardır. Hayatlarında genellikle karşılıklı anlayış, samimiyet ve duygusal derinlik ararlar.\n\nÖte yandan bu hassasiyet onları kolay incinebilir kılabilir. Fazla uyum sağlama isteği, kendi isteklerini geri plana atmalarına sebep olabilir. Sağlıklı dengeyi bulduklarında ise, başkaları için güvenilir ve destekleyici bir rehber haline gelirler.",
    lifePathMeaning: "Yaşam Yolu 2 olan kişiler uyum, diplomasi ve hassasiyetle dünyaya gelirler. Onlar arabuluculuk yapma, farklı tarafları bir araya getirme ve barışı koruma konusunda güçlü bir yeteneğe sahiptir. Çevrelerinde genellikle yumuşak, şefkatli ve destekleyici bir enerji olarak algılanırlar. İlişkiler onlar için çok önemlidir ve genellikle hayatın merkezinde yer alır.\n\nFakat aşırı hassasiyet bazen özgüven eksikliğine veya başkalarına bağımlı olmaya dönüşebilir. Dengeyi kurduklarında, hem kendilerine hem de başkalarına huzur ve anlayış getiren gerçek bir rehber olurlar.",
    expressionMeaning: "İfade sayısı 2 olan kişiler uyum, işbirliği ve diplomasi enerjisini taşırlar. Onlar farklı tarafları bir araya getirme, anlaşmazlıkları çözme ve denge yaratma konusunda doğuştan yeteneklidir. Çevrelerinde yumuşak, nazik ve destekleyici bir varlık olarak öne çıkarlar.\n\nAncak aşırı uyum sağlama isteği bazen kendi ihtiyaçlarını bastırmalarına yol açabilir. Kendi sınırlarını belirlemeyi öğrendiklerinde, hem ilişkilerinde hem de topluluk içinde şifalandırıcı bir güç haline gelirler.",
    personalityMeaning: "Kişilik sayısı 2 olan kişiler dışarıdan nazik, uyumlu ve duyarlı görünürler. Onlar başkalarıyla kolay bağ kurar, şefkatli ve anlayışlı bir enerji yayarlar. Çevrelerinde genellikle sıcak, güven veren ve işbirliğine açık bir imaj sergilerler.\n\nAncak fazla uyum arayışı, başkaları tarafından pasif ya da kararsız olarak algılanmalarına sebep olabilir. Sınırlarını net belirlediklerinde, hem nazik hem de güçlü bir duruşa sahip olurlar."
  },

  3: {
    number: 3,
    title: "Yaratıcı ve İletişimci",
    keywords: ["Yaratıcılık", "İletişim", "Sosyallik", "Optimizm", "Sanat"],
    description: "3 sayısı yaratıcılık, iletişim ve sosyalliği temsil eder. Bu sayıya sahip kişiler doğal sanatçılar ve iletişimcilerdir.",
    positiveTraits: [
      "Güçlü yaratıcı yetenekler",
      "Mükemmel iletişim becerileri",
      "Sosyal ve eğlenceli",
      "Optimist ve pozitif",
      "Sanatsal yetenekler"
    ],
    challenges: [
      "Bazen yüzeysel olabilir",
      "Odaklanma sorunları",
      "Aşırı sosyallik",
      "Duygusal kararsızlık"
    ],
    lifeGuidance: "Yaratıcılığınızı kullanın ve başkalarıyla iletişim kurun. Derinlikli ilişkiler kurmayı öğrenin.",
    careerAdvice: "Sanat, yazarlık, iletişim, eğlence ve yaratıcı alanlar sizin için idealdir.",
    relationshipAdvice: "Partnerinizle derinlemesine iletişim kurun ve yaratıcı aktiviteler paylaşın.",
    spiritualMessage: "Ruhsal yolculuğunuzda yaratıcılığınızı kullanın ve başkalarına ilham verin.",
    color: "Sarı",
    element: "Ateş",
    planet: "Jüpiter",
    birthdayMeaning: "Doğum günü 3 olan kişiler hayatın sahnesine yaratıcı, enerjik ve neşeli bir ruhla gelirler. Onların en güçlü yanları ifade kabiliyetleridir; sanat, yazı, konuşma ya da tasarım alanında kendilerini ortaya koyabilirler. Sosyal ilişkilerde kolayca öne çıkar, insanlara ilham veren bir ışık olurlar.\n\nAncak bazen yüzeysel veya dağınık olma eğilimi gösterebilirler. Hayatlarında disiplin eksikliği, yeteneklerini tam anlamıyla değerlendirmelerine engel olabilir. Odaklandıklarında ise muazzam bir yaratıcılık ve insanlara mutluluk veren bir enerji açığa çıkar.",
    lifePathMeaning: "Yaşam Yolu 3 olan kişiler yaratıcı, enerjik ve neşeli bir ruhla hayata gelir. İfade, iletişim ve sanat onlar için doğal alanlardır. Çoğu zaman konuşmalarıyla, yazılarıyla ya da sahne yetenekleriyle çevrelerine ilham verirler. İçlerinde taşıdıkları canlılık, hayatın tadını çıkarmalarına ve başkalarına keyif katmalarına olanak sağlar.\n\nAncak bu enerji yüzeysellik, dağınıklık veya savrukluk olarak da kendini gösterebilir. Disiplinle birleştiğinde ise 3, hem kendi hayatında hem de başkalarının hayatında yaratıcılığın ve sevincin ışığını yayar.",
    expressionMeaning: "İfade sayısı 3 olan kişiler yaratıcılık, iletişim ve neşe enerjisiyle parlarlar. Onlar yazı, konuşma, sanat ve tasarım gibi alanlarda kendilerini güçlü bir şekilde ifade ederler. Sosyal ilişkilerde kolayca öne çıkar, insanlara ilham veren bir ışık olurlar.\n\nFakat dağınıklık veya yüzeysellik onların potansiyellerini tam kullanmalarına engel olabilir. Disiplinle birleştiğinde, ifade sayısı 3 olanlar büyük başarılar elde ederek çevresine mutluluk ve ilham kaynağı olurlar."
  },

  4: {
    number: 4,
    title: "Pratik ve Güvenilir",
    keywords: ["Pratiklik", "Güvenilirlik", "Çalışkanlık", "Düzen", "Stabilite"],
    description: "4 sayısı pratiklik, güvenilirlik ve stabiliteyi temsil eder. Bu sayıya sahip kişiler güvenilir ve çalışkandırlar.",
    positiveTraits: [
      "Güvenilir ve sadık",
      "Pratik ve gerçekçi",
      "Çalışkan ve azimli",
      "Düzenli ve organize",
      "Stabil ve güvenli"
    ],
    challenges: [
      "Bazen çok katı olabilir",
      "Değişime direnç gösterebilir",
      "Aşırı mükemmeliyetçilik",
      "Esneklik eksikliği"
    ],
    lifeGuidance: "Pratik yaklaşımınızı koruyun ama esneklik de gösterin. Yeni deneyimlere açık olun.",
    careerAdvice: "Mühendislik, finans, yönetim, inşaat ve güvenilirlik gerektiren alanlar sizin için idealdir.",
    relationshipAdvice: "Partnerinize güven verin ve birlikte istikrarlı bir gelecek kurun.",
    spiritualMessage: "Ruhsal yolculuğunuzda pratik yaklaşımınızı koruyun ve sabırlı olun.",
    color: "Yeşil",
    element: "Toprak",
    planet: "Uranüs",
    birthdayMeaning: "Doğum günü sayısı 4 olanlar düzen, disiplin ve yapı getiren kişilerdir. Onlar güvenilir, çalışkan ve sorumluluk sahibi bireylerdir. Zorluklarla karşılaştıklarında sabırla ve planlı bir şekilde ilerlerler. Hayatlarına sağlam bir temel kurmak, hem kendileri hem de sevdikleri için istikrar yaratmak isterler.\n\nZaman zaman katı, inatçı ya da fazla kontrolcü olabilirler. Bu durum ilişkilerde esnekliği zorlaştırabilir. Esneklik geliştirdiklerinde, hem kendi hayatlarında hem de çevrelerinde sağlam bir yapı kurarak kalıcı başarılar elde ederler.",
    lifePathMeaning: "Yaşam Yolu 4 olan kişiler düzen, disiplin ve yapı getiren bir enerjiyle yaşarlar. Onlar sabırlı, çalışkan ve güvenilir bireylerdir. Uzun vadeli planlar yapar, sağlam temeller atar ve kalıcı başarıların inşasında güçlü rol oynarlar. Pratik zekâları ve istikrarlı tavırları sayesinde zorlukların üstesinden gelmeyi bilirler.\n\nAncak bu enerji katı kurallar, esneklik eksikliği veya inatçılık olarak da gölge verebilir. Değişime uyum sağladıklarında, hem güvenilir hem de yeniliklere açık kalıcı başarılar elde ederler.",
    expressionMeaning: "İfade sayısı 4 olan kişiler düzen, istikrar ve çalışkanlık enerjisiyle bilinirler. Onlar sağlam temeller atar, sorumluluklarını yerine getirir ve uzun vadeli projelerde kalıcı başarı sağlarlar. Çevreleri onları güvenilir ve disiplinli kişiler olarak görür.\n\nAncak fazla katı ya da inatçı olmak, değişime direnç göstermek gölge yönleri olabilir. Esneklik kazandıklarında, güçlü yapılandırıcı enerjileriyle hem kendilerine hem de başkalarına kalıcı değer katarlar."
  },

  5: {
    number: 5,
    title: "Özgür Ruh ve Maceracı",
    keywords: ["Özgürlük", "Macera", "Değişim", "Çeşitlilik", "Seyahat"],
    description: "5 sayısı özgürlük, macera ve değişimi temsil eder. Bu sayıya sahip kişiler özgür ruhlu ve maceracıdırlar.",
    positiveTraits: [
      "Özgür ruhlu ve bağımsız",
      "Maceracı ve cesur",
      "Uyum sağlama yeteneği",
      "Çeşitlilik arayışı",
      "Sosyal ve iletişimci"
    ],
    challenges: [
      "Bazen kararsız olabilir",
      "Bağlılık sorunları",
      "Aşırı hareketlilik",
      "Odaklanma zorluğu"
    ],
    lifeGuidance: "Özgürlüğünüzü koruyun ama sorumluluklarınızı da unutmayın. Dengeli bir yaşam sürün.",
    careerAdvice: "Seyahat, satış, iletişim, eğlence ve değişken alanlar sizin için idealdir.",
    relationshipAdvice: "Partnerinize özgürlük tanıyın ve birlikte maceralar yaşayın.",
    spiritualMessage: "Ruhsal yolculuğunuzda özgürlük arayın ve yeni deneyimlere açık olun.",
    color: "Mavi",
    element: "Hava",
    planet: "Merkür",
    birthdayMeaning: "Doğum günü sayısı 5 olanlar özgürlüğün, maceranın ve değişimin temsilcileridir. Onlar sürekli yeni deneyimler arar, farklı kültürler ve insanlar tanımaktan beslenirler. Hızlı öğrenirler ve hayatın getirdiği değişimlere kolayca uyum sağlarlar. Çevrelerinde heyecan, yenilik ve canlılık katarlar.\n\nAncak bu özgürlük ihtiyacı bazen sabırsızlığa, düzensizliğe veya bağlanma korkusuna dönüşebilir. Kendilerini sınırlamak istemezler. Fakat sorumlulukla özgürlüğü dengelemeyi öğrendiklerinde, hayatları ilham verici bir keşif yolculuğuna dönüşür.",
    lifePathMeaning: "Yaşam Yolu 5 olan kişiler özgürlük, macera ve değişimin temsilcileridir. Onlar sürekli keşif arayışıyla hayatın içinde hareket ederler. Yeni kültürler, deneyimler ve insanlar tanımak onların ruhunu besler. Değişime kolay uyum sağladıkları için yenilikçi fikirlerin hayata geçmesinde öncü olabilirler.\n\nAncak sabırsızlık, kararsızlık ve istikrarsızlık gölge yönleridir. Özgürlüğü sorumlulukla dengelemeyi öğrendiklerinde, yaşamları hem kendileri hem de çevreleri için heyecan verici bir yolculuğa dönüşür.",
    expressionMeaning: "İfade sayısı 5 olan kişiler özgürlük, macera ve değişimin temsilcileridir. Onlar yeni deneyimlere, farklı kültürlere ve keşiflere büyük bir istekle yönelirler. Hızlı öğrenir, farklı alanlarda uyum sağlar ve çevrelerine canlılık katarlar.\n\nFakat sabırsızlık veya düzensizlik onları zayıf bir zemine çekebilir. Sorumluluk bilinciyle özgürlük arzusunu dengelediklerinde, yaşamları hem kendileri hem de başkaları için ilham verici bir yolculuğa dönüşür."
  },

  6: {
    number: 6,
    title: "Koruyucu ve Şefkatli",
    keywords: ["Şefkat", "Koruma", "Sorumluluk", "Aile", "Uyum"],
    description: "6 sayısı şefkat, koruma ve sorumluluğu temsil eder. Bu sayıya sahip kişiler doğal koruyuculardır.",
    positiveTraits: [
      "Şefkatli ve koruyucu",
      "Sorumlu ve güvenilir",
      "Aile odaklı",
      "Uyum sağlayıcı",
      "Sanatsal yetenekler"
    ],
    challenges: [
      "Bazen çok koruyucu olabilir",
      "Kendini ihmal etme",
      "Mükemmeliyetçilik",
      "Başkalarının sorunlarını üstlenme"
    ],
    lifeGuidance: "Başkalarını korurken kendinizi de ihmal etmeyin. Denge kurun.",
    careerAdvice: "Eğitim, sağlık, sanat, aile danışmanlığı ve koruma gerektiren alanlar sizin için idealdir.",
    relationshipAdvice: "Partnerinizi koruyun ama onun özgürlüğüne de saygı gösterin.",
    spiritualMessage: "Ruhsal yolculuğunuzda şefkat ve koruma enerjisini kullanın.",
    color: "İndigo",
    element: "Toprak",
    planet: "Venüs",
    birthdayMeaning: "Doğum günü 6 olan kişiler sevgi, uyum ve sorumluluk enerjisi taşır. Onlar ailelerine, dostlarına ve topluma karşı derin bir bağlılık hissederler. Yardımseverlikleri, estetik anlayışları ve güzellik yaratma istekleri onları başkaları için güvenilir bir sığınak haline getirir.\n\nBazen aşırı fedakârlık, kendi ihtiyaçlarını ihmal etme ya da başkalarının sorunlarını üstlenme eğilimleri olabilir. Kendi sınırlarını korumayı öğrendiklerinde, hem kendileri hem de çevreleri için şifalandırıcı bir güç haline gelirler.",
    lifePathMeaning: "Yaşam Yolu 6 olan kişiler sorumluluk, aile ve sevgi enerjisiyle hayata gelirler. Onlar başkalarına yardım etme, uyum sağlama ve güzellik yaratma konusunda güçlü bir isteğe sahiptir. Çevrelerinde koruyucu, destekleyici ve güvenilir bir enerji olarak tanınırlar. Estetik anlayışları ve uyum yaratma yetenekleri güçlüdür.\n\nAncak fazla fedakârlık yapma veya başkalarının sorunlarını üstlenme eğilimleri olabilir. Kendi ihtiyaçlarını da gözetmeyi öğrendiklerinde, hem kendileri hem de başkaları için şifalandırıcı bir güç haline gelirler.",
    expressionMeaning: "İfade sayısı 6 olan kişiler sevgi, uyum ve sorumluluk enerjisi taşır. Onlar ailelerine, topluma ve çevresine karşı güçlü bir bağlılık hissederler. Yardımseverlikleri, estetik anlayışları ve güzellik yaratma arzuları sayesinde çevrelerinde güvenilir bir figür haline gelirler.\n\nAncak fazla fedakârlık ya da başkalarının sorunlarını üstlenme eğilimleri olabilir. Kendi sınırlarını koruduklarında, hem sevdiklerini hem de toplumu iyileştiren bir güç olurlar."
  },

  7: {
    number: 7,
    title: "Bilge ve Ruhsal",
    keywords: ["Bilgelik", "Ruhsallık", "Analiz", "İçe dönüklük", "Mistiklik"],
    description: "7 sayısı bilgelik, ruhsallık ve içe dönüklüğü temsil eder. Bu sayıya sahip kişiler doğal filozoflardır.",
    positiveTraits: [
      "Derin düşünce ve analiz",
      "Ruhsal arayış",
      "Bilgelik ve anlayış",
      "İçe dönük ve meditatif",
      "Mistik yetenekler"
    ],
    challenges: [
      "Bazen çok içe dönük olabilir",
      "Sosyal izolasyon",
      "Aşırı analiz",
      "Pratiklik eksikliği"
    ],
    lifeGuidance: "İç dünyanızı keşfedin ama dış dünyayla da bağlantı kurun. Denge sağlayın.",
    careerAdvice: "Araştırma, felsefe, ruhsallık, terapi ve analiz gerektiren alanlar sizin için idealdir.",
    relationshipAdvice: "Partnerinizle derinlemesine bağlantı kurun ve ruhsal yolculuğunuzu paylaşın.",
    spiritualMessage: "Ruhsal yolculuğunuzda bilgelik arayın ve iç dünyanızı keşfedin.",
    color: "Mor",
    element: "Su",
    planet: "Neptün",
    birthdayMeaning: "Doğum günü 7 olanlar araştırmacı, derin düşünen ve sezgisel kişilerdir. Onlar hayatı sorgulayan, gerçeğin ardındaki gizemi arayan bir ruha sahiptir. Bilim, felsefe, mistisizm veya spiritüel konulara ilgi duyarlar. İçsel dünyaları güçlüdür ve yalnızlık onlar için besleyici olabilir.\n\nAncak aşırı içe kapanma, soğukluk ya da mesafe koyma eğilimleri olabilir. Başkalarıyla duygusal bağ kurmayı öğrendiklerinde, bilgeliğiyle başkalarına ışık tutan bir öğretmen haline gelirler.",
    lifePathMeaning: "Yaşam Yolu 7 olan kişiler içe dönüş, araştırma ve ruhsallıkla beslenirler. Onlar hayatın derin anlamlarını arar, görünmeyeni sorgular ve sezgileriyle rehberlik ederler. Bilim, felsefe, spiritüel alanlar veya sanatın derinlikleri onlara çekici gelir. Sessizlik ve yalnızlık, onların içsel bilgeliklerini besleyen bir alandır.\n\nAncak fazla içe kapanma veya soğuk görünme eğilimi olabilir. Başkalarıyla dengeli bağlar kurduklarında, bilgeliğiyle çevresine ışık tutan bir rehber olurlar.",
    expressionMeaning: "İfade sayısı 7 olan kişiler bilgi, araştırma ve ruhsal derinlik enerjisine sahiptir. Onlar hayatın anlamını sorgular, görünmeyen gerçekleri arar ve sezgileriyle rehberlik eder. Çoğu zaman bilim, felsefe veya spiritüel alanlara çekilirler.\n\nAncak fazla içe kapanma ya da mesafeli duruş ilişkilerde zorluk yaratabilir. İçsel bilgeliklerini başkalarıyla paylaşmayı öğrendiklerinde, çevrelerine ışık tutan değerli bir rehber haline gelirler."
  },

  8: {
    number: 8,
    title: "Lider ve Organizatör",
    keywords: ["Liderlik", "Organizasyon", "Güç", "Başarı", "Materyalizm"],
    description: "8 sayısı liderlik, organizasyon ve maddi başarıyı temsil eder. Bu sayıya sahip kişiler doğal liderlerdir.",
    positiveTraits: [
      "Güçlü liderlik yetenekleri",
      "Organizasyon becerileri",
      "Maddi başarı odaklı",
      "Kararlı ve azimli",
      "Pratik ve gerçekçi"
    ],
    challenges: [
      "Bazen çok materyalist olabilir",
      "Aşırı kontrolcülük",
      "Esneklik eksikliği",
      "Duygusal soğukluk"
    ],
    lifeGuidance: "Maddi başarınızı koruyun ama ruhsal gelişiminizi de ihmal etmeyin.",
    careerAdvice: "Yönetim, finans, iş dünyası, organizasyon ve liderlik gerektiren alanlar sizin için idealdir.",
    relationshipAdvice: "Partnerinizle güçlü bir ortaklık kurun ve birlikte başarıya odaklanın.",
    spiritualMessage: "Ruhsal yolculuğunuzda güç ve başarıyı dengeleyin.",
    color: "Pembe",
    element: "Toprak",
    planet: "Satürn",
    birthdayMeaning: "Doğum günü sayısı 8 olan kişiler gücün, yönetimin ve maddi başarının temsilcileridir. Onlar iş dünyasında, organizasyonda ve stratejide doğal bir yetenek taşırlar. Hedef odaklıdırlar ve azimle çalışarak büyük başarılara ulaşabilirler.\n\nAncak hırs ve güç arayışı onları zaman zaman sert ya da otoriter gösterebilir. Maneviyatla maddeyi dengelemeyi öğrendiklerinde, hem kendi hayatlarında bolluk yaratır hem de başkaları için adil bir lider olurlar.",
    lifePathMeaning: "Yaşam Yolu 8 olan kişiler güç, başarı ve yönetim enerjisiyle dünyaya gelir. Onlar iş dünyasında, organizasyonda ve liderlikte doğal bir beceri taşırlar. Hedeflerine kararlı bir şekilde ilerler ve maddi başarı elde etme konusunda yüksek potansiyele sahiptirler. Doğru kullandıklarında bolluk ve refah yaratabilirler.\n\nAncak hırs, kontrol arzusu veya otoriter tavır gölge yönleri olabilir. Maddi ve manevi dengeyi sağladıklarında, adil ve güçlü bir lider olarak kalıcı başarılar elde ederler.",
    expressionMeaning: "İfade sayısı 8 olan kişiler güç, başarı ve yönetim enerjisiyle yaşarlar. Onlar iş dünyasında, finansal alanda ve liderlikte doğal bir beceri taşırlar. Kararlılıkları sayesinde büyük hedeflere ulaşma potansiyeline sahiptirler.\n\nFakat hırs veya aşırı kontrol arzusu gölge yönleri olabilir. Maddi başarıyı manevi değerlerle dengelediklerinde, güçlü ve adil bir lider olarak büyük izler bırakırlar."
  },

  9: {
    number: 9,
    title: "Evrensel ve Cömert",
    keywords: ["Evrensellik", "Cömertlik", "Hümanizm", "Spiritüalite", "Tamamlanma"],
    description: "9 sayısı evrensellik, cömertlik ve spiritüaliteyi temsil eder. Bu sayıya sahip kişiler evrensel düşünürlerdir.",
    positiveTraits: [
      "Evrensel düşünce",
      "Cömert ve yardımsever",
      "Spiritüel ve mistik",
      "Yaratıcı ve sanatsal",
      "Tamamlayıcı ve bütünleyici"
    ],
    challenges: [
      "Bazen çok idealist olabilir",
      "Pratiklik eksikliği",
      "Aşırı cömertlik",
      "Kendini ihmal etme"
    ],
    lifeGuidance: "Evrensel hizmetinizi sürdürün ama kendi ihtiyaçlarınızı da göz ardı etmeyin.",
    careerAdvice: "Sanat, eğitim, ruhsallık, hümaniter çalışmalar ve evrensel hizmet alanları sizin için idealdir.",
    relationshipAdvice: "Partnerinizle evrensel bir bağ kurun ve birlikte büyük hayaller gerçekleştirin.",
    spiritualMessage: "Ruhsal yolculuğunuzda evrensel hizmet ve tamamlanma arayın.",
    color: "Altın",
    element: "Ateş",
    planet: "Mars",
    birthdayMeaning: "Doğum günü 9 olanlar şefkatli, idealist ve sanatsal ruhlu kişilerdir. Onlar insanlığa hizmet etmeyi, iyiliği ve güzelliği paylaşmayı yaşamlarının merkezine koyarlar. Yaratıcı yönleriyle toplumda fark yaratabilir, başkalarının hayatına dokunabilirler.\n\nBazen fazla duygusal, hayalci ya da fedakâr olabilirler. Ancak kendi sınırlarını ve gerçeklerini gözeterek yaşadıklarında, dünyada kalıcı bir iz bırakan insancıl liderler haline gelirler.",
    lifePathMeaning: "Yaşam Yolu 9 olan kişiler şefkat, idealizm ve insanlık sevgisiyle hareket ederler. Onlar dünyayı daha iyi bir yer yapmak ister, fedakârlıkla topluma katkı sağlarlar. Sanatsal yönleri güçlü olabilir ve başkalarının hayatına dokunan projeler yaratabilirler.\n\nAncak fazla duygusal, hayalci veya aşırı fedakâr olma eğilimleri vardır. Kendi sınırlarını koruduklarında ve gerçekçilikle idealizmi birleştirdiklerinde, dünyada kalıcı iz bırakan insancıl liderler haline gelirler.",
    expressionMeaning: "İfade sayısı 9 olan kişiler idealizm, şefkat ve insanlık sevgisiyle hareket ederler. Onlar insanlığa hizmet etmeyi, başkalarının hayatına dokunmayı ve sanatsal projelerle topluma katkı sağlamayı önemserler. Çevrelerinde yardımsever ve vizyoner olarak tanınırlar.\n\nAncak aşırı fedakârlık veya hayalcilik onları yıpratabilir. Gerçekçiliği koruyarak şefkatlerini sunmayı öğrendiklerinde, dünyada kalıcı iz bırakan insancıl liderler olurlar."
  },

  11: {
    number: 11,
    title: "Ruhsal Öğretmen",
    keywords: ["Ruhsallık", "Sezgisel", "İlham", "Öğretmenlik", "Mistiklik"],
    description: "11 sayısı ruhsallık, sezgisel yetenekler ve öğretmenliği temsil eder. Bu master sayıya sahip kişiler ruhsal öğretmenlerdir.",
    positiveTraits: [
      "Güçlü sezgisel yetenekler",
      "Ruhsal öğretmenlik",
      "İlham verici",
      "Mistik ve spiritüel",
      "Yüksek bilinç seviyesi"
    ],
    challenges: [
      "Bazen çok idealist olabilir",
      "Pratiklik eksikliği",
      "Aşırı hassasiyet",
      "Dünyevi konularda zorlanma"
    ],
    lifeGuidance: "Ruhsal öğretmenliğinizi kullanın ama dünyevi sorumluluklarınızı da unutmayın.",
    careerAdvice: "Ruhsallık, öğretmenlik, terapi, sanat ve ilham verici alanlar sizin için idealdir.",
    relationshipAdvice: "Partnerinizle ruhsal bir bağ kurun ve birlikte büyüyün.",
    spiritualMessage: "Ruhsal yolculuğunuzda öğretmenlik yapın ve başkalarına ilham verin.",
    color: "Gümüş",
    element: "Hava",
    planet: "Uranüs",
    birthdayMeaning: "Doğum günü sayısı 11 olanlar sezgisel, vizyoner ve ruhsal açıdan güçlü kişilerdir. Onların enerjisi yüksek frekansta çalışır ve çevrelerine ilham verir. Doğuştan gelen bir farkındalıkla, hayatlarında ilahi rehberliği hissetmeleri mümkündür.\n\nAncak bu yoğun enerji onları huzursuz, kaygılı veya dengesiz kılabilir. Kendilerini toprakladıklarında, çevrelerine ilham veren ve rehberlik eden bir ışık haline gelirler.",
    lifePathMeaning: "Yaşam Yolu 11 olan kişiler yüksek sezgi, vizyon ve ilham enerjisi taşırlar. Onlar doğuştan spiritüel bir farkındalığa sahiptir ve çevrelerine ilham verme konusunda güçlüdür. Vizyonlarıyla insanlara yol gösterebilir ve ilahi rehberlikleriyle kolektife katkı sağlayabilirler.\n\nAncak bu yoğun enerji kaygı, huzursuzluk veya dengesizlik yaratabilir. Kendilerini dengelediklerinde, hem ışık saçan bir rehber hem de çevresine şifa getiren bir vizyoner haline gelirler.",
    expressionMeaning: "İfade sayısı 11 olan kişiler vizyoner, sezgisel ve ilham verici bir enerji taşırlar. Onlar yüksek frekanslı bir bilince sahiptir ve çevrelerine ışık tutma konusunda güçlüdürler. Çoğu zaman sanat, spiritüel alanlar veya toplumsal rehberlikte öne çıkarlar.\n\nAncak yoğun enerjileri kaygı, huzursuzluk ya da dengesizlik yaratabilir. Kendilerini dengelediklerinde, çevrelerine ilham ve rehberlik sunan bir ışık haline gelirler."
  },

  22: {
    number: 22,
    title: "Usta İnşaatçı",
    keywords: ["İnşaat", "Pratiklik", "Büyük Hayaller", "Materyalizm", "Liderlik"],
    description: "22 sayısı büyük hayalleri gerçeğe dönüştürme yeteneğini temsil eder. Bu master sayıya sahip kişiler usta inşaatçılardır.",
    positiveTraits: [
      "Büyük hayalleri gerçekleştirme",
      "Pratik ve organize",
      "Güçlü liderlik",
      "Maddi başarı",
      "Evrensel hizmet"
    ],
    challenges: [
      "Bazen çok baskın olabilir",
      "Aşırı sorumluluk",
      "Mükemmeliyetçilik",
      "Esneklik eksikliği"
    ],
    lifeGuidance: "Büyük hayallerinizi gerçekleştirin ama dengeli bir yaşam sürün.",
    careerAdvice: "İnşaat, organizasyon, liderlik, büyük projeler ve evrensel hizmet alanları sizin için idealdir.",
    relationshipAdvice: "Partnerinizle büyük hayaller kurun ve birlikte başarıya odaklanın.",
    spiritualMessage: "Ruhsal yolculuğunuzda büyük hayallerinizi gerçekleştirin.",
    color: "Platin",
    element: "Toprak",
    planet: "Satürn",
    birthdayMeaning: "Doğum günü 22 olanlar büyük vizyonların kurucusudur. Onlar güçlü hayalleri gerçeğe dönüştürme yeteneğine sahiptir. Disiplinli, pratik ve kararlı yapıları sayesinde hem maddi hem de manevi dünyada büyük başarılar elde edebilirler.\n\nFakat bu büyük enerji sorumluluk baskısı yaratabilir. Küçük hedeflerle yetinmediklerinde, büyük projeler inşa ederek dünyada kalıcı izler bırakırlar.",
    lifePathMeaning: "Yaşam Yolu 22 olan kişiler usta kurucular olarak bilinir. Onlar büyük hayalleri gerçeğe dönüştürme gücüne sahiptir. Pratik, disiplinli ve vizyoner yapıları sayesinde dünyada kalıcı projeler inşa edebilirler. Hem maddi hem manevi başarıyı aynı anda yaratma potansiyeline sahiptirler.\n\nAncak bu büyük enerji bazen ağır sorumluluk baskısı yaratabilir. Küçük hedeflerle yetinmediklerinde, dünyada kalıcı bir miras bırakma potansiyellerini açığa çıkarırlar.",
    expressionMeaning: "İfade sayısı 22 olan kişiler usta kurucular olarak bilinir. Onlar büyük hayalleri somut başarıya dönüştürme yeteneğine sahiptir. Disiplinli, vizyoner ve pratik yapıları sayesinde toplumda büyük projelere imza atabilirler.\n\nAncak bu büyük enerji sorumluluk baskısı yaratabilir. Küçük hedeflerle yetinmeyip vizyonlarını gerçekleştirdiklerinde, dünyada kalıcı miraslar bırakırlar."
  },

  33: {
    number: 33,
    title: "Usta Öğretmen",
    keywords: ["Öğretmenlik", "Şefkat", "Ruhsallık", "Hizmet", "Evrensellik"],
    description: "33 sayısı en yüksek seviyede öğretmenlik ve evrensel hizmeti temsil eder. Bu master sayıya sahip kişiler usta öğretmenlerdir.",
    positiveTraits: [
      "En yüksek seviyede öğretmenlik",
      "Evrensel şefkat",
      "Ruhsal liderlik",
      "Hizmet odaklı",
      "Yüksek bilinç"
    ],
    challenges: [
      "Aşırı sorumluluk",
      "Kendini ihmal etme",
      "Mükemmeliyetçilik",
      "Dünyevi konularda zorlanma"
    ],
    lifeGuidance: "Evrensel hizmetinizi sürdürün ama kendi ihtiyaçlarınızı da göz ardı etmeyin.",
    careerAdvice: "Öğretmenlik, ruhsallık, hümaniter çalışmalar, terapi ve evrensel hizmet alanları sizin için idealdir.",
    relationshipAdvice: "Partnerinizle evrensel bir bağ kurun ve birlikte hizmet edin.",
    spiritualMessage: "Ruhsal yolculuğunuzda en yüksek seviyede öğretmenlik yapın.",
    color: "Kristal",
    element: "Su",
    planet: "Neptün",
    birthdayMeaning: "Doğum günü 33 olanlar koşulsuz sevgi, şefkat ve şifa enerjisinin taşıyıcılarıdır. Onlar başkalarının iyiliği için yaşayan, derin bir sorumluluk ve fedakârlık duygusu hisseden kişilerdir. İnsanlara ilham verir, kalpleri yumuşatır ve topluluklara rehberlik ederler.\n\nAncak bu yüksek enerji yükümlülük baskısı yaratabilir. Kendilerini tükenmeden ifade etmeyi öğrendiklerinde, dünyada kalıcı bir şifa izi bırakırlar ve kolektifin iyileşmesine katkı sağlarlar.",
    lifePathMeaning: "Yaşam Yolu 33 olan kişiler koşulsuz sevgi, şefkat ve hizmet enerjisini taşır. Onlar başkalarının iyileşmesine aracılık eden, topluma rehberlik eden bir ruhla dünyaya gelirler. Öğretici yönleri, şefkatli tavırları ve yüksek enerjileriyle çevrelerine ışık tutarlar.\n\nAncak bu yoğun enerji bazen aşırı fedakârlık ya da tükenmişlik riski yaratabilir. Kendi sınırlarını koruduklarında ve sevgilerini dengeli şekilde ifade ettiklerinde, dünyada şifa ve rehberlik sunan güçlü bir figür olurlar.",
    expressionMeaning: "İfade sayısı 33 olan kişiler koşulsuz sevgi, şefkat ve şifa enerjisini taşır. Onlar başkalarının iyiliği için yaşayan, öğretici ve rehber kişilerdir. Çevrelerine ilham veren, şifalandıran ve rehberlik eden bir ışık olurlar.\n\nAncak bu yoğun enerji tükenmişlik ya da aşırı sorumluluk duygusuna dönüşebilir. Dengeli kaldıklarında, topluma kalıcı sevgi ve şifa getiren güçlü bir rehber haline gelirler."
  }
};

/**
 * Sayı anlamını getirir
 */
export function getNumberMeaning(number: number): NumberMeaning | null {
  return NUMBER_MEANINGS[number] || null;
}

/**
 * Tüm sayı anlamlarını getirir
 */
export function getAllNumberMeanings(): NumberMeaning[] {
  return Object.values(NUMBER_MEANINGS);
}

/**
 * Doğum günü sayısı anlamını getirir
 */
export function getBirthdayNumberMeaning(number: number): string | null {
  const meaning = NUMBER_MEANINGS[number];
  return meaning?.birthdayMeaning || null;
}

/**
 * Yaşam yolu sayısı anlamını getirir
 */
export function getLifePathNumberMeaning(number: number): string | null {
  const meaning = NUMBER_MEANINGS[number];
  return meaning?.lifePathMeaning || null;
}

/**
 * İfade/Kader sayısı anlamını getirir
 */
export function getExpressionNumberMeaning(number: number): string | null {
  const meaning = NUMBER_MEANINGS[number];
  return meaning?.expressionMeaning || null;
}

/**
 * Kişilik sayısı anlamını getirir
 */
export function getPersonalityNumberMeaning(number: number): string | null {
  const meaning = NUMBER_MEANINGS[number];
  return meaning?.personalityMeaning || null;
}

/**
 * Olgunluk/Yaşam Amacı sayısı anlamını getirir
 */
export function getMaturityNumberMeaning(number: number): string | null {
  const meaning = NUMBER_MEANINGS[number];
  return meaning?.maturityMeaning || null;
}

/**
 * Zirve sayısı anlamını getirir
 */
export function getPinnacleNumberMeaning(number: number): string | null {
  const meaning = NUMBER_MEANINGS[number];
  return meaning?.pinnacleMeaning || null;
}

/**
 * Zorluk sayısı anlamını getirir
 */
export function getChallengeNumberMeaning(number: number): string | null {
  const meaning = NUMBER_MEANINGS[number];
  return meaning?.challengeMeaning || null;
}

/**
 * Kişisel yıl sayısı anlamını getirir
 */
export function getPersonalYearNumberMeaning(number: number): string | null {
  const meaning = NUMBER_MEANINGS[number];
  return meaning?.personalYearMeaning || null;
}

/**
 * Uyum/İlişki analizi sayısı anlamını getirir
 */
export function getCompatibilityNumberMeaning(number: number): string | null {
  const meaning = NUMBER_MEANINGS[number];
  return meaning?.compatibilityMeaning || null;
}
