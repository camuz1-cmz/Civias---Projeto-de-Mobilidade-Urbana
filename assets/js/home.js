// home.js — Lógica da Home

// Exibe o nome do usuário salvo na sessão
const userName = sessionStorage.getItem('civias_user') || 'User';
document.getElementById('userName').textContent = userName;