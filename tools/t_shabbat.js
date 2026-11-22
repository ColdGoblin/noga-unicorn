const g=__g; g.reset(); g.start(5); const out=[];
const P=g.P();
function step(n){g.step(n)}
// walk items in order of target: use level order
let guard=0;
const order=g.items().filter(i=>!i.hidden);
for(const it of g.items()){ if(it.hidden) continue; P.x=it.x; P.y=it.y+62; P.vy=0; step(2); }
out.push('got '+g.s.got+'/'+g.s.total+' pocket '+g.pocket().map(o=>o.kind).join(','));
// bowl, oven
const bowl=g.sts().find(s=>s.id==='bowl'); g.tp(bowl.x); step(80);
out.push('bowl '+bowl.have+'/'+bowl.need+' done '+bowl.done);
const oven=g.sts().find(s=>s.id==='oven'); step(200);
out.push('oven done '+oven.done);
const ch=g.items().find(o=>o.hid==='challah'); out.push('challah hidden '+ch.hidden+' at '+ch.x);
P.x=ch.x; P.y=ch.y+62; step(2);
out.push('pocket '+g.pocket().map(o=>o.kind).join(','));
// carrots remaining
for(const it of g.items()){ if(!it.got&&!it.hidden){ P.x=it.x; P.y=it.y+62; P.vy=0; step(2);} }
out.push('got '+g.s.got+'/'+g.s.total+' pocket '+g.pocket().map(o=>o.kind).join(','));
const bil=g.sts().find(s=>s.id==='bilam'); g.tp(bil.x); step(120); out.push('bilam '+bil.have+'/'+bil.need);
const can=g.sts().find(s=>s.id==='candles'); g.tp(can.x); g.dance(); step(3); out.push('candles '+can.done);
const tb=g.sts().find(s=>s.id==='table'); g.tp(tb.x); step(60); out.push('table '+tb.done+' pocket '+g.pocket().length);
// stars
for(const b of g.bonus()){ P.x=b.x; P.y=b.y+62; P.vy=0; step(1); }
out.push('stars ok? goalMet '+g.goalMet());
const fr=g.LV().friend; g.tp(fr.x-100); step(150); g.dance(); step(3); out.push('fin '+g.s.fin);
step(1200); out.push('mode '+g.s.mode);
return out;
