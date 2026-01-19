# Downtown Riyadh — Interactive Map Experience

> A portfolio-quality web experience showcasing Downtown Riyadh as a modern cultural and economic hub, aligned with Saudi Arabia's Vision 2030.

![Downtown Riyadh](https://img.shields.io/badge/Vision-2030-gold?style=for-the-badge)
![MapLibre GL JS](https://img.shields.io/badge/MapLibre-GL%20JS-blue?style=for-the-badge)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-yellow?style=for-the-badge)

## 🌆 Overview

An immersive, interactive map experience that visualizes the scale, sophistication, and strategic importance of Downtown Riyadh. This project demonstrates modern web cartography, elegant UI design, and thoughtful urban storytelling.

### What It Demonstrates

- **Geospatial Visualization**: Interactive mapping with smooth camera transitions and custom markers
- **Design Excellence**: Dark premium aesthetic with architectural typography
- **User Experience**: Guided tour mode, layer controls, and responsive design
- **Technical Craft**: Clean separation of concerns, modular architecture, vanilla JavaScript

## ✨ Features

### 🗺️ Interactive Map

- **MapLibre GL JS** integration with smooth zooming, panning, and camera transitions
- **Dark premium theme** emphasizing urban density and modern infrastructure
- **Custom markers** with glow effects for key landmarks
- **3D-ready architecture** (prepared for vector tile integration)

### 📍 Key Locations

Highlighted landmarks include:

- **King Abdullah Financial District (KAFD)** — 1.6M sqm financial hub
- **Kingdom Centre** — Iconic 302m tower with sky bridge
- **Al Faisaliah Tower** — Saudi Arabia's first skyscraper
- **Olaya District** — Central business district
- **Diplomatic Quarter** — Masterplanned embassy district
- **Cultural spaces** — Libraries, parks, and entertainment zones

### 🎯 Layer System

- **Landmarks** — Iconic towers and architectural symbols
- **Business Districts** — Financial and commercial zones
- **Culture & Recreation** — Parks, libraries, entertainment

### 🚶 Guided Tour Mode

- **Auto-fly camera** smoothly transitions between landmarks
- **Contextual captions** explain significance (business, culture, history)
- **Auto-advance** with manual navigation controls
- **Keyboard shortcuts** for seamless exploration

### 🌓 Day/Night Toggle

- Switch between dark and light map themes
- Smooth style transitions preserving markers and state

### 🎨 Design Principles

- **Minimal UI** with floating glass-morphic panels
- **Architectural typography** (Inter + IBM Plex Mono)
- **Restrained animations** (no gimmicks, purposeful motion)
- **Fully responsive** (desktop-first, mobile-optimized)

## 🚀 Quick Start

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/map2.git
   cd map2/web
   ```

2. **Serve with any static server**

   Using Python:
   ```bash
   python3 -m http.server 8000
   ```

   Using Node.js:
   ```bash
   npx serve
   ```

   Using VS Code:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### No Build Required

This is a **zero-dependency** frontend application:
- ✅ Pure vanilla JavaScript (ES6+)
- ✅ No npm packages or node_modules
- ✅ CDN-based libraries (MapLibre GL JS)
- ✅ Ready to deploy to any static host

## 📁 Project Structure

```
web/
├── index.html              # Main entry point
├── css/
│   └── style.css           # Complete styling system
├── js/
│   ├── config.js           # Configuration & constants
│   ├── map.js              # Map controller & camera
│   ├── ui.js               # UI interactions & panels
│   ├── tour.js             # Guided tour logic
│   └── app.js              # Application initialization
├── data/
│   └── landmarks.json      # Landmark data & metadata
└── assets/                 # (Future: images, icons)
```

### Architecture

```
┌─────────────────────────────────────────┐
│           RiyadhMapApp (app.js)         │
│    Application orchestration & init     │
└───────────┬─────────────────────────────┘
            │
    ┌───────┴───────┐
    │               │
┌───▼────┐    ┌────▼──────┐    ┌──────────┐
│MapCtrl │    │UICtrl     │    │TourCtrl  │
│(map.js)│    │(ui.js)    │    │(tour.js) │
└────┬───┘    └────┬──────┘    └────┬─────┘
     │             │                  │
     └─────────────┴──────────────────┘
                   │
         ┌─────────▼──────────┐
         │  CONFIG & STATE    │
         │    (config.js)     │
         └────────────────────┘
```

## 🎮 User Guide

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Start/Stop Guided Tour |
| `←` / `→` | Navigate Tour Stops |
| `T` | Toggle Day/Night Theme |
| `R` | Reset View |
| `Esc` | Close Info Panel |

### Navigation

- **Click markers** to view landmark details
- **Drag** to pan the map
- **Scroll** to zoom in/out
- **Right-click + drag** to rotate (3D view)
- **Ctrl + drag** to adjust pitch

### Layer Controls

Toggle layers on/off to focus on specific categories:
- Landmarks (towers, icons)
- Business Districts (financial zones)
- Culture (parks, entertainment)

## 🛠️ Technical Details

### Technology Stack

| Component | Technology |
|-----------|-----------|
| **Mapping** | MapLibre GL JS 4.1.1 |
| **Base Maps** | CARTO Dark Matter / Voyager |
| **JavaScript** | Vanilla ES6+ (no frameworks) |
| **CSS** | Custom variables + modern features |
| **Fonts** | Google Fonts (Inter, IBM Plex Mono) |
| **Data** | JSON (static, client-side) |

### Design Decisions

#### Why MapLibre GL JS?
- **Open source** alternative to Mapbox GL JS
- **No API keys** required for basic usage
- **Modern WebGL rendering** with smooth animations
- **Active community** and ongoing development

#### Why Vanilla JavaScript?
- **Zero dependencies** = faster load times
- **Full control** over every interaction
- **Educational value** for portfolio demonstrations
- **Easy to understand** and maintain

#### Why CARTO Base Maps?
- **Free tier** with no API key for basic usage
- **High-quality** cartography optimized for urban visualization
- **Dark theme** aligns with premium aesthetic
- **Reliable CDN** infrastructure

#### Color Palette Rationale

**Dark Theme:**
- Background: `#0a0e14` (deep navy, reduces eye strain)
- Accent: `#d4af37` (Saudi gold, Vision 2030 association)
- Text: Progressive hierarchy (`#e6e8eb` → `#9ca3af` → `#6b7280`)

**Light Theme:**
- Background: `#f8f9fa` (soft white, professional)
- Accent: `#1a5490` (deep blue, business credibility)

### Performance Considerations

- **Lazy marker rendering** (only visible layers)
- **Debounced coordinate updates** (on map move)
- **CSS transforms** for smooth animations (GPU-accelerated)
- **Minimal DOM updates** (cached element references)
- **Optimized tour timing** (balanced transition + reading time)

### Accessibility

- **Keyboard navigation** for all interactive elements
- **Focus indicators** on all controls
- **Reduced motion** support via `prefers-reduced-motion`
- **Semantic HTML** with proper ARIA labels
- **High contrast ratios** (WCAG AA compliant)

## 🎨 Customization

### Adding New Landmarks

Edit `data/landmarks.json`:

```json
{
  "id": "new-landmark",
  "name": "Landmark Full Name",
  "shortName": "Short Name",
  "category": "landmark|business|culture",
  "coordinates": [longitude, latitude],
  "description": "Brief description...",
  "significance": "Why this matters...",
  "importance": "critical|high|medium"
}
```

### Changing Map Style

Edit `js/config.js`:

```javascript
CONFIG.styles.dark = {
  // Use Mapbox, Maptiler, or custom style URL
  // Example: 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_KEY'
}
```

### Adjusting Tour Timing

Edit `js/config.js`:

```javascript
CONFIG.animation = {
  duration: 2000,      // Flight duration (ms)
  tourDuration: 3500,  // Time at each stop (ms)
  tourPause: 500       // Pause between stops (ms)
}
```

## 🚀 Deployment

### Static Hosting Options

**GitHub Pages:**
```bash
# Push to gh-pages branch
git subtree push --prefix web origin gh-pages
```

**Netlify:**
- Drag and drop the `web/` folder
- Or connect GitHub repo, set publish directory to `web/`

**Vercel:**
```bash
cd web
vercel deploy
```

**AWS S3 + CloudFront:**
```bash
aws s3 sync web/ s3://your-bucket-name/ --delete
```

### Environment Variables

None required! This is a fully client-side application.

## 📊 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

**Requirements:**
- WebGL support (for MapLibre GL JS)
- ES6 JavaScript features
- CSS Grid & Flexbox

## 🔮 Future Enhancements

### Planned Features

- [ ] **GeoJSON zoning overlays** (residential, commercial, mixed-use)
- [ ] **Animated traffic flows** using real or simulated data
- [ ] **Light trails** at night for visual interest
- [ ] **3D buildings** (requires vector tiles upgrade)
- [ ] **Search functionality** for landmarks
- [ ] **Share URL** with map state (center, zoom, active layer)
- [ ] **Bookmarks** for favorite views
- [ ] **Stats dashboard** (population density, building heights)

### Stretch Goals

- [ ] **Integration with real-time data** (weather, traffic, events)
- [ ] **Historical comparison** (before/after Vision 2030)
- [ ] **Custom POI categories** (restaurants, hotels, metro stations)
- [ ] **Multi-language support** (English + Arabic)
- [ ] **Print/export** current view as PNG
- [ ] **Accessibility audit** and AAA compliance

## 📝 Development Notes

### Data Sources

Landmark coordinates and descriptions are curated for accuracy and relevance to Vision 2030 narrative. Verified against:
- OpenStreetMap data
- Official government resources
- Google Maps verification

### Design Inspirations

- **Stripe Atlas** — Clean data visualization
- **Linear** — Premium dark UI aesthetic
- **Notion** — Thoughtful information hierarchy
- **Mapbox Showcase** — Advanced cartographic techniques

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- **MapLibre** for the excellent open-source mapping library
- **CARTO** for beautiful, free base maps
- **OpenStreetMap** contributors for geospatial data
- **Vision 2030** for inspiring this visualization

---

<div align="center">

**Built with ❤️ for modern Saudi Arabia**

[View Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>
