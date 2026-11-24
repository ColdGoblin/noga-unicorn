"""Decodes the 18 new named-direction clips plus some old ones with PyAV and reports duration and loudness (RMS dBFS, peak dBFS)
so a loudness mismatch against the old clips shows up. usage: python tools/t_voice_files.py"""
import sys, os, av, numpy as np
here = os.path.dirname(os.path.abspath(__file__))
vd = os.path.join(here, '..', 'voice', 'he')
new = ['go_bird','go_pitzi','go_tree','go_koko','go_farm','go_rhino','go_riddletree','go_princesses','go_sheba','go_moon','go_bouncy','go_bunicorn_mint','go_jumbo','go_shoshi','x_eat_pink','x_eat_blue','x_feed_bilam','x_table_farm']
old = ['ins_24','x_eat','x_feed','x_table','ins_23','l12_a','l1_a','l5_c','ins_18b']
def stat(p):
    c = av.open(p); chunks = []; sr = None
    for f in c.decode(audio=0):
        a = f.to_ndarray().astype(np.float32)
        if a.dtype.kind != 'f': pass
        chunks.append(a.reshape(-1)); sr = f.sample_rate
    c.close()
    d = np.concatenate(chunks)
    if np.abs(d).max() > 1.5: d = d / 32768.0
    rms = float(np.sqrt(np.mean(d * d)))
    act = d[np.abs(d) > 0.02]
    arms = float(np.sqrt(np.mean(act * act))) if act.size else 0.0
    db = lambda v: round(20 * np.log10(max(v, 1e-9)), 1)
    return len(d) / sr, sr, db(rms), db(arms), db(float(np.abs(d).max()))
print('id | dur s | sr | rms dB | speech-only rms dB | peak dB')
for grp, ids in (('NEW', new), ('OLD', old)):
    vals = []
    for i in ids:
        p = os.path.join(vd, i + '.mp3')
        if not os.path.exists(p): print(grp, i, 'MISSING'); continue
        s = stat(p); vals.append(s)
        print(grp, i, round(s[0], 2), s[1], s[2], s[3], s[4])
    if vals:
        print(grp, 'MEAN speech rms', round(sum(v[3] for v in vals) / len(vals), 1), 'mean peak', round(sum(v[4] for v in vals) / len(vals), 1))
