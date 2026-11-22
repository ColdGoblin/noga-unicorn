# Noga and the Unicorn: the 8 stages, version 2 (15 Nov 2026)

Owner's request (15 Nov): eight full stages, rising difficulty, a goal in each, and Noga picks up everything on the map. In some stages the things she picks up are USED: ingredients go into the oven, candles get lit. Different music for each stage.

This builds on `LEVEL-DESIGNS.md` (the places, friends and voice clip ids stay). What changes: every stage from 4 on has a two-step chain, **pick up, then use**, and the steps get longer. Stages 1-3 keep what is built, with one small "use" step added.

## Rules for all stages

- **Picture goal bar.** She cannot read. The top bar shows the pictures of what is needed, as outlines that fill. The voice says the goal at the start.
- **Pocket.** What she picks up rides in a pocket (top left, up to 3 things). Walking near the right place drops the thing in by itself, with a happy sound. She can never carry the wrong thing: only things that belong to the stage can be picked up.
- **She cannot lose.** Rescue bubble after a fall. No timer, no enemies. Dancing never hurts anything.
- **Stars** (gold): from stage 1, needed count rises per stage. Super Jump from stage 3.
- **Difficulty** rises by: more things (3, 4, 5, 6, 7, 8), a longer chain, hills and gaps, then things that wait for a dance (stage 6) or a riddle (stage 7). Never by speed.
- **Parade:** each helped friend joins and follows her.

## The stories

| # | Place | Story in two lines | Chain (pick up, then use) | Things | Music mood |
|---|---|---|---|---|---|
| 1 | Noga's Garden | Mama Bird lost three feathers and the baby bird cannot fly. | Pick 3 feathers, then they float to the baby bird's wings. | 3 | Morning birds, light flute and pizzicato, a skip in the step |
| 2 | Rainbow Road | Pitzi sneezed and four coloured bubbles flew off. | Pick 4 bubbles (red, yellow, green, blue), then pop each into the matching colour band of the rainbow. | 4 | Dreamy music-box and glockenspiel, rising scales |
| 3 | The Magic Forest | The little tree is bare and thirsty. | Collect 3 drops from the brook, pour on his roots (he wakes), then pick 5 petals with Super Jump and dress him. | 3 + 5 | Soft harp and wooden flute, fireflies shimmering |
| 4 | Cotton Candy Cloud | Three unicorns are stuck inside the pink cloud. | Pick 3 steam puffs from Grandpa's teapot while climbing, carry them up, one puff frees one unicorn. Floaty sky jumps. | 3 | Slow lullaby celesta and strings, a little spacey |
| 5 | The Muddy Farm | The horses Armon and Anana are stuck in mud. | Pick 5 planks, lay a bridge across the mud, then pick 2 carrots and feed the horses. | 5 + 2 | Cheerful fiddle and banjo, clapping rhythm |
| 6 | The Shabbat Garden | Friday afternoon: the table is not ready. | See below: bake challah, feed Bil'am, light the candles. | 3 + 4 + 2 | Warm, gentle: acoustic guitar, hand drum, soft Shabbat feel |
| 7 | The Night of Shadows | The fig tree lost its shadow. | Pick 4 ribbon pieces to light the path, solve a colour riddle, then Dance to call the shadows. | 4 + riddle | Mysterious but friendly: soft synth pads, bells, quiet bass |
| 8 | The Flower Party | The princesses' party at the castle. | Pick 10 flowers, then bring one gift from each earlier world to the party table (memory round), then the big Dance. | 10 + 8 | Grand and joyful: orchestra, parade drums, fanfare |

## Stage 6 in detail (the owner's example): the Shabbat table

Goal bar: oven, carrot, candle pictures.

1. **Bake the challah (3 things).** The rhino chef waits at the oven. Noga picks up three ingredients spread over the garden: **flour sack, eggs, honey jar**. Each one drops into the mixing bowl when she brings it. After the third, the dough goes into the oven, the oven door glows, a happy sound, and a golden challah comes out. She picks the challah up and puts it on the table.
2. **Feed Bil'am (4 carrots).** Same as before; carrots in the garden bed, behind a bush, on a wall, on the rhino's back.
3. **The candles.** Two light-sparks run from her. She dances; they come and settle on the two candles. Solomon, the adult, handles the real candles in the story.
4. **Everyone sits,** Luna curls up, stars come out.

## Stage 8 in detail: the memory round

After the flowers and the gate, the party table has eight empty round plates with pictures of the eight stages. The voice asks, one at a time, for a thing she met before. She finds it floating in the courtyard and puts it on the plate: **feather, rainbow bubble, petal, steam puff, plank, challah, ribbon, flower**. A wrong pick just wobbles and returns; the voice repeats the question. When the table is full: fireworks and the big Dance.

## What is new to build

Game code: the pocket, drop-off stations (bowl, oven, nest, tree roots, bridge, candles, party table), a recipe card in the goal bar, levels 4-8 data, a music player with one loop per stage.

Pictures (for Ghost): see `ASSETS-V2.md`. Music: see `MUSIC-BRIEF.md`.
