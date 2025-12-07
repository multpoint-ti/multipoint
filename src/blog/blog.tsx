'use client';

import PageContainer from '@/shared/page-container';
import { Footer } from '@/shared/footer';
import { Menu } from '@/shared/menu';
import { useEffect, useState } from 'react';
import { NewsListItem, NewsType } from '@/shared/types/blog-types';
import { BlogCard } from './blog-card';
import { BlogCardFeatured } from './blog-card-featured';
import { BlogCardSkeleton } from './blog-card-skeleton';
import Image from 'next/image';
import Arrow from '../../public/imgs/arrow.svg';

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
      <PageContainer>
        <div className='max-w-7xl space-y-8 w-full'>
          <div className='flex flex-col items-start gap-3'>
            <Image
              src={Arrow}
              alt="Arrow"
              className='hidden md:block'
            />
            <h1 className="text-4xl md:text-6xl font-semibold text-start md:text-start max-w-3xl leading-tight">
              Notícias
            </h1>
          </div>

          {/* Grid de Posts */}
          {loading && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
              {Array.from({ length: limit }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          )}

          {error && (
            <div className='text-center py-12'>
              <p className='text-red-amber-torque'>Erro ao carregar notícias: {error}</p>
            </div>
          )}

          {!loading && !error && news.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-500'>Nenhuma notícia encontrada.</p>
            </div>
          )}

          {!loading && !error && news.length > 0 && (
            <div>
              {/* Layout de destaque apenas na primeira página */}
              {page === 1 && news.length >= 1 && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  {/* Coluna esquerda - Card grande */}
                  <BlogCardFeatured news={news[0]} size="large" />

                  {/* Coluna direita - Dois cards pequenos (escondidos no mobile) */}
                  {news.length >= 3 && (
                    <div className='hidden lg:flex flex-col gap-6'>
                      <BlogCardFeatured news={news[1]} size="small" />
                      <BlogCardFeatured news={news[2]} size="small" />
                    </div>
                  )}
                </div>
              )}

              {/* Cards normais */}
              {page === 1 && news.length > 1 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16'>
                  {/* No mobile: mostra a partir do índice 1, no desktop: a partir do índice 3 */}
                  {news.slice(1).map((item, index) => (
                    <div
                      key={item.id}
                      className={index < 2 ? 'lg:hidden' : ''}
                    >
                      <BlogCard news={item} />
                    </div>
                  ))}
                </div>
              )}

              {/* Páginas subsequentes - layout normal */}
              {page > 1 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {news.map(item => (
                    <BlogCard key={item.id} news={item} />
                  ))}
                </div>
              )}
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
