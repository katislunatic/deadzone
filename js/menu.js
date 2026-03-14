// ── MENU / SLOT MACHINE ────────────────────────────────────────────────

let slotChosenMap = null;
let isSpinning = false;

function showMenu() {
  document.getElementById('menu-screen').style.display = 'flex';
  slotChosenMap = null;
  document.getElementById('map-result').textContent = '';
  document.getElementById('play-btn').disabled = true;
  document.getElementById('play-btn').textContent = 'SPIN FIRST';
  document.getElementById('spin-btn').disabled = false;
  document.getElementById('spin-btn').classList.remove('spinning');
  document.getElementById('spin-btn').textContent = 'SPIN';
}

function spinSlotMachine() {
  if (isSpinning) return;
  isSpinning = true;

  const spinBtn = document.getElementById('spin-btn');
  spinBtn.classList.add('spinning');
  spinBtn.textContent = 'SPINNING...';
  document.getElementById('play-btn').disabled = true;
  document.getElementById('map-result').textContent = '';

  const strip = document.getElementById('reel-strip');
  const items = getSlotItems();
  // Build big reel: repeat items ~6x for animation
  const reel = [];
  for (let i=0; i<6; i++) reel.push(...items);

  // Populate strip
  strip.innerHTML = '';
  for (const item of reel) {
    const div = document.createElement('div');
    div.className = 'reel-item';
    div.innerHTML = `<span style="font-size:2.5rem">${item.emoji}</span><span>${item.name}</span>`;
    strip.appendChild(div);
  }

  // Determine winning map (no same as last)
  const winner = getRandomMap(lastMapId);
  const winnerIndex = reel.findLastIndex(r => r.id === winner);

  // Animate
  const itemH = 90;
  let currentPos = 0;
  const targetPos = winnerIndex * itemH;
  const totalFrames = 80;
  let frame = 0;

  // easeOutCubic
  function easeOut(t) { return 1 - Math.pow(1-t, 3); }

  let lastTickItem = -1;

  function animFrame() {
    frame++;
    const t = Math.min(frame / totalFrames, 1);
    const eased = easeOut(t);
    currentPos = eased * targetPos;
    strip.style.transform = `translateY(-${currentPos}px)`;

    // Play a tick each time we pass a new item — slower ticks near the end
    const currentItem = Math.floor(currentPos / itemH);
    if (currentItem !== lastTickItem) {
      lastTickItem = currentItem;
      // Only tick if playSound is available (game loaded)
      if (typeof playSound === 'function') playSound('slot_spin_tick');
    }

    if (t < 1) {
      requestAnimationFrame(animFrame);
    } else {
      // Done — landing sound
      if (typeof playSound === 'function') playSound('slot_spin_land');
      isSpinning = false;
      slotChosenMap = winner;
      const map = MAPS[winner];
      document.getElementById('map-result').textContent = `${map.emoji} ${map.name}`;
      spinBtn.classList.remove('spinning');
      spinBtn.textContent = 'RESPIN';
      spinBtn.disabled = false;
      document.getElementById('play-btn').disabled = false;
      document.getElementById('play-btn').textContent = `RIDE OUT →`;
    }
  }
  requestAnimationFrame(animFrame);
}

function playChosen() {
  if (!slotChosenMap) return;
  lastMapId = slotChosenMap;
  startGame(slotChosenMap);
}
