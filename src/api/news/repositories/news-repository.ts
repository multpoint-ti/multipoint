import path from 'path';
import fs from 'fs/promises';
import { News } from '@/shared/types/blog-types';

const filePath = path.join(process.cwd(), 'src', 'data', 'news.json');

export const newsRepository = {
  async getAll(): Promise<News[]> {
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const news: News[] = JSON.parse(fileContents);
      return news;
    } catch (error) {
      console.error('Error reading or parsing news data:', error);
      throw new Error('Failed to load news.');
    }
  },
};
