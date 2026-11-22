# Round 6 art delivery

All 14 assets in design/ASSETS-V6.md are included.

| Folder | Filename | Export |
| --- | --- | --- |
| bg | bg_party.jpg | 3600 × 1200 |
| bg | bg_finale.jpg | 3600 × 1200 |
| props | prop_firework_pink.png | 600 × 600 |
| props | prop_firework_gold.png | 600 × 600 |
| props | prop_firework_blue.png | 600 × 600 |
| props | prop_heart_pink.png | 200 × 200 |
| props | prop_heart_red.png | 200 × 200 |
| props | prop_heart_gold.png | 200 × 200 |
| props | prop_confetti.png | 300 × 300 |
| props | prop_bunting.png | 1200 pixels wide |
| props | prop_dancefloor.png | 1400 × 200 |
| props | prop_discoball.png | 300 pixels tall |
| ui | sticker_11.png | 300 × 300 |
| ui | map11.jpg | 1920 × 1080 |

The new pink party pavilion is centered at **50% across, 48% down** (pixel 960, 518). It was composited onto the original map in the space between the rows. All ten original destinations retain their art and positions.

The game prefers map11 when available and falls back to its older maps. The stage 11 button keeps its hit area and moves its status icon aside so the pavilion is visible. Dancing during the finale draws the confetti sprite. Completing the finale awards sticker 11.

The JPEGs are exported at the requested sizes. PNGs have transparent backgrounds. Backgrounds and the sprite sheet were visually inspected.

Headless Chrome passed at desktop and narrow landscape window sizes. The test checked all 12 canvas images were drawn in stage 11 or the finale, the new map showed 11 stops, and the final sticker loaded.
