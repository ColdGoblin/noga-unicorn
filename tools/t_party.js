// companion picker: with 5 stages done, going to stage 6 shows the picker; max 2 selected; play starts the level with exactly those two
const g = __g, out = [], $ = id => document.getElementById(id); g.reset();
[0, 1, 2, 3, 4].forEach(i => g.s.save.done[i] = true);
g.goLevel(5);
const btns = [...$('pickrow').children]; out.push('mode ' + g.s.mode + ' buttons ' + btns.length + ' default ' + g.pickSel().join(','));
const sel = () => [...$('pickrow').children].filter(b => b.classList.contains('sel')).map(b => b.dataset.k);
btns[0].click(); btns[1].click(); btns[2].click(); out.push('after 3 taps selected ' + sel().join(',') + ' (' + sel().length + ')');
btns[2].click(); out.push('tap selected one removes: ' + sel().length);
btns[0].click(); btns[1].click(); const want = sel().slice(); $('pickgo').click();
out.push('started mode ' + g.s.mode + ' level ' + g.s.li + ' followers ' + g.s.followers.join(',') + ' want ' + want.join(',') + ' pick hidden ' + $('pick').classList.contains('hide'));
// with 2 or fewer friends no picker
g.reset(); g.s.save.done.fill(false); g.goLevel(0); out.push('stage 1 direct: mode ' + g.s.mode + ' followers ' + g.s.followers.length);
g.s.save.done[0] = true; g.goLevel(1); out.push('stage 2 (1 stage done: bird/pitzi/luna minus pitzi): mode ' + g.s.mode + ' followers ' + g.s.followers.join(','));
return out;
