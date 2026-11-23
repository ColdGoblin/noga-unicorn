# Keeper 23 Nov: REAL half-save test. For each stage with a halfway flag: play the first half in the LIVE game (a91b8a2, extracted to ../live91),
# take the save.half it writes at the flag, put exactly that save into the CANDIDATE, resume, and check that every saved index points at the same
# kind of item, the goal count is consistent, and the second half can still be finished (goalMet true, mode end).
# usage: python tools/t_half_all.py [stage numbers 1-based...]
import subprocess, sys, json, re, os
HERE = os.path.dirname(os.path.abspath(__file__)); CAND = os.path.dirname(HERE); LIVE = os.path.join(os.path.dirname(CAND), 'live91')
bot = open(os.path.join(HERE, 't_bot.js'), encoding='utf-8').read().split('\ncollect();\n')[0].replace('const P = g.P(), L = g.LV()', 'let P = g.P(), L = g.LV()')
FIRST = """
const rxx = L.rest ? L.rest.x : null; if (rxx === null) return ['NOREST'];
const lowItems = () => g.items().filter(it => !it.got && !it.hidden && it.x < rxx);
for (let pass = 0; pass < 4; pass++) { for (const it of lowItems()) { if (it.to && g.pocket().length >= 4) deliver(); at(it.x, it.y + 62); step(2); } deliver(); }
for (const b of g.bonus()) if (b.x < rxx) { at(b.x, b.y + 62); step(1); }
for (let pass = 0; pass < 2; pass++) { for (const st of g.sts()) if (st.x < rxx) doStation(st); for (const it of lowItems()) { if (it.to && g.pocket().length >= 4) deliver(); at(it.x, it.y + 62); step(2); } deliver(); }
at(rxx + 10, G); step(4);
const half = g.s.save.half[LVL];
out.push('HALF ' + JSON.stringify(half || null)); out.push('GOT ' + g.s.got + ' TOTAL ' + g.s.total);
out.push('IDS ' + JSON.stringify(g.items().map((it, k) => [k, it.kind || '', it.to || '', it.hid || '', Math.round(it.x), it.got ? 1 : 0, it.opt ? 1 : 0, it.hidden ? 1 : 0])));
return out;
"""
SECOND = """
const half = %s; g.s.save.half[LVL] = half; g.start(LVL, null, true); P = g.P(); L = g.LV();
const rxx = L.rest.x; out.push('RESUMED x ' + g.s.x + ' got ' + g.s.got + '/' + g.s.total);
out.push('IDS ' + JSON.stringify(g.items().map((it, k) => [k, it.kind || '', it.to || '', it.hid || '', Math.round(it.x), it.got ? 1 : 0, it.opt ? 1 : 0, it.hidden ? 1 : 0])));
g.items().forEach(it => { if (it.opt && !it.hidden && it.x < rxx && !it.got) it.got = true; });      // a resumed player does not walk back for the extras of the first half
collect(); for (const b of g.bonus()) { at(b.x, b.y + 62); step(1); }
const lg = t => { const T2 = g.sts().find(z => z.id === 'table2'); const O2 = g.sts().find(z => z.id === 'oven2'); if (T2) out.push('LOG ' + t + ' pk ' + g.pocket().map(o => o.kind + '>' + o.to).join() + ' t2 ' + T2.have + (T2.done ? 'D' : '') + ' oven2 ' + (O2 ? (O2.ready ? 'rdy' : '') + (O2.done ? 'D' : '') : '-') + ' x ' + g.s.x + ' loaf ' + JSON.stringify(g.items().filter(o => o.hid === 'challah2A' || o.hid === 'challah2').map(o => [o.hid, o.got ? 1 : 0, o.hidden ? 'H' : '', Math.round(o.x), Math.round(o.y)])) + ' t2cd ' + T2.cd); };
for (const st of g.sts()) { doStation(st); lg('ds ' + st.id); collect(); lg('col ' + st.id); }
for (let pass = 0; pass < 4; pass++) { collect(); lg('P' + pass + ' collect'); for (const st of g.sts()) { doStation(st); if (/2$/.test(st.id)) lg('P' + pass + ' ' + st.id); } }
out.push('after second half: items ' + g.s.got + '/' + g.s.total + ' sts ' + g.sts().map(s => s.id + ':' + (s.done ? 1 : 0)).join(' ') + ' goalMet ' + g.goalMet());
const fr = L.friend; if (!g.s.fin) { const gy = g.gnd(fr.x - 100); at(fr.x - 100, gy === null ? G : gy); step(150); g.dance(); step(3); }
out.push('DIAG2 ' + JSON.stringify(g.sts().filter(z => /2$/.test(z.id) && ['bowl2','oven2','table2'].includes(z.id)).map(z => [z.id, z.have, z.need, z.seq || '', z.wish || '', z.spawn || '', z.ready ? 'rdy' : '', z.done ? 'done' : ''])) + JSON.stringify(g.items().filter(o => /table2|bowl2/.test(o.to || '')).map(o => [o.kind, o.to, o.hid || '', o.got ? 1 : 0, o.hidden ? 'H' : '', o.opt ? 'opt' : '', Math.round(o.x)])));
out.push('DIAG notgot ' + JSON.stringify(g.items().filter(o => !o.got).map(o => [o.kind || '', o.to || '', o.hid || '', Math.round(o.x), o.hidden ? 'H' : '', o.opt ? 'opt' : ''])) + ' pocket ' + JSON.stringify(g.pocket().map(o => [o.kind || '', o.to])) + ' sts ' + JSON.stringify(g.sts().filter(z => !z.done).map(z => [z.id, z.kind, z.have, z.need, z.ready ? 'rdy' : '', z.stirring || 0])));
step(1400); if (g.s.mode === 'finale') { step(2800); } out.push('MODE ' + g.s.mode);
return out;
"""
def run(proj, code, tag):
    f = os.path.join(HERE, '_h_%s.js' % tag); open(f, 'w', encoding='utf-8').write(code)
    env = dict(os.environ, PROJ=proj, CUT='60000', VT='60000')
    r = subprocess.run(['bash', os.path.join(HERE, 'runtest.sh'), f], capture_output=True, text=True, env=env, timeout=300)
    os.remove(f); t = r.stdout.strip()
    m = re.search(r'RESULT (\[.*\]) ERRS (\[.*\])', t)
    return (json.loads(m.group(1)), m.group(2)) if m else (None, t[:300])
stages = [int(a) for a in sys.argv[1:]] or list(range(1, 16))
for n in stages:
    lvl = n - 1; head = 'const LVL = %d;\n' % lvl + bot + '\n'
    res, err = run(LIVE, head + FIRST, 'live')
    if res is None: print('stage', n, 'LIVE FAIL', err); continue
    if os.environ.get('HDBG'): print([str(x)[:160] for x in res])
    if res == ['NOREST']: print('stage', n, 'no halfway flag'); continue
    pk = lambda r, pre: next((x for x in r if x.startswith(pre)), pre + 'null'); half = json.loads(pk(res, 'HALF ')[5:]); got_live = pk(res, 'GOT '); ids_live = json.loads(pk(res, 'IDS ')[4:])
    if not half: print('stage', n, 'LIVE saved no half (flag not reached)', res[1]); continue
    res2, err2 = run(CAND, head + SECOND % json.dumps(half), 'cand')
    if res2 is None: print('stage', n, 'CAND FAIL', err2); continue
    ids_c = json.loads(pk(res2, 'IDS ')[4:])
    # identity check: each saved index must be the same kind/to/hid in live and candidate
    bad = []
    for k in half.get('it', []):
        a = ids_live[k]; b = ids_c[k] if k < len(ids_c) else None
        if not b or a[1:4] != b[1:4]: bad.append((k, a, b))
    print('stage %d | live saved %d items, %s | identity mismatches %d %s | %s | %s | ERRS %s' % (n, len(half.get('it', [])), got_live, len(bad), json.dumps(bad)[:300], pk(res2, 'RESUMED'), ' ; '.join(x for x in res2 if x.startswith(('after', 'MODE', 'DIAG'))), err2))
