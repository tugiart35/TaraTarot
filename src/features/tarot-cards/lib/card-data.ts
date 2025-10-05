// src/features/tarot-cards/lib/card-data.ts
import { BlogCardService } from '@/lib/data/blog-card-service';
import { CardPageData } from '@/types/tarot-cards';

export class CardData {
  // Get complete card data by slug and locale
  static async getCardBySlug(
    slug: string,
    locale: 'tr' | 'en' | 'sr'
  ): Promise<CardPageData | null> {
    try {
      const card = BlogCardService.getCardBySlug(slug, locale);
      if (!card) {
        // First try Major Arcana fallback
        const majorArcanaFallback = this.createMajorArcanaFallback(slug, locale);
        if (majorArcanaFallback) {
          return majorArcanaFallback;
        }
        
        // Then try Minor Arcana fallback
        return this.createMinorArcanaFallback(slug, locale);
      }

      const relatedCards = BlogCardService.getRelatedCards('the_fool', 4); // For now, using the_fool as base

      // Map to CardPageData format
      const mappedCard = {
        id: 'the_fool', // For now, using the_fool as base
        englishName: 'The Fool',
        turkishName: card.name,
        serbianName: 'Joker',
        arcanaType: 'major' as const,
        imageUrl: card.imageUrl,
        slug: {
          tr: BlogCardService.getCardSlug(card, 'tr'),
          en: BlogCardService.getCardSlug(card, 'en'),
          sr: BlogCardService.getCardSlug(card, 'sr'),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mappedContent = {
        id: `the_fool-content`,
        cardId: 'the_fool',
        locale: locale,
        uprightMeaning: card.meanings.upright.general,
        reversedMeaning: card.meanings.reversed.general,
        loveInterpretation: card.meanings.upright.love,
        careerInterpretation: card.meanings.upright.career,
        moneyInterpretation: card.meanings.upright.money,
        spiritualInterpretation: card.meanings.upright.spiritual,
        story: card.context.mythology,
        keywords: [], // Will be populated from blog data
        readingTime: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mappedSEO = {
        id: `the_fool-seo`,
        cardId: 'the_fool',
        locale: locale,
        metaTitle: `${card.name} — Tarot Kartı Anlamı | Busbuskimki`,
        metaDescription: card.short_description,
        canonicalUrl: BlogCardService.getCardUrl(card, locale),
        ogImage: card.imageUrl,
        twitterImage: card.imageUrl,
        keywords: [],
        faq: Array.isArray(card.faq) ? card.faq : [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mappedRelatedCards = relatedCards.map(relatedCard => ({
        id: 'related-card',
        englishName: 'Related Card',
        turkishName: relatedCard.name,
        serbianName: 'Related Card',
        arcanaType: 'major' as const,
        imageUrl: relatedCard.imageUrl,
        slug: {
          tr: BlogCardService.getCardSlug(relatedCard, 'tr'),
          en: BlogCardService.getCardSlug(relatedCard, 'en'),
          sr: BlogCardService.getCardSlug(relatedCard, 'sr'),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      return {
        card: mappedCard,
        content: mappedContent,
        seo: mappedSEO,
        relatedCards: mappedRelatedCards,
      };
    } catch (error) {
      console.error('Error in getCardBySlug:', error);
      return null;
    }
  }

  // Create fallback data for Minor Arcana cards
  private static createMinorArcanaFallback(
    slug: string,
    locale: 'tr' | 'en' | 'sr'
  ): CardPageData | null {
    // Parse slug to determine card type and suit
    const cardInfo = this.parseMinorArcanaSlug(slug, locale);
    if (!cardInfo) {
      return null;
    }

    const { suit, number: cardNumber, cardName } = cardInfo;
    const number = cardNumber || '1'; // Fallback to '1' if undefined

    // Create basic card data
    const mappedCard = {
      id: slug,
      englishName: cardName.en,
      turkishName: cardName.tr,
      serbianName: cardName.sr,
      arcanaType: 'minor' as const,
      imageUrl: `/cards/rws/${suit}-${number}.webp`,
      slug: {
        tr: this.getSlugForLocale(slug, 'tr'),
        en: this.getSlugForLocale(slug, 'en'),
        sr: this.getSlugForLocale(slug, 'sr'),
      },
      suit: suit.toLowerCase() as 'cups' | 'swords' | 'wands' | 'pentacles',
      number: parseInt(number || '0'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Create basic content
    const mappedContent = {
      id: `${slug}-content`,
      cardId: slug,
      locale: locale,
      uprightMeaning: this.getUprightMeaning(suit, number, locale),
      reversedMeaning: this.getReversedMeaning(suit, number, locale),
      loveInterpretation: this.getLoveInterpretation(suit, number, locale),
      careerInterpretation: this.getCareerInterpretation(suit, number, locale),
      moneyInterpretation: this.getMoneyInterpretation(suit, number, locale),
      spiritualInterpretation: this.getSpiritualInterpretation(suit, number, locale),
      story: this.getCardStory(suit, number, locale),
      keywords: this.getCardKeywords(suit, number, locale),
      readingTime: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Create comprehensive SEO
    const mappedSEO = {
      id: `${slug}-seo`,
      cardId: slug,
      locale: locale,
      metaTitle: this.getSEOTitle(cardName[locale], locale),
      metaDescription: this.getSEODescription(cardName[locale], locale),
      canonicalUrl: this.getCanonicalUrl(slug, locale),
      ogImage: `/cards/rws/${suit}-${number}.webp`,
      twitterImage: `/cards/rws/${suit}-${number}.webp`,
      keywords: this.getSEOKeywords(cardName[locale], locale).split(', '),
      faq: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Create related cards (using Major Arcana as fallback)
    const mappedRelatedCards = [
      {
        id: 'the-fool',
        englishName: 'The Fool',
        turkishName: 'Deli (Joker)',
        serbianName: 'Joker',
        arcanaType: 'major' as const,
        imageUrl: '/cards/rws/0-Fool.webp',
        slug: {
          tr: 'joker',
          en: 'the-fool',
          sr: 'joker',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return {
      card: mappedCard,
      content: mappedContent,
      seo: mappedSEO,
      relatedCards: mappedRelatedCards,
    };
  }

  // Parse Minor Arcana slug to extract suit and number
  private static parseMinorArcanaSlug(slug: string, locale: 'tr' | 'en' | 'sr') {
    // Turkish patterns
    if (locale === 'tr') {
      // Cups suit
      const cupsMatch = slug.match(/kupalar-(\d+)/);
      if (cupsMatch) return { suit: 'Cups', number: cupsMatch[1], suitName: 'Cups', cardName: { tr: `${cupsMatch[1]} Kupa`, en: `${cupsMatch[1]} of Cups`, sr: `${cupsMatch[1]} Kupa` } };
      
      if (slug === 'kupalar-asi') return { suit: 'Cups', number: '1', suitName: 'Cups', cardName: { tr: '1 Kupa', en: '1 of Cups', sr: '1 Kupa' } };
      if (slug === 'kupalar-ucak') return { suit: 'Cups', number: '11', suitName: 'Cups', cardName: { tr: '11 Kupa', en: '11 of Cups', sr: '11 Kupa' } };
      if (slug === 'kupalar-kiz') return { suit: 'Cups', number: '12', suitName: 'Cups', cardName: { tr: '12 Kupa', en: '12 of Cups', sr: '12 Kupa' } };
      if (slug === 'kupalar-sovalye') return { suit: 'Cups', number: '13', suitName: 'Cups', cardName: { tr: '13 Kupa', en: '13 of Cups', sr: '13 Kupa' } };
      if (slug === 'kupalar-krali') return { suit: 'Cups', number: '14', suitName: 'Cups', cardName: { tr: '14 Kupa', en: '14 of Cups', sr: '14 Kupa' } };
      
      // Swords suit
      const swordsMatch = slug.match(/kiliclar-(\d+)/);
      if (swordsMatch) return { suit: 'Swords', number: swordsMatch[1], suitName: 'Swords', cardName: { tr: `${swordsMatch[1]} Kılıç`, en: `${swordsMatch[1]} of Swords`, sr: `${swordsMatch[1]} Mač` } };
      
      if (slug === 'kiliclar-asi') return { suit: 'Swords', number: '1', suitName: 'Swords', cardName: { tr: '1 Kılıç', en: '1 of Swords', sr: '1 Mač' } };
      if (slug === 'kiliclar-ucak') return { suit: 'Swords', number: '11', suitName: 'Swords', cardName: { tr: '11 Kılıç', en: '11 of Swords', sr: '11 Mač' } };
      if (slug === 'kiliclar-kiz') return { suit: 'Swords', number: '12', suitName: 'Swords', cardName: { tr: '12 Kılıç', en: '12 of Swords', sr: '12 Mač' } };
      if (slug === 'kiliclar-sovalye') return { suit: 'Swords', number: '13', suitName: 'Swords', cardName: { tr: '13 Kılıç', en: '13 of Swords', sr: '13 Mač' } };
      if (slug === 'kiliclar-krali') return { suit: 'Swords', number: '14', suitName: 'Swords', cardName: { tr: '14 Kılıç', en: '14 of Swords', sr: '14 Mač' } };
      
      // Wands suit
      const wandsMatch = slug.match(/asalar-(\d+)/);
      if (wandsMatch) return { suit: 'Wands', number: wandsMatch[1], suitName: 'Wands', cardName: { tr: `${wandsMatch[1]} Asa`, en: `${wandsMatch[1]} of Wands`, sr: `${wandsMatch[1]} Štap` } };
      
      if (slug === 'asalar-asi') return { suit: 'Wands', number: '1', suitName: 'Wands', cardName: { tr: '1 Asa', en: '1 of Wands', sr: '1 Štap' } };
      if (slug === 'asalar-ucak') return { suit: 'Wands', number: '11', suitName: 'Wands', cardName: { tr: '11 Asa', en: '11 of Wands', sr: '11 Štap' } };
      if (slug === 'asalar-kiz') return { suit: 'Wands', number: '12', suitName: 'Wands', cardName: { tr: '12 Asa', en: '12 of Wands', sr: '12 Štap' } };
      if (slug === 'asalar-sovalye') return { suit: 'Wands', number: '13', suitName: 'Wands', cardName: { tr: '13 Asa', en: '13 of Wands', sr: '13 Štap' } };
      if (slug === 'asalar-krali') return { suit: 'Wands', number: '14', suitName: 'Wands', cardName: { tr: '14 Asa', en: '14 of Wands', sr: '14 Štap' } };
      
      // Pentacles suit
      const pentaclesMatch = slug.match(/yildizlar-(\d+)/);
      if (pentaclesMatch) return { suit: 'Pentacles', number: pentaclesMatch[1], suitName: 'Pentacles', cardName: { tr: `${pentaclesMatch[1]} Yıldız`, en: `${pentaclesMatch[1]} of Pentacles`, sr: `${pentaclesMatch[1]} Novčić` } };
      
      if (slug === 'yildizlar-asi') return { suit: 'Pentacles', number: '1', suitName: 'Pentacles', cardName: { tr: '1 Yıldız', en: '1 of Pentacles', sr: '1 Novčić' } };
      if (slug === 'yildizlar-ucak') return { suit: 'Pentacles', number: '11', suitName: 'Pentacles', cardName: { tr: '11 Yıldız', en: '11 of Pentacles', sr: '11 Novčić' } };
      if (slug === 'yildizlar-kiz') return { suit: 'Pentacles', number: '12', suitName: 'Pentacles', cardName: { tr: '12 Yıldız', en: '12 of Pentacles', sr: '12 Novčić' } };
      if (slug === 'yildizlar-sovalye') return { suit: 'Pentacles', number: '13', suitName: 'Pentacles', cardName: { tr: '13 Yıldız', en: '13 of Pentacles', sr: '13 Novčić' } };
      if (slug === 'yildizlar-krali') return { suit: 'Pentacles', number: '14', suitName: 'Pentacles', cardName: { tr: '14 Yıldız', en: '14 of Pentacles', sr: '14 Novčić' } };
    }

    // English patterns
    if (locale === 'en') {
      const cupsMatch = slug.match(/(\d+)-of-cups/);
      if (cupsMatch) return { suit: 'Cups', number: cupsMatch[1], suitName: 'Cups', cardName: { tr: `${cupsMatch[1]} Kupa`, en: `${cupsMatch[1]} of Cups`, sr: `${cupsMatch[1]} Kupa` } };
      
      if (slug === 'ace-of-cups') return { suit: 'Cups', number: '1', suitName: 'Cups', cardName: { tr: '1 Kupa', en: '1 of Cups', sr: '1 Kupa' } };
      if (slug === 'page-of-cups') return { suit: 'Cups', number: '11', suitName: 'Cups', cardName: { tr: '11 Kupa', en: '11 of Cups', sr: '11 Kupa' } };
      if (slug === 'knight-of-cups') return { suit: 'Cups', number: '12', suitName: 'Cups', cardName: { tr: '12 Kupa', en: '12 of Cups', sr: '12 Kupa' } };
      if (slug === 'queen-of-cups') return { suit: 'Cups', number: '13', suitName: 'Cups', cardName: { tr: '13 Kupa', en: '13 of Cups', sr: '13 Kupa' } };
      if (slug === 'king-of-cups') return { suit: 'Cups', number: '14', suitName: 'Cups', cardName: { tr: '14 Kupa', en: '14 of Cups', sr: '14 Kupa' } };
      
      const swordsMatch = slug.match(/(\d+)-of-swords/);
      if (swordsMatch) return { suit: 'Swords', number: swordsMatch[1], suitName: 'Swords', cardName: { tr: `${swordsMatch[1]} Kılıç`, en: `${swordsMatch[1]} of Swords`, sr: `${swordsMatch[1]} Mač` } };
      
      if (slug === 'ace-of-swords') return { suit: 'Swords', number: '1', suitName: 'Swords', cardName: { tr: '1 Kılıç', en: '1 of Swords', sr: '1 Mač' } };
      if (slug === 'page-of-swords') return { suit: 'Swords', number: '11', suitName: 'Swords', cardName: { tr: '11 Kılıç', en: '11 of Swords', sr: '11 Mač' } };
      if (slug === 'knight-of-swords') return { suit: 'Swords', number: '12', suitName: 'Swords', cardName: { tr: '12 Kılıç', en: '12 of Swords', sr: '12 Mač' } };
      if (slug === 'queen-of-swords') return { suit: 'Swords', number: '13', suitName: 'Swords', cardName: { tr: '13 Kılıç', en: '13 of Swords', sr: '13 Mač' } };
      if (slug === 'king-of-swords') return { suit: 'Swords', number: '14', suitName: 'Swords', cardName: { tr: '14 Kılıç', en: '14 of Swords', sr: '14 Mač' } };
      
      const wandsMatch = slug.match(/(\d+)-of-wands/);
      if (wandsMatch) return { suit: 'Wands', number: wandsMatch[1], suitName: 'Wands', cardName: { tr: `${wandsMatch[1]} Asa`, en: `${wandsMatch[1]} of Wands`, sr: `${wandsMatch[1]} Štap` } };
      
      if (slug === 'ace-of-wands') return { suit: 'Wands', number: '1', suitName: 'Wands', cardName: { tr: '1 Asa', en: '1 of Wands', sr: '1 Štap' } };
      if (slug === 'page-of-wands') return { suit: 'Wands', number: '11', suitName: 'Wands', cardName: { tr: '11 Asa', en: '11 of Wands', sr: '11 Štap' } };
      if (slug === 'knight-of-wands') return { suit: 'Wands', number: '12', suitName: 'Wands', cardName: { tr: '12 Asa', en: '12 of Wands', sr: '12 Štap' } };
      if (slug === 'queen-of-wands') return { suit: 'Wands', number: '13', suitName: 'Wands', cardName: { tr: '13 Asa', en: '13 of Wands', sr: '13 Štap' } };
      if (slug === 'king-of-wands') return { suit: 'Wands', number: '14', suitName: 'Wands', cardName: { tr: '14 Asa', en: '14 of Wands', sr: '14 Štap' } };
      
      const pentaclesMatch = slug.match(/(\d+)-of-pentacles/);
      if (pentaclesMatch) return { suit: 'Pentacles', number: pentaclesMatch[1], suitName: 'Pentacles', cardName: { tr: `${pentaclesMatch[1]} Yıldız`, en: `${pentaclesMatch[1]} of Pentacles`, sr: `${pentaclesMatch[1]} Novčić` } };
      
      if (slug === 'ace-of-pentacles') return { suit: 'Pentacles', number: '1', suitName: 'Pentacles', cardName: { tr: '1 Yıldız', en: '1 of Pentacles', sr: '1 Novčić' } };
      if (slug === 'page-of-pentacles') return { suit: 'Pentacles', number: '11', suitName: 'Pentacles', cardName: { tr: '11 Yıldız', en: '11 of Pentacles', sr: '11 Novčić' } };
      if (slug === 'knight-of-pentacles') return { suit: 'Pentacles', number: '12', suitName: 'Pentacles', cardName: { tr: '12 Yıldız', en: '12 of Pentacles', sr: '12 Novčić' } };
      if (slug === 'queen-of-pentacles') return { suit: 'Pentacles', number: '13', suitName: 'Pentacles', cardName: { tr: '13 Yıldız', en: '13 of Pentacles', sr: '13 Novčić' } };
      if (slug === 'king-of-pentacles') return { suit: 'Pentacles', number: '14', suitName: 'Pentacles', cardName: { tr: '14 Yıldız', en: '14 of Pentacles', sr: '14 Novčić' } };
    }

    // Serbian patterns
    if (locale === 'sr') {
      const cupsMatch = slug.match(/kupa-(\d+)/);
      if (cupsMatch) return { suit: 'Cups', number: cupsMatch[1], suitName: 'Cups', cardName: { tr: `${cupsMatch[1]} Kupa`, en: `${cupsMatch[1]} of Cups`, sr: `${cupsMatch[1]} Kupa` } };
      
      if (slug === 'kupa-as') return { suit: 'Cups', number: '1', suitName: 'Cups', cardName: { tr: '1 Kupa', en: '1 of Cups', sr: '1 Kupa' } };
      if (slug === 'kupa-ucak') return { suit: 'Cups', number: '11', suitName: 'Cups', cardName: { tr: '11 Kupa', en: '11 of Cups', sr: '11 Kupa' } };
      if (slug === 'kupa-kraljica') return { suit: 'Cups', number: '12', suitName: 'Cups', cardName: { tr: '12 Kupa', en: '12 of Cups', sr: '12 Kupa' } };
      if (slug === 'kupa-vitez') return { suit: 'Cups', number: '13', suitName: 'Cups', cardName: { tr: '13 Kupa', en: '13 of Cups', sr: '13 Kupa' } };
      if (slug === 'kupa-kralj') return { suit: 'Cups', number: '14', suitName: 'Cups', cardName: { tr: '14 Kupa', en: '14 of Cups', sr: '14 Kupa' } };
      
      const swordsMatch = slug.match(/mace-(\d+)/);
      if (swordsMatch) return { suit: 'Swords', number: swordsMatch[1], suitName: 'Swords', cardName: { tr: `${swordsMatch[1]} Kılıç`, en: `${swordsMatch[1]} of Swords`, sr: `${swordsMatch[1]} Mač` } };
      
      if (slug === 'mace-as') return { suit: 'Swords', number: '1', suitName: 'Swords', cardName: { tr: '1 Kılıç', en: '1 of Swords', sr: '1 Mač' } };
      if (slug === 'mace-ucak') return { suit: 'Swords', number: '11', suitName: 'Swords', cardName: { tr: '11 Kılıç', en: '11 of Swords', sr: '11 Mač' } };
      if (slug === 'mace-kraljica') return { suit: 'Swords', number: '12', suitName: 'Swords', cardName: { tr: '12 Kılıç', en: '12 of Swords', sr: '12 Mač' } };
      if (slug === 'mace-vitez') return { suit: 'Swords', number: '13', suitName: 'Swords', cardName: { tr: '13 Kılıç', en: '13 of Swords', sr: '13 Mač' } };
      if (slug === 'mace-kralj') return { suit: 'Swords', number: '14', suitName: 'Swords', cardName: { tr: '14 Kılıç', en: '14 of Swords', sr: '14 Mač' } };
      
      const wandsMatch = slug.match(/stap-(\d+)/);
      if (wandsMatch) return { suit: 'Wands', number: wandsMatch[1], suitName: 'Wands', cardName: { tr: `${wandsMatch[1]} Asa`, en: `${wandsMatch[1]} of Wands`, sr: `${wandsMatch[1]} Štap` } };
      
      if (slug === 'stap-as') return { suit: 'Wands', number: '1', suitName: 'Wands', cardName: { tr: '1 Asa', en: '1 of Wands', sr: '1 Štap' } };
      if (slug === 'stap-ucak') return { suit: 'Wands', number: '11', suitName: 'Wands', cardName: { tr: '11 Asa', en: '11 of Wands', sr: '11 Štap' } };
      if (slug === 'stap-kraljica') return { suit: 'Wands', number: '12', suitName: 'Wands', cardName: { tr: '12 Asa', en: '12 of Wands', sr: '12 Štap' } };
      if (slug === 'stap-vitez') return { suit: 'Wands', number: '13', suitName: 'Wands', cardName: { tr: '13 Asa', en: '13 of Wands', sr: '13 Štap' } };
      if (slug === 'stap-kralj') return { suit: 'Wands', number: '14', suitName: 'Wands', cardName: { tr: '14 Asa', en: '14 of Wands', sr: '14 Štap' } };
      
      const pentaclesMatch = slug.match(/novcic-(\d+)/);
      if (pentaclesMatch) return { suit: 'Pentacles', number: pentaclesMatch[1], suitName: 'Pentacles', cardName: { tr: `${pentaclesMatch[1]} Yıldız`, en: `${pentaclesMatch[1]} of Pentacles`, sr: `${pentaclesMatch[1]} Novčić` } };
      
      if (slug === 'novcic-as') return { suit: 'Pentacles', number: '1', suitName: 'Pentacles', cardName: { tr: '1 Yıldız', en: '1 of Pentacles', sr: '1 Novčić' } };
      if (slug === 'novcic-ucak') return { suit: 'Pentacles', number: '11', suitName: 'Pentacles', cardName: { tr: '11 Yıldız', en: '11 of Pentacles', sr: '11 Novčić' } };
      if (slug === 'novcic-kraljica') return { suit: 'Pentacles', number: '12', suitName: 'Pentacles', cardName: { tr: '12 Yıldız', en: '12 of Pentacles', sr: '12 Novčić' } };
      if (slug === 'novcic-vitez') return { suit: 'Pentacles', number: '13', suitName: 'Pentacles', cardName: { tr: '13 Yıldız', en: '13 of Pentacles', sr: '13 Novčić' } };
      if (slug === 'novcic-kralj') return { suit: 'Pentacles', number: '14', suitName: 'Pentacles', cardName: { tr: '14 Yıldız', en: '14 of Pentacles', sr: '14 Novčić' } };
    }

    return null;
  }

  // Helper methods for generating card content
  private static getSlugForLocale(slug: string, _targetLocale: 'tr' | 'en' | 'sr'): string {
    // This would need proper mapping logic
    return slug;
  }

  // Major Arcana fallback for missing cards
  private static createMajorArcanaFallback(_slug: string, _locale: 'tr' | 'en' | 'sr'): CardPageData | null {
    // TODO: Implement proper Major Arcana fallback
    return null;
  }

  private static getUprightMeaning(suit: string, number: string, locale: 'tr' | 'en' | 'sr'): string {
    const meanings = {
      tr: `${number} ${suit} kartı, pozitif enerjileri ve fırsatları temsil eder.`,
      en: `The ${number} of ${suit} represents positive energies and opportunities.`,
      sr: `${number} ${suit} karta predstavlja pozitivne energije i prilike.`
    };
    return meanings[locale];
  }

  private static getReversedMeaning(suit: string, number: string, locale: 'tr' | 'en' | 'sr'): string {
    const meanings = {
      tr: `Ters ${number} ${suit} kartı, zorlukları ve engelleri işaret eder.`,
      en: `The reversed ${number} of ${suit} indicates challenges and obstacles.`,
      sr: `Obrnuta ${number} ${suit} karta ukazuje na izazove i prepreke.`
    };
    return meanings[locale];
  }

  private static getLoveInterpretation(suit: string, number: string, locale: 'tr' | 'en' | 'sr'): string {
    const meanings = {
      tr: `Aşk alanında ${number} ${suit} kartı, duygusal gelişimi ve ilişki dinamiklerini gösterir.`,
      en: `In love, the ${number} of ${suit} shows emotional development and relationship dynamics.`,
      sr: `U ljubavi, ${number} ${suit} karta pokazuje emocionalni razvoj i dinamiku veza.`
    };
    return meanings[locale];
  }

  private static getCareerInterpretation(suit: string, number: string, locale: 'tr' | 'en' | 'sr'): string {
    const meanings = {
      tr: `Kariyer açısından ${number} ${suit} kartı, profesyonel gelişimi ve iş fırsatlarını işaret eder.`,
      en: `Career-wise, the ${number} of ${suit} indicates professional development and work opportunities.`,
      sr: `Što se tiče karijere, ${number} ${suit} karta ukazuje na profesionalni razvoj i radne prilike.`
    };
    return meanings[locale];
  }

  private static getMoneyInterpretation(suit: string, number: string, locale: 'tr' | 'en' | 'sr'): string {
    const meanings = {
      tr: `Maddi konularda ${number} ${suit} kartı, finansal durumu ve para yönetimini gösterir.`,
      en: `Financially, the ${number} of ${suit} shows financial situation and money management.`,
      sr: `Finansijski, ${number} ${suit} karta pokazuje finansijsku situaciju i upravljanje novcem.`
    };
    return meanings[locale];
  }

  private static getSpiritualInterpretation(suit: string, number: string, locale: 'tr' | 'en' | 'sr'): string {
    const meanings = {
      tr: `Ruhsal olarak ${number} ${suit} kartı, içsel gelişimi ve ruhsal yolculuğu işaret eder.`,
      en: `Spiritually, the ${number} of ${suit} indicates inner development and spiritual journey.`,
      sr: `Duhovno, ${number} ${suit} karta ukazuje na unutrašnji razvoj i duhovno putovanje.`
    };
    return meanings[locale];
  }

  private static getCardStory(suit: string, number: string, locale: 'tr' | 'en' | 'sr'): string {
    const stories = {
      tr: `${number} ${suit} kartının hikayesi, tarot geleneğinde özel bir yere sahiptir.`,
      en: `The story of the ${number} of ${suit} holds a special place in tarot tradition.`,
      sr: `Priča o ${number} ${suit} karti ima posebno mesto u tarot tradiciji.`
    };
    return stories[locale];
  }

  private static getCardKeywords(_suit: string, _number: string, locale: 'tr' | 'en' | 'sr'): string[] {
    const keywords = {
      tr: ['enerji', 'gelişim', 'fırsat'],
      en: ['energy', 'development', 'opportunity'],
      sr: ['energija', 'razvoj', 'prilika']
    };
    return keywords[locale];
  }

  // @ts-expect-error - Reserved for future use
  private static getCardDescription(suit: string, number: string, locale: 'tr' | 'en' | 'sr'): string {
    const descriptions = {
      tr: `${number} ${suit} kartının detaylı anlamları ve yorumları.`,
      en: `Detailed meanings and interpretations of the ${number} of ${suit} card.`,
      sr: `Detaljna značenja i tumačenja ${number} ${suit} karte.`
    };
    return descriptions[locale];
  }

  // Get cards by locale with filters
  static async getCardsByLocale(
    _locale: 'tr' | 'en' | 'sr',
    options: {
      arcanaType?: 'major' | 'minor';
      suit?: 'cups' | 'swords' | 'wands' | 'pentacles';
      limit?: number;
      offset?: number;
    } = {}
  ) {
    try {
      const cards = BlogCardService.getAllCards();
      return {
        cards: cards.slice(
          options.offset || 0,
          (options.offset || 0) + (options.limit || 10)
        ),
        total: cards.length,
      };
    } catch (error) {
      console.error('Error in getCardsByLocale:', error);
      return { cards: [], total: 0 };
    }
  }

  // Get related cards
  static async getRelatedCards(
    cardId: string,
    _locale: 'tr' | 'en' | 'sr',
    limit: number = 4
  ) {
    try {
      return BlogCardService.getRelatedCards(cardId, limit);
    } catch (error) {
      console.error('Error in getRelatedCards:', error);
      return [];
    }
  }

  // Get card page info
  static async getCardPage(slug: string, locale: 'tr' | 'en' | 'sr') {
    try {
      return await this.getCardBySlug(slug, locale);
    } catch (error) {
      console.error('Error in getCardPage:', error);
      return null;
    }
  }

  // Validate card data
  static validateCardData(data: CardPageData): boolean {
    try {
      // Check required fields
      if (!data.card || !data.content || !data.seo) {
        return false;
      }

      // Check card fields
      if (
        !data.card.id ||
        !data.card.englishName ||
        !data.card.turkishName ||
        !data.card.serbianName
      ) {
        return false;
      }

      // Check content fields
      if (
        !data.content.cardId ||
        !data.content.locale ||
        !data.content.uprightMeaning
      ) {
        return false;
      }

      // Check SEO fields
      if (
        !data.seo.cardId ||
        !data.seo.locale ||
        !data.seo.metaTitle ||
        !data.seo.metaDescription
      ) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating card data:', error);
      return false;
    }
  }

  // Get card name for locale
  static getCardNameForLocale(card: any, locale: 'tr' | 'en' | 'sr'): string {
    switch (locale) {
      case 'tr':
        return card.turkishName;
      case 'en':
        return card.englishName;
      case 'sr':
        return card.serbianName;
      default:
        return card.englishName;
    }
  }

  // Get card slug for locale
  static getCardSlugForLocale(card: any, locale: 'tr' | 'en' | 'sr'): string {
    return card.slug[locale];
  }

  // Get card image URL
  static getCardImageUrl(card: any): string {
    return card.imageUrl;
  }

  // Get card arcana type
  static getCardArcanaType(card: any): 'major' | 'minor' {
    return card.arcanaType;
  }

  // Get card suit (for minor arcana)
  static getCardSuit(card: any): string | null {
    return card.suit || null;
  }

  // Get card number (for minor arcana)
  static getCardNumber(card: any): number | null {
    return card.number || null;
  }

  // SEO Helper Methods
  private static getSEOTitle(cardName: string, locale: 'tr' | 'en' | 'sr'): string {
    const titles = {
      tr: `${cardName} Tarot Kartı Anlamı ve Yorumu | Büsbüşkimki`,
      en: `${cardName} Tarot Card Meaning and Interpretation | Büsbüşkimki`,
      sr: `${cardName} Tarot Karta Značenje i Interpretacija | Büsbüşkimki`
    };
    return titles[locale];
  }

  private static getSEODescription(cardName: string, locale: 'tr' | 'en' | 'sr'): string {
    const descriptions = {
      tr: `${cardName} tarot kartının detaylı anlamı, düz ve ters yorumları. Aşk, kariyer, para ve ruhsal rehberlik konularında ${cardName} kartının ne anlama geldiğini öğrenin.`,
      en: `Detailed meaning of ${cardName} tarot card, upright and reversed interpretations. Learn what ${cardName} card means in love, career, money and spiritual guidance.`,
      sr: `Detaljno značenje ${cardName} tarot karte, uspravno i obrnuto tumačenje. Saznajte šta ${cardName} karta znači u ljubavi, karijeri, novcu i duhovnom vođstvu.`
    };
    return descriptions[locale];
  }

  private static getSEOKeywords(cardName: string, locale: 'tr' | 'en' | 'sr'): string {
    const keywords = {
      tr: `${cardName.toLowerCase()}, tarot, kart, anlam, yorum, aşk, kariyer, para, ruhsal rehberlik, Büsbüşkimki`,
      en: `${cardName.toLowerCase()}, tarot, card, meaning, interpretation, love, career, money, spiritual guidance, Büsbüşkimki`,
      sr: `${cardName.toLowerCase()}, tarot, karta, značenje, interpretacija, ljubav, karijera, novac, duhovno vođstvo, Büsbüşkimki`
    };
    return keywords[locale];
  }

  private static getCanonicalUrl(slug: string, locale: 'tr' | 'en' | 'sr'): string {
    const baseUrls = {
      tr: 'https://busbuskimki.com/tr/kartlar',
      en: 'https://busbuskimki.com/en/cards',
      sr: 'https://busbuskimki.com/sr/kartice'
    };
    return `${baseUrls[locale]}/${slug}`;
  }

  // @ts-expect-error - Reserved for future use
  private static getStructuredData(cardName: string, locale: 'tr' | 'en' | 'sr', slug: string) {
    const structuredData = {
      tr: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${cardName} Tarot Kartı Anlamı`,
        "description": `${cardName} tarot kartının detaylı anlamı ve yorumu`,
        "author": {
          "@type": "Organization",
          "name": "Büsbüşkimki"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Büsbüşkimki",
          "logo": {
            "@type": "ImageObject",
            "url": "https://busbuskimki.com/logo.png"
          }
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://busbuskimki.com/tr/kartlar/${slug}`
        }
      },
      en: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${cardName} Tarot Card Meaning`,
        "description": `Detailed meaning and interpretation of ${cardName} tarot card`,
        "author": {
          "@type": "Organization",
          "name": "Büsbüşkimki"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Büsbüşkimki",
          "logo": {
            "@type": "ImageObject",
            "url": "https://busbuskimki.com/logo.png"
          }
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://busbuskimki.com/en/cards/${slug}`
        }
      },
      sr: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${cardName} Tarot Karta Značenje`,
        "description": `Detaljno značenje i interpretacija ${cardName} tarot karte`,
        "author": {
          "@type": "Organization",
          "name": "Büsbüşkimki"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Büsbüşkimki",
          "logo": {
            "@type": "ImageObject",
            "url": "https://busbuskimki.com/logo.png"
          }
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://busbuskimki.com/sr/kartice/${slug}`
        }
      }
    };
    return structuredData[locale];
  }
}
