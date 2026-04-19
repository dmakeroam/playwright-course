import { test, expect } from '@playwright/test';
import { AuthService } from '../../services/dummyjson/AuthService';

test.describe('DummyJSON Auth API', () => {
  let authService: AuthService;

  test.beforeEach(async ({ request }) => {
    authService = new AuthService(request);
  });

  test('Login with valid credentials', async () => {
    const response = await authService.login('emilys', 'emilyspass');
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log("Body A: "+body.accessToken);
    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();
    expect(body.username).toBe('emilys');
  });

  test('Get current authenticated user', async () => {
    const loginResponse = await authService.login('emilys', 'emilyspass');
    const { accessToken } = await loginResponse.json();

    const response = await authService.getCurrentUser(accessToken);
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.username).toBe('emilys');
    expect(user.email).toBeDefined();
  });

  test('Login with invalid credentials returns error', async () => {
    const response = await authService.login('wrong', 'wrong');
    expect(response.status()).toBe(400);
  });
});
