# FandomVerse

FandomVerse is a responsive single-page fandom discovery portal built for the TechWhiz / Aptech Web Innovation Unleashed project. It brings Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga discovery into one interface with content browsing, search, media, character profiles, events, releases, merchandise, bookmarks, a temporary cart, a rule-based chatbot, and a responsive navigation system.

## Live
https://fandom-verse-e.vercel.app/

## Project purpose

### Problem definition

Fandom information is often spread across separate fan sites, media platforms, event pages, social channels, and stores. FandomVerse addresses that fragmentation by providing one browser-based portal where visitors can discover multiple fandom categories and move between related content without leaving the application.

### Proposed solution

FandomVerse is implemented as a React single-page application. Pre-populated JSON datasets provide the content shown by the website, while browser storage is used only for client-side features such as bookmarks, temporary cart state, theme preference, visitor counting, and the local demonstration account. No application database or server-side content store is required.

## SRS compliance scope

The implementation follows the supplied FandomVerse SRS as the requirements source. The project covers:

- Seven fandom category hubs
- Global client-side search
- Category, type, and tag filtering
- Alphabetical, newest, popularity, and featured sorting where applicable
- Articles, videos, audio, galleries, and trailers
- Character profiles and category/franchise filtering
- Event highlights
- Release Radar
- Merchandise showcase and temporary cart
- Bookmarks, session notes, and bookmark export
- Rule-based chatbot with quick replies and text input
- About Us and Contact Us pages
- Browser geolocation and Google Maps viewing on the Contact page
- Visitor counter and real-time local clock/date
- Breadcrumb navigation
- Dummy/local authentication UI
- Responsive layouts and animated interactions
- Dark and light themes
- Vercel-friendly SPA routing

The SRS also requires safe use, accessibility, user-friendliness, reliable operation, performance, capacity, availability, and browser compatibility. These are treated as implementation requirements rather than optional visual enhancements.

## Architecture

The project is intentionally frontend-only.

- `src/pages/` — route-level screens
- `src/components/` — reusable interface components
- `src/context/` — shared browser-side state for theme, bookmarks, and cart
- `src/hooks/` — reusable client-side hooks
- `src/constants/` — category metadata and visual mappings
- `src/utils/` — formatting helpers
- `public/data/` — read-only JSON datasets used by the application
- `public/images/` — local visual assets
- `public/media/` — local audio/video demonstration media

### High-level flow

Visitor
→ Intro screen
→ React Router
→ Shared Navbar / page / Chatbot / Footer
→ Local JSON datasets
→ Browser-side state where required

There is no server-side database in the application architecture.

## Data and storage model

The website reads pre-populated JSON files from `public/data/`.

The browser may store temporary/client-side state for features explicitly designed around the browser:

- Theme preference: local storage
- Bookmarks: local storage
- Bookmark notes: session storage so personal notes remain session-only
- Temporary cart: local storage for the demo experience
- Visitor count: local storage with a session guard
- Demo account: local storage
- Demo login session: session storage

The website does not write changes back into the JSON files.

## Functional design

### Home

The Home page provides the FandomVerse introduction, a rotating featured area, category navigation, and trending content. The intro animation runs when the application is loaded/refreshed and then hands control to the SPA.

### Category hubs

Each category loads its own JSON dataset and related characters, events, merchandise, and releases. Visitors can filter content by type and by available tags. Sorting supports featured, newest, A–Z, and popularity ordering using data fields rather than presentation-only controls.

### Search

Search is performed in the browser over the available category content, characters, events, merchandise, and releases. Results can be narrowed by content group and fandom category.

### Media

Article, video, audio, and gallery routes resolve records from the local JSON datasets. Video/trailer records can use responsive embedded URLs, while local media is supported through local files.

### Characters

The character directory loads the JSON character dataset and supports category and franchise filtering. Character profiles expose the series, biography, and traits associated with each record.

### Events and releases

Events are loaded from `events.json` and grouped by category. Release Radar loads `releases.json` and provides category filtering for upcoming release records.

### Merchandise and cart

Merchandise records are loaded from `merch.json`. Visitors can open product details, add items to the temporary cart, adjust quantities, remove items, and view a JavaScript-calculated total. Checkout and payment are intentionally not implemented.

### Chatbot

The chatbot is a pre-scripted assistant. It does not call a live AI service. It provides quick replies, accepts typed questions, and links visitors to relevant areas of the website.

### Bookmarks

Supported content can be bookmarked and removed. The Bookmarks page provides filtering, navigation back to saved records, session-only notes, clearing, and JSON export.

### Contact and location

The Contact page provides a demonstration contact form and an explicit browser-geolocation action. Location is requested only after user interaction. Permission denial and unsupported-browser cases are handled. When coordinates are available, visitors can open them in Google Maps and view the map inside the page.

## Non-functional requirements

### Safe to use

The application does not intentionally trigger downloads or execute downloaded files. Bookmark export occurs only after an explicit user action.

### Accessibility

The interface uses semantic controls, labels, meaningful alternative text where content is visual, keyboard-focus states, accessible dialog attributes, button labels, and reduced-motion support. Interactive controls are designed to remain usable at smaller viewport sizes.

### User-friendliness

Navigation is shared across routes, breadcrumbs provide context, empty states explain what happened, filters are visibly selected, and the mobile navigation provides the same major destinations as the desktop experience.

### Operability

Interactive requirements are implemented as actual client-side behavior rather than static visual controls. Search, filtering, sorting, bookmarks, notes, export, cart operations, chatbot input, geolocation, theme switching, and dummy authentication all have application logic behind them.

### Performance

The project uses a static frontend architecture, local JSON, lazy-loaded content images where appropriate, responsive media containers, and CSS-based motion rather than adding an unnecessary animation framework. The build should be tested as a production Vite build before submission.

### Capacity and availability

The application is designed as a static SPA, making it suitable for CDN-style hosting such as Vercel without requiring an application server or database for normal browsing.

### Browser compatibility

The interface is designed around current evergreen browsers and standard browser APIs used by the project. Geolocation remains dependent on browser permission and support.

## Responsive design

The layout has dedicated responsive behavior for:

- Desktop
- Laptop
- Tablet
- Small mobile screens
- Very narrow screens

The Navbar has a desktop navigation system and a separate animated mobile menu. The mobile menu includes search, category links, theme control, authentication links, bookmarks, cart access, and the secondary navigation destinations.

## Animation and motion

FandomVerse uses a consistent motion language across the interface:

- Intro reveal and loading animation
- Page entrance transitions
- Staggered content cards
- Hero image crossfades and subtle scale movement
- Hover elevation and image movement
- Dropdown transitions
- Mobile menu transitions
- Chatbot entrance and launcher motion
- Trailer dialog transitions
- Focus and reduced-motion support

Animations are intentionally restrained so they support discovery rather than interfere with reading or navigation.

## Installation

Requirements:

- Node.js with a current LTS release
- npm

Install the project dependencies with `npm install`.

Start the development server with `npm run dev`.

Create a production build with `npm run build`.

Preview the production build with `npm run preview`.

## Vercel deployment

Recommended Vercel settings:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Root Directory: project root, where `package.json` is located

`vercel.json` contains the SPA rewrite so direct navigation or browser refreshes on React routes can resolve to `index.html`.

## Testing checklist

Before final submission, manually test the following in a production build:

### Navigation

- Home
- Explore
- All seven category hubs
- Search
- Characters
- Events
- Release Radar
- Store
- Cart
- Bookmarks
- Fandom Match
- Fan Pulse
- About
- Contact
- Sitemap
- Login
- Sign Up

### Interactions

- Navbar desktop navigation
- Navbar mobile menu
- Navbar search
- Theme switch
- Dropdowns
- Search filters
- Category filters
- Category tags
- Category sorting
- Character filters
- Gallery controls
- Trailer/video embeds
- Audio playback
- Bookmarks
- Bookmark notes
- Bookmark export
- Cart quantity changes
- Cart total
- Chatbot quick replies
- Chatbot text input
- Contact form
- Browser location permission
- Dummy signup/login

### Responsive checks

Test approximately at 320px, 375px, 390px, 414px, 768px, 1024px, 1280px, and 1440px widths.

Pay particular attention to the Navbar, search controls, cards, filters, dialogs, forms, chatbot, footer, and media sections.

## Content and licensing assumptions

The SRS requires original, royalty-free, non-copyrighted, or appropriately licensed content. Existing assets should therefore be reviewed by the team before competition submission. Any teammate-supplied artwork, external trailer, logo, photograph, or other media must have a permitted basis for use in the submitted project.

The application architecture does not require downloading external media. Embedded video URLs can be used where their use is appropriate and permitted, while local assets should be limited to approved project material.

Where a final asset has not yet been approved, the data structure is designed so an approved local asset can replace it without changing the page architecture.

## Assumptions

1. The project is demonstrated as a frontend-only SPA.
2. JSON files are read-only content sources.
3. Browser storage is used only for client-side demonstration features.
4. The cart is temporary and does not perform checkout or payment.
5. Authentication is intentionally a local demonstration and is not a production identity system.
6. The chatbot is rule-based and does not use a live external AI service.
7. Browser geolocation is optional and requires explicit visitor permission.
8. External media must be reviewed for licensing/permission before final submission.
9. The final production build and manual browser checks should be completed on the team's development machine before the competition demonstration.

## Project documentation and deliverables

The supplied SRS states that project documentation should cover the problem definition, design specifications, diagrams such as flowcharts and data-flow diagrams, test data used, and mandatory installation instructions. It also states that documentation is an important project deliverable and should be comprehensive without embedding source code.

This README therefore documents:

- Problem definition
- Proposed solution and scope
- Architecture and design structure
- Data/storage approach
- Functional feature behavior
- Non-functional requirement approach
- Responsive and animation design
- Installation and deployment instructions
- Testing checklist
- Content/licensing assumptions
- Project assumptions

For the final academic submission, the team should also maintain the separate project report requested by the SRS and the mandatory demonstration video showing the website and its functionality.

## Final pre-submission checks

Before submitting FandomVerse:

1. Run the production build successfully.
2. Test the deployed Vercel site directly, including refreshing nested routes.
3. Test the Navbar on mobile and tablet widths.
4. Test both light and dark themes on every major page.
5. Test every required interactive feature.
6. Replace any unapproved media with approved assets.
7. Confirm all external media links are valid and permitted.
8. Confirm the demonstration video covers the required functionality.
