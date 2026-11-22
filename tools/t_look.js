// screenshot helper: stage 13 at x = X (defined in front by the caller), optional machine state
const g = __g; g.reset(); g.start(12); g.step(3);
const P = g.P(); g.tp(X); if (typeof Y !== 'undefined') { P.y = Y; }
for (let i = 0; i < 3; i++) g.step(100);
await new Promise(r => setTimeout(r, 1200)); g.step(1);
return g.s.x + ',' + g.s.y;
