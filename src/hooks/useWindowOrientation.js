import { useEffect, useState } from "react";

function debounce(func) {
  let timer;
  return function(event) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, 500, event);
  };
}

function getWindowOrientation() {
  const { innerWidth: width, innerHeight: height } = window;
  return { orientation: width > height ? 'landscape' : 'portrait' };
}

export default function useWindowOrientation() {
  const [windowOrientation, setWindowOrientation] = useState(
    getWindowOrientation()
  );

  useEffect(() => {
    function handleResize() {
      setWindowOrientation(getWindowOrientation());
    }

    window.addEventListener("resize", debounce(handleResize));
    return () => window.removeEventListener("resize", debounce(handleResize));
  }, []);

  return windowOrientation;
}