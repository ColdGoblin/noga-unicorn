# Handoff: Noga and the Unicorn

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
