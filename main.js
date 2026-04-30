// Бургер-меню
const burgerIcon = document.getElementById('burgerIcon');
const menuList = document.getElementById('menuList');
if(burgerIcon && menuList) {
    burgerIcon.addEventListener('click', () => {
        menuList.classList.toggle('active');
    });
}

// Таймер зворотного відліку
const weddingDate = new Date(2026, 7, 31, 12, 0, 0).getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (document.getElementById("days")) {
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
}
const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Swiper для відгуків
if (document.querySelector('.wishes-swiper')) {
    const swiper = new Swiper('.wishes-swiper', {
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        autoplay: { delay: 5000 },
    });
}

// Анімація чисел
const counters = document.querySelectorAll('.stat-number');
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

// Логіка Модальних Вікон
const formModal = document.getElementById('formModal');
const videoModal = document.getElementById('videoModal');
const openFormBtnHero = document.getElementById('openModalBtn');
const openFormBtnAttend = document.getElementById('openAttendModalBtn');
const closeFormBtn = document.getElementById('closeFormBtn');
const openVideoBtn = document.getElementById('openVideoModalBtn');
const closeVideoBtn = document.getElementById('closeVideoBtn');

if (openFormBtnHero) openFormBtnHero.addEventListener('click', () => formModal.classList.add('active'));
if (openFormBtnAttend) openFormBtnAttend.addEventListener('click', () => formModal.classList.add('active'));
if (closeFormBtn) closeFormBtn.addEventListener('click', () => formModal.classList.remove('active'));

if (openVideoBtn) openVideoBtn.addEventListener('click', () => videoModal.classList.add('active'));
if (closeVideoBtn) closeVideoBtn.addEventListener('click', () => { videoModal.classList.remove('active'); stopVideo(); });

window.addEventListener('click', (e) => {
    if (e.target === formModal) formModal.classList.remove('active');
    if (e.target === videoModal) { videoModal.classList.remove('active'); stopVideo(); }
});

function stopVideo() {
    const iframe = videoModal.querySelector('iframe');
    if (iframe) {
        const currentSrc = iframe.src;
        iframe.src = ''; 
        setTimeout(() => iframe.src = currentSrc, 100);
    }
}
