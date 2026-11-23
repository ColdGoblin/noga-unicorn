// Keeper 23 Nov: stage 6 ordered picture card at the bowl (MODE 'card', one ingredient already in) and the stir swirl (MODE 'stir'). Put `const MODE=...;` in front.
const g = __g, G = 560; g.reset(); g.start(5); const P = g.P(), bowl = g.sts().find(s => s.id === 'bowl'); const at = (x, y) => { P.x = x; P.y = y || G; P.vy = 0; };
g.items().filter(o => o.to === 'bowl').forEach(o => { at(o.x, o.y + 62); g.step(3); }); at(bowl.x - 120); g.step(2);
if (MODE === 'card') g.tap(bowl.x, 440); else for (let i = 0; i < 3; i++) g.tap(bowl.x, 440);
g.step(MODE === 'stir' ? 12 : 500); return ['seq ' + (bowl.seq || []).join('>') + ' stirring ' + bowl.stirring];
