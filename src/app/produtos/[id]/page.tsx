import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailComponent from '@/products/product-detail';
import { productRepository } from '@/api/products/repositories/product-repository';
import { generateProductMetadata, generateProductJsonLd } from '@/lib/seo';
import { JsonLd } from '@/shared/json-ld';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: number) {
  const products = await productRepository.getAll();
  return products.find(p => p.id === id) || null;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return { title: 'Produto não encontrado' };
  }

  const product = await getProduct(productId);

  if (!product) {
    return { title: 'Produto não encontrado' };
  }

  return generateProductMetadata(product);
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-red-amber-torque'>ID de produto inválido</p>
      </div>
    );
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <JsonLd data={generateProductJsonLd(product)} />
      <ProductDetailComponent productId={productId} />
    </>
  );
}
