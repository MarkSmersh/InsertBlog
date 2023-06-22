import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

interface PostBlockProps {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    author: string;
    views: number;
    wrap?: boolean;
    className?: string;
}

export default function PostBlock({ id, title, description, image, date, author, views, wrap = false, className }: PostBlockProps) {
    const optimalDescriptionLength = 120

    const [optimalText, setOptimalText] = useState<string>(optimalTextLength(description, optimalDescriptionLength))

    function optimalTextLength(text: string, len: number) {
        if (text.length > len) {
            return text.slice(0, len) + '...'
        } else {
            return text
        }
    }

    function scrollToTop() {
        // scroll to top of page smoothly
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        if (description.length > optimalDescriptionLength) {
            setOptimalText(optimalTextLength(description, optimalDescriptionLength))
        } else {
            setOptimalText(description)
        }
    }, [description])


    return (
        <NavLink onClick={() => scrollToTop()} to={`/article?id=${id}`} className={'relative h-[40vh] w-fit flex justify-center items-center my-4 p-4 bg-primary bg-opacity-0 hover:bg-opacity-20 transition cursor-pointer ' + className}>
            <div className='h-full w-fit flex justify-center items-center relative'>
                <img className='h-full w-[100vw] object-cover object-center backdrop-filter lg:w-[40vw]' src={image} alt={title} />
                <div className={'h-full w-full absolute bg-black bg-opacity-80' + ((!wrap) ? " lg:bg-opacity-0" : "") } />
            </div>
            <div className={'w-fit flex flex-col justify-start px-8 items-start absolute text-slate-200' + ((!wrap) ? " lg:text-slate-500 lg:relative lg:w-[50vw] lg:ml-8 lg:px-0" : "")}>
                <h2 className={'w-fit font-bold text-xl text-white' + ((!wrap) ? " lg:text-black" : "")}>{title}</h2>
                <p className='mt-1'>{`${views} 👀`}</p>
                <p className='mt-1'>{`${author} | ${new Date(Date.parse(date)).toLocaleDateString()}`}</p>
                <h4 className={'mt-4 text-base text-slate-300' + ((!wrap) ? " lg:text-slate-700" : "")}>{optimalText}</h4>
            </div>
        </NavLink>
    )
}
