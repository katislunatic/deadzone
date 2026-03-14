// ── GAME ENGINE ───────────────────────────────────────────────────────

let canvas, ctx, player, bullets, zombies, civilians, particles;
let wave, score, mapId, mapData, obstacles, frameCount;
let gameState = 'menu'; // menu | playing | shop | gameover | paused
let keys = {};
let mouse = { x: 400, y: 300, down: false };
let upgrades, playerStats;
let lastMapId = null;
let waveAnnounceTimer = 0;
let zombiesLeftThisWave = 0;
let zombiesSpawned = 0;
let spawnTimer = 0;
let totalKills = 0, civKills = 0;
let lastShotFrame = 0;
let selectedWeaponId = 'revolver';
let currentClip, maxClip, reloading, reloadProgress;
let crosshairEl;
let dustParticles = [];

// ── INIT ──────────────────────────────────────────────────────────────
// Virtual mouse position in canvas/world space (used when pointer is locked)
let virtualMouseX = 400, virtualMouseY = 300;

function getWorldScale() {
  // Scale factor from canvas pixels to world pixels
  const sw = canvas.width / WORLD_W;
  const sh = canvas.height / WORLD_H;
  return Math.min(sw, sh);
}

function requestPointerLock() {
  if (canvas.requestPointerLock) canvas.requestPointerLock();
}

function exitPointerLock() {
  if (document.exitPointerLock) document.exitPointerLock();
}

function init() {
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  crosshairEl = document.getElementById('crosshair');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Pointer Lock change handler
  document.addEventListener('pointerlockchange', () => {
    // When lock is released while playing, ESC was pressed — auto pause
    if (gameState === 'playing' && document.pointerLockElement !== canvas) {
      gameState = 'paused';
      document.getElementById('pause-overlay').style.display = 'flex';
      if (typeof syncPauseSettings === 'function') syncPauseSettings();
    }
  });

  // Input
  window.addEventListener('keydown', e => {
    keys[e.code] = true;
    // Only handle ESC when already paused (to resume) — pausing is handled by pointerlockchange
    if (e.code === 'Escape' && gameState === 'paused') togglePause();
    // Weapon switching 1-4
    if (gameState === 'playing') {
      if (keybinds) {
        const wepMap = {
          [keybinds.weapon1]:'revolver',
          [keybinds.weapon2]:'shotgun',
          [keybinds.weapon3]:'rifle',
          [keybinds.weapon4]:'smg'
        };
        if (wepMap[e.code]) selectWeapon(wepMap[e.code]);
      }
    }
  });
  window.addEventListener('keyup',  e => keys[e.code] = false);

  // Pointer-lock mouse movement: accumulate virtual position
  document.addEventListener('mousemove', e => {
    if (document.pointerLockElement === canvas) {
      // Accumulate movement with no clamping — full 360 degree aim
      const rect = canvas.getBoundingClientRect();
      const displayScaleX = rect.width  / canvas.width;
      const displayScaleY = rect.height / canvas.height;
      virtualMouseX += e.movementX / displayScaleX;
      virtualMouseY += e.movementY / displayScaleY;
      mouse.x = virtualMouseX;
      mouse.y = virtualMouseY;
      // Keep crosshair clamped visually to the screen display area
      const clampedX = Math.max(rect.left, Math.min(rect.right,  rect.left + (virtualMouseX / canvas.width)  * rect.width));
      const clampedY = Math.max(rect.top,  Math.min(rect.bottom, rect.top  + (virtualMouseY / canvas.height) * rect.height));
      crosshairEl.style.left = clampedX + 'px';
      crosshairEl.style.top  = clampedY + 'px';
    } else {
      // Fallback when not locked (menus etc.)
      crosshairEl.style.left = e.clientX + 'px';
      crosshairEl.style.top  = e.clientY + 'px';
    }
  });

  canvas.addEventListener('mousedown', e => {
    if (e.button === 0) {
      mouse.down = true;
      // Re-request lock if not already locked (e.g. after tab switch)
      if (gameState === 'playing' && document.pointerLockElement !== canvas) {
        requestPointerLock();
      }
    }
  });
  canvas.addEventListener('mouseup',   e => { if (e.button===0) mouse.down=false; });

  // Scroll wheel weapon switching
  window.addEventListener('wheel', e => {
    if (gameState !== 'playing') return;
    const wepIds = ['revolver','shotgun','rifle','smg'];
    const owned = wepIds.filter(id => upgrades.find(u => u.id === id && u.level > 0));
    if (owned.length < 2) return;
    const idx = owned.indexOf(selectedWeaponId);
    const next = e.deltaY > 0
      ? owned[(idx + 1) % owned.length]
      : owned[(idx - 1 + owned.length) % owned.length];
    selectWeapon(next);
  }, { passive: true });

  // Mobile joystick
  initMobileControls();

  requestAnimationFrame(loop);
}

// Logical viewport — same zoom as original game
const VIEWPORT_W = 800;
const VIEWPORT_H = 600;

function resizeCanvas() {
  // Scale up the 800x600 viewport to fill the screen
  const scaleX = window.innerWidth  / VIEWPORT_W;
  const scaleY = window.innerHeight / VIEWPORT_H;
  const displayScale = Math.min(scaleX, scaleY);

  canvas.width  = VIEWPORT_W;
  canvas.height = VIEWPORT_H;
  canvas.style.width  = Math.round(VIEWPORT_W * displayScale) + 'px';
  canvas.style.height = Math.round(VIEWPORT_H * displayScale) + 'px';
  canvas.style.position = 'fixed';
  canvas.style.left = Math.round((window.innerWidth  - VIEWPORT_W * displayScale) / 2) + 'px';
  canvas.style.top  = Math.round((window.innerHeight - VIEWPORT_H * displayScale) / 2) + 'px';
  canvas.style.imageRendering = 'crisp-edges';
}

// ── START GAME ────────────────────────────────────────────────────────
function startGame(mapIdArg) {
  mapId   = mapIdArg;
  mapData = MAPS[mapId];
  obstacles = mapData.obstacles.map(o => ({...o}));

  // Build upgrade state
  upgrades = getUpgrades();
  playerStats = { gunDamageMult:1, fireRateMult:1, clipBonus:0, reloadMult:1, coinMult:1 };

  // Find a clear spawn point — try the defined spot first, then search nearby
  function findClearSpawn(sx, sy) {
    const r = 20;
    // Try a spiral search outward from the target point
    for (let radius = 0; radius < 300; radius += 20) {
      const steps = radius === 0 ? 1 : Math.ceil(2 * Math.PI * radius / 20);
      for (let s = 0; s < steps; s++) {
        const angle = (s / steps) * Math.PI * 2;
        const tx = sx + Math.cos(angle) * radius;
        const ty = sy + Math.sin(angle) * radius;
        if (!obstacles.some(o => circleRect(tx, ty, r, o))) return { x: tx, y: ty };
      }
    }
    return { x: sx, y: sy }; // fallback
  }
  const sp = findClearSpawn(mapData.spawnX || WORLD_W/2, mapData.spawnY || WORLD_H/2);
  player = new Player(sp.x, sp.y);
  selectedWeaponId = 'revolver';
  player.coins = 0;
  bullets = []; zombies = []; civilians = []; particles = []; dustParticles = [];
  wave = 0; score = 0; frameCount = 0; totalKills = 0; civKills = 0;

  // Spawn civs
  for (let i=0; i<3; i++) spawnCivilian();

  document.getElementById('menu-screen').style.display = 'none';
  document.getElementById('shop-screen').style.display = 'none';
  document.getElementById('gameover-screen').style.display = 'none';
  document.getElementById('hud').style.display = 'flex';
  document.getElementById('hud-bottom').style.display = 'flex';

  // Center virtual mouse on game start
  virtualMouseX = canvas.width / 2;
  virtualMouseY = canvas.height / 2;
  mouse.x = virtualMouseX;
  mouse.y = virtualMouseY;

  gameState = 'playing';
  requestPointerLock();
  nextWave();
}

// ── WAVE ──────────────────────────────────────────────────────────────
function nextWave() {
  wave++;
  zombiesLeftThisWave = 5 + wave * 4;
  zombiesSpawned = 0;
  spawnTimer = 0;
  waveAnnounceTimer = 120;

  const el = document.getElementById('wave-announce');
  el.textContent = `WAVE ${wave}`;
  el.style.opacity = 1;
  setTimeout(() => el.style.opacity = 0, 2000);
  playSound('wave_start');

  // Setup weapon
  const activeWeapon = getActiveWeapon();
  maxClip = (activeWeapon.stats.clip || 6) + (playerStats.clipBonus||0);
  currentClip = maxClip;
  reloading = false; reloadProgress = 0;
  updateHUD();
}

function getActiveWeapon() {
  const u = upgrades.find(u => u.id === selectedWeaponId && u.level > 0);
  if (u) return u;
  // Fallback to revolver
  return upgrades.find(u => u.id === 'revolver');
}

function getOwnedWeapons() {
  const wepIds = ['revolver','shotgun','rifle','smg'];
  return wepIds.map(id => upgrades.find(u => u.id === id)).filter(u => u && u.level > 0);
}

function selectWeapon(id) {
  const wep = upgrades.find(u => u.id === id && u.level > 0);
  if (!wep) return;
  if (id !== selectedWeaponId) playSound('weapon_switch');
  selectedWeaponId = id;
  // Reset clip for newly selected weapon
  maxClip = (wep.stats.clip || 6) + (playerStats.clipBonus || 0);
  currentClip = maxClip;
  reloading = false; reloadProgress = 0;
  updateHUD();
}

// ── SPAWN ─────────────────────────────────────────────────────────────
function spawnZombie() {
  // Spawn just inside the world edges with enough margin to clear border obstacles
  const margin = 60;
  let x, y;
  let attempts = 0;
  do {
    const edge = Math.floor(Math.random() * 4);
    if      (edge === 0) { x = margin + Math.random() * (WORLD_W - margin*2); y = margin; }
    else if (edge === 1) { x = WORLD_W - margin; y = margin + Math.random() * (WORLD_H - margin*2); }
    else if (edge === 2) { x = margin + Math.random() * (WORLD_W - margin*2); y = WORLD_H - margin; }
    else                 { x = margin; y = margin + Math.random() * (WORLD_H - margin*2); }
    attempts++;
  } while (attempts < 20 && obstacles.some(o => circleRect(x, y, 16, o)));
  zombies.push(new Zombie(x, y, wave));
  zombiesSpawned++;
}

function spawnCivilian() {
  for (let attempt=0; attempt<30; attempt++) {
    const x = 80 + Math.random() * (WORLD_W-160);
    const y = 80 + Math.random() * (WORLD_H-160);
    if (!obstacles.some(o => circleRect(x, y, 12, o))) {
      civilians.push(new Civilian(x, y));
      return;
    }
  }
}

// ── SHOOT ─────────────────────────────────────────────────────────────
function tryShoot() {
  const wep = getActiveWeapon();
  const stats = wep.stats;
  const fireRate = Math.max(4, stats.fireRate * (playerStats.fireRateMult||1));
  if (frameCount - lastShotFrame < fireRate) return;
  if (reloading) return;
  if (currentClip <= 0) { playSound('empty_click'); startReload(); return; }

  const angle = player.facing;
  const dmg = stats.damage * (playerStats.gunDamageMult||1);
  const spd = stats.bulletSpeed;
  const pellets = stats.pellets || 1;
  // Gunshot sound
  const sndMap = { revolver:'shoot_revolver', shotgun:'shoot_shotgun', rifle:'shoot_rifle', smg:'shoot_smg' };
  playSound(sndMap[wep.id] || 'shoot_revolver');

  for (let p=0; p<pellets; p++) {
    const spread = (Math.random()-0.5) * stats.spread * 2;
    bullets.push(new Bullet(
      player.x + Math.cos(angle)*16,
      player.y + Math.sin(angle)*16,
      angle + spread, spd, dmg
    ));
  }
  currentClip--;
  lastShotFrame = frameCount;

  // muzzle flash
  for (let i=0; i<6; i++) {
    particles.push(new Particle(
      player.x + Math.cos(angle)*20,
      player.y + Math.sin(angle)*20,
      '#ffe060', { spread: 3, life: 10, size: 3 }
    ));
  }
  updateHUD();
}

function startReload() {
  if (reloading || currentClip === maxClip) return;
  reloading = true; reloadProgress = 0;
  playSound('reload_start');
}

// ── MAIN LOOP ─────────────────────────────────────────────────────────
function loop() {
  requestAnimationFrame(loop);
  if (gameState === 'paused') { render(); return; }
  if (gameState === 'shop')   { render(); return; }  // keep world visible behind shop
  if (gameState !== 'playing') { drawBackground(); return; }

  frameCount++;

  // Reload
  const reloadFrames = Math.round(60 * (playerStats.reloadMult||1));
  if (reloading) {
    reloadProgress++;
    if (reloadProgress >= reloadFrames) {
      reloading = false; reloadProgress = 0; currentClip = maxClip;
      playSound('reload_done');
      updateHUD();
    }
  }

  // Player movement
  const wep = getActiveWeapon();
  let spd = player.speed;
  let dx=0, dy=0;
  if (keys['ArrowUp']    || (keybinds && keys[keybinds.moveUp]))    dy -= 1;
  if (keys['ArrowDown']  || (keybinds && keys[keybinds.moveDown]))  dy += 1;
  if (keys['ArrowLeft']  || (keybinds && keys[keybinds.moveLeft]))  dx -= 1;
  if (keys['ArrowRight'] || (keybinds && keys[keybinds.moveRight])) dx += 1;
  // Mobile joystick
  if (window.joystickDelta) { dx += window.joystickDelta.x; dy += window.joystickDelta.y; }
  const dlen = Math.sqrt(dx*dx+dy*dy);
  if (dlen > 0) { player.vx = dx/dlen*spd; player.vy = dy/dlen*spd; }
  else { player.vx = 0; player.vy = 0; }
  player.move(obstacles);

  // Squeeze mechanic
  const squeezePressed = keybinds && keys[keybinds.squeeze];
  const wasSquezing = player.squeezing;

  // Depleted flag: once stamina hits 0, can't re-squeeze until recharged to 30
  if (!player.squeezeDeplete) player.squeezeDeplete = false;
  if (player.squeezeStamina <= 0) player.squeezeDeplete = true;
  if (player.squeezeStamina >= 30) player.squeezeDeplete = false;

  const canSqueeze = squeezePressed && player.squeezeStamina > 0 && !player.squeezeDeplete;

  if (canSqueeze) {
    player.squeezing = true;
    player.radius = 5;
    player.squeezeStamina = Math.max(0, player.squeezeStamina - 1.4);
  } else {
    player.squeezing = false;
    player.radius = player.baseRadius;
    // Regen stamina when not squeezing
    if (player.squeezeStamina < 100) player.squeezeStamina = Math.min(100, player.squeezeStamina + 0.35);

    // If we just released squeeze, push player out of any overlapping obstacle
    if (wasSquezing) {
      for (const obs of obstacles) {
        if (!circleRect(player.x, player.y, player.radius, obs)) continue;
        const cx = obs.x + obs.w / 2;
        const cy = obs.y + obs.h / 2;
        const overlapX = (obs.w / 2 + player.radius) - Math.abs(player.x - cx);
        const overlapY = (obs.h / 2 + player.radius) - Math.abs(player.y - cy);
        if (overlapX < overlapY) {
          player.x += player.x < cx ? -overlapX : overlapX;
        } else {
          player.y += player.y < cy ? -overlapY : overlapY;
        }
      }
    }
  }

  // Player facing
  // Convert screen-space mouse to world-space, then aim from player
  const sc = window._scale || 1;
  const _cx = window._camX || 0, _cy = window._camY || 0;
  const worldMouseX = mouse.x / sc + _cx;
  const worldMouseY = mouse.y / sc + _cy;
  player.facing = Math.atan2(worldMouseY - player.y, worldMouseX - player.x);

  // Shoot
  if (mouse.down || (keybinds && keys[keybinds.shoot])) tryShoot();
  if (keybinds && keys[keybinds.reload]) startReload();
  if (player.invincible > 0) player.invincible--;

  // Horse stomp — damages zombies player runs over
  if (player.onHorse) {
    for (let i = zombies.length-1; i >= 0; i--) {
      const z = zombies[i];
      if (dist(player.x, player.y, z.x, z.y) < player.radius + z.radius + 5) {
        const moving = Math.abs(player.vx) > 0.5 || Math.abs(player.vy) > 0.5;
        if (moving && z.attackCooldown <= 0) {
          z.hp -= 15;
          z.attackCooldown = 20; // reuse cooldown to prevent stomp spam
          if (typeof isBloodEnabled !== 'function' || isBloodEnabled()) {
            for (let p = 0; p < 5; p++) {
              particles.push(new Particle(z.x, z.y, '#c0392b', { spread:4, life:20, size:3 }));
            }
          }
          if (z.hp <= 0) {
            z.alive = false;
            score += z.scoreValue;
            totalKills++;
            const coins = Math.round(z.coinValue * (playerStats.coinMult||1));
            player.coins += coins;
            playSound('coin_pickup');
          particles.push(new Particle(z.x, z.y-10, '#f0c040', { life:60, size:1, upward:1, text:`+${coins}🪙` }));
            addKillFeed(`🐴 +${z.scoreValue} pts`, 'kill');
          }
        }
      }
    }
  }

  // Spawn zombies
  const spawnInterval = Math.max(30, 80 - wave*4);
  if (zombiesSpawned < zombiesLeftThisWave) {
    spawnTimer++;
    if (spawnTimer >= spawnInterval) { spawnZombie(); spawnTimer=0; }
  }

  // Update zombies
  for (let i=zombies.length-1; i>=0; i--) {
    const z = zombies[i];
    const touching = z.update(player.x, player.y, obstacles);
    if (touching && z.attackCooldown<=0) {
      player.takeDamage(z.damage);
      z.attackCooldown = 40;
      playSound('player_hurt');
      flashDamage();
    }
    if (!z.alive) zombies.splice(i,1);
  }

  // Update civilians — handle infection turning
  for (const c of civilians) {
    const result = c.update(player.x, player.y, zombies, obstacles);
    if (result === 'turned') {
      // Spawn a fresh zombie in their place
      const newZ = new Zombie(c.x, c.y, wave);
      newZ.speed *= 0.85; // freshly turned — a bit slower
      zombies.push(newZ);
      zombiesLeftThisWave++; // counts as an extra zombie
      // Particle burst
      for (let p = 0; p < 12; p++) {
        particles.push(new Particle(c.x, c.y, '#4aaa3a', { spread:6, life:35, size:4 }));
      }
      playSound('civilian_turned');
      addKillFeed('😱 Civilian turned!', 'civ');
    }
  }

  // Update bullets
  for (let i=bullets.length-1; i>=0; i--) {
    const b = bullets[i];
    b.update(obstacles);

    // Hit zombies
    for (let j=zombies.length-1; j>=0; j--) {
      const z = zombies[j];
      if (circlesOverlap(b, z)) {
        z.hp -= b.damage;
        b.alive = false;
        playSound(z.hp <= 0 ? 'zombie_die' : 'zombie_hit');
        // blood splash
        if (typeof isBloodEnabled !== 'function' || isBloodEnabled()) {
          for (let p=0; p<8; p++) {
            particles.push(new Particle(z.x, z.y, '#c0392b', { spread:5, life:25, size:4 }));
          }
        }
        if (z.hp <= 0) {
          z.alive = false;
          score += z.scoreValue;
          totalKills++;
          const coins = Math.round(z.coinValue * (playerStats.coinMult||1));
          player.coins += coins;
          playSound('coin_pickup');
          particles.push(new Particle(z.x, z.y-10, '#f0c040', { life:60, size:1, upward:1, text:`+${coins}🪙` }));
          addKillFeed(`☠️ +${z.scoreValue} pts`, 'kill');
          // gore
          if (typeof isBloodEnabled !== 'function' || isBloodEnabled()) {
            for (let p=0; p<14; p++) {
              particles.push(new Particle(z.x, z.y, '#8b0000', { spread:8, life:40, size:5, gravity:0.1 }));
            }
          }
        }
        break;
      }
    }

    // Hit civilians
    if (b.alive && b.friendly) {
      for (let j=civilians.length-1; j>=0; j--) {
        const c = civilians[j];
        if (circlesOverlap(b, c)) {
          b.alive = false;
          c.alive = false;
          score = Math.max(0, score - 100);
          civKills++;
          playSound('civilian_hit');
          addKillFeed('💔 -100 pts CIVILIAN!', 'civ');
          for (let p=0; p<6; p++) {
            particles.push(new Particle(c.x, c.y, '#ffaa00', { spread:5, life:30 }));
          }
          particles.push(new Particle(c.x, c.y-20, '#ff4444', { life:80, size:1, upward:0.5, text:'-100 CIVILIAN' }));
          flashDamage();
          break;
        }
      }
    }

    if (!b.alive) bullets.splice(i,1);
  }

  // Remove dead civilians
  for (let i=civilians.length-1; i>=0; i--) {
    if (!civilians[i].alive) civilians.splice(i,1);
  }

  // Respawn civilians
  if (civilians.length < 3 && frameCount % 600 === 0) spawnCivilian();

  // Wave clear
  if (zombiesSpawned >= zombiesLeftThisWave && zombies.length === 0) {
    gameState = 'shop';
    showWaveComplete(wave);
  }

  // Game over
  if (!player.alive) {
    gameState = 'gameover';
    showGameOver();
  }

  // Dust particles
  if (mapData.dustParticles && frameCount%8===0) {
    dustParticles.push({
      x: Math.random()*WORLD_W, y: Math.random()*WORLD_H,
      vx: (Math.random()-0.5)*0.5, vy: -0.2-Math.random()*0.3,
      life: 80+Math.random()*40, maxLife: 120,
      size: 1+Math.random()*2, color: mapId==='graveyard'?'#8a9a70':'#c8a060'
    });
    if (dustParticles.length > 60) dustParticles.shift();
  }
  dustParticles = dustParticles.filter(d => {
    d.x+=d.vx; d.y+=d.vy; d.life--;
    return d.life > 0;
  });

  updateHUD();
  render();
}

// ── RENDER ────────────────────────────────────────────────────────────
function render() {
  const cw = canvas.width, ch = canvas.height;

  // 1:1 pixel scale — camera scrolls through the larger world
  const scale = 1;

  // Camera: center on player, clamp to world edges
  const camX = Math.max(0, Math.min(WORLD_W - cw, player.x - cw / 2));
  const camY = Math.max(0, Math.min(WORLD_H - ch, player.y - ch / 2));

  window._camX = camX;
  window._camY = camY;
  window._scale = scale;

  ctx.save();
  ctx.translate(-camX, -camY);

  drawBackground(ctx, camX, camY, cw, ch);

  // Roads
  for (const r of mapData.roads) {
    ctx.fillStyle = r.color;
    ctx.fillRect(r.x, r.y, r.w, r.h);
    // dashed center line
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1; ctx.setLineDash([10,10]);
    const mid = r.w > r.h ? r.y+r.h/2 : r.x+r.w/2;
    ctx.beginPath();
    if (r.w > r.h) { ctx.moveTo(r.x,mid); ctx.lineTo(r.x+r.w,mid); }
    else            { ctx.moveTo(mid,r.y); ctx.lineTo(mid,r.y+r.h); }
    ctx.stroke(); ctx.setLineDash([]);
  }

  // Grid
  ctx.strokeStyle = mapData.gridColor; ctx.lineWidth = 0.5; ctx.globalAlpha=0.3;
  for (let x=0; x<WORLD_W; x+=40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,WORLD_H); ctx.stroke(); }
  for (let y=0; y<WORLD_H; y+=40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(WORLD_W,y); ctx.stroke(); }
  ctx.globalAlpha=1;

  // Obstacles
  for (const obs of mapData.obstacles) {
    if (obs.round) {
      ctx.fillStyle = obs.color;
      ctx.beginPath(); ctx.arc(obs.x+obs.w/2, obs.y+obs.h/2, obs.w/2, 0, Math.PI*2); ctx.fill();
    } else {
      // shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(obs.x+4, obs.y+6, obs.w, obs.h);
      ctx.fillStyle = obs.color;
      ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
      // roof tint
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(obs.x, obs.y, obs.w, obs.h*0.3);
      // labels removed
    }
  }

  // Dust
  for (const d of dustParticles) {
    ctx.globalAlpha = d.life/d.maxLife * 0.35;
    ctx.fillStyle = d.color;
    ctx.beginPath(); ctx.arc(d.x, d.y, d.size, 0, Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha=1;

  // Entities
  for (const c of civilians) c.draw(ctx);
  for (const z of zombies)   z.draw(ctx);
  for (const b of bullets)   b.draw(ctx);
  player.draw(ctx);
  for (let i=particles.length-1; i>=0; i--) {
    if (!particles[i].update()) particles.splice(i,1);
    else particles[i].draw(ctx);
  }

  // World border
  ctx.strokeStyle = '#000'; ctx.lineWidth = 6;
  ctx.strokeRect(0,0,WORLD_W,WORLD_H);

  ctx.restore();

  // Reload arc (screen space)
  if (reloading) {
    const reloadFrames = Math.round(60 * (playerStats.reloadMult||1));
    const progress = reloadProgress / reloadFrames;
    // Convert world pos to screen pos using stored scale/cam
    const sc = window._scale || 1;
    const cx = window._camX || 0, cy = window._camY || 0;
    const sx = (player.x - cx) * sc;
    const sy = (player.y - cy) * sc;
    const r = 22 * sc;
    ctx.beginPath();
    ctx.arc(sx, sy, r, -Math.PI/2, -Math.PI/2 + Math.PI*2*progress);
    ctx.strokeStyle = '#f0c040'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = 'rgba(240,192,64,0.7)';
    ctx.font = `${9*sc}px Share Tech Mono`; ctx.textAlign='center';
    ctx.fillText('RELOAD', sx, sy + 32*sc); ctx.textAlign='left';
  }
}

function drawBackground(ctxArg) {
  const c = ctxArg || ctx;
  if (gameState === 'playing') {
    // already called within save/translate — fill full world
    c.fillStyle = mapData.bg;
    c.fillRect(0, 0, WORLD_W, WORLD_H);
  } else {
    c.fillStyle = '#0a0804';
    c.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// ── HUD ───────────────────────────────────────────────────────────────
const WEAPON_DEFS = [
  { id: 'revolver', name: 'Revolver', emoji: '🔫', key: '1' },
  { id: 'shotgun',  name: 'Shotgun',  emoji: '💥', key: '2' },
  { id: 'rifle',    name: 'Rifle',    emoji: '🎯', key: '3' },
  { id: 'smg',      name: 'Tommy',    emoji: '⚙️',  key: '4' },
];

function updateHUD() {
  document.getElementById('hud-score').textContent = score.toLocaleString();
  document.getElementById('hud-wave').textContent  = `WAVE ${wave}`;
  document.getElementById('hud-coins').textContent = player.coins;
  document.getElementById('hud-map').textContent   = mapData.emoji + ' ' + mapData.name;
  const hpPct = (player.hp / player.maxHp) * 100;
  document.getElementById('health-fill').style.width = hpPct + '%';
  const remaining = zombiesLeftThisWave - zombiesSpawned + zombies.length;
  document.getElementById('hud-zombies').textContent = remaining + ' left';
  const clipTxt = reloading ? 'RELOAD' : `${currentClip}/${maxClip}`;
  document.getElementById('hud-ammo').textContent = clipTxt;

  // Squeeze stamina bar
  const sqFill = document.getElementById('squeeze-fill');
  if (sqFill) {
    sqFill.style.width = player.squeezeStamina + '%';
    sqFill.classList.toggle('draining', player.squeezing);
    sqFill.classList.toggle('depleted', player.squeezeDeplete);
  }
  // Update squeeze label with current keybind
  const sqLabel = document.querySelector('#squeeze-bar-wrap .hud-label');
  if (sqLabel && keybinds) {
    const keyName = typeof getKeyLabel === 'function' ? getKeyLabel(keybinds.squeeze) : 'SHIFT';
    sqLabel.innerHTML = `Squeeze <span style="font-size:0.6rem;color:var(--dim)">[${keyName}]</span>`;
  }

  // Weapon slots
  const row = document.getElementById('weapon-slot-row');
  if (row) {
    row.innerHTML = '';
    for (const def of WEAPON_DEFS) {
      const owned = upgrades.find(u => u.id === def.id && u.level > 0);
      const div = document.createElement('div');
      div.className = 'weapon-slot' + (owned ? '' : ' empty') + (owned && selectedWeaponId === def.id ? ' active' : '');
      div.innerHTML = `
        <span class="weapon-slot-key">${def.key}</span>
        <span class="weapon-slot-icon">${def.emoji}</span>
        <span class="weapon-slot-name">${def.name}</span>
      `;
      if (owned) {
        div.addEventListener('click', () => selectWeapon(def.id));
      }
      row.appendChild(div);
    }
  }
}

// ── SHOP ─────────────────────────────────────────────────────────────
function showWaveComplete(waveNum) {
  exitPointerLock();

  const overlay = document.getElementById('wave-complete-overlay');
  const title   = document.getElementById('wc-title');
  const sub     = document.getElementById('wc-sub');

  title.textContent = `Wave ${waveNum} Complete`;
  sub.textContent   = 'Heading to the Outfitter...';

  // Reset animations by cloning nodes
  const newTitle = title.cloneNode(true);
  const newSub   = sub.cloneNode(true);
  title.parentNode.replaceChild(newTitle, title);
  sub.parentNode.replaceChild(newSub, sub);

  overlay.classList.add('visible');

  // After 1.8s fade out overlay, then show shop
  setTimeout(() => {
    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.classList.remove('visible');
      overlay.style.opacity = '';
      overlay.style.transition = '';
      showShop();
    }, 400);
  }, 1800);
}

function showShop() {
  const el = document.getElementById('shop-screen');
  el.style.display = 'block';
  void el.offsetWidth;
  el.classList.add('shop-open');
  renderShop();
}

function renderShop() {
  document.getElementById('shop-coins-display').textContent = `🪙 ${player.coins} coins`;

  const grid = document.getElementById('shop-grid');
  grid.innerHTML = '';

  for (const upg of upgrades) {
    if (upg.default) continue; // revolver is always owned, skip

    const isConsumable = upg.category === 'consumable';
    const owned    = !isConsumable && upg.level >= upg.maxLevel;
    const isFullHealth = upg.id === 'medkit' && player.hp >= player.maxHp;
    const cantAfford = player.coins < upg.cost || isFullHealth;
    const div = document.createElement('div');
    div.className = 'shop-item' + (owned ? ' owned' : '') + (!owned && cantAfford ? ' cant-afford' : '');

    // level dots (not for consumables)
    const maxL = Math.min(upg.maxLevel, 3);
    const dots = !isConsumable && upg.maxLevel > 1 ? `<div class="level-dots">${Array.from({length:maxL},(_,i)=>`<div class="level-dot ${i<upg.level?'filled':''}"></div>`).join('')}</div>` : '';

    // Show current HP for medkit
    const extraInfo = isConsumable && upg.id === 'medkit'
      ? `<div style="font-family:'Share Tech Mono',monospace;font-size:0.65rem;color:${player.hp >= player.maxHp ? '#e74c3c' : '#2ecc71'};margin-top:2px;">${player.hp >= player.maxHp ? '✦ FULL HP' : `HP: ${Math.round(player.hp)}/${player.maxHp}`}</div>`
      : '';

    div.innerHTML = `
      <div class="item-icon">${upg.emoji}</div>
      <div class="item-name">${upg.name}</div>
      <div class="item-desc">${upg.desc}</div>
      ${extraInfo}
      <div class="item-price">${owned ? (upg.maxLevel===1?'✅ OWNED':'✅ MAXED') : `🪙 ${upg.cost}`}</div>
      ${dots}
    `;

    if (!owned && !cantAfford) {
      div.addEventListener('click', () => buyUpgrade(upg.id));
    }
    grid.appendChild(div);
  }
}

function buyUpgrade(id) {
  const upg = upgrades.find(u=>u.id===id);
  if (!upg || player.coins < upg.cost || upg.level >= upg.maxLevel) return;
  player.coins -= upg.cost;
  upg.level++;
  playSound('shop_buy');

  if (upg.effect) {
    // Route effect to the right target based on category
    if (upg.category === 'player' || upg.category === 'consumable') {
      upg.effect(player);
    } else {
      // gun_mod, weapon mods etc — apply to playerStats
      upg.effect(playerStats);
    }
  }

  // If bought a weapon, auto-select it
  if (upg.category === 'weapon') {
    selectedWeaponId = upg.id;
  }

  // Always refresh clip size after any purchase
  const wep = getActiveWeapon();
  maxClip = (wep.stats.clip || 6) + (playerStats.clipBonus || 0);
  currentClip = maxClip;

  // Refresh health bar immediately
  const hpPct = (player.hp / player.maxHp) * 100;
  document.getElementById('health-fill').style.width = hpPct + '%';
  document.getElementById('shop-coins-display').textContent = `🪙 ${player.coins} coins`;

  renderShop();
}

function closeShop() {
  const el = document.getElementById('shop-screen');
  el.classList.remove('shop-open');
  el.style.display = 'none';
  gameState = 'playing';
  requestPointerLock();
  nextWave();
}

// ── GAME OVER ─────────────────────────────────────────────────────────
function showGameOver() {
  exitPointerLock();
  playSound('player_die');
  const el = document.getElementById('gameover-screen');
  // Force animation replay by resetting then re-displaying
  el.style.display = 'none';
  el.style.animation = 'none';
  // Reset word animations too
  const you = el.querySelector('.go-you');
  const died = el.querySelector('.go-died');
  const shock = el.querySelector('.go-shockwave');
  [you, died, shock].forEach(e => { if(e) e.style.animation = 'none'; });
  // Force reflow
  void el.offsetWidth;
  // Re-enable animations
  el.style.animation = '';
  [you, died, shock].forEach(e => { if(e) e.style.animation = ''; });

  el.style.display = 'flex';
  document.getElementById('go-score').innerHTML = `
    Score: <b>${score.toLocaleString()}</b><br>
    Waves Survived: <b>${wave}</b><br>
    Zombies Killed: <b>${totalKills}</b><br>
    Civilians Hit: <b style="color:${civKills>0?'#e74c3c':'#2ecc71'}">${civKills}</b>
  `;
}

function goToMenu() {
  document.getElementById('gameover-screen').style.display = 'none';
  document.getElementById('hud').style.display = 'none';
  document.getElementById('hud-bottom').style.display = 'none';
  document.getElementById('pause-overlay').style.display = 'none';
  exitPointerLock();
  lastMapId = mapId;
  showMenu();
}

// ── DAMAGE FLASH ──────────────────────────────────────────────────────
let flashTimeout;
function flashDamage() {
  const el = document.getElementById('damage-flash');
  el.style.opacity = 1;
  clearTimeout(flashTimeout);
  flashTimeout = setTimeout(() => el.style.opacity = 0, 100);
}

// ── KILLFEED ──────────────────────────────────────────────────────────
let killfeedTimeout;
function addKillFeed(text, type) {
  const feed = document.getElementById('killfeed');
  const entry = document.createElement('div');
  entry.className = `kf-entry kf-${type}`;
  entry.textContent = text;
  feed.appendChild(entry);
  setTimeout(() => entry.remove(), 2000);
}

// ── PAUSE ─────────────────────────────────────────────────────────────
function togglePause() {
  if (gameState === 'playing') {
    gameState = 'paused';
    document.getElementById('pause-overlay').style.display = 'flex';
    exitPointerLock();
  } else if (gameState === 'paused') {
    gameState = 'playing';
    document.getElementById('pause-overlay').style.display = 'none';
    requestPointerLock();
  }
}

// ── MOBILE CONTROLS ──────────────────────────────────────────────────
function initMobileControls() {
  const joystick = document.getElementById('joystick-area');
  const dot = document.getElementById('joystick-dot');
  if (!joystick) return;
  window.joystickDelta = null;
  let origin = null;

  joystick.addEventListener('touchstart', e => {
    const t = e.touches[0];
    const r = joystick.getBoundingClientRect();
    origin = { x: r.left+r.width/2, y: r.top+r.height/2 };
  }, {passive:true});

  joystick.addEventListener('touchmove', e => {
    if (!origin) return;
    const t = e.touches[0];
    const dx = t.clientX-origin.x, dy = t.clientY-origin.y;
    const d  = Math.min(Math.sqrt(dx*dx+dy*dy), 40);
    const ang = Math.atan2(dy,dx);
    window.joystickDelta = { x: Math.cos(ang)*(d/40), y: Math.sin(ang)*(d/40) };
    dot.style.transform = `translate(calc(-50% + ${Math.cos(ang)*d}px), calc(-50% + ${Math.sin(ang)*d}px))`;
    e.preventDefault();
  }, {passive:false});

  joystick.addEventListener('touchend', () => {
    window.joystickDelta = null;
    dot.style.transform = 'translate(-50%,-50%)';
    origin = null;
  });

  const fireBtn = document.getElementById('fire-btn');
  fireBtn.addEventListener('touchstart', () => mouse.down=true, {passive:true});
  fireBtn.addEventListener('touchend',   () => mouse.down=false);
}
