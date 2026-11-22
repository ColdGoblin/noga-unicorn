// Keeper 22 Nov: she walks past the unicorn without riding it. A second one must wait ahead with its own sky stars and rings.
const g = __g, out = []; g.reset(); g.start(4); const P = g.P(), G = 560;     // stage 5 farm (15650 px)
const fl0 = g.flyers()[0]; out.push('flyers ' + g.flyers().length + ' first at ' + Math.round(fl0.x) + ' rings ' + g.rings().length);
P.x = fl0.x + 1000; P.y = G; P.vy = 0; g.step(3); P.x = fl0.x + 1000; g.step(3);
out.push('after walking past: flyers ' + g.flyers().length + ' second at ' + (g.flyers()[1] ? Math.round(g.flyers()[1].x) : null) + ' rings ' + g.rings().length + ' sky stars ' + g.bonus().filter(b => b.sky).length);
const f2 = g.flyers()[1]; if (f2) { P.x = f2.x - 200; P.y = G; P.vy = 0; P.on = true; g.keys.right = true; g.step(60); g.keys.right = false; out.push('ride2 p.fly>0 ' + (P.fly > 0)); const rs2 = g.rings().filter(r => r.x > f2.x); let rg = 0; for (const r of rs2) { P.x = r.x - 40; P.y = r.y + 62; P.vy = 0; g.step(2); if (r.got) rg++; } out.push('second wave rings got ' + rg + '/' + rs2.length); let n = 0; while (P.fly > 0 && n++ < 1200) g.step(5); }
// a normal ride on the first unicorn still creates NO second one
g.reset(); g.start(4); const Q = g.P(); const a = g.flyers()[0]; Q.x = a.x; Q.y = a.y + 95; g.step(3); Q.x = a.x; g.step(900); out.push('normal ride: flyers ' + g.flyers().length);
return out;
