// Datos de productos
const productData = {
  trackerfy: {
    title: '<span style="color: white;">Tracker</span><span style="color: #8DCFB0;">Fy</span>',
    description: 'Track your daily habits and goals with customizable templates and progress charts.'
  },
  budgetfy: {
    title: '<span style="color: white;">Budget</span><span style="color: #4FA985;">Fy</span>',
    description: 'Manage your finances with comprehensive budgeting tools and expense tracking.'
  },
  investfy: {
    title: '<span style="color: white;">Invest</span><span style="color: #36A96B;">Fy</span>',
    description: 'Plan your investment portfolio with detailed analysis and tracking tools.'
  },
  loanfy: {
    title: '<span style="color: white;">Loan</span><span style="color: #2D6B4F;">Fy</span>',
    description: 'Calculate loan payments and track your debt with comprehensive loan management.'
  }
};

// Transiciones carpeta / lista
function showProducts() {
  document.getElementById('folderContainer').classList.add('opened');
  document.getElementById('productsContainer').classList.add('show');
  setTimeout(() => { document.getElementById('folderLogo').style.opacity = '0'; }, 200);
}
function showFolder() {
  document.getElementById('folderContainer').classList.remove('opened');
  document.getElementById('productsContainer').classList.remove('show');
  setTimeout(() => { document.getElementById('folderLogo').style.opacity = '1'; }, 200);
}

// Página de producto
function showProductPage(productId) {
  const productPage = document.getElementById('productPage');
  const productTitle = document.getElementById('productPageTitle');
  const productDescription = document.getElementById('productPageDescription');
  const etsyButton = document.getElementById('etsyButton');

  productTitle.innerHTML = productData[productId].title;
  productDescription.textContent = productData[productId].description;
  etsyButton.onclick = () => openEtsy(productId);

  productPage.classList.add('show');
}
function hideProductPage() {
  document.getElementById('productPage').classList.remove('show');
}

// About
function showAboutPage() {
  document.getElementById('aboutPage').classList.add('show');
}
function hideAboutPage() {
  document.getElementById('aboutPage').classList.remove('show');
}

// Etsy (reemplazá con URLs reales)
function openEtsy(product) {
  const etsyUrls = {
    trackerfy: 'https://www.etsy.com/listing/tu-trackerfy-listing',
    budgetfy: 'https://www.etsy.com/listing/tu-budgetfy-listing',
    investfy: 'https://www.etsy.com/listing/tu-investfy-listing',
    loanfy: 'https://www.etsy.com/listing/tu-loanfy-listing'
  };
  // Por ahora, abre ETSY genérico
  window.open('https://www.etsy.com', '_blank');
}

// Tema
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');

  body.classList.toggle('light-theme');
  if (body.classList.contains('light-theme')) {
    themeToggle.textContent = '◑';
    localStorage.setItem('theme', 'light');
  } else {
    themeToggle.textContent = '◐';
    localStorage.setItem('theme', 'dark');
  }
}

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', function () {
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.getElementById('themeToggle');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.textContent = '◑';
  }
});
