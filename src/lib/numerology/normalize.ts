/**
 * Numeroloji için normalizasyon yardımcıları
 * İsimleri ve tarihleri numeroloji hesaplaması için hazırlar
 */

import { LETTER_VALUES, TURKISH_NORMALIZATION, VOWELS } from './types';

/**
 * İsmi numeroloji hesaplaması için normalize eder
 * - Türkçe karakterleri İngilizce karşılıklarına çevirir
 * - Büyük harfe çevirir
 * - Sadece harfleri tutar, diğer karakterleri kaldırır
 */
export function normalizeName(name: string): string {
  return name
    .trim() // Boşlukları temizle
    .replace(/\s+/g, ' ') // Çoklu boşlukları tek boşluğa indir
    .split('')
    .map(char => TURKISH_NORMALIZATION[char] || char)
    .join('')
    .toUpperCase()
    .replace(/[^A-Z]/g, ''); // Sadece A-Z harflerini tut
}

/**
 * Tarihi numeroloji hesaplaması için normalize eder
 * YYYY-MM-DD formatını YYYYMMDD formatına çevirir
 */
export function normalizeDate(date: string): string {
  return date.replace(/-/g, '');
}

/**
 * Harfin numeroloji değerini döndürür
 */
export function getLetterValue(letter: string): number {
  return LETTER_VALUES[letter.toUpperCase()] || 0;
}

/**
 * Sayıyı tek haneye indirger (Pythagorean reduction)
 * Master sayıları (11, 22, 33) korur
 */
export function reduceToSingleDigit(num: number): number {
  // Master sayıları koru
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }

  // Tek haneye indir
  while (num > 9) {
    num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    // Tekrar master sayı kontrolü
    if (num === 11 || num === 22 || num === 33) {
      return num;
    }
  }

  return num;
}

/**
 * İsmin tüm harflerinin değerlerini toplar
 */
export function sumNameValues(name: string): number {
  const normalizedName = normalizeName(name);
  return normalizedName
    .split('')
    .reduce((sum, letter) => sum + getLetterValue(letter), 0);
}

/**
 * İsmin sesli harflerinin değerlerini toplar
 */
export function sumVowelValues(name: string): number {
  const normalizedName = normalizeName(name);
  
  return normalizedName
    .split('')
    .filter(letter => VOWELS.includes(letter as any))
    .reduce((sum, letter) => sum + getLetterValue(letter), 0);
}

/**
 * İsmin ünsüz harflerinin değerlerini toplar (Kişilik sayısı için)
 */
export function sumConsonantValues(name: string): number {
  const normalizedName = normalizeName(name);
  
  return normalizedName
    .split('')
    .filter(letter => !VOWELS.includes(letter as any))
    .reduce((sum, letter) => sum + getLetterValue(letter), 0);
}

/**
 * Tarihin rakamlarını toplar
 */
export function sumDateDigits(date: string): number {
  const normalizedDate = normalizeDate(date);
  return normalizedDate
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit), 0);
}

/**
 * Tarihten ay, gün, yıl değerlerini çıkarır
 */
export function extractDateParts(date: string): { month: number; day: number; year: number } {
  const parts = date.split('-');
  if (parts.length < 3) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD');
  }
  return {
    month: parseInt(parts[1]!),
    day: parseInt(parts[2]!),
    year: parseInt(parts[0]!)
  };
}

/**
 * Doğum günü sayısını hesaplar (1-31 arası)
 */
export function getBirthdayNumber(day: number): number {
  if (day >= 1 && day <= 31) {
    return reduceToSingleDigit(day);
  }
  return 0;
}

/**
 * İki sayı arasındaki mutlak farkı hesaplar
 */
export function getAbsoluteDifference(a: number, b: number): number {
  return Math.abs(a - b);
}