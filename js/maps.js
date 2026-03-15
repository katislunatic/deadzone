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
      { x: 120,  y: 80,   w: 220, h: 140, color: '#7a4a1e', roofColor:'#5c3010', windows:[3,2], door:[24,32], sign:'SALOON' },
      // sheriff office
      { x: 520,  y: 90,   w: 180, h: 130, color: '#6b3d14', roofColor:'#4a2a08', windows:[2,2], door:[20,28], sign:'SHERIFF', signColor:'#f0c040' },
      // bank
      { x: 950,  y: 80,   w: 200, h: 140, color: '#5c3218', roofColor:'#3d2008', windows:[2,2], door:[22,30], sign:'BANK', signColor:'#f0c040' },
      // general store
      { x: 1250, y: 90,   w: 200, h: 130, color: '#7a4a1e', roofColor:'#5c3010', windows:[2,2], door:[20,28], sign:'STORE' },
      // stables
      { x: 80,   y: 420,  w: 160, h: 200, color: '#8b5e2a', roofColor:'#6b3e10', windows:[1,2], door:[40,50], doorColor:'#5c3010', sign:'STABLES' },
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
      { x: 1380, y: 350,  w: 140, h: 110, color: '#3d2a0a', roofColor:'#2a1808', door:[50,60], doorColor:'#1a0a00', sign:'MINE' },
      // mine 2
      { x: 200,  y: 900,  w: 140, h: 100, color: '#3d2a0a', roofColor:'#2a1808', door:[50,55], doorColor:'#1a0a00', sign:'MINE' },
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
      { x: 900,  y: 900,  w: 160, h: 120, color: '#6b3d14', roofColor:'#4a2a08', windows:[1,1], door:[20,28] },
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
    spawnX: 400, spawnY: 415,
    bgDecals: ['🌵','🪨','💀'],
    decals: [
      { type:'rect', x:145, y:100, w:40, h:30, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:200, y:100, w:40, h:30, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:155, y:105, w:20, h:20, color:'#c8a060' },
      { type:'rect', x:210, y:105, w:20, h:20, color:'#8a6030' },
      { type:'rect', x:215, y:160, w:30, h:60, color:'#3d1a08' },
      { type:'rect', x:540, y:110, w:60, h:20, color:'#8b6030' },
      { type:'ellipse', x:570, y:120, rx:8, ry:8, color:'#f0c040' },
      { type:'rect', x:970, y:100, w:35, h:28, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:1080, y:100, w:35, h:28, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:980, y:105, w:15, h:18, color:'#c8a060' },
      { type:'rect', x:1090, y:105, w:15, h:18, color:'#c8a060' },
      { type:'ellipse', x:575, y:600, rx:14, ry:14, color:'#5c3010' },
      { type:'ellipse', x:625, y:600, rx:14, ry:14, color:'#5c3010' },
      { type:'ellipse', x:1125, y:510, rx:14, ry:14, color:'#5c3010' },
      { type:'ellipse', x:1175, y:510, rx:14, ry:14, color:'#5c3010' },
      { type:'rect', x:112, y:360, w:8, h:40, color:'#5c3010' },
      { type:'rect', x:340, y:360, w:8, h:40, color:'#5c3010' },
      { type:'rect', x:350, y:370, w:80, h:16, color:'#7a4a18' },
      { type:'rect', x:353, y:373, w:74, h:10, color:'#1a3a5a' },
      { type:'ellipse', x:300, y:420, rx:60, ry:20, color:'rgba(0,0,0,0.07)' },
      { type:'ellipse', x:900, y:415, rx:80, ry:18, color:'rgba(0,0,0,0.07)' },
    ],
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
      { x: 40,   y: 40,   w: 200, h: 180, color: '#1e2228', roofColor:'#111418', windows:[3,3], windowColor:'rgba(100,160,255,0.4)' },
      { x: 300,  y: 30,   w: 180, h: 220, color: '#252830', roofColor:'#151820', windows:[2,4], windowColor:'rgba(100,160,255,0.4)' },
      { x: 560,  y: 50,   w: 220, h: 170, color: '#1a1d22', roofColor:'#0e1014', windows:[3,3], windowColor:'rgba(100,160,255,0.4)' },
      { x: 870,  y: 40,   w: 190, h: 190, color: '#222530', roofColor:'#141720', windows:[3,3], windowColor:'rgba(100,160,255,0.4)' },
      { x: 1150, y: 35,   w: 210, h: 180, color: '#1e2228', roofColor:'#111418', windows:[3,3], windowColor:'rgba(100,160,255,0.4)' },
      { x: 1430, y: 50,   w: 140, h: 170, color: '#252830', roofColor:'#151820', windows:[2,3], windowColor:'rgba(100,160,255,0.4)' },
      // city blocks — middle row
      { x: 40,   y: 500,  w: 190, h: 170, color: '#1e2228', roofColor:'#111418', windows:[3,2], windowColor:'rgba(100,160,255,0.4)', door:[20,28] },
      { x: 310,  y: 510,  w: 170, h: 160, color: '#252830', roofColor:'#151820', windows:[2,2], windowColor:'rgba(100,160,255,0.4)', door:[20,28] },
      { x: 570,  y: 490,  w: 200, h: 180, color: '#1a1d22', roofColor:'#0e1014', windows:[3,2], windowColor:'rgba(100,160,255,0.4)', door:[20,28] },
      { x: 870,  y: 500,  w: 190, h: 170, color: '#222530', roofColor:'#141720', windows:[3,2], windowColor:'rgba(100,160,255,0.4)', door:[20,28] },
      { x: 1160, y: 490,  w: 200, h: 180, color: '#1e2228', roofColor:'#111418', windows:[3,2], windowColor:'rgba(100,160,255,0.4)', door:[20,28] },
      { x: 1440, y: 510,  w: 140, h: 160, color: '#252830' },
      // city blocks — bottom row
      { x: 40,   y: 920,  w: 200, h: 180, color: '#1e2228', roofColor:'#111418', windows:[3,2], windowColor:'rgba(100,160,255,0.4)', door:[20,28] },
      { x: 310,  y: 930,  w: 180, h: 170, color: '#252830', roofColor:'#151820', windows:[2,2], windowColor:'rgba(100,160,255,0.4)', door:[20,28] },
      { x: 570,  y: 910,  w: 210, h: 190, color: '#1a1d22', roofColor:'#0e1014', windows:[3,2], windowColor:'rgba(100,160,255,0.4)', door:[20,28] },
      { x: 880,  y: 920,  w: 190, h: 180, color: '#222530', roofColor:'#141720', windows:[3,2], windowColor:'rgba(100,160,255,0.4)', door:[20,28] },
      { x: 1160, y: 910,  w: 200, h: 190, color: '#1e2228', roofColor:'#111418', windows:[3,2], windowColor:'rgba(100,160,255,0.4)', door:[20,28] },
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
    spawnX: 600, spawnY: 420,
    bgDecals: ['🚗','💡','🗑️'],
    decals: [
      { type:'rect', x:55,  y:55,  w:25, h:20, color:'#2a3a4a' },
      { type:'rect', x:90,  y:55,  w:25, h:20, color:'#2a6a8a' },
      { type:'rect', x:125, y:55,  w:25, h:20, color:'#2a3a4a' },
      { type:'rect', x:315, y:50,  w:25, h:20, color:'#2a6a8a' },
      { type:'rect', x:355, y:50,  w:25, h:20, color:'#2a3a4a' },
      { type:'rect', x:575, y:65,  w:25, h:20, color:'#2a6a8a' },
      { type:'rect', x:270, y:420, w:35, h:15, color:'#1a2a3a' },
      { type:'rect', x:550, y:430, w:35, h:15, color:'#1a2a3a' },
      { type:'rect', x:830, y:415, w:35, h:15, color:'#1a2a3a' },
      { type:'rect', x:400, y:395, w:2,  h:40, color:'rgba(0,0,0,0.15)' },
      { type:'rect', x:700, y:395, w:60, h:2,  color:'rgba(0,0,0,0.12)' },
      { type:'ellipse', x:450,  y:410, rx:18, ry:8,  color:'rgba(40,60,80,0.4)' },
      { type:'ellipse', x:1100, y:820, rx:22, ry:9,  color:'rgba(40,60,80,0.4)' },
      { type:'ellipse', x:660, y:418, rx:12, ry:12, color:'#1a1d22' },
      { type:'ellipse', x:663, y:421, rx:8,  ry:8,  color:'#222530' },
    ],
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
      { x: 680,  y: 560,  w: 180, h: 150, color: '#d4c8a8', roofColor:'#b8a888', windows:[2,2], windowColor:'rgba(180,220,255,0.3)', door:[22,30], sign:'CAFE' },
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
    spawnX: 400, spawnY: 318,
    bgDecals: ['🌿','🌻','🍂'],
    decals: [
      { type:'ellipse', x:625,  y:430, rx:45, ry:35, color:'rgba(80,140,180,0.3)' },
      { type:'ellipse', x:1205, y:843, rx:38, ry:28, color:'rgba(80,140,180,0.3)' },
      { type:'rect', x:65,  y:95,  w:28, h:22, color:'#c8d8b0' },
      { type:'rect', x:105, y:95,  w:28, h:22, color:'#c8d8b0' },
      { type:'rect', x:330, y:90,  w:28, h:22, color:'#c8d8b0' },
      { type:'rect', x:82,  y:140, w:18, h:30, color:'#5c3010' },
      { type:'rect', x:345, y:135, w:18, h:30, color:'#5c3010' },
      { type:'rect', x:525, y:490, w:10, h:60, color:'rgba(255,60,60,0.3)' },
      { type:'rect', x:545, y:490, w:10, h:60, color:'rgba(255,60,60,0.3)' },
      { type:'rect', x:50,  y:278, w:8, h:20, color:'#8b6020' },
      { type:'rect', x:200, y:278, w:8, h:20, color:'#8b6020' },
      { type:'rect', x:350, y:278, w:8, h:20, color:'#8b6020' },
      { type:'ellipse', x:400, y:318, rx:30, ry:12, color:'rgba(0,0,0,0.07)' },
    ],
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
      { x: 880,  y: 680,  w: 200, h: 160, color: '#2a2a30', roofColor:'#1a1a20', windows:[2,1], windowColor:'rgba(180,255,180,0.15)', door:[24,36], doorColor:'#0a0a10', sign:'R.I.P', signColor:'#888' },
      // chapel
      { x: 1200, y: 80,   w: 200, h: 180, color: '#1e2018', roofColor:'#0e100e', windows:[2,2], windowColor:'rgba(180,255,180,0.12)', door:[22,32], doorColor:'#0a0808', sign:'CHAPEL' },
      // second chapel
      { x: 200,  y: 900,  w: 180, h: 160, color: '#1e2018', roofColor:'#0e100e', windows:[2,1], windowColor:'rgba(180,255,180,0.12)', door:[22,32], doorColor:'#0a0808' },
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
      // perimeter fence — broken segments with gaps so zombies can enter
      // top fence (gaps at ~400 and ~800 and ~1200)
      { x: 20,  y: 20, w: 350, h: 14, color: '#2a2020' },
      { x: 450, y: 20, w: 300, h: 14, color: '#2a2020' },
      { x: 850, y: 20, w: 300, h: 14, color: '#2a2020' },
      { x: 1250,y: 20, w: 330, h: 14, color: '#2a2020' },
      // bottom fence (gaps at ~400 and ~900)
      { x: 20,  y: 1168, w: 340, h: 14, color: '#2a2020' },
      { x: 450, y: 1168, w: 400, h: 14, color: '#2a2020' },
      { x: 940, y: 1168, w: 640, h: 14, color: '#2a2020' },
      // left fence (gaps at ~400 and ~800)
      { x: 20,  y: 20,  w: 14, h: 340, color: '#2a2020' },
      { x: 20,  y: 450, w: 14, h: 300, color: '#2a2020' },
      { x: 20,  y: 840, w: 14, h: 342, color: '#2a2020' },
      // right fence (gaps at ~400 and ~800)
      { x: 1568, y: 20,  w: 14, h: 340, color: '#2a2020' },
      { x: 1568, y: 450, w: 14, h: 300, color: '#2a2020' },
      { x: 1568, y: 840, w: 14, h: 342, color: '#2a2020' },
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
    spawnX: 400, spawnY: 605,
    bgDecals: ['💀','🦇','🌑'],
    decals: [
      { type:'rect', x:75,  y:88,  w:20, h:4,  color:'rgba(255,255,255,0.08)' },
      { type:'rect', x:235, y:88,  w:20, h:4,  color:'rgba(255,255,255,0.08)' },
      { type:'rect', x:395, y:88,  w:20, h:4,  color:'rgba(255,255,255,0.08)' },
      { type:'rect', x:890,  y:685, w:10, h:155, color:'rgba(255,255,255,0.05)' },
      { type:'rect', x:1060, y:685, w:10, h:155, color:'rgba(255,255,255,0.05)' },
      { type:'ellipse', x:400,  y:600, rx:60, ry:20, color:'rgba(180,220,180,0.05)' },
      { type:'ellipse', x:1100, y:600, rx:55, ry:18, color:'rgba(180,220,180,0.05)' },
      { type:'ellipse', x:750,  y:400, rx:50, ry:16, color:'rgba(180,220,180,0.04)' },
      { type:'rect', x:428, y:562, w:58, h:8,  color:'rgba(255,255,255,0.05)' },
      { type:'rect', x:788, y:752, w:58, h:8,  color:'rgba(255,255,255,0.05)' },
    ],
  },
  // ── ABANDONED FARM ────────────────────────────────────────────────
  farm: {
    id: 'farm',
    name: 'Abandoned Farm',
    emoji: '🏚️',
    bg: '#8a7a4a',
    gridColor: '#7a6a3a',
    ambientColor: '#a08a50',
    dustParticles: true,
    obstacles: [
      // farmhouse
      { x: 80,   y: 80,   w: 200, h: 160, color: '#6b4a1e' },
      // barn (big)
      { x: 900,  y: 60,   w: 280, h: 200, color: '#8b3a1a' },
      // small shed
      { x: 380,  y: 100,  w: 120, h: 100, color: '#7a4a1e' },
      // silo
      { x: 1300, y: 80,   w: 90,  h: 90,  color: '#9a8a60', round: true },
      { x: 1420, y: 100,  w: 70,  h: 70,  color: '#8a7a50', round: true },
      // tractor (wreck)
      { x: 600,  y: 200,  w: 110, h: 70,  color: '#4a4a30' },
      // hay bales
      { x: 340,  y: 350,  w: 50,  h: 50,  color: '#c8a820', round: true },
      { x: 400,  y: 360,  w: 50,  h: 50,  color: '#b89818', round: true },
      { x: 340,  y: 420,  w: 50,  h: 50,  color: '#c8a820', round: true },
      { x: 1050, y: 380,  w: 50,  h: 50,  color: '#c8a820', round: true },
      { x: 1110, y: 390,  w: 50,  h: 50,  color: '#b89818', round: true },
      // fence rows
      { x: 60,   y: 300,  w: 250, h: 12,  color: '#5c3a18' },
      { x: 500,  y: 440,  w: 400, h: 12,  color: '#5c3a18' },
      { x: 1000, y: 600,  w: 500, h: 12,  color: '#5c3a18' },
      // (left fence removed to keep passage open)
      { x: 1540, y: 400,  w: 12,  h: 400, color: '#5c3a18' },
      // water trough
      { x: 750,  y: 380,  w: 100, h: 40,  color: '#3a5a7a' },
      // well
      { x: 500,  y: 680,  w: 55,  h: 55,  color: '#5c4a30', round: true },
      // ploughed fields (rows)
      { x: 80,   y: 850,  w: 600, h: 20,  color: '#7a5a28' },
      { x: 80,   y: 900,  w: 600, h: 20,  color: '#7a5a28' },
      { x: 80,   y: 950,  w: 600, h: 20,  color: '#7a5a28' },
      { x: 80,   y: 1000, w: 600, h: 20,  color: '#7a5a28' },
      { x: 80,   y: 1050, w: 600, h: 20,  color: '#7a5a28' },
      // chicken coops
      { x: 1100, y: 820,  w: 120, h: 90,  color: '#8b6a2a', roofColor:'#5c3a10', door:[20,24] },
      { x: 1300, y: 800,  w: 100, h: 80,  color: '#7a5a20' },
      // old truck
      { x: 200,  y: 500,  w: 130, h: 65,  color: '#4a3a20' },
      // dead tree
      { x: 700,  y: 600,  w: 25,  h: 70,  color: '#4a3010', round: true },
      { x: 1400, y: 700,  w: 22,  h: 65,  color: '#4a3010', round: true },
    ],
    roads: [
      { x: 0,    y: 420,  w: 1600, h: 60,  color: '#9a8a50' },
      { x: 700,  y: 0,    w: 70,   h: 1200, color: '#9a8a50' },
      { x: 0,    y: 780,  w: 700,  h: 50,  color: '#9a8a50' },
    ],
    spawnX: 780, spawnY: 450,
    bgDecals: ['🌾','🐄','🪵'],
    decals: [
      { type:'rect', x:753, y:383, w:94, h:34, color:'rgba(60,120,160,0.4)' },
      { type:'ellipse', x:527, y:707, rx:20, ry:20, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:260, y:110, w:40, h:70, color:'#3d2008' },
      { type:'rect', x:280, y:110, w:4,  h:70, color:'rgba(0,0,0,0.3)' },
      { type:'rect', x:90,  y:100, w:30, h:24, color:'#d4c890' },
      { type:'rect', x:140, y:100, w:30, h:24, color:'#d4c890' },
      { type:'rect', x:260, y:508, w:40, h:22, color:'#1a2a1a' },
      { type:'ellipse', x:900, y:500, rx:18, ry:14, color:'#c8a030' },
      { type:'ellipse', x:950, y:500, rx:18, ry:14, color:'#b89020' },
      { type:'ellipse', x:1050,y:900, rx:18, ry:14, color:'#c8a030' },
      { type:'ellipse', x:350, y:450, rx:25, ry:10, color:'rgba(0,0,0,0.09)' },
    ],
  },

  // ── DARK FOREST ───────────────────────────────────────────────────
  forest: {
    id: 'forest',
    name: 'Dark Forest',
    emoji: '🌲',
    bg: '#1a2a14',
    gridColor: '#162210',
    ambientColor: '#1e2e18',
    dustParticles: false,
    obstacles: [
      // dense tree clusters — big trees
      ...[
        [60,60],[200,40],[380,80],[560,50],[780,70],[1000,45],[1180,65],[1380,55],[1500,80],
        [80,220],[260,200],[480,240],[680,210],[900,230],[1100,200],[1320,220],[1480,240],
        [50,900],[200,880],[420,920],[640,900],[860,880],[1080,910],[1300,890],[1500,920],
        [70,1060],[280,1080],[500,1040],[720,1070],[940,1050],[1160,1080],[1400,1060],
      ].map(([x,y]) => ({ x, y, w: 55, h: 55, color: '#1a4a18', round: true })),
      // medium trees scattered
      ...[
        [150,380],[300,420],[500,360],[720,400],[950,370],[1150,410],[1380,380],[1520,400],
        [100,570],[350,550],[600,580],[820,560],[1050,590],[1280,570],[1480,550],
        [200,720],[450,740],[700,710],[900,750],[1150,720],[1380,740],
      ].map(([x,y]) => ({ x, y, w: 40, h: 40, color: '#234a1e', round: true })),
      // fallen logs
      { x: 420,  y: 490,  w: 140, h: 28,  color: '#4a2e10' },
      { x: 900,  y: 650,  w: 120, h: 24,  color: '#3a2408' },
      { x: 1200, y: 480,  w: 130, h: 26,  color: '#4a2e10' },
      { x: 250,  y: 640,  w: 110, h: 24,  color: '#3a2408' },
      // cabin (ruined)
      { x: 680,  y: 480,  w: 160, h: 130, color: '#3a2810' },
      // boulders
      { x: 180,  y: 490,  w: 55,  h: 50,  color: '#4a4a40', round: true },
      { x: 1350, y: 600,  w: 60,  h: 55,  color: '#4a4a40', round: true },
      { x: 780,  y: 800,  w: 50,  h: 48,  color: '#4a4a40', round: true },
      // pond
      { x: 580,  y: 700,  w: 120, h: 90,  color: '#1a3a5a', round: true },
    ],
    roads: [
      // dirt paths through the forest
      { x: 0,    y: 470,  w: 1600, h: 45,  color: '#2a3a20' },
      { x: 740,  y: 0,    w: 45,   h: 1200, color: '#2a3a20' },
      { x: 0,    y: 800,  w: 740,  h: 35,  color: '#2a3a20' },
      { x: 785,  y: 800,  w: 815,  h: 35,  color: '#2a3a20' },
    ],
    spawnX: 762, spawnY: 492,
    bgDecals: ['🌲','🍄','🦌'],
    decals: [
      { type:'ellipse', x:640, y:745, rx:45, ry:32, color:'rgba(40,80,120,0.3)' },
      { type:'ellipse', x:90,  y:90,  rx:28, ry:12, color:'rgba(0,0,0,0.12)' },
      { type:'ellipse', x:310, y:80,  rx:25, ry:10, color:'rgba(0,0,0,0.12)' },
      { type:'ellipse', x:200, y:500, rx:30, ry:14, color:'rgba(30,60,20,0.3)' },
      { type:'ellipse', x:500, y:480, rx:25, ry:10, color:'rgba(30,60,20,0.3)' },
      { type:'ellipse', x:1100,y:500, rx:28, ry:12, color:'rgba(30,60,20,0.3)' },
      { type:'rect', x:0,   y:478, w:1600, h:3, color:'rgba(0,0,0,0.08)' },
      { type:'rect', x:0,   y:508, w:1600, h:3, color:'rgba(0,0,0,0.08)' },
    ],
  },

  // ── OVERRUN SCHOOL ────────────────────────────────────────────────
  school: {
    id: 'school',
    name: 'Overrun School',
    emoji: '🏫',
    bg: '#3a3a4a',
    gridColor: '#303040',
    ambientColor: '#404050',
    dustParticles: false,
    obstacles: [
      // main school building (L-shape)
      { x: 40,   y: 40,   w: 500, h: 160, color: '#2a3048' },
      { x: 40,   y: 200,  w: 160, h: 300, color: '#2a3048' },
      // gym
      { x: 900,  y: 40,   w: 300, h: 220, color: '#252838' },
      // science block
      { x: 1280, y: 40,   w: 280, h: 180, color: '#2a3048' },
      // cafeteria
      { x: 600,  y: 40,   w: 250, h: 150, color: '#222535' },
      // classrooms row
      { x: 280,  y: 600,  w: 130, h: 110, color: '#2a3048' },
      { x: 440,  y: 600,  w: 130, h: 110, color: '#252838' },
      { x: 600,  y: 600,  w: 130, h: 110, color: '#2a3048' },
      { x: 760,  y: 600,  w: 130, h: 110, color: '#252838' },
      { x: 920,  y: 600,  w: 130, h: 110, color: '#2a3048' },
      { x: 1080, y: 600,  w: 130, h: 110, color: '#252838' },
      // library
      { x: 40,   y: 700,  w: 200, h: 180, color: '#1e2535' },
      // admin block
      { x: 1280, y: 600,  w: 280, h: 200, color: '#2a3048' },
      // portables
      { x: 300,  y: 900,  w: 160, h: 100, color: '#3a3828' },
      { x: 500,  y: 900,  w: 160, h: 100, color: '#3a3828' },
      { x: 700,  y: 900,  w: 160, h: 100, color: '#3a3828' },
      { x: 900,  y: 900,  w: 160, h: 100, color: '#3a3828' },
      // basketball hoops / benches
      { x: 500,  y: 320,  w: 60,  h: 20,  color: '#4a4a50' },
      { x: 850,  y: 320,  w: 60,  h: 20,  color: '#4a4a50' },
      // dumpsters
      { x: 220,  y: 420,  w: 55,  h: 40,  color: '#1a3a1a' },
      { x: 1400, y: 420,  w: 55,  h: 40,  color: '#1a3a1a' },
      // overturned bus
      { x: 680,  y: 450,  w: 180, h: 65,  color: '#cc8820' },
      // lockers (scattered)
      { x: 1100, y: 300,  w: 20,  h: 80,  color: '#3a4060' },
      { x: 1130, y: 300,  w: 20,  h: 80,  color: '#3a4060' },
      { x: 1160, y: 300,  w: 20,  h: 80,  color: '#3a4060' },
    ],
    roads: [
      // corridors and paths
      { x: 0,    y: 380,  w: 1600, h: 60,  color: '#2a2a38' },
      { x: 240,  y: 0,    w: 60,   h: 1200, color: '#2a2a38' },
      { x: 560,  y: 0,    w: 60,   h: 380,  color: '#2a2a38' },
      { x: 1240, y: 0,    w: 60,   h: 600,  color: '#2a2a38' },
      { x: 0,    y: 800,  w: 1600, h: 55,  color: '#2a2a38' },
      { x: 1100, y: 380,  w: 60,   h: 600,  color: '#2a2a38' },
      { x: 0,    y: 560,  w: 240,  h: 50,  color: '#2a2a38' },
    ],
    spawnX: 680, spawnY: 420,
    bgDecals: ['📚','🖊️','🚌'],
    decals: [
      { type:'rect', x:55,  y:55,  w:30, h:22, color:'#3a4a5a' },
      { type:'rect', x:100, y:55,  w:30, h:22, color:'#6a8aaa' },
      { type:'rect', x:145, y:55,  w:30, h:22, color:'#3a4a5a' },
      { type:'rect', x:690, y:460, w:22, h:16, color:'#1a2a3a' },
      { type:'rect', x:720, y:460, w:22, h:16, color:'#1a2a3a' },
      { type:'rect', x:750, y:460, w:22, h:16, color:'#2a4a6a' },
      { type:'rect', x:500, y:325, w:120, h:3,  color:'rgba(255,255,255,0.1)' },
      { type:'rect', x:558, y:322, w:3,  h:36, color:'rgba(255,255,255,0.08)' },
      { type:'rect', x:1105, y:310, w:2, h:80, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:1135, y:310, w:2, h:80, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:1165, y:310, w:2, h:80, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:0,   y:388, w:1600, h:2, color:'rgba(255,255,255,0.04)' },
      { type:'rect', x:0,   y:432, w:1600, h:2, color:'rgba(255,255,255,0.04)' },
    ],
  },

  // ── CANYON PASS ───────────────────────────────────────────────────
  canyon: {
    id: 'canyon',
    name: 'Canyon Pass',
    emoji: '🌄',
    bg: '#c07040',
    gridColor: '#a85e30',
    ambientColor: '#d08050',
    dustParticles: true,
    obstacles: [
      // canyon walls — top
      { x: 0,    y: 0,    w: 1600, h: 120, color: '#8a4820' },
      // canyon walls — bottom
      { x: 0,    y: 1080, w: 1600, h: 120, color: '#8a4820' },
      // rock formations left side
      { x: 0,    y: 120,  w: 180, h: 200, color: '#9a5828' },
      { x: 0,    y: 400,  w: 140, h: 180, color: '#8a4820' },
      { x: 0,    y: 680,  w: 200, h: 200, color: '#9a5828' },
      { x: 0,    y: 950,  w: 150, h: 130, color: '#8a4820' },
      // rock formations right side
      { x: 1420, y: 120,  w: 180, h: 200, color: '#9a5828' },
      { x: 1460, y: 400,  w: 140, h: 180, color: '#8a4820' },
      { x: 1400, y: 680,  w: 200, h: 200, color: '#9a5828' },
      { x: 1450, y: 950,  w: 150, h: 130, color: '#8a4820' },
      // mid-canyon boulders — creates narrow passages
      { x: 350,  y: 250,  w: 120, h: 100, color: '#aa6030', round: true },
      { x: 600,  y: 180,  w: 100, h: 90,  color: '#9a5828', round: true },
      { x: 800,  y: 300,  w: 130, h: 110, color: '#aa6030', round: true },
      { x: 1050, y: 200,  w: 110, h: 100, color: '#9a5828', round: true },
      { x: 1280, y: 250,  w: 100, h: 90,  color: '#aa6030', round: true },
      { x: 280,  y: 820,  w: 120, h: 100, color: '#aa6030', round: true },
      { x: 550,  y: 900,  w: 110, h: 95,  color: '#9a5828', round: true },
      { x: 780,  y: 800,  w: 130, h: 110, color: '#aa6030', round: true },
      { x: 1080, y: 880,  w: 100, h: 90,  color: '#9a5828', round: true },
      { x: 1320, y: 820,  w: 110, h: 100, color: '#aa6030', round: true },
      // wrecked wagon/cart
      { x: 480,  y: 520,  w: 100, h: 55,  color: '#6a4018' },
      { x: 1050, y: 560,  w: 100, h: 55,  color: '#6a4018' },
      // mesa blocks (flat rock shelves)
      { x: 200,  y: 480,  w: 200, h: 80,  color: '#b86838' },
      { x: 700,  y: 500,  w: 220, h: 70,  color: '#b06030' },
      { x: 1200, y: 490,  w: 200, h: 75,  color: '#b86838' },
      // dried riverbed stones
      { x: 450,  y: 380,  w: 35,  h: 35,  color: '#c07848', round: true },
      { x: 900,  y: 400,  w: 30,  h: 30,  color: '#b86840', round: true },
      { x: 1150, y: 650,  w: 35,  h: 35,  color: '#c07848', round: true },
    ],
    roads: [
      // canyon floor — the passable areas
      { x: 160,  y: 340,  w: 1280, h: 520, color: '#c87848' },
      { x: 0,    y: 500,  w: 1600, h: 200, color: '#c07040' },
    ],
    spawnX: 800, spawnY: 600,
    zombieSpawnZones: [
      // left edge (clear of rock formations)
      { x: 20,   y: 340, w: 60,  h: 520 },
      // right edge
      { x: 1520, y: 340, w: 60,  h: 520 },
      // top corridor entry (sides only, clear of canyon walls)
      { x: 200,  y: 120, w: 140, h: 120 },
      { x: 1260, y: 120, w: 140, h: 120 },
      // bottom corridor entry
      { x: 200,  y: 960, w: 140, h: 100 },
      { x: 1260, y: 960, w: 140, h: 100 },
    ],
    bgDecals: ['🪨','💀','🦅'],
    decals: [
      { type:'rect', x:0,    y:130, w:1600, h:4,  color:'rgba(0,0,0,0.12)' },
      { type:'rect', x:0,    y:160, w:1600, h:3,  color:'rgba(255,255,255,0.04)' },
      { type:'rect', x:0,    y:1060,w:1600, h:4,  color:'rgba(0,0,0,0.12)' },
      { type:'rect', x:200,  y:500, w:300, h:3,  color:'rgba(255,255,255,0.05)' },
      { type:'rect', x:700,  y:620, w:250, h:3,  color:'rgba(255,255,255,0.04)' },
      { type:'rect', x:400,  y:580, w:2,   h:80, color:'rgba(0,0,0,0.15)' },
      { type:'rect', x:900,  y:540, w:2,   h:60, color:'rgba(0,0,0,0.15)' },
      { type:'ellipse', x:410, y:348, rx:55, ry:12, color:'rgba(0,0,0,0.13)' },
      { type:'ellipse', x:660, y:268, rx:45, ry:10, color:'rgba(0,0,0,0.13)' },
      { type:'ellipse', x:865, y:358, rx:58, ry:12, color:'rgba(0,0,0,0.13)' },
    ],
  },

  // ── RUINED CHURCH ─────────────────────────────────────────────────
  church: {
    id: 'church',
    name: 'Ruined Church',
    emoji: '⛪',
    bg: '#2a2520',
    gridColor: '#221e1a',
    ambientColor: '#302820',
    dustParticles: true,
    obstacles: [
      // main church nave
      { x: 500,  y: 200,  w: 600, h: 400, color: '#1e1a18', roofColor:'#0e0a08', windows:[4,3], windowColor:'rgba(255,200,100,0.2)', door:[36,50], doorColor:'#0a0606', sign:'CHURCH' },
      // bell tower
      { x: 680,  y: 60,   w: 100, h: 140, color: '#1a1614', roofColor:'#0a0806', windows:[1,2], windowColor:'rgba(255,200,100,0.15)' },
      // ruined walls (partial)
      { x: 200,  y: 200,  w: 280, h: 30,  color: '#2a2520' },
      { x: 200,  y: 200,  w: 30,  h: 250, color: '#2a2520' },
      { x: 1120, y: 200,  w: 280, h: 30,  color: '#2a2520' },
      { x: 1370, y: 200,  w: 30,  h: 250, color: '#2a2520' },
      { x: 200,  y: 580,  w: 200, h: 30,  color: '#2a2520' },
      { x: 1200, y: 580,  w: 200, h: 30,  color: '#2a2520' },
      // pews (inside church)
      ...[0,1,2,3,4].map(i => ({ x: 520+i*90, y: 250, w: 60, h: 30, color: '#2e2418' })),
      ...[0,1,2,3,4].map(i => ({ x: 520+i*90, y: 300, w: 60, h: 30, color: '#2e2418' })),
      ...[0,1,2,3,4].map(i => ({ x: 520+i*90, y: 460, w: 60, h: 30, color: '#2e2418' })),
      ...[0,1,2,3,4].map(i => ({ x: 520+i*90, y: 510, w: 60, h: 30, color: '#2e2418' })),
      // altar
      { x: 720,  y: 340,  w: 160, h: 80,  color: '#3a2e22' },
      // graveyard surrounding
      ...[0,1,2,3,4,5].map(i => ({ x: 60+i*160,  y: 800, w: 45, h: 70, color: '#2a2a2a' })),
      ...[0,1,2,3,4,5].map(i => ({ x: 60+i*160,  y: 920, w: 45, h: 70, color: '#252525' })),
      ...[0,1,2,3,4,5].map(i => ({ x: 880+i*130, y: 800, w: 45, h: 70, color: '#2a2a2a' })),
      ...[0,1,2,3,4,5].map(i => ({ x: 880+i*130, y: 920, w: 45, h: 70, color: '#252525' })),
      // crumbled pillars
      { x: 500,  y: 700,  w: 40,  h: 40,  color: '#3a3530', round: true },
      { x: 1060, y: 700,  w: 40,  h: 40,  color: '#3a3530', round: true },
      { x: 200,  y: 450,  w: 35,  h: 35,  color: '#3a3530', round: true },
      { x: 1350, y: 450,  w: 35,  h: 35,  color: '#3a3530', round: true },
      // coffins
      { x: 150,  y: 300,  w: 70,  h: 32,  color: '#3a2810' },
      { x: 1380, y: 300,  w: 70,  h: 32,  color: '#3a2810' },
      { x: 300,  y: 700,  w: 70,  h: 32,  color: '#3a2810' },
      { x: 1230, y: 700,  w: 70,  h: 32,  color: '#3a2810' },
    ],
    roads: [
      { x: 0,    y: 600,  w: 1600, h: 60,  color: '#201c18' },
      { x: 760,  y: 0,    w: 80,   h: 1200, color: '#201c18' },
      { x: 0,    y: 120,  w: 480,  h: 50,  color: '#201c18' },
      { x: 1120, y: 120,  w: 480,  h: 50,  color: '#201c18' },
    ],
    spawnX: 800, spawnY: 640,
    zombieSpawnZones: [
      { x: 20,   y: 20,  w: 150, h: 1160 },
      { x: 1430, y: 20,  w: 150, h: 1160 },
      { x: 150,  y: 20,  w: 1300, h: 80  },
      { x: 150,  y: 1100, w: 1300, h: 80 },
    ],
    bgDecals: ['💀','🕯️','🦇'],
    decals: [
      { type:'rect', x:505, y:205, w:590, h:6, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:505, y:205, w:6,   h:390, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:1089,y:205, w:6,   h:390, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:680, y:65,  w:100, h:6, color:'rgba(0,0,0,0.2)' },
      { type:'rect', x:560, y:280, w:30,  h:20, color:'rgba(255,255,220,0.07)' },
      { type:'rect', x:1010,y:280, w:30,  h:20, color:'rgba(255,255,220,0.07)' },
      { type:'rect', x:560, y:380, w:30,  h:20, color:'rgba(255,255,220,0.07)' },
      { type:'rect', x:1010,y:380, w:30,  h:20, color:'rgba(255,255,220,0.07)' },
      { type:'ellipse', x:800, y:800, rx:50, ry:18, color:'rgba(180,220,180,0.05)' },
      { type:'ellipse', x:400, y:700, rx:40, ry:14, color:'rgba(180,220,180,0.04)' },
    ],
  },

  // ── OIL REFINERY ──────────────────────────────────────────────────
  refinery: {
    id: 'refinery',
    name: 'Oil Refinery',
    emoji: '🛢️',
    bg: '#1e1e1e',
    gridColor: '#181818',
    ambientColor: '#242424',
    dustParticles: false,
    obstacles: [
      // storage tanks top-left cluster
      { x: 60,   y: 60,   w: 150, h: 150, color: '#2a2a2a', round: true },
      { x: 250,  y: 55,   w: 150, h: 150, color: '#252525', round: true },
      { x: 440,  y: 65,   w: 140, h: 140, color: '#2a2a2a', round: true },
      // orange tanks top-right
      { x: 1050, y: 55,   w: 160, h: 160, color: '#cc4400', round: true },
      { x: 1260, y: 60,   w: 140, h: 140, color: '#aa3800', round: true },
      { x: 1440, y: 65,   w: 130, h: 130, color: '#cc4400', round: true },
      // cooling towers (smaller, not blocking road)
      { x: 695,  y: 55,   w: 90,  h: 90,  color: '#2e2e2e', round: true },
      { x: 810,  y: 55,   w: 90,  h: 90,  color: '#2e2e2e', round: true },
      // processing buildings — leave clear passages between them
      { x: 60,   y: 450,  w: 200, h: 140, color: '#1a1a1a' },
      { x: 360,  y: 430,  w: 160, h: 160, color: '#181818' },
      // gap at ~520-640 for passage
      { x: 780,  y: 440,  w: 160, h: 150, color: '#1a1a1a' },
      { x: 1100, y: 420,  w: 200, h: 170, color: '#181818' },
      { x: 1380, y: 440,  w: 180, h: 150, color: '#1a1a1a' },
      // short decorative pipes (don't span full width)
      { x: 60,   y: 310,  w: 280, h: 14,  color: '#333' },
      { x: 480,  y: 305,  w: 200, h: 14,  color: '#333' },
      { x: 900,  y: 310,  w: 260, h: 14,  color: '#333' },
      { x: 1280, y: 305,  w: 200, h: 14,  color: '#333' },
      // vertical pipe stubs (short — don't block passages)
      { x: 630,  y: 180,  w: 14,  h: 140, color: '#333' },
      { x: 940,  y: 185,  w: 14,  h: 130, color: '#333' },
      { x: 630,  y: 450,  w: 14,  h: 120, color: '#333' },
      { x: 940,  y: 450,  w: 14,  h: 120, color: '#333' },
      // barrels
      { x: 250,  y: 340,  w: 32,  h: 32,  color: '#8B4513', round: true },
      { x: 290,  y: 335,  w: 28,  h: 28,  color: '#cc4400', round: true },
      { x: 970,  y: 340,  w: 32,  h: 32,  color: '#cc4400', round: true },
      { x: 1010, y: 335,  w: 28,  h: 28,  color: '#8B4513', round: true },
      { x: 500,  y: 800,  w: 30,  h: 30,  color: '#cc4400', round: true },
      { x: 1100, y: 820,  w: 30,  h: 30,  color: '#8B4513', round: true },
      // control room (central, between the two vertical roads)
      { x: 680,  y: 580,  w: 240, h: 160, color: '#1e1e28' },
      // fence segments with gaps (not full walls)
      { x: 60,   y: 720,  w: 220, h: 12,  color: '#3a3a3a' },
      { x: 380,  y: 720,  w: 200, h: 12,  color: '#3a3a3a' },
      // gap at 580-660 for passage
      { x: 1000, y: 710,  w: 220, h: 12,  color: '#3a3a3a' },
      { x: 1300, y: 720,  w: 220, h: 12,  color: '#3a3a3a' },
      // waste pits (smaller)
      { x: 180,  y: 890,  w: 140, h: 100, color: '#1a1400', round: true },
      { x: 800,  y: 870,  w: 160, h: 110, color: '#1a1400', round: true },
      { x: 1340, y: 890,  w: 140, h: 100, color: '#1a1400', round: true },
    ],
    roads: [
      { x: 0,    y: 290,  w: 1600, h: 70,  color: '#1a1a1a' },
      { x: 0,    y: 760,  w: 1600, h: 60,  color: '#1a1a1a' },
      { x: 620,  y: 0,    w: 80,   h: 1200, color: '#1a1a1a' },
      { x: 900,  y: 0,    w: 80,   h: 1200, color: '#1a1a1a' },
      // extra cross-road for connectivity
      { x: 0,    y: 540,  w: 620,  h: 50,  color: '#1a1a1a' },
      { x: 980,  y: 540,  w: 620,  h: 50,  color: '#1a1a1a' },
    ],
    spawnX: 750, spawnY: 325,
    bgDecals: ['🛢️','⚠️','🔧'],
    decals: [
      { type:'ellipse', x:400,  y:330, rx:30, ry:12, color:'rgba(180,100,0,0.25)' },
      { type:'ellipse', x:900,  y:330, rx:25, ry:10, color:'rgba(180,100,0,0.25)' },
      { type:'ellipse', x:1300, y:500, rx:20, ry:8,  color:'rgba(180,100,0,0.2)' },
      { type:'rect', x:0,   y:322, w:1600, h:3, color:'rgba(255,200,0,0.08)' },
      { type:'rect', x:220, y:0,   w:3, h:1200, color:'rgba(255,200,0,0.06)' },
      { type:'rect', x:530, y:0,   w:3, h:1200, color:'rgba(255,200,0,0.06)' },
      { type:'rect', x:840, y:0,   w:3, h:1200, color:'rgba(255,200,0,0.06)' },
      { type:'ellipse', x:700, y:325, rx:12, ry:12, color:'#1a1818' },
      { type:'ellipse', x:703, y:328, rx:8,  ry:8,  color:'#222020' },
    ],
  },

  // ── COASTAL DOCKS ─────────────────────────────────────────────────
  docks: {
    id: 'docks',
    name: 'Coastal Docks',
    emoji: '🏖️',
    bg: '#2a3a4a',
    gridColor: '#22303a',
    ambientColor: '#303f50',
    dustParticles: false,
    obstacles: [
      // water (impassable sea area — top portion)
      { x: 0,    y: 0,    w: 1600, h: 100, color: '#1a2a8a' },
      // piers / docks
      { x: 100,  y: 0,    w: 80,   h: 250, color: '#4a3018' },
      { x: 350,  y: 0,    w: 80,   h: 220, color: '#4a3018' },
      { x: 600,  y: 0,    w: 80,   h: 260, color: '#3a2410' },
      { x: 850,  y: 0,    w: 80,   h: 230, color: '#4a3018' },
      { x: 1100, y: 0,    w: 80,   h: 250, color: '#3a2410' },
      { x: 1350, y: 0,    w: 80,   h: 220, color: '#4a3018' },
      // boats docked
      { x: 80,   y: 60,   w: 120, h: 55,  color: '#2a4a6a' },
      { x: 330,  y: 55,   w: 110, h: 50,  color: '#3a3a5a' },
      { x: 580,  y: 65,   w: 130, h: 55,  color: '#2a4a6a' },
      { x: 830,  y: 58,   w: 120, h: 52,  color: '#3a3a5a' },
      { x: 1080, y: 62,   w: 125, h: 55,  color: '#2a4a6a' },
      { x: 1330, y: 56,   w: 115, h: 50,  color: '#3a3a5a' },
      // warehouses
      { x: 40,   y: 350,  w: 220, h: 160, color: '#2a2a30' },
      { x: 320,  y: 360,  w: 200, h: 150, color: '#252528' },
      { x: 580,  y: 340,  w: 240, h: 170, color: '#2a2a30' },
      { x: 900,  y: 350,  w: 220, h: 160, color: '#252528' },
      { x: 1200, y: 340,  w: 200, h: 170, color: '#2a2a30' },
      { x: 1450, y: 360,  w: 150, h: 150, color: '#252528' },
      // shipping containers
      { x: 100,  y: 600,  w: 120, h: 55,  color: '#aa3820' },
      { x: 240,  y: 600,  w: 120, h: 55,  color: '#1a5a20' },
      { x: 380,  y: 600,  w: 120, h: 55,  color: '#2a3a8a' },
      { x: 700,  y: 610,  w: 120, h: 55,  color: '#aa3820' },
      { x: 840,  y: 610,  w: 120, h: 55,  color: '#1a5a20' },
      { x: 980,  y: 600,  w: 120, h: 55,  color: '#2a3a8a' },
      { x: 1200, y: 605,  w: 120, h: 55,  color: '#aa3820' },
      { x: 1340, y: 600,  w: 120, h: 55,  color: '#2a3a8a' },
      // crane bases
      { x: 480,  y: 700,  w: 50,  h: 200, color: '#3a3a3a' },
      { x: 1080, y: 690,  w: 50,  h: 210, color: '#3a3a3a' },
      // fuel depot
      { x: 200,  y: 820,  w: 120, h: 120, color: '#cc4400', round: true },
      { x: 1300, y: 820,  w: 110, h: 110, color: '#cc4400', round: true },
      // nets/rope coils
      { x: 550,  y: 800,  w: 45,  h: 45,  color: '#8b6a20', round: true },
      { x: 950,  y: 810,  w: 40,  h: 40,  color: '#8b6a20', round: true },
    ],
    roads: [
      { x: 0,    y: 280,  w: 1600, h: 60,  color: '#222830' },
      { x: 0,    y: 700,  w: 1600, h: 55,  color: '#222830' },
      { x: 220,  y: 100,  w: 55,   h: 1100, color: '#222830' },
      { x: 530,  y: 100,  w: 55,   h: 1100, color: '#222830' },
      { x: 840,  y: 100,  w: 55,   h: 1100, color: '#222830' },
      { x: 1150, y: 100,  w: 55,   h: 1100, color: '#222830' },
    ],
    spawnX: 800, spawnY: 310,
    zombieSpawnZones: [
      // left edge (below sea)
      { x: 20,   y: 200, w: 60, h: 900 },
      // right edge
      { x: 1520, y: 200, w: 60, h: 900 },
      // bottom edge
      { x: 100,  y: 1140, w: 1400, h: 50 },
    ],
    bgDecals: ['⚓','🚢','🐟'],
    decals: [
      { type:'ellipse', x:800, y:180, rx:700, ry:120, color:'rgba(30,60,100,0.3)' },
      { type:'rect', x:0,   y:700, w:1600, h:4, color:'rgba(30,60,100,0.2)' },
      { type:'rect', x:0,   y:320, w:1600, h:3, color:'rgba(255,255,255,0.05)' },
      { type:'rect', x:220, y:100, w:3, h:1100, color:'rgba(255,255,255,0.04)' },
      { type:'rect', x:530, y:100, w:3, h:1100, color:'rgba(255,255,255,0.04)' },
      { type:'rect', x:840, y:100, w:3, h:1100, color:'rgba(255,255,255,0.04)' },
      { type:'rect', x:1150,y:100, w:3, h:1100, color:'rgba(255,255,255,0.04)' },
      { type:'ellipse', x:400,  y:310, rx:20, ry:8,  color:'rgba(40,80,130,0.3)' },
      { type:'ellipse', x:1100, y:310, rx:20, ry:8,  color:'rgba(40,80,130,0.3)' },
    ],
  },

};

const MAP_ORDER = ['western', 'city', 'town', 'graveyard', 'farm', 'forest', 'school', 'canyon', 'church', 'refinery', 'docks'];

function getRandomMap(lastMapId) {
  const available = MAP_ORDER.filter(id => id !== lastMapId);
  return available[Math.floor(Math.random() * available.length)];
}

function getSlotItems() {
  return MAP_ORDER.map(id => ({ id, ...MAPS[id] }));
}
