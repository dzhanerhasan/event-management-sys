import { useEffect, useRef } from "react";

const useAnimation = (animationName, currentPage) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.animation = "";
      setTimeout(() => {
        ref.current.style.animation = `${animationName} 0.5s`;
      }, 0);
    }
  }, [currentPage, animationName]);

  return ref;
};

export default useAnimation;
