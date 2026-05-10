// ocorrencia.js — Lógica da tela de Registro de Ocorrência

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