/**
 * @fileoverview Хук для анимации при скролле
 */

import { useEffect, useRef, useState, RefObject } from 'react';

/**
 * Хук для анимации элементов при скролле
 * @param threshold - Порог видимости (0-1)
 * @returns [ref, isVisible]
 */
export function useScrollAnimation(threshold = 0.1): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
}
