import { expect, test } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8');

test('renders the page', () => {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  expect(document).not.toBeNull();
});

test('renders the main heading', () => {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const heading = document.querySelector('h1');
  expect(heading?.textContent).toBe('SmartStay Access Manager');
});