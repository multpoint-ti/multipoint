'use client';

import PageContainer from '@/shared/page-container';
import { Footer } from '@/shared/footer';
import { Menu } from '@/shared/menu';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/shared/types/product-types';
import { ProductsBanner } from './products-banner';
import { ProductsFilters } from './products-filters';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';
import Pagination from '@/shared/pagination';

interface ApiResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export default function ProductsListPageComponent() {
  const searchParams = useSearchParams();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Estados para filtros - inicializados com valores da URL
  const [search, setSearch] = useState('');
  const [productLine, setProductLine] = useState('');
  const [automaker, setAutomaker] = useState('');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const limit = 12;

  // Inicializar filtros com parâmetros da URL
  useEffect(() => {
    const urlProductLine = searchParams.get('productLine') || '';
    const urlAutomaker = searchParams.get('automaker') || '';
    const urlSearch = searchParams.get('search') || '';
    const urlYear = searchParams.get('year') || '';

    setProductLine(urlProductLine);
    setAutomaker(urlAutomaker);
    setSearch(urlSearch);
    setYear(urlYear);
    setInitialized(true);
  }, [searchParams]);

  // Resetar página quando filtros mudarem
  useEffect(() => {
    setPage(1);
  }, [search, productLine, automaker, year]);

  useEffect(() => {
    if (!initialized) return;

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
  }, [page, search, productLine, automaker, year, sortBy, initialized]);

  // Produtos já vêm filtrados e ordenados da API
  const products = data?.products || [];

  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <ProductsBanner />

      <PageContainer>
        <div className='py-4'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-18'>
            {/* Coluna de Filtros */}
            <div className='lg:col-span-1'>
              <ProductsFilters
                onSearchChange={setSearch}
                onProductLineChange={setProductLine}
                onAutomakerChange={setAutomaker}
                onModelChange={() => { }}
                onYearChange={setYear}
                searchValue={search}
                productLineValue={productLine}
                automakerValue={automaker}
                yearValue={year}
              />
            </div>

            {/* Coluna de Produtos */}
            <div className='lg:col-span-3 items-center'>
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
                  <p className='text-red-amber-torque'>Erro ao carregar produtos: {error}</p>
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
              <Pagination
                currentPage={page}
                totalPages={data?.totalPages || 0}
                onPageChange={setPage}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
