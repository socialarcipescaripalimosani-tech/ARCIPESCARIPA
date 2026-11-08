/**
 * ==============================================================================
 * LIGHTBOX ESSENZIALE PER LOCANDINE A SCHERMO INTERO (VANILLA JAVASCRIPT)
 * ARCI Pesca Ripalimosani
 * ==============================================================================
 * Caratteristiche:
 * - Zero dipendenze esterne (nessun file pesante di terze parti)
 * - Apertura fluida su click della locandina
 * - Chiusura con tasto Esc, pulsante × o click sullo sfondo
 * - Blocco dello scrolling della pagina di sottofondo
 * - Didascalia dinamica con titolo evento
 */

(function () {
  'use strict';

  function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const backdrop = document.getElementById('lightbox-backdrop');

    if (!modal || !modalImg) return;

    // Funzione di apertura
    function openLightbox(src, captionText) {
      modalImg.src = src;
      modalImg.alt = captionText || 'Locandina Ufficiale';
      if (modalCaption) {
        modalCaption.textContent = captionText || '';
      }
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('is-active');
      document.body.classList.add('lightbox-locked');

      // Focus accessibility
      if (closeBtn) closeBtn.focus();
    }

    // Funzione di chiusura
    function closeLightbox() {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-locked');
      setTimeout(() => {
        if (!modal.classList.contains('is-active')) {
          modalImg.src = '';
        }
      }, 300);
    }

    // Assegna evento di click a tutti i trigger di locandina
    function bindTriggers() {
      const triggers = document.querySelectorAll('.lightbox-trigger');
      triggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          const src = this.getAttribute('data-lightbox-src') || 
                      (this.querySelector('img') ? this.querySelector('img').src : '');
          const caption = this.getAttribute('data-lightbox-caption') || 
                          (this.querySelector('img') ? this.querySelector('img').alt : '');
          
          if (src) {
            openLightbox(src, caption);
          }
        });
      });
    }

    // Chiudi al click sulla X
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeLightbox();
      });
    }

    // Chiudi al click sul backdrop (fuori dall'immagine)
    if (backdrop) {
      backdrop.addEventListener('click', closeLightbox);
    }

    // Chiudi premendo il tasto ESC sulla tastiera
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (modal.classList.contains('is-active')) {
          closeLightbox();
        }
      }
    });

    // Inizializza i trigger nel documento
    bindTriggers();
  }

  // Inizializzazione al caricamento del DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
