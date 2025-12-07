import { newsService } from '../services/news-service';
import { NextResponse } from 'next/server';
import { NewsType } from '@/shared/types/blog-types';

export const newsController = {
  async getNewsBySlug(slug: string) {
    try {
      const news = await newsService.getNewsBySlug(slug);

      if (!news) {
        return NextResponse.json({ error: 'News not found' }, { status: 404 });
      }

      return NextResponse.json(news);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error(error);
      return NextResponse.json({ error: 'Failed to load news', details: errorMessage }, { status: 500 });
    }
  },

  async getNews(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Extrair filtros
    const typeParam = searchParams.get('type');
    const filters = {
      search: searchParams.get('search') || undefined,
      type: (typeParam === 'EVENTO' || typeParam === 'NOTICIA' ? typeParam : undefined) as NewsType | undefined,
      sortBy: searchParams.get('sortBy') || undefined,
    };

    try {
      const result = await newsService.getNews(page, limit, filters);
      return NextResponse.json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error(error);
      return NextResponse.json({ error: 'Failed to load news', details: errorMessage }, { status: 500 });
    }
  },
};
