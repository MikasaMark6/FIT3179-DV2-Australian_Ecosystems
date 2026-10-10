# Ramsar Sites — Chart 5

The official spatial service contained 120 boundary records. Grouping by `REFCODE` produced 67 sites with 67 unique names, matching the published DCCEEW site count. Spatial metadata revision: 10 July 2026. Download date: 10 October 2026. An older 2022 copyright string in the service is not treated as the date of every boundary update.

A site can contain multiple wetland areas and polygons. Geometries were grouped by site code, projected to EPSG:9473, and represented by an interior point in the largest polygon component. Points were transformed back to EPSG:4326. All 67 representative points were checked against their projected site geometries.

## Planned chart and interpretation

Use equal-size dots to show site locations, with site name, state or territory, and designation dates in the tooltip. Preserve multiple source designation dates rather than inventing a single first designation date.

Each dot marks one Ramsar site; a site can include several wetland areas. This is a list of internationally important wetlands, not a complete wetland inventory or a species-richness or protection-adequacy assessment.

All external-island sites are retained in the data. If the main view focuses on mainland Australia and Tasmania, show relevant island insets or disclose the display extent. Do not silently omit sites while claiming to display all 67.

Potentially repeated site-area fields were not summed. A position-only dot map does not require area encoding. The packaged web dataset is `data/chart05_ramsar_sites.json`.

## Sources and attribution

DCCEEW Ramsar Wetlands. CC BY 4.0; attribution: Commonwealth of Australia (DCCEEW).

- https://www.dcceew.gov.au/water/wetlands/australian-ramsar-wetlands
- https://gis.environment.gov.au/gispubmap/rest/services/ogc_services/Ramsar_Wetlands/MapServer/0
- https://www.arcgis.com/sharing/rest/content/items/7be865b1681d4abfa305fba67d5b27d1/info/metadata/metadata.xml?format=default&output=html

Processing and checks were assisted by ChatGPT/Codex. Disclose assistance according to the unit requirements.
