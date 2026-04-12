import { test as base } from '@playwright/test';
import { SauceLoginPage } from '../pages/sauce-login.page';
import { SauceInventoryPage } from '../pages/sauce-inventory.page';

type MyFixtures = {
  sauceLoginPage: SauceLoginPage;
  sauceInventoryPage: SauceInventoryPage;
};

export const test = base.extend<MyFixtures>({
  sauceLoginPage: async ({ page }, use) => {
    const loginPage = new SauceLoginPage(page);
    await use(loginPage);
  },
  sauceInventoryPage: async ({ page }, use) => {
    const inventoryPage = new SauceInventoryPage(page);
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
