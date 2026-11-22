# Whisper critique fixes: overlaps, conflicts, choices (Hexweaver, 15 Nov 2026)

## Done and checked (change 1)
- game.js Song.tick: music ducks to 0.03 under the voice (was 0.05); loop level 0.15 (was 0.17); every 46 s the loop sits at 0.04 for 12 s (quiet gap). Backup: _backup-20261115/game.js.before-music-gaps. Checked: node --check passes. NOT checked by ear, in a browser, or on a phone. Not an acceptance claim.

## Done and checked (change 2, missed-item safety net, option B)
- game.js `update()` items section: level flag `recover: true` (set on stage 4 only for now; other carry stages can get it by adding the flag). When she has walked more than 900 px past an uncollected item, the item reappears 420 px ahead of her on the ground (100 px up), with a burst, a rising tone, the level instruction voice again (`ins_16`) and the sparkle trail on. Backup: _backup-20261115/game.js.before-recover. Checked: `tools/t_missed.js` (walk past all three steam items; they return, are collected, cloud fills 3/3) and `tools/runall.sh 4` (stage 4 still ends in mode `end`), no errors. NOT checked by hand or on a phone.

## Overlaps (reuse, do not duplicate)
- STAGES-V2 (10-stage story chain) vs the critique's "distinct verb per stage": STAGES-V2 already gives chains (pick up, then use). The verbs requested (hide-and-seek forest, rainbow slide, feed animals, lantern path, castle combine) fit as the USE step of existing chains; no new levels needed.
- ASSETS-V4 section C already lists item_numbubble, item_chick, item_shootingstar, prop_windswirl for new activities (stages 2,3,4,5). Reuse these for slide / hide / feed; no extra art unless those are missing.
- MUSIC-BRIEF says dense 60-90 s loops; the critique wants quiet gaps. Playback-side gaps (change 1) solve this without new files. stage9/10 mp3 do not exist (MUSIC_ALIAS stand-ins); new clips are NOT authorized by this task.

## Conflicts needing the chief's choice
1. Verbs: A) add verbs as USE steps inside existing chains (recommended, small batches) or B) separate mini-games (needs ASSETS-V4 art, more risk).
2. Music gaps: A) playback gaps (done) or B) re-prompt Gemini for sparser tracks (new audio; needs user).
3. Missed items: A) walk-back sparkle trail plus voice repeat (trail already exists after 1200 hint ticks; make it earlier for high items) or B) high missed items re-spawn lower after a fall (recommended for L4 backtracking).
4. Stage 9/10: leave out of "true 390" until their art/voice exist.

## Next checked batches (one at a time, backup first)
2. Missed-item safety net, L4 (carry 2/3 deposit already works).
3. Brief encounter / end-stage "do something with friend" for L1-3.
4. Seam/terrain: vary ledge shapes in LEVELS, not skins.
5. Normal-controls run L1-8 incl. true 390 width, then an actual listen.
