import React from 'react'
import { Button, ContentBlock } from '../components'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();

  return (
    <div>
      <div style={{ backgroundImage: "url('./slide1.jpg')" }} className='h-screen w-screen bg-cover bg-center'>
        <div className='h-screen w-screen bg-black bg-opacity-50 absolute'/>
        <div className='h-full w-full flex flex-col justify-end items-start absolute'>
          <h1 className='text-white text-4xl font-extrabold text-left mb-8 ml-8'>InsERT</h1>
          <h2 className='text-white text-lg font-semibold text-left mb-8 ml-8 w-3/4 lg:w-1/2'>- producent oprogramowania komputerowego dla małych i średnich firm wspomagających zarządzanie przedsiębiorstwami.</h2>
        </div>
      </div>
      <div className='min-h-screen w-screen bg-white flex justify-center items-center'>
        <div className='h-full w-4/6 pt-16 flex flex-col items-center lg:flex-row lg:justify-center lg:items-start'>
          <ContentBlock
            title='Na każdy gust i kolor'
            description='Nasze programy są odpowiednie dla każdego urządzenia i dowolnej techniki.'
            image='./slide2.jpg'
            link='https://pobierz.insert.com.pl/wersja_probna.html?line=nexo&_gl=1*vnn41o*_gcl_au*NTM2NTkwMDg5LjE2ODYxNDUwNDk.*_ga*NTg1NTM4NTAuMTY4NjE0NTA0OQ..*_ga_RL57CF6BDM*MTY4NjIyNzQ1Mi4zLjEuMTY4NjIyODAxNi4wLjAuMA..&_ga=2.242219268.763811684.1686145049-58553850.1686145049'
            linkText='Sprobować demo'
          />
          <ContentBlock
            title='Pomoc techniczna'
            description='Zawsze gotowi pomóc w każdej chwili i rozwiązać najtrudniejszy problem.'
            image='./slide4.png'
            link='https://www.insert.com.pl/dla_uzytkownikow/wybor_programu.html'
            linkText='Dla użytkowników'
          />
        </div>
      </div>
      <div style={{ backgroundImage: "url('./slide5.jpg')" }} className='min-h-screen w-screen bg-cover bg-center'>
        <div className='h-screen w-screen bg-black bg-opacity-50 absolute'/>
        <div className='h-full w-full flex flex-col justify-center items-center absolute'>
          <h1 className='text-white text-4xl font-extrabold text-center mb-8'>Ucz się w trakcie</h1>
          <h2 className='text-white text-xl font-semibold text-center mb-8 w-1/2'>Po więcej informacji zapraszamy do odwiedzenia bloga, na którym znajdziesz więcej informacji związanych z InsERT, w szczególności Softmar</h2>
          <Button text='Przejdź do blogu' onClick={() => nav("/softmar")} />
        </div>
      </div>
    </div>
  )
}
