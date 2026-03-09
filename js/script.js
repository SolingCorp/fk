// ===== PREMIUM SMOOTH SCROLL (LENIS) =====
const lenis = new Lenis({
    duration: 1.2, /* Controls the "weight" of the scroll. Higher = slower/heavier */
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), /* Premium easing curve */
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false, /* Keep native scrolling on mobile phones for better UX */
    touchMultiplier: 2,
});

// Hook into the browser's animation frame to run the smooth scrolling
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on('scroll', (e) => {
});

// ===== SCROLL REVEAL ANIMATIONS =====
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.15,
});

reveals.forEach((reveal) => revealObserver.observe(reveal));

// --- Mobile Menu Drawer Logic ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Navigation scroll effect
const nav = document.getElementById('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
}, {
    passive: true
});



// Hero parallax effect
const heroContent = document.querySelector('.hero-content');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        const opacity = 1 - (progress * 1.5);
        const translateY = scrollY * 0.3;
        const blur = progress * 10;

        heroContent.style.opacity = Math.max(0, opacity);
        heroContent.style.transform = `translateY(${translateY}px)`;
        heroContent.style.filter = `blur(${blur}px)`;
    }
}, {
    passive: true
});

// Team Gallery - Depth Scroll Effect
const scrollTrack = document.getElementById('depth-section');
const centerContent = document.getElementById('center-content');
const images = document.querySelectorAll('.gallery-image');

// Total virtual distance the camera travels on the Z-axis
const totalZTravel = 10000;

window.addEventListener('scroll', () => {
    const rect = scrollTrack.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Progress from 0 to 1
    let progress = -rect.top / (rect.height - viewportHeight);
    progress = Math.max(0, Math.min(1, progress));

    // --- 1. Animate Center Text & Button ---
    // Fades in between 2% and 10% of the scroll
    window.addEventListener('scroll', () => {
        const rect = scrollTrack.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // 0 = Start of gallery, 1 = End of gallery
        let progress = -rect.top / (rect.height - viewportHeight);
        progress = Math.max(0, Math.min(1, progress));

        // --- REFINED TEXT FADE LOGIC ---
        let textOpacity = 0;
        let textY = 20; // Default starting position (slightly lower)

        // Phase 1: Fade In (0% to 20% scroll)
        if (progress > 0 && progress <= 0.2) {
            textOpacity = progress / 0.2;
        }
        // Phase 2: Stay Solid (20% to 75% scroll)
        else if (progress > 0.2 && progress <= 0.65) {
            textOpacity = 1;
        }
        // Phase 3: Fade Out (65% to 95% scroll)
        else if (progress > 0.65 && progress <= 0.95) {
            // Calculate how far we are into the "Exit Zone" (0 to 1)
            const exitProgress = (progress - 0.65) / 0.2;
            textOpacity = 1 - exitProgress;
            textY = -(exitProgress * 30); // Gently drifts upward as it fades
        }

        centerContent.style.opacity = textOpacity;
        centerContent.style.transform = `translateY(${textY}px)`;

    });

    // --- 2. Animate Images Sequentially ---
    const scrolledZ = progress * totalZTravel;

    images.forEach(img => {
        const zStart = parseFloat(img.getAttribute('data-z'));
        const currentZ = zStart + scrolledZ;

        // Opacity logic:
        let opacity = 0;
        if (currentZ > -3000 && currentZ < 3000) {
            if (currentZ < 0) {
                opacity = 1 - (Math.abs(currentZ) / 3000); // fade in
            } else {
                opacity = 1 - (currentZ / 3000); // fade out fast as it passes screen
            }
        }

        // Blur logic:
        // - Maximum blur far away, sharpens to 0 blur right as it hits the screen
        let blur = 0;
        if (currentZ < 0) {
            blur = Math.abs(currentZ) / 200;
        }

        img.style.transform = `translateZ(${currentZ}px)`;
        img.style.opacity = Math.max(0, opacity);
        img.style.filter = `blur(${Math.max(0, blur)}px)`;
    });
});

// Trigger on load
window.dispatchEvent(new Event('scroll'));

// Easing function for smoother animation
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Use Intersection Observer for better performance
const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            window.addEventListener('scroll', updateTeamGallery, {
                passive: true
            });
            updateTeamGallery();
        } else {
            window.removeEventListener('scroll', updateTeamGallery);
        }
    });
}, {
    threshold: 0,
    rootMargin: '100px'
});

teamObserver.observe(teamSection);

// Initialize gallery on load
updateTeamGallery();

// Product Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const showcaseContents = document.querySelectorAll('.showcase-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        // Update active states
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        showcaseContents.forEach(content => {
            content.classList.remove('active');
            if (content.dataset.content === tab) {
                content.classList.add('active');
            }
        });
    });
});

// Accessibility Toggle
const accessibilityToggle = document.getElementById('accessibilityToggle');
const toggleStatus = accessibilityToggle.querySelector('.toggle-status');

accessibilityToggle.addEventListener('click', () => {
    document.body.classList.toggle('accessibility-mode');
    accessibilityToggle.classList.toggle('active');

    if (document.body.classList.contains('accessibility-mode')) {
        toggleStatus.textContent = 'On';
    } else {
        toggleStatus.textContent = 'Off';
    }
});

// Smooth scroll for anchor links
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

// Add hover effects to news cards
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll handlers
const throttledTeamUpdate = throttle(updateTeamGallery, 16);

// Re-attach throttled handler
window.removeEventListener('scroll', updateTeamGallery);
teamObserver.disconnect();

const throttledTeamObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            window.addEventListener('scroll', throttledTeamUpdate, {
                passive: true
            });
            throttledTeamUpdate();
        } else {
            window.removeEventListener('scroll', throttledTeamUpdate);
        }
    });
}, {
    threshold: 0,
    rootMargin: '100px'
});

throttledTeamObserver.observe(teamSection);

// Fix the IntersectionObserver error
const teamSectionElement = document.getElementById('team') || document.querySelector('.team-section');
if (teamSectionElement && typeof throttledTeamObserver !== 'undefined') {
    throttledTeamObserver.observe(teamSectionElement);
}