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
    ctx.rotate(this.facing);

    if (this.onHorse) {
      // horse body
      ctx.fillStyle = '#8B5E2A';
      ctx.beginPath(); ctx.ellipse(0, 4, 20, 12, 0, 0, Math.PI*2); ctx.fill();
      // horse head
      ctx.fillStyle = '#7A4E1A';
      ctx.beginPath(); ctx.ellipse(18, -2, 9, 7, -0.3, 0, Math.PI*2); ctx.fill();
    }

    // shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(0, 4, this.radius+2, 6, 0, 0, Math.PI*2); ctx.fill();

    // body
    ctx.fillStyle = this.invincible > 0 ? '#ff8866' : this.color;
    ctx.beginPath(); ctx.arc(0, 0, this.radius, 0, Math.PI*2); ctx.fill();

    // hat
    ctx.fillStyle = '#3d2010';
    ctx.beginPath(); ctx.ellipse(0, -2, 10, 5, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillRect(-6, -12, 12, 10);
    ctx.fillStyle = '#5c3018';
    ctx.fillRect(-8, -4, 16, 3);

    // gun barrel
    ctx.fillStyle = '#888';
    ctx.fillRect(10, -2, 18, 4);

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
  }
  update(px, py, obstacles) {
    this.wobble += 0.12;
    const dx = px - this.x, dy = py - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    this.facingAngle = Math.atan2(dy, dx);
    if (dist > 1) {
      this.vx = (dx / dist) * this.speed + Math.sin(this.wobble)*0.4;
      this.vy = (dy / dist) * this.speed + Math.cos(this.wobble)*0.4;
    }
    this.move(obstacles);
    if (this.attackCooldown > 0) this.attackCooldown--;
    return dist < this.radius + 14;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.facingAngle);

    // shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(0, 4, this.radius+2, 6, 0, 0, Math.PI*2); ctx.fill();

    // body
    const green = this.type === 'big' ? '#3a8a2a' : '#4aaa3a';
    ctx.fillStyle = green;
    ctx.beginPath(); ctx.arc(0, 0, this.radius, 0, Math.PI*2); ctx.fill();

    // shirt rips
    ctx.strokeStyle = '#2a6a1a'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-4,-6); ctx.lineTo(-2,4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(3,-5); ctx.lineTo(5,3); ctx.stroke();

    // eyes
    ctx.fillStyle = '#ff4444';
    ctx.beginPath(); ctx.arc(-5, -4, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5, -4, 3, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(-5,-4,1.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5,-4,1.5,0,Math.PI*2); ctx.fill();

    // mouth
    ctx.strokeStyle = '#aa2020'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-5, 5); ctx.quadraticCurveTo(0, 9, 5, 5); ctx.stroke();

    // hp bar
    ctx.restore();
    const bw = this.radius * 2.5, bx = this.x - bw/2, by = this.y - this.radius - 8;
    ctx.fillStyle = '#1a0a0a';
    ctx.fillRect(bx, by, bw, 4);
    ctx.fillStyle = `hsl(${(this.hp/this.maxHp)*100}, 80%, 45%)`;
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
    this.scream = 0; // countdown for speech bubble
  }
  update(px, py, zombies, obstacles) {
    // check if zombies nearby → panic
    let nearestZDist = Infinity;
    for (const z of zombies) {
      const d = dist(this.x, this.y, z.x, z.y);
      if (d < nearestZDist) nearestZDist = d;
    }
    const isPanicking = nearestZDist < 180;

    if (isPanicking) {
      if (this.panicTimer <= 0) {
        // flee away from nearest zombie
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
    } else {
      // wander
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
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.facingAngle);

    // shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(0, 3, this.radius+1, 5, 0, 0, Math.PI*2); ctx.fill();

    // body / shirt
    ctx.fillStyle = this.shirtColor;
    ctx.beginPath(); ctx.arc(0, 0, this.radius, 0, Math.PI*2); ctx.fill();

    // head
    ctx.fillStyle = this.color;
    ctx.beginPath(); ctx.arc(0, -4, 8, 0, Math.PI*2); ctx.fill();

    // eyes
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(-3, -5, 1.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(3, -5, 1.5, 0, Math.PI*2); ctx.fill();

    ctx.restore();

    // panic speech bubble
    if (this.scream > 0 && this.scream > 80) {
      ctx.save();
      ctx.font = '14px serif';
      ctx.fillText(['😱','🏃','❗','HELP!'][Math.floor(this.age/10)%4], this.x + 10, this.y - 20);
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
    // trail
    for (let i=0; i<this.trail.length; i++) {
      const alpha = i/this.trail.length * 0.5;
      ctx.fillStyle = this.color.replace(')',`,${alpha})`).replace('rgb','rgba');
      ctx.beginPath(); ctx.arc(this.trail[i].x, this.trail[i].y, 2, 0, Math.PI*2); ctx.fill();
    }
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8; ctx.shadowColor = this.color;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
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

const WORLD_W = 800, WORLD_H = 600;
