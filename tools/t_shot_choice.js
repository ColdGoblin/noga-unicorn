// Keeper 22 Nov: slice d2 pictures. MODE 'eggs' = stage 5 with the optional eggs and honey up high; MODE 'tea' = stage 3 tea table with the yellow tea (flower 2 first). Put `const MODE=...;` in front.
const g = __g, G = 560; g.reset(); const at = (x, y) => { P.x = x; P.y = y || G; P.vy = 0; }; let P;
if (MODE === 'eggs') { g.start(4); P = g.P(); at(6200); g.step(40); return ['eggs']; }
g.start(2); P = g.P(); const items = g.items(), pot = g.sts().find(s => s.id === 'pot'), fire = g.sts().find(s => s.id === 'fire'), serve = g.sts().find(s => s.id === 'serve');
items.filter(o => o.to === 'pot').forEach(o => { at(o.x, o.y + 62); g.step(3); }); at(pot.x - 100); g.step(2); g.tapPocket((g.bonus().length ? 220 : 18) + 78 + 56, 125);
for (let i = 0; i < 4 && !pot.done; i++) { g.tap(pot.x, 440); g.step(2); }
const tp = items.find(o => o.kind === 'teapot'); at(tp.x, tp.y + 62); g.step(3); at(fire.x - 100); g.step(2); g.tap(fire.x, 440); g.step(3);
const cup = items.find(o => o.kind === 'teacup'); at(cup.x, cup.y + 62); g.step(3); at(serve.x - 100); g.step(60); g.tap(serve.x, 440); g.step(50); return ['tea ' + serve.tea];
