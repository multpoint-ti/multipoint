import { newsRepository } from '../repositories/news-repository';
import { News, NewsListItem, NewsType } from '@/shared/types/blog-types';

interface NewsFilters {
  search?: string;
  type?: NewsType;
  sortBy?: string;
}

export const newsService = {
  async getNewsBySlug(slug: string): Promise<News | null> {
    const news = await newsRepository.getAll();
    const item = news.find(n => n.slug === slug);
    return item || null;
  },

  async getNews(page: number, limit: number, filters?: NewsFilters) {
    let news = await newsRepository.getAll();

    // Aplicar filtros
    if (filters) {
      // Filtro de busca
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        news = news.filter(item =>
          item.title.toLowerCase().includes(searchLower) ||
          item.text.toLowerCase().includes(searchLower)
        );
      }

      // Filtro por tipo
      if (filters.type) {
        news = news.filter(item => item.type === filters.type);
      }

      // Ordenação
      if (filters.sortBy) {
        news = [...news].sort((a, b) => {
          switch (filters.sortBy) {
            case 'title_asc':
              return a.title.localeCompare(b.title);
            case 'title_desc':
              return b.title.localeCompare(a.title);
            case 'oldest':
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case 'newest':
            default:
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
        });
      } else {
        // Ordenação padrão: mais recentes primeiro
        news = [...news].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    } else {
      // Ordenação padrão: mais recentes primeiro
      news = [...news].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedNews = news.slice(startIndex, endIndex);

    // Remover campos desnecessários para listagem
    const newsListItems: NewsListItem[] = paginatedNews.map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      text: item.text,
      type: item.type,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      imagePath: item.imagePath,
    }));

    return {
      count: news.length,
      totalPages: Math.ceil(news.length / limit),
      currentPage: page,
      news: newsListItems,
    };
  },
};
