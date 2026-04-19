import { test, expect } from '@playwright/test';
import { UserService } from '../../services/petstore/UserService';

test.describe('Pet Store - User API', () => {
  let userService: UserService;

  test.beforeEach(async ({ request }) => {
    userService = new UserService(request);
  });

  test.only('Create a new user', async () => {
    const response = await userService.createUser({
      id: 10001,
      username: 'johndoe_test',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'pass123',
      phone: '1234567890',
    });
    expect(response.status()).toBe(200);
  });

  test('Get user by username', async () => {
    const response = await userService.getUserByUsername('johndoe_test');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.username).toBe('johndoe_test');
    expect(user.email).toBe('john@test.com');
  });

  test('Login user', async () => {
    const response = await userService.loginUser('johndoe_test', 'pass123');
    expect(response.status()).toBe(200);
  });

  test('Delete user', async () => {
    const response = await userService.deleteUser('johndoe_test');
    expect(response.status()).toBe(200);
  });
});
