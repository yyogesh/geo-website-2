$(document).ready(function () {

  /* ===== NAVBAR SCROLL ===== */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }
  });

  /* ===== HAMBURGER MENU ===== */
  $('#hamburger').on('click', function () {
    $('#navLinks').toggleClass('open');
    $('body').toggleClass('nav-open');
  });

  // Close nav when clicking a link
  $('#navLinks a').on('click', function () {
    $('#navLinks').removeClass('open');
    $('body').removeClass('nav-open');
  });

  // Close nav on outside click
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#navbar').length) {
      $('#navLinks').removeClass('open');
    }
  });

  /* ===== SCROLL REVEAL ===== */
  function revealOnScroll() {
    $('.reveal').each(function () {
      const elemTop = $(this).offset().top;
      const viewBottom = $(window).scrollTop() + $(window).height();
      const delay = parseInt($(this).data('delay')) || 0;

      if (elemTop < viewBottom - 60) {
        const $el = $(this);
        setTimeout(function () {
          $el.addClass('visible');
        }, delay);
      }
    });
  }

  // Initial check (for elements already in view)
  revealOnScroll();
  $(window).on('scroll', revealOnScroll);

  /* ===== SUITE PILLS (offerings page) ===== */
  const suiteData = {
    'Subsea Installation': {
      title: 'Subsea Installation Suite',
      desc: 'Integrated visualisation and collaboration platform with the right engineering tools for subsea field development studies at pace.',
      tags: ['Contractors', 'Clients', 'Digitalisation']
    },
    'Integrity Management': {
      title: 'Integrity Management Suite',
      desc: 'Powerful environment for managing life-of-field activities. Maintain asset integrity through the complete design life with full audit trail.',
      tags: ['Asset Operators', 'Integrity Engineers', 'Life-of-Field']
    },
    'Geospatial Mapping': {
      title: 'Geospatial Mapping Suite',
      desc: 'The right tools for onshore construction from design to completion. Spatial data management with real-time collaboration.',
      tags: ['Onshore Contractors', 'Surveyors', 'Construction']
    }
  };

  $('.suite-pill').on('click', function () {
    $('.suite-pill').removeClass('active');
    $(this).addClass('active');

    const key = $(this).text().trim();
    const data = suiteData[key];

    if (data) {
      const tagsHTML = data.tags.map(t => `<span class="suite-tag">${t}</span>`).join('');
      const $desc = $('.suite-desc');
      $desc.css({ opacity: 0, transform: 'translateY(8px)' });
      $desc.find('h4').text(data.title);
      $desc.find('p').text(data.desc);
      $desc.find('.suite-tag-row').html(tagsHTML);
      $desc.animate({ opacity: 1 }, 250);
      $desc.css({ transform: 'translateY(0)', transition: 'opacity 0.25s ease, transform 0.25s ease' });
    }
  });

  /* ===== CONTACT FORM SUBMIT ===== */
  $('#submitBtn').on('click', function () {
    const name    = $('#name').val().trim();
    const email   = $('#email').val().trim();
    const message = $('#message').val().trim();

    if (!name || !email || !message) {
      // Shake effect on empty fields
      if (!name) $('#name').addClass('shake');
      if (!email) $('#email').addClass('shake');
      if (!message) $('#message').addClass('shake');
      setTimeout(() => $('.shake').removeClass('shake'), 600);
      return;
    }

    // Simulate submission
    const $btn = $(this);
    $btn.text('Sending...').prop('disabled', true);
    setTimeout(function () {
      $btn.hide();
      $('#formSuccess').css('display', 'flex');
    }, 1200);
  });

  /* ===== SMOOTH ANCHOR SCROLL ===== */
  $('a[href*="#"]').not('[href="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 700, 'swing');
    }
  });

  /* ===== HERO CARD HOVER PARALLAX ===== */
  $(document).on('mousemove', function (e) {
    const xPercent = (e.clientX / $(window).width() - 0.5) * 20;
    const yPercent = (e.clientY / $(window).height() - 0.5) * 12;

    $('.hero-orb.orb1').css('transform',
      `translate(${xPercent * -0.5}px, ${yPercent * -0.5}px)`);
    $('.hero-orb.orb2').css('transform',
      `translate(${xPercent * 0.3}px, ${yPercent * 0.3}px)`);
  });

  /* ===== COUNTER ANIMATION (stats) ===== */
  function animateCounter($el, target, suffix) {
    $({ count: 0 }).animate({ count: target }, {
      duration: 1400,
      easing: 'swing',
      step: function () {
        $el.text(Math.ceil(this.count) + suffix);
      },
      complete: function () {
        $el.text(target + suffix);
      }
    });
  }

  let statsAnimated = false;
  function checkStats() {
    if (statsAnimated) return;
    const $stats = $('.hero-stats');
    if (!$stats.length) return;

    const statsTop = $stats.offset().top;
    const viewBottom = $(window).scrollTop() + $(window).height();

    if (statsTop < viewBottom) {
      statsAnimated = true;
      animateCounter($('.stat-n').eq(0), 3, '');
      animateCounter($('.stat-n').eq(1), 4, '');
    }
  }

  $(window).on('scroll', checkStats);
  setTimeout(checkStats, 500);

});

/* ===== SHAKE ANIMATION (CSS injected) ===== */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  .shake { animation: shake 0.5s ease; border-color: #ef4444 !important; }

  body.nav-open { overflow: hidden; }
  body.nav-open::after {
    content: '';
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 150;
  }
`;
document.head.appendChild(shakeStyle);
