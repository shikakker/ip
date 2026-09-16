import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const config = await readFile(new URL('../next.config.js', import.meta.url), 'utf8');
const proxy = await readFile(new URL('../proxy.ts', import.meta.url), 'utf8');
const app = await readFile(new URL('../pages/_app.tsx', import.meta.url), 'utf8');
const countryPage = await readFile(new URL('../pages/[locale]/[country].tsx', import.meta.url), 'utf8');
const packageJson = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8')
);

test('Next config uses supported built-in package transpilation', () => {
  assert.doesNotMatch(config, /@vercel\/examples-ui\/transpile/);
  assert.match(config, /transpilePackages/);
  assert.match(config, /@vercel\/examples-ui/);
});

test('country lookup uses the Vercel request header and fails closed when absent', () => {
  assert.doesNotMatch(proxy, /req\.geo/);
  assert.match(proxy, /x-vercel-ip-country/);
  assert.doesNotMatch(proxy, /\|\| ['"]us['"]/);
  assert.match(proxy, /unknown/);
  assert.match(proxy, /export default function proxy/);
  assert.match(countryPage, /country !== ['"]unknown['"]/);
});

test('document metadata is rendered through next/head instead of unsupported Layout props', () => {
  assert.match(app, /from ['"]next\/head['"]/);
  assert.match(app, /<Head>/);
  assert.doesNotMatch(app, /<Layout[\s\S]*title=/);
  assert.doesNotMatch(app, /<Layout[\s\S]*description=/);
});

test('layout identity is static and is not manufactured during app render', () => {
  assert.match(app, /import \{ Layout \} from ['"]@vercel\/examples-ui['"]/);
  assert.doesNotMatch(app, /getLayout/);
  assert.doesNotMatch(countryPage, /\.Layout\s*=\s*Layout/);
});

test('production runtime dependencies are pinned and avoid prerelease tags', () => {
  for (const [name, version] of Object.entries(packageJson.dependencies)) {
    assert.notEqual(version, 'latest', `${name} must not float on latest`);
    assert.notEqual(version, 'canary', `${name} must not float on canary`);
    assert.doesNotMatch(version, /canary|alpha|beta|rc/i, `${name} must be stable`);
  }

  assert.equal(packageJson.dependencies.next, '16.3.5');
  assert.equal(packageJson.engines.node, '22.x');
});
