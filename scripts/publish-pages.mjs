import { cp, mkdir, readdir, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const generatedPattern = /^(?:umi|preload_helper|503|p__Dashboard__index)\..*\.(?:js|css)$/;

async function copyTree(source, target) {
  await mkdir(target, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const from = join(source, entry.name);
    const to = join(target, entry.name);
    if (entry.isDirectory()) await copyTree(from, to);
    else await cp(from, to, { force: true });
  }
}

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && generatedPattern.test(entry.name)) await unlink(join(root, entry.name));
}
await copyTree(dist, root);
console.log('Published dist/ into the repository root for GitHub Pages.');
