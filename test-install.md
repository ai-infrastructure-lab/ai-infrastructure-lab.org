Files used for [ai infrastructure lab website](https://www.ai-infrastructure-lab.org).

## Testing locally on macOS

Prerequisites:

- macOS with Terminal access.
- Node.js 22 LTS or newer. Install with [Homebrew](https://brew.sh/) if needed:

```sh
brew install node
```

Install dependencies:

```sh
corepack enable
corepack prepare pnpm@11.9.0 --activate
pnpm install
```

Start the local development server:

```sh
pnpm dev
```

Open <http://localhost:3007> in a browser.

Run a production build as a quick smoke test:

```sh
pnpm build
```

Preview the production build locally:

```sh
pnpm preview
```

## Syncing Zotero library

Publications are synced from a Zotero collection into `content/publications.json`
at build time.

Required GitHub repository secrets:

- `ZOTERO_LIBRARY_ID`: Zotero user ID or group ID.
- `ZOTERO_COLLECTION_KEY`: Collection key from the Zotero collection URL.

Optional GitHub repository secrets/variables:

- `ZOTERO_API_KEY`: Required for private libraries; optional for public libraries.
- `ZOTERO_LIBRARY_TYPE`: Set as a repository variable to `group` for group
  libraries. Defaults to `user`.
- `ZOTERO_CITATION_STYLE`: Set as a repository variable for another CSL style.
  Defaults to `apa`.

Run the sync locally with:

```sh
ZOTERO_LIBRARY_ID=... ZOTERO_COLLECTION_KEY=... pnpm sync:zotero
```

For a group library:

```sh
ZOTERO_LIBRARY_TYPE=group ZOTERO_LIBRARY_ID=... ZOTERO_COLLECTION_KEY=... pnpm sync:zotero
```
