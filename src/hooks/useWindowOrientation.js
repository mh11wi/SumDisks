import { useEffect, useState } from "react";

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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowOrientation;
}