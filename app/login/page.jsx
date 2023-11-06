import React from 'react'
import { siteName } from '../META'
import { Kenia } from 'next/font/google'
import LoginCard from '../Support/Componets/General/Auth/LoginCard'


const font = Kenia({ subsets: ['latin'], weight: ['400'] })


function page() {
    return (
        <div className={`flex min-h-screen  overflow-x-hidden flex-col items-center justify-evenly bg-gradient-to-b from-[#6af86a] via-[#69b969] to-[#074507] text-white ${font.className}`}>
            <h1 className='text-4xl mt-4 fadeInTop text-[#1F1F] drop-shadow-md shadow-black'>{siteName.replace('s', '$')}</h1>
            <LoginCard />

        </div>
    )
}

export default page