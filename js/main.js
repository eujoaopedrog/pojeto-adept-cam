// GSAP Animations for ADEPT site
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins if needed (none needed for basic)
    gsap.registerPlugin();

    // Hero fade-in
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });
    gsap.from('.hero-content p', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4
    });
    gsap.from('.hero-content .whatsapp-btn', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
    });
    gsap.from('.hero-logo', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.8
    });

    // Enhanced category cards animation with stagger
    gsap.utils.toArray('.category-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 40,
            scale: 0.95,
            rotation: 2,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate steps on scroll
    gsap.utils.toArray('.steps li').forEach(step => {
        gsap.from(step, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Fade-in footer content
    gsap.from('.footer-content > *', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: 'footer',
            start: 'top bottom',
            toggleActions: 'play none none reverse'
        }
    });

    // Smooth scroll for anchor links (optional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize Swiper
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Add click function to WhatsApp buttons in carousel using event delegation
    document.querySelector('.banner-carousel').addEventListener('click', function(e) {
        const button = e.target.closest('.whatsapp-btn');
        if (button) {
            // Prevent default link behavior
            e.preventDefault();
            // Redirect to WhatsApp
            const whatsappUrl = 'https://wa.me/5511999999999';
            window.location.href = whatsappUrl;
        }
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const logoImg = document.querySelector('.logo');

    themeToggle.addEventListener('click', () => {
        // Add loading state
        themeToggle.classList.add('theme-toggle-loading');

        // Simulate a short delay for the loading animation
        setTimeout(() => {
            // Toggle dark mode
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');

            // Update logo
            logoImg.src = isDark ? 'assets/images/darkLogo.jpeg' : 'assets/images/originalLogo.jpeg';

            // Update button icon
            const icon = themeToggle.querySelector('.icon');
            icon.textContent = isDark ? '☀️' : '🌙';

            // Remove loading state
            themeToggle.classList.remove('theme-toggle-loading');
        }, 500); // 500ms delay for loading animation
    });

    // Initialize Locomotive Scroll for smooth parallax effects
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        class: 'is-reveal',
        resetNativeScroll: false,
        direction: 'vertical',
        gestureDirection: 'vertical',
        lerp: 0.1,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    // Update ScrollTrigger with Locomotive Scroll
    gsap.ticker.add((time)=>{
        ScrollTrigger.update();
    });

    // Tell ScrollLocator to use proxy scroll behavior
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        }
    });

    // Update Locomotive Scroll when ScrollTrigger updates
    ScrollTrigger.addEventListener("refresh", () => scroll.update());

    // Initialize ScrollTrigger after setting up the proxy
    ScrollTrigger.refresh();

    // Initialize VanillaTilt for 3D effect on cards
    VanillaTilt.init(document.querySelectorAll(".category-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });

    // Initialize Particles.js for background effect
    if (document.getElementById('particles-js')) {
        particlesJS.load('particles-js', 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.json', function() {
            console.log('Particles.js loaded');
        });
    }

    // Update Locomotive Scroll on resize
    window.addEventListener('resize', () => {
        scroll.update();
    });
});