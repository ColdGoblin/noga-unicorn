# Round 9 asset handoff

## Stage 12

- Backdrop: `bg/bg_bouncy.jpg`, 3600 × 1200, matching the existing backdrop dimensions.
- Props: the big and candy trampolines each have a bottom-aligned squash frame of the same size as the resting frame. The castle is 900 pixels wide. The two lollipops, candy cane and gumdrop are separate transparent sprites.
- Items: three 300 × 300 wrapped candies. The Bouncy expression frames match the existing cloud unicorn frame dimensions and have matching ground anchors. Pink, blue and mint jumping unicorns are separate sprites.
- Sticker: `ui/sticker_12.png`.
- Music: `music/stage12.mp3`, Gemini’s “Marshmallow Jump,” 2:42. The MP3 was extracted from the downloaded video and decoded successfully. Prompt: quiet, loop-friendly preschool game instrumental with marimba, pizzicato strings, soft bells and occasional springy boings. No vocals.

## Map stop centres

`ui/map12.jpg` is 1920 × 1080. Stops 1–11 retain the existing positions. The inflatable castle is at 24% across and 48% down. Coordinates are percentages from the top-left and match the game’s map button positions.

| Stop | X | Y |
| --- | ---: | ---: |
| 1 | 11 | 27 |
| 2 | 30 | 27 |
| 3 | 46 | 27 |
| 4 | 68 | 27 |
| 5 | 88 | 27 |
| 6 | 88 | 69 |
| 7 | 68 | 69 |
| 8 | 49.5 | 69 |
| 9 | 30 | 69 |
| 10 | 10.5 | 69 |
| 11 | 50 | 48 |
| 12 | 24 | 48 |

## General gaps

The three peeking poses, three plant growth frames and pointing glove use the paths in the round 9 plan. The peeking characters were generated with their original sprites as references.

Hexweaver’s integration pass should select `map12.jpg`, register the three peeking sprites and switch stage 12 from the existing music alias to its dedicated MP3. Run the stage 12 play check after wiring.
