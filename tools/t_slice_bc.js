// Keeper 22 Nov, phase 2 slices (b) and (c): pocket stacks by kind (4 kinds, any number each); products appear with her when she already walked on; stage 3 tea table near the fire.
const g = __g, out = [], step = n => g.step(n);
// (c) stage 5 (index 4): 4 planks in the pocket no longer block a 5th plank; a 5th KIND is still held back
g.reset(); g.start(4); let P = g.P(), items = g.items(), pk = g.pocket();
const planks = items.filter(o => !o.kind && o.to === 'bridge'), carrots = items.filter(o => o.kind === 'carrot_bunch'), milk = items.find(o => o.kind === 'milk'), drop = items.find(o => o.kind === 'water_drop'), wheat = items.filter(o => o.kind === 'wheat');
planks.slice(0, 4).forEach(o => { o.got = true; pk.push(o); });
const p5 = planks[4]; P.x = p5.x; P.y = p5.y + 62; P.vy = 0; step(3);
out.push('4 planks in pocket, 5th plank picked up: ' + p5.got + ' pocket ' + pk.length);
pk.length = 0; [planks[0], planks[1], carrots[0], milk, drop].forEach(o => { o.got = true; pk.push(o); });
const w0 = wheat[0]; P.x = w0.x; P.y = w0.y + 62; P.vy = 0; step(3);
out.push('4 kinds (plank, carrot, milk, water) then 5th kind wheat picked up: ' + w0.got + ' (expected false)');
const p2 = planks[2]; P.x = p2.x; P.y = p2.y + 62; P.vy = 0; step(3);
out.push('same kind plank picked up with 4 kinds in pocket: ' + p2.got + ' pocket ' + pk.length);
// (b) stage 3 (index 2): walk through the pot; the teapot must not stay behind her
g.reset(); g.start(2); P = g.P(); items = g.items(); pk = g.pocket();
const pot = g.sts().find(s => s.id === 'pot'), fire = g.sts().find(s => s.id === 'fire'), serve = g.sts().find(s => s.id === 'serve');
out.push('pot ' + pot.x + ' fire ' + fire.x + ' serve ' + serve.x + ' (fire to table ' + (serve.x - fire.x) + ' px)');
items.filter(o => o.to === 'pot').forEach(o => { P.x = o.x; P.y = G0(o); P.vy = 0; step(4); });
function G0(o) { return o.y + 62; }
out.push('pocket for the pot ' + pk.length);
P.x = pot.x + 300; P.y = 560; P.vy = 0; step(3); for (let i = 0; i < 4; i++) g.tap(pot.x, 440); step(3); const dPot = 0;
const teapot = items.find(o => o.kind === 'teapot');
out.push('pot tapped from 300 px ahead of it: she at x ' + Math.round(P.x) + ', teapot at ' + Math.round(teapot.x) + ' hidden ' + !!teapot.hidden + ' got ' + teapot.got);
// (b) stage 5 bread (taps since slice d1): tap the mill and the bowl, tap the oven, then run on past it: the loaf must come to her and reach the table
g.reset(); g.start(4); P = g.P(); items = g.items(); pk = g.pocket(); const S5 = id => g.sts().find(s => s.id === id), at5 = (x, y) => { P.x = x; P.y = y || 560; P.vy = 0; };
['milk', 'wheat'].forEach(k => items.filter(o => o.kind === k).forEach(o => { at5(o.x, o.y + 62); step(4); }));
at5(S5('mill').x - 100); step(2); g.tap(S5('mill').x, 440); g.tap(S5('mill').x, 440); step(3);
const fl = items.find(o => o.kind === 'flour' && o.to === 'fbowl'); at5(fl.x, fl.y + 62); step(3);
at5(S5('fbowl').x - 100); step(2); for (let i = 0; i < 5; i++) { g.tap(S5('fbowl').x, 440); step(1); } step(3);
const ov5 = S5('foven'); at5(ov5.x - 60); step(2); g.tap(ov5.x, 440); g.keys.right = true; n = 0; const tb = S5('ftable'), loaf = items.find(o => o.kind === 'loaf'); let loafSeen = null;
while (!tb.done && n++ < 900) { step(1); if (loaf.got && loafSeen === null) loafSeen = 'picked at frame ' + n + ' she x ' + Math.round(P.x) + ' oven x ' + ov5.x + ' loaf x ' + Math.round(loaf.x); } g.keys.right = false;
out.push('stage 5 taps then run on: loaf ' + loafSeen + '; table done ' + tb.done + ' after ' + n + ' frames, she x ' + Math.round(P.x));
return out;
