# Part 1 Map Repair and Compact Layout

## Changes

- The deployed `assets/maps/vegetation_base.png` path returned HTTP 404. The base map and ten native-type overlays are now embedded as PNG data URLs inside `app.js`.
- The map no longer requires separately uploaded image files. Official MVG lookup continues to use the unchanged compact JSON grid.
- Comparison charts now always show the same ten representative types. The focus menu contains only those ten. All mapped groups can still be identified through the Map Explorer panel; context types are not selectable for chart comparisons.
- Original full 25-type statistical denominators are retained. The ten displayed types are a subset, not a complete classification.
- Header, chapter, control and card spacing are reduced while keeping readable separation and consistent alignment.
- Georgia headings and Arial body/chart labels are retained.

## Upload

1. Extract the patch ZIP.
2. Open the repository root, where `index.html` is visible.
3. Choose **Add file → Upload files**.
4. Drag the extracted ZIP contents: `index.html`, `styles.css`, `app.js`, `README.md` and `docs/`. Do not upload an outer folder or the ZIP itself.
5. Keep existing `data/`, `vendor/` and other project files. Existing `assets/` files are no longer used by the map.
6. Commit directly to `main` with **Fix map display and simplify Part 1 comparisons**.
7. Wait for the new GitHub Pages deployment to finish, then refresh the website with **Ctrl+F5**.

## Checks

- The map is visible without external image requests.
- There is no Comparison set dropdown.
- The focus menu has ten types and a no-selection option.
- The bar chart has ten rows; the heatmap has ten rows and eight state/territory columns.
- Clicking a comparison type highlights it; clicking it again clears the selection.
- Moving over context types identifies them without changing the fixed comparison set.
- Full-set denominators and source data remain unchanged.

Runtime rendering, linked selection logic, full-set denominator checks and all 105,280 display-run lookup tests passed. Browser deployment and layout must be checked after uploading this repair.
