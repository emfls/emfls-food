import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(repoRoot, 'public');

test('root IndexNow key file name matches its UTF-8 file content', async () => {
  const keyFiles = (await readdir(publicRoot)).filter((name) => /^[a-f0-9]{32}\.txt$/.test(name));

  assert.equal(keyFiles.length, 1, 'expected exactly one 32-character hexadecimal root key file');

  const key = keyFiles[0].slice(0, -4);
  assert.equal(await readFile(path.join(publicRoot, keyFiles[0]), 'utf8'), `${key}\n`);
});
