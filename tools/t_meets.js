// stages 1-3: each has one friend meeting (dance or jump); far away does nothing, near does; stars appear; walking away and back does not repeat
const g = __g, out = []; g.reset(); g.save && 0;
for (const lv of [0, 1, 2]) {
  g.start(lv); const P = g.P(); const m = g.meets()[0]; const b0 = g.bonus().length;
  g.tp(m.x - 1500); g.step(2);
  if (m.do === 'dance') { g.dance(); g.step(2); } else { g.jump(); g.step(2); }
  g.step(150); out.push('lv' + (lv + 1) + ' far press: done ' + m.done);
  g.tp(m.x - 400); g.step(2); P.on = true;
  out.push(' seen ' + m.seen + ' say ' + g.s.said);
  g.tp(m.x - 120); g.step(2);
  if (m.do === 'dance') { g.dance(); g.step(2); } else { g.step(150); g.jump(); g.step(2); }
  out.push(' near press: done ' + m.done + ' bonus +' + (g.bonus().length - b0));
}
return out;
