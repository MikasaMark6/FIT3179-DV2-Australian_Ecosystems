# Part 4 — Where Protection Exists

## Charts 8–9: official bioregional protection statistics

Source: DCCEEW CAPAD 2024 terrestrial national statistics, snapshot 30 June 2024, joined by region code to IBRA 7.1 boundaries. The prepared table contains 89 unique codes, all matched to the boundary dataset. Official region areas and protected areas are retained; display geometry is never used to calculate their percentages.

- Chart 8: protected area / bioregion area × 100, using bands 0–<5%, 5–<10%, 10–<17%, 17–<30%, and 30–100%. These are descriptive display bands, rather than ecological quality thresholds or a claim that each region has a 30% policy obligation.
- Chart 9: protected area in km² is mapped to circle area, using a linear size scale with zero area at zero value. Representative points lie inside the largest region component. They identify regional summaries, not reserve positions. Smaller symbols are drawn above larger symbols. The region menu provides access to small or overlapping symbols without shifting their geographic positions.
- Coral Sea (COS) and Subantarctic Islands (SAI) have no applicable terrestrial comparison and are excluded, rather than treated as zero protection. Of the remaining 87 regions, 85 appear in the main view; Indian Tropical Islands (ITI) and Pacific Subtropical Islands (PSI) are included in the all-region view. Selecting either through the menu switches to that view.
- Both maps use Albers equal-area (Vega `conicEqualArea`), rotated to 134° E with standard parallels 18° S and 36° S. Projection extent fits the visible geometry. Boundaries were simplified at 500 m in EPSG:9473 for display; all statistics remain official table values.

The shared menu and map clicks highlight the same region in both maps. Hover updates both explorers until a selection is pinned. Clicking the selected region again, choosing the empty menu item, or using Clear region focus releases it. SVG rendering retains native geographic pointer targets.

## Chart 10: publicly mapped protection of vegetation

Source: NVIS v7.0 Extant MVG original 100 m raster × CAPAD 2024 public terrestrial polygons. The metric divides covered area for a vegetation group by its full extant area, rather than by national protected area. Ten representative types are shown, matching earlier chapters; the complete prepared dataset retains all 25 classified-native types.

The protected-area mask retains `NRS_PA` Y/I, `OVERLAP = 1`, and terrestrial or combined terrestrial/marine records (T/B). Original polygons are repaired and reprojected into EPSG:9473, then rasterised using cell-centre inclusion on the NVIS grid. A boolean union prevents double counting. Each 100 m cell is one hectare. This is a raster approximation, rather than an exact vector intersection.

The green bar segment is **covered by public boundaries**; the grey segment is **not covered by public boundaries**. Some private-land covenant information is omitted from the public spatial data. Grey therefore does not establish that land is unprotected. The public spatial total differs from the official national total by about 0.342%; this is not a vegetation-level uncertainty bound and is not used to scale any vegetation result. Unknown classes, missing coverage and coastal rasterisation also affect interpretation.

Hover exposes the group's full name, both percentages and hectare totals. Clicking a bar highlights that vegetation type and updates its discovery annotation; clicking it again clears the focus. Region selection does not filter vegetation bars, because Chart 10 contains national vegetation totals, not bioregional intersections.

## Validated discoveries

- 13 of 87 bioregions with applicable terrestrial statistics have protection below 5%.
- Great Sandy Desert has the largest official protected area, approximately 197,096 km² (49.9% of its bioregion).
- Tussock Grasslands has approximately 7.4% public boundary coverage, the lowest among the ten displayed vegetation types.

Coverage does not establish habitat condition, management effectiveness, species protection, or conservation priority.

## Readable specifications and implementation

- `specs/chart08_protection_choropleth.vl.json`
- `specs/chart09_protection_symbols.vl.json`
- `specs/chart10_vegetation_protection.vl.json`

The specifications contain relative data URLs for independent inspection. `protection.js` loads those JSON files, supplies the prepared data, adjusts chart width, selects the geographic extent and connects interaction signals. Runtime checks compile all three specifications and verify denominators, map linkage, explorer pinning, island selection and SVG rendering. Rendered charts were inspected for extent, symbols, labels and legend visibility; user-browser pointer behaviour remains a deployment check.

## Sources and attribution

- DCCEEW CAPAD 2024: https://www.dcceew.gov.au/environment/land/nrs/science/capad/2024
- IBRA 7.1 boundary source: https://www.arcgis.com/home/item.html?id=a5a9a356105b4a728d0606194d8bdf38
- NVIS data products: https://www.dcceew.gov.au/environment/environment-information-australia/national-vegetation-information-system/data-products
- CAPAD technical specification: https://www.dcceew.gov.au/sites/default/files/documents/capad-2024-tech-spec.pdf

See also `docs/ibra_methods.md` and `docs/overlay_methods.md` for the original conversion and overlay checks. Data processing and code were assisted by ChatGPT/Codex; disclose assistance according to the assessment requirements.
