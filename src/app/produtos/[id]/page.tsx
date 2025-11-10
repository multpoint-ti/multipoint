import ProductDetailComponent from '@/products/product-detail';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-red-600'>ID de produto inválido</p>
      </div>
    );
  }

  return <ProductDetailComponent productId={productId} />;
}
