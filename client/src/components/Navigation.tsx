import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';

interface NavigationProps {
    isActive: boolean;
    onClick: () => void;
}

export default function Navigation({ isActive, onClick }: NavigationProps) {

    const [isMounted, setIsMounted] = React.useState(isActive);
    useEffect(() => {
        setIsMounted(isActive);
    }, [isActive])

    return (
        <div onClick={onClick} style={{ display: isMounted ? "block" : "none" }} className={"w-screen h-screen bg-black text-white transition fixed top-0 opacity-95"}>
            <div className='w-screen h-screen flex flex-col justify-center items-center text-2xl'>
                <NavLink to="/" className=" hover:text-gray transition hover:underline underline-offset-2">Strona główna</NavLink>
                <NavLink to="/galery" className="mt-4 hover:text-gray transition hover:underline underline-offset-2">Geleria</NavLink>
                <NavLink to="/softmar" className="mt-4 hover:text-gray transition hover:underline underline-offset-2">Softmar</NavLink>
                <NavLink to="/about" className="mt-4 hover:text-gray transition hover:underline underline-offset-2">O mnie</NavLink>
            </div>
        </div>
    )
}
