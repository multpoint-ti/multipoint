import { MetadataRoute } from 'next';
import { productRepository } from '@/api/products/repositories/product-repository';
import { newsRepository } from '@/api/news/repositories/news-repository';
import { eventRepository } from '@/api/events/repositories/event-repository';
import { siteConfig } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/produtos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre-nos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/representantes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Páginas de produtos
  const products = await productRepository.getAll();
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/produtos/${product.id}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Páginas de notícias/blog
  const news = await newsRepository.getAll();
  const newsPages: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Páginas de eventos
  const events = await eventRepository.getAll();
  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${baseUrl}/eventos/${event.slug}`,
    lastModified: new Date(event.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...newsPages, ...eventPages];
}
