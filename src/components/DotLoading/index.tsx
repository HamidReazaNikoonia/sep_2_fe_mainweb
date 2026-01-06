import React from 'react'

interface DotLoadingProps {
  containerbg?: string;
  dotColor?: string;
}

export default function DotLoading({
  containerbg = 'bg-white',
  dotColor = 'bg-purple-900',
}: DotLoadingProps) {
  return (
    <div className={`flex space-x-2 justify-center items-center ${containerbg} opacity-45`}>
      <span className="sr-only">Loading...</span>
      <div className={`h-2 w-2 ${dotColor} rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
      <div className={`h-2 w-2 ${dotColor} rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
      <div className={`h-2 w-2 ${dotColor} rounded-full animate-bounce`}></div>
    </div>
  );
}
