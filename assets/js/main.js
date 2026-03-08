/**
 * GEOTECH PRO — main.js
 * Handles: Theme switching, sticky nav, mobile nav,
 *          scroll animations, counter animation, smooth scroll
 */

(function ($) {
  'use strict';

  /* ──────────────────────────────────────────
     THEME SWITCHER
     Persists selection in localStorage so it
     survives page refreshes and navigation.
  ────────────────────────────────────────── */
  const THEMES = ['dark-navy', 'light-pro', 'ocean-teal', 'carbon'];
  const STORAGE_KEY = 'geotech_theme';

  function applyTheme(theme) {
    if (!THEMES.includes(theme)) theme = 'dark-navy';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Sync all switcher buttons across desktop + mobile
    $('.ts-btn, .m-theme-btn').removeClass('active');
    $('[data-t="' + theme + '"]').addClass('active');
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY) || 'dark-navy';
    applyTheme(saved);
  }

  // Desktop switcher
  $(document).on('click', '.ts-btn', function () {
    applyTheme($(this).data('t'));
  });

  // Mobile switcher
  $(document).on('click', '.m-theme-btn', function () {
    applyTheme($(this).data('t'));
  });

  /* ──────────────────────────────────────────
     PRELOADER
  ────────────────────────────────────────── */
  function initPreloader() {
    setTimeout(function () {
      $('#preloader').addClass('gone');
    }, 1900);
  }

  /* ──────────────────────────────────────────
     STICKY NAVBAR
  ────────────────────────────────────────── */
  function initNav() {
    var $nav = $('#mainNav');
    $(window).on('scroll.nav', function () {
      if ($(this).scrollTop() > 60) {
        $nav.addClass('stuck');
      } else {
        $nav.removeClass('stuck');
      }
    });
  }

  /* ──────────────────────────────────────────
     MOBILE NAV OVERLAY
  ────────────────────────────────────────── */
  function initMobileNav() {
    $('#navToggle').on('click', function () {
      $('#mobileNav').addClass('open');
      $('body').css('overflow', 'hidden');
    });
    $('#mClose, .m-nav a:not(.m-theme-btn-wrap a)').on('click', function () {
      $('#mobileNav').removeClass('open');
      $('body').css('overflow', '');
    });
    // Close on ESC
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        $('#mobileNav').removeClass('open');
        $('body').css('overflow', '');
      }
    });
  }

  /* ──────────────────────────────────────────
     SCROLL ANIMATIONS (IntersectionObserver)
  ────────────────────────────────────────── */
  function initScrollAnimations() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ──────────────────────────────────────────
     COUNTER ANIMATION
  ────────────────────────────────────────── */
  var countersDone = false;

  function animateCounters() {
    if (countersDone) return;
    countersDone = true;

    $('[data-target]').each(function () {
      var $el    = $(this);
      var target = parseInt($el.data('target'), 10);
      var html   = $el.html();
      var suffix = html.match(/(<em>[^<]*<\/em>)/);
      var sfx    = suffix ? suffix[1] : '';

      $({ n: 0 }).animate({ n: target }, {
        duration: 2200,
        easing: 'swing',
        step: function () {
          var v = Math.ceil(this.n);
          $el.html(v.toLocaleString() + sfx);
        },
        complete: function () {
          $el.html(target.toLocaleString() + sfx);
        }
      });
    });
  }

  function initCounters() {
    var statsEl = document.getElementById('stats');
    if (!statsEl) return;
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) animateCounters();
    }, { threshold: 0.35 });
    io.observe(statsEl);
  }

  /* ──────────────────────────────────────────
     SOLUTION TABS (filter UI, no actual filter logic
     — extend this for real content filtering)
  ────────────────────────────────────────── */
  function initSolTabs() {
    $('.sol-tab').on('click', function () {
      $('.sol-tab').removeClass('active');
      $(this).addClass('active');
    });
  }

  /* ──────────────────────────────────────────
     SMOOTH SCROLL (anchor links)
  ────────────────────────────────────────── */
  function initSmoothScroll() {
    $(document).on('click', 'a[href^="#"]', function (e) {
      var href   = $(this).attr('href');
      var $target = $(href);
      if ($target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $target.offset().top - 80 }, 600, 'swing');
      }
    });
  }

  /* ──────────────────────────────────────────
     INIT ALL
  ────────────────────────────────────────── */
  $(function () {
    initTheme();
    initPreloader();
    initNav();
    initMobileNav();
    initScrollAnimations();
    initCounters();
    initSolTabs();
    initSmoothScroll();
  });

}(jQuery));
