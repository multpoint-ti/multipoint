import { productController } from '@/api/products/controllers/product-controller';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: paramId } = await params;
  const id = parseInt(paramId, 10);

  if (isNaN(id)) {
    return Response.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  return productController.getProductById(id);
}
