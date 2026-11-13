// ai-happy-01 entry: "Share the Umbrella"
// The picture lives beside this file as entry.png; the program's whole job
// is to place it where the grader looks: $MAKEFUN_OUTPUT_DIR/entry.png
// (the grader mounts that directory as /output). Node 22, stdlib only.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// The judge sees exactly the bytes in the file, so prove the copy is whole:
// the delivered size must match the source before we call this done.
const delivered = statSync(target).size;
if (delivered !== statSync(source).size) {
  throw new Error(`copy truncated: ${delivered} of ${statSync(source).size} bytes`);
}

console.log(`delivered ${delivered} bytes to ${target}`);
