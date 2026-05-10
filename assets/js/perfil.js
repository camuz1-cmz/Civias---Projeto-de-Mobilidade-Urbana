// perfil.js — Lógica da tela de Perfil

// Exibe o nome do usuário salvo na sessão
const userName = sessionStorage.getItem('civias_user');
if (userName) {
  document.getElementById('perfilNome').textContent = userName;
}