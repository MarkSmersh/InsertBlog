import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header({ onNav }: { onNav: () => void}) {
  return (
    <header className=''>
      <div className="bg-gradient-to-r from-primary to-[rgba(0,0,0,0.5)] max h-16 flex justify-between items-center backdrop-blur-sm fixed w-full top-0 p-4">
        <NavLink to="/" className="container flex items-center h-full">
          <img className='hover:scale-110 transition' src="https://i.imgur.com/r68QHDx.png" height={80} width={80} alt="logo" />
          <h1 className="ml-4 text-sm md:text-lg text-white hover:text-gray transition font-semibold">Serwis informatyczny InsERT - MS</h1>
        </NavLink>
        <div className="container justify-end items-center h-full text-white font-medium text-base hidden lg:flex">
          <NavLink to="/galery" className="mx-4 hover:text-gray transition hover:underline underline-offset-2">Geleria</NavLink>
          <p>|</p>
          <NavLink to="/softmar" className="mx-4 hover:text-gray transition hover:underline underline-offset-2">Softmar</NavLink>
          <p>|</p>
          <NavLink to="/about" className="mx-4 hover:text-gray transition hover:underline underline-offset-2">O mnie</NavLink>
        </div>
        <div className="container justify-end items-center h-full text-white font-medium text-base flex lg:hidden">
          <button onClick={onNav} className="mx-4 hover:text-gray transition hover:underline underline-offset-2">Menu</button>
        </div>
      </div>
    </header>
  )
}
