 (function () {
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (!isMobile) return;

      const overlay = document.createElement('div');
      overlay.id = 'rotate-overlay';
      overlay.style.cssText = `
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        text-align: center;
        padding: 20px;
      `;
      overlay.innerHTML = `🔄 Please rotate your device for a better experience.`;

      document.body.appendChild(overlay);

      function checkOrientation() {
        const isPortrait = window.innerHeight > window.innerWidth;
        overlay.style.display = isPortrait ? 'flex' : 'none';
      }

      checkOrientation();
      window.addEventListener('resize', checkOrientation);
      window.addEventListener('orientationchange', checkOrientation);
    })();