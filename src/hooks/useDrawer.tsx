'use client';

import { useCallback, useState } from 'react';

export const useDrawer = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
}; 