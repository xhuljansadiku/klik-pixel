# Illyrian Pixel Design System

This file is the single reference for visual consistency across the site.

## Core Principles

- Keep interfaces clean, conversion-focused, and easy to scan.
- Use one dominant primary action per section.
- Prefer reusable classes over page-specific overrides.
- Keep motion subtle; prioritize clarity over effects.

## Design Tokens

- **Primary brand gold:** `--brand-illyrian`
- **Primary text:** `--text`
- **Background base:** `--bg`, `--hero-bg`
- **Muted text:** `--muted`, `--hero-muted`
- **Border token:** `--border`
- **UI font stack:** `--font-ui`
- **Display font stack:** `--font-display`
- **Hero boutique font:** `--font-hero-boutique`

## Typography Rules

- Use sentence case for most CTA labels.
- Keep heading hierarchy strict: one `h1` per page, descending `h2`/`h3`.
- Favor concise copy and measurable outcomes in section intros.

## Button System

Use these as canonical patterns:

- **Primary button:** solid gold background, dark text, rounded pill shape.
- **Ghost/secondary button:** light/outlined variant for secondary actions.
- **Text CTA:** inline link with subtle underline for tertiary actions.

### Button Specs

- Radius: `999px`
- Min height: `44px` to `52px` depending on context
- Horizontal padding: `28px` to `32px`
- Font: Plus Jakarta Sans / Inter, weight 600
- Hover: color/border/shadow change only (no jumpy transforms)
- Focus: visible outline with brand-tinted contrast

## Component Rules

- Cards: soft glass or clean surface with clear border separation.
- Nav and footer: shared partials are the source of truth.
- Service cards: static premium layout; avoid unnecessary animation.

## UX Flow Rules

- Each page must provide:
  - clear value proposition above the fold,
  - one primary CTA path,
  - proof/clarity blocks before final CTA.
- Keep legal and utility pages task-oriented with clear exit paths.

## Content Consistency

- Use consistent CTA verb: **Kërko ofertë** for primary commercial actions.
- Keep Albanian orthography correct (`Ç`, `ë`, punctuation, accents).
- Avoid repeating generic blocks across service pages; keep each page specific.

## Governance

- SCSS partials are the editable source.
- Build outputs (`style.css`, `style.min.css`) are generated artifacts.
- Any new component should be added to styleguide preview and documented here.
