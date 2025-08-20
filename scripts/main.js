/* ===== Fondo de partículas estilo “estrellas” ===== */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d', { alpha: true });
let w, h, pixels;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  // densidad proporcional al área, con límite
  const count = Math.min(220, Math.floor((w * h) / 24000));
  pixels = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.4,
    a: Math.random() * 0.6 + 0.2,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12
  }));
}
function tick() {
  ctx.clearRect(0, 0, w, h);
  for (const p of pixels) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < -5) p.x = w + 5; if (p.x > w + 5) p.x = -5;
    if (p.y < -5) p.y = h + 5; if (p.y > h + 5) p.y = -5;
    ctx.beginPath();
    ctx.globalAlpha = p.a;
    ctx.fillStyle = '#8DCFB0';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(tick);
}
window.addEventListener('resize', resize);
resize(); tick();

/* ===== Modal About ===== */
const aboutBtn = document.getElementById('aboutBtn');
const infoBtn  = document.getElementById('infoBtn');
const modal    = document.getElementById('aboutModal');
const closeX   = document.getElementById('closeAbout');

function openAbout(){ modal.setAttribute('aria-hidden','false'); }
function closeAbout(){ modal.setAttribute('aria-hidden','true'); }

aboutBtn.addEventListener('click', (e)=>{ e.preventDefault(); openAbout(); });
infoBtn.addEventListener('click', openAbout);
closeX.addEventListener('click', closeAbout);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeAbout(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeAbout(); });
