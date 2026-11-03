# SFBrews

Small-batch homebrewery journal, recipe library, split-batch experiment log, and BJCP competition ledger built with [Astro](https://astro.build/).

---

## Quick Start: Adding Recipes & Blog Posts

Starter copy-paste templates live in the [`_templates/`](./_templates/) folder (Astro ignores `_templates/` during builds so blank templates won't appear on your live site):

| Template File | Use For | Category Tag |
| :--- | :--- | :--- |
| [`_templates/recipe-template.md`](./_templates/recipe-template.md) | Full Beer Recipes (auto-renders grist, hops, mash, water & SRM color) | `category: "recipe"` |
| [`_templates/brewday-template.md`](./_templates/brewday-template.md) | Grain-to-Glass Brew Day Logs (timeline + target vs. actual numbers) | `category: "brewday"` |
| [`_templates/experiment-template.md`](./_templates/experiment-template.md) | Split-Batch Experiments & Triangle Tests | `category: "experiment"` |
| [`_templates/competition-template.md`](./_templates/competition-template.md) | BJCP Competition Reports & Scoresheet Breakdowns | `category: "competition"` |
| [`_templates/blog-news-template.md`](./_templates/blog-news-template.md) | General Blog Posts, Gear Upgrades & Brewhouse News | `category: "news"` |
| [`_templates/data-snippets.md`](./_templates/data-snippets.md) | Copy-paste snippets for the Homepage Taplist & Competition Ledger | — |

### How to Publish a New Post
1. Copy the template you want from `_templates/` into **`src/content/posts/`**.
2. Rename the file using lowercase words and hyphens (e.g. `src/content/posts/winter-baltic-porter-recipe.md`). The filename becomes the page URL.
3. Fill in the top settings block (between the `---` lines) and write your post below in Markdown.
4. Commit and push to `main`—GitHub Actions will automatically build and deploy the updated site.

---

## Updating Other Pages

- **Homepage Live Taplist & Fermenters:** Edit [`src/data/taplist.ts`](./src/data/taplist.ts)
- **Competition Ledger & Medal Tally:** Edit [`src/data/competitions.ts`](./src/data/competitions.ts)
- **About & Equipment Page:** Edit [`src/pages/about.astro`](./src/pages/about.astro)

---

## Local Development Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local preview server at `http://localhost:4321/sfbrews` |
| `npm run build` | Builds the production site to `./dist/` (and validates all recipe/post schemas) |
| `npm run preview` | Previews the production build locally |
