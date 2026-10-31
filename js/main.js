/**
 * Sugiati (Jia) — Portfolio JS Premium v2
 * Disesuaikan dengan struktur HTML yang ada
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  initScrollBar();
  initCursor();
  initTyping();
  initNavbar();
  initReveal();
  initCounters();
  initSkillBars();
  initProjectFilter();
  initModals();
  initContact();
  initCopyButtons();
  initBackTop();
  initMobileMenu();
  initCompetencyToggle();
  initModalTabs();
  initSliders();
  initLightbox();
  initHeroCanvas();
  initInteractiveTilt();
  initMagnetic();
  initSoundFeedback();
  initClickRipple();
  initScrollDock();
});

/* ─── SCROLL PROGRESS BAR ─── */
function initScrollBar() {
  // Coba kedua ID yang mungkin ada
  const bar = document.getElementById('scrollProgressBar') || document.getElementById('scrollBar');
  if (!bar) return;
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;z-index:9999;background:linear-gradient(90deg,#e85d8c,#f4a3c0);width:0%;transition:width 0.1s linear;box-shadow:0 0 12px rgba(232,93,140,0.4)';
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  });
}

/* ─── CUSTOM CURSOR ─── */
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width = '16px';
      dot.style.height = '16px';
      dot.style.background = 'rgba(232, 93, 140, 0.6)';
      ring.style.width = '50px';
      ring.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.background = '#e85d8c';
      ring.style.width = '32px';
      ring.style.height = '32px';
    });
  });
}

/* ─── TYPING EFFECT ─── */
function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const words = [
    'System Analyst & IT Specialist',
    'Web Developer (Laravel & PHP)',
    'Perancang Basis Data & ERD 3NF',
    'Penyelesai Masalah Operasional',
  ];

  let wi = 0, ci = 0, del = false, speed = 75;

  function type() {
    const w = words[wi];
    el.textContent = del ? w.substring(0, ci - 1) : w.substring(0, ci + 1);
    del ? ci-- : ci++;

    if (!del && ci === w.length) { speed = 2200; del = true; }
    else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; speed = 500; }
    else { speed = del ? 38 : 75; }

    setTimeout(type, speed);
  }
  type();
}

/* ─── NAVBAR SCROLL EFFECT ─── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);

    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  items.forEach(i => io.observe(i));
}

/* ─── ANIMATED COUNTERS ─── */
function initCounters() {
  // Mendukung atribut data-count (JS lama) dan data-target (HTML baru)
  const counters = document.querySelectorAll('[data-count], [data-target].counter-animate');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        const target = parseFloat(e.target.dataset.count || e.target.dataset.target || 0);
        const decimal = e.target.dataset.decimal === 'true';
        const suffix = e.target.dataset.suffix || '';
        const prefix = e.target.dataset.prefix || '';
        const dur = 1800;
        const steps = 60;
        let cur = 0;

        const interval = setInterval(() => {
          cur += target / steps;
          if (cur >= target) { clearInterval(interval); cur = target; }
          e.target.textContent = prefix + (decimal ? cur.toFixed(2) : Math.floor(cur)) + suffix;
        }, dur / steps);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => io.observe(c));
}

/* ─── SKILL BARS ─── */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => io.observe(b));
}

/* ─── PROJECT FILTER ─── */
function initProjectFilter() {
  // Dukung filter-tab DAN filter-btn
  const tabs = document.querySelectorAll('.filter-tab, .filter-btn');
  // Dukung proj-item DAN [data-category]
  const cards = document.querySelectorAll('.proj-item, [data-category]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.style.background = '';
        t.style.color = '';
      });
      tab.classList.add('active');
      tab.style.background = '#0f172a';
      tab.style.color = '#fff';

      const f = tab.dataset.filter;
      cards.forEach(c => {
        const cat = c.dataset.cat || c.dataset.category;
        const show = f === 'all' || cat === f;
        if (show) {
          c.style.display = '';
          requestAnimationFrame(() => {
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
          });
        } else {
          c.style.opacity = '0';
          c.style.transform = 'translateY(16px)';
          setTimeout(() => { if (c.style.opacity === '0') c.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

/* ─── MODALS ─── */
function initModals() {
  // Tombol buka modal: dukung data-open DAN data-modal-target
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('hidden'); // Hapus Tailwind hidden
      modal.classList.add('open');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.classList.add('hidden'); // Tambahkan kembali hidden
    modal.style.display = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.open));
  });

  document.querySelectorAll('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modalTarget));
  });

  // Tombol tutup: dukung data-close, data-modal-close
  document.querySelectorAll('[data-close], [data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay, .modal-backdrop');
      closeModal(modal);
    });
  });

  // Klik di luar modal
  document.querySelectorAll('.modal-overlay, .modal-backdrop').forEach(m => {
    m.addEventListener('click', e => {
      const box = m.querySelector('.modal-box, .modal-content-container');
      if (box && !box.contains(e.target)) closeModal(m);
    });
  });

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open, .modal-backdrop').forEach(m => {
        if (m.style.display === 'flex' || m.classList.contains('open')) closeModal(m);
      });
    }
  });
}

/* ─── CONTACT FORM (DIRECT WHATSAPP & GMAIL WEB) ─── */
function initContact() {
  const form = document.getElementById('contactForm');
  const btnWA = document.getElementById('btnSendWA');
  const btnGmail = document.getElementById('btnSendGmail');
  if (!form) return;

  function getFormData() {
    const name = (form.querySelector('#contactName, #cName') || {}).value?.trim() || '';
    const email = (form.querySelector('#contactEmail, #cEmail') || {}).value?.trim() || '';
    const subject = (form.querySelector('#contactSubject, #cSubject') || {}).value?.trim() || '';
    const msg = (form.querySelector('#contactMessage, #cMsg') || {}).value?.trim() || '';
    return { name, email, subject, msg };
  }

  function validateData(data) {
    if (!data.name || !data.email || !data.msg) {
      showToast('error', 'Mohon lengkapi Nama, Email, dan Isi Pesan Anda (*)');
      return false;
    }
    return true;
  }

  // 1. Kirim via WhatsApp (Langsung masuk ke HP Sugiati)
  function sendViaWhatsApp() {
    const data = getFormData();
    if (!validateData(data)) return;

    const waText = `*Halo Sugiati (Jia), ada pesan dari Portofolio:*

*Nama:* ${data.name}
*Email:* ${data.email}
*Perihal:* ${data.subject || 'Diskusi Kerja Sama / Tawaran Posisi'}

*Isi Pesan:*
${data.msg}

---
_Pesan dikirim dari website portofolio sugiati-jia.github.io_`;

    const waUrl = `https://wa.me/6283164900791?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
    showToast('success', `Membuka WhatsApp untuk mengirim pesan dari ${data.name}!`);
  }

  // 2. Kirim via Gmail Web (Langsung buka compose tab di browser)
  function sendViaGmail() {
    const data = getFormData();
    if (!validateData(data)) return;

    const gmailSubject = `Pesan Portofolio dari ${data.name}: ${data.subject || 'Diskusi Kerja Sama'}`;
    const gmailBody = `Halo Sugiati,

Saya ${data.name} (${data.email}) menghubungi Anda melalui website portofolio.

Perihal: ${data.subject || '-'}

Pesan:
${data.msg}

Salam,
${data.name}
${data.email}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=parksugiati@gmail.com&su=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(gmailBody)}`;
    window.open(gmailUrl, '_blank');
    showToast('success', `Membuka Gmail Web untuk mengirim email ke parksugiati@gmail.com!`);
  }

  if (btnWA) {
    btnWA.addEventListener('click', (e) => {
      e.preventDefault();
      sendViaWhatsApp();
    });
  }

  if (btnGmail) {
    btnGmail.addEventListener('click', (e) => {
      e.preventDefault();
      sendViaGmail();
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendViaWhatsApp();
  });
}

/* ─── TOAST ─── */
function showToast(type, msg) {
  // Dukung #toast dan #contactToast
  const t = document.getElementById('toast') || document.getElementById('contactToast');
  if (!t) return;

  const isSuccess = type === 'success';
  const icon = isSuccess ? '✓' : '!';
  const color = isSuccess ? '#10b981' : '#ef4444';
  t.innerHTML = `<span style="color:${color};font-weight:700;font-size:16px;">${icon}</span> <span>${msg}</span>`;

  // Dukung kedua gaya show/hidden
  t.classList.add('show');
  t.style.opacity = '1';
  t.style.transform = 'translateY(0)';
  t.style.pointerEvents = 'auto';

  setTimeout(() => {
    t.classList.remove('show');
    t.style.opacity = '0';
    t.style.transform = 'translateY(80px)';
    t.style.pointerEvents = 'none';
  }, 4500);
}

/* ─── COPY BUTTONS ─── */
function initCopyButtons() {
  // Dukung data-copy dan copy-email-btn
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '&#10003; Tersalin!';
        showToast('success', `Berhasil disalin: ${text}`);
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
      });
    });
  });

  // Tombol salin email khusus
  const copyEmailBtn = document.querySelector('.copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('parksugiati@gmail.com').then(() => {
        const orig = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '✓ Tersalin!';
        showToast('success', 'Email berhasil disalin!');
        setTimeout(() => { copyEmailBtn.innerHTML = orig; }, 2000);
      });
    });
  }
}

/* ─── BACK TO TOP ─── */
function initBackTop() {
  // Dukung #backTop dan #backToTopBtn
  const btn = document.getElementById('backTop') || document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btn.classList.toggle('show', show);
    btn.style.opacity = show ? '1' : '0';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── MOBILE MENU ─── */
function initMobileMenu() {
  // Dukung #mobileToggle dan #mobileMenuBtn
  const btn = document.getElementById('mobileToggle') || document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.add('hidden'));
  });
}

/* ─── COMPETENCY TOGGLE (Grid vs SDLC View) ─── */
function initCompetencyToggle() {
  const gridBtn = document.querySelector('[data-mode="grid"]');
  const sdlcBtn = document.querySelector('[data-mode="sdlc"]');
  const gridView = document.getElementById('competencyGridView');
  const sdlcView = document.getElementById('competencySdlcView');

  if (!gridBtn || !sdlcBtn || !gridView || !sdlcView) return;

  gridBtn.addEventListener('click', () => {
    gridView.classList.remove('hidden');
    sdlcView.classList.add('hidden');
    gridBtn.classList.add('bg-rose-500', 'text-white', 'shadow-sm');
    gridBtn.classList.remove('text-slate-600');
    sdlcBtn.classList.remove('bg-rose-500', 'text-white', 'shadow-sm');
    sdlcBtn.classList.add('text-slate-600');
  });

  sdlcBtn.addEventListener('click', () => {
    sdlcView.classList.remove('hidden');
    gridView.classList.add('hidden');
    sdlcBtn.classList.add('bg-rose-500', 'text-white', 'shadow-sm');
    sdlcBtn.classList.remove('text-slate-600');
    gridBtn.classList.remove('bg-rose-500', 'text-white', 'shadow-sm');
    gridBtn.classList.add('text-slate-600');
  });
}

/* ─── MODAL TABS (SIAKAD Modal) ─── */
function initModalTabs() {
  document.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-content-container, .modal-box');
      if (!modal) return;

      const targetTab = btn.dataset.tab;

      // Update tab styles
      modal.querySelectorAll('.modal-tab-btn').forEach(b => {
        b.classList.remove('border-rose-500', 'text-rose-600', 'font-bold');
        b.classList.add('border-transparent', 'text-slate-500');
      });
      btn.classList.add('border-rose-500', 'text-rose-600', 'font-bold');
      btn.classList.remove('border-transparent', 'text-slate-500');

      // Show correct panel
      modal.querySelectorAll('.modal-tab-panel').forEach(panel => {
        if (panel.dataset.tabContent === targetTab) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });
}


/* ─── IMAGE SLIDERS (Auto-slide + Manual Nav + Touch & Mouse Drag) ─── */
function initSliders() {
  document.querySelectorAll('[data-slider]').forEach(container => {
    const track = container.querySelector('.slider-track');
    const slides = container.querySelectorAll('.slider-slide');
    const prevBtn = container.querySelector('.slider-prev');
    const nextBtn = container.querySelector('.slider-next');
    const dotsContainer = container.querySelector('.slider-dots');
    const total = slides.length;
    let current = 0;
    let autoTimer = null;

    if (total <= 1) return;

    // Prevent native image dragging
    container.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', e => e.preventDefault());
    });

    container.style.cursor = 'grab';

    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.className = 'w-2 h-2 rounded-full transition-all duration-300 ' + (i === 0 ? 'bg-white w-5' : 'bg-white/50');
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          goTo(i);
          resetAuto();
        });
        dotsContainer.appendChild(dot);
      }
    }
    const dots = dotsContainer ? dotsContainer.querySelectorAll('button') : [];

    function goTo(index) {
      current = ((index % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => {
        d.className = 'rounded-full transition-all duration-300 ' +
          (i === current ? 'bg-white w-5 h-2 shadow-sm' : 'bg-white/50 w-2 h-2 hover:bg-white/80');
      });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); resetAuto(); });

    // Auto-play (setiap 3.5 detik)
    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 3500);
    }
    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }
    startAuto();

    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(autoTimer));
    container.addEventListener('mouseleave', startAuto);

    // Touch swipe support (Mobile)
    let startX = 0, diffX = 0;
    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      clearInterval(autoTimer);
    }, { passive: true });
    container.addEventListener('touchmove', (e) => {
      diffX = e.touches[0].clientX - startX;
    }, { passive: true });
    container.addEventListener('touchend', () => {
      if (Math.abs(diffX) > 40) {
        diffX < 0 ? next() : prev();
      }
      diffX = 0;
      startAuto();
    });

    // Mouse drag support (Desktop)
    let isMouseDown = false;
    let mouseStartX = 0;
    let mouseDiffX = 0;

    container.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      isMouseDown = true;
      mouseStartX = e.clientX;
      mouseDiffX = 0;
      container.style.cursor = 'grabbing';
      clearInterval(autoTimer);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      mouseDiffX = e.clientX - mouseStartX;
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      container.style.cursor = 'grab';
      if (Math.abs(mouseDiffX) > 45) {
        mouseDiffX < 0 ? next() : prev();
      }
      mouseDiffX = 0;
      startAuto();
    });
  });
}


/* ─── FULLSCREEN IMAGE LIGHTBOX ─── */
function initLightbox() {
  const lightbox = document.getElementById('imageLightbox');
  if (!lightbox) return;

  const lbImg = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  const lbIndex = document.getElementById('lightboxIndex');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let currentGallery = [];
  let currentIndex = 0;

  function openLightbox(gallery, index) {
    currentGallery = gallery;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.remove('hidden');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  }

  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    if (!currentGallery.length) return;
    const item = currentGallery[currentIndex];
    lbImg.style.opacity = '0';
    lbImg.style.transform = 'scale(0.96)';

    setTimeout(() => {
      lbImg.src = item.src;
      lbImg.alt = item.caption || 'Pratinjau Penuh';
      if (lbCaption) lbCaption.textContent = item.caption || '';
      if (lbIndex) lbIndex.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
      lbImg.style.opacity = '1';
      lbImg.style.transform = 'scale(1)';
    }, 150);
  }

  function showNext() {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightbox();
  }

  function showPrev() {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightbox();
  }

  // Bind click on all slides with data-lightbox
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const slides = Array.from(slider.querySelectorAll('[data-lightbox]')).map(el => ({
      src: el.dataset.lightbox,
      caption: el.dataset.caption || el.querySelector('img')?.alt || ''
    }));

    slider.querySelectorAll('[data-lightbox]').forEach((el, idx) => {
      el.addEventListener('click', (e) => {
        // If clicking navigation buttons, don't open lightbox
        if (e.target.closest('.slider-prev') || e.target.closest('.slider-next') || e.target.closest('.slider-dots')) {
          return;
        }
        openLightbox(slides, idx);
      });
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

  // Click outside image closes lightbox
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('#lightboxClose')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex' || !lightbox.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
}



/* ==========================================================================
   INTERACTIVE SUITE FUNCTIONS (Instagram Reel Inspired Micro-Interactions)
   ========================================================================== */

/* ─── INTERACTIVE HERO CANVAS (CONSTELLATION & MOUSE GLOW) ─── */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  const hero = document.getElementById('hero');
  if (!canvas || !hero) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 130 };
  let isHeroVisible = true;

  function resize() {
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  hero.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Touch support for mobile interaction
  hero.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });
  hero.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Optimization: Intersection Observer to pause when scrolled out of view
  const io = new IntersectionObserver((entries) => {
    isHeroVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  io.observe(hero);

  const particleCount = Math.min(Math.floor((width * height) / 18000), 55);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.2;
      this.color = Math.random() > 0.4 ? 'rgba(232, 93, 140, ' : 'rgba(27, 45, 66, ';
      this.alpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion & attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2.2;
          this.y -= Math.sin(angle) * force * 2.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    if (isHeroVisible) {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle mouse halo
      if (mouse.x !== null && mouse.y !== null) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 1.2);
        grad.addColorStop(0, 'rgba(232, 93, 140, 0.12)');
        grad.addColorStop(0.5, 'rgba(232, 93, 140, 0.04)');
        grad.addColorStop(1, 'rgba(232, 93, 140, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232, 93, 140, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw connections to mouse
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(232, 93, 140, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
    }

    requestAnimationFrame(render);
  }
  render();
}

/* ─── 3D INTERACTIVE TILT EFFECT & DYNAMIC GLARE ─── */
function initInteractiveTilt() {
  const cards = document.querySelectorAll('.interactive-tilt');
  if (!cards.length) return;

  cards.forEach(card => {
    // Ensure card-glare element exists
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      card.prepend(glare);
    }

    const maxTilt = parseFloat(card.dataset.tiltMax || 8);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1

      const tiltX = (0.5 - y) * (maxTilt * 2);
      const tiltY = (x - 0.5) * (maxTilt * 2);

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.018, 1.018, 1.018)`;

      if (glare) {
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (glare) glare.style.opacity = '0';
    });
  });
}

/* ─── MAGNETIC BUTTONS & BADGES ─── */
function initMagnetic() {
  const targets = document.querySelectorAll('.btn-primary-rose, .btn-secondary-rose, .filter-btn, .badge-tech');
  targets.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const bx = (e.clientX - rect.left - rect.width / 2) * 0.22;
      const by = (e.clientY - rect.top - rect.height / 2) * 0.22;
      el.style.transform = `translate(${bx.toFixed(1)}px, ${by.toFixed(1)}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ─── WEB AUDIO API SOUND MICRO-INTERACTIONS ─── */
let audioCtx = null;
let soundEnabled = true;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playPopSound(freq = 900, type = 'sine', duration = 0.04) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {}
}

function playSuccessChime() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }, idx * 60);
    });
  } catch (err) {}
}

function initSoundFeedback() {
  // Load saved preference
  const saved = localStorage.getItem('sugiati_portfolio_sound');
  if (saved !== null) soundEnabled = saved === 'true';

  const toggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');

  function updateSoundUI() {
    if (!toggleBtn) return;
    if (soundEnabled) {
      toggleBtn.classList.remove('opacity-50', 'bg-slate-100', 'text-slate-400');
      toggleBtn.classList.add('bg-rose-50', 'text-rose');
      toggleBtn.setAttribute('title', 'Suara Aktif (Klik untuk Membisukan)');
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-2');
    } else {
      toggleBtn.classList.add('opacity-50', 'bg-slate-100', 'text-slate-400');
      toggleBtn.classList.remove('bg-rose-50', 'text-rose');
      toggleBtn.setAttribute('title', 'Suara Nonaktif (Klik untuk Mengaktifkan)');
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-x');
    }
    if (window.lucide) lucide.createIcons();
  }
  updateSoundUI();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      soundEnabled = !soundEnabled;
      localStorage.setItem('sugiati_portfolio_sound', soundEnabled);
      updateSoundUI();
      if (soundEnabled) playPopSound(1100, 'sine', 0.05);
    });
  }

  // Bind pleasant clicks to interactive elements
  document.querySelectorAll('button, a, .filter-btn, .badge-tech, .slider-slide').forEach(el => {
    el.addEventListener('click', () => {
      playPopSound(980, 'sine', 0.035);
    });
  });

  // Salin email / copy buttons trigger chime
  document.querySelectorAll('[data-copy], .copy-email-btn').forEach(el => {
    el.addEventListener('click', () => playSuccessChime());
  });
}

/* ─── CLICK RIPPLE ANIMATION ─── */
function initClickRipple() {
  document.addEventListener('pointerdown', (e) => {
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '70px';
    ripple.style.height = '70px';
    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

/* ─── SCROLL DOCK & CIRCULAR PROGRESS ─── */
function initScrollDock() {
  const dock = document.getElementById('interactiveDock');
  const circle = document.getElementById('scrollProgressCircle');
  const btn = document.getElementById('backToTopProgress');

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const maxScroll = h.scrollHeight - h.clientHeight;
    const progress = maxScroll > 0 ? (h.scrollTop / maxScroll) : 0;

    if (circle) {
      const offset = 100 - (progress * 100);
      circle.style.strokeDashoffset = Math.max(0, Math.min(100, offset));
    }
  });

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playPopSound(1200, 'sine', 0.05);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
