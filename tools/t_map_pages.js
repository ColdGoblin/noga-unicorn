const g = __g; const out = [];
g.reset(); const sv = g.s.save;
// fresh: only level 1 open; map from title opens page of the next level (0)
g.showMap(); out.push({ fresh: g.mapInfo() });
// levels 1-9 done -> the next level (10) is on page 2: default page is 2 and the back card should glow only if next is on the other page
for (let i = 0; i < 9; i++) sv.done[i] = true;
g.showMap(); out.push({ nine: g.mapInfo() });
g.showMap(0); const p0 = g.mapInfo(); out.push({ page0: p0 });
// click the gate -> page 2, then click the back card -> page 1
document.querySelector('#stops .gate').click(); out.push({ afterGate: g.mapInfo() });
document.querySelector('#stops .back').click(); out.push({ afterBack: g.mapInfo() });
// unlock rule + save untouched: level 11 locked until 10 done, 14 locked until 13 done
g.showMap(1); const st = [...document.querySelectorAll('#stops .stop')].map(b => ({ i: b.dataset.i, locked: b.classList.contains('locked'), done: b.classList.contains('done') })); out.push({ page2stops: st });
const before = JSON.stringify(sv); g.showMap(0); g.showMap(1); out.push({ saveUntouched: before === JSON.stringify(sv) });
// click an open stop on page 2 starts level index 9
document.querySelector('#stops .stop[data-i="9"]').click(); out.push({ started: g.s.mode, li: g.s.li });
return out;
