# Australian Ecosystems

An interactive, single-page data visualisation project for **FIT3179 Data Visualisation 2**.

**Author:** Jingtao Ma  
**Status:** Development draft. Charts 1–3 are implemented. The page includes clearly labelled placeholders for charts 4–12, with prepared datasets for subsequent implementation.

## Project purpose

Investigate Australia's environmental diversity through native vegetation, recorded bird species, internationally important wetlands and protected areas. The narrative moves from landscape distribution and composition to vegetation change and conservation coverage.

The primary audience is readers seeking an accessible introduction to Australian ecosystems. Official Major Vegetation Groups provide the main comparison categories. Deserts are environmental regions and wetlands can contain several vegetation groups, so they are not treated as four mutually exclusive NVIS categories alongside forests and grasslands.

## Narrative structure

| Part | Chapter | Charts | Current status |
| --- | --- | --- | --- |
| 1 | A Continent of Contrasts | 1–3 | Implemented |
| 2 | Life Across the Landscape | 4–5 | Data prepared; chart placeholders |
| 3 | Landscapes Transformed | 6–7 | Data prepared; chart placeholders |
| 4 | Where Protection Exists | 8–10 | Data prepared; chart placeholders |
| 5 | Is Protection Balanced? | 11–12 | Data prepared; chart placeholders |

See [the chart plan](docs/PROJECT_PLAN.md) for titles, metrics and proposed idioms. Proposed idiom counts do not guarantee a grade; appropriateness, design, storytelling and course assessment requirements still apply.

## Run locally

### Windows with Python

1. Extract the complete ZIP file.
2. Open the extracted `Australian_Ecosystems_DV2_Update` folder.
3. Double-click `start_windows.bat` and keep the terminal open.
4. Open **http://localhost:8000** in a browser.

If the Windows Python launcher (`py`) is unavailable, open a terminal in the project folder and run:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

### macOS / Linux

Open a terminal in the project folder:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open **http://localhost:8000**. Stop the server with **Ctrl+C**.

### VS Code alternative

Open the whole project folder in VS Code, install the **Live Server** extension, then right-click `index.html` and choose **Open with Live Server**.

Serve the folder through HTTP. Opening `index.html` directly with a `file://` address can prevent JSON data loading.

## Publish with GitHub Pages

1. Create a public GitHub repository, for example `australian-ecosystems-dv2`.
2. Upload the **contents** of this project folder to the repository root. Upload the extracted files rather than the ZIP or its outer folder. `index.html`, `app.js`, `styles.css`, `data/` and `vendor/` must be directly accessible from the repository root.
3. In the repository, open **Settings → Pages**.
4. Select **Deploy from a branch**, then **main** and **/ (root)**. Save.
5. When deployment completes, open the website URL shown by GitHub Pages.

A project website usually has the address:

```text
https://YOUR-USERNAME.github.io/australian-ecosystems-dv2/
```

The repository URL displays code; the `github.io` URL displays the visualisation. Replace the example username with your account name. No custom domain or paid server is required for this public project setup.

The included `.nojekyll` file supports direct static-file publishing. Relative paths allow the project to run under the repository's URL prefix. Future updates should preserve the same entry point and folder structure.

## Project files

| File or folder | Purpose |
| --- | --- |
| `index.html` | Five-part narrative structure, chart containers, controls and attribution |
| `styles.css` | Typography, spacing, colour, responsive layout and chapter navigation |
| `app.js` | Implemented Vega-Lite specifications and linked focus for charts 1–3 |
| `data/` | Prepared JSON, GeoJSON and TopoJSON data for the twelve-chart plan |
| `vendor/` | Local Vega libraries and their licences; no chart-library CDN dependency |
| `assets/maps/` | Lossless display map and native-group overlays, used as Vega-Lite image marks |
| `docs/UPDATE_GUIDE.md` | Exact files to replace and an explanation of HTML, CSS and JavaScript |
| `docs/PROJECT_PLAN.md` | English chart titles, metrics, planned idioms and implementation status |
| `docs/SOURCES_AND_METHODS.md` | Data sources, transformations, exclusions and interpretation limits |
| `docs/part1_validation.json` | Runtime rendering, signal and denominator checks for charts 1–3 |
| `docs/data_manifest.json` | Sizes and SHA-256 checksums for packaged datasets |
| `start_windows.bat` | Windows local HTTP server launcher |

Only Part 1 datasets are fetched by the current page. Additional datasets are supplied for subsequent chapters; their presence does not mean their charts have been implemented. Large original raster, vector and occurrence archives are not included and are not required to view this page.

## Part 1 interactions

- **Comparison set:** switch between ten representative native types and all 25 classified native types.
- **Focus:** select an official vegetation group from the menu, click its location on the map, click a bar, or click a heatmap cell. Clicking the same chart type again clears the selection.
- **Linked emphasis:** the selected group remains highlighted across the three charts while other marks fade.
- Selecting a type outside the representative subset automatically expands the comparison set to all 25 types.
- Switching back to the representative subset clears a focus that is outside that subset.
- **Clear focus:** restore the normal view.
- **Hover:** read official names, mapped areas and percentage values. The map displays its hovered type in the dedicated Map Explorer panel, outside the data marks.

The display families are editorial colour groupings, not an official parent–child vegetation taxonomy. Keyboard users can use the focus menu instead of clicking the map.

## Data and interpretation

- **Map:** NVIS Version 7.0 Extant vegetation; approximately 5 km display cells sampled from the 100 m raster. Display cells are not used to calculate area. Small coastal patches may be lost at display resolution.
- **Area chart:** mapped extant area from the original 100 m equal-area raster. One cell represents one hectare; 100 hectares equal one km².
- **State heatmap:** each group divided by the full classified-native vegetation area in the same state. This is not its share of total state land. Filtering does not recalculate denominators. Full 25-type columns sum to 100%; the ten-type subset does not.
- **Extant:** a data theme with regionally varying observation dates, not a uniform 2026 survey.
- **Later chapters:** recorded bird richness is not a complete biodiversity inventory; mapped public protected-area boundaries omit some private protection. Historical NVIS comparisons must use the same version and common known footprint.

Full definitions and original source links are recorded in [Sources and methods](docs/SOURCES_AND_METHODS.md). Retain the ALA provider attribution in `docs/bird_source_metadata.json` when implementing the bird chart.

## Validation and remaining work

The original live page was inspected in a browser and its selection controls operated successfully. The updated Part 1 passed Vega-Lite compilation, Vega runtime SVG rendering, linked focus signal checks, 10/25-type row-count checks and state denominator checks. Validation used the actual chart specifications in a Node runtime.

**The updated rendering strategy has passed runtime and cell-lookup checks, but its final browser/DOM layout and pointer interactions still need verification after uploading.** Open the live page and check chart loading, hover details, focus selection, subset switching and laptop-width layout. The remaining nine chart containers are placeholders and must not be counted as completed visualisations.

Before submission: implement charts 4–12, review source attribution, test the complete page, complete the required student hand-drawn sketch and written course components, and confirm the final submission instructions. Update draft labels and this README to reflect the completed work.

## AI acknowledgement

ChatGPT/Codex assisted with planning, data preprocessing, code generation, consistency checks and draft visual design. The student remains responsible for reviewing the data, code, interpretation and final submission, and for following the unit's AI disclosure requirements.

## Dependencies and licences

The page uses **Vega 5.33.0**, **Vega-Lite 5.23.0** and **Vega-Embed 6.29.0**, bundled locally under BSD-3-Clause licences. Licence files are included in `vendor/`. Official datasets remain subject to their original source terms and attribution requirements; this project does not assign a blanket new licence to them.

## Design update

The main heading is now **Australian Ecosystems**, with **A continent of contrasts.** as a subordinate subtitle. Course information is kept in the footer. Two font families are used: Georgia (serif) for headings and Arial (sans serif) for body text, controls and chart labels. Shared widths, margins and heading styles establish alignment and visual hierarchy.

The map uses lossless cached images inside a Vega-Lite specification instead of 105,280 individually interactive rectangles. A direct grid lookup identifies the official MVG under the pointer. At most two visible image marks are required for the map. This preserves all original display cells and leaves statistical data unchanged. The first selection of an uncached type may briefly load its small overlay image. No zoom or pan control is included in this update.
