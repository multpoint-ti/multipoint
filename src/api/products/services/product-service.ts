import { productRepository } from '../repositories/product-repository';

export const productService = {
  async getProducts(page: number, limit: number) {
    const products = await productRepository.getAll();

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
