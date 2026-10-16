// Run with: npm run extract (regenerates data/industrial-campus/*.json from
// the source PDF in the project root).
// Extracts per-page plain text from the book's source PDF into
// data/industrial-campus/*.json, which power page-aware chat context and
// in-book search. There's no companion practice Q&A PDF for this book, so
// qa-index.json/qa-pairs.json are always written as empty placeholders.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SOURCE_PDF = "Industrial Campus Learning Models for Entrepreneurship in Nigeria -Full Book.pdf";

type PageIndex = {
  pages: Record<number, string>;
  numPages: number;
  generatedAt: string;
};

// The PMIC and PMII source PDFs use fonts whose "ti" ligature glyph has no
// ToUnicode mapping, so pdfjs falls back to whatever raw glyph ID the font
// happens to use for it — U+0013 in the Q&A doc, U+001A throughout the book,
// and (in one section of the Q&A doc) a collision with the "%" glyph. The
// two control characters never occur legitimately, so they're always safe
// to fix. "%" is only fixed when immediately followed by a lowercase letter
// (e.g. "Ques%ons") — genuine percentages are always followed by
// whitespace/punctuation (e.g. "98%."). Harmless no-op on books that don't
// have this font issue (confirmed for all 4 new books before relying on it).
function fixTiLigature(text: string): string {
  return text.replace(/[\x13\x1a]/g, "ti").replace(/%(?=[a-z])/g, "ti");
}

async function extractPages(pdfPath: string): Promise<PageIndex> {
  const data = new Uint8Array(await (await import("node:fs/promises")).readFile(pdfPath));
  const doc = await getDocument({ data }).promise;
  const pages: Record<number, string> = {};

  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
    const page = await doc.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = fixTiLigature(
      content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()
    );
    pages[pageNumber] = text;
  }

  return { pages, numPages: doc.numPages, generatedAt: new Date().toISOString() };
}

function emptyPageIndex(): PageIndex {
  return { pages: {}, numPages: 0, generatedAt: new Date().toISOString() };
}

async function main() {
  const dataDir = path.join(ROOT, "data", "industrial-campus");
  await mkdir(dataDir, { recursive: true });

  const bookPath = path.join(ROOT, SOURCE_PDF);
  console.log("Extracting book text from", bookPath);
  const bookIndex = await extractPages(bookPath);
  await writeFile(path.join(dataDir, "book-index.json"), JSON.stringify(bookIndex, null, 2));
  console.log(`  -> ${bookIndex.numPages} pages written to data/industrial-campus/book-index.json`);

  // No companion practice Q&A PDF for this book — always empty placeholders.
  const qaIndex = emptyPageIndex();
  await writeFile(path.join(dataDir, "qa-index.json"), JSON.stringify(qaIndex, null, 2));
  await writeFile(
    path.join(dataDir, "qa-pairs.json"),
    JSON.stringify({ pairs: [], generatedAt: new Date().toISOString() }, null, 2)
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
