/*
info:
Bağlantılı dosyalar:
- './full-tarot-deck': Tam tarot kartı verisi ve deste işlemleri için (gerekli, require ile dinamik olarak kullanılıyor)

Dosyanın amacı:
- Tarot uygulamasında kullanılacak ana TarotCard tipini ve kartlarla ilgili temel yardımcı fonksiyonları (resim yolu, karıştırma, rastgele çekme) sağlar.
- Kartların farklı anlamlarını, anahtar kelimelerini ve görsel yollarını standartlaştırır.

Backend bağlantısı:
- Backend ile doğrudan bir bağlantı veya veri işlemi yoktur.

Geliştirme ve öneriler:
- Fonksiyonlar modüler, sade ve tekrar kullanılabilir.
- getRandomTarotCards fonksiyonunda require ile dinamik import kullanılmış; Next.js/TypeScript projelerinde import ile statik kullanım tercih edilebilir.
- TarotCard tipinde hem İngilizce hem Türkçe anlamlar ve anahtar kelimeler tutuluyor, bu çoklu dil desteği için iyi bir pratik.
- Fonksiyonlara örnek kullanım ve test eklenebilir.
- getCardImagePath fonksiyonunda image alanı boşsa varsayılan arka yüz atanıyor, bu iyi bir UX detayı.
- drawRandomCards ve shuffleCards generic olarak yazılmış, farklı kart tipleriyle de kullanılabilir.

Hatalar ve geliştirmeye açık noktalar:
- getRandomTarotCards fonksiyonunda require ile dinamik import, SSR/TypeScript projelerinde sorun çıkarabilir; import ile statik çözüm önerilir.
- Fonksiyonlar sade, gereksiz tekrar veya karmaşa yok.
- Açıklamalar yeterli, ancak örnek kullanım artırılabilir.

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik yüksek, fonksiyon ve değişken adları anlamlı.
- Kod modüler ve tekrar kullanılabilir.
- Güvenlik açısından dış veri veya kullanıcı girdisiyle doğrudan işlem yapılmıyor, risk yok.
- Optimizasyon gerektirmez, fonksiyonlar hızlı ve sade.

Gereklilik ve Kullanım Durumu:
- TarotCard tipi: Gerekli, tüm tarot işlemleri için ana tip.
- getCardImagePath: Gerekli, kart görseli için.
- shuffleCards: Gerekli, deste karıştırma için.
- drawRandomCards: Gerekli, rastgele kart çekmek için.
- getRandomTarotCards: Gerekli, tam desteden rastgele kart çekmek için.
- Tüm kod amaca uygun, gereksiz veya silinebilir satır yok.
*/

import type { TarotCard } from '@/types/tarot';
import { fullTarotDeck } from './full-tarot-deck';
export type { TarotCard };

// Kart resminin yolunu oluşturan yardımcı fonksiyon
export function getCardImagePath(card: TarotCard): string {
  if (!card.image) {
    return '/cards/CardBack.webp'; // Varsayılan arka yüz
  }
  return card.image.startsWith('/') ? card.image : `/cards/rws/${card.image}`;
}

// Kartı karıştırma fonksiyonu
export function shuffleCards<T>(cards: T[]): T[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}

// Rastgele kart seçme fonksiyonu
export function drawRandomCards<T>(cards: T[], count: number): T[] {
  const shuffled = shuffleCards(cards);
  return shuffled.slice(0, count);
}

// Tam tarot destesinden rastgele kart çekme fonksiyonu
export function getRandomTarotCards(count: number): TarotCard[] {
  // fullTarotDeck'i import edip kullanıyoruz - duplicate mock data kaldırıldı
  return drawRandomCards(fullTarotDeck, count);
}
