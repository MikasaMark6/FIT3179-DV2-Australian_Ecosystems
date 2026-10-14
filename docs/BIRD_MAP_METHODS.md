# Recorded Bird Species Richness, 2025

Chart 4 is a standalone ALA record module. It has no spatial join to NVIS.

- Source: https://doi.org/10.26197/ala.cc780cc5-1f11-4bdd-81b0-82083cb6b0cf
- 6,972,714 retained 2025 records; 2,438 populated 50 km equal-area grid cells.
- Richness is the distinct retained species-identity count within a cell. The maximum is 323.
- Minimum-record filters (0, 100, 1,000) select cells without recalculating richness. They do not standardise effort.
- Default extent selects cell centres within 110–156 degrees east and 45–9 degrees south: 2,387 cells, including coastal marine cells. The alternate extent displays all downloaded grids, including external territories and offshore locations.
- Grid geometry is shown using Mercator. The original bins have equal area, but their displayed areas vary with latitude.
- IBRA 7.1 polygons provide geographic context only; bird values are not aggregated by bioregion.
- Grey background means no displayed cell, not absence of birds. Filtering also creates gaps.
- 87.95% of retained records have unspecified coordinate uncertainty. Sampling effort, taxonomy, positional uncertainty and record availability limit comparisons.
- Record counts are exported rows retained by cleaning, without deduplication by occurrence ID.
- See bird_source_metadata.json for the downloaded dataset attribution.

## Interaction

Hover shows the grid ID, species count, record count, observation year and grid centre. Extent changes redraw the map; minimum-record changes update a Vega signal. Colour scale remains 0–350 across both controls to preserve comparability. Part 1 selection remains independent.

## Data discovery annotation

The annotation counts displayed grids with at least 200 recorded species, then reports how many have centre longitude at least 140 degrees east. It updates with extent and record-count filters. Default: 94 of 100 high-richness displayed grids are east of 140 degrees east. This describes recorded patterns, without attributing cause or correcting effort.

## Plot sizing refinement

The full-width card uses a centred plot capped at 760 px wide. Its main geographic view uses a taller viewport (up to 610 px), allowing the actual map to appear larger with less horizontal blank space. Projection, geographic fit bounds, filters, species values and colour scale are unchanged.

## Shared map plot dimensions

All map plots now use a maximum width of 600 px and approximately 0.957 × width in height. The categorical raster preserves its source extent aspect ratio (approximately 0.957). The other plots use that aspect ratio as their viewport; their own projections and geographic extents remain unchanged. Map legends occupy additional space and are not part of the common plot size. Smaller screens reduce plot dimensions proportionally. This supersedes the earlier bird-only 760 px viewport.
