// ── SETTINGS ─────────────────────────────────────────────────────────

const SETTINGS_KEY = 'deadzone_settings';

const DEFAULT_SETTINGS = {
  volMaster: 80,
  volGuns:   100,
  volDeath:  100,
  volReload: 100,
  volUi:     100,
  blood:     true,
};

// Which sounds belong to which category
const SOUND_CATEGORIES = {
  guns:   ['shoot_revolver','shoot_shotgun','shoot_rifle','shoot_smg','empty_click'],
  death:  ['zombie_die','zombie_hit','player_hurt','player_die','civilian_hit','civilian_turned'],
  reload: ['reload_start','reload_done'],
  ui:     ['coin_pickup','wave_start','weapon_switch','shop_buy','slot_spin_tick','slot_spin_land'],
};

let gameSettings = { ...DEFAULT_SETTINGS };

function loadSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) gameSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch(e) {}
  applySettingsToUI();
}

function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(gameSettings)); } catch(e) {}
}

function applySettingsToUI() {
  const sliders = [
    ['vol-master', 'volMaster'],
    ['vol-guns',   'volGuns'],
    ['vol-death',  'volDeath'],
    ['vol-reload', 'volReload'],
    ['vol-ui',     'volUi'],
  ];
  for (const [id, key] of sliders) {
    const el = document.getElementById(id);
    if (el) {
      el.value = gameSettings[key];
      document.getElementById(id + '-val').textContent = gameSettings[key] + '%';
    }
  }
  const bloodBtn = document.getElementById('toggle-blood');
  if (bloodBtn) {
    bloodBtn.textContent = gameSettings.blood ? 'ON' : 'OFF';
    bloodBtn.classList.toggle('active', gameSettings.blood);
  }
}

function openSettings() {
  applySettingsToUI();
  document.getElementById('settings-overlay').style.display = 'flex';
  if (typeof renderKeybindsUI === 'function') renderKeybindsUI('keybinds-container');

  // Wire up sliders live
  const sliders = [
    ['vol-master', 'volMaster'],
    ['vol-guns',   'volGuns'],
    ['vol-death',  'volDeath'],
    ['vol-reload', 'volReload'],
    ['vol-ui',     'volUi'],
  ];
  for (const [id, key] of sliders) {
    const el = document.getElementById(id);
    const valEl = document.getElementById(id + '-val');
    if (el) {
      el.oninput = () => {
        gameSettings[key] = parseInt(el.value);
        valEl.textContent = el.value + '%';
      };
    }
  }
}

function closeSettings() {
  saveSettings();
  document.getElementById('settings-overlay').style.display = 'none';
}

function toggleSetting(key) {
  gameSettings[key] = !gameSettings[key];
  applySettingsToUI();
}

// Get effective volume for a sound type (0.0 - 1.0)
function getVolume(soundType) {
  const master = gameSettings.volMaster / 100;
  let category = 1.0;
  for (const [cat, sounds] of Object.entries(SOUND_CATEGORIES)) {
    if (sounds.includes(soundType)) {
      const key = 'vol' + cat.charAt(0).toUpperCase() + cat.slice(1);
      category = gameSettings[key] / 100;
      break;
    }
  }
  return master * category;
}

function isBloodEnabled() {
  return gameSettings.blood;
}

// Load on startup
window.addEventListener('DOMContentLoaded', loadSettings);

// Sync pause menu sliders with current settings
function syncPauseSettings() {
  const sliders = [
    ['p-vol-master', 'volMaster'],
    ['p-vol-guns',   'volGuns'],
    ['p-vol-death',  'volDeath'],
    ['p-vol-reload', 'volReload'],
    ['p-vol-ui',     'volUi'],
  ];
  for (const [id, key] of sliders) {
    const el = document.getElementById(id);
    if (!el) continue;
    el.value = gameSettings[key];
    document.getElementById(id + '-val').textContent = gameSettings[key] + '%';
    el.oninput = () => {
      gameSettings[key] = parseInt(el.value);
      document.getElementById(id + '-val').textContent = el.value + '%';
      // Also sync the main settings sliders
      const mainId = id.replace('p-', '');
      const mainEl = document.getElementById(mainId);
      if (mainEl) mainEl.value = el.value;
      saveSettings();
    };
  }
  // Blood toggle
  const bloodBtn = document.getElementById('p-toggle-blood');
  if (bloodBtn) {
    bloodBtn.textContent = gameSettings.blood ? 'ON' : 'OFF';
    bloodBtn.classList.toggle('active', gameSettings.blood);
  }
}

function togglePauseSettings() {
  const panel = document.getElementById('pause-settings-panel');
  const btn = document.getElementById('pause-settings-btn');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  if (!isOpen) {
    syncPauseSettings();
    if (typeof renderKeybindsUI === 'function') renderKeybindsUI('p-keybinds-container');
  }
}

function toggleAccordion(id) {
  const body = document.getElementById(id);
  const btn = body ? body.previousElementSibling : null;
  if (!body) return;
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  if (btn) btn.classList.toggle('open', !isOpen);
}
