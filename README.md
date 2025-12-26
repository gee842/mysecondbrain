# My Second Brain - Landing Page

A standalone static landing page for My Second Brain, built with SvelteKit and designed to deploy directly to GitHub Pages.

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under "Build and deployment", select **GitHub Actions**
4. Push to `main` branch - the site will auto-deploy

### Option 2: Deploy to username.github.io/repo-name

If deploying to a subdirectory (e.g., `yourname.github.io/mysecondbrain`):

1. Edit `svelte.config.js` and set `base: '/mysecondbrain'` (or your repo name)
2. Push to GitHub
3. Enable GitHub Pages with Actions

### Option 3: Custom Domain

1. Add your custom domain in GitHub Pages settings
2. Create a `CNAME` file in `static/` with your domain
3. Leave `base` empty in `svelte.config.js`

## Project Structure

```
mysecondbrain-landing/
├── src/
│   ├── lib/
│   │   ├── components/       # Svelte components
│   │   │   ├── landing/      # Landing page sections
│   │   │   └── VoronoiBackground.svelte
│   │   └── data/             # Static data (pricing, FAQs)
│   ├── routes/
│   │   ├── +layout.svelte
│   │   └── +page.svelte      # Main landing page
│   ├── app.css               # Global styles + themes
│   └── app.html
├── .github/workflows/
│   └── deploy.yml            # GitHub Pages workflow
├── svelte.config.js          # SvelteKit + adapter-static config
└── package.json
```

## Tech Stack

- **SvelteKit** with static adapter
- **Tailwind CSS** for styling
- **d3-force** + **d3-delaunay** for interactive visualizations
- **Space Grotesk** font

## License

MIT
