import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Kart verilerini yükle
    const { default: cardsData } = await import(
      '@/data/cards/all-cards-seo.json'
    );

    // Type assertion for safer handling
    const data = cardsData as any;
    
    // Eğer cardsData bir array ise direkt kullan, değilse cards property'sini kullan
    const cards = Array.isArray(data) ? data : data.cards || data;
    const metadata = data.metadata || {};

    return NextResponse.json({
      success: true,
      cards,
      metadata,
    });
  } catch (error) {
    console.error('Error loading tarot cards:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load tarot cards',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
