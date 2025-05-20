"use client"

import React, { useState } from 'react'
import { ArrowLeftIcon } from 'lucide-react'

interface CardItemProps {
  title: string
  subtitle: string
  backgroundImage: string
  buttonText: string
  buttonLink: string
}

export default function CardItem({ title, subtitle, backgroundImage, buttonText, buttonLink }: CardItemProps) {
  const [tiltStyle, setTiltStyle] = useState({})

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const cardRect = card.getBoundingClientRect()
    const cardCenterX = cardRect.left + cardRect.width / 2
    const cardCenterY = cardRect.top + cardRect.height / 2
    const mouseX = e.clientX - cardCenterX
    const mouseY = e.clientY - cardCenterY
    const rotateX = (mouseY / cardRect.height) * -30
    const rotateY = (mouseX / cardRect.width) * 30

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out',
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s ease-out',
    })
  }

  return (
    <div className="w-full max-w-3xl">
      <div
        className="group relative h-48 w-full overflow-hidden rounded-lg p-10 shadow-lg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
      >
        <h3 className="relative text-right z-10 text-2xl font-bold text-white transform translate-z-20">{title}</h3>
        <p className="relative text-right z-10 mt-2 text-white transform translate-z-20">{subtitle}</p>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center filter brightness-100 contrast-100 saturate-200 transition-transform duration-300 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <a 
          href={buttonLink}
          className="absolute bottom-8 right-8 z-20 rounded-md bg-[#912594] px-3 py-2 text-sm text-white transition-all duration-300 ease-out hover:bg-opacity-80 transform translate-z-60"
        >
          {buttonText}
          <ArrowLeftIcon className="ml-2 inline-block h-4 w-4" />
        </a>
        <div className="absolute inset-5 z-10 rounded-md border-2 border-white transform translate-z-50"></div>
      </div>
    </div>
  )
}