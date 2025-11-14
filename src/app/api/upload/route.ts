import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import fs from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof (file as any).arrayBuffer !== 'function') {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const fileObj = file as unknown as { name?: string; arrayBuffer: () => Promise<ArrayBuffer> };
    const originalName = fileObj.name || 'upload';
    const ext = path.extname(originalName) || '.jpg';
    const safeExt = ext.length <= 10 ? ext : '.jpg';

    const buffer = Buffer.from(await fileObj.arrayBuffer());

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'products');
    await fs.mkdir(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${safeExt}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.writeFile(filePath, buffer);

    const url = `/uploads/products/${fileName}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

