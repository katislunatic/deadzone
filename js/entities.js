// ── ENTITIES ──────────────────────────────────────────────────────────

class Entity {
  constructor(x, y, radius) {
    this.x = x; this.y = y;
    this.radius = radius;
    this.vx = 0; this.vy = 0;
    this.alive = true;
    this.age = 0;
  }
  move(obstacles) {
    const nx = this.x + this.vx;
    const ny = this.y + this.vy;
    let blocked = false;
    for (const obs of obstacles) {
      if (circleRect(nx, ny, this.radius, obs)) { blocked = true; break; }
    }
    if (!blocked) { this.x = nx; this.y = ny; }
    else {
      // try slide X
      const tx = this.x + this.vx;
      if (!obstacles.some(o => circleRect(tx, this.y, this.radius, o))) this.x = tx;
      // try slide Y
      const ty = this.y + this.vy;
      if (!obstacles.some(o => circleRect(this.x, ty, this.radius, o))) this.y = ty;
    }
    // world bounds
    this.x = Math.max(this.radius, Math.min(WORLD_W - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(WORLD_H - this.radius, this.y));
    this.age++;
  }
}

// ── PLAYER ───────────────────────────────────────────────────────────
class Player extends Entity {
  constructor(x, y) {
    super(x, y, 14);
    this.maxHp = 100;
    this.hp = 100;
    this.speed = 3.2;
    this.facing = 0; // radians
    this.color = '#e8c888';
    this.onHorse = false;
    this.invincible = 0; // frames of i-frames
    this.reloadTimer = 0;
    this.coins = 0;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    const P = 2; // pixel size
    const flash = this.invincible > 0 && Math.floor(this.age/3)%2===0;

    // Determine facing direction from movement (or fallback to aim angle)
    const moving = Math.abs(this.vx) > 0.2 || Math.abs(this.vy) > 0.2;
    const moveAngle = moving ? Math.atan2(this.vy, this.vx) : this.facing;
    // Flip sprite horizontally if moving/facing left
    const facingLeft = Math.cos(moveAngle) < 0;
    if (facingLeft) ctx.scale(-1, 1);

    // shadow
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath(); ctx.ellipse(0, 6, 14, 5, 0, 0, Math.PI*2); ctx.fill();

    if (this.onHorse) {
      // pixel horse body
      const hp = [
        [0,0,'#7a4e1a'],[1,0,'#8b5e2a'],[2,0,'#8b5e2a'],[3,0,'#7a4e1a'],
        [-1,1,'#7a4e1a'],[0,1,'#9b6e3a'],[1,1,'#9b6e3a'],[2,1,'#9b6e3a'],[3,1,'#9b6e3a'],[4,1,'#6a3e10'],
        [-1,2,'#8b5e2a'],[0,2,'#8b5e2a'],[1,2,'#8b5e2a'],[2,2,'#8b5e2a'],[3,2,'#8b5e2a'],[4,2,'#8b5e2a'],
        [0,3,'#6a3e10'],[1,3,'#6a3e10'],[2,3,'#6a3e10'],
        // legs
        [-1,4,'#5a2e08'],[1,4,'#5a2e08'],[3,4,'#5a2e08'],
        // head
        [5,-1,'#6a3e10'],[6,-1,'#7a4e1a'],[5,0,'#7a4e1a'],[6,0,'#6a3e10'],[7,0,'#5a2e08'],
      ];
      for (const [px,py,c] of hp) {
        ctx.fillStyle = c;
        ctx.fillRect((px-3)*P*2, (py-3)*P*2, P*2, P*2);
      }
    }

    // pixel cowboy — 16x16 grid, each pixel is P×P
    const pixels = [
      // hat top
      [-2,-7,'#2a1208'],[-1,-7,'#2a1208'],[0,-7,'#2a1208'],[1,-7,'#2a1208'],
      [-3,-6,'#3d2010'],[-2,-6,'#3d2010'],[-1,-6,'#4a2818'],[0,-6,'#4a2818'],[1,-6,'#3d2010'],[2,-6,'#3d2010'],
      [-3,-5,'#3d2010'],[-2,-5,'#3d2010'],[-1,-5,'#3d2010'],[0,-5,'#3d2010'],[1,-5,'#3d2010'],[2,-5,'#3d2010'],
      // hat brim
      [-5,-4,'#5c3018'],[-4,-4,'#5c3018'],[-3,-4,'#6b3a20'],[-2,-4,'#6b3a20'],[-1,-4,'#6b3a20'],[0,-4,'#6b3a20'],[1,-4,'#6b3a20'],[2,-4,'#6b3a20'],[3,-4,'#5c3018'],[4,-4,'#5c3018'],
      // face
      [-2,-3,'#e8c888'],[-1,-3,'#e8c888'],[0,-3,'#e8c888'],[1,-3,'#e8c888'],
      [-2,-2,'#e8c888'],[-1,-2,'#d4a060'],[0,-2,'#d4a060'],[1,-2,'#e8c888'],
      // eyes
      [-1,-2,'#2a1800'],[1,-2,'#2a1800'],
      // body / shirt
      [-3,-1,'#8b6030'],[-2,-1,'#c87830'],[-1,-1,'#d88840'],[0,-1,'#d88840'],[1,-1,'#c87830'],[2,-1,'#8b6030'],
      [-3,0,'#8b6030'],[-2,0,'#c87830'],[-1,0,'#d88840'],[0,0,'#d88840'],[1,0,'#c87830'],[2,0,'#8b6030'],
      // belt
      [-3,1,'#3d2010'],[-2,1,'#5c3018'],[-1,1,'#6b3a20'],[0,1,'#f0c040'],[1,1,'#5c3018'],[2,1,'#3d2010'],
      // legs
      [-2,2,'#4a3020'],[-1,2,'#6b4830'],[0,2,'#6b4830'],[1,2,'#4a3020'],
      [-2,3,'#3a2518'],[-1,3,'#5a3820'],[0,3,'#5a3820'],[1,3,'#3a2518'],
      // boots
      [-2,4,'#2a1808'],[-1,4,'#3a2010'],[0,4,'#3a2010'],[1,4,'#2a1808'],
    ];

    for (const [px,py,c] of pixels) {
      ctx.fillStyle = flash ? '#ff9977' : c;
      ctx.fillRect(px*P, py*P, P, P);
    }

    ctx.restore();

    // Gun drawn in world space, always aimed at mouse
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.facing);
    const gunColor = '#aaaaaa';
    const gunDark  = '#666666';
    ctx.fillStyle = gunDark;  ctx.fillRect(8,  -P,   4,  P*2);
    ctx.fillStyle = gunColor; ctx.fillRect(12, -P,   10, P);
    ctx.fillStyle = '#444';   ctx.fillRect(8,  P,    6,  P);
    ctx.restore();
  }
  takeDamage(amt) {
    if (this.invincible > 0) return;
    this.hp = Math.max(0, this.hp - amt);
    this.invincible = 45;
    if (this.hp <= 0) this.alive = false;
  }
}

// ── ZOMBIE ───────────────────────────────────────────────────────────
class Zombie extends Entity {
  constructor(x, y, wave) {
    super(x, y, 13);
    this.maxHp = 30 + wave * 8;
    this.hp = this.maxHp;
    this.speed = 0.9 + Math.random() * 0.6 + wave * 0.08;
    this.damage = 10 + wave * 2;
    this.attackCooldown = 0;
    this.wobble = Math.random() * Math.PI * 2;
    this.type = Math.random() < 0.15 ? 'big' : 'normal';
    if (this.type === 'big') {
      this.radius = 18; this.maxHp *= 2.5; this.hp = this.maxHp;
      this.speed *= 0.6; this.damage *= 2;
    }
    this.scoreValue = this.type === 'big' ? 50 : 15;
    this.coinValue = this.type === 'big' ? 15 : 5;
    this.facingAngle = 0;
    this.moveAngle = null; // smoothed movement angle for context steering
  }
  update(px, py, obstacles) {
    this.wobble += 0.12;
    const dx = px - this.x, dy = py - this.y;
    const distToPlayer = Math.sqrt(dx*dx + dy*dy);
    this.facingAngle = Math.atan2(dy, dx);

    // Context steering — sample 12 directions, pick best that avoids obstacles
    const toPlayerAngle = Math.atan2(dy, dx);
    const numDirs = 12;
    let bestAngle = toPlayerAngle;
    let bestScore = -Infinity;

    for (let i = 0; i < numDirs; i++) {
      const angle = (i / numDirs) * Math.PI * 2;
      const probeX = this.x + Math.cos(angle) * (this.radius + 20);
      const probeY = this.y + Math.sin(angle) * (this.radius + 20);

      // Skip if this direction hits an obstacle
      if (obstacles.some(o => circleRect(probeX, probeY, this.radius + 2, o))) continue;

      // Score: prefer directions toward player, with smooth angular falloff
      const angleDiff = Math.atan2(Math.sin(angle - toPlayerAngle), Math.cos(angle - toPlayerAngle));
      const score = Math.cos(angleDiff); // 1.0 = toward player, -1.0 = away

      if (score > bestScore) {
        bestScore = score;
        bestAngle = angle;
      }
    }

    // Smoothly interpolate current move angle toward best angle
    if (!this.moveAngle) this.moveAngle = toPlayerAngle;
    const angleDelta = Math.atan2(Math.sin(bestAngle - this.moveAngle), Math.cos(bestAngle - this.moveAngle));
    this.moveAngle += angleDelta * 0.18; // smooth turn rate

    this.vx = Math.cos(this.moveAngle) * this.speed;
    this.vy = Math.sin(this.moveAngle) * this.speed;
    this.facingAngle = this.moveAngle;
    this.move(obstacles);
    if (this.attackCooldown > 0) this.attackCooldown--;
    return distToPlayer < this.radius + 14;
  }
  draw(ctx) {
    const P = this.type === 'big' ? 3 : 2;
    const isBig = this.type === 'big';
    const skin = isBig ? '#2a7a1a' : '#3a9a2a';
    const skinD = isBig ? '#1a5a10' : '#2a7a1a';
    const shirtCol = isBig ? '#8a2020' : '#3a5a8a';
    const shirtD   = isBig ? '#6a1010' : '#2a4a6a';

    ctx.save();
    ctx.translate(this.x, this.y);
    // Flip based on horizontal movement direction
    if (Math.cos(this.facingAngle) < 0) ctx.scale(-1, 1);

    // shadow
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath(); ctx.ellipse(0, isBig?8:6, this.radius+2, isBig?6:4, 0, 0, Math.PI*2); ctx.fill();

    // pixel zombie body
    const pixels = [
      // head
      [-2,-6,skin],[-1,-6,skin],[0,-6,skin],[1,-6,skin],
      [-2,-5,skin],[-1,-5,skinD],[0,-5,skinD],[1,-5,skin],
      // eyes — glowing red
      [-1,-5,'#ff2222'],[1,-5,'#ff2222'],
      // teeth
      [-1,-3,'#ddddcc'],[0,-3,'#ddddcc'],
      // neck
      [-1,-4,skin],[0,-4,skin],
      // torso — torn shirt
      [-3,-3,shirtD],[-2,-3,shirtCol],[-1,-3,shirtCol],[0,-3,shirtCol],[1,-3,shirtCol],[2,-3,shirtD],
      [-3,-2,shirtD],[-2,-2,shirtCol],[-1,-2,skinD],[0,-2,skinD],[1,-2,shirtCol],[2,-2,shirtD],
      [-3,-1,shirtD],[-2,-1,shirtCol],[-1,-1,shirtCol],[0,-1,shirtCol],[1,-1,shirtCol],[2,-1,shirtD],
      // belt/waist
      [-2,0,'#2a1a08'],[-1,0,'#3a2810'],[0,0,'#3a2810'],[1,0,'#2a1a08'],
      // legs
      [-2,1,skinD],[-1,1,'#4a3828'],[0,1,'#4a3828'],[1,1,skinD],
      [-2,2,skinD],[-1,2,'#3a2818'],[0,2,'#3a2818'],[1,2,skinD],
      // feet
      [-2,3,'#1a1008'],[-1,3,'#2a1a0a'],[0,3,'#2a1a0a'],[1,3,'#1a1008'],
      // outstretched arms
      [-4,-2,skin],[-4,-1,skin],
      [3,-2,skin],[3,-1,skin],
    ];

    for (const [px,py,c] of pixels) {
      ctx.fillStyle = c;
      ctx.fillRect(px*P, py*P, P, P);
    }

    // scratch marks on torso
    ctx.strokeStyle = skinD; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-P,-2*P); ctx.lineTo(0,P); ctx.stroke();

    ctx.restore();

    // hp bar
    const bw = this.radius * 2.8, bx = this.x - bw/2, by = this.y - this.radius - (isBig?14:10);
    ctx.fillStyle = '#0a0505';
    ctx.fillRect(bx-1, by-1, bw+2, 6);
    ctx.fillStyle = `hsl(${(this.hp/this.maxHp)*110}, 80%, 40%)`;
    ctx.fillRect(bx, by, bw * (this.hp/this.maxHp), 4);
  }
}

// ── CIVILIAN ─────────────────────────────────────────────────────────
class Civilian extends Entity {
  constructor(x, y) {
    super(x, y, 11);
    this.color = ['#e8c888','#d4a060','#c8b898','#f0d0a0'][Math.floor(Math.random()*4)];
    this.shirtColor = ['#4488cc','#cc4444','#44aa44','#ccaa44','#aa44cc'][Math.floor(Math.random()*5)];
    this.panicTimer = 0;
    this.panicDir = Math.random() * Math.PI * 2;
    this.wanderTimer = Math.floor(Math.random() * 60);
    this.speed = 1.8 + Math.random() * 0.8;
    this.panicSpeed = 3.5;
    this.facingAngle = 0;
    this.scream = 0;
    // Infection
    this.infected = false;
    this.infectTimer = 0;  // countdown to full turn
    this.biteCooldown = 0;
  }
  update(px, py, zombies, obstacles) {
    if (this.biteCooldown > 0) this.biteCooldown--;

    // Check if a zombie is touching us — get bitten
    if (!this.infected) {
      for (const z of zombies) {
        if (dist(this.x, this.y, z.x, z.y) < this.radius + z.radius + 2) {
          if (this.biteCooldown <= 0) {
            this.infected = true;
            this.infectTimer = 300; // 5 seconds to turn
            this.scream = 180;
            break;
          }
        }
      }
    }

    // Turning into zombie
    if (this.infected) {
      this.infectTimer--;
      if (this.infectTimer <= 0) {
        // Signal to game loop that we turned — return special value
        this.turned = true;
        this.alive = false;
        return 'turned';
      }
    }

    // check if zombies nearby → panic (infected still flee, briefly)
    let nearestZDist = Infinity;
    let nearestZ = null;
    for (const z of zombies) {
      const d = dist(this.x, this.y, z.x, z.y);
      if (d < nearestZDist) { nearestZDist = d; nearestZ = z; }
    }
    const isPanicking = !this.infected && nearestZDist < 180;

    if (isPanicking) {
      if (this.panicTimer <= 0) {
        let fx=0, fy=0;
        for (const z of zombies) {
          const d = dist(this.x, this.y, z.x, z.y);
          if (d < 250) { fx += (this.x-z.x)/d; fy += (this.y-z.y)/d; }
        }
        const fl = Math.sqrt(fx*fx+fy*fy)||1;
        this.panicDir = Math.atan2(fy/fl, fx/fl);
        this.panicTimer = 20 + Math.random()*20;
        this.scream = 120;
      }
      this.panicTimer--;
      this.vx = Math.cos(this.panicDir) * this.panicSpeed + (Math.random()-0.5)*1.5;
      this.vy = Math.sin(this.panicDir) * this.panicSpeed + (Math.random()-0.5)*1.5;
    } else if (this.infected) {
      // Infected stumble around slowly
      if (this.wanderTimer <= 0) {
        this.panicDir = Math.random() * Math.PI * 2;
        this.wanderTimer = 30 + Math.random() * 40;
      }
      this.wanderTimer--;
      this.vx = Math.cos(this.panicDir) * this.speed * 0.3;
      this.vy = Math.sin(this.panicDir) * this.speed * 0.3;
    } else {
      if (this.wanderTimer <= 0) {
        this.panicDir = Math.random() * Math.PI * 2;
        this.wanderTimer = 60 + Math.random() * 90;
      }
      this.wanderTimer--;
      this.vx = Math.cos(this.panicDir) * this.speed * 0.5;
      this.vy = Math.sin(this.panicDir) * this.speed * 0.5;
    }
    this.facingAngle = Math.atan2(this.vy, this.vx);
    this.move(obstacles);
    if (this.scream > 0) this.scream--;
  }
  draw(ctx) {
    const P = 2;
    const ip = this.infected ? 1 - (this.infectTimer / 300) : 0;

    // blend skin/shirt toward zombie colors as infection progresses
    const lerpColor = (c1, c2, t) => {
      const r1=parseInt(c1.slice(1,3),16), g1=parseInt(c1.slice(3,5),16), b1=parseInt(c1.slice(5,7),16);
      const r2=parseInt(c2.slice(1,3),16), g2=parseInt(c2.slice(3,5),16), b2=parseInt(c2.slice(5,7),16);
      return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`;
    };
    const skinBase = this.color || '#e8c888';
    const skin  = lerpColor(skinBase, '#8aaa6a', ip);
    const skinD = lerpColor('#c8a070', '#5a8a3a', ip);
    const shirt = lerpColor(this.shirtColor || '#4488cc', '#2a6a1a', ip);
    const shirtD= lerpColor('#336699', '#1a4a10', ip);
    const eyeCol = ip > 0.3 ? '#ff3333' : '#1a0a00';

    ctx.save();
    ctx.translate(this.x, this.y);
    // Flip based on horizontal movement direction
    if (Math.cos(this.facingAngle) < 0) ctx.scale(-1, 1);

    // shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(0, 5, 10, 4, 0, 0, Math.PI*2); ctx.fill();

    // pixel civilian
    const pixels = [
      // head
      [-1,-6,skin],[0,-6,skin],
      [-2,-5,skin],[-1,-5,skinD],[0,-5,skinD],[1,-5,skin],
      [-2,-4,skin],[-1,-4,skin],[0,-4,skin],[1,-4,skin],
      // eyes
      [-1,-4,eyeCol],[1,-4,eyeCol],
      // hair
      [-2,-6,'#3a2010'],[-1,-7,'#2a1808'],[0,-7,'#2a1808'],[1,-6,'#3a2010'],
      // body
      [-2,-3,shirtD],[-1,-3,shirt],[0,-3,shirt],[1,-3,shirtD],
      [-2,-2,shirtD],[-1,-2,shirt],[0,-2,shirt],[1,-2,shirtD],
      [-2,-1,shirtD],[-1,-1,shirt],[0,-1,shirt],[1,-1,shirtD],
      // arms
      [-3,-2,skin],[-3,-1,skin],
      [2,-2,skin],[2,-1,skin],
      // waist
      [-2,0,'#3a2818'],[-1,0,'#4a3828'],[0,0,'#4a3828'],[1,0,'#3a2818'],
      // legs
      [-2,1,'#2a3a60'],[-1,1,'#3a5080'],[0,1,'#3a5080'],[1,1,'#2a3a60'],
      [-2,2,'#2a3a60'],[-1,2,'#2a3a60'],[0,2,'#2a3a60'],[1,2,'#2a3a60'],
      // feet
      [-2,3,'#1a1008'],[-1,3,'#2a1808'],[0,3,'#2a1808'],[1,3,'#1a1008'],
    ];

    for (const [px,py,c] of pixels) {
      ctx.fillStyle = c;
      ctx.fillRect(px*P, py*P, P, P);
    }

    ctx.restore();

    // infection bar
    if (this.infected) {
      const barW = 30, bx = this.x - barW/2, by = this.y - 24;
      ctx.fillStyle = '#0a0505';
      ctx.fillRect(bx-1, by-1, barW+2, 6);
      ctx.fillStyle = `hsl(${120*(1-ip)}, 75%, 38%)`;
      ctx.fillRect(bx, by, barW*(1-ip), 4);
    }

    // panic text
    if (this.scream > 80) {
      ctx.save();
      ctx.font = 'bold 11px Share Tech Mono, monospace';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#000'; ctx.shadowBlur = 3;
      const words = ['HELP!','RUN!','AAH!','NO!'];
      ctx.fillText(words[Math.floor(this.age/15)%4], this.x + 12, this.y - 18);
      ctx.restore();
    }
  }
}

// ── BULLET ───────────────────────────────────────────────────────────
class Bullet extends Entity {
  constructor(x, y, angle, speed, damage, friendly=true) {
    super(x, y, 4);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.damage = damage;
    this.friendly = friendly;
    this.color = friendly ? '#ffe060' : '#ff4040';
    this.trail = [];
    this.maxAge = 60;
  }
  update(obstacles) {
    this.trail.push({x:this.x, y:this.y});
    if (this.trail.length > 6) this.trail.shift();
    this.x += this.vx; this.y += this.vy;
    this.age++;
    if (this.age > this.maxAge) { this.alive = false; return; }
    // wall collision
    if (this.x<0||this.x>WORLD_W||this.y<0||this.y>WORLD_H) { this.alive=false; return; }
    for (const obs of obstacles) {
      if (circleRect(this.x, this.y, this.radius, obs)) { this.alive=false; return; }
    }
  }
  draw(ctx) {
    const angle = Math.atan2(this.vy, this.vx);
    // trail
    for (let i=0; i<this.trail.length; i++) {
      const alpha = (i/this.trail.length) * 0.6;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = this.friendly ? '#ffe090' : '#ff6040';
      ctx.beginPath(); ctx.arc(this.trail[i].x, this.trail[i].y, 1.5, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    }
    // pixel bullet
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    if (this.friendly) {
      // brass casing
      ctx.fillStyle = '#c8a020'; ctx.fillRect(-4, -2, 4, 4);
      // tip
      ctx.fillStyle = '#ffe060'; ctx.fillRect(0, -1, 4, 2);
      // glow
      ctx.shadowBlur = 6; ctx.shadowColor = '#ffe060';
      ctx.fillStyle = '#fff8a0'; ctx.fillRect(2, -1, 2, 2);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = '#cc2010'; ctx.fillRect(-4, -2, 4, 4);
      ctx.fillStyle = '#ff4030'; ctx.fillRect(0, -1, 4, 2);
      ctx.shadowBlur = 6; ctx.shadowColor = '#ff4030';
      ctx.fillStyle = '#ff8070'; ctx.fillRect(2, -1, 2, 2);
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  }
}

// ── PARTICLE ─────────────────────────────────────────────────────────
class Particle {
  constructor(x, y, color, opts={}) {
    this.x = x; this.y = y;
    this.color = color;
    this.vx = (Math.random()-0.5) * (opts.spread||4);
    this.vy = (Math.random()-0.5) * (opts.spread||4) - (opts.upward||0);
    this.life = opts.life || 40;
    this.maxLife = this.life;
    this.size = opts.size || (Math.random()*4+2);
    this.gravity = opts.gravity || 0.05;
    this.text = opts.text || null;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += this.gravity;
    this.life--;
    return this.life > 0;
  }
  draw(ctx) {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    if (this.text) {
      ctx.font = `bold ${14 + (1-alpha)*8}px 'Share Tech Mono', monospace`;
      ctx.fillStyle = this.color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

// ── HELPERS ───────────────────────────────────────────────────────────
function dist(x1,y1,x2,y2) { return Math.sqrt((x2-x1)**2+(y2-y1)**2); }

function circleRect(cx,cy,cr,rect) {
  const hw = rect.w/2, hh = rect.h/2;
  const rx = rect.x + hw, ry = rect.y + hh;
  const dx = Math.abs(cx-rx), dy = Math.abs(cy-ry);
  if (dx > hw+cr || dy > hh+cr) return false;
  if (dx <= hw || dy <= hh) return true;
  return (dx-hw)**2 + (dy-hh)**2 <= cr**2;
}

function circlesOverlap(a, b) {
  return dist(a.x,a.y,b.x,b.y) < a.radius + b.radius;
}

const WORLD_W = 1600, WORLD_H = 1200;
