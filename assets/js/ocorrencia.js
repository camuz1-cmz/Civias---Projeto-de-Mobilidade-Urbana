// ocorrencia.js — Lógica da tela de Registro de Ocorrência
import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // PROTEÇÃO: Leaflet
  // ==============================
  if (typeof L === "undefined") {
    console.error("Leaflet não carregou");
    return;
  }

  // ==============================
  // USUÁRIO
  // ==============================
  const userNameElement = document.getElementById('userName');
  const userName = sessionStorage.getItem('civias_user') || 'User';

  if (userNameElement) {
    userNameElement.textContent = userName;
  }

   // ==============================
  // ELEMENTOS DO MAPA
  // ==============================
 const mapElement = document.getElementById('map');
const addressElement = document.getElementById('ocAddress');

let map, marker;
let latSelecionada = -20.3155;
let lngSelecionado = -40.3128;

if (mapElement) {

  map = L.map('map').setView([-20.3155, -40.3128], 15);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  marker = L.marker([-20.3155, -40.3128], { draggable: true }).addTo(map);

  setTimeout(() => map.invalidateSize(), 300);

  async function atualizarEndereco(lat, lng) {
    if (!addressElement) return;

    addressElement.textContent = 'Buscando endereço...';

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await res.json();
      addressElement.textContent = data.display_name || 'Endereço não encontrado';

    } catch {
      addressElement.textContent = 'Erro ao buscar endereço';
    }
  }

  atualizarEndereco(-20.3155, -40.3128);

  map.on('click', (e) => {
  marker.setLatLng(e.latlng);

  latSelecionada = e.latlng.lat;
  lngSelecionado = e.latlng.lng;

  atualizarEndereco(latSelecionada, lngSelecionado);
});

 marker.on('dragend', () => {
  const pos = marker.getLatLng();

  latSelecionada = pos.lat;
  lngSelecionado = pos.lng;

  atualizarEndereco(pos.lat, pos.lng);
});

// --- Seleção de veículos ---
const vehicleBtns = document.querySelectorAll('.oc-vehicle-btn');

vehicleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('selected');
  });
});

// --- Seleção de severidade ---
const sevBtns = document.querySelectorAll('.oc-sev-btn');

sevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sevBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// --- Preview de fotos ---
const inputFotos  = document.getElementById('inputFotos');
const previewArea = document.getElementById('previewFotos');

inputFotos.addEventListener('change', () => {
  previewArea.innerHTML = '';
  const files = Array.from(inputFotos.files);
  files.forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('oc-preview-item');
      img.alt = file.name;
      previewArea.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// --- Botão enviar ---
document.getElementById('btnEnviar').addEventListener('click', async () => {

  const descricao = document.getElementById('ocDescricao').value.trim();
  const sevSel = document.querySelector('.oc-sev-btn.selected');
  const veicSel = document.querySelectorAll('.oc-vehicle-btn.selected');

  if (!descricao || !sevSel || veicSel.length === 0) {
    alert("Preencha tudo antes de enviar");
    return;
  }

  try {
    await addDoc(collection(db, "ocorrencias"), {
      descricao,
      severidade: sevSel.dataset.sev,
      veiculos: Array.from(veicSel).map(v => v.dataset.vehicle),

      endereco: document.getElementById("ocAddress").textContent,

      latitude: latSelecionada,
      longitude: lngSelecionado,

      data: new Date().toISOString()
    });

    alert("Salvo no Firebase!");
    window.location.href = "home.html";

  } catch (err) {
    console.error(err);
    alert("Erro ao salvar");
  }
});

}
  
});
