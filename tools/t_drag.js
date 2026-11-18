// real pointer events: press an ingredient, drag it into the candy machine hopper (stage 13), also a drop in the wrong place; run with WS=866,488
const g = __g, out = [], cv = document.getElementById('c');
g.reset(); g.start(12); g.step(3);
const st = g.sts().find(s => s.kind === 'machine'); g.tp(st.x - 330); g.step(120);
const r = cv.getBoundingClientRect(), S = r.height / 720;
const scr = (x, y) => { const c = g.cam(); return [r.left + (x - c.x) * S, r.top + (y - c.y) * S]; };
const ev = (type, x, y) => { const el = type === 'pointerdown' ? document.elementFromPoint(x, y) : cv; el.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 5, pointerType: 'touch', clientX: x, clientY: y, isPrimary: true })); return el.id || el.tagName; };
const h = { x: st.x, y: 560 - 330 };
function dragTo(i, tx, ty) { const t = st.tok[i], a = scr(t.x, t.y), b = scr(tx, ty); const hit = ev('pointerdown', a[0], a[1]); const held = t.s; for (let k = 1; k <= 6; k++) { ev('pointermove', a[0] + (b[0] - a[0]) * k / 6, a[1] + (b[1] - a[1]) * k / 6); g.step(2); } ev('pointerup', b[0], b[1]); return hit + '/' + held; }
out.push('wrong drop: ' + dragTo(0, st.x - 800, 560 - 100)); g.step(60); out.push('token0 ' + st.tok[0].s + ' n=' + st.n);
for (let i = 0; i < 3; i++) { out.push('drag ' + i + ': ' + dragTo(i, h.x, h.y)); g.step(40); }
out.push('n=' + st.n + ' phase ' + st.phase); g.step(200); out.push('done ' + st.done + ' walkingMoved ' + (g.s.x === Math.round(st.x - 330)));
return out.join(' | ');
