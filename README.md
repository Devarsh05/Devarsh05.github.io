# Personal Portfolio (Static)

A modern, responsive portfolio website you can deploy on GitHub Pages. Built with vanilla HTML/CSS/JS for maximum simplicity and fast loads.

## Features
- Smooth scrolling navigation and sticky header
- Hero, Expertise, Projects, About, Experience, Contact sections
- Responsive cards and elegant dark gradient theme
- Lightweight SVG illustration and favicon (no heavy assets)
- Accessible skip link, proper landmarks, and keyboard-friendly nav

## Getting Started

1. Edit your details in `index.html`:
   - Name, role, and section content
   - Update project cards, links, and social profiles
   - Replace `resume.pdf` with your file or remove the button
2. Customize styles in `styles.css` if desired.
3. Optionally update icons/images to your own assets.

## Run Locally
Just open `index.html` in your browser, or serve the folder with any static server.

```bash
# Python 3
python -m http.server 8080
# then open http://localhost:8080
```

## Deploy to GitHub Pages

Option A — Main branch
- Push this folder as your repository root
- Add `.nojekyll` (already included)
- In your repo: Settings → Pages → Build and deployment:
  - Source: Deploy from branch
  - Branch: `main` (or `master`) / root
- Wait 1–2 minutes for the site to publish

Option B — `docs/` folder
- Move all files into a `docs/` directory
- Settings → Pages → Source: `main` → `/docs`

Your site will be available at:
```
https://<your-username>.github.io/<your-repo-name>/
```

## Custom Domain (optional)
Create a `CNAME` file in the repo root with your domain, e.g.
```
example.com
```
Point DNS `A`/`ALIAS`/`CNAME` records to GitHub Pages per their docs.

## License
MIT — do anything, just keep the license notice.


