import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='h-[25vh] w-screen'>
      <div className='h-[25vh] w-full bg-black absolute'></div>
      <div className='h-[25vh] w-full absolute p-8 flex justify-between'>
        <div className='flex flex-col justify-center'>
          <img src='https://i.imgur.com/r68QHDx.png' alt='logo' className='h-12 w-24'/>
          <h1 className='text-white text-2xl font-bold mt-4'>Serwis informatyczny InsERT - MS</h1>
        </div>
        <div className='text-white text-lg flex flex-col justify-center items-end'>
          <h2 className='text-white text-xl font-bold'>Navigacja</h2>
          <NavLink to="/galery" className="mt-4 hover:text-gray transition hover:underline underline-offset-2">Geleria</NavLink>
          <NavLink to="/softmar" className="mt-1 hover:text-gray transition hover:underline underline-offset-2">Softmar</NavLink>
          <NavLink to="/about" className="mt-1 hover:text-gray transition hover:underline underline-offset-2">O mnie</NavLink>
        </div>
      </div>
    </div>
  )
}
