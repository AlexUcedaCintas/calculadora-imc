/**
 * js/storage.js
 * Guarda y recupera los últimos valores introducidos usando localStorage.
 */

const STORAGE_KEY = 'imcData';

/**
 * Guarda los valores actuales del formulario en localStorage.
 */
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    height: document.getElementById('height').value,
    weight: document.getElementById('weight').value,
    age:    document.getElementById('age').value,
    gender: window._currentGender || 'male'
  }));
}

/**
 * Carga los valores guardados en el formulario y lanza el cálculo si hay datos.
 */
function loadFromStorage() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (saved.height) document.getElementById('height').value = saved.height;
  if (saved.weight) document.getElementById('weight').value = saved.weight;
  if (saved.age)    document.getElementById('age').value    = saved.age;
  if (saved.gender) setGender(saved.gender);
  if (saved.height && saved.weight) calculateBMI();
}

// Cargar datos al iniciar la página
window.addEventListener('load', loadFromStorage);
