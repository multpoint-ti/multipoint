import { productService } from '../services/product-service';
import { NextResponse } from 'next/server';

export const productController = {
  async getProductById(id: number) {
    try {
      const product = await productService.getProductById(id);

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      return NextResponse.json(product);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error(error);
      return NextResponse.json({ error: 'Failed to load product', details: errorMessage }, { status: 500 });
    }
  },

  async getProducts(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Extrair filtros
    const filters = {
      search: searchParams.get('search') || undefined,
      productLine: searchParams.get('productLine') || undefined,
      automaker: searchParams.get('automaker') || undefined,
      year: searchParams.get('year') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
    };

    try {
      const result = await productService.getProducts(page, limit, filters);
      return NextResponse.json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error(error);
      return NextResponse.json({ error: 'Failed to load products', details: errorMessage }, { status: 500 });
    }
  },
};