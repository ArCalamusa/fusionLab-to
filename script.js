//^ CHIUDE HAMBURGER MENU ALLA SELEZIONE
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('check').checked = false;
    });
});

//* FOOTER — newsletter con invio a fusionlab@libero.it via Formspree
const form = document.getElementById('subscribe-form');
const message = document.getElementById('form-message');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;

    if (!email.includes('@')) {
        message.textContent = 'Inserisci un indirizzo email valido.';
        return;
    }

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        });

        if (response.ok) {
            message.textContent = 'Grazie per esserti iscritto!';
            form.reset();
        } else {
            message.textContent = 'Qualcosa è andato storto. Riprova più tardi.';
        }
    } catch (err) {
        message.textContent = 'Errore di rete. Controlla la connessione.';
    }
});

//* GALLERY INSTAGRAM
const carousel = document.querySelector('.carousel');
const posts = document.querySelectorAll('.carousel .instagram-media');
const wrapper = document.querySelector('.carousel-wrapper');
const dotsContainer = document.querySelector('.dots');
let currentIndex = 0;

// genera i dots in base al numero di slide
function generateDots() {
    dotsContainer.innerHTML = '';
    const itemsPerSlide = window.innerWidth <= 768 ? 1 : 3; // 3 desktop, 1 mobile
    const totalSlides = Math.ceil(posts.length / itemsPerSlide);

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => goToSlide(i));
    }
}

function goToSlide(index) {
    currentIndex = index;
    const slideWidth = wrapper.offsetWidth + 12; /* +12px = gap */
    const offset = -index * slideWidth;
    carousel.style.transform = `translateX(${offset}px)`;

    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    document.querySelector(`.dot[data-index="${index}"]`).classList.add('active');
}

// inizializzazione
generateDots();

//* SWIPE TOUCH — gallery Instagram
(function () {
    let startX = 0;

    wrapper.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) < 50) return;
        if (diff > 0) {
            const totalSlides = dotsContainer.querySelectorAll('.dot').length;
            if (currentIndex < totalSlides - 1) goToSlide(currentIndex + 1);
        } else {
            if (currentIndex > 0) goToSlide(currentIndex - 1);
        }
    }, { passive: true });
})();

// rigenera dots se cambia la dimensione finestra (responsive)
window.addEventListener('resize', () => {
    generateDots();
    goToSlide(0);
});

// Script Iubenda
(function (w,d) {
    var loader = function () {
        var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0];
        s.src="https://cdn.iubenda.com/iubenda.js";
        tag.parentNode.insertBefore(s,tag);
    };
    if(w.addEventListener){ w.addEventListener("load", loader, false); }
    else if(w.attachEvent){ w.attachEvent("onload", loader); }
    else{ w.onload = loader; }
})(window, document);

//* SPOSTA BOTTONE IUBENDA A SINISTRA
const observer = new MutationObserver(() => {
    const btn = document.querySelector('.iubenda-tp-btn');
    if (btn) {
        btn.style.setProperty('left', '24px', 'important');
        btn.style.setProperty('right', 'auto', 'important');
        btn.style.setProperty('opacity', '0.4', 'important');
        btn.style.setProperty('transform', 'scale(0.75)', 'important');
        observer.disconnect();
    }
});

observer.observe(document.body, { childList: true, subtree: true });
