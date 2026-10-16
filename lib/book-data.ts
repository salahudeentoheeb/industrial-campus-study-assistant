import bookIndex from "@/data/industrial-campus/book-index.json";
import qaIndex from "@/data/industrial-campus/qa-index.json";
import qaPairsFile from "@/data/industrial-campus/qa-pairs.json";

export type PageIndex = {
  pages: Record<string, string>;
  numPages: number;
  generatedAt: string;
};

export type QaPair = { id: string; question: string; answer: string; page: number };

export const book: PageIndex = bookIndex;
export const qa: PageIndex = qaIndex;
export const qaPairs: QaPair[] = qaPairsFile.pairs;
