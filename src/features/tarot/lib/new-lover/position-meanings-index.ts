// Yeni Bir Sevgili açılımı için pozisyon anlamları
// Her kartın her pozisyonda farklı anlamları vardır

import { TarotCard } from '@/types/tarot';

// Pozisyon anlamları interface'i
interface PositionMeaning {
  upright: string;
  reversed: string;
}

// Yeni Bir Sevgili açılımı için pozisyon anlamları
const NEW_LOVER_POSITION_MEANINGS: { [cardName: string]: { [position: number]: PositionMeaning } } = {
  // Major Arcana
  'The Fool': {
    1: {
      upright: 'Yeni bir başlangıç yaklaşıyor. Beklenmedik bir şekilde karşınıza çıkacak.',
      reversed: 'Aceleci davranmayın. Doğru zamanı bekleyin.'
    },
    2: {
      upright: 'Özgür ruhlu, maceracı bir kişilik. Genç ve enerjik.',
      reversed: 'Olgun, deneyimli bir kişilik. Sakin ve düşünceli.'
    },
    3: {
      upright: 'Mükemmel uyum. Birlikte yeni maceralar yaşayacaksınız.',
      reversed: 'Farklı yaşam tarzları. Uyum sağlamak için çaba gerekli.'
    },
    4: {
      upright: 'Uzun süreli bir ilişki. Sürekli yenilik ve heyecan.',
      reversed: 'Kısa süreli ama yoğun bir ilişki. Anı yaşayın.'
    },
    5: {
      upright: 'Ruh eşiniz olabilir. Derin bir bağ kuracaksınız.',
      reversed: 'Ruhsal öğretmeniniz. Size çok şey öğretecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Cesurca adım atın.',
      reversed: 'Sabırlı olun. Zamanı geldiğinde gerçekleşecek.'
    }
  },
  'The Magician': {
    1: {
      upright: 'Güçlü bir çekim yaşayacaksınız. İlk karşılaşma büyüleyici olacak.',
      reversed: 'Yanıltıcı bir çekim. Gerçekleri görmeye çalışın.'
    },
    2: {
      upright: 'Karizmatik, güçlü bir kişilik. Liderlik özellikleri var.',
      reversed: 'Manipülatif, kontrolcü bir kişilik. Dikkatli olun.'
    },
    3: {
      upright: 'Mükemmel uyum. Birlikte büyük işler başaracaksınız.',
      reversed: 'Güç mücadelesi. Eşitlik önemli.'
    },
    4: {
      upright: 'Güçlü ve sürekli bir ilişki. Birlikte büyüyeceksiniz.',
      reversed: 'Kısa süreli ama etkili. Öğretici bir deneyim.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Birlikte yükseleceksiniz.',
      reversed: 'Ruhsal öğretmeniniz. Size güç verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Kendi gücünüzü kullanın.',
      reversed: 'Engeller var. Sabır ve strateji gerekli.'
    }
  },
  'The High Priestess': {
    1: {
      upright: 'Gizemli bir karşılaşma. Sezgilerinize güvenin.',
      reversed: 'Gizli bilgiler ortaya çıkacak. Hazırlıklı olun.'
    },
    2: {
      upright: 'Sezgisel, gizemli bir kişilik. Derin düşünceli.',
      reversed: 'Açık sözlü, direkt bir kişilik. Samimi.'
    },
    3: {
      upright: 'Derin bir bağ. Ruhsal uyum mükemmel.',
      reversed: 'Yüzeysel başlayacak ama derinleşecek.'
    },
    4: {
      upright: 'Uzun süreli ve derin bir ilişki. Ruhsal büyüme.',
      reversed: 'Kısa ama öğretici. Ruhsal gelişim sağlayacak.'
    },
    5: {
      upright: 'Kesinlikle ruh eşiniz. Derin ruhsal bağ.',
      reversed: 'Ruhsal rehberiniz. Size yol gösterecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Sezgilerinize güvenin.',
      reversed: 'Zamanı geldiğinde gerçekleşecek. Sabırlı olun.'
    }
  },
  'The Empress': {
    1: {
      upright: 'Verimli bir dönem. Aşk büyüyecek ve gelişecek.',
      reversed: 'Durgunluk var. Sabırlı olun.'
    },
    2: {
      upright: 'Şefkatli, besleyici bir kişilik. Doğal güzellik.',
      reversed: 'Bağımlı, ihtiyaçlı bir kişilik. Destek gerekli.'
    },
    3: {
      upright: 'Mükemmel uyum. Birlikte büyüyeceksiniz.',
      reversed: 'Dengesizlik var. Sabır ve anlayış gerekli.'
    },
    4: {
      upright: 'Uzun süreli ve verimli bir ilişki. Aile kurulabilir.',
      reversed: 'Kısa süreli ama öğretici. Deneyim kazanacaksınız.'
    },
    5: {
      upright: 'Ruh eşiniz. Birlikte yeni hayatlar kuracaksınız.',
      reversed: 'Ruhsal anneniz. Size şefkat verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Doğal akışa bırakın.',
      reversed: 'Zamanı geldiğinde gerçekleşecek. Acele etmeyin.'
    }
  },
  'The Emperor': {
    1: {
      upright: 'Güçlü bir liderle karşılaşacaksınız. Otoriter ama adil.',
      reversed: 'Kontrolcü bir kişilik. Sınırlarınızı koruyun.'
    },
    2: {
      upright: 'Güçlü, otoriter bir kişilik. Liderlik özellikleri.',
      reversed: 'Zayıf, kararsız bir kişilik. Destek gerekli.'
    },
    3: {
      upright: 'Güçlü bir uyum. Birlikte büyük işler başaracaksınız.',
      reversed: 'Güç mücadelesi. Eşitlik önemli.'
    },
    4: {
      upright: 'Uzun süreli ve güçlü bir ilişki. Evlilik potansiyeli.',
      reversed: 'Kısa süreli ama öğretici. Deneyim kazanacaksınız.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Birlikte güçlü bir çift olacaksınız.',
      reversed: 'Ruhsal öğretmeniniz. Size güç verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Güçlü adımlar atın.',
      reversed: 'Engeller var. Strateji ve sabır gerekli.'
    }
  },
  'The Hierophant': {
    1: {
      upright: 'Geleneksel yollarla tanışacaksınız. Aile veya arkadaş aracılığıyla.',
      reversed: 'Alışılmadık yollarla tanışacaksınız. Beklenmedik bir karşılaşma.'
    },
    2: {
      upright: 'Geleneksel değerlere sahip, dindar bir kişilik.',
      reversed: 'Özgür düşünceli, geleneksel olmayan bir kişilik.'
    },
    3: {
      upright: 'Geleneksel uyum. Ortak değerler ve inançlar.',
      reversed: 'Farklı değerler. Anlayış ve tolerans gerekli.'
    },
    4: {
      upright: 'Uzun süreli ve geleneksel bir ilişki. Evlilik potansiyeli.',
      reversed: 'Kısa süreli ama öğretici. Farklı perspektifler.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Ortak ruhsal yolculuk.',
      reversed: 'Ruhsal öğretmeniniz. Size rehberlik edecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Geleneksel yolları deneyin.',
      reversed: 'Farklı yollar deneyin. Yaratıcı olun.'
    }
  },
  'The Lovers': {
    1: {
      upright: 'Mükemmel bir aşk karşılaşması. İlk görüşte aşk.',
      reversed: 'Karmaşık bir karşılaşma. Seçim yapmanız gerekebilir.'
    },
    2: {
      upright: 'Aşk dolu, romantik bir kişilik. Sadık ve bağlı.',
      reversed: 'Kararsız, çelişkili bir kişilik. Seçim yapmakta zorlanır.'
    },
    3: {
      upright: 'Mükemmel uyum. Gerçek aşk ve bağlılık.',
      reversed: 'Çelişkiler var. Seçim yapmanız gerekebilir.'
    },
    4: {
      upright: 'Uzun süreli ve aşk dolu bir ilişki. Evlilik potansiyeli.',
      reversed: 'Kısa süreli ama yoğun. Öğretici bir deneyim.'
    },
    5: {
      upright: 'Kesinlikle ruh eşiniz. Gerçek aşk ve uyum.',
      reversed: 'Ruhsal öğretmeniniz. Size aşkı öğretecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Aşkınızı takip edin.',
      reversed: 'Seçim yapmanız gerekebilir. Kalbinizi dinleyin.'
    }
  },
  'The Chariot': {
    1: {
      upright: 'Hızlı bir karşılaşma. Enerjik ve kararlı bir kişi.',
      reversed: 'Duraksama var. Sabırlı olun.'
    },
    2: {
      upright: 'Enerjik, kararlı bir kişilik. Hedeflerine odaklı.',
      reversed: 'Kararsız, dağınık bir kişilik. Yön bulmakta zorlanır.'
    },
    3: {
      upright: 'Güçlü bir uyum. Birlikte hedeflere ulaşacaksınız.',
      reversed: 'Çelişkiler var. Uyum sağlamak için çaba gerekli.'
    },
    4: {
      upright: 'Uzun süreli ve hedef odaklı bir ilişki. Başarı dolu.',
      reversed: 'Kısa süreli ama öğretici. Deneyim kazanacaksınız.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Birlikte büyük hedeflere ulaşacaksınız.',
      reversed: 'Ruhsal öğretmeniniz. Size güç verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Kararlı adımlar atın.',
      reversed: 'Engeller var. Sabır ve strateji gerekli.'
    }
  },
  'Strength': {
    1: {
      upright: 'Güçlü bir karşılaşma. Cesur ve güçlü bir kişi.',
      reversed: 'Zayıflık var. Kendi gücünüzü hatırlayın.'
    },
    2: {
      upright: 'Güçlü, cesur bir kişilik. İç güç ve dayanıklılık.',
      reversed: 'Zayıf, korkak bir kişilik. Destek ve cesaret gerekli.'
    },
    3: {
      upright: 'Güçlü bir uyum. Birlikte her zorluğu aşacaksınız.',
      reversed: 'Dengesizlik var. Güç dengesi önemli.'
    },
    4: {
      upright: 'Uzun süreli ve güçlü bir ilişki. Dayanıklı bağ.',
      reversed: 'Kısa süreli ama öğretici. Güç kazanacaksınız.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Birlikte güçlü bir çift olacaksınız.',
      reversed: 'Ruhsal öğretmeniniz. Size güç verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. İç gücünüzü kullanın.',
      reversed: 'Zayıflık var. Kendi gücünüzü hatırlayın.'
    }
  },
  'The Hermit': {
    1: {
      upright: 'Yalnız bir kişiyle karşılaşacaksınız. Bilge ve deneyimli.',
      reversed: 'Sosyal bir kişi. Kalabalık ortamlarda tanışacaksınız.'
    },
    2: {
      upright: 'Bilge, yalnız bir kişilik. Derin düşünceli ve öğretici.',
      reversed: 'Sosyal, aktif bir kişilik. Eğlenceli ve dinamik.'
    },
    3: {
      upright: 'Derin bir uyum. Ruhsal bağ ve anlayış.',
      reversed: 'Yüzeysel başlayacak ama derinleşecek.'
    },
    4: {
      upright: 'Uzun süreli ve derin bir ilişki. Ruhsal büyüme.',
      reversed: 'Kısa süreli ama öğretici. Ruhsal gelişim.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Derin ruhsal bağ ve anlayış.',
      reversed: 'Ruhsal öğretmeniniz. Size rehberlik edecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. İç rehberliğinizi dinleyin.',
      reversed: 'Zamanı geldiğinde gerçekleşecek. Sabırlı olun.'
    }
  },
  'Wheel of Fortune': {
    1: {
      upright: 'Kaderin bir oyunu. Beklenmedik bir karşılaşma.',
      reversed: 'Kaderin tersine döndüğü an. Değişim zamanı.'
    },
    2: {
      upright: 'Şanslı, pozitif bir kişilik. Hayat dolu ve enerjik.',
      reversed: 'Şanssız, negatif bir kişilik. Destek gerekli.'
    },
    3: {
      upright: 'Kaderin uyumu. Birlikte şanslı bir çift olacaksınız.',
      reversed: 'Kaderin sınavı. Zorluklar aşılacak.'
    },
    4: {
      upright: 'Uzun süreli ve şanslı bir ilişki. Kaderin hediyesi.',
      reversed: 'Kısa süreli ama öğretici. Değişim getirecek.'
    },
    5: {
      upright: 'Kaderin eşiniz. Ruhsal bağ ve şans.',
      reversed: 'Kaderin öğretmeniniz. Size şans verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Kaderinize güvenin.',
      reversed: 'Zamanı geldiğinde gerçekleşecek. Değişim bekleyin.'
    }
  },
  'Justice': {
    1: {
      upright: 'Adil bir karşılaşma. Denge ve uyum.',
      reversed: 'Adaletsizlik var. Dikkatli olun.'
    },
    2: {
      upright: 'Adil, dengeli bir kişilik. Doğru ve yanlışı ayırt eder.',
      reversed: 'Adaletsiz, dengesiz bir kişilik. Dikkatli olun.'
    },
    3: {
      upright: 'Mükemmel denge. Adil ve uyumlu bir ilişki.',
      reversed: 'Dengesizlik var. Adalet sağlanmalı.'
    },
    4: {
      upright: 'Uzun süreli ve adil bir ilişki. Denge ve uyum.',
      reversed: 'Kısa süreli ama öğretici. Adalet öğreneceksiniz.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Adil ve dengeli bir bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size adalet öğretecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Adil davranın.',
      reversed: 'Adaletsizlik var. Denge sağlayın.'
    }
  },
  'The Hanged Man': {
    1: {
      upright: 'Beklenmedik bir karşılaşma. Farklı perspektifler.',
      reversed: 'Aceleci davranmayın. Sabırlı olun.'
    },
    2: {
      upright: 'Farklı düşünen, özgün bir kişilik. Yaratıcı ve sanatsal.',
      reversed: 'Geleneksel düşünen, muhafazakar bir kişilik.'
    },
    3: {
      upright: 'Farklı uyum. Yaratıcı ve özgün bir ilişki.',
      reversed: 'Geleneksel uyum. Ortak değerler ve inançlar.'
    },
    4: {
      upright: 'Uzun süreli ve özgün bir ilişki. Yaratıcı büyüme.',
      reversed: 'Kısa süreli ama öğretici. Farklı perspektifler.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Özgün ve yaratıcı bir bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size farklı bakış açısı verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Farklı yollar deneyin.',
      reversed: 'Zamanı geldiğinde gerçekleşecek. Sabırlı olun.'
    }
  },
  'Death': {
    1: {
      upright: 'Dönüşüm getiren bir karşılaşma. Eski hayatınız sona erecek.',
      reversed: 'Değişim direnci. Eski alışkanlıkları bırakın.'
    },
    2: {
      upright: 'Dönüştürücü, güçlü bir kişilik. Değişim getirir.',
      reversed: 'Değişimden korkan, muhafazakar bir kişilik.'
    },
    3: {
      upright: 'Dönüştürücü uyum. Birlikte yeni hayatlar kuracaksınız.',
      reversed: 'Değişim direnci. Uyum sağlamak için çaba gerekli.'
    },
    4: {
      upright: 'Uzun süreli ve dönüştürücü bir ilişki. Yeni başlangıçlar.',
      reversed: 'Kısa süreli ama dönüştürücü. Değişim getirecek.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Dönüştürücü ruhsal bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size dönüşüm verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Değişimi kabul edin.',
      reversed: 'Değişim direnci. Eski alışkanlıkları bırakın.'
    }
  },
  'Temperance': {
    1: {
      upright: 'Dengeli bir karşılaşma. Uyum ve denge.',
      reversed: 'Dengesizlik var. Sabırlı olun.'
    },
    2: {
      upright: 'Dengeli, uyumlu bir kişilik. Sabırlı ve anlayışlı.',
      reversed: 'Dengesiz, uyumsuz bir kişilik. Sabır gerekli.'
    },
    3: {
      upright: 'Mükemmel denge. Uyumlu ve dengeli bir ilişki.',
      reversed: 'Dengesizlik var. Uyum sağlamak için çaba gerekli.'
    },
    4: {
      upright: 'Uzun süreli ve dengeli bir ilişki. Uyum ve denge.',
      reversed: 'Kısa süreli ama öğretici. Denge öğreneceksiniz.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Dengeli ve uyumlu bir bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size denge öğretecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Dengeyi koruyun.',
      reversed: 'Dengesizlik var. Sabırlı olun.'
    }
  },
  'The Devil': {
    1: {
      upright: 'Güçlü bir çekim. Tutkulu ama dikkatli olun.',
      reversed: 'Bağımlılık riski. Sınırlarınızı koruyun.'
    },
    2: {
      upright: 'Tutkulu, karizmatik bir kişilik. Güçlü çekim.',
      reversed: 'Bağımlı, kontrolcü bir kişilik. Dikkatli olun.'
    },
    3: {
      upright: 'Güçlü çekim. Tutkulu ama dengeli olun.',
      reversed: 'Bağımlılık riski. Sınırlar önemli.'
    },
    4: {
      upright: 'Uzun süreli ve tutkulu bir ilişki. Denge önemli.',
      reversed: 'Kısa süreli ama yoğun. Bağımlılık riski.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Tutkulu ama dengeli bir bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size güç verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Tutkulu ama dengeli olun.',
      reversed: 'Bağımlılık riski. Sınırlarınızı koruyun.'
    }
  },
  'The Tower': {
    1: {
      upright: 'Beklenmedik bir karşılaşma. Hayatınızı değiştirecek.',
      reversed: 'Değişim direnci. Eski yapıları yıkın.'
    },
    2: {
      upright: 'Güçlü, dönüştürücü bir kişilik. Değişim getirir.',
      reversed: 'Değişimden korkan, muhafazakar bir kişilik.'
    },
    3: {
      upright: 'Dönüştürücü uyum. Birlikte yeni yapılar kuracaksınız.',
      reversed: 'Değişim direnci. Uyum sağlamak için çaba gerekli.'
    },
    4: {
      upright: 'Uzun süreli ve dönüştürücü bir ilişki. Yeni başlangıçlar.',
      reversed: 'Kısa süreli ama dönüştürücü. Değişim getirecek.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Dönüştürücü ruhsal bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size dönüşüm verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Değişimi kabul edin.',
      reversed: 'Değişim direnci. Eski yapıları yıkın.'
    }
  },
  'The Star': {
    1: {
      upright: 'Umut veren bir karşılaşma. Yıldızlar size gülümsüyor.',
      reversed: 'Umut kaybı. İnançlarınızı yenileyin.'
    },
    2: {
      upright: 'Umutlu, pozitif bir kişilik. Hayalperest ve yaratıcı.',
      reversed: 'Umut kaybı, negatif bir kişilik. Destek gerekli.'
    },
    3: {
      upright: 'Umutlu uyum. Birlikte hayallerinizi gerçekleştireceksiniz.',
      reversed: 'Umut kaybı. Birlikte umut bulacaksınız.'
    },
    4: {
      upright: 'Uzun süreli ve umutlu bir ilişki. Hayaller gerçekleşecek.',
      reversed: 'Kısa süreli ama umut verici. İnanç yenilenecek.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Umutlu ve yaratıcı bir bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size umut verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Umutlarınızı koruyun.',
      reversed: 'Umut kaybı. İnançlarınızı yenileyin.'
    }
  },
  'The Moon': {
    1: {
      upright: 'Gizemli bir karşılaşma. Sezgilerinize güvenin.',
      reversed: 'Yanıltıcı bilgiler. Gerçekleri araştırın.'
    },
    2: {
      upright: 'Gizemli, sezgisel bir kişilik. Derin düşünceli.',
      reversed: 'Açık sözlü, direkt bir kişilik. Samimi.'
    },
    3: {
      upright: 'Gizemli uyum. Derin bağ ve anlayış.',
      reversed: 'Yüzeysel başlayacak ama derinleşecek.'
    },
    4: {
      upright: 'Uzun süreli ve gizemli bir ilişki. Derin bağ.',
      reversed: 'Kısa süreli ama öğretici. Gizemler çözülecek.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Gizemli ve derin bir bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size sezgiler verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Sezgilerinize güvenin.',
      reversed: 'Yanıltıcı bilgiler. Gerçekleri araştırın.'
    }
  },
  'The Sun': {
    1: {
      upright: 'Parlak bir karşılaşma. Mutluluk ve neşe getirecek.',
      reversed: 'Bulutlu günler. Sabırlı olun.'
    },
    2: {
      upright: 'Parlak, neşeli bir kişilik. Hayat dolu ve enerjik.',
      reversed: 'Kasvetli, enerjisiz bir kişilik. Destek gerekli.'
    },
    3: {
      upright: 'Parlak uyum. Mutlu ve neşeli bir ilişki.',
      reversed: 'Bulutlu başlayacak ama parlayacak.'
    },
    4: {
      upright: 'Uzun süreli ve mutlu bir ilişki. Neşe ve mutluluk.',
      reversed: 'Kısa süreli ama öğretici. Mutluluk öğreneceksiniz.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Parlak ve mutlu bir bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size mutluluk verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Mutluluğunuzu paylaşın.',
      reversed: 'Bulutlu günler. Sabırlı olun.'
    }
  },
  'Judgement': {
    1: {
      upright: 'Yeniden doğuş getiren bir karşılaşma. Yeni başlangıçlar.',
      reversed: 'Geçmişin yükü. Affetmeyi öğrenin.'
    },
    2: {
      upright: 'Yeniden doğmuş, arınmış bir kişilik. Yeni başlangıçlar.',
      reversed: 'Geçmişin yükü altında. Destek gerekli.'
    },
    3: {
      upright: 'Yeniden doğuş uyumu. Birlikte yeni hayatlar kuracaksınız.',
      reversed: 'Geçmişin yükü. Birlikte arınacaksınız.'
    },
    4: {
      upright: 'Uzun süreli ve yeniden doğuş getiren bir ilişki.',
      reversed: 'Kısa süreli ama arındırıcı. Geçmiş temizlenecek.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Yeniden doğuş getiren bir bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size arınma verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Yeniden doğuşu kabul edin.',
      reversed: 'Geçmişin yükü. Affetmeyi öğrenin.'
    }
  },
  'The World': {
    1: {
      upright: 'Mükemmel bir karşılaşma. Hayatınızı tamamlayacak.',
      reversed: 'Eksiklik var. Kendinizi tamamlayın.'
    },
    2: {
      upright: 'Mükemmel, tamamlanmış bir kişilik. Hayat dolu.',
      reversed: 'Eksik, tamamlanmamış bir kişilik. Destek gerekli.'
    },
    3: {
      upright: 'Mükemmel uyum. Birlikte tamamlanacaksınız.',
      reversed: 'Eksiklik var. Birlikte tamamlanacaksınız.'
    },
    4: {
      upright: 'Uzun süreli ve mükemmel bir ilişki. Tamamlanma.',
      reversed: 'Kısa süreli ama öğretici. Tamamlanma öğreneceksiniz.'
    },
    5: {
      upright: 'Ruhsal eşiniz. Mükemmel ve tamamlanmış bir bağ.',
      reversed: 'Ruhsal öğretmeniniz. Size tamamlanma verecek.'
    },
    6: {
      upright: 'Dileğiniz gerçekleşecek. Mükemmelliği kabul edin.',
      reversed: 'Eksiklik var. Kendinizi tamamlayın.'
    }
  }
};

// Yeni Bir Sevgili açılımı için pozisyon anlamını al
export function getNewLoverMeaningByCardAndPosition(
  card: TarotCard,
  position: number
): PositionMeaning | null {
  const cardMeanings = NEW_LOVER_POSITION_MEANINGS[card.name];
  if (!cardMeanings) {
      return null;
  }
  
  return cardMeanings[position] || null;
}

// Yeni Bir Sevgili açılımı için kart anlamını al
export function getNewLoverCardMeaning(
  card: TarotCard | null,
  position: number,
  isReversed: boolean
): string {
  if (!card) {
    return '';
  }
  
  const positionMeaning = getNewLoverMeaningByCardAndPosition(card, position);
  if (!positionMeaning) {
    return isReversed ? card.meaningTr.reversed : card.meaningTr.upright;
  }
  
  return isReversed ? positionMeaning.reversed : positionMeaning.upright;
}
