(function () {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const DISMISS_KEY = 'rotateOverlayDismissed';
  if (!isMobile || localStorage.getItem(DISMISS_KEY) === 'true') return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'rotate-overlay';
  overlay.style.cssText = `
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.6em;
    text-align: center;
    padding: 20px;
    opacity: 1;
    transition: opacity 0.5s ease;
    cursor: pointer;
  `;
  overlay.innerHTML = `
    <div>🔄 Please rotate your phone sideways<br>for a better experience.</div>
    <div style="
      margin-top: 16px;
      font-size: 0.8em;
      opacity: 0.7;
    ">(Tap anywhere to dismiss)</div>
  `;

  let isDismissed = false;

  // Fade out and remove overlay
  function hideOverlay(permanently = false) {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 500);
    if (permanently) {
      localStorage.setItem(DISMISS_KEY, 'true');
      isDismissed = true;
    }
  }

  // Show or hide overlay based on orientation
  function updateOverlay() {
    if (isDismissed) return;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    if (isPortrait) {
      overlay.style.display = 'flex';
      overlay.style.opacity = '1';
    } else {
      hideOverlay();
    }
  }

  // On load, append overlay and set up interactions
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(overlay);
    updateOverlay();

    // Tap anywhere to dismiss
    overlay.addEventListener('click', () => {
      hideOverlay(true);
    });
  });

  // Respond to orientation and screen size changes
  window.addEventListener('orientationchange', updateOverlay);
  window.addEventListener('resize', updateOverlay);
})();
