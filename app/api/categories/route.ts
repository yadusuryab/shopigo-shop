// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/lib/db/models/product.model';

export const dynamic = 'force-dynamic'; // Prevent static optimization

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Product.find({ isPublished: true }).distinct('category');
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}