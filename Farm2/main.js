$(document).ready(function () {

  /* ===== NAVBAR SCROLL ===== */
  $(window).on('scroll', function () {
    $('#navbar').toggleClass('scrolled', $(this).scrollTop() > 50);
  });

  /* ===== HAMBURGER ===== */
  $('#hamburger').on('click', function (e) {
    e.stopPropagation();
    $('#navLinks').toggleClass('open');
    $('body').toggleClass('nav-open');
  });
  $('#navLinks a').on('click', function () {
    $('#navLinks').removeClass('open');
    $('body').removeClass('nav-open');
  });
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.navbar').length) {
      $('#navLinks').removeClass('open');
      $('body').removeClass('nav-open');
    }
  });

  /* ===== SCROLL REVEAL ===== */
  function reveal() {
    $('.reveal').each(function () {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 60) {
        var $el = $(this), delay = parseInt($el.data('delay')) || 0;
        setTimeout(function () { $el.addClass('visible'); }, delay);
      }
    });
  }
  reveal();
  $(window).on('scroll', reveal);

  /* ===== SUITE PILLS ===== */
  var suiteData = {
    'Subsea Installation Suite': {
      title: 'Subsea Installation Suite',
      desc: 'Integrated visualisation and collaboration platform with the right engineering tools for subsea field development studies at pace.',
      tags: ['Contractors', 'Clients', 'Digitalisation']
    },
    'Integrity Management Suite': {
      title: 'Integrity Management Suite',
      desc: 'Powerful environment for managing life-of-field activities. Maintain asset integrity through the complete design life with full audit trail.',
      tags: ['Asset Operators', 'Integrity Engineers', 'Life-of-Field']
    },
    'Geospatial Mapping Suite': {
      title: 'Geospatial Mapping Suite',
      desc: 'The right tools for onshore construction — from design to completion. Spatial data management with real-time team collaboration.',
      tags: ['Onshore Contractors', 'Surveyors', 'Construction']
    }
  };

  $('.suite-pill').on('click', function () {
    $('.suite-pill').removeClass('active');
    $(this).addClass('active');
    var key = $(this).text().trim();
    var data = suiteData[key];
    if (data) {
      var tags = data.tags.map(function(t){ return '<span class="suite-tag">' + t + '</span>'; }).join('');
      var $d = $('.suite-desc');
      $d.css({ opacity: 0 });
      $d.find('h4').text(data.title);
      $d.find('p').text(data.desc);
      $d.find('.suite-tag-row').html(tags);
      setTimeout(function(){ $d.css({ opacity: 1, transition: 'opacity 0.3s ease' }); }, 50);
    }
  });

  /* ===== CONTACT FORM ===== */
  $('#submitBtn').on('click', function () {
    var name    = $('#name').val().trim();
    var email   = $('#email').val().trim();
    var message = $('#message').val().trim();
    $('.shake').removeClass('shake');
    if (!name || !email || !message) {
      if (!name)    { $('#name').addClass('shake'); }
      if (!email)   { $('#email').addClass('shake'); }
      if (!message) { $('#message').addClass('shake'); }
      return;
    }
    var $btn = $(this);
    $btn.html('Sending... <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 2"/></svg>').prop('disabled', true);
    setTimeout(function () {
      $btn.hide();
      $('#formSuccess').css('display', 'flex');
    }, 1400);
  });

  /* ===== SMOOTH ANCHOR ===== */
  $('a[href*="#"]').not('[href="#"]').on('click', function (e) {
    var target = this.hash && $(this.hash);
    if (target && target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 700);
    }
  });

  /* ===== HERO PARALLAX ===== */
  var ticking = false;
  $(document).on('mousemove', function (e) {
    if (!ticking) {
      requestAnimationFrame(function () {
        var x = (e.clientX / $(window).width() - 0.5) * 16;
        var y = (e.clientY / $(window).height() - 0.5) * 10;
        $('.orb1').css('transform', 'translate(' + (-x * 0.4) + 'px,' + (-y * 0.4) + 'px)');
        $('.orb2').css('transform', 'translate(' + (x * 0.25) + 'px,' + (y * 0.25) + 'px)');
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ===== ANIMATE BAR FILLS ===== */
  var barsAnimated = false;
  function animateBars() {
    if (barsAnimated) return;
    var $bars = $('.hc-bf');
    if (!$bars.length) return;
    var top = $bars.first().closest('.hero-card').offset().top;
    if (top < $(window).scrollTop() + $(window).height()) {
      barsAnimated = true;
      $bars.each(function () {
        var $b = $(this);
        var w = $b.css('--w') || $b[0].style.getPropertyValue('--w') || '80%';
        $b.css('width', '0');
        setTimeout(function () {
          $b.css({ width: w, transition: 'width 1.4s ease-out' });
        }, 300);
      });
    }
  }
  setTimeout(animateBars, 400);
  $(window).on('scroll', animateBars);

  /* ===== HERO CARDS ENTRANCE ===== */
  $('.hero-card').each(function (i) {
    var $c = $(this);
    $c.css({ opacity: 0, transform: 'translateY(20px)' });
    setTimeout(function () {
      $c.css({ transition: 'opacity 0.6s ease, transform 0.6s ease', opacity: 1, transform: 'translateY(0)' });
    }, 400 + i * 150);
  });

  /* ===== HERO CONTENT ENTRANCE ===== */
  $('.hero-left > *').each(function (i) {
    var $el = $(this);
    $el.css({ opacity: 0, transform: 'translateY(16px)' });
    setTimeout(function () {
      $el.css({ transition: 'opacity 0.6s ease, transform 0.6s ease', opacity: 1, transform: 'translateY(0)' });
    }, 100 + i * 90);
  });

});

/* Injected styles */
var s = document.createElement('style');
s.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0);}
    20%,60%{transform:translateX(-4px);}
    40%,80%{transform:translateX(4px);}
  }
  .shake { animation: shake 0.45s ease; border-color: #ef4444 !important; }
  body.nav-open { overflow: hidden; }
  body.nav-open::after {
    content: '';
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    z-index: 150;
    backdrop-filter: blur(2px);
  }
`;
document.head.appendChild(s);
