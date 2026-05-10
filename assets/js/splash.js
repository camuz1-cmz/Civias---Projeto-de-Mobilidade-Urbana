// splash.js — Animação da Splash Screen do CIVIAS

const splashV   = document.getElementById('splashV');
const splashCI  = document.getElementById('splashCI');
const splashIAS = document.getElementById('splashIAS');

// Etapa 1: O V aparece crescendo (400ms após carregar)
setTimeout(() => {
  splashV.style.width = '46px';
}, 200);

// Etapa 2: CI e IAS aparecem junto ao V (texto completo CIVIAS)
setTimeout(() => {
  splashCI.style.transition  = 'opacity 0.4s ease';
  splashIAS.style.transition = 'opacity 0.4s ease';
  splashCI.style.opacity  = '1';
  splashIAS.style.opacity = '1';
}, 700);

// Etapa 3: Redireciona para o onboarding
setTimeout(() => {
  window.location.href = 'onboarding.html';
}, 2400);