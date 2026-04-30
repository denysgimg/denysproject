// Бургер-меню
const burgerIcon = document.getElementById('burgerIcon');
const menuList = document.getElementById('menuList');

burgerIcon.addEventListener('click', () => {
    menuList.classList.toggle('active');
});

// Таймер зворотного відліку
const weddingDate = new Date(2026, 7, 31, 12, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "<h2>Свято розпочалося!</h2>";
    }
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();
// --- Ініціалізація Swiper для відгуків ---
const swiper = new Swiper('.wishes-swiper', {
    loop: true, // Безкінечна прокрутка
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 5000, // Автоматичне перегортання кожні 5 секунд
    },
});

// --- Анімація чисел (Лічильники) ---
const counters = document.querySelectorAll('.stat-number');
const speed = 200; // Швидкість анімації

// Функція перевіряє, чи елемент в зоні видимості екрана
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
}

function animateCounters() {
    counters.forEach(counter => {
        if (isElementInViewport(counter) && counter.innerText === '0') {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        }
    });
}

// Запускаємо при скролінгу
window.addEventListener('scroll', animateCounters);
// --- Логіка Модальних Вікон ---
const formModal = document.getElementById('formModal');
const videoModal = document.getElementById('videoModal');

const openFormBtns = [document.getElementById('openModalBtn'), document.getElementById('openAttendModalBtn')];
const closeFormBtn = document.getElementById('closeFormBtn');

const openVideoBtn = document.getElementById('openVideoModalBtn');
const closeVideoBtn = document.getElementById('closeVideoBtn');

// Відкриття форми
openFormBtns.forEach(btn => {
    if(btn) btn.addEventListener('click', () => formModal.classList.add('active'));
});

// Відкриття відео
if(openVideoBtn) openVideoBtn.addEventListener('click', () => videoModal.classList.add('active'));

// Закриття по хрестику
closeFormBtn.addEventListener('click', () => formModal.classList.remove('active'));
if(closeVideoBtn) closeVideoBtn.addEventListener('click', () => {
    videoModal.classList.remove('active');
    stopVideo();
});

// Функціонал "miss click" (закриття при кліку поза вікном)
window.addEventListener('click', (e) => {
    if (e.target === formModal) formModal.classList.remove('active');
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        stopVideo();
    }
});

// Функція для зупинки відео при закритті модалки
function stopVideo() {
    const iframe = videoModal.querySelector('iframe');
    if(iframe) {
        let iframeSrc = iframe.src;
        iframe.src = iframeSrc; 
    }
}