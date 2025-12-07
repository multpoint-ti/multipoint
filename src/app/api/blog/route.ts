import { newsController } from '@/api/news/controllers/news-controller';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return newsController.getNews(request);
}
