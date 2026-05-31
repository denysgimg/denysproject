const burgerIcon = document.getElementById('burgerIcon');
const menuList = document.getElementById('menuList');
const headerElement = document.querySelector('.header');

if (burgerIcon && menuList) {
    burgerIcon.addEventListener('click', () => {
        menuList.classList.toggle('active');
        if (headerElement) {
            headerElement.classList.toggle('menu-open');
        }
    });
}

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

const formModal = document.getElementById('formModal');
const videoModal = document.getElementById('videoModal');

const openFormBtns = [document.getElementById('openModalBtn'), document.getElementById('openAttendModalBtn')];
const closeFormBtn = document.getElementById('closeFormBtn');

const openVideoBtn = document.getElementById('openVideoModalBtn');
const closeVideoBtn = document.getElementById('closeVideoBtn');

if (formModal) {
    openFormBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', () => formModal.classList.add('active'));
    });
    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', () => formModal.classList.remove('active'));
    }
}

if (videoModal) {
    if (openVideoBtn) openVideoBtn.addEventListener('click', () => videoModal.classList.add('active'));
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', () => {
            videoModal.classList.remove('active');
            stopVideo();
        });
    }
}

window.addEventListener('click', (e) => {
    if (formModal && e.target === formModal) formModal.classList.remove('active');
    if (videoModal && e.target === videoModal) {
        videoModal.classList.remove('active');
        stopVideo();
    }
});

function stopVideo() {
    if (videoModal) {
        const iframe = videoModal.querySelector('iframe');
        if (iframe) {
            let iframeSrc = iframe.src;
            iframe.src = iframeSrc; 
        }
    }
}

const eventsContainer = document.getElementById('eventsContainer');
if (eventsContainer) {
    const weddingEvents = [
        {
            title: "ГОЛОВНА ЦЕРЕМОНІЯ",
            time: "16:00<br>18:00",
            date: "Субота, 28<br>Листопада, 2026",
            desc: "Офіційна частина, обмін обітницями та обручками у затишній атмосфері заміського комплексу."
        },
        {
            title: "ВЕСІЛЬНА ВЕЧІРКА",
            time: "19:00<br>00:00",
            date: "Субота, 28<br>Листопада, 2026",
            desc: "Святковий банкет, жива музика, танці до упаду та неймовірний весільний торт."
        }
    ];

    weddingEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <h3 class="card-title">${event.title}</h3>
            <div class="event-details">
                <div class="detail-item">
                    <span class="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </span>
                    <p>${event.time}</p>
                </div>
                <div class="detail-item">
                    <span class="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </span>
                    <p>${event.date}</p>
                </div>
            </div>
            <p class="event-desc">${event.desc}</p>
        `;
        eventsContainer.appendChild(card);
    });
}