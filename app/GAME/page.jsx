'use client'
import React, { useState } from 'react'
import { useRef, useEffect } from 'react';


const Player = ({ width, height }) => {
    const [health, setHealth] = useState()
    const [str, setStr] = useState()
    const [def, setDef] = useState()


    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = 'red';
        context.fillRect(0, 0, width, height);

        canvas.addEventListener('click', () => {
            context.fillStyle = 'blue';
            context.fillRect(0, 0, width, height);
            console.log(context)
        });
    }, []);



    return (
        <canvas ref={canvasRef} className='w-10 h-10 bg-white runded-lg' />


    )
}

const Enemy = () => {
    const [health, setHealth] = useState()
    const [str, setStr] = useState()
    const [def, setDef] = useState()
    return (
        <div className='w-24 h-24 bg-blue-700 runded-lg'>

        </div>
    )
}



function page() {
    return (
        <div className='flex min-h-screen overflow-x-hidden md:px-20 lg:px-40 xl:px-32 py-4 flex-col items-center justify-evenly bg-gradient-to-bl from-black via-black to-[#000e00] text-white '>

            <Player width={200} height={20} />
            <Enemy />







        </div>
    )
}

export default page