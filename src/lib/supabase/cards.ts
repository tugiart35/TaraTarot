import { createClient } from '@supabase/supabase-js';
import { TarotCard, CardContent, CardSEO, CardPage } from '@/types/tarot-cards';

// Supabase client configuration for tarot cards
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Card data queries
export class CardDataService {
  // Get card by slug and locale
  static async getCardBySlug(
    slug: string,
    locale: 'tr' | 'en' | 'sr'
  ): Promise<TarotCard | null> {
    try {
      const { data, error } = await supabase
        .from('tarot_cards')
        .select('*')
        .eq(`slug_${locale}`, slug)
        .single();

      if (error) {
        console.error('Error fetching card by slug:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getCardBySlug:', error);
      return null;
    }
  }

  // Get card content by card ID and locale
  static async getCardContent(
    cardId: string,
    locale: 'tr' | 'en' | 'sr'
  ): Promise<CardContent | null> {
    try {
      const { data, error } = await supabase
        .from('card_content')
        .select('*')
        .eq('card_id', cardId)
        .eq('locale', locale)
        .single();

      if (error) {
        console.error('Error fetching card content:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getCardContent:', error);
      return null;
    }
  }

  // Get card SEO by card ID and locale
  static async getCardSEO(
    cardId: string,
    locale: 'tr' | 'en' | 'sr'
  ): Promise<CardSEO | null> {
    try {
      const { data, error } = await supabase
        .from('card_seo')
        .select('*')
        .eq('card_id', cardId)
        .eq('locale', locale)
        .single();

      if (error) {
        console.error('Error fetching card SEO:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getCardSEO:', error);
      return null;
    }
  }

  // Get cards by locale with pagination
  static async getCardsByLocale(
    _locale: 'tr' | 'en' | 'sr',
    options: {
      arcanaType?: 'major' | 'minor';
      suit?: 'cups' | 'swords' | 'wands' | 'pentacles';
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{ cards: TarotCard[]; total: number }> {
    try {
      let query = supabase.from('tarot_cards').select('*', { count: 'exact' });

      if (options.arcanaType) {
        query = query.eq('arcana_type', options.arcanaType);
      }

      if (options.suit) {
        query = query.eq('suit', options.suit);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(
          options.offset,
          options.offset + (options.limit || 20) - 1
        );
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching cards by locale:', error);
        return { cards: [], total: 0 };
      }

      return { cards: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error in getCardsByLocale:', error);
      return { cards: [], total: 0 };
    }
  }

  // Get related cards by card ID and locale
  static async getRelatedCards(
    cardId: string,
    _locale: 'tr' | 'en' | 'sr',
    limit: number = 4
  ): Promise<TarotCard[]> {
    try {
      // First get the current card to determine arcana type
      const { data: currentCard, error: cardError } = await supabase
        .from('tarot_cards')
        .select('arcana_type')
        .eq('id', cardId)
        .single();

      if (cardError || !currentCard) {
        console.error('Error fetching current card:', cardError);
        return [];
      }

      // Get related cards of the same arcana type, excluding current card
      const { data, error } = await supabase
        .from('tarot_cards')
        .select('*')
        .eq('arcana_type', currentCard.arcana_type)
        .neq('id', cardId)
        .limit(limit);

      if (error) {
        console.error('Error fetching related cards:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getRelatedCards:', error);
      return [];
    }
  }

  // Get card page by slug and locale
  static async getCardPage(
    slug: string,
    locale: 'tr' | 'en' | 'sr'
  ): Promise<CardPage | null> {
    try {
      const { data, error } = await supabase
        .from('card_pages')
        .select('*')
        .eq('slug', slug)
        .eq('locale', locale)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching card page:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getCardPage:', error);
      return null;
    }
  }
}
