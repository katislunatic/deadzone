// ── SOUND ENGINE ─────────────────────────────────────────────────────
// All sounds synthesized via Web Audio API — no files needed

let _audioCtx = null;

function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (_audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// iOS Safari requires AudioContext to be created AND resumed
// synchronously inside a user gesture. Unlock on first touch/click.
function _unlockAudio() {
  try {
    const ctx = getAudioCtx();
    // Play a silent buffer — this fully unlocks the context on iOS
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    ctx.resume();
  } catch(e) {}
}
document.addEventListener('touchstart', _unlockAudio, { once: true, capture: true });
document.addEventListener('touchend',   _unlockAudio, { once: true, capture: true });
document.addEventListener('click',      _unlockAudio, { once: true, capture: true });

function playSound(type) {
  try {
    const vol = (typeof getVolume === 'function') ? getVolume(type) : 0.8;
    if (vol <= 0) return;
    const ctx = getAudioCtx();
    const t = ctx.currentTime;
    // Master gain node for this sound
    const master = ctx.createGain();
    master.gain.setValueAtTime(vol, t);
    master.connect(ctx.destination);
    // Helper to connect to master instead of destination directly
    const dest = master;

    switch(type) {

      case 'shoot_revolver': {
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.18, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) {
          const p = i / d.length;
          // sharp crack + low thump
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - p, 3) * 0.9
                + Math.sin(i * 0.15) * Math.pow(1 - p, 6) * 0.6;
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.55, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        src.connect(gain); gain.connect(dest);
        src.start(t);
        break;
      }

      case 'shoot_shotgun': {
        // Booming low blast
        for (let s = 0; s < 3; s++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(120 - s*30, t);
          osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);
          gain.gain.setValueAtTime(0.3, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
          osc.connect(gain); gain.connect(dest);
          osc.start(t); osc.stop(t + 0.3);
        }
        // Noise layer
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/d.length, 1.5);
        const src = ctx.createBufferSource(); src.buffer = buf;
        const ng = ctx.createGain(); ng.gain.setValueAtTime(0.6, t);
        src.connect(ng); ng.connect(dest); src.start(t);
        break;
      }

      case 'shoot_rifle': {
        // Sharp high crack with longer tail
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.22);
        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.25);
        break;
      }

      case 'shoot_smg': {
        // Short punchy pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.07);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.1);
        break;
      }

      case 'empty_click': {
        // Dry click — no ammo
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, t);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.05);
        break;
      }

      case 'reload_start': {
        // Mechanical click-clack
        for (let i = 0; i < 2; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(400 + i*200, t + i*0.08);
          gain.gain.setValueAtTime(0.18, t + i*0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i*0.08 + 0.06);
          osc.connect(gain); gain.connect(dest);
          osc.start(t + i*0.08); osc.stop(t + i*0.08 + 0.07);
        }
        break;
      }

      case 'reload_done': {
        // Satisfying clunk
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(250, t);
        osc.frequency.exponentialRampToValueAtTime(120, t + 0.12);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.15);
        break;
      }

      case 'zombie_die': {
        // Gurgle/splat
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180 + Math.random()*80, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);
        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.3);
        break;
      }

      case 'zombie_hit': {
        // Soft thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.08);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.12);
        break;
      }

      case 'player_hurt': {
        // Painful grunt — low thud + noise
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.2);
        gain.gain.setValueAtTime(0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.25);
        break;
      }

      case 'coin_pickup': {
        // Bright ding
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.setValueAtTime(1100, t + 0.05);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.2);
        break;
      }

      case 'wave_start': {
        // Dramatic rising chord
        const freqs = [220, 277, 330, 440];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, t + i*0.06);
          gain.gain.setValueAtTime(0, t + i*0.06);
          gain.gain.linearRampToValueAtTime(0.15, t + i*0.06 + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i*0.06 + 0.6);
          osc.connect(gain); gain.connect(dest);
          osc.start(t + i*0.06); osc.stop(t + i*0.06 + 0.7);
        });
        break;
      }

      case 'player_die': {
        // Descending death toll
        const freqs2 = [440, 330, 220, 110];
        freqs2.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, t + i*0.18);
          gain.gain.setValueAtTime(0.3, t + i*0.18);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i*0.18 + 0.35);
          osc.connect(gain); gain.connect(dest);
          osc.start(t + i*0.18); osc.stop(t + i*0.18 + 0.4);
        });
        break;
      }

      case 'weapon_switch': {
        // Quick tick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.05);
        break;
      }

      case 'shop_buy': {
        // Cheerful two-tone
        [523, 659].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t + i*0.1);
          gain.gain.setValueAtTime(0.2, t + i*0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i*0.1 + 0.18);
          osc.connect(gain); gain.connect(dest);
          osc.start(t + i*0.1); osc.stop(t + i*0.1 + 0.2);
        });
        break;
      }

      case 'civilian_hit': {
        // Horrified scream — sharp intake + descending wail
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.35);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.45);
        // Thud underneath
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(120, t);
        osc2.frequency.exponentialRampToValueAtTime(40, t + 0.15);
        gain2.gain.setValueAtTime(0.3, t);
        gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc2.connect(gain2); gain2.connect(ctx.destination);
        osc2.start(t); osc2.stop(t + 0.2);
        break;
      }

      case 'slot_spin_tick': {
        // Quick mechanical tick for each reel item passing
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(500 + Math.random()*200, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.04);
        break;
      }

      case 'slot_spin_land': {
        // Slot machine landing — mechanical thunk + rising ding
        // Thunk
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.12);
        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 0.18);
        // Win ding sequence
        [523, 659, 784, 1046].forEach((f, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(f, t + 0.1 + i*0.07);
          g.gain.setValueAtTime(0.18, t + 0.1 + i*0.07);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.1 + i*0.07 + 0.15);
          o.connect(g); g.connect(dest);
          o.start(t + 0.1 + i*0.07); o.stop(t + 0.1 + i*0.07 + 0.18);
        });
        break;
      }

      case 'civilian_turned': {
        // Eerie warble
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.linearRampToValueAtTime(150, t + 0.4);
        osc.frequency.linearRampToValueAtTime(200, t + 0.8);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
        osc.connect(gain); gain.connect(dest);
        osc.start(t); osc.stop(t + 1.0);
        break;
      }

      case 'wave_complete': {
        // Triumphant western fanfare — rising notes then a big finish
        const notes = [330, 392, 494, 392, 523, 659, 784];
        const times = [0, 0.10, 0.20, 0.32, 0.44, 0.56, 0.70];
        notes.forEach((f, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = i === notes.length-1 ? 'sawtooth' : 'square';
          o.frequency.setValueAtTime(f, t + times[i]);
          const dur = i === notes.length-1 ? 0.5 : 0.12;
          g.gain.setValueAtTime(i === notes.length-1 ? 0.28 : 0.18, t + times[i]);
          g.gain.exponentialRampToValueAtTime(0.001, t + times[i] + dur);
          o.connect(g); g.connect(dest);
          o.start(t + times[i]); o.stop(t + times[i] + dur + 0.05);
        });
        // Low drum hit on the final note
        const drum = ctx.createOscillator();
        const dg = ctx.createGain();
        drum.type = 'sine';
        drum.frequency.setValueAtTime(120, t + 0.70);
        drum.frequency.exponentialRampToValueAtTime(40, t + 0.95);
        dg.gain.setValueAtTime(0.4, t + 0.70);
        dg.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
        drum.connect(dg); dg.connect(dest);
        drum.start(t + 0.70); drum.stop(t + 1.05);
        break;
      }
    }
  } catch(e) { /* AudioContext blocked — ignore */ }
}
