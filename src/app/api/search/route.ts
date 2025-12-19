import { NextRequest, NextResponse } from 'next/server';
import { productRepository } from '@/api/products/repositories/product-repository';
import { newsRepository } from '@/api/news/repositories/news-repository';
import eventsData from '@/data/events.json';
import { Event } from '@/shared/types/event-types';

export interface SearchResult {
  type: 'product' | 'news' | 'event';
  id: string;
  slug: string;
  title: string;
  imagePath: string | null;
}

export interface SearchResponse {
  products: SearchResult[];
  news: SearchResult[];
  events: SearchResult[];
  total: number;
}

export interface PaginatedSearchResponse {
  results: SearchResult[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const limit = parseInt(searchParams.get('limit') || '5');
  const page = parseInt(searchParams.get('page') || '0');
  const paginated = searchParams.get('paginated') === 'true';

  if (!query || query.length < 2) {
    if (paginated) {
      return NextResponse.json({
        results: [],
        total: 0,
        totalPages: 0,
        currentPage: 1,
      } as PaginatedSearchResponse);
    }
    return NextResponse.json({
      products: [],
      news: [],
      events: [],
      total: 0,
    } as SearchResponse);
  }

  // Search products
  const allProducts = await productRepository.getAll();
  const matchedProducts = allProducts
    .filter(product =>
      product.multpointCode.toLowerCase().includes(query) ||
      product.shortCode.toLowerCase().includes(query) ||
      product.automakerCode.some(code => code.toLowerCase().includes(query)) ||
      product.automakers.some(a => a.name.toLowerCase().includes(query))
    )
    .map(product => ({
      type: 'product' as const,
      id: product.id.toString(),
      slug: product.id.toString(),
      title: product.multpointCode,
      imagePath: product.images?.[0]?.path || null,
    }));

  // Search news
  const allNews = await newsRepository.getAll();
  const matchedNews = allNews
    .filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.slug.toLowerCase().includes(query)
    )
    .map(item => ({
      type: 'news' as const,
      id: item.id,
      slug: item.slug,
      title: item.title,
      imagePath: item.imagePath,
    }));

  // Search events
  const events = eventsData as Event[];
  const matchedEvents = events
    .filter(event =>
      event.name.toLowerCase().includes(query) ||
      event.slug.toLowerCase().includes(query)
    )
    .map(event => ({
      type: 'event' as const,
      id: event.id,
      slug: event.slug,
      title: event.name,
      imagePath: event.imagePath,
    }));

  // Paginated response for search results page
  if (paginated) {
    const allResults = [...matchedProducts, ...matchedNews, ...matchedEvents];
    const total = allResults.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedResults = allResults.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      results: paginatedResults,
      total,
      totalPages,
      currentPage: page,
    } as PaginatedSearchResponse);
  }

  // Preview response for dropdown (limited results per category)
  const response: SearchResponse = {
    products: matchedProducts.slice(0, limit),
    news: matchedNews.slice(0, limit),
    events: matchedEvents.slice(0, limit),
    total: matchedProducts.length + matchedNews.length + matchedEvents.length,
  };

  return NextResponse.json(response);
}
