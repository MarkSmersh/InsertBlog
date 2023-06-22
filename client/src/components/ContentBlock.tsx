import React from 'react'

interface ContentBlockProps {
    title: string;
    description: string;
    image: string;
    link: string;
    linkText: string;
}

export default function ContentBlock({ title, description, image, link, linkText }: ContentBlockProps) {
  return (
    <div className='w-full rounded-3xl flex justify-center items-center my-8 lg:w-5/12 lg:my-0 lg:mx-8'>
        <div className='flex flex-col text-slate-900'>
            <h3 className='text-3xl font-extrabold'>{title}</h3>
            <p className='text-lg mt-2'>{description}</p>
            <img className='hover:scale-105 transition cursor-pointer' src={image} alt={title} />
            <a className='text-primary text-lg underline underline-offset-4 hover:text-black hover:no-underline transition mt-4' href={link}>{`${linkText} →`}</a>
        </div>
    </div>
  )
}
