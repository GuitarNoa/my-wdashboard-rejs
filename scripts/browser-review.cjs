const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.REVIEW_URL || 'http://127.0.0.1:5174';
(async () => {
 const browser = await chromium.launch({ headless: true, channel: 'msedge' });
 try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const source = fs.readFileSync('src/App.jsx', 'utf8');
  const routes = ['/', ...[...source.matchAll(/path="([^"]+)"/g)].map(match => match[1]).filter(path => path !== '*')];
  fs.mkdirSync('review-artifacts', { recursive: true });
  for (const [theme, width] of [['light', 1440], ['dark', 390]]) {
   await page.setViewportSize({ width, height: 1000 });
   await page.addInitScript(value => localStorage.setItem('theme', value), theme);
   for (const route of routes) {
    await page.goto(base + route);
    await page.locator('h1').first().waitFor();
    await page.waitForTimeout(100);
    assert.equal(await page.locator('vite-error-overlay').count(), 0, route + ' compiles');
    const overflow = await page.evaluate(() => { const content = document.querySelector('#page-content'); return Math.max(document.documentElement.scrollWidth - innerWidth, content ? content.scrollWidth - content.clientWidth : 0); });
    assert.ok(overflow <= 2, route + ' fits width ' + width + ', overflow ' + overflow);
   }
  }
  await page.goto(base + '/');
  await page.getByRole('button', { name: 'Open sidebar', exact: true }).click();
  await page.getByRole('dialog', { name: 'Navigation' }).waitFor();
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button', { name: 'Open sidebar', exact: true }).getAttribute('aria-expanded'), 'false');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'review-artifacts/mobile-dark.png', fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'review-artifacts/desktop-light.png', fullPage: true });
  const search = page.getByRole('searchbox', { name: 'Find a page' });
  await search.fill('profile');
  await page.locator('header').getByRole('link', { name: 'Profile', exact: true }).click();
  await page.getByRole('button', { name: 'Edit profile' }).click();
  await page.getByLabel('Full name', { exact: true }).fill('Review Example');
  await page.getByRole('button', { name: 'Save changes' }).click();
  await page.reload();
  await page.getByRole('heading', { name: 'Review Example' }).waitFor();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'review-artifacts/profile.png', fullPage: true });
  await page.goto(base + '/tables/datatable');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('searchbox', { name: 'Search users' }).fill('John');
  await page.getByRole('cell', { name: 'John Doe', exact: true }).waitFor();
  await page.getByRole('searchbox', { name: 'Search users' }).fill('doesnotexist');
  assert.ok(await page.getByRole('button', { name: 'Next', exact: true }).isDisabled());
  await page.goto(base + '/ECommerce');
  await page.getByRole('button', { name: '+ Add Product', exact: true }).click();
  await page.getByLabel('Product name', { exact: true }).fill('Review product');
  await page.getByLabel('Price (THB)', { exact: true }).fill('12.50');
  await page.getByLabel('Stock', { exact: true }).fill('3');
  await page.getByRole('button', { name: 'Save product', exact: true }).click();
  await page.getByRole('cell', { name: 'Review product', exact: true }).waitFor();
  await page.getByRole('button', { name: 'Delete Review product', exact: true }).click();
  await page.getByRole('button', { name: 'Undo delete', exact: true }).click();
  await page.getByRole('cell', { name: 'Review product', exact: true }).waitFor();
  await page.goto(base + '/CRM');
  await page.getByRole('button', { name: '+ Add Customer', exact: true }).click();
  await page.getByLabel('Name', { exact: false }).fill('Review Customer');
  await page.getByLabel('Email', { exact: false }).fill('review@example.com');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('cell', { name: 'Review Customer', exact: true }).waitFor();
  assert.deepEqual(errors, [], 'No runtime page errors');
  console.log(`PASS: ${routes.length} routes at desktop/light and mobile/dark sizes; no overflow or runtime errors. Sidebar Escape, page search, profile persistence, table filter/paging, product add/delete/undo, customer add passed.`);
 } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
