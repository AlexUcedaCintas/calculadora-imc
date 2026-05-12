/**
 * js/gauge.js
 * Controla la aguja y el arco del velocímetro SVG de resultados.
 */

/**
 * Actualiza el arco coloreado y la aguja del gauge SVG
 * en función del valor IMC dado.
 * @param {number} bmi - Valor IMC calculado
 */
function updateGauge(bmi) {
  const clamped = Math.min(Math.max(bmi, 15), 45);
  const pct     = (clamped - 15) / 30;
  const ARC     = 239;
  document.getElementById('gaugeArc').style.strokeDashoffset = ARC - ARC * pct;

  const deg = -90 + 180 * pct;
  document.getElementById('gaugeNeedle').style.transform = `rotate(${deg}deg)`;
}
