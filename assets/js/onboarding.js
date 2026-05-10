// onboarding.js — Carrossel e navegação do Onboarding

const track  = document.getElementById('slidesTrack');
const dots   = document.querySelectorAll('.ob-dot');
const btnPular = document.getElementById('btnPular');

let current = 0;
const total = 3;
let autoTimer = null;

function goToSlide(index) {
  current = index;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function nextSlide() {
  const next = (current + 1) % total;
  goToSlide(next);
}

// Avança automaticamente a cada 3 segundos
autoTimer = setInterval(nextSlide, 3000);

// Clique nos dots navega manualmente
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(autoTimer);
    goToSlide(i);
    autoTimer = setInterval(nextSlide, 3000);
  });
});

// Swipe no mobile
let touchStartX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    clearInterval(autoTimer);
    if (diff > 0) {
      goToSlide(Math.min(current + 1, total - 1));
    } else {
      goToSlide(Math.max(current - 1, 0));
    }
    autoTimer = setInterval(nextSlide, 3000);
  }
});

// Botão Pular → vai para login
btnPular.addEventListener('click', () => {
  window.location.href = 'login.html';
});