(function () {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (!isMobile) return;

  // Create the overlay
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
    display: none;
    justify-content: center;
    align-items: center;
    font-size: 1.8em;
    text-align: center;
    padding: 20px;
    transition: opacity 0.3s ease;
  `;
  overlay.innerHTML = `🔄 Please rotate your phone sideways<br>for a better experience.`;

  // Add to body
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(overlay);
    updateOverlay(); // run on load
  });

  // Function to show/hide based on orientation
  function updateOverlay() {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    overlay.style.display = isPortrait ? 'flex' : 'none';
  }

  // Update on resize or orientation change
  window.addEventListener('orientationchange', updateOverlay);
  window.addEventListener('resize', updateOverlay);
})();
