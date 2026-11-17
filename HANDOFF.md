# Handoff: Noga and the Unicorn

Top layer: short on purpose. Checked against the code and git on 17 Nov 2026 (Hexweaver). Everything older is in `HISTORY.md` (read a section only when you need to know WHY). How to keep this file honest: `DREAM.md`.

## What it is
Hebrew browser platformer for Noga (5, cannot read). She rides Bil'am the donkey, a unicorn flies above her, friends join a parade. 12 stages + a love-party finale. Oasis rite `noga-unicorn`. Folder `G:\My Drive\Projects\אייל\noga-unicorn`, branch `noga-unicorn-game`.
- **Live:** https://coldgoblin.github.io/noga-unicorn/ = ColdGoblin/noga-unicorn `main` `ff534eb` (verified with `git ls-remote`). Game code is at repo commit `75b3e19` (Round 9); the notes split is the commit after it (notes only, NOT deployed, so live still lacks these three .md files). Nothing in the game is uncommitted.
- **Stages:** 1 Garden, 2 Rainbow Road, 3 Forest, 4 Clouds/unicorns, 5 Farm, 6 Shabbat, 7 Night path, 8 Gifts, 9 Sheba's Oasis, 10 Moon Mountain, 11 Princesses' Flower Party (then the finale), 12 Bouncy Castle Land (`LEVELS[11]`, opens on the map after 11). `save.done` has 12 entries.
- **Media:** all of it exists: 12 stage mp3 + title + finale in `music/` (`MUSIC_ALIAS` is empty), Whisper's Hebrew clips in `voice/he/` (170 files), Ghost's art in `art/`. English has no recordings (browser voice). `VOICE_ALIAS` still maps `pr_05`->`pr_01`, `pr_12`->`pr_03` (Whisper's retakes read wrong words, not used).

## Open, and only a person can do it
1. Play stage 12 by hand: are the big pads too strong (`pw` in `LEVELS[11]`: big -27, candy -21.5, default -19)? Does the tap rule feel right?
2. Listen to `x_candy_got`, `l12_b`, `x_tap` (automatic transcription could not confirm them) and `music/stage12.mp3`. A bad clip: delete the mp3 and the browser reads the text from `lines.js`, or tell Whisper the id with `oasis say ... -To instinct`. A newer `l12_b` exists on Drive (id 18-z5YHUiaTYqDdNxp14m01caYwM6Za4W2, not fetched, nobody has listened to either).
3. Nobody has heard the 85+ older clips (21 of the 42 round-5 clips carry a FLAG: feminine endings, `מצאי`, `בואי`) or played stages 2-5 and 7-11 on a phone with real fingers. English not heard at all.
4. Whisper's critique thread `t1115133415insnogacontinue` stays open until a person tests normal controls, a true 390 px touch run and an actual listen. NEVER mark it complete. Report batches with `oasis say "..." -To instinct`.
5. Tuning guesses to check when he has played: `need` per stage, simon 12 frames, rhythm 16 frames, finale crowd (about 21 friends) on his phone.
No new owner message about Noga since the 16 Nov deploy (checked 17 Nov).

## Do not change (owner's decisions)
She can never lose (rescue bubble, no lives or timer). Free tools only for pictures and voice (Gemini music is fine). Hebrew voice is the default. Noga rides Bil'am. The voice must not be whispery. New game code, not the old game. **Commit and deploy need the owner's explicit yes in chat each time.** Owner style: wants things done, not asked about; answers in short Hebrew or English; plays on phone and computer.

## Pitfalls that already cost a session
- `oasis brief <rite>` with NO text wipes the brief (happened twice). Use PowerShell: `& "$env:USERPROFILE\.oasis\oasis.cmd" ...`; run slow oasis calls in the background (1-2 minutes each).
- `game.js` has CRLF line endings: edit scripts must match them.
- The tests share `_t.html`: never run two at once; delete `_t.html` if a run was interrupted.
- Test page reaches its script after 1.5 s; wait 3 s for pictures. `tp(x)` puts her at ground level (inside raised ground set `P().y = 1`). After a dance `p.dance` stays > 0 for 110 frames: `step(150)` before the next dance.
- The Browser pane caches `game.js`: `fetch('game.js',{cache:'reload'})` then reload.
- Do not paste the 25 KB `Oasis/projects/kaye-incidents/closure-source-20261113` over the live Kaye dashboard (live is 451 KB). The Kaye Apps Script (Version 10) is not part of this game; do not touch it from here.

## Test and run
- `tools/runall.sh [levels]` runs the bot on every stage (about 10 min, run it in the background). All 12 must end with MODE end and no ERRS before any commit that changes game code. Last green run: 16 Nov night (before `75b3e19`; only a CSS change in `index.html` came after).
- `tools/runtest.sh <js> [shot.png]` (env `WS=866,488` = an 844x390 phone viewport); others: `t_phone.js t_meets.js t_slope.js t_party.js t_draft.js t_missed.js t_smoke.js t_shabbat.js`. `__g` is the console test handle (`start`, `step`, `tp`, `P()`, `keys`, `finale`, `fx`, `sts`, `tap`).
- Serve: `python -m http.server 8765 --directory "G:\My Drive\Projects\אייל\noga-unicorn"`, or the `noga-unicorn` entry in `.claude/launch.json`.
- Backups of edits are in `_backup-20261115/` (committed); make `game.js.before-<thing>` before a risky edit.

## Deploy (only after the owner says yes)
Commit on `noga-unicorn-game`, then from the PARENT folder `G:\My Drive\Projects\אייל`:
`git branch -D noga-unicorn-only; git subtree split -P noga-unicorn -b noga-unicorn-only; git push https://github.com/ColdGoblin/noga-unicorn.git noga-unicorn-only:main`. Plain fast-forward; the site updates in 1-2 minutes. If git says `packed-refs.lock` exists and no git process runs, delete that empty file.
Not committed on purpose: `art-orig/` (incl. `round9-alt/`), `noga-he-voice-additions-20261115-private/`, two stray `_backup-20261115/*.before-music-gaps|recover`, the old-game files and stray files in the parent folder.

## Where things are
- `game.js` (engine, `LEVELS`, drawing), `lines.js` (text of every voice id, Hebrew `LINES_HE` and English), `index.html` (page, buttons, screens). Organisation and how to add a stage: `HISTORY.md` ("How game.js is organised"). Station kinds, mini-games, drafts: `HISTORY.md` ROUND 7/8/9 sections.
- `design/`: `ROUND9-PLAN.md` (stage 12 plan and review), `VOICE-V4..V8.md` (clip lists), `ASSETS-V*.md` (picture specs), `LEVEL-DESIGNS.md`, `MUSIC-BRIEF.md`. Story canon: `G:\My Drive\Projects\noga stories` (`WORLD_BIBLE.md`).
- Ghost's notes per round: `art/ASSETS-V*-NOTES.md`. Stop 12 on the map is at [30.5, 47] percent (`refreshMapArtwork`); `art/ui/map12.jpg` is the Instinct media worker's map, the rest of the art is Ghost's painted set.

## Working rules for several sessions
One writer per file at a time (parallel sessions overwrote each other's edits before); commit only your own files; never stash, reset or switch branches. After a meaningful piece: `oasis done noga-unicorn "..."` and `oasis next noga-unicorn "..."`. At the end of a long session do the dream pass in `DREAM.md` instead of appending a paragraph here.
