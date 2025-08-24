/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  side?: 'left' | 'right';
  width?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  side = 'left',
  width = 'w-80',
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render anything if not open
  if (!isOpen) {
    return null;
  }

  const drawerContent = (
    <div dir='rtl' className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Drawer Panel */}
      <div className={clsx(
        'relative flex flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out',
        width,
        'h-full',
        side === 'left' ? 'translate-x-0' : 'translate-x-0',
        isOpen ? 'transform-none' : side === 'left' ? '-translate-x-full' : 'translate-x-full'
      )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close drawer"
            >
              <X size={20} />
            </button>
          </div>
        )}
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );

  // Use portal to render drawer at body level
  if (typeof window !== 'undefined') {
    return createPortal(drawerContent, document.body);
  }

  return null;
};

export default Drawer;
