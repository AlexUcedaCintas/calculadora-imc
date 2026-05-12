/**
 * js/share.js — mantiene solo copyLink + toast con clase .show
 */

function copyLink() {
  const bmi = window._lastBMI;
  const url  = bmi
    ? `${location.origin}${location.pathname}?imc=${bmi.toFixed(1)}`
    : location.href;
  copyToClipboard(url);
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(showToast);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast();
  }
}

function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// Keep shareResult for CTA button
function shareResult() { copyLink(); }
