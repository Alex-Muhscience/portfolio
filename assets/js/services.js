/*
 * SERVICES SECTION JAVASCRIPT
 * 
 * This script handles the interactive behavior for the services section:
 * - Category filtering functionality
 * - Scroll-based reveal animations using IntersectionObserver
 * - Keyboard accessibility for filter buttons
 * - Responsive behavior and touch support
 * - Performance optimization with reduced motion support
 * 
 * FEATURES:
 * - Filter services by category with smooth transitions
 * - Reveal animations triggered on scroll
 * - Keyboard navigation (Enter/Space to activate filters)
 * - Touch-friendly mobile interactions
 * - Respects user preference for reduced motion
 * - No-results state handling
 * 
 * USAGE:
 * - Add data-category attributes to service cards
 * - Add data-filter attributes to filter buttons
 * - Include .reveal class for scroll animations
 * - Cards are automatically filtered and animated on load
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    selectors: {
      filterButtons: '.svc-filter',
      serviceCards: '.svc-card',
      revealElements: '.reveal',
      noResults: '#noResults'
    },
    classes: {
      activeFilter: 'is-active',
      visibleReveal: 'is-visible',
      hiddenCard: 'svc-card--hidden'
    },
    animation: {
      duration: 300,
      stagger: 100
    }
  };

  // State management
  let currentFilter = 'all';
  let observerInitialized = false;
  let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Initialize the services functionality when DOM is loaded
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupServices);
    } else {
      setupServices();
    }
  }

  /**
   * Main setup function
   */
  function setupServices() {
    try {
      setupFilters();
      setupRevealAnimations();
      setupAccessibility();
      setupResponsiveBehavior();
      
      // Show all cards initially
      filterServices('all', false);
      
      console.log('Services section initialized successfully');
    } catch (error) {
      console.error('Error initializing services section:', error);
    }
  }

  /**
   * Setup category filtering functionality
   */
  function setupFilters() {
    const filterButtons = document.querySelectorAll(CONFIG.selectors.filterButtons);
    
    filterButtons.forEach(button => {
      // Click event
      button.addEventListener('click', handleFilterClick);
      
      // Keyboard events
      button.addEventListener('keydown', handleFilterKeydown);
      
      // Touch events for mobile
      button.addEventListener('touchstart', handleFilterTouch, { passive: true });
    });
  }

  /**
   * Handle filter button clicks
   */
  function handleFilterClick(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const filter = button.getAttribute('data-filter');
    
    if (filter && filter !== currentFilter) {
      setActiveFilter(button);
      filterServices(filter);
    }
  }

  /**
   * Handle keyboard navigation for filter buttons
   */
  function handleFilterKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFilterClick(event);
    }
  }

  /**
   * Handle touch events for mobile interaction
   */
  function handleFilterTouch(event) {
    const button = event.currentTarget;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }

  /**
   * Set active filter button and update ARIA states
   */
  function setActiveFilter(activeButton) {
    const allButtons = document.querySelectorAll(CONFIG.selectors.filterButtons);
    
    allButtons.forEach(button => {
      const isActive = button === activeButton;
      button.classList.toggle(CONFIG.classes.activeFilter, isActive);
      button.setAttribute('aria-pressed', isActive.toString());
    });
    
    currentFilter = activeButton.getAttribute('data-filter');
  }

  /**
   * Filter services based on category
   */
  function filterServices(filter, animate = true) {
    const cards = document.querySelectorAll(CONFIG.selectors.serviceCards);
    const noResults = document.querySelector(CONFIG.selectors.noResults);
    let visibleCount = 0;
    let delay = 0;

    cards.forEach((card, index) => {
      const category = card.getAttribute('data-category');
      const shouldShow = filter === 'all' || category === filter;
      
      if (shouldShow) {
        showCard(card, animate ? delay : 0);
        visibleCount++;
        delay += CONFIG.animation.stagger;
      } else {
        hideCard(card);
      }
    });

    // Handle no results state
    if (noResults) {
      if (visibleCount === 0) {
        noResults.style.display = 'block';
        if (!prefersReducedMotion && animate) {
          noResults.style.opacity = '0';
          noResults.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            noResults.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            noResults.style.opacity = '1';
            noResults.style.transform = 'translateY(0)';
          }, 50);
        }
      } else {
        noResults.style.display = 'none';
      }
    }

    // Update URL hash for deep linking (optional)
    if (filter !== 'all') {
      history.replaceState(null, null, `#services-${filter}`);
    } else {
      history.replaceState(null, null, '#services');
    }
  }

  /**
   * Show a service card with animation
   */
  function showCard(card, delay = 0) {
    card.style.display = 'flex';
    card.classList.remove(CONFIG.classes.hiddenCard);
    
    if (!prefersReducedMotion && delay > 0) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.9)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, delay);
    }
  }

  /**
   * Hide a service card with animation
   */
  function hideCard(card) {
    if (!prefersReducedMotion) {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateY(-20px) scale(0.95)';
      
      setTimeout(() => {
        card.style.display = 'none';
        card.classList.add(CONFIG.classes.hiddenCard);
      }, CONFIG.animation.duration);
    } else {
      card.style.display = 'none';
      card.classList.add(CONFIG.classes.hiddenCard);
    }
  }

  /**
   * Setup scroll-based reveal animations
   */
  function setupRevealAnimations() {
    if (prefersReducedMotion || observerInitialized) return;

    const revealElements = document.querySelectorAll(CONFIG.selectors.revealElements);
    if (revealElements.length === 0) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(CONFIG.classes.visibleReveal);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(element => {
      observer.observe(element);
    });

    observerInitialized = true;
  }

  /**
   * Setup accessibility enhancements
   */
  function setupAccessibility() {
    // Add role and aria-label to filter container
    const filterContainer = document.querySelector('.svc-filters');
    if (filterContainer) {
      filterContainer.setAttribute('role', 'tablist');
      filterContainer.setAttribute('aria-label', 'Filter services by category');
    }

    // Add roles to filter buttons
    const filterButtons = document.querySelectorAll(CONFIG.selectors.filterButtons);
    filterButtons.forEach((button, index) => {
      button.setAttribute('role', 'tab');
      button.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });

    // Add role to services grid
    const servicesGrid = document.querySelector('.svc-grid');
    if (servicesGrid) {
      servicesGrid.setAttribute('role', 'tabpanel');
      servicesGrid.setAttribute('aria-live', 'polite');
      servicesGrid.setAttribute('aria-label', 'Services list');
    }

    // Handle arrow key navigation
    document.addEventListener('keydown', handleArrowNavigation);
  }

  /**
   * Handle arrow key navigation for filter buttons
   */
  function handleArrowNavigation(event) {
    const activeElement = document.activeElement;
    const filterButtons = Array.from(document.querySelectorAll(CONFIG.selectors.filterButtons));
    const currentIndex = filterButtons.indexOf(activeElement);

    if (currentIndex === -1) return;

    let nextIndex;
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : filterButtons.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = currentIndex < filterButtons.length - 1 ? currentIndex + 1 : 0;
        break;
      default:
        return;
    }

    // Update tabindex and focus
    filterButtons.forEach((button, index) => {
      button.setAttribute('tabindex', index === nextIndex ? '0' : '-1');
    });
    
    filterButtons[nextIndex].focus();
  }

  /**
   * Setup responsive behavior and mobile optimizations
   */
  function setupResponsiveBehavior() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Re-check reduced motion preference
        prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Refresh layout
        refreshLayout();
      }, 250);
    });

    // Handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(refreshLayout, 500);
    });

    // Setup touch scrolling for filter bar on mobile
    setupMobileFilterScrolling();
  }

  /**
   * Setup mobile filter scrolling behavior
   */
  function setupMobileFilterScrolling() {
    const filterContainer = document.querySelector('.svc-filters');
    if (!filterContainer) return;

    // Add momentum scrolling for iOS
    filterContainer.style.webkitOverflowScrolling = 'touch';
    
    // Smooth scroll to active filter on mobile
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const button = mutation.target;
          if (button.classList.contains(CONFIG.classes.activeFilter)) {
            scrollToActiveFilter(button);
          }
        }
      });
    });

    filterContainer.querySelectorAll(CONFIG.selectors.filterButtons).forEach(button => {
      observer.observe(button, { attributes: true });
    });
  }

  /**
   * Scroll active filter into view on mobile
   */
  function scrollToActiveFilter(activeButton) {
    if (window.innerWidth <= 768) {
      activeButton.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }

  /**
   * Refresh layout calculations
   */
  function refreshLayout() {
    // Force reflow to ensure proper layout
    const servicesGrid = document.querySelector('.svc-grid');
    if (servicesGrid) {
      servicesGrid.style.display = 'none';
      servicesGrid.offsetHeight; // Force reflow
      servicesGrid.style.display = '';
    }
  }

  /**
   * Public API for external usage
   */
  window.ServicesModule = {
    init,
    filterServices: (filter) => filterServices(filter, true),
    getCurrentFilter: () => currentFilter,
    refreshLayout
  };

  // Auto-initialize
  init();

  // Handle page visibility change to refresh animations
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !observerInitialized) {
      setupRevealAnimations();
    }
  });

  // Handle reduced motion preference changes
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addListener((e) => {
    prefersReducedMotion = e.matches;
    if (prefersReducedMotion) {
      // Remove all transitions
      const elements = document.querySelectorAll(`${CONFIG.selectors.serviceCards}, ${CONFIG.selectors.revealElements}`);
      elements.forEach(el => {
        el.style.transition = 'none';
      });
    }
  });

})();
