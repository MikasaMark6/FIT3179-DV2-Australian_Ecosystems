# IBRA 7.1 Boundaries and CAPAD 2024 — Charts 8–9

## Input and matching

The official ArcGIS REST export contained 89 polygon records in EPSG:4326. All 89 unique `REG_CODE_7` codes matched the IBRA Bioregions worksheet of the official CAPAD 2024 national statistics. Official region areas, protected areas and percentages are retained; they are not recalculated from simplified geometry.

## Packaged datasets

- `data/ibra71_regions.topojson`: boundary object named `regions`.
- `data/chart08_09_ibra_protection.json`: official protection statistics and interior representative coordinates.

Boundaries were simplified in the equal-area EPSG:9473 projection at 500 m, preserving shared edges, then transformed back to EPSG:4326. The TopoJSON uses a 100,000,000 quantisation grid with independent closed delta-encoded arcs; shared arcs are not deduplicated. Decoding checks found 89 valid, non-empty regions. All 89 representative points lie within their simplified largest components.

For Vega-Lite, use `data.format: {type: 'topojson', feature: 'regions'}`. Preserve the checked ring orientation for Vega/D3 rendering. These boundaries are display geometry, not an area-analysis input. Relative geometry-area changes can be larger for small islands, reaching approximately 12.58%; all chart statistics must continue to use the official table.

## Interpretation and display

CAPAD terrestrial comparisons are not applicable to COS (Coral Sea) and SAI (Subantarctic Islands). A zero in their terrestrial statistics is not evidence of no protection. Use `terrestrial_comparison_applicable` to exclude or explicitly label them.

A main view may focus on mainland Australia and Tasmania, with external islands handled explicitly. The dataset retains all 89 regions for checking.

Chart 8 uses official protection percentages. Chart 9 uses interior representative points and maps protected area to circle **area**, not radius. Circle positions are representative locations, not individual reserve locations. Full browser map layouts remain to be implemented and checked.

## Sources

- DCCEEW, Interim Biogeographic Regionalisation for Australia, Version 7.1 (Regions): https://www.arcgis.com/home/item.html?id=a5a9a356105b4a728d0606194d8bdf38
- CAPAD 2024 terrestrial statistics, snapshot 30 June 2024: https://www.dcceew.gov.au/environment/land/nrs/science/capad/2024

Reading, matching and conversion were assisted by ChatGPT/Codex. Disclose assistance according to the unit requirements.
