// ── UPGRADES ──────────────────────────────────────────────────────────

const UPGRADES = [
  {
    id: 'revolver',
    name: 'Revolver',
    emoji: '🔫',
    desc: 'Starter iron. Reliable.',
    category: 'weapon',
    cost: 0,
    maxLevel: 1,
    default: true,
    stats: { damage: 25, fireRate: 18, bulletSpeed: 12, spread: 0.06, clip: 6 }
  },
  {
    id: 'shotgun',
    name: 'Shotgun',
    emoji: '💥',
    desc: 'Fires 5 pellets. Devastating up close.',
    category: 'weapon',
    cost: 120,
    maxLevel: 1,
    stats: { damage: 18, fireRate: 35, bulletSpeed: 10, spread: 0.35, clip: 2, pellets: 5 }
  },
  {
    id: 'rifle',
    name: 'Lever Rifle',
    emoji: '🎯',
    desc: 'Long range precision. Faster repeat.',
    category: 'weapon',
    cost: 180,
    maxLevel: 1,
    stats: { damage: 40, fireRate: 22, bulletSpeed: 18, spread: 0.02, clip: 8 }
  },
  {
    id: 'smg',
    name: 'Tommy Gun',
    emoji: '⚙️',
    desc: 'Full auto. Eat through ammo fast.',
    category: 'weapon',
    cost: 280,
    maxLevel: 1,
    stats: { damage: 14, fireRate: 6, bulletSpeed: 14, spread: 0.12, clip: 30, auto: true }
  },
  // ── GUN UPGRADES ──
  {
    id: 'damage_up',
    name: 'Steel Rounds',
    emoji: '🔩',
    desc: '+20% bullet damage',
    category: 'gun_mod',
    cost: 80,
    maxLevel: 3,
    effect: (s) => { s.gunDamageMult = (s.gunDamageMult||1) + 0.2; }
  },
  {
    id: 'fire_rate_up',
    name: 'Hair Trigger',
    emoji: '⚡',
    desc: '-15% fire delay',
    category: 'gun_mod',
    cost: 90,
    maxLevel: 3,
    effect: (s) => { s.fireRateMult = (s.fireRateMult||1) * 0.85; }
  },
  {
    id: 'clip_up',
    name: 'Extended Mag',
    emoji: '📦',
    desc: '+4 rounds per clip',
    category: 'gun_mod',
    cost: 70,
    maxLevel: 3,
    effect: (s) => { s.clipBonus = (s.clipBonus||0) + 4; }
  },
  // ── PLAYER UPGRADES ──
  {
    id: 'armor',
    name: 'Leather Armor',
    emoji: '🛡️',
    desc: '+25 max HP',
    category: 'player',
    cost: 100,
    maxLevel: 3,
    effect: (player) => { player.maxHp += 25; player.hp = Math.min(player.hp+25, player.maxHp); }
  },
  {
    id: 'boots',
    name: 'Spurs',
    emoji: '👢',
    desc: '+0.4 move speed',
    category: 'player',
    cost: 110,
    maxLevel: 2,
    effect: (player) => { player.speed += 0.4; }
  },
  {
    id: 'medkit',
    name: 'Field Medkit',
    emoji: '💊',
    desc: 'Restore 40 HP right now',
    category: 'consumable',
    cost: 60,
    maxLevel: 99,
    effect: (player) => { player.hp = Math.min(player.maxHp, player.hp + 40); }
  },
  {
    id: 'horse',
    name: 'Trusty Horse',
    emoji: '🐴',
    desc: '+1.5 speed, stomps deal damage. Yeehaw!',
    category: 'player',
    cost: 250,
    maxLevel: 1,
    effect: (player) => { player.onHorse = true; player.speed += 1.5; }
  },
  {
    id: 'bandolier',
    name: 'Bandolier',
    emoji: '🎖️',
    desc: 'Faster reload speed',
    category: 'gun_mod',
    cost: 130,
    maxLevel: 2,
    effect: (s) => { s.reloadMult = (s.reloadMult||1) * 0.6; }
  },
  {
    id: 'lucky_coin',
    name: 'Lucky Coin',
    emoji: '🪙',
    desc: '+50% coin drops from kills',
    category: 'gun_mod',
    cost: 200,
    maxLevel: 1,
    effect: (s) => { s.coinMult = (s.coinMult||1) * 1.5; }
  },
];

function getUpgrades() {
  return UPGRADES.map(u => ({ ...u, level: u.default ? 1 : 0 }));
}
