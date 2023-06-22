import React from 'react'

interface ButtonProps {
    className?: string;
    text: string;
    onClick?: () => void;
    isActive?: boolean;
}

export default function Button({ className, text, onClick, isActive = true }: ButtonProps) {
  return (
    <button
      style={{ opacity: isActive ? "100%" : "50%", pointerEvents: isActive ? "all" : "none" }}
      className={'bg-primary text-white px-10 py-4 rounded-3xl text-base font-semibold bg-opacity-70 backdrop-blur-sm transition flex justify-center items-center flex-wrap hover:bg-opacity-20' + ` ${className}` }
      onClick={onClick}>
        {text}
    </button>
  )
}
