/*
 * Position Meanings Generator - Generic Pozisyon Anlamları Sistemi
 * 
 * Bu dosya tüm tarot açılımları için ortak pozisyon anlamları sistemi sağlar.
 * DRY principle uygulayarak tekrarlanan pozisyon anlamları kodlarını önler.
 */

export interface BasePositionMeaning {
  id: string;
  card: string;
  position: number;
  upright: string;
  reversed: string;
  keywords: string[];
  context: string;
  group: 'Majör Arkana' | 'Kupalar' | 'Kılıçlar' | 'Asalar' | 'Tılsımlar';
}

export interface PositionMeaningGenerator {
  generatePositionMeanings(
    spreadType: string,
    position: number,
    positionName: string
  ): BasePositionMeaning[];
}

export class TarotPositionMeaningGenerator implements PositionMeaningGenerator {
  private readonly cardMeanings: Record<string, Record<string, any>> = {
    'The Fool': {
      upright: 'Yeni başlangıçlar, masumiyet, spontanlık, risk almak, özgür ruh',
      reversed: 'Pervasızlık, sorumsuzluk, korku, plansızlık, dikkatsizlik',
      keywords: ['yeni başlangıçlar', 'masumiyet', 'spontanlık', 'risk almak', 'özgür ruh'],
      group: 'Majör Arkana'
    },
    'The Magician': {
      upright: 'Yaratım, ifade, güç, odak, gerçekleşme',
      reversed: 'Aldatıcı sözler, manipülasyon, güçsüzlük, odak eksikliği',
      keywords: ['yaratım', 'ifade', 'güç', 'odak', 'gerçekleşme'],
      group: 'Majör Arkana'
    },
    'The High Priestess': {
      upright: 'Sezgi, gizli bilgi, içgörü, bilinçaltı',
      reversed: 'Sezgi eksikliği, gizli bilgi reddi, bilinçaltı reddi',
      keywords: ['sezgi', 'gizli bilgi', 'içgörü', 'bilinçaltı'],
      group: 'Majör Arkana'
    },
    'The Empress': {
      upright: 'Doğurganlık, yaratıcılık, doğa, anne, bolluk',
      reversed: 'Doğurganlık eksikliği, yaratıcılık eksikliği, doğa reddi',
      keywords: ['doğurganlık', 'yaratıcılık', 'doğa', 'anne', 'bolluk'],
      group: 'Majör Arkana'
    },
    'The Emperor': {
      upright: 'Otorite, güç, kontrol, baba, yapı',
      reversed: 'Otorite eksikliği, güçsüzlük, kontrol eksikliği',
      keywords: ['otorite', 'güç', 'kontrol', 'baba', 'yapı'],
      group: 'Majör Arkana'
    }
  };

  private readonly positionContexts: Record<string, Record<number, string>> = {
    'love': {
      1: 'İlgi duyduğun kişi',
      2: 'Senin durumun',
      3: 'İlişkinin durumu',
      4: 'Gelecek',
      5: 'Engeller',
      6: 'Öneriler',
      7: 'Sonuç'
    },
    'career': {
      1: 'Mevcut durum',
      2: 'Engeller',
      3: 'Fırsatlar',
      4: 'Gelecek',
      5: 'Öneriler',
      6: 'Sonuç'
    },
    'money': {
      1: 'Mevcut durum',
      2: 'Engeller',
      3: 'Fırsatlar',
      4: 'Gelecek',
      5: 'Öneriler',
      6: 'Sonuç'
    },
    'relationship-analysis': {
      1: 'İlişkinin geçmişi',
      2: 'Mevcut durum',
      3: 'Gelecek',
      4: 'Engeller',
      5: 'Fırsatlar',
      6: 'Öneriler',
      7: 'Sonuç'
    },
    'problem-solving': {
      1: 'Problem',
      2: 'Neden',
      3: 'Çözüm',
      4: 'Engeller',
      5: 'Fırsatlar',
      6: 'Öneriler',
      7: 'Sonuç'
    },
    'situation-analysis': {
      1: 'Geçmiş',
      2: 'Mevcut durum',
      3: 'Gelecek',
      4: 'Engeller',
      5: 'Fırsatlar',
      6: 'Öneriler',
      7: 'Sonuç'
    },
    'relationship-problems': {
      1: 'Problem',
      2: 'Neden',
      3: 'Çözüm',
      4: 'Engeller',
      5: 'Fırsatlar',
      6: 'Öneriler',
      7: 'Sonuç'
    },
    'marriage': {
      1: 'Mevcut durum',
      2: 'Engeller',
      3: 'Fırsatlar',
      4: 'Gelecek',
      5: 'Öneriler',
      6: 'Sonuç'
    }
  };

  generatePositionMeanings(
    spreadType: string,
    position: number,
    positionName: string
  ): BasePositionMeaning[] {
    const meanings: BasePositionMeaning[] = [];
    const context = this.positionContexts[spreadType]?.[position] || positionName;

    for (const [cardName, cardData] of Object.entries(this.cardMeanings)) {
      const meaning: BasePositionMeaning = {
        id: `${cardName.toLowerCase().replace(/\s+/g, '_')}_${spreadType}_pos${position}`,
        card: cardName,
        position,
        upright: this.generateUprightMeaning(cardName, cardData, context, spreadType),
        reversed: this.generateReversedMeaning(cardName, cardData, context, spreadType),
        keywords: cardData.keywords,
        context: this.generateContext(cardName, context, spreadType),
        group: cardData.group
      };

      meanings.push(meaning);
    }

    return meanings;
  }

  private generateUprightMeaning(
    cardName: string,
    cardData: any,
    context: string,
    spreadType: string
  ): string {
    const baseMeaning = cardData.upright;
    const positionContext = this.getPositionContext(spreadType, context);
    
    return `${positionContext} ${baseMeaning.toLowerCase()}. ${this.getPositionSpecificGuidance(cardName, context, spreadType)}`;
  }

  private generateReversedMeaning(
    cardName: string,
    cardData: any,
    context: string,
    spreadType: string
  ): string {
    const baseMeaning = cardData.reversed;
    const positionContext = this.getPositionContext(spreadType, context);
    
    return `${positionContext} ${baseMeaning.toLowerCase()}. ${this.getPositionSpecificGuidance(cardName, context, spreadType, true)}`;
  }

  private generateContext(cardName: string, context: string, spreadType: string): string {
    return `${context} pozisyonunda ${cardName} kartı ${this.getSpreadTypeDescription(spreadType)}.`;
  }

  private getPositionContext(spreadType: string, context: string): string {
    const contexts: Record<string, Record<string, string>> = {
      'love': {
        'İlgi duyduğun kişi': 'Bu kişi',
        'Senin durumun': 'Sen',
        'İlişkinin durumu': 'İlişkiniz',
        'Gelecek': 'İlişkinizin geleceği',
        'Engeller': 'İlişkinizdeki engeller',
        'Öneriler': 'İlişkiniz için öneriler',
        'Sonuç': 'İlişkinizin sonucu'
      },
      'career': {
        'Mevcut durum': 'Kariyerinizde',
        'Engeller': 'Kariyerinizdeki engeller',
        'Fırsatlar': 'Kariyerinizdeki fırsatlar',
        'Gelecek': 'Kariyerinizin geleceği',
        'Öneriler': 'Kariyeriniz için öneriler',
        'Sonuç': 'Kariyerinizin sonucu'
      }
    };

    return contexts[spreadType]?.[context] || context;
  }

  private getPositionSpecificGuidance(
    cardName: string,
    context: string,
    spreadType: string,
    isReversed: boolean = false
  ): string {
    const guidance: Record<string, Record<string, string>> = {
      'The Fool': {
        'love': 'Aşk hayatında yeni bir sayfa açmaya hazır veya bundan korkan bir maceracı.',
        'career': 'Kariyerinde yeni bir başlangıç yapmaya hazır veya bundan korkan bir girişimci.',
        'money': 'Mali durumunda yeni bir başlangıç yapmaya hazır veya bundan korkan bir yatırımcı.'
      }
    };

    return guidance[cardName]?.[spreadType] || 'Bu pozisyonda önemli bir rol oynuyor.';
  }

  private getSpreadTypeDescription(spreadType: string): string {
    const descriptions: Record<string, string> = {
      'love': 'aşk açılımında',
      'career': 'kariyer açılımında',
      'money': 'para açılımında',
      'relationship-analysis': 'ilişki analizi açılımında',
      'problem-solving': 'problem çözme açılımında',
      'situation-analysis': 'durum analizi açılımında',
      'relationship-problems': 'ilişki problemleri açılımında',
      'marriage': 'evlilik açılımında'
    };

    return descriptions[spreadType] || 'açılımda';
  }
}

// Factory function
export function createPositionMeanings(
  spreadType: string,
  position: number,
  positionName: string
): BasePositionMeaning[] {
  const generator = new TarotPositionMeaningGenerator();
  return generator.generatePositionMeanings(spreadType, position, positionName);
}

// Export for specific spreads
export function getLovePositionMeanings(position: number, positionName: string) {
  return createPositionMeanings('love', position, positionName);
}

export function getCareerPositionMeanings(position: number, positionName: string) {
  return createPositionMeanings('career', position, positionName);
}

export function getMoneyPositionMeanings(position: number, positionName: string) {
  return createPositionMeanings('money', position, positionName);
}

export function getRelationshipAnalysisPositionMeanings(position: number, positionName: string) {
  return createPositionMeanings('relationship-analysis', position, positionName);
}

export function getProblemSolvingPositionMeanings(position: number, positionName: string) {
  return createPositionMeanings('problem-solving', position, positionName);
}

export function getSituationAnalysisPositionMeanings(position: number, positionName: string) {
  return createPositionMeanings('situation-analysis', position, positionName);
}

export function getRelationshipProblemsPositionMeanings(position: number, positionName: string) {
  return createPositionMeanings('relationship-problems', position, positionName);
}

export function getMarriagePositionMeanings(position: number, positionName: string) {
  return createPositionMeanings('marriage', position, positionName);
}
