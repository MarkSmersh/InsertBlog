import React from 'react'
import { Card } from '../components'

export default function About() {
  return (
    <div style={{ backgroundImage: "url('./slide6.jpg')" }} className='h-screen max-w-screen flex justify-center items-center bg-cover bg-center'>
      <div className='h-screen w-screen bg-black absolute bg-opacity-50 backdrop-blur-sm'></div>
      <div className='h-screen w-screen flex justify-center items-center'>
        <Card
          name='Mark Smotkin'
          album='100900'
          type='stacjonarne'
          year='I'
          department='Podstaw Techniki'
          course='ETI'
        />
      </div>
    </div>
  )
}
