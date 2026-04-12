import { test } from '@playwright/test';
import { SauceLoginPage } from '../../pages/sauce-login.page';
import { SauceInventoryPage } from '../../pages/sauce-inventory.page';

test.describe('@login SauceDemo - Login Tests', () => {
  let loginPage: SauceLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceLoginPage(page);
    await loginPage.goto();
  });

  test('should login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    const inventory = new SauceInventoryPage(page);
    await inventory.verifyOnInventoryPage();
  });

  test('should show error for invalid credentials', async () => {
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.verifyError('Username and password do not match');
  });

  test('should show error for locked out user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.verifyError('Sorry, this user has been locked out');
  });
});
