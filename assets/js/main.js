/**
 * ==============================================================================
 * SCRIPT PRINCIPALE - INTERAZIONI E NAVIGAZIONE
 * ARCI Pesca Ripalimosani
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Menu Mobile Hamburger Toggle
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('nav-open');
      navToggle.classList.toggle('is-open');
    });

    // Chiudi il menu mobile cliccando su un link
    const navLinks = primaryNav.querySelectorAll('.nav-link, .nav-btn-pill');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('nav-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Header con effetto ombra/vetro allo scroll
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 3. Smooth scroll morbido per link interni con cancelletto
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
