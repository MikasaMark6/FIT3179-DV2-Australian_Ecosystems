# Part 1 Design and Interaction Update

## What changed

- Large **Australian Ecosystems** main title; course identification moved away from the hero to the footer.
- **A continent of contrasts.** retained as a subordinate narrative subtitle.
- Georgia for headings and Arial for body text, controls and chart labels. Shared widths and spacing maintain alignment.
- Click a map location, bar or heatmap cell to select a native type; click the same type again to clear the selection.
- A visible selection summary and a Map Explorer panel explain the active type and the map location under the pointer.
- Cached lossless map images replace the large rectangle scene graph. The original grid remains the source for pointer lookup; area statistics and denominators are unchanged.
- Data display remains approximately 5 km. No zoom or pan control is added.

## Exactly what to upload

Use the patch ZIP for an existing repository:

| Path | Action | Purpose |
| --- | --- | --- |
| `index.html` | Replace at repository root | Hero, chart instructions and explorer panel |
| `styles.css` | Replace at repository root | Two-family typography, hierarchy, alignment and layout |
| `app.js` | Replace at repository root | Lightweight map, pointer lookup and chart click selection |
| `README.md` | Replace at repository root | Updated project description and instructions |
| `assets/` | Add at repository root | New cached map images; upload the whole folder |
| `docs/UPDATE_GUIDE.md` | Add under `docs/` | This guide |
| `docs/SOURCES_AND_METHODS.md` | Replace under `docs/` | Updated map rendering method |
| `docs/part1_validation.json` | Replace under `docs/` | Updated validation results |

Keep the existing `data/`, `vendor/` and other `docs/` files. The patch does not contain duplicates of the large prepared datasets.

### GitHub browser upload

1. Open the repository's **Code** page, at the root where `index.html` is visible.
2. Choose **Add file → Upload files**.
3. Extract the patch ZIP on your computer. Open the extracted folder.
4. Drag its **contents** (`index.html`, `styles.css`, `app.js`, `README.md`, `assets`, `docs`) into the upload area. Do not drag the ZIP or an outer folder.
5. Review paths: the upload must show `index.html` at the root and map files under `assets/maps/`.
6. Use the commit message **Improve Part 1 typography and linked interactions** and commit to **main**.
7. Wait until the new GitHub Pages deployment finishes in **Actions**.
8. Open the existing website address and refresh with **Ctrl+F5** on Windows. The HTML also includes version query strings for the changed JavaScript and CSS.

No new repository or Pages setup is required.

## How the webpage is displayed

The browser opens `index.html`, then follows its references to the stylesheet and script. JavaScript fetches the prepared JSON, constructs the chart specifications and asks Vega-Lite/Vega-Embed to render them into the matching containers.

### HTML: structure and content

```html
<h1>Australian<br>Ecosystems</h1>
<p class="hero-subtitle">A continent of contrasts.</p>
<div id="map" class="chart"></div>
```

- `<h1>` is the main page heading. `<br>` inserts a line break.
- `<h2>` identifies chapter or chart headings; `<h3>` identifies supporting subheadings.
- `<p>` contains paragraphs.
- The initially empty `map` container is where JavaScript places the map.
- `class` identifies reusable styling groups; `id` identifies a unique element that code can target.
- The `<title>` in the document head labels the browser tab; it is separate from the visible `<h1>`.

### CSS: appearance and layout

```css
h1, h2, h3 { font-family: Georgia, serif; }
body { font-family: Arial, sans-serif; }
```

Georgia has serifs: small finishing strokes at letter ends. Arial is sans serif: it does not have those strokes. One title family and one reading family are used consistently. Font size, colour, spacing and weight establish hierarchy; shared containers establish alignment. Browser font fallbacks do not introduce extra intentional design families.

### JavaScript: data and interaction

`app.js` loads the JSON files, builds Vega-Lite specifications, renders the charts, and connects selection controls. It places results into HTML containers such as `map`, `bar` and `heatmap`. It does not recalculate percentages when the displayed subset changes.

### Data and assets: the visual inputs

The JSON files contain prepared data. The map PNG files are lossless display caches generated directly from the same compact grid, not invented illustrations. The original approximately 5 km grid provides official vegetation category lookup. The statistical tables continue to use the original 100 m analysis.

## After-upload checks

1. The large hero heading reads **Australian Ecosystems**, without a course label next to it.
2. All three charts load.
3. Moving over the map updates the Map Explorer panel.
4. Clicking native vegetation, a bar or a heatmap cell highlights that type across all three charts.
5. Clicking the same type again clears the selection.
6. Selecting a type outside the ten-type subset automatically expands to all 25.
7. The native-type menu and Clear focus button work with keyboard navigation.
8. Type, caption and chart alignment remain readable at normal laptop width.

Runtime and lossless-cache checks passed. Browser responsiveness still depends on the device and must be checked after deployment. Charts 4–12 remain placeholders.
