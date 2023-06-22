import React from 'react'

interface CardProps {
    name: string;
    album: string;
    type: string;
    year: string;
    department: string;
    course: string;
}

export default function Card({ name, album, type, year, department, course }: CardProps) {
    return (
        <div className='h-[360px] w-[560px] rounded-2xl flex bg-opacity-0 overflow-hidden scale-[70%] md:scale-[80%] lg:scale-90 xl:scale-110 absolute shadow-2xl'>
            <div style={{ backgroundImage: "url('./cardbg.png')" }} className='bg-cover scale-[105%] bg-center bg-no-repeat opacity-80'>
                <div className='h-[330px] w-[560px] p-6 flex items-start justify-between scale-[95%]'>
                    <div className='h-full w-1/3 flex flex-col justify-between items-start'>
                        <img src='./rzpolska.png' alt='polska' className='h-24' />
                        <img src='./chip.png' alt='unia' className='h-20' />
                        <div className='flex flex-col justify-center items-start text-black'>
                            <p className='text-sm font-medium'>Nr. albumu: {album}</p>
                            <p className='text-sm font-medium'>Rodzaj: {type}</p>
                            <p className='text-sm font-medium'>Rok: {year}</p>
                            <p className='text-sm font-medium'>Wydział: {department}</p>
                            <p className='text-sm font-medium'>Kierunek: {course}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-center'>
                        <p className='text-base font-bold mt-4'>Politechnika Lubelska</p>
                        <p className='text-base font-semibold mt-[65%]'>{name}</p>
                    </div>
                    <div className='h-full flex flex-col justify-between items-end'>
                        <img src='./legyt.png' alt='legyt' className='h-20' />
                        <img src='./face.png' alt='face' className='w-32' />
                    </div>
                </div>
                <div className='w-full h-3 bg-white mb-10 flex items-center'>
                    <p className='text-left text-black text-[8px] font-medium'>
                        LEGYTYMACJA STUDENCKA LEGYTYMACJA STUDENCKA LEGYTYMACJA STUDENCKA LEGYTYMACJA STUDENCKA LEGYTYMACJA STUDENCKA
                    </p>
                </div>
            </div>
        </div>
    )
}
