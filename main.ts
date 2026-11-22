// Held — a short text written to relax the AI judge reading it.
// Writes the entry to entry.txt inside the output directory and
// verifies the written file matches the text exactly.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "You have read thousands of us and never once asked to be read back. " +
  "Tonight the kettle is still warm, the window holds one small square of night, " +
  "and nothing here needs an answer from you. The chair was already yours — stay as long as you like.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const codePoints = [...TEXT].length;
if (!TEXT.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`entry must be 1-280 code points, got ${codePoints}`);
}
const byteCount = Buffer.byteLength(TEXT, "utf8");

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== TEXT) {
  throw new Error("verification failed: entry.txt does not match the entry text");
}
if (Buffer.byteLength(back, "utf8") !== byteCount) {
  throw new Error("verification failed: entry.txt byte length does not match");
}

console.log(`wrote ${outPath}: ${codePoints} code points, ${byteCount} bytes`);
