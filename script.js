// AOS-lite (fade-up) using IntersectionObserver
(function () {
  const aosElems = document.querySelectorAll('[data-aos]');
  const addInitClass = el => el.classList.add('aos-init');

  aosElems.forEach(addInitClass);

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    aosElems.forEach(el => io.observe(el));
  } else {
    // Fallback: animate all immediately
    aosElems.forEach(el => el.classList.add('aos-animate'));
  }
})();

// Simple modal controls
(function () {
  const openers = document.querySelectorAll('.openModalBtn');
  const modals = new Map();

  function getModal(id) {
    if (!modals.has(id)) {
      const m = document.getElementById(id);
      if (m) modals.set(id, m);
    }
    return modals.get(id);
  }

  function openModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    // focus trap start element
    const focusable = modal.querySelector('[data-close]') || modal.querySelector('button, [href], input, select, textarea');
    if (focusable) focusable.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open buttons
  openers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // allow normal navigation if user ctrl/cmd clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const id = btn.getAttribute('data-modal') || 'learnMoreModal';
      openModal(getModal(id));
    });
  });

  // Close buttons & overlay click
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-close]');
    if (closeBtn) {
      const modal = closeBtn.closest('.modal');
      closeModal(modal);
      return;
    }

    const modalEl = e.target.closest('.modal');
    if (modalEl && e.target === modalEl) {
      // clicked backdrop
      closeModal(modalEl);
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal[aria-hidden="false"]').forEach(closeModal);
    }
  });
})();
