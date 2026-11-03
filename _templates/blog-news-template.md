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

To use your own photos instead of Unsplash links:
1. Drop your image file into the `public/images/` folder (e.g. `public/images/my-brewday.jpg`).
2. For `heroImage` at the top of the file, use `"/sfbrews/images/my-brewday.jpg"`.
3. Inside the post body, embed images with:
   `![Description of photo](/sfbrews/images/my-brewday.jpg)`
