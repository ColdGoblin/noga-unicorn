// Keeper 22 Nov: shared recipe interaction on the candy machines (stage 13 index 12). Real flows through the same hooks the pointer uses.
const g = __g; g.reset(); g.start(12); const P = g.P(), G = 560, out = [];
const st = g.sts().find(s => s.id === 'machine'); const step = n => g.step(n);
P.x = st.x - 420; P.y = G; P.vy = 0; step(5);
const tokIdx = k => st.tok.findIndex(t => t.kind === k);
const put = k => { const ok = g.dragTok(st, tokIdx(k)); step(40); return ok; };            // drag into the hopper
out.push('card target ' + st.rc.target.join('>') + ' phase ' + st.phase);
// 1. demo does not play the turn
g.tap(st.x, G - 478); step(5); out.push('demo started ' + (st.demo > 0)); step(260); out.push('demo ended ' + (st.demo === 0) + ' seq ' + st.seq.length + ' phase ' + st.phase + ' done ' + st.done);
// 2. intended alternate recipe (chocbar,sugar,strawberry) -> a lollipop on the shelf, target stays open
['chocbar', 'sugar', 'strawberry'].forEach(put); out.push('after alt: phase ' + st.phase + ' res ' + (st.res && st.res.out)); step(120);
out.push('alt result: shelf ' + st.shelf.map(o => o.kind).join(',') + ' phase ' + st.phase + ' seq ' + st.seq.length + ' tokens ' + st.tok.map(t => t.s).join(',') + ' done ' + st.done + ' miss ' + st.miss);
// 3. mismatch (sugar,chocbar,strawberry) -> harmless mix, nothing lost
['sugar', 'chocbar', 'strawberry'].forEach(put); step(130);
out.push('mix result: shelf ' + st.shelf.length + ' phase ' + st.phase + ' seq ' + st.seq.length + ' tokens ' + st.tok.map(t => t.s).join(',') + ' miss ' + st.miss + ' done ' + st.done);
// 4. after 2 misses the next right ingredient is the helper (never stuck)
out.push('helper token ' + (g.sts().find(s => s.id === 'machine') && st.tok.find(t => t.s === 'idle' && t.kind === st.rc.target[st.seq.length]).kind));
// 5. tap-then-tap-machine for the right order: sugar, strawberry, chocbar
for (const k of ['sugar', 'strawberry', 'chocbar']) { const i = tokIdx(k), t = st.tok[i]; g.dragTok(st, i, t.x, t.y); step(2); out.push('selected ' + k + ' ' + (st.sel === t)); g.tap(st.x, G - 200); step(40); }
out.push('after tap-tap: n ' + st.n + ' phase ' + st.phase + ' seq ' + st.seq.join('>')); step(260);
out.push('target made: done ' + st.done + ' made items ' + g.items().filter(o => o.hid === 'made' && !o.hidden).length);
// 6. fallback by standing: second machine, nothing touched
g.reset(); g.start(12); const P2 = g.P(); const m2 = g.sts().find(s => s.id === 'machine2'); P2.x = m2.x - 150; P2.y = G; P2.vy = 0; step(5); P2.x = m2.x - 150; step(200); out.push('after 3.3 s standing: n ' + m2.n); P2.x = m2.x - 150; step(300);
out.push('stand fallback m2: seq ' + m2.seq.join('>') + ' n ' + m2.n);
return out;
