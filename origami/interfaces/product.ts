export interface Product {
  id?: number;
  productName?: string;
  productDescription?: string;
  price?: number;
  category?: string;
  stockQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCreationPayload {
  productName?: string;
  productDescription?: string;
  price?: number;
  category?: string;
  stockQuantity?: number;
}

export interface ProductUpdationPayload {
  productName?: string;
  productDescription?: string;
  price?: number;
  category?: string;
  stockQuantity?: number;
}

export interface ProductResultSet {
  results: Product[];
  total: number;
}
