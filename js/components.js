(function () {
  'use strict';

  /* ── Header markup ──────────────────────────────────────── */
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
    <a href="About.html"> About Us</a>
    <a href="#">Blue Astra Insights</a>
    <div class="dropdown-container">
      <a href="Industries.html" data-page="industries">Industries</a>
      <div class="dropdown">
        <a href="#">Aerospace</a>
        <a href="#">Defense</a>
        <a href="#">Logistics</a>
        <a href="#">Supply Chain</a>
        <a href="#">Media</a>
        <a href="#">Banking Finance and Insurance</a>
        <a href="#">Travel & Vacation</a>
        <a href="#">Vehicle Rental</a>
        <a href="#">Industrial & Factory</a>
        <a href="#">Reporting</a>
        <a href="#">Other Business</a>
      </div>
    </div>
    <div class="dropdown-container-services">
      <a href="Services.html" data-page="services">Services</a>
      <div class="dropdown-services">
        <a href="#">Platform Development</a>
        <a href="#">Cloudification Services</a>
        <a href="#">Application Development</a>
        <a href="#">Change and Migration</a>
        <a href="#">Consulting / Advisory</a>
      </div>
    </div>
    <a href="Contact.html" data-page="contact">Contact Us</a>
  </nav>
</header>`;

  /* ── Footer markup ──────────────────────────────────────── */
  var footerHTML = `
<footer>
  <p>&copy; 2026 Blue Astra Technologies. All rights reserved.</p>
  <p>
    <a href="#">Privacy Policy</a> |
    <a href="#">Terms of Service</a>
  </p>
</footer>`;

  /* ── Inject header / footer ─────────────────────────────── */
  function inject(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  inject('site-header', headerHTML);
  inject('site-footer', footerHTML);

  /* ── Highlight active nav link via data-page on <body> ──── */
  var page = document.body.dataset.page;
  if (page) {
    var link = document.querySelector('[data-page="' + page + '"]');
    if (link) link.classList.add('active');
  }

  /* ── Dropdown toggle ────────────────────────────────────── */
  function setupDropdown(selector) {
    var container = document.querySelector(selector);
    if (!container) return;

    container.querySelector('a').addEventListener('click', function (e) {
     
      container.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
      if (!container.contains(e.target)) {
        container.classList.remove('active');
      }
    });
  }

  setupDropdown('.dropdown-container');
  setupDropdown('.dropdown-container-services');

})();
