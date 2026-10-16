# Industrial Campus Study Assistant

A web-based study companion that pairs a readable book viewer with an AI voice/chat tutor, so a student can read the source material and ask an agent about it in the same view.

## Source material

- `Industrial Campus Learning Models for Entrepreneurship in Nigeria -Full Book.pdf` — the book. Rendered in the reader pane. The source of truth lives at the project root and is duplicated at `public/industrial-campus-full-book.pdf` for the app to serve; edits to one should be mirrored to the other (or re-run `npm run extract` to regenerate `data/industrial-campus/book-index.json` from it).
- No companion practice Q&A PDF exists for this book, so Practice Mode (flashcard quizzing) is disabled via `hasQaData: false` in `lib/books/config.ts`.

## Product shape

Two-pane layout, single screen, no scrolling page-within-page:

**Left pane — Book viewer**
- Renders the full PDF page by page.
- Prev/Next page buttons.
- Dropdown (or searchable jump box) to go directly to a specific page number.
- Current page number / total pages always visible.

**Right pane — Study agent**
- Chat interface: student types questions about the material and gets answers.
- Voice mode: ElevenLabs conversational voice agent — student can start a live voice call instead of typing.
- The agent answers with awareness of what page/section the student is currently viewing, and can navigate the viewer to a relevant page via a client tool.

## Design direction

Sleek, modern, minimalistic — a teal/cyan primary with a green accent (distinct from the sibling PMIC deployment's green/gold palette, both defined in `lib/books/config.ts`):
- Clean two-column layout, generous whitespace, no visual clutter.
- Typography-first — book pane should feel like a native reading surface, not an embedded PDF widget.
- Chat pane feels like a modern chat product, with an unobtrusive voice-call control.
- Responsive down to at least tablet width; mobile stacks the panes.

## Stack & infrastructure

- **Framework**: Next.js (App Router), React, Tailwind v4, shadcn-style components.
- **Text tutor**: Gemini (`@google/genai`), server-side only via `app/api/chat/route.ts` — key never reaches the client.
- **Voice agent**: ElevenLabs Conversational AI, embedded client-side via the agent ID (safe to expose — it's an ID, not a secret).
- **Source control**: not yet initialized as a git repo locally.
- **Hosting/deploy**: intended for Vercel, not yet deployed.

## Working conventions

- Keep API keys (ElevenLabs secret key, Gemini key) out of client-side bundles — they're read server-side via `process.env` in `.env.local` (gitignored). Only `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` is meant to be public.
- This codebase was derived from the shared multi-book template at https://github.com/salahudeentoheeb/pmic-study-assistant (which deploys 5 books, including this one, from one codebase via `NEXT_PUBLIC_BOOK_ID`). This project strips that down to a single dedicated deployment for Industrial Campus — `lib/books/config.ts` and `lib/book-data.ts` no longer branch on book id.
- When adding PDF rendering or chat/voice integration changes, verify it actually works in a running dev server before calling it done — these are UI-heavy features that don't get meaningfully validated by type-checking alone.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
