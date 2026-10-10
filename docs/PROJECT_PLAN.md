# Chart Plan

This is the agreed twelve-chart narrative. Charts 1–3 are implemented; charts 4–12 remain planned. Advanced classifications are candidates subject to appropriate use and teaching-team assessment.

| # | Part | Title | Idiom | Classification | Metric | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | Australia's Vegetation Mosaic | Categorical vegetation map | Advanced | Vegetation category; no area values inferred from the display map. | Implemented |
| 2 | 1 | Which Native Vegetation Types Cover the Most Land? | Horizontal bar chart | Basic | Extant classified native vegetation area (km²). | Implemented |
| 3 | 1 | Native Vegetation Composition Across States | Heatmap | Advanced | Group area / all classified native vegetation area in the same state (%). | Implemented |
| 4 | 2 | Recorded Bird Species Richness, 2025 | 50 km bin map | Advanced | Distinct recorded bird species per 50 km equal-area cell; not complete biodiversity. | Data prepared; pending implementation |
| 5 | 2 | Wetlands of International Importance | Dot map | Advanced | One equal-size representative point per Ramsar site. | Data prepared; pending implementation |
| 6 | 3 | Estimated Pre-1750 and Extant Vegetation Extent | Connected dot plot | Advanced | Paired area estimates on the common known NVIS v7 footprint. | Data prepared; pending implementation |
| 7 | 3 | How Much Remains in the Same Vegetation Category? | Lollipop chart | Advanced | Same-category spatial overlap / estimated pre-1750 category area (%). | Data prepared; pending implementation |
| 8 | 4 | Protected Land Across Bioregions, 2024 | Choropleth map | Advanced | Official protected area / official bioregion area (%). | Data prepared; pending implementation |
| 9 | 4 | The Scale of Protection Across Bioregions | Proportional symbol map | Advanced | Circle area represents official protected area (km²). | Data prepared; pending implementation |
| 10 | 4 | Publicly Mapped Protection by Vegetation Type | 100% stacked bar chart | Basic | Public CAPAD coverage / extant vegetation group area (%). | Data prepared; pending implementation |
| 11 | 5 | Is Native Vegetation Represented Evenly in Protection? | Butterfly chart | Advanced | Composition of all native vegetation versus publicly mapped protected native vegetation (%). | Data prepared; pending implementation |
| 12 | 5 | Australia's Protected Land: The 2024 Snapshot | Waffle chart | Advanced | Official national protected land share: 22.57%; partial final cell. | Data prepared; pending implementation |

## Shared design decisions

- Use official MVGs for vegetation comparisons; colour families are editorial only. No treemap is planned.
- Default comparative charts to the same ten representative types, with a full 25-type option. Preserve full-set denominators when filtering.
- Keep ALA bird records and Ramsar sites as complementary modules, without claiming a spatial overlay with NVIS.
- Use one NVIS version and a common known footprint for historical comparisons.
- Label the remainder of the public protection overlay as **not covered by public boundaries**, rather than definitively unprotected.
- Use official CAPAD 2024 national statistics for the waffle, rather than totals derived from IBRA geometry or the public polygon overlay.
- Avoid annotations over data marks. Keep visible captions, readable type, consistent chart alignment and whitespace.
- The plan contains two basic and ten candidate advanced charts, including bin, dot, choropleth and proportional symbol map idioms. Counts do not guarantee HD.
