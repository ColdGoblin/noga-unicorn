// torch/lantern "already occupied" check (Keeper 22 Nov): she stands on the FIRST lantern of the pattern while it is shown; does standing there count?
const g = __g; g.reset(); g.start(6); const P = g.P(), G = 560; const out = [];
const st = g.sts().find(s => s.kind === 'simon'); const lx = i => st.x + (i - 1.5) * 150;
P.x = st.x; P.y = G; P.vy = 0; g.step(5);
let n = 0; while (st.phase !== 'show' && n++ < 400) g.step(1);
const first = st.seq[0]; out.push('seq ' + st.seq.join('') + ' first ' + first);
P.x = lx(first); P.y = G; P.vy = 0; P.vx = 0; n = 0; while (st.phase !== 'input' && n++ < 800) { P.x = lx(first); g.step(1); }
out.push('input starts, standing on first lantern; k=' + st.k + ' ign=' + st.ign);
g.step(60); out.push('after 60 frames standing: k=' + st.k + ' phase ' + st.phase);
return out;
