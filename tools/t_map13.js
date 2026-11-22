// the map with 12 stages done: stop 13 must be open, placed, and clickable; starting it must run stage 13
const g = __g, $ = id => document.getElementById(id);
const sv = g.s.save; for (let i = 0; i < 12; i++) sv.done[i] = true; sv.dance = true;
document.getElementById('play').click();
await new Promise(r => setTimeout(r, 1500));
const b = [...document.querySelectorAll('#stops .stop')], out = ['stops ' + b.length];
const l = b[12]; out.push('stop13 class "' + l.className + '" left ' + l.style.left + ' top ' + l.style.top);
l.click(); out.push('after click mode ' + g.s.mode); if (g.s.mode === 'pick') { document.getElementById('pickgo').click(); } g.step(2); out.push('mode ' + g.s.mode + ' li ' + g.s.li + ' followers ' + g.s.followers.join('+'));
g.reset();
return out.join(' | ');
