// Keeper 22 Nov, phase 2 slice d1: cooking chains are tapped, not walked. Stage 6 (challah) and stage 3 (tea) with the real hooks.
const g = __g, out = [], step = n => g.step(n), G = 560; let P = g.P();
const at = (x, y) => { P.x = x; P.y = y || G; P.vy = 0; };
// ---- stage 6 (index 5): challah ----
g.reset(); g.start(5); P = g.P(); let items = g.items(), pk = g.pocket(); const bowl = g.sts().find(s => s.id === 'bowl'), oven = g.sts().find(s => s.id === 'oven'), table = g.sts().find(s => s.id === 'table');
const ing = items.filter(o => o.to === 'bowl'); ing.forEach(o => { at(o.x, o.y + 62); step(3); });
out.push('bowl@' + bowl.x + ' oven@' + oven.x + ' ingredients in pocket ' + pk.length + '/' + ing.length);
at(bowl.x - 200); g.keys.right = true; step(110); g.keys.right = false;
out.push('walked straight through the bowl: pocket ' + pk.length + ' have ' + bowl.have + ' (walking no longer fills it)');
at(bowl.x - 120); step(2); g.tap(bowl.x, G - 120); out.push('tap bowl: have ' + bowl.have + ' pocket ' + pk.length);
g.tap(bowl.x + 400, G - 120); out.push('tap far from the bowl (400 px right of it, in range 800 but not on it): have ' + bowl.have);
const hudX = (g.bonus().length ? 220 : 18) + 78, hudY = 98 + 27; out.push('tap bag picture: ' + g.tapPocket(hudX, hudY) + ' have ' + bowl.have);
g.tap(bowl.x, G - 120); out.push('tap bowl again: have ' + bowl.have + ' stirring ' + bowl.stirring + ' done ' + bowl.done); for (let i = 0; i < 3; i++) g.tap(bowl.x, G - 120); out.push('3 stir taps: done ' + bowl.done + ' oven ready ' + oven.ready);
at(oven.x - 400); g.keys.right = true; step(120); g.keys.right = false;
out.push('walked past the oven: armed ' + Math.round(oven.armed) + ' done ' + oven.done + ' (not baking by itself)');
at(oven.x - 150); step(2); g.tap(oven.x, G - 120); out.push('tap oven: armed ' + Math.round(oven.armed)); step(130);
const ch = items.find(o => o.kind === 'challah'); out.push('baked: oven done ' + oven.done + ' challah appeared ' + !ch.hidden + ' at x ' + Math.round(ch.x)); at(ch.x, ch.y + 62); step(3); out.push('challah picked up: ' + ch.got);
// ---- fallback: standing next to the bowl 6 s fills it by itself (nobody can get stuck) ----
g.reset(); g.start(5); P = g.P(); items = g.items(); pk = g.pocket(); const bw = g.sts().find(s => s.id === 'bowl'), ov = g.sts().find(s => s.id === 'oven');
items.filter(o => o.to === 'bowl').forEach(o => { at(o.x, o.y + 62); step(3); });
at(bw.x); step(300); const h300 = bw.have; step(120); const h420 = bw.have; step(1400);
out.push('standing at the bowl (put in + stir by itself): have after 5 s ' + h300 + ', 7 s ' + h420 + ', 20 s ' + bw.have + ' done ' + bw.done + ' oven ready ' + ov.ready);
step(400); out.push('standing near ready oven: baking started by itself (armed or done) ' + (ov.armed > 0 || ov.done));
// ---- stage 3 (index 2): tea pot and fire ----
g.reset(); g.start(2); P = g.P(); items = g.items(); pk = g.pocket(); const pot = g.sts().find(s => s.id === 'pot'), fire = g.sts().find(s => s.id === 'fire');
items.filter(o => o.to === 'pot').forEach(o => { at(o.x, o.y + 62); step(3); });
at(pot.x - 150); g.keys.right = true; step(60); g.keys.right = false;
out.push('tea: walked through the pot: have ' + pot.have + ' pocket ' + pk.length);
at(pot.x - 100); step(2); for (let i = 0; i < 4; i++) g.tap(pot.x, G - 120); out.push('tea: 4 taps: pot done ' + pot.done); step(3);
const tp = items.find(o => o.kind === 'teapot'); out.push('teapot appeared ' + !tp.hidden + ' at ' + Math.round(tp.x)); at(tp.x, tp.y + 62); step(3); out.push('teapot in pocket ' + pk.some(o => o.kind === 'teapot')); at(fire.x - 100); step(2); g.tap(fire.x, G - 120); step(3); out.push('fire done ' + fire.done); const cup = items.find(o => o.kind === 'teacup'); out.push('cup appeared ' + !cup.hidden);
return out;
