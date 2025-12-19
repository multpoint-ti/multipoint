"use client";

import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface SearchResult {
  type: 'product' | 'news' | 'event';
  id: string;
  slug: string;
  title: string;
  imagePath: string | null;
}

interface SearchResponse {
  products: SearchResult[];
  news: SearchResult[];
  events: SearchResult[];
  total: number;
}

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounce search
  useEffect(() => {
    if (query.length < 2) {
      setResults(null);
      setIsOpen(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=3`);
        const data: SearchResponse = await response.json();
        setResults(data);
        setIsOpen(data.total > 0);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.length >= 2) {
      setIsOpen(false);
      router.push(`/pesquisa?q=${encodeURIComponent(query)}`);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults(null);
    setIsOpen(false);
  };

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case 'product':
        return `/produtos/${result.slug}`;
      case 'news':
        return `/blog/${result.slug}`;
      case 'event':
        return `/eventos/${result.slug}`;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'product':
        return 'Produtos';
      case 'news':
        return 'Notícias';
      case 'event':
        return 'Eventos';
      default:
        return '';
    }
  };

  const renderResultItem = (result: SearchResult) => (
    <Link
      key={`${result.type}-${result.id}`}
      href={getResultLink(result)}
      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors"
      onClick={() => setIsOpen(false)}
    >
      <div className="w-10 h-10 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
        {result.imagePath ? (
          <Image
            src={result.imagePath}
            alt={result.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Search className="w-4 h-4" />
          </div>
        )}
      </div>
      <span className="text-sm text-blue-ignition line-clamp-1 flex-grow">{result.title}</span>
    </Link>
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex w-full items-center gap-2 rounded-full border border-gray-oxide-steel px-4 py-2 bg-white">
        <input
          type="text"
          placeholder="Digite para pesquisar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results && results.total > 0 && setIsOpen(true)}
          className="w-full bg-transparent focus:outline-none text-sm md:text-base"
        />
        {query ? (
          <button onClick={clearSearch} className="p-1">
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        ) : null}
        {isLoading ? (
          <div className="h-5 w-5 border-2 border-red-amber-torque border-t-transparent rounded-full animate-spin" />
        ) : (
          <Search className="h-5 w-5 text-red-amber-torque" />
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && results && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
          {results.products.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-500 uppercase">{getTypeLabel('product')}</span>
              </div>
              {results.products.map(renderResultItem)}
            </div>
          )}

          {results.news.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-500 uppercase">{getTypeLabel('news')}</span>
              </div>
              {results.news.map(renderResultItem)}
            </div>
          )}

          {results.events.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-500 uppercase">{getTypeLabel('event')}</span>
              </div>
              {results.events.map(renderResultItem)}
            </div>
          )}

          {/* Ver todos os resultados */}
          <Link
            href={`/pesquisa?q=${encodeURIComponent(query)}`}
            className="block px-4 py-3 text-center text-sm text-blue-gravel-mist hover:bg-gray-50 border-t border-gray-200 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Ver todos os resultados
          </Link>
        </div>
      )}
    </div>
  );
}
