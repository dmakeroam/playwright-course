import { APIRequestContext } from '@playwright/test';

export class ProductService {
  constructor(private request: APIRequestContext) {}

  async getAllProducts() {
    return await this.request.get('/products');
  }

  async getProductById(id: number) {
    return await this.request.get(`/products/${id}`);
  }

  async addProduct(product: { title: string; price: number }) {
    return await this.request.post('/products/add', { data: product });
  }

  async updateProduct(id: number, data: object) {
    return await this.request.put(`/products/${id}`, { data });
  }

  async deleteProduct(id: number) {
    return await this.request.delete(`/products/${id}`);
  }

  async searchProducts(query: string) {
    return await this.request.get(`/products/search?q=${query}`);
  }
}
