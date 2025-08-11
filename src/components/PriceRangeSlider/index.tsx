'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  debounceMs?: number;
  className?: string;
  formatValue?: (value: number) => string;
  label?: string;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  debounceMs = 800,
  className = '',
  formatValue = (val) => val.toLocaleString('fa'),
  label = 'محدوده قیمت'
}) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const [isDragging, setIsDragging] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Only update from props when not actively dragging
  useEffect(() => {
    if (!isDragging) {
      setLocalValue(value);
    }
  }, [value, isDragging]);

  // Debounced API call
  const debouncedOnChange = useCallback((newValue: [number, number]) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      onValueChange(newValue);
    }, debounceMs);
  }, [onValueChange, debounceMs]);

  // Calculate position for RTL (0% = right side = min value, 100% = left side = max value)
  const getLeftPosition = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  // Calculate value from mouse position for RTL
  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return min;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const clampedPosition = Math.max(0, Math.min(1, position));
    const rawValue = min + clampedPosition * (max - min);
    return Math.round(rawValue / step) * step;
  };

  // Handle value updates
  const updateValue = (newValue: [number, number], immediate = false) => {
    const sortedValue: [number, number] = [
      Math.max(min, Math.min(newValue[0], newValue[1])),
      Math.min(max, Math.max(newValue[0], newValue[1]))
    ];
    
    setLocalValue(sortedValue);
    
    if (immediate) {
      onValueChange(sortedValue);
    } else {
      debouncedOnChange(sortedValue);
    }
  };

  // Mouse handlers for min thumb
  const handleMinMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const newValue = getValueFromPosition(e.clientX);
      setLocalValue([Math.min(newValue, localValue[1]), localValue[1]]);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      debouncedOnChange(localValue);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Mouse handlers for max thumb
  const handleMaxMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const newValue = getValueFromPosition(e.clientX);
      setLocalValue([localValue[0], Math.max(newValue, localValue[0])]);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      debouncedOnChange(localValue);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Touch handlers for min thumb
  const handleMinTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const newValue = getValueFromPosition(e.touches[0].clientX);
      setLocalValue([Math.min(newValue, localValue[1]), localValue[1]]);
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      debouncedOnChange(localValue);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Touch handlers for max thumb
  const handleMaxTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const newValue = getValueFromPosition(e.touches[0].clientX);
      setLocalValue([localValue[0], Math.max(newValue, localValue[0])]);
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      debouncedOnChange(localValue);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    const newValue = getValueFromPosition(e.clientX);
    const distanceToMin = Math.abs(newValue - localValue[0]);
    const distanceToMax = Math.abs(newValue - localValue[1]);
    
    if (distanceToMin < distanceToMax) {
      updateValue([newValue, localValue[1]]);
    } else {
      updateValue([localValue[0], newValue]);
    }
  };

  // Input handlers
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value.replace(/\D/g, '')) || min;
    updateValue([newValue, localValue[1]]);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value.replace(/\D/g, '')) || max;
    updateValue([localValue[0], newValue]);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const minPosition = getLeftPosition(localValue[0]);
  const maxPosition = getLeftPosition(localValue[1]);

  return (
    <div className={`p-4 space-y-3 ${className}`}>
      {/* Value Display */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">{label}</span>
        <span className="text-xs text-gray-500">
          {formatValue(localValue[0])} - {formatValue(localValue[1])} تومان
        </span>
      </div>

      {/* Slider Track */}
      <div className="relative px-2">
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* Active Range */}
          <div
            className="absolute h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
            style={{
              left: `${minPosition}%`,
              width: `${maxPosition - minPosition}%`,
            }}
          />
          
         
          
          {/* Max Thumb (Right side in RTL = larger values) */}
          <div
            className={`absolute top-1/2 w-4 h-4 bg-white border-2 border-pink-500 rounded-full cursor-grab transform -translate-y-1/2 -translate-x-1/2 shadow-sm transition-transform duration-150 hover:scale-110 ${
              isDragging ? 'scale-110 border-pink-600 cursor-grabbing shadow-md' : ''
            }`}
            style={{ left: `${maxPosition}%` }}
            onMouseDown={handleMaxMouseDown}
            onTouchStart={handleMaxTouchStart}
          />

           {/* Min Thumb (Left side in RTL = smaller values) */}
           <div
            className={`absolute top-1/2 w-4 h-4 bg-white border-2 border-pink-500 rounded-full cursor-grab transform -translate-y-1/2 -translate-x-1/2 shadow-sm transition-transform duration-150 hover:scale-110 ${
              isDragging ? 'scale-110 border-pink-600 cursor-grabbing shadow-md' : ''
            }`}
            style={{ left: `${minPosition}%` }}
            onMouseDown={handleMinMouseDown}
            onTouchStart={handleMinTouchStart}
          />
        </div>

        {/* Min/Max Labels */}
        <div className="flex justify-between mt-1 text-xs text-gray-400" dir="ltr">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>

      {/* Manual Input Fields */}
      <div className="flex items-center gap-3 pt-1">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">حداقل</label>
          <input
            type="text"
            value={formatValue(localValue[0])}
            onChange={handleMinInputChange}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs text-right focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
            placeholder="حداقل"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">حداکثر</label>
          <input
            type="text"
            value={formatValue(localValue[1])}
            onChange={handleMaxInputChange}
            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs text-right focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
            placeholder="حداکثر"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;