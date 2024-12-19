import BaseRepository from './base';

export default class ProductRepository extends BaseRepository {
  async findByFields<T>({
    category,
    productName,
    page = 0,
    limit = 10,
  }: {
    category?: string;
    productName?: string;
    page?: number;
    limit?: number;
  }): Promise<T> {
    const { ProductModel } = this.server.models();
    const query = ProductModel.query();

    if (category) {
      query.where('category', category);
    }

    if (productName) {
      query.where('productName', productName);
    }

    if (limit) {
      query.page(page, limit);
    }

    return query.castTo<T>();
  }
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    productRepository: ProductRepository;
  }
}
