# ShootNDeliver — Photography Business Website

> **Captured Today. Delivered Tomorrow.**

A premium, single-page photography business website for **ShootNDeliver** — a professional event photography company specializing in weddings, graduations, and functions with 24-hour photo delivery.

## Project layout

```
shootndeliver/
├── index.html          # Page shell (fonts, links to assets)
├── assets/
│   ├── css/main.css    # All styles
│   └── js/main.js      # All behavior
├── scripts/
│   └── dev_server.py   # Optional local dev server (live reload)
├── pyproject.toml      # Python tool metadata for uv
├── uv.lock             # Locked dev dependencies
└── README.md
```

The public site is plain **HTML, CSS, and JavaScript**. Python and uv are only for local development tooling.

**Optional realistic intro:** A filmed clip (person on a bike, taking a photo, etc.) can replace the illustrated intro. Add `assets/video/intro.mp4` and/or `intro.webm` — see `assets/video/README.txt`. Without those files, the existing SVG + polaroid intro is used.

## Features

- **Camera Intro Animation** — SVG camera click → flash → polaroid print (pure CSS, under 4.5s)
- **3D Tilt Service Cards** — Mouse-tracking parallax tilt on hover
- **Floating Hero Elements** — Parallax photo cards + orbiting 3D lens rings
- **Custom Cursor** — Dot + ring cursor with hover interactions
- **Animated Stats Counter** — Numbers count up on page load
- **Infinite Marquee** — Scrolling event types banner
- **SVG Icons** — Clean line icons throughout (no emojis)
- **Film Grain Overlay** — Subtle noise texture for cinematic feel
- **Fully Responsive** — Mobile-first with hamburger menu

## Sections

1. **Hero** — Tagline, CTA button, floating photos, 3D lens animation
2. **Marquee** — Scrolling list of event types
3. **Promise** — USP statement with animated stats (50+ events, 24hr, 100%)
4. **Services** — 6 service cards (Wedding, Graduation, Events, Engagement, Family, Corporate)
5. **Process** — 4-step timeline (Book → Shoot → Edit → Deliver)
6. **CTA** — Call-to-action section
7. **Contact** — Card grid with location, email, phone, availability
8. **Footer** — Brand info, services list, social links

## Tech stack

- **HTML / CSS / JS** — No frontend frameworks or npm packages
- **Google Fonts** — Playfair Display, Outfit, DM Mono
- **uv (optional)** — Locks and runs Python dev dependencies (`livereload` for local serving)

## Quick start

Open `index.html` in a browser, or serve the repo root so asset paths resolve consistently:

```bash
uv sync
uv run python scripts/dev_server.py
```

Then visit [http://127.0.0.1:8000](http://127.0.0.1:8000).

**Windows: `uv` not recognized?** Your terminal often does not see `uv.exe` on `PATH` (stale session, Conda, or Cursor). Use any of these from the project root:

- `python -m uv sync` then `python -m uv run python scripts/dev_server.py`
- `.\uv.bat sync` and `.\uv.bat run python scripts/dev_server.py` (wrapper around `python -m uv`)
- Or reload `PATH` in the current PowerShell, then try `uv` again:

```powershell
$env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [Environment]::GetEnvironmentVariable("Path","User")
```

**Separate from Conda:** This project uses a **local `.venv`** managed by uv, not a Conda env. If your prompt shows something like `(agents_service)`, run `conda deactivate` until that prefix is gone, then run `uv sync` in this folder. To use this env in the terminal: `.\.venv\Scripts\Activate.ps1` (PowerShell). Cursor is configured to prefer `.venv\Scripts\python.exe` for this workspace.

**`failed to locate pyvenv.cfg`:** The `.venv` folder is incomplete (sometimes on Windows after an interrupted sync). Close terminals using this project, delete the `.venv` folder, then create a proper venv and sync again:

```powershell
Remove-Item -Recurse -Force .venv
python -m venv .venv
python -m uv sync
python -m uv run python scripts/dev_server.py
```

**Port already in use (8000):** Stop the other server, or use another port: `$env:PORT=8080; python -m uv run python scripts/dev_server.py` then open `http://127.0.0.1:8080`.

## Deployment

Deploy the **repository root** (or upload `index.html` plus the `assets/` folder) to any static host:

- **GitHub Pages**, **Netlify**, **Vercel**, **Cloudflare Pages**

## Customization

- **Colors** — Edit CSS variables in `:root` in `assets/css/main.css`
- **Contact info** — Update the Contact section in `index.html`
- **Services** — Add or remove cards in `index.html` under Services
- **Behavior** — Edit `assets/js/main.js`

## License

Built for ShootNDeliver. Free to use and modify.
