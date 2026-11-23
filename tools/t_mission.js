// owner correction 3 (23 Nov): ONE active mission at a time. Real steps and real star pickups; only the starting point is placed.
const g = __g, out = [], sleep = ms => new Promise(r => setTimeout(r, ms));
const calls = [], V = g.Voice, os = V.say.bind(V); V.say = (id, m) => { calls.push(id + (m ? '@' + m : '')); return os(id, m); };
const playedSeq = []; let seen = ''; const poll = () => { if (V.last && V.last !== seen) { seen = V.last; playedSeq.push(V.last); } };
const run = async (n, per) => { for (let i = 0; i < n; i++) { g.step(1); poll(); if (per && i % per === 0) { await sleep(20); poll(); } } };
const setup = (lvl, keep) => { g.reset(); g.start(lvl); const L = g.LV(), S = g.sts(); g.items().forEach(o => { o.got = true; }); g.bonus().forEach(b => { b.got = true; }); S.forEach(s => { if (!keep.includes(s.id)) s.done = true; }); V.hush(); calls.length = 0; playedSeq.length = 0; seen = ''; return { L, S }; };
// ---- A: stage 3 forest: the falling-stars zone (11500) is next to the tree bubbles (12230)
let { S } = setup(2, ['leafrain', 'treecount']); const rain = S.find(s => s.id === 'leafrain'), cnt = S.find(s => s.id === 'treecount');
g.tp(rain.zone[1] - 10); await run(60, 10);
out.push(['A in rain zone: act', g.act(), 'bubbles are', Math.round(Math.abs(g.P().x - cnt.pts[0][0])), 'px away', 'count said?', calls.filter(c => /x_count/.test(c)).length]);
V.say('x_count', 'st:treecount'); V.say('x_count', 'st:treecount'); await sleep(300); await run(10, 5);
out.push(['A a queued bubble line while the rain mission is active: played', playedSeq.includes('x_count')]);
let guard = 0; while (!rain.done && guard++ < 4000) { const d = rain.drops[0]; if (d) g.tp(Math.max(rain.zone[0], Math.min(rain.zone[1], d.x))); await run(1, 4); }
out.push(['A rain done', rain.done, 'act', g.act()]);
await run(120, 10); await sleep(200);
out.push(['A after rain: act', g.act(), 'count said once after the rain was done', calls.filter(c => c === 'x_count@st:treecount').length, 'x_rain said after done?', calls.slice(calls.indexOf('x_count@st:treecount')).includes('x_rain@st:leafrain')]);
// ---- B: stars just picked up: bubbles wait
({ S } = setup(0, ['meadow'])); const cm = S.find(s => s.id === 'meadow'); g.tp(cm.pts[0][0] - 350);
const bn = g.bonus(); const b0 = bn[0]; b0.got = false; b0.x = g.P().x + 5; b0.y = g.P().y - 62; await run(2, 1);
out.push(['B star picked', b0.got, 'starBusy', g.starBusy(), 'act', g.act()]);
await run(100, 20); out.push(['B 100 frames later: act', g.act(), 'intro', cm.intro || 0, 'starBusy', g.starBusy()]);
await run(200, 20); out.push(['B 300 frames later: act', g.act(), 'intro', cm.intro || 0]);
// ---- C: real walking: from before the rain zone, right through it and on to the bubbles. At no frame may the bubbles speak while the rain mission is the active one.
({ S } = setup(2, ['leafrain', 'treecount'])); { const r2 = S.find(s => s.id === 'leafrain'), c2 = S.find(s => s.id === 'treecount'), P = g.P(); g.tp(r2.zone[0] - 450); let clash = 0, frames = 0, firstCount = -1, actFrames = 0;
  while (P.x < c2.x + 100 && frames++ < 2500) { g.keys.right = true; g.step(1); poll(); if (g.act() === 'leafrain') { actFrames++; if (c2.intro) clash++; } if (c2.intro && firstCount < 0) firstCount = frames; }
  g.keys.right = false; out.push(['C real walk: frames with the rain mission active', actFrames, 'frames where the bubbles had already spoken at the same time', clash, 'bubbles first spoke at frame', firstCount, 'act now', g.act()]); }
// ---- D: re-entry after the half-way flag: nothing of the old mission is left (no act, no tagged line waiting)
g.reset(); g.start(0); { const L0 = g.LV(); g.tp(L0.rest.x + 5); g.step(4); V.say('x_count', 'st:meadow'); g.start(0, null, true); await run(5, 1); out.push(['D after re-entry: act', g.act(), 'queued tagged lines', Object.keys(g.vq().qm).length, 'x', Math.round(g.P().x), 'resume flag', g.s.save.half[0] ? 'saved' : 'none']); }
// ---- E: a tagged line of another mission is dropped when its turn comes (old speech after a mission change)
({ S } = setup(2, ['leafrain', 'treecount'])); g.tp(S.find(s => s.id === 'leafrain').zone[1] - 10); await run(40, 10); V.hush(); calls.length = 0; playedSeq.length = 0; seen = '';
V.say('x_hide', 'st:hide'); V.say('x_simon', 'st:memory'); V.say('x_rain', 'st:leafrain'); await sleep(400); await run(5, 2);
out.push(['E queued: hide + simon + rain while the rain mission is active; played', playedSeq.slice(), 'queue left', g.vq().q.slice()]);
return out;
