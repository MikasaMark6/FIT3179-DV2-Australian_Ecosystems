# Part 5 — Is Protection Balanced?

## Chart 11: vegetation representation butterfly

Input: `data/chart11_representation.json`, prepared from NVIS v7.0 Extant MVG area and the deduplicated public CAPAD 2024 boundary overlay. All 25 classified-native types are retained in the data; the display uses the same ten representative types as earlier chapters.

- Left: vegetation-type extant area / all classified-native extant area × 100.
- Right: vegetation-type area within public protection boundaries / all classified-native area within those boundaries × 100.
- Difference: right share minus left share, in percentage points.

Each complete 25-type distribution sums to 100%; the ten displayed types are not a complete distribution. The two denominators are deliberately different. This comparison describes composition, whereas Chart 10 describes coverage within each vegetation type. Both horizontal magnitude scales run from 0 to 40%, with the left scale reversed. Vegetation rows share an explicit common order, descending by all-native share. Central labels identify each paired row; tooltips retain the official full name and both percentages.

The default discovery shows Tussock Grasslands: about 7.6% of all classified native vegetation but 2.2% within public protection, a difference of about −5.4 percentage points. Selecting a row changes the discovery to that type. Hummock Grasslands, for example, has a difference of about +9.9 percentage points. Click either bar or its central label to highlight the row; click again to clear. This interaction does not filter or recompute denominators. No dropdown is provided for this non-map chart.

Public boundaries omit some private-land protection information. Differences in composition do not by themselves establish conservation priority, habitat quality or effectiveness. See `docs/overlay_methods.md` for scope, union, grid and missing-geometry details.

## Chart 12: official national coverage waffle

Inputs: `data/chart12_national_protection.json` and `data/chart12_waffle_cells.json`. Source: official CAPAD 2024 terrestrial national statistics, snapshot 30 June 2024.

- National land area: 768,828,858.6557069 ha.
- Official protected area: 173,493,467.85139734 ha.
- Protected share: 22.565941158185673%, displayed as 22.57%.
- Complement: 77.43405884181433%, displayed as 77.43%.

The 10 × 10 grid has 100 equal cells, each representing one percentage point. Twenty-two cells are fully green; 56.5941158% of the next cell is green. Each cell has the same gap, and the partially filled cell splits its usable width proportionally. Summing protected fractions therefore reproduces the original percentage rather than rounding it to 23 cells. Green and grey segments occupy distinct areas, including in the partial cell.

Read across each row from the top left. Cell positions are abstract and have no geographic meaning. Hover exposes cell number, category and protected fraction. Clicking a green or grey segment highlights that category and updates the nearby explanation; clicking it again clears the focus. Selection does not change the national value.

The national official total includes reported protection for which public geometry may be unavailable. It is not the public NVIS overlay total and must not be used as the denominator of Chart 11. The complement is labelled not protected in the CAPAD national total; this describes database coverage rather than a broader claim that no conservation occurs there.

## Specifications and validation

- `specs/chart11_representation_butterfly.vl.json`
- `specs/chart12_national_waffle.vl.json`

`balance.js` reads both specifications, supplies the prepared datasets, sets responsive widths and connects independent click signals and annotations. Runtime checks compile both specifications and verify full-distribution sums, symmetric scales, row ordering, selection/toggle behaviour, 100 waffle cells and exact fractional fill. SVG output was visually inspected. Browser interaction after deployment remains a user check.

## Bird map layout refinement

The bird grid in Part 2 now uses the full card width, with its reading guide below the plot instead of in a side column. Plot height is capped at 520 px to avoid a very tall full-width map. SVG rendering preserves native pointer targets. Data, geographical extent options, filter semantics and colour scale are unchanged.

## Sources

- DCCEEW NVIS data products: https://www.dcceew.gov.au/environment/environment-information-australia/national-vegetation-information-system/data-products
- DCCEEW CAPAD 2024: https://www.dcceew.gov.au/environment/land/nrs/science/capad/2024

This method document records calculations and implementation. The author will provide the final AI-use disclosure separately.

## Butterfly spacing refinement

Both magnitude axes explicitly show 0, 10, 20, 30 and 40%. Zero remains nearest the central labels. The central column is narrowed to 210 px on desktop, and concatenation uses flush bounds with 4 px spacing so bars sit closer to their row labels. The earlier protection colours and final-waffle layout are retained.

## Final-card reading hierarchy

Chart 12 uses three desktop columns: a primary 22.57% number and secondary 77.43% number on the left, a 320 px waffle in the middle, and a separate legend and partial-cell explanation on the right. The large number uses the existing Georgia heading family; explanatory text remains Arial. No annotation overlays cells. The guide moves below at narrower widths and the figure stacks on small screens. The official snapshot and unpublished-boundary scope remain in a concise footnote.

## Two-column closing layout

The final card now places a 320 px waffle on the left and the two national percentages, integrated colour keys and concise reading instructions on the right. The two columns are centred as a group with a 32 px gap; narrower screens stack the figure above the text. This supersedes the earlier three-column layout.

## Adaptive closing-card dimensions

The final two-column card uses fractional column widths and a plot that adapts to its available width up to 360 px. Below 700 px the plot stacks above the explanation and is capped at 320 px. Equal-area square cells and the exact fractional split are preserved; the chart is not stretched to fill a rectangular column.
