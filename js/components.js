(function () {
  'use strict';

  var headerHTML = `
<header>
  <div class="logo">
    <img src="images/black_orange_tree.png" alt="Blue Astra Logo">
    <div class="logo-divider"></div>
    <div class="logo-text">
      <span>Blue Astra</span>
      <span>Technologies</span>
    </div>
  </div>
  <nav>
    <a href="index.html" data-page="home">What We Do</a>
    <a href="About.html" data-page="aboutus">About Us</a>
    <a href="#">Blue Astra Insights</a>

    <div class="dropdown-container">
      <a href="Industries.html" data-page="industries">Industries</a>
      <div class="dropdown">
        <a href="Industries.html#aerospace">Aerospace</a>
        <a href="Industries.html#defense">Defense</a>
        <a href="Industries.html#logistics">Logistics</a>
        <a href="Industries.html#supply-chain">Supply Chain</a>
        <a href="Industries.html#media">Media</a>
        <a href="Industries.html#medical">Medical</a>
        <a href="Industries.html#bfsi">Banking Finance and Insurance</a>
        <a href="Industries.html#travel-vacation">Travel and Vacation</a>
        <a href="Industries.html#vehicle-rental">Vehicle Rental</a>
        <a href="Industries.html#industrial-factory">Industrial and Factory</a>
        <a href="Industries.html#reporting">Reporting</a>
        <a href="Industries.html#other-business">Other Business</a>
      </div>
    </div>

    <div class="dropdown-container-services">
      <a href="Services.html" data-page="services">Services</a>
      <div class="dropdown-services">
        <a href="Services.html#platform-implementation">Platform Development</a>
        <a href="Services.html#cloud-services">Cloudification Services</a>
        <a href="Services.html#customized-product-development">Application Development</a>
        <a href="Services.html#quality-assurance">Change and Migration</a>
        <a href="Services.html#api-integration-services">Consulting and Advisory</a>
      </div>
    </div>

    <a href="Contact.html" data-page="contact">Contact Us</a>
  </nav>
</header>`;

  var footerHTML = `
<footer>
  <p>&copy; 2026 Blue Astra Technologies. All rights reserved.</p>
  <p>
    <a href="#">Privacy Policy</a> |
    <a href="#">Terms of Service</a>
  </p>
</footer>`;

  function inject(id, html) {
    var el = document.getElementById(id);
    if (el) {
      el.outerHTML = html;
    }
  }

  function normalizePath(pathname) {
    return pathname.replace(/\/+$/, '').toLowerCase();
  }

  function scrollToHashWithJquery($, hash) {
    if (!hash) {
      return false;
    }

    var $target = $(hash);
    if (!$target.length) {
      return false;
    }

    var headerHeight = $('header').outerHeight() || 0;
    $('html, body').stop().animate(
      { scrollTop: $target.offset().top - headerHeight - 12 },
      520
    );

    return true;
  }

  function initWithJquery($) {
    var page = document.body.dataset.page;
    if (page) {
      var activeLink = document.querySelector('[data-page="' + page + '"]');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }

    function setupDropdown(selector) {
      var $container = $(selector);
      if (!$container.length) {
        return;
      }

      var $trigger = $container.children('a').first();
      $trigger.on('click', function (e) {
        e.preventDefault();
        $('.dropdown-container, .dropdown-container-services').not($container).removeClass('active');
        $container.toggleClass('active');
      });
    }

    setupDropdown('.dropdown-container');
    setupDropdown('.dropdown-container-services');

    $(document).on('click', function (e) {
      if (!$(e.target).closest('.dropdown-container, .dropdown-container-services').length) {
        $('.dropdown-container, .dropdown-container-services').removeClass('active');
      }
    });

    $('nav a[href*="#"]').on('click', function (e) {
      var href = $(this).attr('href');
      if (!href || href === '#') {
        return;
      }

      var targetUrl = new URL(href, window.location.href);
      var isSamePage = normalizePath(targetUrl.pathname) === normalizePath(window.location.pathname);

      if (isSamePage && targetUrl.hash) {
        e.preventDefault();
        if (scrollToHashWithJquery($, targetUrl.hash)) {
          window.history.replaceState(null, '', targetUrl.hash);
        }
        $('.dropdown-container, .dropdown-container-services').removeClass('active');
      }
    });

    if (window.location.hash) {
      setTimeout(function () {
        scrollToHashWithJquery($, window.location.hash);
      }, 120);
    }
  }

  function initWithoutJquery() {
    var page = document.body.dataset.page;
    if (page) {
      var activeLink = document.querySelector('[data-page="' + page + '"]');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }

    function setupDropdown(selector) {
      var container = document.querySelector(selector);
      if (!container) {
        return;
      }

      var trigger = container.querySelector(':scope > a');
      if (!trigger) {
        return;
      }

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.dropdown-container, .dropdown-container-services').forEach(function (item) {
          if (item !== container) {
            item.classList.remove('active');
          }
        });
        container.classList.toggle('active');
      });
    }

    setupDropdown('.dropdown-container');
    setupDropdown('.dropdown-container-services');

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.dropdown-container, .dropdown-container-services')) {
        document.querySelectorAll('.dropdown-container, .dropdown-container-services').forEach(function (item) {
          item.classList.remove('active');
        });
      }
    });
  }

  function loadJquery(callback) {
    if (window.jQuery) {
      callback(window.jQuery);
      return;
    }

    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    script.onload = function () {
      callback(window.jQuery);
    };
    script.onerror = function () {
      callback(null);
    };
    document.head.appendChild(script);
  }

  function normalizeContentBlocks() {
    var page = document.body.dataset.page;
    if (page !== 'home' && page !== 'industries') {
      return;
    }

    if (page === 'industries') {
      document.querySelectorAll('.industry-section, .two-col .col').forEach(function (container) {
        Array.prototype.slice.call(container.childNodes).forEach(function (node) {
          if (node.nodeType !== Node.TEXT_NODE) {
            return;
          }

          var text = (node.textContent || '').replace(/\s+/g, ' ').trim();
          if (!text) {
            container.removeChild(node);
            return;
          }

          var p = document.createElement('p');
          p.textContent = text;
          container.replaceChild(p, node);
        });
      });
    }

    document.querySelectorAll('p').forEach(function (p) {
      if (!p.closest('footer')) {
        p.classList.add('copy-uniform');
      }
    });

    document.querySelectorAll('.two-col .col img, .section img').forEach(function (img) {
      img.classList.add('aligned-media');
    });

    var titleSamples = [
      'Aerospace Equipment & Asset Intelligence',
      'Transforming Enterprise Software for Aerospace',
      'Delivering the Future of Aerospace Technology',
      'Advanced Process Intelligence & Analytics',
      'Enterprise Software Development & Platform Engineering'
    ];

    if (page === 'industries') {
      document.querySelectorAll('p').forEach(function (p) {
        var text = (p.textContent || '').replace(/\s+/g, ' ').trim();
        var isTitle = titleSamples.some(function (sample) {
          return text === sample || text.indexOf(sample) !== -1;
        });

        if (isTitle) {
          p.classList.add('title-line');
        }
      });
    }
  }

  inject('site-header', headerHTML);
  inject('site-footer', footerHTML);
  normalizeContentBlocks();

  loadJquery(function ($) {
    if ($) {
      initWithJquery($);
      return;
    }

    initWithoutJquery();
  });
})();
