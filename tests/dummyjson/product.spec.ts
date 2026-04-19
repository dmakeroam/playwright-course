import { test, expect } from '@playwright/test';
import { ProductService } from '../../services/dummyjson/ProductService';

test.describe('DummyJSON Products API', () => {
  let productService: ProductService;

  test.beforeEach(async ({ request }) => {
    productService = new ProductService(request);
  });

  test('GET all products', async () => {
    const response = await productService.getAllProducts();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.products).toBeDefined();
    expect(body.products[0].id).toBe(1);
    expect(body.products[0].title).toBe("Essence Mascara Lash Princess")
    expect(body.products[0].dimensions.width).toBe(15.14);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('POST add a new product', async () => {
    const newProduct = { title: 'Test Laptop', price: 1299 };
    const response = await productService.addProduct(newProduct);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.title).toBe('Test Laptop');
  });

  test('DELETE a product', async () => {
    const response = await productService.deleteProduct(1);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.isDeleted).toBe(true);
  });
});
