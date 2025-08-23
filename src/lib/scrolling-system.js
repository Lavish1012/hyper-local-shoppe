/**
 * Advanced Scrolling System
 * A production-ready, modular scrolling system with accessibility and performance optimizations
 * @version 1.0.0
 */

class AdvancedScrollingSystem {
  constructor() {
    this.options = {};
    this.sections = [];
    this.currentSectionIndex = 0;
    this.isScrolling = false;
    this.observers = [];
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.touchDevice = 'ontouchstart' in window;
    this.progressIndicator = null;
    this.chevronIndicator = null;
    this.ariaLiveRegion = null;
    this.preloadedImages = new Set();
    
    // Throttled scroll handler
    this.handleScroll = this.throttle(this._handleScroll.bind(this), 16);
    
    // Bind methods
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleSectionEnter = this.handleSectionEnter.bind(this);
    this.handleSectionExit = this.handleSectionExit.bind(this);
  }

  /**
   * Initialize the scrolling system
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
      animationDuration: 600,
      staggerDelay: 100,
      preloadAdjacent: true,
      ...options
    };

    this.setupAccessibility();
    this.findSections();
    this.setupProgressIndicator();
    this.setupChevronIndicator();
    this.setupIntersectionObserver();
    this.setupScrollSnap();
    this.preloadImages();
    this.bindEvents();
    
    console.log('Advanced Scrolling System initialized with', this.sections.length, 'sections');
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
      // Create progress indicator if it doesn't exist
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
          transition: width 0.3s ease;
        "></div>
      `;
      document.body.appendChild(this.progressIndicator);
    }
  }

  /**
   * Setup chevron indicator
   */
  setupChevronIndicator() {
    this.chevronIndicator = document.querySelector(this.options.chevronSelector);
    if (!this.chevronIndicator) {
      // Create chevron indicator if it doesn't exist
      this.chevronIndicator = document.createElement('div');
      this.chevronIndicator.className = 'scroll-chevron-indicator';
      this.chevronIndicator.innerHTML = `
        <div class="chevron-pulse" style="
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          animation: ${this.reducedMotion ? 'none' : 'pulse 2s infinite'};
          opacity: 1;
          transition: opacity 0.5s ease;
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
  }

  /**
   * Setup Intersection Observer for section tracking
   */
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };

    this.sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.handleSectionEnter(entry.target);
        } else {
          this.handleSectionExit(entry.target);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => {
      this.sectionObserver.observe(section);
    });
  }

  /**
   * Setup CSS scroll-snap as fallback
   */
  setupScrollSnap() {
    if (this.touchDevice || this.reducedMotion) {
      document.documentElement.style.scrollSnapType = 'y mandatory';
      this.sections.forEach(section => {
        section.style.scrollSnapAlign = 'start';
      });
    }
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
   * Preload a single image
   */
  preloadImage(src) {
    if (!src || this.preloadedImages.has(src)) return;
    
    const img = new Image();
    img.onload = () => this.preloadedImages.add(src);
    img.src = src;
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    if (this.options.enableKeyboardNav) {
      document.addEventListener('keydown', this.handleKeydown);
    }
    
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    
    // Hide chevron after first scroll
    let hasScrolled = false;
    const hideChevron = () => {
      if (!hasScrolled) {
        hasScrolled = true;
        if (this.chevronIndicator) {
          this.chevronIndicator.style.opacity = '0';
        }
      }
    };
    window.addEventListener('scroll', hideChevron, { once: true, passive: true });
  }

  /**
   * Handle keyboard navigation
   */
  handleKeydown(event) {
    if (this.isScrolling) return;

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
   * Handle scroll events
   */
  _handleScroll() {
    this.updateProgress();
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

    // Animate text elements
    if (this.options.enableTextAnimation && !this.reducedMotion) {
      this.animateTextIn(section._textElements);
    }

    // Handle image crossfade
    if (this.options.enableImageCrossfade) {
      this.crossfadeImage(section);
    }

    // Preload adjacent images
    this.preloadAdjacentImages(index);
  }

  /**
   * Handle section exit
   */
  handleSectionExit(section) {
    // Animate text elements out
    if (this.options.enableTextAnimation && !this.reducedMotion) {
      this.animateTextOut(section._textElements);
    }
  }

  /**
   * Animate text elements in with stagger
   */
  animateTextIn(textElements) {
    textElements.forEach((element, index) => {
      const delay = index * this.options.staggerDelay;
      element.style.transform = 'translateY(30px)';
      element.style.opacity = '0';
      element.style.transition = `all ${this.options.animationDuration}ms ease ${delay}ms`;
      
      requestAnimationFrame(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
      });
    });
  }

  /**
   * Animate text elements out
   */
  animateTextOut(textElements) {
    textElements.forEach(element => {
      element.style.transition = `all ${this.options.animationDuration / 2}ms ease`;
      element.style.transform = 'translateY(-15px)';
      element.style.opacity = '0';
    });
  }

  /**
   * Crossfade background images
   */
  crossfadeImage(section) {
    const isMobile = window.innerWidth < 768;
    const imageSrc = isMobile && section._mobileBgImage ? section._mobileBgImage : section._bgImage;
    
    if (!imageSrc) return;

    // Create or update background image
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
        opacity: 0;
        transition: opacity ${this.options.animationDuration}ms ease;
        z-index: -1;
      `;
      section.style.position = 'relative';
      section.insertBefore(bgElement, section.firstChild);
    }

    // Preload and fade in
    this.preloadImage(imageSrc);
    bgElement.style.backgroundImage = `url(${imageSrc})`;
    
    requestAnimationFrame(() => {
      bgElement.style.opacity = '1';
    });
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
   * Update progress indicator
   */
  updateProgress() {
    if (!this.progressIndicator) return;

    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    
    const progressBar = this.progressIndicator.querySelector('.scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progress * 100}%`;
    }
  }

  /**
   * Scroll to specific section
   */
  scrollToSection(index, smooth = true) {
    if (index < 0 || index >= this.sections.length || this.isScrolling) return;

    this.isScrolling = true;
    const section = this.sections[index];
    
    section.scrollIntoView({
      behavior: smooth && !this.reducedMotion ? 'smooth' : 'auto',
      block: 'start'
    });

    // Focus management for accessibility
    section.focus({ preventScroll: true });

    // Reset scrolling flag
    setTimeout(() => {
      this.isScrolling = false;
    }, smooth ? 1000 : 100);
  }

  /**
   * Throttle function for performance
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Destroy the scrolling system
   */
  destroy() {
    // Remove event listeners
    document.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('scroll', this.handleScroll);

    // Disconnect observers
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }

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
    document.documentElement.style.scrollSnapType = '';
    this.sections.forEach(section => {
      section.style.scrollSnapAlign = '';
      section.removeAttribute('tabindex');
    });

    console.log('Advanced Scrolling System destroyed');
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

// Export for both ES modules and CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedScrollingSystem;
} else if (typeof window !== 'undefined') {
  window.AdvancedScrollingSystem = AdvancedScrollingSystem;
}

export default AdvancedScrollingSystem;