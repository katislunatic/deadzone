// ── MAPS ─────────────────────────────────────────────────────────────

const MAPS = {
  western: {
    id: 'western',
    name: 'Dusty Gulch',
    emoji: '🤠',
    bg: '#c8a96e',
    gridColor: '#b89558',
    ambientColor: '#e8c888',
    dustParticles: true,
    obstacles: [
      // saloon
      { x: 120,  y: 80,   w: 220, h: 140, color: '#7a4a1e' },
      // sheriff office
      { x: 520,  y: 90,   w: 180, h: 130, color: '#6b3d14' },
      // bank
      { x: 950,  y: 80,   w: 200, h: 140, color: '#5c3218' },
      // general store
      { x: 1250, y: 90,   w: 200, h: 130, color: '#7a4a1e' },
      // stables
      { x: 80,   y: 420,  w: 160, h: 200, color: '#8b5e2a' },
      // water tower
      { x: 700,  y: 350,  w: 80,  h: 80,  color: '#5c3d1e', round: true },
      // water tower 2
      { x: 1300, y: 500,  w: 80,  h: 80,  color: '#5c3d1e', round: true },
      // barrels clusters
      { x: 420,  y: 250,  w: 36,  h: 36,  color: '#8B4513', round: true },
      { x: 465,  y: 242,  w: 36,  h: 36,  color: '#8B4513', round: true },
      { x: 440,  y: 278,  w: 30,  h: 30,  color: '#8B4513', round: true },
      { x: 860,  y: 500,  w: 36,  h: 36,  color: '#8B4513', round: true },
      { x: 900,  y: 492,  w: 30,  h: 30,  color: '#8B4513', round: true },
      // fence rows
      { x: 100,  y: 700,  w: 380, h: 14,  color: '#6b4a1a' },
      { x: 600,  y: 750,  w: 360, h: 14,  color: '#6b4a1a' },
      { x: 1050, y: 720,  w: 340, h: 14,  color: '#6b4a1a' },
      { x: 1350, y: 800,  w: 200, h: 14,  color: '#6b4a1a' },
      // mine entrance
      { x: 1380, y: 350,  w: 140, h: 110, color: '#3d2a0a' },
      // mine 2
      { x: 200,  y: 900,  w: 140, h: 100, color: '#3d2a0a' },
      // wagons
      { x: 550,  y: 580,  w: 100, h: 60,  color: '#8b5e2a' },
      { x: 1100, y: 480,  w: 100, h: 60,  color: '#7a4e1a' },
      // cactus clusters
      { x: 1480, y: 200,  w: 28,  h: 60,  color: '#2d7a3a', round: true },
      { x: 1510, y: 230,  w: 22,  h: 46,  color: '#2d7a3a', round: true },
      { x: 100,  y: 1050, w: 28,  h: 58,  color: '#2d7a3a', round: true },
      { x: 750,  y: 1080, w: 24,  h: 50,  color: '#2d7a3a', round: true },
      { x: 1400, y: 980,  w: 26,  h: 55,  color: '#2d7a3a', round: true },
      // outpost shack
      { x: 900,  y: 900,  w: 160, h: 120, color: '#6b3d14' },
      // rocks
      { x: 300,  y: 600,  w: 60,  h: 45,  color: '#7a6040', round: true },
      { x: 1200, y: 650,  w: 55,  h: 42,  color: '#7a6040', round: true },
    ],
    roads: [
      { x: 0,    y: 380,  w: 1600, h: 70,  color: '#b89558' },
      { x: 0,    y: 800,  w: 1600, h: 55,  color: '#b89558' },
      { x: 640,  y: 0,    w: 65,   h: 1200, color: '#b89558' },
      { x: 1100, y: 0,    w: 65,   h: 1200, color: '#b89558' },
    ],
    spawnX: 672, spawnY: 415,
    bgDecals: ['🌵','🪨','💀'],
  },

  city: {
    id: 'city',
    name: 'Dead City',
    emoji: '🏙️',
    bg: '#2a2d35',
    gridColor: '#343840',
    ambientColor: '#3a4050',
    dustParticles: false,
    obstacles: [
      // city blocks — top row
      { x: 40,   y: 40,   w: 200, h: 180, color: '#1e2228' },
      { x: 300,  y: 30,   w: 180, h: 220, color: '#252830' },
      { x: 560,  y: 50,   w: 220, h: 170, color: '#1a1d22' },
      { x: 870,  y: 40,   w: 190, h: 190, color: '#222530' },
      { x: 1150, y: 35,   w: 210, h: 180, color: '#1e2228' },
      { x: 1430, y: 50,   w: 140, h: 170, color: '#252830' },
      // city blocks — middle row
      { x: 40,   y: 500,  w: 190, h: 170, color: '#1e2228' },
      { x: 310,  y: 510,  w: 170, h: 160, color: '#252830' },
      { x: 570,  y: 490,  w: 200, h: 180, color: '#1a1d22' },
      { x: 870,  y: 500,  w: 190, h: 170, color: '#222530' },
      { x: 1160, y: 490,  w: 200, h: 180, color: '#1e2228' },
      { x: 1440, y: 510,  w: 140, h: 160, color: '#252830' },
      // city blocks — bottom row
      { x: 40,   y: 920,  w: 200, h: 180, color: '#1e2228' },
      { x: 310,  y: 930,  w: 180, h: 170, color: '#252830' },
      { x: 570,  y: 910,  w: 210, h: 190, color: '#1a1d22' },
      { x: 880,  y: 920,  w: 190, h: 180, color: '#222530' },
      { x: 1160, y: 910,  w: 200, h: 190, color: '#1e2228' },
      { x: 1440, y: 930,  w: 140, h: 170, color: '#252830' },
      // wrecked cars
      { x: 260,  y: 415,  w: 80,  h: 44,  color: '#3a3a3a' },
      { x: 540,  y: 425,  w: 80,  h: 44,  color: '#4a2a2a' },
      { x: 820,  y: 410,  w: 80,  h: 44,  color: '#2a3a4a' },
      { x: 1090, y: 420,  w: 80,  h: 44,  color: '#3a3030' },
      { x: 260,  y: 830,  w: 80,  h: 44,  color: '#2a3a3a' },
      { x: 820,  y: 840,  w: 80,  h: 44,  color: '#3a2a2a' },
      { x: 1350, y: 825,  w: 80,  h: 44,  color: '#3a3a2a' },
      // dumpsters
      { x: 500,  y: 460,  w: 55,  h: 40,  color: '#1a3a1a' },
      { x: 760,  y: 470,  w: 55,  h: 40,  color: '#1a3a1a' },
      { x: 1040, y: 455,  w: 55,  h: 40,  color: '#1a3a1a' },
      { x: 500,  y: 870,  w: 55,  h: 40,  color: '#1a3a1a' },
      { x: 1300, y: 860,  w: 55,  h: 40,  color: '#1a3a1a' },
      // fire hydrants / lamp posts
      { x: 535,  y: 350,  w: 20,  h: 20,  color: '#c0392b', round: true },
      { x: 790,  y: 355,  w: 16,  h: 16,  color: '#888', round: true },
      { x: 1090, y: 348,  w: 20,  h: 20,  color: '#c0392b', round: true },
    ],
    roads: [
      { x: 0,    y: 380,  w: 1600, h: 80,  color: '#222530' },
      { x: 0,    y: 790,  w: 1600, h: 70,  color: '#222530' },
      { x: 250,  y: 0,    w: 80,   h: 1200, color: '#222530' },
      { x: 520,  y: 0,    w: 80,   h: 1200, color: '#222530' },
      { x: 790,  y: 0,    w: 80,   h: 1200, color: '#222530' },
      { x: 1060, y: 0,    w: 80,   h: 1200, color: '#222530' },
      { x: 1330, y: 0,    w: 80,   h: 1200, color: '#222530' },
    ],
    spawnX: 835, spawnY: 420,
    bgDecals: ['🚗','💡','🗑️'],
  },

  town: {
    id: 'town',
    name: 'Hollow Creek',
    emoji: '🏘️',
    bg: '#4a6b3a',
    gridColor: '#3d5a30',
    ambientColor: '#5a8040',
    dustParticles: false,
    obstacles: [
      // houses — top row
      { x: 50,   y: 50,   w: 150, h: 130, color: '#8b5a2a' },
      { x: 260,  y: 60,   w: 150, h: 130, color: '#7a4a20' },
      { x: 470,  y: 50,   w: 150, h: 130, color: '#8b5a2a' },
      { x: 820,  y: 55,   w: 160, h: 140, color: '#7a4a20' },
      { x: 1060, y: 50,   w: 150, h: 130, color: '#8b5a2a' },
      { x: 1270, y: 60,   w: 150, h: 130, color: '#6b3a18' },
      { x: 1430, y: 50,   w: 140, h: 130, color: '#8b5a2a' },
      // houses — middle row
      { x: 50,   y: 560,  w: 150, h: 130, color: '#6b3a18' },
      { x: 260,  y: 570,  w: 150, h: 130, color: '#8b5a2a' },
      { x: 820,  y: 560,  w: 160, h: 130, color: '#7a4a20' },
      { x: 1060, y: 565,  w: 150, h: 130, color: '#8b5a2a' },
      { x: 1430, y: 560,  w: 140, h: 130, color: '#7a4a20' },
      // houses — bottom row
      { x: 50,   y: 970,  w: 150, h: 130, color: '#8b5a2a' },
      { x: 260,  y: 980,  w: 150, h: 130, color: '#7a4a20' },
      { x: 550,  y: 970,  w: 160, h: 130, color: '#6b3a18' },
      { x: 870,  y: 975,  w: 150, h: 130, color: '#8b5a2a' },
      { x: 1100, y: 970,  w: 150, h: 130, color: '#7a4a20' },
      { x: 1360, y: 980,  w: 150, h: 130, color: '#8b5a2a' },
      // church (center)
      { x: 680,  y: 80,   w: 170, h: 170, color: '#e8e0d0' },
      // town hall
      { x: 680,  y: 560,  w: 180, h: 150, color: '#d4c8a8' },
      // park / pond
      { x: 560,  y: 380,  w: 130, h: 100, color: '#2a6aaa', round: true },
      { x: 1150, y: 800,  w: 110, h: 85,  color: '#2a6aaa', round: true },
      // trees scattered
      { x: 210,  y: 290,  w: 48,  h: 48,  color: '#1a5a20', round: true },
      { x: 440,  y: 320,  w: 44,  h: 44,  color: '#1a5a20', round: true },
      { x: 820,  y: 380,  w: 48,  h: 48,  color: '#1a5a20', round: true },
      { x: 1050, y: 310,  w: 44,  h: 44,  color: '#1a5a20', round: true },
      { x: 1340, y: 350,  w: 48,  h: 48,  color: '#1a5a20', round: true },
      { x: 130,  y: 770,  w: 44,  h: 44,  color: '#1a5a20', round: true },
      { x: 750,  y: 850,  w: 48,  h: 48,  color: '#1a5a20', round: true },
      { x: 1480, y: 780,  w: 44,  h: 44,  color: '#1a5a20', round: true },
      // fences
      { x: 50,   y: 280,  w: 620, h: 12,  color: '#6b4a1a' },
      { x: 870,  y: 280,  w: 620, h: 12,  color: '#6b4a1a' },
      // market stalls
      { x: 520,  y: 490,  w: 90,  h: 60,  color: '#c8a020' },
      { x: 980,  y: 490,  w: 90,  h: 60,  color: '#c8a020' },
    ],
    roads: [
      { x: 0,    y: 280,  w: 1600, h: 75,  color: '#5c4a2a' },
      { x: 0,    y: 760,  w: 1600, h: 75,  color: '#5c4a2a' },
      { x: 640,  y: 0,    w: 90,   h: 1200, color: '#5c4a2a' },
      { x: 1100, y: 0,    w: 90,   h: 1200, color: '#5c4a2a' },
    ],
    spawnX: 685, spawnY: 318,
    bgDecals: ['🌿','🌻','🍂'],
  },

  graveyard: {
    id: 'graveyard',
    name: 'Blackmoor Cemetery',
    emoji: '⚰️',
    bg: '#1a1f1a',
    gridColor: '#151a15',
    ambientColor: '#202820',
    dustParticles: true,
    obstacles: [
      // mausoleum (center)
      { x: 680,  y: 480,  w: 200, h: 160, color: '#2a2a30' },
      // chapel
      { x: 1200, y: 80,   w: 200, h: 180, color: '#1e2018' },
      // second chapel
      { x: 200,  y: 900,  w: 180, h: 160, color: '#1e2018' },
      // grave rows — top section
      ...Array.from({length: 8}, (_,i) => ({ x: 60  + i*160, y: 80,  w: 50, h: 75, color: '#3a3a3a' })),
      ...Array.from({length: 8}, (_,i) => ({ x: 60  + i*160, y: 190, w: 50, h: 75, color: '#353535' })),
      // grave rows — bottom section
      ...Array.from({length: 8}, (_,i) => ({ x: 60  + i*160, y: 880, w: 50, h: 75, color: '#3a3a3a' })),
      ...Array.from({length: 8}, (_,i) => ({ x: 60  + i*160, y: 990, w: 50, h: 75, color: '#353535' })),
      // grave rows — left side
      ...Array.from({length: 5}, (_,i) => ({ x: 60,  y: 380 + i*130, w: 50, h: 75, color: '#3a3a3a' })),
      // grave rows — right side
      ...Array.from({length: 5}, (_,i) => ({ x: 1490, y: 380 + i*130, w: 50, h: 75, color: '#353535' })),
      // dead trees
      { x: 50,   y: 560,  w: 30,  h: 90,  color: '#2a2010', round: true },
      { x: 1530, y: 300,  w: 30,  h: 90,  color: '#2a2010', round: true },
      { x: 1490, y: 700,  w: 30,  h: 85,  color: '#2a2010', round: true },
      { x: 500,  y: 700,  w: 28,  h: 80,  color: '#2a2010', round: true },
      { x: 1050, y: 750,  w: 28,  h: 80,  color: '#2a2010', round: true },
      // perimeter fence
      { x: 20,   y: 20,   w: 1560, h: 16,  color: '#2a2020' },
      { x: 20,   y: 1165, w: 1560, h: 16,  color: '#2a2020' },
      { x: 20,   y: 20,   w: 16,   h: 1160, color: '#2a2020' },
      { x: 1565, y: 20,   w: 16,   h: 1160, color: '#2a2020' },
      // coffins
      { x: 420,  y: 560,  w: 75,  h: 38,  color: '#3d2810' },
      { x: 1080, y: 600,  w: 75,  h: 38,  color: '#3d2810' },
      { x: 780,  y: 750,  w: 75,  h: 38,  color: '#3d2810' },
      { x: 350,  y: 800,  w: 75,  h: 38,  color: '#3d2810' },
    ],
    roads: [
      { x: 0,    y: 580,  w: 1600, h: 50,  color: '#181e18' },
      { x: 750,  y: 0,    w: 50,   h: 1200, color: '#181e18' },
      { x: 0,    y: 310,  w: 680,  h: 40,  color: '#181e18' },
      { x: 850,  y: 310,  w: 750,  h: 40,  color: '#181e18' },
    ],
    spawnX: 775, spawnY: 605,
    bgDecals: ['💀','🦇','🌑'],
  }
};

const MAP_ORDER = ['western', 'city', 'town', 'graveyard'];

function getRandomMap(lastMapId) {
  const available = MAP_ORDER.filter(id => id !== lastMapId);
  return available[Math.floor(Math.random() * available.length)];
}

function getSlotItems() {
  return MAP_ORDER.map(id => ({ id, ...MAPS[id] }));
}
