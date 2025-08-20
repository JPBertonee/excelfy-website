// ===== Mini SFX (beeps)
const playSound = (frequency, duration) => {
  if (typeof AudioContext === 'undefined' && typeof webkitAudioContext === 'undefined') return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  const ctx = new Ctx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.value = frequency; osc.type = 'sine';
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  osc.start(); osc.stop(ctx.currentTime + duration);
};

// ===== Custom cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX - 12 + 'px';
  cursor.style.top  = e.clientY - 12 + 'px';
});
document.addEventListener('mouseover', e => {
  if (e.target.tagName === 'BUTTON' || e.target.onclick || e.target.style.cursor === 'pointer' ||
      e.target.classList.contains('product-title') || e.target.classList.contains('arrow-back') ||
      e.target.classList.contains('folder')) cursor.classList.add('hover');
});
document.addEventListener('mouseout', () => cursor.classList.remove('hover'));

// ===== Particles
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (Math.random() * 4 + 4) + 's';
    container.appendChild(p);
  }
}

// ===== Loading screen
function hideLoadingScreen() {
  setTimeout(() => {
    const loading = document.getElementById('loadingScreen');
    loading.style.opacity = '0';
    setTimeout(() => { loading.style.display = 'none'; createParticles(); playSound(440, 0.2); }, 800);
  }, 3000);
}

// ===== Breadcrumbs
function updateBreadcrumbs(path) {
  const bc = document.getElementById('breadcrumbs');
  bc.innerHTML = '';
  path.forEach((item, i) => {
    const span = document.createElement('span');
    span.className = 'breadcrumb-item';
    span.textContent = item.name;
    span.onclick = item.action;
    bc.appendChild(span);
    if (i < path.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'breadcrumb-separator';
      sep.textContent = ' > ';
      bc.appendChild(sep);
    }
  });
  bc.classList.add('show');
}

// ===== Easter egg
let easterEggSequence = [];
const easterEggCode = ['e','x','c','e','l','f','y'];
document.addEventListener('keydown', e => {
  easterEggSequence.push(e.key.toLowerCase());
  if (easterEggSequence.length > easterEggCode.length) easterEggSequence.shift();
  if (JSON.stringify(easterEggSequence) === JSON.stringify(easterEggCode)) {
    showEasterEgg(); easterEggSequence = [];
  }
});
function showEasterEgg() {
  const m = document.getElementById('easterEggModal');
  m.classList.add('show');
  playSound(523, .3); setTimeout(()=>playSound(659,.3),200); setTimeout(()=>playSound(784,.5),400);
}
function closeEasterEgg() {
  document.getElementById('easterEggModal').classList.remove('show');
  playSound(392, .2);
}

// ===== Logo SFX
document.getElementById('mainLogo').addEventListener('mouseenter', ()=>playSound(523, .1));

// ===== Datos productos
const productData = {
  trackerfy: { title: '<span style="color:white;">Tracker</span><span style="color:#8DCFB0;">Fy</span>', description:'Track your daily habits and goals with customizable templates and progress charts.' },
  budgetfy:  { title: '<span style="color:white;">Budget</span><span style="color:#4FA985;">Fy</span>',  description:'Manage your finances with comprehensive budgeting tools and expense tracking.' },
  investfy:  { title: '<span style="color:white;">Invest</span><span style="color:#36A96B;">Fy</span>',  description:'Plan your investment portfolio with detailed analysis and tracking tools.' },
  loanfy:    { title: '<span style="color:white;">Loan</span><span style="color:#2D6B4F;">Fy</span>',    description:'Calculate loan payments and track your debt with comprehensive loan management.' }
};

// ===== Navegación
function goHome(){ showFolder(); updateBreadcrumbs([{name:'Inicio', action:goHome}]); }

function showProducts(){
  document.getElementById('folderContainer').classList.add('opened');
  document.getElementById('productsContainer').classList.add('show');

  // efecto typewriter + sonido
  setTimeout(()=>{
    const titles = document.querySelectorAll('.product-title');
    titles.forEach((t,i)=> setTimeout(()=>{ t.classList.add('typewriter'); playSound(330 + i*50, .1); }, i*200));
  }, 500);

  setTimeout(()=> document.getElementById('folderLogo').style.opacity = '0', 200);

  updateBreadcrumbs([{name:'Inicio', action:goHome},{name:'Productos', action:showProducts}]);
  playSound(440,.3);
}

function showFolder(){
  document.getElementById('folderContainer').classList.remove('opened');
  document.getElementById('productsContainer').classList.remove('show');
  document.getElementById('breadcrumbs').classList.remove('show');
  setTimeout(()=> document.getElementById('folderLogo').style.opacity = '1', 200);
  playSound(330,.2);
}

function showProductPage(productId){
  const page = document.getElementById('productPage');
  const title = document.getElementById('productPageTitle');
  const desc  = document.getElementById('productPageDescription');
  const btn   = document.getElementById('etsyButton');

  title.innerHTML = productData[productId].title;
  desc.textContent = productData[productId].description;
  btn.onclick = ()=>openEtsy(productId);

  page.classList.add('show');
  updateBreadcrumbs([{name:'Inicio', action:goHome},{name:'Productos', action:showProducts},{name:productId.charAt(0).toUpperCase()+productId.slice(1), action:()=>showProductPage(productId)}]);
  playSound(523,.3);
}

function hideProductPage(){
  document.getElementById('productPage').classList.remove('show');
  updateBreadcrumbs([{name:'Inicio', action:goHome},{name:'Productos', action:showProducts}]);
  playSound(392,.2);
}

function showAboutPage(){
  document.getElementById('aboutPage').classList.add('show');
  updateBreadcrumbs([{name:'Inicio', action:goHome},{name:'Acerca de', action:showAboutPage}]);
  playSound(659,.3);
}
function hideAboutPage(){
  document.getElementById('aboutPage').classList.remove('show');
  document.getElementById('breadcrumbs').classList.remove('show');
  playSound(392,.2);
}

function openEtsy(product){
  // reemplaza con tus URLs reales si quieres
  window.open('https://www.etsy.com','_blank');
  playSound(784,.2);
}

// Tema
function toggleTheme(){
  const body = document.body, btn = document.getElementById('themeToggle');
  body.classList.toggle('light-theme');
  if (body.classList.contains('light-theme')){ btn.textContent='◑'; localStorage.setItem('theme','light'); }
  else { btn.textContent='◐'; localStorage.setItem('theme','dark'); }
  playSound(440,.1);
}

// Sonidito en clicks
document.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON' || e.target.onclick || e.target.style.cursor === 'pointer') playSound(523,.05);
});

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  const saved = localStorage.getItem('theme');
  const btn = document.getElementById('themeToggle');
  if (saved==='light'){ document.body.classList.add('light-theme'); btn.textContent='◑'; }
  hideLoadingScreen();
});

// Exponer funciones globales usadas por atributos HTML
window.goHome = goHome;
window.showProducts = showProducts;
window.showFolder = showFolder;
window.showProductPage = showProductPage;
window.hideProductPage = hideProductPage;
window.showAboutPage = showAboutPage;
window.hideAboutPage = hideAboutPage;
window.openEtsy = openEtsy;
window.toggleTheme = toggleTheme;
window.closeEasterEgg = closeEasterEgg;
