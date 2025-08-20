/* ====================== THEME ====================== */
function toggleTheme(){
  const b=document.body, btn=document.getElementById('themeToggle');
  b.classList.toggle('light-theme');
  const light=b.classList.contains('light-theme');
  btn.textContent= light ? '◑' : '◐';
  localStorage.setItem('theme', light ? 'light' : 'dark');
}

/* ====================== LOADER (percentage) ====================== */
function startLoader(){
  const wrap=document.getElementById('loadingScreen');
  const bar=document.getElementById('loaderProgress');
  const pct=document.getElementById('loaderPct');
  let p=0;
  const t=setInterval(()=>{
    p = Math.min(100, p + Math.floor(Math.random()*7)+3); // 3–9%
    bar.style.width = p + '%';
    pct.textContent = p + '%';
    if(p>=100){
      clearInterval(t);
      setTimeout(()=>{ wrap.style.display='none'; }, 250);
    }
  }, 100);
}

/* ====================== DATA CANVAS ====================== */
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
    vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*
