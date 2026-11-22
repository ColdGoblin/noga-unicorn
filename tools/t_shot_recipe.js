const g = __g; g.reset(); g.start(12); const P = g.P(), G = 560;
const st = g.sts().find(s => s.id === 'machine'); P.x = st.x - 350; P.y = G; P.vy = 0; g.step(30);
const i = st.tok.findIndex(t => t.kind === 'sugar'); g.dragTok(st, i); g.step(40);
const j = st.tok.findIndex(t => t.kind === 'chocbar'); const t = st.tok[j]; g.dragTok(st, j, t.x, t.y); g.step(6);
return ['seq ' + st.seq.join('>'), 'sel ' + (st.sel && st.sel.kind)];
