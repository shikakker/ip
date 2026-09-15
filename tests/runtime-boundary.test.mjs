import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const config = await readFile(new URL('../next.config.js', import.meta.url), 'utf8');
const middleware = await readFile(new URL('../middleware.ts', import.meta.url), 'utf8');
const app = await readFile(new URL('../pages/_app.tsx', import.meta.url), 'utf8');
const countryPage = await readFile(new URL('../pages/[locale]/[country].tsx', import.meta.url), 'utf8');

test('Next config uses supported built-in package transpilation', () => {
  assert.doesNotMatch(config, /@vercel\/examples-ui\/transpile/);
  assert.match(config, /transpilePackages/);
  assert.match(config, /@vercel\/examples-ui/);
});

test('country lookup uses the Vercel request header and fails closed when absent', () => {
  assert.doesNotMatch(middleware, /req\.geo/);
  assert.match(middleware, /x-vercel-ip-country/);
  assert.doesNotMatch(middleware, /\|\| ['"]us['"]/);
  assert.match(middleware, /unknown/);
  assert.match(countryPage, /country !== ['"]unknown['"]/);
});

test('document metadata is rendered through next/head instead of unsupported Layout props', () => {
  assert.match(app, /from ['"]next\/head['"]/);
  assert.match(app, /<Head>/);
  assert.doesNotMatch(app, /<Layout[\s\S]*title=/);
  assert.doesNotMatch(app, /<Layout[\s\S]*description=/);
});
