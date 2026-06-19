/* ============================================================
   DEKORBUY — Main JavaScript
   ============================================================ */

'use strict';

/* --- CONFIG --- */
const CONFIG = {
  whatsappNumber: '919612505525', // Replace with real number
  whatsappDefaultMsg: 'Hello! I am interested in Dekorbuy furniture for my hospitality project. Please share more details.',
  catalogUrl: '#', // Replace with actual catalog PDF URL
};

/* ============================================================
   NAVIGATION
   ============================================================ */
const nav = document.getElementById('main-nav');
const burger = document.getElementById('nav-burger');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');
const mobileOverlay = document.getElementById('mobile-nav-overlay');

// Scroll state
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}, { passive: true });

// Mobile nav
function openMobileNav() {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}
burger?.addEventListener('click', openMobileNav);
mobileNavClose?.addEventListener('click', closeMobileNav);
mobileOverlay?.addEventListener('click', closeMobileNav);

// Active page link
function setActiveNavLink() {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === currentPage);
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ============================================================
   SPA ROUTING
   ============================================================ */
const pages = {
  home: document.getElementById('page-home'),
  collection: document.getElementById('page-collection'),
  about: document.getElementById('page-about'),
  artisans: document.getElementById('page-artisans'),
  hospitality: document.getElementById('page-hospitality'),
  gallery: document.getElementById('page-gallery'),
  designers: document.getElementById('page-designers'),
  contact: document.getElementById('page-contact'),
};

let currentPage = 'home';

function navigateTo(pageName) {
  if (!pages[pageName]) return;

  // Hide all
  Object.values(pages).forEach(p => p?.classList.remove('active'));

  // Show target
  pages[pageName].classList.add('active');
  currentPage = pageName;

  document.body.dataset.page = pageName;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-init reveals for new page
  setTimeout(() => {
    initReveal();
    setActiveNavLink();
  }, 50);

  // Update URL hash for SEO / sharing
  history.pushState({ page: pageName }, '', pageName === 'home' ? '/' : `/${pageName}`);
}

// Listen to all nav links
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-nav]');
  if (!link) return;
  e.preventDefault();
  const target = link.dataset.nav;
  navigateTo(target);
  closeMobileNav();
});

// Back/forward
window.addEventListener('popstate', (e) => {
  const page = e.state?.page || 'home';
  navigateTo(page);
});

/* ============================================================
   PRODUCTS — DATA DRIVEN
   ============================================================ */
let productsData = null;

async function loadProducts() {
  try {
    const res = await fetch('data/products.json');
    productsData = await res.json();
    renderProducts('all');
    renderFilterButtons();
  } catch (err) {
    console.error('Could not load products:', err);
  }
}

function renderFilterButtons() {
  if (!productsData) return;
  const container = document.getElementById('products-filter');
  if (!container) return;

  const allBtn = createFilterBtn('All Products', 'all', true);
  container.appendChild(allBtn);

  productsData.categories.forEach(cat => {
    const btn = createFilterBtn(cat.name, cat.id, false);
    container.appendChild(btn);
  });
}

function createFilterBtn(label, id, active) {
  const btn = document.createElement('button');
  btn.className = `products__filter-btn${active ? ' active' : ''}`;
  btn.textContent = label;
  btn.dataset.filter = id;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.products__filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(id);
  });
  return btn;
}

function renderProducts(categoryFilter) {
  if (!productsData) return;
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = categoryFilter === 'all'
    ? productsData.products
    : productsData.products.filter(p => p.category === categoryFilter);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="body-md" style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--ink-lt)">No products in this category yet.</p>';
    return;
  }

  filtered.forEach((product, i) => {
    const card = createProductCard(product, i);
    grid.appendChild(card);
  });
}

function createProductCard(product, index) {
  const card = document.createElement('article');
  card.className = `product-card reveal reveal-delay-${(index % 3) + 1}`;

  const catName = productsData?.categories.find(c => c.id === product.category)?.name || '';
  const waMsg = encodeURIComponent(`Hi! I'm interested in the "${product.name}". ${product.moq ? `MOQ: ${product.moq}.` : ''} Please share pricing and availability.`);
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${waMsg}`;

  card.innerHTML = `
    <div class="product-card__img-wrap">
      ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
      <div class="product-card__no-img">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="24" width="48" height="32" rx="2" stroke="#1C2B1A" stroke-width="1.5"/>
          <path d="M20 24V16C20 11.6 23.6 8 28 8H36C40.4 8 44 11.6 44 16V24" stroke="#1C2B1A" stroke-width="1.5"/>
          <circle cx="32" cy="40" r="6" stroke="#B8895A" stroke-width="1.5"/>
        </svg>
      </div>
    </div>
    <div class="product-card__body">
      <div class="product-card__category">${catName}</div>
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__desc">${product.description}</p>
      <div class="product-card__meta">
        <div class="product-card__meta-row">
          <span class="product-card__meta-label">Material</span>
          <span class="product-card__meta-val">${product.material}</span>
        </div>
        <div class="product-card__meta-row">
          <span class="product-card__meta-label">Dimensions</span>
          <span class="product-card__meta-val">${product.dimensions}</span>
        </div>
        <div class="product-card__meta-row">
          <span class="product-card__meta-label">MOQ</span>
          <span class="product-card__meta-val">${product.moq}</span>
        </div>
        <div class="product-card__meta-row">
          <span class="product-card__meta-label">Lead Time</span>
          <span class="product-card__meta-val">${product.leadTime}</span>
        </div>
      </div>
      <div class="product-card__actions">
        <button class="btn btn--primary btn--sm" onclick="openQuoteModal('${escapeHtml(product.name)}')">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1v14M1 8h14"/></svg>
          Request Quote
        </button>
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--sm">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </a>
      </div>
    </div>
  `;

  return card;
}

function escapeHtml(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

/* ============================================================
   QUOTE MODAL
   ============================================================ */
function openQuoteModal(productName) {
  // Scroll to contact and pre-fill
  navigateTo('contact');
  setTimeout(() => {
    const subjectField = document.getElementById('form-subject');
    if (subjectField) subjectField.value = `Quote Request: ${productName}`;
    const typeField = document.getElementById('form-type');
    if (typeField) typeField.value = 'quote';
  }, 300);
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    // Build WhatsApp message from form
    const msg = `*New Inquiry from Dekorbuy Website*\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || 'Not provided'}\n` +
      `Business: ${data.business || 'Not provided'}\n` +
      `Type: ${data.type || 'General'}\n` +
      `Message: ${data.message}`;

    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;

    // Show success
    form.style.display = 'none';
    const success = document.getElementById('form-success');
    if (success) success.style.display = 'block';

    // Open WhatsApp in new tab
    setTimeout(() => window.open(waUrl, '_blank'), 500);
  });
}

/* ============================================================
   CATALOG DOWNLOAD
   ============================================================ */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="download-catalog"]');
  if (!btn) return;
  e.preventDefault();
  // Build WhatsApp message for catalog request
  const msg = encodeURIComponent('Hello! I would like to receive the Dekorbuy product catalog. Please share it with me.');
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
  window.open(waUrl, '_blank');
});

/* ============================================================
   HERO PARALLAX (subtle)
   ============================================================ */
function initParallax() {
  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
    }
  }, { passive: true });
}

/* ============================================================
   HOSPITALITY SOLUTIONS PAGE — TABS
   ============================================================ */
function initHospitalityTabs() {
  const tabs = document.querySelectorAll('.hospitality-tab');
  const panels = document.querySelectorAll('.hospitality-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(`panel-${tab.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 1800;
      const start = performance.now();
      const suffix = el.dataset.suffix || '';

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ============================================================
   GALLERY LIGHTBOX (simple)
   ============================================================ */
function initGallery() {
  // Placeholder items get labels based on their data
  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      // Could be extended with a full lightbox
      const label = item.querySelector('.gallery__item__label')?.textContent?.trim();
      if (label) {
        const msg = encodeURIComponent(`Hi! I saw the "${label}" project on your gallery and I'm interested in a similar setup. Can you share more details?`);
        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, '_blank');
      }
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Determine initial page
  const hash = window.location.pathname.replace('/', '') || 'home';
  const validPage = pages[hash] ? hash : 'home';
  navigateTo(validPage);

  loadProducts();
  initReveal();
  initParallax();
  animateCounters();
  initContactForm();
  initHospitalityTabs();
  initGallery();

  // Handle browser back
  history.replaceState({ page: validPage }, '', validPage === 'home' ? '/' : `/${validPage}`);
});
