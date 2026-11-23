// Keeper 23 Nov: stage 7 free-play lanterns, MODE 'one' = one note played (dots), 'echo' = tune coming back. Put `const MODE=...;` in front.
const g = __g, G = 560; g.reset(); g.start(6); const P = g.P(), st = g.sts().find(s => s.id === 'lanterns2'); const lx = i => st.x + (i - 1.5) * 150;
P.x = st.x; P.y = G; P.vy = 0; g.step(3); g.tap(lx(2), G - 100); if (MODE === 'one') { g.step(8); } else { g.tap(lx(0), G - 100); g.tap(lx(3), G - 100); g.step(100); }
return ['phase ' + st.phase + ' tune ' + (st.tune || []).join('')];
