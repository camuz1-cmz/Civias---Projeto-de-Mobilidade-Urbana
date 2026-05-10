// mapa.js — Lógica da tela Mapa do Bairro

// Futuramente aqui entrarão os pins dinâmicos
// vindos do banco de dados com as ocorrências reais.

console.log('Mapa do Bairro carregado.');

document.addEventListener("DOMContentLoaded", () => {

  const map = L.map('map').setView([-20.3155, -40.3128], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  // Pins de exemplo
  L.marker([-20.3155, -40.3128])
    .addTo(map)
    .bindPopup("Buraco na via");

  L.marker([-20.3220, -40.3000])
    .addTo(map)
    .bindPopup("Asfalto renovado");

});
