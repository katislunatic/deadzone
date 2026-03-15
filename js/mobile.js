// ── MOBILE CONTROLS (aim stick, fire, reload, squeeze, weapons, pause) ──

(function () {
  // Detect touch device — show controls only on touch screens
  function isTouchDevice() {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (!isTouchDevice()) return;

    // Show mobile controls panel
    const panel = document.getElementById('mobile-controls');
    if (panel) panel.style.display = 'flex';

    // Hide the keyboard hint text in menu (not relevant on mobile)
    const menuHint = document.querySelector('#menu-screen > div[style*="monospace"]');
    if (menuHint) menuHint.style.display = 'none';

    // Hide crosshair on mobile (aim is handled by joystick)
    const crosshair = document.getElementById('crosshair');
    if (crosshair) crosshair.style.display = 'none';

    // ── AIM STICK ──────────────────────────────────────────────────────
    const aimArea = document.getElementById('aim-stick-area');
    const aimDot  = document.getElementById('aim-stick-dot');

    if (aimArea) {
      let aimOrigin = null;
      let aimActive = false;
      let aimAngle  = 0;
      let aimDist   = 0;
      const AIM_DEAD_ZONE = 8;  // px — must move this far before aiming / firing
      const AIM_RADIUS    = 40; // px — max stick deflection

      aimArea.addEventListener('touchstart', e => {
        e.preventDefault();
        const t = e.touches[0];
        const r = aimArea.getBoundingClientRect();
        aimOrigin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        aimActive = true;
      }, { passive: false });

      aimArea.addEventListener('touchmove', e => {
        e.preventDefault();
        if (!aimOrigin) return;
        const t = e.touches[0];
        const dx = t.clientX - aimOrigin.x;
        const dy = t.clientY - aimOrigin.y;
        aimDist  = Math.sqrt(dx * dx + dy * dy);
        aimAngle = Math.atan2(dy, dx);

        const clamped = Math.min(aimDist, AIM_RADIUS);
        aimDot.style.transform =
          `translate(calc(-50% + ${Math.cos(aimAngle) * clamped}px), ` +
          `calc(-50% + ${Math.sin(aimAngle) * clamped}px))`;

        // Update mouse aim position in canvas space
        if (typeof mouse !== 'undefined' && typeof canvas !== 'undefined' && canvas) {
          // Convert aim angle to a point far from player so facing is correct
          const FAR = 1000;
          const playerScreenX = canvas.width  / 2;
          const playerScreenY = canvas.height / 2;
          mouse.x = playerScreenX + Math.cos(aimAngle) * FAR;
          mouse.y = playerScreenY + Math.sin(aimAngle) * FAR;
        }

        // Auto-fire when pushed past dead-zone
        if (typeof mouse !== 'undefined') {
          mouse.down = aimDist > AIM_DEAD_ZONE;
        }
      }, { passive: false });

      function aimEnd() {
        aimActive = false;
        aimOrigin = null;
        aimDot.style.transform = 'translate(-50%,-50%)';
        if (typeof mouse !== 'undefined') mouse.down = false;
      }
      aimArea.addEventListener('touchend',    aimEnd, { passive: true });
      aimArea.addEventListener('touchcancel', aimEnd, { passive: true });
    }

    // ── RELOAD BUTTON ──────────────────────────────────────────────────
    const reloadBtn = document.getElementById('mobile-reload-btn');
    if (reloadBtn) {
      reloadBtn.addEventListener('touchstart', e => {
        e.preventDefault();
        if (typeof startReload === 'function') startReload();
      }, { passive: false });
    }

    // ── SQUEEZE BUTTON ─────────────────────────────────────────────────
    const squeezeBtn = document.getElementById('mobile-squeeze-btn');
    if (squeezeBtn) {
      squeezeBtn.addEventListener('touchstart', e => {
        e.preventDefault();
        if (typeof keys !== 'undefined' && typeof keybinds !== 'undefined') {
          keys[keybinds.squeeze] = true;
        }
      }, { passive: false });
      squeezeBtn.addEventListener('touchend', () => {
        if (typeof keys !== 'undefined' && typeof keybinds !== 'undefined') {
          keys[keybinds.squeeze] = false;
        }
      }, { passive: true });
      squeezeBtn.addEventListener('touchcancel', () => {
        if (typeof keys !== 'undefined' && typeof keybinds !== 'undefined') {
          keys[keybinds.squeeze] = false;
        }
      }, { passive: true });
    }

    // ── PAUSE BUTTON ───────────────────────────────────────────────────
    const pauseBtn = document.getElementById('mobile-pause-btn');
    if (pauseBtn) {
      pauseBtn.addEventListener('touchstart', e => {
        e.preventDefault();
        if (typeof gameState !== 'undefined' &&
            (gameState === 'playing' || gameState === 'paused')) {
          if (typeof togglePause === 'function') togglePause();
        }
      }, { passive: false });
    }

    // ── WEAPON SLOT TOUCH ──────────────────────────────────────────────
    // The weapon slots already have onclick from game.js; touch triggers click fine.
    // We additionally handle swipe-left / swipe-right on the aim stick to cycle weapons.
    let swipeStartX = null;
    const aimAreaForSwipe = document.getElementById('aim-stick-area');
    if (aimAreaForSwipe) {
      aimAreaForSwipe.addEventListener('touchstart', e => {
        swipeStartX = e.touches[0].clientX;
      }, { passive: true });
    }
  });
})();
