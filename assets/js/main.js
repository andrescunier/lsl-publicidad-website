/**
 * LSL Publicidad - Main JavaScript File
 * Modern interactive functionality
 */

(function() {
    'use strict';
    
    // Utility function for smooth scrolling
    function smoothScrollTo(target, duration = 1000) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop - 80; // Account for fixed header
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Initialize AOS (Animate on Scroll)
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 100
            });
        }
    }
    
    // Header functionality
    function initHeader() {
        const header = document.getElementById('header');
        const navbarToggle = document.getElementById('navbar-toggle');
        const navbarMenu = document.getElementById('navbar-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Header scroll effect
        let lastScrollTop = 0;
        
        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }
        
        // Mobile menu toggle
        function toggleMobileMenu() {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = navbarToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navbarToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        }
        
        // Smooth scrolling for navigation links
        function handleNavClick(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
                
                // Close mobile menu if open
                if (navbarMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                // Update active nav item
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        }
        
        // Active nav item on scroll
        function updateActiveNav() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        // Event listeners
        window.addEventListener('scroll', () => {
            handleScroll();
            updateActiveNav();
        });
        
        navbarToggle.addEventListener('click', toggleMobileMenu);
        navLinks.forEach(link => link.addEventListener('click', handleNavClick));
    }
    
    // Hero slider functionality
    function initHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.hero-prev');
        const nextBtn = document.querySelector('.hero-next');
        let currentSlide = 0;
        let slideInterval;
        
        if (slides.length === 0) return;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            // Update background image for current slide
            const currentSlideElement = slides[index];
            const bgImage = currentSlideElement.getAttribute('data-bg');
            if (bgImage) {
                currentSlideElement.style.backgroundImage = `url(${bgImage})`;
            }
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopAutoSlide();
                startAutoSlide();
            });
        });
        
        // Initialize
        showSlide(currentSlide);
        startAutoSlide();
        
        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopAutoSlide);
            heroSection.addEventListener('mouseleave', startAutoSlide);
        }
    }
    
    // Portfolio filter functionality
    function initPortfolioFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (filterBtns.length === 0) return;
        
        function filterItems(filterValue) {
            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter items
                filterItems(filterValue);
            });
        });
    }
    
    // Contact form functionality
    function initContactForm() {
        const forms = document.querySelectorAll('form[data-webhook]');
        
        if (!forms.length) return;
        
        const defaultSuccessMessage = '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.';
        const defaultErrorMessage = 'No pudimos enviar el mensaje. Inténtalo nuevamente en unos minutos.';
        
        function showMessage(form, message, type = 'success') {
            const existingMsg = form.querySelector('.form-message');
            if (existingMsg) {
                existingMsg.remove();
            }
            
            if (!message) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-message ${type}`;
            messageDiv.textContent = message;
            messageDiv.style.cssText = `
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
                text-align: center;
                font-weight: 500;
                ${type === 'success' ? 
                    'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                    'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
                }
            `;
            
            form.insertBefore(messageDiv, form.firstChild);
            
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
        
        forms.forEach(form => {
            const webhookUrl = form.getAttribute('data-webhook');
            if (!webhookUrl) return;
            
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                
                showMessage(form);
                
                const submitBtn = form.querySelector('[type="submit"]');
                const originalBtnText = submitBtn ? submitBtn.textContent : '';
                const loadingText = submitBtn ? submitBtn.getAttribute('data-loading-text') || 'Enviando...' : '';
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = loadingText;
                }
                
                const formData = new FormData(form);
                const payload = {};
                
                formData.forEach((value, key) => {
                    const normalizedValue = typeof value === 'string' ? value.trim() : value;
                    
                    if (key in payload) {
                        const current = payload[key];
                        payload[key] = Array.isArray(current) ? [...current, normalizedValue] : [current, normalizedValue];
                    } else {
                        payload[key] = normalizedValue;
                    }
                });
                
                if (form.dataset.source) {
                    payload.source = form.dataset.source;
                }
                
                payload.page_url = window.location.href;
                payload.submitted_at = new Date().toISOString();
                
                const successMessage = form.getAttribute('data-success-message') || defaultSuccessMessage;
                const errorMessage = form.getAttribute('data-error-message') || defaultErrorMessage;
                
                try {
                    const response = await fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    
                    if (!response.ok) {
                        showMessage(form, `${errorMessage} (Error ${response.status})`, 'error');
                        return;
                    }
                    
                    showMessage(form, successMessage, 'success');
                    form.reset();
                } catch (error) {
                    console.error('Error al enviar el formulario:', error);
                    showMessage(form, errorMessage, 'error');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText || 'Enviar';
                    }
                }
            });
        });
    }
    
    // Back to top button
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) return;
        
        function toggleBackToTop() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
        
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        window.addEventListener('scroll', toggleBackToTop);
        backToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Service cards hover effect
    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Parallax effect for hero section
    function initParallax() {
        const hero = document.querySelector('.hero');
        
        if (!hero) return;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        window.addEventListener('scroll', updateParallax);
    }
    
    // Counter animation for statistics
    function initCounters() {
        const counters = document.querySelectorAll('.feature-number');
        
        function animateCounter(counter) {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 20);
        }
        
        // Intersection Observer to trigger counters when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Loading screen (optional)
    function initLoadingScreen() {
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loading-screen');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        });
    }
    
    // Initialize all functionality when DOM is ready
    function init() {
        initAOS();
        initHeader();
        initHeroSlider();
        initPortfolioFilter();
        initContactForm();
        initBackToTop();
        initServiceCards();
        initParallax();
        initCounters();
        initLoadingScreen();
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
        
        console.log('LSL Publicidad website initialized successfully!');
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Recalculate any size-dependent functionality
        const navbarMenu = document.getElementById('navbar-menu');
        if (window.innerWidth > 768 && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            document.getElementById('navbar-toggle').classList.remove('active');
        }
    });
    
})();