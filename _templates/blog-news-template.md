---
# ============================================================================
# GENERAL BLOG / BREWHOUSE NEWS TEMPLATE
# Copy this file into `src/content/posts/` and rename it (e.g. `my-blog-post.md`).
# Use this for general blog posts, equipment upgrades, seasonal plans, or stories
# that don't need a full structured recipe sheet.
# ============================================================================

title: "Your Blog Post Title Here"
subtitle: "An optional one-sentence subtitle that appears right below the main heading."
description: "A short 1–2 sentence summary for the Brew Journal card preview."
pubDate: 2026-10-27
category: "news"                 # Allowed: "news" | "brewday" | "recipe" | "experiment" | "competition"
featured: false                  # Set true to feature on the homepage
readingTime: "4 min read"
heroImage: "https://images.unsplash.com/photo-1505075106905-fb052892c116?auto=format&fit=crop&w=1200&q=80"
# heroCaption: "Optional photo caption"
tags: ["news", "brewhouse", "seasonal-update"]
---

Write your opening paragraph here. You can use standard Markdown formatting throughout the post:

## Section Heading

Write paragraphs as normal text. Use `**bold text**` for emphasis, `*italics*` for subtle callouts, and `` `inline code` `` for numbers like `66.0°C` or `1.048 OG`.

### Bullet Lists & Notes

- **First Point**: Details here.
- **Second Point**: Details here.
- **Third Point**: Details here.

> "Use a `>` symbol at the start of a line to create a styled pull-quote or tasting note callout."

## Adding Your Own Photos

You can use either a **private folder upload** (`_images/`) or any **external URL** (`https://...`):
1. **Private Folder (`_images/`)**:
   - Drop your image file into the top-level `_images/` folder (e.g. `_images/my-brewday.jpg`).
   - If you name the image to match your post filename (e.g. `_images/my-blog-post.jpg`), it will be used as the hero image automatically!
   - Or set `heroImage: "my-brewday.jpg"` at the top of the file, and embed photos inside the post body with `![Description of photo](my-brewday.jpg)`.
2. **External URL**:
   - Paste any full image URL into `heroImage: "https://..."` (or in `src/data/images.ts`).
