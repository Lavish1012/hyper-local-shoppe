import { useEffect, useRef } from 'react';
import AdvancedScrollingSystem from '@/lib/scrolling-system.js';

interface ScrollingSystemOptions {
  sectionSelector?: string;
  imageAttribute?: string;
  mobileImageAttribute?: string;
  textSelector?: string;
  progressSelector?: string;
  chevronSelector?: string;
  enableKeyboardNav?: boolean;
  enableProgressIndicator?: boolean;
  enableImageCrossfade?: boolean;
  enableTextAnimation?: boolean;
  animationDuration?: number;
  staggerDelay?: number;
  preloadAdjacent?: boolean;
}

export const useScrollingSystem = (options: ScrollingSystemOptions = {}) => {
  const scrollSystemRef = useRef<AdvancedScrollingSystem | null>(null);

  useEffect(() => {
    // Initialize the scrolling system
    scrollSystemRef.current = new AdvancedScrollingSystem();
    scrollSystemRef.current.init({
      sectionSelector: '[data-scroll-section]',
      textSelector: '[data-scroll-text]',
      enableKeyboardNav: true,
      enableProgressIndicator: true,
      enableImageCrossfade: true,
      enableTextAnimation: true,
      animationDuration: 800,
      staggerDelay: 150,
      preloadAdjacent: true,
      ...options
    });

    // Cleanup on unmount
    return () => {
      if (scrollSystemRef.current) {
        scrollSystemRef.current.destroy();
        scrollSystemRef.current = null;
      }
    };
  }, []);

  return {
    scrollSystem: scrollSystemRef.current,
    scrollToSection: (index: number, smooth = true) => {
      scrollSystemRef.current?.scrollToSection(index, smooth);
    },
    getCurrentSection: () => {
      return scrollSystemRef.current?.getCurrentSection() ?? 0;
    },
    getSections: () => {
      return scrollSystemRef.current?.getSections() ?? [];
    }
  };
};