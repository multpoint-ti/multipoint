import { newsController } from '@/api/news/controllers/news-controller';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return Response.json({ error: 'Invalid news slug' }, { status: 400 });
  }

  return newsController.getNewsBySlug(slug);
}
