# Round 4 delivery

All 29 files listed in ASSETS-V4.md are saved in art under the exact requested names. Backgrounds were delivered first; the remaining files were exported in A+B, then C+D order. Generation/export synchronization delayed the first batch.

## Delivered files

- bg/bg_oasis.jpg
- bg/bg_moon.jpg
- friends/sheba_sad.png
- friends/sheba_happy.png
- friends/camel_sad.png
- friends/camel_happy.png
- friends/moon_sad.png
- friends/moon_happy.png
- props/prop_well.png
- props/prop_well_full.png
- props/prop_sandmound.png
- props/prop_palm.png
- props/prop_lantern_red.png
- props/prop_lantern_red_lit.png
- props/prop_lantern_blue.png
- props/prop_lantern_blue_lit.png
- props/prop_lantern_green.png
- props/prop_lantern_green_lit.png
- props/prop_lantern_yellow.png
- props/prop_lantern_yellow_lit.png
- props/prop_windswirl.png
- items/item_gem.png
- items/item_moonstar.png
- items/item_numbubble.png
- items/item_chick.png
- items/item_shootingstar.png
- ui/sticker_9.png
- ui/sticker_10.png
- ui/map10.jpg

## Dimensions and checks

Backgrounds: 3600 x 1200 JPEG. Map: 1920 x 1080 JPEG. Queen: 250 pixels tall. Camel: 230 pixels tall. Moon: 330 pixels tall. Lanterns: 220 pixels tall. Wells: 400 pixels wide. Sand mound and wind: 300 pixels wide. Palm: 400 pixels tall. Collection items: longest side 300 pixels, except chick 200 pixels. Stickers: 300 x 300 transparent canvases. PNGs preserve generated alpha and were mechanically trimmed/resized. Character state canvases are padded to a common width and aligned at the feet. Contact sheet and map visually inspected; no game code changed.

## References

Inspected art/bg/bg_farm.jpg for the existing look. Inspected art/ui/map.jpg and supplied it to the image tool to retain its eight destinations. WORLD_BIBLE.md confirms the Queen belongs to the world. No matching Queen, camel, or Moon story plate was found by filename; these designs follow the round-four brief without a verified story-plate likeness. New scenery, props, activity pieces and stickers have no specific story-plate reference.

## Generation and prompt set

Built-in image generation was used. No paid API configured. One image per sprite, requesting pastel children's storybook style, thick clean outlines, soft flat shading, entire isolated object, actual transparency, no text. Subject descriptions follow ASSETS-V4.md. Background prompts specify warm sunset desert oasis and violet starry rainbow mountain, with open lower-third walking ground. Map edit requests ten distinct destinations on a winding path, retaining the original eight designs and adding oasis and Moon Mountain.

## Limitations for integration

State variants were generated separately. Character silhouettes and lantern poles differ between states; the green lit lantern uses a notably different support. These need owner review if exact state matching is required. Backgrounds are not verified pixel-seamless. The map reflows the eight original destinations into two rows of five to fit the new stops. It preserves the destination artwork rather than the old pixel positions.

## Map stop centers

Measured visually from the finished map, percentage of width and height from the top-left. Coordinates refer to centers of the illustrated destinations; the game may place buttons slightly below them.

|Stage|Destination|x %|y %|
|---|---|---:|---:|
|1|Garden|10.5|28|
|2|Rainbow|30|28|
|3|Forest|50|28|
|4|Candy cloud sky|69.5|28|
|5|Farm|89|28|
|6|Shabbat table|88.5|69|
|7|Night garden|69|69|
|8|Flower Party castle|50|69|
|9|Queen of Sheba Oasis|30|69|
|10|Moon Mountain|10.5|69|
