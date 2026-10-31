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

/* ─── CONTACT FORM ─── */
function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Dukung berbagai ID input
    const name = (form.querySelector('#cName, #contactName') || {}).value?.trim() || '';
    const email = (form.querySelector('#cEmail, #contactEmail') || {}).value?.trim() || '';
    const subject = (form.querySelector('#cSubject, #contactSubject') || {}).value?.trim() || '';
    const msg = (form.querySelector('#cMsg, #contactMessage') || {}).value?.trim() || '';

    if (!name || !email || !msg) {
      showToast('error', 'Mohon lengkapi semua kolom bertanda bintang (*)');
      return;
    }

    const submitBtn = form.querySelector('button[type=submit]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<svg class="animate-spin w-4 h-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> Mengirim...`;
    }

    const body = `Halo Sugiati,\n\nSaya ${name} (${email}) ingin menghubungi Anda.\n\nPerihal: ${subject || '(tidak ada perihal)'}\n\nPesan:\n${msg}`;
    const mailto = `mailto:parksugiati@gmail.com?subject=${encodeURIComponent(subject || 'Pesan dari Portofolio - ' + name)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailto;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i> Kirim Pesan`;
      }
      form.reset();
      showToast('success', `Terima kasih, ${name}! Email siap terkirim ke Sugiati.`);
      if (window.lucide) lucide.createIcons();
    }, 600);
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

