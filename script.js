/* =====================================================
   DOCTOR'S WEBSITE - PREMIUM JAVASCRIPT
   Enhanced Animations & Interactive Features
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // =====================================================
    // PRELOADER ANIMATION
    // =====================================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations after load
        setTimeout(() => {
            document.querySelectorAll('[data-aos]').forEach(el => {
                if (isInViewport(el)) {
                    el.classList.add('aos-animate');
                }
            });
        }, 100);
    });

    // =====================================================
    // MOBILE NAVIGATION WITH SMOOTH ANIMATIONS
    // =====================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 199;
    `;
    document.body.appendChild(overlay);
    
    function toggleMenu() {
        const isOpen = navMenu.classList.contains('active');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isOpen);
        
        if (!isOpen) {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            body.style.overflow = 'hidden';
            
            // Animate nav links
            navLinks.forEach((link, index) => {
                link.style.transitionDelay = `${index * 50 + 200}ms`;
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            });
        } else {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            body.style.overflow = '';
            
            navLinks.forEach(link => {
                link.style.transitionDelay = '0ms';
                link.style.opacity = '';
                link.style.transform = '';
            });
        }
    }
    
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // =====================================================
    // STICKY HEADER WITH HIDE ON SCROLL DOWN
    // =====================================================
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for shadow
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // =====================================================
    // ACTIVE NAVIGATION LINK - INTERSECTION OBSERVER
    // =====================================================
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));

    // =====================================================
    // SMOOTH SCROLLING WITH EASING
    // =====================================================
    function smoothScrollTo(target, duration = 1000) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeOutExpo(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                smoothScrollTo(targetElement);
            }
        });
    });

    // =====================================================
    // BACK TO TOP BUTTON WITH PROGRESS
    // =====================================================
    const backToTopBtn = document.getElementById('back-to-top');
    
    function updateBackToTop() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.scrollY / scrollHeight) * 100;
        
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    
    backToTopBtn.addEventListener('click', () => {
        smoothScrollTo(document.body, 800);
    });

    // =====================================================
    // SCROLL ANIMATIONS (Enhanced AOS-like)
    // =====================================================
    function isInViewport(element, offset = 0.15) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * (1 - offset);
    }
    
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                const delay = element.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }
    
    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            checkAnimations();
            scrollTimeout = null;
        }, 50);
    }, { passive: true });
    
    checkAnimations();

    // =====================================================
    // TESTIMONIALS SLIDER - ENHANCED
    // =====================================================
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (testimonialTrack && testimonialCards.length > 0) {
        let currentIndex = 0;
        let cardsPerView = getCardsPerView();
        let totalSlides = Math.ceil(testimonialCards.length / cardsPerView);
        let isAnimating = false;
        let autoSlideInterval;
        let touchStartX = 0;
        let touchEndX = 0;
        
        function getCardsPerView() {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1024) return 2;
            return 3;
        }
        
        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    if (!isAnimating) goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateSlider() {
            if (isAnimating) return;
            isAnimating = true;
            
            const cardWidth = testimonialCards[0].offsetWidth;
            const gap = 24;
            const offset = currentIndex * (cardWidth + gap) * cardsPerView;
            
            testimonialTrack.style.transform = `translateX(-${offset}px)`;
            
            // Update dots
            document.querySelectorAll('.testimonial-dots .dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
            
            // Reset animation flag
            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }
        
        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex < 0) currentIndex = totalSlides - 1;
            if (currentIndex >= totalSlides) currentIndex = 0;
            updateSlider();
            resetAutoSlide();
        }
        
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => goToSlide(currentIndex + 1), 6000);
        }
        
        // Event listeners
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        
        // Touch support
        testimonialTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        testimonialTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(currentIndex - 1);
                }
            }
        }, { passive: true });
        
        // Pause on hover
        testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        testimonialTrack.addEventListener('mouseleave', resetAutoSlide);
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = getCardsPerView();
                if (newCardsPerView !== cardsPerView) {
                    cardsPerView = newCardsPerView;
                    totalSlides = Math.ceil(testimonialCards.length / cardsPerView);
                    currentIndex = 0;
                    createDots();
                    updateSlider();
                }
            }, 250);
        });
        
        // Initialize
        createDots();
        resetAutoSlide();
    }

    // =====================================================
    // FAQ ACCORDION - SMOOTH ANIMATIONS
    // =====================================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items with animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
            }
        });
    });

    // =====================================================
    // GALLERY LIGHTBOX - ENHANCED
    // =====================================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const galleryImages = [];
    
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-title');
        
        galleryImages.push({
            src: img.src,
            alt: img.alt,
            title: title ? title.textContent : ''
        });
        
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        const image = galleryImages[currentImageIndex];
        
        // Preload image
        const preloadImg = new Image();
        preloadImg.onload = () => {
            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
            lightboxCaption.textContent = image.title;
        };
        preloadImg.src = image.src;
        
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
        
        // Preload adjacent images
        preloadAdjacentImages();
    }
    
    function preloadAdjacentImages() {
        const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        const nextIndex = (currentImageIndex + 1) % galleryImages.length;
        
        new Image().src = galleryImages[prevIndex].src;
        new Image().src = galleryImages[nextIndex].src;
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        openLightbox();
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox();
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape': closeLightbox(); break;
            case 'ArrowRight': showNextImage(); break;
            case 'ArrowLeft': showPrevImage(); break;
        }
    });

    // =====================================================
    // FORM HANDLING WITH VALIDATION ANIMATIONS
    // =====================================================
    const appointmentForm = document.getElementById('appointment-form');
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    
    // Set minimum date for appointment
    const appointmentDateInput = document.getElementById('appointment-date');
    if (appointmentDateInput) {
        const today = new Date().toISOString().split('T')[0];
        appointmentDateInput.setAttribute('min', today);
    }
    
    // Enhanced form validation
    function validateField(field) {
        const isValid = field.checkValidity();
        const formGroup = field.closest('.form-group');
        
        if (!isValid) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            
            // Shake animation
            field.style.animation = 'shake 0.5s ease';
            setTimeout(() => field.style.animation = '', 500);
        } else {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        }
        
        return isValid;
    }
    
    // Add shake animation
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-5px); }
            40% { transform: translateX(5px); }
            60% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
        }
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
        }
        .form-group.success input,
        .form-group.success select,
        .form-group.success textarea {
            border-color: #10b981 !important;
        }
    `;
    document.head.appendChild(shakeStyle);
    
    function handleFormSubmit(form, e) {
        e.preventDefault();
        
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            // Focus first invalid field
            const firstError = form.querySelector('.form-group.error input, .form-group.error select, .form-group.error textarea');
            if (firstError) firstError.focus();
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '';
            form.reset();
            
            // Remove success states
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('success', 'error');
            });
            
            // Show success modal
            openModal();
        }, 2000);
    }
    
    function openModal() {
        successModal.classList.add('active');
        successModal.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        successModal.classList.remove('active');
        successModal.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
    }
    
    // Real-time validation
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.closest('.form-group').classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => handleFormSubmit(appointmentForm, e));
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(contactForm, e));
    }
    
    modalCloseBtn.addEventListener('click', closeModal);
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeModal();
    });

    // =====================================================
    // ANIMATED COUNTERS
    // =====================================================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;
    
    function animateCounter(counter, target, suffix) {
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out expo
            const easeProgress = 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(easeProgress * target);
            
            counter.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    function checkCounters() {
        if (countersAnimated) return;
        
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        if (isInViewport(statsSection, 0.3)) {
            countersAnimated = true;
            
            statNumbers.forEach(counter => {
                const text = counter.textContent;
                const target = parseInt(text.replace(/[^\d]/g, ''));
                const suffix = text.replace(/[\d]/g, '');
                
                counter.textContent = '0' + suffix;
                
                setTimeout(() => {
                    animateCounter(counter, target, suffix);
                }, 200);
            });
        }
    }
    
    window.addEventListener('scroll', checkCounters, { passive: true });
    checkCounters();

    // =====================================================
    // MAGNETIC BUTTONS EFFECT
    // =====================================================
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // =====================================================
    // PARALLAX EFFECT FOR HERO
    // =====================================================
    const heroImage = document.querySelector('.hero-image-wrapper');
    const heroBadge = document.querySelector('.hero-badge');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroSection = document.querySelector('.hero');
            
            if (scrollY < heroSection.offsetHeight) {
                heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
                if (heroBadge) {
                    heroBadge.style.transform = `translateY(${scrollY * -0.05}px)`;
                }
            }
        }, { passive: true });
    }

    // =====================================================
    // TILT EFFECT FOR CARDS
    // =====================================================
    const tiltCards = document.querySelectorAll('.feature-card, .service-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // =====================================================
    // CURSOR FOLLOWER (Optional - Premium Effect)
    // =====================================================
    // Uncomment to enable custom cursor
    /*
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);
    
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
        }
        .cursor-dot {
            width: 8px;
            height: 8px;
            background: var(--primary-600);
            border-radius: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        }
        .cursor-ring {
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-300);
            border-radius: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
            transition: all 0.15s ease-out;
            opacity: 0.5;
        }
        .custom-cursor.hover .cursor-ring {
            width: 60px;
            height: 60px;
            border-color: var(--primary-500);
            opacity: 0.8;
        }
    `;
    document.head.appendChild(cursorStyle);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    */

    // =====================================================
    // CURRENT YEAR IN FOOTER
    // =====================================================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // =====================================================
    // LAZY LOADING IMAGES WITH FADE
    // =====================================================
    const lazyImageStyle = document.createElement('style');
    lazyImageStyle.textContent = `
        img[loading="lazy"] {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        img[loading="lazy"].loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(lazyImageStyle);
    
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.addEventListener('load', () => img.classList.add('loaded'));
                    if (img.complete) img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // =====================================================
    // TEXT REVEAL ANIMATION
    // =====================================================
    const revealText = document.querySelectorAll('.hero-title, .section-title');
    
    revealText.forEach(text => {
        const words = text.innerHTML.split(' ');
        text.innerHTML = words.map((word, i) => 
            `<span style="display: inline-block; animation: fadeInUp 0.5s ease ${i * 0.1}s both;">${word}</span>`
        ).join(' ');
    });
    
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(revealStyle);

    // =====================================================
    // ESCAPE KEY HANDLER
    // =====================================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) toggleMenu();
            if (successModal.classList.contains('active')) closeModal();
            if (lightbox.classList.contains('active')) closeLightbox();
        }
    });

    // =====================================================
    // SMOOTH RESIZE HANDLER
    // =====================================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
    
    const resizeStyle = document.createElement('style');
    resizeStyle.textContent = `
        .resize-animation-stopper * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(resizeStyle);

    // =====================================================
    // CONSOLE BRANDING
    // =====================================================
    console.log(
        '%c 🏥 Dr. Tejaswini Penugondla ',
        'background: linear-gradient(135deg, #a82348, #85173a); color: white; font-size: 20px; padding: 15px 25px; border-radius: 10px; font-weight: bold;'
    );
    console.log(
        '%c Gynecologist • Srikara Hospitals, Lakdikapul • Built with ❤️ ',
        'color: #85173a; font-size: 14px; padding: 10px 0;'
    );
});

// =====================================================
// SERVICE WORKER REGISTRATION (PWA Ready)
// =====================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable offline support
        // navigator.serviceWorker.register('/sw.js');
    });
}
