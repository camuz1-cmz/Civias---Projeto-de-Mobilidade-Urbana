// login.js — Lógica da tela de Login

const toggleBtn  = document.getElementById('toggleLoginSenha');
const senhaInput = document.getElementById('loginSenha');
const eyeIcon    = document.getElementById('eyeIconLogin');
const btnEntrar  = document.getElementById('btnEntrar');

// Ícone olho aberto (senha visível)
const eyeOpen = `
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>
`;

// Ícone olho fechado (senha oculta)
const eyeClosed = `
  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
           a18.45 18.45 0 0 1 5.06-5.94"/>
  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8
           a18.5 18.5 0 0 1-2.16 3.19"/>
  <line x1="1" y1="1" x2="23" y2="23"/>
`;

let senhaVisivel = false;

// Alternar visibilidade da senha
toggleBtn.addEventListener('click', () => {
  senhaVisivel = !senhaVisivel;
  senhaInput.type = senhaVisivel ? 'text' : 'password';
  eyeIcon.innerHTML = senhaVisivel ? eyeClosed : eyeOpen;
});

// Botão entrar → vai para home (protótipo, sem autenticação real)
btnEntrar.addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value.trim();
  const senha = senhaInput.value.trim();

  if (!email || !senha) {
    alert('Preencha o e-mail e a senha para continuar.');
    return;
  }

  // Salva nome fictício na sessão para exibir na home
  sessionStorage.setItem('civias_user', 'User');
  window.location.href = 'home.html';
});