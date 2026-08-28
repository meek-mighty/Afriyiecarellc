# Afriyie Care — Caregiving-Only Website

Plain HTML/CSS/JS. No build step, no framework — upload these files to
any static host (Netlify, GoDaddy, cPanel, GitHub Pages, etc.) and it
just works.

## Files
- `index.html` — the page (links to external css/js — use this for hosting)
- `index-standalone.html` — same page with CSS inlined into one file, handy for quick previews
- `css/styles.css` — all styling, colors, and animations
- `js/script.js` — nav, scroll reveal, marquee, magnetic buttons, contact form
- `images/` — caregiving photos + `logo.jpeg` (now shown in the header, footer, and browser tab)
- `favicon.ico`, `site.webmanifest` — browser tab icon / "add to home screen" icon, built from `logo.jpeg`
- `robots.txt`, `sitemap.xml` — tell Google/Bing the site exists and should be indexed

## ⚠️ Before you upload: set your real domain
The SEO tags (canonical URL, Open Graph, sitemap.xml, robots.txt) currently
point at `https://www.afriyiecare.com/` as a placeholder. Once you know your
real domain, find-and-replace that URL across `index.html`, `robots.txt`,
and `sitemap.xml`.

## SEO — what was added
- Keyword-rich `<title>` and meta description covering Rochester, NY and
  nearby towns (Brighton, Irondequoit, Greece, Pittsford, Henrietta, Webster,
  Penfield), plus care-related search terms (in-home care, senior care,
  companion care, home health aide, etc.)
- `robots`, `canonical`, Open Graph, and Twitter card tags so links preview
  nicely when shared
- `geo.region` / `geo.placename` / structured data with real coordinates for
  Rochester, NY
- A `HomeHealthCareService` (schema.org) structured-data block listing the
  business name, phone, email, service area, and hours — this is what lets
  Google show a rich local-business style result
- `robots.txt` + `sitemap.xml` so search engines can crawl and index the site
- The `logo.jpeg` image now appears in the header next to the brand name, in
  the footer, and as the browser tab / bookmark / home-screen icon

## The single most important step for "show up when someone in Rochester searches"
On-page tags alone won't get Afriyie Care into Google's local map pack —
that comes from a **free Google Business Profile** (business.google.com).
Create/claim one with the exact same name, phone number, address/service
area, and website URL used here, verify it, and add a few photos. Do the
same for **Bing Places for Business**. That listing — not the website code —
is what makes the business "pop up" for nearby searchers.

## Contact form
The form posts to Formspree (`https://formspree.io/f/myegpdpl`), which
emails submissions to afriyiecarellc@gmail.com. The first real submission
triggers a one-time confirmation email from Formspree — click the link
in it to activate delivery.

## Hosting
Upload the whole folder (keeping the `css/`, `js/`, and `images/`
subfolders intact) to your host, or drag-and-drop the folder into
Netlify Drop (netlify.com/drop) for instant hosting.
