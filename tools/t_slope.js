// ramps: walk right over the first hill of stages 1, 3, 4, 5, 7 and back left: she must stay on the ground (on = true nearly always), follow its height, and not get stuck
const g = __g, out = []; const G = 560; g.reset();
const spots = { 0: [600, 1450], 2: [600, 1550], 3: [3600, 4560], 4: [1600, 2560], 6: [1000, 1950] };
for (const lv of Object.keys(spots).map(Number)) {
  g.start(lv); const P = g.P(); const [a, b] = spots[lv]; g.tp(a); g.step(5);
  let offs = 0, maxdev = 0, n = 0, up = 0; g.keys.right = true;
  while (P.x < b && n++ < 900) { g.step(1); if (!P.on) offs++; const gy = g.gnd(P.x); if (P.on && gy !== null) maxdev = Math.max(maxdev, Math.abs(P.y - gy)); up = Math.max(up, G - P.y); }
  const xr = Math.round(P.x); g.keys.right = false; g.keys.left = true; n = 0; let offl = 0;
  while (P.x > a && n++ < 900) { g.step(1); if (!P.on) offl++; }
  g.keys.left = false; g.step(2);
  out.push('lv' + (lv + 1) + ' right to ' + xr + ' (' + (P.x > a ? 'BACK STUCK' : 'back ok') + ') peak ' + up + ' offground right ' + offs + ' left ' + offl + ' maxdev ' + Math.round(maxdev));
}
return out;
