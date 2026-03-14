// ── MAPS ─────────────────────────────────────────────────────────────
// Each map defines: id, name, emoji, colors, obstacles, decorations

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
      { x: 200, y: 100, w: 140, h: 80, color: '#7a4a1e', label: 'SALOON' },
      // sheriff office
      { x: 500, y: 80, w: 110, h: 70, color: '#6b3d14', label: 'SHERIFF' },
      // stables
      { x: 100, y: 300, w: 90, h: 120, color: '#8b5e2a', label: '🐴' },
      // water tower
      { x: 420, y: 250, w: 50, h: 50, color: '#5c3d1e', round: true },
      // barrels (scattered)
      { x: 360, y: 160, w: 24, h: 24, color: '#8B4513', round: true },
      { x: 390, y: 155, w: 24, h: 24, color: '#8B4513', round: true },
      { x: 370, y: 180, w: 20, h: 20, color: '#8B4513', round: true },
      // fence rows
      { x: 150, y: 450, w: 200, h: 10, color: '#6b4a1a' },
      { x: 400, y: 480, w: 180, h: 10, color: '#6b4a1a' },
      // mine entrance
      { x: 600, y: 340, w: 80, h: 60, color: '#3d2a0a', label: '⛏️' },
      // wagon
      { x: 280, y: 370, w: 60, h: 35, color: '#8b5e2a' },
      // cactus clusters
      { x: 650, y: 180, w: 18, h: 40, color: '#2d7a3a', round: true },
      { x: 670, y: 200, w: 14, h: 30, color: '#2d7a3a', round: true },
      { x: 120, y: 500, w: 18, h: 38, color: '#2d7a3a', round: true },
    ],
    roads: [
      { x: 0, y: 230, w: 800, h: 40, color: '#b89558' },  // main street
      { x: 350, y: 0, w: 40, h: 600, color: '#b89558' },  // cross street
    ],
    spawnBias: { x: 350, y: 300 },
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
      // skyscrapers / city blocks
      { x: 50,  y: 50,  w: 120, h: 100, color: '#1e2228', label: '🏢' },
      { x: 220, y: 40,  w: 100, h: 130, color: '#252830' },
      { x: 380, y: 60,  w: 140, h: 90,  color: '#1a1d22', label: '🏬' },
      { x: 570, y: 50,  w: 110, h: 110, color: '#222530' },
      { x: 50,  y: 380, w: 130, h: 110, color: '#1e2228' },
      { x: 230, y: 400, w: 110, h: 90,  color: '#252830' },
      { x: 400, y: 370, w: 150, h: 120, color: '#1a1d22', label: '🏪' },
      { x: 580, y: 390, w: 100, h: 100, color: '#222530' },
      // cars (wrecked)
      { x: 180, y: 235, w: 50, h: 28, color: '#3a3a3a', round: false },
      { x: 310, y: 245, w: 50, h: 28, color: '#4a2a2a' },
      { x: 480, y: 228, w: 50, h: 28, color: '#2a3a4a' },
      // dumpsters
      { x: 350, y: 300, w: 35, h: 25, color: '#1a3a1a' },
      { x: 150, y: 360, w: 35, h: 25, color: '#1a3a1a' },
      { x: 560, y: 330, w: 35, h: 25, color: '#1a3a1a' },
      // fire hydrant / lamp post
      { x: 340, y: 190, w: 14, h: 14, color: '#c0392b', round: true },
      { x: 460, y: 190, w: 10, h: 10, color: '#888', round: true },
    ],
    roads: [
      { x: 0,   y: 210, w: 800, h: 50, color: '#222530' },
      { x: 0,   y: 320, w: 800, h: 40, color: '#222530' },
      { x: 155, y: 0,   w: 50,  h: 600, color: '#222530' },
      { x: 330, y: 0,   w: 50,  h: 600, color: '#222530' },
      { x: 510, y: 0,   w: 50,  h: 600, color: '#222530' },
    ],
    spawnBias: { x: 400, y: 300 },
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
      // houses
      { x: 60,  y: 60,  w: 90, h: 80, color: '#8b5a2a', label: '🏠' },
      { x: 200, y: 70,  w: 90, h: 80, color: '#7a4a20' },
      { x: 470, y: 55,  w: 100,h: 85, color: '#8b5a2a', label: '🏠' },
      { x: 600, y: 65,  w: 90, h: 80, color: '#7a4a20' },
      { x: 50,  y: 380, w: 90, h: 80, color: '#6b3a18' },
      { x: 190, y: 390, w: 90, h: 80, color: '#8b5a2a', label: '🏠' },
      { x: 480, y: 370, w: 100,h: 90, color: '#7a4a20' },
      { x: 610, y: 380, w: 90, h: 80, color: '#8b5a2a' },
      // church
      { x: 330, y: 50,  w: 100,h: 100, color: '#e8e0d0', label: '⛪' },
      // park / pond
      { x: 300, y: 270, w: 80, h: 60, color: '#2a6aaa', round: true },
      // trees
      { x: 155, y: 175, w: 30, h: 30, color: '#1a5a20', round: true },
      { x: 450, y: 180, w: 30, h: 30, color: '#1a5a20', round: true },
      { x: 370, y: 350, w: 28, h: 28, color: '#1a5a20', round: true },
      { x: 80,  y: 280, w: 28, h: 28, color: '#1a5a20', round: true },
      { x: 650, y: 270, w: 28, h: 28, color: '#1a5a20', round: true },
      // fence
      { x: 50,  y: 170, w: 400, h: 8, color: '#6b4a1a' },
      // market stalls
      { x: 320, y: 200, w: 60, h: 40, color: '#c8a020', label: '🛒' },
    ],
    roads: [
      { x: 0,   y: 175, w: 800, h: 45, color: '#5c4a2a' },
      { x: 0,   y: 345, w: 800, h: 45, color: '#5c4a2a' },
      { x: 320, y: 0,   w: 55,  h: 600, color: '#5c4a2a' },
    ],
    spawnBias: { x: 380, y: 270 },
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
      // mausoleum
      { x: 310, y: 220, w: 120, h: 90, color: '#2a2a30', label: '🏛️' },
      // grave rows
      ...Array.from({length: 6}, (_,i) => ({ x: 60 + i*105, y: 80,  w: 30, h: 45, color: '#3a3a3a' })),
      ...Array.from({length: 6}, (_,i) => ({ x: 60 + i*105, y: 150, w: 30, h: 45, color: '#353535' })),
      ...Array.from({length: 6}, (_,i) => ({ x: 60 + i*105, y: 380, w: 30, h: 45, color: '#3a3a3a' })),
      ...Array.from({length: 6}, (_,i) => ({ x: 60 + i*105, y: 450, w: 30, h: 45, color: '#353535' })),
      // dead trees
      { x: 50,  y: 240, w: 20, h: 60, color: '#2a2010', round: true },
      { x: 700, y: 220, w: 20, h: 60, color: '#2a2010', round: true },
      { x: 680, y: 370, w: 20, h: 55, color: '#2a2010', round: true },
      // chapel
      { x: 580, y: 60,  w: 120, h: 100, color: '#1e2018', label: '⛪' },
      // fence around perimeter (partial)
      { x: 30,  y: 30,  w: 740, h: 10, color: '#2a2020' },
      { x: 30,  y: 570, w: 740, h: 10, color: '#2a2020' },
      { x: 30,  y: 30,  w: 10,  h: 550, color: '#2a2020' },
      { x: 760, y: 30,  w: 10,  h: 550, color: '#2a2020' },
      // coffins
      { x: 200, y: 290, w: 45, h: 22, color: '#3d2810' },
      { x: 560, y: 310, w: 45, h: 22, color: '#3d2810' },
    ],
    roads: [
      { x: 0,   y: 280, w: 800, h: 30, color: '#181e18' },
      { x: 370, y: 0,   w: 30,  h: 600, color: '#181e18' },
    ],
    spawnBias: { x: 400, y: 300 },
    bgDecals: ['💀','🦇','🌑'],
  }
};

const MAP_ORDER = ['western', 'city', 'town', 'graveyard'];

function getRandomMap(lastMapId) {
  const available = MAP_ORDER.filter(id => id !== lastMapId);
  return available[Math.floor(Math.random() * available.length)];
}

// Slot machine animation data
function getSlotItems() {
  return MAP_ORDER.map(id => ({ id, ...MAPS[id] }));
}
