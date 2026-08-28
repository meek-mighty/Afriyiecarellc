document.addEventListener('DOMContentLoaded', function () {
  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.innerHTML = '&copy; ' + new Date().getFullYear();

  /* ---------- header scroll state ---------- */
  var header = document.getElementById('site-header');
  var scrollBar = document.getElementById('scroll-progress-bar');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
    if (scrollBar) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      scrollBar.style.width = pct + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      menuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ---------- active nav link on scroll ---------- */
  var navLinks = document.querySelectorAll('.nav-link[data-section]');
  if (navLinks.length) {
    var sections = Array.prototype.slice.call(navLinks).map(function (l) {
      return document.getElementById(l.dataset.section);
    }).filter(Boolean);
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          var match = document.querySelector('.nav-link[data-section="' + entry.target.id + '"]');
          if (match) match.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(function (s) { navIo.observe(s); });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .clip-reveal');
  var revealIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(function (el) { revealIo.observe(el); });

  /* ---------- count up ---------- */
  var countEls = document.querySelectorAll('[data-countup]');
  var countIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var to = parseFloat(el.dataset.countup);
        var suffix = el.dataset.suffix || '';
        var duration = 1400;
        var start = performance.now();
        function tick(now) {
          var t = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(eased * to) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countIo.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  countEls.forEach(function (el) { countIo.observe(el); });

  /* ---------- magnetic buttons ---------- */
  document.querySelectorAll('.magnetic').forEach(function (el) {
    var strength = parseFloat(el.dataset.magnetic || '0.3');
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = 'translate(' + (x * strength) + 'px, ' + (y * strength) + 'px)';
    });
    el.addEventListener('mouseleave', function () {
      el.style.transform = 'translate(0px, 0px)';
    });
  });

  /* ---------- spotlight hover cards ---------- */
  document.querySelectorAll('.spotlight-card').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  });

  /* ---------- hero collage mouse parallax ---------- */
  var collage = document.getElementById('hero-collage');
  if (collage) {
    collage.addEventListener('mousemove', function (e) {
      var rect = collage.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      collage.querySelectorAll('[data-depth]').forEach(function (child) {
        var depth = parseFloat(child.dataset.depth || '0');
        child.style.transform = 'translate(' + (px * depth) + 'px, ' + (py * depth) + 'px)';
      });
    });
    collage.addEventListener('mouseleave', function () {
      collage.querySelectorAll('[data-depth]').forEach(function (child) {
        child.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  /* ---------- gallery marquee population ---------- */
  var row1Images = ['blanket-wrap.jpg', 'park-walk.jpg', 'wheelchair-elbow.jpg', 'wheelchair-portrait.jpg', 'garden.jpg'];
  var row2Images = ['park-bench.jpg', 'hug-walker.jpg', 'cane-hands.jpg', 'hug-laugh.jpg', 'hero-tablet.jpg'];
  function fillRow(id, images) {
    var track = document.getElementById(id);
    if (!track) return;
    var doubled = images.concat(images);
    doubled.forEach(function (src) {
      var img = document.createElement('img');
      img.src = 'images/' + src;
      img.alt = '';
      track.appendChild(img);
    });
  }
  fillRow('row1', row1Images);
  fillRow('row2', row2Images);

  /* ---------- service pills ---------- */
  var pills = document.querySelectorAll('.service-pill');
  var serviceInput = document.getElementById('service-input');
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      if (serviceInput) serviceInput.value = pill.dataset.value;
    });
  });

  /* ---------- contact form (Formspree, silent submit via hidden iframe) ---------- */
  var form = document.getElementById('contact-form');
  var successBox = document.getElementById('form-success');
  var errorBox = document.getElementById('form-error');
  var submitBtn = document.getElementById('submit-btn');
  var hiddenFrame = document.getElementById('hidden-frame');
  var formSubmitted = false;
  var errorTimer = null;

  if (form) {
    form.addEventListener('submit', function () {
      /* No preventDefault — the browser performs a real submission into the
         hidden iframe below, so Formspree sees a normal form POST (which is
         what verifies the form) and the page itself never navigates away. */
      formSubmitted = true;
      if (errorBox) errorBox.style.display = 'none';
      if (submitBtn) { submitBtn.textContent = 'Sending…'; submitBtn.style.opacity = '0.6'; submitBtn.style.pointerEvents = 'none'; }

      /* Safety net: if the iframe never reports back, still let the user know. */
      clearTimeout(errorTimer);
      errorTimer = setTimeout(function () {
        if (formSubmitted && errorBox) {
          errorBox.style.display = 'block';
          if (submitBtn) { submitBtn.textContent = 'Send request'; submitBtn.style.opacity = '1'; submitBtn.style.pointerEvents = 'auto'; }
          formSubmitted = false;
        }
      }, 8000);
    });
  }

  if (hiddenFrame) {
    hiddenFrame.addEventListener('load', function () {
      if (!formSubmitted) return; /* ignore the iframe's own initial blank load */
      clearTimeout(errorTimer);
      formSubmitted = false;
      if (form) form.style.display = 'none';
      if (successBox) successBox.style.display = 'block';
      if (submitBtn) { submitBtn.textContent = 'Send request'; submitBtn.style.opacity = '1'; submitBtn.style.pointerEvents = 'auto'; }
    });
  }
});
