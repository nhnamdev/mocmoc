/* ============================================
   JS FILE: main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {



  /* ---- Sticky Header ---- */
  const header = document.getElementById('sticky-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  /* ---- Mobile Nav ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavClose = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

  // Mobile sub-menus
  document.querySelectorAll('.mobile-nav-list .has-sub > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.closest('.has-sub');
      const sub = parent.querySelector('.mobile-sub');
      parent.classList.toggle('open');
      if (sub) sub.classList.toggle('open');
    });
  });

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav-list a:not(.has-sub > a)').forEach(function (a) {
    a.addEventListener('click', closeMobileNav);
  });



  /* ---- Smooth Scroll for Anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 80;
        window.scrollTo({ top: target.offsetTop - headerH, behavior: 'smooth' });
      }
    });
  });

  /* ---- Counter Animation ---- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  const counters = document.querySelectorAll('.counter-num');
  let countersStarted = false;

  function checkCounters() {
    if (countersStarted) return;
    counters.forEach(function (counter) {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        animateCounter(counter);
      }
    });
    if (counters.length > 0) {
      const firstRect = counters[0].getBoundingClientRect();
      if (firstRect.top < window.innerHeight) countersStarted = true;
    }
  }
  window.addEventListener('scroll', checkCounters);
  checkCounters();

  /* ---- Testimonials Slider ---- */
  const slider = document.getElementById('testi-slider');
  const dotsContainer = document.getElementById('testi-dots');
  const prevBtn = document.getElementById('testi-prev');
  const nextBtn = document.getElementById('testi-next');

  if (slider) {
    const cards = slider.querySelectorAll('.testi-card');
    let current = 0;
    let perView = window.innerWidth <= 640 ? 1 : window.innerWidth <= 900 ? 2 : 3;
    const total = cards.length;
    const maxIndex = total - perView;

    // Create dots
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }

    function getDots() { return dotsContainer.querySelectorAll('.testi-dot'); }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIndex));
      const cardWidth = cards[0].offsetWidth + 28;
      slider.style.transform = 'translateX(-' + (current * cardWidth) + 'px)';
      getDots().forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto slide
    let autoSlide = setInterval(() => goTo(current >= maxIndex ? 0 : current + 1), 5000);
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => goTo(current >= maxIndex ? 0 : current + 1), 5000);
    });

    // Touch support
    let startX = 0;
    slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    slider.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });

    window.addEventListener('resize', function () {
      perView = window.innerWidth <= 640 ? 1 : window.innerWidth <= 900 ? 2 : 3;
      goTo(0);
    });
  }



  /* ---- Fade-In Animations (Intersection Observer) ---- */
  const observerOptions = { threshold: 0.08 };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 50);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation classes
  const animateEls = [];
  document.querySelectorAll('.about-content, .pricing-content, .commit-content, .contact-info').forEach(el => {
    el.classList.add('fade-in-left', 'animate');
    animateEls.push(el);
    observer.observe(el);
  });
  document.querySelectorAll('.about-images, .pricing-image, .commit-image, .contact-form-wrap').forEach(el => {
    el.classList.add('fade-in-right', 'animate');
    animateEls.push(el);
    observer.observe(el);
  });
  document.querySelectorAll('.service-card, .process-card, .benefit-card, .blog-card, .pricing-item, .commit-item').forEach(function (el, i) {
    el.classList.add('fade-in', 'animate');
    el.style.transitionDelay = (i % 4 * 0.12) + 's';
    animateEls.push(el);
    observer.observe(el);
  });
  document.querySelectorAll('.section-header, .testi-card').forEach(el => {
    el.classList.add('fade-in', 'animate');
    animateEls.push(el);
    observer.observe(el);
  });

  /* ---- Particles ---- */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 18; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position:absolute;
        width:${Math.random() * 5 + 2}px;
        height:${Math.random() * 5 + 2}px;
        background:rgba(249,115,22,${Math.random() * 0.5 + 0.1});
        border-radius:50%;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out ${Math.random() * 4}s infinite alternate;
      `;
      particlesContainer.appendChild(particle);
    }
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFloat {
        0% { transform: translate(0,0) scale(1); opacity:0.6; }
        100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 60 + 20}px, -${Math.random() * 80 + 30}px) scale(1.5); opacity:0.1; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ---- Contact Form ---- */
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      btn.textContent = 'Đang gửi...';
      btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = 'Gửi ngay <i class="fa-sharp fa-regular fa-paper-plane"></i>';
        btn.disabled = false;
        formSuccess.classList.add('show');
        form.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 4000);
      }, 1500);
    });
  }

  /* ---- Active nav on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');
  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 120) {
        current = '#' + section.id;
      }
    });
    navItems.forEach(function (item) {
      item.classList.remove('active');
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === current) {
        item.classList.add('active');
      }
    });
  });

});
