# Private Image Upload Folder (`_images/`)

Drop any of your own photos (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, `.svg`) into this `_images/` folder!

Because this folder starts with an underscore (`_images/`), **Astro keeps it private**: unreferenced draft photos stay private in your repo, and only the images you actually use are bundled and optimized when the site builds.

---

## 3 Easy Ways to Use Images Uploaded Here

### 1. Automatic Filename Matching (Zero Config!)
Name your image file to match the page or post slug, and the website will pick it up **automatically** without you needing to edit any code:
- **Homepage Hero Banner**: Drop `_images/hero.jpg` (or `.png` / `.webp`) here to automatically replace the homepage hero background.
- **Any Blog / Recipe Post**: Name the image after the post's markdown filename—for example:
  - `_images/dark-rye-saison.jpg` → automatically used for `src/content/posts/dark-rye-saison.md`
  - `_images/oatmeal-stout.jpg` → automatically used for `src/content/posts/oatmeal-stout.md`
  - `_images/brewzilla-4-1-1-hands-on.jpg` → automatically used for `src/content/posts/brewzilla-4-1-1-hands-on.md`
- **About Page Banner**: Drop `_images/about.jpg` here to automatically display a banner photo on the About page.

### 2. Central Image Dashboard (`src/data/images.ts`)
Open [`src/data/images.ts`](../src/data/images.ts) to change any image across the whole site in one place—using either a filename from this `_images/` folder (e.g. `'my-photo.jpg'`) or an external URL (`'https://...'`).

### 3. In Any Post's Frontmatter or Markdown Body
In any post inside `src/content/posts/*.md`:
- **Frontmatter `heroImage`**:
  ```yaml
  # Reference a file in `_images/` by filename:
  heroImage: "my-brewday-photo.jpg"
  # OR reference any external URL:
  heroImage: "https://images.unsplash.com/..."
  ```
- **Inside the Markdown Article Body**:
  ```markdown
  ![Mash recirculation](my-mash-photo.jpg)
  ```
