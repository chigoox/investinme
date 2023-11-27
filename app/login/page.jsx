import React from 'react'
import { siteName, siteTag } from '../META'
import { Kenia, Concert_One } from 'next/font/google'
import LoginCard from '../Support/Componets/General/Auth/LoginCard'
import LoaddingMask from '../Support/Componets/General/LoadingMask'


const font = Kenia({ subsets: ['latin'], weight: ['400'] })
const font2 = Concert_One({ subsets: ['latin'], weight: ['400'] })


function page() {
    return (
        <div className={`flex min-h-screen overflow-x-hidden flex-col items-center justify-evenly bg-gradient-to-b from-[#6af86a] via-[#69b969] to-[#074507] text-white ${font2.className}`}>


            <div className='top-8 relative center-col fadeInZoom '>
                <LoaddingMask />
                <h1 className={`text-4xl   text-[#1F1F] drop-shadow-md shadow-black  ${font.className}`}>{siteName.replace('s', '$')}</h1>
                <h1>{siteTag}</h1>
            </div>
            <LoginCard />

        </div>
    )
}

export default page