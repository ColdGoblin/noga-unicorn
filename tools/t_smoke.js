const g=__g; g.reset(); const out=[];
for(let i=0;i<10;i++){ g.start(i); g.step(40); const L=g.LV(); out.push(i+1+':'+L.name+' items '+g.items().length+' sts '+g.sts().map(s=>s.kind).join('/')+' stars '+g.bonus().length+' mode '+g.s.mode); }
return out;
