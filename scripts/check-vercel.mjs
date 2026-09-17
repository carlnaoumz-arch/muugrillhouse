import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';
import server from '../.vercel/output/functions/__server.func/index.mjs';

const output = new URL('../.vercel/output/', import.meta.url);
const config = JSON.parse(await readFile(new URL('config.json', output), 'utf8'));
assert.equal(config.version, 3);
assert.ok(config.routes.some(route => route.dest?.includes('__server')));
for (const path of ['/', '/menu', '/menu?dish=card12', '/visit', '/preview-notes', '/robots.txt', '/sitemap.xml']) {
  const response = await server.fetch(new Request('https://example.com' + path), {});
  assert.equal(response.status, 200, path);
  const body = await response.text();
  assert.ok(body.length > 20, path);
  if (response.headers.get('content-type')?.includes('text/html')) {
    assert.equal((body.match(/<h1[ >]/g) || []).length, 1, path);
    for (const [, asset] of body.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)) {
      assert.ok((await stat(new URL('static' + asset, output))).isFile(), asset);
    }
  }
  console.log('PASS Vercel SSR', path);
}
assert.equal((await server.fetch(new Request('https://example.com/missing-page'), {})).status, 404);
for (const name of ['hero-desktop.mp4', 'hero-mobile.mp4']) {
  assert.ok((await stat(new URL('static/assets/hq/' + name, output))).size > 1000);
}
console.log('PASS Vercel 404, linked static assets, and hero videos');
// Nitro's background timers should not keep this one-shot smoke check alive.
process.exit(0);
