// ocorrencia.js — Lógica da tela de Registro de Ocorrência

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
  const addressElement = document.getElementById('ocAddress') || { textContent: "" };

  let marker = null;
  let map = null;

  // ==============================
  // INICIALIZA MAPA
  // ==============================
  if (mapElement) {

    map = L.map('map').setView([-20.3155, -40.3128], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Marker inicial
    marker = L.marker([-20.3155, -40.3128], {
      draggable: true
    }).addTo(map);

    // ==============================
    // FUNÇÃO DE ENDEREÇO (Reverse Geocoding)
    // ==============================
    async function atualizarEndereco(lat, lng) {

      addressElement.textContent = 'Buscando endereço...';

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        addressElement.textContent =
          data.display_name || 'Endereço não encontrado';

      } catch (err) {
        console.error(err);
        addressElement.textContent =
          'Não foi possível obter o endereço';
      }
    }

    // endereço inicial
    atualizarEndereco(-20.3155, -40.3128);

    // clique no mapa
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;

      if (marker) {
        marker.setLatLng([lat, lng]);
      }

      atualizarEndereco(lat, lng);
    });

    // arrastar marcador
    if (marker) {
      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        atualizarEndereco(pos.lat, pos.lng);
      });
    }
  }


  
// Nome do usuário
const userName = sessionStorage.getItem('civias_user') || 'User';
document.getElementById('userName').textContent = userName;

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
document.getElementById('btnEnviar').addEventListener('click', () => {
  const descricao  = document.getElementById('ocDescricao').value.trim();
  const sevSel     = document.querySelector('.oc-sev-btn.selected');
  const veicSel    = document.querySelectorAll('.oc-vehicle-btn.selected');

  if (!descricao) {
    alert('Descreva o problema da via antes de enviar.');
    return;
  }

  if (!sevSel) {
    alert('Selecione a severidade da ocorrência.');
    return;
  }

  if (veicSel.length === 0) {
    alert('Selecione pelo menos um tipo de veículo frequente.');
    return;
  }

  // Feedback de sucesso e redireciona para home
  alert('✅ Ocorrência registrada com sucesso!');
  window.location.href = 'home.html';
});

});
