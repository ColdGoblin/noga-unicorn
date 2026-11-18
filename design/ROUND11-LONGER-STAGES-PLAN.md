# Round 11 plan: make stages 1-13 twice as long, with more challenges (18 Nov 2026, Ashkeeper)

Owner's words (18 Nov): "make a plan how to work on the stages already made and make them twice as long with more challenges". This is a PLAN only. Nothing in `game.js` is changed yet. Stage 13 voice (Whisper) is still pending and does not block this.

## 1. What we measured today (from `LEVELS` in `game.js`)

| # | Stage | Length px | Stars needed | Items | Platforms | Stations (what she does) |
|---|---|---|---|---|---|---|
| 1 | garden | 5600 | 5 | 3 | 11 | none (walk, collect, meet one friend) |
| 2 | rainbow | 6200 | 7 | 4 | 15 | count x1, slide |
| 3 | forest | 6600 | 10 | 11 | 11 | pot, fire, table, seek, rain |
| 4 | sky | 5600 | 5 | 3 | 4 | cloud x1, wind drafts, floaty |
| 5 | farm | 7400 | 6 | 12 | 4 | seek, bridge, horses, mill, bowl, oven, table |
| 6 | shabbat | 6000 | 8 | 7 | 3 | bowl, oven, bilam, candles, table |
| 7 | night | 6400 | 8 | 4 | 3 | simon, riddle, lanterns |
| 8 | castle | 8300 | 12 | 18 | 0 | plate x8, rhythm |
| 9 | oasis | 7500 | 13 | 7 | 2 | seek, well, bowl, oven, table |
| 10 | moon | 8200 | 15 | 5 | 6 | count, simon, rhythm, drafts |
| 11 | party | 7700 | 12 | 9 | 1 | bowl, oven, pot, fire, table, rhythm (then finale) |
| 12 | bouncy | 6500 | 8 | 8 | 1 | bounce, count, pads |
| 13 | candy | 8800 | 10 | 12 | 8 | feed x2, rain, machine, table, pads |

Key fact: Noga walks about 5.2 px per frame, so 6000 px is only about 20 seconds of pure walking. **Playing time is made by things to do, not by distance.** So "twice as long" must mean about twice the playing time, which means about twice the things to do. Stretching the ground without adding content would just be a long empty walk. Plan below doubles the length AND fills it.

Thin spots (stages that are mostly walking): 1, 4, 6, 7, 8 (no platforms), 12. Dense stages (already full of stations): 3, 5, 13.

## 2. Rules that do not change (owner's decisions)

- She can NEVER lose: no lives, no timer, no punishment. A "challenge" means more to do, finer aim, a longer memory, a bigger climb. A miss only means "try again" or the rescue bubble.
- Free tools only; Hebrew voice is the default; Noga rides Bil'am; the voice is not whispery.
- Commit and deploy only on the owner's explicit yes in chat, each time.
- Gentle for a 5-year-old who cannot read: every new goal is shown by a picture and said by voice. No text-only instructions.

## 3. The design: two halves with a rest stop

Each stage becomes **Part A (existing content, lightly retuned) + a rest stop + Part B (new content)**, length x2.

- **Rest stop in the middle** (a flag or a bench with a small reward: sparkle, a friend cheers). It saves her place: `save.half[stage]`. If the phone call comes or she closes the tab, "play again" offers to continue from the flag. This is what makes a stage twice as long safe for a 5-year-old.
- **Part B is a new set of challenges, not a copy.** It reuses station kinds that already exist in the code (list in section 4), so most of the work is data in `LEVELS`, not new code.
- **A ramp inside the stage**: Part A stays as it is (she knows it, it is safe); Part B asks for a bit more. Across the game the ramp also continues (stage 1 easiest, stage 13 hardest), as now.
- **Stars needed (`need`)** rises about 1.5x (not 2x, so it never feels like a chore). Bonus star rows are doubled along the new ground.
- **The goal banner and voice** tell her at the rest stop what is new ("now find..."). Reuse existing clips wherever possible (`ins_*`, `pr_*`, `num_*`, `fr_*`).
- **Optional extras (not required to finish):** a golden "secret" spot in Part B (a high climb, a hidden friend). Gives a sparkle and a praise line only. Never blocks passing.

## 4. Toolbox of challenges that already exist in the code

Stations: `count`, `pot`, `fire`, `table`, `seek` (hide and seek, tap), `rain` (catch falling things, also chocolate skin), `cloud`, `bridge`, `horses`, `mill`, `bowl`, `oven`, `bilam`, `candles`, `simon` (repeat a pattern), `riddle`, `plate`, `rhythm`, `well`, `bounce`, `feed`, `machine` (drag). Terrain and movement: stepped hills, cloud/branch stairs, tall camera world, wind drafts, slide, mud, streams, trampolines and big pads, Super Jump, carry items (pocket), hidden items, hint stations.

New things worth building ONCE and reusing in many stages (engine work, Phase 0):
1. **Rest stop + half save** (flag, `save.half`, continue prompt).
2. **Chase/collect run**: a short stretch where stars or friends float away on a path she follows (no fail, they wait).
3. **Memory trail**: a second flavour of `simon` using pictures of things from that stage.
4. **Moving platforms** (slow, forgiving) for the thin stages that only have flat ground.
5. **Multi-item deliveries**: a station that asks for 2-3 different things in any order (re-uses pocket and `to`).

## 5. Stage by stage target

Length is the target; `need` is the new star count. "B" = the new second half. Stations named here already exist unless marked NEW.

| # | Length | Need | Part B challenge ideas (new content) |
|---|---|---|---|
| 1 garden | 11200 | 5 to 8 | Stepping-stones across a stream (finer jumps), a hide-and-seek among flowers (`seek`), count the flowers (`count`), a second friend to meet, a small hill climb to a high feather |
| 2 rainbow | 12400 | 7 to 11 | A second, longer slide with a gap to bounce over, build a rainbow bridge (`bridge`), count the colours, cloud stairs to a tall star trail |
| 3 forest | 13200 | 10 to 14 | Night-forest cave section with a memory game (`simon`), a second hide-and-seek with two hiders, a treetop branch run, a second cooking cycle with a different order |
| 4 sky | 11200 | 5 to 8 | Longest gap in the game (stage is thin today): cloud-hop path with moving clouds NEW, a chain of wind drafts, catch raindrops (`rain`), greet a flock of cloud unicorns (`count`) |
| 5 farm | 14800 | 6 to 9 | Second harvest: a different order (wheat to mill to bowl to oven) for a second bread, chase the runaway chick NEW, horses again with a new pattern, a mud field to cross |
| 6 shabbat | 12000 | 8 to 12 | Friday-evening route: second set of candles and a table for each friend (`candles`, `table`), carry a challah across hills, a quiet song moment (`rhythm`), more platforms (only 3 today) |
| 7 night | 12800 | 8 to 12 | Lantern path with more lanterns to light in order (`lights`), a second `simon` (longer), a second `riddle`, a shooting-star catch (`rain`) |
| 8 castle | 16600 | 12 to 18 | Add the missing platforms: a tower climb (cotton/marsh-style steps), more `plate` guests, a second `rhythm`, a ballroom dance run, a hidden friend in a turret |
| 9 oasis | 15000 | 13 to 19 | A second well and a bucket relay (`well`), a camel/donkey trail with `bilam`-style carrying, hide-and-seek in the palms, a second bake |
| 10 moon | 16400 | 15 to 20 | Already long and hard: Part B is a low-gravity jump section (bigger pads), a `simon` in the stars, constellation `count`, drafts. Keep rest stops every ~4000 px |
| 11 party | 15400 | 12 to 17 | A second round of preparations (bowl/oven/pot/fire) for more guests, a second `rhythm`, balloon pop `rain`; the finale stays exactly as it is |
| 12 bouncy | 13000 | 8 to 12 | More pad chains with high candy, a new `bounce` goal (counter 2), tap-the-bubbles run (tap rule), a bigger castle to climb |
| 13 candy | 17600 | 10 to 15 | Second machine round with 3 NEW ingredients (drag, now 6), more hungry friends (`feed`), a second chocolate-fall climb. Wait for the owner to play the current version first |

Stages 3, 5 and 13 are already dense, so Part B there is more of the same ideas with a twist rather than a pile of new kinds. Stages 1, 4, 6, 7, 8, 12 are the ones where the doubling changes the feel the most.

## 6. Order of work (one writer in `game.js` at a time)

Phase 0: shared engine work (rest stop + half save, moving platforms, chase run, memory-trail option). One session. Test on a copy of stage 1.

Then in batches, each batch = design Part B, build it, bot-test, screenshots, hand over for a play:
- **Batch A (pilot): stages 1 and 2.** Owner plays on his phone before we continue. This decides whether the "two halves + rest stop" feel is right.
- Batch B: stages 3, 4, 5
- Batch C: stages 6, 7, 8
- Batch D: stages 9, 10, 11
- Batch E: stages 12 and 13 (13 only after the owner plays the current one)
- Final pass: whole-game bot run, phone check, voice pass, then ask the owner about commit and deploy.

Why in batches: the owner plays early, parallel sessions overwrite each other in `game.js` (this has already cost work), and the voice/art requests can go out in groups.

## 7. Supporting work by batch

- **Voice (Whisper):** write new lines only where no clip fits; one list per batch (`design/VOICE-V10.md` and onward), exact text in `lines.js` first. Browser voice covers the gap until the mp3 arrives.
- **Art (Ghost/Ironwing):** reuse existing props first. Ask only for what is truly new (a flag, a bench, moving cloud). One spec per batch (`ASSETS-V11.md` and onward). Backdrops are already 3600 px wide; check they tile/scroll without a seam on the longer ground.
- **Music:** each stage has one loop. At twice the length it may feel repeated; plan one optional second track for the long stages (8, 10, 13) or a quiet variation at the rest stop. Not a blocker.
- **Tests:** `tools/runall.sh <n>` is about 1 minute per stage; the full run goes from about 10 to about 20 minutes. Extend `t_bot.js` to pass through the rest stop and to play every new station. Run stages one by one in the background, never two test runs at once (they share `_t.html`).
- **Backups:** `_backup-20261115/game.js.before-round11-<batch>` before each batch.
- **Saves:** the save key (`nogaUnicorn2`) stays so nobody loses progress; add `half` as a new optional field. A stage already finished stays finished.

## 8. Risks and how we handle them

| Risk | Handling |
|---|---|
| A 5-year-old tires in a doubled stage | Rest stop with saved place; Part B rewards often; optional extras never block; owner plays Batch A first |
| Doubled length is dull walking | Never stretch ground alone: every ~1500 px there is something to do, checked by a script that lists the gaps between things |
| Challenge turns into losing | Every new challenge has the "try again" path (as in `machine`: a wrong drop floats back); review each against the never-lose rule |
| `game.js` is one big file, edits collide | One writer at a time, per-batch backups, commit only your own files |
| Saves/old progress broken | New optional `half` field only; same save key |
| Voice and art delay the work | Stand-ins and browser voice first, as in rounds 9 and 10 |

## 9. What is needed from the owner

One answer only: start with Batch A (stages 1 and 2) as the pilot and play it before the rest? Recommended: yes. Everything else follows the defaults above and can be changed after the pilot.

## 10. Update 18 Nov (pilot, Batch A built) - READ FIRST

**Correction to section 1:** round 8 had already stretched stages 1-11 by 500-800 px each (code `addExt`). The table in section 1 was measured before that. Real lengths now (and the x2 target): garden 6300 (12600), rainbow 6950 (13900), forest 7400 (14800), sky 6600 (13200), farm 8150 (16300), shabbat 7100 (14200), night 7100 (14200), castle 8900 (17800), oasis 8100 (16200), moon 8750 (17500), party 8350 (16700), bouncy 6500 (13000), candy 8800 (17600). Also `need` for stage 2 is 10, not 11 (there is no recorded "eleven" clip; numbers go to ten).

**Built in `game.js` (backups `_backup-20261115/*.before-round11-A`):**
- Halfway flag: `L.rest = { x, say }`. Reaching it saves `save.half[stage] = { it: [item indexes], bn: stars }`; opening the stage from the map (`goLevel`, picker, first play) starts her at the flag with everything left of it counted as done; finishing the stage clears it. `__g.start(i)` still starts from the beginning (tests); `__g.start(i, undefined, true)` resumes.
- `addB(n, at, by, fn)` (just above `REST_W`): opens a hole at `at`, shifts the rest of the stage right by `by`, and lets `fn` fill it with terrain (`flat`, `ramp`), `plat`, `item`, `station`, `meet`, `pad`, `stars`, `rest`, `need`. This is the tool for batches B-E.
- Stage 1 Garden is now 12600 px, needs 8 stars, 5 feathers: flag at 5760, numbered bubbles, ridge, 350 px stream on stones, hide and seek, friend Luna to jump for, cloud stair to a top feather, trampolines.
- Stage 2 Rainbow Road is now 13900 px, needs 10 stars, 6 bubbles (a green and a red one added), 750 px gap crossed on three moving bubbles, falling stars, flag at 6950, rainbow ridge, cloud walkway over a 600 px gap, a second round of numbered bubbles, then the old finale (count, cloud hops, slide, friend).
- New voice: none (reused `pr_14`, `ins_10`, `num_08`, `num_10`, `pr_05`).
