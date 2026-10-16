import { Page, Locator } from '@playwright/test';

export default class BaseAction {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* ================= ACTIONS ================= */

  public async clickElements(selector: string, options?: { force?: boolean }) {
    await this.waitFor(selector);
    await this.page.click(selector, options);
  }

  public async fillText(selector: string, value: string) {
    await this.waitFor(selector);
    await this.page.fill(selector, value);
  }

  public async waitFor(selector: string) {
    await this.page.waitForSelector(selector);
  }

  public async getText(selector: string) {
    await this.waitFor(selector);
    return (await this.page.locator(selector).textContent()) ?? '';
  }

  public async getPageTitle() {
    return this.page.title();
  }

  public async hoverElement(selector: string) {
    await this.waitFor(selector);
    await this.page.hover(selector);
  }

  public async selectDropdown(selector: string, value: string) {
    await this.waitFor(selector);
    await this.page.selectOption(selector, value);
  }

  /* ================= PROXY / NETWORK ================= */

  /**
   * Navigate through a proxy by modifying the page URL.
   * @param url string - target URL
   * @param proxy string - proxy host:port
   */
  public async navigateThroughProxy(url: string, proxy?: string) {
    if (proxy) {
      // Simple implementation: inject proxy as query param
      const proxiedUrl = new URL(url);
      proxiedUrl.searchParams.set('proxy', proxy);
      await this.page.goto(proxiedUrl.toString());
    } else {
      await this.page.goto(url);
    }
  }

  /**
   * Set custom request headers (useful for auth tokens, proxies)
   */
  public async setRequestHeaders(headers: Record<string, string>) {
    await this.page.setExtraHTTPHeaders(headers);
  }

  /**
   * Intercept network requests
   * @param urlOrPattern string - URL or pattern to intercept
   * @param handler (route) => void - callback for intercepted requests
   */
  public async interceptRequests(urlOrPattern: string, handler: (route: any) => void) {
    await this.page.route(urlOrPattern, handler);
  }

  /* ================= RANDOM DATA ================= */

  /** Generate random first name */
  public generateRandomFirstName(): string {
    return `FirstName_${Math.random().toString(36).substring(2, 8)}`;
  }

  /** Generate random last name */
  public generateRandomLastName(): string {
    return `LastName_${Math.random().toString(36).substring(2, 8)}`;
  }

  /** Generate unique random email */
  public generateRandomEmail(): string {
    const timestamp = Date.now();
    return `user_${timestamp}@testmail.com`;
  }
}