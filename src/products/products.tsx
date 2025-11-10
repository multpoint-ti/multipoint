'use client';

import PageContainer from '@/shared/page-container';
import { Footer } from '@/shared/footer';
import { Menu } from '@/shared/menu';
import { useEffect, useState } from 'react';
import { Product } from '@/shared/types/product-types';
import { ProductsBanner } from './products-banner';
import { ProductsFilters } from './products-filters';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';

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

  // Estados para filtros
  const [search, setSearch] = useState('');
  const [productLine, setProductLine] = useState('');
  const [automaker, setAutomaker] = useState('');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const limit = 12;

  // Resetar página quando filtros mudarem
  useEffect(() => {
    setPage(1);
  }, [search, productLine, automaker, year]);

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);

      // Construir query string com filtros
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append('search', search);
      if (productLine) params.append('productLine', productLine);
      if (automaker) params.append('automaker', automaker);
      if (year) params.append('year', year);
      if (sortBy) params.append('sortBy', sortBy);

      fetch(`/api/products?${params.toString()}`)
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
  }, [page, search, productLine, automaker, year, sortBy]);

  // Produtos já vêm filtrados e ordenados da API
  const products = data?.products || [];

  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <ProductsBanner />

      <PageContainer>
        <div className='py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-18'>
            {/* Coluna de Filtros */}
            <div className='lg:col-span-1'>
              <ProductsFilters
                onSearchChange={setSearch}
                onProductLineChange={setProductLine}
                onAutomakerChange={setAutomaker}
                onModelChange={() => { }}
                onYearChange={setYear}
              />
            </div>

            {/* Coluna de Produtos */}
            <div className='lg:col-span-3'>
              {/* Barra de controles */}
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
                <div className=''>
                  <span className='font-semibold'>{data?.total || 0}</span> {(data?.total || 0) === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </div>

                <div className='flex items-center gap-2'>
                  <label htmlFor='sort' className='text-normal whitespace-nowrap'>
                    Ordenar por:
                  </label>
                  <select
                    id='sort'
                    className='py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent bg-white'
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value=''>Padrão</option>
                    <option value='code_asc'>Código (A-Z)</option>
                    <option value='code_desc'>Código (Z-A)</option>
                    <option value='newest'>Mais recentes</option>
                    <option value='oldest'>Mais antigos</option>
                  </select>
                </div>
              </div>

              {/* Grid de Produtos */}
              {loading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                  {Array.from({ length: limit }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              )}

              {error && (
                <div className='text-center py-12'>
                  <p className='text-red-600'>Erro ao carregar produtos: {error}</p>
                </div>
              )}

              {!loading && !error && products.length === 0 && (
                <div className='text-center py-12'>
                  <p className='text-gray-500'>Nenhum produto encontrado.</p>
                </div>
              )}

              {!loading && !error && products.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Paginação */}
              {data && data.totalPages > 1 && (
                <div className='flex justify-center gap-2 mt-8'>
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className='px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
                  >
                    Anterior
                  </button>
                  <span className='px-4 py-2'>
                    Página {page} de {data.totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                    disabled={page === data.totalPages}
                    className='px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
                  >
                    Próxima
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
