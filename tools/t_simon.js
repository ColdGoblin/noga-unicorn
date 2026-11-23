// Keeper 23 Nov, part 4b-1: Simon lanterns by tap, play-any-order lanterns and the tune coming back.
const g = __g, out = [], step = n => g.step(n), G = 560;
const lx = (st, i) => st.x + (i - 1.5) * 150;
function setup(lvl, id) { g.reset(); g.start(lvl); const P = g.P(), st = g.sts().find(s => s.id === id); return { P, st }; }
function waitInput(P, st) { P.x = st.x; P.y = G; P.vy = 0; let n = 0; while (st.phase !== 'input' && n++ < 900) step(1); return st.phase; }
// 1. normal memory lanterns (stage 3): tap in the right order
{ const { P, st } = setup(2, 'memory'); out.push('A memory: free=' + !!st.free + ' phase ' + waitInput(P, st));
  g.tap(lx(st, st.seq[0]) + 20, G - 100); out.push('A tap right lantern 1 -> k ' + st.k);
  const wrong = [0, 1, 2, 3].find(i => i !== st.seq[1]); g.tap(lx(st, wrong), G - 100); out.push('A tap wrong -> phase ' + st.phase + ' k ' + st.k + ' (expect show, 0)');
  g.tap(lx(st, st.seq[0]), G - 100); out.push('A tap while the pattern shows is ignored: k ' + st.k + ' phase ' + st.phase);
  let n = 0; while (st.phase !== 'input' && n++ < 900) step(1);
  for (const i of st.seq) { g.tap(lx(st, i) - 30, G - 150); step(1); } out.push('A all three tapped -> done ' + st.done + ' phase ' + st.phase); }
// 2. stand AND tap on the same lantern: no double count; far tap ignored
{ const { P, st } = setup(2, 'memory'); waitInput(P, st); const f = st.seq[0];
  P.x = lx(st, f); P.y = G; P.vx = 0; step(2); g.tap(lx(st, f), G - 100); step(40); out.push('B stand + tap on lantern 1: k ' + st.k + ' (expect 1)');
  P.x = st.x - 1500; step(2); const k0 = st.k; g.tap(lx(st, st.seq[1]), G - 100); out.push('B tap from 1500 px away ignored: k ' + st.k + ' (was ' + k0 + ')');
  P.x = st.x; step(2); g.tap(lx(st, st.seq[1]), 100); out.push('B tap high in the sky ignored: k ' + st.k); }
// 3. old path unchanged: stand on the lanterns in order
{ const { P, st } = setup(2, 'memory'); waitInput(P, st); for (const i of st.seq) { P.x = lx(st, i); P.y = G; P.vx = 0; step(16); P.x = st.x; step(2); } out.push('C stand path -> done ' + st.done); }
// 4. free play stage 7 (lanterns2): any three, repeats allowed, then the tune comes back, then done
{ const { P, st } = setup(6, 'lanterns2'); out.push('D lanterns2 free=' + !!st.free + ' phase after walking up: ' + waitInput(P, st));
  g.tap(lx(st, 3), G - 100); g.tap(lx(st, 3), G - 100); out.push('D two taps on the same lantern count: tune ' + st.tune.join(''));
  g.tap(lx(st, 1), G - 100); out.push('D third tap -> phase ' + st.phase + ' tune ' + st.tune.join('') + ' myTune ' + JSON.stringify(g.tune()));
  const e0 = st.done; let n = 0; while (!st.done && n++ < 600) step(1); out.push('D echo finished, done ' + st.done + ' (was ' + e0 + ') frames ' + n); }
// 5. free play by standing (stage 6 lights2), including stepping off between notes
{ const { P, st } = setup(5, 'lights2'); waitInput(P, st);
  [0, 3, 1].forEach(i => { P.x = lx(st, i); P.y = G; P.vx = 0; step(16); P.x = st.x; step(2); }); out.push('E stand play tune ' + st.tune.join('') + ' phase ' + st.phase); let n = 0; while (!st.done && n++ < 600) step(1); out.push('E done ' + st.done); }
// 6. stage 10: free play lanterns, then the moon dance plays her tune (no errors while dancing)
{ const { P, st } = setup(9, 'stars2'); waitInput(P, st); [2, 0, 1].forEach(i => { g.tap(lx(st, i), G - 100); }); let n = 0; while (!st.done && n++ < 600) step(1);
  out.push('F stars2 done ' + st.done + ' myTune ' + JSON.stringify(g.tune())); const md = g.sts().find(s => s.id === 'moondance'); out.push('F moondance tuneBeat ' + md.tuneBeat);
  P.x = md.x; P.y = G; step(2); g.dance(); step(3); step(300); out.push('F moondance active ' + md.active + ' clock ' + Math.round(md.clock)); }
// 6b. the moon dance beat with her tune (forced active, no other station needed): no errors, clock runs
{ const md = g.sts().find(s => s.id === 'moondance'); md.active = true; md.clock = 1; g.P().x = md.x; step(200); out.push('F2 moondance beat with tune, clock ' + Math.round(md.clock)); }
// 7. a new stage forgets the tune
g.start(0); out.push('G tune after a new stage ' + JSON.stringify(g.tune()));
return out;
