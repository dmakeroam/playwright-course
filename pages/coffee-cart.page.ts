import { type Locator, type Page, expect } from '@playwright/test';

export class CoffeeCartPage {

  // Step 2: Declare locators as typed class properties
  readonly page: Page;
  readonly espressoItem: Locator;
  readonly cappuccinoItem: Locator;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  // Step 3: Initialize all locators in the constructor
  constructor(page: Page) {
    this.page = page;
    this.espressoItem    = page.locator('[aria-label="Espresso"]');
    this.cappuccinoItem  = page.locator('[aria-label="Cappuccino"]');
    this.cartButton      = page.getByRole("link", { name: "Cart page" });
    this.checkoutButton  = page.getByRole("button", { name: "Proceed to checkout" });
    this.nameInput       = page.getByLabel('Name');
    this.emailInput      = page.getByLabel('Email');
    this.submitButton    = page.getByRole('button', { name: 'Submit' });
    this.successMessage  = page.getByText('Thanks for your purchase. Please check your email for payment.');
  }

 async goto() {
    await this.page.goto('https://coffee-cart.app/');
  }

  // Step 5: Actions
  async addEspresso()   { await this.espressoItem.click(); }
  async addCappuccino() { await this.cappuccinoItem.click(); }
  async openCart()      { await this.cartButton.click(); }

  async fillCheckoutForm(name: string, email: string) {
    await this.checkoutButton.click();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }

  async submitOrder() { await this.submitButton.click(); }

  // Step 6: Verifications (assertions live in the page class)
  async verifyOrderSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async verifyCartCount(count: number) {
    await expect(this.cartButton).toContainText(`cart (${count})`);
  }
}
