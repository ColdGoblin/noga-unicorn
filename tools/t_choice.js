// Keeper 22 Nov, phase 2 slice d2: real results. Stage 5: loaf without eggs+honey, challah with both. Stage 3: the first flower decides the tea colour.
const g = __g, out = [], step = n => g.step(n), G = 560; let P = g.P();
const at = (x, y) => { P.x = x; P.y = y || G; P.vy = 0; };
const run5 = withExtras => {
  g.reset(); g.start(4); P = g.P(); const items = g.items(), pk = g.pocket(), S = id => g.sts().find(s => s.id === id);
  const bowl = S('fbowl'), oven = S('foven'), tb = S('ftable'), mill = S('mill');
  const req = items.filter(o => !o.opt && !o.hidden && o.x < 9000 && (o.kind === 'milk' || o.kind === 'wheat')), ex = items.filter(o => o.opt && !o.hidden);
  out.push((withExtras ? 'CHALLAH' : 'LOAF') + ' path: optional items ' + ex.map(o => o.kind + '@' + o.x).join(',') + ' goal counter before ' + g.s.got + '/' + g.s.total);
  req.forEach(o => { at(o.x, o.y + 62); step(3); }); if (withExtras) ex.forEach(o => { at(o.x, o.y + 62); step(3); });
  at(mill.x - 100); step(2); g.tap(mill.x, 440); g.tap(mill.x, 440); step(3);
  const fl = items.find(o => o.kind === 'flour' && o.to === 'fbowl'); at(fl.x, fl.y + 62); step(3);
  out.push('bag before bowl ' + pk.map(o => o.kind).join(','));
  at(bowl.x - 100); step(2); for (let i = 0; i < 5 && !bowl.done; i++) { g.tap(bowl.x, 440); step(2); }
  out.push('bowl done ' + bowl.done + ' extras ' + (bowl.extra || 0) + ' bag after ' + pk.map(o => o.kind).join(',') + ' oven ready ' + oven.ready + ' oven makes ' + oven.spawn + ' table wishes ' + tb.wish);
  at(oven.x - 100); step(2); g.tap(oven.x, 440); step(130);
  const prod = items.find(o => o.hid === oven.spawn); out.push('baked: ' + prod.kind + ' hidden ' + !!prod.hidden);
  at(prod.x, prod.y + 62); step(3); at(tb.x - 100); step(60); g.tap(tb.x, 440); step(60);
  out.push('delivered: table done ' + tb.done + ' shows ' + tb.last + ' goal counter ' + g.s.got + '/' + g.s.total);
};
run5(false); run5(true);
// tea colour from the first flower put in (the bag picture tapped first)
g.reset(); g.start(2); P = g.P(); const items = g.items(), pk = g.pocket(), pot = g.sts().find(s => s.id === 'pot'), fire = g.sts().find(s => s.id === 'fire'), serve = g.sts().find(s => s.id === 'serve');
items.filter(o => o.to === 'pot').forEach(o => { at(o.x, o.y + 62); step(3); });
at(pot.x - 100); step(2);
const hx = (g.bonus().length ? 220 : 18) + 78 + 56; out.push('bag order ' + pk.map(o => o.kind).join(',') + ' tapping bag picture 2: ' + g.tapPocket(hx, 98 + 27));
for (let i = 0; i < 4 && !pot.done; i++) { g.tap(pot.x, 440); step(2); }
const tp = items.find(o => o.kind === 'teapot'); out.push('pot tea ' + pot.tea + ' done ' + pot.done + ' teapot col ' + tp.col);
at(tp.x, tp.y + 62); step(3); at(fire.x - 100); step(2); g.tap(fire.x, 440); step(3);
const cup = items.find(o => o.kind === 'teacup'); out.push('fire tea ' + fire.tea + ' cup col ' + cup.col);
at(cup.x, cup.y + 62); step(3); at(serve.x - 100); step(60); g.tap(serve.x, 440); step(60); out.push('serve done ' + serve.done + ' tea ' + serve.tea);
return out;
