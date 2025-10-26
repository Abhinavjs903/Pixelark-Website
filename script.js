// script.js
// GSAP + ScrollTrigger is loaded from CDN in HTML

gsap.registerPlugin(ScrollTrigger);

/* Smooth reveal for each panel when scrolled into view */
document.querySelectorAll('.panel').forEach(panel => {
  gsap.fromTo(panel.querySelector('.panel-inner'),
    { y: 30, autoAlpha: 0 },
    {
      y: 0, autoAlpha: 1, duration: 0.9, ease: 'power2.out',
      scrollTrigger: {
        trigger: panel,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

  // subtle background parallax
  const bg = panel.querySelector('.section-bg');
  if (bg) {
    gsap.fromTo(bg, { y: -40 }, {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: panel,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8
      }
    });
  }
});

/* Navigation behavior */
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = document.getElementById(item.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // close mobile nav if open
    closeMobileNav();
  });
});

// highlight nav item on scroll
const sections = document.querySelectorAll('.panel');
window.addEventListener('scroll', () => {
  const mid = window.innerHeight / 2;
  sections.forEach((sec, idx) => {
    const r = sec.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) {
      navItems.forEach(n => n.classList.remove('active'));
      const nav = document.querySelector('.nav-item[data-target="' + sec.id + '"]');
      if (nav) nav.classList.add('active');
      // update theme badge to show current theme name (nice visual cue)
      const themeBadge = document.getElementById('themeBadge');
      themeBadge.textContent = sec.dataset.theme ? sec.dataset.theme.toUpperCase() : 'PIXELARK';
    }
  });
});

/* Mobile hamburger */
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');

function openMobileNav(){
  navList.classList.add('mobile-open');
  hamburger.setAttribute('aria-expanded','true');
}
function closeMobileNav(){
  navList.classList.remove('mobile-open');
  hamburger.setAttribute('aria-expanded','false');
}
hamburger.addEventListener('click', () => {
  if (navList.classList.contains('mobile-open')) closeMobileNav(); else openMobileNav();
});

/* Desktop custom cursor */
if (window.innerWidth > 900) {
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // add hover state on interactive elements
  const interactives = document.querySelectorAll('button, a, .nav-item');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
} else {
  // hide cursor on mobile
  const c = document.getElementById('cursor');
  if (c) c.style.display = 'none';
}

/* Tiny particle / spark effect per theme (lightweight) */
function addThemeParticles(panel){
  const theme = panel.dataset.theme;
  // simple effect: few blurred orbs / sparks created using DOM
  const container = panel;
  for (let i = 0; i < 6; i++){
    const orb = document.createElement('div');
    orb.className = 'mini-orb';
    orb.style.position = 'absolute';
    orb.style.borderRadius = '50%';
    orb.style.filter = 'blur(30px)';
    orb.style.opacity = '0.09';
    orb.style.pointerEvents = 'none';
    orb.style.width = (60 + Math.random()*140) + 'px';
    orb.style.height = orb.style.width;
    orb.style.left = (10 + Math.random()*80) + '%';
    orb.style.top = (5 + Math.random()*80) + '%';
    // color by theme
    switch(theme){
      case 'neo': orb.style.background = 'radial-gradient(circle,#00d1ff,#0000)'; break;
      case 'aurora': orb.style.background = 'radial-gradient(circle,#a78bfa,#06b6d4)'; break;
      case 'frost': orb.style.background = 'radial-gradient(circle,#60a5fa,#e0f2fe)'; break;
      case 'inferno': orb.style.background = 'radial-gradient(circle,#ff6b35,#ffd166)'; break;
      case 'pastel': orb.style.background = 'radial-gradient(circle,#ffbcbc,#b6f0d3)'; break;
      case 'electric': orb.style.background = 'radial-gradient(circle,#ff6bd1,#60f0ff)'; break;
      case 'cosmic': orb.style.background = 'radial-gradient(circle,#a855f7,#7dd3fc)'; break;
      default: orb.style.background = 'radial-gradient(circle,#ffffff,#0000)'; break;
    }
    container.appendChild(orb);
    // animate slightly
    gsap.to(orb, { y: -20 + Math.random()*40, x: -10 + Math.random()*20, duration: 6 + Math.random()*10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }
}

/* add particles to each section once */
document.querySelectorAll('.panel').forEach(p => addThemeParticles(p));

/* Accessibility: allow keyboard nav for nav items */
navItems.forEach(i => {
  i.setAttribute('tabindex', '0');
  i.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      i.click();
    }
  });
});

/* small performance tweak: reduce motion if user prefers reduced motion */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  ScrollTrigger.config({ ignoreMobileResize: true });
  // pause all infinite animations
  gsap.globalTimeline.timeScale(2);
}

// Stars animation for Home
const homeStarsContainer = document.getElementById('homeStars');
const numberOfStars = 200;

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 3 + 's';
  star.style.animationDuration = (Math.random() * 3 + 2) + 's';
  homeStarsContainer.appendChild(star);
}
