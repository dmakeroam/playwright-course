import { test } from '@playwright/test';
import { CoffeeCartPage } from '../../pages/coffee-cart.page';

test.describe('CoffeeCart with POM', () => {
  let coffeeCart: CoffeeCartPage;

  test.beforeEach(async ({ page }) => {
    coffeeCart = new CoffeeCartPage(page);
    await coffeeCart.goto();
  });

  test('should add espresso to cart', async () => {
    await coffeeCart.addEspresso();
    await coffeeCart.verifyCartCount(1);
  });

  test('should complete full order', async () => {
    await coffeeCart.addEspresso();
    await coffeeCart.addCappuccino();
    await coffeeCart.openCart();
    await coffeeCart.fillCheckoutForm('John Doe', 'john@example.com');
    await coffeeCart.submitOrder();
    await coffeeCart.verifyOrderSuccess();
  });
});
