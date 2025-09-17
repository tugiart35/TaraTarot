/*
info:
Bağlantılı dosyalar:
- next/dynamic: Dinamik bileşen yükleme için (gerekli)
- @/components/specific/tarot/Love-Spread/LoveTarot: Aşk açılımı ana bileşeni (gerekli)
- @/lib/tarot/spreads/registry: Yeni modüler spread registry sistemi (modülerleştirme)

Dosyanın amacı:
- Tarot açılım türlerini, pozisyonlarını ve ilgili bileşenleri merkezi ve dinamik olarak tanımlamak. 
- Şu anda sadece Love spread desteklenmektedir.
- MODÜLERLEŞTIRME: Bu dosya artık eski sistemle yeni modüler sistem arasında köprü görevi görür.

Backend bağlantısı:
- Backend ile doğrudan bir bağlantı veya değişken yoktur. Ancak, tarot açılımı sonuçları backend'de user_readings, tarot_spreads gibi tablolarla ilişkili olabilir.

Geliştirme ve öneriler:
- Açıklamalar yeterli ve Türkçe, okunabilirlik yüksek.
- Dinamik import ile SSR uyumsuz bileşenler için iyi bir çözüm kullanılmış.
- Pozisyonlar ve layout yapısı esnek, yeni açılımlar kolayca eklenebilir.
- Yardımcı fonksiyonlar (findSpreadById, findPositionById) sade ve kullanışlı.
- MODÜLERLEŞTIRME: Yeni modüler sistem ile backward compatibility sağlanmış.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik ve sade yapı çok iyi.
- Tekrarsız, modüler ve merkezi yönetim sağlanmış.
- Güvenlik açısından risk yok, sadece frontend sabitleri ve bileşen referansları içeriyor.
- MODÜLERLEŞTIRME: İki sistem arasında geçiş güvenli ve kademeli yapılmış.

Gereklilik ve Kullanım Durumu:
- Dinamik import: Gerekli, Love açılım bileşeni için kullanılır.
- TarotCardPosition ve TarotSpread arayüzleri: Gerekli, tip güvenliği ve merkezi yönetim için kullanılır.
- tarotSpreads: Gerekli, açılım türlerinin merkezi yönetimi için ana kaynak.
- findSpreadById, findPositionById: Gerekli, açılım ve pozisyon bulma işlemleri için kullanılır.
- MODÜLERLEŞTIRME: Yeni modüler fonksiyonlar eklendi, eski fonksiyonlar korundu.
*/
import dynamic from 'next/dynamic';

const LoveReading = dynamic(
  () => import('@/features/tarot/components/Love-Spread/LoveTarot'),
  { ssr: false }
);

const CareerReading = dynamic(
  () => import('@/features/tarot/components/Career-Spread/CareerTarot'),
  { ssr: false }
);

const ProblemSolvingReading = dynamic(
  () =>
    import('@/features/tarot/components/Problem-Solving/ProblemSolvingTarot'),
  { ssr: false }
);

const SituationAnalysisReading = dynamic(
  () =>
    import(
      '@/features/tarot/components/Situation-Analysis/SituationAnalysisTarot'
    ),
  { ssr: false }
);

const RelationshipAnalysisReading = dynamic(
  () =>
    import(
      '@/features/tarot/components/Relationship-Analysis/RelationshipAnalysisTarot'
    ),
  { ssr: false }
);

const RelationshipProblemsReading = dynamic(
  () =>
    import(
      '@/features/tarot/components/Relationship-Problems/RelationshipProblemsTarot'
    ),
  { ssr: false }
);

const MarriageReading = dynamic(
  () => import('@/features/tarot/components/Marriage/MarriageTarot'),
  { ssr: false }
);

const NewLoverReading = dynamic(
  () => import('@/features/tarot/components/New-Lover/NewLoverTarot'),
  { ssr: false }
);

const MoneyReading = dynamic(
  () => import('@/features/tarot/components/Money-Spread/MoneyTarot'),
  { ssr: false }
);

// Tarot kart pozisyonu interface'i
export interface TarotCardPosition {
  id: number;
  title: string;
  description: string;
  className: string; // CSS pozisyon sınıfı
  x?: number; // Yüzde cinsinden X koordinatı (opsiyonel)
  y?: number; // Yüzde cinsinden Y koordinatı (opsiyonel)
}

// Tarot açılım türü interface'i - Genişletilmiş ve dinamik
export interface TarotSpread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  component: React.ComponentType<any> | null;
  icon: string;
  color: string;
  positions: TarotCardPosition[];
  layout: {
    type: 'custom' | 'grid' | 'circle' | 'linear';
    containerClass?: string;
    cardSize?: 'small' | 'medium' | 'large' | 'xlarge';
  };
  prompts?: {
    systemPrompt?: string;
    interpretationTemplate?: string;
  };
}

// Love spread pozisyonları
const lovePositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'İlgi Duyduğun Kişi',
    description: 'Hakkında soru sorduğun kişi',
    className:
      'absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 25,
  },
  {
    id: 2,
    title: 'Fiziksel/Cinsel Bağlantı',
    description: 'Fiziksel ve cinsel bağlantınız',
    className:
      'absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 50,
  },
  {
    id: 3,
    title: 'Duygusal/Ruhsal Bağlantı',
    description: 'Duygusal ve ruhsal bağlantınız',
    className:
      'absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 50,
  },
  {
    id: 4,
    title: 'Uzun Vadeli Sonuç',
    description: 'İlişkinin uzun vadeli sonucu',
    className:
      'absolute top-[75%] left-[37.5%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 37.5,
    y: 75,
  },
];

// Career spread pozisyonları
const careerPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'Mevcut Durumunuz',
    description:
      'Şu anki kariyer durumunuz ve iş hayatınızdaki mevcut konumunuz',
    className:
      'absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 50,
  },
  {
    id: 2,
    title: 'Engeller ve Zorluklar',
    description:
      'Kariyerinizde karşılaştığınız engeller ve aşmanız gereken zorluklar',
    className:
      'absolute top-1/2 left-[38%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 38,
    y: 50,
  },
  {
    id: 3,
    title: 'Fırsatlar ve Potansiyel',
    description:
      'Kariyerinizde önünüzdeki fırsatlar ve potansiyel gelişim alanları',
    className:
      'absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 62,
    y: 50,
  },
  {
    id: 4,
    title: 'Gelecek ve Hedefler',
    description: 'Kariyer hedefleriniz ve uzun vadeli gelecek planlarınız',
    className:
      'absolute top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 50,
  },
];

// Problem Solving spread pozisyonları
const problemSolvingPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'Sorulan Soru',
    description: 'Açılımın temelini oluşturan ana soru veya konu',
    className:
      'absolute top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 5,
  },
  {
    id: 2,
    title: 'Sorunun Engeli',
    description: 'Sorunun önündeki temel engel veya zorluk',
    className:
      'absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 25,
  },
  {
    id: 3,
    title: 'Şuur Altı Konu Geçmişi',
    description: 'Konunun bilinçaltındaki kökenleri veya geçmiş etkileri',
    className:
      'absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 45,
  },
  {
    id: 4,
    title: 'En İyi Potansiyel',
    description: 'Bu konuda kendimiz için ulaşabileceğimiz en iyi durum',
    className:
      'absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 15,
  },
  {
    id: 5,
    title: 'Yakın Geçmiş',
    description: 'Konuyla ilgili yakın geçmişteki olaylar veya etkiler',
    className:
      'absolute top-[15%] right-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 15,
  },
  {
    id: 6,
    title: 'Yakın Gelecek',
    description: 'Konuyla ilgili yakın gelecekteki olası gelişmeler',
    className:
      'absolute top-[35%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 35,
  },
  {
    id: 7,
    title: 'Mevcut Durum',
    description: 'Şu anki durumumuz, konuya dair mevcut halimiz',
    className:
      'absolute top-[35%] right-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 35,
  },
  {
    id: 8,
    title: 'Dış Etkiler',
    description: 'Konuyu etkileyen dış faktörler, çevresel koşullar',
    className:
      'absolute bottom-[15%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 20,
    y: 85,
  },
  {
    id: 9,
    title: 'Korkular ve Endişeler',
    description: 'Konuyla ilgili içsel korkularımız ve endişelerimiz',
    className:
      'absolute bottom-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 85,
  },
  {
    id: 10,
    title: 'Olayın Sonucu',
    description: 'Konunun veya olayın nihai sonucu, olası çözümü',
    className:
      'absolute bottom-[15%] right-[20%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 80,
    y: 85,
  },
];

// Situation Analysis spread pozisyonları
const situationAnalysisPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'Geçmiş ya da Sebepler',
    description:
      'Yaşanan durumun sebepleri, neden şu anda böyle bir durumun yaşandığı ve yapılan tüm hatalar bu kartta belirtilir.',
    className: 'absolute bottom-0 left-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 0,
    y: 100,
  },
  {
    id: 2,
    title: 'Şu Anki Durum',
    description:
      'Şu anda neler yaşandığı, gündemdeki konular ve geçmişin bugüne göre nasıl bir etkisi olduğu belirtilir.',
    className: 'absolute left-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 0,
    y: 60,
  },
  {
    id: 3,
    title: 'Gizli Etkenler',
    description:
      'Kişinin bilgisi dışında gelişen olaylar, arkasından konuşanlar, gizli işler ve bilinmeyen gerçekler bu kartta gizlidir.',
    className: 'absolute left-0 top-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 0,
    y: 0,
  },
  {
    id: 4,
    title: 'Merkez Kart',
    description:
      'Açılımın merkezini temsil eder. Durumun merkezindeki kişiyi veya hayatınızdaki en merkezi alanı ifade eder.',
    className: 'absolute top-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 50,
    y: 0,
  },
  {
    id: 5,
    title: 'Dış Etkenler',
    description:
      'Farklı kaynaklardan gelecek bilgiler ve geleceğe dair açılar sunar. Dış saldırılar ve olası entrikalara da işaret edebilir.',
    className: 'absolute right-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 100,
    y: 60,
  },
  {
    id: 6,
    title: 'Tavsiye',
    description:
      'Yaşanan durumla ilgili en uygun hareketlerin ne olduğu hakkında bilgi verir. Çözüm veya çıkış yolu sunabileceği belirtilir.',
    className: 'absolute bottom-0 right-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 100,
    y: 100,
  },
  {
    id: 7,
    title: 'Olası Gelecek - Sonuç',
    description:
      'Mevcut gidişatın nereye varacağını, olası engelleri veya sürprizleri gösterir. Geleceğin, alınacak kararlara bağlı olarak değişebileceği belirtilir.',
    className: 'absolute bottom-0 w-20 h-32 sm:w-24 sm:h-36',
    x: 50,
    y: 100,
  },
];

// Relationship Analysis spread pozisyonları
const relationshipAnalysisPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'Mevcut Durum',
    description:
      'İlişkinin mevcut şartları, içinde bulunduğu durum ve varsa problemlerin yarattığı atmosfer hakkında bilgi verir.',
    className:
      'absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
    x: 50,
    y: 50,
  },
  {
    id: 2,
    title: 'Sizin Hissleriniz',
    description:
      'Sizin hisleriniz, düşünceleriniz ve partnerinize bakış açınızı gösterir. İlişkideki duygusal durumunuzu yansıtır.',
    className:
      'absolute top-[20%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 70,
    y: 20,
  },
  {
    id: 3,
    title: 'Sizin Beklentileriniz',
    description:
      'Sizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerinizi, beklentilerinizi ve hayallerinizi gösterir.',
    className:
      'absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 50,
  },
  {
    id: 4,
    title: 'Tavsiyeler',
    description:
      'İlişkinizin gidişatı ile ilgili sergileyeceğiniz tutum ile ilgili tavsiyeleri içerir. Nasıl davranmanız gerektiğini gösterir.',
    className:
      'absolute top-[80%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 70,
    y: 80,
  },
  {
    id: 5,
    title: 'Yol Haritası',
    description:
      'Bu ilişkide ya da var olan sorun karşısında takınmanız gereken tavır ve nasıl bir yol izlemeniz konusunda size yol gösterir.',
    className:
      'absolute top-[80%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 30,
    y: 80,
  },
  {
    id: 6,
    title: 'Partnerinizin Beklentileri',
    description:
      'Partnerinizin ilişkiniz ya da içinde bulunduğunuz durum hakkında endişelerini, beklentilerini ve hayallerini gösterir.',
    className:
      'absolute top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 50,
  },
  {
    id: 7,
    title: 'Partnerinizin Hissleri',
    description:
      'Partnerinizin hislerini, düşüncelerini ve size bakış açısını gösterir. İlişkideki duygusal durumunu yansıtır.',
    className:
      'absolute top-[20%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 30,
    y: 20,
  },
];

// Relationship Problems spread pozisyonları
const relationshipProblemsPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'Çelişki nedir?',
    description:
      'İlişkinizdeki iç çelişkileri ve çatışmaları gösterir. Hangi konularda anlaşamadığınızı ve neden çelişki yaşadığınızı anlamanıza yardımcı olur.',
    className:
      'absolute top-[45%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 45,
  },
  {
    id: 2,
    title: 'Sorun nedir?',
    description:
      'İlişkinizdeki ana problemi ve temel sorunu ortaya koyar. Hangi konunun en büyük zorluk yarattığını gösterir.',
    className:
      'absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 25,
  },
  {
    id: 3,
    title: 'Sorunu ben mi yarattım?',
    description:
      'Sorunun kaynağında sizin payınızı ve sorumluluğunuzu gösterir. Kendi davranışlarınızın soruna nasıl katkıda bulunduğunu anlamanıza yardımcı olur.',
    className:
      'absolute top-[45%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 45,
  },
  {
    id: 4,
    title: 'Bu sorundaki payımı görmezden mi geliyorum?',
    description:
      'Kendi sorumluluğunuzu kabul etme konusundaki durumunuzu gösterir. Kendi hatalarınızı görmezden gelip gelmediğinizi ortaya koyar.',
    className:
      'absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 25,
  },
  {
    id: 5,
    title: 'Birlikte olduğum kişiyle geçmişteki deneyimlerim',
    description:
      'Partnerinizle yaşadığınız geçmiş deneyimlerin mevcut sorunlara etkisini gösterir. Geçmişin bugüne nasıl yansıdığını anlamanıza yardımcı olur.',
    className:
      'absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
    x: 50,
    y: 45,
  },
  {
    id: 6,
    title: 'Birbirimizi suistimal mi ediyoruz?',
    description:
      'İlişkinizde karşılıklı saygı ve sağlıklı sınırların durumunu gösterir. Birbirinizi nasıl etkilediğinizi ve zarar verip vermediğinizi ortaya koyar.',
    className:
      'absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
    x: 50,
    y: 25,
  },
  {
    id: 7,
    title: 'Sorunumuza karışan başka insanlar var mı?',
    description:
      'İlişkinizi etkileyen dış faktörleri ve üçüncü kişileri gösterir. Aile, arkadaşlar veya diğer insanların sorununuza nasıl etki ettiğini anlamanıza yardımcı olur.',
    className:
      'absolute top-[8%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 8,
  },
  {
    id: 8,
    title: 'İlişkimizi etkileyen maddi sorunlar var mı?',
    description:
      'Para, iş, maddi durum gibi faktörlerin ilişkinize etkisini gösterir. Ekonomik sorunların ilişkinizi nasıl etkilediğini ortaya koyar.',
    className:
      'absolute top-[8%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 8,
  },
  {
    id: 9,
    title: 'Bu ilişki sürecek mi?',
    description:
      'İlişkinizin geleceği hakkında öngörü sunar. Mevcut sorunların çözülüp çözülmeyeceği ve ilişkinin devam edip etmeyeceği konusunda bilgi verir.',
    className:
      'absolute top-[8%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 8,
  },
];

// Evlilik açılımı pozisyonları
export const marriagePositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'Sonuç ne olacak?',
    description:
      'Evlilik sürecinizin genel sonucunu ve nasıl ilerleyeceğini gösterir.',
    className:
      'absolute top-[85%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 85,
  },
  {
    id: 2,
    title: 'Eşimi beklerken benim ne yapmam gerekiyor?',
    description:
      'Doğru kişiyi bulana kadar kendinizi nasıl geliştirmeniz gerektiğini gösterir.',
    className:
      'absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 85,
  },
  {
    id: 3,
    title: 'Mali kaynaklarımızı birbirimizle paylaşacak mıyız?',
    description:
      'Evlilikte mali konularda uyumunuzu ve paylaşımınızı gösterir.',
    className:
      'absolute top-[85%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 85,
  },
  {
    id: 4,
    title: 'Her ikimiz de bağlanmak isteyecek miyiz?',
    description:
      'Her iki tarafın da evliliğe hazır olup olmadığını ve bağlanma isteğini gösterir.',
    className:
      'absolute top-[55%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 55,
  },
  {
    id: 5,
    title: 'Benzer yanlarımız olacak mı?',
    description: 'Ortak değerleriniz, benzerlikleriniz ve uyumunuzu gösterir.',
    className:
      'absolute top-[35%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 35,
  },
  {
    id: 6,
    title: 'Bu kişinin ailesi beni kabul edecek mi?',
    description: 'Aile onayı ve aile ilişkilerinizin nasıl olacağını gösterir.',
    className:
      'absolute top-[55%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 55,
  },
  {
    id: 7,
    title: 'Birbirimizi nasıl bulacağız?',
    description:
      'Doğru kişiyle nasıl tanışacağınızı ve buluşacağınızı gösterir.',
    className:
      'absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 35,
  },
  {
    id: 8,
    title: 'Anlaşabilecek miyiz?',
    description:
      'İletişim uyumunuzu ve birbirinizi anlama kapasitenizi gösterir.',
    className:
      'absolute top-[8%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 8,
  },
  {
    id: 9,
    title: 'Benim için nasıl bir eş uygundur?',
    description:
      'İdeal eşinizin özelliklerini ve sizinle uyumlu olacak kişiyi gösterir.',
    className:
      'absolute top-[8%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 8,
  },
  {
    id: 10,
    title: 'Evlenebilecek miyim?',
    description: 'Evlilik potansiyelinizi ve evlenme şansınızı gösterir.',
    className:
      'absolute top-[8%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 8,
  },
];

// Yeni Bir Sevgili açılımı pozisyonları
export const newLoverPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'Yakında yeni bir ilişki yaşayacak mıyım?',
    description: 'Gelecekteki ilişki potansiyelinizi gösterir',
    className:
      'absolute top-[85%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 85,
  },
  {
    id: 2,
    title: 'Bu kişi hangi burçtan olacak?',
    description: 'Gelecekteki partnerinizin astrolojik özelliklerini gösterir',
    className:
      'absolute top-[85%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 85,
  },
  {
    id: 3,
    title: 'Birbirimizle uyumlu olacak mıyız?',
    description: 'İlişkinizdeki uyum ve uyumsuzlukları gösterir',
    className:
      'absolute top-[50%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 15,
    y: 50,
  },
  {
    id: 4,
    title: 'Uzun süreli bir ilişki olacak mı?',
    description: 'İlişkinizin sürekliliğini ve derinliğini gösterir',
    className:
      'absolute top-[15%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 15,
  },
  {
    id: 5,
    title: 'Bu kişi benim ruh eşim olabilir mi?',
    description: 'Ruhsal bağlantı ve derin aşk potansiyelini gösterir',
    className:
      'absolute top-[15%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 15,
  },
  {
    id: 6,
    title: 'Dileğim gerçekleşecek mi?',
    description: 'Aşk dileğinizin gerçekleşme olasılığını gösterir',
    className:
      'absolute top-[50%] left-[85%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 85,
    y: 50,
  },
];

// Para açılımı pozisyonları (8 kartlık piramit düzen)
export const moneyPositions: TarotCardPosition[] = [
  {
    id: 1,
    title: 'Parayla İlgili Kaygı',
    description: 'Parayla ilgili kaygı var mı?',
    className:
      'absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 85,
  },
  {
    id: 2,
    title: 'Finansal Güvenlik Arzusu',
    description: 'Finansal güvenliğe duyulan arzu',
    className:
      'absolute top-[70%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 70,
  },
  {
    id: 3,
    title: 'Para Kullanımı',
    description: 'Parayı beni mutlu edecek şekilde nasıl kullanabilirim?',
    className:
      'absolute top-[70%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 70,
  },
  {
    id: 4,
    title: 'Geçmişteki Para Tutumu',
    description: 'Parayla ilgili geçmişteki tutumum',
    className:
      'absolute top-[70%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 70,
  },
  {
    id: 5,
    title: 'Mali Sorumluluklar',
    description: 'Mali açıdan iyi bir yaşam için sorumluluklarım nedir?',
    className:
      'absolute top-[45%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 75,
    y: 45,
  },
  {
    id: 6,
    title: 'Yeni Mali Planlar',
    description: 'Mali yatırımlarım veya birikimlerimle ilgili yeni planlarım',
    className:
      'absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 50,
    y: 45,
  },
  {
    id: 7,
    title: 'Gelecek Para Planları',
    description: 'Parayla ilgili gelecek planlarım',
    className:
      'absolute top-[45%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20',
    x: 25,
    y: 45,
  },
  {
    id: 8,
    title: 'Para Kazanma Yetenekleri',
    description: 'Para kazanmak için ne gibi özel yeteneklerim var?',
    className:
      'absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30',
    x: 50,
    y: 20,
  },
];

// Tüm tarot açılım türleri
export const tarotSpreads: TarotSpread[] = [
  {
    id: 'love-spread',
    name: 'Aşk Açılımı',
    description: 'İlişkiler ve duygusal bağlar için 4 kartlık özel açılım',
    cardCount: 4,
    component: LoveReading,
    icon: '💝',
    color: 'pink',
    positions: lovePositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-96 md:h-[500px] bg-gradient-to-br from-pink-800/50 to-slate-900/50 rounded-xl border border-pink-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt: 'Sen deneyimli bir tarot okuyucusu ve ilişki uzmanısın...',
    },
  },
  {
    id: 'career-spread',
    name: 'Kariyer Açılımı',
    description: 'Kariyer ve iş hayatı için 4 kartlık özel açılım',
    cardCount: 4,
    component: CareerReading,
    icon: '💼',
    color: 'blue',
    positions: careerPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-96 md:h-[500px] bg-gradient-to-br from-blue-800/50 to-green-800/50 rounded-xl border border-blue-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt: 'Sen deneyimli bir tarot okuyucusu ve kariyer uzmanısın...',
    },
  },
  {
    id: 'problem-solving-spread',
    name: 'Problem Çözme Açılımı',
    description: 'Problem analizi ve çözüm için 10 kartlık detaylı açılım',
    cardCount: 10,
    component: ProblemSolvingReading,
    icon: '🔍',
    color: 'purple',
    positions: problemSolvingPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[600px] md:h-[700px] bg-gradient-to-br from-purple-800/50 to-indigo-800/50 rounded-xl border border-purple-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt:
        'Sen deneyimli bir tarot okuyucusu ve problem çözme uzmanısın...',
    },
  },
  {
    id: 'situation-analysis-spread',
    name: 'Durum Analizi Açılımı',
    description: 'Durum analizi ve değerlendirme için 7 kartlık özel açılım',
    cardCount: 7,
    component: SituationAnalysisReading,
    icon: '🔍',
    color: 'green',
    positions: situationAnalysisPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-green-800/50 to-emerald-800/50 rounded-xl border border-green-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt:
        'Sen deneyimli bir tarot okuyucusu ve durum analizi uzmanısın...',
    },
  },
  {
    id: 'relationship-analysis-spread',
    name: 'İlişki Analizi Açılımı',
    description: 'İlişki analizi ve değerlendirme için 7 kartlık özel açılım',
    cardCount: 7,
    component: RelationshipAnalysisReading,
    icon: '💕',
    color: 'blue',
    positions: relationshipAnalysisPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-blue-800/50 to-cyan-800/50 rounded-xl border border-blue-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt:
        'Sen deneyimli bir tarot okuyucusu ve ilişki analizi uzmanısın...',
    },
  },
  {
    id: 'relationship-problems-spread',
    name: 'İlişki Sorunları Açılımı',
    description: 'İlişki sorunları analizi ve çözüm için 9 kartlık özel açılım',
    cardCount: 9,
    component: RelationshipProblemsReading,
    icon: '💔',
    color: 'gold',
    positions: relationshipProblemsPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-yellow-800/50 to-amber-800/50 rounded-xl border border-yellow-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt:
        'Sen deneyimli bir tarot okuyucusu ve ilişki sorunları uzmanısın...',
    },
  },
  {
    id: 'marriage-spread',
    name: 'Evlilik Açılımı',
    description: 'Evlilik ve eş bulma için 10 kartlık özel açılım',
    cardCount: 10,
    component: MarriageReading,
    icon: '💒',
    color: 'pink',
    positions: marriagePositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-pink-800/50 to-rose-800/50 rounded-xl border border-pink-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt: 'Sen deneyimli bir tarot okuyucusu ve evlilik uzmanısın...',
    },
  },
  {
    id: 'new-lover-spread',
    name: 'Yeni Bir Sevgili Açılımı',
    description: 'Yeni bir aşk ilişkisi için 6 kartlık özel açılım',
    cardCount: 6,
    component: NewLoverReading,
    icon: '💕',
    color: 'pink',
    positions: newLoverPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-pink-800/50 to-rose-800/50 rounded-xl border border-pink-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt: 'Sen deneyimli bir tarot okuyucusu ve aşk uzmanısın...',
    },
  },
  {
    id: 'money-spread',
    name: 'Para Açılımı',
    description: 'Finansal durum ve para konuları için 8 kartlık piramit açılım',
    cardCount: 8,
    component: MoneyReading,
    icon: '💰',
    color: 'yellow',
    positions: moneyPositions,
    layout: {
      type: 'custom',
      containerClass:
        'relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-yellow-800/50 to-orange-800/50 rounded-xl border border-yellow-700',
      cardSize: 'medium',
    },
    prompts: {
      systemPrompt: 'Sen deneyimli bir tarot okuyucusu ve finans uzmanısın...',
    },
  },
];

// Spread bulmak için yardımcı fonksiyon
export function findSpreadById(spreadId: string): TarotSpread | undefined {
  return tarotSpreads.find(spread => spread.id === spreadId);
}

// Pozisyon bulmak için yardımcı fonksiyon
export function findPositionById(
  spread: TarotSpread,
  positionId: number
): TarotCardPosition | undefined {
  return spread.positions.find(pos => pos.id === positionId);
}

// SpreadId türü sadece mevcut spread'ler için
export type SpreadId =
  | 'love-spread'
  | 'career-spread'
  | 'problem-solving-spread'
  | 'situation-analysis-spread'
  | 'relationship-analysis-spread'
  | 'relationship-problems-spread'
  | 'marriage-spread'
  | 'new-lover-spread'
  | 'money-spread';
