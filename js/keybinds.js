// ── KEYBINDS ─────────────────────────────────────────────────────────

const KEYBINDS_KEY = 'deadzone_keybinds';

const DEFAULT_KEYBINDS = {
  moveUp:    'KeyW',
  moveDown:  'KeyS',
  moveLeft:  'KeyA',
  moveRight: 'KeyD',
  shoot:     'Space',
  reload:    'KeyR',
  weapon1:   'Digit1',
  weapon2:   'Digit2',
  weapon3:   'Digit3',
  weapon4:   'Digit4',
};

const KEYBIND_LABELS = {
  moveUp:    'Move Up',
  moveDown:  'Move Down',
  moveLeft:  'Move Left',
  moveRight: 'Move Right',
  shoot:     'Shoot',
  reload:    'Reload',
  weapon1:   'Weapon 1',
  weapon2:   'Weapon 2',
  weapon3:   'Weapon 3',
  weapon4:   'Weapon 4',
};

let keybinds = { ...DEFAULT_KEYBINDS };
let listeningFor = null; // which action is being rebound

function loadKeybinds() {
  try {
    const saved = localStorage.getItem(KEYBINDS_KEY);
    if (saved) keybinds = { ...DEFAULT_KEYBINDS, ...JSON.parse(saved) };
  } catch(e) {}
}

function saveKeybinds() {
  try { localStorage.setItem(KEYBINDS_KEY, JSON.stringify(keybinds)); } catch(e) {}
}

function isKey(action, code) {
  return keybinds[action] === code;
}

function getKeyLabel(code) {
  // Convert KeyCode to readable label
  const map = {
    'KeyA':'A','KeyB':'B','KeyC':'C','KeyD':'D','KeyE':'E','KeyF':'F',
    'KeyG':'G','KeyH':'H','KeyI':'I','KeyJ':'J','KeyK':'K','KeyL':'L',
    'KeyM':'M','KeyN':'N','KeyO':'O','KeyP':'P','KeyQ':'Q','KeyR':'R',
    'KeyS':'S','KeyT':'T','KeyU':'U','KeyV':'V','KeyW':'W','KeyX':'X',
    'KeyY':'Y','KeyZ':'Z',
    'Digit0':'0','Digit1':'1','Digit2':'2','Digit3':'3','Digit4':'4',
    'Digit5':'5','Digit6':'6','Digit7':'7','Digit8':'8','Digit9':'9',
    'Space':'Space','Enter':'Enter','Escape':'ESC','Tab':'Tab',
    'ArrowUp':'↑','ArrowDown':'↓','ArrowLeft':'←','ArrowRight':'→',
    'ShiftLeft':'L.Shift','ShiftRight':'R.Shift',
    'ControlLeft':'L.Ctrl','ControlRight':'R.Ctrl',
    'AltLeft':'L.Alt','AltRight':'R.Alt',
    'F1':'F1','F2':'F2','F3':'F3','F4':'F4','F5':'F5',
    'BracketLeft':'[','BracketRight':']',
    'Semicolon':';','Quote':"'",'Comma':',','Period':'.','Slash':'/',
    'Backquote':'`','Minus':'-','Equal':'=','Backslash':'\\',
  };
  return map[code] || code;
}

function renderKeybindsUI(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  for (const [action, code] of Object.entries(keybinds)) {
    const label = KEYBIND_LABELS[action] || action;
    const row = document.createElement('div');
    row.className = 'settings-row keybind-row';
    row.id = `keybind-row-${action}`;

    const lbl = document.createElement('label');
    lbl.className = 'settings-label';
    lbl.textContent = label;

    const btn = document.createElement('button');
    btn.className = 'keybind-btn';
    btn.id = `keybind-btn-${action}`;
    btn.textContent = getKeyLabel(code);
    btn.onclick = () => startListening(action);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'keybind-reset';
    resetBtn.title = 'Reset to default';
    resetBtn.innerHTML = '↺';
    resetBtn.onclick = () => {
      keybinds[action] = DEFAULT_KEYBINDS[action];
      saveKeybinds();
      renderKeybindsUI(containerId);
    };

    row.appendChild(lbl);
    row.appendChild(btn);
    row.appendChild(resetBtn);
    container.appendChild(row);
  }
}

function startListening(action) {
  if (listeningFor) cancelListening();
  listeningFor = action;

  const btn = document.getElementById(`keybind-btn-${action}`);
  if (btn) {
    btn.textContent = '— press key —';
    btn.classList.add('listening');
  }

  // Listen for next keydown
  window._keybindListener = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.code === 'Escape') { cancelListening(); return; }

    // Check for conflicts
    const conflict = Object.entries(keybinds).find(([a, k]) => k === e.code && a !== action);
    if (conflict) {
      // Swap — give the conflicting action the old binding
      keybinds[conflict[0]] = keybinds[action];
    }

    keybinds[action] = e.code;
    saveKeybinds();
    cancelListening();

    // Re-render both keybind UIs if they exist
    renderKeybindsUI('keybinds-container');
    renderKeybindsUI('p-keybinds-container');
  };

  window.addEventListener('keydown', window._keybindListener, { once: true, capture: true });
}

function cancelListening() {
  if (window._keybindListener) {
    window.removeEventListener('keydown', window._keybindListener, { capture: true });
    window._keybindListener = null;
  }
  listeningFor = null;
  // Re-render to clear listening state
  renderKeybindsUI('keybinds-container');
  renderKeybindsUI('p-keybinds-container');
}

function resetAllKeybinds() {
  keybinds = { ...DEFAULT_KEYBINDS };
  saveKeybinds();
  renderKeybindsUI('keybinds-container');
  renderKeybindsUI('p-keybinds-container');
}

window.addEventListener('DOMContentLoaded', () => {
  loadKeybinds();
});
