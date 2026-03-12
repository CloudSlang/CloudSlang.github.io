/* ── Navbar scroll shadow ──────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ── Mobile menu toggle ───────────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on any nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
    navToggle.focus();
  }
});

// Close on click outside the navbar
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !navbar.contains(e.target)) {
    closeMenu();
  }
});

// Clear scroll lock when resizing back to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
    closeMenu();
  }
}, { passive: true });

/* ── Active nav link on scroll (IntersectionObserver) ───────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links .nav-link[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchorLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ── Scroll-reveal (IntersectionObserver) ────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── YouTube click-to-load ───────────────────────────────────────────────── */
const videoContainer = document.getElementById('videoContainer');
const videoPlayBtn   = document.getElementById('videoPlayBtn');

function loadVideo() {
  const videoId = videoContainer.dataset.videoid;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  iframe.title = 'CloudSlang introduction video';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;

  // Remove thumbnail and play button, insert iframe
  videoContainer.innerHTML = '';
  videoContainer.appendChild(iframe);
  videoContainer.style.cursor = 'default';
}

videoPlayBtn.addEventListener('click', loadVideo);

// Also allow clicking anywhere on the thumbnail area
videoContainer.addEventListener('click', (e) => {
  // Only trigger if the play button wasn't the target (it already fired)
  if (!e.target.closest('#videoPlayBtn')) {
    loadVideo();
  }
});
