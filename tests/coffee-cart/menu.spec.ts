// tests/coffee-cart/menu.spec.ts
import { test, expect } from '@playwright/test';

test.describe('CoffeeCart - Menu Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
  });

  test('should load the coffee menu page', async ({ page }) => {
    // Verify the page loaded with the correct title
    await expect(page).toHaveTitle(/Coffee cart/);
  });

  test('should display espresso on the menu', async ({ page }) => {
    await expect(page.locator('[aria-label="Espresso"]')).toBeVisible();
  });

  test('should add espresso to cart', async ({ page }) => {
    // Click on the espresso item
    await page.locator('[aria-label="Espresso"]').click();

    // Verify the cart button shows 1 item
    const cartButton = page.getByRole("link", { name: "Cart page" });
    await expect(cartButton).toContainText('cart (1)');
  });

  test('should complete checkout flow', async ({ page }) => {
    await test.step('Add items to cart', async () => {
      await page.locator('[aria-label="Espresso"]').click();
      await page.locator('[aria-label="Cappuccino"]').click();
    });

    await test.step('Open cart', async () => {
      await page.getByRole("link", { name: "Cart page" }).click();
    });

    await test.step('Fill payment form', async () => {
      await page.getByRole("button", { name: "Proceed to checkout" }).click();
      await page.getByLabel('Name').fill('John Doe');
      await page.getByLabel('Email').fill('john@example.com');
    });

    await test.step('Submit order', async () => {
      await page.getByRole('button', { name: 'Submit' }).click();
      await expect(
        page.getByText('Thanks for your purchase. Please check your email for payment.')
      ).toBeVisible();
    });
  });

});
