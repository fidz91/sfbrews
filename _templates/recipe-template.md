---
# ============================================================================
# RECIPE POST TEMPLATE
# Copy this file into `src/content/posts/` and rename it (e.g. `my-new-recipe.md`).
# The filename becomes the page URL: /sfbrews/posts/my-new-recipe
# ============================================================================

title: "Beer Name: Recipe Title & Style Overview"
subtitle: "A short one-sentence hook describing the recipe concept or key ingredients."
description: "1–2 sentence summary shown on recipe cards and search results."
pubDate: 2026-10-27
# updatedDate: 2026-11-01        # Optional: uncomment if updating an older recipe
category: "recipe"               # Keeps this in the Recipes index and Brew Journal
featured: true                   # Set true to feature on the homepage
batchNumber: "Batch #050"
beerStyle: "Style Name — BJCP 00A"
readingTime: "5 min read"
# heroImage accepts EITHER a filename uploaded to `_images/` (e.g. "my-beer.jpg") OR a full URL ("https://...")
heroImage: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1200&q=80"
# heroCaption: "Optional caption under the hero image"
# gallery:                       # Optional: list filenames from `_images/` or URLs for a photo gallery
#   - image: "mash-photo.jpg"
#     caption: "Recirculating the mash"
tags: ["style-tag", "hop-name", "yeast-strain", "recipe"]

recipe:
  batchSize: "21.0 L (5.5 gal)"
  boilTime: "60 min"
  efficiency: "75%"
  og: 1.048                      # Original Gravity (number, e.g. 1.048)
  fg: 1.012                      # Final Gravity (number, e.g. 1.012)
  abv: 4.7                       # ABV % (number, e.g. 4.7)
  ibu: 30                        # IBU (number, e.g. 30)
  srm: 8.5                       # SRM color (number, 2 = pale straw, 15 = amber, 35 = stout)

  fermentables:
    - name: "Base Malt Name (e.g. Crisp Maris Otter)"
      weight: "4.00 kg"
      percentage: 88.0
      lovibond: "3.0 °L"
      notes: "Biscuity backbone and foundation"
    - name: "Specialty Malt 1"
      weight: "0.35 kg"
      percentage: 8.0
      lovibond: "45 °L"
      notes: "Light caramel and foam stability"
    - name: "Specialty Malt 2"
      weight: "0.18 kg"
      percentage: 4.0
      lovibond: "2.0 °L"
      notes: "Head retention and body"

  hops:
    # Allowed `use` values: "Boil" | "First Wort" | "Flameout" | "Whirlpool" | "Dry Hop" | "Mash Hop"
    - name: "Bittering Hop Name"
      weight: "30 g"
      alphaAcid: "5.5%"
      timing: "60 min"
      use: "Boil"
      ibuContribution: 22
    - name: "Late / Aroma Hop Name"
      weight: "25 g"
      alphaAcid: "5.5%"
      timing: "10 min"
      use: "Boil"
      ibuContribution: 8
    - name: "Whirlpool / Dry Hop Name"
      weight: "40 g"
      alphaAcid: "5.5%"
      timing: "20 min @ 78°C"
      use: "Whirlpool"
      ibuContribution: 0

  yeast:
    name: "Yeast Strain Name"
    lab: "Wyeast / White Labs / Imperial / Lallemand / Fermentis"
    code: "Strain Code (e.g. WY1469 / US-05)"
    attenuation: "75%"
    tempRange: "18.0°C – 20.0°C"
    pitchNotes: "Starter size, oxygenation, and temperature ramp schedule."

  mash:
    - step: "Saccharification Rest"
      temp: "66.0°C"
      duration: "60 min"
      notes: "Single infusion mash with continuous recirculation."
    - step: "Mash Out"
      temp: "75.5°C"
      duration: "10 min"
      notes: "Raise to halt enzymatic activity before sparging."

  waterProfile:
    profileName: "Target Water Profile Name"
    ca: 90
    mg: 10
    na: 15
    cl: 80
    so4: 120
    hco3: 30
    mashPh: 5.30
    notes: "Sulfate-to-chloride balance and acid/salt additions."

  fermentationNotes: "Pitch at 18°C, hold for 3 days, then let free-rise to 20°C for diacetyl rest. Cold crash to 2°C and package at 2.2 volumes CO2."
---

Write your introduction paragraph here—what inspired this recipe, what style guidelines or commercial benchmarks you were aiming for, and how this iteration came together.

## Grist & Malt Philosophy

Explain why you chose the base malt and specialty grains:
- **Base Malt (`88%`)**: What character does it bring?
- **Specialty Grains (`12%`)**: How do they contribute to color, body, or foam stability?

## Hop Schedule & Water Chemistry

Describe your bittering and aroma strategy, along with why your water profile (`SO₄:Cl` ratio and target mash pH) suits this style.

## Fermentation & Conditioning

Walk through yeast pitch rate, fermentation temperature control, spunding/carbonation level, and conditioning time.

## Tasting Notes & Next Iteration Tweaks

- **Appearance**: Color, clarity, and head retention.
- **Aroma**: Malt, hop, and yeast aromatics.
- **Flavor & Mouthfeel**: Balance, finish, and body.
- **What I'd Change Next Time**: Any tweaks planned for the next batch.
