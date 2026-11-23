// Keeper 23 Nov, part 4a: ordered picture card on the challah bowl (stages 6, 9, 11) and tap-to-stir. Right order -> challah, other order -> loaf (still fine), goal reachable both ways.
const g = __g, out = [], step = n => g.step(n), G = 560; let P = g.P();
const at = (x, y) => { P.x = x; P.y = y || G; P.vy = 0; };
const run = (lvl, order, label) => {
  g.reset(); g.start(lvl); P = g.P(); const items = g.items(), pk = g.pocket(), S = id => g.sts().find(s => s.id === id), bowl = S('bowl'), oven = S('oven'), tb = S(items.find(o => o.hid === oven.spawn).to);
  const mine = order.map(k => items.find(o => o.to === 'bowl' && o.kind === k)); mine.forEach(o => { at(o.x, o.y + 62); step(3); });
  at(bowl.x - 100); step(2); const s0 = bowl.card ? bowl.card.seq.join('>') : 'none';
  for (let i = 0; i < 3; i++) { g.tap(bowl.x, 440); step(1); } const stir0 = bowl.stirring;
  out.push(label + ': card ' + s0 + ' bag order ' + order.join('>') + ' after 3 puts: seq ' + (bowl.seq || []).join('>') + ' stirring ' + stir0 + ' done ' + bowl.done);
  for (let i = 0; i < 3; i++) { g.tap(bowl.x, 440); step(1); } out.push('  after 3 stirs: done ' + bowl.done + ' oven ready ' + oven.ready + ' makes ' + oven.spawn + ' table wishes ' + tb.wish);
  at(oven.x - 100); step(2); g.tap(oven.x, 440); step(130);
  const prod = items.find(o => o.hid === oven.spawn); at(prod.x, prod.y + 62); step(3); at(tb.x - 100); step(60); g.tap(tb.x, 440); step(60);
  out.push('  baked ' + prod.kind + ' picked ' + prod.got + ' table done ' + tb.done + ' counter ' + g.s.got + '/' + g.s.total);
};
[[5, 'stage 6'], [8, 'stage 9']].forEach(([lvl, name]) => { run(lvl, ['flour', 'eggs', 'honey'], name + ' RIGHT order'); run(lvl, ['honey', 'flour', 'eggs'], name + ' OTHER order'); });
return out;
