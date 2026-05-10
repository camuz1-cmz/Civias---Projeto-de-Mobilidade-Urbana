// home.js — Lógica da Home

// Exibe o nome do usuário salvo na sessão
const userName = sessionStorage.getItem('civias_user') || 'User';
document.getElementById('userName').textContent = userName;

// Leaflat - MAPA
const map = L.map('map').setView([-20.3155, -40.3128], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);
