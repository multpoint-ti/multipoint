'use client';

import PageContainer from '@/shared/page-container';
import { Footer } from '@/shared/footer';
import { Menu } from '@/shared/menu';
import { useEffect, useState } from 'react';
import { NewsListItem, NewsType } from '@/shared/types/blog-types';
import { BlogBanner } from './blog-banner';
import { BlogCard } from './blog-card';
import { BlogCardSkeleton } from './blog-card-skeleton';

interface ApiResponse {
  news: NewsListItem[];
  count: number;
  totalPages: number;
  currentPage: number;
}

export default function BlogListPageComponent() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [type, setType] = useState<NewsType | ''>('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    setPage(1);
  }, [search, type]);

  useEffect(() => {
    const fetchNews = () => {
      setLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append('search', search);
      if (type) params.append('type', type);
      if (sortBy) params.append('sortBy', sortBy);

      fetch(`/api/blog?${params.toString()}`)
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

    fetchNews();
  }, [page, search, type, sortBy]);

  const news = data?.news || [];

  return (
    <div className='flex flex-col items-center w-full'>
      <Menu />
      <BlogBanner />

      <PageContainer>
        <div className='py-8'>
          {/* Barra de controles */}
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 w-full max-w-7xl'>
            {/* Busca */}
            <div className='w-full sm:w-auto'>
              <input
                type='text'
                placeholder='Buscar notícias...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400'
              />
            </div>

            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
              {/* Filtro por tipo */}
              <div className='flex items-center gap-2'>
                <label htmlFor='type' className='text-normal whitespace-nowrap'>
                  Tipo:
                </label>
                <select
                  id='type'
                  className='py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent bg-white'
                  value={type}
                  onChange={(e) => setType(e.target.value as NewsType | '')}
                >
                  <option value=''>Todos</option>
                  <option value='NOTICIA'>Notícias</option>
                  <option value='EVENTO'>Eventos</option>
                </select>
              </div>

              {/* Contagem */}
              <div className=''>
                <span className='font-semibold'>{data?.count || 0}</span> {(data?.count || 0) === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              </div>

              {/* Ordenação */}
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
                  <option value=''>Mais recentes</option>
                  <option value='oldest'>Mais antigos</option>
                  <option value='title_asc'>Título (A-Z)</option>
                  <option value='title_desc'>Título (Z-A)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid de Posts */}
          {loading && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full'>
              {Array.from({ length: limit }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          )}

          {error && (
            <div className='text-center py-12'>
              <p className='text-red-600'>Erro ao carregar notícias: {error}</p>
            </div>
          )}

          {!loading && !error && news.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-500'>Nenhuma notícia encontrada.</p>
            </div>
          )}

          {!loading && !error && news.length > 0 && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {news.map(item => (
                <BlogCard key={item.id} news={item} />
              ))}
            </div>
          )}

          {/* Paginação */}
          {data && data.totalPages > 1 && (
            <div className='flex justify-center gap-2 mt-8'>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                className='px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
              >
                Anterior
              </button>
              <span className='px-4 py-2'>
                Página {page} de {data.totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages || loading}
                className='px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
