import { NextResponse } from 'next/server';
import { getGoldRate } from '@/lib/settings';

export async function GET() {
  try {
    const rate = await getGoldRate();

    if (
      !rate ||
      ((rate.rate_24k === null || rate.rate_24k === undefined) &&
        (rate.rate_22k === null || rate.rate_22k === undefined) &&
        (rate.rate_20k === null || rate.rate_20k === undefined) &&
        (rate.rate_18k === null || rate.rate_18k === undefined) &&
        (rate.silver_rate === null || rate.silver_rate === undefined))
    ) {
      return NextResponse.json(
        {
          rate24k: null,
          rate22k: null,
          rate20k: null,
          rate18k: null,
          silverRate: null,
          currency: 'INR',
          isDemo: true,
          message: 'Gold rate not yet set in admin panel.',
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        rate24k:
          rate.rate_24k !== null && rate.rate_24k !== undefined
            ? rate.rate_24k
            : null,
        rate22k:
          rate.rate_22k !== null && rate.rate_22k !== undefined
            ? rate.rate_22k
            : null,
        rate20k:
          rate.rate_20k !== null && rate.rate_20k !== undefined
            ? rate.rate_20k
            : null,
        rate18k:
          rate.rate_18k !== null && rate.rate_18k !== undefined
            ? rate.rate_18k
            : null,
        silverRate:
          rate.silver_rate !== null && rate.silver_rate !== undefined
            ? rate.silver_rate
            : null,
        currency: 'INR',
        isDemo: false,
        updatedAt: rate.updated_at.toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Gold price read error:', error);
    return NextResponse.json(
      {
        rate24k: null,
        rate22k: null,
        rate20k: null,
        rate18k: null,
        silverRate: null,
        currency: 'INR',
        isDemo: true,
        message: 'Unable to load gold rate from database.',
      },
      { status: 200 },
    );
  }
}
