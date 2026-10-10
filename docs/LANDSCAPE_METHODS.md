# Landscapes Transformed: Charts 6 and 7

## Source and common footprint

DCCEEW NVIS Version 7.0, Estimated Pre-1750 and Extant Major Vegetation Group 100 m rasters. https://www.dcceew.gov.au/environment/environment-information-australia/national-vegetation-information-system/data-products

Both themes use the same grid in equal-area EPSG:9473. Each original cell represents one hectare. The common known footprint retains cells with known codes in both themes, excluding 0 and 99. A historical-by-extant spatial cross-tabulation was computed on this footprint. Totals include all known classes before selecting the classified-native categories.

Chart 6 compares historical row sums with extant column sums for each category. Extant minus historical area is a net category-area difference, not a measure of gross clearing. Extant data have different regional observation dates. The pre-1750 theme is estimated, rather than a direct national survey conducted in 1750.

Chart 7 divides the same-category cross-tabulation diagonal by that category's historical row sum. Both numerator and denominator use the same footprint. This percentage is not extant column sum divided by historical row sum. It does not measure ecological condition or intactness. A cell mapped in another category is not necessarily cleared.

## Display and interpretation

Use the same fixed ten representative categories as Part 1 (1, 3, 5, 9, 14, 16, 18, 19, 20, 23). Full 25-class statistics remain in the data. Chart 6 is ordered by estimated historical area; Chart 7 is ordered by same-category remaining percentage, ascending. Neither chart totals the displayed subset as all Australian vegetation.

Chart 6 uses a common zero-based 0–1.5 million km² axis for both endpoint types. Hollow points represent historical estimates and filled points represent extant vegetation. The connecting rule pairs a category's two estimates; it does not show a continuous trend. The default discovery identifies the greatest absolute area difference among the ten displayed groups (Eucalypt Woodlands, 396,886 km² smaller).

Chart 7 uses a zero-based 0–100% scale and a stem from zero to each point. The default discovery identifies the lowest same-category overlap among the ten groups (Eucalypt Open Forests, 46.0%). Clicking either chart or using the dropdown highlights the same category in both charts and updates both discovery annotations. Part 3 focus is independent of Parts 1 and 2.

## Implementation

landscapes.js loads readable specs/chart06_connected_dot.vl.json and specs/chart07_lollipop.vl.json, embeds their data from the packaged datasets, and adjusts their width for the container. Both render through Vega-Lite as SVG. The specification data URLs are relative to the specs folder; the web module loads data explicitly from data/. Both JSON specifications include the label calculation and filtering needed for the ten-type display.

AI assistance with processing, code and text should be acknowledged under the unit requirements.
