import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsDetailComponent from '@/blog/news-detail';
import { newsRepository } from '@/api/news/repositories/news-repository';
import { generateNewsMetadata, generateNewsJsonLd } from '@/lib/seo';
import { JsonLd } from '@/shared/json-ld';

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getNews(slug: string) {
  const allNews = await newsRepository.getAll();
  return allNews.find(n => n.slug === slug) || null;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNews(slug);

  if (!news) {
    return { title: 'Notícia não encontrada' };
  }

  return generateNewsMetadata(news);
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const news = await getNews(slug);

  if (!news) {
    notFound();
  }

  return (
    <>
      <JsonLd data={generateNewsJsonLd(news)} />
      <NewsDetailComponent slug={slug} />
    </>
  );
}
