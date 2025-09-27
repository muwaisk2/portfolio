import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for scroll-based animation.
 * @param {number} threshold The percentage of the target element that is visible to trigger the animation.
 * @returns {[React.RefObject, boolean]} An array containing the ref and a boolean indicating visibility.
 */
export function useScrollAnimation(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export default useScrollAnimation;