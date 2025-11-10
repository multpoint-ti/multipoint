import { productRepository } from '../repositories/product-repository';
import { Product } from '@/shared/types/product-types';

interface ProductFilters {
  search?: string;
  productLine?: string;
  automaker?: string;
  year?: string;
  sortBy?: string;
}

export const productService = {
  async getProducts(page: number, limit: number, filters?: ProductFilters) {
    let products = await productRepository.getAll();

    // Aplicar filtros
    if (filters) {
      // Filtro de busca
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        products = products.filter(product =>
          product.multpointCode.toLowerCase().includes(searchLower) ||
          product.automakerCode.some(code => code.toLowerCase().includes(searchLower))
        );
      }

      // Filtro por linha de produto
      if (filters.productLine) {
        products = products.filter(product => product.productLine === filters.productLine);
      }

      // Filtro por montadora
      if (filters.automaker) {
        products = products.filter(product =>
          product.automakers.some(a => a.name === filters.automaker)
        );
      }

      // Filtro por ano
      if (filters.year) {
        products = products.filter(product => product.years.includes(filters.year!));
      }

      // Ordenação
      if (filters.sortBy) {
        products = [...products].sort((a, b) => {
          switch (filters.sortBy) {
            case 'code_asc':
              return a.multpointCode.localeCompare(b.multpointCode);
            case 'code_desc':
              return b.multpointCode.localeCompare(a.multpointCode);
            case 'newest':
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'oldest':
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            default:
              return 0;
          }
        });
      }
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedProducts = products.slice(startIndex, endIndex);

    return {
      total: products.length,
      totalPages: Math.ceil(products.length / limit),
      currentPage: page,
      products: paginatedProducts,
    };
  },
};
