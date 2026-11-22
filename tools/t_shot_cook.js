// Keeper 22 Nov: stage 6 at the bowl with ingredients in the bag (tap ring on the bowl); MODE 'oven' then shows the ready oven ring. Set `const MODE=...;` in front.
const g = __g; g.reset(); g.start(5); const P = g.P(), G = 560; const bowl = g.sts().find(s => s.id === 'bowl'), oven = g.sts().find(s => s.id === 'oven');
g.items().filter(o => o.to === 'bowl').forEach(o => { P.x = o.x; P.y = o.y + 62; P.vy = 0; g.step(3); });
P.x = bowl.x - 120; P.y = G; P.vy = 0; g.step(2);
if (MODE === 'oven') { for (let i = 0; i < 3; i++) g.tap(bowl.x, G - 120); P.x = oven.x - 250; g.step(40); }
else g.step(20);
return ['bowl have ' + bowl.have, 'oven ready ' + !!oven.ready];
