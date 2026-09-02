<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Component sourcing — read from builderio-components/ first

`builderio-components/` (sibling directory, separate git repo) is the
**real** CommonUI component library: dual Vue 3 + React, PrimeVue/PrimeReact-based,
published as `@ist-group/commonui-components-react` / `-vue`. This app is a
separate prototype, not that library — but before hand-rolling any UI piece
(buttons, dropdowns, tables, form fields, menus, etc.) with Tailwind
utilities here, check `builderio-components/components/react/src/components/`
for the real `Cui*` component: its actual markup, class names, props, and
design tokens. Match those exactly rather than inventing a
visually-similar approximation from scratch.

**Never modify anything inside `builderio-components/`** — it's a
separate, independently-versioned, real project. Read-only reference only.
It's also excluded from this app's own tooling (Tailwind's `@source` scan
in `app/globals.css`, and `tsconfig.json`'s `exclude`) because scanning its
class strings breaks the build — don't remove those exclusions.

## Every documentation page needs CuiAnchorNav

Every page under `app/documentation/**` must show an "on this page"
anchor nav — illustrates the page's length/structure at a glance, and is
required regardless of how short the page currently is (a page can grow
sections later; wire it up up front rather than remembering to add it).

Wrap the page's body content (not the hero) in
`components/documentation/DocPageBody.tsx`, e.g.:

```tsx
<DocsSidebarShell>
  <section>{/* hero — outside DocPageBody */}</section>
  <DocPageBody>
    <div className="mx-auto max-w-[760px] px-10 pt-12 pb-24">
      {/* h2-sectioned body content */}
    </div>
  </DocPageBody>
</DocsSidebarShell>
```

`DocPageBody` wires up `hooks/useAutoAnchorNav.ts`, which reads the
page's own `<h2>` headings as the section list (slugifying ids as
needed) — **do not** hand-write a separate `items` array; headings are
the single source of truth, so the nav can never drift out of sync with
the content. Adding, renaming, or reordering `<h2>` sections is enough;
the anchor nav updates itself.

`components/CuiAnchorNav.tsx` is a port of the real `CuiAnchorNav` from
`builderio-components/components/react/src/components/CuiAnchorNav/` —
same scroll-spy/click-to-scroll logic, CUI's CSS custom properties
swapped for this app's `--color-cui-*` / `--radius-cui-*` tokens. Don't
re-invent this component elsewhere in the app; import it.

