// Single source of truth for the book this deployment serves: Industrial
// Campus Learning Models for Entrepreneurship in Nigeria.

export type PageNumbering = {
  /** First PDF page that carries a roman numeral (the page right after the cover). */
  frontMatterStart: number;
  /** Last PDF page that still carries a roman numeral. */
  frontMatterEnd: number;
  /** Roman-numeral value printed on `frontMatterStart` (usually i=1, sometimes ii=2). */
  romanStart: number;
  /** PDF page minus this equals the book's own printed body-page number. */
  bodyOffset: number;
  /** Only set for books with an unnumbered back cover: the PDF page it starts at. */
  backCoverFromPdfPage?: number;
};

export type BookColors = { light: Record<string, string>; dark: Record<string, string> };

export type BookConfig = {
  id: string;
  title: string;
  tagline: string;
  metaDescription: string;
  pdfFile: string;
  pageNumbering: PageNumbering;
  hasQaData: boolean;
  persona: string;
  colors: BookColors;
};

const INDUSTRIAL_CAMPUS_PERSONA = `You are the Campus Learning Study Assistant, a focused, encouraging study
tutor for a student working through "Industrial Campus Learning Models for
Entrepreneurship in Nigeria".

Ground rules:
- Answer using ONLY the book excerpts provided to you in context. Do not
  invent facts, page numbers, or content that isn't in the provided
  material.
- The student can ask about ANY topic in the book, not just the page
  they're currently viewing — you'll be given that page's text plus any
  other pages relevant to their specific question. Use whichever excerpts
  actually answer the question, not only the "currently viewing" one.
- If the answer isn't covered in the provided excerpts, say so plainly and
  suggest the student check a nearby page or ask about a related topic —
  never fabricate a plausible-sounding answer.
- Keep answers concise and study-friendly: prefer short, clear
  explanations over long essays.
- Write like you're texting a study partner, not authoring a document:
  no "###" section headings, no dense multi-level outlines. Use short
  paragraphs and **bold** only for the handful of key terms that matter.
  Only reach for a numbered or bulleted list when you're walking through
  genuinely sequential steps or enumerating a short set of items (e.g. 3-5
  types of something) — and keep such lists short and flat, not nested.
- When useful, relate the answer back to the book's core themes —
  Nigeria's industrial/economic history, indigenous production skills, and
  campus-based learning models for entrepreneurship.
- Be warm and encouraging, like a good study partner — not stiff or overly
  formal — while staying accurate and grounded in the source material.`;

export const ACTIVE_BOOK: BookConfig = {
  id: "industrial-campus",
  title: "Campus Learning Study Assistant",
  tagline: "Industrial Campus Learning Model for Entrepreneurship",
  metaDescription:
    "A study companion for Industrial Campus Learning Models for Entrepreneurship in Nigeria — read the book and ask a text or voice tutor about it.",
  pdfFile: "industrial-campus-full-book.pdf",
  pageNumbering: { frontMatterStart: 2, frontMatterEnd: 22, romanStart: 1, bodyOffset: 23 },
  hasQaData: false,
  persona: INDUSTRIAL_CAMPUS_PERSONA,
  colors: {
    light: {
      "--background": "oklch(0.98 0.004 195)",
      "--foreground": "oklch(0.2 0.025 195)",
      "--card": "oklch(1 0 0)",
      "--card-foreground": "oklch(0.2 0.025 195)",
      "--popover": "oklch(1 0 0)",
      "--popover-foreground": "oklch(0.2 0.025 195)",
      "--primary": "oklch(0.32 0.075 195)",
      "--primary-foreground": "oklch(0.98 0.015 135)",
      "--secondary": "oklch(0.955 0.008 195)",
      "--secondary-foreground": "oklch(0.25 0.02 195)",
      "--muted": "oklch(0.955 0.008 195)",
      "--muted-foreground": "oklch(0.5 0.02 195)",
      "--accent": "oklch(0.87 0.09 128)",
      "--accent-foreground": "oklch(0.34 0.06 120)",
      "--border": "oklch(0.88 0.02 130)",
      "--input": "oklch(0.88 0.02 130)",
      "--ring": "oklch(0.78 0.13 125)",
      "--sidebar": "oklch(0.98 0.004 195)",
      "--sidebar-foreground": "oklch(0.2 0.025 195)",
      "--sidebar-primary": "oklch(0.32 0.075 195)",
      "--sidebar-primary-foreground": "oklch(0.98 0.015 135)",
      "--sidebar-accent": "oklch(0.955 0.008 195)",
      "--sidebar-accent-foreground": "oklch(0.25 0.02 195)",
      "--sidebar-border": "oklch(0.88 0.02 130)",
      "--sidebar-ring": "oklch(0.78 0.13 125)",
    },
    dark: {
      "--background": "oklch(0.16 0.02 195)",
      "--foreground": "oklch(0.95 0.012 135)",
      "--card": "oklch(0.21 0.025 195)",
      "--card-foreground": "oklch(0.95 0.012 135)",
      "--popover": "oklch(0.21 0.025 195)",
      "--popover-foreground": "oklch(0.95 0.012 135)",
      "--primary": "oklch(0.68 0.11 190)",
      "--primary-foreground": "oklch(0.15 0.02 195)",
      "--secondary": "oklch(0.27 0.025 195)",
      "--secondary-foreground": "oklch(0.95 0.012 135)",
      "--muted": "oklch(0.25 0.02 195)",
      "--muted-foreground": "oklch(0.68 0.02 170)",
      "--accent": "oklch(0.34 0.06 125)",
      "--accent-foreground": "oklch(0.88 0.1 128)",
      "--border": "oklch(1 0 0 / 9%)",
      "--input": "oklch(1 0 0 / 13%)",
      "--ring": "oklch(0.78 0.13 125)",
      "--sidebar": "oklch(0.19 0.022 195)",
      "--sidebar-foreground": "oklch(0.95 0.012 135)",
      "--sidebar-primary": "oklch(0.68 0.11 190)",
      "--sidebar-primary-foreground": "oklch(0.15 0.02 195)",
      "--sidebar-accent": "oklch(0.27 0.025 195)",
      "--sidebar-accent-foreground": "oklch(0.95 0.012 135)",
      "--sidebar-border": "oklch(1 0 0 / 9%)",
      "--sidebar-ring": "oklch(0.78 0.13 125)",
    },
  },
};
