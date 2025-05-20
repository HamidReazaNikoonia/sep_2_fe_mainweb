'use client'

import React, { useState, useEffect, useRef } from "react"

interface SliderProps {
  min: number
  max: number
  step: number
  value: [number, number]
  onValueChange: (value: [number, number]) => void
  className?: string
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ min, max, step, value, onValueChange, className = "" }, ref) => {
    const [localValue, setLocalValue] = useState(value)
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      setLocalValue(value)
    }, [value])

    const handleMouseDown = () => {
      const handleMouseMove = (e: MouseEvent) => {
        if (sliderRef.current) {
          const rect = sliderRef.current.getBoundingClientRect()
          const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
          const newValue = min + percent * (max - min)
          const roundedValue = Math.round(newValue / step) * step
          const newLocalValue: [number, number] = [
            Math.min(roundedValue, localValue[1]),
            Math.max(roundedValue, localValue[0])
          ]
          setLocalValue(newLocalValue)
          onValueChange(newLocalValue)
        }
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const getLeftStyles = (index: number) => {
    // @ts-ignore
      return { left: `${((localValue[index] - min) / (max - min)) * 100}%` }
    }

    return (
      <div
        ref={ref}
        className={`relative w-full h-6 ${className}`}
        onMouseDown={handleMouseDown}
      >
        <div
          ref={sliderRef}
          className="absolute top-1/2 left-0 right-0 h-2 -mt-1 rounded-full bg-gray-200"
        >
          <div
            className="absolute h-full rounded-full bg-blue-500"
            style={{
              left: `${((localValue[0] - min) / (max - min)) * 100}%`,
              right: `${100 - ((localValue[1] - min) / (max - min)) * 100}%`,
            }}
          />
        </div>
        {[0, 1].map((index) => (
          <div
            key={index}
            className="absolute top-0 w-6 h-6 -mt-2 -ml-3 rounded-full bg-white border-2 border-blue-500 cursor-pointer"
            style={getLeftStyles(index)}
          />
        ))}
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }

