// Global JavaScript for Formy House theme

// Utility functions
const utils = {
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
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
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Smooth scroll to element
  scrollToElement(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Scroll animations
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);
    this.init();
  }

  init() {
    // Observe elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
      this.observer.observe(element);
    });

    // Observe featured products section
    const featuredProducts = document.querySelector('.featured-products');
    if (featuredProducts) {
      this.observer.observe(featuredProducts);
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Add animation class
        if (element.dataset.aos) {
          element.classList.add('animate');
        }

        // Handle featured products section
        if (element.classList.contains('featured-products')) {
          this.animateFeaturedProducts(element);
        }

        // Stop observing once animated
        this.observer.unobserve(element);
      }
    });
  }

  animateFeaturedProducts(section) {
    const title = section.querySelector('.featured-products__title');
    const subtitle = section.querySelector('.featured-products__subtitle');
    const products = section.querySelectorAll('.featured-product');

    if (title) {
      setTimeout(() => title.classList.add('animate'), 100);
    }

    if (subtitle) {
      setTimeout(() => subtitle.classList.add('animate'), 300);
    }

    products.forEach((product, index) => {
      setTimeout(() => {
        product.classList.add('animate');
      }, 500 + (index * 100));
    });
  }
}

// Header scroll behavior
class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    if (!this.header) return;

    window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 100));
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      this.header.classList.add('header--scrolled');
    } else {
      this.header.classList.remove('header--scrolled');
    }

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      this.header.style.transform = 'translateY(-100%)';
    } else {
      this.header.style.transform = 'translateY(0)';
    }

    this.lastScrollY = currentScrollY;
  }
}

// Mobile menu
class MobileMenu {
  constructor() {
    this.menuToggle = document.querySelector('.header__menu-toggle');
    this.nav = document.querySelector('.header__nav');
    this.init();
  }

  init() {
    if (!this.menuToggle || !this.nav) return;

    this.menuToggle.addEventListener('click', this.toggleMenu.bind(this));
    
    // Close menu when clicking outside
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  toggleMenu() {
    this.menuToggle.classList.toggle('active');
    this.nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }

  handleOutsideClick(event) {
    if (!this.nav.contains(event.target) && !this.menuToggle.contains(event.target)) {
      this.menuToggle.classList.remove('active');
      this.nav.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }
}

// Product hover effects
class ProductHover {
  constructor() {
    this.products = document.querySelectorAll('.featured-product, .category-card');
    this.init();
  }

  init() {
    this.products.forEach(product => {
      product.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      product.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    });
  }

  handleMouseEnter(event) {
    const product = event.currentTarget;
    product.style.transform = 'translateY(-10px)';
    product.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
  }

  handleMouseLeave(event) {
    const product = event.currentTarget;
    product.style.transform = 'translateY(0)';
    product.style.boxShadow = 'none';
  }
}

// Lazy loading for images
class LazyLoading {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(this.handleIntersection.bind(this));
      this.images.forEach(img => imageObserver.observe(img));
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
      }
    });
  }
}

// Search functionality
class Search {
  constructor() {
    this.searchButton = document.querySelector('.header__search');
    this.searchModal = null;
    this.init();
  }

  init() {
    if (!this.searchButton) return;

    this.searchButton.addEventListener('click', this.openSearch.bind(this));
  }

  openSearch() {
    // Create search modal
    this.searchModal = document.createElement('div');
    this.searchModal.className = 'search-modal';
    this.searchModal.innerHTML = `
      <div class="search-modal__overlay">
        <div class="search-modal__content">
          <div class="search-modal__header">
            <h3>Search Products</h3>
            <button class="search-modal__close" aria-label="Close search">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="search-modal__body">
            <input type="text" class="search-modal__input" placeholder="Search for products..." autofocus>
            <div class="search-modal__results"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.searchModal);
    document.body.classList.add('search-open');

    // Add event listeners
    const closeButton = this.searchModal.querySelector('.search-modal__close');
    const overlay = this.searchModal.querySelector('.search-modal__overlay');
    const input = this.searchModal.querySelector('.search-modal__input');

    closeButton.addEventListener('click', this.closeSearch.bind(this));
    overlay.addEventListener('click', this.closeSearch.bind(this));
    input.addEventListener('input', utils.debounce(this.handleSearch.bind(this), 300));

    // Close on escape key
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  closeSearch() {
    if (this.searchModal) {
      document.body.removeChild(this.searchModal);
      document.body.classList.remove('search-open');
      this.searchModal = null;
    }
  }

  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.closeSearch();
    }
  }

  handleSearch(event) {
    const query = event.target.value;
    const resultsContainer = this.searchModal.querySelector('.search-modal__results');
    
    if (query.length < 2) {
      resultsContainer.innerHTML = '';
      return;
    }

    // Simulate search (replace with actual search implementation)
    resultsContainer.innerHTML = `
      <div class="search-result">
        <p>Searching for "${query}"...</p>
      </div>
    `;
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new ScrollAnimations();
  new HeaderScroll();
  new MobileMenu();
  new ProductHover();
  new LazyLoading();
  new Search();
});

// Handle window resize
window.addEventListener('resize', utils.debounce(function() {
  // Recalculate any size-dependent features
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.classList.add('page-hidden');
  } else {
    // Resume animations when page becomes visible
    document.body.classList.remove('page-hidden');
  }
});

// Export for use in other scripts
window.FormyHouse = {
  utils,
  ScrollAnimations,
  HeaderScroll,
  MobileMenu,
  ProductHover,
  LazyLoading,
  Search
};
