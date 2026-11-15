# Handoff: Noga and the Unicorn

## ROUND 3 PROGRESS (15 Nov 2026, fifth session, Hexweaver) - read this before the list below
Done in code (uncommitted, not yet republished to the Artifact): **1 spelling** (נוגה in `lines.js` and `game.js`; `index.html` is English only; the title picture has no name painted in, nothing to redo). **2 trampoline**: level-1 pad now draws `prop_trampoline.png` / `prop_trampoline_squash.png` (squash for 14 frames after a bounce), the `fr_04` dog voice is no longer played (boing sound only); until the picture exists the old Bobo drawing shows. **3 dad**: `dad` is a level-1 deco at x 470 (waves, happy) and joins the parade after level 6; needs `art\friends\dad_sad/happy.png`, nothing is drawn until they exist. **5 Luna**: deco at x 600 in level 1 and joins the parade after level 1 (was level 6); `FH.luna` is 110, so check her size once Ghost confirms the white pictures. **4 flying unicorn**: drawn above and slightly behind Noga from `art\friends\unicorn_fly_a/b/happy.png` (wings flap every 8 frames; happy while dancing or at the finale); the bird stays in the parade, lagging behind. The loader also reads `art\hero\donkey_*.png`.
**4 donkey hero (Ghost's real set wired, 15 Nov 10:55):** `drawHero` swings `donkey_leg_back` / `donkey_leg_front` at the hips (268,681) and (626,678) on the shared 914x1000 canvas, body over them, drawn 195 px tall; dancing draws `donkey_happy.png` (1011x1000, has its own legs, so no leg layers under it); Super Jump wings = `donkey_wings.png` (else `hero_wings.png`) behind the shoulder, pivot about (330,500) in the canvas (not yet seen in a real jump: tune). Fallbacks stay: `donkey_full` / `art\standin\donkey_standin.png` (script-made stand-in) / the old unicorn set.
**Others wired:** trampoline `prop_trampoline(_squash).png` drawn at `pd.w * 1.3`, bottom G+6, pad `top` G-58 (code-drawn trampoline remains as fallback); flier `unicorn_fly_a/b/happy.png` (150 px wide, flaps every 8 frames; fallback `cloudunicorn_happy`); dad `dad_sad/happy.png` (FH 250; canvas figure fallback); Luna checked white, unchanged. Notes from Ghost: `art\ASSETS-V3-NOTES.md` (says 1011 canvas, true only of `donkey_happy`).
**Checked** in headless Chrome (start of level 1, running, the trampoline, a dance): no code errors, art shows. Not yet checked: a real Super Jump with wings, the other levels with the new hero, a phone. Republished at https://claude.ai/artifact/B227wcyViAHnUVTJT4s81D (version 8). Not committed by this session (the other session commits and pushes).

## OWNER'S NEW REQUESTS, 15 Nov 2026 (end of fourth session) - TO DO NEXT, in this order
Everything up to commit `46ee11d` is done and published at https://claude.ai/artifact/B227wcyViAHnUVTJT4s81D (private Artifact; how to republish is in the update below). The owner then asked, in these words (Hebrew and English mixed):
1. **Spelling:** "נוגה נכתב עם ו" - the name is written **נוגה** (with a vav), not נגה. Fix it everywhere the name is spoken-text or shown: `TITLES` and `applyLang` in `game.js`, `lines.js` (the Hebrew set), `index.html` title, any `README`/design text. The recorded voice clips (`voice\he\`) already say the name; only writing changes. Check whether the title picture `art\ui\title.jpg` has the name painted in (it showed "נגה והחד-קרן"): if so ask Ghostwire for a new title picture and say so.
2. **Change the dog that you jump on (Bobo, `pads` in level 1) into a trampoline.** Same bounce behaviour (walking in bounces her), new picture `prop_trampoline.png` / `prop_trampoline_squash.png` (asked from Ghost), drop the dog voice line use (`fr_04` "hav... achoo" sneeze clip) or replace it with a sound/boing; the level-1 cue and decos that mention Bobo change too.
3. **Add Noga's dad** as a friend/character (pictures `dad_sad.png`, `dad_happy.png` asked from Ghost). The owner did not say where; suggest: he waits at the start of level 1 or at the Shabbat table (stage 6), joins the parade. Needs a voice line (ask Whisper through the Council) if he speaks.
4. **Noga rides the DONKEY (Bil'am), not the unicorn. The unicorn replaces the bird that flies above Noga's head** (the bird `followers` entry flies at `y -= 150`). So: new hero sprite set `art\hero\donkey_*.png` (asked from Ghost: full/body/leg_back/leg_front/happy/wings with hip points), change `drawHero` (hip points, scale) and the hero loader; the old hero set stays as fallback. The flying helper is `unicorn_fly_a/b/happy.png` (asked). This changes the old decision "Noga rides the unicorn" and the game title "Noga and the Unicorn": ask the owner one short question about the title only if needed; otherwise keep the title.
5. **Add Luna the white cat.** `luna_sad.png` / `luna_happy.png` already exist (stage 6 friend). Ghost was asked to check they are WHITE and redo if not. The owner may mean Luna as a companion earlier or in the parade: simplest is Luna in the parade from level 1 and sitting by Noga's family; ask only if unclear.
6. **First request for assets sent to Ghost (done):** oasis task `t1115102439ncl68e` to Ghostwire, spec in `design\ASSETS-V3.md`, notes expected in `art\ASSETS-V3-NOTES.md`. Wait for the pictures (Ghost delivered the round-2 list within about 30 minutes) and wire them in. Donkey hero first.
7. Then: republish the Artifact (small batches, only changed files), `oasis done/next`, ask before committing.

Still open from before: the owner has not played or listened to anything; stages 1-3 have no "bring it to" step yet; commit `46ee11d` holds all earlier work; `art-orig\` and the old-game root files stay uncommitted on purpose.

## UPDATE 15 Nov 2026 (fourth session, Hexweaver): playable link + music + 8-stage plan v2
- **Playable link (private Artifact, owner's account only):** https://claude.ai/artifact/B227wcyViAHnUVTJT4s81D . The page is `index.html` with the html/head/body tags stripped, kept in the session scratchpad (re-make it the same way). Published in small batches: `game.js`, `lines.js`, art for levels 1-3 plus the other friends/items/props/ui, all `voice\he\*.mp3`, all `music\*.mp3`. To update: republish the page with `url` and a `files` map for only the changed files, `root` = project folder. Title screen, level 1 and goal panel were seen working in Chrome; audio could not be confirmed from the Artifact frame (cross-origin), nobody has heard it.
- **Music:** `music\title.mp3`, `stage1..8.mp3` made with the owner's Gemini (prompts in `music\PROMPTS.md`). `game.js` has `Song` (loops `music/stageN.mp3` quieter under the voice; synth tune is the fallback if a file is missing). Not listened to by a person. Stage 3 and 4 file names were matched by download order.
- **Owner asked (15 Nov):** all 8 stages with rising difficulty and goals, pick-up-then-use chains (Shabbat: ingredients to the oven, candles). Plan: `design\STAGES-V2.md`; pictures needed: `design\ASSETS-V2.md` (task to Ghostwire `t1115094701nclc9e`); music brief `design\MUSIC-BRIEF.md`. **Built later the same day:** pocket (up to 4 things, shown top left under the star counter) and stations in `game.js`: an item with `to: '<id>'` goes into the pocket and drops into the station with that `id` when she walks up (`stations` in the level data; kinds cloud, bridge, horses, bowl, oven (auto), bilam, candles (needs a dance), table, riddle, plate). Levels 4-8 use it: 4 steam to the pink cloud frees three unicorns (floaty jumps); 5 planks build the bridge over mud (mud slows her) then carrots to the horses; 6 flour+eggs+honey to the bowl, oven bakes the challah, carry it to the table, carrots to Bil'am, dance to light the candles; 7 ribbons light the path then a red/blue riddle (random each play); 8 flowers then eight gifts onto eight plates. Scripted run finished stages 4-8 (all stations done, friend dance, finale). Levels 1-3 are unchanged (no "use" step yet; water drops for stage 3 not added). Sound button moved to bottom centre. Level 4-8 voice only uses existing clips; no clips say "bring it to ...", the pictures show it. Not played by hand; not committed.
- Uncommitted: `music\`, `design\STAGES-V2.md`, `ASSETS-V2.md`, `MUSIC-BRIEF.md`, the `Song` edit in `game.js`.

## CURRENT STATE (14 Nov 2026, end of third session). Read this first; older sections below are history.

**Where:** folder `G:\My Drive\Projects\אייל
oga-unicorn`, branch `noga-unicorn-game`, last game commit `fcf737a` (earlier: `9abbcae` voices, `5dec7fa` first commit). Not pushed. Oasis rite `noga-unicorn`. Run: double-click `index.html`, or serve the folder (`.claude\launch.json` entry `noga-unicorn`, port 8765, may land on another port). Browser pane caches `game.js`: run `fetch('game.js',{cache:'reload'})` then reload. Test handle `__g` in the console.

**Done and working (tested by script only, never played by hand, on a phone, or heard):**
- Levels 1-3 are long (5600 / 6200 / 6600 px), with hills, gaps, cloud stairs and treetop branches; the camera follows her up (`camY`).
- Dance button from level 1. Mouse/touch steering. Bobo's pad bounces on walk-in.
- Each level shows and says its goal at the start. To finish a level she needs all things, `need` gold stars (5 / 7 / 10) and then the friend. Progress was reset (save key `nogaUnicorn2`).
- Hebrew voice: Whisper's 108 clips are in `voice\he\` and play; `pr_05` and `pr_12` are pending review (stand-ins `pr_01` / `pr_03` via `VOICE_ALIAS`). Hebrew is the default language; English has no recordings (browser speech).

**Open, in order:**
1. The owner plays levels 1-3 (phone and computer) and says what to change. Nothing has been judged by a person yet.
2. The owner listens to the Hebrew clips (Whisper's QA was automatic transcription only). Bad ones go back to Whisper by ID.
3. Optional: ask Whisper for clips that say "find N stars" (now a separate number word follows `ins_10`), and for `pr_05` / `pr_12` approval.
4. Old English sample task `t1114104526ncl2d2` is still open on the board and superseded (deleting it was blocked); the Hebrew sample task is `t1114141355ncl227`. Ghost's style-sheet task `t1114104520nclc6a` is still open too.
5. A full play-through of levels 2 and 3 to the end screen (the scripted run cannot finish them because the voice queue blocks the end screen), then touch screen, phone rotation, file:// play-through.
6. Ghost's art against the story plates (title picture's Noga has brown eyes; canon is blue); clean the flagged sprite cutouts; leg seams in motion.
7. Levels 4 to 8 after the owner approves 1-3.

**Not committed / left out on purpose:** `art-orig\` (Ghost's uncleaned originals, 24 MB, still on disk), and the old-game files in the project root (`uni_*.png`, `ASSETS-חד-קרן.md`, `חד-קרן-הקסם.html`). This HANDOFF change is also uncommitted. Ask the owner before committing.

**Owner style:** wants things done, not asked about; answers in short Hebrew or English; devices are phone and computer; the commit decision has always been "yes" when asked.

**Decisions (do not reopen):** Noga is the princess riding the unicorn; she can never lose (rescue bubble, no lives or timer); Dance from level 1 (changed by the owner 14 Nov); Super Jump from level 3 with pencil-drawn wings; free tools only; the voice must not be whispery; new game code, not the old game.

---

Written 14 Nov 2026 by Hexweaver (neon/claude). Read this first, then continue.

## What this is

A game for Noga (age 5, Hebrew speaker, cannot read yet). Princess Noga rides her white unicorn through the worlds of her bedtime stories, helps a friend in each level, and the friends follow her in a parade to the Princesses' Flower Party. An English voice tells her what to do and praises her by name. Eight levels planned; levels 1 to 3 are built.

- Oasis rite: `noga-unicorn`
- Project folder: `G:\My Drive\Projects\אייל` (git repo)
- Branch: `noga-unicorn-game`. **Nothing is committed.** `main` is untouched.

## Files

| File | What |
|---|---|
| `NOGA-UNICORN-GAME-PLAN.md` (project root) | The plan the owner approved |
| `noga-unicorn\design\LEVEL-DESIGNS.md` | All eight levels step by step, plus the rules for every level |
| `noga-unicorn\design\VOICE-SCRIPT.md` | 110 voice lines with ids and recording direction |
| `noga-unicorn\design\ASSET-LIST.md` | 101 pictures for Ghost, with names and sizes |
| `noga-unicorn\index.html` | Page, buttons, title/map/end screens |
| `noga-unicorn\game.js` | The game: engine, levels 1 to 3, stand-in drawings |
| `noga-unicorn\lines.js` | Text of every voice line by id (read aloud when no recording exists) |
| `noga-unicorn\art\standin\` | The old game's painted unicorn (body + two leg pairs) |

The old game `חד-קרן-הקסם.html` is untouched and is not used by the new one, apart from its three unicorn pictures.

## State of the game

Works: levels 1 (Noga's Garden), 2 (Rainbow Road), 3 (The Magic Forest); walk, jump, Dance, Super Jump with pencil wings, star meter, the parade, counting and colour words, rescue bubble after a fall, help for a stuck child (instruction repeats at 8 s, sparkle trail at 20 s, item floats to her at 40 s), sticker screen, level map, saved progress.

Tested: a scripted run finished all three levels with no code errors, and screenshots of each level looked right at 1024x768.

Also checked 14 Nov (continuation session): `index.html` opens from a file:// path and shows the title screen (no fetch or module use, so double-click should work; play-through from file:// not tried). At a phone landscape size (667x375) the buttons are 64 px, fit without overlap even with all five showing (Dance next to Jump, Super Jump above Jump), and the page does not scroll sideways. Portrait shows the rotate-your-phone screen as designed. Note: after resizing the Browser pane, one screenshot showed a stale, mis-scaled canvas; a reload fixed it, and the code reads `innerWidth`/`innerHeight` correctly on `resize`, so I treat it as a pane artifact, not a bug (a real phone rotation is still worth a look).

**Not tested:** nobody has listened to the voice; no real touch screen (only the emulated phone size); a full play-through from file://.

## Update 14 Nov (second session): Ghost's art, true platforming, mouse

Owner asked: it must move with the mouse, be a true platform game, and use Ghost's assets.

- **Ghost's art arrived** (111 files in `art\`, manifest in `artrt-manifest.json`) and is wired in: hero (happy pose while dancing, pencil wings from `hero_wings.png`), friends, items, props (stone, rock, mushroom, stump, branch, cloud, big bubble), the three backgrounds, the five buttons, stickers, title and map pictures.
- **Cleanup of Ghost's files:** several pictures had a baked glow and stray fragments (bubbles, star, petal, feather, mud, table, hay bale, some friends). I cleaned them in place (script not kept; originals are in `noga-unicornrt-orig\`, same sub-folder names). If Ghost re-delivers, the clean-up has to be repeated. A thin pale edge remains on star, petal, feather and bubbles. Ghost's manifest still lists "in-game visual review, hero leg fitting, likeness against story plates" as pending: the hero legs swing correctly in the game; likeness not judged by me. The title picture shows Noga with brown eyes (canon is blue).
- **True platformer:** the ground is now `terrain` segments in each level (raised ledges with solid sides, streams and holes as gaps; water drawn in the gaps). Standing things (stone, rock, mushroom, stump) get their height from their picture; clouds, branches and big bubbles float. Garden now has a stream with a stepping stone and a raised ledge for the bird; Rainbow Road has cloud stairs; the Forest has a brook and a raised root ledge. Falling is still never a loss (rescue bubble).
- **Mouse and touch on the playfield:** hold the button on the screen and she walks toward the pointer; point above her and she jumps up there; she hops gaps and steps by herself; click her to dance. Arrow keys, Space, D, S and the on-screen buttons still work.
- **Screens:** title uses `ui	itle.jpg`, map uses `ui\map.jpg` with all eight stops (4 to 8 locked until built), stickers are Ghost's.
- **Test:** a scripted run driven only by the mouse pointer finished levels 1, 2 and 3 with no code errors (dance by click/key, Super Jump by button). Screenshots checked at 1024x768; phone-landscape button layout checked by numbers (the Browser pane screenshot at that size is unreliable). Voice not heard (pane has no speech voices).
- **Still stand-ins:** the mama-bird branch, Bobo's pad area, flowers and sparkles are still drawn in code; Shabbat/farm/night/castle/sky backgrounds and props (mud, table, gate, hay) are delivered but unused until levels 4 to 8 are built.

## How to run and test

Serve the folder and open it:

```bash
python -m http.server 8765 --directory "G:\My Drive\Projects\אייל\noga-unicorn"
```

Then open `http://localhost:8765`. There is a `noga-unicorn` entry in the project's `.claude\launch.json` for the Browser pane.

Keyboard: arrows, Space = jump, D = dance, S = Super Jump.

In the browser console, `__g` is a test handle: `__g.s` (state), `__g.start(n)` (level 0 to 2), `__g.step(n)` (advance n frames), `__g.tp(x)`, `__g.jump()`, `__g.dance()`, `__g.sup()`, `__g.reset()` (clear saved progress). Full-size screenshots work in the Browser pane; scaled ones came back empty.

## How game.js is organised

Top to bottom: screen sizing (virtual height 720, ground line `G` = 560), save, picture loading, sound and tune, `Voice` (queue; recorded clip or browser speech), controls, `LEVELS` (data for each level: items, platforms, gaps, stars, cues, friend), state and `startLevel`, `update`, drawing (friends, hero, items, platforms, worlds), the frame loop, screens.

To add a level: add an entry to `LEVELS`, add stand-in drawings for its friend and item, a world in `drawWorld`, and grow `save.done` (now fixed at three entries in the save code and `paradeFor`).

## Hebrew voice (added 14 Nov, owner request: "phone and computer, but I need the Hebrew sounds")

- Owner devices: **phone and computer** (answers the device question). Buttons were already checked at phone landscape size.
- The game now speaks **Hebrew by default**. All 110 lines are in `lines.js` as `window.LINES_HE` (feminine commands, spoken to a girl). The English set stays as `window.LINES`.
- Recordings go in `voice\he\<id>.mp3` (same ids as the English ones, e.g. `ins_01.mp3`); until they exist the browser reads the Hebrew text. The English recordings dir is still `voiceull\`.
- Switch language: hold the sound button 1.5 s (parent corner), or open `index.html?lang=en` / `?lang=he`. The choice is saved.
- Tested: no code errors; every line is requested with `he-IL`; the hold-to-switch works and the title changes. **Not tested by ear**: the Browser pane has no speech voices at all. On Windows the browser Hebrew voice may be missing or male; Android has Google Hebrew, iPhone has Carmit. That is why recorded clips are the real fix.
- Open question: Whisper's English sample task (`t1114104526ncl2d2`) is now the wrong language. Needs a Hebrew version, or the clips made another way.

## Open at the end of the second session (14 Nov)

- **Owner's last words:** "you can send it on the drive" (meaning not fully clear: probably "send the Hebrew voice task to Whisper through the Drive", or "put the game on the Drive"). The project folder is already inside Google Drive for desktop (`G:\My Drive\Projects\אייל
oga-unicorn`), so the game already syncs there. Ask the owner one short question if it matters, or send the Whisper task via the Drive route the Council uses.
- **Whisper Hebrew sample task:** sent through PowerShell in a background run (task id of the run `bshc8n95z`; output was still empty). **Not confirmed that it arrived.** Check `oasis status` / the rite's tasks. Bash cannot find the Oasis command in this setup (`$USERPROFILE/.oasis/oasis.cmd` fails); **use PowerShell**: `& "$env:USERPROFILE\.oasis\oasis.cmd" <args>`. Do not send twice (duplicate task ids have happened). The task text: 5 Hebrew clips (ids ins_02, pr_01, l1_a, fr_02, ex_03) into `voice\he\sample\`, warm full voice, not whispery, no other clips until the owner approves by ear.
- **Owner's devices:** phone and computer. Owner needs Hebrew sounds (done in text; recordings pending).
- **Board:** `oasis done` and `oasis next` for this session were included in the same background PowerShell run; verify they landed.
- **Never committed:** branch `noga-unicorn-game` holds everything uncommitted (game, art, art-orig, design docs). Ask the owner before committing. `art-orig\` could be left out of a commit if the repo should stay small.
- **To check next:** the Hebrew voice by ear on a phone and the computer; a real touch screen; a full play-through from a double-clicked file; Ghost's art against the story plates (the title picture's Noga has brown eyes, canon is blue).

## Waiting on others

| Who | Task id | What | Status when I stopped |
|---|---|---|---|
| Ghost (Ghostwire) | `t1114104520nclc6a` | Style sheet: Noga on the unicorn, garden background, Pitzi, baby bird, into `noga-unicorn\art\style-sheet` | Not delivered |
| Whisper (Instinct) | `t1114104526ncl2d2` | Five-line English voice sample into `noga-unicorn\voice\sample` | Not delivered |

Both carry a CHECK for Hexweaver: open the files, confirm transparency, facing right, Noga's canon look and no wings on the unicorn; confirm five playable clips with the exact lines. The owner judges the voice by ear. Neither may start the full set (101 pictures, 110 clips) before the owner approves the sample.

## Waiting on the owner

1. Try levels 1 to 3 and say what to change.
2. Which device Noga plays on (phone, tablet or computer). Asked three times, not answered. It sets button size and layout.
3. Approve Ghost's look and Whisper's voice when they arrive.
4. Whether to commit the branch.

## Next steps, in order

1. Apply the owner's changes from trying levels 1 to 3.
2. Check Ghost's and Whisper's samples when they arrive; close their tasks with `oasis task-done`.
3. After approval, send the full asset list and voice script as new tasks.
4. Fit the real hero art, drop in pictures and voice, listen to every line once.
5. Test on Noga's real device, with sound.
6. Noga plays; watch the six points at the end of LEVEL-DESIGNS.md.
7. Build levels 4 to 8.

## Decisions already made (do not reopen without the owner)

- Noga is the princess and rides the unicorn.
- English voice with pictures; an optional Hebrew helper is planned, off by default, not built.
- She can never lose: no lives, timer or enemies.
- New game code, not an extension of the old game. The owner said it can be better than the earlier game.
- Dance button is there from level 1 (owner changed this 14 Nov: "we need a dance button"); Super Jump starts in level 3.
- The unicorn has no wings; Super Jump wings are drawn by Noga's pencil and fade on landing.
- Free tools only for pictures and voice. The voice must not be whispery.
- Three polished levels first, then the other five.

## Things to know

- The old games rite `eyal-games` is in the Graveyard. I could not read its lesson (`oasis lesson eyal-games` returned an error), so the plan does not account for it.
- Oasis commands took one to two minutes each in this session; run them in the background.
- Story canon lives in `G:\My Drive\Projects\noga stories` (`WORLD_BIBLE.md`, `canon\episodes`, and the dated story folders). The game uses only the main Noga world.
- Two older open tasks sit in my queue and were not touched here: `t1113093945insserializedwrite` (oasis) and `t1113193445insdashdeploy` (kaye-incidents).

## Art integration (14 Nov, Codex)

- Levels 1–3 draw the painted rider and unicorn, with both leg layers rotating around the manifest hip points. The full painting is the fallback if a layer is missing; the original drawing remains available if none of the new hero assets load.
- All 108 manifest files exist. The 25 cutouts flagged in the manifest contain an alpha channel, but still need an edge and background review over solid colors. Flagged item and friend drafts no longer auto-load in the three playable levels.
- Headless Chrome confirmed that each of the three levels draws the new hero layers and its background at 1024×768 and 667×375, with no horizontal overflow. This checks rendering, not the visual quality of the leg seams. Next: inspect the seams through walking, jumping and dancing, and clean the flagged cutouts before enabling them.

## Update 14 Nov (third session): longer levels, hills, Dance everywhere

Owner said: add a Dance button, make the levels longer with more things in them, it was all a straight line.

- **Dance button** now shows from the first level (was hidden until level 2). Level 1 has a cue that tells her to press it (`ins_06`).
- **Longer, not flat:** level 1 is 5600 px (was 3100), level 2 is 6200 (was 3700), level 3 is 6600 (was 3900). Each now has hills and plateaus made of stepped ledges (60 to 140 px high), two or three streams or gaps, more stones, rocks, stumps, mushrooms, cloud stairs on Rainbow Road, and the Forest keeps its two high branches. Item counts are unchanged (3 feathers, 4 bubbles, 5 petals).
- **Bonus stars:** rows of small gold stars along hills, over gaps and on high clouds (53, 60, 60 per level), with a gold star counter under the item bar. They give a sound and sparkle only; praise every 10. Defined per level as `bonus` (helper `arcRow(x0, x1, y, bump, n)` above `LEVELS`).
- **Bobo's bounce pad** now bounces her when she just walks into it (before she had to jump onto it first).
- Mouse steering looks 100 px ahead for a step to hop (was 70).
- **Tested** (scripted in the Browser pane, numeric only; the pane is hidden so screenshots can be stale): a bot walks every level end to end with no code errors; the level 1 pad feather, hill feather, and the level 3 branch petals via Super Jump are all reachable; one screenshot of the level 1 hill looked right. **Not tested:** full finish of levels 2 and 3 by a bot (the voice queue blocks the end screen under scripted frames), by hand, on a phone, or by ear.
- `__g` now also has `P()`, `LV()`, `gnd(x)`, `bonus()`, `plats()` for tests. The Browser pane caches `game.js`: after an edit run `fetch('game.js',{cache:'reload'})` then reload.
- **Oasis check (14 Nov):** Whisper's Hebrew sample task `t1114141355ncl227` is on the board, sent once. The old English sample task `t1114104526ncl2d2` is still open and now superseded. No Hebrew clips exist yet (`voice\he\sample` does not exist), so the CHECK (5 playable mp3s, exact `LINES_HE` text, not whispery, owner judges by ear) has not run.
- Backup of the previous `game.js` was in a scratch folder only; the branch still has nothing committed.

## Update 14 Nov (evening): Whisper's Hebrew voices are in the game

- Whisper delivered `noga_he_voice_package.zip` (project root): 108 mp3 + 2 pending-review (`pr_05` hooray, `pr_12` you found it, pronunciation unconfirmed) + manifest and QA (automatic transcription only, nobody has listened to them all). The 5 files in `voice\he\sample\` are copies of the same clips.
- Owner told me to integrate, so the 108 mp3 are now in `voice\he\` (the game's recording folder). All 108 load and play; the clip for `l1_a` was seen playing inside the game. Voice no longer cuts a clip off by a text-length timer; it waits for the clip's real length.
- Until `pr_05`/`pr_12` are approved, the game plays `pr_01`/`pr_03` in their place (`VOICE_ALIAS` in game.js). Whisper asked that they not be promoted silently: this is a stand-in, not a promotion.
- **Not done:** nobody has listened to all 108 in the game; English recordings still do not exist (English falls back to browser speech).

## Update 14 Nov (night): goal each level, taller world, stars needed rise, progress reset

Owner (in Hebrew): reset all progress in the new commit; every level must say its goal; make the screen reach up so she can jump on clouds and trees; difficulty and the number of stars needed rise from level to level.

- **Progress reset:** save key is now `nogaUnicorn2` (old `nogaUnicorn1` is deleted on load), so every device starts from level 1 with nothing done. The language choice is kept.
- **Goal at every level start:** a big picture on the screen for about 7 seconds (the thing to collect x N, a gold star x N) and the voice says it: the story line, the goal (`ins_11/12/14`), `ins_10` "find the stars" and the number (`num_05`, `num_07`, `num_10`). The number is spoken as a separate word after "find the stars" because no clip says "find five stars". If wanted, ask Whisper for three new clips (e.g. "מצאי חמישה כוכבים").
- **Stars needed to pass:** level 1 needs 5 gold stars, level 2 needs 7, level 3 needs 10, in addition to the usual things and the friend. The counter under the item bar shows `n / need` and turns green when enough. If she has the things but too few stars, the voice says "find the stars" and the sparkle trail points to the nearest gold star. Every level has 50 or more gold stars, so the number is small on purpose; raise `need` in `LEVELS` to make it harder.
- **Taller world:** the camera now moves up and down (`camY`, up to 480 px up), the background shifts with it. New climbs: level 1 has a cloud stair from the plateau (3 clouds up to 470 px above the ground), level 2 extends its cloud stairs to 520 px, level 3 has two stacks of treetop branches (up to 540 px) above the two Super Jump branches. Gold stars sit on every new cloud and branch. Mouse steering uses the pointer's height in the tall world.
- **Difficulty:** it rises through the star requirement (5, 7, 10), the longer gaps and the Super Jump in level 3. I did not add new enemy-like hazards (she can never lose, a decision already made).
- **Tested (scripted, Browser pane):** need values 5/7/10; level 1 does not finish with 3 stars and does finish with 8; every cloud and branch step in the new stairs is reachable by a normal jump (Super Jump needed only for the first branch, as before); the camera rises on the highest cloud and the goal picture shows. **Not tested:** by hand, on a phone, the spoken goal by ear, levels 2 and 3 end to end.
