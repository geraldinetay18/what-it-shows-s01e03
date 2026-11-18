# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## S01E03 deliverable

The corrected #4471 page is `src/routes/kb/incidents/4471/+page.svx`. Its static desk view is `rendered/kb/incidents/4471/index.html`.

## Build and render

Requires Node.js 22.17 or newer. The exported source uses Svelte components and `.svx` pages; SvelteKit with mdsvex compiles the source and prerenders every KB route.

```sh
npm ci
npm run check
npm run render:kb
```

`npm run render:kb` writes the complete static site, including the generated `rendered/_app/` assets and all four KB routes, into `rendered/`. Treat those files as build output: edit the `.svx`, Svelte, and data sources, then rerun the renderer rather than hand-editing HTML. Preview the output with any static HTTP server rooted at `rendered/`.
