import { type Locator, type Page, expect } from '@playwright/test';

export class SauceInventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly checkoutButton: Locator;
  readonly checkoutFirtNameInput: Locator;
  readonly checkoutLastNameInput: Locator;
  readonly checkoutZipInput: Locator;
  readonly checkoutContinueButton: Locator;
  readonly checkoutFinishButton: Locator;
  readonly checkoutCompleteText: Locator;

  constructor(page: Page) {
    this.page           = page;
    this.title          = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge      = page.locator('.shopping_cart_badge');
    this.cartLink       = page.locator('.shopping_cart_link');
    this.checkoutButton =  page.getByRole('button', { name: 'Checkout' });
    this.checkoutFirtNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.checkoutLastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.checkoutZipInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.checkoutContinueButton = page.getByRole('button', { name: 'Continue' });
    this.checkoutFinishButton = page.getByRole('button', { name: 'Finish' });
    this.checkoutCompleteText = page.getByText('Thank you for your order!');
  }

  async verifyOnInventoryPage() {
    await expect(this.title).toHaveText('Products');
  }

  async addItemToCart(itemName: string) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart()   { 
    await this.cartLink.click(); 
  }

  async verifyItemCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutForm(firstName: string, lastName: string, zip: string) {
    await this.checkoutFirtNameInput.fill(firstName);
    await this.checkoutLastNameInput.fill(lastName);
    await this.checkoutZipInput.fill(zip);
    await this.checkoutContinueButton.click();
  }

  async finishCheckout() {  
    await this.checkoutFinishButton.click(); 
  }

  async verifyCheckoutComplete() {
    await expect(this.checkoutCompleteText).toBeVisible();
  }
}
