// Generic bot: finishes level LVL (0-based, defined by a line `const LVL = n;` put in front of this file by tools/runall.sh).
// It teleports like t_shabbat.js does, plays every station kind the way a child would, and must end in mode 'end'.
const g = __g; g.reset(); g.start(LVL); const P = g.P(), L = g.LV(), out = [L.name]; const G = 560;
const step = n => g.step(n);
const at = (x, y) => { P.x = x; P.y = y; P.vy = 0; };
const lanternX = (st, i) => st.x + (i - 1.5) * 150;
function deliver() { let guard = 0; while (g.pocket().length && guard++ < 12) { const it = g.pocket()[0], st = g.sts().find(s => s.id === it.to); if (!st) break; const n0 = g.pocket().length; at(st.x, G); step(40); if (g.pocket().length === n0) { out.push('STUCK deliver ' + it.to); break; } } }
function collect() {
  for (let pass = 0; pass < 4; pass++) for (const it of g.items()) { if (it.got || it.hidden) continue;
    if (it.to && g.pocket().length >= 4) deliver();
    at(it.x, it.y + 62); step(2); }
  deliver();
}
function doStation(st) {
  const k = st.kind;
  if (st.done) return;
  if (k === 'count') { for (const q of st.pts) { at(q[0], q[1] + 62); step(2); } }
  else if (k === 'rain') { at((st.zone[0] + st.zone[1]) / 2, G); let n = 0; while (!st.done && n++ < 6000) { step(1); for (const d of st.drops) if (d.y > G - 100 && d.y < G - 30) P.x = d.x; } }
  else if (k === 'seek') { for (const x of st.pts) { at(x, G); step(2); } }
  else if (k === 'simon') {
    at(st.x, G); let n = 0; while (st.phase !== 'input' && n++ < 800) step(1);
    out.push('simon seq ' + st.seq.join('') + ' phase ' + st.phase);
    const wrong = [0, 1, 2, 3].find(i => i !== st.seq[0]); at(lanternX(st, wrong), G); step(16);                 // a wrong lantern shows the pattern again
    out.push('wrong -> phase ' + st.phase); n = 0; while (st.phase !== 'input' && n++ < 800) step(1);
    // walking across must not count
    at(lanternX(st, 0) - 100, G); g.keys.right = true; step(Math.ceil((lanternX(st, 3) - lanternX(st, 0) + 200) / 5.2)); g.keys.right = false; step(1);
    out.push('walked across k=' + st.k + ' phase ' + st.phase); if (st.phase !== 'input') { n = 0; while (st.phase !== 'input' && n++ < 800) step(1); }
    for (const i of st.seq) { at(lanternX(st, i), G); step(14); at(st.x, G); step(2); }
    step(2); out.push('simon done ' + st.done);
  }
  else if (k === 'rhythm') {
    at(st.x, G); g.dance(); step(1); out.push('rhythm active ' + st.active); step(150);
    let n = 0; while (!st.done && n++ < 40) { let m = 0; while ((Math.round(st.clock) % 64) !== 0 && m++ < 200) step(1); g.dance(); step(1); step(2); }
    out.push('rhythm hits ' + st.hits + ' done ' + st.done);
  }
  else if (k === 'riddle') { step(1); at(st.x - 300, G); step(5); const o = st.objs.find(o => o.col === st.want); at(o.x, G); step(5); }
  else if (st.dance) { at(st.x, G); g.dance(); step(3); step(150); }
  else if (st.auto) { step(250); }
  else { at(st.x, G); step(80); }
}
collect();
for (const b of g.bonus()) { at(b.x, b.y + 62); step(1); }
for (const st of g.sts()) { doStation(st); collect(); }
for (let pass = 0; pass < 2; pass++) { collect(); for (const st of g.sts()) doStation(st); }
out.push('items ' + g.s.got + '/' + g.s.total + ' sts ' + g.sts().map(s => s.id + ':' + (s.done ? 1 : 0)).join(' ') + ' stars ' + g.bonus().filter(b => b.got).length + '/' + L.need + ' goalMet ' + g.goalMet());
const fr = L.friend;
if (!g.s.fin) { const gy = g.gnd(fr.x - 100); at(fr.x - 100, gy === null ? G : gy); step(150); g.dance(); step(3); }
out.push('fin ' + g.s.fin); step(1400); out.push('MODE ' + g.s.mode);
return out;
