import path from 'path';
import fs from 'fs/promises';
import { Product } from '@/shared/types/product-types';

const filePath = path.join(process.cwd(), 'src', 'data', 'product.json');

export const productRepository = {
  async getAll(): Promise<Product[]> {
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      const products: Product[] = JSON.parse(fileContents);
      return products;
    } catch (error) {
      console.error('Error reading or parsing product data:', error);
      throw new Error('Failed to load products.');
    }
  },
};
