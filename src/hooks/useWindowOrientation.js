import { useEffect, useState } from "react";

function getWindowOrientation() {
  const { innerWidth: width, innerHeight: height } = window;
  return width > height ? 'landscape' : 'portrait';
}

export default function useWindowOrientation() {
  const [windowOrientation, setWindowOrientation] = useState({
    orientation: getWindowOrientation(),
    resizing: false
  });

  useEffect(() => {
    function handleResize() {
      setWindowOrientation({ orientation: getWindowOrientation(), resizing: true });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    if (windowOrientation.resizing) {
      setTimeout(() => setWindowOrientation({ ...windowOrientation, resizing: false }), 1000);
    }
  }, [windowOrientation]);

  return windowOrientation;
}