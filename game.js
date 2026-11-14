/* Noga and the Unicorn - levels 1 to 3.
   Design: design/LEVEL-DESIGNS.md. Pictures and voice are stand-ins until the real ones arrive:
   any file that exists under art/ or voice/full/ is used automatically in place of its stand-in. */
'use strict';

/* ---------- screen ---------- */
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const VH = 720, G = 560;            // virtual height, ground line
let VW = 1280, S = 1;
function resize(){
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.max(1, innerWidth * dpr); cv.height = Math.max(1, innerHeight * dpr);
  S = cv.height / VH; VW = cv.width / S;
  document.getElementById('rotate').classList.toggle('hide', innerWidth >= innerHeight);
}
addEventListener('resize', resize); resize();
const $ = id => document.getElementById(id);
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const RB = ['#ff5f7e', '#ffa64d', '#ffe14d', '#6fdc8c', '#5fb8ff', '#b98cff'];

/* ---------- save ---------- */
const SAVE_KEY = 'nogaUnicorn1';
let save = { done: [false, false, false], dance: false, sup: false };
try { const o = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
  if (o && Array.isArray(o.done)) { save.done = [0, 1, 2].map(i => !!o.done[i]); save.sup = !!o.sup; } } catch (e) {}
save.dance = true;                    // the Dance button is there from the very first level (owner request, 14 Nov)
function persist(){ try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {} }

/* ---------- pictures (Ghost's art; the canvas drawings below are only the fallback if a file is missing) ---------- */
const IMG = {};
function load(key, src){ const im = new Image(); im.onload = () => { IMG[key] = im; }; im.onerror = () => {}; im.src = src; }
load('body', 'art/standin/uni_body2.png'); load('legA', 'art/standin/uni_legA.png'); load('legB', 'art/standin/uni_legB.png');
load('heroBody', 'art/hero/hero_body.png'); load('heroBack', 'art/hero/hero_leg_back.png'); load('heroFront', 'art/hero/hero_leg_front.png');
load('heroFull', 'art/hero/hero_full.png'); load('heroHappy', 'art/hero/hero_happy.png'); load('heroWings', 'art/hero/hero_wings.png');
['pitzi', 'bird', 'mamabird', 'bobo', 'shluli', 'tree', 'bilam'].forEach(k => { load(k + '_sad', 'art/friends/' + k + '_sad.png'); load(k + '_happy', 'art/friends/' + k + '_happy.png'); });
['feather', 'petal', 'star', 'bigbubble', 'bubble_red', 'bubble_blue', 'bubble_green', 'bubble_yellow'].forEach(k => load('item_' + k, 'art/items/item_' + k + '.png'));
['stone', 'rock', 'mushroom', 'stump', 'branch', 'cloud'].forEach(k => load('prop_' + k, 'art/props/prop_' + k + '.png'));
['garden', 'rainbow', 'forest'].forEach(k => load('bg_' + k, 'art/bg/bg_' + k + '.jpg'));
/* opaque box of each scenery picture: [x, y, w, h] inside its file (so only the drawing is placed, not the empty margin) */
const PB = { stone: [10, 247, 382, 128], rock: [8, 9, 383, 366], mushroom: [5, 28, 389, 346], stump: [6, 153, 388, 221], branch: [5, 14, 688, 399], cloud: [6, 67, 588, 347], bigbubble: [32, 45, 732, 746] };

/* ---------- sound ---------- */
let soundOn = true, AC = null, musicGain = null;
function ac(){ if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (AC && AC.state === 'suspended') AC.resume(); return AC; }
function tone(f, d, type, vol, slide){
  if (!soundOn) return; const a = ac(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
  o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d);
  g.gain.setValueAtTime(vol || 0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + d);
  o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + d + 0.02);
}
const sfx = {
  jump(){ tone(380, 0.18, 'sine', 0.1, 760); },
  sup(){ tone(300, 0.5, 'triangle', 0.14, 1400); },
  pick(){ tone(880, 0.1, 'triangle', 0.13); setTimeout(() => tone(1320, 0.16, 'triangle', 0.13), 80); },
  star(){ tone(1200, 0.09, 'sine', 0.1); setTimeout(() => tone(1600, 0.12, 'sine', 0.1), 70); },
  splash(){ tone(240, 0.22, 'sine', 0.12, 90); },
  boing(){ tone(180, 0.3, 'square', 0.07, 620); },
  dance(){ [523, 659, 784].forEach((f, i) => setTimeout(() => tone(f, 0.16, 'triangle', 0.1), i * 110)); },
  win(){ [523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => tone(f, 0.28, 'triangle', 0.13), i * 140)); },
  pop(){ tone(500, 0.12, 'sine', 0.1, 200); }
};
/* a soft looping tune, quieter while the voice speaks */
const TUNES = [[523, 659, 784, 659, 698, 784, 880, 784], [587, 740, 880, 740, 659, 784, 988, 784], [440, 523, 659, 523, 494, 587, 698, 587]];
let tuneI = 0, tuneN = 0, tuneTimer = null;
function startMusic(i){ tuneI = i % TUNES.length; tuneN = 0; if (tuneTimer) return;
  tuneTimer = setInterval(() => { if (!soundOn || mode !== 'play') return;
    const f = TUNES[tuneI][tuneN++ % 8]; tone(f, 0.34, 'sine', Voice.busy ? 0.012 : 0.035); if (tuneN % 2 === 0) tone(f / 2, 0.5, 'triangle', Voice.busy ? 0.008 : 0.022); }, 380);
}

/* ---------- voice: recorded clip if present, otherwise the browser reads the line ---------- */
let LANG = 'he';                      // spoken language: 'he' (default, the owner needs Hebrew) or 'en'
try { const q = new URLSearchParams(location.search).get('lang'); const sv = localStorage.getItem('nogaLang');
  LANG = (q === 'en' || q === 'he') ? q : (sv === 'en' || sv === 'he') ? sv : 'he'; } catch (e) {}
const lineText = id => (LANG === 'he' ? window.LINES_HE : window.LINES)[id];
const voiceDir = () => LANG === 'he' ? 'voice/he/' : 'voice/full/';
const TITLES = { he: 'נגה והחד-קרן', en: 'Noga and the Unicorn' };
function applyLang(){ document.documentElement.lang = LANG; const h = document.querySelector('#title h1'); if (h) h.textContent = TITLES[LANG]; document.title = TITLES[LANG]; }
const Voice = {
  q: [], busy: false, files: false, cur: null, timer: null, last: '',
  init(){ this.files = false; const a = new Audio(); a.oncanplaythrough = () => { Voice.files = true; }; a.onerror = () => {}; a.src = voiceDir() + 'ins_01.mp3'; },
  say(id){ if (!lineText(id)) return; if (this.q.length > 4) return; if (this.q[this.q.length - 1] === id) return; this.q.push(id); this.pump(); },
  sayIfFree(id){ if (!this.busy && !this.q.length) this.say(id); },
  idle(){ return !this.busy && !this.q.length; },
  pump(){
    if (this.busy || !this.q.length) return;
    const id = this.q.shift(); this.last = id;
    if (!soundOn) { return this.pump(); }
    this.busy = true;
    const done = () => { if (!Voice.busy) return; Voice.busy = false; clearTimeout(Voice.timer); Voice.cur = null; setTimeout(() => Voice.pump(), 160); };
    const text = lineText(id);
    this.timer = setTimeout(done, 1600 + text.length * 95);     // never get stuck
    const tts = () => {
      try { const sy = window.speechSynthesis; if (!sy) return done();
        const u = new SpeechSynthesisUtterance(text), vs = sy.getVoices() || [];
        const he = LANG === 'he';
        const pool = vs.filter(v => (he ? /^he/i : /^en/i).test(v.lang));
        u.voice = (he ? pool.find(v => /carmit|female|google/i.test(v.name)) : pool.find(v => /zira|jenny|aria|samantha|female|google us/i.test(v.name))) || pool[0] || null;
        u.lang = he ? 'he-IL' : 'en-US'; u.rate = 0.9; u.pitch = id.startsWith('fr_') ? 1.6 : 1.2; u.onend = done; u.onerror = done; sy.speak(u);
      } catch (e) { done(); }
    };
    if (this.files) { const a = new Audio(voiceDir() + id + '.mp3'); this.cur = a; a.onended = done; a.onerror = tts; a.play().catch(tts); }
    else tts();
  },
  hush(){ this.q.length = 0; try { if (this.cur) this.cur.pause(); window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} this.busy = false; clearTimeout(this.timer); }
};
Voice.init(); applyLang();
const PRAISE = ['pr_01', 'pr_03', 'pr_04', 'pr_06', 'pr_13', 'pr_14'];
let lastPraise = '';
function praise(){ let p; do { p = PRAISE[Math.floor(Math.random() * PRAISE.length)]; } while (p === lastPraise); lastPraise = p; Voice.sayIfFree(p); }

/* ---------- controls ---------- */
const keys = { left: false, right: false };
let wantJump = false, wantDance = false, wantSuper = false;
function hold(el, on, off){
  el.addEventListener('pointerdown', e => { e.preventDefault(); ac(); el.classList.add('down'); on(); try { el.setPointerCapture(e.pointerId); } catch (x) {} });
  const up = () => { el.classList.remove('down'); off && off(); };
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('lostpointercapture', up);
  el.addEventListener('contextmenu', e => e.preventDefault());
}
hold($('bl'), () => keys.left = true, () => keys.left = false);
hold($('br'), () => keys.right = true, () => keys.right = false);
hold($('bj'), () => wantJump = true);
hold($('bd'), () => wantDance = true);
hold($('bs'), () => wantSuper = true);
addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') keys.left = true; else if (e.key === 'ArrowRight') keys.right = true;
  else if (!e.repeat && (e.key === ' ' || e.key === 'ArrowUp')) { wantJump = true; e.preventDefault(); }
  else if (!e.repeat && (e.key === 'd' || e.key === 'D')) wantDance = true;
  else if (!e.repeat && (e.key === 's' || e.key === 'S' || e.key === 'Shift')) wantSuper = true;
});
addEventListener('keyup', e => { if (e.key === 'ArrowLeft') keys.left = false; else if (e.key === 'ArrowRight') keys.right = false; });
/* mouse or finger on the playfield: hold to walk toward the pointer, point above her to jump, click her to dance */
const ptr = { down: false, cx: 0, cy: 0, id: null };
function ptrWorld(){ const r = cv.getBoundingClientRect(); return { x: (ptr.cx - r.left) / r.width * VW + camX, y: (ptr.cy - r.top) / r.height * VH }; }
cv.addEventListener('pointerdown', e => {
  if (mode !== 'play' || !p) return; ac(); ptr.cx = e.clientX; ptr.cy = e.clientY; const w = ptrWorld();
  if (save.dance && Math.abs(w.x - p.x) < 90 && w.y > p.y - 200 && w.y < p.y + 12) { wantDance = true; return; }
  ptr.down = true; ptr.id = e.pointerId; try { cv.setPointerCapture(e.pointerId); } catch (x) {} });
cv.addEventListener('pointermove', e => { if (ptr.down) { ptr.cx = e.clientX; ptr.cy = e.clientY; } });
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => cv.addEventListener(ev, () => { ptr.down = false; }));
cv.addEventListener('contextmenu', e => e.preventDefault());
/* parent corner: hold the sound button for 1.5 s to switch Hebrew / English */
let langHold = null, langDone = false;
$('snd').addEventListener('pointerdown', () => { langDone = false; clearTimeout(langHold); langHold = setTimeout(() => { langDone = true;
  LANG = LANG === 'he' ? 'en' : 'he'; try { localStorage.setItem('nogaLang', LANG); } catch (e) {} applyLang(); Voice.hush(); Voice.init(); Voice.say('ex_01'); }, 1500); });
['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => $('snd').addEventListener(ev, () => clearTimeout(langHold)));
$('snd').addEventListener('click', () => { if (langDone) { langDone = false; return; } soundOn = !soundOn; $('snd').innerHTML = soundOn ? '&#128266;' : '&#128263;'; if (!soundOn) Voice.hush(); });
function glow(which){ ['bl', 'br', 'bj', 'bd'].forEach(b => $(b).classList.toggle('glow', b === which)); }
function showButtons(){
  const play = mode === 'play';
  ['bl', 'br', 'bj'].forEach(b => $(b).classList.toggle('hide', !play));
  $('bd').classList.toggle('hide', !(play && save.dance));
  $('bs').classList.toggle('hide', !(play && save.sup));
  $('snd').classList.toggle('hide', false);
}

/* ---------- levels ---------- */
const COL = { red: ['#ff5f6e', 'col_01'], blue: ['#5fa8ff', 'col_02'], green: ['#5fd68a', 'col_03'], yellow: ['#ffd84d', 'col_04'], pink: ['#ff8fc7', 'col_05'] };
/* terrain = the ground, as segments {x0, x1, top}. Space between segments is a gap (a stream or a hole in the rainbow).
   plats = things to stand on. Resting kinds (stone, rock, mushroom, stump) stand on `base` (default ground G) and get their
   height from the picture; floating kinds (cloud, branch, bigbubble) keep the `top` given here. */
/* a row of bonus stars along an arc: x0..x1, base height y, bump h (0 = straight line), n stars */
const arcRow = (x0, x1, y, h, n) => Array.from({ length: n }, (_, i) => { const k = n > 1 ? i / (n - 1) : 0; return { x: Math.round(x0 + (x1 - x0) * k), y: Math.round(y - Math.sin(k * Math.PI) * h) }; });
const LEVELS = [
  { name: 'garden', len: 5600, sticker: 1, collect: 'feather', ins: 'ins_11', auto: true, joins: ['bird', 'pitzi'],
    finSay: ['fr_01', 'l1_c', 'pr_02'],
    terrain: [{ x0: 0, x1: 700, top: G }, { x0: 700, x1: 900, top: G - 60 }, { x0: 900, x1: 1100, top: G - 120 }, { x0: 1100, x1: 1300, top: G - 60 }, { x0: 1300, x1: 1750, top: G },
              { x0: 1910, x1: 2550, top: G }, { x0: 2550, x1: 2800, top: G - 70 }, { x0: 2800, x1: 3050, top: G - 140 }, { x0: 3050, x1: 3300, top: G - 70 }, { x0: 3300, x1: 3780, top: G },
              { x0: 4060, x1: 4950, top: G }, { x0: 4950, x1: 5150, top: G - 60 }, { x0: 5150, x1: 5420, top: G - 80 }, { x0: 5420, x1: 5600, top: G }],
    friend: { kind: 'bird', x: 5290, on: 80 },
    items: [{ x: 560, y: G - 45 }, { x: 1000, y: G - 215 }, { x: 3480, y: G - 345 }],
    bonus: [].concat(arcRow(260, 520, G - 70, 0, 3), arcRow(780, 1220, G - 120, 60, 7), arcRow(1400, 1650, G - 70, 0, 4), arcRow(1700, 1960, G - 80, 130, 5),
      arcRow(2080, 2420, G - 80, 170, 6), arcRow(2600, 3250, G - 215, 50, 8), arcRow(3560, 3760, G - 75, 0, 3), arcRow(3790, 4050, G - 90, 150, 5),
      arcRow(4150, 4650, G - 70, 90, 7), arcRow(4980, 5250, G - 135, 40, 5)),
    plats: [{ x: 1795, w: 90, kind: 'stone' }, { x: 2150, w: 100, kind: 'rock' }, { x: 2330, w: 150, kind: 'mushroom' }, { x: 3830, w: 90, kind: 'stone' }, { x: 3940, w: 90, kind: 'stone' },
            { x: 4250, w: 110, kind: 'stump' }, { x: 4500, w: 100, kind: 'rock' }, { x: 4700, w: 90, kind: 'stone' }],
    pads: [{ x: 3350, w: 170, top: G - 52 }], splash: { x: 1440, w: 150 },
    decos: [{ kind: 'pitzi', x: 300, happy: true }, { kind: 'shluli', x: 1515, happy: true }, { kind: 'bobo', x: 3435 }, { kind: 'mamabird', x: 5510, y: G - 250, happy: true }],
    cues: [{ x: 0, say: ['l1_a', 'ins_01'], glow: 'br' }, { x: 430, say: ['ins_11'] }, { x: 1330, say: ['ins_06'], glow: 'bd' }, { x: 1560, say: ['ins_02'], glow: 'bj' }, { x: 2100, say: ['ins_05'], glow: 'bj' },
           { x: 2650, say: ['l1_b'] }, { x: 3200, say: ['ins_15'] }] },

  { name: 'rainbow', len: 6200, sticker: 2, collect: 'bubble', ins: 'ins_12', joins: ['pitzi'], without: ['pitzi'],
    finSay: ['fr_03', 'l2_c', 'pr_02'],
    terrain: [{ x0: 0, x1: 1100, top: G }, { x0: 1400, x1: 2000, top: G }, { x0: 2000, x1: 2250, top: G - 60 }, { x0: 2250, x1: 2500, top: G - 120 }, { x0: 2500, x1: 2750, top: G - 60 }, { x0: 2750, x1: 3050, top: G },
              { x0: 3350, x1: 4000, top: G }, { x0: 4250, x1: 4600, top: G }, { x0: 4600, x1: 4850, top: G - 70 }, { x0: 4850, x1: 5100, top: G - 140 }, { x0: 5100, x1: 5350, top: G - 70 }, { x0: 5350, x1: 6200, top: G }],
    friend: { kind: 'pitzi', x: 5900 },
    items: [{ x: 620, y: G - 130, col: 'red' }, { x: 1250, y: G - 185, col: 'blue' }, { x: 2375, y: G - 200, col: 'green' }, { x: 4975, y: G - 220, col: 'yellow' }],
    bonus: [].concat(arcRow(240, 520, G - 70, 0, 4), arcRow(780, 1000, G - 150, 40, 4), arcRow(1480, 1900, G - 70, 0, 6), arcRow(1520, 2000, G - 250, 40, 5), arcRow(2060, 2740, G - 190, 60, 8),
      arcRow(2800, 3000, G - 70, 0, 3), arcRow(3360, 3980, G - 70, 0, 6), arcRow(3500, 3900, G - 220, 40, 4), arcRow(4020, 4240, G - 150, 80, 4), arcRow(4300, 4580, G - 70, 0, 4), arcRow(4640, 5300, G - 195, 60, 7), arcRow(5420, 5800, G - 70, 0, 5)),
    plats: [{ x: 690, w: 130, top: G - 75, kind: 'cloud' },
            { x: 1080, w: 170, top: G, kind: 'bigbubble', move: { a: 1080, b: 1250, sp: 0.012 } }, { x: 3030, w: 170, top: G, kind: 'bigbubble', move: { a: 3030, b: 3200, sp: 0.012, ph: 2 } },
            { x: 1540, w: 120, top: G - 90, kind: 'cloud' }, { x: 1720, w: 120, top: G - 170, kind: 'cloud' }, { x: 1880, w: 120, top: G - 250, kind: 'cloud' },
            { x: 4060, w: 130, top: G - 75, kind: 'cloud' },
            { x: 3500, w: 120, top: G - 100, kind: 'cloud' }, { x: 3690, w: 120, top: G - 190, kind: 'cloud' }, { x: 3860, w: 120, top: G - 110, kind: 'cloud' },
            { x: 5420, w: 130, top: G - 90, kind: 'cloud' }, { x: 5600, w: 130, top: G - 180, kind: 'cloud' }],
    danceZone: { a: 1450, b: 2000 },
    cues: [{ x: 0, say: ['fr_02', 'l2_a', 'ins_12'] }, { x: 940, say: ['ins_13'], glow: 'bj' }, { x: 1500, say: ['ins_06'], glow: 'bd', show: 'dance' }, { x: 2250, say: ['l2_b'] }, { x: 2900, say: ['ins_13'] }] },

  { name: 'forest', len: 6600, sticker: 3, collect: 'petal', ins: 'ins_14', joins: ['bilam'], arriveSay: 'l3_b',
    finSay: ['fr_06', 'l3_c', 'pr_17'],
    terrain: [{ x0: 0, x1: 700, top: G }, { x0: 700, x1: 950, top: G - 60 }, { x0: 950, x1: 1200, top: G - 120 }, { x0: 1200, x1: 1450, top: G - 60 }, { x0: 1450, x1: 2300, top: G },
              { x0: 2460, x1: 4300, top: G }, { x0: 4300, x1: 4600, top: G - 70 }, { x0: 4600, x1: 4850, top: G - 130 }, { x0: 4850, x1: 5100, top: G - 70 }, { x0: 5100, x1: 5300, top: G },
              { x0: 5460, x1: 6600, top: G }],
    friend: { kind: 'tree', x: 6200 },
    items: [{ x: 520, y: G - 45 }, { x: 1075, y: G - 215 }, { x: 2010, y: G - 375, high: 0 }, { x: 2680, y: G - 190 }, { x: 3760, y: G - 375, high: 1 }],
    stars: [{ x: 1560, g: 0 }, { x: 1645, g: 0 }, { x: 1730, g: 0 }, { x: 3300, g: 1 }, { x: 3385, g: 1 }, { x: 3470, g: 1 }],
    bonus: [].concat(arcRow(200, 560, G - 70, 0, 5), arcRow(740, 1180, G - 130, 60, 6), arcRow(1260, 1420, G - 130, 0, 3), arcRow(1800, 2300, G - 70, 0, 5), arcRow(2300, 2480, G - 90, 120, 4),
      arcRow(2560, 3150, G - 70, 0, 7), arcRow(2780, 3000, G - 250, 40, 4), arcRow(3560, 4250, G - 70, 0, 7), arcRow(4320, 5080, G - 210, 60, 9), arcRow(5280, 5480, G - 90, 120, 4), arcRow(5560, 6000, G - 70, 0, 6)),
    plats: [{ x: 1900, w: 230, top: G - 320, kind: 'branch' }, { x: 2600, w: 116, kind: 'rock' }, { x: 2900, w: 110, kind: 'stump' },
            { x: 3650, w: 230, top: G - 320, kind: 'branch' }, { x: 4020, w: 110, kind: 'stump' }, { x: 5600, w: 116, kind: 'rock' }, { x: 5800, w: 110, kind: 'stump' }],
    cues: [{ x: 0, say: ['l3_a', 'ins_14'] }, { x: 1400, say: ['ins_15'] }, { x: 3150, say: ['ins_15'] }] }
];
const REST_W = 1.25;        // picture is a bit wider than the part you stand on
function prepLevel(lv){
  lv.gaps = []; for (let i = 0; i + 1 < lv.terrain.length; i++) if (lv.terrain[i + 1].x0 > lv.terrain[i].x1) lv.gaps.push({ x: lv.terrain[i].x1, w: lv.terrain[i + 1].x0 - lv.terrain[i].x1 });
  lv.plats.forEach(pl => { const pb = PB[pl.kind];
    if (pl.kind === 'stone' || pl.kind === 'rock' || pl.kind === 'mushroom' || pl.kind === 'stump') { pl.dw = pl.w * REST_W; pl.h = pl.dw * pb[3] / pb[2]; pl.top = (pl.base || G) - pl.h * 0.94; pl.rest = true; }
    else if (pl.kind === 'cloud') { pl.dw = pl.w * 1.2; pl.h = pl.dw * pb[3] / pb[2]; }
    else if (pl.kind === 'branch') { pl.dw = pl.w * 1.15; pl.h = pl.dw * pb[3] / pb[2]; }
    else if (pl.kind === 'bigbubble') { pl.dw = pl.w + 36; pl.h = pl.dw * pb[3] / pb[2]; } });
}
LEVELS.forEach(prepLevel);

/* ---------- game state ---------- */
let mode = 'title', li = 0, L = null, p = null, camX = 0, T = 0;
let bonus = [], bonusN = 0;
let terr = [], items = [], stars = [], plats = [], followers = [], parts = [], hist = [], flowers = [];
let got = 0, meter = 0, fin = null, arrived = false, hintT = 0, maxX = 0, danceN = 0, said = {}, falls = 0, trail = false;

function paradeFor(i){
  let a = [];
  LEVELS.forEach((lv, k) => { if (save.done[k]) lv.joins.forEach(j => { if (!a.includes(j)) a.push(j); }); });
  return a.filter(k => !(LEVELS[i].without || []).includes(k));
}
function startLevel(i){
  li = i; L = LEVELS[i]; T = 0; mode = 'play';
  p = { x: 140, y: G, vx: 0, vy: 0, face: 1, on: true, run: 0, dance: 0, move: 0, wings: 0, bubble: 0, squash: 1 };
  items = L.items.map(o => ({ ...o, got: false, bob: rand(0, 6) }));
  stars = (L.stars || []).map(o => ({ ...o, y: G - 70, got: false, back: 0 }));
  bonus = (L.bonus || []).map(o => ({ ...o, got: false })); bonusN = 0;
  plats = L.plats.map(o => ({ ...o, dx: 0 })); terr = L.terrain;
  L.cues.forEach(c => c.done = false);
  followers = paradeFor(i).map(k => ({ kind: k }));
  parts = []; hist = []; flowers = []; got = 0; meter = 0; fin = null; arrived = false; hintT = 0; maxX = 0; said = {}; falls = 0; trail = false; camX = 0;
  L.friend.happy = false; L.friend.bloom = 0; L.friend.fly = 0;
  ['title', 'map', 'end'].forEach(s => $(s).classList.add('hide'));
  Voice.hush(); showButtons(); glow(null); startMusic(i);
}

/* ---------- helpers ---------- */
function groundAt(x){ let t = null; for (const g of terr) if (x > g.x0 - 8 && x < g.x1 + 8 && (t === null || g.top < t)) t = g.top; return t; }
function inGap(x){ return (L.gaps || []).find(g => x > g.x && x < g.x + g.w); }
function burst(x, y, n, cols, shape){ for (let i = 0; i < n; i++) parts.push({ x, y, vx: rand(-3, 3), vy: rand(-4.5, -0.5), life: 1, c: cols[i % cols.length], s: rand(5, 11), shape: shape || 'dot', g: 0.12 }); }
function target(){ const it = items.find(o => !o.got); return it ? { x: it.x, y: it.y } : { x: L.friend.x, y: G - 60 }; }
function curIns(){
  if (got < items.length) return L.ins;
  if (Math.abs(p.x - L.friend.x) > 190) return 'ins_24';
  return L.auto ? null : 'ins_06';
}
let nextHint = 480;
function progress(){ hintT = 0; nextHint = 480; trail = false; }

function pickup(it){
  it.got = true; got++; progress(); sfx.pick();
  burst(it.x, it.y, 12, RB, 'star');
  Voice.say('num_0' + got);
  if (it.col) Voice.say(COL[it.col][1]);
  if (got === items.length) { Voice.say('pr_12'); Voice.say('ins_24'); }
  else if (items.length - got === 1) Voice.say('ins_25');
  else praise();
}
function finish(){
  fin = { t: 0 }; L.friend.happy = true; progress(); glow(null); sfx.win();
  Voice.q.length = 0; L.finSay.forEach(id => Voice.say(id));
  L.joins.forEach(k => { if (!followers.find(f => f.kind === k) && k !== L.friend.kind) followers.push({ kind: k, enter: 0 }); });
  burst(L.friend.x, G - 120, 40, RB, 'star');
}
function endLevel(){
  save.done[li] = true; persist(); mode = 'end'; showButtons(); glow(null);
  $('sticker').innerHTML = '<img alt="" src="art/ui/sticker_' + L.sticker + '.png">'; $('end').classList.remove('hide');
  $('sticker').style.animation = 'none'; void $('sticker').offsetWidth; $('sticker').style.animation = '';
  if (followers.length + 1 >= 4) Voice.sayIfFree('pr_19');
}

/* ---------- update ---------- */
function update(dt){
  T += dt;
  // moving platforms
  plats.forEach(pl => { if (pl.move) { const m = pl.move, nx = m.a + (m.b - m.a) * (0.5 + 0.5 * Math.sin(T * m.sp + (m.ph || 0))); pl.dx = nx - pl.x; pl.x = nx; } });

  // cues: spoken instructions tied to places
  L.cues.forEach(c => { if (!c.done && p.x >= c.x) { c.done = true; c.say.forEach(id => Voice.say(id)); if (c.glow) glow(c.glow);
    if (c.show === 'dance' && !save.dance) { save.dance = true; persist(); showButtons(); } } });

  const dancing = p.dance > 0, locked = !!fin || p.bubble > 0;
  // walk
  let ax = 0; if (!locked && !dancing) { if (keys.left) ax -= 1; if (keys.right) ax += 1; }
  if (ptr.down && !locked && !dancing && !ax) {                       // steering with the mouse or a finger
    const w = ptrWorld(), dx = w.x - p.x;
    if (Math.abs(dx) > 34) ax = Math.sign(dx);
    if (p.on && Math.abs(dx) < 300 && w.y < p.y - 70) wantJump = true;                    // pointing above her: jump up there
    if (p.on && ax && groundAt(p.x + ax * 50) === null && Math.abs(dx) > 120) wantJump = true;   // a gap ahead: hop over it
    if (p.on && ax && terr.some(g => g.top < p.y - 10 && ((ax > 0 && g.x0 > p.x && g.x0 - p.x < 100) || (ax < 0 && g.x1 < p.x && p.x - g.x1 < 100)))) wantJump = true;   // a step ahead
  }
  p.vx = ax * 5.2; if (ax) p.face = ax;
  // jump
  if (wantJump && p.on && !locked && !dancing) { p.vy = -13.2; p.on = false; p.squash = 1.25; sfx.jump(); if ($('bj').classList.contains('glow')) glow(null); }
  // super jump
  if (wantSuper && !locked && p.on && meter >= 3) { p.vy = -21.5; p.on = false; p.wings = 1; meter = 0; p.dance = 0; sfx.sup(); Voice.say('ex_04'); $('bs').classList.remove('ready', 'glow'); }
  // dance
  if (wantDance && save.dance && p.on && !locked && !dancing) {
    p.dance = 110; p.move = danceN++ % Math.max(1, save.done.filter(Boolean).length); sfx.dance(); if ($('bd').classList.contains('glow')) glow(null);
    const near = Math.abs(p.x - L.friend.x) < 200 && got === items.length;
    if (near && !L.auto) finish();
    else if (L.danceZone && p.x > L.danceZone.a && p.x < L.danceZone.b) { for (let i = 0; i < 9; i++) flowers.push({ x: p.x + rand(-260, 260), c: RB[i % 6], t: 0 }); if (!said.dz) { said.dz = 1; Voice.say('pr_07'); } progress(); }
    else Voice.sayIfFree(Math.random() < 0.5 ? 'pr_07' : 'pr_08');
  }
  wantJump = wantDance = wantSuper = false;
  if (p.dance > 0) p.dance -= dt;

  // rescue bubble carries her back after a fall
  if (p.bubble > 0) { p.bubble -= dt; const ty = groundAt(p.x); const gy = ty === null ? G : ty; p.y += (gy - p.y) * 0.06 * dt; p.vy = 0; if (p.bubble <= 0 || Math.abs(gy - p.y) < 3) { p.bubble = 0; p.y = gy; p.on = true; sfx.pop(); } }
  else {
    const py = p.y;
    p.vy += (p.wings && p.vy > 0 ? 0.22 : 0.62) * dt; if (p.vy > 16) p.vy = 16;
    const px0 = p.x; p.x = clamp(p.x + p.vx * dt, 60, L.len - 60); p.y += p.vy * dt;
    for (const g of terr) if (p.y > g.top + 12 && p.x + 34 > g.x0 && p.x - 34 < g.x1) {        // the side of a raised block or the wall of a gap
      if (px0 + 34 <= g.x0 + 2) p.x = g.x0 - 34; else if (px0 - 34 >= g.x1 - 2) p.x = g.x1 + 34; }
    let landed = null, wasOn = p.on; p.on = false;
    if (p.vy >= 0) {
      for (const g of terr) if (p.x > g.x0 - 10 && p.x < g.x1 + 10 && py <= g.top + 1 && p.y >= g.top) { if (!landed || g.top < landed.top) landed = g; }
      for (const pl of plats) if (p.x > pl.x - 12 && p.x < pl.x + pl.w + 12 && py <= pl.top + 1 && p.y >= pl.top) { if (!landed || pl.top < landed.top) landed = pl; }
      for (const pd of (L.pads || [])) if (p.x > pd.x && p.x < pd.x + pd.w && py <= pd.top + 60 && p.y >= pd.top) {      // walking into Bobo bounces her too, no jump needed
        p.y = pd.top; p.vy = -19; p.squash = 0.7; sfx.boing(); if (!said.pad) { said.pad = 1; Voice.say('fr_04'); } burst(p.x, pd.top, 10, ['#fff', '#ffe14d'], 'star'); landed = 'pad'; }
      if (landed && landed !== 'pad') { p.y = landed.top; p.vy = 0; p.on = true; if (landed.dx) p.x += landed.dx; }
    }
    if (p.on && !wasOn) { p.squash = 0.8; if (p.wings) { p.wings = 0; Voice.sayIfFree('pr_09'); } }
    if (p.y > G + 260) {      // fell in a gap: never a loss, just a ride back
      if (!L.gaps.length) { p.y = G - 240; p.vy = 0; return; }
      const gs = L.gaps.slice().sort((a, b) => Math.abs(a.x + a.w / 2 - p.x) - Math.abs(b.x + b.w / 2 - p.x)), g = gs[0]; falls++;
      p.x = falls >= 2 ? g.x + g.w + 90 : g.x - 90; if (falls >= 2) falls = 0;
      p.y = G - 240; p.vy = 0; p.vx = 0; p.bubble = 160; Voice.say(Math.random() < 0.5 ? 'pr_10' : 'pr_11');
    }
  }
  p.squash += (1 - p.squash) * 0.18 * dt;
  if (p.on && p.vx) p.run += 0.3 * dt;

  // puddle
  if (L.splash && p.on && p.y === G && p.x > L.splash.x && p.x < L.splash.x + L.splash.w && p.vx) {
    if (Math.random() < 0.3) parts.push({ x: p.x + rand(-20, 20), y: G - 4, vx: rand(-2, 2), vy: rand(-5, -2), life: 0.8, c: '#8fd3ff', s: rand(4, 8), shape: 'dot', g: 0.25 });
    if (!said.splash) { said.splash = 1; sfx.splash(); Voice.say('fr_05'); }
  }

  // items and stars
  const cx = p.x, cy = p.y - 62;
  items.forEach(it => { it.bob += 0.05 * dt; if (!it.got && Math.hypot(it.x - cx, it.y - cy) < 72) pickup(it);
    if (!it.got && hintT > 2400 && it === items.find(o => !o.got)) { it.x += Math.sign(cx - it.x) * 1.4 * dt; it.y += Math.sign(cy - it.y) * 1.0 * dt; } });
  bonus.forEach(b => { if (!b.got && Math.hypot(b.x - cx, b.y - cy) < 60) { b.got = true; bonusN++; sfx.star(); burst(b.x, b.y, 6, ['#ffe14d', '#fff'], 'star'); if (bonusN % 10 === 0) praise(); } });
  stars.forEach(st => {
    if (!st.got && Math.hypot(st.x - cx, st.y - cy) < 66 && meter < 3) { st.got = true; st.back = 300; meter++; sfx.star(); burst(st.x, st.y, 8, ['#ffe14d', '#fff'], 'star');
      if (meter === 3) { Voice.say('ex_03'); if (!save.sup) { save.sup = true; persist(); showButtons(); Voice.say('ins_08'); } $('bs').classList.add('ready', 'glow'); } }
    else if (st.got) { const need = items.find(o => o.high === st.g && !o.got); if (need && meter < 3 && !p.wings) { st.back -= dt; if (st.back <= 0) st.got = false; } }
  });

  // friend
  const near = Math.abs(p.x - L.friend.x) < 170;
  if (!fin && got === items.length && near) {
    if (L.auto) finish();
    else if (!arrived) { arrived = true; if (L.arriveSay) Voice.say(L.arriveSay); Voice.say('ins_06'); glow('bd'); }
  }
  if (fin) {
    fin.t += dt; L.friend.fly = fin.t;
    if (L.friend.kind === 'tree') { L.friend.bloom = Math.min(1, fin.t / 150); p.x += (L.friend.x - 210 - p.x) * 0.05 * dt; p.face = 1; }   // step aside so the tree is seen
    if (p.on && fin.t % 46 < dt && fin.t < 230) { p.dance = 44; p.move = Math.floor(fin.t / 46) % 3; }
    if (Math.random() < 0.35) parts.push({ x: L.friend.x + rand(-260, 260), y: G - rand(260, 420), vx: rand(-1, 1), vy: rand(0.5, 2), life: 1.6, c: L.friend.kind === 'tree' ? '#ff9fd0' : RB[Math.floor(rand(0, 6))], s: rand(6, 11), shape: 'petal', g: 0.01 });
    if (fin.t > 260 && Voice.idle()) endLevel();
  }

  // help when she is stuck
  if (p.x > maxX + 220) { maxX = p.x; progress(); }
  if (!fin) { hintT += dt;
    const ins = curIns();
    if (ins && hintT >= nextHint && Voice.idle()) {
      nextHint = hintT + 840; Voice.say(ins); const tg = target();
      glow(ins === 'ins_06' ? 'bd' : (tg.y < p.y - 150 && Math.abs(tg.x - p.x) < 160) ? 'bj' : tg.x < p.x ? 'bl' : 'br'); }
    if (hintT > 1200) trail = true;
  }

  // parade and particles
  hist.push({ x: p.x, y: p.y, f: p.face }); if (hist.length > 900) hist.shift();
  followers.forEach(f => { if (f.enter !== undefined && f.enter < 1) f.enter += 0.012 * dt; });
  parts.forEach(q => { q.x += q.vx * dt; q.y += q.vy * dt; q.vy += q.g * dt; q.life -= 0.02 * dt; });
  parts = parts.filter(q => q.life > 0);
  flowers.forEach(f => f.t += dt);
  camX += (clamp(p.x - VW * 0.36, 0, Math.max(0, L.len - VW)) - camX) * 0.12 * dt;
}

/* ---------- drawing: small helpers ---------- */
function circ(x, y, r, c){ ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
function ell(x, y, rx, ry, c, rot){ ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot || 0, 0, 7); ctx.fill(); }
function rr(x, y, w, h, r, c){ ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); }
function face(x, y, s, happy, closed){
  ctx.fillStyle = '#3a2a3a';
  if (closed) { ctx.fillRect(x - s * 1.1, y, s * 0.8, 2); ctx.fillRect(x + s * 0.3, y, s * 0.8, 2); }
  else { circ(x - s * 0.7, y, s * 0.22, '#3a2a3a'); circ(x + s * 0.7, y, s * 0.22, '#3a2a3a'); circ(x - s * 0.64, y - s * 0.08, s * 0.08, '#fff'); circ(x + s * 0.76, y - s * 0.08, s * 0.08, '#fff'); }
  ctx.strokeStyle = '#3a2a3a'; ctx.lineWidth = Math.max(2, s * 0.14); ctx.lineCap = 'round'; ctx.beginPath();
  if (happy) ctx.arc(x, y + s * 0.35, s * 0.55, 0.15 * Math.PI, 0.85 * Math.PI); else ctx.arc(x, y + s * 1.1, s * 0.45, 1.2 * Math.PI, 1.8 * Math.PI);
  ctx.stroke();
}
function star5(x, y, r, c){ ctx.fillStyle = c; ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); } ctx.closePath(); ctx.fill(); }

/* ---------- drawing: friends (stand-ins; x,y = feet) ---------- */
const FH = { pitzi: 150, bird: 84, mamabird: 115, bobo: 135, shluli: 105, tree: 370, bilam: 168 };   // height of the whole picture frame, feet at the bottom
function drawFriend(kind, x, y, happy, o){
  o = o || {};
  const im = IMG[kind + (happy ? '_happy' : '_sad')];
  ctx.save(); ctx.translate(x, y);
  if (o.face === -1) ctx.scale(-1, 1);
  if (o.bounce) ctx.translate(0, -Math.abs(Math.sin(T * 0.2 + x)) * 14);
  if (im) { const h = FH[kind], w = h * im.width / im.height; ctx.drawImage(im, -w / 2, -h, w, h); ctx.restore(); return; }
  const flap = Math.sin(T * 0.4) * 0.5;
  if (kind === 'bird' || kind === 'mamabird') {
    const s = kind === 'bird' ? 1 : 1.5, c = kind === 'bird' ? '#ffd84d' : '#6fb8ff', c2 = kind === 'bird' ? '#ffb52e' : '#4a8fe0';
    ctx.scale(s, s);
    ell(-16, -26, 14, 8, c2, happy ? flap - 0.6 : 0.5); circ(0, -24, 22, c); ell(4, -20, 13, 8, c2, happy ? -flap + 0.3 : 0.3);
    ctx.fillStyle = '#ff8a3c'; ctx.beginPath(); ctx.moveTo(19, -28); ctx.lineTo(33, -23); ctx.lineTo(19, -19); ctx.fill();
    circ(9, -31, 4, '#3a2a3a'); circ(10, -32, 1.4, '#fff');
    ctx.strokeStyle = '#ff8a3c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-5, -3); ctx.lineTo(-5, 0); ctx.moveTo(6, -3); ctx.lineTo(6, 0); ctx.stroke();
  } else if (kind === 'pitzi') {
    ell(-26, -84, 12, 26, '#c9a6ff', -0.4); ell(26, -84, 12, 26, '#c9a6ff', 0.4); circ(0, -44, 44, '#dcc4ff'); circ(0, -30, 26, '#f3e9ff');
    circ(-34, -34, 9, '#ffb3d9'); circ(34, -34, 9, '#ffb3d9'); circ(0, -40, 6, '#ff7fb5'); face(0, -54, 16, happy);
    ell(-20, -2, 14, 7, '#c9a6ff'); ell(20, -2, 14, 7, '#c9a6ff');
  } else if (kind === 'bobo') {
    const z = said.pad && T % 60 < 20;
    ell(0, -30, 78, 32, '#b98152'); ell(-60, -24, 16, 9, '#b98152', -0.6); circ(62, -44, 30, '#c99564'); ell(46, -62, 11, 20, '#8a5a34', -0.5); ell(80, -62, 11, 20, '#8a5a34', 0.5);
    ell(70, -36, 15, 11, '#f0d5b5'); circ(76, -40, 6, '#3a2a3a'); face(60, -52, 11, true, !z);
    if (T % 200 < 90 && !z) { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.font = 'bold 22px sans-serif'; ctx.fillText('z', 96, -80 - (T % 200) * 0.2); }
  } else if (kind === 'shluli') {
    ell(0, -4, 80, 16, '#8fd3ff'); ell(-10, -7, 50, 8, '#c4e9ff'); face(0, -9, 12, true);
  } else if (kind === 'tree') {
    const b = o.bloom || 0;
    ctx.strokeStyle = '#9a6a45'; ctx.lineCap = 'round';
    [[-70, -250, 16], [70, -255, 16], [-30, -295, 13], [36, -300, 13], [-110, -200, 11], [112, -205, 11]].forEach(q => { ctx.lineWidth = q[2]; ctx.beginPath(); ctx.moveTo(0, -150); ctx.quadraticCurveTo(q[0] * 0.3, -210, q[0] + Math.sin(T * 0.05 + q[0]) * 4 * (0.3 + b), q[1]); ctx.stroke(); });
    rr(-30, -170, 60, 172, 20, '#b07a50'); ell(0, 0, 44, 10, '#9a6a45');
    face(0, -100, 17, happy);
    if (!happy) { circ(-26, -78, 7, 'rgba(255,150,170,.5)'); circ(26, -78, 7, 'rgba(255,150,170,.5)'); }
    [[-70, -250], [70, -255], [-30, -295], [36, -300], [-110, -200], [112, -205], [-52, -222], [54, -228], [0, -268], [-88, -232], [90, -236], [10, -230]].forEach((q, i) => {
      const k = clamp(b * 14 - i, 0, 1); if (k <= 0) { if (i < 6) circ(q[0], q[1], 5, '#a8d08a'); return; }
      const r = (15 + (i * 7) % 9) * k, c = ['#ff9fd0', '#ffb7dc', '#ff86c2'][i % 3];
      for (let a = 0; a < 5; a++) circ(q[0] + Math.cos(a * 1.257 + i) * r * 0.6, q[1] + Math.sin(a * 1.257 + i) * r * 0.6, r * 0.55, c);
      circ(q[0], q[1], r * 0.32, '#ffe14d'); });
  } else if (kind === 'bilam') {
    const sw = Math.sin(T * 0.3) * 6;
    rr(-44 + sw * 0.3, -44, 12, 44, 5, '#8a8078'); rr(30 - sw * 0.3, -44, 12, 44, 5, '#8a8078');
    ell(0, -62, 56, 32, '#a39a90'); ell(-8, -54, 34, 18, '#bdb5ab');
    [['#ff7f9f', -0.9], ['#ffd84d', -0.6], ['#6fb8ff', -0.3]].forEach((w, i) => { ctx.strokeStyle = w[0]; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(-6 - i * 4, -92, 22, 9, w[1] + flap * 0.5, 0, 7); ctx.stroke(); });
    ell(56, -98, 24, 30, '#a39a90', 0.3); ell(66, -84, 15, 13, '#e8dfd2'); ell(44, -134, 8, 24, '#8a8078', -0.25); ell(64, -136, 8, 24, '#8a8078', 0.2);
    face(58, -104, 10, true); ctx.strokeStyle = '#6d645c'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-54, -66); ctx.quadraticCurveTo(-76, -60, -70 + sw, -36); ctx.stroke();
  }
  ctx.restore();
}

/* ---------- drawing: Noga on the unicorn (x,y = hooves) ---------- */
function drawHero(){
  const W = 170, H = 175.5, k = W / 310;
  ctx.save(); ctx.translate(p.x, p.y);
  ell(0, 4, 54 * (p.on ? 1 : 0.6), 10, 'rgba(0,0,0,.14)');
  if (p.dance > 0) { const d = 110 - p.dance;
    if (p.move === 0) ctx.translate(0, -Math.abs(Math.sin(d * 0.17)) * 46);
    else if (p.move === 1) ctx.scale(Math.cos(d * 0.17), 1);
    else ctx.rotate(Math.sin(d * 0.22) * 0.24);
    if (Math.random() < 0.4) parts.push({ x: p.x + rand(-50, 50), y: p.y - rand(20, 150), vx: rand(-1, 1), vy: rand(-2, -0.5), life: 0.9, c: RB[Math.floor(rand(0, 6))], s: rand(5, 10), shape: 'star', g: 0.02 });
  }
  ctx.scale(p.face, 1); ctx.scale(1 / Math.sqrt(p.squash), p.squash);
  if (p.on && p.vx) ctx.translate(0, Math.sin(p.run * 2) * 2);
  const sw = Math.sin(p.run) * 0.42 * (p.vx ? 1 : 0), back = p.on ? sw : -0.38, front = p.on ? -sw : 0.34;
  const leg = (key, q, rot) => { const im = IMG[key]; if (!im) return; ctx.save(); ctx.translate(q.hx * k - W / 2, q.hy * k - H); ctx.rotate(rot); ctx.drawImage(im, (q.bx - q.hx) * k, (q.by - q.hy) * k, q.w * k, q.h * k); ctx.restore(); };
  const painted = IMG.heroBody && IMG.heroBack && IMG.heroFront;
  if (painted || IMG.heroFull) {
    // The three layers share the full sprite canvas. Rotate each leg at its hip.
    const scale = W / 911, top = -1000 * scale, left = -W / 2;
    const swingLeg = (im, hx, hy, angle) => {
      ctx.save();
      ctx.translate(left + hx * scale, top + hy * scale);
      ctx.rotate(angle);
      ctx.drawImage(im, -hx * scale, -hy * scale, W, -top);
      ctx.restore();
    };
    if (p.wings && IMG.heroWings) {       // Noga's pencil-drawn wings, behind the unicorn's shoulder
      const f = 0.72 + 0.28 * Math.sin(T * 0.5), ww = 215, wh = ww * 237 / 500;
      ctx.save(); ctx.translate(left + 470 * scale, top + 470 * scale); ctx.rotate(-0.12 - 0.12 * Math.sin(T * 0.5)); ctx.scale(1, f);
      ctx.drawImage(IMG.heroWings, -ww / 2, -wh * 0.7, ww, wh); ctx.restore(); }
    if (p.dance > 0 && IMG.heroHappy) ctx.drawImage(IMG.heroHappy, left, top, W, -top);
    else if (painted) {
      swingLeg(IMG.heroBack, 286, 690, back);
      swingLeg(IMG.heroFront, 583, 666, front);
      ctx.drawImage(IMG.heroBody, left, top, W, -top);
    } else ctx.drawImage(IMG.heroFull, left, top, W, -top);
  } else if (IMG.body) {
    leg('legA', { bx: 78, by: 228, w: 83, h: 92, hx: 119, hy: 250 }, back);
    leg('legB', { bx: 175, by: 228, w: 69, h: 92, hx: 210.5, hy: 250 }, front);
    ctx.drawImage(IMG.body, -W / 2, -H, W, 310 * k);
  } else { ell(0, -60, 60, 34, '#fff'); circ(56, -100, 26, '#fff'); rr(-40, -34, 12, 34, 5, '#fff'); rr(30, -34, 12, 34, 5, '#fff'); }
  // pencil-drawn wings for the super jump
  if (p.wings && !(IMG.heroWings && (painted || IMG.heroFull))) { const f = Math.sin(T * 0.5) * 0.5; ctx.lineWidth = 4; ctx.lineCap = 'round';
    RB.forEach((c, i) => { ctx.strokeStyle = c; ctx.beginPath(); ctx.ellipse(-22 - i * 5, -112 - i * 4, 40 - i * 3, 13, -0.9 + f - i * 0.08, 0, 7); ctx.stroke(); }); }
  if (!painted && !IMG.heroFull) {
  // Draw the rider only when the painted sprite is unavailable.
  ctx.save(); ctx.translate(-12, -96);
  rr(-4, 2, 13, 26, 6, '#f08fc0');                                   // leg, pink trousers
  rr(-15, -30, 30, 36, 12, '#2bb5a8');                               // teal sweatshirt
  ctx.fillStyle = '#ff7fb5'; ctx.beginPath(); ctx.arc(-4, -14, 4, 0, 7); ctx.arc(4, -14, 4, 0, 7); ctx.moveTo(-8, -12); ctx.lineTo(0, -4); ctx.lineTo(8, -12); ctx.fill();   // heart
  const arm = p.dance > 0 || !p.on ? -1.9 : -0.3; ctx.strokeStyle = '#2bb5a8'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(8, -20); ctx.lineTo(8 + Math.cos(arm) * 22, -20 + Math.sin(arm) * 22); ctx.stroke();
  circ(8 + Math.cos(arm) * 24, -20 + Math.sin(arm) * 24, 5, '#ffe0cc');
  ell(-9, -44, 15, 22, '#b07a4a', 0.25); circ(0, -48, 18, '#ffe0cc'); ctx.fillStyle = '#b07a4a'; ctx.beginPath(); ctx.arc(-1, -52, 18.5, Math.PI * 0.95, Math.PI * 1.95); ctx.fill();
  circ(7, -47, 2.8, '#3f8fe0'); circ(-2, -47, 2.8, '#3f8fe0'); ctx.strokeStyle = '#c0546a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(3, -42, 6, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.fillStyle = '#ffc928'; ctx.beginPath(); ctx.moveTo(-11, -64); ctx.lineTo(-11, -77); ctx.lineTo(-5, -70); ctx.lineTo(0, -80); ctx.lineTo(5, -70); ctx.lineTo(11, -77); ctx.lineTo(11, -64); ctx.fill();
  ctx.restore();
  }
  ctx.restore();
  if (p.bubble > 0) { ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(p.x, p.y - 85, 125, 0, 7); ctx.stroke(); circ(p.x, p.y - 85, 125, 'rgba(190,230,255,.3)'); ell(p.x - 50, p.y - 150, 26, 12, 'rgba(255,255,255,.6)', -0.6); }
}

/* ---------- drawing: things ---------- */
function drawItem(kind, x, y, col, t){
  const im = IMG['item_' + kind + (col ? '_' + col : '')];
  ctx.save(); ctx.translate(x, y + Math.sin(t) * 7);
  circ(0, 0, 40, 'rgba(255,255,255,.28)');
  if (im) { if (kind === 'feather') ctx.rotate(Math.sin(t * 0.6) * 0.18); ctx.drawImage(im, -44, -44, 88, 88); ctx.restore(); return; }
  if (kind === 'feather') { ctx.rotate(-0.6); RB.forEach((c, i) => ell(0, -24 + i * 9, 13 - Math.abs(i - 2.5) * 2.4, 8, c)); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -34); ctx.lineTo(0, 40); ctx.stroke(); }
  else if (kind === 'bubble') { circ(0, 0, 30, COL[col][0]); circ(0, 0, 30, 'rgba(255,255,255,.25)'); ell(-11, -12, 9, 5, 'rgba(255,255,255,.85)', -0.6); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 30, 0, 7); ctx.stroke(); }
  else if (kind === 'petal') { ctx.rotate(Math.sin(t * 0.7) * 0.4); ctx.fillStyle = '#ff8fc7'; ctx.beginPath(); ctx.moveTo(0, -30); ctx.bezierCurveTo(30, -12, 22, 26, 0, 30); ctx.bezierCurveTo(-22, 26, -30, -12, 0, -30); ctx.fill(); ell(-5, -4, 5, 12, '#ffc4e2', 0.2); }
  ctx.restore();
}
function drawPlat(pl){
  const x = pl.x, y = pl.top, w = pl.w;
  const pim = IMG[pl.kind === 'bigbubble' ? 'item_bigbubble' : 'prop_' + pl.kind], pb = PB[pl.kind];
  if (pim && pb && pl.dw) {
    const cx = x + w / 2, dw = pl.dw, dh = pl.h, sc = dw / pb[2];
    let dy = pl.rest ? y - dh * 0.06 : pl.kind === 'cloud' ? y - dh * 0.12 : pl.kind === 'branch' ? y - dh * 0.42 : y - 6;
    if (pl.kind === 'bigbubble') ctx.globalAlpha = 0.92;
    ctx.drawImage(pim, pb[0], pb[1], pb[2], pb[3], cx - dw / 2, dy, dw, dh); ctx.globalAlpha = 1; return; }
  if (pl.kind === 'stone') { rr(x - 6, y, w + 12, G - y + 6, 22, '#b9b3c4'); rr(x + 4, y + 5, w * 0.5, 9, 5, '#d6d1de'); }
  else if (pl.kind === 'rock') { rr(x - 6, y, w + 12, G - y + 6, 30, '#a59db5'); rr(x + 10, y + 7, w * 0.45, 10, 5, '#c9c3d6'); }
  else if (pl.kind === 'mushroom') { rr(x + w / 2 - 22, y + 20, 44, G - y - 16, 16, '#fff3e2'); ctx.fillStyle = '#ff6b6b'; ctx.beginPath(); ctx.ellipse(x + w / 2, y + 26, w / 2 + 14, 30, 0, Math.PI, 0); ctx.fill(); circ(x + w * 0.3, y + 12, 8, '#fff'); circ(x + w * 0.62, y + 8, 6, '#fff'); circ(x + w * 0.82, y + 17, 5, '#fff'); }
  else if (pl.kind === 'stump') { rr(x - 4, y, w + 8, G - y + 4, 12, '#a8744c'); ell(x + w / 2, y + 5, w / 2 + 4, 9, '#d9b48a'); ctx.strokeStyle = '#b98d62'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x + w / 2, y + 5, w / 4, 4, 0, 0, 7); ctx.stroke(); }
  else if (pl.kind === 'branch') { rr(x + w - 46, y - 150, 54, G - y + 150, 20, '#8f623f'); rr(x - 10, y, w + 10, 22, 11, '#a8744c'); for (let i = 0; i < 6; i++) circ(x + i * w / 5, y + 26 + (i % 2) * 8, 20, i % 2 ? '#7fcf7a' : '#63bd69'); circ(x + w - 20, y - 150, 80, '#63bd69'); circ(x + w + 30, y - 120, 60, '#7fcf7a'); }
  else if (pl.kind === 'cloud') { for (let i = 0; i < 4; i++) circ(x + 16 + i * (w - 32) / 3, y + 22 - (i % 2) * 6, 30, '#fff'); rr(x, y, w, 26, 13, '#fff'); }
  else if (pl.kind === 'bigbubble') { const cx = x + w / 2, r = w / 2 + 6; circ(cx, y + r - 8, r, 'rgba(160,220,255,.55)'); ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, y + r - 8, r, 0, 7); ctx.stroke(); ell(cx - 30, y + 18, 22, 10, 'rgba(255,255,255,.8)', -0.5);
    RB.forEach((c, i) => { ctx.strokeStyle = c; ctx.globalAlpha = 0.5; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, y + r - 8, r - 8 - i * 4, 0.9, 2.2); ctx.stroke(); }); ctx.globalAlpha = 1; }
}

/* ---------- drawing: worlds ---------- */
function hills(par, base, amp, c, f){ ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, VH); for (let sx = 0; sx <= VW + 40; sx += 40) { const wx = sx + camX * par; ctx.lineTo(sx, base - Math.sin(wx * f) * amp - Math.sin(wx * f * 2.3 + 1) * amp * 0.4); } ctx.lineTo(VW, VH); ctx.fill(); }
function drawWorld(){
  const n = L.name, im = IMG['bg_' + n];
  const sky = { garden: ['#bfe9ff', '#eafff0'], rainbow: ['#ffdff3', '#e6dcff'], forest: ['#cdeccf', '#f4ffd9'] }[n];
  const gr = ctx.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, sky[0]); gr.addColorStop(1, sky[1]); ctx.fillStyle = gr; ctx.fillRect(0, 0, VW, VH);
  if (im) { const h = VH, w = h * im.width / im.height, off = -((camX * 0.4) % w); for (let x = off; x < VW; x += w) ctx.drawImage(im, x, 0, w, h); }
  else if (n === 'garden') {
    ctx.lineWidth = 16; RB.forEach((c, i) => { ctx.strokeStyle = c; ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.arc(VW * 0.7 - camX * 0.05, G + 60, 430 - i * 16, Math.PI, 0); ctx.stroke(); }); ctx.globalAlpha = 1;
    circ(140 - camX * 0.02, 110, 56, '#fff3a8'); hills(0.15, 420, 50, '#c9efc4', 0.004); hills(0.3, 480, 36, '#a9e3a4', 0.006);
    for (let i = 0; i < 9; i++) { const x = ((i * 370 - camX * 0.2) % (VW + 300) + VW + 300) % (VW + 300) - 150; for (let j = 0; j < 4; j++) circ(x + j * 42, 120 + (i % 3) * 46 - (j % 2) * 12, 34, 'rgba(255,255,255,.85)'); }
  } else if (n === 'rainbow') {
    for (let i = 0; i < 12; i++) { const x = ((i * 310 - camX * (0.15 + (i % 3) * 0.08)) % (VW + 300) + VW + 300) % (VW + 300) - 150; for (let j = 0; j < 4; j++) circ(x + j * 46, 150 + (i % 4) * 90 - (j % 2) * 14, 40, 'rgba(255,255,255,.8)'); }
    for (let i = 0; i < 14; i++) star5(((i * 263 - camX * 0.1) % VW + VW) % VW, 60 + (i * 97) % 300, 7 + Math.sin(T * 0.06 + i) * 3, '#fff8c4');
  } else {
    hills(0.15, 400, 40, '#a8d9a0', 0.005);
    for (let i = 0; i < 16; i++) { const par = 0.25 + (i % 3) * 0.12, x = ((i * 260 - camX * par) % (VW + 300) + VW + 300) % (VW + 300) - 150, w = 44 + (i % 3) * 22; rr(x, -20, w, G + 20, 0, ['#7fae78', '#6f9f6c', '#8bbd82'][i % 3]); circ(x + w / 2, 40 + (i % 4) * 30, 120, 'rgba(120,190,110,.5)'); }
    for (let i = 0; i < 18; i++) circ(((i * 211 - camX * 0.5) % VW + VW) % VW + Math.sin(T * 0.03 + i) * 20, 180 + (i * 53) % 300 + Math.cos(T * 0.04 + i) * 14, 4 + Math.sin(T * 0.1 + i) * 2, 'rgba(255,250,170,.9)');
  }
  // ground: one block per terrain segment; the space between segments is a gap
  ctx.save(); ctx.translate(-camX, 0);
  if (n !== 'rainbow') (L.gaps || []).forEach(g => { const wg = ctx.createLinearGradient(0, G + 20, 0, VH); wg.addColorStop(0, '#7fd0ff'); wg.addColorStop(1, '#3d9be0'); ctx.fillStyle = wg; ctx.fillRect(g.x - 2, G + 28, g.w + 4, VH);
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let x = g.x + 6; x < g.x + g.w - 6; x += 10) ctx.lineTo(x, G + 40 + k * 22 + Math.sin(T * 0.07 + x * 0.1 + k) * 3); ctx.stroke(); } });
  terr.forEach(sg => { const x0 = sg.x0, x1 = sg.x1, top = sg.top;
    if (n === 'rainbow') { RB.forEach((c, i) => rr(x0, top + i * 12, x1 - x0, 14, i ? 0 : 7, c)); rr(x0, top + 72, x1 - x0, VH, 0, '#fff');
      for (let x = x0 + 40; x < x1; x += 90) circ(x, top + 84, 46, '#fff'); }
    else { const c = n === 'garden' ? ['#7fd58a', '#63bd72', '#c59a6d'] : ['#5fae68', '#4c9657', '#8f6d4b'];
      rr(x0, top, x1 - x0, VH, 0, c[2]); rr(x0, top - 4, x1 - x0, 40, 10, c[0]); rr(x0, top + 22, x1 - x0, 14, 0, c[1]);
      for (let x = Math.ceil(x0 / 130) * 130 + 40; x < x1 - 20; x += 130) { const k = (x * 7) % 5; ctx.fillStyle = '#4c9657'; ctx.fillRect(x - 1, top - 22, 3, 20); circ(x, top - 26, 8, RB[k]); circ(x, top - 26, 3.5, '#fff7c4'); } }
  });
  ctx.restore();
}

/* ---------- draw everything ---------- */
function draw(){
  ctx.setTransform(S, 0, 0, S, 0, 0);
  drawWorld();
  ctx.save(); ctx.translate(-camX, 0);
  if (L.splash) { /* puddle is the friend Shluli, drawn with the decos */ }
  flowers.forEach(f => { const k = Math.min(1, f.t / 20); ctx.fillStyle = '#4c9657'; ctx.fillRect(f.x - 2, G - 34 * k, 4, 34 * k); for (let a = 0; a < 5; a++) circ(f.x + Math.cos(a * 1.257) * 11 * k, G - 36 * k + Math.sin(a * 1.257) * 11 * k, 8 * k, f.c); circ(f.x, G - 36 * k, 6 * k, '#fff7c4'); });
  (L.decos || []).forEach(d => { if (d.kind === 'mamabird') { rr(d.x - 16, d.y, 32, G - d.y, 12, '#9a6a45'); circ(d.x - 30, d.y - 30, 70, '#7fcf7a'); circ(d.x + 40, d.y - 10, 60, '#63bd69'); rr(d.x - 90, d.y, 110, 14, 7, '#9a6a45'); drawFriend(d.kind, d.x - 50, d.y + 2, true); }
    else if (!(d.kind === 'pitzi' && followers.find(f => f.kind === 'pitzi'))) drawFriend(d.kind, d.x, d.y || G, d.happy, { bounce: d.kind === 'pitzi' }); });
  plats.forEach(drawPlat);
  // the friend she is helping
  const fr = L.friend, fy = G - (fr.on || 0);
  if (!(fin && fr.kind === 'bird')) { if (fr.kind !== 'pitzi' || !followers.find(f => f.kind === 'pitzi') ) drawFriend(fr.kind, fr.x, fy, fr.happy, { bloom: fr.bloom, bounce: fr.happy && fr.kind !== 'tree', face: fr.kind === 'tree' ? 1 : -1 }); }
  else { const a = fin.t * 0.05, r = Math.min(150, fin.t * 1.4); drawFriend('bird', fr.x + Math.sin(a) * r, fy - 60 - (1 - Math.cos(a)) * r * 0.7, true, { face: Math.cos(a) > 0 ? 1 : -1 }); }
  if (!fr.happy && got < items.length) {      // thought bubble: what the friend needs
    const bx = fr.x - 30, by = fy - (FH[fr.kind] || 100) - 70; circ(bx, by, 46, 'rgba(255,255,255,.95)'); circ(bx + 30, by + 46, 10, 'rgba(255,255,255,.95)'); circ(bx + 42, by + 64, 6, 'rgba(255,255,255,.95)');
    ctx.save(); ctx.translate(bx, by); ctx.scale(0.75, 0.75); drawItem(L.collect, 0, 0, (items.find(o => !o.got) || {}).col, 0); ctx.restore(); }
  if (fin && L.name === 'rainbow') items.forEach((it, i) => drawItem('bubble', fr.x + Math.cos(fin.t * 0.06 + i * 1.57) * 150, G - 110 + Math.sin(fin.t * 0.06 + i * 1.57) * 80, it.col, 0));
  stars.forEach(st => { if (!st.got && IMG.item_star) { const bob = Math.sin(T * 0.08 + st.x) * 5; circ(st.x, st.y + bob, 34, 'rgba(255,240,150,.35)'); ctx.drawImage(IMG.item_star, st.x - 38, st.y + bob - 38, 76, 76); } else if (!st.got) { circ(st.x, st.y, 30, 'rgba(255,240,150,.35)'); star5(st.x, st.y + Math.sin(T * 0.08 + st.x) * 5, 22, '#ffd028'); star5(st.x - 4, st.y - 4 + Math.sin(T * 0.08 + st.x) * 5, 8, '#fff6b8'); } });
  bonus.forEach((b, i) => { if (!b.got && b.x > camX - 60 && b.x < camX + VW + 60) { const yy = b.y + Math.sin(T * 0.09 + i) * 4; circ(b.x, yy, 24, 'rgba(255,240,150,.4)'); star5(b.x, yy, 17, '#ffd028'); star5(b.x - 3, yy - 3, 6, '#fff6b8'); } });
  items.forEach(it => { if (!it.got) drawItem(L.collect, it.x, it.y, it.col, it.bob); });
  // sparkle trail to the next thing
  if (trail && !fin) { const tg = target(), dx = tg.x - p.x, dy = tg.y - (p.y - 62), n = Math.floor(Math.hypot(dx, dy) / 60);
    for (let i = 1; i < n; i++) { const k = i / n; star5(p.x + dx * k, p.y - 62 + dy * k - Math.sin(k * Math.PI) * 60, 7 + Math.sin(T * 0.2 - i) * 4, '#fff'); } }
  // parade
  const circle = fin && L.friend.kind === 'tree';
  followers.forEach((f, i) => {
    let h = hist[Math.max(0, hist.length - 1 - 26 * (i + 1))] || { x: p.x - 90 * (i + 1), y: G, f: 1 }, x = h.x, y = h.y, fc = h.f;
    if (circle) { const a = fin.t * 0.04 + i * 2.1, k = Math.min(1, fin.t / 60); x += (L.friend.x + Math.cos(a) * 230 - x) * k; y = G; fc = Math.sin(a) > 0 ? -1 : 1; }
    if (f.enter !== undefined && f.enter < 1) x = L.friend.x + 500 - (L.friend.x + 500 - x) * f.enter;
    if (f.kind === 'bird') y -= 150 + Math.sin(T * 0.1) * 14;
    drawFriend(f.kind, x, y, true, { face: fc, bounce: p.dance > 0 || !!fin });
  });
  drawHero();
  parts.forEach(q => { ctx.globalAlpha = clamp(q.life, 0, 1); if (q.shape === 'star') star5(q.x, q.y, q.s, q.c); else if (q.shape === 'petal') ell(q.x, q.y, q.s, q.s * 0.6, q.c, q.x * 0.05 + T * 0.05); else circ(q.x, q.y, q.s, q.c); }); ctx.globalAlpha = 1;
  ctx.restore();
  // top bar: what she is collecting, and the star meter
  rr(18, 14, 34 + items.length * 62, 76, 38, 'rgba(255,255,255,.75)');
  items.forEach((it, i) => { ctx.save(); ctx.translate(66 + i * 62, 52); ctx.scale(0.72, 0.72); ctx.globalAlpha = i < got ? 1 : 0.28; drawItem(L.collect, 0, 0, it.col, 0); ctx.restore(); });
  if (bonus.length) { rr(18, 98, 120, 54, 27, 'rgba(255,255,255,.75)'); star5(50, 125, 19, '#ffd028'); ctx.fillStyle = '#b0409a'; ctx.font = 'bold 30px "Comic Sans MS", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(bonusN, 80, 127); }
  if (stars.length) { rr(VW - 232, 14, 214, 76, 38, 'rgba(255,255,255,.75)'); for (let i = 0; i < 3; i++) star5(VW - 185 + i * 60, 52, 24 + (meter >= 3 ? Math.sin(T * 0.2 + i) * 3 : 0), i < meter ? '#ffd028' : 'rgba(170,170,190,.45)'); }
}

/* ---------- loop ---------- */
let lastT = 0;
function frame(now){
  const dt = Math.min(2.5, (now - lastT) / 16.67 || 1); lastT = now;
  if (mode === 'play') { update(dt); draw(); } else if (mode === 'end' && L) draw();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ---------- title, map, end screens ---------- */
const MAP_POS = [[13, 25], [37.5, 24], [62, 25], [86, 27], [86, 70], [60.5, 69], [36.5, 70], [12, 72]];   // the eight stops on art/ui/map.jpg, in percent
function showMap(){
  mode = 'map'; showButtons(); glow(null); Voice.hush();
  ['title', 'end'].forEach(s => $(s).classList.add('hide'));
  const box = $('stops'); box.innerHTML = '';
  const nextI = LEVELS.findIndex((lv, i) => !save.done[i]);
  MAP_POS.forEach((pos, i) => {
    const lv = LEVELS[i], open = !!lv && (i === 0 || save.done[i - 1] || save.done[i]), b = document.createElement('button');
    b.className = 'stop' + (lv && save.done[i] ? ' done' : '') + (open ? '' : ' locked') + (i === nextI ? ' next' : '');
    b.style.left = pos[0] + '%'; b.style.top = pos[1] + '%';
    b.innerHTML = !open ? '\u{1F512}' : save.done[i] ? '<img alt="" src="art/ui/sticker_' + lv.sticker + '.png">' : '\u25B6';
    if (open && !save.done[i]) b.classList.add('play');
    b.setAttribute('aria-label', 'level ' + (i + 1));
    if (open) b.addEventListener('click', () => { ac(); startLevel(i); });
    box.appendChild(b);
  });
  $('map').classList.remove('hide');
}
$('play').addEventListener('click', () => { ac(); const first = !save.done.some(Boolean); if (first) startLevel(0); else showMap(); Voice.say(first ? 'ex_01' : 'ex_02'); });
$('toMap').addEventListener('click', showMap);
$('next').addEventListener('click', () => { if (li + 1 < LEVELS.length) startLevel(li + 1); else showMap(); });
showButtons();

/* for testing in the browser console */
window.__g = {
  get s(){ return { mode, li, x: p && Math.round(p.x), y: p && Math.round(p.y), on: p && p.on, got, total: items.length, meter, fin: !!fin, followers: followers.map(f => f.kind), said: Voice.last, save }; },
  keys, start: startLevel, P: () => p, LV: () => L, gnd: groundAt, bonus: () => bonus, plats: () => plats, jump(){ wantJump = true; }, dance(){ wantDance = true; }, sup(){ wantSuper = true; },
  step(n){ for (let i = 0; i < n; i++) update(1); draw(); }, tp(x){ p.x = x; p.y = G; p.vy = 0; }, items: () => items, reset(){ localStorage.removeItem(SAVE_KEY); }
};
