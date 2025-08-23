# Advanced Scrolling System

A production-ready, modular scrolling system with accessibility and performance optimizations. This system provides smooth section-based scrolling with image crossfades, text animations, progress indicators, and comprehensive keyboard navigation.

## Features

- 🚀 **Performance Optimized**: Uses transforms & opacity only, IntersectionObserver, requestAnimationFrame
- ♿ **Accessibility First**: ARIA live regions, keyboard navigation, focus management, reduced motion support
- 📱 **Mobile Friendly**: Native touch scrolling, CSS scroll-snap fallback
- 🎨 **Visual Effects**: Image crossfading, staggered text animations, progress indicator
- 🔧 **Configurable**: Flexible API with extensive customization options
- 📦 **Self-Contained**: Drop-in solution with minimal DOM changes required

## Installation

### Option 1: Standard Version (Vanilla JS)
```html
<!-- Include the minified version -->
<script src="path/to/scrolling-system.min.js"></script>

<!-- Or use the ES module -->
<script type="module">
  import AdvancedScrollingSystem from './path/to/scrolling-system.js';
</script>
```

### Option 2: Enhanced Version (Lenis + GSAP)
First install dependencies:
```bash
npm install @studio-freight/lenis gsap
```

Then import:
```javascript
import AdvancedScrollingSystemLenis from './path/to/scrolling-system-lenis.js';
```

## Quick Start

### 1. HTML Structure
Add data attributes to your sections:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Required CSS for progress indicator */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    /* Optional: Add pulse animation for chevron */
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    /* Ensure sections are full height */
    [data-scroll-section] {
      min-height: 100vh;
      position: relative;
    }
  </style>
</head>
<body>
  <!-- Section 1 -->
  <section 
    data-scroll-section
    data-bg-image="/images/hero-desktop.jpg"
    data-bg-image-mobile="/images/hero-mobile.jpg"
    aria-label="Hero Section"
  >
    <h1 data-scroll-text>Welcome to Our Site</h1>
    <p data-scroll-text>This is the hero section</p>
    <button data-scroll-text>Get Started</button>
  </section>

  <!-- Section 2 -->
  <section 
    data-scroll-section
    data-bg-image="/images/about-desktop.jpg"
    data-bg-image-mobile="/images/about-mobile.jpg"
    aria-label="About Section"
  >
    <h2 data-scroll-text>About Us</h2>
    <p data-scroll-text>Learn more about what we do</p>
  </section>

  <!-- Section 3 -->
  <section 
    data-scroll-section
    data-bg-image="/images/contact-desktop.jpg"
    aria-label="Contact Section"
  >
    <h2 data-scroll-text>Contact</h2>
    <p data-scroll-text>Get in touch with us</p>
  </section>
</body>
</html>
```

### 2. JavaScript Initialization

#### Standard Version:
```javascript
// Initialize with default options
const scrollSystem = new AdvancedScrollingSystem();
scrollSystem.init();

// Or with custom options
scrollSystem.init({
  sectionSelector: '[data-scroll-section]',
  textSelector: '[data-scroll-text]',
  animationDuration: 800,
  staggerDelay: 150,
  enableKeyboardNav: true,
  enableProgressIndicator: true,
  enableImageCrossfade: true,
  enableTextAnimation: true,
  preloadAdjacent: true
});
```

#### Enhanced Version (Lenis + GSAP):
```javascript
import AdvancedScrollingSystemLenis from './scrolling-system-lenis.js';

const scrollSystem = new AdvancedScrollingSystemLenis();
scrollSystem.init({
  // All standard options plus Lenis-specific ones
  lenisOptions: {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  }
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sectionSelector` | string | `'[data-scroll-section]'` | CSS selector for scroll sections |
| `imageAttribute` | string | `'data-bg-image'` | Attribute for desktop background images |
| `mobileImageAttribute` | string | `'data-bg-image-mobile'` | Attribute for mobile background images |
| `textSelector` | string | `'[data-scroll-text]'` | CSS selector for animated text elements |
| `progressSelector` | string | `'[data-scroll-progress]'` | CSS selector for custom progress indicator |
| `chevronSelector` | string | `'[data-scroll-chevron]'` | CSS selector for custom chevron indicator |
| `enableKeyboardNav` | boolean | `true` | Enable keyboard navigation |
| `enableProgressIndicator` | boolean | `true` | Show scroll progress indicator |
| `enableImageCrossfade` | boolean | `true` | Enable background image crossfading |
| `enableTextAnimation` | boolean | `true` | Enable text animations |
| `animationDuration` | number | `600` | Animation duration in milliseconds |
| `staggerDelay` | number | `100` | Stagger delay for text animations |
| `preloadAdjacent` | boolean | `true` | Preload adjacent section images |

## Image Management

### Desktop vs Mobile Images
The system supports different images for desktop and mobile:

```html
<section 
  data-scroll-section
  data-bg-image="/images/hero-desktop-2560.jpg"
  data-bg-image-mobile="/images/hero-mobile-800.jpg"
>
  <!-- content -->
</section>
```

### Image Optimization Tips
- Use high-resolution images for desktop (1920px+ width)
- Use optimized images for mobile (800px width recommended)
- Consider WebP format for better compression
- Implement lazy loading for non-visible sections

## Keyboard Navigation

The system supports comprehensive keyboard navigation:

| Key | Action |
|-----|--------|
| `↓` / `Page Down` | Next section |
| `↑` / `Page Up` | Previous section |
| `Home` | First section |
| `End` | Last section |

## Accessibility Features

### ARIA Support
- Automatic `role="region"` and `aria-label` attributes
- Live region announcements for section changes
- Proper focus management

### Reduced Motion Support
- Respects `prefers-reduced-motion: reduce`
- Disables animations and parallax effects
- Maintains functionality with reduced visual effects

### Screen Reader Support
- Semantic HTML structure
- Descriptive ARIA labels
- Live region updates for section transitions

## API Methods

```javascript
const scrollSystem = new AdvancedScrollingSystem();
scrollSystem.init();

// Get current section index
const currentIndex = scrollSystem.getCurrentSection();

// Get all sections
const sections = scrollSystem.getSections();

// Scroll to specific section
scrollSystem.scrollToSection(2, true); // index, smooth

// Destroy the system
scrollSystem.destroy();
```

## Custom Styling

You can customize the appearance by overriding CSS variables:

```css
:root {
  --scroll-progress-color: #3b82f6; /* Progress bar color */
}

/* Customize progress indicator */
.scroll-progress-indicator .scroll-progress-bar {
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
}

/* Customize chevron indicator */
.scroll-chevron-indicator {
  color: #3b82f6;
}

/* Customize text animations */
[data-scroll-text] {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Performance Considerations

### Optimizations Included
- Transform and opacity-only animations for 60fps
- IntersectionObserver for efficient scroll detection
- RequestAnimationFrame for smooth animations
- Throttled scroll handlers
- Image preloading for adjacent sections
- Minimal DOM manipulation

### Best Practices
- Keep sections to a reasonable number (< 10 for best performance)
- Optimize images before use
- Test on lower-end devices
- Consider using the standard version on mobile devices

## Browser Support

- **Modern Browsers**: Full support with all features
- **IE11**: Basic functionality (no smooth scrolling)
- **Mobile Safari**: Full support with touch optimizations
- **Android Chrome**: Full support

## Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and CORS settings
2. **Animations not working**: Verify `prefers-reduced-motion` setting
3. **Keyboard nav not working**: Ensure sections are properly focused
4. **Performance issues**: Reduce number of sections or disable features

### Debug Mode
```javascript
// Enable console logging
scrollSystem.init({
  debug: true // Add this for detailed logging
});
```

## Integration Examples

### With React
```jsx
import { useEffect, useRef } from 'react';
import AdvancedScrollingSystem from './scrolling-system.js';

function App() {
  const scrollSystemRef = useRef();

  useEffect(() => {
    scrollSystemRef.current = new AdvancedScrollingSystem();
    scrollSystemRef.current.init();

    return () => {
      scrollSystemRef.current?.destroy();
    };
  }, []);

  return (
    <div>
      <section data-scroll-section>
        <h1 data-scroll-text>React Integration</h1>
      </section>
    </div>
  );
}
```

### With Vue
```vue
<template>
  <div>
    <section data-scroll-section>
      <h1 data-scroll-text>Vue Integration</h1>
    </section>
  </div>
</template>

<script>
import AdvancedScrollingSystem from './scrolling-system.js';

export default {
  mounted() {
    this.scrollSystem = new AdvancedScrollingSystem();
    this.scrollSystem.init();
  },
  beforeDestroy() {
    this.scrollSystem?.destroy();
  }
}
</script>
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use in personal and commercial projects.

---

For more advanced use cases and examples, check the `examples/` directory in the repository.