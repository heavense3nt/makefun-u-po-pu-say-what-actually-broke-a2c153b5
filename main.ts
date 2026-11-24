// Say What Actually Broke — one brutally honest error line.
// Writes the entry text to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

const TEXT =
  "We lost your file. The backup job has failed silently for 11 months, and its alerts went to an inbox nobody reads.";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const rawOut = process.env.MAKEFUN_OUTPUT_DIR;
const outDir = rawOut
  ? isAbsolute(rawOut)
    ? rawOut
    : join(repoRoot, rawOut)
  : join(repoRoot, "out");

if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`entry text must be 1-200 characters, got ${TEXT.length}`);
}
if (!TEXT.trim()) {
  throw new Error("entry text must not be blank");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
