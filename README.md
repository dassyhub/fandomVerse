# FandomVerse

FandomVerse is a React single-page fandom discovery platform based on the TechWhiz / Aptech project specification.

## Team architecture

- `src/components/` — reusable UI and layout components
- `src/pages/` — feature/page-level screens
- `src/context/` — shared client-side state
- `src/hooks/` — reusable hooks
- `src/utils/` — helper functions
- `public/data/` — pre-populated JSON datasets
- `public/images/` — image assets

## Suggested team ownership

1. Foundation / UI system — Home, layout, shared components
2. Discovery — categories, search, filters, sorting
3. Content & Characters — articles, gallery, video/audio, characters
4. Events & Releases — events, trailers, Release Radar, Fan Pulse
5. Store & Bookmarks — merchandise, product details, cart, bookmarks
6. Innovation — chatbot, Fandom Match, personalized discovery

## Git workflow

Do not work directly on `main`.

Suggested branches:
- `feature/home-foundation`
- `feature/discovery-search`
- `feature/content-characters`
- `feature/events-releases`
- `feature/store-bookmarks`
- `feature/chatbot-discovery`

Create a pull request when a feature is ready for review.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The project is intentionally a clean starter architecture. Add the team's actual designs, content, logic, and assets rather than treating this scaffold as a finished submission.
