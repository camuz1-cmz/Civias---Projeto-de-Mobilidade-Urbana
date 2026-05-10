// home.js — Lógica da Home
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {

  // Nome do usuário
  const userName = sessionStorage.getItem('civias_user') || 'User';

  const userNameElement = document.getElementById('userName');

  if (userNameElement) {
    userNameElement.textContent = userName;
  }

  // MAPA
  const map = L.map('map').setView([-20.3155, -40.3128], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

  try {
    const snapshot = await getDocs(collection(db, "ocorrencias"));

    snapshot.forEach((doc) => {
      const data = doc.data();

      if (!data.latitude || !data.longitude) return;

      L.marker([data.latitude, data.longitude])
        .addTo(map)
        .bindPopup(`
          <b>${data.severidade || "Ocorrência"}</b><br/>
          ${data.descricao || ""}<br/>
          <small>${data.endereco || ""}</small>
        `);
    });

  } catch (err) {
    console.error("Erro ao carregar ocorrências:", err);
  }

});
