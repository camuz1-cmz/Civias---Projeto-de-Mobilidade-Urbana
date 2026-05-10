// home.js — Lógica da Home

document.addEventListener("DOMContentLoaded", () => {

  // Nome do usuário
  const userName = sessionStorage.getItem('civias_user') || 'User';

  const userNameElement = document.getElementById('userName');

  if (userNameElement) {
    userNameElement.textContent = userName;
  }

  // MAPA
  const map = L.map('map').setView([-20.3155, -40.3128], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  L.marker([-20.3155, -40.3128])
    .addTo(map)
    .bindPopup("Buraco na via");

});
