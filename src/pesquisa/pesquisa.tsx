'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Menu } from '@/shared/menu';
import { Footer } from '@/shared/footer';
import PageContainer from '@/shared/page-container';
import Pagination from '@/shared/pagination';
import { SearchResultItem } from './search-result-item';

interface SearchResult {
  type: 'product' | 'news' | 'event';
  id: string;
  slug: string;
  title: string;
  imagePath: string | null;
}

interface PaginatedSearchResponse {
  results: SearchResult[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export default function PesquisaPageComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [data, setData] = useState<PaginatedSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&paginated=true&page=${page}&limit=${limit}`
        );
        const result: PaginatedSearchResponse = await response.json();
        setData(result);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page]);

  return (
    <div className="flex flex-col items-center w-full">
      <Menu />
      <PageContainer>
        <div className="max-w-7xl w-full space-y-8">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Resultados da pesquisa:
          </h3>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-gray-600">
              Pesquisando por: <strong className="text-blue-ignition">{query}</strong>
            </p>
            {data && (
              <p className="text-gray-500 text-sm">
                Total de <strong>{data.total}</strong> resultado{data.total !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="flex gap-4 py-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
                    <div className="flex-grow space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-24" />
                      <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                  </div>
                  <div className="border-b border-gray-200" />
                </div>
              ))}
            </div>
          )}

          {/* No query */}
          {!loading && (!query || query.length < 2) && (
            <div className="text-center py-12">
              <p className="text-gray-500">Digite ao menos 2 caracteres para pesquisar.</p>
            </div>
          )}

          {/* No results */}
          {!loading && query && query.length >= 2 && data && data.results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum resultado encontrado para &quot;{query}&quot;.</p>
            </div>
          )}

          {/* Results */}
          {!loading && data && data.results.length > 0 && (
            <div className="divide-y divide-gray-200">
              {data.results.map((result) => (
                <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
              disabled={loading}
            />
          )}
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
