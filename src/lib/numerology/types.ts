/**
 * Numeroloji modülü için tip tanımları
 * Pythagorean numeroloji sistemi için gerekli tipler
 */

export type NumerologyType =
  | 'life-path'
  | 'expression-destiny'
  | 'soul-urge'
  | 'personality'
  | 'birthday-number'
  | 'maturity'
  | 'pinnacles-challenges'
  | 'personal-cycles'
  | 'compatibility';

export interface NumerologyInput {
  fullName?: string;
  birthDate?: string; // YYYY-MM-DD format
  date?: string; // Günlük sayı için
  targetDate?: string; // Kişisel döngüler için
  personA?: { birthDate: string; fullName: string }; // Uyum analizi için
  personB?: { birthDate: string; fullName: string }; // Uyum analizi için
}

export interface NumerologyResult {
  number: number;
  isMasterNumber: boolean;
  description: string;
  type: NumerologyType;
  // Özel sonuçlar için ek alanlar
  pinnacles?: { period: string; number: number; description: string }[];
  challenges?: { period: string; number: number; description: string }[];
  personalYear?: number;
  personalMonth?: number;
  personalDay?: number;
  compatibilityScore?: number;
  compatibilityNotes?: string[];
}

export interface NumerologyFormData {
  fullName: string;
  birthDate: string;
}

export interface DailyNumberFormData {
  date: string;
}

// Master sayılar (11, 22, 33)
export const MASTER_NUMBERS = [11, 22, 33] as const;

// Harf değerleri - Pythagoras sistemi (A=1, B=2, ..., I=9, J=1, ..., R=9, S=1, ..., Z=8)
export const LETTER_VALUES: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

// Türkçe karakter normalizasyonu
export const TURKISH_NORMALIZATION: Record<string, string> = {
  Ç: 'C',
  Ş: 'S',
  Ğ: 'G',
  Ö: 'O',
  Ü: 'U',
  İ: 'I',
  ı: 'I',
  â: 'A',
  ê: 'E',
  î: 'I',
  ô: 'O',
  û: 'U',
};

// Sesli harfler (Soul Urge hesaplaması için) - Y her zaman ünsüz kabul edilir
export const VOWELS = ['A', 'E', 'I', 'O', 'U'] as const;

// Karmik borçlar (13, 14, 16, 19)
export const KARMIC_DEBTS = [13, 14, 16, 19] as const;
