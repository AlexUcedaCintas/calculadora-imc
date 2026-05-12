/**
 * js/theme.js
 * Dark/light mode con persistencia en localStorage.
 * Usa iconos SVG separados #iconLight / #iconDark.
 */

(function initTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('darkToggle');

  const saved = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(t) {
    html.classList.toggle('dark', t === 'dark');
    document.getElementById('iconLight').classList.toggle('hidden', t !== 'dark');
    document.getElementById('iconDark').classList.toggle('hidden',  t === 'dark');
  }

  applyTheme(saved);

  btn.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    const next   = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
})();
