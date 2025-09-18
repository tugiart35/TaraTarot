/*
info:
Bağlantılı dosyalar:
- position-meanings-index.ts: Ana anlam dosyası için kart isim eşleştirmesi

Dosyanın amacı:
- Tüm dillerdeki (TR, EN, SR) kart isimlerini İngilizce standart isimlere eşleştiren mapping
- Lazy loading için ayrı dosyaya taşındı
- Büyük obje olduğu için performans optimizasyonu sağlar

Backend bağlantısı:
- Bu dosyada backend bağlantısı yoktur. Sadece statik mapping verisi içerir.

Geliştirme ve öneriler:
- Yeni dil desteği eklenirken bu dosyaya yeni mapping'ler eklenebilir
- Kart isimleri değişirse bu dosya güncellenmelidir
- Memory usage optimizasyonu için lazy loading kullanılır

Kodun okunabilirliği, optimizasyonu, yeniden kullanılabilirliği ve güvenliği:
- Okunabilirlik: Temiz mapping yapısı, açık isimlendirme
- Optimizasyon: Lazy loading ile memory kullanımı azaltıldı
- Yeniden Kullanılabilirlik: Diğer tarot sistemleri için kullanılabilir
- Güvenlik: Statik veri, güvenlik riski yok
*/

// Kart isimlerini eşleştiren mapping - Tüm dilleri kapsar (TR, EN, SR)
export const cardNameMapping: { [key: string]: string } = {
  // Major Arcana - Türkçe
  Deli: 'The Fool',
  Büyücü: 'The Magician',
  'Yüksek Rahibe': 'The High Priestess',
  İmparatoriçe: 'The Empress',
  İmparator: 'The Emperor',
  Hierophant: 'The Hierophant',
  Aziz: 'The Hierophant',
  Aşıklar: 'The Lovers',
  'Savaş Arabası': 'The Chariot',
  Güç: 'Strength',
  Ermiş: 'The Hermit',
  Münzevi: 'The Hermit',
  'Kader Çarkı': 'The Wheel of Fortune',
  'Kader Çarkı (Wheel)': 'Wheel of Fortune',
  Adalet: 'Justice',
  'Asılı Adam': 'The Hanged Man',
  Ölüm: 'Death',
  Ölçü: 'Temperance',
  Ölçülülük: 'Temperance',
  Şeytan: 'The Devil',
  Kule: 'The Tower',
  Yıldız: 'The Star',
  Ay: 'The Moon',
  Güneş: 'The Sun',
  Yargı: 'Judgement',
  Mahkeme: 'Judgement',
  Dünya: 'The World',

  // Major Arcana - Sırpça
  Budala: 'The Fool',
  Mađioničar: 'The Magician',
  'Visoka Svestenica': 'The High Priestess',
  Carica: 'The Empress',
  Car: 'The Emperor',
  Sveštenik: 'The Hierophant',
  Ljubavnici: 'The Lovers',
  Kola: 'The Chariot',
  Snaga: 'Strength',
  Pustinjak: 'The Hermit',
  'Točak Sreće': 'The Wheel of Fortune',
  'Točak Sreće (Wheel)': 'Wheel of Fortune',
  Pravda: 'Justice',
  'Obeseni Čovek': 'The Hanged Man',
  Smrt: 'Death',
  Umerenost: 'Temperance',
  Đavo: 'The Devil',
  Kula: 'The Tower',
  Zvezda: 'The Star',
  Mesec: 'The Moon',
  Sunce: 'The Sun',
  Sud: 'Judgement',
  Svet: 'The World',

  // Minor Arcana - Kupalar (Türkçe)
  'Kupalar Ası': 'Ace of Cups',
  'Kupalar İkilisi': 'Two of Cups',
  'Kupalar Üçlüsü': 'Three of Cups',
  'Kupalar Dörtlüsü': 'Four of Cups',
  'Kupalar Beşlisi': 'Five of Cups',
  'Kupalar Altılısı': 'Six of Cups',
  'Kupalar Yedilisi': 'Seven of Cups',
  'Kupalar Sekizlisi': 'Eight of Cups',
  'Kupalar Dokuzlusu': 'Nine of Cups',
  'Kupalar Onlusu': 'Ten of Cups',
  'Kupalar Uşağı': 'Page of Cups',
  'Kupalar Prensi': 'Page of Cups',
  'Kupalar Şövalyesi': 'Knight of Cups',
  'Kupalar Kraliçesi': 'Queen of Cups',
  'Kupalar Kralı': 'King of Cups',

  // Minor Arcana - Kadehler (Türkçe - Alternatif isimler)
  'Kadehler Ası': 'Ace of Cups',
  'Kadehler İkilisi': 'Two of Cups',
  'Kadehler Üçlüsü': 'Three of Cups',
  'Kadehler Dörtlüsü': 'Four of Cups',
  'Kadehler Beşlisi': 'Five of Cups',
  'Kadehler Altılısı': 'Six of Cups',
  'Kadehler Yedilisi': 'Seven of Cups',
  'Kadehler Sekizlisi': 'Eight of Cups',
  'Kadehler Dokuzlusu': 'Nine of Cups',
  'Kadehler Onlusu': 'Ten of Cups',
  'Kadehler Uşağı': 'Page of Cups',
  'Kadehler Prensi': 'Page of Cups',
  'Kadehler Şövalyesi': 'Knight of Cups',
  'Kadehler Kraliçesi': 'Queen of Cups',
  'Kadehler Kralı': 'King of Cups',


  // Minor Arcana - Kupalar (Sırpça)
  'As Pehara': 'Ace of Cups',
  'Dvojka Pehara': 'Two of Cups',
  'Trojka Pehara': 'Three of Cups',
  'Četvorka Pehara': 'Four of Cups',
  'Petica Pehara': 'Five of Cups',
  'Šestica Pehara': 'Six of Cups',
  'Sedmica Pehara': 'Seven of Cups',
  'Osmica Pehara': 'Eight of Cups',
  'Devetka Pehara': 'Nine of Cups',
  'Desetka Pehara': 'Ten of Cups',
  'Paž Pehara': 'Page of Cups',
  'Vitez Pehara': 'Knight of Cups',
  'Kraljica Pehara': 'Queen of Cups',
  'Kralj Pehara': 'King of Cups',

  // Minor Arcana - Kılıçlar (Türkçe)
  'Kılıçlar Ası': 'Ace of Swords',
  'Kılıçlar İkilisi': 'Two of Swords',
  'Kılıçlar Üçlüsü': 'Three of Swords',
  'Kılıçlar Dörtlüsü': 'Four of Swords',
  'Kılıçlar Beşlisi': 'Five of Swords',
  'Kılıçlar Altılısı': 'Six of Swords',
  'Kılıçlar Yedilisi': 'Seven of Swords',
  'Kılıçlar Sekizlisi': 'Eight of Swords',
  'Kılıçlar Dokuzlusu': 'Nine of Swords',
  'Kılıçlar Onlusu': 'Ten of Swords',
  'Kılıçlar Uşağı': 'Page of Swords',
  'Kılıçlar Prensi': 'Page of Swords',
  'Kılıçlar Şövalyesi': 'Knight of Swords',
  'Kılıçlar Kraliçesi': 'Queen of Swords',
  'Kılıçlar Kralı': 'King of Swords',

  // Minor Arcana - Kılıçlar (Sırpça)
  'As Mačeva': 'Ace of Swords',
  'Dvojka Mačeva': 'Two of Swords',
  'Trojka Mačeva': 'Three of Swords',
  'Četvorka Mačeva': 'Four of Swords',
  'Petica Mačeva': 'Five of Swords',
  'Šestica Mačeva': 'Six of Swords',
  'Sedmica Mačeva': 'Seven of Swords',
  'Osmica Mačeva': 'Eight of Swords',
  'Devetka Mačeva': 'Nine of Swords',
  'Desetka Mačeva': 'Ten of Swords',
  'Paž Mačeva': 'Page of Swords',
  'Vitez Mačeva': 'Knight of Swords',
  'Kraljica Mačeva': 'Queen of Swords',
  'Kralj Mačeva': 'King of Swords',

  // Minor Arcana - Asalar (Türkçe)
  'Asalar Ası': 'Ace of Wands',
  'Asalar İkilisi': 'Two of Wands',
  'Asalar Üçlüsü': 'Three of Wands',
  'Asalar Dörtlüsü': 'Four of Wands',
  'Asalar Beşlisi': 'Five of Wands',
  'Asalar Altılısı': 'Six of Wands',
  'Asalar Yedilisi': 'Seven of Wands',
  'Asalar Sekizlisi': 'Eight of Wands',
  'Asalar Dokuzlusu': 'Nine of Wands',
  'Asalar Onlusu': 'Ten of Wands',
  'Asalar Uşağı': 'Page of Wands',
  'Asalar Prensi': 'Page of Wands',
  'Asalar Şövalyesi': 'Knight of Wands',
  'Asalar Kraliçesi': 'Queen of Wands',
  'Asalar Kralı': 'King of Wands',

  // Minor Arcana - Asalar (Sırpça)
  'As Štapova': 'Ace of Wands',
  'Dvojka Štapova': 'Two of Wands',
  'Trojka Štapova': 'Three of Wands',
  'Četvorka Štapova': 'Four of Wands',
  'Petica Štapova': 'Five of Wands',
  'Šestica Štapova': 'Six of Wands',
  'Sedmica Štapova': 'Seven of Wands',
  'Osmica Štapova': 'Eight of Wands',
  'Devetka Štapova': 'Nine of Wands',
  'Desetka Štapova': 'Ten of Wands',
  'Paž Štapova': 'Page of Wands',
  'Vitez Štapova': 'Knight of Wands',
  'Kraljica Štapova': 'Queen of Wands',
  'Kralj Štapova': 'King of Wands',

  // Minor Arcana - Tılsımlar (Türkçe)
  'Tılsımlar Ası': 'Ace of Pentacles',
  'Tılsımlar İkilisi': 'Two of Pentacles',
  'Tılsımlar Üçlüsü': 'Three of Pentacles',
  'Tılsımlar Dörtlüsü': 'Four of Pentacles',
  'Tılsımlar Beşlisi': 'Five of Pentacles',
  'Tılsımlar Altılısı': 'Six of Pentacles',
  'Tılsımlar Yedilisi': 'Seven of Pentacles',
  'Tılsımlar Sekizlisi': 'Eight of Pentacles',
  'Tılsımlar Dokuzlusu': 'Nine of Pentacles',
  'Tılsımlar Onlusu': 'Ten of Pentacles',
  'Tılsımlar Uşağı': 'Page of Pentacles',
  'Tılsımlar Prensi': 'Page of Pentacles',
  'Tılsımlar Şövalyesi': 'Knight of Pentacles',
  'Tılsımlar Kraliçesi': 'Queen of Pentacles',
  'Tılsımlar Kralı': 'King of Pentacles',

  // Minor Arcana - Altınlar (Türkçe - Alternatif isimler)
  'Altınlar Ası': 'Ace of Pentacles',
  'Altınlar İkilisi': 'Two of Pentacles',
  'Altınlar Üçlüsü': 'Three of Pentacles',
  'Altınlar Dörtlüsü': 'Four of Pentacles',
  'Altınlar Beşlisi': 'Five of Pentacles',
  'Altınlar Altılısı': 'Six of Pentacles',
  'Altınlar Yedilisi': 'Seven of Pentacles',
  'Altınlar Sekizlisi': 'Eight of Pentacles',
  'Altınlar Dokuzlusu': 'Nine of Pentacles',
  'Altınlar Onlusu': 'Ten of Pentacles',
  'Altınlar Uşağı': 'Page of Pentacles',
  'Altınlar Prensi': 'Page of Pentacles',
  'Altınlar Şövalyesi': 'Knight of Pentacles',
  'Altınlar Kraliçesi': 'Queen of Pentacles',
  'Altınlar Kralı': 'King of Pentacles',

  // Minor Arcana - Tılsımlar (Sırpça)
  'As Pentakla': 'Ace of Pentacles',
  'Dvojka Pentakla': 'Two of Pentacles',
  'Trojka Pentakla': 'Three of Pentacles',
  'Četvorka Pentakla': 'Four of Pentacles',
  'Petica Pentakla': 'Five of Pentacles',
  'Šestica Pentakla': 'Six of Pentacles',
  'Sedmica Pentakla': 'Seven of Pentacles',
  'Osmica Pentakla': 'Eight of Pentacles',
  'Devetka Pentakla': 'Nine of Pentacles',
  'Desetka Pentakla': 'Ten of Pentacles',
  'Paž Pentakla': 'Page of Pentacles',
  'Vitez Pentakla': 'Knight of Pentacles',
  'Kraljica Pentakla': 'Queen of Pentacles',
  'Kralj Pentakla': 'King of Pentacles',
};

// Lazy loading için async fonksiyon
export const getCardNameMapping = async (): Promise<{
  [key: string]: string;
}> => {
  return cardNameMapping;
};

// Sync versiyon (fallback için)
export const getCardNameMappingSync = (): { [key: string]: string } => {
  return cardNameMapping;
};
