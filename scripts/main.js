/* ================== THEME (fix: works via inline + listener) ================== */
function toggleTheme(){
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  body.classList.toggle('light-theme');
  btn.textContent = body.classList.contains('light-theme') ? '◑' : '◐';
  localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
}
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  const btn = document.getElementById('themeToggle');
  if (saved === 'light'){ document.body.classList.add('light-theme'); if(btn) btn.textContent='◑'; }
  if (btn) btn.addEventListener('click', toggleTheme);
});

/* ================== PRELOADER (bar + percentage) ================== */
(function preloader(){
  const scr = document.getElementById('loadingScreen');
  const bar = document.getElementById('loadingProgress');
  const pct = document.getElementById('loadingPercent');
  let p = 0;
  const id = setInterval(()=>{
    p = Math.min(100, p + Math.random()*4 + 1.5);
    bar.style.width = p + '%';
    if (pct) pct.textContent = Math.floor(p) + '%';
    if (p >= 100){
      clearInterval(id);
      setTimeout(()=>{ scr.style.opacity='0'; setTimeout(()=>{scr.style.display='none';},600); },200);
    }
  }, 40);
})();

/* ================== DATA CANVAS (glyphs) ================== */
const canvas = document.getElementById('dataCanvas');
const ctx = canvas.getContext('2d', { alpha:true });
let W, H, glyphs = [], mouse = {x:-9999, y:-9999};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const COUNT = 80;
const RADIUS = 120;
const FORCE = 0.08;
const SPEED = 0.35;

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize); resize();

function createGlyph(){
  return {
    x: Math.random()*W,
    y: Math.random()*H,
    vx: (Math.random()*2-1)*SPEED,
    vy: (Math.random()*2-1)*SPEED,
    ch: CHARS[Math.floor(Math.random()*CHARS.length)],
    size: Math.random()*6 + 8,      // delicate: 8–14px
    alpha: Math.random()*0.25 + 0.25 // delicate opacity: 0.25–0.50
  };
}
for (let i=0;i<COUNT;i++) glyphs.push(createGlyph());

window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

function colorForTheme(){
  const isLight = document.body.classList.contains('light-theme');
  return isLight ? 'rgba(35,51,43,0.55)' : 'rgba(141,207,176,0.55)';
}

function tick(){
  ctx.clearRect(0,0,W,H);
  const fill = colorForTheme();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = fill;

  for (const g of glyphs){
    const dx = g.x - mouse.x;
    const dy = g.y - mouse.y;
    const d = Math.hypot(dx, dy);
    if (d < RADIUS){
      const f = (RADIUS - d) / RADIUS * FORCE;
      g.vx += (dx / (d || 1)) * f;
      g.vy += (dy / (d || 1)) * f;
    }
    g.x += g.vx; g.y += g.vy;
    g.vx += (Math.random()-0.5)*0.004;
    g.vy += (Math.random()-0.5)*0.004;

    if (g.x < -20) g.x = W+20;
    if (g.x > W+20) g.x = -20;
    if (g.y < -20) g.y = H+20;
    if (g.y > H+20) g.y = -20;

    ctx.globalAlpha = g.alpha;
    ctx.font = `700 ${g.size}px "League Spartan", system-ui, sans-serif`;
    ctx.fillText(g.ch, g.x, g.y);
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

/* ================== PRODUCTS ================== */
const productData = {
  trackerfy: {
    title:'<span style="color:#ffffff;">Tracker</span><span style="color:#8DCFB0;">Fy</span>',
    description:'Track daily habits and goals with customizable templates and clean progress charts.',
    img:'https://i.ibb.co/DPM7ZYJM/Tracker-Fy.png'
  },
  budgetfy: {
    title:'<span style="color:#ffffff;">Budget</span><span style="color:#4FA985;">Fy</span>',
    description:'Manage your personal or business finances with a friendly budgeting toolkit.',
    img:null
  },
  investfy: {
    title:'<span style="color:#ffffff;">Invest</span><span style="color:#36A96B;">Fy</span>',
    description:'Plan and follow your portfolio with allocations, performance and rebalancing helpers.',
    img:'https://i.ibb.co/7xvjhYzg/InvestFy.png'
  },
  loanfy: {
    title:'<span style="color:#ffffff;">Loan</span><span style="color:#2D6B4F;">Fy</span>',
    description:'Calculate loan payments and track your debt with smart amortization views. Free template — download it via our Instagram.',
    img:'https://i.ibb.co/ZR68WtPR/LoanFy.png'
  }
};

function showProducts(){
  document.getElementById('folderContainer').classList.add('opened');
  document.getElementById('productsContainer').classList.add('show');
  setTimeout(()=>{ document.getElementById('folderLogo').style.opacity='0'; }, 180);
}
function showFolder(){
  document.getElementById('folderContainer').classList.remove('opened');
  document.getElementById('productsContainer').classList.remove('show');
  setTimeout(()=>{ document.getElementById('folderLogo').style.opacity='1'; }, 180);
}

function showProductPage(productId){
  const data = productData[productId];
  if (!data) return;

  document.getElementById('productPageTitle').innerHTML = data.title;
  document.getElementById('productPageDescription').textContent = data.description;

  const holder = document.getElementById('productImage');
  holder.innerHTML = data.img
    ? `<img src="${data.img}" alt="${productId} preview">`
    : `<span style="color:#8DCFB0;font-size:1.2rem;font-weight:700;">Preview coming soon</span>`;

  document.getElementById('etsyButton').onclick = () => openEtsy(productId);
  document.getElementById('productPage').classList.add('show');
}
function hideProductPage(){
  document.getElementById('productPage').classList.remove('show');
}

/* ================== ABOUT ================== */
function showAboutPage(){ document.getElementById('aboutPage').classList.add('show'); }
function hideAboutPage(){ document.getElementById('aboutPage').classList.remove('show'); }

/* ================== ETSY ================== */
function openEtsy(){ window.open('https://www.etsy.com', '_blank'); }

/* ================== EASTER EGG ================== */
let seq = [];
const code = ['e','x','c','e','l','f','y'];
document.addEventListener('keydown', e => {
  seq.push(e.key.toLowerCase());
  if (seq.length > code.length) seq.shift();
  if (JSON.stringify(seq) === JSON.stringify(code)){
    document.getElementById('easterEggModal').classList.add('show');
    seq = [];
  }
});
function closeEasterEgg(){
  document.getElementById('easterEggModal').classList.remove('show');
}

/* expose for inline handlers */
window.toggleTheme = toggleTheme;
window.showProducts = showProducts;
window.showFolder = showFolder;
window.showProductPage = showProductPage;
window.hideProductPage = hideProductPage;
window.showAboutPage = showAboutPage;
window.hideAboutPage = hideAboutPage;
window.openEtsy = openEtsy;
window.closeEasterEgg = closeEasterEgg;
