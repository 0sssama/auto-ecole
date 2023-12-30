'use client';

import { useEffect, useState } from 'react';

interface UseScrolledOptions {
  threshold?: number;
}

export const useScroll = (options?: UseScrolledOptions) => {
  const [state, setState] = useState({
    scrolled: false,
    scrollPosition: 0,
  });

  const { threshold = 0 } = options ?? {};

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > threshold;

      setState({
        scrolled: isScrolled,
        scrollPosition: window.scrollY,
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
};
