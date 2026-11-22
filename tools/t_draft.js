const g = __g, out = []; const G = 560;
function run(idx, x0, label, walkRight){
  g.reset(); g.start(idx); const P = g.P(); g.tp(x0); g.step(2); const ys = [];
  for (let i = 0; i < 160; i++) { g.step(1); if (i % 20 === 0) ys.push(Math.round(P.y - G)); }
  out.push(label + ' height over time ' + ys.join(','));
  if (walkRight) { g.keys.right = true; for (let i = 0; i < 60; i++) g.step(1); g.keys.right = false; g.step(60); out.push(label + ' after walking out: x ' + Math.round(P.x) + ' y ' + Math.round(P.y - G) + ' on ' + P.on + ' got ' + g.s.got + '/' + g.s.total); }
}
run(3, 2140, 'stage4', true); run(8, 3190, 'stage9', true); run(9, 3590, 'stage10', true);
return out;
