export function debounce(func, timeout) {
  let timer;
  return function(event) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, timeout, event);
  };
}

export function isTouchDevice() {
  return ('ontouchstart' in window)
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function showInterstitialAd(afterAdCallback) {
  window.adBreak({
    type: 'next',
    name: 'new-game',
    beforeAd: () => {
      document.querySelectorAll('.adsbygoogle[data-slotcar-interstitial="true"], .adsbygoogle[data-slotcar-interstitial="true"] *').forEach(function(el) {
        if (CSS.supports("height: 100dvh")) {
          el.style.width = "100dvw";
          el.style.height = "100dvh";
        } else { 
          el.style.width = "100vw";
          el.style.height = "100vh";
        }
      });
    },
    afterAd: () => {
      if (afterAdCallback && typeof afterAdCallback === 'function') {
        afterAdCallback();
      }
    }
  });
}