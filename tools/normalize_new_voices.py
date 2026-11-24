"""Matches the 18 named-direction clips to the old voice clips: 44100 Hz mono 96 kbps mp3, speech loudness about -15.6 dBFS rms, peak at most -3 dBFS.
The recorded files are kept untouched in the folder given as argv[1] (originals); the repo copies are rewritten.
usage: python tools/normalize_new_voices.py <originals-dir>"""
import sys, os, av, numpy as np
from fractions import Fraction
here = os.path.dirname(os.path.abspath(__file__))
vd = os.path.join(here, '..', 'voice', 'he')
src = sys.argv[1]
ids = ['go_bird','go_pitzi','go_tree','go_koko','go_farm','go_rhino','go_riddletree','go_princesses','go_sheba','go_moon','go_bouncy','go_bunicorn_mint','go_jumbo','go_shoshi','x_eat_pink','x_eat_blue','x_feed_bilam','x_table_farm']
TARGET = -15.6; PEAK = -3.0; SR = 44100

def decode(p):
    c = av.open(p); rs = av.AudioResampler(format='fltp', layout='mono', rate=SR); out = []
    for f in c.decode(audio=0):
        for g in rs.resample(f): out.append(g.to_ndarray().reshape(-1))
    for g in rs.resample(None): out.append(g.to_ndarray().reshape(-1))
    c.close(); return np.concatenate(out).astype(np.float32)

def encode(d, p):
    oc = av.open(p, 'w', format='mp3'); st = oc.add_stream('libmp3lame', rate=SR); st.bit_rate = 96000; st.layout = 'mono'
    fr = av.AudioFrame.from_ndarray(d.reshape(1, -1), format='fltp', layout='mono'); fr.sample_rate = SR
    for pk in st.encode(fr): oc.mux(pk)
    for pk in st.encode(None): oc.mux(pk)
    oc.close()

for i in ids:
    d = decode(os.path.join(src, i + '.mp3'))
    act = d[np.abs(d) > 0.02]
    cur = 20 * np.log10(np.sqrt(np.mean(act * act)))
    gain = 10 ** ((TARGET - cur) / 20)
    pk = np.abs(d).max() * gain
    lim = 10 ** (PEAK / 20)
    if pk > lim: gain *= lim / pk
    encode(np.clip(d * gain, -1, 1), os.path.join(vd, i + '.mp3'))
    print(i, 'gain dB', round(20 * np.log10(gain), 1))
