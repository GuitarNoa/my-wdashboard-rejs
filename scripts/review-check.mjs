import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

// Render smoke checks do not replace browser layout or interaction tests.
const storage = new Map();
globalThis.localStorage = { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) };
globalThis.window = { matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) };
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', ssr: { resolve: { externalConditions: ['module-sync', 'node'] } } });
try {
  const { ThemeProvider } = await server.ssrLoadModule('/src/context/ThemeContext.jsx');
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const paths = [...app.matchAll(/lazy\(\(\) => import\("\.\/([^"\n]+)"\)\)/g)].map(match => '/src/' + match[1] + '.jsx');
  assert.ok(paths.length >= 25, 'Check all route pages, not an empty set.');
  for (const theme of ['light', 'dark']) {
    storage.set('theme', theme);
    for (const path of paths) {
      const { default: Page } = await server.ssrLoadModule(path);
      const html = renderToString(React.createElement(MemoryRouter, {}, React.createElement(ThemeProvider, {}, React.createElement(Page))));
      assert.ok(html.length > 100, path + ' should render content');
    }
  }
  const { PAGES } = await server.ssrLoadModule('/src/navigation.js');
  const routes = new Set(['/', ...[...app.matchAll(/path="([^"]+)"/g)].map(match => match[1].toLowerCase())]);
  for (const page of PAGES) assert.ok(routes.has(page.to.toLowerCase()), 'Navigation target exists: ' + page.to);
  const { validateAccount } = await server.ssrLoadModule('/src/pages/forms/formStyles.js');
  assert.deepEqual(Object.keys(validateAccount({ name: ' ', email: 'invalid', password: 'short' })).sort(), ['email', 'name', 'password']);
  assert.equal(Object.keys(validateAccount({ name: 'Alice', email: 'alice@example.com', password: 'sample123' })).length, 0);
  assert.equal(Object.keys(validateAccount({ name: 'Alice', email: '', password: '' }, ['name'])).length, 0, 'Step one only validates name');
  assert.ok(validateAccount({ email: 'a@b.com trailing' }, ['email']).email, 'Reject trailing email data');
  const { chartGradient } = await server.ssrLoadModule('/src/pages/charts/chartUtils.js');
  let builds = 0;
  const gradient = chartGradient(() => ({ build: ++builds }), 'fallback');
  const chart = { ctx: {} };
  assert.equal(gradient({ chart }), 'fallback');
  chart.chartArea = { left: 0, top: 0, right: 100, bottom: 100 };
  const first = gradient({ chart });
  assert.equal(gradient({ chart }), first, 'Reuse unchanged gradient');
  chart.chartArea.right = 200;
  assert.notEqual(gradient({ chart }), first, 'Rebuild after sidebar/container resize');
  const { default: Profile } = await server.ssrLoadModule('/src/pages/Profile.jsx');
  storage.set('dashboard.profile.v1', '{broken');
  assert.ok(renderToString(React.createElement(Profile)).includes('Thawatchai'), 'Malformed local profile falls back');
  storage.set('dashboard.profile.v1', JSON.stringify({ github: 'javascript:alert(1)' }));
  assert.ok(!renderToString(React.createElement(Profile)).includes('href="javascript:'), 'Unsafe profile URLs are not rendered');
  console.log(`PASS: ${paths.length} pages rendered in light and dark states; navigation, form validation, gradient resize/cache and profile storage/URL checks.`);
} finally {
  await server.close();
}
