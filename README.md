# Iraq Treasury Risk Dashboard

Static internal-reference dashboard for Iraq collections and cross-border payment risk. Open `index.html` locally or publish the folder using GitHub Pages.

## Data discipline

The latest snapshot is dated 6 September 2026. Public figures without a newly accessible primary-source update are explicitly labelled **stale** and retain their original data cut-off. The dashboard deliberately excludes Layer D from the composite score until internal finance supplies AR total, >90-day AR, collection plan/actual, local cash, monthly fixed spend, customer AR split, and in-transit wire data. It reports collection-risk level, direction, A/B/C/D scores, and attribution; it does not estimate collection days.

## Weekly refresh

Append (do not overwrite) a row in `iraq_treasury_history.csv`, add a quarter only when an official filing is available, and update the values embedded in `index.html`.
