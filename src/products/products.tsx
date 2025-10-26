'use client';

import PageContainer from '@/shared/page-container';
import { Footer } from '@/shared/footer';
import { Menu } from '@/shared/menu';
import { useEffect, useState } from 'react';
import { Product } from '@/shared/types/product-types';
import Image from 'next/image';

interface ApiResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export default function ProductsListPageComponent() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = () => {
      fetch('/api/products?page=1&limit=10')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchProducts();
  }, []);

  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <PageContainer>
        <div>
          <h1 className='text-2xl font-bold mb-4'>LISTA DE PRODUTOS</h1>
          {loading && <p>Carregando produtos...</p>}
          {error && <p>Erro ao carregar produtos: {error}</p>}
          {data && (
            <ul>
              {data.products.map(product => (
                <li key={product.id} className='mb-2 border-b pb-2'>
                  <Image src={product.images[0].path} alt={product.multpointCode} width={100} height={100} />
                  <p className='font-semibold'>{product.multpointCode}</p>
                  <p>{product.shortCode}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
