import { NextRequest, NextResponse } from 'next/server';
import { CardData } from '@/features/tarot-cards/lib/card-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const { locale } = await params;
    const { searchParams } = new URL(request.url);

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

    // Parse query parameters
    const arcanaType = searchParams.get('arcanaType') as
      | 'major'
      | 'minor'
      | undefined;
    const suit = searchParams.get('suit') as
      | 'cups'
      | 'swords'
      | 'wands'
      | 'pentacles'
      | undefined;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Validate parameters
    if (arcanaType && !['major', 'minor'].includes(arcanaType)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_ARCANA_TYPE',
            message: 'Invalid arcanaType. Must be major or minor.',
          },
        },
        { status: 400 }
      );
    }

    if (suit && !['cups', 'swords', 'wands', 'pentacles'].includes(suit)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_SUIT',
            message: 'Invalid suit. Must be cups, swords, wands, or pentacles.',
          },
        },
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_LIMIT',
            message: 'Invalid limit. Must be between 1 and 100.',
          },
        },
        { status: 400 }
      );
    }

    if (offset < 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_OFFSET',
            message: 'Invalid offset. Must be 0 or greater.',
          },
        },
        { status: 400 }
      );
    }

    // Get cards data
    const result = await CardData.getCardsByLocale(
      locale as 'tr' | 'en' | 'sr',
      {
        ...(arcanaType && { arcanaType }),
        ...(suit && { suit }),
        limit,
        offset,
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: result.cards,
        pagination: {
          total: result.total,
          limit,
          offset,
          hasMore: offset + limit < result.total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/cards/[locale]:', error);

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
