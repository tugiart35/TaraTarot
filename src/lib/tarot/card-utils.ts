/**
 * Tarot Card Utility Functions
 *
 * Helper functions for card URL mapping, image paths, and magic number constants.
 */

export type Locale = 'tr' | 'en' | 'sr';

/**
 * Court card number constants
 * Use these instead of magic numbers (11, 12, 13, 14)
 */
export const COURT_CARDS = {
  PAGE: 11,
  KNIGHT: 12,
  QUEEN: 13,
  KING: 14,
} as const;

/**
 * Number to word mapping for card names
 */
export const NUMBER_TO_WORD: Record<number, string> = {
  1: 'ace',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
};

/**
 * Roman numerals for card images (Minor Arcana)
 */
export const NUMBER_TO_ROMAN: Record<number, string> = {
  1: 'Ace',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
};

/**
 * Court card names
 */
export const COURT_NAMES = {
  11: 'page',
  12: 'knight',
  13: 'queen',
  14: 'king',
} as const;

/**
 * Suit names in different formats
 */
export const SUIT_NAMES = {
  Cups: 'cups',
  Pentacles: 'pentacles',
  Swords: 'swords',
  Wands: 'wands',
} as const;

/**
 * Check if a number is a court card
 */
export function isCourtCard(number: number): boolean {
  return number >= COURT_CARDS.PAGE && number <= COURT_CARDS.KING;
}

/**
 * Get card number as word
 */
export function getNumberWord(number: number): string {
  if (NUMBER_TO_WORD[number]) {
    return NUMBER_TO_WORD[number];
  }
  if (isCourtCard(number)) {
    return COURT_NAMES[number as keyof typeof COURT_NAMES] || 'unknown';
  }
  return 'unknown';
}

/**
 * Get card number as roman numeral (for images)
 */
export function getNumberRoman(number: number): string {
  return NUMBER_TO_ROMAN[number] || String(number);
}
