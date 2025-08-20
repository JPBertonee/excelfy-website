/* ========== THEME ========== */
function toggleTheme(){
  const b=document.body, btn=document.getElementById('themeToggle');
  b.classList.toggle('light-theme');
  const light=b.classList.contains('light-theme');
  btn.textContent= light ? '◑' : '◐';
  localStorage.setItem('theme', light ? 'light' : 'dark');
}

/* ========== LOADER (percentage) ========== */
function startLoader(){
  const wrap=document.getElementById('loadingScreen');
  const bar=document.getElementById('loaderProgress');
  const pct=document.getElementById('loaderPct');
  let p=0;
  const t=setInterval(()=>{
    p = Math.min(100, p + Math.floor(Math.random()*7)+3);
    bar.style.width = p + '%';
    pct.textContent = p + '%';
    if(p>=100){
      clearInterval(t);
      setTimeout(()=>{ wrap.style.display='none'; }, 220);
    }
  }, 100);
}

/* ========== DATA CANVAS (letters & numbers) ========== */
let dc, ctx, W, H, points=[], mouse={x:-9999,y:-9999};
const GLYPHS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function initDataCanvas(){
  dc=document.getElementById('dataCanvas');
  ctx=dc.getContext('2d');
  resizeDataCanvas();
  window.addEventListener('resize', resizeDataCanvas);
  window.addEventListener('mousemove', e=>{ mouse.x=e.clientX; mouse.y=e.clientY; });
  window.addEventListener('mouseleave', ()=>{ mouse.x=-9999; mouse.y=-9999; });
  requestAnimationFrame(tick);
}
function resizeDataCanvas(){
  W = dc.width = window.innerWidth;
  H = dc.height = window.innerHeight;
  const count = Math.min(220, Math.floor((W*H)/24000));
  points = Array.from({length:count}, () => ({
    x: Math.random()*W, y: Math.random()*H,
    vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25,
    ch: GLYPHS[Math.floor(Math.random()*GLYPHS.length)],
    size: 10 + Math.random()*14,
    a: .35 + Math.random()*.5
  }));
}
function tick(){
  ctx.clearRect(0,0,W,H);
  const isLight=document.body.classList.contains('light-theme');
  const fill = isLight ? "rgba(35,51,43,0.75)" : "#8DCFB0";
  for(const p of points){
    const dx = p.x - mouse.x, dy = p.y - mouse.y;
    const dist = Math.hypot(dx, dy), radius = 120;
    if(dist < radius){
      const f = (radius - dist)/radius;
      const ang = Math.atan2(dy, dx);
      p.vx += Math.cos(ang) * f * 1.0;
      p.vy += Math.sin(ang) * f * 1.0;
    }
    p.x += p.vx; p.y += p.vy; p.vx *= .985; p.vy *= .985;
    if(p.x < -30) p.x = W+30; if(p.x > W+30) p.x = -30;
    if(p.y < -30) p.y = H+30; if(p.y > H+30) p.y = -30;

    ctx.globalAlpha = p.a;
    ctx.fillStyle = fill;
    ctx.font = `${p.size}px "League Spartan", system-ui, Arial, sans-serif`;
    ctx.fillText(p.ch, p.x, p.y);
  }
  requestAnimationFrame(tick);
}

/* ========== NAVIGATION (folder <-> list) ========== */
function showProducts(){
  document.getElementById('folderContainer').classList.add('opened');
  const list=document.getElementById('productsContainer');
  list.classList.add('show');
}
function showFolder(){
  document.getElementById('folderContainer').classList.remove('opened');
  document.getElementById('productsContainer').classList.remove('show');
  hideProductPage();
}

/* ========== PRODUCTS ========== */
const productData = {
  trackerfy: {
    title: '<span style="color:#fff;">Tracker</span><span style="color:#8DCFB0;">Fy</span>',
    description: 'Track daily habits and goals with customizable templates and clean progress charts.',
    image: 'https://i.ibb.co/DPM7ZYJM/Tracker-Fy.png',
    alt: 'TrackerFy'
  },
  budgetfy: {
    title: '<span style="color:#fff;">Budget</span><span style="color:#4FA985;">Fy</span>',
    description: 'Manage your personal or business finances with a friendly budgeting toolkit.',
    image: '', alt: 'BudgetFy'
  },
  investfy: {
    title: '<span style="color:#fff;">Invest</span><span style="color:#36A96B;">Fy</span>',
    description: 'Plan and follow your portfolio with allocations, performance, and rebalancing helpers.',
    image: 'https://i.ibb.co/7xvjhYzg/InvestFy.png',
    alt: 'InvestFy'
  },
  loanfy: {
    title: '<span style="color:#fff;">Loan</span><span style="color:#2D6B4F;">Fy</span>',
    description: 'Calculate payments and track your debt with smart amortization views. <strong>Free template</strong> — download it via our Instagram.',
    image: 'https://i.ibb.co/ZR68WtPR/LoanFy.png',
    alt: 'LoanFy'
  }
};

function showProductPage(id){
  const data = productData[id];
  if(!data) return;
  const page = document.getElementById('productPage');
  document.getElementById('productPageTitle').innerHTML = data.title;
  document.getElementById('productPageDescription').innerHTML  = data.description;
  document.getElementById('productImage').innerHTML = data.image
    ? `<img src="${data.image}" alt="${data.alt}">`
    : `<span style="color:#8DCFB0;font-weight:700;">Preview coming soon</span>`;
  document.getElementById('etsyButton').onclick = () => openEtsy(id);
  page.classList.add('show');
}
function hideProductPage(){ document.getElementById('productPage').classList.remove('show'); }

/* ========== ABOUT ========== */
function showAboutPage(){ document.getElementById('aboutPage').classList.add('show'); }
function hideAboutPage(){ document.getElementById('aboutPage').classList.remove('show'); }

/* ========== ETSY ========== */
function openEtsy(){ window.open('https://www.etsy.com','_blank'); }

/* ========== EASTER EGG ========== */
function initEasterEgg(){
  let seq=[], target=['e','x','c','e','l','f','y'];
  document.addEventListener('keydown', e=>{
    seq.push(e.key.toLowerCase());
    if(seq.length>target.length) seq.shift();
    if(JSON.stringify(seq)===JSON.stringify(target)) openEgg();
  });
  document.getElementById('eggClose')?.addEventListener('click', closeEasterEgg);
}
function openEgg(){ document.getElementById('easterEggModal').classList.add('show'); }
function closeEasterEgg(){ document.getElementById('easterEggModal').classList.remove('show'); }

/* ========== SOFT CLICK SOUNDS ========== */
let audioCtx=null;
function ensureAudioCtx(){
  if(!audioCtx){
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(Ctx) audioCtx=new Ctx();
  }
}
function clickBeep(freq=520, dur=0.05){
  if(!audioCtx) return;
  const osc=audioCtx.createOscillator();
  const gain=audioCtx.createGain();
  osc.type='sine'; osc.frequency.value=freq;
  gain.gain.value=0.03;
  osc.connect(gain); gain.connect(audioCtx.destination);
  const now=audioCtx.currentTime;
  osc.start(now); gain.gain.exponentialRampToValueAtTime(0.005, now+dur); osc.stop(now+dur);
}
['click','touchstart','keydown'].forEach(ev=>{
  window.addEventListener(ev, ()=>{ ensureAudioCtx(); }, { once:true, passive:true });
});
document.addEventListener('click', (e)=>{
  const el=e.target;
  if(el.closest('button, .product-title, .arrow-back, .folder, .pill-btn, .icon-btn')){
    clickBeep(520,0.05);
  }
});

/* ========== INIT ========== */
document.addEventListener('DOMContentLoaded', ()=>{
  const saved=localStorage.getItem('theme');
  if(saved==='light'){ document.body.classList.add('light-theme'); document.getElementById('themeToggle').textContent='◑'; }
  startLoader();
  initDataCanvas();
  initEasterEgg();
});

/* Expose for inline handlers */
window.toggleTheme=toggleTheme;
window.showProducts=showProducts;
window.showFolder=showFolder;
window.showProductPage=showProductPage;
window.hideProductPage=hideProductPage;
window.showAboutPage=showAboutPage;
window.hideAboutPage=hideAboutPage;
window.openEtsy=openEtsy;
