# Round 10 plan: stage 13 Candy Land (17 Nov 2026, Hexweaver)

Owner's words (Hebrew): the next stage is Candy Land: a sweet trampoline, lots of candies, lollipops and candy canes you TAKE, an inflatable castle made of cotton candy that you climb, everything made of sweets, chocolate stars falling, a chocolate waterfall with marshmallows, Noga and the friends eat the sweets and also make new sweets, and something new to do: press and DRAG things into a machine that makes the candies.

## What was built (all in `LEVELS[12]`, name `candy`, length 8800, needs 10 gold stars; opens on the map after stage 12, stop 13 at [73, 47] percent)
| Part | How it plays |
|---|---|
| Sweet trampolines | `pads` kind `candy` (and one `big` at x 2350 that flies to the high candy). Same bounce as stage 12. |
| Candies | 7 candies (some high over the pads, one on the castle, one on the marshmallow steps). Gold stars are the usual `bonus` arcs. |
| Lollipop + candy cane | Two things she TAKES (pocket): the lollipop at x 900, the candy cane on the castle roof at x 4800. |
| Hungry friends | Station kind `feed` (new): a friend with a wish bubble (pink unicorn x 2050 wants the lollipop, blue unicorn x 5350 the candy cane). She brings it, the friend eats and bounces. |
| Chocolate stars | Station kind `rain` with `skin: 'choc'`: brown stars fall, catch 6 (x 2600-3250). |
| Cotton-candy castle | Backdrop prop `cotton_castle` (x 4360, 1250 wide); five fluffy `cotton` platforms in front climb to the roof (G-110, -230, -350, -470, -540). Candy and the candy cane up there. |
| Chocolate waterfall | Prop `choc_fall` (x 5900) with a marshmallow pool; three `marsh` platforms (G-110, -215, -320) climb beside it to a candy. |
| Candy machine (NEW) | Station kind `machine` (x 7000, hopper 330 px above ground): three ingredients (sugar, chocolate, strawberry) float to its left. PRESS one and DRAG it into the hopper (pointer drag, mouse or finger; dropping elsewhere floats it back). Standing next to the machine for 3 s sends the next one in (never stuck). Three in: it shakes, then three new candies pop out (hidden items revealed by `spawn: 'made'`, offsets `dx`). |
| Feast | Station kind `table` (x 7750, needs the 3 made candies); then two bunicorns eat and bounce (`hap: 'feast'`). Friend `bunicorn_mint` at x 8350, dance to finish. |

New code (game.js): item kinds `lollipop candycane chocstar sugar chocbar strawberry` (canvas stand-ins), platform kinds `cotton` and `marsh`, prop stand-ins `CPROP.cotton_castle` / `CPROP.choc_fall`, station kinds `feed` and `machine` (`dragStart / dragMove / dragEnd` on the canvas pointer events, `sendTok`), `complete()` reveals every hidden item of a `spawn` group, `curIns()` keeps giving station hints when only hidden items are left (`hintStations`), a 'candy' backdrop, `__g.dragTok / cam` for tests, `MUSIC_ALIAS stage13 -> stage12`.

Tests: `tools/runall.sh` now runs 13 stages (the bot drags the machine tokens through `__g.dragTok` and drops one in the wrong place first), `tools/t_drag.js` (real pointer events at phone size), `tools/t_map13.js` (map stop 13, picker, start).

## Requests
Ghost: `ASSETS-V10.md` (backdrop, castle, waterfall, machine, 6 items, sticker, map). Whisper: `VOICE-V9.md` (12 Hebrew clips). Until they exist everything is drawn by code and read by the browser. Music for stage 13: Ghost with the owner's Gemini (`stage13.mp3`).
