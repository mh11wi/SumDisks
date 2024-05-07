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
      const scale = getPageScale();
      document.querySelectorAll('.adsbygoogle[data-slotcar-interstitial="true"], .adsbygoogle[data-slotcar-interstitial="true"] *').forEach(function(el) {
        if (CSS.supports("height: 100dvh")) {
          el.style.width = `${(100 / scale).toFixed(3)}dvw`;
          el.style.height = `${(100 / scale).toFixed(3)}dvh`;
        } else { 
          el.style.width = `${(100 / scale).toFixed(3)}vw`;
          el.style.height = `${(100 / scale).toFixed(3)}vh`;
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

export function getPageScale() {
  const html = document.querySelectorAll('html')[0];
  const matrix = window.getComputedStyle(html).transform;
  const matrixArray = matrix.replace("matrix(", "").split(",");
  return parseFloat(matrixArray[0]);
}