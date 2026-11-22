// Keeper 22 Nov: stage 5 with a stacked pocket (3 planks, 2 carrots, milk): one slot per kind with a count dot. LVL/XPOS not needed.
const g = __g; g.reset(); g.start(4); const P = g.P(), pk = g.pocket(), items = g.items();
const planks = items.filter(o => !o.kind && o.to === 'bridge'), car = items.filter(o => o.kind === 'carrot_bunch'), milk = items.find(o => o.kind === 'milk');
[planks[0], planks[1], planks[2], car[0], car[1], milk].forEach(o => { o.got = true; pk.push(o); });
P.x = 3300; P.y = 560; P.vy = 0; g.step(30); return ['pocket ' + pk.length];
