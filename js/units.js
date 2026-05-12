/**
 * js/units.js
 * Segmented unit control: Métrico (kg/cm) vs Imperial (lb/in).
 */

let isImperial = false;

function setUnit(mode) {
  const wasImperial = isImperial;
  isImperial = (mode === 'imperial');

  // Update segmented buttons
  document.getElementById('btnMetric').classList.toggle('active', !isImperial);
  document.getElementById('btnImperial').classList.toggle('active', isImperial);

  // Update labels
  document.getElementById('heightUnit').textContent = isImperial ? '(in)' : '(cm)';
  document.getElementById('weightUnit').textContent = isImperial ? '(lb)' : '(kg)';
  document.getElementById('height').placeholder = isImperial ? '69' : '175';
  document.getElementById('weight').placeholder = isImperial ? '154' : '70';
  document.getElementById('height').step = isImperial ? '0.5' : '0.1';
  document.getElementById('weight').step = '0.1';

  // Convert existing values if switching modes
  if (wasImperial !== isImperial) {
    const h = parseFloat(document.getElementById('height').value);
    const w = parseFloat(document.getElementById('weight').value);
    if (isImperial) {
      if (h) document.getElementById('height').value = (h / 2.54).toFixed(1);
      if (w) document.getElementById('weight').value = (w * 2.20462).toFixed(1);
    } else {
      if (h) document.getElementById('height').value = (h * 2.54).toFixed(1);
      if (w) document.getElementById('weight').value = (w / 2.20462).toFixed(1);
    }
  }

  calculateBMI();
}
