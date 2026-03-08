# GeoTech Pro Website

## Folder Structure
```
geotech-v2/
├── index.html                  ← Homepage
├── assets/
│   ├── css/
│   │   ├── theme.css           ★ CHANGE COLORS HERE — all 4 themes defined
│   │   ├── main.css            ← Component styles (uses theme variables)
│   │   └── responsive.css      ← All breakpoints (480/576/768/900/1100/1380px)
│   ├── js/
│   │   └── main.js             ← Theme switcher, nav, animations, counters
│   ├── images/                 ← Drop images here
│   └── fonts/                  ← Custom font files (optional)
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── solutions.html
│   ├── products.html
│   ├── case-studies.html
│   ├── contact.html
│   └── careers.html
└── components/
    ├── navbar.html
    ├── footer.html
    └── preloader.html
```

## ★ How to Change Theme

### Option 1 — Hard code a theme (for client delivery)
Open `index.html` and any other page HTML files.
Find line 4: `<html lang="en" data-theme="dark-navy">`
Change `dark-navy` to one of:
- `dark-navy`   → Deep blue/teal (default, dark)
- `light-pro`   → Clean white/blue (professional, light)
- `ocean-teal`  → Dark teal/green (environmental/maritime)
- `carbon`      → Pure black/orange (industrial)

### Option 2 — Let users switch (already built in!)
The live theme switcher widget is already on the page (right side, desktop).
On mobile it appears inside the hamburger menu.
Selection is saved in localStorage across page loads.

### Option 3 — Add a brand-new theme
Open `assets/css/theme.css` and copy any existing `[data-theme="..."]` block.
Change the attribute name and adjust the color variables.
Add the new theme button to the switcher in `index.html`.

## Breakpoints (responsive.css)
| Breakpoint | Target |
|------------|--------|
| 1380px     | Large desktop max-width |
| 1100px     | Small desktop / tablets landscape |
| 900px      | Tablet portrait |
| 768px      | Large mobile / small tablet |
| 576px      | Mobile |
| 480px      | Small mobile |

## Dependencies (CDN — no install needed)
- Bootstrap 5.3.2
- Bootstrap Icons 1.11.3
- jQuery 3.7.1
- Google Fonts: Syne + DM Sans
