// --- Бургер-меню ---
const burgerIcon = document.getElementById('burgerIcon');
const menuList = document.getElementById('menuList');

if (burgerIcon && menuList) {
    burgerIcon.addEventListener('click', () => {
        menuList.classList.toggle('active');
    });
}

// --- Таймер зворотного відліку ---
const countdownContainer = document.getElementById("countdown");
if (countdownContainer) {
    const weddingDate = new Date(2026, 7, 31, 12, 0, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById("days");
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (dEl) dEl.innerText = days < 10 ? "0" + days : days;
        if (hEl) hEl.innerText = hours < 10 ? "0" + hours : hours;
        if (mEl) mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        if (sEl) sEl.innerText = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(timerInterval);
            countdownContainer.innerHTML = "<h2>Свято розпочалося!</h2>";
        }
    }

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

// --- Ініціалізація Swiper для відгуків ---
if (document.querySelector('.wishes-swiper')) {
    const swiper = new Swiper('.wishes-swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
    });
}

// --- Анімація чисел (Лічильники) ---
const counters = document.querySelectorAll('.stat-number');
if (counters.length > 0) {
    const speed = 200;

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

    window.addEventListener('scroll', animateCounters);
}

// --- Логіка Модальних Вікон ---
const formModal = document.getElementById('formModal');
const videoModal = document.getElementById('videoModal');

const openFormBtns = [document.getElementById('openModalBtn'), document.getElementById('openAttendModalBtn')];
const closeFormBtn = document.getElementById('closeFormBtn');

const openVideoBtn = document.getElementById('openVideoModalBtn');
const closeVideoBtn = document.getElementById('closeVideoBtn');

// Логіка форми
if (formModal) {
    openFormBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', () => formModal.classList.add('active'));
    });
    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', () => formModal.classList.remove('active'));
    }
}

// Логіка відео
if (videoModal) {
    if (openVideoBtn) openVideoBtn.addEventListener('click', () => videoModal.classList.add('active'));
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', () => {
            videoModal.classList.remove('active');
            stopVideo();
        });
    }
}

// Клік повз модалку (miss click)
window.addEventListener('click', (e) => {
    if (formModal && e.target === formModal) formModal.classList.remove('active');
    if (videoModal && e.target === videoModal) {
        videoModal.classList.remove('active');
        stopVideo();
    }
});

// Функція зупинки відео
function stopVideo() {
    if (videoModal) {
        const iframe = videoModal.querySelector('iframe');
        if (iframe) {
            let iframeSrc = iframe.src;
            iframe.src = iframeSrc; 
        }
    }
}