/**
 * ============================================================
 * VTUBER DESIGN UK - Tawk.to Live Chat Integration
 * ============================================================
 */

(function () {
  const TAWK_PROPERTY_ID = '6ae8e319e252203c32570ce9';
  const TAWK_WIDGET_ID   = '1k6ere6v3';

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  (function () {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0] || document.head;
    s1.async = true;
    s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    if (s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }
  })();

  // Global hook: openLiveChat() opens Tawk.to directly
  window.openLiveChat = function () {
    if (window.Tawk_API) {
      try {
        if (typeof window.Tawk_API.showWidget === 'function') {
          window.Tawk_API.showWidget();
        }
        if (typeof window.Tawk_API.maximize === 'function') {
          window.Tawk_API.maximize();
        } else if (typeof window.Tawk_API.toggle === 'function') {
          window.Tawk_API.toggle();
        }
      } catch (e) {
        console.warn('Tawk open error:', e);
      }
    }
  };
})();
