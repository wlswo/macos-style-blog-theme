#!/usr/bin/env node
/*
 * Browser smoke test for Ephemeris.
 *
 * Loads a built site, fails on uncaught page errors, verifies optional-app
 * visibility, exercises Finder, and opens every enabled lazy-loaded app.
 *
 *   node smoke.mjs --base http://127.0.0.1:4173 --disabled music
 */
import { chromium } from 'playwright-core';

const arg = (name, fallback = '') => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : fallback;
};

const BASE = arg('base', 'http://127.0.0.1:4173');
const DISABLED = arg('disabled', 'default');
const OPTIONAL_APPS = ['obsidian', 'mail', 'notes', 'terminal', 'games', 'music'];

if (DISABLED !== 'default' && !OPTIONAL_APPS.includes(DISABLED)) {
  throw new Error(`Unknown disabled app: ${DISABLED}`);
}

const dockSelector = (app) => `[data-dock-${app}]`;
const finderSelector = (app) => `[data-open-app="${app}"]`;
const windowSelector = (app) => `[data-window="${app}"]`;
const errors = [];

async function expectCount(page, selector, expected, message) {
  const count = await page.locator(selector).count();
  if (count !== expected) {
    throw new Error(`${message} (expected ${expected}, found ${count}: ${selector})`);
  }
}

async function clickDom(page, selector) {
  const clicked = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    el.click();
    return true;
  }, selector);
  if (!clicked) throw new Error(`Could not click missing element: ${selector}`);
}

async function waitForWindow(page, app, open) {
  try {
    await page.waitForFunction(
      ({ selector, shouldBeOpen }) => {
        const el = document.querySelector(selector);
        const isOpen = Boolean(el && !el.classList.contains('is-closed') && !el.hidden);
        return shouldBeOpen ? isOpen : !el || !isOpen;
      },
      { selector: windowSelector(app), shouldBeOpen: open },
      { timeout: 5000 },
    );
  } catch (error) {
    // A window that never opens is usually a symptom; show the browser error behind it.
    const detail = errors.length ? `\nUncaught browser error(s):\n${errors.join('\n\n')}` : '';
    throw new Error(`${app} window did not ${open ? 'open' : 'close'} within 5s${detail}`, { cause: error });
  }
}

const browser = await chromium.launch({
  channel: process.env.CHROME_CHANNEL || 'chrome',
  headless: true,
});

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  page.on('pageerror', (error) => {
    errors.push(error.stack || error.message || String(error));
  });

  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-dock-finder]');
  await page.waitForTimeout(300);

  // Each variant must hide exactly the requested optional app and preserve all
  // other optional launch surfaces. This catches copy/paste mistakes in Liquid.
  for (const app of OPTIONAL_APPS) {
    const enabled = DISABLED === 'default' || app !== DISABLED;
    await expectCount(
      page,
      dockSelector(app),
      enabled ? 1 : 0,
      enabled ? `${app} Dock button disappeared unexpectedly` : `${app} Dock button is still rendered`,
    );
    await expectCount(
      page,
      finderSelector(app),
      enabled ? 1 : 0,
      enabled ? `${app} Finder application disappeared unexpectedly` : `${app} is still rendered in Finder Applications`,
    );
  }

  await expectCount(
    page,
    '.cc__now',
    DISABLED === 'music' ? 0 : 1,
    DISABLED === 'music'
      ? 'Control Center Now Playing is still rendered with music disabled'
      : 'Control Center Now Playing disappeared while music is enabled',
  );

  // Control Center must still work after all eager desktop modules initialize.
  await clickDom(page, '[data-cc-button]');
  await page.waitForFunction(() => {
    const panel = document.querySelector('#menu-cc');
    return Boolean(panel && !panel.hidden);
  });
  await clickDom(page, '[data-cc-button]');

  // Finder starts closed on the home page. Force it closed even if that changes,
  // then prove the Dock handler actually reopens it.
  const finder = page.locator(windowSelector('finder'));
  if (!(await finder.count())) throw new Error('Finder window is missing from the page');

  if (!(await finder.evaluate((el) => el.classList.contains('is-closed')))) {
    await clickDom(page, `${windowSelector('finder')} [data-window-action="close"]`);
    await waitForWindow(page, 'finder', false);
  }

  await clickDom(page, '[data-dock-finder]');
  await waitForWindow(page, 'finder', true);

  // Optional app modules are lazy-loaded from their Dock handlers. Open every
  // enabled app so import-time/runtime failures are observed by pageerror or by
  // the missing-window timeout below.
  for (const app of OPTIONAL_APPS) {
    if (app === DISABLED) continue;

    await clickDom(page, dockSelector(app));
    await waitForWindow(page, app, true);

    // Close it before opening the next app to keep the smoke run deterministic.
    const close = `${windowSelector(app)} [data-window-action="close"]`;
    if (await page.locator(close).count()) {
      await clickDom(page, close);
      await waitForWindow(page, app, false);
    }
  }

  if (errors.length) {
    throw new Error(`Uncaught browser error(s):\n${errors.join('\n\n')}`);
  }

  console.log(`Smoke test passed: ${DISABLED}`);
} finally {
  await browser.close();
}
