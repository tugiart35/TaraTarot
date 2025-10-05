import { z } from 'zod';

// Tarot Card Validation Schema
export const TarotCardSchema = z.object({
  id: z.string().uuid(),
  englishName: z.string().min(1).max(50),
  turkishName: z.string().min(1).max(50),
  serbianName: z.string().min(1).max(50),
  arcanaType: z.enum(['major', 'minor']),
  suit: z.enum(['cups', 'swords', 'wands', 'pentacles']).optional(),
  number: z.number().int().min(1).max(14).optional(),
  imageUrl: z.string().url(),
  slug: z.object({
    tr: z.string().min(1).max(100),
    en: z.string().min(1).max(100),
    sr: z.string().min(1).max(100),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Card Content Validation Schema
export const CardContentSchema = z.object({
  id: z.string().uuid(),
  cardId: z.string().uuid(),
  locale: z.enum(['tr', 'en', 'sr']),
  uprightMeaning: z.string().min(500).max(800),
  reversedMeaning: z.string().min(500).max(800),
  loveInterpretation: z.string().min(200).max(400),
  careerInterpretation: z.string().min(200).max(400),
  moneyInterpretation: z.string().min(200).max(400),
  spiritualInterpretation: z.string().min(200).max(400),
  story: z.string().min(300).max(600),
  keywords: z.array(z.string()).min(5).max(10),
  readingTime: z.number().int().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Card SEO Validation Schema
export const CardSEOSchema = z.object({
  id: z.string().uuid(),
  cardId: z.string().uuid(),
  locale: z.enum(['tr', 'en', 'sr']),
  metaTitle: z.string().min(50).max(60),
  metaDescription: z.string().min(120).max(155),
  canonicalUrl: z.string().url(),
  ogImage: z.string().url(),
  twitterImage: z.string().url(),
  keywords: z.array(z.string()).min(5).max(10),
  faq: z
    .array(
      z.object({
        question: z.string().min(1).max(100),
        answer: z.string().min(1).max(300),
      })
    )
    .min(3)
    .max(6),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// FAQ Item Validation Schema
export const FAQItemSchema = z.object({
  question: z.string().min(1).max(100),
  answer: z.string().min(1).max(300),
});

// Card Page Validation Schema
export const CardPageSchema = z.object({
  locale: z.enum(['tr', 'en', 'sr']),
  slug: z.string().min(1).max(100),
  cardId: z.string().uuid(),
  path: z.string().min(1),
  isActive: z.boolean(),
  lastModified: z.date(),
});

// API Request Validation Schemas
export const GetCardBySlugSchema = z.object({
  locale: z.enum(['tr', 'en', 'sr']),
  slug: z.string().min(1).max(100),
});

export const GetCardsByLocaleSchema = z.object({
  locale: z.enum(['tr', 'en', 'sr']),
  arcanaType: z.enum(['major', 'minor']).optional(),
  suit: z.enum(['cups', 'swords', 'wands', 'pentacles']).optional(),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

export const GetRelatedCardsSchema = z.object({
  cardId: z.string().uuid(),
  locale: z.enum(['tr', 'en', 'sr']),
  limit: z.number().int().min(1).max(10).default(4),
});

// Validation helper functions
export function validateTarotCard(data: unknown) {
  return TarotCardSchema.parse(data);
}

export function validateCardContent(data: unknown) {
  return CardContentSchema.parse(data);
}

export function validateCardSEO(data: unknown) {
  return CardSEOSchema.parse(data);
}

export function validateFAQItem(data: unknown) {
  return FAQItemSchema.parse(data);
}

export function validateCardPage(data: unknown) {
  return CardPageSchema.parse(data);
}

export function validateGetCardBySlug(data: unknown) {
  return GetCardBySlugSchema.parse(data);
}

export function validateGetCardsByLocale(data: unknown) {
  return GetCardsByLocaleSchema.parse(data);
}

export function validateGetRelatedCards(data: unknown) {
  return GetRelatedCardsSchema.parse(data);
}
