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
    // Shared Birthday Quiz using Netlify Function
    const QUIZ_API = '/.netlify/functions/quiz';
    let quizQuestions = [];
    async function loadQuizQuestions() {
        const res = await fetch(QUIZ_API);
        quizQuestions = await res.json();
    }
    async function addQuizQuestion(q, a) {
        await fetch(QUIZ_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q, a })
        });
        await loadQuizQuestions();
    }
    const addQuizQBtn = document.getElementById('add-quiz-q');
    if (addQuizQBtn) {
        addQuizQBtn.addEventListener('click', async () => {
            const q = document.getElementById('new-quiz-q').value.trim();
            const a = document.getElementById('new-quiz-a').value.trim();
            if (q && a) {
                await addQuizQuestion(q, a);
                document.getElementById('new-quiz-q').value = '';
                document.getElementById('new-quiz-a').value = '';
            }
        });
    }
    // Shared Memory Puzzle using Netlify Function
    const PUZZLE_API = '/.netlify/functions/memorypuzzles';
    let memoryQuestions = [];
    async function loadMemoryPuzzles() {
        const res = await fetch(PUZZLE_API);
        memoryQuestions = await res.json();
    }
    async function addMemoryPuzzle(story, answer) {
        await fetch(PUZZLE_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ story, answer })
        });
        await loadMemoryPuzzles();
    }
    const addPuzzleBtn = document.getElementById('add-puzzle');
    if (addPuzzleBtn) {
        addPuzzleBtn.addEventListener('click', async () => {
            const story = document.getElementById('new-puzzle-story').value.trim();
            const answer = document.getElementById('new-puzzle-answer').value.trim();
            if (story && answer) {
                await addMemoryPuzzle(story, answer);
                document.getElementById('new-puzzle-story').value = '';
                document.getElementById('new-puzzle-answer').value = '';
            }
        });
    }
    // Update quiz and memory games to use shared data
    async function showQuiz() {
        await loadQuizQuestions();
        let current = 0;
        let score = 0;
        quizBtn.addEventListener('click', () => {
            quizBtn.style.display = 'none';
            quizArea.style.display = 'block';
            showQuestion();
        });
        function showQuestion() {
            if (current < quizQuestions.length) {
                quizArea.innerHTML = `<p>${quizQuestions[current].q}</p><input type='text' id='quiz-answer' class='memory-input'><button id='submit-answer' class='btn'>Submit</button>`;
                document.getElementById('submit-answer').onclick = () => {
                    const userAns = document.getElementById('quiz-answer').value.trim().toLowerCase();
                    if (userAns === quizQuestions[current].a.toLowerCase()) {
                        score++;
                    }
                    current++;
                    showQuestion();
                };
            } else {
                quizArea.innerHTML = `<p>Quiz complete! You scored ${score} out of ${quizQuestions.length} 🎉</p><button id='reset-score' class='btn'>Reset Score</button>`;
                document.getElementById('reset-score').onclick = () => {
                    score = 0;
                    quizBtn.style.display = '';
                    quizArea.style.display = 'none';
                };
            }
        }
    }
    if (quizBtn && quizArea) showQuiz();
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
    async function loadMemoryPuzzles() {
        const res = await fetch(PUZZLE_API);
        memoryQuestions = await res.json();
    }
    async function showMemoryGame() {
        await loadMemoryPuzzles();
        let memCurrent = 0, memScore = 0;
        function showMemoryQuestion() {
            if (memCurrent < memoryQuestions.length) {
                memoryGameArea.innerHTML = `<p>${memoryQuestions[memCurrent].story}</p><input type='text' id='mem-answer' class='memory-input' placeholder='Your answer...'><button id='mem-submit' class='btn'>Submit</button>`;
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
        showMemoryQuestion();
    }
    if (memoryGameArea) showMemoryGame();
    // Shared Memory Wall using Netlify Function
    const memoryBtn = document.getElementById('add-memory');
    const memoryInput = document.getElementById('memory-input');
    const memoryList = document.getElementById('memory-list');
    const MEM_API = '/.netlify/functions/memories';
    async function loadMemoriesShared() {
        const res = await fetch(MEM_API);
        const memories = await res.json();
        memoryList.innerHTML = '';
        memories.forEach(val => {
            const li = document.createElement('li');
            li.textContent = val;
            memoryList.appendChild(li);
        });
    }
    if (memoryBtn && memoryInput && memoryList) {
        loadMemoriesShared();
        memoryBtn.addEventListener('click', async () => {
            const val = memoryInput.value.trim();
            if (val) {
                await fetch(MEM_API, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ memory: val })
                });
                memoryInput.value = '';
            }
        });
        setInterval(loadMemoriesShared, 3000); // Poll every 3 seconds
    }
});