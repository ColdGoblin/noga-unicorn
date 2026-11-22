# Level designs: Noga and the Unicorn

Version 1, 14 Nov 2026. Clip ids (`ins_02`, `l1_a`) refer to VOICE-SCRIPT.md. File names refer to ASSET-LIST.md.

Not yet decided: the device Noga plays on. These designs assume a touch screen held sideways and also work with a keyboard.

## Rules that hold in every level

**Screen.** The world scrolls left to right. Noga on the unicorn stays about one third from the left edge. The parade of helped friends follows behind her.

**Buttons.** Bottom left: two blue arrows. Bottom right: green Jump, pink Dance, yellow star Super Jump. A button that is not taught yet is hidden, so level 1 shows only arrows and Jump.

**Top of the screen.** Left: the item she is collecting, shown as empty outlines that fill in (three feather outlines, and so on). Right: the star meter (three stars). A small friend face shows who she is helping.

**She cannot lose.**
- Falling into a gap: a rainbow bubble lifts her back to the last safe spot. `pr_10` or `pr_11` plays.
- Nothing hurts her. There are no enemies and no timer.
- Every item is reachable with a normal jump unless the level teaches Super Jump, and then a star is always placed just before the high place.

**Help when she is stuck.**
- 8 seconds without progress: the current instruction repeats and the right button glows.
- 20 seconds: a dotted sparkle trail appears from her to the next item or friend.
- 40 seconds: the item floats slowly toward her.

**Voice order.** One clip at a time. An instruction waits for praise to finish. Counting (`num_`) plays on every pickup. Praise plays on about one pickup in three so it does not become noise.

**Flow of every level.**
1. Friend appears sad, hello line (`l#_a`).
2. Collect instruction. Collect, with counting.
3. `ins_24` Go to your friend. Trail appears.
4. Next to the friend: `ins_06`, Dance button glows.
5. Dance: friend becomes happy, speaks, joins the parade, teaches a new dance move.
6. Ending line (`l#_c`), sticker lands in the album, level end praise.

**Stars and Super Jump.** Stars are scattered in every level from level 3 on. Three stars fill the meter. `ex_03` plays and the star button glows. Super Jump draws pencil wings and gives one jump about three times the normal height with a slow, floating fall. The meter empties after the jump.

**Dance moves collected.** Level 1 hop, 2 spin, 3 sway, 4 float twirl, 5 stomp, 6 wiggle, 7 bow, 8 all of them in a row.

---

## Level 1: Noga's Garden

- **Friend:** the baby bird, standing on a stone near the end. Pitzi waits at the start and waves. Mama Bird watches from a tree.
- **Collect:** 3 feathers. **New:** walk and jump. **Buttons shown:** arrows, Jump.
- **Length:** short, about 2.5 minutes. Flat ground, no gaps.
- **Background:** `bg_garden`. Morning, puddles, fig tree, rainbow far away.

| Step | What she meets | Voice |
|---|---|---|
| 1 | Pitzi waves. Arrows glow. | `ex_01` on title, then `l1_a`, `ins_01` |
| 2 | Feather 1 on the ground, impossible to miss. | `ins_11`, then `num_01` |
| 3 | Shluli the puddle. Walking through makes a splash. | `fr_05` |
| 4 | A low stone. Jump button glows. Feather 2 floats just above it. | `ins_02`, `num_02` |
| 5 | Stone, rock, mushroom: three steps rising. Feather 3 on the mushroom. | `ins_05`, `l1_b`, `num_03`, `pr_12` |
| 6 | Bobo the dog sleeps on the grass. Landing on him: he sneezes and bounces her high, just for fun. | `fr_04` |
| 7 | The baby bird. She arrives and the feathers fly to him by themselves (Dance is not taught yet). He flaps and flies a loop. | `ins_24`, `fr_01`, `l1_c`, `pr_02` |

- **Joins the parade:** the baby bird (flies above her) and Pitzi.
- **Sticker:** `sticker_1` (bird).

## Level 2: Rainbow Road

- **Friend:** Pitzi (already with her; here he is the one who needs help). The white unicorn's rainbow is the road.
- **Collect:** 4 rainbow bubbles. **New:** Dance, and riding floating bubbles. **Buttons added:** Dance.
- **Length:** about 3 minutes. Two small gaps, each with a big slow bubble that carries her across.
- **Background:** `bg_rainbow`. Sky road in rainbow stripes, soft clouds.

| Step | What she meets | Voice |
|---|---|---|
| 1 | Pitzi sneezes and four bubbles float away. | `fr_02`, `l2_a`, `ins_12` |
| 2 | Bubble 1 low over the road. | `num_01`, `col_01` (the bubble is red) |
| 3 | First gap with a large bubble drifting across it. | `ins_13` |
| 4 | Bubble 2 above the large bubble's path. | `num_02`, `col_02` |
| 5 | Wide open stretch. Dance button appears and glows. Dancing here makes flowers pop up along the road. | `ins_06`, `ins_07`, `pr_07` |
| 6 | Bubble 3, then second gap, then bubble 4 on a small cloud step. | `num_03`, `col_03`, `l2_b`, `num_04`, `col_04` |
| 7 | Pitzi waits at the end. Dance next to him. All four bubbles circle them. The shiny feather drops out of the last bubble. | `ins_24`, `ins_06`, `fr_03`, `l2_c`, `pr_02` |

- **Colour rule:** each bubble has one clear colour and the voice names it when she takes it.
- **Sticker:** `sticker_2` (Pitzi).

## Level 3: The Magic Forest

- **Friend:** the little tree, in a clearing at the end. He has a kind face in the bark and bare branches.
- **Collect:** 5 pink petals. **New:** Super Jump. **Buttons added:** Super Jump.
- **Length:** about 3.5 minutes. Tree-stump steps, two high branches.
- **Background:** `bg_forest`. Soft green light, tall trunks, fireflies.

| Step | What she meets | Voice |
|---|---|---|
| 1 | The little tree is shown first in a short picture, then she starts at the forest edge. | `l3_a`, `ins_14` |
| 2 | Petals 1 and 2 on the ground and on a stump. | `num_01`, `num_02`, `col_05` |
| 3 | Three stars in a row. Meter fills. Star button appears and glows. | `ex_03`, `ins_08` |
| 4 | A high branch with petal 3. Only Super Jump reaches it. Pencil wings are drawn. | `ins_15`, `ins_09`, `ex_04`, `pr_09`, `num_03` |
| 5 | Stump steps with petal 4. Three more stars. | `num_04`, `ex_03` |
| 6 | Second high branch with petal 5. | `ins_25`, `num_05`, `pr_12` |
| 7 | The clearing. Dance next to the tree: the parade forms a circle around him, he sways his branches, one crooked bud opens, then the whole tree blooms and petals fall like confetti. | `ins_24`, `l3_b`, `ins_06`, `fr_06`, `l3_c`, `pr_17` |

- **If she misses the Super Jump:** three new stars appear at the same spot at once.
- **Joins the parade:** Bil'am the donkey arrives for the dance and stays. (The tree keeps his roots; he waves.)
- **Sticker:** `sticker_3` (blooming tree).

## Level 4: The Cotton Candy Cloud

- **Friend:** Koko the space monkey, sitting on the pink cloud. Three unicorns are stuck inside it: three glowing horns and three wagging tails stick out.
- **Collect:** 3 puffs of warm tea steam, one for each unicorn. **New:** floaty sky jumps.
- **Length:** about 3.5 minutes. Evening sky, cloud platforms. Jumps here are slow and high.
- **Background:** `bg_sky`. Orange evening turning to stars, the moon large and near.

| Step | What she meets | Voice |
|---|---|---|
| 1 | Koko waves from the cloud. Grandpa Yehuda stands in the garden below with his teapot, which sends up puffs of steam. | `fr_07`, `l4_a`, `ins_16` |
| 2 | Cloud steps upward. Steam puff 1. It floats to the cloud by itself and one unicorn pops out. | `num_01`, `l4_b`, `fr_09` |
| 3 | Stars along the way. A wide gap between clouds needs Super Jump. | `ex_03`, `ins_08`, `ex_04` |
| 4 | Steam puff 2. Second unicorn pops out. | `num_02`, `l4_b` |
| 5 | Steam puff 3 near the moon. Third unicorn pops out. | `ins_25`, `num_03`, `pr_12` |
| 6 | Dance on the big cloud with Koko and the three unicorns. The cloud becomes a pink sky carriage and everyone rides it past the moon. | `ins_06`, `l4_c`, `fr_08`, `pr_02` |

- **Words:** `col_05` when she first lands on the pink cloud.
- **Joins the parade:** the three cloud unicorns. Koko flies off to the moon and returns for level 8.
- **Sticker:** `sticker_4` (Koko).

## Level 5: The Muddy Farm

- **Friends:** the horses Armon (brown, white mark on his forehead) and Anana (grey, dark mane), stuck by the gate. Grandpa Yehuda stands behind the fence.
- **Collect:** 5 wooden planks. **New:** building. Each plank she collects lays itself across the mud in front of the horses.
- **Length:** about 3.5 minutes. Farm path after rain.
- **Background:** `bg_farm`. Wet leaves, fence, stable, puddles.

| Step | What she meets | Voice |
|---|---|---|
| 1 | The horses, legs in the mud. | `l5_a`, `fr_10`, `ins_17` |
| 2 | Mud patches on the path. Walking in mud is slow and makes a funny "shloop" sound. Jumping over is faster. Either is fine. | `ins_03` |
| 3 | Planks 1 to 3 along the path, on hay bales and by the fence. A small picture in the corner shows the bridge growing. | `num_01` to `num_03`, `l5_b` |
| 4 | Plank 4 on the stable roof: Super Jump. | `ins_15`, `ex_03`, `ins_08`, `num_04` |
| 5 | Plank 5. Bridge complete. | `ins_25`, `num_05`, `pr_12` |
| 6 | Back at the gate (the path loops, no walking back). Armon steps out: `num_01`, `col_09`. Anana steps out: `num_02`, `col_10`. | `ins_24` |
| 7 | Dance with the horses. Anana snorts and a drop of mud lands under Grandpa's nose. | `ins_06`, `l5_c`, `fr_11`, `pr_15` |

- **Joins the parade:** Armon and Anana.
- **Sticker:** `sticker_5` (horses).

## Level 6: The Shabbat Garden

- **Friends:** the woolly white rhino (baking), Bil'am (hungry), King Solomon (tea and the two candles), Luna the cat (asleep at the table).
- **Collect:** 4 carrots, then 2 golden light-sparks. **New:** the sparks run away from her and come only when she dances.
- **Length:** about 4 minutes. Friday afternoon, table set in the garden.
- **Background:** `bg_shabbat`. Golden light, long table, fig tree.

| Step | What she meets | Voice |
|---|---|---|
| 1 | The table. The rhino holds a giant crooked challah. | `l6_a`, `fr_13`, `ins_18` |
| 2 | 4 carrots in the vegetable bed, behind a bush, on a wall, and on the rhino's back (he is a big soft platform). | `num_01` to `num_04`, `col_08` |
| 3 | Bil'am gets his carrots and flaps his small drawn wings. | `fr_12`, `pr_16` |
| 4 | Solomon sets out the candles. Two sparks of light dance out of reach. | `fr_14`, `ins_19` |
| 5 | The sparks keep one jump ahead of her. After a few seconds the hint comes. | `l6_b`, `ins_06` |
| 6 | She dances. The sparks drift down to her, circle, and settle on the two candles. | `num_01`, `num_02`, `col_04` |
| 7 | Everyone sits. Luna curls up. Stars come out. | `l6_c`, `pr_17` |

- **Safety in the story:** the sparks are light, not fire. Solomon, an adult, handles the candles.
- **Joins the parade:** the rhino, Solomon and Luna (Luna rides on the rhino).
- **Sticker:** `sticker_6` (challah and candles).

## Level 7: The Night of Shadows

- **Friends:** the Riddle Tree (glowing green eyes, purple flowers) and the wandering shadow of the fig tree.
- **Collect:** 4 pieces of silver ribbon. **New:** a gentle night level and one picture riddle.
- **Length:** about 4 minutes.
- **Background:** `bg_night`. Deep blue, never black. A warm glow surrounds the unicorn, and each ribbon piece she collects lights a stretch of path for good.

| Step | What she meets | Voice |
|---|---|---|
| 1 | The fig tree has no shadow. A shadow tiptoes away. | `l7_a`, `ins_20` |
| 2 | Ribbon pieces 1 and 2. Fireflies mark where to jump. | `num_01`, `num_02` |
| 3 | The Riddle Tree. Three big things appear in front of her: a red apple, a blue ball, a green leaf. | `l7_b`, `fr_15`, `ins_21` |
| 4 | She walks to one and jumps on it. Right: it bursts into sparkles. Other two: they giggle and wobble, and the red one glows brighter. | `col_01`, `pr_12` |
| 5 | Ribbon pieces 3 and 4, one needing Super Jump. | `num_03`, `ex_03`, `num_04` |
| 6 | The garden stage. Dance: the shadows of every friend in the parade dance on a white sheet behind them. | `ins_06`, `l7_c`, `pr_08` |

- **Replay:** the riddle changes to blue (`ins_22`), then green, with new objects.
- **Joins the parade:** the Riddle Tree's flower (he cannot walk, so he sends one purple flower that bobs along).
- **Sticker:** `sticker_7` (silver ribbon).

## Level 8: The Flower Party

- **Friends:** everyone. Two princesses wait at the castle gate.
- **Collect:** 10 flowers along the road, so she counts all the way to ten. **New:** nothing. This level is the reward.
- **Length:** about 4 minutes.
- **Background:** `bg_castle`. The castle beyond the hill, flags, flower arches.

| Step | What she meets | Voice |
|---|---|---|
| 1 | The whole parade behind her on the road to the castle. | `l8_a`, `ins_23` |
| 2 | 10 flowers, each a different colour, easy to reach. Friends in the parade jump when she jumps. | `num_01` to `num_10`, colours as she takes them, `pr_19` |
| 3 | The castle gate. | `fr_16`, `ins_24` |
| 4 | The courtyard. The Dance button fills half the screen. | `l8_b`, `ins_07` |
| 5 | Each press plays the next dance move she learned, in order, with every friend copying it. After the eighth move: fireworks, petals, Koko flies past on his cloud. | `pr_07`, `pr_08`, `fr_08` |
| 6 | The album opens, all eight stickers shining. | `l8_c`, `pr_20`, `ex_05` |

- **Sticker:** `sticker_8` (crown).

---

## After the last level

All levels stay open from a picture map. On replay, items sit in new places and the Level 7 riddle changes. Dancing is always available from level 2 on.

## What to watch when Noga first plays (levels 1 to 3)

1. Does she understand "jump" from the voice and the glowing button, without an adult?
2. Does she find the Dance button by herself the second time?
3. Does she notice the parade behind her?
4. Where does she stop for more than ten seconds?
5. Which voice lines does she repeat out loud?
6. Does she ask to play again?
