document.addEventListener('DOMContentLoaded', () => {
    // Fade-in effect for sections
    const sections = document.querySelectorAll('section');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        sections.forEach(sec => {
            const boxTop = sec.getBoundingClientRect().top;
            if(boxTop < triggerBottom) {
                sec.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Glamorous entrance for cards and gallery items
    const animatedItems = document.querySelectorAll('.post-card, .gallery-grid figure');
    const animateItems = () => {
        animatedItems.forEach((item, i) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, 200 + i * 120);
        });
    };
    animatedItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px) scale(0.97)';
    });
    setTimeout(animateItems, 400);

    // Header shadow on scroll
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Parallax effect for hero image
    const heroImg = document.querySelector('.hero-img');
    if(heroImg) {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY * 0.15;
            heroImg.style.transform = `translateY(${offset}px) scale(1.02)`;
        });
    }

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    if(navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('open');
        });
    }
});