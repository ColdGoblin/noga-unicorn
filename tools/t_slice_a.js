// Keeper 22 Nov, phase 2 slice (a): count-free voice lines wired, every cue/ins/station-say id has a Hebrew+English line, stage 9 layout, stage 14 hidden animals.
const g = __g, out = [], HE = window.LINES_HE, EN = window.LINES;
const missing = [];
for (let i = 0; i < 15; i++) { g.reset(); g.start(i); const L = g.LV(), ids = new Set();
  if (L.ins) ids.add(L.ins); (L.finSay || []).forEach(x => ids.add(x)); (L.cues || []).forEach(c => (c.say || []).forEach(x => ids.add(x)));
  (g.sts() || []).forEach(s => ((s.say || []).concat(s.hint ? [s.hint] : [], s.ovenSay ? [s.ovenSay] : [])).forEach(x => ids.add(x)));
  ids.forEach(x => { if (!HE[x]) missing.push('he:' + i + ':' + x); if (!EN[x]) missing.push('en:' + i + ':' + x); }); }
out.push('missing lines: ' + (missing.length ? missing.join(',') : 'none'));
const wrong = ['ins_11', 'ins_12', 'ins_14', 'ins_16', 'ins_18', 'x_find_water', 'x_find_moon'], used = [];
for (let i = 0; i < 15; i++) { g.reset(); g.start(i); const L = g.LV(); const all = [L.ins].concat((L.cues || []).flatMap(c => c.say || [])); wrong.forEach(w => { if (all.includes(w)) used.push(i + 1 + ':' + w); }); }
out.push('count-wrong ids still used by a stage: ' + (used.length ? used.join(',') : 'none'));
g.reset(); g.start(8); const L9 = g.LV(), fl = g.items ? null : null;
const its = L9.items.filter(o => o.to === 'bowl').map(o => o.kind + '@' + o.x), gem = g.sts().find(s => s.id === 'gems');
out.push('stage 9 first recipe items ' + its.join(' ') + ' bowl@' + g.sts().find(s => s.id === 'bowl').x);
out.push('stage 9 gems pts ' + gem.pts.join(',') + ' ground ' + gem.pts.map(x => g.gnd(x)).join(',') + ' flour ground ' + g.gnd(13000));
const gap = gem.pts.map((x, i) => i ? x - gem.pts[i - 1] : 0); out.push('gem gaps ' + gap.join(','));
g.reset(); g.start(13); const J = g.sts().filter(s => s.kind === 'seek'); out.push('stage 14 secret stations ' + J.map(s => s.id + ':' + !!s.secret).join(','));
const P = g.P(); P.x = 1300; P.y = 560; P.vy = 0; g.step(40); out.push('stage 14 near bush x ' + Math.round(P.x));
return out;
