import React from 'react'

export default function DotLoading() {
  return (
    <div className='flex space-x-2 justify-center items-center bg-white opacity-45'>
      <span className='sr-only'>Loading...</span>
      <div className='h-2 w-2 bg-purple-900 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-2 w-2 bg-purple-900 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-2 w-2 bg-purple-900 rounded-full animate-bounce'></div>
    </div>
  )
}
