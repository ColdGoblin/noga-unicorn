// Round 12 check: unicorn flight on every stage, plus the three friend powers (fetch, hop, bridge).
// tools/runtest.sh tools/t_fly.js [shot.png]   (SHOTLVL = stage for the screenshot, mid-flight)
const g = __g, G = 560, out = [], bad = [];
g.reset();
for (let i = 0; i < 15; i++) {
  g.start(i, ['luna', 'bouncy']); const P = g.P(), f = g.flyers()[0];
  if (!f) { bad.push('L' + (i + 1) + ' no flyer'); continue; }
  P.x = f.x - 200; P.y = g.gnd(P.x) ?? G; P.vy = 0; P.on = true; g.keys.right = true; g.step(60); g.keys.right = false;
  if (!(P.fly > 0)) { bad.push('L' + (i + 1) + ' walk-in did not start flight'); continue; }
  const y0 = P.y; g.held(true); g.step(50); g.held(false); const rose = y0 - P.y;
  const rs = g.rings(); let rg = 0; for (const r of rs) { P.x = r.x - 40; P.y = r.y + 62; P.vy = 0; g.step(2); if (r.got) rg++; }
  let n = 0; while (P.fly > 0 && n++ < 1200) g.step(5); let m = 0; while (!P.on && m++ < 400) g.step(5);
  const safe = P.on || (P.bubble <= 0 && P.y < G + 50);      // landed, or bouncing on a trampoline she came down on
  out.push('L' + (i + 1) + ' x' + Math.round(f.x) + ' rose' + Math.round(rose) + ' rings' + rg + '/' + rs.length + ' landed' + (P.on ? 1 : safe ? 'pad' : 0));
  if (rose < 80 || !safe || rg !== rs.length) bad.push('L' + (i + 1) + ' rose ' + Math.round(rose) + ' rings ' + rg + ' on ' + P.on);
}
// hop: a second jump in the air with a hop friend, none without
{ g.start(0, ['bouncy']); const P = g.P(); P.x = 600; g.step(5); g.jump(); g.step(12); const y1 = P.y; g.jump(); g.step(12); out.push('hop2 ' + P.hop2 + ' higher ' + Math.round(y1 - P.y));
  if (P.hop2 !== 1) bad.push('no double jump with bouncy');
  g.start(0, ['rhino']); const Q = g.P(); Q.x = 600; g.step(5); g.jump(); g.step(12); g.jump(); g.step(2); if (Q.hop2) bad.push('double jump without a hop friend'); }
// bridge: walk over every gap of every stage with rhino (bridge), never falls; without it the stage still has its gaps
let gaps = 0, crossed = 0;
for (let i = 0; i < 15; i++) { g.start(i, ['rhino']); const P = g.P(), L = g.LV();
  for (const gp of L.gaps) { if (g.sts().some(s => s.kind === 'bridge' && !s.done && s.x > gp.x - 400 && s.x < gp.x + gp.w + 400)) continue;
    const gy = g.gnd(gp.x - 40); if (gy === null) continue; gaps++;
    P.x = gp.x - 40; P.y = gy; P.vy = 0; P.on = true; P.bubble = 0; P.fly = 0; g.keys.right = true;
    let k = 0, fell = false; while (P.x < gp.x + gp.w + 40 && k++ < 600) { g.step(1); if (P.bubble > 0 || P.y > G + 100) { fell = true; break; } }
    g.keys.right = false; if (!fell && P.x >= gp.x + gp.w + 40) crossed++; else bad.push('L' + (i + 1) + ' gap ' + gp.x + ' w' + gp.w + (fell ? ' fell' : ' stuck at ' + Math.round(P.x))); } }
out.push('bridge gaps ' + crossed + '/' + gaps);
// fetch: an item 220 px away floats to her with luna, not with rhino
{ g.start(0, ['luna']); const P = g.P(), it = g.items().find(o => !o.got && !o.hidden); P.x = it.x - 220; P.y = g.gnd(P.x) ?? G; P.on = true; g.step(60); out.push('fetch got ' + it.got);
  if (!it.got) bad.push('fetch did not pull the item');
  g.start(0, ['rhino']); const Q = g.P(), it2 = g.items().find(o => !o.got && !o.hidden); Q.x = it2.x - 220; Q.y = g.gnd(Q.x) ?? G; Q.on = true; g.step(60); if (it2.got) bad.push('item came without a fetch friend'); }
// screenshot: mid-flight on stage SHOTLVL with the badges showing
{ const s = (typeof SHOTLVL === 'number') ? SHOTLVL : 0; g.start(s, ['luna', 'bouncy']); const P = g.P(), f = g.flyers()[0]; g.fly(0); P.x = f.x + 500; P.y = G - 330; g.step(20); }
return out.join(' | ') + ' || BAD ' + (bad.length ? bad.join('; ') : 'none');
