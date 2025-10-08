import { NextRequest, NextResponse } from 'next/server';
import { CardData } from '@/features/tarot-cards/lib/card-data';
import { logger } from '@/lib/logger';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ locale: string; slug: string }> }
) {
  try {
    const { locale, slug } = await params;

    // Validate locale
    if (!['tr', 'en', 'sr'].includes(locale)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_LOCALE',
            message: 'Invalid locale. Must be tr, en, or sr.',
          },
        },
        { status: 400 }
      );
    }

    // Validate slug
    if (!slug || slug.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_SLUG',
            message: 'Invalid slug. Slug cannot be empty.',
          },
        },
        { status: 400 }
      );
    }

    // Get card data
    const cardData = await CardData.getCardBySlug(
      slug,
      locale as 'tr' | 'en' | 'sr'
    );

    if (!cardData) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CARD_NOT_FOUND',
            message: 'Card not found.',
          },
        },
        { status: 404 }
      );
    }

    // Validate card data
    if (!CardData.validateCardData(cardData)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CARD_DATA',
            message: 'Invalid card data.',
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: cardData,
      },
      { status: 200 }
    );
  } catch (error) {
    const { locale, slug } = await params;
    logger.error('API error in cards endpoint', error, {
      action: 'GET /api/cards/[locale]/[slug]',
      resource: `${locale}/${slug}`,
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An internal server error occurred.',
        },
      },
      { status: 500 }
    );
  }
}
