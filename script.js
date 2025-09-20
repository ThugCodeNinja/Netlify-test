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

    // Gallery modal/lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-img');
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');

    if (galleryImages.length && modal && modalImg && closeModal) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = img.src;
                modalCaption.textContent = img.alt;
            });
        });
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Birthday Quiz functionality
    const quizBtn = document.getElementById('start-quiz');
    const quizArea = document.getElementById('quiz-area');
    if (quizBtn && quizArea) {
        const questions = [
            { q: "What is Snehal's favorite hobby?", a: "Reading spiritual books" },
            { q: "Which city was Snehal born in?", a: "Pune" },
            { q: "Snehal's favorite color?", a: "Lavender" },
            { q: "What is Snehal's go-to comfort food?", a: "Homemade khichdi" },
            { q: "Snehal's favorite festival?", a: "Diwali" }
        ];
        let current = 0;
        let score = 0;
        quizBtn.addEventListener('click', () => {
            quizBtn.style.display = 'none';
            quizArea.style.display = 'block';
            showQuestion();
        });
        function showQuestion() {
            if (current < questions.length) {
                quizArea.innerHTML = `<p>${questions[current].q}</p><input type='text' id='quiz-answer' class='memory-input'><button id='submit-answer' class='btn'>Submit</button>`;
                document.getElementById('submit-answer').onclick = () => {
                    const userAns = document.getElementById('quiz-answer').value.trim().toLowerCase();
                    if (userAns === questions[current].a.toLowerCase()) {
                        score++;
                    }
                    current++;
                    showQuestion();
                };
            } else {
                quizArea.innerHTML = `<p>Quiz complete! You scored ${score} out of ${questions.length} 🎉</p>`;
            }
        }
    }
    // Memory Wall functionality
    const memoryBtn = document.getElementById('add-memory');
    const memoryInput = document.getElementById('memory-input');
    const memoryList = document.getElementById('memory-list');
    if (memoryBtn && memoryInput && memoryList) {
        memoryBtn.addEventListener('click', () => {
            const val = memoryInput.value.trim();
            if (val) {
                const li = document.createElement('li');
                li.textContent = val;
                memoryList.appendChild(li);
                memoryInput.value = '';
            }
        });
    }
});