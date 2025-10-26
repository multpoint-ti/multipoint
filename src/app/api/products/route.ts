import { productController } from '@/api/products/controllers/product-controller';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return productController.getProducts(request);
}
