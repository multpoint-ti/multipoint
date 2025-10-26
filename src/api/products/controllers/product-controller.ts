import { productService } from '../services/product-service';
import { NextResponse } from 'next/server';

export const productController = {
  async getProducts(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    try {
      const result = await productService.getProducts(page, limit);
      return NextResponse.json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error(error);
      return NextResponse.json({ error: 'Failed to load products', details: errorMessage }, { status: 500 });
    }
  },
};