# AGENTS

## Project overview
- Repo: RonyDevKit, Next.js App Router + TypeScript.
- UI uses Tailwind CSS utility classes.
- Path alias `@/*` maps to `src/*`.
- Node.js 18.17+ and pnpm recommended.

## Quick start
- Install deps: `pnpm install`
- Dev server: `pnpm dev`
- Production build: `pnpm build`
- Start prod server: `pnpm start`

## Build, lint, test
- Build (required before release): `pnpm build`
- Lint: `pnpm lint`
- Tests: none configured (no `test` script).
- Single test: not available; add a test runner first.
- If adding tests, document how to run one file.

## Repository structure
- App Router pages live in `src/app/**/page.tsx`.
- Shared components in `src/components`.
- Tool definitions in `src/lib/tools.ts`.
- Static assets in `public`.

## Conventions from existing code
- TypeScript everywhere; keep `strict` mode clean.
- Use function components and named exports where possible.
- Default exports used for Next.js pages/layouts.
- Client components declare "use client" at top.
- Use Tailwind class strings for styling.
- Use Next.js helpers (`next/link`, `next/navigation`).

## Imports
- Order: external packages, then internal alias (`@/`), then relative.
- Keep import groups separated by blank lines when it helps readability.
- Prefer `@/` alias for internal modules over long relative paths.
- Use type-only imports with `import type { ... }`.
- For local components in same folder, use `./Component`.

## Formatting
- Use 2-space indentation.
- Use double quotes for strings (matches existing files).
- Trailing commas on multiline objects/arrays.
- Keep JSX props on multiple lines when long.
- Keep Tailwind class strings readable; break long strings.

## Naming
- Components: `PascalCase`.
- Hooks: `useSomething`.
- Files: `PascalCase.tsx` for components, `page.tsx` for routes.
- Variables/functions: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` only when truly constant.

## Types
- Prefer explicit types for public exports.
- Leverage inferred types for local variables.
- Avoid `any`; use `unknown` and narrow when needed.
- For props, define interfaces or type aliases.

## React/Next.js patterns
- Keep server components as default; add "use client" only when needed.
- Use `Metadata` export for page metadata.
- Prefer `Link` over anchor tags for internal navigation.
- Use `usePathname` for active nav state.
- Favor simple, stateless components.

## Error handling
- Validate user input before processing.
- Prefer graceful UI feedback over throwing.
- For async operations, use try/catch and surface errors in UI.
- Avoid console noise; log only for debugging.

## Tool pages
- Tools live in `src/app/tools/<slug>/page.tsx`.
- Keep tool UI self-contained in its page.
- If a tool needs shared logic, place in `src/lib`.
- Update tool list in `src/lib/tools.ts`.
- Update sidebar icons in `src/components/ToolIcon.tsx`.
- Add icon component under `src/components/icons`.
- Export new icon in `src/components/icons/index.tsx`.

## Styling
- Use Tailwind utility classes; avoid custom CSS.
- Shared styles live in `src/app/globals.css` if needed.
- Prefer semantic grouping of class names.
- Keep colors and spacing consistent with existing classes.

## Accessibility
- Provide labels for inputs and controls.
- Ensure buttons have clear text or `aria-label`.
- Maintain focus styles and keyboard navigation.

## Linting
- ESLint via `eslint-config-next`.
- Fix lint errors before commit.
- Avoid unused imports/vars.

## Git workflow
- Keep commits focused and descriptive.
- Update README only when behavior changes.

## If adding new dependencies
- Use `pnpm add` or `pnpm add -D`.
- Confirm the package is maintained.
- Avoid large UI libraries unless required.

## Environment
- Runtime: Next.js 16.x, React 19.x.
- Uses `jose` for JWT operations.

## Cursor/Copilot rules
- No `.cursor/rules`, `.cursorrules`, or Copilot instructions found.
- If added later, update this file to include them.

## Notes for agents
- Prefer minimal, surgical changes.
- Avoid changing formatting in unrelated files.
- Do not add new tooling unless requested.
- Keep documentation updates succinct.
- When unsure, ask the user before big refactors.

## Running commands
- Use `pnpm` for script execution.
- `pnpm dev` starts app at `http://localhost:3000`.
- `pnpm lint` checks code style.
- `pnpm build` builds production output.
- `pnpm start` serves the build.

## Single test guidance (future)
- Add a test script (e.g., `vitest` or `jest`) if needed.
- Provide a `pnpm test -- <pattern>` example.
- Document any test directory conventions.

## File creation checklist
- Add new tools to `src/lib/tools.ts`.
- Create icon and export it.
- Register icon in `ToolIcon`.
- Add new tool page in `src/app/tools/<slug>/page.tsx`.

## Update discipline
- Keep type signatures stable where possible.
- Avoid breaking URL slugs for tools.
- Maintain privacy/offline behavior.

## Contact
- No additional maintainer notes in repo.
- Open a PR for large changes.
