// ═══════════════ INTRO: optional real video OR SVG fallback ═══════════════
(function initIntro() {
  const overlay = document.getElementById('introOverlay');
  const flash = document.querySelector('.intro-flash-overlay');
  const video = document.getElementById('introRealVideo');

  function removeIntroFromDom() {
    overlay?.remove();
    flash?.remove();
    document.body.classList.remove('intro-video-active');
  }

  function exitIntroWithFade() {
    if (!overlay) return;
    overlay.classList.add('intro-exiting');
    window.setTimeout(removeIntroFromDom, 750);
  }

  /** SVG-only path: same timing as before (~5s total) */
  function scheduleSvgIntroRemoval() {
    window.setTimeout(removeIntroFromDom, 5000);
  }

  if (!overlay || !video) {
    scheduleSvgIntroRemoval();
    return;
  }

  let svgRemovalScheduled = false;

  function useVideoIntro() {
    overlay.classList.remove('intro-fallback-active');
    overlay.classList.add('intro-video-playing');
    document.body.classList.add('intro-video-active');

    video.addEventListener('ended', () => exitIntroWithFade(), { once: true });

    video.play().catch(() => {
      overlay.classList.remove('intro-video-playing');
      overlay.classList.add('intro-fallback-active');
      document.body.classList.remove('intro-video-active');
      if (!svgRemovalScheduled) {
        svgRemovalScheduled = true;
        scheduleSvgIntroRemoval();
      }
    });
  }

  video.addEventListener(
    'error',
    () => {
      if (!svgRemovalScheduled) {
        svgRemovalScheduled = true;
        scheduleSvgIntroRemoval();
      }
    },
    { once: true }
  );

  video.addEventListener(
    'loadeddata',
    () => {
      if (video.videoWidth > 0) useVideoIntro();
      else if (!svgRemovalScheduled) {
        svgRemovalScheduled = true;
        scheduleSvgIntroRemoval();
      }
    },
    { once: true }
  );

  /* No usable file / events: still tear down so the site is never stuck */
  window.setTimeout(() => {
    if (!overlay.classList.contains('intro-video-playing') && !svgRemovalScheduled) {
      svgRemovalScheduled = true;
      scheduleSvgIntroRemoval();
    }
  }, 12000);

  video.load();
})();

// ═══════════════ CUSTOM CURSOR ═══════════════
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (dot) {
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }
});

function animateRing() {
  if (ring) {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
  }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-card, .gallery-item, .filter-btn').forEach((el) => {
  el.addEventListener('mouseenter', () => ring && ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring && ring.classList.remove('hovering'));
});

// ═══════════════ NAVBAR SCROLL ═══════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ═══════════════ COUNTER ANIMATION ═══════════════
document.querySelectorAll('.stat-number').forEach((el) => {
  const target = parseInt(el.dataset.count, 10);
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + (target === 100 ? '%' : target === 24 ? 'hr' : '+');
      clearInterval(timer);
    } else {
      el.textContent = String(Math.floor(current));
    }
  }, 25);
});

// ═══════════════ PARALLAX ON HERO PHOTOS ═══════════════
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  document.querySelectorAll('.floating-photo').forEach((photo, i) => {
    const depth = (i + 1) * 8;
    photo.style.transform = `translate(${x * depth}px, ${y * depth}px) rotate(${x * 2}deg)`;
  });
  const lens = document.querySelector('.lens-3d');
  if (lens) {
    lens.style.transform = `translate(calc(-50% + ${x * 15}px), calc(-50% + ${y * 15}px))`;
  }
});

// ═══════════════ 3D TILT ON SERVICE CARDS ═══════════════
document.querySelectorAll('.service-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ═══════════════ MOBILE MENU TOGGLE ═══════════════
const mobileToggle = document.getElementById('mobileToggle');
if (mobileToggle && navbar) {
  mobileToggle.addEventListener('click', () => {
    const open = navbar.classList.toggle('mobile-open');
    mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navbar.classList.remove('mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
