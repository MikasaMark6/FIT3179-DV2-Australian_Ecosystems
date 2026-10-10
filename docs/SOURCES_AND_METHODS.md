# Sources and methods

1. DCCEEW, NVIS Version 7.0, Extant and Estimated Pre-1750 MVG 100m raster downloads.
https://www.dcceew.gov.au/environment/environment-information-australia/national-vegetation-information-system/data-products
Use one version. Data ages vary regionally; Extant is not a nationwide 2026 field survey. MVG codes1–23,31,32 are the25 classified-native comparison set. Other classes stay in audit file.1pixel=1ha in EPSG:9473. ha/100=km².

2. DCCEEW, CAPAD2024 terrestrial national summary and public terrestrial polygons. Snapshot30June2024.
https://www.dcceew.gov.au/environment/land/nrs/science/capad/2024
https://www.dcceew.gov.au/sites/default/files/documents/capad-2024-tech-spec.pdf
Map8/9 use unaltered official IBRA7.1 tables. National22.565941% uses jurisdiction total land768828858.655707ha and protected173493467.851397ha. IBRA totals differ; do not substitute them.
Public polygons omit some private covenants. Overlay uses NRS_PA Y/I, OVERLAP1, original100m NVIS pixel centres, boolean union mask. Partial boundaries and raster approximation affect comparison; cannot extrapolate missing area by vegetation. Public polygonGIS total differs from national by~0.342%; this does not define an error bound for each MVG.

3. IBRA7.1, Regions. Official ArcGIS item.
https://www.arcgis.com/home/item.html?id=a5a9a356105b4a728d0606194d8bdf38
89codes matched to CAPAD.500m coverage simplification preserves shared edges; TopoJSON quantisation. Statistics come from official tables, not simplified geometry. COS/SAI not applicable to land protection. Point9 in largest polygon component.

4. ABS, State and Territory boundaries STE2026, GDA2020. Uploaded STE_2026_AUST_SHP_GDA2020.zip.
https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs-edition-4/latest-release
State3 categories counted by original NVIS100m cell centre.8main states/territories; OtherTerritories omitted. State percentages divide classified-native area within the same state, not state landmass.

5. Atlas of Living Australia, occurrence download, accessed10October2026; records dated2025.
https://doi.org/10.26197/ala.cc780cc5-1f11-4bdd-81b0-82083cb6b0cf
Original7,105,235rows across5CSVparts. Local streaming species-parent-name dedup within each50km EPSG:3577 cell. Strict2025 date/year. Kept6,972,714rows;2438populatedcells;782distinctnames. Record count is retained exported rows. Unknown uncertainty6132768rows (~87.95%). Source-query prefilters exclude known uncertainty>=10001m, spatially invalid records, selected taxonomic issues, absence, captive/cultivated records and selected duplicates. Full original source references, data-provider attribution and query filters in bird_source_metadata.json, derived from sourceREADME,doi,citation,headings. Retain provider attributions when publishing.
No complete species inventory inferred. No effort-standardisation or causal interpretation. Boundingwindow96–169E,-56..-8latitude includes external territories/nearshore; not land mask. Unpopulatedcells are no retained records, not zero biodiversity.

6. DCCEEW Ramsar spatial layer; metadata revision10July2026.67uniqueREFCODE grouped from120polygonrecords. Representative point inside largest component; eachsite one equal-size point. No site area is summed.
https://www.dcceew.gov.au/water/wetlands/australian-ramsar-wetlands
https://gis.environment.gov.au/gispubmap/rest/services/ogc_services/Ramsar_Wetlands/MapServer/0
This is an internationally important site list, not a complete map of all Australian wetlands. Do not claim spatial overlap with ALA/NVIS since no such analysis was performed.

Historical comparison6/7
SameNVIS7.0 themes, common footprint with known Pre and Ext codes, excluding0/99. Matrix rowsPre, columnsExt.6 uses rowsum and columnsum areas;7 uses diagonal/rowtotal. Diagonal measures same mapped category at same location, not condition or naturalness. Differences can reflect classification changes/regrowth/other transitions as well as clearing. No time-series or loss-cause interpretation.

AI acknowledgement
Data parsing, preprocessing scripts, consistency checks and draft layout were assisted by ChatGPT/Codex. Student must independently review outputs and disclose assistance according to FIT3179 requirements. This package does not replace the student hand-drawn design or interview.

Display performance update
The approximately 5 km compact categorical grid is encoded losslessly into a base PNG and one transparent mask per classified native MVG. Vega-Lite renders these as image marks with the same projected coordinate aspect. Direct row/column lookup into the original display-grid codes provides hover and click identification. Every cached pixel and all 25 selection masks were checked against the unchanged source display grid. No statistical tables or area denominators were modified.

Map dependency repair
The deployed external display-image path returned HTTP 404. The same verified lossless base PNG and the ten selected MVG masks are now embedded as data URLs in app.js. The compact display grid remains the pointer-lookup input; original statistical data are unchanged. All vegetation comparison charts in the current page use a fixed ten-type subset with full 25-type denominators.

## Part 1 discovery annotations

Map annotation: the state with the largest mapped area for the selected MVG, divided by its national mapped area. Default is Hummock Grasslands: Western Australia contains 59.2% of the mapped national total. These are original 100 m area statistics, not display-cell estimates. Bar annotation shows selected type area and share of all 25 classified native MVGs. Heatmap annotation identifies the state where the selected group has the largest share of classified native vegetation; without focus it shows the overall maximum. Map, bar and heatmap annotations update together. State composition retains all 25 classified native groups as its denominator.
