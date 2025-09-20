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

    // Birthday Quiz functionality with persistent score
    const quizBtn = document.getElementById('start-quiz');
    const quizArea = document.getElementById('quiz-area');
    const QUIZ_SCORE_KEY = 'snehal_quiz_score';
    if (quizBtn && quizArea) {
        const questions = [
            { q: "What is Snehal's favorite hobby?", a: "Reading books" },
            { q: "Which city was Snehal born in?", a: "Nagpur" },
            { q: "Snehal's favorite color?", a: "Lavender" },
            { q: "What is Snehal's go-to comfort food?", a: "Khichdi" },
            { q: "Snehal's favorite festival?", a: "All" }
        ];
        let current = 0;
        let score = Number(localStorage.getItem(QUIZ_SCORE_KEY)) || 0;
        function showScore() {
            quizArea.innerHTML = `<p>Quiz complete! You scored ${score} out of ${questions.length} 🎉</p><button id='reset-score' class='btn'>Reset Score</button>`;
            document.getElementById('reset-score').onclick = () => {
                score = 0;
                localStorage.setItem(QUIZ_SCORE_KEY, score);
                quizBtn.style.display = '';
                quizArea.style.display = 'none';
            };
        }
        quizBtn.addEventListener('click', () => {
            quizBtn.style.display = 'none';
            quizArea.style.display = 'block';
            current = 0;
            score = 0;
            showQuestion();
        });
        if (score > 0) {
            quizBtn.style.display = 'none';
            quizArea.style.display = 'block';
            showScore();
        }
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
                localStorage.setItem(QUIZ_SCORE_KEY, score);
                showScore();
            }
        }
    }
    // Memory Wall functionality with persistent memories
    const memoryBtn = document.getElementById('add-memory');
    const memoryInput = document.getElementById('memory-input');
    const memoryList = document.getElementById('memory-list');
    const MEMORY_KEY = 'snehal_memories';
    function loadMemories() {
        const memories = JSON.parse(localStorage.getItem(MEMORY_KEY) || '[]');
        memoryList.innerHTML = '';
        memories.forEach(val => {
            const li = document.createElement('li');
            li.textContent = val;
            memoryList.appendChild(li);
        });
    }
    if (memoryBtn && memoryInput && memoryList) {
        loadMemories();
        memoryBtn.addEventListener('click', () => {
            const val = memoryInput.value.trim();
            if (val) {
                const memories = JSON.parse(localStorage.getItem(MEMORY_KEY) || '[]');
                memories.push(val);
                localStorage.setItem(MEMORY_KEY, JSON.stringify(memories));
                loadMemories();
                memoryInput.value = '';
            }
        });
    }

    // Birthday Bingo functionality
    const bingoItems = [
        "Snehal's favorite book", "Family trip to Goa", "Diwali celebration", "Homemade khichdi", "Lavender saree", "Spiritual retreat", "Laughing with friends", "Cooking for family", "Childhood story", "Helping a neighbor", "Birthday cake", "Favorite festival", "Memorable advice", "Garden walk", "Listening to music", "Sharing wisdom"
    ];
    const bingoBoard = document.getElementById('bingo-board');
    if (bingoBoard) {
        let board = '';
        bingoItems.forEach((item, i) => {
            board += `<div class='bingo-cell' data-idx='${i}'>${item}</div>`;
        });
        bingoBoard.innerHTML = board;
        bingoBoard.style.display = 'grid';
        bingoBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
        bingoBoard.style.gap = '8px';
        document.querySelectorAll('.bingo-cell').forEach(cell => {
            cell.onclick = () => {
                cell.classList.toggle('marked');
            };
        });
    }
    // Guess the Memory functionality
    const memoryGameArea = document.getElementById('memory-game-area');
    const memoryQuestions = [
        { story: "Snehal wore her favorite lavender saree and cooked khichdi for everyone. Which year was this?", answer: "2022" },
        { story: "The family trip to Goa was filled with laughter and beach walks. Which event was this?", answer: "Family Vacation" },
        { story: "Snehal gave memorable advice during Diwali. What was the advice about?", answer: "Gratitude" }
    ];
    let memCurrent = 0, memScore = 0;
    function showMemoryQuestion() {
        if (memCurrent < memoryQuestions.length) {
            memoryGameArea.innerHTML = `<p>${memoryQuestions[memCurrent].story}</p><input type='text' id='mem-answer' class='memory-input'><button id='mem-submit' class='btn'>Submit</button>`;
            document.getElementById('mem-submit').onclick = () => {
                const userAns = document.getElementById('mem-answer').value.trim().toLowerCase();
                if (userAns === memoryQuestions[memCurrent].answer.toLowerCase()) {
                    memScore++;
                }
                memCurrent++;
                showMemoryQuestion();
            };
        } else {
            memoryGameArea.innerHTML = `<p>Game complete! You scored ${memScore} out of ${memoryQuestions.length} 🎉</p>`;
        }
    }
    if (memoryGameArea) {
        showMemoryQuestion();
    }
});