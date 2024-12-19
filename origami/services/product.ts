import { Service } from '@hapipal/schmervice';
import { Product, ProductResultSet } from '@interfaces/product';

export default class ProductService extends Service {
  async createProduct({ productInfo }: { productInfo: Product }) {
    const { productRepository } = this.server.services();

    return productRepository.create<Product>(
      'ProductModel',
      {
        ...productInfo,
      },
      null,
    );
  }

  async updateProduct({ id, productInfo }: { id: number; productInfo: Product }) {
    const { productRepository } = this.server.services();

    return productRepository.update<Product>(
      'ProductModel',
      id,
      {
        ...productInfo,
      },
      null,
    );
  }

  async findProductById({ id }: { id: number }) {
    const { productRepository } = this.server.services();

    return productRepository.findById<Product>('ProductModel', id, null);
  }

  async deleteProductById({ id }: { id: number }) {
    const { productRepository } = this.server.services();

    return productRepository.deleteById('ProductModel', id, null);
  }

  async findByFields({
    category,
    productName,
    page,
    limit,
  }: {
    category?: string;
    productName?: string;
    page?: number;
    limit?: number;
  }): Promise<ProductResultSet> {
    const { productRepository } = this.server.services();
    const products = await productRepository.findByFields<ProductResultSet>({
      category,
      productName,
      page,
      limit,
    });
    return products;
  }
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    productService: ProductService;
  }
}
