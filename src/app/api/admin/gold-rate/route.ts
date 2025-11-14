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
          rate20k: null,
          rate22k: null,
          updatedAt: null,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        rate20k: rate.rate_20k,
        rate22k: rate.rate_22k,
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
    const raw20 = body.rate20k;
    const raw22 = body.rate22k;

    const rate20k =
      raw20 === null || raw20 === undefined || raw20 === ''
        ? null
        : Number(raw20);
    const rate22k =
      raw22 === null || raw22 === undefined || raw22 === ''
        ? null
        : Number(raw22);

    const isValid20 =
      rate20k === null || (Number.isFinite(rate20k) && rate20k > 0);
    const isValid22 =
      rate22k === null || (Number.isFinite(rate22k) && rate22k > 0);

    if (!isValid20 || !isValid22) {
      return NextResponse.json(
        { error: 'Gold rates must be positive numbers when provided.' },
        { status: 400 },
      );
    }

    if (rate20k === null && rate22k === null) {
      return NextResponse.json(
        { error: 'Provide at least one gold rate (20K or 22K).' },
        { status: 400 },
      );
    }

    await upsertGoldRate(rate20k, rate22k);

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
