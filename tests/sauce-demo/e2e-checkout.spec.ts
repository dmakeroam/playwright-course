import { test, expect } from '../../fixtures/pageObject';

test('@e2e should complete full purchase flow', async ({ page, sauceLoginPage, sauceInventoryPage }) => {

  await test.step('Login as standard user', async () => {
    await sauceLoginPage.goto();
    await sauceLoginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Add items to cart', async () => {
    await sauceInventoryPage.addItemToCart('Sauce Labs Backpack');
    await sauceInventoryPage.addItemToCart('Sauce Labs Bike Light');
    await sauceInventoryPage.verifyItemCount(2);
  });

  await test.step('Verify cart contents', async () => {
    await sauceInventoryPage.openCart();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  });

  await test.step('Complete checkout', async () => {
    await sauceInventoryPage.clickCheckout();
    await sauceInventoryPage.fillCheckoutForm('John', 'Doe', '12345');
  });

  await test.step('Finish order', async () => {
    await sauceInventoryPage.finishCheckout();
    await sauceInventoryPage.verifyCheckoutComplete();
  });
});
