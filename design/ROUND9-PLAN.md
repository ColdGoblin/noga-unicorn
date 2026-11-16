# Round 9 plan (16 Nov 2026, Hexweaver): what is missing, Bouncy Castle Land, requests to Ghost and Whisper

Owner's words (Hebrew): Noga loves jumping and trampolines: make her a **Bouncy Castle Land** full of trampolines, things that bounce her, unicorns and candy. Review the game, see what is missing, ask Ghost for assets and Whisper for voice. Also (same session): most things are picked up just by walking; some must be TAPPED (hide and seek: press the one who hides); a short explanation, no lecture.

## 1. Review: what is missing (honest list)
**Voice (Whisper)**
- Almost every pick-up-and-use chain is silent. Nobody says what to do with the things she carries: bowl, oven, table, Bil'am, mill, bridge, horses, vegetable bed (the pictures show it, no clip says it). 8 short "do this" clips fix it (V9-B).
- No clip says "tap it" (the new rule: hide and seek and numbered bubbles are TAPPED). One short clip (`x_tap`).
- Stage 12 (Bouncy Castle Land) has no lines at all (V9-A, 10 clips).
- `pr_05` and `pr_12` retakes are still unresolved (stand-ins play). English has no recordings (browser voice reads English); low priority, owner plays in Hebrew.
- Nobody has listened to the 85 Hebrew clips in the game (21 are flagged for feminine endings).

**Pictures (Ghost)**
- Stage 12 has no art at all: backdrop, trampolines, candy, unicorns, castle (V9-C).
- Hide and seek only has three peeking friends (Pitzi, Shluli, Luna); every new hide-and-seek reuses them. Needs 3 more (`peek_koko`, `peek_anana`, `peek_bilam`).
- The vegetable bed grows plants drawn in code; needs 3 growth pictures.
- The pointing hand ("tap here") is a phone emoji; needs one drawn hand in the game's style.
- `sticker_12.png` and a 12-stop `map12.jpg` (the map has 11 stops).
- Unused art still lying around: `prop_nest`, `prop_confetti` (not drawn).

**Music**
- Stage 12 needs its own track (Ghost has the owner's Gemini). Nobody has listened to the 11 existing tracks.

**Game**
- Nobody has played the new stretches, the tap rule or the bigger jump by hand; difficulty (stars needed, simon 12 frames, rhythm 16 frames) is a guess.
- Phone (390 px) touch run still not done by a person.

## 2. Bouncy Castle Land (stage 12, name `bouncy`) - design
A bonus land that opens on the map after stage 11 (the love party finale stays the end of the story; this is the extra place Noga asked for). Candy sky, inflatable castles, trampolines everywhere. It is about the jump she loves, so it is NOT a "walk and collect" stage.
- **Trampolines (`pads`):** three kinds: small pink (bounces her about 2 steps up), BIG (a giant bounce up to the clouds), and a row of springy "candy trampolines" she can chain across (each throws her forward and up, so a row of them is a bounce-parade). Bounce power is per pad (`pw`).
- **Candy (collect):** 8 wrapped candies, most sitting high in the air so she has to bounce to them (reach them by chaining the big pad). They go into the pocket and into the candy jar at the castle (kind `plate`/jar at the end) - or simply count.
- **Bounce counter (new station `bounce`):** the BIG trampoline in the middle: jump on it 5 times in a row, the number is said each time (one, two ... five), confetti on the fifth. Light: every bounce counts, no failing.
- **Tap game:** numbered candy bubbles (existing `count`, TAPPED): 1-5 in the sky.
- **Bounce-parade of unicorns:** decorations: 3 colourful unicorns bouncing on their own trampolines (`unicorn_bounce_*`), they cheer when she passes.
- **Friend:** Bouncy, the unicorn of the land, at the end, dances with her (Dance at the friend finishes the stage like the others). Joins the parade after.
- Length about 6200. Backdrop `bg_bouncy.jpg`. Music `music/stage12.mp3`.
- Built in code with canvas fallbacks for every picture (nothing is invisible without the file), like all earlier stages.

## 3. Requests (sent as Oasis tasks)
### V9-A: Whisper, Bouncy Castle Land lines (Hebrew, warm full voice, feminine commands to a girl; ids -> `voice/he/<id>.mp3`; text is in `lines.js`)
| id | Hebrew | when |
|---|---|---|
| l12_a | ברוכה הבאה לארץ הבאונסי קאסל! כאן הכול קופץ! | stage start |
| x_pad | המקפצות יעיפו אותך למעלה! | near the first trampoline |
| x_bounce | קפצי על המקפצה הגדולה! חמש פעמים! | near the big one |
| x_candy | אספי את הסוכריות! קפצי גבוה! | candies |
| x_candy_got | מתוק! | each candy (short) |
| l12_b | היי נוגה! בואי לקפוץ איתנו! | friend arrives |
| fr_17 | וויי! עוד פעם! | Bouncy the unicorn, happy |
| l12_c | איזה כיף! קפצנו עד השמיים! | finish |
| l12_d | הסוכריות כל כך מתוקות! את נסיכת הקפיצות! | finish |
| x_tap | געי בו! | tap rule (short) |

### V9-B: Whisper, "what to do" for the things she carries (one short line each)
| id | Hebrew | where |
|---|---|---|
| x_bowl | שימי הכול בקערה! | bowl |
| x_oven | התנור אופה את החלה! | oven starts |
| x_table | שימי על השולחן! | table |
| x_feed | תני לו גזר! | Bil'am |
| x_mill | הביאי חיטה לטחנה! | mill (farm) |
| x_bridge | בני את הגשר מהקרשים! | bridge |
| x_horses | האכילי את הסוסים! | horses |
| x_bed | השקי את הערוגה! | vegetable bed |

(Whisper decides the spelling of imperatives she can say naturally, e.g. הביאי / תביאי; keep them short, under 3 seconds.)

### V9-C: Ghost, pictures (PNG with transparency unless said; same style, size and edge cleanliness as round 6/7; notes in `art/ASSETS-V9-NOTES.md`)
Bouncy Castle Land:
1. `art/bg/bg_bouncy.jpg` backdrop (same size as the other backdrops): candy sky, pink and blue inflatable castles far away, rainbow, cotton-candy clouds, lollipop trees.
2. `art/props/prop_pad_big.png` + `prop_pad_big_squash.png`: giant round trampoline (about 2x the existing one), squashed version.
3. `art/props/prop_pad_candy.png` + `prop_pad_candy_squash.png`: small pink-and-white candy-stripe trampoline.
4. `art/props/prop_bouncy_castle.png`: a big inflatable bouncy castle with towers and flags (background prop, about 900 px wide).
5. `art/props/prop_lollipop_a.png`, `prop_lollipop_b.png`, `prop_candycane.png`, `prop_gumdrop.png`: tall decor props standing on the ground.
6. `art/items/item_candy_1.png`, `item_candy_2.png`, `item_candy_3.png`: wrapped candies in three colours (pink, blue, yellow), like the other items (about 300 px).
7. `art/friends/bouncy_sad.png` + `bouncy_happy.png`: Bouncy, the unicorn of the land (white unicorn with a rainbow mane and candy-stripe horn, bouncy and round), same frame/pose rules as the other friends.
8. `art/friends/bunicorn_pink.png`, `bunicorn_blue.png`, `bunicorn_mint.png`: three small cheerful unicorns in mid-bounce (decor).
9. `art/ui/sticker_12.png`, `art/ui/map12.jpg` (the map with TWELVE stops; tell me the 12 stop centres in percent, like `ASSETS-V4-NOTES.md`; stop 12 is the Bouncy Castle).
10. Music: `music/stage12.mp3` with the owner's Gemini (prompt: happy, bouncy, playful candy-land tune with boing sounds, gentle, not loud, loops; a child of 5).
General gaps:
11. `art/friends/peek_koko.png`, `peek_anana.png`, `peek_bilam.png` (peeking out of a bush, like `peek_pitzi.png`).
12. `art/props/prop_sprout_1.png`, `prop_sprout_2.png`, `prop_sprout_3.png` (small plant growing stages for the vegetable bed; the last one carries a carrot).
13. `art/ui/icon_tap.png`: a pointing hand (index finger pointing up/diagonal), cartoon, cute, white glove with a soft pink outline, 200 px.

## 4. What I build now (no waiting)
Stage 12 in code with canvas fallbacks for every new picture; pad power; the `bounce` station; map/save plumbing for a 12th stop; hint voice uses the text in `lines.js` (browser voice) until Whisper delivers; bot green on all 12 stages; then wire Ghost's files as they land (the loader reads the names above; nothing else to change).
