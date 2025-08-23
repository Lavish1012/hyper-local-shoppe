/**
 * Advanced Scrolling System - Lenis + GSAP Implementation
 * Enhanced version with Lenis smooth scrolling and GSAP animations
 * @version 1.0.0
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

class AdvancedScrollingSystemLenis {
  constructor() {
    this.options = {};
    this.sections = [];
    this.currentSectionIndex = 0;
    this.lenis = null;
    this.timelines = new Map();
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.touchDevice = 'ontouchstart' in window;
    this.progressIndicator = null;
    this.chevronIndicator = null;
    this.ariaLiveRegion = null;
    this.preloadedImages = new Set();
    
    // Bind methods
    this.handleKeydown = this.handleKeydown.bind(this);
    this.raf = this.raf.bind(this);
  }

  /**
   * Initialize the enhanced scrolling system
   * @param {Object} options - Configuration options
   */
  init(options = {}) {
    this.options = {
      sectionSelector: '[data-scroll-section]',
      imageAttribute: 'data-bg-image',
      mobileImageAttribute: 'data-bg-image-mobile',
      textSelector: '[data-scroll-text]',
      progressSelector: '[data-scroll-progress]',
      chevronSelector: '[data-scroll-chevron]',
      enableKeyboardNav: true,
      enableProgressIndicator: true,
      enableImageCrossfade: true,
      enableTextAnimation: true,
      animationDuration: 0.8,
      staggerDelay: 0.1,
      preloadAdjacent: true,
      lenisOptions: {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      },
      ...options
    };

    this.setupLenis();
    this.setupAccessibility();
    this.findSections();
    this.setupProgressIndicator();
    this.setupChevronIndicator();
    this.setupScrollTriggers();
    this.preloadImages();
    this.bindEvents();
    this.startRAF();
    
    console.log('Advanced Scrolling System (Lenis) initialized with', this.sections.length, 'sections');
  }

  /**
   * Setup Lenis smooth scrolling
   */
  setupLenis() {
    if (this.reducedMotion || this.touchDevice) {
      console.log('Lenis disabled due to reduced motion preference or touch device');
      return;
    }

    this.lenis = new Lenis(this.options.lenisOptions);
    
    this.lenis.on('scroll', ScrollTrigger.update);
    
    // Update GSAP ScrollTrigger on Lenis scroll
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    // Create ARIA live region for section announcements
    this.ariaLiveRegion = document.createElement('div');
    this.ariaLiveRegion.setAttribute('aria-live', 'polite');
    this.ariaLiveRegion.setAttribute('aria-atomic', 'true');
    this.ariaLiveRegion.className = 'sr-only';
    document.body.appendChild(this.ariaLiveRegion);

    // Add role and aria-label to sections
    const sections = document.querySelectorAll(this.options.sectionSelector);
    sections.forEach((section, index) => {
      if (!section.getAttribute('role')) {
        section.setAttribute('role', 'region');
      }
      if (!section.getAttribute('aria-label')) {
        section.setAttribute('aria-label', `Section ${index + 1}`);
      }
      section.setAttribute('tabindex', '-1');
    });
  }

  /**
   * Find and cache all sections
   */
  findSections() {
    this.sections = Array.from(document.querySelectorAll(this.options.sectionSelector));
    this.sections.forEach((section, index) => {
      // Setup text elements for animation
      const textElements = section.querySelectorAll(this.options.textSelector);
      section._textElements = Array.from(textElements);
      
      // Setup image data
      const bgImage = section.getAttribute(this.options.imageAttribute);
      const mobileBgImage = section.getAttribute(this.options.mobileImageAttribute);
      section._bgImage = bgImage;
      section._mobileBgImage = mobileBgImage;
      section._index = index;
    });
  }

  /**
   * Setup progress indicator
   */
  setupProgressIndicator() {
    if (!this.options.enableProgressIndicator) return;

    this.progressIndicator = document.querySelector(this.options.progressSelector);
    if (!this.progressIndicator) {
      this.progressIndicator = document.createElement('div');
      this.progressIndicator.className = 'scroll-progress-indicator';
      this.progressIndicator.innerHTML = `
        <div class="scroll-progress-bar" style="
          position: fixed;
          top: 0;
          left: 0;
          width: 0%;
          height: 3px;
          background: var(--scroll-progress-color, #3b82f6);
          z-index: 9999;
        "></div>
      `;
      document.body.appendChild(this.progressIndicator);
    }

    // Animate progress bar with GSAP
    gsap.to(this.progressIndicator.querySelector('.scroll-progress-bar'), {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }

  /**
   * Setup chevron indicator
   */
  setupChevronIndicator() {
    this.chevronIndicator = document.querySelector(this.options.chevronSelector);
    if (!this.chevronIndicator) {
      this.chevronIndicator = document.createElement('div');
      this.chevronIndicator.className = 'scroll-chevron-indicator';
      this.chevronIndicator.innerHTML = `
        <div class="chevron-pulse" style="
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          pointer-events: none;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
      `;
      document.body.appendChild(this.chevronIndicator);
    }

    if (!this.reducedMotion) {
      // Pulse animation
      gsap.to(this.chevronIndicator.querySelector('.chevron-pulse'), {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });

      // Hide after first scroll
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top-=50',
        onEnter: () => {
          gsap.to(this.chevronIndicator, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        },
      });
    }
  }

  /**
   * Setup GSAP ScrollTrigger animations
   */
  setupScrollTriggers() {
    this.sections.forEach((section, index) => {
      // Create timeline for this section
      const tl = gsap.timeline({ paused: true });
      this.timelines.set(section, tl);

      // Text animation
      if (this.options.enableTextAnimation && section._textElements.length > 0) {
        // Initial state
        gsap.set(section._textElements, {
          y: 50,
          opacity: 0,
        });

        // Animate in
        tl.to(section._textElements, {
          y: 0,
          opacity: 1,
          duration: this.options.animationDuration,
          stagger: this.options.staggerDelay,
          ease: 'power3.out',
        });
      }

      // Image crossfade
      if (this.options.enableImageCrossfade) {
        this.setupImageCrossfade(section);
      }

      // ScrollTrigger for section enter/exit
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => this.handleSectionEnter(section),
        onLeave: () => this.handleSectionExit(section),
        onEnterBack: () => this.handleSectionEnter(section),
        onLeaveBack: () => this.handleSectionExit(section),
      });
    });
  }

  /**
   * Setup image crossfade with GSAP
   */
  setupImageCrossfade(section) {
    const isMobile = window.innerWidth < 768;
    const imageSrc = isMobile && section._mobileBgImage ? section._mobileBgImage : section._bgImage;
    
    if (!imageSrc) return;

    // Create background image element
    let bgElement = section.querySelector('.scroll-bg-image');
    if (!bgElement) {
      bgElement = document.createElement('div');
      bgElement.className = 'scroll-bg-image';
      bgElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        z-index: -1;
      `;
      section.style.position = 'relative';
      section.insertBefore(bgElement, section.firstChild);
    }

    // Set initial state
    gsap.set(bgElement, { opacity: 0 });

    // Preload and setup animation
    this.preloadImage(imageSrc).then(() => {
      bgElement.style.backgroundImage = `url(${imageSrc})`;
      
      // Add to timeline
      const tl = this.timelines.get(section);
      tl.to(bgElement, {
        opacity: 1,
        duration: this.options.animationDuration,
        ease: 'power2.out',
      }, 0);
    });
  }

  /**
   * Preload image with promise
   */
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      if (!src || this.preloadedImages.has(src)) {
        resolve();
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        this.preloadedImages.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * Preload images for performance
   */
  preloadImages() {
    if (!this.options.preloadAdjacent) return;

    this.sections.forEach((section, index) => {
      const images = [section._bgImage, section._mobileBgImage].filter(Boolean);
      
      // Preload current and adjacent section images
      if (index <= this.currentSectionIndex + 1 && index >= this.currentSectionIndex - 1) {
        images.forEach(imgSrc => this.preloadImage(imgSrc));
      }
    });
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    if (this.options.enableKeyboardNav) {
      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  /**
   * Handle keyboard navigation
   */
  handleKeydown(event) {
    const { key } = event;
    let targetIndex = -1;

    switch (key) {
      case 'ArrowDown':
      case 'PageDown':
        targetIndex = Math.min(this.currentSectionIndex + 1, this.sections.length - 1);
        break;
      case 'ArrowUp':
      case 'PageUp':
        targetIndex = Math.max(this.currentSectionIndex - 1, 0);
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = this.sections.length - 1;
        break;
      default:
        return;
    }

    if (targetIndex !== -1 && targetIndex !== this.currentSectionIndex) {
      event.preventDefault();
      this.scrollToSection(targetIndex);
    }
  }

  /**
   * Handle section enter
   */
  handleSectionEnter(section) {
    const index = section._index;
    this.currentSectionIndex = index;
    
    // Update ARIA live region
    if (this.ariaLiveRegion) {
      const label = section.getAttribute('aria-label') || `Section ${index + 1}`;
      this.ariaLiveRegion.textContent = `Entered ${label}`;
    }

    // Play timeline
    const tl = this.timelines.get(section);
    if (tl) {
      tl.play();
    }

    // Preload adjacent images
    this.preloadAdjacentImages(index);
  }

  /**
   * Handle section exit
   */
  handleSectionExit(section) {
    // Reverse timeline if needed
    const tl = this.timelines.get(section);
    if (tl && this.options.enableTextAnimation) {
      // Create exit animation
      gsap.to(section._textElements, {
        y: -20,
        opacity: 0,
        duration: this.options.animationDuration / 2,
        ease: 'power2.in',
      });
    }
  }

  /**
   * Preload images from adjacent sections
   */
  preloadAdjacentImages(currentIndex) {
    const adjacentIndices = [currentIndex - 1, currentIndex + 1];
    
    adjacentIndices.forEach(index => {
      if (index >= 0 && index < this.sections.length) {
        const section = this.sections[index];
        const images = [section._bgImage, section._mobileBgImage].filter(Boolean);
        images.forEach(imgSrc => this.preloadImage(imgSrc));
      }
    });
  }

  /**
   * Scroll to specific section
   */
  scrollToSection(index, smooth = true) {
    if (index < 0 || index >= this.sections.length) return;

    const section = this.sections[index];
    
    if (this.lenis && smooth && !this.reducedMotion) {
      this.lenis.scrollTo(section, {
        offset: 0,
        duration: this.options.lenisOptions.duration,
      });
    } else {
      section.scrollIntoView({
        behavior: smooth && !this.reducedMotion ? 'smooth' : 'auto',
        block: 'start'
      });
    }

    // Focus management for accessibility
    section.focus({ preventScroll: true });
  }

  /**
   * Start RAF loop
   */
  startRAF() {
    if (!this.lenis) return;
    
    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  /**
   * RAF callback
   */
  raf(time) {
    if (this.lenis) {
      this.lenis.raf(time);
    }
  }

  /**
   * Destroy the scrolling system
   */
  destroy() {
    // Stop Lenis
    if (this.lenis) {
      this.lenis.destroy();
    }

    // Kill all GSAP animations and ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    this.timelines.forEach(tl => tl.kill());
    this.timelines.clear();

    // Remove event listeners
    document.removeEventListener('keydown', this.handleKeydown);

    // Remove created elements
    if (this.ariaLiveRegion) {
      this.ariaLiveRegion.remove();
    }
    if (this.progressIndicator && this.progressIndicator.className === 'scroll-progress-indicator') {
      this.progressIndicator.remove();
    }
    if (this.chevronIndicator && this.chevronIndicator.className === 'scroll-chevron-indicator') {
      this.chevronIndicator.remove();
    }

    // Reset styles
    this.sections.forEach(section => {
      section.removeAttribute('tabindex');
    });

    console.log('Advanced Scrolling System (Lenis) destroyed');
  }

  /**
   * Get current section index
   */
  getCurrentSection() {
    return this.currentSectionIndex;
  }

  /**
   * Get all sections
   */
  getSections() {
    return this.sections;
  }
}

export default AdvancedScrollingSystemLenis;