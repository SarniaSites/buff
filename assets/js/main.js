/* Buff – site scripts (vanilla JS, no dependencies)
   menu · header · reveals · services explorer · colour picker · lightbox · form */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── Year ─────────────────────────────────────────────── */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ── Mobile menu ──────────────────────────────────────── */
  var menuBtn = $('[data-menu-btn]');
  function closeMenu() {
    document.documentElement.classList.remove('menu-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = document.documentElement.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      $('[data-header]').classList.add('is-stuck');
    });
    $$('[data-menu] a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ── Header background + mobile bar on scroll ─────────── */
  var header = $('[data-header]');
  var bar = $('[data-mobile-bar]');
  function onScroll() {
    var y = window.scrollY;
    if (header && !document.documentElement.classList.contains('menu-open')) header.classList.toggle('is-stuck', y > 20);
    if (bar) bar.classList.toggle('is-shown', y > window.innerHeight * 0.55);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Reveal on scroll ─────────────────────────────────── */
  var revealEls = $$('.reveal, [data-tips]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ── Services explorer (accessible tabs) ──────────────── */
  var explorer = $('[data-explorer]');
  if (explorer) {
    var tabs = $$('[role="tab"]', explorer);
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      // on phones, bring the detail into view
      if (window.innerWidth < 1024 && !focus) {
        var p = document.getElementById(tab.getAttribute('aria-controls'));
        if (p) {
          var top = p.getBoundingClientRect().top;
          if (top > window.innerHeight * 0.7) p.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t, false); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (k === 'Home') n = tabs[0];
        if (k === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  }

  /* "Book X" buttons pre-select the treatment in the form */
  var serviceSelect = $('#f-service');
  $$('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () { if (serviceSelect) serviceSelect.value = a.getAttribute('data-service'); });
  });

  /* ── Colour picker ────────────────────────────────────── */
  var swatches = $$('[data-swatches] .swatch');
  var nails = $$('[data-pick]');
  var shadeName = $('[data-shade-name]');
  swatches.forEach(function (sw) {
    sw.addEventListener('click', function () {
      swatches.forEach(function (s) { s.setAttribute('aria-pressed', String(s === sw)); });
      var c = sw.getAttribute('data-colour');
      nails.forEach(function (n, i) { setTimeout(function () { n.setAttribute('fill', c); }, i * 70); });
      if (shadeName) shadeName.textContent = sw.getAttribute('data-name');
    });
  });

  /* ── Lightbox ─────────────────────────────────────────── */
  var lb = $('[data-lightbox]');
  var items = $$('[data-gallery] [data-full]');
  if (lb && items.length) {
    var img = $('[data-lb-img]', lb), cap = $('[data-lb-cap]', lb), idx = 0, lastFocus = null;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      var it = items[idx];
      img.style.opacity = '0';
      var src = it.getAttribute('data-full');
      var pre = new Image();
      pre.onload = pre.onerror = function () { img.src = src; img.alt = $('img', it).alt; img.style.opacity = '1'; };
      pre.src = src;
      cap.textContent = it.getAttribute('data-caption') || '';
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      $('[data-lb-close]', lb).focus();
    };
    var close = function () {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(idx - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'Tab') { // keep focus inside
        var f = $$('button', lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // swipe
    var sx = null, sy = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(idx + (dx < 0 ? 1 : -1));
      sx = sy = null;
    });
  }

  /* ── Form validation + submit state ───────────────────── */
  var form = $('[data-form]');
  if (form) {
    var rules = {
      name: function (v) { return v.trim().length > 1; },
      phone: function (v) { return v.replace(/[^0-9]/g, '').length >= 6; },
      email: function (v) { return v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }
    };
    var check = function (field) {
      var rule = rules[field.name];
      if (!rule) return true;
      var ok = rule(field.value);
      field.setAttribute('aria-invalid', ok ? 'false' : 'true');
      var err = document.getElementById(field.getAttribute('aria-describedby'));
      if (err) err.classList.toggle('is-shown', !ok);
      return ok;
    };
    Object.keys(rules).forEach(function (n) {
      var f = form.elements[n];
      if (!f) return;
      f.addEventListener('blur', function () { if (f.value) check(f); });
      f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });
    form.addEventListener('submit', function (e) {
      var bad = null;
      Object.keys(rules).forEach(function (n) { var f = form.elements[n]; if (f && !check(f) && !bad) bad = f; });
      if (bad) { e.preventDefault(); bad.focus(); return; }
      var btn = $('[data-submit]', form);
      btn.disabled = true;
      btn.classList.add('opacity-70');
      $('[data-submit-label]', form).textContent = 'Sending…';
    });
  }
})();
