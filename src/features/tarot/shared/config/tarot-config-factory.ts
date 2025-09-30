import {
  TarotConfigSchema,
  TarotConfig,
  TarotTheme,
  ValidationKeys,
  I18nKeys,
  FormI18nKeys,
  CreditKeys,
} from '../schemas/tarot-config.schema';
import { PositionInfo, PositionLayout } from '../../../../types/tarot';
// Position data will be defined inline to eliminate config file dependencies

const toCamelCase = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_match, chr) => (chr ? chr.toUpperCase() : ''));
};

const toUpperSnakeCase = (value: string): string => {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s]/g, '_')
    .toUpperCase();
};

// Career Spread Position Data
const CAREER_POSITIONS_INFO: PositionInfo[] = [
  {
    id: 1,
    title: 'Gerçekten istediğim kariyer bu mu?',
    desc: 'Kariyer tercihlerinizi sorgulayın',
    description:
      'Mevcut kariyerinizin gerçekten istediğiniz kariyer olup olmadığını değerlendirin',
  },
  {
    id: 2,
    title: 'Kariyerimi geliştirmek için hangi adımları atabilirim?',
    desc: 'Kariyer gelişim adımları',
    description: 'Kariyerinizi ilerletmek için atabileceğiniz somut adımlar',
  },
  {
    id: 3,
    title: 'Kariyerimde değiştiremediğim taraflar var mı?',
    desc: 'Değiştirilemeyen faktörler',
    description:
      'Kariyerinizde kontrol edemediğiniz veya değiştiremediğiniz unsurlar',
  },
  {
    id: 4,
    title: 'Kariyerimde elimden gelenin en iyisini yapıyor muyum?',
    desc: 'Mevcut performans değerlendirmesi',
    description:
      'Şu anki kariyerinizde gösterdiğiniz performans ve çaba seviyesi',
  },
  {
    id: 5,
    title: 'Kariyerime yardımcı olacak ne gibi değişiklikler yapabilirim?',
    desc: 'Kariyer gelişim önerileri',
    description: 'Kariyerinizi ilerletmek için yapabileceğiniz değişiklikler',
  },
  {
    id: 6,
    title: 'Kariyerimde beklenmedik fırsatlar çıkabilir mi?',
    desc: 'Beklenmedik fırsatlar',
    description: 'Kariyerinizde karşılaşabileceğiniz beklenmedik fırsatlar',
  },
  {
    id: 7,
    title: 'Kariyerimde uzun vadeli hedeflerim neler?',
    desc: 'Uzun vadeli hedefler',
    description: 'Kariyerinizde uzun vadede ulaşmak istediğiniz hedefler',
  },
];

const CAREER_POSITIONS_LAYOUT: PositionLayout[] = [
  {
    id: 1,
    className:
      'absolute top-[15%] left-[65%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 2,
    className:
      'absolute top-[35%] left-[35%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 3,
    className:
      'absolute top-[55%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 4,
    className:
      'absolute top-[75%] left-[35%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 5,
    className:
      'absolute top-[85%] left-[65%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 6,
    className:
      'absolute top-[65%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 7,
    className:
      'absolute top-[25%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
];

// Love Spread Position Data
const LOVE_POSITIONS_INFO: PositionInfo[] = [
  {
    id: 1,
    title: 'İlgi Duyduğun Kişi',
    desc: 'Hakkında soru sorduğun kişi',
    description: 'Hakkında soru sorduğun kişi',
  },
  {
    id: 2,
    title: 'Fiziksel/Cinsel Bağlantı',
    desc: 'Fiziksel ve cinsel bağlantınız',
    description: 'Fiziksel ve cinsel bağlantınız',
  },
  {
    id: 3,
    title: 'Duygusal/Ruhsal Bağlantı',
    desc: 'Duygusal ve ruhsal bağlantınız',
    description: 'Duygusal ve ruhsal bağlantınız',
  },
  {
    id: 4,
    title: 'Uzun Vadeli Sonuç',
    desc: 'İlişkinin uzun vadeli sonucu',
    description: 'İlişkinin uzun vadeli sonucu',
  },
];

const LOVE_POSITIONS_LAYOUT: PositionLayout[] = [
  {
    id: 1,
    className:
      'absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 2,
    className:
      'absolute top-1/2 left-[38%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 3,
    className:
      'absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 4,
    className:
      'absolute top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2 z-20 rotate-90',
  },
];

// Money Spread Position Data
const MONEY_POSITIONS_INFO: PositionInfo[] = [
  {
    id: 1,
    title: 'Parayla İlgili Kaygı',
    desc: 'Parayla ilgili kaygı var mı?',
    description: 'Parayla ilgili kaygı var mı?',
  },
  {
    id: 2,
    title: 'Finansal Güvenlik Arzusu',
    desc: 'Finansal güvenliğe duyulan arzu',
    description: 'Finansal güvenliğe duyulan arzu',
  },
  {
    id: 3,
    title: 'Para Kullanımı',
    desc: 'Parayı beni mutlu edecek şekilde nasıl kullanabilirim?',
    description: 'Parayı beni mutlu edecek şekilde nasıl kullanabilirim?',
  },
  {
    id: 4,
    title: 'Geçmişteki Para Tutumu',
    desc: 'Parayla ilgili geçmişteki tutumum',
    description: 'Parayla ilgili geçmişteki tutumum',
  },
  {
    id: 5,
    title: 'Mali Sorumluluklar',
    desc: 'Mali açıdan iyi bir yaşam için sorumluluklarım nedir?',
    description: 'Mali açıdan iyi bir yaşam için sorumluluklarım nedir?',
  },
  {
    id: 6,
    title: 'Yeni Mali Planlar',
    desc: 'Mali yatırımlarım veya birikimlerimle ilgili yeni planlarım',
    description: 'Mali yatırımlarım veya birikimlerimle ilgili yeni planlarım',
  },
  {
    id: 7,
    title: 'Gelecek Para Planları',
    desc: 'Parayla ilgili gelecek planlarım',
    description: 'Parayla ilgili gelecek planlarım',
  },
  {
    id: 8,
    title: 'Para Kazanma Yetenekleri',
    desc: 'Para kazanmak için ne gibi özel yeteneklerim var?',
    description: 'Para kazanmak için ne gibi özel yeteneklerim var?',
  },
];

const MONEY_POSITIONS_LAYOUT: PositionLayout[] = [
  {
    id: 1,
    className:
      'absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 2,
    className:
      'absolute top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 3,
    className:
      'absolute top-[70%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 4,
    className:
      'absolute top-[70%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 5,
    className:
      'absolute top-[45%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 6,
    className:
      'absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 7,
    className:
      'absolute top-[45%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 8,
    className:
      'absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
  },
];

// Problem Solving Spread Position Data
const PROBLEM_SOLVING_POSITIONS_INFO: PositionInfo[] = [
  {
    id: 1,
    title: 'Sorulan Soru',
    desc: 'Açılımın temelini oluşturan ana soru veya konu',
    description: 'Açılımın temelini oluşturan ana soru veya konu',
  },
  {
    id: 2,
    title: 'Sorunun Engeli',
    desc: 'Sorunun önündeki temel engel veya zorluk',
    description: 'Sorunun önündeki temel engel veya zorluk',
  },
  {
    id: 3,
    title: 'Şuur Altı Konu Geçmişi',
    desc: 'Konunun bilinçaltındaki kökenleri veya geçmiş etkileri',
    description: 'Konunun bilinçaltındaki kökenleri veya geçmiş etkileri',
  },
  {
    id: 4,
    title: 'En İyi Potansiyel',
    desc: 'Bu konuda kendimiz için ulaşabileceğimiz en iyi durum',
    description: 'Bu konuda kendimiz için ulaşabileceğimiz en iyi durum',
  },
  {
    id: 5,
    title: 'Yakın Geçmiş',
    desc: 'Konuyla ilgili yakın geçmişteki olaylar veya etkiler',
    description: 'Konuyla ilgili yakın geçmişteki olaylar veya etkiler',
  },
  {
    id: 6,
    title: 'Yakın Gelecek',
    desc: 'Konuyla ilgili yakın gelecekteki olası gelişmeler',
    description: 'Konuyla ilgili yakın gelecekteki olası gelişmeler',
  },
  {
    id: 7,
    title: 'Mevcut Durum',
    desc: 'Şu anki durumumuz, konuya dair mevcut halimiz',
    description: 'Şu anki durumumuz, konuya dair mevcut halimiz',
  },
  {
    id: 8,
    title: 'Dış Etkiler',
    desc: 'Konuyu etkileyen dış faktörler, çevresel koşullar',
    description: 'Konuyu etkileyen dış faktörler, çevresel koşullar',
  },
  {
    id: 9,
    title: 'Korkular ve Endişeler',
    desc: 'Konuyla ilgili içsel korkularımız ve endişelerimiz',
    description: 'Konuyla ilgili içsel korkularımız ve endişelerimiz',
  },
  {
    id: 10,
    title: 'Olayın Sonucu',
    desc: 'Konunun veya olayın nihai sonucu, olası çözümü',
    description: 'Konunun veya olayın nihai sonucu, olası çözümü',
  },
];

const PROBLEM_SOLVING_POSITIONS_LAYOUT: PositionLayout[] = [
  {
    id: 1,
    className:
      'absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 2,
    className:
      'absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 rotate-90 z-30',
  },
  {
    id: 3,
    className:
      'absolute top-[65%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 4,
    className:
      'absolute top-[25%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 5,
    className:
      'absolute top-[45%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 6,
    className:
      'absolute top-[45%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 7,
    className:
      'absolute top-[20%] right-[5%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 8,
    className:
      'absolute top-[35%] right-[5%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 9,
    className:
      'absolute top-[50%] right-[5%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
  {
    id: 10,
    className:
      'absolute top-[65%] right-[5%] -translate-x-1/2 -translate-y-1/2 z-20',
  },
];

// Marriage Spread Position Data
const MARRIAGE_POSITIONS_INFO: PositionInfo[] = [
  {
    id: 1,
    title: 'Sonuç ne olacak?',
    desc: 'Evlilik sürecinizin genel sonucunu ve nasıl ilerleyeceğini gösterir.',
    description:
      'Evlilik sürecinizin genel sonucunu ve nasıl ilerleyeceğini gösterir.',
  },
  {
    id: 2,
    title: 'Eşimi beklerken benim ne yapmam gerekiyor?',
    desc: 'Doğru kişiyi bulana kadar kendinizi nasıl geliştirmeniz gerektiğini gösterir.',
    description:
      'Doğru kişiyi bulana kadar kendinizi nasıl geliştirmeniz gerektiğini gösterir.',
  },
  {
    id: 3,
    title: 'Mali kaynaklarımızı birbirimizle paylaşacak mıyız?',
    desc: 'Evlilikte mali konularda uyumunuzu ve paylaşımınızı gösterir.',
    description:
      'Evlilikte mali konularda uyumunuzu ve paylaşımınızı gösterir.',
  },
  {
    id: 4,
    title: 'Her ikimiz de bağlanmak isteyecek miyiz?',
    desc: 'Her iki tarafın da evliliğe hazır olup olmadığını ve bağlanma isteğini gösterir.',
    description:
      'Her iki tarafın da evliliğe hazır olup olmadığını ve bağlanma isteğini gösterir.',
  },
  {
    id: 5,
    title: 'Benzer yanlarımız olacak mı?',
    desc: 'Ortak değerleriniz, benzerlikleriniz ve uyumunuzu gösterir.',
    description: 'Ortak değerleriniz, benzerlikleriniz ve uyumunuzu gösterir.',
  },
  {
    id: 6,
    title: 'Bu kişinin ailesi beni kabul edecek mi?',
    desc: 'Aile onayı ve aile ilişkilerinizin nasıl olacağını gösterir.',
    description: 'Aile onayı ve aile ilişkilerinizin nasıl olacağını gösterir.',
  },
  {
    id: 7,
    title: 'Birbirimizi nasıl bulacağız?',
    desc: 'Doğru kişiyle nasıl tanışacağınızı ve buluşacağınızı gösterir.',
    description:
      'Doğru kişiyle nasıl tanışacağınızı ve buluşacağınızı gösterir.',
  },
  {
    id: 8,
    title: 'Anlaşabilecek miyiz?',
    desc: 'İletişim uyumunuzu ve birbirinizi anlama kapasitenizi gösterir.',
    description:
      'İletişim uyumunuzu ve birbirinizi anlama kapasitenizi gösterir.',
  },
  {
    id: 9,
    title: 'Benim için nasıl bir eş uygundur?',
    desc: 'İdeal eşinizin özelliklerini ve sizinle uyumlu olacak kişiyi gösterir.',
    description:
      'İdeal eşinizin özelliklerini ve sizinle uyumlu olacak kişiyi gösterir.',
  },
  {
    id: 10,
    title: 'Evlenebilecek miyim?',
    desc: 'Evlilik potansiyelinizi ve evlenme şansınızı gösterir.',
    description: 'Evlilik potansiyelinizi ve evlenme şansınızı gösterir.',
  },
];

const MARRIAGE_POSITIONS_LAYOUT: PositionLayout[] = [
  // Üst sıra (10, 9, 8)
  {
    id: 10,
    className:
      'absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol üst
  {
    id: 9,
    className:
      'absolute top-[15%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Merkez üst
  {
    id: 8,
    className:
      'absolute top-[15%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ üst

  // Orta sıra - Sol daire (7, 6)
  {
    id: 7,
    className:
      'absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol daire üst
  {
    id: 6,
    className:
      'absolute top-[55%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol daire alt

  // Orta sıra - Sağ daire (5, 4)
  {
    id: 5,
    className:
      'absolute top-[35%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ daire üst
  {
    id: 4,
    className:
      'absolute top-[55%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ daire alt

  // Alt sıra (3, 2, 1)
  {
    id: 3,
    className:
      'absolute top-[85%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol alt
  {
    id: 2,
    className:
      'absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Merkez alt
  {
    id: 1,
    className:
      'absolute top-[85%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ alt
];

// Relationship Analysis Spread Position Data
const RELATIONSHIP_ANALYSIS_POSITIONS_INFO: PositionInfo[] = [
  {
    id: 1,
    title: 'Mevcut Durum',
    desc: 'İlişkinin mevcut şartları, içinde bulunduğu durum ve varsa problemlerin yarattığı atmosfer hakkında bilgi verir.',
    description:
      'İlişkinin mevcut şartları, içinde bulunduğu durum ve varsa problemlerin yarattığı atmosfer hakkında bilgi verir.',
  },
  {
    id: 2,
    title: 'Sizin Hissleriniz',
    desc: 'Sizin hisleriniz, düşünceleriniz ve partnerinize bakış açınızı gösterir. İlişkideki duygusal durumunuzu yansıtır.',
    description:
      'Sizin hisleriniz, düşünceleriniz ve partnerinize bakış açınızı gösterir. İlişkideki duygusal durumunuzu yansıtır.',
  },
  {
    id: 3,
    title: 'Sizin Beklentileriniz',
    desc: 'Sizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerinizi, beklentilerinizi ve hayallerinizi gösterir.',
    description:
      'Sizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerinizi, beklentilerinizi ve hayallerinizi gösterir.',
  },
  {
    id: 4,
    title: 'Tavsiyeler',
    desc: 'İlişkinizin gidişatı ile ilgili sergileyeceğiniz tutum ile ilgili tavsiyeleri içerir. Nasıl davranmanız gerektiğini gösterir.',
    description:
      'İlişkinizin gidişatı ile ilgili sergileyeceğiniz tutum ile ilgili tavsiyeleri içerir. Nasıl davranmanız gerektiğini gösterir.',
  },
  {
    id: 5,
    title: 'Yol Haritası',
    desc: 'Bu ilişkide ya da var olan sorun karşısında takınmanız gereken tavır ve nasıl bir yol izlemeniz konusunda size yol gösterir.',
    description:
      'Bu ilişkide ya da var olan sorun karşısında takınmanız gereken tavır ve nasıl bir yol izlemeniz konusunda size yol gösterir.',
  },
  {
    id: 6,
    title: 'Partnerinizin Beklentileri',
    desc: 'Partnerinizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerini, beklentilerini ve hayallerini gösterir.',
    description:
      'Partnerinizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerini, beklentilerini ve hayallerini gösterir.',
  },
  {
    id: 7,
    title: 'Partnerinizin Hissleri',
    desc: 'Partnerinizin hislerini, düşüncelerini ve size bakış açısını gösterir. İlişkideki duygusal durumunu yansıtır.',
    description:
      'Partnerinizin hislerini, düşüncelerini ve size bakış açısını gösterir. İlişkideki duygusal durumunu yansıtır.',
  },
];

const RELATIONSHIP_ANALYSIS_POSITIONS_LAYOUT: PositionLayout[] = [
  {
    id: 1,
    className:
      'absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
  }, // Merkez - Mevcut Durum
  {
    id: 2,
    className:
      'absolute top-[20%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ üst - Sizin Hissleriniz
  {
    id: 3,
    className:
      'absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ orta - Sizin Beklentileriniz
  {
    id: 4,
    className:
      'absolute top-[80%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ alt - Tavsiyeler
  {
    id: 5,
    className:
      'absolute top-[80%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol alt - Yol Haritası
  {
    id: 6,
    className:
      'absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol orta - Partnerinizin Beklentileri
  {
    id: 7,
    className:
      'absolute top-[20%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol üst - Partnerinizin Hissleri
];

// Relationship Problems Spread Position Data
const RELATIONSHIP_PROBLEMS_POSITIONS_INFO: PositionInfo[] = [
  {
    id: 1,
    title: 'Çelişki nedir?',
    desc: 'İlişkinizdeki iç çelişkileri ve çatışmaları gösterir. Hangi konularda anlaşamadığınızı ve neden çelişki yaşadığınızı anlamanıza yardımcı olur.',
    description:
      'İlişkinizdeki iç çelişkileri ve çatışmaları gösterir. Hangi konularda anlaşamadığınızı ve neden çelişki yaşadığınızı anlamanıza yardımcı olur.',
  },
  {
    id: 2,
    title: 'Sorun nedir?',
    desc: 'İlişkinizdeki ana problemi ve temel sorunu ortaya koyar. Hangi konunun en büyük zorluk yarattığını gösterir.',
    description:
      'İlişkinizdeki ana problemi ve temel sorunu ortaya koyar. Hangi konunun en büyük zorluk yarattığını gösterir.',
  },
  {
    id: 3,
    title: 'Sorunu ben mi yarattım?',
    desc: 'Sorunun kaynağında sizin payınızı ve sorumluluğunuzu gösterir. Kendi davranışlarınızın soruna nasıl katkıda bulunduğunu anlamanıza yardımcı olur.',
    description:
      'Sorunun kaynağında sizin payınızı ve sorumluluğunuzu gösterir. Kendi davranışlarınızın soruna nasıl katkıda bulunduğunu anlamanıza yardımcı olur.',
  },
  {
    id: 4,
    title: 'Bu sorundaki payımı görmezden mi geliyorum?',
    desc: 'Kendi sorumluluğunuzu kabul etme konusundaki durumunuzu gösterir. Kendi hatalarınızı görmezden gelip gelmediğinizi ortaya koyar.',
    description:
      'Kendi sorumluluğunuzu kabul etme konusundaki durumunuzu gösterir. Kendi hatalarınızı görmezden gelip gelmediğinizi ortaya koyar.',
  },
  {
    id: 5,
    title: 'Birlikte olduğum kişiyle geçmişteki deneyimlerim',
    desc: 'Partnerinizle yaşadığınız geçmiş deneyimlerin mevcut sorunlara etkisini gösterir. Geçmişin bugüne nasıl yansıdığını anlamanıza yardımcı olur.',
    description:
      'Partnerinizle yaşadığınız geçmiş deneyimlerin mevcut sorunlara etkisini gösterir. Geçmişin bugüne nasıl yansıdığını anlamanıza yardımcı olur.',
  },
  {
    id: 6,
    title: 'Birbirimizi suistimal mi ediyoruz?',
    desc: 'İlişkinizde karşılıklı saygı ve sağlıklı sınırların durumunu gösterir. Birbirinizi nasıl etkilediğinizi ve zarar verip vermediğinizi ortaya koyar.',
    description:
      'İlişkinizde karşılıklı saygı ve sağlıklı sınırların durumunu gösterir. Birbirinizi nasıl etkilediğinizi ve zarar verip vermediğinizi ortaya koyar.',
  },
  {
    id: 7,
    title: 'Sorunumuza karışan başka insanlar var mı?',
    desc: 'İlişkinizi etkileyen dış faktörleri ve üçüncü kişileri gösterir. Aile, arkadaşlar veya diğer insanların sorununuza nasıl etki ettiğini anlamanıza yardımcı olur.',
    description:
      'İlişkinizi etkileyen dış faktörleri ve üçüncü kişileri gösterir. Aile, arkadaşlar veya diğer insanların sorununuza nasıl etki ettiğini anlamanıza yardımcı olur.',
  },
  {
    id: 8,
    title: 'İlişkimizi etkileyen maddi sorunlar var mı?',
    desc: 'Para, iş, maddi durum gibi faktörlerin ilişkinize etkisini gösterir. Ekonomik sorunların ilişkinizi nasıl etkilediğini ortaya koyar.',
    description:
      'Para, iş, maddi durum gibi faktörlerin ilişkinize etkisini gösterir. Ekonomik sorunların ilişkinizi nasıl etkilediğini ortaya koyar.',
  },
  {
    id: 9,
    title: 'Bu ilişki sürecek mi?',
    desc: 'İlişkinizin geleceği hakkında öngörü sunar. Mevcut sorunların çözülüp çözülmeyeceği ve ilişkinin devam edip etmeyeceği konusunda bilgi verir.',
    description:
      'İlişkinizin geleceği hakkında öngörü sunar. Mevcut sorunların çözülüp çözülmeyeceği ve ilişkinin devam edip etmeyeceği konusunda bilgi verir.',
  },
];

const RELATIONSHIP_PROBLEMS_POSITIONS_LAYOUT: PositionLayout[] = [
  // Üst sıra (7, 8, 9)
  {
    id: 7,
    className:
      'absolute top-[85%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol üst
  {
    id: 8,
    className:
      'absolute top-[65%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Merkez üst
  {
    id: 9,
    className:
      'absolute top-[85%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ üst

  // Sağ daire (1, 2)
  {
    id: 1,
    className:
      'absolute top-[65%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ daire alt
  {
    id: 2,
    className:
      'absolute top-[65%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sağ daire üst

  // Sol daire (3, 4)
  {
    id: 3,
    className:
      'absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol daire alt
  {
    id: 4,
    className:
      'absolute top-[25%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sol daire üst

  // Merkez kesişim (5, 6)
  {
    id: 5,
    className:
      'absolute top-[12%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
  }, // Merkez alt
  {
    id: 6,
    className:
      'absolute top-[25%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-30',
  }, // Merkez üst
];

// New Lover Spread Position Data
const NEW_LOVER_POSITIONS_INFO: PositionInfo[] = [
  {
    id: 1,
    title: 'Yakında yeni bir ilişki yaşayacak mıyım?',
    desc: 'Gelecekteki ilişki potansiyelinizi gösterir',
    description:
      'Bu pozisyon, yakın gelecekte yeni bir ilişki yaşayıp yaşamayacağınızı ve bu ilişkinin nasıl başlayacağını gösterir.',
  },
  {
    id: 2,
    title: 'Bu kişi hangi burçtan olacak?',
    desc: 'Gelecekteki partnerinizin astrolojik özelliklerini gösterir',
    description:
      'Bu pozisyon, gelecekteki partnerinizin burç özelliklerini ve kişilik yapısını ortaya koyar.',
  },
  {
    id: 3,
    title: 'Birbirimizle uyumlu olacak mıyız?',
    desc: 'İlişkinizdeki uyum ve uyumsuzlukları gösterir',
    description:
      'Bu pozisyon, gelecekteki partnerinizle aranızdaki uyumu, ortak noktaları ve potansiyel zorlukları gösterir.',
  },
  {
    id: 4,
    title: 'Uzun süreli bir ilişki olacak mı?',
    desc: 'İlişkinizin sürekliliğini ve derinliğini gösterir',
    description:
      'Bu pozisyon, gelecekteki ilişkinizin ne kadar süreceğini ve ne kadar derin olacağını gösterir.',
  },
  {
    id: 5,
    title: 'Bu kişi benim ruh eşim olabilir mi?',
    desc: 'Ruhsal bağlantı ve derin aşk potansiyelini gösterir',
    description:
      'Bu pozisyon, gelecekteki partnerinizin ruh eşiniz olup olmadığını ve aranızdaki ruhsal bağı gösterir.',
  },
  {
    id: 6,
    title: 'Dileğim gerçekleşecek mi?',
    desc: 'Aşk dileğinizin gerçekleşme olasılığını gösterir',
    description:
      'Bu pozisyon, aşk dileğinizin gerçekleşip gerçekleşmeyeceğini ve bunun için ne yapmanız gerektiğini gösterir.',
  },
];

const NEW_LOVER_POSITIONS_LAYOUT: PositionLayout[] = [
  {
    id: 1,
    className:
      'absolute top-[65%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // sağ altta
  {
    id: 2,
    className:
      'absolute top-[65%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // sol altta
  {
    id: 3,
    className:
      'absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 -rotate-6 z-20',
  }, // en sol (hafif yana kayık)
  {
    id: 4,
    className:
      'absolute top-[30%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // üst sol
  {
    id: 5,
    className:
      'absolute top-[30%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // üst sağ
  {
    id: 6,
    className:
      'absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 rotate-6 z-20',
  }, // en sağ (hafif yana kayık)
];

// Situation Analysis Spread Position Data
const SITUATION_ANALYSIS_POSITIONS_INFO: PositionInfo[] = [
  {
    id: 1,
    title: 'Geçmiş ya da Sebepler',
    desc: 'Yaşanan durumun sebepleri, neden şu anda böyle bir durumun yaşandığı ve yapılan tüm hatalar bu kartta belirtilir. Geçmişin değiştirilemez olduğu vurgulanır.',
    description:
      'Yaşanan durumun sebepleri, neden şu anda böyle bir durumun yaşandığı ve yapılan tüm hatalar bu kartta belirtilir. Geçmişin değiştirilemez olduğu vurgulanır.',
  },
  {
    id: 2,
    title: 'Şu Anki Durum',
    desc: 'Şu anda neler yaşandığı, gündemdeki konular ve geçmişin bugüne göre nasıl bir etkisi olduğu belirtilir.',
    description:
      'Şu anda neler yaşandığı, gündemdeki konular ve geçmişin bugüne göre nasıl bir etkisi olduğu belirtilir.',
  },
  {
    id: 3,
    title: 'Gizli Etkenler',
    desc: 'Kişinin bilgisi dışında gelişen olaylar, arkasından konuşanlar, gizli işler ve bilinmeyen gerçekler bu kartta gizlidir.',
    description:
      'Kişinin bilgisi dışında gelişen olaylar, arkasından konuşanlar, gizli işler ve bilinmeyen gerçekler bu kartta gizlidir.',
  },
  {
    id: 4,
    title: 'Merkez Kart',
    desc: 'Açılımın merkezini temsil eder. Durumun merkezindeki kişiyi veya hayatınızdaki en merkezi alanı ifade eder.',
    description:
      'Açılımın merkezini temsil eder. Durumun merkezindeki kişiyi veya hayatınızdaki en merkezi alanı ifade eder.',
  },
  {
    id: 5,
    title: 'Dış Etkenler',
    desc: 'Farklı kaynaklardan gelecek bilgiler ve geleceğe dair açılar sunar. Dış saldırılar ve olası entrikalara da işaret edebilir.',
    description:
      'Farklı kaynaklardan gelecek bilgiler ve geleceğe dair açılar sunar. Dış saldırılar ve olası entrikalara da işaret edebilir.',
  },
  {
    id: 6,
    title: 'Tavsiye',
    desc: 'Yaşanan durumla ilgili en uygun hareketlerin ne olduğu hakkında bilgi verir. Çözüm veya çıkış yolu sunabileceği belirtilir.',
    description:
      'Yaşanan durumla ilgili en uygun hareketlerin ne olduğu hakkında bilgi verir. Çözüm veya çıkış yolu sunabileceği belirtilir.',
  },
  {
    id: 7,
    title: 'Olası Gelecek - Sonuç',
    desc: 'Mevcut gidişatın nereye varacağını, olası engelleri veya sürprizleri gösterir. Geleceğin, alınacak kararlara bağlı olarak değişebileceği belirtilir.',
    description:
      'Mevcut gidişatın nereye varacağını, olası engelleri veya sürprizleri gösterir. Geleceğin, alınacak kararlara bağlı olarak değişebileceği belirtilir.',
  },
];

const SITUATION_ANALYSIS_POSITIONS_LAYOUT: PositionLayout[] = [
  {
    id: 1,
    className:
      'absolute top-[86%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10',
  }, // Geçmiş
  {
    id: 2,
    className:
      'absolute top-[61%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Şimdi (1 ve 3 ile hafif overlap)
  {
    id: 3,
    className:
      'absolute top-[36%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10',
  }, // Gelecek
  {
    id: 4,
    className:
      'absolute top-[18%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
  }, // Tavsiye (üstte, 3'ün üstüne biner)
  {
    id: 5,
    className:
      'absolute top-[36%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Etkiler
  {
    id: 6,
    className:
      'absolute top-[61%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Engeller
  {
    id: 7,
    className:
      'absolute top-[86%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
  }, // Sonuç
];

const DEFAULT_CANVAS_I18N = {
  selectReadingTitle: 'reading.prompts.selectReadingTitle',
  selectReadingDescription: 'reading.prompts.selectReadingDescription',
  lockedTitle: 'reading.prompts.lockedStateTitle',
  lockedDescription: 'reading.prompts.lockedStateDescription',
} as const;

const createFormI18nKeys = (spreadId: string): FormI18nKeys => ({
  personalInfo: `${spreadId}.form.personalInfo`,
  firstName: `${spreadId}.form.firstName`,
  lastName: `${spreadId}.form.lastName`,
  birthDate: `${spreadId}.form.birthDate`,
  email: `${spreadId}.form.email`,
  phone: `${spreadId}.form.phone`,
  communicationMethod: `${spreadId}.form.communicationMethod`,
  emailCommunication: `${spreadId}.form.emailCommunication`,
  whatsappCommunication: `${spreadId}.form.whatsappCommunication`,
  questions: `${spreadId}.form.questions`,
  concernQuestion: `${spreadId}.form.concernQuestion`,
  understandingQuestion: `${spreadId}.form.understandingQuestion`,
  emotionalQuestion: `${spreadId}.form.emotionalQuestion`,
  saving: `${spreadId}.form.saving`,
  saveAndOpen: `${spreadId}.form.saveAndOpen`,
  clearAll: `${spreadId}.form.clearAll`,
  placeholders: {
    firstName: `${spreadId}.form.placeholders.firstName`,
    lastName: `${spreadId}.form.placeholders.lastName`,
    email: `${spreadId}.form.placeholders.email`,
    phone: `${spreadId}.form.placeholders.phone`,
    concernQuestion: `${spreadId}.form.placeholders.concernQuestion`,
    understandingQuestion: `${spreadId}.form.placeholders.understandingQuestion`,
    emotionalQuestion: `${spreadId}.form.placeholders.emotionalQuestion`,
  },
});

const mergeI18nKeys = (
  base: I18nKeys,
  overrides?: Partial<I18nKeys>
): I18nKeys => {
  if (!overrides) {
    return base;
  }

  return {
    modals: {
      ...base.modals,
      ...overrides.modals,
    },
    form: {
      ...base.form,
      ...overrides.form,
      placeholders: {
        ...(base.form.placeholders ?? {}),
        ...(overrides.form?.placeholders ?? {}),
      },
    },
    canvas: {
      ...base.canvas,
      ...overrides.canvas,
    },
  };
};

/**
 * Tarot konfigürasyonu oluşturma parametreleri
 */
export interface CreateTarotConfigParams {
  spreadId: string;
  translationNamespace?: string;
  summaryKey?: string;
  spreadName?: string;
  positionsInfo: readonly PositionInfo[];
  positionsLayout: readonly PositionLayout[];
  theme: TarotTheme;
  icon: string;
  readingType: string;
  supabaseReadingType?: string;
  creditKeyPrefix?: string;
  customValidationKeys?: Partial<ValidationKeys>;
  customI18nKeys?: Partial<I18nKeys>;
  customCreditKeys?: Partial<CreditKeys>;
  backgroundImage?: string;
  backgroundAlt?: string;
}

/**
 * Tarot konfigürasyonu oluşturma fonksiyonu
 * Tüm spread'ler için standart konfigürasyon sağlar
 */
export function createTarotConfig(
  params: CreateTarotConfigParams
): TarotConfig {
  const {
    spreadId,
    translationNamespace,
    summaryKey,
    spreadName,
    positionsInfo,
    positionsLayout,
    theme,
    icon,
    readingType,
    supabaseReadingType,
    creditKeyPrefix,
    customValidationKeys,
    customI18nKeys,
    customCreditKeys,
    backgroundImage,
    backgroundAlt,
  } = params;

  const namespace = translationNamespace ?? toCamelCase(spreadId);
  const summaryKeyValue = summaryKey ?? `${namespace}Spread`;
  const supabaseReadingTypeValue = supabaseReadingType ?? namespace;
  const creditPrefix = creditKeyPrefix ?? toUpperSnakeCase(namespace);

  const formI18nKeys = createFormI18nKeys(namespace);

  const defaultCreditKeys: CreditKeys = {
    detailed: `${creditPrefix}_DETAILED`,
    written: `${creditPrefix}_WRITTEN`,
    ...customCreditKeys,
  };

  // Varsayılan validasyon anahtarları
  const defaultValidationKeys: ValidationKeys = {
    nameMinLength: `${namespace}.validation.nameMinLength`,
    surnameMinLength: `${namespace}.validation.surnameMinLength`,
    birthDateRequired: `${namespace}.validation.birthDateRequired`,
    emailInvalid: `${namespace}.validation.emailInvalid`,
    questionMinLength: `${namespace}.validation.questionMinLength`,
    ...customValidationKeys,
  };

  // Varsayılan i18n anahtarları
  const defaultI18nKeys: I18nKeys = {
    modals: {
      // i18n-ally: love.modals.infoTitle
      infoTitle: `${namespace}.modals.infoTitle`,
      // i18n-ally: love.modals.aboutSpread
      aboutSpread: `${namespace}.modals.aboutSpread`,
      // i18n-ally: love.modals.aboutSpreadText
      aboutSpreadText: `${namespace}.modals.aboutSpreadText`,
      // i18n-ally: love.modals.cardCount
      cardCount: `${namespace}.modals.cardCount`,
      // i18n-ally: love.modals.cardCountText
      cardCountText: `${namespace}.modals.cardCountText`,
      // i18n-ally: love.modals.loveAttentionInfo
      loveAttentionInfo: `${namespace}.modals.loveAttentionInfo`,
      // i18n-ally: love.modals.loveAttention
      loveAttention: `${namespace}.modals.loveAttention`,
      // i18n-ally: love.modals.detailedReading
      detailedReading: `${namespace}.modals.detailedReading`,
      // i18n-ally: love.modals.detailedReadingText
      detailedReadingText: `${namespace}.modals.detailedReadingText`,
      // i18n-ally: love.modals.writtenReading
      writtenReading: `${namespace}.modals.writtenReading`,
      // i18n-ally: love.modals.writtenReadingText
      writtenReadingText: `${namespace}.modals.writtenReadingText`,
      // i18n-ally: love.modals.process
      process: `${namespace}.modals.process`,
      // i18n-ally: love.modals.step1
      step1: `${namespace}.modals.step1`,
      // i18n-ally: love.modals.step2
      step2: `${namespace}.modals.step2`,
      // i18n-ally: love.modals.step3
      step3: `${namespace}.modals.step3`,
      // i18n-ally: love.modals.step4
      step4: `${namespace}.modals.step4`,
      // i18n-ally: love.modals.cancel
      cancel: `${namespace}.modals.cancel`,
      // i18n-ally: love.modals.continue
      continue: `${namespace}.modals.continue`,
      // i18n-ally: love.modals.creditConfirm
      creditConfirm: `${namespace}.modals.creditConfirm`,
      // i18n-ally: love.modals.creditConfirmMessage
      creditConfirmMessage: `${namespace}.modals.creditConfirmMessage`,
      // i18n-ally: love.modals.processing
      processing: `${namespace}.modals.processing`,
      // i18n-ally: love.modals.confirm
      confirm: `${namespace}.modals.confirm`,
      // i18n-ally: love.modals.savingReading
      savingReading: `${namespace}.modals.savingReading`,
      // i18n-ally: love.modals.saveReading
      saveReading: `${namespace}.modals.saveReading`,
      // i18n-ally: love.modals.successTitle
      successTitle: `${namespace}.modals.successTitle`,
      // i18n-ally: love.modals.successMessage
      successMessage: `${namespace}.modals.successMessage`,
      // i18n-ally: love.modals.redirecting
      redirecting: `${namespace}.modals.redirecting`,
    },
    form: formI18nKeys,
    canvas: { ...DEFAULT_CANVAS_I18N },
  };

  // Konfigürasyon objesi
  const config: TarotConfig = {
    spreadId,
    translationNamespace: namespace,
    summaryKey: summaryKeyValue,
    spreadName: spreadName || `${namespace}.data.spreadName`,
    cardCount: positionsInfo.length,
    positionsInfo: positionsInfo as any,
    positionsLayout: positionsLayout as any,
    theme,
    icon,
    backgroundImage: backgroundImage || `/images/bg-${spreadId}-tarot.jpg`,
    backgroundAlt: backgroundAlt || `${spreadId} Tarot Reading background`,
    readingType,
    supabaseReadingType: supabaseReadingTypeValue,
    creditKeyPrefix: creditPrefix,
    creditKeys: defaultCreditKeys,
    validationKeys: defaultValidationKeys,
    i18nKeys: mergeI18nKeys(defaultI18nKeys, customI18nKeys),
  };

  return TarotConfigSchema.parse(config);
}

/**
 * Career spread için özel konfigürasyon
 */
export function createCareerConfig(): TarotConfig {
  return createTarotConfig({
    spreadId: 'career',
    translationNamespace: 'career',
    summaryKey: 'careerSpread',
    positionsInfo: CAREER_POSITIONS_INFO,
    positionsLayout: CAREER_POSITIONS_LAYOUT as readonly PositionLayout[],
    theme: 'blue',
    icon: '💼',
    readingType: 'CAREER_SPREAD',
    supabaseReadingType: 'career', // Veritabanında mevcut enum değeri
    creditKeyPrefix: 'CAREER_SPREAD',
  });
}

/**
 * Love spread için özel konfigürasyon
 */
export function createLoveConfig(): TarotConfig {
  return createTarotConfig({
    spreadId: 'love',
    translationNamespace: 'love',
    summaryKey: 'loveSpread',
    positionsInfo: LOVE_POSITIONS_INFO,
    positionsLayout: LOVE_POSITIONS_LAYOUT,
    theme: 'pink',
    icon: '💕',
    readingType: 'LOVE_SPREAD',
    supabaseReadingType: 'love', // Veritabanında mevcut enum değeri
    creditKeyPrefix: 'LOVE_SPREAD',
  });
}

/**
 * Money spread için özel konfigürasyon
 */
export function createMoneyConfig(): TarotConfig {
  return createTarotConfig({
    spreadId: 'money',
    translationNamespace: 'money',
    summaryKey: 'moneySpread',
    positionsInfo: MONEY_POSITIONS_INFO,
    positionsLayout: MONEY_POSITIONS_LAYOUT,
    theme: 'green',
    icon: '💰',
    readingType: 'MONEY_SPREAD',
    supabaseReadingType: 'money', // Veritabanında mevcut enum değeri
    creditKeyPrefix: 'MONEY_SPREAD',
  });
}

/**
 * Problem Solving spread için özel konfigürasyon
 */
export function createProblemSolvingConfig(): TarotConfig {
  return createTarotConfig({
    spreadId: 'problem-solving',
    spreadName: 'problemSolving',
    translationNamespace: 'problemSolving',
    summaryKey: 'problemSolvingSpread',
    positionsInfo: PROBLEM_SOLVING_POSITIONS_INFO,
    positionsLayout: PROBLEM_SOLVING_POSITIONS_LAYOUT,
    theme: 'orange',
    icon: '🧩',
    readingType: 'PROBLEM_SOLVING_SPREAD',
    supabaseReadingType: 'problem-solving', // Veritabanında mevcut enum değeri
    creditKeyPrefix: 'PROBLEM_SOLVING',
  });
}

/**
 * Marriage spread için özel konfigürasyon
 */
export function createMarriageConfig(): TarotConfig {
  return createTarotConfig({
    spreadId: 'marriage',
    translationNamespace: 'marriage',
    summaryKey: 'marriageSpread',
    positionsInfo: MARRIAGE_POSITIONS_INFO,
    positionsLayout: MARRIAGE_POSITIONS_LAYOUT,
    theme: 'pink',
    icon: '💒',
    readingType: 'MARRIAGE_SPREAD',
    supabaseReadingType: 'marriage', // Veritabanında mevcut enum değeri
    creditKeyPrefix: 'MARRIAGE',
  });
}

/**
 * Relationship Analysis spread için özel konfigürasyon
 */
export function createRelationshipAnalysisConfig(): TarotConfig {
  return createTarotConfig({
    spreadId: 'relationship-analysis',
    translationNamespace: 'relationshipAnalysis',
    summaryKey: 'relationshipAnalysisSpread',
    positionsInfo: RELATIONSHIP_ANALYSIS_POSITIONS_INFO,
    positionsLayout: RELATIONSHIP_ANALYSIS_POSITIONS_LAYOUT,
    theme: 'blue',
    icon: '💙',
    readingType: 'RELATIONSHIP_ANALYSIS_SPREAD',
    supabaseReadingType: 'relationship-analysis', // Veritabanında mevcut enum değeri
    creditKeyPrefix: 'RELATIONSHIP_ANALYSIS',
  });
}

/**
 * Relationship Problems spread için özel konfigürasyon
 */
export function createRelationshipProblemsConfig(): TarotConfig {
  return createTarotConfig({
    spreadId: 'relationship-problems',
    translationNamespace: 'relationshipProblems',
    summaryKey: 'relationshipProblemsSpread',
    positionsInfo: RELATIONSHIP_PROBLEMS_POSITIONS_INFO,
    positionsLayout: RELATIONSHIP_PROBLEMS_POSITIONS_LAYOUT,
    theme: 'red',
    icon: '💔',
    readingType: 'RELATIONSHIP_PROBLEMS_SPREAD',
    supabaseReadingType: 'relationship-problems', // Veritabanında mevcut enum değeri
    creditKeyPrefix: 'RELATIONSHIP_PROBLEMS',
  });
}

/**
 * Situation Analysis spread için özel konfigürasyon
 */
export function createNewLoverConfig(): TarotConfig {
  return createTarotConfig({
    spreadId: 'new-lover',
    translationNamespace: 'newLover',
    summaryKey: 'newLoverSpread',
    positionsInfo: NEW_LOVER_POSITIONS_INFO,
    positionsLayout: NEW_LOVER_POSITIONS_LAYOUT,
    theme: 'pink',
    icon: '💕',
    readingType: 'NEW_LOVER_SPREAD',
    supabaseReadingType: 'new-lover', // Veritabanında mevcut enum değeri
    creditKeyPrefix: 'NEW_LOVER',
  });
}

/**
 * Situation Analysis spread için özel konfigürasyon
 */
export function createSituationAnalysisConfig(): TarotConfig {
  return createTarotConfig({
    spreadId: 'situation-analysis',
    translationNamespace: 'situationAnalysis',
    summaryKey: 'situationAnalysisSpread',
    spreadName: 'situationAnalysis.data.spreadName',
    positionsInfo: SITUATION_ANALYSIS_POSITIONS_INFO,
    positionsLayout: SITUATION_ANALYSIS_POSITIONS_LAYOUT,
    theme: 'purple',
    icon: '🔮',
    readingType: 'SITUATION_ANALYSIS_SPREAD',
    supabaseReadingType: 'situation-analysis', // Veritabanında mevcut enum değeri
    creditKeyPrefix: 'SITUATION_ANALYSIS',
  });
}
