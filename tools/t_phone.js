// run with WS=844,390 : layout audit of the controls at phone landscape + real pointer events on the buttons and on the field (touch-like)
const g = __g, out = [], $ = id => document.getElementById(id);
const R = id => { const r = $(id).getBoundingClientRect(); return { id, x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), vis: !$(id).classList.contains('hide') && r.width > 0 }; };
out.push('viewport ' + innerWidth + 'x' + innerHeight);
const ptrEv = (el, type, x, y) => el.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 7, pointerType: 'touch', clientX: x, clientY: y, isPrimary: true }));
const press = (id, n = 1) => { const r = $(id).getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2; ptrEv($(id), 'pointerdown', x, y); g.step(n); ptrEv($(id), 'pointerup', x, y); };
const hold = (id, n) => { const r = $(id).getBoundingClientRect(); const x = r.left + r.width / 2, y = r.top + r.height / 2; ptrEv($(id), 'pointerdown', x, y); g.step(n); ptrEv($(id), 'pointerup', x, y); };
for (const lv of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
  g.reset(); g.start(lv); g.step(3);
  const sv = JSON.parse(localStorage.getItem('nogaUnicorn2') || '{}');
  // show every button the game can show, to test the worst case overlap
  ['bl', 'br', 'bj', 'bd', 'bs'].forEach(b => $(b).classList.remove('hide'));
  const ids = ['bl', 'br', 'bj', 'bd', 'bs', 'snd', 'mus'], rs = ids.map(R).filter(r => r.vis); const bad = [];
  for (let i = 0; i < rs.length; i++) { const a = rs[i]; if (a.x < 0 || a.y < 0 || a.x + a.w > innerWidth || a.y + a.h > innerHeight) bad.push(a.id + ' off-screen'); if (a.w < 44 || a.h < 44) bad.push(a.id + ' small ' + a.w + 'x' + a.h);
    for (let j = i + 1; j < rs.length; j++) { const b = rs[j]; if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h) bad.push(a.id + '/' + b.id + ' overlap'); } }
  out.push('L' + (lv + 1) + ' buttons ' + (bad.length ? bad.join(', ') : 'ok') + ' sizes ' + rs.map(r => r.id + ':' + r.w).join(' '));
}
// touch play, stage 1: hold the right arrow, press jump and dance
g.reset(); g.start(0); g.step(3); const P = g.P(); const x0 = P.x;
hold('br', 60); out.push('right arrow 60 frames moved ' + Math.round(P.x - x0));
const y0 = P.y; press('bj', 1); let top = 0; for (let i = 0; i < 40; i++) { g.step(1); top = Math.max(top, y0 - P.y); } out.push('jump button lift ' + Math.round(top));
g.step(100); $('bd').classList.remove('hide'); press('bd', 2); out.push('dance button: dance frames ' + Math.round(P.dance));
// finger on the field: hold to the right of her, then point above her
const cv = document.getElementById('cv') || document.querySelector('canvas'), cr = cv.getBoundingClientRect(); g.step(150);
const px = x => cr.left + (x - 0) ; const x1 = P.x; ptrEv(cv, 'pointerdown', cr.left + cr.width * 0.8, cr.top + cr.height * 0.7); g.step(60); ptrEv(cv, 'pointerup', 0, 0); out.push('finger right of her 60 frames moved ' + Math.round(P.x - x1));
return out;
