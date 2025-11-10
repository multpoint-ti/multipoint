import { productController } from '@/api/products/controllers/product-controller';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return Response.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  return productController.getProductById(id);
}
