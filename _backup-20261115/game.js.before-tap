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
const SAVE_KEY = 'nogaUnicorn2';       // new key = everybody starts from zero (progress reset, 14 Nov)
try { localStorage.removeItem('nogaUnicorn1'); } catch (e) {}
let save = { done: [false, false, false, false, false, false, false, false, false, false, false], dance: false, sup: false };
try { const o = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
  if (o && Array.isArray(o.done)) { save.done = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => !!o.done[i]); save.sup = !!o.sup; if (Array.isArray(o.party)) save.party = o.party.filter(k => typeof k === 'string').slice(0, 2); } } catch (e) {}
save.dance = true;                    // the Dance button is there from the very first level (owner request, 14 Nov)
function persist(){ try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {} }

/* ---------- pictures (Ghost's art; the canvas drawings below are only the fallback if a file is missing) ---------- */
const IMG = {};
function load(key, src, onload){ const im = new Image(); im.onload = () => { IMG[key] = im; if (onload) onload(); }; im.onerror = () => {}; im.src = src; }
load('body', 'art/standin/uni_body2.png'); load('legA', 'art/standin/uni_legA.png'); load('legB', 'art/standin/uni_legB.png');
load('map10', 'art/ui/map10.jpg', refreshMapArtwork);
load('map11', 'art/ui/map11.jpg', refreshMapArtwork);
load('heroBody', 'art/hero/hero_body.png'); load('heroBack', 'art/hero/hero_leg_back.png'); load('heroFront', 'art/hero/hero_leg_front.png');
load('heroFull', 'art/hero/hero_full.png'); load('heroHappy', 'art/hero/hero_happy.png'); load('heroWings', 'art/hero/hero_wings.png');
load('donkeyBody', 'art/hero/donkey_body.png'); load('donkeyBack', 'art/hero/donkey_leg_back.png'); load('donkeyFront', 'art/hero/donkey_leg_front.png');
load('donkeyStand', 'art/standin/donkey_standin.png');      // stand-in: Bil'am (Ghost's picture) with Noga cut from the unicorn picture, until donkey_*.png arrive
load('donkeyFull','art/hero/donkey_full.png'); load('donkeyHappy', 'art/hero/donkey_happy.png'); load('donkeyWings', 'art/hero/donkey_wings.png');      // round 3: Noga rides Bil'am (old unicorn set stays as fallback)
['a', 'b', 'happy'].forEach(k => load('ufly_' + k, 'art/friends/unicorn_fly_' + k + '.png'));      // the unicorn is now the little flying helper above Noga
['pitzi', 'bird', 'mamabird', 'bobo', 'dad', 'shluli', 'tree', 'bilam', 'koko', 'armon', 'anana', 'rhino', 'luna', 'solomon', 'riddletree', 'princess1', 'princess2', 'grandpa', 'cloudunicorn', 'sheba', 'camel', 'moon'].forEach(k => { load(k + '_sad', 'art/friends/' + k + '_sad.png'); load(k + '_happy', 'art/friends/' + k + '_happy.png'); });
['feather', 'petal', 'star', 'bigbubble', 'bubble_red', 'bubble_blue', 'bubble_green', 'bubble_yellow', 'steam', 'plank', 'carrot', 'ribbon', 'spark', 'flower_1', 'flower_2', 'flower_3', 'flower_4', 'flower_5', 'water_drop', 'flour', 'eggs', 'honey', 'teacup', 'carrot_bunch', 'gift_plate', 'challah', 'candles', 'gem', 'moonstar', 'numbubble', 'chick', 'shootingstar', 'wheat', 'milk', 'loaf'].forEach(k => load('item_' + k, 'art/items/item_' + k + '.png'));
['stone', 'rock', 'mushroom', 'stump', 'branch', 'cloud', 'oven', 'oven_lit', 'bowl', 'bowl_dough', 'candle_unlit', 'candle_lit', 'nest', 'tree_roots', 'teapot', 'mud', 'haybale', 'gate', 'plank_bridge', 'trampoline', 'trampoline_squash', 'cotton_candy_platform', 'shadow_stage', 'party_firework', 'table', 'well', 'well_full', 'sandmound', 'palm', 'windswirl', 'lantern_red', 'lantern_blue', 'lantern_green', 'lantern_yellow', 'lantern_red_lit', 'lantern_blue_lit', 'lantern_green_lit', 'lantern_yellow_lit'].forEach(k => load('prop_' + k, 'art/props/prop_' + k + '.png'));
['apple', 'ball', 'leaf'].forEach(k => load('riddle_' + k, 'art/items/riddle_' + k + '.png'));
['garden', 'rainbow', 'forest', 'sky', 'farm', 'shabbat', 'night', 'castle', 'oasis', 'moon'].forEach(k => load('bg_' + k, 'art/bg/bg_' + k + '.jpg'));
load('bg_party', 'art/bg/bg_party.jpg'); load('bg_party_fallback', 'art/bg/bg_castle.jpg'); load('bg_finale', 'art/bg/bg_finale.jpg');
['firework_pink', 'firework_gold', 'firework_blue', 'heart_pink', 'heart_red', 'heart_gold', 'confetti', 'bunting', 'dancefloor', 'discoball'].forEach(k => load('prop_' + k, 'art/props/prop_' + k + '.png'));       // stage 11 (the party) uses the castle backdrop until there is a picture of its own
['vegetable_bed', 'mill', 'farmtable', 'slide', 'slide_end', 'bush_a', 'bush_b', 'bush_c', 'thought'].forEach(k => load('prop_' + k, 'art/props/prop_' + k + '.png'));      // round 7: farm bread, rainbow slide, forest hiding bushes, wish bubble
['pitzi', 'shluli', 'luna'].forEach(k => load('peek_' + k, 'art/friends/peek_' + k + '.png'));
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
/* recorded music: music/stage1.mp3 ... stage10.mp3 and title.mp3 loop quietly under the voice (the little synth tune is gone: it was the annoying beeping) */
let musicOn = true; try { musicOn = localStorage.getItem('nogaMusic') !== '0'; } catch (e) {}
const MUSIC_ALIAS = {};      // stand-ins if a track is missing (all 11 stages, the title and the finale now have their own)
const Song = {
  a: null, name: '',
  play(name){ if (this.name === name) return; this.stop(); this.name = name;
    const a = new Audio('music/' + name + '.mp3'); a.loop = true; a.volume = 0; this.a = a;
    a.onerror = () => { if (MUSIC_ALIAS[name] && a.src.indexOf(MUSIC_ALIAS[name]) < 0) { a.src = 'music/' + MUSIC_ALIAS[name] + '.mp3'; this.kick(); } };
    this.kick(); },
  kick(){ const a = this.a; if (a && a.paused && soundOn && musicOn) { const p = a.play(); if (p && p.catch) p.catch(() => {}); } },
  stop(){ if (this.a) { try { this.a.pause(); } catch (e) {} this.a = null; } this.name = ''; },
  /* quiet gaps (15 Nov critique): the loop breathes, 34 s at normal level then 12 s nearly silent, so the stage is not a dense constant bed; the voice ducks it harder */
  quiet(){ const t = (Date.now() - (this.t0 || (this.t0 = Date.now()))) / 1000 % 46; return t >= 34; },
  tick(){ const a = this.a; if (!a) return; const want = (!soundOn || !musicOn) ? 0 : Voice.busy ? 0.03 : this.quiet() ? 0.04 : 0.15;
    a.volume = Math.max(0, Math.min(1, a.volume + (want - a.volume) * 0.15));
    if (want === 0 && a.volume < 0.01) { if (!a.paused) a.pause(); } else this.kick(); }
};
setInterval(() => Song.tick(), 100);
['pointerdown', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, () => Song.kick(), { passive: true }));      // browsers only allow sound after a tap: try again on every tap
function startMusic(i){ Song.play('stage' + (i + 1)); }

/* ---------- voice: recorded clip if present, otherwise the browser reads the line ---------- */
let LANG = 'he';                      // spoken language: 'he' (default, the owner needs Hebrew) or 'en'
try { const q = new URLSearchParams(location.search).get('lang'); const sv = localStorage.getItem('nogaLang');
  LANG = (q === 'en' || q === 'he') ? q : (sv === 'en' || sv === 'he') ? sv : 'he'; } catch (e) {}
const lineText = id => (LANG === 'he' ? window.LINES_HE : window.LINES)[id];
const voiceDir = () => LANG === 'he' ? 'voice/he/' : 'voice/full/';
const TITLES = { he: 'נוגה והחד-קרן', en: 'Noga and the Unicorn' };
function applyLang(){ document.documentElement.lang = LANG; const h = document.querySelector('#title h1'); if (h) h.textContent = TITLES[LANG]; document.title = TITLES[LANG]; }
const VOICE_ALIAS = { pr_05: 'pr_01', pr_12: 'pr_03' };   // two Hebrew clips (pr_05, pr_12) are still pending review: play a generic praise clip meanwhile
const Voice = {
  q: [], busy: false, files: false, cur: null, timer: null, gapT: null, last: '', tok: 0,
  init(){ this.files = false; const a = new Audio(); a.oncanplaythrough = () => { Voice.files = true; }; a.onerror = () => {}; a.src = voiceDir() + 'ins_01.mp3'; },
  low: id => /^(pr_|num_|col_|ex_)/.test(id),                       // praise and number words: nice to have, never worth a queue
  say(id){ if (!lineText(id)) return; if (this.q.includes(id) || (this.busy && this.last === id)) return;
    const low = this.low(id);
    if (low && this.q.length >= 2) return;
    if (!low) this.q = this.q.filter(x => !Voice.low(x));           // a real instruction pushes out praise that has not started yet
    if (this.q.length > 3) return;
    this.q.push(id); this.pump(); },
  sayIfFree(id){ if (!this.busy && !this.q.length) this.say(id); },
  idle(){ return !this.busy && !this.q.length; },
  stopNow(){ try { if (this.cur) { this.cur.onended = this.cur.onerror = this.cur.onloadedmetadata = null; this.cur.pause(); } window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} this.cur = null; },
  pump(){
    if (this.busy || !this.q.length) return;
    const id = this.q.shift(); this.last = id;
    if (!soundOn) return this.pump();
    this.busy = true; const tok = ++this.tok;                      // every clip has its own token: a late callback of an old clip can never end or start anything
    const done = () => { if (tok !== Voice.tok || !Voice.busy) return; Voice.tok++; Voice.busy = false; clearTimeout(Voice.timer); Voice.stopNow(); clearTimeout(Voice.gapT); Voice.gapT = setTimeout(() => Voice.pump(), 450); };
    const text = lineText(id);
    const tts = () => {
      if (tok !== Voice.tok) return;
      try { const sy = window.speechSynthesis; if (!sy) return done();
        sy.cancel(); clearTimeout(Voice.timer); Voice.timer = setTimeout(done, 2500 + text.length * 130);
        const u = new SpeechSynthesisUtterance(text), vs = sy.getVoices() || [];
        const he = LANG === 'he';
        const pool = vs.filter(v => (he ? /^he/i : /^en/i).test(v.lang));
        u.voice = (he ? pool.find(v => /carmit|female|google/i.test(v.name)) : pool.find(v => /zira|jenny|aria|samantha|female|google us/i.test(v.name))) || pool[0] || null;
        u.lang = he ? 'he-IL' : 'en-US'; u.rate = 0.9; u.pitch = id.startsWith('fr_') ? 1.6 : 1.2; u.onend = done; u.onerror = done; sy.speak(u);
      } catch (e) { done(); }
    };
    if (this.files) {
      this.timer = setTimeout(done, 9000);                        // only if the clip never loads
      const play = (file, retry) => { const a = new Audio(voiceDir() + file + '.mp3'); this.cur = a; a.onended = () => { if (tok === Voice.tok) done(); };
        a.onloadedmetadata = () => { if (tok === Voice.tok && isFinite(a.duration)) { clearTimeout(Voice.timer); Voice.timer = setTimeout(done, a.duration * 1000 + 1500); } };   // wait for the real length of the clip
        let missed = false;
        const miss = () => { if (missed || tok !== Voice.tok) return; missed = true; if (retry && VOICE_ALIAS[id] && LANG === 'he') play(VOICE_ALIAS[id], false); else tts(); };
        a.onerror = miss; const pr = a.play(); if (pr && pr.catch) pr.catch(miss); };
      play(id, true); }
    else tts();
  },
  hush(){ this.q.length = 0; this.tok++; clearTimeout(this.timer); clearTimeout(this.gapT); this.stopNow(); this.busy = false; }
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
function ptrWorld(){ const r = cv.getBoundingClientRect(); return { x: (ptr.cx - r.left) / r.width * VW + camX, y: (ptr.cy - r.top) / r.height * VH + camY }; }
cv.addEventListener('pointerdown', e => {
  if (mode !== 'play' || !p) return; ac(); ptr.cx = e.clientX; ptr.cy = e.clientY; const w = ptrWorld();
  if (save.dance && Math.abs(w.x - p.x) < 90 && w.y > p.y - 200 && w.y < p.y + 12) { wantDance = true; return; }
  ptr.down = true; ptr.id = e.pointerId; try { cv.setPointerCapture(e.pointerId); } catch (x) {} });
cv.addEventListener('pointermove', e => { if (ptr.down) { ptr.cx = e.clientX; ptr.cy = e.clientY; } });
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => cv.addEventListener(ev, () => { ptr.down = false; }));
cv.addEventListener('contextmenu', e => e.preventDefault());
cv.addEventListener('pointerdown', e => { if (!fx) return; ptr.cx = e.clientX; ptr.cy = e.clientY; const w = ptrWorld(); fwBurst(w.x, Math.min(w.y, G - 160)); });      // the love party: tap anywhere for a firework
/* parent corner: hold the sound button for 1.5 s to switch Hebrew / English */
let langHold = null, langDone = false;
$('snd').addEventListener('pointerdown', () => { langDone = false; clearTimeout(langHold); langHold = setTimeout(() => { langDone = true;
  LANG = LANG === 'he' ? 'en' : 'he'; try { localStorage.setItem('nogaLang', LANG); } catch (e) {} applyLang(); Voice.hush(); Voice.init(); Voice.say('ex_01'); }, 1500); });
['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => $('snd').addEventListener(ev, () => clearTimeout(langHold)));
$('snd').addEventListener('click', () => { if (langDone) { langDone = false; return; } soundOn = !soundOn; $('snd').innerHTML = soundOn ? '&#128266;' : '&#128263;'; if (!soundOn) Voice.hush(); });
function setMus(){ $('mus').innerHTML = musicOn ? '&#127925;' : '&#127925;<i></i>'; $('mus').classList.toggle('off', !musicOn); }
$('mus').addEventListener('click', () => { musicOn = !musicOn; try { localStorage.setItem('nogaMusic', musicOn ? '1' : '0'); } catch (e) {} setMus(); Song.tick(); });
setMus();
function glow(which){ ['bl', 'br', 'bj', 'bd'].forEach(b => $(b).classList.toggle('glow', b === which)); }
function showButtons(){
  const play = mode === 'play';
  ['bl', 'br', 'bj'].forEach(b => $(b).classList.toggle('hide', !play));
  $('bd').classList.toggle('hide', !((play && save.dance) || mode === 'finale'));
  $('bs').classList.toggle('hide', !(play && save.sup));
  $('snd').classList.toggle('hide', false); $('mus').classList.toggle('hide', false);
}

/* ---------- levels ---------- */
const COL = { red: ['#ff5f6e', 'col_01'], blue: ['#5fa8ff', 'col_02'], green: ['#5fd68a', 'col_03'], yellow: ['#ffd84d', 'col_04'], pink: ['#ff8fc7', 'col_05'] };
/* terrain = the ground, as segments {x0, x1, top}. Space between segments is a gap (a stream or a hole in the rainbow).
   plats = things to stand on. Resting kinds (stone, rock, mushroom, stump) stand on `base` (default ground G) and get their
   height from the picture; floating kinds (cloud, branch, bigbubble) keep the `top` given here. */
/* a row of bonus stars along an arc: x0..x1, base height y, bump h (0 = straight line), n stars */
const arcRow = (x0, x1, y, h, n) => Array.from({ length: n }, (_, i) => { const k = n > 1 ? i / (n - 1) : 0; return { x: Math.round(x0 + (x1 - x0) * k), y: Math.round(y - Math.sin(k * Math.PI) * h) }; });
const LEVELS = [
  { name: 'garden', need: 5, len: 5600, sticker: 1, collect: 'feather', ins: 'ins_11', joins: ['bird', 'pitzi', 'luna'],
    finSay: ['fr_01', 'l1_c', 'pr_02'], meets: [{ kind: 'pitzi', x: 4400, do: 'dance' }],
    terrain: [{ x0: 0, x1: 700, top: G }, { x0: 700, x1: 900, top: G, top1: G - 120 }, { x0: 900, x1: 1100, top: G - 120 }, { x0: 1100, x1: 1300, top: G - 120, top1: G }, { x0: 1300, x1: 1750, top: G },
              { x0: 1910, x1: 2550, top: G }, { x0: 2550, x1: 2800, top: G - 70 }, { x0: 2800, x1: 3050, top: G - 140 }, { x0: 3050, x1: 3300, top: G - 70 }, { x0: 3300, x1: 3780, top: G },
              { x0: 4060, x1: 4950, top: G }, { x0: 4950, x1: 5150, top: G - 60 }, { x0: 5150, x1: 5420, top: G - 80 }, { x0: 5420, x1: 5600, top: G }],
    friend: { kind: 'bird', x: 5290, on: 80 },
    items: [{ x: 560, y: G - 45 }, { x: 1000, y: G - 215 }, { x: 3480, y: G - 345 }],
    bonus: [].concat(arcRow(260, 520, G - 70, 0, 3), arcRow(780, 1220, G - 120, 60, 7), arcRow(1400, 1650, G - 70, 0, 4), arcRow(1700, 1960, G - 80, 130, 5),
      arcRow(2080, 2420, G - 80, 170, 6), arcRow(2600, 3250, G - 215, 50, 8), arcRow(3560, 3760, G - 75, 0, 3), arcRow(3790, 4050, G - 90, 150, 5),
      arcRow(4150, 4650, G - 70, 90, 7), arcRow(4980, 5250, G - 135, 40, 5),
      arcRow(2900, 2960, G - 315, 0, 2), arcRow(3080, 3140, G - 425, 0, 2), arcRow(3260, 3320, G - 535, 0, 2)),
    plats: [{ x: 1795, w: 90, kind: 'stone' }, { x: 2150, w: 100, kind: 'rock' }, { x: 2330, w: 150, kind: 'mushroom' }, { x: 3830, w: 90, kind: 'stone' }, { x: 3940, w: 90, kind: 'stone' },
            { x: 4250, w: 110, kind: 'stump' }, { x: 4500, w: 100, kind: 'rock' }, { x: 4700, w: 90, kind: 'stone' },
            { x: 2860, w: 130, top: G - 250, kind: 'cloud' }, { x: 3040, w: 130, top: G - 360, kind: 'cloud' }, { x: 3220, w: 130, top: G - 470, kind: 'cloud' }],
    pads: [{ x: 3350, w: 170, top: G - 58 }], splash: { x: 1440, w: 150 },
    decos: [{ kind: 'pitzi', x: 300, happy: true }, { kind: 'shluli', x: 1515, happy: true }, { kind: 'dad', x: 470, happy: true }, { kind: 'luna', x: 600, happy: true },{ kind: 'mamabird', x: 5510, y: G - 250, happy: true }],
    cues: [{ x: 0, say: ['l1_a', 'ins_11', 'ins_10', 'num_05', 'ins_01'], glow: 'br' },{ x: 1330, say: ['ins_06'], glow: 'bd' }, { x: 1560, say: ['ins_02'], glow: 'bj' }, { x: 2100, say: ['ins_05'], glow: 'bj' },
           { x: 2650, say: ['l1_b'] }, { x: 3200, say: ['ins_15'] }] },

  { name: 'rainbow', need: 7, len: 6200, sticker: 2, collect: 'bubble', ins: 'ins_12', joins: ['pitzi'], without: ['pitzi'],
    finSay: ['fr_03', 'l2_c', 'pr_02'], meets: [{ kind: 'shluli', x: 4400, do: 'jump' }],
    terrain: [{ x0: 0, x1: 1100, top: G }, { x0: 1400, x1: 2000, top: G }, { x0: 2000, x1: 2250, top: G - 60 }, { x0: 2250, x1: 2500, top: G - 120 }, { x0: 2500, x1: 2750, top: G - 60 }, { x0: 2750, x1: 3050, top: G },
              { x0: 3350, x1: 4000, top: G }, { x0: 4250, x1: 4600, top: G }, { x0: 4600, x1: 4760, top: G - 70 }, { x0: 4760, x1: 4900, top: G - 125 }, { x0: 4900, x1: 5000, top: G - 177 },
              { x0: 5000, x1: 5188, top: G - 177, top1: G - 90, slide: true }, { x0: 5188, x1: 5353, top: G - 90, top1: G - 42, slide: true }, { x0: 5353, x1: 5420, top: G - 42, top1: G, slide: true }, { x0: 5000, x1: 5420, top: G, slide: true, base: true }, { x0: 5420, x1: 6200, top: G }],
    friend: { kind: 'pitzi', x: 5900 }, slide: { a: 5000, b: 5420 }, props: [{ k: 'slide', x: 5166, w: 432 }],
    items: [{ x: 620, y: G - 130, col: 'red' }, { x: 1250, y: G - 185, col: 'blue' }, { x: 2375, y: G - 200, col: 'green' }, { x: 4975, y: G - 220, col: 'yellow' }],
    bonus: [].concat(arcRow(240, 520, G - 70, 0, 4), arcRow(780, 1000, G - 150, 40, 4), arcRow(1480, 1900, G - 70, 0, 6), arcRow(1520, 2000, G - 250, 40, 5), arcRow(2060, 2740, G - 190, 60, 8),
      arcRow(2800, 3000, G - 70, 0, 3), arcRow(3360, 3980, G - 70, 0, 6), arcRow(3500, 3900, G - 220, 40, 4), arcRow(4020, 4240, G - 150, 80, 4), arcRow(4300, 4580, G - 70, 0, 4), arcRow(4640, 5300, G - 195, 60, 7), arcRow(5420, 5800, G - 70, 0, 5),
      arcRow(2080, 2140, G - 405, 0, 2), arcRow(2260, 2320, G - 495, 0, 2), arcRow(2440, 2500, G - 585, 0, 2)),
    plats: [{ x: 690, w: 130, top: G - 75, kind: 'cloud' },
            { x: 1080, w: 170, top: G, kind: 'bigbubble', move: { a: 1080, b: 1250, sp: 0.012 } }, { x: 3030, w: 170, top: G, kind: 'bigbubble', move: { a: 3030, b: 3200, sp: 0.012, ph: 2 } },
            { x: 1540, w: 120, top: G - 90, kind: 'cloud' }, { x: 1720, w: 120, top: G - 170, kind: 'cloud' }, { x: 1880, w: 120, top: G - 250, kind: 'cloud' },
            { x: 2060, w: 120, top: G - 340, kind: 'cloud' }, { x: 2240, w: 120, top: G - 430, kind: 'cloud' }, { x: 2420, w: 120, top: G - 520, kind: 'cloud' },
            { x: 4060, w: 130, top: G - 75, kind: 'cloud' },
            { x: 3500, w: 120, top: G - 100, kind: 'cloud' }, { x: 3690, w: 120, top: G - 190, kind: 'cloud' }, { x: 3860, w: 120, top: G - 110, kind: 'cloud' },
            { x: 5420, w: 130, top: G - 90, kind: 'cloud' }, { x: 5600, w: 130, top: G - 180, kind: 'cloud' }],
    stations: [{ id: 'bubbles', kind: 'count', x: 3700, pts: [[3420, G - 100], [3540, G - 210], [3740, G - 290], [3900, G - 190], [3980, G - 110]], hint: 'x_count', near: 650, say: ['pr_13'] }],
    danceZone: { a: 1450, b: 2000 },
    cues: [{ x: 0, say: ['fr_02', 'l2_a', 'ins_12', 'ins_10', 'num_07'] }, { x: 940, say: ['ins_13'], glow: 'bj' }, { x: 1500, say: ['ins_06'], glow: 'bd', show: 'dance' }, { x: 2250, say: ['l2_b'] }, { x: 2900, say: ['ins_13'] }] },

  { name: 'forest', need: 10, len: 6600, sticker: 3, collect: 'petal', ins: 'ins_14', joins: ['bilam'], arriveSay: 'l3_b', carry: true,
    finSay: ['fr_06', 'l3_c', 'pr_17'], meets: [{ kind: 'luna', x: 4200, do: 'dance' }],
    terrain: [{ x0: 0, x1: 700, top: G }, { x0: 700, x1: 950, top: G, top1: G - 120 }, { x0: 950, x1: 1200, top: G - 120 }, { x0: 1200, x1: 1450, top: G - 120, top1: G }, { x0: 1450, x1: 2300, top: G },
              { x0: 2460, x1: 4300, top: G }, { x0: 4300, x1: 4600, top: G - 70 }, { x0: 4600, x1: 4850, top: G - 130 }, { x0: 4850, x1: 5100, top: G - 70 }, { x0: 5100, x1: 5300, top: G },
              { x0: 5460, x1: 6600, top: G }],
    friend: { kind: 'tree', x: 6200 },
    items: [{ x: 520, y: G - 45 }, { x: 1075, y: G - 215 }, { x: 2010, y: G - 375, high: 0 }, { x: 2680, y: G - 190 }, { x: 3760, y: G - 375, high: 1 },
            { x: 3040, y: G - 50, kind: 'flower_1', grp: 'flower', to: 'pot', say: 'x_tea_flowers' }, { x: 3180, y: G - 50, kind: 'flower_2', grp: 'flower', to: 'pot', say: 'x_tea_flowers' }, { x: 3400, y: G - 50, kind: 'flower_3', grp: 'flower', to: 'pot', say: 'x_tea_flowers' },
            { x: 2540, y: G - 50, kind: 'water_drop', to: 'pot', say: 'x_tea_water' },
            { x: 0, y: 0, kind: 'teapot', to: 'fire', hid: 'pot', hidden: true }, { x: 0, y: 0, kind: 'teacup', to: 'serve', hid: 'cup', hidden: true }],
    stars: [{ x: 1560, g: 0 }, { x: 1645, g: 0 }, { x: 1730, g: 0 }, { x: 3300, g: 1 }, { x: 3385, g: 1 }, { x: 3470, g: 1 }],
    bonus: [].concat(arcRow(200, 560, G - 70, 0, 5), arcRow(740, 1180, G - 130, 60, 6), arcRow(1260, 1420, G - 130, 0, 3), arcRow(1800, 2300, G - 70, 0, 5), arcRow(2300, 2480, G - 90, 120, 4),
      arcRow(2560, 3150, G - 70, 0, 7), arcRow(2780, 3000, G - 250, 40, 4), arcRow(3560, 4250, G - 70, 0, 7), arcRow(4320, 5080, G - 210, 60, 9), arcRow(5280, 5480, G - 90, 120, 4), arcRow(5560, 6000, G - 70, 0, 6),
      arcRow(2230, 2330, G - 500, 0, 3), arcRow(2470, 2570, G - 610, 0, 3), arcRow(3980, 4080, G - 500, 0, 3), arcRow(4220, 4320, G - 610, 0, 3)),
    plats: [{ x: 1900, w: 230, top: G - 320, kind: 'branch' }, { x: 2600, w: 116, kind: 'rock' }, { x: 2900, w: 110, kind: 'stump' },
            { x: 3650, w: 230, top: G - 320, kind: 'branch' },
            { x: 2180, w: 200, top: G - 430, kind: 'branch' }, { x: 2420, w: 200, top: G - 540, kind: 'branch' }, { x: 3930, w: 200, top: G - 430, kind: 'branch' }, { x: 4170, w: 200, top: G - 540, kind: 'branch' },{ x: 4020, w: 110, kind: 'stump' }, { x: 5600, w: 116, kind: 'rock' }, { x: 5800, w: 110, kind: 'stump' }],
    stations: [{ id: 'pot', kind: 'pot', x: 3560, need: 4, r: 160, spawn: 'pot', hint: 'x_tea_pot', near: 420, say: ['x_tea_fire'] },
               { id: 'fire', kind: 'fire', x: 3830, need: 1, r: 170, spawn: 'cup', say: ['x_tea_boil', 'fr_14'] }, { id: 'serve', kind: 'table', x: 6000, need: 1, r: 220, show: 'teacup', wish: 'teacup', wy: 440, say: ['x_tea_thanks', 'pr_15'] },
               { id: 'hide', kind: 'seek', what: 'peek', mounds: ['bush_a', 'bush_b', 'bush_c'], peeks: ['pitzi', 'shluli', 'luna'], x: 1650, pts: [1650, 2790, 3850], hint: 'x_hide', near: 600, say: ['pr_13'] },
               { id: 'rain', kind: 'rain', x: 5725, zone: [5500, 5950], need: 6, hint: 'x_rain', near: 700, say: ['pr_13'] }],
    cues: [{ x: 0, say: ['l3_a', 'ins_14', 'ins_10', 'num_10'] }, { x: 1400, say: ['ins_15'] }, { x: 2450, say: ['x_tea_start'] }, { x: 3150, say: ['ins_15'] }] },

  /* ---- levels 4-8 (15 Nov 2026): things she picks up are USED. `to` = the station an item goes to, `stations` = the places that use them (design/STAGES-V2.md) ---- */
  { name: 'sky', need: 5, len: 5600, sticker: 4, collect: 'steam', ins: 'ins_16', joins: ['cloudunicorn'], carry: true, floaty: true, recover: true, drafts: [{ x: 2050, w: 180, h: 480 }],
    finSay: ['fr_08', 'l4_c', 'pr_02'],
    terrain: [{ x0: 0, x1: 900, top: G }, { x0: 900, x1: 1150, top: G - 60 }, { x0: 1150, x1: 1400, top: G - 120 }, { x0: 1400, x1: 1650, top: G - 60 }, { x0: 1650, x1: 2500, top: G },
              { x0: 2650, x1: 3700, top: G }, { x0: 3700, x1: 3950, top: G, top1: G - 130 }, { x0: 3950, x1: 4200, top: G - 130 }, { x0: 4200, x1: 4450, top: G - 130, top1: G }, { x0: 4450, x1: 5600, top: G }],
    friend: { kind: 'koko', x: 5350 },
    items: [{ x: 1275, y: G - 215, to: 'cloud' }, { x: 2262, y: G - 560, to: 'cloud' }, { x: 4075, y: G - 225, to: 'cloud' }],
    stations: [{ id: 'cloud', kind: 'cloud', x: 4850, need: 3, r: 230, say: ['l4_b'] }],
    bonus: [].concat(arcRow(260, 700, G - 90, 40, 5), arcRow(1700, 2400, G - 80, 60, 7), arcRow(3000, 3600, G - 100, 40, 6), arcRow(4500, 4800, G - 80, 30, 4), arcRow(1900, 2000, G - 250, 0, 2), arcRow(2900, 3000, G - 330, 0, 2)),
    plats: [{ x: 2520, w: 110, top: G - 70, kind: 'cloud' }, { x: 2900, w: 130, top: G - 150, kind: 'cloud' }, { x: 1900, w: 130, top: G - 130, kind: 'cloud' }, { x: 2200, w: 130, top: G - 470, kind: 'cloud' }],
    props: [{ k: 'teapot', x: 640, w: 150 }],
    decos: [{ kind: 'grandpa', x: 500, happy: true }],
    cues: [{ x: 0, say: ['fr_07', 'l4_a', 'ins_16', 'ins_10', 'num_05'] }, { x: 1950, say: ['x_draft', 'ins_15'] }] },

  { name: 'farm', need: 6, len: 7400, sticker: 5, collect: 'plank', ins: 'ins_17', joins: ['armon', 'anana'], carry: true,
    finSay: ['fr_11', 'l5_c', 'pr_15'],
    terrain: [{ x0: 0, x1: 800, top: G }, { x0: 940, x1: 1700, top: G }, { x0: 1700, x1: 1950, top: G, top1: G - 130 }, { x0: 1950, x1: 2200, top: G - 130 }, { x0: 2200, x1: 2450, top: G - 130, top1: G }, { x0: 2450, x1: 3200, top: G },
              { x0: 3360, x1: 4300, top: G }, { x0: 4300, x1: 4550, top: G - 60 }, { x0: 4550, x1: 7400, top: G }],
    friend: { kind: 'armon', x: 7230 },
    items: [{ x: 600, y: G - 50, to: 'bridge' }, { x: 1500, y: G - 190, to: 'bridge' }, { x: 2075, y: G - 225, to: 'bridge' }, { x: 3600, y: G - 190, to: 'bridge' }, { x: 4425, y: G - 160, to: 'bridge' },
            { x: 3000, y: G - 50, kind: 'carrot_bunch', to: 'horses' }, { x: 4050, y: G - 50, kind: 'carrot_bunch', to: 'horses' },
            { x: 5750, y: G - 50, kind: 'milk', to: 'fbowl', say: null }, { x: 5880, y: G - 50, kind: 'wheat', grp: 'wheat', to: 'mill', say: null }, { x: 6000, y: G - 50, kind: 'wheat', grp: 'wheat', to: 'mill', say: null },
            { x: 0, y: 0, kind: 'flour', to: 'fbowl', hid: 'flourm', hidden: true, nochip: true, say: null }, { x: 0, y: 0, kind: 'loaf', to: 'ftable', hid: 'loaf', hidden: true, nochip: true, say: null }],
    stations: [{ id: 'chicks', kind: 'seek', what: 'chick', mound: 'haybale', x: 1500, pts: [1500, 2550, 3050, 4050], hint: 'x_seek_a', near: 600, say: ['pr_13'] },
               { id: 'bridge', kind: 'bridge', x: 5000, need: 5, r: 230, say: ['l5_b', 'pr_12'] }, { id: 'horses', kind: 'horses', x: 5400, need: 2, r: 230, say: ['pr_16'], wish: 'carrot_bunch', wy: 310 },
               { id: 'mill', kind: 'mill', x: 6100, need: 2, r: 160, spawn: 'flourm', say: ['pr_13'] }, { id: 'fbowl', kind: 'bowl', x: 6330, need: 2, r: 150, arms: 'foven' },
               { id: 'foven', kind: 'oven', x: 6570, need: 1, auto: true, spawn: 'loaf', say: ['pr_14'] }, { id: 'ftable', kind: 'table', x: 6880, need: 1, r: 220, img: 'prop_farmtable', show: 'loaf', wish: 'loaf', wy: 310, say: ['pr_15'] }],
    mud: [{ x: 1000, w: 300 }, { x: 3400, w: 300 }, { x: 4700, w: 420 }],
    bonus: [].concat(arcRow(200, 700, G - 80, 30, 6), arcRow(1000, 1600, G - 80, 50, 6), arcRow(2500, 3100, G - 80, 40, 6), arcRow(3400, 4200, G - 90, 50, 7), arcRow(4600, 4900, G - 160, 30, 3), arcRow(5700, 6900, G - 90, 40, 8)),
    plats: [{ x: 805, w: 110, kind: 'stone' }, { x: 3210, w: 110, kind: 'stone' }, { x: 1300, w: 110, kind: 'stump' }, { x: 3800, w: 110, kind: 'rock' }],
    props: [{ k: 'haybale', x: 2800, w: 130 }, { k: 'gate', x: 7340, w: 160 }],
    decos: [{ kind: 'anana', x: 5650, hap: 'horses' }, { kind: 'grandpa', x: 7130, happy: true }],
    cues: [{ x: 0, say: ['l5_a', 'fr_10', 'ins_17', 'ins_10', 'num_06'] }, { x: 700, say: ['ins_03'] }, { x: 3200, say: ['ins_15'] }] },

  { name: 'shabbat', need: 8, len: 6000, sticker: 6, collect: 'flour', ins: 'ins_18', joins: ['rhino', 'solomon', 'dad'], carry: true, noIns: true,
    finSay: ['fr_11', 'pr_17'],
    terrain: [{ x0: 0, x1: 1000, top: G }, { x0: 1000, x1: 1250, top: G - 60 }, { x0: 1250, x1: 1500, top: G - 110 }, { x0: 1500, x1: 1750, top: G - 60 }, { x0: 1750, x1: 2700, top: G },
              { x0: 2850, x1: 3900, top: G }, { x0: 4040, x1: 6000, top: G }],
    friend: { kind: 'rhino', x: 5800 },
    items: [{ x: 600, y: G - 50, kind: 'flour', to: 'bowl' }, { x: 1375, y: G - 205, kind: 'eggs', to: 'bowl' }, { x: 3150, y: G - 185, kind: 'honey', to: 'bowl' },
            { x: 1900, y: G - 50, kind: 'carrot', to: 'bilam' }, { x: 4300, y: G - 50, kind: 'carrot', to: 'bilam' }, { x: 4560, y: G - 170, kind: 'carrot', to: 'bilam' },
            { x: 0, y: 0, kind: 'challah', to: 'table', hid: 'challah', hidden: true }],
    stations: [{ id: 'bowl', kind: 'bowl', x: 3550, need: 3, r: 150 },
               { id: 'oven', kind: 'oven', x: 3800, need: 1, auto: true, spawn: 'challah', say: ['fr_13'] },
               { id: 'bilam', kind: 'bilam', x: 4800, need: 3, r: 200, wish: 'carrot', wy: 310, say: ['fr_12', 'pr_16'] },
               { id: 'candles', kind: 'candles', x: 5150, need: 1, dance: true, hint: 'l6_b', near: 420, say: ['l6_c'] },
               { id: 'table', kind: 'table', x: 5450, need: 1, r: 220, say: ['pr_14'] }],
    bonus: [].concat(arcRow(240, 900, G - 80, 40, 6), arcRow(1800, 2600, G - 80, 60, 7), arcRow(2900, 3800, G - 90, 40, 7), arcRow(4100, 5000, G - 80, 30, 7), arcRow(1500, 1750, G - 160, 0, 3)),
    plats: [{ x: 2720, w: 110, kind: 'stone' }, { x: 3910, w: 110, kind: 'stone' }, { x: 2200, w: 120, kind: 'rock' }],
    cues: [{ x: 0, say: ['l6_a', 'ins_10', 'num_08'] }, { x: 1700, say: ['ins_18'] }, { x: 4950, say: [], glow: 'bd' }] },

  { name: 'night', need: 8, len: 6400, sticker: 7, collect: 'ribbon', ins: 'ins_20', joins: ['riddletree'], carry: true, lights: true,
    finSay: ['l7_c', 'pr_08'],
    terrain: [{ x0: 0, x1: 1100, top: G }, { x0: 1100, x1: 1350, top: G, top1: G - 130 }, { x0: 1350, x1: 1600, top: G - 130 }, { x0: 1600, x1: 1850, top: G - 130, top1: G }, { x0: 1850, x1: 2800, top: G },
              { x0: 2960, x1: 4200, top: G }, { x0: 4340, x1: 6400, top: G }],
    friend: { kind: 'riddletree', x: 6050 },
    items: [{ x: 800, y: G - 50 }, { x: 1475, y: G - 220 }, { x: 3500, y: G - 190 }, { x: 4800, y: G - 50 }],
    stations: [{ id: 'lanterns', kind: 'simon', x: 3750, hint: 'x_simon', say: ['pr_13'] }, { id: 'riddle', kind: 'riddle', x: 5350, need: 1, say: ['pr_08'] }],
    bonus: [].concat(arcRow(240, 1000, G - 80, 40, 7), arcRow(1900, 2700, G - 80, 60, 7), arcRow(3000, 4100, G - 90, 50, 8), arcRow(4400, 5200, G - 80, 30, 6), arcRow(5500, 5900, G - 80, 20, 4)),
    plats: [{ x: 2830, w: 110, kind: 'stone' }, { x: 4210, w: 110, kind: 'stone' }, { x: 3300, w: 110, kind: 'stump' }],
    cues: [{ x: 0, say: ['l7_a', 'ins_20', 'ins_10', 'num_08'] }, { x: 2800, say: ['ins_15'] }] },

  { name: 'castle', need: 12, len: 8300, sticker: 8, collect: 'flower', ins: 'ins_23', joins: ['princess1', 'princess2'], arriveSay: 'l8_b', carry: true, fireworks: true,
    finSay: ['fr_16', 'l8_c', 'pr_20'],
    terrain: [{ x0: 0, x1: 1500, top: G }, { x0: 1500, x1: 1750, top: G - 60 }, { x0: 1750, x1: 2000, top: G - 110 }, { x0: 2000, x1: 2250, top: G - 60 }, { x0: 2250, x1: 3500, top: G },
              { x0: 3500, x1: 3750, top: G - 70 }, { x0: 3750, x1: 4000, top: G - 130 }, { x0: 4000, x1: 4250, top: G - 70 }, { x0: 4250, x1: 8300, top: G }],
    friend: { kind: 'princess1', x: 7900 },
    items: [{ x: 500, y: G - 60, col: '1' }, { x: 1000, y: G - 60, col: '2' }, { x: 1625, y: G - 140, col: '3' }, { x: 1875, y: G - 190, col: '4' }, { x: 2600, y: G - 60, col: '5' },
            { x: 3100, y: G - 60, col: '1' }, { x: 3875, y: G - 210, col: '2' }, { x: 4600, y: G - 60, col: '3' }, { x: 5000, y: G - 60, col: '4' }, { x: 5400, y: G - 60, col: '5' },
            { x: 5800, y: G - 60, kind: 'feather', grp: 'gift', to: 'g0' }, { x: 5960, y: G - 60, kind: 'bubble', col: 'red', grp: 'gift', to: 'g1' }, { x: 6120, y: G - 60, kind: 'petal', grp: 'gift', to: 'g2' },
            { x: 6280, y: G - 60, kind: 'steam', grp: 'gift', to: 'g3' }, { x: 6440, y: G - 60, kind: 'plank', grp: 'gift', to: 'g4' }, { x: 6600, y: G - 60, kind: 'challah', grp: 'gift', to: 'g5' },
            { x: 6760, y: G - 60, kind: 'ribbon', grp: 'gift', to: 'g6' }, { x: 6920, y: G - 60, kind: 'flower', col: '1', grp: 'gift', to: 'g7' }],
    stations: [0, 1, 2, 3, 4, 5, 6, 7].map(i => ({ id: 'g' + i, kind: 'plate', x: 7160 + i * 90, need: 1, r: 46, icon: ['feather', 'bubble_red', 'petal', 'steam', 'plank', 'challah', 'ribbon', 'flower_1'][i] })).concat([{ id: 'beat', kind: 'rhythm', x: 4700, r: 330, need: 6, hint: 'x_rhythm', near: 520, say: ['pr_14'] }]),
    bonus: [].concat(arcRow(250, 1400, G - 80, 40, 9), arcRow(2300, 3400, G - 80, 50, 9), arcRow(4300, 5600, G - 80, 40, 12)),
    plats: [],
    decos: [{ kind: 'princess2', x: 8050, happy: true }],
    cues: [{ x: 0, say: ['l8_a', 'ins_23', 'ins_10', 'num_10'] }, { x: 5600, say: ['fr_16'] }] },
  /* ---- stage 9 (round 4): the Queen of Sheba's oasis. Water drops to the well, gems in the sand, a wind draft up to a high drop ---- */
  { name: 'oasis', need: 13, len: 7500, sticker: 9, collect: 'water_drop', ins: 'x_find_water', joins: ['sheba', 'camel'], carry: true, drafts: [{ x: 3100, w: 180, h: 590 }],
    finSay: ['l9_c', 'l9_d', 'pr_17'],
    terrain: [{ x0: 0, x1: 900, top: G }, { x0: 900, x1: 1150, top: G - 60 }, { x0: 1150, x1: 1400, top: G - 110 }, { x0: 1400, x1: 1650, top: G - 60 }, { x0: 1650, x1: 2500, top: G },
              { x0: 2660, x1: 3600, top: G }, { x0: 3600, x1: 3850, top: G - 70 }, { x0: 3850, x1: 4100, top: G - 130 }, { x0: 4100, x1: 4350, top: G - 70 }, { x0: 4350, x1: 5300, top: G },
              { x0: 5580, x1: 7500, top: G }],
    friend: { kind: 'sheba', x: 6900 },
    items: [{ x: 600, y: G - 50, to: 'well' }, { x: 1275, y: G - 200, to: 'well' }, { x: 3200, y: G - 560, to: 'well' },
            { x: 4800, y: G - 50, kind: 'flour', to: 'bowl', say: null }, { x: 5100, y: G - 50, kind: 'eggs', to: 'bowl', say: null }, { x: 5720, y: G - 50, kind: 'honey', to: 'bowl', say: null },
            { x: 0, y: 0, kind: 'challah', to: 'table', hid: 'challah', hidden: true }],
    stations: [{ id: 'gems', kind: 'seek', what: 'gem', mound: 'sandmound', x: 1700, pts: [1700, 2150, 2950, 5000], hint: 'x_seek_b', near: 600, say: ['pr_13'] },
               { id: 'well', kind: 'well', x: 4600, need: 3, r: 220, hint: 'x_well', say: ['l9_b'] },
               { id: 'bowl', kind: 'bowl', x: 5900, need: 3, r: 150 }, { id: 'oven', kind: 'oven', x: 6150, need: 1, auto: true, spawn: 'challah', say: ['fr_13'] }, { id: 'table', kind: 'table', x: 6500, need: 1, r: 200, wish: 'challah', wy: 310, say: ['pr_16'] }],
    bonus: [].concat(arcRow(240, 820, G - 80, 40, 6), arcRow(930, 1370, G - 190, 50, 6), arcRow(1450, 1900, G - 80, 40, 5), arcRow(2000, 2450, G - 90, 70, 5), arcRow(2760, 3050, G - 80, 30, 4),
      arcRow(3140, 3240, G - 300, 0, 3), arcRow(3140, 3240, G - 440, 0, 2), arcRow(3620, 4300, G - 200, 40, 7), arcRow(4400, 5200, G - 80, 40, 7), arcRow(5340, 5540, G - 120, 60, 3), arcRow(5700, 6300, G - 80, 30, 6), arcRow(6600, 6800, G - 80, 30, 3)),
    plats: [{ x: 3270, w: 130, top: G - 470, kind: 'cloud' }, { x: 5320, w: 150, top: G - 50, kind: 'cloud', move: { a: 5310, b: 5420, sp: 0.012 } }],
    props: [300, 1950, 3000, 4950, 6800, 7300].map(x => ({ k: 'palm', x, w: 300 })),
    decos: [{ kind: 'camel', x: 7080, hap: 'well' }],
    cues: [{ x: 0, say: ['l9_a', 'x_find_water', 'ins_10'] }, { x: 2950, say: ['x_draft', 'ins_15'] }] },

  /* ---- stage 10 (round 4): the Moon Mountain, the last stage. Count the cloud stairs, wind up to a star, light the lanterns, dance in rhythm with the Moon ---- */
  { name: 'moon', need: 15, len: 8200, sticker: 10, collect: 'moonstar', ins: 'x_find_moon', joins: ['moon'], drafts: [{ x: 3500, w: 180, h: 590 }],
    finSay: ['l10_c', 'l10_d', 'pr_20'],
    terrain: [{ x0: 0, x1: 2900, top: G }, { x0: 3050, x1: 3700, top: G }, { x0: 3700, x1: 3950, top: G - 70 }, { x0: 3950, x1: 4200, top: G - 130 }, { x0: 4200, x1: 4450, top: G - 70 },
              { x0: 4450, x1: 5000, top: G }, { x0: 5160, x1: 5800, top: G }, { x0: 5800, x1: 8200, top: G }],
    friend: { kind: 'moon', x: 7500 },
    items: [{ x: 700, y: G - 60 }, { x: 2545, y: G - 640 }, { x: 3590, y: G - 560 }, { x: 4075, y: G - 220 }, { x: 5260, y: G - 60 }],
    stations: [{ id: 'steps', kind: 'count', x: 1930, pts: [[1565, G - 190], [1765, G - 280], [1965, G - 370], [2165, G - 460], [2365, G - 550]], hint: 'x_count', near: 700, say: ['pr_13'] },
               { id: 'lanterns', kind: 'simon', x: 4720, hint: 'x_simon', say: ['pr_13'] },
               { id: 'moondance', kind: 'rhythm', finish: true, x: 6900, r: 380, need: 6, hint: 'x_rhythm', near: 700 }],
    bonus: [].concat(arcRow(240, 1300, G - 80, 40, 8), arcRow(1480, 2350, G - 200, 40, 5), arcRow(2720, 2880, G - 100, 50, 3), arcRow(3100, 3450, G - 80, 30, 4), arcRow(3720, 4400, G - 190, 50, 6),
      arcRow(4500, 4950, G - 80, 30, 4), arcRow(5030, 5130, G - 130, 60, 2), arcRow(5300, 5780, G - 80, 30, 4), arcRow(5900, 6700, G - 80, 40, 7)),
    plats: [0, 1, 2, 3, 4].map(i => ({ x: 1500 + i * 200, w: 130, top: G - 90 * (i + 1), kind: 'cloud' })).concat([{ x: 2480, w: 130, top: G - 540, kind: 'cloud' }]),
    cues: [{ x: 0, say: ['l10_a', 'x_find_moon', 'ins_10'] }, { x: 3300, say: ['x_draft', 'ins_15'] }] },

  /* ---- stage 11 (round 6): the Princesses' Flower Party, the last stage. Bake the challah, make the tea, set the table, dance with everyone. The two friends she chose walk with her. ---- */
  { name: 'party', need: 12, len: 7700, sticker: 11, collect: 'flour', ins: 'ins_10', joins: [], without: ['princess1', 'princess2'], carry: true, noIns: true, fireworks: true, finale: true,
    finSay: ['l11_c', 'l11_d', 'pr_20'],
    terrain: [{ x0: 0, x1: 1500, top: G }, { x0: 1500, x1: 1700, top: G, top1: G - 110 }, { x0: 1700, x1: 1950, top: G - 110 }, { x0: 1950, x1: 2150, top: G - 110, top1: G }, { x0: 2150, x1: 3300, top: G },
              { x0: 3560, x1: 5000, top: G }, { x0: 5000, x1: 5200, top: G, top1: G - 70 }, { x0: 5200, x1: 5450, top: G - 70 }, { x0: 5450, x1: 5650, top: G - 70, top1: G }, { x0: 5650, x1: 7700, top: G }],
    friend: { kind: 'princess1', x: 7250 },
    items: [{ x: 600, y: G - 50, kind: 'flour', to: 'bowl', say: null }, { x: 1250, y: G - 50, kind: 'eggs', to: 'bowl', say: null }, { x: 1825, y: G - 215, kind: 'honey', to: 'bowl', say: null },
            { x: 3950, y: G - 50, kind: 'flower_1', grp: 'flower', to: 'pot', say: null }, { x: 4250, y: G - 50, kind: 'flower_2', grp: 'flower', to: 'pot', say: null }, { x: 4560, y: G - 50, kind: 'water_drop', to: 'pot', say: null },
            { x: 0, y: 0, kind: 'challah', to: 'table', hid: 'challah', hidden: true, nochip: true }, { x: 0, y: 0, kind: 'teapot', to: 'fire', hid: 'pot', hidden: true, nochip: true }, { x: 0, y: 0, kind: 'teacup', to: 'table', hid: 'cup', hidden: true, nochip: true }],
    stations: [{ id: 'bowl', kind: 'bowl', x: 2450, need: 3, r: 150 }, { id: 'oven', kind: 'oven', x: 2720, need: 1, auto: true, spawn: 'challah', say: ['fr_13'] },
               { id: 'pot', kind: 'pot', x: 4850, need: 3, r: 160, spawn: 'pot', hint: 'x_tea_pot', near: 420, say: ['x_tea_fire'] },
               { id: 'fire', kind: 'fire', x: 5120, need: 1, r: 170, spawn: 'cup', say: ['x_tea_boil'] },
               { id: 'table', kind: 'table', x: 5900, need: 2, r: 230, img: 'prop_table', show: ['challah', 'teacup'], hint: 'x_party_table', near: 560, say: ['l11_b'] },
               { id: 'partydance', kind: 'rhythm', finish: true, x: 6700, r: 380, need: 6, hint: 'x_rhythm', near: 700 }],
    bonus: [].concat(arcRow(240, 1400, G - 80, 40, 8), arcRow(1520, 2100, G - 215, 40, 5), arcRow(2200, 3250, G - 80, 40, 7), arcRow(3300, 3560, G - 150, 80, 3), arcRow(3600, 4800, G - 80, 40, 8), arcRow(5050, 5600, G - 150, 40, 5), arcRow(5700, 6500, G - 80, 30, 6)),
    plats: [{ x: 3335, w: 150, top: G - 40, kind: 'cloud', move: { a: 3320, b: 3400, sp: 0.012 } }],
    decos: [{ kind: 'princess2', x: 7420, happy: true }],
    cues: [{ x: 0, say: ['l11_a', 'x_party_cake', 'ins_10'] }, { x: 3600, say: ['x_party_tea'] }] }
];
/* ---------- round 8: longer stages. Each stage gets a flat stretch inserted at `at` (everything after it moves right by `by`), with one more thing to do in it ---------- */
function stretch(lv, at, by, pad){
  lv.len += by;
  lv.terrain.forEach(t => { if (t.x0 >= at) { t.x0 += by; t.x1 += by; } else if (t.x1 > at) t.x1 += by; });
  ['items', 'plats', 'bonus', 'props', 'decos', 'cues', 'mud', 'drafts', 'stars', 'meets', 'pads'].forEach(k => (lv[k] || []).forEach(o => { const was = o.x; if (o.x !== undefined && o.x >= at) o.x += by; if (o.move && was >= at) { o.move.a += by; o.move.b += by; } }));
  (lv.stations || []).forEach(st => { if (st.x >= at) { st.x += by; if (st.pts) st.pts = st.pts.map(q => Array.isArray(q) ? [q[0] + by, q[1]] : q + by); if (st.zone) st.zone = st.zone.map(v => v + by); } });
  if (lv.friend.x >= at) lv.friend.x += by;
  if (lv.splash && lv.splash.x >= at) lv.splash.x += by;
  ['slide', 'danceZone'].forEach(k => { const o = lv[k]; if (o && o.a >= at) { o.a += by; o.b += by; } });
  if (pad) { lv.len += pad; lv.terrain[lv.terrain.length - 1].x1 += pad; }       // room behind the friend so the picture is not cut by the screen edge
}
function addExt(n, at, by, pad, fn){ const lv = LEVELS[n]; stretch(lv, at, by, pad); lv.stations = lv.stations || []; lv.bonus = lv.bonus || []; fn(lv, at); lv.bonus.push(...arcRow(at + 40, at + by - 40, G - 80, 30, 6)); }
const BUSHES = ['bush_a', 'bush_b', 'bush_c'];
const countPts = (a, ys) => ys.map((y, i) => [a + 110 + i * 150, G - y]);
addExt(0, 4100, 700, 0, (lv, a) => lv.stations.push({ id: 'shoot', kind: 'rain', x: a + 350, zone: [a + 100, a + 650], need: 4, hint: 'x_rain', near: 700, say: ['pr_13'] }));     // stage 1: catch four falling stars
addExt(1, 5800, 750, 0, (lv, a) => lv.stations.push({ id: 'hide2', kind: 'seek', what: 'peek', mounds: BUSHES, peeks: ['luna', 'shluli', 'luna'], x: a + 380, pts: [a + 130, a + 380, a + 630], hint: 'x_hide', near: 600, say: ['pr_13'] }));     // stage 2: friends hide in bushes
addExt(2, 6080, 800, 0, (lv, a) => lv.stations.push({ id: 'steps2', kind: 'count', x: a + 400, pts: countPts(a, [90, 170, 100, 200, 120]).map(q => [q[0] + 20, q[1]]), hint: 'x_count', near: 650, say: ['pr_13'] }));     // stage 3: pop the numbers 1-5
addExt(3, 3000, 750, 250, (lv, a) => lv.stations.push({ id: 'shoot', kind: 'rain', x: a + 375, zone: [a + 80, a + 680], need: 5, hint: 'x_rain', near: 700, say: ['pr_13'] }));     // stage 4: shooting stars in the sky
addExt(4, 3120, 500, 250, (lv, a) => { lv.items.push({ x: a + 100, y: G - 50, kind: 'water_drop', to: 'bed', say: null }, { x: a + 230, y: G - 50, kind: 'water_drop', to: 'bed', say: null });
  lv.stations.push({ id: 'bed', kind: 'grow', x: a + 380, need: 2, r: 190, say: ['pr_15'] }); });     // stage 5: water the vegetable bed
addExt(5, 2000, 700, 400, (lv, a) => lv.stations.push({ id: 'lights', kind: 'simon', x: a + 350, hint: 'x_simon', say: ['pr_13'] }));     // stage 6: the four Shabbat lights
addExt(6, 4400, 700, 0, (lv, a) => lv.stations.push({ id: 'starsteps', kind: 'count', x: a + 380, pts: [[a + 100, G - 90], [a + 250, G - 170], [a + 400, G - 100], [a + 550, G - 200], [a + 680, G - 120]], hint: 'x_count', near: 650, say: ['pr_13'] }));     // stage 7: count the night stars
addExt(7, 3300, 600, 0, (lv, a) => lv.stations.push({ id: 'hide8', kind: 'seek', what: 'peek', mounds: BUSHES, peeks: ['pitzi', 'luna', 'shluli'], x: a + 300, pts: [a + 110, a + 300, a + 490], hint: 'x_hide', near: 600, say: ['pr_13'] }));     // stage 8: hide and seek in the castle garden
addExt(8, 2300, 600, 0, (lv, a) => lv.stations.push({ id: 'drops9', kind: 'count', x: a + 300, pts: [[a + 80, G - 90], [a + 200, G - 170], [a + 320, G - 100], [a + 440, G - 200], [a + 540, G - 120]], hint: 'x_count', near: 650, say: ['pr_13'] }));     // stage 9: pop the numbers at the oasis
addExt(9, 2750, 550, 0, (lv, a) => lv.stations.push({ id: 'moonrain', kind: 'rain', x: a + 275, zone: [a + 60, a + 490], need: 6, hint: 'x_rain', near: 700, say: ['pr_13'] }));     // stage 10: a shower of moon stars
addExt(10, 3620, 650, 0, (lv, a) => lv.stations.push({ id: 'hide11', kind: 'seek', what: 'peek', mounds: BUSHES, peeks: ['shluli', 'pitzi', 'luna'], x: a + 325, pts: [a + 110, a + 325, a + 540], hint: 'x_hide', near: 600, say: ['pr_13'] }));     // stage 11: the guests hide
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
let fx = null;      // the love party after the last stage
let mode = 'title', li = 0, L = null, p = null, camX = 0, camY = 0, T = 0;     // camY: how far the view has moved up (0 = ground level, negative = looking up at clouds and treetops)
let bonus = [], bonusN = 0, meets = [];
let terr = [], items = [], stars = [], plats = [], followers = [], parts = [], hist = [], flowers = [];
let pocket = [], sts = [];          // pocket: things she carries (up to 4); sts: the places that use them (bowl, oven, nest, plates ...)
let got = 0, meter = 0, fin = null, arrived = false, hintT = 0, maxX = 0, danceN = 0, said = {}, falls = 0, trail = false;

const MAXPARTY = 2;
function paradeFor(i){
  let a = [];
  LEVELS.forEach((lv, k) => { if (save.done[k]) lv.joins.forEach(j => { if (!a.includes(j)) a.push(j); }); });
  return a.filter(k => !(LEVELS[i].without || []).includes(k));
}
function startLevel(i, party){
  li = i; L = LEVELS[i]; T = 0; mode = 'play'; fx = null;
  p = { x: 140, y: G, vx: 0, vy: 0, face: 1, on: true, run: 0, dance: 0, move: 0, wings: 0, bubble: 0, squash: 1 };
  items = L.items.map(o => ({ ...o, got: false, bob: rand(0, 6) }));
  pocket = []; sts = (L.stations || []).map(o => ({ ...o, have: 0, done: false, t: 0, cd: 0, armed: 0 }));
  sts.forEach(st => { if (st.kind === 'riddle') { st.want = Math.random() < 0.5 ? 'red' : 'blue'; st.objs = [['apple', 'red'], ['ball', 'blue'], ['leaf', 'green']].sort(() => Math.random() - 0.5).map((o, i) => ({ k: o[0], col: o[1], x: st.x + (i - 1) * 250, wob: 0 })); } });
  sts.forEach(st => { const k = st.kind;
    if (k === 'count') { st.n = 0; st.need = st.pts.length; st.wob = st.pts.map(() => 0); }
    else if (k === 'rain') { st.n = 0; st.drops = []; st.sp = 40; }
    else if (k === 'seek') { st.n = 0; st.need = st.pts.length; st.rev = st.pts.map(() => 0); }
    else if (k === 'simon') { st.seq = [0, 1, 2, 3].sort(() => Math.random() - 0.5).slice(0, 3); st.phase = 'wait'; st.k = 0; st.t2 = 0; st.lit = [0, 0, 0, 0]; st.on = [false, false, false, false]; st.stand = 0; st.ign = -2; st.prev = -1; st.idle = 0; st.shake = 0; }
    else if (k === 'rhythm') { st.active = false; st.clock = 0; st.hits = 0; st.fb = 0; st.r = st.r || 300; } });
  stars = (L.stars || []).map(o => ({ ...o, y: G - 70, got: false, back: 0 }));
  bonus = (L.bonus || []).map(o => ({ ...o, got: false })); bonusN = 0;
  meets = (L.meets || []).map(o => ({ ...o, done: false, seen: false, hop: 0 }));
  plats = L.plats.map(o => ({ ...o, dx: 0 })); terr = L.terrain;
  L.cues.forEach(c => c.done = false);
  followers = (party || paradeFor(i).slice(-MAXPARTY)).map(k => ({ kind: k }));      // at most two friends walk with her (she picks them before the stage)
  parts = []; hist = []; flowers = []; got = 0; meter = 0; fin = null; arrived = false; hintT = 0; maxX = 0; said = {}; falls = 0; trail = false; camX = 0; camY = 0;
  L.friend.happy = false; L.friend.bloom = 0; L.friend.fly = 0;
  ['title', 'map', 'end', 'pick'].forEach(s => $(s).classList.add('hide'));
  Voice.hush(); showButtons(); glow(null); startMusic(i);
}

/* ---------- helpers ---------- */
/* a terrain segment is flat (top) or a ramp (top at x0 = top, top at x1 = top1) */
const tAt = (g, x) => g.top1 === undefined ? g.top : g.top + (g.top1 - g.top) * clamp((x - g.x0) / (g.x1 - g.x0), 0, 1);
function groundAt(x){ let t = null; for (const g of terr) if (x > g.x0 - 8 && x < g.x1 + 8) { const h = tAt(g, x); if (t === null || h < t) t = h; } return t; }
function inGap(x){ return (L.gaps || []).find(g => x > g.x && x < g.x + g.w); }
function burst(x, y, n, cols, shape){ for (let i = 0; i < n; i++) parts.push({ x, y, vx: rand(-3, 3), vy: rand(-4.5, -0.5), life: 1, c: cols[i % cols.length], s: rand(5, 11), shape: shape || 'dot', g: 0.12 }); }
const starsOK = () => bonusN >= (L.need || 0);
const stationsOK = () => sts.every(s => s.done);
const MINI = { count: 1, rain: 1, seek: 1, simon: 1, rhythm: 1 };       // round 4: the new little games
const restOK = st => got === items.length && starsOK() && sts.every(s => s === st || s.done);      // everything else is finished (the last rhythm game ends the level)
function stPos(st){        // where the sparkle trail and the hints should point for a station
  if (st.kind === 'count') { const q = st.pts[Math.min(st.n, st.pts.length - 1)]; return { x: q[0], y: q[1] }; }
  if (st.kind === 'seek') { const o = st.pts.filter((x, i) => !st.rev[i]).sort((a, b) => Math.abs(a - p.x) - Math.abs(b - p.x))[0]; return { x: o === undefined ? st.x : o, y: G - 60 }; }
  if (st.kind === 'rain') return { x: clamp(p.x, st.zone[0], st.zone[1]), y: G - 100 };
  return { x: st.kind === 'riddle' ? st.x - 300 : st.x, y: G - 60 };
}
const readyFr = () => got === items.length && starsOK() && sts.every(s => s.done || s.dance);     // only dance stations (the candles) are left: dancing at the friend lights them
const goalMet = () => got === items.length && starsOK() && stationsOK();       // to finish a level: all the things (and each one put to use) AND enough gold stars
function target(){ const it = items.find(o => !o.got && !o.hidden);
  if (pocket.length) { const st = sts.find(s => s.id === pocket[0].to); if (st) return { x: st.x, y: G - 60 }; }
  if (it) return { x: it.x, y: it.y };
  { const st = sts.find(s => !s.done && !s.auto && !s.dance); if (st && got >= items.length - items.filter(o => o.hidden).length) return stPos(st); }
  { const dz = sts.find(s => !s.done && s.dance); if (dz && starsOK() && got === items.length && sts.every(z => z === dz || z.done || z.dance)) return { x: dz.x, y: G - 60 }; }
  if (!starsOK()) { const b = bonus.filter(o => !o.got).sort((a, c) => Math.abs(a.x - p.x) - Math.abs(c.x - p.x))[0]; if (b) return { x: b.x, y: b.y }; }
  return { x: L.friend.x, y: G - 60 }; }
function curIns(){
  if (got < items.length) { const nx = items.find(o => !o.got && !o.hidden); return nx ? (nx.say !== undefined ? nx.say : L.noIns ? null : L.ins) : null; }
  if (!starsOK()) return 'ins_10';
  if (!stationsOK()) { const s = sts.find(o => !o.done && o.hint && (o.kind !== 'rhythm' || !o.finish || restOK(o)) && (!o.dance || sts.every(z => z === o || z.done || z.dance))); return s ? s.hint : null; }
  if (Math.abs(p.x - L.friend.x) > 190) return 'ins_24';
  return L.auto ? null : 'ins_06';
}
let nextHint = 480;
function progress(){ hintT = 0; nextHint = 480; trail = false; }

function pickup(it){
  it.got = true; got++; progress(); sfx.pick();
  burst(it.x, it.y, 12, RB, 'star');
  if (it.to) pocket.push(it);
  if (got <= 10) Voice.say('num_' + (got < 10 ? '0' : '') + got);
  if (it.col && COL[it.col]) Voice.say(COL[it.col][1]);
  if (got === items.length) { Voice.say('pr_12'); if (!starsOK()) Voice.say('ins_10'); else if (stationsOK()) Voice.say('ins_24'); }
  else if (items.length - got === 1) Voice.say('ins_25');
  else praise();
}
/* a station has everything it needs */
function complete(st){
  st.done = true; st.t = 0; progress(); sfx.win && st.kind !== 'plate' ? sfx.star() : sfx.pick(); burst(st.x, G - 120, st.kind === 'plate' ? 10 : 26, RB, 'star');
  if (!st.finish) (st.say || []).forEach(id => Voice.say(id));
  if (st.spawn) { const it = items.find(o => o.hid === st.spawn); if (it) { it.hidden = false; it.x = st.x + 10; it.y = G - 90; burst(it.x, it.y, 20, ['#ffe14d', '#fff'], 'star'); } }
  if (st.kind === 'bowl') { const ov = sts.find(s => s.id === (st.arms || 'oven')); if (ov) ov.armed = 110; }
  if (st.kind === 'riddle') st.objs.forEach(o => burst(o.x, G - 70, 8, RB, 'star'));
  if (st.finish) { finish(); return; }
  if (got === items.length && starsOK() && stationsOK() && !sts.some(o => o.finish)) Voice.say('ins_24');
}
function finish(){
  fin = { t: 0 }; L.friend.happy = true; progress(); glow(null); sfx.win();
  Voice.q.length = 0; L.finSay.forEach(id => Voice.say(id));
  L.joins.forEach(k => { if (followers.length < MAXPARTY && !followers.find(f => f.kind === k) && k !== L.friend.kind) followers.push({ kind: k, enter: 0 }); });
  burst(L.friend.x, G - 120, 40, RB, 'star');
}
/* a short meeting with a friend on the way (stages 1-3): the friend asks for a dance or a jump, then hops and a little arc of stars appears */
function meetDone(m){
  m.done = true; m.hop = 50; progress(); sfx.star(); burst(m.x, G - 150, 22, RB, 'star'); glow(null);
  Voice.say(m.do === 'dance' ? 'pr_07' : 'pr_09'); Voice.say('fr_03');
  const y0 = G - 150; for (let i = 0; i < 5; i++) { const k = i / 4; bonus.push({ x: Math.round(m.x - 130 + 260 * k), y: Math.round(y0 - Math.sin(k * Math.PI) * 60), got: false }); }
}
function meetPress(what){ const m = meets.find(o => !o.done && o.do === what && Math.abs(p.x - o.x) < (what === 'dance' ? 260 : 300)); if (m) { meetDone(m); return true; } return false; }
function endLevel(){ if (L.finale && !fx) { startFinale(); return; } finishLevel(); }
function finishLevel(){
  save.done[li] = true; persist(); mode = 'end'; showButtons(); glow(null);
  $('sticker').innerHTML = '<img alt="" src="art/ui/sticker_' + L.sticker + '.png" onerror="this.onerror=null;this.src=\'art/ui/sticker_8.png\'">'; $('end').classList.remove('hide');
  $('sticker').style.animation = 'none'; void $('sticker').offsetWidth; $('sticker').style.animation = '';
  if (followers.length + 1 >= 4) Voice.sayIfFree('pr_19');
}

/* ---------- the little games (round 4): count, rain, seek, simon, rhythm ---------- */
const NUMV = n => 'num_' + (n < 10 ? '0' : '') + n;
const SIMON_TONE = [392, 523, 659, 784];
const lanternX = (st, i) => st.x + (i - 1.5) * 150;
function miniUpdate(st, dt){
  const cx = p.x, cy = p.y - 62, k = st.kind;
  if (k === 'count') {       // numbered bubbles, pop them 1, 2, 3 ...
    st.wob = st.wob.map(w => Math.max(0, w - dt));
    st.pts.forEach((q, i) => { if (i < st.n || Math.hypot(q[0] - cx, q[1] - cy) > 66) return;
      if (i === st.n) { st.n++; sfx.pop(); burst(q[0], q[1], 14, RB, 'star'); progress(); Voice.say(NUMV(st.n)); if (st.n >= st.pts.length) complete(st); }
      else if (st.wob[i] <= 0) { st.wob[i] = 50; sfx.boing(); if (st.cd <= 0) { st.cd = 420; Voice.say('x_count'); } } }); }
  else if (k === 'rain') {      // falling stars: stand under them
    const z = st.zone;
    if (p.x > z[0] && p.x < z[1]) { st.sp += dt; if (st.sp >= 55) { st.sp = 0; st.drops.push({ x: clamp(p.x + rand(-200, 420), z[0], z[1]), y: camY - 40, vy: rand(2.8, 3.6), w: rand(0, 6) }); } }
    st.drops.forEach(d => { d.y += d.vy * dt; d.x += Math.sin(T * 0.05 + d.w) * 0.4 * dt;
      if (!d.dead && Math.hypot(d.x - cx, d.y - cy) < 66) { d.dead = true; st.n++; sfx.star(); burst(d.x, d.y, 10, ['#ffe14d', '#fff'], 'star'); progress(); if (st.n <= 10) Voice.say(NUMV(st.n)); if (st.n >= st.need) complete(st); } });
    st.drops = st.drops.filter(d => !d.dead && d.y < G + 40); }
  else if (k === 'seek') {      // touch the hay (or the sand) to see what hides in it
    st.pts.forEach((x, i) => { if (st.rev[i] || !p.on || p.y < G - 40 || Math.abs(p.x - x) > 70) return;
      st.rev[i] = 1; st.n++; sfx.pick(); burst(x, G - 80, 14, st.what === 'gem' ? ['#7fd8ff', '#ff9fd0', '#fff'] : ['#ffe14d', '#fff'], 'star'); progress();
      Voice.say(st.n === 1 ? (st.what === 'peek' ? 'pr_13' : st.what === 'gem' ? 'x_gem' : 'x_chick') : NUMV(st.n)); if (st.n >= st.need) complete(st); }); }
  else if (k === 'simon') {     // four lanterns light up in a pattern of three; stand on them in the same order
    const cur = p.on && p.y >= G - 8 ? [0, 1, 2, 3].find(i => Math.abs(p.x - lanternX(st, i)) < 55) : undefined, c = cur === undefined ? -1 : cur;
    st.lit = st.lit.map(v => Math.max(0, v - dt)); st.shake = Math.max(0, st.shake - dt);
    if (st.phase === 'wait') { if (Math.abs(p.x - st.x) < 560) { st.phase = 'show'; st.t2 = 0; Voice.say('x_simon'); } return; }
    if (st.phase === 'show') { st.t2 += dt;
      for (let j = 0; j < 3; j++) { const t0 = 170 + j * 85; if (st.t2 >= t0 && st.t2 - dt < t0) { st.lit[st.seq[j]] = 55; tone(SIMON_TONE[st.seq[j]], 0.4, 'triangle', 0.14); } }
      if (st.t2 > 170 + 3 * 85 + 30) { st.phase = 'input'; st.k = 0; st.stand = 0; st.idle = 0; st.ign = c; st.prev = c; st.on = [false, false, false, false]; Voice.say('x_now'); }
      return; }
    st.idle += dt;
    if (c !== st.prev) { st.prev = c; st.stand = 0; if (c !== st.ign) st.ign = -2; }
    if (c >= 0 && c !== st.ign && Math.abs(p.vx) < 0.5) st.stand += dt; else st.stand = 0;
    if (st.idle > 1500) { st.phase = 'show'; st.t2 = 0; st.on = [false, false, false, false]; Voice.say('x_simon'); return; }       // nobody tried for a long time: show it again
    if (st.stand >= 12) { st.stand = 0; st.ign = c; st.idle = 0;
      if (c === st.seq[st.k]) { st.on[c] = true; st.lit[c] = 40; tone(SIMON_TONE[c], 0.4, 'triangle', 0.14); burst(lanternX(st, c), G - 130, 10, RB, 'star'); st.k++; progress();
        if (st.k >= 3) { st.on = [true, true, true, true]; st.phase = 'done'; complete(st); } else if (st.k === 2) Voice.say('pr_04'); }
      else { st.shake = 40; sfx.boing(); Voice.say('pr_11'); st.phase = 'show'; st.t2 = 0; st.k = 0; st.on = [false, false, false, false]; } } }
  else if (k === 'rhythm') {     // dance on the beat: a ring shrinks to the target, press Dance when it closes
    st.fb = Math.max(0, st.fb - dt);
    if (st.active && Math.abs(p.x - st.x) < st.r) { const c0 = st.clock; st.clock += dt; if (Math.floor(c0 / 64) !== Math.floor(st.clock / 64)) tone(440, 0.07, 'sine', 0.07); } }
}
function rhythmPress(st){
  if (!st.active) { st.active = true; st.clock = 1; return; }
  const ph = st.clock % 64, d = Math.min(ph, 64 - ph);
  if (d <= 16) { st.hits++; st.fb = 24; sfx.pick(); burst(st.x, G - 220, 12, RB, 'star'); progress(); if (st.hits >= st.need) complete(st); else if (st.hits === 3) Voice.sayIfFree('pr_13'); }
  else { st.fb = -14; tone(300, 0.08, 'sine', 0.05); }
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
    if (p.on && ax && terr.some(g => g.top1 === undefined && g.top < p.y - 10 && ((ax > 0 && g.x0 > p.x && g.x0 - p.x < 100) || (ax < 0 && g.x1 < p.x && p.x - g.x1 < 100)))) wantJump = true;   // a step ahead
  }
  const muddy = p.on && (L.mud || []).some(m => p.x > m.x && p.x < m.x + m.w && p.y >= G - 4);
  p.vx = ax * 5.2 * (muddy ? 0.45 : 1); if (ax) p.face = ax;
  if (L.slide) {       // round 7: the rainbow slide in stage 2 carries her down, whoosh
    const sl = L.slide, onSl = p.on && p.x > sl.a + 20 && p.x < sl.b && !locked && !dancing;
    if (onSl && ax >= 0 && p.y < G - 6) { p.vx = Math.max(p.vx, 8.5); p.face = 1; if (!p.sl) { p.sl = 1; tone(900, 0.7, 'triangle', 0.1, 260); } if (Math.random() < 0.5) burst(p.x, p.y - 30, 1, RB, 'star'); }
    if (p.sl && p.x >= sl.b - 30) { p.sl = 0; said.slfx = 50; if (!said.sl1) { said.sl1 = 1; Voice.sayIfFree('pr_14'); } }
    if (said.slfx > 0) said.slfx -= dt; }
  if (muddy && ax && !said.mud) { said.mud = 1; tone(150, 0.2, 'sine', 0.09, 60); }
  // jump
  if (wantJump && p.on && !locked && !dancing) { p.vy = L.floaty ? -13.4 : -15.2; p.on = false; p.squash = 1.25; sfx.jump(); meetPress('jump'); if ($('bj').classList.contains('glow')) glow(null); }
  // super jump
  if (wantSuper && !locked && p.on && meter >= 3) { p.vy = -21.5; p.on = false; p.wings = 1; meter = 0; p.dance = 0; sfx.sup(); Voice.say('ex_04'); $('bs').classList.remove('ready', 'glow'); }
  // dance (a rhythm game nearby takes the press first; the dance picture is shorter then so she can press again on the next beat)
  if (wantDance && save.dance && p.on && !locked) { const rh = sts.find(s => s.kind === 'rhythm' && !s.done && Math.abs(p.x - s.x) < s.r && (!s.finish || restOK(s)));
    if (rh) { wantDance = false; if ($('bd').classList.contains('glow')) glow(null); const was = rh.active; rhythmPress(rh); p.dance = was ? 40 : 110; p.move = danceN++ % Math.max(1, save.done.filter(Boolean).length); sfx.dance(); } }
  if (wantDance && save.dance && p.on && !locked && !dancing) {
    p.dance = 110; p.move = danceN++ % Math.max(1, save.done.filter(Boolean).length); sfx.dance(); if ($('bd').classList.contains('glow')) glow(null);
    meetPress('dance');
    const near = Math.abs(p.x - L.friend.x) < 200 && goalMet();
    const cd = sts.find(s => s.dance && !s.done && Math.abs(p.x - s.x) < 280);
    if (cd) { complete(cd); }
    else if (near && !L.auto && !sts.some(o => o.finish)) finish();
    else if (Math.abs(p.x - L.friend.x) < 200 && readyFr() && !L.auto && !sts.some(o => o.finish)) { sts.filter(s => s.dance && !s.done).forEach(s => { s.done = true; s.t = 0; burst(s.x, G - 120, 26, RB, 'star'); }); sfx.star(); finish(); }
    else if (L.danceZone && p.x > L.danceZone.a && p.x < L.danceZone.b) { for (let i = 0; i < 9; i++) flowers.push({ x: p.x + rand(-260, 260), c: RB[i % 6], t: 0 }); if (!said.dz) { said.dz = 1; Voice.say('pr_07'); } progress(); }
    else Voice.sayIfFree(Math.random() < 0.5 ? 'pr_07' : 'pr_08');
  }
  wantJump = wantDance = wantSuper = false;
  if (p.dance > 0) p.dance -= dt;

  // rescue bubble carries her back after a fall
  if (p.bubble > 0) { p.bubble -= dt; const ty = groundAt(p.x); const gy = ty === null ? G : ty; p.y += (gy - p.y) * 0.06 * dt; p.vy = 0; if (p.bubble <= 0 || Math.abs(gy - p.y) < 3) { p.bubble = 0; p.y = gy; p.on = true; sfx.pop(); } }
  else {
    const py = p.y;
    (L.drafts || []).forEach(d => { if (p.x > d.x && p.x < d.x + d.w && p.y > G - d.h) { p.vy = Math.max(p.vy - 0.95 * dt, -9); if (Math.random() < 0.25) parts.push({ x: p.x + rand(-40, 40), y: p.y - rand(0, 80), vx: 0, vy: 1.5, life: 0.7, c: '#fff', s: rand(3, 6), shape: 'dot', g: 0 }); } });     // the wind lifts her
    p.vy += (p.wings && p.vy > 0 ? 0.22 : L.floaty ? 0.44 : 0.62) * dt; if (p.vy > 16) p.vy = 16;
    const px0 = p.x; p.x = clamp(p.x + p.vx * dt, 60, L.len - 60); p.y += p.vy * dt;
    for (const g of terr) if (p.x + 34 > g.x0 && p.x - 34 < g.x1) {        // the side of a raised block or the wall of a gap (next to a ramp the wall starts 40 px higher: her body reaches over the seam while her feet are still on the slope)
      const tol = terr.some(o => o.top1 !== undefined && (o.x1 === g.x0 || o.x0 === g.x1)) ? 40 : 12;
      if (px0 + 34 <= g.x0 + 2 && p.y > tAt(g, g.x0) + tol) p.x = g.x0 - 34; else if (px0 - 34 >= g.x1 - 2 && p.y > tAt(g, g.x1) + tol) p.x = g.x1 + 34; }
    let landed = null, wasOn = p.on; p.on = false;
    if (p.vy >= 0) {
      for (const g of terr) if (p.x > g.x0 - 10 && p.x < g.x1 + 10) { const gt = tAt(g, p.x), ramp = g.top1 !== undefined;
        if (py <= gt + (ramp ? 14 : 1) && (p.y >= gt || (ramp && wasOn && gt - p.y < 10))) { if (!landed || gt < landed.top) landed = { top: gt, dx: 0 }; } }
      for (const pl of plats) if (p.x > pl.x - 12 && p.x < pl.x + pl.w + 12 && py <= pl.top + 1 && p.y >= pl.top) { if (!landed || pl.top < landed.top) landed = pl; }
      for (const pd of (L.pads || [])) if (p.x > pd.x && p.x < pd.x + pd.w && py <= pd.top + 60 && p.y >= pd.top) {      // walking into the trampoline bounces her too, no jump needed
        p.y = pd.top; p.vy = -19; p.squash = 0.7; pd.sq = 14; sfx.boing(); said.pad = 1; burst(p.x, pd.top, 10, ['#fff', '#ffe14d'], 'star'); landed = 'pad'; }
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
  // missed things (stage 4 first, then every carry stage): when she has walked far past one, it comes back to her, low and ahead, and the sparkle trail and the voice point at it
  if (L.recover && !fin && p.on && !locked) items.forEach(it => { if (it.got || it.hidden || it.x > p.x - 900) return;
    let nx = Math.min(L.len - 220, p.x + 420), g = groundAt(nx), n = 0; while (g === null && n++ < 8) { nx += 110; g = groundAt(Math.min(nx, L.len - 220)); }
    if (g === null) return; it.x = Math.min(nx, L.len - 220); it.y = g - 100; burst(it.x, it.y, 14, ['#ffe14d', '#fff'], 'star'); tone(660, 0.25, 'sine', 0.1, 990);
    trail = true; hintT = Math.max(hintT, 1200); Voice.say(L.noIns ? 'ins_25' : L.ins); said.back = (said.back || 0) + 1; });
  items.forEach(it => { it.bob += 0.05 * dt; if (!it.got && !it.hidden && Math.hypot(it.x - cx, it.y - cy) < 72 && !(it.to && pocket.length >= 4)) pickup(it);
    if (!it.got && !it.hidden && hintT > 2400 && it === items.find(o => !o.got && !o.hidden)) { it.x += Math.sign(cx - it.x) * 1.4 * dt; it.y += Math.sign(cy - it.y) * 1.0 * dt; } });
  bonus.forEach(b => { if (!b.got && Math.hypot(b.x - cx, b.y - cy) < 60) { b.got = true; bonusN++; sfx.star(); burst(b.x, b.y, 6, ['#ffe14d', '#fff'], 'star');
    if (bonusN === L.need) { Voice.say('pr_12'); if (got === items.length && stationsOK()) Voice.say('ins_24'); } else if (bonusN % 10 === 0) praise(); } });
  stars.forEach(st => {
    if (!st.got && Math.hypot(st.x - cx, st.y - cy) < 66 && meter < 3) { st.got = true; st.back = 300; meter++; sfx.star(); burst(st.x, st.y, 8, ['#ffe14d', '#fff'], 'star');
      if (meter === 3) { Voice.say('ex_03'); if (!save.sup) { save.sup = true; persist(); showButtons(); Voice.say('ins_08'); } $('bs').classList.add('ready', 'glow'); } }
    else if (st.got) { const need = items.find(o => o.high === st.g && !o.got); if (need && meter < 3 && !p.wings) { st.back -= dt; if (st.back <= 0) st.got = false; } }
  });

  // stations: what she carries drops in when she walks up to the right place
  sts.forEach(st => { st.cd -= dt; st.t += dt;
    if (st.done) return;
    if (st.hint && !st.intro && Math.abs(p.x - stPos(st).x) < (st.near || 520)) { st.intro = 1; Voice.say(st.hint); if (st.kind === 'rhythm') glow('bd'); }
    if (st.auto) { if (st.armed > 0) { st.armed -= dt; if (st.armed <= 0) complete(st); } return; }
    if (st.dance) return;
    if (MINI[st.kind]) { miniUpdate(st, dt); return; }
    if (st.kind === 'riddle') {
      if (!st.asked && Math.abs(p.x - st.x) < 800 && got >= items.length) { st.asked = 1; Voice.say('l7_b'); Voice.say('fr_15'); Voice.say(st.want === 'red' ? 'ins_21' : 'ins_22'); }
      if (st.asked) st.objs.forEach(o => { o.wob = Math.max(0, o.wob - dt);
        if (!st.done && Math.abs(p.x - o.x) < 80 && p.y > G - 130 && o.wob <= 0) {
          if (o.col === st.want) complete(st); else { o.wob = 60; sfx.boing(); if (st.cd <= 0) { st.cd = 300; Voice.say(st.want === 'red' ? 'ins_21' : 'ins_22'); } } } });
      return; }
    if (st.cd <= 0 && Math.abs(p.x - st.x) < (st.r || 140)) { const i = pocket.findIndex(o => o.to === st.id);
      if (i >= 0) { pocket.splice(i, 1); st.have++; st.cd = 16; sfx.pop(); burst(st.x, G - 110, 10, RB, 'star'); if (st.have >= st.need) complete(st); else if (Math.random() < 0.4) praise(); } } });

  // friends she meets on the way: say what to do when she comes close, glow the button
  meets.forEach(m => { if (m.hop > 0) m.hop -= dt; if (!m.done && !m.seen && !fin && Math.abs(p.x - m.x) < 520) { m.seen = true; Voice.say(m.do === 'dance' ? 'ins_06' : 'ins_02'); glow(m.do === 'dance' ? 'bd' : 'bj'); } });
  // friend
  const near = Math.abs(p.x - L.friend.x) < 170;
  if (!fin && (goalMet() || readyFr()) && near && !sts.some(o => o.finish)) {
    if (L.auto) finish();
    else if (!arrived) { arrived = true; if (L.arriveSay) Voice.say(L.arriveSay); Voice.say('ins_06'); glow('bd'); }
  }
  if (fin) {
    fin.t += dt; L.friend.fly = fin.t;
    if (L.friend.kind === 'tree') { L.friend.bloom = Math.min(1, fin.t / 150); p.x += (L.friend.x - 210 - p.x) * 0.05 * dt; p.face = 1; }   // step aside so the tree is seen
    if (p.on && fin.t % 46 < dt && fin.t < 230) { p.dance = 44; p.move = Math.floor(fin.t / 46) % 3; }
    if (Math.random() < 0.35) parts.push({ x: L.friend.x + rand(-260, 260), y: G - rand(260, 420), vx: rand(-1, 1), vy: rand(0.5, 2), life: 1.6, c: L.friend.kind === 'tree' ? '#ff9fd0' : RB[Math.floor(rand(0, 6))], s: rand(6, 11), shape: 'petal', g: 0.01 });
    if (fin.t > 260 && (Voice.idle() || fin.t > 900)) endLevel();      // never hang at the end if a voice clip does not finish
  }

  // help when she is stuck
  if (p.x > maxX + 220) { maxX = p.x; progress(); }
  if (!fin) { hintT += dt;
    const ins = curIns();
    if (ins && hintT >= nextHint && Voice.idle()) {
      nextHint = hintT + 840; Voice.say(ins); const tg = target();
      glow(ins === 'ins_06' || ins === 'x_rhythm' || ins === 'l6_b' ? 'bd' : (tg.y < p.y - 150 && Math.abs(tg.x - p.x) < 160) ? 'bj' : tg.x < p.x ? 'bl' : 'br'); }
    if (hintT > 1200) trail = true;
  }

  // parade and particles
  hist.push({ x: p.x, y: p.y, f: p.face }); if (hist.length > 900) hist.shift();
  followers.forEach(f => { if (f.enter !== undefined && f.enter < 1) f.enter += 0.012 * dt; });
  parts.forEach(q => { q.x += q.vx * dt; q.y += q.vy * dt; q.vy += q.g * dt; q.life -= 0.02 * dt; });
  parts = parts.filter(q => q.life > 0);
  flowers.forEach(f => f.t += dt);
  camX += (clamp(p.x - VW * 0.36, 0, Math.max(0, L.len - VW)) - camX) * 0.12 * dt;
  camY += (clamp(p.y - 400, -480, 0) - camY) * 0.1 * dt;          // the view rises with her when she climbs up to clouds and branches
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
const FH = { pitzi: 150, bird: 84, mamabird: 115, bobo: 135, dad: 250, shluli: 105, tree: 370, bilam: 168, koko: 170, armon: 230, anana: 230, rhino: 280, luna: 110, solomon: 260, riddletree: 330, princess1: 250, princess2: 250, grandpa: 250, cloudunicorn: 200, sheba: 250, camel: 230, moon: 330 };   // height of the whole picture frame, feet at the bottom
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
  } else if (kind === 'dad') {          // Noga's dad, drawn in code until Ghost's dad_*.png arrive
    rr(-24, -78, 18, 78, 7, '#4a5a7a'); rr(6, -78, 18, 78, 7, '#4a5a7a'); rr(-34, -150, 68, 82, 20, '#e0793c');
    rr(-48, -144, 16, 60, 8, '#e0793c'); rr(32, -144, 16, 60, 8, '#e0793c'); circ(-40, -82, 9, '#f0c8a0'); circ(40, -82, 9, '#f0c8a0');
    circ(0, -178, 32, '#f0c8a0'); ctx.fillStyle = '#3a2a2a'; ctx.beginPath(); ctx.arc(0, -184, 33, Math.PI, 0); ctx.fill(); ctx.fillStyle = 'rgba(70,50,50,.35)'; ctx.beginPath(); ctx.arc(0, -172, 30, 0.15, Math.PI - 0.15); ctx.fill();
    face(0, -178, 14, happy);
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
  } else if (kind === 'sheba') {          // the Queen of Sheba, drawn in code until Ghost's sheba_*.png arrive
    rr(-30, -250 + 170, 60, 80, 8, '#d9a441'); ctx.fillStyle = happy ? '#b04fa0' : '#8a6a9a'; ctx.beginPath(); ctx.moveTo(-24, -170); ctx.lineTo(24, -170); ctx.lineTo(happy ? 62 : 50, 0); ctx.lineTo(happy ? -62 : -50, 0); ctx.closePath(); ctx.fill();
    rr(-30, -170, 60, 16, 6, '#ffd84d'); ctx.strokeStyle = '#b04fa0'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath();
    if (happy) { ctx.moveTo(-24, -160); ctx.lineTo(-62, -200); ctx.moveTo(24, -160); ctx.lineTo(62, -200); } else { ctx.moveTo(-24, -160); ctx.lineTo(-30, -110); ctx.moveTo(24, -160); ctx.lineTo(30, -110); } ctx.stroke();
    circ(0, -205, 28, '#a0673d'); ctx.fillStyle = '#2a1a1a'; ctx.beginPath(); ctx.arc(0, -210, 29, Math.PI, 0); ctx.fill(); face(0, -204, 12, happy);
    ctx.fillStyle = '#ffd028'; ctx.beginPath(); ctx.moveTo(-24, -228); ctx.lineTo(-24, -258); ctx.lineTo(-12, -242); ctx.lineTo(0, -264); ctx.lineTo(12, -242); ctx.lineTo(24, -258); ctx.lineTo(24, -228); ctx.fill();
  } else if (kind === 'camel') {
    const sw = Math.sin(T * 0.25) * 4;
    rr(-62 + sw * 0.4, -80, 14, 80, 6, '#c99a58'); rr(48 - sw * 0.4, -80, 14, 80, 6, '#c99a58'); rr(-36 - sw * 0.4, -80, 14, 80, 6, '#d8ac68'); rr(22 + sw * 0.4, -80, 14, 80, 6, '#d8ac68');
    ell(0, -110, 80, 40, '#e0b46e'); circ(-22, -156, 30, '#e0b46e'); circ(26, -150, 26, '#e0b46e'); rr(62, -190, 22, 100, 11, '#e0b46e'); ell(92, -202, 30, 22, '#e8c284', 0.1);
    face(90, -206, 8, true); ctx.fillStyle = '#ff7fb5'; rr(-50, -140, 100, 12, 6, happy ? '#ff7fb5' : '#9aa'); ctx.fillStyle = '#c99a58';
  } else if (kind === 'moon') {
    const g = ctx.createRadialGradient(0, -160, 20, 0, -160, 200); g.addColorStop(0, happy ? 'rgba(255,248,190,.9)' : 'rgba(200,205,255,.5)'); g.addColorStop(1, 'rgba(255,248,190,0)'); ctx.fillStyle = g; ctx.fillRect(-210, -360, 420, 400);
    circ(0, -160, 118, happy ? '#fff4b8' : '#d4d8f2'); circ(-50, -190, 18, happy ? '#f6e594' : '#bcc2e6'); circ(46, -120, 24, happy ? '#f6e594' : '#bcc2e6'); circ(60, -200, 12, happy ? '#f6e594' : '#bcc2e6');
    face(0, -160, 30, happy, !happy); if (happy) { circ(-60, -128, 14, 'rgba(255,150,170,.5)'); circ(60, -128, 14, 'rgba(255,150,170,.5)'); }
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
  const dkLegs = IMG.donkeyBody && IMG.donkeyBack && IMG.donkeyFront, dk = dkLegs ? IMG.donkeyBody : (IMG.donkeyFull || IMG.donkeyStand);      // round 3: Noga rides Bil'am (Ghost's leg-split set, else one whole picture, else the unicorn set)
  if (dk) {
    const dh = 195, sc = dh / dk.height, dw = dk.width * sc, left = -dw / 2, top = -dh;      // all pieces share the 914 x 1000 canvas; hips (268,681) and (626,678)
    if (p.wings && (IMG.donkeyWings || IMG.heroWings)) { const im = IMG.donkeyWings || IMG.heroWings, f = 0.72 + 0.28 * Math.sin(T * 0.5), ww = 215, wh = ww * im.height / im.width;
      ctx.save(); ctx.translate(left + 330 * sc, top + 500 * sc); ctx.rotate(-0.12 - 0.12 * Math.sin(T * 0.5)); ctx.scale(1, f); ctx.drawImage(im, -ww / 2, -wh * 0.7, ww, wh); ctx.restore(); }
    if (p.dance > 0 && IMG.donkeyHappy) { const hh = IMG.donkeyHappy; ctx.drawImage(hh, -dh * hh.width / hh.height / 2, -dh, dh * hh.width / hh.height, dh); }      // arms-up pose already has all four legs
    else if (dkLegs) {
      [[IMG.donkeyBack, 268, 681, back], [IMG.donkeyFront, 626, 678, front]].forEach(([im, hx, hy, an]) => { ctx.save(); ctx.translate(left + hx * sc, top + hy * sc); ctx.rotate(an); ctx.drawImage(im, -hx * sc, -hy * sc, dw, dh); ctx.restore(); });
      ctx.drawImage(IMG.donkeyBody, left, top, dw, dh);
    } else { ctx.save(); if (p.on && p.vx) ctx.rotate(Math.sin(p.run) * 0.035); ctx.drawImage(dk, left, top, dw, dh); ctx.restore(); }
  } else if (painted || IMG.heroFull) {
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
  if (p.wings && !dk && !(IMG.heroWings && (painted || IMG.heroFull))) { const f = Math.sin(T * 0.5) * 0.5; ctx.lineWidth = 4; ctx.lineCap = 'round';
    RB.forEach((c, i) => { ctx.strokeStyle = c; ctx.beginPath(); ctx.ellipse(-22 - i * 5, -112 - i * 4, 40 - i * 3, 13, -0.9 + f - i * 0.08, 0, 7); ctx.stroke(); }); }
  if (!dk && !painted && !IMG.heroFull) {
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
/* draw a picture centred at (cx, cy) inside a box of size `box`, keeping its shape (the new pictures are not all square) */
function fit(im, cx, cy, box){ const a = im.width / im.height, w = a >= 1 ? box : box * a, h = a >= 1 ? box / a : box; ctx.drawImage(im, cx - w / 2, cy - h / 2, w, h); }
function drawItem(kind, x, y, col, t){
  const im = IMG['item_' + kind + (col ? '_' + col : '')] || (kind === 'teapot' ? IMG.prop_teapot : null);
  ctx.save(); ctx.translate(x, y + Math.sin(t) * 7);
  circ(0, 0, 40, 'rgba(255,255,255,.28)');
  if (im) { if (kind === 'feather') ctx.rotate(Math.sin(t * 0.6) * 0.18); fit(im, 0, 0, 88); ctx.restore(); return; }
  if (kind === 'feather') { ctx.rotate(-0.6); RB.forEach((c, i) => ell(0, -24 + i * 9, 13 - Math.abs(i - 2.5) * 2.4, 8, c)); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -34); ctx.lineTo(0, 40); ctx.stroke(); }
  else if (kind === 'bubble') { circ(0, 0, 30, COL[col][0]); circ(0, 0, 30, 'rgba(255,255,255,.25)'); ell(-11, -12, 9, 5, 'rgba(255,255,255,.85)', -0.6); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 30, 0, 7); ctx.stroke(); }
  else if (kind === 'gem') { ctx.fillStyle = '#7fd8ff'; ctx.beginPath(); ctx.moveTo(-26, -8); ctx.lineTo(-14, -26); ctx.lineTo(14, -26); ctx.lineTo(26, -8); ctx.lineTo(0, 28); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ff9fd0'; ctx.beginPath(); ctx.moveTo(-26, -8); ctx.lineTo(0, -8); ctx.lineTo(0, 28); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-26, -8); ctx.lineTo(26, -8); ctx.moveTo(-14, -26); ctx.lineTo(0, -8); ctx.lineTo(14, -26); ctx.stroke(); }
  else if (kind === 'moonstar') { star5(0, 0, 32, '#dfe6ff'); star5(-3, -3, 16, '#fff'); }
  else if (kind === 'shootingstar') { ctx.strokeStyle = 'rgba(255,230,130,.7)'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-8, -8); ctx.lineTo(-40, -44); ctx.stroke(); star5(0, 0, 26, '#ffd028'); star5(-3, -3, 10, '#fff6b8'); }
  else if (kind === 'chick') { circ(0, 4, 24, '#ffe14d'); circ(0, -14, 15, '#ffe14d'); ctx.fillStyle = '#ff9f43'; ctx.beginPath(); ctx.moveTo(12, -14); ctx.lineTo(24, -10); ctx.lineTo(12, -6); ctx.fill(); circ(5, -18, 3, '#3a2a3a'); }
  else if (kind === 'numbubble') { circ(0, 0, 36, 'rgba(160,220,255,.5)'); ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 36, 0, 7); ctx.stroke(); ell(-13, -14, 10, 5, 'rgba(255,255,255,.85)', -0.6); }
  else if (kind === 'water_drop') { ctx.fillStyle = '#5fb8ff'; ctx.beginPath(); ctx.moveTo(0, -30); ctx.bezierCurveTo(26, -2, 24, 26, 0, 28); ctx.bezierCurveTo(-24, 26, -26, -2, 0, -30); ctx.fill(); ell(-8, 6, 5, 9, 'rgba(255,255,255,.7)', 0.2); }
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
  const n = L.name, im = (fx && IMG.bg_finale) || IMG['bg_' + n] || (n === 'party' ? IMG.bg_party_fallback : null);
  const sky = { garden: ['#bfe9ff', '#eafff0'], rainbow: ['#ffdff3', '#e6dcff'], forest: ['#cdeccf', '#f4ffd9'], sky: ['#ffb78a', '#f6c7ee'], farm: ['#bfe3ff', '#f1ffe0'], shabbat: ['#ffe2a6', '#fff3d6'], night: ['#1f2a5e', '#4b5fa8'], castle: ['#bfe9ff', '#ffe8f6'], party: ['#bfe9ff', '#ffe8f6'], oasis: ['#ff9f7a', '#ffe9b8'], moon: ['#150f46', '#4a3a9a'] }[n] || ['#bfe9ff', '#eafff0'];
  const gr = ctx.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, sky[0]); gr.addColorStop(1, sky[1]); ctx.fillStyle = gr; ctx.fillRect(0, 0, VW, VH);
  if (im) { const h = VH, w = h * im.width / im.height, off = -((camX * 0.4) % w), by = -camY * 0.4;
    for (let x = off; x < VW; x += w) { if (by > 0) ctx.drawImage(im, 0, 0, im.width, 6, x, 0, w, by + 2); ctx.drawImage(im, x, by, w, h); } }
  else if (n === 'garden') {
    ctx.lineWidth = 16; RB.forEach((c, i) => { ctx.strokeStyle = c; ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.arc(VW * 0.7 - camX * 0.05, G + 60, 430 - i * 16, Math.PI, 0); ctx.stroke(); }); ctx.globalAlpha = 1;
    circ(140 - camX * 0.02, 110, 56, '#fff3a8'); hills(0.15, 420, 50, '#c9efc4', 0.004); hills(0.3, 480, 36, '#a9e3a4', 0.006);
    for (let i = 0; i < 9; i++) { const x = ((i * 370 - camX * 0.2) % (VW + 300) + VW + 300) % (VW + 300) - 150; for (let j = 0; j < 4; j++) circ(x + j * 42, 120 + (i % 3) * 46 - (j % 2) * 12, 34, 'rgba(255,255,255,.85)'); }
  } else if (n === 'rainbow') {
    for (let i = 0; i < 12; i++) { const x = ((i * 310 - camX * (0.15 + (i % 3) * 0.08)) % (VW + 300) + VW + 300) % (VW + 300) - 150; for (let j = 0; j < 4; j++) circ(x + j * 46, 150 + (i % 4) * 90 - (j % 2) * 14, 40, 'rgba(255,255,255,.8)'); }
    for (let i = 0; i < 14; i++) star5(((i * 263 - camX * 0.1) % VW + VW) % VW, 60 + (i * 97) % 300, 7 + Math.sin(T * 0.06 + i) * 3, '#fff8c4');
  } else if (n === 'oasis') {
    circ(VW * 0.72 - camX * 0.02, 150 - camY * 0.2, 90, '#fff1b0'); circ(VW * 0.72 - camX * 0.02, 150 - camY * 0.2, 130, 'rgba(255,241,176,.3)');
    hills(0.1, 430, 50, '#f5c987', 0.004); hills(0.25, 490, 40, '#eab96b', 0.006);
    for (let i = 0; i < 5; i++) { const x = ((i * 520 - camX * 0.3) % (VW + 400) + VW + 400) % (VW + 400) - 200; ctx.strokeStyle = '#7a5a3a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, 520); ctx.quadraticCurveTo(x + 12, 440, x + 4, 380); ctx.stroke(); for (let a = 0; a < 5; a++) { ctx.strokeStyle = '#4c9657'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x + 4, 380); ctx.quadraticCurveTo(x + 4 + Math.cos(a * 1.26 - 0.3) * 40, 350 + Math.sin(a) * 10, x + 4 + Math.cos(a * 1.26 - 0.3) * 70, 390 + Math.abs(Math.sin(a)) * 24); ctx.stroke(); } }
  } else if (n === 'moon') {
    for (let i = 0; i < 40; i++) star5(((i * 197 - camX * 0.08) % VW + VW) % VW, 30 + (i * 83) % 420 - camY * 0.2, 3 + (i % 3) + Math.sin(T * 0.07 + i) * 1.4, '#fff8c4');
    circ(VW * 0.78 - camX * 0.03, 140 - camY * 0.2, 80, '#fff4b8'); circ(VW * 0.78 - camX * 0.03, 140 - camY * 0.2, 118, 'rgba(255,244,184,.25)');
    hills(0.12, 420, 70, '#5b4aa8', 0.004); hills(0.28, 490, 50, '#7b68c8', 0.006);
  } else {
    hills(0.15, 400, 40, '#a8d9a0', 0.005);
    for (let i = 0; i < 16; i++) { const par = 0.25 + (i % 3) * 0.12, x = ((i * 260 - camX * par) % (VW + 300) + VW + 300) % (VW + 300) - 150, w = 44 + (i % 3) * 22; rr(x, -20, w, G + 20, 0, ['#7fae78', '#6f9f6c', '#8bbd82'][i % 3]); circ(x + w / 2, 40 + (i % 4) * 30, 120, 'rgba(120,190,110,.5)'); }
    for (let i = 0; i < 18; i++) circ(((i * 211 - camX * 0.5) % VW + VW) % VW + Math.sin(T * 0.03 + i) * 20, 180 + (i * 53) % 300 + Math.cos(T * 0.04 + i) * 14, 4 + Math.sin(T * 0.1 + i) * 2, 'rgba(255,250,170,.9)');
  }
  // ground: one block per terrain segment; the space between segments is a gap
  ctx.save(); ctx.translate(-camX, -camY);
  if (n !== 'rainbow') (L.gaps || []).forEach(g => { const wg = ctx.createLinearGradient(0, G + 20, 0, VH); const gc = { oasis: ['#d9a35c', '#a8743a'], moon: ['#8b7ad8', '#4a3a9a'] }[n] || ['#7fd0ff', '#3d9be0']; wg.addColorStop(0, gc[0]); wg.addColorStop(1, gc[1]); ctx.fillStyle = wg; ctx.fillRect(g.x - 2, G + 28, g.w + 4, VH);
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let x = g.x + 6; x < g.x + g.w - 6; x += 10) ctx.lineTo(x, G + 40 + k * 22 + Math.sin(T * 0.07 + x * 0.1 + k) * 3); ctx.stroke(); } });
  terr.forEach(sg => { if (sg.slide && !sg.base) return; const x0 = sg.x0, x1 = sg.x1, top = sg.top;
    if (n === 'rainbow') { RB.forEach((c, i) => rr(x0, top + i * 12, x1 - x0, 14, i ? 0 : 7, c)); rr(x0, top + 72, x1 - x0, VH, 0, '#fff');
      for (let x = x0 + 40; x < x1; x += 90) circ(x, top + 84, 46, '#fff'); }
    else { const c = { garden: ['#7fd58a', '#63bd72', '#c59a6d'], sky: ['#ffd1ec', '#f6b0da', '#d58fbf'], farm: ['#8ccf6a', '#6fb556', '#7a5a3c'], shabbat: ['#e6c866', '#d1a84d', '#a8794a'], night: ['#5a78bc', '#4562a6', '#2c3f78'], castle: ['#8fdc8a', '#6fc873', '#9a7a56'], party: ['#8fdc8a', '#6fc873', '#9a7a56'], oasis: ['#f2d391', '#e3b96a', '#c99a52'], moon: ['#9d8ae0', '#7c69c8', '#4a3a9a'] }[n] || ['#5fae68', '#4c9657', '#8f6d4b'];
      if (sg.top1 !== undefined) { const t1 = sg.top1, poly = (a, b, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x0, top + a); ctx.lineTo(x1, t1 + a); ctx.lineTo(x1, t1 + b); ctx.lineTo(x0, top + b); ctx.fill(); };
        poly(0, VH, c[2]); poly(-4, 36, c[0]); poly(22, 36, c[1]); }
      else { rr(x0, top, x1 - x0, VH, 0, c[2]); rr(x0, top - 4, x1 - x0, 40, 10, c[0]); rr(x0, top + 22, x1 - x0, 14, 0, c[1]); }
      if (n !== 'oasis' && n !== 'moon') for (let x = Math.ceil(x0 / 130) * 130 + 40; x < x1 - 20; x += 130) { const k = (x * 7) % 5; ctx.fillStyle = '#4c9657'; { const fy = tAt(sg, x); ctx.fillRect(x - 1, fy - 22, 3, 20); circ(x, fy - 26, 8, RB[k]); circ(x, fy - 26, 3.5, '#fff7c4'); } } }
  });
  ctx.restore();
}

/* ---------- drawing: stations, props, pocket ---------- */
function pic(im, cx, bottom, w, sq){ const h = w * im.height / im.width * (sq || 1); ctx.drawImage(im, cx - w / 2, bottom - h, w, h); return h; }
function groups(){ const g = []; items.forEach(it => { if (it.nochip) return; const k = it.grp || it.kind || L.collect; let e = g.find(x => x.k === k); if (!e) { e = { k, kind: it.kind || L.collect, col: it.col, n: 0, got: 0 }; g.push(e); } e.n++; if (it.got) e.got++; }); return g; }
function drawProps(){
  (L.mud || []).forEach(m => { const im = IMG.prop_mud; if (im) pic(im, m.x + m.w / 2, G + 22, m.w * 1.08); else ell(m.x + m.w / 2, G + 4, m.w / 2, 14, '#8a6a46'); });
  (L.props || []).forEach(o => { const im = IMG['prop_' + o.k]; if (im) pic(im, o.x, G + 4, o.w); });
  if (L.slide && said.slfx > 0 && IMG.prop_slide_end) { ctx.globalAlpha = Math.min(1, said.slfx / 20); pic(IMG.prop_slide_end, L.slide.b + 70, G + 6, 240); ctx.globalAlpha = 1; }
  (L.pads || []).forEach(pd => { const cx = pd.x + pd.w / 2; if (pd.sq > 0) pd.sq--;     // the trampoline (it was Bobo the dog before round 3); Bobo is the fallback if the picture is missing
    const im = pd.sq > 0 && IMG.prop_trampoline_squash || IMG.prop_trampoline;
    if (im) pic(im, cx, G + 6, pd.w * 1.3);
    else { const dip = pd.sq > 0 ? 12 : 0, tx = pd.w / 2 + 14, ty = pd.top + dip;      // canvas trampoline until Ghost's picture arrives: pastel frame, springs, bouncy mat
      ctx.save(); ctx.translate(cx, 0); ctx.strokeStyle = '#8f6bd0'; ctx.lineWidth = 6; ctx.lineCap = 'round';
      [-0.8, -0.4, 0, 0.4, 0.8].forEach(k => { ctx.beginPath(); ctx.moveTo(k * tx, ty + 6); for (let i = 1; i <= 5; i++) ctx.lineTo(k * tx + (i % 2 ? 7 : -7), ty + 6 + i * ((G + 4 - ty - 6) / 5)); ctx.stroke(); });
      rr(-tx - 6, G - 10, 12, 14, 5, '#ff8fc7'); rr(tx - 6, G - 10, 12, 14, 5, '#ff8fc7');
      ell(0, ty + 3, tx + 8, 13, '#ff8fc7'); ell(0, ty, tx, 10, '#ffe14d'); ell(0, ty - 1, tx - 22, 5, 'rgba(255,255,255,.55)'); ctx.restore(); } });
  (L.drafts || []).forEach(d => { const im = IMG.prop_windswirl, g = ctx.createLinearGradient(0, G, 0, G - d.h); g.addColorStop(0, 'rgba(200,240,255,.38)'); g.addColorStop(1, 'rgba(200,240,255,0)'); ctx.fillStyle = g; ctx.fillRect(d.x, G - d.h, d.w, d.h);
    for (let i = 0; i < 6; i++) { const y = G - ((T * 2.2 + i * d.h / 6) % d.h), a = 1 - (G - y) / d.h, x = d.x + d.w / 2 + Math.sin(T * 0.06 + i * 2) * d.w * 0.3;
      ctx.globalAlpha = a * 0.9; if (im) pic(im, x, y + 60, 120); else { ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, 22, 0.3, 4.6); ctx.stroke(); star5(x + 26, y - 14, 5, '#fff'); } ctx.globalAlpha = 1; } });
  if (L.lights) items.forEach(it => { if (it.got) { const g = ctx.createRadialGradient(it.x + 380, G - 40, 40, it.x + 380, G - 40, 520); g.addColorStop(0, 'rgba(255,244,170,.38)'); g.addColorStop(1, 'rgba(255,244,170,0)'); ctx.fillStyle = g; ctx.fillRect(it.x - 160, G - 560, 1080, 700); } });
}
/* round 7: a friend or a place that asks for something shows a thought bubble with the wished thing inside until it has it */
function drawWishes(){
  sts.forEach(st => { if (!st.wish || st.done || Math.abs(p.x - st.x) > 1100) return;
    const bx = st.x + (st.wx || 0), by = G - (st.wy || 310) + Math.sin(T * 0.06 + st.x) * 6, im = IMG.prop_thought, wi = IMG['item_' + st.wish];
    if (im) fit(im, bx, by, 190); else { ell(bx, by, 80, 62, 'rgba(255,255,255,.92)'); circ(bx - 50, by + 62, 9, 'rgba(255,255,255,.92)'); circ(bx - 66, by + 82, 5, 'rgba(255,255,255,.92)'); }
    if (wi) fit(wi, bx + 2, by - 14, 84); else drawItem(st.wish, bx + 2, by - 14, null, 0); });
}
function drawStations(){
  sts.forEach(st => { const x = st.x, k = st.kind;
    if (k === 'cloud') { const im = IMG.prop_cotton_candy_platform, w = 640, top = G - 340; if (im) pic(im, x, top + 210, w); else ell(x, top + 110, 300, 90, '#ffb3d9');
      for (let i = 0; i < 3; i++) { const ux = x + (i - 1) * 200;
        if (i < st.have) drawFriend('cloudunicorn', ux, top + 70 + Math.sin(T * 0.06 + i * 2) * 8, true, { bounce: true });
        else { ctx.fillStyle = '#ffd84d'; ctx.beginPath(); ctx.moveTo(ux - 12, top + 52); ctx.lineTo(ux, top + 4); ctx.lineTo(ux + 12, top + 52); ctx.fill(); const wag = Math.sin(T * 0.25 + i) * 10; ctx.strokeStyle = '#ff8fc7'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ux + 40, top + 80); ctx.quadraticCurveTo(ux + 60 + wag, top + 50, ux + 52 + wag, top + 30); ctx.stroke(); } } }
    else if (k === 'bridge') { const im = IMG.prop_plank_bridge, w = 440; if (im && st.have > 0) { const f = Math.min(1, st.have / st.need), h = w * im.height / im.width * 0.5; ctx.drawImage(im, 0, 0, im.width * f, im.height, x - w / 2, G + 8 - h, w * f, h); }
      else if (!im && st.have > 0) rr(x - 220, G - 20, 440 * st.have / st.need, 24, 6, '#c58a4a'); }
    else if (k === 'mill') { const im = IMG.prop_mill; if (im) pic(im, x, G + 4, 230); else { ell(x, G - 40, 80, 40, '#9a9aa6'); rr(x - 60, G - 20, 120, 20, 6, '#a0673a'); }
      for (let i = 0; i < st.need; i++) circ(x - (st.need - 1) * 15 + i * 30, G - 220, 9, i < st.have ? '#ffd028' : 'rgba(255,255,255,.7)'); }
    else if (k === 'bowl') { const im = IMG[st.have >= st.need ? 'prop_bowl_dough' : 'prop_bowl']; if (im) pic(im, x, G + 4, 170); for (let i = 0; i < st.need; i++) circ(x - 30 + i * 30, G - 130, 9, i < st.have ? '#ffd028' : 'rgba(255,255,255,.7)'); }
    else if (k === 'pot') { const im = IMG.prop_teapot; if (!st.done) { if (im) pic(im, x, G + 4, 190); else { ell(x, G - 50, 70, 50, '#ff9fc7'); rr(x + 50, G - 70, 50, 14, 6, '#ff9fc7'); }
      for (let i = 0; i < st.need; i++) circ(x - (st.need - 1) * 15 + i * 30, G - 190, 9, i < st.have ? '#ffd028' : 'rgba(255,255,255,.7)'); } }
    else if (k === 'fire') { ell(x, G - 6, 78, 16, 'rgba(0,0,0,.18)');      // a camp fire on stones; the teapot sits on it once she has put it there
      for (let i = 0; i < 7; i++) { const a = i / 7 * 6.283; circ(x + Math.cos(a) * 56, G - 14 + Math.sin(a) * 9, 17, i % 2 ? '#8e8a98' : '#a9a4b4'); }
      for (let i = 0; i < 3; i++) { const fh = 70 + Math.sin(T * 0.3 + i * 2) * 14 - Math.abs(i - 1) * 18, fx = x + (i - 1) * 24; ctx.fillStyle = i === 1 ? '#ffd028' : '#ff8a3d'; ctx.beginPath(); ctx.moveTo(fx - 20, G - 14); ctx.quadraticCurveTo(fx - 12, G - 14 - fh * 0.6, fx + Math.sin(T * 0.2 + i) * 6, G - 14 - fh); ctx.quadraticCurveTo(fx + 12, G - 14 - fh * 0.6, fx + 20, G - 14); ctx.fill(); }
      if (st.done) { const im = IMG.prop_teapot; if (im) pic(im, x, G - 52, 170); else ell(x, G - 120, 60, 44, '#ff9fc7'); for (let i = 0; i < 3; i++) circ(x - 20 + i * 20, G - 215 - ((T * 1.4 + i * 25) % 70), 9, 'rgba(255,255,255,.75)'); } }
    else if (k === 'oven') { const im = IMG[st.done ? 'prop_oven_lit' : 'prop_oven']; if (im) pic(im, x, G + 4, 270); if (st.armed > 0) for (let i = 0; i < 3; i++) circ(x - 20 + i * 20, G - 250 - ((T * 1.5 + i * 25) % 70), 10, 'rgba(255,255,255,.7)'); }
    else if (k === 'candles') { const im = IMG[st.done ? 'prop_candle_lit' : 'prop_candle_unlit']; if (im) pic(im, x, G + 2, 150);
      for (let i = 0; i < 2; i++) { const sx = st.done ? x - 26 + i * 52 : x + Math.cos(T * 0.03 + i * 3.1) * 180, sy = st.done ? G - 140 : G - 200 + Math.sin(T * 0.05 + i * 2) * 60; drawItem('spark', sx, sy, null, T * 0.1 + i); } }
    else if (k === 'table') { const im = IMG[st.img || 'prop_plank_bridge']; if (im) pic(im, x, G + 6, st.img ? 380 : 420); else rr(x - 200, G - 110, 400, 40, 8, '#c58a4a'); const sh = [].concat(st.show || 'challah'); if (st.done) sh.forEach((k2, i) => drawItem(k2, x + (i - (sh.length - 1) / 2) * 110, G - 170, null, T * 0.04 + i)); else for (let i = 0; i < st.need; i++) circ(x - (st.need - 1) * 15 + i * 30, G - 240, 9, i < st.have ? '#ffd028' : 'rgba(255,255,255,.7)'); }
    else if (k === 'bilam') { drawFriend('bilam', x, G, st.done, { face: -1, bounce: st.done }); for (let i = 0; i < st.need; i++) circ(x - 45 + i * 30, G - 210, 9, i < st.have ? '#ff9f43' : 'rgba(255,255,255,.7)'); }
    else if (k === 'plate') { const im = IMG.item_gift_plate; if (im) pic(im, x, G - 8, 82); else ell(x, G - 30, 40, 14, '#fff'); const ic = IMG['item_' + st.icon]; ctx.globalAlpha = st.done ? 1 : 0.32; if (ic) ctx.drawImage(ic, x - 24, G - 66, 48, 48); ctx.globalAlpha = 1; if (st.done) circ(x, G - 80, 6 + Math.sin(T * 0.2 + x) * 2, '#ffe14d'); }
    else if (k === 'grow') { const im = IMG.prop_vegetable_bed; if (im) pic(im, x, G + 6, 380); else rr(x - 170, G - 40, 340, 44, 12, '#8a6a46');
      for (let i = 0; i < st.need; i++) { const gx = x - 80 + i * 160, on = i < st.have, sw = Math.sin(T * 0.08 + i) * 4;
        if (on) { ctx.strokeStyle = '#4fae5a'; ctx.lineWidth = 6; ctx.lineCap = 'round'; [-22, 0, 22].forEach(o => { ctx.beginPath(); ctx.moveTo(gx, G - 44); ctx.quadraticCurveTo(gx + o * 0.5 + sw, G - 84, gx + o + sw, G - 116 + Math.abs(o) * 0.5); ctx.stroke(); }); if (st.done) drawItem('carrot', gx, G - 62, null, T * 0.05); }
        else circ(gx, G - 110 + Math.sin(T * 0.08 + i) * 4, 9, 'rgba(255,255,255,.7)'); }
      if (st.done) for (let i = 0; i < 3; i++) star5(x - 80 + i * 80, G - 160 - ((T * 1.2 + i * 20) % 50), 8, '#ffe14d'); }
    else if (k === 'count') st.pts.forEach((q, i) => { if (i < st.n) return; const im = IMG.item_numbubble, nx = i === st.n, wb = st.wob[i] > 0 ? Math.sin(st.wob[i] * 0.8) * 8 : 0, sz = nx ? 112 + Math.sin(T * 0.15) * 6 : 96;
      ctx.save(); ctx.translate(q[0] + wb, q[1] + Math.sin(T * 0.06 + i) * 6); if (nx) circ(0, 0, 66, 'rgba(255,255,160,.35)'); if (im) fit(im, 0, 0, sz); else drawItem('numbubble', 0, 0, null, 0);
      ctx.fillStyle = '#b0409a'; ctx.font = 'bold 52px "Comic Sans MS", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(i + 1), 0, 4); ctx.restore(); });
    else if (k === 'rain') st.drops.forEach(d => { const im = IMG.item_shootingstar; ctx.save(); ctx.translate(d.x, d.y); circ(0, 0, 40, 'rgba(255,240,150,.3)'); if (im) fit(im, 0, 0, 100); else drawItem('shootingstar', 0, 0, null, 0); ctx.restore(); });
    else if (k === 'seek' && st.what === 'peek') st.pts.forEach((x, i) => { const pk = IMG['peek_' + st.peeks[i % st.peeks.length]], bi = IMG['prop_' + st.mounds[i % st.mounds.length]], up = st.rev[i] ? Math.min(1, st.rev[i] / 18) : 0;     // hide and seek: a friend peeks out of a bush, touch the bush
      if (st.rev[i]) st.rev[i] += 1;
      if (pk) { const by = G - 118 - 70 * up - (st.rev[i] ? Math.abs(Math.sin(st.rev[i] * 0.12)) * 14 : Math.sin(T * 0.08 + i) * 4); fit(pk, x + (st.rev[i] ? 20 : 0), by, st.rev[i] ? 170 : 150); }
      if (bi) pic(bi, x, G + 6, 215); else { ell(x, G - 50, 100, 55, '#6fbf5e'); ell(x - 35, G - 70, 50, 38, '#86d06f'); }
      if (!st.rev[i] && Math.abs(p.x - x) < 700) { const tw = (Math.sin(T * 0.12 + i) + 1) / 2; star5(x + 70, G - 150 - tw * 6, 7 + tw * 4, 'rgba(255,255,255,.9)'); } });
    else if (k === 'seek') st.pts.forEach((x, i) => { const mi = IMG['prop_' + st.mound]; if (mi) pic(mi, x, G + 6, st.mound === 'haybale' ? 140 : 190); else if (st.mound === 'haybale') { ell(x, G - 34, 66, 38, '#e6c35a'); ctx.strokeStyle = '#c9a23c'; ctx.lineWidth = 3; for (let j = -2; j <= 2; j++) { ctx.beginPath(); ctx.moveTo(x + j * 22, G - 62); ctx.lineTo(x + j * 26, G - 6); ctx.stroke(); } } else ell(x, G - 22, 84, 30, '#e8c27a');
      if (st.rev[i]) { st.rev[i] += 1; const up = Math.min(1, st.rev[i] / 18); drawItem(st.what, x + 30 + Math.sin(st.rev[i] * 0.1) * 4, G - 36 - 60 * up - Math.abs(Math.sin(st.rev[i] * 0.12)) * 10, null, T * 0.05); }
      else if (Math.abs(p.x - x) < 700) { const tw = (Math.sin(T * 0.12 + i) + 1) / 2; star5(x + 44, G - 60 - tw * 6, 7 + tw * 4, 'rgba(255,255,255,.9)'); } });
    else if (k === 'simon') { for (let i = 0; i < 4; i++) { const lx = lanternX(st, i), col = ['red', 'blue', 'green', 'yellow'][i], lit = st.lit[i] > 0 || st.on[i], im = IMG['prop_lantern_' + col + (lit ? '_lit' : '')], sh = st.shake > 0 ? Math.sin(st.shake * 1.2) * 5 : 0;
        ctx.save(); ctx.translate(lx + sh, 0);
        if (lit) { const g = ctx.createRadialGradient(0, G - 130, 10, 0, G - 130, 130); g.addColorStop(0, 'rgba(255,244,170,.7)'); g.addColorStop(1, 'rgba(255,244,170,0)'); ctx.fillStyle = g; ctx.fillRect(-140, G - 270, 280, 280); }
        if (im) { const lh = 170; ctx.drawImage(im, -lh * im.width / im.height / 2, G + 4 - lh, lh * im.width / im.height, lh); } else { ctx.fillStyle = '#7a5a3a'; ctx.fillRect(-3, G - 100, 6, 104); const c = COL[col][0]; ell(0, G - 150, 36, 46, lit ? c : 'rgba(80,80,110,.8)'); ell(0, G - 150, 36, 46, lit ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.15)'); rr(-22, G - 200, 44, 10, 5, '#7a5a3a'); rr(-22, G - 106, 44, 10, 5, '#7a5a3a'); }
        if (st.phase === 'input' && st.ign !== i && st.stand > 0 && st.prev === i) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, G - 150, 62, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(1, st.stand / 12)); ctx.stroke(); }
        ctx.restore(); } }
    else if (k === 'rhythm') { const near = Math.abs(p.x - st.x) < 900, fy = G - 230; if (near) {
        const ph = st.clock % 64, until = st.active ? (64 - ph) % 64 : 0, rad = st.active ? 46 + until * 1.5 : 46 + Math.sin(T * 0.1) * 5;
        ell(st.x, G - 4, 90, 14, st.active ? 'rgba(255,143,199,.55)' : 'rgba(255,143,199,.3)');
        ctx.lineWidth = 8; ctx.strokeStyle = st.fb > 0 ? '#6fdc8c' : st.fb < 0 ? '#ff8a8a' : '#ffd028'; ctx.beginPath(); ctx.arc(st.x, fy, 46, 0, 7); ctx.stroke();
        if (st.active) { ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(st.x, fy, rad, 0, 7); ctx.stroke(); }
        circ(st.x, fy, 30 + (st.fb > 0 ? st.fb * 0.5 : 0), st.fb > 0 ? 'rgba(111,220,140,.55)' : 'rgba(255,143,199,.35)');
        ctx.fillStyle = '#b0409a'; ctx.font = 'bold 34px "Comic Sans MS", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('\u266B', st.x, fy + 2);
        for (let i = 0; i < st.need; i++) circ(st.x - (st.need - 1) * 17 + i * 34, fy - 74, 10, i < st.hits ? '#ffd028' : 'rgba(255,255,255,.7)'); } }
    else if (k === 'well') { const im = IMG[st.done ? 'prop_well_full' : 'prop_well'];
      if (im) pic(im, x, G + 6, 300); else { rr(x - 90, G - 110, 180, 114, 20, '#b9b3c4'); rr(x - 70, G - 112, 140, 30, 14, st.done ? '#7fd0ff' : '#5a5560'); rr(x - 100, G - 190, 12, 84, 4, '#8f623f'); rr(x + 88, G - 190, 12, 84, 4, '#8f623f'); rr(x - 112, G - 204, 224, 18, 8, '#c58a4a'); if (!st.done) rr(x - 12, G - 160, 24, 24, 6, '#8a6a46'); }
      for (let i = 0; i < st.need; i++) circ(x - 30 + i * 30, G - 230, 9, i < st.have ? '#5fb8ff' : 'rgba(255,255,255,.7)');
      if (st.done) for (let i = 0; i < 3; i++) circ(x - 20 + i * 20, G - 120 - ((T * 1.2 + i * 20) % 60), 6, 'rgba(160,225,255,.8)'); }
    else if (k === 'riddle' && st.asked && !st.done) st.objs.forEach(o => { const im = IMG['riddle_' + o.k]; ctx.save(); ctx.translate(o.x, G); ctx.rotate(o.wob > 0 ? Math.sin(o.wob * 0.5) * 0.25 : 0); if (im) pic(im, 0, 4, 130); else circ(0, -50, 50, COL[o.col] ? COL[o.col][0] : '#6fdc8c'); ctx.restore(); });
  });
}
function drawPocket(){
  if (!L.carry) return; const x0 = bonus.length ? 196 : 18, y0 = bonus.length ? 98 : 98, w = 56 + 4 * 56;
  rr(x0, y0, w, 54, 27, 'rgba(255,255,255,.78)');
  for (let i = 0; i < 4; i++) circ(x0 + 78 + i * 56, y0 + 27, 22, 'rgba(176,64,154,.14)');
  ctx.fillStyle = '#b0409a'; ctx.font = 'bold 26px "Comic Sans MS", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('\u{1F392}', x0 + 28, y0 + 29);
  pocket.forEach((it, i) => { ctx.save(); ctx.translate(x0 + 78 + i * 56, y0 + 27 + Math.sin(T * 0.1 + i) * 2); ctx.scale(0.44, 0.44); drawItem(it.kind || L.collect, 0, 0, it.col, 0); ctx.restore(); });
}

/* small counters for the little games (what she has done / has to do) */
function drawChips(){
  let cx = 18; const cy = 162;
  sts.forEach(st => { if (st.done || !(st.kind === 'count' || st.kind === 'rain' || st.kind === 'seek' || st.kind === 'rhythm')) return;
    const n = st.kind === 'rhythm' ? st.hits : st.n; if (st.kind === 'rhythm' && !st.active) return;
    rr(cx, cy, 150, 54, 27, 'rgba(255,255,255,.78)'); ctx.save(); ctx.translate(cx + 34, cy + 27); ctx.scale(0.5, 0.5);
    if (st.kind === 'seek') drawItem(st.what, 0, 0, null, 0); else if (st.kind === 'rain') drawItem('shootingstar', 0, 0, null, 0); else if (st.kind === 'count') drawItem('numbubble', 0, 0, null, 0); else { ctx.fillStyle = '#b0409a'; ctx.font = 'bold 60px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('\u266B', 0, 0); }
    ctx.restore(); ctx.fillStyle = '#b0409a'; ctx.font = 'bold 30px "Comic Sans MS", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(n + ' / ' + st.need, cx + 66, cy + 29); cx += 160; });
}

/* ---------- draw everything ---------- */
function draw(){
  ctx.setTransform(S, 0, 0, S, 0, 0);
  drawWorld();
  ctx.save(); ctx.translate(-camX, -camY);
  drawProps();
  flowers.forEach(f => { const k = Math.min(1, f.t / 20); ctx.fillStyle = '#4c9657'; ctx.fillRect(f.x - 2, G - 34 * k, 4, 34 * k); for (let a = 0; a < 5; a++) circ(f.x + Math.cos(a * 1.257) * 11 * k, G - 36 * k + Math.sin(a * 1.257) * 11 * k, 8 * k, f.c); circ(f.x, G - 36 * k, 6 * k, '#fff7c4'); });
  (L.decos || []).forEach(d => { if (d.kind === 'mamabird') { rr(d.x - 16, d.y, 32, G - d.y, 12, '#9a6a45'); circ(d.x - 30, d.y - 30, 70, '#7fcf7a'); circ(d.x + 40, d.y - 10, 60, '#63bd69'); rr(d.x - 90, d.y, 110, 14, 7, '#9a6a45'); drawFriend(d.kind, d.x - 50, d.y + 2, true); }
    else if (!((d.kind === 'pitzi' || d.kind === 'camel') && followers.find(f => f.kind === d.kind))) { const hp = d.hap ? !!(sts.find(s => s.id === d.hap) || {}).done : d.happy; drawFriend(d.kind, d.x, d.y || G, hp, { bounce: d.kind === 'pitzi' || (d.hap && hp), face: d.kind === 'camel' ? -1 : 1 }); } });
  meets.forEach(m => { const hy = m.hop > 0 ? Math.abs(Math.sin(m.hop * 0.25)) * 60 : 0; drawFriend(m.kind, m.x, G - hy, m.done, { bounce: m.done, face: p.x < m.x ? -1 : 1 });
    if (!m.done) { const by = G - (FH[m.kind] || 100) - 70 + Math.sin(T * 0.1) * 6; circ(m.x, by, 34, 'rgba(255,255,255,.9)'); ctx.fillStyle = '#ff5fa8'; ctx.font = 'bold 40px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(m.do === 'dance' ? '♪' : '↑', m.x, by + 14); } });
  plats.forEach(drawPlat);
  drawStations(); drawWishes();
  // the friend she is helping
  const fr = L.friend, fy = G - (fr.on || 0);
  if (fin && L.fireworks && IMG.prop_party_firework) { ctx.globalAlpha = Math.min(1, fin.t / 40) * 0.95; const w = 1100, h = w * 1024 / 1536; ctx.drawImage(IMG.prop_party_firework, fr.x - w / 2, G - 130 - h, w, h); ctx.globalAlpha = 1; }
  if (fin && L.lights && IMG.prop_shadow_stage) { ctx.globalAlpha = Math.min(1, fin.t / 50) * 0.9; const w = 760, h = w * 887 / 1774; ctx.drawImage(IMG.prop_shadow_stage, fr.x - w / 2 - 330, G - 30 - h, w, h); ctx.globalAlpha = 1; }
  if (!(fin && fr.kind === 'bird')) { if (fr.kind !== 'pitzi' || !followers.find(f => f.kind === 'pitzi') ) drawFriend(fr.kind, fr.x, fy, fr.happy, { bloom: fr.bloom, bounce: fr.happy && fr.kind !== 'tree', face: fr.kind === 'tree' ? 1 : -1 }); }
  else { const a = fin.t * 0.05, r = Math.min(150, fin.t * 1.4); drawFriend('bird', fr.x + Math.sin(a) * r, fy - 60 - (1 - Math.cos(a)) * r * 0.7, true, { face: Math.cos(a) > 0 ? 1 : -1 }); }
  if (!fr.happy && got < items.length) {      // thought bubble: what the friend needs
    const bx = fr.x - 30, by = fy - (FH[fr.kind] || 100) - 70; circ(bx, by, 46, 'rgba(255,255,255,.95)'); circ(bx + 30, by + 46, 10, 'rgba(255,255,255,.95)'); circ(bx + 42, by + 64, 6, 'rgba(255,255,255,.95)');
    ctx.save(); ctx.translate(bx, by); ctx.scale(0.75, 0.75); { const w = items.find(o => !o.got && !o.hidden) || items.find(o => !o.got) || {}; drawItem(w.kind || L.collect, 0, 0, w.col, 0); } ctx.restore(); }
  if (fin && L.name === 'rainbow') items.forEach((it, i) => drawItem('bubble', fr.x + Math.cos(fin.t * 0.06 + i * 1.57) * 150, G - 110 + Math.sin(fin.t * 0.06 + i * 1.57) * 80, it.col, 0));
  stars.forEach(st => { if (!st.got && IMG.item_star) { const bob = Math.sin(T * 0.08 + st.x) * 5; circ(st.x, st.y + bob, 34, 'rgba(255,240,150,.35)'); ctx.drawImage(IMG.item_star, st.x - 38, st.y + bob - 38, 76, 76); } else if (!st.got) { circ(st.x, st.y, 30, 'rgba(255,240,150,.35)'); star5(st.x, st.y + Math.sin(T * 0.08 + st.x) * 5, 22, '#ffd028'); star5(st.x - 4, st.y - 4 + Math.sin(T * 0.08 + st.x) * 5, 8, '#fff6b8'); } });
  bonus.forEach((b, i) => { if (!b.got && b.x > camX - 60 && b.x < camX + VW + 60) { const yy = b.y + Math.sin(T * 0.09 + i) * 4; circ(b.x, yy, 24, 'rgba(255,240,150,.4)'); star5(b.x, yy, 17, '#ffd028'); star5(b.x - 3, yy - 3, 6, '#fff6b8'); } });
  items.forEach(it => { if (!it.got && !it.hidden) drawItem(it.kind || L.collect, it.x, it.y, it.col, it.bob); });
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
  { const ua = IMG.ufly_a || IMG.cloudunicorn_happy, ub = IMG.ufly_b || ua, uh = IMG.ufly_happy || ua;     // the little unicorn flies above Noga's head (round 3: it took the bird's old place)
    if (ua) { const im = p.dance > 0 || fin ? uh : (T % 16 < 8 ? ua : ub), h = hist[Math.max(0, hist.length - 1 - 8)] || { x: p.x - 20, f: 1 }, w = 150, ih = w * im.height / im.width;
      ctx.save(); ctx.translate(h.x - 10 * (h.f || 1), p.y - 250 - Math.sin(T * 0.09) * 12); if ((h.f || 1) < 0) ctx.scale(-1, 1); ctx.drawImage(im, -w / 2, -ih / 2, w, ih); ctx.restore(); } }
  parts.forEach(q => { ctx.globalAlpha = clamp(q.life, 0, 1); if (q.shape === 'star') star5(q.x, q.y, q.s, q.c); else if (q.shape === 'petal') ell(q.x, q.y, q.s, q.s * 0.6, q.c, q.x * 0.05 + T * 0.05); else circ(q.x, q.y, q.s, q.c); }); ctx.globalAlpha = 1;
  ctx.restore();
  // top bar: what she is collecting, and the star meter
  if (items.length <= 6) { rr(18, 14, 34 + items.length * 62, 76, 38, 'rgba(255,255,255,.75)');
    items.forEach((it, i) => { ctx.save(); ctx.translate(66 + i * 62, 52); ctx.scale(0.72, 0.72); ctx.globalAlpha = i < got ? 1 : 0.28; drawItem(it.kind || L.collect, 0, 0, it.col, 0); ctx.restore(); }); }
  else { let gx = 18; groups().forEach(g => { rr(gx, 14, 150, 76, 38, g.got === g.n ? 'rgba(200,255,210,.85)' : 'rgba(255,255,255,.75)'); ctx.save(); ctx.translate(gx + 44, 52); ctx.scale(0.72, 0.72); drawItem(g.kind, 0, 0, g.col, 0); ctx.restore();
      ctx.fillStyle = '#b0409a'; ctx.font = 'bold 30px "Comic Sans MS", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(g.got + '/' + g.n, gx + 82, 54); gx += 160; }); }
  drawPocket(); drawChips();
  if (bonus.length) { const ok = starsOK(); rr(18, 98, 170, 54, 27, ok ? 'rgba(200,255,210,.85)' : 'rgba(255,255,255,.75)'); star5(50, 125, 19, '#ffd028'); ctx.fillStyle = '#b0409a'; ctx.font = 'bold 30px "Comic Sans MS", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(bonusN + ' / ' + (L.need || '?'), 78, 127); }
  // the goal of the level, big on the screen for the first seconds
  if (T < 420 && !fin) { const a = T < 360 ? 1 : 1 - (T - 360) / 60, cx = VW / 2, cy = 215, gs = groups(), w = 140 + gs.length * 190 + 170; ctx.globalAlpha = a;
    const fit = Math.min(1, (VW - 30) / w); ctx.save(); ctx.translate(cx, cy); ctx.scale(fit, fit); ctx.translate(-cx, -cy);
    rr(cx - w / 2, cy - 75, w, 150, 40, 'rgba(255,255,255,.88)');
    ctx.fillStyle = '#b0409a'; ctx.font = 'bold 64px "Comic Sans MS", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    let gx = cx - w / 2 + 70; gs.forEach(g => { ctx.save(); ctx.translate(gx, cy); ctx.scale(1.1, 1.1); drawItem(g.kind, 0, 0, g.col, 0); ctx.restore(); ctx.fillText('×' + g.n, gx + 58, cy + 4); gx += 190; });
    star5(gx + 10, cy, 44, '#ffd028'); ctx.fillText('×' + (L.need || 0), gx + 75, cy + 4);
    ctx.restore(); ctx.globalAlpha = 1; }
  if (stars.length) { rr(VW - 232, 14, 214, 76, 38, 'rgba(255,255,255,.75)'); for (let i = 0; i < 3; i++) star5(VW - 185 + i * 60, 52, 24 + (meter >= 3 ? Math.sin(T * 0.2 + i) * 3 : 0), i < meter ? '#ffd028' : 'rgba(170,170,190,.45)'); }
}

/* ---------- loop ---------- */
let lastT = 0;
function frame(now){
  const dt = Math.min(2.5, (now - lastT) / 16.67 || 1); lastT = now;
  if (mode === 'play') { update(dt); draw(); } else if (mode === 'finale' || (mode === 'end' && fx)) { finaleUpdate(dt); drawFinale(); } else if (mode === 'end' && L) draw();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);


/* ---------- the Love Party (after stage 11): every friend she met comes, they dance together under fireworks and hearts; tap the screen for a firework, the Dance button makes her dance ---------- */
let hearts = [];
const HEART_COL = ['#ff5f8f', '#ff8fc7', '#ffd028', '#ff6f6f', '#c58aff'];
function heartPath(x, y, r){ ctx.beginPath(); ctx.moveTo(x, y + r * 0.9); ctx.bezierCurveTo(x - r * 1.5, y - r * 0.1, x - r * 0.9, y - r * 1.2, x, y - r * 0.4); ctx.bezierCurveTo(x + r * 0.9, y - r * 1.2, x + r * 1.5, y - r * 0.1, x, y + r * 0.9); ctx.closePath(); }
function guestList(){ const a = []; LEVELS.forEach(lv => lv.joins.concat([lv.friend.kind]).forEach(k => { if (k !== 'tree' && !a.includes(k)) a.push(k); })); ['shluli', 'grandpa'].forEach(k => { if (!a.includes(k)) a.push(k); }); return a; }
function startFinale(){
  mode = 'finale'; showButtons(); glow(null); Voice.hush(); Song.play('finale'); fx = { t: 0, fw: [], say: {}, last: 0 };
  camX = Math.max(0, L.len - VW); camY = 0; const cx = camX + VW / 2;
  const kinds = guestList(); fx.g = kinds.map((k, i) => { const back = i % 2 === 0, row = kinds.filter((o, j) => j % 2 === i % 2), j = row.indexOf(k), f = (j + 0.5) / row.length;
    const q = back ? 0.82 : 0.74, tx = camX + VW * (f < 0.5 ? 0.05 + 0.9 * f * q : 0.95 - 0.9 * (1 - f) * q);
    return { kind: k, back, tx, ty: back ? G - 6 : G + 34, delay: 20 + i * 22, side: i % 2 ? 1 : -1, x: 0, vis: false, ph: i * 1.3 }; });
  fx.arrive = 20 + kinds.length * 22 + 100;
  p = { x: cx, y: G + 34, vx: 0, vy: 0, face: 1, on: true, run: 0, dance: 110, move: 0, wings: 0, bubble: 0, squash: 1 }; parts = []; hearts = []; hist = []; followers = [];
  sfx.win();
}
function fwBurst(x, y){ if (!fx) return; const cols = [['#ff5f8f', '#ffd1e6'], ['#ffd028', '#fff3b0'], ['#5fa8ff', '#c9e4ff'], ['#7fe08f', '#dfffe5'], ['#c58aff', '#ecd9ff']][Math.floor(rand(0, 5))], im = IMG[['prop_firework_pink', 'prop_firework_gold', 'prop_firework_blue'][Math.floor(rand(0, 3))]];
  for (let i = 0; i < 42; i++) { const a = i / 42 * 6.283, v = rand(2.5, 6); parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: rand(1.3, 2), c: cols[i % 2], s: rand(4, 8), shape: i % 5 === 0 ? 'star' : 'dot', g: 0.05 }); }
  fx.fw.push({ x, y, t: 0, im }); tone(rand(110, 160), 0.35, 'sine', 0.12, 40); setTimeout(() => tone(rand(900, 1500), 0.25, 'triangle', 0.06, 300), 120); }
function heartsUp(x, n){ for (let i = 0; i < n; i++) hearts.push({ x: x + rand(-90, 90), y: G - rand(0, 80), vy: rand(0.8, 1.9), sw: rand(0, 6), s: rand(11, 22), c: Math.floor(rand(0, 5)) }); }
function finaleUpdate(dt){
  T += dt; fx.t += dt; const t = fx.t, say = (k, id) => { if (!fx.say[k]) { fx.say[k] = 1; Voice.say(id); } };
  if (t > 5) say('a', 'fin_a');
  if (t > fx.arrive) say('pr19', 'pr_19');
  if (t > 150) say('b', 'fin_b');
  if (t > 380) say('c', 'fin_c');
  if (t > 650) say('d', 'fin_d');
  if (t - fx.last > (t < 120 ? 9999 : 50)) { fx.last = t; fwBurst(camX + VW * rand(0.12, 0.88), rand(70, 300)); }
  if (Math.random() < 0.06) heartsUp(camX + rand(0.1, 0.9) * VW, 1);
  fx.g.forEach(g => { if (t >= g.delay) { g.vis = true; const k = Math.min(1, (t - g.delay) / 90), e = 1 - Math.pow(1 - k, 3), sx = g.side < 0 ? camX - 260 : camX + VW + 260; g.x = sx + (g.tx - sx) * e; g.arrived = k >= 1; } });
  if (wantDance) { wantDance = false; p.dance = 110; p.move = danceN++ % 3; sfx.dance(); heartsUp(p.x, 8); fwBurst(p.x + rand(-300, 300), rand(80, 260));
    if (IMG.prop_confetti) fx.fw.push({ x: p.x, y: p.y - 140, t: 0, im: IMG.prop_confetti, confetti: true }); }
  p.dance -= dt; if (p.dance <= 0) { p.dance = 110; p.move = danceN++ % 3; }
  hearts.forEach(h => { h.y -= h.vy * dt; h.sw += 0.05 * dt; }); hearts = hearts.filter(h => h.y > -60);
  parts.forEach(q => { q.x += q.vx * dt; q.y += q.vy * dt; q.vy += q.g * dt; q.life -= 0.02 * dt; }); parts = parts.filter(q => q.life > 0);
  fx.fw.forEach(w => w.t += dt); fx.fw = fx.fw.filter(w => w.t < 50);
  if (mode === 'finale' && !fx.hold && t > 1500 && (Voice.idle() || t > 2400)) { finishLevel(); Voice.say('fin_e'); }
}
function drawFinale(){
  ctx.setTransform(S, 0, 0, S, 0, 0); drawWorld();
  if (!IMG.bg_finale) { const gr = ctx.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, 'rgba(25,15,70,.8)'); gr.addColorStop(0.7, 'rgba(70,35,110,.5)'); gr.addColorStop(1, 'rgba(70,35,110,.15)'); ctx.fillStyle = gr; ctx.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 40; i++) { const sx = (i * 197 % VW), sy = (i * 83 % 330) + 10; ctx.globalAlpha = 0.5 + Math.sin(T * 0.08 + i) * 0.4; star5(sx, sy, 3 + i % 3, '#fff'); } ctx.globalAlpha = 1; }
  ctx.save(); ctx.translate(-camX, -camY);
  if (IMG.prop_bunting) { const w = Math.min(1200, VW * 0.7), h = w * IMG.prop_bunting.height / IMG.prop_bunting.width; ctx.drawImage(IMG.prop_bunting, camX + VW / 2 - w / 2, 10, w, h); }
  else { ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 3; ctx.beginPath(); for (let x = 0; x <= VW; x += 20) { const y = 40 + Math.sin(x / VW * Math.PI) * 50; x ? ctx.lineTo(camX + x, y) : ctx.moveTo(camX, y); } ctx.stroke();
    for (let x = 30; x < VW; x += 70) { const y = 40 + Math.sin(x / VW * Math.PI) * 50; circ(camX + x, y + 8, 9, ['#ffd028', '#ff8fc7', '#7fe08f', '#7fb8ff'][Math.floor(x / 70) % 4]); } }
  if (IMG.prop_dancefloor) { const w = VW * 0.95, h = w * IMG.prop_dancefloor.height / IMG.prop_dancefloor.width; ctx.drawImage(IMG.prop_dancefloor, camX + VW * 0.025, G + 60 - h, w, h); }
  else { const g = ctx.createRadialGradient(p.x, G + 30, 20, p.x, G + 30, VW * 0.5); g.addColorStop(0, 'rgba(255,170,230,.55)'); g.addColorStop(1, 'rgba(255,170,230,0)'); ctx.fillStyle = g; ctx.fillRect(camX, G - 120, VW, 260); }
  const guests = fx.g.slice().sort((a, b) => a.ty - b.ty).filter(g => g.vis);
  guests.forEach(g => { const run = !g.arrived, bob = Math.abs(Math.sin(T * 0.19 + g.ph)) * (run ? 10 : 30); ctx.save(); ctx.translate(g.x, g.ty - bob); const sc = clamp(VW / (fx.g.length / 2 * 175), 0.42, 0.95) * (g.back ? 0.86 : 1); ctx.scale(sc, sc); drawFriend(g.kind, 0, 0, true, { face: run ? (g.side < 0 ? 1 : -1) : (g.x < p.x ? 1 : -1) }); ctx.restore(); });
  ctx.save(); ctx.translate(p.x, p.y); ctx.scale(1.35, 1.35); ctx.translate(-p.x, -p.y); drawHero(); ctx.restore();
  hearts.forEach(h => { const im = IMG[['prop_heart_pink', 'prop_heart_red', 'prop_heart_gold'][h.c % 3]], x = h.x + Math.sin(h.sw) * 20; ctx.globalAlpha = Math.min(1, h.y / 120);
    if (im) ctx.drawImage(im, x - h.s * 1.4, h.y - h.s * 1.4, h.s * 2.8, h.s * 2.8); else { ctx.fillStyle = HEART_COL[h.c]; heartPath(x, h.y, h.s); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); } ctx.globalAlpha = 1; });
  fx.fw.forEach(w => { const k = w.t / 50; if (w.im) { ctx.globalAlpha = 1 - k; const sz = w.confetti ? 120 + 140 * k : 200 + 420 * Math.min(1, k * 2.2); const y = w.y + (w.confetti ? 55 * k : 0); ctx.drawImage(w.im, w.x - sz / 2, y - sz / 2, sz, sz); ctx.globalAlpha = 1; } else if (k < 0.25) { circ(w.x, w.y, 90 * (1 - k * 3), 'rgba(255,255,255,' + (0.5 - k * 2) + ')'); } });
  parts.forEach(q => { ctx.globalAlpha = clamp(q.life, 0, 1); if (q.shape === 'star') star5(q.x, q.y, q.s, q.c); else circ(q.x, q.y, q.s, q.c); }); ctx.globalAlpha = 1;
  if (IMG.prop_discoball) { const w = 120, h = w * IMG.prop_discoball.height / IMG.prop_discoball.width; ctx.drawImage(IMG.prop_discoball, camX + VW * 0.5 - w / 2, 0, w, h); }
  ctx.restore();
}


/* ---------- title, map, end screens ---------- */
const MAP10_POS = [[11, 27], [30, 27], [46, 27], [68, 27], [88, 27], [88, 69], [68, 69], [49.5, 69], [30, 69], [10.5, 69], [50, 48]];   // the ten stops on art/ui/map10.jpg (Ghost's ten-stop map), in percent
const MAP_POS = [[13, 25], [37.5, 24], [62, 25], [86, 27], [86, 70], [60.5, 69], [36.5, 70], [12, 72], [30, 47], [60, 47], [46, 47]];   // the ten stops on art/ui/map.jpg, in percent (9 and 10 sit in the empty middle band until Ghost's map10.jpg arrives)
/* choose who comes along: pictures only, at most two; with two or fewer friends to pick from she just goes */
function goLevel(i){ if (paradeFor(i).length > MAXPARTY) showPick(i); else startLevel(i, paradeFor(i)); }
let pickSel = [];
function showPick(i){
  mode = 'pick'; showButtons(); glow(null); Voice.hush(); Voice.say('x_pick');
  ['title', 'end', 'map'].forEach(s => $(s).classList.add('hide'));
  const avail = paradeFor(i); pickSel = (save.party || []).filter(k => avail.includes(k)).slice(0, MAXPARTY);
  for (let k = avail.length - 1; k >= 0 && pickSel.length < MAXPARTY; k--) if (!pickSel.includes(avail[k])) pickSel.push(avail[k]);
  const row = $('pickrow'); row.innerHTML = '';
  const paint = () => [...row.children].forEach(b => b.classList.toggle('sel', pickSel.includes(b.dataset.k)));
  avail.forEach(k => { const b = document.createElement('button'), im = IMG[k + '_happy'];
    b.className = 'fr'; b.dataset.k = k; b.setAttribute('aria-label', k);
    b.innerHTML = (im && im.src ? '<img alt="" src="' + im.src + '">' : '<span>' + k.charAt(0).toUpperCase() + '</span>') + '<i>✓</i>';
    b.addEventListener('click', () => { ac(); const at = pickSel.indexOf(k); if (at >= 0) pickSel.splice(at, 1); else { pickSel.push(k); if (pickSel.length > MAXPARTY) pickSel.shift(); sfx.pick(); } paint(); });
    row.appendChild(b); });
  paint(); $('pick').classList.remove('hide');
  $('pickgo').onclick = () => { ac(); save.party = pickSel.slice(); persist(); $('pick').classList.add('hide'); startLevel(i, pickSel.slice()); };
}
function refreshMapArtwork(){
  if (mode !== 'map') return;
  const mapImage = IMG.map11 || IMG.map10;
  const box = $('stops');
  box.classList.toggle('map-eleven', !!IMG.map11);
  box.style.backgroundImage = mapImage ? 'url("' + mapImage.src + '")' : '';
  const stops = mapImage ? MAP10_POS : MAP_POS;
  Array.from(box.children).forEach((button, i) => {
    button.style.left = stops[i][0] + '%';
    button.style.top = stops[i][1] + '%';
  });
}
function showMap(){
  mode = 'map'; fx = null; showButtons(); glow(null); Voice.hush(); Song.play('title');
  ['title', 'end', 'pick'].forEach(s => $(s).classList.add('hide'));
  const box = $('stops'); box.innerHTML = '';
  const nextI = LEVELS.findIndex((lv, i) => !save.done[i]);
  LEVELS.forEach((lv, i) => {
    const open = !!lv && (i === 0 || save.done[i - 1] || save.done[i]), b = document.createElement('button');
    b.className = 'stop' + (lv && save.done[i] ? ' done' : '') + (open ? '' : ' locked') + (i === nextI ? ' next' : '');
    b.innerHTML = !open ? '\u{1F512}' : save.done[i] ? '<img alt="" src="art/ui/sticker_' + lv.sticker + '.png" onerror="this.onerror=null;this.src=\'art/ui/sticker_8.png\'">' : '\u25B6';
    if (open && !save.done[i]) b.classList.add('play');
    b.setAttribute('aria-label', 'level ' + (i + 1));
    if (open) b.addEventListener('click', () => { ac(); goLevel(i); });
    box.appendChild(b);
  });
  refreshMapArtwork();
  $('map').classList.remove('hide');
}
$('play').addEventListener('click', () => { ac(); const first = !save.done.some(Boolean); if (first) startLevel(0); else showMap(); Voice.say(first ? 'ex_01' : 'ex_02'); });
$('toMap').addEventListener('click', showMap);
$('next').addEventListener('click', () => { if (li + 1 < LEVELS.length) goLevel(li + 1); else showMap(); });
showButtons();

/* for testing in the browser console */
window.__g = {
  get s(){ return { mode, li, meets: meets.map(m => m.kind + (m.done ? "!" : "")), x: p && Math.round(p.x), y: p && Math.round(p.y), on: p && p.on, got, total: items.length, meter, fin: !!fin, followers: followers.map(f => f.kind), said: Voice.last, save }; },
  keys, start: startLevel, finale: () => startFinale(), fx: () => fx, goLevel, pickSel: () => pickSel, P: () => p, sts: () => sts, pocket: () => pocket, goalMet: () => goalMet(), LV: () => L, gnd: groundAt, bonus: () => bonus, plats: () => plats, jump(){ wantJump = true; }, dance(){ wantDance = true; }, sup(){ wantSuper = true; },
  step(n){ if (mode === 'finale' || (mode === 'end' && fx)) { for (let i = 0; i < n; i++) finaleUpdate(1); drawFinale(); return; } for (let i = 0; i < n; i++) { if (mode === 'finale') { finaleUpdate(1); continue; } update(1); } if (mode === 'finale') drawFinale(); else draw(); }, tp(x){ p.x = x; p.y = G; p.vy = 0; }, items: () => items, meets: () => meets, reset(){ localStorage.removeItem(SAVE_KEY); }
};
