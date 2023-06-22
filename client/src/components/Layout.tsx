import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Navigation from './Navigation'

export default function Layout({ children }: any) {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className=''>
        {children}
        <Footer />
        <Header onNav={() => setIsActive(a => !a)} />
        <Navigation isActive={isActive} onClick={() => setIsActive(a => !a)} />
    </div>
  )
}
