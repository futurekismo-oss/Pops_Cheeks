const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:1000';
document.body.appendChild(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');

const particles = [];

function crunch(x, y) {
  for (let i = 0; i < 20; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 2,
      life: 1,
      size: Math.random() * 4 + 2,
      color: ['#88593D', '#D5AD8A', '#79380aff'][Math.floor(Math.random() * 3)]
    });
  }
}

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.life -= 0.015;
    if (p.life <= 0) return particles.splice(i, 1);
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
})();