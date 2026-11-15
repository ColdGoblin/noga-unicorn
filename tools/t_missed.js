// stage 4: she walks past the steam items without taking them; each one must come back low and ahead of her, be collectable, and the cloud must fill
const g = __g, out = []; const G = 560; g.reset(); g.start(3); const P = g.P(); const items = g.items();
out.push('start ' + items.map(i => Math.round(i.x) + ',' + Math.round(i.y - G)).join(' '));
g.tp(3000); g.step(3);                            // past item 1 (x 1275) and 2 (x 2262) by more than 700; recover starts at 900 behind
g.tp(3400); g.step(3);
out.push('at 3400: ' + items.map(i => Math.round(i.x) + ',' + Math.round(i.y - G) + (i.got ? 'g' : '')).join(' ') + ' said ' + g.s.said);
for (const it of items) { if (it.got) continue; P.x = it.x; P.y = it.y + 62 + 20; P.vy = 0; g.step(2); }
out.push('got ' + g.s.got + '/' + g.s.total + ' pocket ' + g.pocket().length);
const st = g.sts().find(s => s.id === 'cloud'); P.x = st.x; P.y = G; g.step(80); out.push('cloud ' + st.have + '/' + st.need + ' done ' + st.done);
// the normal run still works: a sane position of everything, finish via the bot is covered by runall
return out;
