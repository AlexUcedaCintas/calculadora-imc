/**
 * js/ui.js — scroll reveal + mobile sticky CTA + range bar
 */

(function initUI() {
  // SCROLL REVEAL
  const obs = new IntersectionObserver(
    es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.08 }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // MOBILE CTA (visible when calc panel is scrolled past)
  const mobileCTA = document.getElementById('mobileCTA');
  const panel     = document.getElementById('calculadora');

  if (mobileCTA && panel) {
    window.addEventListener('scroll', () => {
      const past = panel.getBoundingClientRect().bottom < 0;
      mobileCTA.classList.toggle('hidden', !past);
    }, { passive: true });
  }
})();

// RANGE BAR MARKER
function updateRangeBar(bmi) {
  const marker = document.getElementById('bmiMarker');
  const pct    = Math.min(Math.max((bmi - 16) / (42 - 16) * 100, 0), 100);
  marker.style.left = pct + '%';
  marker.classList.remove('hidden');
}
