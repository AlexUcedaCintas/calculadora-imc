/**
 * js/chart.js — premium chart con colores sobrios
 */

let bmiChartInstance = null;

/**
 * Crea o recrea el gráfico de barras resaltando la categoría del usuario.
 * @param {number} userBMI - IMC del usuario para destacar su categoría
 */
function renderChart(userBMI) {
  const ctx    = document.getElementById('bmiChart').getContext('2d');
  const isDark = document.documentElement.classList.contains('dark');
  const txt    = isDark ? '#6e7681' : '#94a3b8';

  const ranges     = [18.5, 24.9, 29.9, 34.9, 39.9, 45];
  const labels     = ['< 18.5', '18.5–24.9', '25–29.9', '30–34.9', '35–39.9', '≥ 40'];
  const fullColors = ['#93c5fd', '#4ade80', '#fcd34d', '#f97316', '#ef4444', '#dc2626'];
  const activeIdx  = userBMI < 18.5 ? 0 : userBMI < 25 ? 1 : userBMI < 30 ? 2 : userBMI < 35 ? 3 : userBMI < 40 ? 4 : 5;

  const bgColors = fullColors.map((c, i) => {
    if (i === activeIdx) return c;
    const r = parseInt(c.slice(1,3),16), g = parseInt(c.slice(3,5),16), b = parseInt(c.slice(5,7),16);
    return `rgba(${r},${g},${b},0.22)`;
  });

  if (bmiChartInstance) bmiChartInstance.destroy();

  bmiChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data:            ranges,
        backgroundColor: bgColors,
        borderRadius:    6,
        borderSkipped:   false,
        borderWidth:     0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` IMC hasta ${ctx.raw}` } }
      },
      scales: {
        y: { display: false, beginAtZero: true },
        x: { ticks: { font: { size: 10, family: 'Inter' }, color: txt }, grid: { display: false } }
      }
    }
  });
}
