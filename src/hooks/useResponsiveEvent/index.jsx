import { useState, useEffect, useCallback } from 'react';

const useResponsiveEvent = (breakpoint = 768, delay = 300) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Custom debounce function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const checkScreenSize = useCallback(() => {
    setIsMobileScreen(window.innerWidth < breakpoint);
  }, [breakpoint]);

  useEffect(() => {
    const debouncedCheck = debounce(checkScreenSize, delay);

    // Run on initial render
    checkScreenSize();

    // Add event listener with debounce
    window.addEventListener('resize', debouncedCheck);

    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedCheck);
    };
  }, [checkScreenSize, delay]);

  return isMobileScreen;
};

export default useResponsiveEvent;
