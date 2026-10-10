# NVIS × CAPAD Public Boundary Overlay — Charts 10–11

The spatial overlay was completed. Its results describe extant vegetation covered by **publicly available** protected-area boundaries. They do not establish complete coverage by every protected area.

## Inputs and processing

- NVIS v7.0 Extant MVG, original 100 m raster in equal-area EPSG:9473. One cell represents one hectare.
- CAPAD 2024 Terrestrial Shapefile in EPSG:4283.
- Retain `NRS_PA` values Y and I, and `OVERLAP = 1`. Retain terrestrial (T) and both terrestrial/marine (B) records; coastal protected areas must not be discarded solely because they are B.
- Repair 58 invalid geometries and transform to EPSG:9473.
- Rasterise original boundaries in strips on the original NVIS grid using cell-centre inclusion. A boolean union ensures that each cell is counted at most once.
- Do not simplify input polygons. Areas are 100 m raster approximations, rather than exact vector intersection areas.
- Antarctica and other areas outside the NVIS analysis extent do not contribute to the overlay. Unknown classes, missing NVIS coverage, coastal boundaries and rasterisation influence results.

## Public geometry versus official statistics

CAPAD metadata states that some private-land covenant information is omitted from spatial data for privacy reasons. The deduplicated spatial `GIS_AREA` total excluding Antarctica is 172,900,839.77 ha, compared with 173,493,467.85 ha in the official national table. The difference is 592,628.08 ha, approximately 0.342%, concentrated in New South Wales and Victoria.

This is consistent with incomplete public boundaries, but does not identify a vegetation class for the missing area. Do not scale vegetation-level estimates using the national difference. The difference is not an error bound for each vegetation group.

Charts 8–9 use official IBRA statistics. Chart 12 uses the official national figure of 22.565941%, displayed as 22.57% and labelled as a 2024 snapshot. Charts 10–11 use the public polygon overlay. These statistical scopes are not interchangeable.

## Chart metrics

**Chart 10:** `mapped_protection_pct` divides each MVG's area covered by the deduplicated public CAPAD boundaries by that MVG's full extant area. A 100% stacked bar should label the remainder **not covered by public boundaries**, rather than definitively unprotected. Packaged data: `data/chart10_public_protection.json`.

**Chart 11:** compare `share_of_classified_native_pct` with `share_of_mapped_protected_classified_native_pct`. Both sides are composition percentages with separate denominators. Each full 25-type side sums to 100%. Differences in representation do not directly measure conservation priority or effectiveness. Packaged data: `data/chart11_representation.json`.

The comparison set is MVGs 1–23, 31 and 32. Aquatic (24), cleared/non-native/built (25), unclassified native (26), bare (27), sea/estuaries (28), regrowth/modified native (29) and unknown (99) classes remain in `data/vegetation_all_classes_audit.json` but are excluded from classified-native comparisons. Wetlands span multiple vegetation groups; neither MVG 24 nor 21 represents all wetlands. Deserts, wetlands and vegetation groups are not forced into mutually exclusive categories.

## Sources and attribution

DCCEEW, NVIS Version 7.0 Extant Major Vegetation Groups; Collaborative Australian Protected Areas Database 2024, Commonwealth of Australia; snapshot 30 June 2024.

- https://www.dcceew.gov.au/environment/environment-information-australia/national-vegetation-information-system/data-products
- https://www.dcceew.gov.au/environment/land/nrs/science/capad/2024
- https://www.dcceew.gov.au/sites/default/files/documents/capad-2024-tech-spec.pdf

Processing and statistical-scope checks were assisted by ChatGPT/Codex. Disclose assistance according to the unit requirements.
