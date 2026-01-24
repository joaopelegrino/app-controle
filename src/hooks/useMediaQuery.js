import { useState, useEffect } from 'react';

/**
 * useMediaQuery - Hook para detectar media queries
 *
 * US-107: Responsividade Mobile
 *
 * Breakpoints seguindo Tailwind CSS:
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 *
 * Uso:
 * const isMobile = useMediaQuery('(max-width: 767px)');
 * const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 */

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    // SSR safety: retorna false se window não existir
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Atualiza estado inicial
    setMatches(mediaQuery.matches);

    // Handler para mudanças
    const handler = (event) => {
      setMatches(event.matches);
    };

    // Usar addEventListener se disponível (moderno), senão addListener (legacy)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Breakpoints pré-definidos seguindo Tailwind CSS
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * useIsMobile - Hook simplificado para detectar mobile (< 768px)
 *
 * Uso:
 * const isMobile = useIsMobile();
 */
export function useIsMobile() {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
}

/**
 * useIsTablet - Hook para detectar tablet (768px - 1023px)
 */
export function useIsTablet() {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  );
}

/**
 * useIsDesktop - Hook para detectar desktop (>= 1024px)
 */
export function useIsDesktop() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

export default useMediaQuery;
