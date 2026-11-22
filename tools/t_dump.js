const g = __g; const out = [];
for (let i = 0; i < 20; i++) { try { g.reset(); g.start(i); } catch (e) { break; }
  const L = g.LV(); if (!L || !L.name) break;
  out.push({ i: i + 1, name: L.name, len: L.len || L.w || null, need: L.need, friend: L.friend && L.friend.id, sts: g.sts().map(s => s.kind + ':' + s.id + '@' + Math.round(s.x)), items: g.items().length, keys: Object.keys(L).join(',') });
}
return out;
