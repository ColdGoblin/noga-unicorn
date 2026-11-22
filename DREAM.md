# The dream pass (how HANDOFF.md stays true)

Idea (Anthropic, "The components of agent memory", 6 Nov 2026): notes are predictions that a fact will be useful later; they go stale or are wrong from the start, so an offline pass re-checks them against what really happened, fixes them, and keeps the always-loaded top layer small.

Our layers: `git log` + Oasis board + the code = ground truth (transcripts). `HISTORY.md` = detailed notes (searched, not loaded). `HANDOFF.md` = the small top layer every session reads (target 60 lines at most). The Claude memory folder holds only lessons that are not obvious from the repo.

## When
At the end of any session that changed the game, the media or the deploy state, and before a handover. 10 minutes, no code changes. Also when a session finds HANDOFF.md wrong (fix it at once, do not just work around it).

## Steps
1. **Check every claim against the source, never against another note.** Live commit: `git ls-remote https://github.com/ColdGoblin/noga-unicorn.git main`. Repo: `git log --oneline -3`, `git status --short`. Stage count and `save.done`: `grep -n "save = " game.js`. Media: `ls music voice/he art`. Open tasks: `oasis status`. Bot: the date of the last green `tools/runall.sh`.
2. **Fix, do not append.** Wrong or finished items are rewritten or deleted in HANDOFF.md. Add something only if it is (a) something a person must still do, (b) a decision of the owner, or (c) a trap that already cost time. Do not record per-item details the code or git already show (what changed in a commit, file lists).
3. **Move down, not out.** A long explanation of why something was built goes to a dated section of `HISTORY.md` (newest first), with a one-line pointer in HANDOFF.md only if the next session needs it.
4. **Gaps.** A pointer to a thing that does not exist (a file, a task id, a section) is repaired or removed. Unverified items stay in the "Open, only a person can do" list and say who must check them.
5. **Lessons.** One lesson that is not visible in the repo goes to the Claude memory folder (one fact per file, update instead of duplicating) and one line to your Oasis journal: `<date> | noga-unicorn | learned: ...`.
6. **Board.** `oasis done` / `oasis next noga-unicorn`; if the open list changed, `oasis stage`. Never call `oasis brief <rite>` without text.

## Rules that keep it small
- The top layer says what is open and what not to do. History says why.
- "Tell the next session what the file is for, not every step": prefer a rule ("one writer per file") to a log of incidents.
- Never mark a Whisper/Ghost task or the critique thread complete from a note; only from the file or a person's answer.
