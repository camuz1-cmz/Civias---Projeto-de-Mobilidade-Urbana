// cadastro.js — Lógica da tela de Cadastro

// --- Alternar senha ---
const toggleSenhaBtn = document.getElementById('toggleCadSenha');
const senhaInput     = document.getElementById('cadSenha');
const eyeIconSenha   = document.getElementById('eyeIconCad');

const toggleTelBtn   = document.getElementById('toggleCadTel');
const telInput       = document.getElementById('cadTelefone');
const eyeIconTel     = document.getElementById('eyeIconTel');

const eyeOpen = `
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>
`;

const eyeClosed = `
  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
           a18.45 18.45 0 0 1 5.06-5.94"/>
  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8
           a18.5 18.5 0 0 1-2.16 3.19"/>
  <line x1="1" y1="1" x2="23" y2="23"/>
`;

let senhaVisivel = false;
let telVisivel   = false;

toggleSenhaBtn.addEventListener('click', () => {
  senhaVisivel = !senhaVisivel;
  senhaInput.type = senhaVisivel ? 'text' : 'password';
  eyeIconSenha.innerHTML = senhaVisivel ? eyeClosed : eyeOpen;
});

toggleTelBtn.addEventListener('click', () => {
  telVisivel = !telVisivel;
  telInput.type = telVisivel ? 'text' : 'password';
  eyeIconTel.innerHTML = telVisivel ? eyeClosed : eyeOpen;
});

// --- Máscara de CEP ---
document.getElementById('cadCep').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8);
  e.target.value = v;
});

// --- Máscara de Telefone ---
telInput.addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length > 6) {
    v = '(' + v.slice(0,2) + ') ' + v.slice(2,7) + '-' + v.slice(7);
  } else if (v.length > 2) {
    v = '(' + v.slice(0,2) + ') ' + v.slice(2);
  } else if (v.length > 0) {
    v = '(' + v;
  }
  e.target.value = v;
});

// --- Botão registrar ---
document.getElementById('btnRegistrar').addEventListener('click', () => {
  const nome      = document.getElementById('cadNome').value.trim();
  const email     = document.getElementById('cadEmail').value.trim();
  const nasc      = document.getElementById('cadNascimento').value;
  const cep       = document.getElementById('cadCep').value.trim();
  const senha     = senhaInput.value.trim();
  const telefone  = telInput.value.trim();

  if (!nome || !email || !nasc || !cep || !senha || !telefone) {
    alert('Preencha todos os campos para continuar.');
    return;
  }

  // Salva nome na sessão para exibir na home
  sessionStorage.setItem('civias_user', nome.split(' ')[0]);
  window.location.href = 'home.html';
});