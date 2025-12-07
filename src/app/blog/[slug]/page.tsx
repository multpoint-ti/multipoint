import NewsDetailComponent from '@/blog/news-detail';

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  return <NewsDetailComponent slug={slug} />;
}
