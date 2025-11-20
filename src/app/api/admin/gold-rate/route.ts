import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getGoldRate, upsertGoldRate } from '@/lib/settings';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 },
      );
    }

    const rate = await getGoldRate();

    if (!rate) {
      return NextResponse.json(
        {
          rate22k: null,
          rate18k: null,
          silverRate: null,
          updatedAt: null,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        rate22k: rate.rate_22k,
        rate18k: rate.rate_18k,
        silverRate: rate.silver_rate,
        updatedAt: rate.updated_at.toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Get gold rate error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gold rate' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 },
      );
    }

    const body = await request.json();
    const raw22 = body.rate22k;
    const raw18 = body.rate18k;
    const rawSilver = body.silverRate;

    const rate22k =
      raw22 === null || raw22 === undefined || raw22 === ''
        ? null
        : Number(raw22);
    const rate18k =
      raw18 === null || raw18 === undefined || raw18 === ''
        ? null
        : Number(raw18);
    const silverRate =
      rawSilver === null || rawSilver === undefined || rawSilver === ''
        ? null
        : Number(rawSilver);

    const isValid22 =
      rate22k === null || (Number.isFinite(rate22k) && rate22k > 0);
    const isValid18 =
      rate18k === null || (Number.isFinite(rate18k) && rate18k > 0);
    const isValidSilver =
      silverRate === null || (Number.isFinite(silverRate) && silverRate > 0);

    if (!isValid22 || !isValid18 || !isValidSilver) {
      return NextResponse.json(
        { error: 'Rates must be positive numbers when provided.' },
        { status: 400 },
      );
    }

    if (rate22k === null && rate18k === null && silverRate === null) {
      return NextResponse.json(
        { error: 'Provide at least one rate (22K, 18K, or Silver).' },
        { status: 400 },
      );
    }

    await upsertGoldRate(rate22k, rate18k, silverRate);

    return NextResponse.json(
      { message: 'Gold rate updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Update gold rate error:', error);
    return NextResponse.json(
      { error: 'Failed to update gold rate' },
      { status: 500 },
    );
  }
}
