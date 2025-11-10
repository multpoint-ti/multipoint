import ProductDetailComponent from '@/products/product-detail';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-red-600'>ID de produto inválido</p>
      </div>
    );
  }

  return <ProductDetailComponent productId={productId} />;
}
